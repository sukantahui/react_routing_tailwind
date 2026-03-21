// Chaining Methods
const numbers = [5, 12, 8, 15, 3];

const result = numbers
    .filter(num => num > 10)
    .map(num => num * num)
    .reduce((sum, square) => sum + square, 0);

console.log('Sum of squares of numbers > 10:', result); // 144 + 225 = 369
