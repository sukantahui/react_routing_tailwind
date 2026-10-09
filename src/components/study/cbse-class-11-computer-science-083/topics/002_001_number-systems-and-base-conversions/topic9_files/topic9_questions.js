const questions = [
  {
    question: "Which intermediate radix provides the fastest lossless conversion between Octal and Hexadecimal?",
    options: [
      "Decimal (Base 10)",
      "Binary (Base 2)",
      "Base 4",
      "Base 32"
    ],
    correctAnswer: 1,
    explanation: "Because 8 = 2^3 and 16 = 2^4, binary serves as a direct bitwise bridge without requiring decimal division or multiplication."
  },
  {
    question: "What is the result of adding binary numbers 11011₂ and 01110₂?",
    options: [
      "101001₂ (41₁₀)",
      "100101₂ (37₁₀)",
      "111001₂ (57₁₀)",
      "101011₂ (43₁₀)"
    ],
    correctAnswer: 0,
    explanation: "27₁₀ + 14₁₀ = 41₁₀. In binary, 11011₂ + 01110₂ = 101001₂."
  },
  {
    question: "When converting a fractional decimal such as 0.375 to binary, what algorithm is applied?",
    options: [
      "Repeated division by 2 and reading remainders bottom-to-top",
      "Repeated multiplication by 2 and reading integer carries top-to-bottom",
      "Taking reciprocal and dividing",
      "Shifting bits to the right"
    ],
    correctAnswer: 1,
    explanation: "Fractional decimal conversion requires repeated multiplication by the radix (2) and recording the generated integer parts from top to bottom."
  },
  {
    question: "In the positional number system, what does the radix (base) represent?",
    options: [
      "The maximum value a number can store",
      "The total count of unique symbols/digits used by the system to represent numbers",
      "The number of bytes in memory",
      "The clock speed of the CPU"
    ],
    correctAnswer: 1,
    explanation: "The radix or base defines the total number of unique symbols or digits available (e.g. 2 for Binary, 8 for Octal, 10 for Decimal, 16 for Hexadecimal)."
  }
];

export default questions;
