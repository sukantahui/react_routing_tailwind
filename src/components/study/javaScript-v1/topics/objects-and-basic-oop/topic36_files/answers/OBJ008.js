// Iterating Objects: for...in
const obj = { a: 1, b: 2 };
// Add inherited property
Object.prototype.inherited = 'inherited';

console.log('All enumerable properties (including inherited):');
for (let key in obj) {
    console.log(`${key}: ${obj[key]}`);
}

console.log('\nOnly own properties:');
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(`${key}: ${obj[key]}`);
    }
}

// Clean up
delete Object.prototype.inherited;
