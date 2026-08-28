// Project: Default Parameters and Return
// Description: Create a function with default parameters and early return.


function greet(name = 'Guest') {
    if (!name) return;
    return `Hello ${name}`;
}
console.log(greet('Alice'));
console.log(greet());

