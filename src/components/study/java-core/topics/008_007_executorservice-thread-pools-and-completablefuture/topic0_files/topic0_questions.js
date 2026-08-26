const topic0_questions = [
  {
    "question": "Why is manual thread creation ('new Thread(task).start()') considered a dangerous anti-pattern in high-throughput enterprise systems?",
    "shortAnswer": "1. 'Resource Exhaustion & OOM': Each native Java thread allocates ~1 MB of private Call Stack memory outside the JVM heap. Spawning unconstrained threads per request under traffic spikes rapidly causes 'java.lang.OutOfMemoryError: unable to create native thread' and crashes the process. 2. 'High Lifecycle Overhead': The OS kernel overhead to allocate, register, context-switch, and tear down native thread stacks degrades CPU throughput. 3. 'Lack of Worker Reuse': Manual threads terminate upon completing a task and cannot be reused for subsequent workloads.",
    "explanation": "Core justification for thread pooling and the Executor framework.",
    "hint": "Each thread costs ~1 MB stack memory, lacks reuse, and uncapped creation causes OutOfMemoryError crashes.",
    "level": "Intermediate",
    "codeExample": "// Anti-Pattern: while(true) new Thread(handleRequest).start(); // Will crash server!"
  }
];

export default topic0_questions;