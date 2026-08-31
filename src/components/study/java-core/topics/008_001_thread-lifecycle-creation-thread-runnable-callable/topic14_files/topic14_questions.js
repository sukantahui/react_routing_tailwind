const topic14_questions = [
  {
    "question": "Trace the state transitions of 'observedThread' from creation to termination in the live demo.",
    "shortAnswer": "1. 'NEW': when created via 'new Thread()'. 2. 'RUNNABLE': immediately after calling 'start()'. 3. 'TIMED_WAITING': when entering 'Thread.sleep(400)'. 4. 'WAITING': when entering 'MONITOR.wait()'. 5. 'BLOCKED / RUNNABLE': when notified and competing to re-acquire monitor lock. 6. 'TERMINATED': after exiting 'run()' and completing execution.",
    "explanation": "Complete empirical verification of JVM thread lifecycle state machine.",
    "hint": "NEW → RUNNABLE → TIMED_WAITING → WAITING → RUNNABLE → TERMINATED.",
    "level": "Intermediate",
    "codeExample": "System.out.println(thread.getState()); // Prints state transitions"
  }
];

export default topic14_questions;