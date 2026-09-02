const questions = [
  {
    question: "How does the Bubble Sort algorithm work in C?",
    shortAnswer: "Repeatedly steps through the array, compares adjacent elements, and swaps them if they are in wrong order.",
    explanation: "With each pass, the largest unsorted element 'bubbles up' to its final position at the end of the array. An array of size n requires up to n - 1 passes.",
    hint: "Adjacent pairwise comparison and bubble up.",
    level: "basic"
  },
  {
    question: "What is the best-case time complexity of an optimized Bubble Sort with a swapped flag?",
    shortAnswer: "O(n) linear time.",
    explanation: "If no swaps occur during the first pass, the flag remains 0 and the algorithm breaks out immediately, detecting that the array is already sorted.",
    hint: "Single pass with swapped == 0 check gives O(n).",
    level: "basic",
    codeExample: "if (!swapped) break;"
  },
  {
    question: "How does Selection Sort work and how many swaps does it perform?",
    shortAnswer: "Finds the minimum element from the unsorted subarray and swaps it with the first unsorted position.",
    explanation: "Selection sort performs at most n - 1 swaps in the entire sort, making it ideal when write operations to memory are expensive (e.g. Flash/EEPROM).",
    hint: "Minimum element selection; maximum n - 1 swaps.",
    level: "basic"
  },
  {
    question: "What is the time complexity of Selection Sort in best, average, and worst cases?",
    shortAnswer: "O(n^2) in ALL cases (best, average, worst).",
    explanation: "Selection sort always executes both nested loops to locate the minimum index, regardless of whether the array was already sorted.",
    hint: "Always O(n^2) comparisons.",
    level: "basic"
  },
  {
    question: "How does Insertion Sort work and what real-world analogy describes it?",
    shortAnswer: "Builds the sorted array one item at a time by shifting larger elements right and inserting the key in its correct spot.",
    explanation: "Similar to sorting playing cards in your hand: you take the next card and slide it into its proper place among previously sorted cards.",
    hint: "Card sorting in hand via right shifts.",
    level: "basic"
  },
  {
    question: "What is the best-case time complexity of Insertion Sort and when does it occur?",
    shortAnswer: "O(n) time when the input array is already sorted.",
    explanation: "The inner while loop condition arr[j] > key immediately evaluates to false, causing only 1 comparison and 0 shifts per outer iteration.",
    hint: "O(n) on sorted data.",
    level: "basic"
  },
  {
    question: "What is a 'Stable Sorting Algorithm' and which elementary sorting algorithms are stable?",
    shortAnswer: "A sort is stable if it preserves the relative order of duplicate keys. Bubble Sort and Insertion Sort are stable; Selection Sort is unstable.",
    explanation: "Selection sort can jump a minimum element across identical elements, disturbing their original order.",
    hint: "Maintains relative order of equal elements.",
    level: "intermediate"
  },
  {
    question: "What is an 'In-Place Sorting Algorithm'?",
    shortAnswer: "An algorithm that sorts the array using only O(1) auxiliary memory beyond the input array.",
    explanation: "Bubble Sort, Selection Sort, and Insertion Sort all operate in-place with O(1) extra space.",
    hint: "O(1) extra memory requirement.",
    level: "basic"
  },
  {
    question: "Why is Insertion Sort preferred for small arrays or nearly sorted streaming data?",
    shortAnswer: "Low constant factor overhead, O(n) best-case adaptive performance, and cache-friendly sequential shifts.",
    explanation: "Modern hybrid sorting algorithms like Timsort (used in Python and Java) and Introsort (in C++ std::sort) use Insertion Sort for subarrays with n < 16.",
    hint: "Extremely fast on small and almost-sorted datasets.",
    level: "intermediate"
  },
  {
    question: "How many total comparisons are performed in standard Bubble Sort for an array of size n in worst case?",
    shortAnswer: "n(n - 1) / 2 comparisons.",
    explanation: "Pass 1: (n-1), Pass 2: (n-2)... Pass n-1: 1. Sum = n(n-1)/2, which is O(n^2).",
    hint: "Sum of integers from 1 to n - 1.",
    level: "basic"
  },
  {
    question: "How do you sort an array of student structs based on marks in descending order using Bubble Sort?",
    shortAnswer: "Compare s[j].marks < s[j + 1].marks and swap the entire struct.",
    explanation: "Inverting the comparison operator from > to < sorts the array in descending order.",
    hint: "Use < for descending sort.",
    level: "intermediate",
    codeExample: "if (students[j].marks < students[j + 1].marks) {\n    Student temp = students[j];\n    students[j] = students[j + 1];\n    students[j + 1] = temp;\n}"
  },
  {
    question: "What is the standard C library sorting function and how is it invoked?",
    shortAnswer: "qsort() from <stdlib.h> using a custom comparator function pointer.",
    explanation: "qsort(array, elementCount, elementSize, compareFunction);",
    hint: "qsort() in stdlib.h.",
    level: "intermediate",
    codeExample: "int cmp(const void *a, const void *b) {\n    return (*(int*)a - *(int*)b);\n}\nqsort(arr, n, sizeof(int), cmp);"
  },
  {
    question: "Why does Selection Sort perform fewer write/swap operations than Bubble Sort?",
    shortAnswer: "Selection sort performs at most 1 swap per outer pass, whereas Bubble Sort may perform up to n - 1 swaps per pass.",
    explanation: "Bubble sort swaps immediately upon every out-of-order pair; Selection sort tracks only the minimum index and swaps once per pass.",
    hint: "1 swap per outer loop vs continuous swaps.",
    level: "intermediate"
  },
  {
    question: "What is Cocktail Shaker Sort (Bidirectional Bubble Sort)?",
    shortAnswer: "A variation of Bubble Sort that traverses the array in alternating directions (left-to-right then right-to-left).",
    explanation: "Solves the 'turtles' problem where small values near the end of the array take many passes to move to the front.",
    hint: "Bidirectional passes.",
    level: "advanced"
  },
  {
    question: "How does Shell Sort improve upon basic Insertion Sort?",
    shortAnswer: "By comparing and sorting elements separated by a diminishing gap sequence before finishing with gap = 1.",
    explanation: "Allows elements to take large leaps towards their final positions early on, breaking the O(n^2) barrier down to O(n^(4/3)) or O(n log^2 n).",
    hint: "Gap-based diminishing increment sort.",
    level: "advanced"
  },
  {
    question: "What is the worst-case input configuration for standard Insertion Sort?",
    shortAnswer: "An array sorted in strictly reverse (descending) order.",
    explanation: "Every new element key must shift past all i previously inspected elements, requiring maximum n(n-1)/2 shifts.",
    hint: "Reverse sorted array.",
    level: "basic"
  },
  {
    question: "Can Bubble Sort be implemented using recursion in C?",
    shortAnswer: "Yes. One pass moves the largest element to end; recursive call is made with size n - 1.",
    explanation: "Base case is if (n == 1) return;. Recursive step runs inner loop for size n - 1.",
    hint: "Recursive call with reduced size n - 1.",
    level: "intermediate"
  },
  {
    question: "What is the auxiliary space complexity of Bubble Sort, Selection Sort, and Insertion Sort?",
    shortAnswer: "O(1) auxiliary space (only a temporary swap variable).",
    explanation: "All three algorithms sort elements directly in the existing array memory buffer.",
    hint: "Constant memory overhead.",
    level: "basic"
  },
  {
    question: "How do you count the number of inversions in an array?",
    shortAnswer: "Count pairs (i, j) where i < j and arr[i] > arr[j]. Each swap in Bubble Sort resolves exactly 1 inversion.",
    explanation: "The total number of swaps required by Bubble Sort equals the exact inversion count of the array.",
    hint: "Swaps in bubble sort equal inversion count.",
    level: "advanced"
  },
  {
    question: "Why is Quick Sort or Merge Sort preferred over Bubble/Selection Sort for large arrays (n > 10,000)?",
    shortAnswer: "O(n log n) algorithms scale dramatically better than O(n^2).",
    explanation: "For n = 1,000,000: O(n^2) = 1,000,000,000,000 operations (~hours); O(n log n) = ~20,000,000 operations (~milliseconds).",
    hint: "O(n log n) vs O(n^2) scaling.",
    level: "basic"
  },
  {
    question: "How do you sort an array of strings alphabetically in C using Bubble Sort?",
    shortAnswer: "Compare adjacent strings using strcmp(arr[j], arr[j+1]) > 0 and swap string pointers or buffers.",
    explanation: "strcmp returns > 0 when the first string is lexicographically greater than the second.",
    hint: "Use strcmp() for string comparison.",
    level: "intermediate",
    codeExample: "if (strcmp(names[j], names[j + 1]) > 0) {\n    char temp[50];\n    strcpy(temp, names[j]);\n    strcpy(names[j], names[j + 1]);\n    strcpy(names[j + 1], temp);\n}"
  },
  {
    question: "What is a 'Pass' in sorting algorithms?",
    shortAnswer: "One complete traversal of the active subarray during which elements are compared and relocated.",
    explanation: "In Bubble and Selection sort, each pass places at least one element into its final sorted position.",
    hint: "One complete iteration of the outer loop.",
    level: "basic"
  },
  {
    question: "What is Binary Insertion Sort and how does it optimize Insertion Sort?",
    shortAnswer: "It uses Binary Search instead of linear scanning to find the insertion index for key in O(log n) comparisons.",
    explanation: "Reduces comparison count from O(n^2) to O(n log n), though element shifting still requires O(n^2) data moves.",
    hint: "Binary search for insertion position.",
    level: "advanced"
  },
  {
    question: "What is the worst-case number of swaps in Selection Sort for an array of size n?",
    shortAnswer: "n - 1 swaps.",
    explanation: "The outer loop runs n - 1 times, and at most 1 swap occurs per iteration.",
    hint: "At most n - 1 swaps.",
    level: "basic"
  },
  {
    question: "Why should we avoid writing our own O(n^2) sorting algorithms in production systems code?",
    shortAnswer: "Standard library qsort() is heavily optimized, handles edge cases, and scales at O(n log n).",
    explanation: "Elementary sorts should only be used for small arrays, embedded systems with strict RAM constraints, or educational conceptual understanding.",
    hint: "Use qsort() for production.",
    level: "basic"
  }
];

export default questions;
