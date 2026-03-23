// Project: Arrow Functions and Lexical this
// Description: Compare traditional function and arrow function, focusing on `this` binding.


const add = (a, b) => a + b;
const square = x => x * x;
const greet = name => `Hello, ${name}!`;
console.log(add(3, 4));
console.log(square(5));
console.log(greet('Alice'));
// Lexical this example
const obj = {
    name: 'Object',
    regular: function() { console.log(this.name); },
    arrow: () => console.log(this.name)
};
obj.regular(); // 'Object'
obj.arrow();   // undefined (window/global)

