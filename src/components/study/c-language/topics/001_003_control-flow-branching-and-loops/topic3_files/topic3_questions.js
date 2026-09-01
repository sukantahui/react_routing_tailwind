const questions = [
  {
    question: "What is the function of the `break` statement in C?",
    shortAnswer: "It immediately terminates the innermost enclosing loop (`for`, `while`, `do-while`) or `switch` block and transfers control to the following statement.",
    explanation: "Used to exit loops early when a target condition is met (e.g. linear search match) or when an error occurs.",
    hint: "Emergency loop exit.",
    level: "basic"
  },
  {
    question: "What is the function of the `continue` statement in C?",
    shortAnswer: "It skips the remainder of the current loop iteration and immediately jumps to the loop update/condition evaluation for the next cycle.",
    explanation: "Does not terminate the loop, but skips remaining statements in the current iteration.",
    hint: "Skip to next iteration.",
    level: "basic"
  },
  {
    question: "What is the difference between `break` and `continue`?",
    shortAnswer: "`break` completely terminates the loop; `continue` skips the rest of the current iteration and starts the next iteration.",
    explanation: "Break exits the loop entirely; continue skips only the remaining lines of the current cycle.",
    hint: "Stop everything vs skip current round.",
    level: "basic"
  },
  {
    question: "How does `continue` interact with the update step of a `for` loop?",
    shortAnswer: "In a `for` loop, `continue` jumps directly to the update expression (`i++`) before checking the condition again.",
    explanation: "In contrast, in a `while` loop, if `i++` is placed below the `continue`, it will be skipped, causing an infinite loop!",
    hint: "for loop runs update step; while loop skips everything below.",
    level: "intermediate"
  },
  {
    question: "What is the `goto` statement in C?",
    shortAnswer: "An unconditional jump statement that transfers control directly to a named label within the same function.",
    explanation: "Syntax: `goto label_name; ... label_name: statement;`.",
    hint: "Unconditional jump to label.",
    level: "basic"
  },
  {
    question: "Why is the use of `goto` generally discouraged in modern structured programming ('Spaghetti Code')?",
    shortAnswer: "Arbitrary jumping between arbitrary points makes program flow tangled, difficult to read, impossible to reason about, and prone to memory leaks.",
    explanation: "Edsger Dijkstra's famous 1968 paper 'Go To Statement Considered Harmful' advocated structured control blocks instead.",
    hint: "Creates unmaintainable spaghetti code.",
    level: "intermediate"
  },
  {
    question: "What is the one widely accepted and standard use case for `goto` in professional systems programming (e.g. Linux Kernel)?",
    shortAnswer: "Unified error handling and multi-level resource cleanup at the end of a function, and breaking out of deeply nested loops.",
    explanation: "In the Linux Kernel, `goto out_free_memory;` centralizes resource deallocation to prevent memory leaks across multiple error exit points.",
    hint: "Centralized error cleanup and breaking deeply nested loops.",
    level: "advanced",
    codeExample: "int initHardware(void) {\n    if (!allocA()) goto err_a;\n    if (!allocB()) goto err_b;\n    return 0; // Success\nerr_b:\n    freeA();\nerr_a:\n    return -1;\n}"
  },
  {
    question: "Can a `break` statement break out of two nested loops simultaneously?",
    shortAnswer: "No, `break` only exits the innermost enclosing loop.",
    explanation: "To exit multiple nested loops simultaneously, use a boolean flag, a `return` statement, or a clean `goto` label outside the outer loop.",
    hint: "Only breaks 1 layer of loop.",
    level: "basic"
  },
  {
    question: "Can a `goto` jump across different functions?",
    shortAnswer: "No, a `goto` statement can only jump to labels defined within the same function scope.",
    explanation: "To jump across function boundaries in C, the `<setjmp.h>` library (`setjmp` and `longjmp`) must be used.",
    hint: "Function-local jumps only.",
    level: "intermediate"
  },
  {
    question: "What is a Label in C syntax?",
    shortAnswer: "An identifier followed by a colon (e.g. `cleanup_exit:`) that marks a specific line of code as a jump target.",
    explanation: "Labels must be followed by a statement; if placed at the very end of a function, append a null statement: `cleanup_exit: ;`.",
    hint: "Identifier followed by colon (:).",
    level: "basic"
  },
  {
    question: "What is the danger of using `continue` inside a `while` loop?",
    shortAnswer: "If the counter increment (`i++`) is located after `continue`, it will be skipped, causing the condition to remain permanently true (infinite loop).",
    explanation: "Always increment before `continue` in a while loop or use a `for` loop.",
    hint: "Bypasses the counter increment.",
    level: "basic",
    codeExample: "// BUG (Infinite Loop):\n// while (i < 10) { if (i==5) continue; i++; }\n// FIX:\nwhile (i < 10) { if (i==5) { i++; continue; } i++; }"
  },
  {
    question: "Can `break` be used inside an `if` statement that is NOT inside a loop or switch?",
    shortAnswer: "No, using `break` outside of a loop or switch statement causes a compilation error (`break statement not within loop or switch`).",
    explanation: "Break requires an enclosing iteration or selection construct.",
    hint: "Only valid inside loops or switch blocks.",
    level: "basic"
  },
  {
    question: "Can `continue` be used inside a `switch` statement that is NOT inside a loop?",
    shortAnswer: "No, `continue` is strictly a loop control statement and cannot be used in a standalone switch.",
    explanation: "If a switch is inside a loop, `continue` applies to the enclosing loop.",
    hint: "Strictly for loop constructs.",
    level: "basic"
  },
  {
    question: "How does `return` compare to `break` inside a loop in a function?",
    shortAnswer: "`break` exits the loop and continues executing the rest of the function; `return` exits the entire function immediately.",
    explanation: "Return immediately hands control back to the caller.",
    hint: "Exits loop vs exits entire function.",
    level: "basic"
  },
  {
    question: "What is an Early Exit / Fail-Fast pattern in loops?",
    shortAnswer: "Checking error or termination conditions at the start of each iteration and breaking/continuing immediately to avoid executing nested logic unnecessarily.",
    explanation: "Keeps loop bodies flat, readable, and computationally efficient.",
    hint: "Early exit keeps code clean.",
    level: "intermediate"
  },
  {
    question: "How does the compiler translate `break` and `continue` into assembly instructions?",
    shortAnswer: "Both translate directly into unconditional jump (`jmp`) instructions to specific basic block labels in the compiled binary.",
    explanation: "`break` jumps to the loop exit label; `continue` jumps to the loop header/update label.",
    hint: "Assembly jmp opcodes.",
    level: "advanced"
  },
  {
    question: "Can multiple labels point to the same statement in C?",
    shortAnswer: "Yes, you can stack multiple labels on the same line: `label1: label2: printf(\"Target\");`.",
    explanation: "Allows multiple jump origins to converge onto a single target routine.",
    hint: "Stacked labels.",
    level: "intermediate"
  },
  {
    question: "Why does jumping over variable initialization with `goto` cause issues?",
    shortAnswer: "Jumping over a variable declaration with initialization can leave the variable with indeterminate garbage memory or cause compiler errors in C99 (variable length arrays).",
    explanation: "Do not jump past variable initializations.",
    hint: "Leaves variables uninitialized.",
    level: "intermediate"
  },
  {
    question: "How do you break out of a loop based on user input (e.g. typing 'q' to quit)?",
    shortAnswer: "Read character input and check `if (ch == 'q' || ch == 'Q') break;` inside the loop body.",
    explanation: "Standard interactive CLI loop control pattern.",
    hint: "Interactive break condition.",
    level: "basic"
  },
  {
    question: "What is the impact of excessive `break` statements on code readability?",
    shortAnswer: "Having multiple hidden break points throughout a long loop makes it harder to deduce the loop's invariant and exit criteria.",
    explanation: "Keep loop exit conditions visible in the loop header where feasible.",
    hint: "Hidden exits make reasoning difficult.",
    level: "intermediate"
  },
  {
    question: "What happens if `goto` jumps backwards above its declaration?",
    shortAnswer: "It creates a manual loop.",
    explanation: "Before structured while/for loops were standardized in high-level languages, backwards goto statements were used to build manual iteration loops.",
    hint: "Simulates manual loop construct.",
    level: "basic"
  },
  {
    question: "Can `break` be placed inside a helper function to break an outer loop in `main()`?",
    shortAnswer: "No, `break` only operates within the syntactic block in which it is written.",
    explanation: "A helper function must return a boolean/status code to let `main()` decide whether to break.",
    hint: "Lexically scoped control statement.",
    level: "basic"
  },
  {
    question: "What is the difference between `break` in C and `break` with labels in Java/JavaScript?",
    shortAnswer: "C does NOT support labeled break statements (e.g. `break outerLoop;`). In C, breaking nested loops requires a flag or `goto`.",
    explanation: "C's break only exits one level.",
    hint: "C does not have labeled break.",
    level: "intermediate"
  },
  {
    question: "How does linear search time complexity improve with `break`?",
    shortAnswer: "Best-case time complexity becomes O(1) if the element is found at the beginning, rather than always iterating through all N elements.",
    explanation: "Eliminates unnecessary comparisons once the item is located.",
    hint: "Early exit gives O(1) best case.",
    level: "basic"
  },
  {
    question: "What is the best alternative to using `goto` for breaking out of nested loops?",
    shortAnswer: "Encapsulating the nested loops inside a dedicated helper function and using `return` when the target is found.",
    explanation: "`return foundValue;` immediately terminates all nested loop levels cleanly without needing flags or goto.",
    hint: "Extract into function and use return.",
    level: "intermediate"
  }
];

export default questions;
