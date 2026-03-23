// Immediately Invoked Function Expressions (IIFE)
(function() {
    var privateVar = 'I am private';
    console.log('IIFE executed:', privateVar);
})();

// privateVar is not accessible here
// console.log(privateVar); // ReferenceError
