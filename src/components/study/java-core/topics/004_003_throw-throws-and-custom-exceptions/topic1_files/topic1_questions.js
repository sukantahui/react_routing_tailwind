const topic1_questions = [
  {
    "question": "Why does Effective Java Item 72 advise developers to favor reusing standard exceptions (IllegalArgumentException, IllegalStateException, NoSuchElementException, UnsupportedOperationException) over inventing new custom exceptions?",
    "shortAnswer": "1. Makes APIs easier to learn and read because all Java programmers already understand standard exception semantics. 2. Decreases memory footprint and classloader overhead. 3. Keeps exception hierarchies clean without redundant custom classes that add no new domain information.",
    "explanation": "Only create custom exceptions if you have domain-specific recovery metadata.",
    "hint": "Increases API readability, leverages existing idioms, and prevents class bloat.",
    "level": "Intermediate",
    "codeExample": "throw new UnsupportedOperationException(\"Immutable list cannot be modified\");"
  }
];

export default topic1_questions;