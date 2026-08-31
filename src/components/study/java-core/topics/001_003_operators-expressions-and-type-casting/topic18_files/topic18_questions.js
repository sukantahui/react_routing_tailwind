/**
 * Module 001_003: Topic 18: Automatic Type Promotion rules in expressions (byte/short/char promoted to int)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Automatic Type Promotion in Java?",
    shortAnswer: "The automatic widening of smaller numeric types to larger types during expression evaluation to prevent loss of precision and optimize JVM instruction execution.",
    explanation: "Governed by JLS §5.6.1 (Unary Numeric Promotion) and §5.6.2 (Binary Numeric Promotion).",
    hint: "Automatic widening of smaller types during arithmetic.",
    level: "basic",
    codeExample: "byte b = 5;\nint i = b + 10; // b is promoted to int"
  },
  {
    question: "What is Unary Numeric Promotion (JLS §5.6.1)?",
    shortAnswer: "If an operand of a unary operator is `byte`, `short`, or `char`, it is automatically promoted to `int`.",
    explanation: "Applies to `+`, `-`, `~`, array indices, and shift expressions.",
    hint: "Narrow types promoted to 32-bit int under unary operators.",
    level: "intermediate",
    codeExample: "byte b = 10;\nint neg = -b; // -b evaluates to int"
  },
  {
    question: "What is Binary Numeric Promotion (JLS §5.6.2)?",
    shortAnswer: "The rule set that promotes operands of binary operators to a common type: 1. If any operand is `double` → `double`; 2. Else if `float` → `float`; 3. Else if `long` → `long`; 4. Otherwise, BOTH operands → `int`.",
    explanation: "Ensures type harmony during arithmetic, relational, and bitwise operations.",
    hint: "double > float > long > int.",
    level: "basic",
    codeExample: "long l = 10L;\nfloat f = 2.5f;\nfloat res = l + f; // Promoted to float"
  },
  {
    question: "Why does `byte b1 = 10, b2 = 20; byte b3 = b1 + b2;` fail to compile in Java?",
    shortAnswer: "Because under Binary Numeric Promotion, `b1 + b2` promotes both bytes to `int`, producing an `int` result that cannot be assigned to `byte` without an explicit cast.",
    explanation: "The compiler demands `byte b3 = (byte)(b1 + b2);`.",
    hint: "b1 + b2 evaluates to int, requiring (byte) cast.",
    level: "basic",
    codeExample: "byte b1 = 10, b2 = 20;\n// byte b3 = b1 + b2; // COMPILATION ERROR!\nbyte b3 = (byte)(b1 + b2); // Correct"
  },
  {
    question: "What is the evaluated type of `'A' + 'B'` in Java?",
    shortAnswer: "`int` (evaluates to `131`, since `65 + 66 = 131`).",
    explanation: "Characters are promoted to their integer Unicode code points during arithmetic.",
    hint: "char + char evaluates to int.",
    level: "basic",
    codeExample: "int sum = 'A' + 'B'; // 65 + 66 = 131"
  },
  {
    question: "What is the evaluated type of `short s1 = 5, s2 = 10; s1 * s2;`?",
    shortAnswer: "`int` (evaluates to `50`).",
    explanation: "Both `short` operands are promoted to `int` before multiplication.",
    hint: "Short multiplication evaluates to int.",
    level: "basic",
    codeExample: "int product = s1 * s2; // 50"
  },
  {
    question: "What is the result type of `int (10) + double (5.5)`?",
    shortAnswer: "`double` (evaluates to `15.5`).",
    explanation: "Rule 1 of Binary Promotion: the `int` is widened to `double 10.0`.",
    hint: "int + double promotes to double.",
    level: "basic",
    codeExample: "double d = 10 + 5.5; // 15.5"
  },
  {
    question: "What is the result type of `long (100L) + float (20.0f)`?",
    shortAnswer: "`float` (evaluates to `120.0f`).",
    explanation: "Rule 2 of Binary Promotion: `float` has higher promotion priority than `long`.",
    hint: "long + float promotes to float.",
    level: "intermediate",
    codeExample: "float f = 100L + 20.0f; // 120.0f"
  },
  {
    question: "Why does `float` take precedence over `long` in type promotion even though both occupy 64/32 bits differently?",
    shortAnswer: "Because `float` represents continuous floating-point numbers with a much larger dynamic range ($3.4 \\times 10^{38}$) than 64-bit `long` ($9.22 \\times 10^{18}$).",
    explanation: "Floating-point types subsume integral types in the promotion hierarchy.",
    hint: "Float dynamic range exceeds long integer range.",
    level: "advanced",
    codeExample: "float f = 100000000000000L * 1.0f; // float"
  },
  {
    question: "Why does the JVM promote `byte`, `short`, and `char` to `int` at the hardware level?",
    shortAnswer: "Because modern CPU architectures have 32-bit and 64-bit ALUs; the JVM bytecode set has instructions like `iadd`, `imul` for `int`, but no native `badd` or `sadd` for byte/short.",
    explanation: "Promoting to 32-bit int aligns with hardware instruction set efficiency.",
    hint: "CPU registers and JVM bytecode are optimized for 32/64-bit integers.",
    level: "advanced",
    codeExample: "// Bytecode: iload_1, iload_2, iadd (adds as 32-bit ints)"
  },
  {
    question: "What is the result of `(byte) 100 + (byte) 100`?",
    shortAnswer: "`200` (an `int`).",
    explanation: "Both bytes are promoted to `int`, producing `200` without any byte overflow!",
    hint: "Evaluates to int 200.",
    level: "basic",
    codeExample: "int sum = (byte)100 + (byte)100; // 200"
  },
  {
    question: "What happens if you assign `(byte) 100 + (byte) 100` to a `byte` variable with explicit cast `(byte)((byte)100 + (byte)100)`?",
    shortAnswer: "The `int 200` is truncated to `byte`, wrapping around to `-56` (`200 - 256 = -56`).",
    explanation: "Narrowing cast discards higher bits, causing two's complement overflow.",
    hint: "Wraps to -56.",
    level: "intermediate",
    codeExample: "byte b = (byte)((byte)100 + (byte)100); // -56"
  },
  {
    question: "What is the result type of `byte b = 5; -b;` in Java?",
    shortAnswer: "`int` (`-5`).",
    explanation: "Unary minus applies Unary Numeric Promotion, converting `b` to `int`.",
    hint: "Unary minus promotes byte to int.",
    level: "basic",
    codeExample: "int neg = -b; // -5 (int)"
  },
  {
    question: "What is the result type of `char c = 'a'; ~c;` in Java?",
    shortAnswer: "`int` (`-98`).",
    explanation: "'a' is promoted to `int 97`, and `~97 = -(97 + 1) = -98`.",
    hint: "~c evaluates to int.",
    level: "intermediate",
    codeExample: "int inverted = ~'a'; // -98"
  },
  {
    question: "What is the result type of `(f * b) + (i / c) - (d * s)` where `f` is float, `b` is byte, `i` is int, `c` is char, `d` is double, `s` is short?",
    shortAnswer: "`double`.",
    explanation: "`f * b` is `float`, `i / c` is `int`, `d * s` is `double`. `float + int` is `float`. `float - double` is `double`.",
    hint: "Widest operand double wins.",
    level: "intermediate",
    codeExample: "double total = (f * b) + (i / c) - (d * s);"
  },
  {
    question: "What is the result of `10 / 4` vs `10 / 4.0` in Java?",
    shortAnswer: "`10 / 4` evaluates to `2` (int division); `10 / 4.0` promotes `10` to `10.0` and evaluates to `2.5` (double).",
    explanation: "The presence of `4.0` triggers Binary Numeric Promotion to double.",
    hint: "10 / 4 = 2 vs 10 / 4.0 = 2.5.",
    level: "basic",
    codeExample: "int a = 10 / 4;      // 2\ndouble b = 10 / 4.0; // 2.5"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student exam auditor, why is average marks calculated as `(m1 + m2 + m3) / 3.0`?",
    shortAnswer: "Using `3.0` (double) promotes the integer sum to `double`, preventing integer truncation of fractional percentage scores.",
    explanation: "Dividing by `3` would drop decimal percentage marks.",
    hint: "Dividing by 3.0 prevents integer division truncation.",
    level: "basic",
    codeExample: "double avg = (m1 + m2 + m3) / 3.0;"
  },
  {
    question: "What happens when you pass a `byte` argument to a method that accepts an `int` parameter?",
    shortAnswer: "Java automatically widens the `byte` to `int` via Method Invocation Conversion.",
    explanation: "Widening primitive conversion happens seamlessly during method calls.",
    hint: "Widened automatically during method invocation.",
    level: "basic",
    codeExample: "void printVal(int x) { }\nbyte b = 5;\nprintVal(b); // Safe (promoted to int)"
  },
  {
    question: "What happens when you pass an `int` argument to a method that accepts a `byte` parameter?",
    shortAnswer: "Compilation error! Narrowing conversions are NOT automatic and require an explicit cast `(byte)`.",
    explanation: "Method invocation conversions do not allow automatic narrowing.",
    hint: "Requires explicit cast (byte).",
    level: "basic",
    codeExample: "void printByte(byte b) { }\n// printByte(100); // COMPILER ERROR without cast"
  },
  {
    question: "What is the result of `byte b = 50; b = b * 2;`?",
    shortAnswer: "Compilation error! `b * 2` evaluates to `int 100`, which cannot be assigned to `byte` without a cast.",
    explanation: "Standard binary promotion error.",
    hint: "Requires (byte)(b * 2).",
    level: "basic",
    codeExample: "// b = b * 2; // ERROR\nb = (byte)(b * 2); // Correct"
  },
  {
    question: "What is the result of `byte b = 50; b *= 2;`?",
    shortAnswer: "`b = 100`.",
    explanation: "Compound assignment automatically applies the `(byte)` cast.",
    hint: "Compound assignment compiles cleanly.",
    level: "basic",
    codeExample: "byte b = 50;\nb *= 2; // 100"
  },
  {
    question: "What is the evaluated type of `true ? (byte) 1 : (short) 2` in Java?",
    shortAnswer: "`short` (if assigned to short) or `byte`/`short` depending on constant expression rules.",
    explanation: "When both operands are of narrow types, JLS §15.25 applies special constant narrowing rules.",
    hint: "Narrowest fitting type under ternary constant rules.",
    level: "advanced",
    codeExample: "short s = true ? (byte)1 : (short)2; // short"
  },
  {
    question: "Can `boolean` variables participate in numeric type promotion?",
    shortAnswer: "No! In Java, `boolean` is completely incompatible with all numeric types (`int`, `double`, etc.).",
    explanation: "There is no implicit or explicit conversion between boolean and numeric types.",
    hint: "Booleans cannot be converted to numeric types.",
    level: "basic",
    codeExample: "// int x = true + 1; // COMPILATION ERROR"
  },
  {
    question: "What is the result type of `100L * 5` in Java?",
    shortAnswer: "`long` (`500L`).",
    explanation: "`5` (int) is promoted to `long 5L`.",
    hint: "Promoted to long.",
    level: "basic",
    codeExample: "long val = 100L * 5; // 500L"
  },
  {
    question: "What is the result of `char c = '0' + 5;` in Java?",
    shortAnswer: "`c = '5'` (Unicode code point 53).",
    explanation: "Constant expression `'0' + 5` evaluates at compile time to `53`, which fits in `char`.",
    hint: "'0' (48) + 5 = '5' (53).",
    level: "intermediate",
    codeExample: "char c = '0' + 5; // '5'"
  },
  {
    question: "Why does `char c = 'A'; c = c + 1;` fail to compile while `char c = 'A' + 1;` compiles cleanly?",
    shortAnswer: "`'A' + 1` is a compile-time constant expression whose value (66) fits into `char`; `c + 1` involves a non-constant variable and is promoted to `int`.",
    explanation: "Compile-time constant narrowing only applies when the value is known at compile time.",
    hint: "Compile-time constant vs variable promotion.",
    level: "advanced",
    codeExample: "char c1 = 'A' + 1; // Compiles (Constant)\nchar c = 'A';\n// char c2 = c + 1; // FAILS (Variable promotion to int)"
  },
  {
    question: "What is the result of `1.0 / 0` in Java?",
    shortAnswer: "`Double.POSITIVE_INFINITY`.",
    explanation: "Binary promotion converts `0` to `0.0`, resulting in floating-point division by zero.",
    hint: "Produces Infinity.",
    level: "basic",
    codeExample: "double d = 1.0 / 0; // Infinity"
  },
  {
    question: "What is the result of `1 / 0` in Java?",
    shortAnswer: "Throws `java.lang.ArithmeticException: / by zero`.",
    explanation: "Both operands are `int`, triggering integer division by zero exception.",
    hint: "Throws ArithmeticException.",
    level: "basic",
    codeExample: "// int i = 1 / 0; // THROWS ArithmeticException"
  },
  {
    question: "What is the ultimate takeaway of Topic 18 for Java developers?",
    shortAnswer: "Automatic Type Promotion widens narrow types (`byte`/`short`/`char` $\\to$ `int`) and unifies mixed expressions to the widest type (`double` > `float` > `long` > `int`), requiring explicit casts when narrowing back.",
    explanation: "Understanding type promotion prevents compilation errors on byte arithmetic and preserves precision in financial formulas.",
    hint: "byte/short/char promoted to int; widest type wins in mixed math.",
    level: "basic",
    codeExample: "// Summary: byte/short/char → int; double > float > long > int"
  },
  {
    question: "What is the next topic (Topic 19) in Module 001_003?",
    shortAnswer: "Widening / Implicit Casting (smaller type to larger type without data loss).",
    explanation: "Topic 19 explores widening conversions along the numeric continuum without explicit cast syntax.",
    hint: "Widening implicit casting.",
    level: "basic",
    codeExample: "// Topic 19: Widening / Implicit Casting"
  }
];

export default questions;
