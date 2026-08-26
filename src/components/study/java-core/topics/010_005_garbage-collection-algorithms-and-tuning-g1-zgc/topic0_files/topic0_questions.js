const topic0_questions = [
  {
    "question": "Does calling System.gc() guarantee that the JVM will immediately run garbage collection?",
    "shortAnswer": "No! System.gc() (and Runtime.getRuntime().gc()) is merely a non-binding hint or suggestion to the JVM. The JVM is free to delay, ignore, or perform GC at its own discretion.",
    "explanation": "In production, calling System.gc() is an anti-pattern and often disabled via -XX:+DisableExplicitGC.",
    "hint": "No, it is only a non-binding suggestion to the JVM.",
    "level": "Beginner",
    "codeExample": "System.gc(); // Hint only, no guarantee!"
  },
  {
    "question": "What are the two major hazards of manual memory management in C/C++ that Java Garbage Collection eliminates?",
    "shortAnswer": "1. Dangling Pointers (accessing memory that has already been deallocated), and 2. Double-Free errors (corrupting memory allocator tables by freeing the same pointer twice).",
    "explanation": "Provides fundamental memory safety for the JVM ecosystem.",
    "hint": "Dangling pointers and double-free memory corruption.",
    "level": "Beginner",
    "codeExample": "Java eliminates dangling pointers and double-free bugs."
  }
];

export default topic0_questions;
