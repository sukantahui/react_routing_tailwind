const questions = [
  {
    question: "What algorithm is used to convert the fractional part of a decimal number into another base?",
    options: [
      "Successive Division",
      "Successive Multiplication by the target base",
      "Bit-reversal permutation",
      "Complement addition"
    ],
    correctAnswer: 1,
    explanation: "Fractional parts are multiplied repeatedly by the target base, and the generated integer parts are recorded from top to bottom."
  },
  {
    question: "What is the binary representation of decimal fraction (0.375)₁₀?",
    options: [
      "(0.011)₂",
      "(0.101)₂",
      "(0.110)₂",
      "(0.001)₂"
    ],
    correctAnswer: 0,
    explanation: "0.375 × 2 = 0.75 (int 0); 0.75 × 2 = 1.5 (int 1); 0.5 × 2 = 1.0 (int 1). Reading top to bottom gives (0.011)₂."
  },
  {
    question: "What is the decimal equivalent of binary fraction (0.11)₂?",
    options: [
      "(0.75)₁₀",
      "(0.50)₁₀",
      "(0.25)₁₀",
      "(0.60)₁₀"
    ],
    correctAnswer: 0,
    explanation: "(1 × 2⁻¹) + (1 × 2⁻²) = 0.5 + 0.25 = 0.75."
  },
  {
    question: "Assertion (A): In fractional radix conversion, integer parts are read from top to bottom (first to last).\nReason (R): The first multiplication product yields the digit with the highest fractional positional weight (Base⁻¹ = 1/Base).",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "The first integer generated corresponds to the 1/Base column (most significant fractional place value), so it must be written first directly after the radix point."
  },
  {
    question: "What is the octal equivalent of decimal fraction (0.125)₁₀?",
    options: [
      "(0.1)₈",
      "(0.2)₈",
      "(0.01)₈",
      "(0.05)₈"
    ],
    correctAnswer: 0,
    explanation: "0.125 × 8 = 1.000 (integer 1, remainder 0). Result is (0.1)₈."
  }
];

export default questions;
