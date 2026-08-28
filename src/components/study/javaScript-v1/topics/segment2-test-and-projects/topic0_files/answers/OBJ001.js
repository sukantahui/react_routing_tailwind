// Project: Object Literals and Dot/Bracket Notation
// Description: Create an object, access/modify properties using dot and bracket notation.


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

