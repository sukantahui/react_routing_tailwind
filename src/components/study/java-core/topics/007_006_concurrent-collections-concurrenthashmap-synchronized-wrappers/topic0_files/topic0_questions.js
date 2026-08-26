const topic0_questions = [
  {
    "question": "What specific concurrency hazards occur when multiple threads mutate a standard 'java.util.HashMap' or 'java.util.ArrayList' without synchronization?",
    "shortAnswer": "1. 'Data Corruption & Lost Updates': concurrent writes to the same bucket cause node pointers to overwrite each other, causing elements to disappear silently. 2. 'Corrupted Size Counters': non-atomic 'size++' updates result in 'map.size()' reporting fewer elements than actually inserted. 3. 'ConcurrentModificationException': iterators fail-fast if modifications occur during traversal. 4. 'Historical CPU Spikes': in Java 7, concurrent resizing created circular linked lists that spun CPU cores at 100% indefinitely.",
    "explanation": "Fundamental reason why concurrent collections exist in Java.",
    "hint": "Lost updates, corrupted size counters, ConcurrentModificationException, and infinite resizing loops (pre-Java 8).",
    "level": "Intermediate",
    "codeExample": "Map<K,V> map = new HashMap<>(); // DANGEROUS when accessed concurrently by multiple threads"
  }
];

export default topic0_questions;