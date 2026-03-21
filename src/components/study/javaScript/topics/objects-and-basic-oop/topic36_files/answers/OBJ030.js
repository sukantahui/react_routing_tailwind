// Checking Object Equality
const objA = { a: 1, b: 2 };
const objB = { a: 1, b: 2 };
const objC = objA;

console.log('objA === objB (reference):', objA === objB); // false
console.log('objA === objC (reference):', objA === objC); // true

// Content equality (shallow, using JSON)
function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

console.log('Content equality (objA, objB):', isEqual(objA, objB)); // true
console.log('Content equality (objA, objC):', isEqual(objA, objC)); // true
