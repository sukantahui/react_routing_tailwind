export const topic4Questions = [
  {
    question: "What is a Header Guard (Include Guard) in C?",
    answer: "A conditional compilation pattern (#ifndef HEADER_NAME_H, #define HEADER_NAME_H, #endif) placed in C header files (.h) to prevent the same header file from being expanded multiple times in a single translation unit."
  },
  {
    question: "What error occurs if a header file containing struct or typedef definitions is included twice without guards?",
    answer: "The compiler throws a 'redefinition of struct/typedef' or 'conflicting types' fatal error during semantic analysis."
  },
  {
    question: "What is '#pragma once'?",
    answer: "#pragma once is a non-standard but universally supported compiler directive placed at the top of a header file that instructs the preprocessor to include the file only once per compilation unit."
  },
  {
    question: "What are the advantages of standard #ifndef header guards over #pragma once?",
    answer: "1. 100% compliant with ISO C standard.\n2. Guaranteed to work on every esoteric compiler and embedded architecture.\n3. Immune to filesystem inode aliasing (e.g. symlinks or hard links pointing to the same file)."
  },
  {
    question: "What are the advantages of #pragma once over standard #ifndef header guards?",
    answer: "1. Less boilerplate code (1 line instead of 3).\n2. Eliminates guard macro naming collision bugs.\n3. Faster compilation speeds because compilers avoid re-opening the file from disk."
  },
  {
    question: "What is a Guard Macro Name Collision bug?",
    answer: "If two different header files (e.g. math/vector.h and physics/vector.h) accidentally use the exact same guard macro name (VECTOR_H), including the second header will be silently skipped, causing missing type errors."
  },
  {
    question: "What is the recommended naming convention for header guard macros?",
    answer: "Use the project and file path: PROJECT_MODULE_FILENAME_H, e.g., ACCOTAX_CORE_VECTOR2D_H, avoiding leading double underscores (reserved by the C standard for compiler internals)."
  },
  {
    question: "Why should guard macro names NOT begin with leading underscores followed by capital letters (e.g. _VECTOR_H)?",
    answer: "The ISO C standard reserves identifiers beginning with an underscore followed by an uppercase letter (or double underscores '__') for the compiler and standard library implementations."
  },
  {
    question: "What is Circular Dependency (Circular Include) in C header files?",
    answer: "When Header A includes Header B, and Header B includes Header A. Without header guards, the preprocessor enters an infinite expansion loop until the compiler hits the maximum include depth limit."
  },
  {
    question: "How do you resolve circular dependency when two structs reference each other?",
    answer: "Use forward declarations: declare 'struct B;' before 'struct A { struct B *ptr; };', and place the full definition of struct B in its own header without circular #includes."
  },
  {
    question: "Should function prototypes be protected by header guards?",
    answer: "Yes. While duplicate identical function declarations are technically allowed in C, header files usually also contain struct, union, enum, and typedef definitions that are strictly forbidden from being redefined."
  },
  {
    question: "Should variable definitions (e.g. int counter = 0;) be placed in header files?",
    answer: "No! Variable definitions allocate memory and will cause 'multiple definition of symbol' linker errors if included in multiple .c files. Only 'extern int counter;' declarations belong in headers."
  },
  {
    question: "Can inline functions be defined inside header files?",
    answer: "Yes, 'static inline' functions are designed to live in header files so that the compiler can inline their definitions directly across all calling translation units."
  },
  {
    question: "How does GCC optimize standard #ifndef header guards?",
    answer: "GCC features a 'multiple-include optimization'. If it detects that an entire file is wrapped in an #ifndef guard, it records the guard macro and will not even open or read the physical file on subsequent #include directives if that macro is defined."
  },
  {
    question: "What happens if you accidentally put code BEFORE the #ifndef header guard line?",
    answer: "Any code before the #ifndef line will be parsed on every duplicate inclusion, breaking the multiple-include optimization and possibly causing redefinition errors."
  },
  {
    question: "What happens if you forget to write #define GUARD_NAME inside the #ifndef block?",
    answer: "The guard macro is never defined, so subsequent #include directives will re-expand the file, defeating the guard completely."
  },
  {
    question: "Can you combine #pragma once and #ifndef header guards in the same file?",
    answer: "Yes. Many professional open-source libraries put '#pragma once' at the top followed by traditional '#ifndef GUARDS' for maximum compilation speed and universal portability."
  },
  {
    question: "What is the maximum nested #include depth mandated by the C standard?",
    answer: "C99/C11 requires compilers to support at least 15 levels of nested header inclusions (modern GCC/Clang support hundreds of levels)."
  },
  {
    question: "Why should header files include ONLY the minimum necessary dependencies?",
    answer: "Excessive header inclusions increase compilation time, pollute the namespace with unneeded symbols, and create unnecessary build coupling."
  },
  {
    question: "What is a 'Forward Declaration' and why does it reduce header inclusion bloat?",
    answer: "A forward declaration tells the compiler that a type or struct exists (e.g. 'typedef struct Student Student;') without defining its fields, allowing pointers to be declared without including the full header."
  },
  {
    question: "Can an #endif at the end of a header guard have a comment?",
    answer: "Yes, appending a comment like '#endif /* ACCOTAX_VECTOR_H */' is standard best practice to improve code readability in large files."
  },
  {
    question: "What is a 'PCH' (Precompiled Header)?",
    answer: "A feature supported by GCC, Clang, and MSVC that compiles static system headers (like <stdio.h>, <stdlib.h>, <windows.h>) into a binary cache once, dramatically accelerating build times."
  },
  {
    question: "How do header guards behave across different .c source files?",
    answer: "Each .c file is a separate translation unit with its own fresh preprocessor symbol table. Header guards only protect against multiple inclusions within the *same* translation unit."
  },
  {
    question: "Can you undefine a header guard macro using #undef?",
    answer: "Technically yes, but doing so will cause the header to be re-expanded on the next #include, which is almost always a bug."
  },
  {
    question: "What tool or compiler flag detects missing header guards?",
    answer: "Clang-tidy and static analyzers flag header files missing either #pragma once or matching #ifndef include guards."
  }
];
