const topic13_questions = [
  {
    "question": "How many slots in the Local Variable Table are occupied by a 64-bit long or double primitive?",
    "shortAnswer": "Two consecutive 32-bit slots (e.g. slot n and slot n+1).",
    "explanation": "All 64-bit primitive types occupy two slot positions in the LVT.",
    "hint": "Two consecutive slots.",
    "level": "Beginner",
    "codeExample": "double d = 4.5; // Takes 2 LVT slots"
  },
  {
    "question": "How does javac optimize Local Variable Table size using slot reuse?",
    "shortAnswer": "When a local variable goes out of scope (e.g. at the end of a block {...}), its slot index is made available and reused by subsequent local variables declared later in the same method.",
    "explanation": "Reduces total stack frame memory footprint.",
    "hint": "Reuses slot indices when previous variables exit their scope blocks.",
    "level": "Intermediate",
    "codeExample": "{ int a = 1; } int b = 2; // b reuses slot of a"
  }
];

export default topic13_questions;
