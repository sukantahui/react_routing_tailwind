const topic4_questions = [
  {
    "question": "How can you run a parallel stream in an isolated custom ForkJoinPool instead of the shared commonPool?",
    "shortAnswer": "By wrapping the stream execution inside a Callable or Runnable submitted to the custom ForkJoinPool: customPool.submit(() → list.parallelStream().collect(...)).get().",
    "explanation": "When a parallel stream is initiated from a thread belonging to a ForkJoinPool, it uses that pool rather than the common pool.",
    "hint": "Submit the stream inside customPool.submit(() → stream...).get().",
    "level": "Advanced",
    "codeExample": "new ForkJoinPool(4).submit(() → list.parallelStream().forEach(x → ...)).get();"
  },
  {
    "question": "Can you change the parallelism level of ForkJoinPool.commonPool() at runtime after it has started?",
    "shortAnswer": "No. The common pool's size is determined and locked during static initialization of the ForkJoinPool class. Setting System.setProperty after initialization has no effect.",
    "explanation": "Must be passed as a JVM startup parameter -Djava.util.concurrent.ForkJoinPool.common.parallelism=N.",
    "hint": "No, must be set via JVM startup argument before static initialization.",
    "level": "Intermediate",
    "codeExample": "-Djava.util.concurrent.ForkJoinPool.common.parallelism=4"
  }
];

export default topic4_questions;
