const questions = [
  {
    question: "What does O(n!) mean in time complexity?",
    shortAnswer: "Factorial time — the runtime grows as n! (n factorial).",
    explanation: "n! = n × (n-1) × ... × 1. It grows even faster than 2ⁿ and is the worst common complexity.",
    hint: "Think of all permutations of n elements.",
    level: "basic",
    codeExample: "// generating all permutations"
  },
  {
    question: "What is an example of an O(n!) algorithm?",
    shortAnswer: "Brute-force Traveling Salesman Problem (TSP), generating all permutations.",
    explanation: "These algorithms try every possible ordering of n elements.",
    hint: "Permutation problems.",
    level: "basic",
    codeExample: "// TSP brute force"
  },
  {
    question: "How many permutations of n items are there?",
    shortAnswer: "n! permutations.",
    explanation: "There are n choices for the first position, (n-1) for the second, etc.",
    hint: "Factorial.",
    level: "basic",
    codeExample: "// n! permutations"
  },
  {
    question: "Why is O(n!) worse than O(2ⁿ)?",
    shortAnswer: "Because n! grows faster than 2ⁿ for n > 3.",
    explanation: "For n=10, 2¹⁰=1024, 10!≈3.6×10⁶. For larger n, the gap widens.",
    hint: "Compare growth rates.",
    level: "intermediate",
    codeExample: "// n! >> 2^n for large n"
  },
  {
    question: "What is the time complexity of generating all permutations of an array?",
    shortAnswer: "O(n!) — factorial time.",
    explanation: "There are n! permutations to generate.",
    hint: "All arrangements.",
    level: "intermediate",
    codeExample: "// all permutations O(n!)"
  },
  {
    question: "Is O(n!) feasible for n=10?",
    shortAnswer: "Yes, 10! = 3,628,800 — manageable.",
    explanation: "3.6 million operations is feasible in a fraction of a second.",
    hint: "10! ≈ 3.6 million.",
    level: "basic",
    codeExample: "// 10! = 3,628,800"
  },
  {
    question: "Is O(n!) feasible for n=20?",
    shortAnswer: "No, 20! ≈ 2.4 × 10¹⁸ — impossible.",
    explanation: "2.4 quintillion operations is far beyond any computer's capability.",
    hint: "Astronomically large.",
    level: "intermediate",
    codeExample: "// 20! = 2.43e18"
  },
  {
    question: "What is the time complexity of the brute-force TSP?",
    shortAnswer: "O(n!) — factorial time.",
    explanation: "There are n! possible routes to check.",
    hint: "All permutations of cities.",
    level: "intermediate",
    codeExample: "// TSP brute force O(n!)"
  },
  {
    question: "Can DP improve TSP complexity?",
    shortAnswer: "Yes, DP gives O(n²·2ⁿ), which is still exponential but better than O(n!).",
    explanation: "DP stores states of subsets, reducing the search space.",
    hint: "Held-Karp algorithm.",
    level: "advanced",
    codeExample: "// DP TSP O(n²·2ⁿ)"
  },
  {
    question: "What is the time complexity of the n-queens problem (backtracking)?",
    shortAnswer: "O(n!) in the worst case.",
    explanation: "Backtracking can explore all placements, which is O(n!).",
    hint: "Worst-case.",
    level: "advanced",
    codeExample: "// n-queens worst O(n!)"
  },
  {
    question: "What is the time complexity of the assignment problem (brute force)?",
    shortAnswer: "O(n!) — trying all assignments.",
    explanation: "There are n! ways to assign n tasks to n workers.",
    hint: "All matchings.",
    level: "advanced",
    codeExample: "// assignment brute force O(n!)"
  },
  {
    question: "What is the time complexity of determinant (naive Laplace expansion)?",
    shortAnswer: "O(n!) — factorial time.",
    explanation: "Laplace expansion recursively computes determinants in O(n!) time.",
    hint: "Naive determinant.",
    level: "advanced",
    codeExample: "// determinant O(n!)"
  },
  {
    question: "How does factorial growth compare to exponential growth for n=5?",
    shortAnswer: "5! = 120, 2⁵ = 32 — factorial is larger.",
    explanation: "Factorial overtakes exponential at n=4? 4! = 24, 2⁴ = 16. For n≥4, n! > 2ⁿ.",
    hint: "Factorial wins.",
    level: "basic",
    codeExample: "// 5! = 120 > 32"
  },
  {
    question: "Can O(n!) algorithms be parallelized effectively?",
    shortAnswer: "Not effectively; parallelization gives a constant factor speedup, not exponential.",
    explanation: "Even with 1000 processors, you can only handle slightly larger n.",
    hint: "Limited improvement.",
    level: "advanced",
    codeExample: "// Not a solution."
  },
  {
    question: "What is the time complexity of the traveling salesman problem using DP?",
    shortAnswer: "O(n²·2ⁿ) — still exponential, but much better than O(n!).",
    explanation: "Held-Karp algorithm is O(n²·2ⁿ).",
    hint: "DP TSP.",
    level: "advanced",
    codeExample: "// O(n²·2ⁿ)"
  },
  {
    question: "What is the space complexity of DP TSP?",
    shortAnswer: "O(n·2ⁿ) — stores DP table for all subsets.",
    explanation: "The table size is n × 2ⁿ.",
    hint: "Space is exponential.",
    level: "advanced",
    codeExample: "// O(n·2ⁿ)"
  },
  {
    question: "Why do we study O(n!) if it's so impractical?",
    shortAnswer: "To understand the limits of brute-force and to motivate better algorithms.",
    explanation: "Knowing O(n!) helps us recognize when we need heuristics or approximations.",
    hint: "Motivation for optimization.",
    level: "basic",
    codeExample: "// Educational purpose."
  },
  {
    question: "What is the time complexity of finding the shortest Hamiltonian path (brute force)?",
    shortAnswer: "O(n!) — same as TSP.",
    explanation: "You need to try all permutations of vertices.",
    hint: "All paths.",
    level: "advanced",
    codeExample: "// Hamiltonian path O(n!)"
  },
  {
    question: "What is the time complexity of generating all permutations with duplicates?",
    shortAnswer: "O(n!) in the worst case, but fewer if duplicates exist.",
    explanation: "Duplicates reduce the number of unique permutations.",
    hint: "Unique permutations.",
    level: "intermediate",
    codeExample: "// fewer if duplicates"
  },
  {
    question: "Can O(n!) be reduced to O(n·2ⁿ) for TSP?",
    shortAnswer: "Yes, using DP (Held-Karp).",
    explanation: "DP trades space for time.",
    hint: "DP optimization.",
    level: "advanced",
    codeExample: "// Held-Karp"
  },
  {
    question: "What is the time complexity of the brute-force subset sum?",
    shortAnswer: "O(2ⁿ) — exponential, not factorial.",
    explanation: "Subset sum checks all subsets (2ⁿ), not permutations.",
    hint: "Subsets not permutations.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the time complexity of the brute-force knapsack?",
    shortAnswer: "O(2ⁿ) — exponential.",
    explanation: "Checks all subsets of items.",
    hint: "Subsets.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the time complexity of the traveling salesman with nearest neighbor heuristic?",
    shortAnswer: "O(n²) — polynomial.",
    explanation: "Heuristic algorithms are polynomial and give good approximations.",
    hint: "Approximation.",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "Can we solve TSP for n=100 exactly?",
    shortAnswer: "No, exact solution is impossible for n=100 with current algorithms.",
    explanation: "TSP is NP-hard; exact solution requires exponential time.",
    hint: "NP-hard.",
    level: "advanced",
    codeExample: "// Not possible."
  },
  {
    question: "What is the time complexity of the Hungarian algorithm for assignment?",
    shortAnswer: "O(n³) — polynomial.",
    explanation: "The Hungarian algorithm solves the assignment problem in polynomial time.",
    hint: "Assignment solved in O(n³).",
    level: "advanced",
    codeExample: "// Hungarian O(n³)"
  },
  {
    question: "Why is O(n!) considered intractable?",
    shortAnswer: "Because it grows faster than any polynomial and even faster than 2ⁿ.",
    explanation: "For n=30, 30! ≈ 2.6×10³² — impossible.",
    hint: "Unimaginably large.",
    level: "basic",
    codeExample: "// intractable"
  },
  {
    question: "What is the time complexity of the brute-force graph coloring?",
    shortAnswer: "O(kⁿ) — where k is the number of colors. For k=2, it's O(2ⁿ) — exponential, not factorial.",
    explanation: "Graph coloring checks kⁿ assignments, not permutations.",
    hint: "Not factorial.",
    level: "advanced",
    codeExample: "// O(kⁿ)"
  },
  {
    question: "What is the time complexity of the naive determinant using Cramer's rule?",
    shortAnswer: "O(n! · n²) — worse.",
    explanation: "Cramer's rule involves n+1 determinants, each O(n!), so O(n!·n²).",
    hint: "Even worse.",
    level: "advanced",
    codeExample: "// O(n!·n²)"
  },
  {
    question: "How many seconds would it take to compute 15! operations at 1 GHz?",
    shortAnswer: "15! ≈ 1.3×10¹² operations. At 1 GHz (10⁹ ops/s), it would take ~1300 seconds ≈ 22 minutes.",
    explanation: "15! is feasible, but 20! is not.",
    hint: "Calculate.",
    level: "intermediate",
    codeExample: "// 15! ≈ 1.3e12"
  },
  {
    question: "What is the time complexity of the brute-force n-queens?",
    shortAnswer: "O(n!) in the worst case.",
    explanation: "The backtracking algorithm can explore all placements in the worst case.",
    hint: "Worst-case.",
    level: "advanced",
    codeExample: "// O(n!)"
  },
  {
    question: "What is the time complexity of the traveling salesman with branch and bound?",
    shortAnswer: "Usually much less than O(n!) in practice, but worst-case is O(n!).",
    explanation: "Branch and bound prunes many branches, but worst-case is still factorial.",
    hint: "Pruning.",
    level: "advanced",
    codeExample: "// Branch and bound"
  }
];

export default questions;