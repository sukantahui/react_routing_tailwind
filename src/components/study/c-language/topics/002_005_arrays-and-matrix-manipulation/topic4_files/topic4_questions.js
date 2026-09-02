const questions = [
  {
    question: "What is row-major order in C and how does it map 2D arrays to 1D physical RAM?",
    shortAnswer: "Elements of row 0 are placed consecutively in memory, followed immediately by row 1, then row 2, and so on.",
    explanation: "RAM is linear. A 2D array arr[ROWS][COLS] maps arr[i][j] to flat memory address: Base + ((i * COLS) + j) * sizeof(element).",
    hint: "Row after row sequentially stored in RAM.",
    level: "basic"
  },
  {
    question: "Why must the column dimension be specified when passing a 2D array to a function (e.g. void f(int arr[][4]))?",
    shortAnswer: "The compiler needs the column width to calculate the row offset multiplier (i * COLS).",
    explanation: "Without knowing how many columns each row holds, the compiler cannot know how many bytes to skip to reach row i.",
    hint: "COLS determines byte stride per row.",
    level: "basic"
  },
  {
    question: "What is the memory address calculation formula for arr[i][j] in row-major order?",
    shortAnswer: "Address(&arr[i][j]) = BaseAddress + ((i * COLS) + j) * sizeof(type).",
    explanation: "Multiplies row index i by total columns, adds column index j, and scales by element byte size.",
    hint: "Base + (i * cols + j) * size.",
    level: "basic"
  },
  {
    question: "What is the condition for two matrices A (m x n) and B (p x q) to be multiplied?",
    shortAnswer: "The number of columns in matrix A must equal the number of rows in matrix B (n == p).",
    explanation: "The resulting product matrix C will have dimensions m x q.",
    hint: "Inner dimensions must match: A(m x n) * B(n x q) = C(m x q).",
    level: "basic"
  },
  {
    question: "What is the time complexity of standard matrix multiplication of two N x N matrices?",
    shortAnswer: "O(N^3) cubic time complexity.",
    explanation: "Three nested loops: outer loop for rows of A (N), middle loop for cols of B (N), and inner loop for dot-product accumulation (N). Total operations = N * N * N = N^3.",
    hint: "Triple nested loop gives O(N^3).",
    level: "basic"
  },
  {
    question: "What is the transpose of a matrix and what are its dimensions?",
    shortAnswer: "An operation that flips a matrix over its diagonal, switching row and column indices: T[j][i] = A[i][j].",
    explanation: "If original matrix A has dimensions M x N, its transpose has dimensions N x M.",
    hint: "Rows become columns and columns become rows.",
    level: "basic",
    codeExample: "for(int i=0; i<R; i++)\n    for(int j=0; j<C; j++)\n        trans[j][i] = A[i][j];"
  },
  {
    question: "What is a Symmetric Matrix and how do you verify it in C?",
    shortAnswer: "A square matrix equal to its transpose (A[i][j] == A[j][i] for all i, j).",
    explanation: "Must be a square matrix (ROWS == COLS). Check if A[i][j] == A[j][i] for all pairs above the main diagonal.",
    hint: "Square matrix where A[i][j] == A[j][i].",
    level: "intermediate"
  },
  {
    question: "What is an Identity Matrix?",
    shortAnswer: "A square matrix with 1s on the main diagonal (where i == j) and 0s elsewhere.",
    explanation: "Multiplying any matrix A by an Identity matrix I yields A (A * I = A).",
    hint: "1s on main diagonal, 0s everywhere else.",
    level: "basic"
  },
  {
    question: "What is the difference between column-major order and row-major order?",
    shortAnswer: "Row-major stores row elements consecutively (used in C, C++, Python); column-major stores column elements consecutively (used in Fortran, MATLAB, R).",
    explanation: "In column-major order, element arr[i][j] is located at Base + (j * ROWS + i) * sizeof(type).",
    hint: "C is row-major; Fortran/MATLAB is column-major.",
    level: "intermediate"
  },
  {
    question: "Why is traversing a 2D matrix row-by-row (outer i, inner j) faster than column-by-column in C?",
    shortAnswer: "Row-by-row traversal accesses contiguous memory, maximizing CPU cache line hits.",
    explanation: "Accessing memory sequentially loads adjacent elements into L1 cache automatically. Column-wise access jumps across rows, causing cache misses on large matrices.",
    hint: "Spatial locality and cache line hits.",
    level: "advanced"
  },
  {
    question: "How do you zero-initialize an entire 2D matrix in C?",
    shortAnswer: "int matrix[ROWS][COLS] = {0};",
    explanation: "Setting the first element to 0 causes the compiler to fill all remaining elements in all rows and columns with 0.",
    hint: "int matrix[R][C] = {0}; initializes all to zero.",
    level: "basic"
  },
  {
    question: "What is a Sparse Matrix and how is it efficiently represented in memory?",
    shortAnswer: "A matrix where the majority of elements are zero. Represented as a 3-tuple list (Row, Column, Value).",
    explanation: "Storing only non-zero entries in a 3-column array or linked list saves immense RAM when dealing with large datasets.",
    hint: "3-tuple representation: (Row, Col, Non-Zero-Value).",
    level: "intermediate"
  },
  {
    question: "What is the trace of a square matrix?",
    shortAnswer: "The sum of elements on the main diagonal (where i == j).",
    explanation: "Trace = sum of A[i][i] for i from 0 to N - 1.",
    hint: "Sum of main diagonal elements.",
    level: "basic"
  },
  {
    question: "How do you calculate the determinant of a 2x2 matrix in C?",
    shortAnswer: "det = (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);",
    explanation: "Product of main diagonal minus product of anti-diagonal.",
    hint: "ad - bc formula.",
    level: "basic"
  },
  {
    question: "What is a 3D array in C and how is it declared?",
    shortAnswer: "An array of 2D arrays: int tensor[PAGES][ROWS][COLS];",
    explanation: "Memory is allocated as PAGES * ROWS * COLS consecutive elements in linear memory.",
    hint: "Collection of 2D matrices across pages/depth.",
    level: "intermediate"
  },
  {
    question: "How do you rotate a square matrix 90 degrees clockwise in-place in C?",
    shortAnswer: "Step 1: Transpose the matrix; Step 2: Reverse each row.",
    explanation: "Transposing swaps A[i][j] with A[j][i]. Reversing each row yields the 90-degree clockwise rotation.",
    hint: "Transpose + Reverse rows = 90 degree rotation.",
    level: "advanced"
  },
  {
    question: "What is a saddle point of a matrix?",
    shortAnswer: "An element that is the minimum in its row and the maximum in its column.",
    explanation: "Find the smallest element in row i; check if it is also the largest in its column.",
    hint: "Row minimum and column maximum.",
    level: "intermediate"
  },
  {
    question: "How do you pass a dynamically allocated 2D array (int**) to a function?",
    shortAnswer: "void func(int **matrix, int rows, int cols);",
    explanation: "Requires an array of row pointers where each row pointer points to a heap-allocated integer array.",
    hint: "Pointer-to-pointer parameter signature.",
    level: "advanced"
  },
  {
    question: "What is the condition for two matrices to be added or subtracted?",
    shortAnswer: "Both matrices must have identical dimensions (same number of rows and columns).",
    explanation: "Addition is performed element-by-element: C[i][j] = A[i][j] + B[i][j].",
    hint: "Dimensions must be equal.",
    level: "basic"
  },
  {
    question: "What is the total byte size of int matrix[4][5] on a system where sizeof(int) is 4 bytes?",
    shortAnswer: "80 bytes (4 rows * 5 cols * 4 bytes/int = 80 bytes).",
    explanation: "sizeof(matrix) evaluates to 80 bytes on the stack.",
    hint: "4 * 5 * 4 = 80 bytes.",
    level: "basic"
  },
  {
    question: "How do you check if a matrix is an upper triangular matrix?",
    shortAnswer: "Verify that all elements below the main diagonal (where i > j) are equal to 0.",
    explanation: "If any A[i][j] != 0 for i > j, the matrix is not upper triangular.",
    hint: "Elements with i > j must be 0.",
    level: "intermediate"
  },
  {
    question: "What is spiral order matrix traversal?",
    shortAnswer: "Traversing boundaries clockwise: top row, right col, bottom row, left col, shifting boundaries inward.",
    explanation: "Maintain top, bottom, left, right boundary indices and increment/decrement after each directional pass.",
    hint: "4-boundary inward spiral traversal.",
    level: "advanced"
  },
  {
    question: "What is Strassen's Matrix Multiplication Algorithm?",
    shortAnswer: "A divide-and-conquer algorithm that multiplies two N x N matrices in O(N^2.81) time.",
    explanation: "Reduces the number of recursive multiplications from 8 to 7, improving asymptotically on O(N^3).",
    hint: "O(N^2.81) sub-cubic matrix multiplication.",
    level: "advanced"
  },
  {
    question: "What is the expression *(*(arr + i) + j) in C?",
    shortAnswer: "The pointer dereference equivalent of arr[i][j].",
    explanation: "*(arr + i) yields the pointer to row i; adding j offsets to column j; outer * dereferences the value.",
    hint: "Pointer arithmetic form of 2D indexing.",
    level: "intermediate"
  },
  {
    question: "Why does C not require the first dimension when declaring initialized 2D arrays (e.g. int m[][2] = {{1,2},{3,4}})?",
    shortAnswer: "The compiler counts the initializer rows, but column width (2) is mandatory to establish stride.",
    explanation: "With 4 elements and 2 columns, the compiler infers that there are 4 / 2 = 2 rows.",
    hint: "Rows are inferred; column width is required.",
    level: "basic"
  }
];

export default questions;
