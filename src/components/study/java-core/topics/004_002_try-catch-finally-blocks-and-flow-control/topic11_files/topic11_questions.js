const topic11_questions = [
  {
    "question": "Why is placing a 'return' statement inside a 'finally' block considered one of the most dangerous anti-patterns in Java?",
    "shortAnswer": "1. It silently overwrites and destroys any return value computed in the 'try' or 'catch' blocks. 2. Even worse, if an uncaught exception is being thrown by the 'try' block, a 'return' in 'finally' SILENTLY SWALLOWS and discards the exception entirely as if nothing went wrong, hiding critical bugs.",
    "explanation": "Modern static analysis tools (SonarQube, SpotBugs) flag this as a critical blocker severity violation.",
    "hint": "Overwrites previous return values and silently swallows uncaught exceptions.",
    "level": "Intermediate",
    "codeExample": "// BAD: try { throw new Error(); } finally { return; } // Error is silently lost!"
  }
];

export default topic11_questions;