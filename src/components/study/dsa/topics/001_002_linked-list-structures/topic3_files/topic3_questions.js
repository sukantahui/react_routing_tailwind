const questions = [
  {
    id: 1,
    question: "Why are Circular Linked Lists uniquely suited for Round-Robin CPU Process Scheduling?",
    options: [
      "The tail node links back to the head node, enabling infinite cyclic traversal without end-of-list NULL checks",
      "Because circular lists sort process IDs automatically",
      "Because circular lists use less memory than arrays",
      "Because circular lists prevent deadlocks"
    ],
    answer: "The tail node links back to the head node, enabling infinite cyclic traversal without end-of-list NULL checks",
    explanation: "In Round-Robin scheduling, CPU cycles continuously among active processes in a ring. A Circular Linked List (`tail->next = head`) models this loop natively."
  }
];

export default questions;
