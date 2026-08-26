const topic5_questions = [
  {
    "question": "What is the crucial difference between the 'BLOCKED' state and the 'WAITING' state in Java?",
    "shortAnswer": "'BLOCKED' occurs when a thread is actively attempting to acquire an intrinsic monitor lock (i.e. waiting to enter a 'synchronized' method or block currently held by another thread). 'WAITING' occurs when a thread is passively waiting indefinitely for another thread to perform a specific action (such as waiting for 'Object.notify()' after calling 'wait()', or waiting for another thread to complete after calling 'Thread.join()').",
    "explanation": "Classic thread state distinction frequently asked in technical interviews.",
    "hint": "BLOCKED = waiting for synchronized monitor lock; WAITING = waiting indefinitely for notify() or join().",
    "level": "Intermediate",
    "codeExample": "// BLOCKED: synchronized(lock) { ... } | WAITING: lock.wait(); or thread.join();"
  }
];

export default topic5_questions;