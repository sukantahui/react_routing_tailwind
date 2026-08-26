const topic6_questions = [
  {
    "question": "Why is ReentrantReadWriteLock preferred over standard synchronized blocks for banking account state?",
    "shortAnswer": "Because read operations (checking balances and statements) outnumber write operations (fund transfers) by 100 to 1; ReentrantReadWriteLock allows unlimited simultaneous concurrent reads without blocking, only acquiring an exclusive lock during actual balance updates.",
    "explanation": "Drastically boosts read throughput under high concurrency.",
    "hint": "Allows simultaneous concurrent reads while keeping writes exclusive.",
    "level": "Intermediate",
    "codeExample": "rwLock.readLock().lock(); try { return balance; } finally { rwLock.readLock().unlock(); }"
  },
  {
    "question": "What is the danger of not unlocking ReentrantReadWriteLock inside a finally block?",
    "shortAnswer": "If an unexpected exception occurs before reaching unlock(), the lock remains held forever, permanently deadlocking all subsequent threads attempting to access that account.",
    "explanation": "Mandatory lock safety pattern in Java.",
    "hint": "Always place lock.unlock() in the finally block.",
    "level": "Beginner",
    "codeExample": "try { ... } finally { lock.unlock(); }"
  }
];

export default topic6_questions;
