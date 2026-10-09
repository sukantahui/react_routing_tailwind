const questions = [
  {
    question: "Why can binary numbers be directly converted to octal using 3-bit grouping?",
    options: [
      "Because 8 is divisible by 3",
      "Because 8 = 2³, meaning exactly 3 binary bits represent each octal digit (0-7)",
      "Because octal systems only support 3-digit numbers",
      "Because 8 bits equal 1 byte"
    ],
    correctAnswer: 1,
    explanation: "Since 8 is 2³, each 3-bit binary combination (from 000 to 111) maps uniquely to one octal digit (0 to 7)."
  },
  {
    question: "Convert binary number (1011101)₂ into Octal using 3-bit grouping:",
    options: [
      "(135)₈",
      "(125)₈",
      "(145)₈",
      "(137)₈"
    ],
    correctAnswer: 0,
    explanation: "Group from right: (001) (011) (101) -> 1, 3, 5 -> (135)₈."
  },
  {
    question: "Convert octal number (623)₈ into its binary equivalent:",
    options: [
      "(110010011)₂",
      "(110100011)₂",
      "(110010110)₂",
      "(101010011)₂"
    ],
    correctAnswer: 0,
    explanation: "6 -> 110, 2 -> 010, 3 -> 011. Concatenating gives (110010011)₂."
  },
  {
    question: "Assertion (A): When grouping binary integer bits into triplets, grouping must start from the rightmost bit (LSB).\nReason (R): Starting from the right ensures that any required padding with zero bits affects only the most significant (leftmost) place value without altering the numeric magnitude.",
    options: [
      "Both A and R are true, and R is the correct explanation of A",
      "Both A and R are true, but R is not the correct explanation of A",
      "A is true, but R is false",
      "A is false, but R is true"
    ],
    correctAnswer: 0,
    explanation: "Padding zeros on the far left (MSB) preserves the integer value, whereas grouping from the left would shift positional place values."
  },
  {
    question: "What is the common student mistake when converting octal digit 2 into binary in the middle of a number like (527)₈?",
    options: [
      "Writing '10' instead of the full 3-bit triplet '010'",
      "Writing '000' instead of '010'",
      "Multiplying 2 by 8",
      "Subtracting 1 from 2"
    ],
    correctAnswer: 0,
    explanation: "Omitting the leading 0 in the 3-bit representation (writing 10 instead of 010) corrupts the positional bit alignment."
  }
];

export default questions;
