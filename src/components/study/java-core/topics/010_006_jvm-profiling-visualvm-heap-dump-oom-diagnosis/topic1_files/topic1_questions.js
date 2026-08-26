const topic1_questions = [
  {
    "question": "What is the difference between a Heap Memory Leak and an Off-Heap/Native Memory Leak?",
    "shortAnswer": "A Heap Memory Leak involves standard Java objects on the JVM Heap kept alive by unintended references, while an Off-Heap/Native Leak involves native memory allocated outside the heap (e.g. DirectByteBuffers, JNI C++ allocations) not being properly freed.",
    "explanation": "Off-Heap leaks do not trigger Heap OOM and must be tracked via OS metrics.",
    "hint": "Heap leak is Java objects on heap; off-heap leak is direct native OS memory.",
    "level": "Intermediate",
    "codeExample": "ByteBuffer.allocateDirect(1024) -> Lives in native off-heap memory."
  },
  {
    "question": "Why does an unclosed JDBC ResultSet or Connection cause a memory leak?",
    "shortAnswer": "Because database drivers allocate internal client buffers and native socket handles that remain pinned in memory until explicitly closed or finalized.",
    "explanation": "Always use try-with-resources to ensure automatic closure.",
    "hint": "Retains driver memory buffers and network socket handles.",
    "level": "Beginner",
    "codeExample": "try (Connection conn = ...; Statement st = ...) { ... }"
  }
];

export default topic1_questions;
