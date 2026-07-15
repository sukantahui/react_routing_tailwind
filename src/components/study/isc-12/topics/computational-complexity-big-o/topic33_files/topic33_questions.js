const questions = [
  {
    question: "What is the recursion tree method?",
    shortAnswer: "A visual approach to solving recurrence relations by drawing a tree of recursive calls.",
    explanation: "Each node represents a subproblem, and the total work is the sum of work at all levels.",
    hint: "Think of a tree of calls.",
    level: "basic",
    codeExample: "// Draw tree, sum work per level"
  },
  {
    question: "How do you find the work at each level of a recursion tree?",
    shortAnswer: "Multiply the number of nodes at that level by the work per node.",
    explanation: "For level k, there are aᵏ nodes, each doing f(n/bᵏ) work.",
    hint: "Count nodes × work per node.",
    level: "intermediate",
    codeExample: "// Work at level k = aᵏ · f(n/bᵏ)"
  },
  {
    question: "How do you find the total work from a recursion tree?",
    shortAnswer: "Sum the work at each level from root to leaves.",
    explanation: "T(n) = Σ_{k=0}^{log_b n} aᵏ · f(n/bᵏ).",
    hint: "Sum across all levels.",
    level: "intermediate",
    codeExample: "// Total = sum of work at all levels"
  },
  {
    question: "What is the height of a recursion tree for T(n) = T(n/2) + O(1)?",
    shortAnswer: "log₂(n) — logarithmic height.",
    explanation: "The tree divides by 2 each level, so height = log₂(n).",
    hint: "Divide by 2 each level.",
    level: "basic",
    codeExample: "// Height = log₂(n)"
  },
  {
    question: "What is the height of a recursion tree for T(n) = T(n-1) + O(1)?",
    shortAnswer: "n — linear height.",
    explanation: "The tree decreases by 1 each level, so height = n.",
    hint: "Decrease by 1.",
    level: "basic",
    codeExample: "// Height = n"
  },
  {
    question: "For T(n) = 2T(n/2) + n, how much work is done at each level?",
    shortAnswer: "n work at each level.",
    explanation: "Level 0: n. Level 1: 2·(n/2) = n. Level 2: 4·(n/4) = n.",
    hint: "Each level does n work.",
    level: "intermediate",
    codeExample: "// n at every level"
  },
  {
    question: "What is the solution to T(n) = 2T(n/2) + n using the recursion tree?",
    shortAnswer: "O(n log n).",
    explanation: "Each of the log₂(n) levels does n work, total = n log₂(n).",
    hint: "n work × log n levels.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "For T(n) = T(n/2) + O(1), how much work is done at each level?",
    shortAnswer: "O(1) at each level (constant).",
    explanation: "Each level does constant work, and there are log₂(n) levels.",
    hint: "Constant work per level.",
    level: "intermediate",
    codeExample: "// O(1) per level"
  },
  {
    question: "What is the solution to T(n) = T(n/2) + O(1) using the recursion tree?",
    shortAnswer: "O(log n).",
    explanation: "Constant work per level × log₂(n) levels = O(log n).",
    hint: "log n levels × constant.",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "For T(n) = 2T(n/2) + O(1), how much work is done at each level?",
    shortAnswer: "O(1), but the number of nodes doubles each level.",
    explanation: "Total work at level k = 2ᵏ · O(1) = O(2ᵏ). This grows geometrically.",
    hint: "Doubling nodes each level.",
    level: "advanced",
    codeExample: "// Work at level k = 2ᵏ"
  },
  {
    question: "What is the solution to T(n) = 2T(n/2) + O(1) using the recursion tree?",
    shortAnswer: "O(n).",
    explanation: "The geometric series sums to O(n) because 2ᵏ sums to n.",
    hint: "Geometric series sums to O(n).",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "For T(n) = 3T(n/3) + n, how much work is done at each level?",
    shortAnswer: "n at each level.",
    explanation: "Level 0: n. Level 1: 3·(n/3) = n. Level 2: 9·(n/9) = n.",
    hint: "n per level.",
    level: "intermediate",
    codeExample: "// n per level"
  },
  {
    question: "What is the solution to T(n) = 3T(n/3) + n using the recursion tree?",
    shortAnswer: "O(n log n).",
    explanation: "Each of the log₃(n) levels does n work.",
    hint: "n × log₃ n.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "For T(n) = 2T(n/3) + n, how does work accumulate in the tree?",
    shortAnswer: "Root does n, next level does 2n/3, next does 4n/9, decreasing geometrically.",
    explanation: "The work decreases geometrically, so it's dominated by the root: O(n).",
    hint: "Geometric series sum.",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the solution to T(n) = 2T(n/3) + n using the recursion tree?",
    shortAnswer: "O(n).",
    explanation: "The work decreases geometrically, so total is O(n).",
    hint: "Root dominates.",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "How do you handle overlapping subproblems in a recursion tree?",
    shortAnswer: "Naive recursion trees show overlapping subproblems; memoization eliminates them.",
    explanation: "For Fibonacci, the tree has overlapping subproblems that are recomputed.",
    hint: "Memoization avoids recomputation.",
    level: "intermediate",
    codeExample: "// Overlapping in Fibonacci"
  },
  {
    question: "What does a recursion tree for Fibonacci look like?",
    shortAnswer: "A binary tree with exponential growth and overlapping subproblems.",
    explanation: "Two children for each node (n-1 and n-2), many repeated subproblems.",
    hint: "Exponential branching.",
    level: "intermediate",
    codeExample: "// fib(n) calls fib(n-1) and fib(n-2)"
  },
  {
    question: "How many nodes are in the recursion tree for Fibonacci?",
    shortAnswer: "O(2ⁿ) nodes.",
    explanation: "The number of recursive calls is exponential.",
    hint: "Exponential growth.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the recursion tree for factorial?",
    shortAnswer: "A linear chain of n nodes.",
    explanation: "Each call makes one recursive call on n-1, so it's a simple chain.",
    hint: "Linear chain.",
    level: "basic",
    codeExample: "// Chain: n → n-1 → n-2 → ... → 1"
  },
  {
    question: "How does the recursion tree help in analyzing recurrence relations?",
    shortAnswer: "It provides a visual way to sum work across all recursive calls.",
    explanation: "By drawing the tree, you can see the pattern of work per level and total.",
    hint: "Visual summation.",
    level: "intermediate",
    codeExample: "// Draw to find pattern"
  },
  {
    question: "What is the relationship between the recursion tree and the Master Theorem?",
    shortAnswer: "They give the same results; the Master Theorem is a formula derived from the recursion tree.",
    explanation: "The recursion tree method is the foundation of the Master Theorem.",
    hint: "Master Theorem generalizes the tree method.",
    level: "advanced",
    codeExample: "// Master Theorem = shortcut for tree method"
  },
  {
    question: "When should you use the recursion tree method instead of the Master Theorem?",
    shortAnswer: "When the recurrence does not fit the Master Theorem form, or when you need intuition.",
    explanation: "Recursion trees work for any recurrence, not just divide-and-conquer.",
    hint: "More general but more work.",
    level: "advanced",
    codeExample: "// Works for T(n) = T(n-1) + ... too"
  },
  {
    question: "What is the recursion tree for T(n) = T(n-1) + O(n)?",
    shortAnswer: "A chain of n nodes, where level k has work n-k.",
    explanation: "Work decreases linearly from n at root to 1 at leaves.",
    hint: "Chain with decreasing work.",
    level: "advanced",
    codeExample: "// Work: n + (n-1) + ... + 1 = O(n²)"
  },
  {
    question: "What is the solution to T(n) = T(n-1) + O(n) using the recursion tree?",
    shortAnswer: "O(n²).",
    explanation: "Sum of n + (n-1) + ... + 1 = n(n+1)/2 = O(n²).",
    hint: "Sum of arithmetic series.",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the recursion tree for T(n) = 2T(n-1) + O(1)?",
    shortAnswer: "A tree where each level doubles the number of nodes, height = n.",
    explanation: "Root has 1 node, level 1 has 2, level 2 has 4, up to 2ⁿ leaves.",
    hint: "Doubling each level.",
    level: "advanced",
    codeExample: "// Exponential growth"
  },
  {
    question: "What is the solution to T(n) = 2T(n-1) + O(1) using the recursion tree?",
    shortAnswer: "O(2ⁿ).",
    explanation: "The geometric series sums to O(2ⁿ).",
    hint: "Exponential.",
    level: "advanced",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "How do you identify the pattern in a recursion tree?",
    shortAnswer: "Look at the work at the first few levels and see if it stays constant, grows, or shrinks.",
    explanation: "If work per level is constant, total is height × constant. If it grows geometrically, the last level dominates.",
    hint: "Observe the pattern.",
    level: "intermediate",
    codeExample: "// Check work at levels 0, 1, 2"
  },
  {
    question: "What is the recursion tree for T(n) = 4T(n/2) + n?",
    shortAnswer: "Tree with 4 branches at each level, each of size n/2, height = log₂(n).",
    explanation: "Work per level: level 0: n, level 1: 4·(n/2)=2n, level 2: 16·(n/4)=4n, increasing geometrically.",
    hint: "Work grows geometrically.",
    level: "advanced",
    codeExample: "// Work grows as n·2ᵏ"
  },
  {
    question: "What is the solution to T(n) = 4T(n/2) + n using the recursion tree?",
    shortAnswer: "O(n²).",
    explanation: "The work is dominated by the last level, which has n² work (4^log₂n = n²).",
    hint: "Last level dominates.",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the recursion tree for T(n) = T(n-1) + 1?",
    shortAnswer: "A linear chain with 1 work at each level.",
    explanation: "Each level does constant work, height = n.",
    hint: "Chain of n nodes.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the recursion tree for T(n) = 3T(n/3) + O(1)?",
    shortAnswer: "A 3-ary tree with constant work per node.",
    explanation: "Work per level grows as 3ᵏ, dominated by leaves.",
    hint: "Geometric growth.",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the recursion tree for T(n) = T(n/2) + n?",
    shortAnswer: "A chain (only one branch) where work decreases geometrically.",
    explanation: "Root does n, next does n/2, next n/4, etc. Total = O(n).",
    hint: "Geometric series.",
    level: "advanced",
    codeExample: "// O(n)"
  }
];

export default questions;