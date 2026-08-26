/**
 * Module 001_003: Topic 3: Modulus operator with positive, negative, and floating-point numbers
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the exact JLS formula that defines the modulus operator (`%`) in Java?",
    shortAnswer: "`a % b = a - (a / b) * b`",
    explanation: "Because integer division `a / b` truncates towards zero, the remainder is calculated by subtracting the truncated quotient multiplied by the divisor from the dividend.",
    hint: "a % b = a - (a / b) * b.",
    level: "basic",
    codeExample: "int rem = 15 % 4; // 15 - (3 * 4) = 3"
  },
  {
    question: "What is the result of `-15 % 4` in Java?",
    shortAnswer: "`-3`.",
    explanation: "Using the formula: `-15 - (-15 / 4) * 4` = `-15 - (-3 * 4)` = `-15 - (-12)` = `-3`.",
    hint: "Dividend is -15, so remainder is negative.",
    level: "basic",
    codeExample: "int rem = -15 % 4; // -3"
  },
  {
    question: "What is the result of `15 % -4` in Java?",
    shortAnswer: "`3`.",
    explanation: "Using the formula: `15 - (15 / -4) * -4` = `15 - (-3 * -4)` = `15 - 12` = `3`. The sign of the divisor is completely ignored.",
    hint: "Divisor negative sign is ignored; dividend is +15.",
    level: "basic",
    codeExample: "int rem = 15 % -4; // 3"
  },
  {
    question: "What is the result of `-15 % -4` in Java?",
    shortAnswer: "`-3`.",
    explanation: "Using the formula: `-15 - (-15 / -4) * -4` = `-15 - (3 * -4)` = `-15 - (-12)` = `-3`.",
    hint: "Dividend is negative, so remainder is negative.",
    level: "basic",
    codeExample: "int rem = -15 % -4; // -3"
  },
  {
    question: "What is the result of `5.5 % 2.0` in Java floating-point arithmetic?",
    shortAnswer: "`1.5`.",
    explanation: "The quotient `5.5 / 2.0` is `2.75` (truncated integer count is `2`). `5.5 - (2 * 2.0)` = `5.5 - 4.0` = `1.5`.",
    hint: "5.5 - 4.0 = 1.5.",
    level: "basic",
    codeExample: "double rem = 5.5 % 2.0; // 1.5"
  },
  {
    question: "What is the result of `10.0 % 0.0` in Java?",
    shortAnswer: "`Double.NaN` (Not-a-Number).",
    explanation: "In IEEE 754 floating-point standard, calculating modulus with a divisor of `0.0` or a dividend of `Infinity` yields `Double.NaN` without throwing an exception.",
    hint: "Floating modulus with 0.0 returns NaN.",
    level: "intermediate",
    codeExample: "double res = 10.0 % 0.0; // Double.NaN"
  },
  {
    question: "What is the result of `10 % 0` (integer operands) in Java?",
    shortAnswer: "Throws `java.lang.ArithmeticException: / by zero`.",
    explanation: "Integer modulus by zero is illegal and caught at runtime with `ArithmeticException`.",
    hint: "Integer % 0 throws ArithmeticException.",
    level: "basic",
    codeExample: "// int res = 10 % 0; // THROWS ArithmeticException"
  },
  {
    question: "How can the `%` operator be used to convert total minutes into hours and minutes?",
    shortAnswer: "`hours = totalMinutes / 60;` and `mins = totalMinutes % 60;`.",
    explanation: "Integer division extracts the complete hours; modulus extracts the remaining minutes.",
    hint: "total / 60 for hours, total % 60 for minutes.",
    level: "basic",
    codeExample: "int total = 135;\nint h = total / 60; // 2\nint m = total % 60; // 15"
  },
  {
    question: "How can the `%` operator convert total Indian Rupee paise into Rupees and Paise?",
    shortAnswer: "`rupees = totalPaise / 100;` and `paise = totalPaise % 100;`.",
    explanation: "Since 1 Rupee = 100 Paise, `/ 100` yields full Rupees and `% 100` yields the fractional paise.",
    hint: "total / 100 and total % 100.",
    level: "basic",
    codeExample: "long totalPaise = 15075L;\nlong rs = totalPaise / 100; // ₹150\nlong ps = totalPaise % 100; // 75 paise"
  },
  {
    question: "How do you implement circular wrap-around indexing for a queue/buffer of size N?",
    shortAnswer: "`int nextIndex = (currentIndex + 1) % N;`",
    explanation: "When `currentIndex` reaches `N - 1`, `(N - 1 + 1) % N` evaluates to `0`, cycling smoothly back to the beginning.",
    hint: "(index + 1) % size wraps around to 0.",
    level: "intermediate",
    codeExample: "index = (index + 1) % buffer.length;"
  },
  {
    question: "Why is `Math.abs(key.hashCode()) % numBuckets` dangerous in production hash tables?",
    shortAnswer: "Because if `hashCode()` returns `Integer.MIN_VALUE` (`-2147483648`), `Math.abs()` cannot negate it and returns `-2147483648`, causing a negative array index crash (`ArrayIndexOutOfBoundsException`)!",
    explanation: "`Integer.MIN_VALUE` has no positive counterpart in 32-bit signed two's complement. `Math.abs(Integer.MIN_VALUE)` remains negative.",
    hint: "Math.abs(Integer.MIN_VALUE) remains negative!",
    level: "expert",
    codeExample: "// Insecure: int bucket = Math.abs(key.hashCode()) % buckets; // Crashes on MIN_VALUE!"
  },
  {
    question: "What is the production-safe idiom to calculate a hash bucket index from a hashCode?",
    shortAnswer: "`int bucket = (key.hashCode() & 0x7FFFFFFF) % numBuckets;`",
    explanation: "The bitwise mask `& 0x7FFFFFFF` clears the sign bit (the 31st bit), guaranteeing a strictly non-negative integer for all possible 32-bit hash codes.",
    hint: "Use (hash & 0x7FFFFFFF) % buckets.",
    level: "expert",
    codeExample: "int bucket = (key.hashCode() & 0x7FFFFFFF) % buckets; // 100% crash-proof"
  },
  {
    question: "What is the difference between `%` (remainder) and mathematical modulo in terms of negative numbers?",
    shortAnswer: "Java's `%` is a remainder operator (sign matches dividend); true mathematical modulo always produces non-negative results `[0, b-1]`.",
    explanation: "In modular arithmetic, `-1 mod 12` is `11`. In Java, `-1 % 12` is `-1`. To get true mathematical modulo in Java, use `Math.floorMod(a, b)`.",
    hint: "Java % is remainder; Math.floorMod is mathematical modulo.",
    level: "advanced",
    codeExample: "int javaRem = -1 % 12;        // -1\nint mathMod = Math.floorMod(-1, 12); // 11"
  },
  {
    question: "What is the result of `0 % 10` in Java?",
    shortAnswer: "`0`.",
    explanation: "`0 - (0 / 10) * 10` = `0 - 0` = `0`.",
    hint: "Zero divided by any number leaves zero remainder.",
    level: "basic",
    codeExample: "int rem = 0 % 10; // 0"
  },
  {
    question: "What is the result of `10 % 10` in Java?",
    shortAnswer: "`0`.",
    explanation: "10 is evenly divisible by 10.",
    hint: "Evenly divisible yields 0.",
    level: "basic",
    codeExample: "int rem = 10 % 10; // 0"
  },
  {
    question: "What is the result of `3 % 10` in Java?",
    shortAnswer: "`3`.",
    explanation: "`3 - (0 * 10)` = `3`.",
    hint: "Smaller dividend % larger divisor = dividend.",
    level: "basic",
    codeExample: "int rem = 3 % 10; // 3"
  },
  {
    question: "What is the result of `-3 % 10` in Java?",
    shortAnswer: "`-3`.",
    explanation: "`(-3) - (0 * 10)` = `-3`.",
    hint: "Dividend is -3, so result is -3.",
    level: "basic",
    codeExample: "int rem = -3 % 10; // -3"
  },
  {
    question: "How does `%` enable base-10 to base-2 (binary) conversion algorithms?",
    shortAnswer: "`num % 2` extracts the lowest binary bit, and `num / 2` shifts to the next bit.",
    explanation: "Repeatedly recording `num % 2` and dividing `num /= 2` generates binary bits from least significant to most significant.",
    hint: "Repeated % 2 and / 2.",
    level: "intermediate",
    codeExample: "StringBuilder bin = new StringBuilder();\nwhile (n > 0) {\n  bin.insert(0, n % 2);\n  n /= 2;\n}"
  },
  {
    question: "Can `%` be used with `long` operands?",
    shortAnswer: "Yes, `long % long` returns a `long` remainder using 64-bit precision.",
    explanation: "Modulus is fully supported across all primitive numeric types.",
    hint: "Supported across byte, short, char, int, long, float, double.",
    level: "basic",
    codeExample: "long rem = 9876543210123L % 1000L; // 123L"
  },
  {
    question: "What happens when you calculate `Double.POSITIVE_INFINITY % 5.0`?",
    shortAnswer: "`Double.NaN`.",
    explanation: "The remainder of infinity divided by any finite number is undefined in IEEE 754.",
    hint: "Infinity % finite = NaN.",
    level: "advanced",
    codeExample: "double res = Double.POSITIVE_INFINITY % 5.0; // NaN"
  },
  {
    question: "What happens when you calculate `5.0 % Double.POSITIVE_INFINITY`?",
    shortAnswer: "`5.0`.",
    explanation: "Since infinity is infinitely larger than 5.0, the quotient is 0 and the remainder is the original dividend `5.0`.",
    hint: "Finite % Infinity = Finite.",
    level: "advanced",
    codeExample: "double res = 5.0 % Double.POSITIVE_INFINITY; // 5.0"
  },
  {
    question: "How can `%` distribute N items evenly across K worker threads or servers?",
    shortAnswer: "`int workerId = taskId % numWorkers;`",
    explanation: "Round-robin load balancing distributes tasks `0, 1, 2, ... N` cyclically among `numWorkers`.",
    hint: "Round-robin task distribution via taskId % numWorkers.",
    level: "intermediate",
    codeExample: "int assignedServer = requestId % clusterSize;"
  },
  {
    question: "Why does `Math.IEEEremainder(double f1, double f2)` differ from `f1 % f2`?",
    shortAnswer: "`Math.IEEEremainder()` computes remainder using the nearest integer quotient (ties to even), whereas `%` uses truncated quotient.",
    explanation: "For example, `Math.IEEEremainder(7.0, 4.0)` is `-1.0` (because 7 is closer to `2*4=8`), while `7.0 % 4.0` is `3.0`.",
    hint: "IEEEremainder uses nearest integer; % uses truncated integer.",
    level: "expert",
    codeExample: "double ieee = Math.IEEEremainder(7.0, 4.0); // -1.0\ndouble std = 7.0 % 4.0;                   // 3.0"
  },
  {
    question: "In the Coder & AccoTax Barrackpore classroom batch scheduler, how are students assigned to 4 lab rooms?",
    shortAnswer: "Using `int labRoomIndex = studentRoll % 4;`",
    explanation: "Cyclically maps roll numbers `101, 102, 103, 104, 105...` to lab rooms `0, 1, 2, 3` evenly.",
    hint: "Cyclic mapping via roll % 4.",
    level: "basic",
    codeExample: "int room = (roll - 1) % 4; // Maps 1->0, 2->1, 3->2, 4->3, 5->0"
  },
  {
    question: "What is the precedence of `%` relative to `+` and `*`?",
    shortAnswer: "`%` has the same precedence as `*` and `/`, and higher precedence than `+` and `-`.",
    explanation: "Multiplicative operators (`*`, `/`, `%`) are evaluated before additive operators (`+`, `-`).",
    hint: "* / % are in the same precedence tier.",
    level: "basic",
    codeExample: "int val = 10 + 14 % 4; // 10 + 2 = 12"
  },
  {
    question: "Can the modulus operator `%` be used on `boolean` operands?",
    shortAnswer: "No, applying `%` to boolean operands causes a compile-time error.",
    explanation: "`%` is strictly a numeric arithmetic operator.",
    hint: "Arithmetic operators cannot be applied to booleans.",
    level: "basic",
    codeExample: "// boolean b = true % false; // COMPILER ERROR"
  },
  {
    question: "What is the result of `10 % 1` in Java?",
    shortAnswer: "`0`.",
    explanation: "Any integer is evenly divisible by 1.",
    hint: "Dividing by 1 leaves zero remainder.",
    level: "basic",
    codeExample: "int rem = 10 % 1; // 0"
  },
  {
    question: "How can you check if a year is a Leap Year using `%` in Java?",
    shortAnswer: "`boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);`",
    explanation: "A year is leap if divisible by 4 but not 100, unless also divisible by 400.",
    hint: "Classic leap year formula using % 4, % 100, % 400.",
    level: "intermediate",
    codeExample: "boolean leap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);"
  },
  {
    question: "What is the ultimate takeaway of Topic 3 for Java developers?",
    shortAnswer: "Modulus (`%`) is an indispensable tool for unit conversions, circular buffers, hash tables, and cyclic scheduling whose sign always follows the dividend.",
    explanation: "Understanding how `%` behaves with negative dividends, floating-point numbers, and hash bitmasks guarantees robust algorithm implementations.",
    hint: "Dividend sign rule, circular wrap, and safe hash indexing.",
    level: "basic",
    codeExample: "// Summary: a % b = a - (a / b) * b; (hash & 0x7FFFFFFF) % buckets"
  },
  {
    question: "What is the next topic (Topic 4) in Module 001_003?",
    shortAnswer: "String concatenation operator (+) and operator overloading mechanics.",
    explanation: "Topic 4 explores how Java overloads `+` for Strings, `StringBuilder` bytecode compilation, and string conversion rules.",
    hint: "String concatenation and operator overloading.",
    level: "basic",
    codeExample: "// Topic 4: String concatenation mechanics"
  }
];

export default questions;
