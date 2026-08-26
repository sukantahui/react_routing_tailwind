const topic9_questions = [
  {
    "question": "Why does auto-boxing degrade parallel stream performance more severely than sequential loops?",
    "shortAnswer": "In parallel execution, multiple CPU cores concurrently dereference scattered heap pointers, causing extreme L1/L2 cache misses and saturating the hardware memory bus.",
    "explanation": "Hardware memory bandwidth becomes the primary bottleneck rather than CPU calculation capacity.",
    "hint": "Multiple CPU cores saturate memory bandwidth and trash CPU caches.",
    "level": "Advanced",
    "codeExample": "Stream<Integer> vs IntStream"
  },
  {
    "question": "How can you eliminate boxing in a Stream pipeline that starts with objects but calculates numbers?",
    "shortAnswer": "By using mapToInt(), mapToLong(), or mapToDouble() to immediately transition the pipeline into a specialized primitive stream.",
    "explanation": "Transfers execution to unboxed primitive operations.",
    "hint": "Use mapToInt(), mapToLong(), or mapToDouble().",
    "level": "Beginner",
    "codeExample": "students.parallelStream().mapToDouble(Student::getScore).sum();"
  }
];

export default topic9_questions;
