const questions = [
  {
    question: "What is the primary difference between #define and the const keyword in C?",
    shortAnswer: "#define is a preprocessor text replacement with no type checking; const creates a typed, read-only variable validated by the compiler.",
    explanation: "#define directives are replaced with their text definitions before compilation (in the .i stage). const variables are recognized by the compiler's semantic analyzer and allocated in read-only memory (.rodata).",
    hint: "Preprocessor text macro vs compiler typed variable.",
    level: "basic",
    codeExample: "#define MAX 100        // Textual macro\nconst int maxVal = 100; // Typed constant variable"
  },
  {
    question: "Does a #define constant consume physical RAM memory in the compiled program?",
    shortAnswer: "No, #define constants are inlined directly as immediate literal operands in CPU machine instructions.",
    explanation: "Because the preprocessor replaces every occurrence of the macro with literal text, no dedicated memory address is allocated for #define constants in RAM.",
    hint: "Inlined immediate values vs RAM allocation.",
    level: "intermediate"
  },
  {
    question: "Can you take the memory address of a #define constant using the & operator?",
    shortAnswer: "No, because a #define macro is not a variable and does not occupy a distinct memory address in RAM.",
    explanation: "Writing `&MAX` results in a compilation error (e.g. `lvalue required as unary '&' operand`), whereas `&maxVal` for a `const int maxVal` yields a valid pointer `const int*`.",
    hint: "Only variables with memory addresses support the address-of & operator.",
    level: "basic"
  },
  {
    question: "What is the classic macro parenthesis pitfall with #define?",
    shortAnswer: "Failing to enclose macro parameters and expressions in parentheses causes operator precedence bugs.",
    explanation: "If defined as `#define SQUARE(x) x * x`, calling `SQUARE(2 + 3)` expands to `2 + 3 * 2 + 3` = `2 + 6 + 3` = `11` instead of 25. Always write `#define SQUARE(x) ((x) * (x))`.",
    hint: "Always wrap macro parameters and whole macro expressions in parentheses.",
    level: "intermediate",
    codeExample: "#define SQUARE(x) ((x) * (x))\nint res = SQUARE(2 + 3); // ((2+3) * (2+3)) = 25"
  },
  {
    question: "What is a 'const' variable in C and where is it stored in memory?",
    shortAnswer: "A variable whose value cannot be modified after initialization, typically placed by the compiler in the .rodata (read-only data) segment.",
    explanation: "Attempting to assign a new value to a const variable (`const int x = 10; x = 20;`) generates a compile-time error.",
    hint: "Read-only data segment (.rodata).",
    level: "basic"
  },
  {
    question: "What is the difference between 'const int *ptr' and 'int * const ptr'?",
    shortAnswer: "'const int *ptr' is a pointer to constant data (data is immutable); 'int * const ptr' is a constant pointer (pointer address is immutable).",
    explanation: "Read from right to left: `const int *ptr` means 'ptr is a pointer to an int that is const'. `int * const ptr` means 'ptr is a const pointer to an int'.",
    hint: "Read right-to-left: const before '*' affects data; const after '*' affects pointer address.",
    level: "intermediate",
    codeExample: "int x = 10, y = 20;\nconst int *p1 = &x;  // *p1 = 15 (ERROR); p1 = &y (OK)\nint * const p2 = &x;  // *p2 = 15 (OK); p2 = &y (ERROR)"
  },
  {
    question: "What does 'const int * const ptr' signify in C?",
    shortAnswer: "A constant pointer to constant data: neither the pointed-to value nor the pointer memory address can be modified.",
    explanation: "Both `*ptr = 10;` and `ptr = &other;` will trigger compile-time errors.",
    hint: "Fully immutable pointer and data.",
    level: "intermediate"
  },
  {
    question: "Why can't a 'const' variable be used as a static array size in C89/C90?",
    shortAnswer: "In C89, const variables are treated as read-only variables, not true compile-time constant expressions.",
    explanation: "In C89, writing `const int N = 10; int arr[N];` produces an error because N is a variable. C99 introduced Variable Length Arrays (VLAs) which permit this, but #define is still preferred for fixed compile-time array sizes.",
    hint: "C89 required literal constant expressions for array dimensions.",
    level: "advanced"
  },
  {
    question: "What is an enum (enumeration) and why is it preferred over multiple #define statements?",
    shortAnswer: "enum groups related named integer constants under a distinct type with automatic sequential numbering and debugger symbol support.",
    explanation: "Unlike #define, enum identifiers exist in compiler symbol tables, allowing debuggers (like GDB) to display named constant values (e.g. `STATE_RUNNING`) instead of raw numbers.",
    hint: "Debuggable symbolic constant groups.",
    level: "basic",
    codeExample: "enum State { IDLE, RUNNING, PAUSED, STOPPED };\n// IDLE=0, RUNNING=1, PAUSED=2, STOPPED=3"
  },
  {
    question: "Can you assign custom integer values to enum constants in C?",
    shortAnswer: "Yes, enum constants can be assigned explicit integer values; subsequent unassigned constants increment from the previous value.",
    explanation: "In `enum Code { OK = 200, CREATED = 201, BAD_REQ = 400, UNAUTH };`, UNAUTH automatically receives value 401.",
    hint: "Explicit integer assignment with automatic incremental fallback.",
    level: "basic",
    codeExample: "enum HTTPStatus { OK = 200, NOT_FOUND = 404, SERVER_ERROR = 500 };"
  },
  {
    question: "What is the difference between string literals and const char arrays in C?",
    shortAnswer: "String literals (\"Text\") reside in read-only memory (.rodata); a const char array (const char arr[] = \"Text\") allocates a read-only local array on the stack.",
    explanation: "Modifying `char *p = \"Text\"; p[0]='t';` crashes with a segfault. `char arr[] = \"Text\"; arr[0]='t';` is valid because the string is copied to mutable stack memory.",
    hint: "Read-only .rodata segment vs local stack frame copy.",
    level: "advanced"
  },
  {
    question: "What is the volatile type qualifier and how does it interact with const?",
    shortAnswer: "volatile tells the compiler not to optimize away memory reads because hardware or another thread may change the value.",
    explanation: "A `const volatile int *reg` represents a read-only hardware register (like a real-time clock or input pin) that changes externally but must not be written to by code.",
    hint: "Read-only hardware status registers: const volatile.",
    level: "advanced",
    codeExample: "const volatile uint32_t * const UART_STATUS = (uint32_t *)0x40001000;"
  },
  {
    question: "Why should side effects (like i++) be strictly avoided inside macro calls?",
    shortAnswer: "Because macros perform textual replacement, arguments with side effects are evaluated multiple times.",
    explanation: "In `#define MAX(a, b) ((a) > (b) ? (a) : (b))`, calling `MAX(x++, y)` causes `x` to be incremented twice if `x > y`!",
    hint: "Multiple argument evaluation pitfall.",
    level: "intermediate",
    codeExample: "int x = 5, y = 3;\nint m = MAX(x++, y); // x is incremented TWICE!"
  },
  {
    question: "What is the #undef preprocessor directive?",
    shortAnswer: "It undefines a previously defined macro identifier so it can be redefined or removed from scope.",
    explanation: "#undef removes the macro from the preprocessor lookup table, preventing further textual expansion.",
    hint: "Removes macro definitions.",
    level: "basic",
    codeExample: "#define BUFFER_SIZE 1024\n#undef BUFFER_SIZE\n#define BUFFER_SIZE 2048"
  },
  {
    question: "What are predefined compiler macros in C (e.g. __LINE__, __FILE__, __DATE__)?",
    shortAnswer: "Built-in macros provided automatically by the C preprocessor to supply debugging and build metadata.",
    explanation: "__LINE__ provides current line number, __FILE__ provides source filename, __DATE__ and __TIME__ provide compilation timestamps, and __STDC_VERSION__ provides the C standard.",
    hint: "Standard debugging metadata macros.",
    level: "basic",
    codeExample: "printf(\"Error at %s:%d\\n\", __FILE__, __LINE__);"
  },
  {
    question: "Can you change the value of a const variable using pointer typecasting (e.g. *(int*)&c = 20)?",
    shortAnswer: "Doing so produces Undefined Behavior (UB) in standard C.",
    explanation: "If the compiler places the const variable in read-only physical memory (.rodata), casting away const and writing to it triggers a hardware segmentation fault.",
    hint: "Never cast away const to mutate memory.",
    level: "advanced"
  },
  {
    question: "What is the scope of a #define macro versus a const variable?",
    shortAnswer: "#define is active from its point of definition to the end of the file (file-scope); const variables respect standard block scope ({ ... }).",
    explanation: "A const variable declared inside a function is only visible within that function's block. A #define inside a function remains active everywhere below it unless #undef is used.",
    hint: "Block lexical scope vs preprocessor file scope.",
    level: "intermediate"
  },
  {
    question: "What is the difference between const in C vs const in C++?",
    shortAnswer: "In C, global const has external linkage by default; in C++, global const has internal linkage (static). Also, C++ treats const as true compile-time constants.",
    explanation: "In C++, `const int N = 10; int arr[N];` is valid standard compile-time array sizing in all versions, whereas in C89 it was not.",
    hint: "Linkage rules and compile-time evaluation differences.",
    level: "advanced"
  },
  {
    question: "What is the inline function alternative to function-like macros in C99?",
    shortAnswer: "C99 introduced the 'inline' keyword, providing the speed of macros with full compiler type-safety and no double-evaluation bugs.",
    explanation: "An inline function `static inline int square(int x) { return x * x; }` eliminates function call overhead while safely evaluating arguments with side effects exactly once.",
    hint: "Modern type-safe replacement for complex macros.",
    level: "intermediate",
    codeExample: "static inline int square(int x) {\n    return x * x;\n}"
  },
  {
    question: "What is conditional compilation with #ifdef, #ifndef, and #endif?",
    shortAnswer: "Directives that allow selective inclusion or exclusion of source code blocks based on whether specific macros are defined.",
    explanation: "Commonly used for header include guards (#ifndef MY_HEADER_H #define MY_HEADER_H ... #endif) and platform-specific code (e.g. #ifdef _WIN32).",
    hint: "Conditional preprocessor filtering.",
    level: "basic"
  },
  {
    question: "Why are header include guards essential in C header files?",
    shortAnswer: "To prevent multiple inclusion of the same header file, which causes duplicate typedef or struct definition errors.",
    explanation: "Include guards wrap header contents with `#ifndef HEADER_NAME_H`, `#define HEADER_NAME_H`, and `#endif`.",
    hint: "#ifndef HEADER_H ... #define HEADER_H ... #endif.",
    level: "basic",
    codeExample: "#ifndef MATH_UTILS_H\n#define MATH_UTILS_H\nint add(int a, int b);\n#endif"
  },
  {
    question: "What is the #pragma once directive and how does it compare to include guards?",
    shortAnswer: "#pragma once is a non-standard but universally supported compiler directive that prevents a header file from being included multiple times.",
    explanation: "It is faster and less error-prone than manual #ifndef include guards because the compiler tracks opened file paths automatically.",
    hint: "Modern, concise header include guard directive.",
    level: "intermediate"
  },
  {
    question: "What is a compound literal in C99?",
    shortAnswer: "An unnamed object created on the fly with a cast-like syntax: (type){ initializer-list }.",
    explanation: "Useful for passing temporary structs or arrays to functions without declaring a named variable first.",
    hint: "Anonymous inline typed objects.",
    level: "advanced",
    codeExample: "struct Point { int x, y; };\nvoid drawPoint(struct Point p);\n// Invocation:\ndrawPoint((struct Point){ 10, 20 });"
  },
  {
    question: "How does the compiler treat numeric literals like 100 or 3.14 by default?",
    shortAnswer: "Whole numbers without suffixes default to 'int'; decimal numbers without suffixes default to 'double'.",
    explanation: "100 is typed as `int` (4 bytes); 3.14 is typed as `double` (8 bytes). To make 3.14 a 4-byte float, append 'f' (3.14f).",
    hint: "Default integer = int; default float = double.",
    level: "basic"
  },
  {
    question: "What is the difference between char * const ptr and const char * ptr when passing parameters to functions?",
    shortAnswer: "const char *ptr guarantees the function will not modify the caller's string data; char * const ptr prevents the function from reassigning its local pointer variable.",
    explanation: "Standard library functions like strlen(const char *s) and strcpy(char *dest, const char *src) use const pointers to provide caller immutability guarantees.",
    hint: "API safety contract: const pointer parameters prevent unwanted mutation.",
    level: "intermediate"
  }
];

export default questions;
