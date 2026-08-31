const topic7_questions = [
  {
    "question": "How does Scalar Replacement eliminate Garbage Collection overhead for temporary objects?",
    "shortAnswer": "By deconstructing non-escaping objects into their primitive fields and storing them directly in CPU registers or stack slots, avoiding allocating an object instance on the Java Heap entirely. When the method returns, registers and stack slots are naturally reused with zero GC cost.",
    "explanation": "Eliminates heap allocation and GC pause overhead completely.",
    "hint": "Decomposes objects into primitive fields stored in CPU registers/stack slots.",
    "level": "Intermediate",
    "codeExample": "new Point(x,y) → Transformed into int x, int y in CPU registers."
  },
  {
    "question": "What JVM flag controls the Scalar Replacement optimization in HotSpot?",
    "shortAnswer": "-XX:+EliminateAllocations (enabled by default when -XX:+DoEscapeAnalysis is active).",
    "explanation": "Can be disabled with -XX:-EliminateAllocations for benchmarking.",
    "hint": "-XX:+EliminateAllocations",
    "level": "Intermediate",
    "codeExample": "java -XX:+DoEscapeAnalysis -XX:+EliminateAllocations -jar app.jar"
  }
];

export default topic7_questions;
