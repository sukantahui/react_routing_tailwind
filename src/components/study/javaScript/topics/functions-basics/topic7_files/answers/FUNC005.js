// Arrow Functions and Concise Syntax
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const addArrow = (a, b) => a + b;

console.log(add(2, 3), addArrow(2, 3)); // 5 5

// Lexical this
const obj = {
    name: 'Arrow',
    traditional: function() {
        console.log('Traditional this:', this.name);
    },
    arrow: () => {
        console.log('Arrow this:', this.name);
    }
};
obj.traditional(); // Arrow
obj.arrow();       // undefined (or global)
