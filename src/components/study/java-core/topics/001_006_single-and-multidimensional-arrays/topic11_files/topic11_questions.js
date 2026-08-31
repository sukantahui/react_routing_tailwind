/**
 * Module 001_006: Topic 11: Searching in arrays: Linear Search algorithm and Binary Search on sorted arrays
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary difference between Linear Search and Binary Search?",
    shortAnswer: "Linear Search operates in $O(N)$ time on unsorted arrays by checking elements sequentially; Binary Search operates in $O(\\log N)$ time by halving search space, but REQUIRES a strictly sorted array.",
    explanation: "Preconditions and Big-O efficiency comparison.",
    hint: "Linear search works on unsorted arrays (O(N)); binary search requires sorted array (O(log N)).",
    level: "basic",
    codeExample: "// Linear Search: O(N) | Binary Search: O(log N)"
  },
  {
    question: "Why should you calculate the midpoint in Binary Search as `mid = low + (high - low) / 2` instead of `(low + high) / 2`?",
    shortAnswer: "Because `(low + high)` can exceed `Integer.MAX_VALUE` (2,147,483,647) when searching very large arrays, overflowing to a negative integer and causing `ArrayIndexOutOfBoundsException`.",
    explanation: "Famous Java integer overflow bug discovered by Joshua Bloch in 2006.",
    hint: "Prevents integer arithmetic overflow when low + high exceeds Integer.MAX_VALUE.",
    level: "intermediate",
    codeExample: "int mid = low + (high - low) / 2; // Overflow safe!"
  },
  {
    question: "What is the Worst-Case Time Complexity of Linear Search on an array of length $N$?",
    shortAnswer: "$O(N)$ linear time (when the target is at the last index or not present).",
    explanation: "Must inspect all $N$ elements.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "// O(N) worst-case comparisons"
  },
  {
    question: "What is the Worst-Case Time Complexity of Binary Search on an array of length $N$?",
    shortAnswer: "$O(\\log_2 N)$ logarithmic time.",
    explanation: "Search space is halved on each comparison step ($2^k \\approx N \\implies k = \\log_2 N$).",
    hint: "O(log N) logarithmic time.",
    level: "basic",
    codeExample: "// For N = 1,000,000 elements, Binary Search takes at most 20 comparisons!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee records, how many comparisons does Binary Search take for $N=1,000,000$ accounts?",
    shortAnswer: "At most 20 comparisons ($\log_2(1,000,000) \\approx 19.93$), compared to 1,000,000 comparisons in Linear Search in Indian Rupees (₹).",
    explanation: "Demonstrates the power of logarithmic scaling.",
    hint: "At most 20 comparisons versus 1 million.",
    level: "basic",
    codeExample: "// 20 steps vs 1,000,000 steps"
  },
  {
    question: "What does `Arrays.binarySearch(arr, target)` return if the target element is NOT found in the array?",
    shortAnswer: "`-(insertion_point + 1)`, where `insertion_point` is the index where the target would be inserted to maintain sorted order.",
    explanation: "Standard JDK binary search return protocol.",
    hint: "Returns -(insertion_point + 1).",
    level: "intermediate",
    codeExample: "int idx = Arrays.binarySearch(arr, missing);\nint insertPos = -(idx + 1);"
  },
  {
    question: "What happens if you run `Arrays.binarySearch()` on an UNSORTED array?",
    shortAnswer: "The result is UNDEFINED (may return an incorrect negative value or wrong index) because the binary search algorithm assumes monotonic ordering.",
    explanation: "Violates the fundamental precondition of binary search.",
    hint: "Result is undefined; binary search requires sorted arrays.",
    level: "basic",
    codeExample: "// Must call Arrays.sort(arr) before calling Arrays.binarySearch(arr, target)!"
  },
  {
    question: "What is the Best-Case Time Complexity of both Linear Search and Binary Search?",
    shortAnswer: "$O(1)$ constant time (when the target is found on the very first comparison at index 0 for linear search, or at the exact midpoint for binary search).",
    explanation: "Immediate target hit on first check.",
    hint: "O(1) constant time.",
    level: "basic",
    codeExample: "// Best case: 1 comparison"
  },
  {
    question: "What is the Space Complexity of iterative Binary Search?",
    shortAnswer: "$O(1)$ constant auxiliary space.",
    explanation: "Only requires 3 integer pointer variables (`low`, `high`, `mid`).",
    hint: "O(1) auxiliary space.",
    level: "basic",
    codeExample: "// O(1) memory space"
  },
  {
    question: "How does recursive Binary Search compare to iterative Binary Search?",
    shortAnswer: "Recursive Binary Search consumes $O(\\log N)$ call-stack memory frames; iterative Binary Search consumes $O(1)$ constant memory and avoids `StackOverflowError`.",
    explanation: "Iterative vs recursive trade-off.",
    hint: "Iterative uses O(1) space; recursive uses O(log N) stack frames.",
    level: "intermediate",
    codeExample: "// Iterative Binary Search is preferred in production"
  },
  {
    question: "What is the loop condition in standard iterative Binary Search?",
    shortAnswer: "`while (low <= high)`.",
    explanation: "Ensures the search checks the final single-element range when `low == high`.",
    hint: "while (low <= high).",
    level: "basic",
    codeExample: "while (low <= high) { ... }"
  },
  {
    question: "What happens if you write `while (low < high)` instead of `while (low <= high)` in Binary Search?",
    shortAnswer: "It fails to check the final remaining element when `low == high`, causing the search to miss the target if it is located at that index.",
    explanation: "Boundary omission bug.",
    hint: "Misses target when target is located at the final single-element boundary.",
    level: "intermediate",
    codeExample: "// Bug: while (low < high) misses single-element matches"
  },
  {
    question: "How do you find the FIRST occurrence of a duplicate element in a sorted array via Binary Search?",
    shortAnswer: "When `arr[mid] == target`, don't return immediately; instead, set `ans = mid; high = mid - 1;` to continue searching in the left half.",
    explanation: "Lower-bound binary search modification.",
    hint: "Record index and continue searching left (high = mid - 1).",
    level: "intermediate",
    codeExample: "if (a[mid] == target) { ans = mid; high = mid - 1; }"
  },
  {
    question: "How do you find the LAST occurrence of a duplicate element in a sorted array via Binary Search?",
    shortAnswer: "When `arr[mid] == target`, don't return immediately; set `ans = mid; low = mid + 1;` to continue searching in the right half.",
    explanation: "Upper-bound binary search modification.",
    hint: "Record index and continue searching right (low = mid + 1).",
    level: "intermediate",
    codeExample: "if (a[mid] == target) { ans = mid; low = mid + 1; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student database, when is Linear Search preferred over Binary Search?",
    shortAnswer: "When searching small unsorted arrays ($N < 50$) or when elements are frequently inserted/deleted so sorting costs ($O(N \\log N)$) outweigh search gains in Indian Rupees (₹).",
    explanation: "Practical engineering trade-off.",
    hint: "For small unsorted datasets where sorting overhead exceeds search cost.",
    level: "basic",
    codeExample: "// Linear search is optimal for small or frequently changing arrays"
  },
  {
    question: "Can Binary Search be used to search for a character in a sorted `char[]` array?",
    shortAnswer: "YES! `Arrays.binarySearch(charArr, 'S')` works on all primitive array types.",
    explanation: "Overloaded utility method across all primitives.",
    hint: "Yes, Arrays.binarySearch is overloaded for all primitive types.",
    level: "basic",
    codeExample: "int idx = Arrays.binarySearch(new char[]{'A', 'B', 'C'}, 'B');"
  },
  {
    question: "Can Binary Search search for Objects using a custom `Comparator`?",
    shortAnswer: "YES! `Arrays.binarySearch(T[] arr, T key, Comparator<? super T> c)` searches object arrays using custom sorting criteria.",
    explanation: "Comparator-based binary search.",
    hint: "Yes, using overloaded Arrays.binarySearch(arr, key, comparator).",
    level: "intermediate",
    codeExample: "Arrays.binarySearch(students, target, (a,b) → a.name.compareTo(b.name));"
  },
  {
    question: "What is 'Ternary Search' in array algorithms?",
    shortAnswer: "An algorithm that divides the array into 3 equal parts using two midpoints (`mid1` and `mid2`), running in $O(\\log_3 N)$ time (often used to find unimodal function extrema).",
    explanation: "Three-way divide and conquer search.",
    hint: "Divides array into 3 parts using 2 midpoints in O(log_3 N) time.",
    level: "advanced",
    codeExample: "int mid1 = l + (r - l) / 3; int mid2 = r - (r - l) / 3;"
  },
  {
    question: "What is 'Jump Search' (Block Search) in sorted arrays?",
    shortAnswer: "An algorithm that skips blocks of size $\\sqrt{N}$ in a sorted array, then performs a backward linear search within the block, running in $O(\\sqrt{N})$ time.",
    explanation: "Square-root block decomposition search.",
    hint: "Jumps in blocks of size sqrt(N), running in O(sqrt(N)) time.",
    level: "advanced",
    codeExample: "int step = (int) Math.sqrt(n); // Jump search step size"
  },
  {
    question: "What is 'Interpolation Search' in sorted arrays?",
    shortAnswer: "An algorithm for uniformly distributed numerical arrays that estimates position via `pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])`, running in $O(\\log \\log N)$ average time.",
    explanation: "Linear interpolation probing.",
    hint: "Estimates index using numerical value distribution in O(log log N) time.",
    level: "advanced",
    codeExample: "int pos = low + ((target - a[low]) * (high - low)) / (a[high] - a[low]);"
  },
  {
    question: "Why is `Double.compare(arr[mid], target) == 0` preferred over `arr[mid] == target` when searching floating-point numbers?",
    shortAnswer: "Because `Double.compare()` handles IEEE 754 special values properly (treating `NaN == NaN` and distinguishing `-0.0` from `+0.0`).",
    explanation: "Floating-point precision safety.",
    hint: "Correctly handles IEEE 754 NaN and +/- 0.0 values.",
    level: "intermediate",
    codeExample: "if (Double.compare(arr[mid], target) == 0) return mid;"
  },
  {
    question: "What is Exponential Search in infinite or unbounded sorted arrays?",
    shortAnswer: "An algorithm that finds the range by repeatedly doubling indices ($1, 2, 4, 8, 16, \\dots$) until `arr[i] > target`, then performing Binary Search on that range in $O(\\log N)$ time.",
    explanation: "Unbounded array search technique.",
    hint: "Doubles search bound (1, 2, 4, 8) then performs binary search.",
    level: "advanced",
    codeExample: "int i = 1; while (i < n && a[i] <= target) i *= 2;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what return value indicates that a student roll number was NOT found in `linearSearch()`?",
    shortAnswer: "`-1` (a standard sentinel value representing an invalid index).",
    explanation: "Standard search failure sentinel.",
    hint: "-1.",
    level: "basic",
    codeExample: "return -1; // Standard not-found sentinel"
  },
  {
    question: "What is the average number of comparisons made in Linear Search for a successful search in an array of size $N$?",
    shortAnswer: "$\\frac{N + 1}{2} \\approx \\frac{N}{2}$ comparisons.",
    explanation: "Expected average case for uniform probability.",
    hint: "N / 2 comparisons on average.",
    level: "basic",
    codeExample: "// Average case: N / 2 comparisons"
  },
  {
    question: "Can Binary Search be used on a sorted descending array (largest to smallest)?",
    shortAnswer: "YES! Invert the update conditions: if `arr[mid] < target`, search the LEFT half (`high = mid - 1`); if `arr[mid] > target`, search the RIGHT half (`low = mid + 1`).",
    explanation: "Descending binary search logic.",
    hint: "Yes, by inverting pointer updates: low = mid + 1 when target < arr[mid].",
    level: "intermediate",
    codeExample: "if (arr[mid] < target) high = mid - 1; else low = mid + 1;"
  },
  {
    question: "What is the bitwise shift alternative to `(low + high) / 2` in Java?",
    shortAnswer: "`int mid = (low + high) >>> 1;` (Unsigned right shift handles potential overflow safely without generating negative numbers).",
    explanation: "High-performance bitwise midpoint calculation.",
    hint: "(low + high) >>> 1 using unsigned right shift.",
    level: "advanced",
    codeExample: "int mid = (low + high) >>> 1; // Used in JDK source code"
  },
  {
    question: "How do you count total occurrences of a target in a sorted array using Binary Search?",
    shortAnswer: "Find `firstOccurrence(target)` and `lastOccurrence(target)` via two binary searches; total count is `last - first + 1` in $O(\\log N)$ time.",
    explanation: "Optimal logarithmic frequency count.",
    hint: "lastIndex - firstIndex + 1 in O(log N) time.",
    level: "intermediate",
    codeExample: "int count = lastIdx - firstIdx + 1;"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 11 for Java developers?",
    shortAnswer: "Linear Search ($O(N)$) works universally on unsorted data; Binary Search ($O(\\log N)$) requires sorted arrays and uses overflow-safe midpoint calculation (`low + (high - low) / 2`) to achieve logarithmic performance on massive datasets.",
    explanation: "Mastery of linear and binary search algorithms in Java.",
    hint: "Linear search: O(N) unsorted; Binary search: O(log N) sorted with safe midpoint.",
    level: "basic",
    codeExample: "// Summary: Linear O(N) | Binary O(log N) with mid = low + (high-low)/2"
  },
  {
    question: "What is the next topic (Topic 12) in Module 001_006?",
    shortAnswer: "Basic sorting algorithms on arrays: Bubble Sort, Selection Sort, Insertion Sort.",
    explanation: "Topic 12 explores fundamental $O(N^2)$ sorting algorithms, step-by-step trace tables, and stability properties.",
    hint: "Basic sorting algorithms on arrays: Bubble Sort, Selection Sort, Insertion Sort.",
    level: "basic",
    codeExample: "// Topic 12: Bubble Sort, Selection Sort, and Insertion Sort"
  },
  {
    question: "What exception occurs if `Arrays.binarySearch()` is called with `fromIndex > toIndex`?",
    shortAnswer: "`java.lang.IllegalArgumentException: fromIndex(X) > toIndex(Y)`.",
    explanation: "Range validation in standard library search.",
    hint: "IllegalArgumentException.",
    level: "intermediate",
    codeExample: "Arrays.binarySearch(arr, from, to, key); // Throws if from > to"
  }
];

export default questions;
