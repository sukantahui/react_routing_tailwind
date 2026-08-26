/**
 * Module 001_005: Topic 16: Printing numerical patterns: Floyd's triangle, Pascal's triangle foundations, binary alternating patterns
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Floyd's Triangle in computer science?",
    shortAnswer: "A right-angled triangular array of consecutive natural numbers starting from 1, where row $r$ contains exactly $r$ numbers.",
    explanation: "Named after Robert W. Floyd.",
    hint: "Right triangle filled with sequential natural numbers (1, 2 3, 4 5 6).",
    level: "basic",
    codeExample: "int count = 1;\nfor (int r=1; r<=n; r++) for (int c=1; c<=r; c++) print(count++);"
  },
  {
    question: "Where must the counter variable for Floyd's Triangle be declared?",
    shortAnswer: "OUTSIDE the outer loop (`int count = 1;`), so its value persists and continuously increments across all row transitions.",
    explanation: "Declaring it inside resets it to 1 on every row.",
    hint: "Must be declared outside the outer loop to retain sequential count.",
    level: "basic",
    codeExample: "int count = 1; // Declared outside loops!"
  },
  {
    question: "How does a Binary Alternating Pattern (0/1 Chessboard Triangle) work?",
    shortAnswer: "By testing the parity sum of the row and column indices: `if ((r + c) % 2 == 0) print(1); else print(0);`.",
    explanation: "Mathematical alternating coordinate grid.",
    hint: "Checks if (r + c) % 2 == 0.",
    level: "basic",
    codeExample: "for (int r=1; r<=n; r++) for (int c=1; c<=r; c++) print((r+c)%2 == 0 ? 1 : 0);"
  },
  {
    question: "What is Pascal's Triangle in mathematics and computer science?",
    shortAnswer: "A triangular array of Binomial Coefficients $\\binom{n}{k}$, where each entry is the sum of the two numbers directly above it.",
    explanation: "Powers of binomial $(a + b)^n$.",
    hint: "Triangular array of binomial coefficients.",
    level: "intermediate",
    codeExample: "// Row 0: 1 | Row 1: 1 1 | Row 2: 1 2 1 | Row 3: 1 3 3 1"
  },
  {
    question: "What is the optimal $O(1)$ recurrence formula to generate entries in Pascal's Triangle without computing full factorials?",
    shortAnswer: "$\\text{val} = \\text{val} \\times (r - c) / (c + 1)$, where `val` starts at 1 for $c=0$.",
    explanation: "Derived from $\\binom{n}{k+1} = \\binom{n}{k} \\times \\frac{n-k}{k+1}$.",
    hint: "val = val * (r - c) / (c + 1).",
    level: "intermediate",
    codeExample: "int val = 1;\nfor (int c = 0; c <= r; c++) {\n    print(val);\n    val = val * (r - c) / (c + 1);\n}"
  },
  {
    question: "How is a Palindromic Number Pyramid constructed using nested loops?",
    shortAnswer: "1. Spaces loop $(N - r)$; 2. Ascending loop ($1 \\dots r$); 3. Descending loop ($r-1 \\dots 1$).",
    explanation: "Generates symmetric sequences like 1, 1 2 1, 1 2 3 2 1.",
    hint: "Spaces (N-r) + Ascending (1 to r) + Descending (r-1 down to 1).",
    level: "basic",
    codeExample: "// Ascending: 1..r; Descending: r-1 down to 1"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student exam token generator, how is Floyd's Triangle utilized?",
    shortAnswer: "To allocate sequential token numbers ($1 \\dots 10$) across 4 tiered lab rows in West Bengal.",
    explanation: "Demonstrates practical sequential resource allocation.",
    hint: "Allocates sequential student tokens across rows in ₹.",
    level: "basic",
    codeExample: "int token = 1; for (r..) for (c..) issueToken(token++);"
  },
  {
    question: "What is the last number in the $N$-th row of Floyd's Triangle?",
    shortAnswer: "The $N$-th triangular number: $\\frac{N(N+1)}{2}$. For $N=4$, the last number is $\\frac{4(5)}{2} = 10$.",
    explanation: "Sum of natural numbers up to $N$.",
    hint: "N(N+1)/2.",
    level: "basic",
    codeExample: "// Row 4 ends with 10 (4*5/2)"
  },
  {
    question: "How do you print an Inverted Floyd's Triangle?",
    shortAnswer: "By setting the counter to $\\frac{N(N+1)}{2}$ and decrementing (`count--`) on every inner step.",
    explanation: "Sequential decrementing numerical grid.",
    hint: "Start count at N(N+1)/2 and decrement count--.",
    level: "intermediate",
    codeExample: "int count = n*(n+1)/2;\nfor (int r=n; r>=1; r--) for (int c=1; c<=r; c++) print(count--);"
  },
  {
    question: "What is the Time Complexity of generating Pascal's Triangle up to $N$ rows using the recurrence relation?",
    shortAnswer: "$O(N^2)$ quadratic time with $O(1)$ auxiliary space.",
    explanation: "Generates all $\\approx N^2/2$ coefficients directly in a single pass without large arrays.",
    hint: "O(N^2) time with O(1) auxiliary space.",
    level: "intermediate",
    codeExample: "// O(N^2) time complexity"
  },
  {
    question: "Why does calculating Pascal's Triangle via direct factorials (`n! / (k! * (n-k)!)`) fail for $N > 20$ in Java?",
    shortAnswer: "Because $21!$ overflows a 64-bit `long` (causing negative numbers or divide-by-zero errors), whereas the recurrence relation multiplies and divides in small increments.",
    explanation: "Crucial numerical stability concept.",
    hint: "Factorials overflow long at N=21; recurrence method avoids overflow.",
    level: "intermediate",
    codeExample: "// Recurrence avoids computing large intermediate factorials"
  },
  {
    question: "How do you print a Continuous Character Pattern ('A', 'B C', 'D E F')?",
    shortAnswer: "By maintaining a character counter `char ch = 'A';` and printing `ch++` inside nested loops.",
    explanation: "Identical to Floyd's Triangle using Unicode `char` arithmetic.",
    hint: "char ch = 'A'; print(ch++);.",
    level: "basic",
    codeExample: "char ch = 'A'; for (r..) for (c..) print(ch++ + \" \");"
  },
  {
    question: "How do you print a Numerical Half-Pyramid of row numbers (1, 2 2, 3 3 3)?",
    shortAnswer: "Outer loop $r = 1 \\dots N$; inner loop $c = 1 \\dots r$, printing `r + \" \"`.",
    explanation: "Prints the outer row index repeatedly.",
    hint: "Print row variable 'r' inside inner loop.",
    level: "basic",
    codeExample: "for (int r=1; r<=n; r++) for (int c=1; c<=r; c++) print(r + \" \");"
  },
  {
    question: "How do you print a Numerical Half-Pyramid of column numbers (1, 1 2, 1 2 3)?",
    shortAnswer: "Outer loop $r = 1 \\dots N$; inner loop $c = 1 \\dots r$, printing `c + \" \"`.",
    explanation: "Prints the inner column index on each step.",
    hint: "Print column variable 'c' inside inner loop.",
    level: "basic",
    codeExample: "for (int r=1; r<=n; r++) for (int c=1; c<=r; c++) print(c + \" \");"
  },
  {
    question: "How do you print an Inverted Numerical Pyramid (1 2 3 4, 1 2 3, 1 2, 1)?",
    shortAnswer: "Outer loop $r = N \\dots 1$; inner loop $c = 1 \\dots r$, printing `c + \" \"`.",
    explanation: "Decrementing row bound with column printing.",
    hint: "Outer r=N down to 1, inner c=1..r.",
    level: "basic",
    codeExample: "for (int r=n; r>=1; r--) for (int c=1; c<=r; c++) print(c + \" \");"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how do students format numbers neatly in Floyd's Triangle?",
    shortAnswer: "Using `System.out.printf(\"%-3d\", count++)` to ensure multi-digit numbers (like 10) align evenly in columns.",
    explanation: "Formatted console output best practice.",
    hint: "Use printf(\"%-3d\", val) for tabular column alignment.",
    level: "basic",
    codeExample: "System.out.printf(\"%-4d\", floydCounter++);"
  },
  {
    question: "What mathematical property explains why Binary Alternating Triangles start with `1` on row 1, `0` on row 2, etc.?",
    shortAnswer: "When $(r + c)$ is even, the remainder $(r+c) \\% 2 == 0$ evaluates to 1; on coordinates where $(r+c)$ is odd, it evaluates to 0.",
    explanation: "Coordinate parity check.",
    hint: "Even coordinate sums give 1; odd coordinate sums give 0.",
    level: "basic",
    codeExample: "// (1,1)=2 (1) | (2,1)=3 (0) | (2,2)=4 (1)"
  },
  {
    question: "How do you print a Zig-Zag Numerical Matrix?",
    shortAnswer: "For even rows, iterate columns forward ($1 \\dots C$); for odd rows, iterate columns backward ($C \\dots 1$).",
    explanation: "Serpentine / Snake matrix traversal.",
    hint: "Even rows forward (1..C), odd rows backward (C..1).",
    level: "intermediate",
    codeExample: "if (r % 2 == 0) for (c=1; c<=C; c++) ... else for (c=C; c>=1; c--) ..."
  },
  {
    question: "What is a Spiral Matrix pattern in Java?",
    shortAnswer: "Traversing an $N \\times N$ grid in a clockwise spiral using 4 boundary pointers: `top`, `bottom`, `left`, and `right`.",
    explanation: "Classic high-frequency coding interview problem.",
    hint: "Uses 4 pointers: top, bottom, left, right.",
    level: "advanced",
    codeExample: "// 4 pointers: top, bottom, left, right updated per perimeter traversal"
  },
  {
    question: "How do you print a Numerical Diamond (e.g. 1 / 1 2 1 / 1 2 3 2 1 / 1 2 1 / 1)?",
    shortAnswer: "Top half: Palindromic Pyramid ($r = 1 \\dots N$); Bottom half: Inverted Palindromic Pyramid ($r = N-1 \\dots 1$).",
    explanation: "Combines two palindromic pyramid half-loops.",
    hint: "Palindromic pyramid on top (1..N) + inverted palindromic pyramid on bottom (N-1..1).",
    level: "intermediate",
    codeExample: "// Top: r=1..N; Bottom: r=N-1 down to 1"
  },
  {
    question: "What is the sum of all elements in Row $N$ of Pascal's Triangle (0-indexed)?",
    shortAnswer: "$2^N$. For example, Row 3 ($1, 3, 3, 1$) sums to $1 + 3 + 3 + 1 = 8 = 2^3$.",
    explanation: "Binomial theorem property: $\\sum \\binom{n}{k} = 2^n$.",
    hint: "Sum of row N = 2^N.",
    level: "intermediate",
    codeExample: "// Row 3 sum = 1 + 3 + 3 + 1 = 8 = 2^3"
  },
  {
    question: "How do you print a 0-1 Binary Rectangle Matrix (Chessboard)?",
    shortAnswer: "Nested loops $r = 1 \\dots R$, $c = 1 \\dots C$, printing `((r + c) % 2 == 0 ? \"W \" : \"B \")`.",
    explanation: "2D grid chessboard pattern.",
    hint: "(r + c) % 2 determines black vs white squares.",
    level: "basic",
    codeExample: "for (r..) for (c..) print((r+c)%2 == 0 ? \"1 \" : \"0 \");"
  },
  {
    question: "How many total numbers are printed in Floyd's Triangle of $N$ rows?",
    shortAnswer: "$\\frac{N(N+1)}{2}$.",
    explanation: "Standard sum of first $N$ natural numbers.",
    hint: "N(N+1)/2 total numbers.",
    level: "basic",
    codeExample: "// N=4 -> 10 total numbers"
  },
  {
    question: "What happens if you accidentally write `floydCounter` without incrementing (`floydCounter` instead of `floydCounter++`)?",
    shortAnswer: "The number `1` is printed repeatedly across all positions instead of consecutive increasing numbers.",
    explanation: "Missing counter mutation.",
    hint: "Prints 1 repeatedly across all coordinates.",
    level: "basic",
    codeExample: "// Bug: print(floydCounter); -> prints 1 everywhere"
  },
  {
    question: "Can Pascal's Triangle be computed using a 2D Array `int[][] pascal` in $O(N^2)$ space?",
    shortAnswer: "Yes! `pascal[r][c] = pascal[r-1][c-1] + pascal[r-1][c]`, with `pascal[r][0] = pascal[r][r] = 1`.",
    explanation: "Standard Dynamic Programming formulation.",
    hint: "pascal[r][c] = pascal[r-1][c-1] + pascal[r-1][c].",
    level: "intermediate",
    codeExample: "pascal[r][c] = pascal[r-1][c-1] + pascal[r-1][c];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore curriculum, why is Pascal's Triangle taught right after Floyd's Triangle?",
    shortAnswer: "Because it shows students how to transition from simple persistent counting to mathematical recurrence relations and dynamic programming.",
    explanation: "Bridges basic loops to advanced algorithmic design.",
    hint: "Bridges loop counting to mathematical recurrence relations.",
    level: "basic",
    codeExample: "// Floyd -> Sequential Count | Pascal -> Binomial Recurrence"
  },
  {
    question: "How do you print a Numerical Hollow Box (e.g. 1 1 1 1 / 1 0 0 1 / 1 1 1 1)?",
    shortAnswer: "Print `1` on boundary coordinates (`r == 1 || r == N || c == 1 || c == N`), otherwise print `0`.",
    explanation: "Boundary logic for binary matrices.",
    hint: "Print 1 on border coordinates, 0 inside.",
    level: "basic",
    codeExample: "if (r==1 || r==n || c==1 || c==n) print(\"1 \"); else print(\"0 \");"
  },
  {
    question: "What is the symmetry property of Pascal's Triangle?",
    shortAnswer: "$\\binom{n}{k} = \\binom{n}{n-k}$, meaning each row is a perfect numerical palindrome reading the same forward and backward.",
    explanation: "Binomial coefficient reflection symmetry.",
    hint: "Each row is a perfect palindrome: C(n,k) = C(n, n-k).",
    level: "intermediate",
    codeExample: "// Row 4: 1 4 6 4 1 (Symmetrical)"
  },
  {
    question: "What is the ultimate takeaway of Module 001_005 Topic 16 for Java developers?",
    shortAnswer: "Numerical patterns fuse nested loop coordinate mechanics with mathematical algorithms (Floyd's sequential accumulation, coordinate parity, palindromic pyramids, and Pascal's binomial recurrence relations).",
    explanation: "Mastery of numerical and algorithmic pattern generation.",
    hint: "Fusing loop coordinate mechanics with mathematical recurrences and parity checks.",
    level: "basic",
    codeExample: "// Summary: Floyd (count++) | Parity ((r+c)%2) | Pascal (val*(r-c)/(c+1))"
  },
  {
    question: "What is the next topic (Topic 17) in Module 001_005?",
    shortAnswer: "Solving number-based loop problems: Prime number check, Armstrong number, Palindrome number, Factorial, Fibonacci series.",
    explanation: "Topic 17 synthesizes all loop concepts to solve the classic suite of algorithmic number theory problems.",
    hint: "Solving number-based loop problems: Prime, Armstrong, Palindrome, Fibonacci.",
    level: "basic",
    codeExample: "// Topic 17: Classic Number Theory Loop Problems"
  }
];

export default questions;
