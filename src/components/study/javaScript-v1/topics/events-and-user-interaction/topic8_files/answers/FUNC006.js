// Pure Functions vs Side Effects
let counter = 0;

// Impure function: modifies external state
function impure() {
    counter++;
    return counter;
}

// Pure function: no side effects, same input => same output
function pure(a, b) {
    return a + b;
}

console.log(pure(1, 2)); // 3
console.log(pure(1, 2)); // 3
console.log(impure());   // 1
console.log(impure());   // 2
