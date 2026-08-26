const topic8_questions = [
  {
    "question": "Explain the task submission workflow in 'ThreadPoolExecutor' and describe the 4 standard RejectedExecutionHandler policies.",
    "shortAnswer": "1. 'Workflow': (A) If running threads < 'corePoolSize', spawn a new thread. (B) If core threads busy, add task to 'workQueue'. (C) If workQueue is FULL and running threads < 'maximumPoolSize', spawn an extra thread. (D) If workQueue is full AND maximumPoolSize reached, trigger 'RejectedExecutionHandler'. 2. 'The 4 Rejection Policies': (1) 'AbortPolicy' (throws RejectedExecutionException), (2) 'CallerRunsPolicy' (executes task synchronously on calling thread, creating backpressure), (3) 'DiscardPolicy' (silently drops task), (4) 'DiscardOldestPolicy' (discards oldest task from queue head and retries).",
    "explanation": "Foundational ThreadPoolExecutor lifecycle and backpressure architecture.",
    "hint": "Core threads &rarr; Queue &rarr; Max threads &rarr; RejectedExecutionHandler (Abort, CallerRuns, Discard, DiscardOldest).",
    "level": "Advanced",
    "codeExample": "new ThreadPoolExecutor(2, 4, 30L, TimeUnit.SECONDS, new ArrayBlockingQueue<>(100), new ThreadPoolExecutor.CallerRunsPolicy());"
  }
];

export default topic8_questions;