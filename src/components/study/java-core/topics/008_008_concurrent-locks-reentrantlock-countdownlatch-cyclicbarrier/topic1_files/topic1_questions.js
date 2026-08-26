const topic1_questions = [
  {
    "question": "Why MUST 'lock.lock()' be called outside the 'try' block and 'lock.unlock()' inside the 'finally' block?",
    "shortAnswer": "1. 'lock.lock() before try': If 'lock.lock()' were placed inside the 'try' block and threw an exception (e.g. OutOfMemoryError or failure), the 'finally' block would still execute and call 'unlock()'. Attempting to unlock an un-acquired lock throws an 'IllegalMonitorStateException', masking the original exception. 2. 'lock.unlock() in finally': Placing 'unlock()' in 'finally' guarantees the lock is 100% released even if an unexpected RuntimeException occurs in the critical section, preventing permanent application deadlocks.",
    "explanation": "Golden coding idiom for explicit locks in Java.",
    "hint": "Call lock() before try so failed acquisition doesn't trigger unlock(); call unlock() in finally to prevent permanent lock leaks on error.",
    "level": "Intermediate",
    "codeExample": "Lock lock = new ReentrantLock(); lock.lock(); try { ... } finally { lock.unlock(); }"
  }
];

export default topic1_questions;