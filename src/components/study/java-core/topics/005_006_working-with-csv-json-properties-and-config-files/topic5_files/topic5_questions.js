const topic5_questions = [
  {
    "question": "Why does 'new File(\"application.properties\")' fail when an application is packaged and deployed inside a JAR file, and how does 'getResourceAsStream()' fix it?",
    "shortAnswer": "Inside a packaged JAR file, resources exist as compressed entries within an archive, not independent physical files on the host OS filesystem. 'new File()' looks for a physical disk file and fails. 'ClassLoader.getResourceAsStream(\"application.properties\")' delegates to the ClassLoader to stream the embedded resource directly out of the JAR.",
    "explanation": "Standard resource loading mechanism across Spring Boot, Maven, and Gradle projects.",
    "hint": "JAR entries are not physical disk files; ClassLoader.getResourceAsStream reads them from the archive.",
    "level": "Intermediate",
    "codeExample": "InputStream is = MyClass.class.getClassLoader().getResourceAsStream(\"app.properties\");"
  }
];

export default topic5_questions;