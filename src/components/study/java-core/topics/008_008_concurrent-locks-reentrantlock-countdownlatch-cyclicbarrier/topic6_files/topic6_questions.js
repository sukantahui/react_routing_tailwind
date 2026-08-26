const topic6_questions = [
  {
    "question": "How does 'StampedLock.tryOptimisticRead()' work in Java 8 and why is it faster than ReentrantReadWriteLock?",
    "shortAnswer": "'StampedLock' introduces stamp-based tokens (long values) and a 3rd locking mode: 'Optimistic Read'. Calling 'sl.tryOptimisticRead()' returns a stamp token WITHOUT acquiring any lock or modifying any memory headers (0% CPU bus synchronization). The thread reads the fields and then calls 'sl.validate(stamp)'. If no write lock was acquired in the interim, the validation succeeds and the read completes with zero locking overhead. If a write intervened, the thread falls back to a standard pessimistic 'sl.readLock()'. Because optimistic reads do not block writers, writer starvation is completely eliminated.",
    "explanation": "Java 8 advanced lock design from Doug Lea (JSR-166).",
    "hint": "tryOptimisticRead() acquires no lock; validate(stamp) checks if a writer intervened; eliminates writer starvation.",
    "level": "Advanced",
    "codeExample": "long stamp = sl.tryOptimisticRead(); ... if (!sl.validate(stamp)) stamp = sl.readLock();"
  }
];

export default topic6_questions;