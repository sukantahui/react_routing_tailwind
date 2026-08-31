const topic12_questions = [
  {
    "question": "What is the difference between 'CompletableFuture.supplyAsync()' and 'CompletableFuture.runAsync()' and why should a custom Executor be provided?",
    "shortAnswer": "1. 'supplyAsync(Supplier<U>)' accepts a 'Supplier' and returns a 'CompletableFuture<U>' holding the computed return value. 2. 'runAsync(Runnable)' accepts a 'Runnable' and returns a 'CompletableFuture<Void>' for tasks with no return value. 3. 'Custom Executor': By default, both methods use the shared 'ForkJoinPool.commonPool()'. If I/O-bound blocking tasks (e.g. database/HTTP calls) execute on the common pool, they exhaust common pool worker threads and starve parallel streams across the entire JVM. Passing a dedicated 'ExecutorService' isolates I/O workloads safely.",
    "explanation": "Core async task initiation and thread pool isolation rules.",
    "hint": "supplyAsync returns a value (Supplier); runAsync returns void (Runnable); custom executor prevents commonPool thread starvation.",
    "level": "Intermediate",
    "codeExample": "CompletableFuture.supplyAsync(() → queryDb(), customThreadPool);"
  }
];

export default topic12_questions;