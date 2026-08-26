const topic0_questions = [
  {
    "question": "What happens to the remaining statements inside a 'try' block if an exception is thrown on line 3?",
    "shortAnswer": "The remaining statements in the 'try' block are immediately skipped (aborted). The JVM creates an exception object, stops execution of the try block, and jumps directly to the first matching 'catch' block (or propagates if no catch matches).",
    "explanation": "Lines after the point of failure inside the try block are never executed.",
    "hint": "Remaining statements in the try block are immediately bypassed upon failure.",
    "level": "Beginner",
    "codeExample": "try { doA(); doB(); /* fails here */ doC(); /* never runs */ } catch(...) {}"
  }
];

export default topic0_questions;