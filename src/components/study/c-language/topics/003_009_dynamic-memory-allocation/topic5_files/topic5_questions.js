// topic5_questions.js - 25 FAQs for Dynamic 2D Arrays & Matrices

const questions = [
  {
    question: "Why can't you allocate a dynamic 2D array in C with a simple 'malloc(rows, cols)'?",
    answer: "malloc() takes only a single byte-size parameter. To create a 2D array whose row and column dimensions are determined at runtime, you must either allocate an array of row pointers ('int **') or a flattened 1D buffer ('int *') of size 'rows * cols * sizeof(int)'."
  },
  {
    question: "How does the Array of Pointers ('int **') approach for dynamic 2D arrays work?",
    answer: "You first allocate an array of row pointers: 'int **matrix = malloc(rows * sizeof(int*));'. Then in a loop over each row, you allocate each individual row: 'matrix[r] = malloc(cols * sizeof(int));'. This allows standard 2D indexing syntax 'matrix[r][c]'."
  },
  {
    question: "What is the mandatory deallocation sequence for an 'int **matrix' 2D array?",
    answer: "You MUST free the rows first in a loop, and then free the main pointer: 'for(int r = 0; r < rows; r++) free(matrix[r]); free(matrix);'. If you free 'matrix' first, you lose the addresses to all rows, causing a massive memory leak!"
  },
  {
    question: "What is the single-block contiguous flattened 2D array approach?",
    answer: "You allocate one single block of memory: 'int *mat = malloc(rows * cols * sizeof(int));'. You access element (r, c) using row-major arithmetic: 'mat[r * cols + c]'. It is freed with a single 'free(mat)' call."
  },
  {
    question: "Why is the single-block flattened 2D array significantly faster for CPU cache performance?",
    answer: "In a single contiguous block, all matrix elements are stored sequentially in physical RAM, maximizing CPU L1/L2 cache line hits. In the pointer-of-pointers approach, each row can be in scattered, non-contiguous heap pages, causing frequent cache misses."
  },
  {
    question: "What is a Jagged (Ragged) Array and how is it created with dynamic memory in C?",
    answer: "A jagged array is a 2D array where each row can have a different number of columns. Using 'int **matrix', you simply allocate different column sizes for each row (e.g. 'matrix[0] = malloc(3 * sizeof(int)); matrix[1] = malloc(7 * sizeof(int));')."
  },
  {
    question: "Can a jagged array be created using standard compile-time static 2D arrays (like 'int arr[3][4]')?",
    answer: "No. Compile-time static 2D arrays require a uniform, rectangular column dimension across all rows."
  },
  {
    question: "How do you pass an 'int **matrix' 2D array to a function?",
    answer: "Function prototype: 'void process_matrix(int **matrix, int rows, int cols);'. Inside the function, you access elements via 'matrix[r][c]'."
  },
  {
    question: "How do you pass a flattened single-block 2D array to a function?",
    answer: "Function prototype: 'void process_flat(int *matrix, int rows, int cols);'. Inside the function, you access elements via 'matrix[r * cols + c]'."
  },
  {
    question: "Can you pass a static 2D array 'int arr[3][4]' to a function expecting 'int **matrix'?",
    answer: "No! 'int arr[3][4]' is a contiguous block of integers, not an array of pointer addresses. Passing it to 'int **' results in a compiler type error and runtime crash."
  },
  {
    question: "What happens if one of the row allocations fails inside the loop when creating an 'int **matrix'?",
    answer: "You must defensively catch the NULL return, free all previously allocated rows (0 to r-1), free the top-level pointer 'matrix', and return an error code."
  },
  {
    question: "What is the pointer-to-VLA approach for dynamic 2D arrays in C99?",
    answer: "In C99, you can write: 'int (*matrix)[cols] = malloc(rows * sizeof *matrix);'. This allocates a single contiguous block on the heap while allowing clean 'matrix[r][c]' syntax and a single 'free(matrix)' call!"
  },
  {
    question: "What is the formula to convert 2D coordinates (row, col) into a 1D index in row-major order?",
    answer: "The formula is: 'index = (row * total_columns) + col'."
  },
  {
    question: "What is the formula to convert 2D coordinates (row, col) into a 1D index in column-major order (used in Fortran/MATLAB)?",
    answer: "The formula is: 'index = (col * total_rows) + row'."
  },
  {
    question: "How do you dynamically allocate a 3D array of dimensions (X, Y, Z)?",
    answer: "You can allocate a triple pointer 'int ***tensor' with three nested allocation loops, or allocate a single flat block 'int *tensor = malloc(X * Y * Z * sizeof(int));' indexed via '[x * Y * Z + y * Z + z]'."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax illustrate 2D array memory layout?",
    answer: "In Sukanta Hui's class, students print the pointer addresses of 'matrix[0]', 'matrix[1]', and 'matrix[2]'. In the pointer-of-pointers approach, the row addresses are non-contiguous; in the single-block approach, all rows are contiguous."
  },
  {
    question: "What is the overhead of the pointer-of-pointers ('int **') approach on 64-bit systems?",
    answer: "On 64-bit systems, each row pointer consumes 8 bytes plus allocator chunk metadata (typically 16 bytes per row), wasting significant RAM for small column sizes."
  },
  {
    question: "How do you allocate a dynamic array of strings in C?",
    answer: "An array of strings is an array of char pointers: 'char **names = malloc(count * sizeof(char*));' where each 'names[i] = malloc(max_len * sizeof(char));'."
  },
  {
    question: "How do you sort a dynamic array of strings with qsort() in C?",
    answer: "Pass a comparison function that dereferences the pointer-to-pointer: 'int cmp(const void *a, const void *b) { return strcmp(*(const char**)a, *(const char**)b); }'."
  },
  {
    question: "What happens if you free 'matrix[r]' but forget to set it to NULL?",
    answer: "It creates a dangling row pointer. If the code tries to access 'matrix[r][c]' later, it triggers a Use-After-Free bug."
  },
  {
    question: "Can calloc() be used to allocate dynamic 2D arrays initialized to zero?",
    answer: "Yes! Use 'calloc(cols, sizeof(int))' in the row loop or 'calloc(rows * cols, sizeof(int))' for the single-block approach."
  },
  {
    question: "How do you dynamically allocate a symmetric matrix (saving memory by storing only the lower triangle)?",
    answer: "Allocate row 0 with 1 element, row 1 with 2 elements, ..., row N-1 with N elements, saving nearly 50% RAM."
  },
  {
    question: "Why is matrix multiplication with single-block contiguous arrays significantly faster?",
    answer: "Because sequential contiguous access patterns allow CPU hardware prefetchers to stream cache lines into L1 cache without memory stalls."
  },
  {
    question: "What is the best practice for returning a dynamic 2D matrix from a function?",
    answer: "Wrap the matrix pointer, row count, and column count into a custom 'struct Matrix { int rows; int cols; double *data; };' for clean, encapsulated API design."
  },
  {
    question: "What is the golden rule when deallocating dynamic 2D arrays?",
    answer: "Deallocate in exact reverse order of allocation: Free each inner row pointer first, then free the master pointer array, and set all pointers to NULL!"
  }
];

export default questions;
