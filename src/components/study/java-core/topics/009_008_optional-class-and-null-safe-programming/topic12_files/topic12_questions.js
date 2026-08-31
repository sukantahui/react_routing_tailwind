const topic12_questions = [
  {
    "question": "What happens if the function passed to Optional.map() returns null?",
    "shortAnswer": "Optional.map() automatically converts the null result into Optional.empty() using Optional.ofNullable() under the hood, preventing NullPointerExceptions.",
    "explanation": "Protects against legacy getter methods returning null.",
    "hint": "Returns Optional.empty() safely.",
    "level": "Intermediate",
    "codeExample": "Optional.of('text').map(s → (String) null); // Returns Optional.empty()"
  },
  {
    "question": "How does Optional.map() prevent nested null checks in deep object graphs?",
    "shortAnswer": "By chaining map() calls: studentOpt.map(Student::getAddress).map(Address::getCity).orElse('Default'). If any intermediate getter returns null or is empty, the pipeline immediately resolves to Optional.empty().",
    "explanation": "Flattens what would otherwise be a deeply nested if-null tree.",
    "hint": "Chaining map() calls propagates empty state safely across the graph.",
    "level": "Beginner",
    "codeExample": "userOpt.map(User::getProfile).map(Profile::getEmail).orElse('no-email');"
  }
];

export default topic12_questions;
