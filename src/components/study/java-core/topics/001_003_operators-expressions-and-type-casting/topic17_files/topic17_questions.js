/**
 * Module 001_003: Topic 17: Parentheses for controlling evaluation order and code readability
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary role of Parentheses `( )` in Java expressions?",
    shortAnswer: "To explicitly control and override default operator precedence and establish unambiguous sub-expression grouping.",
    explanation: "Sub-expressions enclosed in parentheses are grouped together as atomic units in the syntax tree.",
    hint: "Overrides default operator precedence.",
    level: "basic",
    codeExample: "int result = (a + b) * c; // Addition evaluated before multiplication"
  },
  {
    question: "What is the precedence level of Parentheses in Java?",
    shortAnswer: "Level 14/15 (the highest precedence tier in the Java language).",
    explanation: "Parentheses bind with the highest priority, overriding all other operators.",
    hint: "Highest precedence tier.",
    level: "basic",
    codeExample: "int x = 2 * (3 + 4); // (3 + 4) evaluated first = 14"
  },
  {
    question: "How do parentheses fix the String Concatenation Addition Trap `\"Sum: \" + a + b`?",
    shortAnswer: "By wrapping the numeric addition in parentheses: `\"Sum: \" + (a + b)`.",
    explanation: "Without parentheses, `\"Sum: \" + 10 + 20` produces `\"Sum: 1020\"`. With parentheses, `(10 + 20)` adds to `30`, yielding `\"Sum: 30\"`.",
    hint: "\"Sum: \" + (a + b) forces numeric addition.",
    level: "basic",
    codeExample: "System.out.println(\"Total: ₹\" + (15000 + 5000)); // \"Total: ₹20000\""
  },
  {
    question: "Do parentheses change the Left-to-Right evaluation order of operands (JLS §15.7)?",
    shortAnswer: "No! Parentheses alter the operator grouping (AST structure), but operand sub-expressions are still evaluated strictly Left-to-Right.",
    explanation: "In `(a() + b()) * c()`, `a()` executes first, `b()` second, and `c()` third.",
    hint: "Operands are still evaluated Left-to-Right.",
    level: "advanced",
    codeExample: "int res = (first() + second()) * third(); // first() runs first"
  },
  {
    question: "Why are parentheses mandatory in the quadratic formula `(-b + Math.sqrt(d)) / (2 * a)`?",
    shortAnswer: "Without parentheses around `(2 * a)`, Java would evaluate `... / 2 * a` as `(... / 2) * a`, multiplying by `a` instead of dividing by `2a`!",
    explanation: "Division and multiplication have equal precedence and associate left-to-right.",
    hint: "Prevents / 2 * a from multiplying by a.",
    level: "basic",
    codeExample: "double root = (-b + Math.sqrt(d)) / (2 * a);"
  },
  {
    question: "How do parentheses protect bitmask checks like `(flags & MASK) != 0`?",
    shortAnswer: "Because `!=` has higher precedence than `&`. Without parentheses, `flags & MASK != 0` attempts `flags & (MASK != 0)`, which causes a compile error!",
    explanation: "Parentheses isolate the bitwise AND calculation before comparison.",
    hint: "(flags & MASK) != 0 is required.",
    level: "intermediate",
    codeExample: "if ((flags & MASK) != 0) { /* 100% Correct */ }"
  },
  {
    question: "What is the evaluated result of `100 / (10 * 2)` vs `100 / 10 * 2`?",
    shortAnswer: "`100 / (10 * 2)` is `5`; `100 / 10 * 2` is `20`.",
    explanation: "Parentheses force multiplication before division.",
    hint: "100 / 20 = 5 vs 10 * 2 = 20.",
    level: "basic",
    codeExample: "int a = 100 / (10 * 2); // 5\nint b = 100 / 10 * 2;   // 20"
  },
  {
    question: "How do parentheses enhance code readability in complex boolean business logic?",
    shortAnswer: "By visually separating independent conditions: `(isStudent && hasVoterID) || (isSenior && hasPassport)`.",
    explanation: "Eliminates doubt for other engineers reviewing the business logic.",
    hint: "Makes composite conditions explicit and readable.",
    level: "basic",
    codeExample: "boolean eligible = (isScholarship && isMerit) || isEarlyBird;"
  },
  {
    question: "Can redundant parentheses cause performance overhead in Java?",
    shortAnswer: "No! The Java compiler optimizes away redundant parentheses during Abstract Syntax Tree (AST) construction with zero runtime cost.",
    explanation: "Parentheses exist purely at parse time; bytecode is identical.",
    hint: "Zero performance cost.",
    level: "intermediate",
    codeExample: "int x = ((10 + 20)); // Identical bytecode to: int x = 30;"
  },
  {
    question: "What is the result of `(5 + 3) * (4 - 2)`?",
    shortAnswer: "`16`.",
    explanation: "`8 * 2 = 16`.",
    hint: "8 * 2 = 16.",
    level: "basic",
    codeExample: "int res = (5 + 3) * (4 - 2); // 16"
  },
  {
    question: "What is the result of `((10 + 5) * 2) - 10`?",
    shortAnswer: "`20`.",
    explanation: "`15 * 2 = 30`. `30 - 10 = 20`.",
    hint: "(15 * 2) - 10 = 20.",
    level: "basic",
    codeExample: "int res = ((10 + 5) * 2) - 10; // 20"
  },
  {
    question: "In the Compound Interest formula `P * Math.pow((1 + r/n), n*t)`, where are parentheses essential?",
    shortAnswer: "Around `(1 + r/n)` for base addition and around `(n * t)` for exponent calculation.",
    explanation: "Ensures accurate financial interest compounding in Indian Rupees (₹).",
    hint: "Parentheses in base and exponent.",
    level: "basic",
    codeExample: "double A = P * Math.pow((1 + r/n), (n * t));"
  },
  {
    question: "What happens if you write `int x = (int) 10.5 + 2.5;` vs `int x = (int) (10.5 + 2.5);`?",
    shortAnswer: "`(int) 10.5 + 2.5` results in `10 + 2.5 = 12.5` (double, causes compile error when assigned to int); `(int)(10.5 + 2.5)` evaluates to `(int)(13.0) = 13` (int).",
    explanation: "Cast binds only to `10.5` without outer parentheses.",
    hint: "Parentheses ensure cast applies to entire sum.",
    level: "intermediate",
    codeExample: "int x = (int)(10.5 + 2.5); // 13"
  },
  {
    question: "How do parentheses affect the ternary operator in `(a > b ? a : b) + 10`?",
    shortAnswer: "They force the ternary operator to evaluate first before adding 10 to the selected maximum value.",
    explanation: "Ensures addition applies to the selected result.",
    hint: "Ternary resolves before addition.",
    level: "intermediate",
    codeExample: "int nextMax = (a > b ? a : b) + 10;"
  },
  {
    question: "What is the result of `10 * (5 - 3 + 2)`?",
    shortAnswer: "`40`.",
    explanation: "`5 - 3 + 2 = 4`. `10 * 4 = 40`.",
    hint: "10 * 4 = 40.",
    level: "basic",
    codeExample: "int res = 10 * (5 - 3 + 2); // 40"
  },
  {
    question: "What is the result of `10 * 5 - (3 + 2)`?",
    shortAnswer: "`45`.",
    explanation: "`50 - 5 = 45`.",
    hint: "50 - 5 = 45.",
    level: "basic",
    codeExample: "int res = 10 * 5 - (3 + 2); // 45"
  },
  {
    question: "Why should parentheses be used when combining `&&` and `||`?",
    shortAnswer: "To prevent misunderstanding of operator precedence (`&&` > `||`) and make conditional logic explicit.",
    explanation: "Reading `(A && B) || C` is immediately clear compared to `A && B || C`.",
    hint: "Prevents logic errors when mixing && and ||.",
    level: "basic",
    codeExample: "if ((isManager && isApproved) || isOwner) { }"
  },
  {
    question: "Can parentheses be used around method arguments?",
    shortAnswer: "Yes, standard method invocation syntax: `Math.max((a + 5), (b * 2))`.",
    explanation: "Arguments are evaluated before being passed into the method.",
    hint: "Standard argument grouping.",
    level: "basic",
    codeExample: "int val = Math.max((a + 5), (b * 2));"
  },
  {
    question: "What is the result of `(true || false) && (false || true)`?",
    shortAnswer: "`true`.",
    explanation: "`true && true = true`.",
    hint: "true && true = true.",
    level: "basic",
    codeExample: "boolean b = (true || false) && (false || true); // true"
  },
  {
    question: "What is the result of `!(true && false)` vs `(!true) && false`?",
    shortAnswer: "`!(true && false)` is `!false = true`; `(!true) && false` is `false && false = false`.",
    explanation: "Parentheses change what is being negated.",
    hint: "!(false) = true vs false && false = false.",
    level: "basic",
    codeExample: "boolean a = !(true && false); // true\nboolean b = (!true) && false; // false"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student portal, how do parentheses guarantee admission criteria?",
    shortAnswer: "`boolean isAdmitted = (hasPaidFee && hasValidID) && (score >= 80 || isResident);`",
    explanation: "Guarantees student credentials first, then checks merit or local residence.",
    hint: "Group credentials and merit checks.",
    level: "basic",
    codeExample: "boolean ok = (feePaid && idValid) && (merit || resident);"
  },
  {
    question: "What is the result of `(10 > 5) == (20 > 10)`?",
    shortAnswer: "`true`.",
    explanation: "`true == true` is `true`.",
    hint: "true == true.",
    level: "basic",
    codeExample: "boolean b = (10 > 5) == (20 > 10); // true"
  },
  {
    question: "What is the result of `(1 << 2) + (1 << 3)`?",
    shortAnswer: "`12`.",
    explanation: "`4 + 8 = 12`.",
    hint: "4 + 8 = 12.",
    level: "basic",
    codeExample: "int res = (1 << 2) + (1 << 3); // 12"
  },
  {
    question: "What happens if you write `1 << 2 + 1 << 3` without parentheses?",
    shortAnswer: "Addition binds before shift: `1 << (2 + 1) << 3` = `(1 << 3) << 3` = `8 << 3 = 64` (NOT 12!).",
    explanation: "`+` has higher precedence than `<<`.",
    hint: "Without parentheses, + binds first, yielding 64.",
    level: "intermediate",
    codeExample: "int trap = 1 << 2 + 1 << 3; // 64 (THE PRECEDENCE TRAP!)"
  },
  {
    question: "What is defensive parenthesis usage in programming?",
    shortAnswer: "The deliberate practice of adding parentheses even when operator precedence already matches intent, ensuring future maintainers don't introduce bugs.",
    explanation: "A key principle of professional software engineering.",
    hint: "Parentheses added for safety and clarity.",
    level: "basic",
    codeExample: "double gross = (salary * hours) + bonus;"
  },
  {
    question: "What is the result of `(10 % 3) * (20 % 7)`?",
    shortAnswer: "`6`.",
    explanation: "`1 * 6 = 6`.",
    hint: "1 * 6 = 6.",
    level: "basic",
    codeExample: "int res = (10 % 3) * (20 % 7); // 6"
  },
  {
    question: "Can parentheses be nested indefinitely in Java?",
    shortAnswer: "Yes, within JVM compiler stack limits (thousands of levels).",
    explanation: "Deeply nested parentheses are supported by the compiler.",
    hint: "Supported to arbitrary depth.",
    level: "basic",
    codeExample: "int x = ((((1 + 2)))); // 3"
  },
  {
    question: "What is the result of `(a = 5) + (b = 10)` in Java?",
    shortAnswer: "`15` (and assigns 5 to `a` and 10 to `b`).",
    explanation: "Assignments inside parentheses produce the assigned value.",
    hint: "Produces 5 + 10 = 15.",
    level: "intermediate",
    codeExample: "int a, b;\nint sum = (a = 5) + (b = 10); // 15"
  },
  {
    question: "What is the ultimate takeaway of Topic 17 for Java developers?",
    shortAnswer: "Parentheses `( )` are the universal tool for controlling evaluation priority, overriding operator traps, and writing crystal-clear, bug-free production code.",
    explanation: "Mastering parentheses ensures mathematical and logical accuracy across financial, geometric, and boolean pipelines.",
    hint: "Parentheses override precedence and provide crystal-clear clarity.",
    level: "basic",
    codeExample: "// Summary: Always use parentheses ( ) for complex calculations and business logic"
  },
  {
    question: "What is the next topic (Topic 18) in Module 001_003?",
    shortAnswer: "Automatic Type Promotion rules in expressions (byte/short/char promoted to int).",
    explanation: "Topic 18 explores Unary and Binary Numeric Promotion rules in the Java virtual machine.",
    hint: "Automatic type promotion rules.",
    level: "basic",
    codeExample: "// Topic 18: Automatic Type Promotion (byte/short/char -> int)"
  }
];

export default questions;
