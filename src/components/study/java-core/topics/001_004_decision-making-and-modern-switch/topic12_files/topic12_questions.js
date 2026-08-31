/**
 * Module 001_004: Topic 12: Elimination of fall-through in arrow switch expressions
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "Why was fall-through eliminated in Java 14+ arrow switch expressions?",
    shortAnswer: "To prevent accidental fall-through bugs, which historically caused catastrophic logic defects and security privilege escalation bugs.",
    explanation: "Eliminates the #1 source of switch-related bugs in enterprise code.",
    hint: "Prevents accidental logic and security bugs.",
    level: "basic",
    codeExample: "case STUDENT → grantStudentAccess(); // Zero fall-through!"
  },
  {
    question: "How does the Java compiler enforce zero fall-through in arrow switch?",
    shortAnswer: "By automatically emitting an unconditional jump (`goto L_EXIT`) after every arrow branch body, ensuring control immediately exits the switch.",
    explanation: "Enforced at the grammar and bytecode compiler level.",
    hint: "Emits unconditional goto L_EXIT after every arrow branch.",
    level: "intermediate",
    codeExample: "// Bytecode: goto L_EXIT after each arrow branch"
  },
  {
    question: "How do you share code across multiple cases in arrow switch without fall-through?",
    shortAnswer: "Use comma-separated case labels: `case 1, 2, 3 → executeCommonAction();`.",
    explanation: "Topic 13 covers multiple case labels per branch in detail.",
    hint: "Use comma-separated case labels (case 1, 2, 3 ->).",
    level: "basic",
    codeExample: "case 1, 2, 3 → doCommonWork();"
  },
  {
    question: "Can you intentionally fall through from one arrow branch to another in Java?",
    shortAnswer: "No! Fall-through is syntactically impossible between arrow branches (`case X ->`).",
    explanation: "If intentional cascading is required, you must use traditional colon syntax or explicit helper method calls.",
    hint: "Fall-through is impossible between arrow branches.",
    level: "basic",
    codeExample: "// Arrow branches are strictly isolated"
  },
  {
    question: "What happens if a developer writes `break;` inside an arrow switch branch (`case 1 → { print(\"A\"); break; }`)?",
    shortAnswer: "Compilation error: `break` cannot be used to complete an arrow rule.",
    explanation: "Arrow branches terminate automatically without `break`.",
    hint: "break is illegal inside arrow rules.",
    level: "intermediate",
    codeExample: "// case 1 → { break; } // COMPILER ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore security gateway, how does arrow switch prevent privilege leaks?",
    shortAnswer: "By ensuring that when a student logs in (`case STUDENT → ...`), execution completes immediately without falling into `SYSTEM_ADMIN` routines in Indian Rupees (₹).",
    explanation: "Enforces strict authorization boundaries.",
    hint: "Guarantees student role never falls into admin code.",
    level: "basic",
    codeExample: "case STUDENT → grantStudentAccess();\ncase ADMIN → grantAdminAccess();"
  },
  {
    question: "What is the difference between multi-case stacking in colon syntax and comma-separated labels in arrow syntax?",
    shortAnswer: "Colon syntax stacked cases relied on intentional fall-through (`case 1: case 2: break;`); arrow syntax lists cases in a single atomic rule (`case 1, 2 ->`) with zero fall-through.",
    explanation: "Syntactic elegance and grammatical safety.",
    hint: "Stacked cases with fall-through vs atomic comma-separated rule.",
    level: "basic",
    codeExample: "case 1, 2 → doAction();"
  },
  {
    question: "What happens if an arrow branch executes an expression that throws a runtime exception?",
    shortAnswer: "The exception propagates immediately out of the switch, terminating normal execution.",
    explanation: "Standard exception unwinding behavior.",
    hint: "Exception propagates out of switch immediately.",
    level: "basic",
    codeExample: "default → throw new IllegalStateException(\"Invalid\");"
  },
  {
    question: "Can an arrow branch return early from the enclosing method using `return`?",
    shortAnswer: "Yes! In a switch statement with a block body (`case 1 → { return; }`), `return` exits the enclosing method immediately.",
    explanation: "Valid in statement switches with block bodies.",
    hint: "return exits the enclosing method.",
    level: "intermediate",
    codeExample: "case 1 → { log(); return; }"
  },
  {
    question: "Why does arrow switch eliminate the need for `@SuppressWarnings(\"fallthrough\")` annotations?",
    shortAnswer: "Because the compiler knows that arrow rules never fall through, so no fall-through warnings are ever produced.",
    explanation: "Clean build logs with zero suppression annotations.",
    hint: "No fall-through warnings are produced for arrow rules.",
    level: "basic",
    codeExample: "// Zero fall-through compiler warnings"
  },
  {
    question: "What is the result of `int x = 1; switch (x) { case 1 → print(\"1\"); case 2 → print(\"2\"); }`?",
    shortAnswer: "Prints `\"1\"` ONLY.",
    explanation: "Zero fall-through guarantees `case 2` is never executed.",
    hint: "Prints 1 only.",
    level: "basic",
    codeExample: "int x = 1; switch (x) { case 1 → print(\"1\"); case 2 → print(\"2\"); } // \"1\""
  },
  {
    question: "Can an arrow branch have an empty block (`case 1 → { }`)?",
    shortAnswer: "Yes! Represents an explicit no-operation branch for that case.",
    explanation: "Clean and readable no-op handling.",
    hint: "Empty block {} represents an explicit no-op.",
    level: "basic",
    codeExample: "case IGNORE → { /* No action needed */ }"
  },
  {
    question: "What is the evaluated value of `String s = switch (2) { case 1 → \"A\"; case 2 → \"B\"; default → \"C\"; };`?",
    shortAnswer: "`s = \"B\"`.",
    explanation: "Direct assignment without intermediate fall-through.",
    hint: "Evaluates to \"B\".",
    level: "basic",
    codeExample: "String s = switch (2) { case 1 → \"A\"; case 2 → \"B\"; default → \"C\"; };"
  },
  {
    question: "How does the removal of fall-through affect code refactoring and maintenance?",
    shortAnswer: "Developers can safely reorder, insert, or delete case branches without fear of breaking adjacent cases.",
    explanation: "Complete branch decoupling and independence.",
    hint: "Cases can be safely reordered or modified independently.",
    level: "intermediate",
    codeExample: "// Cases are completely decoupled"
  },
  {
    question: "Can you use `continue` inside an arrow switch embedded within a loop?",
    shortAnswer: "Yes! `continue;` inside an arrow branch skips to the next iteration of the enclosing loop.",
    explanation: "Because there is no switch-level break ambiguity.",
    hint: "continue advances enclosing loop.",
    level: "intermediate",
    codeExample: "for (int x : list) { switch (x) { case 0 → continue; } }"
  },
  {
    question: "What happens if you have an arrow switch inside a loop and use a labeled break (`break LOOP;`) inside a block?",
    shortAnswer: "It terminates the enclosing labeled loop directly.",
    explanation: "Labeled breaks remain legal for outer loop control.",
    hint: "Labeled break exits enclosing loop.",
    level: "intermediate",
    codeExample: "case \"EXIT\" → { break OUTER_LOOP; }"
  },
  {
    question: "Why did language designers keep traditional colon syntax in Java 14+ instead of deprecating it?",
    shortAnswer: "For backward compatibility with billions of lines of legacy Java code written over the past 25 years.",
    explanation: "Java guarantees long-term backward compatibility.",
    hint: "Maintains backward compatibility with legacy code.",
    level: "intermediate",
    codeExample: "// Legacy colon switch remains valid"
  },
  {
    question: "In code reviews, when should you reject traditional colon switch in favor of arrow switch?",
    shortAnswer: "Whenever writing new code or refactoring existing discrete dispatchers in Java 14+ environments.",
    explanation: "Modern code review standard across major enterprise codebases.",
    hint: "Always prefer arrow switch for new Java 14+ code.",
    level: "basic",
    codeExample: "// Prefer arrow switch in modern codebases"
  },
  {
    question: "What is the result of `int val = switch (\"TEST\") { case \"A\", \"B\" → 1; case \"TEST\" → 2; default → 3; };`?",
    shortAnswer: "`val = 2`.",
    explanation: "Matches `\"TEST\"` and immediately returns `2`.",
    hint: "Evaluates to 2.",
    level: "basic",
    codeExample: "int val = switch (\"TEST\") { case \"A\", \"B\" → 1; case \"TEST\" → 2; default → 3; };"
  },
  {
    question: "Can local variables declared inside `case 1 → { int x = 10; }` be accessed in `case 2 → { int x = 20; }`?",
    shortAnswer: "No! Each arrow block has its own isolated lexical scope; they cannot access each other's local variables, nor do they conflict in name.",
    explanation: "Complete scope isolation.",
    hint: "Completely isolated block scopes.",
    level: "intermediate",
    codeExample: "case 1 → { int x = 10; }\ncase 2 → { int x = 20; } // Both valid and isolated"
  },
  {
    question: "What is the cyclomatic complexity of a switch statement with 4 arrow branches?",
    shortAnswer: "4 (plus 1 for base method path = 5 total).",
    explanation: "Standard branch complexity measurement.",
    hint: "Each arrow branch adds 1 to cyclomatic complexity.",
    level: "advanced",
    codeExample: "// 4 arrow rules = 4 branches"
  },
  {
    question: "What is the impact of zero fall-through on unit test coverage?",
    shortAnswer: "Unit tests are simpler and more deterministic because every case is fully isolated and does not depend on tests for adjacent cases.",
    explanation: "Improves testability and eliminates side-effect couplings.",
    hint: "Fully isolated cases simplify unit testing.",
    level: "intermediate",
    codeExample: "// Each branch can be unit tested independently"
  },
  {
    question: "In the Coder & AccoTax Barrackpore billing engine, how are quarter months grouped safely?",
    shortAnswer: "Using `case 1, 2, 3 → \"Q1: ₹15,000\"; case 4, 5, 6 → \"Q2: ₹22,000\";` with zero risk of quarterly bleed-through in Indian Rupees (₹).",
    explanation: "Demonstrates safe quarterly billing grouping.",
    hint: "Comma-separated month lists for billing quarters in ₹.",
    level: "basic",
    codeExample: "case 1, 2, 3 → \"Q1: ₹15,000\";"
  },
  {
    question: "Can an arrow switch expression be formatted on a single line if short?",
    shortAnswer: "Yes! E.g. `boolean isWeekend = switch (day) { case SAT, SUN → true; default → false; };`.",
    explanation: "Extremely compact and readable.",
    hint: "Single-line formatting is supported for concise rules.",
    level: "basic",
    codeExample: "int code = switch (c) { case 'A' → 1; default → 0; };"
  },
  {
    question: "What happens if a switch statement without return values uses arrow syntax with block bodies?",
    shortAnswer: "The block executes and execution immediately leaves the switch block after the last statement in the block.",
    explanation: "Zero fall-through applies to block bodies as well.",
    hint: "Block executes and exits switch immediately.",
    level: "basic",
    codeExample: "case 1 → { step1(); step2(); } // Exits switch immediately!"
  },
  {
    question: "How does the HotSpot JIT compiler optimize arrow switch branches?",
    shortAnswer: "Since arrow branches are strictly isolated with no complex fall-through graph edges, the JIT compiler can optimize each branch with inline caching and dead-code elimination more aggressively.",
    explanation: "Simpler control flow graph enables better JIT optimization.",
    hint: "Simpler control flow graph enhances JIT compiler optimizations.",
    level: "advanced",
    codeExample: "// JIT optimizes decoupled branch graphs"
  },
  {
    question: "Can an arrow branch call a `void` method in a switch statement?",
    shortAnswer: "Yes! `case 1 → doVoidMethod();` is completely valid in a switch statement.",
    explanation: "Valid in statement switch context.",
    hint: "Valid in statement switch.",
    level: "basic",
    codeExample: "switch (cmd) { case \"PRINT\" → printDoc(); }"
  },
  {
    question: "Can an arrow branch call a `void` method in a switch expression?",
    shortAnswer: "No! A switch expression requires every branch to produce a value of compatible type; a `void` method does not produce a value (causes a compile error).",
    explanation: "Switch expressions must yield non-void values.",
    hint: "Switch expressions cannot call void methods as return expressions.",
    level: "intermediate",
    codeExample: "// int x = switch (c) { case 1 → voidMethod(); }; // COMPILER ERROR"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 12 for Java developers?",
    shortAnswer: "The elimination of fall-through in arrow switch expressions guarantees strict branch isolation, removes missing-break vulnerabilities, simplifies maintenance, and enables safe multi-label sharing (`case A, B ->`).",
    explanation: "Core architectural safeguard of modern Java.",
    hint: "Arrow syntax eliminates fall-through and prevents missing-break vulnerabilities.",
    level: "basic",
    codeExample: "// Summary: case A, B → expr; (Strictly isolated, zero fall-through)"
  },
  {
    question: "What is the next topic (Topic 13) in Module 001_004?",
    shortAnswer: "Multiple case labels per branch (case 1, 2, 3 ->).",
    explanation: "Topic 13 explores comma-separated case lists, grouping syntax, performance, and best practices.",
    hint: "Multiple case labels per branch.",
    level: "basic",
    codeExample: "// Topic 13: Multiple case labels per branch"
  }
];

export default questions;
