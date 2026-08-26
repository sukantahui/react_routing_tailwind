const topic8_questions = [
  {
    "question": "Why should developers NEVER catch 'java.lang.Throwable' in business code?",
    "shortAnswer": "'Throwable' is the superclass of 'java.lang.Error'. Catching Throwable intercepts catastrophic JVM failures like OutOfMemoryError, StackOverflowError, and ThreadDeath. When these are caught in application code, the JVM is prevented from crashing cleanly and is left running in an unstable, corrupted memory state.",
    "explanation": "Only top-level framework infrastructure should ever catch Throwable.",
    "hint": "Catches fatal JVM Errors, preventing clean restarts and leaving memory corrupted.",
    "level": "Intermediate",
    "codeExample": "// BAD: catch (Throwable t) { ... } // Catches OutOfMemoryError!"
  }
];

export default topic8_questions;