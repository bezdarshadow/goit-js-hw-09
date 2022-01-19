'use strict';

const buttonStartEl = document.querySelector('button[data-start]');
const buttonStopEl = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

let repeatChangeBackgroundColor = null;

buttonStartEl.addEventListener('click', event =>{
    repeatChangeBackgroundColor = setInterval( () => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 500);
    buttonStartEl.setAttribute('disabled', true);
});

buttonStopEl.addEventListener('click', event => {
    clearInterval(repeatChangeBackgroundColor);
    buttonStartEl.removeAttribute('disabled');
});