import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  let x = Number(inputDelay.value);

  for (let i = 1; i <= inputAmount.value; i += 1) {
    createPromise(i, x)
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

    x += Number(inputStep.value);
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
