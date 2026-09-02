const questions = [
  {
    question: "What is Pointer Scaling in C pointer arithmetic?",
    shortAnswer: "Adding or subtracting integer N to/from a pointer scales N by `sizeof(*ptr)` (the byte size of the pointed-to type).",
    explanation: "For `int *p`, `p + 1` advances the physical memory address by `1 * sizeof(int)` (4 bytes), not 1 raw byte.",
    hint: "Scaled by sizeof(DataType).",
    level: "basic"
  },
  {
    question: "If `int *p = 0x1000;` and `sizeof(int) == 4`, what is the address resulting from `p + 3`?",
    shortAnswer: "`0x100C` (0x1000 + 3 * 4 = 0x1000 + 12 = 0x100C).",
    explanation: "12 bytes in hexadecimal is 0xC. The address becomes 0x100C.",
    hint: "0x1000 + 12 bytes = 0x100C.",
    level: "basic"
  },
  {
    question: "Which arithmetic operations are LEGAL on pointers in C?",
    shortAnswer: "1. Pointer + Integer, 2. Pointer - Integer, 3. Pointer - Pointer (same array), 4. Increment/Decrement (`++`, `--`).",
    explanation: "Operations like adding two pointers, multiplying pointers, or dividing pointers are ILLEGAL and cause compiler errors.",
    hint: "Pointer +/- int, Pointer - Pointer.",
    level: "basic"
  },
  {
    question: "Why is adding two pointers together (`ptr1 + ptr2`) illegal in C?",
    shortAnswer: "Because adding two memory addresses produces a meaningless memory location with no semantic validity.",
    explanation: "Adding two addresses in RAM makes no mathematical or architectural sense.",
    hint: "Adding addresses has no semantic meaning.",
    level: "basic"
  },
  {
    question: "What does subtracting two pointers `p2 - p1` return?",
    shortAnswer: "The number of elements of type `T` between `p1` and `p2` (type `ptrdiff_t`), NOT the raw number of bytes.",
    explanation: "`p2 - p1` computes `(address2 - address1) / sizeof(T)`.",
    hint: "Element count, not raw bytes.",
    level: "intermediate"
  },
  {
    question: "What signed integer type defined in `<stddef.h>` represents the result of pointer subtraction?",
    shortAnswer: "`ptrdiff_t` (printed using the `%td` format specifier in `printf`).",
    explanation: "`ptrdiff_t` is guaranteed to be large enough to hold the signed difference between any two pointers.",
    hint: "ptrdiff_t formatted with %td.",
    level: "intermediate"
  },
  {
    question: "What is the condition required for pointer subtraction `p2 - p1` to be defined behavior in ISO C?",
    shortAnswer: "Both pointers MUST point to elements of the SAME array object (or one element past the end of that array).",
    explanation: "Subtracting pointers pointing to unrelated variables or different stack frames is Undefined Behavior.",
    hint: "Must point to same array object.",
    level: "intermediate"
  },
  {
    question: "What is the 'one-past-the-end' rule for pointers in C?",
    shortAnswer: "C permits computing and comparing a pointer pointing to one element past the end of an array (`&arr[N]`), but it must NEVER be dereferenced.",
    explanation: "Crucial for writing standard loop termination guards like `for (p = arr; p < arr + N; p++)`.",
    hint: "Can point to arr + N, but cannot dereference.",
    level: "intermediate"
  },
  {
    question: "What does `*ptr++` do in C?",
    shortAnswer: "Returns the current value `*ptr`, and then increments the pointer address `ptr` to point to the next element.",
    explanation: "Postfix `++` has higher precedence than `*`, but yields the original address for dereferencing before incrementing.",
    hint: "Dereferences current value, then advances pointer.",
    level: "intermediate"
  },
  {
    question: "What does `*++ptr` do in C?",
    shortAnswer: "Increments the pointer address `ptr` first, then dereferences and returns the value at the new address.",
    explanation: "Prefix `++` advances the address before dereference takes place.",
    hint: "Advances pointer first, then dereferences.",
    level: "intermediate"
  },
  {
    question: "What does `++*ptr` do in C?",
    shortAnswer: "Dereferences `ptr` and increments the integer value stored at that address by 1.",
    explanation: "Identical in effect to `++(*ptr)`.",
    hint: "Increments the data value.",
    level: "intermediate"
  },
  {
    question: "What does `(*ptr)++` do in C?",
    shortAnswer: "Fetches the integer value at address `ptr`, and then increments that integer value in memory.",
    explanation: "Parentheses isolate dereference; the pointed data is incremented, while pointer address remains constant.",
    hint: "Increments pointed-to value after evaluation.",
    level: "intermediate"
  },
  {
    question: "When are relational comparisons (`p1 < p2`, `p1 >= p2`) valid between pointers?",
    shortAnswer: "Only when both pointers point to elements of the same array or structure.",
    explanation: "Compares lower vs higher memory indices within that contiguous block.",
    hint: "Valid only within the same array.",
    level: "basic"
  },
  {
    question: "What happens if you execute `void *p; p++;` in standard ISO C?",
    shortAnswer: "Compile error / Constraint violation because `sizeof(void)` is unknown/undefined.",
    explanation: "GCC has an extension treating `sizeof(void) == 1`, but ISO C standard forbids void pointer arithmetic.",
    hint: "void pointer arithmetic is illegal in ISO C.",
    level: "advanced"
  },
  {
    question: "How do you advance a `void *p` pointer by 16 bytes portably in ISO C?",
    shortAnswer: "Cast to `char*` or `uint8_t*`: `p = (char*)p + 16;`.",
    explanation: "Since `sizeof(char) == 1`, casting allows byte-level precision arithmetic.",
    hint: "Cast to (char*) or (uint8_t*).",
    level: "advanced"
  },
  {
    question: "What is the output of `int arr[] = {10, 20, 30}; int *p = arr; printf(\"%d\", *(p + 2));`?",
    options: ["10", "20", "30", "Garbage"],
    correctAnswer: 2,
    explanation: "`p + 2` points to `arr[2]`; dereferencing yields 30."
  },
  {
    question: "What is the output of `int arr[] = {10, 20, 30}; int *p = arr + 1; printf(\"%d\", p[-1]);`?",
    options: ["10", "20", "30", "Compiler error"],
    correctAnswer: 0,
    explanation: "`p[-1]` evaluates to `*(p - 1)`, which steps back to `arr[0]` (10). Negative pointer indexing is valid in C!",
    level: "advanced"
  },
  {
    question: "Why is negative pointer indexing like `p[-1]` legal in C?",
    shortAnswer: "Because `p[-1]` is defined as `*(p + (-1))`, which shifts the pointer backwards by 1 element.",
    explanation: "As long as the resulting address remains within the allocated array bounds, it is valid.",
    hint: "p[k] is defined strictly as *(p + k).",
    level: "intermediate"
  },
  {
    question: "If `double *p = (double*)0x2000;`, what is the address `p - 2` on an architecture with 8-byte doubles?",
    shortAnswer: "`0x1FF0` (0x2000 - 2 * 8 = 0x2000 - 16 bytes = 0x1FF0).",
    explanation: "Subtracting 16 bytes (0x10 hex) from 0x2000 yields 0x1FF0.",
    hint: "0x2000 - 16 bytes.",
    level: "intermediate"
  },
  {
    question: "How can you traverse an array using two pointers until they meet in the middle?",
    shortAnswer: "`int *left = arr, *right = arr + n - 1; while (left < right) { ... left++; right--; }`",
    explanation: "Classic two-pointer technique for palindromes, reversals, and two-sum problems.",
    hint: "Two pointers converging with while (left < right).",
    level: "basic"
  },
  {
    question: "What is the difference between `sizeof(ptr)` and `sizeof(*ptr)` for `int *ptr`?",
    shortAnswer: "`sizeof(ptr)` is 8 bytes (pointer size); `sizeof(*ptr)` is 4 bytes (`sizeof(int)`).",
    explanation: "Pointer variable vs the data type it points to.",
    hint: "8 bytes vs 4 bytes.",
    level: "basic"
  },
  {
    question: "Can pointer arithmetic be performed on function pointers in C?",
    shortAnswer: "No, function pointer arithmetic is completely illegal in standard C.",
    explanation: "Functions are not array objects and have no well-defined byte size for arithmetic scaling.",
    hint: "Illegal on function pointers.",
    level: "advanced"
  },
  {
    question: "What happens if pointer arithmetic causes an address to wrap around or point outside array boundaries?",
    shortAnswer: "Undefined Behavior (UB).",
    explanation: "Computing an address before the start of an array or beyond one-past-the-end is undefined.",
    hint: "Undefined Behavior.",
    level: "intermediate"
  },
  {
    question: "What format specifier is used in `printf` to print a `ptrdiff_t` value?",
    shortAnswer: "`%td`.",
    explanation: "Standard C99 format specifier for `ptrdiff_t` signed integers.",
    hint: "%td format specifier.",
    level: "basic"
  },
  {
    question: "Why does `char *` arithmetic step by 1 byte while `int *` steps by 4 bytes?",
    shortAnswer: "Because `sizeof(char) == 1` and `sizeof(int) == 4` on modern 32/64-bit systems.",
    explanation: "Pointer arithmetic automatically multiplies integer steps by `sizeof(T)`.",
    hint: "Scaled by sizeof(T).",
    level: "basic"
  }
];

export default questions;
