// Project: Advanced: Storing And Retrieving Objects In Localstorage
// Description: This project demonstrates advanced: storing and retrieving objects in localstorage in JavaScript.


const user = { name: 'Alice', age: 25 };
// Store
localStorage.setItem('user', JSON.stringify(user));
// Retrieve
const stored = JSON.parse(localStorage.getItem('user'));
console.log(stored);
// Clear
localStorage.removeItem('user');

