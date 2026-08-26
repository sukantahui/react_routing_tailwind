const topic0_questions = [
  {
    question: "Why does 'java.lang.Math' have a private constructor and why can it not be instantiated?",
    shortAnswer: "'java.lang.Math' is a utility class containing only static constants (PI, E) and static methods. Having a private constructor prevents accidental instantiation ('new Math()'), and being declared 'final' prevents subclassing.",
    explanation: "Standard design pattern for pure utility helper classes.",
    hint: "Pure static utility class; private constructor prevents instantiation.",
    level: "Beginner",
    codeExample: "double circle = Math.PI * Math.pow(radius, 2);"
  }
];

export default topic0_questions;