const topic2_questions = [
  {
    question: "Where is the String Constant Pool (SCP) located in JVM memory in modern Java (Java 7+)?",
    shortAnswer: "In modern Java (Java 7 and newer), the String Constant Pool (SCP) is located directly inside the main Heap memory. In Java 6 and older, it resided in PermGen, which caused memory leaks.",
    explanation: "Being in the Heap allows unused interned strings to be reclaimed by Garbage Collection.",
    hint: "Located inside the main Heap memory in Java 7+.",
    level: "Intermediate",
    codeExample: "// SCP resides in main JVM Heap, subject to standard GC"
  }
];

export default topic2_questions;