// Project: Advanced: Spread And Rest Operator For Objects
// Description: This project demonstrates advanced: spread and rest operator for objects in JavaScript.


// Spread with arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
console.log(combined);
// Spread with objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 };
console.log(merged);
// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4));

