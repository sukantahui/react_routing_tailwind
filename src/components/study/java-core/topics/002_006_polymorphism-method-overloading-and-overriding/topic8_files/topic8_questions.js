const topic8_questions = [
  {
    question: "Which 3 categories of methods CANNOT be overridden in Java?",
    shortAnswer: "1. private methods (invisible to child subclasses). 2. static methods (subject to Method Hiding via compile-time binding). 3. final methods (explicitly locked by compiler).",
    explanation: "Constructors are also not methods and cannot be overridden.",
    hint: "private, static, and final methods.",
    level: "Beginner",
    codeExample: "// private void m1() {}\n// static void m2() {}\n// final void m3() {}"
  }
];

export default topic8_questions;