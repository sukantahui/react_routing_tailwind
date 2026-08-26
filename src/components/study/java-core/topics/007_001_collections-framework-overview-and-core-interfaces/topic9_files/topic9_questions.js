const topic9_questions = [
  {
    "question": "What are the 3 distinct Collection Views provided by the 'java.util.Map' interface to bridge Maps with Collections?",
    "shortAnswer": "1. 'keySet()': returns a 'Set<K>' view containing all unique keys. 2. 'values()': returns a 'Collection<V>' view containing all values (which may have duplicates). 3. 'entrySet()': returns a 'Set<Map.Entry<K, V>>' view containing key-value pair objects. All 3 views are backed directly by the underlying Map.",
    "explanation": "How Maps interface seamlessly with Collection algorithms and iteration.",
    "hint": "keySet() (Set of keys), values() (Collection of values), and entrySet() (Set of Map.Entry pairs).",
    "level": "Intermediate",
    "codeExample": "for (Map.Entry<K, V> e : map.entrySet()) { K k = e.getKey(); V v = e.getValue(); }"
  }
];

export default topic9_questions;