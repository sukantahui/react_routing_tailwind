/**
 * Module 001_003: Topic 13: Compound assignment operators: +=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=, >>>=
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 11 Compound Assignment Operators in Java?",
    shortAnswer: "Arithmetic: `+=`, `-=`, `*=`, `/=`, `%=`; Bitwise: `&=`, `|=`, `^=`; Shift: `<<=`, `>>=`, `>>>=`.",
    explanation: "Compound assignment operators combine a binary arithmetic, bitwise, or shift operation with variable assignment in a single syntactic construct.",
    hint: "+=, -=, *=, /=, %=, &=, |=, ^=, <<=, >>=, >>>=",
    level: "basic",
    codeExample: "x += 5; // Shorthand for x = x + 5 (with implicit cast)"
  },
  {
    question: "What is the exact definition of a compound assignment `E1 op= E2` in the Java Language Specification (JLS §15.26.2)?",
    shortAnswer: "`E1 = (T)((E1) op (E2))` where `T` is the static type of `E1`.",
    explanation: "The compiler automatically inserts an implicit narrowing cast to the type of `E1` and guarantees that `E1` is evaluated only once.",
    hint: "E1 = (T)((E1) op (E2)) with single evaluation.",
    level: "intermediate",
    codeExample: "byte b = 10;\nb += 5; // Compiled as: b = (byte)(b + 5);"
  },
  {
    question: "What is the Single-Evaluation Guarantee of the left-hand operand in compound assignments?",
    shortAnswer: "In `E1 op= E2`, the expression `E1` is evaluated EXACTLY ONCE, avoiding duplicate side-effects.",
    explanation: "In `arr[getIndex()] += 10;`, `getIndex()` runs once. In `arr[getIndex()] = arr[getIndex()] + 10;`, `getIndex()` executes twice, which causes performance waste or bugs if `getIndex()` has side-effects.",
    hint: "Left-hand expression runs once, avoiding duplicate method calls.",
    level: "advanced",
    codeExample: "arr[i++] += 5; // i is incremented ONLY ONCE!"
  },
  {
    question: "What is the associativity direction of Compound Assignment Operators?",
    shortAnswer: "Right-to-Left.",
    explanation: "In chained compound assignments like `a += b += c`, Java evaluates from right to left: `a += (b += c)`.",
    hint: "Right-to-Left associative.",
    level: "intermediate",
    codeExample: "int a = 1, b = 2, c = 3;\na += b += c; // c is 3, b becomes 5, a becomes 6"
  },
  {
    question: "What is the result of `int x = 10; x *= 2 + 3;` in Java?",
    shortAnswer: "`50` (NOT `23`!).",
    explanation: "The right-hand expression is treated as if enclosed in parentheses: `x = x * (2 + 3)` = `10 * 5 = 50`.",
    hint: "Right-hand side is fully evaluated first: x * (2 + 3).",
    level: "basic",
    codeExample: "int x = 10;\nx *= 2 + 3; // x = x * (2 + 3) = 10 * 5 = 50"
  },
  {
    question: "What does `+=` do when the left operand is a `String`?",
    shortAnswer: "It performs String concatenation and reassigns the new String to the variable.",
    explanation: "`String s = \"Hello\"; s += \" World\";` produces `\"Hello World\"`.",
    hint: "Appends text to String variable.",
    level: "basic",
    codeExample: "String s = \"Code\";\ns += \" & Tax\"; // \"Code & Tax\""
  },
  {
    question: "Can compound assignment operators be applied to boolean variables?",
    shortAnswer: "Yes, boolean variables support `&=`, `|=`, and `^=` (e.g. `isApproved &= checkRules();`).",
    explanation: "Arithmetic and shift compound operators cannot be applied to booleans.",
    hint: "&=, |=, ^= work on booleans.",
    level: "intermediate",
    codeExample: "boolean isValid = true;\nisValid &= checkInput(); // Reassigns boolean"
  },
  {
    question: "What happens when using `&=` with booleans regarding short-circuiting?",
    shortAnswer: "`&=` is NOT a short-circuit operator; it ALWAYS evaluates the right-hand operand!",
    explanation: "Even if the left boolean is `false`, `isEligible &= computeFee()` will execute `computeFee()`.",
    hint: "&= eagerly evaluates right-hand side.",
    level: "advanced",
    codeExample: "boolean b = false;\nb &= processPayment(); // processPayment() IS EXECUTED!"
  },
  {
    question: "What is the result of `int a = 5; a += a++;` in Java?",
    shortAnswer: "`a = 10`.",
    explanation: "`a` on the left is evaluated as `5`. `a++` returns `5` (and increments `a` to `6`). `5 + 5` = `10`, which is assigned to `a`.",
    hint: "Left operand 5 is saved before right operand evaluates.",
    level: "expert",
    codeExample: "int a = 5;\na += a++; // 10"
  },
  {
    question: "What is the result of `int a = 5; a += ++a;` in Java?",
    shortAnswer: "`a = 11`.",
    explanation: "`a` on the left is evaluated as `5`. `++a` increments `a` to `6` and returns `6`. `5 + 6 = 11`.",
    hint: "5 + 6 = 11.",
    level: "expert",
    codeExample: "int a = 5;\na += ++a; // 11"
  },
  {
    question: "Why is `x += 1` generally preferred over `x = x + 1` in modern Java?",
    shortAnswer: "It is more concise, clearer to read, avoids duplicate variable names in complex expressions, and evaluates the target location only once.",
    explanation: "Standard clean coding best practice.",
    hint: "Concise and evaluates left target once.",
    level: "basic",
    codeExample: "totalScore += currentMarks;"
  },
  {
    question: "What is the result of `int x = 100; x /= 2 * 5;`?",
    shortAnswer: "`10`.",
    explanation: "Right side `2 * 5` evaluates to `10` first. Then `100 / 10 = 10`.",
    hint: "x = x / (2 * 5) = 100 / 10 = 10.",
    level: "basic",
    codeExample: "int x = 100;\nx /= 2 * 5; // 10"
  },
  {
    question: "What happens when using `/=` by zero with integers (`int x = 10; x /= 0;`)?",
    shortAnswer: "Throws `java.lang.ArithmeticException: / by zero`.",
    explanation: "Standard integer division by zero exception.",
    hint: "Throws ArithmeticException.",
    level: "basic",
    codeExample: "int x = 10;\n// x /= 0; // THROWS ArithmeticException"
  },
  {
    question: "What is the result of `double d = 10.0; d /= 0.0;`?",
    shortAnswer: "`d = Double.POSITIVE_INFINITY`.",
    explanation: "Floating-point division by 0.0 yields infinity without exception.",
    hint: "Becomes Infinity.",
    level: "basic",
    codeExample: "double d = 10.0;\nd /= 0.0; // Double.POSITIVE_INFINITY"
  },
  {
    question: "What is the compound assignment operator for Bitwise XOR?",
    shortAnswer: "`^=`",
    explanation: "`flags ^= MASK` toggles target bit flags.",
    hint: "^= compound assignment.",
    level: "basic",
    codeExample: "int flags = 0b001;\nflags ^= 0b010; // Toggles bit"
  },
  {
    question: "What is the result of `int mask = 0b1111; mask &= 0b0110;`?",
    shortAnswer: "`mask = 0b0110` (integer `6`).",
    explanation: "Bitwise AND preserves only the common set bits.",
    hint: "Bitwise AND reassignment.",
    level: "basic",
    codeExample: "int mask = 0b1111;\nmask &= 0b0110; // 6"
  },
  {
    question: "What is the result of `int val = 5; val <<= 3;` in Java?",
    shortAnswer: "`val = 40`.",
    explanation: "`5 * 2^3 = 5 * 8 = 40`.",
    hint: "5 << 3 = 40.",
    level: "basic",
    codeExample: "int val = 5;\nval <<= 3; // 40"
  },
  {
    question: "What is the result of `int val = 40; val >>= 2;` in Java?",
    shortAnswer: "`val = 10`.",
    explanation: "`40 / 4 = 10`.",
    hint: "40 >> 2 = 10.",
    level: "basic",
    codeExample: "int val = 40;\nval >>= 2; // 10"
  },
  {
    question: "What is the result of `int val = -40; val >>>= 2;` in Java?",
    shortAnswer: "`1073741814`.",
    explanation: "Unsigned shift inserts zeroes into the high bits of negative 40.",
    hint: "Converts negative integer to large positive integer.",
    level: "intermediate",
    codeExample: "int val = -40;\nval >>>= 2; // 1073741814"
  },
  {
    question: "Can compound assignments be used on `final` variables?",
    shortAnswer: "No, `final` variables cannot be reassigned; using compound assignments causes a compile-time error.",
    explanation: "Compound assignments mutate variable state.",
    hint: "Cannot modify final constants.",
    level: "basic",
    codeExample: "// final int MAX = 100;\n// MAX += 10; // COMPILATION ERROR!"
  },
  {
    question: "What is the result of `int x = 5; x %= 2;`?",
    shortAnswer: "`x = 1`.",
    explanation: "`5 % 2 = 1`.",
    hint: "5 % 2 = 1.",
    level: "basic",
    codeExample: "int x = 5;\nx %= 2; // 1"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee ledger, how are student tuition installments tracked?",
    shortAnswer: "`totalPaid += installment;`",
    explanation: "Compound assignment accumulates installment payments in Indian Rupees (₹) cleanly.",
    hint: "totalPaid += installment.",
    level: "basic",
    codeExample: "this.totalPaid += payment;"
  },
  {
    question: "What is the precedence of compound assignment operators?",
    shortAnswer: "Compound assignment operators occupy the second lowest precedence tier (Level 1, just above comma).",
    explanation: "All arithmetic, relational, and logical operations on the right are evaluated before the compound assignment occurs.",
    hint: "Lowest precedence tier alongside simple =.",
    level: "advanced",
    codeExample: "x += a > b ? 10 : 20; // Ternary evaluates before +="
  },
  {
    question: "What is the result of `int a = 2, b = 3; a += b += 4;` in Java?",
    shortAnswer: "`a = 9` and `b = 7`.",
    explanation: "Right-to-left: `b += 4` sets `b` to `7`. Then `a += 7` sets `a` to `9`.",
    hint: "b becomes 7, then a becomes 2 + 7 = 9.",
    level: "intermediate",
    codeExample: "int a = 2, b = 3;\na += b += 4; // a = 9, b = 7"
  },
  {
    question: "Can compound assignments be used on array elements (e.g. `arr[0] += 5`)?",
    shortAnswer: "Yes, compound assignments work on array elements, object fields, and local variables.",
    explanation: "Any valid lvalue can receive a compound assignment.",
    hint: "Valid for array elements and fields.",
    level: "basic",
    codeExample: "int[] arr = {10, 20};\narr[0] += 5; // arr[0] is 15"
  },
  {
    question: "What is the result of `int x = 10; x -= 5 - 2;`?",
    shortAnswer: "`7`.",
    explanation: "`5 - 2` evaluates to `3`. `x = x - 3` = `10 - 3 = 7`.",
    hint: "x = x - (5 - 2) = 10 - 3 = 7.",
    level: "basic",
    codeExample: "int x = 10;\nx -= 5 - 2; // 7"
  },
  {
    question: "Can compound assignments be chained with simple assignment (`a = b += 5`)?",
    shortAnswer: "Yes, because compound assignments evaluate to the newly assigned value.",
    explanation: "`b += 5` assigns to `b` and produces the new value, which is then assigned to `a`.",
    hint: "Evaluates to the assigned result value.",
    level: "intermediate",
    codeExample: "int a, b = 10;\na = b += 5; // b is 15, a is 15"
  },
  {
    question: "What happens when compound assignment overflows an integer (`int x = Integer.MAX_VALUE; x += 1;`)?",
    shortAnswer: "It silently wraps around to `Integer.MIN_VALUE` (`-2147483648`).",
    explanation: "Standard two's complement overflow.",
    hint: "Silently overflows to Integer.MIN_VALUE.",
    level: "intermediate",
    codeExample: "int x = Integer.MAX_VALUE;\nx += 1; // -2147483648"
  },
  {
    question: "What is the ultimate takeaway of Topic 13 for Java developers?",
    shortAnswer: "The 11 compound assignment operators provide concise reassignments, evaluate the left target only once (JLS §15.26.2), associate Right-to-Left, and insert implicit type casts.",
    explanation: "Mastering compound assignments prevents duplicate execution bugs and simplifies financial ledgers, bitmasks, and loop accumulators.",
    hint: "Single evaluation guarantee, right-to-left associativity, implicit cast.",
    level: "basic",
    codeExample: "// Summary: E1 op= E2 is E1 = (T)(E1 op E2) with single evaluation of E1"
  },
  {
    question: "What is the next topic (Topic 14) in Module 001_003?",
    shortAnswer: "Implicit type casting in compound assignments (e.g. byte b = 5; b += 2;)",
    explanation: "Topic 14 deep-dives into the automatic narrowing cast mechanism of compound assignments and potential silent truncation traps.",
    hint: "Implicit casting in compound assignments.",
    level: "basic",
    codeExample: "// Topic 14: Implicit casting in compound assignments"
  }
];

export default questions;
