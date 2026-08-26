const topic10_questions = [
  {
    "question": "Explain what 'Spliterator.trySplit()' does and summarize the key characteristics flags (ORDERED, SIZED, DISTINCT, SORTED, CONCURRENT).",
    "shortAnswer": "1. 'trySplit()': partitions a prefix chunk of elements into a newly returned Spliterator while the original Spliterator retains the remaining suffix chunk (returns null if non-splittable). 2. 'Characteristics Flags': bitmask flags informing the Stream pipeline of source properties for optimizations: 'ORDERED' (defined sequence), 'SIZED' (known exact element count), 'DISTINCT' (no duplicates), 'SORTED' (elements follow a sort order), 'CONCURRENT' (safe for concurrent modification without external locking).",
    "explanation": "Complete specification of java.util.Spliterator methods and characteristics.",
    "hint": "trySplit() splits off a prefix chunk; characteristics (ORDERED, SIZED, DISTINCT, etc.) guide stream optimizations.",
    "level": "Advanced",
    "codeExample": "Spliterator<T> part2 = part1.trySplit(); int mask = part1.characteristics();"
  }
];

export default topic10_questions;