import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";



const startBt = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const datetimePicker = document.querySelector('#datetime-picker');
let userSelectedDate = null;
startBt.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selec = selectedDates[0];
      const day = new Date;

      if (selec <= day) {
          iziToast.error({
            position: 'topRight',
            title: 'Error',
            message: 'Please choose a date in the future',
            });
          startBt.disabled = true;
      } else {
          userSelectedDate = selec;
          datetimePicker.disabled = false;
          startBt.disabled = false;
          }
  },
};
 
flatpickr("#datetime-picker", options);

startBt.addEventListener('click', functionStart);
function functionStart() {

    datetimePicker.disabled = true;
    startBt.disabled = true;
    const interval = setInterval(() => {
        const newDay = new Date();
        let subtraction = userSelectedDate - newDay;

        if (subtraction <= 0) {
            clearInterval(interval);
            days.textContent = '0';
            hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            return;
        }

        const { days: d, hours: h, minutes: m, seconds: s } = convertMs(subtraction);
        
        days.textContent = d;
        hours.textContent = String(h).padStart(2, '0');
        minutes.textContent = String(m).padStart(2, '0');
        seconds.textContent = String(s).padStart(2, '0');
    }, 1000);
}

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

