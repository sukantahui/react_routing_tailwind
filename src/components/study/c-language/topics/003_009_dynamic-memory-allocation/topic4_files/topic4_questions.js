// topic4_questions.js - 25 FAQs for Memory Hazards & Diagnostics

const questions = [
  {
    question: "What is a Memory Leak in C?",
    answer: "A memory leak occurs when dynamically allocated heap memory is no longer needed or reachable by any pointer variable in the program, but has not been released via free()."
  },
  {
    question: "What are the severe consequences of memory leaks in production software?",
    answer: "In long-running software like web servers, database engines, operating system kernels, and IoT embedded devices, unaddressed memory leaks gradually consume all system RAM, degrading performance and eventually triggering an out-of-memory (OOM) crash."
  },
  {
    question: "What is a Wild Pointer?",
    answer: "A wild pointer is an uninitialized pointer variable declared without an explicit initial value (e.g. 'int *p;'). It contains whatever arbitrary bit pattern was in its stack location and points to an unknown, dangerous memory address."
  },
  {
    question: "How do you prevent Wild Pointers?",
    answer: "Always initialize pointer variables immediately upon declaration, either to a valid allocated address or explicitly to NULL: 'int *ptr = NULL;'."
  },
  {
    question: "What is a Buffer Overflow on the heap (Heap Overflow)?",
    answer: "A heap buffer overflow occurs when data is written past the boundary of a dynamically allocated buffer, corrupting adjacent heap chunks and allocator metadata."
  },
  {
    question: "What is a Buffer Underflow in dynamic memory?",
    answer: "A buffer underflow occurs when an algorithm writes or reads memory addresses preceding the starting address of the allocated buffer (e.g., negative array indexing 'ptr[-1]')."
  },
  {
    question: "What is Valgrind and how is it used in C development?",
    answer: "Valgrind is an open-source instrumentation framework for Linux that runs executables in a synthetic CPU environment to track every single byte of allocated memory, pinpointing exact source line numbers for memory leaks, invalid reads/writes, and uninitialized values."
  },
  {
    question: "What command line option runs a full memory leak check in Valgrind?",
    answer: "The command is: 'valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes ./my_program'."
  },
  {
    question: "What is AddressSanitizer (ASan) in modern GCC and Clang compilers?",
    answer: "AddressSanitizer is a high-performance compiler instrumentation tool that inserts shadow-memory checks to detect out-of-bounds accesses, use-after-free, double-free, and memory leaks at near-native execution speed."
  },
  {
    question: "How do you compile a C program with AddressSanitizer enabled?",
    answer: "Use the flags: 'gcc -fsanitize=address -g -O1 my_program.c -o my_program'."
  },
  {
    question: "What is the difference between 'definitely lost', 'indirectly lost', and 'still reachable' in Valgrind?",
    answer: "'Definitely lost' means no pointer references the memory block (true leak). 'Indirectly lost' means the block is referenced by another leaked block (e.g., child nodes of a leaked linked list). 'Still reachable' means memory was not freed before exit but pointers still pointed to it."
  },
  {
    question: "Can memory leaks be detected by the C compiler at compile time?",
    answer: "Traditional compilers cannot reliably detect all memory leaks because pointer lifetimes depend on runtime control flow and user input. Dynamic diagnostic tools (ASan, Valgrind) or static analyzers (Clang Static Analyzer) are required."
  },
  {
    question: "What is an Out-Of-Memory (OOM) Killer in Linux?",
    answer: "The Linux kernel OOM Killer is a background daemon that monitors RAM exhaustion; when total physical memory and swap are completely filled by leaking processes, it forcefully terminates the highest memory-consuming process (SIGKILL)."
  },
  {
    question: "What is a Memory Pool (Arena Allocator)?",
    answer: "A custom memory management pattern where a program allocates one massive chunk of memory upfront and handles sub-allocations internally, allowing the entire arena to be freed in a single O(1) free() call, eliminating leaks by design."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax demonstrate memory leaks?",
    answer: "In Sukanta Hui's class, students run programs through AddressSanitizer and Valgrind in terminal sessions, analyzing stack traces that point directly to the exact file and line number where leaked memory was originally allocated."
  },
  {
    question: "What is the consequence of dereferencing a NULL pointer in C?",
    answer: "Virtual memory page 0 (0x00000000) is protected by the operating system kernel. Any read or write access to page 0 raises a hardware page fault exception, instantly terminating the process with a segmentation fault."
  },
  {
    question: "Why should pointer arithmetic be carefully bounded?",
    answer: "Incrementing a pointer beyond the allocated buffer boundaries leads to undefined behavior. Reading yields corrupted data; writing corrupts adjacent data structures or heap metadata."
  },
  {
    question: "What is Type Punning in C dynamic memory?",
    answer: "Type punning involves reinterpreting a block of memory as a different type by casting pointers (e.g., casting an 'int*' buffer to 'char*'). It must adhere to strict aliasing rules to avoid compiler optimization bugs."
  },
  {
    question: "What is Memory Alignment and how does malloc ensure it?",
    answer: "CPUs access memory fastest when addresses are multiples of data sizes (e.g., 8-byte aligned for 64-bit pointers and doubles). Standard malloc() is guaranteed to return memory aligned suitably for any fundamental object type (typically 16-byte alignment on 64-bit platforms)."
  },
  {
    question: "What happens if you allocate memory inside a loop without freeing it?",
    answer: "Each iteration consumes additional heap RAM. If the loop executes 1,000,000 times allocating 1KB each time, the process leaks approximately 1 Gigabyte of RAM within seconds."
  },
  {
    question: "What is the RAII idiom and does pure C support it natively?",
    answer: "Resource Acquisition Is Initialization (RAII) ties resource management to object lifetime (common in C++ and Rust). Pure C does not have native RAII destructors, meaning developers must write disciplined explicit cleanup functions."
  },
  {
    question: "What is GCC's '__attribute__((cleanup))' extension?",
    answer: "A GCC/Clang C extension that allows a developer to bind a cleanup function (such as free) to a local pointer variable so it is automatically freed when leaving scope."
  },
  {
    question: "What is LeakSanitizer (LSan)?",
    answer: "LeakSanitizer is a memory leak detector integrated directly into AddressSanitizer in GCC/Clang. It runs automatically at process exit to verify that zero heap bytes remain orphaned."
  },
  {
    question: "How can static analysis tools help catch memory hazards?",
    answer: "Tools like 'cppcheck', 'clang --analyze', and SonarQube perform path-sensitive dataflow analysis to flag uninitialized pointers, unmatched malloc/free pairs, and potential null dereferences before compilation."
  },
  {
    question: "What is the ultimate checklist for zero-defect C memory management?",
    answer: "1) Always check for NULL after malloc/calloc/realloc, 2) Set pointers to NULL after free, 3) Match every allocation with a deallocation, 4) Initialize all pointers on declaration, and 5) Test with '-fsanitize=address' on every build."
  }
];

export default questions;
