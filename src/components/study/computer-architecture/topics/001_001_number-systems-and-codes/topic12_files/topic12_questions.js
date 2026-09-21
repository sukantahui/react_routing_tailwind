// topic12_questions.js - 30 Comprehensive Questions on ASCII, Unicode, BCD and Gray Code
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is ASCII and how many characters does standard ASCII define?",
    shortAnswer: "ASCII is a 7-bit character encoding defining 128 characters (0 to 127 / 0x00 to 0x7F).",
    explanation: "Standard ASCII uses 7 bits per character, accommodating 95 printable characters (uppercase letters, lowercase letters, digits, punctuation) and 33 non-printable control characters (CR, LF, TAB, NUL, etc.).",
    hint: "7-bit encoding with 2^7 = 128 characters.",
    level: "basic",
    codeExample: "'A' = 65 (0x41), 'a' = 97 (0x61), '0' = 48 (0x30)"
  },
  {
    question: "What are the ASCII values of '0', 'A', 'a', and Space ' '?",
    shortAnswer: "'0' = 48 (0x30), 'A' = 65 (0x41), 'a' = 97 (0x61), Space ' ' = 32 (0x20).",
    explanation: "These standard code points are foundational. Notice that lowercase letters are exactly 32 (0x20) higher than uppercase letters ('a' - 'A' = 32).",
    hint: "0 is 48, A is 65, a is 97, Space is 32.",
    level: "basic",
    codeExample: "'0': 0x30 (48)\n'A': 0x41 (65)\n'a': 0x61 (97)\n' ': 0x20 (32)"
  },
  {
    question: "How can you toggle an ASCII character between uppercase and lowercase using a single bitwise operation?",
    shortAnswer: "Using `char ^ 0x20` (XOR with 32 / 00100000_2).",
    explanation: "Bit 5 in ASCII acts as the case flag: for uppercase 'A' (01000001), bit 5 is 0; for lowercase 'a' (01100001), bit 5 is 1. XORing with 0x20 toggles bit 5 without modifying other bits.",
    hint: "XOR with 0x20 toggles bit 5.",
    level: "basic",
    codeExample: "char upper = 'A'; char lower = upper ^ 0x20; // 'a'"
  },
  {
    question: "What is Unicode and why was it created to replace ASCII?",
    shortAnswer: "Unicode is a universal character encoding standard that assigns a unique code point to every character across all human languages, scripts, and emojis.",
    explanation: "ASCII only supported basic English characters. Unicode (from U+0000 to U+10FFFF) defines over 1.1 million possible code points, supporting Bengali, Hindi, Chinese, Arabic, Cyrillic, math symbols, and emojis.",
    hint: "Universal character set for all global languages.",
    level: "basic",
    codeExample: "Bengali 'ক': U+0995; Indian Rupee '₹': U+20B9; Emoji '🚀': U+1F680"
  },
  {
    question: "What is UTF-8 and why does it dominate modern web and operating systems?",
    shortAnswer: "UTF-8 is a variable-width encoding (1 to 4 bytes per character) that is 100% backward compatible with 7-bit ASCII.",
    explanation: "In UTF-8, standard ASCII characters take only 1 byte (0xxxxxxx), matching ASCII exactly. Non-ASCII characters use 2 to 4 bytes. This avoids memory waste and prevents breaking legacy ASCII software.",
    hint: "Variable width: 1 byte for ASCII, up to 4 bytes for emojis.",
    level: "basic",
    codeExample: "ASCII 'A': 1 byte (0x41)\nBengali 'ক': 3 bytes (0xE0 0xA6 0x95)\nEmoji '🚀': 4 bytes (0xF0 0x9F 0x9A 0x80)"
  },
  {
    question: "What is BCD (Binary-Coded Decimal) / 8421 Code?",
    shortAnswer: "A weighted binary encoding where each decimal digit (0 to 9) is represented by its 4-bit binary equivalent.",
    explanation: "In BCD, decimal digits 0 to 9 are encoded as 0000 to 1001 with weights 8-4-2-1. For example, decimal 59 is represented in BCD as `0101 1001` (5 and 9).",
    hint: "Each decimal digit takes exactly 4 bits.",
    level: "basic",
    codeExample: "59_10 = [0101][1001]_BCD = 0x59"
  },
  {
    question: "What are the illegal / invalid 4-bit combinations in BCD?",
    shortAnswer: "The 6 bit patterns from `1010` to `1111` (decimal 10 to 15 / 0xA to 0xF).",
    explanation: "Because decimal digits only span 0 to 9, any 4-bit nibble representing 10 to 15 is undefined in standard BCD.",
    hint: "1010 (10) through 1111 (15) are illegal.",
    level: "basic",
    codeExample: "Illegal BCD: 1010, 1011, 1100, 1101, 1110, 1111"
  },
  {
    question: "What is the difference between Packed BCD and Unpacked BCD?",
    shortAnswer: "Packed BCD stores two decimal digits per 8-bit byte (e.g. 0x85 for 85); Unpacked BCD stores one decimal digit per byte (e.g. 0x08 0x05 for 85).",
    explanation: "Packed BCD saves memory by using both high and low 4-bit nibbles. Unpacked BCD zero-pads the upper 4 bits, making it easier to convert to ASCII characters by adding 0x30.",
    hint: "Packed = 2 digits/byte; Unpacked = 1 digit/byte.",
    level: "basic",
    codeExample: "Packed BCD: 0x85 (1 byte)\nUnpacked BCD: 0x08 0x05 (2 bytes)"
  },
  {
    question: "What is Gray Code (Reflected Binary Code)?",
    shortAnswer: "An unweighted, non-arithmetic, unit-distance binary code where adjacent numbers differ by ONLY ONE BIT.",
    explanation: "Unlike pure binary where moving from 7 (0111) to 8 (1000) flips 4 bits simultaneously, Gray code ensures that every consecutive increment or decrement flips exactly 1 bit.",
    hint: "Unit-distance code: only 1 bit changes per step.",
    level: "basic",
    codeExample: "Binary: 00, 01, 10, 11 (10->11 flips 1, 01->10 flips 2 bits)\nGray:   00, 01, 11, 10 (Every step flips exactly 1 bit!)"
  },
  {
    question: "Why is Gray Code universally used in physical rotary optical shaft encoders?",
    shortAnswer: "It eliminates mechanical switching glitches and race conditions by guaranteeing that only 1 sensor track changes state at any physical angle transition.",
    explanation: "In a binary encoder disc, if multiple optical tracks switch at the same boundary, physical imperfections cause sensors to switch asynchronously, generating transient false angle readings (e.g., jumping from 7 to 15 to 8). In Gray code, only 1 track changes, making read errors impossible.",
    hint: "Eliminates multi-track sensor read bounce errors.",
    level: "moderate",
    codeExample: "Binary 7->8 (0111->1000): 4 bits flip (Glitch prone!)\nGray 7->8 (0100->1100): 1 bit flips (Glitch free!)"
  },
  {
    question: "What is the formula to convert an n-bit Binary number $B$ to Gray Code $G$?",
    shortAnswer: "$G_n = B_n$ (MSB stays same), and $G_i = B_{i+1} \oplus B_i$; In C/Verilog: `G = B ^ (B >> 1)`.",
    explanation: "To convert binary to Gray code, keep the MSB identical. For each subsequent bit, XOR the current binary bit with the binary bit to its immediate left.",
    hint: "XOR the binary number with itself shifted right by 1.",
    level: "moderate",
    codeExample: "uint32_t binary_to_gray(uint32_t b) { return b ^ (b >> 1); }"
  },
  {
    question: "Convert binary `1101` to Gray Code.",
    shortAnswer: "`1011`.",
    explanation: "B = 1101. G3 = B3 = 1. G2 = B3 ^ B2 = 1 ^ 1 = 0. G1 = B2 ^ B1 = 1 ^ 0 = 1. G0 = B1 ^ B0 = 0 ^ 1 = 1. Result: 1011.",
    hint: "1101 ^ 0110 = 1011.",
    level: "moderate",
    codeExample: "Binary: 1101 -> Gray: 1 (1^1=0) (1^0=1) (0^1=1) -> 1011"
  },
  {
    question: "What is the algorithm to convert an n-bit Gray Code $G$ back to Binary $B$?",
    shortAnswer: "$B_{MSB} = G_{MSB}$, and $B_i = B_{i+1} \oplus G_i$.",
    explanation: "The binary MSB equals the Gray MSB. Each subsequent binary bit is obtained by XORing the previously computed binary bit with the current Gray code bit.",
    hint: "XOR the previous binary bit with the current Gray bit.",
    level: "moderate",
    codeExample: "B[3] = G[3];\nB[2] = B[3] ^ G[2];\nB[1] = B[2] ^ G[1];\nB[0] = B[1] ^ G[0];"
  },
  {
    question: "Convert Gray Code `1011` to Binary.",
    shortAnswer: "`1101`.",
    explanation: "G = 1011. B3 = G3 = 1. B2 = B3 ^ G2 = 1 ^ 0 = 1. B1 = B2 ^ G1 = 1 ^ 1 = 0. B0 = B1 ^ G0 = 0 ^ 1 = 1. Result: 1101.",
    hint: "B3=1, B2=1^0=1, B1=1^1=0, B0=0^1=1.",
    level: "moderate",
    codeExample: "Gray: 1011 -> Binary: 1101"
  },
  {
    question: "Convert decimal 847 into BCD.",
    shortAnswer: "`1000 0100 0111` (12 bits / 0x847).",
    explanation: "Encode each digit into 4 bits: 8 -> 1000, 4 -> 0100, 7 -> 0111. Result: 1000 0100 0111.",
    hint: "8 = 1000, 4 = 0100, 7 = 0111.",
    level: "moderate",
    codeExample: "847_10 = 1000 0100 0111_BCD"
  },
  {
    question: "Why does adding two BCD digits in a 4-bit binary adder require adding binary `0110` (+6) when the sum exceeds 9?",
    shortAnswer: "Because 4-bit binary addition operates modulo 16, whereas decimal addition operates modulo 10; adding 6 skips the 6 illegal states (1010 to 1111) and generates the correct carry.",
    explanation: "For example, 7 (0111) + 8 (1000) = 15 (1111). Since 1111 > 1001 (9), adding 0110 produces `1 0101` (Carry 1, units 5 = BCD 15).",
    hint: "16 - 10 = 6 illegal states.",
    level: "moderate",
    codeExample: "7 + 8 = 15 (1111) + 6 (0110) = 0001 0101 (BCD 15)"
  },
  {
    question: "What x86 instruction performs BCD decimal adjustment after addition?",
    shortAnswer: "`DAA` (Decimal Adjust AL after Addition).",
    explanation: "`DAA` checks if the lower nibble of register AL exceeds 9 (or if Auxiliary Carry AF=1) and adds 0x06; it then checks the upper nibble and adds 0x60 if necessary.",
    hint: "DAA = Decimal Adjust AL.",
    level: "moderate",
    codeExample: "ADD AL, BL\nDAA ; Adjusts binary sum in AL to valid packed BCD"
  },
  {
    question: "Why is Gray Code essential in Asynchronous FIFO (First-In, First-Out) memory buffers across clock domains?",
    shortAnswer: "Gray code pointers change by only 1 bit per increment, eliminating multi-bit metastability race conditions when synchronized across asynchronous clock domains.",
    explanation: "If a binary counter (e.g. 0111 to 1000) is sampled by an asynchronous receiving clock, multi-bit transition skew can cause intermediate invalid states (like 1111 or 0000) to be latched, corrupting FIFO empty/full flags. Gray code guarantees only 1 bit flips, making synchronization safe.",
    hint: "Prevents metastability during clock domain crossing (CDC).",
    level: "expert",
    codeExample: "CDC Pointer Sync: Binary -> Gray -> 2-FF Sync -> Gray -> Binary"
  },
  {
    question: "How many bytes does the Indian Rupee symbol '₹' (Unicode U+20B9) require in UTF-8 encoding?",
    shortAnswer: "3 bytes (`0xE2 0x82 0xB9`).",
    explanation: "Code point U+20B9 falls in the 3-byte UTF-8 range (U+0800 to U+FFFF), encoded using the bit template `1110xxxx 10xxxxxx 10xxxxxx` as bytes `0xE2 0x82 0xB9`.",
    hint: "U+20B9 is between U+0800 and U+FFFF, requiring 3 bytes.",
    level: "expert",
    codeExample: "₹ (U+20B9) in UTF-8: 0xE2 0x82 0xB9"
  },
  {
    question: "What is the Unicode block range for the Bengali script?",
    shortAnswer: "`U+0980` to `U+09FF`.",
    explanation: "The Bengali / Assamese Unicode block spans U+0980 through U+09FF, covering Bengali vowels, consonants (ক U+0995, খ U+0996), vowel signs, numerals (০-৯), and Bengali currency signs (৲ U+09F2, ৳ U+09F3).",
    hint: "U+0980 to U+09FF.",
    level: "expert",
    codeExample: "Bengali Unicode: U+0980 to U+09FF"
  },
  {
    question: "What is Excess-3 Code and why is it self-complementing?",
    shortAnswer: "An unweighted BCD code where each digit is $D + 3$; it is self-complementing because inverting all bits of any digit yields the 9's complement of that decimal digit.",
    explanation: "For example, 4 in Excess-3 is 0111. Inverting bits gives 1000, which represents 5 (since 9 - 4 = 5). Self-complementing codes simplified 9's complement subtraction in early decimal computers.",
    hint: "Bitwise NOT of Excess-3 gives the 9's complement.",
    level: "expert",
    codeExample: "Digit 2: 0101 -> Invert: 1010 (represents 7 = 9 - 2)"
  },
  {
    question: "What is Extended ASCII (ISO-8859-1 / Latin-1)?",
    shortAnswer: "An 8-bit character encoding (256 characters) that includes standard 7-bit ASCII in the lower 128 slots and Western European accented characters in codes 128-255.",
    explanation: "ISO-8859-1 expanded 7-bit ASCII by utilizing the 8th bit, adding symbols like ©, ®, and accented letters (é, ö, ñ).",
    hint: "8-bit encoding with 256 characters.",
    level: "expert",
    codeExample: "ISO-8859-1: 0-127 (Standard ASCII) + 128-255 (Western Accents)"
  },
  {
    question: "In 4-bit Gray code, list the sequence of codes from 0 to 7.",
    shortAnswer: "0: `0000`, 1: `0001`, 2: `0011`, 3: `0010`, 4: `0110`, 5: `0111`, 6: `0101`, 7: `0100`.",
    explanation: "Notice the reflective symmetry: codes 4-7 mirror codes 0-3 with bit 2 set to 1.",
    hint: "Reflective binary pattern.",
    level: "expert",
    codeExample: "0: 0000\n1: 0001\n2: 0011\n3: 0010\n4: 0110\n5: 0111\n6: 0101\n7: 0100"
  },
  {
    question: "What is the Byte Order Mark (BOM) in UTF-16 and UTF-8?",
    shortAnswer: "The Unicode character `U+FEFF` placed at the start of a text file to indicate byte endianness (Big-Endian `0xFE 0xFF` vs Little-Endian `0xFF 0xFE`).",
    explanation: "In UTF-16, characters take 2 bytes, so a BOM identifies endianness. In UTF-8, characters are byte-streams so BOM (`0xEF 0xBB 0xBF`) is unnecessary and discouraged.",
    hint: "U+FEFF indicates byte endianness.",
    level: "expert",
    codeExample: "UTF-16 BE: 0xFE 0xFF\nUTF-16 LE: 0xFF 0xFE\nUTF-8: 0xEF 0xBB 0xBF"
  },
  {
    question: "Why does Gray Code have reflective symmetry?",
    shortAnswer: "An (n+1)-bit Gray code is constructed by listing the n-bit Gray code, then appending the same list in reverse order (reflected) with MSB set to 1.",
    explanation: "This recursive reflection property guarantees that the last code in the sequence differs from the first code by only 1 bit, creating a closed cyclic unit-distance ring.",
    hint: "The upper half is a mirror reflection of the lower half.",
    level: "expert",
    codeExample: "1-bit: 0, 1 -> 2-bit: [00, 01], [11, 10] -> 3-bit: [000..010], [110..100]"
  },
  {
    question: "What is an Alphanumeric Display Driver IC that converts 4-bit BCD to 7-segment LED signals?",
    shortAnswer: "IC 74LS47 (Active-Low outputs for Common Anode displays) or CD4511 (Active-High outputs for Common Cathode displays).",
    explanation: "These decoder ICs accept 4 BCD input pins (A, B, C, D) and drive the 7 segment lines (a, b, c, d, e, f, g) directly to illuminate decimal numerals 0-9.",
    hint: "74LS47 / CD4511 BCD to 7-Segment Decoders.",
    level: "expert",
    codeExample: "IC 74LS47: 4-bit BCD in -> 7-segment output (a..g)"
  },
  {
    question: "Convert the string 'Hi' into hexadecimal ASCII codes and binary ASCII.",
    shortAnswer: "Hex: `0x48 0x69`, Binary: `01001000 01101001`.",
    explanation: "'H' is decimal 72 = 0x48 = 01001000. 'i' is decimal 105 = 0x69 = 01101001.",
    hint: "'H' = 72 (0x48), 'i' = 105 (0x69).",
    level: "expert",
    codeExample: "'H' -> 72 (0x48: 01001000)\n'i' -> 105 (0x69: 01101001)"
  },
  {
    question: "In Verilog RTL, write a 1-line continuous assignment to convert 4-bit binary `bin` to 4-bit Gray code `gray`.",
    shortAnswer: "`assign gray = bin ^ (bin >> 1);`.",
    explanation: "Because bitwise XOR with right-shift by 1 applies the exact $G_i = B_{i+1} \oplus B_i$ formula across all bit slices in parallel.",
    hint: "assign gray = bin ^ (bin >> 1);",
    level: "expert",
    codeExample: "wire [3:0] gray = bin ^ (bin >> 1);"
  },
  {
    question: "Why is BCD arithmetic still preserved in financial databases and COBOL banking applications?",
    shortAnswer: "To eliminate binary floating-point representation rounding errors (e.g. 0.1 cannot be represented precisely in binary, causing fractional cent errors).",
    explanation: "In accounting, currency amounts like $0.10$ must be exact. In binary floating point, $0.1$ is an infinite repeating fraction. BCD stores base-10 digits directly, guaranteeing 100% exact currency arithmetic.",
    hint: "Prevents 0.1 decimal rounding errors in financial transactions.",
    level: "expert",
    codeExample: "0.1 + 0.2 in Float = 0.30000000000000004 (Rounding Error!)\nIn BCD = Exact 0.30"
  },
  {
    question: "Summarize the primary application domain for each code: ASCII, Unicode, BCD, and Gray Code.",
    shortAnswer: "ASCII = Legacy English text; Unicode = Universal multi-lingual text/emojis; BCD = Exact financial math & 7-segment displays; Gray Code = Rotary shaft sensors & Asynchronous FIFO sync.",
    explanation: "Each code solves a distinct hardware constraint in computer systems architecture.",
    hint: "Text -> Unicode; Money/Displays -> BCD; Sensors/CDC -> Gray Code.",
    level: "expert",
    codeExample: "ASCII/Unicode: Alphanumeric | BCD: Decimal/Finance | Gray: Unit-Distance Sensors"
  }
];

export default questions;
