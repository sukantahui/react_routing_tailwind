/**
 * Module 001_008: Topic 7: Algorithmic Problem 7: Implementing Recursive Binary Search
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Binary Search?",
    shortAnswer: "An optimal $O(\\log N)$ Divide-and-Conquer search algorithm that repeatedly divides a sorted array in half to find a target value.",
    explanation: "Core definition of binary search.",
    hint: "Optimal O(log N) search algorithm operating on sorted arrays.",
    level: "basic",
    codeExample: "int idx = binarySearchRecursive(sortedArr, 0, sortedArr.length - 1, target);"
  },
  {
    question: "What is the mandatory prerequisite for Binary Search to work correctly?",
    shortAnswer: "The input array must be strictly **SORTED** in ascending (or descending) order.",
    explanation: "Binary search prerequisite.",
    hint: "The array must be sorted.",
    level: "basic",
    codeExample: "// Requires Arrays.sort(arr) before binary search"
  },
  {
    question: "Why should you calculate midpoint as `mid = low + (high - low) / 2` instead of `(low + high) / 2`?",
    shortAnswer: "Because `low + high` can exceed `Integer.MAX_VALUE` ($2.14 \\times 10^9$) when searching large arrays, overflowing into negative numbers and crashing with `ArrayIndexOutOfBoundsException`.",
    explanation: "Famous Java midpoint overflow bug (Joshua Bloch, 2006).",
    hint: "Guards against 32-bit integer overflow when low + high exceeds Integer.MAX_VALUE.",
    level: "basic",
    codeExample: "int mid = low + (high - low) / 2; // Immune to overflow"
  },
  {
    question: "What is the Time Complexity of Recursive Binary Search?",
    shortAnswer: "$O(\\log_2 N)$ logarithmic time, because the search space is divided by 2 at each recursive step ($T(N) = T(N/2) + O(1)$).",
    explanation: "Binary search recurrence relation by Master Theorem.",
    hint: "O(log N) logarithmic time.",
    level: "basic",
    codeExample: "// log2(1,000,000) is approximately 20 comparisons"
  },
  {
    question: "What is the Space Complexity of Recursive Binary Search in Java?",
    shortAnswer: "$O(\\log N)$ auxiliary stack memory space, due to the call stack frames created for each recursive level up to depth $\\log_2 N$.",
    explanation: "Stack frame consumption during recursion.",
    hint: "O(log N) stack frames on the call stack.",
    level: "basic",
    codeExample: "// Max stack depth = ceil(log2 N) + 1"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the index of target roll `130` in the sorted array?",
    shortAnswer: "Index `5` (`arr[5] == 130`).",
    explanation: "Roll ID 130 search verification.",
    hint: "Index 5.",
    level: "basic",
    codeExample: "binarySearchRecursive(sortedRolls, 0, 9, 130) → 5"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was returned when searching for target `199`?",
    shortAnswer: "`-1` (element not found in sorted array).",
    explanation: "Element not found return value.",
    hint: "-1.",
    level: "basic",
    codeExample: "binarySearchRecursive(sortedRolls, 0, 9, 199) → -1"
  },
  {
    question: "What is the Base Case that signals target is NOT present in Recursive Binary Search?",
    shortAnswer: "`if (low > high) return -1;` (the search range has shrunk to zero).",
    explanation: "Recursive termination base case.",
    hint: "low > high.",
    level: "basic",
    codeExample: "if (low > high) return -1;"
  },
  {
    question: "What are the advantages of Iterative Binary Search over Recursive Binary Search?",
    shortAnswer: "Iterative binary search uses strict $O(1)$ constant memory (no stack frames) and avoids recursive method invocation overhead and StackOverflow risk.",
    explanation: "Iterative vs recursive trade-offs.",
    hint: "Iterative uses O(1) space and avoids recursive call overhead.",
    level: "basic",
    codeExample: "while (low <= high) { ... } // O(1) space"
  },
  {
    question: "How do you find the FIRST OCCURRENCE of a target in a sorted array containing duplicates?",
    shortAnswer: "When `arr[mid] == target`, check if `mid == 0 || arr[mid - 1] != target`; if true, return `mid`, otherwise continue searching the **left half** (`high = mid - 1`).",
    explanation: "First occurrence binary search modification.",
    hint: "If arr[mid] == target, check if previous element is different or recurse left.",
    level: "intermediate",
    codeExample: "if (mid == 0 || arr[mid - 1] != target) return mid; else searchLeft();"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the first occurrence index of score `70` in `{50, 60, 70, 70, 70, 80, 90}`?",
    shortAnswer: "Index `2`.",
    explanation: "First occurrence test verification.",
    hint: "Index 2.",
    level: "basic",
    codeExample: "findFirstOccurrence(scoresWithDuplicates, 0, 6, 70) → 2"
  },
  {
    question: "How do you find the LAST OCCURRENCE of a target in a sorted array containing duplicates?",
    shortAnswer: "When `arr[mid] == target`, check if `mid == arr.length - 1 || arr[mid + 1] != target`; if true, return `mid`, otherwise continue searching the **right half** (`low = mid + 1`).",
    explanation: "Last occurrence binary search modification.",
    hint: "If arr[mid] == target, check if next element is different or recurse right.",
    level: "intermediate",
    codeExample: "if (mid == n - 1 || arr[mid + 1] != target) return mid; else searchRight();"
  },
  {
    question: "What does `Arrays.binarySearch(arr, key)` return when the key is NOT found in Java?",
    shortAnswer: "`-(insertion_point + 1)`, where `insertion_point` is the index where the key would be inserted to maintain sorted order.",
    explanation: "JDK Arrays.binarySearch return contract.",
    hint: "Returns -(insertion_point + 1).",
    level: "intermediate",
    codeExample: "int result = Arrays.binarySearch(arr, 199); // Negative insertion index"
  },
  {
    question: "How many comparisons does Binary Search make at most on an array of 1,000,000 elements?",
    shortAnswer: "At most $\\lceil \\log_2(1,000,000) \\rceil + 1 = 20$ comparisons, compared to $1,000,000$ in linear search!",
    explanation: "Logarithmic scale comparison.",
    hint: "At most 20 comparisons.",
    level: "basic",
    codeExample: "ceil(log2(1,000,000)) = 20"
  },
  {
    question: "What is 'Search in Rotated Sorted Array' (LeetCode 33)?",
    shortAnswer: "An algorithm that determines which half (left or right) is sorted, and checks if target lies within the sorted half to discard the other half in $O(\\log N)$ time.",
    explanation: "Rotated sorted array search pattern.",
    hint: "Identify the sorted half and check if target lies within its bounds.",
    level: "advanced",
    codeExample: "if (arr[low] <= arr[mid]) { if (target >= arr[low] && target < arr[mid]) high = mid - 1; }"
  },
  {
    question: "Can Binary Search be applied to monotonic mathematical functions (Binary Search on Answer)?",
    shortAnswer: "YES! (e.g. finding square root `sqrt(x)` or minimum capacity in shipping problems) by binary searching the monotonic solution domain $[low, high]$.",
    explanation: "Binary search on monotonic answer space.",
    hint: "Yes, searches monotonic solution ranges like sqrt(x) or capacity problems.",
    level: "advanced",
    codeExample: "while (low <= high) { long mid = low + (high - low)/2; if (mid * mid <= x) { ans = mid; low = mid + 1; } }"
  },
  {
    question: "What is the recurrence relation for Recursive Binary Search?",
    shortAnswer: "$T(N) = T(N/2) + O(1)$, which solves to $T(N) = O(\\log N)$ by Master Theorem Case 2.",
    explanation: "Master Theorem recurrence derivation.",
    hint: "T(N) = T(N/2) + O(1) → O(log N).",
    level: "intermediate",
    codeExample: "// T(N) = T(N/2) + O(1)"
  },
  {
    question: "What happens if you run Binary Search on an UNSORTED array?",
    shortAnswer: "It produces unpredictable, incorrect results (often returning `-1` even when the target exists) because the monotonic ordering invariant is broken.",
    explanation: "Unsorted array violation consequence.",
    hint: "Returns unpredictable incorrect results due to broken sorted invariant.",
    level: "basic",
    codeExample: "// Unsorted array breaks binary search invariant"
  },
  {
    question: "What is 'Ternary Search' and how does it compare to Binary Search?",
    shortAnswer: "Ternary Search divides the range into 3 parts using 2 midpoints; it requires $2 \\log_3 N \\approx 1.26 \\log_2 N$ comparisons per step, making it slower in practice than Binary Search.",
    explanation: "Ternary search comparison.",
    hint: "Divides range into 3 parts; makes more comparisons than Binary Search.",
    level: "advanced",
    codeExample: "int mid1 = low + (high - low)/3; int mid2 = high - (high - low)/3;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the first element checked when searching for `101` in the 10-element array?",
    shortAnswer: "`mid = 0 + (9 - 0)/2 = 4` (`arr[4] == 125`). Since $125 > 101$, search recursed into left sub-array $[0..3]$.",
    explanation: "First midpoint computation step.",
    hint: "mid = 4 (arr[4] = 125), then recursed left.",
    level: "basic",
    codeExample: "low = 0, high = 9 → mid = 4"
  },
  {
    question: "What is 'Exponential Search' and when is it used?",
    shortAnswer: "Finds range $[2^{k-1}, 2^k]$ containing target by doubling indices ($1, 2, 4, 8, \\dots$), then runs binary search; optimal for unbounded or infinite streams in $O(\\log i)$ time.",
    explanation: "Exponential search for unbounded streams.",
    hint: "Doubles range indices exponentially, then applies binary search.",
    level: "advanced",
    codeExample: "int i = 1; while (i < n && arr[i] <= target) i *= 2; binarySearch(arr, i/2, Math.min(i, n-1), target);"
  },
  {
    question: "How does Bitwise Right Shift calculate midpoint (`(low + high) >>> 1`)?",
    shortAnswer: "`int mid = (low + high) >>> 1;` uses logical unsigned right shift, which automatically treats the sum as unsigned, safely preventing overflow without subtraction.",
    explanation: "Unsigned bitwise midpoint calculation.",
    hint: "(low + high) >>> 1 uses unsigned shift to prevent overflow.",
    level: "intermediate",
    codeExample: "int mid = (low + high) >>> 1;"
  },
  {
    question: "Can Binary Search find the Peak Element in an unsorted array ($arr[i] > arr[i-1]$ and $arr[i] > arr[i+1]$)?",
    shortAnswer: "YES! If `arr[mid] < arr[mid + 1]`, a peak must lie on the right; otherwise, a peak lies on the left or at mid (LeetCode 162 in $O(\\log N)$ time).",
    explanation: "Find peak element binary search application.",
    hint: "Move towards the higher adjacent neighbor to find a local peak in O(log N) time.",
    level: "advanced",
    codeExample: "if (arr[mid] < arr[mid + 1]) low = mid + 1; else high = mid;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the index of `180` (the last element)?",
    shortAnswer: "Index `9`.",
    explanation: "Boundary element lookup verification.",
    hint: "Index 9.",
    level: "basic",
    codeExample: "binarySearchRecursive(sortedRolls, 0, 9, 180) → 9"
  },
  {
    question: "What is the difference between Lower Bound and Upper Bound in C++ / Java Binary Search?",
    shortAnswer: "**Lower Bound** finds the first element $\\ge target$; **Upper Bound** finds the first element $> target$.",
    explanation: "Lower bound vs Upper bound definitions.",
    hint: "Lower bound: first element >= target; Upper bound: first element > target.",
    level: "intermediate",
    codeExample: "// Lower bound: first index where arr[i] >= target"
  },
  {
    question: "Why does Recursive Binary Search not cause `StackOverflowError` for standard array sizes?",
    shortAnswer: "Because for an array of $10^9$ elements, recursion depth is at most $\\approx 30$ stack frames, which is vastly below the default $\\approx 10,000$ JVM stack frame limit.",
    explanation: "Stack frame safety in logarithmic recursion.",
    hint: "Maximum recursion depth is only ~30 frames, well below JVM stack limits.",
    level: "basic",
    codeExample: "// Depth <= 30 frames for 1 billion items"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the size of the sorted student roll array?",
    shortAnswer: "10 elements (`length = 10`).",
    explanation: "Array length verification.",
    hint: "10 elements.",
    level: "basic",
    codeExample: "sortedRolls.length = 10"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 7 for Java developers?",
    shortAnswer: "Binary Search is the gold standard for searching sorted datasets in $O(\\log N)$ time. Always use `low + (high - low) / 2` to prevent overflow, base case `low > high`, and understand the $O(1)$ space advantage of iterative implementations.",
    explanation: "Mastery of recursive and iterative binary search.",
    hint: "O(log N) gold standard on sorted arrays; mid = low + (high - low)/2 prevents overflow.",
    level: "basic",
    codeExample: "// Summary: O(log N) | mid = low + (high - low)/2 | base case: low > high"
  },
  {
    question: "What is the next topic (Topic 8) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 8: Armstrong numbers in a given range.",
    explanation: "Topic 8 implements digit counting and Armstrong / Narcissistic number generation in ranges.",
    hint: "Algorithmic Problem 8: Armstrong numbers in a given range.",
    level: "basic",
    codeExample: "// Topic 8: Armstrong Numbers in a Given Range"
  },
  {
    question: "How does Java 21 `Arrays.binarySearch()` utilize SIMD vectorization on modern hardware?",
    shortAnswer: "HotSpot JVM JIT compiler vectorizes block comparisons for multi-byte primitives using AVX-512 register instructions when processing large sub-arrays.",
    explanation: "JIT vectorization of binary search primitives.",
    hint: "Modern JVMs vectorize block comparisons using AVX instructions.",
    level: "advanced",
    codeExample: "// HotSpot C2 SIMD vectorization in Arrays.binarySearch"
  }
];

export default questions;
