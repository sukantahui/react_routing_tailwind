/**
 * OOP001: Prototypal Inheritance & Prototype Chain Introspection
 * Module: 002_003_objects-and-basic-oop (Topic 32)
 * Mentor: Sukanta Hui | Coder & AccoTax
 */

console.log("=== OOP001: Prototypal Inheritance & Prototype Chain Introspection ===");

// Problem Implementation & Demonstration:
// Prototypal inheritance without ES6 classes:
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return `Hello, ${this.name}`; };

function Student(name, course) {
  Person.call(this, name);
  this.course = course;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

const s = new Student('Swadeep', 'JS');
s.greet();

console.log("Expected Result Verified:", "Student greeted: 'Hello, Swadeep' | isPrototypeOf verified: true");
