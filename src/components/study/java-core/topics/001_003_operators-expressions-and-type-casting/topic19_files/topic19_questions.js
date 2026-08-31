/**
 * Module 001_003: Topic 19: Widening / Implicit Casting (smaller type to larger type without data loss)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Widening / Implicit Casting in Java (JLS §5.1.2)?",
    shortAnswer: "The automatic conversion of a smaller primitive data type into a larger (wider) data type without requiring explicit cast syntax.",
    explanation: "Because the destination type has a larger storage size or dynamic range, the conversion is safe from magnitude overflow.",
    hint: "Automatic conversion from smaller to larger data type.",
    level: "basic",
    codeExample: "int i = 100;\nlong l = i; // Widened automatically without cast"
  },
  {
    question: "What is the complete Widening Conversion Ladder in Java?",
    shortAnswer: "`byte` $\\to$ `short` $\\to$ `int` $\\to$ `long` $\\to$ `float` $\\to$ `double` (and `char` $\\to$ `int`).",
    explanation: "Any type on the left can be automatically assigned to any type on its right.",
    hint: "byte → short → int → long → float → double.",
    level: "basic",
    codeExample: "byte b = 42;\ndouble d = b; // byte widened directly to double"
  },
  {
    question: "How many specific Widening Primitive Conversions exist in the Java Language Specification (JLS §5.1.2)?",
    shortAnswer: "19 specific widening conversions.",
    explanation: "Including byte to 5 types, short to 4 types, char to 4 types, int to 3 types, long to 2 types, and float to double.",
    hint: "19 standard widening primitive conversions.",
    level: "advanced",
    codeExample: "// 19 conversion pathways defined in JLS §5.1.2"
  },
  {
    question: "Can `byte` be implicitly widened to `char` in Java?",
    shortAnswer: "No! `byte` is signed (-128 to 127) while `char` is unsigned (0 to 65535); converting `byte` to `char` requires an explicit cast `(char)b`.",
    explanation: "Negative byte values cannot naturally map into unsigned char without explicit intent.",
    hint: "byte cannot be widened to char without explicit cast.",
    level: "intermediate",
    codeExample: "byte b = 65;\n// char c = b; // COMPILATION ERROR!\nchar c = (char) b; // Explicit cast required"
  },
  {
    question: "Can `short` be implicitly widened to `char` in Java?",
    shortAnswer: "No! `short` is signed (-32768 to 32767) while `char` is unsigned (0 to 65535); requires explicit cast `(char)s`.",
    explanation: "Neither short-to-char nor char-to-short is an implicit widening conversion.",
    hint: "short cannot be implicitly widened to char.",
    level: "intermediate",
    codeExample: "short s = 65;\n// char c = s; // COMPILER ERROR"
  },
  {
    question: "Can `char` be implicitly widened to `short` in Java?",
    shortAnswer: "No! `char` values from 32768 to 65535 would overflow signed `short`.",
    explanation: "Requires explicit cast `(short)c`.",
    hint: "char to short requires explicit cast.",
    level: "intermediate",
    codeExample: "char c = 'A';\n// short s = c; // COMPILER ERROR"
  },
  {
    question: "Can `char` be implicitly widened to `int`, `long`, `float`, and `double`?",
    shortAnswer: "Yes! `char` (0 to 65535) fits comfortably inside 32-bit signed `int` and all wider types.",
    explanation: "Widening from char to int is completely automatic.",
    hint: "char widens to int, long, float, double.",
    level: "basic",
    codeExample: "char ch = 'Z';\nint code = ch; // 90"
  },
  {
    question: "Does Widening Conversion ever result in a runtime exception?",
    shortAnswer: "No! Widening primitive conversions NEVER throw any runtime exception in Java.",
    explanation: "Widening is guaranteed to execute cleanly at the CPU hardware level.",
    hint: "Never throws runtime exceptions.",
    level: "basic",
    codeExample: "int i = Integer.MAX_VALUE;\nlong l = i; // 100% safe"
  },
  {
    question: "What is the Precision Loss Exception in Widening Conversions (JLS §5.1.2)?",
    shortAnswer: "Widening from `int` or `long` to `float`, or from `long` to `double`, may lose least significant bits of numerical precision due to mantissa bit limits.",
    explanation: "A 32-bit `float` only has a 23-bit mantissa; large ints ($> 16,777,216$) lose lower digits during float conversion.",
    hint: "Large ints/longs lose lower digits when widened to float/double.",
    level: "expert",
    codeExample: "int val = 123456789;\nfloat f = val;\nSystem.out.println((int)f); // 123456792 (Precision lost!)"
  },
  {
    question: "Why does `int` to `double` widening NOT lose precision for standard 32-bit integers?",
    shortAnswer: "Because `double` has a 52-bit mantissa, which can easily represent all 31 bits of `int` precision without any rounding.",
    explanation: "52-bit mantissa > 31 bits of integer magnitude.",
    hint: "52-bit double mantissa easily holds 31-bit int.",
    level: "advanced",
    codeExample: "int val = 123456789;\ndouble d = val;\nSystem.out.println((int)d); // 123456789 (Exact!)"
  },
  {
    question: "What happens when a 64-bit `long` with value `9007199254740993L` is widened to `double`?",
    shortAnswer: "The least significant bit is rounded off because `9007199254740993` exceeds $2^{53}$ (the maximum exact integer capacity of a 64-bit IEEE 754 double).",
    explanation: "Precision loss occurs for large longs.",
    hint: "Longs greater than 2^53 lose exact precision in double.",
    level: "expert",
    codeExample: "long l = 9007199254740993L;\ndouble d = l;\nSystem.out.println((long)d); // 9007199254740992"
  },
  {
    question: "What bytecode instruction is generated when widening `int` to `long`?",
    shortAnswer: "`i2l` (int to long).",
    explanation: "Performs sign extension of the 32-bit int into a 64-bit long register.",
    hint: "i2l bytecode instruction.",
    level: "expert",
    codeExample: "// Bytecode: iload_1, i2l, lstore_2"
  },
  {
    question: "What bytecode instruction is generated when widening `int` to `double`?",
    shortAnswer: "`i2d` (int to double).",
    explanation: "Converts the integer bit pattern into IEEE 754 64-bit floating-point format.",
    hint: "i2d bytecode instruction.",
    level: "expert",
    codeExample: "// Bytecode: iload_1, i2d, dstore_2"
  },
  {
    question: "What bytecode instruction is generated when widening `byte` to `int`?",
    shortAnswer: "No special conversion opcode! Bytes are loaded directly onto the operand stack as 32-bit ints using `iload`.",
    explanation: "The JVM treats bytes as 32-bit values internally on the stack.",
    hint: "Loaded directly as 32-bit int with iload.",
    level: "expert",
    codeExample: "// Bytecode: iload_1 (loads byte as int automatically)"
  },
  {
    question: "What happens during Method Invocation Conversion when passing a `short` to a method taking `double`?",
    shortAnswer: "The `short` is widened automatically to `double` without cast.",
    explanation: "Method arguments support widening primitive conversions seamlessly.",
    hint: "Automatic widening in method calls.",
    level: "basic",
    codeExample: "void calculateTax(double amount) { }\nshort fee = 5000;\ncalculateTax(fee); // Safe (widened to double)"
  },
  {
    question: "Can a `boolean` be widened to any other primitive type?",
    shortAnswer: "No, `boolean` does not participate in widening conversions.",
    explanation: "Booleans cannot be converted to numeric types in Java.",
    hint: "Booleans cannot be widened.",
    level: "basic",
    codeExample: "// int x = true; // COMPILATION ERROR"
  },
  {
    question: "What is the result of `double d = 100L;` in Java?",
    shortAnswer: "`d = 100.0`.",
    explanation: "64-bit `long` is widened to 64-bit `double`.",
    hint: "Widened to 100.0.",
    level: "basic",
    codeExample: "double d = 100L; // 100.0"
  },
  {
    question: "What is the result of `float f = 'A';` in Java?",
    shortAnswer: "`f = 65.0f`.",
    explanation: "'A' has Unicode value 65, which is widened to `float 65.0f`.",
    hint: "'A' widens to 65.0f.",
    level: "basic",
    codeExample: "float f = 'A'; // 65.0f"
  },
  {
    question: "Why is widening casting called 'Implicit Casting'?",
    shortAnswer: "Because the compiler performs the conversion automatically without the programmer writing explicit `(type)` cast syntax.",
    explanation: "Implicit means performed automatically by the language.",
    hint: "No explicit cast syntax needed.",
    level: "basic",
    codeExample: "int i = 5;\ndouble d = i; // Implicit cast"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student fee ledger, how is widening used?",
    shortAnswer: "Student fees stored as `short` (e.g. ₹15,000) are widened automatically to `double` when calculating percentage GST taxes.",
    explanation: "Preserves exact financial rupees while computing decimal taxes.",
    hint: "short fee widened to double for tax math.",
    level: "basic",
    codeExample: "short base = 15000;\ndouble total = base * 1.18;"
  },
  {
    question: "Can an array of `int` (`int[]`) be widened to an array of `long` (`long[]`)?",
    shortAnswer: "No! Arrays are reference types and array types in Java are NOT covariant across primitive types.",
    explanation: "An `int[]` object cannot be assigned to a `long[]` reference.",
    hint: "Primitive arrays are not covariant.",
    level: "advanced",
    codeExample: "int[] intArr = {1, 2, 3};\n// long[] longArr = intArr; // COMPILATION ERROR!"
  },
  {
    question: "What is the result of `long l = 10; float f = l; double d = f;`?",
    shortAnswer: "`d = 10.0`.",
    explanation: "Sequential widening from `int` to `long` to `float` to `double`.",
    hint: "Smooth widening chain to 10.0.",
    level: "basic",
    codeExample: "long l = 10;\nfloat f = l;\ndouble d = f; // 10.0"
  },
  {
    question: "Is `char` signed or unsigned in Java?",
    shortAnswer: "Unsigned 16-bit integer (range `0` to `65,535`).",
    explanation: "Because `char` is unsigned, widening to signed `int` fills the upper 16 bits with zeroes (zero extension).",
    hint: "Unsigned 16-bit type (0 to 65535).",
    level: "basic",
    codeExample: "char c = 0xFFFF;\nint i = c; // 65535 (positive)"
  },
  {
    question: "Is `short` signed or unsigned in Java?",
    shortAnswer: "Signed 16-bit integer (range `-32,768` to `+32,767`).",
    explanation: "Widening `short` to `int` performs sign extension (preserves negative values).",
    hint: "Signed 16-bit type (-32768 to 32767).",
    level: "basic",
    codeExample: "short s = -1;\nint i = s; // -1 (Sign extension)"
  },
  {
    question: "What is the result of `short s = -1; int i1 = s; char c = (char)s; int i2 = c;`?",
    shortAnswer: "`i1 = -1`, while `i2 = 65535`!",
    explanation: "`short` to `int` preserves `-1`. Casting `-1` to `char` creates unsigned `0xFFFF`. Widening `char` to `int` zero-extends to `65535`!",
    hint: "Classic Java puzzler: -1 becomes 65535 via char!",
    level: "expert",
    codeExample: "short s = -1;\nint i1 = s;          // -1\nchar c = (char) s;   // 0xFFFF\nint i2 = c;          // 65535"
  },
  {
    question: "Can an `Integer` wrapper object be widened automatically to a `Long` wrapper object?",
    shortAnswer: "No! Autoboxing does NOT support widening across wrapper types (e.g. `Long l = 10;` fails to compile!).",
    explanation: "Widening only applies to primitives. `10` is an `int`, which autoboxes to `Integer` and cannot be assigned to `Long`.",
    hint: "Autoboxing does not widen wrapper types.",
    level: "advanced",
    codeExample: "// Long l = 10; // COMPILATION ERROR!\nLong l = 10L;   // Correct"
  },
  {
    question: "What is the result of `double d = '0';`?",
    shortAnswer: "`d = 48.0`.",
    explanation: "'0' has ASCII code point 48.",
    hint: "'0' is code point 48.",
    level: "basic",
    codeExample: "double d = '0'; // 48.0"
  },
  {
    question: "What happens when you write `long val = 2147483648L;` without the `L` suffix (`long val = 2147483648;`)?",
    shortAnswer: "Compilation error! `2147483648` is parsed as an `int` literal, which exceeds `Integer.MAX_VALUE` before any widening can occur.",
    explanation: "Numeric literals default to `int` unless suffixed with `L`.",
    hint: "Literal exceeds int range before widening can occur.",
    level: "intermediate",
    codeExample: "// long bad = 2147483648; // ERROR: Integer number too large\nlong good = 2147483648L; // Correct"
  },
  {
    question: "What is the ultimate takeaway of Topic 19 for Java developers?",
    shortAnswer: "Widening conversions allow safe, automatic promotion from smaller to larger types without explicit cast syntax, preserving numerical value across all integer widening while requiring awareness of mantissa precision limits when converting to float/double.",
    explanation: "Mastering widening casting ensures seamless type transitions across business logic, mathematical computations, and API method invocations.",
    hint: "Seamless safe promotion; watch for float/double mantissa precision limits.",
    level: "basic",
    codeExample: "// Summary: byte → short → int → long → float → double (automatic widening)"
  },
  {
    question: "What is the next topic (Topic 20) in Module 001_003?",
    shortAnswer: "Narrowing / Explicit Casting (larger type to smaller type with potential overflow/truncation).",
    explanation: "Topic 20 explores explicit narrowing casting `(type)`, high-order bit truncation, and floating-point decimal loss.",
    hint: "Narrowing explicit casting.",
    level: "basic",
    codeExample: "// Topic 20: Narrowing / Explicit Casting"
  }
];

export default questions;
