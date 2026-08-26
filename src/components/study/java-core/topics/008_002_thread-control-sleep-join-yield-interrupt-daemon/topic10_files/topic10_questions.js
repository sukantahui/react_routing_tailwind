const topic10_questions = [
  {
    "question": "What happens if 'thread.setDaemon(true)' is invoked AFTER 'thread.start()' has already been called?",
    "shortAnswer": "Invoking 'thread.setDaemon(true)' on an already running/started thread immediately throws a runtime 'IllegalThreadStateException'. A thread's daemon status must be configured strictly BEFORE 'start()' is called while the thread is still in the 'NEW' state.",
    "explanation": "Explicit constraint defined in java.lang.Thread.setDaemon().",
    "hint": "Throws IllegalThreadStateException; setDaemon() must be called before start() while in NEW state.",
    "level": "Beginner",
    "codeExample": "t.setDaemon(true); t.start(); // Correct! | t.start(); t.setDaemon(true); // Throws exception!"
  }
];

export default topic10_questions;