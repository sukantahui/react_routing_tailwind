// Object Destructuring
const user = {
    name: 'Alice',
    address: {
        city: 'NYC',
        zip: '10001'
    },
    age: undefined
};

// Basic destructuring with default
const { name, age = 25 } = user;
console.log('Name:', name);
console.log('Age (with default):', age);

// Nested destructuring
const { address: { city, zip } } = user;
console.log('City:', city);
console.log('Zip:', zip);

// Default for missing nested property
const { address: { country = 'USA' } } = user;
console.log('Country (default):', country);
