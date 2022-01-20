import Notiflix from 'notiflix';

const refs = {};
refs.formEl = document.querySelector('.form');
refs.delayEl = document.querySelector('input[name="delay"]');
refs.stepEl = document.querySelector('input[name="step"]');
refs.amountEl = document.querySelector('input[name="amount"]');
refs.buttonEl = document.querySelector('button[type="submit"]');




refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(refs.delayEl.value);
  const step = Number(refs.stepEl.value);
  const amount = Number(refs.amountEl.value);
  let difference = delay;
  for (let i = 1; i <= amount; i += 1){
    difference += step;
    createPromise(i, difference)
    .then(({ position, delay }) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
    .catch(({ position, delay }) => Notiflix.Notify.failure (`❌ Rejected promise ${position} in ${delay}ms`));
}

});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


