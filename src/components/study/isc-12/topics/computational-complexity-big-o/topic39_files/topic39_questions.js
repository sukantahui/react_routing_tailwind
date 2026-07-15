const questions = [
  {
    question: "What is the recurrence for recursive binary search?",
    shortAnswer: "T(n) = T(n/2) + O(1), T(1) = O(1)",
    explanation: "Each call halves the search space and does constant work.",
    hint: "Halving recurrence.",
    level: "basic",
    codeExample: "// T(n) = T(n/2) + 1"
  },
  {
    question: "What is the time complexity of recursive binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The recurrence T(n) = T(n/2) + O(1) solves to O(log n).",
    hint: "Logarithmic.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of recursive binary search?",
    shortAnswer: "O(log n) — due to the recursion stack.",
    explanation: "The recursion depth is log₂(n), so stack space is O(log n).",
    hint: "Depth = log n.",
    level: "intermediate",
    codeExample: "// O(log n) space"
  },
  {
    question: "What is the space complexity of iterative binary search?",
    shortAnswer: "O(1) — constant space.",
    explanation: "Iterative version uses only a few variables.",
    hint: "No recursion stack.",
    level: "basic",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the best-case time complexity of binary search?",
    shortAnswer: "Ω(1) — constant time.",
    explanation: "If the target is at the middle, it's found in the first comparison.",
    hint: "Target at mid.",
    level: "basic",
    codeExample: "// arr[mid] == target → Ω(1)"
  },
  {
    question: "What is the worst-case time complexity of binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "In the worst case, you need to halve the array until one element remains.",
    hint: "Target at end or not found.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the average-case time complexity of binary search?",
    shortAnswer: "Θ(log n) — logarithmic time.",
    explanation: "On average, the target is found after about log₂(n) comparisons.",
    hint: "Average is also logarithmic.",
    level: "intermediate",
    codeExample: "// Θ(log n)"
  },
  {
    question: "Why does binary search require a sorted array?",
    shortAnswer: "Because it relies on the ordering to decide which half to discard.",
    explanation: "If the array is not sorted, you can't guarantee that the target is in one half.",
    hint: "Ordering is essential.",
    level: "basic",
    codeExample: "// array must be sorted"
  },
  {
    question: "How many comparisons does binary search need for n=1,000,000?",
    shortAnswer: "At most 20 comparisons.",
    explanation: "log₂(1,000,000) ≈ 20.",
    hint: "2^20 ≈ 1,048,576.",
    level: "basic",
    codeExample: "// ~20 comparisons"
  },
  {
    question: "How do you avoid integer overflow in mid calculation?",
    shortAnswer: "Use mid = low + (high - low) / 2 instead of (low + high) / 2.",
    explanation: "low + high can overflow for large arrays; the difference approach is safe.",
    hint: "Safe mid calculation.",
    level: "intermediate",
    codeExample: "// mid = low + (high - low) / 2"
  },
  {
    question: "What is the recursion depth for binary search with n elements?",
    shortAnswer: "⌊log₂(n)⌋ + 1.",
    explanation: "The depth is the number of recursive calls needed to reach the base case.",
    hint: "log₂(n) + 1.",
    level: "intermediate",
    codeExample: "// depth = floor(log2(n)) + 1"
  },
  {
    question: "Can binary search be used on a linked list?",
    shortAnswer: "Not efficiently — binary search requires O(1) random access, which arrays provide.",
    explanation: "Linked lists require O(n) to access the middle, making binary search O(n) instead of O(log n).",
    hint: "Random access needed.",
    level: "intermediate",
    codeExample: "// Use arrays, not linked lists"
  },
  {
    question: "What is the lower bound for comparison-based search?",
    shortAnswer: "Ω(log n) — the same as binary search.",
    explanation: "Binary search achieves the optimal lower bound for comparison-based search in a sorted array.",
    hint: "Optimal.",
    level: "advanced",
    codeExample: "// Ω(log n) lower bound"
  },
  {
    question: "How does binary search handle duplicates?",
    shortAnswer: "It finds one occurrence; for first/last occurrence, you need to modify the algorithm.",
    explanation: "Standard binary search stops at any match; to find the first or last, you continue searching.",
    hint: "Duplicates.",
    level: "advanced",
    codeExample: "// first/last occurrence"
  },
  {
    question: "What is the time complexity of finding the first occurrence in a sorted array with duplicates?",
    shortAnswer: "O(log n) — still logarithmic.",
    explanation: "You continue searching left after finding a match.",
    hint: "Continue searching left.",
    level: "advanced",
    codeExample: "// first occurrence O(log n)"
  },
  {
    question: "What is the time complexity of finding the last occurrence in a sorted array with duplicates?",
    shortAnswer: "O(log n) — still logarithmic.",
    explanation: "You continue searching right after finding a match.",
    hint: "Continue searching right.",
    level: "advanced",
    codeExample: "// last occurrence O(log n)"
  },
  {
    question: "Can recursive binary search cause a stack overflow?",
    shortAnswer: "Yes, for very large arrays (e.g., n > 10^6 in Java with default stack size).",
    explanation: "The recursion depth is log₂(n), so for n=10^9, depth=30 — usually safe. But for n=10^6, depth=20, still safe. However, in Java, recursion depth is limited by stack size, so it can overflow if log₂(n) exceeds ~10,000 (which is impossible for practical arrays). So it's generally safe.",
    hint: "Depth is small.",
    level: "intermediate",
    codeExample: "// depth ≤ 31 for n ≤ 2^31"
  },
  {
    question: "What is the time complexity of Java's Arrays.binarySearch()?",
    shortAnswer: "O(log n) — it uses the standard binary search algorithm.",
    explanation: "It's optimized and handles edge cases.",
    hint: "Built-in binary search.",
    level: "basic",
    codeExample: "// Arrays.binarySearch(arr, key)"
  },
  {
    question: "What does Arrays.binarySearch() return when the element is not found?",
    shortAnswer: "-(insertion point) - 1, where insertion point is the index where the element would be inserted.",
    explanation: "This allows you to find where to insert the element to maintain sorted order.",
    hint: "Negative value.",
    level: "intermediate",
    codeExample: "// returns -(insertionPoint) - 1"
  },
  {
    question: "What is the time complexity of binary search compared to linear search?",
    shortAnswer: "Binary search is O(log n), linear search is O(n) — much faster for large n.",
    explanation: "For n=1,000,000, binary search uses 20 comparisons, linear search uses 1,000,000.",
    hint: "Much faster.",
    level: "basic",
    codeExample: "// O(log n) vs O(n)"
  },
  {
    question: "Can binary search be used for floating-point numbers?",
    shortAnswer: "Yes, binary search works for any comparable data type.",
    explanation: "Arrays of double or float can be searched as long as they are sorted.",
    hint: "Any comparable type.",
    level: "intermediate",
    codeExample: "// double[] arr"
  },
  {
    question: "What is the time complexity of binary search on an array of size 2^n?",
    shortAnswer: "O(n) — because log₂(2^n) = n.",
    explanation: "The number of steps is equal to n.",
    hint: "n steps.",
    level: "intermediate",
    codeExample: "// n comparisons"
  },
  {
    question: "Can binary search be parallelized?",
    shortAnswer: "Yes, but it's not common because it's already logarithmic and parallelization adds overhead.",
    explanation: "You could search multiple ranges in parallel, but the overhead usually outweighs the benefit.",
    hint: "Not usually needed.",
    level: "advanced",
    codeExample: "// Not typical"
  },
  {
    question: "What is the time complexity of interpolation search?",
    shortAnswer: "O(log log n) average, O(n) worst-case.",
    explanation: "Interpolation search is faster on average for uniformly distributed data.",
    hint: "Better on average.",
    level: "advanced",
    codeExample: "// O(log log n) average"
  },
  {
    question: "How does binary search compare to hash table lookup?",
    shortAnswer: "Hash table lookup is O(1) average, but requires a hash function and more memory.",
    explanation: "Binary search is O(log n) and needs sorted data; hash tables are O(1) but use more memory.",
    hint: "Trade-off.",
    level: "intermediate",
    codeExample: "// HashMap get() O(1)"
  },
  {
    question: "What is the recurrence for binary search in terms of steps?",
    shortAnswer: "S(n) = S(n/2) + 1, S(1) = 1 → O(log n).",
    explanation: "Each comparison reduces the size by half.",
    hint: "S(n) = S(n/2) + 1.",
    level: "intermediate",
    codeExample: "// S(n) = S(n/2) + 1"
  },
  {
    question: "How many elements can be searched with 20 comparisons in binary search?",
    shortAnswer: "Up to 2^20 = 1,048,576 elements.",
    explanation: "With k comparisons, binary search can handle up to 2^k elements.",
    hint: "2^20 elements.",
    level: "basic",
    codeExample: "// 1,048,576 elements"
  },
  {
    question: "What is the time complexity of binary search in terms of Big-O?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The number of operations is proportional to log₂(n).",
    hint: "Logarithmic.",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "Why is binary search considered an optimal search algorithm for sorted arrays?",
    shortAnswer: "Because it achieves the theoretical lower bound of Ω(log n) for comparison-based search.",
    explanation: "No comparison-based search can do better than O(log n) on a sorted array.",
    hint: "Optimal lower bound.",
    level: "advanced",
    codeExample: "// Ω(log n) lower bound"
  },
  {
    question: "What is the time complexity of finding an element in a sorted array using recursive binary search?",
    shortAnswer: "O(log n) — logarithmic time.",
    explanation: "The recurrence T(n) = T(n/2) + O(1) gives O(log n).",
    hint: "O(log n).",
    level: "basic",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of recursive binary search if the array is very large?",
    shortAnswer: "O(log n) — still logarithmic; the stack depth is log₂(n).",
    explanation: "The depth is never more than log₂(n), so it's O(log n).",
    hint: "Depth = log n.",
    level: "intermediate",
    codeExample: "// O(log n) space"
  }
];

export default questions;