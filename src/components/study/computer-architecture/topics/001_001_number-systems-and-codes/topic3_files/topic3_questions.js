// topic3_questions.js - 30 Comprehensive Questions on Decimal to Hexadecimal Conversion
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is the base (radix) of the Hexadecimal number system and what symbols does it use?",
    shortAnswer: "Base 16, using symbols 0 through 9 and letters A through F.",
    explanation: "The hexadecimal system uses base 16. It employs sixteen distinct digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, representing values 0 to 9, and letters A (10), B (11), C (12), D (13), E (14), and F (15).",
    hint: "Count total unique symbols including letters A to F.",
    level: "basic",
    codeExample: "Decimal: 10, 11, 12, 13, 14, 15 -> Hex: A, B, C, D, E, F"
  },
  {
    question: "Why is the hexadecimal number system extensively used in computer architecture?",
    shortAnswer: "Because 16 = 2^4, exactly one hex digit represents a 4-bit binary nibble, providing a compact 4:1 shorthand.",
    explanation: "Binary strings like 1111111100101010 are unwieldy and error-prone. Since 16 is a power of 2 (2^4), each hex digit maps directly to 4 binary bits (one nibble). An 8-bit byte is represented by exactly 2 hex digits (e.g., 0xFF).",
    hint: "Relate powers of 2 (2^4) to group sizes of binary bits.",
    level: "basic",
    codeExample: "Binary: 1111 0010 -> Hex: F2"
  },
  {
    question: "How do you convert a decimal integer to hexadecimal using successive division?",
    shortAnswer: "Divide continuously by 16, recording remainders (0-15 mapped to 0-F), then read remainders from bottom to top.",
    explanation: "You divide the decimal integer by 16. The remainder becomes the least significant hex digit. You take the integer quotient, divide by 16 again, and repeat until the quotient is 0. Reading remainders in reverse order (bottom-to-top) yields the hex number.",
    hint: "The first remainder generated is the least significant digit (LSD).",
    level: "basic",
    codeExample: "254 / 16 = 15 rem 14 ('E'); 15 / 16 = 0 rem 15 ('F') -> 0xFE"
  },
  {
    question: "Convert decimal 45 into hexadecimal.",
    shortAnswer: "(45)_10 = (2D)_16 or 0x2D.",
    explanation: "45 ÷ 16 = 2 remainder 13. Since remainder 13 corresponds to hex digit 'D', and 2 ÷ 16 = 0 remainder 2 ('2'), reading bottom to top yields 2D.",
    hint: "45 = (2 * 16) + 13.",
    level: "basic",
    codeExample: "45 / 16 = 2 rem 13 (D)\n2 / 16 = 0 rem 2 (2)\nResult: 2D"
  },
  {
    question: "Convert decimal 255 into hexadecimal.",
    shortAnswer: "(255)_10 = (FF)_16 or 0xFF.",
    explanation: "255 ÷ 16 = 15 remainder 15 ('F'). 15 ÷ 16 = 0 remainder 15 ('F'). Reading bottom to top yields FF. 255 is the maximum value that can be represented by an 8-bit unsigned byte.",
    hint: "Think of the maximum single-byte value in computer memory.",
    level: "basic",
    codeExample: "255 / 16 = 15 rem 15 (F)\n15 / 16 = 0 rem 15 (F)\nResult = 0xFF"
  },
  {
    question: "What is the hexadecimal representation of decimal 4096?",
    shortAnswer: "(4096)_10 = (1000)_16 or 0x1000.",
    explanation: "Since 4096 is equal to 16^3 (16 * 16 * 16), its hex representation is 1 followed by three zeros, which is 1000_16.",
    hint: "Recall the powers of 16: 16^0=1, 16^1=16, 16^2=256, 16^3=4096.",
    level: "basic",
    codeExample: "4096 = 1 * 16^3 + 0 * 16^2 + 0 * 16^1 + 0 * 16^0 = 0x1000"
  },
  {
    question: "What is a nibble and how many hex digits are required to represent one nibble?",
    shortAnswer: "A nibble is a 4-bit group, and exactly one hex digit represents one nibble.",
    explanation: "A byte has 8 bits, which consists of two 4-bit groups called nibbles (high nibble and low nibble). Because 2^4 = 16, one hex digit exactly represents one nibble.",
    hint: "A byte contains two nibbles.",
    level: "basic",
    codeExample: "Byte: 1011 0101 -> High Nibble: 1011 (B), Low Nibble: 0101 (5) -> 0xB5"
  },
  {
    question: "Convert decimal 1000 into hexadecimal.",
    shortAnswer: "(1000)_10 = (3E8)_16 or 0x3E8.",
    explanation: "1000 ÷ 16 = 62 remainder 8. 62 ÷ 16 = 3 remainder 14 ('E'). 3 ÷ 16 = 0 remainder 3 ('3'). Reading bottom to top yields 3E8.",
    hint: "1000 = (3 * 256) + (14 * 16) + (8 * 1).",
    level: "basic",
    codeExample: "1000 / 16 = 62 rem 8\n62 / 16 = 3 rem 14 (E)\n3 / 16 = 0 rem 3 (3)\nResult: 0x3E8"
  },
  {
    question: "Convert decimal 65535 into hexadecimal.",
    shortAnswer: "(65535)_10 = (FFFF)_16 or 0xFFFF.",
    explanation: "65535 = 16^4 - 1. When converted via division by 16, all four remainders are 15 ('F'). This represents the maximum value in a 16-bit unsigned integer.",
    hint: "65535 is 2^16 - 1, which fits exactly in a 16-bit word.",
    level: "basic",
    codeExample: "65535_10 = 0xFFFF = 1111 1111 1111 1111_2"
  },
  {
    question: "How do you convert a fractional decimal number like 0.625 into hexadecimal?",
    shortAnswer: "Multiply successively by 16, extracting the integer part from top to bottom.",
    explanation: "Multiply the fraction by 16: 0.625 × 16 = 10.000. The integer part is 10, which corresponds to the hex digit 'A'. The fractional part is 0, so the process terminates. Result: (0.A)_16.",
    hint: "Multiplication by radix 16 extracts digits starting from 16^(-1).",
    level: "moderate",
    codeExample: "0.625 * 16 = 10.0 -> Integer 10 = 'A' -> (0.A)_16"
  },
  {
    question: "Convert decimal fraction 0.0625 into hexadecimal.",
    shortAnswer: "(0.0625)_10 = (0.1)_16.",
    explanation: "0.0625 × 16 = 1.0000. The integer part is 1 and the remaining fractional part is 0.0. Thus, (0.0625)_10 = (0.1)_16, since 16^(-1) = 1/16 = 0.0625.",
    hint: "1/16 is the first negative power of 16.",
    level: "moderate",
    codeExample: "0.0625 * 16 = 1.0 -> 0.1_16"
  },
  {
    question: "Convert decimal 171.8125 into hexadecimal.",
    shortAnswer: "(171.8125)_10 = (AB.D)_16 or 0xAB.D.",
    explanation: "Integer part: 171 ÷ 16 = 10 rem 11 ('B'); 10 ÷ 16 = 0 rem 10 ('A') -> AB. Fractional part: 0.8125 × 16 = 13.0000 -> 13 is 'D'. Combined: AB.D.",
    hint: "Convert integer part (171) and fractional part (0.8125) separately.",
    level: "moderate",
    codeExample: "171 -> 0xAB\n0.8125 * 16 = 13.0 -> 0xD\nCombined: 0xAB.D"
  },
  {
    question: "Convert decimal 0.1 to hexadecimal up to 4 fractional digits.",
    shortAnswer: "(0.1)_10 ≈ (0.1999...)_16 or 0.19999... (repeating).",
    explanation: "0.1 × 16 = 1.6 (int 1); 0.6 × 16 = 9.6 (int 9); 0.6 × 16 = 9.6 (int 9); 0.6 × 16 = 9.6 (int 9). Decimal 0.1 does not terminate in base 16 and produces repeating '9's.",
    hint: "Watch for recurring fractional multiplications with 0.6.",
    level: "moderate",
    codeExample: "0.1 * 16 = 1.6 (1)\n0.6 * 16 = 9.6 (9)\n0.6 * 16 = 9.6 (9)\nResult: 0.1999..."
  },
  {
    question: "Why does the decimal number 0.1 cause a precision issue in computer floating-point systems?",
    shortAnswer: "Because 0.1 has prime factors other than 2 (namely 5), its binary and hex representations are infinitely repeating fractions.",
    explanation: "A fraction terminates in base b if and only if all prime factors of the denominator divide base b. In decimal, 1/10 has prime factors 2 and 5. In base 2 (and base 16), only powers of 2 terminate. Hence 0.1 cannot be represented finitely in binary/hex float formats.",
    hint: "Check if the prime factors of 10 divide the base 16.",
    level: "moderate",
    codeExample: "1/10 = 0.0001100110011..._2 = 0.19999..._16"
  },
  {
    question: "Convert decimal 3774 to hexadecimal.",
    shortAnswer: "(3774)_10 = (EBE)_16 or 0xEBE.",
    explanation: "3774 ÷ 16 = 235 rem 14 ('E'). 235 ÷ 16 = 14 rem 11 ('B'). 14 ÷ 16 = 0 rem 14 ('E'). Reading bottom to top: EBE.",
    hint: "Calculate 3774 / 16, then 235 / 16.",
    level: "moderate",
    codeExample: "3774 / 16 = 235 rem 14 (E)\n235 / 16 = 14 rem 11 (B)\n14 / 16 = 0 rem 14 (E)\nResult: 0xEBE"
  },
  {
    question: "What is the relationship between binary grouping and hexadecimal representation?",
    shortAnswer: "Starting from the binary point, group binary bits into sets of 4 and replace each 4-bit set with its single hex digit.",
    explanation: "Because 2^4 = 16, conversion between binary and hex does not require arithmetic division. You simply partition the binary string into 4-bit groups (padding with leading zeros if necessary) and map each to 0-F.",
    hint: "4 binary bits equal 1 hexadecimal digit.",
    level: "moderate",
    codeExample: "1101011110_2 -> 0011 0101 1110_2 -> 3 5 E -> 0x35E"
  },
  {
    question: "In Web development and GPU rendering, how are 24-bit TrueColor RGB values represented in hexadecimal?",
    shortAnswer: "As a 6-digit hex code `#RRGGBB`, where each 2-digit hex pair represents an 8-bit channel (0-255).",
    explanation: "Red, Green, and Blue are each allocated 8 bits (range 0 to 255). 255 in decimal is FF in hex. For example, decimal RGB(255, 99, 71) converts to #FF6347.",
    hint: "Each color channel is 1 byte, which requires 2 hex digits.",
    level: "moderate",
    codeExample: "R=255 -> FF, G=99 -> 63, B=71 -> 47 => #FF6347 (Tomato)"
  },
  {
    question: "Convert decimal 500 to hexadecimal.",
    shortAnswer: "(500)_10 = (1F4)_16 or 0x1F4.",
    explanation: "500 ÷ 16 = 31 remainder 4. 31 ÷ 16 = 1 remainder 15 ('F'). 1 ÷ 16 = 0 remainder 1 ('1'). Result: 1F4.",
    hint: "1F4 = 1*256 + 15*16 + 4 = 256 + 240 + 4 = 500.",
    level: "moderate",
    codeExample: "500 / 16 = 31 rem 4\n31 / 16 = 1 rem 15 (F)\n1 / 16 = 0 rem 1 (1)\nResult: 0x1F4"
  },
  {
    question: "How many hexadecimal digits are needed to represent a 32-bit memory address?",
    shortAnswer: "8 hexadecimal digits.",
    explanation: "Since each hex digit represents 4 bits, a 32-bit register or memory address requires 32 / 4 = 8 hex digits. For example: 0x80480000 or 0xFFFFFFFF.",
    hint: "Divide the bit-width (32) by 4.",
    level: "moderate",
    codeExample: "32 bits / 4 bits-per-hex-digit = 8 hex characters (e.g. 0x12345678)"
  },
  {
    question: "How many hexadecimal digits are required to represent a 64-bit virtual memory address in x86-64 architecture?",
    shortAnswer: "16 hexadecimal digits.",
    explanation: "64 bits divided by 4 bits per hex digit equals 16 hex characters. For example: 0x7FFE_FFFF_FFFF_0000 or 0x00007FFF5FBFF000.",
    hint: "64 / 4 = 16.",
    level: "moderate",
    codeExample: "64 bits / 4 = 16 hex digits (e.g. 0x00007FFFF7DC1000)"
  },
  {
    question: "What is the decimal equivalent of the largest 3-digit hexadecimal number (0xFFF)?",
    shortAnswer: "4095.",
    explanation: "0xFFF = 16^3 - 1 = 4096 - 1 = 4095. Alternatively: (15 * 256) + (15 * 16) + (15 * 1) = 3840 + 240 + 15 = 4095.",
    hint: "The maximum value of n digits in base b is (b^n - 1).",
    level: "moderate",
    codeExample: "16^3 - 1 = 4096 - 1 = 4095"
  },
  {
    question: "Convert decimal 1048576 to hexadecimal.",
    shortAnswer: "(1048576)_10 = (100000)_16 or 0x100000 (1 MB).",
    explanation: "1048576 is 2^20, which is (2^4)^5 = 16^5. In base 16, 16^5 is written as 1 followed by 5 zeros: 100000_16.",
    hint: "1048576 bytes = 1 Megabyte = 16^5.",
    level: "expert",
    codeExample: "1048576 = 1 * 16^5 = 0x100000"
  },
  {
    question: "Convert decimal 832049 to hexadecimal.",
    shortAnswer: "(832049)_10 = (CB231)_16 or 0xCB231.",
    explanation: "832049 ÷ 16 = 52003 rem 1. 52003 ÷ 16 = 3250 rem 3. 3250 ÷ 16 = 203 rem 2. 203 ÷ 16 = 12 rem 11 ('B'). 12 ÷ 16 = 0 rem 12 ('C'). Reading bottom to top: CB231.",
    hint: "Perform successive division by 16 five times.",
    level: "expert",
    codeExample: "832049 = 12*65536 + 11*4096 + 2*256 + 3*16 + 1 = 786432 + 45056 + 512 + 48 + 1 = 832049"
  },
  {
    question: "How does an ARM or x86 assembler translate a decimal immediate constant like `MOV R0, #250` into machine code?",
    shortAnswer: "The assembler divides 250 by 16 to get 0xFA, then packs byte `0xFA` into the immediate opcode field.",
    explanation: "Machine architectures do not store decimal numbers. The assembler converts 250 into its 8-bit hex equivalent 0xFA (11111010_2) and encodes it into the instruction word payload.",
    hint: "Immediate constants in assembly are converted to hex bytes before binary encoding.",
    level: "expert",
    codeExample: "MOV R0, #250 -> Opcode encoding: [E3A000FA] where lowest byte is 0xFA"
  },
  {
    question: "Convert the fractional decimal value 0.9375 into hexadecimal.",
    shortAnswer: "(0.9375)_10 = (0.F)_16.",
    explanation: "0.9375 × 16 = 15.0000. The integer part is 15 ('F'), and the fractional remainder is 0. Thus, (0.9375)_10 = 0.F_16. Notice that 15/16 = 0.9375.",
    hint: "0.9375 is 15 / 16.",
    level: "expert",
    codeExample: "0.9375 * 16 = 15.0 -> 'F' -> 0.F_16"
  },
  {
    question: "Why do network protocols like IPv6 use hexadecimal notation instead of dotted-decimal like IPv4?",
    shortAnswer: "IPv6 addresses are 128 bits long; writing them in decimal would require up to 39 digits, whereas hex groups them into 8 concise 16-bit blocks (32 hex characters).",
    explanation: "An IPv4 address has 32 bits, easily written as 4 decimal octets (e.g. 192.168.1.1). An IPv6 address has 128 bits. In hex, it is written as 8 colon-separated 4-hex-digit groups (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334), making it manageable.",
    hint: "128 bits = 32 hex characters = 8 groups of 4 hex digits.",
    level: "expert",
    codeExample: "IPv6: 2001:0db8:85a3:0000:0000:8a2e:0370:7334"
  },
  {
    question: "In hardware design, what is the fastest method to convert a large decimal number to hexadecimal in RTL / Verilog without using a high-latency hardware divider?",
    shortAnswer: "Convert through BCD (Double-Dabble) or use ROM lookup tables and shift-and-add logic instead of a runtime 16-division ALU.",
    explanation: "Division by 16 in hardware is only trivial for binary inputs (which is just a right wire-shift by 4 bits). To convert decimal inputs, hardware synthesizers use pipelined binary-coded-decimal (BCD) converters or pre-computed lookup tables to avoid multi-cycle division latency.",
    hint: "Hardware division is expensive; shifting wires is zero latency.",
    level: "expert",
    codeExample: "wire [3:0] hex_lsd = binary_val[3:0]; // 0-cycle direct bit slice"
  },
  {
    question: "Convert decimal 999999 into hexadecimal.",
    shortAnswer: "(999999)_10 = (F423F)_16 or 0xF423F.",
    explanation: "999999 ÷ 16 = 62499 rem 15 ('F'). 62499 ÷ 16 = 3906 rem 3 ('3'). 3906 ÷ 16 = 244 rem 2 ('2'). 244 ÷ 16 = 15 rem 4 ('4'). 15 ÷ 16 = 0 rem 15 ('F'). Reading bottom to top yields F423F.",
    hint: "Verify: (15 * 65536) + (4 * 4096) + (2 * 256) + (3 * 16) + 15 = 983040 + 16384 + 512 + 48 + 15 = 999999.",
    level: "expert",
    codeExample: "999999 = 15*16^4 + 4*16^3 + 2*16^2 + 3*16^1 + 15*16^0 = 0xF423F"
  },
  {
    question: "What is the significance of the prefix `0x` in C, C++, Python, and JavaScript?",
    shortAnswer: "`0x` is a compiler/interpreter literal prefix that instructs the lexer to parse the following characters as a hexadecimal number.",
    explanation: "Without the prefix, a token like `10` would be parsed as decimal 10 instead of hex 16, and `FF` would be treated as an undefined identifier variable. `0x` explicitly specifies the base-16 radix to the compiler's tokenizer.",
    hint: "It distinguishes numeric literals from variable names and decimal literals.",
    level: "expert",
    codeExample: "const int port = 0x8080; // Hexadecimal literal (32896 in decimal)"
  },
  {
    question: "Convert the mixed decimal number 31.125 into hexadecimal and express it as a fixed-point hex literal.",
    shortAnswer: "(31.125)_10 = (1F.2)_16 or 0x1F.2.",
    explanation: "Integer: 31 ÷ 16 = 1 rem 15 ('F'); 1 ÷ 16 = 0 rem 1 ('1') -> 1F. Fraction: 0.125 × 16 = 2.0000 -> 2. Combined: 1F.2. Verification: 16 + 15 + 2/16 = 31 + 0.125 = 31.125.",
    hint: "0.125 = 2/16.",
    level: "expert",
    codeExample: "31 -> 0x1F\n0.125 * 16 = 2.0 -> 0x0.2\nTotal = 0x1F.2"
  }
];

export default questions;
