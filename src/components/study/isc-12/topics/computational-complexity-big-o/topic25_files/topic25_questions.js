const questions = [
  {
    question: "What does O(2ⁿ) mean in time complexity?",
    shortAnswer: "Exponential time — the runtime doubles with each additional input element.",
    explanation: "Each new element doubles the work. For n=20, 2²⁰ ≈ 1 million operations.",
    hint: "Think of branching recursion where each call makes two calls.",
    level: "basic",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What is an example of an O(2ⁿ) algorithm?",
    shortAnswer: "Naive Fibonacci, Tower of Hanoi, subset generation.",
    explanation: "These algorithms make multiple recursive calls (usually 2) per function call.",
    hint: "Branching recursion.",
    level: "basic",
    codeExample: "// naive Fibonacci"
  },
  {
    question: "What is the time complexity of naive Fibonacci?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "Each call makes two recursive calls, leading to an exponential number of calls.",
    hint: "T(n) = T(n-1) + T(n-2) + O(1).",
    level: "intermediate",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What is the time complexity of Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "The number of moves is 2ⁿ - 1, which is O(2ⁿ).",
    hint: "T(n) = 2T(n-1) + O(1).",
    level: "intermediate",
    codeExample: "// tower of hanoi"
  },
  {
    question: "What is the number of subsets of a set with n elements?",
    shortAnswer: "2ⁿ subsets.",
    explanation: "Each element is either included or not, giving 2 choices per element.",
    hint: "Power set.",
    level: "basic",
    codeExample: "// 2^n subsets"
  },
  {
    question: "Why is O(2ⁿ) considered intractable for large n?",
    shortAnswer: "Because 2ⁿ grows astronomically fast — for n=50, 2⁵⁰ ≈ 10¹⁵, which is impossible.",
    explanation: "Even for n=30, 2³⁰ ≈ 1 billion operations — too slow for most applications.",
    hint: "Exponential explosion.",
    level: "basic",
    codeExample: "// 2^30 ≈ 1,073,741,824"
  },
  {
    question: "How does O(2ⁿ) compare to O(n²)?",
    shortAnswer: "O(2ⁿ) is much worse than O(n²) for large n.",
    explanation: "For n=20, n²=400, 2ⁿ=1,048,576. The difference is huge.",
    hint: "Exponential vs quadratic.",
    level: "intermediate",
    codeExample: "// 2^n >> n^2 for large n"
  },
  {
    question: "Can O(2ⁿ) be optimized to O(n) using DP?",
    shortAnswer: "Yes, many exponential problems can be optimized with dynamic programming.",
    explanation: "Naive Fibonacci (O(2ⁿ)) can be optimized to O(n) with memoization.",
    hint: "Memoization.",
    level: "intermediate",
    codeExample: "// DP Fibonacci O(n)"
  },
  {
    question: "What is the recurrence for naive Fibonacci?",
    shortAnswer: "T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1).",
    explanation: "Each call makes two calls, leading to exponential growth.",
    hint: "Two branches.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + T(n-2) + 1"
  },
  {
    question: "What is the recurrence for Tower of Hanoi?",
    shortAnswer: "T(n) = 2T(n-1) + O(1), T(1)=O(1).",
    explanation: "Each call makes two calls on n-1, plus a constant move.",
    hint: "Two branches.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n-1) + 1"
  },
  {
    question: "How many moves are required for Tower of Hanoi with n disks?",
    shortAnswer: "2ⁿ - 1 moves.",
    explanation: "This is the minimum number of moves required to solve the puzzle.",
    hint: "Exponential.",
    level: "basic",
    codeExample: "// moves = 2^n - 1"
  },
  {
    question: "What is the time complexity of generating all subsets of a set?",
    shortAnswer: "O(2ⁿ) — because there are 2ⁿ subsets to generate.",
    explanation: "Generating each subset takes O(n) time, so total is O(n·2ⁿ).",
    hint: "Power set.",
    level: "intermediate",
    codeExample: "// generating all subsets"
  },
  {
    question: "Can O(2ⁿ) algorithms be practical for n=10?",
    shortAnswer: "Yes, for n=10, 2¹⁰ = 1024 — very fast.",
    explanation: "Exponential algorithms are practical for n ≤ 20.",
    hint: "Small n.",
    level: "basic",
    codeExample: "// 2^10 = 1024"
  },
  {
    question: "Can O(2ⁿ) algorithms be practical for n=50?",
    shortAnswer: "No, 2⁵⁰ ≈ 1.1 × 10¹⁵ — impossible for any computer.",
    explanation: "At 1 billion operations per second, it would take over 12 days for n=50? Actually 10^15 / 10^9 = 10^6 seconds ≈ 11.5 days.",
    hint: "Impossible.",
    level: "intermediate",
    codeExample: "// Not feasible"
  },
  {
    question: "What is the space complexity of naive Fibonacci?",
    shortAnswer: "O(n) — due to recursion stack depth.",
    explanation: "Although time is exponential, space is linear due to the recursion depth.",
    hint: "Recursion stack.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the space complexity of Tower of Hanoi?",
    shortAnswer: "O(n) — due to recursion stack depth.",
    explanation: "The recursion depth is n, so space is O(n).",
    hint: "Recursion depth.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "Can O(2ⁿ) be reduced to O(n) with memoization?",
    shortAnswer: "Yes, for problems with overlapping subproblems like Fibonacci.",
    explanation: "Memoization stores computed values, reducing the time to O(n).",
    hint: "Overlapping subproblems.",
    level: "intermediate",
    codeExample: "// DP with memoization"
  },
  {
    question: "What is the difference between O(2ⁿ) and O(n!)?",
    shortAnswer: "O(n!) grows even faster than O(2ⁿ). n! is the worst of the common classes.",
    explanation: "For n=10, 2¹⁰=1024, 10!≈3.6×10⁶. n! is much worse.",
    hint: "Factorial growth.",
    level: "advanced",
    codeExample: "// O(n!) > O(2ⁿ)"
  },
  {
    question: "What is the time complexity of the traveling salesman problem (brute force)?",
    shortAnswer: "O(n!) — factorial time.",
    explanation: "There are n! possible routes to check.",
    hint: "Permutations.",
    level: "advanced",
    codeExample: "// TSP brute force O(n!)"
  },
  {
    question: "What is the time complexity of the knapsack problem (brute force)?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "There are 2ⁿ subsets of items to check.",
    hint: "Subset sum.",
    level: "advanced",
    codeExample: "// knapsack brute force O(2ⁿ)"
  },
  {
    question: "How does pruning help exponential algorithms?",
    shortAnswer: "Pruning removes branches that cannot lead to a solution, reducing the search space.",
    explanation: "This can significantly reduce the number of recursive calls in practice.",
    hint: "Branch and bound.",
    level: "advanced",
    codeExample: "// alpha-beta pruning"
  },
  {
    question: "What is the time complexity of finding all paths in a graph?",
    shortAnswer: "O(2ⁿ) in worst case (exponential).",
    explanation: "The number of paths between two nodes can be exponential in the number of nodes.",
    hint: "All paths.",
    level: "advanced",
    codeExample: "// All paths DFS"
  },
  {
    question: "Can exponential algorithms be used for machine learning?",
    shortAnswer: "No, machine learning uses polynomial time algorithms (O(n³) or less).",
    explanation: "Exponential algorithms are too slow for the large datasets used in ML.",
    hint: "Too slow.",
    level: "intermediate",
    codeExample: "// Not used"
  },
  {
    question: "What is the time complexity of the n-queens problem (backtracking)?",
    shortAnswer: "O(n!) — factorial time in the worst case.",
    explanation: "The number of possible placements is n! in the worst case.",
    hint: "Permutations.",
    level: "advanced",
    codeExample: "// n-queens O(n!)"
  },
  {
    question: "What is the time complexity of the permutation generation?",
    shortAnswer: "O(n!) — factorial time.",
    explanation: "There are n! permutations of n elements.",
    hint: "n! permutations.",
    level: "advanced",
    codeExample: "// all permutations O(n!)"
  },
  {
    question: "Can exponential algorithms be parallelized to handle larger n?",
    shortAnswer: "Yes, but only to a limited extent. Parallelization gives a constant factor speedup, not exponential.",
    explanation: "If you have 1000 processors, you can handle n about 10 larger (2¹⁰ = 1024).",
    hint: "Limited improvement.",
    level: "advanced",
    codeExample: "// Parallelization helps a bit"
  },
  {
    question: "What is the time complexity of the Boolean satisfiability problem (SAT)?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "There are 2ⁿ possible assignments to n variables.",
    hint: "Exponential.",
    level: "advanced",
    codeExample: "// SAT O(2ⁿ)"
  },
  {
    question: "Can O(2ⁿ) be faster than O(n²) for small n?",
    shortAnswer: "Yes, for very small n, 2ⁿ can be less than n².",
    explanation: "For n=2, 2²=4, n²=4 (equal). For n=3, 8 > 9? Actually 8 < 9.",
    hint: "Small n.",
    level: "intermediate",
    codeExample: "// Depends on n"
  },
  {
    question: "What is the time complexity of the subset sum problem (brute force)?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "There are 2ⁿ subsets to check.",
    hint: "Subsets.",
    level: "advanced",
    codeExample: "// subset sum O(2ⁿ)"
  },
  {
    question: "How can you tell if an algorithm is O(2ⁿ)?",
    shortAnswer: "Look for recursion that branches into multiple calls (usually 2) and has overlapping subproblems.",
    explanation: "If each call makes multiple recursive calls on smaller input, it's likely exponential.",
    hint: "Branching recursion.",
    level: "intermediate",
    codeExample: "// multiple recursive calls"
  },
  {
    question: "What is the time complexity of the graph coloring problem (brute force)?",
    shortAnswer: "O(kⁿ) — where k is the number of colors and n is the number of vertices.",
    explanation: "For k=2 (2-coloring), it's O(2ⁿ) — exponential.",
    hint: "kⁿ.",
    level: "advanced",
    codeExample: "// graph coloring"
  }
];

export default questions;