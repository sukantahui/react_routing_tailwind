const questions = [
  {
    id: 1,
    question: "What is the average and worst-case time complexity of Quick Sort?",
    options: [
      "Average: O(n log n), Worst: O(n^2)",
      "Average: O(n^2), Worst: O(n^2)",
      "Average: O(n), Worst: O(n log n)",
      "Average: O(log n), Worst: O(n)"
    ],
    answer: "Average: O(n log n), Worst: O(n^2)",
    explanation: "Quick Sort achieves O(n log n) average time complexity using partition division. If bad pivot selection occurs on sorted data (Lomuto partition), worst-case degrades to O(n^2)."
  },
  {
    id: 2,
    question: "Which sorting algorithm guarantees a strictly worst-case time complexity of O(n log n) with O(n) auxiliary space?",
    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Selection Sort"],
    answer: "Merge Sort",
    explanation: "Merge Sort uses a Divide-and-Conquer strategy that divides array bounds in half recursively, guaranteeing O(n log n) performance regardless of initial array ordering."
  },
  {
    id: 3,
    question: "What prerequisite is required to perform Binary Search on a dataset?",
    options: [
      "The dataset must be pre-sorted in ascending or descending order",
      "The array size must be a power of two",
      "Memory must be allocated on the Heap",
      "Values must be prime numbers"
    ],
    answer: "The dataset must be pre-sorted in ascending or descending order",
    explanation: "Binary Search relies on comparing the target value against the middle element to halve the search space at each iteration. This logic strictly requires sorted data."
  },
  {
    id: 4,
    question: "What distinguishes a 'Stable' sorting algorithm?",
    options: [
      "Preserves the relative order of duplicate elements with identical keys",
      "Never throws Stack Overflow",
      "Operates in O(1) space complexity",
      "Runs faster on GPUs"
    ],
    answer: "Preserves the relative order of duplicate elements with identical keys",
    explanation: "A sort is stable if elements with identical comparison keys retain their original relative order after sorting is completed (e.g. Merge Sort, Insertion Sort)."
  },
  {
    id: 5,
    question: "What is the auxiliary space complexity of Heap Sort?",
    options: ["O(1)", "O(n)", "O(n log n)", "O(log n)"],
    answer: "O(1)",
    explanation: "Heap Sort rearranges elements in-place within the array representation of the binary heap without allocating external array blocks, achieving O(1) space complexity."
  }
];

export default questions;
