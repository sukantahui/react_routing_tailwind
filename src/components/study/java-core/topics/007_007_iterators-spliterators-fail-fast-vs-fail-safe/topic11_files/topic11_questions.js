const topic11_questions = [
  {
    "question": "Trace the complete execution lifecycle of how 'Collection.parallelStream()' uses 'Spliterator' and 'ForkJoinPool' to process data across CPU cores.",
    "shortAnswer": "1. 'Spliterator Acquisition': 'parallelStream()' requests the source collection's 'Spliterator'. 2. 'Recursive Splitting': ForkJoinPool tasks invoke 'spliterator.trySplit()' recursively to divide the workload into smaller balanced sub-tasks across available CPU cores. 3. 'Parallel Execution': each worker thread processes its allocated Spliterator chunk using 'forEachRemaining()' or 'tryAdvance()'. 4. 'Result Reduction': partial results are combined hierarchically into the final stream result.",
    "explanation": "Architectural synthesis of Java 8 Streams, Spliterators, and ForkJoinPool.",
    "hint": "parallelStream() &rarr; spliterator() &rarr; recursive trySplit() across ForkJoinPool workers &rarr; parallel execution &rarr; combine.",
    "level": "Advanced",
    "codeExample": "list.parallelStream().map(f).collect(Collectors.toList()); // Powered by Spliterator.trySplit()"
  }
];

export default topic11_questions;