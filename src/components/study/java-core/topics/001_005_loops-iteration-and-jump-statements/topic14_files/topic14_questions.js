/**
 * Module 001_005: Topic 14: Labeled 'break' and labeled 'continue' to break out of nested multi-tier loops
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Labeled Statement in Java (JLS §14.7)?",
    shortAnswer: "A statement preceded by a valid Java identifier and a colon (e.g. `OUTER_LOOP: for (...)`), allowing targeted jumps from nested inner blocks.",
    explanation: "Provides named targets for labeled break and continue statements.",
    hint: "Identifier followed by a colon before a loop (LABEL: for).",
    level: "basic",
    codeExample: "SEARCH_BLOCK: for (int i = 0; i < 5; i++) { }"
  },
  {
    question: "What is the function of `break LABEL;` in Java?",
    shortAnswer: "It immediately terminates the execution of the labeled enclosing loop or block, exiting all nested loops in between.",
    explanation: "Enables instant multi-tier loop breakout.",
    hint: "Exits all nested loops up to the labeled loop immediately.",
    level: "basic",
    codeExample: "OUTER: for (..) { for (..) { if (found) break OUTER; } }"
  },
  {
    question: "What is the function of `continue LABEL;` in Java?",
    shortAnswer: "It skips the remainder of the current iteration and jumps directly to the update clause / condition of the labeled outer loop.",
    explanation: "Allows skipping entire rows/tiers in nested grid processing.",
    hint: "Jumps directly to the update clause of the labeled outer loop.",
    level: "basic",
    codeExample: "ROW_LOOP: for (..) { for (..) { if (skipRow) continue ROW_LOOP; } }"
  },
  {
    question: "Why does Java support labeled `break`/`continue` instead of a general `goto` keyword?",
    shortAnswer: "To prevent unstructured 'spaghetti code'; labeled jumps in Java are strictly structured and can only jump backward to loop updates or forward to loop termination exits.",
    explanation: "Maintains structured programming principles while providing multi-level escape.",
    hint: "Prevents spaghetti code by restricting jumps to structured loop boundaries.",
    level: "basic",
    codeExample: "// Java reserves 'goto' but uses labeled break/continue for safety"
  },
  {
    question: "In the Coder & AccoTax Barrackpore seating search, how does `break HALL_SEARCH;` behave?",
    shortAnswer: "Upon locating Roll #203 in Hall 2, it immediately escapes both the inner desk loop and the outer hall loop, completely bypassing Hall 3.",
    explanation: "Demonstrates practical multi-tier early exit.",
    hint: "Escapes both inner and outer loops, bypassing Hall 3.",
    level: "basic",
    codeExample: "if (currentRoll == 203) break HALL_SEARCH;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore equipment maintenance audit, how does `continue HALL_LOOP;` behave?",
    shortAnswer: "Upon encountering defective equipment in Hall 2, it skips all remaining desks in Hall 2 and immediately advances to Hall 3.",
    explanation: "Demonstrates practical matrix row skipping.",
    hint: "Skips remaining desks in current hall and advances to next hall.",
    level: "basic",
    codeExample: "if (hall == defective) continue HALL_LOOP;"
  },
  {
    question: "Can a label be attached to an arbitrary block `{ ... }` without a loop?",
    shortAnswer: "Yes! A label can precede any compound block (`MY_BLOCK: { if (err) break MY_BLOCK; }`), allowing early exit from arbitrary statement blocks.",
    explanation: "Labeled break works on any enclosing labeled block (JLS §14.15).",
    hint: "Yes, labeled break works on any labeled { ... } block.",
    level: "intermediate",
    codeExample: "BLOCK: {\n    if (error) break BLOCK;\n    doWork();\n}"
  },
  {
    question: "Can `continue LABEL;` be used on an arbitrary block `{ ... }` that is NOT a loop?",
    shortAnswer: "No! `continue` requires a loop target; attempting `continue` on a non-loop labeled block causes a compile error (`not a loop label`).",
    explanation: "Only `break` can target non-loop compound blocks.",
    hint: "Compile error: continue can only target loop statements.",
    level: "intermediate",
    codeExample: "// BLOCK: { continue BLOCK; } // COMPILER ERROR: Not a loop!"
  },
  {
    question: "What happens if a `break LABEL;` references a label that does not enclose the statement?",
    shortAnswer: "Compilation error: `undefined label: LABEL`.",
    explanation: "Jumps cannot target sibling or unrelated blocks.",
    hint: "Compile error: undefined label.",
    level: "basic",
    codeExample: "// break UNRELATED_LABEL; // COMPILER ERROR!"
  },
  {
    question: "Can two different loops in the same method share the same label name?",
    shortAnswer: "Yes, as long as the scopes are disjoint (not nested within each other). If nested, shadowing identical label names causes a compile error.",
    explanation: "Label scoping rules in JLS §14.7.",
    hint: "Yes in sequential disjoint loops, but not in nested scopes.",
    level: "intermediate",
    codeExample: "LOOP: for (..) {} LOOP: for (..) {} // Valid (sequential)"
  },
  {
    question: "What naming convention is standard for labels in Java?",
    shortAnswer: "`UPPER_SNAKE_CASE` (e.g. `OUTER_LOOP:`, `SEARCH:`, `ROW_SCAN:`), making them distinct from variable and method identifiers.",
    explanation: "Java naming best practice.",
    hint: "UPPER_SNAKE_CASE (e.g. OUTER_LOOP:).",
    level: "basic",
    codeExample: "OUTER_LOOP: for (int i=0; i<N; i++) { }"
  },
  {
    question: "What bytecode instruction does the JVM emit for `break OUTER;`?",
    shortAnswer: "A direct `goto` instruction pointing to the bytecode offset immediately following the outer labeled loop.",
    explanation: "Zero runtime overhead compared to manual boolean flags.",
    hint: "Direct goto jump to outer post-loop label.",
    level: "advanced",
    codeExample: "// Bytecode: goto L_POST_OUTER"
  },
  {
    question: "What bytecode instruction does the JVM emit for `continue OUTER;`?",
    shortAnswer: "A direct `goto` instruction pointing to the outer loop's update clause label.",
    explanation: "Direct unconditional branch to outer loop header.",
    hint: "Direct goto jump to outer update label.",
    level: "advanced",
    codeExample: "// Bytecode: goto L_OUTER_UPDATE"
  },
  {
    question: "How does labeled `break` compare to using boolean flag variables (`boolean found = false;`) in nested loops?",
    shortAnswer: "Labeled `break` is cleaner, avoids extra conditional checks on every outer loop step, and executes in $O(1)$ jump time.",
    explanation: "Significantly cleaner than setting flags and checking `if (found) break;` in outer loops.",
    hint: "Cleaner and faster than multi-level boolean flag checks.",
    level: "basic",
    codeExample: "// Avoids boolean flags like: if (found) break; in outer loop"
  },
  {
    question: "Can a label be attached to an enhanced `for-each` loop?",
    shortAnswer: "Yes! E.g. `OUTER: for (String[] row : grid) { for (String cell : row) { break OUTER; } }`.",
    explanation: "Full support across all loop types.",
    hint: "Yes, enhanced for-each loops can be labeled.",
    level: "basic",
    codeExample: "OUTER: for (Student[] batch : school) { break OUTER; }"
  },
  {
    question: "What happens if a labeled `break` executes inside a `try-finally` block nested 3 levels deep?",
    shortAnswer: "ALL `finally` blocks across all 3 nested levels execute in order from innermost to outermost before the jump completes!",
    explanation: "JVM ensures complete finally block unwinding.",
    hint: "All finally blocks execute from innermost to outermost before jumping.",
    level: "advanced",
    codeExample: "OUTER: for(..) { try { while(..) { try { break OUTER; } finally { f1(); } } } finally { f2(); } }"
  },
  {
    question: "Can labeled `break` be used inside a switch statement nested inside a `for` loop to break the loop?",
    shortAnswer: "Yes! `FOR_LOOP: for (...) { switch(...) { case 1: break FOR_LOOP; } }` cleanly breaks out of the loop from inside the switch.",
    explanation: "Solves the classic switch-inside-loop break dilemma.",
    hint: "Yes, breaks the loop directly from inside switch branches.",
    level: "intermediate",
    codeExample: "LOOP: for(..) { switch(x) { case 'Q': break LOOP; } }"
  },
  {
    question: "Is it possible to jump backwards using a labeled `break` in Java?",
    shortAnswer: "No! Labeled `break` in Java can ONLY jump forward to the end of the enclosing labeled block.",
    explanation: "Strict forward-only breakout guarantee.",
    hint: "No, labeled break is strictly forward-only.",
    level: "basic",
    codeExample: "// break always jumps forward to the end of the labeled block"
  },
  {
    question: "Can a labeled statement be placed on an empty statement (`LABEL: ;`)?",
    shortAnswer: "Yes, syntactically valid in JLS §14.7, though practically useless.",
    explanation: "Java grammar allows labeling empty statements.",
    hint: "Syntactically legal, but useless in practice.",
    level: "intermediate",
    codeExample: "LABEL: ; // Legal empty labeled statement"
  },
  {
    question: "Why do some style guides discourage excessive use of labeled jumps?",
    shortAnswer: "Because overuse across deep hierarchies (4+ levels) can make code flow harder to trace; refactoring into small helper methods with `return` is often preferred.",
    explanation: "Maintainability best practice.",
    hint: "Overuse in deep hierarchies harms readability; prefer helper methods with return.",
    level: "intermediate",
    codeExample: "// Refactoring to helper methods with return is often cleaner"
  },
  {
    question: "How do you search for an item in a 3D Matrix and exit immediately upon finding it?",
    shortAnswer: "Label the outermost loop (`MATRIX_3D: for (int x..)`) and execute `break MATRIX_3D;` from the innermost z-loop.",
    explanation: "Exits all 3 loop tiers in a single jump.",
    hint: "Label outer loop and call break OUTER_3D from innermost loop.",
    level: "intermediate",
    codeExample: "CUBE: for (x..) for (y..) for (z..) if (match) break CUBE;"
  },
  {
    question: "What is the error if a label is placed on a variable declaration (`LABEL: int x = 10;`)?",
    shortAnswer: "Compilation error: `not a statement` or `declaration not allowed here` (only statements can be labeled).",
    explanation: "Local variable declarations cannot be labeled.",
    hint: "Compile error: declarations cannot be labeled.",
    level: "intermediate",
    codeExample: "// LABEL: int x = 10; // COMPILER ERROR!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what is the #1 interview use case for labeled `break`?",
    shortAnswer: "2D Matrix Target Search / Sudoku validation early exit.",
    explanation: "Classic technical interview problem.",
    hint: "2D matrix search early exit.",
    level: "basic",
    codeExample: "SEARCH: for (r..) for (c..) if (grid[r][c] == target) break SEARCH;"
  },
  {
    question: "Can `continue` and `break` target the SAME label in a nested loop structure?",
    shortAnswer: "Yes! E.g. `OUTER: for (..) { for (..) { if (skip) continue OUTER; if (quit) break OUTER; } }`.",
    explanation: "Both statements can reference the same enclosing loop label.",
    hint: "Yes, both can reference the same outer loop label.",
    level: "basic",
    codeExample: "OUTER: for (..) { for (..) { if (c1) continue OUTER; if (c2) break OUTER; } }"
  },
  {
    question: "What is the difference between `break;` vs `break LABEL;` in a single un-nested loop?",
    shortAnswer: "Functionally identical; both exit the loop immediately.",
    explanation: "Explicit label is redundant for single un-nested loops.",
    hint: "Identical behavior in single un-nested loops.",
    level: "basic",
    codeExample: "LOOP: for (int i=0; i<5; i++) { break; /* same as break LOOP; */ }"
  },
  {
    question: "What happens if a developer places a semicolon directly after the label (`LABEL:; for (...)`)?",
    shortAnswer: "The label attaches to the empty semicolon statement `;` instead of the loop! Attempting `break LABEL;` inside the loop causes a compile error: `undefined label`.",
    explanation: "Subtle syntax trap in Java labeling.",
    hint: "Label attaches to the empty statement, making it invisible to the loop.",
    level: "intermediate",
    codeExample: "// Trap: LABEL:; for (..) → break LABEL fails to find loop!"
  },
  {
    question: "How does HotSpot JIT compiler optimize labeled break jumps?",
    shortAnswer: "By eliminating intermediate stack frame checks and compiling directly to an unconditional CPU jump instruction (`jmp`).",
    explanation: "Zero performance overhead at machine level.",
    hint: "Compiles to direct unconditional CPU jmp instructions.",
    level: "advanced",
    codeExample: "// Compiled directly to assembly 'jmp' instruction"
  },
  {
    question: "Can labeled statements be used inside Java Streams lambda pipelines?",
    shortAnswer: "No! Jump statements cannot target labels outside lambda boundaries.",
    explanation: "Lambda isolation boundary.",
    hint: "No, cannot cross lambda functional boundaries.",
    level: "intermediate",
    codeExample: "// Streams cannot jump to outer labels"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 14 for Java developers?",
    shortAnswer: "Labeled `break` and `continue` provide safe, structured multi-tier jump control in nested hierarchies, enabling instant 2D matrix search exits and clean row skipping without boolean flags or arbitrary goto.",
    explanation: "Mastery of multi-level loop flow control.",
    hint: "Safe structured multi-tier jump controls for nested matrices and grids.",
    level: "basic",
    codeExample: "// Summary: break OUTER; (instant exit) | continue OUTER; (row skip)"
  },
  {
    question: "What is the next topic (Topic 15) in Module 001_005?",
    shortAnswer: "Printing 2D visual patterns: right-angled triangles, pyramids, inverted triangles, diamonds.",
    explanation: "Topic 15 explores algorithmic visual 2D pattern generation using nested loop coordinate spaces.",
    hint: "Printing 2D visual patterns: triangles, pyramids, diamonds.",
    level: "basic",
    codeExample: "// Topic 15: 2D Visual Star Patterns"
  }
];

export default questions;
