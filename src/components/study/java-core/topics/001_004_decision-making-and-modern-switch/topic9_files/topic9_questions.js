/**
 * Module 001_004: Topic 9: Comparing 'switch' vs 'else-if' ladder: readability, jump tables, and performance
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the primary difference in purpose between `switch` and an `else-if` ladder in Java?",
    shortAnswer: "`switch` is specialized for matching a single variable against discrete constant values; `else-if` is a general-purpose structure for range inequalities, floating-point math, and complex composite conditions.",
    explanation: "Core distinction in Java language design.",
    hint: "switch matches discrete constants; else-if evaluates general boolean expressions.",
    level: "basic",
    codeExample: "// switch (day) vs if (score >= 90)"
  },
  {
    question: "How does the JVM execute a dense integer `switch` statement compared to an `else-if` ladder?",
    shortAnswer: "The JVM compiles dense integer switches into a `tableswitch` instruction ($O(1)$ constant-time direct indexed jump), whereas an `else-if` ladder executes as an $O(N)$ sequence of conditional jump comparisons.",
    explanation: "Fundamental architectural performance difference.",
    hint: "tableswitch provides O(1) direct address jumps.",
    level: "intermediate",
    codeExample: "// tableswitch vs sequence of ifeq jumps"
  },
  {
    question: "When is an `else-if` ladder MANDATORY over a `switch` statement?",
    shortAnswer: "When testing numeric ranges (`x >= 10 && x <= 20`), floating-point variables (`double`/`float`), `long` values (in traditional switch), `boolean` logic, or when conditions involve multiple different variables.",
    explanation: "Traditional switch cannot express range inequalities or unsupported types.",
    hint: "Ranges, floats, and multi-variable conditions require else-if.",
    level: "basic",
    codeExample: "if (score >= 90) { } else if (score >= 80) { }"
  },
  {
    question: "When is a `switch` statement strongly preferred over an `else-if` ladder?",
    shortAnswer: "When testing a single discrete integral, String, or Enum variable against 4 or more constant values.",
    explanation: "Significantly enhances code readability, reduces boilerplate, and optimizes execution speed.",
    hint: "Matching single variable against 4+ discrete constants.",
    level: "basic",
    codeExample: "switch (command) { case \"START\" → ...; case \"STOP\" → ...; }"
  },
  {
    question: "What is the Time Complexity of an `else-if` ladder with $N$ branches?",
    shortAnswer: "Worst-case $O(N)$ and average-case $O(N/2)$ linear time.",
    explanation: "Each branch condition must be evaluated sequentially until a true match is found.",
    hint: "O(N) linear time.",
    level: "basic",
    codeExample: "// Checks up to N conditions"
  },
  {
    question: "What is the Time Complexity of a dense integer `switch` statement in bytecode?",
    shortAnswer: "$O(1)$ constant time.",
    explanation: "The `tableswitch` instruction computes the jump address directly using the selector value as an array offset.",
    hint: "O(1) constant time.",
    level: "intermediate",
    codeExample: "// tableswitch jump table"
  },
  {
    question: "What is the Time Complexity of a sparse integer `switch` statement using `lookupswitch`?",
    shortAnswer: "$O(\log N)$ logarithmic time (via binary search in bytecode table).",
    explanation: "When case values have large gaps (e.g. 1, 1000, 500000), the JVM emits `lookupswitch`.",
    hint: "O(log N) binary search lookup.",
    level: "advanced",
    codeExample: "// lookupswitch binary search"
  },
  {
    question: "Can an `else-if` ladder be optimized by the JIT (Just-In-Time) compiler at runtime?",
    shortAnswer: "Yes, HotSpot JIT compiler uses branch profiling to place the most frequently taken branch at the top of machine code.",
    explanation: "Runtime dynamic profile optimization.",
    hint: "JIT optimizes branch layout based on runtime profiling.",
    level: "advanced",
    codeExample: "// HotSpot optimizes common branch paths"
  },
  {
    question: "In terms of Cognitive Readability, why is `switch` considered cleaner for discrete dispatch?",
    shortAnswer: "Because it avoids repeating the selector variable name in every condition (e.g. `option == 1`, `option == 2`), presenting a clean vertical table of constants.",
    explanation: "Reduces visual noise and typographical redundancy.",
    hint: "Eliminates variable repetition across branches.",
    level: "basic",
    codeExample: "switch (x) { case 1 → ...; case 2 → ...; }"
  },
  {
    question: "Can an `else-if` ladder test multiple different variables in separate branches?",
    shortAnswer: "Yes! E.g. `if (a > 10) ... else if (b < 5) ... else if (c.isEmpty())`.",
    explanation: "Full flexibility for multi-variable evaluation.",
    hint: "Can evaluate different variables in each branch.",
    level: "basic",
    codeExample: "if (isAdmin) { } else if (serverLoad > 90) { } else { }"
  },
  {
    question: "Can a traditional `switch` statement evaluate multiple different variables in separate branches?",
    shortAnswer: "No! A traditional switch operates on a SINGLE selector expression evaluated once at the top.",
    explanation: "Switch evaluates only one variable/expression.",
    hint: "Switch is bound to a single selector expression.",
    level: "basic",
    codeExample: "// Switch inspects only one expression"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, how are students guided to choose between `switch` and `else-if`?",
    shortAnswer: "Use `switch` for menus, command routers, and status enums; use `else-if` for grade thresholds, tax slabs, and composite boolean conditions in Indian Rupees (₹).",
    explanation: "Practical domain-driven decision guidelines.",
    hint: "switch for discrete menus/enums; else-if for slabs/ranges.",
    level: "basic",
    codeExample: "// Course tracks → switch; Tax slabs → else-if"
  },
  {
    question: "What is the memory trade-off of `tableswitch` over `else-if`?",
    shortAnswer: "`tableswitch` allocates an internal table array spanning from the minimum to maximum case values, which may use slightly more bytecode bytes if there are small gaps.",
    explanation: "Trades minor bytecode memory for $O(1)$ execution speed.",
    hint: "Slightly larger bytecode table for O(1) performance.",
    level: "advanced",
    codeExample: "// Jump table offsets stored in class bytecode"
  },
  {
    question: "How does String switching compare to `else-if` using `.equals()`?",
    shortAnswer: "String switch computes `hashCode()` once and uses a jump table on hashes, then verifies `.equals()` on collision; `else-if` calls `.equals()` sequentially on every branch.",
    explanation: "String switch is significantly faster for 4+ strings.",
    hint: "String switch hashes once; else-if calls .equals() sequentially.",
    level: "intermediate",
    codeExample: "switch (str) { case \"ONE\": ... } // Fast hashcode dispatch"
  },
  {
    question: "What happens if you have only 2 discrete cases (`case 1:` and `case 2:`)?",
    shortAnswer: "The performance and readability difference between `switch` and `if-else` is negligible; use whichever feels more natural in context.",
    explanation: "Both compile to efficient machine code for 2 branches.",
    hint: "Negligible difference for 2 branches.",
    level: "basic",
    codeExample: "// if-else or ternary is often preferred for 2 branches"
  },
  {
    question: "Can a `switch` statement be refactored into a `Map<K, V>` lookup?",
    shortAnswer: "Yes! Constant-to-value or constant-to-action mappings can be stored in a `Map<String, Command>` for dynamic extensibility.",
    explanation: "A standard clean code pattern for open-closed principle.",
    hint: "Map lookup provides dynamic O(1) dispatch.",
    level: "intermediate",
    codeExample: "Map<Integer, String> tracks = Map.of(1, \"Java\", 2, \"Spring\");"
  },
  {
    question: "What is the Cyclomatic Complexity impact of `switch` vs `else-if`?",
    shortAnswer: "Both contribute identically to cyclomatic complexity (each `case` and each `else if` adds 1 to the complexity count).",
    explanation: "Standard McCabe cyclomatic complexity metric rules.",
    hint: "Each case and else-if adds 1 to complexity.",
    level: "advanced",
    codeExample: "// 5 cases = 5 complexity; 5 else-if branches = 5 complexity"
  },
  {
    question: "What is the advantage of Modern Switch Expressions (Java 14+) over `else-if` ladders?",
    shortAnswer: "They allow direct assignment as an expression (`final var = switch (x) { ... };`), guarantee exhaustiveness at compile time, and eliminate accidental fall-through.",
    explanation: "Combines the benefits of ternary expressions and jump tables.",
    hint: "Direct expression assignment, compile-time exhaustiveness, zero fall-through.",
    level: "basic",
    codeExample: "String title = switch (role) { case 1 → \"Admin\"; default → \"User\"; };"
  },
  {
    question: "What happens when an `else-if` ladder has 20 branches and the target match is at the very bottom?",
    shortAnswer: "The CPU must execute 19 conditional branch tests before finding the match, incurring multiple potential pipeline branch mispredictions.",
    explanation: "Highlights the linear penalty of long else-if chains.",
    hint: "Requires 19 condition evaluations before matching.",
    level: "intermediate",
    codeExample: "// 20th branch takes 20 evaluations in else-if"
  },
  {
    question: "What happens when a `switch` statement has 20 dense cases and the target match is at the very bottom?",
    shortAnswer: "The JVM executes a single `tableswitch` indexed lookup and jumps directly to the 20th case in $O(1)$ time!",
    explanation: "Direct index lookup regardless of case position.",
    hint: "Jumps directly in O(1) time.",
    level: "intermediate",
    codeExample: "// tableswitch jumps directly to 20th case"
  },
  {
    question: "Can an `else-if` ladder produce side effects in condition evaluation?",
    shortAnswer: "Yes! E.g. `else if (scanner.hasNext() && (line = scanner.nextLine()) != null)`.",
    explanation: "Conditions can evaluate and assign dynamically.",
    hint: "Dynamic side effects supported in else-if conditions.",
    level: "intermediate",
    codeExample: "if ((val = compute()) > 10) { }"
  },
  {
    question: "Can a `switch` statement produce side effects in case matching labels?",
    shortAnswer: "No! `case` labels must be compile-time constants and cannot execute code or produce side effects during matching.",
    explanation: "Guarantees pure constant matching.",
    hint: "Case labels cannot produce side effects.",
    level: "basic",
    codeExample: "// Case labels are pure constants"
  },
  {
    question: "What is the best practice when converting a complex `else-if` ladder to `switch` in modern Java?",
    shortAnswer: "Use Java 14+ arrow switch expressions (`case X → Y`) to ensure concise, fall-through-free, value-returning code.",
    explanation: "State-of-the-art modern Java standard.",
    hint: "Use modern arrow switch expressions.",
    level: "basic",
    codeExample: "var res = switch (code) { case 1 → \"A\"; default → \"B\"; };"
  },
  {
    question: "How does code maintainability differ between `switch` and `else-if` when adding new cases?",
    shortAnswer: "In `switch` on enums, the compiler enforces exhaustiveness warnings/errors if a case is missing; in `else-if`, a missing branch fails silently into the fallback without any compiler check.",
    explanation: "Compile-time exhaustiveness safety is a major benefit of switch on enums.",
    hint: "Switch on enum provides compile-time exhaustiveness checking.",
    level: "advanced",
    codeExample: "// Adding new enum constant triggers switch exhaustiveness check"
  },
  {
    question: "What is the result of switching on an `int` key of `100` when cases are `1`, `2`, `3`?",
    shortAnswer: "Jumps directly to `default` in $O(1)$ time.",
    explanation: "Jump table bounds check detects out-of-range key immediately.",
    hint: "Instant O(1) default jump.",
    level: "basic",
    codeExample: "switch (100) { case 1: ... default: ... } // Instant default jump"
  },
  {
    question: "Can an `else-if` ladder be replaced by the State Pattern in OOP?",
    shortAnswer: "Yes! Large branching structures representing state transitions are classic candidates for refactoring into the State or Strategy design pattern.",
    explanation: "Eliminates conditionals through polymorphic state objects.",
    hint: "State pattern replaces conditionals with polymorphic objects.",
    level: "advanced",
    codeExample: "state.handle(context);"
  },
  {
    question: "When benchmarking `switch` vs `else-if` in Java, what benchmarking framework should be used?",
    shortAnswer: "JMH (Java Microbenchmark Harness) to avoid JIT dead code elimination and warm-up artifacts.",
    explanation: "Industry standard for accurate Java performance measurement.",
    hint: "Use JMH for accurate micro-benchmarking.",
    level: "expert",
    codeExample: "@Benchmark public void testSwitch() { }"
  },
  {
    question: "What is the memory footprint difference between an `else-if` ladder and a `switch` statement in class files?",
    shortAnswer: "Negligible for small branch counts (a few dozen bytes); `tableswitch` has slightly higher bytecode density but vastly superior CPU execution characteristics.",
    explanation: "Performance far outweighs negligible bytecode byte differences.",
    hint: "Negligible class file difference; switch has superior CPU execution.",
    level: "intermediate",
    codeExample: "// Bytecode difference is minor"
  },
  {
    question: "What is the ultimate takeaway of Module 001_004 Topic 9 for Java developers?",
    shortAnswer: "Use `switch` statements/expressions for matching discrete constants with $O(1)$ jump-table efficiency and high readability; use `else-if` ladders for range inequalities, floating-point math, and complex composite boolean rules.",
    explanation: "Choosing the right tool ensures optimal performance and maintainability.",
    hint: "switch for discrete constants; else-if for ranges and complex conditions.",
    level: "basic",
    codeExample: "// Summary: switch (constants) vs if-else (ranges/formulas)"
  },
  {
    question: "What is the next topic (Topic 10) in Module 001_004?",
    shortAnswer: "Switch with Strings (introduced in Java 7) and internal hashcode matching.",
    explanation: "Topic 10 explores String switch mechanics, bytecode two-tier hashCode + equals compilation, null handling, and hash collision safety.",
    hint: "Switch with Strings and internal hashCode matching.",
    level: "basic",
    codeExample: "// Topic 10: Switch with Strings"
  }
];

export default questions;
