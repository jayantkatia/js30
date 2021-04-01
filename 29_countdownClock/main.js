let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');

const buttons = document.querySelectorAll("[data-time]");



function timer(seconds){
    
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds*1000;
    
    displayTimeLeft(seconds);
    displayEndTime(then);
    
    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then - Date.now())/1000);
        // stop
        if (secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        // display

        displayTimeLeft(secondsLeft);

    },1000);
}


function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const secondsLeft = seconds % 60;
    const display = `${minutes}:${secondsLeft<10 ? '0' : ''}${secondsLeft}`;
    // console.log(display);
    timerDisplay.textContent = display;
    document.title = display;


}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back at ${hours > 12 ? hours - 12 : hours }:${minutes<10 ? '0':''}${minutes}`;
}

function startTime(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}


buttons.forEach(button=>button.addEventListener('click',startTime));


document.customForm.minutes.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60);
    // this.reset();
});
