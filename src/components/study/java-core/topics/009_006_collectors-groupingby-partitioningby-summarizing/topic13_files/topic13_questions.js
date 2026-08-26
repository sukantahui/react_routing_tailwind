const topic13_questions = [
  {
    "question": "How does partitioningBy() differ from groupingBy()?",
    "shortAnswer": "partitioningBy() uses a Predicate<T> to divide elements into exactly two boolean buckets (true and false), whereas groupingBy() uses a Function<T, K> to classify elements into any arbitrary number of keys.",
    "explanation": "partitioningBy() is faster and guarantees that both Boolean.TRUE and Boolean.FALSE keys are always present in the returned Map.",
    "hint": "partitioningBy always produces a 2-key boolean map (true and false).",
    "level": "Beginner",
    "codeExample": "Map<Boolean, List<User>> activeInactive = list.stream().collect(partitioningBy(User::isActive));"
  },
  {
    "question": "If all elements in a stream evaluate to true, will the false key still exist in the returned Map from partitioningBy()?",
    "shortAnswer": "Yes! The false key will exist and its value will be an empty collection (e.g. empty List []).",
    "explanation": "This eliminates the need to check map.containsKey(false).",
    "hint": "Yes, maps to an empty collection.",
    "level": "Intermediate",
    "codeExample": "map.get(false); // Returns [] (never null!)"
  }
];

export default topic13_questions;
