/**
 * Module 001_003: Topic 10: Short-circuit evaluation in && and || operators and its side-effects
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Short-Circuit Evaluation in Java?",
    shortAnswer: "Stopping expression evaluation as soon as the final boolean outcome is mathematically guaranteed without evaluating remaining operands.",
    explanation: "For `&&`, if the left operand is `false`, the entire result is `false` (right operand skipped). For `||`, if the left operand is `true`, the result is `true` (right operand skipped).",
    hint: "Stops evaluation as soon as outcome is certain.",
    level: "basic",
    codeExample: "boolean res = (false && anyMethod()); // anyMethod() is NEVER called"
  },
  {
    question: "What is the Defensive Null-Guard Pattern using `&&`?",
    shortAnswer: "`if (obj != null && obj.isValid())` safely checks `obj != null` before calling methods, preventing `NullPointerException`.",
    explanation: "If `obj` is null, the left condition is `false`, and short-circuit `&&` skips `obj.isValid()` completely.",
    hint: "Left null-check protects right method call.",
    level: "basic",
    codeExample: "if (student != null && student.hasPaidFee()) { /* Safe */ }"
  },
  {
    question: "What happens if you replace `&&` with `&` in `if (obj != null & obj.isValid())` when `obj` is null?",
    shortAnswer: "Throws `java.lang.NullPointerException` at runtime!",
    explanation: "The single `&` is a non-short-circuit operator that eagerly evaluates both sides, calling `isValid()` on a null pointer.",
    hint: "Single & eagerly evaluates right operand, causing NullPointerException.",
    level: "basic",
    codeExample: "Student s = null;\n// if (s != null & s.isValid()) // THROWS NullPointerException!"
  },
  {
    question: "How does short-circuit evaluation protect against Division-by-Zero errors?",
    shortAnswer: "By placing the non-zero check on the left: `if (count != 0 && total / count > 50)`.",
    explanation: "When `count` is 0, `count != 0` is `false`, and `&&` skips the division `total / count` entirely.",
    hint: "count != 0 on left skips division by zero.",
    level: "basic",
    codeExample: "if (divisor != 0 && (100 / divisor > 10)) { /* Safe */ }"
  },
  {
    question: "What is the evaluated result of `int x = 0; boolean b = (x > 0) && (++x > 0);`?",
    shortAnswer: "`b = false` and `x = 0` (the increment is SKIPPED).",
    explanation: "`x > 0` evaluates to `false`, so `&&` short-circuits and never executes `++x`.",
    hint: "Short-circuit skips ++x, leaving x at 0.",
    level: "intermediate",
    codeExample: "int x = 0;\nboolean b = (x > 0) && (++x > 0); // b is false, x is STILL 0"
  },
  {
    question: "What is the evaluated result of `int x = 0; boolean b = (x == 0) || (++x > 0);`?",
    shortAnswer: "`b = true` and `x = 0` (the increment is SKIPPED).",
    explanation: "`x == 0` evaluates to `true`, so `||` short-circuits and never executes `++x`.",
    hint: "Short-circuit skips ++x on true, leaving x at 0.",
    level: "intermediate",
    codeExample: "int x = 0;\nboolean b = (x == 0) || (++x > 0); // b is true, x is STILL 0"
  },
  {
    question: "What is the Side-Effect Trap with short-circuiting?",
    shortAnswer: "Placing state-mutating operations (like `++x`, `list.add()`, or payment processing methods) in the right operand where short-circuiting may unpredictably skip them.",
    explanation: "If the left operand short-circuits, essential business state modifications are bypassed.",
    hint: "Never place side-effects in short-circuited operands.",
    level: "intermediate",
    codeExample: "// Anti-pattern: if (isVIP || processPayment()) // payment skipped if isVIP is true!"
  },
  {
    question: "How should state-mutating actions be written when combined with conditional logic?",
    shortAnswer: "Execute the action separately first, store the result in a boolean variable, and then test the variable.",
    explanation: "Decoupling action execution from conditional testing guarantees deterministic execution.",
    hint: "Execute action before conditional check.",
    level: "intermediate",
    codeExample: "boolean success = processPayment();\nif (isVIP || success) { /* Clean */ }"
  },
  {
    question: "What are the non-short-circuit boolean operators in Java?",
    shortAnswer: "Single `&` (eager AND) and single `|` (eager OR).",
    explanation: "When applied to booleans, `&` and `|` force evaluation of both left and right operands regardless of the left operand's outcome.",
    hint: "& and | always evaluate both operands.",
    level: "intermediate",
    codeExample: "boolean b = checkLeft() & checkRight(); // Both methods ALWAYS execute"
  },
  {
    question: "Why does Java offer both short-circuit (`&&`, `||`) and eager (`&`, `|`) boolean operators?",
    shortAnswer: "`&&` and `||` optimize performance and enable safety guards; `&` and `|` allow scenarios where side-effects in both branches are intentionally required.",
    explanation: "In 99.9% of production code, `&&` and `||` are preferred.",
    hint: "&& is standard; & is for intentional dual evaluation.",
    level: "intermediate",
    codeExample: "boolean validateAll = validateName() & validateAge(); // Validates both fields"
  },
  {
    question: "What is the result of `int a = 5, b = 10; boolean test = (a < 10) || (b++ > 5);`?",
    shortAnswer: "`test = true` and `b = 10`.",
    explanation: "`a < 10` is `true`, so `||` short-circuits and skips `b++`.",
    hint: "b remains 10 due to short-circuit.",
    level: "basic",
    codeExample: "int a = 5, b = 10;\nboolean test = (a < 10) || (b++ > 5); // test is true, b is 10"
  },
  {
    question: "What is the result of `int a = 5, b = 10; boolean test = (a > 10) && (b++ > 5);`?",
    shortAnswer: "`test = false` and `b = 10`.",
    explanation: "`a > 10` is `false`, so `&&` short-circuits and skips `b++`.",
    hint: "b remains 10.",
    level: "basic",
    codeExample: "int a = 5, b = 10;\nboolean test = (a > 10) && (b++ > 5); // test is false, b is 10"
  },
  {
    question: "What happens in a multi-condition chain like `cond1 && cond2 && cond3 && cond4`?",
    shortAnswer: "Evaluation proceeds left-to-right until the FIRST `false` condition is found; all subsequent conditions are skipped.",
    explanation: "JLS §15.23 guarantees left-to-right short-circuit termination.",
    hint: "Stops on first false.",
    level: "basic",
    codeExample: "if (isLoggedIn && hasPermission && isActive && isUnderLimit) { }"
  },
  {
    question: "What happens in a multi-condition chain like `cond1 || cond2 || cond3 || cond4`?",
    shortAnswer: "Evaluation proceeds left-to-right until the FIRST `true` condition is found; all subsequent conditions are skipped.",
    explanation: "JLS §15.24 guarantees left-to-right short-circuit termination on first true.",
    hint: "Stops on first true.",
    level: "basic",
    codeExample: "if (isAdmin || isSuperUser || isOwner) { }"
  },
  {
    question: "How does short-circuit evaluation improve application performance in database queries?",
    shortAnswer: "By checking fast in-memory cache conditions first before slow disk or network calls: `if (inCache || queryDatabase())`.",
    explanation: "If data is in cache, the slow database query is never executed.",
    hint: "Fast checks first, expensive checks last.",
    level: "intermediate",
    codeExample: "if (cache.contains(key) || db.fetch(key) != null) { }"
  },
  {
    question: "How should expensive validation checks be ordered in an `&&` expression?",
    shortAnswer: "Place cheap, lightweight checks (e.g. null check, length check) on the left, and expensive checks (regex, database, remote API) on the right.",
    explanation: "If a cheap check fails, the expensive check is skipped.",
    hint: "Order from cheapest to most expensive.",
    level: "intermediate",
    codeExample: "if (input != null && input.length() > 0 && matchesComplexRegex(input)) { }"
  },
  {
    question: "What bytecode instruction is generated by the Java compiler for `&&` short-circuiting?",
    shortAnswer: "`ifeq` (Branch if equal to 0 / false) instruction jumps past the right operand code.",
    explanation: "The compiler emits hardware branch jumps directly in bytecode.",
    hint: "ifeq branch instruction.",
    level: "advanced",
    codeExample: "// Bytecode: ifeq Label_End (skips right operand evaluation)"
  },
  {
    question: "What bytecode instruction is generated by the Java compiler for `||` short-circuiting?",
    shortAnswer: "`ifne` (Branch if not equal to 0 / true) instruction jumps directly to the true branch.",
    explanation: "The compiler emits branch jumps on non-zero.",
    hint: "ifne branch instruction.",
    level: "advanced",
    codeExample: "// Bytecode: ifne Label_True (skips right operand evaluation)"
  },
  {
    question: "Is short-circuiting evaluated Left-to-Right or Right-to-Left?",
    shortAnswer: "Strictly Left-to-Right (JLS §15.23 and §15.24).",
    explanation: "Java guarantees the left operand is fully evaluated before deciding whether to evaluate the right operand.",
    hint: "Strictly Left-to-Right.",
    level: "basic",
    codeExample: "boolean res = first() && second(); // first() is ALWAYS called first"
  },
  {
    question: "Can short-circuiting prevent array index out of bounds exceptions?",
    shortAnswer: "Yes: `if (index >= 0 && index < arr.length && arr[index] == target)` safely checks array boundaries first.",
    explanation: "If `index < arr.length` is false, `arr[index]` is never accessed.",
    hint: "Boundary check on left protects array indexing.",
    level: "basic",
    codeExample: "if (i < array.length && array[i] > 0) { /* 100% safe */ }"
  },
  {
    question: "What is the result of `int k = 0; boolean res = false && (k++ > 0);`?",
    shortAnswer: "`res = false` and `k = 0`.",
    explanation: "Left is false, right is skipped, `k` remains 0.",
    hint: "k remains 0.",
    level: "basic",
    codeExample: "int k = 0;\nboolean res = false && (k++ > 0); // res is false, k is 0"
  },
  {
    question: "What is the result of `int k = 0; boolean res = false & (k++ > 0);`?",
    shortAnswer: "`res = false` and `k = 1`.",
    explanation: "Single `&` evaluates both sides, so `k++` executes and `k` becomes 1.",
    hint: "k becomes 1 with eager &.",
    level: "basic",
    codeExample: "int k = 0;\nboolean res = false & (k++ > 0); // res is false, k is 1"
  },
  {
    question: "What is the result of `int m = 0; boolean res = true || (m++ > 0);`?",
    shortAnswer: "`res = true` and `m = 0`.",
    explanation: "Left is true, right is skipped, `m` remains 0.",
    hint: "m remains 0.",
    level: "basic",
    codeExample: "int m = 0;\nboolean res = true || (m++ > 0); // res is true, m is 0"
  },
  {
    question: "What is the result of `int m = 0; boolean res = true | (m++ > 0);`?",
    shortAnswer: "`res = true` and `m = 1`.",
    explanation: "Single `|` evaluates both sides, so `m++` executes and `m` becomes 1.",
    hint: "m becomes 1 with eager |.",
    level: "basic",
    codeExample: "int m = 0;\nboolean res = true | (m++ > 0); // res is true, m is 1"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee processing engine, how does short-circuiting prevent unpaid admissions?",
    shortAnswer: "By separating fee payment transaction calls from condition evaluations so payment processing is never skipped by `||`.",
    explanation: "Separating action from condition prevents bypassed business logic.",
    hint: "Separate payment execution from conditional logic.",
    level: "basic",
    codeExample: "boolean paid = account.processPayment(15000.0);\nif (paid && account.isCleared()) { }"
  },
  {
    question: "Can short-circuiting cause bugs in unit test assertions?",
    shortAnswer: "Yes, if an assertion relies on a side-effect inside an `assert` condition that gets short-circuited or disabled.",
    explanation: "Assertions should be pure without side-effects.",
    hint: "Keep assertions side-effect free.",
    level: "advanced",
    codeExample: "assert list != null && list.remove(item); // BAD! remove skipped if disabled/null"
  },
  {
    question: "What is the ternary equivalent of `a && b`?",
    shortAnswer: "`a ? b : false`",
    explanation: "If `a` is true, return `b`; otherwise return `false`.",
    hint: "a ? b : false.",
    level: "advanced",
    codeExample: "boolean eq = a ? b : false; // Identical to a && b"
  },
  {
    question: "What is the ternary equivalent of `a || b`?",
    shortAnswer: "`a ? true : b`",
    explanation: "If `a` is true, return `true`; otherwise evaluate and return `b`.",
    hint: "a ? true : b.",
    level: "advanced",
    codeExample: "boolean eq = a ? true : b; // Identical to a || b"
  },
  {
    question: "What is the ultimate takeaway of Topic 10 for Java developers?",
    shortAnswer: "Leverage short-circuiting (`&&`, `||`) for defensive null guards and high-performance ordering, but NEVER put state-mutating side-effects in short-circuited expressions.",
    explanation: "Mastering short-circuit evaluation prevents NullPointerExceptions, ArithmeticExceptions, and hidden transaction bypass bugs.",
    hint: "Use && for null-guards; keep conditions side-effect free.",
    level: "basic",
    codeExample: "// Summary: && stops on false (guard), || stops on true, side-effects get skipped!"
  },
  {
    question: "What is the next topic (Topic 11) in Module 001_003?",
    shortAnswer: "Bitwise operators: Bitwise AND (&), Bitwise OR (|), Bitwise XOR (^), Bitwise Inversion (~).",
    explanation: "Topic 11 covers bitwise manipulation on integral types, bitmasking, flag setting, clearing, and toggling.",
    hint: "Bitwise operators in Java.",
    level: "basic",
    codeExample: "// Topic 11: &, |, ^, ~"
  }
];

export default questions;
