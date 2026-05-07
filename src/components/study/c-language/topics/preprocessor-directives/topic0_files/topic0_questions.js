const questions = [
  {
    question: "What is the primary role of the C preprocessor?",
    shortAnswer: "It transforms source code before actual compilation by handling directives like #include, #define, #ifdef, etc.",
    explanation: "The preprocessor performs textual substitution, file inclusion, and conditional compilation. It runs as a separate phase before the compiler sees the code.",
    hint: "Think of it as a text manipulator, not a syntax checker.",
    level: "basic",
    codeExample: "#define MAX 100\nint arr[MAX];"
  },
  {
    question: "Does the preprocessor understand C data types?",
    shortAnswer: "No, it only performs text manipulation and knows nothing about types, scopes, or syntax.",
    explanation: "The preprocessor works on a token level; it doesn't parse C syntax. That's why macros can cause type-unsafe substitutions.",
    hint: "Consider what happens when you #define SQUARE(x) x*x",
    level: "basic",
    codeExample: "#define AREA(l,b) l*b\n// AREA(2+3, 4) becomes 2+3*4 = 14, not 20"
  },
  {
    question: "How can you view the preprocessor output for a C file?",
    shortAnswer: "Use `gcc -E source.c -o output.i` or `clang -E source.c`.",
    explanation: "The -E flag stops compilation after preprocessing, showing the expanded code with all macros replaced and headers included.",
    hint: "Try this on a small file with #define and #include to see the difference.",
    level: "intermediate",
    codeExample: "gcc -E myprogram.c -o myprogram.i"
  },
  {
    question: "What is the difference between #include <file> and #include \"file\"?",
    shortAnswer: "<file> searches system directories first; \"file\" searches the current directory first, then system directories.",
    explanation: "Angle brackets are for standard library headers, quotes for user-defined headers. This affects the search path order.",
    hint: "Think about where your own header files are located relative to the compiler.",
    level: "basic",
    codeExample: "#include <stdio.h>   // system\n#include \"myutils.h\" // user"
  },
  {
    question: "Why is it recommended to wrap macro arguments in parentheses?",
    shortAnswer: "To avoid operator precedence issues when the argument is an expression.",
    explanation: "Without parentheses, expressions like `#define SQUARE(x) x*x` cause `SQUARE(1+2)` to expand to `1+2*1+2 = 5` instead of 9. Correct: `#define SQUARE(x) ((x)*(x))`",
    hint: "Operator precedence can break macros. Always add outer and inner parentheses.",
    level: "intermediate",
    codeExample: "#define BAD(x) x*x\n#define GOOD(x) ((x)*(x))"
  },
  {
    question: "What happens if you put a semicolon at the end of a #define?",
    shortAnswer: "The semicolon becomes part of the macro expansion, often causing syntax errors in the code.",
    explanation: "For example, `#define END ;` would replace `END` with a semicolon, leading to double semicolons or misplaced statements.",
    hint: "Macros are exact text replacements. Every character matters.",
    level: "beginner",
    codeExample: "#define MSG \"Hi\";   // semicolon included → printf(MSG) becomes printf(\"Hi\";);"
  },
  {
    question: "What are include guards and why are they needed?",
    shortAnswer: "They prevent a header file from being included multiple times in the same translation unit.",
    explanation: "Without guards, multiple inclusions cause redefinition errors. Guards use `#ifndef` / `#define` / `#endif` or `#pragma once`.",
    hint: "Imagine the same struct definition appearing twice – the compiler would complain.",
    level: "intermediate",
    codeExample: "#ifndef MYHEADER_H\n#define MYHEADER_H\n/* content */\n#endif"
  },
  {
    question: "Does the preprocessor perform any arithmetic?",
    shortAnswer: "Only constant folding for `#if` conditions; otherwise no runtime arithmetic.",
    explanation: "In `#if 5+2 == 7`, the preprocessor evaluates the constant expression. But macro expansions are purely textual.",
    hint: "The preprocessor can evaluate integer constant expressions for conditional compilation directives.",
    level: "intermediate",
    codeExample: "#if (3 * 4) > 10\n  #define VALUE 1\n#endif"
  },
  {
    question: "What is the `#` operator (stringizing) in macros?",
    shortAnswer: "It converts a macro argument into a string literal.",
    explanation: "Example: `#define STR(x) #x` turns `STR(hello)` into `\"hello\"`. Useful for debug prints.",
    hint: "The `#` operator must be used inside a macro definition.",
    level: "advanced",
    codeExample: "#define PRINT_VAR(var) printf(#var \" = %d\\n\", var)\nint age = 25; PRINT_VAR(age); // prints \"age = 25\""
  },
  {
    question: "What is the `##` operator (token pasting)?",
    shortAnswer: "It concatenates two tokens into a single new token.",
    explanation: "Example: `#define CAT(a,b) a##b` turns `CAT(var, 123)` into `var123`. Useful for generating identifiers.",
    hint: "Be careful: pasting must produce a valid token (e.g., variable name, number).",
    level: "advanced",
    codeExample: "#define MAKE_NAME(prefix, num) prefix##num\nint var1 = 5; printf(\"%d\", MAKE_NAME(var,1));"
  },
  {
    question: "How do you define a variadic macro for logging?",
    shortAnswer: "Use `__VA_ARGS__` in the macro body, and `...` in the parameter list.",
    explanation: "Example: `#define LOG(fmt, ...) printf(\"[LOG] \" fmt, __VA_ARGS__)`. Then `LOG(\"x=%d\", x);` works.",
    hint: "Variadic macros are especially useful for debug prints with variable arguments.",
    level: "advanced",
    codeExample: "#define DEBUG_PRINT(...) fprintf(stderr, __VA_ARGS__)"
  },
  {
    question: "What are the predefined macros `__FILE__`, `__LINE__`, and `__func__`?",
    shortAnswer: "They expand to the current file name, line number, and function name respectively.",
    explanation: "These are useful for logging and debugging to trace execution flow.",
    hint: "Try using them inside a custom assert macro.",
    level: "intermediate",
    codeExample: "printf(\"Error in %s at line %d\\n\", __FILE__, __LINE__);"
  },
  {
    question: "How can you conditionally compile code for different operating systems?",
    shortAnswer: "Use predefined macros like `_WIN32`, `__linux__`, `__APPLE__` inside `#ifdef` blocks.",
    explanation: "This allows platform-specific code to be included only when compiling for that OS.",
    hint: "Check your compiler documentation for available platform macros.",
    level: "intermediate",
    codeExample: "#ifdef _WIN32\n  #include <windows.h>\n#else\n  #include <unistd.h>\n#endif"
  },
  {
    question: "What does `#pragma once` do, and how is it different from include guards?",
    shortAnswer: "It ensures the header file is included only once, similar to traditional include guards but non-standard.",
    explanation: "`#pragma once` is supported by most modern compilers (GCC, Clang, MSVC) and is less error-prone, but not officially part of the C standard.",
    hint: "Some purists prefer standard include guards for portability, but `#pragma once` is widely accepted.",
    level: "intermediate",
    codeExample: "#pragma once   // at top of header file"
  },
  {
    question: "Can macros be recursive?",
    shortAnswer: "No, the preprocessor does not expand a macro recursively within its own expansion.",
    explanation: "Once a macro name is expanded, it is marked as 'disabled' for the duration of that expansion to prevent infinite recursion.",
    hint: "Even if you try, `#define RECURSE RECURSE`, `RECURSE` will expand only once (to itself).",
    level: "advanced",
    codeExample: "#define FOO (1 + FOO)\nint x = FOO; // Expands to (1 + FOO) – FOO not expanded again"
  },
  {
    question: "What is the `#error` directive used for?",
    shortAnswer: "It forces the preprocessor to stop compilation and output a user-defined error message.",
    explanation: "Useful for compile-time assertions or checking required macros, e.g., `#ifndef CONFIG_H\n#error \"config.h must be included first\"\n#endif`",
    hint: "Place it inside `#if` conditions to enforce build requirements.",
    level: "intermediate",
    codeExample: "#ifndef __cplusplus\n#error This file requires C++ compiler\n#endif"
  },
  {
    question: "How does the preprocessor handle comments?",
    shortAnswer: "It removes comments before processing macros and directives, replacing them with a single space.",
    explanation: "Comments are stripped in an early stage, so they cannot affect macro substitution (except for old-style /**/ comment trickery).",
    hint: "Macro definitions cannot contain unmatched comment delimiters because they'd be removed.",
    level: "basic",
    codeExample: "#define VALUE 5 /* comment */ // fine, but comment disappears"
  },
  {
    question: "What is the difference between `#ifdef` and `#if defined()`?",
    shortAnswer: "`#ifdef MACRO` is shorthand for `#if defined(MACRO)`. The latter allows complex logical expressions.",
    explanation: "`#if defined(MACRO1) && !defined(MACRO2)` is only possible with `defined()` operator.",
    hint: "Use `defined()` for multiple conditions; `#ifdef` is simpler for single checks.",
    level: "intermediate",
    codeExample: "#if defined(DEBUG) && (LEVEL > 2)\n  // debug code\n#endif"
  },
  {
    question: "Can the preprocessor include files recursively?",
    shortAnswer: "Yes, using `#include` inside a header file that itself includes others, but watch out for infinite loops (include guards prevent that).",
    explanation: "Recursive inclusion is common (e.g., `stdio.h` includes other headers). Guards stop repeated processing of the same file.",
    hint: "Without guards, circular includes can cause infinite recursion (compiler eventually hits limit).",
    level: "intermediate",
    codeExample: "// a.h\n#include \"b.h\"\n// b.h\n#include \"a.h\" // with guards, okay"
  },
  {
    question: "What is the purpose of the `#line` directive?",
    shortAnswer: "It changes the compiler's idea of the current line number and file name for error messages and `__LINE__`/`__FILE__`.",
    explanation: "Used by code generators to map generated code back to the original source.",
    hint: "You rarely need `#line` unless you're writing a transpiler or preprocessor tool.",
    level: "expert",
    codeExample: "#line 42 \"generated.c\"\n// Now __LINE__ starts at 42, __FILE__ is \"generated.c\""
  },
  {
    question: "Why might `#define` cause slower compilation compared to `const`?",
    shortAnswer: "Macros are expanded everywhere they appear, increasing the size of the preprocessed output and potentially slowing down compilation.",
    explanation: "Each macro usage results in code duplication; `const` variables are single entities. Also, macros can't be type-checked.",
    hint: "In C, `const` doesn't mean compile-time constant for array sizes; for that you still need `#define` or `enum` (in C99+).",
    level: "intermediate",
    codeExample: "const int max = 100; // single memory location\n#define MAX 100 // text replaced"
  },
  {
    question: "What is the X-macro technique?",
    shortAnswer: "A pattern using `#define` to define a list once and then reuse it for generating enums, arrays, and strings.",
    explanation: "Define a macro that expands to a list of items, then include that macro in different contexts to generate different structures.",
    hint: "X-macros keep enums and their string representations in sync automatically.",
    level: "expert",
    codeExample: "#define COLORS_X \\\n  X(RED) \\\n  X(GREEN)\n#define X(name) name,\nenum { COLORS_X };\n#undef X\n#define X(name) #name,\nconst char* color_str[] = { COLORS_X };"
  },
  {
    question: "How does the preprocessor treat whitespace?",
    shortAnswer: "Whitespace is generally ignored as a token separator, but macro definitions retain spaces within the replacement text.",
    explanation: "Extra spaces around macro parameters are stripped, but spaces inside the body are kept. Comments become spaces.",
    hint: "The preprocessor tokenizes based on whitespace, so `# define` is invalid (no space after #).",
    level: "basic",
    codeExample: "#define  HELLO  \"hi there\"   // multiple spaces ignored"
  },
  {
    question: "Can a macro definition span multiple lines?",
    shortAnswer: "Yes, by using a backslash (`\\`) at the end of each line except the last.",
    explanation: "This allows writing readable macro bodies, especially for complex expansions or string literals.",
    hint: "The backslash must be the last character on the line (no spaces after it).",
    level: "intermediate",
    codeExample: "#define LONG_MACRO \\\n  printf(\"Hello\"); \\\n  printf(\" World!\");"
  },
  {
    question: "What is the difference between `#define` and `typedef`?",
    shortAnswer: "`#define` performs textual substitution; `typedef` creates a type alias that the compiler understands.",
    explanation: "`#define` can create aliases for anything, but can cause unexpected behavior. `typedef` is type-safe and scoped.",
    hint: "For pointer types, `#define` behaves differently: `#define PTR int*` then `PTR a, b;` expands to `int* a, b;` (b is int, not pointer).",
    level: "intermediate",
    codeExample: "typedef int* IntPtr;\nIntPtr p1, p2; // both pointers"
  },
  {
    question: "Why do some macros use `do { ... } while(0)`?",
    shortAnswer: "To create a multi-statement macro that behaves like a single statement, allowing semicolon after it and working in `if`/`else` contexts.",
    explanation: "Without `do-while(0)`, a macro like `#define SWAP(a,b) int t=a; a=b; b=t;` would not work correctly in `if(x) SWAP(a,b); else ...` because only the first statement would be conditional.",
    hint: "This is a common safe macro idiom.",
    level: "advanced",
    codeExample: "#define LOG(msg) do { printf(\"%s\\n\", msg); fflush(stdout); } while(0)"
  },
  {
    question: "How can you undefine a macro?",
    shortAnswer: "Use `#undef MACRO_NAME`.",
    explanation: "This removes the macro definition, useful for avoiding name clashes or redefining macros with different meanings in different sections.",
    hint: "After `#undef`, you can define it again with `#define`.",
    level: "intermediate",
    codeExample: "#define BUFFER_SIZE 256\n// ...\n#undef BUFFER_SIZE\n#define BUFFER_SIZE 512"
  },
  {
    question: "Does the preprocessor have any knowledge of C scopes (functions, blocks)?",
    shortAnswer: "No, it's purely lexical and works at the translation unit level. Macros ignore block scopes.",
    explanation: "Once defined, a macro is valid from its definition to the end of the file (or until `#undef`), regardless of function boundaries.",
    hint: "Macros are global, not local to functions. Use `const` or `enum` for scoped constants.",
    level: "intermediate",
    codeExample: "void foo() { #define LOCAL 5 } // LOCAL still defined outside foo"
  },
  {
    question: "What is the maximum recursion depth for `#include`?",
    shortAnswer: "Implementation-defined, but typically a few hundred levels before the compiler stops.",
    explanation: "Infinite recursion (circular includes without guards) will eventually cause an error like '#include nested too deeply'.",
    hint: "Include guards prevent deep recursion by stopping repeated inclusion.",
    level: "basic",
    codeExample: "// No guard → a.h includes b.h, b.h includes a.h → error after ~200 levels"
  },
  {
    question: "How can you use the preprocessor to generate a compile-time unique identifier?",
    shortAnswer: "Concatenate `__LINE__` or `__COUNTER__` (non-standard but common) with another token using `##`.",
    explanation: "Example: `#define UNIQ_NAME(base) base##__LINE__` creates names like `var123`. This avoids name clashes in macros.",
    hint: "`__COUNTER__` is supported by GCC, Clang, MSVC; it increments each time it's used.",
    level: "expert",
    codeExample: "#define CONCAT(a,b) a##b\n#define UNIQ(base) CONCAT(base, __LINE__)\nint UNIQ(temp) = 42; // creates int temp123 = 42;"
  },
  {
    question: "What happens if you redefine an existing macro without undefining it first?",
    shortAnswer: "The behavior is undefined unless the new definition is exactly the same as the old one (token‑for‑token).",
    explanation: "Most compilers issue a warning and ignore the new definition or treat it as a redefinition error. Standard says it's undefined behavior.",
    hint: "Always `#undef` a macro before redefining it with a different value to avoid portability issues.",
    level: "intermediate",
    codeExample: "#define VALUE 10\n#define VALUE 20 // may cause warning/error"
  }
];

export default questions;