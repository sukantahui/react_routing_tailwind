export const topic2Questions = [
  {
    question: "What does the stringizing operator '#' do in C preprocessor macros?",
    answer: "The stringizing operator '#' converts a macro parameter into a quoted string literal (e.g. #x with argument 123 becomes \"123\") during translation Phase 4."
  },
  {
    question: "What does the token concatenation operator '##' (token pasting) do?",
    answer: "The token concatenation operator '##' merges two adjacent lexical tokens into a single new C token (identifier, keyword, or number) during macro expansion."
  },
  {
    question: "Why does #define STR(x) #x fail to stringize the value of a macro constant like #define VER 2?",
    answer: "Because operands of '#' and '##' are NOT macro-expanded before stringizing. STR(VER) directly produces \"VER\" rather than \"2\". To expand the macro first, a two-level macro helper is required."
  },
  {
    question: "How does the two-level macro expansion pattern solve the stringizing issue for macro constants?",
    answer: "#define STR_HELPER(x) #x\n#define STR(x) STR_HELPER(x)\nWhen STR(VER) is called, VER is expanded to 2 during the argument prescan of STR, and then passed to STR_HELPER(2) which stringizes it to \"2\"."
  },
  {
    question: "How does the stringizing operator handle internal whitespace and quotes?",
    answer: "Leading and trailing whitespace in the argument is discarded. Sequences of multiple whitespace characters are compressed to a single space. Double quotes and backslashes within the argument are automatically escaped with a backslash."
  },
  {
    question: "Can you use the '#' stringizing operator on non-macro parameter identifiers?",
    answer: "No. The '#' operator can ONLY be placed immediately before a formal macro parameter name declared in the macro's argument list."
  },
  {
    question: "What happens if token concatenation (##) produces an invalid C token (e.g. 12 ## abc)?",
    answer: "If the concatenated result is not a valid C token according to the lexical grammar, the behavior is undefined and modern compilers emit a compilation error."
  },
  {
    question: "How can token concatenation (##) be used to generate type-generic data structures in C?",
    answer: "By defining templates: #define DECLARE_LIST(type) typedef struct List_##type { type data; struct List_##type *next; } List_##type; This creates List_int, List_float, etc."
  },
  {
    question: "Can ## concatenate multiple tokens in sequence (e.g. a ## b ## c)?",
    answer: "Yes, multiple ## operators can be chained to join three or more tokens into a single composite identifier."
  },
  {
    question: "What is the purpose of string literal concatenation in translation Phase 6?",
    answer: "Adjacent string literals like \"Hello \" \"World\" are merged into a single literal \"Hello World\" automatically by the compiler. Stringized macros take advantage of this."
  },
  {
    question: "How do you build a custom variable inspection macro like DEBUG_VAR(x)?",
    answer: "#define DEBUG_VAR(x) printf(\"[DEBUG] %s = %d\\n\", #x, (x)); This prints the variable's source code name alongside its runtime integer value."
  },
  {
    question: "Can token concatenation create numerical literals (e.g. 1e ## 5)?",
    answer: "Yes, 1e ## 5 concatenates into the floating-point literal 1e5 (100000.0)."
  },
  {
    question: "What happens if one of the operands of ## is empty?",
    answer: "Concatenating an empty token with an existing token leaves the existing token unchanged (useful in variadic macro edge cases)."
  },
  {
    question: "What is the order of evaluation between #, ##, and normal macro expansion?",
    answer: "1. Argument prescan expands normal macro arguments (unless preceded by # or ##).\n2. '#' stringizes the raw argument.\n3. '##' concatenates tokens.\n4. The resulting replacement list is rescanned for further macro expansion."
  },
  {
    question: "How does the Linux kernel use token pasting for system call definitions (SYSCALL_DEFINE)?",
    answer: "The Linux kernel uses SYSCALL_DEFINE2(name, type1, arg1, ...) with ## to generate standardized function signatures sys_##name, metadata structs, and tracing hooks."
  },
  {
    question: "Can the '#' operator convert a complete code expression (e.g. a + b * c) into a string?",
    answer: "Yes, PRINT_EXPR(a + b * c) stringizes the whole expression into \"a + b * c\"."
  },
  {
    question: "What is the difference between char str[] = #param; and char str[] = param;?",
    answer: "char str[] = #param; assigns the literal name of the parameter as a string. char str[] = param; expects param to be a string variable or array in C."
  },
  {
    question: "Why should you avoid excessive macro token pasting in public API interfaces?",
    answer: "Heavily concatenated identifiers cannot be found by text search tools (grep/IDE search) in the source codebase, making API navigation harder for team members."
  },
  {
    question: "How do you build an enum-to-string mapping table using X-Macros with stringizing?",
    answer: "Define an X-list of identifiers: #define COLOR_TABLE(X) X(RED) X(GREEN) X(BLUE). Expand with X(name) #name to generate string representations, and X(name) name to generate the enum values."
  },
  {
    question: "What is an X-Macro in advanced C metaprogramming?",
    answer: "An X-Macro is a macro pattern where a central list of data items is repeatedly expanded by redefining the 'X' macro before each inclusion, generating enums, strings, and switch cases with zero duplication."
  },
  {
    question: "Can token concatenation create a keyword like 'auto' from 'au' ## 'to'?",
    answer: "Yes, the preprocessor will concatenate 'au' and 'to' into the token 'auto', which the compiler then recognizes as the C keyword."
  },
  {
    question: "What happens if you place '#' or '##' at the very beginning or end of a macro replacement list?",
    answer: "Placing '#' without an argument or '##' at the start/end of a replacement list is a syntax error in standard C."
  },
  {
    question: "How does stringizing help in creating custom assertion frameworks?",
    answer: "#define MY_ASSERT(cond) if (!(cond)) { fprintf(stderr, \"Assertion failed: %s at %s:%d\\n\", #cond, __FILE__, __LINE__); abort(); }"
  },
  {
    question: "Is stringizing performed at runtime or compile-time?",
    answer: "Stringizing is performed entirely at compile-time during preprocessor translation Phase 4. It incurs zero runtime CPU overhead."
  },
  {
    question: "What compiler warning flags detect issues with macro token pasting?",
    answer: "-Wpasting in GCC flags instances where token pasting produces invalid tokens."
  }
];
