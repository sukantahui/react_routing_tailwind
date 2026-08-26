const topic8_questions = [
  {
    "question": "How does 'thenComparing()' resolve sorting ties in a multi-level Comparator chain?",
    "shortAnswer": "'thenComparing()' acts as a secondary tie-breaker. When the primary comparator evaluates two elements, if 'compare()' returns non-zero (< 0 or > 0), that order is used immediately. If the primary comparison returns 0 (a tie), the algorithm cascades to the secondary comparator passed into 'thenComparing()'. Multiple 'thenComparing()' calls can be chained sequentially to replicate multi-column SQL 'ORDER BY' behavior.",
    "explanation": "Default combinator method on java.util.Comparator.",
    "hint": "Cascades to secondary comparison only when the primary comparison returns 0 (a tie).",
    "level": "Intermediate",
    "codeExample": "Comparator.comparing(Emp::getDept).thenComparing(Emp::getSalary, reverseOrder()).thenComparing(Emp::getName);"
  }
];

export default topic8_questions;