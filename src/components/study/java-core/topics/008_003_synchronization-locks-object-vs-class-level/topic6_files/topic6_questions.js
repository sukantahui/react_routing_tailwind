const topic6_questions = [
  {
    "question": "What is the primary advantage of using a 'synchronized(lockObject) { ... }' block over a synchronized method?",
    "shortAnswer": "A synchronized block allows developers to: 1. 'Minimize Lock Scope': lock only the exact lines of code that mutate shared state (keeping expensive preparation/I/O code outside the lock). 2. 'Target-Specific Locking': lock on distinct dedicated lock objects (e.g. 'studentLock' and 'facultyLock') so unrelated operations on the same instance can execute concurrently in parallel without blocking each other.",
    "explanation": "Core concurrency performance optimization in Java.",
    "hint": "Minimizes lock scope and enables independent lock objects for unrelated shared fields.",
    "level": "Intermediate",
    "codeExample": "synchronized(customLock) { sharedState++; } // Fine-grained lock targeting"
  }
];

export default topic6_questions;