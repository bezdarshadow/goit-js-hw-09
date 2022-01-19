'use strict';


import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.2.min.css";

const calendarEl = document.querySelector('input#datetime-picker');
const buttonStartEl = document.querySelector('button[data-start]');
const refs = {};
refs.days = document.querySelector('span[data-days]');
refs.hours = document.querySelector('span[data-hours]');
refs.minutes = document.querySelector('span[data-minutes]');
refs.seconds = document.querySelector('span[data-seconds]');
let pickedTimeEl = null;
let intervalId = null;


buttonStartEl.setAttribute('disabled', true);
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0] < Date.now()){
        Notiflix.Notify.failure('Please choose a date in the future.');
      } else {
        buttonStartEl.removeAttribute('disabled');
        pickedTimeEl = selectedDates[0];
      }
    },
  };


flatpickr(calendarEl, options);


buttonStartEl.addEventListener('click', event => {
    intervalId = setInterval(() => {
        const difference = pickedTimeEl - Date.now();
        if(difference <= 0){
            stop();
            return;
        };
        const { days, hours, minutes, seconds } = convertMs(difference);

        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);

    }, 1000);

});


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};

function stop() {
    clearInterval(intervalId);
}

function addLeadingZero(value){
    return String(value).padStart(2, 0);
}