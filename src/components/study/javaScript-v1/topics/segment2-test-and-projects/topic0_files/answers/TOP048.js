// Project: Json.Parse() And Json.Stringify()
// Description: This project demonstrates json.parse() and json.stringify() in JavaScript.


const user = { name: 'Alice', age: 25 };
// Store
localStorage.setItem('user', JSON.stringify(user));
// Retrieve
const stored = JSON.parse(localStorage.getItem('user'));
console.log(stored);
// Clear
localStorage.removeItem('user');

