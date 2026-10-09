const questions = [
  {
    question: "What is the fastest technique to convert a large decimal number to binary mentally?",
    options: [
      "Multiplying by 2 repeatedly",
      "Decomposing by subtracting powers of 2 (128, 64, 32, 16, 8, 4, 2, 1)",
      "Dividing by 16 and converting to hex first",
      "Using logarithms"
    ],
    correctAnswer: 1,
    explanation: "Subtracting descending powers of 2 allows instant mental binary bit generation without writing long division ladders on paper."
  },
  {
    question: "Why should students avoid converting Hexadecimal to Decimal when trying to reach Octal in an exam?",
    options: [
      "Decimal numbers cannot represent hexadecimal",
      "It involves tedious double large divisions and multiplications prone to arithmetic error, whereas binary bridging is instantaneous",
      "Octal does not support decimal numbers",
      "It loses precision"
    ],
    correctAnswer: 1,
    explanation: "Binary bridging (Hex -> 4-bit Binary -> 3-bit Octal) requires no multiplication or division, saving valuable exam time and eliminating calculation errors."
  },
  {
    question: "Using the 8-4-2-1 code, what is the instant 4-bit binary representation of Hexadecimal digit 'D'?",
    options: [
      "1100",
      "1101",
      "1110",
      "1011"
    ],
    correctAnswer: 1,
    explanation: "In hexadecimal, D = 13. Since 8 + 4 + 1 = 13, the 8-4-2-1 representation is 1101."
  },
  {
    question: "What quick parity check can immediately detect an arithmetic mistake in Decimal to Binary conversion?",
    options: [
      "Odd decimal numbers must always produce a binary string ending in 1; even decimals must end in 0",
      "All binary strings must have an even number of 1s",
      "The first bit must always be 0",
      "The sum of bits must equal the decimal number"
    ],
    correctAnswer: 0,
    explanation: "Because 2^0 = 1 is the only odd power of two, any odd decimal number must have bit 1 at position 0 (the LSB)."
  }
];

export default questions;
