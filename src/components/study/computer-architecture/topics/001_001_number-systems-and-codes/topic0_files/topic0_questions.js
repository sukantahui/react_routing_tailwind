// Question Bank for Topic 0: Decimal, Binary, Octal, Hexadecimal conversions
// Computer Architecture Masterclass - Coder & AccoTax

const questions = [
  {
    question: "What is the fundamental difference between the Decimal (Base-10) and Binary (Base-2) number systems in computer architecture?",
    shortAnswer: "Decimal uses 10 symbols (0-9) based on human counting; Binary uses 2 states (0 and 1) representing electronic voltage levels (Low/High).",
    explanation: "Decimal is a base-10 positional system ($r=10$). Digital hardware uses binary ($r=2$) because physical transistors operate reliably in two discrete saturation/cutoff voltage states (e.g., 0V for logic 0 and 3.3V/1.2V for logic 1), maximizing noise margins.",
    hint: "Think about how physical transistors conduct or block current in silicon.",
    level: "basic",
    codeExample: "// Positional formula:\n// Decimal: N = d_n*10^n + ... + d_0*10^0\n// Binary:  N = b_n*2^n  + ... + b_0*2^0"
  },
  {
    question: "Why do computer scientists and hardware engineers use Hexadecimal (Base-16) instead of writing raw Binary?",
    shortAnswer: "Hexadecimal provides a compact human-readable representation where exactly 1 hex digit represents 4 binary bits (1 nibble).",
    explanation: "A 32-bit or 64-bit binary memory address (e.g. 11111111000010101100010111100010) is unwieldy and error-prone to read. Because $16 = 2^4$, each hexadecimal character represents exactly 4 binary bits (e.g. 0xFF0AC5E2), making byte-level inspection straightforward.",
    hint: "4 bits = 1 nibble = 1 hex digit (0-9, A-F).",
    level: "basic",
    codeExample: "// In C/C++:\nuint32_t raw_bin = 0b11111111000010101100010111100010;\nuint32_t hex_repr = 0xFF0AC5E2; // Identical value, 4x more compact"
  },
  {
    question: "What is the positional value of the leftmost '1' in the binary number (10000000)₂?",
    shortAnswer: "128 (or 2⁷).",
    explanation: "In an 8-bit binary number with bit positions from 0 (LSB) to 7 (MSB), the positional weight of bit index $k$ is $2^k$. Here $k=7$, so the weight is $2^7 = 128$.",
    hint: "Bit indices: 7, 6, 5, 4, 3, 2, 1, 0 -> Weights: 128, 64, 32, 16, 8, 4, 2, 1.",
    level: "basic",
    codeExample: "int val = 1 << 7; // Binary 10000000 = 128 in decimal"
  },
  {
    question: "How do you convert an integer Decimal number to Binary using the successive division algorithm?",
    shortAnswer: "Repeatedly divide by 2, record the remainders, and read the remainders from bottom to top (last remainder is MSB).",
    explanation: "Integer division by the target radix extracts the least significant digit as the first remainder. Successive quotients are divided until the quotient reaches 0. Reading remainders in reverse order (bottom-up) yields the correct most-to-least significant bit sequence.",
    hint: "First remainder = LSB (units place); Last remainder = MSB (highest power).",
    level: "basic",
    codeExample: "// Converting 13 to binary:\n// 13 / 2 = 6 rem 1 (LSB)\n//  6 / 2 = 3 rem 0\n//  3 / 2 = 1 rem 1\n//  1 / 2 = 0 rem 1 (MSB) -> Result: 1101_2"
  },
  {
    question: "How do you convert a fractional Decimal number (e.g. 0.625) to Binary?",
    shortAnswer: "Repeatedly multiply the fraction by 2, record the integer carry, and read the carries top to bottom.",
    explanation: "Multiplying by 2 shifts the highest fractional power ($2^{-1}$) into the units integer position. Recording each integer part and repeating with the remaining fraction generates bits after the radix point ($b_{-1}, b_{-2}, b_{-3}$) in top-to-bottom order.",
    hint: "Integer parts generated during multiplication become the fractional digits.",
    level: "moderate",
    codeExample: "// Converting 0.625 to binary:\n// 0.625 * 2 = 1.250 -> carry 1 (MSB after point)\n// 0.250 * 2 = 0.500 -> carry 0\n// 0.500 * 2 = 1.000 -> carry 1 (LSB) -> Result: 0.101_2"
  },
  {
    question: "Why does the decimal fraction 0.1₁₀ produce an infinite repeating binary fraction (0.000110011...)?",
    shortAnswer: "Because 10 contains a prime factor (5) that is not a power of 2, so 1/10 cannot be expressed as a finite sum of negative powers of 2.",
    explanation: "A fraction $p/q$ in simplest terms has a terminating representation in base $r$ if and only if all prime factors of $q$ divide $r$. Since 10 has prime factor 5, and base 2 only has prime factor 2, 0.1 cannot terminate in binary, causing floating-point rounding errors (0.1 + 0.2 != 0.3 in IEEE 754).",
    hint: "In base-10, 1/3 is non-terminating (0.333...) because 3 does not divide 10. Similarly, 1/10 in base-2 is non-terminating.",
    level: "expert",
    codeExample: "// In Python / JavaScript:\nconsole.log(0.1 + 0.2); // 0.30000000000000004"
  },
  {
    question: "How do you directly convert a Binary number to Hexadecimal without converting to Decimal first?",
    shortAnswer: "Group the binary digits into sets of 4 (nibbles) starting from the radix point, padding with zeros if necessary.",
    explanation: "Because $16 = 2^4$, every group of 4 binary bits maps directly to a single hexadecimal symbol (0000=0 ... 1111=F). Grouping from the radix point to the left for integers and to the right for fractions allows instant conversion.",
    hint: "4 bits = 1 hex digit. 1010 = A, 1011 = B, 1100 = C, 1101 = D, 1110 = E, 1111 = F.",
    level: "basic",
    codeExample: "// Binary: 11010111010_2\n// Group into 4s: (0110) (1011) (1010)\n// Hex:            6      B      A  -> 0x6BA"
  },
  {
    question: "How do you directly convert a Binary number to Octal without converting to Decimal?",
    shortAnswer: "Group the binary digits into sets of 3 bits starting from the radix point, padding with zeros as needed.",
    explanation: "Because $8 = 2^3$, every 3 binary bits represent exactly one octal digit (000=0 to 111=7). Grouping leftward for integers and rightward for fractions enables direct mapping.",
    hint: "3 bits = 1 octal digit (0 to 7).",
    level: "basic",
    codeExample: "// Binary: 11010111010_2\n// Group into 3s: (011) (010) (111) (010)\n// Octal:           3     2     7     2  -> (3272)_8"
  },
  {
    question: "What is the fastest way to convert an Octal number like (753)₈ to Hexadecimal?",
    shortAnswer: "Convert each octal digit to 3-bit binary, concatenate, and regroup into 4-bit nibbles for hexadecimal.",
    explanation: "Converting Octal -> Binary -> Hexadecimal bypasses costly decimal multiplication and division. (753)_8 -> (111 101 011)_2 -> regroup into 4s: (0001 1110 1011)_2 -> 0x1EB.",
    hint: "Never go through base-10. Use binary as the intermediate stepping stone.",
    level: "moderate",
    codeExample: "// (753)_8 -> Binary: 111 101 011 -> Hex: 0001 1110 1011 = 0x1EB"
  },
  {
    question: "What is the decimal equivalent of the hexadecimal number (2F.4)₁₆?",
    shortAnswer: "47.25",
    explanation: "$2 \\times 16^1 + 15 \\times 16^0 + 4 \\times 16^{-1} = 32 + 15 + 4/16 = 47 + 0.25 = 47.25$.",
    hint: "Remember 'F' in hexadecimal represents decimal value 15.",
    level: "moderate",
    codeExample: "// In Python:\nval = 0x2F + 4.0/16.0 # 47.25"
  },
  {
    question: "How many distinct values can be represented by an n-bit binary word?",
    shortAnswer: "2ⁿ distinct values (ranging from 0 to 2ⁿ - 1 for unsigned numbers).",
    explanation: "Each bit has 2 independent states (0 or 1). By the fundamental rule of counting, $n$ bits provide $2 \\times 2 \\times \\dots \\times 2 = 2^n$ unique combinations. For example, 8 bits = $2^8 = 256$ values (0 to 255).",
    hint: "8 bits = 256, 16 bits = 65,536, 32 bits = 4,294,967,296 (4 GB address space).",
    level: "basic",
    codeExample: "// Max unsigned values:\n// 8-bit:  2^8 - 1  = 255\n// 16-bit: 2^16 - 1 = 65535\n// 32-bit: 2^32 - 1 = 4294967295"
  },
  {
    question: "Why do Unix/Linux file permissions use the Octal (Base-8) system (e.g. chmod 755)?",
    shortAnswer: "Because each permission group (Read, Write, Execute) consists of exactly 3 bits, mapping 1:1 to an octal digit.",
    explanation: "In Unix, permissions for User, Group, and Others each have 3 boolean flags: Read (r=4), Write (w=2), Execute (x=1). 3 bits ($2^3 = 8$) range from 000 (0, no permission) to 111 (7, full rwx). Thus, 755 = (rwx r-x r-x).",
    hint: "r=4 (100), w=2 (010), x=1 (001). Sum = 7 (111).",
    level: "moderate",
    codeExample: "// Terminal:\n// chmod 755 script.sh\n// 7 = 111 (rwx for owner)\n// 5 = 101 (r-x for group)\n// 5 = 101 (r-x for others)"
  },
  {
    question: "In HTML/CSS, why are colors written as 6-digit hex codes like #38BDF8?",
    shortAnswer: "Each 2 hex digits represent 1 byte (8 bits) for Red, Green, and Blue channels (RGB, 0-255).",
    explanation: "Colors use 24-bit TrueColor depth: 8 bits for Red, 8 bits for Green, 8 bits for Blue. Since 8 bits = 2 hex characters ($16^2 = 256$), #38BDF8 translates to Red=0x38 (56), Green=0xBD (189), Blue=0xF8 (248).",
    hint: "#RRGGBB where each pair is a byte (00 to FF).",
    level: "basic",
    codeExample: "// CSS RGB Breakdown:\n// #38BDF8 -> R = 0x38 = 56, G = 0xBD = 189, B = 0xF8 = 248\n// rgba(56, 189, 248, 1.0)"
  },
  {
    question: "What is the result of converting the binary number (10110.11)₂ to decimal?",
    shortAnswer: "22.75",
    explanation: "Integer: $1\\times 2^4 + 0\\times 2^3 + 1\\times 2^2 + 1\\times 2^1 + 0\\times 2^0 = 16 + 0 + 4 + 2 + 0 = 22$. Fraction: $1\\times 2^{-1} + 1\\times 2^{-2} = 0.5 + 0.25 = 0.75$. Total = 22.75.",
    hint: "2^4=16, 2^2=4, 2^1=2 -> 16+4+2=22. 2^-1=0.5, 2^-2=0.25 -> 0.75.",
    level: "basic",
    codeExample: "// (10110.11)_2 = 16 + 4 + 2 + 0.5 + 0.25 = 22.75"
  },
  {
    question: "How do you represent the decimal number 255 in Binary, Octal, and Hexadecimal?",
    shortAnswer: "Binary: (11111111)₂, Octal: (377)₈, Hexadecimal: (FF)₁₆.",
    explanation: "255 is $2^8 - 1$. In 8-bit binary, all 8 bits are 1s (11111111). Grouping into 3s: (011 111 111) = 377_8. Grouping into 4s: (1111 1111) = FF_16.",
    hint: "255 is the maximum value that can fit in a single unsigned 8-bit byte.",
    level: "basic",
    codeExample: "// 255_10 = 0b11111111 = 0o377 = 0xFF"
  },
  {
    question: "What happens if you pad zeros on the wrong side when converting a fractional binary number to hex?",
    shortAnswer: "Padding leading zeros on a fraction alters its value; trailing zeros must be appended instead.",
    explanation: "For integers, padding leading zeros does not change the value ($011_2 = 11_2 = 3$). For fractions, padding must be added at the end (trailing zeros) because $(0.1)_2 = 0.5$, while padding a leading zero $(0.01)_2 = 0.25$, corrupting the calculation.",
    hint: "Integers: pad LEFT (leading). Fractions: pad RIGHT (trailing).",
    level: "moderate",
    codeExample: "// Correct:   0.1_2 -> group to 4 bits: 0.1000_2 = 0.8_16 (0.5 decimal)\n// Incorrect: 0.1_2 -> padded left:     0.0001_2 = 0.1_16 (0.0625 decimal) [FATAL ERROR!]"
  },
  {
    question: "How is an IPv4 subnet mask 255.255.255.0 represented in Hexadecimal and CIDR binary prefix?",
    shortAnswer: "Hexadecimal: 0xFFFFFF00; CIDR: /24 (24 consecutive 1s followed by 8 zeros).",
    explanation: "255 in hex is FF, and 0 is 00. Thus, 255.255.255.0 becomes 0xFFFFFF00. In binary, each 255 is 8 ones ($8 \\times 3 = 24$ ones), represented as CIDR prefix notation /24.",
    hint: "4 octets = 4 bytes = 8 hex characters.",
    level: "moderate",
    codeExample: "// Subnet mask: 255.255.255.0\n// Binary: 11111111.11111111.11111111.00000000 (/24)\n// Hex:    0xFF.0xFF.0xFF.0x00 -> 0xFFFFFF00"
  },
  {
    question: "What is the hexadecimal value of the 16-bit word (1010 1100 1111 0001)₂?",
    shortAnswer: "0xACF1",
    explanation: "Group 1 (bits 15-12): 1010 = A. Group 2 (bits 11-8): 1100 = C. Group 3 (bits 7-4): 1111 = F. Group 4 (bits 3-0): 0001 = 1. Result = 0xACF1.",
    hint: "10=A, 11=B, 12=C, 13=D, 14=E, 15=F.",
    level: "basic",
    codeExample: "// 1010_2 = A_16, 1100_2 = C_16, 1111_2 = F_16, 0001_2 = 1_16 -> 0xACF1"
  },
  {
    question: "How do modern 64-bit microprocessors represent 48-bit canonical virtual memory addresses?",
    shortAnswer: "As 12 hexadecimal characters with sign-extension (e.g. 0x00007FFF_FFFFFFFF or 0xFFFF8000_00000000).",
    explanation: "Current x86-64 and ARM64 CPUs implement 48-bit or 52-bit physical/virtual addressing. Since 48 bits $= 48/4 = 12$ hex characters, memory pointers are displayed in hex with upper bits sign-extended to 64 bits (16 hex chars).",
    hint: "48 bits / 4 bits per hex char = 12 hex digits.",
    level: "expert",
    codeExample: "// In GDB / C++:\nvoid* ptr = (void*)0x7ffff7a23c40; // 48-bit canonical user space address"
  },
  {
    question: "What is the decimal equivalent of octal (175)₈?",
    shortAnswer: "125",
    explanation: "$1 \\times 8^2 + 7 \\times 8^1 + 5 \\times 8^0 = 1 \\times 64 + 7 \\times 8 + 5 \\times 1 = 64 + 56 + 5 = 125$.",
    hint: "8^2 = 64, 8^1 = 8, 8^0 = 1.",
    level: "basic",
    codeExample: "// In C/JS:\nint x = 0175; // Leading 0 in C represents octal = 125 in decimal"
  },
  {
    question: "Why is a single hexadecimal digit called a 'Nibble' in hardware terminology?",
    shortAnswer: "Because a byte is 8 bits, and a 4-bit unit is half a byte (a 'small bite' or 'nibble').",
    explanation: "In digital engineering, 8 bits form a Byte. 4 bits form a Nibble. Since $2^4 = 16$, exactly one hexadecimal digit spans one nibble. A byte is composed of a High Nibble and a Low Nibble.",
    hint: "Byte = 8 bits, Nibble = 4 bits.",
    level: "basic",
    codeExample: "// Splitting a byte 0xA5 into nibbles:\nuint8_t b = 0xA5;\nuint8_t high_nibble = (b >> 4) & 0x0F; // 0x0A\nuint8_t low_nibble  = b & 0x0F;        // 0x05"
  },
  {
    question: "How is the decimal number 1000₁₀ converted to hexadecimal?",
    shortAnswer: "0x3E8",
    explanation: "1000 / 16 = 62 remainder 8 (LSB). 62 / 16 = 3 remainder 14 (which is 'E'). 3 / 16 = 0 remainder 3 (MSB). Reading bottom-up gives 3, E, 8 -> 0x3E8. Verification: $3\\times 256 + 14\\times 16 + 8 = 768 + 224 + 8 = 1000$.",
    hint: "14 in decimal is 'E' in hexadecimal.",
    level: "moderate",
    codeExample: "// 1000 / 16 = 62 R 8\n//   62 / 16 =  3 R 14 (E)\n//    3 / 16 =  0 R 3 -> 0x3E8"
  },
  {
    question: "What is the ASCII binary and hex encoding of the character 'A'?",
    shortAnswer: "Decimal 65 -> Binary (01000001)₂ -> Hexadecimal 0x41.",
    explanation: "In standard 7-bit/8-bit ASCII, uppercase 'A' is mapped to decimal code 65. $65 = 64 + 1 = 01000001_2 = 0x41$. Lowercase 'a' is 97 ($65 + 32 = 01100001_2 = 0x61$). The 6th bit (bit 5) toggles case!",
    hint: "Bit 5 = 1 for lowercase, Bit 5 = 0 for uppercase.",
    level: "moderate",
    codeExample: "// In C:\nchar c = 'A'; // ASCII 65 = 0x41 = 0b01000001\nchar lower = c | 0x20; // 'a' (0x61 = 97)"
  },
  {
    question: "What is the minimum number of binary bits required to represent any 4-digit decimal number (0 to 9999)?",
    shortAnswer: "14 bits.",
    explanation: "To represent numbers up to $N = 9999$, we need $2^k > 9999$. Since $2^{13} = 8192 < 9999$ and $2^{14} = 16384 \\ge 9999$, minimum $k = 14$ bits are required.",
    hint: "Formula: k = ceil(log2(Max_Value + 1)) = ceil(log2(10000)) = 14.",
    level: "moderate",
    codeExample: "// 2^13 = 8192 (insufficient)\n// 2^14 = 16384 (sufficient for 0..9999)"
  },
  {
    question: "What is the relationship between the base of a number system and the maximum digit symbol allowed?",
    shortAnswer: "In any base $r$, the maximum allowable digit symbol is $r - 1$.",
    explanation: "A base $r$ positional system uses exactly $r$ unique symbols from $0$ to $r-1$. For base 2, max digit is 1 ($2-1$). For base 8, max digit is 7 ($8-1$). For base 10, max digit is 9 ($10-1$). For base 16, max digit is 15 ($F$).",
    hint: "Writing digit '8' in octal or digit '2' in binary is a syntax error.",
    level: "basic",
    codeExample: "// Allowed symbols:\n// Base 2:  0..1\n// Base 8:  0..7\n// Base 10: 0..9\n// Base 16: 0..9, A..F"
  },
  {
    question: "How do you convert the hexadecimal fraction (0.A8)₁₆ to Decimal?",
    shortAnswer: "0.65625",
    explanation: "$10 \\times 16^{-1} + 8 \\times 16^{-2} = 10/16 + 8/256 = 0.625 + 0.03125 = 0.65625$.",
    hint: "16^-1 = 1/16 = 0.0625. 10 * 0.0625 = 0.625.",
    level: "moderate",
    codeExample: "// In Python:\nval = 10.0/16.0 + 8.0/256.0 # 0.65625"
  },
  {
    question: "What is the binary representation of the octal fraction (0.64)₈?",
    shortAnswer: "(0.110100)₂ or (0.1101)₂",
    explanation: "Convert each octal digit to 3 binary bits: 6 -> 110, 4 -> 100. Concatenating after the radix point gives $(0.110100)_2$.",
    hint: "6 = 110, 4 = 100.",
    level: "basic",
    codeExample: "// (0.64)_8 = (0. 110 100)_2 = 0.1101_2"
  },
  {
    question: "What is the Base-36 number system used for in web development and URL shorteners?",
    shortAnswer: "Using 0-9 and all 26 letters (A-Z) to encode large numerical IDs into compact, alphanumeric URL tokens.",
    explanation: "Base-36 employs symbols 0-9 and A-Z. It allows large database primary keys (e.g. 1,000,000,000) to be converted into short, alphanumeric slugs (like 'LFLS0') for URL shorteners without using special punctuation symbols.",
    hint: "10 digits + 26 alphabet letters = 36 symbols.",
    level: "moderate",
    codeExample: "// In JavaScript:\n(1000000000).toString(36); // 'lfls0'"
  },
  {
    question: "How do you detect whether an arbitrary binary integer is even or odd simply by looking at its bits?",
    shortAnswer: "Check the Least Significant Bit (LSB / Bit 0): If LSB is 0, the number is Even; if LSB is 1, the number is Odd.",
    explanation: "All powers of 2 ($2^1=2, 2^2=4, 2^3=8, \\dots$) are strictly even numbers. The only component that can produce an odd sum is $2^0 = 1$. Therefore, the entire parity of any binary integer is determined solely by the LSB.",
    hint: "In C, `if (num & 1)` tests for odd parity in 1 CPU cycle.",
    level: "basic",
    codeExample: "// C bitwise test:\nbool is_odd = (x & 1); // 1 = odd, 0 = even"
  },
  {
    question: "What is the master golden rule when converting between any two arbitrary bases (e.g., Base-5 to Base-7)?",
    shortAnswer: "Convert Base-A to Decimal (Base-10) using polynomial expansion, then convert Decimal to Base-B using successive division.",
    explanation: "Unless the two bases share a common power ($r_1^k = r_2^m$, like base 2, 8, 16), direct grouping is impossible. The standard universal pipeline is: $(N)_A \\xrightarrow{\\text{Polynomial Expansion}} (N)_{10} \\xrightarrow{\\text{Successive Division}} (N)_B$.",
    hint: "Base-A -> Base-10 (multiply powers) -> Base-B (divide by new base).",
    level: "advanced",
    codeExample: "// Converting (34)_5 to Base-7:\n// 1. To Decimal: 3*5^1 + 4*5^0 = 15 + 4 = 19_10\n// 2. To Base-7:  19 / 7 = 2 rem 5 -> (25)_7"
  }
];

export default questions;
