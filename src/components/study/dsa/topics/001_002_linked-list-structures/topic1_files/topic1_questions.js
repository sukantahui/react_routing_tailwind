const questions = [
  {
    id: 1,
    question: "What is the advantage of a Doubly Linked List over a Singly Linked List?",
    options: [
      "Bidirectional traversal (forward and backward) and O(1) node deletion when a node pointer is given",
      "Half RAM consumption",
      "Automatic sorting",
      "No memory allocation required"
    ],
    answer: "Bidirectional traversal (forward and backward) and O(1) node deletion when a node pointer is given",
    explanation: "Because each node has a `prev` pointer, we can instantly reconnect `node->prev->next = node->next` without scanning from head."
  }
];

export default questions;
