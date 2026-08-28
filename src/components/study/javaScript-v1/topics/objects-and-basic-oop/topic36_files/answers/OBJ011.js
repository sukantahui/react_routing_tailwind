// Objects as Reference Types
let obj1 = { a: 1, b: 2 };
let obj2 = obj1; // obj2 references the same object

console.log('obj1:', obj1);
console.log('obj2:', obj2);

obj2.a = 99;
console.log('After modifying obj2.a = 99:');
console.log('obj1:', obj1);
console.log('obj2:', obj2);

// Equality comparison
let obj3 = { a: 1, b: 2 };
console.log('obj1 === obj2:', obj1 === obj2); // true
console.log('obj1 === obj3:', obj1 === obj3); // false
