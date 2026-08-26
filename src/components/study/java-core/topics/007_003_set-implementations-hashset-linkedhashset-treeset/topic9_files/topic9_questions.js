const topic9_questions = [
  {
    "question": "What exact data structure powers 'java.util.TreeSet' internally, and what algorithmic guarantees does it provide?",
    "shortAnswer": "'java.util.TreeSet' is backed internally by a 'java.util.TreeMap', which is a self-balancing Red-Black Binary Search Tree. This guarantees O(log n) time complexity for basic operations ('add', 'remove', 'contains') and ensures that elements remain perpetually sorted according to natural ordering or a custom Comparator.",
    "explanation": "Core architecture of Java's sorted set implementation.",
    "hint": "Backed by TreeMap, which is a self-balancing Red-Black Binary Search Tree providing O(log n) operations.",
    "level": "Intermediate",
    "codeExample": "private transient NavigableMap<E,Object> m; // Backed by TreeMap"
  }
];

export default topic9_questions;