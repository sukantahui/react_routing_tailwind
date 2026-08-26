const topic2_questions = [
  {
    question: "What are the primary rules when using the 'extends' keyword in Java class declarations?",
    shortAnswer: "1. A class can extend at most ONE direct superclass (single class inheritance). 2. Cannot extend a class marked 'final'. 3. Child must have access to at least one parent constructor.",
    explanation: "Java does not support multiple class inheritance ('class C extends A, B' is a compile-time error).",
    hint: "Single class extension only; cannot extend final classes.",
    level: "Beginner",
    codeExample: "public class Dog extends Animal { /* Valid */ }"
  }
];

export default topic2_questions;