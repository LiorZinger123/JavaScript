const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");
const display = document.getElementById("display");
let msec = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = "";
let displayminutes = "";
let displayhours = "";
let timerOn = false;

startEl.addEventListener("click", () => {
    if(!timerOn){
        timerOn = true;
        interval = window.setInterval(start, 10);
    }
})
function start(){
    msec++;
    if(msec / 100 === 1){
        msec = 0;
        seconds += 1;
    }
    if(seconds / 60 === 1){
        seconds = 0;
        minutes += 1;
    }
    if(minutes / 60 === 1){
        minutes = 0;
        hours += 1;
    }
    if(seconds < 10)
        displaySeconds = '0' + seconds;
    else
        displaySeconds = seconds;
    if(minutes < 10)
        displayminutes = '0' + minutes;
    else
        displayminutes = minutes;
    if(hours < 10)
        displayhours = '0' + hours;
    else
        displayhours = hours;

    display.innerHTML = displayhours + ':' + displayminutes + ':' + displaySeconds + ':' + msec;
}

stopEl.addEventListener("click", () => {
    timerOn = false;
    window.clearInterval(interval)
})

resetEl.addEventListener("click", () => {
    timerOn = false
    window.clearInterval(interval)
    msec = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    display.innerHTML = '00' + ':' + '00' + ':' + '00' + ':' + '00';
})