const topic1_questions = [
  {
    "question": "What is the difference between Stream.toList() (Java 16) and Collectors.toList()?",
    "shortAnswer": "Stream.toList() returns an unmodifiable, lightweight list that does not allow nulls or mutations, whereas Collectors.toList() returns a standard mutable List (typically ArrayList) that allows element additions and modifications.",
    "explanation": "Stream.toList() is also more memory efficient as it avoids intermediate Collector overhead.",
    "hint": "Stream.toList() is immutable; Collectors.toList() produces a mutable list.",
    "level": "Beginner",
    "codeExample": "List<String> l1 = stream.toList(); // Immutable\\nList<String> l2 = stream.collect(Collectors.toList()); // Mutable"
  },
  {
    "question": "How do you collect stream elements into a specific collection implementation like a TreeSet or LinkedList?",
    "shortAnswer": "By using Collectors.toCollection(CollectionFactory::new), passing the constructor reference of the desired collection.",
    "explanation": "Allows exact control over the underlying data structure.",
    "hint": "Collectors.toCollection(TreeSet::new)",
    "level": "Beginner",
    "codeExample": "TreeSet<String> set = stream.collect(Collectors.toCollection(TreeSet::new));"
  }
];

export default topic1_questions;
