// Flatten Nested Arrays
function flatten(arr) {
    return arr.reduce((acc, curr) => acc.concat(curr), []);
}

const nested = [[1, 2], [3, 4], [5, 6]];
const flat = flatten(nested);
console.log('Flattened:', flat); // [1, 2, 3, 4, 5, 6]
