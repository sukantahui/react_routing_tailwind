const topic3_questions = [
  {
    question: "What does the Open/Closed Principle (OCP) state and how is it achieved in Java?",
    shortAnswer: "OCP states: 'Software entities should be open for extension, but closed for modification.' It is achieved using polymorphism, abstract classes, and interfaces—enabling new behaviors by adding new classes rather than editing existing tested code.",
    explanation: "Prevents breaking existing, working production code when new features are added.",
    hint: "Open for extension (new classes/plugins), closed for modification (don't edit tested classes).",
    level: "Beginner",
    codeExample: "interface Strategy { void execute(); } // New classes implement Strategy"
  }
];

export default topic3_questions;