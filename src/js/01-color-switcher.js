const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let intervalTime = null;
btnStop.disabled = true;

btnStart.addEventListener('click', onChangeColor);

btnStop.addEventListener('click', onStopItervalTime);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeColor() {
  intervalTime = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onStopItervalTime() {
  clearInterval(intervalTime);
  btnStart.disabled = false;
  btnStop.disabled = true;
}
