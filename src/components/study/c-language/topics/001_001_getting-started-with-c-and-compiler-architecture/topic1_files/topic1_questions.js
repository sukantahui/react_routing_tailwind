const questions = [
  {
    question: "When and where was the C programming language created, and by whom?",
    shortAnswer: "C was created in 1972 at AT&T Bell Laboratories in New Jersey by Dennis Ritchie.",
    explanation: "Dennis Ritchie developed C to re-write the Unix operating system kernel, which was previously written in assembly language. C provided high-level structured control with low-level hardware memory access.",
    hint: "Think Dennis Ritchie, Bell Labs, 1972, Unix OS.",
    level: "basic"
  },
  {
    question: "What language preceded C, and how did C evolve from it?",
    shortAnswer: "C evolved from B (developed by Ken Thompson), which itself was derived from BCPL.",
    explanation: "BCPL and B were typeless languages that treated all data as raw machine words. Ritchie added data types (like char and int) and structure definitions to B, creating 'C' (the next letter after B).",
    hint: "BCPL -> B -> C.",
    level: "basic"
  },
  {
    question: "What is K&R C, and what publication defined it?",
    shortAnswer: "K&R C refers to the informal 1978 specification published in 'The C Programming Language' book by Brian Kernighan and Dennis Ritchie.",
    explanation: "Before formal ANSI/ISO standardization, K&R C served as the de facto reference standard for C compiler developers worldwide.",
    hint: "Kernighan & Ritchie 1978 book.",
    level: "basic"
  },
  {
    question: "What major additions were introduced in ANSI C89 / ISO C90?",
    shortAnswer: "Function prototypes, the void* generic pointer, const and volatile type qualifiers, and standard library header definitions.",
    explanation: "C89 introduced strict compiler checking of function parameter types via prototypes, eliminating dangerous parameter mismatch bugs common in K&R C.",
    hint: "Function prototypes and void* pointers were born in C89.",
    level: "intermediate"
  },
  {
    question: "What major syntax features were introduced in ISO C99?",
    shortAnswer: "Single-line comments (//), variable declarations anywhere in a block, <stdint.h> fixed-width types, <stdbool.h>, and Variable Length Arrays (VLAs).",
    explanation: "C99 modernized C by allowing developers to declare loop counters directly inside for-loop headers (e.g. for (int i = 0; ...)) and introduced portable fixed-width integers like int32_t.",
    hint: "// comments, for (int i=0; ...), and <stdint.h> came in C99.",
    level: "intermediate"
  },
  {
    question: "What key features were added in ISO C11?",
    shortAnswer: "Native multi-threading support (<threads.h>), _Static_assert, anonymous structs/unions, and alignment control (<stdalign.h>).",
    explanation: "C11 focused on multi-core CPU architecture support and static compile-time safety checks using _Static_assert.",
    hint: "Multi-threading and static assertions.",
    level: "advanced"
  },
  {
    question: "What is ISO C17 / C18, and what did it focus on?",
    shortAnswer: "C17 was a bug-fix and clarification release that introduced no new language features.",
    explanation: "Instead of adding new syntax, C17 resolved defect reports and clarified ambiguities in the C11 standard specification.",
    hint: "Bug-fix maintenance release.",
    level: "intermediate"
  },
  {
    question: "What modern innovations were added in ISO C23?",
    shortAnswer: "Binary literals (0b0101), constexpr, typeof operator, auto type inference, and nullptr keyword.",
    explanation: "C23 brought modern ergonomics from C++ and Rust into standard C, including native binary numbers like 0b1010 and compile-time constexpr constants.",
    hint: "0b binary literals and nullptr.",
    level: "advanced"
  },
  {
    question: "Why was C chosen to write the Unix operating system?",
    shortAnswer: "C allowed operating system code to be written in a portable, high-level language with direct pointer memory access.",
    explanation: "Prior to C, operating systems were written in non-portable assembly code tied to specific CPU hardware. C allowed 95%+ of the Unix kernel to compile across different hardware platforms.",
    hint: "Portability across hardware architectures.",
    level: "intermediate"
  },
  {
    question: "How do you specify a target C standard version in GCC?",
    shortAnswer: "Use the -std flag, such as gcc -std=c99 main.c or gcc -std=c11 main.c.",
    explanation: "Passing -std=c99 enforces strict conformance to the C99 specification and disables non-standard compiler extensions unless -std=gnu99 is used.",
    hint: "gcc -std=c99 or -std=c11",
    level: "basic"
  },
  {
    question: "What was the main drawback of K&R function parameter declarations?",
    shortAnswer: "K&R declarations did not specify parameter types in the function header, preventing compile-time parameter checking.",
    explanation: "In K&R C, functions were declared without argument types (e.g. int sum(a, b) int a, b; {}), allowing callers to pass wrong argument types without compiler warnings.",
    hint: "Lack of prototype parameter validation.",
    level: "intermediate"
  },
  {
    question: "What is the role of ISO/IEC JTC1/SC22/WG14?",
    shortAnswer: "It is the official international working group responsible for maintaining and revising the C language standard.",
    explanation: "WG14 meets regularly to review proposal documents (N-numbers) and publish new C standard revisions like C99, C11, C17, and C23.",
    hint: "The official C standardization working group.",
    level: "advanced"
  },
  {
    question: "Why did C99 introduce fixed-width integer types in <stdint.h>?",
    shortAnswer: "To eliminate architecture-dependent byte size variations of standard integer types.",
    explanation: "On 16-bit systems int is 2 bytes, while on 32-bit systems int is 4 bytes. Types like int32_t and uint8_t are guaranteed to be exactly 32 bits and 8 bits on all compilers.",
    hint: "int32_t is guaranteed 32 bits everywhere.",
    level: "intermediate"
  },
  {
    question: "What is POSIX and how does it relate to standard C?",
    shortAnswer: "POSIX is an IEEE standard defining system call APIs for Unix-like operating systems building upon standard C.",
    explanation: "While standard C defines portable core headers (<stdio.h>, <stdlib.h>), POSIX defines OS-level APIs like fork(), pthread_create(), and open().",
    hint: "Portable Operating System Interface.",
    level: "advanced"
  },
  {
    question: "What is the difference between standard C and GNU C (gnu99 / gnu11)?",
    shortAnswer: "Standard C follows ISO specs; GNU C includes extra GCC-specific compiler extensions.",
    explanation: "GCC extensions like statement expressions ({ int x = 5; x; }) and __attribute__((packed)) are available under -std=gnu11 but fail under strict -std=c11 -pedantic.",
    hint: "GNU extensions vs portable ISO standard.",
    level: "intermediate"
  },
  {
    question: "Why was the 'gets()' function deprecated in C99 and removed in C11?",
    shortAnswer: "gets() cannot prevent buffer overflow security vulnerabilities.",
    explanation: "gets() does not accept a buffer size parameter, reading console input until newline regardless of destination buffer size. It was replaced by fgets().",
    hint: "Buffer overflow vulnerability.",
    level: "basic"
  },
  {
    question: "What are Variable Length Arrays (VLAs) in C99, and why were they made optional in C11?",
    shortAnswer: "VLAs allow array sizes determined at runtime on the stack; made optional due to stack overflow risks.",
    explanation: "declaring int arr[n]; on stack when n is large can crash the call stack. C11 made VLAs optional via __STDC_NO_VLA__.",
    hint: "Stack allocation based on runtime variables.",
    level: "advanced"
  },
  {
    question: "What is the difference between C and C++ in terms of language evolution?",
    shortAnswer: "C remains a lightweight procedural systems language; C++ evolved into an object-oriented multi-paradigm language.",
    explanation: "C++ was created by Bjarne Stroustrup in 1979 as 'C with Classes'. While C++ added classes, templates, and RAII, C preserved minimal runtime overhead.",
    hint: "Bjarne Stroustrup created C++ from C.",
    level: "basic"
  },
  {
    question: "What is the significance of the PDP-11 computer in C history?",
    shortAnswer: "The PDP-11 was the Digital Equipment Corporation (DEC) minicomputer on which Unix and C were originally implemented.",
    explanation: "C's increment operator (++) and auto-decrement pointers were directly influenced by the hardware address modes of the PDP-11 architecture.",
    hint: "DEC PDP-11 minicomputer.",
    level: "intermediate"
  },
  {
    question: "What is _Static_assert in C11?",
    shortAnswer: "A compile-time assertion that stops compilation if an expression evaluates to false.",
    explanation: "_Static_assert(sizeof(int) == 4, \"int must be 4 bytes\"); halts the compiler during build phase if the condition fails.",
    hint: "Compile-time assertion check.",
    level: "advanced"
  },
  {
    question: "What does the 'inline' keyword introduced in C99 do?",
    shortAnswer: "It hints to the compiler to substitute function body directly at call sites to eliminate call stack overhead.",
    explanation: "Inlining small helper functions eliminates stack frame push/pop overhead, boosting performance in tight computational loops.",
    hint: "Eliminate function call overhead.",
    level: "intermediate"
  },
  {
    question: "Why is C still dominant in Linux kernel and microcontroller development today?",
    shortAnswer: "Zero hidden runtime overhead, predictable assembly output, and direct hardware register access.",
    explanation: "C has no hidden garbage collection pauses, no background runtime engine, and maps cleanly to CPU assembly instructions.",
    hint: "Zero abstraction runtime overhead.",
    level: "basic"
  },
  {
    question: "What is the purpose of the <stdbool.h> header introduced in C99?",
    shortAnswer: "It defines the bool data type along with true (1) and false (0) macros.",
    explanation: "Before C99, C programmers used int or custom enum definitions for boolean flags. <stdbool.h> standardized boolean types.",
    hint: "Provides bool, true, and false.",
    level: "basic"
  },
  {
    question: "What is strict aliasing in C standards?",
    shortAnswer: "A compiler optimization rule stating that pointers of different types do not point to the same memory location.",
    explanation: "Violating strict aliasing rules (e.g. dereferencing an int* via a float*) causes unpredictable compiler optimization bugs.",
    hint: "Pointer type memory aliasing rules.",
    level: "expert"
  },
  {
    question: "What is the future direction of C in modern systems programming?",
    shortAnswer: "Enhancing type safety, compile-time assertions, and inter-operability with C++ and Rust.",
    explanation: "Future C standards continue adding modern compile-time ergonomics while preserving backward compatibility and zero-cost abstraction principles.",
    hint: "Type safety without sacrificing zero-overhead speed.",
    level: "intermediate"
  }
];

export default questions;
