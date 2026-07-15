const questions = [
  {
    question: "What is the recurrence for naive recursive Fibonacci?",
    shortAnswer: "T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "Each call branches into two calls, leading to exponential growth.",
    hint: "Two branches.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + T(n-2) + 1"
  },
  {
    question: "What is the time complexity of naive recursive Fibonacci?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "The recurrence T(n) = T(n-1) + T(n-2) + O(1) solves to O(2ⁿ).",
    hint: "Exponential.",
    level: "basic",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of naive recursive Fibonacci?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n, so O(n) stack space is used.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for memoized Fibonacci?",
    shortAnswer: "T(n) = T(n-1) + O(1) (with memo), T(0)=T(1)=O(1)",
    explanation: "Memoization ensures each value is computed once, making it linear.",
    hint: "One call per value.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1 (with memo)"
  },
  {
    question: "What is the time complexity of memoized Fibonacci?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Each Fibonacci number is computed once and stored.",
    hint: "Linear.",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of memoized Fibonacci?",
    shortAnswer: "O(n) — for the memo array and recursion stack.",
    explanation: "The memo array of size n+1 and recursion depth up to n.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the time complexity of iterative Fibonacci?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The loop runs n-1 iterations.",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of iterative Fibonacci?",
    shortAnswer: "O(1) — constant space.",
    explanation: "It uses only a few variables.",
    hint: "No stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the base case for Fibonacci?",
    shortAnswer: "F(0) = 0, F(1) = 1.",
    explanation: "These are the two initial values that stop the recursion.",
    hint: "Zero and one.",
    level: "basic",
    codeExample: "// if (n <= 1) return n;"
  },
  {
    question: "Why is naive recursive Fibonacci slow?",
    shortAnswer: "Because it recomputes the same values many times (overlapping subproblems).",
    explanation: "F(2) is computed multiple times; the call tree has exponential nodes.",
    hint: "Overlapping subproblems.",
    level: "basic",
    codeExample: "// F(2) computed many times"
  },
  {
    question: "How many recursive calls are made for fib(10)?",
    shortAnswer: "177 calls.",
    explanation: "The number of calls is 2 * fib(11) - 1 = 2*89 - 1 = 177.",
    hint: "177.",
    level: "intermediate",
    codeExample: "// 177 calls"
  },
  {
    question: "How many recursive calls are made for fib(20)?",
    shortAnswer: "21,891 calls.",
    explanation: "The number of calls is 2 * fib(21) - 1 = 2*10946 - 1 = 21,891.",
    hint: "21,891.",
    level: "advanced",
    codeExample: "// 21,891 calls"
  },
  {
    question: "How many recursive calls are made for fib(30)?",
    shortAnswer: "2,692,537 calls.",
    explanation: "The number of calls is 2 * fib(31) - 1 = 2*1346269 - 1 = 2,692,537.",
    hint: "2.69 million.",
    level: "advanced",
    codeExample: "// 2,692,537 calls"
  },
  {
    question: "Why does memoization reduce exponential to linear?",
    shortAnswer: "Because each subproblem is solved once and stored, avoiding recomputation.",
    explanation: "The recursion tree collapses to a single chain of unique calls.",
    hint: "Caching.",
    level: "intermediate",
    codeExample: "// store computed values"
  },
  {
    question: "What is the space complexity of iterative Fibonacci using two variables?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Only two variables (a and b) are needed.",
    hint: "Two variables.",
    level: "basic",
    codeExample: "// long a=0, b=1;"
  },
  {
    question: "What is Binet's formula for Fibonacci?",
    shortAnswer: "F(n) = (φⁿ - ψⁿ) / √5, where φ = (1+√5)/2, ψ = (1-√5)/2.",
    explanation: "This gives an O(1) formula but suffers from floating-point precision.",
    hint: "Closed form.",
    level: "advanced",
    codeExample: "// using Math.pow"
  },
  {
    question: "What is the time complexity of Binet's formula?",
    shortAnswer: "O(1) — constant time.",
    explanation: "It uses a fixed number of operations.",
    hint: "Constant.",
    level: "advanced",
    codeExample: "// O(1)"
  },
  {
    question: "What is the time complexity of fast doubling Fibonacci?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "It uses recursion that halves the exponent each step.",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of fast doubling?",
    shortAnswer: "O(log n) for recursion stack, or O(1) iterative.",
    explanation: "The recursion depth is O(log n).",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n) space"
  },
  {
    question: "Can recursive Fibonacci cause a stack overflow?",
    shortAnswer: "Yes, for large n (e.g., n > 10,000), the recursion depth n can exceed the stack limit.",
    explanation: "The depth is n, which can be large.",
    hint: "Depth = n.",
    level: "intermediate",
    codeExample: "// StackOverflowError for large n"
  },
  {
    question: "What is the time complexity of the iterative DP approach?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The loop runs from 2 to n.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of the iterative DP approach?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Only a few variables are used.",
    hint: "O(1).",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the value of F(10)?",
    shortAnswer: "55.",
    explanation: "The Fibonacci sequence: 0,1,1,2,3,5,8,13,21,34,55.",
    hint: "55.",
    level: "basic",
    codeExample: "// F(10) = 55"
  },
  {
    question: "What is the value of F(20)?",
    shortAnswer: "6765.",
    explanation: "F(20) = 6765.",
    hint: "6765.",
    level: "basic",
    codeExample: "// F(20) = 6765"
  },
  {
    question: "What is the value of F(30)?",
    shortAnswer: "832040.",
    explanation: "F(30) = 832040.",
    hint: "832040.",
    level: "basic",
    codeExample: "// F(30) = 832040"
  },
  {
    question: "What is the value of F(40)?",
    shortAnswer: "102334155.",
    explanation: "F(40) = 102334155.",
    hint: "102334155.",
    level: "basic",
    codeExample: "// F(40) = 102334155"
  },
  {
    question: "How many calls for fib(40) in naive recursion?",
    shortAnswer: "About 1.6 × 10⁸ calls.",
    explanation: "2 * fib(41) - 1 ≈ 2 * 165580141 - 1 = 331,160,281? Actually fib(41) = 165580141, so calls ≈ 331,160,281.",
    hint: "≈ 331 million.",
    level: "advanced",
    codeExample: "// ~331 million calls"
  },
  {
    question: "Can we compute Fibonacci in O(log n) time?",
    shortAnswer: "Yes, using fast doubling or matrix exponentiation.",
    explanation: "Fast doubling halves the exponent each step.",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// fast doubling"
  },
  {
    question: "What is the space complexity of fast doubling?",
    shortAnswer: "O(log n) for recursion, or O(1) iterative.",
    explanation: "The recursion depth is O(log n).",
    hint: "O(log n).",
    level: "advanced",
    codeExample: "// O(log n) space"
  },
  {
    question: "Why do we study naive Fibonacci despite its inefficiency?",
    shortAnswer: "Because it's the classic example of exponential time and overlapping subproblems.",
    explanation: "It illustrates the need for dynamic programming and memoization.",
    hint: "Educational value.",
    level: "basic",
    codeExample: "// learning tool"
  },
  {
    question: "What is the ratio of calls to 2^n for large n in naive Fibonacci?",
    shortAnswer: "Approaches 1 (actually about 1.618^n / √5).",
    explanation: "The number of calls is about φ^(n+1)/√5, which is O(2^n).",
    hint: "Exponential.",
    level: "advanced",
    codeExample: "// φ^n / √5"
  }
];

export default questions;