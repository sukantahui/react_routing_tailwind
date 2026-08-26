const topic0_questions = [
  {
    "question": "Why do traditional Java Platform (OS) Threads have a strict scalability ceiling of ~5,000 to 10,000 threads per JVM instance?",
    "shortAnswer": "Traditional Java platform threads have a direct 1:1 mapping to underlying OS kernel threads. Each platform thread reserves a fixed ~1 MB native call stack and incurs expensive OS kernel context switching overhead. As thread counts exceed ~5,000 to 10,000, native memory consumption exceeds several gigabytes and the OS scheduler spends more CPU time thrashing thread context switches than executing actual application business logic.",
    "explanation": "Core motivation behind Project Loom in Java 21+.",
    "hint": "1:1 OS kernel mapping, ~1 MB native call stack per thread, and heavy kernel context switching overhead.",
    "level": "Intermediate",
    "codeExample": "// Platform Thread: 1 Java Thread = 1 OS Kernel Thread (~1MB stack)"
  }
];

export default topic0_questions;