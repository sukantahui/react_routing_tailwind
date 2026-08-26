/**
 * Module 001_004: Topic 13: Multiple case labels per branch (case 1, 2, 3 ->)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the syntax for specifying Multiple Case Labels per branch in Java 14+?",
    shortAnswer: "Comma-separated constant values after the `case` keyword: `case CONST_1, CONST_2, CONST_3 -> expression;`.",
    explanation: "Standardized in Java 14 (JEP 361).",
    hint: "case 1, 2, 3 -> expr;",
    level: "basic",
    codeExample: "case 1, 2, 3 -> doAction();"
  },
  {
    question: "What legacy syntax does comma-separated case labeling replace?",
    shortAnswer: "Vertical case stacking (`case 1: case 2: case 3: doAction(); break;`).",
    explanation: "Replaces 4+ vertical lines with a single, highly readable line.",
    hint: "Replaces vertical case stacking.",
    level: "basic",
    codeExample: "// Traditional: case 1: case 2: case 3: -> Modern: case 1, 2, 3 ->"
  },
  {
    question: "How does the Days in Month calculation benefit from comma-separated case labels?",
    shortAnswer: "All 31-day months are grouped onto one clean line (`case 1, 3, 5, 7, 8, 10, 12 -> 31;`) and 30-day months on another (`case 4, 6, 9, 11 -> 30;`).",
    explanation: "Classic computer science example made elegant in modern Java.",
    hint: "31-day months grouped on a single line.",
    level: "basic",
    codeExample: "case 1, 3, 5, 7, 8, 10, 12 -> 31;\ncase 4, 6, 9, 11 -> 30;"
  },
  {
    question: "Can multiple case labels be used with traditional colon syntax in Java 14+ (`case 1, 2, 3:`)?",
    shortAnswer: "Yes! Java 14+ permits comma-separated labels in colon switch statements as well: `case 1, 2, 3: doWork(); break;`.",
    explanation: "Comma-separated labels are supported in both colon and arrow forms in Java 14+.",
    hint: "Supported in both colon and arrow syntax in Java 14+.",
    level: "intermediate",
    codeExample: "case 1, 2, 3:\n    doWork();\n    break;"
  },
  {
    question: "Can a comma-separated case list contain duplicate constants (e.g. `case 1, 2, 1 ->`)?",
    shortAnswer: "No! Duplicate case constants within the same list or across different branches cause a compile-time error: 'duplicate case label'.",
    explanation: "All case constants must be unique.",
    hint: "Duplicate case labels cause compile error.",
    level: "basic",
    codeExample: "// case 1, 2, 1 -> // COMPILER ERROR: duplicate case 1"
  },
  {
    question: "In the Coder & AccoTax Barrackpore schedule router, how are weekdays grouped?",
    shortAnswer: "`case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> \"Regular Lab\";`",
    explanation: "Demonstrates clean enum multi-label grouping.",
    hint: "Groups Monday through Friday into a single branch.",
    level: "basic",
    codeExample: "case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> \"Regular Lab\";"
  },
  {
    question: "What is the maximum number of constants allowed in a comma-separated case list?",
    shortAnswer: "There is no explicit language limit (bounded only by classfile constant pool and method bytecode limits).",
    explanation: "Easily supports dozens of constants in practice.",
    hint: "No practical language limit.",
    level: "intermediate",
    codeExample: "case 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 -> handleRange();"
  },
  {
    question: "Can you combine Strings with different cases in a multi-label branch (`case \"Y\", \"YES\", \"TRUE\", \"1\" -> true;`)?",
    shortAnswer: "Yes! Multi-label String cases provide a very clean user input normalization idiom.",
    explanation: "Replaces complex boolean OR expressions.",
    hint: "Clean user input parsing idiom.",
    level: "basic",
    codeExample: "case \"Y\", \"YES\", \"TRUE\", \"1\" -> true;"
  },
  {
    question: "What bytecode instruction is emitted when multiple sparse integer constants share a branch?",
    shortAnswer: "A `lookupswitch` instruction where multiple distinct key entries point to the SAME jump target label.",
    explanation: "Direct shared jump target in bytecode.",
    hint: "Multiple keys point to the same jump target label.",
    level: "advanced",
    codeExample: "// Bytecode: 1->L1, 3->L1, 5->L1 (shared target)"
  },
  {
    question: "Can you mix different data types in the same comma-separated case list (e.g. `case 1, \"TWO\" ->`)?",
    shortAnswer: "No! All constants in the comma list must be assignable to the switch selector's data type.",
    explanation: "Type consistency is enforced across all case labels.",
    hint: "All constants must match the selector type.",
    level: "basic",
    codeExample: "// case 1, \"A\" -> // COMPILER ERROR: incompatible types"
  },
  {
    question: "Can an enum multi-label switch branch omit the enum type prefix (`case SATURDAY, SUNDAY ->`)?",
    shortAnswer: "Yes! In fact, the enum type prefix MUST be omitted in case labels (`case Day.SATURDAY` is illegal).",
    explanation: "JLS requires unqualified enum constant names.",
    hint: "Use unqualified enum names.",
    level: "basic",
    codeExample: "case SATURDAY, SUNDAY -> \"Weekend\";"
  },
  {
    question: "What is the result of `int m = 6; String q = switch (m) { case 1,2,3 -> \"Q1\"; case 4,5,6 -> \"Q2\"; default -> \"Other\"; };`?",
    shortAnswer: "`q = \"Q2\"`.",
    explanation: "6 matches the second branch (`4, 5, 6`) and returns `\"Q2\"`.",
    hint: "Evaluates to \"Q2\".",
    level: "basic",
    codeExample: "switch (6) { case 4, 5, 6 -> \"Q2\"; }"
  },
  {
    question: "Can a trailing comma be included at the end of a case list (e.g. `case 1, 2, ->`)?",
    shortAnswer: "No! Trailing commas are illegal in case label constant lists.",
    explanation: "Causes a compilation syntax error.",
    hint: "Trailing comma is not allowed.",
    level: "basic",
    codeExample: "// case 1, 2, -> // COMPILER ERROR!"
  },
  {
    question: "Can character literals be grouped with integer constants in a `char` switch (e.g. `case 'A', 'a', 65 ->`)?",
    shortAnswer: "No if 'A' (65) and 65 both appear, because they represent the DUPLICATE value 65 (duplicate case error); but distinct chars and ints like `case 'A', 'B', 67 ->` are legal!",
    explanation: "Char and int literals must evaluate to distinct 16-bit unsigned values.",
    hint: "Legal as long as integer values are not duplicates.",
    level: "intermediate",
    codeExample: "case 'A', 'B', 'C' -> handleLetters();"
  },
  {
    question: "How does multi-label case matching improve performance over an `else-if` ladder with `||`?",
    shortAnswer: "The switch builds a direct jump table where all listed constants jump to the same address in $O(1)$ time, whereas `if (x == 1 || x == 2 || x == 3)` evaluates sequentially.",
    explanation: "Constant-time multi-value dispatch.",
    hint: "Jump table resolves all grouped constants in O(1) time.",
    level: "intermediate",
    codeExample: "// O(1) jump table vs sequential || evaluations"
  },
  {
    question: "Can a multi-label case rule return a collection or object reference?",
    shortAnswer: "Yes! Any valid expression can be returned.",
    explanation: "Full support for reference and object return types.",
    hint: "Can return any object or collection.",
    level: "basic",
    codeExample: "case 1, 2 -> List.of(\"A\", \"B\");"
  },
  {
    question: "What happens if all possible enum values are distributed across multiple multi-label branches?",
    shortAnswer: "The switch expression is exhaustive, and no `default` label is required.",
    explanation: "Compiler validates total enum coverage across the multi-label branches.",
    hint: "Exhaustive if all enum values are covered.",
    level: "intermediate",
    codeExample: "switch (day) { case MON, TUE, WED, THU, FRI -> 1; case SAT, SUN -> 2; } // Exhaustive"
  },
  {
    question: "Can multi-label rules execute multi-statement blocks with curly braces `{ ... }`?",
    shortAnswer: "Yes! `case 1, 2, 3 -> { log(); process(); }` is completely legal.",
    explanation: "Multi-statement bodies are enclosed in braces.",
    hint: "Wrap multi-statement bodies in curly braces {}.",
    level: "basic",
    codeExample: "case 1, 2, 3 -> {\n    log();\n    process();\n}"
  },
  {
    question: "In the Coder & AccoTax Barrackpore tuition batch router, how are quarter months mapped to fees?",
    shortAnswer: "Using `case 1, 2, 3 -> \"Q1: ₹15,000\"; case 4, 5, 6 -> \"Q2: ₹22,000\";` in Indian Rupees (₹).",
    explanation: "Maps quarterly batches to fees.",
    hint: "Quarterly batch mapping in ₹.",
    level: "basic",
    codeExample: "case 1, 2, 3 -> \"Q1: ₹15,000\";"
  },
  {
    question: "What is the result of `char grade = 'B'; String desc = switch (grade) { case 'A', 'B' -> \"Pass with Merit\"; case 'C', 'D' -> \"Pass\"; default -> \"Fail\"; };`?",
    shortAnswer: "`desc = \"Pass with Merit\"`.",
    explanation: "'B' matches the first branch.",
    hint: "Evaluates to \"Pass with Merit\".",
    level: "basic",
    codeExample: "switch ('B') { case 'A', 'B' -> \"Pass with Merit\"; }"
  },
  {
    question: "Can `null` be included in a multi-label list in Java 21 (`case \"A\", \"B\", null ->`)?",
    shortAnswer: "Yes! Java 21 pattern matching permits `null` to be listed alongside other case constants.",
    explanation: "Enhanced null handling in Java 21.",
    hint: "Permitted in Java 21.",
    level: "advanced",
    codeExample: "case \"A\", \"B\", null -> handleGroup();"
  },
  {
    question: "Can constant expressions with arithmetic operators be used in a multi-label list (`case 1 + 1, 3 * 2 ->`)?",
    shortAnswer: "Yes! Any compile-time constant expression (`2`, `6`) is valid in the list.",
    explanation: "Compile-time constant arithmetic is evaluated by the compiler.",
    hint: "Constant math expressions are legal.",
    level: "intermediate",
    codeExample: "case 1 + 1, 2 + 2 -> handleEvens();"
  },
  {
    question: "Why does multi-label case grouping improve code review efficiency?",
    shortAnswer: "It makes intent immediately obvious at a glance and condenses business rules into concise, readable tables.",
    explanation: "Dramatically reduces cognitive load during code reviews.",
    hint: "Reduces visual clutter and makes business rules obvious.",
    level: "basic",
    codeExample: "// Clear tabular grouping"
  },
  {
    question: "What happens if one of the values in a multi-label case list is a non-final variable (`int x = 5; case 1, x ->`)?",
    shortAnswer: "Compilation error: 'constant expression required' for `x`.",
    explanation: "All elements in the comma-separated list must be constants.",
    hint: "All elements must be compile-time constants.",
    level: "basic",
    codeExample: "// case 1, dynVar -> // COMPILER ERROR"
  },
  {
    question: "How does static analysis tooling (e.g. SonarQube) evaluate multi-label branches?",
    shortAnswer: "Linters treat the entire multi-label rule as a single, clean branch with lower cognitive complexity than stacked cases.",
    explanation: "Reduces reported cognitive complexity scores.",
    hint: "Lower cognitive complexity score.",
    level: "intermediate",
    codeExample: "// Lower cognitive complexity"
  },
  {
    question: "Can an HTTP status code classifier be written cleanly with multi-label cases?",
    shortAnswer: "Yes! `case 200, 201, 204 -> \"SUCCESS\"; case 400, 401, 403, 404 -> \"CLIENT_ERROR\"; case 500, 502, 503 -> \"SERVER_ERROR\";`.",
    explanation: "A standard clean HTTP routing idiom.",
    hint: "Clean grouping for HTTP status codes.",
    level: "basic",
    codeExample: "case 200, 201, 204 -> \"SUCCESS\";"
  },
  {
    question: "What is the return type of a switch expression where `case 1, 2 -> 100;` and `case 3, 4 -> 200;`?",
    shortAnswer: "`int` (or `Integer`).",
    explanation: "Both branches return matching integer types.",
    hint: "Inferred as int.",
    level: "basic",
    codeExample: "int fee = switch (code) { case 1, 2 -> 100; default -> 0; };"
  },
  {
    question: "Can multi-label rules throw exceptions directly (`case 404, 500 -> throw new WebException();`)?",
    shortAnswer: "Yes! Throwing an exception from a multi-label branch is valid and applies to all listed cases.",
    explanation: "Throwing exceptions is supported on all arrow branches.",
    hint: "Throwing exceptions is valid for multi-label branches.",
    level: "intermediate",
    codeExample: "case 404, 500 -> throw new WebException();"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 13 for Java developers?",
    shortAnswer: "Multiple case labels per branch (`case 1, 2, 3 ->`) replace ugly vertical case stacking with concise, comma-separated constant lists, improving readability, eliminating fall-through risks, and keeping business rules compact.",
    explanation: "Essential modern Java idiom for grouping related constants.",
    hint: "Use comma-separated case lists (case 1, 2, 3 ->) for concise grouping.",
    level: "basic",
    codeExample: "// Summary: case 1, 2, 3 -> expr; for clean constant grouping"
  },
  {
    question: "What is the next topic (Topic 14) in Module 001_004?",
    shortAnswer: "Using switch as an expression that returns a value.",
    explanation: "Topic 14 explores value-returning switch expressions, exhaustiveness requirements, type inference, and functional assignments.",
    hint: "Using switch as an expression that returns a value.",
    level: "basic",
    codeExample: "// Topic 14: Value-Returning Switch Expressions"
  }
];

export default questions;
