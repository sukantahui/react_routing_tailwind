const questions = [
    {
        question: "What is array traversal?",
        shortAnswer: "Visiting each element of an array exactly once.",
        explanation: "Traversal is the process of iterating through all elements, typically from first to last index, to perform some operation like printing, summing, or searching.",
        hint: "Think of walking through a list.",
        level: "basic",
        codeExample: "for (int i = 0; i < arr.length; i++) { System.out.println(arr[i]); }"
    },
    {
        question: "What are the two main ways to traverse a 1D array in Java?",
        shortAnswer: "Traditional for loop and enhanced for loop (for-each).",
        explanation: "The traditional for loop uses an index variable. The enhanced for loop automatically iterates over each element without an index.",
        hint: "Index vs element.",
        level: "basic",
        codeExample: "// Traditional: for (int i=0; i<arr.length; i++) // For-each: for (int x : arr)"
    },
    {
        question: "Can you modify array elements using the enhanced for loop?",
        shortAnswer: "No, not for primitive arrays.",
        explanation: "The enhanced for loop gives a copy of the value (for primitives) or reference (for objects). Modifying the loop variable does not affect the original array element.",
        hint: "For-each is read-only for primitives.",
        level: "intermediate",
        codeExample: "for (int x : arr) { x = 10; } // arr unchanged"
    },
    {
        question: "What is row-major traversal of a 2D array?",
        shortAnswer: "Visiting elements row by row (outer loop rows, inner loop columns).",
        explanation: "In row-major order, you traverse all columns of the first row, then all columns of the second row, and so on. This is the default in Java and is cache-friendly.",
        hint: "Like reading a book line by line.",
        level: "basic",
        codeExample: "for (int i=0; i<rows; i++) for (int j=0; j<cols; j++) process(matrix[i][j]);"
    },
    {
        question: "What is column-major traversal?",
        shortAnswer: "Visiting elements column by column.",
        explanation: "You traverse all rows of the first column, then all rows of the second column, etc. This is less efficient in Java due to memory layout.",
        hint: "Like reading a book column by column.",
        level: "intermediate",
        codeExample: "for (int j=0; j<cols; j++) for (int i=0; i<rows; i++) process(matrix[i][j]);"
    },
    {
        question: "Why is row-major traversal faster than column-major in Java?",
        shortAnswer: "Due to spatial locality and CPU caching.",
        explanation: "Java stores 2D arrays as arrays of rows. Row-major accesses contiguous memory locations (same row), leading to fewer cache misses. Column-major jumps between rows, causing cache thrashing.",
        hint: "Cache friendliness.",
        level: "expert",
        codeExample: "Row-major: fast; Column-major: slow for large matrices."
    },
    {
        question: "How do you traverse a jagged 2D array?",
        shortAnswer: "Use matrix[i].length for each row's column count.",
        explanation: "In a jagged array, rows have different lengths. You must obtain the length of each row inside the inner loop condition.",
        hint: "Don't assume a fixed column count.",
        level: "intermediate",
        codeExample: "for (int i=0; i<matrix.length; i++) for (int j=0; j<matrix[i].length; j++)"
    },
    {
        question: "What is the time complexity of traversing an array of size n?",
        shortAnswer: "O(n) for 1D, O(rows*cols) for 2D.",
        explanation: "You visit each element exactly once, so time is proportional to the number of elements.",
        hint: "Linear time.",
        level: "basic",
        codeExample: "// 1D: n steps, 2D: r*c steps"
    },
    {
        question: "What happens if you use <= instead of < in a traversal loop?",
        shortAnswer: "ArrayIndexOutOfBoundsException.",
        explanation: "Valid indices are 0 to length-1. Using <= length tries to access index length, which is out of bounds.",
        hint: "Off-by-one error.",
        level: "basic",
        codeExample: "for (int i=0; i<=arr.length; i++) // throws exception when i == arr.length"
    },
    {
        question: "Can you traverse an array backwards?",
        shortAnswer: "Yes, by starting from length-1 and decrementing.",
        explanation: "Use a for loop with i = arr.length-1; i >= 0; i-- to traverse in reverse order.",
        hint: "Reverse loop.",
        level: "basic",
        codeExample: "for (int i=arr.length-1; i>=0; i--) { System.out.println(arr[i]); }"
    },
    {
        question: "How do you traverse only part of an array (e.g., first 5 elements)?",
        shortAnswer: "Change the loop condition to i < limit.",
        explanation: "Instead of going to arr.length, use a smaller bound like i < 5 or i <= lastIndex.",
        hint: "Partial traversal.",
        level: "intermediate",
        codeExample: "for (int i=0; i<5 && i<arr.length; i++)"
    },
    {
        question: "What is the difference between traversing and searching?",
        shortAnswer: "Traversal visits every element; searching stops early when target is found.",
        explanation: "Traversal is complete (O(n)). Searching can be optimized (e.g., binary search O(log n)) but may still require traversal in linear search.",
        hint: "Full walk vs early exit.",
        level: "intermediate",
        codeExample: "// Linear search traverses until found"
    },
    {
        question: "How do you traverse a 2D array diagonally?",
        shortAnswer: "Use loops where i == j for main diagonal.",
        explanation: "Diagonal traversal is not a simple nested loop; you need to handle i+j constraints for secondary diagonal or use specific patterns.",
        hint: "Special indices.",
        level: "expert",
        codeExample: "for (int i=0; i<rows; i++) System.out.println(matrix[i][i]); // main diagonal"
    },
    {
        question: "What is the 'for-each' loop called in Java?",
        shortAnswer: "Enhanced for loop.",
        explanation: "Introduced in Java 5, it simplifies iteration over arrays and collections. It is not a true for-each like in some languages but a syntactic sugar.",
        hint: "Also known as enhanced for.",
        level: "basic",
        codeExample: "for (Type var : iterable) { }"
    },
    {
        question: "Can you use for-each with a 2D array?",
        shortAnswer: "Yes, but you get rows as 1D arrays.",
        explanation: "Using for-each on a 2D array iterates over each row (as a 1D array). You need a nested for-each to access individual elements.",
        hint: "Nested for-each.",
        level: "intermediate",
        codeExample: "for (int[] row : matrix) for (int val : row) System.out.println(val);"
    },
    {
        question: "How do you traverse a 2D array in spiral order?",
        shortAnswer: "Using boundary variables (top, bottom, left, right) and loops.",
        explanation: "Spiral traversal requires careful management of four boundaries, reducing them after each cycle. This is an advanced traversal pattern.",
        hint: "Four pointers.",
        level: "expert",
        codeExample: "while (top <= bottom && left <= right) { /* traverse top row, right col, bottom row, left col */ }"
    },
    {
        question: "What is the space complexity of array traversal?",
        shortAnswer: "O(1) additional space (if not storing results).",
        explanation: "Traversal itself uses only a few loop variables, regardless of array size. However, if you copy the array, space becomes O(n).",
        hint: "Constant extra space.",
        level: "basic",
        codeExample: "// Only i and j variables"
    },
    {
        question: "How do you skip certain elements during traversal?",
        shortAnswer: "Use continue statement or conditional inside loop.",
        explanation: "You can use an if condition to skip processing for some indices and continue the loop.",
        hint: "Conditional processing.",
        level: "intermediate",
        codeExample: "for (int i=0; i<arr.length; i++) { if (arr[i] % 2 == 0) continue; // process odd only }"
    },
    {
        question: "What is the difference between for loop and while loop for traversal?",
        shortAnswer: "For loop is more concise for known number of iterations; while is used when termination condition is complex.",
        explanation: "Both work, but for loops are idiomatic for array traversal because the number of iterations is fixed (array length).",
        hint: "Style preference.",
        level: "basic",
        codeExample: "int i=0; while (i<arr.length) { ... i++; }"
    },
    {
        question: "How do you traverse multiple arrays simultaneously?",
        shortAnswer: "Use a single index loop if arrays have same length.",
        explanation: "You can access arr1[i] and arr2[i] inside the same loop to process corresponding elements (e.g., vector addition).",
        hint: "Parallel traversal.",
        level: "intermediate",
        codeExample: "for (int i=0; i<arr1.length; i++) { result[i] = arr1[i] + arr2[i]; }"
    },
    {
        question: "What is the effect of modifying an array while traversing it?",
        shortAnswer: "It can cause logical errors but not exceptions if indices remain valid.",
        explanation: "Modifying elements is fine, but inserting or deleting elements (not possible in arrays) would require resizing. Changing values does not break traversal.",
        hint: "Safe to modify values.",
        level: "intermediate",
        codeExample: "for (int i=0; i<arr.length; i++) arr[i] *= 2; // valid"
    },
    {
        question: "How do you traverse a 2D array in zigzag (snake) pattern?",
        shortAnswer: "Reverse alternate rows during traversal.",
        explanation: "Traverse row 0 left to right, row 1 right to left, row 2 left to right, etc. You can use a boolean flag or check row index % 2.",
        hint: "Alternating direction.",
        level: "expert",
        codeExample: "for (int i=0; i<rows; i++) { if (i%2==0) for j=0..cols-1; else for j=cols-1..0; }"
    },
    {
        question: "What is the 'array index out of bounds' exception and how to avoid it?",
        shortAnswer: "Exception when accessing index < 0 or >= length. Avoid by checking bounds and using length property.",
        explanation: "Always ensure loop conditions use < length, and validate any computed indices before access.",
        hint: "Respect 0 to length-1.",
        level: "basic",
        codeExample: "if (index >= 0 && index < arr.length) { use arr[index]; }"
    },
    {
        question: "How do you find the length of a 2D array's rows and columns?",
        shortAnswer: "rows = matrix.length; cols = matrix[0].length (if rectangular).",
        explanation: "For jagged arrays, use matrix[i].length for each row. For rectangular, matrix[0].length works only if at least one row exists.",
        hint: "Be careful with empty arrays.",
        level: "basic",
        codeExample: "if (matrix.length > 0) { int cols = matrix[0].length; }"
    },
    {
        question: "What is the performance difference between using arr.length in loop condition vs storing in a variable?",
        shortAnswer: "Negligible; JVM optimizes it. Use whichever is clearer.",
        explanation: "Modern JIT compilers inline the length field access, so storing in a local variable doesn't improve performance. Use direct arr.length for readability.",
        hint: "No micro-optimization needed.",
        level: "expert",
        codeExample: "for (int i=0; i<arr.length; i++) // fine"
    },
    {
        question: "How do you traverse an array of objects and call a method on each?",
        shortAnswer: "Use for loop or for-each and call the method.",
        explanation: "If the objects have a method, you can call it inside the loop. For-each is convenient if you don't need the index.",
        hint: "Method invocation per element.",
        level: "intermediate",
        codeExample: "for (Student s : students) { s.printDetails(); }"
    },
    {
        question: "Can you traverse an array using recursion?",
        shortAnswer: "Yes, but not recommended for large arrays due to stack overflow.",
        explanation: "You can write a recursive function that processes index i and calls itself with i+1. However, iterative loops are safer and more efficient.",
        hint: "Recursion adds overhead.",
        level: "expert",
        codeExample: "void traverse(int[] arr, int i) { if (i == arr.length) return; System.out.println(arr[i]); traverse(arr, i+1); }"
    },
    {
        question: "What is the difference between traversal and iteration?",
        shortAnswer: "They are often used interchangeably; iteration is the broader term.",
        explanation: "Traversal specifically means visiting each element. Iteration is the process of repeatedly executing a block of code; in arrays, it's the mechanism for traversal.",
        hint: "Subtle semantics.",
        level: "basic",
        codeExample: "Looping is iteration, visiting elements is traversal."
    },
    {
        question: "How do you traverse a 2D array in boundary (perimeter) order?",
        shortAnswer: "Traverse top row, right column, bottom row, left column, then recurse inward.",
        explanation: "This is similar to spiral order but only the outer boundary. You need to handle single row or single column edge cases.",
        hint: "Four sides.",
        level: "expert",
        codeExample: "// top row: for j from left to right; right col: for i from top+1 to bottom; bottom row: for j from right-1 to left; left col: for i from bottom-1 to top+1"
    },
    {
        question: "What is the best way to debug a traversal loop?",
        shortAnswer: "Print index and value at each step, or use a debugger with breakpoints.",
        explanation: "Adding temporary print statements inside the loop helps trace execution. Modern IDEs allow conditional breakpoints to pause when specific indices are reached.",
        hint: "Trace with prints.",
        level: "basic",
        codeExample: "System.out.println(\"i=\" + i + \", value=\" + arr[i]);"
    }
];

export default questions;