const topic7_questions = [
  {
    "question": "What is the primary purpose of the 'finally' block in Java exception handling?",
    "shortAnswer": "The 'finally' block provides a guaranteed execution guarantee for cleanup and resource release code (such as closing database connections, flushing file buffers, or releasing locks). It ALWAYS executes whether an exception occurs or not, and whether an exception is caught or uncaught.",
    "explanation": "Ensures no resource leaks occur even under unexpected runtime faults.",
    "hint": "Guarantees resource teardown execution regardless of whether an exception occurred.",
    "level": "Beginner",
    "codeExample": "try { open(); } catch(...) { ... } finally { close(); }"
  }
];

export default topic7_questions;