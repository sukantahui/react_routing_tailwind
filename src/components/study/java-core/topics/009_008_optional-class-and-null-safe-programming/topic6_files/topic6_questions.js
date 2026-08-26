const topic6_questions = [
  {
    "question": "Why was orElseThrow() added in Java 10 when get() already existed?",
    "shortAnswer": "orElseThrow() was added as a clearer, self-documenting alternative to get(). Its name explicitly signals to developers and code reviewers that an exception will be thrown if the value is absent.",
    "explanation": "Java language architects consider get() to have been poorly named.",
    "hint": "Self-documenting method name that makes the risk of an exception explicit.",
    "level": "Beginner",
    "codeExample": "User user = repo.findById(id).orElseThrow();"
  },
  {
    "question": "What exception type is thrown by orElseThrow() when invoked on an empty Optional?",
    "shortAnswer": "java.util.NoSuchElementException with the detail message 'No value present'.",
    "explanation": "Standard JDK runtime exception for missing elements.",
    "hint": "NoSuchElementException",
    "level": "Beginner",
    "codeExample": "Optional.empty().orElseThrow(); // Throws NoSuchElementException"
  }
];

export default topic6_questions;
