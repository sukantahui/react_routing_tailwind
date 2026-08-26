const topic10_questions = [
  {
    question: "Why were 'private' and 'private static' methods added to interfaces in Java 9?",
    shortAnswer: "To prevent code duplication across multiple default methods and static methods within the interface by encapsulating shared helper code privately without exposing internal implementation details to implementing classes or callers.",
    explanation: "Provides clean encapsulation and DRY (Don't Repeat Yourself) principle inside interfaces.",
    hint: "Encapsulates shared helper code for default and static methods without exposing it.",
    level: "Intermediate",
    codeExample: "private void helper() {} private static void staticHelper() {}"
  }
];

export default topic10_questions;