const topic0_questions = [
  {
    "question": "Why does 'studentNames.getClass() == rollNumbers.getClass()' evaluate to true when one is 'List<String>' and the other is 'List<Integer>'?",
    "shortAnswer": "Due to Java's 'Type Erasure' compiler mechanism. Generics are a compile-time construct designed for type-checking. During compilation, the compiler strips all generic type arguments from bytecode to ensure backward compatibility with legacy JVMs. At runtime, both instances are represented by the identical raw class 'java.util.ArrayList'.",
    "explanation": "Core JVM architectural decision implemented in Java 5.",
    "hint": "Generic types are erased at compile time; at runtime both instances are raw ArrayList.",
    "level": "Beginner",
    "codeExample": "new ArrayList<String>().getClass() == new ArrayList<Integer>().getClass() // true"
  }
];

export default topic0_questions;