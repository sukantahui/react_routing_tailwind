const questions = [
  {
    question: "What is a pointer in the C programming language?",
    shortAnswer: "A variable that stores the physical/virtual memory address of another variable.",
    explanation: "Instead of holding a direct numeric value like 42, a pointer stores where in RAM (e.g. 0x7ffd9820) that 42 resides.",
    hint: "Variable holding a memory address.",
    level: "basic"
  },
  {
    question: "What is the Address-of operator in C and what does it return?",
    shortAnswer: "The ampersand `&` operator; it returns the hexadecimal memory address of its operand.",
    explanation: "If `int x = 10;`, `&x` yields the memory location where variable `x` is stored.",
    hint: "Ampersand & operator.",
    level: "basic"
  },
  {
    question: "What is the Dereference (Indirection) operator in C?",
    shortAnswer: "The asterisk `*` operator; it accesses or modifies the value located at the address stored in a pointer.",
    explanation: "If `ptr = &x;`, `*ptr` directly reads or writes the memory content of `x`.",
    hint: "Asterisk * operator.",
    level: "basic"
  },
  {
    question: "What is the byte size of any pointer variable on a 64-bit operating system?",
    shortAnswer: "8 bytes (64 bits), regardless of the data type it points to.",
    explanation: "`sizeof(char*)`, `sizeof(int*)`, and `sizeof(double*)` are all 8 bytes because a 64-bit architecture requires 64-bit memory addresses.",
    hint: "8 bytes on 64-bit architectures.",
    level: "basic"
  },
  {
    question: "What is a `NULL` pointer in C?",
    shortAnswer: "A special pointer constant (defined as `(void*)0` or `0`) that points to no valid memory address.",
    explanation: "Used to indicate uninitialized pointers, end-of-list sentinels, or function allocation failures.",
    hint: "Pointer pointing to 0x0 / nothing.",
    level: "basic"
  },
  {
    question: "What happens if you attempt to dereference a `NULL` pointer (`*pNull`)?",
    shortAnswer: "Runtime crash / Segmentation Fault (Memory Access Violation).",
    explanation: "Address 0 is intentionally left unmapped by OS virtual memory managers to trap null dereference bugs.",
    hint: "Segmentation Fault crash.",
    level: "basic"
  },
  {
    question: "What is a Wild (Uninitialized) Pointer?",
    shortAnswer: "A pointer declared without an initial address that holds random garbage memory bits.",
    explanation: "Dereferencing a wild pointer reads/writes random memory, corrupting data or crashing unpredictably.",
    hint: "Uninitialized pointer holding garbage address.",
    level: "intermediate"
  },
  {
    question: "How do you declare multiple pointers on the same line correctly in C?",
    shortAnswer: "`int *p1, *p2, *p3;` (The `*` binds to the identifier, not the type `int`).",
    explanation: "Writing `int* p1, p2, p3;` only makes `p1` a pointer; `p2` and `p3` will be standard integer variables!",
    hint: "* binds to variable name.",
    level: "intermediate",
    codeExample: "int *p1, *p2; // Both are pointers to int"
  },
  {
    question: "What is the difference between `p`, `*p`, and `&p`?",
    shortAnswer: "`p` is the address stored in pointer; `*p` is the value at that address; `&p` is the memory address of the pointer variable itself.",
    explanation: "Pointers are themselves variables residing at their own memory address in RAM.",
    hint: "Stored address vs Pointee value vs Pointer's own address.",
    level: "basic"
  },
  {
    question: "What is a Dangling Pointer?",
    shortAnswer: "A pointer that points to a memory address that has already been deallocated or destroyed.",
    explanation: "Occurs when pointing to a local stack variable after function return, or to heap memory after `free()`.",
    hint: "Points to freed/destroyed memory.",
    level: "intermediate"
  },
  {
    question: "How do you neutralize a dangling pointer after freeing memory?",
    shortAnswer: "Assign `ptr = NULL;` immediately after `free(ptr);`.",
    explanation: "Ensures any accidental subsequent check `if (ptr != NULL)` safely detects that memory is no longer valid.",
    hint: "Set to NULL after free.",
    level: "basic",
    codeExample: "free(ptr);\nptr = NULL;"
  },
  {
    question: "Why must pointers have a specific data type (e.g. `int*` vs `char*`) if all pointers are 8 bytes?",
    shortAnswer: "To tell the compiler how many bytes to read/write during dereferencing and how many bytes to jump during pointer arithmetic.",
    explanation: "`*pInt` reads 4 bytes, while `*pChar` reads 1 byte. `pInt++` jumps 4 bytes; `pChar++` jumps 1 byte.",
    hint: "Determines dereference width and scaling step.",
    level: "intermediate"
  },
  {
    question: "What format specifier should always be used to print pointer memory addresses in `printf`?",
    shortAnswer: "`%p` (with the argument explicitly cast to `(void*)`).",
    explanation: "`printf(\"Address: %p\\n\", (void*)ptr);` formats addresses in hexadecimal.",
    hint: "%p with (void*) cast.",
    level: "basic"
  },
  {
    question: "Can a pointer point to another pointer?",
    shortAnswer: "Yes, this is a Pointer to Pointer (Double Pointer, declared as `int **pp`).",
    explanation: "Stores the address of a pointer variable.",
    hint: "Double pointer **.",
    level: "basic"
  },
  {
    question: "What is the result of `int a = 5; int *p = &a; *p = *p + 10;`?",
    shortAnswer: "`a` becomes 15.",
    explanation: "`*p` retrieves 5, adds 10 = 15, and stores 15 directly back into memory address of `a`.",
    hint: "Mutates variable 'a' in-place.",
    level: "basic"
  },
  {
    question: "What does `int *p = 0;` mean in C?",
    shortAnswer: "Initializes `p` as a `NULL` pointer.",
    explanation: "In pointer context, integer constant 0 is converted to a null pointer constant.",
    hint: "0 is null pointer constant.",
    level: "basic"
  },
  {
    question: "Can two different pointers point to the exact same memory address in C?",
    shortAnswer: "Yes (Pointer Aliasing).",
    explanation: "Both pointers can independently read or mutate the same underlying variable.",
    hint: "Pointer aliasing.",
    level: "basic"
  },
  {
    question: "What is the `nullptr` keyword introduced in C23?",
    shortAnswer: "A type-safe null pointer constant with type `nullptr_t`, preventing ambiguity between integer 0 and pointer NULL.",
    explanation: "Standardized in C23 from C++11.",
    hint: "Type-safe null pointer in C23.",
    level: "advanced"
  },
  {
    question: "What happens if you assign `int *p = 1000;` directly without a typecast?",
    shortAnswer: "Compiler error or warning: assigning integer to pointer without a cast.",
    explanation: "Directly hardcoding arbitrary memory addresses is unsafe and prohibited without explicit hardware driver casting.",
    hint: "Cannot assign raw integer to pointer.",
    level: "intermediate"
  },
  {
    question: "What is Memory Alignment and why does it affect pointers?",
    shortAnswer: "CPUs access memory faster when data types are stored at addresses that are multiples of their size (e.g. 4-byte int at address divisible by 4).",
    explanation: "Unaligned pointer access can cause CPU hardware exceptions or performance penalties.",
    hint: "Addresses must match data type byte boundary multiples.",
    level: "advanced"
  },
  {
    question: "What is the output of `int x = 10; int *p = &x; printf(\"%d\", *&x);`?",
    options: ["Address of x", "10", "Garbage", "Compiler error"],
    correctAnswer: 1,
    explanation: "`&` gets address of x; `*` immediately dereferences it back, yielding 10."
  },
  {
    question: "What is the associativity and precedence of address-of `&` and dereference `*` operators?",
    shortAnswer: "High precedence (level 2), right-to-left associativity (unary operators).",
    explanation: "Evaluated from right to left with other unary operators.",
    hint: "Unary operators right-to-left.",
    level: "intermediate"
  },
  {
    question: "Why does `scanf(\"%d\", &num);` require the `&` operator?",
    shortAnswer: "Because `scanf` needs the memory address of `num` so it can write the user's input directly into `num`'s stack memory.",
    explanation: "Passing `num` without `&` passes a copy of its value, preventing `scanf` from modifying `num`.",
    hint: "Needs address to write result back to caller.",
    level: "basic"
  },
  {
    question: "Why does `scanf(\"%s\", str);` NOT require the `&` operator for a character array `char str[20]`?",
    shortAnswer: "Because the array name `str` automatically decays into a pointer to its first element (`&str[0]`).",
    explanation: "The array name already provides the starting memory address.",
    hint: "Array name decays to base pointer.",
    level: "basic"
  },
  {
    question: "What is the defensive programming rule for pointer declarations?",
    shortAnswer: "Always initialize pointers immediately to either a valid variable address (`&var`) or `NULL`.",
    explanation: "Prevents wild pointer bugs and allows clean `if (p != NULL)` validation before use.",
    hint: "Initialize immediately to &var or NULL.",
    level: "basic"
  }
];

export default questions;
