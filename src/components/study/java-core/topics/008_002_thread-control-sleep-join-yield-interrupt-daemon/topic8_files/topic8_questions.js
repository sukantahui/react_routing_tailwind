const topic8_questions = [
  {
    "question": "What is the primary difference between a 'User Thread' and a 'Daemon Thread' regarding JVM process termination?",
    "shortAnswer": "A 'User Thread' is a high-priority foreground thread executing core application business logic; the JVM will keep running and will NOT shut down as long as at least ONE User thread is active. A 'Daemon Thread' is a low-priority background service provider (like the Garbage Collector); when all User threads complete their execution, the JVM terminates immediately and abruptly abandons all running Daemon threads without executing their 'finally' blocks.",
    "explanation": "Fundamental JVM lifecycle rule in Java.",
    "hint": "JVM stays alive as long as 1 User thread is alive; JVM exits immediately when all User threads finish, killing all daemons.",
    "level": "Beginner",
    "codeExample": "thread.setDaemon(true); // Marks thread as a background service daemon"
  }
];

export default topic8_questions;