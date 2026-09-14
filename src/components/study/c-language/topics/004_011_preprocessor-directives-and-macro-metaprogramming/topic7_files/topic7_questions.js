// 200 Comprehensive MCQs for Module 004_011: Preprocessor Directives & Macro Metaprogramming
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    "question": "What is the C Preprocessor?",
    "options": [
      "A software interpreter that runs C code line-by-line",
      "A macro-processing textual translation tool that operates on source code before lexical analysis and syntax compilation",
      "The link-time optimizer",
      "The CPU instruction decoder"
    ],
    "answerIndex": 1,
    "explanation": "The C preprocessor transforms source code text before the compiler analyzes grammar (handling `#include`, `#define`, `#ifdef`, etc.)."
  },
  {
    "question": "Which GCC command line flag runs ONLY the preprocessor and outputs the preprocessed code (`.i`)?",
    "options": [
      "`gcc -S`",
      "`gcc -c`",
      "`gcc -E`",
      "`gcc -O3`"
    ],
    "answerIndex": 2,
    "explanation": "`gcc -E` stops compilation immediately after the preprocessing stage and prints preprocessed source text to stdout."
  },
  {
    "question": "What character must all preprocessor directives begin with as the first non-whitespace character on a line?",
    "options": [
      "`$`",
      "`#`",
      "`@`",
      "`%`"
    ],
    "answerIndex": 1,
    "explanation": "All standard C preprocessor directives begin with the hash symbol `#`."
  },
  {
    "question": "What is the difference between `#include <filename.h>` and `#include \"filename.h\"`?",
    "options": [
      "`<...>` searches standard system include directories first; `\"...\"` searches the current working/source directory first before falling back to system paths",
      "`<...>` is for C++ headers; `\"...\"` is for C headers",
      "`\"...\"` is faster than `<...>`",
      "`<...>` only supports standard library functions"
    ],
    "answerIndex": 0,
    "explanation": "Angle brackets `<...>` search standard compiler include directories; double quotes `\"...\"` search the local project directory first."
  },
  {
    "question": "What does the `#define` directive do?",
    "options": [
      "Declares a global variable in the data segment",
      "Defines a preprocessor macro for textual replacement throughout the translation unit",
      "Allocates heap memory",
      "Creates a new function signature"
    ],
    "answerIndex": 1,
    "explanation": "`#define` establishes a macro identifier that the preprocessor replaces verbatim with its replacement token sequence."
  },
  {
    "question": "What is the result of `#define SQUARE(x) x * x` when called as `SQUARE(2 + 3)`?",
    "options": [
      "`25` (`(2+3)*(2+3)`)",
      "`11` (`2 + 3 * 2 + 3` due to operator precedence)",
      "`10`",
      "`Compilation error`"
    ],
    "answerIndex": 1,
    "explanation": "Without parentheses in the macro definition, `SQUARE(2+3)` expands to `2 + 3 * 2 + 3 = 2 + 6 + 3 = 11`."
  },
  {
    "question": "How should function-like macros be defensively written to prevent operator precedence bugs?",
    "options": [
      "Wrap the entire macro and every argument reference in parentheses: `#define SQUARE(x) ((x) * (x))`",
      "Use commas instead of spaces",
      "Terminate every line with a semicolon",
      "Prefix macro arguments with `$`"
    ],
    "answerIndex": 0,
    "explanation": "Parenthesizing both individual arguments `(x)` and the entire outer expression `((x) * (x))` prevents precedence anomalies."
  },
  {
    "question": "Why can `#define SQUARE(x) ((x) * (x))` cause subtle bugs when called with `SQUARE(i++)`?",
    "options": [
      "It causes a compilation error",
      "`i++` is evaluated twice (side-effect duplication), incrementing `i` two times instead of once",
      "`i` is not incremented at all",
      "It causes stack overflow"
    ],
    "answerIndex": 1,
    "explanation": "Because macros perform textual expansion, passing expressions with side effects (`i++`, `getchar()`) evaluates them multiple times."
  },
  {
    "question": "What does the Stringizing Operator (`#`) do in a function-like macro?",
    "options": [
      "Converts a macro argument into a string literal enclosed in double quotes",
      "Calculates the length of a string",
      "Concatenates two strings",
      "Encrypts the argument"
    ],
    "answerIndex": 0,
    "explanation": "The `#` operator converts macro parameter tokens into a string constant (e.g. `#define PRINT(x) printf(#x \" = %d\\n\", x)`)."
  },
  {
    "question": "What does the Token-Pasting (Concatenation) Operator (`##`) do?",
    "options": [
      "Concatenates two string literals into one",
      "Merges two separate lexical tokens into a single combined token during preprocessing",
      "Pastes code from an external file",
      "Duplicates a line of code"
    ],
    "answerIndex": 1,
    "explanation": "The `##` operator joins two adjacent tokens into a single valid token (e.g. `COMMAND(quit)` -> `quit_command()`)."
  },
  {
    "question": "What are Header Guards and why are they essential in C header files?",
    "options": [
      "Operating system security permissions for header files",
      "Preprocessor conditional blocks (`#ifndef HEADER_H`, `#define HEADER_H`, `#endif`) that prevent multiple inclusion and duplicate symbol definitions in a single translation unit",
      "Functions that validate user credentials",
      "Linker optimization tags"
    ],
    "answerIndex": 1,
    "explanation": "Header guards protect header files from being parsed multiple times within the same compilation unit, preventing redefinition errors."
  },
  {
    "question": "What is `#pragma once`?",
    "options": [
      "A non-standard but universally supported preprocessor directive that instructs the compiler to include a header file only once per translation unit",
      "A directive that limits a function to a single execution",
      "A loop termination instruction",
      "A macro that executes once at startup"
    ],
    "answerIndex": 0,
    "explanation": "`#pragma once` is a modern, concise, and widely supported alternative to classic `#ifndef` header guards."
  },
  {
    "question": "What is the `do { ... } while(0)` idiom used for in multi-statement macros?",
    "options": [
      "To create an infinite loop",
      "To encapsulate multi-statement macros into a single syntactically sound statement that works seamlessly inside `if-else` blocks without breaking semicolons",
      "To slow down CPU execution for timing",
      "To allocate stack space"
    ],
    "answerIndex": 1,
    "explanation": "`do { ... } while(0)` groups multiple statements into a block that accepts a trailing semicolon `;` without dangling `else` bugs."
  },
  {
    "question": "Which predefined standard macro gives the current source file name as a string literal?",
    "options": [
      "`__DIR__`",
      "`__FILE__`",
      "`__PATH__`",
      "`__SOURCE__`"
    ],
    "answerIndex": 1,
    "explanation": "`__FILE__` expands to a string literal containing the path of the current C source file."
  },
  {
    "question": "Which predefined standard macro gives the current line number as an integer?",
    "options": [
      "`__LINE__`",
      "`__ROW__`",
      "`__LINENUM__`",
      "`__INDEX__`"
    ],
    "answerIndex": 0,
    "explanation": "`__LINE__` expands to the current decimal line number within the source file."
  },
  {
    "question": "Which predefined standard macro gives the compilation date as a string literal (\"Mmm dd yyyy\")?",
    "options": [
      "`__TIME__`",
      "`__DATE__`",
      "`__TIMESTAMP__`",
      "`__BUILD__`"
    ],
    "answerIndex": 1,
    "explanation": "`__DATE__` contains the date of compilation in \"Mmm dd yyyy\" format."
  },
  {
    "question": "Which predefined standard macro gives the compilation time as a string literal (\"hh:mm:ss\")?",
    "options": [
      "`__DATE__`",
      "`__TIME__`",
      "`__CLOCK__`",
      "`__NOW__`"
    ],
    "answerIndex": 1,
    "explanation": "`__TIME__` contains the compilation time in \"hh:mm:ss\" format."
  },
  {
    "question": "Which predefined identifier (introduced in C99) contains the current function name as a string?",
    "options": [
      "`__func__`",
      "`__FUNCTION__`",
      "`__METHOD__`",
      "`__PROC__`"
    ],
    "answerIndex": 0,
    "explanation": "C99 introduced `__func__` as a predefined function-local static character array holding the enclosing function name."
  },
  {
    "question": "What does `#undef MACRO_NAME` do?",
    "options": [
      "Deletes the variable associated with the macro",
      "Removes the current macro definition so it is no longer recognized by the preprocessor",
      "Sets the macro to NULL",
      "Encrypts the macro"
    ],
    "answerIndex": 1,
    "explanation": "`#undef` removes a previously defined macro name, allowing it to be redefined or left undefined."
  },
  {
    "question": "What does `#error \"message\"` directive do?",
    "options": [
      "Logs a warning and continues compiling",
      "Halts compilation immediately and prints the diagnostic error message to stderr",
      "Catches runtime exceptions",
      "Writes errors to disk log"
    ],
    "answerIndex": 1,
    "explanation": "`#error` stops the compilation pipeline immediately, useful for enforcing architecture or configuration prerequisites."
  },
  {
    "question": "What does `#warning \"message\"` do in GCC/Clang?",
    "options": [
      "Stops compilation with an error",
      "Emits a compiler warning with the specified text during preprocessing without halting the build",
      "Suppresses all warnings",
      "Deletes temporary files"
    ],
    "answerIndex": 1,
    "explanation": "`#warning` prints a compiler diagnostic warning message while permitting compilation to continue."
  },
  {
    "question": "What does `#line 100 \"custom.c\"` do?",
    "options": [
      "Limits the file to 100 lines",
      "Overrides the compiler's internal line counter to 100 and source filename to \"custom.c\" for subsequent compiler diagnostics and `__LINE__`/`__FILE__` macros",
      "Generates 100 lines of code",
      "Deletes line 100"
    ],
    "answerIndex": 1,
    "explanation": "`#line` resets the internal compiler line number and filename reporting mechanism (commonly used by Lex/Yacc parser generators)."
  },
  {
    "question": "What does the `defined()` preprocessor operator do when used inside `#if` or `#elif` directives?",
    "options": [
      "Checks if a variable has been initialized in RAM",
      "Returns 1 if the specified macro identifier is currently defined, 0 otherwise (`#if defined(DEBUG) && !defined(NDEBUG)`)",
      "Defines a new macro",
      "Returns the sizeof the macro"
    ],
    "answerIndex": 1,
    "explanation": "`defined(NAME)` evaluates to true if `NAME` has been defined via `#define`, enabling complex boolean logic in `#if` expressions."
  },
  {
    "question": "Can floating-point arithmetic (e.g. `#if 3.14 > 2.0`) be evaluated in preprocessor `#if` directives?",
    "options": [
      "Yes, all math is supported",
      "No, the C preprocessor only evaluates integer constant expressions (long / intmax_t)",
      "Yes, on 64-bit systems only",
      "Yes, with `-O3` flag"
    ],
    "answerIndex": 1,
    "explanation": "The C preprocessor does not support floating-point arithmetic; all conditional expressions must evaluate to integer constants."
  },
  {
    "question": "Can `sizeof` operator (e.g. `#if sizeof(int) == 4`) be used in preprocessor `#if` directives?",
    "options": [
      "Yes, anywhere in the code",
      "No, `sizeof` is evaluated during semantic compilation, which happens after preprocessing has already completed",
      "Yes, in C11 and C17",
      "Yes, if `<stdint.h>` is included"
    ],
    "answerIndex": 1,
    "explanation": "The preprocessor has no knowledge of types or memory layouts; `sizeof` is a compiler operator not recognized by the preprocessor."
  },
  {
    "question": "What is Variadic Macro syntax introduced in C99?",
    "options": [
      "`#define LOG(fmt, ...) printf(fmt, __VA_ARGS__)`",
      "`#define LOG(fmt, args...) printf(fmt, args)`",
      "`#define LOG(fmt, *) printf(fmt, *)`",
      "`#define LOG(fmt) printf(fmt)`"
    ],
    "answerIndex": 0,
    "explanation": "C99 standardized variadic macros using ellipsis `...` in the parameter list and `__VA_ARGS__` in the replacement list."
  },
  {
    "question": "What does the GCC extension `##__VA_ARGS__` accomplish in variadic macros?",
    "options": [
      "Converts arguments to string",
      "Swallows (deletes) the preceding comma `,` if `__VA_ARGS__` is empty, allowing zero extra arguments without syntax errors",
      "Forces arguments into registers",
      "Encrypts variadic parameters"
    ],
    "answerIndex": 1,
    "explanation": "In `LOG(fmt, ##__VA_ARGS__)`, the `##` before `__VA_ARGS__` removes the comma when called with only `LOG(\"hello\")`."
  },
  {
    "question": "What is X-Macros design pattern in C metaprogramming?",
    "options": [
      "A pattern that utilizes a list of macro calls expanded multiple times with different macro definitions to maintain synchronized enums, string arrays, and switch dispatch tables from a single source of truth",
      "A pattern for XML serialization",
      "An encryption algorithm",
      "A memory allocator"
    ],
    "answerIndex": 0,
    "explanation": "X-Macros generate parallel code constructs (enums, string conversion tables, parsers) from a central list table macro, eliminating maintenance duplication."
  },
  {
    "question": "What does `#pragma pack(push, 1)` do in GCC and MSVC?",
    "options": [
      "Compresses the compiled binary",
      "Sets struct member alignment to 1 byte (disabling structure padding bytes)",
      "Pushes data to the CPU stack",
      "Packs multiple functions into one page"
    ],
    "answerIndex": 1,
    "explanation": "`#pragma pack(1)` removes all structure padding between members, essential for binary protocol headers and file format parsers."
  },
  {
    "question": "What does `#pragma GCC diagnostic push / ignored / pop` allow developers to do?",
    "options": [
      "Temporarily suppress specific compiler warnings for isolated blocks of code and restore original warning settings afterwards",
      "Compile code faster",
      "Ignore syntax errors",
      "Profile code memory usage"
    ],
    "answerIndex": 0,
    "explanation": "Diagnostic pragmas allow fine-grained compiler warning suppression around legacy or intentionally unconventional code blocks."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #31: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #32: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #33: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #34: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #35: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #36: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #37: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #38: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #39: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #40: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #41: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #42: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #43: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #44: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #45: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #46: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #47: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #48: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #49: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #50: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #51: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #52: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #53: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #54: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #55: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #56: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #57: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #58: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #59: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #60: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #61: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #62: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #63: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #64: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #65: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #66: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #67: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #68: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #69: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #70: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #71: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #72: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #73: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #74: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #75: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #76: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #77: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #78: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #79: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #80: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #81: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #82: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #83: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #84: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #85: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #86: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #87: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #88: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #89: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #90: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #91: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #92: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #93: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #94: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #95: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #96: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #97: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #98: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #99: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #100: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #101: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #102: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #103: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #104: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #105: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #106: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #107: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #108: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #109: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #110: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #111: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #112: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #113: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #114: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #115: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #116: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #117: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #118: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #119: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #120: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #121: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #122: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #123: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #124: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #125: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #126: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #127: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #128: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #129: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #130: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #131: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #132: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #133: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #134: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #135: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #136: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #137: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #138: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #139: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #140: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #141: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #142: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #143: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #144: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #145: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #146: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #147: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #148: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #149: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #150: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #151: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #152: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #153: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #154: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #155: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #156: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #157: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #158: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #159: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #160: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #161: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #162: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #163: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #164: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #165: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #166: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #167: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #168: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #169: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #170: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #171: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #172: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #173: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #174: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #175: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #176: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #177: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #178: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #179: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #180: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #181: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #182: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #183: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #184: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #185: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #186: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #187: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #188: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #189: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #190: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #191: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #192: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #193: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #194: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #195: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #196: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #197: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #198: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #199: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  },
  {
    "question": "Preprocessor Metaprogramming Assessment Item #200: Why are inline functions generally preferred over complex function-like macros in modern C99/C11 programming?",
    "options": [
      "Inline functions provide strict compiler type checking, prevent side-effect argument duplication bugs, and can be cleanly debugged in GDB",
      "Inline functions bypass CPU register limitations",
      "Inline functions eliminate all stack allocations",
      "Inline functions compile to interpreted bytecode"
    ],
    "answerIndex": 0,
    "explanation": "Inline functions (`static inline`) combine the performance speed of macros with compiler type safety, scope rules, and single argument evaluation."
  }
];

export default questions;
export { questions, questions as topic7Questions };
