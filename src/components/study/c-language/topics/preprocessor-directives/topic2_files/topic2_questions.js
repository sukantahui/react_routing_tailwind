const questions = [
  {
    question: "What is a function-like macro in C?",
    shortAnswer: "A macro defined with parameters that looks like a function call but is expanded textually by the preprocessor.",
    explanation: "Example: #define SQUARE(x) ((x)*(x)). The preprocessor replaces SQUARE(5) with ((5)*(5)).",
    hint: "It's not a real function – no call stack, no type checking.",
    level: "basic",
    codeExample: "#define MAX(a,b) ((a)>(b)?(a):(b))"
  },
  {
    question: "Why does SQUARE(1+2) with #define SQUARE(x) x*x give 5 instead of 9?",
    shortAnswer: "Because macros are textual: 1+2*1+2 = 1+2+2 = 5 due to operator precedence.",
    explanation: "The preprocessor does not evaluate expressions; it just replaces text. Without parentheses, multiplication has higher precedence.",
    hint: "Always wrap macro arguments and whole body in parentheses.",
    level: "basic",
    codeExample: "#define BAD(x) x*x\nBAD(1+2) // expands to 1+2*1+2"
  },
  {
    question: "What is double evaluation in macros, and why is it dangerous?",
    shortAnswer: "When a macro evaluates its argument more than once, and the argument has side effects (e.g., i++), it leads to undefined behavior.",
    explanation: "Example: #define MAX(a,b) ((a)>(b)?(a):(b)). Then MAX(i++, j++) increments i and j twice.",
    hint: "Avoid macros that use arguments more than once if those arguments have side effects.",
    level: "intermediate",
    codeExample: "#define DOUBLE(x) ((x)+(x))\nDOUBLE(i++) // i incremented twice"
  },
  {
    question: "How do you write a multi-statement macro safely?",
    shortAnswer: "Wrap the statements in do { ... } while(0).",
    explanation: "This allows the macro to be used as a single statement, with a semicolon after it, and works correctly in if-else blocks.",
    hint: "do-while(0) ensures the macro expands to a single statement that can be terminated with a semicolon.",
    level: "intermediate",
    codeExample: "#define LOG(msg) do { printf(\"%s\\n\", msg); fflush(stdout); } while(0)"
  },
  {
    question: "Can function-like macros have variable numbers of arguments?",
    shortAnswer: "Yes, using ... and __VA_ARGS__ (C99).",
    explanation: "Example: #define DEBUG(fmt, ...) printf(fmt, __VA_ARGS__). You can also use ##__VA_ARGS__ to handle empty arguments.",
    hint: "Variadic macros are great for logging wrappers.",
    level: "advanced",
    codeExample: "#define PRINT(...) printf(__VA_ARGS__)"
  },
  {
    question: "What is the difference between a macro and a function?",
    shortAnswer: "Macros are text substitution by preprocessor, no type checking, no call overhead, but can cause side effects. Functions are compiled, type-safe, have call overhead (except inline).",
    explanation: "Use macros for simple, performance-critical operations where side effects are not an issue; use functions (or inline functions) for complex logic.",
    hint: "Inline functions (C99) are often a better choice than macros.",
    level: "intermediate",
    codeExample: "macro: #define ABS(x) ((x)<0?-(x):(x))\nfunction: inline int abs(int x) { return x<0 ? -x : x; }"
  },
  {
    question: "Can you use return statements inside function-like macros?",
    shortAnswer: "Yes, but it will cause the enclosing function to return, which is often unexpected.",
    explanation: "Example: #define CHECK(x) if ((x) < 0) return -1; Using this macro inside a function will return from that function.",
    hint: "Avoid return in macros; use expressions instead.",
    level: "advanced",
    codeExample: "#define EARLY_RETURN(x) if (x) return x; // dangerous"
  },
  {
    question: "What happens if you pass a macro argument that contains a comma?",
    shortAnswer: "The preprocessor will interpret the comma as an argument separator, causing too many arguments error.",
    explanation: "To pass a comma, you can use parentheses: #define CALL(fn, arg) fn(arg). Then CALL(printf, (\"%d\", 5)) works because (\"%d\", 5) is a single argument.",
    hint: "Wrap the argument in parentheses if it contains a comma.",
    level: "expert",
    codeExample: "#define FOO(a) a\nFOO((1,2)) // passes one argument: (1,2)"
  },
  {
    question: "How does the # operator (stringizing) work in function-like macros?",
    shortAnswer: "# converts a macro argument into a string literal.",
    explanation: "#define STR(x) #x makes STR(hello) become \"hello\". Useful for debug prints.",
    hint: "The argument is taken literally, not expanded (unless you use double indirection).",
    level: "advanced",
    codeExample: "#define PRINT_VAR(var) printf(#var \" = %d\\n\", var)\nint age=25; PRINT_VAR(age); // prints \"age = 25\""
  },
  {
    question: "What is the ## operator (token pasting) in function-like macros?",
    shortAnswer: "## concatenates two tokens into a single token.",
    explanation: "#define CAT(a,b) a##b creates CAT(var, 1) → var1. Used to generate identifiers dynamically.",
    hint: "Be careful: the resulting token must be valid (e.g., variable name).",
    level: "expert",
    codeExample: "#define MAKE_NAME(prefix, num) prefix##num\nint value1 = 42; printf(\"%d\", MAKE_NAME(value,1));"
  },
  {
    question: "Why can't you take the address of a macro?",
    shortAnswer: "Because macros are not functions; they don't exist after preprocessing.",
    explanation: "The preprocessor removes macro names, so there's no symbol in the compiled code to take address of.",
    hint: "If you need a pointer to a function, use a real function.",
    level: "basic",
    codeExample: "int (*fp)(int) = &SQUARE; // error if SQUARE is macro"
  },
  {
    question: "Can a function-like macro be recursive?",
    shortAnswer: "No, the preprocessor does not expand a macro recursively within its own expansion.",
    explanation: "Once a macro name is seen during expansion, it is marked as 'disabled' for that expansion to prevent infinite loops.",
    hint: "Even if you try #define RECURSE RECURSE, it expands only once.",
    level: "advanced",
    codeExample: "#define FOO FOO\nint x = FOO; // expands to FOO, not infinite"
  },
  {
    question: "What is the purpose of wrapping a macro in do { ... } while(0)?",
    shortAnswer: "To make it a single statement that can be safely used in if-else and can have a semicolon after it.",
    explanation: "Without do-while, a multi-statement macro like #define SWAP(a,b) int t=a; a=b; b=t; would cause only the first statement to be conditional in an if.",
    hint: "do-while(0) is a standard idiom for safe multi-statement macros.",
    level: "intermediate",
    codeExample: "#define LOG(msg) do { fprintf(stderr, \"%s\\n\", msg); } while(0)"
  },
  {
    question: "How can you avoid double evaluation in macros?",
    shortAnswer: "Use a temporary variable (but that introduces its own problems) or better, use an inline function.",
    explanation: "In GNU C, you can use typeof to create a temporary, but for portability, inline functions are the safest.",
    hint: "For C99+, use static inline functions instead of complex macros.",
    level: "advanced",
    codeExample: "#define MAX(a,b) ({ __typeof__(a) _a = (a); __typeof__(b) _b = (b); _a > _b ? _a : _b; }) // GCC extension"
  },
  {
    question: "What is the difference between #define SQUARE(x) (x*x) and #define SQUARE(x) ((x)*(x))?",
    shortAnswer: "The second is safer because it ensures each argument is evaluated as a whole and the product is correctly parenthesized.",
    explanation: "First: SQUARE(1+2) → (1+2*1+2) = 5; Second: SQUARE(1+2) → ((1+2)*(1+2)) = 9.",
    hint: "Always use extra parentheses around each parameter and the whole expression.",
    level: "basic",
    codeExample: "Correct: #define SQUARE(x) ((x)*(x))"
  },
  {
    question: "Can a function-like macro have no parameters?",
    shortAnswer: "Yes, e.g., #define HELLO() printf(\"Hello\\n\"). Then HELLO() expands.",
    explanation: "Even with no parameters, you must use parentheses when calling: HELLO().",
    hint: "Without parentheses, it's just an object-like macro.",
    level: "basic",
    codeExample: "#define NOW() time(NULL)\nt = NOW();"
  },
  {
    question: "What does __VA_ARGS__ do in a macro?",
    shortAnswer: "It represents the variable arguments passed to a variadic macro.",
    explanation: "#define LOG(fmt, ...) printf(fmt, __VA_ARGS__). Then LOG(\"%d %s\", 5, \"hi\") works.",
    hint: "Use ##__VA_ARGS__ to allow the macro to be called with no variable arguments (GCC extension).",
    level: "advanced",
    codeExample: "#define DEBUG(...) fprintf(stderr, __VA_ARGS__)"
  },
  {
    question: "Can function-like macros be defined inside functions?",
    shortAnswer: "Yes, but they are not scoped to the function; they remain defined until #undef or end of file.",
    explanation: "Macros ignore block scope; defining a macro inside a function affects the rest of the file.",
    hint: "Avoid defining macros inside functions unless you immediately #undef them.",
    level: "intermediate",
    codeExample: "void f() { #define LOCAL 5 } void g() { int x = LOCAL; } // LOCAL still defined"
  },
  {
    question: "Why is it bad to put a semicolon inside a macro body?",
    shortAnswer: "Because the semicolon becomes part of the macro expansion, leading to double semicolons or broken control flow.",
    explanation: "#define PRINT(x) printf(\"%d\", x); causes PRINT(5); to expand to printf(\"%d\", 5);; which is legal but can break if-else.",
    hint: "Let the caller add the semicolon; don't embed it in the macro.",
    level: "basic",
    codeExample: "#define BAD(x) x++; // don't\ngood: #define GOOD(x) (x++)"
  },
  {
    question: "How do you debug macro expansions?",
    shortAnswer: "Use gcc -E source.c -o output.i to see preprocessed output, or use compiler options like -save-temps.",
    explanation: "The .i file shows the code after macro expansion, allowing you to see what the compiler actually sees.",
    hint: "Also, some IDEs have macro expansion viewers.",
    level: "intermediate",
    codeExample: "gcc -E myfile.c -o myfile.i"
  },
  {
    question: "What is the 'defined' operator in preprocessor conditions?",
    shortAnswer: "It checks whether a macro is defined, and can be used with &&, || in #if.",
    explanation: "#if defined(DEBUG) && (LEVEL > 2). Unlike #ifdef, it allows complex expressions.",
    hint: "Use 'defined' when you need to combine checks.",
    level: "intermediate",
    codeExample: "#if defined(__linux__) || defined(__unix__)"
  },
  {
    question: "Can a macro redefine an existing keyword?",
    shortAnswer: "Yes, the preprocessor can redefine any token, including keywords, leading to disastrous results.",
    explanation: "#define int float – all 'int' become 'float'. This is legal but insane.",
    hint: "Never redefine C keywords.",
    level: "advanced",
    codeExample: "#define if while // extremely bad"
  },
  {
    question: "What is the advantage of using an inline function over a macro?",
    shortAnswer: "Inline functions have type checking, evaluate arguments once, respect scope, and don't cause side effects. Macros are purely textual.",
    explanation: "Inline functions are preferred in modern C for any non-trivial operation.",
    hint: "C99 inline functions are standard; use -std=c99 or later.",
    level: "intermediate",
    codeExample: "static inline int max(int a, int b) { return a > b ? a : b; }"
  },
  {
    question: "How do you create a macro that can be used as an lvalue?",
    shortAnswer: "By making the macro expand to an expression that yields an lvalue, usually a dereferenced pointer or a struct member access.",
    explanation: "#define ELEM(ptr, idx) ((ptr)[idx]) can be used on left side: ELEM(arr, 0) = 5;",
    hint: "The macro body must be an lvalue expression.",
    level: "expert",
    codeExample: "#define GET_MAX(arr) ((arr)[0] > (arr)[1] ? (arr)[0] : (arr)[1]) // not lvalue"
  },
  {
    question: "What is the #elif directive and how is it used with function-like macros?",
    shortAnswer: "#elif is used in conditional compilation chains; it works with macros but is not specific to function-like macros.",
    explanation: "Example: #ifdef FEATURE1 ... #elif defined(FEATURE2) ... #endif",
    hint: "Used for platform-specific macro definitions.",
    level: "basic",
    codeExample: "#if defined(WIN32)\n#define PATH_SEP '\\\\'\n#elif defined(UNIX)\n#define PATH_SEP '/'\n#endif"
  },
  {
    question: "Can a macro have empty arguments?",
    shortAnswer: "Yes, C99 allows empty macro arguments (e.g., MACRO(,b) where first argument is empty).",
    explanation: "The preprocessor treats an empty argument as a placeholder token. Not all compilers support it in older standards.",
    hint: "Check compiler support; use variadic macros if possible.",
    level: "expert",
    codeExample: "#define FOO(a,b) a##b\nFOO(,5) // expands to 5 (a empty)"
  },
  {
    question: "What is token pasting used for in real projects?",
    shortAnswer: "Generating unique variable names, creating enum-to-string mappings (X-macros), and building dispatch tables.",
    explanation: "Example: #define REGISTER(name) void name##_handler(void). Then REGISTER(read) expands to void read_handler(void).",
    hint: "Common in driver code and code generators.",
    level: "expert",
    codeExample: "#define GENERIC_FUNC(type) type##_##func\nint int_func(); GENERIC_FUNC(int)();"
  },
  {
    question: "Why might a macro cause slower compilation than a function?",
    shortAnswer: "Macros are expanded everywhere, increasing the size of the preprocessed output and possibly the compile time.",
    explanation: "Each macro use copies the body text, which can lead to code bloat and slower parsing. Functions are compiled once.",
    hint: "Macros don't have call overhead but may increase binary size.",
    level: "intermediate",
    codeExample: "Using a macro for a large block of code will duplicate it everywhere."
  },
  {
    question: "How does the preprocessor treat whitespace in macro arguments?",
    shortAnswer: "Whitespace is ignored; arguments are tokenized, not character strings.",
    explanation: "Spaces around arguments are stripped. For stringizing, whitespace in the argument is preserved but collapsed.",
    hint: "Don't rely on whitespace for macro logic.",
    level: "intermediate",
    codeExample: "#define STR(x) #x\nSTR(  hello world  ) → \"hello world\""
  },
  {
    question: "What is the difference between #define FOO 5 and #define FOO() 5?",
    shortAnswer: "The first is an object-like macro; the second is a function-like macro with no parameters requiring parentheses when used.",
    explanation: "FOO expands to 5; FOO() expands to 5 but must be called with parentheses.",
    hint: "Accidentally omitting parentheses can cause different behavior.",
    level: "basic",
    codeExample: "#define BAR 5\n#define BAZ() 5\nint x = BAR; // OK\nint y = BAZ; // error, BAZ not defined"
  },
  {
    question: "Is it possible to have a macro that returns a value like a function?",
    shortAnswer: "Yes, if the macro body is an expression, it yields a value. But it's still textual substitution, not a return.",
    explanation: "The macro's expansion is placed in the code; if it's an expression, its value is used.",
    hint: "You cannot 'return' early from a macro.",
    level: "basic",
    codeExample: "#define MIN(x,y) ((x) < (y) ? (x) : (y))\nint m = MIN(3,4); // m = 3"
  }
];

export default questions;