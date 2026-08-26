const topic11_questions = [
  {
    "question": "Does findFirst() guarantee returning the same element every time in a parallel stream?",
    "shortAnswer": "Yes, provided the underlying stream has an encounter order (like a List or Array), findFirst() guarantees returning the first element according to that encounter order, even in parallel execution.",
    "explanation": "Worker threads coordinate so that the element from the earliest slice is returned.",
    "hint": "Guaranteed to preserve encounter order even across parallel threads.",
    "level": "Intermediate",
    "codeExample": "List.of('A', 'B', 'C').parallelStream().findFirst(); // Guaranteed to return 'A'"
  },
  {
    "question": "Why does findFirst() return an Optional<T> rather than T or null?",
    "shortAnswer": "To prevent NullPointerExceptions and force client code to explicitly handle the possibility of an empty stream or unmatched filter condition.",
    "explanation": "Optional provides clean fallback methods like orElse(), orElseGet(), and orElseThrow().",
    "hint": "Prevents null checks and guarantees type-safe fallback handling.",
    "level": "Beginner",
    "codeExample": "stream.findFirst().orElse('Default');"
  }
];

export default topic11_questions;
