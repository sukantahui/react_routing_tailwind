const questions = [
  {
    id: 1,
    question: "What is the primary role of the 'this' keyword when used inside a Java constructor?",
    options: [
      "To destroy the current object from memory",
      "To refer to the current class instance and resolve variable shadowing",
      "To convert primitive data types into wrapper objects",
      "To call static methods of another class"
    ],
    correctAnswer: 1,
    explanation: "The 'this' keyword refers to the current executing object instance, allowing Java to distinguish between instance fields and local method parameters when they share the same name."
  },
  {
    id: 2,
    question: "Consider: class Book { String title; Book(String title) { title = title; } }. What happens when an object is instantiated with 'new Book(\"Java\")'?",
    options: [
      "The instance variable 'title' receives the value \"Java\".",
      "Variable shadowing occurs: parameter assigns to itself, leaving instance variable 'title' as null.",
      "A compilation error occurs due to duplicate variable names.",
      "The JVM throws a NullPointerException."
    ],
    correctAnswer: 1,
    explanation: "Without 'this.title = title;', the parameter title assigns to itself (local scope), leaving the instance field 'title' uninitialized (null)."
  },
  {
    id: 3,
    question: "Which constructor call correctly instantiates: 'class Car { Car(String model, int speed) {} }'?",
    options: [
      "Car c = new Car();",
      "Car c = new Car(\"Tesla\", 120);",
      "Car c = Car(\"Tesla\", 120);",
      "Car c = new Car(120, \"Tesla\");"
    ],
    correctAnswer: 1,
    explanation: "The arguments must match the constructor's parameter types and sequence: String followed by int."
  }
];

export default questions;
