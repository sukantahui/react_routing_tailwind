// Checking if Object is Empty
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

console.log('isEmpty({}):', isEmpty({})); // true
console.log('isEmpty({ a: 1 }):', isEmpty({ a: 1 })); // false
console.log('isEmpty({ length: 0 }):', isEmpty({ length: 0 })); // false (has property)
