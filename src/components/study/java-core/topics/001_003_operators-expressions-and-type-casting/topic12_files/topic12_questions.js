/**
 * Module 001_003: Topic 12: Shift operators: Left Shift (<<), Signed Right Shift (>>), Unsigned Right Shift (>>>)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 3 Shift Operators in Java?",
    shortAnswer: "Left Shift (`<<`), Signed Right Shift (`>>`), and Unsigned Right Shift (`>>>`).",
    explanation: "Shift operators shift the binary bit representation of integral values to the left or right by a specified number of bit positions.",
    hint: "<<, >>, >>>",
    level: "basic",
    codeExample: "int left = a << 2;\nint signedR = a >> 2;\nint unsignedR = a >>> 2;"
  },
  {
    question: "What mathematical operation does Left Shift (`a << s`) perform on positive numbers?",
    shortAnswer: "Multiplication by $2^s$ (`a * 2^s`).",
    explanation: "Shifting left by 1 multiplies by 2; shifting left by 2 multiplies by 4; shifting left by 3 multiplies by 8.",
    hint: "a << s = a * 2^s.",
    level: "basic",
    codeExample: "int val = 5 << 2; // 5 * 2^2 = 5 * 4 = 20"
  },
  {
    question: "What bits fill the vacated lowest positions during a Left Shift (`<<`)?",
    shortAnswer: "Zeroes (`0`).",
    explanation: "Vacated least significant bits on the right are always filled with `0`.",
    hint: "Always fills vacated right bits with 0.",
    level: "basic",
    codeExample: "int n = 0b00000101 << 1; // 0b00001010"
  },
  {
    question: "What is Signed Right Shift (`>>`) and how does it preserve the sign bit?",
    shortAnswer: "It shifts bits right and performs Sign Extension: fills vacated highest bits with `0` if the number was positive, or `1` if the number was negative.",
    explanation: "Preserves the two's complement sign bit (MSB), keeping negative numbers negative.",
    hint: "Preserves sign bit via sign extension.",
    level: "basic",
    codeExample: "int pos = 20 >> 2;  // +5 (fills with 0s)\nint neg = -20 >> 2; // -5 (fills with 1s)"
  },
  {
    question: "What is Unsigned Right Shift (`>>>`) and how does it differ from Signed Right Shift (`>>`)?",
    shortAnswer: "`>>>` always fills vacated highest bit positions with `0` (Zero Extension), turning negative numbers into large positive numbers.",
    explanation: "Unlike `>>` which replicates the sign bit, `>>>` treats the operand as a pure unsigned sequence of bits.",
    hint: ">>> always fills vacated bits with 0.",
    level: "basic",
    codeExample: "int neg = -1;\nint unsigned = neg >>> 1; // 2147483647 (Integer.MAX_VALUE)"
  },
  {
    question: "What is the result of `-1 >> 1` vs `-1 >>> 1` in Java?",
    shortAnswer: "`-1 >> 1` is `-1`; `-1 >>> 1` is `2147483647` (`Integer.MAX_VALUE` / `0x7FFFFFFF`).",
    explanation: "`-1` is 32 ones (`0xFFFFFFFF`). Signed shift keeps 32 ones (`-1`). Unsigned shift places a `0` in the MSB, yielding `01111111 11111111 11111111 11111111`.",
    hint: "-1 >> 1 is -1; -1 >>> 1 is 2147483647.",
    level: "intermediate",
    codeExample: "System.out.println(-1 >> 1);  // -1\nSystem.out.println(-1 >>> 1); // 2147483647"
  },
  {
    question: "What is the Shift Distance Masking Rule for 32-bit `int` in Java (JLS §15.19)?",
    shortAnswer: "Only the lowest 5 bits of the shift distance are used (`distance & 0x1F` or `distance % 32`).",
    explanation: "Shifting an `int` by 32 is equivalent to shifting by 0 (`32 % 32 = 0`), and shifting by 33 is equivalent to shifting by 1 (`33 % 32 = 1`).",
    hint: "Shift distance is masked to 0..31 (distance & 0x1F).",
    level: "advanced",
    codeExample: "int a = 8 << 32; // 8 << 0 = 8 (Unchanged!)\nint b = 8 << 33; // 8 << 1 = 16"
  },
  {
    question: "What is the Shift Distance Masking Rule for 64-bit `long` in Java?",
    shortAnswer: "Only the lowest 6 bits of the shift distance are used (`distance & 0x3F` or `distance % 64`).",
    explanation: "Shifting a `long` by 64 is equivalent to shifting by 0.",
    hint: "Shift distance is masked to 0..63 (distance & 0x3F).",
    level: "advanced",
    codeExample: "long val = 10L << 64; // 10L << 0 = 10L"
  },
  {
    question: "Can shift operators be applied to `float` or `double` operands?",
    shortAnswer: "No, shift operators only apply to integral primitive types (`byte`, `short`, `char`, `int`, `long`).",
    explanation: "Attempting to shift floating-point numbers causes a compile-time error.",
    hint: "Integral types only.",
    level: "basic",
    codeExample: "// double bad = 5.5 << 2; // COMPILATION ERROR"
  },
  {
    question: "What happens when you apply shift operators to a `byte` or `short` variable?",
    shortAnswer: "Java promotes the narrow type to 32-bit `int` (Unary Numeric Promotion) before shifting.",
    explanation: "Applying `byte b = -1; b >>> 1` widens `b` to `int -1` first, yielding `2147483647` (an `int`), NOT `127`!",
    hint: "Promoted to 32-bit int before shift.",
    level: "intermediate",
    codeExample: "byte b = -1;\nint res = b >>> 1; // 2147483647 (Promoted to 32-bit int first!)"
  },
  {
    question: "How do you pack 4 individual 8-bit ARGB color channels (Alpha, Red, Green, Blue) into a single 32-bit `int` using shifts?",
    shortAnswer: "`int argb = (alpha << 24) | (red << 16) | (green << 8) | blue;`",
    explanation: "Shifting moves each 8-bit byte to its designated channel position, and Bitwise OR combines them into one 32-bit integer.",
    hint: "(a << 24) | (r << 16) | (g << 8) | b.",
    level: "intermediate",
    codeExample: "int color = (255 << 24) | (180 << 16) | (80 << 8) | 220;"
  },
  {
    question: "How do you extract (unpack) the Red component from a 32-bit ARGB packed integer?",
    shortAnswer: "`int red = (argb >> 16) & 0xFF;`",
    explanation: "Shifting right by 16 brings the red byte to the lowest 8 bits, and `& 0xFF` masks away the remaining bits.",
    hint: "(argb >> 16) & 0xFF extracts the red byte.",
    level: "intermediate",
    codeExample: "int red = (color >> 16) & 0xFF;"
  },
  {
    question: "How do you calculate mid-point `(low + high) / 2` without integer overflow in Binary Search using unsigned shift?",
    shortAnswer: "`int mid = (low + high) >>> 1;`",
    explanation: "If `low + high` overflows into negative numbers (exceeding `2,147,483,647`), `>>> 1` treats the sign bit as $2^{31}$, correctly computing the positive midpoint!",
    hint: "Famous Joshua Bloch binary search fix: (low + high) >>> 1.",
    level: "expert",
    codeExample: "int mid = (low + high) >>> 1; // Immune to 32-bit integer overflow!"
  },
  {
    question: "What is the mathematical difference between integer division `/ 2` and signed right shift `>> 1` for negative numbers?",
    shortAnswer: "`/ 2` truncates towards zero (`-5 / 2 = -2`); `>> 1` performs floor division towards negative infinity (`-5 >> 1 = -3`).",
    explanation: "For positive numbers, `/ 2` and `>> 1` produce identical results; for odd negative numbers, `>> 1` rounds down.",
    hint: "/ 2 truncates to zero; >> 1 floors to negative infinity.",
    level: "advanced",
    codeExample: "int div = -5 / 2;  // -2\nint shift = -5 >> 1; // -3"
  },
  {
    question: "What is the result of `1 << 31` in Java?",
    shortAnswer: "`Integer.MIN_VALUE` (`-2147483648` / `0x80000000`).",
    explanation: "Shifting `1` left by 31 places a `1` in the sign bit position, which represents the most negative 32-bit integer.",
    hint: "1 << 31 is Integer.MIN_VALUE.",
    level: "intermediate",
    codeExample: "int min = 1 << 31; // -2147483648"
  },
  {
    question: "What is the result of `(1 << 31) - 1` in Java?",
    shortAnswer: "`Integer.MAX_VALUE` (`2147483647` / `0x7FFFFFFF`).",
    explanation: "Subtracting 1 from `0x80000000` flips the bits to `0x7FFFFFFF`.",
    hint: "Evaluates to Integer.MAX_VALUE.",
    level: "intermediate",
    codeExample: "int max = (1 << 31) - 1; // 2147483647"
  },
  {
    question: "What is the result of `1L << 63` in Java?",
    shortAnswer: "`Long.MIN_VALUE` (`-9223372036854775808L`).",
    explanation: "Places a `1` in the 64-bit sign bit.",
    hint: "Long.MIN_VALUE.",
    level: "intermediate",
    codeExample: "long min = 1L << 63; // Long.MIN_VALUE"
  },
  {
    question: "What is the precedence of Shift Operators relative to Relational and Arithmetic operators?",
    shortAnswer: "Arithmetic (`+`, `-`) > Shift (`<<`, `>>`, `>>>`) > Relational (`<`, `>`, `==`).",
    explanation: "Addition and multiplication bind before shift operators, and shift operators bind before comparison operators.",
    hint: "Arithmetic > Shift > Relational.",
    level: "advanced",
    codeExample: "int val = 1 + 2 << 2; // (1 + 2) << 2 = 3 << 2 = 12"
  },
  {
    question: "What is the result of `100 >> 3` in Java?",
    shortAnswer: "`12`.",
    explanation: "`100 / 2^3 = 100 / 8 = 12.5`, floored to `12`.",
    hint: "100 / 8 = 12.",
    level: "basic",
    codeExample: "int res = 100 >> 3; // 12"
  },
  {
    question: "What is the result of `100 << 3` in Java?",
    shortAnswer: "`800`.",
    explanation: "`100 * 2^3 = 100 * 8 = 800`.",
    hint: "100 * 8 = 800.",
    level: "basic",
    codeExample: "int res = 100 << 3; // 800"
  },
  {
    question: "Can shift distance be negative in Java (e.g. `x << -1`)?",
    shortAnswer: "Yes, but it does NOT shift in the opposite direction! The negative distance is masked with `0x1F` (so `-1 & 0x1F = 31`, meaning `x << -1` shifts by 31 positions!).",
    explanation: "Shift distance masking converts `-1` to `31` for `int`.",
    hint: "Negative distances are masked to positive: -1 becomes 31.",
    level: "expert",
    codeExample: "int a = 1 << -1; // Equivalent to 1 << 31 = -2147483648"
  },
  {
    question: "How do you test if the N-th bit of an integer `x` is set using shift operators?",
    shortAnswer: "`boolean isSet = ((x >> N) & 1) != 0;` or `((x & (1 << N)) != 0);`.",
    explanation: "Shifting `1 << N` creates a mask for the N-th bit.",
    hint: "(x & (1 << N)) != 0 tests the N-th bit.",
    level: "intermediate",
    codeExample: "boolean hasBit3 = (flags & (1 << 3)) != 0;"
  },
  {
    question: "How do you SET the N-th bit of an integer `x` using shift operators?",
    shortAnswer: "`x = x | (1 << N);` (or `x |= (1 << N);`).",
    explanation: "Shifts 1 to the N-th position and applies bitwise OR.",
    hint: "x |= (1 << N) sets the N-th bit.",
    level: "intermediate",
    codeExample: "flags |= (1 << 4);"
  },
  {
    question: "How do you CLEAR the N-th bit of an integer `x` using shift operators?",
    shortAnswer: "`x = x & ~(1 << N);` (or `x &= ~(1 << N);`).",
    explanation: "Inverts `1 << N` and applies bitwise AND.",
    hint: "x &= ~(1 << N) clears the N-th bit.",
    level: "intermediate",
    codeExample: "flags &= ~(1 << 4);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student packet encoder, how are Roll and Fee packed into a single integer?",
    shortAnswer: "`int packet = (rollNumber << 16) | (feeAmount & 0xFFFF);`",
    explanation: "Puts the 16-bit roll number in the upper half and the 16-bit fee in the lower half.",
    hint: "Upper 16 bits for roll, lower 16 bits for fee.",
    level: "basic",
    codeExample: "int packet = (roll << 16) | (fee & 0xFFFF);"
  },
  {
    question: "What is the compound assignment operator for Left Shift?",
    shortAnswer: "`<<=` (e.g. `x <<= 2;`).",
    explanation: "Shifts `x` left by 2 and assigns the result back to `x`.",
    hint: "<<= compound assignment.",
    level: "basic",
    codeExample: "int x = 5;\nx <<= 2; // x is now 20"
  },
  {
    question: "What is the compound assignment operator for Unsigned Right Shift?",
    shortAnswer: "`>>>=` (e.g. `x >>>= 2;`).",
    explanation: "Unsigned right shifts `x` and assigns the result back.",
    hint: ">>>= compound assignment.",
    level: "basic",
    codeExample: "int x = -10;\nx >>>= 2;"
  },
  {
    question: "Why does `byte b = 1; b = b << 1;` fail to compile in Java?",
    shortAnswer: "Because `b << 1` promotes `b` to `int`, and assigning an `int` result to `byte` requires an explicit cast `(byte)(b << 1)`.",
    explanation: "Shift expressions always evaluate to at least 32-bit `int`.",
    hint: "Requires explicit narrowing cast.",
    level: "intermediate",
    codeExample: "byte b = 1;\n// b = b << 1; // COMPILER ERROR\nb = (byte)(b << 1); // Correct\nb <<= 1;            // Correct (Implicit cast)"
  },
  {
    question: "What is the ultimate takeaway of Topic 12 for Java developers?",
    shortAnswer: "Shift operators (<<, >>, >>>) provide high-performance binary multiplication/division by powers of 2, color channel packing/unpacking, and overflow-immune midpoint calculation.",
    explanation: "Understanding sign extension (`>>`) vs zero extension (`>>>`) and shift distance masking is essential for graphics, networking, and systems programming.",
    hint: "<< (multiply), >> (signed floor divide), >>> (unsigned zero extension).",
    level: "basic",
    codeExample: "// Summary: << (x * 2^s), >> (preserves sign), >>> (zero fills), dist & 0x1F"
  },
  {
    question: "What is the next topic (Topic 13) in Module 001_003?",
    shortAnswer: "Compound assignment operators: +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=, >>>=",
    explanation: "Topic 13 explores the 11 compound assignment operators, evaluation mechanics, and performance characteristics.",
    hint: "Compound assignment operators in Java.",
    level: "basic",
    codeExample: "// Topic 13: +=, -=, *=, /=, %=, <<=, etc."
  }
];

export default questions;
