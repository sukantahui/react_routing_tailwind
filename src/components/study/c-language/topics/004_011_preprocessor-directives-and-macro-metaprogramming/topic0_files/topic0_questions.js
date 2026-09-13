export const topic0Questions = [
  {
    question: "What is the C preprocessor and at what stage does it execute in the compilation pipeline?",
    answer: "The C preprocessor is a macro processing tool that runs as Phase 1 of compilation before actual code translation. It performs lexical text transformations: expanding macros, stripping comments, inserting header files, and selecting conditional code blocks."
  },
  {
    question: "How do you instruct GCC or Clang to output only the preprocessed source code without compiling?",
    answer: "Use the -E compiler flag: 'gcc -E source.c -o source.i'. The resulting .i file contains all headers expanded in place, all comments removed, and all macros replaced with their substitution text."
  },
  {
    question: "Does the C preprocessor perform type checking or syntax validation on C language code?",
    answer: "No. The preprocessor is completely oblivious to C syntax, types, scopes, and variable lifetimes. It operates solely on lexical tokens and textual substitution."
  },
  {
    question: "What character begins every preprocessor directive?",
    answer: "Every preprocessor directive begins with the hash/pound symbol '#' as the first non-whitespace character on the line."
  },
  {
    question: "Why should you NOT place a semicolon ';' at the end of a #define macro line?",
    answer: "The preprocessor copies everything after the macro identifier literally. Adding a semicolon inserts that semicolon directly into every expression where the macro appears, causing syntax errors in if/while statements."
  },
  {
    question: "What are the 8 standardized translation phases defined by ISO C?",
    answer: "1. Trigraph mapping & multibyte mapping\n2. Line splicing (backslash-newline removal)\n3. Tokenization & comment replacement with space\n4. Preprocessor directive execution & macro expansion\n5. Character set conversion\n6. String literal concatenation\n7. Compilation into assembly / semantic analysis\n8. Linking into executable."
  },
  {
    question: "How does backslash line continuation work in preprocessor macros?",
    answer: "A backslash '\\' at the very end of a line (immediately preceding the newline) tells Phase 2 to splice the next line with the current line, allowing multi-line macro definitions."
  },
  {
    question: "What happens to comments (/* ... */ and // ...) during preprocessing?",
    answer: "Phase 3 replaces each comment with a single ASCII space character (' ') before macro expansion occurs."
  },
  {
    question: "What is the difference between #include <filename.h> and #include \"filename.h\"?",
    answer: "<filename.h> searches system/standard library include directories first. \"filename.h\" searches the current local directory first before falling back to system paths."
  },
  {
    question: "Can macro names be overloaded with different parameter counts in standard C?",
    answer: "No. Standard C does not support macro overloading by arity. Defining a macro with the same name redefines it, producing a compiler warning unless undefined first with #undef."
  },
  {
    question: "What is the scope of a #define macro?",
    answer: "A macro has file scope starting from the line it is defined down to the end of the translation unit (.c file + included headers), or until an explicit #undef directive is encountered. It ignores function braces and block scopes."
  },
  {
    question: "What does the #undef directive do?",
    answer: "#undef MACRO_NAME undefines a previously defined macro identifier, allowing it to be redefined or treated as undefined by subsequent #ifdef directives."
  },
  {
    question: "Can the C preprocessor expand macros recursively in standard C?",
    answer: "No. The ISO C standard prohibits recursive macro self-expansion. If a macro's replacement list contains its own name, that name is not expanded further to prevent infinite loops."
  },
  {
    question: "What is a translation unit in C?",
    answer: "A translation unit is the single complete stream of preprocessed C code produced by expanding a .c file and all of its recursively included header files (.h)."
  },
  {
    question: "Why are macro names conventionally written in UPPERCASE?",
    answer: "To visually signal to developers that an identifier is a preprocessor text substitution (which lacks type safety and side-effect guarantees) rather than a regular C function or variable."
  },
  {
    question: "What is the difference between an Object-like macro and a Function-like macro?",
    answer: "Object-like macros (#define PI 3.14159) have no parameter list and substitute simple text. Function-like macros (#define MAX(a,b) ((a)>(b)?(a):(b))) accept arguments inside parentheses."
  },
  {
    question: "What happens if there is whitespace between the macro name and opening parenthesis in a function-like macro definition?",
    answer: "If there is space (e.g. #define FOO (x)), it is treated as an Object-like macro replacing FOO with '(x)', rather than a function-like macro taking parameter x."
  },
  {
    question: "Can macros define new keywords or redefine existing keywords in C?",
    answer: "Technically the preprocessor allows substituting keywords (e.g. #define int long), but doing so in standard applications causes immense confusion and is considered dangerous bad practice."
  },
  {
    question: "How does the preprocessor prevent duplicate token inclusion when expanding nested macros?",
    answer: "During rescanning, tokens that originated from an active macro expansion are tagged ('painted blue') to prevent self-recursive re-expansion."
  },
  {
    question: "What command-line flag in GCC passes a macro definition directly to the preprocessor?",
    answer: "The -D flag, e.g., 'gcc -DDEBUG=1 -DBUFFER_SIZE=2048 main.c', which defines macros before any source code directives are read."
  },
  {
    question: "What is the purpose of the #error directive?",
    answer: "#error \"Message\" forces the preprocessor to halt compilation immediately with the specified custom error message (e.g., if required platform macros are missing)."
  },
  {
    question: "What is the purpose of the #warning directive?",
    answer: "#warning \"Message\" outputs a compiler warning during preprocessing without stopping compilation."
  },
  {
    question: "Can preprocessor directives be nested inside functions?",
    answer: "Yes, preprocessor directives can appear anywhere in source files, even inside function bodies. However, their effect remains global from that line forward."
  },
  {
    question: "What is the difference between a preprocessor macro and an inline function?",
    answer: "An inline function is a real C function with strict type checking, normal scope rules, and single-evaluation argument semantics. A macro is raw text substitution with no type safety and prone to multiple-evaluation bugs."
  },
  {
    question: "Why is understanding the preprocessor pipeline essential for advanced C programming?",
    answer: "Because production C code bases (Linux kernel, SQLite, Git, RTOS systems) rely heavily on macro metaprogramming for zero-cost abstractions, hardware abstraction layers (HAL), and cross-platform compilation."
  }
];
