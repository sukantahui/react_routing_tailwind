const topic6_questions = [
  {
    "question": "What happens when you use a custom class with no hashCode() and equals() implementations as a HashMap key?",
    "shortAnswer": "It inherits default Object implementations which use system memory address identity. Two separate instances with identical field values will produce different hash codes and compare as unequal, returning null upon retrieval.",
    "explanation": "Violation of HashMap key equality contract.",
    "hint": "Default Object.hashCode() uses memory identity, failing key lookups for different instances.",
    "level": "Beginner",
    "codeExample": "map.put(new Key(1), val); map.get(new Key(1)); // returns null"
  },
  {
    "question": "Why should HashMap keys always be immutable objects in production applications?",
    "shortAnswer": "If key fields used in hashCode() mutate after being inserted into a Map, the object's computed hash code changes. Future lookups calculate a different bucket index, making the stored value unretrievable and causing silent memory leaks.",
    "explanation": "Mutable key anti-pattern causing orphaned entries.",
    "hint": "Mutating key fields changes bucket calculation, making entries unfindable.",
    "level": "Intermediate",
    "codeExample": "key.setName(\"new\"); map.get(key); // null!"
  }
];

export default topic6_questions;
