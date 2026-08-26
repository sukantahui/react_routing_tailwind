const topic4_questions = [
  {
    "question": "Why does mutating a field of an object already stored in a HashSet cause a memory leak?",
    "shortAnswer": "Because the object was placed into a specific hash bucket based on its initial hashCode. Mutating its fields changes its hashCode, so subsequent remove() or clear() calls search a different hash bucket, leaving the original entry permanently stuck in the set.",
    "explanation": "One of the most elusive memory leak bugs in Java collections.",
    "hint": "HashCode changes after mutation, so remove() looks in the wrong bucket.",
    "level": "Intermediate",
    "codeExample": "key.field = 'newVal'; set.remove(key); // Returns false, remains in memory!"
  },
  {
    "question": "What language construct in modern Java is recommended for creating map keys to prevent mutable key memory leaks?",
    "shortAnswer": "Java Records (e.g. record StudentKey(int id, String dept) {}), because records are inherently immutable with automatic compiler-generated equals() and hashCode() implementations.",
    "explanation": "Guarantees key immutability and correct hash contracts.",
    "hint": "Java Records (immutable by design).",
    "level": "Beginner",
    "codeExample": "record StudentKey(int id, String campus) {}"
  }
];

export default topic4_questions;
