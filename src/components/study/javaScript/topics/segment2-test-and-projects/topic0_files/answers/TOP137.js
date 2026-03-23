// Project: Advanced: Working With Attributes, Classes And Data-* Attributes
// Description: This project demonstrates advanced: working with attributes, classes and data-* attributes in JavaScript.


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

