export const topic1Questions = [
  {
    question: "Why is passing arguments with side effects (like i++ or getchar()) to macros dangerous?",
    answer: "Because macro parameters are substituted literally. If a parameter appears multiple times in the replacement list (e.g. #define MAX(a,b) ((a)>(b)?(a):(b))), the expression 'a++' will be evaluated twice, incrementing the variable two times instead of once."
  },
  {
    question: "Why is 'do { ... } while(0)' the industry-standard idiom for multi-statement macros in C?",
    answer: "It allows a multi-statement block to behave syntactically as a single statement that accepts a trailing semicolon without breaking 'if (cond) MACRO(); else ...' control flow branches."
  },
  {
    question: "What happens if a multi-statement macro is wrapped in regular curly braces '{ ... }' inside an if-else statement without braces?",
    answer: "In 'if (condition) MACRO(); else ...', the trailing semicolon after '{ ... };' is treated as a separate empty statement, causing the 'else' clause to be orphaned and triggering a syntax compilation error."
  },
  {
    question: "What are the key differences between a function-like macro and a C99 static inline function?",
    answer: "An inline function enforces strict compiler type checking, evaluates arguments strictly once (side-effect safe), and obeys C variable scope rules, while generating zero-overhead inlined machine code just like macros."
  },
  {
    question: "How can variable shadowing cause bugs inside macro blocks?",
    answer: "If a macro creates a temporary local variable with a common name (like 'temp' or 'i'), and the caller passes an expression using a variable also named 'temp', the inner macro variable will shadow the caller's variable, producing corrupted calculations."
  },
  {
    question: "How do professional macro authors prevent local variable shadowing bugs in macros?",
    answer: "They use distinct naming conventions for internal macro temporary variables (e.g. trailing underscores like temp_a_ or unique prefixes), or GCC statement expressions ({ typeof(a) _a = (a); ...; _a; })."
  },
  {
    question: "What is a Statement Expression in GCC/Clang, and how does it make macros safe?",
    answer: "A GCC extension ({ statement; result; }) that allows returning a value from a compound statement block. This allows evaluating arguments once into local temporary variables: #define MAX(a,b) ({ __typeof__(a) _a = (a); __typeof__(b) _b = (b); _a > _b ? _a : _b; })."
  },
  {
    question: "Why should you never write a return statement inside a macro?",
    answer: "Hiding a 'return' statement inside a macro makes control flow invisible at the call site, creating dangerous hidden exit points that make debugging memory leaks and lock releases extremely difficult."
  },
  {
    question: "What happens if you define a macro with parameters and call it with too few or too many arguments?",
    answer: "The preprocessor halts with a compile-time error: 'macro requires N arguments, but only M were provided'."
  },
  {
    question: "Can macro parameters have default values in standard C?",
    answer: "No. Standard C macros do not support default argument values. Every parameter declared in the definition must be passed at the call site (unless variadic macros are used)."
  },
  {
    question: "What are Variadic Macros in C99?",
    answer: "Macros that accept a variable number of arguments using an ellipsis '...'. The variable arguments are expanded in the replacement list using the predefined identifier __VA_ARGS__."
  },
  {
    question: "What is the purpose of the GNU extension '##__VA_ARGS__' in variadic macros?",
    answer: "If zero variable arguments are passed to a macro (e.g. LOG(\"Done\")), the comma before ##__VA_ARGS__ is automatically deleted, preventing a syntax error from a trailing dangling comma."
  },
  {
    question: "Why is #define TRUE 1 / #define FALSE 0 outdated in modern C?",
    answer: "Since C99, <stdbool.h> provides the native 'bool', 'true', and 'false' keywords with proper boolean semantics."
  },
  {
    question: "Can you pass commas inside function calls within macro arguments?",
    answer: "Yes, commas inside nested parentheses (like FOO(func(a, b), c)) are protected by the inner parentheses and not treated as macro argument separators."
  },
  {
    question: "Why can't you step into a preprocessor macro with a debugger like GDB?",
    answer: "Because macros are expanded into inline source code during Phase 1 before symbols and line numbers are generated. The debugger only sees the expanded line of code, not a distinct stack frame."
  },
  {
    question: "What is the danger of defining a macro that changes the value of a global variable silently?",
    answer: "Hidden side effects violate the principle of least astonishment, making code unpredictable and difficult to maintain."
  },
  {
    question: "How do you define a macro that does nothing (a no-op) cleanly?",
    answer: "Use: #define NOOP() do { } while (0) or #define NOOP() ((void)0) to ensure it accepts a semicolon safely."
  },
  {
    question: "Why should you avoid using macros to shorten common C keywords (e.g. #define U unsigned)?",
    answer: "Non-standard keyword abbreviations ruin code readability, break IDE auto-completion, and make code unmaintainable for other engineers."
  },
  {
    question: "Can a macro expand into an open comment block '/* ...'?",
    answer: "No. Comments are stripped in Translation Phase 3 before macro expansion in Phase 4. Text emitted by a macro that looks like '/*' is not treated as a comment."
  },
  {
    question: "What is the replacement for complex function-like macros in modern C development?",
    answer: "Static inline functions in header files are universally preferred because they offer type safety, compiler optimization, debuggability, and side-effect immunity."
  },
  {
    question: "When are function-like macros still necessary over inline functions?",
    answer: "When capturing caller metadata (__FILE__, __LINE__, __func__), generating dynamic identifiers via token pasting (##), or building generic multi-type code before C11 _Generic."
  },
  {
    question: "How does C11 _Generic keyword reduce reliance on messy macros?",
    answer: "The _Generic keyword allows compile-time type-based function dispatch in a single clean macro without requiring runtime type inspection or unsafe void* casting."
  },
  {
    question: "What happens if a macro expands to an infinite loop 'while(1);'?",
    answer: "The compiler generates an infinite loop in the binary, which will cause the CPU thread to spin at 100% utilization until terminated."
  },
  {
    question: "Why should you always test function-like macros with complex expressions like (x + 5 * y)?",
    answer: "To ensure that missing parentheses inside the macro replacement list do not cause operator precedence corruption."
  },
  {
    question: "What compiler flag enables warnings for macro redefinitions in GCC?",
    answer: "-Wredundant-decls and -Wextra flag conflicting or shadowed macro definitions."
  }
];
