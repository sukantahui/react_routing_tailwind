const topic13_questions = [
  {
    "question": "What exception is thrown if a custom ClassLoader attempts to define a class named 'java.lang.FakeString' via defineClass()?",
    "shortAnswer": "java.lang.SecurityException: Prohibited package name: java.lang. The JVM strictly reserves the 'java.*' namespace for official JDK packages.",
    "explanation": "Enforced directly in java.lang.ClassLoader.preDefineClass().",
    "hint": "SecurityException: Prohibited package name: java.lang",
    "level": "Intermediate",
    "codeExample": "defineClass('java.lang.Fake', bytes) // Throws SecurityException!"
  },
  {
    "question": "How does the Parent-Delegation model protect enterprise applications from malicious third-party dependencies?",
    "shortAnswer": "By delegating requests upward, the JVM ensures that trusted core platform classes are always resolved from genuine JDK runtime images rather than compromised third-party JARs on the application classpath.",
    "explanation": "Guarantees runtime sandbox integrity.",
    "hint": "Always resolves foundational classes from trusted JDK images first.",
    "level": "Beginner",
    "codeExample": "Guarantees core JDK classes cannot be overridden by classpath JARs."
  }
];

export default topic13_questions;
