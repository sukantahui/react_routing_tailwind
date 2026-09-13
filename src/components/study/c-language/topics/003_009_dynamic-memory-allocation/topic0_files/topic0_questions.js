// topic0_questions.js - 25 High Quality FAQs for Stack vs Heap Memory

const questions = [
  {
    question: "What are the primary segments of a C program's virtual memory address space?",
    answer: "A standard C program in virtual memory consists of: 1) Text/Code segment (read-only executable machine instructions), 2) Initialized Data (.data, global/static variables with non-zero initializers), 3) Uninitialized Data (.bss, zero-initialized globals/statics), 4) Heap segment (dynamically allocated memory that grows upward toward higher addresses), and 5) Stack segment (function call frames, local variables, return addresses that grows downward toward lower addresses)."
  },
  {
    question: "How does stack allocation differ fundamentally from heap allocation in C?",
    answer: "Stack allocation is automatic and managed directly by the CPU/compiler: variables are allocated when entering a scope/function and freed automatically upon return. Heap allocation is manual and dynamic: memory is requested at runtime using functions like malloc() and persists across functions until explicitly deallocated with free()."
  },
  {
    question: "Why does the stack grow downward while the heap grows upward in x86/x64 architectures?",
    answer: "Placing the stack at the top of virtual memory and the heap at the bottom allows both dynamic regions to grow toward each other into the large unallocated middle area, maximizing flexible memory usage without needing to partition a fixed boundary in advance."
  },
  {
    question: "What happens when stack memory exhausts its allocated limit?",
    answer: "When recursive calls or massive local arrays exceed the OS-allocated stack limit (typically 1MB to 8MB), a 'Stack Overflow' occurs, causing an immediate segmentation fault (SIGSEGV) crash."
  },
  {
    question: "What happens when heap memory allocation requests exceed available system RAM/swap?",
    answer: "When the operating system cannot allocate requested heap memory, malloc() fails and returns a NULL pointer. If the program attempts to dereference NULL without checking, it triggers an instant segmentation fault."
  },
  {
    question: "Why is stack memory allocation significantly faster than heap allocation?",
    answer: "Stack allocation requires only a single CPU instruction to adjust the Stack Pointer (SP) register (e.g., 'sub rsp, 32'). Heap allocation involves complex runtime allocator bookkeeping, searching free lists/bins, managing fragmentation, and potentially issuing system calls like brk() or mmap()."
  },
  {
    question: "Can local variables inside a function be accessed after the function returns?",
    answer: "No. The stack frame of the function is destroyed (popped) when the function returns. Accessing addresses of local variables returned from functions results in Undefined Behavior (dangling stack pointer)."
  },
  {
    question: "How does heap memory solve the limitation of local variable lifetime?",
    answer: "Heap memory blocks allocated with malloc()/calloc() have program-wide lifetime: they remain valid across function boundaries until the program explicitly calls free() on that pointer or the process terminates."
  },
  {
    question: "What is the Data Segment (.data) versus the BSS Segment (.bss)?",
    answer: "The .data segment stores initialized global and static variables with non-zero initial values (e.g. 'int count = 10;'). The .bss segment (Block Started by Symbol) stores uninitialized global and static variables, which the OS runtime zeroes out automatically before main() executes."
  },
  {
    question: "Where is a pointer variable itself stored when it points to heap memory?",
    answer: "If the pointer is declared as a local variable inside a function (e.g., 'int *ptr = malloc(...)'), the pointer variable 'ptr' (typically 8 bytes on 64-bit systems) resides on the Stack, while the memory block it points to resides on the Heap."
  },
  {
    question: "What header file must be included in C for dynamic memory allocation functions?",
    answer: "The standard header `<stdlib.h>` must be included to access malloc(), calloc(), realloc(), and free()."
  },
  {
    question: "What is the return type of malloc() and why is it significant?",
    answer: "malloc() returns a generic 'void*' pointer (pointer to raw untyped memory). In C, 'void*' implicitly converts to any data pointer type without an explicit cast."
  },
  {
    question: "Is explicit type casting of malloc() mandatory in pure C (e.g., '(int*)malloc(...)')?",
    answer: "In standard C (C89/C99/C11/C17), casting is not mandatory because 'void*' converts implicitly. However, explicit casting is often used in mixed C/C++ environments or specific coding styles to make the target type explicit."
  },
  {
    question: "What is memory fragmentation on the heap?",
    answer: "Fragmentation occurs when repeated allocations and deallocations leave small, non-contiguous holes of free memory scattered across the heap. Even if total free memory is large, a large contiguous allocation may fail."
  },
  {
    question: "What is a Stack Frame (Activation Record)?",
    answer: "A stack frame is a dedicated block of memory pushed onto the runtime call stack whenever a function is called. It stores parameters, local variables, saved register states, and the return instruction address."
  },
  {
    question: "Why should large datasets or arrays not be allocated on the stack?",
    answer: "The stack is restricted to a small predefined size (e.g., 2MB-8MB). Allocating large arrays (like 'int data[2000000];') directly on the stack easily triggers a stack overflow crash. Large buffers should always be dynamically allocated on the heap."
  },
  {
    question: "What is Variable-Length Array (VLA) in C99 and where does it allocate memory?",
    answer: "VLAs (e.g., 'int arr[n];' where n is a runtime variable) are allocated on the stack in C99. They can risk stack overflow if 'n' is very large or user-controlled, which is why VLAs were made optional in C11."
  },
  {
    question: "What is the role of the Base Pointer (RBP / EBP) vs Stack Pointer (RSP / ESP)?",
    answer: "The Base Pointer (RBP) serves as a stable reference anchor to access function parameters and local variables via fixed offsets, while the Stack Pointer (RSP) tracks the top of the currently active stack frame."
  },
  {
    question: "Does the OS automatically reclaim heap memory when a program terminates?",
    answer: "Yes, modern operating systems reclaim all virtual memory pages associated with a process upon termination. However, relying on this causes severe memory leaks in long-running services, daemons, and embedded firmware."
  },
  {
    question: "What is the difference between static allocation, automatic allocation, and dynamic allocation?",
    answer: "Static allocation occurs at compile time (.data / .bss, lifetime = entire program). Automatic allocation occurs at runtime on the stack (lifetime = scope of block/function). Dynamic allocation occurs on demand on the heap at runtime (lifetime = controlled manually via malloc/free)."
  },
  {
    question: "What happens if you return a pointer to a heap-allocated buffer from a function?",
    answer: "It is completely valid and standard C practice. The heap memory persists until explicitly freed by the caller."
  },
  {
    question: "Can heap memory addresses be lower than stack memory addresses?",
    answer: "Yes, in standard process virtual address spaces on Linux and Windows, the heap starts just above the BSS segment at lower addresses and grows upward, while the stack starts near the top of the user address space and grows downward."
  },
  {
    question: "What is the purpose of the 'sizeof' operator when allocating heap memory?",
    answer: "The 'sizeof' operator ensures hardware-portable allocation by computing the exact byte size of a type or structure across different compilers and CPU architectures (e.g., 'malloc(10 * sizeof(int))')."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax illustrate stack vs heap?",
    answer: "In Sukanta Hui's classroom in Barrackpore, students inspect memory addresses using '%p' in printf, observing high memory addresses (e.g., 0x7ffd...) for stack variables and lower addresses (e.g., 0x55a2... or 0x01a8...) for heap pointers."
  },
  {
    question: "What is the golden rule of dynamic memory management in C?",
    answer: "Every successful allocation (malloc/calloc/realloc) must have exactly one corresponding deallocation (free), and pointers must be set to NULL after being freed."
  }
];

export default questions;
