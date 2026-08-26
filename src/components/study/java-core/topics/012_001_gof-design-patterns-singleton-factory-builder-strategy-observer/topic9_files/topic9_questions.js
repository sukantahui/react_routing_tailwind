const topic9_questions = [
  {
    "question": "What are the two common implementation styles of the Adapter pattern in Java?",
    "shortAnswer": "1. Object Adapter (uses object composition to wrap the adaptee instance - Recommended), and 2. Class Adapter (uses multiple inheritance/interfaces to inherit from both target and adaptee).",
    "explanation": "Object Adapter is favored for loose coupling.",
    "hint": "Object Adapter (composition) vs Class Adapter (inheritance).",
    "level": "Intermediate",
    "codeExample": "public class MyAdapter implements Target { private Adaptee adaptee; }"
  },
  {
    "question": "What is an example of the Adapter pattern in the Java Collections framework?",
    "shortAnswer": "java.util.Arrays.asList() (adapts an array to a List interface) and java.io.InputStreamReader (adapts an InputStream byte stream to a Reader character stream).",
    "explanation": "Classic JDK adapter implementations.",
    "hint": "Arrays.asList() and InputStreamReader.",
    "level": "Beginner",
    "codeExample": "Reader reader = new InputStreamReader(inputStream);"
  }
];

export default topic9_questions;
