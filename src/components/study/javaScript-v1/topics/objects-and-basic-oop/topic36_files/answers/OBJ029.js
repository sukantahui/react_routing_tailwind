// Merging Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };

// Using spread
const mergedSpread = { ...obj1, ...obj2 };
console.log('Merged with spread:', mergedSpread); // { a:1, b:3, c:4 }

// Using Object.assign
const mergedAssign = Object.assign({}, obj1, obj2);
console.log('Merged with assign:', mergedAssign);
