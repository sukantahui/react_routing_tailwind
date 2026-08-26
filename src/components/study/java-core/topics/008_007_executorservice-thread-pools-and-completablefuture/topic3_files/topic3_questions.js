const topic3_questions = [
  {
    "question": "Why do enterprise coding standards (like the Alibaba Java Coding Guidelines) strictly forbid using 'Executors.newFixedThreadPool()' and 'Executors.newCachedThreadPool()' in production?",
    "shortAnswer": "Convenience methods in 'Executors' conceal dangerous unbounded defaults: 1. 'newFixedThreadPool()' and 'newSingleThreadExecutor()' use an unbounded 'LinkedBlockingQueue' (capacity = Integer.MAX_VALUE ~ 2.14 billion). If producers generate tasks faster than workers can consume, millions of tasks pile up in the queue, causing a heap 'OutOfMemoryError'. 2. 'newCachedThreadPool()' allows 'maximumPoolSize = Integer.MAX_VALUE'. Under traffic spikes, it attempts to create thousands of native OS threads, triggering 'OutOfMemoryError: unable to create native thread'. Production code must instantiate 'ThreadPoolExecutor' directly with explicit, bounded limits.",
    "explanation": "Enterprise Java concurrency reliability standard.",
    "hint": "newFixedThreadPool has an unbounded queue (heap OOM); newCachedThreadPool has uncapped threads (native thread OOM).",
    "level": "Advanced",
    "codeExample": "// Forbidden in production: Executors.newFixedThreadPool(10); // Use ThreadPoolExecutor instead!"
  }
];

export default topic3_questions;