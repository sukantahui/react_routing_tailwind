const topic6_questions = [
  {
    "question": "How does 'java.util.LinkedHashSet' maintain strict insertion order while still providing O(1) hash performance?",
    "shortAnswer": "'LinkedHashSet' is backed by an internal 'LinkedHashMap'. In addition to placing nodes into standard hash table buckets for O(1) lookup, each node contains two additional pointers ('before' and 'after'). These pointers link all elements into a global doubly-linked list reflecting insertion sequence. Iteration traverses this linked list in chronological order, while lookups jump directly to hash buckets.",
    "explanation": "Hybrid data structure combining hash buckets with a doubly-linked list.",
    "hint": "Uses a global doubly-linked list (before/after pointers) threading through all hash bucket nodes.",
    "level": "Intermediate",
    "codeExample": "Set<String> set = new LinkedHashSet<>(); // O(1) + predictable insertion order"
  }
];

export default topic6_questions;