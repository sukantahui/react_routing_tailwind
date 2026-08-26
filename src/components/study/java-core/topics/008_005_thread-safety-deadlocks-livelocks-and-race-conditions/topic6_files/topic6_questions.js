const topic6_questions = [
  {
    "question": "What does the 'No Preemption' Coffman condition mean, and how does 'ReentrantLock.tryLock()' allow applications to bypass it safely?",
    "shortAnswer": "'No Preemption' means that once a thread acquires a lock, neither another thread nor the JVM can forcefully seize or confiscate that lock; only the holding thread can release it voluntarily. With Java's intrinsic 'synchronized' keyword, threads block unconditionally until the lock is freed. 'ReentrantLock.tryLock(timeout)' bypasses this limitation by enabling cooperative back-off: if a thread cannot acquire a secondary lock within a timeout period, it voluntarily yields and releases its currently held locks, breaking the deadlock precondition.",
    "explanation": "Third Coffman condition analysis and cooperative lock back-off pattern.",
    "hint": "Locks cannot be stolen by force; tryLock() allows cooperative voluntary release on timeout.",
    "level": "Intermediate",
    "codeExample": "if (lock2.tryLock(500, TimeUnit.MILLISECONDS)) { ... } else { lock1.unlock(); // Back off! }"
  }
];

export default topic6_questions;