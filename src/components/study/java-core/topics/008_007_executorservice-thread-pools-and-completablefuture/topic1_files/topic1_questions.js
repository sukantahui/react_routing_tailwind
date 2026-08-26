const topic1_questions = [
  {
    "question": "How does the Java Executor Framework achieve 'Separation of Concerns' between task definition and execution?",
    "shortAnswer": "The Executor Framework cleanly decouples the 'What' (the business task represented by 'Runnable' or 'Callable') from the 'How' (the mechanics of thread creation, OS scheduling, and resource allocation managed by 'ExecutorService'). Application developers simply define workloads and submit them to the executor. The framework manages worker thread lifecycles, queues pending tasks, throttles concurrency, and reuses threads across thousands of jobs with zero manual thread management.",
    "explanation": "Core design philosophy of java.util.concurrent (JSR-166).",
    "hint": "Separates the 'What' (Runnable/Callable task) from the 'How' (Thread creation and scheduling).",
    "level": "Intermediate",
    "codeExample": "ExecutorService pool = Executors.newFixedThreadPool(4); pool.submit(() -> doWork());"
  }
];

export default topic1_questions;