const topic4_questions = [
  {
    "question": "How does a Compact Constructor in a Java Record differ from a Canonical Constructor?",
    "shortAnswer": "A Compact Constructor has no explicit parameter list in its declaration (public RecordName { ... }) and does not require explicit this.field = field assignments, which occur automatically after the block executes.",
    "explanation": "Ideal for clean validation and input normalization.",
    "hint": "Omits parameter list; field assignments happen automatically.",
    "level": "Beginner",
    "codeExample": "public Point { if (x < 0) throw new IllegalArgumentException(); }"
  },
  {
    "question": "Can an overloaded constructor in a Record skip calling the canonical constructor?",
    "shortAnswer": "No. Any secondary/overloaded constructor in a Record MUST delegate to another constructor or the canonical constructor using this(...).",
    "explanation": "Ensures all component fields are properly initialized.",
    "hint": "Must delegate to the canonical constructor via this(...).",
    "level": "Intermediate",
    "codeExample": "public Point(int x) { this(x, 0); // Mandatory delegation }"
  }
];

export default topic4_questions;
