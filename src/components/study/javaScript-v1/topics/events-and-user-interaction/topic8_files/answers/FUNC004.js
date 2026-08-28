// Function Scope: Local vs Global Variables
let globalVar = 'global';

function testScope() {
    let localVar = 'local';
    console.log('Inside function:', globalVar, localVar);
}

testScope();
// console.log(localVar); // ReferenceError: localVar is not defined
