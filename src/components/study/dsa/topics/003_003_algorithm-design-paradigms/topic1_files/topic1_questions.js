const questions = [
  {
    id: 1,
    question: "What is the key difference between Backtracking and Brute-Force exploration?",
    options: [
      "Backtracking instantly prunes subtrees (abandons invalid candidates) as soon as constraints are violated, avoiding full state-space evaluation",
      "Backtracking uses double memory",
      "Backtracking is an iterative loop",
      "Brute force uses dynamic programming"
    ],
    answer: "Backtracking instantly prunes subtrees (abandons invalid candidates) as soon as constraints are violated, avoiding full state-space evaluation",
    explanation: "Backtracking builds solutions incrementally. If placing a queen violates constraints, it undoes the choice (backtracks) and prunes the remaining search branch."
  }
];

export default questions;
