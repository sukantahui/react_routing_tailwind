const topic0_questions = [
  {
    "question": "Does 'Thread.sleep(millis)' release intrinsic monitor locks held inside a 'synchronized' block, and how does this contrast with 'Object.wait()'?",
    "shortAnswer": "NO. 'Thread.sleep(millis)' does NOT release any monitor locks or synchronized locks held by the sleeping thread; other threads competing for those same locks remain BLOCKED for the entire duration of the sleep. In contrast, 'Object.wait()' immediately RELEASES the intrinsic monitor lock and enters the WAITING pool, allowing other threads to acquire the lock.",
    "explanation": "Core multithreading distinction between sleep() and wait().",
    "hint": "sleep() keeps locks; wait() releases locks.",
    "level": "Intermediate",
    "codeExample": "synchronized(lock) { Thread.sleep(1000); } // Keeps lock | synchronized(lock) { lock.wait(); } // Releases lock"
  }
];

export default topic0_questions;