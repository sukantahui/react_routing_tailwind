/**
 * Module 001_005: Topic 11: Dry running nested loops using iteration trace tables
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is an Iteration Trace Table (Dry Run Table) in computer science?",
    shortAnswer: "A manual or printed tabular worksheet used to trace and record variable states, condition evaluations, and output values step-by-step during loop execution.",
    explanation: "Essential mental model verification tool for programmers.",
    hint: "Tabular worksheet tracking variable states step-by-step.",
    level: "basic",
    codeExample: "// Columns: Step | Outer Var | Outer Cond | Inner Var | Inner Cond | Output"
  },
  {
    question: "What essential columns make up a standard Nested Loop Trace Table?",
    shortAnswer: "1. Step Number; 2. Outer Variable; 3. Outer Condition (T/F); 4. Inner Variable; 5. Inner Condition (T/F); 6. Internal State Mutations; 7. Console Output.",
    explanation: "Captures the complete discrete state of execution.",
    hint: "Step, variables, boolean conditions, mutations, and output.",
    level: "basic",
    codeExample: "// | Step | i | i<=3 | j | j<=i | sum | Output |"
  },
  {
    question: "Why is dry running with trace tables essential for software developers?",
    shortAnswer: "It allows developers to verify algorithmic correctness, detect off-by-one errors, and debug complex nested logic before running code or when IDE debuggers are unavailable.",
    explanation: "Core problem-solving skill for technical interviews.",
    hint: "Catches off-by-one errors and verifies algorithmic logic manually.",
    level: "basic",
    codeExample: "// Dry running catches bugs before writing code"
  },
  {
    question: "In the Coder & AccoTax Barrackpore trace table demo (n=3), how many total inner steps occur?",
    shortAnswer: "Exactly 6 steps: for $i=1$ ($j=1 \\to 1$), for $i=2$ ($j=1, 2 \\to 2$), for $i=3$ ($j=1, 2, 3 \\to 3$) $\\to 1 + 2 + 3 = 6$ steps.",
    explanation: "Sum of first $N$ natural numbers: $N(N+1)/2 = 3(4)/2 = 6$.",
    hint: "1 + 2 + 3 = 6 total steps.",
    level: "basic",
    codeExample: "// Triangular trace steps: 1 + 2 + 3 = 6"
  },
  {
    question: "What is the primary difference between a 'Dry Run' and 'Live Debugging'?",
    shortAnswer: "A Dry Run is manual mental execution on paper/table without a computer; Live Debugging uses IDE breakpoints and JVM inspection at runtime.",
    explanation: "Dry runs build deep mental comprehension.",
    hint: "Dry run is manual paper execution; live debugging uses IDE breakpoints.",
    level: "basic",
    codeExample: "// Manual mental simulation vs IDE debugger inspection"
  },
  {
    question: "How does a trace table reveal Off-By-One boundary errors (`<` vs `<=`)?",
    shortAnswer: "By explicitly testing the boundary condition at $i = N$ and $i = N + 1$, verifying whether the loop executes one extra time or terminates one step too early.",
    explanation: "Boundary condition column makes bounds transparent.",
    hint: "Shows whether the loop halts at N or executes an extra iteration at N+1.",
    level: "basic",
    codeExample: "// Shows condition truth value at boundary: i=3 (3<=3 -> TRUE), i=4 (4<=3 -> FALSE)"
  },
  {
    question: "When dry running `for (int i = 1; i <= 3; i++) for (int j = 1; j <= 2; j++)`, what is the 4th row in the trace table?",
    shortAnswer: "Step 4: Outer `i = 2`, Outer condition `true`, Inner `j = 2`, Inner condition `true`.",
    explanation: "Steps 1-2 are (1,1), (1,2); Steps 3-4 are (2,1), (2,2).",
    hint: "Step 4 corresponds to i=2, j=2.",
    level: "basic",
    codeExample: "// Step 4: i=2, j=2"
  },
  {
    question: "How do you trace an Inner Loop's termination in a trace table?",
    shortAnswer: "Record the step where the inner condition evaluates to `false` (e.g. `j = 4, 4 <= 3 -> FALSE`), triggering the inner loop exit and jumping to outer update `i++`.",
    explanation: "Captures the precise exit boundary transition.",
    hint: "Record the false condition step that causes the inner loop to exit.",
    level: "intermediate",
    codeExample: "// j=4: 4 <= 3 is FALSE -> Exit inner loop -> outer i++"
  },
  {
    question: "In technical interview coding, how should a candidate present a dry run to the interviewer?",
    shortAnswer: "Draw a clean 4-6 column trace table on the whiteboard, walk through a small sample input (e.g. $N=3$), update variables step-by-step, and prove that the output matches expected results.",
    explanation: "Demonstrates rigorous engineering discipline.",
    hint: "Draw a clear trace table on the whiteboard using small sample inputs.",
    level: "intermediate",
    codeExample: "// Whiteboard interview trace table structure"
  },
  {
    question: "What is a 'State Transition' in loop tracing?",
    shortAnswer: "The mutation of one or more variables from their old values to their new values during a single clock step (e.g. `sum: 3 -> 7`).",
    explanation: "Atomic state evolution per iteration.",
    hint: "The change of variable values from old state to new state.",
    level: "basic",
    codeExample: "// State change: (i=2, j=1) -> term=2 -> sum: 1 -> 3"
  },
  {
    question: "How do trace tables assist in deriving Mathematical Time Complexity?",
    shortAnswer: "By counting the total number of table rows across different input sizes $N$, enabling developers to deduce mathematical summation formulas ($N^2$, $N(N+1)/2$, $\\log N$).",
    explanation: "Empirical derivation of Big-O complexity.",
    hint: "Counting table rows reveals summation formulas and Big-O complexity.",
    level: "intermediate",
    codeExample: "// Sum of row counts = Total operations"
  },
  {
    question: "What happens in a trace table when an infinite loop occurs?",
    shortAnswer: "The table rows never reach a `false` condition; the variables repeat in an endless cycle or diverge indefinitely without termination.",
    explanation: "Visual proof of non-termination.",
    hint: "Condition never evaluates to false; rows continue indefinitely.",
    level: "basic",
    codeExample: "// Table rows keep repeating with condition permanently TRUE"
  },
  {
    question: "When dry running Bubble Sort, what do trace table columns represent?",
    shortAnswer: "Pass # (`i`), Pair Index (`j`), `arr[j]` vs `arr[j+1]`, Swap Performed (Y/N), Array State after Step.",
    explanation: "Classic sorting algorithm trace table.",
    hint: "Tracks pair comparisons, swap actions, and array mutations.",
    level: "intermediate",
    codeExample: "// | Pass i | Index j | arr[j] > arr[j+1] | Swapped? | Array State |"
  },
  {
    question: "How do you trace `continue` statements in a trace table?",
    shortAnswer: "Mark the 'Action' column as 'SKIPPED', note that subsequent body statements did not execute, and show the immediate jump to the loop update clause.",
    explanation: "Explicitly tracks skipped execution branches.",
    hint: "Mark action as SKIPPED and show immediate jump to update clause.",
    level: "basic",
    codeExample: "// Step: condition true -> continue -> skip output -> j++"
  },
  {
    question: "How do you trace `break` statements in a trace table?",
    shortAnswer: "Mark the 'Action' column as 'BREAK', terminate the current loop's table rows immediately, and show the jump to the outer loop or post-loop statement.",
    explanation: "Explicitly tracks abrupt loop termination.",
    hint: "Mark action as BREAK and show immediate loop termination.",
    level: "basic",
    codeExample: "// Step: condition true -> break -> exit inner loop"
  },
  {
    question: "In the Coder & AccoTax Barrackpore fee discount multiplier demo, what pattern is traced?",
    shortAnswer: "A triangular discount matrix in Indian Rupees (`₹1,000` to `₹9,000`) calculated via `(i * j * 1000)` across 3 student tiers in West Bengal.",
    explanation: "Demonstrates practical domain-specific trace table calculations.",
    hint: "Traces triangular fee multiplier matrix in ₹.",
    level: "basic",
    codeExample: "int discount = i * j * 1000; // in ₹"
  },
  {
    question: "What is a 'Boundary Value Test' during a dry run?",
    shortAnswer: "Tracing the algorithm with minimum possible inputs ($N=0, 1$), maximum inputs, and edge cases to ensure no crashes or unexpected outputs occur.",
    explanation: "Standard software quality assurance practice.",
    hint: "Tracing edge cases like N=0, N=1, and negative values.",
    level: "basic",
    codeExample: "// Dry run with N=0 and N=1 to test boundaries"
  },
  {
    question: "Why should developers pick SMALL input values (e.g. $N=3$) when constructing trace tables manually?",
    shortAnswer: "Because $N=3$ is large enough to expose patterns, boundary transitions, and inner loop restarts, but small enough to trace completely in under 2 minutes without arithmetic fatigue.",
    explanation: "Optimal trade-off between coverage and manual effort.",
    hint: "Small inputs (N=3) reveal logic patterns quickly without fatigue.",
    level: "basic",
    codeExample: "// N=3 generates 6-9 steps, ideal for quick verification"
  },
  {
    question: "How does a trace table help identify Redundant Computations in nested loops?",
    shortAnswer: "By showing repeated identical calculations across table rows that could otherwise be computed once outside the inner loop (Loop Invariant Code Motion).",
    explanation: "Reveals loop optimization opportunities.",
    hint: "Exposes identical calculations repeated across inner loop cycles.",
    level: "intermediate",
    codeExample: "// If arr.length is recalculated in every row, hoist it outside!"
  },
  {
    question: "Can an automated JUnit test generate a trace table for diagnostic logs?",
    shortAnswer: "Yes! By printing formatted tabular markdown/ASCII logs during test execution or using parameterized test assertions.",
    explanation: "Combines automated testing with visual traceability.",
    hint: "Yes, format log tables with System.out.printf() in unit tests.",
    level: "intermediate",
    codeExample: "System.out.printf(\"| %d | %d | %b |%n\", step, i, cond);"
  },
  {
    question: "What is the 'Accumulated State Column' in a trace table?",
    shortAnswer: "A column that tracks the evolving running total, cumulative string, or data collection state as each term is processed.",
    explanation: "Verifies accumulator correctness per clock cycle.",
    hint: "Tracks running total or collection state over time.",
    level: "basic",
    codeExample: "// sum: 1 -> 3 -> 5 -> 8 -> 11 -> 14"
  },
  {
    question: "How do you trace a Two-Pointer algorithmic loop (e.g. `left` and `right`)?",
    shortAnswer: "Columns: Step | Left Index | Right Index | Condition (`left < right`) | Comparison | Pointer Moved (`left++` or `right--`).",
    explanation: "Standard trace table for palindrome checks and two-sum problems.",
    hint: "Tracks left and right indices, comparison, and pointer advancements.",
    level: "intermediate",
    codeExample: "// | Step | L | R | L < R | a[L] == a[R] | Move |"
  },
  {
    question: "What is the primary reason beginners make errors during manual dry runs?",
    shortAnswer: "Updating loop counters in their head instead of strictly writing down the new values row-by-row on paper.",
    explanation: "Mental caching errors cause lost variable state.",
    hint: "Relying on memory instead of writing every state change on paper.",
    level: "basic",
    codeExample: "// Always write down every variable value explicitly on paper!"
  },
  {
    question: "How does a trace table demonstrate the 'Inner Loop Reset' phenomenon?",
    shortAnswer: "It visually proves that when the outer loop advances ($i = 1 \\to 2$), the inner loop variable $j$ resets completely back to its initial value ($j = 1$).",
    explanation: "Core characteristic of nested loops.",
    hint: "Shows inner counter j resetting back to initial value when outer i advances.",
    level: "basic",
    codeExample: "// i=1 -> j=1..i -> i=2 -> j resets back to 1!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, why are students required to draw trace tables before coding patterns?",
    shortAnswer: "Because students who dry run their pattern algorithms on paper first solve complex pyramid and diamond patterns with zero runtime errors.",
    explanation: "Instills rigorous engineering and logical discipline.",
    hint: "Pre-coding trace tables eliminate pattern bugs on the first try.",
    level: "basic",
    codeExample: "// Paper trace table -> 100% bug-free pattern implementation"
  },
  {
    question: "What is the trace table row count for `for (int i=0; i<4; i++) for (int j=0; j<i; j++)`?",
    shortAnswer: "Row counts for $i=0,1,2,3$: $0 + 1 + 2 + 3 = 6$ rows.",
    explanation: "Triangular dependent inner loop starting at $j=0$ and stopping at $j<i$.",
    hint: "0 + 1 + 2 + 3 = 6 rows.",
    level: "intermediate",
    codeExample: "// i=0: 0, i=1: 1, i=2: 2, i=3: 3 -> Total 6"
  },
  {
    question: "Can a trace table be used to trace recursive methods?",
    shortAnswer: "Yes! Often called an Activation Frame Trace Table, tracking method parameters, base case checks, and return values across stack frames.",
    explanation: "Extends tabular dry running to recursive call stacks.",
    hint: "Yes, tracks activation frames, base cases, and return values.",
    level: "advanced",
    codeExample: "// | Call Frame | Parameter n | Base Case (n<=1) | Return Value |"
  },
  {
    question: "What is the difference between a Trace Table and an Iteration Matrix?",
    shortAnswer: "A Trace Table records sequential temporal clock steps (time domain); an Iteration Matrix records 2D spatial coordinates (spatial domain).",
    explanation: "Temporal execution order vs spatial data mapping.",
    hint: "Trace table tracks time steps; iteration matrix tracks spatial coordinates.",
    level: "intermediate",
    codeExample: "// Trace table = Step-by-step history; Matrix = 2D grid"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 11 for Java developers?",
    shortAnswer: "Iteration Trace Tables provide an irrefutable, discrete paper model of nested loop execution, making variable evolutions, boundary checks, and inner loop resets crystal clear before a single line of production code is written.",
    explanation: "Mastery of dry running is the hallmark of a confident algorithmic engineer.",
    hint: "Trace tables make discrete state transitions transparent, eliminating guesswork.",
    level: "basic",
    codeExample: "// Summary: Step -> Variables -> Condition -> Action -> Output"
  },
  {
    question: "What is the next topic (Topic 12) in Module 001_005?",
    shortAnswer: "Jump statements: 'break' statement to terminate loops immediately.",
    explanation: "Topic 12 explores early loop termination using the unconditioned `break` keyword.",
    hint: "Jump statements: 'break' statement to terminate loops immediately.",
    level: "basic",
    codeExample: "// Topic 12: The 'break' Statement"
  }
];

export default questions;
