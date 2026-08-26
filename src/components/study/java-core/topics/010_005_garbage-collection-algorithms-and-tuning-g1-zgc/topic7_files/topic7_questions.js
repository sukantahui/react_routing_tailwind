const topic7_questions = [
  {
    "question": "What is the default Garbage Collector in Java 8 versus Java 9 through Java 21 LTS?",
    "shortAnswer": "In Java 8, the default collector is Parallel GC (throughput collector). In Java 9 and later (including Java 11, 17, 21), the default is G1 GC (Garbage-First Collector).",
    "explanation": "Reflected the shift toward latency-sensitive cloud microservices.",
    "hint": "Java 8: Parallel GC; Java 9+: G1 GC.",
    "level": "Beginner",
    "codeExample": "Java 8 = ParallelGC; Java 9+ = G1GC"
  },
  {
    "question": "What three competing metrics form the 'GC Tradeoff Triangle'?",
    "shortAnswer": "1. Throughput (maximizing application CPU time), 2. Latency (minimizing Stop-The-World pause durations), and 3. Footprint (minimizing GC memory overhead).",
    "explanation": "Optimizing for one always involves compromises on the other two.",
    "hint": "Throughput, Latency, and Memory Footprint.",
    "level": "Intermediate",
    "codeExample": "Tradeoffs: Throughput vs Latency vs Footprint."
  }
];

export default topic7_questions;
