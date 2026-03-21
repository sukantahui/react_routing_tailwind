// Spread and Rest Operator for Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// Spread to merge
const merged = { ...obj1, ...obj2 };
console.log('Merged:', merged);

// Rest in destructuring
const { a, ...rest } = merged;
console.log('a:', a);
console.log('rest:', rest);
