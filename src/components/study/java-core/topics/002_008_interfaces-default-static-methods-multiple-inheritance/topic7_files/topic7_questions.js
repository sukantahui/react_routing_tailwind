const topic7_questions = [
  {
    question: "Why were 'default' methods introduced in interfaces in Java 8?",
    shortAnswer: "To enable backward compatibility by allowing API developers (such as the Java Collections Framework team) to add new methods to existing interfaces (like 'forEach()' and 'stream()' in Collection) without breaking existing third-party implementing classes.",
    explanation: "Implementing classes automatically inherit the default method without compilation errors.",
    hint: "Enables adding new methods to existing interfaces without breaking legacy implementations.",
    level: "Intermediate",
    codeExample: "interface List { default void sort() {} }"
  }
];

export default topic7_questions;