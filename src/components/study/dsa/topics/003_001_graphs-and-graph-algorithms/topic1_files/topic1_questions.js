const questions = [
  {
    id: 1,
    question: "What constraint must be satisfied for Dijkstra's algorithm to work correctly?",
    options: [
      "All edge weights must be non-negative (>= 0)",
      "The graph must be a binary tree",
      "Graph edges must be unweighted",
      "Vertices must be even"
    ],
    answer: "All edge weights must be non-negative (>= 0)",
    explanation: "Dijkstra's greedy shortest path approach fails on negative edge weights (Bellman-Ford must be used instead)."
  }
];

export default questions;
