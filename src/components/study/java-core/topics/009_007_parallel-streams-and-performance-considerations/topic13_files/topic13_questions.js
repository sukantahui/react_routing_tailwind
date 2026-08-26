const topic13_questions = [
  {
    "question": "What is the key takeaway of the 5-point Parallel Stream checklist before using .parallel() in production?",
    "shortAnswer": "Parallel streams should only be used when N*Q > 10,000, data sources split easily in O(1), operations are pure and stateless, no blocking I/O exists, and actual performance gains are verified via benchmarks.",
    "explanation": "Prevents performance degradation from improper parallelization.",
    "hint": "Large N, splittable source, pure compute, no I/O, verified with benchmarks.",
    "level": "Advanced",
    "codeExample": "if (isLargeArray && isCpuBound && isStateless) { useParallel(); }"
  },
  {
    "question": "Why is forEachOrdered() slower than forEach() in parallel streams?",
    "shortAnswer": "Because forEachOrdered() imposes a synchronization barrier where threads must wait and emit elements strictly according to original encounter order, serializing the final iteration step.",
    "explanation": "Eliminates concurrency benefits during iteration.",
    "hint": "Imposes thread synchronization to serialize output in encounter order.",
    "level": "Intermediate",
    "codeExample": "stream.parallel().forEachOrdered(...) // Enforces serialization barrier"
  }
];

export default topic13_questions;
