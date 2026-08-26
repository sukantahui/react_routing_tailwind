const topic16_questions = [
  {
    "question": "What happens if you call .sorted() without parameters on a Stream of objects that do NOT implement Comparable?",
    "shortAnswer": "A ClassCastException is thrown at runtime when the terminal operation executes, stating that the object cannot be cast to java.lang.Comparable.",
    "explanation": "Always provide an explicit Comparator or implement Comparable on the domain class.",
    "hint": "Throws ClassCastException at runtime.",
    "level": "Beginner",
    "codeExample": "stream.sorted(Comparator.comparing(User::getName)) // Safe custom comparator"
  },
  {
    "question": "How does thenComparing() work for multi-attribute sorting?",
    "shortAnswer": "thenComparing() defines a secondary tie-breaker comparator that is only invoked when the primary comparator evaluates two elements as equal (compare() returns 0).",
    "explanation": "Enables declarative multi-column sorting similar to SQL 'ORDER BY score DESC, name ASC'.",
    "hint": "Invoked only when primary comparator produces a tie (returns 0).",
    "level": "Intermediate",
    "codeExample": "Comparator.comparing(Student::getScore).reversed().thenComparing(Student::getName)"
  }
];

export default topic16_questions;
