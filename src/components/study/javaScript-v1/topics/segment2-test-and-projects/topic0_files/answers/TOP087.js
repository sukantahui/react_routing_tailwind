// Project: Advanced: Object Literals: Keys, Values, Methods
// Description: This project demonstrates advanced: object literals: keys, values, methods in JavaScript.


const person = {
    name: 'Alice',
    age: 25,
    greet() {
        console.log(`Hi, I'm ${this.name}`);
    }
};
console.log(person.name);
person.greet();
// Dot vs bracket
console.log(person['age']);
person['city'] = 'New York';
console.log(person);

