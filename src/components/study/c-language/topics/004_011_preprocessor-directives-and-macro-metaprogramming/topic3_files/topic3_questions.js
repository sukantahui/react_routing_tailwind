export const topic3Questions = [
  {
    question: "What is conditional compilation in C?",
    answer: "Conditional compilation allows instructing the preprocessor to include or exclude specific blocks of C source code based on preprocessor conditions (#ifdef, #ifndef, #if, #elif, #else, #endif) before the compiler compiles the code."
  },
  {
    question: "What is the difference between #ifdef MACRO and #if defined(MACRO)?",
    answer: "#ifdef MACRO only checks a single identifier. #if defined(MACRO) allows combining multiple conditions using logical operators, e.g. #if defined(DEBUG) && !defined(TESTING)."
  },
  {
    question: "What happens to code blocks excluded by a false #if or #ifdef condition?",
    answer: "The preprocessor completely strips out the excluded lines during Translation Phase 4. The compiler never sees them, so they produce zero machine code and consume zero binary bytes."
  },
  {
    question: "What does the defined() preprocessor operator return?",
    answer: "It returns 1 if the specified macro name has been defined (even if defined with no value or 0), and 0 if the macro has not been defined."
  },
  {
    question: "What is the purpose of the #error directive?",
    answer: "#error <message> halts the compilation process immediately and displays the specified error text in the compiler diagnostic console."
  },
  {
    question: "How do you detect Microsoft Windows vs Linux at compile time using preprocessor macros?",
    answer: "Windows defines _WIN32 (and _WIN64 for 64-bit). Linux environments define __linux__ or __gnu_linux__. Apple platforms define __APPLE__."
  },
  {
    question: "Can an expression inside #if perform arithmetic operations (e.g. #if VERSION >= 3)?",
    answer: "Yes, #if supports integer arithmetic (+, -, *, /, %), relational operators (<, <=, >, >=, ==, !=), logical operators (&&, ||, !), and bitwise operators."
  },
  {
    question: "Can floating-point numbers or sizeof() be used in #if expressions?",
    answer: "No. The preprocessor only understands integer constant expressions. Floating-point numbers, type casts, and sizeof() operators are forbidden in #if expressions because types are not resolved until compilation."
  },
  {
    question: "What happens if an undefined identifier is evaluated inside an #if expression (e.g. #if FOO > 1)?",
    answer: "In standard C, any identifier in an #if expression that is not a defined macro is automatically replaced with the integer value 0."
  },
  {
    question: "What is the function of the #undef directive?",
    answer: "#undef MACRO cancels any previous definition of MACRO. Subsequent #ifdef MACRO checks will evaluate to false."
  },
  {
    question: "What is the difference between #if 0 ... #endif and a block comment /* ... */?",
    answer: "#if 0 ... #endif can safely comment out large sections of code that already contain internal block comments /* ... */, which cannot otherwise be nested in standard C."
  },
  {
    question: "How do you create compile-time feature toggles with GCC?",
    answer: "Pass -DFEATURE_X=1 on the command line: 'gcc -DFEATURE_X=1 main.c'. The code can then check #if FEATURE_X."
  },
  {
    question: "What is the purpose of #elif?",
    answer: "#elif is a contraction of 'else if' for preprocessor conditional branches, avoiding deeply nested #else #if #endif structures."
  },
  {
    question: "Can #if conditions evaluate function calls like strlen()?",
    answer: "No. Preprocessor conditions execute at compile time before runtime memory or functions exist. Only integer constants and macro evaluations are permitted."
  },
  {
    question: "How does NDEBUG interact with the standard <assert.h> library?",
    answer: "If NDEBUG is defined (e.g., via 'gcc -DNDEBUG' in release builds), the assert() macro expands to ((void)0), removing all runtime assertion checks for maximum performance."
  },
  {
    question: "How do you check for C standard version compatibility (C99, C11, C17, C23)?",
    answer: "Inspect __STDC_VERSION__: #if __STDC_VERSION__ >= 201112L for C11, #if __STDC_VERSION__ >= 199901L for C99."
  },
  {
    question: "What is the danger of placing #define directives inside an #if block that is never taken?",
    answer: "The macros inside the untaken branch will never be defined, which is intentional for platform-specific configurations."
  },
  {
    question: "Can you define a macro with an empty value (e.g. #define DEBUG)?",
    answer: "Yes. In this case, #ifdef DEBUG and defined(DEBUG) are true (1), but the macro expands to empty text in C expressions."
  },
  {
    question: "What happens if an #endif directive is missing at the end of a file?",
    answer: "The compiler will issue a fatal error such as 'unterminated #if' and halt compilation."
  },
  {
    question: "How does conditional compilation help write code for microcontroller firmware?",
    answer: "Embedded firmware uses conditional compilation to select register addresses and clock configurations for specific MCU chip targets (e.g. STM32F4 vs ESP32) from a single shared codebase."
  },
  {
    question: "Can conditional compilation directives be generated by macros?",
    answer: "No. The preprocessor processes directives before expanding macros, so a macro cannot expand into a '#' directive like #ifdef."
  },
  {
    question: "What is the purpose of the #line directive?",
    answer: "#line <number> [\"filename\"] changes the compiler's internal line numbering and source file name for subsequent compiler error and warning messages (used by parser generators like Yacc/Bison)."
  },
  {
    question: "How do you detect 64-bit architecture at compile time?",
    answer: "Check #if defined(__x86_64__) || defined(_M_X64) || defined(__aarch64__)."
  },
  {
    question: "Why should you avoid overly convoluted nested #ifdef blocks ('#ifdef soup')?",
    answer: "Extensive nested conditional directives create spaghetti preprocessor logic that makes code difficult to read, maintain, and test across different permutations."
  },
  {
    question: "How can you verify which conditional branch was taken during compilation?",
    answer: "Use #pragma message(\"Compiling for Linux Target\") or run 'gcc -E' to inspect the active preprocessed code."
  }
];
