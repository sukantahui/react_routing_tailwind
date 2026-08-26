const topic6_questions = [
  {
    "question": "Why does ArrayList split much better in parallel streams than LinkedList?",
    "shortAnswer": "ArrayList is backed by an indexed array where Spliterator.trySplit() computes mid = (start + end)/2 in O(1) time. LinkedList requires traversing N/2 node pointers sequentially just to find the split midpoint.",
    "explanation": "O(1) index splitting vs O(N) pointer traversal.",
    "hint": "ArrayList splits in O(1) by index; LinkedList requires O(N) pointer traversal.",
    "level": "Intermediate",
    "codeExample": "ArrayList: O(1) split; LinkedList: O(N) split."
  },
  {
    "question": "What characteristics describe the ideal workload for parallel streams?",
    "shortAnswer": "Large datasets (N > 10,000) stored in array-backed sources, performing CPU-intensive computations without blocking I/O, lock contention, or shared mutable state.",
    "explanation": "Maximizes multi-core scaling efficiency.",
    "hint": "Large N, array source, CPU-bound, stateless.",
    "level": "Beginner",
    "codeExample": "IntStream.rangeClosed(1, 1_000_000).parallel().map(this::cpuHeavyMath).sum();"
  }
];

export default topic6_questions;
