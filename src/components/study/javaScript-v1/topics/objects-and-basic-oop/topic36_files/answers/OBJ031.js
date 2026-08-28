// Combining Object Methods: Filter, Map, Reduce on Objects
const obj = { a: 1, b: null, c: 3, d: 0, e: 5 };

// Filter out falsy values (excluding 0? Let's remove only null/undefined)
const filtered = Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined)
);
console.log('Filtered (remove null/undefined):', filtered);

// Map: double all numeric values
const doubled = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, typeof value === 'number' ? value * 2 : value])
);
console.log('Doubled numbers:', doubled);

// Reduce: sum all numeric values
const sum = Object.values(obj).reduce((acc, val) => acc + (typeof val === 'number' ? val : 0), 0);
console.log('Sum of numbers:', sum);
