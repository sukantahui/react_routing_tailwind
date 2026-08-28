// Adding Methods Using Prototypes
function Person(name) {
    this.name = name;
}

// Add method to prototype
Person.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

const alice = new Person('Alice');
const bob = new Person('Bob');

console.log(alice.greet()); // Hello, I'm Alice
console.log(bob.greet());   // Hello, I'm Bob

// Method is shared
console.log(alice.greet === bob.greet); // true
