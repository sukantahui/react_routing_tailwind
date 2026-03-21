// Combined Map and Filter
const numbers = [1, 2, 3, 4, 5, 6];
const evenSquares = numbers
    .filter(num => num % 2 === 0)
    .map(num => num * num);
console.log('Even squares:', evenSquares); // [4, 16, 36]
