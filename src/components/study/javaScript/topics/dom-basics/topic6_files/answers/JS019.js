// Countdown Timer
// HTML: <input id="minutes" type="number" placeholder="Minutes">
// <input id="seconds" type="number" placeholder="Seconds">
// <button id="startBtn">Start</button>
// <button id="pauseBtn">Pause</button>
// <button id="resetBtn">Reset</button>
// <div id="timerDisplay">00:00</div>

let timerInterval = null;
let remainingSeconds = 0;
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerDisplay = document.getElementById('timerDisplay');

function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        alert('Time is up!');
    }
}

function startTimer() {
    if (timerInterval) return;
    if (remainingSeconds <= 0) {
        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;
        remainingSeconds = mins * 60 + secs;
        if (remainingSeconds <= 0) return;
        updateDisplay();
    }
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = 0;
    updateDisplay();
    minutesInput.value = '';
    secondsInput.value = '';
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
