const topic9_questions = [
  {
    "question": "Why is 'if (obj instanceof String s || s.length() > 5)' a compilation error?",
    "shortAnswer": "Because if obj is NOT a String, the left side is false and evaluation continues to the right side of the || operator where s was never initialized or bound, violating type safety.",
    "explanation": "Flow scoping ensures pattern variables are only accessible when the type check definitely succeeded.",
    "hint": "s is not definitely assigned on the right-hand side of || operator.",
    "level": "Intermediate",
    "codeExample": "// COMPILE ERROR: if (obj instanceof String s || s.length() > 0)"
  },
  {
    "question": "Is pattern variable s in scope after an early return guard check?",
    "shortAnswer": "Yes! If you write 'if (!(obj instanceof String s)) return;', the pattern variable s remains in scope for the remainder of the method block.",
    "explanation": "Flow scoping recognizes that reaching subsequent lines implies obj was indeed a String.",
    "hint": "Yes, flow scoping makes s available after a negative early return.",
    "level": "Advanced",
    "codeExample": "if (!(obj instanceof String s)) return; System.out.println(s.toUpperCase()); // Legal!"
  }
];

export default topic9_questions;
