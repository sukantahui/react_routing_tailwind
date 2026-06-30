const questions = [
  {
    question: "What is multiple recursion?",
    shortAnswer: "A recursive function that makes three or more recursive calls per invocation.",
    explanation: "The calls form a k-ary tree with branching factor a ≥ 3.",
    hint: "Three or more calls.",
    level: "basic",
    codeExample: "// f(n) = f(n-1) + f(n-2) + f(n-3)"
  },
  {
    question: "What is the recurrence for exponential multiple recursion?",
    shortAnswer: "T(n) = a·T(n-1) + O(1), T(0) = O(1), where a ≥ 3.",
    explanation: "Each call makes a calls on n-1, leading to O(aⁿ) time.",
    hint: "T(n) = a·T(n-1) + O(1).",
    level: "intermediate",
    codeExample: "// T(n) = a·T(n-1) + 1"
  },
  {
    question: "What is the time complexity of exponential multiple recursion?",
    shortAnswer: "O(aⁿ) — exponential time.",
    explanation: "The number of calls is aⁿ.",
    hint: "Exponential.",
    level: "intermediate",
    codeExample: "// O(aⁿ)"
  },
  {
    question: "What is the recurrence for linear multiple recursion?",
    shortAnswer: "T(n) = a·T(n/a) + O(1), T(1) = O(1), where a ≥ 3.",
    explanation: "Each call makes a calls on n/a, leading to O(n) time.",
    hint: "T(n) = a·T(n/a) + O(1).",
    level: "intermediate",
    codeExample: "// T(n) = a·T(n/a) + 1"
  },
  {
    question: "What is the time complexity of linear multiple recursion?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence T(n) = a·T(n/a) + O(1) solves to O(n).",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of multiple recursion?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n in the worst case.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is an example of exponential multiple recursion?",
    shortAnswer: "A function that makes 3 calls on n-1, like f(n) = f(n-1)+f(n-2)+f(n-3).",
    explanation: "Each level increases the number of calls by a factor of 3.",
    hint: "3 calls on n-1.",
    level: "intermediate",
    codeExample: "// f(n) = f(n-1) + f(n-2) + f(n-3)"
  },
  {
    question: "What is an example of linear multiple recursion?",
    shortAnswer: "Traversing a 3-ary tree (each node has 3 children).",
    explanation: "Each call makes 3 calls on n/3, giving O(n) time.",
    hint: "3-ary tree.",
    level: "intermediate",
    codeExample: "// traverse 3-ary tree"
  },
  {
    question: "What is the branching factor in multiple recursion?",
    shortAnswer: "The number of recursive calls per invocation (a ≥ 3).",
    explanation: "This determines the growth rate: aⁿ.",
    hint: "Number of calls.",
    level: "basic",
    codeExample: "// a = 3 for 3-way recursion"
  },
  {
    question: "How can pruning help multiple recursion?",
    shortAnswer: "By eliminating invalid branches early, reducing the effective branching factor.",
    explanation: "In backtracking, pruning can significantly reduce the number of recursive calls.",
    hint: "Eliminate invalid branches.",
    level: "intermediate",
    codeExample: "// if (invalid) return;"
  },
  {
    question: "What is the time complexity of the n-queens problem without pruning?",
    shortAnswer: "O(nⁿ) — but with pruning it's O(n!) (still exponential).",
    explanation: "Without pruning, each row has n choices → nⁿ. With pruning, it's n!.",
    hint: "O(nⁿ) vs O(n!).",
    level: "advanced",
    codeExample: "// O(n!) with pruning"
  },
  {
    question: "What is the time complexity of graph coloring with m colors?",
    shortAnswer: "O(mⁿ) — exponential in the number of vertices.",
    explanation: "Each vertex has m choices, so mⁿ possibilities.",
    hint: "O(mⁿ).",
    level: "advanced",
    codeExample: "// O(mⁿ)"
  },
  {
    question: "How does memoization help multiple recursion?",
    shortAnswer: "If subproblems overlap, memoization can reduce exponential time to polynomial.",
    explanation: "Example: if f(n) = f(n-1) + f(n-2) + f(n-3), memoization gives O(n).",
    hint: "Overlapping subproblems.",
    level: "intermediate",
    codeExample: "// memo[n] = f(n)"
  },
  {
    question: "What is the time complexity of memoized 3-way recursion?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each value is computed once.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of memoized 3-way recursion?",
    shortAnswer: "O(n) — for the memo array and recursion stack.",
    explanation: "The memo array is O(n), and recursion stack is O(n).",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for multiple recursion with reduction by a constant?",
    shortAnswer: "T(n) = a·T(n/c) + O(1), T(1) = O(1) → O(n^(log_c a)).",
    explanation: "This is the Master Theorem case for multiple recursion.",
    hint: "Master Theorem.",
    level: "advanced",
    codeExample: "// T(n) = a·T(n/c) + O(1)"
  },
  {
    question: "What is the time complexity of T(n) = 3T(n/2) + O(1)?",
    shortAnswer: "O(n^(log₂3)) ≈ O(n^1.585).",
    explanation: "Master Theorem Case 1: a=3, b=2, log_b a = log₂3 ≈ 1.585.",
    hint: "O(n^1.585).",
    level: "advanced",
    codeExample: "// O(n^1.585)"
  },
  {
    question: "What is the space complexity of T(n) = a·T(n/c) + O(1)?",
    shortAnswer: "O(log n) — recursion stack depth = log_c(n).",
    explanation: "The depth is logarithmic.",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the difference between multiple recursion and binary recursion?",
    shortAnswer: "Multiple has a ≥ 3 calls; binary has exactly 2 calls.",
    explanation: "Multiple recursion has a higher branching factor.",
    hint: "≥3 vs exactly 2.",
    level: "basic",
    codeExample: "// multiple: 3+ calls, binary: 2 calls"
  },
  {
    question: "What is the difference between multiple recursion and linear recursion?",
    shortAnswer: "Multiple has a ≥ 3 calls; linear has exactly 1 call.",
    explanation: "Multiple recursion has a higher branching factor.",
    hint: "≥3 vs exactly 1.",
    level: "basic",
    codeExample: "// multiple: 3+ calls, linear: 1 call"
  },
  {
    question: "How many recursive calls are made for f(n) = 3f(n-1) + 1?",
    shortAnswer: "3ⁿ calls (approximately).",
    explanation: "The number of calls is exponential in n.",
    hint: "3ⁿ.",
    level: "advanced",
    codeExample: "// 3^n calls"
  },
  {
    question: "What is the number of calls for f(5) in 3-way recursion?",
    shortAnswer: "3^5 = 243 calls (approximately).",
    explanation: "The exact number is 3^(n+1)/2 - 1? Actually it's exactly (3^(n+1)-1)/2 for base case? For f(n)=3f(n-1)+1 with f(0)=1, the number of calls is (3^(n+1)-1)/2. For n=5, (3^6-1)/2 = (729-1)/2 = 364.",
    hint: "364.",
    level: "advanced",
    codeExample: "// 364 calls for n=5"
  },
  {
    question: "What is the time complexity of a 3-ary tree traversal?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each node is visited once.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of a 3-ary tree traversal?",
    shortAnswer: "O(log n) for a balanced tree, O(n) for a skewed tree.",
    explanation: "The recursion depth is the height of the tree.",
    hint: "O(log n) balanced.",
    level: "intermediate",
    codeExample: "// O(log n) balanced"
  },
  {
    question: "Can multiple recursion be optimized with dynamic programming?",
    shortAnswer: "Yes, if it has overlapping subproblems and optimal substructure.",
    explanation: "Many multiple recursion problems can be solved with DP.",
    hint: "DP.",
    level: "advanced",
    codeExample: "// DP for multiple recursion"
  },
  {
    question: "What is the time complexity of the Fibonacci-like 3-way recurrence?",
    shortAnswer: "O(3ⁿ) for naive, O(n) with memoization.",
    explanation: "The recurrence f(n) = f(n-1) + f(n-2) + f(n-3) is exponential.",
    hint: "O(3ⁿ).",
    level: "intermediate",
    codeExample: "// O(3ⁿ) naive"
  },
  {
    question: "What is the time complexity of the 3-way merge sort?",
    shortAnswer: "O(n log n) — still linearithmic.",
    explanation: "T(n) = 3T(n/3) + O(n) → O(n log n).",
    hint: "O(n log n).",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the space complexity of 3-way merge sort?",
    shortAnswer: "O(n) — for the auxiliary array.",
    explanation: "Merge sort uses O(n) extra space.",
    hint: "O(n).",
    level: "advanced",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for 3-way merge sort?",
    shortAnswer: "T(n) = 3T(n/3) + O(n), T(1) = O(1).",
    explanation: "Three calls on one-third of the input, plus O(n) work to merge.",
    hint: "3T(n/3) + n.",
    level: "advanced",
    codeExample: "// T(n) = 3T(n/3) + n"
  },
  {
    question: "What is the time complexity of multiple recursion with a=4 and reduction by 2?",
    shortAnswer: "O(n²) — because log₂4 = 2.",
    explanation: "T(n) = 4T(n/2) + O(1) → O(n²).",
    hint: "O(n²).",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the time complexity of multiple recursion with a=8 and reduction by 2?",
    shortAnswer: "O(n³) — because log₂8 = 3.",
    explanation: "T(n) = 8T(n/2) + O(1) → O(n³).",
    hint: "O(n³).",
    level: "advanced",
    codeExample: "// O(n³)"
  },
  {
    question: "What is the space complexity of multiple recursion with a=4 and reduction by 2?",
    shortAnswer: "O(log n) — recursion stack depth = log₂(n).",
    explanation: "The depth is logarithmic.",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n) space"
  }
];

export default questions;