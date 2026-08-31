const topic2_questions = [
  {
    "question": "What does it mean that Java Streams are 'Non-Mutating'?",
    "shortAnswer": "A stream reads data from its underlying source but never modifies the original collection, array, or I/O channel. All transformations result in new intermediate streams or newly collected result structures.",
    "explanation": "Non-mutation prevents race conditions in multithreaded environments and maintains functional purity.",
    "hint": "Source data remains untouched; new results are produced.",
    "level": "Beginner",
    "codeExample": "List<String> src = List.of('a', 'b');\\nList<String> upper = src.stream().map(String::toUpperCase).toList();\\n// src is still ['a', 'b']!"
  },
  {
    "question": "Why is lazy evaluation crucial for Stream API performance and memory efficiency?",
    "shortAnswer": "Lazy evaluation allows the JVM to fuse multiple intermediate operations into a single pass over data, skip processing unneeded elements via short-circuiting (e.g. limit(5) or findFirst()), and avoid creating wasteful intermediate collection buffers.",
    "explanation": "Without laziness, chaining 4 stream operations would generate 4 intermediate lists in memory.",
    "hint": "Enables loop fusion, short-circuiting, and eliminates temporary buffer allocations.",
    "level": "Intermediate",
    "codeExample": "Stream.iterate(1, n → n + 1).filter(n → n % 2 == 0).limit(3).forEach(System.out::println);"
  }
];

export default topic2_questions;
