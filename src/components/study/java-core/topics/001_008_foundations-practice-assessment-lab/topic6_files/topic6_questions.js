/**
 * Module 001_008: Topic 6: Algorithmic Problem 6: Decimal to Binary/Hexadecimal conversion without built-in methods
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the general mathematical algorithm to convert a Decimal integer to any Base $B$?",
    shortAnswer: "Repeatedly divide the number by $B$: record the remainder $n \\% B$ at each step, update $n = n / B$, and reverse the accumulated remainder digits.",
    explanation: "General base conversion division algorithm.",
    hint: "Successive modulo division: remainder n % B, update n /= B, reverse result.",
    level: "basic",
    codeExample: "while (n > 0) { sb.append(n % base); n /= base; } return sb.reverse().toString();"
  },
  {
    question: "How does Bitwise Shift and Masking convert Decimal to Binary in Java?",
    shortAnswer: "Iterate bit indices from 31 down to 0, evaluating `(n >>> bit) & 1` to extract each individual binary bit without arithmetic division.",
    explanation: "Bitwise binary extraction mechanics.",
    hint: "Iterate bits from 31 to 0 using (n >>> bit) & 1.",
    level: "basic",
    codeExample: "for (int b = 31; b >= 0; b--) sb.append((n >>> b) & 1);"
  },
  {
    question: "What is the Hexadecimal alphabet and base radix in Java?",
    shortAnswer: "Radix 16 using digits `0-9` and letters `A-F` (representing values 10 to 15).",
    explanation: "Hexadecimal radix and symbols.",
    hint: "Radix 16: 0-9 and A-F.",
    level: "basic",
    codeExample: "char[] HEX = \"0123456789ABCDEF\".toCharArray();"
  },
  {
    question: "How are negative integers represented in Binary in Java?",
    shortAnswer: "**Two's Complement Notation**: Invert all bits (One's Complement) and add 1 ($~x + 1$).",
    explanation: "Two's complement binary representation in Java.",
    hint: "Two's complement: invert bits and add 1 (~x + 1).",
    level: "basic",
    codeExample: "int neg = -42; // MSB (bit 31) is 1"
  },
  {
    question: "Why should you use the unsigned right shift `>>>` rather than signed right shift `>>` for negative binary conversions?",
    shortAnswer: "`>>>` shifts in zeros from the left (logical shift), allowing clean bit extraction, whereas `>>` shifts in sign bits (arithmetic shift, preserving negative sign endlessly).",
    explanation: "Logical unsigned vs arithmetic signed bit shift.",
    hint: ">>> inserts 0 on left; >> preserves sign bit.",
    level: "intermediate",
    codeExample: "int bitVal = (n >>> bit) & 1; // Logical unsigned shift"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the binary and hex of Decimal `29`?",
    shortAnswer: "Binary: `\"11101\"` | Hexadecimal: `\"0x1D\"` ($16 \\times 1 + 13$).",
    explanation: "Conversion calculation verification.",
    hint: "Binary: 11101, Hex: 0x1D.",
    level: "basic",
    codeExample: "decimalToBinaryDivision(29) -> \"11101\" | decimalToHexadecimal(29) -> \"0x1D\""
  },
  {
    question: "What is 'Horner's Method' for converting Binary or Hexadecimal strings back to Decimal?",
    shortAnswer: "A polynomial evaluation technique where the running accumulator is multiplied by the base before adding the next digit: `result = (result * base) + digitVal` (avoids slow `Math.pow()`).",
    explanation: "Horner's method for base parsing.",
    hint: "result = result * base + digitVal without Math.pow().",
    level: "intermediate",
    codeExample: "for (char c : bin.toCharArray()) result = (result * 2) + (c - '0');"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what decimal value was recovered from Hex `\"0x1A3F\"`?",
    shortAnswer: "$1 \\times 16^3 + 10 \\times 16^2 + 3 \\times 16^1 + 15 \\times 16^0 = 4096 + 2560 + 48 + 15 = 6,719$.",
    explanation: "Hex to decimal calculation.",
    hint: "6719.",
    level: "basic",
    codeExample: "hexToDecimal(\"0x1A3F\") -> 6719"
  },
  {
    question: "How does `(n & 0xFFFFFFFFL)` convert a negative 32-bit `int` into an unsigned 64-bit `long`?",
    shortAnswer: "It applies a 32-bit bitmask that masks out sign-extension bits, producing an unsigned positive 64-bit value containing the exact 32-bit two's complement pattern.",
    explanation: "Unsigned 32-bit integer conversion via long mask.",
    hint: "Masks out sign extension, producing a positive 64-bit value with raw 32-bit pattern.",
    level: "intermediate",
    codeExample: "long unsigned = n & 0xFFFFFFFFL;"
  },
  {
    question: "What is a 'Nibble' in computer architecture?",
    shortAnswer: "A 4-bit binary group ($0000_2$ to $1111_2$) corresponding exactly to a single Hexadecimal digit ($0x0$ to $0xF$).",
    explanation: "Nibble definition and 1:1 hex relationship.",
    hint: "4-bit binary group mapping to 1 hex digit.",
    level: "basic",
    codeExample: "1111 (binary) = F (hex) = 15 (decimal)"
  },
  {
    question: "What is the Time Complexity of converting a Decimal integer to Binary/Hexadecimal?",
    shortAnswer: "$O(\\log_B N)$ logarithmic time, where $B$ is the base ($B = 2$ for binary, $B = 16$ for hex).",
    explanation: "Base conversion logarithmic time complexity.",
    hint: "O(log_B N) steps proportional to digit count.",
    level: "basic",
    codeExample: "// 32 steps for 32-bit integers = O(1) constant in 32-bit hardware"
  },
  {
    question: "What is the binary representation of Decimal `0`?",
    shortAnswer: "`\"0\"`.",
    explanation: "Zero edge case.",
    hint: "0.",
    level: "basic",
    codeExample: "if (n == 0) return \"0\";"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the hex representation of `255`?",
    shortAnswer: "`\"0xFF\"` ($15 \\times 16 + 15 = 255$).",
    explanation: "255 hex conversion.",
    hint: "0xFF.",
    level: "basic",
    codeExample: "decimalToHexadecimal(255) -> \"0xFF\""
  },
  {
    question: "How can Bitwise AND with `0xF` extract hex digits directly without division?",
    shortAnswer: "`int nibble = n & 0xF;` extracts the lowest 4 bits (hex digit); `n >>>= 4;` shifts down by 4 bits for the next digit.",
    explanation: "Bitwise 4-bit nibble extraction.",
    hint: "n & 0xF extracts 4 bits, n >>>= 4 shifts to next nibble.",
    level: "intermediate",
    codeExample: "while (n != 0) { sb.append(HEX[n & 0xF]); n >>>= 4; }"
  },
  {
    question: "What is the Octal number system (Base 8)?",
    shortAnswer: "Base 8 radix using digits `0-7`, grouping binary bits into 3-bit chunks ($000_2$ to $111_2$).",
    explanation: "Octal base system.",
    hint: "Base 8 with digits 0-7, grouping 3 binary bits.",
    level: "basic",
    codeExample: "int oct = n % 8; n /= 8;"
  },
  {
    question: "What is the difference between Big-Endian and Little-Endian byte order?",
    shortAnswer: "Big-Endian stores the Most Significant Byte (MSB) at the lowest memory address (network byte order / JVM); Little-Endian stores the Least Significant Byte (LSB) at the lowest address (x86 CPU).",
    explanation: "Endianness architectural definition.",
    hint: "Big-Endian = MSB first (JVM); Little-Endian = LSB first (x86).",
    level: "advanced",
    codeExample: "// JVM uses Big-Endian byte order internally"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the binary of `1024`?",
    shortAnswer: "`\"10000000000\"` ($2^{10}$, a 1 followed by 10 zeros).",
    explanation: "Power of 2 binary representation.",
    hint: "1 followed by 10 zeros.",
    level: "basic",
    codeExample: "decimalToBinaryDivision(1024) -> \"10000000000\""
  },
  {
    question: "How do you count the number of set bits (Hamming Weight / Population Count) in binary?",
    shortAnswer: "**Brian Kernighan's Algorithm**: `while (n != 0) { n &= (n - 1); count++; }` runs in $O(\\text{number of set bits})$ time.",
    explanation: "Brian Kernighan's bit-counting algorithm.",
    hint: "n &= (n - 1) clears lowest set bit; count steps until n == 0.",
    level: "intermediate",
    codeExample: "while (n != 0) { n &= (n - 1); count++; }"
  },
  {
    question: "What built-in methods exist in `java.lang.Integer` for base conversions?",
    shortAnswer: "`Integer.toBinaryString(n)`, `Integer.toHexString(n)`, `Integer.toOctalString(n)`, and `Integer.toString(n, radix)`.",
    explanation: "Standard library conversion utilities.",
    hint: "Integer.toBinaryString(), toHexString(), and toString(n, radix).",
    level: "basic",
    codeExample: "String s = Integer.toHexString(255); // \"ff\""
  },
  {
    question: "In the Coder & AccoTax lab, what was the hex of `65535` ($2^{16} - 1$)?",
    shortAnswer: "`\"0xFFFF\"`.",
    explanation: "16-bit max hex verification.",
    hint: "0xFFFF.",
    level: "basic",
    codeExample: "decimalToHexadecimal(65535) -> \"0xFFFF\""
  },
  {
    question: "Why should `StringBuilder.append()` and `reverse()` be used instead of string concatenation `res = rem + res`?",
    shortAnswer: "`res = rem + res` allocates a new `String` object on the Heap on every loop step ($O(K^2)$ memory copying); `StringBuilder.append()` appends in $O(1)$ amortized time with a single final reverse.",
    explanation: "StringBuilder vs String concatenation performance.",
    hint: "StringBuilder appends in O(1) time without creating heap object copies.",
    level: "basic",
    codeExample: "sb.append(rem); // O(1) amortized"
  },
  {
    question: "How do you verify if a positive integer is a power of 2 using bitwise operators?",
    shortAnswer: "`if (n > 0 && (n & (n - 1)) == 0)` returns `true` (a power of 2 has exactly one binary set bit).",
    explanation: "Power of 2 bitwise check.",
    hint: "(n > 0) && ((n & (n - 1)) == 0).",
    level: "basic",
    codeExample: "boolean isPowerOf2 = (n > 0) && ((n & (n - 1)) == 0);"
  },
  {
    question: "What is Base64 encoding?",
    shortAnswer: "A binary-to-text encoding scheme that converts arbitrary binary data into printable ASCII characters by grouping binary into 6-bit chunks ($2^6 = 64$ symbols: A-Z, a-z, 0-9, +, /).",
    explanation: "Base64 encoding mechanics.",
    hint: "Groups binary into 6-bit chunks using 64 ASCII characters.",
    level: "intermediate",
    codeExample: "Base64.getEncoder().encodeToString(bytes);"
  },
  {
    question: "In `hexToDecimal`, how is character value `'A'` converted to integer `10`?",
    shortAnswer: "`c - 'A' + 10` evaluates `'A' - 'A' + 10 = 0 + 10 = 10`.",
    explanation: "Hex character offset arithmetic.",
    hint: "c - 'A' + 10 maps 'A'..'F' to 10..15.",
    level: "basic",
    codeExample: "int val = (c >= '0' && c <= '9') ? (c - '0') : (c - 'A' + 10);"
  },
  {
    question: "What is the binary representation of `-1` in 32-bit two's complement?",
    shortAnswer: "`\"11111111111111111111111111111111\"` (32 ones, corresponding to `0xFFFFFFFF`).",
    explanation: "-1 binary representation in two's complement.",
    hint: "32 consecutive ones (0xFFFFFFFF).",
    level: "intermediate",
    codeExample: "decimalToBinaryBitwise(-1) -> 32 ones"
  },
  {
    question: "How do floating-point numbers represent decimals in binary in Java (IEEE 754)?",
    shortAnswer: "Using 3 components: 1 Sign bit, 8 Exponent bits (biased by 127), and 23 Fraction/Mantissa bits for 32-bit `float` (52 mantissa bits for 64-bit `double`).",
    explanation: "IEEE 754 floating point standard.",
    hint: "1 Sign bit, 8/11 Exponent bits, 23/52 Mantissa fraction bits.",
    level: "advanced",
    codeExample: "Float.floatToIntBits(3.14f);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the binary of `-42`?",
    shortAnswer: "32-bit two's complement with bit 31 set to 1 (`\"11111111111111111111111111010110\"`).",
    explanation: "-42 two's complement binary output.",
    hint: "32-bit two's complement starting with ones.",
    level: "basic",
    codeExample: "decimalToBinaryBitwise(-42)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 6 for Java developers?",
    shortAnswer: "Base conversion divides by radix $B$ extracting remainders ($n \\% B$, $n /= B$), Bitwise operations (`>>>`, `& 1`, `& 0xF`) extract bits and nibbles directly, and Horner's Method reverses bases without arithmetic power libraries.",
    explanation: "Mastery of base conversion algorithms.",
    hint: "Division/modulo for general bases; bitwise masks for binary/hex; Horner's method for reverse parsing.",
    level: "basic",
    codeExample: "// Summary: Division (n%B, n/=B) | Bitwise (>>> & 1, >>>= 4) | Horner (res*B + d)"
  },
  {
    question: "What is the next topic (Topic 7) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 7: Implementing Recursive Binary Search.",
    explanation: "Topic 7 explores $O(\\log N)$ Divide-and-Conquer Recursive Binary Search on sorted arrays.",
    hint: "Algorithmic Problem 7: Implementing Recursive Binary Search.",
    level: "basic",
    codeExample: "// Topic 7: Recursive Binary Search Implementation"
  },
  {
    question: "How does Gray Code relate to binary conversions?",
    shortAnswer: "Gray code is a binary numeral system where two successive values differ in only ONE bit position ($G = B \\oplus (B >> 1)$), used in digital error correction.",
    explanation: "Gray code definition and binary relationship.",
    hint: "Binary system where consecutive values differ by only 1 bit: G = B ^ (B >> 1).",
    level: "advanced",
    codeExample: "int gray = n ^ (n >> 1);"
  }
];

export default questions;
