/**
 * Topic 9: Floating-point literals: float (F suffix) vs double (D suffix / default) and IEEE 754 precision
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the default data type of a decimal floating-point literal like 3.14 in Java?",
    shortAnswer: "The default data type is double (64-bit IEEE 754 floating point).",
    explanation: "In Java, any numeric literal containing a decimal point (like 3.14, 0.0, -15.82) is automatically treated as a 64-bit double literal by the compiler. To assign it to a 32-bit float variable, an explicit 'f' or 'F' suffix is required.",
    hint: "Think about why `float f = 3.14;` causes a compilation error.",
    level: "basic",
    codeExample: "double d = 3.14;   // Valid (default double)\nfloat f = 3.14f;   // Valid (explicit float suffix)\n// float f2 = 3.14; // Compilation Error!"
  },
  {
    question: "Why does `float f = 5.75;` fail to compile in Java?",
    shortAnswer: "Because 5.75 is a double (8 bytes) and cannot be assigned to float (4 bytes) without explicit suffix or casting.",
    explanation: "Assigning an 8-byte double literal to a 4-byte float variable causes a narrowing primitive conversion, which risks precision loss. The Java compiler forbids implicit narrowing conversions from double to float.",
    hint: "Float requires an 'f' or 'F' suffix: `5.75f` or `5.75F`.",
    level: "basic",
    codeExample: "float f1 = 5.75f;         // Correct\nfloat f2 = (float) 5.75;  // Also valid via explicit cast"
  },
  {
    question: "What is the storage size and precision of `float` vs `double` in Java?",
    shortAnswer: "Float is 32 bits (4 bytes, ~6-7 significant decimal digits); Double is 64 bits (8 bytes, ~15-17 significant decimal digits).",
    explanation: "Java follows the IEEE 754 standard for floating-point arithmetic. A 32-bit float has 1 sign bit, 8 exponent bits, and 23 mantissa bits (~7 decimal digits of precision). A 64-bit double has 1 sign bit, 11 exponent bits, and 52 mantissa bits (~15-17 decimal digits of precision).",
    hint: "Double provides double the precision (64 bits vs 32 bits).",
    level: "basic",
    codeExample: "float f = 1.123456789f; // Stored as ~1.1234568\ndouble d = 1.12345678901234567; // Stored precisely"
  },
  {
    question: "How do you write floating-point numbers in scientific / exponential notation in Java?",
    shortAnswer: "Use 'e' or 'E' representing powers of 10 (e.g. 1.5e3 = 1500.0).",
    explanation: "Scientific notation allows compact representation of very large or very small real numbers. `1.989e30` means 1.989 × 10^30 (solar mass). Negative exponents like `1.6e-19` represent 1.6 × 10^-19.",
    hint: "`e` stands for exponent (power of 10).",
    level: "basic",
    codeExample: "double lightSpeed = 3.0e8;   // 300,000,000.0 m/s\ndouble microSecond = 1.0e-6; // 0.000001 seconds"
  },
  {
    question: "Why does `System.out.println(0.1 + 0.2 == 0.3);` print `false` in Java?",
    shortAnswer: "Because 0.1 and 0.2 cannot be represented exactly in binary floating-point, causing a tiny rounding discrepancy.",
    explanation: "Binary floating-point represents numbers as sums of negative powers of 2 (1/2, 1/4, 1/8, 1/16, ...). Fractions like 0.1 (1/10) and 0.2 (1/5) become repeating infinite fractions in binary, just like 1/3 is in base 10. `0.1 + 0.2` results in `0.30000000000000004`.",
    hint: "Remember base-2 representation cannot represent all base-10 fractions cleanly.",
    level: "intermediate",
    codeExample: "double sum = 0.1 + 0.2;\nSystem.out.println(sum); // 0.30000000000000004\nSystem.out.println(sum == 0.3); // false"
  },
  {
    question: "Which class should you use for financial, banking, and currency computations in Java?",
    shortAnswer: "java.math.BigDecimal with String-based constructors.",
    explanation: "Never use float or double for currency or accounting calculations because binary rounding errors accumulate. `BigDecimal` provides arbitrary-precision signed decimal arithmetic and exact control over rounding modes.",
    hint: "Always instantiate BigDecimal using Strings: `new BigDecimal(\"12500.50\")`.",
    level: "intermediate",
    codeExample: "BigDecimal price = new BigDecimal(\"12500.10\");\nBigDecimal tax = new BigDecimal(\"8750.20\");\nBigDecimal total = price.add(tax); // Exactly 21250.30"
  },
  {
    question: "Why should you avoid `new BigDecimal(0.1)` and prefer `new BigDecimal(\"0.1\")`?",
    shortAnswer: "`new BigDecimal(0.1)` passes the already-imprecise double value into the constructor.",
    explanation: "`new BigDecimal(0.1)` evaluates the binary double representation of 0.1 first, producing `0.1000000000000000055511151231257827021181583404541015625`. Using the String constructor `new BigDecimal(\"0.1\")` passes the exact decimal text.",
    hint: "String constructor preserves exact human decimal intention.",
    level: "intermediate",
    codeExample: "BigDecimal bad = new BigDecimal(0.1); // Imprecise!\nBigDecimal good = new BigDecimal(\"0.1\"); // Exact 0.1\nBigDecimal alsoGood = BigDecimal.valueOf(0.1); // Also safe"
  },
  {
    question: "What happens when you divide a floating-point number by zero in Java (e.g. `10.0 / 0.0`)?",
    shortAnswer: "It returns `Double.POSITIVE_INFINITY` without throwing an `ArithmeticException`.",
    explanation: "Unlike integer division by zero (`10 / 0`) which throws `java.lang.ArithmeticException: / by zero`, floating-point arithmetic adheres to IEEE 754 standards where division by 0.0 produces signed Infinity (`Infinity` or `-Infinity`).",
    hint: "Floating-point has special infinity representations.",
    level: "intermediate",
    codeExample: "double res = 10.0 / 0.0;\nSystem.out.println(res); // Prints: Infinity\nSystem.out.println(Double.isInfinite(res)); // true"
  },
  {
    question: "What is `NaN` in Java floating-point arithmetic, and how is it generated?",
    shortAnswer: "`NaN` stands for 'Not-a-Number', generated by undefined mathematical operations like `0.0 / 0.0` or `Math.sqrt(-4)`.",
    explanation: "When an arithmetic operation has no mathematically defined real number result, IEEE 754 defines a special quiet NaN value. Operations with NaN always return NaN.",
    hint: "0.0 / 0.0 is an indeterminate form.",
    level: "intermediate",
    codeExample: "double nan1 = 0.0 / 0.0;\ndouble nan2 = Math.sqrt(-9.0);\nSystem.out.println(nan1); // NaN\nSystem.out.println(Double.isNaN(nan1)); // true"
  },
  {
    question: "Why does `NaN == NaN` return `false` in Java?",
    shortAnswer: "According to IEEE 754, NaN is not equal to any value, including itself.",
    explanation: "Because NaN represents an undefined or indeterminate state, two indeterminate operations cannot be assumed equal. To check if a variable contains NaN, you must use `Double.isNaN(value)` or `Float.isNaN(value)`.",
    hint: "Use `Double.isNaN(x)` instead of `x == Double.NaN`.",
    level: "advanced",
    codeExample: "double x = 0.0 / 0.0;\nSystem.out.println(x == x); // false!\nSystem.out.println(Double.isNaN(x)); // true"
  },
  {
    question: "Can an integer literal be assigned to a floating-point variable without explicit casting?",
    shortAnswer: "Yes, widening primitive conversion occurs automatically from integer types (byte, short, char, int, long) to float or double.",
    explanation: "Java allows automatic widening conversions because floating-point types can accommodate the magnitude of integer types. Note: converting a 64-bit long with all 64 bits populated to a 32-bit float may lose lower-order precision bits.",
    hint: "Widening primitive conversions are implicit in Java.",
    level: "basic",
    codeExample: "int count = 42;\ndouble d = count; // d becomes 42.0\nfloat f = 1000L;  // f becomes 1000.0f"
  },
  {
    question: "What are the bit allocations for IEEE 754 single-precision (float)?",
    shortAnswer: "1 sign bit, 8 exponent bits (biased by 127), 23 fraction/mantissa bits.",
    explanation: "Total: 32 bits. The value is calculated as: `(-1)^sign × (1 + fraction) × 2^(exponent - 127)`. The leading 1 before the binary point is normalized and implicit, giving 24 effective bits of precision.",
    hint: "1 + 8 + 23 = 32 bits.",
    level: "advanced",
    codeExample: "// Float.floatToIntBits(1.0f) returns binary layout 0x3F800000"
  },
  {
    question: "What are the bit allocations for IEEE 754 double-precision (double)?",
    shortAnswer: "1 sign bit, 11 exponent bits (biased by 1023), 52 fraction/mantissa bits.",
    explanation: "Total: 64 bits. The value is calculated as: `(-1)^sign × (1 + fraction) × 2^(exponent - 1023)`. It provides 53 effective bits of significand precision (~15.95 decimal digits).",
    hint: "1 + 11 + 52 = 64 bits.",
    level: "advanced",
    codeExample: "// Double.doubleToLongBits(1.0) returns binary layout 0x3FF0000000000000L"
  },
  {
    question: "How can you safely compare two floating-point numbers for approximate equality in Java?",
    shortAnswer: "Compare the absolute difference against a small threshold (epsilon): `Math.abs(a - b) < EPSILON`.",
    explanation: "Due to binary rounding artifacts, direct equality (`a == b`) fails frequently. An epsilon threshold (e.g. `1e-9`) defines the acceptable margin of floating-point error for scientific computations.",
    hint: "Delta / Epsilon comparison avoids exact binary match traps.",
    level: "intermediate",
    codeExample: "final double EPSILON = 1e-9;\ndouble a = 0.1 + 0.2;\ndouble b = 0.3;\nboolean areEqual = Math.abs(a - b) < EPSILON;\nSystem.out.println(areEqual); // true"
  },
  {
    question: "What is `Double.MIN_VALUE` in Java, and why is it NOT negative?",
    shortAnswer: "`Double.MIN_VALUE` is the smallest positive non-zero value (`4.9e-324`), not the most negative number.",
    explanation: "Unlike `Integer.MIN_VALUE` which is negative (`-2,147,483,648`), floating-point `MIN_VALUE` represents the smallest positive non-zero representable subnormal number. The most negative double is `-Double.MAX_VALUE`.",
    hint: "MIN_VALUE is the closest positive value to zero.",
    level: "intermediate",
    codeExample: "System.out.println(Double.MIN_VALUE); // 4.9E-324 (positive!)\nSystem.out.println(-Double.MAX_VALUE); // -1.7976931348623157E308"
  },
  {
    question: "What is a subnormal (denormalized) floating-point number in Java?",
    shortAnswer: "A non-zero number smaller than the normal minimum where the exponent is all zeros and the implicit leading bit is 0.",
    explanation: "Subnormal numbers provide gradual underflow, preventing numbers just below `Float.MIN_NORMAL` from abruptly snapping to zero. They sacrifice precision bits to represent tinier magnitudes close to zero.",
    hint: "Gradual underflow mechanism in IEEE 754.",
    level: "expert",
    codeExample: "float normalMin = Float.MIN_NORMAL; // 1.17549435E-38f\nfloat subnormal = Float.MIN_VALUE;   // 1.4E-45f (subnormal)"
  },
  {
    question: "What is the difference between positive zero (`+0.0`) and negative zero (`-0.0`) in Java?",
    shortAnswer: "They compare equal via `==` (`0.0 == -0.0` is true), but produce different results when dividing positive numbers.",
    explanation: "`+0.0` and `-0.0` have different sign bits in IEEE 754. `1.0 / 0.0` produces `+Infinity`, while `1.0 / -0.0` produces `-Infinity`. `Double.valueOf(0.0).equals(Double.valueOf(-0.0))` returns `false`.",
    hint: "`1.0 / 0.0` vs `1.0 / -0.0`.",
    level: "expert",
    codeExample: "System.out.println(0.0 == -0.0); // true\nSystem.out.println(1.0 / 0.0);  // Infinity\nSystem.out.println(1.0 / -0.0); // -Infinity"
  },
  {
    question: "Can floating-point numbers be used in `switch` statements in Java?",
    shortAnswer: "No, float and double expressions are not allowed in switch statements.",
    explanation: "Java switch expressions support byte, short, char, int, String, and enums. Because floating-point equality is inherently prone to precision variances, language designers excluded float and double from switch cases.",
    hint: "Exact match requirements in switch preclude floating-point precision noise.",
    level: "intermediate",
    codeExample: "double val = 2.5;\n// switch(val) { } // COMPILATION ERROR: Cannot switch on a value of type double"
  },
  {
    question: "What happens when you cast a floating-point value to an integer type (e.g. `(int) 9.99`)?",
    shortAnswer: "The fractional portion is truncated (discarded towards zero), not rounded.",
    explanation: "Narrowing conversion from float/double to int/long truncates the fractional part. `(int) 9.99` becomes `9`, and `(int) -9.99` becomes `-9`. To round to the nearest whole number, use `Math.round()`.",
    hint: "Truncation simply removes everything after the decimal dot.",
    level: "basic",
    codeExample: "double price = 999.85;\nint truncated = (int) price; // 999\nlong rounded = Math.round(price); // 1000"
  },
  {
    question: "What happens if a floating-point value exceeding integer capacity is cast to `int`?",
    shortAnswer: "It clamps to `Integer.MAX_VALUE` or `Integer.MIN_VALUE` without wrapping around.",
    explanation: "When casting float/double to int, values greater than 2,147,483,647 clamp to `Integer.MAX_VALUE`, and values below -2,147,483,648 clamp to `Integer.MIN_VALUE`. If the value is NaN, casting to int yields `0`.",
    hint: "Clamping occurs during float-to-int conversion.",
    level: "advanced",
    codeExample: "double large = 1.0e15;\nint clamped = (int) large; // 2147483647 (Integer.MAX_VALUE)\nint nanCast = (int) (0.0 / 0.0); // 0"
  },
  {
    question: "How does `Double.compare(double d1, double d2)` differ from using `==`?",
    shortAnswer: "`Double.compare` correctly handles NaN (treating `NaN == NaN` as 0) and distinguishes `-0.0` from `+0.0`.",
    explanation: "While `==` considers `NaN != NaN` and `0.0 == -0.0`, `Double.compare()` provides total ordering: `-0.0 < +0.0`, and `NaN` is considered equal to itself and greater than `Double.POSITIVE_INFINITY`.",
    hint: "`Double.compare` is used by sort algorithms and TreeSet/TreeMap.",
    level: "advanced",
    codeExample: "System.out.println(Double.compare(0.0/0.0, 0.0/0.0)); // 0 (Equal in total ordering)\nSystem.out.println(Double.compare(-0.0, 0.0)); // -1 (-0.0 is less than +0.0)"
  },
  {
    question: "Can you write hexadecimal floating-point literals in Java?",
    shortAnswer: "Yes, starting with `0x` followed by hexadecimal significand and a binary exponent marked by `p` or `P`.",
    explanation: "Introduced in Java 5, hex float literals allow exact specification of binary floats without decimal conversion rounding. `0x1.0p0` is `1.0`, and `0x1.0p3` is 1.0 × 2^3 = `8.0`.",
    hint: "`p` stands for power of 2 in hex floating-point literals.",
    level: "expert",
    codeExample: "double hexFloat = 0x1.0p3; // 1.0 * 2^3 = 8.0\nfloat hexF = 0x1.8p1f;     // 1.5 * 2^1 = 3.0f"
  },
  {
    question: "What is the `strictfp` keyword in Java and its current status in modern Java?",
    shortAnswer: "`strictfp` forced exact IEEE 754 floating-point matching across CPU architectures; it became obsolete in Java 17.",
    explanation: "Historically, x86 CPUs used 80-bit extended precision registers in hardware, causing slight differences from strict 64-bit IEEE arithmetic. `strictfp` restricted JVMs to strict 32/64-bit math. In Java 17+, all floating-point operations are strictly IEEE 754 compliant by default.",
    hint: "Strict floating point is permanently active in Java 17 and later.",
    level: "expert",
    codeExample: "// In Java 17+, strictfp is a no-op and generates a compiler warning"
  },
  {
    question: "What is machine epsilon in IEEE 754 floating-point arithmetic?",
    shortAnswer: "The smallest positive number $\\epsilon$ such that $1.0 + \\epsilon \\neq 1.0$.",
    explanation: "Machine epsilon measures relative precision limit due to finite mantissa bits. For 32-bit float, machine epsilon is approximately $2^{-23} \\approx 1.19 \\times 10^{-7}$; for 64-bit double, it is $2^{-52} \\approx 2.22 \\times 10^{-16}$.",
    hint: "Threshold of relative precision in floating point units.",
    level: "expert",
    codeExample: "System.out.println(Math.ulp(1.0)); // 2.220446049250313E-16"
  },
  {
    question: "What is `Math.ulp(double d)` in Java?",
    shortAnswer: "`Math.ulp` returns the Unit in the Last Place (distance to the next adjacent representable floating-point number).",
    explanation: "ULP (Unit of Least Precision) indicates the spacing between floating point numbers at a specific magnitude. As magnitude grows, the distance between representable numbers grows proportionally.",
    hint: "ULP = Unit in Last Place.",
    level: "expert",
    codeExample: "System.out.println(Math.ulp(1.0));    // 2.220446049250313E-16\nSystem.out.println(Math.ulp(1000.0)); // 1.1368683772161603E-13"
  },
  {
    question: "Why does adding a tiny float to a huge float sometimes produce no change at all?",
    shortAnswer: "Because the tiny number is shifted so far right during exponent alignment that its bits fall off the 23-bit mantissa.",
    explanation: "To add two floating-point numbers, their binary exponents must be equalized by shifting the smaller number's mantissa right. If the exponent difference exceeds the mantissa bit width (24 bits for float), the smaller value becomes zero.",
    hint: "Catastrophic cancellation / absorption error.",
    level: "advanced",
    codeExample: "float huge = 100_000_000f;\nfloat tiny = 0.0001f;\nfloat result = huge + tiny;\nSystem.out.println(result == huge); // true! (tiny was completely lost)"
  },
  {
    question: "What is catastrophic cancellation in floating-point mathematics?",
    shortAnswer: "Severe loss of significant digits when subtracting two nearly equal floating-point numbers.",
    explanation: "When subtracting $a - b$ where $a \\approx b$, the leading significant bits cancel out, leaving only the noisy low-order rounding bits, which get magnified into large percentage errors.",
    hint: "Subtracting nearly equal floating-point numbers magnifies rounding noise.",
    level: "expert",
    codeExample: "double a = 1.00000000000001;\ndouble b = 1.00000000000000;\ndouble diff = a - b; // Loses most significant digits of accuracy"
  },
  {
    question: "How should you format floating-point output to 2 decimal places for Indian Rupees in Java?",
    shortAnswer: "Use `String.format(\"₹%.2f\", amount)` or `DecimalFormat(\"₹#,##,##0.00\")`.",
    explanation: "`System.out.printf` and `DecimalFormat` allow formatted decimal output without altering the underlying precision until presentation time.",
    hint: "Use `printf` with `%.2f` specifier.",
    level: "basic",
    codeExample: "double fee = 14500.758;\nSystem.out.printf(\"Total Course Fee: ₹%.2f%n\", fee); // Total Course Fee: ₹14500.76"
  },
  {
    question: "Can a `double` variable store every possible `long` integer value without losing precision?",
    shortAnswer: "No, a double only has 53 bits of significand precision, so `long` values with more than 53 significant bits lose precision.",
    explanation: "A 64-bit `long` has 63 bits of magnitude precision. When converting large `long` values like `9,007,199,254,740,993L` to `double`, lower-order bits are rounded, producing `9.007199254740992E15`.",
    hint: "53 bits of double mantissa vs 64 bits of long integer.",
    level: "advanced",
    codeExample: "long bigLong = 9007199254740993L; // 2^53 + 1\ndouble d = bigLong;\nSystem.out.println((long) d); // 9007199254740992 (Lost 1!)"
  },
  {
    question: "What is the ultimate golden rule of floating-point numbers for Java developers?",
    shortAnswer: "Use double/float for physics, graphics, games, and scientific modeling; NEVER use them for money, banking, or discrete billing!",
    explanation: "In science and simulations, slight rounding errors are acceptable and speed is critical. In finance, e-commerce (such as Coder & AccoTax billing), banking, and taxation, exact fractional arithmetic with `BigDecimal` is mandatory.",
    hint: "Physics = float/double; Money & Banking = BigDecimal.",
    level: "basic",
    codeExample: "// Rule: Physics/Graphics -> double\n// Rule: Banking/Tax -> BigDecimal"
  }
];

export default questions;
