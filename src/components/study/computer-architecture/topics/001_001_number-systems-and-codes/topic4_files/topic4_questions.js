// topic4_questions.js - 30 Comprehensive Questions on Unsigned vs Signed Number Representation
// Module: 001_001_number-systems-and-codes

const questions = [
  {
    question: "What is the fundamental difference between an unsigned and a signed integer in digital hardware?",
    shortAnswer: "In unsigned integers, all bits represent magnitude (positive only); in signed integers, the MSB is dedicated to representing the sign.",
    explanation: "In an n-bit unsigned integer, every bit from 0 to n-1 contributes positive weight (+2^i). In signed representations, the Most Significant Bit (MSB) indicates the sign (0 for non-negative, 1 for negative), which cuts the positive magnitude range in half to accommodate negative numbers.",
    hint: "Think about what role the Most Significant Bit (MSB) plays.",
    level: "basic",
    codeExample: "uint8_t u = 255; // 11111111 = +255\nint8_t s = -1;    // 11111111 = -1"
  },
  {
    question: "What is the range of an n-bit unsigned integer?",
    shortAnswer: "0 to 2^n - 1.",
    explanation: "With n bits, there are 2^n distinct combinations. Since the minimum value is all zeros (0), the maximum value is all ones, which equals 2^n - 1.",
    hint: "For 8 bits, 2^8 - 1 = 255.",
    level: "basic",
    codeExample: "Range = [0, 2^n - 1]"
  },
  {
    question: "What is the range of an n-bit signed integer using 2's complement representation?",
    shortAnswer: "-2^(n-1) to +2^(n-1) - 1.",
    explanation: "In 2's complement, the negative range extends from -2^(n-1) to -1 (2^(n-1) values), and the non-negative range extends from 0 to +2^(n-1) - 1 (2^(n-1) values). Note that there is exactly one more negative number than positive numbers.",
    hint: "For 8 bits, -2^7 to +2^7 - 1 = -128 to +127.",
    level: "basic",
    codeExample: "8-bit signed range: [-128, +127]\n16-bit signed range: [-32768, +32767]"
  },
  {
    question: "What are the minimum and maximum values of an 8-bit unsigned number?",
    shortAnswer: "Minimum = 0, Maximum = 255.",
    explanation: "The minimum bit pattern 00000000 is 0. The maximum bit pattern 11111111 is 2^8 - 1 = 255.",
    hint: "8 bits of all 1s equals 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1.",
    level: "basic",
    codeExample: "00000000_2 = 0\n11111111_2 = 255"
  },
  {
    question: "What are the minimum and maximum values of an 8-bit signed integer in 2's complement?",
    shortAnswer: "Minimum = -128, Maximum = +127.",
    explanation: "The minimum value is 10000000_2 = -128. The maximum positive value is 01111111_2 = +127. Zero is represented by 00000000_2.",
    hint: "The MSB is weight -128.",
    level: "basic",
    codeExample: "10000000_2 = -128\n01111111_2 = +127"
  },
  {
    question: "How does the computer hardware know whether a register contains a signed or unsigned number?",
    shortAnswer: "The hardware does not know; the meaning is determined entirely by the instruction opcodes executed by the CPU.",
    explanation: "A register simply holds voltages (bits). The CPU executes different machine instructions depending on the high-level language types (e.g., `MUL` vs `IMUL`, `DIV` vs `IDIV`, unsigned branch `BHI` vs signed branch `BGT`).",
    hint: "Silicon is agnostic; instruction opcodes provide the semantic interpretation.",
    level: "basic",
    codeExample: "x86: JA/JB (unsigned Jump Above/Below) vs JG/JL (signed Jump Greater/Less)"
  },
  {
    question: "What is the decimal value of the 8-bit pattern `10000000` when interpreted as (a) Unsigned, and (b) Signed 2's Complement?",
    shortAnswer: "(a) 128 unsigned, (b) -128 signed 2's complement.",
    explanation: "As unsigned: 1 * 2^7 = 128. As signed 2's complement: MSB has weight -2^7 = -128, and all other bits are 0, giving -128.",
    hint: "The MSB has positive weight +128 in unsigned, but negative weight -128 in signed 2's complement.",
    level: "basic",
    codeExample: "Unsigned: 10000000 -> 128\nSigned 2s: 10000000 -> -128"
  },
  {
    question: "What is the decimal value of the 8-bit pattern `11111111` when interpreted as (a) Unsigned, and (b) Signed 2's Complement?",
    shortAnswer: "(a) 255 unsigned, (b) -1 signed 2's complement.",
    explanation: "Unsigned: 128+64+32+16+8+4+2+1 = 255. Signed 2's complement: -128 + 127 = -1.",
    hint: "All 1s in 2's complement always represents -1 regardless of bit-width.",
    level: "basic",
    codeExample: "0xFF = 255 (unsigned) or -1 (signed int8_t)"
  },
  {
    question: "Why is 2's complement asymmetric with one extra negative number compared to positive numbers?",
    shortAnswer: "Because zero (0000...0) uses one of the non-negative slots (where MSB = 0), leaving 2^(n-1) - 1 positive numbers and 2^(n-1) negative numbers.",
    explanation: "There are 2^n total states. Half of them (2^(n-1)) have MSB=0, representing 0 and positive numbers 1 to 2^(n-1)-1. The other half (2^(n-1)) have MSB=1, representing negative numbers -1 down to -2^(n-1). Since 0 takes a non-negative slot, the maximum positive number is 1 less than the maximum negative magnitude.",
    hint: "Zero has an MSB of 0, taking up one slot among the non-negative values.",
    level: "moderate",
    codeExample: "8-bit: 128 negative numbers (-128 to -1), 1 zero (0), 127 positive numbers (+1 to +127)"
  },
  {
    question: "What happens when you assign a negative number to an unsigned variable in C/C++ (e.g. `uint8_t u = -1;`)?",
    shortAnswer: "The bit pattern for -1 (11111111) is copied directly, resulting in the unsigned value 255 (modulo 2^8 wrap-around).",
    explanation: "In C/C++, assigning a negative number to an unsigned type triggers modular arithmetic: the value is converted modulo 2^n. For 8-bit unsigned, -1 + 256 = 255.",
    hint: "The bits do not change; only the interpretation of the bits changes.",
    level: "moderate",
    codeExample: "uint8_t u = -1; // u becomes 255"
  },
  {
    question: "What is sign extension and when is it required?",
    shortAnswer: "Sign extension is copying the MSB (sign bit) to fill higher-order bit positions when expanding a smaller signed integer to a larger bit-width.",
    explanation: "When casting an 8-bit signed integer like -5 (11111011) to a 16-bit integer, simply padding with zeros would make it positive (00000000 11111011 = +251). To preserve the negative value -5, the MSB (1) is replicated into all new upper bits (11111111 11111011 = -5).",
    hint: "Replicating 1 maintains the negative 2's complement value.",
    level: "moderate",
    codeExample: "8-bit -5:  11111011\n16-bit -5: 11111111 11111011 (sign-extended with 1s)"
  },
  {
    question: "What is zero extension and when is it used?",
    shortAnswer: "Zero extension is filling the higher-order bits with zeros when expanding an unsigned integer to a larger bit-width.",
    explanation: "When casting an 8-bit unsigned integer (e.g. 200 = 11001000) to 16 bits, high-order bits are filled with 0s (00000000 11001000 = 200). It preserves the exact positive unsigned magnitude.",
    hint: "Unsigned integers are always padded with zeros regardless of their MSB.",
    level: "moderate",
    codeExample: "uint8_t u = 200; // 11001000\nuint16_t u16 = u; // 00000000 11001000"
  },
  {
    question: "Explain the subtle C bug in: `int x = -10; unsigned int y = 5; if (x < y) { ... }`.",
    shortAnswer: "C's integer promotion rules convert `x` to `unsigned int`, turning -10 into +4,294,967,286, causing `x < y` to evaluate to FALSE.",
    explanation: "When comparing a signed int with an unsigned int of the same width, C implicitly promotes the signed operand to unsigned. The bit pattern for -10 becomes an immense positive number (4,294,967,286), so `4294967286 < 5` evaluates to false!",
    hint: "Implicit type conversion promotes signed to unsigned during comparison.",
    level: "moderate",
    codeExample: "int x = -10;\nunsigned int y = 5;\nif (x < y) // Evaluates FALSE! 4294967286 is NOT < 5"
  },
  {
    question: "What is the 16-bit unsigned range and 16-bit signed (2's complement) range?",
    shortAnswer: "Unsigned: 0 to 65,535; Signed: -32,768 to +32,767.",
    explanation: "2^16 = 65,536 total states. Unsigned is 0 to 65,535. Signed 2's complement is -2^15 to +2^15 - 1 = -32,768 to +32,767.",
    hint: "2^16 = 65536; 2^15 = 32768.",
    level: "moderate",
    codeExample: "uint16_t: [0, 65535]\nint16_t:  [-32768, +32767]"
  },
  {
    question: "What is the 32-bit unsigned range and 32-bit signed range?",
    shortAnswer: "Unsigned: 0 to 4,294,967,295 (~4.29 Billion); Signed: -2,147,483,648 to +2,147,483,647 (~-2.14B to +2.14B).",
    explanation: "2^32 = 4,294,967,296. Unsigned ranges from 0 to 2^32 - 1. Signed 2's complement ranges from -2^31 to 2^31 - 1.",
    hint: "32-bit integers are standard `int` and `unsigned int` on most systems.",
    level: "moderate",
    codeExample: "uint32_t: [0, 4294967295]\nint32_t:  [-2147483648, +2147483647]"
  },
  {
    question: "What is the 64-bit unsigned range and 64-bit signed range?",
    shortAnswer: "Unsigned: 0 to ~18.44 Quintillion (2^64 - 1); Signed: ~ -9.22 Quintillion to +9.22 Quintillion.",
    explanation: "2^64 = 18,446,744,073,709,551,616. Unsigned spans 0 to 18,446,744,073,709,551,615. Signed 2's complement spans -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807.",
    hint: "64-bit pointers and registers allow addressing virtually unlimited memory.",
    level: "moderate",
    codeExample: "uint64_t: [0, 18446744073709551615ULL]\nint64_t:  [-9223372036854775808LL, 9223372036854775807LL]"
  },
  {
    question: "What is the problem with using an unsigned integer for a loop countdown: `for (unsigned int i = 5; i >= 0; i--)`?",
    shortAnswer: "It causes an infinite loop because an unsigned integer can never be negative (0 - 1 wraps to 4,294,967,295 >= 0).",
    explanation: "Since `i` is unsigned, `i >= 0` is ALWAYS true. When `i` is 0, `i--` underflows and wraps around to 4,294,967,295, which is still >= 0, leading to an infinite execution loop.",
    hint: "An unsigned value is mathematically incapable of being less than 0.",
    level: "moderate",
    codeExample: "for (unsigned int i = 5; i >= 0; i--) // BUG: Infinite Loop!"
  },
  {
    question: "Why are array indices and memory addresses in C/C++ typically unsigned (`size_t`, `uintptr_t`)?",
    shortAnswer: "Memory locations and byte counts are physical quantities that cannot be negative, and unsigned doubles the addressable space.",
    explanation: "Physical memory addresses start at 0 and increase upwards; negative memory addresses do not exist in linear physical RAM. Using unsigned types also doubles the accessible address space for a given bit width (e.g. 4GB vs 2GB on a 32-bit CPU).",
    hint: "You cannot have -5 bytes of RAM.",
    level: "moderate",
    codeExample: "size_t len = strlen(str); // size_t is unsigned"
  },
  {
    question: "In CPU flag registers, what flag is set when an unsigned addition exceeds the bit width, and what flag is set for signed overflow?",
    shortAnswer: "Carry Flag (CF) for unsigned overflow, Overflow Flag (OF / V) for signed overflow.",
    explanation: "The Carry Flag (CF) tracks whether an addition generated a carry out of the MSB (unsigned overflow). The Overflow Flag (OF) tracks whether adding two signed numbers of the same sign produced a result with an invalid sign bit.",
    hint: "CF = Carry out of MSB; OF = C_in(MSB) XOR C_out(MSB).",
    level: "expert",
    codeExample: "255 + 1 -> CF=1, OF=0 (Unsigned overflowed, signed did not)\n127 + 1 -> CF=0, OF=1 (Signed overflowed to -128, unsigned did not)"
  },
  {
    question: "Explain the scenario where 127 + 1 causes signed overflow but NOT unsigned overflow in an 8-bit ALU.",
    shortAnswer: "01111111 (+127) + 00000001 (+1) = 10000000. In signed 2's comp, this is -128 (overflow, OF=1). In unsigned, 128 is within [0, 255] (no carry, CF=0).",
    explanation: "Adding two positive signed numbers (+127 and +1) produced a negative result (-128), which is an arithmetic overflow (OF=1). But for unsigned arithmetic, 128 is perfectly legal and no carry-out was generated (CF=0).",
    hint: "128 fits in 8 unsigned bits, but exceeds the +127 signed limit.",
    level: "expert",
    codeExample: "  01111111 (+127)\n+ 00000001 (+1)\n= 10000000 (-128 in signed -> OF=1; 128 in unsigned -> CF=0)"
  },
  {
    question: "Explain the scenario where 255 + 1 causes unsigned overflow but NOT signed overflow in an 8-bit ALU.",
    shortAnswer: "11111111 + 00000001 = 00000000 with carry-out 1. Unsigned: 255 + 1 = 256 > 255 (CF=1). Signed: -1 + 1 = 0 (valid, OF=0).",
    explanation: "In signed arithmetic, 11111111 is -1 and 00000001 is +1. Adding them gives 0, which is correct and has no signed overflow (OF=0). But unsigned 255 + 1 = 256 requires 9 bits, generating a carry-out (CF=1).",
    hint: "-1 + 1 = 0 in 2's complement.",
    level: "expert",
    codeExample: "  11111111 (-1 or 255)\n+ 00000001 (+1)\n= 00000000 (0)\nCF=1 (unsigned overflow), OF=0 (signed valid)"
  },
  {
    question: "How do x86 conditional jump instructions differ for signed versus unsigned comparisons?",
    shortAnswer: "Unsigned jumps check CF and ZF (e.g. JA = Jump if Above, JB = Jump if Below); Signed jumps check SF, OF, and ZF (e.g. JG = Jump if Greater, JL = Jump if Less).",
    explanation: "After a `CMP` instruction (which computes A - B and sets flags), unsigned branches test whether Carry=0 and Zero=0. Signed branches evaluate the condition `SF == OF` to account for potential signed overflow.",
    hint: "Above/Below are unsigned; Greater/Less are signed.",
    level: "expert",
    codeExample: "CMP EAX, EBX\nJA unsigned_target  // CF=0 and ZF=0\nJG signed_target    // ZF=0 and SF=OF"
  },
  {
    question: "What is the formula for the weight of the MSB in an n-bit signed 2's complement number?",
    shortAnswer: "-2^(n-1).",
    explanation: "In 2's complement, the MSB (bit n-1) is the only bit with a negative positional weight, specifically -2^(n-1). All lower bits (b0 to bn-2) carry standard positive weights (+2^i).",
    hint: "For 8-bit, bit 7 has weight -2^7 = -128.",
    level: "expert",
    codeExample: "V = (-b_{n-1} * 2^{n-1}) + sum_{i=0}^{n-2} (b_i * 2^i)"
  },
  {
    question: "Why did early computing systems (e.g. CDC 6600) explore 1's complement or Sign-Magnitude, and why did the industry standardize on 2's complement?",
    shortAnswer: "Sign-magnitude and 1's complement have two representations of zero (+0 and -0) and require complex end-around carry logic, whereas 2's complement has a unique zero and allows subtraction using regular addition circuits.",
    explanation: "Having two zeros complicates equality checks (`x == 0`). Moreover, 2's complement allows the exact same binary adder circuit to perform both addition and subtraction without sign detection, radically simplifying CPU silicon design.",
    hint: "Dual zeros require double the hardware logic for zero detection.",
    level: "expert",
    codeExample: "1's complement: +0 = 0000, -0 = 1111 (Dual zero bug)\n2's complement: Only 0000 = 0"
  },
  {
    question: "What is an arithmetic right shift (SAR) versus a logical right shift (SHR)?",
    shortAnswer: "SAR preserves the sign bit by replicating the MSB into shifted positions (signed division by 2); SHR always shifts in zeros (unsigned division by 2).",
    explanation: "Logical shift right (SHR) inserts 0s into the MSB, which correctly divides unsigned numbers by 2. Arithmetic shift right (SAR) copies the existing MSB into vacated positions to preserve negative signs in 2's complement.",
    hint: "SAR replicates the sign bit to preserve negative values.",
    level: "expert",
    codeExample: "-4 (11111100) >> 1 (SAR) = 11111110 (-2)\n-4 (11111100) >> 1 (SHR) = 01111110 (+126)"
  },
  {
    question: "In C99 and later standards, why is signed integer overflow considered 'Undefined Behavior' (UB) while unsigned integer overflow is defined as modulo 2^n wrap-around?",
    shortAnswer: "To allow optimizing compilers to assume signed integers never overflow, enabling aggressive loop optimizations and vectorization, while guaranteeing predictable modulo arithmetic for unsigned types.",
    explanation: "If signed overflow were defined to wrap around, compilers could not optimize `x + 1 > x` to `true`. By declaring signed overflow undefined, CPU architectures with different trap mechanisms or saturation modes can remain standards-compliant.",
    hint: "UB gives compilers freedom to perform algebraic simplifications.",
    level: "expert",
    codeExample: "// In C/C++: uint32_t a = UINT32_MAX + 1; // Defined: 0\n// int32_t b = INT32_MAX + 1; // Undefined Behavior!"
  },
  {
    question: "What security exploit commonly occurs due to integer truncation when casting from a large unsigned type to a smaller signed type?",
    shortAnswer: "Integer truncation / sign-casting vulnerability, where a large memory length is interpreted as negative, bypassing bounds checks.",
    explanation: "If an input size (e.g. 0x80000005) is cast to a signed 32-bit int, it becomes negative (-2,147,483,643). If a boundary check validates `size < MAX_BUF_SIZE`, the check passes because a negative number is less than the max size, but subsequent memory copy operations interpret it as a huge unsigned length, smashing the stack.",
    hint: "Negative numbers pass `< MAX` checks unless explicitly checked for `< 0`.",
    level: "expert",
    codeExample: "int len = (int)user_len; if (len < 1024) memcpy(buf, src, len); // Exploit!"
  },
  {
    question: "How does Java handle unsigned vs signed numbers, given that Java historically lacked unsigned primitive types?",
    shortAnswer: "All Java primitive integer types (byte, short, int, long) are signed 2's complement; Java 8+ added utility methods like `Integer.toUnsignedString()` and `Integer.compareUnsigned()`.",
    explanation: "Java deliberately omitted `unsigned` keywords to simplify language semantics. To treat 32-bit integers as unsigned, Java 8 introduced static helper methods in the `Integer` and `Long` wrapper classes that interpret the underlying bits without signed extension.",
    hint: "Java byte is signed [-128, 127], unlike C/C++ uint8_t.",
    level: "expert",
    codeExample: "int result = Integer.compareUnsigned(0xFFFFFFFF, 1); // 0xFFFFFFFF > 1"
  },
  {
    question: "Convert the 4-bit unsigned number `1101` and 4-bit signed 2's complement number `1101` to decimal.",
    shortAnswer: "Unsigned = 13, Signed 2's Complement = -3.",
    explanation: "Unsigned: 8 + 4 + 0 + 1 = 13. Signed 2's complement: MSB is -8, so -8 + 4 + 0 + 1 = -3. Alternatively, 2's complement of 1101 is 0010 + 1 = 0011 (3), so original is -3.",
    hint: "-8 + 4 + 1 = -3.",
    level: "expert",
    codeExample: "1101_2 = 13 (Unsigned) | -3 (Signed 2's Complement)"
  },
  {
    question: "Summarize the golden rules for choosing between signed and unsigned types in professional embedded software engineering.",
    shortAnswer: "Use unsigned for bit flags, hardware registers, memory addresses, crypto hashes, and sizes; use signed for physical measurements, coordinates, differentials, and return codes with negative error statuses.",
    explanation: "Unsigned guarantees defined modulo wrap-around and bitwise consistency, making it ideal for hardware registers and indexing. Signed types avoid subtle subtraction underflow bugs in math loops and naturally support sentinel error codes (e.g. -1 for error).",
    hint: "Hardware bits = unsigned; Math & temperatures = signed.",
    level: "expert",
    codeExample: "uint32_t reg = READ_GPIO();\nint32_t status = read_temp_sensor(&celsius);"
  }
];

export default questions;
