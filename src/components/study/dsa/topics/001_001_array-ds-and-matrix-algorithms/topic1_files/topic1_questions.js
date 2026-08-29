const questions = [
  {
    id: 1,
    question: "Why is 3-Tuple Representation preferred for Sparse Matrices?",
    options: [
      "Saves memory by storing only non-zero elements (row, col, value) instead of empty zeros",
      "Speeds up standard array indexing",
      "Allows string indexing",
      "Uses double memory"
    ],
    answer: "Saves memory by storing only non-zero elements (row, col, value) instead of empty zeros",
    explanation: "When a matrix contains mostly zeros (e.g. 95% zeros), storing 2D arrays wastes RAM. 3-Tuple stores only active (row, col, val) triplets."
  }
];

export default questions;
