const questions = [
  {
    question: "Why is Binary the optimal intermediary base when converting between Octal and Hexadecimal?",
    options: [
      "Because Binary is the only base allowed in CBSE exams",
      "Because 8 = 2³ and 16 = 2⁴, allowing bit grouping without decimal multiplication or division",
      "Because decimal numbers do not exist inside computer memory",
      "Because octal cannot be divided by 8"
    ],
    correctAnswer: 1,
    explanation: "Because 8 and 16 are direct powers of 2, expanding into 3-bit triplets and regrouping into 4-bit nibbles is mathematically direct and error-free."
  },
  {
    question: "Convert octal number (345)₈ to Hexadecimal via Binary intermediary:",
    options: [
      "(E5)₁₆",
      "(D5)₁₆",
      "(F5)₁₆",
      "(C5)₁₆"
    ],
    correctAnswer: 0,
    explanation: "(345)₈ -> (011)(100)(101)₂ -> (1110)(0101)₂ -> (E5)₁₆."
  },
  {
    question: "Convert hexadecimal number (2B)₁₆ to Octal via Binary intermediary:",
    options: [
      "(53)₈",
      "(63)₈",
      "(43)₈",
      "(73)₈"
    ],
    correctAnswer: 0,
    explanation: "(2B)₁₆ -> (0010)(1011)₂ -> (000)(101)(011)₂ -> (53)₈."
  },
  {
    question: "Assertion (A): Converting (777)₈ directly to Hexadecimal via Binary takes under 15 seconds.\nReason (R): 777 expands directly to 111111111₂, which regrouped into 4-bit nibbles (0001)(1111)(1111)₂ produces (1FF)₁₆ immediately.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "The binary bridge is extremely rapid because each step is simple table lookup and regrouping rather than long multiplication."
  },
  {
    question: "What is the binary representation obtained when (A5)₁₆ is expanded before regrouping into octal?",
    options: [
      "10100101",
      "10110101",
      "10100001",
      "11000101"
    ],
    correctAnswer: 0,
    explanation: "A = 1010, 5 = 0101. Combined: 10100101."
  }
];

export default questions;
