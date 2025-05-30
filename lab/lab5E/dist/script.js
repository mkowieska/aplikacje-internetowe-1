/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/

// const msg: string = "Hello!";
// alert(msg);
var appState = {
  currentStyle: "page1.css",
  styles: {
    "Purple Style": "css/page1.css",
    "Red Style": "css/page2.css",
    "Dark Style": "css/page3.css",
    "Natural Style": "css/page4.css",
  }
};

//funkcja zmieniająca styl:
function changeStyle(styleName) {
  var link = document.querySelector('link[rel="stylesheet"]');
  if (link) {
    link.href = appState.styles[styleName];
    appState.currentStyle = styleName;
  }
}

function generateStyleLinks() {
  var container = document.createElement('div');
  container.id = 'style-links';
  var _loop = function _loop(style) {
    var link = document.createElement('a');
    link.href = '#';
    link.textContent = "Zmien na  ".concat(style);
    //fragment kodu odpowiedzialny za zmianę stylu po kliknięciu na link
    link.addEventListener('click', function () {
      return changeStyle(style);
    });
    container.appendChild(link);
    container.appendChild(document.createElement('br'));
  };
  for (var style in appState.styles) {
    _loop(style);
  }
  document.body.prepend(container);
}

document.addEventListener('DOMContentLoaded', function () {
  generateStyleLinks();
});
})();