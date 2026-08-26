const topic8_questions = [
  {
    "question": "If an UNHANDLED exception is thrown inside a try block, does the 'finally' block still execute before the method terminates abruptly?",
    "shortAnswer": "YES. Even if an exception is thrown that matches NONE of the catch blocks, the 'finally' block STILL executes before the exception is propagated up to the caller and the current method stack frame is popped.",
    "explanation": "This ensures database connections and socket locks are never orphaned even during crashes.",
    "hint": "Finally block executes even for unhandled propagating exceptions.",
    "level": "Intermediate",
    "codeExample": "// Flow on unhandled error: try -> (catch skipped) -> finally -> propagate"
  }
];

export default topic8_questions;