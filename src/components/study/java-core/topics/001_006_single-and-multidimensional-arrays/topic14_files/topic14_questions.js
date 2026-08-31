/**
 * Module 001_006: Topic 14: Two-dimensional (2D) arrays: declaration, instantiation, and matrix visualization
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "How are 2D arrays structurally represented in Java's Heap memory?",
    shortAnswer: "In Java, 2D arrays are 'Arrays of Arrays'—an outer 1D array where each element stores a reference pointer to an independent 1D array object on the Heap (NOT a contiguous flat memory block like C/C++).",
    explanation: "Fundamental Java multidimensional memory model (JLS §10.1).",
    hint: "Arrays of arrays: an outer array of reference pointers to independent 1D array objects.",
    level: "basic",
    codeExample: "int[][] matrix = new int[3][4]; // Outer array of 3 pointers to 1D arrays of size 4"
  },
  {
    question: "What are the valid syntax forms to declare a 2D array in Java?",
    shortAnswer: "1. `int[][] a;` (Preferred/standard), 2. `int a[][];`, 3. `int[] a[];`, 4. `int []a[];`.",
    explanation: "Syntax declaration flexibility in Java.",
    hint: "int[][] a is the industry standard idiom.",
    level: "basic",
    codeExample: "int[][] grid; // Preferred declaration syntax"
  },
  {
    question: "In a 2D array `int[][] matrix = new int[3][4];`, what is `matrix.length` and `matrix[0].length`?",
    shortAnswer: "`matrix.length = 3` (number of rows), and `matrix[0].length = 4` (number of columns in row 0).",
    explanation: "Row and column dimensions.",
    hint: "matrix.length is row count (3); matrix[0].length is column count (4).",
    level: "basic",
    codeExample: "int rows = matrix.length; int cols = matrix[0].length;"
  },
  {
    question: "How do you instantiate a 2D array literal directly?",
    shortAnswer: "`int[][] matrix = {{1, 2}, {3, 4}, {5, 6}};`.",
    explanation: "Direct literal instantiation syntax.",
    hint: "Nested curly braces: {{1, 2}, {3, 4}}.",
    level: "basic",
    codeExample: "double[][] grid = {{12000.0, 15000.0}, {13000.0, 16000.0}};"
  },
  {
    question: "In the Coder & AccoTax Barrackpore multi-campus matrix, how are the 3 campuses organized?",
    shortAnswer: "As 3 rows in `campusFeeGrid`: Row 0 = Barrackpore, Row 1 = Naihati, Row 2 = Shyamnagar, with columns representing workstation seats in Indian Rupees (₹).",
    explanation: "Practical matrix mapping.",
    hint: "3 rows for Barrackpore, Naihati, and Shyamnagar campuses.",
    level: "basic",
    codeExample: "campusFeeGrid[0] // Barrackpore | campusFeeGrid[1] // Naihati"
  },
  {
    question: "What is the standard idiom for traversing a 2D matrix in Row-Major order?",
    shortAnswer: "`for (int r = 0; r < matrix.length; r++) { for (int c = 0; c < matrix[r].length; c++) { ... } }`.",
    explanation: "Nested loop matrix traversal.",
    hint: "Outer loop iterates rows (r < matrix.length), inner loop iterates columns (c < matrix[r].length).",
    level: "basic",
    codeExample: "for (int r=0; r<m.length; r++) for (int c=0; c<m[r].length; c++) print(m[r][c]);"
  },
  {
    question: "What does `Arrays.toString(matrix)` print for a 2D array vs `Arrays.deepToString(matrix)`?",
    shortAnswer: "`Arrays.toString(matrix)` prints an array of hash memory codes (e.g. `[[I@7b...`); `Arrays.deepToString(matrix)` recursively formats all nested rows and elements cleanly.",
    explanation: "Standard vs Deep string formatting.",
    hint: "Arrays.toString prints hashcodes of row pointers; Arrays.deepToString prints matrix contents.",
    level: "basic",
    codeExample: "System.out.println(Arrays.deepToString(matrix)); // [[1, 2], [3, 4]]"
  },
  {
    question: "Can the second dimension of a 2D array be omitted during instantiation (`int[][] a = new int[3][];`)?",
    shortAnswer: "YES! This creates a Jagged Array skeleton with 3 `null` row references that can be allocated individually with different column lengths later.",
    explanation: "Jagged array partial instantiation.",
    hint: "Yes, creating an array of null row references for ragged arrays.",
    level: "intermediate",
    codeExample: "int[][] jagged = new int[3][]; // jagged[0] is null initially"
  },
  {
    question: "Can the FIRST dimension be omitted during instantiation (`int[][] a = new int[][4];`)?",
    shortAnswer: "NO! The outer row dimension is MANDATORY; omitting the first dimension causes a compile-time error: `']' expected`.",
    explanation: "JVM array instantiation rule.",
    hint: "No, the outer row dimension must always be specified.",
    level: "basic",
    codeExample: "// int[][] bad = new int[][4]; // COMPILE ERROR!"
  },
  {
    question: "What is the default value of elements in a newly instantiated `int[][] m = new int[2][3];`?",
    shortAnswer: "`0` for all primitive integers.",
    explanation: "Default zero-initialization.",
    hint: "0 for all primitive int elements.",
    level: "basic",
    codeExample: "// All 6 slots contain 0"
  },
  {
    question: "What is the default value of `matrix[0]` in `int[][] matrix = new int[3][];`?",
    shortAnswer: "`null` (because the inner 1D arrays have not yet been instantiated).",
    explanation: "Reference type default value.",
    hint: "null, because inner 1D arrays are reference types.",
    level: "basic",
    codeExample: "int[][] a = new int[3][]; System.out.println(a[0]); // prints null"
  },
  {
    question: "How do you access the element at Row 2, Column 3 in a 2D array?",
    shortAnswer: "`double val = matrix[2][3];`.",
    explanation: "2D index coordinate syntax.",
    hint: "matrix[row][col].",
    level: "basic",
    codeExample: "double fee = campusFeeGrid[2][3];"
  },
  {
    question: "What is the total number of element slots in a rectangular matrix `double[R][C]`?",
    shortAnswer: "$R \\times C$ total slots.",
    explanation: "Rectangular matrix capacity.",
    hint: "R * C.",
    level: "basic",
    codeExample: "int totalElements = rows * cols;"
  },
  {
    question: "How do you calculate the sum of all elements in a 2D matrix?",
    shortAnswer: "Maintain an accumulator `double total = 0.0;` and sum `total += matrix[r][c];` inside nested loops.",
    explanation: "Nested loop accumulator pattern.",
    hint: "Accumulate total += matrix[r][c] inside nested loops.",
    level: "basic",
    codeExample: "double sum = 0; for (double[] row : grid) for (double v : row) sum += v;"
  },
  {
    question: "How do you calculate the sum of each individual row in a 2D matrix?",
    shortAnswer: "Reset a `double rowSum = 0.0;` at the start of each outer row loop iteration, and add `rowSum += matrix[r][c];` in the inner column loop.",
    explanation: "Per-row accumulator pattern.",
    hint: "Reset rowSum = 0 inside outer loop before iterating columns.",
    level: "basic",
    codeExample: "for (int r=0; r<rows; r++) { double sum = 0; for (int c=0; c<cols; c++) sum += m[r][c]; }"
  },
  {
    question: "How do you calculate the sum of each individual column in a rectangular matrix?",
    shortAnswer: "Outer loop iterates columns `c = 0 .. cols-1`, inner loop iterates rows `r = 0 .. rows-1`, accumulating `colSum += matrix[r][c];`.",
    explanation: "Column-wise matrix summation.",
    hint: "Outer loop columns, inner loop rows: colSum += matrix[r][c].",
    level: "intermediate",
    codeExample: "for (int c=0; c<cols; c++) { double sum = 0; for (int r=0; r<rows; r++) sum += m[r][c]; }"
  },
  {
    question: "What is a Square Matrix in Java?",
    shortAnswer: "A 2D matrix where the number of rows equals the number of columns (`matrix.length == matrix[0].length`).",
    explanation: "Square matrix definition.",
    hint: "A matrix where row count equals column count (N x N).",
    level: "basic",
    codeExample: "int[][] sq = new int[4][4]; // 4x4 Square Matrix"
  },
  {
    question: "How do you access the Main (Principal) Diagonal elements of an $N \\times N$ square matrix?",
    shortAnswer: "Using a single loop: `for (int i = 0; i < n; i++) process(matrix[i][i]);` (where row index equals column index).",
    explanation: "Main diagonal coordinate rule: $r == c$.",
    hint: "Single loop accessing matrix[i][i].",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) System.out.println(matrix[i][i]);"
  },
  {
    question: "How do you access the Anti-Diagonal (Secondary Diagonal) elements of an $N \\times N$ square matrix?",
    shortAnswer: "Using a single loop: `for (int i = 0; i < n; i++) process(matrix[i][n - 1 - i]);`.",
    explanation: "Secondary diagonal coordinate rule: $c == N - 1 - r$.",
    hint: "Single loop accessing matrix[i][n - 1 - i].",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n; i++) System.out.println(matrix[i][n - 1 - i]);"
  },
  {
    question: "Can an Enhanced For-Each loop traverse 2D arrays cleanly?",
    shortAnswer: "YES! `for (double[] row : campusFeeGrid) for (double fee : row) System.out.println(fee);`.",
    explanation: "Nested for-each matrix traversal.",
    hint: "Outer loop for (Type[] row : matrix), inner loop for (Type val : row).",
    level: "basic",
    codeExample: "for (double[] row : grid) for (double f : row) print(f);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what happens if an instructor accesses `campusFeeGrid[3][0]` when `rows = 3`?",
    shortAnswer: "Throws `ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3` (valid row indices are 0, 1, 2).",
    explanation: "Row boundary violation.",
    hint: "Throws ArrayIndexOutOfBoundsException because valid rows are 0, 1, 2.",
    level: "basic",
    codeExample: "// campusFeeGrid[3][0] → ArrayIndexOutOfBoundsException"
  },
  {
    question: "What is the memory overhead of a 2D array `int[1000][10]` in the 64-bit JVM with compressed OOPs?",
    shortAnswer: "1 outer array object (16B header + 4,000B references) + 1,000 inner array objects (1,000 * (16B header + 40B data + 8B padding)) $\\approx 68$ KB.",
    explanation: "JVM array of arrays memory footprint calculation.",
    hint: "Allocates 1 outer array + 1,000 separate inner 1D array objects on Heap.",
    level: "advanced",
    codeExample: "// 1 outer object + N inner objects on Heap"
  },
  {
    question: "Can two rows of a 2D array point to the exact same 1D array object (`matrix[1] = matrix[0];`)?",
    shortAnswer: "YES! In Java, rows are independent reference pointers; assigning `matrix[1] = matrix[0]` makes both rows point to the same shared 1D array in Heap memory.",
    explanation: "Aliasing in multidimensional arrays.",
    hint: "Yes, both row references point to the same shared heap object.",
    level: "intermediate",
    codeExample: "matrix[1] = matrix[0]; matrix[0][0] = 99; // matrix[1][0] is now 99!"
  },
  {
    question: "How do you create an Identity Matrix of size $N$ in Java?",
    shortAnswer: "`int[][] id = new int[n][n]; for (int i = 0; i < n; i++) id[i][i] = 1;`.",
    explanation: "Identity matrix creation algorithm.",
    hint: "Instantiate NxN grid and set diagonal elements id[i][i] = 1.",
    level: "basic",
    codeExample: "int[][] I = new int[n][n]; for (int i=0; i<n; i++) I[i][i] = 1;"
  },
  {
    question: "Can a 2D array be passed to a method and returned from a method?",
    shortAnswer: "YES! Declare the parameter/return type as `int[][]`.",
    explanation: "2D array method signatures.",
    hint: "Yes, use Type[][] as parameter and return type.",
    level: "basic",
    codeExample: "public static double[][] createGrid(int r, int c) { return new double[r][c]; }"
  },
  {
    question: "What is the difference between `Arrays.equals(m1, m2)` and `Arrays.deepEquals(m1, m2)` on 2D arrays?",
    shortAnswer: "`Arrays.equals()` compares row reference addresses (shallow); `Arrays.deepEquals()` compares all nested elements recursively (deep value equality).",
    explanation: "Shallow vs deep equality comparison.",
    hint: "Arrays.equals checks row pointers; Arrays.deepEquals checks all nested cell values.",
    level: "intermediate",
    codeExample: "boolean same = Arrays.deepEquals(matrix1, matrix2);"
  },
  {
    question: "How do you swap two entire rows in a 2D matrix in $O(1)$ time?",
    shortAnswer: "Swap their reference pointers: `double[] temp = matrix[r1]; matrix[r1] = matrix[r2]; matrix[r2] = temp;`.",
    explanation: "Constant-time row pointer swap.",
    hint: "Swap the 1D array row references in O(1) time without copying elements.",
    level: "intermediate",
    codeExample: "double[] temp = m[0]; m[0] = m[1]; m[1] = temp; // O(1) row swap!"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 14 for Java developers?",
    shortAnswer: "2D arrays in Java are 'arrays of arrays' where an outer array holds reference pointers to independent 1D heap objects, traversed using nested loops (`matrix[r][c]`) and formatted via `Arrays.deepToString()`.",
    explanation: "Mastery of 2D array structure and grid visualization.",
    hint: "Arrays of arrays with outer row pointers and inner column objects; format via Arrays.deepToString.",
    level: "basic",
    codeExample: "// Summary: double[][] grid = new double[R][C]; Arrays.deepToString(grid);"
  },
  {
    question: "What is the next topic (Topic 15) in Module 001_006?",
    shortAnswer: "Matrix operations: Matrix Addition, Transpose, and Matrix Multiplication.",
    explanation: "Topic 15 explores mathematical algorithms on 2D matrices ($O(R \\times C)$ addition, transpose, and $O(N^3)$ multiplication).",
    hint: "Matrix operations: Matrix Addition, Transpose, and Matrix Multiplication.",
    level: "basic",
    codeExample: "// Topic 15: Matrix Addition, Transpose, and Matrix Multiplication"
  },
  {
    question: "Can a 2D array have 0 rows (`new int[0][5]`) or 0 columns (`new int[5][0]`)?",
    shortAnswer: "YES! Both are legal zero-capacity 2D array configurations in Java.",
    explanation: "Zero-dimension 2D array validity.",
    hint: "Yes, both zero-row and zero-column configurations are legal in Java.",
    level: "basic",
    codeExample: "int[][] emptyRows = new int[0][5]; int[][] emptyCols = new int[5][0];"
  }
];

export default questions;
