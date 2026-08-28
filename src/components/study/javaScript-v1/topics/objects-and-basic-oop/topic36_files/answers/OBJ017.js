// Default Values in Destructuring
const user = { name: 'Alice' };

const { name, age = 25, city = 'Unknown' } = user;
console.log('Name:', name);
console.log('Age:', age);
console.log('City:', city);

// Also works with nested destructuring
const data = { user: { name: 'Bob' } };
const { user: { name: userName, age: userAge = 30 } } = data;
console.log('User name:', userName);
console.log('User age (default):', userAge);
