const questions = [
  {
    question: "Does C support true native 'Pass-by-Reference' like C++?",
    shortAnswer: "No, C is strictly a 'Pass-by-Value' language; pass-by-reference is simulated by passing pointer addresses by value.",
    explanation: "When you pass `&x`, you pass the numeric memory address value into a pointer parameter.",
    hint: "Simulated pass-by-reference via pointer values.",
    level: "basic"
  },
  {
    question: "Why does `void swap(int a, int b) { int t = a; a = b; b = t; }` fail to swap variables in `main`?",
    shortAnswer: "Because `a` and `b` are local copies on `swap`'s stack frame; modifying them does not affect the caller's stack frame.",
    explanation: "Modifications exist only inside the function and are destroyed when the stack frame unwinds.",
    hint: "Copies on separate stack frame.",
    level: "basic"
  },
  {
    question: "What is the correct prototype and call syntax for swapping two integers in C?",
    shortAnswer: "Prototype: `void swap(int *a, int *b);` | Call: `swap(&x, &y);`",
    explanation: "Passing addresses allows `swap` to dereference `*a` and `*b`, directly mutating the caller's memory.",
    hint: "Pass &x, &y into int *a, int *b.",
    level: "basic",
    codeExample: "void swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}"
  },
  {
    question: "How can a C function return multiple calculated results to the caller?",
    shortAnswer: "By accepting pointer parameters (Out-parameters) and writing results directly to those caller addresses.",
    explanation: "Since C functions can only return a single value via `return`, pointers allow returning unlimited output values.",
    hint: "Output pointer parameters (out-parameters).",
    level: "basic",
    codeExample: "void getQuotientAndRemainder(int a, int b, int *q, int *r) {\n    *q = a / b;\n    *r = a % b;\n}"
  },
  {
    question: "What is an 'Out-Parameter' in C systems programming?",
    shortAnswer: "A pointer parameter whose purpose is to return data from the callee back to the caller.",
    explanation: "Commonly used in POSIX and Windows APIs where the `return` value returns a status code (0 for success) and data is written to out-pointers.",
    hint: "Pointer argument used as output channel.",
    level: "intermediate"
  },
  {
    question: "What happens if a caller passes `NULL` to an out-parameter `calculate(data, &result)`?",
    shortAnswer: "The function crashes with a Segmentation Fault unless it explicitly guards with `if (result != NULL)`.",
    explanation: "Defensive functions always check output pointers against NULL before dereferencing.",
    hint: "Guard out-pointers against NULL.",
    level: "intermediate"
  },
  {
    question: "What is the memory efficiency advantage of passing a large struct by pointer (`const StructType *p`) instead of by value?",
    shortAnswer: "Passing by pointer copies only 8 bytes (pointer size), whereas passing by value duplicates the entire struct (e.g. 1024 bytes) onto the stack.",
    explanation: "Passing by pointer avoids expensive memory copies and prevents stack overflow.",
    hint: "Copies 8 bytes instead of entire struct.",
    level: "intermediate"
  },
  {
    question: "How do you ensure a function cannot accidentally modify data when passing a pointer for performance?",
    shortAnswer: "Qualify the parameter with `const`, e.g. `void process(const BigData *data);`.",
    explanation: "The compiler forbids any writes through `const` pointers, guaranteeing data safety.",
    hint: "Use const pointer qualifier.",
    level: "basic"
  },
  {
    question: "What is the result of `void addOne(int *p) { (*p)++; }` called with `addOne(&count);` where `count = 10`?",
    shortAnswer: "`count` becomes 11.",
    explanation: "`*p` fetches 10, increments it to 11, and writes it back to `count`'s memory address.",
    hint: "Mutates count directly.",
    level: "basic"
  },
  {
    question: "Why are parentheses necessary in `(*p)++` compared to `*p++`?",
    shortAnswer: "`*p++` increments the pointer address itself due to operator precedence; `(*p)++` increments the integer value pointed to.",
    explanation: "Postfix `++` has higher precedence than unary `*`.",
    hint: "Precedence: postfix ++ > prefix *.",
    level: "advanced",
    codeExample: "(*p)++; // Increments integer value\n*p++;   // Increments pointer address!"
  },
  {
    question: "Can a function return a pointer to a local automatic variable declared on its own stack frame?",
    shortAnswer: "NO! Local variables are destroyed when the function returns, creating a Dangling Pointer and Undefined Behavior.",
    explanation: "Stack memory is reclaimed upon function return; reading through the returned pointer produces garbage or crashes.",
    hint: "Never return pointer to local stack variable.",
    level: "intermediate"
  },
  {
    question: "How can a function safely return a pointer to created data?",
    shortAnswer: "By allocating the memory dynamically on the heap with `malloc()`, or by returning a pointer to a `static` buffer.",
    explanation: "Heap memory and static storage persist beyond function scope.",
    hint: "Heap allocation via malloc() or static variable.",
    level: "intermediate"
  },
  {
    question: "What is the return value convention for standard POSIX / C systems functions using out-parameters?",
    shortAnswer: "Return integer error code (0 for SUCCESS, non-zero / -1 for ERROR), while actual data is returned via pointer arguments.",
    explanation: "Enables robust status verification before accessing parsed data.",
    hint: "Status code return + out-parameters for data.",
    level: "intermediate"
  },
  {
    question: "What is the difference between `swap(x, y)` and `swap(&x, &y)` at the assembly language level?",
    shortAnswer: "`swap(x, y)` pushes values (e.g. 10 and 20) onto registers/stack; `swap(&x, &y)` pushes stack memory addresses (e.g. 0x7ffd0000).",
    explanation: "The callee uses indirect memory addressing instructions to mutate the caller's stack frame.",
    hint: "Value passing vs Address offset passing.",
    level: "advanced"
  },
  {
    question: "How do you implement a function that resets an integer to 0 using a pointer?",
    shortAnswer: "`void reset(int *p) { if (p != NULL) *p = 0; }`",
    explanation: "Writes 0 into the target address after null validation.",
    hint: "*p = 0 with NULL guard.",
    level: "basic"
  },
  {
    question: "What happens if you call `swapByReference(&x, &x)` (passing the exact same variable address twice)?",
    shortAnswer: "It works correctly and keeps the value intact (or xor swap without temp could zero it).",
    explanation: "Standard temp-based swap handles identical addresses safely: temp = x; x = x; x = temp.",
    hint: "Self-swap safety with temp variable.",
    level: "intermediate"
  },
  {
    question: "What is the XOR swap algorithm and why can it fail if `pA == pB`?",
    shortAnswer: "`*pA ^= *pB; *pB ^= *pA; *pA ^= *pB;` fails if both pointers share the same address, zeroing the variable.",
    explanation: "`x ^ x = 0`. If `pA` and `pB` point to the same memory, the first step destroys the value.",
    hint: "XOR self-swap zeros out memory.",
    level: "advanced"
  },
  {
    question: "How do you write a function that splits a full name string into first and last name pointers?",
    shortAnswer: "Accept `const char *full`, and `char **first`, `char **last` (double pointers to modify caller pointer addresses).",
    explanation: "Modifying pointer variables requires passing pointers to those pointers (`char**`).",
    hint: "Pointers to pointers for modifying caller pointers.",
    level: "advanced"
  },
  {
    question: "What is the difference between passing an array `int arr[]` and passing a scalar `int x` to a function?",
    shortAnswer: "Arrays decay automatically into pointers (passed by address); scalars are passed by value (copied).",
    explanation: "Modifying `arr[0]` inside a function mutates caller memory; modifying `x` does not.",
    hint: "Array automatically decays to pointer.",
    level: "basic"
  },
  {
    question: "Why is passing pointers essential for building Linked Lists and Trees?",
    shortAnswer: "Nodes must store pointers to connect to other nodes in RAM and modify links dynamically.",
    explanation: "Data structures rely on memory address linkage to grow and restructure dynamically.",
    hint: "Address links between memory nodes.",
    level: "intermediate"
  },
  {
    question: "How do you pass a pointer to a function and increment the value it points to by N?",
    shortAnswer: "`void addN(int *p, int n) { if (p) *p += n; }`",
    explanation: "Adds `n` to the dereferenced target variable.",
    hint: "*p += n.",
    level: "basic"
  },
  {
    question: "What does `int * const ptr` guarantee when used as a function parameter?",
    shortAnswer: "The function cannot reassign the pointer to point to a different address.",
    explanation: "The pointer variable is constant, though the data pointed to remains mutable.",
    hint: "Immutable pointer address.",
    level: "intermediate"
  },
  {
    question: "What does `const int * const ptr` guarantee as a function parameter?",
    shortAnswer: "Both the pointer address and the data pointed to are completely read-only and immutable.",
    explanation: "Maximum immutability guarantee.",
    hint: "Read-only pointer and read-only data.",
    level: "intermediate"
  },
  {
    question: "Can pointer parameters be used with primitive types like `char`, `float`, and `long`?",
    shortAnswer: "Yes, pointer dereferencing works identically across all C data types.",
    explanation: "`*pFloat`, `*pChar`, and `*pLong` dereference their respective data widths.",
    hint: "Universal pointer dereferencing across all types.",
    level: "basic"
  },
  {
    question: "What is the golden rule when writing functions that accept pointer arguments?",
    shortAnswer: "Always validate that the pointer is non-null (`if (ptr == NULL) return ERROR;`) before dereferencing!",
    explanation: "Prevents fatal crashes and segmentation faults across your application.",
    hint: "Always check for NULL before dereferencing.",
    level: "basic"
  }
];

export default questions;
