// Slice and Concat
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8];

// Slice (extract indices 1 to 4, exclusive of end)
const slice = arr1.slice(1, 4);
console.log('Slice arr1[1..4):', slice);

// Concat
const combined = arr1.concat(arr2);
console.log('Concatenated:', combined);

// Original arrays unchanged
console.log('Original arr1:', arr1);
console.log('Original arr2:', arr2);
