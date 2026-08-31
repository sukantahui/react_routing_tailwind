/**
 * Module 001_003: Topic 7: Relational / Comparison operators: ==, !=, >, <, >=, <=
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 6 Relational (Comparison) operators in Java?",
    shortAnswer: "Equal to (`==`), Not equal to (`!=`), Greater than (`>`), Less than (`<`), Greater than or equal to (`>=`), and Less than or equal to (`<=`).",
    explanation: "These operators compare two operands and evaluate to a boolean result (`true` or `false`).",
    hint: "==, !=, >, <, >=, <=",
    level: "basic",
    codeExample: "boolean eq = (a == b);\nboolean gt = (a > b);"
  },
  {
    question: "What is the return type of all relational and comparison expressions in Java?",
    shortAnswer: "`boolean` (`true` or `false`).",
    explanation: "Unlike C/C++ where comparisons return `1` or `0` (integers), Java strictly enforces the primitive `boolean` type.",
    hint: "Always evaluates to boolean.",
    level: "basic",
    codeExample: "boolean result = (10 > 5); // true"
  },
  {
    question: "Why does `(0.1 + 0.2) == 0.3` evaluate to `false` in Java?",
    shortAnswer: "Because `0.1` and `0.2` cannot be represented exactly in binary floating-point (IEEE 754), producing `0.30000000000000004`.",
    explanation: "Due to precision limitations of binary fractions, exact equality comparisons on floating-point calculations fail.",
    hint: "Binary IEEE 754 precision discrepancy.",
    level: "basic",
    codeExample: "double sum = 0.1 + 0.2;\nSystem.out.println(sum == 0.3); // false!"
  },
  {
    question: "How should floating-point numbers be compared safely for equality in Java?",
    shortAnswer: "Using an epsilon threshold: `Math.abs(a - b) < 1e-9` or `Double.compare(a, b) == 0`.",
    explanation: "If the absolute difference between two floating-point numbers is smaller than a minute delta (epsilon), they are considered equal.",
    hint: "Math.abs(a - b) < epsilon.",
    level: "intermediate",
    codeExample: "double eps = 1e-9;\nboolean isEqual = Math.abs((0.1 + 0.2) - 0.3) < eps; // true"
  },
  {
    question: "What is the result of `Double.NaN == Double.NaN` in Java?",
    shortAnswer: "`false` (NaN is NEVER equal to anything, including itself!).",
    explanation: "IEEE 754 specifies that `NaN` comparisons using `==`, `<`, `>`, `<=`, `>=` always evaluate to `false`. Only `!=` evaluates to `true`.",
    hint: "NaN is not equal even to itself.",
    level: "intermediate",
    codeExample: "double nan = Double.NaN;\nSystem.out.println(nan == nan); // false\nSystem.out.println(nan != nan); // true"
  },
  {
    question: "What is the correct way to test if a floating-point value is `NaN`?",
    shortAnswer: "Use `Double.isNaN(val)` or `Float.isNaN(val)`.",
    explanation: "The `isNaN()` method correctly inspects the IEEE 754 bit pattern.",
    hint: "Use Double.isNaN(val).",
    level: "basic",
    codeExample: "boolean isNotANumber = Double.isNaN(0.0 / 0.0); // true"
  },
  {
    question: "Can relational ordering operators (`>`, `<`, `>=`, `<=`) be applied to `boolean` operands?",
    shortAnswer: "No, applying `>`, `<`, `>=`, or `<=` to booleans causes a compile-time error.",
    explanation: "Booleans have no numerical ordering in Java. Only equality (`==`) and inequality (`!=`) are valid on booleans.",
    hint: "> and < cannot be applied to booleans.",
    level: "basic",
    codeExample: "// boolean bad = true > false; // COMPILATION ERROR!\nboolean ok = (true != false);  // true (Valid)"
  },
  {
    question: "What happens when you compare different numeric types (e.g. `int 10 == double 10.0`)?",
    shortAnswer: "Evaluates to `true` because Binary Numeric Promotion automatically widens `int 10` to `double 10.0` before comparison.",
    explanation: "Numeric operands are promoted to the widest type before evaluation.",
    hint: "Widened to matching double before equality check.",
    level: "basic",
    codeExample: "int i = 10;\ndouble d = 10.0;\nSystem.out.println(i == d); // true"
  },
  {
    question: "How does Java evaluate character comparisons like `'A' < 'B'`?",
    shortAnswer: "It compares their numeric Unicode/ASCII values: `65 < 66` evaluates to `true`.",
    explanation: "Primitive `char` values are treated as 16-bit unsigned integers during relational comparisons.",
    hint: "Compares numeric Unicode codepoints.",
    level: "basic",
    codeExample: "boolean b = ('A' < 'B'); // true (65 < 66)"
  },
  {
    question: "What is the precedence of relational operators relative to arithmetic operators?",
    shortAnswer: "Arithmetic operators (`*`, `/`, `%`, `+`, `-`) have higher precedence than relational operators (`<`, `>`, `<=`, `>=`, `==`, `!=`).",
    explanation: "In `a + 5 > b * 2`, the addition `a + 5` and multiplication `b * 2` evaluate before the `>` comparison.",
    hint: "Arithmetic evaluates before relational comparison.",
    level: "basic",
    codeExample: "boolean test = 5 + 3 > 2 * 3; // (8 > 6) → true"
  },
  {
    question: "What is the difference in precedence between ordering operators (`<`, `>`, `<=`, `>=`) and equality operators (`==`, `!=`)?",
    shortAnswer: "Ordering operators (`<`, `>`, `<=`, `>=`) have higher precedence than equality operators (`==`, `!=`).",
    explanation: "In `a < b == c < d`, `a < b` and `c < d` evaluate first, and their boolean results are compared with `==`.",
    hint: "Ordering (<, >) precedes equality (==, !=).",
    level: "intermediate",
    codeExample: "boolean check = 5 < 10 == 3 < 8; // (true == true) → true"
  },
  {
    question: "What is the result of chaining relational comparisons like `1 < x < 10` in Java?",
    shortAnswer: "Compilation error: `The operator < is undefined for the argument type(s) boolean, int`.",
    explanation: "`1 < x` evaluates to a `boolean`, and Java cannot compare a `boolean` to integer `10` with `<`. Use `1 < x && x < 10`.",
    hint: "Cannot chain comparisons; use logical AND (&&).",
    level: "basic",
    codeExample: "// boolean bad = 1 < x < 10; // COMPILER ERROR!\nboolean good = (1 < x && x < 10); // Correct"
  },
  {
    question: "What is the result of `Double.POSITIVE_INFINITY > Double.MAX_VALUE`?",
    shortAnswer: "`true`.",
    explanation: "In IEEE 754 floating-point arithmetic, `Infinity` is strictly greater than any finite positive number.",
    hint: "Infinity is greater than Double.MAX_VALUE.",
    level: "intermediate",
    codeExample: "boolean b = Double.POSITIVE_INFINITY > Double.MAX_VALUE; // true"
  },
  {
    question: "What is the result of `Double.NEGATIVE_INFINITY < -Double.MAX_VALUE`?",
    shortAnswer: "`true`.",
    explanation: "Negative infinity is strictly smaller than any finite negative number.",
    hint: "Negative infinity is smaller than any finite negative value.",
    level: "intermediate",
    codeExample: "boolean b = Double.NEGATIVE_INFINITY < -Double.MAX_VALUE; // true"
  },
  {
    question: "What is the result of comparing `+0.0 == -0.0` in Java?",
    shortAnswer: "`true`.",
    explanation: "According to IEEE 754 standard, positive zero and negative zero compare as equal.",
    hint: "+0.0 == -0.0 evaluates to true.",
    level: "intermediate",
    codeExample: "System.out.println(+0.0 == -0.0); // true"
  },
  {
    question: "How does `Double.compare(+0.0, -0.0)` treat signed zeros differently from `==`?",
    shortAnswer: "`Double.compare(+0.0, -0.0)` returns `1` (considers `+0.0` greater than `-0.0`), unlike `==` which treats them as equal.",
    explanation: "`Double.compare()` provides total ordering consistent with `equals()` and `Comparable`.",
    hint: "Double.compare treats +0.0 as greater than -0.0.",
    level: "advanced",
    codeExample: "int cmp = Double.compare(+0.0, -0.0); // 1"
  },
  {
    question: "How does `Double.compare(Double.NaN, Double.NaN)` treat NaN differently from `==`?",
    shortAnswer: "`Double.compare(NaN, NaN)` returns `0` (considers them equal for sorting), whereas `NaN == NaN` returns `false`.",
    explanation: "`Double.compare` enforces total ordering so sorting arrays containing `NaN` does not break.",
    hint: "Double.compare considers NaN equal to NaN for sorting.",
    level: "advanced",
    codeExample: "int cmp = Double.compare(Double.NaN, Double.NaN); // 0"
  },
  {
    question: "What is the result of `'a' >= 'A'` in Java?",
    shortAnswer: "`true`.",
    explanation: "Lowercase `'a'` has ASCII value `97`, while uppercase `'A'` is `65`. `97 >= 65` is `true`.",
    hint: "Lowercase letters have higher ASCII values than uppercase.",
    level: "basic",
    codeExample: "boolean b = ('a' >= 'A'); // true (97 >= 65)"
  },
  {
    question: "What is the danger of writing `if (marks = 100)` in Java?",
    shortAnswer: "Compilation error: `Type mismatch: cannot convert from int to boolean` (unlike C where it causes a silent bug).",
    explanation: "Java's strict boolean type prevents accidental assignment in `if` statements for numeric types.",
    hint: "Java compiler catches accidental assignments in if conditions.",
    level: "basic",
    codeExample: "// if (marks = 100) // COMPILATION ERROR!"
  },
  {
    question: "What is the only case where accidental assignment inside an `if` condition compiles in Java?",
    shortAnswer: "When the variable is of type `boolean`: `if (isEligible = false)` assigns `false` and compiles without error!",
    explanation: "Because `isEligible = false` evaluates to boolean `false`, the compiler accepts it as a valid boolean expression.",
    hint: "if (flag = false) compiles because assignment expression returns boolean.",
    level: "intermediate",
    codeExample: "boolean flag = true;\nif (flag = false) { } // Compiles! flag becomes false, block skipped"
  },
  {
    question: "How can you protect against accidental assignment bugs when comparing boolean variables to literals?",
    shortAnswer: "Never compare to boolean literals: write `if (isEligible)` or `if (!isEligible)` instead of `if (isEligible == true)`.",
    explanation: "Directly using boolean variables is cleaner, idiomatic, and eliminates assignment mistakes.",
    hint: "Write if (flag) directly instead of if (flag == true).",
    level: "basic",
    codeExample: "if (isEligible) { /* Action */ } // Idiomatic Java"
  },
  {
    question: "What is the result of `10L == 10`?",
    shortAnswer: "`true`.",
    explanation: "The integer `10` is promoted to `10L`, and long comparison returns `true`.",
    hint: "Promoted to long for comparison.",
    level: "basic",
    codeExample: "boolean b = (10L == 10); // true"
  },
  {
    question: "In the Coder & AccoTax Barrackpore scholarship auditor, how is the threshold evaluated?",
    shortAnswer: "`boolean isEligible = score >= 90;`",
    explanation: "Evaluates whether student score meets or exceeds 90% for fee discounts in Indian Rupees (₹).",
    hint: "score >= 90 threshold check.",
    level: "basic",
    codeExample: "boolean eligible = (marks >= 90);"
  },
  {
    question: "Can relational operators compare `String` objects for alphabetical ordering (e.g. `\"apple\" < \"banana\"`)?",
    shortAnswer: "No, relational operators (`<`, `>`, `<=`, `>=`) cannot be used on Objects/Strings; use `str1.compareTo(str2) < 0`.",
    explanation: "Java does not support operator overloading for custom object comparison.",
    hint: "Use str1.compareTo(str2) for String ordering.",
    level: "basic",
    codeExample: "String s1 = \"apple\", s2 = \"banana\";\nboolean isBefore = s1.compareTo(s2) < 0; // true"
  },
  {
    question: "What does `==` do when applied to two Object references (e.g. `String` or `Student`)?",
    shortAnswer: "It performs reference identity comparison (checks if both references point to the exact same memory address on the Heap).",
    explanation: "To compare object contents/values, use the `.equals()` method.",
    hint: "== compares memory addresses for objects.",
    level: "basic",
    codeExample: "String s1 = new String(\"A\");\nString s2 = new String(\"A\");\nSystem.out.println(s1 == s2);      // false (Different memory)\nSystem.out.println(s1.equals(s2)); // true (Same content)"
  },
  {
    question: "What is the result of `(5 >= 5) && (5 <= 5)`?",
    shortAnswer: "`true`.",
    explanation: "Both `5 >= 5` (`true`) and `5 <= 5` (`true`) are satisfied, so `true && true` is `true`.",
    hint: "Both boundary conditions evaluate to true.",
    level: "basic",
    codeExample: "boolean b = (5 >= 5) && (5 <= 5); // true"
  },
  {
    question: "What is the result of `(10 != 10) == false`?",
    shortAnswer: "`true`.",
    explanation: "`10 != 10` evaluates to `false`, and `false == false` evaluates to `true`.",
    hint: "false == false is true.",
    level: "basic",
    codeExample: "boolean b = (10 != 10) == false; // true"
  },
  {
    question: "Can you compare an `enum` using `==` in Java?",
    shortAnswer: "Yes, `==` is safe and recommended for comparing `enum` constants because enums are singletons in the JVM.",
    explanation: "`==` on enums provides compile-time type safety and null-safety without throwing `NullPointerException`.",
    hint: "== is safe and idiomatic for enums.",
    level: "intermediate",
    codeExample: "if (status == EnrollmentStatus.ACTIVE) { }"
  },
  {
    question: "What is the ultimate takeaway of Topic 7 for Java developers?",
    shortAnswer: "Relational operators (==, !=, >, <, >=, <=) return booleans, follow numerical promotion, require epsilon tolerance for floats, and treat NaN as non-equal to everything.",
    explanation: "Mastering relational operators prevents critical logic errors in validation checks, grade evaluations, and financial algorithms.",
    hint: "Epsilon tolerance for floats, NaN != NaN, and boolean return types.",
    level: "basic",
    codeExample: "// Summary: ==, !=, >, <, >=, <= (Returns boolean; epsilon comparison for doubles)"
  },
  {
    question: "What is the next topic (Topic 8) in Module 001_003?",
    shortAnswer: "Equality check: primitive == value comparison vs object reference comparison.",
    explanation: "Topic 8 explores primitive value equality vs object reference identity, String interning pool, and `.equals()` overriding.",
    hint: "Primitive == vs Object reference comparison.",
    level: "basic",
    codeExample: "// Topic 8: Primitive == vs Object.equals()"
  }
];

export default questions;
