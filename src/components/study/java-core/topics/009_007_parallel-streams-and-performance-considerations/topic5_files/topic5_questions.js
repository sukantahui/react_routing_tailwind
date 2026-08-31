const topic5_questions = [
  {
    "question": "What does the NQ model measure in Java Stream performance?",
    "shortAnswer": "It measures total computational volume by multiplying element count N with the CPU cost per element Q. If N*Q exceeds ~10,000, parallel execution is likely to yield performance gains over sequential execution.",
    "explanation": "Helps developers decide objectively whether to call .parallel().",
    "hint": "N = element count, Q = CPU work per element; N * Q > 10,000.",
    "level": "Intermediate",
    "codeExample": "N = 100_000, Q = simple filter → N*Q = 100,000 > 10,000 (Parallel is viable)"
  },
  {
    "question": "Why can small datasets (e.g. N = 50) run slower with parallel streams?",
    "shortAnswer": "Because the fixed overhead of thread scheduling, Spliterator task splitting, task queue insertion, context switching, and merging partial results exceeds the tiny sequential compute time.",
    "explanation": "Parallelism has a non-zero startup and coordination cost.",
    "hint": "Thread creation, scheduling, and result merging overhead exceeds sequential compute time.",
    "level": "Beginner",
    "codeExample": "List.of(1, 2, 3, 4, 5).parallelStream().map(x → x * 2).toList(); // Slower than sequential!"
  }
];

export default topic5_questions;
