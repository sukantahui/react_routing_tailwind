const topic8_questions = [
  {
    "question": "What is a 'Suppressed Exception' in Java Try-with-Resources and how do you access it?",
    "shortAnswer": "When both the 'try' block and the automatic 'close()' method throw exceptions, the JVM preserves the try block's exception as the PRIMARY exception. The exception thrown by 'close()' is attached to the primary exception as a 'Suppressed Exception'. You access them via 'primaryException.getSuppressed()'.",
    "explanation": "Introduced in Java 7 to solve the critical legacy flaw of exception masking in finally blocks.",
    "hint": "The primary try exception is kept; secondary close() errors are attached and retrieved via getSuppressed().",
    "level": "Intermediate",
    "codeExample": "for (Throwable s : ex.getSuppressed()) { log.warn(\"Suppressed error: \", s); }"
  }
];

export default topic8_questions;