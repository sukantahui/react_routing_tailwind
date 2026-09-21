// Question Bank for Topic 1: Conversion from Decimal to Binary
// Computer Architecture Masterclass - Coder & AccoTax

const questions = [
  {
    question: "Why is the successive division algorithm used to convert decimal integers to binary?",
    shortAnswer: "Because dividing by 2 repeatedly extracts the remainder corresponding to each increasing power of 2 ($2^0, 2^1, 2^2, \\dots$).",
    explanation: "Any positive integer $N$ can be written as $N = 2 \\cdot Q + R_0$, where $R_0 \\in \\{0, 1\\}$ is the LSB ($2^0$ place). Dividing $Q$ by 2 extracts $R_1$ ($2^1$ place), and so forth until the quotient becomes 0.",
    hint: "Modulo 2 ($N \\pmod 2$) always isolates the lowest unextracted bit.",
    level: "basic",
    codeExample: "// In C:\nint n = 156;\nwhile (n > 0) {\n    int rem = n % 2;\n    printf(\"%d\", rem);\n    n /= 2;\n}"
  },
  {
    question: "What is the binary representation of decimal integer 156₁₀?",
    shortAnswer: "(10011100)₂",
    explanation: "$156 = 128 + 16 + 8 + 4 = 2^7 + 2^4 + 2^3 + 2^2$. Placing 1s at positions 7, 4, 3, 2 and 0s elsewhere yields $(10011100)_2$.",
    hint: "128 (yes), 64 (no), 32 (no), 16 (yes), 8 (yes), 4 (yes), 2 (no), 1 (no).",
    level: "basic",
    codeExample: "156 = 128 + 16 + 8 + 4 -> 10011100_2"
  },
  {
    question: "Why must the remainders in successive division be read from bottom to top (in reverse order)?",
    shortAnswer: "Because the first remainder produced corresponds to the units place ($2^0$, LSB), while the last remainder corresponds to the highest power of 2 (MSB).",
    explanation: "The first division extracts $N \\pmod 2$, which is the Least Significant Bit. As division continues, subsequent remainders represent higher positional powers ($2^1, 2^2, \\dots$). Therefore, writing from MSB to LSB requires reading in reverse order (bottom-up).",
    hint: "First generated = LSB (rightmost). Last generated = MSB (leftmost).",
    level: "basic",
    codeExample: "// Division steps for 13:\n// 13/2 = 6 R 1 (LSB)\n//  6/2 = 3 R 0\n//  3/2 = 1 R 1\n//  1/2 = 0 R 1 (MSB) -> 1101_2"
  },
  {
    question: "What is the binary conversion of decimal fraction 0.8125₁₀?",
    shortAnswer: "(0.1101)₂",
    explanation: "$0.8125 \\times 2 = 1.625$ (Carry 1); $0.625 \\times 2 = 1.25$ (Carry 1); $0.25 \\times 2 = 0.5$ (Carry 0); $0.5 \\times 2 = 1.0$ (Carry 1). Result = $0.1101_2$.",
    hint: "0.5 + 0.25 + 0.0625 = 0.8125 = 2^-1 + 2^-2 + 2^-4.",
    level: "moderate",
    codeExample: "// 0.8125 = 0.5 (1/2) + 0.25 (1/4) + 0.0625 (1/16) = 0.1101_2"
  },
  {
    question: "How is the mixed decimal number 73.625₁₀ converted to binary?",
    shortAnswer: "(1001001.101)₂",
    explanation: "Integer 73: $64 + 8 + 1 = 2^6 + 2^3 + 2^0 = 1001001_2$. Fraction 0.625: $0.5 + 0.125 = 2^{-1} + 2^{-3} = 0.101_2$. Combined = $1001001.101_2$.",
    hint: "Convert integer part (73) and fraction part (0.625) separately, then join at the radix point.",
    level: "moderate",
    codeExample: "// 73_10 = 1001001_2\n// 0.625_10 = 0.101_2\n// 73.625_10 = 1001001.101_2"
  },
  {
    question: "What is the Power-of-2 Decomposition method and why is it faster for human mental math?",
    shortAnswer: "It decomposes a number directly into sum of powers of 2 ($128, 64, 32, 16, 8, 4, 2, 1$), placing 1s in active bit slots.",
    explanation: "Instead of writing down repeated division steps, you greedily subtract the largest power of 2 that fits into the number. For example, $99 = 64 + 32 + 2 + 1 = 2^6 + 2^5 + 2^1 + 2^0 = 1100011_2$.",
    hint: "Subtract 64 -> 35 left; subtract 32 -> 3 left; subtract 2 -> 1 left; subtract 1 -> 0 left.",
    level: "basic",
    codeExample: "// 99 = 64 (bit 6) + 32 (bit 5) + 2 (bit 1) + 1 (bit 0) = 1100011_2"
  },
  {
    question: "Why does converting decimal 0.2₁₀ to binary yield a recurring non-terminating fraction?",
    shortAnswer: "$0.2 = 1/5$. In base-2, only fractions whose denominators are powers of 2 terminate. Hence $0.2_{10} = 0.00110011\\dots_2$.",
    explanation: "Multiplication steps: $0.2 \\times 2 = 0.4$ (0), $0.4 \\times 2 = 0.8$ (0), $0.8 \\times 2 = 1.6$ (1), $0.6 \\times 2 = 1.2$ (1), $0.2 \\times 2 = 0.4$ (0, cycle repeats!). The bit pattern '0011' repeats infinitely.",
    hint: "Cycle repeats when fractional part returns to 0.2/0.4.",
    level: "moderate",
    codeExample: "// 0.2 * 2 = 0.4 (0)\n// 0.4 * 2 = 0.8 (0)\n// 0.8 * 2 = 1.6 (1)\n// 0.6 * 2 = 1.2 (1)\n// 0.2 * 2 = 0.4 (repeats 0011...)"
  },
  {
    question: "How many bits are needed to represent the decimal value 2048₁₀ in binary?",
    shortAnswer: "12 bits.",
    explanation: "$2048 = 2^{11}$. The binary representation is a '1' followed by eleven '0's (i.e. $100000000000_2$), which consists of $11 + 1 = 12$ total bits.",
    hint: "2^0 requires 1 bit (1), 2^1 requires 2 bits (10), 2^11 requires 12 bits.",
    level: "basic",
    codeExample: "// 2048_10 = 100000000000_2 (12 bits total)"
  },
  {
    question: "What is the decimal value of the binary sequence (11110000)₂?",
    shortAnswer: "240",
    explanation: "$128 + 64 + 32 + 16 = 240$. Alternatively, $255 - (8 + 4 + 2 + 1) = 255 - 15 = 240$.",
    hint: "All upper 4 bits are 1s (High Nibble = F = 240), lower 4 bits are 0s.",
    level: "basic",
    codeExample: "// 128 + 64 + 32 + 16 = 240 (0xF0)"
  },
  {
    question: "What is the binary equivalent of decimal 63₁₀?",
    shortAnswer: "(111111)₂ (six consecutive 1s)",
    explanation: "$63 = 2^6 - 1 = 64 - 1$. Any number of the form $2^k - 1$ is represented in binary as $k$ consecutive 1s.",
    hint: "2^6 - 1 = 6 ones.",
    level: "basic",
    codeExample: "// 63_10 = 2^6 - 1 = 111111_2"
  },
  {
    question: "How do hardware Analog-to-Digital Converters (ADCs) perform decimal voltage to binary integer conversion?",
    shortAnswer: "By quantizing continuous analog voltage into discrete digital levels using successive approximation registers (SAR).",
    explanation: "A 10-bit ADC samples an input voltage $V_{in}$ between 0V and $V_{ref}$, comparing it against internal binary-weighted DAC voltages via binary search, outputting an integer from 0 to 1023 ($2^{10}-1$).",
    hint: "SAR ADC tests MSB first down to LSB like binary search.",
    level: "advanced",
    codeExample: "// 10-bit ADC output formula:\n// Digital_Value = (V_in / V_ref) * 1023"
  },
  {
    question: "What is the binary value of decimal integer 100₁₀?",
    shortAnswer: "(1100100)₂",
    explanation: "$100 = 64 + 32 + 4 = 2^6 + 2^5 + 2^2 = 1100100_2$.",
    hint: "64 + 32 = 96. 96 + 4 = 100.",
    level: "basic",
    codeExample: "// 64 (bit 6) + 32 (bit 5) + 4 (bit 2) = 1100100_2"
  },
  {
    question: "What is the binary value of decimal fraction 0.0625₁₀?",
    shortAnswer: "(0.0001)₂",
    explanation: "$0.0625 = 1/16 = 2^{-4}$. Placing a 1 at the 4th position after the radix point gives $(0.0001)_2$.",
    hint: "1/16 = 2^-4.",
    level: "basic",
    codeExample: "// 0.0625 = 2^-4 = 0.0001_2"
  },
  {
    question: "How do you convert decimal 500₁₀ to binary?",
    shortAnswer: "(111110100)₂",
    explanation: "$500 = 256 + 128 + 64 + 32 + 16 + 4 = 2^8 + 2^7 + 2^6 + 2^5 + 2^4 + 2^2 = 111110100_2$.",
    hint: "512 - 12 = 500. Bit 9 (512) is 0, bits 8..4 are 1s, bit 2 is 1.",
    level: "moderate",
    codeExample: "// 500 = 256 + 128 + 64 + 32 + 16 + 4 = 111110100_2"
  },
  {
    question: "What is the binary value of decimal integer 127₁₀?",
    shortAnswer: "(01111111)₂ (seven consecutive 1s)",
    explanation: "$127 = 2^7 - 1 = 128 - 1$. It is the maximum positive value in an 8-bit signed integer format.",
    hint: "2^7 - 1 = 7 ones.",
    level: "basic",
    codeExample: "// 127 = 01111111_2 (0x7F)"
  },
  {
    question: "What is the binary representation of decimal fraction 0.375₁₀?",
    shortAnswer: "(0.011)₂",
    explanation: "$0.375 = 0.25 + 0.125 = 1/4 + 1/8 = 2^{-2} + 2^{-3} = (0.011)_2$.",
    hint: "0.25 (1/4) + 0.125 (1/8) = 0.375.",
    level: "basic",
    codeExample: "// 0.375 * 2 = 0.75 (0)\n// 0.75 * 2 = 1.50 (1)\n// 0.50 * 2 = 1.00 (1) -> 0.011_2"
  },
  {
    question: "Why is bitwise shifting (`x >> 1` or `x << 1`) used as a hardware optimization for division/multiplication by 2?",
    shortAnswer: "Shifting bits left by 1 multiplies by 2; shifting right by 1 divides by 2 in a single hardware clock cycle.",
    explanation: "In positional base-2 notation, shifting bit patterns left shifts every digit to the next higher power of 2 ($2^{k+1} = 2 \\times 2^k$). Dedicated barrel shifters perform this in $<1\\text{ ns}$ without triggering heavy ALU divider circuitry.",
    hint: "Think about how multiplying by 10 in decimal simply appends a zero (shifts left).",
    level: "moderate",
    codeExample: "int x = 25;\nint mult2 = x << 1; // 50 (25 * 2)\nint div2  = x >> 1; // 12 (25 / 2)"
  },
  {
    question: "What is the binary equivalent of decimal 256₁₀?",
    shortAnswer: "(100000000)₂ (a 1 followed by eight 0s, 9 bits total)",
    explanation: "$256 = 2^8$. It is the smallest integer that overflows an 8-bit byte (0 to 255).",
    hint: "Requires 9 bits to store.",
    level: "basic",
    codeExample: "// 256 = 2^8 = 100000000_2"
  },
  {
    question: "What is the binary conversion of decimal fraction 0.7₁₀ truncated to 5 fractional bits?",
    shortAnswer: "(0.10110)₂",
    explanation: "$0.7 \\times 2 = 1.4$ (1); $0.4 \\times 2 = 0.8$ (0); $0.8 \\times 2 = 1.6$ (1); $0.6 \\times 2 = 1.2$ (1); $0.2 \\times 2 = 0.4$ (0). Truncated to 5 bits: $0.10110_2$. Value $= 0.5 + 0.125 + 0.0625 = 0.6875$ (approx).",
    hint: "Successive multiplication produces bits 1, 0, 1, 1, 0.",
    level: "moderate",
    codeExample: "// 0.7_10 approx = 0.10110_2 = 0.6875_10"
  },
  {
    question: "What is the binary value of decimal integer 17₁₀?",
    shortAnswer: "(10001)₂",
    explanation: "$17 = 16 + 1 = 2^4 + 2^0 = 10001_2$.",
    hint: "16 (bit 4) + 1 (bit 0).",
    level: "basic",
    codeExample: "// 17 = 16 + 1 = 10001_2"
  },
  {
    question: "How do you convert decimal 1023₁₀ to binary?",
    shortAnswer: "(1111111111)₂ (ten consecutive 1s)",
    explanation: "$1023 = 2^{10} - 1 = 1024 - 1$. Ten consecutive 1s represent decimal 1023.",
    hint: "2^10 - 1 = 10 ones.",
    level: "basic",
    codeExample: "// 1023 = 2^10 - 1 = 1111111111_2"
  },
  {
    question: "What is the binary value of decimal 31₁₀?",
    shortAnswer: "(11111)₂ (five consecutive 1s)",
    explanation: "$31 = 2^5 - 1 = 32 - 1 = 11111_2$.",
    hint: "16 + 8 + 4 + 2 + 1 = 31.",
    level: "basic",
    codeExample: "// 31 = 11111_2"
  },
  {
    question: "What is the binary conversion of decimal fraction 0.5₁₀?",
    shortAnswer: "(0.1)₂",
    explanation: "$0.5 = 1/2 = 2^{-1} = 0.1_2$.",
    hint: "Direct single-bit conversion.",
    level: "basic",
    codeExample: "// 0.5_10 = 0.1_2"
  },
  {
    question: "What is the binary value of decimal integer 200₁₀?",
    shortAnswer: "(11001000)₂",
    explanation: "$200 = 128 + 64 + 8 = 2^7 + 2^6 + 2^3 = 11001000_2$.",
    hint: "128 + 64 = 192. 192 + 8 = 200.",
    level: "basic",
    codeExample: "// 200 = 128 + 64 + 8 = 11001000_2"
  },
  {
    question: "What is the binary conversion of decimal fraction 0.9375₁₀?",
    shortAnswer: "(0.1111)₂",
    explanation: "$0.9375 = 1 - 0.0625 = 1 - 1/16 = 1/2 + 1/4 + 1/8 + 1/16 = (0.1111)_2$.",
    hint: "0.5 + 0.25 + 0.125 + 0.0625 = 0.9375.",
    level: "moderate",
    codeExample: "// 0.9375 = 0.1111_2"
  },
  {
    question: "What is the binary representation of decimal integer 511₁₀?",
    shortAnswer: "(111111111)₂ (nine consecutive 1s)",
    explanation: "$511 = 2^9 - 1 = 512 - 1 = 111111111_2$.",
    hint: "2^9 - 1 = 9 ones.",
    level: "basic",
    codeExample: "// 511 = 111111111_2"
  },
  {
    question: "What is the binary value of decimal integer 85₁₀?",
    shortAnswer: "(01010101)₂",
    explanation: "$85 = 64 + 16 + 4 + 1 = 2^6 + 2^4 + 2^2 + 2^0 = 01010101_2$ (alternating 0s and 1s, 0x55).",
    hint: "Alternating bits pattern: 01010101 = 0x55.",
    level: "moderate",
    codeExample: "// 85 = 64 + 16 + 4 + 1 = 01010101_2 (0x55)"
  },
  {
    question: "What is the binary value of decimal integer 170₁₀?",
    shortAnswer: "(10101010)₂",
    explanation: "$170 = 128 + 32 + 8 + 2 = 2^7 + 2^5 + 2^3 + 2^1 = 10101010_2$ (alternating bits, 0xAA).",
    hint: "170 = 85 * 2 (shifted left by 1 bit: 0xAA).",
    level: "moderate",
    codeExample: "// 170 = 128 + 32 + 8 + 2 = 10101010_2 (0xAA)"
  },
  {
    question: "What is the decimal equivalent of binary fraction (0.0101)₂?",
    shortAnswer: "0.3125",
    explanation: "$0 \\times 2^{-1} + 1 \\times 2^{-2} + 0 \\times 2^{-3} + 1 \\times 2^{-4} = 1/4 + 1/16 = 0.25 + 0.0625 = 0.3125$.",
    hint: "1/4 + 1/16 = 0.25 + 0.0625.",
    level: "basic",
    codeExample: "// 0.0101_2 = 1/4 + 1/16 = 0.3125_10"
  },
  {
    question: "What is the master rule to verify any Decimal to Binary conversion manually in under 5 seconds?",
    shortAnswer: "Re-multiply each binary bit by its positional power of 2 ($128, 64, 32, 16, 8, 4, 2, 1$) and sum the active weights.",
    explanation: "Every bit '1' adds its column weight. For $(10011100)_2$: $128 + 16 + 8 + 4 = 156$. Summing active power columns provides instant mathematical confirmation.",
    hint: "Sum of active power-of-2 weights must match the original decimal number exactly.",
    level: "basic",
    codeExample: "// 10011100_2 -> 128 + 16 + 8 + 4 = 156. Verified!"
  }
];

export default questions;
