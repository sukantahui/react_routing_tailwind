const topic1_questions = [
  {
    "question": "Why is it safe and recommended to compare Enum constants using the reference equality operator '==' in Java?",
    "shortAnswer": "Because the JVM guarantees that each enum constant is an absolute singleton instance created once during class loading. There is only ever one instance of each enum constant in memory, making '==' completely safe, null-safe, and faster than '.equals()'.",
    "explanation": "'==' prevents NullPointerException if the reference is null.",
    "hint": "Enum constants are singleton instances in the JVM, so '==' is safe and null-friendly.",
    "level": "Beginner",
    "codeExample": "if (status == Status.ACTIVE) { ... } // Safe against null!"
  }
];

export default topic1_questions;