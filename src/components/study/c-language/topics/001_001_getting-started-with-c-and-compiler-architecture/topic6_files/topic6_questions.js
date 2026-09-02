// src/components/study/c-language/topics/001_001_getting-started-with-c-and-compiler-architecture/topic6_files/topic6_questions.js

export const questions = [
  // --------------------------------------------------------------------------
  // SUB-DOMAIN 1: HISTORY, ORIGIN, & PHILOSOPHY OF C LANGUAGE (Questions 1-35)
  // --------------------------------------------------------------------------
  {
    question: "Who is universally recognized as the principal creator of the C Programming Language?",
    options: ["Bjarne Stroustrup", "Dennis Ritchie", "Ken Thompson", "Linus Torvalds"],
    answerIndex: 1,
    explanation: "Dennis Ritchie developed the C programming language at AT&T Bell Laboratories between 1969 and 1973 to construct the UNIX operating system."
  },
  {
    question: "In which institution was the C language originally developed?",
    options: ["MIT Computer Science and Artificial Intelligence Lab", "AT&T Bell Laboratories", "Xerox PARC", "IBM Thomas J. Watson Research Center"],
    answerIndex: 1,
    explanation: "C was created at AT&T Bell Labs in Murray Hill, New Jersey, during the early 1970s."
  },
  {
    question: "Which language served as the direct predecessor to C?",
    options: ["Pascal", "B Language (derived from BCPL)", "Fortran 77", "ALGOL 60"],
    answerIndex: 1,
    explanation: "Ken Thompson developed 'B' (based on BCPL). Dennis Ritchie extended B by adding data types, creating 'New B' which evolved into C."
  },
  {
    question: "In what year was the C language first deployed for rewriting the UNIX kernel on the DEC PDP-11?",
    options: ["1965", "1972", "1985", "1995"],
    answerIndex: 1,
    explanation: "By 1972, C was mature enough that most of the UNIX kernel was rewritten from PDP-11 assembly into C."
  },
  {
    question: "Why is C often referred to as a 'middle-level' programming language?",
    options: [
      "Because it runs half as fast as assembly language",
      "Because it combines high-level structured control flow with low-level direct memory manipulation",
      "Because it can only run on mid-range computers",
      "Because it lacks support for pointers"
    ],
    answerIndex: 1,
    explanation: "C provides high-level abstractions (loops, functions, structures) while permitting low-level hardware control (pointers, bitwise operators, direct memory addressing)."
  },
  {
    question: "Which operating system kernel's development was the primary driving force behind the invention of C?",
    options: ["MS-DOS", "UNIX", "VMS", "CP/M"],
    answerIndex: 1,
    explanation: "UNIX was originally written in assembly language. Dennis Ritchie created C to provide a portable language capable of implementing the UNIX operating system."
  },
  {
    question: "Which machine architecture was used for the initial implementation of the C language compiler?",
    options: ["ENIAC", "DEC PDP-11", "Intel 8086", "IBM System/360"],
    answerIndex: 1,
    explanation: "The C compiler and early C language features were specifically designed and tested on the Digital Equipment Corporation (DEC) PDP-11 computer."
  },
  {
    question: "Who co-authored the seminal 1978 book 'The C Programming Language', establishing the 'K&R C' informal standard?",
    options: ["Dennis Ritchie & Ken Thompson", "Brian Kernighan & Dennis Ritchie", "Bjarne Stroustrup & Herb Sutter", "Donald Knuth & Niklaus Wirth"],
    answerIndex: 1,
    explanation: "Brian Kernighan and Dennis Ritchie published the first edition of 'The C Programming Language' in 1978, commonly referred to as K&R."
  },
  {
    question: "What is the key characteristic of procedural programming as implemented in C?",
    options: [
      "Code is organized into classes and objects with inheritance",
      "Programs are structured as a series of function calls and procedure executions acting on data",
      "Execution depends entirely on event listeners and reactive streams",
      "Variables are immutable and functions cannot produce side effects"
    ],
    answerIndex: 1,
    explanation: "C follows the procedural (imperative) paradigm where programs are organized around procedures (functions) that manipulate state sequentially."
  },
  {
    question: "Which feature distinguishes C from pure assembly language?",
    options: [
      "Hardware portability across different CPU architectures",
      "Direct manipulation of memory addresses",
      "Bitwise logical operations",
      "Ability to compile to machine code"
    ],
    answerIndex: 0,
    explanation: "Assembly is locked to a specific CPU instruction set architecture (ISA). C code is portable across CPU architectures by recompiling with architecture-specific compilers."
  },
  {
    question: "Which language was BCPL (Basic Combined Programming Language) designed by Martin Richards in 1967 derived from?",
    options: ["C++", "CPL (Combined Programming Language)", "COBOL", "BASIC"],
    answerIndex: 1,
    explanation: "BCPL was a stripped-down version of CPL. BCPL influenced Thompson's B, which directly led to Ritchie's C."
  },
  {
    question: "What was a major limitation of the 'B' language that C resolved?",
    options: [
      "B was typeless and treated all data as word-length integers",
      "B did not support loops or conditionals",
      "B could not access hardware RAM",
      "B was an interpreted scripting language"
    ],
    answerIndex: 0,
    explanation: "B was typeless—every variable occupied one machine word. C introduced data types (char, int, float, double, etc.) allowing proper handling of different memory sizes."
  },
  {
    question: "Why is C considered a compiled language rather than an interpreted language?",
    options: [
      "C source code is translated ahead-of-time directly into native machine instructions before execution",
      "C source code is read line-by-line by a Virtual Machine at runtime",
      "C code is converted into JavaScript bytecode",
      "C requires a browser runtime to execute"
    ],
    answerIndex: 0,
    explanation: "C compilers translate source `.c` files into native machine code object files (`.o`/`.obj`) ahead of time, eliminating runtime interpretation overhead."
  },
  {
    question: "Which of the following modern operating systems is written predominantly in C?",
    options: ["Linux Kernel", "Windows NT Kernel", "macOS Xnu Kernel", "All of the above"],
    answerIndex: 3,
    explanation: "The core kernels of Linux, Windows NT, macOS (XNU), Android, iOS, and FreeBSD are primarily written in C."
  },
  {
    question: "What is the primary benefit of C's minimal runtime footprint?",
    options: [
      "Maximum runtime speed and suitability for microcontrollers and OS kernels",
      "Automatic memory garbage collection without developer intervention",
      "Built-in web user interface components",
      "Automatic protection against array index out-of-bounds"
    ],
    answerIndex: 0,
    explanation: "C has zero heavy garbage collectors or VM overhead, making it ideal for systems with strict latency or memory constraints (like microcontrollers and kernels)."
  },
  {
    question: "Does the C language specification enforce automatic garbage collection?",
    options: ["Yes, through a built-in generational garbage collector", "No, memory management is manual (malloc/free)", "Yes, via reference counting", "Only in C17 and later"],
    answerIndex: 1,
    explanation: "C requires the developer to explicitly manage dynamic memory allocations (`malloc`/`calloc`/`realloc`/`free`). There is no built-in automatic garbage collector."
  },
  {
    question: "What does portability mean in the context of C programming?",
    options: [
      "A compiled binary executable `.exe` can run on any OS without modification",
      "Source code written according to ISO C standards can be compiled on different CPU architectures with minimal or no code changes",
      "C programs can automatically translate themselves to Python",
      "C code runs inside any web browser natively"
    ],
    answerIndex: 1,
    explanation: "C source code is portable across architectures (x86, ARM, RISC-V) when standard-compliant code is recompiled with the target machine's C compiler."
  },
  {
    question: "Which of the following database engines is written primarily in C?",
    options: ["SQLite", "MySQL / MariaDB", "PostgreSQL", "All of the above"],
    answerIndex: 3,
    explanation: "Major relational database management engines—SQLite, MySQL, and PostgreSQL—are implemented in C and C++ for maximum throughput."
  },
  {
    question: "Why is C called a strongly structured programming language?",
    options: [
      "It requires OOP classes for every function",
      "It uses modular functions, block scoping `{}` and structured control flow constructs (if, for, while) instead of unstructured `goto` jumps",
      "It enforces strict typing with mandatory automatic memory bounds checking",
      "It prevents pointers from accessing arbitrary memory addresses"
    ],
    answerIndex: 1,
    explanation: "C replaced spaghetti `goto` jumps with structured control blocks (`if`/`else`, `while`, `for`) and modular functions."
  },
  {
    question: "What is the standard file extension for a C language source file?",
    options: [".cpp", ".c", ".h", ".obj"],
    answerIndex: 1,
    explanation: "C source code files use the `.c` extension. Header files use `.h`."
  },
  {
    question: "What is the standard file extension for a C header file containing function declarations and macro definitions?",
    options: [".c", ".h", ".i", ".s"],
    answerIndex: 1,
    explanation: "Header files containing declarations, type definitions, and macro prototypes use the `.h` extension."
  },
  {
    question: "Which famous programming language was developed by Bjarne Stroustrup in 1979 as an extension of C with classes?",
    options: ["C#", "C++", "Java", "Objective-C"],
    answerIndex: 1,
    explanation: "Bjarne Stroustrup created 'C with Classes' at Bell Labs in 1979, which was later renamed to C++ in 1983."
  },
  {
    question: "Which language created by Brad Cox and Tom Love in the early 1980s added Smalltalk-style messaging to C?",
    options: ["Swift", "Objective-C", "D Language", "Rust"],
    answerIndex: 1,
    explanation: "Objective-C incorporated Smalltalk messaging onto C, serving as NeXTSTEP and Apple's primary system language for macOS/iOS prior to Swift."
  },
  {
    question: "Which statement best describes C's approach to safety vs performance?",
    options: [
      "C prioritizes runtime execution speed and memory control, trusting the programmer completely",
      "C prioritizes runtime safety checks over execution performance",
      "C enforces strict memory bounds checking on all array indexing operations",
      "C prevents integer overflow crashes automatically at runtime"
    ],
    answerIndex: 0,
    explanation: "C operates under the philosophy 'trust the programmer'. It omits runtime boundary and safety checks to achieve maximum performance."
  },
  {
    question: "What is the main advantage of writing an embedded system driver in C?",
    options: [
      "Direct register bit manipulation and zero runtime abstraction penalty",
      "Built-in garbage collection that frees RAM automatically",
      "Built-in multi-threading web server library",
      "Automatic GUI generation"
    ],
    answerIndex: 0,
    explanation: "C permits direct memory-mapped I/O pointer operations to read/write hardware registers without VM or runtime overhead."
  },
  {
    question: "In C, what is the role of keywords?",
    options: [
      "Reserved words with special predefined syntactic meaning that cannot be used as identifier names",
      "User-defined variable names",
      "Comments ignored by compiler",
      "External library function names"
    ],
    answerIndex: 0,
    explanation: "Keywords (`int`, `return`, `if`, `while`, etc.) are reserved by the language specification and cannot be repurposed as variable or function names."
  },
  {
    question: "How many keywords were present in the original ANSI C89 / C90 standard?",
    options: ["16", "32", "64", "128"],
    answerIndex: 1,
    explanation: "ANSI C89 / C90 defined exactly 32 core keywords."
  },
  {
    question: "Which of the following is NOT a C keyword?",
    options: ["auto", "sizeof", "volatile", "function"],
    answerIndex: 3,
    explanation: "`function` is NOT a C keyword. Function definitions use return types like `int`, `void`, `float`, etc."
  },
  {
    question: "Which programming language interpreter/runtime is implemented in C?",
    options: ["CPython (Reference Python implementation)", "V8 JavaScript Engine (Node.js/Chrome)", "JVM (Java Virtual Machine HotSpot core)", "All of the above"],
    answerIndex: 3,
    explanation: "CPython, V8, HotSpot JVM, and Ruby CRuby are all implemented in C and C++."
  },
  {
    question: "What does the phrase 'trust the programmer' mean in C design philosophy?",
    options: [
      "The language does not insert hidden runtime checks (like array index bounds checking or null dereference checks)",
      "The compiler fixes code logic errors automatically",
      "The IDE formats code automatically without user prompt",
      "Pointers cannot corrupt memory"
    ],
    answerIndex: 0,
    explanation: "C avoids adding overhead like automatic array bounds checks or null pointers checks, expecting developers to write correct code."
  },
  {
    question: "Which year was the original K&R C book published?",
    options: ["1970", "1978", "1989", "1999"],
    answerIndex: 1,
    explanation: "Brian Kernighan and Dennis Ritchie published the first edition of 'The C Programming Language' in 1978."
  },
  {
    question: "What is the primary role of the C Standard Library (`libc`)?",
    options: [
      "Provides standardized functions for memory allocation, string handling, mathematical operations, and console/file I/O",
      "Generates GUI windows automatically",
      "Compiles assembly code to machine code",
      "Translates C code into Java bytecode"
    ],
    answerIndex: 0,
    explanation: "`libc` provides standard utility functions (`printf`, `scanf`, `malloc`, `strlen`, `strcpy`, `fopen`, etc.) across all compliant compilers."
  },
  {
    question: "Why is C still dominant in game engine development, robotics, and aerospace systems?",
    options: [
      "Deterministic memory control, predictable latency, and zero runtime garbage collection pauses",
      "It is easier to learn than HTML",
      "It generates cloud microservices automatically",
      "It does not require compilation"
    ],
    answerIndex: 0,
    explanation: "Real-time systems (game engines, robotics, avionics) require sub-millisecond deterministic timing without unpredictable garbage collection pauses."
  },
  {
    question: "Which of the following statements about C language case sensitivity is TRUE?",
    options: [
      "C is case-sensitive (`main`, `Main`, and `MAIN` are distinct identifiers)",
      "C is case-insensitive (`int` and `INT` are identical)",
      "Only keywords are case-insensitive",
      "Case sensitivity depends on the operating system"
    ],
    answerIndex: 0,
    explanation: "C is strictly case-sensitive. `main`, `Main`, and `MAIN` are treated as completely different identifiers."
  },
  {
    question: "Is C a free-format programming language?",
    options: [
      "Yes, whitespace (spaces, tabs, newlines) is ignored by the compiler outside tokens and string literals",
      "No, indentation strictly defines code blocks like Python",
      "No, line breaks must occur after every semicolon",
      "Only when compiling with GCC"
    ],
    answerIndex: 0,
    explanation: "C is free-format. Semicolons and curly braces `{}` delineate statements and blocks, while extra whitespace is ignored."
  },

  // --------------------------------------------------------------------------
  // SUB-DOMAIN 2: C STANDARDS EVOLUTION (ANSI, C89, C99, C11, C17, C23) (Questions 36-70)
  // --------------------------------------------------------------------------
  {
    question: "Which body ratified the first official formal standard for C in 1989, known as ANSI C or C89?",
    options: ["American National Standards Institute (ANSI)", "IEEE", "W3C", "ECMA"],
    answerIndex: 0,
    explanation: "ANSI established X3J11 committee in 1983 and approved ANSI X3.159-1989 (ANSI C or C89) in December 1989."
  },
  {
    question: "What ISO standard number was assigned to ANSI C in 1990 (ISO C90)?",
    options: ["ISO/IEC 9899:1990", "ISO 9001", "ISO/IEC 14882", "ISO 27001"],
    answerIndex: 0,
    explanation: "ISO adopted ANSI C89 as ISO/IEC 9899:1990 (commonly known as C90)."
  },
  {
    question: "Which major feature was introduced in the C99 standard (ISO/IEC 9899:1999)?",
    options: [
      "Single-line comments `//`, Variable-Length Arrays (VLAs), and inline functions",
      "Object-oriented classes and inheritance",
      "Automatic garbage collection",
      "Built-in HTTP web server"
    ],
    answerIndex: 0,
    explanation: "C99 added `//` comments, VLAs, `inline` functions, `<stdbool.h>`, `<stdint.h>`, `long long int`, and complex numbers."
  },
  {
    question: "Which header file was introduced in C99 to provide boolean types (`bool`, `true`, `false`)?",
    options: ["<stdbool.h>", "<boolean.h>", "<bool.h>", "<stddef.h>"],
    answerIndex: 0,
    explanation: "`<stdbool.h>` defines `bool`, `true` (1), and `false` (0) in C99."
  },
  {
    question: "Which header file introduced in C99 provides exact-width integer types such as `int32_t` and `uint64_t`?",
    options: ["<stdint.h>", "<stdtypes.h>", "<limits.h>", "<stddef.h>"],
    answerIndex: 0,
    explanation: "`<stdint.h>` defines fixed-width integer types (`int8_t`, `int16_t`, `int32_t`, `int64_t`, `uint32_t`, etc.)."
  },
  {
    question: "Prior to C99, where were variable declarations required to be placed inside a block?",
    options: [
      "At the very beginning of the block before any executable statements",
      "Anywhere inside the function body",
      "Only in global scope",
      "Inside the `for` loop header"
    ],
    answerIndex: 0,
    explanation: "In C89/C90, all variable declarations had to appear at the start of a block `{}` prior to any executable code statements. C99 relaxed this rule."
  },
  {
    question: "Which feature introduced in C11 (ISO/IEC 9899:2011) provides compile-time assertion checking?",
    options: ["_Static_assert", "assert()", "#pragma assert", "_Compile_check"],
    answerIndex: 0,
    explanation: "`_Static_assert` (or `static_assert` via `<assert.h>`) tests expressions at compile-time in C11."
  },
  {
    question: "Which C11 feature enables macro polymorphism based on the type of an expression?",
    options: ["_Generic selection", "template<typename T>", "auto keyword", "typeof operator"],
    answerIndex: 0,
    explanation: "C11 introduced `_Generic` expressions allowing macros to dispatch functions based on expression type."
  },
  {
    question: "Which standard library function was deprecated/removed in C11 due to severe buffer overflow security vulnerabilities?",
    options: ["gets()", "scanf()", "strcpy()", "printf()"],
    answerIndex: 0,
    explanation: "`gets()` was officially removed in C11 because it cannot check destination buffer boundaries, causing critical security vulnerabilities. `fgets()` is used instead."
  },
  {
    question: "What is the primary focus of the C17 standard (ISO/IEC 9899:2018)?",
    options: [
      "Bug fixes, clarifications, and defect reports for C11 without adding new language features",
      "Introducing class object inheritance",
      "Adding mandatory automatic garbage collection",
      "Removing pointer support"
    ],
    answerIndex: 0,
    explanation: "C17 (also known as C18) introduced no new language features; it focused strictly on resolving defects and ambiguities in C11."
  },
  {
    question: "Which upcoming/recent standard successor to C17 introduces features like `auto` type inference, `nullptr`, and binary literals `0b`?",
    options: ["C23 (ISO/IEC 9899:2024)", "C99", "ANSI C", "C05"],
    answerIndex: 0,
    explanation: "C23 adds `nullptr`, `auto` type deduction, `typeof`, `constexpr`, binary literals (`0b1010`), and `#embed` directives."
  },
  {
    question: "What does VLA stand for in C99?",
    options: ["Variable-Length Array", "Virtual Logic Architecture", "Vector Linear Assembly", "Value Level Access"],
    answerIndex: 0,
    explanation: "VLA stands for Variable-Length Array, allowing array dimensions to be specified at runtime based on variables."
  },
  {
    question: "Why did C11 make Variable-Length Arrays (VLAs) optional rather than mandatory for compiler implementations?",
    options: [
      "Because stack allocation of VLAs with large dynamic sizes can cause stack overflow crashes",
      "Because VLAs make C programs slower than Python",
      "Because VLAs require a GPU",
      "Because VLAs conflict with pointers"
    ],
    answerIndex: 0,
    explanation: "Allocating large VLAs on the call stack can lead to uncatchable stack overflow security issues, so C11 made VLA support optional (`__STDC_NO_VLA__`)."
  },
  {
    question: "What type does the `sizeof` operator return in standard C?",
    options: ["size_t (defined in <stddef.h>)", "int", "float", "unsigned char"],
    answerIndex: 0,
    explanation: "`sizeof` returns `size_t`, an unsigned integer type specified in `<stddef.h>` and `<stdio.h>`."
  },
  {
    question: "What is the format specifier used to print a `size_t` variable in standard C99 printf?",
    options: ["%zu", "%d", "%f", "%s"],
    answerIndex: 0,
    explanation: "`%zu` is the standard format specifier for printing `size_t` in C99 and later."
  },
  {
    question: "Which compiler flag enforces strict compliance with the ISO C11 standard in GCC?",
    options: ["-std=c11 -pedantic", "-O3", "-Wall", "-g"],
    answerIndex: 0,
    explanation: "`-std=c11` sets language standard to C11, while `-pedantic` issues warnings for non-standard extensions."
  },
  {
    question: "In K&R C (pre-C89), how were function parameters declared in function definitions?",
    options: [
      "Parameter names in parentheses, parameter types declared between parentheses and opening brace `{}`",
      "Types inside parentheses like modern C `int add(int a, int b)`",
      "Parameter types were not allowed",
      "Parameters were declared using `var`"
    ],
    answerIndex: 0,
    explanation: "K&R syntax placed parameter names inside parentheses `int add(a, b)` and declared their types below: `int a; int b; { ... }`."
  },
  {
    question: "What was introduced in ANSI C89 to solve parameter type mismatch bugs during function calls?",
    options: ["Function Prototypes", "Classes", "Templates", "Lambda expressions"],
    answerIndex: 0,
    explanation: "ANSI C89 introduced function prototypes (e.g. `int add(int a, int b);`) enabling compiler parameter checking before invocation."
  },
  {
    question: "Which modifier introduced in C89 informs the compiler that a variable's value may be altered by external hardware or asynchronous threads?",
    options: ["volatile", "register", "auto", "const"],
    answerIndex: 0,
    explanation: "`volatile` tells the compiler to avoid caching or optimizing away reads/writes to a memory location, ensuring hardware register changes are read fresh."
  },
  {
    question: "Which modifier introduced in C89 specifies that a variable's value cannot be modified after initialization?",
    options: ["const", "volatile", "static", "extern"],
    answerIndex: 0,
    explanation: "`const` declares a read-only variable whose value cannot be reassigned after initialization."
  },
  {
    question: "In C99, what does the `inline` function specifier hint to the compiler?",
    options: [
      "Suggests replacing function calls directly with the function's machine code instructions to eliminate call overhead",
      "Forces the function to run on a separate CPU core",
      "Makes the function private to the source file",
      "Prevents the function from returning a value"
    ],
    answerIndex: 0,
    explanation: "`inline` hints that the compiler should substitute the body of the function directly into call sites to avoid function call stack frame overhead."
  },
  {
    question: "In C99, which keyword was added to pointers (`restrict`) to inform the compiler that no other pointer aliases the same memory region?",
    options: ["restrict", "unique", "noalias", "private"],
    answerIndex: 0,
    explanation: "`restrict` promises the compiler that the pointer is the sole access path to the underlying memory block, enabling aggressive CPU register optimization."
  },
  {
    question: "Which integer constant suffix specifies an `unsigned long long` type in C99?",
    options: ["ULL or ull", "L", "U", "F"],
    answerIndex: 0,
    explanation: "`ULL` suffix (e.g. `18446744073709551615ULL`) specifies an Unsigned Long Long constant."
  },
  {
    question: "What is the minimum bit width guaranteed for a `long long int` in C99?",
    options: ["64 bits", "32 bits", "16 bits", "128 bits"],
    answerIndex: 0,
    explanation: "C99 guarantees that `long long int` is at least 64 bits in size."
  },
  {
    question: "Which preprocessor macro in `<limits.h>` defines the maximum value of a signed 32-bit `int`?",
    options: ["INT_MAX", "MAX_INT", "INTEGER_MAX", "UINT_MAX"],
    answerIndex: 0,
    explanation: "`INT_MAX` in `<limits.h>` defines the maximum value for a signed int (typically `2147483647`)."
  },
  {
    question: "Which preprocessor macro in `<limits.h>` defines the number of bits in a `char`?",
    options: ["CHAR_BIT", "BIT_PER_CHAR", "BYTE_SIZE", "CHAR_SIZE"],
    answerIndex: 0,
    explanation: "`CHAR_BIT` defines the number of bits in a `char` (guaranteed to be at least 8 bits)."
  },
  {
    question: "What is the result of applying `sizeof(char)` on any standard-compliant C compiler?",
    options: ["1 (by definition)", "2", "4", "Depends on 32-bit vs 64-bit CPU"],
    answerIndex: 0,
    explanation: "By language specification, `sizeof(char)` is ALWAYS 1. All other memory sizes are measured in multiples of `sizeof(char)` bytes."
  },
  {
    question: "In C11, which header file provides multithreading support (`thrd_create`, `mtx_init`)?",
    options: ["<threads.h>", "<pthread.h>", "<thread.h>", "<process.h>"],
    answerIndex: 0,
    explanation: "C11 introduced `<threads.h>` for standard portable C multithreading support."
  },
  {
    question: "What is the function of `_Alignof` operator introduced in C11?",
    options: [
      "Returns the alignment requirement in bytes of its operand type",
      "Aligns text strings in console output",
      "Allocates memory aligned to cache lines",
      "Formats code automatically"
    ],
    answerIndex: 0,
    explanation: "`_Alignof` (or `alignof` via `<stdalign.h>`) queries the byte alignment required for a type."
  },
  {
    question: "What does the `_Noreturn` function specifier introduced in C11 signify?",
    options: [
      "Informs the compiler that the function does not return control to the caller (e.g. exit() or abort())",
      "Specifies a void return type",
      "Prevents function recursion",
      "Suppresses compiler warnings"
    ],
    answerIndex: 0,
    explanation: "`_Noreturn` signals that the function terminates program execution or loops infinitely without returning."
  },
  {
    question: "Which literal prefix was introduced in C23 to write binary constants directly in source code?",
    options: ["0b or 0B (e.g. 0b101010)", "0x", "0o", "b#"],
    answerIndex: 0,
    explanation: "C23 introduces standardized binary literals using `0b` or `0B` prefix (e.g. `int val = 0b1100;`)."
  },
  {
    question: "In C23, what is the dedicated type for pointer null representation replacing `(void*)0` macro?",
    options: ["nullptr (of type nullptr_t)", "NULL", "0", "NIL"],
    answerIndex: 0,
    explanation: "C23 introduces `nullptr` keyword with distinct type `nullptr_t` to resolve null pointer macro type ambiguities."
  },
  {
    question: "Which macro directive introduced in C23 allows direct binary asset inclusion into source code arrays?",
    options: ["#embed", "#include_binary", "#import_bytes", "#binary"],
    answerIndex: 0,
    explanation: "C23 `#embed` directive embeds binary resources (images, firmware blobs) directly into byte arrays at compile time."
  },
  {
    question: "Which of the following describes the relationship between C89, C99, C11, C17, and C23?",
    options: [
      "Iterative revisions of the ISO C standard maintaining backwards compatibility while standardizing modern features",
      "Completely different incompatible programming languages",
      "Third-party GCC compiler plugins",
      "Operating system distributions"
    ],
    answerIndex: 0,
    explanation: "These are successive official ISO standards refining, standardizing, and expanding C while preserving core language compatibility."
  },
  {
    question: "Why should code targeted for cross-platform microcontrollers stick to ISO C standards?",
    options: [
      "Guarantees compilation across diverse compiler vendors (GCC, Clang, MSVC, Keil, IAR)",
      "Makes compiled binaries run faster on Python",
      "Eliminates the need for testing",
      "Prevents syntax errors automatically"
    ],
    answerIndex: 0,
    explanation: "Adhering to ISO C standard avoids vendor-proprietary extensions, ensuring seamless compilation on embedded toolchains."
  },

  // --------------------------------------------------------------------------
  // SUB-DOMAIN 3: ANATOMY OF GCC COMPILATION PIPELINE (Questions 71-110)
  // --------------------------------------------------------------------------
  {
    question: "What is the correct sequential order of the 4 main stages in the GCC compilation pipeline?",
    options: [
      "Preprocessing ➔ Compilation ➔ Assembly ➔ Linking",
      "Compilation ➔ Preprocessing ➔ Linking ➔ Assembly",
      "Linking ➔ Assembly ➔ Compilation ➔ Preprocessing",
      "Assembly ➔ Preprocessing ➔ Compilation ➔ Linking"
    ],
    answerIndex: 0,
    explanation: "The GCC toolchain transforms source code via: 1. Preprocessor (`cpp`), 2. Compiler (`cc1`), 3. Assembler (`as`), 4. Linker (`ld`)."
  },
  {
    question: "Which GCC command line flag stops the compilation pipeline after the Preprocessing stage?",
    options: ["-E", "-S", "-c", "-o"],
    answerIndex: 0,
    explanation: "`gcc -E main.c` runs only the preprocessor and prints expanded code to standard output (or a `.i` file)."
  },
  {
    question: "What is the file extension of the intermediate output generated after the Preprocessing stage?",
    options: [".i", ".s", ".o", ".exe"],
    answerIndex: 0,
    explanation: "The preprocessor outputs preprocessed C source code into a `.i` file (or `.ii` for C++)."
  },
  {
    question: "Which of the following actions is performed during the Preprocessing stage?",
    options: [
      "Expanding #include headers, substituting #define macros, and stripping comments",
      "Translating C code into assembly instructions",
      "Converting assembly into machine code bytes",
      "Resolving external library function addresses"
    ],
    answerIndex: 0,
    explanation: "The preprocessor processes lines starting with `#`, expands macros/headers, and strips `//` and `/* */` comments."
  },
  {
    question: "Which GCC flag stops the compilation pipeline after generating Assembly code?",
    options: ["-S", "-E", "-c", "-v"],
    answerIndex: 0,
    explanation: "`gcc -S main.c` halts after compilation, generating human-readable target assembly code in `main.s`."
  },
  {
    question: "What is the file extension of the output generated by the Compilation stage?",
    options: [".s", ".i", ".o", ".exe"],
    answerIndex: 0,
    explanation: "The compiler (`cc1`) translates preprocessed C code into assembly code stored in `.s` files."
  },
  {
    question: "Which GCC flag stops the compilation pipeline after the Assembly stage, generating a Relocatable Object File?",
    options: ["-c", "-S", "-E", "-o"],
    answerIndex: 0,
    explanation: "`gcc -c main.c` invokes assembler (`as`) to output relocatable machine-code object file `main.o`."
  },
  {
    question: "What is the file extension for a relocatable object file generated by the Assembler on Linux/UNIX systems?",
    options: [".o", ".s", ".i", ".dll"],
    answerIndex: 0,
    explanation: "Linux/UNIX systems use `.o` for object files. Windows uses `.obj`."
  },
  {
    question: "What is the primary role of the Linker (`ld`) in the GCC toolchain?",
    options: [
      "Combines multiple object files (`.o`), resolves external symbol references, and links standard libraries (`libc`) into an executable binary",
      "Expands `#include` directives",
      "Checks code syntax errors",
      "Optimizes loop performance"
    ],
    answerIndex: 0,
    explanation: "The linker merges object files, resolves cross-file function calls/symbols, and binds library functions (`printf`, `malloc`) into the final executable."
  },
  {
    question: "What is the default executable output filename produced by GCC if no `-o` flag is supplied on Linux?",
    options: ["a.out", "main.exe", "output.bin", "a.exe"],
    answerIndex: 0,
    explanation: "On UNIX/Linux, GCC produces `a.out` by default if `-o` is omitted. (On Windows, it produces `a.exe`)."
  },
  {
    question: "Which GCC flag allows the developer to specify a custom name for the output binary executable file?",
    options: ["-o <filename>", "-name <filename>", "-out <filename>", "-target <filename>"],
    answerIndex: 0,
    explanation: "`gcc main.c -o myprogram` writes the final binary executable to `myprogram`."
  },
  {
    question: "Which GCC flag enables all standard compiler warning messages?",
    options: ["-Wall", "-Werror", "-O2", "-g"],
    answerIndex: 0,
    explanation: "`-Wall` enables all core compiler warning diagnostics regarding questionable coding constructs."
  },
  {
    question: "Which GCC flag treats all compiler warnings as fatal compilation errors?",
    options: ["-Werror", "-Wall", "-pedantic", "-g"],
    answerIndex: 0,
    explanation: "`-Werror` forces GCC to abort compilation whenever any warning is generated."
  },
  {
    question: "Which GCC flag includes DWARF debugging symbol information into the compiled binary for GDB debugging?",
    options: ["-g", "-d", "-debug", "-O0"],
    answerIndex: 0,
    explanation: "`-g` instructs GCC to generate debug symbol tables required by GDB (GNU Debugger)."
  },
  {
    question: "Which GCC flag applies Level 2 compiler performance optimizations (loop unrolling, register allocation, instruction scheduling)?",
    options: ["-O2", "-O0", "-Og", "-Os"],
    answerIndex: 0,
    explanation: "`-O2` turns on recommended production performance optimizations without sacrificing build speed excessively."
  },
  {
    question: "Which GCC optimization flag optimizes specifically for smallest binary code size?",
    options: ["-Os", "-O3", "-O0", "-Fast"],
    answerIndex: 0,
    explanation: "`-Os` enables optimizations that minimize executable file size, ideal for microcontrollers with tight flash storage."
  },
  {
    question: "What happens if you compile a program with `-O0` flag in GCC?",
    options: [
      "All compiler optimizations are disabled, ensuring fast compilation and straightforward debugging",
      "Aggressive vectorization optimizations are turned on",
      "Binary file size is minimized",
      "Warnings are treated as errors"
    ],
    answerIndex: 0,
    explanation: "`-O0` disables optimizations so machine instructions correspond directly to source lines, facilitating debugging."
  },
  {
    question: "Which GCC flag adds an additional directory path to search for header files during preprocessing?",
    options: ["-I <dir>", "-L <dir>", "-l <lib>", "-h <dir>"],
    answerIndex: 0,
    explanation: "`-I /path/to/headers` tells the preprocessor where to search for user header files included via `#include`."
  },
  {
    question: "Which GCC flag adds an additional directory path to search for library files during linking?",
    options: ["-L <dir>", "-I <dir>", "-l <lib>", "-s"],
    answerIndex: 0,
    explanation: "`-L /path/to/libs` tells the linker where to search for library archive files (`.so`/`.a`/`.lib`)."
  },
  {
    question: "Which GCC flag links a specific library (e.g. math library `libm.so`) during the linking phase?",
    options: ["-lm", "-math", "-I m", "-link math"],
    answerIndex: 0,
    explanation: "`-lm` instructs the linker to link the standard math library (`libm.so` / `libm.a`) providing `pow()`, `sqrt()`, `sin()`, etc."
  },
  {
    question: "What type of error is produced when the Linker cannot find the definition of a function declared in a header?",
    options: ["Undefined Reference Error (Linker Error)", "Syntax Error", "Preprocessor Error", "Segmentation Fault"],
    answerIndex: 0,
    explanation: "If a function is declared but its object file or library is omitted at link time, `ld` fails with 'undefined reference to function_name'."
  },
  {
    question: "What type of error occurs when a semicolon is missing at the end of a C statement?",
    options: ["Syntax Error (Compilation Error)", "Linker Error", "Runtime Error", "Logical Error"],
    answerIndex: 0,
    explanation: "Missing semicolons break grammar rules parsed by compiler (`cc1`), generating a Syntax Error."
  },
  {
    question: "What is a static library file extension on Linux systems?",
    options: [".a (Archive)", ".so", ".dll", ".exe"],
    answerIndex: 0,
    explanation: "Static libraries on Linux use `.a` (archive). On Windows they use `.lib`."
  },
  {
    question: "What is a dynamic/shared library file extension on Linux systems?",
    options: [".so (Shared Object)", ".a", ".dll", ".obj"],
    answerIndex: 0,
    explanation: "Dynamic shared libraries on Linux use `.so`. On Windows they use `.dll`, and on macOS `.dylib`."
  },
  {
    question: "What is the main difference between Static Linking and Dynamic Linking?",
    options: [
      "Static linking copies library object code directly into the executable binary; Dynamic linking loads library code at runtime",
      "Dynamic linking makes executables larger than static linking",
      "Static linking requires a web connection at runtime",
      "Dynamic linking is only supported in Python"
    ],
    answerIndex: 0,
    explanation: "Static linking embeds library bytes inside the binary at build time. Dynamic linking resolves symbols to shared `.so`/`.dll` files loaded into RAM at execution."
  },
  {
    question: "Which GNU toolchain program executes the preprocessing step under the hood?",
    options: ["cpp (C Preprocessor)", "cc1", "as", "ld"],
    answerIndex: 0,
    explanation: "`cpp` is the GNU C Preprocessor executable."
  },
  {
    question: "Which GNU toolchain program executes the assembly translation step under the hood?",
    options: ["as (GNU Assembler)", "cpp", "cc1", "gdb"],
    answerIndex: 0,
    explanation: "`as` is the GNU Assembler program."
  },
  {
    question: "Which tool displays symbol tables inside relocatable object files (`.o`)?",
    options: ["nm (or objdump)", "gcc -E", "gdb", "valgrind"],
    answerIndex: 0,
    explanation: "`nm main.o` lists all defined and undefined symbol tables inside an object file."
  },
  {
    question: "What does `objdump -d main.o` do?",
    options: [
      "Disassembles object file machine code instructions back into assembly language",
      "Deletes the object file",
      "Runs the preprocessor",
      "Formats source code"
    ],
    answerIndex: 0,
    explanation: "`objdump -d` disassembles machine code sections of binary object files back into readable assembly mnemonic instructions."
  },
  {
    question: "What does the GCC flag `-v` show during compilation?",
    options: [
      "Verbose toolchain details including sub-command invocations and system search paths",
      "Version of C standard only",
      "Variable memory usage",
      "Vectorization status"
    ],
    answerIndex: 0,
    explanation: "`gcc -v` outputs detailed verbose execution logs showing exact calls to `cpp`, `cc1`, `as`, `ld`, and system library search directories."
  },
  {
    question: "What is the function of the GNU Make build system in C projects?",
    options: [
      "Automates incremental compilation of modified C source files based on dependency rules in a Makefile",
      "Generates HTML web pages",
      "Installs C compilers automatically",
      "Formats C source code"
    ],
    answerIndex: 0,
    explanation: "`make` parses `Makefile` rules to recompile only source files that have changed since last build, speeding up large software compilation."
  },
  {
    question: "In GCC, what does `-Wextra` flag enable?",
    options: [
      "Additional warning diagnostics for subtle potential bugs not covered by `-Wall`",
      "Extra optimization algorithms",
      "Extra execution speed",
      "Extra comments in output assembly"
    ],
    answerIndex: 0,
    explanation: "`-Wextra` enables additional warning checks (like signed/unsigned comparison or unused parameters)."
  },
  {
    question: "What is an ELF file on Linux?",
    options: [
      "Executable and Linkable Format — standard file format for executables, object code, and shared libraries",
      "Electronic Logic File",
      "Embedded Language Function",
      "Extended Log Format"
    ],
    answerIndex: 0,
    explanation: "ELF (Executable and Linkable Format) is the standard binary format for Linux object files, executables, and `.so` libraries."
  },
  {
    question: "What is the PE/COFF format used for on Windows operating systems?",
    options: [
      "Portable Executable format for `.exe`, `.dll`, and `.sys` files",
      "Python Script format",
      "Page Encryption format",
      "Package Entity format"
    ],
    answerIndex: 0,
    explanation: "Windows uses PE (Portable Executable) / COFF format for `.exe` and `.dll` binaries."
  },
  {
    question: "What does the symbol `_start` represent in ELF executables?",
    options: [
      "The true low-level C runtime entry point (crt0) that initializes environment and calls `main()`",
      "The first variable in memory",
      "The start of global variables",
      "The preprocessor header"
    ],
    answerIndex: 0,
    explanation: "OS kernel transfers control to `_start` in C runtime library (`crt0.o`), which initializes stack/heap/arguments and then invokes `main()`."
  },
  {
    question: "What happens if a C source file includes a header file that does not exist?",
    options: [
      "The preprocessor throws a fatal error 'No such file or directory' and halts compilation",
      "The compiler creates an empty header file automatically",
      "The program compiles with warnings",
      "The linker resolves it at runtime"
    ],
    answerIndex: 0,
    explanation: "If `#include <missing.h>` fails to locate the file in search paths, the preprocessor aborts immediately with a fatal error."
  },
  {
    question: "What is a Translation Unit in C compiler terminology?",
    options: [
      "A single `.c` source file combined with all header files expanded by the preprocessor",
      "A CPU execution core",
      "A function inside a file",
      "A compiled `.exe` binary"
    ],
    answerIndex: 0,
    explanation: "A Translation Unit (TU) is the complete output produced by preprocessor from one `.c` file and its included headers, fed into the compiler stage."
  },
  {
    question: "Why should header files containing function implementations avoid non-inline function definitions without `static` or `inline`?",
    options: [
      "Because including the header in multiple `.c` files causes 'multiple definition' Linker errors",
      "Because header files cannot contain code",
      "Because preprocessor deletes functions in headers",
      "Because headers only work on Windows"
    ],
    answerIndex: 0,
    explanation: "If a non-inline function body is placed in a `.h` file included by two `.c` files, both object files will contain identical symbol definitions, triggering a Linker error."
  },
  {
    question: "What does the GCC flag `-save-temps` do?",
    options: [
      "Saves all intermediate pipeline files (`.i` preprocessed, `.s` assembly, `.o` object) in working directory",
      "Saves temporary system RAM to disk",
      "Saves variable states during debugging",
      "Saves source code backup files"
    ],
    answerIndex: 0,
    explanation: "`-save-temps` keeps preprocessed `.i`, assembly `.s`, and object `.o` files on disk for analysis instead of deleting temporary files."
  },
  {
    question: "What is cross-compilation?",
    options: [
      "Compiling code on one host CPU architecture (e.g. x86_64 PC) to run on a different target architecture (e.g. ARM Cortex-M microcontroller)",
      "Compiling C code to Java",
      "Compiling code using two compilers at once",
      "Compiling C code without headers"
    ],
    answerIndex: 0,
    explanation: "Cross-compilation uses a cross-toolchain (e.g. `arm-none-eabi-gcc`) on a host computer to produce machine binaries for a different target hardware ISA."
  },

  // --------------------------------------------------------------------------
  // SUB-DOMAIN 4: STRUCTURE OF A C PROGRAM & EXECUTION ENVIRONMENT (Questions 111-145)
  // --------------------------------------------------------------------------
  {
    question: "What is the standard ISO C function entry point signature for a program with no command line arguments?",
    options: ["int main(void)", "void main()", "main()", "int main(empty)"],
    answerIndex: 0,
    explanation: "ISO C specifies `int main(void)` (or `int main()`) returning an integer as the standard entry point signature for programs without arguments."
  },
  {
    question: "Why is `void main()` considered non-standard and bad practice in standard C?",
    options: [
      "Because ISO C standards require `main()` to return `int` to report execution status to the operating system shell",
      "Because `void main()` causes instant compiler crash on all systems",
      "Because `void` prevents variable declarations",
      "Because `main` cannot take parameters"
    ],
    answerIndex: 0,
    explanation: "Operating systems expect an integer exit status from processes. `void main()` is non-standard, resulting in undefined behavior or uninitialized return registers."
  },
  {
    question: "What does returning `0` from `main()` communicate to the operating system shell?",
    options: [
      "Successful program execution without errors (EXIT_SUCCESS)",
      "Program failed with an unknown error",
      "Program executed 0 lines of code",
      "Program requires system restart"
    ],
    answerIndex: 0,
    explanation: "In UNIX/C conventions, return status code `0` (or `EXIT_SUCCESS`) signifies clean, successful execution."
  },
  {
    question: "Which standard header file defines the macro constants `EXIT_SUCCESS` and `EXIT_FAILURE`?",
    options: ["<stdlib.h>", "<stdio.h>", "<stddef.h>", "<string.h>"],
    answerIndex: 0,
    explanation: "`<stdlib.h>` defines `EXIT_SUCCESS` (0) and `EXIT_FAILURE` (non-zero, typically 1)."
  },
  {
    question: "What is the difference between `#include <filename.h>` and `#include \"filename.h\"`?",
    options: [
      "`<...>` searches system library directories first; `\"...\"` searches current working directory first",
      "`<...>` is for C++ files; `\"...\"` is for C files",
      "`<...>` is for math functions only",
      "There is no difference"
    ],
    answerIndex: 0,
    explanation: "`#include <file.h>` searches system compiler include paths. `#include \"file.h\"` searches local project directory before falling back to system paths."
  },
  {
    question: "In C, what is the role of Header Guards (`#ifndef HEADER_H ... #endif`)?",
    options: [
      "Prevents a header file from being included multiple times in the same Translation Unit, avoiding duplicate definition errors",
      "Protects header files from virus infection",
      "Encodes header contents in binary",
      "Prevents unauthorized users from reading source code"
    ],
    answerIndex: 0,
    explanation: "Header guards ensure that the declarations in a header are processed only once per translation unit, preventing redefinition compiler errors."
  },
  {
    question: "Which non-standard but widely supported preprocessor directive acts as a modern alternative to traditional header guards?",
    options: ["#pragma once", "#guard", "#once", "#include_once"],
    answerIndex: 0,
    explanation: "`#pragma once` is supported by GCC, Clang, and MSVC to prevent multiple header inclusions without manually writing `#ifndef` guards."
  },
  {
    question: "What are the two standard parameters of `main` when accepting command line arguments?",
    options: ["int argc, char *argv[]", "int count, char args", "char *argv, int argc", "int args, string argv[]"],
    answerIndex: 0,
    explanation: "`int argc` holds argument count; `char *argv[]` (or `char **argv`) is an array of null-terminated argument strings."
  },
  {
    question: "What value does `argv[0]` contain when launching a program from command line?",
    options: [
      "The program path or command name used to invoke the application",
      "The first user argument passed after program name",
      "NULL pointer",
      "Number of total arguments"
    ],
    answerIndex: 0,
    explanation: "`argv[0]` holds the string representing the program name or path used to invoke execution."
  },
  {
    question: "What is guaranteed about `argv[argc]` in standard C?",
    options: ["It is always a NULL pointer", "It contains the string 'END'", "It contains integer 0", "It is an uninitialized pointer causing crash"],
    answerIndex: 0,
    explanation: "The C standard guarantees that `argv[argc]` is always a NULL pointer."
  },
  {
    question: "Which section of executable memory stores uninitialized global and static variables?",
    options: ["BSS Segment (Block Started by Symbol)", "Data Segment", "Text Segment", "Stack Segment"],
    answerIndex: 0,
    explanation: "The BSS segment stores uninitialized global and static variables, which OS zeroes out automatically before `main()` executes."
  },
  {
    question: "Which memory segment stores initialized global and static variables (e.g. `int global_val = 42;`)?",
    options: ["Data Segment", "BSS Segment", "Stack Segment", "Heap Segment"],
    answerIndex: 0,
    explanation: "Initialized global and static variables with non-zero initial values are stored in the Data Segment."
  },
  {
    question: "Which memory segment contains the compiled executable machine code instructions of a C program?",
    options: ["Text Segment (Code Segment)", "Stack Segment", "Data Segment", "Heap Segment"],
    answerIndex: 0,
    explanation: "The Text (Code) segment holds CPU machine code instructions, usually marked read-only to prevent self-modifying code crashes."
  },
  {
    question: "Which memory region grows dynamically to store local function variables, parameter frames, and return addresses?",
    options: ["Stack Segment", "Heap Segment", "BSS Segment", "Text Segment"],
    answerIndex: 0,
    explanation: "The call Stack stores automatic local variables, function arguments, and return instruction addresses in LIFO order."
  },
  {
    question: "Which memory region is used for dynamic allocations explicitly managed by `malloc()`, `calloc()`, and `free()`?",
    options: ["Heap Segment", "Stack Segment", "BSS Segment", "Data Segment"],
    answerIndex: 0,
    explanation: "The Heap is used for dynamic memory allocations requested at runtime via `malloc`/`calloc`/`realloc`."
  },
  {
    question: "What happens when a function calls itself recursively without a terminating base case in C?",
    options: [
      "Stack Overflow crash (Segmentation Fault due to exhausting stack memory)",
      "Heap corruption error",
      "Compiler catches it and converts it to a loop",
      "Program runs forever using 0% RAM"
    ],
    answerIndex: 0,
    explanation: "Unbounded recursion continuously pushes stack frames until stack boundaries are breached, causing a Stack Overflow crash."
  },
  {
    question: "What is the scope of a local variable declared inside a function in C?",
    options: [
      "Block Scope — accessible only within the enclosing `{}` block where it is defined",
      "Global Scope — accessible across all files",
      "File Scope — accessible anywhere in the same `.c` file",
      "System Scope"
    ],
    answerIndex: 0,
    explanation: "Local variables have block scope, limited to the block `{}` in which they are declared."
  },
  {
    question: "What is the lifetime of a local variable declared with the `static` keyword inside a function?",
    options: [
      "Entire program execution duration (retains value between function invocations)",
      "Limited to the duration of function call only",
      "Destroyed when function returns",
      "Lifetime depends on CPU temperature"
    ],
    answerIndex: 0,
    explanation: "`static` local variables are initialized once in static data memory and retain their values across multiple calls to that function."
  },
  {
    question: "What is the visibility scope of a global variable declared with the `static` keyword at top file level?",
    options: [
      "Internal Linkage — accessible only within that specific translation unit (`.c` file)",
      "External Linkage — accessible across all `.c` files via `extern`",
      "Block scope",
      "Function scope"
    ],
    answerIndex: 0,
    explanation: "Top-level `static` variables have internal linkage, hiding them from the linker so other `.c` files cannot access them."
  },
  {
    question: "Which keyword is used to declare a variable defined in another source file or translation unit?",
    options: ["extern", "static", "auto", "register"],
    answerIndex: 0,
    explanation: "`extern` tells the compiler that the variable or function symbol definition exists in another object file."
  },
  {
    question: "What default value do uninitialized global and static variables possess in C?",
    options: ["0 (zero / NULL)", "Garbage value", "-1", "Random memory contents"],
    answerIndex: 0,
    explanation: "Global and static variables in BSS are automatically initialized to zero (or NULL pointers) by the runtime environment."
  },
  {
    question: "What value do uninitialized automatic local variables contain in C?",
    options: ["Garbage (indeterminate values remaining in stack memory)", "0", "NULL", "1"],
    answerIndex: 0,
    explanation: "Automatic local variables on stack contain indeterminate garbage values left over in memory unless explicitly initialized."
  },
  {
    question: "What is the storage class specifier `register` used for in C?",
    options: [
      "Hints to compiler that variable should be stored in CPU register for high-speed access if possible",
      "Registers variable in database",
      "Prevents variable from changing value",
      "Allocates variable on heap"
    ],
    answerIndex: 0,
    explanation: "`register` hints that the variable is heavily used and should be placed in a CPU register if one is available."
  },
  {
    question: "Can you take the memory address of a variable declared with `register` keyword in C (`&reg_var`)?",
    options: [
      "No, taking the address of a `register` variable causes a compilation error (registers do not have RAM addresses)",
      "Yes, always",
      "Only in C99",
      "Only on 64-bit systems"
    ],
    answerIndex: 0,
    explanation: "In C, using the address-of operator `&` on a variable declared as `register` is a syntax error because CPU registers do not reside in RAM memory."
  },
  {
    question: "What is the default storage class for local variables declared inside a block without any storage class keyword?",
    options: ["auto", "static", "extern", "register"],
    answerIndex: 0,
    explanation: "Local variables defaults to `auto` (automatic storage duration on stack)."
  },
  {
    question: "What is the order of evaluation of function arguments in a C function call like `func(a++, b++)`?",
    options: [
      "Unspecified by ISO C standard (depends on compiler/ABI calling convention)",
      "Strictly Left-to-Right",
      "Strictly Right-to-Left",
      "Alphabetical"
    ],
    answerIndex: 0,
    explanation: "The order in which function arguments are evaluated is unspecified by ISO C. Relying on argument evaluation order causes undefined behavior."
  },
  {
    question: "What does the C preprocessor macro `__FILE__` expand to?",
    options: ["String literal containing the name of current source file being compiled", "Line number", "Date of build", "Compiler version"],
    answerIndex: 0,
    explanation: "`__FILE__` expands to a string literal representing the current C source file path."
  },
  {
    question: "What does the preprocessor macro `__LINE__` expand to?",
    options: ["Integer decimal representing current source line number", "File name", "Time", "Function name"],
    answerIndex: 0,
    explanation: "`__LINE__` expands to an integer decimal representing current line number in source file."
  },
  {
    question: "What does the preprocessor macro `__DATE__` expand to?",
    options: ["String literal of form 'Mmm dd yyyy' representing compilation date", "Current time", "File name", "Line number"],
    answerIndex: 0,
    explanation: "`__DATE__` expands to a string literal containing compilation date (e.g. 'Sep 02 2026')."
  },
  {
    question: "What does the predefined identifier `__func__` introduced in C99 represent inside a function?",
    options: ["String literal containing the name of current function", "Return type", "Number of arguments", "Function pointer address"],
    answerIndex: 0,
    explanation: "C99 `__func__` is an implicit local static string array containing the name of enclosing function."
  },
  {
    question: "What is the purpose of `#line` directive in C preprocessor?",
    options: [
      "Alters compiler's internal line number counter and filename string reported in diagnostics",
      "Draws a graphic line on screen",
      "Limits function line length",
      "Splits source code into multi-threads"
    ],
    answerIndex: 0,
    explanation: "`#line 100 \"custom.c\"` overrides line number and filename reported in compiler errors (used by parser generators like Flex/Bison)."
  },
  {
    question: "What does `#error` preprocessor directive do when encountered by compiler?",
    options: [
      "Emits custom diagnostic error message specified in directive and halts compilation immediately",
      "Suppresses warnings",
      "Ignores next line",
      "Generates runtime crash log"
    ],
    answerIndex: 0,
    explanation: "`#error \"Unsupported architecture!\"` prints error message and forces preprocessor/compiler to abort build."
  },
  {
    question: "What does `#pragma` directive allow in C programs?",
    options: [
      "Provides machine- and compiler-specific instructions to compiler (e.g. alignment, pack, warnings control)",
      "Executes SQL queries",
      "Declares global variables",
      "Creates new user keywords"
    ],
    answerIndex: 0,
    explanation: "`#pragma` supplies implementation-defined instructions to compiler without breaking standard syntax rules."
  },
  {
    question: "In C, what is undefined behavior (UB)?",
    options: [
      "Code constructs for which standard imposes no requirements, permitting program crash, silent data corruption, or unexpected output",
      "Syntax errors that fail at compile time",
      "Standard library error codes",
      "Memory leak warnings"
    ],
    answerIndex: 0,
    explanation: "Undefined Behavior (UB) means language standard leaves execution completely unchecked (e.g. array overflow, division by zero), leading to unpredictable behavior."
  },
  {
    question: "Which of the following is an example of Undefined Behavior in C?",
    options: [
      "Modifying a variable more than once between sequence points (e.g. `i = i++ + ++i`)",
      "Accessing out-of-bounds array element",
      "Dereferencing a NULL pointer",
      "All of the above"
    ],
    answerIndex: 3,
    explanation: "All listed examples (sequence point violation, array overflow, null pointer dereference) are classic instances of Undefined Behavior."
  },

  // --------------------------------------------------------------------------
  // SUB-DOMAIN 5: FORMATTED CONSOLE INPUT/OUTPUT (printf & scanf) (Questions 146-180)
  // --------------------------------------------------------------------------
  {
    question: "What is the return value of `printf()` function on successful execution?",
    options: [
      "Total number of characters successfully printed to output stream",
      "Always returns 0",
      "Returns 1 on success",
      "Returns number of format specifiers matched"
    ],
    answerIndex: 0,
    explanation: "`printf()` returns total number of characters output to stdout (or negative value if I/O error occurred)."
  },
  {
    question: "What does `printf(\"Hello\\n\");` return?",
    options: ["6 (5 letters + 1 newline character)", "5", "0", "1"],
    answerIndex: 0,
    explanation: "'H'-'e'-'l'-'l'-'o' (5) plus newline '\\n' (1) equals 6 characters."
  },
  {
    question: "What is the return value of `scanf()` function?",
    options: [
      "Number of input items successfully matched and assigned to arguments",
      "Total number of characters read",
      "Always returns 0",
      "Returns 1 on error"
    ],
    answerIndex: 0,
    explanation: "`scanf()` returns count of input items successfully parsed and assigned, or `EOF` (-1) on stream failure."
  },
  {
    question: "What will `scanf(\"%d %d\", &a, &b);` return if user inputs `10 20`?",
    options: ["2", "10", "20", "0"],
    answerIndex: 0,
    explanation: "Two integer items were successfully parsed and assigned to `a` and `b`, so `scanf` returns 2."
  },
  {
    question: "What format specifier is used to print or scan a signed `int`?",
    options: ["%d or %i", "%u", "%f", "%c"],
    answerIndex: 0,
    explanation: "`%d` and `%i` are format specifiers for signed decimal integers."
  },
  {
    question: "What format specifier is used to print an `unsigned int`?",
    options: ["%u", "%d", "%i", "%x"],
    answerIndex: 0,
    explanation: "`%u` is the format specifier for unsigned decimal integers."
  },
  {
    question: "Which format specifier is used to print an integer in lowercase Hexadecimal format?",
    options: ["%x", "%X", "%h", "%p"],
    answerIndex: 0,
    explanation: "`%x` outputs hexadecimal numbers with lowercase letters `a-f`. `%X` uses uppercase `A-F`."
  },
  {
    question: "Which format specifier prints memory address pointers in hexadecimal notation?",
    options: ["%p", "%x", "%d", "%addr"],
    answerIndex: 0,
    explanation: "`%p` formats pointer memory addresses in platform-specific hexadecimal layout."
  },
  {
    question: "Which format specifier is used to read a single `double` precision floating-point number in `scanf()`?",
    options: ["%lf", "%f", "%d", "%s"],
    answerIndex: 0,
    explanation: "In `scanf()`, `%lf` is required for `double` (`%f` is for single-precision `float`). In `printf()`, `%f` formats both."
  },
  {
    question: "What does the escape sequence `\\n` represent in string literals?",
    options: ["Line Feed / Newline", "Horizontal Tab", "Carriage Return", "Backspace"],
    answerIndex: 0,
    explanation: "`\\n` represents Line Feed / Newline character (ASCII 10)."
  },
  {
    question: "What does the escape sequence `\\t` represent?",
    options: ["Horizontal Tab", "Newline", "Vertical Tab", "Null character"],
    answerIndex: 0,
    explanation: "`\\t` represents Horizontal Tab character (ASCII 9)."
  },
  {
    question: "What does the escape sequence `\\0` represent in C strings?",
    options: ["Null Character (ASCII 0) terminating string", "Digit zero", "Space", "EOF"],
    answerIndex: 0,
    explanation: "`\\0` represents Null terminator byte marking end of C strings."
  },
  {
    question: "How do you print a literal percent sign `%` in `printf()`?",
    options: ["%%", "\\%", "/%", "%p"],
    answerIndex: 0,
    explanation: "`%%` prints a literal `%` character in `printf()` format strings."
  },
  {
    question: "How do you print a literal double quote `\"` inside a C string literal?",
    options: ["\\\"", "\"\"", "/\"", "%q"],
    answerIndex: 0,
    explanation: "`\\\"` escapes double quote character inside string literals."
  },
  {
    question: "What does the specifier `%5d` do in `printf()`?",
    options: [
      "Prints integer right-aligned within a field width of at least 5 spaces",
      "Multiplies integer by 5",
      "Prints 5 decimal digits after point",
      "Allocates 5 bytes"
    ],
    answerIndex: 0,
    explanation: "`%5d` formats integer right-justified in field width of 5 characters, padded with leading spaces."
  },
  {
    question: "What does `%-5d` do in `printf()`?",
    options: [
      "Prints integer left-aligned within a field width of at least 5 spaces",
      "Prints negative integer",
      "Subtracts 5 from output",
      "Truncates to 5 characters"
    ],
    answerIndex: 0,
    explanation: "`-` flag left-justifies output within field width."
  },
  {
    question: "What does `%05d` do in `printf()`?",
    options: [
      "Pads output integer with leading zeroes up to field width of 5 (e.g. 00042)",
      "Prints 5 zeroes after number",
      "Multiplies by 50000",
      "Generates syntax error"
    ],
    answerIndex: 0,
    explanation: "`0` flag pads leading field spaces with zero characters (e.g., `42` becomes `00042`)."
  },
  {
    question: "What does `%.2f` do when printing a floating-point number with `printf()`?",
    options: [
      "Rounds and displays number formatted to exactly 2 decimal places",
      "Multiplies float by 0.2",
      "Prints first 2 digits of number",
      "Divides float by 100"
    ],
    answerIndex: 0,
    explanation: "`%.2f` specifies precision of 2 digits after decimal point."
  },
  {
    question: "What does `printf(\"%.*f\", precision, val);` allow?",
    options: [
      "Specifies precision dynamically using variable passed in argument list",
      "Prints pointer address",
      "Multiplies float by precision",
      "Generates compile error"
    ],
    answerIndex: 0,
    explanation: "`*` wildcard permits field width or precision to be passed dynamically via integer argument."
  },
  {
    question: "Why must you pass memory address pointers using `&` operator to `scanf()` for scalar variables like `int x`?",
    options: [
      "Because C passes function parameters by value; `scanf` requires address to modify variable in caller's stack frame",
      "Because `&` makes `scanf` run faster",
      "Because `&` converts int to string",
      "Because `scanf` is a macro"
    ],
    answerIndex: 0,
    explanation: "C uses pass-by-value. To allow `scanf` to write input values into caller variables, memory addresses must be passed via `&` pointer."
  },
  {
    question: "Why is `scanf(\"%s\", str)` risky for user input without field width specified?",
    options: [
      "Can overflow target array buffer if user inputs more characters than array capacity, causing security exploits",
      "Can only read numbers",
      "Deletes string contents",
      "Slows down execution"
    ],
    answerIndex: 0,
    explanation: "Plain `%s` in `scanf` does not limit input characters, making it susceptible to buffer overflow attacks. `%29s` limits max input length."
  },
  {
    question: "What happens when `scanf(\"%s\", str)` encounters whitespace (spaces, tabs, newlines) in user input?",
    options: [
      "Stops reading input at first whitespace character, leaving remaining text in input buffer",
      "Reads whitespace as part of string",
      "Throws runtime exception",
      "Converts space to underscore"
    ],
    answerIndex: 0,
    explanation: "`%s` in `scanf` stops at first whitespace. To read full lines with spaces, `fgets()` or scansets `scanf(\"%[^\\n]\", str)` are used."
  },
  {
    question: "What does the scanset `%[^\n]` in `scanf()` do?",
    options: [
      "Reads all characters including spaces until a newline character `\\n` is encountered",
      "Reads only newlines",
      "Ignores string input",
      "Converts text to uppercase"
    ],
    answerIndex: 0,
    explanation: "`%[^\n]` reads any sequence of characters except newline, enabling full multi-word string input."
  },
  {
    question: "Why is there often a space placed before `%c` in `scanf(\" %c\", &ch)`?",
    options: [
      "To skip leading unconsumed whitespace (such as trailing newline `\\n` from previous Enter press) in input buffer",
      "Required by standard syntax",
      "To make output print a space",
      "To enable capital letters"
    ],
    answerIndex: 0,
    explanation: "Leading space in `\" %c\"` tells `scanf` to discard leftover newlines/spaces before consuming character input."
  },
  {
    question: "Which standard I/O function flushes output buffer to target terminal stdout immediately?",
    options: ["fflush(stdout)", "flush(stdout)", "clearerr(stdout)", "fpurge(stdout)"],
    answerIndex: 0,
    explanation: "`fflush(stdout)` forces buffered output bytes to write immediately to standard output console."
  },
  {
    question: "Which standard function reads a line of text safely from stream file/stdin into buffer with buffer size limit?",
    options: ["fgets()", "gets()", "scanf()", "puts()"],
    answerIndex: 0,
    explanation: "`fgets(buffer, sizeof(buffer), stdin)` safely reads input up to buffer size limit, preventing buffer overflow."
  },
  {
    question: "What is the return value of `putchar(int c)`?",
    options: ["Character written as unsigned char cast to int, or EOF on error", "Always 0", "1", "String length"],
    answerIndex: 0,
    explanation: "`putchar()` returns written character on success, or `EOF` (-1) if write fails."
  },
  {
    question: "What is the function of `getchar()`?",
    options: ["Reads next single character from standard input `stdin` as an `int`", "Prints character", "Clears console", "Reads string"],
    answerIndex: 0,
    explanation: "`getchar()` reads one character from `stdin` and returns its ASCII value as `int` (or `EOF`)."
  },
  {
    question: "What does `puts(const char *str)` automatically append to console output?",
    options: ["Appends a trailing newline `\\n` automatically", "Appends a space", "Appends null terminator", "Appends nothing"],
    answerIndex: 0,
    explanation: "`puts()` outputs string to console and automatically appends a trailing newline `\\n` character."
  },
  {
    question: "Which standard stream constant represents standard error output stream in C?",
    options: ["stderr", "stdout", "stdin", "stdlog"],
    answerIndex: 0,
    explanation: "`stderr` represents unbuffered standard error stream."
  },
  {
    question: "Which function writes formatted output to a specific file stream or `stderr`?",
    options: ["fprintf()", "sprintf()", "printf()", "snprintf()"],
    answerIndex: 0,
    explanation: "`fprintf(stderr, \"Error: %d\\n\", code)` formats and outputs text to specified `FILE*` stream."
  },
  {
    question: "Which function formats and writes output directly into a target string character array in RAM?",
    options: ["sprintf() / snprintf()", "fprintf()", "printf()", "sscanf()"],
    answerIndex: 0,
    explanation: "`sprintf()` / `snprintf()` format data into target string buffer."
  },
  {
    question: "Why is `snprintf()` preferred over `sprintf()`?",
    options: [
      "Accepts maximum target buffer size parameter, preventing string buffer overflow",
      "Executes twice as fast",
      "Automatically prints to screen",
      "Uses less RAM"
    ],
    answerIndex: 0,
    explanation: "`snprintf(buf, sizeof(buf), ...)` guarantees output does not overflow destination buffer."
  },
  {
    question: "What does `sscanf(str, \"%d\", &val)` do?",
    options: [
      "Parses formatted input data directly from source string array instead of keyboard stdin",
      "Writes integer to string",
      "Prints string to terminal",
      "Deletes string"
    ],
    answerIndex: 0,
    explanation: "`sscanf()` parses formatted values directly out of string buffer."
  },
  {
    question: "What format specifier is used for printing `long double` in `printf()`?",
    options: ["%Lf", "%lf", "%f", "%g"],
    answerIndex: 0,
    explanation: "`%Lf` is format specifier for `long double` in `printf()` and `scanf()`."
  },

  // --------------------------------------------------------------------------
  // SUB-DOMAIN 6: COMMON BEGINNER PITFALLS & COMPILER ARCHITECTURE (Questions 181-200)
  // --------------------------------------------------------------------------
  {
    question: "What runtime error signal is triggered when a program attempts to access invalid memory (e.g. dereferencing NULL or uninitialized pointer)?",
    options: ["Segmentation Fault (SIGSEGV)", "Arithmetic Exception (SIGFPE)", "Aborted (SIGABRT)", "Bus Error"],
    answerIndex: 0,
    explanation: "Segmentation Fault (SIGSEGV) is sent by OS when process accesses memory segment outside its allocated virtual address space."
  },
  {
    question: "What happens if a program attempts to divide an integer by zero in C?",
    options: [
      "Undefined behavior resulting in Floating Point Exception (SIGFPE) crash or unpredictable result",
      "Returns infinity automatically",
      "Returns 0 automatically",
      "Compiler converts zero to 1"
    ],
    answerIndex: 0,
    explanation: "Integer division by zero causes Undefined Behavior and triggers `SIGFPE` (Floating Point Exception) crash on hardware."
  },
  {
    question: "Why does `int val = 2147483647; val = val + 1;` result in negative value `-2147483648` on typical 32-bit two's complement systems?",
    options: [
      "Signed Integer Overflow rolls over to negative minimum value in 2's complement representation",
      "Compiler bug",
      "Memory leak",
      "Stack overflow"
    ],
    answerIndex: 0,
    explanation: "In 2's complement binary representation, adding 1 to maximum positive signed integer `0x7FFFFFFF` wraps to minimum negative `0x80000000`."
  },
  {
    question: "Is signed integer overflow defined by ISO C standard?",
    options: [
      "No, signed integer overflow is Undefined Behavior in ISO C",
      "Yes, always wraps around modulo 2^32",
      "Yes, truncates to 0",
      "Yes, throws runtime exception"
    ],
    answerIndex: 0,
    explanation: "Signed integer overflow is Undefined Behavior in C (unlike unsigned integer overflow which is explicitly defined to wrap modulo $2^n$)."
  },
  {
    question: "What is the behavior of unsigned integer overflow according to ISO C standard?",
    options: [
      "Defined behavior: wraps around modulo 2^n (where n is number of bits in unsigned type)",
      "Undefined behavior crash",
      "Compiles with syntax error",
      "Resets CPU"
    ],
    answerIndex: 0,
    explanation: "Unsigned integer arithmetic is defined by standard to wrap around modulo $2^n$ ($UINT\\_MAX + 1 = 0$)."
  },
  {
    question: "What bug occurs if you omit `&` when reading an integer into `int x` using `scanf(\"%d\", x)`?",
    options: [
      "Passes value of `x` (treated as memory address pointer), causing `scanf` to write to garbage RAM address and crash (SIGSEGV)",
      "Reads input correctly anyway",
      "Converts number to float",
      "Compiles with no warning on any level"
    ],
    answerIndex: 0,
    explanation: "Passing `x` instead of `&x` causes `scanf` to interpret initial value of `x` as memory destination address, leading to memory corruption or crash."
  },
  {
    question: "What is dangling pointer in C?",
    options: [
      "A pointer that references a memory block that has already been freed or deallocated",
      "A NULL pointer",
      "A pointer to global variable",
      "A pointer to function"
    ],
    answerIndex: 0,
    explanation: "A dangling pointer holds memory address of memory that was deallocated (via `free` or returning stack address)."
  },
  {
    question: "What is Memory Leak in C?",
    options: [
      "Dynamically allocated heap memory (`malloc`) that is no longer accessible and was never freed with `free()`",
      "Stack memory overflow",
      "Reading uninitialized variables",
      "Writing to read-only text segment"
    ],
    answerIndex: 0,
    explanation: "Memory leaks occur when program allocates heap memory but loses pointer references before calling `free()`, causing RAM usage to grow."
  },
  {
    question: "Which tool on Linux is widely used to detect memory leaks and invalid memory accesses in compiled C programs?",
    options: ["Valgrind (Memcheck)", "GCC -E", "Make", "GDB run"],
    answerIndex: 0,
    explanation: "Valgrind Memcheck executes binaries inside synthetic CPU simulator to detect memory leaks, uninitialized reads, and invalid accesses."
  },
  {
    question: "What is the purpose of GDB (GNU Debugger)?",
    options: [
      "Allows step-by-step execution, setting breakpoints, inspecting variables, and examining call stack crash backtraces",
      "Generates C source code automatically",
      "Optimizes loop compilation",
      "Formats source code indentation"
    ],
    answerIndex: 0,
    explanation: "GDB is the interactive debugger for running C programs step-by-step, inspecting registers/variables, and diagnosing core dumps."
  },
  {
    question: "What command inside GDB displays the function call stack backtrace during a program crash?",
    options: ["backtrace (or bt)", "run", "step", "print"],
    answerIndex: 0,
    explanation: "`backtrace` (or `bt`) prints stack frames leading up to crash location."
  },
  {
    question: "What is a Core Dump file on Linux systems?",
    options: [
      "A snapshot file recorded by OS containing process memory state and register contents at instant of crash",
      "A trash bin file",
      "Source code backup",
      "Compiler output log"
    ],
    answerIndex: 0,
    explanation: "Core dump contains complete virtual memory memory state of process at crash time for post-mortem analysis with GDB (`gdb app core`)."
  },
  {
    question: "What compiler flag in GCC enables AddressSanitizer (ASan) to detect out-of-bounds array access and use-after-free at runtime?",
    options: ["-fsanitize=address", "-Wall", "-O3", "-g3"],
    answerIndex: 0,
    explanation: "`-fsanitize=address` instrument binaries with runtime checks detecting memory corruption, buffer overflows, and use-after-free errors."
  },
  {
    question: "What compiler flag enables UndefinedBehaviorSanitizer (UBSan) in GCC?",
    options: ["-fsanitize=undefined", "-Wall", "-O2", "-std=c11"],
    answerIndex: 0,
    explanation: "`-fsanitize=undefined` instruments binary to catch undefined behaviors like integer overflow and shift errors at runtime."
  },
  {
    question: "Why is `float` comparison with `==` (e.g. `if (f == 0.7)`) considered dangerous in C?",
    options: [
      "Floating point numbers cannot accurately represent all decimal fractions in binary IEEE 754, causing precision mismatch",
      "Syntax error in C",
      "Converts float to int automatically",
      "Causes segmentation fault"
    ],
    answerIndex: 0,
    explanation: "IEEE 754 binary floating point represents numbers as base-2 fractions, so decimals like `0.7` have inexact binary representations. Absolute difference `fabs(a - b) < EPSILON` should be used."
  },
  {
    question: "Which header file provides macro `fabs()` for absolute value of floating-point numbers?",
    options: ["<math.h>", "<stdlib.h>", "<stdio.h>", "<float.h>"],
    answerIndex: 0,
    explanation: "`<math.h>` declares mathematical functions like `fabs()`, `sqrt()`, `pow()`, `sin()`, etc."
  },
  {
    question: "What is the effect of compiling with `-Wimplicit-function-declaration` warning flag in GCC?",
    options: [
      "Warns when a function is invoked before being declared or prototyped",
      "Prevents function calls",
      "Converts functions to macros",
      "Speeds up build time"
    ],
    answerIndex: 0,
    explanation: "Warns if a function is used prior to signature declaration prototype."
  },
  {
    question: "What error occurs if you define two global variables with exact same name in different `.c` files without `static` or `extern`?",
    options: ["Multiple Definition Linker Error", "Syntax Error", "Preprocessor Error", "Segmentation Fault"],
    answerIndex: 0,
    explanation: "The linker (`ld`) detects two strong global symbols with identical names, aborting with 'multiple definition of variable_name'."
  },
  {
    question: "What is the purpose of `typedef` keyword in C?",
    options: [
      "Creates a new custom type alias name for an existing data type",
      "Defines a new variable",
      "Allocates memory",
      "Includes header files"
    ],
    answerIndex: 0,
    explanation: "`typedef` creates new alias names for types (e.g. `typedef unsigned long u64;`), improving code clarity."
  },
  {
    question: "Why should C programmers always check the return value of `scanf()` or `malloc()` in production software?",
    options: [
      "To verify that input parsing succeeded or dynamic RAM allocation succeeded before dereferencing pointers",
      "Required by OS to prevent system reboot",
      "Makes code compile faster",
      "Increases program execution speed"
    ],
    answerIndex: 0,
    explanation: "Checking return values ensures program handles invalid inputs or out-of-memory states gracefully without crashing on NULL dereferences or corrupted state."
  }
];

export default questions;
