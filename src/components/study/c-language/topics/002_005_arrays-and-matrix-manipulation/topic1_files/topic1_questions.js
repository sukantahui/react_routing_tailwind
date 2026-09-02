const questions = [
  {
    question: "What does 'array decaying to a pointer' mean in C?",
    shortAnswer: "When an array is passed as an argument or used in expressions, its name decays into a pointer to its first element (&arr[0]).",
    explanation: "C never passes whole arrays by value to functions. Instead, the memory address of the first element is copied onto the function's stack frame.",
    hint: "Array name converts into pointer to index 0.",
    level: "basic",
    codeExample: "void func(int arr[]) { /* arr is treated as int* arr */ }"
  },
  {
    question: "Why does sizeof(arr) return 8 (or 4 on 32-bit) instead of total array bytes when used inside a function?",
    shortAnswer: "Because inside the function parameter list, arr is just a pointer variable (int*), not the original array.",
    explanation: "The compiler converts void func(int arr[]) into void func(int *arr). Hence, sizeof(arr) evaluates to the size of a memory pointer (8 bytes on 64-bit CPU).",
    hint: "Function parameters cannot preserve array size metadata.",
    level: "intermediate"
  },
  {
    question: "Why must we always pass array length as a separate parameter to C functions?",
    shortAnswer: "Because the receiving function receives only a base pointer and has no way to determine the number of elements.",
    explanation: "Without a size parameter, the function would have no boundary limit, leading to reading or writing beyond the array into unallocated memory.",
    hint: "Pointers do not carry size information.",
    level: "basic",
    codeExample: "void processArray(int arr[], int size);"
  },
  {
    question: "Are the function prototypes void f(int arr[]) and void f(int *arr) identical in C?",
    shortAnswer: "Yes, in function parameter declarations, int arr[] is exact syntactic sugar for int *arr.",
    explanation: "Both declare a parameter of type int*. The compiler generates identical machine code for both declarations.",
    hint: "Brackets in parameter list decay to pointer.",
    level: "basic"
  },
  {
    question: "How can you prevent a function from accidentally modifying array elements?",
    shortAnswer: "By qualifying the array parameter with the const keyword (e.g. const int arr[]).",
    explanation: "Declaring const int *arr makes the elements read-only. Any attempt to write arr[i] = 10 triggers a compile-time error.",
    hint: "Use const for read-only array parameters.",
    level: "basic",
    codeExample: "void display(const int arr[], int size) {\n    // arr[0] = 99; // COMPILE ERROR!\n}"
  },
  {
    question: "Why does modifying array elements inside a function alter the original array in main()?",
    shortAnswer: "Because the function operates directly on the caller's memory via the passed base address.",
    explanation: "Even though the pointer itself is passed by value (copied), dereferencing it (arr[i] or *(arr + i)) modifies the exact memory cells allocated in main().",
    hint: "Pointers allow in-place modification of caller memory.",
    level: "intermediate"
  },
  {
    question: "In which two situations does an array name NOT decay into a pointer?",
    shortAnswer: "1. When used with the sizeof operator. 2. When used with the unary address-of operator (&).",
    explanation: "sizeof(arr) returns total array byte size. &arr returns a pointer to the entire array of type int(*)[N], not int*.",
    hint: "sizeof and unary & prevent array decay.",
    level: "advanced"
  },
  {
    question: "Can a C function return an entire static local array directly?",
    shortAnswer: "No, returning a pointer to a local stack array causes undefined behavior because the stack frame is destroyed upon function exit.",
    explanation: "Local variables on the stack are deallocated when the function returns. Returning their address creates a dangling pointer.",
    hint: "Never return pointers to local stack variables.",
    level: "intermediate",
    codeExample: "// DANGEROUS BUG:\nint* badFunction() {\n    int temp[5] = {1, 2, 3, 4, 5};\n    return temp; // Warning: function returns address of local variable\n}"
  },
  {
    question: "How can a C function safely return an array of data to the caller?",
    shortAnswer: "Either allocate memory dynamically on the heap via malloc(), or have the caller pass an output buffer.",
    explanation: "Heap memory allocated with malloc() persists after function return until explicitly freed. Alternatively, caller-allocated output buffers are safe and idiomatic.",
    hint: "Use malloc() or pass a destination buffer.",
    level: "intermediate"
  },
  {
    question: "What is the parameter syntax for passing a 2D array with fixed columns to a function?",
    shortAnswer: "void func(int arr[][COLS], int rows); (Column dimension must be specified).",
    explanation: "The compiler needs column width to compute row-major memory offset: base + (row * COLS + col) * sizeof(type).",
    hint: "Column size is mandatory for row-offset calculation.",
    level: "intermediate",
    codeExample: "void processMatrix(int matrix[][4], int rows);"
  },
  {
    question: "What happens if you pass a 2D array as void func(int **arr) without dynamic pointer setup?",
    shortAnswer: "It causes compiler warnings and runtime segmentation faults due to mismatched memory indirection.",
    explanation: "A contiguous 2D array int arr[3][3] is a single flat block in RAM, while int** expects an array of pointer addresses.",
    hint: "Flat 2D arrays are not equivalent to pointer-to-pointer **.",
    level: "advanced"
  },
  {
    question: "How can you pass a subarray (slice) of an array to a function in C?",
    shortAnswer: "By passing the address of the starting element: &arr[startIndex] or (arr + startIndex).",
    explanation: "Because functions accept a pointer and length, passing &arr[2] with length (n - 2) processes elements from index 2 onwards.",
    hint: "Pass offset pointer + reduced length.",
    level: "intermediate",
    codeExample: "int data[10] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};\nprintArray(&data[3], 4); // Prints elements 3, 4, 5, 6"
  },
  {
    question: "What is the difference between void f(int *arr) and void f(int arr[10]) in a parameter list?",
    shortAnswer: "None. The compiler completely ignores the constant size 10 inside brackets in parameter declarations.",
    explanation: "Even with int arr[10], you can pass an array of 5 or 500 elements without compiler error, because it decays to int*.",
    hint: "Parameter array dimensions are discarded by compiler.",
    level: "intermediate"
  },
  {
    question: "What is the C99 static array parameter qualifier void f(int arr[static 10])?",
    shortAnswer: "It informs the compiler that the passed array will have at least 10 non-null elements.",
    explanation: "Allows compiler optimizations and static analysis warnings if NULL or an undersized array is passed.",
    hint: "Guarantees minimum element count for optimizer.",
    level: "advanced",
    codeExample: "void processBatch(int data[static 10]);"
  },
  {
    question: "How do you pass an array of pointers to a function?",
    shortAnswer: "Using void func(char *arr[], int n) or void func(char **arr, int n).",
    explanation: "An array of pointers decays into a pointer-to-pointer (type**).",
    hint: "Array of pointers decays to double pointer.",
    level: "intermediate"
  },
  {
    question: "How does passing arrays by pointer optimize execution speed and memory usage in C?",
    shortAnswer: "It avoids copying thousands of bytes by passing only a lightweight 8-byte memory address.",
    explanation: "Passing a 10,000-integer array (40KB) by pointer takes ~8 bytes on the stack and O(1) time, compared to copying 40KB in O(n) time.",
    hint: "Address passing avoids massive stack frame copying.",
    level: "basic"
  },
  {
    question: "What is an in-place array transformation function?",
    shortAnswer: "A function that modifies the input array without allocating secondary auxiliary array buffers.",
    explanation: "In-place operations have O(1) auxiliary space complexity, conserving system memory.",
    hint: "Zero extra memory allocation.",
    level: "basic"
  },
  {
    question: "How do you implement an in-place array swap function for two elements in C?",
    shortAnswer: "void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }",
    explanation: "Dereferencing *a and *b modifies the caller's array slots directly.",
    hint: "Dereference and swap temporary.",
    level: "basic",
    codeExample: "void swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}"
  },
  {
    question: "Can an array decay when used as the operand of string literal initialization?",
    shortAnswer: "No. In char str[] = \"hello\";, the string literal initializes the array elements directly.",
    explanation: "The compiler copies the characters 'h','e','l','l','o','\\0' into the newly allocated stack array.",
    hint: "String literal initialization populates stack characters.",
    level: "intermediate"
  },
  {
    question: "What is the time complexity of passing an array to a function in C?",
    shortAnswer: "O(1) constant time.",
    explanation: "Only the pointer address is copied onto the CPU registers or stack, regardless of whether the array contains 5 elements or 5 million elements.",
    hint: "Constant time address push.",
    level: "basic"
  },
  {
    question: "What tool can detect out-of-bounds array accesses in C programs during testing?",
    shortAnswer: "AddressSanitizer (compiled with gcc -fsanitize=address) or Valgrind.",
    explanation: "AddressSanitizer inserts instrumentation around pointer and array dereferences to catch heap, stack, and global buffer overflows immediately.",
    hint: "gcc -fsanitize=address flag.",
    level: "intermediate"
  },
  {
    question: "How do you pass a variable-length 2D array (VLA) to a function in C99?",
    shortAnswer: "Pass dimensions first, followed by the 2D array: void func(int rows, int cols, int arr[rows][cols]);",
    explanation: "In C99, parameter order matters: row and column variables must precede the array parameter so the compiler knows the dimensions.",
    hint: "Dimensions must precede array parameter in signature.",
    level: "advanced",
    codeExample: "void displayVLA(int r, int c, int matrix[r][c]);"
  },
  {
    question: "Why should we avoid writing functions that assume fixed hardcoded array lengths?",
    shortAnswer: "It makes functions inflexible and prone to buffer overflow bugs when larger or smaller arrays are passed.",
    explanation: "Modular software design requires passing array length dynamically to handle arbitrary data sizes safely.",
    hint: "Always parameterize buffer sizes.",
    level: "basic"
  },
  {
    question: "What is the effect of const int * const arr in a function parameter?",
    shortAnswer: "Both the array elements and the pointer itself are constant and cannot be modified.",
    explanation: "const int* prevents modifying the data; * const arr prevents reassigning the pointer to another memory location inside the function.",
    hint: "Read-only data and immutable pointer.",
    level: "advanced"
  },
  {
    question: "What is the return type of a function that returns the index of a found element or -1 if not found?",
    shortAnswer: "int or ssize_t (signed integer).",
    explanation: "A signed integer is necessary so that negative values (-1) can signal an error or not-found status.",
    hint: "Signed integer allows returning -1 sentinel.",
    level: "basic"
  }
];

export default questions;
