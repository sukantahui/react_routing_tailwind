const topic11_questions = [
  {
    "question": "What does optional.filter(predicate) return if the Optional is empty?",
    "shortAnswer": "It returns Optional.empty() immediately without evaluating the predicate.",
    "explanation": "Safe to call without checking isPresent() first.",
    "hint": "Returns Optional.empty() without running the predicate.",
    "level": "Beginner",
    "codeExample": "Optional.<String>empty().filter(s → s.length() > 5); // Returns Optional.empty()"
  },
  {
    "question": "How can you validate that a String Optional contains non-blank text using filter?",
    "shortAnswer": "By chaining .filter(Predicate.not(String::isBlank)) or .filter(s → !s.trim().isEmpty()).",
    "explanation": "Converts blank string Optionals to Optional.empty() cleanly.",
    "hint": "opt.filter(Predicate.not(String::isBlank))",
    "level": "Intermediate",
    "codeExample": "Optional<String> validText = textOpt.filter(Predicate.not(String::isBlank));"
  }
];

export default topic11_questions;
