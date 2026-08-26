const topic10_questions = [
  {
    "question": "What are the 3 major characteristics of collections created via Java 9 factory methods ('List.of()', 'Set.of()', 'Map.of()')?",
    "shortAnswer": "1. 'Truly Immutable': Any modification call (add, remove, clear, set) throws 'UnsupportedOperationException'. 2. 'Null Hostile': Attempting to pass or store 'null' immediately throws 'NullPointerException'. 3. 'Space Efficient': They do not use wrapper overhead or resize buffers, saving substantial heap memory.",
    "explanation": "Introduced in JEP 269 (Convenience Factory Methods for Collections).",
    "hint": "Immutable (throws UnsupportedOperationException), null-hostile (throws NPE), and space-efficient.",
    "level": "Intermediate",
    "codeExample": "List<String> list = List.of(\"A\", \"B\"); // Immutable and null-free"
  }
];

export default topic10_questions;