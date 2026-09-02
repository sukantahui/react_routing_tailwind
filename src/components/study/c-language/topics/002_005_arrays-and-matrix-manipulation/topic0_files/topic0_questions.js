const questions = [
  {
    question: "What is an array in C and how are its elements stored in hardware memory?",
    shortAnswer: "An array is a fixed-size collection of elements of the same data type stored in contiguous memory locations.",
    explanation: "Because elements are adjacent in physical RAM, any element arr[i] can be accessed in O(1) constant time using the formula: Base Address + (i * sizeof(datatype)).",
    hint: "Think about contiguous RAM addresses and zero-based indexing.",
    level: "basic",
    codeExample: "int arr[5] = {10, 20, 30, 40, 50};\n// Memory: [10][20][30][40][50] in consecutive bytes"
  },
  {
    question: "Why is array indexing 0-based in C rather than 1-based?",
    shortAnswer: "The index represents an offset or distance from the base memory address.",
    explanation: "The identifier arr represents the memory address of the first element (offset 0). Thus, arr[0] is *(arr + 0), arr[1] is *(arr + 1), and so on.",
    hint: "Index equals offset multiplier from base address.",
    level: "basic"
  },
  {
    question: "How do you calculate the number of elements in a statically allocated array?",
    shortAnswer: "Using the sizeof operator: sizeof(arr) / sizeof(arr[0]).",
    explanation: "sizeof(arr) returns the total memory bytes allocated for the entire array, while sizeof(arr[0]) returns the bytes occupied by a single element. Dividing the two gives the total element count.",
    hint: "Total bytes divided by single element bytes.",
    level: "basic",
    codeExample: "int arr[10];\nint length = sizeof(arr) / sizeof(arr[0]); // 40 / 4 = 10"
  },
  {
    question: "What happens if you access an array index out of its defined bounds (e.g. arr[10] for arr[5])?",
    shortAnswer: "It causes Undefined Behavior (UB), which may result in data corruption or a segmentation fault.",
    explanation: "C does not perform runtime array bounds checking. Accessing out-of-bounds indices reads or overwrites arbitrary adjacent memory on the stack or heap.",
    hint: "C leaves bounds checking entirely to the programmer.",
    level: "intermediate"
  },
  {
    question: "What happens if an array is partially initialized, such as int arr[5] = {1, 2};?",
    shortAnswer: "The remaining uninitialized elements are automatically set to zero (0).",
    explanation: "When an initializer list has fewer elements than the declared size, the C standard guarantees that all remaining elements receive zero (or NULL for pointers).",
    hint: "Partial initialization guarantees trailing zeros.",
    level: "basic",
    codeExample: "int arr[5] = {10, 20}; // Result: 10, 20, 0, 0, 0"
  },
  {
    question: "How do you zero-initialize an entire array in standard C?",
    shortAnswer: "Using int arr[100] = {0};",
    explanation: "Explicitly initializing the first element to 0 causes the compiler to initialize all remaining 99 elements to 0 as well.",
    hint: "Use an initializer list with a single 0.",
    level: "basic",
    codeExample: "int buffer[1024] = {0}; // All 1024 integers are zero"
  },
  {
    question: "What values do uninitialized local arrays contain in C?",
    shortAnswer: "They contain indeterminate 'garbage' values from stack memory.",
    explanation: "Local variables with automatic storage class are not cleared by default. Reading an uninitialized array element reads whatever bits previously occupied that stack slot.",
    hint: "Local variables default to stack remnants unless initialized.",
    level: "basic"
  },
  {
    question: "What is the difference between int arr[5]; and static int arr[5]; regarding initial values?",
    shortAnswer: "Static arrays are stored in the BSS segment and default to 0; local auto arrays contain garbage.",
    explanation: "Global and static variables are initialized to 0 by the OS loader before main() executes.",
    hint: "Static storage lifetime variables are automatically zeroed.",
    level: "intermediate"
  },
  {
    question: "Can the size of a standard C array be modified at runtime once declared statically?",
    shortAnswer: "No, static array sizes are fixed at compile time and cannot be resized.",
    explanation: "Memory is allocated on the stack frame or data segment with fixed byte boundaries. Dynamic resizing requires heap allocation via realloc().",
    hint: "Static arrays have constant size.",
    level: "basic"
  },
  {
    question: "What is a Variable Length Array (VLA) in C99 and what are its caveats?",
    shortAnswer: "A VLA is an array whose size is determined at runtime on the stack (e.g. int arr[n];).",
    explanation: "VLAs were introduced in C99 and made optional in C11. Large VLAs can quickly blow through stack limits, causing catastrophic stack overflow crashes.",
    hint: "VLAs reside on the stack and risk stack overflow.",
    level: "intermediate",
    codeExample: "int n;\nscanf(\"%d\", &n);\nint arr[n]; // VLA allocated on stack"
  },
  {
    question: "What is the relationship between the array name arr and &arr[0]?",
    shortAnswer: "Both evaluate to the memory address of the first element.",
    explanation: "In most expression contexts, the array identifier arr automatically decays into a pointer to its first element (&arr[0]).",
    hint: "Array name represents pointer to index 0.",
    level: "basic"
  },
  {
    question: "What is the difference between &arr and arr?",
    shortAnswer: "Both yield the same numeric address, but they have different pointer types and scaling arithmetic.",
    explanation: "arr decays to int* (pointer to single int), while &arr is of type int(*)[5] (pointer to whole array of 5 ints). Thus, (arr + 1) jumps 4 bytes, while (&arr + 1) jumps 20 bytes.",
    hint: "Pointer to element vs pointer to entire array.",
    level: "advanced",
    codeExample: "int arr[5];\nprintf(\"%p %p\\n\", (void*)(arr + 1), (void*)(&arr + 1));"
  },
  {
    question: "Why does the expression 2[arr] compile and work in C?",
    shortAnswer: "Because arr[2] is defined as *(arr + 2), and addition is commutative: *(2 + arr) == 2[arr].",
    explanation: "In C syntax, array subscript notation E1[E2] is strictly evaluated as *(((E1) + (E2))). Since (arr + 2) == (2 + arr), both arr[2] and 2[arr] evaluate identically.",
    hint: "Subscripting is commutative pointer addition dereferencing.",
    level: "intermediate",
    codeExample: "int arr[] = {10, 20, 30};\nprintf(\"%d\", 2[arr]); // Prints 30"
  },
  {
    question: "Can an array be assigned directly to another array using the assignment operator (arr1 = arr2)?",
    shortAnswer: "No, array names are non-modifiable lvalues.",
    explanation: "You cannot reassign an array identifier. To copy elements, use a for loop or the standard library function memcpy().",
    hint: "Use memcpy() or a loop to copy array contents.",
    level: "basic",
    codeExample: "#include <string.h>\nmemcpy(arr1, arr2, sizeof(arr1));"
  },
  {
    question: "What is an in-place array reversal algorithm?",
    shortAnswer: "Swapping elements from both ends using two pointers or indices moving toward the center.",
    explanation: "Initialize left = 0 and right = n - 1. Swap arr[left] with arr[right], then increment left and decrement right until left >= right in O(n/2) = O(n) time.",
    hint: "Two-pointer swap from extremities.",
    level: "basic",
    codeExample: "for (int i = 0, j = n - 1; i < j; i++, j--) {\n    int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;\n}"
  },
  {
    question: "How do you find the second largest element in an array in a single pass O(n)?",
    shortAnswer: "Track both highest and secondHighest variables during iteration.",
    explanation: "If arr[i] > highest, set secondHighest = highest, then highest = arr[i]. Else if arr[i] > secondHighest and arr[i] != highest, set secondHighest = arr[i].",
    hint: "Maintain top two maximum values simultaneously.",
    level: "intermediate"
  },
  {
    question: "How do you remove duplicates from a sorted 1D array in O(n) time?",
    shortAnswer: "Use a slow-write pointer that advances only when encountering a new unique value.",
    explanation: "With i at 0, loop j from 1 to n - 1. If arr[j] != arr[i], increment i and set arr[i] = arr[j]. The unique count is i + 1.",
    hint: "Two pointers: reader pointer and writer pointer.",
    level: "intermediate"
  },
  {
    question: "What is designated initialization in C99 for arrays?",
    shortAnswer: "Explicitly setting specific indices during declaration using [index] = value.",
    explanation: "Allows initializing sparse arrays cleanly without filling prior elements manually. Unspecified indices are set to zero.",
    hint: "Syntax: [index] = value in initializer list.",
    level: "intermediate",
    codeExample: "int flags[10] = {[0] = 1, [5] = 99, [9] = 500};"
  },
  {
    question: "What is the time complexity of inserting an element at the beginning of an unsorted 1D array?",
    shortAnswer: "O(n) time complexity.",
    explanation: "All existing n elements must be shifted one position to the right to create space at index 0.",
    hint: "Right shifting required for all n items.",
    level: "basic"
  },
  {
    question: "What is the time complexity of deleting an element at index k from an array of size n?",
    shortAnswer: "O(n - k) which simplifies to O(n) in worst case.",
    explanation: "All elements from index k + 1 to n - 1 must be shifted left by one position to fill the vacant slot.",
    hint: "Left shift from k to n - 1.",
    level: "basic"
  },
  {
    question: "What is the cache performance advantage of contiguous arrays over linked nodes?",
    shortAnswer: "Arrays offer superior spatial locality and high CPU cache hit rates.",
    explanation: "CPUs fetch memory into cache lines (typically 64 bytes). Reading arr[0] automatically prefetches subsequent elements into L1/L2 cache.",
    hint: "Contiguous RAM maximizes CPU cache line prefetching.",
    level: "advanced"
  },
  {
    question: "What is the maximum size of a static array that can be declared inside a function?",
    shortAnswer: "Limited by the stack size, typically 1MB to 8MB depending on OS and compiler settings.",
    explanation: "Declaring int arr[10000000] inside a function allocates ~40MB on the stack, instantly causing a stack overflow. Large arrays must be declared static, global, or on the heap via malloc().",
    hint: "Stack frames are small; huge arrays crash without heap or static allocation.",
    level: "intermediate"
  },
  {
    question: "How do you check if an array is a palindrome in C?",
    shortAnswer: "Compare elements from start and end moving inwards.",
    explanation: "Check if arr[i] == arr[n - 1 - i] for all i from 0 to n / 2. If any pair differs, it is not a palindrome.",
    hint: "Symmetric equality check from both ends.",
    level: "basic"
  },
  {
    question: "What does int *arr[5]; declare vs int (*arr)[5];?",
    shortAnswer: "int *arr[5] is an array of 5 pointers to int; int (*arr)[5] is a pointer to an array of 5 ints.",
    explanation: "Operator [] has higher precedence than *. In int *arr[5], arr is an array of pointers. Parentheses in (*arr)[5] force arr to be a pointer.",
    hint: "Array of pointers vs Pointer to array.",
    level: "advanced"
  },
  {
    question: "Why should array sizes in C usually be defined using symbolic constants (#define or enum)?",
    shortAnswer: "To prevent magic numbers and allow single-point maintenance of buffer capacities.",
    explanation: "Defining #define MAX_STUDENTS 50 ensures that loop limits and memory buffers update synchronously when capacity requirements change.",
    hint: "Avoid hardcoded numbers in code.",
    level: "basic",
    codeExample: "#define MAX_STUDENTS 60\nint marks[MAX_STUDENTS];"
  }
];

export default questions;
