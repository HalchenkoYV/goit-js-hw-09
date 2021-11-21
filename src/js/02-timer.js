import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

const input =  document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', 'disabled');
let selectedTime;
let timerId = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60; //60000
  const hour = minute * 60; //3600000
  const day = hour * 24; // 86400000

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
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    //   console.log(selectedDates[0]);
      const dateNow = new Date();
      const getTimeNow = dateNow.getTime();
      const getChosenTime = selectedDates[0].getTime();
      selectedTime = selectedDates[0].getTime() - getTimeNow;
      console.log(selectedTime)
      if (getTimeNow > getChosenTime) {
          window.alert("Please choose a date in the future");
          btnStart.setAttribute('disabled', 'disabled');
      }
      else {
          btnStart.removeAttribute('disabled');
      }
      

  },
};

function clickStart() {
    btnStart.setAttribute('disabled', 'disabled');
    input.setAttribute('disabled', 'disabled');
    timerId = setInterval(() => {
        selectedTime -= 1000;
        console.log(selectedTime);
        const objWithDates = convertMs(selectedTime);
        const { days, hours, minutes, seconds } = objWithDates;
        spanDays.textContent = `${days}`.padStart(2,0);
        spanHours.textContent = `${hours}`.padStart(2,0);
        spanMinutes.textContent = `${minutes}`.padStart(2,0);
        spanSeconds.textContent = `${seconds}`.padStart(2, 0);
        
        if (selectedTime <= 1000) {
            console.log(1);
            clearInterval(timerId);
            input.removeAttribute('disabled');
        }
  }, 1000);
}


flatpickr(input, options);
btnStart.addEventListener('click', clickStart);
