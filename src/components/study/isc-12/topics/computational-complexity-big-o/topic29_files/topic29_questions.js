const questions = [
  {
    question: "What is the average-case time complexity of quicksort?",
    shortAnswer: "O(n log n) — linearithmic time.",
    explanation: "With good pivot selection, quicksort divides the array into roughly equal halves.",
    hint: "Average case is n log n.",
    level: "basic",
    codeExample: "// quicksort average O(n log n)"
  },
  {
    question: "What is the worst-case time complexity of quicksort?",
    shortAnswer: "O(n²) — quadratic time.",
    explanation: "When the pivot is always the smallest or largest element, partitions are unbalanced.",
    hint: "Bad pivot selection.",
    level: "basic",
    codeExample: "// quicksort worst O(n²)"
  },
  {
    question: "What is the best-case time complexity of quicksort?",
    shortAnswer: "Ω(n log n) — linearithmic time.",
    explanation: "When the pivot always splits the array into two equal halves.",
    hint: "Balanced partitions.",
    level: "intermediate",
    codeExample: "// quicksort best Ω(n log n)"
  },
  {
    question: "What is the recurrence for quicksort in the best/average case?",
    shortAnswer: "T(n) = 2T(n/2) + O(n), T(1) = O(1)",
    explanation: "Two recursive calls on balanced halves, plus O(n) work for partitioning.",
    hint: "Balanced partitions.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n/2) + n"
  },
  {
    question: "What is the recurrence for quicksort in the worst case?",
    shortAnswer: "T(n) = T(n-1) + O(n), T(1) = O(1)",
    explanation: "One empty partition, one partition of size n-1, plus O(n) work for partitioning.",
    hint: "Unbalanced partitions.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + n"
  },
  {
    question: "What is the space complexity of quicksort?",
    shortAnswer: "O(log n) — for the recursion stack in the average case.",
    explanation: "The recursion depth is O(log n) when partitions are balanced.",
    hint: "Recursion stack.",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the worst-case space complexity of quicksort?",
    shortAnswer: "O(n) — for the recursion stack in the worst case.",
    explanation: "When partitions are unbalanced, recursion depth can be O(n).",
    hint: "Worst-case recursion depth.",
    level: "advanced",
    codeExample: "// O(n) worst-case space"
  },
  {
    question: "Is quicksort an in-place algorithm?",
    shortAnswer: "Yes, quicksort sorts the array in place with O(log n) extra space.",
    explanation: "No additional arrays are created; all sorting happens within the original array.",
    hint: "In-place.",
    level: "basic",
    codeExample: "// in-place"
  },
  {
    question: "Is quicksort stable?",
    shortAnswer: "No, quicksort is not stable.",
    explanation: "Equal elements may not preserve their relative order.",
    hint: "Unstable.",
    level: "intermediate",
    codeExample: "// not stable"
  },
  {
    question: "Why does pivot choice affect quicksort performance?",
    shortAnswer: "A bad pivot leads to unbalanced partitions and O(n²) time.",
    explanation: "The pivot determines how the array is split; unbalanced splits cause many recursive calls.",
    hint: "Pivot decides balance.",
    level: "intermediate",
    codeExample: "// pivot matters"
  },
  {
    question: "What is the median-of-three pivot strategy?",
    shortAnswer: "Choosing the median of the first, middle, and last elements as the pivot.",
    explanation: "This reduces the chance of worst-case behavior.",
    hint: "Median of three.",
    level: "advanced",
    codeExample: "// median-of-three pivot"
  },
  {
    question: "How does random pivot selection help quicksort?",
    shortAnswer: "It eliminates the O(n²) worst-case for sorted or nearly sorted data.",
    explanation: "Randomizing the pivot makes the probability of worst-case behavior negligible.",
    hint: "Randomization.",
    level: "intermediate",
    codeExample: "// random pivot"
  },
  {
    question: "Why do optimized quicksorts switch to insertion sort for small subarrays?",
    shortAnswer: "Insertion sort has lower overhead and is faster for small n (n < 20).",
    explanation: "The recursive overhead of quicksort outweighs the benefits for small arrays.",
    hint: "Overhead reduction.",
    level: "advanced",
    codeExample: "// switch to insertion sort for n < 20"
  },
  {
    question: "What is the time complexity of quicksort with random pivot?",
    shortAnswer: "O(n log n) with very high probability.",
    explanation: "Random pivot selection makes worst-case O(n²) extremely unlikely.",
    hint: "High probability.",
    level: "advanced",
    codeExample: "// O(n log n) expected"
  },
  {
    question: "How does quicksort compare to merge sort?",
    shortAnswer: "Quicksort is faster in practice but has O(n²) worst-case; merge sort is O(n log n) guaranteed but uses O(n) space.",
    explanation: "Quicksort is in-place and usually faster, but merge sort is stable and guaranteed.",
    hint: "Speed vs guarantee.",
    level: "intermediate",
    codeExample: "// quicksort vs merge sort"
  },
  {
    question: "What is the time complexity of quicksort on an already sorted array?",
    shortAnswer: "O(n²) if pivot is the first or last element; O(n log n) with random or median-of-three pivot.",
    explanation: "Sorted array causes unbalanced partitions with first/last pivot.",
    hint: "Depends on pivot.",
    level: "intermediate",
    codeExample: "// sorted array with first pivot → O(n²)"
  },
  {
    question: "What is the time complexity of quicksort on a reverse-sorted array?",
    shortAnswer: "O(n²) if pivot is the first or last element; O(n log n) with random or median-of-three pivot.",
    explanation: "Reverse sorted also causes unbalanced partitions with first/last pivot.",
    hint: "Same as sorted.",
    level: "intermediate",
    codeExample: "// reverse sorted with first pivot → O(n²)"
  },
  {
    question: "What is the partition function in quicksort?",
    shortAnswer: "It rearranges the array so that all elements < pivot are on the left and all > pivot on the right.",
    explanation: "The partition step is O(n) and is the key to quicksort's divide-and-conquer approach.",
    hint: "Rearranges around pivot.",
    level: "basic",
    codeExample: "// partition(arr, low, high)"
  },
  {
    question: "How many recursive calls does quicksort make in the worst case?",
    shortAnswer: "O(n) recursive calls.",
    explanation: "In the worst case, each partition reduces the size by 1, leading to n recursive calls.",
    hint: "Unbalanced partitions.",
    level: "advanced",
    codeExample: "// O(n) recursive calls"
  },
  {
    question: "How many recursive calls does quicksort make in the best case?",
    shortAnswer: "O(log n) recursive calls (depth).",
    explanation: "Balanced partitions lead to a recursion depth of O(log n).",
    hint: "Balanced partitions.",
    level: "advanced",
    codeExample: "// O(log n) depth"
  },
  {
    question: "What is the dual-pivot quicksort?",
    shortAnswer: "A variant that uses two pivots and partitions the array into three parts.",
    explanation: "Used in Java's Arrays.sort() for primitives; it's faster than single-pivot quicksort.",
    hint: "Two pivots.",
    level: "advanced",
    codeExample: "// Java's Arrays.sort() uses dual-pivot"
  },
  {
    question: "What is the time complexity of dual-pivot quicksort?",
    shortAnswer: "O(n log n) average, O(n²) worst-case.",
    explanation: "Dual-pivot quicksort has better constants and works well on average.",
    hint: "Same complexity, faster in practice.",
    level: "advanced",
    codeExample: "// O(n log n) average"
  },
  {
    question: "Can quicksort be implemented iteratively?",
    shortAnswer: "Yes, using an explicit stack to manage subarray ranges.",
    explanation: "Iterative quicksort avoids recursion depth issues.",
    hint: "Explicit stack.",
    level: "advanced",
    codeExample: "// iterative quicksort"
  },
  {
    question: "What is the space complexity of iterative quicksort?",
    shortAnswer: "O(n) in the worst case (for the stack) and O(log n) on average.",
    explanation: "The explicit stack stores subarray ranges.",
    hint: "Stack space.",
    level: "advanced",
    codeExample: "// O(n) worst-case stack"
  },
  {
    question: "Why is quicksort preferred over merge sort for in-place sorting?",
    shortAnswer: "Because quicksort uses O(log n) space vs merge sort's O(n) space.",
    explanation: "Quicksort sorts in place, making it more memory efficient.",
    hint: "Memory efficiency.",
    level: "intermediate",
    codeExample: "// quicksort is in-place"
  },
  {
    question: "What is the time complexity of quicksort with median-of-three pivot on average?",
    shortAnswer: "O(n log n) — similar to standard quicksort.",
    explanation: "Median-of-three improves the average case but doesn't change the asymptotic complexity.",
    hint: "Still O(n log n).",
    level: "advanced",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the worst-case time complexity of quicksort with median-of-three pivot?",
    shortAnswer: "O(n²) — but it's extremely rare.",
    explanation: "Median-of-three makes worst-case much less likely but doesn't eliminate it.",
    hint: "Rare but possible.",
    level: "advanced",
    codeExample: "// O(n²) possible"
  },
  {
    question: "What is the time complexity of quicksort on random data with random pivot?",
    shortAnswer: "O(n log n) expected.",
    explanation: "Random pivot on random data gives good average-case performance.",
    hint: "Expected O(n log n).",
    level: "intermediate",
    codeExample: "// O(n log n)"
  },
  {
    question: "What is the lower bound for comparison-based sorting?",
    shortAnswer: "Ω(n log n).",
    explanation: "Quicksort achieves this lower bound on average.",
    hint: "Lower bound.",
    level: "advanced",
    codeExample: "// Ω(n log n)"
  },
  {
    question: "What is the time complexity of quicksort on an array with all equal elements?",
    shortAnswer: "O(n²) with naive partition, O(n log n) with a partition that handles duplicates.",
    explanation: "A naive partition puts all equal elements on one side, causing O(n²).",
    hint: "Handles duplicates.",
    level: "advanced",
    codeExample: "// can be O(n²) or O(n log n)"
  }
];

export default questions;