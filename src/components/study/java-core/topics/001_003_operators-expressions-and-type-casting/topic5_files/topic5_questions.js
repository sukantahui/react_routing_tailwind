/**
 * Module 001_003: Topic 5: Unary operators: unary plus (+), unary minus (-), logical NOT (!), bitwise NOT (~)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Unary Operator in Java?",
    shortAnswer: "An operator that requires exactly one operand to perform its computation.",
    explanation: "Unary operators include unary plus (`+`), unary minus (`-`), logical NOT (`!`), bitwise NOT (`~`), increment (`++`), decrement (`--`), and type casting `(type)`.",
    hint: "Requires exactly 1 operand.",
    level: "basic",
    codeExample: "int a = -5; // '-' is a unary operator acting solely on operand 5"
  },
  {
    question: "What does the Unary Plus (`+x`) operator do in Java?",
    shortAnswer: "It indicates a positive value and performs Unary Numeric Promotion (promoting byte, short, or char to 32-bit int).",
    explanation: "While `+5` leaves `5` unchanged, applying `+` to a `byte` promotes it to `int`.",
    hint: "Promotes narrow numeric types to int.",
    level: "basic",
    codeExample: "byte b = 10;\nint p = +b; // 'p' is promoted to int"
  },
  {
    question: "What does the Unary Minus (`-x`) operator do in Java?",
    shortAnswer: "It negates the numeric operand by mathematically computing `0 - x`.",
    explanation: "Applying `-` to `10` yields `-10`; applying `-` to `-10` yields `10`.",
    hint: "Negates numeric values.",
    level: "basic",
    codeExample: "int x = 10;\nint neg = -x; // -10"
  },
  {
    question: "What does the Logical NOT (`!flag`) operator do in Java?",
    shortAnswer: "It inverts the boolean value: converts `true` to `false` and `false` to `true`.",
    explanation: "`!` can only be applied to boolean primitive types or `Boolean` wrapper objects.",
    hint: "Inverts boolean truth values.",
    level: "basic",
    codeExample: "boolean isOpen = true;\nboolean isClosed = !isOpen; // false"
  },
  {
    question: "What is the mathematical formula for the Bitwise NOT (`~x`) operator?",
    shortAnswer: "`~x = -(x + 1)`",
    explanation: "Bitwise NOT flips all 32 bits (inverts 0s to 1s and 1s to 0s) in two's complement binary representation, which mathematically equals `-(x + 1)`.",
    hint: "~x = -(x + 1).",
    level: "intermediate",
    codeExample: "int notZero = ~0; // -(0 + 1) = -1\nint notFive = ~5; // -(5 + 1) = -6"
  },
  {
    question: "What is the result of `~0` in Java?",
    shortAnswer: "`-1`.",
    explanation: "In 32-bit binary, `0` is `00000000000000000000000000000000`. Inverting all bits gives `11111111111111111111111111111111`, which is `-1` in two's complement.",
    hint: "~0 = -(0 + 1) = -1.",
    level: "basic",
    codeExample: "int res = ~0; // -1"
  },
  {
    question: "What is the result of `~(-1)` in Java?",
    shortAnswer: "`0`.",
    explanation: "Formula: `~(-1) = -(-1 + 1) = -(0) = 0`.",
    hint: "~(-1) = 0.",
    level: "basic",
    codeExample: "int res = ~(-1); // 0"
  },
  {
    question: "What is the result of `~10` in Java?",
    shortAnswer: "`-11`.",
    explanation: "Formula: `~10 = -(10 + 1) = -11`.",
    hint: "~10 = -11.",
    level: "basic",
    codeExample: "int res = ~10; // -11"
  },
  {
    question: "What is the associativity direction of Unary Operators in Java?",
    shortAnswer: "Right-to-Left.",
    explanation: "Expressions with chained unary operators evaluate from the rightmost operator to the leftmost operator.",
    hint: "Unary operators associate Right-to-Left.",
    level: "intermediate",
    codeExample: "int val = - - -5; // Evaluated as -(-(-5)) = -5"
  },
  {
    question: "What happens when you apply unary minus `-` to a `byte` variable?",
    shortAnswer: "It produces an `int` result because of Unary Numeric Promotion (JLS §5.6.1).",
    explanation: "Writing `byte b = 5; byte c = -b;` fails to compile because `-b` produces an `int`.",
    hint: "Unary minus promotes byte/short/char to int.",
    level: "intermediate",
    codeExample: "byte b = 5;\n// byte c = -b; // COMPILER ERROR!\nbyte c = (byte) -b; // Correct"
  },
  {
    question: "Can the logical NOT `!` operator be applied to integers in Java (e.g. `!0` or `!1`)?",
    shortAnswer: "No, Java strictly prohibits applying `!` to numeric types (unlike C/C++).",
    explanation: "In Java, `boolean` and integers are entirely incompatible types. Writing `!0` results in a compilation error.",
    hint: "! can only be applied to booleans.",
    level: "basic",
    codeExample: "// boolean b = !0; // COMPILER ERROR: The operator ! is undefined for the argument type(s) int"
  },
  {
    question: "Can the bitwise NOT `~` operator be applied to boolean types in Java?",
    shortAnswer: "No, `~` can only be applied to integral types (`byte`, `short`, `char`, `int`, `long`).",
    explanation: "Applying `~` to a boolean causes a compile error: `The operator ~ is undefined for the argument type(s) boolean`.",
    hint: "~ is strictly for integers.",
    level: "basic",
    codeExample: "// boolean b = ~true; // COMPILER ERROR"
  },
  {
    question: "What does the Double Negation `!!flag` pattern do?",
    shortAnswer: "It evaluates to the original boolean value of `flag`.",
    explanation: "`!(!true)` evaluates to `!(false)` which is `true`.",
    hint: "!! returns the original boolean.",
    level: "basic",
    codeExample: "boolean b = !!true; // true"
  },
  {
    question: "What is the result of `-Integer.MIN_VALUE` in Java?",
    shortAnswer: "`Integer.MIN_VALUE` (`-2147483648`).",
    explanation: "Because `Integer.MIN_VALUE` is `-2147483648`, negating it would produce `+2147483648`, which exceeds `Integer.MAX_VALUE` (2147483647). Two's complement wraps it back to `Integer.MIN_VALUE`.",
    hint: "-Integer.MIN_VALUE overflows to Integer.MIN_VALUE.",
    level: "expert",
    codeExample: "int negMin = -Integer.MIN_VALUE; // -2147483648"
  },
  {
    question: "How can `Math.negateExact(int a)` detect overflow when negating `Integer.MIN_VALUE`?",
    shortAnswer: "`Math.negateExact(Integer.MIN_VALUE)` throws `java.lang.ArithmeticException: integer overflow`.",
    explanation: "Java 8 `Math.negateExact()` performs overflow checks on unary negation.",
    hint: "Math.negateExact throws ArithmeticException on overflow.",
    level: "advanced",
    codeExample: "// Math.negateExact(Integer.MIN_VALUE); // THROWS ArithmeticException"
  },
  {
    question: "What happens when you apply unary plus `+` to a `char` variable?",
    shortAnswer: "It promotes the `char` to its numeric ASCII/Unicode `int` value.",
    explanation: "`+'A'` evaluates to integer `65`.",
    hint: "+'A' promotes char to integer 65.",
    level: "basic",
    codeExample: "int code = +'A'; // 65"
  },
  {
    question: "What is the result of `! (5 > 3)`?",
    shortAnswer: "`false`.",
    explanation: "`5 > 3` evaluates to `true`; applying `!` inverts it to `false`.",
    hint: "!(true) = false.",
    level: "basic",
    codeExample: "boolean res = !(5 > 3); // false"
  },
  {
    question: "What is De Morgan's Law for simplifying negated logical expressions?",
    shortAnswer: "`!(A && B) == (!A || !B)` and `!(A || B) == (!A && !B)`.",
    explanation: "Negating a conjunction turns it into a disjunction of negations, and vice versa.",
    hint: "!(A && B) = (!A || !B).",
    level: "intermediate",
    codeExample: "boolean law1 = !(a && b) == (!a || !b); // Always true"
  },
  {
    question: "What is the precedence of unary operators relative to binary arithmetic operators?",
    shortAnswer: "Unary operators have higher precedence than binary arithmetic operators (`*`, `/`, `%`, `+`, `-`).",
    explanation: "In `-5 * 2`, `-5` is evaluated first as negative five before multiplying by two.",
    hint: "Unary operators have higher precedence than binary operators.",
    level: "basic",
    codeExample: "int val = -5 * 2; // (-5) * 2 = -10"
  },
  {
    question: "What is the result of `~-5` in Java?",
    shortAnswer: "`4`.",
    explanation: "Formula: `~(-5) = -(-5 + 1) = -(-4) = 4`.",
    hint: "~(-5) = 4.",
    level: "intermediate",
    codeExample: "int res = ~-5; // 4"
  },
  {
    question: "How is the bitwise NOT `~` operator used in bitmask manipulation?",
    shortAnswer: "To clear specific flag bits using bitwise AND: `flags = flags & ~MASK;`.",
    explanation: "Inverting `MASK` turns target bits to 0 and all other bits to 1, cleanly resetting target flags without disturbing other bits.",
    hint: "flags & ~MASK clears flag bits.",
    level: "advanced",
    codeExample: "int PERMISSION_ADMIN = 0b00000100;\nuserFlags = userFlags & ~PERMISSION_ADMIN; // Revokes admin"
  },
  {
    question: "What is the difference between `-0.0` and `+0.0` in Java floating-point arithmetic?",
    shortAnswer: "IEEE 754 supports signed zeros: `+0.0 == -0.0` evaluates to `true`, but `1.0 / +0.0` is `+Infinity` while `1.0 / -0.0` is `-Infinity`.",
    explanation: "Unary minus can create `-0.0` on floating-point numbers.",
    hint: "1.0 / -0.0 yields -Infinity.",
    level: "advanced",
    codeExample: "double negZero = -0.0;\nSystem.out.println(1.0 / negZero); // -Infinity"
  },
  {
    question: "What is the result of `!false == true` in Java?",
    shortAnswer: "`true`.",
    explanation: "`!false` evaluates to `true`, and `true == true` is `true`.",
    hint: "Unary ! evaluates before ==.",
    level: "basic",
    codeExample: "boolean b = !false == true; // true"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student ledger, how is unary minus used for outstanding dues?",
    shortAnswer: "`double dues = balance < 0 ? -balance : 0.0;`",
    explanation: "Negating the negative student balance displays the outstanding dues amount as a clean positive figure in Indian Rupees (₹).",
    hint: "-balance turns negative balances into positive debt.",
    level: "basic",
    codeExample: "double debt = -(-2500.0); // Displays ₹2,500.00 dues"
  },
  {
    question: "Can multiple unary operators be chained together in Java?",
    shortAnswer: "Yes, such as `---x` or `!!flag`, evaluating Right-to-Left.",
    explanation: "Parentheses or spaces can make chained unary operators clearer.",
    hint: "Chained unary operators evaluate Right-to-Left.",
    level: "intermediate",
    codeExample: "int x = 5;\nint y = - - -x; // -5"
  },
  {
    question: "What is the result of `~Integer.MAX_VALUE` in Java?",
    shortAnswer: "`Integer.MIN_VALUE` (`-2147483648`).",
    explanation: "Formula: `~2147483647 = -(2147483647 + 1) = -2147483648`.",
    hint: "~MAX_VALUE = MIN_VALUE.",
    level: "intermediate",
    codeExample: "int res = ~Integer.MAX_VALUE; // -2147483648"
  },
  {
    question: "What is the result of `~Integer.MIN_VALUE` in Java?",
    shortAnswer: "`Integer.MAX_VALUE` (`2147483647`).",
    explanation: "Formula: `~(-2147483648) = -(-2147483648 + 1) = -(-2147483647) = 2147483647`.",
    hint: "~MIN_VALUE = MAX_VALUE.",
    level: "intermediate",
    codeExample: "int res = ~Integer.MIN_VALUE; // 2147483647"
  },
  {
    question: "Can unary minus be applied to `boolean` in Java?",
    shortAnswer: "No, unary minus only applies to numeric types.",
    explanation: "Applying `-` to boolean causes a compile-time error.",
    hint: "Minus cannot negate booleans.",
    level: "basic",
    codeExample: "// boolean b = -true; // COMPILER ERROR"
  },
  {
    question: "What is the ultimate takeaway of Topic 5 for Java developers?",
    shortAnswer: "Unary operators (+, -, !, ~) transform single operands, evaluate Right-to-Left, promote narrow types to int, and follow fundamental two's complement rules (~x = -(x+1)).",
    explanation: "Mastering unary operators is essential for bitmask flag clearing, boolean logic inversion, and numeric sign management.",
    hint: "Right-to-left associativity, ~x = -(x+1), and unary promotion.",
    level: "basic",
    codeExample: "// Summary: +, -, !, ~ (Right-to-Left associativity)"
  },
  {
    question: "What is the next topic (Topic 6) in Module 001_003?",
    shortAnswer: "Increment (++) and Decrement (--) operators: prefix (++x) vs postfix (x++) evaluation rules.",
    explanation: "Topic 6 covers prefix vs postfix increment/decrement mechanics, operand stack states, and common expression evaluation traps.",
    hint: "Increment and decrement operators.",
    level: "basic",
    codeExample: "// Topic 6: ++ and -- operators"
  }
];

export default questions;
