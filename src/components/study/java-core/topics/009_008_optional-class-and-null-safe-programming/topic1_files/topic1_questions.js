const topic1_questions = [
  {
    "question": "Is an empty Optional object the same as a null reference?",
    "shortAnswer": "No! An empty Optional (Optional.empty()) is a valid, non-null heap object instance representing an empty box. Invoking methods on Optional.empty() is completely safe and never throws a NullPointerException.",
    "explanation": "This eliminates null pointer dereferencing completely.",
    "hint": "Optional.empty() is a valid non-null instance, not a null pointer.",
    "level": "Beginner",
    "codeExample": "Optional<String> opt = Optional.empty(); opt.isPresent(); // Returns false safely!"
  },
  {
    "question": "When was the isEmpty() method added to the java.util.Optional class?",
    "shortAnswer": "isEmpty() was introduced in Java 11 as the direct inverse of isPresent(), eliminating the need to write !opt.isPresent().",
    "explanation": "Improves code readability.",
    "hint": "Java 11",
    "level": "Beginner",
    "codeExample": "if (opt.isEmpty()) { ... }"
  }
];

export default topic1_questions;
