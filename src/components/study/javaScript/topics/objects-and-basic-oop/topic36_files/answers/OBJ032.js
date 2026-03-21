// Property Descriptors: Enumerable, Writable, Configurable
const obj = { visible: 'I am visible' };

// Define a property with custom descriptor
Object.defineProperty(obj, 'hidden', {
    value: 42,
    enumerable: false,  // won't appear in for...in or Object.keys
    writable: false,    // cannot change
    configurable: false // cannot delete or redefine
});

console.log('obj.hidden:', obj.hidden); // 42

// Check descriptor
const desc = Object.getOwnPropertyDescriptor(obj, 'hidden');
console.log('Descriptor:', desc);

// for...in only shows enumerable properties
for (const key in obj) {
    console.log(`for...in: ${key}`);
}
// Output: "visible"

// Object.keys also only enumerable
console.log('Object.keys:', Object.keys(obj)); // ['visible']

// Trying to modify a non-writable property
obj.hidden = 100; // ignored (in non-strict) or throws in strict
console.log('obj.hidden after assignment:', obj.hidden); // 42
