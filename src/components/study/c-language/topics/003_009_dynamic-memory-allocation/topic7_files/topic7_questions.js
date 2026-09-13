// 200 Comprehensive MCQs for Module 003_009: Dynamic Memory Allocation & Heap Management
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

export const questions = [
  // 1-25: Stack vs Heap & Process Memory Layout
  {
    question: "Which process memory segment stores dynamically allocated memory in C?",
    options: ["Stack segment", "Heap segment", "Text segment", "BSS segment"],
    correctAnswer: 1,
    explanation: "Dynamically allocated memory requested via malloc, calloc, or realloc resides in the Heap segment."
  },
  {
    question: "In standard x86/x64 process virtual address spaces, in which direction does the stack grow?",
    options: ["Upward toward higher addresses", "Downward toward lower addresses", "Horizontally across RAM", "Randomly"],
    correctAnswer: 1,
    explanation: "The runtime stack grows downward toward lower memory addresses, while the heap grows upward."
  },
  {
    question: "What happens when recursive function calls exhaust the stack memory limit?",
    options: ["Memory Leak", "Stack Overflow crash (Segmentation Fault)", "Automatic heap spillover", "CPU freeze"],
    correctAnswer: 1,
    explanation: "Excessive stack frames exceeding the OS stack limit cause a Stack Overflow segmentation fault."
  },
  {
    question: "Which header file must be included to use malloc, calloc, realloc, and free in C?",
    options: ["<stdio.h>", "<stdlib.h>", "<string.h>", "<memory.h>"],
    correctAnswer: 1,
    explanation: "Dynamic memory functions are declared in standard library header <stdlib.h>."
  },
  {
    question: "Where are uninitialized global and static variables stored in process memory?",
    options: [".text segment", ".data segment", ".bss segment", "Heap segment"],
    correctAnswer: 2,
    explanation: "Uninitialized global and static variables are stored in the .bss segment and zero-filled by the OS."
  },
  {
    question: "Where are initialized global variables with non-zero values stored?",
    options: [".text segment", ".data segment", ".bss segment", "Stack segment"],
    correctAnswer: 1,
    explanation: "Initialized global and static variables with non-zero values reside in the .data segment."
  },
  {
    question: "What is the typical default stack size limit on modern 64-bit Linux systems?",
    options: ["64 KB", "8 MB (or 10 MB)", "4 GB", "Unlimited"],
    correctAnswer: 1,
    explanation: "Modern Linux OS environments typically configure a stack limit of 8MB (viewable via ulimit -s)."
  },
  {
    question: "What is the lifetime of a variable allocated on the runtime Stack?",
    options: ["Until the program terminates", "Until the function/block scope is exited", "Until free() is called", "Indefinite"],
    correctAnswer: 1,
    explanation: "Stack variables are automatic: they exist only while their enclosing function/block is executing."
  },
  {
    question: "What is the lifetime of a memory block allocated on the Heap?",
    options: ["Until the enclosing function returns", "Until free() is explicitly called or process terminates", "10 seconds", "Until next loop iteration"],
    correctAnswer: 1,
    explanation: "Heap memory persists dynamically across function boundaries until explicitly freed or process exit."
  },
  {
    question: "Why is stack memory allocation faster than heap memory allocation?",
    options: ["Stack memory uses faster physical RAM chips", "Stack allocation requires only a single Stack Pointer (SP) register adjustment", "Heap memory is encrypted", "Stack memory bypasses the CPU cache"],
    correctAnswer: 1,
    explanation: "Stack allocation requires only adjusting the CPU stack pointer register (RSP), taking 1 CPU cycle."
  },
  {
    question: "What is the return type of malloc() in standard C?",
    options: ["int*", "void*", "char*", "size_t"],
    correctAnswer: 1,
    explanation: "malloc() returns a generic 'void*' pointer representing untyped raw memory."
  },
  {
    question: "In pure standard C, is an explicit typecast required when calling malloc (e.g. `(int*)malloc(...)`)?",
    options: ["Yes, mandatory in C", "No, void* implicitly converts to any data pointer in C", "Only in C11", "Only on 32-bit systems"],
    correctAnswer: 1,
    explanation: "In C, 'void*' implicitly converts to any object pointer type without an explicit cast."
  },
  {
    question: "What happens if a program returns the address of a local automatic stack variable?",
    options: ["Memory leak", "Dangling stack pointer causing Undefined Behavior", "Automatic heap promotion", "Compilation error always"],
    correctAnswer: 1,
    explanation: "Returning a pointer to a destroyed stack frame creates a dangling pointer and causes undefined behavior."
  },
  {
    question: "Where is a pointer variable itself stored when it points to heap memory inside a function?",
    options: ["On the Heap", "On the Stack (or register)", "In .text segment", "In .bss segment"],
    correctAnswer: 1,
    explanation: "The pointer variable lives on the local function Stack, while the memory block it points to is on the Heap."
  },
  {
    question: "What is the byte size of a pointer variable on a 64-bit architecture?",
    options: ["2 bytes", "4 bytes", "8 bytes", "16 bytes"],
    correctAnswer: 2,
    explanation: "On 64-bit systems, all pointers are 8 bytes (64 bits) wide."
  },
  {
    question: "What happens if malloc() cannot find sufficient contiguous free memory on the heap?",
    options: ["It throws an exception", "It returns NULL", "It crashes the CPU", "It returns address 0x1"],
    correctAnswer: 1,
    explanation: "When memory allocation fails, standard malloc() returns a NULL pointer."
  },
  {
    question: "What is the parameter type passed to malloc()?",
    options: ["int", "size_t", "double", "char*"],
    correctAnswer: 1,
    explanation: "malloc() accepts a parameter of type 'size_t', representing the total number of bytes to allocate."
  },
  {
    question: "What is the definition of 'size_t' in C?",
    options: ["A signed 32-bit integer", "An unsigned integer type capable of representing object sizes", "A floating-point type", "An alias for int*"],
    correctAnswer: 1,
    explanation: "'size_t' is an unsigned integer type returned by sizeof and used for memory byte counts."
  },
  {
    question: "Which segment contains the compiled executable machine code instructions?",
    options: [".text / Code segment", ".data segment", ".bss segment", "Heap segment"],
    correctAnswer: 0,
    explanation: "Compiled CPU machine instructions are stored in the read-only .text segment."
  },
  {
    question: "What happens when an application attempts to write to the .text segment?",
    options: ["Self-modifying code executes", "Segmentation fault / Access violation", "Memory leak", "No effect"],
    correctAnswer: 1,
    explanation: "The .text segment is marked read-only by the OS MMU; writing to it triggers an immediate segfault."
  },
  {
    question: "Can heap memory be shared across multiple functions without global variables?",
    options: ["No", "Yes, by passing the pointer returned by malloc between functions", "Only with static pointers", "Only via file system"],
    correctAnswer: 1,
    explanation: "Heap memory persists across function calls; passing the pointer allows any function to access it."
  },
  {
    question: "What happens if a program allocates 10 MB on the stack inside a function?",
    options: ["Allocates cleanly", "Stack Overflow crash", "Spills into heap automatically", "Compiler converts to static"],
    correctAnswer: 1,
    explanation: "10 MB exceeds standard stack limits (8MB), causing an immediate Stack Overflow."
  },
  {
    question: "What system call does the Linux glibc allocator typically use to expand the heap boundary?",
    options: ["fork()", "brk() / sbrk() or mmap()", "execve()", "read()"],
    correctAnswer: 1,
    explanation: "glibc memory allocators use brk()/sbrk() for small heap increments and mmap() for large blocks."
  },
  {
    question: "What is the address value of NULL in modern C implementations?",
    options: ["-1", "0 (or (void*)0)", "0xFFFFFFFF", "Undefined"],
    correctAnswer: 1,
    explanation: "NULL is defined as an integer constant expression with value 0, typically '((void*)0)'."
  },
  {
    question: "What occurs if you attempt to dereference a NULL pointer (`*ptr = 5;`)?",
    options: ["Allocates automatically", "Segmentation fault / Access violation crash", "Returns 0", "Logs a warning"],
    correctAnswer: 1,
    explanation: "Page 0 is protected by the OS; dereferencing NULL causes an immediate hardware page fault crash."
  },

  // 26-50: malloc() Mechanics & Sizing
  {
    question: "What are the contents of memory returned by malloc()?",
    options: ["All zeroes", "All ones", "Indeterminate garbage values", "NULL bytes"],
    correctAnswer: 2,
    explanation: "malloc() does not clear memory; it contains leftover residual bit patterns (garbage values)."
  },
  {
    question: "How should you allocate an array of 50 integers using malloc()?",
    options: [
      "int *arr = malloc(50);",
      "int *arr = malloc(50 * sizeof(int));",
      "int *arr = malloc(sizeof(50));",
      "int *arr = malloc(int, 50);"
    ],
    correctAnswer: 1,
    explanation: "You must multiply the number of elements (50) by the byte size of each element (sizeof(int))."
  },
  {
    question: "Why is `int *p = malloc(n * sizeof(*p));` preferred over `sizeof(int)`?",
    options: [
      "It executes faster",
      "It is type-safe: if p is changed to double* later, sizeof stays in sync automatically",
      "It initializes memory to zero",
      "It prevents stack overflow"
    ],
    correctAnswer: 1,
    explanation: "'sizeof(*p)' automatically matches the dereferenced pointer type, preventing refactoring bugs."
  },
  {
    question: "What is the return value of malloc(0) according to the C standard?",
    options: [
      "Always NULL",
      "Always crashes",
      "Either NULL or a non-null pointer that can be safely passed to free()",
      "Allocates 1 byte"
    ],
    correctAnswer: 2,
    explanation: "malloc(0) is implementation-defined: it returns either NULL or a unique non-dereferenceable pointer."
  },
  {
    question: "What is the correct defensive check after calling malloc?",
    options: [
      "if (ptr != 0)",
      "if (ptr == NULL) { /* handle error */ }",
      "if (sizeof(ptr) == 0)",
      "if (*ptr == 0)"
    ],
    correctAnswer: 1,
    explanation: "Always check 'if (ptr == NULL)' to verify allocation succeeded before dereferencing."
  },
  {
    question: "How do you dynamically allocate memory for a struct named `Employee`?",
    options: [
      "struct Employee *e = malloc(sizeof(struct Employee));",
      "struct Employee *e = malloc(Employee);",
      "struct Employee *e = malloc(sizeof(e));",
      "struct Employee *e = calloc(sizeof(Employee));"
    ],
    correctAnswer: 0,
    explanation: "'malloc(sizeof(struct Employee))' allocates the exact number of bytes required for the struct."
  },
  {
    question: "What operator is used to access members of a dynamically allocated struct pointer?",
    options: [". (dot)", "-> (arrow)", ":: (scope)", "* (dereference only)"],
    correctAnswer: 1,
    explanation: "The arrow operator '->' dereferences the struct pointer and accesses the member ('ptr->field')."
  },
  {
    question: "What is the expression `ptr->field` shorthand for?",
    options: ["(*ptr).field", "&ptr.field", "*(ptr.field)", "ptr.field"],
    correctAnswer: 0,
    explanation: "'ptr->field' is exact syntactic shorthand for '(*ptr).field'."
  },
  {
    question: "Can malloc allocate memory across non-contiguous physical RAM pages?",
    options: [
      "No, virtual memory must match physical memory",
      "Yes, virtual addresses are contiguous while physical pages may be scattered by the MMU",
      "Only in kernel mode",
      "Only on 32-bit systems"
    ],
    correctAnswer: 1,
    explanation: "The virtual address space returned by malloc is contiguous, mapped to arbitrary physical pages by the MMU."
  },
  {
    question: "What is alignment in dynamic memory allocation?",
    options: [
      "Alphabetical sorting of variables",
      "Placing memory blocks at address multiples suitable for CPU hardware architecture",
      "Zero-filling memory",
      "Stack alignment"
    ],
    correctAnswer: 1,
    explanation: "malloc returns memory addresses aligned to hardware requirements (e.g. 16-byte aligned on 64-bit CPUs)."
  },
  {
    question: "What happens if you write beyond the size allocated by malloc (`heap buffer overflow`)?",
    options: [
      "Memory automatically expands",
      "Allocator heap metadata corruption and undefined behavior",
      "Compilation error",
      "Garbage collector cleans it"
    ],
    correctAnswer: 1,
    explanation: "Writing past allocated heap bounds corrupts adjacent heap chunks, leading to crashes or security exploits."
  },
  {
    question: "How do you allocate memory for a dynamic string of 100 characters including the null terminator?",
    options: [
      "char *s = malloc(100);",
      "char *s = malloc(101 * sizeof(char));",
      "char *s = malloc(100 * sizeof(char*));",
      "char *s = malloc(sizeof(string));"
    ],
    correctAnswer: 1,
    explanation: "You must allocate 100 + 1 bytes to include space for the null terminator '\\0'."
  },
  {
    question: "What is the value of `sizeof(char)` in standard C?",
    options: ["Always 1 byte", "2 bytes", "4 bytes", "Depends on architecture"],
    correctAnswer: 0,
    explanation: "By C standard definition, 'sizeof(char)' is guaranteed to be exactly 1 byte on all compliant platforms."
  },
  {
    question: "What is the result of `malloc(10 * sizeof(int))` if sizeof(int) is 4 bytes?",
    options: ["10 bytes", "40 bytes", "14 bytes", "80 bytes"],
    correctAnswer: 1,
    explanation: "10 * 4 = 40 contiguous bytes are allocated on the heap."
  },
  {
    question: "What happens if integer multiplication overflows when computing `n * sizeof(int)` inside malloc?",
    options: [
      "malloc catches it and returns NULL automatically",
      "An undersized buffer is allocated, leading to immediate heap buffer overflow vulnerabilities",
      "Program throws an overflow exception",
      "Compile error"
    ],
    correctAnswer: 1,
    explanation: "Multiplication overflow in malloc results in allocating a tiny buffer, causing critical heap overflows."
  },
  {
    question: "Which function provides built-in overflow protection for element count and size multiplication?",
    options: ["malloc()", "calloc()", "realloc()", "free()"],
    correctAnswer: 1,
    explanation: "calloc(n, size) checks for integer multiplication overflow internally and safely returns NULL on overflow."
  },
  {
    question: "Can malloc() allocate memory on the GPU directly?",
    options: ["Yes", "No, malloc only allocates on system host RAM; GPU memory requires cudaMalloc or similar APIs", "Only with #pragma gpu", "Only in C23"],
    correctAnswer: 1,
    explanation: "Standard C malloc operates strictly on CPU host virtual memory."
  },
  {
    question: "What is the time complexity of a standard malloc() allocation in the general case?",
    options: ["O(1) to O(N) depending on free-list bin searches", "O(N²)", "O(log N) always", "O(N!)"],
    correctAnswer: 0,
    explanation: "malloc is typically O(1) for fast bins/tcache, and O(N) when searching unsorted/small bins."
  },
  {
    question: "Can you pass a malloc-allocated pointer to another thread in a multi-threaded C application?",
    options: ["No, heap is thread-local", "Yes, the heap is shared across all threads in the same process", "Only via files", "Only with mutex lock"],
    correctAnswer: 1,
    explanation: "The heap address space is shared across all threads in a process."
  },
  {
    question: "What is the purpose of the `alloca()` function and how does it differ from `malloc()`?",
    options: [
      "alloca allocates on the Stack and is automatically freed on function exit",
      "alloca allocates in ROM",
      "alloca is identical to malloc",
      "alloca allocates on the GPU"
    ],
    correctAnswer: 0,
    explanation: "alloca() allocates temporary memory on the runtime stack frame, automatically freed on return."
  },
  {
    question: "Why is `alloca()` discouraged in safety-critical software?",
    options: [
      "It is too slow",
      "It cannot report allocation failure (no NULL return) and easily triggers Stack Overflow",
      "It leaks memory",
      "It is deprecated in C99"
    ],
    correctAnswer: 1,
    explanation: "alloca cannot return NULL on failure; exhausting the stack causes an instant uncontrolled crash."
  },
  {
    question: "How do you free memory allocated by malloc?",
    options: ["delete(ptr);", "free(ptr);", "release(ptr);", "dispose(ptr);"],
    correctAnswer: 1,
    explanation: "The standard C deallocation function is 'free(ptr)'."
  },
  {
    question: "What happens if you allocate memory with malloc and never call free before the program exits?",
    options: [
      "Physical RAM is permanently damaged",
      "Modern OS reclaims process memory on exit, but it constitutes a memory leak during runtime",
      "Computer reboots",
      "Operating system refuses to exit"
    ],
    correctAnswer: 1,
    explanation: "The OS reclaims memory pages upon process termination, but leaks cause severe issues during runtime."
  },
  {
    question: "What is an Allocation Chunk in heap internals?",
    options: [
      "A sector on the hard drive",
      "A contiguous memory block consisting of user data and hidden allocator metadata header",
      "A thread stack",
      "A CPU register"
    ],
    correctAnswer: 1,
    explanation: "The heap allocator packages memory into chunks containing internal size/flag metadata headers."
  },
  {
    question: "Where is the chunk size metadata stored by glibc ptmalloc?",
    options: [
      "In the bytes immediately preceding the pointer returned to the user",
      "In a separate database on disk",
      "Inside CPU registers",
      "In the .text segment"
    ],
    correctAnswer: 0,
    explanation: "Metadata is stored in hidden header bytes immediately preceding the user data address."
  },

  // 51-75: calloc() Mechanics & Zero-Initialization
  {
    question: "What are the two arguments passed to calloc()?",
    options: [
      "Total bytes and alignment",
      "Number of elements and size of each element",
      "Pointer and new size",
      "File pointer and buffer size"
    ],
    correctAnswer: 1,
    explanation: "calloc(size_t num, size_t size) takes element count and element byte size."
  },
  {
    question: "What is the primary difference between `malloc(n * sizeof(int))` and `calloc(n, sizeof(int))`?",
    options: [
      "malloc is slower than calloc",
      "calloc zeroes all allocated memory bytes, while malloc leaves garbage values",
      "calloc allocates on the stack",
      "malloc cannot allocate arrays"
    ],
    correctAnswer: 1,
    explanation: "calloc guarantees all allocated bytes are initialized to zero (0)."
  },
  {
    question: "How many total bytes are allocated by `calloc(10, 8)`?",
    options: ["10 bytes", "18 bytes", "80 bytes", "8 bytes"],
    correctAnswer: 2,
    explanation: "10 * 8 = 80 total contiguous bytes are allocated on the heap."
  },
  {
    question: "When should you prefer calloc() over malloc()?",
    options: [
      "When you will immediately overwrite all memory with fread()",
      "When memory must start initialized to zero (e.g. counters, boolean flags, matrices)",
      "When allocating small strings",
      "When performance is the only concern"
    ],
    correctAnswer: 1,
    explanation: "calloc is ideal when clean zero values are required by algorithm logic."
  },
  {
    question: "When should you prefer malloc() over calloc()?",
    options: [
      "When memory must be zeroed",
      "When the buffer will be immediately overwritten (e.g. file read, strcpy), avoiding zero-fill overhead",
      "When allocating arrays of pointers",
      "When calling free is not needed"
    ],
    correctAnswer: 1,
    explanation: "malloc avoids the CPU cost of zeroing memory when you intend to overwrite it immediately."
  },
  {
    question: "What is returned by calloc if allocation fails?",
    options: ["0", "NULL", "-1", "A pointer to static memory"],
    correctAnswer: 1,
    explanation: "Like malloc, calloc returns NULL if heap allocation fails."
  },
  {
    question: "Can memory allocated with calloc() be freed with standard free()?",
    options: ["No, requires cfree()", "Yes, free() handles memory from malloc, calloc, and realloc identically", "Only in C11", "Only if cast"],
    correctAnswer: 1,
    explanation: "free() deallocates memory allocated by malloc, calloc, or realloc seamlessly."
  },
  {
    question: "What happens if you allocate an array with calloc(5, sizeof(int)) and inspect element 3?",
    options: ["Garbage value", "0", "NULL", "Segmentation fault"],
    correctAnswer: 1,
    explanation: "calloc zeroes all bytes, so integer elements evaluate to exactly 0."
  },
  {
    question: "How does calloc achieve high performance when allocating massive zeroed buffers in Linux?",
    options: [
      "It skips allocation",
      "The OS maps memory to the shared system zero-page (Copy-on-Write) without writing physical zeroes",
      "It uses GPU acceleration",
      "It compiles directly to assembly"
    ],
    correctAnswer: 1,
    explanation: "The OS virtual memory manager maps virgin anonymous pages to a shared zero-page via Copy-on-Write."
  },
  {
    question: "Can calloc() be resized using realloc()?",
    options: ["No", "Yes, realloc works on any valid heap pointer", "Only if allocated under 1KB", "Only in C99"],
    correctAnswer: 1,
    explanation: "Memory allocated by calloc can be resized dynamically using realloc()."
  },
  {
    question: "What is the equivalent malloc call for `calloc(n, s)`?",
    options: [
      "void *p = malloc(n * s); memset(p, 0, n * s);",
      "void *p = malloc(n + s);",
      "void *p = malloc(n); memset(p, s, n);",
      "void *p = malloc(sizeof(n * s));"
    ],
    correctAnswer: 0,
    explanation: "'malloc(n * s)' followed by 'memset(p, 0, n * s)' produces identical zero-initialized memory."
  },
  {
    question: "Does calloc(n, sizeof(char)) guarantee a null-terminated empty string at index 0?",
    options: ["Yes, arr[0] is '\\0' (byte value 0)", "No", "Only if cast", "Only in C23"],
    correctAnswer: 0,
    explanation: "ASCII '\\0' has numerical value 0, so calloc creates a valid null-terminated empty string."
  },
  {
    question: "What is the return type of `calloc` in `<stdlib.h>`?",
    options: ["int*", "void*", "size_t", "char*"],
    correctAnswer: 1,
    explanation: "calloc returns a generic 'void*' pointer."
  },
  {
    question: "What happens if either argument to calloc is 0 (e.g. `calloc(0, sizeof(int))` or `calloc(5, 0)`)?",
    options: [
      "Always crashes",
      "Implementation-defined: returns either NULL or a unique non-dereferenceable pointer",
      "Allocates 1 MB",
      "Throws an exception"
    ],
    correctAnswer: 1,
    explanation: "Passing 0 size or count to calloc returns either NULL or an implementation-defined unique pointer."
  },
  {
    question: "How do you allocate a zero-initialized dynamic array of 20 doubles?",
    options: [
      "double *d = calloc(20, sizeof(double));",
      "double *d = malloc(20, sizeof(double));",
      "double *d = calloc(sizeof(double), 20);",
      "double *d = calloc(20 * sizeof(double));"
    ],
    correctAnswer: 0,
    explanation: "'calloc(20, sizeof(double))' allocates 20 zero-initialized double elements."
  },
  {
    question: "Is calloc safe against integer multiplication overflow?",
    options: [
      "Yes, standard calloc implementations detect overflow and safely return NULL",
      "No, calloc overflows just like malloc",
      "Only on 64-bit systems",
      "Only in C++"
    ],
    correctAnswer: 0,
    explanation: "Standard calloc verifies that 'num * size <= SIZE_MAX' before allocating, preventing overflow."
  },
  {
    question: "What header file defines `memset` for manual memory zeroing?",
    options: ["<stdlib.h>", "<string.h>", "<memory.h>", "<stdio.h>"],
    correctAnswer: 1,
    explanation: "'memset' is declared in the standard header <string.h>."
  },
  {
    question: "How do you zero out a malloc buffer of 100 ints using memset?",
    options: [
      "memset(ptr, 0, 100 * sizeof(int));",
      "memset(ptr, 100, 0);",
      "memset(0, ptr, 100);",
      "memset(ptr, 0, 100);"
    ],
    correctAnswer: 0,
    explanation: "'memset(ptr, 0, total_bytes)' sets all bytes in the buffer to 0."
  },
  {
    question: "Can calloc allocate a jagged 2D array?",
    options: [
      "Yes, by allocating row pointers and calling calloc for each row with different column counts",
      "No, calloc only creates 1D arrays",
      "Only with compiler extensions",
      "Only in C11"
    ],
    correctAnswer: 0,
    explanation: "You can call calloc in a loop for each row pointer to allocate zeroed rows of varying lengths."
  },
  {
    question: "What is the memory overhead of calloc compared to malloc?",
    options: [
      "Identical chunk header overhead; calloc simply includes the cost of zeroing bytes",
      "calloc requires 2x more memory",
      "calloc has zero overhead",
      "calloc requires 64 extra bytes per element"
    ],
    correctAnswer: 0,
    explanation: "Both use identical heap chunk structures; the only difference is the zeroing step."
  },
  {
    question: "If calloc fails, does it affect previously allocated memory blocks?",
    options: [
      "No, previously allocated blocks remain valid and untouched on the heap",
      "It frees all memory",
      "It corrupts other blocks",
      "It causes a system reboot"
    ],
    correctAnswer: 0,
    explanation: "An allocation failure returns NULL without disturbing any existing heap allocations."
  },
  {
    question: "How do you allocate an array of 10 zeroed struct pointers?",
    options: [
      "struct Node **arr = calloc(10, sizeof(struct Node*));",
      "struct Node *arr = calloc(10, sizeof(struct Node));",
      "struct Node **arr = malloc(10 * sizeof(struct Node));",
      "struct Node arr = calloc(10);"
    ],
    correctAnswer: 0,
    explanation: "'calloc(10, sizeof(struct Node*))' allocates 10 pointer slots, each initialized to NULL (0x0)."
  },
  {
    question: "What is the consequence of forgetting the second argument in calloc?",
    options: ["Compilation syntax error", "Zero bytes allocated", "Memory leak", "Stack overflow"],
    correctAnswer: 0,
    explanation: "calloc requires exactly two parameters; omitting one causes a compilation error."
  },
  {
    question: "Does calloc prevent memory fragmentation on the heap?",
    options: [
      "No, fragmentation is determined by allocation and deallocation patterns",
      "Yes, calloc defragments the heap",
      "Only in C23",
      "Only on 32-bit systems"
    ],
    correctAnswer: 0,
    explanation: "Fragmentation is an inherent property of dynamic allocation lifecycles, unaffected by calloc."
  },
  {
    question: "Which function call is faster for a 1-Gigabyte buffer that will be filled from disk?",
    options: ["malloc(1GB)", "calloc(1GB, 1)", "Both are identical", "calloc is always faster"],
    correctAnswer: 0,
    explanation: "malloc avoids zeroing 1GB of memory, saving significant CPU time and page faults."
  },

  // 76-100: realloc() Resizing & Expansion
  {
    question: "What is the function prototype of realloc() in <stdlib.h>?",
    options: [
      "void *realloc(void *ptr, size_t new_size);",
      "void realloc(void *ptr, int size);",
      "int realloc(void *ptr, size_t size);",
      "void *realloc(size_t size, void *ptr);"
    ],
    correctAnswer: 0,
    explanation: "The prototype is 'void *realloc(void *ptr, size_t new_size);'."
  },
  {
    question: "Why is `ptr = realloc(ptr, new_size);` considered dangerous?",
    options: [
      "It is illegal C syntax",
      "If realloc fails and returns NULL, ptr is overwritten, permanently losing and leaking the original block",
      "It frees memory prematurely",
      "It causes a double free"
    ],
    correctAnswer: 1,
    explanation: "If realloc returns NULL on failure, overwriting ptr with NULL destroys your only reference to the original block."
  },
  {
    question: "What is the safe pattern for calling realloc()?",
    options: [
      "void *temp = realloc(ptr, new_size); if (temp != NULL) ptr = temp;",
      "ptr = realloc(ptr, new_size);",
      "free(ptr); ptr = realloc(ptr, new_size);",
      "realloc(ptr, new_size);"
    ],
    correctAnswer: 0,
    explanation: "Store in a temporary pointer first; only reassign to 'ptr' once success is confirmed."
  },
  {
    question: "What happens to the existing data in a memory block when it is expanded with realloc()?",
    options: [
      "It is completely erased",
      "It is preserved up to the original size; newly added bytes contain uninitialized garbage",
      "It is zero-initialized",
      "It is reversed"
    ],
    correctAnswer: 1,
    explanation: "Old data is retained intact. New bytes beyond the old size contain uninitialized garbage."
  },
  {
    question: "What are the two possibilities when realloc() expands a memory block?",
    options: [
      "In-place expansion (same address) or relocation (new address with automatic copy & free of old block)",
      "Stack expansion or heap expansion",
      "CPU cache expansion or RAM expansion",
      "Static expansion or dynamic expansion"
    ],
    correctAnswer: 0,
    explanation: "realloc expands in-place if contiguous space permits, or relocates to a new block, copying data and freeing the old block."
  },
  {
    question: "If realloc() relocates a memory block to a new address, do you need to call free() on the old address?",
    options: [
      "Yes, immediately",
      "No! realloc automatically frees the old block; calling free manually causes a fatal Double Free crash",
      "Only in C99",
      "Only if size > 1MB"
    ],
    correctAnswer: 1,
    explanation: "realloc handles deallocation of the old block automatically upon relocation."
  },
  {
    question: "What happens if you pass NULL as the first parameter to realloc (`realloc(NULL, size)`)?",
    options: [
      "It crashes with a segfault",
      "It behaves exactly like malloc(size)",
      "It returns NULL",
      "It throws an exception"
    ],
    correctAnswer: 1,
    explanation: "'realloc(NULL, size)' is standardized to behave identically to 'malloc(size)'."
  },
  {
    question: "What happens if you pass a pointer to static or stack memory into realloc()?",
    options: [
      "It copies to the heap cleanly",
      "Undefined behavior / Heap corruption crash",
      "It returns NULL safely",
      "It converts to static"
    ],
    correctAnswer: 1,
    explanation: "realloc can only be called on pointers originally returned by malloc, calloc, or realloc."
  },
  {
    question: "What happens when you shrink a memory block with realloc (e.g. from 100 bytes to 20 bytes)?",
    options: [
      "The first 20 bytes are preserved and excess 80 bytes are returned to the heap",
      "The entire block is cleared",
      "Shrinking is prohibited in C",
      "It causes a memory leak"
    ],
    correctAnswer: 0,
    explanation: "Shrinking preserves the prefix of data and releases excess tail bytes back to the free list."
  },
  {
    question: "What is the amortized time complexity of dynamic array growth using geometric doubling (2x capacity)?",
    options: ["O(N²)", "O(N)", "O(1) amortized per insertion", "O(log N)"],
    correctAnswer: 2,
    explanation: "Doubling capacity when full achieves O(1) amortized insertion complexity."
  },
  {
    question: "What is the time complexity of dynamic array growth if capacity is increased by only +1 on each push?",
    options: ["O(1)", "O(log N)", "O(N²) total time for N insertions", "O(N!)"],
    correctAnswer: 2,
    explanation: "Growing by +1 forces copying the entire array on every insertion, resulting in quadratic O(N²) time."
  },
  {
    question: "What happens to other pointers (aliases) referencing the old memory block after realloc relocates it?",
    options: [
      "They are automatically updated by the OS",
      "They become dangerous dangling pointers pointing to freed memory (Use-After-Free)",
      "They are set to NULL",
      "They trigger a compile warning"
    ],
    correctAnswer: 1,
    explanation: "The runtime cannot update raw pointer aliases; all other pointers become invalid dangling pointers."
  },
  {
    question: "What is the worst-case time complexity of a single realloc() call?",
    options: ["O(1)", "O(N) where N is the number of bytes to copy to the new location", "O(N²)", "O(log N)"],
    correctAnswer: 1,
    explanation: "When relocating, realloc must copy N bytes to the new block, taking O(N) time."
  },
  {
    question: "Can realloc() fail when shrinking a memory block?",
    options: [
      "Almost never in standard libraries, but checking with a temporary pointer remains best practice",
      "It fails 50% of the time",
      "It always fails",
      "It is undefined behavior"
    ],
    correctAnswer: 0,
    explanation: "Shrinking rarely fails, but defensive programming recommends checking the returned pointer."
  },
  {
    question: "How do you release all memory of a resized buffer when finished?",
    options: [
      "free(ptr); ptr = NULL;",
      "realloc(ptr, 0);",
      "delete ptr;",
      "release(ptr);"
    ],
    correctAnswer: 0,
    explanation: "Call 'free(ptr)' on the final valid pointer returned by realloc, then set it to NULL."
  },
  {
    question: "In C23, what is the standardized status of calling `realloc(ptr, 0)` with non-null ptr?",
    options: [
      "Explicitly deprecated / undefined behavior; developers must use free(ptr) instead",
      "Standard way to free",
      "Allocates 0 bytes",
      "Doubles memory"
    ],
    correctAnswer: 0,
    explanation: "C23 made realloc(ptr, 0) undefined behavior to eliminate ambiguity; use free(ptr) explicitly."
  },
  {
    question: "Can realloc() be called on a pointer that has already been freed?",
    options: [
      "Yes",
      "No, calling realloc on a freed pointer is a critical Use-After-Free / Double-Free heap corruption bug",
      "Only if size is larger",
      "Only in C99"
    ],
    correctAnswer: 1,
    explanation: "Reallocating an already-freed pointer corrupts internal allocator bins and aborts the process."
  },
  {
    question: "What is memory reallocation thrashing?",
    options: [
      "Repeatedly calling realloc in tight loops causing constant memory copying and fragmentation",
      "Hard drive head crashes",
      "CPU thermal throttling",
      "Stack corruption"
    ],
    correctAnswer: 0,
    explanation: "Frequent reallocations waste CPU time copying data; pre-allocating or exponential growth avoids thrashing."
  },
  {
    question: "How can you pre-allocate memory in a dynamic array to avoid reallocations when the final count is known?",
    options: [
      "Call a reserve() function or allocate the full capacity upfront with malloc(known_count * sizeof(type))",
      "Use static arrays",
      "Call realloc(0)",
      "Set capacity to -1"
    ],
    correctAnswer: 0,
    explanation: "Pre-allocating (reserving) sufficient capacity upfront avoids all intermediate reallocations."
  },
  {
    question: "If `realloc` returns a new address, is the original pointer `ptr` guaranteed to be invalid?",
    options: [
      "Yes, the old block has been released back to the allocator",
      "No, both addresses remain valid",
      "Only for 1 second",
      "Only on 32-bit systems"
    ],
    correctAnswer: 0,
    explanation: "When relocated, the old address is freed immediately; dereferencing it is undefined behavior."
  },
  {
    question: "Can `realloc` be used to expand a memory block by 1 Gigabyte?",
    options: [
      "Yes, provided the system has sufficient free virtual address space and RAM/swap",
      "No, realloc max is 1MB",
      "Only on supercomputers",
      "Only in 32-bit mode"
    ],
    correctAnswer: 0,
    explanation: "realloc can allocate any size supported by available system virtual memory."
  },
  {
    question: "What happens if you pass an uninitialized pointer variable to `realloc`?",
    options: [
      "Instant heap corruption or segmentation fault",
      "It initializes to NULL",
      "It returns a new block",
      "Compiler warning only"
    ],
    correctAnswer: 0,
    explanation: "An uninitialized pointer contains random bits; the allocator crashes attempting to parse it as a chunk header."
  },
  {
    question: "Why should you never cast the return value of `realloc` in standard C?",
    options: [
      "It is unnecessary because void* converts implicitly and casting can mask missing <stdlib.h> header bugs in C89",
      "It causes a syntax error",
      "It reduces performance",
      "It corrupts data"
    ],
    correctAnswer: 0,
    explanation: "C implicitly converts void*; casting is redundant and historically masked missing prototype declarations."
  },
  {
    question: "What is the best initial capacity when implementing a dynamic vector?",
    options: ["0 or small power of 2 (such as 4, 8, or 16)", "1,000,000", "Negative 1", "Always 1"],
    correctAnswer: 0,
    explanation: "A small initial capacity (4-16) balances low initial overhead with fast initial growth."
  },
  {
    question: "What happens to pointers pointing to elements inside a buffer when the buffer is resized with realloc?",
    options: [
      "They are invalidated if realloc relocates the buffer",
      "They automatically adjust",
      "They are protected by the MMU",
      "They point to 0"
    ],
    correctAnswer: 0,
    explanation: "Internal element pointers become invalid dangling pointers if the container buffer is relocated."
  },

  // 101-125: free(), Dangling Pointers & Deallocation
  {
    question: "What does the function `free(ptr)` do?",
    options: [
      "Sets ptr to NULL",
      "Deallocates the heap memory block pointed to by ptr, returning it to the allocator",
      "Wipes the memory to zero",
      "Deletes the variable ptr from the stack"
    ],
    correctAnswer: 1,
    explanation: "free() releases the heap memory block back to the allocator for reuse in future allocations."
  },
  {
    question: "Does calling `free(ptr)` change the value stored in the pointer variable `ptr` itself?",
    options: [
      "Yes, it sets ptr to NULL automatically",
      "No, ptr continues to store the old deallocated memory address (Dangling Pointer)",
      "It sets ptr to -1",
      "It deletes ptr"
    ],
    correctAnswer: 1,
    explanation: "free(ptr) receives ptr by value; it releases the heap block but leaves ptr holding the old address."
  },
  {
    question: "What is a Dangling Pointer in C?",
    options: [
      "A pointer initialized to NULL",
      "A pointer that holds the memory address of an already-freed memory block or destroyed stack frame",
      "A pointer to a function",
      "A void* pointer"
    ],
    correctAnswer: 1,
    explanation: "A dangling pointer points to memory that has been deallocated and is no longer valid."
  },
  {
    question: "How do you neutralize a dangling pointer immediately after freeing it?",
    options: [
      "ptr = NULL;",
      "delete ptr;",
      "clear(ptr);",
      "free(ptr);"
    ],
    correctAnswer: 0,
    explanation: "Setting 'ptr = NULL;' immediately after 'free(ptr);' eliminates the dangling pointer."
  },
  {
    question: "What happens if you call `free(NULL)` in C?",
    options: [
      "Segmentation fault crash",
      "Completely safe no-op (does nothing)",
      "Memory leak",
      "Compiler error"
    ],
    correctAnswer: 1,
    explanation: "The C standard guarantees that calling 'free(NULL)' is a 100% safe no-op."
  },
  {
    question: "What is a Double Free bug?",
    options: [
      "Freeing twice as much memory as allocated",
      "Calling free() more than once on the same memory address without an intervening allocation",
      "Freeing memory in two different threads safely",
      "Freeing a pointer to pointer"
    ],
    correctAnswer: 1,
    explanation: "Double free occurs when free() is invoked multiple times on the same pointer, corrupting the heap."
  },
  {
    question: "Why does setting `ptr = NULL` after `free(ptr)` prevent Double Free errors?",
    options: [
      "Because calling free(NULL) on any subsequent free calls is a safe no-op",
      "Because NULL re-allocates memory",
      "Because NULL locks the pointer",
      "Because compiler removes the second free"
    ],
    correctAnswer: 0,
    explanation: "If ptr is NULL, subsequent free(ptr) calls execute safe free(NULL) instead of double-freeing."
  },
  {
    question: "What happens if you call `free()` on an address pointing to the middle of an allocated block (`ptr + 2`)?",
    options: [
      "Frees from that offset onward",
      "Fatal heap allocator metadata corruption and crash (e.g. 'free(): invalid pointer')",
      "Frees 2 elements",
      "Ignored safely"
    ],
    correctAnswer: 1,
    explanation: "free() must only be passed the exact starting address returned by malloc/calloc/realloc."
  },
  {
    question: "What happens if you call `free()` on a local stack variable (`int x; free(&x);`)?",
    options: [
      "Converts stack variable to heap",
      "Fatal process abort / crash (invalid pointer)",
      "Zeroes variable x",
      "Safely ignored"
    ],
    correctAnswer: 1,
    explanation: "free() expects heap chunk metadata headers; passing a stack address crashes the allocator."
  },
  {
    question: "What is a Use-After-Free (UAF) bug?",
    options: [
      "Reading or writing through a pointer after the memory block has already been freed",
      "Freeing memory twice",
      "Calling free on NULL",
      "Using memory before malloc"
    ],
    correctAnswer: 0,
    explanation: "Use-After-Free occurs when software accesses memory through a dangling pointer after calling free()."
  },
  {
    question: "Why are Use-After-Free bugs considered critical security vulnerabilities (CWE-416)?",
    options: [
      "They slow down the CPU clock",
      "Attackers can hijack reallocated memory structures to execute arbitrary code or corrupt security tokens",
      "They format the hard drive",
      "They prevent program termination"
    ],
    correctAnswer: 1,
    explanation: "UAF allows attackers to control corrupted heap memory structures and hijack instruction control flow."
  },
  {
    question: "Does `free()` zero out the physical contents of the deallocated memory in RAM?",
    options: [
      "Yes, always fills with 0x00",
      "No, for performance reasons the old bytes remain until overwritten by future allocations",
      "It fills with 0xFF",
      "It encrypts the memory"
    ],
    correctAnswer: 1,
    explanation: "free() does not wipe memory; residual data remains in RAM until reused."
  },
  {
    question: "How should sensitive data (like passwords or encryption keys) be handled before calling free()?",
    options: [
      "Wipe with explicit_bzero or memset_s before calling free()",
      "Just call free()",
      "Set pointer to NULL only",
      "Call realloc(0)"
    ],
    correctAnswer: 0,
    explanation: "Sensitive data must be explicitly wiped using 'explicit_bzero' before deallocating."
  },
  {
    question: "How can a safe-free helper function take advantage of double pointers?",
    options: [
      "void safe_free(void **pptr) { if(pptr && *pptr) { free(*pptr); *pptr = NULL; } }",
      "void safe_free(void *ptr) { free(ptr); ptr = NULL; }",
      "void safe_free(int ptr) { free(ptr); }",
      "void safe_free(void ***p);"
    ],
    correctAnswer: 0,
    explanation: "Passing pointer-to-pointer ('void **pptr') allows safe_free to nullify the caller's pointer variable."
  },
  {
    question: "What is the time complexity of calling free()?",
    options: ["O(1) in typical bin/tcache insertion", "O(N²)", "O(N) always", "O(log N)"],
    correctAnswer: 0,
    explanation: "free() is typically O(1), inserting the freed chunk into allocator bins or tcache lists."
  },
  {
    question: "What is memory coalescing in heap managers during free()?",
    options: [
      "Combining adjacent free memory chunks into a single larger contiguous block to reduce fragmentation",
      "Encrypting memory",
      "Zeroing pages",
      "Paging to disk"
    ],
    correctAnswer: 0,
    explanation: "Coalescing merges adjacent free chunks together, preventing external heap fragmentation."
  },
  {
    question: "What is a tcache (Thread Local Cache) in modern glibc malloc?",
    options: [
      "A fast per-thread memory cache that accelerates malloc/free without requiring global mutex locks",
      "A CPU hardware register",
      "A hard drive cache",
      "A stack allocator"
    ],
    correctAnswer: 0,
    explanation: "tcache provides lock-free per-thread bins for rapid small-block allocation and deallocation."
  },
  {
    question: "What happens if a program frees memory in a different thread than the thread that allocated it?",
    options: [
      "Allowed and completely safe in modern thread-safe standard C libraries",
      "Fatal crash always",
      "Memory leak",
      "Compile error"
    ],
    correctAnswer: 0,
    explanation: "Heap memory is globally accessible; thread-safe allocators handle cross-thread freeing cleanly."
  },
  {
    question: "What is the error output in Linux glibc when a double free is detected?",
    options: [
      "'free(): double free detected in tcache 2' followed by Aborted (core dumped)",
      "'Null pointer exception'",
      "'Warning: double free'",
      "Silent exit"
    ],
    correctAnswer: 0,
    explanation: "glibc aborts the process immediately with a double-free diagnostic message."
  },
  {
    question: "Why should you never write `free(ptr++)`?",
    options: [
      "Post-increment evaluates after passing the address, but modifies pointer value in caller scope confusingly",
      "Syntax error",
      "Freezes CPU",
      "Allocates memory"
    ],
    correctAnswer: 0,
    explanation: "Embedding side-effects like 'ptr++' inside free calls is confusing and error-prone."
  },
  {
    question: "What is the difference between shallow copy and deep copy when freeing structs containing heap pointers?",
    options: [
      "Deep copy clones underlying heap buffers so each struct can be freed independently; shallow copy shares pointers leading to double free bugs",
      "Shallow copy is faster to free",
      "Deep copy requires no free()",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "Shallow copies share pointers; freeing both copies causes a double-free. Deep copies clone memory safely."
  },
  {
    question: "How do you safely free a dynamic linked list?",
    options: [
      "Traverse with a temporary next pointer: save 'next = curr->next', call 'free(curr)', then advance 'curr = next'",
      "Call free(head) once",
      "Call free(tail)",
      "Set head = NULL without freeing"
    ],
    correctAnswer: 0,
    explanation: "Save the next pointer before freeing the current node; otherwise 'curr->next' is an illegal Use-After-Free read."
  },
  {
    question: "What happens if you free a pointer in a loop: `while(p) { free(p); p = p->next; }`?",
    options: [
      "Critical Use-After-Free bug on `p = p->next` because p was already freed in the previous line",
      "Frees list cleanly",
      "Stack overflow",
      "Compiles with warning only"
    ],
    correctAnswer: 0,
    explanation: "Accessing 'p->next' after 'free(p)' reads freed memory. You must store 'next' before freeing 'p'."
  },
  {
    question: "Can `free()` fail and return an error code?",
    options: [
      "No, free has return type void and cannot fail for valid heap addresses",
      "Yes, returns -1 on error",
      "Returns NULL",
      "Throws exception"
    ],
    correctAnswer: 0,
    explanation: "free() returns void; invalid pointers cause allocator crashes rather than error return codes."
  },
  {
    question: "What is the golden rule of deallocation hygiene?",
    options: [
      "Always set pointers to NULL immediately after calling free: `free(p); p = NULL;`",
      "Never call free",
      "Call free twice",
      "Free only at program exit"
    ],
    correctAnswer: 0,
    explanation: "Following 'free(p); p = NULL;' prevents dangling pointers and eliminates double-free crashes."
  },

  // 126-150: Memory Hazards & Leak Prevention
  {
    question: "What is a Memory Leak?",
    options: [
      "RAM overheating",
      "Allocating heap memory without releasing it, where all pointer references to the memory are lost",
      "Writing past array bounds",
      "Reading uninitialized memory"
    ],
    correctAnswer: 1,
    explanation: "A memory leak occurs when dynamically allocated memory is orphaned and cannot be reclaimed."
  },
  {
    question: "What is the primary symptom of a memory leak in a long-running server application?",
    options: [
      "Gradually increasing Resident Set Size (RSS) memory consumption until the OS OOM killer terminates it",
      "CPU clock frequency drops",
      "Hard drive corruption",
      "Immediate crash on startup"
    ],
    correctAnswer: 0,
    explanation: "Leaking applications consume increasing RAM over time until reaching memory limits."
  },
  {
    question: "What is a Wild Pointer?",
    options: [
      "An uninitialized pointer variable holding arbitrary garbage bits from the stack",
      "A pointer to a wild card file",
      "A pointer to heap memory",
      "A void pointer"
    ],
    correctAnswer: 0,
    explanation: "A wild pointer has not been initialized to a valid address or NULL, pointing to random memory."
  },
  {
    question: "How do you prevent wild pointers?",
    options: [
      "Always initialize pointer variables upon declaration: `int *ptr = NULL;`",
      "Never use pointers",
      "Cast all pointers to int",
      "Use free() on declaration"
    ],
    correctAnswer: 0,
    explanation: "Initializing pointers to NULL immediately on declaration eliminates wild pointers."
  },
  {
    question: "What happens if a pointer variable inside a function is overwritten with a new malloc address before freeing the old one?",
    options: [
      "The old memory block is permanently leaked (orphaned)",
      "The allocator automatically frees the old block",
      "Compilation error",
      "Stack overflow"
    ],
    correctAnswer: 0,
    explanation: "Overwriting the pointer address loses the only reference to the original block, causing a memory leak."
  },
  {
    question: "What is the difference between a memory leak and a dangling pointer?",
    options: [
      "A memory leak is allocated memory with no pointers referencing it; a dangling pointer is a pointer referencing deallocated memory",
      "They are identical terms",
      "A memory leak crashes immediately; dangling pointers never crash",
      "Dangling pointers only happen on stack"
    ],
    correctAnswer: 0,
    explanation: "Memory leak = memory without pointer; Dangling pointer = pointer to freed memory."
  },
  {
    question: "What is Heap Fragmentation?",
    options: [
      "Free memory broken into small, non-contiguous holes such that large contiguous allocation requests fail",
      "Hard disk bad sectors",
      "Stack corruption",
      "Compiler optimization"
    ],
    correctAnswer: 0,
    explanation: "Fragmentation occurs when interspersed allocations and frees leave small unusable gaps in the heap."
  },
  {
    question: "What is Internal Fragmentation in memory allocation?",
    options: [
      "Wasted space inside an allocated chunk due to alignment padding or minimum chunk size constraints",
      "Free memory scattered across the heap",
      "Stack frame gaps",
      "Virtual memory page faults"
    ],
    correctAnswer: 0,
    explanation: "Internal fragmentation is unused memory within an allocated block due to allocator rounding."
  },
  {
    question: "What is External Fragmentation in memory allocation?",
    options: [
      "Unallocated free memory scattered in small non-contiguous pockets between active allocations",
      "Padding inside chunks",
      "Disk swapping",
      "Stack overflow"
    ],
    correctAnswer: 0,
    explanation: "External fragmentation occurs when total free space is large but fragmented into small chunks."
  },
  {
    question: "What is an Off-By-One error in heap buffers?",
    options: [
      "Writing 1 byte beyond the allocated buffer boundary (such as forgetting +1 for string null terminator)",
      "Allocating 1 byte",
      "Freeing 1 extra time",
      "Dividing by 1"
    ],
    correctAnswer: 0,
    explanation: "Off-by-one errors write exactly 1 byte past allocated capacity, often corrupting adjacent chunk metadata."
  },
  {
    question: "What is an Arena / Pool Allocator and how does it prevent memory leaks?",
    options: [
      "It allocates a massive single memory block and releases the entire arena in a single free() call",
      "It replaces the CPU cache",
      "It disables pointers",
      "It converts C to Java"
    ],
    correctAnswer: 0,
    explanation: "Arena allocators allocate sequentially in a buffer and reset the entire buffer in O(1) time with zero individual leaks."
  },
  {
    question: "What is Reference Counting in dynamic memory management?",
    options: [
      "Tracking the number of active references to an object and calling free() automatically when the count reaches 0",
      "Counting total malloc calls",
      "Counting CPU cycles",
      "Counting loop iterations"
    ],
    correctAnswer: 0,
    explanation: "Reference counting deallocates memory automatically once all referencing pointers are destroyed."
  },
  {
    question: "What is a Circular Reference hazard in reference counting systems?",
    options: [
      "Object A references Object B and Object B references Object A, preventing the count from ever reaching 0 (Leak)",
      "An infinite loop in for()",
      "A recursive stack overflow",
      "A double free error"
    ],
    correctAnswer: 0,
    explanation: "Circular references prevent reference counts from dropping to zero, creating persistent memory leaks."
  },
  {
    question: "What is an Out-of-Bounds Read vulnerability on the heap (Heartbleed exploit mechanism)?",
    options: [
      "Reading memory past the allocated buffer, exposing sensitive data from adjacent memory chunks",
      "Writing past the buffer",
      "Freeing memory twice",
      "Dereferencing NULL"
    ],
    correctAnswer: 0,
    explanation: "Heartbleed was an out-of-bounds heap read vulnerability leaking private encryption keys from OpenSSL."
  },
  {
    question: "How does AddressSanitizer (ASan) detect out-of-bounds accesses on the heap?",
    options: [
      "By placing poison 'Redzones' around allocated heap chunks and checking a shadow memory bitmap on every memory access",
      "By encrypting the heap",
      "By slowing down CPU clock",
      "By disabling pointers"
    ],
    correctAnswer: 0,
    explanation: "ASan surrounds buffers with poisoned redzones in shadow memory, catching out-of-bounds access immediately."
  },
  {
    question: "What is the performance overhead of running a C program compiled with `-fsanitize=address`?",
    options: [
      "Approximately 2x slowdown and 2x memory overhead (fast enough for testing and debugging)",
      "100x slowdown",
      "Zero overhead",
      "50x slowdown"
    ],
    correctAnswer: 0,
    explanation: "AddressSanitizer is highly optimized, causing only ~2x overhead compared to Valgrind's ~20x slowdown."
  },
  {
    question: "What is Valgrind Memcheck and what platform does it primarily target?",
    options: [
      "A dynamic binary analysis tool primarily for Linux x86/x64/ARM that tracks all memory operations",
      "A Windows registry cleaner",
      "A static code linter",
      "A C compiler"
    ],
    correctAnswer: 0,
    explanation: "Valgrind runs Linux binaries in a synthetic CPU emulator to detect leaks and memory corruption."
  },
  {
    question: "What does `definitely lost` indicate in a Valgrind leak summary report?",
    options: [
      "Memory was leaked and no pointer in the program points to the starting address (unreachable leak)",
      "Memory is still in use",
      "Stack overflow",
      "Double free"
    ],
    correctAnswer: 0,
    explanation: "'Definitely lost' means memory is completely orphaned with zero references remaining."
  },
  {
    question: "What does `still reachable` indicate in a Valgrind summary report?",
    options: [
      "Pointers still point to the allocated block at program exit; memory was not freed before return",
      "Memory is corrupted",
      "Stack overflow",
      "Dangling pointer"
    ],
    correctAnswer: 0,
    explanation: "'Still reachable' means memory wasn't freed before exit, but pointers still reference it."
  },
  {
    question: "How can static analysis tools (like Clang Static Analyzer or Cppcheck) detect memory bugs?",
    options: [
      "By analyzing control flow graphs and paths at compile time without executing the binary",
      "By running the code on CPU",
      "By checking file sizes",
      "By monitoring RAM"
    ],
    correctAnswer: 0,
    explanation: "Static analyzers trace execution paths at compile time to flag uninitialized pointers and missing frees."
  },
  {
    question: "What is GCC's `-Wall -Wextra -Werror` flag configuration?",
    options: [
      "Enables all standard compiler warnings and treats all warnings as fatal compilation errors",
      "Disables all compiler checks",
      "Optimizes for size",
      "Enables AddressSanitizer"
    ],
    correctAnswer: 0,
    explanation: "'-Wall -Wextra -Werror' enforces clean code by failing compilation on any warning."
  },
  {
    question: "What is a Memory Leak in a function with multiple return statements?",
    options: [
      "Allocating memory at the top and returning early on an error condition without calling free()",
      "Returning a pointer",
      "Having 2 return statements",
      "Using recursion"
    ],
    correctAnswer: 0,
    explanation: "Early return paths (e.g. error handling exits) that bypass the final free() cause frequent memory leaks."
  },
  {
    question: "What is the `goto cleanup;` pattern in industrial C programming (e.g. Linux Kernel)?",
    options: [
      "A structured error-handling pattern where all early error exits jump to a single cleanup block that frees resources",
      "An anti-pattern that must never be used",
      "An infinite loop",
      "A recursion replacement"
    ],
    correctAnswer: 0,
    explanation: "'goto cleanup;' ensures all allocated resources are deallocated in one single place before exiting."
  },
  {
    question: "What is Undefined Behavior (UB) in C memory management?",
    options: [
      "Actions not prescribed by the C standard where anything can happen (crashes, silent corruption, wrong output)",
      "A syntax error",
      "A compile warning",
      "A safe fallback"
    ],
    correctAnswer: 0,
    explanation: "Undefined Behavior means the compiler is free to do anything; it often causes intermittent severe bugs."
  },
  {
    question: "Why should you never write to memory through a freed pointer?",
    options: [
      "It is a Use-After-Free violation that corrupts heap allocator bins and application state",
      "It slows down internet speed",
      "It causes compiler errors",
      "It is legal in C99"
    ],
    correctAnswer: 0,
    explanation: "Writing through a freed pointer overwrites active allocator metadata or reallocated objects."
  },

  // 151-175: Dynamic 2D Arrays & Matrices
  {
    question: "How do you declare an array of pointers for a dynamic 2D array of integers in C?",
    options: [
      "int **matrix = malloc(rows * sizeof(int*));",
      "int *matrix = malloc(rows * sizeof(int));",
      "int matrix = malloc(rows, cols);",
      "int matrix[rows][cols];"
    ],
    correctAnswer: 0,
    explanation: "'int **matrix = malloc(rows * sizeof(int*));' allocates an array of row pointers."
  },
  {
    question: "How do you allocate the individual rows in the `int **matrix` approach?",
    options: [
      "for (int r = 0; r < rows; r++) matrix[r] = malloc(cols * sizeof(int));",
      "matrix = malloc(rows * cols);",
      "matrix[0] = malloc(cols);",
      "calloc(rows, cols);"
    ],
    correctAnswer: 0,
    explanation: "Loop through each row index and allocate 'cols * sizeof(int)' for each row pointer."
  },
  {
    question: "How do you access the element at row `r` and column `c` in `int **matrix`?",
    options: ["matrix[r][c]", "matrix[r, c]", "matrix(r)(c)", "matrix->r->c"],
    correctAnswer: 0,
    explanation: "The pointer-of-pointers approach allows standard 2D subscripting syntax: 'matrix[r][c]'."
  },
  {
    question: "What is the mandatory deallocation sequence for an `int **matrix` 2D array?",
    options: [
      "Free each row first: `for(int r=0; r<rows; r++) free(matrix[r]);` then `free(matrix);`",
      "Call `free(matrix);` once",
      "Call `free(matrix[0]);`",
      "Deallocate from bottom to top"
    ],
    correctAnswer: 0,
    explanation: "You must free all individual rows first, and then free the top-level pointer array."
  },
  {
    question: "What happens if you execute `free(matrix);` before freeing `matrix[r]` in an `int **` array?",
    options: [
      "All rows are automatically freed",
      "Severe memory leak: all individual row buffers are orphaned and lost in RAM",
      "Compile error",
      "Stack overflow"
    ],
    correctAnswer: 1,
    explanation: "Freeing the master pointer array destroys row addresses, permanently leaking every row buffer."
  },
  {
    question: "How do you allocate a contiguous single-block dynamic 2D array of integers?",
    options: [
      "int *matrix = malloc(rows * cols * sizeof(int));",
      "int **matrix = malloc(rows * cols);",
      "int *matrix = malloc(rows + cols);",
      "int matrix = calloc(rows, cols);"
    ],
    correctAnswer: 0,
    explanation: "'malloc(rows * cols * sizeof(int))' allocates all elements contiguously in a single block."
  },
  {
    question: "How do you access element (row `r`, col `c`) in a flattened 1D dynamic matrix of width `cols`?",
    options: [
      "matrix[r * cols + c]",
      "matrix[r + c * rows]",
      "matrix[r * rows + c]",
      "matrix[r][c]"
    ],
    correctAnswer: 0,
    explanation: "In row-major order, the 1D index offset is '(r * cols) + c'."
  },
  {
    question: "How do you deallocate a flattened single-block dynamic matrix `int *matrix`?",
    options: [
      "free(matrix); matrix = NULL;",
      "Loop through rows and free each element",
      "free(matrix, rows * cols);",
      "realloc(matrix, 0);"
    ],
    correctAnswer: 0,
    explanation: "A single-block matrix requires only a single 'free(matrix)' call."
  },
  {
    question: "Why is the flattened contiguous 1D matrix significantly faster than `int **` for numeric algorithms?",
    options: [
      "Sequential memory layout maximizes CPU L1/L2 cache line hits and hardware prefetching",
      "It uses less stack memory",
      "It requires no free() call",
      "It compiles to GPU code"
    ],
    correctAnswer: 0,
    explanation: "Contiguous memory guarantees high cache locality and avoids double-pointer indirection stalls."
  },
  {
    question: "What is a Jagged (Ragged) Array?",
    options: [
      "A 2D array where different rows have different column lengths",
      "An array with negative indices",
      "A 3D array",
      "A corrupt array"
    ],
    correctAnswer: 0,
    explanation: "Jagged arrays have variable row sizes (e.g. row 0 has 3 items, row 1 has 10 items)."
  },
  {
    question: "Which dynamic memory allocation approach supports jagged arrays?",
    options: [
      "Array of Pointers (`int **matrix`)",
      "Flattened contiguous single-block (`int *matrix`)",
      "Compile-time static array `int arr[3][4]`",
      "None"
    ],
    correctAnswer: 0,
    explanation: "With 'int **', each row pointer can be allocated with a unique column size independently."
  },
  {
    question: "In C99, how can you allocate a contiguous dynamic 2D array and still use `matrix[r][c]` syntax?",
    options: [
      "int (*matrix)[cols] = malloc(rows * sizeof(*matrix));",
      "int **matrix = malloc(rows * cols);",
      "int matrix[rows][cols] = malloc();",
      "int *matrix[cols] = malloc(rows);"
    ],
    correctAnswer: 0,
    explanation: "Pointer to VLA 'int (*matrix)[cols]' allocates contiguous memory with clean 2D subscripting."
  },
  {
    question: "How do you allocate a dynamic array of 10 strings, each capable of holding up to 50 characters?",
    options: [
      "char **strs = malloc(10 * sizeof(char*)); for(int i=0; i<10; i++) strs[i] = malloc(51 * sizeof(char));",
      "char *strs = malloc(10 * 50);",
      "char strs[10][50] = malloc();",
      "char ***strs = malloc(500);"
    ],
    correctAnswer: 0,
    explanation: "Allocate an array of 10 char pointers, then allocate 51 bytes (including '\\0') for each string."
  },
  {
    question: "How do you deallocate an array of dynamic strings `char **strs` of length `n`?",
    options: [
      "for (int i = 0; i < n; i++) { free(strs[i]); } free(strs); strs = NULL;",
      "free(strs);",
      "free(strs[0]);",
      "delete strs;"
    ],
    correctAnswer: 0,
    explanation: "Free every string buffer first in a loop, then free the master pointer array."
  },
  {
    question: "What is Row-Major Order in C multidimensional arrays?",
    options: [
      "Consecutive elements of a row reside contiguously in memory",
      "Consecutive elements of a column reside contiguously in memory",
      "Elements are stored diagonally",
      "Elements are randomly distributed"
    ],
    correctAnswer: 0,
    explanation: "C stores multidimensional arrays in Row-Major order (row elements are contiguous in RAM)."
  },
  {
    question: "Which programming language stores arrays in Column-Major Order by default?",
    options: ["Fortran and MATLAB", "C and C++", "Python NumPy (default)", "Java"],
    correctAnswer: 0,
    explanation: "Fortran, MATLAB, and Julia use Column-Major layout (columns are contiguous in memory)."
  },
  {
    question: "What happens if one row allocation fails while building an `int **matrix` in a loop?",
    options: [
      "Catch NULL, free all previously allocated rows (0 to r-1), free the master array, and return NULL",
      "Ignore it and continue",
      "Re-run the loop",
      "Call exit(0)"
    ],
    correctAnswer: 0,
    explanation: "Defensive programming requires freeing all previously allocated rows to avoid partial leaks."
  },
  {
    question: "How do you allocate dynamic memory for a 3D volume of dimensions `X x Y x Z` as a single block?",
    options: [
      "int *volume = malloc(X * Y * Z * sizeof(int));",
      "int ***volume = malloc(X * Y * Z);",
      "int *volume = malloc(X + Y + Z);",
      "int volume[X][Y][Z];"
    ],
    correctAnswer: 0,
    explanation: "'malloc(X * Y * Z * sizeof(int))' allocates contiguous memory for a 3D grid."
  },
  {
    question: "What is the index formula for a 3D array element at coordinates `(x, y, z)` in a single block of dimensions `(X, Y, Z)`?",
    options: [
      "index = x * (Y * Z) + y * Z + z;",
      "index = x + y + z;",
      "index = x * y * z;",
      "index = z * X + y * Y + x;"
    ],
    correctAnswer: 0,
    explanation: "The 3D linear offset formula in row-major order is 'x * (Y * Z) + y * Z + z'."
  },
  {
    question: "What is the pointer overhead of `int **matrix` on a 64-bit OS for a 1000x1000 integer matrix?",
    options: [
      "8,000 bytes (1,000 pointers * 8 bytes) plus 1,000 allocator chunk headers",
      "0 bytes",
      "4 MB",
      "64 bytes"
    ],
    correctAnswer: 0,
    explanation: "1,000 row pointers take 8KB plus chunk header metadata for 1,000 separate allocations."
  },
  {
    question: "How many calls to `malloc()` are needed for a 100-row `int **matrix`?",
    options: ["101 calls (1 for row pointers + 100 for rows)", "1 call", "100 calls", "2 calls"],
    correctAnswer: 0,
    explanation: "1 call for the array of pointers plus 100 calls for individual row buffers = 101 calls."
  },
  {
    question: "How many calls to `malloc()` are needed for a 100-row contiguous single-block matrix?",
    options: ["Exactly 1 call", "101 calls", "100 calls", "2 calls"],
    correctAnswer: 0,
    explanation: "The single-block contiguous approach requires exactly 1 single malloc call."
  },
  {
    question: "Can you pass a static 2D array `int arr[3][4]` to a function expecting `int **matrix`?",
    options: [
      "No, type mismatch: `int[3][4]` is a contiguous block, not an array of pointer addresses",
      "Yes, completely compatible",
      "Only with (int**) cast safely",
      "Only in C99"
    ],
    correctAnswer: 0,
    explanation: "Static 2D arrays decay to pointer-to-array ('int (*)[4]'), not pointer-to-pointer ('int**')."
  },
  {
    question: "How do you declare a function that accepts a dynamic `int **matrix`?",
    options: [
      "void process(int **matrix, int rows, int cols);",
      "void process(int matrix[][], int rows);",
      "void process(int *matrix[10]);",
      "void process(matrix);"
    ],
    correctAnswer: 0,
    explanation: "'void process(int **matrix, int rows, int cols);' passes the pointer-to-pointer matrix."
  },
  {
    question: "What is the recommended encapsulation for a dynamic matrix in production C libraries?",
    options: [
      "typedef struct { int rows; int cols; double *data; } Matrix;",
      "Global variables",
      "int matrix[100][100]",
      "void* matrix"
    ],
    correctAnswer: 0,
    explanation: "Encapsulating dimensions and contiguous data buffer in a struct provides clean, modular APIs."
  },

  // 176-200: Diagnostics, Tools & Capstone Projects
  {
    question: "What does the GCC flag `-fsanitize=address` do?",
    options: [
      "Instruments memory accesses with shadow memory checks to catch buffer overflows, UAF, and leaks at runtime",
      "Optimizes memory size",
      "Compiles for Android",
      "Enables multi-threading"
    ],
    correctAnswer: 0,
    explanation: "AddressSanitizer (ASan) instruments memory operations to detect memory safety bugs instantly."
  },
  {
    question: "What flag combines AddressSanitizer and UndefinedBehaviorSanitizer in GCC?",
    options: [
      "gcc -fsanitize=address,undefined -g file.c",
      "gcc -sanitizer=all",
      "gcc -check-memory",
      "gcc -Wsafe"
    ],
    correctAnswer: 0,
    explanation: "'-fsanitize=address,undefined' catches both memory corruptions and integer/pointer UB."
  },
  {
    question: "What does Valgrind's `Invalid read of size 4` message mean?",
    options: [
      "The program tried to read 4 bytes (e.g. an int) from unallocated, freed, or out-of-bounds memory",
      "The file is corrupted",
      "The integer value was 4",
      "Stack overflow"
    ],
    correctAnswer: 0,
    explanation: "Invalid read indicates attempting to read memory that is not legally mapped or allocated."
  },
  {
    question: "What does Valgrind's `Invalid write of size 8` message mean?",
    options: [
      "The program wrote 8 bytes (e.g. a pointer/double) to invalid, freed, or out-of-bounds memory",
      "Hard drive error",
      "File permission error",
      "Heap is full"
    ],
    correctAnswer: 0,
    explanation: "Invalid write indicates writing data to unmapped, out-of-bounds, or deallocated memory."
  },
  {
    question: "What does `Conditional jump or move depends on uninitialised value(s)` mean in Valgrind?",
    options: [
      "An `if` statement or branch condition evaluated an uninitialized variable containing random garbage bits",
      "Infinite loop",
      "Double free",
      "Memory leak"
    ],
    correctAnswer: 0,
    explanation: "Branching on uninitialized data leads to non-deterministic, buggy behavior."
  },
  {
    question: "What does `Address 0x... is 0 bytes after a block of size N alloc'd` mean in AddressSanitizer?",
    options: [
      "A Heap Buffer Overflow: data was accessed immediately past the boundary of an N-byte allocation",
      "A memory leak",
      "A double free",
      "A NULL pointer dereference"
    ],
    correctAnswer: 0,
    explanation: "This pinpoint error message indicates an off-by-one or out-of-bounds heap buffer overflow."
  },
  {
    question: "What does `Address 0x... is located 0 bytes inside a block of size N free'd` mean?",
    options: [
      "A Use-After-Free (UAF) bug: accessing memory that was previously deallocated by free()",
      "A memory leak",
      "A buffer overflow",
      "A wild pointer"
    ],
    correctAnswer: 0,
    explanation: "ASan flags attempts to access memory inside a freed heap block as a Use-After-Free violation."
  },
  {
    question: "What is the purpose of compiling with the `-g` flag when using Valgrind or ASan?",
    options: [
      "Generates debug symbols (DWARF) so error reports display exact source file names and line numbers",
      "Optimizes for GPU",
      "Enables garbage collection",
      "Produces a GUI"
    ],
    correctAnswer: 0,
    explanation: "'-g' embeds debug symbols, allowing diagnostic tools to show exact source line numbers."
  },
  {
    question: "What is Memory Swapping in operating systems?",
    options: [
      "Moving inactive virtual memory pages from RAM to disk swap space when physical RAM is full",
      "Swapping two pointer variables",
      "Reversing an array",
      "Thread context switching"
    ],
    correctAnswer: 0,
    explanation: "The OS swaps virtual memory pages to disk storage when physical RAM is exhausted."
  },
  {
    question: "What is a Memory Pool (Arena) used for in high-performance game engines?",
    options: [
      "Pre-allocating a large memory buffer to eliminate runtime malloc/free latency and prevent fragmentation",
      "Rendering 3D graphics",
      "Storing textures on disk",
      "Managing audio volume"
    ],
    correctAnswer: 0,
    explanation: "Game engines use arena pools to allocate thousands of objects per frame with zero allocator lag."
  },
  {
    question: "How does a dynamic array vector double its capacity during `push_back`?",
    options: [
      "capacity = capacity * 2; data = realloc(data, capacity * sizeof(type));",
      "capacity = capacity + 1;",
      "malloc(capacity * 2);",
      "free(data);"
    ],
    correctAnswer: 0,
    explanation: "Doubling capacity with realloc allows appending elements in O(1) amortized time."
  },
  {
    question: "In the dynamic vector implementation, what does `vector_pop_back` do?",
    options: [
      "Decrements `size` by 1 and optionally returns the last element",
      "Frees the entire vector",
      "Deletes element 0",
      "Reallocates memory to 0"
    ],
    correctAnswer: 0,
    explanation: "Popping reduces the active size counter by 1 without needing to deallocate capacity."
  },
  {
    question: "How do you implement `vector_shrink_to_fit` in a dynamic vector?",
    options: [
      "realloc(vec->data, vec->size * sizeof(int)); vec->capacity = vec->size;",
      "free(vec->data);",
      "vec->size = 0;",
      "malloc(vec->size);"
    ],
    correctAnswer: 0,
    explanation: "Shrink-to-fit reallocates the data buffer to match exact active size, releasing excess capacity."
  },
  {
    question: "What is the function of `memmove()` vs `memcpy()` when inserting or removing elements in an array?",
    options: [
      "memmove safely handles overlapping memory regions during shifting, whereas memcpy causes undefined behavior",
      "memcpy is for strings only",
      "memmove is slower by 100x",
      "No difference"
    ],
    correctAnswer: 0,
    explanation: "memmove is guaranteed safe for overlapping memory shifts (such as shifting array elements)."
  },
  {
    question: "What header file declares `memcpy` and `memmove` in standard C?",
    options: ["<string.h>", "<stdlib.h>", "<stdio.h>", "<memory.h>"],
    correctAnswer: 0,
    explanation: "Memory block functions 'memcpy', 'memmove', and 'memset' are declared in <string.h>."
  },
  {
    question: "What is a custom memory allocator in C?",
    options: [
      "A user-defined memory management system (such as slab, buddy, or arena allocator) tailored for specific performance needs",
      "A hardware upgrade",
      "A compiler plugin",
      "An OS upgrade"
    ],
    correctAnswer: 0,
    explanation: "Custom allocators optimize memory layout and speed for specialized workloads like games and databases."
  },
  {
    question: "What is the Slab Allocator used in operating system kernels (like Linux)?",
    options: [
      "An allocator that pre-allocates pools of fixed-size objects to eliminate internal/external fragmentation and speed up allocation",
      "A stack frame allocator",
      "A hard drive partition",
      "A network protocol"
    ],
    correctAnswer: 0,
    explanation: "Slab allocators cache pre-initialized kernel objects of fixed sizes for rapid reuse."
  },
  {
    question: "What is the Buddy Memory Allocation algorithm?",
    options: [
      "A binary tree allocation technique that splits memory blocks into halves (buddies) of powers of 2 and coalesces them when freed",
      "A multi-threaded allocator",
      "A linked list allocator",
      "A stack allocator"
    ],
    correctAnswer: 0,
    explanation: "The Buddy algorithm recursively splits and merges power-of-two memory blocks to minimize fragmentation."
  },
  {
    question: "What is Cache Line Bouncing in multi-threaded dynamic memory?",
    options: [
      "Multiple CPU cores competing to write to memory addresses on the same cache line (False Sharing), causing performance degradation",
      "A RAM hardware defect",
      "A stack overflow",
      "A memory leak"
    ],
    correctAnswer: 0,
    explanation: "False sharing occurs when independent variables on the same 64-byte cache line are modified across cores."
  },
  {
    question: "What is the purpose of `posix_memalign` or `aligned_alloc` in C11?",
    options: [
      "Allocates heap memory aligned to a specific custom byte boundary (e.g. 64-byte boundary for AVX-512 SIMD vector instructions)",
      "Zeroes memory",
      "Allocates in ROM",
      "Frees memory"
    ],
    correctAnswer: 0,
    explanation: "'aligned_alloc(alignment, size)' allocates memory aligned to custom boundaries required by SIMD instructions."
  },
  {
    question: "What is SIMD (Single Instruction Multiple Data) and why does it require aligned dynamic memory?",
    options: [
      "Vectorized CPU instructions (AVX, NEON) process multiple data elements in parallel and require 16/32/64-byte aligned memory addresses for peak speed",
      "A graphics card",
      "A network socket",
      "A compiler tool"
    ],
    correctAnswer: 0,
    explanation: "SIMD registers load multiple integers/floats simultaneously, demanding strictly aligned memory addresses."
  },
  {
    question: "What is the function of the C11 `<stdalign.h>` header?",
    options: [
      "Defines alignas, alignof, and alignment macros for data structures and variables",
      "Allocates heap memory",
      "Defines malloc",
      "Manages stack frames"
    ],
    correctAnswer: 0,
    explanation: "'<stdalign.h>' provides 'alignas' and 'alignof' keywords for querying and specifying memory alignment."
  },
  {
    question: "Why does deallocating dynamic memory in the reverse order of allocation reduce heap fragmentation?",
    options: [
      "It allows allocator implementations (like LIFO free lists) to cleanly merge adjacent free blocks (coalescing) back into large chunks",
      "It speeds up compilation",
      "It avoids stack overflow",
      "It disables ASLR"
    ],
    correctAnswer: 0,
    explanation: "LIFO deallocation matches allocator stack-like pools and maximizes adjacent block coalescing."
  },
  {
    question: "What is Address Space Layout Randomization (ASLR)?",
    options: [
      "A security technique that randomizes the starting addresses of the Stack, Heap, and Libraries on each execution to prevent exploit payloads",
      "A memory leak",
      "A CPU bug",
      "A sorting algorithm"
    ],
    correctAnswer: 0,
    explanation: "ASLR randomizes memory segment locations, preventing attackers from predicting exploit target addresses."
  },
  {
    question: "What is the ultimate rule of systems memory mastery taught by Sukanta Hui at Coder & AccoTax?",
    options: [
      "Every malloc/calloc/realloc must have an intentional free(), every free() must be followed by ptr = NULL, and all memory safety must be validated with AddressSanitizer!",
      "Never use pointers in C",
      "Always allocate 1 GB",
      "Rely on OS termination to clean up memory"
    ],
    correctAnswer: 0,
    explanation: "Flawless paired allocation-deallocation, immediate pointer nullification, and compiler sanitizer verification form the cornerstone of systems engineering excellence."
  }
];

export default questions;
