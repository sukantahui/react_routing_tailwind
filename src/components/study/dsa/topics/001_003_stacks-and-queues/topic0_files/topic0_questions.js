const questions = [
  {
    id: 1,
    question: "What ordering principle does a Stack ADT strictly enforce?",
    options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "Random Order", "Sorted Order"],
    answer: "LIFO (Last In First Out)",
    explanation: "Stacks operate on a Last-In-First-Out basis. Elements are pushed onto the top and popped off from the top."
  },
  {
    id: 2,
    question: "What occurs when attempting to push an element onto a stack that has reached its maximum allocated capacity?",
    options: ["Stack Underflow", "Stack Overflow", "Automatic Garbage Collection", "Segfault Correction"],
    answer: "Stack Overflow",
    explanation: "Pushing into a full stack causes Stack Overflow, exceeding available container memory boundaries."
  },
  {
    id: 3,
    question: "Why is a Circular Queue preferred over a standard linear array queue?",
    options: [
      "Circular queue reuses empty array slots created after dequeue operations using modulo arithmetic",
      "Circular queue allows O(1) random access by value",
      "Linear queue consumes double RAM",
      "Circular queue automatically sorts elements"
    ],
    answer: "Circular queue reuses empty array slots created after dequeue operations using modulo arithmetic",
    explanation: "In a linear array queue, dequeuing elements leaves un-reusable empty slots at the front. A Circular Queue wraps around using `(rear + 1) % MAX_SIZE` to reuse vacated slots."
  },
  {
    id: 4,
    question: "Which data structure is internally used to convert arithmetic expressions from Infix to Postfix notation?",
    options: ["Stack", "Binary Tree", "Hash Table", "Graph"],
    answer: "Stack",
    explanation: "The Shunting-Yard algorithm uses an operator Stack to manage operator precedence and parentheses during conversion."
  },
  {
    id: 5,
    question: "What are the primary operations of a Double-Ended Queue (Deque)?",
    options: [
      "Insertion and deletion allowed at both Front and Rear ends",
      "Push and pop only at top",
      "Enqueue only at front",
      "Read-only lookup"
    ],
    answer: "Insertion and deletion allowed at both Front and Rear ends",
    explanation: "A Deque (Double-Ended Queue) allows items to be inserted and deleted from both the front and the rear boundaries in O(1) time."
  }
];

export default questions;
