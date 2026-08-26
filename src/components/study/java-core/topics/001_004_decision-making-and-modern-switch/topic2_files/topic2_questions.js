/**
 * Module 001_004: Topic 2: 'if-else' statement for binary decision paths
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the syntax of an 'if-else' statement in Java (JLS §14.9.2)?",
    shortAnswer: "`if (booleanCondition) { statement1; } else { statement2; }`",
    explanation: "Guarantees binary mutually exclusive execution: exactly one of the two blocks will execute.",
    hint: "if (c) { s1; } else { s2; }",
    level: "basic",
    codeExample: "if (score >= 40) {\n    System.out.println(\"Pass\");\n} else {\n    System.out.println(\"Fail\");\n}"
  },
  {
    question: "What does 'mutually exclusive' mean in the context of an 'if-else' statement?",
    shortAnswer: "Only one branch can execute for a given evaluation—either the 'then' block or the 'else' block, never both and never neither.",
    explanation: "Guarantees deterministic binary routing.",
    hint: "Exactly one branch executes.",
    level: "basic",
    codeExample: "// Either true branch runs OR false branch runs"
  },
  {
    question: "How does the JVM execute an 'if-else' statement in bytecode?",
    shortAnswer: "Tests the condition using a conditional jump (`ifeq`); if false, jumps to the `else` block; the `then` block ends with an unconditional jump (`goto`) past the `else` block.",
    explanation: "Standard assembly-level binary branching implementation.",
    hint: "ifeq jumps to else; then block ends with goto past else.",
    level: "advanced",
    codeExample: "// Bytecode: ifeq ELSE_LABEL ... goto END_LABEL"
  },
  {
    question: "What is the primary difference between an `if-else` statement and the Ternary Operator (`? :`)?",
    shortAnswer: "`if-else` is an imperative control statement (executes actions/side-effects); the ternary operator is a functional expression (evaluates and returns a value).",
    explanation: "`String res = (score >= 40) ? \"Pass\" : \"Fail\";`",
    hint: "Statement performs actions; Ternary expression produces a value.",
    level: "basic",
    codeExample: "String s = (age >= 18) ? \"Adult\" : \"Minor\";"
  },
  {
    question: "Can an `else` block exist without an associated `if` statement?",
    shortAnswer: "No! An `else` keyword without a preceding `if` causes an 'else without if' compilation error.",
    explanation: "The `else` branch is syntactically tied to an immediately preceding `if`.",
    hint: "Else without if is a compilation error.",
    level: "basic",
    codeExample: "// else { } // COMPILATION ERROR: 'else' without 'if'"
  },
  {
    question: "What happens if a semicolon is placed between `if (cond)` and `else` (`if (cond); else { ... }`)?",
    shortAnswer: "The `if` controls an empty statement `;`, and the `else` block executes when the condition is `false`.",
    explanation: "However, if you write `if (cond); { s1; } else { s2; }`, it causes an 'else without if' compile error because the `{ s1; }` block separates the `if` from the `else`!",
    hint: "Block between unbraced if and else breaks the connection.",
    level: "intermediate",
    codeExample: "if (c); // empty if\n// { s1; } else // ERROR: else without if"
  },
  {
    question: "Can both the `if` block and the `else` block execute in the same invocation?",
    shortAnswer: "No! Unless multi-threading or recursion calls the method again, single-threaded execution guarantees mutual exclusivity.",
    explanation: "Boolean logic guarantees that a condition is either true or false.",
    hint: "Single invocation never executes both branches.",
    level: "basic",
    codeExample: "if (true) { a(); } else { b(); } // Only a() runs"
  },
  {
    question: "In the Coder & AccoTax Barrackpore ATM engine, how does `if-else` handle cash withdrawals?",
    shortAnswer: "If `balance >= requestedAmount`, it approves the withdrawal and dispenses rupees (₹); `else`, it declines and outputs the shortage amount.",
    explanation: "Guarantees safe balance auditing in Indian Rupees (₹).",
    hint: "Approves withdrawal if balance is sufficient, else declines.",
    level: "basic",
    codeExample: "if (bal >= amt) { dispense(); } else { decline(); }"
  },
  {
    question: "What is the result of `int x = 10; if (x > 20) x = 5; else x = 15; System.out.println(x);`?",
    shortAnswer: "`15`.",
    explanation: "`10 > 20` is false, so the `else` branch executes.",
    hint: "Else branch assigns 15.",
    level: "basic",
    codeExample: "int x = 10;\nif (x > 20) x = 5; else x = 15; // 15"
  },
  {
    question: "Can an `else` block contain another `if` statement?",
    shortAnswer: "Yes! Writing `else if (condition)` forms the basis of the `else-if` ladder.",
    explanation: "Syntactically, it is an `if` statement nested inside the `else` branch.",
    hint: "Forms an else-if ladder.",
    level: "basic",
    codeExample: "if (a) { } else if (b) { } else { }"
  },
  {
    question: "What is the benefit of replacing simple `if-else` variable assignments with the ternary operator?",
    shortAnswer: "Reduces boilerplate, supports `final` variable assignments directly, and improves readability.",
    explanation: "`final int max = (a > b) ? a : b;`",
    hint: "Enables direct initialization of final variables.",
    level: "intermediate",
    codeExample: "final String status = isPassed ? \"PASS\" : \"FAIL\";"
  },
  {
    question: "What is an 'Else-If Anti-Pattern' in clean code?",
    shortAnswer: "Writing `else` after an `if` block that already ends with a `return` or `throw` statement (`if (c) return x; else return y;`).",
    explanation: "The `else` is redundant and adds unnecessary indentation.",
    hint: "Redundant else after a return statement.",
    level: "intermediate",
    codeExample: "// Preferred:\nif (c) return x;\nreturn y; // Flat, clean code"
  },
  {
    question: "Can an `else` statement be followed immediately by a solitary variable declaration without braces?",
    shortAnswer: "No! Just like `if`, an unbraced `else` cannot have a variable declaration as its solitary body.",
    explanation: "Causes a compilation error.",
    hint: "Variable declaration in else requires braces {}.",
    level: "intermediate",
    codeExample: "// if (ok) ; else int x = 10; // COMPILATION ERROR"
  },
  {
    question: "What is the result of `if (true) { int a = 1; } else { int a = 2; }`?",
    shortAnswer: "Compiles cleanly because each `a` is scoped locally to its own separate block.",
    explanation: "Block scope isolates variables in separate branches.",
    hint: "Each variable is scoped to its own block.",
    level: "basic",
    codeExample: "if (true) { int a = 1; } else { int a = 2; } // Valid"
  },
  {
    question: "What happens if you declare `int a;` before an `if-else` and initialize `a` in BOTH branches?",
    shortAnswer: "The variable `a` is considered 'definitely assigned' by the compiler, so it can be safely used after the `if-else` block.",
    explanation: "Definite assignment rule in JLS §16.",
    hint: "Variable is definitely assigned after if-else.",
    level: "advanced",
    codeExample: "int a;\nif (cond) a = 1; else a = 2;\nSystem.out.println(a); // Legal! (Definitely assigned)"
  },
  {
    question: "What happens if you declare `int a;` before a simple `if` without `else`, and initialize `a` inside the `if`?",
    shortAnswer: "Using `a` after the `if` causes a compilation error: 'variable a might not have been initialized'.",
    explanation: "Because if the condition is false, `a` remains uninitialized.",
    hint: "Compiler errors because variable might not be initialized.",
    level: "advanced",
    codeExample: "int a;\nif (cond) a = 1;\n// System.out.println(a); // COMPILER ERROR!"
  },
  {
    question: "What is Definite Assignment in Java (JLS §16)?",
    shortAnswer: "The compiler analysis ensuring that every local variable has a definite assigned value before any access occurs.",
    explanation: "Guarantees uninitialized memory reads are impossible.",
    hint: "Compiler analysis ensuring variable is initialized before use.",
    level: "advanced",
    codeExample: "// JLS §16 Definite Assignment analysis"
  },
  {
    question: "What is the result of `if (5 > 2) System.out.println(\"A\"); else System.out.println(\"B\");`?",
    shortAnswer: "Prints `\"A\"`.",
    explanation: "`5 > 2` is true, so the `then` branch executes.",
    hint: "Prints A.",
    level: "basic",
    codeExample: "if (5 > 2) System.out.println(\"A\"); else System.out.println(\"B\");"
  },
  {
    question: "Why do static analysis tools (SonarQube, SpotBugs) mandate braces `{}` on `else` statements?",
    shortAnswer: "To prevent indentation misleading bugs and maintain code formatting consistency.",
    explanation: "Unbraced else blocks frequently cause misinterpretation during merges.",
    hint: "Prevents formatting confusion and merge defects.",
    level: "basic",
    codeExample: "if (c) { ... } else { ... }"
  },
  {
    question: "What is the difference between `if (!condition)` and the `else` branch of `if (condition)`?",
    shortAnswer: "They are logically equivalent: the `else` branch executes precisely when `!condition` is true.",
    explanation: "De Morgan's and boolean truth inversion.",
    hint: "Else branch executes when condition is false (!condition).",
    level: "basic",
    codeExample: "if (ok) { a(); } else { b(); } // b() runs when !ok"
  },
  {
    question: "Can an `if-else` statement be nested inside another `if-else` statement?",
    shortAnswer: "Yes, this creates nested decision trees.",
    explanation: "Topic 3 explores nested if-else structures in detail.",
    hint: "Allowed to arbitrary depth.",
    level: "basic",
    codeExample: "if (c1) { if (c2) { } else { } } else { }"
  },
  {
    question: "What happens if an exception is thrown inside the `if` block before reaching the end?",
    shortAnswer: "Execution jumps directly to the nearest `catch` block; the `else` block is never executed.",
    explanation: "Exceptions alter normal control flow.",
    hint: "Exception aborts execution; else does not run.",
    level: "basic",
    codeExample: "if (true) { throw new RuntimeException(); } else { /* never runs */ }"
  },
  {
    question: "What is the result of `boolean b = true; if (b) System.out.print(\"1\"); else System.out.print(\"2\"); System.out.print(\"3\");`?",
    shortAnswer: "`\"13\"`.",
    explanation: "Branch `1` executes, `2` is skipped, and sequential statement `3` executes.",
    hint: "Outputs 13.",
    level: "basic",
    codeExample: "boolean b = true;\nif (b) System.out.print(\"1\"); else System.out.print(\"2\");\nSystem.out.print(\"3\"); // 13"
  },
  {
    question: "What is the result of `boolean b = false; if (b) System.out.print(\"1\"); else System.out.print(\"2\"); System.out.print(\"3\");`?",
    shortAnswer: "`\"23\"`.",
    explanation: "Branch `1` is skipped, `else` branch `2` executes, and `3` executes sequentially.",
    hint: "Outputs 23.",
    level: "basic",
    codeExample: "boolean b = false;\nif (b) System.out.print(\"1\"); else System.out.print(\"2\");\nSystem.out.print(\"3\"); // 23"
  },
  {
    question: "Can an `if-else` structure return a value in Java without using a method?",
    shortAnswer: "No, `if-else` is a statement, not an expression (unlike Kotlin/Scala where `if-else` returns a value). Use ternary operator or Java 14+ switch expressions instead.",
    explanation: "In Java, if-else statements do not evaluate to values.",
    hint: "if-else is a statement in Java; use ternary or modern switch for expressions.",
    level: "intermediate",
    codeExample: "// Java: int x = (cond) ? 1 : 2;"
  },
  {
    question: "What is the execution cost of an `if-else` statement on a modern superscalar CPU?",
    shortAnswer: "Virtually zero clock cycles if the CPU branch predictor correctly predicts the branch.",
    explanation: "Modern branch predictors achieve $>95\%$ accuracy.",
    hint: "Near zero cycles with branch prediction.",
    level: "advanced",
    codeExample: "// Hardware branch prediction optimizes if-else"
  },
  {
    question: "How does Java ensure that `else` attaches to the correct `if` when nesting without braces?",
    shortAnswer: "The dangling else rule: an `else` always binds to the closest preceding unclosed `if` statement.",
    explanation: "Covered in depth in Topic 3.",
    hint: "Binds to closest preceding open if.",
    level: "intermediate",
    codeExample: "if (a) if (b) s1; else s2; // else belongs to if(b)"
  },
  {
    question: "What is the best way to refactor a complex binary decision tree?",
    shortAnswer: "Extract condition evaluation into descriptive boolean helper methods (`isEligibleForScholarship()`).",
    explanation: "Improves readability and self-documenting code.",
    hint: "Extract helper methods for complex conditions.",
    level: "basic",
    codeExample: "if (isEligible(student)) { enroll(); } else { reject(); }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 2 for Java developers?",
    shortAnswer: "The `if-else` statement provides deterministic binary routing, guaranteeing mutual exclusivity between two execution paths; use curly braces `{}` for safety, leverage Definite Assignment for variable initialization, and use ternary expressions when assigning simple values.",
    explanation: "Forms the cornerstone of binary conditional execution.",
    hint: "Binary mutually exclusive routing; use braces {} and definite assignment.",
    level: "basic",
    codeExample: "// Summary: if (cond) { pathA(); } else { pathB(); }"
  },
  {
    question: "What is the next topic (Topic 3) in Module 001_004?",
    shortAnswer: "Nested 'if-else' statements and resolving the dangling else ambiguity.",
    explanation: "Topic 3 explores deep decision trees, resolving the dangling else problem with braces, and refactoring techniques.",
    hint: "Nested 'if-else' and the dangling else problem.",
    level: "basic",
    codeExample: "// Topic 3: Nested if-else & Dangling Else"
  }
];

export default questions;
