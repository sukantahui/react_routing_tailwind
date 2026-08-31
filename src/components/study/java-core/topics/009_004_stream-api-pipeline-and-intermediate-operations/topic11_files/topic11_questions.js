const topic11_questions = [
  {
    "question": "Why does calling sorted() on an infinite stream cause an OutOfMemoryError?",
    "shortAnswer": "sorted() is a stateful operation that must see and buffer ALL elements in memory to determine their global order before emitting the first sorted element. On an infinite stream, buffering never completes until heap memory is exhausted.",
    "explanation": "Stateless operations (filter, map) can handle infinite streams if bounded by limit(); sorted() requires a finite bounded stream.",
    "hint": "sorted() must buffer every single element before it can determine what comes first.",
    "level": "Intermediate",
    "codeExample": "// Crashing example:\\nStream.iterate(1, n → n + 1).sorted().limit(5).toList(); // OutOfMemoryError!"
  },
  {
    "question": "How does distinct() maintain state internally during stream execution?",
    "shortAnswer": "distinct() internally creates and populates a HashSet (or ConcurrentHashSet in parallel mode) using element hashCode() and equals() methods to filter out duplicates.",
    "explanation": "For large streams with many unique items, distinct() incurs heap memory overhead proportional to the number of distinct elements.",
    "hint": "Uses hash-based set tracking under the hood.",
    "level": "Intermediate",
    "codeExample": "stream.distinct() // Checks seenSet.add(element)"
  }
];

export default topic11_questions;
