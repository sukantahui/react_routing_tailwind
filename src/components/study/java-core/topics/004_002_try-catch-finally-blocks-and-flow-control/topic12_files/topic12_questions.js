const topic12_questions = [
  {
    "question": "When and why should an architect design Nested try-catch blocks in Java?",
    "shortAnswer": "Nested try-catch blocks are used when an inner operation has a localized fallback (e.g. default value if parsing fails) that should NOT abort the larger surrounding transaction, OR when an inner block handles a low-level error and re-throws a wrapped domain exception to be handled by the outer supervisor.",
    "explanation": "Provides granular error handling without aborting entire composite routines.",
    "hint": "Allows fine-grained local recovery without aborting the larger surrounding task.",
    "level": "Advanced",
    "codeExample": "try { try { parse(); } catch(NFE e) { defaultVal(); } divide(); } catch(Ex e) {}"
  }
];

export default topic12_questions;