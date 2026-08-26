const topic0_questions = [
  {
    question: "What is 'java.lang.Object' and why is it referred to as the 'cosmic root superclass'?",
    shortAnswer: "'java.lang.Object' sits at the very apex of the Java class hierarchy. Every single class in Java (including user-defined classes and arrays) directly or indirectly extends Object.",
    explanation: "If no 'extends' clause is written, the compiler automatically inserts 'extends java.lang.Object'.",
    hint: "The root superclass of every class and array in the Java language.",
    level: "Beginner",
    codeExample: "Object obj = new String(\\\"test\\\"); // Universal reference"
  }
];

export default topic0_questions;