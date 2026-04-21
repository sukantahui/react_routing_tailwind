const practiceQuestions = [
    { q: "What is row-major traversal?", a: "Visiting elements row by row (outer loop rows, inner loop columns).", explanation: "All columns of first row, then second row, etc." },
    { q: "Write the nested loops for row-wise traversal of a 3x4 matrix 'mat'.", a: "for (int i=0; i<3; i++) for (int j=0; j<4; j++) { ... }", explanation: "Outer loop rows, inner loop columns." },
    { q: "What is column-major traversal?", a: "Visiting elements column by column (outer loop columns, inner loop rows).", explanation: "All rows of first column, then second column, etc." },
    { q: "Write the loops for column-wise traversal of a 3x4 matrix 'mat'.", a: "for (int j=0; j<4; j++) for (int i=0; i<3; i++) { ... }", explanation: "Outer loop columns, inner loop rows." },
    { q: "Which traversal is faster in Java and why?", a: "Row-major, due to spatial locality and CPU caching.", explanation: "Rows are stored contiguously in memory." },
    { q: "How do you traverse a jagged array safely?", a: "Use mat[i].length in inner loop condition.", explanation: "Each row may have different length." },
    { q: "Write an enhanced for loop to traverse a 2D array 'grid' and print each element.", a: "for (int[] row : grid) for (int val : row) System.out.print(val + \" \");", explanation: "Outer loop gets rows, inner gets elements." },
    { q: "What is the time complexity of traversing an m×n matrix?", a: "O(m × n)", explanation: "Visiting each element once." },
    { q: "What is the space complexity of matrix traversal (excluding the matrix)?", a: "O(1)", explanation: "Only loop variables." },
    { q: "Can you modify matrix elements during enhanced for loop?", a: "No, for primitives it modifies a copy.", explanation: "Use indexed loops to modify." },
    { q: "Write code to sum all elements of a 2D array using row-wise traversal.", a: "int sum=0; for (int i=0; i<rows; i++) for (int j=0; j<cols; j++) sum += mat[i][j];", explanation: "Accumulate in sum variable." },
    { q: "What is the output of row-wise traversal for matrix {{1,2},{3,4}}?", a: "1 2 then 3 4", explanation: "Row0: 1,2; Row1: 3,4." },
    { q: "What is the output of column-wise traversal for matrix {{1,2},{3,4}}?", a: "1 3 then 2 4", explanation: "Col0: 1,3; Col1: 2,4." },
    { q: "How do you traverse a matrix in reverse row-major order?", a: "for (int i=rows-1; i>=0; i--) for (int j=cols-1; j>=0; j--)", explanation: "Start from bottom-right, go backwards." },
    { q: "What is the purpose of matrix[i].length in traversal?", a: "To get the number of columns in row i (for jagged arrays).", explanation: "Ensures safe traversal of variable-length rows." },
    { q: "Write code to find the maximum element in a 2D array using row-wise traversal.", a: "int max = Integer.MIN_VALUE; for (int[] row : mat) for (int val : row) if (val > max) max = val;", explanation: "Initialize max to smallest possible, update if larger found." },
    { q: "What happens if you use column-wise traversal on a jagged array?", a: "May cause ArrayIndexOutOfBoundsException.", explanation: "Rows may have different lengths; column index may exceed row length." },
    { q: "How do you traverse only the main diagonal of a square matrix?", a: "for (int i=0; i<rows; i++) System.out.println(mat[i][i]);", explanation: "Indices where row == column." },
    { q: "Write code to print a matrix in snake pattern (row0 left→right, row1 right→left).", a: "for (int i=0; i<rows; i++) { if (i%2==0) for (int j=0; j<cols; j++) System.out.print(mat[i][j]+\" \"); else for (int j=cols-1; j>=0; j--) System.out.print(mat[i][j]+\" \"); System.out.println(); }", explanation: "Alternate direction based on row parity." },
    { q: "What is the advantage of using a single loop with flattened index for traversal?", a: "Sometimes simpler for certain algorithms; avoids nested loops.", explanation: "index = i*cols + j; row = index/cols; col = index%cols;" }
];

export default practiceQuestions;