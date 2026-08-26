const topic12_questions = [
  {
    question: "What is the role of the 'Main-Class' entry in the 'META-INF/MANIFEST.MF' file?",
    shortAnswer: "The 'Main-Class' entry designates the entry point (the fully qualified class containing 'public static void main(String[] args)') to be executed when the JAR is launched via 'java -jar app.jar'.",
    explanation: "Also requires an empty trailing newline at the end of the manifest file.",
    hint: "Specifies the entry-point class for 'java -jar' execution.",
    level: "Beginner",
    codeExample: "Main-Class: com.coderaccotax.Main\n"
  }
];

export default topic12_questions;