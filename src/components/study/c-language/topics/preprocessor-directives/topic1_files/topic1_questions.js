const questions = [
  {
    question: "What is the main difference between #define and const in C?",
    shortAnswer: "#define is a preprocessor macro (text substitution), while const is a typed read-only variable.",
    explanation: "#define runs before compilation and has no type checking; const is evaluated by the compiler and respects scope and type rules.",
    hint: "Think preprocessor vs compiler phases.",
    level: "basic",
    codeExample: "#define MAX 100\nconst int max = 100;"
  },
  {
    question: "Can a const variable be used as an array size in C89?",
    shortAnswer: "No, in C89 const variables are not compile-time constants, so they cannot be used for array sizes.",
    explanation: "C89 requires array sizes to be constant expressions known at compile time. #define or enum are needed. C99 introduced variable-length arrays (VLA) but not true compile-time constants.",
    hint: "Check the C standard version. In C++, const works for array sizes.",
    level: "intermediate",
    codeExample: "const int n = 10; int arr[n]; // Error in C89, OK in C99 (VLA)"
  },
  {
    question: "What is the output of: #define SQUARE(x) x*x; printf(\"%d\", SQUARE(2+3)); ?",
    shortAnswer: "11 (because 2+3*2+3 = 2+6+3 = 11).",
    explanation: "Macros are textual; without parentheses, operator precedence changes the meaning. Correct: #define SQUARE(x) ((x)*(x))",
    hint: "Always wrap macro parameters and whole expression in parentheses.",
    level: "basic",
    codeExample: "#define BAD(x) x*x\nBAD(2+3) // 2+3*2+3 = 11"
  },
  {
    question: "Does const create a symbol in the symbol table for debugging?",
    shortAnswer: "Yes, typically const variables are visible to debuggers, whereas #define macros are not (they are removed by preprocessor).",
    explanation: "Because const is a proper variable, debug info includes its name and value. Macros are gone after preprocessing, so you see the literal value.",
    hint: "Try debugging a program with #define vs const.",
    level: "intermediate",
    codeExample: "// Debugger shows 'const int x = 5;' as x, but #define X 5 appears as 5"
  },
  {
    question: "Can you declare a const pointer that points to a const value?",
    shortAnswer: "Yes: const int * const ptr = &value;",
    explanation: "This means the pointer itself is constant (cannot point to another address) and the value it points to is also constant (cannot be modified via ptr).",
    hint: "Read from right to left: const pointer to const int.",
    level: "advanced",
    codeExample: "int value = 10; const int * const cptr = &value;"
  },
  {
    question: "What is the scope of a macro defined inside a function?",
    shortAnswer: "Macros ignore block scope; they remain defined from the point of #define until end of file (or #undef).",
    explanation: "Unlike const variables, macros are not scoped to functions. This can cause unintended name clashes.",
    hint: "Macros are global text substitutions.",
    level: "intermediate",
    codeExample: "void f() { #define LOCAL 5 } void g() { int x = LOCAL; } // LOCAL still defined"
  },
  {
    question: "Which is better for defining a buffer size: #define or const?",
    shortAnswer: "In C89, #define; in C99 and later, either works but #define is still common for array sizes that need compile-time constant.",
    explanation: "If the constant is used for array dimensions, #define ensures true compile-time constant. const may work in C99 via VLA but VLAs have limitations.",
    hint: "Consider portability to older compilers.",
    level: "intermediate",
    codeExample: "#define BUFSZ 1024\nchar buf[BUFSZ]; // always works"
  },
  {
    question: "What does 'const' mean in function parameters?",
    shortAnswer: "It indicates that the function will not modify the parameter.",
    explanation: "For pointer parameters, const can be used to promise not to modify the pointed data (e.g., const char* str).",
    hint: "Use const to document and enforce read-only access.",
    level: "basic",
    codeExample: "void print(const char* msg) { /* cannot modify *msg */ }"
  },
  {
    question: "Can a const variable be modified via a pointer?",
    shortAnswer: "Yes, if the pointer is cast to discard constness, but it's undefined behavior if the original variable was truly const (e.g., const int x = 5;).",
    explanation: "Modifying a const-qualified object that was originally defined as const leads to undefined behavior. However, if the const is added via a pointer to a non-const variable, it's safe.",
    hint: "Never cast away const unless you are absolutely sure.",
    level: "advanced",
    codeExample: "const int x = 5; int *p = (int*)&x; *p = 10; // Undefined behavior"
  },
  {
    question: "Why does #define not respect type safety?",
    shortAnswer: "Because it's a textual replacement done before type checking; the compiler sees the replaced tokens without macro context.",
    explanation: "The preprocessor has no type information. The compiler only sees the expanded text, and types are assigned after expansion.",
    hint: "Consider #define MAX 100.0f vs 100 – both are just text.",
    level: "basic",
    codeExample: "#define VALUE 5.5\nint x = VALUE; // truncation without warning"
  },
  {
    question: "What is the advantage of using 'static const' at file scope?",
    shortAnswer: "It limits the constant's visibility to the current translation unit (file), preventing name clashes with other files.",
    explanation: "Without static, const at file scope has external linkage (in C) and may cause multiple definition errors if included in multiple .c files.",
    hint: "Use static const for file-private constants.",
    level: "intermediate",
    codeExample: "static const double PI = 3.14159; // only in this file"
  },
  {
    question: "Can you use #define to create a constant that is a floating-point expression?",
    shortAnswer: "Yes, #define can produce any token sequence, including floating-point literals and expressions.",
    explanation: "Example: #define HALF_PI (3.14159/2). But be aware that no type checking occurs.",
    hint: "Wrap the expression in parentheses.",
    level: "basic",
    codeExample: "#define AREA(r) (3.14159*(r)*(r))"
  },
  {
    question: "How does 'const' interact with volatile?",
    shortAnswer: "A variable can be both const and volatile (e.g., a read-only hardware register that changes externally).",
    explanation: "const means the program cannot modify it; volatile means its value may change unexpectedly.",
    hint: "Used for memory-mapped I/O registers that are read-only.",
    level: "expert",
    codeExample: "const volatile uint32_t* status_reg = (uint32_t*)0x4000;"
  },
  {
    question: "What is the difference between 'const int *p' and 'int *const p'?",
    shortAnswer: "const int *p is a pointer to constant int (value cannot change via p, but p can point elsewhere). int *const p is a constant pointer to int (p cannot change, but value can be changed via p).",
    explanation: "Read declarations right-to-left: const int *p → p is a pointer to const int; int *const p → p is a const pointer to int.",
    hint: "Use const to enforce either pointer immutability or data immutability.",
    level: "advanced",
    codeExample: "int x=1,y=2; const int *p1=&x; p1=&y; // OK; *p1=3; // Error\nint *const p2=&x; *p2=3; // OK; p2=&y; // Error"
  },
  {
    question: "Can a macro be used to define a type?",
    shortAnswer: "Yes, but it's dangerous because the macro text substitution may not work as expected with pointers and complex types.",
    explanation: "Example: #define ptr int*; then ptr a,b; expands to int* a,b; – b is int, not pointer.",
    hint: "Use typedef instead of #define for type aliases.",
    level: "intermediate",
    codeExample: "#define INTPTR int*\nINTPTR p,q; // p is int*, q is int"
  },
  {
    question: "What is the output of: #define FORMAT \"%d\\n\"; printf(FORMAT, 10); ?",
    shortAnswer: "Compilation error: extra semicolon inside printf argument.",
    explanation: "The macro FORMAT expands to \"%d\\n\"; including the semicolon, so printf(\"%d\\n\";, 10); is invalid.",
    hint: "Never put a semicolon inside a macro that is used as an expression.",
    level: "basic",
    codeExample: "#define MSG \"Hello\"; // wrong\nprintf(MSG); // expands to printf(\"Hello\";);"
  },
  {
    question: "Why do some style guides recommend using enum for integer constants instead of #define or const?",
    shortAnswer: "enum constants are compile-time integer constants that have type and are scoped, and they don't consume memory.",
    explanation: "Enum constants are like #define but with type safety and debug info. However, they are limited to int values.",
    hint: "For a set of related integer constants, enum is often best.",
    level: "intermediate",
    codeExample: "enum { STATE_IDLE, STATE_BUSY, STATE_ERROR };"
  },
  {
    question: "Can a const variable be initialized at runtime?",
    shortAnswer: "Yes, const variables can be initialized with runtime values (e.g., function return values).",
    explanation: "const only prevents modification after initialization; the initializer can be any expression.",
    hint: "Unlike #define, const can have runtime-determined values.",
    level: "intermediate",
    codeExample: "const int random = rand(); // legal"
  },
  {
    question: "What happens if you define a macro with the same name as a const variable?",
    shortAnswer: "The preprocessor will replace all occurrences of the name with the macro text before the compiler sees the const declaration, effectively hiding it.",
    explanation: "Because the preprocessor runs first, the macro substitution will occur even on the const declaration if the identifier matches.",
    hint: "Avoid using same names for macros and variables.",
    level: "intermediate",
    codeExample: "#define VAL 5\nconst int VAL = 10; // becomes const int 5 = 10; error"
  },
  {
    question: "What is 'stringizing' and can it be used with const?",
    shortAnswer: "Stringizing (#) is a preprocessor operator that converts a macro argument to a string. It cannot be used with const variables.",
    explanation: "#define STR(x) #x turns STR(hello) into \"hello\". const variables are not processed by preprocessor, so no stringizing.",
    hint: "Stringizing works only inside macros.",
    level: "advanced",
    codeExample: "#define PRINT_VAR(x) printf(#x \" = %d\\n\", x)\nint age=25; PRINT_VAR(age); // prints \"age = 25\""
  },
  {
    question: "How does const affect linkage in C?",
    shortAnswer: "At file scope, const variables have external linkage by default in C (unlike C++ where they have internal linkage).",
    explanation: "In C, const int x = 5; in a header file will cause multiple definition errors if included in several .c files. Use static const to avoid that.",
    hint: "To mimic C++ behavior, use static const in headers.",
    level: "advanced",
    codeExample: "// header.h\nstatic const int VERSION = 1; // safe in multiple includes"
  },
  {
    question: "Can a const variable be used as a case label in switch?",
    shortAnswer: "In C, no, because case labels require constant expressions known at compile time, and const variables are not considered constant expressions (unless they are enum constants or literals).",
    explanation: "#define or enum constants work. const int does not work in C (in C++ it does).",
    hint: "Use #define or enum for case labels.",
    level: "intermediate",
    codeExample: "const int ONE = 1; switch(x) { case ONE: ... } // Error in C"
  },
  {
    question: "What is the advantage of using #define for logging levels?",
    shortAnswer: "You can use #ifdef to conditionally compile logging code, removing it entirely in release builds.",
    explanation: "With #define LOG_LEVEL 3, you can have #if LOG_LEVEL > 2 ... #endif. const variables cannot be used in #if because they are not evaluated by preprocessor.",
    hint: "For conditional compilation, #define is necessary.",
    level: "intermediate",
    codeExample: "#define DEBUG_LEVEL 2\n#if DEBUG_LEVEL >= 2\n  printf(\"debug\\n\");\n#endif"
  },
  {
    question: "What is the output of: #define MAX(a,b) a>b?a:b; printf(\"%d\", MAX(2,3)); ?",
    shortAnswer: "Prints 3 correctly, but the macro includes a trailing semicolon, which is okay in this context but dangerous in others.",
    explanation: "The macro expands to 2>3?2:3; then printf gets the value 3. However, if used in an if-else, the semicolon can cause issues.",
    hint: "Avoid semicolons in macro bodies; use do-while(0) for multi-statement macros.",
    level: "basic",
    codeExample: "if (x) MAX(2,3); else ... // syntax error due to semicolon"
  },
  {
    question: "How do you define a const string in C?",
    shortAnswer: "const char* str = \"Hello\"; or char const* str = \"Hello\";",
    explanation: "This defines a pointer to a constant character (string literal). The string itself is read-only.",
    hint: "The string literal is in read-only memory; modifying it is undefined.",
    level: "basic",
    codeExample: "const char* greeting = \"Hi\"; // greeting points to read-only memory"
  },
  {
    question: "Can a const variable be used to specify a bit-field width?",
    shortAnswer: "No, bit-field widths must be integer constant expressions. const int is not allowed.",
    explanation: "In struct { int field : WIDTH; }; WIDTH must be a compile-time constant like #define or enum.",
    hint: "#define is the only portable way for bit-field widths.",
    level: "expert",
    codeExample: "#define W 4\nstruct { int a : W; }; // works"
  },
  {
    question: "What is the difference between 'const' and 'constexpr'?",
    shortAnswer: "constexpr is not available in standard C (it's C++). In C, const only means read-only, not necessarily compile-time constant.",
    explanation: "C has no constexpr. For compile-time evaluation, use #define or enum.",
    hint: "Don't confuse C with C++ features.",
    level: "intermediate",
    codeExample: "// C++ only: constexpr int square(int x) { return x*x; }"
  },
  {
    question: "How does the compiler optimize const variables compared to #define?",
    shortAnswer: "Modern compilers may optimize const variables similarly to literals, but #define ensures no memory is allocated.",
    explanation: "Const variables can be optimized away if their address is not taken, but #define is always inlined as text. However, const provides type safety.",
    hint: "Don't worry about performance; choose based on correctness and readability.",
    level: "advanced",
    codeExample: "// both likely produce same assembly in optimized builds"
  },
  {
    question: "What is a common mistake when using const with pointers in function parameters?",
    shortAnswer: "Confusing 'const int*' with 'int* const' – the former prevents modifying the data, the latter prevents changing the pointer.",
    explanation: "Beginners often think 'const int *p' means the pointer is constant, but it's the data.",
    hint: "Read declarations carefully: 'const' on left of * affects data, on right affects pointer.",
    level: "intermediate",
    codeExample: "void f(const int* p) { *p = 5; } // error\nvoid g(int* const p) { p = NULL; } // error"
  },
  {
    question: "Can you use #define to create a constant that includes a cast?",
    shortAnswer: "Yes, you can define macros that cast, e.g., #define BYTE_MASK ((unsigned char)0xFF).",
    explanation: "The cast becomes part of the substituted text, providing type information at the point of expansion.",
    hint: "Use parentheses around the entire macro body.",
    level: "advanced",
    codeExample: "#define U32(x) ((unsigned int)(x))"
  }
];

export default questions;