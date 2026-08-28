// Project: Advanced: Es6 Class Syntax, Constructor, Methods And Basic Inheritance (Conceptual)
// Description: This project demonstrates advanced: es6 class syntax, constructor, methods and basic inheritance (conceptual) in JavaScript.


// Constructor function
function Animal(name) {
    this.name = name;
}
Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};
// ES6 class
class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}
const animal = new Animal('Generic');
animal.speak();
const dog = new Dog('Rex');
dog.speak();

