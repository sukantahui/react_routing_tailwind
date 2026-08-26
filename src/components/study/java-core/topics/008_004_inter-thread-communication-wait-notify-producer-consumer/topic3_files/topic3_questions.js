const topic3_questions = [
  {
    "question": "Why does Java strictly mandate that 'wait()' and 'notify()' MUST be called within a synchronized block holding that exact object's monitor lock?",
    "shortAnswer": "To prevent the fatal 'Lost Wakeup' (or Missed Signal) race condition. Without mutual exclusion over the condition predicate and the wait/notify methods, a signaling thread could interleave between another thread's condition check (e.g. 'if (!packageArrived)') and its 'wait()' invocation. The notifier would fire 'notify()' into an empty wait set, and the receiver would then enter 'wait()' with the signal already lost, sleeping forever in a deadlock. Synchronization ensures that checking the condition and calling 'wait()' occurs atomically.",
    "explanation": "Fundamental concurrency invariant preventing missed notification deadlocks.",
    "hint": "Prevents Lost Wakeup race conditions where notify() fires before the waiting thread actually enters wait().",
    "level": "Intermediate",
    "codeExample": "synchronized(lock) { while(!ready) lock.wait(); } // Guaranteed atomic condition check"
  }
];

export default topic3_questions;