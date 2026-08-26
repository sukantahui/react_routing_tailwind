const topic10_questions = [
  {
    "question": "Why is 'Executors.newVirtualThreadPerTaskExecutor()' used with 'try-with-resources' in Java 21 enterprise backend services?",
    "shortAnswer": "'Executors.newVirtualThreadPerTaskExecutor()' creates an ExecutorService that spawns a brand new, unpooled Virtual Thread for every submitted task. In Java 19+, 'ExecutorService' implements 'AutoCloseable', where 'close()' internally calls 'shutdown()' and blocks via 'awaitTermination()' until all submitted tasks complete. Combining it with 'try-with-resources' provides clean structured lifecycle scoping with zero manual thread pool sizing or shutdown boilerplate.",
    "explanation": "Enterprise standard for Virtual Thread execution in Java 21.",
    "hint": "Creates a new virtual thread per task and integrates with try-with-resources for automatic graceful shutdown waiting.",
    "level": "Intermediate",
    "codeExample": "try (var executor = Executors.newVirtualThreadPerTaskExecutor()) { executor.submit(task); }"
  }
];

export default topic10_questions;