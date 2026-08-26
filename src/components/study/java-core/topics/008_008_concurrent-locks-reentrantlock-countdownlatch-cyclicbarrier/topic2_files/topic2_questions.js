const topic2_questions = [
  {
    "question": "Compare 'lock()', 'tryLock()', 'tryLock(timeout)', and 'lockInterruptibly()' in ReentrantLock.",
    "shortAnswer": "1. 'lock()': Unconditionally blocks until lock is acquired; ignores thread interrupts. 2. 'tryLock()': Non-blocking poll; immediately acquires lock and returns 'true' if free, or returns 'false' immediately without waiting. 3. 'tryLock(timeout, unit)': Bounded block; waits up to timeout duration for lock, returning 'true' on success or 'false' on expiration, and honors interrupts. 4. 'lockInterruptibly()': Blocks until lock is acquired, but if 'Thread.interrupt()' is called while waiting in the lock queue, it immediately aborts and throws 'InterruptedException'.",
    "explanation": "Complete method comparative matrix of java.util.concurrent.locks.Lock.",
    "hint": "lock blocks forever; tryLock is non-blocking; tryLock(timeout) is bounded; lockInterruptibly responds to interrupt while waiting.",
    "level": "Intermediate",
    "codeExample": "if (lock.tryLock(1, TimeUnit.SECONDS)) { try { ... } finally { lock.unlock(); } }"
  }
];

export default topic2_questions;