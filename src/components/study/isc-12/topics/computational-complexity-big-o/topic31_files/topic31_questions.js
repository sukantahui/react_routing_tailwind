const questions = [
  {
    question: "What is the first step in analyzing a recursive algorithm?",
    shortAnswer: "Write the recurrence relation T(n) = a·T(n/b) + f(n) with the base case.",
    explanation: "The recurrence expresses the time complexity in terms of smaller subproblems.",
    hint: "Start with the recurrence.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + O(1)"
  },
  {
    question: "What is the recurrence for binary search?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(1) = O(1)",
    explanation: "Each step halves the input and does constant work.",
    hint: "Divide by 2.",
    level: "basic",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the recurrence for merge sort?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), T(1) = O(1)",
    explanation: "Two recursive calls on half the input, plus O(n) work to merge.",
    hint: "Divide and conquer.",
    level: "basic",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the recurrence for naive Fibonacci?",
    shortAnswer: "T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "Each call branches into two calls on smaller inputs.",
    hint: "Two branches.",
    level: "basic",
    codeExample: "// T(n) = T(n-1) + T(n-2) + 1"
  },
  {
    question: "What is the Master Theorem used for?",
    shortAnswer: "Solving recurrences of the form T(n) = a·T(n/b) + f(n).",
    explanation: "It provides a direct solution for divide-and-conquer recurrences.",
    hint: "For D&C recurrences.",
    level: "intermediate",
    codeExample: "// T(n) = aT(n/b) + f(n)"
  },
  {
    question: "What are the three cases of the Master Theorem?",
    shortAnswer: "Case 1: f(n)=O(n^(log_b a-ε)) → Θ(n^(log_b a)); Case 2: f(n)=Θ(n^(log_b a)) → Θ(n^(log_b a)·log n); Case 3: f(n)=Ω(n^(log_b a+ε)) → Θ(f(n)).",
    explanation: "Compare f(n) with n^(log_b a) to determine the complexity.",
    hint: "Three cases.",
    level: "advanced",
    codeExample: "// Compare f(n) with n^(log_b a)"
  },
  {
    question: "What is the recursion tree method?",
    shortAnswer: "A visual method that draws a tree of recursive calls and sums the work at each level.",
    explanation: "It helps visualize how work accumulates across levels.",
    hint: "Draw and sum.",
    level: "intermediate",
    codeExample: "// Sum work at each level"
  },
  {
    question: "What is the space complexity of a recursive algorithm?",
    shortAnswer: "O(depth) — the maximum depth of the recursion stack.",
    explanation: "Each recursive call adds a frame to the stack, consuming memory.",
    hint: "Recursion depth.",
    level: "basic",
    codeExample: "// O(depth) space"
  },
  {
    question: "What is the space complexity of recursive factorial?",
    shortAnswer: "O(n) — recursion depth is n.",
    explanation: "Each call adds a frame until the base case is reached.",
    hint: "Depth = n.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the space complexity of recursive binary search?",
    shortAnswer: "O(log n) — recursion depth is log₂(n).",
    explanation: "The depth is logarithmic because the input is halved each time.",
    hint: "Depth = log n.",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the space complexity of recursive merge sort?",
    shortAnswer: "O(n) for the auxiliary array + O(log n) for the stack = O(n).",
    explanation: "The auxiliary array dominates the space usage.",
    hint: "Auxiliary array.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "What is the substitution method for solving recurrences?",
    shortAnswer: "Guess the solution and prove it by induction.",
    explanation: "You guess T(n) = O(g(n)) and then prove it satisfies the recurrence.",
    hint: "Guess and verify.",
    level: "advanced",
    codeExample: "// Guess T(n) = O(n), then prove"
  },
  {
    question: "What is the iteration method for solving recurrences?",
    shortAnswer: "Expand the recurrence repeatedly until a pattern emerges.",
    explanation: "Write T(n) in terms of T(n-1), then T(n-2), until reaching the base case.",
    hint: "Expand to find pattern.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1 = T(n-2) + 2 = ..."
  },
  {
    question: "How do you identify linear recursion?",
    shortAnswer: "The recurrence has only one recursive call: T(n) = T(n-1) + O(1).",
    explanation: "Linear recursion forms a chain of calls.",
    hint: "One call.",
    level: "basic",
    codeExample: "// factorial: T(n) = T(n-1) + O(1)"
  },
  {
    question: "How do you identify binary recursion?",
    shortAnswer: "The recurrence has two recursive calls: T(n) = T(n-1) + T(n-2) + O(1).",
    explanation: "Binary recursion branches into two calls.",
    hint: "Two calls.",
    level: "intermediate",
    codeExample: "// Fibonacci: T(n) = T(n-1) + T(n-2) + O(1)"
  },
  {
    question: "How do you identify divide-and-conquer recursion?",
    shortAnswer: "The recurrence is T(n) = a·T(n/b) + f(n) with b > 1.",
    explanation: "The input is divided into smaller subproblems.",
    hint: "Divide and conquer.",
    level: "intermediate",
    codeExample: "// Merge sort: T(n) = 2T(n/2) + O(n)"
  },
  {
    question: "What is overlapping subproblems in recursion?",
    shortAnswer: "When the same subproblem is solved multiple times, as in naive Fibonacci.",
    explanation: "Memoization can avoid recomputation.",
    hint: "Repeated work.",
    level: "intermediate",
    codeExample: "// Fibonacci recomputes fib(2) many times"
  },
  {
    question: "How does memoization improve recursive algorithms?",
    shortAnswer: "It stores results of subproblems, reducing time from exponential to polynomial.",
    explanation: "Each subproblem is computed only once.",
    hint: "Caching.",
    level: "intermediate",
    codeExample: "// memo[n] = fib(n)"
  },
  {
    question: "What is tail recursion?",
    shortAnswer: "A recursive function where the recursive call is the last operation.",
    explanation: "Tail recursion can be optimized by the compiler to avoid stack growth.",
    hint: "Last operation.",
    level: "advanced",
    codeExample: "// tailFactorial(n, acc) = tailFactorial(n-1, acc*n)"
  },
  {
    question: "Can all recursive algorithms be made iterative?",
    shortAnswer: "Yes, using an explicit stack, but some recursive solutions are more elegant.",
    explanation: "Recursion can always be converted to iteration with a stack.",
    hint: "Use explicit stack.",
    level: "advanced",
    codeExample: "// Iterative stack replaces recursion"
  },
  {
    question: "What is the recurrence for the Euclidean algorithm (GCD)?",
    shortAnswer: "T(a,b) = T(b, a mod b) + O(1), T(x,0) = O(1)",
    explanation: "Each step reduces the numbers using modulo.",
    hint: "Modulo reduction.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "What is the time complexity of the Euclidean algorithm?",
    shortAnswer: "O(log min(a,b)) — logarithmic time.",
    explanation: "The numbers decrease exponentially, so steps are logarithmic.",
    hint: "Logarithmic.",
    level: "advanced",
    codeExample: "// O(log min(a,b))"
  },
  {
    question: "What is the recurrence for quicksort in the worst case?",
    shortAnswer: "T(n) = T(n-1) + O(n), T(1) = O(1)",
    explanation: "When the pivot is always the smallest or largest, one partition is empty.",
    hint: "Unbalanced.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + n"
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
    question: "What is the time complexity of the Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "T(n) = 2T(n-1) + O(1) solves to O(2ⁿ).",
    hint: "Doubling each level.",
    level: "intermediate",
    codeExample: "// Tower of Hanoi O(2ⁿ)"
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
    shortAnswer: "O(n) — linear time.",
    explanation: "T(n) = 2T(n/2) + O(1) solves to O(n) by Master Theorem Case 1.",
    hint: "O(n).",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the recurrence for binary search on a rotated sorted array?",
    shortAnswer: "T(n) = T(n/2) + O(1) — still O(log n).",
    explanation: "Modified binary search still halves the search space.",
    hint: "Still logarithmic.",
    level: "advanced",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the Master Theorem case for T(n) = 2T(n/2) + n?",
    shortAnswer: "Case 2: a=2, b=2, f(n)=n = Θ(n^(log_b a)) → Θ(n log n).",
    explanation: "f(n) matches n^(log_b a), so the solution is Θ(n log n).",
    hint: "Case 2.",
    level: "advanced",
    codeExample: "// Θ(n log n)"
  },
  {
    question: "What is the Master Theorem case for T(n) = 4T(n/2) + n?",
    shortAnswer: "Case 1: a=4, b=2, f(n)=n, log_b a = 2. f(n)=O(n^(2-ε)) → Θ(n²).",
    explanation: "The work is dominated by the leaves.",
    hint: "Case 1.",
    level: "advanced",
    codeExample: "// Θ(n²)"
  },
  {
    question: "What is the Master Theorem case for T(n) = T(n/2) + n²?",
    shortAnswer: "Case 3: a=1, b=2, f(n)=n², log_b a = 0. f(n)=Ω(n^(0+ε)) → Θ(n²).",
    explanation: "The work is dominated by the root.",
    hint: "Case 3.",
    level: "advanced",
    codeExample: "// Θ(n²)"
  }
];

export default questions;