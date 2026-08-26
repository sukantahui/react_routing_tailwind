const topic2_questions = [
  {
    "question": "How does ClassLoader.getResources() allow frameworks to discover files located across multiple JAR files on the classpath?",
    "shortAnswer": "Unlike getResource() which returns only the first match, getResources() returns an Enumeration<URL> containing every occurrence of that directory across all JAR files and directories in the application classpath.",
    "explanation": "Crucial for multi-module classpath scanning.",
    "hint": "Returns an Enumeration of all matching resources across all JARs.",
    "level": "Intermediate",
    "codeExample": "Enumeration<URL> urls = classLoader.getResources(\"com/example\");"
  },
  {
    "question": "Why should we strip the '.class' extension and use Class.forName() when registering beans?",
    "shortAnswer": "Because Class.forName() requires the Fully Qualified Class Name (FQCN e.g. com.example.MyService) to properly resolve the class through the ClassLoader hierarchy.",
    "explanation": "Standard dynamic class loading mechanism.",
    "hint": "Class.forName requires the canonical FQCN without .class.",
    "level": "Beginner",
    "codeExample": "Class.forName(\"com.example.PaymentService\")"
  }
];

export default topic2_questions;
