// Prototype and Prototype Chain
const parent = {
    greet() {
        return 'Hello from parent';
    },
    type: 'parent'
};

const child = Object.create(parent);
child.type = 'child';
child.sayHi = function() {
    return 'Hi from child';
};

console.log(child.greet()); // inherited from parent
console.log(child.type);    // own property
console.log(child.sayHi()); // own method

// Prototype chain
console.log('child.__proto__ === parent:', child.__proto__ === parent);
console.log('parent.isPrototypeOf(child):', parent.isPrototypeOf(child));
