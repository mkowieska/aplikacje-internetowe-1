const kluczApi = '';
const urlAktualnaPogoda = 'https://api.openweathermap.org/data/2.5/weather';
const urlPrognozaPogoda = 'https://api.openweathermap.org/data/2.5/forecast';

document.getElementById('fetch-weather').addEventListener('click', () => {
    const miasto = document.getElementById('city-input').value;
    if (miasto) {
        pobierzAktualnaPogode(miasto);
        pobierzPrognozePogody(miasto);
    } else {
        alert('Podaj nazwę miasta.');
    }
});

// Kod odpowiedzialny za wysyłanie żądania do aktualnej pogody za pomocą XMLHttpRequest
function pobierzAktualnaPogode(miasto) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${urlAktualnaPogoda}?q=${miasto}&appid=${kluczApi}&units=metric`);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const dane = JSON.parse(xhr.responseText);
            console.log('Odpowiedź bieżącej pogody:', dane); 
            wyswietlAktualnaPogode(dane);
        } else {
            console.error('Błąd podczas pobierania bieżącej pogody:', xhr.responseText);
        }
    };
    xhr.onerror = function () {
        console.error('Wystąpił błąd sieci podczas pobierania bieżącej pogody.');
    };
    xhr.send();
}

// Kod odpowiedzialny za wysyłanie żądania do prognozy pogody za pomocą Fetch
function pobierzPrognozePogody(miasto) {
    fetch(`${urlPrognozaPogoda}?q=${miasto}&appid=${kluczApi}&units=metric`)
        .then(odpowiedz => {
            if (!odpowiedz.ok) {
                throw new Error('Błąd podczas pobierania prognozy pogody');
            }
            return odpowiedz.json();
        })
        .then(dane => {
            console.log('Odpowiedź prognozy pogody:', dane); 
            wyswietlPrognoze(dane);
        })
        .catch(blad => {
            console.error('Błąd:', blad);
        });
}

function wyswietlAktualnaPogode(dane) {
    const kontener = document.getElementById('current-weather');
    const urlIkona = `https://openweathermap.org/img/wn/${dane.weather[0].icon}@2x.png`;
    kontener.innerHTML = `
        <img src="${urlIkona}" alt="Ikona pogody">
        <p>Temperatura: ${dane.main.temp}°C</p>
        <p>Pogoda: ${dane.weather[0].description}</p>
        <p>Wilgotność: ${dane.main.humidity}%</p>
    `;
}

function wyswietlPrognoze(dane) {
    const kontener = document.getElementById('forecast');
    kontener.innerHTML = '';
    dane.list.forEach((prognoza, indeks) => {
        if (indeks % 8 === 0) { // Co 8 indeksów (~24 godziny)
            const urlIkona = `https://openweathermap.org/img/wn/${prognoza.weather[0].icon}@2x.png`;
            const div = document.createElement('div');
            div.className = 'forecast';
            div.innerHTML = `
                <img src="${urlIkona}" alt="Ikona pogody">
                <p><strong>${new Date(prognoza.dt_txt).toLocaleDateString()}</strong></p>
                <p>Temperatura: ${prognoza.main.temp}°C</p>
                <p>${prognoza.weather[0].description}</p>
            `;
            kontener.appendChild(div);
        }
    });
}
