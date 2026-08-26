/**
 * Module 001_004: Topic 5: Combining complex boolean conditions using &&, ||, and !
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the role of Logical Operators (`&&`, `||`, `!`) in Java control flow?",
    shortAnswer: "To combine multiple boolean sub-expressions into composite decision predicates.",
    explanation: "Allows software to express complex business rules and security policies.",
    hint: "Combines boolean expressions into composite decision criteria.",
    level: "basic",
    codeExample: "if (isEnrolled && hasPaidFee) { enterLab(); }"
  },
  {
    question: "What is the Operator Precedence among `!`, `&&`, and `||` in Java?",
    shortAnswer: "`!` (Logical NOT) > `&&` (Logical AND) > `||` (Logical OR).",
    explanation: "`!` binds highest, followed by `&&`, and finally `||` binds with lowest priority.",
    hint: "! binds highest, then &&, then ||.",
    level: "basic",
    codeExample: "// !a && b || c is evaluated as ((!a) && b) || c"
  },
  {
    question: "What is Short-Circuit Evaluation in `&&` and `||`?",
    shortAnswer: "Stopping evaluation of subsequent sub-expressions as soon as the overall truth value is determined: `&&` short-circuits on `false`, and `||` short-circuits on `true`.",
    explanation: "Prevents unnecessary calculations and enables defensive null-guards.",
    hint: "&& stops on false; || stops on true.",
    level: "basic",
    codeExample: "if (student != null && student.isEligible()) { }"
  },
  {
    question: "Why can you NOT write `0 <= score <= 100` in Java?",
    shortAnswer: "Because `0 <= score` evaluates to a `boolean` (`true` or `false`), and you cannot compare a `boolean <= 100` (causes a compilation error).",
    explanation: "Must be written as `score >= 0 && score <= 100`.",
    hint: "Chained comparisons are invalid; combine with &&.",
    level: "basic",
    codeExample: "if (score >= 0 && score <= 100) { /* Valid */ }"
  },
  {
    question: "What is De Morgan's First Law in boolean logic?",
    shortAnswer: "`!(A && B)` is logically equivalent to `!A || !B`.",
    explanation: "Negation of a conjunction is the disjunction of the negations.",
    hint: "!(A && B) = !A || !B.",
    level: "intermediate",
    codeExample: "boolean invalid = !(hasId && hasFee); // !hasId || !hasFee"
  },
  {
    question: "What is De Morgan's Second Law in boolean logic?",
    shortAnswer: "`!(A || B)` is logically equivalent to `!A && !B`.",
    explanation: "Negation of a disjunction is the conjunction of the negations.",
    hint: "!(A || B) = !A && !B.",
    level: "intermediate",
    codeExample: "boolean neither = !(hasPassport || hasVoterId); // !hasPassport && !hasVoterId"
  },
  {
    question: "What is a Defensive Null Guard using `&&`?",
    shortAnswer: "Placing a `null` check as the first condition so that if the object is `null`, evaluation immediately short-circuits, preventing a `NullPointerException`.",
    explanation: "One of the most essential idioms in Java software engineering.",
    hint: "obj != null placed before method invocations.",
    level: "basic",
    codeExample: "if (user != null && user.isActive()) { login(); }"
  },
  {
    question: "What is the evaluated result of `true || false && false` in Java?",
    shortAnswer: "`true`.",
    explanation: "`&&` binds before `||`: `true || (false && false)` = `true || false = true` (also short-circuits at `true ||`).",
    hint: "Evaluates to true.",
    level: "basic",
    codeExample: "boolean b = true || false && false; // true"
  },
  {
    question: "What is the evaluated result of `(true || false) && false`?",
    shortAnswer: "`false`.",
    explanation: "Parentheses override precedence: `(true) && false = false`.",
    hint: "Evaluates to false.",
    level: "basic",
    codeExample: "boolean b = (true || false) && false; // false"
  },
  {
    question: "Why are parentheses strongly recommended in mixed boolean expressions (`a && b || c`)?",
    shortAnswer: "To eliminate ambiguity, communicate intent clearly to all team members, and prevent subtle precedence misinterpretations.",
    explanation: "Defensive coding principle in clean architecture.",
    hint: "Explicit grouping prevents operator precedence confusion.",
    level: "basic",
    codeExample: "if ((isStudent && hasCard) || isVIP) { }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore loan approval engine, how are conditions combined?",
    shortAnswer: "`(score >= 80 || creditScore >= 720) && (loanAmount <= 300000.0 || hasCoSigner)`",
    explanation: "Demonstrates composite criteria: academic merit or credit combined with loan limit or co-signer guarantee in Indian Rupees (₹).",
    hint: "Merit/credit check combined with loan limit/co-signer check.",
    level: "basic",
    codeExample: "boolean eligible = (merit || credit) && (smallLoan || coSigner);"
  },
  {
    question: "What is the difference between Bitwise Operators (`&`, `|`) and Logical Operators (`&&`, `||`) in conditional statements?",
    shortAnswer: "Logical operators (`&&`, `||`) short-circuit and operate strictly on booleans; bitwise operators (`&`, `|`) evaluate BOTH operands unconditionally.",
    explanation: "Using `&` in null guards is dangerous because it invokes the method even if the object is null!",
    hint: "Logical operators short-circuit; bitwise operators do not.",
    level: "intermediate",
    codeExample: "// DANGEROUS: if (obj != null & obj.isValid()) -> Throws NPE if obj is null!"
  },
  {
    question: "What happens if you evaluate `! (x > 10)`?",
    shortAnswer: "It is equivalent to `x <= 10`.",
    explanation: "Inversion of greater-than is less-than-or-equal.",
    hint: "!(x > 10) simplifies to x <= 10.",
    level: "basic",
    codeExample: "boolean b = !(x > 10); // x <= 10"
  },
  {
    question: "What is the inverted condition of `!(a == b)`?",
    shortAnswer: "`a != b`.",
    explanation: "Standard relational negation.",
    hint: "Negation of == is !=.",
    level: "basic",
    codeExample: "if (a != b) { }"
  },
  {
    question: "What is the inverted condition of `!(x >= 5 && x <= 20)`?",
    shortAnswer: "`x < 5 || x > 20` (by De Morgan's Law).",
    explanation: "Inverts the interval check into an out-of-bounds check.",
    hint: "x < 5 || x > 20.",
    level: "intermediate",
    codeExample: "if (x < 5 || x > 20) { /* Out of range */ }"
  },
  {
    question: "What is the evaluated result of `!true && false` vs `!(true && false)`?",
    shortAnswer: "`!true && false` is `false && false = false`; `!(true && false)` is `!(false) = true`.",
    explanation: "Parentheses alter what is being negated.",
    hint: "false vs true.",
    level: "basic",
    codeExample: "boolean a = !true && false;   // false\nboolean b = !(true && false); // true"
  },
  {
    question: "How can you test if an integer `year` is a Leap Year using composite boolean conditions?",
    shortAnswer: "`if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))`",
    explanation: "Classic computer science leap year calculation.",
    hint: "Divisible by 4 and not 100, or divisible by 400.",
    level: "intermediate",
    codeExample: "boolean isLeap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);"
  },
  {
    question: "What is the result of `false && (10 / 0 == 0)`?",
    shortAnswer: "`false` (does NOT throw an `ArithmeticException` due to short-circuiting!).",
    explanation: "Because the left operand is `false`, the right operand is never evaluated.",
    hint: "Short-circuit prevents division by zero exception.",
    level: "basic",
    codeExample: "boolean safe = false && (10 / 0 == 0); // false"
  },
  {
    question: "What is the result of `true || (10 / 0 == 0)`?",
    shortAnswer: "`true` (does NOT throw an `ArithmeticException` due to short-circuiting!).",
    explanation: "Because the left operand is `true`, the right operand is never evaluated.",
    hint: "Short-circuit prevents exception.",
    level: "basic",
    codeExample: "boolean safe = true || (10 / 0 == 0); // true"
  },
  {
    question: "What is the Boolean Absorption Law in boolean algebra?",
    shortAnswer: "`A || (A && B)` simplifies to `A`, and `A && (A || B)` simplifies to `A`.",
    explanation: "Useful for simplifying redundant enterprise conditions.",
    hint: "A || (A && B) = A.",
    level: "advanced",
    codeExample: "// if (isAdmin || (isAdmin && isSuperUser)) -> if (isAdmin)"
  },
  {
    question: "What is the Boolean Identity Law?",
    shortAnswer: "`A && true` simplifies to `A`, and `A || false` simplifies to `A`.",
    explanation: "Fundamental identity properties.",
    hint: "A && true = A; A || false = A.",
    level: "basic",
    codeExample: "// Remove redundant && true or || false"
  },
  {
    question: "What is the Boolean Annihilation Law?",
    shortAnswer: "`A && false` simplifies to `false`, and `A || true` simplifies to `true`.",
    explanation: "Annihilates the variable component.",
    hint: "A && false = false; A || true = true.",
    level: "basic",
    codeExample: "// A && false is always false"
  },
  {
    question: "What is the Boolean Idempotence Law?",
    shortAnswer: "`A && A` simplifies to `A`, and `A || A` simplifies to `A`.",
    explanation: "Duplicate condition checks are redundant.",
    hint: "A && A = A.",
    level: "basic",
    codeExample: "// if (isReady && isReady) -> if (isReady)"
  },
  {
    question: "What is the Double Negation Law?",
    shortAnswer: "`!!A` simplifies to `A`.",
    explanation: "Double inversion returns to the original truth value.",
    hint: "!!A = A.",
    level: "basic",
    codeExample: "// !!valid -> valid"
  },
  {
    question: "Why is it dangerous to have side effects inside composite boolean expressions (e.g. `if (a && ++count > 5)`)?",
    shortAnswer: "Because short-circuiting means `++count` will only execute when `a` is `true`, making the mutation non-deterministic and causing silent state bugs.",
    explanation: "Always perform mutations outside the condition.",
    hint: "Mutations may be skipped due to short-circuiting.",
    level: "intermediate",
    codeExample: "// Bad: if (a && ++i > 5) -> i only increments if a is true!"
  },
  {
    question: "How should you refactor a method with 6 complex composite boolean conditions?",
    shortAnswer: "Extract meaningful parts into well-named private boolean helper methods (`isEligibleForScholarship()`, `hasValidIdentityProof()`).",
    explanation: "Converts cognitive clutter into clean self-documenting code.",
    hint: "Extract explanatory boolean helper methods.",
    level: "basic",
    codeExample: "if (hasValidIdentity() && isFinancialEligible()) { }"
  },
  {
    question: "What is the result of `boolean b = true; if (!b == false)`?",
    shortAnswer: "`true`.",
    explanation: "`!true` is `false`, and `false == false` is `true` (though written non-idiomatically; write `if (b)`).",
    hint: "Evaluates to true; write if (b) instead.",
    level: "basic",
    codeExample: "if (!b == false) // Equivalent to if (b)"
  },
  {
    question: "What is the associativity of `&&` and `||` in Java?",
    shortAnswer: "Left-to-Right.",
    explanation: "`a && b && c` is evaluated as `(a && b) && c`.",
    hint: "Left-to-right associative.",
    level: "basic",
    codeExample: "// a && b && c evaluated left-to-right"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 5 for Java developers?",
    shortAnswer: "Combining boolean conditions using `&&`, `||`, and `!` allows precise composite decision modeling; always remember precedence (`!` > `&&` > `||`), leverage short-circuiting for defensive null guards, apply De Morgan's laws to simplify negative logic, and use parentheses for readability.",
    explanation: "Forms the mathematical engine for all enterprise routing rules.",
    hint: "Use &&, ||, ! with clear parentheses, short-circuit guards, and De Morgan's laws.",
    level: "basic",
    codeExample: "// Summary: (A || B) && (C || D) with defensive null guards"
  },
  {
    question: "What is the next topic (Topic 6) in Module 001_004?",
    shortAnswer: "Traditional 'switch-case' statement: syntax, matching rules, and valid data types (byte, short, int, char, String, enum).",
    explanation: "Topic 6 explores the traditional switch statement, valid primitive and object selector types, compile-time case constants, and execution flow.",
    hint: "Traditional switch-case statement and valid types.",
    level: "basic",
    codeExample: "// Topic 6: Traditional switch-case statement"
  }
];

export default questions;
