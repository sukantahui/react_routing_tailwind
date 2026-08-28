// Project: Constructor Functions And The New Keyword (Overview)
// Description: This project demonstrates constructor functions and the new keyword (overview) in JavaScript.


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

