const topic5_questions = [
  {
    "question": "How does Arrays.stream(int[]) prevent performance degradation compared to Stream.of(Integer[])?",
    "shortAnswer": "Arrays.stream(int[]) returns a primitive IntStream that operates directly on unboxed 32-bit primitive integers, avoiding thousands of heap allocations and auto-boxing/unboxing overhead.",
    "explanation": "IntStream provides dedicated numeric operations like sum(), average(), and summaryStatistics().",
    "hint": "Returns a primitive IntStream that avoids boxing into wrapper objects.",
    "level": "Intermediate",
    "codeExample": "int[] arr = {1, 2, 3};\\nIntStream is = Arrays.stream(arr); // Zero boxing overhead!"
  },
  {
    "question": "Is the end index in Arrays.stream(array, start, end) inclusive or exclusive?",
    "shortAnswer": "The end index is exclusive, following standard Java range conventions [startInclusive, endExclusive).",
    "explanation": "This matches substring(start, end) and subList(start, end) semantics across the JDK.",
    "hint": "Start is inclusive, end is exclusive.",
    "level": "Beginner",
    "codeExample": "String[] arr = {'A', 'B', 'C', 'D'};\\nArrays.stream(arr, 1, 3); // Processes elements at index 1 and 2 ('B', 'C')"
  }
];

export default topic5_questions;
