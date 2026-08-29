const questions = [
  {
    id: 1,
    question: "What is the core principle of the Dynamic Programming paradigm?",
    options: [
      "Optimal Substructure and Overlapping Subproblems solved by storing intermediate results (Memoization or Tabulation)",
      "Always choosing the locally optimal choice at each step",
      "Randomized trial and error",
      "Brute force recursion without caching"
    ],
    answer: "Optimal Substructure and Overlapping Subproblems solved by storing intermediate results (Memoization or Tabulation)",
    explanation: "DP breaks a problem down into smaller subproblems, solves each subproblem once, and stores intermediate answers in a table to prevent redundant re-computation."
  },
  {
    id: 2,
    question: "Why can the 0/1 Knapsack problem NOT be solved correctly using a pure Greedy strategy?",
    options: [
      "Items cannot be divided into fractional parts; taking an item may prevent taking more valuable items later",
      "Greedy strategy uses too much heap memory",
      "0/1 Knapsack has no optimal substructure",
      "Values are floating point numbers"
    ],
    answer: "Items cannot be divided into fractional parts; taking an item may prevent taking more valuable items later",
    explanation: "Because items cannot be split, a greedy choice based on value-to-weight ratio can leave empty knapsack capacity, yielding a sub-optimal total value. DP evaluates all subsets systematically."
  },
  {
    id: 3,
    question: "What algorithmic technique explores a state-space tree depth-first and prunes invalid subtrees when constraints are violated?",
    options: ["Backtracking", "Dynamic Programming", "Greedy Method", "Binary Search"],
    answer: "Backtracking",
    explanation: "Backtracking builds solutions step-by-step and instantly abandons (prunes) a candidate branch as soon as it violates problem constraints (e.g. N-Queens, Sudoku)."
  }
];

export default questions;
