/**
 * Module 001_004: Topic 4: 'else-if' ladder for multi-branch evaluations
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an 'else-if' ladder in Java?",
    shortAnswer: "A multi-way decision structure that evaluates a sequence of conditions from top to bottom, executing the first block whose condition is true and bypassing the rest.",
    explanation: "Standard structure for classifying numbers into ranges, grades, or tax brackets.",
    hint: "Sequential multi-branch decision ladder.",
    level: "basic",
    codeExample: "if (c1) { ... } else if (c2) { ... } else { ... }"
  },
  {
    question: "How does the execution flow proceed through an 'else-if' ladder?",
    shortAnswer: "Top-to-bottom. As soon as ONE condition evaluates to `true`, its corresponding block executes, and all remaining `else if` and `else` blocks are immediately skipped.",
    explanation: "Only the first matching branch ever executes.",
    hint: "Stops at the first true condition.",
    level: "basic",
    codeExample: "if (score >= 90) { grade = \"A\"; }\nelse if (score >= 80) { grade = \"B\"; }"
  },
  {
    question: "What happens if NONE of the conditions in an 'else-if' ladder evaluate to `true`?",
    shortAnswer: "The final `else` fallback block executes (if present); if no `else` is provided, nothing in the ladder executes.",
    explanation: "The trailing `else` acts as the default catch-all branch.",
    hint: "The final else block executes as a fallback.",
    level: "basic",
    codeExample: "else { grade = \"F\"; // Catch-all fallback }"
  },
  {
    question: "Why is Condition Ordering crucial in an 'else-if' ladder?",
    shortAnswer: "Because conditions are evaluated sequentially; placing a broader/lower threshold first will prematurely match higher values, starving the more specific branches.",
    explanation: "If `if (score >= 40)` is first, a mark of `95` matches it and never reaches `else if (score >= 90)`.",
    hint: "Must order from most specific (highest threshold) to least specific.",
    level: "basic",
    codeExample: "// INCORRECT:\nif (score >= 40) pass();\nelse if (score >= 90) honors(); // NEVER REACHED!"
  },
  {
    question: "How should numerical range checks (e.g. grading A, B, C, D, F) be ordered in an 'else-if' ladder?",
    shortAnswer: "In descending order (highest score first: $\ge 90$, then $\ge 80$, then $\ge 70$, etc.) or ascending order with upper bounds ($\le 40$, $\le 60$, etc.).",
    explanation: "Prevents broader criteria from shadowing narrower criteria.",
    hint: "Descending order from highest to lowest.",
    level: "basic",
    codeExample: "if (score >= 90) { } else if (score >= 80) { } else if (score >= 70) { }"
  },
  {
    question: "What is the time complexity of evaluating an 'else-if' ladder with $N$ branches?",
    shortAnswer: "$O(N)$ linear time in the worst case (checks every condition sequentially).",
    explanation: "Compared to a compiled `switch` statement with jump table which can achieve $O(1)$ constant time.",
    hint: "O(N) sequential condition checks.",
    level: "intermediate",
    codeExample: "// Checks up to N conditions one by one"
  },
  {
    question: "In the Coder & AccoTax Barrackpore tax calculator, how does the 'else-if' ladder compute income tax slabs?",
    shortAnswer: "By progressively evaluating annual income against Indian tax brackets (0% up to ₹3L, 5% for ₹3L-₹6L, 10% for ₹6L-₹9L, up to 30% above ₹15L).",
    explanation: "Demonstrates progressive financial tax slab calculations in Indian Rupees (₹).",
    hint: "Income tax slab categorization in ₹.",
    level: "basic",
    codeExample: "if (income <= 300000) tax = 0;\nelse if (income <= 600000) tax = ...;"
  },
  {
    question: "Can an 'else-if' ladder check non-numeric conditions (e.g. Strings, booleans, objects)?",
    shortAnswer: "Yes! Unlike traditional switch (which has type restrictions), an `else-if` ladder can evaluate any arbitrary boolean expression.",
    explanation: "Great flexibility for disparate complex conditions.",
    hint: "Can evaluate any boolean expression.",
    level: "basic",
    codeExample: "if (role.equals(\"ADMIN\")) { } else if (user.isGuest()) { }"
  },
  {
    question: "Is the final `else` block mandatory in an 'else-if' ladder?",
    shortAnswer: "No, the trailing `else` is optional, but strongly recommended in production to handle edge cases or invalid inputs.",
    explanation: "Omitting `else` means no action is taken if all conditions fail.",
    hint: "Optional, but recommended for fallback safety.",
    level: "basic",
    codeExample: "if (c1) { } else if (c2) { } // Valid without final else"
  },
  {
    question: "How does the Java compiler translate an 'else-if' ladder into bytecode?",
    shortAnswer: "As a cascade of conditional jumps (`ifeq`, `if_icmpne`); each branch body ends with a `goto` pointing to the common exit label.",
    explanation: "Sequential forward jump chain.",
    hint: "Cascade of conditional jumps and gotos.",
    level: "advanced",
    codeExample: "// Bytecode: ifeq L1 ... goto L_EXIT ... L1: ifeq L2 ... goto L_EXIT"
  },
  {
    question: "What happens if multiple conditions in an 'else-if' ladder are simultaneously true?",
    shortAnswer: "ONLY the FIRST condition that is true executes; all subsequent true conditions are ignored.",
    explanation: "Mutual exclusivity of the ladder.",
    hint: "Only the first true condition executes.",
    level: "basic",
    codeExample: "int x = 10;\nif (x > 5) print(\"A\"); // Prints \"A\"\nelse if (x > 8) print(\"B\"); // Skipped!"
  },
  {
    question: "What is the difference between multiple independent `if` statements and an `else-if` ladder?",
    shortAnswer: "Multiple `if` statements evaluate ALL conditions independently and can execute multiple blocks; an `else-if` ladder stops at the first match.",
    explanation: "Sequential independent vs mutually exclusive.",
    hint: "Independent if checks all; else-if stops at first match.",
    level: "basic",
    codeExample: "// Multiple if: both can execute\nif (x > 5) a();\nif (x > 8) b();"
  },
  {
    question: "What is the result of `int score = 85; if (score > 90) s = \"A\"; else if (score > 80) s = \"B\"; else s = \"C\";`?",
    shortAnswer: "`s = \"B\"`.",
    explanation: "`85 > 90` is false, `85 > 80` is true, so branch `B` executes.",
    hint: "Evaluates to B.",
    level: "basic",
    codeExample: "int score = 85;\n// Matches 'score > 80' → \"B\""
  },
  {
    question: "When should you prefer a `switch` statement over an `else-if` ladder?",
    shortAnswer: "When testing a single discrete variable against constant values (integers, strings, enums) rather than evaluating complex range inequalities.",
    explanation: "Switch provides better readability and $O(1)$ performance for discrete values.",
    hint: "Use switch for discrete constants, else-if for ranges and inequalities.",
    level: "basic",
    codeExample: "switch (dayOfWeek) { case 1 → \"Mon\"; ... }"
  },
  {
    question: "What is the result of `int n = 0; if (n > 0) print(\"+\"); else if (n < 0) print(\"-\"); else print(\"0\");`?",
    shortAnswer: "Prints `\"0\"`.",
    explanation: "`0 > 0` is false, `0 < 0` is false, fallback `else` executes.",
    hint: "Prints 0.",
    level: "basic",
    codeExample: "int n = 0;\n// Fallback else runs → \"0\""
  },
  {
    question: "Can an 'else-if' ladder have 50 `else if` branches?",
    shortAnswer: "Yes, syntactically legal, but a severe code smell indicating the need for polymorphism, a Map lookup table, or Strategy Pattern.",
    explanation: "Huge ladders are hard to maintain and have $O(N)$ execution cost.",
    hint: "Legal, but replace with Map or Strategy pattern.",
    level: "intermediate",
    codeExample: "// Use Map<String, Command> instead of 50 else-if branches"
  },
  {
    question: "What is the effect of placing the most frequent branch at the top of an 'else-if' ladder?",
    shortAnswer: "Optimizes runtime performance by satisfying the condition on the first test, minimizing CPU branch evaluations.",
    explanation: "Branch probability ordering optimization.",
    hint: "Reduces condition evaluations for common cases.",
    level: "intermediate",
    codeExample: "// Place 90% common case as the first if condition"
  },
  {
    question: "What is the result of `if (a == 1) x = 10; else if (a == 2) x = 20; else x = 30;` with Definite Assignment?",
    shortAnswer: "`x` is definitely assigned because all branches (including the trailing `else`) assign `x`.",
    explanation: "Compiler guarantees initialization.",
    hint: "Definitely assigned across all branches.",
    level: "intermediate",
    codeExample: "int x;\nif (a == 1) x = 10; else if (a == 2) x = 20; else x = 30;\nSystem.out.println(x); // Safe!"
  },
  {
    question: "What happens if the trailing `else` is omitted in the previous question (`int x; if (a == 1) x = 10; else if (a == 2) x = 20;`)?",
    shortAnswer: "Compilation error: `x` might not have been initialized.",
    explanation: "Because if `a` is 3, neither branch executes, leaving `x` unassigned.",
    hint: "Variable might not be initialized without trailing else.",
    level: "intermediate",
    codeExample: "int x;\nif (a == 1) x = 10; else if (a == 2) x = 20;\n// System.out.println(x); // COMPILER ERROR"
  },
  {
    question: "Can an `else if` condition test multiple variables (e.g. `else if (age >= 18 && hasVoterId)`)?",
    shortAnswer: "Yes, conditions can be arbitrary composite boolean expressions.",
    explanation: "Full support for relational and logical operators.",
    hint: "Can combine multiple variables with logical operators.",
    level: "basic",
    codeExample: "else if (age >= 18 && hasVoterId) { }"
  },
  {
    question: "What is a 'Fall-Through' in an 'else-if' ladder?",
    shortAnswer: "There is NO fall-through in an `else-if` ladder; exactly one branch executes.",
    explanation: "Fall-through only exists in traditional switch-case statements.",
    hint: "No fall-through in else-if ladders.",
    level: "basic",
    codeExample: "// Unlike switch, else-if never falls through"
  },
  {
    question: "What is the result of `int val = 25; if (val < 10) print(\"A\"); else if (val < 20) print(\"B\"); else if (val < 30) print(\"C\"); else print(\"D\");`?",
    shortAnswer: "Prints `\"C\"`.",
    explanation: "`25 < 10` is false; `25 < 20` is false; `25 < 30` is true, so branch `C` executes.",
    hint: "Prints C.",
    level: "basic",
    codeExample: "int val = 25;\n// Matches 'val < 30' → \"C\""
  },
  {
    question: "How do you refactor an 'else-if' ladder matching string commands into a Map?",
    shortAnswer: "`Map<String, Runnable> handlers = Map.of(\"START\", this::start, \"STOP\", this::stop); handlers.getOrDefault(cmd, this::fallback).run();`",
    explanation: "Provides $O(1)$ constant-time dispatch and clean extensibility.",
    hint: "Map lookup provides O(1) command routing.",
    level: "advanced",
    codeExample: "commands.get(action).execute();"
  },
  {
    question: "What is the recommended maximum number of `else if` branches before refactoring?",
    shortAnswer: "Generally 3 to 5 branches. More than 5 should be considered for switch or map dispatch.",
    explanation: "Improves readability and testing maintainability.",
    hint: "Keep to 3-5 branches max.",
    level: "basic",
    codeExample: "// Keep ladders compact and readable"
  },
  {
    question: "What is the result of `if (false) print(\"1\"); else if (false) print(\"2\"); else if (true) print(\"3\"); else print(\"4\");`?",
    shortAnswer: "Prints `\"3\"`.",
    explanation: "First two are false, third is true.",
    hint: "Prints 3.",
    level: "basic",
    codeExample: "if (false) print(\"1\"); else if (false) print(\"2\"); else if (true) print(\"3\"); // 3"
  },
  {
    question: "Can an `else if` branch contain nested loops or methods?",
    shortAnswer: "Yes, any valid Java statement or block can be placed inside an `else if` branch body.",
    explanation: "No restrictions on branch body statements.",
    hint: "Any valid Java code can go inside branch bodies.",
    level: "basic",
    codeExample: "else if (needsLoop) { for (int i=0; i<10; i++) { } }"
  },
  {
    question: "What is the difference between `else if` and `elif` in programming languages?",
    shortAnswer: "In Java, `else if` is two separate keywords (`else` followed by `if`); Python uses `elif`, and Shell uses `elif`.",
    explanation: "Java does not have an `elif` keyword.",
    hint: "Java uses two separate keywords: else if.",
    level: "basic",
    codeExample: "// Java: else if (condition)"
  },
  {
    question: "Why should duplicate condition checks across branches be avoided?",
    shortAnswer: "Duplicate conditions waste CPU cycles and create dead code branches that can never execute.",
    explanation: "E.g., `if (x > 5) ... else if (x > 5)`.",
    hint: "Second duplicate condition is unreachable dead code.",
    level: "basic",
    codeExample: "// Anti-pattern: duplicate condition check"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 4 for Java developers?",
    shortAnswer: "The `else-if` ladder is the standard tool for sequential multi-branch range evaluations; always order conditions from most specific (highest threshold) to least specific, provide a trailing `else` fallback, and keep branches concise.",
    explanation: "Mastering condition ordering prevents subtle range classification defects.",
    hint: "Order highest to lowest; provide fallback else.",
    level: "basic",
    codeExample: "// Summary: if → else if → else if → else (ordered highest to lowest)"
  },
  {
    question: "What is the next topic (Topic 5) in Module 001_004?",
    shortAnswer: "Combining complex boolean conditions using &&, ||, and !.",
    explanation: "Topic 5 explores composite decision predicates, De Morgan's laws, short-circuit guard patterns, and boolean algebra simplification.",
    hint: "Combining complex boolean conditions.",
    level: "basic",
    codeExample: "// Topic 5: Combining Boolean Conditions (&&, ||, !)"
  }
];

export default questions;
