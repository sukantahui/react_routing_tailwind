// topic3_questions.js - 25 FAQs for free() & Dangling Pointer Elimination

const questions = [
  {
    question: "What is the function prototype of free() in <stdlib.h>?",
    answer: "The prototype is: 'void free(void *ptr);'. It accepts a pointer to a memory block previously allocated by malloc(), calloc(), or realloc(), and releases that block back to the heap memory manager."
  },
  {
    question: "Does calling free(ptr) set the pointer 'ptr' to NULL automatically?",
    answer: "No! 'free(ptr)' receives a copy of the pointer address by value. It informs the heap manager to release the underlying memory, but the variable 'ptr' continues to hold the now-invalid memory address. This is why it becomes a 'Dangling Pointer'."
  },
  {
    question: "What is a Dangling Pointer in C?",
    answer: "A dangling pointer is a pointer variable that still holds the memory address of a memory block that has already been deallocated (freed or returned stack frame). Accessing or modifying a dangling pointer is a severe 'Use-After-Free' security vulnerability."
  },
  {
    question: "How do you permanently neutralize a dangling pointer after calling free()?",
    answer: "Immediately assign NULL to the pointer after freeing: 'free(ptr); ptr = NULL;'. Attempting to access a NULL pointer triggers an immediate clean crash rather than silent memory corruption."
  },
  {
    question: "What happens if you call free(NULL) in standard C?",
    answer: "The ANSI C, C99, C11, and C17 standards explicitly specify that calling 'free(NULL)' is completely safe and performs no action (it is a guaranteed no-op). You do not need to check 'if (ptr != NULL)' before calling free()."
  },
  {
    question: "What is a Double Free error?",
    answer: "A double free occurs when 'free()' is called more than once on the same memory address without an intervening allocation. It corrupts the allocator's internal free list/bins, often resulting in process abortion or arbitrary code execution exploits."
  },
  {
    question: "How does setting pointers to NULL prevent Double Free errors?",
    answer: "Because 'free(NULL)' is a safe no-op, if you set 'ptr = NULL' after the first free, any accidental subsequent 'free(ptr)' calls simply execute 'free(NULL)', safely preventing allocator corruption."
  },
  {
    question: "What happens if you call free() on a pointer to stack memory (e.g. 'int x; free(&x);')?",
    answer: "Passing a stack address (or static address) to free() is undefined behavior. The heap allocator tries to read metadata chunk headers preceding the address, leading to instant memory management crashes."
  },
  {
    question: "What happens if you increment a pointer and then call free (e.g., 'ptr++; free(ptr);')?",
    answer: "Calling free() on an offset address that is not the exact starting address returned by malloc/calloc/realloc corrupts the heap allocator metadata and crashes the program."
  },
  {
    question: "Does free() immediately wipe the physical contents of the memory to zeroes?",
    answer: "No. For performance reasons, standard allocators do not zero out freed memory; they simply link the chunk into a free-list. Sensitive data (like passwords or encryption keys) should be cleared with 'memset' before calling free()."
  },
  {
    question: "What is a Use-After-Free (UAF) security vulnerability?",
    answer: "UAF occurs when a program continues to read or write to memory through a dangling pointer after calling free(). If another part of the program reallocates that memory, the attacker can hijack function pointers or corrupt application state."
  },
  {
    question: "How does the 'safe_free' wrapper function work with double pointers?",
    answer: "By accepting a pointer-to-a-pointer ('void safe_free(void **pptr)'), the function can dereference the pointer to call 'free(*pptr)' and then set '*pptr = NULL' directly in the caller's scope."
  },
  {
    question: "Can you pass a pointer to free() after casting it to (void*)?",
    answer: "Yes, free() accepts 'void*', so casting is allowed though completely implicit and unnecessary in C."
  },
  {
    question: "What is a Memory Chunk Header in heap allocators like glibc ptmalloc?",
    answer: "The heap allocator stores hidden metadata (chunk size, previous chunk size, allocated/free flags) in the bytes immediately preceding the address returned to the programmer."
  },
  {
    question: "How does free() know how many bytes to release without a size parameter?",
    answer: "free() reads the size metadata embedded in the chunk header immediately preceding the user pointer address in physical memory."
  },
  {
    question: "What is the consequence of memory corruption in the chunk header?",
    answer: "If a buffer overflow writes past its allocated boundary into adjacent metadata, the next call to malloc() or free() will detect allocator corruption and abort with 'corrupted double-linked list' or 'free(): invalid size'."
  },
  {
    question: "Should you free memory allocated dynamically right before main() returns?",
    answer: "Yes! While modern operating systems reclaim process memory on exit, explicitly freeing all allocations is essential for leak-checking tools (Valgrind), library code, and good systems engineering discipline."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax demonstrate dangling pointers?",
    answer: "In Sukanta Hui's class, students print the value of a pointer before and after free(). They observe that the variable still holds the hex address, proving that free() does not alter the pointer variable itself."
  },
  {
    question: "What is a Wild Pointer vs a Dangling Pointer?",
    answer: "An uninitialized pointer containing random garbage bits from the stack is a 'Wild Pointer'. A pointer that previously pointed to valid memory that has since been freed is a 'Dangling Pointer'."
  },
  {
    question: "Can multiple pointers reference the same heap block (aliasing)?",
    answer: "Yes. If 'ptr1' and 'ptr2' point to the same malloc block, calling 'free(ptr1); ptr1 = NULL;' leaves 'ptr2' as an undetected dangling pointer. Aliased pointers must be tracked carefully."
  },
  {
    question: "What is the role of explicit explicit_bzero or memset_s before free?",
    answer: "Standard compilers can optimize away standard 'memset' calls right before 'free()'. Functions like 'explicit_bzero' ensure cryptographic secrets and credentials are wiped from RAM before deallocation."
  },
  {
    question: "Does calling free() return memory immediately to the operating system?",
    answer: "Not necessarily. The runtime allocator keeps freed memory chunks in internal pools/bins to rapidly service future malloc() requests, returning pages to the OS via 'madvise' or 'brk' only when appropriate."
  },
  {
    question: "What error message does GCC/Linux output on a double-free detection?",
    answer: "glibc detects heap metadata inconsistency and terminates the process with: 'free(): double free detected in tcache 2' or 'Aborted (core dumped)'."
  },
  {
    question: "How do modern operating systems defend against heap exploitation?",
    answer: "Through ASLR (Address Space Layout Randomization), allocator metadata hardening (safe unlinking), guard pages, and tcache integrity checks."
  },
  {
    question: "What is the single best habit for heap memory cleanup in C?",
    answer: "Always follow the two-step deallocation rule: 'free(ptr); ptr = NULL;'. This prevents dangling pointers, eliminates double frees, and turns undefined behavior into clean, catchable null-pointer traps."
  }
];

export default questions;
