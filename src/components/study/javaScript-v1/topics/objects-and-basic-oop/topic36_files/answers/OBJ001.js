// Object Literals Basics
const person = {
    name: 'Alice',
    age: 30,
    greet() {
        return `Hi, I'm ${this.name}`;
    }
};

console.log('Dot notation:', person.name, person.age);
console.log('Bracket notation:', person['name'], person['age']);
console.log('Greeting:', person.greet());

// Using bracket with variable
const key = 'name';
console.log('Dynamic key:', person[key]);
