const topic2_questions = [
  {
    "question": "What happens when an exception propagates all the way out of the 'main()' method without being caught?",
    "shortAnswer": "The JVM invokes the thread's 'UncaughtExceptionHandler' (or the JVM's default handler). By default, it prints the complete stack trace to 'System.err' and terminates the offending thread. If the terminated thread was the last running non-daemon thread, the entire JVM process exits.",
    "explanation": "Enterprise systems install global UncaughtExceptionHandlers to log crashes to APM systems before exit.",
    "hint": "JVM invokes UncaughtExceptionHandler, prints stack trace, and terminates the thread.",
    "level": "Intermediate",
    "codeExample": "Thread.setDefaultUncaughtExceptionHandler((t, e) → log.error(\"Crash in: \" + t, e));"
  }
];

export default topic2_questions;