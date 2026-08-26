const topic8_questions = [
  {
    "question": "Why does LinkedList fail to deliver multi-core speedups in parallel streams?",
    "shortAnswer": "Because LinkedList does not support index-based random access. The Spliterator must iterate sequentially through half the nodes just to find the split boundary, introducing severe CPU overhead that destroys parallelism.",
    "explanation": "Array-backed collections split in O(1) arithmetic time.",
    "hint": "Requires O(N) pointer traversal to find split points.",
    "level": "Intermediate",
    "codeExample": "ArrayList: mid = (start + end) / 2; LinkedList: traverse node.next N/2 times"
  },
  {
    "question": "Which data source splits most efficiently for numeric stream pipelines?",
    "shortAnswer": "IntStream.range() or IntStream.rangeClosed(), because it has zero heap memory footprint and calculates exact midpoint integer ranges in O(1) arithmetic operations.",
    "explanation": "Produces maximum throughput in ForkJoinPool.",
    "hint": "IntStream.rangeClosed()",
    "level": "Beginner",
    "codeExample": "IntStream.rangeClosed(1, 1_000_000).parallel().sum();"
  }
];

export default topic8_questions;
