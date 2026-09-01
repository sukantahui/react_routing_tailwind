const questions = [
  {
    question: "What are the fundamental primitive data types in C?",
    shortAnswer: "The primitive data types are char, int, float, double, and void.",
    explanation: "These represent atomic hardware storage units: char for single-byte character/integer values, int for word-sized integers, float and double for IEEE-754 floating points, and void representing the absence of a value or generic memory.",
    hint: "Think about characters, whole numbers, decimals, and empty types.",
    level: "basic",
    codeExample: "char c = 'Z';\nint i = 50;\nfloat f = 3.14f;\ndouble d = 2.71828;\nvoid *ptr = NULL;"
  },
  {
    question: "What is the memory size of a 'char' in C on any standardized architecture?",
    shortAnswer: "A char is guaranteed by the C standard to be exactly 1 byte (CHAR_BIT bits, typically 8 bits).",
    explanation: "By C language definition, sizeof(char) is always 1. All other type sizes in C are expressed as multiples of sizeof(char).",
    hint: "sizeof(char) is always 1 by C standard definition.",
    level: "basic"
  },
  {
    question: "Why does the size of an 'int' vary across different compiler architectures?",
    shortAnswer: "The size of int is designed to match the native word size of the CPU architecture (2 bytes on 16-bit, 4 bytes on 32-bit and 64-bit).",
    explanation: "In legacy 16-bit DOS (Turbo C), int was 16 bits (2 bytes). In modern 32-bit (ILP32) and 64-bit (LP64/LLP64) systems, int is standard 32 bits (4 bytes).",
    hint: "Native CPU register word size.",
    level: "intermediate"
  },
  {
    question: "What is the difference between LP64 and LLP64 64-bit data models?",
    shortAnswer: "In LP64 (Linux/macOS), 'long' is 64-bit (8 bytes); in LLP64 (Windows 64-bit), 'long' remains 32-bit (4 bytes) while 'long long' is 64-bit.",
    explanation: "This architectural difference means sizeof(long) evaluates to 8 on 64-bit Linux GCC, but evaluates to 4 on 64-bit Windows MSVC/MinGW.",
    hint: "LP64 = Long & Pointer are 64-bit; LLP64 = Long Long & Pointer are 64-bit.",
    level: "advanced"
  },
  {
    question: "What does the sizeof operator return and what is its correct format specifier?",
    shortAnswer: "sizeof returns the size of a type or variable in bytes as an unsigned integer of type size_t, printed using %zu.",
    explanation: "sizeof is evaluated at compile-time (except for variable-length arrays in C99). Printing size_t using %d causes compiler warnings on 64-bit systems; %zu is the standard C99 specifier.",
    hint: "Use %zu for size_t return values.",
    level: "intermediate",
    codeExample: "size_t s = sizeof(int);\nprintf(\"Size of int: %zu bytes\\n\", s);"
  },
  {
    question: "What is the difference between float and double in C?",
    shortAnswer: "float is 4 bytes (32-bit single precision, ~7 decimal digits); double is 8 bytes (64-bit double precision, ~15 decimal digits).",
    explanation: "Both follow the IEEE 754 standard for floating-point representation with sign, exponent, and mantissa fields. float uses 24 bits for mantissa, while double uses 53 bits.",
    hint: "float = single precision (4 bytes); double = double precision (8 bytes).",
    level: "basic"
  },
  {
    question: "What header files provide minimum and maximum range constants in C?",
    shortAnswer: "<limits.h> for integer types and <float.h> for floating-point types.",
    explanation: "<limits.h> defines constants such as CHAR_MIN, INT_MIN, INT_MAX, and ULONG_MAX. <float.h> defines FLT_MIN, FLT_MAX, DBL_DIG, and FLT_EPSILON.",
    hint: "<limits.h> for integers; <float.h> for reals.",
    level: "basic",
    codeExample: "#include <limits.h>\n#include <float.h>\n// INT_MAX = 2147483647\n// FLT_MAX = 3.402823e+38F"
  },
  {
    question: "What is the numeric range of a standard signed 32-bit integer (int)?",
    shortAnswer: "-2,147,483,648 to +2,147,483,647 (-2^31 to 2^31 - 1).",
    explanation: "Using two's complement representation with 32 bits, 1 bit is dedicated to the sign bit and 31 bits represent magnitude.",
    hint: "Approximately -2.14 billion to +2.14 billion.",
    level: "basic"
  },
  {
    question: "What is the range of an unsigned 32-bit integer (unsigned int)?",
    shortAnswer: "0 to 4,294,967,295 (0 to 2^32 - 1).",
    explanation: "Because no bit is reserved for the sign, all 32 bits represent positive magnitude.",
    hint: "0 to ~4.29 billion.",
    level: "basic"
  },
  {
    question: "What happens when an integer exceeds its maximum representable limit (Integer Overflow)?",
    shortAnswer: "Signed integer overflow is undefined behavior (UB); unsigned integer overflow wraps around modulo 2^N.",
    explanation: "For unsigned int, UINT_MAX + 1 wraps back to 0 cleanly. For signed int, overflow is undefined behavior under the C standard, and the compiler may optimize it unpredictably.",
    hint: "Unsigned wraps around safely; signed overflow is dangerous undefined behavior.",
    level: "advanced"
  },
  {
    question: "What is the void data type and what are its primary uses in C?",
    shortAnswer: "void denotes an incomplete type representing no value or unknown memory.",
    explanation: "Used as: 1. Function return type when no value is returned (void func()), 2. Parameter list when no arguments are accepted (int main(void)), 3. Generic raw memory pointer (void *ptr).",
    hint: "No value / generic pointer.",
    level: "basic",
    codeExample: "void logMessage(void) {\n    printf(\"Logged\\n\");\n}\nvoid *rawMemory = malloc(100);"
  },
  {
    question: "Why can you not declare a variable of type void (e.g., void v;)?",
    shortAnswer: "void has an incomplete size (0 bytes), so the compiler cannot allocate physical memory for it.",
    explanation: "Because sizeof(void) is not a concrete storage size, declaring a void variable produces a compiler error.",
    hint: "You cannot instantiate a variable with zero bytes.",
    level: "basic"
  },
  {
    question: "What is a void pointer (void *) and how does it differ from a typed pointer?",
    shortAnswer: "A void* is a generic pointer that can hold the memory address of any data type without type casting.",
    explanation: "A void* cannot be directly dereferenced or used in pointer arithmetic without first casting it to a concrete pointer type (like int* or char*).",
    hint: "Generic memory address container.",
    level: "intermediate",
    codeExample: "int num = 42;\nvoid *vptr = &num;\n// int val = *vptr;         // ERROR: cannot dereference void*\nint val = *(int *)vptr;      // CORRECT"
  },
  {
    question: "What is precision and epsilon in floating-point data types?",
    shortAnswer: "Precision is the count of significant decimal digits; epsilon (FLT_EPSILON) is the smallest positive value such that 1.0 + eps != 1.0.",
    explanation: "Floating point numbers cannot represent every real decimal exactly due to binary fractions. float has ~6-7 digits of precision; double has ~15-17 digits.",
    hint: "Binary rounding errors occur when storing fractional values like 0.1.",
    level: "intermediate"
  },
  {
    question: "Why should equality (==) comparisons between floating point numbers be avoided?",
    shortAnswer: "Due to binary precision rounding errors, computed floats may differ by tiny fractional margins from exact values.",
    explanation: "Instead of `if (a == b)`, systems programmers compare the absolute difference against a threshold: `if (fabs(a - b) < 0.00001f)`.",
    hint: "Use fabs(a - b) < EPSILON.",
    level: "intermediate",
    codeExample: "float a = 0.1f * 3.0f;\nfloat b = 0.3f;\n// Avoid: if (a == b)\nif (fabs(a - b) < 1e-6) { /* Equal */ }"
  },
  {
    question: "What is the ASCII character set and how does 'char' relate to integers in C?",
    shortAnswer: "ASCII maps characters to integers from 0 to 127; in C, char is an 8-bit integral type storing ASCII codes.",
    explanation: "'A' has ASCII 65, 'a' has 97, and '0' has 48. Because char is fundamentally an integer, arithmetic like 'A' + 1 results in 'B' (66).",
    hint: "'char' is an 8-bit integer in C.",
    level: "basic",
    codeExample: "char ch = 'A';\nprintf(\"Char: %c, ASCII: %d\\n\", ch, ch); // 'A', 65"
  },
  {
    question: "Is 'char' signed or unsigned by default in C?",
    shortAnswer: "It is implementation-defined; whether plain 'char' is signed or unsigned depends on the target CPU architecture and compiler.",
    explanation: "On x86_64 GCC, plain char is signed (-128 to 127) by default. On ARM GCC, plain char is often unsigned (0 to 255). Explicitly write 'signed char' or 'unsigned char' when portability matters.",
    hint: "ARM defaults to unsigned; x86 defaults to signed.",
    level: "advanced"
  },
  {
    question: "What is the 'long double' data type and how large is it?",
    shortAnswer: "An extended-precision floating point type occupying 8, 10, 12, or 16 bytes depending on the hardware platform.",
    explanation: "On x86_64 GCC, long double typically utilizes 80-bit x87 extended precision padded to 128 bits (16 bytes). Printed using %Lf.",
    hint: "Extended scientific precision; printed with %Lf.",
    level: "intermediate"
  },
  {
    question: "How does C store boolean values prior to C99, and how in C99+?",
    shortAnswer: "Prior to C99, integers (0 for false, non-zero for true) were used. In C99+, <stdbool.h> introduces bool, true, and false.",
    explanation: "<stdbool.h> defines macro aliases for the built-in primitive type `_Bool`.",
    hint: "#include <stdbool.h> in modern C.",
    level: "basic",
    codeExample: "#include <stdbool.h>\nbool isActive = true;"
  },
  {
    question: "What is memory alignment and why do data types prefer aligned addresses?",
    shortAnswer: "CPUs access memory faster when data of size N is stored at addresses that are multiples of N.",
    explanation: "A 4-byte int is placed at memory addresses divisible by 4. Misaligned access on some CPU architectures causes slowdowns or hardware faults.",
    hint: "Natural memory boundaries for CPU memory buses.",
    level: "advanced"
  },
  {
    question: "What is the difference between 32-bit and 64-bit pointer sizes in C?",
    shortAnswer: "Pointers are 4 bytes (32 bits) on 32-bit systems and 8 bytes (64 bits) on 64-bit systems.",
    explanation: "Pointers must be large enough to address the entire virtual address space (up to 4 GB on 32-bit, up to 16 Exabytes on 64-bit).",
    hint: "sizeof(void*) == 4 on 32-bit; sizeof(void*) == 8 on 64-bit.",
    level: "intermediate"
  },
  {
    question: "What is the format specifier for printing long long integers in printf?",
    shortAnswer: "%lld for signed long long int, and %llu for unsigned long long int.",
    explanation: "long long is guaranteed by C99 to be at least 64 bits (8 bytes) on all platforms.",
    hint: "%lld for signed, %llu for unsigned.",
    level: "basic",
    codeExample: "long long big = 9000000000000000000LL;\nprintf(\"%lld\\n\", big);"
  },
  {
    question: "What is the difference between %f, %e, and %g format specifiers for floating points?",
    shortAnswer: "%f formats in standard decimal notation; %e in scientific exponential notation; %g automatically chooses the shorter of %f or %e.",
    explanation: "printf(\"%.2f\", 123.456) outputs 123.46, whereas %e outputs 1.234560e+02.",
    hint: "%f = decimal, %e = exponential, %g = dynamic.",
    level: "intermediate"
  },
  {
    question: "How does C handle character literals with escape characters like '\\n' or '\\t' in memory?",
    shortAnswer: "Each escape sequence represents a single byte character constant with a specific ASCII value (e.g., '\\n' is ASCII 10).",
    explanation: "Even though written as two characters in source code, the compiler resolves '\\n' to a single 1-byte char with value 10.",
    hint: "sizeof('\\n') is 1 byte in char context (or sizeof(int) in C literal expression).",
    level: "basic"
  },
  {
    question: "What is the difference between signed and unsigned types regarding their bit representations?",
    shortAnswer: "Signed types dedicate the most significant bit (MSB) to sign (0=pos, 1=neg); unsigned types use all bits for positive magnitude.",
    explanation: "An 8-bit signed char stores -128 to +127; an 8-bit unsigned char stores 0 to 255 using the same physical 8 bits of silicon memory.",
    hint: "MSB sign bit vs pure magnitude.",
    level: "basic"
  }
];

export default questions;
