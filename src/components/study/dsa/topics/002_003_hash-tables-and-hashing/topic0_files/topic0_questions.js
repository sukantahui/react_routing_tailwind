const questions = [
  {
    id: 1,
    question: "What is the average time complexity of insertion, deletion, and lookup in a Hash Table?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)",
    explanation: "With a good hash function and low load factor (alpha < 0.7), direct index mapping allows average O(1) time access."
  },
  {
    id: 2,
    question: "What is a Hash Collision?",
    options: [
      "When two distinct keys produce the exact same array index from the hash function",
      "When memory runs out on the stack",
      "When pointers collide in a loop",
      "When realloc fails"
    ],
    answer: "When two distinct keys produce the exact same array index from the hash function",
    explanation: "Since the key space is infinite and table slots are finite (Pigeonhole Principle), different keys can map to identical indices."
  },
  {
    id: 3,
    question: "What are the two major categories of collision resolution techniques?",
    options: [
      "Separate Chaining (Linked Lists) and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)",
      "Stack vs Heap",
      "Quick Sort vs Merge Sort",
      "BFS vs DFS"
    ],
    answer: "Separate Chaining (Linked Lists) and Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)",
    explanation: "Separate Chaining stores colliding elements in external linked list buckets, while Open Addressing probes subsequent empty slots within the table itself."
  }
];

export default questions;
