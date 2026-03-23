// Project: Pure vs Impure Functions
// Description: Write a pure function (no side effects) and an impure function (modifies external state).


// Pure function
function add(a, b) {
    return a + b;
}
// Impure function (modifies external state)
let counter = 0;
function increment() {
    counter++;
}
console.log('Pure: add(2,3) =', add(2,3));
increment();
console.log('Impure: counter =', counter);

