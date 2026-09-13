export const topic5Questions = [
  {
    question: "What does the predefined macro __FILE__ expand to?",
    answer: "A string literal containing the path or filename of the current source code file being processed (e.g. \"main.c\")."
  },
  {
    question: "What does the predefined macro __LINE__ expand to?",
    answer: "A decimal integer constant representing the current 1-indexed line number in the source file."
  },
  {
    question: "What does __DATE__ expand to?",
    answer: "A string literal containing the date of compilation in the format \"Mmm dd yyyy\" (e.g. \"Sep 13 2026\")."
  },
  {
    question: "What does __TIME__ expand to?",
    answer: "A string literal containing the time of compilation in the format \"hh:mm:ss\" (e.g. \"14:30:00\")."
  },
  {
    question: "Is __func__ a preprocessor macro in C99/C11?",
    answer: "Technically no; C99 defines __func__ as an implicitly declared static const char __func__[] = \"function_name\"; local to each function body, but it behaves conceptually like a predefined identifier for logging."
  },
  {
    question: "What does __STDC__ represent?",
    answer: "An integer constant 1 if the compiler strictly conforms to the ISO C standard."
  },
  {
    question: "What are the common values of __STDC_VERSION__ across C standards?",
    answer: "- C94: 199409L\n- C99: 199901L\n- C11: 201112L\n- C17: 201710L\n- C23: 202311L"
  },
  {
    question: "What does the __STDC_HOSTED__ macro indicate?",
    answer: "It expands to 1 if the implementation is a 'hosted' environment with full C standard library and OS support, and 0 for 'freestanding' environments (e.g. bare-metal microcontroller firmware or OS kernels)."
  },
  {
    question: "Can __FILE__ and __LINE__ be modified using the #line directive?",
    answer: "Yes. '#line 100 \"custom.c\"' overrides subsequent __LINE__ to start at 100 and changes __FILE__ to \"custom.c\"."
  },
  {
    question: "How do you construct a zero-overhead logging macro using __FILE__ and __LINE__?",
    answer: "#define LOG(msg) printf(\"[%s:%d] %s\\n\", __FILE__, __LINE__, msg);"
  },
  {
    question: "What predefined macro detects GCC or Clang compilers?",
    answer: "__GNUC__ (which defines the major version number of the GCC/Clang compiler)."
  },
  {
    question: "What predefined macro detects Microsoft Visual C++ (MSVC)?",
    answer: "_MSC_VER (which expands to an integer representing the MSVC compiler version, e.g., 1930 for VS 2022)."
  },
  {
    question: "What does __TIMESTAMP__ expand to in GCC/Clang?",
    answer: "A string literal representing the last modification date and time of the current source file (e.g., \"Sun Sep 13 14:00:00 2026\")."
  },
  {
    question: "How does the standard assert() macro in <assert.h> utilize __FILE__ and __LINE__?",
    answer: "When an assertion fails, it prints the failed expression along with __FILE__ and __LINE__ to stderr and calls abort() to dump core."
  },
  {
    question: "Can __LINE__ be stringized using the stringizing operator '#'?",
    answer: "Yes, but it requires the two-level expansion trick: #define STR(x) #x, #define TOSTR(x) STR(x), then TOSTR(__LINE__) produces \"145\"."
  },
  {
    question: "What is the purpose of __cplusplus macro?",
    answer: "It is defined only when a C++ compiler compiles the file, allowing header files to wrap C declarations in 'extern \"C\" { ... }' for C++ compatibility."
  },
  {
    question: "Why does reproducible build software strip __DATE__ and __TIME__?",
    answer: "Because __DATE__ and __TIME__ change on every compile, producing differing binary hashes for identical source code. Reproducible builds define SOURCE_DATE_EPOCH instead."
  },
  {
    question: "Can you pass __func__ to a preprocessor '#' stringizing operator?",
    answer: "No! Because __func__ is a compiler variable (not a preprocessor macro), stringizing it with #__func__ produces the literal string \"__func__\" rather than the function name."
  },
  {
    question: "What does __SIZEOF_POINTER__ expand to in GCC/Clang?",
    answer: "The byte width of a memory pointer (8 on 64-bit systems, 4 on 32-bit systems)."
  },
  {
    question: "How do you print a compiler warning message containing the current line number?",
    answer: "#pragma message(\"Compiling at line \" TOSTR(__LINE__))"
  },
  {
    question: "What predefined macro indicates Little Endian byte ordering in GCC?",
    answer: "__BYTE_ORDER__ == __ORDER_LITTLE_ENDIAN__"
  },
  {
    question: "What is the __BASE_FILE__ macro in GCC?",
    answer: "The name of the main primary source file (.c) being compiled, even when expanding inside an included header file (.h)."
  },
  {
    question: "What does __INCLUDE_LEVEL__ represent in GCC?",
    answer: "An integer constant representing the current include nesting depth (0 for the primary .c file, 1 for headers included by it, etc.)."
  },
  {
    question: "Can user code redefine or undefine standard predefined macros like __FILE__ or __LINE__?",
    answer: "No. The ISO C standard forbids #define or #undef on standard predefined macros, and compilers emit warnings or errors if attempted."
  },
  {
    question: "How do predefined macros assist in post-mortem crash dump analysis?",
    answer: "By baking __FILE__, __LINE__, and __func__ into error logs and assertions, developers can locate the exact line that crashed in production binaries instantly."
  }
];
