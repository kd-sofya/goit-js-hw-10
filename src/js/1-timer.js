import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const startBt = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

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
          window.alert("Please choose a date in the future");
          startBt.disabled = true;
      } else
          userSelectedDate = selec;
          startBt.disabled = false;
  },
};
 
flatpickr("#datetime-picker", options);

