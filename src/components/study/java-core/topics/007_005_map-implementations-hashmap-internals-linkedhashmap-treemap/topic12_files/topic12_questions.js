const topic12_questions = [
  {
    "question": "How did Java 8 revolutionize the worst-case search complexity of HashMap?",
    "shortAnswer": "In Java 7 and earlier, severe hash collisions chained elements into a linear linked list, causing lookup time to degrade to O(n) worst-case (vulnerable to HashDoS attacks). Java 8 introduced bucket treeification, converting collision chains &ge; 8 nodes into Red-Black trees. This guaranteed a worst-case lookup complexity of O(log n), reducing 10,000 comparisons down to at most ~14 comparisons.",
    "explanation": "Major security and algorithmic milestone in Java 8.",
    "hint": "Worst-case improved from O(n) linear scan to O(log n) Red-Black tree search.",
    "level": "Intermediate",
    "codeExample": "get(key); // Average O(1); Worst-case O(log n) in Java 8+"
  }
];

export default topic12_questions;