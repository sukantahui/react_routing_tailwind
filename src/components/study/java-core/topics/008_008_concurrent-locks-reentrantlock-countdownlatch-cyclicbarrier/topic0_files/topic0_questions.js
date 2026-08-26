const topic0_questions = [
  {
    "question": "What are the 4 fundamental limitations of Java's intrinsic 'synchronized' keyword that motivated explicit 'java.util.concurrent.locks'?",
    "shortAnswer": "1. 'No Timeouts': 'synchronized' blocks cannot time out; a thread waits forever if the lock is never freed. 2. 'Uninterruptible': A thread blocked on monitor entry cannot be interrupted via 'Thread.interrupt()'. 3. 'No Non-Blocking Polling': There is no way to test if a lock is free without blocking ('tryLock()'). 4. 'Single Wait-Set': Every object has only one monitor wait-set, meaning 'notifyAll()' must wake up all waiting threads (e.g. both producers and consumers), causing signal thrashing. Explicit 'Lock' and 'Condition' resolve all four flaws.",
    "explanation": "Core justification for the JSR-166 Lock framework.",
    "hint": "Cannot timeout, cannot interrupt, cannot test availability with tryLock, and has only 1 wait-set.",
    "level": "Intermediate",
    "codeExample": "// synchronized: blocks indefinitely; Lock: supports tryLock(500, TimeUnit.MILLISECONDS)"
  }
];

export default topic0_questions;