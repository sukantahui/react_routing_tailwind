const topic2_questions = [
  {
    "question": "Which memory areas in the JVM are shared across all threads, and which memory areas are private to each individual thread?",
    "shortAnswer": "1. 'Shared across all threads': The Java Heap (storing all instantiated objects and static fields) and Metaspace (storing class metadata and constant pools). 2. 'Private per thread': The Thread Call Stack (storing method frames, local variables, and return addresses), the Program Counter (PC) Register (tracking current bytecode instruction address), and Native Method Stacks.",
    "explanation": "Core JVM memory specification (JSR-133 and JVM Specification Chapter 2).",
    "hint": "Heap and Metaspace are shared; Call Stack and PC Register are private to each thread.",
    "level": "Intermediate",
    "codeExample": "int local = 10; // Private on Thread Stack | static Object shared = new Object(); // Shared on Heap"
  }
];

export default topic2_questions;