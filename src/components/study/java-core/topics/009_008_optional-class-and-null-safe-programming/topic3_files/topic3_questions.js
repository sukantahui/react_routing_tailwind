const topic3_questions = [
  {
    "question": "Why is calling Optional.get() without a preceding isPresent() check considered a code smell?",
    "shortAnswer": "Because it throws an unchecked NoSuchElementException at runtime if the Optional is empty, defeating the entire compile-time safety objective of using the Optional class.",
    "explanation": "Modern IDEs (like IntelliJ) flag raw .get() calls as severe warnings.",
    "hint": "Throws NoSuchElementException if empty, defeating Optional safety.",
    "level": "Beginner",
    "codeExample": "// BAD:\\nString s = opt.get();\\n// GOOD:\\nString s = opt.orElse('Default');"
  },
  {
    "question": "What is the recommended alternative to optional.get() in Java 10+ when you explicitly want to throw an exception if absent?",
    "shortAnswer": "Call optional.orElseThrow(), which clearly communicates the intent that absence is an exceptional state.",
    "explanation": "orElseThrow() is preferred over get() because its name makes the risk explicit.",
    "hint": "optional.orElseThrow()",
    "level": "Beginner",
    "codeExample": "User user = userRepository.findById(id).orElseThrow();"
  }
];

export default topic3_questions;
