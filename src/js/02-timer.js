import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startButton = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let timeStart = 0;
let timerId = null;

startButton.disabled = true;

const addLeadingZero = value => {
  return value.padStart(2, '0');
};

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
}

const countDown = time => {
  startButton.disabled = true;
  timerId = setInterval(() => {
    const currentTime = new Date().getTime();
    if (time - currentTime > 0) {
      const remainingArray = convertMs(time - currentTime);
      daysField.textContent = addLeadingZero(remainingArray.days.toString());
      hoursField.textContent = addLeadingZero(remainingArray.hours.toString());
      minutesField.textContent = addLeadingZero(
        remainingArray.minutes.toString()
      );
      secondsField.textContent = addLeadingZero(
        remainingArray.seconds.toString()
      );
    } else {
      clearInterval(timerId);
    }
  }, 1000);
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    timeStart = selectedDates[0].getTime();
    const currentTime = new Date().getTime();
    if (timeStart > currentTime) {
      startButton.disabled = false;
    } else {
      //window.alert('Please choose a date in the future');
      Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => countDown(timeStart));
