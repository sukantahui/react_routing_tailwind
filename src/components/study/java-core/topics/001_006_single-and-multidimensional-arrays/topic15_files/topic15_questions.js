/**
 * Module 001_006: Topic 15: Matrix operations: Matrix Addition, Transpose, and Matrix Multiplication
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is the dimensional precondition for Matrix Addition in Java?",
    shortAnswer: "Both matrices $A$ and $B$ must have IDENTICAL dimensions: $\\text{rows}(A) == \\text{rows}(B)$ AND $\\text{cols}(A) == \\text{cols}(B)$.",
    explanation: "Fundamental linear algebra precondition for addition.",
    hint: "Both matrices must have identical row and column dimensions.",
    level: "basic",
    codeExample: "if (a.length != b.length || a[0].length != b[0].length) throw new IllegalArgumentException();"
  },
  {
    question: "What is the Time Complexity of adding two $R \\times C$ matrices?",
    shortAnswer: "$O(R \\times C)$ linear time relative to total matrix cells.",
    explanation: "Each element pair $A[i][j] + B[i][j]$ is added once.",
    hint: "O(R * C) time complexity.",
    level: "basic",
    codeExample: "for (int i=0; i<r; i++) for (int j=0; j<c; j++) result[i][j] = a[i][j] + b[i][j];"
  },
  {
    question: "What happens to the dimensions of an $R \\times C$ matrix after Transposition?",
    shortAnswer: "The dimensions are inverted: the transposed matrix $A^T$ has dimensions $C \\times R$, where $A^T[j][i] = A[i][j]$.",
    explanation: "Row-column swapping formula.",
    hint: "Dimensions become C x R where transposed[j][i] = original[i][j].",
    level: "basic",
    codeExample: "double[][] t = new double[cols][rows]; t[j][i] = a[i][j];"
  },
  {
    question: "How do you transpose an $N \\times N$ Square Matrix in-place with $O(1)$ space?",
    shortAnswer: "Iterate only above the main diagonal: `for (int i=0; i<n; i++) for (int j=i+1; j<n; j++) swap(a[i][j], a[j][i]);`.",
    explanation: "In-place upper triangle element swapping.",
    hint: "Swap elements where j > i (above main diagonal) to avoid swapping twice.",
    level: "intermediate",
    codeExample: "for (int i=0; i<n; i++) for (int j=i+1; j<n; j++) { double t=a[i][j]; a[i][j]=a[j][i]; a[j][i]=t; }"
  },
  {
    question: "What is the dimensional precondition for Matrix Multiplication $A \\times B$?",
    shortAnswer: "The number of COLUMNS in matrix $A$ must equal the number of ROWS in matrix $B$ ($C_A == R_B$).",
    explanation: "Inner dimension compatibility rule.",
    hint: "Columns of A must equal rows of B (C_A == R_B).",
    level: "basic",
    codeExample: "if (a[0].length != b.length) throw new IllegalArgumentException(\"Incompatible dimensions\");"
  },
  {
    question: "If matrix $A$ has size $2 \\times 3$ and matrix $B$ has size $3 \\times 2$, what are the dimensions of the product matrix $A \\times B$?",
    shortAnswer: "$2 \\times 2$ (rows of $A \\times$ columns of $B$).",
    explanation: "Outer dimension result rule: $(R_A \\times C_A) \\times (R_B \\times C_B) \\to (R_A \\times C_B)$.",
    hint: "2 x 2.",
    level: "basic",
    codeExample: "double[][] result = new double[2][2];"
  },
  {
    question: "What is the Time Complexity of multiplying two $N \\times N$ square matrices using standard three nested loops?",
    shortAnswer: "$O(N^3)$ cubic time.",
    explanation: "Three nested loops from $0$ to $N-1$.",
    hint: "O(N^3) cubic time.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) for (int j=0; j<n; j++) for (int k=0; k<n; k++) res[i][j] += a[i][k]*b[k][j];"
  },
  {
    question: "What is the mathematical dot-product formula for element $C[i][j]$ in matrix multiplication?",
    shortAnswer: "$C[i][j] = \\sum_{k=0}^{C_A - 1} A[i][k] \\times B[k][j]$.",
    explanation: "Row $i$ of $A$ dot product with column $j$ of $B$.",
    hint: "sum of A[i][k] * B[k][j] for k from 0 to C_A - 1.",
    level: "intermediate",
    codeExample: "double sum = 0; for (int k = 0; k < cA; k++) sum += a[i][k] * b[k][j];"
  },
  {
    question: "In the Coder & AccoTax Barrackpore multi-campus demo, what operation combined Semester 1 and Semester 2 fees?",
    shortAnswer: "Matrix Addition (`addMatrices(sem1Fees, sem2Fees)`), adding cell-by-cell corresponding student seat balances in Indian Rupees (₹).",
    explanation: "Direct financial application of matrix addition.",
    hint: "Matrix addition added semester 1 and semester 2 fee tables cell-by-cell.",
    level: "basic",
    codeExample: "double[][] annual = addMatrices(sem1Fees, sem2Fees);"
  },
  {
    question: "Is Matrix Multiplication Commutative in Java ($A \\times B == B \\times A$)?",
    shortAnswer: "NO! In general, $A \\times B \\ne B \\times A$ in linear algebra, and often $B \\times A$ is not even dimensionally valid.",
    explanation: "Non-commutative property of matrix multiplication.",
    hint: "No, matrix multiplication is not commutative.",
    level: "basic",
    codeExample: "// A * B != B * A"
  },
  {
    question: "Is Matrix Addition Commutative ($A + B == B + A$)?",
    shortAnswer: "YES! Matrix addition is strictly commutative and associative.",
    explanation: "Linear algebra property.",
    hint: "Yes, A + B == B + A.",
    level: "basic",
    codeExample: "// A + B == B + A"
  },
  {
    question: "What is a Symmetric Matrix in Java?",
    shortAnswer: "A square matrix that is equal to its own transpose ($A == A^T$, meaning $A[i][j] == A[j][i]$ for all $i, j$).",
    explanation: "Symmetric matrix definition.",
    hint: "A square matrix where a[i][j] == a[j][i] for all cells.",
    level: "basic",
    codeExample: "if (a[i][j] != a[j][i]) return false; // Check symmetry"
  },
  {
    question: "How do you check if a square matrix is Skew-Symmetric (Antisymmetric)?",
    shortAnswer: "Verify that $A[i][j] == -A[j][i]$ for all $i, j$ and all main diagonal elements $A[i][i] == 0$.",
    explanation: "Skew-symmetric definition.",
    hint: "a[i][j] == -a[j][i] with zeros on main diagonal.",
    level: "intermediate",
    codeExample: "if (a[i][j] != -a[j][i]) return false;"
  },
  {
    question: "How can loop order optimization improve Matrix Multiplication speed on modern CPUs?",
    shortAnswer: "Reordering the 3 loops to `i -> k -> j` accesses matrix $B$ along contiguous row memory ($B[k][j]$), eliminating CPU cache misses and speeding up execution by up to $10\\times$!",
    explanation: "Hardware spatial memory cache locality optimization.",
    hint: "Loop reordering to (i, k, j) maximizes CPU L1/L2 cache hits on B[k][j].",
    level: "advanced",
    codeExample: "for (int i=0; i<n; i++) for (int k=0; k<n; k++) for (int j=0; j<n; j++) c[i][j] += a[i][k]*b[k][j];"
  },
  {
    question: "What is Strassen's Algorithm for Matrix Multiplication?",
    shortAnswer: "A divide-and-conquer algorithm that multiplies two $N \\times N$ matrices in $O(N^{\\log_2 7}) \\approx O(N^{2.807})$ time using 7 recursive multiplications instead of 8.",
    explanation: "Sub-cubic matrix multiplication theory.",
    hint: "Divide and conquer algorithm running in O(N^2.81) time.",
    level: "advanced",
    codeExample: "// Strassen's algorithm runs in O(N^2.807) time"
  },
  {
    question: "How do you subtract two matrices in Java ($A - B$)?",
    shortAnswer: "Verify identical dimensions, then calculate `result[i][j] = a[i][j] - b[i][j];` in nested loops.",
    explanation: "Matrix subtraction algorithm.",
    hint: "result[i][j] = a[i][j] - b[i][j] with matching dimensions.",
    level: "basic",
    codeExample: "result[i][j] = a[i][j] - b[i][j];"
  },
  {
    question: "How do you multiply a matrix by a Scalar number $k$ ($k \\times A$)?",
    shortAnswer: "Multiply every element by $k$: `result[i][j] = a[i][j] * k;`.",
    explanation: "Scalar matrix multiplication.",
    hint: "Multiply each cell by scalar k in O(R*C) time.",
    level: "basic",
    codeExample: "for (int i=0; i<r; i++) for (int j=0; j<c; j++) res[i][j] = a[i][j] * k;"
  },
  {
    question: "What is the Trace of a square matrix?",
    shortAnswer: "The sum of the elements along the main diagonal: $\\text{Trace}(A) = \\sum_{i=0}^{N-1} A[i][i]$.",
    explanation: "Matrix trace definition.",
    hint: "Sum of main diagonal elements: sum += a[i][i].",
    level: "basic",
    codeExample: "double trace = 0; for (int i = 0; i < n; i++) trace += a[i][i];"
  },
  {
    question: "How do you rotate an $N \\times N$ square matrix by 90 degrees clockwise in-place?",
    shortAnswer: "1. Transpose the matrix in-place (`swap(a[i][j], a[j][i])`); 2. Reverse each individual row (`swap(row[left++], row[right--])`).",
    explanation: "Classic two-step matrix rotation algorithm.",
    hint: "Transpose matrix, then reverse each row.",
    level: "intermediate",
    codeExample: "transpose(a); for (double[] row : a) reverse(row); // 90 deg clockwise rotation"
  },
  {
    question: "How do you rotate an $N \\times N$ square matrix by 90 degrees counter-clockwise in-place?",
    shortAnswer: "1. Reverse each individual row; 2. Transpose the matrix in-place.",
    explanation: "Two-step counter-clockwise matrix rotation.",
    hint: "Reverse each row, then transpose the matrix.",
    level: "intermediate",
    codeExample: "for (double[] row : a) reverse(row); transpose(a); // 90 deg counter-clockwise"
  },
  {
    question: "What is the Determinant of a $2 \\times 2$ matrix `[[a, b], [c, d]]`?",
    shortAnswer: "$\\text{det} = (a \\times d) - (b \\times c)$.",
    explanation: "2x2 determinant formula.",
    hint: "a*d - b*c.",
    level: "basic",
    codeExample: "double det = (m[0][0] * m[1][1]) - (m[0][1] * m[1][0]);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what exception is thrown if students attempt to add matrices with different row counts?",
    shortAnswer: "`java.lang.IllegalArgumentException: Matrix dimensions must match for addition!`.",
    explanation: "Defensive argument validation.",
    hint: "IllegalArgumentException.",
    level: "basic",
    codeExample: "throw new IllegalArgumentException(\"Matrix dimensions must match\");"
  },
  {
    question: "Can an array matrix be multiplied by an Identity matrix $I$?",
    shortAnswer: "YES! Multiplying any matrix $A$ by the identity matrix $I$ yields the original matrix unchanged ($A \\times I = A$).",
    explanation: "Identity matrix multiplicative property.",
    hint: "Yields original matrix A unchanged.",
    level: "basic",
    codeExample: "// A * I = A"
  },
  {
    question: "How do you traverse a matrix in Spiral Order in Java?",
    shortAnswer: "Maintain 4 boundary pointers (`top`, `bottom`, `left`, `right`) and traverse top row $\\to$ right col $\\to$ bottom row $\\to$ left col, incrementing/decrementing boundaries until pointers cross.",
    explanation: "4-pointer spiral matrix algorithm.",
    hint: "Use 4 boundaries (top, bottom, left, right) and shrink boundaries inward.",
    level: "intermediate",
    codeExample: "while (top <= bottom && left <= right) { /* traverse 4 edges */ }"
  },
  {
    question: "What is a Sparse Matrix and how is it optimized?",
    shortAnswer: "A matrix where most elements are zero; optimized in memory by storing only non-zero entries using Coordinate List (COO) or Compressed Sparse Row (CSR) formats.",
    explanation: "Sparse matrix memory optimization.",
    hint: "A matrix with mostly zeros; stored using non-zero coordinate lists to save memory.",
    level: "advanced",
    codeExample: "// Stored as list of (row, col, value) tuples"
  },
  {
    question: "What is the effect of aliasing when transposing a rectangular matrix ($R \\ne C$) into itself?",
    shortAnswer: "Rectangular in-place transposition is impossible without auxiliary space ($O(R \\times C)$) because row and column lengths differ ($R \\ne C$).",
    explanation: "Dimension inequality constraint.",
    hint: "Requires auxiliary C x R array because row and column sizes differ.",
    level: "intermediate",
    codeExample: "double[][] transposed = new double[cols][rows]; // Auxiliary array needed"
  },
  {
    question: "Why should `result[i][j] = sum;` be assigned after the inner `k` loop in matrix multiplication?",
    shortAnswer: "To keep intermediate arithmetic in a high-speed CPU register (`double sum = 0.0;`) rather than writing to Heap memory on every $k$ step.",
    explanation: "Register accumulation optimization.",
    hint: "Accumulating in local variable sum avoids repetitive heap writes.",
    level: "intermediate",
    codeExample: "double sum = 0; for (int k=0; k<cA; k++) sum += a[i][k]*b[k][j]; res[i][j] = sum;"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 15 for Java developers?",
    shortAnswer: "Matrix addition requires identical dimensions ($O(R \\times C)$); transpose inverts dimensions ($C \\times R$); matrix multiplication requires inner dimension equality ($C_A == R_B$) and runs in $O(R_A \\times C_A \\times C_B)$ time via three nested loops.",
    explanation: "Mastery of essential matrix arithmetic operations in Java.",
    hint: "Addition (identical dims), Transpose (C x R), Multiplication (C_A == R_B, O(N^3)).",
    level: "basic",
    codeExample: "// Summary: Add (A+B), Transpose (A^T), Multiply (A*B with C_A == R_B)"
  },
  {
    question: "What is the next topic (Topic 16) in Module 001_006?",
    shortAnswer: "Jagged / Ragged arrays (arrays of arrays with varying row lengths).",
    explanation: "Topic 16 explores non-rectangular jagged arrays, triangular allocation, and memory footprint advantages.",
    hint: "Jagged / Ragged arrays (arrays of arrays with varying row lengths).",
    level: "basic",
    codeExample: "// Topic 16: Jagged and Ragged Arrays in Java"
  },
  {
    question: "What is the Hadamard Product (Element-wise multiplication) of two matrices?",
    shortAnswer: "$C[i][j] = A[i][j] \\times B[i][j]$ (computed in $O(R \\times C)$ time on matrices of identical dimensions, distinct from matrix dot-product multiplication).",
    explanation: "Element-wise matrix multiplication.",
    hint: "Cell-by-cell multiplication: res[i][j] = a[i][j] * b[i][j].",
    level: "intermediate",
    codeExample: "res[i][j] = a[i][j] * b[i][j]; // Hadamard Product"
  }
];

export default questions;
