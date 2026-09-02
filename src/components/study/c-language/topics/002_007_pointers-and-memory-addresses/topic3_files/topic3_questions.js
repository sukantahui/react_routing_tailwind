const questions = [
  {
    question: "How does the C compiler define array subscripting `E1[E2]`?",
    shortAnswer: "`E1[E2]` is strictly defined as `*((E1) + (E2))`.",
    explanation: "Because addition is commutative, `arr[i]` and `i[arr]` both evaluate to `*(arr + i)`.",
    hint: "Defined as *((E1) + (E2)).",
    level: "basic"
  },
  {
    question: "What is 'Array Decay' in C?",
    shortAnswer: "The automatic implicit conversion of an array name into a pointer to its first element in expressions.",
    explanation: "Whenever an array identifier is used (except with `sizeof` or `&`), it decays to `&arr[0]`.",
    hint: "Array name becomes pointer to first element.",
    level: "basic"
  },
  {
    question: "Under which two circumstances does an array name NOT decay to a pointer?",
    shortAnswer: "1. As the operand of `sizeof(arr)`, and 2. As the operand of address-of `&arr`.",
    explanation: "`sizeof(arr)` yields total array bytes; `&arr` yields a pointer to the whole array `int(*)[N]`.",
    hint: "Operands of sizeof and &.",
    level: "intermediate"
  },
  {
    question: "What is the semantic type difference between `arr` and `&arr` for `int arr[10]`?",
    shortAnswer: "`arr` decays to `int*`; `&arr` has type `int (*)[10]` (pointer to an array of 10 integers).",
    explanation: "Though both have identical numeric addresses, their pointer types and stride steps differ completely.",
    hint: "int* vs int(*)[10].",
    level: "intermediate"
  },
  {
    question: "If `arr` is at address `0x2000`, what are the values of `arr + 1` and `&arr + 1` for `int arr[5]` (4-byte int)?",
    shortAnswer: "`arr + 1 = 0x2004` (+4 bytes); `&arr + 1 = 0x2014` (+20 bytes).",
    explanation: "`arr + 1` advances by 1 integer element; `&arr + 1` advances past the entire 5-integer (20-byte) array.",
    hint: "+4 bytes vs +20 bytes.",
    level: "intermediate"
  },
  {
    question: "Why can't you assign to an array name like `arr = ptr;` or `arr++;`?",
    shortAnswer: "Because an array name is a non-modifiable lvalue; its address in memory is fixed by the compiler.",
    explanation: "Pointers are variables that can be modified; array names are fixed labels.",
    hint: "Array names are non-modifiable lvalues.",
    level: "basic"
  },
  {
    question: "Why does `sizeof(arr)` return 8 inside a function declared as `void f(int arr[])`?",
    shortAnswer: "Because array parameters in function prototypes are rewritten by the compiler as pointers (`int *arr`).",
    explanation: "Inside the function, `arr` is a true pointer variable (8 bytes on 64-bit).",
    hint: "Rewritten by compiler as int *arr.",
    level: "basic"
  },
  {
    question: "What does `*(*(matrix + i) + j)` evaluate to for a 2D array `int matrix[M][N]`?",
    shortAnswer: "`matrix[i][j]`.",
    explanation: "`matrix + i` offsets to row i; dereference `*(matrix + i)` yields row pointer; adding `j` offsets to column; outer `*` retrieves the value.",
    hint: "Exact pointer equivalence of matrix[i][j].",
    level: "intermediate"
  },
  {
    question: "What is the difference between `int *arr[5]` and `int (*arr)[5]`?",
    shortAnswer: "`int *arr[5]` is an array of 5 pointers to int; `int (*arr)[5]` is a pointer to an array of 5 integers.",
    explanation: "Brackets `[]` have higher precedence than `*` without parentheses.",
    hint: "Array of pointers vs Pointer to array.",
    level: "intermediate"
  },
  {
    question: "What type of pointer is required to point to a 2D array `int grid[3][4]`?",
    shortAnswer: "`int (*pGrid)[4] = grid;` (Pointer to an array of 4 integers).",
    explanation: "The pointer must know the column stride (4 elements) to correctly compute row jumps `pGrid++`.",
    hint: "int (*pGrid)[4].",
    level: "advanced"
  },
  {
    question: "What is the output of `int a[3] = {5, 10, 15}; printf(\"%d\", *a);`?",
    options: ["Memory address", "5", "15", "Compiler error"],
    correctAnswer: 1,
    explanation: "`*a` dereferences `&a[0]`, yielding the first element (5)."
  },
  {
    question: "What is the output of `int a[3] = {5, 10, 15}; printf(\"%d\", *(a + 1));`?",
    options: ["5", "10", "15", "6"],
    correctAnswer: 1,
    explanation: "`*(a + 1)` dereferences `a[1]`, yielding 10."
  },
  {
    question: "What is the output of `int a[3] = {5, 10, 15}; printf(\"%d\", *a + 1);`?",
    options: ["10", "6", "15", "Garbage"],
    correctAnswer: 1,
    explanation: "`*a` evaluates to 5; adding 1 gives 5 + 1 = 6."
  },
  {
    question: "Why does `3[arr]` compile and run identically to `arr[3]` in C?",
    options: [
      "It is an error in GCC",
      "Because `arr[3]` expands to `*(arr + 3)` and addition is commutative (`*(3 + arr)`)",
      "Only in C99",
      "Because 3 is cast to pointer"
    ],
    correctAnswer: 1,
    explanation: "Standard C commutativity in pointer offset addition: `E1[E2] == *((E1) + (E2))`."
  },
  {
    question: "How do you traverse a 1D array of size N using purely pointer arithmetic?",
    shortAnswer: "`for (int *p = arr; p < arr + N; p++) { printf(\"%d\", *p); }`",
    explanation: "Utilizes the one-past-the-end address `arr + N` as the loop termination condition.",
    hint: "Pointer loop up to arr + N.",
    level: "basic",
    codeExample: "for (int *p = arr; p < arr + N; p++) {\n    printf(\"%d \", *p);\n}"
  },
  {
    question: "What does `void printMatrix(int (*m)[10], int rows)` accept?",
    shortAnswer: "A 2D array of integers with exactly 10 columns and variable rows.",
    explanation: "`m` is a pointer to an array of 10 ints.",
    hint: "Pointer to array of 10 ints.",
    level: "advanced"
  },
  {
    question: "Can you pass a 2D array declared as `int m[3][3]` to a function declared as `void f(int **m)`?",
    shortAnswer: "No! A 2D array is a contiguous 1D block in memory, whereas `int**` expects an array of pointers in memory.",
    explanation: "Dereferencing `m[i][j]` through `int**` causes a segmentation fault.",
    hint: "Contiguous matrix != pointer-to-pointer.",
    level: "advanced"
  },
  {
    question: "What happens when you execute `*(arr + i) = 50;`?",
    shortAnswer: "It writes 50 to `arr[i]`.",
    explanation: "Pointer dereferencing at offset `i` is identical to subscript assignment.",
    hint: "Identical to arr[i] = 50.",
    level: "basic"
  },
  {
    question: "What is the type of string literal `\"Hello\"` when evaluated in an expression?",
    shortAnswer: "`char*` (or `const char*` in C++).",
    explanation: "Decays into a pointer to its first character `'H'`.",
    hint: "Decays to pointer to char.",
    level: "basic"
  },
  {
    question: "How do you access the character 'l' in literal `\"Hello\"` using subscripting directly on the literal?",
    shortAnswer: "`\"Hello\"[2]` or `*(\"Hello\" + 2)`.",
    explanation: "Because string literals are arrays, they can be directly indexed in C!",
    hint: "\"Hello\"[2] evaluates to 'l'.",
    level: "intermediate"
  },
  {
    question: "What does `printf(\"%c\", 2[\"Sukanta\"]);` print?",
    options: ["'S'", "'u'", "'k'", "'a'"],
    correctAnswer: 2,
    explanation: "Index 2 of \"Sukanta\" is 'k' ('S' = 0, 'u' = 1, 'k' = 2)."
  },
  {
    question: "What is the memory size of `int (*arr)[10]` on a 64-bit machine?",
    options: ["40 bytes", "8 bytes (one pointer)", "10 bytes", "80 bytes"],
    correctAnswer: 1,
    explanation: "`arr` is a single pointer variable, occupying 8 bytes.",
    level: "intermediate"
  },
  {
    question: "What is the memory size of `int *arr[10]` on a 64-bit machine?",
    options: ["80 bytes (10 pointers * 8 bytes)", "40 bytes", "8 bytes", "10 bytes"],
    correctAnswer: 0,
    explanation: "10 pointer elements * 8 bytes each = 80 bytes total.",
    level: "intermediate"
  },
  {
    question: "How do you dynamically allocate memory for `int (*pArr)[5]`?",
    shortAnswer: "`pArr = malloc(numRows * sizeof(*pArr));`",
    explanation: "Allocates contiguous memory for `numRows` arrays of 5 ints.",
    hint: "malloc(rows * sizeof(*pArr)).",
    level: "advanced"
  },
  {
    question: "What is the primary performance benefit of pointer-based array traversal?",
    shortAnswer: "Eliminates redundant index multiplication (`i * sizeof(T)`) in tight loops on legacy or unoptimized compilers.",
    explanation: "Pointer increments take a single register addition cycle.",
    hint: "Single addition cycle per iteration.",
    level: "intermediate"
  }
];

export default questions;
