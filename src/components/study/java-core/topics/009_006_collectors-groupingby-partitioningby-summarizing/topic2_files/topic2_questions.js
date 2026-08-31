const topic2_questions = [
  {
    "question": "What happens if you use the 2-argument Collectors.toMap() on a stream that produces duplicate keys?",
    "shortAnswer": "An IllegalStateException is thrown at runtime stating 'Duplicate key ...', halting execution.",
    "explanation": "To handle duplicate keys safely, always use the 3-argument version with a merge function.",
    "hint": "Throws IllegalStateException on duplicate keys.",
    "level": "Beginner",
    "codeExample": "list.stream().collect(Collectors.toMap(User::getId, User::getName, (u1, u2) → u1)); // Safe merge!"
  },
  {
    "question": "How do you ensure the Map returned by Collectors.toMap() preserves insertion encounter order?",
    "shortAnswer": "Pass LinkedHashMap::new as the 4th argument (the map factory supplier) to Collectors.toMap().",
    "explanation": "By default, toMap produces a standard HashMap which does not guarantee order.",
    "hint": "Pass LinkedHashMap::new as the mapSupplier argument.",
    "level": "Intermediate",
    "codeExample": "stream.collect(Collectors.toMap(k, v, merge, LinkedHashMap::new));"
  }
];

export default topic2_questions;
