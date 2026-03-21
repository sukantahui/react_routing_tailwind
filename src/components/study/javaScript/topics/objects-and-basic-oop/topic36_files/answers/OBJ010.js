// Looping Arrays of Objects with map, filter, reduce
const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 }
];

// Filter adults
const adults = users.filter(user => user.age > 18);
console.log('Adults:', adults);

// Map to names
const adultNames = adults.map(user => user.name);
console.log('Adult names:', adultNames);

// Reduce to sum ages
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log('Total age:', totalAge);
