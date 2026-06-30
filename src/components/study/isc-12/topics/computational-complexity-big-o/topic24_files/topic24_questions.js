const questions = [
  {
    question: "What does O(n²) mean in time complexity?",
    shortAnswer: "Quadratic time — the runtime grows as the square of the input size.",
    explanation: "If you double the input, the runtime quadruples. Common in nested loops.",
    hint: "Think of nested loops over the same data.",
    level: "basic",
    codeExample: "// for (i) for (j) { ... }"
  },
  {
    question: "What is an example of an O(n²) algorithm?",
    shortAnswer: "Bubble sort, insertion sort (worst case), selection sort.",
    explanation: "These sorting algorithms use nested loops to compare and swap elements.",
    hint: "Simple sorting algorithms.",
    level: "basic",
    codeExample: "// bubble sort"
  },
  {
    question: "What is the worst-case time complexity of bubble sort?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "In the worst case, every pair of elements must be compared.",
    hint: "Reverse sorted input.",
    level: "basic",
    codeExample: "// bubble sort worst O(n²)"
  },
  {
    question: "What is the best-case time complexity of bubble sort?",
    shortAnswer: "O(n) — linear time (with optimization).",
    explanation: "If the array is already sorted, bubble sort makes one pass with no swaps.",
    hint: "Optimized bubble sort.",
    level: "intermediate",
    codeExample: "// optimized bubble sort best O(n)"
  },
  {
    question: "What is the worst-case time complexity of insertion sort?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "In the worst case (reverse sorted), each element must be shifted to the front.",
    hint: "Reverse sorted input.",
    level: "basic",
    codeExample: "// insertion sort worst O(n²)"
  },
  {
    question: "What is the best-case time complexity of insertion sort?",
    shortAnswer: "O(n) — linear time.",
    explanation: "If the array is already sorted, each element is already in place.",
    hint: "Already sorted.",
    level: "intermediate",
    codeExample: "// insertion sort best O(n)"
  },
  {
    question: "What is the time complexity of selection sort?",
    shortAnswer: "O(n²) in all cases (best, worst, average).",
    explanation: "Selection sort always scans the entire unsorted portion, regardless of input.",
    hint: "Always quadratic.",
    level: "intermediate",
    codeExample: "// selection sort O(n²)"
  },
  {
    question: "Why is O(n²) considered slow for large inputs?",
    shortAnswer: "Because the number of operations grows as the square of the input size.",
    explanation: "For n=10,000, O(n²) = 100,000,000 operations — too slow for most applications.",
    hint: "Squared growth.",
    level: "basic",
    codeExample: "// n² grows fast"
  },
  {
    question: "Can O(n²) be faster than O(n log n) for small n?",
    shortAnswer: "Yes, for small n, O(n²) can be faster due to lower constant factors.",
    explanation: "For n=10, O(n²) = 100, O(n log n) ≈ 33 — O(n log n) is actually faster, but with constants it can vary.",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// Depends on implementation"
  },
  {
    question: "What is the total iterations of: for (i=0; i<n; i++) for (j=0; j<n; j++)?",
    shortAnswer: "n² iterations = O(n²).",
    explanation: "Each loop runs n times, so total = n × n = n².",
    hint: "Multiply.",
    level: "basic",
    codeExample: "// n²"
  },
  {
    question: "What is the total iterations of: for (i=0; i<n; i++) for (j=i; j<n; j++)?",
    shortAnswer: "n(n+1)/2 ≈ n²/2 = O(n²).",
    explanation: "Sum of i from 0 to n-1 of (n-i) = n(n+1)/2.",
    hint: "Triangular.",
    level: "intermediate",
    codeExample: "// n(n+1)/2"
  },
  {
    question: "What is the total iterations of: for (i=0; i<n; i++) for (j=0; j<i; j++)?",
    shortAnswer: "n(n-1)/2 ≈ n²/2 = O(n²).",
    explanation: "Sum of i from 0 to n-1 of i = n(n-1)/2.",
    hint: "Triangular.",
    level: "intermediate",
    codeExample: "// n(n-1)/2"
  },
  {
    question: "Can nested loops with different variables be O(n²)?",
    shortAnswer: "Yes, if both loops iterate over the same input size n.",
    explanation: "For example, for (i=0; i<n; i++) for (j=0; j<m; j++) is O(n·m), but if m = n, it's O(n²).",
    hint: "Same size.",
    level: "intermediate",
    codeExample: "// O(n²) if m = n"
  },
  {
    question: "What is the time complexity of checking all pairs in an array?",
    shortAnswer: "O(n²) — for (i) for (j=i+1) gives n(n-1)/2 = O(n²).",
    explanation: "Checking every pair of elements requires O(n²) time.",
    hint: "Pairwise comparison.",
    level: "intermediate",
    codeExample: "// for (i) for (j=i+1)"
  },
  {
    question: "Can you find duplicates in an array in O(n) instead of O(n²)?",
    shortAnswer: "Yes, using a HashSet to store seen elements is O(n).",
    explanation: "HashSet provides O(1) average lookup, so a single pass is O(n).",
    hint: "HashSet.",
    level: "intermediate",
    codeExample: "Set<Integer> seen = new HashSet<>();"
  },
  {
    question: "What is the time complexity of matrix addition?",
    shortAnswer: "O(n²) — for an n×n matrix.",
    explanation: "You visit each cell once to add the corresponding values.",
    hint: "Each cell once.",
    level: "intermediate",
    codeExample: "for (i) for (j) c[i][j] = a[i][j] + b[i][j];"
  },
  {
    question: "What is the time complexity of matrix multiplication (naive)?",
    shortAnswer: "O(n³) — three nested loops.",
    explanation: "Multiplying two n×n matrices requires three nested loops.",
    hint: "Three loops.",
    level: "advanced",
    codeExample: "// for (i) for (j) for (k)"
  },
  {
    question: "Is bubble sort ever used in practice?",
    shortAnswer: "Rarely, except for educational purposes or very small datasets.",
    explanation: "Bubble sort is slow and not used in production code. Use quicksort or merge sort instead.",
    hint: "Educational only.",
    level: "basic",
    codeExample: "// Not used in practice"
  },
  {
    question: "What is the time complexity of insertion sort in the average case?",
    shortAnswer: "O(n²) — quadratic.",
    explanation: "On average, about half of the elements need to be shifted.",
    hint: "Average quadratic.",
    level: "intermediate",
    codeExample: "// insertion sort avg O(n²)"
  },
  {
    question: "Can insertion sort be efficient for small n?",
    shortAnswer: "Yes, insertion sort is often used for small subarrays in hybrid algorithms (e.g., Timsort).",
    explanation: "For small n, the overhead of advanced algorithms outweighs the benefits.",
    hint: "Small n.",
    level: "advanced",
    codeExample: "// Used in Timsort for small subarrays"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=0; j<n; j++) if (arr[i] == arr[j])?",
    shortAnswer: "O(n²) — but can be optimized to O(n) with a hash map.",
    explanation: "Checking all pairs is O(n²), but using a hash map to track seen values is O(n).",
    hint: "Hash map optimization.",
    level: "intermediate",
    codeExample: "// O(n²) without hash map"
  },
  {
    question: "What is the time complexity of a loop that processes a 2D array of size n×n?",
    shortAnswer: "O(n²) — visiting each cell once.",
    explanation: "Two nested loops over n rows and n columns.",
    hint: "Matrix traversal.",
    level: "basic",
    codeExample: "// for (i) for (j) { arr[i][j] ... }"
  },
  {
    question: "What is the space complexity of bubble sort?",
    shortAnswer: "O(1) — constant space (in-place sorting).",
    explanation: "Bubble sort sorts the array in place without extra memory.",
    hint: "In-place.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the space complexity of insertion sort?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Insertion sort is an in-place sorting algorithm.",
    hint: "In-place.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the time complexity of finding all pairs that sum to a target using nested loops?",
    shortAnswer: "O(n²) — but can be optimized to O(n) with a hash map.",
    explanation: "Checking all pairs is O(n²); using a hash map gives O(n).",
    hint: "Hash map optimization.",
    level: "intermediate",
    codeExample: "// O(n²) or O(n) with hash map"
  },
  {
    question: "What is the time complexity of comparing all elements in two arrays of size n and m?",
    shortAnswer: "O(n·m) — product of the sizes.",
    explanation: "Nested loops over both arrays.",
    hint: "Product.",
    level: "intermediate",
    codeExample: "// for (i) for (j) { arr[i] == brr[j] }"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs n and inner runs n but the inner loop body is O(1)?",
    shortAnswer: "O(n²) — because n × n × O(1) = O(n²).",
    explanation: "The body is constant, so total is n².",
    hint: "Constant body.",
    level: "basic",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the time complexity of a nested loop where outer runs n and inner runs n but the inner loop body is O(log n)?",
    shortAnswer: "O(n² log n) — product of n, n, and log n.",
    explanation: "n × n × log n = n² log n.",
    hint: "Multiply.",
    level: "advanced",
    codeExample: "// O(n² log n)"
  },
  {
    question: "Can you sort in O(n²) but be faster than O(n log n) for small n?",
    shortAnswer: "Yes, for small n (e.g., n < 50), insertion sort (O(n²)) can be faster than quicksort (O(n log n)).",
    explanation: "The overhead of recursion in quicksort can make it slower for small arrays.",
    hint: "Small n.",
    level: "intermediate",
    codeExample: "// Use insertion sort for small subarrays"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=i; j<n; j+=2)?",
    shortAnswer: "O(n²) — still quadratic, but with a smaller constant factor.",
    explanation: "The inner loop runs about (n-i)/2 times, sum is still proportional to n².",
    hint: "Constant factor.",
    level: "advanced",
    codeExample: "// O(n²)"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=0; j<n; j+=i)?",
    shortAnswer: "O(n log n) — because sum_{i=1}^{n} n/i = n log n.",
    explanation: "The inner loop runs n/i times, sum gives n log n.",
    hint: "Harmonic series.",
    level: "advanced",
    codeExample: "// O(n log n)"
  }
];

export default questions;