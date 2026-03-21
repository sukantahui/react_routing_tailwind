// Custom Sort
const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 }
];

people.sort((a, b) => a.age - b.age);
console.log('Sorted by age:', people);
// [{ name:'Bob', age:17 }, { name:'Charlie', age:20 }, { name:'Alice', age:25 }]
