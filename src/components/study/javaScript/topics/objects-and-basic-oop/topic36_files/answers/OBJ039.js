// Object.fromEntries: Converting Arrays to Objects
const entries = [
    ['a', 1],
    ['b', 2],
    ['c', 3]
];

const obj = Object.fromEntries(entries);
console.log('Object.fromEntries result:', obj);

// Useful for reversing Object.entries
const original = { x: 10, y: 20 };
const back = Object.fromEntries(Object.entries(original));
console.log('Back to object:', back);
console.log('Same reference?', original === back); // false (new object)
