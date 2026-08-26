const topic13_questions = [
  {
    "question": "Can map() change the total number of elements in a stream?",
    "shortAnswer": "No. map() is strictly a 1-to-1 transformation. If 10 elements enter map(), exactly 10 transformed elements exit map().",
    "explanation": "To alter element counts, use filter() (which removes elements) or flatMap() (which flattens 1 element into 0, 1, or many elements).",
    "hint": "map is 1-to-1 and strictly preserves element count.",
    "level": "Beginner",
    "codeExample": "List.of(1, 2, 3).stream().map(x -> x * 2).count(); // Always 3"
  },
  {
    "question": "When should you use mapToInt() instead of map(Integer::valueOf)?",
    "shortAnswer": "Use mapToInt() whenever you plan to perform numeric aggregations (sum, average, max, summaryStatistics) or want to avoid allocating heap Wrapper objects for every element.",
    "explanation": "mapToInt() produces a high-performance primitive IntStream.",
    "hint": "mapToInt avoids wrapper object allocations and provides numeric terminal methods.",
    "level": "Intermediate",
    "codeExample": "int total = list.stream().mapToInt(String::length).sum();"
  }
];

export default topic13_questions;
