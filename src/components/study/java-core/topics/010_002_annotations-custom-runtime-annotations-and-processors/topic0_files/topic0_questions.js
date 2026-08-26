const topic0_questions = [
  {
    "question": "Do annotations in Java alter the direct bytecode logic of a method by themselves?",
    "shortAnswer": "No. Annotations are passive metadata containers. They have no direct executable logic unless read and processed by external tools (javac compiler, APT processors, or runtime Reflection).",
    "explanation": "Annotations declare intent; frameworks execute behavior.",
    "hint": "Annotations are passive metadata that require a processor or reflection to act.",
    "level": "Beginner",
    "codeExample": "@Test public void test() { ... } // Requires JUnit runner to execute"
  },
  {
    "question": "When were annotations introduced into the Java programming language?",
    "shortAnswer": "Java 5 (JSR 175) in 2004, revolutionizing Java development by replacing verbose XML configuration files with code-level annotations.",
    "explanation": "Started the transition toward configuration-by-exception.",
    "hint": "Java 5 (JSR 175).",
    "level": "Beginner",
    "codeExample": "@Override"
  }
];

export default topic0_questions;
