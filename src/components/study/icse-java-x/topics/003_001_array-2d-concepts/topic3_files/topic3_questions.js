const questions = [
  {
    question: "What is the mathematical condition for an element at (i, j) to belong to the Primary (Left/Principal) Diagonal of a square matrix?",
    shortAnswer: "i == j (Row index equals Column index).",
    explanation: "The Primary Diagonal stretches from the top-left corner [0][0] to the bottom-right corner [N-1][N-1]. Across this diagonal, the row index is always identical to the column index: [0][0], [1][1], [2][2], etc.",
    hint: "Both index values are equal.",
    level: "basic",
    codeExample: "if (i == j) {\n    System.out.println(\"Primary diagonal element: \" + mat[i][j]);\n}"
  },
  {
    question: "What is the mathematical condition for an element at (i, j) to belong to the Secondary (Right/Anti) Diagonal of an N x N square matrix?",
    shortAnswer: "i + j == N - 1 or j == N - 1 - i.",
    explanation: "The Secondary Diagonal extends from top-right [0][N-1] to bottom-left [N-1][0]. In an N x N matrix, the sum of row index and column index is always constant and equal to N - 1.",
    hint: "Row index plus column index equals matrix dimension minus 1.",
    level: "basic",
    codeExample: "if (i + j == n - 1) {\n    System.out.println(\"Secondary diagonal element: \" + mat[i][j]);\n}"
  },
  {
    question: "Do non-square (rectangular) matrices have standard primary and secondary diagonals in ICSE syllabus?",
    shortAnswer: "No, standard diagonal concepts apply strictly to square matrices (N x N) where row count equals column count.",
    explanation: "Diagonals connect opposite corners of a quadrilateral. In rectangular matrices (e.g. 2x4), a continuous corner-to-corner main diagonal spanning all rows and columns does not exist.",
    hint: "Diagonals are only defined for square matrices (M == N).",
    level: "basic",
    codeExample: "// int[][] rect = new int[2][4]; // Diagonals not applicable"
  },
  {
    question: "How can you traverse the Primary Diagonal in O(N) linear time using a single for loop?",
    shortAnswer: "Use a single loop: for (int i = 0; i < n; i++) { int elem = mat[i][i]; }",
    explanation: "Since row and column indices are equal on the primary diagonal (i == j), you do not need nested loops. Accessing mat[i][i] in a single loop visits all N diagonal elements in O(N) time.",
    hint: "Pass the same loop variable 'i' into both index brackets: mat[i][i].",
    level: "basic",
    codeExample: "int primarySum = 0;\nfor (int i = 0; i < n; i++) {\n    primarySum += mat[i][i];\n}"
  },
  {
    question: "How can you traverse the Secondary Diagonal in O(N) linear time using a single for loop?",
    shortAnswer: "Use a single loop: for (int i = 0; i < n; i++) { int elem = mat[i][n - 1 - i]; }",
    explanation: "Because j is always derived as n - 1 - i on the secondary diagonal, a single loop over i can access every secondary diagonal element directly.",
    hint: "Column index is calculated as n - 1 - i.",
    level: "basic",
    codeExample: "int secondarySum = 0;\nfor (int i = 0; i < n; i++) {\n    secondarySum += mat[i][n - 1 - i];\n}"
  },
  {
    question: "What is the center element overlap issue when calculating the combined sum of both diagonals for an odd-order matrix (e.g., 3x3 or 5x5)?",
    shortAnswer: "The central element (at [N/2][N/2]) lies on BOTH diagonals and gets added twice if primary and secondary diagonal sums are simply added together.",
    explanation: "In a 3x3 matrix, cell [1][1] satisfies both i == j (1==1) and i + j == N - 1 (1+1==2). Adding primarySum + secondarySum double-counts mat[1][1]. You must subtract mat[1][1] once to get the true sum.",
    hint: "Odd-dimension matrices have a central intersection cell counted by both diagonals.",
    level: "intermediate",
    codeExample: "int combinedSum = primarySum + secondarySum;\nif (n % 2 != 0) {\n    int mid = n / 2;\n    combinedSum -= mat[mid][mid]; // Subtract once\n}"
  },
  {
    question: "In a 4x4 even-order matrix, is there a single central intersection element shared by both diagonals?",
    shortAnswer: "No, even-order square matrices (2x2, 4x4, 6x6) do not have a single shared intersection cell; the diagonals cross between cells.",
    explanation: "Because N is even, no cell satisfies both i == j and i + j == N - 1 simultaneously. Thus, no deduction is required for combined diagonal sum.",
    hint: "Even dimensions do not have an exact middle element.",
    level: "intermediate",
    codeExample: "// For N = 4: primary elements are [0][0], [1][1], [2][2], [3][3]\n// secondary elements are [0][3], [1][2], [2][1], [3][0] (All disjoint!)"
  },
  {
    question: "What is the condition for elements lying Strictly Above the Primary Diagonal (Upper Triangular region)?",
    shortAnswer: "i < j (Row index is strictly less than Column index).",
    explanation: "In upper triangular elements, the column position is ahead of the row position (e.g., [0][1], [0][2], [1][2]).",
    hint: "Row index is smaller than column index.",
    level: "intermediate",
    codeExample: "if (i < j) {\n    System.out.println(\"Upper triangle element: \" + mat[i][j]);\n}"
  },
  {
    question: "What is the condition for elements lying Strictly Below the Primary Diagonal (Lower Triangular region)?",
    shortAnswer: "i > j (Row index is strictly greater than Column index).",
    explanation: "In lower triangular elements, the row position is greater than the column position (e.g., [1][0], [2][0], [2][1]).",
    hint: "Row index is greater than column index.",
    level: "intermediate",
    codeExample: "if (i > j) {\n    System.out.println(\"Lower triangle element: \" + mat[i][j]);\n}"
  },
  {
    question: "What is the condition for an element that lies on NEITHER the primary NOR the secondary diagonal (Non-Diagonal Element)?",
    shortAnswer: "i != j && i + j != n - 1",
    explanation: "An element is non-diagonal if it fails both the primary diagonal condition (i == j) and the secondary diagonal condition (i + j == n - 1).",
    hint: "Use logical AND (&&) with the negation of both diagonal conditions.",
    level: "intermediate",
    codeExample: "if (i != j && i + j != n - 1) {\n    nonDiagSum += mat[i][j];\n}"
  },
  {
    question: "How do you print the matrix in an 'X-shape' pattern (only diagonal elements with spaces for the rest)?",
    shortAnswer: "Inside nested loops, if (i == j || i + j == n - 1) print mat[i][j] + '\\t' else print '\\t'; followed by println() after the row.",
    explanation: "This displays only the diagonal elements in their natural grid coordinates while leaving all other cells blank.",
    hint: "Print the element if it meets either diagonal condition, otherwise print a space or tab.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i == j || i + j == n - 1)\n            System.out.print(mat[i][j] + \"\\t\");\n        else\n            System.out.print(\"\\t\");\n    }\n    System.out.println();\n}"
  },
  {
    question: "Given a 3x3 matrix: {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, what are the elements of the Primary Diagonal?",
    shortAnswer: "1, 5, 9 (Sum = 15)",
    explanation: "mat[0][0] = 1, mat[1][1] = 5, mat[2][2] = 9. Total sum = 1 + 5 + 9 = 15.",
    hint: "Top-left to bottom-right elements.",
    level: "basic",
    codeExample: "// Primary: mat[0][0]=1, mat[1][1]=5, mat[2][2]=9"
  },
  {
    question: "Given a 3x3 matrix: {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, what are the elements of the Secondary Diagonal?",
    shortAnswer: "3, 5, 7 (Sum = 15)",
    explanation: "mat[0][2] = 3, mat[1][1] = 5, mat[2][0] = 7. Total sum = 3 + 5 + 7 = 15.",
    hint: "Top-right to bottom-left elements.",
    level: "basic",
    codeExample: "// Secondary: mat[0][2]=3, mat[1][1]=5, mat[2][0]=7"
  },
  {
    question: "What is the result of the combined diagonal sum (without center duplication) for the matrix: {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}?",
    shortAnswer: "25 (1 + 5 + 9 + 3 + 7 = 25; 5 is counted only once).",
    explanation: "Primary sum = 15, Secondary sum = 15. Center element 5 is shared. Combined = 15 + 15 - 5 = 25.",
    hint: "Add both sums and subtract the center element 5.",
    level: "basic",
    codeExample: "// Combined sum = 15 + 15 - 5 = 25"
  },
  {
    question: "How do you find the highest (maximum) element on the primary diagonal?",
    shortAnswer: "Initialize max = mat[0][0]; loop i from 1 to n - 1 and update if (mat[i][i] > max) max = mat[i][i];",
    explanation: "Inspect only the primary diagonal cells mat[i][i] in a single loop to find the largest value.",
    hint: "Check mat[i][i] across a single loop.",
    level: "basic",
    codeExample: "int max = mat[0][0];\nfor (int i = 1; i < n; i++) {\n    if (mat[i][i] > max) max = mat[i][i];\n}"
  },
  {
    question: "How do you swap the Primary Diagonal elements with the Secondary Diagonal elements row by row?",
    shortAnswer: "In a single loop i from 0 to n - 1, swap mat[i][i] with mat[i][n - 1 - i] using a temporary variable.",
    explanation: "At each row i, the primary diagonal element is at (i, i) and secondary is at (i, n - 1 - i). Swapping these exchanges the diagonals.",
    hint: "Use temp = mat[i][i]; mat[i][i] = mat[i][n-1-i]; mat[i][n-1-i] = temp;.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n; i++) {\n    int temp = mat[i][i];\n    mat[i][i] = mat[i][n - 1 - i];\n    mat[i][n - 1 - i] = temp;\n}"
  },
  {
    question: "What is a 'Diagonal Matrix' in Mathematics and Java programming?",
    shortAnswer: "A square matrix in which all non-diagonal elements are zero (i.e., mat[i][j] == 0 for all i != j).",
    explanation: "To check if a matrix is a diagonal matrix, verify that every cell where i != j contains the value 0.",
    hint: "All elements off the primary diagonal are zero.",
    level: "intermediate",
    codeExample: "boolean isDiagonal = true;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i != j && mat[i][j] != 0) {\n            isDiagonal = false;\n            break;\n        }\n    }\n}"
  },
  {
    question: "What is a 'Scalar Matrix'?",
    shortAnswer: "A diagonal matrix whose primary diagonal elements are all equal to each other (and non-diagonal elements are 0).",
    explanation: "A scalar matrix is a diagonal matrix where mat[0][0] == mat[1][1] == ... == mat[n-1][n-1] = k.",
    hint: "Diagonal matrix where all diagonal values are identical.",
    level: "intermediate",
    codeExample: "// Scalar Matrix check: mat[i][j]==0 (i!=j) and mat[i][i] == mat[0][0] (i==j)"
  },
  {
    question: "What is an 'Identity Matrix' (Unit Matrix)?",
    shortAnswer: "A scalar matrix whose primary diagonal elements are all 1, and all non-diagonal elements are 0.",
    explanation: "For an identity matrix: mat[i][j] == 1 when i == j, and mat[i][j] == 0 when i != j.",
    hint: "1 on primary diagonal, 0 everywhere else.",
    level: "basic",
    codeExample: "boolean isIdentity = true;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i == j && mat[i][j] != 1) isIdentity = false;\n        if (i != j && mat[i][j] != 0) isIdentity = false;\n    }\n}"
  },
  {
    question: "How do you calculate the sum of elements above the secondary diagonal?",
    shortAnswer: "Condition: i + j < n - 1.",
    explanation: "Cells strictly above the secondary diagonal have row and column indices whose sum is strictly less than n - 1.",
    hint: "Sum of indices i + j is strictly less than n - 1.",
    level: "advanced",
    codeExample: "int sum = 0;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i + j < n - 1) sum += mat[i][j];\n    }\n}"
  },
  {
    question: "How do you calculate the sum of elements below the secondary diagonal?",
    shortAnswer: "Condition: i + j > n - 1.",
    explanation: "Cells strictly below the secondary diagonal have row and column indices whose sum is strictly greater than n - 1.",
    hint: "Sum of indices i + j is strictly greater than n - 1.",
    level: "advanced",
    codeExample: "int sum = 0;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i + j > n - 1) sum += mat[i][j];\n    }\n}"
  },
  {
    question: "Why does traversing diagonals with single loops take O(N) instead of O(N^2)?",
    shortAnswer: "Because there are only N elements on each diagonal; a single loop from 0 to N - 1 visits every diagonal element exactly once without checking all N^2 cells.",
    explanation: "Nested loops visit all N * N = N^2 cells. Direct indexing with mat[i][i] and mat[i][N-1-i] accesses only the relevant N elements directly.",
    hint: "Single loop has N iterations; nested loops have N^2 iterations.",
    level: "intermediate",
    codeExample: "// O(N) loop: runs N times\nfor (int i = 0; i < n; i++) { sum += mat[i][i]; }"
  },
  {
    question: "What is the trace of a matrix in Linear Algebra and ICSE programming?",
    shortAnswer: "The sum of the primary diagonal elements of a square matrix: Trace = Sum of mat[i][i] for i = 0 to N - 1.",
    explanation: "In mathematics and computer science, the 'Trace' of an N x N matrix is defined as the sum of its main diagonal entries.",
    hint: "Trace = Primary diagonal sum.",
    level: "intermediate",
    codeExample: "int trace = 0;\nfor (int i = 0; i < n; i++) trace += mat[i][i];"
  },
  {
    question: "What is the effect of writing 'mat[i][n - i]' instead of 'mat[i][n - 1 - i]' for secondary diagonal?",
    shortAnswer: "When i = 0, n - 0 = n, which accesses index n and throws an ArrayIndexOutOfBoundsException.",
    explanation: "Array indices run from 0 to n - 1. When i = 0, n - i evaluates to n, which is out of bounds.",
    hint: "Subtract 1 because array indices are 0-based: n - 1 - i.",
    level: "basic",
    codeExample: "// WRONG: mat[i][n - i]  (When i=0, accesses mat[0][n] -> CRASH!)\n// CORRECT: mat[i][n - 1 - i]"
  },
  {
    question: "What documentation must be provided in the Variable Description Table for a Diagonal Program in Section B of the ICSE exam?",
    shortAnswer: "Document sc (Scanner), n (int - matrix size), mat (int[][] - square matrix), i (int - loop counter), primarySum (int), secondarySum (int), combinedSum (int).",
    explanation: "Providing a complete variable table with correct types and descriptions secures all documentation marks in ICSE Section B.",
    hint: "Document all variables and loop counters clearly.",
    level: "board-hot",
    codeExample: "/*\n * VARIABLE TABLE:\n * n            | int     | Size of square matrix\n * mat          | int[][] | 2D square matrix\n * primarySum   | int     | Sum of Left diagonal (i == j)\n * secondarySum | int     | Sum of Right diagonal (i + j == n - 1)\n */"
  }
];

export default questions;
