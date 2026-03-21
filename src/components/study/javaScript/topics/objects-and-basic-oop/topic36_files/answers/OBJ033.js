// Object.create and Custom Prototypes
const animal = {
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
};

const dog = Object.create(animal);
dog.name = 'Rex';
dog.bark = function() {
    console.log('Woof!');
};

dog.speak(); // Rex makes a sound.
dog.bark();  // Woof!

console.log('dog.__proto__ === animal:', dog.__proto__ === animal);
console.log('animal.isPrototypeOf(dog):', animal.isPrototypeOf(dog));
