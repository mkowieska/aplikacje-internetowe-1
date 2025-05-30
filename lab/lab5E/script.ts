const appState = {
  currentStyle: "css/page1.css",
  styles: {
    "Purple Style": "css/page1.css",
    "Red Style": "css/page2.css",
    "Dark Style": "css/page3.css",
    "Natural Style": "css/page4.css",
  } as { [key: string]: string }
};

//funkcja zmieniajaca styl
function changeStyle(styleName: string) {
  const link = document.getElementById('dynamic-style') as HTMLLinkElement;
  if (link) {
    //zmiana stylow na wybrany
    link.href = appState.styles[styleName];
    appState.currentStyle = appState.styles[styleName];
  }
}

function generateStyleLinks() {
  const container = document.getElementById('style-links');
  if (container) {
    for (const style in appState.styles) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = `Zmien na ${style}`;
      //fragment kodu odpowiedzialny za zmianę stylu po kliknięciu na link
      //kazdy link otrzymuje nasluchiwacz zdarzen click, ktory wywoluje funkcje changeStyle(style)
      link.addEventListener('click', () => changeStyle(style));
      container.appendChild(link);
      container.appendChild(document.createElement('br'));
    }
  }
}

//po zaladowaniu strony generujemy linki do zmiany stylow
document.addEventListener('DOMContentLoaded', () => {
  generateStyleLinks();
});
