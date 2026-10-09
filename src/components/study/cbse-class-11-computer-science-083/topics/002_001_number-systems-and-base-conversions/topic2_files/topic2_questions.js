const questions = [
  {
    question: "What is the decimal equivalent of binary number (110110)₂?",
    options: [
      "(54)₁₀",
      "(52)₁₀",
      "(48)₁₀",
      "(56)₁₀"
    ],
    correctAnswer: 0,
    explanation: "1×32 + 1×16 + 0×8 + 1×4 + 1×2 + 0×1 = 32 + 16 + 4 + 2 = 54."
  },
  {
    question: "What is the decimal equivalent of octal number (345)₈?",
    options: [
      "(229)₁₀",
      "(235)₁₀",
      "(220)₁₀",
      "(245)₁₀"
    ],
    correctAnswer: 0,
    explanation: "(3 × 8²) + (4 × 8¹) + (5 × 8⁰) = (3 × 64) + (4 × 8) + (5 × 1) = 192 + 32 + 5 = 229."
  },
  {
    question: "What is the decimal equivalent of hexadecimal number (1B4)₁₆?",
    options: [
      "(436)₁₀",
      "(420)₁₀",
      "(450)₁₀",
      "(412)₁₀"
    ],
    correctAnswer: 0,
    explanation: "(1 × 16²) + (B × 16¹) + (4 × 16⁰) = (1 × 256) + (11 × 16) + (4 × 1) = 256 + 176 + 4 = 436."
  },
  {
    question: "Assertion (A): In any number system with base R, the rightmost integer digit is always multiplied by R⁰.\nReason (R): In positional notation, powers of the base start at 0 at the units position and increase by 1 for each step to the left.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "The positional weight of the units column is always Base⁰ = 1, followed by Base¹, Base², etc."
  },
  {
    question: "What is the value of hexadecimal (FF)₁₆ in the decimal system?",
    options: [
      "(255)₁₀",
      "(256)₁₀",
      "(254)₁₀",
      "(1515)₁₀"
    ],
    correctAnswer: 0,
    explanation: "(15 × 16¹) + (15 × 16⁰) = 240 + 15 = 255."
  }
];

export default questions;
