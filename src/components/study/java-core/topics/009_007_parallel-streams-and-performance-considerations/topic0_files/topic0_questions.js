const topic0_questions = [
  {
    "question": "What underlying thread pool executes parallel stream operations in Java?",
    "shortAnswer": "The global, JVM-wide java.util.concurrent.ForkJoinPool.commonPool(), which is shared across all parallel streams and CompletableFutures in the application.",
    "explanation": "By default, the common pool size equals the number of available CPU cores minus one.",
    "hint": "ForkJoinPool.commonPool()",
    "level": "Beginner",
    "codeExample": "ForkJoinPool pool = ForkJoinPool.commonPool();"
  },
  {
    "question": "How does a parallel stream divide its data source across worker threads?",
    "shortAnswer": "It uses the source's Spliterator.trySplit() method to recursively partition the data into two halves until the chunks reach a threshold suitable for individual worker threads.",
    "explanation": "Array-backed collections split with O(1) efficiency, while linked structures split poorly with O(N) cost.",
    "hint": "Recursively partitions data using Spliterator.trySplit().",
    "level": "Intermediate",
    "codeExample": "Spliterator<T> split = spliterator.trySplit();"
  }
];

export default topic0_questions;
