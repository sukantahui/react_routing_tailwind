// Project: Advanced: Es6 Class Syntax: Constructor, Instance Methods, Static Methods
// Description: This project demonstrates advanced: es6 class syntax: constructor, instance methods, static methods in JavaScript.


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

