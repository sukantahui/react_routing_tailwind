// Find and FindIndex
const numbers = [3, 7, 2, 9, 4];

// Find first even number
const firstEven = numbers.find(num => num % 2 === 0);
console.log('First even:', firstEven); // 2

// Find its index
const evenIndex = numbers.findIndex(num => num % 2 === 0);
console.log('Index of first even:', evenIndex); // 2
