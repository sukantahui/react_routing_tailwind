/**
 * Module 001_003: Topic 9: Logical operators: Logical AND (&&), Logical OR (||), Logical NOT (!)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What are the 3 core Logical operators in Java?",
    shortAnswer: "Logical AND (`&&`), Logical OR (`||`), and Logical NOT (`!`).",
    explanation: "These operators perform boolean algebra on `boolean` operands to produce a composite `boolean` result.",
    hint: "&&, ||, !",
    level: "basic",
    codeExample: "boolean canEnter = (hasTicket && isWearingMask) || isVIP;"
  },
  {
    question: "What is the truth condition for Logical AND (`&&`) in Java?",
    shortAnswer: "It evaluates to `true` if and only if **both** operands are `true`; otherwise it evaluates to `false`.",
    explanation: "`true && true` is `true`; all other combinations (`true && false`, `false && true`, `false && false`) return `false`.",
    hint: "Both operands must be true.",
    level: "basic",
    codeExample: "boolean eligible = (age >= 18 && hasVoterCard);"
  },
  {
    question: "What is the truth condition for Logical OR (`||`) in Java?",
    shortAnswer: "It evaluates to `true` if **at least one** operand is `true`; it evaluates to `false` only if both operands are `false`.",
    explanation: "`false || false` is `false`; any `true` operand makes the entire expression `true`.",
    hint: "At least one operand must be true.",
    level: "basic",
    codeExample: "boolean hasDiscount = (isStudent || isSeniorCitizen);"
  },
  {
    question: "What is the truth condition for Logical NOT (`!`) in Java?",
    shortAnswer: "It inverts the boolean value: `!true` becomes `false`, and `!false` becomes `true`.",
    explanation: "Logical NOT is a unary operator that acts on a single boolean operand.",
    hint: "Inverts boolean truth values.",
    level: "basic",
    codeExample: "boolean isBlocked = !isApproved;"
  },
  {
    question: "What is the precedence order among the 3 logical operators?",
    shortAnswer: "`!` (Highest) $\\to$ `&&` (Medium) $\\to$ `||` (Lowest).",
    explanation: "Logical NOT binds first, then Logical AND, then Logical OR.",
    hint: "! precedes && which precedes ||.",
    level: "intermediate",
    codeExample: "boolean res = a || b && !c; // Grouped as: a || (b && (!c))"
  },
  {
    question: "What is the evaluated result of `true || false && false` in Java?",
    shortAnswer: "`true`.",
    explanation: "Because `&&` has higher precedence than `||`, `false && false` evaluates to `false` first, and `true || false` evaluates to `true`.",
    hint: "&& is evaluated before ||.",
    level: "basic",
    codeExample: "boolean b = true || false && false; // true || (false && false) -> true"
  },
  {
    question: "What is the evaluated result of `(true || false) && false` in Java?",
    shortAnswer: "`false`.",
    explanation: "Parentheses override precedence: `(true || false)` is `true`, and `true && false` is `false`.",
    hint: "Parentheses force || to evaluate first.",
    level: "basic",
    codeExample: "boolean b = (true || false) && false; // true && false -> false"
  },
  {
    question: "What is De Morgan's First Law of boolean logic?",
    shortAnswer: "`!(A && B) == (!A || !B)`",
    explanation: "The negation of a conjunction is equivalent to the disjunction of the negations.",
    hint: "!(A && B) = (!A || !B).",
    level: "intermediate",
    codeExample: "boolean check = !(age >= 18 && hasID) == (age < 18 || !hasID);"
  },
  {
    question: "What is De Morgan's Second Law of boolean logic?",
    shortAnswer: "`!(A || B) == (!A && !B)`",
    explanation: "The negation of a disjunction is equivalent to the conjunction of the negations.",
    hint: "!(A || B) = (!A && !B).",
    level: "intermediate",
    codeExample: "boolean check = !(isRaining || isSnowing) == (!isRaining && !isSnowing);"
  },
  {
    question: "Can logical operators (`&&`, `||`, `!`) be applied to integer operands in Java (e.g. `1 && 0`)?",
    shortAnswer: "No! Unlike C/C++, Java strictly enforces type safety: logical operators only accept `boolean` operands.",
    explanation: "Attempting to use `1 && 0` results in a compilation error: `The operator && is undefined for the argument type(s) int, int`.",
    hint: "Logical operators strictly require boolean operands.",
    level: "basic",
    codeExample: "// boolean bad = 1 && 0; // COMPILATION ERROR!"
  },
  {
    question: "What is the difference between single `&` and double `&&` when applied to booleans?",
    shortAnswer: "`&&` is a short-circuit operator (skips right operand if left is false); `&` is a non-short-circuit logical operator (always evaluates both operands).",
    explanation: "In `false && (++x > 0)`, `x` is NOT incremented. In `false & (++x > 0)`, `x` IS incremented.",
    hint: "&& short-circuits; & eagerly evaluates both operands.",
    level: "intermediate",
    codeExample: "boolean b1 = false && (10 / 0 == 0); // Safe (short-circuit)\n// boolean b2 = false & (10 / 0 == 0);  // THROWS ArithmeticException: / by zero"
  },
  {
    question: "What is the difference between single `|` and double `||` when applied to booleans?",
    shortAnswer: "`||` short-circuits (skips right operand if left is true); `|` always evaluates both operands.",
    explanation: "`true || (...)` stops immediately, while `true | (...)` evaluates both sides.",
    hint: "|| short-circuits on true; | evaluates both.",
    level: "intermediate",
    codeExample: "boolean b1 = true || (10 / 0 == 0); // Safe (short-circuit)"
  },
  {
    question: "What is the result of `! (5 > 3 && 2 < 4)`?",
    shortAnswer: "`false`.",
    explanation: "`5 > 3` is `true`, `2 < 4` is `true`. `true && true` is `true`. Negating with `!` yields `false`.",
    hint: "!(true && true) = !true = false.",
    level: "basic",
    codeExample: "boolean b = !(5 > 3 && 2 < 4); // false"
  },
  {
    question: "What is the result of `true && true && false && true`?",
    shortAnswer: "`false`.",
    explanation: "A single `false` in a chain of `&&` makes the entire expression `false`.",
    hint: "Any false in && chain results in false.",
    level: "basic",
    codeExample: "boolean b = true && true && false && true; // false"
  },
  {
    question: "What is the result of `false || false || true || false`?",
    shortAnswer: "`true`.",
    explanation: "A single `true` in a chain of `||` makes the entire expression `true`.",
    hint: "Any true in || chain results in true.",
    level: "basic",
    codeExample: "boolean b = false || false || true || false; // true"
  },
  {
    question: "How should compound range conditions (e.g. `10 <= score <= 100`) be written in Java?",
    shortAnswer: "Using logical AND: `score >= 10 && score <= 100`.",
    explanation: "Java does not support chained inequality syntax.",
    hint: "Use score >= 10 && score <= 100.",
    level: "basic",
    codeExample: "boolean valid = (score >= 0 && score <= 100);"
  },
  {
    question: "What is the result of `!(true || false) && true`?",
    shortAnswer: "`false`.",
    explanation: "`true || false` is `true`. `!true` is `false`. `false && true` is `false`.",
    hint: "!(true) && true = false && true = false.",
    level: "basic",
    codeExample: "boolean b = !(true || false) && true; // false"
  },
  {
    question: "What is the result of `!true || !false` in Java?",
    shortAnswer: "`true`.",
    explanation: "`!true` is `false`, `!false` is `true`. `false || true` is `true`.",
    hint: "false || true = true.",
    level: "basic",
    codeExample: "boolean b = !true || !false; // true"
  },
  {
    question: "What is the result of `!(true && !false)` in Java?",
    shortAnswer: "`false`.",
    explanation: "`!false` is `true`. `true && true` is `true`. `!true` is `false`.",
    hint: "!(true && true) = !true = false.",
    level: "basic",
    codeExample: "boolean b = !(true && !false); // false"
  },
  {
    question: "What is the boolean XOR (Exclusive OR) operator in Java?",
    shortAnswer: "`^` (e.g. `a ^ b`). Returns `true` if exactly one operand is `true` and the other is `false`.",
    explanation: "`true ^ false` is `true`, `true ^ true` is `false`, `false ^ false` is `false`.",
    hint: "XOR (^) is true only when operands differ.",
    level: "intermediate",
    codeExample: "boolean xor = true ^ false; // true\nboolean same = true ^ true;   // false"
  },
  {
    question: "Why should developers use parentheses when combining `&&` and `||` in business rules?",
    shortAnswer: "To prevent subtle precedence bugs and make business logic unambiguous to other engineers.",
    explanation: "Writing `(a && b) || (c && d)` clearly expresses intent without relying on implicit operator binding.",
    hint: "Parentheses make business logic clear and safe.",
    level: "basic",
    codeExample: "boolean admitted = (marks >= 85 && entrance >= 90) || isScholarshipHolder;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore admission engine, how are scholarship qualifications structured?",
    shortAnswer: "`boolean isEligible = (academic >= 85 && entrance >= 90) || (isEarlyBird && entrance >= 75);`",
    explanation: "Combines academic merit with early-bird registration discounts in Indian Rupees (₹).",
    hint: "Compound logic with && and ||.",
    level: "basic",
    codeExample: "boolean discount = (academic >= 85 && entrance >= 90) || (earlyBird && entrance >= 75);"
  },
  {
    question: "What is the result of `!!(true && true)`?",
    shortAnswer: "`true`.",
    explanation: "`true && true` is `true`, and double negation `!!` preserves `true`.",
    hint: "Double negation leaves value unchanged.",
    level: "basic",
    codeExample: "boolean b = !!(true && true); // true"
  },
  {
    question: "What happens when `Boolean` wrapper objects are evaluated with `&&` or `||`?",
    shortAnswer: "Java automatically unboxes `Boolean` to primitive `boolean` before performing the logical operation.",
    explanation: "If a `Boolean` reference is `null`, unboxing will throw `NullPointerException`.",
    hint: "Auto-unboxing occurs on Boolean objects.",
    level: "intermediate",
    codeExample: "Boolean b1 = Boolean.TRUE, b2 = Boolean.FALSE;\nboolean res = b1 && b2; // false"
  },
  {
    question: "How can you prevent `NullPointerException` when evaluating a nullable `Boolean` wrapper object with `&&`?",
    shortAnswer: "Check for null first: `b != null && b` or `Boolean.TRUE.equals(b)`.",
    explanation: "`Boolean.TRUE.equals(b)` returns `false` safely if `b` is `null`.",
    hint: "Boolean.TRUE.equals(b) is null-safe.",
    level: "intermediate",
    codeExample: "Boolean flag = null;\nboolean isSet = Boolean.TRUE.equals(flag); // false (No NullPointerException!)"
  },
  {
    question: "What is the result of `true || (false && true) || false`?",
    shortAnswer: "`true`.",
    explanation: "Since the first operand is `true`, the `||` chain evaluates to `true`.",
    hint: "Leading true in || chain makes it true.",
    level: "basic",
    codeExample: "boolean b = true || (false && true) || false; // true"
  },
  {
    question: "What is the associativity of `&&` and `||` operators in Java?",
    shortAnswer: "Left-to-Right.",
    explanation: "`a && b && c` is evaluated as `(a && b) && c`.",
    hint: "Left-to-Right associative.",
    level: "basic",
    codeExample: "boolean b = a && b && c; // (a && b) && c"
  },
  {
    question: "Can `&&` and `||` be used in `assert` statements?",
    shortAnswer: "Yes, assertions take any boolean expression: `assert user != null && user.isValid() : \"Invalid user\";`",
    explanation: "Standard usage for internal invariant validation.",
    hint: "Assertions take boolean expressions.",
    level: "intermediate",
    codeExample: "assert age >= 0 && age <= 120 : \"Invalid age\";"
  },
  {
    question: "What is the ultimate takeaway of Topic 9 for Java developers?",
    shortAnswer: "Logical operators (&&, ||, !) form the foundation of decision trees and filtering logic, governed by strict precedence (! > && > ||) and De Morgan's Laws.",
    explanation: "Mastering logical operators ensures clean, defensive conditional routing across validation pipelines and security gates.",
    hint: "! > && > || precedence and De Morgan's laws.",
    level: "basic",
    codeExample: "// Summary: && (all true), || (at least one true), ! (inverts truth), ! > && > ||"
  },
  {
    question: "What is the next topic (Topic 10) in Module 001_003?",
    shortAnswer: "Short-circuit evaluation in && and || operators and its side-effects.",
    explanation: "Topic 10 covers short-circuit evaluation mechanics, defensive null-guard patterns, and state mutation hazards.",
    hint: "Short-circuit evaluation deep dive.",
    level: "basic",
    codeExample: "// Topic 10: Short-circuit evaluation"
  }
];

export default questions;
