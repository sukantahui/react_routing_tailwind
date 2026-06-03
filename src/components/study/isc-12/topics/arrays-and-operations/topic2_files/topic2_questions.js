const questions = [
    {
        question: "What is the time complexity of bubble sort in the worst case?",
        shortAnswer: "O(n²)",
        explanation: "Bubble sort compares and swaps adjacent elements. In the worst case (reverse sorted), it performs about n²/2 comparisons and swaps.",
        hint: "Quadratic time.",
        level: "basic",
        codeExample: "// n(n-1)/2 comparisons"
    },
    {
        question: "What is the best-case time complexity of optimized bubble sort?",
        shortAnswer: "O(n) when the array is already sorted.",
        explanation: "With a swap flag, if no swaps occur in a pass, the algorithm terminates early after one pass.",
        hint: "Linear time for sorted input.",
        level: "intermediate",
        codeExample: "boolean swapped; if (!swapped) break;"
    },
    {
        question: "Is bubble sort stable?",
        shortAnswer: "Yes.",
        explanation: "Bubble sort only swaps adjacent elements when they are out of order. Equal elements never cross each other, preserving original order.",
        hint: "Stable sorting preserves relative order of equal keys.",
        level: "basic",
        codeExample: "// Equal elements remain in same sequence"
    },
    {
        question: "What is the main advantage of selection sort over bubble sort?",
        shortAnswer: "Fewer swaps (O(n) swaps vs O(n²) swaps).",
        explanation: "Selection sort finds the minimum and swaps once per pass, while bubble sort may swap many times per pass.",
        hint: "Swap efficiency.",
        level: "intermediate",
        codeExample: "// Selection sort does at most n swaps total"
    },
    {
        question: "Is selection sort stable?",
        shortAnswer: "Not in its typical implementation.",
        explanation: "Selection sort can swap distant elements, potentially moving an equal element past another. It can be made stable with careful implementation, but usually it's not.",
        hint: "Long-distance swaps break stability.",
        level: "intermediate",
        codeExample: "// Example: [2a, 2b, 1] -> [1, 2b, 2a] order of 2's changed"
    },
    {
        question: "What is the space complexity of both bubble and selection sort?",
        shortAnswer: "O(1) (in-place).",
        explanation: "Both algorithms use only a few extra variables (loop counters, temporary swap variable) regardless of input size.",
        hint: "Constant extra memory.",
        level: "basic",
        codeExample: "// No additional arrays created"
    },
    {
        question: "Why is bubble sort called 'bubble' sort?",
        shortAnswer: "Because larger elements 'bubble up' to the end of the array like bubbles in water.",
        explanation: "During each pass, the largest unsorted element moves to its correct position at the end, resembling bubbles rising to the surface.",
        hint: "Visual analogy.",
        level: "basic",
        codeExample: "// Largest element moves to the rightmost"
    },
    {
        question: "How many passes does bubble sort require in the worst case?",
        shortAnswer: "n-1 passes.",
        explanation: "Each pass places one element in its final position. After n-1 passes, all elements are sorted.",
        hint: "One element per pass.",
        level: "basic",
        codeExample: "for (int i=0; i < n-1; i++)"
    },
    {
        question: "How can you optimize bubble sort?",
        shortAnswer: "Add a flag to detect if any swap occurred; if not, break early.",
        explanation: "If a pass completes without any swaps, the array is already sorted, and further passes are unnecessary.",
        hint: "Early termination.",
        level: "intermediate",
        codeExample: "boolean swapped = false; if (!swapped) break;"
    },
    {
        question: "What is the number of comparisons in selection sort for an array of size n?",
        shortAnswer: "n(n-1)/2 regardless of input.",
        explanation: "Selection sort always compares every pair of unsorted elements to find the minimum, so comparisons are fixed.",
        hint: "Always the same number of comparisons.",
        level: "intermediate",
        codeExample: "// Sum from 1 to n-1 = n(n-1)/2"
    },
    {
        question: "Which algorithm is better for nearly sorted data?",
        shortAnswer: "Bubble sort (optimized) because it can finish in O(n).",
        explanation: "If the array is almost sorted, bubble sort's early exit triggers quickly. Selection sort always takes O(n²) comparisons.",
        hint: "Best-case linear time.",
        level: "intermediate",
        codeExample: "// Optimized bubble sort on sorted array: one pass"
    },
    {
        question: "What is the main disadvantage of bubble sort?",
        shortAnswer: "It is very slow for large datasets (O(n²)).",
        explanation: "Bubble sort performs many unnecessary comparisons and swaps, making it impractical for arrays larger than a few thousand elements.",
        hint: "Quadratic time is slow.",
        level: "basic",
        codeExample: "// 1 million elements -> ~500 billion operations"
    },
    {
        question: "What is the main disadvantage of selection sort?",
        shortAnswer: "It always performs O(n²) comparisons, even on already sorted data.",
        explanation: "Unlike bubble sort, selection sort cannot detect if the array is sorted; it always goes through all comparisons.",
        hint: "No early exit.",
        level: "intermediate",
        codeExample: "// Always n(n-1)/2 comparisons"
    },
    {
        question: "Can bubble sort be used to sort in descending order?",
        shortAnswer: "Yes, change the comparison operator to '<'.",
        explanation: "To sort in descending order, swap when arr[j] < arr[j+1] instead of >.",
        hint: "Reverse the condition.",
        level: "basic",
        codeExample: "if (arr[j] < arr[j+1]) swap; // descending"
    },
    {
        question: "What happens if you don't use the optimization flag in bubble sort on a sorted array?",
        shortAnswer: "It still performs n-1 passes, wasting time.",
        explanation: "Without early exit, bubble sort will continue to compare and not swap, but still complete all passes.",
        hint: "Unnecessary work.",
        level: "basic",
        codeExample: "// Still O(n²) instead of O(n)"
    },
    {
        question: "How do you sort an array of objects using bubble sort?",
        shortAnswer: "Use Comparable interface or Comparator, and compare using compareTo() or compare().",
        explanation: "Instead of primitive comparison, call obj1.compareTo(obj2) for natural ordering.",
        hint: "Object comparison.",
        level: "expert",
        codeExample: "if (arr[j].compareTo(arr[j+1]) > 0) swap;"
    },
    {
        question: "Which sorting algorithm is taught first in most CS courses?",
        shortAnswer: "Bubble sort, due to its simplicity.",
        explanation: "Bubble sort is intuitive and easy to implement, making it a good starting point for understanding sorting concepts.",
        hint: "Pedagogical choice.",
        level: "basic",
        codeExample: "// Simple nested loops"
    },
    {
        question: "What is the stability of selection sort if implemented with a stable minimum selection?",
        shortAnswer: "It can be made stable by shifting elements instead of swapping.",
        explanation: "Instead of swapping, you can insert the minimum by shifting elements to the right, but this increases time complexity.",
        hint: "Trade-off.",
        level: "expert",
        codeExample: "// Not typical; usually unstable"
    },
    {
        question: "How many swaps does selection sort perform in the worst case?",
        shortAnswer: "n-1 swaps.",
        explanation: "Selection sort performs exactly one swap per pass (n-1 passes), regardless of data.",
        hint: "Linear number of swaps.",
        level: "intermediate",
        codeExample: "// At most n-1 swaps total"
    },
    {
        question: "Why is bubble sort rarely used in production?",
        shortAnswer: "Because it's too slow for large datasets; built-in sorts (like Arrays.sort) are much faster.",
        explanation: "Bubble sort's O(n²) time complexity makes it impractical for real-world applications with large data volumes.",
        hint: "Performance.",
        level: "basic",
        codeExample: "// Use Arrays.sort() instead"
    },
    {
        question: "What is the difference between bubble sort and selection sort in terms of number of swaps?",
        shortAnswer: "Bubble sort: O(n²) swaps; Selection sort: O(n) swaps.",
        explanation: "Bubble sort swaps on every inversion, while selection sort swaps only once per pass.",
        hint: "Swap count difference.",
        level: "intermediate",
        codeExample: "// Selection sort minimizes writes"
    },
    {
        question: "Can selection sort be used for linked lists?",
        shortAnswer: "Yes, but bubble sort is often easier on linked lists.",
        explanation: "Selection sort requires finding the minimum in the unsorted part, which requires O(n) scans on a linked list. Bubble sort can be implemented with pointer manipulation.",
        hint: "Both work but with different complexities.",
        level: "expert",
        codeExample: "// Not as efficient as merge sort for linked lists"
    },
    {
        question: "What is an inversion in the context of sorting?",
        shortAnswer: "A pair of elements (i, j) such that i < j but arr[i] > arr[j].",
        explanation: "Inversions measure how unsorted an array is. Bubble sort removes one inversion per swap, which is why it's slow on highly inverted arrays.",
        hint: "Out-of-order pairs.",
        level: "intermediate",
        codeExample: "// [3,1,2] has inversions: (3,1) and (3,2)"
    },
    {
        question: "How does bubble sort behave on an array with duplicate elements?",
        shortAnswer: "It remains stable; duplicates are not swapped because condition uses > (not >=).",
        explanation: "Using > ensures that equal elements are not swapped, preserving their relative order.",
        hint: "Stable handling.",
        level: "basic",
        codeExample: "if (arr[j] > arr[j+1]) // no swap if equal"
    },
    {
        question: "What is the adaptive property of sorting algorithms?",
        shortAnswer: "Adaptive algorithms perform better on partially sorted data.",
        explanation: "Optimized bubble sort is adaptive because it can finish early. Selection sort is not adaptive because it always does the same work.",
        hint: "Performance improves with pre-sortedness.",
        level: "expert",
        codeExample: "// Bubble sort adaptive, selection sort not"
    },
    {
        question: "How would you sort a large array of integers in Java without writing your own sort?",
        shortAnswer: "Use Arrays.sort(arr).",
        explanation: "Java's built-in sort uses Dual-Pivot Quicksort for primitives (O(n log n)) and TimSort for objects.",
        hint: "Don't reinvent the wheel.",
        level: "basic",
        codeExample: "import java.util.Arrays; Arrays.sort(arr);"
    },
    {
        question: "What is the main reason to learn bubble and selection sort if they are not used in production?",
        shortAnswer: "They teach fundamental algorithm design and analysis concepts.",
        explanation: "These simple sorts help beginners understand loops, swapping, complexity analysis, and stability before moving to advanced algorithms.",
        hint: "Pedagogical foundation.",
        level: "basic",
        codeExample: "// Building block for understanding"
    },
    {
        question: "What is the difference between a stable and unstable sort?",
        shortAnswer: "Stable sorts preserve the original order of equal elements; unstable sorts may change it.",
        explanation: "Stability matters when sorting by multiple keys (e.g., sort by last name, then by first name).",
        hint: "Order of equal items.",
        level: "intermediate",
        codeExample: "// Stable: [2a, 1, 2b] -> [1, 2a, 2b]; Unstable: [1, 2b, 2a] possible"
    },
    {
        question: "Can you implement bubble sort recursively?",
        shortAnswer: "Yes, but iterative is better.",
        explanation: "You can write a recursive version where each call bubbles the largest element to the end and recurses on the remaining n-1 elements.",
        hint: "Recursion possible but not practical.",
        level: "expert",
        codeExample: "void bubble(int[] arr, int n) { if (n==1) return; for (int j=0; j<n-1; j++)... bubble(arr, n-1); }"
    },
    {
        question: "What is the worst-case input for selection sort?",
        shortAnswer: "Any input, because it always does the same number of comparisons.",
        explanation: "Selection sort's performance does not depend on input order; it always does n(n-1)/2 comparisons.",
        hint: "Input independent.",
        level: "intermediate",
        codeExample: "// Already sorted array still takes O(n²) comparisons"
    }
];

export default questions;