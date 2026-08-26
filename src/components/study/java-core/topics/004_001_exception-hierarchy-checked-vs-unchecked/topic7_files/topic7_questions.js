const topic7_questions = [
  {
    "question": "What is the industry guideline for choosing between Checked and Unchecked custom exceptions in Java?",
    "shortAnswer": "1. Use Checked Exceptions for recoverable conditions where the caller can take concrete action to fix the situation (e.g. prompt for shortfall deposit, retry a network request). 2. Use Unchecked Exceptions (RuntimeException) for programming bugs, contract violations, and preconditions (e.g. passing null or negative arguments).",
    "explanation": "Effective Java Item 70: Use checked exceptions for recoverable conditions and runtime exceptions for programming errors.",
    "hint": "Checked for recoverable business conditions; Unchecked for programming defects and preconditions.",
    "level": "Intermediate",
    "codeExample": "class ShortfallException extends Exception {} // Checked\\nclass InvalidArgException extends RuntimeException {} // Unchecked"
  }
];

export default topic7_questions;