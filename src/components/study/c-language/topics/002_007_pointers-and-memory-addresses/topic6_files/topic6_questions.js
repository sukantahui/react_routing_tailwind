const questions = [
  {
    question: "What is a Function Pointer in C?",
    shortAnswer: "A pointer that stores the memory address of executable machine code for a function in the text segment.",
    explanation: "Allows calling functions dynamically at runtime, implementing callbacks, event loops, and dispatch tables.",
    hint: "Pointer storing function code address.",
    level: "basic"
  },
  {
    question: "What is the syntax for declaring a pointer `fp` to a function taking two `int`s and returning an `int`?",
    shortAnswer: "`int (*fp)(int, int);`",
    explanation: "Parentheses `(*fp)` are mandatory; writing `int *fp(int, int);` declares a function returning an `int*`.",
    hint: "int (*fp)(int, int);",
    level: "basic",
    codeExample: "int (*fp)(int, int) = add;"
  },
  {
    question: "How do you define a clean alias for a function pointer type using `typedef`?",
    shortAnswer: "`typedef int (*OperationFunc)(int, int);`",
    explanation: "Allows declaring function pointer variables cleanly: `OperationFunc p = multiply;`.",
    hint: "typedef with function signature.",
    level: "basic",
    codeExample: "typedef int (*OperationFunc)(int, int);\nOperationFunc p = multiply;"
  },
  {
    question: "What is a Callback Function in C?",
    shortAnswer: "A function passed as a pointer argument to another function, which calls it back during execution.",
    explanation: "Used extensively in event-driven programming, GUI button clicks, timers, and `qsort`.",
    hint: "Function passed as argument to another function.",
    level: "basic"
  },
  {
    question: "What is a Dispatch Table (Jump Table) in C?",
    shortAnswer: "An array of function pointers indexed by opcode or user choice to invoke routines in O(1) time.",
    explanation: "Replaces large, slow `switch` or `if-else` chains with direct indexed function pointer calls.",
    hint: "Array of function pointers.",
    level: "intermediate",
    codeExample: "void (*actions[4])(void) = {onCreate, onStart, onPause, onDestroy};\nactions[eventCode]();"
  },
  {
    question: "What is the signature of the comparator callback function required by `qsort()` from `<stdlib.h>`?",
    shortAnswer: "`int (*cmp)(const void *a, const void *b)`",
    explanation: "`qsort` passes generic `const void*` pointers to the two elements being compared.",
    hint: "int (*cmp)(const void *, const void *).",
    level: "basic"
  },
  {
    question: "In a `qsort` comparator, what does returning a positive integer `> 0` signify?",
    shortAnswer: "Element `a` is greater than element `b`, meaning `b` should precede `a` in ascending order.",
    explanation: "`qsort` will place `b` before `a` in the sorted output.",
    hint: "a should come after b.",
    level: "basic"
  },
  {
    question: "Why does the `add` function identifier automatically evaluate to its address without `&`?",
    shortAnswer: "In C, a function name automatically decays into a pointer to that function in expressions.",
    explanation: "`p = add;` and `p = &add;` are completely equivalent in C.",
    hint: "Function name automatically decays to pointer.",
    level: "basic"
  },
  {
    question: "Can you invoke a function pointer with or without explicit dereference: `fp(a, b)` vs `(*fp)(a, b)`?",
    shortAnswer: "Both are completely valid and produce identical machine code in C.",
    explanation: "`fp(a, b)` is modern syntactic shorthand for `(*fp)(a, b)`.",
    hint: "Both fp(a, b) and (*fp)(a, b) are legal.",
    level: "basic"
  },
  {
    question: "What happens if you attempt to call a function pointer that is `NULL`?",
    shortAnswer: "Immediate Segmentation Fault / Crash (attempting to execute code at address 0).",
    explanation: "Always check `if (fp != NULL)` before calling any callback pointer.",
    hint: "Crash executing code at NULL.",
    level: "basic"
  },
  {
    question: "Can function pointers be members of C `struct`s?",
    shortAnswer: "Yes, this is how Object-Oriented Programming (OOP) and Virtual Method Tables (vtable) are implemented in pure C.",
    explanation: "Structs contain function pointer fields pointing to specific methods.",
    hint: "Structs with function pointers simulate OOP methods.",
    level: "intermediate",
    codeExample: "typedef struct {\n    void (*start)(void);\n    void (*stop)(void);\n} Engine;"
  },
  {
    question: "What is the size of any function pointer on a 64-bit operating system?",
    options: ["8 bytes (64 bits)", "16 bytes", "4 bytes", "Variable size based on function code length"],
    correctAnswer: 0,
    explanation: "All code address pointers occupy 8 bytes on a 64-bit architecture.",
    level: "basic"
  },
  {
    question: "What is a Signal Handler in POSIX C?",
    shortAnswer: "A callback function registered via `signal(SIGINT, handler);` to intercept OS asynchronous events.",
    explanation: "Takes a function pointer `void (*)(int)` invoked by the OS kernel when signals fire.",
    hint: "OS interrupt handler callback.",
    level: "intermediate"
  },
  {
    question: "Can you perform pointer arithmetic like `fp++` on a function pointer in standard C?",
    shortAnswer: "No, pointer arithmetic on function pointers is illegal in standard ISO C.",
    explanation: "Functions are not elements of arrays and have no defined size.",
    hint: "Arithmetic on function pointers is illegal.",
    level: "intermediate"
  },
  {
    question: "How do you declare an array of 10 function pointers taking `void` and returning `void`?",
    shortAnswer: "`void (*arr[10])(void);`",
    explanation: "Declares an array of 10 pointers to functions taking void and returning void.",
    hint: "void (*arr[10])(void);",
    level: "intermediate"
  },
  {
    question: "How do you pass extra custom user data into a C callback function without global variables?",
    shortAnswer: "Pass a context pointer `void *userData` alongside the function pointer (Context Callback pattern).",
    explanation: "Standard design pattern used across POSIX threads (`pthread_create`), GUI toolkits, and Linux kernel drivers.",
    hint: "Pass void *userData context pointer.",
    level: "advanced",
    codeExample: "void registerCallback(void (*cb)(void*), void *userData);"
  },
  {
    question: "What is `pthread_create()`'s callback function signature in POSIX C?",
    shortAnswer: "`void* (*start_routine)(void*)`",
    explanation: "Accepts a `void*` argument and returns a `void*` exit code.",
    hint: "void* (*start_routine)(void*).",
    level: "advanced"
  },
  {
    question: "What compiler optimization replaces indirect function pointer calls with direct branch jumps when targets are known?",
    shortAnswer: "Devirtualization / Indirect Call Promotion.",
    explanation: "Analyzes call sites to eliminate indirect jump branch misprediction penalties.",
    hint: "Devirtualization optimization.",
    level: "advanced"
  },
  {
    question: "What is the danger of casting between incompatible function pointer types?",
    shortAnswer: "Stack corruption and Undefined Behavior due to mismatched Calling Conventions and argument registers.",
    explanation: "The caller pushes arguments that the callee reads incorrectly from registers/stack.",
    hint: "Mismatched calling conventions corrupt stack.",
    level: "advanced"
  },
  {
    question: "How do you write a generic `filterArray` function using a function pointer predicate in C?",
    shortAnswer: "Accept a predicate callback: `void filter(int arr[], int n, bool (*predicate)(int));`.",
    explanation: "Filters elements matching the user-supplied boolean function dynamically.",
    hint: "Predicate callback taking element and returning bool.",
    level: "intermediate"
  },
  {
    question: "What is a 'Trampoline' in compiler and systems engineering?",
    shortAnswer: "A small dynamically generated snippet of machine code on the stack/heap that redirects execution to a target function with wrapped context.",
    explanation: "Used for nested functions, dynamic hooking, and runtime instrumentation.",
    hint: "Dynamic runtime code redirection snippet.",
    level: "advanced"
  },
  {
    question: "What does `atexit(cleanupFunc)` do in `<stdlib.h>`?",
    shortAnswer: "Registers a function pointer `void (*)(void)` to be called automatically when the program exits normally.",
    explanation: "Enables automatic file closing, log flushing, and resource cleanup upon termination.",
    hint: "Registers termination callback.",
    level: "intermediate"
  },
  {
    question: "How do you declare a function that RETURNS a function pointer?",
    shortAnswer: "`int (*getOperation(char op))(int, int);` or using `typedef`: `OpFunc getOperation(char op);`.",
    explanation: "Using `typedef` makes the syntax readable and maintainable.",
    hint: "Use typedef for functions returning function pointers.",
    level: "advanced"
  },
  {
    question: "What is the memory segment where function code instructions reside?",
    shortAnswer: "The Text Segment (Code Segment).",
    explanation: "Function pointers store memory addresses pointing into the executable `.text` virtual memory region.",
    hint: ".text / Code segment.",
    level: "basic"
  },
  {
    question: "What is the golden rule for function pointer invocations?",
    shortAnswer: "Always guard against `NULL` pointers: `if (callback != NULL) callback(args);`.",
    explanation: "Calling a NULL function pointer triggers an immediate fatal segmentation fault.",
    hint: "Always check if pointer is non-null before invocation.",
    level: "basic"
  }
];

export default questions;
