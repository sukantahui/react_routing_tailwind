const questions = [
  {
    question: "What does O(n log n) mean in time complexity?",
    shortAnswer: "Linearithmic time — the runtime grows as n multiplied by log₂(n).",
    explanation: "It's the product of linear and logarithmic growth, common in efficient sorting algorithms.",
    hint: "Think of divide and conquer with O(n) work per level.",
    level: "basic",
    codeExample: "// merge sort, heap sort"
  },
  {
    question: "What is an example of an O(n log n) algorithm?",
    shortAnswer: "Merge sort, heap sort, and quicksort (average case).",
    explanation: "These algorithms divide the input and do O(n) work at each of log n levels.",
    hint: "Efficient sorting.",
    level: "basic",
    codeExample: "// mergeSort(arr);"
  },
  {
    question: "Why is O(n log n) the best for comparison-based sorting?",
    shortAnswer: "Because the theoretical lower bound for comparison-based sorting is Ω(n log n).",
    explanation: "You can't sort arbitrary data faster than O(n log n) using only comparisons.",
    hint: "Lower bound.",
    level: "intermediate",
    codeExample: "// comparison-based sorting lower bound"
  },
  {
    question: "Is O(n log n) faster than O(n²)?",
    shortAnswer: "Yes, O(n log n) is much faster for large n.",
    explanation: "For n=10,000, n log n ≈ 140,000, while n² = 100,000,000.",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// O(n log n) << O(n²)"
  },
  {
    question: "Is O(n log n) slower than O(n)?",
    shortAnswer: "Yes, O(n) is faster than O(n log n).",
    explanation: "Linear time is better than linearithmic time.",
    hint: "Compare growth rates.",
    level: "basic",
    codeExample: "// O(n) < O(n log n)"
  },
  {
    question: "What is the recurrence for merge sort?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), which solves to O(n log n).",
    explanation: "Two recursive calls on half the input, plus O(n) work to merge.",
    hint: "Divide and conquer.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the average-case time complexity of quicksort?",
    shortAnswer: "O(n log n) — average case.",
    explanation: "With good pivot selection, quicksort is O(n log n) on average.",
    hint: "Average case.",
    level: "intermediate",
    codeExample: "// quicksort average O(n log n)"
  },
  {
    question: "What is the worst-case time complexity of quicksort?",
    shortAnswer: "O(n²) — when the pivot is always the smallest or largest.",
    explanation: "Poor pivot selection leads to unbalanced partitions.",
    hint: "Bad pivot.",
    level: "intermediate",
    codeExample: "// quicksort worst O(n²)"
  },
  {
    question: "What is the time complexity of heap sort?",
    shortAnswer: "O(n log n) in all cases (worst, best, average).",
    explanation: "Heap sort is O(n log n) regardless of input.",
    hint: "All cases.",
    level: "intermediate",
    codeExample: "// heap sort O(n log n)"
  },
  {
    question: "What is the time complexity of Timsort?",
    shortAnswer: "O(n log n) worst-case, O(n) best-case (for nearly sorted data).",
    explanation: "Timsort is a hybrid sorting algorithm used in Java and Python.",
    hint: "Hybrid sort.",
    level: "advanced",
    codeExample: "// Arrays.sort() uses Timsort"
  },
  {
    question: "Can you sort in O(n) using comparisons?",
    shortAnswer: "No, the lower bound for comparison-based sorting is Ω(n log n).",
    explanation: "You need non-comparison sorts (like counting sort) for O(n).",
    hint: "Lower bound.",
    level: "intermediate",
    codeExample: "// Not possible with comparisons"
  },
  {
    question: "What is the time complexity of counting sort?",
    shortAnswer: "O(n + k) where k is the range of input values.",
    explanation: "It's O(n) when k is O(n), but it's not comparison-based.",
    hint: "Non-comparison sort.",
    level: "advanced",
    codeExample: "// counting sort O(n+k)"
  },
  {
    question: "What is the time complexity of radix sort?",
    shortAnswer: "O(d·(n+b)) where d is digits and b is base.",
    explanation: "It's O(n) when digits are constant.",
    hint: "Non-comparison sort.",
    level: "advanced",
    codeExample: "// radix sort"
  },
  {
    question: "How many comparisons does merge sort make for n=1,000,000?",
    shortAnswer: "Approximately n log₂(n) ≈ 20,000,000 comparisons.",
    explanation: "n log₂(n) = 1,000,000 × 20 = 20,000,000.",
    hint: "n log n.",
    level: "intermediate",
    codeExample: "// ~20 million comparisons"
  },
  {
    question: "Is O(n log n) considered efficient?",
    shortAnswer: "Yes, O(n log n) is considered efficient for sorting large datasets.",
    explanation: "It's the best we can do for comparison-based sorting.",
    hint: "Gold standard.",
    level: "basic",
    codeExample: "// O(n log n) is efficient"
  },
  {
    question: "What is the time complexity of Java's Arrays.sort() for objects?",
    shortAnswer: "O(n log n) — it uses Timsort (a hybrid of merge sort and insertion sort).",
    explanation: "Timsort is stable and efficient.",
    hint: "Java built-in sort.",
    level: "intermediate",
    codeExample: "// Arrays.sort(array);"
  },
  {
    question: "What is the time complexity of Java's Arrays.sort() for primitives?",
    shortAnswer: "O(n log n) — uses Dual-Pivot QuickSort.",
    explanation: "For primitives, it uses a tuned version of quicksort.",
    hint: "Primitive sort.",
    level: "intermediate",
    codeExample: "// Arrays.sort(int[]);"
  },
  {
    question: "Can O(n log n) be achieved with a single loop?",
    shortAnswer: "No, O(n log n) typically requires nested loops or recursion.",
    explanation: "A single loop is usually O(n); O(n log n) requires splitting the problem.",
    hint: "Nested or recursive.",
    level: "intermediate",
    codeExample: "// Not with a single loop"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=1; j<n; j*=2)?",
    shortAnswer: "O(n log n) — outer loop O(n), inner loop O(log n).",
    explanation: "Total = n × log n.",
    hint: "Multiply.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the time complexity of the following: for (i=1; i<n; i*=2) for (j=0; j<n; j++)?",
    shortAnswer: "O(n log n) — outer loop O(log n), inner loop O(n).",
    explanation: "Total = log n × n.",
    hint: "Multiply.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the time complexity of a recursive function that splits input in half and does O(n) work per call?",
    shortAnswer: "O(n log n) — recurrence T(n) = 2T(n/2) + O(n).",
    explanation: "There are log n levels, and each does O(n) work.",
    hint: "Merge sort pattern.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the time complexity of a recursive function that splits input in half and does O(1) work per call?",
    shortAnswer: "O(n) — recurrence T(n) = 2T(n/2) + O(1).",
    explanation: "The work per level is O(1), so total is O(n).",
    hint: "Tree traversal.",
    level: "advanced",
    codeExample: "// T(n) = 2T(n/2) + 1"
  },
  {
    question: "Can O(n log n) be slower than O(n²) for small n?",
    shortAnswer: "Yes, for very small n, the constants in O(n log n) might make it slower.",
    explanation: "For n=10, O(n log n) ≈ 33, O(n²) = 100 — O(n log n) is actually faster in this case.",
    hint: "Constants matter.",
    level: "intermediate",
    codeExample: "// Depends on n"
  },
  {
    question: "What is the time complexity of the n log n lower bound proof?",
    shortAnswer: "Based on the decision tree model: n! possible permutations, and each comparison gives at most 2 outcomes.",
    explanation: "log₂(n!) = Θ(n log n) by Stirling's approximation.",
    hint: "Decision tree.",
    level: "advanced",
    codeExample: "// Lower bound proof"
  },
  {
    question: "What is the time complexity of external sort (sorting large files)?",
    shortAnswer: "O(n log n) — but with I/O costs, the constant factor is much larger.",
    explanation: "External sorting uses merge sort with multiple passes.",
    hint: "Large data.",
    level: "advanced",
    codeExample: "// external sort"
  },
  {
    question: "What is the time complexity of sorting with a balanced BST?",
    shortAnswer: "O(n log n) — inserting n elements into a balanced BST is O(n log n).",
    explanation: "Each insertion is O(log n), so n insertions = O(n log n).",
    hint: "BST insertion.",
    level: "intermediate",
    codeExample: "// tree insert n times"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=i; j<n; j*=2)?",
    shortAnswer: "O(n log n) — for each i, inner loop runs log n times.",
    explanation: "Total = n × log n.",
    hint: "Log inner.",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the time complexity of the following: for (i=1; i<n; i*=2) for (j=0; j<i; j++)?",
    shortAnswer: "O(n) — actually O(2n) = O(n).",
    explanation: "When i doubles, the inner loop runs i times. Sum of i values = 1+2+4+...+n = O(n).",
    hint: "Geometric series.",
    level: "advanced",
    codeExample: "// O(n)"
  },
  {
    question: "What is the time complexity of the following: for (i=0; i<n; i++) for (j=0; j<i; j*=2)?",
    shortAnswer: "O(n log n) — sum_{i=0}^{n} log i = O(n log n).",
    explanation: "Inner loop runs log i times, sum is O(n log n).",
    hint: "Sum of logs.",
    level: "advanced",
    codeExample: "// O(n log n)"
  }
];

export default questions;