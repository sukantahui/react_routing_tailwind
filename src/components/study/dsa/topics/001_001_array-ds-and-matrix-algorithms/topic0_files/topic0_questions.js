const questions = [
  {
    "id": 1,
    "question": "What is the physical address formula for accessing element `arr[i]` of type T with base address Base?",
    "options": [
      "Address(arr[i]) = Base + (i * sizeof(T))",
      "Address(arr[i]) = Base + i",
      "Address(arr[i]) = Base * (i + sizeof(T))",
      "Address(arr[i]) = Base + (i / sizeof(T))"
    ],
    "answer": "Address(arr[i]) = Base + (i * sizeof(T))",
    "explanation": "Because elements are stored contiguously in memory, the physical byte offset of index `i` is `i * sizeof(T)`. Adding this offset to the base pointer gives the exact memory address in O(1) time."
  },
  {
    "id": 2,
    "question": "If an array `int arr[5]` starts at memory address 0x2000 on a 64-bit architecture where `sizeof(int) == 4`, what is the address of `arr[3]`?",
    "options": [
      "0x200C (0x2000 + 3 * 4 = 0x2000 + 12)",
      "0x2003",
      "0x2018",
      "0x2004"
    ],
    "answer": "0x200C (0x2000 + 3 * 4 = 0x2000 + 12)",
    "explanation": "Offset in decimal is 3 * 4 = 12 bytes. 12 in hexadecimal is 0xC. Therefore, address is 0x2000 + 0x000C = 0x200C."
  },
  {
    "id": 3,
    "question": "Why does evaluating `arr[i]` take strictly O(1) constant time regardless of array length N?",
    "options": [
      "Because CPU hardware computes the direct physical memory address using a single addition and multiplication step (Base + i * size)",
      "Because arrays are stored on disk",
      "Because the operating system traverses linked pointers",
      "Because the CPU caches the entire RAM"
    ],
    "answer": "Because CPU hardware computes the direct physical memory address using a single addition and multiplication step (Base + i * size)",
    "explanation": "Direct offset calculation requires exactly one integer multiplication and one addition instruction (e.g. `LEA` on x86-64), taking O(1) clock cycles."
  },
  {
    "id": 4,
    "question": "What happens in C when you write to an out-of-bounds index such as `arr[10] = 50` on a 5-element array allocated on the stack?",
    "options": [
      "Undefined Behavior: It silently overwrites adjacent stack memory (e.g. saved frame pointer or return address), potentially causing a crash or security vulnerability",
      "The C runtime throws an `ArrayIndexOutOfBoundsException`",
      "The stack automatically expands to accommodate index 10",
      "The value 50 is ignored"
    ],
    "answer": "Undefined Behavior: It silently overwrites adjacent stack memory (e.g. saved frame pointer or return address), potentially causing a crash or security vulnerability",
    "explanation": "C has zero runtime boundary checks. Writing out-of-bounds corrupts the call stack (stack smashing) or adjacent heap chunks."
  },
  {
    "id": 5,
    "question": "What is the difference between `sizeof(arr)` for a static array `int arr[10]` versus a dynamic pointer `int* ptr = malloc(10 * sizeof(int))`?",
    "options": [
      "`sizeof(arr)` returns 40 bytes (total array footprint), while `sizeof(ptr)` returns 8 bytes (the pointer size on 64-bit systems)",
      "Both return 40 bytes",
      "Both return 8 bytes",
      "`sizeof(arr)` returns 10 while `sizeof(ptr)` returns 40"
    ],
    "answer": "`sizeof(arr)` returns 40 bytes (total array footprint), while `sizeof(ptr)` returns 8 bytes (the pointer size on 64-bit systems)",
    "explanation": "In C, `sizeof` on an array in scope returns total allocated bytes (`10 * 4 = 40`). A pointer decayed to `int*` returns pointer size (`8` bytes on 64-bit systems)."
  },
  {
    "id": 6,
    "question": "What is the meaning of 'Array Decay' in C when an array is passed as a function argument?",
    "options": [
      "The array implicitly converts (decays) into a pointer to its first element (`&arr[0]`), losing its compile-time size information",
      "The array elements are zeroed out",
      "The array memory is deallocated",
      "The array becomes immutable"
    ],
    "answer": "The array implicitly converts (decays) into a pointer to its first element (`&arr[0]`), losing its compile-time size information",
    "explanation": "When passed to a function `void func(int a[])`, `a` is actually `int* a`. Inside `func`, `sizeof(a)` evaluates to pointer size (8 bytes), not the full array byte length."
  },
  {
    "id": 7,
    "question": "How does pointer arithmetic scale when incrementing an `int*` pointer `p++` versus a `double*` pointer `q++`?",
    "options": [
      "`p++` increases the byte address by `sizeof(int)` (4 bytes), while `q++` increases the byte address by `sizeof(double)` (8 bytes)",
      "Both increase by exactly 1 byte",
      "Both increase by 8 bytes",
      "`p++` increases by 4 bits"
    ],
    "answer": "`p++` increases the byte address by `sizeof(int)` (4 bytes), while `q++` increases the byte address by `sizeof(double)` (8 bytes)",
    "explanation": "In C, adding integer `k` to pointer `p` advances the physical memory address by `k * sizeof(*p)` bytes."
  },
  {
    "id": 8,
    "question": "Which of the following C expressions is equivalent to `arr[i]` according to the C standard?",
    "options": [
      "`*(arr + i)` and `i[arr]` and `*(i + arr)`",
      "`&arr + i`",
      "`arr->i`",
      "`*(arr * i)`"
    ],
    "answer": "`*(arr + i)` and `i[arr]` and `*(i + arr)`",
    "explanation": "The C subscript operator is defined as `E1[E2] == * (E1 + E2)`. Since pointer addition is commutative (`E1 + E2 == E2 + E1`), `arr[i]` is identical to `*(arr + i)`, `*(i + arr)`, and `i[arr]`."
  },
  {
    "id": 9,
    "question": "What is the time complexity to insert an element at index 0 (the beginning) of a contiguous array of N elements?",
    "options": [
      "O(N) because all N existing elements must be shifted one position to the right",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    "answer": "O(N) because all N existing elements must be shifted one position to the right",
    "explanation": "To preserve contiguous order, inserting at index 0 requires shifting elements from index `N-1` down to `0` rightwards by one slot, performing N copy operations."
  },
  {
    "id": 10,
    "question": "What is the time complexity to delete an element at index `k` from an array of N elements if order MUST be preserved?",
    "options": [
      "O(N - k) which is O(N) in the worst case",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    "answer": "O(N - k) which is O(N) in the worst case",
    "explanation": "All `N - 1 - k` elements following index `k` must be shifted one position leftwards to close the gap."
  },
  {
    "id": 11,
    "question": "If element order does NOT need to be preserved, how can an element at index `k` be deleted in O(1) constant time?",
    "options": [
      "Overwrite `arr[k]` with the last element `arr[N-1]` and decrement the array size counter by 1",
      "Set `arr[k] = 0`",
      "Call `free(&arr[k])`",
      "Shift all elements right"
    ],
    "answer": "Overwrite `arr[k]` with the last element `arr[N-1]` and decrement the array size counter by 1",
    "explanation": "Swap-with-last (unordered erase) copies `arr[N-1]` into slot `k` and decrements size in O(1) operations."
  },
  {
    "id": 12,
    "question": "What hardware mechanism explains why contiguous array iterations run significantly faster than linked list node traversals?",
    "options": [
      "CPU Spatial Locality: adjacent array bytes are loaded into 64-byte L1/L2 hardware Cache Lines, resulting in near 100% cache hits",
      "Arrays bypass the CPU entirely",
      "Linked lists use virtual memory",
      "Arrays disable compiler optimizations"
    ],
    "answer": "CPU Spatial Locality: adjacent array bytes are loaded into 64-byte L1/L2 hardware Cache Lines, resulting in near 100% cache hits",
    "explanation": "When `arr[0]` is read, the hardware prefetcher loads the next 64 bytes into L1 cache, allowing subsequent elements to be read in ~1ns instead of ~100ns main RAM latency."
  },
  {
    "id": 13,
    "question": "What is the result of subtracting two pointers pointing to elements of the same array: `&arr[7] - &arr[2]`?",
    "options": [
      "5 (the number of elements of type T between the two pointers)",
      "20 bytes",
      "A null pointer",
      "Compile error"
    ],
    "answer": "5 (the number of elements of type T between the two pointers)",
    "explanation": "Pointer subtraction `p2 - p1` yields `ptrdiff_t`, which calculates `(Address2 - Address1) / sizeof(T)`. Here `(7 - 2) = 5` elements."
  },
  {
    "id": 14,
    "question": "What is undefined behavior when comparing two pointers with relational operators (`p1 < p2`) in C?",
    "options": [
      "Comparing pointers that do NOT point to elements of the same array or struct object",
      "Comparing two valid array pointers",
      "Checking `p1 == NULL`",
      "Comparing pointers of the same type"
    ],
    "answer": "Comparing pointers that do NOT point to elements of the same array or struct object",
    "explanation": "The C ISO standard specifies that pointer relational comparisons (`<`, `>`, `<=`, `>=`) are only valid if both pointers point within or one element past the boundary of the same object."
  },
  {
    "id": 15,
    "question": "Is it legal in C to create a pointer pointing one element past the end of an array (e.g. `int* end = &arr[N]`)?",
    "options": [
      "YES: It is valid to compute and hold the address `&arr[N]`, but dereferencing `*end` is strictly illegal and undefined behavior",
      "NO: Creating `&arr[N]` triggers a compile error",
      "YES: Dereferencing `*end` returns 0",
      "NO: It causes an immediate crash"
    ],
    "answer": "YES: It is valid to compute and hold the address `&arr[N]`, but dereferencing `*end` is strictly illegal and undefined behavior",
    "explanation": "C guarantees that pointers one-past-the-end can be calculated for use in loop termination bounds (like C++ `end()` iterators), but dereferencing them is undefined behavior."
  },
  {
    "id": 16,
    "question": "What is the memory layout of an array of structs `struct Point { int x; int y; } pts[10]`?",
    "options": [
      "Contiguous alternating sequences: `[x0, y0, x1, y1, x2, y2, ...]` with zero gap between consecutive structs (Array of Structures - AoS)",
      "Separate arrays for all X and all Y on the heap",
      "Pointers to heap nodes",
      "A hash table"
    ],
    "answer": "Contiguous alternating sequences: `[x0, y0, x1, y1, x2, y2, ...]` with zero gap between consecutive structs (Array of Structures - AoS)",
    "explanation": "An Array of Structures (AoS) places full struct instances contiguously back-to-back in memory."
  },
  {
    "id": 17,
    "question": "What is Struct Padding and how does it affect array footprint in C?",
    "options": [
      "The compiler inserts unused alignment bytes so struct fields align to natural hardware boundaries (e.g. 4 or 8 bytes), increasing each array element's total byte size",
      "Padding adds extra array elements",
      "Padding encrypts memory",
      "Padding compresses strings"
    ],
    "answer": "The compiler inserts unused alignment bytes so struct fields align to natural hardware boundaries (e.g. 4 or 8 bytes), increasing each array element's total byte size",
    "explanation": "For `struct Node { char c; int i; }`, `sizeof(Node)` is 8 bytes (1 char + 3 padding bytes + 4 int) to maintain 4-byte alignment, making a 10-element array consume 80 bytes instead of 50."
  },
  {
    "id": 18,
    "question": "In C99, what is a Variable-Length Array (VLA) (e.g. `int arr[n]` where `n` is a runtime variable)?",
    "options": [
      "An array allocated on the physical Call Stack whose size is determined at runtime upon entering the enclosing block",
      "An array allocated automatically on the Heap with `malloc`",
      "A resizable vector",
      "An array stored in CPU registers"
    ],
    "answer": "An array allocated on the physical Call Stack whose size is determined at runtime upon entering the enclosing block",
    "explanation": "VLAs allocate memory on the execution stack frame. If `n` is excessively large (e.g. 10,000,000), it causes an immediate stack overflow crash without returning NULL."
  },
  {
    "id": 19,
    "question": "Why do enterprise systems programming standards (like MISRA C and Linux kernel) discourage the use of VLAs?",
    "options": [
      "VLAs risk unrecoverable Stack Overflow crashes because stack memory cannot be checked for allocation failure",
      "VLAs are too slow to access",
      "VLAs cannot store integers",
      "VLAs require heap garbage collection"
    ],
    "answer": "VLAs risk unrecoverable Stack Overflow crashes because stack memory cannot be checked for allocation failure",
    "explanation": "Stack allocations have fixed OS limits (typically 1-8 MB). Unchecked runtime variable allocations can blow through the stack guard page and cause fatal crashes."
  },
  {
    "id": 20,
    "question": "What is the time complexity of reversing an array of N elements in-place using two pointers?",
    "options": [
      "O(N) time and O(1) auxiliary space",
      "O(N^2) time and O(N) space",
      "O(log N) time and O(1) space",
      "O(N log N) time and O(N) space"
    ],
    "answer": "O(N) time and O(1) auxiliary space",
    "explanation": "Swapping elements from outer ends `left` and `right` towards the center takes `N / 2` swap steps, executing in linear O(N) time and O(1) extra space."
  },
  {
    "id": 21,
    "question": "What is the purpose of `memset(arr, 0, sizeof(arr))` in C?",
    "options": [
      "Fills every byte of the array's memory block with 0 in high-speed hardware block-fill instructions",
      "Deallocates the array",
      "Reverses the array",
      "Sorts the array"
    ],
    "answer": "Fills every byte of the array's memory block with 0 in high-speed hardware block-fill instructions",
    "explanation": "`memset(dest, val, count)` writes the byte value `val` across `count` contiguous memory addresses."
  },
  {
    "id": 22,
    "question": "Why does `memset(arr, 1, sizeof(arr))` FAIL to set all elements of an `int arr[10]` array to the integer 1?",
    "options": [
      "Because `memset` operates byte-by-byte, filling each 4-byte integer with `0x01010101` (value 16,843,009) rather than integer 1",
      "Because memset only works on strings",
      "Because 1 is a reserved character",
      "Because memset requires negative numbers"
    ],
    "answer": "Because `memset` operates byte-by-byte, filling each 4-byte integer with `0x01010101` (value 16,843,009) rather than integer 1",
    "explanation": "`memset` sets individual byte values. For a 4-byte integer, setting every byte to `0x01` results in `0x01010101 = 16,843,009`."
  },
  {
    "id": 23,
    "question": "What is the difference between `memcpy()` and `memmove()` when copying array elements within the same buffer?",
    "options": [
      "`memmove()` safely handles overlapping memory source and destination regions, while `memcpy()` leads to undefined corruption if regions overlap",
      "`memcpy()` is for integers and `memmove()` is for floats",
      "`memcpy()` allocates heap memory automatically",
      "There is no difference"
    ],
    "answer": "`memmove()` safely handles overlapping memory source and destination regions, while `memcpy()` leads to undefined corruption if regions overlap",
    "explanation": "When shifting array elements (e.g. shifting elements right during insertion), source and destination overlap. `memmove()` uses a temporary buffer or copies in reverse direction to prevent self-overwriting."
  },
  {
    "id": 24,
    "question": "How can you find the second largest element in a contiguous array of N elements in a single pass?",
    "options": [
      "Maintain two variables `firstMax` and `secondMax`, updating both in a single O(N) linear scan",
      "Sort the array with QuickSort in O(N log N)",
      "Run two nested loops in O(N^2)",
      "Use binary search"
    ],
    "answer": "Maintain two variables `firstMax` and `secondMax`, updating both in a single O(N) linear scan",
    "explanation": "In a single pass through the array, if `arr[i] > firstMax`, set `secondMax = firstMax` and `firstMax = arr[i]`. If `arr[i] < firstMax && arr[i] > secondMax`, update `secondMax = arr[i]`."
  },
  {
    "id": 25,
    "question": "What is the maximum number of elements an array declared as `int arr[100]` can safely store?",
    "options": [
      "100 elements (at indices 0 through 99)",
      "101 elements",
      "99 elements",
      "Unlimited"
    ],
    "answer": "100 elements (at indices 0 through 99)",
    "explanation": "An array dimension of size N provides exactly N discrete slots, indexed from `0` to `N - 1`."
  },
  {
    "id": 26,
    "question": "What is the primary operational difference between `malloc(n * sizeof(int))` and `calloc(n, sizeof(int))` in C?",
    "options": [
      "`malloc` leaves allocated memory uninitialized containing arbitrary garbage values, whereas `calloc` zeroes out all allocated bytes (0x00)",
      "`malloc` allocates memory on the Stack while `calloc` allocates on the Heap",
      "`malloc` is only for integers while `calloc` is for characters",
      "`calloc` cannot be freed with `free()`"
    ],
    "answer": "`malloc` leaves allocated memory uninitialized containing arbitrary garbage values, whereas `calloc` zeroes out all allocated bytes (0x00)",
    "explanation": "`malloc` directly returns the allocated heap chunk without zeroing bits, making it faster when all elements are overwritten immediately. `calloc` guarantees zero-initialization, preventing uninitialized memory reads."
  },
  {
    "id": 27,
    "question": "Why does `calloc(num_elements, element_size)` take two arguments instead of one total byte count?",
    "options": [
      "To check for integer multiplication overflow before attempting memory allocation",
      "Because the C compiler requires row and column dimensions",
      "To separate memory between CPU and GPU",
      "Because of a syntax legacy in C89"
    ],
    "answer": "To check for integer multiplication overflow before attempting memory allocation",
    "explanation": "If `num_elements * element_size` exceeds `SIZE_MAX`, an integer overflow wraps around to a small number. `calloc` detects this multiplication overflow internally and safely returns `NULL` without allocating inadequate memory."
  },
  {
    "id": 28,
    "question": "What does `realloc(ptr, new_size)` do if the existing heap memory block cannot be expanded in-place?",
    "options": [
      "It allocates a new contiguous memory block elsewhere on the heap, copies existing data over, automatically frees the old block, and returns the new pointer",
      "It throws an exception and terminates the process",
      "It corrupts adjacent heap memory chunks",
      "It converts the array to a linked list"
    ],
    "answer": "It allocates a new contiguous memory block elsewhere on the heap, copies existing data over, automatically frees the old block, and returns the new pointer",
    "explanation": "When contiguous space adjacent to the current block is unavailable, `realloc` allocates a fresh block of `new_size`, migrates `min(old_size, new_size)` bytes, releases the old block, and returns the updated pointer address."
  },
  {
    "id": 29,
    "question": "Why is writing `ptr = NULL;` immediately after `free(ptr);` considered an essential defensive programming standard?",
    "options": [
      "It eliminates Dangling Pointers and ensures any subsequent accidental dereference crashes immediately at address 0x0 rather than corrupting memory silently (Use-After-Free)",
      "It returns physical RAM to the motherboard faster",
      "It speeds up CPU clock cycles",
      "It is required by the C standard to avoid compilation errors"
    ],
    "answer": "It eliminates Dangling Pointers and ensures any subsequent accidental dereference crashes immediately at address 0x0 rather than corrupting memory silently (Use-After-Free)",
    "explanation": "`free(ptr)` marks heap memory as reusable by the allocator, but the variable `ptr` retains the dead memory address. Setting `ptr = NULL` neutralizes the pointer. Furthermore, `free(NULL)` is a safe no-op in standard C, preventing double-free bugs."
  },
  {
    "id": 30,
    "question": "What is the result of dereferencing a NULL pointer `int *p = NULL; int val = *p;` on modern protected memory operating systems?",
    "options": [
      "Segmentation Fault (SIGSEGV) / Access Violation due to page fault on protected address 0x0",
      "The value 0 is returned",
      "The program prompts the user for input",
      "The CPU resets"
    ],
    "answer": "Segmentation Fault (SIGSEGV) / Access Violation due to page fault on protected address 0x0",
    "explanation": "Virtual memory systems deliberately unmap the lowest address page (`0x00000000`) so that dereferencing a NULL pointer triggers an immediate MMU page fault and terminates the faulty process before data corruption occurs."
  }
];

export default questions;
