const questions = [
  {
    question: "What is binary recursion?",
    shortAnswer: "A recursive function that makes two recursive calls per invocation.",
    explanation: "The calls form a binary tree structure.",
    hint: "Two calls per level.",
    level: "basic",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What are the two types of binary recursion?",
    shortAnswer: "Overlapping subproblems (exponential) and non-overlapping subproblems (linear).",
    explanation: "Fibonacci has overlapping subproblems (O(2ⁿ)); tree traversal has non-overlapping (O(n)).",
    hint: "Overlapping vs non-overlapping.",
    level: "intermediate",
    codeExample: "// Fibonacci: overlapping, Tree traversal: non-overlapping"
  },
  {
    question: "What is the recurrence for binary recursion with overlapping subproblems?",
    shortAnswer: "T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "This is the Fibonacci recurrence.",
    hint: "T(n) = T(n-1) + T(n-2) + 1.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + T(n-2) + 1"
  },
  {
    question: "What is the time complexity of binary recursion with overlapping subproblems?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "The recurrence T(n) = T(n-1) + T(n-2) + O(1) solves to O(2ⁿ).",
    hint: "Exponential.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the recurrence for binary recursion without overlapping subproblems?",
    shortAnswer: "T(n) = 2T(n/2) + O(1), T(1) = O(1)",
    explanation: "This is the tree traversal recurrence.",
    hint: "2T(n/2) + 1.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n/2) + 1"
  },
  {
    question: "What is the time complexity of binary recursion without overlapping subproblems?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = 2T(n/2) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of binary recursion?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n in the worst case.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is an example of binary recursion with overlapping subproblems?",
    shortAnswer: "Naive Fibonacci.",
    explanation: "Fib(n) calls fib(n-1) and fib(n-2), repeating the same subproblems.",
    hint: "Fibonacci.",
    level: "basic",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What is an example of binary recursion without overlapping subproblems?",
    shortAnswer: "Tree traversal (inorder, preorder, postorder).",
    explanation: "Each node is visited once; no subproblem is repeated.",
    hint: "Tree traversal.",
    level: "basic",
    codeExample: "// inorder(node) = inorder(left) + visit(node) + inorder(right)"
  },
  {
    question: "How does memoization help binary recursion?",
    shortAnswer: "It reduces overlapping subproblems from exponential to linear.",
    explanation: "Memoization stores computed values, so each subproblem is solved once.",
    hint: "Caching.",
    level: "intermediate",
    codeExample: "// memo[n] = fib(n)"
  },
  {
    question: "What is the time complexity of memoized Fibonacci?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each value is computed once and stored.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of memoized Fibonacci?",
    shortAnswer: "O(n) — for the memo array and recursion stack.",
    explanation: "The memo array is O(n), and recursion stack is O(n).",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "How many recursive calls are made for fib(n) in naive recursion?",
    shortAnswer: "2ⁿ - 1 calls (approximately).",
    explanation: "The number of calls is exponential.",
    hint: "2ⁿ - 1.",
    level: "advanced",
    codeExample: "// ~2ⁿ calls"
  },
  {
    question: "How many recursive calls are made for fib(10) in naive recursion?",
    shortAnswer: "177 calls.",
    explanation: "The number of calls is 2 * fib(11) - 1 = 2*89 - 1 = 177.",
    hint: "177.",
    level: "intermediate",
    codeExample: "// 177 calls"
  },
  {
    question: "How many recursive calls are made for fib(20) in naive recursion?",
    shortAnswer: "21,891 calls.",
    explanation: "2 * fib(21) - 1 = 2*10946 - 1 = 21,891.",
    hint: "21,891.",
    level: "advanced",
    codeExample: "// 21,891 calls"
  },
  {
    question: "What is the recurrence for Tower of Hanoi?",
    shortAnswer: "T(n) = 2T(n-1) + O(1), T(1) = O(1)",
    explanation: "Each call makes two calls on n-1 and does one move.",
    hint: "2T(n-1) + 1.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n-1) + 1"
  },
  {
    question: "What is the time complexity of Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "T(n) = 2T(n-1) + O(1) solves to O(2ⁿ).",
    hint: "Exponential.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of Tower of Hanoi?",
    shortAnswer: "O(n) — recursion stack depth = n.",
    explanation: "The depth is n, so space is O(n).",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "How many moves are there in Tower of Hanoi with n disks?",
    shortAnswer: "2ⁿ - 1 moves.",
    explanation: "The number of moves is exactly 2ⁿ - 1.",
    hint: "2ⁿ - 1.",
    level: "basic",
    codeExample: "// moves = 2^n - 1"
  },
  {
    question: "What is the recurrence for binary search (recursive)?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(1) = O(1)",
    explanation: "Binary search makes one call on half the input, not two.",
    hint: "T(n/2) + 1.",
    level: "basic",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "Is binary search a binary recursion?",
    shortAnswer: "No, it makes only one recursive call — it's linear recursion.",
    explanation: "Binary search has one branch, not two.",
    hint: "One call.",
    level: "intermediate",
    codeExample: "// one call per level"
  },
  {
    question: "What is the difference between binary recursion and linear recursion?",
    shortAnswer: "Binary has two calls per level; linear has one call per level.",
    explanation: "Binary forms a tree; linear forms a chain.",
    hint: "Two vs one call.",
    level: "basic",
    codeExample: "// binary: 2 calls, linear: 1 call"
  },
  {
    question: "What is the time complexity of binary recursion with two calls on n/2?",
    shortAnswer: "O(n) — if work per call is constant.",
    explanation: "T(n) = 2T(n/2) + O(1) solves to O(n).",
    hint: "O(n).",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + 1 → O(n)"
  },
  {
    question: "What is the time complexity of binary recursion with two calls on n/2 and O(n) work?",
    shortAnswer: "O(n log n) — like merge sort.",
    explanation: "T(n) = 2T(n/2) + O(n) solves to O(n log n).",
    hint: "O(n log n).",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + n → O(n log n)"
  },
  {
    question: "What is the recurrence for binary recursion with reduction by 2?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), T(1) = O(1)",
    explanation: "This is the merge sort recurrence.",
    hint: "2T(n/2) + n.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the time complexity of merge sort?",
    shortAnswer: "O(n log n) — linearithmic time.",
    explanation: "T(n) = 2T(n/2) + O(n) solves to O(n log n).",
    hint: "O(n log n).",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the space complexity of merge sort?",
    shortAnswer: "O(n) — for the auxiliary array.",
    explanation: "Merge sort uses O(n) extra space for merging.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for binary recursion with two calls on n-1 and O(1) work?",
    shortAnswer: "T(n) = 2T(n-1) + O(1), T(1) = O(1) → O(2ⁿ).",
    explanation: "This is the Tower of Hanoi recurrence.",
    hint: "O(2ⁿ).",
    level: "advanced",
    codeExample: "// T(n) = 2T(n-1) + 1 → O(2ⁿ)"
  },
  {
    question: "What is the recurrence for binary recursion with two calls on n-1 and O(n) work?",
    shortAnswer: "T(n) = 2T(n-1) + O(n), T(1) = O(1) → O(n·2ⁿ).",
    explanation: "If each call does O(n) work, the total is O(n·2ⁿ).",
    hint: "O(n·2ⁿ).",
    level: "advanced",
    codeExample: "// T(n) = 2T(n-1) + n → O(n·2ⁿ)"
  },
  {
    question: "What is the space complexity of binary recursion with two calls on n-1?",
    shortAnswer: "O(n) — recursion stack depth = n.",
    explanation: "The depth is n, so space is O(n).",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "When should you avoid binary recursion?",
    shortAnswer: "When it has overlapping subproblems and n is large.",
    explanation: "Use memoization, DP, or iteration instead.",
    hint: "Overlapping subproblems.",
    level: "intermediate",
    codeExample: "// Use DP for large n"
  },
  {
    question: "When is binary recursion appropriate?",
    shortAnswer: "When subproblems are independent and don't overlap (e.g., tree traversal).",
    explanation: "Non-overlapping subproblems give O(n) time.",
    hint: "Independent subproblems.",
    level: "intermediate",
    codeExample: "// tree traversal"
  }
];

export default questions;