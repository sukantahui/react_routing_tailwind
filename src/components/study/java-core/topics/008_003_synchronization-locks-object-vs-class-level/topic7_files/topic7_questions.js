const topic7_questions = [
  {
    "question": "What is 'Lock Contention' and how does minimizing the lock scope reduce application latency?",
    "shortAnswer": "'Lock Contention' occurs when multiple threads attempt to acquire the same lock simultaneously, causing competing threads to block and wait in the 'BLOCKED' state (serializing execution). By 'Minimizing Lock Scope' (keeping expensive computations, network calls, and I/O outside the synchronized block), the lock is held for only microseconds rather than milliseconds, allowing other threads to acquire the lock immediately without queueing or blocking.",
    "explanation": "Fundamental high-throughput concurrency optimization guideline.",
    "hint": "Keep expensive I/O and computations outside the lock so the lock is held for microseconds, not milliseconds.",
    "level": "Intermediate",
    "codeExample": "String data = computeExpensive(); synchronized(lock) { list.add(data); }"
  }
];

export default topic7_questions;