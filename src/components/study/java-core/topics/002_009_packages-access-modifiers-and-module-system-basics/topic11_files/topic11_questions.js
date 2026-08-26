const topic11_questions = [
  {
    question: "What is a JAR file in Java and how do you execute an executable JAR from the terminal?",
    shortAnswer: "A JAR (Java Archive) is a zip-compressed package of compiled .class files, resources, and manifest metadata. You execute an executable JAR using the command: 'java -jar app.jar'.",
    explanation: "The JAR must contain a MANIFEST.MF file declaring the 'Main-Class' entry.",
    hint: "ZIP-compressed archive of bytecode; executed via 'java -jar filename.jar'.",
    level: "Beginner",
    codeExample: "jar cfe app.jar com.company.Main -C bin .\njava -jar app.jar"
  }
];

export default topic11_questions;