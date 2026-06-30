const questions = [
  {
    question: "What is a recurrence relation?",
    shortAnswer: "An equation that defines the runtime of a recursive function in terms of its subproblems.",
    explanation: "It expresses T(n) in terms of T(smaller input) plus the work done at each step.",
    hint: "It's like a formula for the runtime.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + O(1)"
  },
  {
    question: "What is the recurrence for recursive factorial?",
    shortAnswer: "T(n) = T(n-1) + O(1), T(0) = O(1)",
    explanation: "Each call does constant work and makes one recursive call on n-1.",
    hint: "One call per step.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the time complexity of recursive factorial?",
    shortAnswer: "O(n) — linear time.",
    explanation: "T(n) = T(n-1) + O(1) solves to O(n).",
    hint: "One call per n.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive factorial?",
    shortAnswer: "O(n) — due to the recursion stack.",
    explanation: "The recursion depth is n, so O(n) stack space.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for binary search?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(1) = O(1)",
    explanation: "Each call halves the input and does constant work.",
    hint: "Divide by 2.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the time complexity of recursive binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "T(n) = T(n/2) + O(1) solves to O(log n).",
    hint: "Halving.",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of recursive binary search?",
    shortAnswer: "O(log n) — due to recursion stack depth.",
    explanation: "The recursion depth is log₂(n).",
    hint: "Depth = log n.",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the recurrence for naive Fibonacci?",
    shortAnswer: "T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "Each call makes two recursive calls on n-1 and n-2.",
    hint: "Two calls.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + T(n-2) + 1"
  },
  {
    question: "What is the time complexity of naive Fibonacci?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "The recurrence T(n) = T(n-1) + T(n-2) solves to O(2ⁿ).",
    hint: "Exponential growth.",
    level: "intermediate",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of naive Fibonacci?",
    shortAnswer: "O(n) — due to recursion stack depth.",
    explanation: "The maximum recursion depth is n.",
    hint: "Depth = n.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for merge sort?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), T(1) = O(1)",
    explanation: "Two recursive calls on half the input, plus O(n) work to merge.",
    hint: "Divide and conquer.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the time complexity of merge sort?",
    shortAnswer: "O(n log n) — linearithmic.",
    explanation: "T(n) = 2T(n/2) + O(n) solves to O(n log n).",
    hint: "n log n.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the recurrence for recursive sum of n numbers?",
    shortAnswer: "T(n) = T(n-1) + O(1), T(1) = O(1)",
    explanation: "Same as factorial.",
    hint: "One call per n.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the time complexity of recursive sum?",
    shortAnswer: "O(n) — linear.",
    explanation: "T(n) = T(n-1) + O(1) → O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive sum?",
    shortAnswer: "O(n) — recursion stack.",
    explanation: "Depth is n.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the recurrence for finding the maximum in an array using divide and conquer?",
    shortAnswer: "T(n) = 2T(n/2) + O(1), T(1) = O(1)",
    explanation: "Two calls on halves, constant work to compare.",
    hint: "Divide and conquer.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + 1"
  },
  {
    question: "What is the time complexity of divide-and-conquer max?",
    shortAnswer: "O(n) — because T(n) = 2T(n/2) + O(1) solves to O(n).",
    explanation: "Master Theorem case 1: a=2, b=2, f(n)=O(1) → O(n).",
    hint: "O(n).",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the Master Theorem?",
    shortAnswer: "A formula for solving recurrences of the form T(n) = aT(n/b) + f(n).",
    explanation: "Compares f(n) with n^(log_b a) to determine the complexity.",
    hint: "For divide-and-conquer.",
    level: "advanced",
    codeExample: "// T(n) = aT(n/b) + f(n)"
  },
  {
    question: "What is the recurrence for Tower of Hanoi?",
    shortAnswer: "T(n) = 2T(n-1) + O(1), T(1) = O(1)",
    explanation: "Each call moves n-1 disks twice, plus one move.",
    hint: "Two calls.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n-1) + 1"
  },
  {
    question: "What is the time complexity of Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — exponential.",
    explanation: "T(n) = 2T(n-1) + O(1) solves to O(2ⁿ).",
    hint: "Doubling each level.",
    level: "advanced",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the space complexity of Tower of Hanoi?",
    shortAnswer: "O(n) — recursion stack depth.",
    explanation: "Depth is n.",
    hint: "Depth = n.",
    level: "advanced",
    codeExample: "// O(n) space"
  },
  {
    question: "Can tail recursion reduce space complexity?",
    shortAnswer: "Yes, with tail call optimization, it can reduce O(n) to O(1) in some languages.",
    explanation: "Tail recursion allows the compiler to reuse stack frames.",
    hint: "Optimization.",
    level: "intermediate",
    codeExample: "// tail recursive functions"
  },
  {
    question: "What is overlapping subproblems in recursion?",
    shortAnswer: "When the same subproblem is solved multiple times, as in naive Fibonacci.",
    explanation: "Memoization or dynamic programming can avoid recomputation.",
    hint: "Repeated work.",
    level: "intermediate",
    codeExample: "// Fibonacci recomputes fib(2) many times"
  },
  {
    question: "How does memoization improve recursive Fibonacci?",
    shortAnswer: "It reduces time complexity from O(2ⁿ) to O(n).",
    explanation: "By storing results of subproblems, each is computed once.",
    hint: "Caching.",
    level: "intermediate",
    codeExample: "// use array to store computed values"
  },
  {
    question: "What is the recurrence for quicksort in the worst case?",
    shortAnswer: "T(n) = T(n-1) + O(n), T(1) = O(1)",
    explanation: "If the pivot is always the smallest or largest, one partition is empty.",
    hint: "Unbalanced.",
    level: "advanced",
    codeExample: "// T(n) = T(n-1) + n"
  },
  {
    question: "What is the worst-case time complexity of quicksort?",
    shortAnswer: "O(n²) — quadratic.",
    explanation: "T(n) = T(n-1) + O(n) solves to O(n²).",
    hint: "Unbalanced partitions.",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the recurrence for quicksort in the average case?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), T(1) = O(1)",
    explanation: "On average, the pivot splits the array roughly in half.",
    hint: "Balanced partitions.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the average-case time complexity of quicksort?",
    shortAnswer: "O(n log n) — linearithmic.",
    explanation: "T(n) = 2T(n/2) + O(n) → O(n log n).",
    hint: "n log n.",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "How do you find the recursion depth of a recursive algorithm?",
    shortAnswer: "The maximum depth is the maximum number of nested calls before hitting the base case.",
    explanation: "For factorial, depth = n; for binary search, depth = log₂(n).",
    hint: "Number of recursive calls in the longest path.",
    level: "intermediate",
    codeExample: "// depth = n for factorial"
  },
  {
    question: "What is the recurrence for the Euclidean algorithm (GCD)?",
    shortAnswer: "T(a,b) = T(b, a mod b) + O(1), T(x,0) = O(1)",
    explanation: "Each step reduces the problem using the modulo operation.",
    hint: "Modulo reduction.",
    level: "advanced",
    codeExample: "// T(a,b) = T(b, a%b) + 1"
  }
];

export default questions;