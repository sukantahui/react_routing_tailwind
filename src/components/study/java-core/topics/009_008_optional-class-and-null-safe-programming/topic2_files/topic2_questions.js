const topic2_questions = [
  {
    "question": "What happens if you pass a null value to Optional.of() versus Optional.ofNullable()?",
    "shortAnswer": "Optional.of(null) throws a NullPointerException immediately at creation time, whereas Optional.ofNullable(null) safely returns Optional.empty() without throwing any exception.",
    "explanation": "Use Optional.of when null is an illegal bug condition; use Optional.ofNullable when null is a valid representation of absence.",
    "hint": "Optional.of(null) throws NPE; Optional.ofNullable(null) returns Optional.empty().",
    "level": "Beginner",
    "codeExample": "Optional.of(null); // Throws NPE!\\nOptional.ofNullable(null); // Returns Optional.empty()"
  },
  {
    "question": "Is Optional.empty() allocated as a new object on the heap every time it is called?",
    "shortAnswer": "No, Optional.empty() returns a cached immutable singleton instance, avoiding unnecessary heap allocations.",
    "explanation": "Memory efficient singleton pattern inside the JDK.",
    "hint": "Returns a shared singleton instance.",
    "level": "Intermediate",
    "codeExample": "Optional.empty() === Optional.empty(); // True (same singleton)"
  }
];

export default topic2_questions;
