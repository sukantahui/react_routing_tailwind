const topic4_questions = [
  {
    "question": "What exception is thrown by the JVM if a .class file contains corrupted or tampered bytecode?",
    "shortAnswer": "java.lang.VerifyError, an unchecked LinkageError indicating that the bytecode violates JVM semantic or structural constraints.",
    "explanation": "Protects the runtime from malicious code execution.",
    "hint": "java.lang.VerifyError",
    "level": "Beginner",
    "codeExample": "throws java.lang.VerifyError"
  },
  {
    "question": "Can bytecode verification be disabled via JVM command-line flags?",
    "shortAnswer": "Historically, -Xverify:none or -noverify could disable verification, but this option has been deprecated in modern JDKs (Java 13+) due to severe security vulnerabilities.",
    "explanation": "Modern JDKs enforce verification by default.",
    "hint": "-noverify (deprecated in modern Java).",
    "level": "Intermediate",
    "codeExample": "Deprecated flag: -noverify"
  }
];

export default topic4_questions;
