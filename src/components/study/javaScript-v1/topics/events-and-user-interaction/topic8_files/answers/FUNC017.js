// Function Methods: call, apply, bind
function greet(greeting) {
    console.log(`${greeting}, ${this.name}`);
}

const person = { name: 'Alice' };

// call
greet.call(person, 'Hello'); // Hello, Alice

// apply
greet.apply(person, ['Hi']); // Hi, Alice

// bind
const boundGreet = greet.bind(person, 'Hey');
boundGreet(); // Hey, Alice
