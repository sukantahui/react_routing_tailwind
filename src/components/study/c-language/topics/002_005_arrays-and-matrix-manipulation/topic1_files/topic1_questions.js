const questions = [
  {
    question: "Why does Binary Search require a sorted array?",
    shortAnswer: "Binary search eliminates half the remaining elements per iteration by comparing target with middle element.",
    explanation: "If the array is unsorted, discarding half the search space might accidentally discard the target element.",
    hint: "Binary Search operates on sorted arrays in O(log N) time.",
    level: "intermediate"
  }
];

export default questions;
