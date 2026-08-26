const topic15_questions = [
  {
    "question": "Why should an Optional variable itself never be assigned null (e.g. Optional<String> opt = null)?",
    "shortAnswer": "Because it completely defeats the purpose of Optional, causing NullPointerExceptions when calling opt.isPresent() or opt.orElse(). Always use Optional.empty() instead of null.",
    "explanation": "Assigning null to an Optional reference creates a meta-null disaster.",
    "hint": "Always initialize with Optional.empty() rather than null.",
    "level": "Beginner",
    "codeExample": "// BAD:\\nOptional<String> opt = null;\\n// GOOD:\\nOptional<String> opt = Optional.empty();"
  },
  {
    "question": "What was the primary design intent for adding java.util.Optional to Java 8?",
    "shortAnswer": "To serve as a method return type for library and domain APIs where returning 'no result' was expected and returning null was historically prone to causing NullPointerExceptions.",
    "explanation": "Optional is a return-type design tool, not a universal null replacement.",
    "hint": "Designed primarily as a method return type to signal possible absence.",
    "level": "Intermediate",
    "codeExample": "public Optional<Student> findByEmail(String email);"
  }
];

export default topic15_questions;
