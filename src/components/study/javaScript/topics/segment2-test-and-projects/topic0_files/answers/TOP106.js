// Project: Advanced: Deep Copy: Structuredclone() And Json Technique
// Description: This project demonstrates advanced: deep copy: structuredclone() and json technique in JavaScript.


const user = { name: 'Alice', age: 25 };
// Store
localStorage.setItem('user', JSON.stringify(user));
// Retrieve
const stored = JSON.parse(localStorage.getItem('user'));
console.log(stored);
// Clear
localStorage.removeItem('user');

