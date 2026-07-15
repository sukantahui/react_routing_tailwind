const questions = [
  {
    question: "What is the recurrence for Tower of Hanoi?",
    shortAnswer: "T(n) = 2T(n-1) + O(1), T(1) = O(1)",
    explanation: "Each call makes two recursive calls on n-1 and does one move.",
    hint: "Two calls on n-1.",
    level: "basic",
    codeExample: "// T(n) = 2T(n-1) + 1"
  },
  {
    question: "What is the time complexity of Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "T(n) = 2T(n-1) + O(1) solves to O(2ⁿ).",
    hint: "Exponential.",
    level: "basic",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of Tower of Hanoi?",
    shortAnswer: "O(n) — linear (recursion stack depth = n).",
    explanation: "The recursion depth is n, so O(n) stack space is used.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the number of moves for n disks in Tower of Hanoi?",
    shortAnswer: "2ⁿ - 1 moves.",
    explanation: "The recurrence T(n) = 2T(n-1) + 1 with T(1)=1 gives T(n) = 2ⁿ - 1.",
    hint: "2ⁿ - 1.",
    level: "basic",
    codeExample: "// moves = 2^n - 1"
  },
  {
    question: "What is the base case for Tower of Hanoi?",
    shortAnswer: "When n = 1, move the single disk directly.",
    explanation: "The smallest problem is moving one disk from source to target.",
    hint: "n == 1.",
    level: "basic",
    codeExample: "// if (n == 1) move disk from source to target;"
  },
  {
    question: "How many moves for n=3 in Tower of Hanoi?",
    shortAnswer: "7 moves (2³ - 1).",
    explanation: "3 disks require 7 moves.",
    hint: "7.",
    level: "basic",
    codeExample: "// 7 moves"
  },
  {
    question: "How many moves for n=4 in Tower of Hanoi?",
    shortAnswer: "15 moves (2⁴ - 1).",
    explanation: "4 disks require 15 moves.",
    hint: "15.",
    level: "basic",
    codeExample: "// 15 moves"
  },
  {
    question: "How many moves for n=5 in Tower of Hanoi?",
    shortAnswer: "31 moves (2⁵ - 1).",
    explanation: "5 disks require 31 moves.",
    hint: "31.",
    level: "basic",
    codeExample: "// 31 moves"
  },
  {
    question: "How many moves for n=10 in Tower of Hanoi?",
    shortAnswer: "1023 moves (2¹⁰ - 1).",
    explanation: "10 disks require 1023 moves.",
    hint: "1023.",
    level: "basic",
    codeExample: "// 1023 moves"
  },
  {
    question: "Why is Tower of Hanoi considered exponential time?",
    shortAnswer: "Because the number of moves doubles with each additional disk.",
    explanation: "T(n) = 2T(n-1) + 1 gives exponential growth.",
    hint: "Doubling each level.",
    level: "basic",
    codeExample: "// T(n) = 2^n - 1"
  },
  {
    question: "Can Tower of Hanoi be solved in polynomial time?",
    shortAnswer: "No, because the output size (number of moves) is 2ⁿ - 1, so the algorithm must output exponentially many moves.",
    explanation: "The number of moves is inherently exponential, so any algorithm takes exponential time.",
    hint: "Output size.",
    level: "intermediate",
    codeExample: "// impossible to be polynomial"
  },
  {
    question: "What is the recurrence for the number of moves?",
    shortAnswer: "M(n) = 2M(n-1) + 1, M(1) = 1 → M(n) = 2ⁿ - 1.",
    explanation: "This is the same recurrence as the time complexity.",
    hint: "M(n) = 2M(n-1) + 1.",
    level: "intermediate",
    codeExample: "// M(n) = 2M(n-1) + 1"
  },
  {
    question: "What is the recursion depth for Tower of Hanoi with n disks?",
    shortAnswer: "n.",
    explanation: "The recursion depth is n because each call reduces n by 1.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// depth = n"
  },
  {
    question: "Why is the space complexity O(n) and not O(2ⁿ)?",
    shortAnswer: "Because only one path is explored at a time; the stack depth is n, not the total number of calls.",
    explanation: "Although there are 2ⁿ calls, they are not all on the stack simultaneously.",
    hint: "Stack depth.",
    level: "intermediate",
    codeExample: "// O(n) stack space"
  },
  {
    question: "Can Tower of Hanoi be solved iteratively?",
    shortAnswer: "Yes, using an explicit stack to simulate recursion.",
    explanation: "Iterative solutions exist but are more complex; they still require O(2ⁿ) time.",
    hint: "Explicit stack.",
    level: "intermediate",
    codeExample: "// iterative with stack"
  },
  {
    question: "What is the time complexity of iterative Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — same as recursive, because the number of moves is the same.",
    explanation: "The iterative version still must perform 2ⁿ - 1 moves.",
    hint: "Same.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of iterative Tower of Hanoi?",
    shortAnswer: "O(n) — explicit stack depth is n.",
    explanation: "The explicit stack stores at most n frames.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "Can Tower of Hanoi be solved using dynamic programming?",
    shortAnswer: "Not meaningfully, because there are no overlapping subproblems to cache.",
    explanation: "Each subproblem is unique; there's no reuse of smaller subproblems.",
    hint: "No overlap.",
    level: "advanced",
    codeExample: "// DP not helpful"
  },
  {
    question: "What is the minimum number of moves for Tower of Hanoi?",
    shortAnswer: "2ⁿ - 1 moves (and it's optimal).",
    explanation: "The recursive solution is optimal; no algorithm can do fewer moves.",
    hint: "Optimal.",
    level: "basic",
    codeExample: "// optimal = 2^n - 1"
  },
  {
    question: "Can Tower of Hanoi be parallelized?",
    shortAnswer: "To some extent, but the total work (number of moves) is still exponential.",
    explanation: "Parallelization can reduce wall-clock time but not the total number of operations.",
    hint: "Limited speedup.",
    level: "advanced",
    codeExample: "// parallelization helps but not asymptotically"
  },
  {
    question: "What is the recurrence for Tower of Hanoi with 4 rods?",
    shortAnswer: "More complex; the Frame-Stewart algorithm gives O(2^(n/2))? Actually, it's still exponential but with a smaller base.",
    explanation: "The minimum number of moves for 4 rods is not known exactly for all n.",
    hint: "More complex.",
    level: "advanced",
    codeExample: "// not a simple recurrence"
  },
  {
    question: "What is the time complexity of Tower of Hanoi for n=20?",
    shortAnswer: "O(2²⁰) ≈ 1 million moves.",
    explanation: "2²⁰ - 1 ≈ 1,048,575 moves.",
    hint: "~1 million.",
    level: "basic",
    codeExample: "// ~1 million moves"
  },
  {
    question: "What is the time complexity of Tower of Hanoi for n=30?",
    shortAnswer: "O(2³⁰) ≈ 1 billion moves.",
    explanation: "2³⁰ - 1 ≈ 1,073,741,823 moves.",
    hint: "~1 billion.",
    level: "basic",
    codeExample: "// ~1 billion moves"
  },
  {
    question: "What is the time complexity of Tower of Hanoi for n=40?",
    shortAnswer: "O(2⁴⁰) ≈ 1 trillion moves.",
    explanation: "2⁴⁰ - 1 ≈ 1.099 × 10¹² moves.",
    hint: "~1 trillion.",
    level: "basic",
    codeExample: "// ~1 trillion moves"
  },
  {
    question: "Why is Tower of Hanoi often used to teach recursion?",
    shortAnswer: "Because it has a simple, elegant recursive solution that demonstrates the power and cost of recursion.",
    explanation: "It's a classic example that clearly shows the recursion tree and exponential growth.",
    hint: "Teaching tool.",
    level: "basic",
    codeExample: "// recursion example"
  },
  {
    question: "What is the recurrence for the number of disk moves in Tower of Hanoi?",
    shortAnswer: "M(n) = 2M(n-1) + 1, M(1) = 1.",
    explanation: "To move n disks, you move n-1 disks twice and the largest disk once.",
    hint: "M(n) = 2M(n-1) + 1.",
    level: "intermediate",
    codeExample: "// M(n) = 2M(n-1) + 1"
  },
  {
    question: "What is the total number of recursive calls for Tower of Hanoi?",
    shortAnswer: "2ⁿ - 1 calls (same as moves).",
    explanation: "Each move corresponds to a call (or a base case), so total calls = total moves.",
    hint: "2ⁿ - 1.",
    level: "advanced",
    codeExample: "// 2^n - 1 calls"
  },
  {
    question: "What is the maximum recursion depth for Tower of Hanoi with n disks?",
    shortAnswer: "n.",
    explanation: "The deepest path goes from n down to 1, so depth is n.",
    hint: "n.",
    level: "basic",
    codeExample: "// depth = n"
  },
  {
    question: "Can the Tower of Hanoi be solved without recursion?",
    shortAnswer: "Yes, using iterative algorithms (e.g., the cyclic algorithm for n disks).",
    explanation: "There are well-known iterative patterns (e.g., moving the smallest disk in a fixed direction).",
    hint: "Iterative patterns.",
    level: "advanced",
    codeExample: "// cyclic move pattern"
  },
  {
    question: "What is the time complexity of the cyclic iterative solution?",
    shortAnswer: "O(2ⁿ) — still exponential because the number of moves is the same.",
    explanation: "The iterative algorithm still performs exactly 2ⁿ - 1 moves.",
    hint: "Same.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of the cyclic iterative solution?",
    shortAnswer: "O(n) — if storing the state of the rods, O(1) if not.",
    explanation: "Some iterative solutions use O(1) extra space, but the output still requires O(2ⁿ) moves to be printed.",
    hint: "O(1) or O(n).",
    level: "advanced",
    codeExample: "// O(1) space for state"
  }
];

export default questions;