const questions = [
  {
    question: "What is the logical condition to identify Boundary (Border) Elements in an N x N or M x N matrix?",
    shortAnswer: "i == 0 || i == rows - 1 || j == 0 || j == cols - 1",
    explanation: "Boundary elements reside on the outermost perimeter of the matrix: the top row (i == 0), the bottom row (i == rows - 1), the left column (j == 0), and the right column (j == cols - 1).",
    hint: "Element is in the first or last row, or the first or last column.",
    level: "basic",
    codeExample: "if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {\n    System.out.print(mat[i][j] + \"\\t\");\n    boundarySum += mat[i][j];\n}"
  },
  {
    question: "What is the logical condition to identify Non-Boundary (Inner/Interior) Elements of a matrix?",
    shortAnswer: "i > 0 && i < rows - 1 && j > 0 && j < cols - 1",
    explanation: "Non-boundary elements are all elements that do not belong to the outer perimeter (i.e. strictly inside the boundary).",
    hint: "Elements enclosed strictly between row 1 to rows - 2 and col 1 to cols - 2.",
    level: "basic",
    codeExample: "if (i > 0 && i < m - 1 && j > 0 && j < n - 1) {\n    innerSum += mat[i][j];\n}"
  },
  {
    question: "What is the Transpose of a matrix, and what is its indexing formula?",
    shortAnswer: "The transpose interchanges rows and columns: Transpose[j][i] = Original[i][j].",
    explanation: "If original matrix A is of dimension M x N, its transpose B is of dimension N x M, where the element at row i and column j in A moves to row j and column i in B.",
    hint: "Row index becomes column index, and column index becomes row index.",
    level: "basic",
    codeExample: "int[][] trans = new int[cols][rows];\nfor (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n        trans[j][i] = a[i][j];\n    }\n}"
  },
  {
    question: "How do you check if a square matrix is 'Symmetric' in Java?",
    shortAnswer: "Check if the matrix is identical to its transpose: mat[i][j] == mat[j][i] for all cells (i, j).",
    explanation: "A matrix is symmetric if reflecting across the primary diagonal yields the exact same values. If any pair mat[i][j] != mat[j][i], the matrix is not symmetric.",
    hint: "Every element mat[i][j] must equal mat[j][i].",
    level: "intermediate",
    codeExample: "boolean isSymmetric = true;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (mat[i][j] != mat[j][i]) { isSymmetric = false; break; }\n    }\n}"
  },
  {
    question: "How can the Symmetric matrix check be optimized so we don't compare elements twice?",
    shortAnswer: "Only check elements in the strictly upper triangular region: for (int i = 0; i < n; i++) { for (int j = i + 1; j < n; j++) ... }",
    explanation: "Primary diagonal elements (i == j) are always equal to themselves. Comparing pairs where j > i checks each unique pair (i, j) against (j, i) exactly once, reducing comparisons from N^2 to N*(N-1)/2.",
    hint: "Inner loop starts from j = i + 1.",
    level: "advanced",
    codeExample: "boolean sym = true;\nfor (int i = 0; i < n; i++) {\n    for (int j = i + 1; j < n; j++) {\n        if (mat[i][j] != mat[j][i]) { sym = false; break; }\n    }\n}"
  },
  {
    question: "What is a 'Skew-Symmetric' matrix?",
    shortAnswer: "A square matrix where the transpose equals its negation: mat[i][j] == -mat[j][i], and all primary diagonal elements are 0.",
    explanation: "Since mat[i][i] == -mat[i][i] means 2*mat[i][i] == 0, the main diagonal must consist entirely of zeros, and off-diagonal elements are opposite in sign.",
    hint: "Diagonal is all zeros, and transposed elements have opposite signs.",
    level: "intermediate",
    codeExample: "// Skew-symmetric: mat[i][i] == 0 && mat[i][j] == -mat[j][i]"
  },
  {
    question: "How do you display only the Upper Triangular Matrix (elements on and above the primary diagonal)?",
    shortAnswer: "Nested loops where if (j >= i) print mat[i][j] + '\\t' else print '\\t'; followed by println().",
    explanation: "On and above the main diagonal, column index j is greater than or equal to row index i (j >= i). All elements below (j < i) are printed as blank spaces.",
    hint: "Condition for upper triangle is j >= i.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (j >= i) System.out.print(mat[i][j] + \"\\t\");\n        else System.out.print(\"\\t\");\n    }\n    System.out.println();\n}"
  },
  {
    question: "How do you display only the Lower Triangular Matrix (elements on and below the primary diagonal)?",
    shortAnswer: "Nested loops where if (i >= j) print mat[i][j] + '\\t' else print '\\t'; followed by println().",
    explanation: "On and below the main diagonal, row index i is greater than or equal to column index j (i >= j).",
    hint: "Condition for lower triangle is i >= j.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i >= j) System.out.print(mat[i][j] + \"\\t\");\n        else System.out.print(\"\\t\");\n    }\n    System.out.println();\n}"
  },
  {
    question: "How do you reverse (mirror) each row of an N x N matrix horizontally?",
    shortAnswer: "In each row i, swap mat[i][j] with mat[i][n - 1 - j] for j from 0 to (n / 2) - 1.",
    explanation: "Iterating j up to n/2 swaps the first element with the last, second with second-last, effectively mirroring each row horizontally.",
    hint: "Swap column j with column n - 1 - j up to the midpoint.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n / 2; j++) {\n        int temp = mat[i][j];\n        mat[i][j] = mat[i][n - 1 - j];\n        mat[i][n - 1 - j] = temp;\n    }\n}"
  },
  {
    question: "How do you rotate a square matrix by 90 degrees clockwise in Java?",
    shortAnswer: "Step 1: Compute the Transpose of the matrix; Step 2: Reverse each row horizontally.",
    explanation: "Transposing flips the matrix across the primary diagonal ($A[i][j] \\to A[j][i]$). Reversing each row horizontally turns it into a 90-degree clockwise rotation.",
    hint: "90° Clockwise Rotation = Transpose + Row Reversal.",
    level: "advanced",
    codeExample: "// 1. Transpose in-place\nfor (int i = 0; i < n; i++) {\n    for (int j = i + 1; j < n; j++) {\n        int temp = a[i][j];\n        a[i][j] = a[j][i];\n        a[j][i] = temp;\n    }\n}\n// 2. Reverse each row\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n / 2; j++) {\n        int temp = a[i][j];\n        a[i][j] = a[i][n - 1 - j];\n        a[i][n - 1 - j] = temp;\n    }\n}"
  },
  {
    question: "What is a 'Saddle Point' of a matrix in ICSE Board questions?",
    shortAnswer: "An element that is the minimum in its row AND the maximum in its column.",
    explanation: "To find a saddle point: 1) For each row i, find the minimum element and its column index colIdx; 2) Check if that element is the maximum in that column colIdx. If yes, it is a saddle point.",
    hint: "Smallest in its row and largest in its column.",
    level: "board-hot",
    codeExample: "// Row min must equal Col max"
  },
  {
    question: "How many total boundary elements exist in an N x N square matrix?",
    shortAnswer: "Total boundary elements = 4 * N - 4 (or 4 * (N - 1)).",
    explanation: "Top row (N) + Bottom row (N) + Left col excluding corners (N-2) + Right col excluding corners (N-2) = 2N + 2N - 4 = 4N - 4.",
    hint: "Four sides minus four corner overlaps.",
    level: "basic",
    codeExample: "// For N = 3: 4(3) - 4 = 8 boundary elements (1 center non-boundary)\n// For N = 4: 4(4) - 4 = 12 boundary elements (4 center non-boundary)"
  },
  {
    question: "How many non-boundary elements exist in an N x N square matrix?",
    shortAnswer: "Non-boundary count = (N - 2) * (N - 2) for N >= 2.",
    explanation: "Removing 2 rows (top & bottom) and 2 columns (left & right) leaves an inner sub-matrix of size (N - 2) x (N - 2).",
    hint: "(N - 2) squared.",
    level: "basic",
    codeExample: "// For N = 3: (3-2)*(3-2) = 1 non-boundary element\n// For N = 4: (4-2)*(4-2) = 4 non-boundary elements"
  },
  {
    question: "How do you calculate the sum of elements in the four corners of an M x N matrix?",
    shortAnswer: "Corner Sum = mat[0][0] + mat[0][n - 1] + mat[m - 1][0] + mat[m - 1][n - 1];",
    explanation: "The four corner coordinates are: Top-Left (0, 0), Top-Right (0, N-1), Bottom-Left (M-1, 0), and Bottom-Right (M-1, N-1).",
    hint: "Directly access the 4 corner index pairs.",
    level: "basic",
    codeExample: "int cornerSum = mat[0][0] + mat[0][n - 1] + mat[m - 1][0] + mat[m - 1][n - 1];"
  },
  {
    question: "How do you check if a matrix is an 'Orthogonal Matrix'?",
    shortAnswer: "Check if the product of the matrix and its transpose equals the Identity Matrix (A * A^T == I).",
    explanation: "Multiply matrix A by its transpose A^T and verify that the resulting matrix is an identity matrix (1s on diagonal, 0s elsewhere).",
    hint: "A * Transpose(A) = Identity Matrix.",
    level: "advanced",
    codeExample: "// Product of A and Transpose(A) yields Identity matrix"
  },
  {
    question: "How do you sort each individual row of a 2D matrix in ascending order using Bubble Sort?",
    shortAnswer: "Iterate through each row i, and apply standard Bubble Sort algorithm to that 1D row array: mat[i].",
    explanation: "Outer loop fixes row i (0 to m-1). For that row, perform standard bubble sort passes on mat[i][k] and mat[i][k+1].",
    hint: "Apply 1D sorting to each row independently.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < m; i++) {\n    for (int p = 0; p < n - 1; p++) {\n        for (int q = 0; q < n - 1 - p; q++) {\n            if (mat[i][q] > mat[i][q + 1]) {\n                int t = mat[i][q];\n                mat[i][q] = mat[i][q + 1];\n                mat[i][q + 1] = t;\n            }\n        }\n    }\n}"
  },
  {
    question: "How do you sort all elements of an entire N x N matrix in ascending order?",
    shortAnswer: "Flatten the 2D array into a 1D array of size N^2, sort the 1D array (e.g. via Bubble Sort), and repopulate the 2D matrix row by row.",
    explanation: "Transforming to 1D simplifies sorting into a standard algorithm, after which elements are written back into matrix[i][j].",
    hint: "Transfer to 1D array, sort 1D array, transfer back to 2D.",
    level: "intermediate",
    codeExample: "int[] flat = new int[m * n];\nint k = 0;\nfor (int i = 0; i < m; i++)\n    for (int j = 0; j < n; j++) flat[k++] = mat[i][j];\n// Sort flat array...\nk = 0;\nfor (int i = 0; i < m; i++)\n    for (int j = 0; j < n; j++) mat[i][j] = flat[k++];"
  },
  {
    question: "How do you check if a matrix is an 'Upper Triangular Matrix'?",
    shortAnswer: "Verify that all elements strictly below the primary diagonal are zero (i.e. mat[i][j] == 0 whenever i > j).",
    explanation: "If any element in the lower triangular region (i > j) is non-zero, it is not an upper triangular matrix.",
    hint: "mat[i][j] must be 0 for all i > j.",
    level: "intermediate",
    codeExample: "boolean isUpperTri = true;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i > j && mat[i][j] != 0) isUpperTri = false;\n    }\n}"
  },
  {
    question: "How do you check if a matrix is a 'Lower Triangular Matrix'?",
    shortAnswer: "Verify that all elements strictly above the primary diagonal are zero (i.e. mat[i][j] == 0 whenever i < j).",
    explanation: "If any element in the upper triangular region (i < j) is non-zero, it is not a lower triangular matrix.",
    hint: "mat[i][j] must be 0 for all i < j.",
    level: "intermediate",
    codeExample: "boolean isLowerTri = true;\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        if (i < j && mat[i][j] != 0) isLowerTri = false;\n    }\n}"
  },
  {
    question: "What is the result of Transposing the matrix: {{1, 2}, {3, 4}, {5, 6}}?",
    shortAnswer: "A 2x3 matrix: {{1, 3, 5}, {2, 4, 6}}.",
    explanation: "Original has 3 rows and 2 columns. Transpose will have 2 rows and 3 columns, turning Row 0 (1,2) into Col 0, Row 1 (3,4) into Col 1, and Row 2 (5,6) into Col 2.",
    hint: "3x2 matrix becomes a 2x3 matrix.",
    level: "basic",
    codeExample: "// Transpose of 3x2 is 2x3"
  },
  {
    question: "How do you invert (vertically flip) an N x N matrix?",
    shortAnswer: "Swap Row i with Row N - 1 - i for i from 0 to (N / 2) - 1.",
    explanation: "In Java, you can simply swap row references: int[] temp = mat[i]; mat[i] = mat[n - 1 - i]; mat[n - 1 - i] = temp;",
    hint: "Swap entire row arrays between top and bottom halves.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n / 2; i++) {\n    int[] temp = mat[i];\n    mat[i] = mat[n - 1 - i];\n    mat[n - 1 - i] = temp;\n}"
  },
  {
    question: "What happens if you try to compute Transpose in-place on a non-square matrix without allocating a new array?",
    shortAnswer: "ArrayIndexOutOfBoundsException or data corruption, because row and column capacities differ (e.g. trying to store 3 rows into 2 rows).",
    explanation: "In-place transpose is only mathematically possible in square matrices (N x N). Rectangular matrices (M x N) require allocating a new array of size N x M.",
    hint: "In-place transpose requires a square matrix.",
    level: "advanced",
    codeExample: "// For M != N, allocate: int[][] t = new int[n][m];"
  },
  {
    question: "In ICSE Section B, what are the standard marks allocated to a 15-mark Matrix Pattern Program?",
    shortAnswer: "Input & Array Creation: 3 marks, Pattern Logic & Traversal: 7 marks, Formatted Display: 3 marks, Variable Description Table & Comments: 2 marks.",
    explanation: "Adhering to clean structure, proper prompts, correct bounds, and the variable table secures full 15/15 marks.",
    hint: "Follow the 4-part structure for maximum marks.",
    level: "board-hot",
    codeExample: "// Full 15 marks breakdown: Input(3) + Logic(7) + Output(3) + Table(2)"
  },
  {
    question: "How do you print a Diamond / Cross pattern inside an N x N matrix?",
    shortAnswer: "Combine diagonal condition (i == j || i + j == n - 1) or middle row/col condition (i == n/2 || j == n/2).",
    explanation: "Using combinations of diagonal and center axis conditions creates artistic cross and star patterns in matrices.",
    hint: "Use logical OR to combine diagonal and central axis conditions.",
    level: "intermediate",
    codeExample: "if (i == n / 2 || j == n / 2 || i == j || i + j == n - 1) {\n    System.out.print(\"*\\t\");\n} else {\n    System.out.print(\" \\t\");\n}"
  },
  {
    question: "What variables must be included in the Variable Description Table for an ICSE Matrix Pattern program in Section B?",
    shortAnswer: "Document sc (Scanner), n (int - dimension), mat (int[][] - input matrix), transpose (int[][] - transposed matrix), boundarySum (int), i (int - row counter), j (int - col counter), isSymmetric (boolean).",
    explanation: "Always document every declared variable, its exact data type, and its purpose in the solution.",
    hint: "Include all variables declared in the class.",
    level: "board-hot",
    codeExample: "/*\n * VARIABLE TABLE:\n * n           | int     | Matrix dimension size\n * mat         | int[][] | Stores original matrix\n * boundarySum | int     | Sum of outer perimeter cells\n * isSymmetric | boolean | Flag for matrix symmetry check\n */"
  }
];

export default questions;
