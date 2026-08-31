const topic3_questions = [
  {
    "question": "What are Virtual Threads in Java 21+ (Project Loom) and how do their stack allocations differ from Platform Threads?",
    "shortAnswer": "Virtual Threads (JEP 444, Java 21 LTS) are lightweight, user-mode threads managed entirely by the JVM rather than the OS kernel. While Platform Threads require a static ~1 MB native memory call stack allocated outside the heap, Virtual Threads store their call frames in standard Java heap objects (Continuation objects). Their stack starts at only a few hundred bytes and dynamically resizes as needed. Millions of Virtual Threads (M) are multiplexed onto a small pool of OS Carrier Threads (N), allowing near-infinite concurrency.",
    "explanation": "Core architecture of Java 21 Project Loom.",
    "hint": "JVM-managed user-mode threads with tiny dynamic heap stacks (~few hundred bytes) multiplexed M:N onto OS carrier threads.",
    "level": "Intermediate",
    "codeExample": "Thread vThread = Thread.ofVirtual().start(() → doWork());"
  }
];

export default topic3_questions;