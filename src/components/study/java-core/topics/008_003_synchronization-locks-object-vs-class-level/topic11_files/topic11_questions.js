const topic11_questions = [
  {
    "question": "What underlying hardware and JVM mechanisms cause 'synchronized' blocks to have performance overhead?",
    "shortAnswer": "1. 'Memory Barriers (JMM Visibility)': Entering a synchronized block invalidates local CPU L1/L2 caches; exiting a block flushes modified CPU write-buffers to main memory to guarantee cross-thread visibility. 2. 'Lock Acquisition & Inflation': CAS operations and potential inflation to OS heavyweight mutexes. 3. 'OS Context Switching': When contention occurs, the OS suspends blocked threads, costing thousands of CPU cycles for context switches. 4. 'Compiler Inhibitions': JIT compilers cannot reorder instructions across lock barriers.",
    "explanation": "Low-level hardware and JVM memory architecture analysis.",
    "hint": "Memory barriers flush CPU write buffers, JIT cannot reorder code, and OS context switching costs thousands of cycles.",
    "level": "Advanced",
    "codeExample": "synchronized(lock) { ... } // Emits memory barriers and disables JIT reordering"
  }
];

export default topic11_questions;