const questions = [
  {
    id: 1,
    question: "What is the base (radix) of the Hexadecimal number system?",
    options: ["2", "8", "10", "16"],
    correctAnswer: 3,
    explanation: "The Hexadecimal system uses base 16 and contains 16 distinct symbols: 0 to 9 representing numeric values 0–9, and letters A through F representing values 10 through 15.",
    hint: "Hexa (6) + Deci (10) = Base 16."
  },
  {
    id: 2,
    question: "What is the decimal equivalent of the binary number (110101)₂?",
    options: ["45", "53", "55", "61"],
    correctAnswer: 1,
    explanation: "(110101)₂ = 1×2⁵ + 1×2⁴ + 0×2³ + 1×2² + 0×2¹ + 1×2⁰ = 32 + 16 + 0 + 4 + 0 + 1 = 53₁₀.",
    hint: "Sum powers of 2 for each '1' bit: 32 + 16 + 4 + 1."
  },
  {
    id: 3,
    question: "Convert decimal number (156)₁₀ to its binary representation:",
    options: ["(10011100)₂", "(10111100)₂", "(10011010)₂", "(11001100)₂"],
    correctAnswer: 0,
    explanation: "156 / 2 = 78 (rem 0), 78 / 2 = 39 (rem 0), 39 / 2 = 19 (rem 1), 19 / 2 = 9 (rem 1), 9 / 2 = 4 (rem 1), 4 / 2 = 2 (rem 0), 2 / 2 = 1 (rem 0), 1 / 2 = 0 (rem 1). Reading remainders from bottom to top yields (10011100)₂.",
    hint: "128 + 16 + 8 + 4 = 156 -> Bits at positions 7, 4, 3, 2 are 1."
  },
  {
    id: 4,
    question: "How many binary bits are required to represent a single Octal digit (base 8)?",
    options: ["2 bits", "3 bits", "4 bits", "8 bits"],
    correctAnswer: 1,
    explanation: "Since 2³ = 8, exactly 3 binary bits are required and sufficient to represent any octal digit from 0 to 7 (e.g. 7₈ = 111₂).",
    hint: "2 to the power 3 equals 8."
  },
  {
    id: 5,
    question: "How many binary bits are required to represent a single Hexadecimal digit (base 16)?",
    options: ["2 bits", "3 bits", "4 bits", "16 bits"],
    correctAnswer: 2,
    explanation: "Since 2⁴ = 16, a single hexadecimal digit (0 to F) maps directly to a 4-bit nibble (e.g. F₁₆ = 1111₂).",
    hint: "2 to the power 4 equals 16 (a nibble)."
  },
  {
    id: 6,
    question: "Convert the binary number (101101110)₂ directly into Octal:",
    options: ["(556)₈", "(566)₈", "(554)₈", "(567)₈"],
    correctAnswer: 0,
    explanation: "Group bits in triplets from right to left: 101 | 101 | 110 -> 101₂ = 5, 101₂ = 5, 110₂ = 6. Result is (556)₈.",
    hint: "Group into 3-bit triplets from right to left: 101 101 110."
  },
  {
    id: 7,
    question: "Convert the binary number (110110101111)₂ directly into Hexadecimal:",
    options: ["(DAF)₁₆", "(D8F)₁₆", "(CBF)₁₆", "(CAF)₁₆"],
    correctAnswer: 0,
    explanation: "Group bits in nibbles (4-bit chunks) from right to left: 1101 | 1010 | 1111 -> 1101₂ = 13 (D), 1010₂ = 10 (A), 1111₂ = 15 (F). Result is (DAF)₁₆.",
    hint: "1101 = D, 1010 = A, 1111 = F."
  },
  {
    id: 8,
    question: "Convert the Hexadecimal value (2B)₁₆ to Decimal:",
    options: ["41", "43", "45", "47"],
    correctAnswer: 1,
    explanation: "(2B)₁₆ = 2×16¹ + B×16⁰ = 2×16 + 11×1 = 32 + 11 = 43₁₀.",
    hint: "B in hexadecimal represents the value 11."
  },
  {
    id: 9,
    question: "What is the decimal equivalent of the fractional binary number (0.101)₂ [Enrichment]?",
    options: ["0.5", "0.625", "0.75", "0.875"],
    correctAnswer: 1,
    explanation: "(0.101)₂ = 1×2⁻¹ + 0×2⁻² + 1×2⁻³ = 1/2 + 0 + 1/8 = 0.5 + 0.125 = 0.625₁₀.",
    hint: "Powers of 2 for negative exponents: 2^-1 = 0.5, 2^-2 = 0.25, 2^-3 = 0.125."
  },
  {
    id: 10,
    question: "Convert fractional decimal (0.375)₁₀ to Binary [Enrichment]:",
    options: ["(0.011)₂", "(0.101)₂", "(0.110)₂", "(0.001)₂"],
    correctAnswer: 0,
    explanation: "Multiply by 2 successively: 0.375 × 2 = 0.75 (int 0), 0.75 × 2 = 1.5 (int 1, frac 0.5), 0.5 × 2 = 1.0 (int 1, frac 0.0). Reading integers top to bottom gives (0.011)₂.",
    hint: "Successive multiplication by 2."
  },
  {
    id: 11,
    question: "Convert Octal (347)₈ to Binary:",
    options: ["(011100111)₂", "(011101111)₂", "(100100111)₂", "(011110111)₂"],
    correctAnswer: 0,
    explanation: "Expand each octal digit into 3 binary bits: 3 -> 011, 4 -> 100, 7 -> 111. Result is (011100111)₂.",
    hint: "3 = 011, 4 = 100, 7 = 111."
  },
  {
    id: 12,
    question: "Convert Hexadecimal (A5C)₁₆ to Binary:",
    options: ["(101001011100)₂", "(101001011010)₂", "(101101011100)₂", "(101010011100)₂"],
    correctAnswer: 0,
    explanation: "Expand each hex digit into 4 bits: A (10) -> 1010, 5 -> 0101, C (12) -> 1100. Combining gives (101001011100)₂.",
    hint: "A=1010, 5=0101, C=1100."
  },
  {
    id: 13,
    question: "Convert Octal (72)₈ to Decimal:",
    options: ["56", "58", "60", "62"],
    correctAnswer: 1,
    explanation: "(72)₈ = 7×8¹ + 2×8⁰ = 56 + 2 = 58₁₀.",
    hint: "7 times 8 plus 2."
  },
  {
    id: 14,
    question: "Convert Decimal (255)₁₀ to Hexadecimal:",
    options: ["(EE)₁₆", "(FE)₁₆", "(FF)₁₆", "(EF)₁₆"],
    correctAnswer: 2,
    explanation: "255 / 16 = 15 with remainder 15. 15 = F in hex. Thus (FF)₁₆.",
    hint: "Maximum value representable in a single byte (8 bits all 1s = 255 = 0xFF)."
  },
  {
    id: 15,
    question: "What is the binary sum of (1011)₂ + (0110)₂?",
    options: ["(10001)₂", "(10000)₂", "(10010)₂", "(10101)₂"],
    correctAnswer: 0,
    explanation: "1011₂ (11) + 0110₂ (6) = 17₁₀ = (10001)₂ (16 + 1).",
    hint: "11 + 6 = 17 in decimal = 10001 in binary."
  },
  {
    id: 16,
    question: "What is the base of the Octal number system?",
    options: ["2", "8", "10", "16"],
    correctAnswer: 1,
    explanation: "The Octal number system uses base 8 and digits 0, 1, 2, 3, 4, 5, 6, 7.",
    hint: "Octal uses 8 symbols."
  },
  {
    id: 17,
    question: "Which of the following is NOT a valid Octal number?",
    options: ["(745)₈", "(618)₈", "(302)₈", "(123)₈"],
    correctAnswer: 1,
    explanation: "(618)₈ is invalid because the digit '8' does not exist in base 8 (valid digits are 0 through 7).",
    hint: "Look for digits greater than 7."
  },
  {
    id: 18,
    question: "Which of the following is NOT a valid Hexadecimal number?",
    options: ["(10A)₁₆", "(B2G)₁₆", "(C0D)₁₆", "(F99)₁₆"],
    correctAnswer: 1,
    explanation: "(B2G)₁₆ is invalid because 'G' is not a hexadecimal digit (valid alphabetic digits are A through F).",
    hint: "Hex letters range only from A to F."
  },
  {
    id: 19,
    question: "Convert (101011.11)₂ to Decimal [Enrichment]:",
    options: ["43.5", "43.75", "42.75", "43.25"],
    correctAnswer: 1,
    explanation: "Integer part: 101011₂ = 32 + 8 + 2 + 1 = 43. Fractional part: .11₂ = 1/2 + 1/4 = 0.5 + 0.25 = 0.75. Total = 43.75₁₀.",
    hint: "101011 is 43, .11 is 0.75."
  },
  {
    id: 20,
    question: "Convert Octal (157)₈ to Hexadecimal:",
    options: ["(6F)₁₆", "(5F)₁₆", "(7E)₁₆", "(6E)₁₆"],
    correctAnswer: 0,
    explanation: "Octal to Binary: 157₈ = 001 101 111₂ = (01101111)₂. Regroup into 4-bit nibbles: 0110 | 1111 -> 0110₂ = 6, 1111₂ = F. Result is (6F)₁₆.",
    hint: "Convert through binary as a bridge: Octal -> Binary -> Hex."
  },
  {
    id: 21,
    question: "Why do computer scientists frequently use Hexadecimal and Octal notation?",
    options: [
      "Because CPUs execute hexadecimal circuits directly",
      "As a human-readable shorthand representation for long, unwieldy binary bitstrings",
      "Because decimal numbers take more RAM storage",
      "Because Python requires all integers in hexadecimal format"
    ],
    correctAnswer: 1,
    explanation: "Hexadecimal (1 hex digit = 4 bits) and Octal (1 octal digit = 3 bits) serve as compact, human-readable shorthand representations for binary memory addresses, byte values, and color codes (e.g. #FFFFFF).",
    hint: "Compact shorthand for long strings of 0s and 1s."
  },
  {
    id: 22,
    question: "What is the decimal equivalent of (11.001)₂ [Enrichment]?",
    options: ["3.125", "3.25", "3.5", "3.0625"],
    correctAnswer: 0,
    explanation: "Integer: 11₂ = 3. Fractional: .001₂ = 0×2⁻¹ + 0×2⁻² + 1×2⁻³ = 1/8 = 0.125. Total = 3.125₁₀.",
    hint: "11 is 3, 001 is 1/8 = 0.125."
  },
  {
    id: 23,
    question: "In Python, which prefix denotes a hexadecimal integer literal?",
    options: ["0b", "0o", "0x", "0h"],
    correctAnswer: 2,
    explanation: "In Python, `0x` or `0X` specifies hexadecimal (e.g. `0xFF` evaluates to `255`), `0b` denotes binary, and `0o` denotes octal.",
    hint: "0x is for Hex, 0b is for Binary, 0o is for Octal."
  },
  {
    id: 24,
    question: "Convert Decimal (77)₁₀ to Octal:",
    options: ["(114)₈", "(115)₈", "(116)₈", "(125)₈"],
    correctAnswer: 1,
    explanation: "77 / 8 = 9 (rem 5), 9 / 8 = 1 (rem 1), 1 / 8 = 0 (rem 1). Reading remainders upwards: (115)₈. Check: 1×64 + 1×8 + 5×1 = 77.",
    hint: "Divide by 8 repeatedly and read remainders."
  },
  {
    id: 25,
    question: "Case Study: Debangshu is debugging a memory crash and finds the pointer address 0x7FFE9B40. How many bytes does this hexadecimal string represent?",
    options: ["4 bytes (32 bits)", "8 bytes (64 bits)", "2 bytes (16 bits)", "16 bytes (128 bits)"],
    correctAnswer: 0,
    explanation: "The address has 8 hex digits (`7FFE9B40`). Since each hex digit equals 4 bits (half a byte), 8 hex digits = 8 × 4 = 32 bits = 4 bytes.",
    hint: "Each hex digit represents 4 bits. 8 digits * 4 bits = 32 bits = 4 bytes."
  }
];

export default questions;
