const topic9_questions = [
  {
    "question": "How does 'ReentrantLock.tryLock(long timeout, TimeUnit unit)' prevent unrecoverable deadlocks compared to 'synchronized'?",
    "shortAnswer": "With 'synchronized', if a thread cannot acquire a monitor lock, it blocks indefinitely with NO timeout and cannot be rescued. With 'ReentrantLock.tryLock(timeout)', a thread attempts to acquire the lock within the specified duration. If the timeout expires without acquiring the lock, 'tryLock()' returns 'false'. The thread can then immediately release any previously acquired locks in the 'finally' block, back off, and retry later, thereby breaking the Hold-and-Wait and No-Preemption deadlock conditions.",
    "explanation": "Core resilience pattern using java.util.concurrent.locks.",
    "hint": "Returns false on timeout so the thread can release currently held locks, back off, and retry.",
    "level": "Intermediate",
    "codeExample": "if (lock.tryLock(100, TimeUnit.MILLISECONDS)) { try { ... } finally { lock.unlock(); } }"
  }
];

export default topic9_questions;