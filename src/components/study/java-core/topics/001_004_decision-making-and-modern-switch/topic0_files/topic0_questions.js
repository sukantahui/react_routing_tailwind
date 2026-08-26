/**
 * Module 001_004: Topic 0: Concept of control flow and conditional branching in software
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Control Flow in computer programming?",
    shortAnswer: "The order in which individual statements, instructions, or function calls are executed or evaluated at runtime.",
    explanation: "By default, control flow is sequential (top-to-bottom), but it can be altered via decision-making, looping, and branching statements.",
    hint: "The execution order of statements at runtime.",
    level: "basic",
    codeExample: "// Sequential -> Branching -> Looping"
  },
  {
    question: "What is the Böhm-Jacopini Structured Programming Theorem?",
    shortAnswer: "A fundamental computer science theorem proving that any computable algorithm can be expressed using only 3 control structures: Sequence, Selection (Branching), and Iteration (Looping).",
    explanation: "Eliminated the need for unstructured `goto` jumps in modern software engineering.",
    hint: "Sequence, Selection, and Iteration can express any algorithm.",
    level: "intermediate",
    codeExample: "// 1. Sequence: a; b; c;\n// 2. Selection: if (cond) { ... }\n// 3. Iteration: while (cond) { ... }"
  },
  {
    question: "What are the core Selection / Decision-Making structures in Java?",
    shortAnswer: "`if`, `if-else`, `else-if` ladder, traditional `switch-case`, and modern Java 14+ `switch` expressions.",
    explanation: "These statements divert program execution based on boolean conditions or pattern matches.",
    hint: "if, if-else, else-if, switch.",
    level: "basic",
    codeExample: "if (balance >= fee) { enroll(); } else { promptPay(); }"
  },
  {
    question: "What is Sequential Control Flow?",
    shortAnswer: "Executing statements linearly, one after another in the order they appear in source code, without branching or skipping.",
    explanation: "The default execution model of the JVM.",
    hint: "Linear top-to-bottom statement execution.",
    level: "basic",
    codeExample: "int a = 10;\nint b = 20;\nint sum = a + b;"
  },
  {
    question: "What is Conditional Branching?",
    shortAnswer: "Diverting program execution along different paths depending on whether a boolean expression evaluates to `true` or `false`.",
    explanation: "Allows software to respond dynamically to inputs, user actions, and error states.",
    hint: "Diverting execution based on a boolean condition.",
    level: "basic",
    codeExample: "if (user.isAdmin()) { showAdminDashboard(); }"
  },
  {
    question: "How does the CPU execute conditional branching at the hardware level?",
    shortAnswer: "By altering the Instruction Pointer (Program Counter / PC register) using conditional jump instructions (`ifeq`, `ifne`, `jmp`).",
    explanation: "If the condition matches, the PC register jumps to a different memory address.",
    hint: "Modifies the Program Counter register via conditional jumps.",
    level: "advanced",
    codeExample: "// Bytecode: ifeq Label_False -> executes branch jump"
  },
  {
    question: "What is Branch Prediction in modern CPU architectures?",
    shortAnswer: "A hardware optimization where the CPU speculates which branch of an `if-else` statement is likely to be taken before the condition evaluation finishes.",
    explanation: "If predicted correctly, pipeline stalls are avoided; if mispredicted, the speculative instructions are flushed.",
    hint: "Hardware speculation of branch outcome.",
    level: "expert",
    codeExample: "// CPU pipeline predicts branch direction"
  },
  {
    question: "What are the 3 main categories of control flow statements in Java?",
    shortAnswer: "1. Decision Making (if, switch), 2. Looping / Iteration (for, while, do-while), 3. Jump statements (break, continue, return).",
    explanation: "Standard categorization in the Java Language Specification.",
    hint: "Decision making, looping, and jumping.",
    level: "basic",
    codeExample: "// Selection, Iteration, Jump"
  },
  {
    question: "Why is unstructured `goto` forbidden in Java?",
    shortAnswer: "To prevent 'Spaghetti Code', non-deterministic jump paths, and unmaintainable software architecture.",
    explanation: "Java retains `goto` as an unused reserved keyword.",
    hint: "Prevents unmaintainable spaghetti code.",
    level: "basic",
    codeExample: "// goto is a reserved keyword, but cannot be used"
  },
  {
    question: "What structured jump statements does Java provide instead of `goto`?",
    shortAnswer: "`break`, `continue`, `return`, `throw`, and labeled `break`/`continue`.",
    explanation: "Allows controlled exit from loops, switch blocks, and methods.",
    hint: "break, continue, return, throw.",
    level: "basic",
    codeExample: "if (found) break;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore ATM simulator, how does control flow route transactions?",
    shortAnswer: "A multi-way `switch` statement inspects the transaction action type (`WITHDRAW`, `DEPOSIT`, `CHECK_BALANCE`) and executes the corresponding balance logic.",
    explanation: "Demonstrates multi-branch routing in financial systems in Indian Rupees (₹).",
    hint: "Switch routes to withdrawal, deposit, or balance inquiry.",
    level: "basic",
    codeExample: "switch (action) { case \"WITHDRAW\" -> withdraw(); }"
  },
  {
    question: "What is a Guard Clause in clean code architecture?",
    shortAnswer: "A premature return or exit condition placed at the beginning of a method to handle invalid inputs or special cases immediately, avoiding nested indentation.",
    explanation: "Reduces cyclomatic complexity and flattens code structure.",
    hint: "Early return at top of method to eliminate nesting.",
    level: "intermediate",
    codeExample: "if (student == null) return;\nif (!student.isEnrolled()) return;\n// Main processing continues cleanly"
  },
  {
    question: "What is Cyclomatic Complexity?",
    shortAnswer: "A software metric that measures the number of linearly independent paths through a program's source code.",
    explanation: "Higher cyclomatic complexity indicates deeply nested decision trees that are harder to test and maintain.",
    hint: "Metric measuring the number of execution paths.",
    level: "advanced",
    codeExample: "// Each if, switch case, and loop increases complexity by 1"
  },
  {
    question: "What is the recommended cyclomatic complexity limit for a clean Java method?",
    shortAnswer: "Generally $\\le 10$ (methods exceeding 10-15 should be refactored).",
    explanation: "Industry standard clean code guideline (e.g. SonarQube, Checkstyle).",
    hint: "Keep complexity <= 10 per method.",
    level: "intermediate",
    codeExample: "// Keep methods focused, small, and modular"
  },
  {
    question: "Can an `if` statement execute without curly braces `{}` in Java?",
    shortAnswer: "Yes, but it controls ONLY the single statement immediately following it.",
    explanation: "Omitting braces is considered an industry anti-pattern because it invites bugs like the infamous Apple 'goto fail' defect.",
    hint: "Controls only one statement; best practice is to always use braces.",
    level: "basic",
    codeExample: "if (isValid) doSomething(); // Legal, but braces {} are strongly recommended"
  },
  {
    question: "What is the Dangling Else Problem in programming languages?",
    shortAnswer: "Ambiguity when a nested `if` is followed by an `else`, resolved in Java by binding the `else` to the innermost open `if`.",
    explanation: "Topic 3 explores the dangling else problem and how braces resolve it.",
    hint: "Else attaches to the closest preceding if.",
    level: "intermediate",
    codeExample: "if (a) if (b) s1(); else s2(); // else belongs to if(b)"
  },
  {
    question: "What is the difference between a Statement and an Expression in Java?",
    shortAnswer: "An Expression produces a value (e.g. `a + b`, `x ? 1 : 2`); a Statement represents an action or execution step (e.g. `if (c) { }`, `int x = 5;`).",
    explanation: "Modern Java 14+ switch can be used as both a statement and an expression.",
    hint: "Expression produces value; Statement performs action.",
    level: "intermediate",
    codeExample: "int x = 10; // Statement\nint y = x + 5; // x + 5 is an Expression"
  },
  {
    question: "What is an Expression Statement in Java?",
    shortAnswer: "Certain expressions that are permitted to stand alone as statements (assignments `x = 5;`, increments `x++;`, method invocations `print();`, object creations `new Student();`).",
    explanation: "Defined in JLS §14.8.",
    hint: "Assignments, increments, method calls used as statements.",
    level: "advanced",
    codeExample: "count++; // Expression statement"
  },
  {
    question: "What is Dead Code / Unreachable Code in Java control flow?",
    shortAnswer: "Statements that can never be executed under any circumstances; the Java compiler treats unreachable statements as compile-time errors.",
    explanation: "E.g. writing statements after an unconditional `return` or `while (true)` without break.",
    hint: "Compiler errors on unreachable statements.",
    level: "intermediate",
    codeExample: "return;\n// System.out.println(\"Hi\"); // COMPILATION ERROR: Unreachable code"
  },
  {
    question: "What is the difference between Compile-Time Dead Code and Constant Conditional Elimination?",
    shortAnswer: "`if (false) { ... }` is permitted by the compiler for debug toggling without causing an unreachable code error, whereas `while (false) { ... }` is a compile error.",
    explanation: "JLS §14.21 explicitly permits `if (false)` for conditional compilation.",
    hint: "if (false) is allowed; while (false) is an error.",
    level: "expert",
    codeExample: "if (false) { System.out.println(\"Debug\"); } // Compiles cleanly"
  },
  {
    question: "What is an `else-if` ladder in Java?",
    shortAnswer: "A multi-way selection structure that evaluates a series of boolean conditions sequentially until the first `true` branch is found.",
    explanation: "Used for grading slabs, income tax brackets, and range classifications.",
    hint: "Sequential multi-branch decision ladder.",
    level: "basic",
    codeExample: "if (marks >= 90) { } else if (marks >= 75) { } else { }"
  },
  {
    question: "What is a Jump Table in compiled switch statements?",
    shortAnswer: "An array of instruction addresses generated by the compiler (`tableswitch` opcode) that allows $O(1)$ constant-time multi-branch routing.",
    explanation: "Much faster than an $O(N)$ `else-if` ladder when case values are dense.",
    hint: "O(1) direct branch lookup table in bytecode.",
    level: "advanced",
    codeExample: "// Bytecode: tableswitch 1 to 4: default -> L_default"
  },
  {
    question: "What major enhancement did Java 14 bring to control flow?",
    shortAnswer: "Standardized Switch Expressions with arrow syntax (`case X -> Y`), elimination of fall-through, multiple case constants (`case 1, 2, 3 ->`), and the `yield` keyword.",
    explanation: "Transforms switch from an imperative statement into a functional, value-producing expression.",
    hint: "Modern arrow switch expressions and yield keyword.",
    level: "basic",
    codeExample: "String res = switch (day) { case 1, 2 -> \"Weekday\"; default -> \"Weekend\"; };"
  },
  {
    question: "What is Fall-Through in traditional switch statements?",
    shortAnswer: "When execution continues automatically into subsequent `case` blocks unless explicitly stopped by a `break` statement.",
    explanation: "A major source of software bugs when accidental, but useful when intentional.",
    hint: "Execution flows into next case without break.",
    level: "basic",
    codeExample: "case 1:\ncase 2:\n    doAction();\n    break;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, what is the goal of Module 001_004?",
    shortAnswer: "To master decision-making structures from fundamental `if-else` branching to modern Java 14+ switch expressions and pattern matching.",
    explanation: "Provides the complete toolkit for building reliable, production-ready routing logic.",
    hint: "Master decision making, branching, and modern switch.",
    level: "basic",
    codeExample: "// Module 001_004: Decision Making & Modern Switch"
  },
  {
    question: "Can an `if` condition evaluate to anything other than a `boolean` in Java?",
    shortAnswer: "No! Unlike C/C++, Java strictly enforces that conditional expressions must evaluate to primitive `boolean` or `Boolean` wrapper.",
    explanation: "`if (1)` or `if (null)` causes a compilation error.",
    hint: "Strict boolean requirement.",
    level: "basic",
    codeExample: "// if (1) { } // COMPILATION ERROR"
  },
  {
    question: "What happens if a `Boolean` wrapper object passed to an `if` condition is `null`?",
    shortAnswer: "Throws `java.lang.NullPointerException` due to automatic unboxing.",
    explanation: "Unboxing `null` to primitive boolean fails at runtime.",
    hint: "Unboxing null Boolean throws NullPointerException.",
    level: "intermediate",
    codeExample: "Boolean flag = null;\n// if (flag) { } // THROWS NullPointerException"
  },
  {
    question: "What is Short-Circuiting in conditional expressions?",
    shortAnswer: "Skipping evaluation of the right operand in `&&` or `||` as soon as the final result is guaranteed.",
    explanation: "Essential for defensive null guards and boundary checking.",
    hint: "Stops evaluation on first decisive boolean result.",
    level: "basic",
    codeExample: "if (user != null && user.isValid()) { }"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 0 for Java developers?",
    shortAnswer: "Control flow transforms static code into dynamic, intelligent software; mastering structured branching (`if-else`, `switch`) ensures high performance, crash immunity, and maintainable enterprise architectures.",
    explanation: "Sets the stage for in-depth mastery of decision-making in Module 001_004.",
    hint: "Control flow governs execution; foundation for all software logic.",
    level: "basic",
    codeExample: "// Summary: Sequence, Selection (if/switch), and Iteration form all software"
  },
  {
    question: "What is the next topic (Topic 1) in Module 001_004?",
    shortAnswer: "Simple 'if' statement: syntax, boolean conditions, and execution flow.",
    explanation: "Topic 1 covers standalone `if` statements, boolean condition evaluation, single-statement vs block execution, and common indentation bugs.",
    hint: "Simple 'if' statement fundamentals.",
    level: "basic",
    codeExample: "// Topic 1: Simple if statement"
  }
];

export default questions;
