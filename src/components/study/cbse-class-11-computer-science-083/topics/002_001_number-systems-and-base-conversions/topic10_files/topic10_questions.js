// topic10_questions.js
// CBSE Class XI Computer Science (083) - Module 002.001: 30-Question Board Exam Simulator
// Educator: Sukanta Hui

const questions = [
  {
    id: 1,
    question: "What is the decimal equivalent of the binary number (110101)₂?",
    options: ["45", "53", "55", "61"],
    answer: "53",
    explanation: "1×32 + 1×16 + 0×8 + 1×4 + 0×2 + 1×1 = 32 + 16 + 4 + 1 = 53₁₀."
  },
  {
    id: 2,
    question: "Convert the decimal integer (156)₁₀ into its hexadecimal equivalent.",
    options: ["9C", "8C", "9B", "A4"],
    answer: "9C",
    explanation: "156 ÷ 16 = 9 with remainder 12 ('C'). Reading bottom-to-top gives (9C)₁₆."
  },
  {
    id: 3,
    question: "Convert the octal number (735)₈ directly to binary.",
    options: ["111011101", "111011111", "110011101", "111101101"],
    answer: "111011101",
    explanation: "Replacing each octal digit with its 3-bit binary equivalent: 7 -> 111, 3 -> 011, 5 -> 101 => (111011101)₂."
  },
  {
    id: 4,
    question: "How many bits are grouped together to convert a binary string directly to a hexadecimal number?",
    options: ["2 bits", "3 bits", "4 bits (Nibble)", "8 bits (Byte)"],
    answer: "4 bits (Nibble)",
    explanation: "Since 16 = 2⁴, 4 binary bits (one nibble) correspond exactly to one hexadecimal digit."
  },
  {
    id: 5,
    question: "Perform binary addition: (10110)₂ + (01101)₂ = ?",
    options: ["(100011)₂", "(100001)₂", "(110011)₂", "(100111)₂"],
    answer: "(100011)₂",
    explanation: "(22)₁₀ + (13)₁₀ = (35)₁₀. 35 in binary is 32 + 2 + 1 = (100011)₂."
  },
  {
    id: 6,
    question: "Which of the following represents an invalid number in the octal system?",
    options: ["(654)₈", "(701)₈", "(482)₈", "(127)₈"],
    answer: "(482)₈",
    explanation: "The octal number system only permits digits from 0 through 7. Digit '8' is illegal in base 8."
  },
  {
    id: 7,
    question: "Convert the hexadecimal number (2F)₁₆ to its octal equivalent via binary bridging.",
    options: ["(47)₈", "(57)₈", "(67)₈", "(77)₈"],
    answer: "(57)₈",
    explanation: "2F₁₆ = 0010 1111₂. Grouping in 3s from right: 000 101 111₂ = (057)₈ = (57)₈."
  },
  {
    id: 8,
    question: "What is the binary representation of the fractional decimal (0.625)₁₀?",
    options: ["(0.101)₂", "(0.110)₂", "(0.011)₂", "(0.111)₂"],
    answer: "(0.101)₂",
    explanation: "0.625 × 2 = 1.25 (carry 1); 0.25 × 2 = 0.5 (carry 0); 0.5 × 2 = 1.0 (carry 1) => (0.101)₂."
  },
  {
    id: 9,
    question: "What is the hexadecimal digit for the decimal value 14?",
    options: ["C", "D", "E", "F"],
    answer: "E",
    explanation: "In Hexadecimal: A=10, B=11, C=12, D=13, E=14, F=15."
  },
  {
    id: 10,
    question: "Perform binary subtraction: (1100)₂ - (0101)₂ = ?",
    options: ["(0111)₂", "(0110)₂", "(0011)₂", "(1001)₂"],
    answer: "(0111)₂",
    explanation: "12₁₀ - 5₁₀ = 7₁₀ = (0111)₂."
  },
  {
    id: 11,
    question: "What is the positional weight of digit '3' in the octal number (345)₈?",
    options: ["8⁰ = 1", "8¹ = 8", "8² = 64", "8³ = 512"],
    answer: "8² = 64",
    explanation: "In (345)₈, position of 5 is 0 (8⁰), 4 is 1 (8¹), and 3 is 2 (8² = 64)."
  },
  {
    id: 12,
    question: "In fractional binary conversion, which direction are generated integer carries read?",
    options: ["Bottom to Top", "Top to Bottom", "Right to Left", "Random order"],
    answer: "Top to Bottom",
    explanation: "For fractional radix multiplication, generated integer carries are written from Top to Bottom (MSD to LSD)."
  },
  {
    id: 13,
    question: "Convert binary (11111111)₂ to decimal.",
    options: ["127", "255", "256", "512"],
    answer: "255",
    explanation: "8 consecutive 1 bits = 2⁸ - 1 = 256 - 1 = 255₁₀."
  },
  {
    id: 14,
    question: "What is the decimal equivalent of the hexadecimal number (A0)₁₆?",
    options: ["100", "160", "170", "200"],
    answer: "160",
    explanation: "A = 10. Value = 10 × 16¹ + 0 × 16⁰ = 160₁₀."
  },
  {
    id: 15,
    question: "How many distinct values can be represented with 8 binary bits (1 Byte)?",
    options: ["128", "255", "256", "512"],
    answer: "256",
    explanation: "Total unique patterns = 2⁸ = 256 (ranging from 0 to 255 for unsigned)."
  },
  {
    id: 16,
    question: "Convert decimal (75)₁₀ to Octal.",
    options: ["(113)₈", "(123)₈", "(103)₈", "(133)₈"],
    answer: "(113)₈",
    explanation: "75 ÷ 8 = 9 (rem 3); 9 ÷ 8 = 1 (rem 1); 1 ÷ 8 = 0 (rem 1) => (113)₈."
  },
  {
    id: 17,
    question: "What is the result of binary multiplication: (101)₂ × (11)₂?",
    options: ["(1111)₂", "(1001)₂", "(1010)₂", "(1101)₂"],
    answer: "(1111)₂",
    explanation: "5₁₀ × 3₁₀ = 15₁₀ = (1111)₂."
  },
  {
    id: 18,
    question: "Convert hexadecimal (1A3)₁₆ to binary.",
    options: ["000110100011", "000110110011", "001010100011", "000110100111"],
    answer: "000110100011",
    explanation: "1 -> 0001, A -> 1010, 3 -> 0011 => 0001 1010 0011₂."
  },
  {
    id: 19,
    question: "When grouping fractional binary bits for octal conversion, in which direction must padding zeros be added if needed?",
    options: ["To the left of the integer part", "To the far right end of the fractional part", "In the middle", "Padding is never allowed"],
    answer: "To the far right end of the fractional part",
    explanation: "Fractional binary bit grouping proceeds from left to right (away from the binary point), and padding zeros are appended at the far right end."
  },
  {
    id: 20,
    question: "What is the decimal equivalent of the fractional binary (0.01)₂?",
    options: ["0.5", "0.25", "0.125", "0.05"],
    answer: "0.25",
    explanation: "0 × 2⁻¹ + 1 × 2⁻² = 1/4 = 0.25₁₀."
  },
  {
    id: 21,
    question: "Which of the following decimal values is equivalent to (77)₈?",
    options: ["56", "63", "70", "77"],
    answer: "63",
    explanation: "7 × 8¹ + 7 × 8⁰ = 56 + 7 = 63₁₀."
  },
  {
    id: 22,
    question: "What is the sum of (1)₂ + (1)₂ + (1)₂ in binary arithmetic?",
    options: ["0 with carry 1", "1 with carry 1 ((11)₂)", "1 with carry 0", "10 with carry 1"],
    answer: "1 with carry 1 ((11)₂)",
    explanation: "1 + 1 + 1 = 3₁₀ = (11)₂. The sum bit is 1 and the carry bit to the next column is 1."
  },
  {
    id: 23,
    question: "Convert (11010.11)₂ to decimal.",
    options: ["26.75", "26.50", "28.75", "27.25"],
    answer: "26.75",
    explanation: "Integer: 16 + 8 + 2 = 26. Fractional: 1×0.5 + 1×0.25 = 0.75 => 26.75₁₀."
  },
  {
    id: 24,
    question: "What is the largest value that can be represented with 3 octal digits?",
    options: ["(777)₈ = 511₁₀", "(999)₈ = 999₁₀", "(111)₈ = 73₁₀", "(777)₈ = 1024₁₀"],
    answer: "(777)₈ = 511₁₀",
    explanation: "Max 3-digit octal number is 777₈ = 8³ - 1 = 512 - 1 = 511₁₀."
  },
  {
    id: 25,
    question: "Why do programmers frequently use Hexadecimal instead of raw Binary for memory addresses?",
    options: ["Hexadecimal uses less CPU processing", "Hexadecimal is a compact human-readable representation where every 4 binary bits condense into a single character", "Hexadecimal has error correction built-in", "Binary cannot be printed on screens"],
    answer: "Hexadecimal is a compact human-readable representation where every 4 binary bits condense into a single character",
    explanation: "Hexadecimal condenses long, error-prone binary bitstrings (e.g. 16 bits = 4 hex chars) into a compact, human-readable format without losing direct bit alignment."
  },
  {
    id: 26,
    question: "Convert (3B)₁₆ to Decimal.",
    options: ["55", "59", "61", "63"],
    answer: "59",
    explanation: "3 × 16¹ + 11 × 16⁰ = 48 + 11 = 59₁₀."
  },
  {
    id: 27,
    question: "What is (1000)₂ - (0001)₂ in binary arithmetic?",
    options: ["(0111)₂", "(0011)₂", "(1111)₂", "(0101)₂"],
    answer: "(0111)₂",
    explanation: "8₁₀ - 1₁₀ = 7₁₀ = (0111)₂."
  },
  {
    id: 28,
    question: "Convert decimal 0.125 to Octal.",
    options: ["(0.1)₈", "(0.2)₈", "(0.01)₈", "(0.125)₈"],
    answer: "(0.1)₈",
    explanation: "0.125 × 8 = 1.0 (Integer carry: 1, remaining frac: 0) => (0.1)₈."
  },
  {
    id: 29,
    question: "If a binary string has 6 bits, what is the maximum number of octal digits it will produce?",
    options: ["1", "2", "3", "4"],
    answer: "2",
    explanation: "6 bits ÷ 3 bits per octal digit = 2 octal digits exactly."
  },
  {
    id: 30,
    question: "Convert the binary number (1011110)₂ to Hexadecimal.",
    options: ["5E", "5D", "6E", "4F"],
    answer: "5E",
    explanation: "Pad to 8 bits: 0101 1110₂. 0101 = 5, 1110 = 14 ('E') => (5E)₁₆."
  }
];

export default questions;
