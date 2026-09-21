// Question Bank for Topic 14: Module Reference Manual & Downloadable Architectural Documents
// Computer Architecture Masterclass - Sukanta Hui

const questions = [
  {
    question: "What core reference document summarizes base conversions between Binary, Octal, Decimal, and Hexadecimal?",
    shortAnswer: "The Radix Conversion Matrix, mapping grouping rules (3 bits = 1 Octal digit, 4 bits = 1 Hex digit) and successive division/multiplication algorithms.",
    explanation: "Because 8 = 2^3 and 16 = 2^4, direct binary grouping allows instantaneous translation without converting through base-10 first.",
    hint: "Think about why hexadecimal is used as shorthand for 8-bit bytes.",
    level: "basic",
    codeExample: "// Direct nibble translation:\n// (1101 1010)_2 = 0xDA = (332)_8"
  },
  {
    question: "Which formula card defines the exact numerical range for an n-bit 2's complement register?",
    shortAnswer: "[-2^(n-1) to +2^(n-1) - 1], with 0x00 representing 0 and 0x80...00 representing the minimum negative value -2^(n-1).",
    explanation: "For 8 bits, range is [-128, +127]. For 16 bits, [-32768, +32767]. For 32 bits, [-2147483648, +2147483647]. For 64 bits, [-9223372036854775808, +9223372036854775807].",
    hint: "One extra negative value is gained due to having only one zero.",
    level: "basic",
    codeExample: "#include <stdint.h>\n// INT8_MIN = -128, INT8_MAX = 127"
  },
  {
    question: "What is the standard hardware equation for the Overflow (V) flag documented in ALU architecture datasheets?",
    shortAnswer: "V = C_n ⊕ C_(n-1), or V = (A_msb == B_msb) && (Sum_msb != A_msb).",
    explanation: "Overflow occurs in signed 2's complement addition if and only if carry entering the MSB differs from carry leaving the MSB, or when two operands of identical sign yield an opposite sign result.",
    hint: "A single XOR gate between the two highest carry lines.",
    level: "moderate",
    codeExample: "assign overflow_flag = carry[7] ^ carry[6]; // 8-bit ALU"
  },
  {
    question: "How does the BCD 8421 Reference Card specify valid vs illegal 4-bit nibbles?",
    shortAnswer: "Nibbles 0000 to 1001 (0 to 9 decimal) are valid; nibbles 1010 to 1111 (10 to 15 / 0xA to 0xF) are invalid and trigger +6 decimal adjustment.",
    explanation: "Since decimal digits only span 0..9, the upper 6 binary combinations in a 4-bit nibble are illegal states in BCD arithmetic.",
    hint: "Adding 6 (0110) skips the 6 illegal states and triggers the decimal carry.",
    level: "basic",
    codeExample: "if (nibble > 9 || aux_carry) nibble += 6; // DAA instruction"
  },
  {
    question: "What is the Gray code generation formula documented for optical rotary encoder circuits?",
    shortAnswer: "Gray = Binary ⊕ (Binary >> 1).",
    explanation: "Right-shifting binary by 1 and XORing with the original word creates a reflected binary code where consecutive values differ by exactly one bit.",
    hint: "Single-bit distance eliminates multi-contact mechanical bounce.",
    level: "moderate",
    codeExample: "uint32_t bin2gray(uint32_t b) { return b ^ (b >> 1); }"
  },
  {
    question: "What does the UTF-8 Byte Layout Reference Card specify for leading indicator bits in multi-byte sequences?",
    shortAnswer: "1-byte: 0xxxxxxx; 2-byte: 110xxxxx 10xxxxxx; 3-byte: 1110xxxx 10xxxxxx 10xxxxxx; 4-byte: 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx.",
    explanation: "The number of leading 1s in the first byte indicates total byte count, and every continuation byte begins with 10xxxxxx for self-synchronization.",
    hint: "ASCII is a subset with a leading 0.",
    level: "expert",
    codeExample: "// UTF-8 prefix patterns:\n// 1 Byte: 0x00 - 0x7F\n// 2 Byte: 0xC0 - 0xDF\n// 3 Byte: 0xE0 - 0xEF\n// 4 Byte: 0xF0 - 0xF7"
  },
  {
    question: "According to the Floating-Point IEEE-754 Reference Card, what are the bit fields of a 32-bit single precision float?",
    shortAnswer: "1 Sign bit (bit 31), 8 Exponent bits (bits 30-23 with bias 127), and 23 Mantissa/Fraction bits (bits 22-0 with implicit leading 1).",
    explanation: "Value = (-1)^Sign × 2^(Exponent - 127) × 1.Mantissa. Special patterns represent ±0, ±Infinity, and NaN.",
    hint: "1 + 8 + 23 = 32 bits.",
    level: "expert",
    codeExample: "struct Float32 {\n  uint32_t mantissa : 23;\n  uint32_t exponent : 8;\n  uint32_t sign     : 1;\n};"
  },
  {
    question: "Why should an engineer consult the Signed-to-Unsigned Casting Reference Table in C/C++?",
    shortAnswer: "To prevent accidental security vulnerabilities where negative signed lengths are converted to huge unsigned integers during memory allocations.",
    explanation: "In C, casting -1 (0xFFFFFFFF) to uint32_t evaluates to 4,294,967,295, which can bypass bounds checks (e.g. if (len < MAX_BUFFER)) and cause buffer overflows.",
    hint: "Think of the famous Linux kernel sys_call integer casting CVEs.",
    level: "expert",
    codeExample: "int32_t len = -1;\nif (len < 100) {\n  size_t bytes = (size_t)len; // 4,294,967,295 bytes! Buffer overflow!\n  malloc(bytes);\n}"
  },
  {
    question: "What is documented on the Endianness Reference Card (Big-Endian vs Little-Endian)?",
    shortAnswer: "Little-Endian stores the least significant byte (LSB) at the lowest memory address; Big-Endian stores the most significant byte (MSB) at lowest address.",
    explanation: "For 32-bit value 0x12345678 at address 0x1000: Little-Endian (x86, ARM) stores [0x78, 0x56, 0x34, 0x12]. Big-Endian (Network byte order) stores [0x12, 0x34, 0x56, 0x78].",
    hint: "Network protocols are standard Big-Endian; x86 CPU memory is Little-Endian.",
    level: "moderate",
    codeExample: "// Little-Endian memory layout of 0x12345678:\n// 0x1000: 0x78 (LSB)\n// 0x1001: 0x56\n// 0x1002: 0x34\n// 0x1003: 0x12 (MSB)"
  },
  {
    question: "What is the purpose of the 7-Segment Display Truth Table Cheat Sheet?",
    shortAnswer: "It maps 4-bit BCD digits (0..9) to the 7 LED segment control lines (a, b, c, d, e, f, g) to render readable decimal numbers.",
    explanation: "Each digit pattern activates specific segments; for instance, digit 8 activates all segments (abcdefg = 1111111), while 0 turns off segment g (1111110).",
    hint: "Used by 74LS47 BCD to 7-segment decoder ICs.",
    level: "basic",
    codeExample: "// Digit 0 -> a,b,c,d,e,f on, g off: 7'b1111110\n// Digit 1 -> b,c on: 7'b0110000"
  },
  {
    question: "How does the Logic Level Reference Card define standard CMOS 3.3V and 5V logic thresholds?",
    shortAnswer: "For 5V CMOS: V_IL ≤ 1.5V, V_IH ≥ 3.5V, V_OL ≤ 0.5V, V_OH ≥ 4.4V. Intermediate voltages cause undefined floating states.",
    explanation: "Digital circuits maintain strict noise margins (V_OH - V_IH and V_IL - V_OL) to prevent spurious binary bit flips from electrical interference.",
    hint: "Noise margins guarantee stable 0s and 1s.",
    level: "moderate",
    codeExample: "// Noise Margin High (NMH) = V_OH - V_IH\n// Noise Margin Low  (NML) = V_IL - V_OL"
  },
  {
    question: "What is the Year 2038 Problem summary in the System Architecture Cheat Sheet?",
    shortAnswer: "Signed 32-bit Unix time_t will overflow on January 19, 2038 at 03:14:07 UTC (+2,147,483,647 seconds), wrapping around to -2,147,483,648 (December 13, 1901).",
    explanation: "Migrating to 64-bit time_t extends time representation by over 292 billion years, permanently solving the 32-bit rollover.",
    hint: "Rollover from 0x7FFFFFFF to 0x80000000.",
    level: "basic",
    codeExample: "// Fixed in modern 64-bit OS:\ntypedef int64_t time64_t; // Good for 292 billion years"
  },
  {
    question: "What does the Diminished Radix Complement Cheat Sheet specify for (r-1)'s complement?",
    shortAnswer: "(r-1)'s complement of number N with n integer digits is (r^n - 1) - N. In binary (r=2), (2^n - 1) - N is 1's complement (bitwise NOT).",
    explanation: "In decimal, 9's complement subtracts every digit from 9; in binary, 1's complement subtracts every bit from 1 (inverts 0 to 1 and 1 to 0).",
    hint: "9's complement in decimal = 1's complement in binary.",
    level: "basic",
    codeExample: "// 9's comp of 345 (3-digit) = 999 - 345 = 654\n// 1's comp of 1010 (4-bit)  = 1111 - 1010 = 0101"
  },
  {
    question: "How does the Parity Generator Reference Card distinguish Even Parity vs Odd Parity?",
    shortAnswer: "Even Parity sets the parity bit so the total number of 1s (including parity) is even; Odd Parity sets it so the total number of 1s is odd.",
    explanation: "Parity is computed via an XOR reduction tree across all data bits (Even Parity bit = XOR of all payload bits).",
    hint: "Used in RS-232 serial UART communication.",
    level: "basic",
    codeExample: "wire even_parity = ^data_byte; // Verilog XOR reduction"
  },
  {
    question: "What is the ASCII to Integer conversion trick documented for quick assembly programming?",
    shortAnswer: "Mask with 0x0F (or subtract '0' / 0x30 / 48) to convert ASCII digit ('0'-'9') to binary value; bitwise OR with 0x20 toggles uppercase to lowercase.",
    explanation: "ASCII '0' is 0x30 (0011 0000), '9' is 0x39 (0011 1001). Masking the lower 4 bits (AND 0x0F) yields the exact decimal number 0..9.",
    hint: "'A' (0x41) OR 0x20 = 'a' (0x61).",
    level: "moderate",
    codeExample: "char c = '7';\nint val = c & 0x0F; // val = 7\nchar upper = 'B';\nchar lower = upper | 0x20; // 'b'"
  },
  {
    question: "What is the Booth's Multiplication Reference Table used for?",
    shortAnswer: "Multiplying signed 2's complement numbers in hardware by inspecting 2-bit windows (q_0, q_-1) to perform add, subtract, or shift operations.",
    explanation: "Bit pairs 01 trigger +Multiplicand, 10 trigger -Multiplicand, while 00 and 11 only trigger arithmetic right shift, minimizing adder cycles for strings of 1s.",
    hint: "Replaces chains of additions with single additions/subtractions.",
    level: "expert",
    codeExample: "// Booth's lookup:\n// 00 -> Shift only\n// 01 -> Add Multiplicand + Shift\n// 10 -> Subtract Multiplicand + Shift\n// 11 -> Shift only"
  },
  {
    question: "According to the Carry Lookahead Adder (CLA) Reference Card, what are the Generate (G) and Propagate (P) terms?",
    shortAnswer: "G_i = A_i · B_i (carry generated locally); P_i = A_i ⊕ B_i (carry propagated through stage).",
    explanation: "CLA circuits compute all carry signals in parallel in O(1) logic gate delays instead of waiting for ripple carry propagation O(n).",
    hint: "C_(i+1) = G_i + P_i · C_i.",
    level: "expert",
    codeExample: "wire [3:0] g = a & b;\nwire [3:0] p = a ^ b;\nwire c1 = g[0] | (p[0] & c0);"
  },
  {
    question: "What is documented on the CRC-32 (Cyclic Redundancy Check) Reference Card?",
    shortAnswer: "A 32-bit polynomial division algorithm (polynomial 0xEDB88320 / 0x04C11DB7) used in Ethernet, PNG, and ZIP files to detect burst transmission errors.",
    explanation: "CRC uses modulo-2 polynomial arithmetic (XOR addition without carries) to compute a 32-bit checksum that detects all single-bit, double-bit, and odd-numbered bit errors.",
    hint: "Standard error checking for Ethernet frames.",
    level: "expert",
    codeExample: "// Standard Ethernet polynomial:\n// x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1"
  },
  {
    question: "What does the Bit-Masking Cheat Sheet specify for clearing, setting, and toggling specific bits in a control register?",
    shortAnswer: "Set bit: reg |= (1 << n); Clear bit: reg &= ~(1 << n); Toggle bit: reg ^= (1 << n); Test bit: (reg & (1 << n)) != 0.",
    explanation: "Bitwise OR sets 1s, Bitwise AND with inverted mask clears 0s, and Bitwise XOR flips bits without disturbing neighboring register bits.",
    hint: "Essential for low-level embedded microcontroller drivers.",
    level: "basic",
    codeExample: "#define LED_PIN (1 << 3)\nPORTB |= LED_PIN;  // Turn ON\nPORTB &= ~LED_PIN; // Turn OFF\nPORTB ^= LED_PIN;  // Toggle"
  },
  {
    question: "How does the Hex-to-Color RGB TrueColor Reference Card explain 24-bit web colors?",
    shortAnswer: "24-bit color uses 3 bytes: Byte 1 = Red (0x00..0xFF), Byte 2 = Green (0x00..0xFF), Byte 3 = Blue (0x00..0xFF), producing 16,777,216 distinct colors.",
    explanation: "For example, #14B8A6 has Red=0x14 (20), Green=0xB8 (184), Blue=0xA6 (166), forming Tailwind's vibrant teal shade.",
    hint: "8 bits per color channel.",
    level: "basic",
    codeExample: "uint32_t color = 0x14B8A6;\nuint8_t r = (color >> 16) & 0xFF;\nuint8_t g = (color >> 8) & 0xFF;\nuint8_t b = color & 0xFF;"
  },
  {
    question: "What is the Half Adder vs Full Adder gate count documented on the Basic Arithmetic Schematics card?",
    shortAnswer: "Half Adder: 1 XOR gate + 1 AND gate (2 inputs: A, B). Full Adder: 2 XOR gates + 2 AND gates + 1 OR gate (3 inputs: A, B, C_in).",
    explanation: "A Full Adder can be constructed from two cascaded Half Adders plus an OR gate to combine the two carry outputs.",
    hint: "Full Adder handles carry-in from lower bit positions.",
    level: "basic",
    codeExample: "// Full Adder logic:\nsum = a ^ b ^ cin;\ncout = (a & b) | (cin & (a ^ b));"
  },
  {
    question: "In Barrackpore automation projects, why do engineers maintain printed reference cards for 2's complement pinouts?",
    shortAnswer: "To verify bus bit orders (MSB vs LSB) and logic polarity during hardware oscilloscope probing and FPGA flashing.",
    explanation: "Mamata and Mahima in Barrackpore use printed pinout guides to avoid reversed data bus ribbons and incorrect sign bit probing during lab synthesis.",
    hint: "Physical documentation prevents costly PCB wiring mistakes.",
    level: "basic",
    codeExample: "// Pinout guide: D7 (MSB/Sign) to D0 (LSB)"
  },
  {
    question: "What does the Excess-3 (Stibitz) Code Reference Card document?",
    shortAnswer: "An unweighted BCD code formed by adding 3 (0011) to each decimal digit; it is self-complementing (9's complement is obtained by inverting bits).",
    explanation: "Self-complementing codes simplify mechanical and early electrical decimal subtractors because 9's complement is formed by bitwise NOT.",
    hint: "Digit 0 (0011) inverted is 1100 (Digit 9 in Excess-3).",
    level: "moderate",
    codeExample: "// Decimal 4 -> 4 + 3 = 7 (0111 in Excess-3)\n// Inverting 0111 -> 1000 (Decimal 5 in Excess-3 -> 9 - 4 = 5!)"
  },
  {
    question: "How does the Floating-Point Denormalized / Subnormal Numbers Reference Card define subnormals?",
    shortAnswer: "Numbers where the exponent bits are all zeros (00000000) and the mantissa is non-zero, representing numbers closer to zero with an implicit leading 0.",
    explanation: "Subnormal numbers provide gradual underflow, preventing sudden drop to zero when subtracting very small floating-point numbers.",
    hint: "Exponent = 0, Leading bit is 0 instead of 1.",
    level: "expert",
    codeExample: "// Subnormal float value = (-1)^S * 2^(-126) * 0.Mantissa"
  },
  {
    question: "What is the ASCII Control Characters Reference Card (Codes 0x00 to 0x1F) primarily used for?",
    shortAnswer: "Device control signals such as NUL (0x00), BEL (0x07), BS (0x08), LF (0x0A), CR (0x0D), ESC (0x1B), and DEL (0x7F).",
    explanation: "These non-printable characters govern hardware teletypes, serial modems, terminal escapes (ANSI colors), and newline protocols (CRLF in Windows vs LF in Unix).",
    hint: "LF is \\n (10), CR is \\r (13).",
    level: "moderate",
    codeExample: "// Windows newline: \"\\r\\n\" (0x0D 0x0A)\n// Unix newline: \"\\n\" (0x0A)"
  },
  {
    question: "What is the purpose of the Memory Hierarchy & Word Alignment Reference Table?",
    shortAnswer: "It outlines byte boundaries (2-byte alignment for 16-bit, 4-byte for 32-bit, 8-byte for 64-bit) to prevent unaligned memory access performance penalties or bus faults.",
    explanation: "CPUs read data across 32-bit or 64-bit memory buses; accessing an unaligned 32-bit int at address 0x1001 requires two separate memory cycles and bit-shifting logic.",
    hint: "Structure padding in C compiler struct layouts.",
    level: "expert",
    codeExample: "struct AlignedData {\n  uint32_t a; // offset 0\n  uint8_t  b; // offset 4\n  uint8_t  _pad[3]; // 3 padding bytes for 4-byte alignment\n};"
  },
  {
    question: "How is the Gray Code to Natural Binary algorithm summarized on the Reference Card?",
    shortAnswer: "The MSB remains the same (B[n-1] = G[n-1]); for every subsequent bit, B[i] = B[i+1] ⊕ G[i].",
    explanation: "Each binary bit is generated by XORing the previously computed binary bit with the current Gray code bit.",
    hint: "Cascade XOR from left to right.",
    level: "moderate",
    codeExample: "uint32_t gray2bin(uint32_t g) {\n  for (uint32_t mask = g >> 1; mask != 0; mask >>= 1) g ^= mask;\n  return g;\n}"
  },
  {
    question: "What formula on the Reference Card calculates the number of bits required to represent a decimal integer N?",
    shortAnswer: "Number of bits n = floor(log2(N)) + 1, or ceil(log2(N + 1)).",
    explanation: "For example, to represent decimal 1000: log2(1000) ≈ 9.9657; floor(9.9657) + 1 = 10 bits (since 2^10 = 1024 > 1000).",
    hint: "How many bits are needed for 1,000,000? log2(10^6) ≈ 19.93 -> 20 bits.",
    level: "basic",
    codeExample: "#include <math.h>\nint bits_needed(int n) { return (int)floor(log2(n)) + 1; }"
  },
  {
    question: "What is the Hamming Code Error-Correction Reference Card summary?",
    shortAnswer: "Parity bits are placed at power-of-2 bit positions (1, 2, 4, 8...), enabling single-bit error detection and automatic bit correction (SEC-DED).",
    explanation: "Evaluating parity equations generates a syndrome word whose decimal value points directly to the erroneous bit position that flipped.",
    hint: "Used in ECC server memory modules.",
    level: "expert",
    codeExample: "// Syndrome = P4 P2 P1\n// If Syndrome = 0b101 (5), bit 5 is inverted and corrected!"
  },
  {
    question: "What is Sir Sukanta Hui's cardinal advice on utilizing architectural reference documentation?",
    shortAnswer: "Never guess bit positions, flag formulas, or signed ranges from memory during critical datapath design—always cross-check verified architectural standards and timing diagrams.",
    explanation: "Exact digital engineering relies on deterministic reference specifications, formal truth tables, and disciplined bit-level validation.",
    hint: "Precision reference engineering over trial-and-error.",
    level: "basic",
    codeExample: "// Sukanta Hui's Master Rule:\n// Truth tables and timing diagrams are the non-negotiable blueprints of silicon truth."
  }
];

export default questions;
