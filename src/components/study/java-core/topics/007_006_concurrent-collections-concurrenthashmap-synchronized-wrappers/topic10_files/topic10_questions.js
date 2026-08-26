const topic10_questions = [
  {
    "question": "Why does Java provide 'ConcurrentSkipListMap' instead of a 'ConcurrentTreeMap' for thread-safe sorted maps?",
    "shortAnswer": "Because self-balancing Red-Black trees (used in TreeMap) require complex multi-node rotations to maintain balance upon insertion and deletion. Rebalancing multiple tree nodes atomically in a lock-free manner without acquiring global locks is extremely complex and slow. In contrast, a 'Skip List' is a multi-level linked list where nodes can be inserted and deleted using simple atomic CAS operations on pointers, providing lock-free O(log n) sorted operations.",
    "explanation": "Core algorithmic rationale in JSR-166 concurrent data structures.",
    "hint": "Skip Lists allow lock-free CAS pointer updates, whereas tree rotations cannot be easily made lock-free.",
    "level": "Advanced",
    "codeExample": "ConcurrentNavigableMap<K,V> map = new ConcurrentSkipListMap<>(); // Lock-free sorted map"
  }
];

export default topic10_questions;