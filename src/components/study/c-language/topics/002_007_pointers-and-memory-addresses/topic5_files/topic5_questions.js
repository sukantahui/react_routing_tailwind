const questions = [
  {
    question: "What is a `void*` (Void Pointer) in C?",
    shortAnswer: "A generic, untyped pointer capable of holding the memory address of ANY data type.",
    explanation: "Used extensively in polymorphic APIs like `malloc()`, `qsort()`, `bsearch()`, and `memcpy()`.",
    hint: "Generic untyped pointer.",
    level: "basic"
  },
  {
    question: "Can you directly dereference a `void*` pointer (`*pVoid`) in C?",
    shortAnswer: "No! A void pointer has no associated data type or byte size; attempting `*pVoid` causes a compilation error.",
    explanation: "You must explicitly typecast `void*` to a concrete pointer type (e.g. `*(int*)pVoid`) before dereferencing.",
    hint: "Must typecast before dereferencing.",
    level: "basic"
  },
  {
    question: "Does C require explicit casting when converting between `void*` and other pointer types (e.g. `int *p = malloc(10);`)?",
    shortAnswer: "No, in C, `void*` implicitly converts to and from any data pointer type without explicit casting.",
    explanation: "Explicit casting is required in C++, but optional and often discouraged in pure C for `malloc()`.",
    hint: "Implicit conversion in C.",
    level: "basic"
  },
  {
    question: "What does `const int *ptr` (or `int const *ptr`) declare?",
    shortAnswer: "A pointer to constant integer data (the integer value cannot be modified through `ptr`).",
    explanation: "The pointer address itself can be reassigned to point elsewhere, but `*ptr = 10;` is forbidden.",
    hint: "Read-only data, mutable pointer.",
    level: "basic",
    codeExample: "const int *p = &a;\np = &b;   // Legal\n*p = 50;  // COMPILE ERROR!"
  },
  {
    question: "What does `int * const ptr` declare?",
    shortAnswer: "A constant pointer to mutable integer data (the pointer address is locked and cannot point elsewhere).",
    explanation: "`*ptr = 50;` is legal, but `ptr = &b;` causes a compilation error.",
    hint: "Mutable data, locked pointer address.",
    level: "basic",
    codeExample: "int * const p = &a;\n*p = 50;  // Legal\np = &b;   // COMPILE ERROR!"
  },
  {
    question: "What does `const int * const ptr` declare?",
    shortAnswer: "A constant pointer to constant integer data (both the pointer address and the data are completely immutable).",
    explanation: "Neither `ptr` nor `*ptr` can be modified.",
    hint: "Both pointer and data are constant.",
    level: "basic"
  },
  {
    question: "What is the 'Clockwise / Right-to-Left' rule for reading complex C pointer declarations?",
    shortAnswer: "Start at the identifier, read right until closing parenthesis/semicolon, then read left towards the data type.",
    explanation: "Example: `int * const p` -> `p` is a `const pointer` to `int`.",
    hint: "Right-to-left reading rule.",
    level: "intermediate"
  },
  {
    question: "Why do functions like `memcpy` and `memset` accept `void*` parameters?",
    shortAnswer: "To operate polymorphically on raw byte buffers of any data type (integers, floats, structs, strings).",
    explanation: "Avoids writing separate copy routines for every individual data type.",
    hint: "Universal byte-level polymorphism.",
    level: "intermediate"
  },
  {
    question: "What is the return type of `malloc()`, `calloc()`, and `realloc()`?",
    shortAnswer: "`void*` (a pointer to an unformatted block of allocated heap memory, or `NULL`).",
    explanation: "Allows the returned address to be directly assigned to any pointer type.",
    hint: "void* generic heap pointer.",
    level: "basic"
  },
  {
    question: "Why does casting a pointer to `unsigned char*` enable byte-by-byte memory inspection?",
    shortAnswer: "Because `sizeof(unsigned char)` is guaranteed to be 1 byte, allowing exact inspection of raw binary bytes in memory.",
    explanation: "Used to inspect endianness, packet payloads, and memory dumps.",
    hint: "1-byte precision inspection.",
    level: "intermediate"
  },
  {
    question: "What is Type Punning in C and how is it related to pointers?",
    shortAnswer: "Reinterpreting the bit pattern of one data type as another by casting pointers (e.g. `*(float*)&intVal`).",
    explanation: "Can violate the Strict Aliasing Rule in C99, leading to undefined compiler optimization bugs.",
    hint: "Reinterpreting memory bits via pointer cast.",
    level: "advanced"
  },
  {
    question: "What is the Strict Aliasing Rule in C?",
    shortAnswer: "The compiler assumes two pointers of different incompatible types do not point to the same memory location.",
    explanation: "Allows CPU register caching optimizations. Aliasing via `char*` is explicitly permitted as an exception.",
    hint: "Compiler optimization rule on pointer types.",
    level: "advanced"
  },
  {
    question: "Why is casting through `char*` or `unsigned char*` exempt from strict aliasing violations?",
    shortAnswer: "The ISO C standard explicitly permits character pointers to alias and inspect any object's raw byte representation.",
    explanation: "Guarantees that memory dumpers, `memcpy`, and serializers work correctly.",
    hint: "Character pointers are universal aliasers.",
    level: "advanced"
  },
  {
    question: "Can a `void*` hold the address of a function in standard ISO C?",
    shortAnswer: "No, in standard C, `void*` is only defined for object pointers (data), not function pointers.",
    explanation: "POSIX specifies that `void*` can hold function pointers (for `dlsym`), but ISO C considers data and code memory distinct.",
    hint: "Object pointers vs Function pointers.",
    level: "advanced"
  },
  {
    question: "What happens if you cast a 64-bit pointer to a 32-bit `int`?",
    shortAnswer: "Upper 32 bits of the address are truncated, causing severe data loss / pointer corruption.",
    explanation: "Always use `uintptr_t` or `intptr_t` from `<stdint.h>` when converting pointers to integers.",
    hint: "Use uintptr_t from <stdint.h>.",
    level: "advanced"
  },
  {
    question: "What integer type is guaranteed to be large enough to hold any pointer address safely?",
    shortAnswer: "`uintptr_t` (defined in `<stdint.h>`).",
    explanation: "Automatically expands to 32 bits on 32-bit OS and 64 bits on 64-bit OS.",
    hint: "uintptr_t in <stdint.h>.",
    level: "intermediate"
  },
  {
    question: "What does `const` qualifier on a function parameter `void f(const char *s)` communicate to the caller?",
    shortAnswer: "Contract guarantee: The function will strictly read the data and will never modify the caller's buffer.",
    explanation: "Enhances code safety and allows string literals to be passed without warnings.",
    hint: "Read-only interface contract.",
    level: "basic"
  },
  {
    question: "How do you cast away `const`ness in C, and is writing through it safe?",
    shortAnswer: "`int *p = (int*)constPtr;` (Writing through it is Undefined Behavior if the original object was defined `const`).",
    explanation: "Casting away const allows compiling, but modifying true ROM/const memory causes runtime crashes.",
    hint: "Casting away const causes UB on true const objects.",
    level: "advanced"
  },
  {
    question: "What is the output of `int a = 10; const int *p = &a; a = 20; printf(\"%d\", *p);`?",
    options: ["10", "20", "Compiler error", "Garbage"],
    correctAnswer: 1,
    explanation: "`p` cannot modify `a`, but `a` itself is not const and can be modified directly, so `*p` reads 20."
  },
  {
    question: "What happens if a function comparator in `qsort` modifies data through its `const void*` arguments?",
    shortAnswer: "Compilation error unless cast, and logic errors/crashes during sorting.",
    explanation: "`qsort` expects non-destructive read-only comparisons.",
    hint: "Comparator arguments are read-only.",
    level: "basic"
  },
  {
    question: "Can a `void*` variable be initialized to `NULL`?",
    shortAnswer: "Yes, `void *p = NULL;` is standard idiom.",
    explanation: "`NULL` is defined as `((void*)0)`.",
    hint: "void *p = NULL is standard.",
    level: "basic"
  },
  {
    question: "Why should `const` be used extensively in systems C code?",
    shortAnswer: "Catches accidental mutation bugs at compile-time and allows compiler to optimize data into read-only flash/RAM.",
    explanation: "Const-correctness is a hallmark of professional systems engineering.",
    hint: "Compile-time safety and compiler optimization.",
    level: "basic"
  },
  {
    question: "What does `void free(void *ptr)` accept as argument?",
    shortAnswer: "Any pointer returned by `malloc`, `calloc`, or `realloc` regardless of its original type.",
    explanation: "`void*` allows `free()` to release memory without type specific signatures.",
    hint: "Generic deallocator accepting any pointer.",
    level: "basic"
  },
  {
    question: "What is an Incompatible Pointer Assignment warning?",
    shortAnswer: "Assigning pointers of different data types (e.g. `int *p = &doubleVal;`) without an explicit cast.",
    explanation: "Warns against type mismatch that would cause incorrect byte strides during dereferencing.",
    hint: "Type mismatch in pointer assignment.",
    level: "basic"
  },
  {
    question: "What is the golden rule for pointer casting?",
    shortAnswer: "Ensure memory alignment rules are respected and pointee types have matching bit interpretations.",
    explanation: "Improper casting leads to bus errors, unaligned access faults, and undefined behavior.",
    hint: "Respect alignment and bit width.",
    level: "advanced"
  }
];

export default questions;
