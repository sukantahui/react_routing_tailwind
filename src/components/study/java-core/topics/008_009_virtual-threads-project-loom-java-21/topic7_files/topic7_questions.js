const topic7_questions = [
  {
    "question": "What are the three primary APIs introduced in Java 21 to create and launch Virtual Threads?",
    "shortAnswer": "1. 'Thread.ofVirtual()': A fluent builder interface that configures virtual thread properties (names, sequence numbers, unstarted instances). 2. 'Thread.startVirtualThread(Runnable)': A convenient static factory method to immediately create and start an anonymous virtual thread in one line. 3. 'Executors.newVirtualThreadPerTaskExecutor()': An 'ExecutorService' implementation that spawns a brand new, ephemeral virtual thread for every submitted task.",
    "explanation": "Overview of the primary Virtual Thread creation mechanisms in Java 21.",
    "hint": "Thread.ofVirtual() builder, Thread.startVirtualThread(), and Executors.newVirtualThreadPerTaskExecutor().",
    "level": "Beginner",
    "codeExample": "Thread.ofVirtual().start(task); Thread.startVirtualThread(task); Executors.newVirtualThreadPerTaskExecutor();"
  }
];

export default topic7_questions;