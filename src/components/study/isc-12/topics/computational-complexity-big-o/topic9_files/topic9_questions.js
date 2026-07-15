const questions = [
  {
    question: "What is Big-O notation?",
    shortAnswer: "A mathematical notation that describes the upper bound of an algorithm's growth rate.",
    explanation: "It gives the worst-case time or space complexity, ignoring constants and lower-order terms, as input size approaches infinity.",
    hint: "Think of it as a guarantee of how slow the algorithm can be.",
    level: "basic",
    codeExample: "// O(n), O(log n), etc."
  },
  {
    question: "Why do we drop constants in Big-O?",
    shortAnswer: "Because constants do not affect the growth rate as n becomes large.",
    explanation: "For large n, 2n and 3n both grow linearly; the constant factor becomes negligible compared to n.",
    hint: "Think of n = 1,000,000.",
    level: "basic",
    codeExample: "// O(2n) = O(n)"
  },
  {
    question: "What does O(n) mean?",
    shortAnswer: "Linear time — the runtime grows proportionally with the input size.",
    explanation: "If you double the input, the runtime roughly doubles.",
    hint: "A simple loop over the input.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) { ... }"
  },
  {
    question: "What does O(1) mean?",
    shortAnswer: "Constant time — the runtime is independent of input size.",
    explanation: "The algorithm takes the same amount of time regardless of n.",
    hint: "Array access by index.",
    level: "basic",
    codeExample: "int x = arr[0];"
  },
  {
    question: "What does O(log n) mean?",
    shortAnswer: "Logarithmic time — the runtime grows very slowly as n increases.",
    explanation: "Common in algorithms that halve the input each step (like binary search).",
    hint: "How many times can you halve n?",
    level: "intermediate",
    codeExample: "// binary search"
  },
  {
    question: "What does O(n²) mean?",
    shortAnswer: "Quadratic time — the runtime grows as the square of the input size.",
    explanation: "Common in algorithms with nested loops over the same input.",
    hint: "Nested loop.",
    level: "basic",
    codeExample: "for (i) for (j) { ... }"
  },
  {
    question: "What does O(n log n) mean?",
    shortAnswer: "Linearithmic time — often seen in efficient sorting algorithms.",
    explanation: "It's better than O(n²) but worse than O(n). Common in merge sort and heap sort.",
    hint: "Divide and conquer sorting.",
    level: "intermediate",
    codeExample: "// merge sort"
  },
  {
    question: "What is the Big-O complexity of finding an element in an unsorted array?",
    shortAnswer: "O(n) — linear search.",
    explanation: "You may need to check every element.",
    hint: "No order, must scan.",
    level: "basic",
    codeExample: "for (int x : arr) if (x == target) ..."
  },
  {
    question: "What is the Big-O complexity of finding an element in a sorted array using binary search?",
    shortAnswer: "O(log n).",
    explanation: "Each comparison halves the search space.",
    hint: "Halving pattern.",
    level: "basic",
    codeExample: "// binary search"
  },
  {
    question: "What is the Big-O complexity of accessing an element in a hash map?",
    shortAnswer: "O(1) average, O(n) worst-case.",
    explanation: "Hash maps provide constant-time average access, but collisions can degrade to O(n).",
    hint: "Hash function.",
    level: "intermediate",
    codeExample: "// map.get(key)"
  },
  {
    question: "What is the Big-O complexity of the recursive Fibonacci (naive)?",
    shortAnswer: "O(2ⁿ).",
    explanation: "The recurrence T(n) = T(n-1) + T(n-2) yields exponential growth.",
    hint: "Exponential branching.",
    level: "advanced",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What is the Big-O complexity of merge sort?",
    shortAnswer: "O(n log n) in all cases (worst, best, average).",
    explanation: "It divides the array in half (log n levels) and merges (O(n) per level).",
    hint: "Stable sorting.",
    level: "intermediate",
    codeExample: "// merge sort = O(n log n)"
  },
  {
    question: "What is the Big-O complexity of bubble sort?",
    shortAnswer: "O(n²) worst and average, O(n) best (when optimized).",
    explanation: "Nested loops comparing adjacent elements.",
    hint: "Simple sorting.",
    level: "basic",
    codeExample: "// bubble sort"
  },
  {
    question: "What is the Big-O complexity of quicksort?",
    shortAnswer: "O(n log n) average, O(n²) worst-case.",
    explanation: "The average case is linearithmic, but with poor pivot choice it can degrade to quadratic.",
    hint: "Pivot selection matters.",
    level: "intermediate",
    codeExample: "// quicksort"
  },
  {
    question: "Why does Big-O ignore lower-order terms?",
    shortAnswer: "Because for large n, the highest-degree term dominates the growth.",
    explanation: "For example, n² + n is dominated by n² as n becomes large.",
    hint: "Which term grows fastest?",
    level: "basic",
    codeExample: "// O(n² + n) = O(n²)"
  },
  {
    question: "Can an algorithm have O(1) space complexity?",
    shortAnswer: "Yes, if it uses a fixed amount of extra memory regardless of input size.",
    explanation: "In-place algorithms like insertion sort have O(1) auxiliary space.",
    hint: "No extra arrays.",
    level: "intermediate",
    codeExample: "// in-place sorting"
  },
  {
    question: "What is the Big-O complexity of the Euclidean algorithm for GCD?",
    shortAnswer: "O(log min(a,b)).",
    explanation: "The number of steps is logarithmic in the smaller input.",
    hint: "Modulo operation reduces numbers quickly.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "What is the Big-O complexity of counting the number of digits in an integer?",
    shortAnswer: "O(log₁₀ n) = O(log n).",
    explanation: "You divide by 10 repeatedly.",
    hint: "Repeated division.",
    level: "intermediate",
    codeExample: "while (n > 0) { n /= 10; digits++; }"
  },
  {
    question: "What is the Big-O complexity of a while loop that doubles the variable?",
    shortAnswer: "O(log n).",
    explanation: "The loop runs until i >= n, and i doubles each time.",
    hint: "Doubling pattern.",
    level: "basic",
    codeExample: "while (i < n) { i *= 2; }"
  },
  {
    question: "What is the Big-O complexity of a for loop that goes from 0 to n by 2?",
    shortAnswer: "O(n) — still linear (n/2 iterations, but constants are dropped).",
    explanation: "O(n/2) = O(n).",
    hint: "Constant factor doesn't matter.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i+=2) { ... }"
  },
  {
    question: "What is the difference between O(n) and O(n²)?",
    shortAnswer: "O(n) grows linearly, O(n²) grows quadratically. For large n, O(n²) is much slower.",
    explanation: "For n=1000, O(n) does 1000 ops, O(n²) does 1,000,000 ops.",
    hint: "Compare slopes.",
    level: "basic",
    codeExample: "// Difference in growth"
  },
  {
    question: "Can an O(n) algorithm be slower than an O(n²) algorithm for small n?",
    shortAnswer: "Yes, if the O(n) algorithm has a very large constant factor.",
    explanation: "Big-O ignores constants; in practice, for small n, constants can dominate.",
    hint: "Consider constants.",
    level: "intermediate",
    codeExample: "// O(1000n) vs O(n²) for n=10"
  },
  {
    question: "What is the worst-case Big-O of insertion sort?",
    shortAnswer: "O(n²) — when the array is in reverse order.",
    explanation: "Each element may need to be shifted to the front.",
    hint: "Reverse sorted.",
    level: "intermediate",
    codeExample: "// insertion sort worst-case"
  },
  {
    question: "What is the Big-O of hashing a key?",
    shortAnswer: "O(1) — the hash function is constant time.",
    explanation: "The hash function typically does a fixed number of operations.",
    hint: "Constant time operation.",
    level: "intermediate",
    codeExample: "// object.hashCode()"
  },
  {
    question: "How does Big-O help in choosing data structures?",
    shortAnswer: "It tells you the time and space complexity of operations, helping you pick the right structure for your needs.",
    explanation: "For example, use HashMap for O(1) lookups, or TreeMap for O(log n) sorted access.",
    hint: "Trade-offs.",
    level: "intermediate",
    codeExample: "// Choose based on operations."
  },
  {
    question: "What is the Big-O of traversing a binary tree?",
    shortAnswer: "O(n) — each node is visited once.",
    explanation: "Whether in-order, pre-order, or post-order, every node is processed.",
    hint: "Visit every node.",
    level: "intermediate",
    codeExample: "// tree traversal = O(n)"
  },
  {
    question: "What is the Big-O of the Tower of Hanoi problem?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "The recurrence T(n) = 2T(n-1) + 1 solves to 2ⁿ - 1.",
    hint: "Doubling each disk.",
    level: "advanced",
    codeExample: "// tower of hanoi"
  },
  {
    question: "What is the Big-O of matrix multiplication (naive)?",
    shortAnswer: "O(n³) — cubic time.",
    explanation: "Three nested loops for two n×n matrices.",
    hint: "Three loops.",
    level: "advanced",
    codeExample: "for i for j for k { c[i][j] += a[i][k]*b[k][j]; }"
  },
  {
    question: "What is the Big-O of the Sieve of Eratosthenes?",
    shortAnswer: "O(n log log n) — nearly linear.",
    explanation: "It's not O(log n), but it's often mentioned as efficient.",
    hint: "Marking multiples.",
    level: "advanced",
    codeExample: "// Not O(log n)"
  },
  {
    question: "What is the Big-O of finding the maximum in a heap?",
    shortAnswer: "O(1) — the max is at the root.",
    explanation: "In a max-heap, the root is the largest element.",
    hint: "Root access.",
    level: "intermediate",
    codeExample: "// heap[0]"
  },
  {
    question: "What does it mean if an algorithm is O(n!) ?",
    shortAnswer: "Factorial time — extremely slow, only feasible for very small n.",
    explanation: "Common in brute-force permutation problems (e.g., traveling salesman).",
    hint: "n! grows faster than 2ⁿ.",
    level: "advanced",
    codeExample: "// traveling salesman brute force"
  }
];

export default questions;