/**
 * Module 001_005: Topic 13: Jump statements: 'continue' statement to skip current iteration and jump to next update
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the function of the `continue` statement in Java (JLS §14.16)?",
    shortAnswer: "An unconditioned jump statement that immediately skips the remaining statements in the current loop iteration and advances directly to the next iteration cycle.",
    explanation: "Allows selective skipping of specific loop items.",
    hint: "Skips remaining statements of current iteration and moves to the next.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i++) { if (i % 2 == 0) continue; print(i); }"
  },
  {
    question: "Where does control jump when `continue` executes inside a standard `for` loop?",
    shortAnswer: "Directly to the loop's update expression (`i++`), followed by condition re-evaluation.",
    explanation: "Guarantees that loop counter updates are not skipped in `for` loops.",
    hint: "Jumps directly to the update expression (i++).",
    level: "basic",
    codeExample: "for (int i=0; i<N; i++) { if (skip) continue; /* jumps to i++ */ }"
  },
  {
    question: "Where does control jump when `continue` executes inside a `while` or `do-while` loop?",
    shortAnswer: "Directly to the boolean condition check (`while (condition)`).",
    explanation: "Does NOT execute any statements placed after `continue` in the body.",
    hint: "Jumps directly to the boolean condition evaluation.",
    level: "basic",
    codeExample: "while (cond) { if (skip) continue; /* jumps to while(cond) */ }"
  },
  {
    question: "What is the critical 'While Loop Gotcha' with the `continue` statement?",
    shortAnswer: "If the counter increment (`i++`) is placed *after* the `continue` statement inside a `while` loop body, skipping it causes an Infinite Loop because `i` is never updated!",
    explanation: "One of the most frequent loop bugs in software development.",
    hint: "Placing counter increment below continue causes an infinite loop.",
    level: "basic",
    codeExample: "int i = 0; while (i < 5) { if (i == 2) continue; i++; } // INFINITE LOOP!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore invoice generator, how is `continue` utilized?",
    shortAnswer: "To cleanly skip students with zero balance due and scholarship-exempt students before generating billable fee invoices in Indian Rupees (₹).",
    explanation: "Demonstrates practical data cleansing and guard clause filtering.",
    hint: "Skips zero-due and scholarship-exempt records in ₹.",
    level: "basic",
    codeExample: "if (inv.isScholarshipExempt()) continue;"
  },
  {
    question: "Can `continue` be used outside a loop in Java?",
    shortAnswer: "No! Using `continue` outside a `for`, `while`, or `do-while` loop causes a compile-time error: `continue outside of loop`.",
    explanation: "Unlike `break`, `continue` cannot be used inside `switch` unless embedded in a loop.",
    hint: "Compile error: continue outside of loop.",
    level: "basic",
    codeExample: "// if (x > 0) continue; // COMPILER ERROR outside loop!"
  },
  {
    question: "Can `continue` be used inside a standalone `switch` statement?",
    shortAnswer: "No! `continue` is exclusively a loop control statement and cannot be used inside a `switch` (causes compile-time error).",
    explanation: "Only `break` is applicable to switch structures.",
    hint: "Compile error: continue cannot be used in a switch statement.",
    level: "basic",
    codeExample: "// switch (x) { case 1: continue; } // COMPILER ERROR!"
  },
  {
    question: "What is the difference between `break` and `continue`?",
    shortAnswer: "`break` terminates the entire loop immediately; `continue` terminates only the *current iteration* and proceeds to the next iteration.",
    explanation: "Complete loop exit vs single iteration skip.",
    hint: "break exits the whole loop; continue skips only the current step.",
    level: "basic",
    codeExample: "// break: stops loop; continue: skips to next step"
  },
  {
    question: "What bytecode instruction does the JVM emit for a `continue` statement?",
    shortAnswer: "An unconditional `goto` instruction pointing directly to the update clause or condition check bytecode label.",
    explanation: "Direct bytecode jump instruction.",
    hint: "Emits an unconditional goto jump to the loop update/test label.",
    level: "advanced",
    codeExample: "// Bytecode: goto L_LOOP_UPDATE"
  },
  {
    question: "How does `continue` simplify complex nested `if-else` blocks (Guard Clause pattern)?",
    shortAnswer: "By placing early negative checks (`if (invalid) continue;`) at the top of the loop, allowing the main happy-path business logic to remain un-nested and flat.",
    explanation: "Significantly reduces indentation and cyclomatic complexity.",
    hint: "Flattens nested if-else ladders by skipping invalid conditions early.",
    level: "intermediate",
    codeExample: "for (User u : list) {\n    if (!u.isActive()) continue;\n    if (u.isBanned()) continue;\n    process(u);\n}"
  },
  {
    question: "Can `continue` be used inside an enhanced `for-each` loop?",
    shortAnswer: "Yes! `continue` skips the remainder of the body and moves directly to the next element in the array or `Iterable` sequence.",
    explanation: "Full support across all loop types.",
    hint: "Yes, advances directly to the next sequence element.",
    level: "basic",
    codeExample: "for (String name : names) { if (name == null) continue; }"
  },
  {
    question: "What happens to code placed immediately below `continue` inside the same block?",
    shortAnswer: "Compilation error: `unreachable statement` because the compiler knows subsequent code in that branch can never execute.",
    explanation: "Definite assignment and reachability analysis (JLS §14.21).",
    hint: "Compile error: unreachable statement.",
    level: "basic",
    codeExample: "if (c) { continue; /* System.out.println(); COMPILER ERROR */ }"
  },
  {
    question: "What happens when an unlabeled `continue` executes inside a NESTED loop?",
    shortAnswer: "It skips to the next iteration of ONLY the immediate innermost loop; the outer loop is unaffected.",
    explanation: "Innermost lexical scope binding.",
    hint: "Skips to the next iteration of only the immediate inner loop.",
    level: "basic",
    codeExample: "for (i..) { for (j..) { if (j==2) continue; } }"
  },
  {
    question: "How do you skip to the next iteration of the OUTER loop from inside an inner loop?",
    shortAnswer: "Using a Labeled `continue` statement: `continue OUTER_LABEL;`.",
    explanation: "Topic 14 explores labeled jumps in depth.",
    hint: "Use labeled continue: continue OUTER_LABEL;.",
    level: "basic",
    codeExample: "OUTER: for (i..) { for (j..) { if (skipRow) continue OUTER; } }"
  },
  {
    question: "Can `continue` be used inside a `try-finally` block inside a loop?",
    shortAnswer: "Yes, and the `finally` block is GUARANTEED to execute before control jumps to the next iteration!",
    explanation: "JVM ensures finally blocks are never skipped by continue statements.",
    hint: "finally block executes before jumping to next iteration.",
    level: "intermediate",
    codeExample: "for (int i=0; i<3; i++) { try { continue; } finally { cleanup(); } }"
  },
  {
    question: "In algorithm design, how is `continue` used to find all Prime Numbers efficiently?",
    shortAnswer: "If a number is divisible by any factor, `continue` skips immediately to the next candidate without performing further divisibility tests.",
    explanation: "Classic algorithmic filtering optimization.",
    hint: "Skips composite numbers quickly.",
    level: "basic",
    codeExample: "if (num % i == 0) { isPrime = false; break; }"
  },
  {
    question: "What is the output of `for (int i=1; i<=4; i++) { if (i==2 || i==3) continue; System.out.print(i + \" \"); }`?",
    shortAnswer: "`1 4 ` (elements 2 and 3 are skipped).",
    explanation: "Standard demonstration of iteration skipping.",
    hint: "Prints 1 4.",
    level: "basic",
    codeExample: "for (int i=1; i<=4; i++) { if (i==2 || i==3) continue; print(i); }"
  },
  {
    question: "Can `continue` be used in a lambda expression inside a loop (`list.forEach(x → { continue; });`)?",
    shortAnswer: "No! Using `continue` inside a lambda causes a compile-time error (`continue outside of loop`). To skip an element in a lambda, use `return;` instead.",
    explanation: "Lambda bodies are distinct method invocations.",
    hint: "Compile error in lambdas; use return; in lambdas to skip items.",
    level: "intermediate",
    codeExample: "// list.forEach(x → { if (x < 0) return; /* 'return' acts like continue in lambdas */ });"
  },
  {
    question: "Why is `continue` often preferred over deep `if (!condition) { ... }` blocks?",
    shortAnswer: "Because it keeps the main business logic unindented on the primary margin (minimizing cyclomatic depth and horizontal scrolling).",
    explanation: "Promoted by Clean Code standards (Martin Fowler, Robert C. Martin).",
    hint: "Keeps main logic at lower indentation depth.",
    level: "basic",
    codeExample: "// Flatten indentation via Guard Clauses"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student portal, how are Odd Numbers printed safely with a `while` loop?",
    shortAnswer: "By incrementing `counter++` *before* the `if (counter % 2 == 0) continue;` check, ensuring the counter advances on every iteration.",
    explanation: "Safe counter placement pattern in while loops.",
    hint: "Increments counter before the continue check to prevent infinite loop.",
    level: "basic",
    codeExample: "while (c < 10) { c++; if (c % 2 == 0) continue; print(c); }"
  },
  {
    question: "What is the 'Filter-Map-Reduce' parallel to `continue` in functional programming?",
    shortAnswer: "In Streams, `continue` corresponds to the `.filter(predicate)` intermediate operation.",
    explanation: "Declarative functional equivalent.",
    hint: "Equivalent to Stream .filter(predicate).",
    level: "intermediate",
    codeExample: "list.stream().filter(s → !s.isExempt()).forEach(this::process);"
  },
  {
    question: "What happens if `continue` is used in a `do-while` loop?",
    shortAnswer: "It skips the remainder of the body and jumps directly to the post-test `while (condition);` check.",
    explanation: "Post-test condition is evaluated immediately.",
    hint: "Jumps directly to post-test while condition check.",
    level: "basic",
    codeExample: "do { if (skip) continue; } while (testCondition());"
  },
  {
    question: "How does `continue` interact with the loop counter in a two-pointer algorithm (`left++`, `right--`)?",
    shortAnswer: "Care must be taken to update pointers *before* calling `continue`; otherwise, pointers will not move, causing an infinite loop!",
    explanation: "Crucial for two-pointer loop safety.",
    hint: "Pointers must be updated before continue to prevent freeze.",
    level: "intermediate",
    codeExample: "if (shouldSkip(l)) { l++; continue; }"
  },
  {
    question: "Is there any performance penalty for using `continue`?",
    shortAnswer: "Zero penalty; modern JVM compilers translate `continue` directly into a single assembly jump instruction.",
    explanation: "Zero-cost abstraction.",
    hint: "Zero performance penalty.",
    level: "basic",
    codeExample: "// JIT optimizes continue into a direct assembly jump"
  },
  {
    question: "Can multiple `continue` statements be used in a single loop?",
    shortAnswer: "Yes! Placing multiple guard clauses at the top of a loop is a widely used, clean architectural pattern.",
    explanation: "Multi-stage data validation.",
    hint: "Yes, multiple guard clauses at loop start improve readability.",
    level: "basic",
    codeExample: "if (null) continue; if (empty) continue; if (expired) continue;"
  },
  {
    question: "What is the difference between `continue` in `for (;;)` vs `while (true)`?",
    shortAnswer: "In `for (;;) { continue; }`, it jumps to the update expression (which is empty) and loops back; in `while (true)`, it jumps directly to condition evaluation (`true`). Both repeat endlessly.",
    explanation: "Subtle grammar distinction, identical runtime loopback.",
    hint: "Both loop back immediately.",
    level: "intermediate",
    codeExample: "// Both loop back immediately"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee auditor, what happens when a student with ₹0 balance due is encountered?",
    shortAnswer: "The invoice engine executes `continue;`, skipping invoice generation for that student and moving to the next record in Indian Rupees (₹).",
    explanation: "Demonstrates practical automated ledger filtering.",
    hint: "Skips zero-due students and proceeds to the next record in ₹.",
    level: "basic",
    codeExample: "if (balanceDue <= 0.0) continue;"
  },
  {
    question: "Why should developers avoid writing `continue` as the VERY LAST line of a loop body?",
    shortAnswer: "Because it is redundant and dead code; control naturally reaches the end of the loop body and advances anyway without an explicit `continue`.",
    explanation: "Code style and linters flag redundant continues.",
    hint: "Redundant code; the loop naturally advances at the end of the body.",
    level: "basic",
    codeExample: "// Redundant: for (..) { doWork(); continue; // UNNECESSARY! }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 13 for Java developers?",
    shortAnswer: "The `continue` statement is the premier jump control for skipping iterations and implementing Guard Clauses, flattening nested code hierarchies while requiring careful counter placement in `while` loops.",
    explanation: "Essential control flow tool for clean, expressive loops.",
    hint: "Premier tool for skipping iterations and guard clause filtering.",
    level: "basic",
    codeExample: "// Summary: if (skipCondition) continue; // Process valid data"
  },
  {
    question: "What is the next topic (Topic 14) in Module 001_005?",
    shortAnswer: "Labeled 'break' and labeled 'continue' to break out of nested multi-tier loops.",
    explanation: "Topic 14 explores labeled jump statements for targeting specific outer loop tiers in nested hierarchies.",
    hint: "Labeled 'break' and labeled 'continue' in nested loops.",
    level: "basic",
    codeExample: "// Topic 14: Labeled break and continue"
  }
];

export default questions;
