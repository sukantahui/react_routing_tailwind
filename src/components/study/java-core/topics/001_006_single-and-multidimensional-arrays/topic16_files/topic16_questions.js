/**
 * Module 001_006: Topic 16: Jagged / Ragged arrays (arrays of arrays with varying row lengths)
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is a Jagged (Ragged) Array in Java?",
    shortAnswer: "A multidimensional 2D array in which each row can have a DIFFERENT number of columns (varying row lengths), made possible because Java represents 2D arrays as arrays of independent 1D reference pointers.",
    explanation: "Core definition of jagged array in Java (JLS §10.1).",
    hint: "A 2D array where different rows have different lengths.",
    level: "basic",
    codeExample: "int[][] jagged = new int[3][]; jagged[0] = new int[2]; jagged[1] = new int[5];"
  },
  {
    question: "How do you instantiate a Jagged Array in a Two-Step process?",
    shortAnswer: "Step 1: Declare outer row container `int[][] arr = new int[3][];`; Step 2: Instantiate each row separately `arr[0] = new int[2]; arr[1] = new int[4]; arr[2] = new int[1];`.",
    explanation: "Two-step dynamic allocation pattern.",
    hint: "new Type[rows][] followed by allocating each row individually.",
    level: "basic",
    codeExample: "double[][] b = new double[3][]; b[0] = new double[2]; b[1] = new double[4];"
  },
  {
    question: "What is the initial value of `arr[0]` immediately after executing `int[][] arr = new int[3][];`?",
    shortAnswer: "`null` (because the outer array only holds reference pointers, and no inner 1D arrays have been allocated yet).",
    explanation: "Uninitialized reference pointer state.",
    hint: "null.",
    level: "basic",
    codeExample: "int[][] a = new int[3][]; System.out.println(a[0]); // prints null"
  },
  {
    question: "What error occurs if you access `arr[0][0]` on `int[][] arr = new int[3][];` before allocating row 0?",
    shortAnswer: "`java.lang.NullPointerException` (dereferencing a null row reference).",
    explanation: "Null pointer exception on unallocated row.",
    hint: "NullPointerException.",
    level: "basic",
    codeExample: "int[][] a = new int[3][];\n// a[0][0] = 10; // THROWS NullPointerException!"
  },
  {
    question: "In the Coder & AccoTax Barrackpore multi-campus batch matrix, how many seats did each campus have?",
    shortAnswer: "Barrackpore had 3 seats, Naihati had 2 seats, Shyamnagar had 4 seats, and Ichapur had 1 seat, demonstrating jagged capacity allocation in Indian Rupees (₹).",
    explanation: "Practical application of ragged matrices.",
    hint: "3, 2, 4, and 1 seats across the 4 campuses.",
    level: "basic",
    codeExample: "campusBatches[0].length = 3; campusBatches[1].length = 2;"
  },
  {
    question: "Why is `c < matrix[r].length` mandatory when traversing a jagged array in a loop?",
    shortAnswer: "Because each row $r$ has a unique column count; checking `c < matrix[r].length` ensures the inner loop stops exactly at that row's boundary, preventing `ArrayIndexOutOfBoundsException`.",
    explanation: "Row-specific loop boundary invariant.",
    hint: "Guarantees the column loop respects the unique capacity of that specific row.",
    level: "basic",
    codeExample: "for (int r=0; r<matrix.length; r++) for (int c=0; c<matrix[r].length; c++)"
  },
  {
    question: "How do you instantiate a Jagged Array using a direct array literal?",
    shortAnswer: "`int[][] jagged = {{1, 2}, {3, 4, 5, 6}, {7}};`.",
    explanation: "Literal jagged initialization syntax.",
    hint: "Nested curly braces with differing inner element counts.",
    level: "basic",
    codeExample: "int[][] j = {{10, 20}, {30, 40, 50}, {60}};"
  },
  {
    question: "How is Pascal's Triangle naturally modeled as a Jagged Array?",
    shortAnswer: "Each level $i$ (from $0$ to $N-1$) is allocated with exactly $(i + 1)$ columns: `pascal[i] = new int[i + 1];`.",
    explanation: "Triangular jagged matrix structure.",
    hint: "Row i is allocated with (i + 1) columns.",
    level: "basic",
    codeExample: "for (int i = 0; i < n; i++) pascal[i] = new int[i + 1];"
  },
  {
    question: "What is the memory advantage of a Jagged Array over a fixed-width Rectangular Array?",
    shortAnswer: "It saves significant memory by allocating ONLY the exact number of elements required for each row, avoiding unused null/zero padding slots.",
    explanation: "Memory footprint minimization.",
    hint: "Eliminates wasted memory padding in rows with fewer elements.",
    level: "intermediate",
    codeExample: "// Saves memory when rows have varying data sizes"
  },
  {
    question: "Can an Enhanced For-Each loop traverse Jagged Arrays without modification?",
    shortAnswer: "YES! `for (double[] row : campusBatches) for (double fee : row)` automatically handles varying row lengths with zero changes.",
    explanation: "For-each loop flexibility on ragged arrays.",
    hint: "Yes, for-each handles jagged arrays seamlessly.",
    level: "basic",
    codeExample: "for (double[] row : jagged) for (double val : row) System.out.println(val);"
  },
  {
    question: "Can a row in a Jagged Array be an empty array of length 0 (`jagged[0] = new int[0];`)?",
    shortAnswer: "YES! Zero-length row arrays are completely valid in Java.",
    explanation: "Zero-capacity inner row validity.",
    hint: "Yes, empty row arrays are legal.",
    level: "basic",
    codeExample: "jagged[0] = new int[0]; // Legal empty row"
  },
  {
    question: "How do you calculate the total number of elements across all rows in a Jagged Array?",
    shortAnswer: "`int count = 0; for (int r = 0; r < jagged.length; r++) count += jagged[r].length;`.",
    explanation: "Cumulative jagged capacity summation.",
    hint: "Sum jagged[r].length across all rows.",
    level: "basic",
    codeExample: "int total = 0; for (int[] row : jagged) total += row.length;"
  },
  {
    question: "What does `Arrays.deepToString(jagged)` output for a ragged array `{{1, 2}, {3}}`?",
    shortAnswer: "`\"[[1, 2], [3]]\"` (accurately reflecting the irregular row shapes).",
    explanation: "Recursive deep string formatting.",
    hint: "[[1, 2], [3]].",
    level: "basic",
    codeExample: "System.out.println(Arrays.deepToString(jagged));"
  },
  {
    question: "Can you reassign a row in a Jagged Array to a new array of a completely different size later (`jagged[0] = new int[100];`)?",
    shortAnswer: "YES! Because rows are reference pointers, reassigning `jagged[0]` simply points it to a newly allocated 1D array of size 100 on the Heap.",
    explanation: "Dynamic row resizing via pointer reassignment.",
    hint: "Yes, reassigning row pointer dynamically changes that row's capacity.",
    level: "intermediate",
    codeExample: "jagged[0] = new int[100]; // Expands row 0 dynamically!"
  },
  {
    question: "Can 3D arrays be Jagged in Java (e.g. `int[][][] cube = new int[3][][];`)?",
    shortAnswer: "YES! Multidimensional arrays can be jagged at every level of dimension hierarchy.",
    explanation: "Hierarchical multidimensional ragged arrays.",
    hint: "Yes, 3D and higher-dimensional arrays can be jagged.",
    level: "intermediate",
    codeExample: "int[][][] cube = new int[3][][]; cube[0] = new int[2][]; cube[0][0] = new int[5];"
  },
  {
    question: "Why do C and C++ NOT have native jagged arrays like Java?",
    shortAnswer: "Because C/C++ multidimensional arrays default to flat contiguous memory blocks calculated via $(r \\times \\text{cols} + c)$; Java uses arrays of pointers (dope vectors).",
    explanation: "Comparative memory layout difference.",
    hint: "C uses contiguous memory blocks; Java uses arrays of heap reference pointers.",
    level: "advanced",
    codeExample: "// Java array of arrays architecture naturally supports jagged shapes"
  },
  {
    question: "What happens if you sort each row of a Jagged Array individually with `Arrays.sort(jagged[r])`?",
    shortAnswer: "Each 1D row array is sorted in-place independently according to its own length and element values.",
    explanation: "Row-level in-place sorting.",
    hint: "Sorts each row independently without errors.",
    level: "basic",
    codeExample: "for (double[] row : campusBatches) Arrays.sort(row);"
  },
  {
    question: "How do you find the maximum element in a Jagged Array?",
    shortAnswer: "Initialize `max = jagged[0][0];` and iterate nested loops comparing `if (val > max) max = val;` across all `jagged[r].length` elements.",
    explanation: "Ragged matrix maximum search algorithm.",
    hint: "Nested loop comparison across all rows and variable column lengths.",
    level: "basic",
    codeExample: "double max = j[0][0]; for (double[] r : j) for (double v : r) if (v > max) max = v;"
  },
  {
    question: "In the Coder & AccoTax Barrackpore student database, why are monthly test scores stored in a Jagged Array?",
    shortAnswer: "Because different months have different numbers of weekly tests (e.g. January 4 tests, February 2 tests, March 5 tests) in Indian Rupees (₹).",
    explanation: "Practical business domain scenario.",
    hint: "Different months have varying test counts per month.",
    level: "basic",
    codeExample: "int[][] monthlyTests = new int[12][]; monthlyTests[0] = new int[4];"
  },
  {
    question: "Can a Jagged Array be passed to a method as a normal `int[][]` parameter?",
    shortAnswer: "YES! The method signature `public static void process(int[][] matrix)` accepts rectangular and jagged arrays identically.",
    explanation: "Type compatibility of multidimensional arrays.",
    hint: "Yes, int[][] accepts both rectangular and jagged arrays.",
    level: "basic",
    codeExample: "public static void process(double[][] batches) { ... }"
  },
  {
    question: "What exception occurs if a loop assumes a fixed column width `c < 4` on a jagged array where row 1 has only 2 elements?",
    shortAnswer: "`java.lang.ArrayIndexOutOfBoundsException: Index 2 out of bounds for length 2`.",
    explanation: "Hardcoded column bound bug.",
    hint: "ArrayIndexOutOfBoundsException.",
    level: "basic",
    codeExample: "// Hardcoding c < 4 throws ArrayIndexOutOfBoundsException on short rows"
  },
  {
    question: "How do you clone a Jagged Array so that modifying the copy's elements does NOT affect the original?",
    shortAnswer: "Perform a DEEP COPY by allocating a new outer array and cloning each row individually: `copy[r] = original[r].clone();`.",
    explanation: "Deep copy requirement for ragged arrays.",
    hint: "Allocate new outer array and clone each row individually: copy[r] = orig[r].clone().",
    level: "intermediate",
    codeExample: "int[][] copy = new int[orig.length][]; for (int r=0; r<orig.length; r++) copy[r] = orig[r].clone();"
  },
  {
    question: "What is the result of `original.clone()` (shallow clone) on a Jagged Array?",
    shortAnswer: "It copies only the outer array of row pointers; both arrays share the exact same inner 1D row objects on the Heap.",
    explanation: "Shallow clone reference sharing trap.",
    hint: "Copies only row pointers; modifying copy[0][0] alters original[0][0].",
    level: "intermediate",
    codeExample: "int[][] shallow = original.clone(); // Shares row objects!"
  },
  {
    question: "How do you create a Lower Triangular Jagged Matrix of size $N$?",
    shortAnswer: "`int[][] tri = new int[n][]; for (int i = 0; i < n; i++) tri[i] = new int[i + 1];`.",
    explanation: "Lower triangular matrix allocation.",
    hint: "Row i has (i + 1) columns.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) tri[i] = new int[i+1];"
  },
  {
    question: "How do you create an Upper Triangular Jagged Matrix of size $N$?",
    shortAnswer: "`int[][] tri = new int[n][]; for (int i = 0; i < n; i++) tri[i] = new int[n - i];`.",
    explanation: "Upper triangular matrix allocation.",
    hint: "Row i has (n - i) columns.",
    level: "basic",
    codeExample: "for (int i=0; i<n; i++) tri[i] = new int[n - i];"
  },
  {
    question: "What is the GC (Garbage Collection) behavior when a row in a Jagged Array is replaced (`jagged[0] = new int[5];`)?",
    shortAnswer: "The previous 1D array object at `jagged[0]` becomes eligible for Garbage Collection if no other reference points to it.",
    explanation: "JVM heap object lifecycle.",
    hint: "Old row array object is collected by GC if unreferenced elsewhere.",
    level: "advanced",
    codeExample: "// Old row object is garbage collected automatically"
  },
  {
    question: "Can `Arrays.deepEquals()` correctly compare two Jagged Arrays?",
    shortAnswer: "YES! `Arrays.deepEquals(j1, j2)` recursively compares row lengths and cell values across irregular shapes.",
    explanation: "Deep recursive equality utility.",
    hint: "Yes, Arrays.deepEquals handles jagged shapes recursively.",
    level: "basic",
    codeExample: "boolean same = Arrays.deepEquals(jagged1, jagged2);"
  },
  {
    question: "What is the ultimate takeaway of Module 001_006 Topic 16 for Java developers?",
    shortAnswer: "Jagged arrays are arrays of independent 1D row references with varying lengths, allocated via `new Type[R][]` then `matrix[r] = new Type[len]`, saving memory and requiring `c < matrix[r].length` traversal loops.",
    explanation: "Mastery of jagged/ragged array architecture in Java.",
    hint: "Arrays of varying row lengths saving memory; traverse with c < matrix[r].length.",
    level: "basic",
    codeExample: "// Summary: new Type[R][]; matrix[r] = new Type[customLen]; c < matrix[r].length"
  },
  {
    question: "What is the next topic (Topic 17) in Module 001_006?",
    shortAnswer: "Cloning and copying arrays: System.arraycopy(), clone(), and Arrays.copyOf().",
    explanation: "Topic 17 explores high-performance native memory copying, Object.clone(), and Arrays.copyOf() range utilities.",
    hint: "Cloning and copying arrays: System.arraycopy(), clone(), and Arrays.copyOf().",
    level: "basic",
    codeExample: "// Topic 17: Array Cloning and Copying Utilities"
  },
  {
    question: "Can an anonymous jagged array literal be passed directly to a method?",
    shortAnswer: "YES! `process(new double[][]{{12000.0, 15000.0}, {18000.0}})` is completely valid syntax.",
    explanation: "Anonymous inline jagged array parameter passing.",
    hint: "Yes, using new Type[][]{{...}, {...}}.",
    level: "basic",
    codeExample: "process(new int[][]{{1, 2}, {3, 4, 5}});"
  }
];

export default questions;
