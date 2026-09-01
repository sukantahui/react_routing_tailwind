const questions = [
  {
    question: "What is conditional branching in C?",
    shortAnswer: "A control flow mechanism that allows a program to execute different blocks of code based on whether a boolean expression evaluates to true (non-zero) or false (0).",
    explanation: "Conditional branching allows programs to make dynamic decisions at runtime rather than executing statements sequentially from top to bottom.",
    hint: "if, if-else, else-if, switch-case.",
    level: "basic",
    codeExample: "if (score >= 40) {\n    printf(\"Pass\\n\");\n}"
  },
  {
    question: "How does C evaluate truth values in boolean expressions?",
    shortAnswer: "0 represents FALSE; any non-zero integer (such as 1, -5, or 100) represents TRUE.",
    explanation: "In C (prior to and including C99), conditional tests treat 0 as false and any non-zero memory value as true.",
    hint: "0 is false, anything else is true.",
    level: "basic"
  },
  {
    question: "What is the classic assignment vs equality bug in an if condition (e.g. if (x = 5))?",
    shortAnswer: "Using a single '=' performs assignment instead of comparison, setting x to 5 and evaluating to TRUE (non-zero).",
    explanation: "`if (x = 5)` assigns 5 to x and tests the value 5, which is non-zero (true), executing the block every time. Always use `==` for comparison: `if (x == 5)`.",
    hint: "Single '=' assigns; double '==' compares.",
    level: "basic",
    codeExample: "// BUG:\n// if (role = 1) { ... }\n// FIX:\nif (role == 1) { ... }"
  },
  {
    question: "What is a 'Yoda Condition' and how does it prevent assignment bugs?",
    shortAnswer: "Writing the literal constant on the left side of the equality operator: `if (5 == x)`.",
    explanation: "If a programmer accidentally types `if (5 = x)`, the compiler immediately flags a syntax error (`lvalue required`) because you cannot assign to a constant literal.",
    hint: "Constant on the left: if (5 == count).",
    level: "intermediate",
    codeExample: "if (10 == total) { /* Safe: '10 = total' causes compile error */ }"
  },
  {
    question: "What is an else-if ladder and when should it be used?",
    shortAnswer: "A multi-way decision construct that evaluates a sequence of conditions from top to bottom until the first TRUE condition is found.",
    explanation: "Once a true branch is executed, all subsequent else-if branches are skipped completely. If none are true, the optional trailing `else` executes.",
    hint: "Multi-tier priority evaluation.",
    level: "basic"
  },
  {
    question: "What is the Dangling Else Problem in C and how is it resolved?",
    shortAnswer: "Ambiguity in nested if statements where an 'else' belongs to the closest preceding unmatched 'if'.",
    explanation: "The C compiler pairs an `else` with the nearest preceding `if` within the same block. Always use curly braces `{ ... }` to make nesting explicit and avoid logic bugs.",
    hint: "Always wrap inner if blocks with curly braces { }.",
    level: "intermediate",
    codeExample: "if (a > 0) {\n    if (b > 0) {\n        printf(\"Both positive\");\n    }\n} else {\n    printf(\"a is non-positive\");\n}"
  },
  {
    question: "What is a nested if statement?",
    shortAnswer: "An if (or if-else) statement placed entirely inside the body of another if or else block.",
    explanation: "Used to create multi-stage decision trees where a second condition is tested only if the primary condition succeeds.",
    hint: "Decisions within decisions.",
    level: "basic"
  },
  {
    question: "What is the mathematical condition for detecting a Leap Year in C?",
    shortAnswer: "`((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0))`",
    explanation: "A year is a leap year if divisible by 4, except century years (divisible by 100) which must also be divisible by 400 (e.g. 2000 was a leap year, 1900 was not).",
    hint: "Divisible by 4 and not 100, OR divisible by 400.",
    level: "intermediate",
    codeExample: "int isLeap = ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0));"
  },
  {
    question: "What is short-circuit evaluation in complex if conditions?",
    shortAnswer: "In `if (A && B)`, if A is false, B is skipped; in `if (A || B)`, if A is true, B is skipped.",
    explanation: "The CPU skips evaluating subsequent expressions when the overall truth value is already determined, preventing crashes like `if (ptr != NULL && *ptr > 0)`.",
    hint: "Left-to-right early exit in boolean logic.",
    level: "basic"
  },
  {
    question: "What happens if you place a semicolon immediately after an if condition (e.g. if (x > 0);)?",
    shortAnswer: "The semicolon terminates the if statement as an empty statement, causing the subsequent block to execute unconditionally.",
    explanation: "`if (x > 0);` means 'if x > 0 do nothing'. The block `{ printf(\"...\"); }` beneath it will always run regardless of `x`.",
    hint: "Never put a semicolon right after `if (condition)`.",
    level: "basic",
    codeExample: "// BUG:\n// if (x > 0); { printf(\"Positive\"); }\n// FIX:\nif (x > 0) { printf(\"Positive\"); }"
  },
  {
    question: "Can an if statement execute without curly braces `{}`?",
    shortAnswer: "Yes, but it will only control the single statement immediately following it.",
    explanation: "Writing without braces is error-prone because adding a second line later will run outside the if block. Professional engineering guidelines mandate braces for all if statements.",
    hint: "Always use curly braces even for single-line blocks.",
    level: "basic"
  },
  {
    question: "How does the ternary operator (? :) compare to an if-else statement?",
    shortAnswer: "The ternary operator is an expression that returns a value, whereas if-else is a control-flow statement.",
    explanation: "`int max = (a > b) ? a : b;` can be used inline inside assignments or function calls, while if-else requires separate statement blocks.",
    hint: "Ternary yields a value; if-else controls execution flow.",
    level: "basic"
  },
  {
    question: "What is Branch Prediction in modern CPU architectures and how does it affect if statements?",
    shortAnswer: "A hardware optimization where the CPU guesses the direction of an if branch before the condition calculation completes.",
    explanation: "If the CPU guesses correctly, execution pipeline runs at full speed. A branch misprediction flushes the instruction pipeline, causing a small performance penalty.",
    hint: "CPU pipeline speculation on branching paths.",
    level: "advanced"
  },
  {
    question: "How do you check if a character is uppercase, lowercase, digit, or special symbol using if-else?",
    shortAnswer: "Check ASCII ranges: `'A' <= ch && ch <= 'Z'` for uppercase, `'a' <= ch && ch <= 'z'` for lowercase, `'0' <= ch && ch <= '9'` for digits.",
    explanation: "Characters in C are integral ASCII codes, allowing relational boundary checks.",
    hint: "Relational comparisons on char literals.",
    level: "basic",
    codeExample: "if (ch >= 'A' && ch <= 'Z') {\n    printf(\"Uppercase letter\\n\");\n}"
  },
  {
    question: "What is the difference between sequential 'if' statements and an 'else-if' ladder?",
    shortAnswer: "Sequential 'if' statements test every single condition; an 'else-if' ladder stops checking as soon as one condition succeeds.",
    explanation: "If three independent `if` statements are used, all three are evaluated. In an `else-if` ladder, the first true condition short-circuits the rest.",
    hint: "Independent tests vs mutually exclusive choices.",
    level: "basic"
  },
  {
    question: "How do you find the maximum of three numbers using nested if-else statements?",
    shortAnswer: "Compare first with second; then compare the larger with the third.",
    explanation: "If `a >= b`, test `a >= c` (a is max) else (c is max). If `b > a`, test `b >= c` (b is max) else (c is max).",
    hint: "Tournament comparison tree.",
    level: "basic",
    codeExample: "int max;\nif (a >= b) {\n    max = (a >= c) ? a : c;\n} else {\n    max = (b >= c) ? b : c;\n}"
  },
  {
    question: "What is the boolean evaluation result of `if (!x)`?",
    shortAnswer: "It evaluates to true if x is 0 (false), and false if x is non-zero (true).",
    explanation: "The logical NOT operator (!) inverts truth: `!0` is 1, and `!non_zero` is 0.",
    hint: "Tests if a variable is zero / false / NULL.",
    level: "basic"
  },
  {
    question: "Why should we avoid deep nesting of if statements (Arrow Anti-Pattern)?",
    shortAnswer: "Deeply nested code (>4 levels) is difficult to read, debug, and maintain.",
    explanation: "Refactor deep nesting using Guard Clauses (early return/exit) or combining boolean conditions with logical operators (`&&`, `||`).",
    hint: "Use early returns / guard clauses to flatten code.",
    level: "intermediate"
  },
  {
    question: "What is a Guard Clause in C programming?",
    shortAnswer: "A check at the beginning of a function that returns or exits early if preconditions are not met.",
    explanation: "Instead of wrapping the entire function body in a huge `if (inputValid)`, you write `if (!inputValid) return -1;` upfront.",
    hint: "Fail fast and exit early.",
    level: "intermediate",
    codeExample: "int processPayment(int amount) {\n    if (amount <= 0) return -1; // Guard clause\n    // Main business logic continues cleanly...\n    return 0;\n}"
  },
  {
    question: "What is the order of evaluation in an else-if ladder?",
    shortAnswer: "Strictly from top to bottom in source code order.",
    explanation: "Place the most specific or most frequently occurring conditions at the top to optimize execution performance.",
    hint: "Top to bottom priority order.",
    level: "basic"
  },
  {
    question: "Can an if statement contain multiple statements without braces?",
    shortAnswer: "No, only the single next statement is associated with the if branch; any subsequent statement executes unconditionally.",
    explanation: "This was the cause of Apple's famous 'goto fail' SSL vulnerability! Always use braces `{ ... }`.",
    hint: "Always enclose branch bodies in curly braces.",
    level: "intermediate"
  },
  {
    question: "How does the compiler treat `if (1)` vs `if (0)`?",
    shortAnswer: "`if (1)` always executes the body; `if (0)` is dead code that the compiler optimizer removes.",
    explanation: "Constant condition testing is often used in debugging macros (e.g. `do { ... } while(0)`).",
    hint: "Always true vs dead code elimination.",
    level: "basic"
  },
  {
    question: "What header file allows writing `true` and `false` instead of 1 and 0 in C99?",
    shortAnswer: "<stdbool.h>",
    explanation: "Introduced in C99, <stdbool.h> defines `bool`, `true` (1), and `false` (0).",
    hint: "#include <stdbool.h>",
    level: "basic"
  },
  {
    question: "How do you test if three sides a, b, and c can form a valid triangle?",
    shortAnswer: "`a + b > c && a + c > b && b + c > a` (Triangle Inequality Theorem).",
    explanation: "The sum of the lengths of any two sides of a triangle must be strictly greater than the length of the third side.",
    hint: "Sum of any two sides must exceed the third side.",
    level: "basic"
  },
  {
    question: "What is the difference between `if (x & 1)` and `if (x % 2 == 1)` for detecting odd numbers?",
    shortAnswer: "`x & 1` tests the lowest bit directly (faster, works for positive and negative numbers); `x % 2 == 1` fails for negative odd numbers (which yield -1).",
    explanation: "In C99, `-5 % 2` evaluates to `-1` (not 1). Bitwise `x & 1` reliably checks odd parity for all integers.",
    hint: "Bitwise & 1 is faster and handles negative numbers properly.",
    level: "advanced"
  }
];

export default questions;
