// Project: JSON and localStorage
// Description: Store an object in localStorage and retrieve it.


const user = { name: 'Alice', age: 25 };
// Store
localStorage.setItem('user', JSON.stringify(user));
// Retrieve
const stored = JSON.parse(localStorage.getItem('user'));
console.log(stored);
// Clear
localStorage.removeItem('user');

