const topic10_questions = [
  {
    "question": "Under what condition does noneMatch() short-circuit?",
    "shortAnswer": "noneMatch() short-circuits as soon as ANY element evaluates the predicate to true, immediately returning false without processing further elements.",
    "explanation": "Finding even one matching element disproves the assertion that 'none match'.",
    "hint": "Short-circuits on the first true evaluation.",
    "level": "Beginner",
    "codeExample": "List.of(1, 3, 4, 7).stream().noneMatch(n -> n % 2 == 0); // Stops at 4 and returns false"
  },
  {
    "question": "How does noneMatch(p) relate to allMatch() and anyMatch() in boolean logic?",
    "shortAnswer": "noneMatch(p) is logically equivalent to allMatch(p.negate()) and !anyMatch(p).",
    "explanation": "This follows De Morgan's laws applied to stream quantifiers.",
    "hint": "noneMatch(p) === !anyMatch(p) === allMatch(!p).",
    "level": "Intermediate",
    "codeExample": "stream.noneMatch(x -> x < 0) === !stream.anyMatch(x -> x < 0)"
  }
];

export default topic10_questions;
