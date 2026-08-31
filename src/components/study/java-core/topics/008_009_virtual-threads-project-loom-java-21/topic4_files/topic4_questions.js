const topic4_questions = [
  {
    "question": "How can a standard development laptop run 100,000+ concurrent Virtual Threads without crashing or exhausting RAM?",
    "shortAnswer": "While 100,000 platform threads would require ~100 GB of native memory (~1 MB per thread stack) and crash the OS, 100,000 Virtual Threads require only ~200 MB of JVM heap memory (~2 KB initial overhead per virtual thread). Furthermore, while sleeping during I/O operations ('Thread.sleep(1000)'), virtual threads unmount from the underlying OS carrier threads, allowing a tiny pool of just 8 to 16 OS carrier threads to execute all 100,000 virtual threads concurrently with negligible CPU overhead.",
    "explanation": "Scalability benchmark illustrating Project Loom memory and scheduling efficiency.",
    "hint": "Virtual threads use ~2 KB heap memory and unmount during sleep, allowing 16 OS threads to handle 100,000 virtual threads.",
    "level": "Intermediate",
    "codeExample": "for (int i = 0; i < 100_000; i++) Thread.ofVirtual().start(() → Thread.sleep(1000));"
  }
];

export default topic4_questions;