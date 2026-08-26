const topic8_questions = [
  {
    "question": "Why does String.class.getClassLoader() return null in Java?",
    "shortAnswer": "Because java.lang.String is loaded by the Bootstrap ClassLoader, which is written in native C/C++ inside the JVM binary and is represented as null in the Java language API.",
    "explanation": "null return value is the official sentinel for the Bootstrap ClassLoader.",
    "hint": "Bootstrap ClassLoader is implemented in native C++ and represented as null.",
    "level": "Beginner",
    "codeExample": "String.class.getClassLoader() == null // true"
  },
  {
    "question": "What is the parent of the Application (System) ClassLoader?",
    "shortAnswer": "The Platform ClassLoader (in Java 9+) or Extension ClassLoader (in Java 8 and earlier).",
    "explanation": "Renamed to PlatformClassLoader during the modularization of Java 9.",
    "hint": "Platform ClassLoader (Java 9+) / Extension ClassLoader (Java 8).",
    "level": "Beginner",
    "codeExample": "ClassLoader.getSystemClassLoader().getParent(); // PlatformClassLoader"
  }
];

export default topic8_questions;
