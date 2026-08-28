// The delete Operator and Property Removal
const obj = { a: 1, b: 2, c: 3 };

console.log('Before delete:', obj);

delete obj.b;
console.log('After delete obj.b:', obj);

// delete returns true if property existed and was removed
console.log('delete obj.c:', delete obj.c); // true
console.log('delete obj.d (non-existent):', delete obj.d); // true (no error)

// Deleting a non-configurable property fails in strict mode
const frozen = Object.freeze({ x: 1 });
// delete frozen.x; // would fail (ignored in non-strict)
console.log('After delete on frozen object:', frozen);
