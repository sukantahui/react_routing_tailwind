const topic5_questions = [
  {
    "question": "How does 'Executors.newCachedThreadPool()' work and why can it cause 'Thread Explosion' OutOfMemoryErrors?",
    "shortAnswer": "'Executors.newCachedThreadPool()' is configured with 'corePoolSize = 0', 'maximumPoolSize = Integer.MAX_VALUE', 'keepAliveTime = 60s', and a zero-capacity 'SynchronousQueue'. Because the queue cannot buffer tasks, whenever a task is submitted and no existing idle thread is immediately available to accept the handoff, the pool spawns a new native OS thread. If an influx of long-running tasks arrives (e.g. 5,000 simultaneous network requests), it creates 5,000 threads, causing CPU thrashing and crashing the JVM with 'OutOfMemoryError: unable to create native thread'.",
    "explanation": "CachedThreadPool internals and native thread exhaustion mechanics.",
    "hint": "SynchronousQueue has zero buffer; uncapped maximumPoolSize spawns a new thread for every concurrent task.",
    "level": "Intermediate",
    "codeExample": "new ThreadPoolExecutor(0, Integer.MAX_VALUE, 60L, TimeUnit.SECONDS, new SynchronousQueue<Runnable>());"
  }
];

export default topic5_questions;