/**
 * Module 001_004: Topic 1: Simple 'if' statement: syntax, boolean conditions, and execution flow
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the syntax of a Simple 'if' statement in Java (JLS §14.9.1)?",
    shortAnswer: "`if (booleanExpression) { statement(s); }`",
    explanation: "If the expression evaluates to `true`, the statements inside the block execute; if `false`, the block is bypassed.",
    hint: "if (condition) { statements; }",
    level: "basic",
    codeExample: "if (score >= 40) {\n    System.out.println(\"Passed\");\n}"
  },
  {
    question: "What data type MUST the condition inside an `if (...)` statement evaluate to in Java?",
    shortAnswer: "`boolean` or `Boolean` (subject to unboxing).",
    explanation: "Java strictly forbids integer or pointer-based truthiness like `if (1)` or `if (ptr)`.",
    hint: "Must evaluate strictly to a boolean value.",
    level: "basic",
    codeExample: "boolean isReady = true;\nif (isReady) { /* valid */ }"
  },
  {
    question: "What is the Semicolon Trap in Java `if` statements (`if (condition);`)?",
    shortAnswer: "Placing a semicolon `;` directly after `if (condition)` creates an empty statement, causing the following block to execute unconditionally!",
    explanation: "The compiler treats the semicolon as the complete body of the `if` statement.",
    hint: "Semicolon acts as an empty statement body, executing subsequent code unconditionally.",
    level: "basic",
    codeExample: "int x = 5;\nif (x > 10); // ⚠️ EMPTY STATEMENT!\n{\n    System.out.println(\"Always runs!\"); // Unconditional execution\n}"
  },
  {
    question: "Why should developers avoid writing `if (isValid == true)`?",
    shortAnswer: "It is redundant, noisy, and non-idiomatic. The variable `isValid` is already a boolean expression.",
    explanation: "Writing `if (isValid)` is cleaner, more concise, and prevents accidental assignment bugs like `if (isValid = true)`.",
    hint: "Redundant comparison; use if (isValid) directly.",
    level: "basic",
    codeExample: "if (isValid) { /* Clean idiomatic Java */ }"
  },
  {
    question: "What happens if you accidentally write `if (flag = true)` in Java?",
    shortAnswer: "It assigns `true` to `flag` and the `if` block ALWAYS executes!",
    explanation: "Assignment returns the assigned value (`true`). Note: `if (x = 5)` causes a compiler error because `5` is not a boolean.",
    hint: "Assigns true and always executes the branch.",
    level: "intermediate",
    codeExample: "boolean flag = false;\nif (flag = true) { // ⚠️ ASSIGNMENT TRAP!\n    System.out.println(\"Always prints!\");\n}"
  },
  {
    question: "How many statements does an `if` condition control if curly braces `{}` are omitted?",
    shortAnswer: "Only the single statement immediately following the `if` header.",
    explanation: "Any subsequent statement belongs to the enclosing block and executes unconditionally.",
    hint: "Controls only the first single statement.",
    level: "basic",
    codeExample: "if (score < 40)\n    System.out.println(\"Failed\");\n    System.out.println(\"Send Letter\"); // ALWAYS EXECUTES!"
  },
  {
    question: "What is the famous Apple SSL 'goto fail' bug and how does it relate to braces?",
    shortAnswer: "A security vulnerability caused by a duplicate unbraced `goto fail;` line, which executed unconditionally, bypassing certificate validation.",
    explanation: "Illustrates why industry standards mandate braces `{}` for every control block.",
    hint: "Duplicate unbraced goto line bypassed security checks.",
    level: "intermediate",
    codeExample: "// Industry rule: Always use braces {}"
  },
  {
    question: "Can an `if` block contain local variable declarations without braces?",
    shortAnswer: "No! A variable declaration cannot be the immediate statement of an unbraced `if` statement (causes compile error).",
    explanation: "JLS forbids variable declarations as solitary unbraced statement bodies.",
    hint: "Solitary variable declaration without braces is illegal.",
    level: "intermediate",
    codeExample: "// if (ok) int x = 10; // COMPILATION ERROR!\nif (ok) { int x = 10; } // Legal"
  },
  {
    question: "What happens if a `Boolean` wrapper object passed to `if (flag)` is `null`?",
    shortAnswer: "Throws `java.lang.NullPointerException` at runtime.",
    explanation: "The JVM attempts to invoke `flag.booleanValue()`, which fails on `null`.",
    hint: "Unboxing null Boolean throws NullPointerException.",
    level: "basic",
    codeExample: "Boolean b = null;\n// if (b) { } // THROWS NullPointerException"
  },
  {
    question: "What bytecode instruction is typically generated for a simple `if` condition checking `x > 0`?",
    shortAnswer: "`ifle` (Jump to target label if value is less than or equal to 0).",
    explanation: "The JVM jumps over the `if` body if the inverted condition is true.",
    hint: "ifle or ifeq conditional jump opcodes.",
    level: "advanced",
    codeExample: "// Bytecode: iload_1, ifle LABEL_AFTER_IF"
  },
  {
    question: "In the Coder & AccoTax Barrackpore admission engine, how are multiple independent `if` statements used?",
    shortAnswer: "To sequentially apply independent fee adjustments: one `if` for the Early-Bird discount (-10%) and a separate `if` for the high merit waiver (-₹1,000).",
    explanation: "Demonstrates independent, additive conditional checks in Indian Rupees (₹).",
    hint: "Separate if blocks for independent discounts.",
    level: "basic",
    codeExample: "if (earlyBird) fee -= disc;\nif (merit) fee -= 1000;"
  },
  {
    question: "What is the difference between sequential `if` statements and an `if-else` statement?",
    shortAnswer: "Sequential `if` statements test all conditions independently; `if-else` represents mutually exclusive paths where only one branch can execute.",
    explanation: "Sequential `if` blocks can both execute if their conditions are both true.",
    hint: "Sequential if blocks can all execute; if-else is mutually exclusive.",
    level: "basic",
    codeExample: "if (c1) { a(); }\nif (c2) { b(); } // Both can execute"
  },
  {
    question: "What is the result of `if (false) { System.out.println(\"Hi\"); }` in Java?",
    shortAnswer: "Compiles cleanly without error, but the block is never executed.",
    explanation: "JLS §14.21 explicitly allows `if (false)` for conditional debugging.",
    hint: "Compiles cleanly, never executes.",
    level: "intermediate",
    codeExample: "if (false) { /* Dead code allowed by JLS */ }"
  },
  {
    question: "What is the result of `if (true) int x = 10;` in Java?",
    shortAnswer: "Compilation error! Variable declaration is not permitted as a single unbraced statement.",
    explanation: "Must be enclosed in a block `{ int x = 10; }`.",
    hint: "Variable declaration requires block braces.",
    level: "intermediate",
    codeExample: "// if (true) int x = 10; // COMPILATION ERROR"
  },
  {
    question: "Can an `if` condition call a method that returns a `boolean`?",
    shortAnswer: "Yes! E.g. `if (list.isEmpty())`, `if (student.hasPaidTuition())`.",
    explanation: "Standard method invocation in boolean expression context.",
    hint: "Methods returning boolean can be used as conditions.",
    level: "basic",
    codeExample: "if (name.startsWith(\"S\")) { }"
  },
  {
    question: "What happens if a method called inside an `if` condition throws an exception?",
    shortAnswer: "The exception propagates immediately; the `if` body is not executed.",
    explanation: "Condition evaluation halts on uncaught exceptions.",
    hint: "Exception aborts condition evaluation.",
    level: "basic",
    codeExample: "if (calculateRisk() > 50) { } // Risk method throws exception"
  },
  {
    question: "What is the scope of a variable declared inside an `if` block `{ int temp = 10; }`?",
    shortAnswer: "Local to the `if` block; inaccessible outside the closing curly brace `}`.",
    explanation: "Block scope rules in Java.",
    hint: "Inaccessible outside the if block.",
    level: "basic",
    codeExample: "if (true) {\n    int temp = 10;\n}\n// temp is not visible here"
  },
  {
    question: "Can an `if` statement be empty `{ }`?",
    shortAnswer: "Yes! An empty block `{}` is syntactically valid in Java.",
    explanation: "Often used as a placeholder during drafting.",
    hint: "Empty block is legal syntax.",
    level: "basic",
    codeExample: "if (isValid) { }"
  },
  {
    question: "What is the effect of short-circuiting in an `if` condition `if (str != null && str.length() > 0)`?",
    shortAnswer: "If `str` is `null`, the second check `str.length()` is skipped, preventing a `NullPointerException`.",
    explanation: "Standard defensive null-guard idiom.",
    hint: "Prevents NullPointerException on null objects.",
    level: "basic",
    codeExample: "if (str != null && str.length() > 0) { }"
  },
  {
    question: "What is the result of `boolean b = false; if (b == false)` vs `if (!b)`?",
    shortAnswer: "Both evaluate to `true`, but `if (!b)` is the clean idiomatic Java standard.",
    explanation: "Logical NOT operator is preferred over `== false`.",
    hint: "Use if (!b) instead of if (b == false).",
    level: "basic",
    codeExample: "if (!isEnrolled) { register(); }"
  },
  {
    question: "What is a Guard Clause using a simple `if` statement?",
    shortAnswer: "A check at the start of a method that exits immediately if preconditions are not met (`if (id <= 0) return;`).",
    explanation: "Prevents deep indentation across the rest of the method.",
    hint: "Early exit check at top of method.",
    level: "intermediate",
    codeExample: "public void enroll(Student s) {\n    if (s == null) return;\n    // Proceed with enrollment\n}"
  },
  {
    question: "What is the result of `int a = 10; if (a > 5) a = a * 2; System.out.println(a);`?",
    shortAnswer: "`20`.",
    explanation: "The single statement `a = a * 2` executes because `10 > 5` is true.",
    hint: "Evaluates to 20.",
    level: "basic",
    codeExample: "int a = 10;\nif (a > 5) a = a * 2; // a = 20"
  },
  {
    question: "What is the result of `int a = 2; if (a > 5) a = a * 2; System.out.println(a);`?",
    shortAnswer: "`2`.",
    explanation: "Condition is false, so `a = a * 2` is skipped.",
    hint: "Evaluates to 2.",
    level: "basic",
    codeExample: "int a = 2;\nif (a > 5) a = a * 2; // a remains 2"
  },
  {
    question: "Can an `if` condition contain side effects like `if (++count > 5)`?",
    shortAnswer: "Yes, but it is considered poor style because it couples condition testing with state mutation.",
    explanation: "Side effects in conditionals reduce code clarity.",
    hint: "Legal, but considered poor practice.",
    level: "intermediate",
    codeExample: "if (++count > 5) { /* Legal, but avoid mutating state in if */ }"
  },
  {
    question: "Can multiple simple `if` statements be placed in a row without `else`?",
    shortAnswer: "Yes, each `if` statement is evaluated independently in sequence.",
    explanation: "Used when multiple independent rules may apply simultaneously.",
    hint: "Evaluated independently in order.",
    level: "basic",
    codeExample: "if (hasDiscount) applyDiscount();\nif (needsHostel) assignHostel();"
  },
  {
    question: "What happens when you write `if (10 > 5); { System.out.println(\"Hello\"); }`?",
    shortAnswer: "The empty statement `;` is executed by the `if`, and `{ System.out.println(\"Hello\"); }` is executed unconditionally as a standalone block.",
    explanation: "The semicolon trap turns the block into an independent local block.",
    hint: "Block executes unconditionally as a standalone block.",
    level: "intermediate",
    codeExample: "if (10 > 5); { System.out.println(\"Hello\"); }"
  },
  {
    question: "What does the compiler do with unreachable code inside an `if` block with a compile-time constant false variable `final boolean DEBUG = false; if (DEBUG) { ... }`?",
    shortAnswer: "The Java compiler permits it and typically eliminates the entire bytecode block during compilation (dead code elimination).",
    explanation: "JLS allows conditional compilation using `final boolean` constants.",
    hint: "Permitted by compiler; stripped from bytecode.",
    level: "advanced",
    codeExample: "final boolean DEBUG = false;\nif (DEBUG) { log(); } // Stripped from bytecode"
  },
  {
    question: "Why should `double` floating-point equality (`if (d1 == d2)`) be avoided in `if` conditions?",
    shortAnswer: "Because IEEE 754 floating-point rounding errors can cause `0.1 + 0.2 == 0.3` to evaluate to `false`.",
    explanation: "Use `Math.abs(d1 - d2) < EPSILON` or `BigDecimal.compareTo()` instead.",
    hint: "Use epsilon tolerance or BigDecimal for floats.",
    level: "intermediate",
    codeExample: "if (Math.abs(d1 - d2) < 1e-9) { /* Safe float comparison */ }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 1 for Java developers?",
    shortAnswer: "The Simple `if` statement is the fundamental unit of decision-making; always use curly braces `{}` to enclose statements, avoid the empty semicolon bug, write clean boolean idioms (`if (flag)`), and use guard clauses to keep code flat and maintainable.",
    explanation: "Mastering simple `if` statements creates robust conditional foundations.",
    hint: "Use braces {}, avoid semicolon trap, write clean boolean checks.",
    level: "basic",
    codeExample: "// Summary: if (condition) { /* always use braces */ }"
  },
  {
    question: "What is the next topic (Topic 2) in Module 001_004?",
    shortAnswer: "'if-else' statement for binary decision paths.",
    explanation: "Topic 2 explores mutually exclusive branching, ternary operator alternatives, and binary routing.",
    hint: "'if-else' statement for binary paths.",
    level: "basic",
    codeExample: "// Topic 2: if-else statement"
  }
];

export default questions;
