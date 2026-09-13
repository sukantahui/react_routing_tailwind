// 200 Comprehensive MCQs for Module 002_005: Arrays, Matrix Operations & Searching/Sorting
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    "question": "What is an array in C?",
    "options": [
      "A collection of elements of different data types stored randomly",
      "A collection of elements of the same data type stored in contiguous memory locations",
      "A dynamic data structure that expands automatically on the stack",
      "A pointer variable pointing to the CPU register"
    ],
    "answerIndex": 1,
    "explanation": "An array in C is a contiguous sequence of elements of the exact same data type allocated in memory."
  },
  {
    "question": "How are elements of an array indexed in C?",
    "options": [
      "1 to N",
      "0 to N-1",
      "-1 to N-1",
      "0 to N"
    ],
    "answerIndex": 1,
    "explanation": "Array indexing in C is zero-based, spanning from index 0 to N-1, representing offset distances from base address."
  },
  {
    "question": "What happens if an array is declared as `int arr[5] = {10, 20};`?",
    "options": [
      "Compilation error due to missing elements",
      "arr[2], arr[3], and arr[4] hold garbage values",
      "arr[2], arr[3], and arr[4] are automatically initialized to 0",
      "The size of the array shrinks to 2"
    ],
    "answerIndex": 2,
    "explanation": "In C, partial initialization guarantees that all remaining unspecified elements are initialized to zero."
  },
  {
    "question": "What will `sizeof(arr)` evaluate to for `int arr[10];` on a 64-bit system where `sizeof(int) == 4`?",
    "options": [
      "10 bytes",
      "40 bytes",
      "80 bytes",
      "8 bytes"
    ],
    "answerIndex": 1,
    "explanation": "10 elements * 4 bytes per integer = 40 bytes."
  },
  {
    "question": "How do you calculate the number of elements in a static array `arr`?",
    "options": [
      "arr.length",
      "sizeof(arr)",
      "sizeof(arr) / sizeof(arr[0])",
      "length(arr)"
    ],
    "answerIndex": 2,
    "explanation": "Dividing the total bytes of the array by the byte size of a single element yields the total element count."
  },
  {
    "question": "What happens if you access `arr[10]` on an array declared as `int arr[10];`?",
    "options": [
      "Compiler throws ArrayIndexOutOfBoundsException",
      "Returns 0 automatically",
      "Undefined Behavior (UB) as C does not perform runtime bounds checking",
      "The array dynamically expands to 11 elements"
    ],
    "answerIndex": 2,
    "explanation": "C has zero runtime array bounds checking; out-of-bounds access reads/writes adjacent unowned memory leading to UB."
  },
  {
    "question": "Which of the following correctly zero-initializes an entire array of 100 integers?",
    "options": [
      "int arr[100] = {0};",
      "int arr[100] = 0;",
      "int arr[100] = (0);",
      "int arr[100] = [0];"
    ],
    "answerIndex": 0,
    "explanation": "`int arr[100] = {0};` initializes the first element to 0 and all subsequent 99 elements to 0."
  },
  {
    "question": "What values do uninitialized local automatic array elements contain?",
    "options": [
      "Zero (0)",
      "Null characters",
      "Indeterminate stack garbage values",
      "Compiler default constants"
    ],
    "answerIndex": 2,
    "explanation": "Local variables on the stack are not zeroed by default and hold whatever bit patterns previously resided there."
  },
  {
    "question": "What values do uninitialized static or global array elements contain?",
    "options": [
      "Garbage values",
      "Zero (0) by default",
      "Random memory pointers",
      "-1"
    ],
    "answerIndex": 1,
    "explanation": "Global and static variables are placed in the BSS segment and zero-initialized by the OS runtime loader."
  },
  {
    "question": "Which of the following is an invalid array declaration in C?",
    "options": [
      "int arr[5];",
      "int arr[] = {1, 2, 3};",
      "int arr[];",
      "int arr[2 + 3];"
    ],
    "answerIndex": 2,
    "explanation": "An array declaration without explicit size and without an initializer list cannot determine memory size and is illegal."
  },
  {
    "question": "What is the result of `int arr[] = {1, 2, 3, 4, 5}; sizeof(arr);`?",
    "options": [
      "5 bytes",
      "20 bytes (assuming 4-byte int)",
      "4 bytes",
      "8 bytes"
    ],
    "answerIndex": 1,
    "explanation": "The compiler infers size 5 from the initializer list: 5 * 4 = 20 bytes."
  },
  {
    "question": "What is designated initialization in C99?",
    "options": [
      "Initializing elements by specifying their explicit indices like `int a[5] = {[2] = 9};`",
      "Naming an array using a pointer designator",
      "Allocating memory exclusively on the heap",
      "Designating array boundaries using keywords"
    ],
    "answerIndex": 0,
    "explanation": "Designated initializers allow setting specific indices: `[index] = value`, with all unmentioned indices set to 0."
  },
  {
    "question": "What is the output of this code?",
    "options": [
      "10",
      "20",
      "30",
      "Garbage"
    ],
    "answerIndex": 2,
    "explanation": "The designated initializer explicitly sets index 2 to 30."
  },
  {
    "question": "What is the output of `int arr[5] = {[2] = 30}; printf(\"%d\", arr[0]);`?",
    "options": [
      "30",
      "0",
      "Garbage",
      "Compilation error"
    ],
    "answerIndex": 1,
    "explanation": "Unspecified elements in an initialized array are guaranteed to be zero."
  },
  {
    "question": "Can an array be directly assigned to another array using `arr1 = arr2;`?",
    "options": [
      "Yes, it copies all elements",
      "No, array names are non-modifiable lvalues",
      "Yes, but only if they have equal size",
      "Yes, in C99 and later"
    ],
    "answerIndex": 1,
    "explanation": "Array identifiers cannot be assigned. Use `memcpy()` or element-by-element loops."
  },
  {
    "question": "What is the time complexity to access any element `arr[i]` in an array?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    "answerIndex": 2,
    "explanation": "Direct memory calculation `Base + i * sizeof(T)` takes O(1) constant time."
  },
  {
    "question": "What is the memory address formula for the i-th element of a 1D array?",
    "options": [
      "BaseAddress + i",
      "BaseAddress + (i * sizeof(DataType))",
      "BaseAddress * i",
      "BaseAddress + (sizeof(DataType) / i)"
    ],
    "answerIndex": 1,
    "explanation": "Physical memory address offset scales by the element data type byte size."
  },
  {
    "question": "Why does `2[arr]` compile and equal `arr[2]`?",
    "options": [
      "It is a compiler bug",
      "Because `arr[2]` is evaluated as `*(arr + 2)`, which is commutative with `*(2 + arr)`",
      "Because the number 2 is converted into a pointer",
      "It is only valid in C++"
    ],
    "answerIndex": 1,
    "explanation": "Array subscripting `E1[E2]` is defined strictly as `*((E1) + (E2))`. Addition is commutative."
  },
  {
    "question": "What does the expression `*(arr + 3)` evaluate to?",
    "options": [
      "The memory address of arr[3]",
      "The value stored at arr[3]",
      "arr[0] + 3",
      "An invalid pointer"
    ],
    "answerIndex": 1,
    "explanation": "`*(arr + 3)` dereferences the address offset by 3 elements, yielding the value of `arr[3]`."
  },
  {
    "question": "What is the output of `int a[3] = {10, 20, 30}; printf(\"%d\", *a + 2);`?",
    "options": [
      "30",
      "12",
      "20",
      "Garbage"
    ],
    "answerIndex": 1,
    "explanation": "`*a` evaluates to `a[0]` (10). Adding 2 gives 10 + 2 = 12."
  },
  {
    "question": "What is the output of `int a[3] = {10, 20, 30}; printf(\"%d\", *(a + 2));`?",
    "options": [
      "12",
      "30",
      "20",
      "10"
    ],
    "answerIndex": 1,
    "explanation": "`*(a + 2)` dereferences index 2, which holds 30."
  },
  {
    "question": "What is the relationship between `arr` and `&arr[0]` in most expressions?",
    "options": [
      "They are completely different",
      "`arr` decays to `&arr[0]`",
      "`&arr[0]` is larger in size than `arr`",
      "`arr` is a double pointer"
    ],
    "answerIndex": 1,
    "explanation": "In expressions, the array identifier automatically decays into a pointer to its first element."
  },
  {
    "question": "What is the difference between `arr` and `&arr`?",
    "options": [
      "Both have identical types",
      "Both have the same numeric address, but `arr` is of type `int*` while `&arr` is of type `int(*)[N]`",
      "`&arr` returns the address of the pointer variable",
      "`arr` points to the last element"
    ],
    "answerIndex": 1,
    "explanation": "`arr` decays to pointer to single element; `&arr` is a pointer to the entire array block."
  },
  {
    "question": "If `arr` is at address `0x1000` and `sizeof(int) == 4`, what is `(arr + 1)` and `(&arr + 1)` for `int arr[5]`?",
    "options": [
      "`0x1004` and `0x1014`",
      "`0x1001` and `0x1005`",
      "`0x1004` and `0x1004`",
      "`0x1020` and `0x1004`"
    ],
    "answerIndex": 0,
    "explanation": "`arr + 1` advances by 1 int (4 bytes -> 0x1004). `&arr + 1` advances by the whole 5-int array (20 bytes -> 0x1014)."
  },
  {
    "question": "What is the time complexity to insert an element at the beginning of an unsorted 1D array of size N?",
    "options": [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    "answerIndex": 1,
    "explanation": "All N existing elements must be shifted one position right to vacate index 0."
  },
  {
    "question": "What is the time complexity to delete an element at index K from an array of size N?",
    "options": [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N log N)"
    ],
    "answerIndex": 1,
    "explanation": "Elements from index K+1 to N-1 must be shifted left by one slot."
  },
  {
    "question": "What is a Variable Length Array (VLA) introduced in C99?",
    "options": [
      "An array whose size can change dynamically anytime during execution",
      "An array whose dimension is determined at runtime upon function entry and allocated on the stack",
      "An array allocated on the heap via malloc()",
      "An array of variable data types"
    ],
    "answerIndex": 1,
    "explanation": "VLAs allow runtime integer expressions for stack array dimensions when declared inside a function."
  },
  {
    "question": "Why can large VLAs be dangerous in production systems?",
    "options": [
      "They run slower than heap allocations",
      "They can exceed stack limits and cause sudden Stack Overflow crashes with no allocation failure check",
      "They cannot be passed to functions",
      "They are deprecated in all C compilers"
    ],
    "answerIndex": 1,
    "explanation": "VLAs allocate on the stack without return error codes if memory is exhausted, risking segmentation faults."
  },
  {
    "question": "What is the minimum number of comparisons needed to find both the maximum and minimum in an array of size N?",
    "options": [
      "2N",
      "3N/2 - 2",
      "N - 1",
      "N^2"
    ],
    "answerIndex": 1,
    "explanation": "By comparing elements in pairs, max and min can be found in 3N/2 comparisons."
  },
  {
    "question": "How do you reverse an array in-place with O(1) auxiliary space?",
    "options": [
      "Using two pointers swapping elements from start and end moving inwards",
      "Creating a temporary array of size N",
      "Using recursion without base cases",
      "Calling printf in reverse"
    ],
    "answerIndex": 0,
    "explanation": "Swapping `arr[i]` and `arr[n - 1 - i]` for `i < n / 2` reverses the array in O(n) time and O(1) space."
  },
  {
    "question": "What is the maximum size of an array in C?",
    "options": [
      "Strictly 65,535 elements",
      "Limited by available memory and the `SIZE_MAX` limit of `size_t` on the architecture",
      "Always 1 MB",
      "2,147,483,647 elements on all systems"
    ],
    "answerIndex": 1,
    "explanation": "The maximum object size is constrained by physical/virtual RAM and `SIZE_MAX` (the range of `size_t`)."
  },
  {
    "question": "What will happen with `int a[5] = {1, 2, 3, 4, 5, 6};`?",
    "options": [
      "Compiles with 6 discarded",
      "Compiler error / warning: excess elements in array initializer",
      "The array expands to size 6",
      "Only 6 is stored"
    ],
    "answerIndex": 1,
    "explanation": "Providing more initializers than declared array capacity is a constraint violation."
  },
  {
    "question": "What does `int *a[10];` declare?",
    "options": [
      "A pointer to an array of 10 integers",
      "An array of 10 pointers to integers",
      "A dynamic array of 10 integers",
      "A 2D array of size 10x10"
    ],
    "answerIndex": 1,
    "explanation": "Subscript `[]` binds tighter than `*`. Hence `a` is an array of 10 pointers to int."
  },
  {
    "question": "What does `int (*a)[10];` declare?",
    "options": [
      "An array of 10 pointers to int",
      "A pointer to an array of 10 integers",
      "A function returning a pointer",
      "A 10-element integer array"
    ],
    "answerIndex": 1,
    "explanation": "Parentheses bind `*` to `a`, making `a` a pointer to an array of 10 integers."
  },
  {
    "question": "Which header file defines `SIZE_MAX` and standard fixed-width types?",
    "options": [
      "<stdio.h>",
      "<stdlib.h>",
      "<stdint.h>",
      "<string.h>"
    ],
    "answerIndex": 2,
    "explanation": "`<stdint.h>` defines exact-width integers and limit constants such as `SIZE_MAX`."
  },
  {
    "question": "What happens when an array is passed to a function in C?",
    "options": [
      "The entire array is copied element-by-element onto the stack",
      "The array decays to a pointer to its first element",
      "The function creates a heap clone",
      "A reference object is created"
    ],
    "answerIndex": 1,
    "explanation": "C passes the address of the first element (array decay), avoiding costly memory duplication."
  },
  {
    "question": "Why does `sizeof(arr)` return 8 (on 64-bit) when evaluated inside a function receiving `int arr[]`?",
    "options": [
      "The compiler is bugged",
      "Because `arr` is treated as a pointer variable (`int*`) inside the function",
      "Because the array shrunk",
      "Because 8 is the default array capacity"
    ],
    "answerIndex": 1,
    "explanation": "Function parameter `int arr[]` is rewritten by the compiler as `int *arr`."
  },
  {
    "question": "Which of the following function prototypes are equivalent in C?",
    "options": [
      "`void f(int *a)` and `void f(int a[])`",
      "`void f(int a)` and `void f(int *a)`",
      "`void f(int a[10])` and `void f(int **a)`",
      "`void f(int a[])` and `void f(int a)`"
    ],
    "answerIndex": 0,
    "explanation": "In parameter declarations, `int *a` and `int a[]` are exact synonyms."
  },
  {
    "question": "How can you prevent a function from modifying elements of a passed array?",
    "options": [
      "Use `const int arr[]` in the parameter list",
      "Use `static int arr[]`",
      "Pass array by value",
      "Use `final int arr[]`"
    ],
    "answerIndex": 0,
    "explanation": "The `const` qualifier prevents writes through the pointer, generating compiler errors on modification."
  },
  {
    "question": "What happens if a function modifies `arr[0]` when passed `int arr[]`?",
    "options": [
      "Only the function's local copy is modified",
      "The caller's original array element is modified in-place",
      "A segmentation fault occurs",
      "The change is discarded upon return"
    ],
    "answerIndex": 1,
    "explanation": "Because the base address points to caller memory, dereferencing modifies original caller memory directly."
  },
  {
    "question": "Why must array size be passed as a separate parameter to functions in C?",
    "options": [
      "Because C arrays do not store length metadata",
      "To satisfy the C preprocessor",
      "Because pointers can only hold numbers up to 10",
      "It is optional and not recommended"
    ],
    "answerIndex": 0,
    "explanation": "Raw memory pointers have no built-in size field. The receiver cannot know bounds without an explicit size argument."
  },
  {
    "question": "Can a C function return a locally declared stack array?",
    "options": [
      "Yes, always",
      "No, returning a pointer to a local stack variable causes Undefined Behavior (Dangling Pointer)",
      "Yes, if declared with const",
      "Yes, in C17"
    ],
    "answerIndex": 1,
    "explanation": "Local stack frames are destroyed when functions return. Pointers to local stack memory become dangling."
  },
  {
    "question": "How can a function safely return an array of dynamically calculated integers?",
    "options": [
      "Return local stack array",
      "Allocate memory on the heap with `malloc()` and return the heap pointer",
      "Return `sizeof(arr)`",
      "Use `return arr[5];`"
    ],
    "answerIndex": 1,
    "explanation": "Heap memory allocated via `malloc()` persists until explicitly freed by the caller."
  },
  {
    "question": "What is the syntax for passing a 2D array with 5 columns to a function?",
    "options": [
      "`void f(int arr[][5], int rows)`",
      "`void f(int arr[][], int rows)`",
      "`void f(int arr[5][], int rows)`",
      "`void f(int **arr, int rows)`"
    ],
    "answerIndex": 0,
    "explanation": "The column dimension must be specified so the compiler can calculate row stride offsets."
  },
  {
    "question": "What is the C99 `static` keyword in array parameters: `void f(int arr[static 10])`?",
    "options": [
      "The array becomes global",
      "Guarantees to the compiler that the passed pointer points to at least 10 valid elements",
      "Prevents modifying array elements",
      "Allocates array in static storage"
    ],
    "answerIndex": 1,
    "explanation": "`[static N]` promises that the argument is non-null and points to at least N contiguous elements."
  },
  {
    "question": "What is the time complexity of passing an array of 1,000,000 elements to a function?",
    "options": [
      "O(1,000,000)",
      "O(1) constant time",
      "O(log N)",
      "O(N)"
    ],
    "answerIndex": 1,
    "explanation": "Only the 8-byte pointer address is passed, taking O(1) time regardless of array length."
  },
  {
    "question": "How do you pass a subarray starting from index 3 of length 4 to `void print(int *a, int n)`?",
    "options": [
      "`print(&arr[3], 4);` or `print(arr + 3, 4);`",
      "`print(arr[3], 4);`",
      "`print(arr, 3, 4);`",
      "`print(*arr + 3, 4);`"
    ],
    "answerIndex": 0,
    "explanation": "Passing `&arr[3]` (or `arr + 3`) gives the function a base address starting at element 3."
  },
  {
    "question": "What does `const int *arr` mean in a function parameter?",
    "options": [
      "The pointer is constant and cannot change address",
      "The integer elements pointed to are constant and read-only",
      "Both pointer and data are constant",
      "The array is allocated in ROM"
    ],
    "answerIndex": 1,
    "explanation": "`const int*` defines pointer to const data (elements cannot be written through this pointer)."
  },
  {
    "question": "What does `int * const arr` mean in a function parameter?",
    "options": [
      "The elements are constant",
      "The pointer variable itself is constant and cannot point to another address",
      "The array cannot be indexed",
      "It is invalid syntax"
    ],
    "answerIndex": 1,
    "explanation": "`* const` declares a constant pointer (the address held cannot be changed)."
  },
  {
    "question": "What is the effect of passing `void f(int arr[100])` when passing an array of size 5?",
    "options": [
      "Compile error: size mismatch",
      "Compiles fine because the dimension 100 is ignored by the compiler",
      "Runtime crash immediately",
      "Memory expands to 100 automatically"
    ],
    "answerIndex": 1,
    "explanation": "Array dimensions inside parameter brackets are discarded by the compiler and treated as `int*`."
  },
  {
    "question": "Which of the following creates an array of 5 function pointers?",
    "options": [
      "`void (*funcArr[5])(int);`",
      "`void *funcArr[5](int);`",
      "`void (*funcArr)(int)[5];`",
      "`void funcArr[5](int*);`"
    ],
    "answerIndex": 0,
    "explanation": "`void (*funcArr[5])(int);` declares an array of 5 pointers to functions taking int and returning void."
  },
  {
    "question": "What happens if a function tries to write to a `const int arr[]` parameter?",
    "options": [
      "Compilation error: assignment of read-only location",
      "Runtime warning",
      "Silent ignore",
      "Value is written anyway"
    ],
    "answerIndex": 0,
    "explanation": "The compiler rejects attempts to modify read-only const-qualified pointees."
  },
  {
    "question": "How can a caller receive multiple computed outputs from an array processing function?",
    "options": [
      "Return multiple values separated by commas",
      "Pass output variables as pointers (`int *max`, `int *min`)",
      "Use `return [a, b];`",
      "Not possible in C"
    ],
    "answerIndex": 1,
    "explanation": "Passing pointers to destination variables allows the callee to write results back to the caller."
  },
  {
    "question": "What is an in-place array algorithm?",
    "options": [
      "An algorithm that modifies input in its original memory with O(1) auxiliary space",
      "An algorithm that runs on hard drives",
      "An algorithm that cannot use variables",
      "An algorithm with O(n) memory"
    ],
    "answerIndex": 0,
    "explanation": "In-place algorithms transform array data without allocating secondary arrays of size N."
  },
  {
    "question": "What is the memory overhead of passing an array to a function on a 64-bit architecture?",
    "options": [
      "0 bytes",
      "8 bytes (one pointer address)",
      "4 bytes",
      "Equal to array size"
    ],
    "answerIndex": 1,
    "explanation": "Passing an array pushes an 8-byte pointer address onto CPU registers / stack."
  },
  {
    "question": "What is the time complexity of Linear Search in the worst case?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "answerIndex": 2,
    "explanation": "In the worst case (element at last index or absent), all n elements are inspected."
  },
  {
    "question": "What is the prerequisite for executing Binary Search on an array?",
    "options": [
      "Array must be dynamically allocated",
      "Array must be sorted in order",
      "Array size must be a power of 2",
      "Array elements must be all positive"
    ],
    "answerIndex": 1,
    "explanation": "Binary search requires sorted elements to determine whether to search left or right."
  },
  {
    "question": "What is the time complexity of Binary Search in the worst case?",
    "options": [
      "O(n)",
      "O(log2 n)",
      "O(n log n)",
      "O(1)"
    ],
    "answerIndex": 1,
    "explanation": "Each comparison halves the search space, yielding O(log2 n) time complexity."
  },
  {
    "question": "Why is `mid = low + (high - low) / 2` preferred over `mid = (low + high) / 2`?",
    "options": [
      "It is faster to execute",
      "It avoids integer overflow when `low + high` exceeds `INT_MAX`",
      "It produces floating point midpoints",
      "It is required by C99 standard"
    ],
    "answerIndex": 1,
    "explanation": "When `low` and `high` are large positive integers, `(low + high)` can overflow to negative."
  },
  {
    "question": "How many maximum comparisons does Binary Search need for an array of 1,000,000 elements?",
    "options": [
      "1,000,000",
      "500,000",
      "20",
      "1,000"
    ],
    "answerIndex": 2,
    "explanation": "ceil(log2(1,000,000)) = 20 comparisons."
  },
  {
    "question": "What does Binary Search return conventionally when an element is not found?",
    "options": [
      "0",
      "NULL",
      "-1",
      "INT_MAX"
    ],
    "answerIndex": 2,
    "explanation": "-1 is returned because it is an invalid array index, unambiguously signaling failure."
  },
  {
    "question": "What is the best-case time complexity of Binary Search?",
    "options": [
      "O(log n)",
      "O(1)",
      "O(n)",
      "O(0)"
    ],
    "answerIndex": 1,
    "explanation": "When the target happens to be the exact middle element on the very first comparison, time is O(1)."
  },
  {
    "question": "What is the space complexity of iterative Binary Search?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    "answerIndex": 2,
    "explanation": "Iterative binary search uses only a few index variables (`low`, `high`, `mid`), taking O(1) space."
  },
  {
    "question": "What is the auxiliary space complexity of recursive Binary Search?",
    "options": [
      "O(1)",
      "O(log n) stack frames",
      "O(n)",
      "O(n log n)"
    ],
    "answerIndex": 1,
    "explanation": "Each recursive call consumes a stack frame, resulting in O(log n) call stack space."
  },
  {
    "question": "Which standard library function in `<stdlib.h>` performs Binary Search?",
    "options": [
      "binsearch()",
      "bsearch()",
      "search()",
      "find()"
    ],
    "answerIndex": 1,
    "explanation": "`bsearch()` is the standard C library binary search utility."
  },
  {
    "question": "What happens if Binary Search is executed on an unsorted array?",
    "options": [
      "Compiler error",
      "It automatically sorts the array first",
      "It produces incorrect or false negative results",
      "Segmentation fault"
    ],
    "answerIndex": 2,
    "explanation": "Binary search will eliminate correct halves erroneously if the sorted invariant is violated."
  },
  {
    "question": "What is Sentinel Linear Search?",
    "options": [
      "Placing target at the end of array to eliminate the loop index boundary check",
      "Searching using two threads",
      "Binary search on unsorted arrays",
      "Searching in reverse"
    ],
    "answerIndex": 0,
    "explanation": "Placing the target at `arr[n-1]` removes `i < n` from the loop condition, saving comparisons."
  },
  {
    "question": "When is Linear Search faster than Binary Search in practice?",
    "options": [
      "For small arrays (N < 16) that fit entirely within a single CPU cache line",
      "For arrays of size > 1,000,000",
      "When the array is sorted",
      "Never"
    ],
    "answerIndex": 0,
    "explanation": "For tiny arrays, simple linear sequential memory prefetching outperforms branching overhead."
  },
  {
    "question": "How do you find the first occurrence of a duplicate key in Binary Search?",
    "options": [
      "When matched, set `high = mid - 1` and record `mid`",
      "When matched, stop immediately",
      "Set `low = mid + 1`",
      "Use Linear search only"
    ],
    "answerIndex": 0,
    "explanation": "Continuing to search left (`high = mid - 1`) finds the lowest (first) matching index."
  },
  {
    "question": "How do you find the last occurrence of a duplicate key in Binary Search?",
    "options": [
      "When matched, set `low = mid + 1` and record `mid`",
      "When matched, set `high = mid - 1`",
      "Stop immediately",
      "Restart from 0"
    ],
    "answerIndex": 0,
    "explanation": "Continuing to search right (`low = mid + 1`) finds the highest (last) matching index."
  },
  {
    "question": "What is the worst-case time complexity of Bubble Sort?",
    "options": [
      "O(n)",
      "O(n log n)",
      "O(n^2)",
      "O(1)"
    ],
    "answerIndex": 2,
    "explanation": "Bubble sort requires n(n-1)/2 comparisons in the worst case, giving O(n^2)."
  },
  {
    "question": "How can Bubble Sort be optimized to achieve O(n) best-case time complexity?",
    "options": [
      "By using a `swapped` boolean flag to break if no swaps occur in a pass",
      "By using recursion",
      "By sorting in reverse",
      "By doubling the step size"
    ],
    "answerIndex": 0,
    "explanation": "If no elements are swapped during a pass, the array is already sorted and we can exit early."
  },
  {
    "question": "How does Selection Sort work?",
    "options": [
      "Repeatedly finds the minimum element in the unsorted subarray and swaps it to the front",
      "Compares adjacent elements and swaps them",
      "Shifts elements right like playing cards",
      "Splits array into halves"
    ],
    "answerIndex": 0,
    "explanation": "Selection sort selects the minimum unsorted item and places it at index i on each pass."
  },
  {
    "question": "What is the best-case time complexity of Selection Sort?",
    "options": [
      "O(n)",
      "O(n^2)",
      "O(n log n)",
      "O(1)"
    ],
    "answerIndex": 1,
    "explanation": "Selection sort always scans the entire remaining subarray to find minimum, running in O(n^2) even on sorted input."
  },
  {
    "question": "How many total swaps does Selection Sort perform on an array of size N in worst case?",
    "options": [
      "O(n^2)",
      "At most N - 1 swaps",
      "0 swaps",
      "N^2 / 2"
    ],
    "answerIndex": 1,
    "explanation": "Selection sort performs at most 1 swap per outer loop pass (at most N - 1 swaps total)."
  },
  {
    "question": "How does Insertion Sort work?",
    "options": [
      "Builds the sorted array by taking one element at a time and shifting larger elements to insert it",
      "Finds the global maximum",
      "Swaps adjacent elements continuously",
      "Divides the array recursively"
    ],
    "answerIndex": 0,
    "explanation": "Insertion sort behaves like sorting a hand of playing cards by inserting each item into its sorted place."
  },
  {
    "question": "What is the best-case time complexity of Insertion Sort?",
    "options": [
      "O(n^2)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    "answerIndex": 1,
    "explanation": "On an already sorted array, each element compares once and does not shift, running in O(n) time."
  },
  {
    "question": "What is a Stable Sorting Algorithm?",
    "options": [
      "An algorithm that never crashes",
      "An algorithm that preserves the relative order of elements with equal keys",
      "An algorithm with O(1) space",
      "An algorithm that sorts in O(n log n)"
    ],
    "answerIndex": 1,
    "explanation": "Stability means identical keys appear in the output in the same relative order as the input."
  },
  {
    "question": "Which of the following sorting algorithms is UNSTABLE by default?",
    "options": [
      "Bubble Sort",
      "Insertion Sort",
      "Selection Sort",
      "Merge Sort"
    ],
    "answerIndex": 2,
    "explanation": "Selection sort can swap an element across duplicate keys, violating stability."
  },
  {
    "question": "What is the auxiliary space complexity of Bubble, Selection, and Insertion Sort?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(1)",
      "O(n^2)"
    ],
    "answerIndex": 2,
    "explanation": "All three are in-place algorithms requiring only O(1) temporary swap memory."
  },
  {
    "question": "Why is Insertion Sort often used in hybrid algorithms like Timsort for small subarrays?",
    "options": [
      "It has very low constant factor overhead and is adaptive O(n) on partially sorted data",
      "It is the only stable sort",
      "It uses O(0) memory",
      "It is faster than Quick Sort on all inputs"
    ],
    "answerIndex": 0,
    "explanation": "Minimal overhead and adaptive linear behavior make Insertion Sort ideal for small partitions."
  },
  {
    "question": "What is the worst-case input configuration for Insertion Sort?",
    "options": [
      "Already sorted array in ascending order",
      "Array sorted in reverse (descending) order",
      "Array with all identical elements",
      "Random array"
    ],
    "answerIndex": 1,
    "explanation": "In reverse order, every element must shift past all previously sorted elements."
  },
  {
    "question": "What is the standard C library sorting function?",
    "options": [
      "sort()",
      "qsort()",
      "quicksort()",
      "arraysort()"
    ],
    "answerIndex": 1,
    "explanation": "`qsort()` from `<stdlib.h>` is the standard polymorphic sorting routine in C."
  },
  {
    "question": "What is the signature of the comparator function required by `qsort()`?",
    "options": [
      "`int (*cmp)(const void *, const void *)`",
      "`int (*cmp)(int, int)`",
      "`void (*cmp)(void *, void *)`",
      "`bool (*cmp)(const int *, const int *)`"
    ],
    "answerIndex": 0,
    "explanation": "`qsort` expects a comparator accepting two `const void*` and returning negative, zero, or positive int."
  },
  {
    "question": "In `qsort()`, what does returning a negative value from comparator `cmp(a, b)` indicate?",
    "options": [
      "`a` should come before `b` in sorted order",
      "`b` should come before `a`",
      "`a` and `b` are equal",
      "An error occurred"
    ],
    "answerIndex": 0,
    "explanation": "A negative return value instructs `qsort` to place element `a` before element `b`."
  },
  {
    "question": "How are multi-dimensional arrays laid out in physical memory in C?",
    "options": [
      "Column-major order",
      "Row-major order in contiguous linear RAM",
      "Fragmented blocks linked by pointers",
      "Hash table buckets"
    ],
    "answerIndex": 1,
    "explanation": "C stores multi-dimensional arrays in Row-Major order (row 0, then row 1, then row 2...)."
  },
  {
    "question": "What is the address formula for element `matrix[i][j]` in row-major order with dimensions `ROWS x COLS`?",
    "options": [
      "`BaseAddress + ((i * COLS) + j) * sizeof(Type)`",
      "`BaseAddress + ((j * ROWS) + i) * sizeof(Type)`",
      "`BaseAddress + (i + j) * sizeof(Type)`",
      "`BaseAddress + (i * j) * sizeof(Type)`"
    ],
    "answerIndex": 0,
    "explanation": "Skipping `i` full rows requires `i * COLS` elements, plus `j` column steps, scaled by type size."
  },
  {
    "question": "What is the total byte size of `int m[3][4];` on a system with 4-byte integers?",
    "options": [
      "12 bytes",
      "48 bytes",
      "24 bytes",
      "64 bytes"
    ],
    "answerIndex": 1,
    "explanation": "3 rows * 4 columns = 12 elements * 4 bytes = 48 bytes."
  },
  {
    "question": "What is the pointer dereference equivalence of `matrix[i][j]`?",
    "options": [
      "`*(*(matrix + i) + j)`",
      "`*(matrix + i + j)`",
      "`**matrix + i + j`",
      "`*(matrix[i] + j*COLS)`"
    ],
    "answerIndex": 0,
    "explanation": "`*(matrix + i)` points to row i; adding `j` offsets to column j; outer `*` dereferences value."
  },
  {
    "question": "Why is row-by-row matrix traversal faster than column-by-column traversal in C?",
    "options": [
      "Row traversal accesses consecutive memory addresses, maximizing CPU cache line hits",
      "The C compiler refuses column loops",
      "Column traversal uses division",
      "Row traversal runs in parallel"
    ],
    "answerIndex": 0,
    "explanation": "Sequential row reads utilize hardware cache prefetching; jumping column-by-column causes cache thrashing."
  },
  {
    "question": "What is the condition for multiplying two matrices A (r1 x c1) and B (r2 x c2)?",
    "options": [
      "`r1 == r2` and `c1 == c2`",
      "`c1 == r2` (columns of A must equal rows of B)",
      "`r1 == c2`",
      "`r1 * c1 == r2 * c2`"
    ],
    "answerIndex": 1,
    "explanation": "Matrix multiplication requires the inner dimensions to match: `A(r1 x c1) * B(c1 x c2) = C(r1 x c2)`."
  },
  {
    "question": "What is the time complexity of multiplying two N x N matrices using the standard triple loop?",
    "options": [
      "O(N^2)",
      "O(N^3)",
      "O(N log N)",
      "O(2^N)"
    ],
    "answerIndex": 1,
    "explanation": "Triple nested loops (i, j, k) iterating from 0 to N perform N^3 scalar multiplications."
  },
  {
    "question": "What is the transpose of an M x N matrix?",
    "options": [
      "An N x M matrix where rows and columns are swapped (`T[j][i] = A[i][j]`)",
      "A matrix inverted by multiplying by -1",
      "An M x N matrix with negated diagonal",
      "A zero matrix"
    ],
    "answerIndex": 0,
    "explanation": "Transposition interchanges rows and columns: element at (i, j) moves to (j, i)."
  },
  {
    "question": "What is a Symmetric Matrix?",
    "options": [
      "A matrix where all elements are positive",
      "A square matrix equal to its transpose (`A[i][j] == A[j][i]`)",
      "A matrix with equal number of 1s and 0s",
      "A diagonal matrix with only zeros"
    ],
    "answerIndex": 1,
    "explanation": "A symmetric matrix is a square matrix that remains identical when reflected across its main diagonal."
  },
  {
    "question": "What is the trace of a square matrix?",
    "options": [
      "The determinant of the matrix",
      "The sum of elements along the main diagonal (`A[i][i]`)",
      "The product of all elements",
      "The total number of non-zero elements"
    ],
    "answerIndex": 1,
    "explanation": "The trace is the sum of main diagonal elements: sum of `A[i][i]` for all i."
  },
  {
    "question": "What is an Identity Matrix of order N?",
    "options": [
      "A matrix where all elements are 1",
      "A square matrix with 1s on main diagonal and 0s elsewhere",
      "A matrix equal to its inverse",
      "A matrix with all diagonal elements equal to 0"
    ],
    "answerIndex": 1,
    "explanation": "An identity matrix has `I[i][i] = 1` and `I[i][j] = 0` for `i != j`."
  },
  {
    "question": "What is a Sparse Matrix?",
    "options": [
      "A matrix with very few rows",
      "A matrix populated predominantly with zero elements",
      "A matrix with floating point values",
      "An uninitialized matrix"
    ],
    "answerIndex": 1,
    "explanation": "A sparse matrix has mostly zeros; stored in 3-tuple (row, col, value) format to save RAM."
  },
  {
    "question": "What is a Saddle Point in a 2D matrix?",
    "options": [
      "The center element of the matrix",
      "An element that is minimum in its row and maximum in its column",
      "An element equal to zero",
      "The maximum element of the matrix"
    ],
    "answerIndex": 1,
    "explanation": "A saddle point is a minimax point: lowest value in its row and highest in its column."
  },
  {
    "question": "How do you rotate a square matrix by 90 degrees clockwise in-place?",
    "options": [
      "Transpose the matrix, then reverse each individual row",
      "Reverse rows, then transpose",
      "Invert the matrix values",
      "Swap top row with bottom row only"
    ],
    "answerIndex": 0,
    "explanation": "Step 1: Transpose `A[i][j] <-> A[j][i]`. Step 2: Reverse each row `A[i][0..N-1]`."
  },
  {
    "question": "What is the output of `int m[2][2] = {{1, 2}, {3, 4}}; printf(\"%d\", *(*m + 3));`?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answerIndex": 3,
    "explanation": "`*m` points to the start of contiguous memory. Offset +3 dereferences the 4th element (4)."
  },
  {
    "question": "What is the condition for two matrices A and B to be added?",
    "options": [
      "Both must be square matrices",
      "Both must have identical dimensions (same rows and same columns)",
      "Columns of A must equal rows of B",
      "Both must be non-zero"
    ],
    "answerIndex": 1,
    "explanation": "Matrix addition is element-wise: `C[i][j] = A[i][j] + B[i][j]`, requiring equal dimensions."
  },
  {
    "question": "What is the determinant of a 2x2 matrix `[[a, b], [c, d]]`?",
    "options": [
      "ad + bc",
      "ad - bc",
      "ab - cd",
      "a + d - b - c"
    ],
    "answerIndex": 1,
    "explanation": "`det = (a * d) - (b * c)`."
  },
  {
    "question": "What does `int arr[2][3][4];` declare?",
    "options": [
      "A 3D array of 24 integers (2 * 3 * 4)",
      "An array of 9 integers",
      "A 2D array with 24 pointers",
      "A jagged array"
    ],
    "answerIndex": 0,
    "explanation": "A 3D tensor containing 2 * 3 * 4 = 24 contiguous integer elements."
  },
  {
    "question": "What will `int a[3][3] = {0};` initialize?",
    "options": [
      "Only a[0][0] to 0",
      "All 9 elements of the 3x3 matrix to 0",
      "Only the main diagonal to 0",
      "Nothing (contains garbage)"
    ],
    "answerIndex": 1,
    "explanation": "Zero-initialization of the first element guarantees all remaining 8 elements are zeroed."
  },
  {
    "question": "Which of the following creates a dynamic 2D array of integers on the heap in C?",
    "options": [
      "`int **arr = malloc(r * sizeof(int*)); for(i) arr[i] = malloc(c * sizeof(int));`",
      "`int arr = malloc(r, c);`",
      "`int arr[r][c] = malloc();`",
      "`int **arr = malloc(r * c);`"
    ],
    "answerIndex": 0,
    "explanation": "Allocating an array of row pointers, then allocating column buffers per row creates a dynamic 2D grid."
  },
  {
    "question": "What tool should you use to catch array out-of-bounds errors during compilation and testing?",
    "options": [
      "AddressSanitizer via `-fsanitize=address` with GCC/Clang",
      "Disassembler",
      "Text editor syntax highlighter",
      "printf only"
    ],
    "answerIndex": 0,
    "explanation": "AddressSanitizer instruments memory operations to catch buffer overflows at runtime."
  },
  {
    "question": "What is a Jagged Array?",
    "options": [
      "An array of arrays where individual rows have different lengths",
      "A 3D matrix",
      "A corrupted array",
      "A sorted array"
    ],
    "answerIndex": 0,
    "explanation": "A jagged array is an array of pointers where each sub-array can have varying length."
  },
  {
    "question": "In C, can the dimension of a global array be determined by a variable at runtime?",
    "options": [
      "Yes, in C99",
      "No, file-scope global array dimensions must be compile-time integer constant expressions",
      "Yes, with static keyword",
      "Yes, if initialized"
    ],
    "answerIndex": 1,
    "explanation": "VLAs are only allowed at block (local) scope, never at global/file scope."
  },
  {
    "question": "What is the time complexity of finding the transpose of an M x N matrix?",
    "options": [
      "O(M * N)",
      "O(M + N)",
      "O(M^2)",
      "O(1)"
    ],
    "answerIndex": 0,
    "explanation": "Every element in the M x N grid must be copied to its transposed position, taking O(M * N) time."
  },
  {
    "question": "What is Strassen's algorithm for matrix multiplication?",
    "options": [
      "A divide-and-conquer algorithm running in O(N^2.81) time",
      "A linear time algorithm",
      "An O(N!) algorithm",
      "A hardware GPU instruction"
    ],
    "answerIndex": 0,
    "explanation": "Strassen's algorithm reduces 8 recursive multiplications to 7, achieving O(N^2.807) asymptotic complexity."
  },
  {
    "question": "What is a Variable-Length Array (VLA) in C99?",
    "options": [
      "An array whose size can be resized dynamically at runtime like a C++ vector",
      "An array whose dimension is determined at runtime upon stack frame entry using a non-constant integer expression",
      "An array allocated exclusively on heap using malloc",
      "An array that can hold variables of varying data types"
    ],
    "answerIndex": 1,
    "explanation": "In C99, VLAs allow array dimensions to be calculated at runtime using integer variables. They are allocated on the stack for the duration of the declaring scope."
  },
  {
    "question": "Was VLA support made optional in the C11 standard?",
    "options": [
      "No, VLAs are mandatory in all ISO C standards",
      "Yes, C11 made VLA support optional via the macro __STDC_NO_VLA__",
      "Yes, VLAs were completely removed from C11",
      "VLAs were only introduced in C23"
    ],
    "answerIndex": 1,
    "explanation": "C11 made VLAs conditionally optional; conforming compilers define __STDC_NO_VLA__ if they do not support variable-length arrays."
  },
  {
    "question": "Why can large VLAs cause serious runtime crashes?",
    "options": [
      "They cause heap fragmentation",
      "They can easily exhaust stack memory causing uncatchable Stack Overflow",
      "They leak memory upon function return",
      "They lock the memory bus"
    ],
    "answerIndex": 1,
    "explanation": "Because VLAs allocate on the thread stack without bounds verification, large sizes trigger stack overflow segfaults."
  },
  {
    "question": "What is a Designated Initializer for arrays introduced in C99?",
    "options": [
      "Initializing arrays using pointers only",
      "Syntax allowing specific element indices to be initialized explicitly, such as int a[10] = {[3] = 42, [7] = 99};",
      "Assigning arrays using memcpy",
      "Initializing arrays at compile-time via macro constants"
    ],
    "answerIndex": 1,
    "explanation": "C99 designated initializers allow specifying index designators like `[index] = value`, leaving unmentioned elements initialized to zero."
  },
  {
    "question": "What will `int a[5] = {[1] = 10, [4] = 40};` initialize `a[2]` to?",
    "options": [
      "10",
      "40",
      "0",
      "Garbage value"
    ],
    "answerIndex": 2,
    "explanation": "Any unmentioned elements in an explicit initializer list default to 0."
  },
  {
    "question": "What is the result of `int a[] = {[5] = 100};` on array size?",
    "options": [
      "sizeof(a) is 4 bytes (1 element)",
      "sizeof(a) is 24 bytes (6 elements, indices 0 to 5)",
      "Compilation error because size was omitted",
      "sizeof(a) is 20 bytes (5 elements)"
    ],
    "answerIndex": 1,
    "explanation": "The compiler deduces the array size from the largest designated index (5), creating an array of 6 elements (indices 0..5)."
  },
  {
    "question": "In C, when an array expression decays to a pointer, what is its exact resulting type for `int arr[10];`?",
    "options": [
      "`int (*)[10]` (pointer to array of 10 ints)",
      "`int *` (pointer to int)",
      "`int **`",
      "`void *`"
    ],
    "answerIndex": 1,
    "explanation": "An array of type `T[N]` decays to a pointer of type `T*` pointing to its first element `&arr[0]` in most value contexts."
  },
  {
    "question": "Under which two operations does an array NOT decay into a pointer to its first element?",
    "options": [
      "When used in arithmetic addition and subtraction",
      "When used as the operand of `sizeof` and unary `&` (address-of)",
      "When passed as a function argument",
      "When assigned to another pointer"
    ],
    "answerIndex": 1,
    "explanation": "Array decay does not happen when the array is an operand of `sizeof` (yielding total array bytes) or `&` (yielding a pointer to the entire array `T(*)[N]`)."
  },
  {
    "question": "What is the difference between `arr` and `&arr` for `int arr[5];`?",
    "options": [
      "They have completely different memory address values",
      "They have the exact same address value, but `arr` has type `int*` while `&arr` has type `int(*)[5]`",
      "`&arr` returns a pointer to the heap",
      "`arr` is an integer while `&arr` is a pointer"
    ],
    "answerIndex": 1,
    "explanation": "Both point to the start of the array, but `arr + 1` steps by `sizeof(int)` (4 bytes) while `&arr + 1` steps by `sizeof(int[5])` (20 bytes)."
  },
  {
    "question": "If `arr` is at address `0x1000` and `sizeof(int) == 4`, what is the value of `&arr + 1` for `int arr[5];`?",
    "options": [
      "0x1004",
      "0x1014 (0x1000 + 20 bytes)",
      "0x1005",
      "0x1020"
    ],
    "answerIndex": 1,
    "explanation": "`&arr` is of type `int(*)[5]`. Adding 1 advances by the size of the whole array: 5 * 4 = 20 (0x14 in hex), resulting in `0x1014`."
  },
  {
    "question": "Can an array in C be directly assigned to another array using the `=` operator (e.g. `arr1 = arr2;`)?",
    "options": [
      "Yes, if both arrays have the same size and type",
      "No, array names are non-modifiable lvalues in C",
      "Yes, but only in C99 and later",
      "Yes, it performs an element-by-element deep copy"
    ],
    "answerIndex": 1,
    "explanation": "In C, arrays cannot be assigned with `=`. Array names are non-modifiable lvalues. `memcpy()` or a loop must be used."
  },
  {
    "question": "What is the purpose of `memcpy(dest, src, n)` when copying arrays?",
    "options": [
      "It compares two arrays for equality",
      "It copies `n` raw bytes from source memory location to destination memory location",
      "It converts array elements to strings",
      "It dynamically allocates memory for destination"
    ],
    "answerIndex": 1,
    "explanation": "`memcpy` from `<string.h>` performs high-throughput byte-by-byte memory block copying."
  },
  {
    "question": "When copying overlapping array regions, which function MUST be used instead of `memcpy` to prevent undefined behavior?",
    "options": [
      "`memmove()`",
      "`memcopy_safe()`",
      "`strcpy()`",
      "`bcopy()`"
    ],
    "answerIndex": 0,
    "explanation": "`memmove()` safely handles overlapping memory areas by using an internal buffer or copying in the correct direction."
  },
  {
    "question": "What does `memset(arr, 0, sizeof(arr))` do?",
    "options": [
      "Frees the memory of `arr`",
      "Zeros out every byte of the array `arr`",
      "Sets only the first element to 0",
      "Resets array capacity"
    ],
    "answerIndex": 1,
    "explanation": "`memset` sets all bytes in the specified memory block to the given value (here 0)."
  },
  {
    "question": "Can `memset(arr, 1, sizeof(arr))` be used to initialize an `int arr[10]` array with integer value 1?",
    "options": [
      "Yes, all elements will become integer 1",
      "No, `memset` sets memory byte-by-byte, resulting in `0x01010101` (16843009) for each 4-byte integer",
      "Yes, on all 64-bit systems",
      "No, `memset` only works on character arrays"
    ],
    "answerIndex": 1,
    "explanation": "`memset` operates byte-by-byte. Setting byte value 1 results in `0x01010101` for a 4-byte integer, not integer value 1."
  },
  {
    "question": "In C, how are 2D arrays stored in physical computer memory?",
    "options": [
      "Column-Major Order",
      "Row-Major Order (contiguous sequence of rows)",
      "Segmented Hash Table",
      "Linked list of column pointers"
    ],
    "answerIndex": 1,
    "explanation": "C exclusively uses Row-Major order: row 0 is stored contiguously, followed immediately by row 1, row 2, etc."
  },
  {
    "question": "For a 2D array `int matrix[R][C]`, what is the linear memory offset formula for element `matrix[i][j]`?",
    "options": [
      "`(j * R + i) * sizeof(int)`",
      "`(i * C + j) * sizeof(int)`",
      "`(i + j) * sizeof(int)`",
      "`(i * R + j * C) * sizeof(int)`"
    ],
    "answerIndex": 1,
    "explanation": "In row-major ordering, element `[i][j]` is offset by `(i * C + j)` elements from the base address."
  },
  {
    "question": "Why does traversing a 2D array row-by-row execute substantially faster than column-by-column?",
    "options": [
      "Row indices use fewer CPU registers",
      "Row traversal exploits CPU cache spatial locality, while column traversal causes frequent cache misses",
      "Column traversal requires floating point arithmetic",
      "The C compiler optimizes loops only when the outer variable is named 'i'"
    ],
    "answerIndex": 1,
    "explanation": "Row-major storage ensures adjacent memory words are loaded into CPU L1/L2 cache lines together, maximizing spatial cache hits."
  },
  {
    "question": "What is a Cache Line in CPU memory architecture?",
    "options": [
      "A software queue of pending instructions",
      "The fixed-size block of memory (typically 64 bytes) transferred between main RAM and CPU caches",
      "A pointer to the GPU VRAM",
      "A pipeline branch predictor buffer"
    ],
    "answerIndex": 1,
    "explanation": "A cache line is the fundamental unit of data transfer between RAM and processor caches, commonly 64 bytes wide."
  },
  {
    "question": "What is the Transpose of an `N x M` matrix?",
    "options": [
      "An `N x M` matrix with all negative values",
      "An `M x N` matrix where rows and columns are swapped (`T[j][i] = A[i][j]`)",
      "The determinant of the matrix",
      "The inverse matrix multiplied by identity"
    ],
    "answerIndex": 1,
    "explanation": "Transposition flips a matrix over its main diagonal, transforming an N x M matrix into an M x N matrix."
  },
  {
    "question": "What condition is required to perform Matrix Multiplication `A x B`?",
    "options": [
      "Both matrices must be square and identical size",
      "Number of columns in `A` must equal the number of rows in `B` (`A: M x K`, `B: K x N`)",
      "Number of rows in `A` must equal number of rows in `B`",
      "Both matrices must have determinant non-zero"
    ],
    "answerIndex": 1,
    "explanation": "Matrix multiplication `A(m x k) * B(k x n)` requires the inner dimension `k` (columns of A and rows of B) to be identical."
  },
  {
    "question": "What is the time complexity of standard naive matrix multiplication for two `N x N` matrices?",
    "options": [
      "O(N)",
      "O(N log N)",
      "O(N^2)",
      "O(N^3)"
    ],
    "answerIndex": 3,
    "explanation": "Three nested loops iterate N times each, resulting in O(N^3) arithmetic operations."
  },
  {
    "question": "What is a Symmetric Matrix?",
    "options": [
      "A matrix where all diagonal elements are 0",
      "A square matrix that is equal to its transpose (`A[i][j] == A[j][i]`)",
      "A matrix where row sums equal column sums",
      "A matrix having only binary 0 and 1 values"
    ],
    "answerIndex": 1,
    "explanation": "A matrix is symmetric if and only if `A == A^T`, meaning `A[i][j] == A[j][i]` for all `i, j`."
  },
  {
    "question": "What is an Identity Matrix?",
    "options": [
      "A matrix containing all 1s",
      "A square matrix with 1s on the main diagonal and 0s everywhere else",
      "A matrix that equals its inverse only",
      "A 1x1 scalar matrix"
    ],
    "answerIndex": 1,
    "explanation": "An identity matrix `I` satisfies `I[i][j] = 1` for `i == j` and `0` for `i != j`."
  },
  {
    "question": "What is the Trace of a square matrix?",
    "options": [
      "The product of all elements in the matrix",
      "The sum of the elements on the main diagonal (`sum(A[i][i])`)",
      "The maximum element in the matrix",
      "The rank of the matrix"
    ],
    "answerIndex": 1,
    "explanation": "The trace of a square matrix is the algebraic sum of its main diagonal elements."
  },
  {
    "question": "What is a Sparse Matrix?",
    "options": [
      "A matrix with more columns than rows",
      "A matrix in which the majority of elements are zero",
      "A matrix with non-contiguous memory addresses",
      "A matrix that cannot be inverted"
    ],
    "answerIndex": 1,
    "explanation": "A sparse matrix is one where most elements are zero, making specialized coordinate list (COO) or compressed row (CSR) storage memory-efficient."
  },
  {
    "question": "What are the three arrays used in the Compressed Sparse Row (CSR) format?",
    "options": [
      "Values, Column Indices, Row Pointers",
      "Keys, Hash Values, Bucket Sizes",
      "Headers, Nodes, Tails",
      "Left, Right, Center"
    ],
    "answerIndex": 0,
    "explanation": "CSR compresses sparse matrices into non-zero `values`, `column_indices` for each value, and `row_pointers` indexing row boundaries."
  },
  {
    "question": "When passing a 2D array to a function `void process(int a[][5], int rows)`, why MUST the second dimension (5) be specified?",
    "options": [
      "The compiler needs it for security checks",
      "The compiler requires the column width to compute row-major memory offsets (`i * 5 + j`)",
      "C functions cannot accept variable arguments",
      "It specifies the return type size"
    ],
    "answerIndex": 1,
    "explanation": "Without the column dimension, the compiler cannot determine the step size needed to jump from one row to the next in memory."
  },
  {
    "question": "What is the parameter declaration `int (*arr)[10]` in a function prototype?",
    "options": [
      "An array of 10 integer pointers",
      "A pointer to an array of 10 integers",
      "A pointer to a function returning an array",
      "A 2D array of unspecified dimensions"
    ],
    "answerIndex": 1,
    "explanation": "Parentheses bind `*` to `arr`, creating a pointer to an array of 10 integers: `int (*arr)[10]`."
  },
  {
    "question": "What is the parameter declaration `int *arr[10]`?",
    "options": [
      "A pointer to an array of 10 integers",
      "An array of 10 pointers to integers",
      "A 2D array with 10 rows",
      "A pointer to a 10-byte integer"
    ],
    "answerIndex": 1,
    "explanation": "Subscript `[]` has higher precedence than `*`, so `int *arr[10]` is an array of 10 integer pointers (ragged array)."
  },
  {
    "question": "What is a Ragged (Jagged) Array in C?",
    "options": [
      "An array with missing memory addresses",
      "An array of pointers where each pointer references a 1D array of different length",
      "A 3D array flattened into 1D",
      "An array sorted in zig-zag order"
    ],
    "answerIndex": 1,
    "explanation": "A ragged array is an array of pointers where each sub-array can be allocated independently with different lengths."
  },
  {
    "question": "How do you allocate a 2D matrix of size `R x C` in contiguous heap memory with a single `malloc`?",
    "options": [
      "`int *matrix = malloc(R * C * sizeof(int));` accessed as `matrix[i * C + j]`",
      "`int **matrix = malloc(R * sizeof(int*));`",
      "`int matrix = malloc(R + C);`",
      "`int matrix[R][C] = malloc(sizeof(int));`"
    ],
    "answerIndex": 0,
    "explanation": "Allocating a single block `malloc(R * C * sizeof(int))` ensures 100% contiguous memory and optimal cache locality."
  },
  {
    "question": "What is the two-pointer technique in array algorithms?",
    "options": [
      "Using double pointers `int **` exclusively",
      "Using two index variables moving towards or alongside each other to solve search/partition problems in O(n) time",
      "Allocating memory from two distinct heaps",
      "Passing two arrays simultaneously to a function"
    ],
    "answerIndex": 1,
    "explanation": "The two-pointer technique uses two moving index markers (e.g. left and right) to process sorted sequences in linear time without extra memory."
  },
  {
    "question": "How can an array be reversed in-place in O(n) time and O(1) auxiliary space?",
    "options": [
      "Copying elements to a stack and popping back",
      "Using two pointers `left = 0` and `right = n - 1`, swapping `arr[left]` and `arr[right]` while `left < right`",
      "Calling `qsort()` with reverse comparator",
      "Re-allocating the array using `realloc()`"
    ],
    "answerIndex": 1,
    "explanation": "Swapping elements from both ends moving toward the middle reverses the array in-place in N/2 iterations."
  },
  {
    "question": "What is the Dutch National Flag algorithm designed by Edsger Dijkstra used for?",
    "options": [
      "Sorting floating point numbers",
      "Partitioning an array of three distinct keys (e.g. 0s, 1s, and 2s) in linear O(n) time and O(1) space",
      "Finding the shortest path in a graph",
      "Generating random permutations"
    ],
    "answerIndex": 1,
    "explanation": "The Dutch National Flag algorithm partitions arrays with 3 categories of elements (0, 1, 2) in a single linear scan using 3 pointers (low, mid, high)."
  },
  {
    "question": "What is the Kadane's Algorithm used for on an array of numbers?",
    "options": [
      "Finding the maximum contiguous subarray sum in O(n) time",
      "Finding all duplicate elements in O(1) time",
      "Sorting an array in O(n log n) time",
      "Finding matrix eigenvalues"
    ],
    "answerIndex": 0,
    "explanation": "Kadane's algorithm computes the maximum contiguous subarray sum in linear O(N) time and O(1) space by maintaining running max."
  },
  {
    "question": "What is the Boyer-Moore Majority Vote algorithm used for?",
    "options": [
      "Finding the element that appears more than n/2 times in an array in O(n) time and O(1) space",
      "Counting total votes in election databases",
      "Sorting arrays with duplicate keys",
      "String searching inside text files"
    ],
    "answerIndex": 0,
    "explanation": "Boyer-Moore Voting finds the majority element (> N/2 occurrences) in linear time with O(1) auxiliary memory."
  },
  {
    "question": "What is Prefix Sum Array technique used for?",
    "options": [
      "Computing range sum queries in O(1) time after O(n) preprocessing",
      "Sorting prefixes alphabetically",
      "Reversing prefix strings",
      "Compressing memory blocks"
    ],
    "answerIndex": 0,
    "explanation": "A prefix sum array `P[i] = P[i-1] + arr[i]` allows calculating sum of elements between indices `L` and `R` in O(1) time as `P[R] - P[L-1]`."
  },
  {
    "question": "What is the Difference Array technique used for?",
    "options": [
      "Applying multiple range update operations (`[L, R] += val`) in O(1) time each, followed by a single prefix sum recovery",
      "Computing differences between two matrices",
      "Finding array variance",
      "Detecting array corruption"
    ],
    "answerIndex": 0,
    "explanation": "Difference array `D[i] = A[i] - A[i-1]` enables range increments in O(1) time by setting `D[L] += val` and `D[R+1] -= val`."
  },
  {
    "question": "What is a Circular Buffer (Ring Buffer) implemented with an array?",
    "options": [
      "An array stored in circular RAM topology",
      "A fixed-size array where write and read pointers wrap around to index 0 using modulo arithmetic `(index + 1) % SIZE`",
      "An array that can only hold numbers in a circle",
      "A dynamic array managed by the operating system kernel"
    ],
    "answerIndex": 1,
    "explanation": "A ring buffer uses modulo indexing `(tail + 1) % CAPACITY` to treat a contiguous array as a continuous circular FIFO queue."
  },
  {
    "question": "What is the Sliding Window technique used for?",
    "options": [
      "Rendering OS GUI windows",
      "Tracking a contiguous subarray/substring of variable or fixed length across a sequence in O(n) time",
      "Paging virtual memory blocks",
      "Parallelizing loop iterations across CPU cores"
    ],
    "answerIndex": 1,
    "explanation": "Sliding window maintains state for a window that expands and contracts across array indices, avoiding redundant recalculations."
  },
  {
    "question": "What is the time complexity to rotate an array of size `N` by `K` positions using the 3-step reversal algorithm?",
    "options": [
      "O(N^2)",
      "O(N)",
      "O(K * N)",
      "O(log N)"
    ],
    "answerIndex": 1,
    "explanation": "Reversing `[0..K-1]`, `[K..N-1]`, and then the entire `[0..N-1]` achieves rotation in O(N) time and O(1) auxiliary space."
  },
  {
    "question": "What is the Upper Triangular Matrix?",
    "options": [
      "A matrix with all elements above the diagonal equal to 0",
      "A square matrix where all elements below the main diagonal are 0 (`A[i][j] == 0` for `i > j`)",
      "A matrix with only 1s in upper half",
      "A matrix of odd dimensions"
    ],
    "answerIndex": 1,
    "explanation": "In an upper triangular matrix, all elements below the principal diagonal (`i > j`) are strictly zero."
  },
  {
    "question": "What is the Lower Triangular Matrix?",
    "options": [
      "A square matrix where all elements above the main diagonal are 0 (`A[i][j] == 0` for `i < j`)",
      "A matrix stored at lower memory addresses",
      "A matrix with negative determinant",
      "A matrix with zero diagonal"
    ],
    "answerIndex": 0,
    "explanation": "In a lower triangular matrix, all entries above the main diagonal (`i < j`) are zero."
  },
  {
    "question": "How many elements are non-zero in an `N x N` upper triangular matrix (including diagonal)?",
    "options": [
      "`N * (N + 1) / 2`",
      "`N * N / 2`",
      "`N * (N - 1) / 2`",
      "`2 * N`"
    ],
    "answerIndex": 0,
    "explanation": "Row 0 has N elements, row 1 has N-1 ... row N-1 has 1 element, summing to `N * (N + 1) / 2`."
  },
  {
    "question": "What is a Spiral Matrix Traversal?",
    "options": [
      "Traversing a 2D matrix in a clockwise spiral path from outer boundary toward the center",
      "Sorting elements in circular fashion",
      "Rotating the matrix by 45 degrees",
      "Reading matrix elements along diagonals"
    ],
    "answerIndex": 0,
    "explanation": "Spiral traversal visits elements along top row, right column, bottom row, and left column, shrinking boundaries inwards."
  },
  {
    "question": "What is the saddle point of a matrix?",
    "options": [
      "An element that is the minimum in its row and maximum in its column (or vice versa)",
      "The center element of an odd-sized matrix",
      "The point where determinant is zero",
      "The intersection of matrix diagonals"
    ],
    "answerIndex": 0,
    "explanation": "A saddle point in a matrix is an entry which is simultaneously the minimum in its row and the maximum in its column."
  },
  {
    "question": "What is a Toeplitz Matrix?",
    "options": [
      "A matrix where every descending diagonal from left to right is constant (`A[i][j] == A[i-1][j-1]`)",
      "A matrix with binary elements only",
      "A matrix whose inverse equals its transpose",
      "A matrix with prime diagonal entries"
    ],
    "answerIndex": 0,
    "explanation": "A Toeplitz (or diagonal-constant) matrix has identical values along all diagonals parallel to the main diagonal."
  },
  {
    "question": "What is the memory overhead of an array declared as `int arr[1000];` inside a function (local automatic variable)?",
    "options": [
      "4000 bytes allocated on stack with 0 heap pointer overhead",
      "8000 bytes with metadata descriptors",
      "4000 bytes plus 8 bytes pointer descriptor",
      "Zero overhead until initialized"
    ],
    "answerIndex": 0,
    "explanation": "C local arrays are raw contiguous bytes placed directly on the function's stack frame without runtime object headers."
  },
  {
    "question": "What is the effect of declaring an array as `static int arr[100];` inside a function?",
    "options": [
      "The array cannot be modified",
      "The array is allocated in the BSS/Data segment, zero-initialized by default, and persists for the entire program lifetime",
      "The array is allocated in CPU registers",
      "The array can only be accessed by thread 0"
    ],
    "answerIndex": 1,
    "explanation": "Static variables live in the program's data segment, preserve their contents between function calls, and default to 0."
  },
  {
    "question": "What is the time complexity of Quick Select algorithm to find the K-th smallest element in an unsorted array?",
    "options": [
      "O(n) average time, O(n^2) worst case",
      "O(n log n) always",
      "O(log n)",
      "O(1)"
    ],
    "answerIndex": 0,
    "explanation": "Quick Select (Hoare's selection algorithm) finds the k-th smallest element in linear O(N) average time by partitioning only one subarray."
  },
  {
    "question": "What is the Counting Sort algorithm time complexity for sorting `n` integers in range `[0..k]`?",
    "options": [
      "O(n + k)",
      "O(n log n)",
      "O(n * k)",
      "O(k log n)"
    ],
    "answerIndex": 0,
    "explanation": "Counting sort counts frequencies in a tally array of size k, running in linear O(n + k) time."
  },
  {
    "question": "Why is Counting Sort not suitable for sorting arbitrary 64-bit integers?",
    "options": [
      "It cannot handle positive numbers",
      "The auxiliary count array would require 2^64 entries (exabyte scale memory)",
      "It is an unstable sort",
      "It only works on floating point numbers"
    ],
    "answerIndex": 1,
    "explanation": "Counting sort requires memory proportional to the range of input values `k`; for 64-bit range, `k = 2^64`, which exceeds physical RAM."
  },
  {
    "question": "What is Radix Sort algorithm?",
    "options": [
      "A non-comparative sorting algorithm that sorts numbers digit-by-digit from least significant digit (LSD) to most significant digit (MSD)",
      "A sort that calculates square roots",
      "A sort using binary search trees",
      "A sort using heap priority queues"
    ],
    "answerIndex": 0,
    "explanation": "Radix sort processes keys digit-by-digit using a stable sub-routine (like counting sort), running in O(d * (n + b)) time."
  },
  {
    "question": "What is Pigeonhole Sort?",
    "options": [
      "A sorting algorithm suitable for sorting lists of elements where number of elements (n) and length of range of possible key values (N) are approximately equal",
      "A randomized sort",
      "A network sorting algorithm",
      "A parallel GPU sorting algorithm"
    ],
    "answerIndex": 0,
    "explanation": "Pigeonhole sort moves items to pigeonhole buckets corresponding to each possible key, then concatenates them."
  },
  {
    "question": "What is Bucket Sort algorithm?",
    "options": [
      "A distribution sort that partitions elements into a finite number of buckets, then sorts each bucket individually",
      "A hardware sorting circuit",
      "A sort requiring multi-threading",
      "A sort using hash tables with chaining"
    ],
    "answerIndex": 0,
    "explanation": "Bucket sort uniformly distributes elements across intervals/buckets, sorts each bucket, and flattens the result."
  },
  {
    "question": "What is the Binary Search algorithm requirement for input array?",
    "options": [
      "Array must be sorted in monotonic order (ascending or descending)",
      "Array must contain positive integers only",
      "Array must have power-of-two length",
      "Array must be allocated on the heap"
    ],
    "answerIndex": 0,
    "explanation": "Binary search requires the elements to be sorted so each midpoint comparison halves the search space."
  },
  {
    "question": "How do you avoid integer overflow when calculating midpoint `mid` in binary search?",
    "options": [
      "`mid = (low + high) / 2;`",
      "`mid = low + (high - low) / 2;`",
      "`mid = (low + high) >> 1;`",
      "`mid = low * 2 - high;`"
    ],
    "answerIndex": 1,
    "explanation": "`low + (high - low) / 2` avoids calculating `(low + high)` which could exceed `INT_MAX` for large index values."
  },
  {
    "question": "What is Exponential Search algorithm?",
    "options": [
      "An algorithm finding the range where the key resides by doubling the bound (1, 2, 4, 8, 16...) followed by binary search in that range",
      "Searching in exponentially growing trees",
      "An algorithm running in O(2^n) time",
      "A search for floating-point exponents"
    ],
    "answerIndex": 0,
    "explanation": "Exponential search finds range bounds `[2^(k-1), 2^k]` in O(log i) time, ideal for unbounded/infinite lists."
  },
  {
    "question": "What is Interpolation Search algorithm?",
    "options": [
      "A search algorithm for uniformly distributed sorted arrays that estimates the probe position using linear interpolation formula `pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])`",
      "A search using bezier curves",
      "A binary search with random midpoints",
      "A neural search algorithm"
    ],
    "answerIndex": 0,
    "explanation": "Interpolation search probes likely positions based on value distribution, achieving O(log log n) average time on uniformly distributed data."
  },
  {
    "question": "What is Ternary Search algorithm?",
    "options": [
      "A divide-and-conquer search that splits the sorted search space into 3 equal parts using two midpoints (`mid1` and `mid2`)",
      "A search for base-3 numbers",
      "A search on 3D arrays only",
      "A search with 3 target keys"
    ],
    "answerIndex": 0,
    "explanation": "Ternary search divides the search interval into 3 equal segments, running in O(log3 n) time (or finding unimodal function extrema)."
  },
  {
    "question": "What is the Jump Search algorithm time complexity for an array of size `N` with optimal jump block size `sqrt(N)`?",
    "options": [
      "O(sqrt(N))",
      "O(N)",
      "O(log N)",
      "O(N log N)"
    ],
    "answerIndex": 0,
    "explanation": "Jump search checks every step of `m = sqrt(N)` elements, then performs linear search within the matching block, totaling O(sqrt(N))."
  },
  {
    "question": "What is an Inversion Count in an array `arr`?",
    "options": [
      "Number of negative numbers",
      "Number of pairs `(i, j)` such that `i < j` and `arr[i] > arr[j]` (measuring how far the array is from being sorted)",
      "Number of reversed bits",
      "Number of duplicate elements"
    ],
    "answerIndex": 1,
    "explanation": "Inversion count measures disorder: an already sorted array has 0 inversions; reverse sorted array of size N has `N*(N-1)/2` inversions."
  },
  {
    "question": "How can Inversion Count be computed in O(N log N) time?",
    "options": [
      "Using modified Merge Sort algorithm",
      "Using Bubble Sort",
      "Using Binary Search",
      "Using Kadane's algorithm"
    ],
    "answerIndex": 0,
    "explanation": "Modified merge sort counts cross-inversions during the merge step in O(N log N) total time."
  },
  {
    "question": "What is a Monotonic Array?",
    "options": [
      "An array containing only a single unique value",
      "An array that is either entirely non-increasing or entirely non-decreasing",
      "An array of prime numbers",
      "An array stored in a single memory page"
    ],
    "answerIndex": 1,
    "explanation": "An array is monotonic if for all `i <= j`, `arr[i] <= arr[j]` (monotonically increasing) or `arr[i] >= arr[j]` (monotonically decreasing)."
  },
  {
    "question": "What is a Peak Element in an array?",
    "options": [
      "The absolute maximum element in the whole array",
      "An element that is strictly greater than or equal to its immediate neighbors",
      "The element stored at index `N/2`",
      "The element with highest memory address"
    ],
    "answerIndex": 1,
    "explanation": "A peak element `arr[i]` satisfies `arr[i] >= arr[i-1]` and `arr[i] >= arr[i+1]`. It can be found in O(log n) time using binary search."
  },
  {
    "question": "What is the Equilibrium Index of an array?",
    "options": [
      "An index `i` such that the sum of elements at lower indices equals the sum of elements at higher indices (`sum(arr[0..i-1]) == sum(arr[i+1..n-1])`)",
      "The exact middle index `n/2`",
      "The index where value is 0",
      "The index with median value"
    ],
    "answerIndex": 0,
    "explanation": "An equilibrium index partitions an array such that the left sub-array sum equals the right sub-array sum."
  },
  {
    "question": "What is the Trapping Rain Water problem on an array representing elevation bars?",
    "options": [
      "Computing the total units of water that can be trapped between elevation bars after raining",
      "Finding the tallest bar",
      "Sorting bars by height",
      "Simulating fluid dynamics in 3D"
    ],
    "answerIndex": 0,
    "explanation": "The trapping rain water problem calculates water volume trapped between elevation bars, solvable in O(N) time and O(1) space with two pointers."
  },
  {
    "question": "What is the Next Greater Element (NGE) problem on an array?",
    "options": [
      "Finding the first greater element to the right of each element in the array",
      "Sorting elements in descending order",
      "Incrementing all elements by 1",
      "Finding the maximum of the entire array"
    ],
    "answerIndex": 0,
    "explanation": "NGE finds the first element to the right that is strictly greater, solvable in linear O(N) time using a monotonic stack."
  },
  {
    "question": "What is the maximum number of dimensions an array can have in standard C99/C11?",
    "options": [
      "Maximum 2 dimensions",
      "Maximum 3 dimensions",
      "At least 12 dimensions guaranteed by standard (practically limited only by memory)",
      "Maximum 256 dimensions"
    ],
    "answerIndex": 2,
    "explanation": "The ISO C standard requires compilers to support at least 12 dimensions in an array declaration, limited in practice by system memory."
  },
  {
    "question": "How does C interpret the index notation `3[arr]` where `arr` is an integer array?",
    "options": [
      "Syntax error",
      "Identical to `arr[3]` because `*(3 + arr)` is commutative with `*(arr + 3)`",
      "Accesses the 3rd array in an array of arrays",
      "Multiplies all array elements by 3"
    ],
    "answerIndex": 1,
    "explanation": "In C, `a[b]` is defined as `*(a + b)`. Since addition is commutative, `arr[3]` and `3[arr]` produce the identical machine instruction `*(arr + 3)`."
  },
  {
    "question": "What does `int a[3][4];` allocate in memory?",
    "options": [
      "12 individual integer pointers",
      "A contiguous block of 12 integers (48 bytes on 32/64-bit int architecture)",
      "3 separate arrays allocated on different heap segments",
      "4 arrays of 3 elements"
    ],
    "answerIndex": 1,
    "explanation": "A 2D array in C is a single contiguous block of `3 * 4 = 12` integers."
  },
  {
    "question": "What is the value of `sizeof(arr)` when `arr` is declared as `int arr[3][4][5];` on a system with 4-byte ints?",
    "options": [
      "60 bytes",
      "240 bytes (3 * 4 * 5 * 4 bytes)",
      "480 bytes",
      "8 bytes"
    ],
    "answerIndex": 1,
    "explanation": "`3 * 4 * 5 = 60` elements * 4 bytes/int = 240 bytes total."
  },
  {
    "question": "What does `arr[0]` evaluate to for a 3D array `int arr[2][3][4];`?",
    "options": [
      "A single integer",
      "A 2D array of type `int[3][4]` decaying to `int(*)[4]`",
      "An array of 2 pointers",
      "The address of `arr[2]`"
    ],
    "answerIndex": 1,
    "explanation": "Subscripting one level of a 3D array `int[2][3][4]` yields a 2D array `int[3][4]`."
  },
  {
    "question": "How do you declare a flexible array member in a C99 structure?",
    "options": [
      "`struct S { int len; int data[]; };` (empty brackets as the last member)",
      "`struct S { int len; int *data; };`",
      "`struct S { int len; int data[0]; };`",
      "`struct S { int data[]; int len; };`"
    ],
    "answerIndex": 0,
    "explanation": "C99 flexible array members must be the last struct member with incomplete array type `type member[];`."
  },
  {
    "question": "Can a struct containing a C99 flexible array member be declared as a statically allocated variable array (e.g. `struct S s_arr[10];`)?",
    "options": [
      "Yes, without restrictions",
      "No, structures with flexible array members cannot be elements of arrays or nested as members of other structs",
      "Yes, if compiled with GCC -O2",
      "Only in C23"
    ],
    "answerIndex": 1,
    "explanation": "Because the size of a flexible array member is determined at dynamic allocation time, such structs cannot be placed in arrays."
  },
  {
    "question": "What does `sizeof(struct S)` evaluate to if `struct S { int len; char data[]; };` where `sizeof(int) == 4`?",
    "options": [
      "4 bytes (the flexible array member contributes 0 bytes to sizeof)",
      "5 bytes",
      "8 bytes with alignment padding only",
      "Compilation error"
    ],
    "answerIndex": 0,
    "explanation": "A flexible array member does not contribute to `sizeof` of the structure (aside from any alignment padding for the struct itself)."
  },
  {
    "question": "What is the proper way to allocate dynamic memory for a struct with a flexible array member `struct Packet { int len; char payload[]; };`?",
    "options": [
      "`struct Packet *p = malloc(sizeof(struct Packet) + n * sizeof(char));`",
      "`struct Packet *p = malloc(sizeof(struct Packet)); p->payload = malloc(n);`",
      "`struct Packet *p = malloc(sizeof(struct Packet) * n);`",
      "`struct Packet *p = calloc(n, sizeof(char));`"
    ],
    "answerIndex": 0,
    "explanation": "Allocating `sizeof(struct) + payload_size` places the struct header and dynamic trailing array in one single contiguous block."
  },
  {
    "question": "What is the memory advantage of a flexible array member over an embedded pointer member `char *payload`?",
    "options": [
      "It requires two separate calls to `malloc()` and `free()`",
      "It eliminates pointer overhead, prevents pointer chasing cache misses, and requires only a single `malloc()` and `free()` call",
      "It automatically doubles in size when filled",
      "It allows payload to be placed in ROM"
    ],
    "answerIndex": 1,
    "explanation": "Flexible array members keep header and payload contiguous in memory, eliminating pointer overhead, reducing fragmentation, and improving cache locality."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[5] = {1, 2, 3, 4, 5};\nint *p = a;\nprintf(\"%d\", *(p + 3));\n```",
    "options": [
      "1",
      "3",
      "4",
      "5"
    ],
    "answerIndex": 2,
    "explanation": "`p + 3` points to index 3 (4th element), which is 4."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[3] = {10, 20, 30};\nint *p = a;\nprintf(\"%d \", *p++);\nprintf(\"%d\", *p);\n```",
    "options": [
      "10 20",
      "20 20",
      "10 10",
      "20 30"
    ],
    "answerIndex": 0,
    "explanation": "`*p++` evaluates to `*p` (10) and then increments pointer `p` to point to the next element (20)."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[3] = {10, 20, 30};\nint *p = a;\nprintf(\"%d\", (*p)++);\n```",
    "options": [
      "11",
      "10",
      "20",
      "Garbage"
    ],
    "answerIndex": 1,
    "explanation": "`(*p)++` returns the original value of `a[0]` (10) and then increments the value at `a[0]` to 11."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[3] = {10, 20, 30};\nint *p = a;\nprintf(\"%d\", *++p);\n```",
    "options": [
      "10",
      "20",
      "30",
      "11"
    ],
    "answerIndex": 1,
    "explanation": "`*++p` increments pointer `p` first to point to `a[1]`, then dereferences to get 20."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[3] = {10, 20, 30};\nint *p = a;\nprintf(\"%d\", ++*p);\n```",
    "options": [
      "10",
      "11",
      "20",
      "Garbage"
    ],
    "answerIndex": 1,
    "explanation": "`++*p` dereferences `p` to get `a[0]` (10), increments the value to 11, and yields 11."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[2][2] = {{1, 2}, {3, 4}};\nprintf(\"%d\", *(*(a + 1) + 1));\n```",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "answerIndex": 3,
    "explanation": "`*(*(a + 1) + 1)` is pointer notation for `a[1][1]`, which is 4."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[5] = {0};\nprintf(\"%d\", a[4]);\n```",
    "options": [
      "Garbage",
      "0",
      "4",
      "Compilation error"
    ],
    "answerIndex": 1,
    "explanation": "Initializing with `{0}` initializes the entire array to 0."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint a[] = {1, 2, 3, 4, 5, 6};\nprintf(\"%zu\", sizeof(a) / sizeof(a[0]));\n```",
    "options": [
      "4",
      "5",
      "6",
      "24"
    ],
    "answerIndex": 2,
    "explanation": "Total bytes = 24. Element size = 4. Number of elements = 24 / 4 = 6."
  },
  {
    "question": "What is the Output of the following code?\n```c\nint arr[5] = {10, 20, 30, 40, 50};\nint *p = &arr[2];\nprintf(\"%d\", p[-1]);\n```",
    "options": [
      "10",
      "20",
      "30",
      "Compilation error (negative index)"
    ],
    "answerIndex": 1,
    "explanation": "In C pointer arithmetic, `p[-1]` equals `*(p - 1)`. Since `p` points to `arr[2]`, `p[-1]` accesses `arr[1]` (20)."
  },
  {
    "question": "What does the expression `(char*)p2 - (char*)p1` calculate when `p1` and `p2` point into the same array?",
    "options": [
      "The number of array elements between `p1` and `p2`",
      "The exact distance between the two addresses in raw bytes",
      "The product of memory addresses",
      "Undefined behavior"
    ],
    "answerIndex": 1,
    "explanation": "Casting pointers to `char*` before subtraction yields the exact distance in bytes (as `sizeof(char) == 1`)."
  },
  {
    "question": "Array Mastery Assessment Practice Item #200: What is the primary benefit of row-major contiguous array allocation in high-performance C systems?",
    "options": [
      "Maximizes CPU cache line hits and enables SIMD vectorization",
      "Allows runtime resizing without reallocation",
      "Enables automatic garbage collection",
      "Bypasses MMU translation"
    ],
    "answerIndex": 0,
    "explanation": "Contiguous row-major memory layout enables hardware prefetchers, maximizes L1/L2 cache locality, and allows SIMD parallel vector instructions."
  }
];

export default questions;
export { questions };
