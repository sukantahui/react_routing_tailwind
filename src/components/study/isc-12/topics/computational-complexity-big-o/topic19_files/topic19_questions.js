const questions = [
  {
    question: "What is the best possible time complexity?",
    shortAnswer: "O(1) — constant time.",
    explanation: "Operations that take the same time regardless of input size.",
    hint: "Independent of n.",
    level: "basic",
    codeExample: "// arr[0]"
  },
  {
    question: "What is the time complexity of linear search?",
    shortAnswer: "O(n) — linear time.",
    explanation: "You may need to check every element.",
    hint: "One element at a time.",
    level: "basic",
    codeExample: "// for loop over array"
  },
  {
    question: "What is the time complexity of binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "Each step halves the search space.",
    hint: "Halving.",
    level: "basic",
    codeExample: "// binary search loop"
  },
  {
    question: "What is the time complexity of merge sort?",
    shortAnswer: "O(n log n) — linearithmic time.",
    explanation: "Divide and conquer sorting.",
    hint: "n log n.",
    level: "intermediate",
    codeExample: "// merge sort"
  },
  {
    question: "What is the time complexity of bubble sort?",
    shortAnswer: "O(n²) — quadratic time (worst case).",
    explanation: "Nested loops comparing adjacent elements.",
    hint: "Nested loops.",
    level: "basic",
    codeExample: "// bubble sort"
  },
  {
    question: "What is the time complexity of naive Fibonacci?",
    shortAnswer: "O(2ⁿ) — exponential time.",
    explanation: "Each call branches into two calls.",
    hint: "Exponential branching.",
    level: "intermediate",
    codeExample: "// fib(n) = fib(n-1) + fib(n-2)"
  },
  {
    question: "What is the time complexity of generating all permutations?",
    shortAnswer: "O(n!) — factorial time.",
    explanation: "n! permutations, only feasible for n ≤ 10.",
    hint: "Factorial growth.",
    level: "advanced",
    codeExample: "// all permutations of n elements"
  },
  {
    question: "What is the time complexity of accessing an element in an array?",
    shortAnswer: "O(1) — constant time.",
    explanation: "Arrays support random access in constant time.",
    hint: "Direct access.",
    level: "basic",
    codeExample: "// arr[i]"
  },
  {
    question: "What is the time complexity of hash table lookup (average)?",
    shortAnswer: "O(1) — constant time average.",
    explanation: "With a good hash function and load factor, it's O(1).",
    hint: "Hash function.",
    level: "intermediate",
    codeExample: "// map.get(key)"
  },
  {
    question: "What is the time complexity of hash table lookup (worst)?",
    shortAnswer: "O(n) — when all keys collide.",
    explanation: "All keys in the same bucket degrade to linear search.",
    hint: "Collisions.",
    level: "intermediate",
    codeExample: "// worst case"
  },
  {
    question: "What is the time complexity of a simple for loop from 0 to n?",
    shortAnswer: "O(n) — linear time.",
    explanation: "The loop runs n times.",
    hint: "One operation per iteration.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) { ... }"
  },
  {
    question: "What is the time complexity of nested loops both running n times?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "Total iterations = n * n = n².",
    hint: "Multiply.",
    level: "basic",
    codeExample: "for (i) for (j) { ... }"
  },
  {
    question: "What is the time complexity of three nested loops?",
    shortAnswer: "O(n³) — cubic time.",
    explanation: "Total iterations = n³.",
    hint: "Three loops.",
    level: "basic",
    codeExample: "for (i) for (j) for (k) { ... }"
  },
  {
    question: "Which is faster: O(n) or O(n log n)?",
    shortAnswer: "O(n) is faster for large n.",
    explanation: "Linear growth is less than linearithmic growth.",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// O(n) < O(n log n)"
  },
  {
    question: "Which is faster: O(n²) or O(2ⁿ)?",
    shortAnswer: "O(n²) is much faster for large n.",
    explanation: "Quadratic growth is polynomial; exponential is much worse.",
    hint: "Exponential vs polynomial.",
    level: "intermediate",
    codeExample: "// O(n²) << O(2ⁿ)"
  },
  {
    question: "What is the time complexity of the Tower of Hanoi?",
    shortAnswer: "O(2ⁿ) — exponential.",
    explanation: "The recurrence T(n) = 2T(n-1) + 1 gives 2ⁿ - 1 moves.",
    hint: "Doubling each disk.",
    level: "advanced",
    codeExample: "// tower of hanoi"
  },
  {
    question: "What is the time complexity of Euclidean algorithm for GCD?",
    shortAnswer: "O(log min(a,b)) — logarithmic.",
    explanation: "Each step reduces numbers by modulo.",
    hint: "Modulo reduction.",
    level: "advanced",
    codeExample: "// gcd(a,b) = gcd(b, a%b)"
  },
  {
    question: "What is the time complexity of matrix multiplication (naive)?",
    shortAnswer: "O(n³) — cubic.",
    explanation: "Three nested loops for n×n matrices.",
    hint: "Three loops.",
    level: "advanced",
    codeExample: "// for i for j for k"
  },
  {
    question: "What is the time complexity of finding the maximum in an array?",
    shortAnswer: "O(n) — linear.",
    explanation: "You must check every element.",
    hint: "Must scan all.",
    level: "basic",
    codeExample: "// find max = O(n)"
  },
  {
    question: "What is the time complexity of quicksort (average)?",
    shortAnswer: "O(n log n) — linearithmic average.",
    explanation: "Good pivot selection gives balanced partitions.",
    hint: "Average case.",
    level: "intermediate",
    codeExample: "// quicksort avg"
  },
  {
    question: "What is the time complexity of quicksort (worst)?",
    shortAnswer: "O(n²) — quadratic worst.",
    explanation: "Poor pivot selection leads to unbalanced partitions.",
    hint: "Bad pivot.",
    level: "intermediate",
    codeExample: "// quicksort worst"
  },
  {
    question: "What is the time complexity of insertion sort (worst)?",
    shortAnswer: "O(n²) — quadratic.",
    explanation: "Reverse sorted array causes maximum shifts.",
    hint: "Reverse sorted.",
    level: "intermediate",
    codeExample: "// insertion sort worst"
  },
  {
    question: "What is the time complexity of insertion sort (best)?",
    shortAnswer: "O(n) — linear.",
    explanation: "Already sorted array needs one comparison per element.",
    hint: "Sorted input.",
    level: "intermediate",
    codeExample: "// insertion sort best"
  },
  {
    question: "What is the time complexity of heap sort?",
    shortAnswer: "O(n log n) — linearithmic.",
    explanation: "Heap sort is O(n log n) in all cases.",
    hint: "All cases.",
    level: "intermediate",
    codeExample: "// heap sort"
  },
  {
    question: "What is the time complexity of the Sieve of Eratosthenes?",
    shortAnswer: "O(n log log n) — nearly linear.",
    explanation: "It's considered very efficient for finding primes.",
    hint: "n log log n.",
    level: "advanced",
    codeExample: "// sieve"
  },
  {
    question: "What is the time complexity of checking if a number is even?",
    shortAnswer: "O(1) — constant.",
    explanation: "A single modulo operation.",
    hint: "Single operation.",
    level: "basic",
    codeExample: "// n % 2 == 0"
  },
  {
    question: "What is the time complexity of counting bits in an integer?",
    shortAnswer: "O(log n) — logarithmic.",
    explanation: "The number of bits is log₂(n).",
    hint: "Number of bits.",
    level: "intermediate",
    codeExample: "// while (n > 0) { n >>= 1; }"
  },
  {
    question: "What is the time complexity of a loop that doubles i each time?",
    shortAnswer: "O(log n) — logarithmic.",
    explanation: "i = 1, 2, 4, 8, ... until i >= n.",
    hint: "Doubling.",
    level: "intermediate",
    codeExample: "for (int i=1; i<n; i*=2) { ... }"
  },
  {
    question: "Can O(1) algorithm be slower than O(n) in practice?",
    shortAnswer: "Yes, if the constant in O(1) is very large and n is small.",
    explanation: "For example, O(1000) vs O(n) for n=10.",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// Not code-specific"
  },
  {
    question: "What is the best complexity for sorting a list of numbers?",
    shortAnswer: "O(n log n) for comparison-based sorting.",
    explanation: "This is the theoretical lower bound for comparison sorting.",
    hint: "Lower bound.",
    level: "intermediate",
    codeExample: "// merge sort, heap sort"
  },
  {
    question: "What complexity class should you aim for with large datasets?",
    shortAnswer: "O(n log n) or better (O(n), O(log n), O(1)).",
    explanation: "For n > 10,000, O(n²) is usually too slow.",
    hint: "Think about scalability.",
    level: "basic",
    codeExample: "// Aim for efficient algorithms"
  }
];

export default questions;