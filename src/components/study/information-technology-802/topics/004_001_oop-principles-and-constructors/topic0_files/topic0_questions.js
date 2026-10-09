export default [
  {
    question: "Name the four fundamental pillars of Object-Oriented Programming (OOP) in Java.",
    answer: "The four pillars are:\n1. Abstraction (Hiding complex implementation details and showing only essential features).\n2. Encapsulation (Wrapping data/fields and code/methods into a single unit and restricting direct access via private variables).\n3. Inheritance (Mechanism by which one class acquires the properties and behaviors of a parent class).\n4. Polymorphism (Ability of a message, method, or object to take on multiple forms, such as method overloading and method overriding).",
    marks: 4,
    hint: "Recall the acronym A-E-I-P."
  },
  {
    question: "Which OOP principle focuses on wrapping data members and methods into a single protective capsule?",
    options: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"],
    correctAnswer: 0,
    explanation: "Encapsulation is the process of binding data variables and methods together within a class, shielding internal state using private access modifiers.",
    marks: 1
  },
  {
    question: "Which OOP principle allows a class to reuse existing code from an existing parent class?",
    options: ["Inheritance", "Abstraction", "Encapsulation", "Compilation"],
    correctAnswer: 0,
    explanation: "Inheritance enables code reusability and creates an 'is-a' hierarchical relationship using the 'extends' keyword in Java.",
    marks: 1
  },
  {
    question: "What is the difference between Abstraction and Encapsulation?",
    answer: "Abstraction focuses on 'what' an object does by presenting external interfaces while hiding internal complexity (e.g. driving a car by using the accelerator without knowing engine combustion mechanics). Encapsulation focuses on 'how' to achieve data hiding and security by bundling variables and methods together with private access modifiers and public getters/setters.",
    marks: 3,
    hint: "Abstraction = hiding complexity; Encapsulation = hiding data."
  },
  {
    question: "Which concept is demonstrated when multiple methods have the same name but different parameter lists?",
    options: ["Polymorphism (Method Overloading)", "Inheritance", "Data Hiding", "Package Import"],
    correctAnswer: 0,
    explanation: "Compile-time polymorphism in Java is implemented via Method Overloading, where methods share the same name with different signatures.",
    marks: 1
  }
];
