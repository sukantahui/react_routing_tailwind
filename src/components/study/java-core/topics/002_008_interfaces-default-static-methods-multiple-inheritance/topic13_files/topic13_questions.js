const topic13_questions = [
  {
    question: "What are the primary structural differences between an Abstract Class and an Interface in Java?",
    shortAnswer: "1. State: Abstract classes have instance fields; interfaces have only 'public static final' constants. 2. Constructors: Abstract classes have constructors; interfaces do not. 3. Inheritance: A class can extend only 1 abstract class, but can implement MULTIPLE interfaces.",
    explanation: "Use abstract classes for closely related hierarchies sharing state; use interfaces for flexible role capabilities.",
    hint: "Abstract classes have constructors/fields; interfaces support multiple implementation and constants only.",
    level: "Intermediate",
    codeExample: "// Abstract Class: State + Single Inheritance\n// Interface: Contract + Multiple Inheritance"
  }
];

export default topic13_questions;