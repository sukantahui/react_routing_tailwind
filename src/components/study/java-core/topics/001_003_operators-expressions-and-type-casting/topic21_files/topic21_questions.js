/**
 * Module 001_003: Topic 21: Detecting and preventing arithmetic overflow and underflow
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Arithmetic Overflow in Java?",
    shortAnswer: "When an arithmetic calculation produces a value larger than the maximum positive capacity of the data type, causing a silent wrap-around into negative numbers.",
    explanation: "Standard primitive integer arithmetic in Java does not throw exceptions upon overflow.",
    hint: "Calculation exceeds data type's maximum capacity.",
    level: "basic",
    codeExample: "int overflow = Integer.MAX_VALUE + 1; // -2147483648"
  },
  {
    question: "What is Arithmetic Underflow in Java?",
    shortAnswer: "When an arithmetic calculation produces a value smaller than the minimum negative capacity of the data type, causing a silent wrap-around into positive numbers.",
    explanation: "For floating-point numbers, underflow occurs when a number becomes too small to be represented and flushes to zero.",
    hint: "Calculation falls below data type's minimum capacity.",
    level: "basic",
    codeExample: "int underflow = Integer.MIN_VALUE - 1; // 2147483647"
  },
  {
    question: "What is the evaluated result of `Integer.MAX_VALUE + 1` in standard Java?",
    shortAnswer: "`Integer.MIN_VALUE` (`-2147483648`).",
    explanation: "Two's complement integer arithmetic wraps around without any compiler error or runtime exception.",
    hint: "Wraps around to Integer.MIN_VALUE.",
    level: "basic",
    codeExample: "int x = Integer.MAX_VALUE + 1; // -2147483648"
  },
  {
    question: "What are the Java 8+ `Math.*Exact()` methods for overflow prevention?",
    shortAnswer: "`Math.addExact()`, `Math.subtractExact()`, `Math.multiplyExact()`, `Math.incrementExact()`, `Math.decrementExact()`, `Math.negateExact()`, and `Math.toIntExact()`.",
    explanation: "These methods perform exact arithmetic and immediately throw `java.lang.ArithmeticException: integer overflow` if the result exceeds the data type capacity.",
    hint: "Math.addExact, multiplyExact, etc. throw ArithmeticException.",
    level: "basic",
    codeExample: "int safeSum = Math.addExact(a, b);"
  },
  {
    question: "What happens if you execute `Math.addExact(Integer.MAX_VALUE, 1)`?",
    shortAnswer: "Throws `java.lang.ArithmeticException: integer overflow` at runtime.",
    explanation: "Allows developers to catch and handle overflow explicitly rather than processing corrupted data.",
    hint: "Throws ArithmeticException.",
    level: "basic",
    codeExample: "try {\n    int sum = Math.addExact(Integer.MAX_VALUE, 1);\n} catch (ArithmeticException e) {\n    System.out.println(\"Overflow prevented!\");\n}"
  },
  {
    question: "Why does `long total = countA + countB;` still overflow when `countA` and `countB` are large `int` values (e.g. 1.5 Billion each)?",
    shortAnswer: "Because `countA + countB` is evaluated in 32-bit `int` arithmetic FIRST (overflowing to a negative integer) before being widened to `long`!",
    explanation: "The addition must be upcasted before addition: `long total = (long) countA + countB;`.",
    hint: "Addition occurs in int before widening to long.",
    level: "intermediate",
    codeExample: "int a = 1_500_000_000, b = 1_500_000_000;\n// long bad = a + b; // -1294967296\nlong good = (long) a + b; // 3000000000L"
  },
  {
    question: "What class in `java.math` handles arbitrarily large integers without overflow?",
    shortAnswer: "`java.math.BigInteger`.",
    explanation: "Allocates arbitrary precision dynamic memory arrays to represent numbers of unlimited size.",
    hint: "BigInteger handles arbitrarily large integers.",
    level: "basic",
    codeExample: "BigInteger big = new BigInteger(\"9999999999999999999999999999\");"
  },
  {
    question: "What class in `java.math` handles exact decimal monetary calculations without floating-point rounding errors?",
    shortAnswer: "`java.math.BigDecimal`.",
    explanation: "Provides unscaled integer values with scale factors, essential for banking and tax ledgers in Indian Rupees (₹).",
    hint: "BigDecimal handles exact financial decimals.",
    level: "basic",
    codeExample: "BigDecimal amount = new BigDecimal(\"15000.75\");"
  },
  {
    question: "What happens when floating-point arithmetic overflows in Java (`double d = 1e308 * 10;`)?",
    shortAnswer: "It evaluates to `Double.POSITIVE_INFINITY` without throwing an exception.",
    explanation: "IEEE 754 floating-point overflow produces infinity rather than wrapping around.",
    hint: "Evaluates to POSITIVE_INFINITY.",
    level: "intermediate",
    codeExample: "double d = 1e308 * 10; // Double.POSITIVE_INFINITY"
  },
  {
    question: "What happens when floating-point arithmetic underflows in Java (`double d = 1e-320 / 1e10;`)?",
    shortAnswer: "It underflows gracefully to `0.0`.",
    explanation: "Floating-point numbers flush to positive or negative zero when below denormalized limits.",
    hint: "Flushes to 0.0.",
    level: "intermediate",
    codeExample: "double d = 1e-320 / 1e10; // 0.0"
  },
  {
    question: "How can you detect integer multiplication overflow without using `Math.multiplyExact`?",
    shortAnswer: "Check if `b != 0 && (a * b) / b != a` (or `b > 0 && a > Integer.MAX_VALUE / b`).",
    explanation: "Traditional pre-Java 8 heuristic verification.",
    hint: "Check if a * b / b == a.",
    level: "advanced",
    codeExample: "boolean overflow = (b > 0 && a > Integer.MAX_VALUE / b);"
  },
  {
    question: "What is the bitwise sign-bit condition for detecting 32-bit addition overflow (`a + b = sum`)?",
    shortAnswer: "`((a ^ sum) & (b ^ sum)) < 0` (or `(((a ^ sum) & (b ^ sum)) & 0x80000000) != 0`).",
    explanation: "Overflow occurs if and only if both operands have the same sign, and the result has a different sign.",
    hint: "Operands have same sign, but sum has opposite sign.",
    level: "expert",
    codeExample: "int sum = a + b;\nboolean overflow = ((a ^ sum) & (b ^ sum)) < 0;"
  },
  {
    question: "What is the famous Joshua Bloch 1986 binary search midpoint overflow bug?",
    shortAnswer: "Writing `int mid = (low + high) / 2` overflows to negative when `low + high > 2,147,483,647`, crashing array access with `ArrayIndexOutOfBoundsException`.",
    explanation: "Fix: `int mid = (low + high) >>> 1;` or `int mid = low + (high - low) / 2;`.",
    hint: "(low + high) / 2 overflows into negative numbers.",
    level: "intermediate",
    codeExample: "int mid = (low + high) >>> 1; // Overflow immune"
  },
  {
    question: "What happens when `Math.negateExact(Integer.MIN_VALUE)` is executed?",
    shortAnswer: "Throws `ArithmeticException: integer overflow`.",
    explanation: "In two's complement, `-Integer.MIN_VALUE` would be `+2147483648`, which exceeds `Integer.MAX_VALUE` (`2147483647`).",
    hint: "Negating Integer.MIN_VALUE overflows 32-bit capacity.",
    level: "advanced",
    codeExample: "int neg = Math.negateExact(Integer.MIN_VALUE); // Throws exception"
  },
  {
    question: "What does `Math.toIntExact(long val)` do when `val` exceeds 32 bits?",
    shortAnswer: "Throws `ArithmeticException: integer overflow`.",
    explanation: "Guarantees safe narrowing from `long` to `int`.",
    hint: "Throws exception if long doesn't fit in int.",
    level: "basic",
    codeExample: "int i = Math.toIntExact(3000000000L); // Throws ArithmeticException"
  },
  {
    question: "What happens when `Integer.MIN_VALUE * -1` is executed with standard `*` operator?",
    shortAnswer: "Silently evaluates back to `Integer.MIN_VALUE` (`-2147483648`)!",
    explanation: "Classic two's complement arithmetic asymmetry trap.",
    hint: "Remains Integer.MIN_VALUE.",
    level: "expert",
    codeExample: "int x = Integer.MIN_VALUE * -1; // -2147483648"
  },
  {
    question: "What happens when you add `Long.MAX_VALUE + 1` in Java?",
    shortAnswer: "Silently wraps around to `Long.MIN_VALUE` (`-9223372036854775808L`).",
    explanation: "Standard 64-bit two's complement overflow.",
    hint: "Wraps to Long.MIN_VALUE.",
    level: "basic",
    codeExample: "long l = Long.MAX_VALUE + 1; // Long.MIN_VALUE"
  },
  {
    question: "How do you calculate compound interest over 30 years without overflow in financial applications?",
    shortAnswer: "Use `BigDecimal` with explicit scale and rounding modes (`RoundingMode.HALF_EVEN`).",
    explanation: "Prevents overflow and avoids floating-point binary approximations.",
    hint: "Use BigDecimal with RoundingMode.",
    level: "basic",
    codeExample: "BigDecimal amount = principal.multiply(rate.pow(years));"
  },
  {
    question: "In the Coder & AccoTax Barrackpore endowment audit engine, how is long overflow prevented?",
    shortAnswer: "By using `Math.addExact(currentFunds, donationAmount)`.",
    explanation: "Detects if campus funds in Indian Rupees (₹) exceed 64-bit integer limits.",
    hint: "Math.addExact for long totals.",
    level: "basic",
    codeExample: "long total = Math.addExact(funds, donation);"
  },
  {
    question: "What is the result of `Float.MAX_VALUE * 2`?",
    shortAnswer: "`Float.POSITIVE_INFINITY`.",
    explanation: "32-bit float overflow produces positive infinity.",
    hint: "Becomes Float.POSITIVE_INFINITY.",
    level: "basic",
    codeExample: "float f = Float.MAX_VALUE * 2; // Float.POSITIVE_INFINITY"
  },
  {
    question: "What is the result of `1.0 / Double.POSITIVE_INFINITY`?",
    shortAnswer: "`0.0`.",
    explanation: "Dividing by infinity underflows to zero.",
    hint: "Evaluates to 0.0.",
    level: "basic",
    codeExample: "double zero = 1.0 / Double.POSITIVE_INFINITY; // 0.0"
  },
  {
    question: "Can integer overflow occur in loop counters (e.g. `for (int i = 0; i <= Integer.MAX_VALUE; i++)`)?",
    shortAnswer: "Yes! When `i` reaches `MAX_VALUE`, `i++` wraps to `MIN_VALUE`, creating an INFINITE LOOP!",
    explanation: "The condition `i <= Integer.MAX_VALUE` is always true.",
    hint: "i++ wraps to negative, creating an infinite loop.",
    level: "intermediate",
    codeExample: "// for (int i = 0; i <= Integer.MAX_VALUE; i++) // INFINITE LOOP!"
  },
  {
    question: "How do you safely iterate up to `Integer.MAX_VALUE` in a loop?",
    shortAnswer: "Use a `long` loop variable: `for (long i = 0; i <= Integer.MAX_VALUE; i++)`.",
    explanation: "Prevents 32-bit loop counter wrap-around.",
    hint: "Use long loop counter.",
    level: "basic",
    codeExample: "for (long i = 0; i <= Integer.MAX_VALUE; i++) { }"
  },
  {
    question: "What method in `java.lang.Math` handles division with flooring to prevent truncation discrepancies?",
    shortAnswer: "`Math.floorDiv(x, y)` and `Math.floorMod(x, y)`.",
    explanation: "Produces mathematical floor division towards negative infinity.",
    hint: "Math.floorDiv and Math.floorMod.",
    level: "basic",
    codeExample: "int res = Math.floorDiv(-7, 2); // -4"
  },
  {
    question: "What is the performance difference between primitive arithmetic and `BigInteger`?",
    shortAnswer: "Primitive arithmetic runs in single CPU clock cycles on hardware registers; `BigInteger` allocates heap objects with array manipulation, running ~10-50x slower.",
    explanation: "Use primitives with `Math.*Exact()` for high-throughput code, and `BigInteger` when values exceed 64-bit limits.",
    hint: "Primitives are single-cycle hardware operations; BigInteger allocates heap.",
    level: "advanced",
    codeExample: "// Primitives for speed, BigInteger for unbounded magnitude"
  },
  {
    question: "What is the result of `Math.decrementExact(Integer.MIN_VALUE)`?",
    shortAnswer: "Throws `ArithmeticException: integer overflow`.",
    explanation: "Subtracting 1 from minimum integer overflows 32-bit bounds.",
    hint: "Throws ArithmeticException.",
    level: "basic",
    codeExample: "int x = Math.decrementExact(Integer.MIN_VALUE); // Throws exception"
  },
  {
    question: "What is the result of `Math.incrementExact(Integer.MAX_VALUE)`?",
    shortAnswer: "Throws `ArithmeticException: integer overflow`.",
    explanation: "Adding 1 to maximum integer overflows 32-bit bounds.",
    hint: "Throws ArithmeticException.",
    level: "basic",
    codeExample: "int x = Math.incrementExact(Integer.MAX_VALUE); // Throws exception"
  },
  {
    question: "Can `BigInteger` ever overflow in Java?",
    shortAnswer: "Only if total bits exceed JVM heap memory or `Integer.MAX_VALUE` bit count (virtually impossible under normal operation).",
    explanation: "Practically unbounded for enterprise computing.",
    hint: "Unbounded within available heap memory.",
    level: "basic",
    codeExample: "BigInteger unlim = new BigInteger(\"1\").shiftLeft(10000);"
  },
  {
    question: "What is the ultimate takeaway of Topic 21 for Java developers?",
    shortAnswer: "Silent integer wrap-around is a major source of software vulnerabilities; always use Java 8+ `Math.*Exact()` methods, upcast to `long` before addition, or utilize `BigInteger`/`BigDecimal` for mission-critical financial applications.",
    explanation: "Mastering overflow and underflow detection guarantees bulletproof numeric computation across enterprise software.",
    hint: "Use Math.*Exact(), upcast before addition, or use BigDecimal for finance.",
    level: "basic",
    codeExample: "// Summary: Math.addExact, Math.toIntExact, BigDecimal for financial calculations"
  },
  {
    question: "What is the next Module after Module 001_003 in the Java Core Roadmap?",
    shortAnswer: "Module 001_004: Control Flow: Decision Making, Branching & Pattern Matching (if, else, switch expressions, yield).",
    explanation: "Module 001_004 covers conditional routing, enhanced switch statements, and modern Java pattern matching.",
    hint: "Module 001_004 Control Flow.",
    level: "basic",
    codeExample: "// Next: Module 001_004 Control Flow"
  }
];

export default questions;
