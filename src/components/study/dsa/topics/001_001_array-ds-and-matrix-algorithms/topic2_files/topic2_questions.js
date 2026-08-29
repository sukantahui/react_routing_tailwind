const questions = [
  {
    "id": 1,
    "question": "What is the Row-Major address calculation formula for mapping a 2D matrix cell `matrix[i][j]` with M rows and N columns to 1D contiguous RAM?",
    "options": [
      "Address(matrix[i][j]) = Base + ((i * N + j) * sizeof(T))",
      "Address(matrix[i][j]) = Base + ((j * M + i) * sizeof(T))",
      "Address(matrix[i][j]) = Base + (i + j) * sizeof(T)",
      "Address(matrix[i][j]) = Base + (i * M + j) * sizeof(T)"
    ],
    "answer": "Address(matrix[i][j]) = Base + ((i * N + j) * sizeof(T))",
    "explanation": "In Row-Major order (used by C/C++), all elements of row 0 come first, then row 1, etc. To reach row `i`, skip `i` full rows of size `N` (`i * N`), then add column offset `j`."
  },
  {
    "id": 2,
    "question": "What is the Column-Major address calculation formula for mapping `matrix[i][j]` with M rows and N columns (used in Fortran and MATLAB)?",
    "options": [
      "Address(matrix[i][j]) = Base + ((j * M + i) * sizeof(T))",
      "Address(matrix[i][j]) = Base + ((i * N + j) * sizeof(T))",
      "Address(matrix[i][j]) = Base + (j * N + i) * sizeof(T)",
      "Address(matrix[i][j]) = Base + (i * j)"
    ],
    "answer": "Address(matrix[i][j]) = Base + ((j * M + i) * sizeof(T))",
    "explanation": "In Column-Major order, columns are stored contiguously. Skipping `j` columns of height `M` takes `j * M` elements, plus row offset `i`."
  },
  {
    "id": 3,
    "question": "Why is iterating over a 2D array row-by-row (`for i; for j; sum += arr[i][j]`) dramatically faster in C than column-by-column (`for j; for i; sum += arr[i][j]`)?",
    "options": [
      "Row-by-row traversal reads memory with a stride of 1 (sequential access), maximizing 64-byte CPU L1 Cache Line hits (Spatial Locality), while column jumps cause constant Cache Misses",
      "Because rows have higher OS priority",
      "Because columns are stored on disk",
      "Because C compilers reject column loops"
    ],
    "answer": "Row-by-row traversal reads memory with a stride of 1 (sequential access), maximizing 64-byte CPU L1 Cache Line hits (Spatial Locality), while column jumps cause constant Cache Misses",
    "explanation": "C stores matrices row-by-row. Sequential row access fetches 16 contiguous 4-byte integers in a single 64-byte cache line read from RAM. Column jumps skip N integers every step, thrashing cache lines."
  },
  {
    "id": 4,
    "question": "What is the physical memory difference between a true 2D array `int mat[3][4]` and a pointer-to-pointer matrix `int** mat` allocated via multiple malloc calls?",
    "options": [
      "`int mat[3][4]` is a single contiguous 48-byte memory block, whereas `int**` is a pointer array pointing to 3 separate, non-contiguous heap memory rows",
      "`int**` is faster and completely contiguous",
      "`int mat[3][4]` allocates memory on the GPU",
      "There is no physical difference"
    ],
    "answer": "`int mat[3][4]` is a single contiguous 48-byte memory block, whereas `int**` is a pointer array pointing to 3 separate, non-contiguous heap memory rows",
    "explanation": "Static `int mat[3][4]` is 100% contiguous in physical RAM. `int**` introduces pointer indirection overhead and scatters rows across different heap pages, destroying cache locality."
  },
  {
    "id": 5,
    "question": "How can a 2D matrix of dimensions `rows x cols` be dynamically allocated on the heap as a single contiguous block in C?",
    "options": [
      "`int* matrix = (int*)malloc(rows * cols * sizeof(int));` with 1D index mapping `matrix[i * cols + j]`",
      "`int** matrix = malloc(rows * cols);`",
      "`int matrix[rows][cols];`",
      "`malloc(rows); malloc(cols);`"
    ],
    "answer": "`int* matrix = (int*)malloc(rows * cols * sizeof(int));` with 1D index mapping `matrix[i * cols + j]`",
    "explanation": "Flat 1D allocation guarantees 100% physical contiguity in RAM, optimal L1 cache line prefetching, and requires only a single `free(matrix)` call."
  },
  {
    "id": 6,
    "question": "What is the time complexity of multiplying two square matrices of size `N x N` using the standard triple nested loop algorithm?",
    "options": [
      "O(N^3) time and O(N^2) total space",
      "O(N^2)",
      "O(N log N)",
      "O(2^N)"
    ],
    "answer": "O(N^3) time and O(N^2) total space",
    "explanation": "Three nested loops from 0 to N-1 (rows `i`, cols `j`, dot product `k`) perform `N * N * N = N^3` multiplications and additions."
  },
  {
    "id": 7,
    "question": "How does loop interchange (`for i; for k; for j; C[i][j] += A[i][k] * B[k][j]`) optimize standard matrix multiplication?",
    "options": [
      "By placing the `j` loop in the innermost position, both matrix `B` and matrix `C` are traversed with sequential stride 1, eliminating cache misses on matrix `B`",
      "By reducing total operations from N^3 to N^2",
      "By running loops in parallel on multiple threads",
      "By zeroing out matrix A"
    ],
    "answer": "By placing the `j` loop in the innermost position, both matrix `B` and matrix `C` are traversed with sequential stride 1, eliminating cache misses on matrix `B`",
    "explanation": "In the `i-k-j` loop order, the inner loop advances index `j` across row `k` of matrix B and row `i` of matrix C sequentially, running up to 5x-10x faster than `i-j-k` on modern hardware!"
  },
  {
    "id": 8,
    "question": "What is the time complexity of transposing an `N x N` matrix in-place?",
    "options": [
      "O(N^2) time and O(1) auxiliary space",
      "O(N^3)",
      "O(N)",
      "O(N log N)"
    ],
    "answer": "O(N^2) time and O(1) auxiliary space",
    "explanation": "Iterating strictly above the main diagonal (`for i=0..N-1; for j=i+1..N-1`) and swapping `matrix[i][j]` with `matrix[j][i]` performs `N*(N-1)/2` swaps in O(N^2) time and O(1) auxiliary space."
  },
  {
    "id": 9,
    "question": "Why must the loop in in-place matrix transposition only iterate above the main diagonal (`for j = i + 1; j < N; j++`)?",
    "options": [
      "Iterating over the full matrix (`j = 0..N-1`) would swap elements twice, reverting the matrix back to its original untransposed state",
      "To avoid dividing by zero",
      "Because diagonal elements cannot be swapped",
      "To prevent stack overflow"
    ],
    "answer": "Iterating over the full matrix (`j = 0..N-1`) would swap elements twice, reverting the matrix back to its original untransposed state",
    "explanation": "Swapping `(i, j)` and then later visiting `(j, i)` swaps the elements back, canceling out the transposition."
  },
  {
    "id": 10,
    "question": "How do you rotate an `N x N` matrix 90 degrees clockwise in-place in O(N^2) time and O(1) auxiliary space?",
    "options": [
      "First transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`), then reverse each row horizontally",
      "Reverse the rows first, then reverse the columns",
      "Shift all elements right by N",
      "Multiply by identity matrix"
    ],
    "answer": "First transpose the matrix (swap `matrix[i][j]` with `matrix[j][i]`), then reverse each row horizontally",
    "explanation": "Transposing converts rows to columns; reversing each row mirrors horizontally, achieving an exact 90-degree clockwise rotation in-place in O(1) auxiliary space."
  },
  {
    "id": 11,
    "question": "How do you rotate an `N x N` matrix 90 degrees counter-clockwise in-place?",
    "options": [
      "First transpose the matrix, then reverse each column vertically (or reverse each row, then transpose)",
      "Rotate clockwise 3 times",
      "Invert the signs of elements",
      "Sort each row"
    ],
    "answer": "First transpose the matrix, then reverse each column vertically (or reverse each row, then transpose)",
    "explanation": "Transposing and reversing columns vertically (or reversing rows then transposing) produces a 90-degree counter-clockwise rotation."
  },
  {
    "id": 12,
    "question": "What is Strassen's Matrix Multiplication algorithm complexity?",
    "options": [
      "O(N^log2(7)) ≈ O(N^2.807)",
      "O(N^3)",
      "O(N^2)",
      "O(N log N)"
    ],
    "answer": "O(N^log2(7)) ≈ O(N^2.807)",
    "explanation": "Strassen's divide-and-conquer algorithm computes 7 block multiplications instead of 8, achieving $O(N^{\\log_2 7}) \\approx O(N^{2.807})$ time complexity."
  },
  {
    "id": 13,
    "question": "In C function declarations, why MUST the column dimension be specified when passing a 2D array (e.g. `void func(int arr[][4], int rows)`)?",
    "options": [
      "Because the compiler needs the column dimension `N = 4` to calculate row offsets in the formula `Address = Base + (i * 4 + j) * sizeof(int)`",
      "Because C cannot pass pointers",
      "To limit the row count",
      "Because the stack frame size is fixed"
    ],
    "answer": "Because the compiler needs the column dimension `N = 4` to calculate row offsets in the formula `Address = Base + (i * 4 + j) * sizeof(int)`",
    "explanation": "Without the number of columns, the compiler cannot determine how many bytes to skip when stepping from row `i` to row `i + 1`."
  },
  {
    "id": 14,
    "question": "What is the formula for calculating the physical address of cell `A[i][j][k]` in a 3D array of dimensions `D1 x D2 x D3` in Row-Major order?",
    "options": [
      "Address = Base + ((i * D2 * D3 + j * D3 + k) * sizeof(T))",
      "Address = Base + (i * j * k) * sizeof(T)",
      "Address = Base + (i + j + k) * sizeof(T)",
      "Address = Base + (k * D1 * D2 + j * D1 + i)"
    ],
    "answer": "Address = Base + ((i * D2 * D3 + j * D3 + k) * sizeof(T))",
    "explanation": "Skipping `i` 2D planes takes `i * D2 * D3`, skipping `j` rows in that plane takes `j * D3`, plus column offset `k`."
  },
  {
    "id": 15,
    "question": "What is the memory size of a 2D array declared as `double matrix[10][20]` on a standard 64-bit architecture?",
    "options": [
      "1,600 bytes (`10 * 20 * 8 bytes`)",
      "200 bytes",
      "800 bytes",
      "3,200 bytes"
    ],
    "answer": "1,600 bytes (`10 * 20 * 8 bytes`)",
    "explanation": "Total elements = `10 * 20 = 200`. `sizeof(double) = 8` bytes. Total footprint = `200 * 8 = 1600` bytes."
  },
  {
    "id": 16,
    "question": "What is a Toeplitz Matrix?",
    "options": [
      "A matrix in which every descending diagonal from left to right contains identical elements (`matrix[i][j] == matrix[i-1][j-1]`)",
      "A matrix with all zeros",
      "A matrix where rows sum to 1",
      "A symmetric matrix"
    ],
    "answer": "A matrix in which every descending diagonal from left to right contains identical elements (`matrix[i][j] == matrix[i-1][j-1]`)",
    "explanation": "In a Toeplitz matrix, elements along each diagonal parallel to the main diagonal are constant."
  },
  {
    "id": 17,
    "question": "What is a Symmetric Matrix in C array terms?",
    "options": [
      "A square matrix where `matrix[i][j] == matrix[j][i]` for all `i, j` (the matrix equals its transpose)",
      "A matrix with equal number of positive and negative numbers",
      "A matrix with equal rows and columns but different values",
      "An identity matrix"
    ],
    "answer": "A square matrix where `matrix[i][j] == matrix[j][i]` for all `i, j` (the matrix equals its transpose)",
    "explanation": "Symmetry implies that mirroring elements across the main diagonal produces the identical value."
  },
  {
    "id": 18,
    "question": "How can memory be saved when storing an `N x N` Symmetric Matrix in C?",
    "options": [
      "Store only the Lower Triangular Matrix in a 1D array of size `N * (N + 1) / 2`, mapping `(i, j)` to index `i * (i + 1) / 2 + j` (for `i >= j`)",
      "Compress values with zip",
      "Delete the diagonal",
      "Store only negative numbers"
    ],
    "answer": "Store only the Lower Triangular Matrix in a 1D array of size `N * (N + 1) / 2`, mapping `(i, j)` to index `i * (i + 1) / 2 + j` (for `i >= j`)",
    "explanation": "Because `matrix[i][j] == matrix[j][i]`, storing only the lower triangle cuts memory usage by nearly 50% from `N^2` down to `N*(N+1)/2`."
  },
  {
    "id": 19,
    "question": "What is the time complexity of Spiral Traversal of an `M x N` matrix?",
    "options": [
      "O(M * N) visiting every element exactly once",
      "O(M + N)",
      "O((M * N)^2)",
      "O(M log N)"
    ],
    "answer": "O(M * N) visiting every element exactly once",
    "explanation": "Tracking 4 boundary pointers (`top`, `bottom`, `left`, `right`) and moving along the perimeter inward visits all `M * N` elements in linear O(M * N) time."
  },
  {
    "id": 20,
    "question": "What is a Diagonal Matrix?",
    "options": [
      "A matrix where all elements outside the main diagonal are zero (`matrix[i][j] == 0` for `i != j`)",
      "A matrix with no diagonal",
      "A matrix with 1s everywhere",
      "A matrix with negative diagonal"
    ],
    "answer": "A matrix where all elements outside the main diagonal are zero (`matrix[i][j] == 0` for `i != j`)",
    "explanation": "A diagonal matrix only has non-zero entries on the main diagonal, requiring only a 1D array of size N to store."
  },
  {
    "id": 21,
    "question": "What is a Tridiagonal Matrix and how many elements does it require to store in 1D array form for size N x N?",
    "options": [
      "`3N - 2` elements (Main diagonal, super-diagonal, and sub-diagonal)",
      "`N^2` elements",
      "`3N` elements",
      "`N / 3` elements"
    ],
    "answer": "`3N - 2` elements (Main diagonal, super-diagonal, and sub-diagonal)",
    "explanation": "Main diagonal has N elements; upper super-diagonal has N-1; lower sub-diagonal has N-1. Total = `N + (N-1) + (N-1) = 3N - 2`."
  },
  {
    "id": 22,
    "question": "How do you search for a target element in an `M x N` matrix where every row and every column is sorted in ascending order?",
    "options": [
      "Start at top-right corner `(0, N-1)`: if target is smaller move left (`col--`), if larger move down (`row++`) in O(M + N) time",
      "Perform brute force search in O(M * N)",
      "Sort the matrix in O(MN log(MN))",
      "Binary search every column in O(N log M)"
    ],
    "answer": "Start at top-right corner `(0, N-1)`: if target is smaller move left (`col--`), if larger move down (`row++`) in O(M + N) time",
    "explanation": "Top-right staircase search eliminates either an entire row or an entire column in each step, guaranteeing O(M + N) worst-case time without extra space."
  },
  {
    "id": 23,
    "question": "What is Cache Blocking (Tiling) in high-performance matrix multiplication?",
    "options": [
      "Dividing large matrices into smaller sub-matrix blocks (tiles) that fit entirely within CPU L1/L2 cache, maximizing data reuse and minimizing RAM bus traffic",
      "Locking memory pages in the OS",
      "Zeroing unused blocks",
      "Preventing matrix writes"
    ],
    "answer": "Dividing large matrices into smaller sub-matrix blocks (tiles) that fit entirely within CPU L1/L2 cache, maximizing data reuse and minimizing RAM bus traffic",
    "explanation": "Cache blocking processes `B x B` sub-matrices so tiles remain in fast CPU cache during multiple multiply-accumulate iterations."
  },
  {
    "id": 24,
    "question": "What is the purpose of `calloc` when allocating an array of row pointers `int** mat = calloc(rows, sizeof(int*))`?",
    "options": [
      "Ensures all row pointers are initialized to NULL, simplifying error cleanup if subsequent row allocations fail",
      "Makes memory read-only",
      "Allocates contiguous matrix rows",
      "Deallocates memory"
    ],
    "answer": "Ensures all row pointers are initialized to NULL, simplifying error cleanup if subsequent row allocations fail",
    "explanation": "If `calloc` initializes row pointers to NULL, error handling can safely loop `for (int i=0; i<rows; i++) free(mat[i]);` without dereferencing garbage pointers."
  },
  {
    "id": 25,
    "question": "How do you properly free a dynamically allocated pointer-to-pointer matrix `int** mat` with R rows?",
    "options": [
      "Loop through each row and `free(mat[i])`, then call `free(mat)` and set `mat = NULL`",
      "Call `free(mat)` directly",
      "Call `free(mat[0])` only",
      "Matrices are automatically freed"
    ],
    "answer": "Loop through each row and `free(mat[i])`, then call `free(mat)` and set `mat = NULL`",
    "explanation": "Freeing `mat` first orphans all R individual row allocations on the heap. You must free each row `mat[i]` before freeing the spine array `mat`."
  }
];

export default questions;
