// Parameters, Arguments, and Default Parameters
function greet(name = 'Guest') {
    return `Hello, ${name}`;
}

console.log(greet('Alice')); // Hello, Alice
console.log(greet());        // Hello, Guest
