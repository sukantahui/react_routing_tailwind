const questions = [
  {
    id: 1,
    question: "How do Non-Comparison sorting algorithms break the lower bound comparison limit Omega(n log n)?",
    options: [
      "By using element keys as array frequency indices or digit positions instead of pairwise element comparison operators",
      "By using double threads",
      "By eliminating memory allocation",
      "By sorting in reverse"
    ],
    answer: "By using element keys as array frequency indices or digit positions instead of pairwise element comparison operators",
    explanation: "Counting and Radix sort avoid pairwise comparison operators `a < b`, instead using digit positional values and frequency arrays to achieve O(n) linear time."
  }
];

export default questions;
