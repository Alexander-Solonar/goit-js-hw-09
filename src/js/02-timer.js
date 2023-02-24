import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const valueTimerEl = document.querySelectorAll('.value');
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    createTimer(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function createTimer(selectedDate) {
  if (selectedDate.getTime() < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  btnStart.disabled = false;

  btnStart.addEventListener('click', () => {
    btnStart.disabled = true;
    inputDate.disabled = true;

    const idInterval = setInterval(() => {
      const restOfTime = selectedDate.getTime() - Date.now();
      const convertDate = convertMs(restOfTime);
      addLeadingZero(convertDate);

      if (restOfTime < 1000) {
        clearInterval(idInterval);
      }
    }, 1000);
  });
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(convertDate) {
  valueTimerEl.forEach((valueEl, index) => {
    const arrayDate = Object.values(convertDate);
    valueEl.textContent = String(arrayDate[index]).padStart(2, '0');
  });
}
