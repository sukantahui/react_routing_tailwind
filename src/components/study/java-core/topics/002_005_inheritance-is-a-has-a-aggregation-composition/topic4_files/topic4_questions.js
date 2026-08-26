const topic4_questions = [
  {
    question: "What is the Diamond Problem in object-oriented programming and how does Java avoid it?",
    shortAnswer: "The Diamond Problem occurs when a class inherits from two parent classes that share a common ancestor and both override the same method, creating ambiguity about which method the child inherits. Java eliminates this by disallowing multiple class inheritance.",
    explanation: "Java solves multiple behavior needs cleanly using Interfaces with explicit conflict resolution rules.",
    hint: "Ambiguity arising from multiple parents with identical method signatures; avoided by disallowing multiple class inheritance.",
    level: "Intermediate",
    codeExample: "// Disallowed: class C extends A, B {}"
  }
];

export default topic4_questions;