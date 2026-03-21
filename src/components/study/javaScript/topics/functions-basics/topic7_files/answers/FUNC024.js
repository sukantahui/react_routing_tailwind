// setTimeout and setInterval with Functions
setTimeout(() => {
    console.log('Timeout executed after 2 seconds');
}, 2000);

let count = 0;
const interval = setInterval(() => {
    count++;
    console.log(`Interval count: ${count}`);
    if (count === 3) clearInterval(interval);
}, 1000);
