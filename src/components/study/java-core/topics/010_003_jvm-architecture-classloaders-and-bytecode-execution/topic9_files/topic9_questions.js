const topic9_questions = [
  {
    "question": "Where did the Bootstrap ClassLoader load core classes from in Java 8 versus Java 9+?",
    "shortAnswer": "In Java 8, it loaded classes from rt.jar located in jre/lib. In Java 9+, rt.jar was removed and replaced by modular runtime image jimage files located in lib/modules.",
    "explanation": "Modularization in Java 9 eliminated rt.jar.",
    "hint": "Java 8: rt.jar; Java 9+: lib/modules jimage.",
    "level": "Intermediate",
    "codeExample": "Java 9+: $JAVA_HOME/lib/modules"
  },
  {
    "question": "Can you instantiate a new instance of the Bootstrap ClassLoader in Java code?",
    "shortAnswer": "No. The Bootstrap ClassLoader is an internal native C++ component of the JVM and is not exposed as an instantiable Java class.",
    "explanation": "Expressed strictly as null in Java APIs.",
    "hint": "No, it is a native C++ JVM component.",
    "level": "Beginner",
    "codeExample": "Cannot write: new BootstrapClassLoader()"
  }
];

export default topic9_questions;
