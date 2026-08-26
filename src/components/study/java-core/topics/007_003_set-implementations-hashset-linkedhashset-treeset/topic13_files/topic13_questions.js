const topic13_questions = [
  {
    "question": "Why does 'TreeSet' provide O(log n) time complexity for basic operations instead of O(1)?",
    "shortAnswer": "Because 'TreeSet' is a balanced binary search tree rather than a hash table. To find, insert, or delete an element, the algorithm starts at the root node and compares keys, traversing down the tree height. In a self-balancing Red-Black tree with 'n' elements, the tree height is mathematically capped at 2 * log2(n + 1), guaranteeing O(log n) time for both average and worst cases while maintaining continuous sorted order.",
    "explanation": "Fundamental trade-off between hash-based and tree-based data structures.",
    "hint": "Tree traversal steps down the balanced tree height, which is mathematically bounded by O(log n).",
    "level": "Intermediate",
    "codeExample": "treeSet.contains(key); // Maximum ~34 node comparisons for 100,000 elements"
  }
];

export default topic13_questions;