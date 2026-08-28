// Shorthand Properties and Computed Names
const name = 'Alice';
const age = 30;
const key = 'city';
const city = 'New York';

// Shorthand
const person = { name, age };
console.log('Shorthand:', person);

// Computed property name
const obj = { [key]: city };
console.log('Computed:', obj);

// Combined
const combined = { name, age, [key]: city };
console.log('Combined:', combined);
