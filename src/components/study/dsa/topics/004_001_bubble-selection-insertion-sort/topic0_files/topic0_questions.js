const questions = [
  {
    id: 1,
    question: "What is the best-case time complexity of an optimized Bubble Sort on an already sorted array?",
    options: ["O(n)", "O(n^2)", "O(n log n)", "O(1)"],
    answer: "O(n)",
    explanation: "With the early exit swapped flag check, Bubble Sort passes through the array once in O(n) time, detects zero swaps, and immediately terminates."
  },
  {
    id: 2,
    question: "Which elementary sorting algorithm performs the minimum number of memory writes/swaps O(n)?",
    options: ["Selection Sort", "Bubble Sort", "Insertion Sort", "Quick Sort"],
    answer: "Selection Sort",
    explanation: "Selection Sort performs at most n-1 swaps total because it scans for the absolute minimum element before doing a single swap per outer pass."
  },
  {
    id: 3,
    question: "Why is Insertion Sort preferred for small array sizes or nearly-sorted datasets?",
    options: [
      "It has low constant overhead O(n) best-case time and is adaptive and stable",
      "It uses binary tree searches internally",
      "It uses double memory buffers",
      "It runs in O(log n) time"
    ],
    answer: "It has low constant overhead O(n) best-case time and is adaptive and stable",
    explanation: "Insertion Sort is an adaptive sorting algorithm that shifts elements only when necessary, executing in linear O(n) time for nearly sorted arrays."
  }
];

export default questions;
