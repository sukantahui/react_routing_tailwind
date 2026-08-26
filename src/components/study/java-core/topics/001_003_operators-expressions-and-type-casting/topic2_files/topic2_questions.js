/**
 * Module 001_003: Topic 2: Integer division truncation vs floating-point division
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Integer Division in Java and how does it handle fractional parts?",
    shortAnswer: "When both operands of `/` are integers, Java discards (truncates) the decimal/fractional part towards zero.",
    explanation: "For example, `7 / 2` yields `3` (the `0.5` remainder is truncated), and `-7 / 2` yields `-3`.",
    hint: "Discards decimal part towards zero.",
    level: "basic",
    codeExample: "int result = 7 / 2; // 3"
  },
  {
    question: "Why does `double d = 7 / 2;` result in `3.0` instead of `3.5` in Java?",
    shortAnswer: "Because `7 / 2` is evaluated first as integer division (producing `3`), which is then widened to `3.0` during assignment.",
    explanation: "Expression evaluation occurs before variable assignment. The integer division truncates to `3` before `d` ever receives the value.",
    hint: "Division completes as integer arithmetic before assignment to double.",
    level: "basic",
    codeExample: "double d = 7 / 2; // 3.0 (Buggy!)\ndouble fixed = 7.0 / 2; // 3.5 (Correct!)"
  },
  {
    question: "How do you ensure floating-point division when dividing two integer variables `int a` and `int b`?",
    shortAnswer: "Cast at least one variable to `double`: `(double) a / b` or `a / (double) b`.",
    explanation: "Casting `a` to `double` forces Binary Numeric Promotion, widening `b` to `double` and executing floating-point division.",
    hint: "Cast at least one operand to double.",
    level: "basic",
    codeExample: "int a = 7, b = 2;\ndouble res = (double) a / b; // 3.5"
  },
  {
    question: "What is the difference between Truncation towards zero and Floor rounding?",
    shortAnswer: "Truncation rounds towards `0` (e.g. `-3.5` $\\to$ `-3`); Floor rounding rounds towards negative infinity (e.g. `-3.5` $\\to$ `-4`).",
    explanation: "For positive numbers, truncation and floor produce identical results (`3.5` $\\to$ `3`). For negative numbers, truncation moves towards zero (`-3`), while floor moves down (`-4`).",
    hint: "Truncation = towards 0; Floor = towards negative infinity.",
    level: "intermediate",
    codeExample: "int trunc = -7 / 2;        // -3\nint floor = Math.floorDiv(-7, 2); // -4"
  },
  {
    question: "What is `Math.floorDiv(int x, int y)` introduced in Java 8?",
    shortAnswer: "A static utility method that returns the largest integer that is less than or equal to the algebraic quotient.",
    explanation: "Unlike the standard `/` operator which truncates towards zero, `Math.floorDiv()` performs true mathematical floor division, essential for clock time, calendar dates, and grid coordinates.",
    hint: "Performs mathematical floor division.",
    level: "intermediate",
    codeExample: "int res = Math.floorDiv(-7, 2); // -4"
  },
  {
    question: "What does `Math.floor(double a)` return?",
    shortAnswer: "The largest double value that is less than or equal to the argument and is equal to a mathematical integer.",
    explanation: "`Math.floor(3.75)` returns `3.0`; `Math.floor(-3.75)` returns `-4.0`.",
    hint: "Rounds down towards negative infinity.",
    level: "basic",
    codeExample: "double f1 = Math.floor(3.75);  // 3.0\ndouble f2 = Math.floor(-3.75); // -4.0"
  },
  {
    question: "What does `Math.ceil(double a)` return?",
    shortAnswer: "The smallest double value that is greater than or equal to the argument and is equal to a mathematical integer.",
    explanation: "`Math.ceil(3.25)` returns `4.0`; `Math.ceil(-3.25)` returns `-3.0`.",
    hint: "Rounds up towards positive infinity.",
    level: "basic",
    codeExample: "double c1 = Math.ceil(3.25);  // 4.0\ndouble c2 = Math.ceil(-3.25); // -3.0"
  },
  {
    question: "What does `Math.round(double a)` return?",
    shortAnswer: "The closest `long` (or `int` for float) to the argument, rounding ties towards positive infinity (e.g. `+0.5` rounds up).",
    explanation: "`Math.round(3.5)` returns `4`; `Math.round(3.4)` returns `3`; `Math.round(-3.5)` returns `-3`.",
    hint: "Standard mathematical half-up rounding.",
    level: "basic",
    codeExample: "long r1 = Math.round(3.5);  // 4\nlong r2 = Math.round(-3.5); // -3"
  },
  {
    question: "What is the common bug when calculating student grade averages in Java?",
    shortAnswer: "Writing `(m1 + m2 + m3) / 3` instead of `(m1 + m2 + m3) / 3.0`.",
    explanation: "Dividing the sum by integer `3` truncates the fractional percentage points (e.g. `254 / 3` yields `84` instead of `84.67`).",
    hint: "Divide by 3.0 instead of integer 3.",
    level: "basic",
    codeExample: "double avg = (m1 + m2 + m3) / 3.0; // Correct float average"
  },
  {
    question: "What JVM bytecode instruction is executed for integer division vs double division?",
    shortAnswer: "`idiv` for 32-bit integer division; `ddiv` for 64-bit double floating-point division.",
    explanation: "`idiv` performs integer division with truncation; `ddiv` executes hardware IEEE 754 floating-point division.",
    hint: "idiv vs ddiv in bytecode.",
    level: "advanced",
    codeExample: "// int a / b -> idiv\n// double a / b -> ddiv"
  },
  {
    question: "What happens when you divide `0 / 5` in Java?",
    shortAnswer: "`0`.",
    explanation: "Zero divided by any non-zero number is zero.",
    hint: "0 / n = 0.",
    level: "basic",
    codeExample: "int zero = 0 / 5; // 0"
  },
  {
    question: "What happens when you divide `5 / 0` in Java?",
    shortAnswer: "Throws `java.lang.ArithmeticException: / by zero`.",
    explanation: "Integer division by zero is mathematically undefined and trapped as a runtime exception.",
    hint: "Division by zero throws ArithmeticException.",
    level: "basic",
    codeExample: "// int err = 5 / 0; // THROWS ArithmeticException"
  },
  {
    question: "What happens when you divide `5.0 / 0.0` in Java?",
    shortAnswer: "`Double.POSITIVE_INFINITY`.",
    explanation: "Floating-point division by 0.0 follows IEEE 754 rules and does not throw an exception.",
    hint: "Yields Infinity.",
    level: "basic",
    codeExample: "double inf = 5.0 / 0.0; // Infinity"
  },
  {
    question: "What is `Math.floorMod(int x, int y)` in Java 8+?",
    shortAnswer: "Computes the floor modulus, defined as `x - floorDiv(x, y) * y`.",
    explanation: "Unlike standard `%` whose sign follows dividend `x`, `Math.floorMod(x, y)` produces a remainder whose sign matches the divisor `y`.",
    hint: "Modulus companion to floorDiv.",
    level: "advanced",
    codeExample: "int mod = Math.floorMod(-7, 2); // 1 (matches divisor sign +2)"
  },
  {
    question: "Why is `Math.floorMod` particularly useful for circular arrays and clock hour calculations?",
    shortAnswer: "Because it prevents negative index wraps (e.g. `Math.floorMod(-1, 12)` is `11`, whereas `-1 % 12` is `-1`).",
    explanation: "In clock math, subtracting 1 hour from 12 AM (0) should wrap to 11 PM. `floorMod` naturally wraps into positive circular indices.",
    hint: "Wraps negative numbers into valid positive indices.",
    level: "advanced",
    codeExample: "int clockHour = Math.floorMod(currentHour - 3, 12);"
  },
  {
    question: "What is the result of `(int) (7.9 / 2.0)`?",
    shortAnswer: "`3`.",
    explanation: "`7.9 / 2.0` evaluates to `3.95` (double), and casting `(int)` truncates decimals to `3`.",
    hint: "Casting double to int truncates decimals.",
    level: "intermediate",
    codeExample: "int res = (int) (7.9 / 2.0); // 3"
  },
  {
    question: "What is the difference between `(double)(a / b)` and `(double) a / b`?",
    shortAnswer: "`(double)(a / b)` casts AFTER integer truncation has already occurred; `(double) a / b` casts BEFORE division to preserve fractions.",
    explanation: "Parentheses around `(a / b)` force integer division first. Casting `a` directly promotes the division to floating point.",
    hint: "Cast before division, not after.",
    level: "intermediate",
    codeExample: "int a = 5, b = 2;\ndouble wrong = (double)(a / b); // 2.0\ndouble right = (double) a / b;  // 2.5"
  },
  {
    question: "How do you calculate ceiling division for positive integers without floating-point conversion?",
    shortAnswer: "`int ceilDiv = (a + b - 1) / b;` or in Java 18+: `Math.ceilDiv(a, b)`.",
    explanation: "Adding `b - 1` ensures that any remainder pushes the quotient to the next integer. Java 18+ provides built-in `Math.ceilDiv()`.",
    hint: "(a + b - 1) / b or Math.ceilDiv(a, b).",
    level: "advanced",
    codeExample: "int pages = (totalItems + pageSize - 1) / pageSize;\n// Java 18+: int pages = Math.ceilDiv(totalItems, pageSize);"
  },
  {
    question: "What is the result of `1 / 3 * 3` in Java?",
    shortAnswer: "`0`.",
    explanation: "Left-to-Right evaluation: `1 / 3` is integer division resulting in `0`. `0 * 3` is `0`.",
    hint: "1 / 3 = 0, then 0 * 3 = 0.",
    level: "basic",
    codeExample: "int val = 1 / 3 * 3; // 0"
  },
  {
    question: "What is the result of `1.0 / 3 * 3` in Java?",
    shortAnswer: "`1.0` (or `0.9999999999999999` depending on IEEE 754 precision).",
    explanation: "`1.0 / 3` is floating-point division resulting in `0.3333333333333333`, which when multiplied by `3` yields `1.0`.",
    hint: "Floating-point division preserves fractional precision.",
    level: "basic",
    codeExample: "double val = 1.0 / 3 * 3; // 1.0"
  },
  {
    question: "Can integer division overflow in Java?",
    shortAnswer: "Yes, exactly one edge case: `Integer.MIN_VALUE / -1` overflows and returns `Integer.MIN_VALUE`.",
    explanation: "Because `Integer.MIN_VALUE` is `-2147483648`, dividing by `-1` would require `+2147483648`, which exceeds `Integer.MAX_VALUE` (2147483647), wrapping back to `Integer.MIN_VALUE`.",
    hint: "Integer.MIN_VALUE / -1 overflows.",
    level: "expert",
    codeExample: "int overflow = Integer.MIN_VALUE / -1; // -2147483648"
  },
  {
    question: "What method in Java 8+ detects division overflow for `Integer.MIN_VALUE / -1`?",
    shortAnswer: "`Math.divideExact(a, b)`.",
    explanation: "`Math.divideExact()` throws `ArithmeticException` on division by zero OR integer overflow.",
    hint: "Math.divideExact() throws on overflow.",
    level: "advanced",
    codeExample: "// Math.divideExact(Integer.MIN_VALUE, -1); // THROWS ArithmeticException: integer overflow"
  },
  {
    question: "What is the result of `10L / 4` in Java?",
    shortAnswer: "`2L` of type `long`.",
    explanation: "`4` is promoted to `4L`, and long integer division produces `2L` with truncation.",
    hint: "Promoted to long, truncates to 2L.",
    level: "basic",
    codeExample: "long val = 10L / 4; // 2L"
  },
  {
    question: "How do you format a floating-point division result to exactly 2 decimal places?",
    shortAnswer: "Use `String.format(\"%.2f\", val)` or `System.out.printf(\"%.2f\", val)`.",
    explanation: "`%.2f` rounds and formats floating-point values to two decimal places.",
    hint: "%.2f format specifier.",
    level: "basic",
    codeExample: "double avg = 84.666666;\nSystem.out.printf(\"Average: %.2f%%%n\", avg); // 84.67%"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student fee per hour calculation, how is division utilized?",
    shortAnswer: "`hourlyRate = courseFee / totalCourseHours;` where `courseFee` is `double`.",
    explanation: "Because `courseFee` is a double, floating-point division is executed, yielding the exact hourly rate in Indian Rupees (₹).",
    hint: "Double division computes exact hourly fees.",
    level: "basic",
    codeExample: "double fee = 15000.0;\nint hours = 48;\ndouble hourlyRate = fee / hours; // ₹312.50/hr"
  },
  {
    question: "What happens when you divide `Float.MIN_VALUE / 2.0f`?",
    shortAnswer: "It performs floating-point subnormal division, eventually underflowing to `0.0f`.",
    explanation: "Underflow gradually approaches zero without throwing an exception.",
    hint: "Underflows to 0.0f.",
    level: "expert",
    codeExample: "float tiny = Float.MIN_VALUE / 2.0f; // Subnormal float"
  },
  {
    question: "What is the difference between `Math.round(x)` and `(int) Math.round(x)` for double inputs?",
    shortAnswer: "`Math.round(double)` returns a `long`; casting `(int)` is needed if assigning to an `int` variable.",
    explanation: "To prevent accidental narrowing errors, `Math.round(double)` returns a 64-bit `long`.",
    hint: "Math.round(double) returns long.",
    level: "intermediate",
    codeExample: "int rounded = (int) Math.round(3.75);"
  },
  {
    question: "Why should `BigDecimal.divide()` be used for financial accounting instead of `/`?",
    shortAnswer: "Because `BigDecimal.divide()` provides explicit rounding modes (e.g. `RoundingMode.HALF_UP`) and eliminates IEEE 754 precision errors.",
    explanation: "Financial laws require deterministic rounding to exact paise/cents.",
    hint: "BigDecimal allows specifying RoundingMode.",
    level: "advanced",
    codeExample: "BigDecimal fee = new BigDecimal(\"15000.00\");\nBigDecimal installment = fee.divide(new BigDecimal(\"3\"), 2, RoundingMode.HALF_UP);"
  },
  {
    question: "What is the ultimate takeaway of Topic 2 for Java developers?",
    shortAnswer: "Never assume `/` returns floating-point numbers when dividing integer operands—always cast or use float literals (`3.0`) to avoid silent truncation bugs.",
    explanation: "Understanding integer truncation vs float division is the cornerstone of accurate grading, financial, and geometric computations.",
    hint: "Cast before dividing to prevent integer truncation.",
    level: "basic",
    codeExample: "// Summary: 7 / 2 = 3; (double) 7 / 2 = 3.5; Math.floorDiv(-7, 2) = -4"
  },
  {
    question: "What is the next topic (Topic 3) in Module 001_003?",
    shortAnswer: "Modulus operator with positive, negative, and floating-point numbers.",
    explanation: "Topic 3 deep-dives into mathematical proofs, cyclic indexing, and negative modulus edge cases.",
    hint: "Modulus operator deep dive.",
    level: "basic",
    codeExample: "// Topic 3: Modulus deep dive"
  }
];

export default questions;
