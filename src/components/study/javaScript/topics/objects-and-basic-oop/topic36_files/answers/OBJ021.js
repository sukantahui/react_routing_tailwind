// Constructor Functions
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const alice = new Person('Alice', 30);
const bob = new Person('Bob', 25);

console.log(alice);
console.log(bob);
console.log('alice instanceof Person:', alice instanceof Person);
