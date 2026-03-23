// Project: Function Declaration vs Expression
// Description: Define a function using declaration and an expression; show hoisting difference.


// Function declaration (hoisted)
console.log(factorial(5)); // works even before definition
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}
// Function expression (not hoisted)
const square = function(x) { return x * x; };
console.log(square(4));

