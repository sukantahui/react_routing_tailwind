const topic5_questions = [
  {
    question: "What are the two absolute restrictions on static methods in Java?",
    shortAnswer: "1. Cannot access instance variables or instance methods directly without an explicit object reference. 2. Cannot use the 'this' or 'super' keywords.",
    explanation: "Because static methods execute in class context where no Heap instance pointer is present.",
    hint: "No direct instance field access and no 'this' or 'super'.",
    level: "Beginner",
    codeExample: "static void test() { /* No this.x allowed */ }"
  }
];

export default topic5_questions;