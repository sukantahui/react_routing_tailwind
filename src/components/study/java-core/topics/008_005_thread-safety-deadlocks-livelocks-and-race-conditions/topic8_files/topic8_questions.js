const topic8_questions = [
  {
    "question": "How does Global Lock Ordering prevent deadlocks during bidirectional bank account money transfers?",
    "shortAnswer": "In bidirectional transfers, Thread 1 transfers from Account A to B (attempting Lock A then B), while Thread 2 transfers from B to A (attempting Lock B then A), creating an inverted lock acquisition deadlock. Global Lock Ordering eliminates this by establishing a deterministic tie-breaker (e.g. comparing unique 'accountId's or 'System.identityHashCode()'). Both threads are forced to acquire the lower ID lock first, then the higher ID lock. Because both threads acquire locks in the exact same sequence (Lock A then Lock B), circular wait is eliminated and deadlocks become impossible.",
    "explanation": "Canonical deadlock prevention pattern from Java Concurrency in Practice (Chapter 10).",
    "hint": "Always acquire locks in ascending order of unique account ID so both threads acquire Lock 101 before Lock 202.",
    "level": "Intermediate",
    "codeExample": "Lock first = id1 < id2 ? lock1 : lock2; Lock second = id1 < id2 ? lock2 : lock1;"
  }
];

export default topic8_questions;