const topic9_questions = [
  {
    "question": "Explain the standard 2-Phase Graceful Shutdown Protocol for 'ExecutorService' recommended by Oracle.",
    "shortAnswer": "1. 'Phase 1 (Polite Drain)': Call 'pool.shutdown()' to reject new incoming submissions while allowing all currently queued and executing tasks to finish. 2. 'Wait SLA': Call 'pool.awaitTermination(timeout, unit)' to block and wait for completion. 3. 'Phase 2 (Forceful Cancellation)': If the timeout expires before tasks complete, call 'pool.shutdownNow()' to send thread interrupts ('Thread.interrupt()') to currently running workers and drain unstarted tasks from the queue into a List<Runnable>. 4. 'Final Wait': Call 'awaitTermination()' a second time to ensure all interrupted tasks unwind and terminate cleanly.",
    "explanation": "Standard production graceful shutdown idiom from Java official documentation.",
    "hint": "Phase 1: shutdown() + awaitTermination(); Phase 2 (if timeout): shutdownNow() + awaitTermination().",
    "level": "Intermediate",
    "codeExample": "pool.shutdown(); if (!pool.awaitTermination(5, TimeUnit.SECONDS)) pool.shutdownNow();"
  }
];

export default topic9_questions;