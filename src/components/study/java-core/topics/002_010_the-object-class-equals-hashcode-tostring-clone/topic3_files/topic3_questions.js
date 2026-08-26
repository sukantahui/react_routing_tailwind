const topic3_questions = [
  {
    question: "What is the fundamental difference between the '==' operator and the 'equals()' method in Java?",
    shortAnswer: "'==' tests for reference identity (checks if both variables point to the exact same memory address on the Heap). 'equals()' tests for logical/semantic equality (compares internal field values when overridden).",
    explanation: "By default, Object.equals() uses '==' until overridden by a class like String or custom entities.",
    hint: "'==' compares memory addresses; 'equals()' compares field contents.",
    level: "Beginner",
    codeExample: "s1 == s2; // false (different objects)\ns1.equals(s2); // true (same fields)"
  }
];

export default topic3_questions;