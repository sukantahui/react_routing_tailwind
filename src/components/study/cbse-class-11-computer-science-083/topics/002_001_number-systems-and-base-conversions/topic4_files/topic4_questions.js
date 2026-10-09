const questions = [
  {
    question: "Why does 4-bit binary grouping work directly for converting to Hexadecimal?",
    options: [
      "Because 16 is divisible by 4",
      "Because 16 = 2⁴, which means exactly 4 binary bits (one nibble) map uniquely to each hexadecimal digit (0 to F)",
      "Because hexadecimal was invented 4 centuries ago",
      "Because CPUs only support 4-bit memory addresses"
    ],
    correctAnswer: 1,
    explanation: "Since 16 = 2⁴, any 4-bit binary combination from 0000 to 1111 corresponds to a unique hex digit from 0 to F."
  },
  {
    question: "Convert binary number (10111100)₂ into Hexadecimal using 4-bit grouping:",
    options: [
      "(BC)₁₆",
      "(CB)₁₆",
      "(AB)₁₆",
      "(BD)₁₆"
    ],
    correctAnswer: 0,
    explanation: "(1011) -> B (11), (1100) -> C (12). Concatenating gives (BC)₁₆."
  },
  {
    question: "Convert hexadecimal number (4D8)₁₆ into its binary equivalent:",
    options: [
      "(010011011000)₂",
      "(010011101000)₂",
      "(010011001000)₂",
      "(011011011000)₂"
    ],
    correctAnswer: 0,
    explanation: "4 -> 0100, D -> 1101 (13), 8 -> 1000. Concatenating gives (010011011000)₂."
  },
  {
    question: "Assertion (A): When converting (7B)₁₆ to binary, digit 7 must be expanded to '0111' and B to '1011'.\nReason (R): Every single hexadecimal digit must always be represented by an exact 4-bit binary nibble to maintain positional integrity.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Writing incomplete bit lengths like '111' for 7 instead of '0111' causes positional bit corruption in multi-digit numbers."
  },
  {
    question: "What is the 4-bit binary equivalent of hexadecimal digit 'F'?",
    options: [
      "1111",
      "1110",
      "1001",
      "0111"
    ],
    correctAnswer: 0,
    explanation: "'F' equals decimal 15, which in 4-bit binary is 1111 (8 + 4 + 2 + 1)."
  }
];

export default questions;
