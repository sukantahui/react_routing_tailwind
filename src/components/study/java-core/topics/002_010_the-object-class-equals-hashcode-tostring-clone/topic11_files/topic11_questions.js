const topic11_questions = [
  {
    question: "What are the benefits of using 'java.util.Objects.equals()' and 'java.util.Objects.hash()' (introduced in Java 7)?",
    shortAnswer: "1. 'Objects.equals(a, b)' prevents NullPointerExceptions by handling null checks gracefully. 2. 'Objects.hash(f1, f2, f3)' computes a robust, multi-field hash code in a single concise line of code.",
    explanation: "Eliminates tedious manual null checks and boilerplate prime multiplier calculations.",
    hint: "Provides null-safe equality checks and concise multi-field hash generation.",
    level: "Beginner",
    codeExample: "return Objects.equals(this.name, other.name);\nreturn Objects.hash(id, name, score);"
  }
];

export default topic11_questions;