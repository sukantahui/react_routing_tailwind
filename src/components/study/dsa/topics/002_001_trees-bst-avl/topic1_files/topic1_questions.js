const questions = [
  {
    id: 1,
    question: "What is the balance factor constraint for every node in an AVL Tree?",
    options: ["Balance factor must be -1, 0, or +1", "Balance factor can be any integer", "Balance factor must be >= 2", "Balance factor must be negative"],
    answer: "Balance factor must be -1, 0, or +1",
    explanation: "The balance factor is `height(left_subtree) - height(right_subtree)`. If it exceeds 1 or drops below -1, tree rotations are performed to restore height balance O(log n)."
  }
];

export default questions;
