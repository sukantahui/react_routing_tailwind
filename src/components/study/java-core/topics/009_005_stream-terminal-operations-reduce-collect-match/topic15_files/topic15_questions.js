const topic15_questions = [
  {
    "question": "Why does IntStream.average() return an OptionalDouble rather than a double?",
    "shortAnswer": "Because calculating the average of an empty stream involves dividing by zero. OptionalDouble cleanly communicates the absence of a value without throwing an ArithmeticException.",
    "explanation": "Allows calling .orElse(0.0) or .orElseThrow().",
    "hint": "Avoids division by zero on empty streams.",
    "level": "Beginner",
    "codeExample": "double avg = IntStream.empty().average().orElse(0.0);"
  },
  {
    "question": "How does DoubleSummaryStatistics combine partial statistics across multiple threads in parallel streams?",
    "shortAnswer": "DoubleSummaryStatistics implements a combine(DoubleSummaryStatistics other) method that merges counts, sums, updates global min/max, and recomputes the combined average across worker threads.",
    "explanation": "This allows seamless integration with parallel reductions.",
    "hint": "Uses combine() to merge stats across parallel worker threads.",
    "level": "Advanced",
    "codeExample": "stream.parallel().mapToDouble(x → x).summaryStatistics();"
  }
];

export default topic15_questions;
