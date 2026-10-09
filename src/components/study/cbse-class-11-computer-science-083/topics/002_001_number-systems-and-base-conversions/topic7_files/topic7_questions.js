const questions = [
  {
    question: "What is the sum of binary numbers (1011)₂ + (0110)₂?",
    options: [
      "(10001)₂",
      "(10011)₂",
      "(11101)₂",
      "(10101)₂"
    ],
    correctAnswer: 0,
    explanation: "(1011)₂ = 11, (0110)₂ = 6. 11 + 6 = 17 = (10001)₂."
  },
  {
    question: "In binary addition, what is the result of 1 + 1 + 1 (including an incoming carry bit)?",
    options: [
      "Sum = 1, Carry = 1",
      "Sum = 0, Carry = 1",
      "Sum = 1, Carry = 0",
      "Sum = 0, Carry = 0"
    ],
    correctAnswer: 0,
    explanation: "1 + 1 + 1 equals decimal 3, which in binary is 11₂ (Sum = 1, Carry = 1 into the next column)."
  },
  {
    question: "What is the result of binary subtraction (1101)₂ - (0110)₂?",
    options: [
      "(0111)₂",
      "(0101)₂",
      "(1001)₂",
      "(0011)₂"
    ],
    correctAnswer: 0,
    explanation: "13 - 6 = 7 = (0111)₂."
  },
  {
    question: "Assertion (A): Binary multiplication is significantly simpler than decimal multiplication.\nReason (R): In binary, each partial product is formed only by multiplying by 0 (all zeros) or 1 (the exact multiplicand itself).",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Because binary only has digits 0 and 1, multiplication involves only shifting and addition with zero multiplication tables."
  },
  {
    question: "What is the product of binary numbers (101)₂ × (11)₂?",
    options: [
      "(1111)₂",
      "(1101)₂",
      "(1011)₂",
      "(1001)₂"
    ],
    correctAnswer: 0,
    explanation: "(101)₂ = 5, (11)₂ = 3. 5 × 3 = 15 = (1111)₂."
  }
];

export default questions;
