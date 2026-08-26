const topic4_questions = [
  {
    "question": "When should you use Collectors.counting() instead of stream.count()?",
    "shortAnswer": "Use stream.count() for direct standalone stream counting. Use Collectors.counting() when counting is needed as a downstream collector inside groupingBy() or partitioningBy() operations.",
    "explanation": "Collectors.counting() is composable with other collectors.",
    "hint": "Use Collectors.counting() as a downstream collector inside groupingBy().",
    "level": "Intermediate",
    "codeExample": "Map<String, Long> perBranch = students.stream().collect(groupingBy(Student::getBranch, counting()));"
  },
  {
    "question": "What does Collectors.averagingDouble() return if the stream is empty?",
    "shortAnswer": "It returns 0.0 (as a primitive double or Double), safely handling division by zero.",
    "explanation": "This avoids generating NaN or throwing arithmetic exceptions.",
    "hint": "Returns 0.0 on empty streams.",
    "level": "Beginner",
    "codeExample": "Double avg = Stream.<Integer>empty().collect(Collectors.averagingDouble(x -> x)); // 0.0"
  }
];

export default topic4_questions;
