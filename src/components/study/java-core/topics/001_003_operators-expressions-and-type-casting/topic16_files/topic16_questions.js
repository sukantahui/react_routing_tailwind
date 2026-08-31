/**
 * Module 001_003: Topic 16: Operator precedence and associativity table from highest to lowest
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Operator Precedence in Java?",
    shortAnswer: "The set of grammatical rules that determines the binding priority / grouping of operators with operands in an expression.",
    explanation: "Operators with higher precedence are evaluated before operators with lower precedence.",
    hint: "Determines operator grouping priority.",
    level: "basic",
    codeExample: "int res = 10 + 2 * 5; // Multiplicative (2 * 5) binds before Additive (+), result = 20"
  },
  {
    question: "What is Operator Associativity in Java?",
    shortAnswer: "The direction (Left-to-Right or Right-to-Left) in which operators of EQUAL precedence are evaluated.",
    explanation: "Most binary operators are Left-to-Right; Unary, Ternary, and Assignment operators are Right-to-Left.",
    hint: "Evaluation direction for operators of equal precedence.",
    level: "basic",
    codeExample: "int a = 10 - 5 - 2; // (10 - 5) - 2 = 3 (Left-to-Right)"
  },
  {
    question: "Which operators have the Highest precedence in Java?",
    shortAnswer: "Postfix operators (`expr++`, `expr--`) and primary expressions (parentheses `()`, array access `[]`, member access `.`).",
    explanation: "Postfix operators bind first before any prefix or binary operator.",
    hint: "Postfix operators and parentheses () are highest.",
    level: "basic",
    codeExample: "int x = 5;\nint res = (x++) * 2; // Postfix runs on x"
  },
  {
    question: "Which operators have the Lowest precedence in Java?",
    shortAnswer: "Assignment operators (`=`, `+=`, `-=`, `*=`, etc.) and the lambda arrow (`->`).",
    explanation: "Assignment operators sit at the bottom of the precedence hierarchy.",
    hint: "Assignment operators (=, +=) are lowest.",
    level: "basic",
    codeExample: "x = a + b * c; // = is evaluated last"
  },
  {
    question: "Which operators in Java are Right-to-Left associative?",
    shortAnswer: "1. Unary/Prefix operators (`++`, `--`, `+`, `-`, `!`, `~`, `(type)`), 2. Ternary operator (`? :`), and 3. All Assignment operators (`=`, `+=`, etc.).",
    explanation: "All other binary operators are Left-to-Right associative.",
    hint: "Unary, Ternary (? :), and Assignments are Right-to-Left.",
    level: "intermediate",
    codeExample: "a = b = c = 10; // Right-to-Left: a = (b = (c = 10))"
  },
  {
    question: "What is the evaluated result of `1 + 2 << 2` in Java?",
    shortAnswer: "`12` (NOT `9`!).",
    explanation: "Additive operator `+` has higher precedence than Shift operator `<<`. It groups as `(1 + 2) << 2` = `3 << 2` = `12`.",
    hint: "+ has higher precedence than <<.",
    level: "intermediate",
    codeExample: "int res = 1 + 2 << 2; // (1 + 2) << 2 = 12"
  },
  {
    question: "What is the evaluated result of `10 - 4 + 2` in Java?",
    shortAnswer: "`8` (NOT `4`!).",
    explanation: "`+` and `-` have equal precedence and are Left-to-Right associative: `(10 - 4) + 2` = `6 + 2` = `8`.",
    hint: "Left-to-Right: (10 - 4) + 2 = 8.",
    level: "basic",
    codeExample: "int res = 10 - 4 + 2; // 8"
  },
  {
    question: "What is the evaluated result of `100 / 10 * 2` in Java?",
    shortAnswer: "`20` (NOT `5`!).",
    explanation: "Multiplicative operators `/` and `*` are Left-to-Right associative: `(100 / 10) * 2` = `10 * 2` = `20`.",
    hint: "Left-to-Right: (100 / 10) * 2 = 20.",
    level: "basic",
    codeExample: "int res = 100 / 10 * 2; // 20"
  },
  {
    question: "What is the precedence hierarchy among Bitwise operators (`&`, `^`, `|`)?",
    shortAnswer: "Bitwise AND (`&`) > Bitwise XOR (`^`) > Bitwise OR (`|`).",
    explanation: "AND binds before XOR, which binds before OR.",
    hint: "& precedes ^ which precedes |.",
    level: "intermediate",
    codeExample: "int res = a | b ^ c & d; // Grouped as: a | (b ^ (c & d))"
  },
  {
    question: "What is the precedence hierarchy between Relational (`<`, `==`) and Bitwise (`&`) operators?",
    shortAnswer: "Relational (`<`, `>`, `<=`, `>=`) > Equality (`==`, `!=`) > Bitwise AND (`&`).",
    explanation: "Equality binds before bitwise AND. That is why `(flags & MASK) != 0` requires outer parentheses.",
    hint: "Relational/Equality precedes Bitwise.",
    level: "intermediate",
    codeExample: "boolean b = (flags & MASK) != 0; // Parentheses mandatory!"
  },
  {
    question: "What is the precedence hierarchy among Logical operators (`!`, `&&`, `||`)?",
    shortAnswer: "Unary NOT (`!`) > Logical AND (`&&`) > Logical OR (`||`).",
    explanation: "`!` is unary (Level 13), `&&` is Level 4, `||` is Level 3.",
    hint: "! > && > ||.",
    level: "basic",
    codeExample: "boolean b = !x || y && z; // (!x) || (y && z)"
  },
  {
    question: "What is the difference between Precedence and Order of Evaluation in Java (JLS §15.7)?",
    shortAnswer: "Precedence determines how operators group with operands, whereas Order of Evaluation is strictly Left-to-Right for all operand sub-expressions.",
    explanation: "Even in `a() + b() * c()`, `a()` is executed first, then `b()`, then `c()`, before the multiplication is computed.",
    hint: "Grouping is precedence; operand evaluation is strictly Left-to-Right.",
    level: "advanced",
    codeExample: "int res = first() + second() * third(); // first() runs first!"
  },
  {
    question: "What is the evaluated result of `int a = 10, b = 20, c = 30; int res = a += b *= c;`?",
    shortAnswer: "`res = 610`, `b = 600`, `a = 610`.",
    explanation: "Right-to-Left: `b *= c` is `b = 20 * 30 = 600`. Then `a += 600` is `a = 10 + 600 = 610`.",
    hint: "b *= c evaluated first (600), then a += 600.",
    level: "intermediate",
    codeExample: "int a = 10, b = 20, c = 30;\na += b *= c; // a is 610"
  },
  {
    question: "What is the evaluated result of `int x = 5; int res = ++x + x++;` in Java?",
    shortAnswer: "`12`.",
    explanation: "`++x` increments `x` to `6` and returns `6`. Then `x++` returns `6` (and increments `x` to `7`). `6 + 6 = 12`.",
    hint: "6 + 6 = 12.",
    level: "expert",
    codeExample: "int x = 5;\nint res = ++x + x++; // 12"
  },
  {
    question: "What is the evaluated result of `int x = 5; int res = x++ + ++x;` in Java?",
    shortAnswer: "`12`.",
    explanation: "`x++` returns `5` (increments `x` to `6`). Then `++x` increments `x` to `7` and returns `7`. `5 + 7 = 12`.",
    hint: "5 + 7 = 12.",
    level: "expert",
    codeExample: "int x = 5;\nint res = x++ + ++x; // 12"
  },
  {
    question: "Where does the `instanceof` operator sit in the Java precedence table?",
    shortAnswer: "In the Relational tier (Level 9), same as `<`, `>`, `<=`, `>=`.",
    explanation: "It has higher precedence than equality operators (`==`, `!=`).",
    hint: "Same level as relational operators (<, >).",
    level: "intermediate",
    codeExample: "boolean check = obj instanceof String == true;"
  },
  {
    question: "Where does the Type Cast operator `(type)` sit in the precedence table?",
    shortAnswer: "In the Unary tier (Level 13, Right-to-Left associative).",
    explanation: "Cast binds tighter than arithmetic operators: `(int) 5.5 + 2` is `((int) 5.5) + 2 = 5 + 2 = 7`.",
    hint: "Unary tier; binds tighter than binary arithmetic.",
    level: "intermediate",
    codeExample: "int x = (int) 5.5 + 2; // (5) + 2 = 7"
  },
  {
    question: "What is the evaluated result of `(int) (5.5 + 2.5)` vs `(int) 5.5 + 2.5` in Java?",
    shortAnswer: "`(int)(5.5 + 2.5)` is `(int)8.0 = 8` (integer); `(int)5.5 + 2.5` is `5 + 2.5 = 7.5` (double).",
    explanation: "Parentheses override cast precedence.",
    hint: "Cast binds to immediate operand unless parenthesized.",
    level: "basic",
    codeExample: "int a = (int)(5.5 + 2.5);  // 8\ndouble b = (int)5.5 + 2.5; // 7.5"
  },
  {
    question: "What is the evaluated result of `true ? 1 : 2 + 3` in Java?",
    shortAnswer: "`1`.",
    explanation: "Additive `+` has higher precedence than Ternary `? :`. Evaluates as `true ? 1 : (2 + 3)` = `1`.",
    hint: "2 + 3 is grouped in false branch.",
    level: "basic",
    codeExample: "int x = true ? 1 : 2 + 3; // 1"
  },
  {
    question: "What is the evaluated result of `false ? 1 + 2 : 3 * 4` in Java?",
    shortAnswer: "`12`.",
    explanation: "Arithmetic operations inside branches are evaluated according to their own precedence: returns `3 * 4 = 12`.",
    hint: "Returns 3 * 4 = 12.",
    level: "basic",
    codeExample: "int x = false ? 1 + 2 : 3 * 4; // 12"
  },
  {
    question: "In the Coder & AccoTax Barrackpore payroll engine, why are parentheses used in `(basic + allowances) * taxRate`?",
    shortAnswer: "Because `*` has higher precedence than `+`. Without parentheses, `basic + allowances * taxRate` would apply tax only to allowances!",
    explanation: "Parentheses ensure proper mathematical grouping for business rules.",
    hint: "Without parentheses, tax applies only to allowances.",
    level: "basic",
    codeExample: "double tax = (basic + allowances) * rate;"
  },
  {
    question: "What is the complete 15-tier precedence order summary in Java?",
    shortAnswer: "1. Postfix → 2. Unary → 3. Cast/Creation → 4. Multiplicative → 5. Additive → 6. Shift → 7. Relational → 8. Equality → 9. Bitwise AND → 10. Bitwise XOR → 11. Bitwise OR → 12. Logical AND → 13. Logical OR → 14. Ternary → 15. Assignment.",
    explanation: "The complete standard Java operator precedence hierarchy.",
    hint: "Postfix > Unary > Math > Shift > Compare > Bitwise > Logical > Ternary > Assign.",
    level: "advanced",
    codeExample: "// Postfix > Unary > * / % > + - > << >> > < > > == != > & > ^ > | > && > || > ? : > ="
  },
  {
    question: "What is the evaluated result of `5 + 3 * 2 > 10 && 4 < 2 + 3` in Java?",
    shortAnswer: "`true`.",
    explanation: "1. Multiplicative: `3 * 2 = 6`. 2. Additive: `5 + 6 = 11`, `2 + 3 = 5`. 3. Relational: `11 > 10` is `true`, `4 < 5` is `true`. 4. Logical AND: `true && true` = `true`.",
    hint: "Math first, then Relational, then Logical AND.",
    level: "intermediate",
    codeExample: "boolean b = 5 + 3 * 2 > 10 && 4 < 2 + 3; // true"
  },
  {
    question: "What is the result of `- -5` in Java?",
    shortAnswer: "`5`.",
    explanation: "Unary minus is Right-to-Left associative: `-(-5) = 5`.",
    hint: "Negating -5 produces 5.",
    level: "basic",
    codeExample: "int x = - -5; // 5"
  },
  {
    question: "What is the result of `~ ~10` in Java?",
    shortAnswer: "`10`.",
    explanation: "Double bitwise NOT inverts bits twice, restoring the original value.",
    hint: "Restores original value 10.",
    level: "basic",
    codeExample: "int x = ~ ~10; // 10"
  },
  {
    question: "What is the result of `! !true` in Java?",
    shortAnswer: "`true`.",
    explanation: "Double logical NOT preserves truth value.",
    hint: "Double NOT is true.",
    level: "basic",
    codeExample: "boolean b = ! !true; // true"
  },
  {
    question: "Why should developers NEVER rely on obscure precedence rules in production code?",
    shortAnswer: "Because human readers frequently misinterpret operator precedence, leading to severe business logic defects.",
    explanation: "Always use explicit parentheses to document intent clearly.",
    hint: "Explicit parentheses prevent human misinterpretation.",
    level: "basic",
    codeExample: "int result = (a & MASK) + ((b >> 2) * c); // Clear and unambiguous"
  },
  {
    question: "What is the result of `int x = 1; x = x + (x = 2);` in Java?",
    shortAnswer: "`x = 3`.",
    explanation: "Left-to-right evaluation: the first `x` is evaluated as `1`. Then `(x = 2)` assigns `2` to `x` and evaluates to `2`. `1 + 2 = 3`.",
    hint: "Left operand 1 is fetched before right assignment runs.",
    level: "expert",
    codeExample: "int x = 1;\nx = x + (x = 2); // 3"
  },
  {
    question: "What is the ultimate takeaway of Topic 16 for Java developers?",
    shortAnswer: "Operator precedence and associativity govern expression binding, but clean engineering demands explicit parentheses to make complex formulas unambiguous, maintainable, and safe.",
    explanation: "Mastering the 15 precedence tiers guarantees complete control over expression evaluation.",
    hint: "Precedence governs binding; parentheses ensure safety and readability.",
    level: "basic",
    codeExample: "// Summary: Master the 15 tiers, but ALWAYS use parentheses for clarity"
  },
  {
    question: "What is the next topic (Topic 17) in Module 001_003?",
    shortAnswer: "Parentheses for controlling evaluation order and code readability.",
    explanation: "Topic 17 deep-dives into overriding default precedence, improving software readability, and eliminating subtle logic bugs.",
    hint: "Parentheses and evaluation order control.",
    level: "basic",
    codeExample: "// Topic 17: Parentheses ( )"
  }
];

export default questions;
