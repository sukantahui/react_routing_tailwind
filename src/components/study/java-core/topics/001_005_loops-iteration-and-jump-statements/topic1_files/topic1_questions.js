/**
 * Module 001_005: Topic 1: Standard 'for' loop: initialization, boolean condition, update expression, and execution lifecycle
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the standard syntax of a `for` loop in Java (JLS §14.14.1)?",
    shortAnswer: "`for (Initialization; BooleanCondition; UpdateExpression) { Statement(s) }`",
    explanation: "The header contains three semicolon-delimited clauses controlling iteration.",
    hint: "Initialization, Condition, and Update inside parentheses separated by semicolons.",
    level: "basic",
    codeExample: "for (int i = 0; i < 10; i++) { System.out.println(i); }"
  },
  {
    question: "What is the exact execution order of clauses in a `for` loop?",
    shortAnswer: "1. Initialization (once); 2. Condition check; 3. Loop Body; 4. Update expression; 5. Loop back to step 2.",
    explanation: "Fundamental operational sequence of the standard for loop.",
    hint: "Init → Condition → Body → Update → Condition.",
    level: "basic",
    codeExample: "// 1. int i = 0 → 2. i < 5 → 3. body → 4. i++ → 2. i < 5..."
  },
  {
    question: "How many times is the Initialization clause in a `for` loop executed?",
    shortAnswer: "Exactly ONCE, when the thread of execution first enters the loop construct.",
    explanation: "It is never re-executed in subsequent iterations.",
    hint: "Executed exactly once upon entry.",
    level: "basic",
    codeExample: "for (int i = 0 /* runs once */; i < 5; i++) { }"
  },
  {
    question: "When is the Update expression executed in a `for` loop?",
    shortAnswer: "At the very END of each iteration, immediately after the loop body finishes executing and before the condition is re-evaluated.",
    explanation: "Prepares counter state for the subsequent condition check.",
    hint: "Executes at the end of every body iteration.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++ /* runs after body */) { doWork(); }"
  },
  {
    question: "What happens if the boolean condition is `false` on the very first evaluation?",
    shortAnswer: "The loop body and the update expression are NEVER executed (0 iterations), and control passes immediately to the next statement after the loop.",
    explanation: "Pre-test entry-controlled behavior.",
    hint: "Loop body executes 0 times.",
    level: "basic",
    codeExample: "for (int i = 10; i < 5; i++) { /* Never runs */ }"
  },
  {
    question: "What is the scope of a variable declared inside the `for` loop header (`for (int i = 0; ...)`)?",
    shortAnswer: "The variable `i` is scoped strictly to the `for` loop header and its body; it is NOT accessible after the closing curly brace `}`.",
    explanation: "Topic 2 explores header variable scope in depth.",
    hint: "Scoped only inside the loop header and body.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++) { }\n// System.out.println(i); // COMPILER ERROR: cannot find symbol i"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee auditor, how does the `for` loop track quarterly installments?",
    shortAnswer: "By iterating `installment = 1` to `4`, adding ₹4,500 monthly base to a cumulative running total in Indian Rupees (₹).",
    explanation: "Demonstrates accumulator pattern in loop financial audits.",
    hint: "Iterates quarterly installments accumulating ₹ total.",
    level: "basic",
    codeExample: "for (int inst = 1; inst <= 4; inst++) runningTotal += 4500.0;"
  },
  {
    question: "How do you write a descending countdown `for` loop from 10 down to 1?",
    shortAnswer: "`for (int i = 10; i >= 1; i--) { System.out.println(i); }`",
    explanation: "Initializes to 10, tests `>= 1`, and decrements with `i--`.",
    hint: "for (int i = 10; i >= 1; i--).",
    level: "basic",
    codeExample: "for (int i = 10; i >= 1; i--) { System.out.println(i); }"
  },
  {
    question: "Can the update expression increment by values other than 1 (e.g. `i += 5` or `i *= 2`)?",
    shortAnswer: "Yes! Any valid Java assignment or expression statement (e.g. `i += 5`, `i *= 2`, `i -= 3`) is legal.",
    explanation: "Supports non-linear and custom step arithmetic.",
    hint: "Any valid assignment expression (i += 5, i *= 2) is allowed.",
    level: "basic",
    codeExample: "for (int i = 0; i <= 100; i += 10) { System.out.println(i); }"
  },
  {
    question: "What is the result of executing `for (int i = 0; i < 3; i++) System.out.print(i + \" \");`?",
    shortAnswer: "`0 1 2 ` (prints numbers 0, 1, 2).",
    explanation: "Loop terminates when `i` reaches 3 because `3 < 3` is false.",
    hint: "Prints 0 1 2.",
    level: "basic",
    codeExample: "for (int i = 0; i < 3; i++) System.out.print(i + \" \");"
  },
  {
    question: "What is the value of `i` immediately after a loop `for (int i = 0; i < 5; i++)` terminates?",
    shortAnswer: "`i` reaches `5` to make `i < 5` false (if `i` were accessible outside).",
    explanation: "The counter is updated to 5 before the terminating condition check.",
    hint: "Counter is 5 upon termination.",
    level: "basic",
    codeExample: "int i; for (i = 0; i < 5; i++) { } // i is 5 here"
  },
  {
    question: "Can the initialization clause of a `for` loop be left empty (`for (; condition; update)`)?",
    shortAnswer: "Yes! If the variable was already declared and initialized prior to the loop header.",
    explanation: "All three clauses in a for loop header are technically optional.",
    hint: "Yes, initialization clause is optional.",
    level: "intermediate",
    codeExample: "int i = 0;\nfor (; i < 5; i++) { }"
  },
  {
    question: "Can the update clause of a `for` loop be left empty (`for (int i = 0; i < 5;)`)?",
    shortAnswer: "Yes! Provided the counter update is performed manually inside the loop body.",
    explanation: "Valid syntax, though placing update in header is preferred for clarity.",
    hint: "Yes, provided counter is updated in body.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < 5;) { doWork(); i++; }"
  },
  {
    question: "What happens if the boolean condition in a `for` loop header is omitted (`for (int i = 0; ; i++)`)?",
    shortAnswer: "Java treats an omitted condition as implicitly `true`, creating an Infinite Loop unless broken internally via `break` or an exception.",
    explanation: "JLS §14.14.1 specifies missing condition defaults to boolean constant true.",
    hint: "Omitted condition defaults to true (infinite loop).",
    level: "intermediate",
    codeExample: "for (int i = 0; ; i++) { if (i > 10) break; }"
  },
  {
    question: "What is the canonical infinite `for` loop in Java?",
    shortAnswer: "`for (;;) { ... }`",
    explanation: "All three clauses are empty; condition is implicitly true.",
    hint: "for (;;).",
    level: "basic",
    codeExample: "for (;;) { /* Runs indefinitely until break */ }"
  },
  {
    question: "Can the loop body be a single statement without curly braces `{}`?",
    shortAnswer: "Yes, but it is considered an error-prone practice because adding a second statement later without braces will execute it outside the loop.",
    explanation: "Always use curly braces `{}` per enterprise coding standards.",
    hint: "Syntactically valid, but curly braces are strongly recommended.",
    level: "basic",
    codeExample: "for (int i = 0; i < 3; i++) System.out.println(i); // Legal but discouraged"
  },
  {
    question: "What happens if a semicolon is accidentally placed directly after the `for` loop header (`for (int i = 0; i < 5; i++);`)?",
    shortAnswer: "The semicolon acts as an empty statement body; the loop iterates 5 times doing nothing, and the subsequent block executes only ONCE afterwards!",
    explanation: "Classic beginner pitfall leading to subtle logic bugs.",
    hint: "Loop runs an empty statement; following block executes only once.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i++); { System.out.println(\"Runs once!\"); }"
  },
  {
    question: "What is the difference between `i++` and `++i` in the update clause of a `for` loop header?",
    shortAnswer: "In the update clause (`for (int i = 0; i < 5; i++)` vs `for (int i = 0; i < 5; ++i)`), there is NO difference in behavior or performance because the result value of the expression is discarded.",
    explanation: "Both simply increment `i` by 1 at the end of the iteration.",
    hint: "No difference in loop update clause.",
    level: "basic",
    codeExample: "// for (int i = 0; i < 5; i++) and for (int i = 0; i < 5; ++i) behave identically"
  },
  {
    question: "What bytecode instructions does the Java compiler emit for a standard `for` loop?",
    shortAnswer: "Initialization instructions (`iconst`, `istore`), comparison jump (`if_icmpge`), loop body bytecode, update instruction (`iinc`), and an unconditional jump (`goto`) back to the comparison.",
    explanation: "Uses `iinc` for efficient register-based increments.",
    hint: "Uses if_icmpge comparison, iinc increment, and goto jump.",
    level: "advanced",
    codeExample: "// Bytecode: istore_1 → if_icmpge L_EXIT → body → iinc 1, 1 → goto L_START"
  },
  {
    question: "Can a `float` or `double` variable be used as a `for` loop counter (`for (double d = 0.0; d <= 1.0; d += 0.1)`)?",
    shortAnswer: "Yes, but it is STRONGLY DISCOURAGED due to IEEE 754 floating-point rounding inaccuracies (e.g. `0.1 + 0.2 != 0.3`) which cause incorrect iteration counts.",
    explanation: "Always use integer counters and derive floating-point values mathematically.",
    hint: "Discouraged due to floating-point rounding errors.",
    level: "intermediate",
    codeExample: "// Prefer: for (int i=0; i<=10; i++) { double d = i / 10.0; }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore mock exam timer, how is the countdown loop structured?",
    shortAnswer: "`for (int timer = 5; timer >= 1; timer--)` to print T-minus launch sequences before assessment activation.",
    explanation: "Demonstrates practical countdown iteration.",
    hint: "Countdown loop decrements timer from 5 to 1.",
    level: "basic",
    codeExample: "for (int timer = 5; timer >= 1; timer--) print(timer);"
  },
  {
    question: "How many times does `for (int i = 1; i <= 10; i += 2)` execute?",
    shortAnswer: "5 times (with values `i = 1, 3, 5, 7, 9`).",
    explanation: "When `i` becomes 11, `11 <= 10` evaluates to false.",
    hint: "Executes 5 times for odd numbers 1, 3, 5, 7, 9.",
    level: "basic",
    codeExample: "for (int i = 1; i <= 10; i += 2) { /* 5 iterations */ }"
  },
  {
    question: "Can you declare and use multiple loop counters of the SAME type in a `for` loop header?",
    shortAnswer: "Yes! E.g. `for (int i = 0, j = 10; i < j; i++, j--)` (explored in Topic 3).",
    explanation: "Comma-separated declarations of the same type are valid in initialization.",
    hint: "Yes, comma-separated of the same type.",
    level: "basic",
    codeExample: "for (int i = 0, j = 10; i < j; i++, j--) { }"
  },
  {
    question: "What is an Iteration Trace Table?",
    shortAnswer: "A manual or automated tabular record showing the value of each variable (counter, accumulators, flags) at the start and end of every iteration cycle.",
    explanation: "Essential tool for verifying loop logic and debugging boundary conditions.",
    hint: "Tabular record of variable states per iteration.",
    level: "basic",
    codeExample: "// Iteration | i | sum | Condition (i <= 4)"
  },
  {
    question: "What happens if the update expression decreases the counter in an ascending loop (`for (int i = 0; i < 5; i--)`)?",
    shortAnswer: "An Infinite Loop occurs because `i` becomes negative and remains `< 5` forever (until integer underflow).",
    explanation: "Counter moves away from the termination boundary.",
    hint: "Counter diverges from termination bound, creating infinite loop.",
    level: "basic",
    codeExample: "for (int i = 0; i < 5; i--) { /* Infinite loop! */ }"
  },
  {
    question: "How does the HotSpot JIT compiler optimize a simple summing `for` loop?",
    shortAnswer: "By applying SIMD vectorization (vectorizing operations across AVX registers) or replacing the loop entirely with Gauss's formula ($n(n+1)/2$).",
    explanation: "JIT recognizes arithmetic progression patterns.",
    hint: "SIMD vectorization and closed-form arithmetic replacement.",
    level: "advanced",
    codeExample: "// JIT optimizes sum += i into SIMD vectorized instructions"
  },
  {
    question: "Can a method call be used in the condition expression of a `for` loop (`for (int i = 0; i < list.size(); i++)`)?",
    shortAnswer: "Yes, but for non-mutating loops over complex collections, caching the size (`int n = list.size(); for (int i = 0; i < n; i++)`) is a performance best practice.",
    explanation: "Avoids redundant method invocation overhead on every iteration.",
    hint: "Legal, but caching size outside is best practice.",
    level: "intermediate",
    codeExample: "for (int i = 0, len = str.length(); i < len; i++)"
  },
  {
    question: "What is the difference between `for` loop and `while` loop in design philosophy?",
    shortAnswer: "A `for` loop consolidates initialization, condition, and update into a single readable header (ideal for definite count-based iteration); a `while` loop separates them (ideal for state-based indefinite iteration).",
    explanation: "Readability and structural clarity for specific iteration types.",
    hint: "for consolidates header clauses for definite counting; while is state-based.",
    level: "basic",
    codeExample: "// for (int i=0; i<N; i++) vs while (isConnected)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 1 for Java developers?",
    shortAnswer: "The standard `for` loop provides a compact, robust structure for definite iteration by binding Initialization (once), Condition Check (pre-test), Body execution, and Update Expression into an unambiguous lifecycle sequence.",
    explanation: "Essential building block of Java algorithms and data traversal.",
    hint: "Compact, robust structure for definite counting iterations.",
    level: "basic",
    codeExample: "// Summary: for (init; condition; update) { body }"
  },
  {
    question: "What is the next topic (Topic 2) in Module 001_005?",
    shortAnswer: "Variable scope within for loop headers.",
    explanation: "Topic 2 explores lexical scoping, block lifetime, shadowing, and reusing loop variable names across consecutive loops.",
    hint: "Variable scope within for loop headers.",
    level: "basic",
    codeExample: "// Topic 2: Variable Scope in for loop headers"
  }
];

export default questions;
