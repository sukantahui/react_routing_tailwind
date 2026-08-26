const topic6_questions = [
  {
    question: "Why should you always use '.equals()' instead of '==' when comparing Strings in Java?",
    shortAnswer: "'==' checks if both string variables point to the exact same memory address on the Heap. '.equals()' compares the actual characters inside the strings. Using '==' will fail when comparing strings loaded from files, scanners, or 'new String()' constructors.",
    explanation: "Using '==' for string comparisons is the #1 cause of bugs in beginner Java code.",
    hint: "'==' compares memory addresses; .equals() compares character contents.",
    level: "Beginner",
    codeExample: "if (\"admin\".equals(inputRole)) { /* Safe & correct */ }"
  }
];

export default topic6_questions;
