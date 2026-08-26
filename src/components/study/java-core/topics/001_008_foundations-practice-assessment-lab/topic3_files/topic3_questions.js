/**
 * Module 001_008: Topic 3: Algorithmic Problem 3: Matrix spiral traversal and 90-degree clockwise rotation
 * 30 High-Yield Comprehensive Q&A Items
 * Educator: Sukanta Hui | Coder & AccoTax Barrackpore
 */

const questions = [
  {
    question: "What is Matrix Spiral Traversal?",
    shortAnswer: "An algorithm that visits every element of an $R \\times C$ 2D matrix in clockwise spiral order: Top Row (left $\\to$ right), Right Column (top $\\to$ bottom), Bottom Row (right $\\to$ left), and Left Column (bottom $\\to$ top).",
    explanation: "Core definition of spiral matrix traversal.",
    hint: "Clockwise traversal: Top -> Right -> Bottom -> Left boundaries.",
    level: "basic",
    codeExample: "List<Integer> result = spiralOrderTraversal(matrix);"
  },
  {
    question: "What are the 4 boundary pointers maintained during Spiral Matrix Traversal?",
    shortAnswer: "`top = 0`, `bottom = rows - 1`, `left = 0`, and `right = cols - 1`, shrunk inward after each boundary pass.",
    explanation: "The 4 boundary pointers.",
    hint: "top, bottom, left, right.",
    level: "basic",
    codeExample: "int top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;"
  },
  {
    question: "Why must the Bottom-Row traversal be guarded by `if (top <= bottom)` in rectangular matrices?",
    shortAnswer: "To prevent duplicate row traversals in rectangular matrices where there is only a single remaining horizontal row (`top == bottom`) that was already processed by the Top-Row pass.",
    explanation: "Critical boundary check in non-square matrices.",
    hint: "Prevents duplicate traversal of a single remaining row.",
    level: "intermediate",
    codeExample: "if (top <= bottom) { for (int col = right; col >= left; col--) ... }"
  },
  {
    question: "Why must the Left-Column traversal be guarded by `if (left <= right)`?",
    shortAnswer: "To prevent duplicate column traversals in vertical rectangular matrices where there is only a single remaining vertical column (`left == right`) already visited by the Right-Column pass.",
    explanation: "Critical boundary check in single column cases.",
    hint: "Prevents duplicate traversal of a single remaining column.",
    level: "intermediate",
    codeExample: "if (left <= right) { for (int row = bottom; row >= top; row--) ... }"
  },
  {
    question: "What is the Time Complexity of Spiral Matrix Traversal on an $R \\times C$ matrix?",
    shortAnswer: "$O(R \\times C)$ linear time in terms of total matrix elements, because each matrix cell is visited exactly once.",
    explanation: "Spiral traversal time complexity.",
    hint: "O(R * C) total elements visited once.",
    level: "basic",
    codeExample: "// Visits all N = R * C elements exactly once"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the spiral order of the 3x4 seating matrix?",
    shortAnswer: "`[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]`.",
    explanation: "3x4 spiral output verification.",
    hint: "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7].",
    level: "basic",
    codeExample: "spiralOrderTraversal(campusSeating) -> [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]"
  },
  {
    question: "What are the TWO steps to rotate an $N \\times N$ square matrix by 90 degrees Clockwise IN-PLACE?",
    shortAnswer: "1. **Transpose the Matrix** (Swap `matrix[i][j]` with `matrix[j][i]` across main diagonal). 2. **Reverse each Row horizontally** (Two-pointer swap).",
    explanation: "The 2-step in-place 90-degree clockwise rotation formula.",
    hint: "Step 1: Transpose matrix -> Step 2: Reverse each row horizontally.",
    level: "basic",
    codeExample: "// Transpose + Horizontal Row Reversal = 90° Clockwise Rotation"
  },
  {
    question: "What is the Space Complexity of In-Place 90-Degree Matrix Rotation?",
    shortAnswer: "$O(1)$ auxiliary memory space, because swaps are performed directly in-place without creating a secondary matrix.",
    explanation: "In-place rotation space complexity.",
    hint: "O(1) auxiliary memory.",
    level: "basic",
    codeExample: "int temp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = temp; // O(1) space"
  },
  {
    question: "How do you rotate an $N \\times N$ matrix 90 degrees COUNTER-CLOCKWISE (anti-clockwise) in-place?",
    shortAnswer: "1. **Transpose the Matrix** across the main diagonal. 2. **Reverse each Column vertically** (Swap top and bottom rows). Alternatively: Reverse each row first, then transpose.",
    explanation: "Counter-clockwise rotation formula.",
    hint: "Transpose + Vertical Column Reversal (or Row reversal + Transpose).",
    level: "intermediate",
    codeExample: "// Counter-Clockwise = Transpose + Vertical Row Swap"
  },
  {
    question: "How do you rotate an $N \\times N$ matrix by 180 degrees in-place?",
    shortAnswer: "Reverse each row horizontally AND reverse the order of rows vertically (or apply 90° clockwise rotation twice).",
    explanation: "180-degree matrix rotation formula.",
    hint: "Reverse rows horizontally and reverse rows vertically.",
    level: "intermediate",
    codeExample: "// 180° = Horizontal Row Reversal + Vertical Row Reversal"
  },
  {
    question: "In matrix transposition, why does the inner loop start at `j = i + 1` rather than `j = 0`?",
    shortAnswer: "To iterate only over the upper triangle above the main diagonal; starting at `j = 0` would swap elements twice, undoing the transposition and leaving the matrix unchanged!",
    explanation: "Transposition swap loop boundary trap.",
    hint: "Starting at j = i + 1 ensures each off-diagonal pair is swapped exactly once.",
    level: "intermediate",
    codeExample: "for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) swap(i, j);"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what did row 0 `{10, 20, 30, 40}` become after 90° clockwise rotation?",
    shortAnswer: "It became column 3: values `{10, 20, 30, 40}` reading top-to-bottom in column index 3.",
    explanation: "Row to column transformation in 90-degree rotation.",
    hint: "Row 0 becomes the rightmost Column 3.",
    level: "basic",
    codeExample: "row 0: [10, 20, 30, 40] -> col 3: [10, 20, 30, 40]"
  },
  {
    question: "Can an $R \\times C$ non-square rectangular matrix (e.g. 3x4) be rotated 90 degrees strictly in-place?",
    shortAnswer: "NO! Non-square matrices change dimensions from $R \\times C$ to $C \\times R$ (e.g. 3x4 becomes 4x3), requiring a newly allocated $C \\times R$ matrix in Java's array memory model.",
    explanation: "Non-square matrix rotation limitation in Java.",
    hint: "No, non-square rotation changes matrix dimensions, requiring a new matrix.",
    level: "intermediate",
    codeExample: "int[][] rotated = new int[cols][rows]; // Required for R != C"
  },
  {
    question: "What is 'Spiral Matrix II' (Generating an $N \\times N$ matrix filled with 1 to $N^2$ in spiral order)?",
    shortAnswer: "Initialize an empty `int[N][N]` and populate elements using an incremental counter variable while traversing the 4 boundary pointers.",
    explanation: "Spiral matrix generation algorithm.",
    hint: "Use spiral traversal to fill an empty matrix with numbers 1 to N^2.",
    level: "intermediate",
    codeExample: "int val = 1; for (int col = left; col <= right; col++) matrix[top][col] = val++;"
  },
  {
    question: "What is the Time Complexity of 90-degree matrix rotation on an $N \\times N$ square matrix?",
    shortAnswer: "$O(N^2)$ time complexity, because transposition visits $N(N - 1)/2$ elements and row reversal visits $N^2/2$ elements.",
    explanation: "In-place rotation time complexity.",
    hint: "O(N^2) total cell swaps.",
    level: "basic",
    codeExample: "// Transpose: O(N^2) + Row Reversal: O(N^2) = O(N^2) Time"
  },
  {
    question: "What is the 'Layer-by-Layer' (Ring) rotation approach for 90-degree matrix rotation?",
    shortAnswer: "Rotating the matrix like peeling an onion, performing a 4-way circular element swap for each layer $layer = 0$ to $N/2$: top $\\to$ right, right $\\to$ bottom, bottom $\\to$ left, left $\\to$ top.",
    explanation: "Layer-by-layer 4-way swap alternative.",
    hint: "Performs 4-way cyclic swaps layer by layer from outer to inner rings.",
    level: "advanced",
    codeExample: "// 4-way cyclic swap for top, right, bottom, left"
  },
  {
    question: "How do you handle an empty matrix `matrix = new int[0][0]` in spiral traversal?",
    shortAnswer: "Defensive guard `if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return result;` returns an empty list safely without crashing.",
    explanation: "Empty matrix defensive edge case.",
    hint: "Check matrix == null || matrix.length == 0 || matrix[0].length == 0.",
    level: "basic",
    codeExample: "if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return result;"
  },
  {
    question: "What is the Diagonal Traversal of a 2D matrix (Zig-Zag Matrix)?",
    shortAnswer: "Traversing matrix elements along diagonal lines $r + c = k$, alternating direction (up-right and down-left) for each diagonal index $k$.",
    explanation: "Zig-zag diagonal traversal definition.",
    hint: "Traversing along diagonals r + c = k, alternating up-right and down-left.",
    level: "advanced",
    codeExample: "// Diagonal traversal along sum k = r + c"
  },
  {
    question: "In `rotateMatrix90ClockwiseInPlace`, what helper loop reversed each row horizontally?",
    shortAnswer: "A standard two-pointer swap loop: `while (left < right) { swap(matrix[i][left], matrix[i][right]); left++; right--; }`.",
    explanation: "Row reversal two-pointer loop.",
    hint: "Two-pointer swap on row elements between left and right.",
    level: "basic",
    codeExample: "int left = 0, right = n - 1; while (left < right) { swap; left++; right--; }"
  },
  {
    question: "What is the 'Transpose of a Matrix' mathematically?",
    shortAnswer: "An operation that flips a matrix over its main diagonal, switching the row and column indices of every element ($A^T[i][j] = A[j][i]$).",
    explanation: "Matrix transpose mathematical definition.",
    hint: "Flips matrix over diagonal, exchanging rows and columns (A[i][j] -> A[j][i]).",
    level: "basic",
    codeExample: "matrix[i][j] <-> matrix[j][i]"
  },
  {
    question: "How does image processing (like photo rotation on smartphones) use in-place matrix rotation?",
    shortAnswer: "Pixel raster grids (2D RGB arrays) are transposed and row-reversed directly in GPU memory to rotate image orientations without allocating extra bitmap buffers.",
    explanation: "Real-world graphic buffer rotation application.",
    hint: "Pixel grids are transposed and reversed in GPU memory for fast rotation.",
    level: "intermediate",
    codeExample: "// Bitmap pixel array 90-degree rotation"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, what was the bottom-right corner element of the 4x4 matrix before and after rotation?",
    shortAnswer: "Before rotation: `85`; after 90° clockwise rotation, `85` moved to bottom-left position (`matrix[3][0]`).",
    explanation: "Corner cell coordinate transformation.",
    hint: "Moved from bottom-right (3, 3) to bottom-left (3, 0).",
    level: "basic",
    codeExample: "matrix[3][3] (85) -> matrix[3][0] (85)"
  },
  {
    question: "What is the condition to stop the Spiral Matrix Traversal while-loop?",
    shortAnswer: "`top > bottom || left > right` (loop runs as long as `top <= bottom && left <= right`).",
    explanation: "Loop termination condition.",
    hint: "Stops when top > bottom or left > right.",
    level: "basic",
    codeExample: "while (top <= bottom && left <= right)"
  },
  {
    question: "Can an anti-diagonal transpose be used for matrix transformations?",
    shortAnswer: "YES! Transposing across the anti-diagonal (swap `matrix[i][j]` with `matrix[N-1-j][N-1-i]`) followed by row reversal rotates the matrix by 90 degrees counter-clockwise.",
    explanation: "Anti-diagonal transposition variant.",
    hint: "Yes, anti-diagonal transposition swaps across secondary diagonal.",
    level: "advanced",
    codeExample: "swap(matrix[i][j], matrix[n-1-j][n-1-i]);"
  },
  {
    question: "How does Java's row-major memory layout impact CPU cache locality during matrix transposition?",
    shortAnswer: "Reading `matrix[i][j]` is cache-friendly (contiguous row access in L1 cache), but writing to `matrix[j][i]` causes cache misses (strided column access); block-tiling optimizes cache locality for giant matrices.",
    explanation: "Cache line misses during column striding in transposition.",
    hint: "Row reads are cache-friendly; column writes cause cache misses. Block tiling fixes it.",
    level: "advanced",
    codeExample: "// Block tiling divides matrix into 32x32 tiles to fit in L1 cache"
  },
  {
    question: "In the Coder & AccoTax Barrackpore lab, how many total elements were in the 3x4 seating grid?",
    shortAnswer: "$3 \\times 4 = 12$ elements.",
    explanation: "Element count calculation.",
    hint: "12 elements.",
    level: "basic",
    codeExample: "campusSeating has 3 rows * 4 cols = 12 elements"
  },
  {
    question: "What is 'Spiral Matrix III' (Spiral walking outward from a starting coordinate)?",
    shortAnswer: "An algorithm that walks in expanding spiral steps ($1, 1, 2, 2, 3, 3, \\dots$) in directions East, South, West, North, adding valid grid coordinates within matrix bounds.",
    explanation: "Outward expanding spiral walk.",
    hint: "Walks outward in expanding step lengths (1, 1, 2, 2, ...) checking grid bounds.",
    level: "advanced",
    codeExample: "// Direction vectors: dRow = {0, 1, 0, -1}, dCol = {1, 0, -1, 0}"
  },
  {
    question: "What is the ultimate takeaway of Module 001_008 Topic 3 for Java developers?",
    shortAnswer: "Spiral Traversal dynamically manages 4 shrinking boundary pointers (`top`, `bottom`, `left`, `right`) in $O(R \\times C)$ time. In-place 90-degree rotation decomposes into Transposition + Horizontal Row Reversal in $O(1)$ auxiliary space.",
    explanation: "Mastery of matrix spiral and rotation algorithms.",
    hint: "Spiral manages 4 boundary pointers; 90° Clockwise Rotation = Transpose + Row Reversal.",
    level: "basic",
    codeExample: "// Summary: Spiral = 4 Boundaries | 90° Rotation = Transpose + Row Reversal"
  },
  {
    question: "What is the next topic (Topic 4) in Module 001_008?",
    shortAnswer: "Algorithmic Problem 4: Finding duplicate and missing numbers in an array.",
    explanation: "Topic 4 solves missing and duplicate number problems using XOR and mathematical sum formulas.",
    hint: "Algorithmic Problem 4: Finding duplicate and missing numbers in an array.",
    level: "basic",
    codeExample: "// Topic 4: Duplicate & Missing Numbers in Arrays"
  },
  {
    question: "How can SIMD (Single Instruction, Multiple Data) optimize row reversal in Java?",
    shortAnswer: "HotSpot C2 JIT vectorizes horizontal element swapping using 128/256-bit AVX shuffle byte instructions (`vpshufb`), reversing multiple array elements in a single CPU cycle.",
    explanation: "Vectorized SIMD shuffle optimization.",
    hint: "AVX shuffle instructions reverse entire rows in parallel across CPU vector registers.",
    level: "advanced",
    codeExample: "// Auto-vectorized SIMD row swapping in modern HotSpot JVM"
  }
];

export default questions;
