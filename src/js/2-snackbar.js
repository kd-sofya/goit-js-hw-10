import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener("submit", eve => {
    eve.preventDefault();

    const formDelay = Number(form.delay.value);
    const formState = form.state.value;

    const prom = new Promise((res, rej) => {
        setTimeout(() => {
            if (formState === "fulfilled") {
                res(formDelay);
            } else {
                rej(formDelay);
            }
        }, formDelay);
    });

    prom
        .then(formDelay => {
            iziToast.success({
                position: 'topRight',
                title: '✅',
                message: `Fulfilled promise in ${formDelay} ms`,
            });
        })
        .catch(formDelay => {
            iziToast.error({
                position: 'topRight',
                title: '❌',
                message: `Rejected promise in ${formDelay} ms`,
            });
        });

});