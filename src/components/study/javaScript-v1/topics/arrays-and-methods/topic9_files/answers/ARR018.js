// Group By Property
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 25 }
];

const grouped = people.reduce((acc, person) => {
    const age = person.age;
    if (!acc[age]) acc[age] = [];
    acc[age].push(person.name);
    return acc;
}, {});

console.log('Grouped by age:', grouped);
// { 25: ['Alice', 'Charlie'], 17: ['Bob'] }
