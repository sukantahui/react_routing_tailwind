const topic10_questions = [
  {
    "question": "Why is running blocking I/O (like HTTP calls or JDBC queries) considered a severe anti-pattern in parallel streams?",
    "shortAnswer": "Because parallel streams run on the fixed, CPU-sized ForkJoinPool.commonPool(). Blocking these threads on slow I/O starves the entire pool and halts other parallel streams and async tasks across the entire JVM.",
    "explanation": "CommonPool is sized for CPU compute, not I/O blocking.",
    "hint": "Starves the shared JVM common pool which is sized only for CPU cores.",
    "level": "Advanced",
    "codeExample": "// Severe Anti-Pattern:\\nurls.parallelStream().map(url -> httpClient.send(url)).toList();"
  },
  {
    "question": "What is the recommended modern Java architecture for executing concurrent I/O requests instead of parallel streams?",
    "shortAnswer": "Use Java 21 Virtual Threads via Executors.newVirtualThreadPerTaskExecutor() or CompletableFuture with a dedicated unbounded/cached I/O ThreadPoolExecutor.",
    "explanation": "Virtual threads unmount on blocking I/O, allowing millions of concurrent requests without thread starvation.",
    "hint": "Java 21 Virtual Threads (Project Loom) or dedicated I/O ExecutorService.",
    "level": "Intermediate",
    "codeExample": "try (var executor = Executors.newVirtualThreadPerTaskExecutor()) { ... }"
  }
];

export default topic10_questions;
