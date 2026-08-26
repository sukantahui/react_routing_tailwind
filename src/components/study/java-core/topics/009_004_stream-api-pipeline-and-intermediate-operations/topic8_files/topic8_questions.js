const topic8_questions = [
  {
    "question": "What is the difference between IntStream.range() and IntStream.rangeClosed()?",
    "shortAnswer": "IntStream.range(start, end) excludes the end value [start, end), whereas IntStream.rangeClosed(start, end) includes the end value [start, end].",
    "explanation": "range(1, 5) generates 1, 2, 3, 4 while rangeClosed(1, 5) generates 1, 2, 3, 4, 5.",
    "hint": "range is exclusive of upper bound; rangeClosed is inclusive.",
    "level": "Beginner",
    "codeExample": "IntStream.range(1, 3); // 1, 2\\nIntStream.rangeClosed(1, 3); // 1, 2, 3"
  },
  {
    "question": "What is IntSummaryStatistics and why is it more efficient than calling min(), max(), and average() separately?",
    "shortAnswer": "IntSummaryStatistics calculates count, min, max, sum, and average in a single traversal of the stream. Calling min(), max(), and average() separately would require re-running 3 separate stream passes.",
    "explanation": "Since streams can only be consumed once, summaryStatistics provides an efficient 1-pass solution.",
    "hint": "Gathers all 5 statistical metrics in a single pass over the stream.",
    "level": "Intermediate",
    "codeExample": "IntSummaryStatistics stats = IntStream.of(10, 20, 30).summaryStatistics();\\nstats.getAverage(); // 20.0"
  }
];

export default topic8_questions;
