// Project: Object Destructuring And Nested Destructuring
// Description: This project demonstrates object destructuring and nested destructuring in JavaScript.


// Array destructuring
const coordinates = [10, 20];
const [x, y] = coordinates;
console.log(`x=${x}, y=${y}`);
// Object destructuring
const user = { name: 'Alice', age: 25 };
const { name, age } = user;
console.log(`name=${name}, age=${age}`);
// With defaults
const { city = 'Unknown' } = user;
console.log(`city=${city}`);

