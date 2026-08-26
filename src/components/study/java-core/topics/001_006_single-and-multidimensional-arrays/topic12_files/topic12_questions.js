/**
 * Module 001_006: Topic 12: Basic sorting algorithms on arrays: Bubble Sort, Selection Sort, Insertion Sort
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the core working principle of Bubble Sort?",
    shortAnswer: "It repeatedly steps through the array, compares adjacent pairs of elements, and swaps them if they are in the wrong order; with each pass, the largest unsorted element 'bubbles up' to its correct end position.",
    explanation: "Adjacent pair comparison and bubbling.",
    hint: "Compares adjacent elements and swaps them, bubbling largest values to the end.",
    level: "basic",
    codeExample: "if (arr[j] > arr[j+1]) { double t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }"
  },
  {
    question: "How is Bubble Sort optimized to achieve $O(N)$ Best-Case Time on already-sorted arrays?",
    shortAnswer: "By introducing a `boolean swapped = false;` flag inside the outer loop; if an entire pass completes with zero swaps, the array is already sorted and the loop terminates early via `break;`.",
    explanation: "Early termination optimization.",
    hint: "Use a boolean swapped flag to break early if no swaps occurred.",
    level: "basic",
    codeExample: "if (!swapped) break; // Early termination"
  },
  {
    question: "What is the core working principle of Selection Sort?",
    shortAnswer: "It repeatedly finds the minimum element from the unsorted suffix and swaps it with the element at the beginning of the unsorted subarray.",
    explanation: "Minimum element selection and placement.",
    hint: "Finds the minimum element in unsorted partition and places it at the front.",
    level: "basic",
    codeExample: "int min = i; for (int j=i+1; j<n; j++) if (a[j] < a[min]) min = j; swap(a, i, min);"
  },
  {
    question: "What is the core working principle of Insertion Sort?",
    shortAnswer: "It builds the sorted array one element at a time by picking the next element (`key`) and shifting larger elements in the sorted prefix to the right to insert the `key` into its correct relative position.",
    explanation: "Similar to sorting a hand of playing cards.",
    hint: "Inserts each element into its correct position within the sorted prefix.",
    level: "basic",
    codeExample: "while (j >= 0 && arr[j] > key) { arr[j+1] = arr[j]; j--; } arr[j+1] = key;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student rank ordering, which algorithm performs the minimum number of swaps?",
    shortAnswer: "Selection Sort, which makes at most $N-1$ swaps ($O(N)$ swaps), making it ideal when write operations to memory/EEPROM are costly in Indian Rupees (₹).",
    explanation: "Selection sort minimizes total write operations.",
    hint: "Selection sort performs at most O(N) swaps.",
    level: "intermediate",
    codeExample: "// Selection sort: exactly O(N) swaps"
  },
  {
    question: "What does it mean for a sorting algorithm to be 'Stable'?",
    shortAnswer: "A sorting algorithm is Stable if it preserves the original relative order of elements that have equal keys.",
    explanation: "Key concept in multi-field sorting.",
    hint: "Preserves the relative order of duplicate elements with identical keys.",
    level: "intermediate",
    codeExample: "// Stable: [A(5), B(5)] remains [A(5), B(5)] after sort"
  },
  {
    question: "Which of the three algorithms (Bubble, Selection, Insertion) are Stable?",
    shortAnswer: "Bubble Sort and Insertion Sort are STABLE; Selection Sort is UNSTABLE (because long-range swaps can jump equal elements across each other).",
    explanation: "Stability analysis.",
    hint: "Bubble Sort and Insertion Sort are stable; Selection Sort is unstable.",
    level: "intermediate",
    codeExample: "// Stable: Bubble, Insertion | Unstable: Selection"
  },
  {
    question: "What is the Worst-Case Time Complexity of Bubble Sort, Selection Sort, and Insertion Sort?",
    shortAnswer: "$O(N^2)$ quadratic time for all three algorithms.",
    explanation: "All three require nested loops iterating $\\approx N^2/2$ comparisons in the worst case.",
    hint: "O(N^2) quadratic time.",
    level: "basic",
    codeExample: "// O(N^2) worst-case time complexity"
  },
  {
    question: "What is the Best-Case Time Complexity of Insertion Sort on an already-sorted array?",
    shortAnswer: "$O(N)$ linear time (the `while` loop condition `arr[j] > key` fails immediately on each iteration, performing only 1 comparison per element).",
    explanation: "Adaptive linear best case.",
    hint: "O(N) linear time on sorted or nearly sorted arrays.",
    level: "basic",
    codeExample: "// O(N) best case for Insertion Sort"
  },
  {
    question: "What is the Space Complexity of Bubble Sort, Selection Sort, and Insertion Sort?",
    shortAnswer: "$O(1)$ constant auxiliary space (all three are strictly in-place sorting algorithms).",
    explanation: "Zero auxiliary memory allocation.",
    hint: "O(1) in-place space complexity.",
    level: "basic",
    codeExample: "// O(1) in-place sorting"
  },
  {
    question: "Why is Insertion Sort used inside production algorithms like Dual-Pivot Quicksort and TimSort in the JDK?",
    shortAnswer: "Because for small arrays ($N \\le 47$ in Quicksort, $N \\le 32$ in TimSort) or nearly-sorted data, Insertion Sort has minimal constant overhead, zero recursive stack frames, and peak CPU cache locality.",
    explanation: "Hybrid algorithm design in Java standard library.",
    hint: "Has lowest constant overhead and peak cache locality for small arrays (N <= 47).",
    level: "advanced",
    codeExample: "// JDK switches to Insertion Sort for small subarrays"
  },
  {
    question: "How many total comparisons does Selection Sort make on an array of length $N$?",
    shortAnswer: "Always exactly $\\frac{N(N-1)}{2}$ comparisons across best, average, and worst cases ($O(N^2)$).",
    explanation: "Non-adaptive comparison count.",
    hint: "N(N-1)/2 comparisons in all cases.",
    level: "intermediate",
    codeExample: "// Comparisons: (N-1) + (N-2) + ... + 1 = N(N-1)/2"
  },
  {
    question: "What is an Inversion in an array?",
    shortAnswer: "A pair of indices $(i, j)$ such that $i < j$ but `arr[i] > arr[j]` (elements are out of sorted order).",
    explanation: "Formal measure of array unsortedness.",
    hint: "A pair of elements that are out of sorted order.",
    level: "intermediate",
    codeExample: "// An array with 0 inversions is fully sorted"
  },
  {
    question: "How is the running time of Insertion Sort related to the number of inversions $I$?",
    shortAnswer: "The time complexity is $O(N + I)$, meaning Insertion Sort runs linearly when the number of inversions $I$ is small.",
    explanation: "Adaptive nature of insertion sort.",
    hint: "O(N + I) time where I is the inversion count.",
    level: "advanced",
    codeExample: "// Running time is directly proportional to inversion count I"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why is Bubble Sort taught as the first sorting algorithm?",
    shortAnswer: "Because its adjacent comparison and bubbling mechanics provide a visual, intuitive mental model for understanding nested loop invariants and in-place swapping in Indian Rupees (₹).",
    explanation: "Pedagogical foundation.",
    hint: "Provides intuitive visual understanding of adjacent swapping and nested loops.",
    level: "basic",
    codeExample: "// Bubble Sort builds foundational mental models"
  },
  {
    question: "How do you modify Bubble Sort to sort in DESCENDING order (largest to smallest)?",
    shortAnswer: "Change the comparison condition from `if (arr[j] > arr[j+1])` to `if (arr[j] < arr[j+1])`.",
    explanation: "Inverting comparison condition reverses order.",
    hint: "Change > to < in the adjacent comparison condition.",
    level: "basic",
    codeExample: "if (arr[j] < arr[j+1]) swap(arr, j, j+1); // Descending sort"
  },
  {
    question: "What is 'Cocktail Shaker Sort' (Bidirectional Bubble Sort)?",
    shortAnswer: "A variation of Bubble Sort that traverses in both directions alternately on each pass (left-to-right to bubble the maximum, then right-to-left to sink the minimum).",
    explanation: "Bidirectional bubble sort optimization.",
    hint: "Traverses alternately in both directions, bubbling maximums and sinking minimums.",
    level: "intermediate",
    codeExample: "// Bidirectional alternating passes"
  },
  {
    question: "Why does Selection Sort fail to be Stable? Give an example.",
    shortAnswer: "In `[4A, 4B, 2]`, selecting minimum `2` swaps it with `4A`, producing `[2, 4B, 4A]`, which inverts the original relative order of `4A` and `4B`.",
    explanation: "Concrete demonstration of instability.",
    hint: "Long-range swaps jump equal elements, inverting their relative positions.",
    level: "intermediate",
    codeExample: "// [4A, 4B, 2] -> [2, 4B, 4A] (Order of 4A and 4B is inverted!)"
  },
  {
    question: "What algorithm does `Arrays.sort(int[] arr)` use in modern Java?",
    shortAnswer: "Vladimir Yaroslavskiy's Dual-Pivot Quicksort (which runs in $O(N \\log N)$ time and automatically falls back to Insertion Sort for small slices).",
    explanation: "JDK primitive sorting implementation.",
    hint: "Dual-Pivot Quicksort with Insertion Sort fallback.",
    level: "advanced",
    codeExample: "// Arrays.sort() uses Dual-Pivot Quicksort for primitives"
  },
  {
    question: "What algorithm does `Arrays.sort(Object[] arr)` use in modern Java?",
    shortAnswer: "Tim Peters' TimSort (a hybrid stable sorting algorithm combining Merge Sort and Insertion Sort, running in $O(N \\log N)$ worst-case and $O(N)$ best-case).",
    explanation: "JDK object sorting implementation.",
    hint: "TimSort (hybrid of Merge Sort and Insertion Sort).",
    level: "advanced",
    codeExample: "// Arrays.sort(Object[]) uses TimSort"
  },
  {
    question: "What is the maximum number of swaps performed by Selection Sort on an array of length $N$?",
    shortAnswer: "$N - 1$ swaps.",
    explanation: "At most 1 swap per outer iteration pass.",
    hint: "At most N - 1 swaps.",
    level: "basic",
    codeExample: "// Exactly <= N-1 total swap operations"
  },
  {
    question: "What is the maximum number of swaps performed by Bubble Sort on an array of length $N$?",
    shortAnswer: "$\\frac{N(N-1)}{2}$ swaps (when the array is in reverse sorted order).",
    explanation: "Every comparison results in a swap.",
    hint: "N(N-1)/2 swaps in worst case.",
    level: "intermediate",
    codeExample: "// Worst-case swaps = N(N-1)/2"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happens if an array is already sorted in `selectionSort()`?",
    shortAnswer: "It still performs all $\\frac{N(N-1)}{2}$ comparisons because it must verify every element in the unsorted suffix before confirming the minimum index.",
    explanation: "Selection sort cannot detect early sortedness.",
    hint: "Still performs all N(N-1)/2 comparisons (non-adaptive).",
    level: "basic",
    codeExample: "// Selection sort always takes O(N^2) comparisons even if sorted"
  },
  {
    question: "How do you sort an array of custom Records by tuition fee using `Arrays.sort()`?",
    shortAnswer: "`Arrays.sort(roster, Comparator.comparingDouble(StudentRecord::fee));` in Indian Rupees (₹).",
    explanation: "Comparator-based standard sorting.",
    hint: "Arrays.sort(arr, Comparator.comparingDouble(...)).",
    level: "basic",
    codeExample: "Arrays.sort(roster, Comparator.comparingDouble(StudentRecord::fee));"
  },
  {
    question: "Can Insertion Sort be implemented with Binary Search to find the insertion point (Binary Insertion Sort)?",
    shortAnswer: "YES! Binary search reduces comparison count to $O(N \\log N)$, but total element shifting still requires $O(N^2)$ time.",
    explanation: "Binary insertion sort trade-off.",
    hint: "Reduces comparisons to O(N log N), but element shifts remain O(N^2).",
    level: "advanced",
    codeExample: "// Binary insertion sort: O(N log N) comparisons + O(N^2) shifts"
  },
  {
    question: "Why is `arr.clone()` used before passing arrays to sorting demonstration methods?",
    shortAnswer: "Because sorting algorithms mutate array elements in-place; cloning creates independent copies so each algorithm can be tested on the identical original unsorted input.",
    explanation: "Testing and benchmarking isolation.",
    hint: "Creates an independent copy so original array is not mutated before subsequent tests.",
    level: "basic",
    codeExample: "double[] copy = rawFees.clone(); bubbleSort(copy);"
  },
  {
    question: "What is the effect of sorting on Cache Performance?",
    shortAnswer: "Insertion Sort provides excellent spatial cache locality because it shifts contiguous adjacent memory slots sequentially.",
    explanation: "Hardware L1/L2 cache utilization.",
    hint: "Insertion sort accesses adjacent contiguous memory slots, maximizing cache hits.",
    level: "advanced",
    codeExample: "// Contiguous shifts = high cache hit rate"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 12 for Java developers?",
    shortAnswer: "Bubble Sort bubbles adjacent pairs (stable), Selection Sort minimizes total swaps (unstable, $O(N)$ swaps), and Insertion Sort shifts sorted prefixes with $O(N)$ adaptive best-case speed (stable, used inside JDK TimSort/Quicksort).",
    explanation: "Mastery of classic elementary sorting algorithms in Java.",
    hint: "Bubble: adjacent swaps; Selection: minimum swaps; Insertion: adaptive prefix shifts.",
    level: "basic",
    codeExample: "// Summary: Bubble (adjacent), Selection (min swap), Insertion (adaptive shift)"
  },
  {
    question: "What is the next topic (Topic 13) in Module 001_006?",
    shortAnswer: "Finding minimum, maximum, second highest, and average in an array.",
    explanation: "Topic 13 explores fundamental statistical and aggregation algorithms in a single $O(N)$ pass.",
    hint: "Finding minimum, maximum, second highest, and average in an array.",
    level: "basic",
    codeExample: "// Topic 13: Statistical Array Aggregations (Min, Max, 2nd Max, Average)"
  },
  {
    question: "Can basic sorting algorithms handle duplicate elements without crashing?",
    shortAnswer: "YES! All three algorithms handle duplicate values naturally using `>=` or `<=` relational boundaries.",
    explanation: "Duplicate element handling.",
    hint: "Yes, duplicates are handled cleanly by comparison operators.",
    level: "basic",
    codeExample: "// Duplicates are sorted correctly"
  }
];

export default questions;
