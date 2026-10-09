const questions = [
  {
    question: "What is the binary equivalent of decimal number 43 using successive division?",
    options: [
      "(101011)₂",
      "(110101)₂",
      "(101101)₂",
      "(111001)₂"
    ],
    correctAnswer: 0,
    explanation: "43/2=21 (rem 1), 21/2=10 (rem 1), 10/2=5 (rem 0), 5/2=2 (rem 1), 2/2=1 (rem 0), 1/2=0 (rem 1). Reading bottom to top gives (101011)₂."
  },
  {
    question: "What is the octal equivalent of decimal number 198?",
    options: [
      "(306)₈",
      "(286)₈",
      "(316)₈",
      "(276)₈"
    ],
    correctAnswer: 0,
    explanation: "198/8 = 24 (rem 6), 24/8 = 3 (rem 0), 3/8 = 0 (rem 3). Reading bottom to top gives (306)₈."
  },
  {
    question: "When converting (254)₁₀ to Hexadecimal, the first remainder obtained is 14. Which symbol must replace 14?",
    options: [
      "D",
      "E",
      "F",
      "C"
    ],
    correctAnswer: 1,
    explanation: "In hexadecimal notation: 10=A, 11=B, 12=C, 13=D, 14=E, 15=F. Therefore, 14 is represented by 'E'."
  },
  {
    question: "Assertion (A): When converting a decimal integer to binary, remainders must be recorded from the last division step (bottom) up to the first (top).\nReason (R): The last remainder corresponds to the Most Significant Bit (MSB), which holds the highest positional weight (2ⁿ).",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "The first remainder obtained represents 2⁰ (LSB), while subsequent remainders represent higher powers of 2 up to the MSB."
  },
  {
    question: "What is the hexadecimal representation of decimal number 175?",
    options: [
      "(AF)₁₆",
      "(BA)₁₆",
      "(FA)₁₆",
      "(A7)₁₆"
    ],
    correctAnswer: 0,
    explanation: "175/16 = 10 with remainder 15 ('F'). 10/16 = 0 with remainder 10 ('A'). Reading bottom to top gives (AF)₁₆."
  }
];

export default questions;
