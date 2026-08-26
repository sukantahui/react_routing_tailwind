/**
 * Module 001_005: Topic 15: Printing 2D visual patterns: right-angled triangles, pyramids, inverted triangles, diamonds
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the standard 3-step algorithm for generating 2D Visual Star Patterns in Java?",
    shortAnswer: "1. Outer Loop controls Row count ($r=1 \\dots N$); 2. Inner Space Loop prints leading spaces ($N - r$); 3. Inner Star Loop prints characters ($2r - 1$ or $r$).",
    explanation: "Standard foundation for all visual console patterns.",
    hint: "1. Outer row loop; 2. Inner spaces loop; 3. Inner stars loop.",
    level: "basic",
    codeExample: "for (r..) { for (spaces..) print(\" \"); for (stars..) print(\"*\"); println(); }"
  },
  {
    question: "How do you print a Right-Angled Triangle of stars with height $N$?",
    shortAnswer: "Outer loop $r = 1 \\dots N$; inner loop $c = 1 \\dots r$, printing `* `.",
    explanation: "Number of stars printed on row $r$ equals $r$.",
    hint: "Outer r=1..N, inner c=1..r.",
    level: "basic",
    codeExample: "for (int r=1; r<=n; r++) {\n    for (int c=1; c<=r; c++) System.out.print(\"* \");\n    System.out.println();\n}"
  },
  {
    question: "How do you print an Inverted Right-Angled Triangle of stars with height $N$?",
    shortAnswer: "Outer loop $r = N \\dots 1$ (decrementing); inner loop $c = 1 \\dots r$, printing `* `.",
    explanation: "Stars decrease from $N$ down to 1.",
    hint: "Outer r=N down to 1, inner c=1..r.",
    level: "basic",
    codeExample: "for (int r=n; r>=1; r--) {\n    for (int c=1; c<=r; c++) System.out.print(\"* \");\n    System.out.println();\n}"
  },
  {
    question: "What mathematical formula determines the number of LEADING SPACES in a Centered Pyramid of height $N$ on row $r$?",
    shortAnswer: "$\\text{Spaces} = N - r$.",
    explanation: "On row 1 of $N=4$, spaces $= 4 - 1 = 3$; on row 4, spaces $= 4 - 4 = 0$.",
    hint: "N - r spaces per row.",
    level: "basic",
    codeExample: "for (int s = 1; s <= (n - r); s++) System.out.print(\"  \");"
  },
  {
    question: "What mathematical formula determines the number of STARS in a Centered Full Pyramid on row $r$?",
    shortAnswer: "$\\text{Stars} = 2 \\times r - 1$ (generating the odd sequence: $1, 3, 5, 7, \\dots$).",
    explanation: "Guarantees a symmetrical odd apex and balanced expansion.",
    hint: "2 * r - 1 stars per row.",
    level: "basic",
    codeExample: "for (int st = 1; st <= (2 * r - 1); st++) System.out.print(\"* \");"
  },
  {
    question: "How is a Symmetrical Full Diamond constructed using nested loops?",
    shortAnswer: "By combining an Upper Centered Pyramid ($r = 1 \\dots N$) with a Lower Inverted Pyramid ($r = N-1 \\dots 1$).",
    explanation: "Two sequential nested loops forming top and bottom halves.",
    hint: "Top pyramid (1 to N) + bottom inverted pyramid (N-1 down to 1).",
    level: "basic",
    codeExample: "// Top half: r=1..N; Bottom half: r=N-1 down to 1"
  },
  {
    question: "In the Coder & AccoTax Barrackpore auditorium lighting matrix, how are diamonds generated?",
    shortAnswer: "By rendering $N=4$ upper pyramid rows ($1, 3, 5, 7$ lights) and $N-1=3$ lower inverted rows ($5, 3, 1$ lights) in West Bengal.",
    explanation: "Demonstrates practical visual lighting grid coordinate generation.",
    hint: "Upper half (1..4) + Lower half (3..1) forming 7 total lighting rows.",
    level: "basic",
    codeExample: "// Lighting grid diamond of 7 total rows"
  },
  {
    question: "What is the difference between `System.out.print()` and `System.out.println()` in pattern generation?",
    shortAnswer: "`print()` outputs elements horizontally on the same row; `println()` outputs a newline character to break to the next row.",
    explanation: "Fundamental formatting principle.",
    hint: "print() stays on same line; println() breaks to next line.",
    level: "basic",
    codeExample: "print(\"* \"); // horizontal | println(); // row break"
  },
  {
    question: "How do you print a Hollow Square pattern of size $N$?",
    shortAnswer: "Print `*` if on a boundary coordinate (`r == 1 || r == N || c == 1 || c == N`), otherwise print a space ` `.",
    explanation: "Boundary condition filtering.",
    hint: "Print star only if r==1, r==N, c==1, or c==N.",
    level: "intermediate",
    codeExample: "if (r==1 || r==n || c==1 || c==n) print(\"* \"); else print(\"  \");"
  },
  {
    question: "How do you print a Hollow Pyramid of height $N$?",
    shortAnswer: "Print `*` only at the first star (`st == 1`), last star (`st == 2*r - 1`), or bottom row (`r == N`), and spaces everywhere else.",
    explanation: "Perimeter coordinate checking.",
    hint: "Print star if st==1, st==2*r-1, or r==N.",
    level: "intermediate",
    codeExample: "if (st==1 || st==(2*r-1) || r==n) print(\"* \"); else print(\"  \");"
  },
  {
    question: "How many total stars are printed in a Right-Angled Triangle of height $N$?",
    shortAnswer: "$\\sum_{r=1}^{N} r = \\frac{N(N+1)}{2}$. For $N=4$, total stars $= 10$.",
    explanation: "Standard arithmetic triangular number formula.",
    hint: "N(N+1)/2 total stars.",
    level: "basic",
    codeExample: "// N=4: 1 + 2 + 3 + 4 = 10 stars"
  },
  {
    question: "How many total stars are printed in a Full Centered Pyramid of height $N$?",
    shortAnswer: "$\\sum_{r=1}^{N} (2r - 1) = N^2$. For $N=4$, total stars $= 16$.",
    explanation: "Sum of first $N$ odd integers equals $N^2$.",
    hint: "Sum of odd numbers = N^2 total stars.",
    level: "intermediate",
    codeExample: "// N=4: 1 + 3 + 5 + 7 = 16 stars"
  },
  {
    question: "What happens if you omit the newline statement `System.out.println()` after the inner loops?",
    shortAnswer: "All stars and spaces across all rows are printed in a single flat horizontal line, completely ruining the 2D visual structure.",
    explanation: "Row line-break is mandatory.",
    hint: "All stars collapse into a single horizontal line.",
    level: "basic",
    codeExample: "// Must call System.out.println() after inner loops!"
  },
  {
    question: "How do you print an Inverted Centered Pyramid of height $N$?",
    shortAnswer: "Outer loop $r = N \\dots 1$; spaces loop $s = 1 \\dots (N - r)$; stars loop $st = 1 \\dots (2r - 1)$.",
    explanation: "Decreases row height while using identical spacing formula.",
    hint: "Outer loop runs from N down to 1.",
    level: "basic",
    codeExample: "for (int r=n; r>=1; r--) {\n    for (int s=1; s<=n-r; s++) print(\"  \");\n    for (int st=1; st<=2*r-1; st++) print(\"* \");\n    println();\n}"
  },
  {
    question: "How do you print an Mirrored Right-Angled Triangle (aligned to the right)?",
    shortAnswer: "Spaces loop $s = 1 \\dots (N - r)$; Stars loop $c = 1 \\dots r$.",
    explanation: "Leading spaces shift the triangle to the right edge.",
    hint: "Print N-r spaces before printing r stars.",
    level: "basic",
    codeExample: "for (int s=1; s<=n-r; s++) print(\"  \");\nfor (int c=1; c<=r; c++) print(\"* \");"
  },
  {
    question: "In technical interview coding, what is the #1 trick to master any star pattern?",
    shortAnswer: "Draw a Grid Coordinate Table on paper: list Row $r$, count Spaces $s(r)$, and count Stars $st(r)$; deduce the linear formula $y = mx + c$ relating $r$ to $s$ and $st$.",
    explanation: "Translates visual shapes into precise mathematical loop bounds.",
    hint: "Tabulate row, spaces, and stars to derive linear bounding formulas.",
    level: "intermediate",
    codeExample: "// Row 1: s=3, st=1 | Row 2: s=2, st=3 -> Derive formulas s=N-r, st=2r-1"
  },
  {
    question: "How do you print a Rhombus pattern of stars?",
    shortAnswer: "Spaces loop $s = 1 \\dots (N - r)$; Stars loop $c = 1 \\dots N$ (fixed width $N$ on every row).",
    explanation: "Fixed star count shifted by progressive spaces.",
    hint: "N-r spaces followed by fixed N stars.",
    level: "basic",
    codeExample: "for (int s=1; s<=n-r; s++) print(\" \");\nfor (int c=1; c<=n; c++) print(\"*\");"
  },
  {
    question: "How do you print an Hourglass visual pattern of height $2N - 1$?",
    shortAnswer: "Combine an Inverted Pyramid ($r = N \\dots 1$) followed by a Centered Pyramid ($r = 2 \\dots N$).",
    explanation: "Inverted top half + ascending bottom half.",
    hint: "Inverted pyramid on top, upright pyramid on bottom.",
    level: "intermediate",
    codeExample: "// Top: r=N down to 1; Bottom: r=2 to N"
  },
  {
    question: "Why should developers use 2 spaces (`\"  \"`) when stars have a trailing space (`\"* \"`)?",
    shortAnswer: "To maintain equal 2-character monospace column width, ensuring symmetrical alignment across terminal fonts.",
    explanation: "Crucial for geometric visual symmetry.",
    hint: "Double space preserves 2-char monospace column width.",
    level: "basic",
    codeExample: "// Use \"  \" (2 spaces) to match width of \"* \" (2 chars)"
  },
  {
    question: "How do you print an 'X' pattern (Cross) inside an $N \\times N$ grid?",
    shortAnswer: "Print `*` if on the primary diagonal (`r == c`) or secondary diagonal (`r + c == N + 1`), else print space ` `.",
    explanation: "Diagonal matrix coordinate checks.",
    hint: "Print star if r==c or r+c==N+1.",
    level: "intermediate",
    codeExample: "if (r == c || r + c == n + 1) print(\"*\"); else print(\" \");"
  },
  {
    question: "How do you print a Plus Sign (`+`) inside an $N \\times N$ grid (where $N$ is odd)?",
    shortAnswer: "Print `*` if on the middle row (`r == (N+1)/2`) or middle column (`c == (N+1)/2`), else print space.",
    explanation: "Midpoint row and column check.",
    hint: "Print star if r==mid or c==mid.",
    level: "basic",
    codeExample: "int mid = (n + 1) / 2;\nif (r == mid || c == mid) print(\"* \"); else print(\"  \");"
  },
  {
    question: "What is the time complexity of generating a Diamond pattern of height $2N$?",
    shortAnswer: "$O(N^2)$ quadratic time complexity.",
    explanation: "Number of operations is proportional to total characters in $N \\times N$ grid.",
    hint: "O(N^2) quadratic time.",
    level: "basic",
    codeExample: "// O(N^2) total print operations"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, why are pattern problems given as the first nested loop assignment?",
    shortAnswer: "Because patterns provide instant visual feedback on loop bound bugs (a misplaced `<` immediately deforms the visual shape).",
    explanation: "Visual debugging accelerates mental model calibration.",
    hint: "Visual shape deformities instantly expose loop bound mistakes.",
    level: "basic",
    codeExample: "// Visual shapes provide immediate error detection"
  },
  {
    question: "How do you print an Butterfly pattern of height $2N$?",
    shortAnswer: "Row $r$: Left stars $r$, middle spaces $2(N - r)$, right stars $r$; repeat in reverse for lower half.",
    explanation: "Symmetrical wing expansion and contraction.",
    hint: "Left stars (r) + middle spaces (2*(N-r)) + right stars (r).",
    level: "intermediate",
    codeExample: "// Wing formula: stars=r, spaces=2*(n-r), stars=r"
  },
  {
    question: "Can `StringBuilder` be used to optimize pattern printing performance?",
    shortAnswer: "Yes! Buffering characters per row into a `StringBuilder` and calling `System.out.println(sb.toString())` once per row reduces I/O system calls by $90\\%$.",
    explanation: "High-performance console rendering technique.",
    hint: "Buffering row characters with StringBuilder reduces I/O calls.",
    level: "advanced",
    codeExample: "StringBuilder sb = new StringBuilder(); sb.append(\"* \"); System.out.println(sb);"
  },
  {
    question: "How do you print a Hollow Diamond pattern of height $2N - 1$?",
    shortAnswer: "In upper half, print `*` at `st == 1` or `st == 2*r - 1`; in lower half, print `*` at `st == 1` or `st == 2*r - 1`; spaces elsewhere.",
    explanation: "Perimeter outline of diamond shape.",
    hint: "Print star only at first and last star positions of each row.",
    level: "intermediate",
    codeExample: "if (st == 1 || st == (2 * r - 1)) print(\"* \"); else print(\"  \");"
  },
  {
    question: "What is the result of running an $N=1$ Diamond pattern?",
    shortAnswer: "A single star `*` is printed cleanly.",
    explanation: "Validates boundary edge case $N=1$.",
    hint: "Prints a single star *.",
    level: "basic",
    codeExample: "// N=1 produces exactly 1 star"
  },
  {
    question: "What coordinate relationship defines the Secondary Diagonal of an $N \\times N$ grid?",
    shortAnswer: "$r + c = N + 1$ (e.g. for $N=4$: $(1,4), (2,3), (3,2), (4,1)$).",
    explanation: "Fundamental 2D matrix anti-diagonal formula.",
    hint: "r + c == N + 1.",
    level: "intermediate",
    codeExample: "if (r + c == n + 1) print(\"/\");"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 15 for Java developers?",
    shortAnswer: "2D Visual Patterns master the orchestration of nested loops, coordinate space mapping, leading space alignment ($N-r$), and odd-step star formulas ($2r-1$) to build symmetrical geometric structures.",
    explanation: "Foundational mastery of nested loop coordinate mechanics.",
    hint: "Mastery of spaces (N-r) and odd star sequences (2r-1) in nested coordinate spaces.",
    level: "basic",
    codeExample: "// Summary: Spaces (N-r) + Stars (2r-1) = Symmetrical 2D Grid"
  },
  {
    question: "What is the next topic (Topic 16) in Module 001_005?",
    shortAnswer: "Printing numerical patterns: Floyd's triangle, Pascal's triangle foundations, binary alternating patterns.",
    explanation: "Topic 16 transitions from star patterns to numerical arithmetic patterns and binomial coefficient foundations.",
    hint: "Printing numerical patterns: Floyd's triangle, Pascal's triangle foundations.",
    level: "basic",
    codeExample: "// Topic 16: Numerical Patterns and Floyd's Triangle"
  }
];

export default questions;
