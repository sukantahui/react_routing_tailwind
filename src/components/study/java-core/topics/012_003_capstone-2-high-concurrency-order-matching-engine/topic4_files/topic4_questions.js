const topic4_questions = [
  {
    "question": "Why are Java 21 Virtual Threads ideal for network ingestion gateways in high-throughput exchanges?",
    "shortAnswer": "Because network gateways spend most time waiting on I/O sockets; virtual threads have lightweight stacks (~few KB vs 1MB OS threads) and unmount during I/O wait without consuming OS thread handles, supporting millions of concurrent connections.",
    "explanation": "JEP 444 virtual thread architecture.",
    "hint": "Lightweight user-mode threads unmount during socket I/O waits.",
    "level": "Intermediate",
    "codeExample": "Executors.newVirtualThreadPerTaskExecutor()"
  },
  {
    "question": "Why should LongAdder be used instead of AtomicLong for measuring global ingested order counts?",
    "shortAnswer": "LongAdder stripes internal counters across multiple cells to eliminate thread contention and CPU cache-line bouncing under extreme multi-threaded increment bursts.",
    "explanation": "High-concurrency striped counter in java.util.concurrent.atomic.",
    "hint": "Striped internal cells eliminate CAS cache-line contention.",
    "level": "Intermediate",
    "codeExample": "LongAdder counter = new LongAdder(); counter.increment();"
  }
];

export default topic4_questions;
