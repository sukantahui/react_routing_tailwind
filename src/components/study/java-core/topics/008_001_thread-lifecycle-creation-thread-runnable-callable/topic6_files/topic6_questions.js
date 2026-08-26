const topic6_questions = [
  {
    "question": "What causes a thread to enter 'TIMED_WAITING' and what happens if you attempt to call 'start()' on a 'TERMINATED' thread?",
    "shortAnswer": "1. 'TIMED_WAITING': occurs when a thread calls a waiting method with a specified maximum timeout parameter (e.g. 'Thread.sleep(ms)', 'Object.wait(timeout)', 'Thread.join(timeout)', or 'LockSupport.parkNanos()'). 2. 'Restarting Terminated Thread': once a thread completes its 'run()' method and enters 'TERMINATED', its native OS thread and Call Stack are deallocated. Calling 'start()' on a terminated thread immediately throws an 'IllegalThreadStateException'.",
    "explanation": "Core Java thread lifecycle rules.",
    "hint": "Methods with timeout parameters enter TIMED_WAITING; restarted dead threads throw IllegalThreadStateException.",
    "level": "Intermediate",
    "codeExample": "t.join(); // t is now TERMINATED; t.start(); // Throws IllegalThreadStateException!"
  }
];

export default topic6_questions;