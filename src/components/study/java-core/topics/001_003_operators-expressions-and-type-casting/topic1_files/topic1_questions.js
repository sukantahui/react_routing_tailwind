/**
 * Module 001_003: Topic 1: Arithmetic operators: addition (+), subtraction (-), multiplication (*), division (/), modulus (%)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 5 basic binary arithmetic operators in Java?",
    shortAnswer: "Addition (`+`), Subtraction (`-`), Multiplication (`*`), Division (`/`), and Modulus/Remainder (`%`).",
    explanation: "These operators perform standard mathematical operations on numeric primitive operands (byte, short, char, int, long, float, double).",
    hint: "+, -, *, /, % are the 5 arithmetic operators.",
    level: "basic",
    codeExample: "int sum = 10 + 5;\nint diff = 10 - 5;\nint prod = 10 * 5;\nint quot = 10 / 5;\nint rem = 10 % 5;"
  },
  {
    question: "What is the mathematical definition and formula of the Modulus operator (`%`) in Java?",
    shortAnswer: "The remainder of integer or floating-point division, computed as `a % b = a - (a / b) * b`.",
    explanation: "For example, `14 % 4` computes `14 - (14 / 4) * 4` = `14 - (3 * 4)` = `14 - 12` = `2`.",
    hint: "a % b = a - (a / b) * b.",
    level: "basic",
    codeExample: "int rem = 14 % 4; // 2"
  },
  {
    question: "What rule governs the sign of the result of `a % b` in Java?",
    shortAnswer: "The sign of `a % b` ALWAYS matches the sign of the dividend `a` (the left operand), completely ignoring the sign of divisor `b`.",
    explanation: "Because `(-10) / 3` is `-3`, `-10 - (-3 * 3)` = `-10 - (-9)` = `-1`. Therefore, `-10 % 3 = -1` and `10 % -3 = 1`.",
    hint: "Sign of modulus result strictly follows the left operand (dividend).",
    level: "intermediate",
    codeExample: "System.out.println(-10 % 3);  // -1\nSystem.out.println(10 % -3);   // 1\nSystem.out.println(-10 % -3);  // -1"
  },
  {
    question: "Does Java support the modulus operator `%` on floating-point numbers (`float` and `double`)?",
    shortAnswer: "Yes, Java natively supports `%` on floating-point operands (unlike C/C++ which requires the `fmod()` function).",
    explanation: "In Java, `7.5 % 2.0` calculates `7.5 - (3 * 2.0)` = `1.5`.",
    hint: "Java supports double % double natively.",
    level: "intermediate",
    codeExample: "double rem = 7.5 % 2.0; // 1.5"
  },
  {
    question: "What happens when you divide an integer by zero (`10 / 0`) in Java?",
    shortAnswer: "The JVM throws a runtime `java.lang.ArithmeticException: / by zero`.",
    explanation: "Integer division by zero cannot produce a valid mathematical integer, so the CPU and JVM trap it with an unchecked `ArithmeticException`.",
    hint: "Throws ArithmeticException at runtime.",
    level: "basic",
    codeExample: "// int err = 10 / 0; // THROWS java.lang.ArithmeticException: / by zero"
  },
  {
    question: "What happens when you divide a floating-point number by zero (`10.0 / 0.0`) in Java?",
    shortAnswer: "It returns `Double.POSITIVE_INFINITY` without throwing any exception.",
    explanation: "Java implements the IEEE 754 standard for floating-point arithmetic. Division of non-zero floating-point by zero yields `Infinity` (or `-Infinity` if numerator is negative).",
    hint: "Floating-point division by 0.0 yields Infinity.",
    level: "intermediate",
    codeExample: "double res1 = 10.0 / 0.0;  // Double.POSITIVE_INFINITY\ndouble res2 = -10.0 / 0.0; // Double.NEGATIVE_INFINITY"
  },
  {
    question: "What is the result of `0.0 / 0.0` in Java floating-point arithmetic?",
    shortAnswer: "`Double.NaN` (Not-a-Number).",
    explanation: "Indeterminate mathematical operations like `0.0 / 0.0`, `Infinity - Infinity`, or `Math.sqrt(-1.0)` produce `Double.NaN`.",
    hint: "Zero divided by zero produces NaN.",
    level: "intermediate",
    codeExample: "double nan = 0.0 / 0.0; // Double.NaN"
  },
  {
    question: "What is integer division truncation in Java?",
    shortAnswer: "When both operands of `/` are integers, the fractional/decimal portion is discarded (truncated towards zero).",
    explanation: "`5 / 2` evaluates to integer `2` (not `2.5`), because both `5` and `2` are integer literals.",
    hint: "Discards decimal remainder towards zero.",
    level: "basic",
    codeExample: "int quotient = 5 / 2; // 2"
  },
  {
    question: "How do you get a fractional decimal result from integer division in Java?",
    shortAnswer: "Cast at least one operand to `double` or `float` before dividing: `(double) 5 / 2` or `5.0 / 2`.",
    explanation: "Casting one operand triggers Binary Numeric Promotion, widening the other operand to double and performing floating-point division.",
    hint: "Cast at least one operand to double.",
    level: "basic",
    codeExample: "double result = (double) 5 / 2; // 2.5"
  },
  {
    question: "What happens when binary arithmetic operators are applied to `byte`, `short`, or `char` types?",
    shortAnswer: "Java automatically promotes both operands to 32-bit `int` before performing the arithmetic.",
    explanation: "According to JLS §5.6.2, numeric operators do not exist for types narrower than `int`. Therefore, `byte + byte` produces an `int`.",
    hint: "Promoted to 32-bit int before arithmetic.",
    level: "intermediate",
    codeExample: "byte b1 = 10, b2 = 20;\n// byte b3 = b1 + b2; // COMPILER ERROR: Cannot convert int to byte\nbyte b3 = (byte)(b1 + b2); // Correct"
  },
  {
    question: "What is the order of precedence among the 5 arithmetic operators?",
    shortAnswer: "Multiplicative operators (`*`, `/`, `%`) have higher precedence than Additive operators (`+`, `-`).",
    explanation: "Both groups associate Left-to-Right.",
    hint: "* / % evaluated before + -.",
    level: "basic",
    codeExample: "int val = 10 + 5 * 2; // 10 + 10 = 20"
  },
  {
    question: "How can the modulus operator `%` be used to extract the last digit of an integer?",
    shortAnswer: "Compute `num % 10`.",
    explanation: "Modulus 10 returns the units digit of any base-10 number (e.g. `1234 % 10` is `4`).",
    hint: "num % 10 extracts the last digit.",
    level: "basic",
    codeExample: "int lastDigit = 1234 % 10; // 4"
  },
  {
    question: "How can integer division `/` be used to remove the last digit of an integer?",
    shortAnswer: "Compute `num / 10`.",
    explanation: "Dividing by 10 shifts the decimal point left and truncates the last digit (e.g. `1234 / 10` is `123`).",
    hint: "num / 10 removes the units digit.",
    level: "basic",
    codeExample: "int remaining = 1234 / 10; // 123"
  },
  {
    question: "How can you check if an integer is even or odd using `%`?",
    shortAnswer: "Check `num % 2 == 0` for even, `num % 2 != 0` for odd.",
    explanation: "Even numbers are evenly divisible by 2 with remainder 0.",
    hint: "num % 2 == 0 is even.",
    level: "basic",
    codeExample: "boolean isEven = (num % 2 == 0);"
  },
  {
    question: "Why should `num % 2 == 1` NOT be used to check if a number is odd for negative integers?",
    shortAnswer: "Because for negative odd numbers (like `-5`), `-5 % 2` produces `-1` (not `1`), causing `num % 2 == 1` to return `false`!",
    explanation: "To correctly detect odd numbers including negative values, use `num % 2 != 0`.",
    hint: "Use num % 2 != 0 to handle negative odd numbers correctly.",
    level: "intermediate",
    codeExample: "int n = -5;\nboolean badCheck = (n % 2 == 1);  // false (Bug!)\nboolean goodCheck = (n % 2 != 0); // true (Correct!)"
  },
  {
    question: "What is Integer Arithmetic Overflow?",
    shortAnswer: "When an arithmetic operation exceeds `Integer.MAX_VALUE` (`2,147,483,647`) and silently wraps around into negative numbers.",
    explanation: "Java does not throw exceptions on integer overflow. Instead, it wraps using two's complement binary representation (e.g. `Integer.MAX_VALUE + 1` becomes `Integer.MIN_VALUE`).",
    hint: "Silently wraps into negative numbers.",
    level: "intermediate",
    codeExample: "int max = Integer.MAX_VALUE;\nSystem.out.println(max + 1); // -2147483648"
  },
  {
    question: "How can you detect and prevent integer arithmetic overflow in Java 8+?",
    shortAnswer: "Use `Math.addExact()`, `Math.multiplyExact()`, `Math.subtractExact()`, which throw `ArithmeticException` on overflow.",
    explanation: "`Math.*Exact()` methods perform overflow-checked arithmetic, throwing an exception if the result cannot fit into the primitive type.",
    hint: "Math.addExact() throws ArithmeticException on overflow.",
    level: "advanced",
    codeExample: "try {\n  int safe = Math.addExact(Integer.MAX_VALUE, 1);\n} catch (ArithmeticException e) {\n  System.out.println(\"Overflow prevented!\");\n}"
  },
  {
    question: "What happens when you add characters in Java (e.g. `'A' + 'B'`)?",
    shortAnswer: "It performs integer addition on their ASCII/Unicode values: `65 + 66 = 131`.",
    explanation: "Characters are promoted to `int` before addition.",
    hint: "Chars add their numeric ASCII values.",
    level: "basic",
    codeExample: "int sum = 'A' + 'B'; // 131"
  },
  {
    question: "What is the difference between unary minus (`-x`) and binary subtraction (`a - b`)?",
    shortAnswer: "Unary minus negates a single operand; binary subtraction computes the difference between two operands.",
    explanation: "Unary minus has higher precedence than binary subtraction.",
    hint: "1 operand negation vs 2 operand difference.",
    level: "basic",
    codeExample: "int neg = -5;       // Unary minus\nint diff = 10 - 5; // Binary subtraction"
  },
  {
    question: "What is the result of `100 % 100`?",
    shortAnswer: "`0`.",
    explanation: "Dividing a number by itself leaves zero remainder.",
    hint: "Remainder is 0 when numbers divide evenly.",
    level: "basic",
    codeExample: "int rem = 100 % 100; // 0"
  },
  {
    question: "What is the result of `5 % 10`?",
    shortAnswer: "`5`.",
    explanation: "When dividend is smaller than divisor (and both positive), quotient is 0 and the entire dividend is the remainder.",
    hint: "Smaller dividend % larger divisor returns the dividend.",
    level: "basic",
    codeExample: "int rem = 5 % 10; // 5"
  },
  {
    question: "Can `double` overflow in Java arithmetic?",
    shortAnswer: "Yes, exceeding double limits yields `Double.POSITIVE_INFINITY` rather than wrapping around.",
    explanation: "IEEE 754 floating-point standard uses `Infinity` rather than two's complement integer wrap-around.",
    hint: "Double overflows to Infinity.",
    level: "intermediate",
    codeExample: "double huge = Double.MAX_VALUE * 2.0; // Double.POSITIVE_INFINITY"
  },
  {
    question: "How do you calculate circular array indices using `%`?",
    shortAnswer: "`int nextIndex = (currentIndex + 1) % arrayLength;`",
    explanation: "Modulus wraps index back to 0 when it reaches the array length, widely used in ring buffers and carousel UI components.",
    hint: "Circular wrap via (index + 1) % length.",
    level: "intermediate",
    codeExample: "int[] queue = new int[5];\nint head = (head + 1) % queue.length;"
  },
  {
    question: "Why does `0.1 + 0.2` not equal `0.3` in Java floating-point arithmetic?",
    shortAnswer: "Because `0.1` and `0.2` cannot be represented exactly in binary floating-point (IEEE 754), creating minor precision discrepancies (`0.30000000000000004`).",
    explanation: "For financial calculations involving Indian Rupees (₹), `BigDecimal` must be used instead of `double`.",
    hint: "Binary floating-point representation limits.",
    level: "basic",
    codeExample: "System.out.println(0.1 + 0.2 == 0.3); // false!\nSystem.out.println(0.1 + 0.2);        // 0.30000000000000004"
  },
  {
    question: "What is the result of `System.out.println(10 * 20 / 5 + 3 - 2);`?",
    shortAnswer: "`41`.",
    explanation: "`10 * 20 = 200` $\\to$ `200 / 5 = 40` $\\to$ `40 + 3 = 43` $\\to$ `43 - 2 = 41`.",
    hint: "Step by step: multiplicative L-to-R, then additive L-to-R.",
    level: "basic",
    codeExample: "int val = 10 * 20 / 5 + 3 - 2; // 41"
  },
  {
    question: "How does the cash denomination algorithm in Barrackpore tuition fees use `/` and `%`?",
    shortAnswer: "Division (`/`) gives the count of currency notes; modulus (`%`) gives the remaining unallocated balance.",
    explanation: "Iterating through note values (`500`, `200`, `100`...) cleanly computes optimal cash disbursals.",
    hint: "/ for note count, % for remaining balance.",
    level: "basic",
    codeExample: "int count = amount / 500;\namount = amount % 500;"
  },
  {
    question: "Can the modulus operator `%` take negative divisor (e.g. `10 % -3`)?",
    shortAnswer: "Yes, and the negative sign on the divisor is ignored; the result is `1`.",
    explanation: "In Java, `10 % -3` is identical to `10 % 3` = `1`.",
    hint: "Divisor negative sign is ignored.",
    level: "intermediate",
    codeExample: "System.out.println(10 % -3); // 1"
  },
  {
    question: "What is the result of `Double.isNaN(0.0 / 0.0)`?",
    shortAnswer: "`true`.",
    explanation: "`Double.isNaN()` tests whether the floating-point value is Not-a-Number.",
    hint: "Double.isNaN() checks for NaN state.",
    level: "basic",
    codeExample: "boolean check = Double.isNaN(0.0 / 0.0); // true"
  },
  {
    question: "What is the ultimate takeaway of Topic 1 for Java developers?",
    shortAnswer: "Mastering the 5 arithmetic operators (+, -, *, /, %), especially dividend sign rules for `%`, floating-point division nuances, and overflow prevention, guarantees mathematically sound software.",
    explanation: "Understanding these rules prevents subtle bugs in financial systems, data indexing, and algorithm design.",
    hint: "Dividend sign rule, floating / 0 infinity, integer / 0 exception.",
    level: "basic",
    codeExample: "// Summary: +, -, *, /, % (sign follows dividend, float / 0 yields Infinity)"
  },
  {
    question: "What is the next topic (Topic 2) in Module 001_003?",
    shortAnswer: "Integer division truncation vs floating-point division.",
    explanation: "Topic 2 focuses deeply on casting techniques, math precision, and rounding strategies.",
    hint: "Integer division truncation vs float division.",
    level: "basic",
    codeExample: "// Topic 2: Division mechanics deep dive"
  }
];

export default questions;
