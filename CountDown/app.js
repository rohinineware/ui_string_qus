document.addEventListener('DOMContentLoaded', function() {
    const endDate = new Date('June 1, 2024 11:30:00').getTime();
    const daysEl = document.querySelector('.days');
    const hoursEl = document.querySelector('.hours');
    const minutesEl = document.querySelector('.minutes');
    const secondsEl = document.querySelector('.seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        //convert the time miliseconds to days
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        //converts time from miliseconds to days
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
       
       //converts time hours to minutes
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        
        //minutes to seconds
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});
