const questions = [
  {
    "id": 1,
    "question": "What defines a 'Sparse Matrix' in computer science?",
    "options": [
      "A matrix where the vast majority of elements are zero (typically > 80-90% zeros)",
      "A matrix with only 1s",
      "A matrix stored on flash memory",
      "A matrix with negative eigenvalues"
    ],
    "answer": "A matrix where the vast majority of elements are zero (typically > 80-90% zeros)",
    "explanation": "When a matrix contains mostly zeros, storing it as a full 2D matrix wastes huge amounts of memory and CPU cycles performing multiplications by zero."
  },
  {
    "id": 2,
    "question": "What are the three components stored for each non-zero element in the Triplet (Coordinate List - COO) format?",
    "options": [
      "Row index, Column index, and non-zero Value",
      "Left child, Right child, Parent",
      "Key, Hash, Bucket",
      "Start address, End address, Length"
    ],
    "answer": "Row index, Column index, and non-zero Value",
    "explanation": "The Triplet (Row, Col, Val) representation records only non-zero entries, shrinking storage from `M * N` down to `3 * NonZeroCount` integers."
  },
  {
    "id": 3,
    "question": "In the 3-Tuple array representation of an `M x N` matrix with `K` non-zero elements, what is stored at index 0 (the header element `triplet[0]`)?",
    "options": [
      "`row = M` (total rows), `col = N` (total columns), and `val = K` (total non-zero count)",
      "`row = 0`, `col = 0`, `val = 0`",
      "The memory address of the matrix",
      "The determinant of the matrix"
    ],
    "answer": "`row = M` (total rows), `col = N` (total columns), and `val = K` (total non-zero count)",
    "explanation": "The header element at index 0 stores the metadata of the original matrix dimensions and total non-zero elements present in the sparse structure."
  },
  {
    "id": 4,
    "question": "What is the time complexity of the Simple Transpose algorithm on a sparse matrix with `N` columns and `K` non-zero elements?",
    "options": [
      "O(N * K) because it searches the entire non-zero array for each column from 0 to N-1",
      "O(K)",
      "O(1)",
      "O(K log K)"
    ],
    "answer": "O(N * K) because it searches the entire non-zero array for each column from 0 to N-1",
    "explanation": "Simple transpose uses an outer loop for column `0..N-1` and inner loop over all `K` non-zero elements to place items in row-sorted order, taking `O(N * K)` time."
  },
  {
    "id": 5,
    "question": "How does the Fast Transpose algorithm achieve O(N + K) linear time for sparse matrix transposition?",
    "options": [
      "By using a frequency count array `count[col]` and prefix position array `starting_pos[col]` to place each non-zero element directly into its exact destination slot in a single pass",
      "By sorting elements with QuickSort",
      "By transposing the matrix on GPU",
      "By converting the matrix to a binary tree"
    ],
    "answer": "By using a frequency count array `count[col]` and prefix position array `starting_pos[col]` to place each non-zero element directly into its exact destination slot in a single pass",
    "explanation": "Fast Transpose counts occurrences of each column in O(K), computes starting positions in O(N), and places all K elements directly in destination indices in O(K), totaling O(N + K) linear time."
  },
  {
    "id": 6,
    "question": "What is the auxiliary space complexity of the Fast Transpose algorithm on a sparse matrix with `cols` columns?",
    "options": [
      "O(cols) auxiliary memory for `count[]` and `starting_pos[]` arrays",
      "O(M * N) full matrix memory",
      "O(K^2) memory",
      "O(1)"
    ],
    "answer": "O(cols) auxiliary memory for `count[]` and `starting_pos[]` arrays",
    "explanation": "Fast transpose requires only two 1D integer arrays of size `cols + 1`, consuming minimal O(cols) auxiliary space."
  },
  {
    "id": 7,
    "question": "What is the Compressed Sparse Row (CSR) representation of a sparse matrix?",
    "options": [
      "Three 1D arrays: `values[]` (non-zero values), `column_indices[]` (column for each value), and `row_pointers[]` (starting offset of each row in values)",
      "An array of linked lists",
      "A 2D array with compressed integers",
      "A quadtree"
    ],
    "answer": "Three 1D arrays: `values[]` (non-zero values), `column_indices[]` (column for each value), and `row_pointers[]` (starting offset of each row in values)",
    "explanation": "CSR is the industry standard format in linear algebra libraries (BLAS, SciPy), using `values[K]`, `col_index[K]`, and `row_ptr[M+1]`."
  },
  {
    "id": 8,
    "question": "How many non-zero elements are in row `i` in the Compressed Sparse Row (CSR) format?",
    "options": [
      "`row_ptr[i + 1] - row_ptr[i]` elements",
      "`row_ptr[i]` elements",
      "`values[i]` elements",
      "`col_index[i]` elements"
    ],
    "answer": "`row_ptr[i + 1] - row_ptr[i]` elements",
    "explanation": "The non-zero elements of row `i` span indices from `row_ptr[i]` up to `row_ptr[i+1] - 1` in `values[]` and `col_index[]`."
  },
  {
    "id": 9,
    "question": "What is Compressed Sparse Column (CSC) format and how does it compare to CSR?",
    "options": [
      "CSC is the column-oriented dual of CSR, compressing column starting offsets instead of row offsets (optimal for column slicing and sparse-matrix vector operations)",
      "CSC is slower and uses 10x more RAM",
      "CSC only stores positive numbers",
      "There is no difference"
    ],
    "answer": "CSC is the column-oriented dual of CSR, compressing column starting offsets instead of row offsets (optimal for column slicing and sparse-matrix vector operations)",
    "explanation": "CSC uses `values[K]`, `row_indices[K]`, and `col_pointers[N+1]`, providing optimal performance for column-wise operations."
  },
  {
    "id": 10,
    "question": "What is the memory threshold condition for when a sparse 3-Tuple format saves memory compared to a standard 2D array of `M x N` integers in C?",
    "options": [
      "When non-zero count `K < (M * N) / 3` (since each non-zero element takes 3 integers in triplet format)",
      "When K < M",
      "When K > N",
      "Always saves memory"
    ],
    "answer": "When non-zero count `K < (M * N) / 3` (since each non-zero element takes 3 integers in triplet format)",
    "explanation": "A standard matrix uses `M * N * sizeof(int)` bytes. A triplet array uses `3 * K * sizeof(int)` bytes. Triplet storage is smaller when `3K < M * N` => `K < (M * N) / 3` (i.e. < 33.3% density)."
  },
  {
    "id": 11,
    "question": "How do you add two sparse matrices A and B in 3-Tuple format in O(K_A + K_B) time?",
    "options": [
      "Use a two-pointer merge algorithm comparing `(row, col)` coordinates of elements in A and B in linear sorted order",
      "Convert both to dense 2D matrices, add them, and convert back",
      "Multiply the matrices",
      "Sort both matrices with Bubble Sort"
    ],
    "answer": "Use a two-pointer merge algorithm comparing `(row, col)` coordinates of elements in A and B in linear sorted order",
    "explanation": "Because triplet lists are sorted by row then column, a two-pointer merge scans both lists simultaneously: matching coordinates add values; otherwise the smaller coordinate is appended in O(K_A + K_B) time."
  },
  {
    "id": 12,
    "question": "What happens if adding two non-zero elements in sparse matrix addition produces a sum of 0 (`val_A + val_B == 0`)?",
    "options": [
      "The result zero is NOT inserted into the output sparse matrix, and the non-zero counter is not incremented",
      "An exception is thrown",
      "The matrix size becomes 0",
      "The zero must be stored with a flag"
    ],
    "answer": "The result zero is NOT inserted into the output sparse matrix, and the non-zero counter is not incremented",
    "explanation": "Sparse matrix representations discard exact zeros to keep memory compact."
  },
  {
    "id": 13,
    "question": "What data structure is used to represent sparse matrices with dynamic insertions and deletions of non-zero elements without shifting arrays?",
    "options": [
      "Orthogonal Linked List (Cross-List / Multi-Linked List with row and column pointer heads)",
      "Binary Heap",
      "Stack",
      "Circular Array"
    ],
    "answer": "Orthogonal Linked List (Cross-List / Multi-Linked List with row and column pointer heads)",
    "explanation": "An Orthogonal List uses nodes with `row`, `col`, `val`, `right_ptr`, and `down_ptr`, allowing O(1) pointer updates when new non-zeros appear."
  },
  {
    "id": 14,
    "question": "What is a DOK (Dictionary of Keys) sparse matrix representation?",
    "options": [
      "A hash table mapping `(row, col)` pair keys to non-zero values in average O(1) lookup time",
      "A sorted array of strings",
      "A dictionary file on disk",
      "A matrix with word tokens"
    ],
    "answer": "A hash table mapping `(row, col)` pair keys to non-zero values in average O(1) lookup time",
    "explanation": "DOK uses hash maps for fast random reads and writes `(i, j) → value`, often used during matrix construction before converting to CSR."
  },
  {
    "id": 15,
    "question": "In scientific computing (e.g. Finite Element Analysis or Google PageRank), what is the typical sparsity percentage of matrices?",
    "options": [
      "99.0% to 99.99% of entries are zero",
      "50% zeros",
      "10% zeros",
      "Exactly 0% zeros"
    ],
    "answer": "99.0% to 99.99% of entries are zero",
    "explanation": "Large graph and simulation matrices have billions of entries, with each node connected to only a few dozen neighbors (99.99%+ sparse)."
  },
  {
    "id": 16,
    "question": "What is Sparse Matrix-Vector Multiplication (SpMV) using CSR format?",
    "options": [
      "Computing `y = A * x` where row `i` dot product iterates only through non-zero entries `for (k = row_ptr[i]; k < row_ptr[i+1]; k++) y[i] += values[k] * x[col_idx[k]]` in O(K) time",
      "Multiplying every element including zeros in O(M * N)",
      "Inverting matrix A",
      "Transposing vector x"
    ],
    "answer": "Computing `y = A * x` where row `i` dot product iterates only through non-zero entries `for (k = row_ptr[i]; k < row_ptr[i+1]; k++) y[i] += values[k] * x[col_idx[k]]` in O(K) time",
    "explanation": "SpMV performs exact `2 * K` floating point operations in O(K) time, avoiding billions of wasteful operations on zero entries."
  },
  {
    "id": 17,
    "question": "What is ELLPACK (ELL) format in GPU sparse matrix computing?",
    "options": [
      "A format that stores non-zero entries in a dense 2D array padded to the maximum non-zero count per row, enabling SIMD vectorization and coalesced GPU memory reads",
      "An encryption algorithm",
      "A memory allocator",
      "A sorting routine"
    ],
    "answer": "A format that stores non-zero entries in a dense 2D array padded to the maximum non-zero count per row, enabling SIMD vectorization and coalesced GPU memory reads",
    "explanation": "ELLPACK aligns data so all GPU warps execute synchronized contiguous memory memory loads without branching divergence."
  },
  {
    "id": 18,
    "question": "What is the memory size of a 3-Tuple array holding a header plus 1,000 non-zero elements in C where `sizeof(int) == 4`?",
    "options": [
      "12,012 bytes (`1001 triplets * 3 integers/triplet * 4 bytes/int`)",
      "4,000 bytes",
      "1,000 bytes",
      "24,000 bytes"
    ],
    "answer": "12,012 bytes (`1001 triplets * 3 integers/triplet * 4 bytes/int`)",
    "explanation": "`1001 * 3 * 4 = 12,012` bytes. Storing a 10,000 x 10,000 dense matrix would take 400 Megabytes, demonstrating a 33,000x memory reduction!"
  },
  {
    "id": 19,
    "question": "In C, how should the Triplet struct be defined for sparse matrix representation?",
    "options": [
      "`typedef struct { int row; int col; int val; } Element;`",
      "`typedef struct { char* name; int id; } Element;`",
      "`typedef struct { void* next; } Element;`",
      "`int Element[3];`"
    ],
    "answer": "`typedef struct { int row; int col; int val; } Element;`",
    "explanation": "A structured 3-member record encapsulates row index, column index, and numeric value cleanly."
  },
  {
    "id": 20,
    "question": "Why does the Fast Transpose algorithm construct the `starting_pos` array using the recurrence `starting_pos[i] = starting_pos[i - 1] + count[i - 1]`?",
    "options": [
      "The starting index of column `i` in the transposed array is the sum of all elements in preceding columns `0` through `i-1` (Prefix Sum / Cumulative Frequency)",
      "To reverse the elements",
      "To multiply by column width",
      "To initialize memory to NULL"
    ],
    "answer": "The starting index of column `i` in the transposed array is the sum of all elements in preceding columns `0` through `i-1` (Prefix Sum / Cumulative Frequency)",
    "explanation": "This prefix sum technique calculates the exact memory partition boundaries for each column before moving any data."
  },
  {
    "id": 21,
    "question": "How do you verify if a given matrix is sparse before deciding to convert it to a 3-Tuple representation in C?",
    "options": [
      "Count non-zero elements `K` in a single pass; if `K < (M * N) / 3`, convert to sparse format",
      "Check if matrix[0][0] is 0",
      "Calculate matrix determinant",
      "Check if rows equal columns"
    ],
    "answer": "Count non-zero elements `K` in a single pass; if `K < (M * N) / 3`, convert to sparse format",
    "explanation": "Analyzing the sparsity ratio `K / (M * N)` determines whether sparse compression will save memory."
  },
  {
    "id": 22,
    "question": "What is the time complexity to look up the value of `matrix[i][j]` in a sorted 3-Tuple array containing K non-zero elements?",
    "options": [
      "O(log K) using Binary Search on `(row, col)` coordinate keys",
      "O(1)",
      "O(N)",
      "O(K^2)"
    ],
    "answer": "O(log K) using Binary Search on `(row, col)` coordinate keys",
    "explanation": "Because triplets are sorted primarily by `row` and secondarily by `col`, binary search on composite key `row * N + col` finds the target entry in O(log K) steps."
  },
  {
    "id": 23,
    "question": "What happens if binary search for coordinate `(i, j)` in a 3-Tuple sparse matrix fails to find an entry?",
    "options": [
      "The element value is mathematically 0 (an implicit zero entry)",
      "The matrix is corrupt",
      "A segmentation fault occurs",
      "Returns -1"
    ],
    "answer": "The element value is mathematically 0 (an implicit zero entry)",
    "explanation": "Any coordinate not present in the sparse table is implicitly 0."
  },
  {
    "id": 24,
    "question": "Why is freeing dynamic sparse matrix structures in C straightforward for Triplet format compared to Orthogonal Linked Lists?",
    "options": [
      "Triplet format stores all non-zeros in a single contiguous 1D array (`free(triplet)`), while Orthogonal Lists require traversing and freeing hundreds of thousands of individual heap nodes",
      "Triplet format is garbage collected",
      "Orthogonal lists use stack memory",
      "There is no difference"
    ],
    "answer": "Triplet format stores all non-zeros in a single contiguous 1D array (`free(triplet)`), while Orthogonal Lists require traversing and freeing hundreds of thousands of individual heap nodes",
    "explanation": "Single buffer allocation eliminates pointer chasing during deallocation, executing cleanup in O(1) system calls with zero memory fragmentation."
  },
  {
    "id": 25,
    "question": "What is the primary industrial advantage of using CSR over 3-Tuple format for matrix-vector machine learning algorithms?",
    "options": [
      "CSR compresses away explicit row indices into `row_ptr`, eliminating 33% of coordinate integer storage and enabling direct pointer slicing per row",
      "CSR supports strings",
      "CSR is encrypted",
      "CSR requires no memory allocation"
    ],
    "answer": "CSR compresses away explicit row indices into `row_ptr`, eliminating 33% of coordinate integer storage and enabling direct pointer slicing per row",
    "explanation": "CSR requires only `2K + M + 1` integers instead of `3K` integers in Triplet format, and enables instant row-range slicing `row_ptr[i]` to `row_ptr[i+1]`."
  }
];

export default questions;
