/**
 * Module 001_005: Topic 10: Nested loops: outer loop vs inner loop execution order and grid traversal
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Nested Loop in Java?",
    shortAnswer: "A loop placed completely inside the body of another enclosing loop.",
    explanation: "Allows processing multidimensional data structures and coordinate spaces.",
    hint: "A loop located inside another loop.",
    level: "basic",
    codeExample: "for (int i = 0; i < 3; i++) { for (int j = 0; j < 3; j++) { } }"
  },
  {
    question: "What is the exact execution order of Outer vs Inner loops?",
    shortAnswer: "For every SINGLE iteration of the Outer loop, the Inner loop executes its entire complete lifecycle from start to finish.",
    explanation: "Inner loop runs to full completion before the outer loop advances by 1 step.",
    hint: "Inner loop executes all iterations for every single outer loop step.",
    level: "basic",
    codeExample: "// Outer i=1 -> Inner runs j=1..4 -> Outer i=2 -> Inner runs j=1..4"
  },
  {
    question: "How do you calculate the Total Number of Iterations of a nested loop?",
    shortAnswer: "$\\text{Total Iterations} = \\text{Outer Count} \\times \\text{Inner Count}$.",
    explanation: "Multiplicative combination principle ($O(R \\times C)$).",
    hint: "Multiply outer loop iterations by inner loop iterations.",
    level: "basic",
    codeExample: "// 3 outer rows * 4 inner cols = 12 total iterations"
  },
  {
    question: "What is Row-Major Order in 2D grid matrix traversal?",
    shortAnswer: "Traversing grid elements row by row: the outer loop iterates rows (`r`), while the inner loop visits every column (`c`) within that row (`matrix[r][c]`).",
    explanation: "Standard memory layout traversal order in Java.",
    hint: "Outer loop iterates rows, inner loop iterates columns (matrix[r][c]).",
    level: "basic",
    codeExample: "for (int r = 0; r < rows; r++) for (int c = 0; c < cols; c++) matrix[r][c];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore workstation lab, how is the grid matrix structured?",
    shortAnswer: "With 3 rows of workstations and 4 desks per row ($3 \\times 4 = 12$ iterations) to audit seat tuition collections in Indian Rupees (₹).",
    explanation: "Demonstrates practical 2D grid coordinate tracking.",
    hint: "3 rows x 4 desks per row = 12 total workstation iterations in ₹.",
    level: "basic",
    codeExample: "for (int r=1; r<=3; r++) for (int c=1; c<=4; c++) auditSeat(r, c);"
  },
  {
    question: "What is the Time Complexity of two nested loops each running $N$ times?",
    shortAnswer: "$O(N^2)$ quadratic time complexity.",
    explanation: "$N \\times N = N^2$ total operations.",
    hint: "O(N^2) quadratic time.",
    level: "basic",
    codeExample: "for (int i=0; i<N; i++) for (int j=0; j<N; j++) { } // O(N^2)"
  },
  {
    question: "What is the Time Complexity of three nested loops each running $N$ times?",
    shortAnswer: "$O(N^3)$ cubic time complexity.",
    explanation: "$N \\times N \\times N = N^3$ total operations.",
    hint: "O(N^3) cubic time.",
    level: "basic",
    codeExample: "for (i..) for (j..) for (k..) { } // O(N^3)"
  },
  {
    question: "Can an inner loop access variables declared in the outer loop header?",
    shortAnswer: "Yes! Outer loop variables (`i`) are in scope and fully accessible inside the inner loop.",
    explanation: "Lexical scope inheritance in nested blocks.",
    hint: "Yes, inner loops can read outer loop variables.",
    level: "basic",
    codeExample: "for (int i = 0; i < 3; i++) {\n    for (int j = 0; j <= i; j++) { print(i + j); }\n}"
  },
  {
    question: "Can an outer loop access variables declared inside the inner loop header?",
    shortAnswer: "No! Inner loop variables (`j`) are scoped strictly to the inner loop and are destroyed when the inner loop terminates.",
    explanation: "Block scoping boundaries.",
    hint: "No, inner loop variables are destroyed when the inner loop ends.",
    level: "basic",
    codeExample: "for (int i = 0; i < 3; i++) { for (int j = 0; j < 3; j++) {} }\n// j is not accessible here!"
  },
  {
    question: "What is a Triangular Nested Loop (dependent inner loop)?",
    shortAnswer: "A nested loop where the inner loop's bound depends on the outer loop's counter: `for (int i = 0; i < N; i++) for (int j = 0; j <= i; j++)`.",
    explanation: "Executes $N(N+1)/2$ total iterations; basis of star patterns and bubble sort.",
    hint: "Inner loop bound depends on outer loop counter (j <= i).",
    level: "intermediate",
    codeExample: "for (int i = 1; i <= n; i++) {\n    for (int j = 1; j <= i; j++) System.out.print(\"* \");\n    System.out.println();\n}"
  },
  {
    question: "How does a nested loop generate a Multiplication Table (e.g. 1 to 10)?",
    shortAnswer: "Outer loop iterates multipliers `i = 1..10`, inner loop iterates multiplicands `j = 1..10`, printing `i * j`.",
    explanation: "Classic 2D table generation algorithm.",
    hint: "Outer loop is multiplier, inner loop is multiplicand (i * j).",
    level: "basic",
    codeExample: "for (int i = 1; i <= 10; i++) {\n    for (int j = 1; j <= 10; j++) System.out.printf(\"%4d\", i * j);\n    System.out.println();\n}"
  },
  {
    question: "What is the result of executing `break;` inside an INNER nested loop?",
    shortAnswer: "It terminates ONLY the immediate inner loop, returning control to the next step of the outer loop.",
    explanation: "Unlabeled break exits only the innermost enclosing loop.",
    hint: "Exits only the immediate inner loop.",
    level: "basic",
    codeExample: "for (int i=0; i<3; i++) {\n    for (int j=0; j<3; j++) { if (j == 1) break; }\n}"
  },
  {
    question: "How do you break out of BOTH outer and inner loops simultaneously?",
    shortAnswer: "Using a Labeled `break` statement (`break OUTER_LABEL;`).",
    explanation: "Topic 14 explores labeled statements in depth.",
    hint: "Use labeled break: break OUTER_LABEL;.",
    level: "basic",
    codeExample: "OUTER: for (int i=0; i<3; i++) {\n    for (int j=0; j<3; j++) { if (found) break OUTER; }\n}"
  },
  {
    question: "Can an enhanced `for-each` loop be nested inside a traditional indexed `for` loop?",
    shortAnswer: "Yes! Any loop construct can be nested inside any other loop construct in Java.",
    explanation: "Full mixing flexibility across loop types.",
    hint: "Yes, loop types can be freely mixed in nesting.",
    level: "basic",
    codeExample: "for (int r = 0; r < matrix.length; r++) {\n    for (int val : matrix[r]) print(val);\n}"
  },
  {
    question: "How does Row-Major order vs Column-Major order affect CPU Cache performance in Java?",
    shortAnswer: "Row-Major order (`matrix[r][c]`) accesses memory sequentially in contiguous cache lines (cache friendly); Column-Major (`matrix[c][r]`) jumps across memory strides, causing CPU cache misses.",
    explanation: "Critical for high-performance matrix computing.",
    hint: "Row-major sequential access maximizes CPU L1/L2 cache hits.",
    level: "advanced",
    codeExample: "// Fast: matrix[r][c] vs Slow: matrix[c][r] on large grids"
  },
  {
    question: "In the Coder & AccoTax Barrackpore 2D fee matrix, what do rows and columns represent?",
    shortAnswer: "Rows represent 3 academic semesters; columns represent 3 course tracks (Java, Spring Boot, DevOps) with fees up to ₹20,000 in Indian Rupees (₹).",
    explanation: "Demonstrates multidimensional financial modeling.",
    hint: "Rows = Semesters, Cols = Course Tracks in ₹.",
    level: "basic",
    codeExample: "double fee = tuitionMatrix[semester][track];"
  },
  {
    question: "What is the total number of iterations for `for (int i = 0; i < 5; i++) for (int j = i; j < 5; j++)`?",
    shortAnswer: "$5 + 4 + 3 + 2 + 1 = 15$ iterations.",
    explanation: "Upper triangular matrix traversal.",
    hint: "15 iterations (5 + 4 + 3 + 2 + 1).",
    level: "intermediate",
    codeExample: "// Iteration count: 5+4+3+2+1 = 15"
  },
  {
    question: "What is an All-Pairs Comparison in algorithmic design?",
    shortAnswer: "Comparing every element with every subsequent element using nested loops (`for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++)`).",
    explanation: "Runs in $N(N-1)/2$ comparisons; used for finding duplicate pairs.",
    hint: "Pairs comparison: for (int i=0; i<n; i++) for (int j=i+1; j<n; j++).",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) for (int j=i+1; j<n; j++) if (a[i] == a[j]) return true;"
  },
  {
    question: "How many times does `System.out.println()` execute in `for (int i=0; i<3; i++) for (int j=0; j<2; j++) print();`?",
    shortAnswer: "$3 \\times 2 = 6$ times.",
    explanation: "Outer runs 3 times; inner runs 2 times per outer cycle.",
    hint: "6 times (3 x 2).",
    level: "basic",
    codeExample: "// 3 * 2 = 6 executions"
  },
  {
    question: "What happens if you accidentally use the outer loop counter `i` in the inner loop header (`for (int j=0; j<3; i++)`)?",
    shortAnswer: "The outer counter `i` is mutated by the inner loop, creating an unexpected infinite loop or skipped outer cycles!",
    explanation: "Classic copy-paste typo in nested loop headers.",
    hint: "Inner loop mutates outer counter, breaking iteration control.",
    level: "basic",
    codeExample: "// Bug: for (int j=0; j<3; i++) // Typed i++ instead of j++!"
  },
  {
    question: "How is a Jagged (Ragged) 2D Array traversed with nested loops in Java?",
    shortAnswer: "By using `matrix[r].length` as the inner loop bound (`for (int r = 0; r < matrix.length; r++) for (int c = 0; c < matrix[r].length; c++)`).",
    explanation: "Safely handles rows with varying column lengths.",
    hint: "Inner bound uses matrix[r].length to adapt to varying row sizes.",
    level: "intermediate",
    codeExample: "for (int r=0; r<arr.length; r++) for (int c=0; c<arr[r].length; c++) { }"
  },
  {
    question: "What is Matrix Transposition using nested loops?",
    shortAnswer: "Swapping rows and columns (`transposed[c][r] = original[r][c]`) using nested grid traversal.",
    explanation: "Fundamental linear algebra matrix operation.",
    hint: "Swaps row and column coordinates: transposed[c][r] = original[r][c].",
    level: "intermediate",
    codeExample: "for (int r=0; r<R; r++) for (int c=0; c<C; c++) t[c][r] = m[r][c];"
  },
  {
    question: "Why should developers avoid nesting loops 4 or more levels deep?",
    shortAnswer: "Because $O(N^4)$ polynomial complexity slows down execution exponentially and causes immense cognitive parsing difficulty during maintenance.",
    explanation: "Refactor deep loops into helper methods or hash lookups.",
    hint: "Deep nesting causes high polynomial complexity and unreadable code.",
    level: "basic",
    codeExample: "// Refactor deep loops into modular helper functions"
  },
  {
    question: "How do nested loops perform Matrix Multiplication of two $N \\times N$ matrices?",
    shortAnswer: "Using 3 nested loops: row `i`, col `j`, and dot product index `k` (`result[i][j] += A[i][k] * B[k][j]`), running in $O(N^3)$ time.",
    explanation: "Standard matrix multiplication algorithm.",
    hint: "3 nested loops running in O(N^3) time.",
    level: "intermediate",
    codeExample: "for (int i=0; i<N; i++) for (int j=0; j<N; j++) for (int k=0; k<N; k++) C[i][j] += A[i][k]*B[k][j];"
  },
  {
    question: "What is the difference between `continue;` in the inner loop vs the outer loop?",
    shortAnswer: "In the inner loop, `continue` skips to the next inner iteration (`j++`); in the outer loop, `continue` skips to the next outer iteration (`i++`), restarting the inner loop.",
    explanation: "Scope of jump statements in nested constructs.",
    hint: "Inner continue skips inner step; outer continue restarts inner loop for next outer step.",
    level: "basic",
    codeExample: "for (i..) { for (j..) { if (c) continue; } }"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what coordinate layout is printed by `System.out.println()` after the inner loop?",
    shortAnswer: "A clean 2D rectangular grid, where `print()` outputs columns horizontally and `println()` breaks to a new row line after each inner loop completes.",
    explanation: "Standard formatting pattern for 2D console displays.",
    hint: "print() for columns, println() after inner loop for new rows.",
    level: "basic",
    codeExample: "for (r..) { for (c..) print(c + \" \"); println(); }"
  },
  {
    question: "How does the HotSpot JIT compiler optimize tight nested loops?",
    shortAnswer: "By applying Loop Interchange (reordering loops to maximize cache locality) and Loop Tiling (blocking iterations into cache-sized sub-matrices).",
    explanation: "Advanced compiler optimization for scientific computing.",
    hint: "Loop interchange and loop tiling for CPU cache optimization.",
    level: "expert",
    codeExample: "// JIT performs loop interchange to optimize memory strides"
  },
  {
    question: "What is the output of `for (int i=1; i<=2; i++) for (int j=1; j<=2; j++) System.out.print(i + \"\" + j + \" \");`?",
    shortAnswer: "`11 12 21 22 `.",
    explanation: "Cartesian product of `{1, 2}` with `{1, 2}`.",
    hint: "Prints 11 12 21 22.",
    level: "basic",
    codeExample: "for (int i=1; i<=2; i++) for (int j=1; j<=2; j++) print(i + \"\" + j + \" \");"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 10 for Java developers?",
    shortAnswer: "Nested loops model multi-dimensional coordinate spaces and matrices; for every single outer loop cycle, the inner loop executes completely, producing multiplicative $O(R \\times C)$ iterations across row-major grid traversals.",
    explanation: "Foundational structure for multi-dimensional algorithms and 2D graphics.",
    hint: "Inner loop runs to full completion for every single outer step, producing O(R x C) iterations.",
    level: "basic",
    codeExample: "// Summary: for (row..) { for (col..) { matrix[row][col]; } }"
  },
  {
    question: "What is the next topic (Topic 11) in Module 001_005?",
    shortAnswer: "Dry running nested loops using iteration trace tables.",
    explanation: "Topic 11 explores formal trace table construction, state recording, and manual algorithmic dry running for nested loops.",
    hint: "Dry running nested loops using iteration trace tables.",
    level: "basic",
    codeExample: "// Topic 11: Trace Tables for Nested Loops"
  }
];

export default questions;
