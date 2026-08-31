/**
 * Module 001_003: Topic 20: Narrowing / Explicit Casting (larger type to smaller type with potential overflow/truncation)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Narrowing / Explicit Casting in Java (JLS §5.1.3)?",
    shortAnswer: "The manual conversion of a larger (wider) data type to a smaller (narrower) data type using the cast operator `(type)`.",
    explanation: "Explicit casting is required because narrowing may result in loss of magnitude, high-order bit truncation, or fractional precision loss.",
    hint: "Manual conversion to smaller data type via (type) cast syntax.",
    level: "basic",
    codeExample: "int i = 100;\nbyte b = (byte) i; // Explicit narrowing cast"
  },
  {
    question: "How many specific Narrowing Primitive Conversions are defined in JLS §5.1.3?",
    shortAnswer: "22 specific narrowing conversions.",
    explanation: "Covers conversions from short, char, int, long, float, and double to narrower primitive types.",
    hint: "22 standard narrowing conversions in JLS.",
    level: "advanced",
    codeExample: "// 22 pathways defined in JLS §5.1.3"
  },
  {
    question: "What happens when an `int` value of `130` is explicitly cast to a `byte` (`(byte)130`)?",
    shortAnswer: "It evaluates to `-126`.",
    explanation: "130 in binary is `0x00000082`. Discarding the upper 24 bits leaves `0x82` (`10000010` in binary), which in signed 8-bit two's complement represents `-126`.",
    hint: "130 wraps around to -126 in 8-bit signed byte.",
    level: "basic",
    codeExample: "byte b = (byte) 130; // -126"
  },
  {
    question: "What happens when an `int` value of `257` is cast to a `byte` (`(byte)257`)?",
    shortAnswer: "It evaluates to `1`.",
    explanation: "257 is `256 + 1` (`0x00000101`). Truncating to the lowest 8 bits leaves `0x01` (`1`).",
    hint: "257 % 256 = 1.",
    level: "basic",
    codeExample: "byte b = (byte) 257; // 1"
  },
  {
    question: "What happens when `double 99.99` is cast to an `int` (`(int)99.99`)?",
    shortAnswer: "It evaluates to `99` (fractional decimal is truncated towards zero, NOT rounded!).",
    explanation: "Floating-point to integer casting performs truncation towards zero, dropping all digits after the decimal point.",
    hint: "Truncates decimals towards zero: 99.99 → 99.",
    level: "basic",
    codeExample: "int price = (int) 99.99; // 99"
  },
  {
    question: "What happens when `double -99.99` is cast to an `int` (`(int)-99.99`)?",
    shortAnswer: "It evaluates to `-99`.",
    explanation: "Truncation towards zero for negative numbers removes the decimal fraction without rounding to -100.",
    hint: "Truncates towards zero: -99.99 → -99.",
    level: "basic",
    codeExample: "int negPrice = (int) -99.99; // -99"
  },
  {
    question: "What is the result of casting `Double.NaN` to an `int` (`(int)Double.NaN`)?",
    shortAnswer: "`0`.",
    explanation: "JLS §5.1.3 mandates that casting NaN to any integer type produces `0`.",
    hint: "NaN becomes 0.",
    level: "intermediate",
    codeExample: "int x = (int) Double.NaN; // 0"
  },
  {
    question: "What is the result of casting `Double.POSITIVE_INFINITY` to an `int`?",
    shortAnswer: "`Integer.MAX_VALUE` (`2147483647`).",
    explanation: "Positive infinity is clamped to the maximum representable integer.",
    hint: "Clamped to Integer.MAX_VALUE.",
    level: "intermediate",
    codeExample: "int x = (int) Double.POSITIVE_INFINITY; // 2147483647"
  },
  {
    question: "What is the result of casting `Double.NEGATIVE_INFINITY` to an `int`?",
    shortAnswer: "`Integer.MIN_VALUE` (`-2147483648`).",
    explanation: "Negative infinity is clamped to the minimum representable integer.",
    hint: "Clamped to Integer.MIN_VALUE.",
    level: "intermediate",
    codeExample: "int x = (int) Double.NEGATIVE_INFINITY; // -2147483648"
  },
  {
    question: "Does Narrowing Primitive Casting ever throw a runtime exception in Java?",
    shortAnswer: "No! Narrowing primitive conversions NEVER throw runtime exceptions (unlike object downcasting which may throw `ClassCastException`).",
    explanation: "Primitive casting executes silently with bit truncation and wrap-around.",
    hint: "Never throws runtime exceptions on primitives.",
    level: "basic",
    codeExample: "int x = (int) 1e20; // Silently clamps to Integer.MAX_VALUE without exception"
  },
  {
    question: "What is the general formula for calculating byte wrap-around when casting positive int `N` to `byte`?",
    shortAnswer: "Take `rem = N % 256`. If `rem > 127`, the result is `rem - 256`; otherwise it is `rem`.",
    explanation: "Computes the two's complement interpretation of the lowest 8 bits.",
    hint: "Modulo 256 with two's complement sign adjustment.",
    level: "advanced",
    codeExample: "int n = 1000;\n// 1000 % 256 = 232 → 232 - 256 = -24\nbyte b = (byte) n; // -24"
  },
  {
    question: "How do you round a `double` to the nearest integer instead of truncating?",
    shortAnswer: "Use `Math.round(double d)` (which returns a `long`), or `(int) Math.round(d)`.",
    explanation: "`Math.round(99.99)` returns `100L`.",
    hint: "Math.round(d) rounds to nearest integer.",
    level: "basic",
    codeExample: "int rounded = (int) Math.round(99.99); // 100"
  },
  {
    question: "What happens when casting `long` to `int` (`(int)3000000000L`)?",
    shortAnswer: "Discards the upper 32 bits, resulting in `-1294967296`.",
    explanation: "3,000,000,000 exceeds `Integer.MAX_VALUE` (`2,147,483,647`), causing 32-bit two's complement overflow.",
    hint: "Upper 32 bits discarded, wrapping to negative.",
    level: "intermediate",
    codeExample: "int i = (int) 3000000000L; // -1294967296"
  },
  {
    question: "What happens when casting a negative `int` (e.g. `-1`) to `char` (`(char)-1`)?",
    shortAnswer: "Evaluates to `65535` (`'\\uFFFF'`).",
    explanation: "`-1` in 32-bit binary is `0xFFFFFFFF`. Narrowing to 16-bit char retains `0xFFFF` (`65535`).",
    hint: "-1 becomes 65535 in unsigned char.",
    level: "intermediate",
    codeExample: "char c = (char) -1; // Unicode 65535"
  },
  {
    question: "What is the result of `(short)(char) -1`?",
    shortAnswer: "`-1`.",
    explanation: "`-1` cast to `char` is `0xFFFF` (65535). `0xFFFF` cast to signed `short` is interpreted as `-1`.",
    hint: "Two's complement bit pattern 0xFFFF maps back to -1 in short.",
    level: "expert",
    codeExample: "short s = (short)(char) -1; // -1"
  },
  {
    question: "What bytecode instruction is generated for `int` to `byte` narrowing?",
    shortAnswer: "`i2b` (int to byte).",
    explanation: "Hardware instruction that truncates 32-bit integer register to 8-bit sign-extended integer.",
    hint: "i2b bytecode instruction.",
    level: "expert",
    codeExample: "// Bytecode: iload, i2b, istore"
  },
  {
    question: "What bytecode instruction is generated for `int` to `short` narrowing?",
    shortAnswer: "`i2s` (int to short).",
    explanation: "Truncates 32-bit register to 16 bits with sign extension.",
    hint: "i2s bytecode instruction.",
    level: "expert",
    codeExample: "// Bytecode: iload, i2s, istore"
  },
  {
    question: "What bytecode instruction is generated for `int` to `char` narrowing?",
    shortAnswer: "`i2c` (int to char).",
    explanation: "Truncates 32-bit register to 16 bits with zero extension.",
    hint: "i2c bytecode instruction.",
    level: "expert",
    codeExample: "// Bytecode: iload, i2c, istore"
  },
  {
    question: "What bytecode instruction is generated for `double` to `int` narrowing?",
    shortAnswer: "`d2i` (double to int).",
    explanation: "Truncates 64-bit IEEE 754 float register to 32-bit integer with clamping on NaN/Infinity.",
    hint: "d2i bytecode instruction.",
    level: "expert",
    codeExample: "// Bytecode: dload, d2i, istore"
  },
  {
    question: "How can you validate that a `long` value safely fits in an `int` before narrowing in Java 8+?",
    shortAnswer: "Use `Math.toIntExact(long value)` (throws `ArithmeticException` on overflow).",
    explanation: "Defensive alternative to manual range validation.",
    hint: "Math.toIntExact(l) throws ArithmeticException on overflow.",
    level: "intermediate",
    codeExample: "int safeInt = Math.toIntExact(longVal);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore voucher encoder, how is defensive narrowing implemented?",
    shortAnswer: "By verifying `if (amount >= Short.MIN_VALUE && amount <= Short.MAX_VALUE)` before casting `(short)amount`.",
    explanation: "Prevents corrupting fee receipts in Indian Rupees (₹).",
    hint: "Range checking before casting.",
    level: "basic",
    codeExample: "if (fee <= Short.MAX_VALUE) { short s = (short) fee; }"
  },
  {
    question: "What happens when casting `float` to `byte` (`(byte)1234.56f`)?",
    shortAnswer: "First truncates `float` to `int 1234`, then truncates `int 1234` to `byte -46` (`1234 % 256 = 210 → 210 - 256 = -46`).",
    explanation: "Two-stage narrowing: float to int, then int to byte.",
    hint: "Two-stage conversion: float → int → byte.",
    level: "advanced",
    codeExample: "byte b = (byte) 1234.56f; // -46"
  },
  {
    question: "What is the result of `(char) 65` in Java?",
    shortAnswer: "`'A'`.",
    explanation: "65 is the ASCII / Unicode code point for capital letter 'A'.",
    hint: "Unicode code point 65 is 'A'.",
    level: "basic",
    codeExample: "char c = (char) 65; // 'A'"
  },
  {
    question: "What is the result of `(char) 97` in Java?",
    shortAnswer: "`'a'`.",
    explanation: "97 is the ASCII code point for lowercase 'a'.",
    hint: "Unicode code point 97 is 'a'.",
    level: "basic",
    codeExample: "char c = (char) 97; // 'a'"
  },
  {
    question: "Why does `char` need an explicit cast when converting from `short` even though both are 16-bit?",
    shortAnswer: "Because `short` is signed (-32768 to 32767) while `char` is unsigned (0 to 65535), so neither range is a subset of the other.",
    explanation: "Converting between signed and unsigned 16-bit integers requires explicit intent.",
    hint: "Signed short vs unsigned char ranges overlap partially.",
    level: "intermediate",
    codeExample: "short s = 65;\nchar c = (char) s; // Explicit cast mandatory"
  },
  {
    question: "What is the result of `(int) (char) (byte) -1` in Java?",
    shortAnswer: "`65535`.",
    explanation: "`byte -1` is `0xFF`. `(char)` zero-extends to `0x00FF` (255) ... wait! `(byte)-1` widens to `int -1` (`0xFFFFFFFF`), which cast to `char` becomes `0xFFFF` (`65535`), which widens to `int 65535`!",
    hint: "Famous Java puzzler resulting in 65535.",
    level: "expert",
    codeExample: "int res = (int) (char) (byte) -1; // 65535"
  },
  {
    question: "Can an `Object` reference holding a `String` be narrowed to an `int` using primitive cast `(int) obj`?",
    shortAnswer: "No! Primitive casting cannot cross from reference types to primitive types (causes compile error).",
    explanation: "Reference casting is separate from primitive casting.",
    hint: "Cannot cast reference types directly to primitives.",
    level: "basic",
    codeExample: "Object obj = \"123\";\n// int x = (int) obj; // COMPILATION ERROR"
  },
  {
    question: "What is the result of `(byte) (127 + 1)` in Java?",
    shortAnswer: "`-128` (`Byte.MIN_VALUE`).",
    explanation: "Standard two's complement byte overflow.",
    hint: "Wraps to -128.",
    level: "basic",
    codeExample: "byte b = (byte)(127 + 1); // -128"
  },
  {
    question: "What is the ultimate takeaway of Topic 20 for Java developers?",
    shortAnswer: "Narrowing casting `(type)` explicitly forces data conversion from larger to smaller types, but silently discards high-order bits, wraps signs, and drops decimal fractions; always apply defensive boundary checks before casting.",
    explanation: "Mastering narrowing conversions prevents silent data corruption across numeric pipelines.",
    hint: "Explicit (type) cast, but beware of silent bit discard and truncation.",
    level: "basic",
    codeExample: "// Summary: (type) discards upper bits, truncates floats towards zero, use Math.toIntExact()"
  },
  {
    question: "What is the final topic (Topic 21) in Module 001_003?",
    shortAnswer: "Detecting and preventing arithmetic overflow and underflow.",
    explanation: "Topic 21 explores Java 8+ `Math.*Exact()` methods, `BigInteger`, `BigDecimal`, and enterprise defensive overflow guards.",
    hint: "Detecting and preventing overflow/underflow.",
    level: "basic",
    codeExample: "// Topic 21: Detecting & Preventing Overflow/Underflow"
  }
];

export default questions;
