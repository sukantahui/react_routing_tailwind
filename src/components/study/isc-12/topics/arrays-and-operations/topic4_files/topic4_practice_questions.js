const practiceQuestions = [
    { q: "What is a 2D array?", a: "An array of arrays, organized in rows and columns.", explanation: "It stores data in a grid format, accessed using two indices: row and column." },
    { q: "How do you declare a 2D array of integers with 3 rows and 4 columns?", a: "int[][] matrix = new int[3][4];", explanation: "First dimension is rows, second is columns. Both are zero-based." },
    { q: "What does matrix.length return for a 2D array?", a: "Number of rows.", explanation: "The outer array length corresponds to the number of rows." },
    { q: "How do you get the number of columns in a rectangular 2D array?", a: "matrix[0].length", explanation: "Assuming at least one row exists, the first row's length gives column count." },
    { q: "What is the index of the last element in a 5x5 matrix?", a: "[4][4]", explanation: "Indices go from 0 to rows-1 and 0 to cols-1." },
    { q: "What is a jagged array?", a: "A 2D array where rows have different lengths.", explanation: "Java allows each row to be a separate array of different size." },
    { q: "Write code to create a 2x2 identity matrix using an initializer.", a: "int[][] identity = {{1,0},{0,1}};", explanation: "Nested braces specify rows and columns." },
    { q: "What happens if you access matrix[3][0] in a 3x3 matrix?", a: "ArrayIndexOutOfBoundsException", explanation: "Valid row indices are 0,1,2. Index 3 is out of bounds." },
    { q: "How do you print a 2D array nicely?", a: "System.out.println(Arrays.deepToString(matrix));", explanation: "deepToString provides a readable representation." },
    { q: "What is the default value of elements in a 2D int array?", a: "0", explanation: "Like 1D arrays, numeric primitives default to zero." },
    { q: "How do you copy a 2D array deeply?", a: "Copy each row individually using clone() or new array.", explanation: "Shallow copy copies only row references; deep copy requires copying each row." },
    { q: "Can you have a 2D array with 0 rows? If yes, what is its length?", a: "Yes, new int[0][5]; length is 0.", explanation: "An empty outer array is valid, but then matrix[0] doesn't exist." },
    { q: "What is the output of matrix[1][2] if matrix is {{1,2},{3,4}}?", a: "ArrayIndexOutOfBoundsException", explanation: "Rows=2, cols=2. Valid indices: [0][0],[0][1],[1][0],[1][1]. [1][2] column 2 is out of bounds." },
    { q: "Write a nested for loop to sum all elements of a 2D array 'arr'.", a: "int sum=0; for (int i=0; i<arr.length; i++) for (int j=0; j<arr[i].length; j++) sum += arr[i][j];", explanation: "Row-major traversal accumulating sum." },
    { q: "What is the difference between new int[2][3] and new int[2][]?", a: "First creates a rectangular 2x3 matrix; second creates a jagged array with null rows.", explanation: "Second requires allocating each row separately." },
    { q: "How do you find if a 2D array is rectangular (all rows same length)?", a: "Compare arr[i].length for all i.", explanation: "Loop through rows and check if all lengths equal arr[0].length." },
    { q: "What is the time complexity of accessing matrix[i][j]?", a: "O(1)", explanation: "Direct index calculation gives constant time." },
    { q: "Can you use enhanced for loop to traverse a 2D array? Show example.", a: "for (int[] row : matrix) for (int val : row) System.out.println(val);", explanation: "Outer loop gets each row array, inner loop gets each element." },
    { q: "What is the memory layout of a 2D array in Java?", a: "Outer array holds references to row arrays; each row array holds elements.", explanation: "Rows are separate objects, not contiguous in memory." },
    { q: "How do you create a 2D array with 3 rows where row0 has length 2, row1 length 3, row2 length 1?", a: "int[][] jagged = new int[3][]; jagged[0]=new int[2]; jagged[1]=new int[3]; jagged[2]=new int[1];", explanation: "Explicitly allocate each row with desired length." }
];

export default practiceQuestions;