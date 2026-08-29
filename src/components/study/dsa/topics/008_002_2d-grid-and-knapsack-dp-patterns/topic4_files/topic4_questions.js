const questions = [
  {
    "id": 1,
    "question": "What is the primary physical memory allocation pattern utilized in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "Contiguous heap/stack buffer layout designed to maximize CPU L1/L2 cache line hits and deterministic address calculation",
      "Randomly scattered virtual pages without memory alignment",
      "Unbuffered disk swap paging exclusively",
      "Hardware register banking without RAM involvement"
    ],
    "answer": "Contiguous heap/stack buffer layout designed to maximize CPU L1/L2 cache line hits and deterministic address calculation",
    "explanation": "In C systems programming, efficient data structures prioritize contiguous byte layout to leverage hardware spatial locality and minimize L1 cache miss latency."
  },
  {
    "id": 2,
    "question": "In \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\", what is the exact consequence of dereferencing a NULL or uninitialized pointer?",
    "options": [
      "Triggers an immediate Hardware Segmentation Fault (SIGSEGV) because page 0 (0x0) is protected by the OS MMU",
      "Silently returns integer value 0 without interrupting execution",
      "The C runtime automatically allocates a new node on the heap",
      "The CPU switches to single-threaded mode"
    ],
    "answer": "Triggers an immediate Hardware Segmentation Fault (SIGSEGV) because page 0 (0x0) is protected by the OS MMU",
    "explanation": "The virtual memory page containing address 0x0 is mapped as non-accessible by the Operating System kernel. Attempting to read or write to it raises an unrecoverable SIGSEGV signal."
  },
  {
    "id": 3,
    "question": "Why must dynamic memory allocations in \"2D Grid & Knapsack DP: Subset Sum, Partition Equal & Multi-Dimensional States\" be performed using `sizeof(*ptr)` rather than hardcoded primitive sizes?",
    "options": [
      "It ensures type-safety and eliminates allocation size mismatches if the pointer's declared type is modified during refactoring",
      "It compresses heap chunks by 50%",
      "It is required by the POSIX thread standard",
      "It forces the memory to be allocated in read-only segments"
    ],
    "answer": "It ensures type-safety and eliminates allocation size mismatches if the pointer's declared type is modified during refactoring",
    "explanation": "Writing `ptr = malloc(sizeof(*ptr))` automatically binds allocation size directly to the target struct or variable type, preventing buffer overflow bugs."
  },
  {
    "id": 4,
    "question": "How does CPU Spatial Locality impact the execution time of algorithms in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "When a memory byte is accessed, the hardware prefetcher loads adjacent 64-byte cache lines into L1 cache, making subsequent sequential accesses ~100x faster than random memory jumps",
      "It disables CPU speculative execution",
      "It compresses all integer arithmetic into 8-bit registers",
      "It eliminates the need for pointer validation"
    ],
    "answer": "When a memory byte is accessed, the hardware prefetcher loads adjacent 64-byte cache lines into L1 cache, making subsequent sequential accesses ~100x faster than random memory jumps",
    "explanation": "Reading from L1 cache takes ~1ns (4-5 CPU cycles) whereas reading from main RAM takes ~100ns (200-300 cycles). Spatial locality is a cornerstone of low-latency DSA design."
  },
  {
    "id": 5,
    "question": "What is the risk of Struct Padding and Byte Alignment when creating custom node structures for \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "The compiler inserts invisible padding bytes to align members to natural word boundaries (4 or 8 bytes), increasing total memory consumption per node",
      "It causes compilation failure on 64-bit systems",
      "It reverses the byte endianness of integer fields",
      "It converts structs into unions"
    ],
    "answer": "The compiler inserts invisible padding bytes to align members to natural word boundaries (4 or 8 bytes), increasing total memory consumption per node",
    "explanation": "To optimize memory bus transfers, CPUs require data to align with addresses divisible by their size. Ordering struct fields from largest to smallest minimizes padding waste."
  },
  {
    "id": 6,
    "question": "What is the core algorithmic invariant that must be maintained throughout \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "Strict adherence to the structural ordering property and validity of boundary indices/pointers across all mutations",
      "All arrays must be strictly sorted in descending order",
      "Every function must execute in O(1) time",
      "All memory blocks must be smaller than 1 kilobyte"
    ],
    "answer": "Strict adherence to the structural ordering property and validity of boundary indices/pointers across all mutations",
    "explanation": "Algorithmic correctness relies on preserving invariant state (e.g. BST search property, heap order, or sliding window bounds) before and after every state transition."
  },
  {
    "id": 7,
    "question": "In \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\", what is the primary state transition or recursion step?",
    "options": [
      "Subdividing the primary problem space into smaller independent or overlapping sub-problems and aggregating optimal sub-solutions",
      "Executing an infinite loop until RAM is exhausted",
      "Rebooting the CPU thread pool on each iteration",
      "Converting dynamic structures to static arrays"
    ],
    "answer": "Subdividing the primary problem space into smaller independent or overlapping sub-problems and aggregating optimal sub-solutions",
    "explanation": "Whether through Divide-and-Conquer, Dynamic Programming, or iterative window shrinking, reducing problem dimension systematically ensures convergence."
  },
  {
    "id": 8,
    "question": "When executing pointer updates in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\", why is update ordering critical?",
    "options": [
      "Modifying a pointer before securing reference to its target or downstream chain permanently breaks linked connectivity, orphaning unreferenced nodes in memory",
      "The compiler will reverse the execution order automatically",
      "Pointers can only be updated once per process",
      "It causes integer underflow in CPU registers"
    ],
    "answer": "Modifying a pointer before securing reference to its target or downstream chain permanently breaks linked connectivity, orphaning unreferenced nodes in memory",
    "explanation": "In pointer-based structures, updating `curr->next = new_node` without first saving `new_node->next = curr->next` permanently loses the rest of the list."
  },
  {
    "id": 9,
    "question": "How does in-place algorithm execution compare to auxiliary buffer allocation in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "In-place execution operates within the existing memory footprint in O(1) auxiliary space, preserving cache warmth and reducing memory pressure",
      "In-place execution requires O(N^2) extra RAM",
      "Auxiliary allocation is always faster than in-place mutation",
      "In-place algorithms cannot be written in C"
    ],
    "answer": "In-place execution operates within the existing memory footprint in O(1) auxiliary space, preserving cache warmth and reducing memory pressure",
    "explanation": "In-place mutation avoids expensive heap allocation system calls and keeps active data residing inside CPU cache hierarchies."
  },
  {
    "id": 10,
    "question": "What role do sentinel nodes (dummy heads/tails) play in simplifying pointer logic in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "They eliminate edge-case branching for empty structures and insertions/deletions at boundary positions (head/tail)",
      "They double the memory capacity of the container",
      "They automatically sort the elements",
      "They prevent stack allocation limits"
    ],
    "answer": "They eliminate edge-case branching for empty structures and insertions/deletions at boundary positions (head/tail)",
    "explanation": "A dummy sentinel guarantees that every valid element always has a non-null preceding and succeeding neighbor, removing tedious `if (!head)` checks."
  },
  {
    "id": 11,
    "question": "What critical edge case must always be checked first when implementing \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "Empty input container, NULL base pointer, or container size N = 0 and N = 1",
      "Checking if the computer is connected to the internet",
      "Verifying if numbers are prime",
      "Checking floating point precision mode"
    ],
    "answer": "Empty input container, NULL base pointer, or container size N = 0 and N = 1",
    "explanation": "Boundary inputs (empty, single-element, or identical values) are the most frequent causes of null-pointer exceptions and infinite loops."
  },
  {
    "id": 12,
    "question": "What is a 'Dangling Pointer' bug in the context of \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "A pointer that continues to hold the memory address of a node or buffer that has already been deallocated via `free()`",
      "A pointer declared with the `const` qualifier",
      "A pointer that points to static global memory",
      "A pointer stored in an array"
    ],
    "answer": "A pointer that continues to hold the memory address of a node or buffer that has already been deallocated via `free()`",
    "explanation": "Deallocating memory releases the heap block to the allocator's free list, but leaves the pointer variable holding the old address. Reading or writing to it results in Use-After-Free corruption."
  },
  {
    "id": 13,
    "question": "What is the standard industrial remedy to eliminate Dangling Pointer bugs after `free(ptr)`?",
    "options": [
      "Immediately set `ptr = NULL;` so any accidental future access triggers an instant, predictable SIGSEGV crash instead of silent memory corruption",
      "Call malloc immediately with size 0",
      "Recompile the code with optimization flags -O3",
      "Cast the pointer to `void*`"
    ],
    "answer": "Immediately set `ptr = NULL;` so any accidental future access triggers an instant, predictable SIGSEGV crash instead of silent memory corruption",
    "explanation": "Neutralizing pointers to NULL prevents Use-After-Free security vulnerabilities, and `free(NULL)` is guaranteed to be a safe no-op by ISO C."
  },
  {
    "id": 14,
    "question": "What catastrophic vulnerability occurs when dynamic memory is reallocated using `ptr = realloc(ptr, new_size)` without a temporary pointer?",
    "options": [
      "If `realloc()` fails and returns NULL, `ptr` is overwritten with NULL, causing an unrecoverable memory leak of the original allocated block",
      "The operating system terminates all running threads",
      "The file system enters read-only mode",
      "The compiler converts the array to a linked list"
    ],
    "answer": "If `realloc()` fails and returns NULL, `ptr` is overwritten with NULL, causing an unrecoverable memory leak of the original allocated block",
    "explanation": "Always use `void* tmp = realloc(ptr, new_size); if (!tmp) { /* handle error */ } else { ptr = tmp; }` to preserve the original pointer on failure."
  },
  {
    "id": 15,
    "question": "What happens if a recursive function in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\" lacks a proper base termination condition?",
    "options": [
      "Unbounded recursive activation frames are pushed onto the Call Stack until the OS stack guard page is breached, triggering a Stack Overflow (SIGSEGV) crash",
      "The function returns 0 automatically",
      "The CPU executes the function in negative time",
      "The operating system increases stack RAM to infinite capacity"
    ],
    "answer": "Unbounded recursive activation frames are pushed onto the Call Stack until the OS stack guard page is breached, triggering a Stack Overflow (SIGSEGV) crash",
    "explanation": "Call stack memory is strictly bounded (typically 1-8 MB). Unbounded recursion exhausts stack memory rapidly, causing a hard process crash."
  },
  {
    "id": 16,
    "question": "What is the optimal Asymptotic Time Complexity targeted in \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "O(1) constant or O(log N) logarithmic / O(N) linear time depending on the exact operational phase",
      "O(N!) factorial time",
      "O(2^N) exponential time",
      "O(N^4) polynomial time"
    ],
    "answer": "O(1) constant or O(log N) logarithmic / O(N) linear time depending on the exact operational phase",
    "explanation": "Industrial algorithms strive for logarithmic O(log N) or linear O(N) upper bounds to ensure scalable execution on millions of data records."
  },
  {
    "id": 17,
    "question": "What is the difference between 'Auxiliary Space Complexity' and 'Total Space Complexity' for \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\"?",
    "options": [
      "Auxiliary Space measures only the extra temporary working memory allocated by the algorithm, excluding the input data size itself",
      "Auxiliary Space includes the hard disk swap partition",
      "Total Space measures only CPU register usage",
      "There is no difference between auxiliary and total space"
    ],
    "answer": "Auxiliary Space measures only the extra temporary working memory allocated by the algorithm, excluding the input data size itself",
    "explanation": "An algorithm that sorts an array of size N in-place uses O(N) total space (for input) but strictly O(1) auxiliary working space."
  },
  {
    "id": 18,
    "question": "What is the formal definition of 'Amortized Time Complexity' in data structure operations?",
    "options": [
      "The average time per operation evaluated over a worst-case sequence of N consecutive operations (e.g. dynamic array doubling)",
      "The best-case execution time on a sorted array",
      "The time taken when running on multiple CPU cores",
      "The compilation time of the program"
    ],
    "answer": "The average time per operation evaluated over a worst-case sequence of N consecutive operations (e.g. dynamic array doubling)",
    "explanation": "Amortized analysis guarantees that even if an occasional single operation is expensive (e.g. O(N) reallocation), the average cost per operation across a long sequence remains strictly O(1)."
  },
  {
    "id": 19,
    "question": "According to the Master Theorem for divide-and-conquer recurrences T(n) = aT(n/b) + f(n), what determines the overall complexity?",
    "options": [
      "The asymptotic comparison between the work done at the leaves n^(log_b a) and the work done at the divide/combine step f(n)",
      "The total number of global variables in the C source file",
      "The physical clock speed of the CPU in GHz",
      "The RAM bus width"
    ],
    "answer": "The asymptotic comparison between the work done at the leaves n^(log_b a) and the work done at the divide/combine step f(n)",
    "explanation": "The Master Theorem compares $f(n)$ against the watershed function $n^{\\log_b a}$ to determine whether leaf work, root work, or balanced tree work dominates the asymptotic bound."
  },
  {
    "id": 20,
    "question": "Why is an algorithm with O(N log N) time complexity vastly superior to O(N^2) for N = 1,000,000 elements?",
    "options": [
      "For N = 10^6, N log2(N) is ~20 million operations, whereas N^2 is 1 trillion (10^12) operations—running in milliseconds vs hours",
      "Because log N removes negative numbers",
      "Because O(N^2) is not compilable in modern C",
      "Because O(N log N) uses zero CPU power"
    ],
    "answer": "For N = 10^6, N log2(N) is ~20 million operations, whereas N^2 is 1 trillion (10^12) operations—running in milliseconds vs hours",
    "explanation": "Asymptotic growth curves diverge exponentially at scale: a 1-trillion operation workload takes ~16 minutes at 1 GHz, while 20 million operations take ~0.02 seconds."
  },
  {
    "id": 21,
    "question": "In the Barrackpore Lab dialogue for \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\", what key insight does Sukanta Sir emphasize regarding pointer ownership?",
    "options": [
      "Every dynamically allocated heap resource must have exactly ONE clearly designated owner responsible for its lifecycle and deallocation",
      "All pointers should be global variables to avoid passing arguments",
      "Pointers should never be freed until the operating system shuts down",
      "Always cast every pointer to a float"
    ],
    "answer": "Every dynamically allocated heap resource must have exactly ONE clearly designated owner responsible for its lifecycle and deallocation",
    "explanation": "Disciplined resource ownership prevents both orphaned memory leaks and catastrophic double-free heap corruption bugs in enterprise C architectures."
  },
  {
    "id": 22,
    "question": "Which compiler flag in GCC/Clang should always be enabled during development of \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\" to detect memory leaks and boundary violations at runtime?",
    "options": [
      "-fsanitize=address -g (AddressSanitizer / ASan)",
      "-O3 (Maximum optimization only)",
      "-w (Disable all warnings)",
      "-fno-exceptions"
    ],
    "answer": "-fsanitize=address -g (AddressSanitizer / ASan)",
    "explanation": "AddressSanitizer instruments memory operations with shadow memory guards, reporting exact source code line numbers for out-of-bounds reads/writes and memory leaks."
  },
  {
    "id": 23,
    "question": "In real-world enterprise infrastructure (e.g. Linux Kernel, Redis, PostgreSQL), where is \"Item Reconstruction Phase: Backtracking through the DP table from `dp[n][W]` to identify the exact subset of items selected\" actively applied?",
    "options": [
      "Core system subsystems such as memory allocators, database index engines, virtual file systems (VFS), and high-throughput network packet buffers",
      "Writing simple word processing macros only",
      "Designing static HTML pages",
      "Disabling hardware interrupts exclusively"
    ],
    "answer": "Core system subsystems such as memory allocators, database index engines, virtual file systems (VFS), and high-throughput network packet buffers",
    "explanation": "The data structures and algorithmic patterns in this track form the fundamental bedrock of operating system kernels, relational storage engines, and high-frequency trading engines."
  },
  {
    "id": 24,
    "question": "What is the diagnostic difference between a 'Definitely Lost' leak and a 'Still Reachable' leak in Valgrind Memcheck?",
    "options": [
      "'Definitely Lost' means all pointers to the allocated block were lost (unrecoverable leak); 'Still Reachable' means pointers to the block still exist at program exit",
      "'Still Reachable' means the CPU memory is permanently damaged",
      "'Definitely Lost' indicates a hardware disk fault",
      "Both indicate syntax compilation errors"
    ],
    "answer": "'Definitely Lost' means all pointers to the allocated block were lost (unrecoverable leak); 'Still Reachable' means pointers to the block still exist at program exit",
    "explanation": "Definitely lost leaks represent fundamental bugs where memory became unreachable during runtime. Still reachable blocks are typically global pointers not explicitly freed before process termination."
  },
  {
    "id": 25,
    "question": "What is the ultimate takeaway from Sukanta Sir's Barrackpore Lab on mastering Data Structures in C?",
    "options": [
      "True mastery requires bridging high-level mathematical abstractions with exact low-level physical byte layouts, cache locality, and zero-leak memory management",
      "Memorizing syntax without understanding memory is sufficient",
      "Always avoid pointers and use global variables",
      "C is strictly a theoretical academic language"
    ],
    "answer": "True mastery requires bridging high-level mathematical abstractions with exact low-level physical byte layouts, cache locality, and zero-leak memory management",
    "explanation": "Understanding how algorithms interact with CPU cache lines, stack frames, and the OS heap allocator is what distinguishes an exceptional systems engineer from a syntax coder."
  }
];

export default questions;
