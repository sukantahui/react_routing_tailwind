const topic4_questions = [
  {
    "question": "What are the 4 fields contained inside the internal 'HashMap.Node<K,V>' class in Java?",
    "shortAnswer": "1. 'final int hash': the cached 32-bit hash value of the key. 2. 'final K key': the key object reference (immutable). 3. 'V value': the mutable value object reference. 4. 'Node<K,V> next': the pointer to the next node in the same bucket chain (used for separate chaining collisions).",
    "explanation": "Core static nested class inside java.util.HashMap.",
    "hint": "Four fields: final int hash, final K key, V value, and Node<K,V> next pointer.",
    "level": "Intermediate",
    "codeExample": "static class Node<K,V> { final int hash; final K key; V value; Node<K,V> next; }"
  }
];

export default topic4_questions;