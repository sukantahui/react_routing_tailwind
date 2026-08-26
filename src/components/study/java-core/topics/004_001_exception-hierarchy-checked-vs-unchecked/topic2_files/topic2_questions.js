const topic2_questions = [
  {
    "question": "Why is it considered a dangerous anti-pattern to catch 'java.lang.Error' or 'Throwable' in enterprise applications?",
    "shortAnswer": "Errors represent fatal JVM infrastructure conditions (like OutOfMemoryError or VirtualMachineError) where the JVM's internal integrity is compromised. If caught, the application may continue executing in a corrupted, unpredictable state that leaks data or causes silent failures. The JVM should be allowed to crash and restart.",
    "explanation": "Catching Error or Throwable swallows OutOfMemoryErrors and ThreadDeaths.",
    "hint": "Errors indicate fatal JVM failures; catching them leaves the JVM in an unstable, corrupted state.",
    "level": "Intermediate",
    "codeExample": "// BAD: catch (Throwable t) { ... } // Swallows fatal JVM Errors!"
  }
];

export default topic2_questions;