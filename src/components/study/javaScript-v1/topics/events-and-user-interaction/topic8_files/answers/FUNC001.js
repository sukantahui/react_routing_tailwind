// Function Declarations vs Function Expressions
console.log(declaration()); // Works due to hoisting

function declaration() {
    return 'Function declaration works!';
}

// console.log(expression()); // TypeError: expression is not a function
const expression = function() {
    return 'Function expression works only after assignment';
};

console.log(expression()); // Now it works
