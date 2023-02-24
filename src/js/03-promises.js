import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const step = Number(inputStep.value);
  let delay = Number(inputDelay.value);
  const amount = inputAmount.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
});

function createPromise(position, delay) {
  return new Promise((resole, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resole({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
