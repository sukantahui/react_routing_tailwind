// Throttling and Debouncing (Concept)
function throttle(fn, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

function debounce(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

// Simulate rapid calls
const log = throttle(() => console.log('Throttled'), 1000);
const logDebounced = debounce(() => console.log('Debounced'), 1000);

setInterval(log, 200); // logs at most once per second
setInterval(logDebounced, 200); // logs only after 1 second of no calls
setTimeout(() => clearInterval(interval1), 5000); // demo stop
