const topic1_questions = [
  {
    "question": "Why is 'map.containsKey(key)' an O(1) operation while 'map.containsValue(value)' is an O(n) operation in HashMap?",
    "shortAnswer": "'containsKey(key)' is O(1) because the key is hashed to jump directly to its target bucket. In contrast, 'containsValue(value)' is O(n) because values are not indexed by hash codes; the JVM must iterate through every single bucket and traverse every linked node in the map to check 'value.equals()'.",
    "explanation": "Fundamental complexity difference between key and value lookups in HashMaps.",
    "hint": "Keys are indexed by hash buckets (O(1)); values require a full linear scan of all buckets (O(n)).",
    "level": "Intermediate",
    "codeExample": "map.containsKey(\"K1\"); // O(1) | map.containsValue(\"V1\"); // O(n)"
  }
];

export default topic1_questions;