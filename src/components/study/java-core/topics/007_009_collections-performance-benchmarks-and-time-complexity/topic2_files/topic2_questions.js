const topic2_questions = [
  {
    "question": "What causes the worst-case performance in 'HashMap.get()', and how did Java 8 improve it from O(n) to O(log n)?",
    "shortAnswer": "Worst-case 'HashMap.get()' occurs during a 'Hash Collision Storm' (when many keys produce the exact same bucket index, such as when objects have a poorly implemented 'hashCode()' returning a constant). In Java 7, collisions formed a singly linked list with 'O(n)' worst-case search time. In Java 8+, when a bucket chain reaches 'TREEIFY_THRESHOLD (8)' elements and table capacity &ge; 64, Java converts the bucket into a Red-Black Tree ('TreeBin'), reducing worst-case search time to 'O(log n)'.",
    "explanation": "Fundamental security and architectural evolution in Java 8.",
    "hint": "Hash collision storms cause worst case; Java 8 treeifies chains to Red-Black trees at 8 nodes (O(log n)).",
    "level": "Intermediate",
    "codeExample": "// Java 7 worst: O(n) linked list | Java 8+ worst: O(log n) TreeBin"
  }
];

export default topic2_questions;