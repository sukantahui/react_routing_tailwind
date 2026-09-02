// 200 Comprehensive MCQs for Module 002_007: Pointers & Memory Addresses
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  // 1-35: Pointer Fundamentals, Addresses, Operators & Sizes
  {
    question: "What does a pointer variable store in C?",
    options: [
      "A floating-point approximation",
      "The physical or virtual memory address of another variable",
      "A copy of the CPU instruction cache",
      "The integer hash of a variable name"
    ],
    correctAnswer: 1,
    explanation: "A pointer stores a memory address representing where a variable resides in RAM."
  },
  {
    question: "What is the byte size of any pointer on a 64-bit operating system?",
    options: ["4 bytes", "8 bytes (64 bits)", "16 bytes", "Varies based on pointed data type"],
    correctAnswer: 1,
    explanation: "On a 64-bit architecture, all pointers occupy 8 bytes because addresses are 64 bits wide."
  },
  {
    question: "What does the address-of operator `&` return when applied to a variable `x`?",
    options: [
      "The value of x",
      "The memory address where x is stored",
      "The data type of x",
      "A bitwise AND of x"
    ],
    correctAnswer: 1,
    explanation: "Unary `&` extracts the memory address of its operand."
  },
  {
    question: "What is the dereference (indirection) operator in C?",
    options: ["&", "*", "->", "."],
    correctAnswer: 1,
    explanation: "Unary `*` accesses the value stored at the memory address pointed to by a pointer."
  },
  {
    question: "What is a `NULL` pointer?",
    options: [
      "A pointer holding garbage values",
      "A pointer guaranteed to point to no valid memory object (address 0x0)",
      "A pointer to the end of an array",
      "A void pointer"
    ],
    correctAnswer: 1,
    explanation: "`NULL` is defined as `((void*)0)` representing an intentional non-address."
  },
  {
    question: "What happens if a program dereferences a `NULL` pointer (`*pNull = 10;`)?",
    options: [
      "Writes 10 into address 0",
      "Runtime crash / Segmentation Fault (Memory Access Violation)",
      "Compiler throws a syntax error",
      "The pointer is reallocated"
    ],
    correctAnswer: 1,
    explanation: "Address 0 is protected by OS memory management; accessing it terminates the process immediately."
  },
  {
    question: "What is a Wild Pointer in C?",
    options: [
      "A pointer to an operating system driver",
      "An uninitialized pointer variable holding random garbage memory bits",
      "A pointer that points to multiple addresses simultaneously",
      "A function pointer"
    ],
    correctAnswer: 1,
    explanation: "Wild pointers have not been initialized to a valid address or `NULL`."
  },
  {
    question: "What is a Dangling Pointer?",
    options: [
      "A pointer pointing to memory that has already been deallocated or freed",
      "A pointer declared inside a loop",
      "A pointer to a constant variable",
      "A double pointer"
    ],
    correctAnswer: 0,
    explanation: "Dangling pointers point to destroyed stack frames or freed heap memory blocks."
  },
  {
    question: "What is the output of this code snippet?",
    options: ["10", "25", "Memory address", "Compiler error"],
    correctAnswer: 1,
    codeSnippet: "int a = 10;\nint *p = &a;\n*p = 25;\nprintf(\"%d\", a);",
    explanation: "`*p = 25` mutates the memory cell of variable `a` directly, so `a` becomes 25."
  },
  {
    question: "How do you declare two pointers to integers on a single line?",
    options: [
      "`int* p1, p2;`",
      "`int *p1, *p2;`",
      "`int &p1, &p2;`",
      "`ptr int p1, p2;`"
    ],
    correctAnswer: 1,
    explanation: "In C, `*` binds to the identifier; `int* p1, p2;` makes `p1` a pointer and `p2` an integer."
  },
  {
    question: "What format specifier should always be used in `printf` to display pointer addresses?",
    options: ["%d", "%x", "%p (with (void*) cast)", "%u"],
    correctAnswer: 2,
    explanation: "`%p` formats pointer values in hexadecimal, standardly with a `(void*)` cast."
  },
  {
    question: "What does `sizeof(char*)` evaluate to on a 64-bit system?",
    options: ["1 byte", "4 bytes", "8 bytes", "16 bytes"],
    correctAnswer: 2,
    explanation: "Even though `char` is 1 byte, any pointer to `char` is 8 bytes on a 64-bit system."
  },
  {
    question: "What does `sizeof(*ptr)` evaluate to if `double *ptr;`?",
    options: ["8 bytes (sizeof(double))", "4 bytes", "8 bytes (pointer size)", "16 bytes"],
    correctAnswer: 0,
    explanation: "`*ptr` is of type `double`, which occupies 8 bytes."
  },
  {
    question: "What is the `nullptr` constant introduced in C23?",
    options: [
      "A type-safe null pointer constant of type `nullptr_t`",
      "A new keyword for deleting pointers",
      "A macro for free()",
      "A pointer to CPU register 0"
    ],
    correctAnswer: 0,
    explanation: "C23 introduced `nullptr` from C++ to resolve integer 0 and pointer ambiguity."
  },
  {
    question: "Can two pointers of the same type point to the exact same memory address?",
    options: [
      "Yes (Pointer Aliasing)",
      "No, each address is unique to one pointer",
      "Only in heap memory",
      "Only if declared static"
    ],
    correctAnswer: 0,
    explanation: "Multiple pointers can reference the exact same memory location."
  },

  // 36-65: Pass-by-Reference Simulation & Out-Parameters
  {
    question: "Why does `void swap(int a, int b)` fail to swap variables in the caller function in C?",
    options: [
      "Because C is strictly pass-by-value, creating isolated copies on the callee stack frame",
      "Because swap is a reserved keyword",
      "Because integers are immutable",
      "Because of compiler optimization"
    ],
    correctAnswer: 0,
    explanation: "Values are copied into local parameters; modifying them leaves caller variables untouched."
  },
  {
    question: "How is pass-by-reference simulated in C?",
    options: [
      "Using reference types `int &x`",
      "By passing variable memory addresses by value into pointer parameters",
      "Using global variables only",
      "Using inline assembly"
    ],
    correctAnswer: 1,
    explanation: "Passing addresses allows the callee to mutate caller stack variables via dereferencing."
  },
  {
    question: "What is an Out-Parameter in C API design?",
    options: [
      "A pointer argument used by the callee to write return data back to the caller",
      "An output file stream",
      "A variable outside main",
      "A command line argument"
    ],
    correctAnswer: 0,
    explanation: "Out-parameters allow returning multiple results or separating error codes from output data."
  },
  {
    question: "What does `(*p)++` do versus `*p++`?",
    options: [
      "`(*p)++` increments the integer value; `*p++` increments the pointer address",
      "`(*p)++` increments pointer; `*p++` increments integer",
      "Both are identical",
      "Both cause syntax errors"
    ],
    correctAnswer: 0,
    explanation: "Postfix `++` has higher precedence than `*`. `(*p)++` forces value incrementation."
  },
  {
    question: "What is the danger of returning a pointer to a local stack variable from a function?",
    options: [
      "It works fine",
      "The stack frame is destroyed upon return, leaving a dangling pointer and undefined behavior",
      "The compiler reallocates it to heap",
      "Memory leak"
    ],
    correctAnswer: 1,
    explanation: "Local stack memory is invalidated when the function returns."
  },

  // 66-95: Pointer Arithmetic & Scaling
  {
    question: "What is Pointer Scaling in C?",
    options: [
      "Adding N to a pointer advances the memory address by `N * sizeof(PointeeType)` bytes",
      "Resizing a pointer variable",
      "Multiplying pointer addresses",
      "Converting pointers to integers"
    ],
    correctAnswer: 0,
    explanation: "Pointer arithmetic automatically scales integer offsets by the pointed data type size."
  },
  {
    question: "If `int *p = (int*)0x1000;` and `sizeof(int) == 4`, what is the address `p + 2`?",
    options: ["0x1002", "0x1008", "0x1004", "0x1010"],
    correctAnswer: 1,
    explanation: "`0x1000 + (2 * 4) = 0x1000 + 8 = 0x1008`."
  },
  {
    question: "What does subtracting two pointers `p2 - p1` belonging to the same array return?",
    options: [
      "The raw number of bytes between them",
      "The number of elements of that data type between them (type `ptrdiff_t`)",
      "A new pointer",
      "Boolean true/false"
    ],
    correctAnswer: 1,
    explanation: "Pointer subtraction divides the byte distance by `sizeof(T)`."
  },
  {
    question: "Which header file defines the signed integer type `ptrdiff_t`?",
    options: ["<stdio.h>", "<stdlib.h>", "<stddef.h>", "<math.h>"],
    correctAnswer: 2,
    explanation: "`<stddef.h>` defines standard pointer-related types including `ptrdiff_t` and `size_t`."
  },
  {
    question: "Which of the following pointer arithmetic operations is ILLEGAL in C?",
    options: [
      "Adding an integer to a pointer (`p + 5`)",
      "Subtracting an integer from a pointer (`p - 2`)",
      "Adding two pointers together (`p1 + p2`)",
      "Subtracting two pointers (`p2 - p1`)"
    ],
    correctAnswer: 2,
    explanation: "Adding two memory addresses has no semantic meaning and is forbidden."
  },
  {
    question: "What is the One-Past-The-End pointer rule?",
    options: [
      "A pointer may point to `arr + N` (one past the last element), but must never be dereferenced",
      "Arrays always have an extra element",
      "Pointers must terminate with NULL",
      "Memory leak prevention"
    ],
    correctAnswer: 0,
    explanation: "Permitted for loop boundary comparison, but dereferencing causes undefined behavior."
  },

  // 96-125: Pointer & Array Equivalence & Decay
  {
    question: "What is the exact compiler definition of array subscripting `arr[i]`?",
    options: ["`*(arr + i)`", "`arr + i`", "`&arr[i]`", "`*arr + i`"],
    correctAnswer: 0,
    explanation: "`arr[i]` is defined as `*((arr) + (i))`."
  },
  {
    question: "Why does `3[arr]` compile and equal `arr[3]` in C?",
    options: [
      "Because addition is commutative: `*(arr + 3) == *(3 + arr)`",
      "It is a compiler bug",
      "Only in C99",
      "3 is converted to an array"
    ],
    correctAnswer: 0,
    explanation: "Subscripting commutativity derives from commutative pointer addition."
  },
  {
    question: "What is the type difference between `arr` and `&arr` for `int arr[5]`?",
    options: [
      "`arr` is `int*`; `&arr` is `int (*)[5]` (pointer to the entire array of 5 ints)",
      "They have identical types",
      "`&arr` is a double pointer `int**`",
      "`arr` is a constant"
    ],
    correctAnswer: 0,
    explanation: "`arr` decays to element pointer; `&arr` is a pointer to the entire array block."
  },
  {
    question: "If `int arr[5]` is at address `0x1000`, what is `&arr + 1`?",
    options: [
      "`0x1004` (+4 bytes)",
      "`0x1014` (+20 bytes - entire array size)",
      "`0x1005`",
      "`0x1020`"
    ],
    correctAnswer: 1,
    explanation: "`&arr + 1` advances by the total byte size of the 5-int array (20 bytes = 0x14 hex -> 0x1014)."
  },
  {
    question: "Why does `sizeof(arr)` return 8 inside a function receiving `void f(int arr[])`?",
    options: [
      "The array shrunk",
      "The parameter `arr` decays into a pointer `int *arr` (8 bytes on 64-bit)",
      "Array size is always 8 in C",
      "Compiler warning"
    ],
    correctAnswer: 1,
    explanation: "Function array parameters are rewritten by the compiler as pointers."
  },

  // 126-155: Pointers to Pointers (Double Pointers)
  {
    question: "What is a Double Pointer (`int **pp`)?",
    options: [
      "A pointer of size 16 bytes",
      "A pointer variable that stores the memory address of another pointer variable",
      "A pointer that points to two integers simultaneously",
      "A floating point pointer"
    ],
    correctAnswer: 1,
    explanation: "A double pointer holds the address of a single pointer variable."
  },
  {
    question: "Why is a double pointer parameter required to allocate heap memory inside a function for the caller?",
    options: [
      "Because modifying the caller's pointer address requires passing `&ptr` (type `T**`)",
      "Because malloc requires double pointers",
      "To prevent stack smashing",
      "It is optional"
    ],
    correctAnswer: 0,
    explanation: "Passing a single pointer copies the address; the caller's pointer remains unchanged without `T**`."
  },
  {
    question: "How do you correctly free a dynamic 2D array allocated via `int **mat`?",
    options: [
      "`free(mat);` only",
      "Free each row first (`free(mat[i])`), then free the master pointer array (`free(mat)`)",
      "`delete mat;`",
      "`free(&mat);`"
    ],
    correctAnswer: 1,
    explanation: "Freeing the master pointer first orphans row buffers, causing memory leaks."
  },
  {
    question: "What does `char **argv` represent in `main(int argc, char **argv)`?",
    options: [
      "An array of command line argument string pointers",
      "A 2D character matrix of 50x50",
      "The return exit code",
      "An environment variable pointer"
    ],
    correctAnswer: 0,
    explanation: "`char **argv` points to the array of string pointers passed from the shell."
  },
  {
    question: "What does `**pp = 50;` accomplish?",
    options: [
      "Writes 50 to the memory address pointed to by the single pointer that `pp` points to",
      "Multiplies pp by 50",
      "Modifies the pointer address",
      "Allocates 50 bytes"
    ],
    correctAnswer: 0,
    explanation: "Two levels of dereference access the underlying target variable."
  },

  // 156-175: Void Pointers & Const Qualifiers
  {
    question: "Can a `void*` pointer be directly dereferenced in standard C without casting?",
    options: [
      "Yes",
      "No, `void` has no byte size; attempting `*p` is a compilation error",
      "Only if it points to an int",
      "Only in C23"
    ],
    correctAnswer: 1,
    explanation: "`void*` must be cast to a concrete type before dereferencing."
  },
  {
    question: "What does `const int *p` mean?",
    options: [
      "The pointed-to integer data is read-only; the pointer address can be changed",
      "The pointer address is locked; data is mutable",
      "Both are constant",
      "Invalid syntax"
    ],
    correctAnswer: 0,
    explanation: "The data is const; `p = &b` is allowed, but `*p = 10` is forbidden."
  },
  {
    question: "What does `int * const p` mean?",
    options: [
      "The pointer address is constant and cannot point elsewhere; the data is mutable",
      "The data is constant",
      "Both are constant",
      "p is stored in ROM"
    ],
    correctAnswer: 0,
    explanation: "The pointer variable is locked; `*p = 10` is allowed, but `p = &b` is forbidden."
  },
  {
    question: "What does `const int * const p` mean?",
    options: [
      "Both the pointer address and the pointed-to data are completely read-only / immutable",
      "Data is mutable",
      "Pointer address is mutable",
      "Syntax error"
    ],
    correctAnswer: 0,
    explanation: "Maximum immutability: neither the address nor the data can be modified."
  },
  {
    question: "Why is casting a pointer to `const unsigned char*` used for memory dumping?",
    options: [
      "Because `sizeof(unsigned char)` is 1 byte, allowing byte-by-byte memory inspection",
      "Because unsigned char is faster",
      "To encrypt data",
      "To clear memory"
    ],
    correctAnswer: 0,
    explanation: "Guarantees 1-byte stride inspection across any data structure in RAM."
  },

  // 176-200: Function Pointers, Callbacks & Dispatch Tables
  {
    question: "What is a Function Pointer in C?",
    options: [
      "A pointer storing the entry point memory address of executable machine code in the text segment",
      "A pointer to a function's stack frame",
      "A function that returns a pointer",
      "A macro"
    ],
    correctAnswer: 0,
    explanation: "Stores the memory address where a function's compiled machine code resides."
  },
  {
    question: "What is the correct syntax to declare a pointer `fp` to a function taking two `int`s and returning `int`?",
    options: [
      "`int (*fp)(int, int);`",
      "`int *fp(int, int);`",
      "`int fp*(int, int);`",
      "`function int fp(int, int);`"
    ],
    correctAnswer: 0,
    explanation: "Parentheses `(*fp)` are mandatory; without them, it declares a function returning `int*`."
  },
  {
    question: "What is a Dispatch Table in C?",
    options: [
      "An array of function pointers indexed by opcode to invoke functions in O(1) time",
      "A database table",
      "A compiler symbol table",
      "A network router"
    ],
    correctAnswer: 0,
    explanation: "Replaces slow `switch`/`if-else` trees with direct array-indexed function calls."
  },
  {
    question: "What is the signature of the comparator required by `qsort()` from `<stdlib.h>`?",
    options: [
      "`int (*cmp)(const void *a, const void *b)`",
      "`int (*cmp)(int a, int b)`",
      "`void (*cmp)(void *a, void *b)`",
      "`bool (*cmp)(const void *a, const void *b)`"
    ],
    correctAnswer: 0,
    explanation: "`qsort` expects a comparator accepting two `const void*` and returning integer comparison difference."
  },
  {
    question: "What happens if a function pointer containing `NULL` is called (`fp(10, 20)`)?",
    options: [
      "Immediate fatal crash / Segmentation Fault (executing code at address 0)",
      "Returns 0 safely",
      "Ignores call",
      "Restarts program"
    ],
    correctAnswer: 0,
    explanation: "Executing code at address 0 triggers an immediate OS memory fault. Always guard with `if (fp != NULL)`."
  }
];

export default questions;
