const topic4_questions = [
  {
    "question": "Under what conditions does 'HashSet.contains()' operate in O(1) constant time, and what happens if extreme hash collisions occur?",
    "shortAnswer": "'HashSet.contains()' operates in O(1) constant time assuming a well-distributed hash function that spreads elements uniformly across buckets. In the worst-case scenario where many elements produce the identical hash code, elements chain in the same bucket. In Java 8+, if a bucket chain exceeds 8 nodes, it transforms from a linked list into a self-balancing Red-Black tree (TreeBin), guaranteeing O(log n) worst-case performance instead of O(n).",
    "explanation": "Java 8 HashMap/HashSet collision handling architecture.",
    "hint": "O(1) with uniform hash distribution; converts to O(log n) Red-Black tree if bucket has > 8 collisions.",
    "level": "Intermediate",
    "codeExample": "set.contains(key); // O(1) hash bucket jump; O(log n) if bucket treeified"
  }
];

export default topic4_questions;