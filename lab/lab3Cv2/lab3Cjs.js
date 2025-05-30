let map, mapCanvas;
const pieceSize = 75;  // Rozmiar każdego puzzla (75x75px)
const pieces = [];      // Tablica przechowująca elementy puzzli
const correctPositions = []; // Tablica do przechowywania poprawnych pozycji puzzli

document.addEventListener("DOMContentLoaded", () => {
    initializeMap();
    initializeButtons();
    requestPermissions();
});

// Inicjalizacja mapy
function initializeMap() {
    map = L.map('map').setView([51.505, -0.09], 13);  // Początkowy widok mapy Londynu
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    map.on("moveend", updateMapCanvas);
}

// Inicjalizacja przycisków
function initializeButtons() {
    document.getElementById("myLocationBtn").addEventListener("click", locateUser);
    document.getElementById("downloadMapBtn").addEventListener("click", downloadMapAsImage);
}

// Wnioski o uprawnienia do geolokalizacji i notyfikacji
function requestPermissions() {
    if ("geolocation" in navigator) {
        console.log("Geolocation is supported.");
    } else {
        alert("Geolocation is not available.");
    }
    if (window.Notification && Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            console.log("Notification permission:", permission);
        });
    }
}

// Lokalizowanie użytkownika i aktualizacja mapy
function locateUser() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                console.log("User location:", latitude, longitude);
                map.setView([latitude, longitude], 13);
            },
            error => {
                console.error("Geolocation error:", error);
                alert("Unable to find your location. Please check your settings.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Pobieranie mapy jako obraz i generowanie puzzli
function downloadMapAsImage() {
    setTimeout(() => {
        leafletImage(map, (err, canvas) => {
            if (err) {
                console.error("Error capturing the map:", err);
                alert("Failed to capture the map. Please try again.");
                return;
            }
            mapCanvas = canvas;
            const dataUrl = mapCanvas.toDataURL();
            downloadImage(dataUrl, "map-image.png");
            createPuzzlePieces();
        });
    }, 1000); // Opóźnienie, aby upewnić się, że mapa jest załadowana
}

// Funkcja do pobierania obrazu mapy
function downloadImage(dataUrl, filename) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
}

// Funkcja do generowania puzzli
function createPuzzlePieces() {
    const piecesContainer = document.getElementById("puzzlePieces");
    piecesContainer.innerHTML = '';  // Czyszczenie kontenera puzzli
    correctPositions.length = 0; // Resetowanie tablicy poprawnych pozycji
    for (let i = 0; i < 16; i++) {
        const piece = document.createElement("div");
        piece.className = "puzzle-piece";
        // Ustawienie tła dla puzzla
        piece.style.backgroundImage = `url(${mapCanvas.toDataURL()})`;
        // Ustawienie tła dla poszczególnych kawałków
        const x = (i % 4) * pieceSize;
        const y = Math.floor(i / 4) * pieceSize;
        piece.style.backgroundPosition = `-${x}px -${y}px`;
        // Ustawienie wymiarów puzzli
        piece.style.width = pieceSize + 'px';
        piece.style.height = pieceSize + 'px';
        // Pozycjonowanie puzzli (przypadkowe miejsce początkowe)
        piece.style.position = 'absolute';
        piece.style.left = `${Math.random() * 200}px`; // Losowa pozycja początkowa
        piece.style.top = `${Math.random() * 200}px`;
        piece.setAttribute("data-index", i);
        piece.draggable = true;
        // Eventy drag and drop
        piece.addEventListener("dragstart", onDragStart);
        piece.addEventListener("dragend", onDragEnd);
        piecesContainer.appendChild(piece);
        pieces.push(piece);
        correctPositions.push({ left: (i % 4) * pieceSize, top: Math.floor(i / 4) * pieceSize });
    }
}

// Obsługa zdarzenia dragstart
function onDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
    event.target.style.opacity = 0.5; // Zmiana przezroczystości przeciąganego puzzla
}

// Obsługa zdarzenia dragend
function onDragEnd(event) {
    event.target.style.opacity = 1; // Przywrócenie pełnej przezroczystości
}

// Zezwolenie na upuszczanie puzzli na planszy
const puzzleBoard = document.getElementById("puzzleBoard");
puzzleBoard.addEventListener("dragover", (event) => {
    event.preventDefault(); // Zezwolenie na upuszczanie
});

puzzleBoard.addEventListener("drop", (event) => {
    event.preventDefault();
    const pieceIndex = event.dataTransfer.getData("text/plain");
    const piece = pieces[pieceIndex];
    // Obliczenie pozycji upuszczenia na planszy
    const rect = puzzleBoard.getBoundingClientRect();
    const left = event.clientX - rect.left - (pieceSize / 2);
    const top = event.clientY - rect.top - (pieceSize / 2);
    // Przypisanie do siatki
    piece.style.left = Math.round(left / pieceSize) * pieceSize + "px";
    piece.style.top = Math.round(top / pieceSize) * pieceSize + "px";
    // Sprawdzenie poprawności układanki
    checkPieceCorrectness(piece);
    checkCompletion();
});

// Funkcja do sprawdzenia, czy pojedynczy puzzel jest w poprawnym miejscu
function checkPieceCorrectness(piece) {
    const index = parseInt(piece.dataset.index);
    const correctPosition = correctPositions[index];
    const left = parseInt(piece.style.left);
    const top = parseInt(piece.style.top);
    if (left === correctPosition.left && top === correctPosition.top) {
        console.log(`Puzzle ${index + 1} jest poprawnie ustawione!`);
    }
}

// Funkcja do sprawdzenia, czy wszystkie puzzle są poprawnie ułożone
function checkCompletion() {
    let completed = true;
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const left = parseInt(piece.style.left);
        const top = parseInt(piece.style.top);
        // Sprawdzanie, czy puzzle znajdują się w poprawnych pozycjach
        if (left !== correctPositions[i].left || top !== correctPositions[i].top) {
            completed = false;
            break;
        }
    }
    // Jeśli wszystkie puzzle są na swoim miejscu, wyświetlamy komunikat
    if (completed) {
        alert("Gratulacje! Wszystkie puzzle są w poprawnym miejscu!");
        showSystemNotification();
    }
}

function showSystemNotification() {
    if (Notification.permission === "granted") {
        new Notification("BRAWO!", { body: "Udalo ci sie ulozyc puzle!" });
    }
}

// Aktualizacja mapy po przesunięciu widoku
function updateMapCanvas() {
    leafletImage(map, (err, canvas) => {
        if (err) {
            console.error("Error capturing the map:", err);
            return;
        }
        mapCanvas = canvas;
    });
}