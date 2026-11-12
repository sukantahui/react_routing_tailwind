const questions = [
  {
    "id": 1,
    "question": "Why must the 'rowSum' accumulator variable be reset to 0 inside the outer loop when calculating row sums?",
    "shortAnswer": "To ensure that each row's sum starts afresh from zero and does not accumulate values from previously processed rows.",
    "explanation": "If 'rowSum' is declared and initialized outside the outer loop, Row 1 will add to Row 0's sum, Row 2 will add to Row 1's sum, producing cumulative running totals instead of independent row sums.",
    "hint": "Each row is an independent calculation; reset the accumulator before starting its column loop.",
    "level": "basic",
    "options": [
      "To ensure that each row's sum starts afresh from zero and does not accumulate values from previously processed rows.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < m; i++) {\n    int rowSum = 0; // Reset for each new row!\n    for (int j = 0; j < n; j++) {\n        rowSum += matrix[i][j];\n    }\n    System.out.println(\"Row \" + i + \" Sum = \" + rowSum);\n}"
  },
  {
    "id": 2,
    "question": "How do loop structures differ between calculating Row Sums and Column Sums?",
    "shortAnswer": "Row sum uses row index 'i' on the outer loop and column index 'j' on the inner loop. Column sum inverts this by placing column index 'j' on the outer loop and row index 'i' on the inner loop.",
    "explanation": "To calculate the sum of Column j, you must hold column index j constant while iterating row index i through all rows from 0 to m - 1. Thus, the outer loop is 'j' and the inner loop is 'i'.",
    "hint": "For column sums, the outer loop iterates over columns (j) and the inner loop iterates over rows (i).",
    "level": "basic",
    "options": [
      "Row sum uses row index 'i' on the outer loop and column index 'j' on the inner loop. Column sum inverts this by placing column index 'j' on the outer loop and row index 'i' on the inner loop.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Column Sums:\nfor (int j = 0; j < cols; j++) {\n    int colSum = 0;\n    for (int i = 0; i < rows; i++) {\n        colSum += matrix[i][j];\n    }\n    System.out.println(\"Col \" + j + \" Sum = \" + colSum);\n}"
  },
  {
    "id": 3,
    "question": "Can both Row Sums and Column Sums be calculated simultaneously in a single pass of nested loops?",
    "shortAnswer": "Yes, by maintaining 1D accumulator arrays 'int[] rowSums = new int[m]' and 'int[] colSums = new int[n]' and accumulating both inside the same nested loop.",
    "explanation": "Inside the nested loops (i from 0 to m-1, j from 0 to n-1), you can execute rowSums[i] += matrix[i][j]; and colSums[j] += matrix[i][j]; in a single pass O(M*N).",
    "hint": "Use 1D arrays to hold ongoing sums for all rows and columns.",
    "level": "intermediate",
    "options": [
      "Yes, by maintaining 1D accumulator arrays 'int[] rowSums = new int[m]' and 'int[] colSums = new int[n]' and accumulating both inside the same nested loop.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int[] rSum = new int[m];\nint[] cSum = new int[n];\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        rSum[i] += matrix[i][j];\n        cSum[j] += matrix[i][j];\n    }\n}"
  },
  {
    "id": 4,
    "question": "How do you find the index of the row with the Maximum Row Sum in a matrix?",
    "shortAnswer": "Track maxSum and maxRowIndex; compare each row's calculated sum against maxSum and update both if a higher sum is found.",
    "explanation": "Initialize maxSum to Integer.MIN_VALUE or the first row's sum. For every row i, calculate rowSum. If rowSum > maxSum, set maxSum = rowSum and maxRowIndex = i.",
    "hint": "Compare rowSum with a running maxSum variable.",
    "level": "intermediate",
    "options": [
      "Track maxSum and maxRowIndex; compare each row's calculated sum against maxSum and update both if a higher sum is found.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int maxSum = Integer.MIN_VALUE, bestRow = 0;\nfor (int i = 0; i < m; i++) {\n    int rSum = 0;\n    for (int j = 0; j < n; j++) rSum += arr[i][j];\n    if (rSum > maxSum) {\n        maxSum = rSum;\n        bestRow = i;\n    }\n}\nSystem.out.println(\"Row with max sum: \" + bestRow + \" (Sum = \" + maxSum + \")\");"
  },
  {
    "id": 5,
    "question": "How do you calculate the Grand Total (sum of all elements) in a 2D matrix?",
    "shortAnswer": "Declare a grandTotal accumulator outside all loops, initialize it to 0, and add matrix[i][j] (or rowSum) during traversal.",
    "explanation": "Grand total is the sum of all M * N cells. It can be accumulated cell-by-cell or by adding each rowSum to grandTotal.",
    "hint": "Grand total sums all rows together.",
    "level": "basic",
    "options": [
      "Declare a grandTotal accumulator outside all loops, initialize it to 0, and add matrix[i][j] (or rowSum) during traversal.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int grandTotal = 0;\nfor (int i = 0; i < m; i++) {\n    for (int j = 0; j < n; j++) {\n        grandTotal += matrix[i][j];\n    }\n}"
  },
  {
    "id": 6,
    "question": "What happens if a matrix has negative numbers when calculating row sums?",
    "shortAnswer": "Negative numbers decrease the sum algebraically (e.g., 10 + (-4) + 5 = 11).",
    "explanation": "The addition operator '+' in Java handles signed integer arithmetic naturally, adding positive and negative integers correctly.",
    "hint": "Standard addition handles positive and negative signs.",
    "level": "basic",
    "options": [
      "Negative numbers decrease the sum algebraically (e.g., 10 + (-4) + 5 = 11).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int sum = 10 + (-4) + 5; // sum is 11"
  },
  {
    "id": 7,
    "question": "How do you calculate the average of elements in each individual row?",
    "shortAnswer": "Divide the row's total sum by the number of columns: double rowAvg = (double) rowSum / cols;",
    "explanation": "Casting rowSum to (double) before division prevents integer truncation and yields accurate decimal averages.",
    "hint": "Cast to double to prevent integer division truncation.",
    "level": "basic",
    "options": [
      "Divide the row's total sum by the number of columns: double rowAvg = (double) rowSum / cols;",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < m; i++) {\n    int rSum = 0;\n    for (int j = 0; j < n; j++) rSum += arr[i][j];\n    double avg = (double) rSum / n;\n    System.out.println(\"Row \" + i + \" Average: \" + avg);\n}"
  },
  {
    "id": 8,
    "question": "In a 3x4 matrix, what are the loop boundaries for calculating the sum of column 2 specifically?",
    "shortAnswer": "Set j = 2 and loop i from 0 to 2 (i < 3).",
    "explanation": "To sum a single specific column, no outer loop is needed. Fix j = 2 and iterate row index i from 0 to rows - 1.",
    "hint": "Only row index i needs to vary when column j is fixed.",
    "level": "basic",
    "options": [
      "Set j = 2 and loop i from 0 to 2 (i < 3).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int sumCol2 = 0;\nfor (int i = 0; i < 3; i++) {\n    sumCol2 += matrix[i][2];\n}"
  },
  {
    "id": 9,
    "question": "How do you store the sums of all rows into a 1D array?",
    "shortAnswer": "Create 'int[] rSums = new int[m];' and assign rSums[i] = rowSum after the inner loop finishes.",
    "explanation": "An array of size m stores one integer per row, capturing all row sums for subsequent processing or sorting.",
    "hint": "Array size equals the number of rows.",
    "level": "basic",
    "options": [
      "Create 'int[] rSums = new int[m];' and assign rSums[i] = rowSum after the inner loop finishes.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int[] rSums = new int[m];\nfor (int i = 0; i < m; i++) {\n    int sum = 0;\n    for (int j = 0; j < n; j++) sum += arr[i][j];\n    rSums[i] = sum;\n}"
  },
  {
    "id": 10,
    "question": "How do you store the sums of all columns into a 1D array?",
    "shortAnswer": "Create 'int[] cSums = new int[n];' and assign cSums[j] = colSum after the inner loop finishes.",
    "explanation": "An array of size n stores one integer per column, capturing all column totals.",
    "hint": "Array size equals the number of columns.",
    "level": "basic",
    "options": [
      "Create 'int[] cSums = new int[n];' and assign cSums[j] = colSum after the inner loop finishes.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int[] cSums = new int[n];\nfor (int j = 0; j < n; j++) {\n    int sum = 0;\n    for (int i = 0; i < m; i++) sum += arr[i][j];\n    cSums[j] = sum;\n}"
  },
  {
    "id": 11,
    "question": "What is a 'Magic Square' in ICSE matrix programming?",
    "shortAnswer": "A square matrix where the sum of every row, every column, and both diagonals are all equal to the same constant sum.",
    "explanation": "To verify a magic square: 1) Check if all row sums equal target sum; 2) Check if all column sums equal target sum; 3) Check primary diagonal sum; 4) Check secondary diagonal sum.",
    "hint": "All rows, columns, and both diagonals must yield identical sums.",
    "level": "advanced",
    "options": [
      "A square matrix where the sum of every row, every column, and both diagonals are all equal to the same constant sum.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Magic square check snippet:\n// int target = primaryDiagonalSum;\n// Verify rowSums[i] == target && colSums[j] == target && secDiagSum == target"
  },
  {
    "id": 12,
    "question": "What is the time complexity of calculating all row sums and column sums in an M x N matrix?",
    "shortAnswer": "O(M * N) time complexity.",
    "explanation": "Row sum calculation inspects M * N elements, and column sum calculation inspects N * M elements. Total time is proportional to 2 * (M * N), which simplifies to O(M * N).",
    "hint": "Linear with respect to the total number of cells.",
    "level": "intermediate",
    "options": [
      "O(M * N) time complexity.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// For a 3x3 matrix: 9 operations for rows + 9 for cols = 18 total steps"
  },
  {
    "id": 13,
    "question": "How do you calculate the sum of only the even elements in each row?",
    "shortAnswer": "Inside the inner column loop, add a condition: if (matrix[i][j] % 2 == 0) rowEvenSum += matrix[i][j];",
    "explanation": "The modulo operator % 2 filters for even numbers before adding to the row accumulator.",
    "hint": "Use an if condition inside the inner loop.",
    "level": "basic",
    "options": [
      "Inside the inner column loop, add a condition: if (matrix[i][j] % 2 == 0) rowEvenSum += matrix[i][j];",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < m; i++) {\n    int evenSum = 0;\n    for (int j = 0; j < n; j++) {\n        if (arr[i][j] % 2 == 0) evenSum += arr[i][j];\n    }\n    System.out.println(\"Row \" + i + \" Even Sum = \" + evenSum);\n}"
  },
  {
    "id": 14,
    "question": "What will happen if you initialize 'colSum = 0' inside the inner loop when calculating column sums?",
    "shortAnswer": "colSum will be reset on every row iteration, resulting in only the last row's element being retained.",
    "explanation": "The accumulator for Column j must be reset outside the inner loop (in the outer column loop) so it can sum across all rows for that column.",
    "hint": "Reset the column accumulator before entering the row loop, not inside it.",
    "level": "intermediate",
    "options": [
      "colSum will be reset on every row iteration, resulting in only the last row's element being retained.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// WRONG:\n// for (int j=0; j<n; j++) {\n//     for (int i=0; i<m; i++) { int colSum = 0; colSum += arr[i][j]; }\n// }"
  },
  {
    "id": 15,
    "question": "How do you find the Column with the Minimum Column Sum in a matrix?",
    "shortAnswer": "Maintain minSum = Integer.MAX_VALUE and minColIdx = 0; compare each column's calculated total and update.",
    "explanation": "Iterate outer loop j (columns), calculate colSum across rows i. If colSum < minSum, update minSum and minColIdx.",
    "hint": "Track running minimum across all column sums.",
    "level": "intermediate",
    "options": [
      "Maintain minSum = Integer.MAX_VALUE and minColIdx = 0; compare each column's calculated total and update.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int minSum = Integer.MAX_VALUE, bestCol = 0;\nfor (int j = 0; j < n; j++) {\n    int cSum = 0;\n    for (int i = 0; i < m; i++) cSum += arr[i][j];\n    if (cSum < minSum) {\n        minSum = cSum;\n        bestCol = j;\n    }\n}\nSystem.out.println(\"Column with min sum: \" + bestCol);"
  },
  {
    "id": 16,
    "question": "How do you display a 2D matrix alongside its Row Sums on the right of each row?",
    "shortAnswer": "Inside the row loop, print each element with '\\t'; after the inner loop, print the row's sum on the same line before calling println().",
    "explanation": "This creates a neat report layout where each row displays its data followed by its total: [ 10  20  30 | Sum = 60 ].",
    "hint": "Print the row sum before calling System.out.println().",
    "level": "basic",
    "options": [
      "Inside the row loop, print each element with '\\t'; after the inner loop, print the row's sum on the same line before calling println().",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < m; i++) {\n    int rSum = 0;\n    for (int j = 0; j < n; j++) {\n        System.out.print(arr[i][j] + \"\\t\");\n        rSum += arr[i][j];\n    }\n    System.out.println(\"| Sum = \" + rSum);\n}"
  },
  {
    "id": 17,
    "question": "What is the sum of row 1 in the matrix: {{5, 10, 15}, {20, 25, 30}, {35, 40, 45}}?",
    "shortAnswer": "75 (Row 1 contains elements 20, 25, 30; 20 + 25 + 30 = 75).",
    "explanation": "Row 0 is {5, 10, 15} (Sum=30). Row 1 is {20, 25, 30} (Sum=75). Row 2 is {35, 40, 45} (Sum=120).",
    "hint": "Remember row indices are 0, 1, 2. Row 1 is the middle row.",
    "level": "basic",
    "options": [
      "75 (Row 1 contains elements 20, 25, 30; 20 + 25 + 30 = 75).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Row 1 sum = 20 + 25 + 30 = 75"
  },
  {
    "id": 18,
    "question": "What is the sum of column 0 in the matrix: {{5, 10, 15}, {20, 25, 30}, {35, 40, 45}}?",
    "shortAnswer": "60 (Column 0 contains elements 5, 20, 35; 5 + 20 + 35 = 60).",
    "explanation": "Column 0 elements are arr[0][0] = 5, arr[1][0] = 20, arr[2][0] = 35. Total = 60.",
    "hint": "Look at the first vertical column: 5 + 20 + 35.",
    "level": "basic",
    "options": [
      "60 (Column 0 contains elements 5, 20, 35; 5 + 20 + 35 = 60).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Col 0 sum = 5 + 20 + 35 = 60"
  },
  {
    "id": 19,
    "question": "How can integer overflow occur during row sum calculations in Java?",
    "shortAnswer": "If matrix elements are very large positive integers whose sum exceeds Integer.MAX_VALUE (2,147,483,647), causing the sum to wrap around to negative numbers.",
    "explanation": "To prevent overflow with large values, use the 'long' data type for accumulator variables: long rowSum = 0L;.",
    "hint": "Use long instead of int to prevent overflow with large integers.",
    "level": "advanced",
    "options": [
      "If matrix elements are very large positive integers whose sum exceeds Integer.MAX_VALUE (2,147,483,647), causing the sum to wrap around to negative numbers.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "long rowSum = 0L;\nfor (int j = 0; j < n; j++) {\n    rowSum += matrix[i][j];\n}"
  },
  {
    "id": 20,
    "question": "How do you calculate the product of elements in each row instead of the sum?",
    "shortAnswer": "Initialize rowProduct = 1 (multiplicative identity), and multiply inside the inner loop: rowProduct *= matrix[i][j];",
    "explanation": "Unlike summation where the neutral identity is 0, multiplication requires initializing the accumulator to 1 (initializing to 0 would always produce 0).",
    "hint": "Product accumulators must start at 1, not 0.",
    "level": "basic",
    "options": [
      "Initialize rowProduct = 1 (multiplicative identity), and multiply inside the inner loop: rowProduct *= matrix[i][j];",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < m; i++) {\n    int prod = 1;\n    for (int j = 0; j < n; j++) prod *= arr[i][j];\n    System.out.println(\"Row \" + i + \" Product = \" + prod);\n}"
  },
  {
    "id": 21,
    "question": "What is the effect of writing 'for (int i = 0; i < cols; i++)' when calculating row sums of a 2x4 matrix?",
    "shortAnswer": "ArrayIndexOutOfBoundsException when i >= 2.",
    "explanation": "In a 2x4 matrix, rows = 2 and cols = 4. If the outer row loop tests i < 4, when i = 2 or 3, matrix[i] does not exist.",
    "hint": "Row loop must bound against row dimension (matrix.length).",
    "level": "basic",
    "options": [
      "ArrayIndexOutOfBoundsException when i >= 2.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// Matrix has 2 rows. i < 4 attempts matrix[2][0], which crashes!"
  },
  {
    "id": 22,
    "question": "How do you check if all rows in a matrix have equal sums?",
    "shortAnswer": "Calculate the sum of Row 0 as a baseline; iterate through rows 1 to m - 1 and verify if each row's sum equals the baseline.",
    "explanation": "If any row's sum differs from the baseline, set a boolean flag allEqual = false and break.",
    "hint": "Compare every subsequent row sum against row 0's sum.",
    "level": "intermediate",
    "options": [
      "Calculate the sum of Row 0 as a baseline; iterate through rows 1 to m - 1 and verify if each row's sum equals the baseline.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "int target = 0;\nfor (int j = 0; j < n; j++) target += arr[0][j];\nboolean equal = true;\nfor (int i = 1; i < m; i++) {\n    int rSum = 0;\n    for (int j = 0; j < n; j++) rSum += arr[i][j];\n    if (rSum != target) { equal = false; break; }\n}"
  },
  {
    "id": 23,
    "question": "How do you calculate row sums in a Jagged Array where each row has a different number of columns?",
    "shortAnswer": "Use 'matrix[i].length' as the inner loop limit for each row: for (int j = 0; j < matrix[i].length; j++).",
    "explanation": "Because jagged arrays have varying column counts per row, hardcoding a fixed column size causes errors. Using matrix[i].length adapts dynamically to each row's specific length.",
    "hint": "matrix[i].length dynamically measures row i's length.",
    "level": "intermediate",
    "options": [
      "Use 'matrix[i].length' as the inner loop limit for each row: for (int j = 0; j < matrix[i].length; j++).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "for (int i = 0; i < jagged.length; i++) {\n    int sum = 0;\n    for (int j = 0; j < jagged[i].length; j++) {\n        sum += jagged[i][j];\n    }\n    System.out.println(\"Row \" + i + \" Sum: \" + sum);\n}"
  },
  {
    "id": 24,
    "question": "Why should we display the original matrix before printing the row/column sum results in ICSE exams?",
    "shortAnswer": "To provide a complete, clear output transcript demonstrating that the calculations match the input grid.",
    "explanation": "ICSE Board evaluators award marks for clarity and complete test case output, including displaying the input matrix in grid form.",
    "hint": "Always display the input grid first, then your results.",
    "level": "board-hot",
    "options": [
      "To provide a complete, clear output transcript demonstrating that the calculations match the input grid.",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "// 1. Print Matrix Grid\n// 2. Print Row Sums\n// 3. Print Column Sums\n// 4. Print Grand Total"
  },
  {
    "id": 25,
    "question": "What variables must be documented in the Variable Description Table for a Row/Col sum program in ICSE Section B?",
    "shortAnswer": "sc (Scanner), m (int), n (int), matrix (int[][]), i (int), j (int), rowSum (int), colSum (int), grandTotal (int).",
    "explanation": "Listing all declared variables with their precise data types and descriptions ensures maximum documentation marks.",
    "hint": "Include loop indices, dimension variables, matrix, and accumulators.",
    "level": "board-hot",
    "options": [
      "sc (Scanner), m (int), n (int), matrix (int[][]), i (int), j (int), rowSum (int), colSum (int), grandTotal (int).",
      "Incorrect: Violates Java syntax and JVM runtime execution rules.",
      "Incorrect: Compiler error occurs due to improper type conversion.",
      "Incorrect: Fall-through or out of bounds exception is triggered."
    ],
    "correctAnswer": 0,
    "codeExample": "/*\n * VARIABLE TABLE:\n * rowSum    | int | Stores sum of current row elements\n * colSum    | int | Stores sum of current column elements\n * grandTotal| int | Stores overall total sum\n */"
  }
];

export default questions;
