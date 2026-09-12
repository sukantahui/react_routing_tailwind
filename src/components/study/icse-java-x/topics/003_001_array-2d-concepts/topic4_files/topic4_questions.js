const questions = [
  {
    question: "What is the mandatory mathematical condition for adding or subtracting two matrices?",
    shortAnswer: "Both matrices must have the exact same dimensions (equal number of rows and equal number of columns: M1 == M2 and N1 == N2).",
    explanation: "Matrix addition and subtraction are element-wise operations (C[i][j] = A[i][j] +/- B[i][j]). If dimensions differ (e.g. 2x3 and 3x2), corresponding elements do not exist and addition is mathematically undefined.",
    hint: "Matrices of different orders cannot be added or subtracted.",
    level: "basic",
    codeExample: "if (a.length != b.length || a[0].length != b[0].length) {\n    System.out.println(\"Addition not possible: Dimensions do not match!\");\n}"
  },
  {
    question: "What is the mathematical formula for element-wise Matrix Addition?",
    shortAnswer: "C[i][j] = A[i][j] + B[i][j] for all valid row indices i and column indices j.",
    explanation: "Each element in the resultant matrix C is obtained by adding the element at position (i, j) in matrix A to the element at position (i, j) in matrix B.",
    hint: "Add elements sharing the same coordinate indices.",
    level: "basic",
    codeExample: "int[][] c = new int[rows][cols];\nfor (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n        c[i][j] = a[i][j] + b[i][j];\n    }\n}"
  },
  {
    question: "What is the mathematical formula for element-wise Matrix Subtraction?",
    shortAnswer: "D[i][j] = A[i][j] - B[i][j] for all valid row indices i and column indices j.",
    explanation: "Each element in the resultant matrix D is calculated by subtracting B[i][j] from A[i][j]. Notice that unlike addition, subtraction is non-commutative: A - B != B - A.",
    hint: "Subtract the second matrix element from the first matrix element.",
    level: "basic",
    codeExample: "diff[i][j] = a[i][j] - b[i][j];"
  },
  {
    question: "Is Matrix Addition commutative in Java programming (i.e. A + B == B + A)?",
    shortAnswer: "Yes, because integer addition is commutative: a[i][j] + b[i][j] == b[i][j] + a[i][j].",
    explanation: "Since every individual element is computed via standard integer addition, the resultant matrix for A + B is identical to B + A in both dimensions and cell values.",
    hint: "Order does not matter in addition.",
    level: "basic",
    codeExample: "// a[i][j] + b[i][j] produces the same value as b[i][j] + a[i][j]"
  },
  {
    question: "Is Matrix Subtraction commutative (i.e. does A - B equal B - A)?",
    shortAnswer: "No, A - B != B - A (in fact, B - A = -(A - B)).",
    explanation: "Integer subtraction is anti-symmetric: 5 - 2 = 3, but 2 - 5 = -3. Therefore, reversing the operand matrices produces negated values in the resulting matrix.",
    hint: "Subtraction order changes signs of all elements.",
    level: "basic",
    codeExample: "// If a[0][0] = 10, b[0][0] = 4:\n// a - b = 6\n// b - a = -6"
  },
  {
    question: "What is the time complexity of adding two M x N matrices?",
    shortAnswer: "O(M * N) linear time with respect to the total number of element cells.",
    explanation: "Every cell (i, j) is visited exactly once to perform one addition operation. For M rows and N columns, exactly M * N additions occur.",
    hint: "One addition per cell across the grid.",
    level: "intermediate",
    codeExample: "// 3 rows * 3 cols = 9 addition operations -> O(M*N)"
  },
  {
    question: "What is the space complexity of storing the result of matrix addition?",
    shortAnswer: "O(M * N) auxiliary space to store the resultant sum array C.",
    explanation: "A new 2D array of size M x N is instantiated on the Heap to hold the calculated sum values.",
    hint: "Resultant array requires M * N memory slots.",
    level: "intermediate",
    codeExample: "int[][] c = new int[m][n]; // Allocates M * N slots"
  },
  {
    question: "Can matrix addition be performed 'in-place' without allocating a third matrix C?",
    shortAnswer: "Yes, by adding elements directly into Matrix A: a[i][j] += b[i][j];",
    explanation: "In-place addition mutates Matrix A directly, saving O(M * N) auxiliary heap memory. However, the original values of Matrix A are overwritten.",
    hint: "Use the compound addition assignment operator += on matrix a.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        a[i][j] += b[i][j]; // In-place update\n    }\n}"
  },
  {
    question: "What is Scalar Multiplication of a matrix by a constant factor 'k'?",
    shortAnswer: "Multiplying every individual element of the matrix by the scalar integer 'k': Result[i][j] = k * A[i][j].",
    explanation: "Scalar multiplication scales the entire matrix uniformly. For example, multiplying a matrix by 2 doubles every entry.",
    hint: "Multiply each cell by the scalar multiplier.",
    level: "basic",
    codeExample: "int k = 3;\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        scaled[i][j] = k * a[i][j];\n    }\n}"
  },
  {
    question: "What is a 'Null Matrix' (Zero Matrix) in matrix algebra?",
    shortAnswer: "A matrix in which all elements are zero (A[i][j] == 0 for all i, j).",
    explanation: "A null matrix acts as the additive identity: A + O = A, where O is the zero matrix of the same dimension.",
    hint: "Every element in a null matrix is 0.",
    level: "basic",
    codeExample: "int[][] nullMat = new int[3][3]; // All cells are 0 by default in Java"
  },
  {
    question: "How do you check if two matrices A and B are identical (equal in dimensions and values)?",
    shortAnswer: "Check that both row and column dimensions match, then verify that a[i][j] == b[i][j] for every cell.",
    explanation: "If any single cell differs or dimensions do not match, the matrices are not equal. Use a boolean flag and break immediately upon mismatch.",
    hint: "All corresponding cells must be strictly equal.",
    level: "intermediate",
    codeExample: "boolean areEqual = true;\nif (a.length != b.length || a[0].length != b[0].length) {\n    areEqual = false;\n} else {\n    for (int i = 0; i < a.length; i++) {\n        for (int j = 0; j < a[0].length; j++) {\n            if (a[i][j] != b[i][j]) { areEqual = false; break; }\n        }\n    }\n}"
  },
  {
    question: "Given Matrix A = {{2, 4}, {6, 8}} and Matrix B = {{1, 3}, {5, 7}}, what is A + B?",
    shortAnswer: "{{3, 7}, {11, 15}}",
    explanation: "Sum[0][0] = 2+1=3, Sum[0][1] = 4+3=7, Sum[1][0] = 6+5=11, Sum[1][1] = 8+7=15.",
    hint: "Add corresponding pairs: 2+1, 4+3, 6+5, 8+7.",
    level: "basic",
    codeExample: "// Result: [[3, 7], [11, 15]]"
  },
  {
    question: "Given Matrix A = {{10, 20}, {30, 40}} and Matrix B = {{3, 5}, {7, 9}}, what is A - B?",
    shortAnswer: "{{7, 15}, {23, 31}}",
    explanation: "Diff[0][0] = 10-3=7, Diff[0][1] = 20-5=15, Diff[1][0] = 30-7=23, Diff[1][1] = 40-9=31.",
    hint: "Subtract: 10-3, 20-5, 30-7, 40-9.",
    level: "basic",
    codeExample: "// Result: [[7, 15], [23, 31]]"
  },
  {
    question: "What is the difference between Matrix Addition and Matrix Multiplication?",
    shortAnswer: "Matrix addition is element-wise (A[i][j] + B[i][j]) requiring equal dimensions M x N. Matrix multiplication computes row-by-column dot products (requiring cols(A) == rows(B)).",
    explanation: "Matrix addition simply pairs corresponding cells. Matrix multiplication multiplies row vectors of A by column vectors of B and sums them, requiring column dimension of A to match row dimension of B.",
    hint: "Addition is element-by-element; multiplication is dot product of rows and columns.",
    level: "intermediate",
    codeExample: "// Addition: c[i][j] = a[i][j] + b[i][j];\n// Multiplication: c[i][j] += a[i][k] * b[k][j];"
  },
  {
    question: "How do you compute 2A + 3B for two matrices A and B in Java?",
    shortAnswer: "result[i][j] = 2 * a[i][j] + 3 * b[i][j]; inside the nested loops.",
    explanation: "Linear combination applies scalar coefficients directly to each element before summation.",
    hint: "Combine scalar multiplications and addition in the loop body.",
    level: "intermediate",
    codeExample: "int[][] res = new int[m][n];\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        res[i][j] = 2 * a[i][j] + 3 * b[i][j];\n    }\n}"
  },
  {
    question: "What happens if a student attempts to add a 2x3 matrix and a 3x2 matrix in Java?",
    shortAnswer: "An ArrayIndexOutOfBoundsException occurs when loop indices attempt to access non-existent rows or columns.",
    explanation: "A 2x3 array has 2 rows and 3 cols. A 3x2 array has 3 rows and 2 cols. Accessing b[i][j] when j = 2 crashes because b[i] only has indices 0 and 1.",
    hint: "Differing dimensions will exceed the sub-array length.",
    level: "basic",
    codeExample: "// a is 2x3, b is 3x2\n// Accessing b[0][2] throws ArrayIndexOutOfBoundsException"
  },
  {
    question: "What is the additive inverse of a matrix A?",
    shortAnswer: "The negative matrix -A, where each element is -A[i][j], such that A + (-A) = Zero Matrix.",
    explanation: "Negating each element produces a matrix that, when added to A, results in all zero elements.",
    hint: "Negate every cell: -1 * A[i][j].",
    level: "intermediate",
    codeExample: "int[][] inv = new int[m][n];\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        inv[i][j] = -a[i][j];\n    }\n}"
  },
  {
    question: "How do you display Matrix A, Matrix B, and their Sum side-by-side on the console?",
    shortAnswer: "In a single row loop, print row i of Matrix A, followed by ' + ', row i of Matrix B, followed by ' = ', and row i of Sum Matrix.",
    explanation: "Formatting equations horizontally enhances presentation in terminal outputs and reports.",
    hint: "Print parts of all three matrices on each line before calling println().",
    level: "advanced",
    codeExample: "for (int i = 0; i < m; i++) {\n    // Print row i of A\n    for (int j = 0; j < n; j++) System.out.print(a[i][j] + \" \");\n    System.out.print(i == m/2 ? \" +  \" : \"    \");\n    // Print row i of B\n    for (int j = 0; j < n; j++) System.out.print(b[i][j] + \" \");\n    System.out.print(i == m/2 ? \" =  \" : \"    \");\n    // Print row i of Sum\n    for (int j = 0; j < n; j++) System.out.print(sum[i][j] + \" \");\n    System.out.println();\n}"
  },
  {
    question: "How do you calculate the sum of all elements in the Resultant Sum Matrix?",
    shortAnswer: "Sum all elements of Matrix A and Matrix B: TotalSum(A + B) = TotalSum(A) + TotalSum(B).",
    explanation: "By linearity of addition, the grand total of matrix (A + B) is simply the sum of grand totals of A and B.",
    hint: "Sum of resultant matrix equals the sum of individual grand totals.",
    level: "basic",
    codeExample: "int grandSum = 0;\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        grandSum += sum[i][j];\n    }\n}"
  },
  {
    question: "Can matrix addition be applied to double precision floating-point arrays?",
    shortAnswer: "Yes, declare double[][] a, double[][] b, double[][] sum and perform sum[i][j] = a[i][j] + b[i][j];",
    explanation: "The logic is identical regardless of numeric primitive data type (byte, short, int, long, float, double).",
    hint: "Works identically for double arrays.",
    level: "basic",
    codeExample: "double[][] sum = new double[m][n];\nsum[i][j] = a[i][j] + b[i][j];"
  },
  {
    question: "How do you check if Matrix B is the transpose of Matrix A during addition?",
    shortAnswer: "Check if A is square and b[i][j] == a[j][i] for all i, j.",
    explanation: "The transpose flips rows and columns. If B is the transpose of A, then A + B produces a symmetric matrix.",
    hint: "Transpose swaps row and column indices: a[j][i].",
    level: "intermediate",
    codeExample: "// A + A^T is always a symmetric matrix!"
  },
  {
    question: "Why should we validate that user-entered dimensions m and n are positive before creating matrices?",
    shortAnswer: "Passing zero or negative numbers to array constructor throws a NegativeArraySizeException at runtime.",
    explanation: "Array dimensions must be non-negative integers. Validating input ensures robust, error-free program execution.",
    hint: "Negative sizes cause NegativeArraySizeException.",
    level: "basic",
    codeExample: "if (m <= 0 || n <= 0) {\n    System.out.println(\"Invalid dimension: Must be > 0\");\n}"
  },
  {
    question: "How many nested loops are required to input two matrices and compute their sum?",
    shortAnswer: "Three separate pairs of nested loops (one pair for Matrix A input, one pair for Matrix B input, and one pair for computing/displaying the sum) or can be combined.",
    explanation: "Modular coding separates input of A, input of B, computation of sum, and output for clarity and readability.",
    hint: "Input A, Input B, Compute Sum, Display Result.",
    level: "basic",
    codeExample: "// Loop 1: Input A\n// Loop 2: Input B\n// Loop 3: Compute & Display Sum"
  },
  {
    question: "What is the associative property of matrix addition?",
    shortAnswer: "(A + B) + C = A + (B + C) for matrices of identical dimensions.",
    explanation: "Grouping does not change the result of adding three or more matrices.",
    hint: "Parentheses grouping does not affect the final matrix sum.",
    level: "intermediate",
    codeExample: "// (A + B) + C == A + (B + C)"
  },
  {
    question: "What variables must be documented in the Variable Description Table for a Matrix Addition program in Section B of the ICSE exam?",
    shortAnswer: "Document sc (Scanner), m (int - row count), n (int - col count), a (int[][] - first matrix), b (int[][] - second matrix), sum (int[][] - resultant matrix), i (int - row index), j (int - col index).",
    explanation: "A complete table covering all inputs, arrays, loop indices, and output matrices guarantees full documentation marks.",
    hint: "List all matrices, dimensions, and loop indices.",
    level: "board-hot",
    codeExample: "/*\n * VARIABLE TABLE:\n * m    | int     | Number of rows\n * n    | int     | Number of columns\n * a    | int[][] | First operand matrix\n * b    | int[][] | Second operand matrix\n * sum  | int[][] | Stores element-wise sum (a[i][j] + b[i][j])\n */"
  }
];

export default questions;
