// Array of Objects Manipulation
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 }
];

const adults = users
    .filter(user => user.age > 18)
    .map(user => user.name);
console.log('Adults:', adults); // ['Alice', 'Charlie']
