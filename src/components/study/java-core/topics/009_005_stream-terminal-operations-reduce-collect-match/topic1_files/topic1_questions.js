const topic1_questions = [
  {
    "question": "Why might forEach() print elements out of order when applied to a parallel stream?",
    "shortAnswer": "In parallel streams, the source is partitioned into chunks and processed simultaneously across multiple ForkJoinPool threads. forEach() executes actions as soon as individual threads finish without synchronizing on encounter order.",
    "explanation": "This non-deterministic behavior is an intentional design choice for maximum multi-core performance.",
    "hint": "Worker threads emit results as soon as ready without waiting for earlier elements.",
    "level": "Intermediate",
    "codeExample": "list.parallelStream().forEach(System.out::println); // Arbitrary thread execution order"
  },
  {
    "question": "What is the performance drawback of using forEachOrdered() on a parallel stream?",
    "shortAnswer": "forEachOrdered() forces worker threads to coordinate and wait for preceding elements to finish before executing the consumer, creating synchronization bottlenecks that can negate parallel speedups.",
    "explanation": "If strict order is needed at the end of a parallel pipeline, collecting to a list via toList() is often preferred over forEachOrdered.",
    "hint": "Forces thread synchronization and removes concurrency benefits during iteration.",
    "level": "Intermediate",
    "codeExample": "list.parallelStream().forEachOrdered(System.out::println); // Strict order enforced"
  }
];

export default topic1_questions;
