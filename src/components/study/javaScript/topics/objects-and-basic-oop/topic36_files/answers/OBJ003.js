// Adding, Updating, Deleting Properties
let obj = {};

// Add properties
obj.name = 'John';
obj.age = 25;
console.log('After adding:', obj);

// Update property
obj.name = 'Jane';
console.log('After update:', obj);

// Delete property
delete obj.age;
console.log('After delete:', obj);

// Check existence
console.log('"name" in obj:', 'name' in obj);
console.log('obj.hasOwnProperty("age"):', obj.hasOwnProperty('age'));
