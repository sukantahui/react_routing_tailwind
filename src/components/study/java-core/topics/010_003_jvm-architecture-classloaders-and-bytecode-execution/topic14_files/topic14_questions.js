const topic14_questions = [
  {
    "question": "Why was the Thread Context ClassLoader (TCCL) introduced in Java?",
    "shortAnswer": "To solve the Service Provider Interface (SPI) dilemma, allowing core JDK classes loaded by the Bootstrap ClassLoader (such as java.sql.DriverManager) to load vendor implementation classes located on the application classpath.",
    "explanation": "Standard parent delegation only allows lookups upward, not downward.",
    "hint": "Allows core JDK classes to load vendor implementations on the application classpath.",
    "level": "Advanced",
    "codeExample": "ClassLoader cl = Thread.currentThread().getContextClassLoader();"
  },
  {
    "question": "What does Thread.currentThread().getContextClassLoader() default to for the main thread?",
    "shortAnswer": "It defaults to the Application (System) ClassLoader.",
    "explanation": "New threads inherit the context classloader from their creating parent thread.",
    "hint": "The Application (System) ClassLoader.",
    "level": "Beginner",
    "codeExample": "Thread.currentThread().getContextClassLoader() == ClassLoader.getSystemClassLoader()"
  }
];

export default topic14_questions;
