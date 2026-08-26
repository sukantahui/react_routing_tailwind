const topic9_questions = [
  {
    "question": "What happens if a map() transformation is called on an empty Optional?",
    "shortAnswer": "The mapping function is never invoked, and Optional.empty() is returned immediately.",
    "explanation": "Allows chaining transformations safely without null checks at each step.",
    "hint": "The mapping function is skipped and Optional.empty() is returned.",
    "level": "Beginner",
    "codeExample": "Optional.empty().map(String::toUpperCase); // Returns Optional.empty() safely"
  },
  {
    "question": "How does Optional.filter(predicate) behave when the predicate evaluates to false?",
    "shortAnswer": "It converts the Optional into Optional.empty(). If the predicate evaluates to true, the original Optional is returned unchanged.",
    "explanation": "Enables declarative conditional validation.",
    "hint": "Returns Optional.empty() if predicate is false.",
    "level": "Beginner",
    "codeExample": "Optional.of('Java').filter(s -> s.length() > 10); // Returns Optional.empty()"
  }
];

export default topic9_questions;
