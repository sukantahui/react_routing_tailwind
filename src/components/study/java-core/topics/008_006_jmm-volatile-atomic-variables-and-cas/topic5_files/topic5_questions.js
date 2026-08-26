const topic5_questions = [
  {
    "question": "What are the two primary guarantees provided by the 'volatile' keyword in Java?",
    "shortAnswer": "1. 'Memory Visibility Guarantee': Writes to a volatile variable are immediately flushed out of the CPU's local write-buffer directly into main memory (RAM). Subsequent reads of that volatile variable bypass local L1/L2 caches and are read directly from main memory. 2. 'Instruction Ordering Guarantee (Memory Barriers)': The JVM inserts hardware memory fences around volatile reads and writes, preventing the compiler, JIT, and CPU from reordering memory instructions across the volatile access boundary.",
    "explanation": "Core definition of the volatile keyword in the Java Memory Model.",
    "hint": "Guarantees immediate memory visibility across CPU caches and prevents instruction reordering via memory fences.",
    "level": "Beginner",
    "codeExample": "private static volatile boolean ready = false; // Visible to all threads without locking"
  }
];

export default topic5_questions;