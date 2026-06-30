const questions = [
  {
    question: "What is the recurrence for merge sort?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), T(1) = O(1)",
    explanation: "Two recursive calls on half the input, plus O(n) work to merge.",
    hint: "Divide and conquer.",
    level: "basic",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the time complexity of merge sort?",
    shortAnswer: "O(n log n) in all cases (best, worst, average).",
    explanation: "The recurrence T(n) = 2T(n/2) + O(n) solves to O(n log n).",
    hint: "n log n.",
    level: "basic",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the space complexity of merge sort?",
    shortAnswer: "O(n) — for the auxiliary array used during merging.",
    explanation: "The merge step requires a temporary array of size n.",
    hint: "Auxiliary array.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "Is merge sort stable?",
    shortAnswer: "Yes, merge sort is stable.",
    explanation: "Equal elements preserve their relative order during merging.",
    hint: "Stable sort.",
    level: "intermediate",
    codeExample: "// stable"
  },
  {
    question: "What is the best-case time complexity of merge sort?",
    shortAnswer: "Θ(n log n) — the same as worst-case.",
    explanation: "Merge sort always divides and merges, regardless of input order.",
    hint: "All cases same.",
    level: "basic",
    codeExample: "// Θ(n log n)"
  },
  {
    question: "What is the worst-case time complexity of merge sort?",
    shortAnswer: "Θ(n log n) — the same as best-case.",
    explanation: "No matter the input, merge sort performs O(n log n) comparisons.",
    hint: "Guaranteed.",
    level: "basic",
    codeExample: "// Θ(n log n)"
  },
  {
    question: "How many comparisons does merge sort make for n elements?",
    shortAnswer: "About n log₂(n) comparisons in all cases.",
    explanation: "The exact number is between (n log₂(n))/2 and n log₂(n) - n.",
    hint: "n log n.",
    level: "intermediate",
    codeExample: "// ~n log n comparisons"
  },
  {
    question: "What is the main advantage of merge sort over quicksort?",
    shortAnswer: "Merge sort has guaranteed O(n log n) performance and is stable.",
    explanation: "Quicksort can be O(n²) in the worst case; merge sort is always O(n log n).",
    hint: "Guaranteed performance.",
    level: "intermediate",
    codeExample: "// merge sort is guaranteed"
  },
  {
    question: "What is the main disadvantage of merge sort?",
    shortAnswer: "It uses O(n) extra space, unlike quicksort which is in-place.",
    explanation: "The temporary array doubles the memory usage.",
    hint: "Extra space.",
    level: "basic",
    codeExample: "// O(n) space"
  },
  {
    question: "How does merge sort work?",
    shortAnswer: "Divide the array into halves, recursively sort each half, then merge them.",
    explanation: "This is the classic divide-and-conquer approach.",
    hint: "Divide and conquer.",
    level: "basic",
    codeExample: "// split, sort, merge"
  },
  {
    question: "What is the iterative version of merge sort?",
    shortAnswer: "Bottom-up merge sort that merges subarrays of size 1, 2, 4, etc.",
    explanation: "It avoids recursion by using nested loops.",
    hint: "Bottom-up.",
    level: "advanced",
    codeExample: "// iterative merge sort"
  },
  {
    question: "What is the space complexity of recursive merge sort?",
    shortAnswer: "O(n) for the array plus O(log n) for the recursion stack = O(n).",
    explanation: "The recursion depth is O(log n), so stack space is O(log n).",
    hint: "Stack space.",
    level: "intermediate",
    codeExample: "// O(n + log n) = O(n)"
  },
  {
    question: "What is the space complexity of iterative merge sort?",
    shortAnswer: "O(n) for the temporary array, but O(1) stack space.",
    explanation: "Iterative merge sort avoids the recursion stack.",
    hint: "No recursion stack.",
    level: "intermediate",
    codeExample: "// O(n) space"
  },
  {
    question: "Can merge sort be used for linked lists?",
    shortAnswer: "Yes, merge sort works well on linked lists.",
    explanation: "For linked lists, merge sort is O(n log n) with O(1) extra space.",
    hint: "Works on linked lists.",
    level: "advanced",
    codeExample: "// linked list merge sort"
  },
  {
    question: "Why is merge sort preferred for linked lists?",
    shortAnswer: "Because it doesn't require random access and uses O(1) extra space on linked lists.",
    explanation: "Arrays require O(n) space for merging; linked lists can be merged in place.",
    hint: "No random access needed.",
    level: "advanced",
    codeExample: "// O(1) space for linked lists"
  },
  {
    question: "What is Timsort?",
    shortAnswer: "A hybrid sorting algorithm that uses merge sort and insertion sort.",
    explanation: "Timsort is used in Java and Python; it's efficient for real-world data.",
    hint: "Hybrid sort.",
    level: "advanced",
    codeExample: "// Arrays.sort() uses Timsort"
  },
  {
    question: "What is the time complexity of Timsort?",
    shortAnswer: "O(n log n) worst-case, O(n) best-case (for already sorted data).",
    explanation: "Timsort is adaptive and fast on nearly sorted data.",
    hint: "Adaptive.",
    level: "advanced",
    codeExample: "// O(n log n) worst, O(n) best"
  },
  {
    question: "How does merge sort compare to heap sort?",
    shortAnswer: "Both are O(n log n), but merge sort is stable and uses O(n) space; heap sort is in-place but unstable.",
    explanation: "Heap sort uses O(1) space, merge sort uses O(n) space.",
    hint: "Stability vs space.",
    level: "advanced",
    codeExample: "// merge sort stable, heap sort in-place"
  },
  {
    question: "How many levels are in the merge sort recursion tree?",
    shortAnswer: "log₂(n) levels.",
    explanation: "Each level divides the array into halves, so depth is log₂(n).",
    hint: "log₂(n) levels.",
    level: "intermediate",
    codeExample: "// log₂(n) levels"
  },
  {
    question: "How much work is done at each level of merge sort?",
    shortAnswer: "O(n) work at each level.",
    explanation: "At each level, the total work of merging is O(n).",
    hint: "n work per level.",
    level: "intermediate",
    codeExample: "// O(n) per level"
  },
  {
    question: "What is the total work in merge sort?",
    shortAnswer: "n × log₂(n) = O(n log n).",
    explanation: "O(n) work per level × log₂(n) levels.",
    hint: "n × log n.",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "Can merge sort be parallelized?",
    shortAnswer: "Yes, merge sort is easy to parallelize because the subproblems are independent.",
    explanation: "The two halves can be sorted in parallel.",
    hint: "Easy to parallelize.",
    level: "advanced",
    codeExample: "// parallel merge sort"
  },
  {
    question: "What is the time complexity of parallel merge sort?",
    shortAnswer: "O(n) with enough processors, or O(n log n / p) with p processors.",
    explanation: "Parallel merge sort can be significantly faster on multi-core systems.",
    hint: "Parallel speedup.",
    level: "advanced",
    codeExample: "// O(n) with enough processors"
  },
  {
    question: "What is the lower bound for comparison-based sorting?",
    shortAnswer: "Ω(n log n).",
    explanation: "Merge sort achieves this lower bound.",
    hint: "Optimal lower bound.",
    level: "advanced",
    codeExample: "// Ω(n log n)"
  },
  {
    question: "Is merge sort an in-place sorting algorithm?",
    shortAnswer: "No, it uses O(n) extra space for the temporary array.",
    explanation: "In-place merge sort is possible but complex and rarely used.",
    hint: "Not in-place.",
    level: "basic",
    codeExample: "// not in-place"
  },
  {
    question: "What is the memory usage of merge sort for an array of size n?",
    shortAnswer: "O(n) for the temporary array + O(log n) for recursion stack = O(n).",
    explanation: "The temporary array is the main memory consumer.",
    hint: "O(n) total.",
    level: "intermediate",
    codeExample: "// O(n) memory"
  },
  {
    question: "How does merge sort handle large datasets?",
    shortAnswer: "It works well for large datasets, but the O(n) space can be a limitation.",
    explanation: "For very large datasets, external merge sort is used (sorting on disk).",
    hint: "Works for large data.",
    level: "advanced",
    codeExample: "// external merge sort"
  },
  {
    question: "What is external merge sort?",
    shortAnswer: "A version of merge sort that sorts data that doesn't fit in memory.",
    explanation: "It uses disk storage and multiple passes.",
    hint: "Sorting on disk.",
    level: "advanced",
    codeExample: "// external sort"
  },
  {
    question: "What is the time complexity of external merge sort?",
    shortAnswer: "O(n log n) but with I/O costs, the constant factor is much larger.",
    explanation: "The number of passes over the data is O(log n).",
    hint: "I/O cost.",
    level: "advanced",
    codeExample: "// O(n log n) with I/O"
  },
  {
    question: "Why is merge sort considered a 'divide and conquer' algorithm?",
    shortAnswer: "Because it divides the problem into smaller subproblems and conquers them recursively.",
    explanation: "The divide step splits the array; the conquer step sorts and merges.",
    hint: "Divide, conquer, combine.",
    level: "basic",
    codeExample: "// divide and conquer"
  },
  {
    question: "What is the average-case time complexity of merge sort?",
    shortAnswer: "Θ(n log n) — same as worst and best.",
    explanation: "Merge sort is Θ(n log n) in all cases.",
    hint: "All cases.",
    level: "basic",
    codeExample: "// Θ(n log n)"
  }
];

export default questions;