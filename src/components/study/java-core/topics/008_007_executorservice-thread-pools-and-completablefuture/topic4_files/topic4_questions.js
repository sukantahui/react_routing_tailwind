const topic4_questions = [
  {
    "question": "What is the internal configuration of 'Executors.newFixedThreadPool(n)' and what causes its OutOfMemoryError risk?",
    "shortAnswer": "'Executors.newFixedThreadPool(n)' creates a 'ThreadPoolExecutor' with: 'corePoolSize = n', 'maximumPoolSize = n', 'keepAliveTime = 0ms', and an unbounded 'new LinkedBlockingQueue<Runnable>()'. Because the queue has a default capacity of 'Integer.MAX_VALUE' (over 2.14 billion tasks), if tasks arrive faster than the 'n' worker threads can execute them, pending tasks accumulate indefinitely in heap memory until the JVM runs out of memory and crashes with 'java.lang.OutOfMemoryError: Java heap space'.",
    "explanation": "Deep dive into FixedThreadPool internals and heap exhaustion vulnerability.",
    "hint": "Uses an unbounded LinkedBlockingQueue with capacity of Integer.MAX_VALUE, risking Java heap space OOM.",
    "level": "Intermediate",
    "codeExample": "new ThreadPoolExecutor(n, n, 0L, TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>());"
  }
];

export default topic4_questions;