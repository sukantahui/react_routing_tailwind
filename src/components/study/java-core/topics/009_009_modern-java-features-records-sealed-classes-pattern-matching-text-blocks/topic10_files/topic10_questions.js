const topic10_questions = [
  {
    "question": "How does Java 21 pattern switch handle null values?",
    "shortAnswer": "In Java 21, you can explicitly define a 'case null ->' branch inside the switch. If no 'case null' is provided and null is passed to a pattern switch, it throws a NullPointerException by default.",
    "explanation": "Provides clean, declarative null handling.",
    "hint": "Supports explicit 'case null ->' branch.",
    "level": "Beginner",
    "codeExample": "switch (obj) { case null -> 'Empty'; case String s -> s; default -> 'Other'; }"
  },
  {
    "question": "What keyword is used for guard clauses in Java 21 pattern matching switch?",
    "shortAnswer": "The 'when' keyword (e.g. 'case String s when s.length() > 10 -> ...').",
    "explanation": "Earlier preview versions experimented with '&&', but Java 21 finalized 'when'.",
    "hint": "The 'when' keyword.",
    "level": "Beginner",
    "codeExample": "case Integer score when score >= 90 -> 'Distinction';"
  }
];

export default topic10_questions;
