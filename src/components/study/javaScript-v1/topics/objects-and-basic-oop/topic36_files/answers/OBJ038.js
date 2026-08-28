// Nested Destructuring with Defaults
const data = {
    user: {
        name: 'Alice'
        // age is missing
    }
};

const {
    user: {
        name,
        age = 30,
        address: { city = 'Unknown' } = {} // default empty object to avoid error
    }
} = data;

console.log('Name:', name);
console.log('Age (default):', age);
console.log('City (default):', city);
