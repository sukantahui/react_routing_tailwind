const topic8_questions = [
  {
    "question": "Why is P99 latency a far more critical metric for financial exchange systems than average latency?",
    "shortAnswer": "Average latency conceals extreme tail latency spikes caused by GC pauses, OS context switches, or lock contention; P99 measures the experience of the slowest 1% of transactions, ensuring consistent real-time responsiveness.",
    "explanation": "Tail latency awareness in low-latency systems engineering.",
    "hint": "Reveals worst-case tail latency spikes hidden by average metrics.",
    "level": "Intermediate",
    "codeExample": "long p99 = latencies[(int) (latencies.length * 0.99)];"
  },
  {
    "question": "Why must Java performance benchmarks always include a warm-up phase before measuring throughput?",
    "shortAnswer": "To allow the JVM HotSpot Tiered Compilation system (C1 & C2 JIT) to profile the code, optimize loops, perform escape analysis, and compile bytecode to machine code before measuring steady-state performance.",
    "explanation": "Essential principle of JVM benchmarking (JMH).",
    "hint": "Ensures C2 JIT compiler optimizes and compiles bytecode before measurement.",
    "level": "Beginner",
    "codeExample": "for (int i = 0; i < 50_000; i++) match(); // Warmup"
  }
];

export default topic8_questions;
