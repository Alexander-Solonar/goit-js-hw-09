import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const valueTimerEl = document.querySelectorAll('.value');

btnStart.disabled = true;
let restOfTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    createTimer(selectedDates);
  },
};

flatpickr('#datetime-picker', options);

function createTimer(selectedDate) {
  if (Date.now() > selectedDate[0].getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    btnStart.disabled = false;
    btnStart.addEventListener('click', () => {
      const idInterval = setInterval(() => {
        restOfTime = selectedDate[0].getTime() - Date.now();
        if (restOfTime < 500) {
          clearInterval(idInterval);
        }
        const convertDate = convertMs(restOfTime);
        timerСounter(convertDate);
      }, 1000);
    });
  }
}

function timerСounter(restOfTime) {
  valueTimerEl.forEach((valueEl, index) => {
    // ?????????
    const con = Object.values(restOfTime);
    // ??????
    valueEl.textContent = String(con[index]).padStart(2, '0');
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
