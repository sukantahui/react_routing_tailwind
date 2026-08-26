const topic3_questions = [
  {
    "question": "List all 6 thread states defined in the 'java.lang.Thread.State' enum and briefly explain what causes each state.",
    "shortAnswer": "1. 'NEW': Thread object created but 'start()' not yet called. 2. 'RUNNABLE': executing on CPU or eligible to run in OS queue. 3. 'BLOCKED': waiting to acquire an intrinsic monitor lock ('synchronized'). 4. 'WAITING': waiting indefinitely for notification from another thread ('wait()', 'join()'). 5. 'TIMED_WAITING': waiting with a finite timeout ('sleep(ms)', 'join(ms)', 'wait(ms)'). 6. 'TERMINATED': run method has finished executing.",
    "explanation": "Complete specification of java.lang.Thread.State in the JVM.",
    "hint": "NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.",
    "level": "Intermediate",
    "codeExample": "Thread.State state = thread.getState(); // Returns one of 6 enum values"
  }
];

export default topic3_questions;