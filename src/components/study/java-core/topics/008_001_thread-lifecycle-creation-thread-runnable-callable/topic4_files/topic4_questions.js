const topic4_questions = [
  {
    "question": "Why does the JVM's 'Thread.State' enum combine both 'Ready to Run' and 'Currently Running' into a single 'RUNNABLE' state?",
    "shortAnswer": "Because the underlying Operating System's kernel thread scheduler switches threads between 'Ready' (waiting in the CPU queue for a time-slice) and 'Running' (actively executing instructions on a core) millions of times per second. Trying to track whether a thread is actively running or ready-to-run inside the JVM would incur unacceptable synchronization and polling overhead. Thus, Java models both as 'RUNNABLE'.",
    "explanation": "Standard JVM OS-level abstraction design rationale.",
    "hint": "OS kernel switches threads between ready and running millions of times a second; tracking both inside the JVM would be too slow.",
    "level": "Intermediate",
    "codeExample": "Thread t = new Thread(task); t.getState(); // NEW; t.start(); t.getState(); // RUNNABLE"
  }
];

export default topic4_questions;