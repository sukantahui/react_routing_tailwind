const topic12_questions = [
  {
    question: "What defines a Functional Interface in Java and what does '@FunctionalInterface' do?",
    shortAnswer: "A Functional Interface contains EXACTLY ONE abstract method (SAM). The '@FunctionalInterface' annotation is an optional compiler check ensuring no additional abstract methods are added.",
    explanation: "Functional interfaces serve as target types for Lambda expressions (e.g. Runnable, Callable, Comparator).",
    hint: "Contains exactly ONE abstract method; target for lambda expressions.",
    level: "Beginner",
    codeExample: "@FunctionalInterface interface Action { void execute(); }"
  }
];

export default topic12_questions;