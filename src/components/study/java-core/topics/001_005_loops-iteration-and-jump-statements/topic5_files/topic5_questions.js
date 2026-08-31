/**
 * Module 001_005: Topic 5: Exit-controlled loops: 'do-while' loop syntax and guaranteed single execution
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Exit-Controlled loop in Java (JLS §14.13)?",
    shortAnswer: "A loop that executes its body statements FIRST and evaluates its boolean condition AFTERWARDS at the end of each iteration cycle.",
    explanation: "`do-while` is the only exit-controlled (post-test) loop in Java.",
    hint: "Evaluates condition after body execution.",
    level: "basic",
    codeExample: "do { doWork(); } while (condition);"
  },
  {
    question: "What is the standard syntax of a `do-while` loop in Java?",
    shortAnswer: "`do { Statement(s) } while (BooleanExpression);`",
    explanation: "Notice the mandatory trailing semicolon `;` following `while (condition)`.",
    hint: "do { ... } while (condition);",
    level: "basic",
    codeExample: "int i = 0; do { print(i); i++; } while (i < 5);"
  },
  {
    question: "What is the minimum number of times a `do-while` loop executes?",
    shortAnswer: "At least ONCE (1 guaranteed execution), even if the condition is `false` initially.",
    explanation: "Because the body is executed before the condition is ever evaluated.",
    hint: "Guaranteed to execute at least 1 time.",
    level: "basic",
    codeExample: "int x = 100;\ndo { print(\"Executes once!\"); } while (x < 10);"
  },
  {
    question: "Why is a trailing semicolon `;` mandatory at the end of a `do-while` loop?",
    shortAnswer: "Because `do Statement while (Expression);` is a statement construct in Java grammar that must terminate with a semicolon to avoid parser ambiguity.",
    explanation: "Omitting the semicolon causes a compile-time error.",
    hint: "Mandatory semicolon terminates the do-while statement.",
    level: "basic",
    codeExample: "do { } while (cond); // Semicolon is mandatory!"
  },
  {
    question: "What is the primary real-world use case for `do-while` loops?",
    shortAnswer: "Interactive CLI menu systems where the menu must be displayed to the user at least once before reading their choice.",
    explanation: "Ensures the prompt is shown before evaluating the loop exit condition.",
    hint: "Interactive menus and user input retry loops.",
    level: "basic",
    codeExample: "do { displayMenu(); choice = readChoice(); } while (choice != EXIT);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student portal, how is `do-while` used?",
    shortAnswer: "To display the student portal menu (View Courses, Pay Installment, Logout) at least once before validating the user's action in Indian Rupees (₹).",
    explanation: "Demonstrates practical interactive portal workflow.",
    hint: "Displays portal menu at least once before validating exit.",
    level: "basic",
    codeExample: "do { renderMenu(); choice = getSelection(); } while (choice != LOGOUT);"
  },
  {
    question: "How does a `do-while` loop implement a PIN Validation Retry pattern?",
    shortAnswer: "By prompting for the PIN, incrementing attempts, and continuing `while (enteredPin != secretPin && attempts < 3)`.",
    explanation: "Guarantees at least one PIN prompt before testing.",
    hint: "Prompts for PIN first, then checks validity and retry limit.",
    level: "basic",
    codeExample: "do { pin = readPin(); } while (!isValid(pin) && ++attempts < 3);"
  },
  {
    question: "What is the key structural difference between `while (c) { b; }` and `do { b; } while (c);`?",
    shortAnswer: "`while` is pre-test (0 or more executions); `do-while` is post-test (1 or more executions).",
    explanation: "Fundamental operational contrast in loop theory.",
    hint: "while is pre-test (0+); do-while is post-test (1+).",
    level: "basic",
    codeExample: "// while (0..N) vs do-while (1..N)"
  },
  {
    question: "What happens if the variable tested in `while (condition);` is declared INSIDE the `do` body (`do { int x = 5; } while (x > 0);`)?",
    shortAnswer: "Compilation error: `cannot find symbol: variable x` because `x` is scoped strictly inside the curly braces `{ ... }` and does not exist in the `while` clause!",
    explanation: "Classic beginner variable scope pitfall.",
    hint: "Compile error: condition cannot see variables declared inside the do block.",
    level: "basic",
    codeExample: "// do { int x = 5; } while (x > 0); // COMPILER ERROR: x out of scope!"
  },
  {
    question: "Where must variables tested in a `do-while` condition be declared?",
    shortAnswer: "BEFORE the `do` block: `int x; do { x = compute(); } while (x > 0);`.",
    explanation: "Ensures the variable is in scope for both the body and the condition check.",
    hint: "Must be declared before the do block.",
    level: "basic",
    codeExample: "int choice;\ndo {\n    choice = scanner.nextInt();\n} while (choice != 0);"
  },
  {
    question: "Can `break` and `continue` be used inside a `do-while` loop?",
    shortAnswer: "Yes! `break` terminates the loop immediately; `continue` skips the rest of the body and jumps directly to the `while (condition)` check.",
    explanation: "Full support for standard loop jump statements.",
    hint: "Yes, break exits immediately; continue jumps to condition check.",
    level: "basic",
    codeExample: "do { if (error) break; if (skip) continue; } while (running);"
  },
  {
    question: "What bytecode instruction structure does the JVM emit for a `do-while` loop?",
    shortAnswer: "A direct body label (`L_BODY`), body instructions, condition evaluation, and a conditional jump (`if_icmplt L_BODY`) jumping back to the top of the body if true.",
    explanation: "More compact bytecode than `while` because no initial `goto` jump is required.",
    hint: "Compact bytecode with direct loopback jump at the bottom.",
    level: "advanced",
    codeExample: "// Bytecode: L_BODY: body → condition → if_icmp L_BODY"
  },
  {
    question: "What is the canonical infinite `do-while` loop in Java?",
    shortAnswer: "`do { ... } while (true);`",
    explanation: "Runs continuously until an internal `break`, `return`, or exception occurs.",
    hint: "do { ... } while (true);",
    level: "basic",
    codeExample: "do { handleEvent(); } while (true);"
  },
  {
    question: "How does `do-while (false);` behave in Java?",
    shortAnswer: "The body executes EXACTLY ONCE, and then control passes to the next statement.",
    explanation: "Used occasionally in macro-like compound statements, though discouraged in modern Java.",
    hint: "Executes body exactly once and exits.",
    level: "intermediate",
    codeExample: "do { initializeHardware(); } while (false); // Runs once"
  },
  {
    question: "Can a `do-while` loop be nested inside another `do-while` or `for` loop?",
    shortAnswer: "Yes! Any loop construct can be nested inside any other loop construct in Java.",
    explanation: "Full support for multi-tier nesting.",
    hint: "Yes, arbitrary nesting is supported.",
    level: "basic",
    codeExample: "do { for (int i=0; i<3; i++) { } } while (active);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore banking ATM simulator, why is `do-while` used for withdrawal attempts?",
    shortAnswer: "To ensure that at least one balance verification check occurs (e.g. attempting ₹500 withdrawal on ₹100 balance) before validating the result in Indian Rupees (₹).",
    explanation: "Demonstrates guaranteed single execution for transaction verification.",
    hint: "Guarantees at least one withdrawal verification check.",
    level: "basic",
    codeExample: "do { checkBalance(); } while (balance >= minWithdrawal);"
  },
  {
    question: "What happens if an unhandled runtime exception occurs during the first execution of a `do-while` body?",
    shortAnswer: "The exception terminates the loop immediately, and the `while (condition)` check is never evaluated.",
    explanation: "Uncaught exceptions bypass the condition evaluation.",
    hint: "Exception aborts execution before condition is reached.",
    level: "basic",
    codeExample: "do { throw new NullPointerException(); } while (true); // Never reaches while"
  },
  {
    question: "Why do static analysis tools flag `while (i < 5);` as a bug but accept `do { } while (i < 5);`?",
    shortAnswer: "Because in `while (i < 5);`, the semicolon is an accidental empty body; in `do-while`, the trailing semicolon is syntactically required by the language grammar.",
    explanation: "Grammar distinction between pre-test and post-test semicolons.",
    hint: "Trailing semicolon is required syntax in do-while, but a bug in while.",
    level: "intermediate",
    codeExample: "// while (c); → BUG! vs do { } while (c); → CORRECT SYNTAX"
  },
  {
    question: "Can the body of a `do-while` loop be a single statement without curly braces (`do print(); while (c);`)?",
    shortAnswer: "Yes, but curly braces `{ ... }` are strongly recommended to prevent maintenance bugs and improve clarity.",
    explanation: "Clean code best practice.",
    hint: "Syntactically valid, but curly braces are strongly recommended.",
    level: "basic",
    codeExample: "do System.out.println(\"Hi\"); while (condition); // Legal but discouraged"
  },
  {
    question: "What is the output of `int i = 5; do { System.out.print(i + \" \"); i++; } while (i < 5);`?",
    shortAnswer: "`5 ` (prints `5` once, increments `i` to 6, condition `6 < 5` is false, and terminates).",
    explanation: "Classic demonstration of post-test execution.",
    hint: "Prints 5 once and terminates.",
    level: "basic",
    codeExample: "int i = 5; do { print(i++); } while (i < 5);"
  },
  {
    question: "How does `do-while` simplify reading characters from a stream until a newline `\\n`?",
    shortAnswer: "By reading the character first inside the body, processing it, and checking `while (ch != '\\n')`.",
    explanation: "Eliminates redundant priming reads before the loop.",
    hint: "Eliminates duplicate priming read before loop.",
    level: "intermediate",
    codeExample: "do { ch = reader.read(); process(ch); } while (ch != '\\n');"
  },
  {
    question: "What is a 'Priming Read' in `while` loops and how does `do-while` eliminate it?",
    shortAnswer: "In a `while` loop, data must be read once *before* the loop and again *inside* the loop (duplication); a `do-while` loop reads data directly inside the body on every cycle, eliminating duplicate read calls.",
    explanation: "Architectural reason for choosing do-while over while.",
    hint: "do-while reads directly inside body, eliminating duplicate priming read.",
    level: "intermediate",
    codeExample: "// while: read(); while(cond) { ... read(); } vs do-while: do { read(); } while(cond);"
  },
  {
    question: "Can multiple conditions be evaluated in a `do-while` condition (`while (a && (b || c))`)?",
    shortAnswer: "Yes! Any valid boolean expression can be used.",
    explanation: "Full support for compound boolean expressions.",
    hint: "Yes, any boolean expression.",
    level: "basic",
    codeExample: "do { doWork(); } while (status == PENDING && retries < 5);"
  },
  {
    question: "What is the performance difference between `while` and `do-while` loops in modern JIT compilers?",
    shortAnswer: "Zero difference; both compile to identical assembly jump instructions under HotSpot C2 compiler optimization.",
    explanation: "JVM JIT compiler normalizes loop representations.",
    hint: "Zero performance difference under JIT optimization.",
    level: "advanced",
    codeExample: "// JIT normalizes both into optimal machine code"
  },
  {
    question: "Can a `do-while` loop be used with labeled `break` to exit an outer loop?",
    shortAnswer: "Yes! `break OUTER_LABEL;` works identically across all loop types.",
    explanation: "Topic 14 covers labeled break/continue in depth.",
    hint: "Yes, labeled break exits outer loops.",
    level: "basic",
    codeExample: "OUTER: do { do { break OUTER; } while(c1); } while(c2);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why are students advised to use `do-while` for input validation?",
    shortAnswer: "Because user input must be requested at least once before it can be validated against business rules.",
    explanation: "Core UI/CLI interaction pattern.",
    hint: "Input must be gathered before it can be validated.",
    level: "basic",
    codeExample: "do { fee = promptFee(); } while (fee < 0);"
  },
  {
    question: "What is the risk of an infinite loop in a `do-while` construct?",
    shortAnswer: "If the update step is omitted or the termination condition can never evaluate to `false`, the loop runs forever, executing at least one iteration and continuing endlessly.",
    explanation: "Standard loop termination risk.",
    hint: "Missing update causes infinite execution.",
    level: "basic",
    codeExample: "do { print(); /* missing counter update */ } while (i < 5);"
  },
  {
    question: "How do you trace a `do-while` loop with an Iteration Trace Table?",
    shortAnswer: "Record: Iteration # $\\to$ Body execution state $\\to$ Variable mutations $\\to$ Condition evaluation (`true`/`false`).",
    explanation: "Condition is recorded after body execution.",
    hint: "Record body state first, then condition evaluation.",
    level: "basic",
    codeExample: "// Trace: 1. Body runs → 2. state updated → 3. condition evaluated"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 5 for Java developers?",
    shortAnswer: "The `do-while` loop is Java's sole exit-controlled (post-test) construct, guaranteeing at least one body execution; it eliminates redundant priming reads and is the premier choice for interactive menus and validation retry loops.",
    explanation: "Essential post-test iteration mechanism in Java.",
    hint: "Post-test loop guaranteeing at least 1 execution, ideal for menus and retries.",
    level: "basic",
    codeExample: "// Summary: do { body(); } while (condition);"
  },
  {
    question: "What is the next topic (Topic 6) in Module 001_005?",
    shortAnswer: "Key differences: for vs while vs do-while and when to choose which.",
    explanation: "Topic 6 provides a comprehensive comparative analysis and decision framework for choosing the optimal loop construct.",
    hint: "Comparing for vs while vs do-while decision matrix.",
    level: "basic",
    codeExample: "// Topic 6: for vs while vs do-while comparison"
  }
];

export default questions;
