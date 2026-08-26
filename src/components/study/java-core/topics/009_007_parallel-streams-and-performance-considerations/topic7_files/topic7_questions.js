const topic7_questions = [
  {
    "question": "Why does Stream.iterate(1, n -> n + 1).parallel() perform so poorly?",
    "shortAnswer": "Because Stream.iterate computes each element sequentially based on the previous element (f(prev)), making it impossible to know where to split the sequence in advance without computing earlier elements first.",
    "explanation": "Use LongStream.rangeClosed(1, N).parallel() instead, which splits instantly in O(1).",
    "hint": "Each element depends on the previous one, preventing O(1) splitting.",
    "level": "Intermediate",
    "codeExample": "// BAD:\\nStream.iterate(1, n -> n + 1).parallel()\\n// GOOD:\\nIntStream.rangeClosed(1, 1_000_000).parallel()"
  },
  {
    "question": "How does excessive boxing/unboxing impact parallel stream performance?",
    "shortAnswer": "Boxing creates millions of heap objects that cause CPU cache thrashing, pointer chasing, and garbage collection pauses, which often completely negates multi-core parallel gains.",
    "explanation": "Always use primitive streams (IntStream, LongStream, DoubleStream) for numeric workloads.",
    "hint": "Causes CPU cache misses and high garbage collection overhead.",
    "level": "Intermediate",
    "codeExample": "Stream<Integer> vs IntStream"
  }
];

export default topic7_questions;
