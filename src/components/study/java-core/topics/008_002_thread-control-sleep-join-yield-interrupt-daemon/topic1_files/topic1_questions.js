const topic1_questions = [
  {
    "question": "Why MUST you call 'Thread.currentThread().interrupt()' when catching 'InterruptedException' if you cannot rethrow it?",
    "shortAnswer": "When a blocking method (like 'Thread.sleep()' or 'wait()') detects an interrupt and throws 'InterruptedException', the JVM automatically CLEARS the thread's interrupt status flag (resetting it to 'false'). If code catches the exception and does not rethrow it, the interrupt signal is silently lost ('swallowed'). Calling 'Thread.currentThread().interrupt()' restores the interrupt flag to 'true', allowing higher-level callers and frameworks (like Spring or ExecutorService) to detect the cancellation request.",
    "explanation": "Java Concurrency in Practice (Brian Goetz) Item 5.4: Preserving Interrupt Status.",
    "hint": "The JVM clears the interrupt flag when throwing InterruptedException; calling interrupt() restores it for upstream callers.",
    "level": "Intermediate",
    "codeExample": "catch (InterruptedException e) { Thread.currentThread().interrupt(); // Restore flag! }"
  }
];

export default topic1_questions;