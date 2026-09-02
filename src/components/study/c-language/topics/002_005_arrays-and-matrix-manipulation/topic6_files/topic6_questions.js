// 200 Comprehensive MCQs for Module 002_005: Arrays, Matrix Operations & Searching/Sorting
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  // 1-35: 1D Array Fundamentals, Declaration & Initialization
  {
    question: "What is an array in C?",
    options: [
      "A collection of elements of different data types stored randomly",
      "A collection of elements of the same data type stored in contiguous memory locations",
      "A dynamic data structure that expands automatically on the stack",
      "A pointer variable pointing to the CPU register"
    ],
    correctAnswer: 1,
    explanation: "An array in C is a contiguous sequence of elements of the exact same data type allocated in memory."
  },
  {
    question: "How are elements of an array indexed in C?",
    options: ["1 to N", "0 to N-1", "-1 to N-1", "0 to N"],
    correctAnswer: 1,
    explanation: "Array indexing in C is zero-based, spanning from index 0 to N-1, representing offset distances from base address."
  },
  {
    question: "What happens if an array is declared as `int arr[5] = {10, 20};`?",
    options: [
      "Compilation error due to missing elements",
      "arr[2], arr[3], and arr[4] hold garbage values",
      "arr[2], arr[3], and arr[4] are automatically initialized to 0",
      "The size of the array shrinks to 2"
    ],
    correctAnswer: 2,
    explanation: "In C, partial initialization guarantees that all remaining unspecified elements are initialized to zero."
  },
  {
    question: "What will `sizeof(arr)` evaluate to for `int arr[10];` on a 64-bit system where `sizeof(int) == 4`?",
    options: ["10 bytes", "40 bytes", "80 bytes", "8 bytes"],
    correctAnswer: 1,
    explanation: "10 elements * 4 bytes per integer = 40 bytes."
  },
  {
    question: "How do you calculate the number of elements in a static array `arr`?",
    options: [
      "arr.length",
      "sizeof(arr)",
      "sizeof(arr) / sizeof(arr[0])",
      "length(arr)"
    ],
    correctAnswer: 2,
    explanation: "Dividing the total bytes of the array by the byte size of a single element yields the total element count."
  },
  {
    question: "What happens if you access `arr[10]` on an array declared as `int arr[10];`?",
    options: [
      "Compiler throws ArrayIndexOutOfBoundsException",
      "Returns 0 automatically",
      "Undefined Behavior (UB) as C does not perform runtime bounds checking",
      "The array dynamically expands to 11 elements"
    ],
    correctAnswer: 2,
    explanation: "C has zero runtime array bounds checking; out-of-bounds access reads/writes adjacent unowned memory leading to UB."
  },
  {
    question: "Which of the following correctly zero-initializes an entire array of 100 integers?",
    options: [
      "int arr[100] = {0};",
      "int arr[100] = 0;",
      "int arr[100] = (0);",
      "int arr[100] = [0];"
    ],
    correctAnswer: 0,
    explanation: "`int arr[100] = {0};` initializes the first element to 0 and all subsequent 99 elements to 0."
  },
  {
    question: "What values do uninitialized local automatic array elements contain?",
    options: [
      "Zero (0)",
      "Null characters",
      "Indeterminate stack garbage values",
      "Compiler default constants"
    ],
    correctAnswer: 2,
    explanation: "Local variables on the stack are not zeroed by default and hold whatever bit patterns previously resided there."
  },
  {
    question: "What values do uninitialized static or global array elements contain?",
    options: [
      "Garbage values",
      "Zero (0) by default",
      "Random memory pointers",
      "-1"
    ],
    correctAnswer: 1,
    explanation: "Global and static variables are placed in the BSS segment and zero-initialized by the OS runtime loader."
  },
  {
    question: "Which of the following is an invalid array declaration in C?",
    options: [
      "int arr[5];",
      "int arr[] = {1, 2, 3};",
      "int arr[];",
      "int arr[2 + 3];"
    ],
    correctAnswer: 2,
    explanation: "An array declaration without explicit size and without an initializer list cannot determine memory size and is illegal."
  },
  {
    question: "What is the result of `int arr[] = {1, 2, 3, 4, 5}; sizeof(arr);`?",
    options: ["5 bytes", "20 bytes (assuming 4-byte int)", "4 bytes", "8 bytes"],
    correctAnswer: 1,
    explanation: "The compiler infers size 5 from the initializer list: 5 * 4 = 20 bytes."
  },
  {
    question: "What is designated initialization in C99?",
    options: [
      "Initializing elements by specifying their explicit indices like `int a[5] = {[2] = 9};`",
      "Naming an array using a pointer designator",
      "Allocating memory exclusively on the heap",
      "Designating array boundaries using keywords"
    ],
    correctAnswer: 0,
    explanation: "Designated initializers allow setting specific indices: `[index] = value`, with all unmentioned indices set to 0."
  },
  {
    question: "What is the output of this code?",
    options: ["10", "20", "30", "Garbage"],
    correctAnswer: 2,
    codeSnippet: "int arr[5] = {[2] = 30, [4] = 50};\nprintf(\"%d\", arr[2]);",
    explanation: "The designated initializer explicitly sets index 2 to 30."
  },
  {
    question: "What is the output of `int arr[5] = {[2] = 30}; printf(\"%d\", arr[0]);`?",
    options: ["30", "0", "Garbage", "Compilation error"],
    correctAnswer: 1,
    explanation: "Unspecified elements in an initialized array are guaranteed to be zero."
  },
  {
    question: "Can an array be directly assigned to another array using `arr1 = arr2;`?",
    options: [
      "Yes, it copies all elements",
      "No, array names are non-modifiable lvalues",
      "Yes, but only if they have equal size",
      "Yes, in C99 and later"
    ],
    correctAnswer: 1,
    explanation: "Array identifiers cannot be assigned. Use `memcpy()` or element-by-element loops."
  },
  {
    question: "What is the time complexity to access any element `arr[i]` in an array?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "Direct memory calculation `Base + i * sizeof(T)` takes O(1) constant time."
  },
  {
    question: "What is the memory address formula for the i-th element of a 1D array?",
    options: [
      "BaseAddress + i",
      "BaseAddress + (i * sizeof(DataType))",
      "BaseAddress * i",
      "BaseAddress + (sizeof(DataType) / i)"
    ],
    correctAnswer: 1,
    explanation: "Physical memory address offset scales by the element data type byte size."
  },
  {
    question: "Why does `2[arr]` compile and equal `arr[2]`?",
    options: [
      "It is a compiler bug",
      "Because `arr[2]` is evaluated as `*(arr + 2)`, which is commutative with `*(2 + arr)`",
      "Because the number 2 is converted into a pointer",
      "It is only valid in C++"
    ],
    correctAnswer: 1,
    explanation: "Array subscripting `E1[E2]` is defined strictly as `*((E1) + (E2))`. Addition is commutative."
  },
  {
    question: "What does the expression `*(arr + 3)` evaluate to?",
    options: [
      "The memory address of arr[3]",
      "The value stored at arr[3]",
      "arr[0] + 3",
      "An invalid pointer"
    ],
    correctAnswer: 1,
    explanation: "`*(arr + 3)` dereferences the address offset by 3 elements, yielding the value of `arr[3]`."
  },
  {
    question: "What is the output of `int a[3] = {10, 20, 30}; printf(\"%d\", *a + 2);`?",
    options: ["30", "12", "20", "Garbage"],
    correctAnswer: 1,
    explanation: "`*a` evaluates to `a[0]` (10). Adding 2 gives 10 + 2 = 12."
  },
  {
    question: "What is the output of `int a[3] = {10, 20, 30}; printf(\"%d\", *(a + 2));`?",
    options: ["12", "30", "20", "10"],
    correctAnswer: 1,
    explanation: "`*(a + 2)` dereferences index 2, which holds 30."
  },
  {
    question: "What is the relationship between `arr` and `&arr[0]` in most expressions?",
    options: [
      "They are completely different",
      "`arr` decays to `&arr[0]`",
      "`&arr[0]` is larger in size than `arr`",
      "`arr` is a double pointer"
    ],
    correctAnswer: 1,
    explanation: "In expressions, the array identifier automatically decays into a pointer to its first element."
  },
  {
    question: "What is the difference between `arr` and `&arr`?",
    options: [
      "Both have identical types",
      "Both have the same numeric address, but `arr` is of type `int*` while `&arr` is of type `int(*)[N]`",
      "`&arr` returns the address of the pointer variable",
      "`arr` points to the last element"
    ],
    correctAnswer: 1,
    explanation: "`arr` decays to pointer to single element; `&arr` is a pointer to the entire array block."
  },
  {
    question: "If `arr` is at address `0x1000` and `sizeof(int) == 4`, what is `(arr + 1)` and `(&arr + 1)` for `int arr[5]`?",
    options: [
      "`0x1004` and `0x1014`",
      "`0x1001` and `0x1005`",
      "`0x1004` and `0x1004`",
      "`0x1020` and `0x1004`"
    ],
    correctAnswer: 0,
    explanation: "`arr + 1` advances by 1 int (4 bytes -> 0x1004). `&arr + 1` advances by the whole 5-int array (20 bytes -> 0x1014)."
  },
  {
    question: "What is the time complexity to insert an element at the beginning of an unsorted 1D array of size N?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"],
    correctAnswer: 1,
    explanation: "All N existing elements must be shifted one position right to vacate index 0."
  },
  {
    question: "What is the time complexity to delete an element at index K from an array of size N?",
    options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
    correctAnswer: 1,
    explanation: "Elements from index K+1 to N-1 must be shifted left by one slot."
  },
  {
    question: "What is a Variable Length Array (VLA) introduced in C99?",
    options: [
      "An array whose size can change dynamically anytime during execution",
      "An array whose dimension is determined at runtime upon function entry and allocated on the stack",
      "An array allocated on the heap via malloc()",
      "An array of variable data types"
    ],
    correctAnswer: 1,
    explanation: "VLAs allow runtime integer expressions for stack array dimensions when declared inside a function."
  },
  {
    question: "Why can large VLAs be dangerous in production systems?",
    options: [
      "They run slower than heap allocations",
      "They can exceed stack limits and cause sudden Stack Overflow crashes with no allocation failure check",
      "They cannot be passed to functions",
      "They are deprecated in all C compilers"
    ],
    correctAnswer: 1,
    explanation: "VLAs allocate on the stack without return error codes if memory is exhausted, risking segmentation faults."
  },
  {
    question: "What is the minimum number of comparisons needed to find both the maximum and minimum in an array of size N?",
    options: ["2N", "3N/2 - 2", "N - 1", "N^2"],
    correctAnswer: 1,
    explanation: "By comparing elements in pairs, max and min can be found in 3N/2 comparisons."
  },
  {
    question: "How do you reverse an array in-place with O(1) auxiliary space?",
    options: [
      "Using two pointers swapping elements from start and end moving inwards",
      "Creating a temporary array of size N",
      "Using recursion without base cases",
      "Calling printf in reverse"
    ],
    correctAnswer: 0,
    explanation: "Swapping `arr[i]` and `arr[n - 1 - i]` for `i < n / 2` reverses the array in O(n) time and O(1) space."
  },
  {
    question: "What is the maximum size of an array in C?",
    options: [
      "Strictly 65,535 elements",
      "Limited by available memory and the `SIZE_MAX` limit of `size_t` on the architecture",
      "Always 1 MB",
      "2,147,483,647 elements on all systems"
    ],
    correctAnswer: 1,
    explanation: "The maximum object size is constrained by physical/virtual RAM and `SIZE_MAX` (the range of `size_t`)."
  },
  {
    question: "What will happen with `int a[5] = {1, 2, 3, 4, 5, 6};`?",
    options: [
      "Compiles with 6 discarded",
      "Compiler error / warning: excess elements in array initializer",
      "The array expands to size 6",
      "Only 6 is stored"
    ],
    correctAnswer: 1,
    explanation: "Providing more initializers than declared array capacity is a constraint violation."
  },
  {
    question: "What does `int *a[10];` declare?",
    options: [
      "A pointer to an array of 10 integers",
      "An array of 10 pointers to integers",
      "A dynamic array of 10 integers",
      "A 2D array of size 10x10"
    ],
    correctAnswer: 1,
    explanation: "Subscript `[]` binds tighter than `*`. Hence `a` is an array of 10 pointers to int."
  },
  {
    question: "What does `int (*a)[10];` declare?",
    options: [
      "An array of 10 pointers to int",
      "A pointer to an array of 10 integers",
      "A function returning a pointer",
      "A 10-element integer array"
    ],
    correctAnswer: 1,
    explanation: "Parentheses bind `*` to `a`, making `a` a pointer to an array of 10 integers."
  },
  {
    question: "Which header file defines `SIZE_MAX` and standard fixed-width types?",
    options: ["<stdio.h>", "<stdlib.h>", "<stdint.h>", "<string.h>"],
    correctAnswer: 2,
    explanation: "`<stdint.h>` defines exact-width integers and limit constants such as `SIZE_MAX`."
  },

  // 36-70: Passing Arrays to Functions & Pointer Decay
  {
    question: "What happens when an array is passed to a function in C?",
    options: [
      "The entire array is copied element-by-element onto the stack",
      "The array decays to a pointer to its first element",
      "The function creates a heap clone",
      "A reference object is created"
    ],
    correctAnswer: 1,
    explanation: "C passes the address of the first element (array decay), avoiding costly memory duplication."
  },
  {
    question: "Why does `sizeof(arr)` return 8 (on 64-bit) when evaluated inside a function receiving `int arr[]`?",
    options: [
      "The compiler is bugged",
      "Because `arr` is treated as a pointer variable (`int*`) inside the function",
      "Because the array shrunk",
      "Because 8 is the default array capacity"
    ],
    correctAnswer: 1,
    explanation: "Function parameter `int arr[]` is rewritten by the compiler as `int *arr`."
  },
  {
    question: "Which of the following function prototypes are equivalent in C?",
    options: [
      "`void f(int *a)` and `void f(int a[])`",
      "`void f(int a)` and `void f(int *a)`",
      "`void f(int a[10])` and `void f(int **a)`",
      "`void f(int a[])` and `void f(int a)`"
    ],
    correctAnswer: 0,
    explanation: "In parameter declarations, `int *a` and `int a[]` are exact synonyms."
  },
  {
    question: "How can you prevent a function from modifying elements of a passed array?",
    options: [
      "Use `const int arr[]` in the parameter list",
      "Use `static int arr[]`",
      "Pass array by value",
      "Use `final int arr[]`"
    ],
    correctAnswer: 0,
    explanation: "The `const` qualifier prevents writes through the pointer, generating compiler errors on modification."
  },
  {
    question: "What happens if a function modifies `arr[0]` when passed `int arr[]`?",
    options: [
      "Only the function's local copy is modified",
      "The caller's original array element is modified in-place",
      "A segmentation fault occurs",
      "The change is discarded upon return"
    ],
    correctAnswer: 1,
    explanation: "Because the base address points to caller memory, dereferencing modifies original caller memory directly."
  },
  {
    question: "Why must array size be passed as a separate parameter to functions in C?",
    options: [
      "Because C arrays do not store length metadata",
      "To satisfy the C preprocessor",
      "Because pointers can only hold numbers up to 10",
      "It is optional and not recommended"
    ],
    correctAnswer: 0,
    explanation: "Raw memory pointers have no built-in size field. The receiver cannot know bounds without an explicit size argument."
  },
  {
    question: "Can a C function return a locally declared stack array?",
    options: [
      "Yes, always",
      "No, returning a pointer to a local stack variable causes Undefined Behavior (Dangling Pointer)",
      "Yes, if declared with const",
      "Yes, in C17"
    ],
    correctAnswer: 1,
    explanation: "Local stack frames are destroyed when functions return. Pointers to local stack memory become dangling."
  },
  {
    question: "How can a function safely return an array of dynamically calculated integers?",
    options: [
      "Return local stack array",
      "Allocate memory on the heap with `malloc()` and return the heap pointer",
      "Return `sizeof(arr)`",
      "Use `return arr[5];`"
    ],
    correctAnswer: 1,
    explanation: "Heap memory allocated via `malloc()` persists until explicitly freed by the caller."
  },
  {
    question: "What is the syntax for passing a 2D array with 5 columns to a function?",
    options: [
      "`void f(int arr[][5], int rows)`",
      "`void f(int arr[][], int rows)`",
      "`void f(int arr[5][], int rows)`",
      "`void f(int **arr, int rows)`"
    ],
    correctAnswer: 0,
    explanation: "The column dimension must be specified so the compiler can calculate row stride offsets."
  },
  {
    question: "What is the C99 `static` keyword in array parameters: `void f(int arr[static 10])`?",
    options: [
      "The array becomes global",
      "Guarantees to the compiler that the passed pointer points to at least 10 valid elements",
      "Prevents modifying array elements",
      "Allocates array in static storage"
    ],
    correctAnswer: 1,
    explanation: "`[static N]` promises that the argument is non-null and points to at least N contiguous elements."
  },
  {
    question: "What is the time complexity of passing an array of 1,000,000 elements to a function?",
    options: ["O(1,000,000)", "O(1) constant time", "O(log N)", "O(N)"],
    correctAnswer: 1,
    explanation: "Only the 8-byte pointer address is passed, taking O(1) time regardless of array length."
  },
  {
    question: "How do you pass a subarray starting from index 3 of length 4 to `void print(int *a, int n)`?",
    options: [
      "`print(&arr[3], 4);` or `print(arr + 3, 4);`",
      "`print(arr[3], 4);`",
      "`print(arr, 3, 4);`",
      "`print(*arr + 3, 4);`"
    ],
    correctAnswer: 0,
    explanation: "Passing `&arr[3]` (or `arr + 3`) gives the function a base address starting at element 3."
  },
  {
    question: "What does `const int *arr` mean in a function parameter?",
    options: [
      "The pointer is constant and cannot change address",
      "The integer elements pointed to are constant and read-only",
      "Both pointer and data are constant",
      "The array is allocated in ROM"
    ],
    correctAnswer: 1,
    explanation: "`const int*` defines pointer to const data (elements cannot be written through this pointer)."
  },
  {
    question: "What does `int * const arr` mean in a function parameter?",
    options: [
      "The elements are constant",
      "The pointer variable itself is constant and cannot point to another address",
      "The array cannot be indexed",
      "It is invalid syntax"
    ],
    correctAnswer: 1,
    explanation: "`* const` declares a constant pointer (the address held cannot be changed)."
  },
  {
    question: "What is the effect of passing `void f(int arr[100])` when passing an array of size 5?",
    options: [
      "Compile error: size mismatch",
      "Compiles fine because the dimension 100 is ignored by the compiler",
      "Runtime crash immediately",
      "Memory expands to 100 automatically"
    ],
    correctAnswer: 1,
    explanation: "Array dimensions inside parameter brackets are discarded by the compiler and treated as `int*`."
  },
  {
    question: "Which of the following creates an array of 5 function pointers?",
    options: [
      "`void (*funcArr[5])(int);`",
      "`void *funcArr[5](int);`",
      "`void (*funcArr)(int)[5];`",
      "`void funcArr[5](int*);`"
    ],
    correctAnswer: 0,
    explanation: "`void (*funcArr[5])(int);` declares an array of 5 pointers to functions taking int and returning void."
  },
  {
    question: "What happens if a function tries to write to a `const int arr[]` parameter?",
    options: [
      "Compilation error: assignment of read-only location",
      "Runtime warning",
      "Silent ignore",
      "Value is written anyway"
    ],
    correctAnswer: 0,
    explanation: "The compiler rejects attempts to modify read-only const-qualified pointees."
  },
  {
    question: "How can a caller receive multiple computed outputs from an array processing function?",
    options: [
      "Return multiple values separated by commas",
      "Pass output variables as pointers (`int *max`, `int *min`)",
      "Use `return [a, b];`",
      "Not possible in C"
    ],
    correctAnswer: 1,
    explanation: "Passing pointers to destination variables allows the callee to write results back to the caller."
  },
  {
    question: "What is an in-place array algorithm?",
    options: [
      "An algorithm that modifies input in its original memory with O(1) auxiliary space",
      "An algorithm that runs on hard drives",
      "An algorithm that cannot use variables",
      "An algorithm with O(n) memory"
    ],
    correctAnswer: 0,
    explanation: "In-place algorithms transform array data without allocating secondary arrays of size N."
  },
  {
    question: "What is the memory overhead of passing an array to a function on a 64-bit architecture?",
    options: ["0 bytes", "8 bytes (one pointer address)", "4 bytes", "Equal to array size"],
    correctAnswer: 1,
    explanation: "Passing an array pushes an 8-byte pointer address onto CPU registers / stack."
  },

  // 71-100: Searching Algorithms (Linear & Binary Search)
  {
    question: "What is the time complexity of Linear Search in the worst case?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "In the worst case (element at last index or absent), all n elements are inspected."
  },
  {
    question: "What is the prerequisite for executing Binary Search on an array?",
    options: [
      "Array must be dynamically allocated",
      "Array must be sorted in order",
      "Array size must be a power of 2",
      "Array elements must be all positive"
    ],
    correctAnswer: 1,
    explanation: "Binary search requires sorted elements to determine whether to search left or right."
  },
  {
    question: "What is the time complexity of Binary Search in the worst case?",
    options: ["O(n)", "O(log2 n)", "O(n log n)", "O(1)"],
    correctAnswer: 1,
    explanation: "Each comparison halves the search space, yielding O(log2 n) time complexity."
  },
  {
    question: "Why is `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2`?",
    options: [
      "It is faster to execute",
      "It avoids integer overflow when `low + high` exceeds `INT_MAX`",
      "It produces floating point midpoints",
      "It is required by C99 standard"
    ],
    correctAnswer: 1,
    explanation: "When `low` and `high` are large positive integers, `(low + high)` can overflow to negative."
  },
  {
    question: "How many maximum comparisons does Binary Search need for an array of 1,000,000 elements?",
    options: ["1,000,000", "500,000", "20", "1,000"],
    correctAnswer: 2,
    explanation: "ceil(log2(1,000,000)) = 20 comparisons."
  },
  {
    question: "What does Binary Search return conventionally when an element is not found?",
    options: ["0", "NULL", "-1", "INT_MAX"],
    correctAnswer: 2,
    explanation: "-1 is returned because it is an invalid array index, unambiguously signaling failure."
  },
  {
    question: "What is the best-case time complexity of Binary Search?",
    options: ["O(log n)", "O(1)", "O(n)", "O(0)"],
    correctAnswer: 1,
    explanation: "When the target happens to be the exact middle element on the very first comparison, time is O(1)."
  },
  {
    question: "What is the space complexity of iterative Binary Search?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "Iterative binary search uses only a few index variables (`low`, `high`, `mid`), taking O(1) space."
  },
  {
    question: "What is the auxiliary space complexity of recursive Binary Search?",
    options: ["O(1)", "O(log n) stack frames", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "Each recursive call consumes a stack frame, resulting in O(log n) call stack space."
  },
  {
    question: "Which standard library function in `<stdlib.h>` performs Binary Search?",
    options: ["binsearch()", "bsearch()", "search()", "find()"],
    correctAnswer: 1,
    explanation: "`bsearch()` is the standard C library binary search utility."
  },
  {
    question: "What happens if Binary Search is executed on an unsorted array?",
    options: [
      "Compiler error",
      "It automatically sorts the array first",
      "It produces incorrect or false negative results",
      "Segmentation fault"
    ],
    correctAnswer: 2,
    explanation: "Binary search will eliminate correct halves erroneously if the sorted invariant is violated."
  },
  {
    question: "What is Sentinel Linear Search?",
    options: [
      "Placing target at the end of array to eliminate the loop index boundary check",
      "Searching using two threads",
      "Binary search on unsorted arrays",
      "Searching in reverse"
    ],
    correctAnswer: 0,
    explanation: "Placing the target at `arr[n-1]` removes `i < n` from the loop condition, saving comparisons."
  },
  {
    question: "When is Linear Search faster than Binary Search in practice?",
    options: [
      "For small arrays (N < 16) that fit entirely within a single CPU cache line",
      "For arrays of size > 1,000,000",
      "When the array is sorted",
      "Never"
    ],
    correctAnswer: 0,
    explanation: "For tiny arrays, simple linear sequential memory prefetching outperforms branching overhead."
  },
  {
    question: "How do you find the first occurrence of a duplicate key in Binary Search?",
    options: [
      "When matched, set `high = mid - 1` and record `mid`",
      "When matched, stop immediately",
      "Set `low = mid + 1`",
      "Use Linear search only"
    ],
    correctAnswer: 0,
    explanation: "Continuing to search left (`high = mid - 1`) finds the lowest (first) matching index."
  },
  {
    question: "How do you find the last occurrence of a duplicate key in Binary Search?",
    options: [
      "When matched, set `low = mid + 1` and record `mid`",
      "When matched, set `high = mid - 1`",
      "Stop immediately",
      "Restart from 0"
    ],
    correctAnswer: 0,
    explanation: "Continuing to search right (`low = mid + 1`) finds the highest (last) matching index."
  },

  // 101-140: Sorting Algorithms (Bubble, Selection, Insertion)
  {
    question: "What is the worst-case time complexity of Bubble Sort?",
    options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"],
    correctAnswer: 2,
    explanation: "Bubble sort requires n(n-1)/2 comparisons in the worst case, giving O(n^2)."
  },
  {
    question: "How can Bubble Sort be optimized to achieve O(n) best-case time complexity?",
    options: [
      "By using a `swapped` boolean flag to break if no swaps occur in a pass",
      "By using recursion",
      "By sorting in reverse",
      "By doubling the step size"
    ],
    correctAnswer: 0,
    explanation: "If no elements are swapped during a pass, the array is already sorted and we can exit early."
  },
  {
    question: "How does Selection Sort work?",
    options: [
      "Repeatedly finds the minimum element in the unsorted subarray and swaps it to the front",
      "Compares adjacent elements and swaps them",
      "Shifts elements right like playing cards",
      "Splits array into halves"
    ],
    correctAnswer: 0,
    explanation: "Selection sort selects the minimum unsorted item and places it at index i on each pass."
  },
  {
    question: "What is the best-case time complexity of Selection Sort?",
    options: ["O(n)", "O(n^2)", "O(n log n)", "O(1)"],
    correctAnswer: 1,
    explanation: "Selection sort always scans the entire remaining subarray to find minimum, running in O(n^2) even on sorted input."
  },
  {
    question: "How many total swaps does Selection Sort perform on an array of size N in worst case?",
    options: ["O(n^2)", "At most N - 1 swaps", "0 swaps", "N^2 / 2"],
    correctAnswer: 1,
    explanation: "Selection sort performs at most 1 swap per outer loop pass (at most N - 1 swaps total)."
  },
  {
    question: "How does Insertion Sort work?",
    options: [
      "Builds the sorted array by taking one element at a time and shifting larger elements to insert it",
      "Finds the global maximum",
      "Swaps adjacent elements continuously",
      "Divides the array recursively"
    ],
    correctAnswer: 0,
    explanation: "Insertion sort behaves like sorting a hand of playing cards by inserting each item into its sorted place."
  },
  {
    question: "What is the best-case time complexity of Insertion Sort?",
    options: ["O(n^2)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "On an already sorted array, each element compares once and does not shift, running in O(n) time."
  },
  {
    question: "What is a Stable Sorting Algorithm?",
    options: [
      "An algorithm that never crashes",
      "An algorithm that preserves the relative order of elements with equal keys",
      "An algorithm with O(1) space",
      "An algorithm that sorts in O(n log n)"
    ],
    correctAnswer: 1,
    explanation: "Stability means identical keys appear in the output in the same relative order as the input."
  },
  {
    question: "Which of the following sorting algorithms is UNSTABLE by default?",
    options: ["Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"],
    correctAnswer: 2,
    explanation: "Selection sort can swap an element across duplicate keys, violating stability."
  },
  {
    question: "What is the auxiliary space complexity of Bubble, Selection, and Insertion Sort?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    correctAnswer: 2,
    explanation: "All three are in-place algorithms requiring only O(1) temporary swap memory."
  },
  {
    question: "Why is Insertion Sort often used in hybrid algorithms like Timsort for small subarrays?",
    options: [
      "It has very low constant factor overhead and is adaptive O(n) on partially sorted data",
      "It is the only stable sort",
      "It uses O(0) memory",
      "It is faster than Quick Sort on all inputs"
    ],
    correctAnswer: 0,
    explanation: "Minimal overhead and adaptive linear behavior make Insertion Sort ideal for small partitions."
  },
  {
    question: "What is the worst-case input configuration for Insertion Sort?",
    options: [
      "Already sorted array in ascending order",
      "Array sorted in reverse (descending) order",
      "Array with all identical elements",
      "Random array"
    ],
    correctAnswer: 1,
    explanation: "In reverse order, every element must shift past all previously sorted elements."
  },
  {
    question: "What is the standard C library sorting function?",
    options: ["sort()", "qsort()", "quicksort()", "arraysort()"],
    correctAnswer: 1,
    explanation: "`qsort()` from `<stdlib.h>` is the standard polymorphic sorting routine in C."
  },
  {
    question: "What is the signature of the comparator function required by `qsort()`?",
    options: [
      "`int (*cmp)(const void *, const void *)`",
      "`int (*cmp)(int, int)`",
      "`void (*cmp)(void *, void *)`",
      "`bool (*cmp)(const int *, const int *)`"
    ],
    correctAnswer: 0,
    explanation: "`qsort` expects a comparator accepting two `const void*` and returning negative, zero, or positive int."
  },
  {
    question: "In `qsort()`, what does returning a negative value from comparator `cmp(a, b)` indicate?",
    options: [
      "`a` should come before `b` in sorted order",
      "`b` should come before `a`",
      "`a` and `b` are equal",
      "An error occurred"
    ],
    correctAnswer: 0,
    explanation: "A negative return value instructs `qsort` to place element `a` before element `b`."
  },

  // 141-175: 2D Arrays, Row-Major Layout & Memory Mapping
  {
    question: "How are multi-dimensional arrays laid out in physical memory in C?",
    options: [
      "Column-major order",
      "Row-major order in contiguous linear RAM",
      "Fragmented blocks linked by pointers",
      "Hash table buckets"
    ],
    correctAnswer: 1,
    explanation: "C stores multi-dimensional arrays in Row-Major order (row 0, then row 1, then row 2...)."
  },
  {
    question: "What is the address formula for element `matrix[i][j]` in row-major order with dimensions `ROWS x COLS`?",
    options: [
      "`BaseAddress + ((i * COLS) + j) * sizeof(Type)`",
      "`BaseAddress + ((j * ROWS) + i) * sizeof(Type)`",
      "`BaseAddress + (i + j) * sizeof(Type)`",
      "`BaseAddress + (i * j) * sizeof(Type)`"
    ],
    correctAnswer: 0,
    explanation: "Skipping `i` full rows requires `i * COLS` elements, plus `j` column steps, scaled by type size."
  },
  {
    question: "What is the total byte size of `int m[3][4];` on a system with 4-byte integers?",
    options: ["12 bytes", "48 bytes", "24 bytes", "64 bytes"],
    correctAnswer: 1,
    explanation: "3 rows * 4 columns = 12 elements * 4 bytes = 48 bytes."
  },
  {
    question: "What is the pointer dereference equivalence of `matrix[i][j]`?",
    options: [
      "`*(*(matrix + i) + j)`",
      "`*(matrix + i + j)`",
      "`**matrix + i + j`",
      "`*(matrix[i] + j*COLS)`"
    ],
    correctAnswer: 0,
    explanation: "`*(matrix + i)` points to row i; adding `j` offsets to column j; outer `*` dereferences value."
  },
  {
    question: "Why is row-by-row matrix traversal faster than column-by-column traversal in C?",
    options: [
      "Row traversal accesses consecutive memory addresses, maximizing CPU cache line hits",
      "The C compiler refuses column loops",
      "Column traversal uses division",
      "Row traversal runs in parallel"
    ],
    correctAnswer: 0,
    explanation: "Sequential row reads utilize hardware cache prefetching; jumping column-by-column causes cache thrashing."
  },
  {
    question: "What is the condition for multiplying two matrices A (r1 x c1) and B (r2 x c2)?",
    options: [
      "`r1 == r2` and `c1 == c2`",
      "`c1 == r2` (columns of A must equal rows of B)",
      "`r1 == c2`",
      "`r1 * c1 == r2 * c2`"
    ],
    correctAnswer: 1,
    explanation: "Matrix multiplication requires the inner dimensions to match: `A(r1 x c1) * B(c1 x c2) = C(r1 x c2)`."
  },
  {
    question: "What is the time complexity of multiplying two N x N matrices using the standard triple loop?",
    options: ["O(N^2)", "O(N^3)", "O(N log N)", "O(2^N)"],
    correctAnswer: 1,
    explanation: "Triple nested loops (i, j, k) iterating from 0 to N perform N^3 scalar multiplications."
  },
  {
    question: "What is the transpose of an M x N matrix?",
    options: [
      "An N x M matrix where rows and columns are swapped (`T[j][i] = A[i][j]`)",
      "A matrix inverted by multiplying by -1",
      "An M x N matrix with negated diagonal",
      "A zero matrix"
    ],
    correctAnswer: 0,
    explanation: "Transposition interchanges rows and columns: element at (i, j) moves to (j, i)."
  },
  {
    question: "What is a Symmetric Matrix?",
    options: [
      "A matrix where all elements are positive",
      "A square matrix equal to its transpose (`A[i][j] == A[j][i]`)",
      "A matrix with equal number of 1s and 0s",
      "A diagonal matrix with only zeros"
    ],
    correctAnswer: 1,
    explanation: "A symmetric matrix is a square matrix that remains identical when reflected across its main diagonal."
  },
  {
    question: "What is the trace of a square matrix?",
    options: [
      "The determinant of the matrix",
      "The sum of elements along the main diagonal (`A[i][i]`)",
      "The product of all elements",
      "The total number of non-zero elements"
    ],
    correctAnswer: 1,
    explanation: "The trace is the sum of main diagonal elements: sum of `A[i][i]` for all i."
  },

  // 176-200: Advanced Matrix & Array Edge Cases
  {
    question: "What is an Identity Matrix of order N?",
    options: [
      "A matrix where all elements are 1",
      "A square matrix with 1s on main diagonal and 0s elsewhere",
      "A matrix equal to its inverse",
      "A matrix with all diagonal elements equal to 0"
    ],
    correctAnswer: 1,
    explanation: "An identity matrix has `I[i][i] = 1` and `I[i][j] = 0` for `i != j`."
  },
  {
    question: "What is a Sparse Matrix?",
    options: [
      "A matrix with very few rows",
      "A matrix populated predominantly with zero elements",
      "A matrix with floating point values",
      "An uninitialized matrix"
    ],
    correctAnswer: 1,
    explanation: "A sparse matrix has mostly zeros; stored in 3-tuple (row, col, value) format to save RAM."
  },
  {
    question: "What is a Saddle Point in a 2D matrix?",
    options: [
      "The center element of the matrix",
      "An element that is minimum in its row and maximum in its column",
      "An element equal to zero",
      "The maximum element of the matrix"
    ],
    correctAnswer: 1,
    explanation: "A saddle point is a minimax point: lowest value in its row and highest in its column."
  },
  {
    question: "How do you rotate a square matrix by 90 degrees clockwise in-place?",
    options: [
      "Transpose the matrix, then reverse each individual row",
      "Reverse rows, then transpose",
      "Invert the matrix values",
      "Swap top row with bottom row only"
    ],
    correctAnswer: 0,
    explanation: "Step 1: Transpose `A[i][j] <-> A[j][i]`. Step 2: Reverse each row `A[i][0..N-1]`."
  },
  {
    question: "What is the output of `int m[2][2] = {{1, 2}, {3, 4}}; printf(\"%d\", *(*m + 3));`?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 3,
    explanation: "`*m` points to the start of contiguous memory. Offset +3 dereferences the 4th element (4)."
  },
  {
    question: "What is the condition for two matrices A and B to be added?",
    options: [
      "Both must be square matrices",
      "Both must have identical dimensions (same rows and same columns)",
      "Columns of A must equal rows of B",
      "Both must be non-zero"
    ],
    correctAnswer: 1,
    explanation: "Matrix addition is element-wise: `C[i][j] = A[i][j] + B[i][j]`, requiring equal dimensions."
  },
  {
    question: "What is the determinant of a 2x2 matrix `[[a, b], [c, d]]`?",
    options: ["ad + bc", "ad - bc", "ab - cd", "a + d - b - c"],
    correctAnswer: 1,
    explanation: "`det = (a * d) - (b * c)`."
  },
  {
    question: "What does `int arr[2][3][4];` declare?",
    options: [
      "A 3D array of 24 integers (2 * 3 * 4)",
      "An array of 9 integers",
      "A 2D array with 24 pointers",
      "A jagged array"
    ],
    correctAnswer: 0,
    explanation: "A 3D tensor containing 2 * 3 * 4 = 24 contiguous integer elements."
  },
  {
    question: "What will `int a[3][3] = {0};` initialize?",
    options: [
      "Only a[0][0] to 0",
      "All 9 elements of the 3x3 matrix to 0",
      "Only the main diagonal to 0",
      "Nothing (contains garbage)"
    ],
    correctAnswer: 1,
    explanation: "Zero-initialization of the first element guarantees all remaining 8 elements are zeroed."
  },
  {
    question: "Which of the following creates a dynamic 2D array of integers on the heap in C?",
    options: [
      "`int **arr = malloc(r * sizeof(int*)); for(i) arr[i] = malloc(c * sizeof(int));`",
      "`int arr = malloc(r, c);`",
      "`int arr[r][c] = malloc();`",
      "`int **arr = malloc(r * c);`"
    ],
    correctAnswer: 0,
    explanation: "Allocating an array of row pointers, then allocating column buffers per row creates a dynamic 2D grid."
  },
  {
    question: "What tool should you use to catch array out-of-bounds errors during compilation and testing?",
    options: [
      "AddressSanitizer via `-fsanitize=address` with GCC/Clang",
      "Disassembler",
      "Text editor syntax highlighter",
      "printf only"
    ],
    correctAnswer: 0,
    explanation: "AddressSanitizer instruments memory operations to catch buffer overflows at runtime."
  },
  {
    question: "What is a Jagged Array?",
    options: [
      "An array of arrays where individual rows have different lengths",
      "A 3D matrix",
      "A corrupted array",
      "A sorted array"
    ],
    correctAnswer: 0,
    explanation: "A jagged array is an array of pointers where each sub-array can have varying length."
  },
  {
    question: "In C, can the dimension of a global array be determined by a variable at runtime?",
    options: [
      "Yes, in C99",
      "No, file-scope global array dimensions must be compile-time integer constant expressions",
      "Yes, with static keyword",
      "Yes, if initialized"
    ],
    correctAnswer: 1,
    explanation: "VLAs are only allowed at block (local) scope, never at global/file scope."
  },
  {
    question: "What is the time complexity of finding the transpose of an M x N matrix?",
    options: ["O(M * N)", "O(M + N)", "O(M^2)", "O(1)"],
    correctAnswer: 0,
    explanation: "Every element in the M x N grid must be copied to its transposed position, taking O(M * N) time."
  },
  {
    question: "What is Strassen's algorithm for matrix multiplication?",
    options: [
      "A divide-and-conquer algorithm running in O(N^2.81) time",
      "A linear time algorithm",
      "An O(N!) algorithm",
      "A hardware GPU instruction"
    ],
    correctAnswer: 0,
    explanation: "Strassen's algorithm reduces 8 recursive multiplications to 7, achieving O(N^2.807) asymptotic complexity."
  }
];

export default questions;
