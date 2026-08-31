/**
 * Module 001_005: Topic 12: Jump statements: 'break' statement to terminate loops immediately
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the function of the `break` statement in Java (JLS §14.15)?",
    shortAnswer: "An unconditioned jump statement that immediately transfers control out of the innermost enclosing `for`, `while`, `do-while`, or `switch` statement.",
    explanation: "Execution resumes immediately at the first statement following the terminated loop.",
    hint: "Immediately terminates the innermost enclosing loop or switch.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i++) { if (i == 5) break; }"
  },
  {
    question: "Can `break` be used outside a loop or `switch` statement in Java?",
    shortAnswer: "No! Using `break` outside a loop or `switch` causes a compile-time error: `break outside switch or loop`.",
    explanation: "Unless referencing an enclosing labeled statement block.",
    hint: "Compile error: break outside switch or loop.",
    level: "basic",
    codeExample: "// if (x > 0) break; // COMPILER ERROR outside loop!"
  },
  {
    question: "How does `break` optimize Linear Search algorithms?",
    shortAnswer: "Once the target item is located, `break` terminates the search immediately, preventing unnecessary inspections of remaining array elements and saving $O(N)$ CPU cycles.",
    explanation: "Crucial early-exit performance pattern.",
    hint: "Terminates search immediately upon finding the target.",
    level: "basic",
    codeExample: "for (Student s : roster) { if (s.id() == target) { found = s; break; } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore roster search, how many inspections were saved by using `break`?",
    shortAnswer: "Finding Roll #103 on the 3rd inspection saved 2 redundant inspections out of 5 students.",
    explanation: "Demonstrates practical search cycle savings.",
    hint: "Saved 2 unnecessary checks out of 5.",
    level: "basic",
    codeExample: "if (s.rollNo() == 103) { found = s; break; }"
  },
  {
    question: "What happens when an unlabeled `break` executes inside a NESTED loop?",
    shortAnswer: "It terminates ONLY the immediate innermost loop; the outer enclosing loop continues its subsequent iterations normally.",
    explanation: "Innermost lexical binding rule in Java.",
    hint: "Terminates only the immediate inner loop; outer loop continues.",
    level: "basic",
    codeExample: "for (i..) { for (j..) { if (j==3) break; } /* outer continues */ }"
  },
  {
    question: "How does `break` enforce Budget Cutoffs in financial processing?",
    shortAnswer: "By checking `if (runningTotal + cost > budgetLimit) break;` before processing each transaction in Indian Rupees (₹).",
    explanation: "Prevents exceeding allocated funds.",
    hint: "Halts loop when cumulative cost exceeds budget.",
    level: "basic",
    codeExample: "if (disbursed + claim > budget) break;"
  },
  {
    question: "Does `break` execute the update clause of a `for` loop before exiting?",
    shortAnswer: "No! `break` terminates the loop instantly without executing the update expression (`i++`) or re-checking the condition.",
    explanation: "Instant abrupt termination.",
    hint: "No, update clause is completely bypassed.",
    level: "basic",
    codeExample: "// i++ is NOT executed when break is called"
  },
  {
    question: "What bytecode instruction does the JVM emit for an unlabeled `break` statement?",
    shortAnswer: "An unconditional `goto` instruction pointing directly to the bytecode offset immediately following the loop construct.",
    explanation: "Direct unconditional branch in bytecode.",
    hint: "Emits an unconditional goto jump to the post-loop label.",
    level: "advanced",
    codeExample: "// Bytecode: goto L_POST_LOOP"
  },
  {
    question: "Can `break` be used inside an enhanced `for-each` loop?",
    shortAnswer: "Yes! `break` terminates an enhanced `for-each` loop just as cleanly as a traditional `for` or `while` loop.",
    explanation: "Full support across all loop types.",
    hint: "Yes, fully supported in for-each loops.",
    level: "basic",
    codeExample: "for (String name : names) { if (name.equals(\"QUIT\")) break; }"
  },
  {
    question: "What is the difference between `break` and `return` inside a loop?",
    shortAnswer: "`break` exits ONLY the loop (execution continues in the same method); `return` exits the ENTIRE method immediately, returning control to the caller.",
    explanation: "Loop-level exit vs method-level exit.",
    hint: "break exits the loop; return exits the entire enclosing method.",
    level: "basic",
    codeExample: "// break → continues method; return → exits method"
  },
  {
    question: "What happens to code written directly below a `break` in the same block (`if (true) { break; print(\"Hi\"); }`)?",
    shortAnswer: "Compilation error: `unreachable statement` because the compiler knows `print(\"Hi\")` can never be executed after `break`.",
    explanation: "Definite assignment and reachability analysis (JLS §14.21).",
    hint: "Compile error: unreachable statement.",
    level: "basic",
    codeExample: "if (c) { break; /* System.out.println(); COMPILER ERROR */ }"
  },
  {
    question: "Can `break` be used inside a `try-finally` block inside a loop?",
    shortAnswer: "Yes, and the `finally` block is GUARANTEED to execute before control exits the loop!",
    explanation: "JVM ensures finally blocks are never skipped by break statements.",
    hint: "finally block executes before the loop is terminated by break.",
    level: "intermediate",
    codeExample: "while (true) { try { break; } finally { cleanup(); } } // cleanup runs!"
  },
  {
    question: "How does `break` implement Sentinel-Controlled Input Loops?",
    shortAnswer: "By continuously reading user input in a `while (true)` loop and executing `if (input.equals(\"QUIT\")) break;`.",
    explanation: "Standard CLI command loop idiom.",
    hint: "Breaks when sentinel value like 'QUIT' is entered.",
    level: "basic",
    codeExample: "while (true) { String s = read(); if (\"EXIT\".equals(s)) break; }"
  },
  {
    question: "Can `break` be used inside a lambda expression within a loop (`list.forEach(x → { break; });`)?",
    shortAnswer: "No! Lambdas create distinct method frames; `break` cannot cross lambda method boundaries (causes compile-time error).",
    explanation: "Functional interfaces and lambdas cannot contain jump statements targeting outer loops.",
    hint: "Compile error: break cannot cross lambda boundaries.",
    level: "intermediate",
    codeExample: "// list.forEach(x → { if (x > 5) break; }); // COMPILER ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why is `break` preferred over flag variables for simple searches?",
    shortAnswer: "Because `break` eliminates boolean flag clutter (`boolean found = false; while (!found)`), reducing mental load and code verbosity.",
    explanation: "Clean code best practice.",
    hint: "Eliminates redundant boolean flag variables.",
    level: "basic",
    codeExample: "// Cleaner than: while (!found && i < n)"
  },
  {
    question: "What is 'Early Exit' architecture and why is it considered clean code?",
    shortAnswer: "Terminating loops or functions as soon as their objective is met (or error detected), preventing unnecessary deep nesting and indentation.",
    explanation: "Aligned with the Guard Clause and Bouncer patterns.",
    hint: "Exiting immediately upon completing goal to avoid deep nesting.",
    level: "intermediate",
    codeExample: "// Guard / Early Exit pattern"
  },
  {
    question: "What happens if `break` is called inside a `switch` statement that is itself inside a `for` loop?",
    shortAnswer: "The `break` terminates ONLY the `switch` statement, NOT the `for` loop!",
    explanation: "Classic beginner gotcha; switch consumes the break.",
    hint: "Terminates only the switch; loop continues.",
    level: "basic",
    codeExample: "for (..) { switch(x) { case 1: break; } /* Loop continues! */ }"
  },
  {
    question: "How can a developer break out of a `for` loop from INSIDE an inner `switch` statement?",
    shortAnswer: "By attaching a label to the `for` loop and using a labeled break: `break FOR_LABEL;`.",
    explanation: "Topic 14 explores labeled jumps in depth.",
    hint: "Use labeled break: break LOOP_LABEL;.",
    level: "intermediate",
    codeExample: "LOOP: for (..) { switch(x) { case 1: break LOOP; } }"
  },
  {
    question: "Is there any limit to how many `break` statements can be placed inside a single loop?",
    shortAnswer: "No, Java allows arbitrary numbers of `break` statements, though placing too many makes code hard to follow.",
    explanation: "Syntactically unlimited, but style guides recommend moderation.",
    hint: "No limit, but excessive breaks reduce readability.",
    level: "basic",
    codeExample: "while (true) { if (c1) break; if (c2) break; }"
  },
  {
    question: "How does `break` interact with `do-while` loops?",
    shortAnswer: "It terminates the `do-while` loop immediately, skipping the post-test `while (condition);` check.",
    explanation: "Bypasses post-test condition evaluation.",
    hint: "Exits do-while immediately without checking condition.",
    level: "basic",
    codeExample: "do { if (ready) break; } while (true);"
  },
  {
    question: "What is the time complexity difference between a linear search with `break` vs without `break` on an array of size $N$?",
    shortAnswer: "Worst-case is $O(N)$ for both; Best-case with `break` is $O(1)$ (found at index 0); without `break`, best-case remains $O(N)$ (inspects all elements needlessly).",
    explanation: "Improves best and average-case performance significantly.",
    hint: "Best-case becomes O(1) with break instead of O(N).",
    level: "intermediate",
    codeExample: "// Best case: O(1) with break vs O(N) without break"
  },
  {
    question: "Can `break` be used with ternary operators (`flag ? break : continue`)?",
    shortAnswer: "No! Ternary operator expressions require value operands; `break` is a statement, not an expression (compile error).",
    explanation: "Statements cannot be embedded in expression contexts.",
    hint: "Compile error: break is a statement, not a value expression.",
    level: "intermediate",
    codeExample: "// flag ? break : continue; // COMPILER ERROR!"
  },
  {
    question: "How does `break` prevent infinite loops in runaway daemon worker threads?",
    shortAnswer: "By evaluating safety timeout conditions or thread interruption flags and executing `break;` to exit the infinite loop gracefully.",
    explanation: "Essential thread lifecycle management.",
    hint: "Breaks on thread interruption or timeout.",
    level: "intermediate",
    codeExample: "while (true) { if (Thread.currentThread().isInterrupted()) break; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student fee audit, what happens when a student's balance due exceeds the remaining budget?",
    shortAnswer: "The disbursement loop triggers `break;`, halting further payouts and preserving remaining reserve funds in Indian Rupees (₹).",
    explanation: "Demonstrates practical budget constraint enforcement.",
    hint: "Halts disbursements and preserves funds in ₹.",
    level: "basic",
    codeExample: "if (total + due > budget) break;"
  },
  {
    question: "What is the 'Multiple-Exit Anti-Pattern' debate regarding `break`?",
    shortAnswer: "Old academic dogma (Dijkstra/Structured Programming) favored single-entry single-exit (SESE); modern industry engineering strongly prefers early exit via `break`/`return` for clarity and reduced nesting.",
    explanation: "Modern software design consensus favors guard clauses and early exits.",
    hint: "Modern engineering prefers early exit over complex boolean flags.",
    level: "intermediate",
    codeExample: "// Early break is preferred over deep nested if-else ladders"
  },
  {
    question: "Can a `break` statement appear in the initialization or update section of a `for` loop header?",
    shortAnswer: "No! `break` is a statement and cannot appear inside `for` loop header expressions (causes compile error).",
    explanation: "Header clauses only accept statements/expressions defined by JLS §14.14.",
    hint: "Compile error: break cannot appear in for loop headers.",
    level: "basic",
    codeExample: "// for (int i=0; i<10; break) // COMPILER ERROR!"
  },
  {
    question: "What happens if you execute `break` inside an anonymous inner class within a loop?",
    shortAnswer: "It can only break loops defined inside the anonymous inner class itself; it cannot break enclosing outer class loops.",
    explanation: "Class boundary isolation.",
    hint: "Cannot cross anonymous class boundaries.",
    level: "advanced",
    codeExample: "while (true) { Runnable r = new Runnable() { public void run() { /* break; ERROR! */ } }; }"
  },
  {
    question: "How does Static Analysis (e.g. SonarQube, SpotBugs) evaluate `break` usage?",
    shortAnswer: "They verify that loops contain at most a reasonable number of break points and flag dead code following unconditional breaks.",
    explanation: "Automated code quality auditing.",
    hint: "Flags unreachable code and excessively complex jump logic.",
    level: "intermediate",
    codeExample: "// SpotBugs checks for unreachable code after break"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 12 for Java developers?",
    shortAnswer: "The `break` statement is the premier jump control for immediate loop termination, turning average-case searches into early-exit optimizations and safely halting processing upon budget exhaustion or sentinel signals.",
    explanation: "Fundamental control flow tool for responsive, efficient algorithms.",
    hint: "Premier jump control for early search exit and threshold enforcement.",
    level: "basic",
    codeExample: "// Summary: if (targetFound || budgetExhausted) break;"
  },
  {
    question: "What is the next topic (Topic 13) in Module 001_005?",
    shortAnswer: "Jump statements: 'continue' statement to skip current iteration and jump to next update.",
    explanation: "Topic 13 explores iteration skipping and jumping to update expressions using the `continue` keyword.",
    hint: "Jump statements: 'continue' statement to skip current iteration.",
    level: "basic",
    codeExample: "// Topic 13: The 'continue' Statement"
  }
];

export default questions;
