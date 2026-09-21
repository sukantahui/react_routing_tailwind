// Question Bank for Topic 15: Module 001 Capstone Practice Lab & Skill Assessment
// Computer Architecture Masterclass - Sukanta Hui

const questions = [
  {
    question: "Convert decimal 105 to an 8-bit unsigned binary number and hexadecimal.",
    shortAnswer: "Binary: 01101001, Hex: 0x69.",
    explanation: "105 = 64 + 32 + 8 + 1 -> (0110 1001)_2. Upper nibble 0110 = 6, lower nibble 1001 = 9, so Hex is 0x69.",
    hint: "105 = 6 × 16 + 9.",
    level: "basic",
    codeExample: "// In C:\nuint8_t val = 105; // 0x69 or 0b01101001"
  },
  {
    question: "What is the 8-bit 2's complement representation of decimal -42?",
    shortAnswer: "11010110 (Hex 0xD6).",
    explanation: "+42 is 00101010. Invert all bits (1's complement) -> 11010101. Add 1 -> 11010110. Alternatively, 256 - 42 = 214 = 0xD6 = 11010110.",
    hint: "Find 42 in binary, invert, and add 1.",
    level: "basic",
    codeExample: "int8_t x = -42; // Binary: 11010110, Hex: 0xD6"
  },
  {
    question: "In an 8-bit 2's complement ALU, calculate: (+85) + (+60). Does an overflow occur?",
    shortAnswer: "Raw sum is 10010001 (-111 in 2's complement). Yes, signed overflow occurred (V=1) because true sum (+145) exceeds +127.",
    explanation: "+85 is 01010101, +60 is 00111100. Adding gives 10010001. Two positive inputs produced a negative sign bit (MSB=1). V = Carry[6] ⊕ Carry[7] = 1 ⊕ 0 = 1.",
    hint: "INT8_MAX is +127. 85 + 60 = 145 > 127.",
    level: "moderate",
    codeExample: "int8_t a = 85, b = 60;\nint8_t sum = a + b; // -111 (Overflow! V=1)"
  },
  {
    question: "Calculate the 8-bit 2's complement subtraction: (-20) - (+35).",
    shortAnswer: "Result: 11001001 (-55 in decimal), V=0 (No overflow).",
    explanation: "-20 is 11101100. Subtraction of +35 (00100011) is equivalent to adding -35 (11011101). 11101100 + 11011101 = 1 11001001. Discard carry-out 1. Result is 11001001 (-128 + 64 + 8 + 1 = -55).",
    hint: "A - B = A + (-B).",
    level: "moderate",
    codeExample: "int8_t a = -20, b = 35;\nint8_t diff = a - b; // -55 (0xC9)"
  },
  {
    question: "Convert binary 10110110 to Gray code.",
    shortAnswer: "11101101.",
    explanation: "Using Gray = B ⊕ (B >> 1): 10110110 ⊕ 01011011 = 11101101.",
    hint: "Keep MSB, then XOR adjacent bit pairs.",
    level: "basic",
    codeExample: "uint8_t bin = 0b10110110;\nuint8_t gray = bin ^ (bin >> 1); // 0b11101101"
  },
  {
    question: "Convert Gray code 1101 to natural binary.",
    shortAnswer: "1001 (Decimal 9).",
    explanation: "B[3]=G[3]=1; B[2]=B[3]⊕G[2]=1⊕1=0; B[1]=B[2]⊕G[1]=0⊕0=0; B[0]=B[1]⊕G[0]=0⊕1=1. Result: 1001.",
    hint: "Cascade XOR from MSB to LSB.",
    level: "moderate",
    codeExample: "// Gray: 1101 -> Binary: 1001"
  },
  {
    question: "Perform BCD addition of decimal 48 + 37 and explain any required correction.",
    shortAnswer: "Sum: 85 (BCD: 1000 0101). Lower nibble 8 + 7 = 15 (1111) requires +6 correction -> [1] 0101; upper nibble becomes 4 + 3 + 1 = 8 (1000).",
    explanation: "Lower nibble: 1000 (8) + 0111 (7) = 1111 (>9). Adding 0110 (+6) yields 1 0101 (5 with auxiliary carry). Upper nibble: 0100 (4) + 0011 (3) + 1 = 1000 (8). Total BCD = 1000 0101.",
    hint: "Any nibble sum > 9 must be adjusted with +6.",
    level: "moderate",
    codeExample: "// BCD Arithmetic: 48 + 37 = 85"
  },
  {
    question: "Convert fractional decimal 0.6875 to 8-bit binary fixed point (4 integer bits, 4 fractional bits).",
    shortAnswer: "0000.1011 (Binary: 0.1011).",
    explanation: "0.6875 × 2 = 1.375 (1); 0.375 × 2 = 0.75 (0); 0.75 × 2 = 1.5 (1); 0.5 × 2 = 1.0 (1). Combining fractional bits: .1011 (0.5 + 0.125 + 0.0625 = 0.6875).",
    hint: "Multiply successively by 2 and collect the integer parts.",
    level: "basic",
    codeExample: "// 0.6875 = 1/2 + 0/4 + 1/8 + 1/16 = 0.1011_2"
  },
  {
    question: "What is the result of sign-extending 8-bit 2's complement 0x9C to 16 bits?",
    shortAnswer: "0xFF9C (Decimal -100).",
    explanation: "0x9C is 10011100. MSB is 1 (negative). Sign extension replicates MSB (1) across the upper 8 bits -> 11111111 10011100 (0xFF9C). Value remains -100.",
    hint: "Copy the MSB into all upper bits.",
    level: "basic",
    codeExample: "int8_t byte_val = 0x9C; // -100\nint16_t word_val = (int16_t)byte_val; // 0xFF9C (-100)"
  },
  {
    question: "Evaluate the ALU flags (Z, N, C, V) for the 8-bit operation: 0x7F + 0x01.",
    shortAnswer: "Z=0, N=1, C=0, V=1.",
    explanation: "0x7F (+127) + 0x01 (+1) = 0x80 (-128). Sum is not zero (Z=0). MSB is 1 (N=1). Carry out of bit 7 is 0 (C=0). Carry into bit 7 is 1; V = 1 ⊕ 0 = 1 (Overflow).",
    hint: "+127 + 1 wraps around to -128.",
    level: "moderate",
    codeExample: "// 0x7F + 0x01 = 0x80\n// Flags: Z=0, N=1, C=0, V=1"
  },
  {
    question: "Convert hexadecimal 0x3F8 to Octal without converting to Decimal.",
    shortAnswer: "1770 in Octal.",
    explanation: "0x3F8 in binary (4-bit nibbles): 0011 1111 1000. Re-grouping into 3-bit octal digits from right: 001 | 111 | 111 | 000 -> 1 7 7 0.",
    hint: "Convert Hex -> Binary (4-bit) -> Octal (3-bit).",
    level: "basic",
    codeExample: "// 0x3F8 -> 0b0011_1111_1000 -> 01770 in octal"
  },
  {
    question: "How many bytes does the Unicode character U+20AC (€ Euro symbol) take in UTF-8, and what are the bytes?",
    shortAnswer: "3 bytes: 0xE2 0x82 0xAC.",
    explanation: "U+20AC falls in the range U+0800 to U+FFFF (3-byte UTF-8 sequence: 1110xxxx 10xxxxxx 10xxxxxx). Binary 0010 0000 1010 1100 maps to 11100010 10000010 10101100 = E2 82 AC.",
    hint: "Any code point between U+0800 and U+FFFF takes 3 bytes in UTF-8.",
    level: "expert",
    codeExample: "// C string:\nconst char *euro = \"\\xE2\\x82\\xAC\";"
  },
  {
    question: "What is the minimum number of bits required to store the decimal number 50,000 as an unsigned integer?",
    shortAnswer: "16 bits.",
    explanation: "2^15 = 32,768 (too small); 2^16 = 65,536 > 50,000. Therefore, ceil(log2(50001)) = 16 bits.",
    hint: "Find the smallest power of 2 greater than 50,000.",
    level: "basic",
    codeExample: "uint16_t x = 50000; // Fits in uint16_t (0..65535)"
  },
  {
    question: "In an 8-bit sign-magnitude system, what is the binary encoding of decimal -0 and decimal +0?",
    shortAnswer: "+0 is 00000000, -0 is 10000000.",
    explanation: "Sign-magnitude uses bit 7 as the sign (0=pos, 1=neg) and bits 6-0 as magnitude (0000000). Thus, +0 is 00000000 and -0 is 10000000.",
    hint: "MSB indicates sign; magnitude is all zeros.",
    level: "basic",
    codeExample: "// Sign-Magnitude zeroes:\n// +0: 0x00\n// -0: 0x80"
  },
  {
    question: "What is the 1's complement of the binary number 10101100?",
    shortAnswer: "01010011.",
    explanation: "Invert each individual bit: 1->0, 0->1. 10101100 becomes 01010011.",
    hint: "Bitwise NOT operation.",
    level: "basic",
    codeExample: "uint8_t a = 0b10101100;\nuint8_t ones_comp = ~a; // 0b01010011"
  },
  {
    question: "Calculate: 11111111 + 00000001 in an 8-bit 2's complement register. What are the results and flags?",
    shortAnswer: "Result: 00000000 (0 in decimal), Z=1, N=0, C=1, V=0.",
    explanation: "11111111 (-1) + 00000001 (+1) = 1 00000000. The 9th bit carry-out is discarded. Sum is 00000000 (Z=1). -1 + 1 = 0 is mathematically correct, so V=0.",
    hint: "-1 + 1 = 0.",
    level: "basic",
    codeExample: "int8_t a = -1, b = 1;\nint8_t sum = a + b; // 0 (Z=1, C=1, V=0)"
  },
  {
    question: "A sensor in Barrackpore outputs 12-bit ADC data in Excess-2048 (offset binary). If the ADC reads 0x800, what is the actual sensor value?",
    shortAnswer: "0 (True zero).",
    explanation: "In Excess-K, True Value = Unsigned Value - K. 0x800 is 2048 decimal. 2048 - 2048 = 0.",
    hint: "Offset binary: Mid-scale represents zero.",
    level: "moderate",
    codeExample: "int16_t decode_adc(uint16_t raw) { return (int16_t)raw - 2048; }"
  },
  {
    question: "What is the decimal equivalent of the 8-bit 2's complement number 10000000?",
    shortAnswer: "-128.",
    explanation: "Positional weight of MSB is -2^7 = -128. All other bits are 0. Total value = -128.",
    hint: "This is the most negative number representable in 8 bits.",
    level: "basic",
    codeExample: "int8_t x = 0x80; // Evaluates to -128"
  },
  {
    question: "If you negate the 8-bit 2's complement integer -128, what does the hardware produce?",
    shortAnswer: "-128 (10000000) and sets the Overflow (V) flag.",
    explanation: "Inverting 10000000 gives 01111111 (+127). Adding 1 gives 10000000 (-128). Because +128 cannot be represented in 8-bit signed format, an overflow occurs.",
    hint: "Asymmetric range trap: -(-128) overflows.",
    level: "moderate",
    codeExample: "int8_t a = -128;\nint8_t b = -a; // b is still -128 (Undefined behavior / overflow in C)"
  },
  {
    question: "What is the Hamming distance between binary words 1101001 and 1001101?",
    shortAnswer: "2.",
    explanation: "XOR the two words: 1101001 ⊕ 1001101 = 0100100. The XOR result contains two '1' bits (at bit positions 5 and 2), so Hamming distance is 2.",
    hint: "Count the number of differing bit positions.",
    level: "moderate",
    codeExample: "int hamming_dist(uint32_t a, uint32_t b) { return __builtin_popcount(a ^ b); }"
  },
  {
    question: "Convert the ASCII character 'G' to its 7-bit binary code and Hex representation.",
    shortAnswer: "Binary: 1000111 (01000111), Hex: 0x47.",
    explanation: "'A' is 65 (0x41). 'G' is 65 + 6 = 71 (0x47). 71 in binary is 01000111.",
    hint: "'A' = 65, 'B' = 66 ... 'G' = 71.",
    level: "basic",
    codeExample: "char c = 'G'; // 71 = 0x47 = 01000111_2"
  },
  {
    question: "Calculate the Even Parity bit for the 7-bit data 1101001.",
    shortAnswer: "0.",
    explanation: "The data contains four '1' bits (an even number: 1+1+0+1+0+0+1 = 4). To maintain even parity, the parity bit must be 0.",
    hint: "Total number of 1s (including parity bit) must be even.",
    level: "basic",
    codeExample: "// 4 ones + parity '0' = 4 ones (Even)"
  },
  {
    question: "What is the 9's complement of the decimal number 482?",
    shortAnswer: "517.",
    explanation: "Subtract each digit from 9: 999 - 482 = 517.",
    hint: "Diminished radix complement in base 10.",
    level: "basic",
    codeExample: "// 9 - 4 = 5; 9 - 8 = 1; 9 - 2 = 7 -> 517"
  },
  {
    question: "What is the 10's complement of the decimal number 482?",
    shortAnswer: "518.",
    explanation: "10's complement is 9's complement + 1: 517 + 1 = 518. (Or 1000 - 482 = 518).",
    hint: "Radix complement = (r-1)'s complement + 1.",
    level: "basic",
    codeExample: "// 1000 - 482 = 518"
  },
  {
    question: "In an FPGA circuit running at 100 MHz, an 8-bit ripple-carry adder has a gate delay of 0.8 ns per bit stage. What is the total addition latency?",
    shortAnswer: "6.4 ns.",
    explanation: "In an 8-bit ripple-carry adder, the carry must propagate through all 8 stages. Total delay = 8 × 0.8 ns = 6.4 ns.",
    hint: "Multiply bit width by per-stage carry propagation delay.",
    level: "moderate",
    codeExample: "// Total Delay = N * T_stage = 8 * 0.8ns = 6.4ns"
  },
  {
    question: "Why does the IEEE-754 single-precision floating-point format store the exponent with a bias of 127?",
    shortAnswer: "To allow negative exponents (-126 to +127) to be stored as positive unsigned integers (1 to 254), simplifying hardware magnitude comparisons.",
    explanation: "Biased exponents allow the CPU to compare two floating-point numbers using simple unsigned integer comparison hardware without inspecting signed bits.",
    hint: "Unsigned comparison is faster than signed magnitude comparison.",
    level: "expert",
    codeExample: "// Stored Exp = Actual Exp + 127\n// Exp = 0 -> Stored = 127 (0x7F)"
  },
  {
    question: "Convert decimal fraction 0.1 to binary. Is it exact or recurring?",
    shortAnswer: "0.0001100110011..._2 (Recurring / Infinite repeating pattern).",
    explanation: "0.1 cannot be represented as a finite sum of powers of 1/2. In binary, 0.1 is 0.0 0011 0011 0011..., which leads to standard IEEE-754 float rounding errors in base-2 computers.",
    hint: "1/10 has prime factors 2 and 5, while binary only has base 2.",
    level: "moderate",
    codeExample: "// 0.1 in float: 0.100000001490116119384765625"
  },
  {
    question: "How does the assembly instruction 'TEST EAX, EAX' set the Zero (Z) flag without modifying EAX?",
    shortAnswer: "It performs a bitwise AND (EAX & EAX) and updates the Z and N flags while discarding the arithmetic result.",
    explanation: "If EAX is 0, EAX & EAX is 0, setting Z=1. If EAX is non-zero, Z=0. If MSB is 1, N=1. This is the fastest way to check 'if (x == 0)' on x86 processors.",
    hint: "Bitwise AND of a value with itself produces the same value.",
    level: "moderate",
    codeExample: "; x86 Assembly:\nTEST EAX, EAX\nJZ   is_zero    ; Jump if EAX == 0"
  },
  {
    question: "What is the output of an Arithmetic Right Shift (SAR) by 2 bits on the 8-bit signed value 0b11110100 (-12 in decimal)?",
    shortAnswer: "11111101 (-3 in decimal).",
    explanation: "SAR shifts all bits right by 2 positions while replicating the MSB sign bit (1) into the vacated positions: 11110100 >> 2 = 11111101 (-128 + 64 + 32 + 16 + 8 + 4 + 1 = -3). Exactly -12 / 4 = -3.",
    hint: "Arithmetic shift preserves the sign bit.",
    level: "moderate",
    codeExample: "int8_t x = -12;\nint8_t y = x >> 2; // -3 (SAR in assembly)"
  },
  {
    question: "What is Sir Sukanta Hui's concluding master advice for conquering computer architecture exams and technical interviews?",
    shortAnswer: "Always write down the positional bit-weight template, verify the single zero rule, check for overflow at boundary limits, and simulate the carry propagation by hand.",
    explanation: "Mastering number systems is not about memorizing tables; it is about understanding how electricity and silicon logic enforce mathematical truth.",
    hint: "Bit-level discipline leads to hardware excellence.",
    level: "basic",
    codeExample: "// Sukanta Hui's Final Mantra:\n// True hardware mastery begins where abstraction ends—at the bit level."
  }
];

export default questions;
