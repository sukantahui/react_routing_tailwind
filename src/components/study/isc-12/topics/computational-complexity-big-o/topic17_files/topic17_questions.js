const questions = [
  {
    question: "What is a recurrence relation?",
    shortAnswer: "An equation that defines a sequence where each term is a function of previous terms.",
    explanation: "In algorithm analysis, it expresses T(n) in terms of T(smaller inputs) plus work done at each step.",
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
    question: "What is the recurrence for binary search?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(1) = O(1)",
    explanation: "Each call halves the input and does constant work.",
    hint: "Divide by 2.",
    level: "intermediate",
    codeExample: "// T(n) = T(n/2) + 1"
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
    question: "What is the recurrence for naive Fibonacci?",
    shortAnswer: "T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)",
    explanation: "Each call makes two recursive calls on n-1 and n-2.",
    hint: "Two calls.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + T(n-2) + 1"
  },
  {
    question: "What is the recurrence for Tower of Hanoi?",
    shortAnswer: "T(n) = 2T(n-1) + O(1), T(1) = O(1)",
    explanation: "Each call moves n-1 disks twice, plus one move.",
    hint: "Two calls on n-1.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n-1) + 1"
  },
  {
    question: "What is the base case in a recurrence?",
    shortAnswer: "The smallest input where recursion stops, usually T(0) = O(1) or T(1) = O(1).",
    explanation: "The base case terminates the recurrence and provides a starting point for the recursion.",
    hint: "Where the recursion ends.",
    level: "basic",
    codeExample: "// T(0) = 1, T(1) = 1"
  },
  {
    question: "What does the 'a' represent in T(n) = a·T(n/b) + f(n)?",
    shortAnswer: "The number of recursive calls made at each level.",
    explanation: "For merge sort, a=2 (two calls). For binary search, a=1 (one call).",
    hint: "Number of subproblems.",
    level: "intermediate",
    codeExample: "// a = 2 for merge sort"
  },
  {
    question: "What does the 'b' represent in T(n) = a·T(n/b) + f(n)?",
    shortAnswer: "The factor by which the input size is divided.",
    explanation: "For merge sort, b=2 (input is split in half).",
    hint: "Division factor.",
    level: "intermediate",
    codeExample: "// b = 2 for merge sort"
  },
  {
    question: "What does f(n) represent in a recurrence?",
    shortAnswer: "The work done at each recursive call (combining results, merging, etc.).",
    explanation: "For merge sort, f(n) = O(n) for merging. For binary search, f(n) = O(1).",
    hint: "Work per level.",
    level: "intermediate",
    codeExample: "// f(n) = n for merge sort"
  },
  {
    question: "What is the solution to T(n) = T(n-1) + O(1)?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The recurrence expands to T(n) = T(0) + n, which is O(n).",
    hint: "Linear.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the solution to T(n) = T(n/2) + O(1)?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The recurrence expands to T(n) = T(1) + log₂(n), which is O(log n).",
    hint: "Logarithmic.",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the solution to T(n) = 2T(n/2) + O(n)?",
    shortAnswer: "O(n log n) — linearithmic.",
    explanation: "The Master Theorem Case 2 gives O(n log n).",
    hint: "n log n.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the solution to T(n) = 2T(n/2) + O(1)?",
    shortAnswer: "O(n) — linear.",
    explanation: "Master Theorem Case 1: a=2, b=2, log_b a = 1, f(n)=O(1) → O(n).",
    hint: "Linear.",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the solution to T(n) = T(n-1) + T(n-2) + O(1)?",
    shortAnswer: "O(2ⁿ) — exponential.",
    explanation: "The recurrence has characteristic equation r² = r + 1, leading to exponential growth.",
    hint: "Exponential.",
    level: "advanced",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the solution to T(n) = 2T(n-1) + O(1)?",
    shortAnswer: "O(2ⁿ) — exponential.",
    explanation: "The recurrence doubles the number of calls at each level.",
    hint: "Doubling each level.",
    level: "advanced",
    codeExample: "// O(2ⁿ)"
  },
  {
    question: "What is the Master Theorem?",
    shortAnswer: "A formula for solving recurrences of the form T(n) = a·T(n/b) + f(n).",
    explanation: "Compares f(n) with n^(log_b a) to determine the complexity.",
    hint: "For divide-and-conquer.",
    level: "advanced",
    codeExample: "// T(n) = aT(n/b) + f(n)"
  },
  {
    question: "What are the three cases of the Master Theorem?",
    shortAnswer: "Case 1: f(n)=O(n^(log_b a-ε)) → Θ(n^(log_b a)). Case 2: f(n)=Θ(n^(log_b a)) → Θ(n^(log_b a)·log n). Case 3: f(n)=Ω(n^(log_b a+ε)) → Θ(f(n)).",
    explanation: "Each case compares f(n) to n^(log_b a) to determine the complexity.",
    hint: "Compare f(n) with n^(log_b a).",
    level: "advanced",
    codeExample: "// Three cases"
  },
  {
    question: "Can the Master Theorem solve T(n) = T(n-1) + O(1)?",
    shortAnswer: "No, the Master Theorem only applies to T(n) = a·T(n/b) + f(n).",
    explanation: "T(n-1) is not of the form T(n/b). Use substitution or iteration method.",
    hint: "Not divide-and-conquer.",
    level: "advanced",
    codeExample: "// Use iteration method"
  },
  {
    question: "What is the substitution method for solving recurrences?",
    shortAnswer: "Guess the solution and prove it by induction.",
    explanation: "You guess T(n) = O(g(n)) and then prove that the guess satisfies the recurrence.",
    hint: "Guess and verify.",
    level: "advanced",
    codeExample: "// Guess T(n) = O(n), then prove"
  },
  {
    question: "What is the iteration (expansion) method for solving recurrences?",
    shortAnswer: "Expand the recurrence repeatedly until a pattern emerges.",
    explanation: "Write T(n) in terms of T(n-1), then T(n-2), until reaching the base case.",
    hint: "Expand to find pattern.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1 = T(n-2) + 2 = ..."
  },
  {
    question: "What is the recursion tree method for solving recurrences?",
    shortAnswer: "Draw a tree of recursive calls and sum the work at each level.",
    explanation: "Visualizes the recurrence, showing how work accumulates across levels.",
    hint: "Draw and sum.",
    level: "advanced",
    codeExample: "// Each level has a· nodes, each with n/b work"
  },
  {
    question: "What is the recurrence for quicksort in the worst case?",
    shortAnswer: "T(n) = T(n-1) + O(n), T(1) = O(1)",
    explanation: "When the pivot is always the smallest or largest, one partition is empty.",
    hint: "Unbalanced.",
    level: "advanced",
    codeExample: "// T(n) = T(n-1) + n"
  },
  {
    question: "What is the solution to T(n) = T(n-1) + O(n)?",
    shortAnswer: "O(n²) — quadratic.",
    explanation: "The recurrence expands to T(n) = T(0) + sum_{i=1}^n i = O(n²).",
    hint: "Quadratic.",
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
    question: "What is the solution to T(n) = 2T(n/2) + O(n)?",
    shortAnswer: "O(n log n) — linearithmic.",
    explanation: "Master Theorem Case 2: a=2, b=2, log_b a = 1, f(n)=Θ(n).",
    hint: "n log n.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the recurrence for the Euclidean algorithm (GCD)?",
    shortAnswer: "T(a,b) = T(b, a mod b) + O(1), T(x,0) = O(1)",
    explanation: "Each step reduces the problem using the modulo operation.",
    hint: "Modulo reduction.",
    level: "advanced",
    codeExample: "// T(a,b) = T(b, a%b) + 1"
  },
  {
    question: "What is the solution to the Euclidean algorithm recurrence?",
    shortAnswer: "O(log min(a,b)) — logarithmic.",
    explanation: "The numbers decrease exponentially, so the number of steps is logarithmic.",
    hint: "Logarithmic.",
    level: "advanced",
    codeExample: "// O(log min(a,b))"
  },
  {
    question: "What is the recurrence for a recursive function that divides the input by 3 and makes 3 recursive calls?",
    shortAnswer: "T(n) = 3T(n/3) + O(1), T(1) = O(1)",
    explanation: "Three calls on one-third of the input.",
    hint: "a=3, b=3.",
    level: "advanced",
    codeExample: "// T(n) = 3T(n/3) + 1"
  },
  {
    question: "What is the solution to T(n) = 3T(n/3) + O(1)?",
    shortAnswer: "O(n) — linear.",
    explanation: "Master Theorem Case 1: a=3, b=3, log_b a = 1, f(n)=O(1) → O(n).",
    hint: "Linear.",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the recurrence for a recursive function that divides the input by 3 and makes 2 recursive calls?",
    shortAnswer: "T(n) = 2T(n/3) + O(1), T(1) = O(1)",
    explanation: "Two calls on one-third of the input.",
    hint: "a=2, b=3.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/3) + 1"
  }
];

export default questions;