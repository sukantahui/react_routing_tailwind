const topic14_questions = [
  {
    "question": "What makes 'java.lang.String' the single most popular and optimal key type for HashMaps in Java?",
    "shortAnswer": "1. 'Immutability': String is immutable, guaranteeing that its internal state and hash code never change after map insertion. 2. 'Cached Hash Code': String caches its computed 32-bit hash code in a private field ('private int hash;'). During subsequent 'map.get(key)' calls, the hash is read directly from cache without re-iterating over characters, delivering maximum CPU efficiency.",
    "explanation": "Classic Java interview design question on String caching and immutability.",
    "hint": "Immutability guarantees key stability; cached hash code eliminates character traversal on subsequent lookups.",
    "level": "Intermediate",
    "codeExample": "public int hashCode() { int h = hash; if (h == 0 && !value.isEmpty()) { ... hash = h; } return h; }"
  }
];

export default topic14_questions;