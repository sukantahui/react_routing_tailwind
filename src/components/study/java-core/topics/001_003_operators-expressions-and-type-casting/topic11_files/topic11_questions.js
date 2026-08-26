/**
 * Module 001_003: Topic 11: Bitwise operators: Bitwise AND (&), Bitwise OR (|), Bitwise XOR (^), Bitwise Inversion (~)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 4 fundamental Bitwise Operators in Java?",
    shortAnswer: "Bitwise AND (`&`), Bitwise OR (`|`), Bitwise XOR (`^`), and Bitwise NOT/Inversion (`~`).",
    explanation: "These operators perform boolean bit-by-bit manipulation on integral primitive types (`byte`, `short`, `char`, `int`, `long`).",
    hint: "&, |, ^, ~",
    level: "basic",
    codeExample: "int and = a & b;\nint or = a | b;\nint xor = a ^ b;\nint not = ~a;"
  },
  {
    question: "How does Bitwise AND (`&`) operate on binary bits?",
    shortAnswer: "It outputs a `1` bit only if **both** corresponding input bits are `1`; otherwise it outputs `0`.",
    explanation: "`1 & 1 = 1`, `1 & 0 = 0`, `0 & 1 = 0`, `0 & 0 = 0`.",
    hint: "1 only when both bits are 1.",
    level: "basic",
    codeExample: "int res = 12 & 10; // 00001100 & 00001010 = 00001000 (8)"
  },
  {
    question: "How does Bitwise OR (`|`) operate on binary bits?",
    shortAnswer: "It outputs a `1` bit if **at least one** corresponding input bit is `1`; it outputs `0` only if both are `0`.",
    explanation: "`1 | 1 = 1`, `1 | 0 = 1`, `0 | 1 = 1`, `0 | 0 = 0`.",
    hint: "1 if either bit is 1.",
    level: "basic",
    codeExample: "int res = 12 | 10; // 00001100 | 00001010 = 00001110 (14)"
  },
  {
    question: "How does Bitwise XOR (`^`) operate on binary bits?",
    shortAnswer: "It outputs a `1` bit if and only if the two corresponding input bits are **different**; it outputs `0` if the bits are identical.",
    explanation: "`1 ^ 0 = 1`, `0 ^ 1 = 1`, `1 ^ 1 = 0`, `0 ^ 0 = 0`.",
    hint: "1 when bits differ; 0 when bits match.",
    level: "basic",
    codeExample: "int res = 12 ^ 10; // 00001100 ^ 00001010 = 00000110 (6)"
  },
  {
    question: "What is the mathematical formula for Bitwise NOT (`~x`)?",
    shortAnswer: "`~x = -(x + 1)`",
    explanation: "Bitwise NOT inverts all 32 bits (in two's complement, `x + ~x = -1`, so `~x = -(x + 1)`).",
    hint: "~x = -(x + 1).",
    level: "basic",
    codeExample: "int not = ~12; // -(12 + 1) = -13"
  },
  {
    question: "How do you SET a specific bit flag in a bitmask?",
    shortAnswer: "Use Bitwise OR: `flags = flags | MASK;` (or `flags |= MASK;`).",
    explanation: "Bitwise OR with 1 forces the target bit to 1 without altering any other bit.",
    hint: "flags |= MASK sets a bit.",
    level: "basic",
    codeExample: "flags |= PERMISSION_READ;"
  },
  {
    question: "How do you CHECK if a specific bit flag is enabled in a bitmask?",
    shortAnswer: "Use Bitwise AND: `boolean isSet = (flags & MASK) != 0;`.",
    explanation: "Bitwise AND isolates the target bit, producing non-zero if the bit is 1.",
    hint: "(flags & MASK) != 0 checks if a bit is set.",
    level: "basic",
    codeExample: "boolean canAccess = (userPermissions & PERMISSION_ADMIN) != 0;"
  },
  {
    question: "How do you TOGGLE (invert) a specific bit flag in a bitmask?",
    shortAnswer: "Use Bitwise XOR: `flags = flags ^ MASK;` (or `flags ^= MASK;`).",
    explanation: "XOR with 1 flips the target bit (0 becomes 1, 1 becomes 0) while leaving other bits unchanged.",
    hint: "flags ^= MASK toggles a bit.",
    level: "intermediate",
    codeExample: "flags ^= PERMISSION_NOTIFICATION;"
  },
  {
    question: "How do you CLEAR (turn off) a specific bit flag in a bitmask?",
    shortAnswer: "Use Bitwise AND with Bitwise NOT: `flags = flags & ~MASK;` (or `flags &= ~MASK;`).",
    explanation: "`~MASK` inverts the mask so the target bit is 0 and all others are 1, resetting only the target bit.",
    hint: "flags &= ~MASK clears a bit.",
    level: "intermediate",
    codeExample: "flags &= ~PERMISSION_ADMIN;"
  },
  {
    question: "How can two integer variables be swapped without a temporary variable using XOR?",
    shortAnswer: "`a = a ^ b; b = a ^ b; a = a ^ b;`",
    explanation: "Because `x ^ x = 0` and `x ^ 0 = x`, the three sequential XOR operations swap `a` and `b` in-place with zero extra memory.",
    hint: "a ^= b; b ^= a; a ^= b; swaps variables.",
    level: "intermediate",
    codeExample: "int a = 15, b = 25;\na = a ^ b;\nb = a ^ b;\na = a ^ b;\n// a is now 25, b is 15"
  },
  {
    question: "How does XOR solve the 'Single Non-Duplicate Number' algorithm problem in an array?",
    shortAnswer: "XOR all elements together: duplicate pairs cancel each other out to 0 (`x ^ x = 0`), leaving the single unique number.",
    explanation: "Since XOR is commutative and associative, all paired duplicates reduce to 0, and `0 ^ unique = unique`.",
    hint: "XORing all elements isolates the single unpaired number.",
    level: "intermediate",
    codeExample: "int unique = 0;\nfor (int n : arr) unique ^= n;"
  },
  {
    question: "How can you check if an integer is odd or even using bitwise operators?",
    shortAnswer: "Check the lowest bit: `(n & 1) == 0` for even, `(n & 1) != 0` for odd.",
    explanation: "Bitwise AND with 1 tests the least significant bit (LSB), which is 0 for even and 1 for odd numbers. It works perfectly for negative numbers too.",
    hint: "(n & 1) != 0 checks for odd numbers.",
    level: "basic",
    codeExample: "boolean isOdd = (n & 1) != 0;"
  },
  {
    question: "What is the result of `x ^ x` for any integer `x`?",
    shortAnswer: "`0`.",
    explanation: "Every bit XORed with itself is identical, yielding all zeroes.",
    hint: "x ^ x = 0.",
    level: "basic",
    codeExample: "int res = 42 ^ 42; // 0"
  },
  {
    question: "What is the result of `x ^ 0` for any integer `x`?",
    shortAnswer: "`x`.",
    explanation: "XORing with 0 preserves the original bit values.",
    hint: "x ^ 0 = x.",
    level: "basic",
    codeExample: "int res = 42 ^ 0; // 42"
  },
  {
    question: "What is the result of `x & ~x` for any integer `x`?",
    shortAnswer: "`0`.",
    explanation: "Since `~x` has opposite bits of `x`, no bit position has 1 in both operands.",
    hint: "x & ~x = 0.",
    level: "basic",
    codeExample: "int res = 42 & ~42; // 0"
  },
  {
    question: "What is the result of `x | ~x` for any 32-bit integer `x`?",
    shortAnswer: "`-1` (`0xFFFFFFFF` in binary).",
    explanation: "Every bit position has a 1 in either `x` or `~x`, yielding all 32 ones which is `-1` in two's complement.",
    hint: "x | ~x = -1 (all 1s).",
    level: "intermediate",
    codeExample: "int res = 42 | ~42; // -1"
  },
  {
    question: "What is the result of applying bitwise operators to `byte` or `short` variables?",
    shortAnswer: "Java promotes both operands to 32-bit `int` before performing bitwise operations.",
    explanation: "Writing `byte b1 = 1, b2 = 2; byte b3 = b1 & b2;` fails to compile without `(byte)` cast.",
    hint: "Promoted to 32-bit int.",
    level: "intermediate",
    codeExample: "byte b1 = 1, b2 = 2;\nbyte b3 = (byte)(b1 & b2); // Explicit cast required"
  },
  {
    question: "Can bitwise operators (`&`, `|`, `^`, `~`) be applied to `float` or `double` operands?",
    shortAnswer: "No! Bitwise operators only apply to integral primitive types (`byte`, `short`, `char`, `int`, `long`).",
    explanation: "Applying bitwise operators to floating-point numbers results in a compile-time error.",
    hint: "Integral types only.",
    level: "basic",
    codeExample: "// double bad = 5.5 & 2.2; // COMPILATION ERROR"
  },
  {
    question: "How can you check if a positive integer is a Power of Two using bitwise operations?",
    shortAnswer: "`boolean isPowerOfTwo = (n > 0) && ((n & (n - 1)) == 0);`",
    explanation: "A power of two has exactly one `1` bit (e.g. 8 is `1000`). Subtracting 1 yields `0111`. Bitwise AND produces `0`.",
    hint: "(n & (n - 1)) == 0 checks power of 2.",
    level: "advanced",
    codeExample: "boolean isPower = (n > 0) && ((n & (n - 1)) == 0);"
  },
  {
    question: "What does `n & (n - 1)` do to any binary number?",
    shortAnswer: "It clears the lowest (least significant) set bit (`1`) of `n`.",
    explanation: "Brian Kernighan's algorithm uses this trick to count the number of set bits (popcount) in $O(K)$ time where $K$ is number of 1s.",
    hint: "Clears the lowest set bit.",
    level: "expert",
    codeExample: "int count = 0;\nwhile (n > 0) { n &= (n - 1); count++; }"
  },
  {
    question: "What built-in method in Java counts the number of 1 bits in an integer?",
    shortAnswer: "`Integer.bitCount(int i)` (or `Long.bitCount(long i)`).",
    explanation: "Uses hardware POPCNT CPU instructions for maximum performance.",
    hint: "Integer.bitCount(i).",
    level: "basic",
    codeExample: "int setBits = Integer.bitCount(0b00001101); // 3"
  },
  {
    question: "How is the bitwise mask `& 0xFF` used when reading raw bytes from a stream?",
    shortAnswer: "To convert a signed `byte` (-128 to 127) into an unsigned integer (0 to 255).",
    explanation: "Masking with `0xFF` clears sign extension bits during int widening.",
    hint: "b & 0xFF converts signed byte to unsigned int.",
    level: "intermediate",
    codeExample: "byte b = (byte) 0xFF; // -1\nint unsignedVal = b & 0xFF; // 255"
  },
  {
    question: "What is the precedence of Bitwise operators relative to Relational and Logical operators?",
    shortAnswer: "Relational (`<`, `==`) > Bitwise AND (`&`) > Bitwise XOR (`^`) > Bitwise OR (`|`) > Logical AND (`&&`) > Logical OR (`||`).",
    explanation: "Bitwise operators sit between relational comparison and logical conditional operators.",
    hint: "Relational > & > ^ > | > && > ||.",
    level: "advanced",
    codeExample: "boolean b = (x & MASK) != 0; // Parentheses needed because != precedes &"
  },
  {
    question: "Why are parentheses MANDATORY in `if ((flags & MASK) != 0)`?",
    shortAnswer: "Because relational operators (`!=`, `==`) have higher precedence than bitwise AND (`&`).",
    explanation: "Without parentheses, `flags & MASK != 0` evaluates as `flags & (MASK != 0)`, which fails to compile because `MASK != 0` is boolean and cannot be ANDed with int!",
    hint: "!= has higher precedence than &.",
    level: "intermediate",
    codeExample: "if ((flags & MASK) != 0) { /* Correct */ }\n// if (flags & MASK != 0) // COMPILATION ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student portal, how are permissions assigned efficiently?",
    shortAnswer: "Using powers-of-two bit flags (`1`, `2`, `4`, `8`...) packed into a single `int` mask.",
    explanation: "Storing multiple boolean permissions in a single integer saves database memory and allows instant bitwise validation.",
    hint: "Packed bitmask with powers of 2.",
    level: "basic",
    codeExample: "int perms = VIEW | LAB | PDF;"
  },
  {
    question: "What is the result of `~0` in 32-bit Java?",
    shortAnswer: "`-1` (`0xFFFFFFFF`).",
    explanation: "Inverting 32 zeroes yields 32 ones, which is `-1` in two's complement.",
    hint: "~0 = -1.",
    level: "basic",
    codeExample: "int notZero = ~0; // -1"
  },
  {
    question: "What is the result of `15 & 7` in Java?",
    shortAnswer: "`7`.",
    explanation: "`15` is `0b1111` and `7` is `0b0111`. `0b1111 & 0b0111 = 0b0111` (7).",
    hint: "1111 & 0111 = 0111.",
    level: "basic",
    codeExample: "int res = 15 & 7; // 7"
  },
  {
    question: "What is the result of `8 | 4 | 2 | 1` in Java?",
    shortAnswer: "`15` (`0b1111`).",
    explanation: "OR combines all power-of-two bits into a single composite binary mask.",
    hint: "8 + 4 + 2 + 1 = 15.",
    level: "basic",
    codeExample: "int mask = 8 | 4 | 2 | 1; // 15"
  },
  {
    question: "What is the ultimate takeaway of Topic 11 for Java developers?",
    shortAnswer: "Bitwise operators (&, |, ^, ~) enable high-performance bitmask flag management, hardware I/O, cryptography, and in-place algorithms at the silicon bit level.",
    explanation: "Mastering bitwise operators provides the foundational toolkit for high-performance systems engineering, compression, and security architectures.",
    hint: "Set (|), Check (&), Toggle (^), Clear (& ~).",
    level: "basic",
    codeExample: "// Summary: Set with |, Check with &, Toggle with ^, Clear with & ~"
  },
  {
    question: "What is the next topic (Topic 12) in Module 001_003?",
    shortAnswer: "Shift operators: Left Shift (<<), Signed Right Shift (>>), Unsigned Right Shift (>>>).",
    explanation: "Topic 12 explores binary shift operations, multiplication/division powers of two, sign bit preservation, and unsigned zero extension.",
    hint: "Shift operators in Java.",
    level: "basic",
    codeExample: "// Topic 12: <<, >>, >>>"
  }
];

export default questions;
