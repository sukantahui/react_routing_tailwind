const questions = [
  {
    "id": 1,
    "question": "According to the ISO C standard (C99/C11/C17/C23), how is the array subscript operator `E1[E2]` formally defined?",
    "options": [
      "`E1[E2]` is defined as `(*((E1) + (E2)))`",
      "`E1[E2]` is defined as `E1 * E2`",
      "`E1[E2]` is defined as `E1->E2`",
      "`E1[E2]` is defined as `&E1 + E2`"
    ],
    "answer": "`E1[E2]` is defined as `(*((E1) + (E2)))`",
    "explanation": "Section 6.5.2.1 of the ISO C standard specifies that array subscripting is pure syntactic sugar for pointer addition and dereferencing: `E1[E2]` is identical to `(*((E1) + (E2)))`."
  },
  {
    "id": 2,
    "question": "Why is `3[arr]` valid C syntax and completely identical to `arr[3]`?",
    "options": [
      "Because `3[arr]` expands to `*(3 + arr)`, and since addition is commutative (`3 + arr == arr + 3`), it evaluates to `*(arr + 3) == arr[3]`",
      "Because C compilers reverse all array expressions",
      "Because 3 is a pointer",
      "Because arr is an integer"
    ],
    "answer": "Because `3[arr]` expands to `*(3 + arr)`, and since addition is commutative (`3 + arr == arr + 3`), it evaluates to `*(arr + 3) == arr[3]`",
    "explanation": "The commutative property of pointer addition guarantees that `*(arr + 3)` and `*(3 + arr)` produce the identical memory address and value."
  },
  {
    "id": 3,
    "question": "What is the difference between `arr` and `&arr` for a static array `int arr[5]` in C?",
    "options": [
      "Both point to the same physical memory address, but `arr` has type `int*` (points to element 0), while `&arr` has type `int (*)[5]` (pointer to the entire array of 5 integers)",
      "They have completely different memory addresses",
      "`&arr` is illegal in C",
      "`arr` is a double pointer"
    ],
    "answer": "Both point to the same physical memory address, but `arr` has type `int*` (points to element 0), while `&arr` has type `int (*)[5]` (pointer to the entire array of 5 integers)",
    "explanation": "Although the numerical address `0x1000` is the same, `arr + 1` advances by 4 bytes (`sizeof(int)`), while `&arr + 1` advances by 20 bytes (`sizeof(int[5])`)."
  },
  {
    "id": 4,
    "question": "If `arr` is an array of 5 integers starting at address 0x1000, what is the value of `&arr + 1`?",
    "options": [
      "0x1014 (0x1000 + 5 * 4 = 0x1000 + 20 bytes = 0x1014 in hex)",
      "0x1004",
      "0x1001",
      "0x1008"
    ],
    "answer": "0x1014 (0x1000 + 5 * 4 = 0x1000 + 20 bytes = 0x1014 in hex)",
    "explanation": "Because `&arr` has type 'pointer to array of 5 ints', adding 1 steps past the entire 20-byte array: `0x1000 + 20 = 0x1014`."
  },
  {
    "id": 5,
    "question": "Can an array name in C be modified as an lvalue (e.g. `arr++` or `arr = ptr`)?",
    "options": [
      "NO: An array name is a non-modifiable lvalue representing a fixed address; attempting `arr++` triggers a compile error",
      "YES: It increments the array by 1",
      "YES: It points to the next array",
      "Only inside loops"
    ],
    "answer": "NO: An array name is a non-modifiable lvalue representing a fixed address; attempting `arr++` triggers a compile error",
    "explanation": "An array identifier represents the fixed location of the allocated block. You cannot reassign or increment the array name itself."
  },
  {
    "id": 6,
    "question": "How does `*arr + 2` differ from `*(arr + 2)` in C operator precedence?",
    "options": [
      "`*arr + 2` dereferences the first element and adds 2 to the value (`arr[0] + 2`), whereas `*(arr + 2)` accesses the element at index 2 (`arr[2]`)",
      "They are identical",
      "`*arr + 2` causes a syntax error",
      "`*(arr + 2)` multiplies by 2"
    ],
    "answer": "`*arr + 2` dereferences the first element and adds 2 to the value (`arr[0] + 2`), whereas `*(arr + 2)` accesses the element at index 2 (`arr[2]`)",
    "explanation": "Dereference `*` has higher precedence than addition `+`. Thus `*arr + 2` evaluates as `(*arr) + 2`."
  },
  {
    "id": 7,
    "question": "What does the expression `*(*matrix + i)` evaluate to for a 2D array `int matrix[3][4]`?",
    "options": [
      "`matrix[0][i]` (the i-th element of row 0)",
      "`matrix[i][0]`",
      "`matrix[i][i]`",
      "`matrix[3][4]`"
    ],
    "answer": "`matrix[0][i]` (the i-th element of row 0)",
    "explanation": "`*matrix` decays to a pointer to the first element of row 0 (`&matrix[0][0]`). Adding `i` and dereferencing gives `matrix[0][i]`."
  },
  {
    "id": 8,
    "question": "How is the 2D array element `matrix[i][j]` expressed purely in pointer dereference notation?",
    "options": [
      "`*(*(matrix + i) + j)`",
      "`*(matrix + i + j)`",
      "`**(matrix + i * j)`",
      "`*matrix[i] + j`"
    ],
    "answer": "`*(*(matrix + i) + j)`",
    "explanation": "`matrix[i]` is `*(matrix + i)`. Subscripting `[j]` on that result gives `*(*(matrix + i) + j)`."
  },
  {
    "id": 9,
    "question": "In C, what is the type of the expression `matrix + 1` for `int matrix[3][4]`?",
    "options": [
      "`int (*)[4]` (pointer to an array of 4 integers, pointing to row 1)",
      "`int*`",
      "`int**`",
      "`int`"
    ],
    "answer": "`int (*)[4]` (pointer to an array of 4 integers, pointing to row 1)",
    "explanation": "`matrix` decays to a pointer to its first row (`int (*)[4]`). Adding 1 steps forward by one entire row (`4 * sizeof(int) = 16` bytes)."
  },
  {
    "id": 10,
    "question": "What is the difference between `int *arr[5]` and `int (*arr)[5]`?",
    "options": [
      "`int *arr[5]` is an array of 5 pointers to integers; `int (*arr)[5]` is a single pointer to an array of 5 integers",
      "They are identical syntax",
      "`int (*arr)[5]` is an array of functions",
      "`int *arr[5]` is a 2D array on the stack"
    ],
    "answer": "`int *arr[5]` is an array of 5 pointers to integers; `int (*arr)[5]` is a single pointer to an array of 5 integers",
    "explanation": "Operator precedence: brackets `[]` bind tighter than dereference `*`. Parentheses `(*arr)` ensure `arr` is declared as a pointer to an array."
  },
  {
    "id": 11,
    "question": "What does `sizeof(&arr)` return for `int arr[10]` on a 64-bit platform?",
    "options": [
      "8 bytes (the size of a pointer to an array)",
      "40 bytes",
      "10 bytes",
      "4 bytes"
    ],
    "answer": "8 bytes (the size of a pointer to an array)",
    "explanation": "`&arr` produces a pointer (`int (*)[10]`). The size of any memory pointer on a 64-bit architecture is 8 bytes."
  },
  {
    "id": 12,
    "question": "Why does `sizeof(arr)` evaluate to total array bytes inside the function where it is defined, but 8 bytes when passed to another function?",
    "options": [
      "Inside the defining scope, the compiler knows the full array type definition; in function parameter lists, arrays decay to raw pointers (`int*`)",
      "Because the other function uses a 32-bit compiler",
      "Because passing arguments copies only the first element",
      "It is a bug in GCC"
    ],
    "answer": "Inside the defining scope, the compiler knows the full array type definition; in function parameter lists, arrays decay to raw pointers (`int*`)",
    "explanation": "Parameter syntax `void f(int a[100])` is converted by the compiler to `void f(int* a)`. The size information is lost upon decay."
  },
  {
    "id": 13,
    "question": "What is the value of `*(&arr[0] + 3)` if `arr = {10, 20, 30, 40, 50}`?",
    "options": [
      "40 (`arr[3]`)",
      "13",
      "30",
      "50"
    ],
    "answer": "40 (`arr[3]`)",
    "explanation": "`&arr[0]` is pointer to index 0. Adding 3 steps to index 3. Dereferencing yields value `40`."
  },
  {
    "id": 14,
    "question": "What does the expression `*(int*)((char*)arr + 8)` evaluate to if `int arr[] = {100, 200, 300, 400}` on a 32/64-bit system where `sizeof(int) == 4`?",
    "options": [
      "300 (advancing 8 raw bytes moves 2 integer slots forward to index 2)",
      "108",
      "200",
      "400"
    ],
    "answer": "300 (advancing 8 raw bytes moves 2 integer slots forward to index 2)",
    "explanation": "Casting to `char*` enables byte-level pointer arithmetic. Adding 8 bytes skips `8 / 4 = 2` integer elements, landing on `arr[2] = 300`."
  },
  {
    "id": 15,
    "question": "Why is `i[arr]` considered poor coding style in production code despite being 100% legal ISO C?",
    "options": [
      "It harms readability, confuses developers unfamiliar with pointer commutativity, and violates clean code standards without providing any performance benefit",
      "It executes 2x slower",
      "It causes compiler warnings in Clang",
      "It disables optimization"
    ],
    "answer": "It harms readability, confuses developers unfamiliar with pointer commutativity, and violates clean code standards without providing any performance benefit",
    "explanation": "While mathematically valid in C grammar, `i[arr]` is obfuscated and obscures intent."
  },
  {
    "id": 16,
    "question": "Can `arr[-1]` ever be legal and safe in C?",
    "options": [
      "YES: If a pointer `p = &arr[2]`, then `p[-1]` legally accesses `arr[1]` (`*(p - 1)`) within valid array boundaries",
      "NO: Negative indices are strictly illegal in C syntax",
      "NO: It causes a compilation error",
      "Only in Python"
    ],
    "answer": "YES: If a pointer `p = &arr[2]`, then `p[-1]` legally accesses `arr[1]` (`*(p - 1)`) within valid array boundaries",
    "explanation": "Because `p[-1]` expands to `*(p - 1)`, if `p` points to an interior element, negative index offsets are valid."
  },
  {
    "id": 17,
    "question": "What is the output of `printf(\"%c\", *(\"Barrackpore\" + 4))` in C?",
    "options": [
      "'a' (index 4 in string \"Barrackpore\": B=0, a=1, r=2, r=3, a=4)",
      "'r'",
      "'c'",
      "'k'"
    ],
    "answer": "'a' (index 4 in string \"Barrackpore\": B=0, a=1, r=2, r=3, a=4)",
    "explanation": "String literals are `const char[]` arrays. Adding 4 advances to character at index 4 ('a')."
  },
  {
    "id": 18,
    "question": "What does `4[\"Barrackpore\"]` evaluate to in C?",
    "options": [
      "'a' (the character at index 4, identical to \"Barrackpore\"[4])",
      "Compile error",
      "Null character '\\0'",
      "4"
    ],
    "answer": "'a' (the character at index 4, identical to \"Barrackpore\"[4])",
    "explanation": "`4[\"Barrackpore\"]` expands to `*(4 + \"Barrackpore\")`, returning the 4th index character 'a'."
  },
  {
    "id": 19,
    "question": "What happens when you pass an array to a function declared as `void printArray(int arr[100])` with an array of size 5?",
    "options": [
      "The program compiles and runs because the dimension `100` in the parameter list is ignored by the compiler and treated as `int* arr`",
      "Compilation error due to size mismatch",
      "Runtime exception",
      "The array is padded with 95 zeros"
    ],
    "answer": "The program compiles and runs because the dimension `100` in the parameter list is ignored by the compiler and treated as `int* arr`",
    "explanation": "In C function parameter declarations, `int arr[100]` is syntactic sugar for `int* arr`. The compiler does not verify or enforce the size 100."
  },
  {
    "id": 20,
    "question": "How can C99 array parameter static bounds checking be enabled in supporting compilers?",
    "options": [
      "Using the `static` keyword inside the parameter brackets: `void func(int arr[static 10])` guarantees the argument is non-null and holds at least 10 elements",
      "Using `const int arr[10]`",
      "Using `pragma array_check`",
      "Using `static void func(int arr[])`"
    ],
    "answer": "Using the `static` keyword inside the parameter brackets: `void func(int arr[static 10])` guarantees the argument is non-null and holds at least 10 elements",
    "explanation": "C99 `[static N]` informs the compiler and static analyzers that the pointer must point to an array of at least N valid elements."
  },
  {
    "id": 21,
    "question": "What is the result of `++*ptr` vs `*ptr++` vs `*++ptr`?",
    "options": [
      "`++*ptr` increments the pointed-to value; `*ptr++` reads the value and then increments the pointer address; `*++ptr` increments pointer address first and reads the new value",
      "All three perform the identical operation",
      "`*ptr++` multiplies ptr by 2",
      "`++*ptr` causes a syntax error"
    ],
    "answer": "`++*ptr` increments the pointed-to value; `*ptr++` reads the value and then increments the pointer address; `*++ptr` increments pointer address first and reads the new value",
    "explanation": "Postfix `++` has higher precedence than prefix `*`. Understanding operator binding is essential for C pointer manipulation."
  },
  {
    "id": 22,
    "question": "What is the output of `int a[] = {1, 2, 3}; int* p = a; printf(\"%d \", *p++); printf(\"%d\", *p);`?",
    "options": [
      "`1 2`",
      "`2 2`",
      "`1 1`",
      "`2 3`"
    ],
    "answer": "`1 2`",
    "explanation": "`*p++` returns `*p` (value 1) and then increments `p` to point to `a[1]`. The second printf prints `*p` (value 2)."
  },
  {
    "id": 23,
    "question": "Why does `int arr[5]; int* p = arr;` allow `p` to be incremented (`p++`) while `arr++` is forbidden?",
    "options": [
      "`p` is an allocated pointer variable stored in memory with its own storage, whereas `arr` is an immutable constant address label representing the array",
      "`arr` is stored in ROM",
      "`p` is a macro",
      "Because `arr` is unsigned"
    ],
    "answer": "`p` is an allocated pointer variable stored in memory with its own storage, whereas `arr` is an immutable constant address label representing the array",
    "explanation": "A pointer variable is an lvalue with distinct memory. An array identifier is a non-modifiable symbol table address."
  },
  {
    "id": 24,
    "question": "How does the compiler generate machine code for `arr[i]` on x86-64 assembly?",
    "options": [
      "Using the indexed addressing mode instruction `mov eax, [rdi + rsi * 4]` where `rdi` is base address, `rsi` is index, and `4` is scale factor",
      "Using a loop with N jumps",
      "Using a floating point instruction",
      "Calling a runtime function `__get_array_elem`"
    ],
    "answer": "Using the indexed addressing mode instruction `mov eax, [rdi + rsi * 4]` where `rdi` is base address, `rsi` is index, and `4` is scale factor",
    "explanation": "x86-64 hardware supports Base + Index * Scale addressing natively in a single CPU clock cycle."
  },
  {
    "id": 25,
    "question": "What is the ultimate takeaway from Sukanta Sir's Barrackpore lab discussion on array syntax?",
    "options": [
      "In C, array brackets `[]` are not a distinct data type operator, but pure algebraic syntactic sugar for pointer arithmetic and memory dereferencing (`*(base + offset)`)",
      "Pointers are obsolete in modern C",
      "Arrays should always be replaced with linked lists",
      "C does not support 1D arrays"
    ],
    "answer": "In C, array brackets `[]` are not a distinct data type operator, but pure algebraic syntactic sugar for pointer arithmetic and memory dereferencing (`*(base + offset)`)",
    "explanation": "Understanding that `arr[i] == *(arr + i)` demystifies memory access, multi-dimensional stride, and dynamic pointer manipulation in systems programming."
  }
];

export default questions;
