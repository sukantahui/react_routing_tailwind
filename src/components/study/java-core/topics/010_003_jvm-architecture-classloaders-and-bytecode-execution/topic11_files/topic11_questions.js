const topic11_questions = [
  {
    "question": "What is the primary responsibility of the Application (System) ClassLoader?",
    "shortAnswer": "To load all application-level user classes and third-party library JARs specified on the application classpath (-cp / -classpath).",
    "explanation": "Default classloader for main method execution.",
    "hint": "Loads user classes and dependency JARs from classpath.",
    "level": "Beginner",
    "codeExample": "ClassLoader appLoader = ClassLoader.getSystemClassLoader();"
  },
  {
    "question": "Which system property contains the list of directories and JARs searched by the Application ClassLoader?",
    "shortAnswer": "System.getProperty('java.class.path').",
    "explanation": "Contains the resolved runtime classpath paths.",
    "hint": "java.class.path",
    "level": "Beginner",
    "codeExample": "String cp = System.getProperty('java.class.path');"
  }
];

export default topic11_questions;
