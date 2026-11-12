const questions = [
  {
    "id": 1,
    "question": "Why are nested loops required to input and display a 2D matrix in Java?",
    "shortAnswer": "Because a 2D matrix has two independent coordinate dimensions (rows and columns); an outer loop iterates through rows, and an inner loop iterates through columns.",
    "explanation": "A single loop can only vary one variable at a time (linear traversal). To visit every cell in a 2D grid, the outer loop fixes row index i, while the inner loop scans column index j through all valid column values 0 to n - 1.",
    "hint": "Two dimensions require two nested control loops.",
    "level": "basic",
    "options": [
      "Because a 2D matrix has two independent coordinate dimensions (rows and columns); an outer loop iterates through rows, and an inner loop iterates through columns.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n        matrix[i][j] = sc.nextInt();\n    }\n}"
  },
  {
    "id": 2,
    "question": "What is the critical difference between System.out.print() and System.out.println() when printing a 2D matrix?",
    "shortAnswer": "System.out.print() outputs elements of the same row on the same line, while System.out.println() (placed outside the inner loop) moves the cursor to the next line after completing a row.",
    "explanation": "If you use System.out.println() inside the inner loop, each element prints on a new vertical line. To achieve a grid format, print each element with a space or tab using print(), and issue a single println() after the inner loop finishes.",
    "hint": "Print horizontally inside the inner loop; drop to the next line after the inner loop completes.",
    "level": "basic",
    "options": [
      "System.out.print() outputs elements of the same row on the same line, while System.out.println() (placed outside the inner loop) moves the cursor to the next line after completing a row.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        System.out.print(arr[i][j] + \"\\t\"); // Same line\n    }\n    System.out.println(); // New row\n}"
  },
  {
    "id": 3,
    "question": "What is Row-Major Order versus Column-Major Order during matrix input?",
    "shortAnswer": "In Row-Major order, elements are processed row-by-row (Row 0 elements, then Row 1, etc.). In Column-Major order, elements are processed column-by-column (Col 0 elements, then Col 1, etc.).",
    "explanation": "Standard matrix entry in Java uses row-major: outer loop i (rows) and inner loop j (columns). In column-major entry, outer loop j (columns) and inner loop i (rows) fill each vertical column first.",
    "hint": "Row-Major: row changes slowly, col changes rapidly. Column-Major: col changes slowly, row changes rapidly.",
    "level": "basic",
    "options": [
      "In Row-Major order, elements are processed row-by-row (Row 0 elements, then Row 1, etc.). In Column-Major order, elements are processed column-by-column (Col 0 elements, then Col 1, etc.).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Row-Major: arr[0][0], arr[0][1], arr[0][2], arr[1][0]...\n// Column-Major: arr[0][0], arr[1][0], arr[2][0], arr[0][1]..."
  },
  {
    "id": 4,
    "question": "How many total iterations execute during the nested loop traversal of an M x N matrix?",
    "shortAnswer": "Total iterations = M * N.",
    "explanation": "The outer loop runs M times. For each iteration of the outer loop, the inner loop runs N times. Therefore, the body of the inner loop executes M * N times in total.",
    "hint": "Multiply outer loop count by inner loop count.",
    "level": "basic",
    "options": [
      "Total iterations = M * N.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// If M = 3 and N = 4: Total iterations = 3 * 4 = 12"
  },
  {
    "id": 5,
    "question": "Why is the tab character ('\\t') preferred over a single space (' ') when printing matrices in ICSE programs?",
    "shortAnswer": "The tab character '\\t' ensures uniform column alignment even when matrix elements have varying numbers of digits (e.g., 5 vs 150).",
    "explanation": "Spaces can cause columns to become misaligned when single-digit and multi-digit numbers appear in the same column. The tab character aligns numbers to standard tab stops (usually 4 or 8 characters).",
    "hint": "Tab stops create clean vertical columns.",
    "level": "basic",
    "options": [
      "The tab character '\\t' ensures uniform column alignment even when matrix elements have varying numbers of digits (e.g., 5 vs 150).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.print(matrix[i][j] + \"\\t\");"
  },
  {
    "id": 6,
    "question": "What is the trace table sequence of (i, j) index pairs for a 2x3 matrix during standard nested loop execution?",
    "shortAnswer": "(0,0) -> (0,1) -> (0,2) -> (1,0) -> (1,1) -> (1,2)",
    "explanation": "Starting with i=0, j iterates through 0, 1, 2. When j reaches 3, the inner loop terminates. The outer loop increments i to 1, and j resets to 0 and iterates through 0, 1, 2 again.",
    "hint": "Trace row 0 completely, then trace row 1 completely.",
    "level": "basic",
    "options": [
      "(0,0) -> (0,1) -> (0,2) -> (1,0) -> (1,1) -> (1,2)",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "/* Execution Trace:\nStep 1: i=0, j=0\nStep 2: i=0, j=1\nStep 3: i=0, j=2\nStep 4: i=1, j=0\nStep 5: i=1, j=1\nStep 6: i=1, j=2 */"
  },
  {
    "id": 7,
    "question": "How do you accept matrix input using Scanner in BlueJ without hardcoding array dimensions?",
    "shortAnswer": "Prompt the user for rows 'm' and columns 'n' first, then instantiate: int[][] arr = new int[m][n];",
    "explanation": "Dynamic sizing allows your program to handle any valid matrix size provided by the user or required by the ICSE question paper.",
    "hint": "Read dimensions into variables first, then create the array using those variables.",
    "level": "basic",
    "options": [
      "Prompt the user for rows 'm' and columns 'n' first, then instantiate: int[][] arr = new int[m][n];",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int m = sc.nextInt();\nint n = sc.nextInt();\nint[][] arr = new int[m][n];"
  },
  {
    "id": 8,
    "question": "What occurs if a student writes 'for (int j = 0; j < cols; i++)' inside the inner loop?",
    "shortAnswer": "An infinite loop occurs because j is never incremented, and i keeps increasing until it causes an ArrayIndexOutOfBoundsException.",
    "explanation": "This is a common typo where the programmer mistakenly increments the outer loop counter 'i' instead of the inner loop counter 'j'.",
    "hint": "Watch out for accidentally writing i++ in the inner j loop.",
    "level": "intermediate",
    "options": [
      "An infinite loop occurs because j is never incremented, and i keeps increasing until it causes an ArrayIndexOutOfBoundsException.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// BUG:\nfor (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; i++) { // BUG: i++ instead of j++\n        System.out.print(arr[i][j]);\n    }\n}"
  },
  {
    "id": 9,
    "question": "How do you display a 2D matrix in reverse row-major order (from bottom-right to top-left)?",
    "shortAnswer": "Run the outer loop backwards from i = rows - 1 down to 0, and the inner loop backwards from j = cols - 1 down to 0.",
    "explanation": "Starting indices at length - 1 and decrementing with i-- and j-- visits cells in reverse order: [M-1][N-1], [M-1][N-2] ... down to [0][0].",
    "hint": "Initialize loops at length - 1, condition >= 0, step --.",
    "level": "intermediate",
    "options": [
      "Run the outer loop backwards from i = rows - 1 down to 0, and the inner loop backwards from j = cols - 1 down to 0.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = rows - 1; i >= 0; i--) {\n    for (int j = cols - 1; j >= 0; j--) {\n        System.out.print(arr[i][j] + \"\\t\");\n    }\n    System.out.println();\n}"
  },
  {
    "id": 10,
    "question": "How do you search for an element X in an M x N matrix and print its row and column coordinates?",
    "shortAnswer": "Traverse the matrix using nested loops; if matrix[i][j] == X, print the coordinates (i, j) and set a boolean flag.",
    "explanation": "Linear search on a 2D array checks each cell sequentially. If found, report the exact indices. If the loops finish and the flag remains false, report 'Element not found'.",
    "hint": "Compare matrix[i][j] with search target X.",
    "level": "intermediate",
    "options": [
      "Traverse the matrix using nested loops; if matrix[i][j] == X, print the coordinates (i, j) and set a boolean flag.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "boolean found = false;\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        if (arr[i][j] == key) {\n            System.out.println(\"Found at Row: \" + i + \", Col: \" + j);\n            found = true;\n            break;\n        }\n    }\n}\nif (!found) System.out.println(\"Not found\");"
  },
  {
    "id": 11,
    "question": "How do you break out of both nested loops immediately upon finding a search element?",
    "shortAnswer": "Use a labeled break statement (e.g., 'break searchLoop;') or a boolean flag combined with break.",
    "explanation": "A standard 'break;' only terminates the innermost loop. A labeled break in Java can exit both the inner and outer loops simultaneously.",
    "hint": "Place a label before the outer loop and target it with break labelName;.",
    "level": "advanced",
    "options": [
      "Use a labeled break statement (e.g., 'break searchLoop;') or a boolean flag combined with break.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "searchLoop:\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        if (arr[i][j] == key) {\n            System.out.println(\"Found at [\" + i + \"][\" + j + \"]\");\n            break searchLoop;\n        }\n    }\n}"
  },
  {
    "id": 12,
    "question": "What is the time complexity of inputting and displaying an N x N square matrix?",
    "shortAnswer": "O(N^2) quadratic time complexity.",
    "explanation": "Because the outer loop runs N times and the inner loop runs N times for every outer step, the total number of basic operations is N * N = N^2.",
    "hint": "N rows * N columns = N^2 operations.",
    "level": "intermediate",
    "options": [
      "O(N^2) quadratic time complexity.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// For N = 100: 10,000 cell operations -> O(N^2)"
  },
  {
    "id": 13,
    "question": "Can an enhanced for-each loop be used to input elements into a 2D matrix?",
    "shortAnswer": "No, the enhanced for-each loop cannot modify primitive array elements during input.",
    "explanation": "In Java's for-each loop (for (int val : row)), 'val' is a copy of the element value, not a reference to the array slot. Assigning to 'val' does not write into the matrix. Traditional indexed for loops must be used for input.",
    "hint": "For-each loops are read-only for primitives.",
    "level": "intermediate",
    "options": [
      "No, the enhanced for-each loop cannot modify primitive array elements during input.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// CANNOT DO THIS FOR INPUT:\n// for (int[] row : matrix) {\n//     for (int val : row) { val = sc.nextInt(); } // Fails!\n// }"
  },
  {
    "id": 14,
    "question": "Can an enhanced for-each loop be used to display a 2D matrix?",
    "shortAnswer": "Yes, for-each is ideal for read-only traversal and printing.",
    "explanation": "Outer loop iterates through each 1D row array (int[] row : matrix), and inner loop iterates through each integer in that row (int val : row).",
    "hint": "Outer type is int[], inner type is int.",
    "level": "intermediate",
    "options": [
      "Yes, for-each is ideal for read-only traversal and printing.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int[] row : matrix) {\n    for (int val : row) {\n        System.out.print(val + \"\\t\");\n    }\n    System.out.println();\n}"
  },
  {
    "id": 15,
    "question": "What happens if the user enters fewer inputs than required (e.g. 8 numbers for a 3x3 matrix)?",
    "shortAnswer": "Scanner.nextInt() blocks and waits for the user to provide the remaining input.",
    "explanation": "Scanner's nextInt() method is a blocking call. It will wait indefinitely on standard input until a token is available or an EOF/InputMismatchException occurs.",
    "hint": "Scanner waits until all requested tokens are supplied.",
    "level": "basic",
    "options": [
      "Scanner.nextInt() blocks and waits for the user to provide the remaining input.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// 3x3 matrix needs exactly 9 integer inputs"
  },
  {
    "id": 16,
    "question": "What exception is thrown if the user enters a non-integer string like 'hello' during matrix integer input?",
    "shortAnswer": "java.util.InputMismatchException",
    "explanation": "Scanner.nextInt() expects a valid integer token. If the input cannot be parsed into a 32-bit signed integer, an InputMismatchException is thrown.",
    "hint": "Input type does not match the method type.",
    "level": "basic",
    "options": [
      "java.util.InputMismatchException",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Entering 'abc' when sc.nextInt() is called -> InputMismatchException"
  },
  {
    "id": 17,
    "question": "How do you count the total number of even numbers and odd numbers in an M x N matrix?",
    "shortAnswer": "Initialize evenCount = 0 and oddCount = 0; inside the nested loops, test if (arr[i][j] % 2 == 0) evenCount++ else oddCount++.",
    "explanation": "Traverse every cell in row-major order and check divisibility by 2 using the modulus operator '%'.",
    "hint": "Use num % 2 == 0 for even check.",
    "level": "basic",
    "options": [
      "Initialize evenCount = 0 and oddCount = 0; inside the nested loops, test if (arr[i][j] % 2 == 0) evenCount++ else oddCount++.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int even = 0, odd = 0;\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        if (arr[i][j] % 2 == 0) even++;\n        else odd++;\n    }\n}"
  },
  {
    "id": 18,
    "question": "How do you find the maximum and minimum element in a 2D matrix?",
    "shortAnswer": "Initialize max = arr[0][0] and min = arr[0][0]; iterate through all cells and update max/min whenever a larger/smaller element is encountered.",
    "explanation": "Never initialize max to 0 or arbitrary values because matrix elements might all be negative. Always seed with arr[0][0].",
    "hint": "Always initialize max and min with the first matrix element arr[0][0].",
    "level": "basic",
    "options": [
      "Initialize max = arr[0][0] and min = arr[0][0]; iterate through all cells and update max/min whenever a larger/smaller element is encountered.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int max = arr[0][0], min = arr[0][0];\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        if (arr[i][j] > max) max = arr[i][j];\n        if (arr[i][j] < min) min = arr[i][j];\n    }\n}"
  },
  {
    "id": 19,
    "question": "In an ICSE Board exam question, what must be written before calling sc.nextInt() for matrix elements?",
    "shortAnswer": "A descriptive prompt message such as System.out.println(\"Enter elements:\"); or System.out.print(\"Enter element at [\" + i + \"][\" + j + \"]:\");",
    "explanation": "Good user prompts improve readability and make programs user-friendly, adhering to ICSE programming standards.",
    "hint": "Always prompt before reading input.",
    "level": "basic",
    "options": [
      "A descriptive prompt message such as System.out.println(\"Enter elements:\"); or System.out.print(\"Enter element at [\" + i + \"][\" + j + \"]:\");",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "System.out.print(\"Enter value for [\" + i + \"][\" + j + \"]: \");\nmat[i][j] = sc.nextInt();"
  },
  {
    "id": 20,
    "question": "What is the output if you forget the System.out.println() after the inner loop?",
    "shortAnswer": "All elements of the entire matrix will print consecutively on a single horizontal line.",
    "explanation": "Without the newline statement, the console cursor never moves down, destroying the 2D grid structure.",
    "hint": "The inner loop prints a single row; println() ends that row.",
    "level": "basic",
    "options": [
      "All elements of the entire matrix will print consecutively on a single horizontal line.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Without println(): 10 20 30 40 50 60\n// With println():\n// 10 20 30\n// 40 50 60"
  },
  {
    "id": 21,
    "question": "How do you input a matrix of floating point numbers (double)?",
    "shortAnswer": "Declare double[][] mat = new double[m][n]; and read elements using sc.nextDouble().",
    "explanation": "The data type double accommodates decimal values. The Scanner method nextDouble() parses floating-point tokens.",
    "hint": "Use double data type with nextDouble().",
    "level": "basic",
    "options": [
      "Declare double[][] mat = new double[m][n]; and read elements using sc.nextDouble().",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "double[][] mat = new double[3][3];\nmat[i][j] = sc.nextDouble();"
  },
  {
    "id": 22,
    "question": "How do you count the frequency of a particular number K in a 2D matrix?",
    "shortAnswer": "Initialize count = 0; traverse the matrix with nested loops and execute count++ whenever matrix[i][j] == K.",
    "explanation": "Linear check of every cell against the target K tallies all occurrences.",
    "hint": "Increment counter when element matches K.",
    "level": "basic",
    "options": [
      "Initialize count = 0; traverse the matrix with nested loops and execute count++ whenever matrix[i][j] == K.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int count = 0;\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        if (arr[i][j] == K) count++;\n    }\n}"
  },
  {
    "id": 23,
    "question": "Why should we close the Scanner object (sc.close()) at the end of the program?",
    "shortAnswer": "To prevent resource leaks by closing the underlying input stream.",
    "explanation": "While not strictly penalized in ICSE class 10, closing system resources is good programming practice in Java.",
    "hint": "Free system resources when done with input.",
    "level": "intermediate",
    "options": [
      "To prevent resource leaks by closing the underlying input stream.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "sc.close();"
  },
  {
    "id": 24,
    "question": "What is the effect of writing 'for (int i = 0; i < n; i++)' for rows and 'for (int j = 0; j < m; j++)' for columns when m != n?",
    "shortAnswer": "An ArrayIndexOutOfBoundsException will occur because dimensions m and n are swapped.",
    "explanation": "Outer loop index i goes up to row dimension m (arr.length), and inner loop index j goes up to column dimension n (arr[0].length). Swapping them in a non-square matrix causes index out of range.",
    "hint": "Rows go with M, Columns go with N.",
    "level": "intermediate",
    "options": [
      "An ArrayIndexOutOfBoundsException will occur because dimensions m and n are swapped.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// In a 2x4 matrix: arr has 2 rows and 4 cols.\n// If i < 4 and accesses arr[3][0], crash occurs!"
  },
  {
    "id": 25,
    "question": "How do you write the Variable Description Table for a Matrix Input/Output program in Section B of the ICSE exam?",
    "shortAnswer": "Include all variables: sc (Scanner), m (int - row count), n (int - col count), arr (int[][] - matrix), i (int - outer loop index), j (int - inner loop index).",
    "explanation": "A complete table lists every identifier declared, its exact data type, and its functional purpose in the solution.",
    "hint": "Document every variable declared in your code.",
    "level": "board-hot",
    "options": [
      "Include all variables: sc (Scanner), m (int - row count), n (int - col count), arr (int[][] - matrix), i (int - outer loop index), j (int - inner loop index).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "/*\n * VARIABLE TABLE:\n * sc   | Scanner | For keyboard input\n * m    | int     | Number of rows\n * n    | int     | Number of columns\n * arr  | int[][] | 2D matrix to store numbers\n * i    | int     | Row index counter\n * j    | int     | Column index counter\n */"
  }
];

export default questions;
