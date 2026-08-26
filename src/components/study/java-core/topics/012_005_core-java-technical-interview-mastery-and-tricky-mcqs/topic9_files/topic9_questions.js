const topic9_questions = [
  {
    "question": "Why should an engineer never start typing code immediately after receiving a problem statement in an interview?",
    "shortAnswer": "Interviewers want to assess problem analysis, communication, and requirement gathering. Jumping to code risks solving the wrong problem, missing critical constraints, and writing sub-optimal algorithms that need costly refactoring.",
    "explanation": "Essential interview communication strategy.",
    "hint": "Clarifies requirements, constraints, and aligns on optimal approach before typing.",
    "level": "Beginner",
    "codeExample": "Step 1: Clarify inputs, bounds, and edge cases."
  },
  {
    "question": "What are the three most critical edge cases to check for any array or collection algorithm?",
    "shortAnswer": "1) Null input, 2) Empty collection (length/size == 0), 3) Single-element collection, along with integer overflow boundaries (Integer.MAX_VALUE / MIN_VALUE).",
    "explanation": "Standard edge cases across all algorithmic interviews.",
    "hint": "Null, empty collection, single element, and integer overflow.",
    "level": "Beginner",
    "codeExample": "if (arr == null || arr.length == 0) return 0;"
  }
];

export default topic9_questions;
