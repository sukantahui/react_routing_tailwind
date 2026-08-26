/**
 * Module 001_004: Topic 7: The 'break' statement in switch-case and understanding intentional vs accidental fall-through
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the function of the `break` statement in a traditional `switch-case` block (JLS §14.15)?",
    shortAnswer: "To immediately terminate execution of the `switch` statement and jump past the closing curly brace `}`.",
    explanation: "Prevents execution from falling through into subsequent case blocks.",
    hint: "Terminates switch execution.",
    level: "basic",
    codeExample: "case 1: doWork(); break;"
  },
  {
    question: "What is 'Fall-Through' in traditional Java switch statements?",
    shortAnswer: "The execution behavior where, after entering a matching case, execution flows linearly into subsequent cases until a `break` or the end of the switch block is reached.",
    explanation: "Inherited from C and C++ syntax semantics.",
    hint: "Execution flows into next cases without break.",
    level: "basic",
    codeExample: "case 1: s1();\ncase 2: s2(); // s2() runs even if case is 1!"
  },
  {
    question: "What is Accidental Fall-Through?",
    shortAnswer: "An unintentional omission of the `break;` statement that causes subsequent cases to execute erroneously, producing severe logic defects.",
    explanation: "One of the most notorious bug patterns in software engineering.",
    hint: "Unintended omission of break causing bugs.",
    level: "basic",
    codeExample: "case 1: deleteRecord(); // Missing break! -> falls into case 2"
  },
  {
    question: "What are the two primary patterns for Intentional Fall-Through?",
    shortAnswer: "1. Multi-Case Grouping (stacking cases that share identical code: `case 1: case 2: break;`); 2. Cumulative Cascading (inheriting privileges from higher to lower tiers).",
    explanation: "Legitimate and clean use cases for fall-through.",
    hint: "Multi-case grouping and cumulative tier cascading.",
    level: "intermediate",
    codeExample: "case 1:\ncase 2:\n    handleBatch();\n    break;"
  },
  {
    question: "How should intentional fall-through be documented in professional code?",
    shortAnswer: "With an explicit comment `// Fall-through intended` or the `@SuppressWarnings(\"fallthrough\")` annotation.",
    explanation: "Suppresses compiler `-Xlint:fallthrough` warnings and informs team members.",
    hint: "Add // Fall-through comment or @SuppressWarnings(\"fallthrough\").",
    level: "intermediate",
    codeExample: "// Fall-through intended\n@SuppressWarnings(\"fallthrough\")"
  },
  {
    question: "In the Coder & AccoTax Barrackpore membership engine, how does cumulative fall-through work?",
    shortAnswer: "A Level 3 Platinum member executes Tier 3 perks (cloud server), then falls through to receive Tier 2 perks (mentorship), and falls through to receive Tier 1 perks (workstation) before breaking.",
    explanation: "Demonstrates cumulative tier benefit cascading in Indian Rupees (₹).",
    hint: "Higher tier inherits all lower tier perks via cascade.",
    level: "basic",
    codeExample: "case 3: perk3();\ncase 2: perk2();\ncase 1: perk1(); break;"
  },
  {
    question: "What compiler flag in `javac` enables warnings for unannotated fall-through?",
    shortAnswer: "`javac -Xlint:fallthrough`.",
    explanation: "Warns developers whenever a case block ends without a `break`, `return`, or `throw`.",
    hint: "-Xlint:fallthrough javac option.",
    level: "advanced",
    codeExample: "// javac -Xlint:fallthrough MyClass.java"
  },
  {
    question: "What is the result of `int x = 2; switch (x) { case 1: print(\"1\"); case 2: print(\"2\"); case 3: print(\"3\"); }`?",
    shortAnswer: "Prints `\"23\"`.",
    explanation: "Matches `case 2`, prints `2`, and falls through into `case 3` to print `3`.",
    hint: "Outputs 23.",
    level: "basic",
    codeExample: "int x = 2;\nswitch (x) { case 1: print(\"1\"); case 2: print(\"2\"); case 3: print(\"3\"); }"
  },
  {
    question: "What is the result of `int x = 1; switch (x) { case 1: print(\"A\"); case 2: print(\"B\"); default: print(\"C\"); }`?",
    shortAnswer: "Prints `\"ABC\"`.",
    explanation: "Enters `case 1` and falls through all remaining cases and the `default` block.",
    hint: "Outputs ABC.",
    level: "basic",
    codeExample: "int x = 1;\nswitch (x) { case 1: print(\"A\"); case 2: print(\"B\"); default: print(\"C\"); }"
  },
  {
    question: "Does the `default` block execute during fall-through if preceding cases omit `break`?",
    shortAnswer: "Yes! If execution falls through to the position where `default` is located, the `default` block executes unconditionally.",
    explanation: "Fall-through does not check case labels or default conditions.",
    hint: "Default runs if preceding case falls through into it.",
    level: "basic",
    codeExample: "case 2: print(\"2\"); default: print(\"D\"); // Prints \"2D\""
  },
  {
    question: "Can a `return` statement be used instead of `break` to terminate a case block?",
    shortAnswer: "Yes! A `return` statement exits both the `switch` block and the enclosing method immediately.",
    explanation: "Often used in value-mapping methods.",
    hint: "return exits both switch and method.",
    level: "basic",
    codeExample: "case 1: return \"MONDAY\";"
  },
  {
    question: "Can a `throw` statement be used instead of `break` to terminate a case block?",
    shortAnswer: "Yes! Throwing an exception terminates normal switch control flow immediately.",
    explanation: "Commonly used in `default` blocks for unsupported inputs.",
    hint: "throw terminates switch on error.",
    level: "basic",
    codeExample: "default: throw new IllegalArgumentException(\"Bad code\");"
  },
  {
    question: "What major innovation did Java 14 introduce to solve the accidental fall-through problem?",
    shortAnswer: "Switch Expressions with Arrow Syntax (`case X -> Y`), which execute ONLY the single statement/block without any fall-through!",
    explanation: "Topic 11 & 12 explore modern arrow switch expressions in depth.",
    hint: "Java 14 arrow switch syntax (case ->) eliminates fall-through.",
    level: "basic",
    codeExample: "case 1 -> doAction(); // Zero fall-through!"
  },
  {
    question: "What bytecode instruction does `break` translate to inside a switch statement?",
    shortAnswer: "An unconditional `goto` instruction targeting the instruction immediately after the switch block.",
    explanation: "Direct jump to exit label.",
    hint: "goto instruction to switch exit label.",
    level: "advanced",
    codeExample: "// Bytecode: goto L_EXIT"
  },
  {
    question: "Can a Labeled `break` be used to break out of an outer loop from inside a switch statement?",
    shortAnswer: "Yes! `break LABEL_NAME;` breaks out of the enclosing labeled loop directly from inside a switch block.",
    explanation: "Extremely useful when a switch is embedded inside a `while` or `for` loop.",
    hint: "break label; exits the labeled outer loop.",
    level: "intermediate",
    codeExample: "OUTER_LOOP: while (true) {\n    switch (cmd) {\n        case \"EXIT\": break OUTER_LOOP;\n    }\n}"
  },
  {
    question: "What happens if a simple un-labeled `break;` is executed inside a switch that is inside a loop?",
    shortAnswer: "It terminates ONLY the inner `switch` statement; the enclosing loop continues running!",
    explanation: "A simple break binds to the innermost switch or loop.",
    hint: "Breaks only the switch, not the loop.",
    level: "basic",
    codeExample: "while (true) {\n    switch (x) { case 1: break; } // Breaks switch only!\n}"
  },
  {
    question: "What is the result of `int x = 5; switch (x) { default: print(\"D\"); case 1: print(\"1\"); case 2: print(\"2\"); }`?",
    shortAnswer: "Prints `\"D12\"`!",
    explanation: "No case matches 5, so control jumps to `default`, prints `D`, and falls through into `case 1` and `case 2`!",
    hint: "Jumps to default, then falls through into subsequent cases!",
    level: "intermediate",
    codeExample: "int x = 5;\nswitch (x) { default: print(\"D\"); case 1: print(\"1\"); case 2: print(\"2\"); }"
  },
  {
    question: "Why should `default` generally be placed at the bottom of the switch block?",
    shortAnswer: "To prevent accidental fall-through into subsequent `case` blocks if `break` is omitted on `default`.",
    explanation: "Topic 8 covers default placement best practices.",
    hint: "Placing default at bottom prevents fall-through into cases.",
    level: "basic",
    codeExample: "// Best practice: put default at the end"
  },
  {
    question: "Can multiple case labels be comma-separated in traditional Java switch (`case 1, 2, 3:`) before Java 14?",
    shortAnswer: "No! Comma-separated case labels (`case 1, 2, 3:`) were only introduced in Java 14. In traditional switch, they had to be stacked vertically.",
    explanation: "Traditional switch required stacked `case 1: case 2:` labels.",
    hint: "Comma-separated cases are a Java 14+ feature.",
    level: "intermediate",
    codeExample: "// Traditional: case 1: case 2: case 3: doWork(); break;"
  },
  {
    question: "What is the effect of having an empty `case` label before another `case` label (`case 1: case 2: doAction(); break;`)?",
    shortAnswer: "Both `case 1` and `case 2` execute `doAction();`.",
    explanation: "Multi-case stacking is the standard idiomatic way to share code in traditional switch.",
    hint: "Both cases share the same action.",
    level: "basic",
    codeExample: "case 1:\ncase 2:\n    processPair();\n    break;"
  },
  {
    question: "What is the result of `int x = 3; switch (x) { case 1: case 2: case 3: print(\"Hit\"); break; }`?",
    shortAnswer: "Prints `\"Hit\"`.",
    explanation: "Matches `case 3`, executes `print(\"Hit\")`, and breaks.",
    hint: "Prints Hit.",
    level: "basic",
    codeExample: "int x = 3; switch (x) { case 1: case 2: case 3: print(\"Hit\"); break; }"
  },
  {
    question: "Can `continue` be used inside a switch statement that is NOT inside a loop?",
    shortAnswer: "No! `continue` is only legal inside iteration loops (`for`, `while`, `do-while`).",
    explanation: "Causes a compilation error: 'continue outside of loop'.",
    hint: "continue is only valid inside loops.",
    level: "basic",
    codeExample: "// switch (x) { case 1: continue; } // COMPILER ERROR!"
  },
  {
    question: "What does `continue` do when used inside a switch statement that IS inside a loop?",
    shortAnswer: "It skips the rest of the current loop iteration and advances the enclosing loop to the next cycle.",
    explanation: "Targets the enclosing loop directly.",
    hint: "Advances the enclosing loop to next iteration.",
    level: "intermediate",
    codeExample: "for (int i=0; i<5; i++) {\n    switch (i) { case 2: continue; }\n}"
  },
  {
    question: "Why do modern linting tools like SonarQube flag missing `break` statements as 'Major Code Smells'?",
    shortAnswer: "Because missing `break` statements are statistically responsible for critical production outages and security bypass bugs.",
    explanation: "Linters enforce explicit break or @SuppressWarnings.",
    hint: "High correlation with production defects.",
    level: "basic",
    codeExample: "// Linter flags missing break as Major Code Smell"
  },
  {
    question: "What happens if the last statement in the very last `case` block of a switch omits `break;`?",
    shortAnswer: "Execution simply reaches the end of the switch block and exits cleanly, but omitting `break` on the last case is still discouraged to prevent bugs when new cases are appended later.",
    explanation: "Defensive coding best practice.",
    hint: "Exits cleanly, but best practice is to always include break.",
    level: "intermediate",
    codeExample: "default: handleDefault(); break; // Defensive break"
  },
  {
    question: "What is the result of `int x = 1; switch (x) { case 1: { int y = 10; print(y); } case 2: print(\"Two\"); }`?",
    shortAnswer: "Prints `\"10Two\"`.",
    explanation: "Curly braces `{}` isolate variable scope, but do NOT stop execution fall-through! A `break;` is still required.",
    hint: "Braces isolate variable scope, but do NOT stop fall-through!",
    level: "expert",
    codeExample: "case 1: { int y = 10; print(y); } // Still falls into case 2 without break!"
  },
  {
    question: "How do you calculate days in a month using intentional switch fall-through?",
    shortAnswer: "Stack all 31-day months (`case 1: case 3: case 5: case 7: case 8: case 10: case 12: days = 31; break;`), stack 30-day months (`case 4: case 6: case 9: case 11: days = 30; break;`), and handle February separately (`case 2: days = isLeap ? 29 : 28; break;`).",
    explanation: "Classic computer science switch pattern.",
    hint: "Stack months with identical day counts.",
    level: "intermediate",
    codeExample: "case 1: case 3: case 5: days = 31; break;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student portal, why are weekend workshops grouped together?",
    shortAnswer: "By stacking `case \"SATURDAY\": case \"SUNDAY\": workshop(); break;`, both days share identical project workshop routines in Indian Rupees (₹).",
    explanation: "Demonstrates clean multi-case grouping.",
    hint: "Stacking weekend days to share code.",
    level: "basic",
    codeExample: "case \"SATURDAY\": case \"SUNDAY\": workshop(); break;"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 7 for Java developers?",
    shortAnswer: "The `break` statement is essential for preventing accidental fall-through bugs in traditional switch; intentional fall-through should be documented clearly, multi-case stacking should be used for shared code, and modern Java 14+ arrow switch should be preferred where available.",
    explanation: "Mastering break mechanics prevents critical routing bugs.",
    hint: "Use break to stop fall-through; stack cases for intentional grouping.",
    level: "basic",
    codeExample: "// Summary: Always break; stack cases for grouping; use Java 14+ arrow switch"
  },
  {
    question: "What is the next topic (Topic 8) in Module 001_004?",
    shortAnswer: "The 'default' case and placement best practices.",
    explanation: "Topic 8 explores the `default` label, fallback handling, positioning semantics, and defensive exception throwing.",
    hint: "The 'default' case and placement best practices.",
    level: "basic",
    codeExample: "// Topic 8: The 'default' case"
  }
];

export default questions;
