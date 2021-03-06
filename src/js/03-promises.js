import Notiflix from 'notiflix';



const form = document.forms[0];
const button = document.querySelector('button');


let timerId = null;


function createPromise(position, delay) {
  // console.log(delay)
  return new Promise((resolve, reject) => {
     timerId =  setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
    }
      }, delay);
  });
}
function callPromises(event) {
  event.preventDefault();
  // 
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  // 
  let basicTime = Number(delay.value);

  for (let i = 1; i <= amount.value; i += 1) {
    if (i === 1) {
      createPromise(i, delay.value)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }); 
    }

    else {
      basicTime = basicTime+Number(step.value);
      createPromise(i, basicTime)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      }
    }
  basicTime = 0;
  form.reset();
}


form.addEventListener("submit", callPromises);


