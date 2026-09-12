const questions = [
  {
    question: "What is a Two-Dimensional (2D) array in Java, and how does Java structure it in memory?",
    shortAnswer: "A 2D array is an 'Array of Arrays' where a reference points to an array of row references, and each row reference points to a 1D array of elements on the Heap.",
    explanation: "In Java, multi-dimensional arrays are not stored as single continuous flat blocks in memory (unlike C/C++). A 2D array variable (e.g., int[][] arr) resides in the Stack memory and holds a reference to a primary 1D array of references in the Heap. Each element of this primary array holds a reference pointing to an independent 1D array of primitive values or objects.",
    hint: "Think of it as a master list where each entry holds the memory address of another individual list.",
    level: "basic",
    codeExample: "int[][] arr = new int[3][4];\n// arr points to 1D array of size 3 (rows)\n// arr[0], arr[1], arr[2] each point to 1D arrays of size 4"
  },
  {
    question: "What are the valid syntax forms to declare a 2D integer array in Java for ICSE Board exams?",
    shortAnswer: "1) int[][] a; 2) int a[][]; 3) int[] a[]; 4) int [][]a;",
    explanation: "Java permits square brackets to be placed immediately after the data type, after the variable name, or split between them. For ICSE Board programs, 'int[][] arr' is the standard modern Java convention and is highly recommended.",
    hint: "Brackets can appear with the data type or with the identifier.",
    level: "basic",
    codeExample: "int[][] arr1 = new int[3][3]; // Recommended\nint arr2[][] = new int[3][3]; // Valid\nint[] arr3[] = new int[3][3]; // Valid"
  },
  {
    question: "How do you calculate the total number of element cells in a rectangular matrix declared as int[][] mat = new int[4][5]?",
    shortAnswer: "Total cells = rows * columns = 4 * 5 = 20 elements.",
    explanation: "In a rectangular matrix with M rows and N columns, the total capacity is M * N. Here, with 4 rows and 5 columns, there are 20 individual integer storage slots.",
    hint: "Multiply row dimension by column dimension.",
    level: "basic",
    codeExample: "int[][] mat = new int[4][5];\nint totalCells = mat.length * mat[0].length; // 4 * 5 = 20"
  },
  {
    question: "What is the difference between mat.length and mat[0].length in a 2D array?",
    shortAnswer: "mat.length returns the number of rows, while mat[0].length returns the number of columns in row 0.",
    explanation: "Because a 2D array is an array of row arrays, mat.length measures the length of the master array (how many row references exist). mat[0].length accesses the first row sub-array and measures its length (how many columns/elements it contains).",
    hint: "mat is the parent array; mat[0] is the first child array.",
    level: "basic",
    codeExample: "int[][] mat = new int[3][5];\nSystem.out.println(mat.length);    // Output: 3 (rows)\nSystem.out.println(mat[0].length); // Output: 5 (columns)"
  },
  {
    question: "What are the default values assigned to 2D array elements upon dynamic allocation with the new operator?",
    shortAnswer: "Numeric arrays (int, double, etc.) get 0 or 0.0, boolean gets false, char gets '\\u0000', and object/String references get null.",
    explanation: "When you instantiate a 2D array with 'new', Java initializes the primary reference array and all sub-arrays on the Heap, zeroing out all memory bits by default.",
    hint: "Java always initializes Heap-allocated objects to their type-specific zero state.",
    level: "basic",
    codeExample: "int[][] nums = new int[2][2];       // nums[0][0] is 0\nboolean[][] flags = new boolean[2][2]; // flags[0][0] is false\nString[][] words = new String[2][2];   // words[0][0] is null"
  },
  {
    question: "What happens if you try to access mat[3][2] in a matrix declared as int[][] mat = new int[3][3]?",
    shortAnswer: "An ArrayIndexOutOfBoundsException is thrown at runtime.",
    explanation: "For an array with 3 rows, valid row indices are 0, 1, and 2. Attempting to access row index 3 exceeds the upper bound, causing Java's runtime environment to throw an ArrayIndexOutOfBoundsException.",
    hint: "Array indices in Java are 0-indexed and run from 0 to length - 1.",
    level: "basic",
    codeExample: "int[][] mat = new int[3][3];\n// System.out.println(mat[3][2]); \n// Throws java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3"
  },
  {
    question: "How do you declare and initialize a 2D matrix using a direct literal initializer?",
    shortAnswer: "Use nested curly braces: int[][] mat = {{1, 2}, {3, 4}, {5, 6}};",
    explanation: "A literal initializer allocates the master array and each row array in a single statement, directly assigning the values specified in inner comma-separated braces.",
    hint: "Outer curly braces hold the collection of inner curly braces representing each row.",
    level: "basic",
    codeExample: "int[][] matrix = {\n    {10, 20, 30},\n    {40, 50, 60}\n}; // 2 rows x 3 cols"
  },
  {
    question: "What is a 'Jagged Array' (or Ragged Array) in Java?",
    shortAnswer: "A 2D array where different rows have different numbers of columns (unequal row lengths).",
    explanation: "Since Java stores a 2D array as independent 1D arrays referenced by a master array, each row array can be instantiated with a different size.",
    hint: "Jagged means uneven rows.",
    level: "intermediate",
    codeExample: "int[][] jagged = new int[3][];\njagged[0] = new int[2]; // 2 elements\njagged[1] = new int[5]; // 5 elements\njagged[2] = new int[3]; // 3 elements"
  },
  {
    question: "Can you omit the row size during dynamic allocation, e.g., int[][] a = new int[][4]?",
    shortAnswer: "No, this produces a compile-time error. The first dimension (row size) is mandatory.",
    explanation: "Java needs to allocate the master array of references first. Therefore, the first dimension (number of rows) must be specified. Omitting the row dimension while specifying the column dimension is illegal in Java syntax.",
    hint: "Java must know how many row reference pointers to create first.",
    level: "intermediate",
    codeExample: "// int[][] a = new int[][4]; // COMPILE ERROR: ']' expected\nint[][] b = new int[3][];    // VALID (allocates master array of 3 row references)"
  },
  {
    question: "What is the memory size in bytes of a 2D primitive integer array of dimensions 3x4 in standard 32-bit slot calculations for ICSE theory?",
    shortAnswer: "Total primitive integer data size is 3 * 4 * 4 bytes = 48 bytes (excluding object headers and reference overhead).",
    explanation: "Each int in Java occupies 4 bytes (32 bits). With 3 rows and 4 columns, there are 12 integer elements. Thus, 12 * 4 = 48 bytes of primitive data payload.",
    hint: "1 int = 4 bytes. Total bytes = Total elements * 4.",
    level: "intermediate",
    codeExample: "// 3 rows * 4 columns = 12 elements\n// 12 * 4 bytes = 48 bytes"
  },
  {
    question: "How do you traverse and print all elements of an M x N 2D array in row-major order?",
    shortAnswer: "Use two nested for loops: the outer loop runs from i = 0 to M - 1, and the inner loop runs from j = 0 to N - 1.",
    explanation: "In row-major traversal, the outer loop fixes the row index i, while the inner loop visits every column j from 0 to N-1 before advancing to the next row.",
    hint: "Outer loop is row (i), inner loop is column (j).",
    level: "basic",
    codeExample: "for (int i = 0; i < mat.length; i++) {\n    for (int j = 0; j < mat[i].length; j++) {\n        System.out.print(mat[i][j] + \"\\t\");\n    }\n    System.out.println();\n}"
  },
  {
    question: "How do you traverse a 2D matrix in Column-Major order?",
    shortAnswer: "Place the column loop on the outside (j = 0 to cols - 1) and the row loop on the inside (i = 0 to rows - 1).",
    explanation: "Column-major traversal processes an entire vertical column from top to bottom before moving to the next column on the right.",
    hint: "Outer loop controls j (columns), inner loop controls i (rows).",
    level: "intermediate",
    codeExample: "for (int j = 0; j < mat[0].length; j++) {\n    for (int i = 0; i < mat.length; i++) {\n        System.out.print(mat[i][j] + \" \");\n    }\n    System.out.println(); // Prints each column on a new line\n}"
  },
  {
    question: "What is stored in the variable 'matrix' in the statement: int[][] matrix = new int[2][3]?",
    shortAnswer: "A reference (memory address pointer) to the primary array object in Heap memory.",
    explanation: "In Java, array variables are reference types. The variable 'matrix' on the Stack frame contains a 32-bit or 64-bit reference address pointing to the master 1D array object on the Heap.",
    hint: "Non-primitives in Java are reference variables, not value containers.",
    level: "intermediate",
    codeExample: "int[][] matrix = new int[2][3];\nSystem.out.println(matrix); // Outputs object reference like [[I@7a81197d"
  },
  {
    question: "What does the type descriptor '[[I' indicate when printing a 2D integer array object reference?",
    shortAnswer: "'[[' denotes a 2D array, and 'I' denotes the primitive integer type.",
    explanation: "Java runtime uses internal JVM class name signatures: '[' represents a single dimension, '[[' represents two dimensions, and 'I' stands for primitive type int.",
    hint: "Each bracket represents one array dimension.",
    level: "advanced",
    codeExample: "int[][] a = new int[2][2];\nSystem.out.println(a.getClass().getName()); // Output: [[I"
  },
  {
    question: "What is the index of the bottom-right corner element in an M x N matrix named 'grid'?",
    shortAnswer: "grid[M - 1][N - 1] or grid[grid.length - 1][grid[0].length - 1]",
    explanation: "Since indices in both dimensions start at 0 and end at length - 1, the bottom-most row is M-1 and the right-most column is N-1.",
    hint: "Subtract 1 from both maximum row and column dimensions.",
    level: "basic",
    codeExample: "int M = grid.length;\nint N = grid[0].length;\nint bottomRight = grid[M - 1][N - 1];"
  },
  {
    question: "Can you change the size of an already declared 2D array dynamically in Java?",
    shortAnswer: "No, array sizes in Java are fixed once instantiated on the Heap.",
    explanation: "Once an array object is allocated on the Heap, its length cannot be expanded or shrunk. To store more elements, you must create a new array with larger dimensions and copy the existing elements.",
    hint: "Arrays in Java are fixed-size data structures.",
    level: "basic",
    codeExample: "int[][] a = new int[3][3];\n// To expand, create new 4x4 array and copy elements"
  },
  {
    question: "What is the output of the following snippet?\nint[][] a = {{1, 2}, {3, 4, 5}};\nSystem.out.println(a.length + \",\" + a[1].length);",
    shortAnswer: "2,3",
    explanation: "a.length is the number of rows (2 rows). a[1] is the second row ({3, 4, 5}), whose length is 3.",
    hint: "Count the number of inner sets for a.length and items in the second inner set for a[1].length.",
    level: "basic",
    codeExample: "int[][] a = {{1, 2}, {3, 4, 5}};\nSystem.out.println(a.length + \",\" + a[1].length); // Output: 2,3"
  },
  {
    question: "If int[][] arr = new int[3][]; what is the value of arr[0] before it is instantiated?",
    shortAnswer: "null",
    explanation: "The master array arr holds references to row arrays. Because reference variables default to null in Heap memory, arr[0], arr[1], and arr[2] are all null until explicitly assigned new int[cols].",
    hint: "Uninitialized object references are always null.",
    level: "intermediate",
    codeExample: "int[][] arr = new int[3][];\nSystem.out.println(arr[0]); // Output: null\n// System.out.println(arr[0][0]); // Throws NullPointerException!"
  },
  {
    question: "What exception occurs if you execute arr[0][0] when int[][] arr = new int[3][]?",
    shortAnswer: "NullPointerException",
    explanation: "arr[0] is null because the row sub-array has not yet been allocated with 'new'. Attempting to de-reference a null reference to access index 0 results in a NullPointerException.",
    hint: "Accessing a member or index of a null reference causes NullPointerException.",
    level: "intermediate",
    codeExample: "int[][] arr = new int[3][];\n// arr[0][0] = 10; // RUNTIME ERROR: NullPointerException"
  },
  {
    question: "What is the difference between a square matrix and a rectangular matrix?",
    shortAnswer: "In a square matrix, rows == columns (M == N). In a rectangular matrix, rows != columns (M != N).",
    explanation: "A square matrix has equal dimensions (e.g., 3x3, 4x4) and possesses well-defined primary and secondary diagonals. A rectangular matrix has differing row and column counts (e.g., 3x5).",
    hint: "Square means equal width and height.",
    level: "basic",
    codeExample: "int[][] sq = new int[3][3];   // Square matrix (3x3)\nint[][] rect = new int[2][4]; // Rectangular matrix (2x4)"
  },
  {
    question: "How do you clone or perform a shallow copy of a 2D array in Java?",
    shortAnswer: "Calling matrix.clone() clones only the primary array of row references; the individual row arrays are shared.",
    explanation: "In a shallow copy (such as clone()), the new master array receives copied reference addresses pointing to the exact same Heap sub-arrays. Modifying an element in the cloned array modifies the original.",
    hint: "Shallow copy copies reference pointers, not the sub-arrays themselves.",
    level: "advanced",
    codeExample: "int[][] original = {{1, 2}, {3, 4}};\nint[][] shallow = original.clone();\nshallow[0][0] = 99;\nSystem.out.println(original[0][0]); // Output: 99 (affected!)"
  },
  {
    question: "How do you create a true Deep Copy of a 2D matrix in Java?",
    shortAnswer: "Instantiate a new 2D array of the same dimensions and manually copy every individual element using nested loops or row.clone().",
    explanation: "A deep copy creates completely new sub-arrays in Heap memory so that modifying the copy has zero effect on the original array.",
    hint: "Copy each element cell-by-cell into a newly allocated matrix.",
    level: "advanced",
    codeExample: "int[][] copy = new int[orig.length][orig[0].length];\nfor(int i = 0; i < orig.length; i++) {\n    for(int j = 0; j < orig[0].length; j++) {\n        copy[i][j] = orig[i][j];\n    }\n}"
  },
  {
    question: "Why does ICSE Board exam Section B require a Variable Description Table for 2D array programs?",
    shortAnswer: "To document the name, data type, and algorithmic purpose of each variable used, earning 2-3 marks in the marking scheme.",
    explanation: "The ICSE Board marking scheme allocates specific marks for documentation. A standard table listing variable names (e.g., matrix, i, j, r, c), data types (int[][], int), and clear descriptions ensures full marks.",
    hint: "Always include the variable table at the end of your answer in Section B.",
    level: "board-hot",
    codeExample: "/*\n * VARIABLE DESCRIPTION TABLE:\n * Variable Name | Data Type | Purpose\n * arr           | int[][]   | Stores the 3x3 input matrix\n * i             | int       | Loop index for rows\n * j             | int       | Loop index for columns\n */"
  },
  {
    question: "What is the effect of writing 'for(int i = 0; i <= arr.length; i++)' when traversing a 2D array?",
    shortAnswer: "It causes an ArrayIndexOutOfBoundsException on the final iteration when i == arr.length.",
    explanation: "Because row indexing is 0 to arr.length - 1, using '<=' causes the loop to attempt accessing index arr.length, which is out of bounds.",
    hint: "Always use strict inequality (<) with .length.",
    level: "basic",
    codeExample: "// WRONG: i <= arr.length\n// CORRECT: i < arr.length"
  },
  {
    question: "Can a 2D array in Java store mixed data types, such as integers in row 0 and doubles in row 1?",
    shortAnswer: "No, Java arrays are homogeneous; all elements must be of the declared data type (or assignable subtypes in object arrays).",
    explanation: "Java is strongly typed. An int[][] can only store 32-bit primitive integers across all its rows and columns.",
    hint: "Homogeneous means all elements share the exact same data type.",
    level: "basic",
    codeExample: "int[][] a = new int[2][2];\n// a[0][0] = 5.5; // COMPILE ERROR: incompatible types: possible lossy conversion from double to int"
  }
];

export default questions;
