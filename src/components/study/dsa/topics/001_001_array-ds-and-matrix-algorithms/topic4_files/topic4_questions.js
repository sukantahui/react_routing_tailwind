const questions = [
  {
    "id": 1,
    "question": "What is a 'Memory Leak' in C systems programming?",
    "options": [
      "Dynamically allocated heap memory that is no longer needed by the program but was never released with `free()`, making that RAM unusable by the system",
      "A hardware short-circuit in RAM chips",
      "A variable that loses its value after a loop",
      "A stack variable exceeding 4 bytes"
    ],
    "answer": "Dynamically allocated heap memory that is no longer needed by the program but was never released with `free()`, making that RAM unusable by the system",
    "explanation": "Heap memory remains allocated until explicitly returned via `free()` or the process exits. Leaking memory in long-running services (e.g. web servers) eventually causes Out-Of-Memory (OOM) crashes."
  },
  {
    "id": 2,
    "question": "What is a 'Dangling Pointer' in C?",
    "options": [
      "A pointer variable that holds a memory address to a heap chunk or stack frame that has ALREADY been freed or deallocated",
      "A pointer set to NULL",
      "A pointer to a constant string",
      "A pointer stored in CPU registers"
    ],
    "answer": "A pointer variable that holds a memory address to a heap chunk or stack frame that has ALREADY been freed or deallocated",
    "explanation": "Calling `free(ptr)` deallocates the underlying buffer, but does not modify `ptr` itself. `ptr` still contains the old address (a dangling pointer), and reading/writing to it causes undefined behavior (Use-After-Free)."
  },
  {
    "id": 3,
    "question": "What is a 'Double Free' bug and why is it considered a critical security vulnerability (CWE-415)?",
    "options": [
      "Calling `free()` twice on the exact same allocated pointer without reallocating, which corrupts the heap allocator's internal free-list bins and enables arbitrary code execution exploits",
      "Allocating memory twice",
      "Freeing two different pointers",
      "Using two threads"
    ],
    "answer": "Calling `free()` twice on the exact same allocated pointer without reallocating, which corrupts the heap allocator's internal free-list bins and enables arbitrary code execution exploits",
    "explanation": "Double-free corrupts memory metadata in glibc ptmalloc, allowing attackers to manipulate heap bin pointers and overwrite arbitrary function pointers."
  },
  {
    "id": 4,
    "question": "What simple programming practice in C completely eliminates dangling pointer bugs?",
    "options": [
      "Immediately neutralizing the pointer with `ptr = NULL;` after calling `free(ptr)`",
      "Setting the variable to 0",
      "Calling malloc immediately",
      "Using static variables"
    ],
    "answer": "Immediately neutralizing the pointer with `ptr = NULL;` after calling `free(ptr)`",
    "explanation": "Setting `ptr = NULL` ensures that any future accidental dereference triggers an instant, clean, predictable crash (SIGSEGV at 0x0) instead of silent heap corruption, and `free(NULL)` is a safe no-op."
  },
  {
    "id": 5,
    "question": "What is a 'Wild Pointer' in C?",
    "options": [
      "An uninitialized pointer variable that holds random garbage bits from the stack, pointing to an arbitrary memory location",
      "A pointer to a function",
      "A pointer to a double",
      "A pointer in a loop"
    ],
    "answer": "An uninitialized pointer variable that holds random garbage bits from the stack, pointing to an arbitrary memory location",
    "explanation": "Declaring `int* p;` without assigning `= NULL` or `= malloc(...)` leaves `p` containing arbitrary stack garbage bits."
  },
  {
    "id": 6,
    "question": "What is an 'Orphaned Heap Block' memory leak?",
    "options": [
      "A heap memory block whose only referencing pointer is overwritten, lost, or falls out of scope before `free()` is called",
      "A block allocated by the OS kernel",
      "A block shared between two threads",
      "A block marked as const"
    ],
    "answer": "A heap memory block whose only referencing pointer is overwritten, lost, or falls out of scope before `free()` is called",
    "explanation": "For example: `int* p = malloc(100); p = malloc(200);` overwrites the address of the first 100-byte block, leaving it permanently orphaned with zero pointers referencing it."
  },
  {
    "id": 7,
    "question": "What happens when returning a pointer to a local automatic stack variable from a function (`int* f() { int x = 10; return &x; }`)?",
    "options": [
      "Undefined Behavior: The stack frame is destroyed upon return, leaving the returned pointer dangling pointing to reclaimed stack space that will be overwritten by the next function call",
      "The variable x is moved to the heap automatically",
      "x persists forever in global memory",
      "The compiler creates a copy on disk"
    ],
    "answer": "Undefined Behavior: The stack frame is destroyed upon return, leaving the returned pointer dangling pointing to reclaimed stack space that will be overwritten by the next function call",
    "explanation": "Local variables exist only during the lifetime of their activation frame. Returning `&x` returns an address to dead stack memory."
  },
  {
    "id": 8,
    "question": "What tool in the LLVM/GCC compiler toolchain is specifically designed to catch memory leaks, buffer overruns, and use-after-free bugs at runtime?",
    "options": [
      "AddressSanitizer (ASan) enabled with `-fsanitize=address -g`",
      "GDB debugger only",
      "Make utility",
      "Git version control"
    ],
    "answer": "AddressSanitizer (ASan) enabled with `-fsanitize=address -g`",
    "explanation": "AddressSanitizer instruments memory reads/writes with shadow memory checks, intercepting out-of-bounds accesses and memory leaks with exact file and line numbers."
  },
  {
    "id": 9,
    "question": "What is Valgrind Memcheck and how does it diagnose C programs?",
    "options": [
      "A dynamic binary instrumentation framework that simulates CPU execution to track every byte of allocated memory and detect leaks, uninitialized reads, and invalid frees",
      "A static code analyzer",
      "A C compiler optimizer",
      "A text editor"
    ],
    "answer": "A dynamic binary instrumentation framework that simulates CPU execution to track every byte of allocated memory and detect leaks, uninitialized reads, and invalid frees",
    "explanation": "`valgrind --leak-check=full ./program` runs the binary in a virtual CPU environment, tracking every allocation and reporting exact leak traces."
  },
  {
    "id": 10,
    "question": "What is the difference between Valgrind's 'definitely lost' vs 'still reachable' memory leak classifications?",
    "options": [
      "'Definitely lost' means no pointer references the block (unrecoverable leak); 'still reachable' means pointers still reference the block when the program exited without calling free()",
      "'Still reachable' is worse than definitely lost",
      "Both indicate a segmentation fault",
      "Neither is a memory leak"
    ],
    "answer": "'Definitely lost' means no pointer references the block (unrecoverable leak); 'still reachable' means pointers still reference the block when the program exited without calling free()",
    "explanation": "'Definitely lost' means total loss of pointer references during program runtime. 'Still reachable' typically occurs when global pointers are not explicitly freed before `exit()`."
  },
  {
    "id": 11,
    "question": "What is a 'Buffer Overread' security vulnerability?",
    "options": [
      "Reading memory beyond the boundaries of an allocated array, potentially leaking secret keys, passwords, or memory layout addresses (e.g. Heartbleed OpenSSL bug)",
      "Writing too much data to a disk file",
      "Overclocking the CPU memory controller",
      "Reading from a closed file"
    ],
    "answer": "Reading memory beyond the boundaries of an allocated array, potentially leaking secret keys, passwords, or memory layout addresses (e.g. Heartbleed OpenSSL bug)",
    "explanation": "Out-of-bounds reads do not always crash; they can read sensitive data located in adjacent heap or stack structures (like the infamous Heartbleed flaw)."
  },
  {
    "id": 12,
    "question": "Why should `free(NULL)` be safe to call in ISO C?",
    "options": [
      "The C standard explicitly mandates that passing NULL to `free()` must perform no action and safely return immediately",
      "Because NULL memory is always 0 bytes",
      "Because compilers delete free(NULL) statements",
      "Because NULL is stored in ROM"
    ],
    "answer": "The C standard explicitly mandates that passing NULL to `free()` must perform no action and safely return immediately",
    "explanation": "ISO C99/C11/C17 §7.22.3.4 explicitly states: 'If ptr is a null pointer, no action occurs.'"
  },
  {
    "id": 13,
    "question": "What is Heap Fragmentation in long-running C applications?",
    "options": [
      "Allocating and freeing blocks of varying sizes over time creates small scattered gaps of free memory in the heap, causing future large allocations to fail even when total free RAM is sufficient",
      "Disk sectors becoming corrupted",
      "Stack frames overlapping",
      "CPU registers splitting"
    ],
    "answer": "Allocating and freeing blocks of varying sizes over time creates small scattered gaps of free memory in the heap, causing future large allocations to fail even when total free RAM is sufficient",
    "explanation": "External fragmentation occurs when total free memory is large but no single contiguous free block is big enough to satisfy a `malloc(large_size)` request."
  },
  {
    "id": 14,
    "question": "How can dynamic array implementations minimize heap fragmentation?",
    "options": [
      "By using a memory pool (slab allocator) or standard geometric doubling with reserve capacity rather than thousands of tiny random allocations",
      "By rebooting the server every hour",
      "By avoiding all pointers",
      "By using global variables only"
    ],
    "answer": "By using a memory pool (slab allocator) or standard geometric doubling with reserve capacity rather than thousands of tiny random allocations",
    "explanation": "Memory pools pre-allocate large contiguous arenas and carve out uniform chunks, preventing heap scattering and fragmentation."
  },
  {
    "id": 15,
    "question": "What is a 'Use-After-Free' (UAF) exploit?",
    "options": [
      "An attacker accesses or writes to a freed memory location after the allocator has reassigned that memory block to a different object, hijacking control flow",
      "Using a trial version of software past the trial date",
      "Reading from standard input twice",
      "A compiler warning"
    ],
    "answer": "An attacker accesses or writes to a freed memory location after the allocator has reassigned that memory block to a different object, hijacking control flow",
    "explanation": "UAF is one of the most severe cybersecurity vulnerabilities. If an attacker controls the newly allocated data at the old address, they can overwrite function pointers."
  },
  {
    "id": 16,
    "question": "What is an Allocation Guard Macro commonly used in production C code?",
    "options": [
      "A macro or wrapper function like `SAFE_FREE(ptr)` that expands to `{ free(ptr); (ptr) = NULL; }`",
      "A macro that disables malloc",
      "A macro that reboots the computer",
      "A macro that encrypts pointers"
    ],
    "answer": "A macro or wrapper function like `SAFE_FREE(ptr)` that expands to `{ free(ptr); (ptr) = NULL; }`",
    "explanation": "Encapsulating deallocation ensures `free()` and neutralization to `NULL` always happen atomically."
  },
  {
    "id": 17,
    "question": "What happens if a program allocates memory inside an infinite loop without calling `free()`?",
    "options": [
      "The process consumes all available physical RAM and swap space until the OS Out-Of-Memory (OOM) Killer forcibly terminates the process with SIGKILL",
      "The program runs at infinite speed",
      "The loop automatically pauses",
      "The CPU enters sleep mode"
    ],
    "answer": "The process consumes all available physical RAM and swap space until the OS Out-Of-Memory (OOM) Killer forcibly terminates the process with SIGKILL",
    "explanation": "Unchecked heap growth exhausts virtual memory, triggering OS kernel OOM killer intervention."
  },
  {
    "id": 18,
    "question": "What is a Memory Canary (Guard Byte) pattern?",
    "options": [
      "Placing known sentinel byte values (e.g. `0xDEADBEEF`) immediately before and after an allocated buffer to detect buffer overruns when checked during teardown",
      "A sound played by the motherboard speaker",
      "A hardware firewall",
      "A compression algorithm"
    ],
    "answer": "Placing known sentinel byte values (e.g. `0xDEADBEEF`) immediately before and after an allocated buffer to detect buffer overruns when checked during teardown",
    "explanation": "Canaries are sentinel values placed at buffer boundaries. If memory is written out of bounds, the canary value is modified, immediately exposing the bug."
  },
  {
    "id": 19,
    "question": "In C, what is the 'Resource Acquisition Is Initialization' (RAII) idiom equivalent since C does not have destructors?",
    "options": [
      "Strict `init_struct()` and `destroy_struct()` cleanup function pairs, or GNU C `__attribute__((cleanup(func)))` scope guards",
      "Garbage collection in C runtime",
      "Automatic stack unwinding",
      "Static analysis tools only"
    ],
    "answer": "Strict `init_struct()` and `destroy_struct()` cleanup function pairs, or GNU C `__attribute__((cleanup(func)))` scope guards",
    "explanation": "Disciplined C engineering enforces explicit constructor and destructor pairs for all composite heap data structures."
  },
  {
    "id": 20,
    "question": "What is the consequence of passing an invalid pointer (e.g. stack address or offset inside a heap block `ptr + 5`) to `free()`?",
    "options": [
      "Undefined Behavior: The heap allocator attempts to parse metadata headers preceding `ptr + 5`, causing immediate allocator corruption or crash",
      "It frees only 5 bytes",
      "It safely returns -1",
      "It does nothing"
    ],
    "answer": "Undefined Behavior: The heap allocator attempts to parse metadata headers preceding `ptr + 5`, causing immediate allocator corruption or crash",
    "explanation": "`free()` expects the exact pointer returned by `malloc()`. Passing an interior pointer reads garbage metadata, corrupting heap chunks."
  },
  {
    "id": 21,
    "question": "How does `valgrind --tool=helgrind` differ from `valgrind --tool=memcheck`?",
    "options": [
      "Memcheck detects memory leaks and out-of-bounds memory bugs, while Helgrind detects multi-threading race conditions and data synchronization deadlocks",
      "Helgrind is for graphics memory only",
      "Memcheck is for assembly code only",
      "There is no difference"
    ],
    "answer": "Memcheck detects memory leaks and out-of-bounds memory bugs, while Helgrind detects multi-threading race conditions and data synchronization deadlocks",
    "explanation": "Valgrind is a multi-tool suite: Memcheck inspects heap allocations, Helgrind monitors POSIX thread synchronization."
  },
  {
    "id": 22,
    "question": "Why should `malloc(sizeof(struct Node))` be written as `malloc(sizeof(*ptr))` in idiomatic C?",
    "options": [
      "`sizeof(*ptr)` automatically adapts if the type of `ptr` is ever changed in the declaration, eliminating type-mismatch allocation bugs",
      "Because `sizeof(*ptr)` is 2x faster",
      "Because `struct Node` is invalid syntax in C99",
      "To enable hardware multithreading"
    ],
    "answer": "`sizeof(*ptr)` automatically adapts if the type of `ptr` is ever changed in the declaration, eliminating type-mismatch allocation bugs",
    "explanation": "`ptr = malloc(sizeof(*ptr))` is type-safe and refactor-proof. If `ptr` is changed from `int*` to `double*`, `sizeof(*ptr)` updates automatically."
  },
  {
    "id": 23,
    "question": "What happens when `free()` is called on memory allocated with `alloca()`?",
    "options": [
      "Undefined Behavior and fatal crash: `alloca()` allocates memory on the physical Call Stack, which must NEVER be passed to the heap `free()` function",
      "It safely releases stack memory",
      "It frees the entire function",
      "It returns 0"
    ],
    "answer": "Undefined Behavior and fatal crash: `alloca()` allocates memory on the physical Call Stack, which must NEVER be passed to the heap `free()` function",
    "explanation": "`alloca()` allocates temporary memory on the stack frame which automatically vanishes when the function returns. Passing it to `free()` corrupts the heap."
  },
  {
    "id": 24,
    "question": "What is UndefinedBehaviorSanitizer (UBSan) in modern GCC and Clang?",
    "options": [
      "A compiler runtime sanitizer (`-fsanitize=undefined`) that catches signed integer overflow, null pointer arithmetic, misaligned pointer reads, and divide by zero at runtime",
      "A virus scanner",
      "A code beautifier",
      "A memory compression tool"
    ],
    "answer": "A compiler runtime sanitizer (`-fsanitize=undefined`) that catches signed integer overflow, null pointer arithmetic, misaligned pointer reads, and divide by zero at runtime",
    "explanation": "UBSan detects non-portable or standard-violating operations that compilers might otherwise silently miscompile."
  },
  {
    "id": 25,
    "question": "What is the golden rule of dynamic memory management in C?",
    "options": [
      "Every allocation (`malloc`, `calloc`, `realloc`) must have exactly ONE clearly defined owner responsible for exactly ONE matching `free()` call during its lifecycle",
      "Never use pointers in C",
      "Always allocate 10MB minimum",
      "Free memory only when the computer shuts down"
    ],
    "answer": "Every allocation (`malloc`, `calloc`, `realloc`) must have exactly ONE clearly defined owner responsible for exactly ONE matching `free()` call during its lifecycle",
    "explanation": "Clear ownership semantics prevent both memory leaks (missing free) and double-free vulnerabilities (multiple owners freeing the same block)."
  }
];

export default questions;
