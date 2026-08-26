const topic5_questions = [
  {
    "question": "Explain the complete step-by-step internal process that occurs when a thread calls 'object.wait()'.",
    "shortAnswer": "1. 'Atomic Lock Release': the thread automatically and atomically releases the intrinsic monitor lock of 'object'. 2. 'Wait Set Enrollment': the thread is added to 'object''s internal Wait Set. 3. 'Suspension': the thread moves from RUNNABLE to WAITING (or TIMED_WAITING) and yields the CPU core. 4. 'Notification & Lock Contention': when signaled via 'notify()', the thread is removed from the Wait Set and placed into the Entry Set (BLOCKED state). 5. 'Resume': the thread MUST re-acquire the monitor lock before it is allowed to return from 'wait()' and continue execution.",
    "explanation": "Deep dive into JVM monitor and Wait Set mechanics.",
    "hint": "Releases lock, enters Wait Set, deschedules CPU, moves to Entry Set on notify, re-acquires lock before resuming.",
    "level": "Advanced",
    "codeExample": "synchronized(obj) { obj.wait(); // Releases lock, re-acquires before returning }"
  }
];

export default topic5_questions;