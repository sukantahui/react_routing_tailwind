const questions = [
  {
    question: "What are type modifiers in C?",
    shortAnswer: "Keywords prefixed to basic data types to modify their storage size or signedness range.",
    explanation: "C provides four primary modifiers: signed, unsigned, short, and long (plus long long in C99). They adapt standard types like int, char, and double to specific hardware requirements.",
    hint: "signed, unsigned, short, long.",
    level: "basic",
    codeExample: "unsigned int counter = 100;\nshort int smallVal = 5;"
  },
  {
    question: "What is the difference between signed and unsigned integer types?",
    shortAnswer: "Signed integers can represent positive, zero, and negative values; unsigned integers represent only non-negative values with double the positive range.",
    explanation: "In signed 16-bit short (-32768 to +32767), the MSB is the sign bit. In unsigned 16-bit short (0 to 65535), all 16 bits represent positive numerical magnitude.",
    hint: "Signed has negative values; unsigned has double positive range.",
    level: "basic"
  },
  {
    question: "How does two's complement represent negative numbers in signed types?",
    shortAnswer: "A negative number is represented by inverting all bits of its positive counterpart and adding 1.",
    explanation: "For example, in 8-bit signed char, +5 is 00000101. Inverting yields 11111010, and adding 1 yields 11111011 (-5). This allows CPU hardware to perform subtraction using standard addition circuitry.",
    hint: "Two's complement = Invert bits (one's complement) + 1.",
    level: "intermediate"
  },
  {
    question: "Why were exact-width integer types introduced in <stdint.h> in C99?",
    shortAnswer: "To provide platform-independent integer types with guaranteed bit widths across all hardware architectures.",
    explanation: "Because the size of `int` and `long` varies between 16-bit, 32-bit, and 64-bit platforms, <stdint.h> defines explicit types like int8_t, int16_t, int32_t, int64_t, uint8_t, uint16_t, uint32_t, and uint64_t.",
    hint: "Predictable, portable bit sizes across compilers.",
    level: "intermediate",
    codeExample: "#include <stdint.h>\nuint32_t ip = 0xC0A80001; // Exactly 32 bits on all platforms"
  },
  {
    question: "What happens when an unsigned integer overflows or underflows?",
    shortAnswer: "It performs defined modular arithmetic (modulo 2^N) and wraps around safely without undefined behavior.",
    explanation: "If a uint8_t holds 255 and is incremented by 1, it becomes 0. If a uint8_t holds 0 and is decremented by 1, it wraps to 255. This is well-defined by the C standard.",
    hint: "Modular wrap-around behavior.",
    level: "basic",
    codeExample: "uint8_t x = 255;\nx++; // x is now 0"
  },
  {
    question: "Why is signed integer overflow considered dangerous in C?",
    shortAnswer: "Signed integer overflow is Undefined Behavior (UB) according to the ISO C standard.",
    explanation: "Because signed overflow is UB, the compiler is allowed to assume it never happens and may optimize away security boundary checks or cause unpredictable runtime crashes.",
    hint: "Never rely on signed integer overflow wrapping.",
    level: "advanced"
  },
  {
    question: "What is the purpose of the <inttypes.h> header in C99?",
    shortAnswer: "It provides standardized printf/scanf format macros (like PRId32, PRIu64) for <stdint.h> types.",
    explanation: "Because the underlying typedef for int32_t might be `int` or `long` depending on the platform, <inttypes.h> macros expand to the correct format string specifier.",
    hint: "Platform-safe printf format specifiers for stdint types.",
    level: "intermediate",
    codeExample: "#include <inttypes.h>\nint64_t val = 5000000000LL;\nprintf(\"Value: %\" PRId64 \"\\n\", val);"
  },
  {
    question: "What is size_t and what header defines it?",
    shortAnswer: "An unsigned integer type capable of representing the size of any object in memory, defined in <stddef.h>, <stdio.h>, and <stdlib.h>.",
    explanation: "size_t is 32 bits on 32-bit systems and 64 bits on 64-bit systems. It is the return type of sizeof and the type for array indices/memory buffer lengths.",
    hint: "Unsigned memory size type; printed using %zu.",
    level: "basic"
  },
  {
    question: "What is ptrdiff_t and uintptr_t in C?",
    shortAnswer: "ptrdiff_t is a signed integer resulting from pointer subtraction; uintptr_t is an unsigned integer large enough to store a pointer address.",
    explanation: "uintptr_t (from <stdint.h>) allows safe casting of pointer addresses into integers for bitwise masking without losing high-order address bits.",
    hint: "Pointer arithmetic and memory address containers.",
    level: "advanced",
    codeExample: "#include <stdint.h>\nint num = 10;\nuintptr_t addr = (uintptr_t)&num;"
  },
  {
    question: "Can type modifiers be applied to floating-point types (float and double)?",
    shortAnswer: "Only 'long' can be applied to 'double' (creating 'long double'); 'signed', 'unsigned', and 'short' cannot be applied to float or double.",
    explanation: "The C grammar does not permit signed float or unsigned double because IEEE-754 floating-point format inherently includes a sign bit.",
    hint: "Only 'long double' is valid for floats.",
    level: "intermediate"
  },
  {
    question: "What is the short form of 'unsigned int' and 'short int' in C declarations?",
    shortAnswer: "'unsigned' implies 'unsigned int'; 'short' implies 'short int'; 'long' implies 'long int'.",
    explanation: "In C, omitting the word 'int' when using a type modifier is completely valid shorthand syntax.",
    hint: "unsigned x; is identical to unsigned int x;",
    level: "basic",
    codeExample: "unsigned u = 50;  // equivalent to unsigned int u = 50;\nshort s = 10;     // equivalent to short int s = 10;"
  },
  {
    question: "What is the format specifier for printing short integers in printf?",
    shortAnswer: "%hd for signed short int, and %hu for unsigned short int.",
    explanation: "The 'h' modifier flag tells printf to interpret the passed integer argument as a 16-bit half-word.",
    hint: "%hd for signed short, %hu for unsigned short.",
    level: "basic"
  },
  {
    question: "What is the format specifier for printing long integers in printf?",
    shortAnswer: "%ld for signed long int, and %lu for unsigned long int.",
    explanation: "The 'l' modifier informs printf that the argument is a long integer (32 or 64 bits depending on OS).",
    hint: "%ld for signed long, %lu for unsigned long.",
    level: "basic"
  },
  {
    question: "What are int_fastN_t and int_leastN_t types in <stdint.h>?",
    shortAnswer: "int_fastN_t is the fastest integer type of at least N bits; int_leastN_t is the smallest integer type of at least N bits.",
    explanation: "For example, on a 64-bit CPU, int_fast8_t might be mapped to a 64-bit register for maximum ALU speed, while int_least8_t is mapped to an 8-bit byte to save RAM.",
    hint: "Speed optimization vs memory compactness.",
    level: "advanced"
  },
  {
    question: "What is the format specifier for printing uint8_t with printf?",
    shortAnswer: "Cast to unsigned int with %u, or use PRIu8 macro from <inttypes.h>.",
    explanation: "Because uint8_t is promoted to int when passed to variadic functions like printf, %u or %d works cleanly with a cast.",
    hint: "Use %u with (unsigned int) cast or PRIu8.",
    level: "intermediate",
    codeExample: "uint8_t byte = 200;\nprintf(\"Byte: %u\\n\", (unsigned int)byte);"
  },
  {
    question: "What is the range of uint16_t and where is it commonly used?",
    shortAnswer: "0 to 65,535; commonly used for networking port numbers (e.g. HTTP 80, HTTPS 443), image dimensions, and audio samples.",
    explanation: "Since TCP/UDP ports are 16-bit integers, uint16_t is the standard data type used in socket programming across all operating systems.",
    hint: "16-bit unsigned integer (2^16 = 65,536 values).",
    level: "basic"
  },
  {
    question: "What is the range of int8_t?",
    shortAnswer: "-128 to +127.",
    explanation: "int8_t uses exactly 8 bits in two's complement format: 1 sign bit and 7 magnitude bits.",
    hint: "-2^7 to (2^7 - 1).",
    level: "basic"
  },
  {
    question: "What is the range of uint32_t and where is it used?",
    shortAnswer: "0 to 4,294,967,295; widely used for IPv4 addresses, Unix epoch timestamps, and file offsets under 4 GB.",
    explanation: "An IPv4 address like 192.168.1.1 is represented in memory as a single 32-bit unsigned integer.",
    hint: "32-bit network and memory address fields.",
    level: "basic"
  },
  {
    question: "What is the range of uint64_t and where is it used?",
    shortAnswer: "0 to 18,446,744,073,709,551,615; used for large file sizes (>4 GB), database primary keys, and cryptography hashes.",
    explanation: "uint64_t provides 64 bits of storage (18.4 quintillion values), making it suitable for modern large-scale system timestamps in nanoseconds.",
    hint: "64-bit massive numeric range.",
    level: "basic"
  },
  {
    question: "What happens when you mix signed and unsigned integers in an arithmetic comparison?",
    shortAnswer: "The signed integer is implicitly converted to an unsigned integer, which can cause unexpected comparison bugs.",
    explanation: "In `int a = -1; unsigned int b = 1; if (a < b)`, -1 converts to 4,294,967,295U, making the condition evaluate to FALSE!",
    hint: "Signed values convert to large unsigned numbers during mixed comparisons.",
    level: "advanced",
    codeExample: "int a = -1;\nunsigned int b = 1;\nif (a < b) { /* NOT REACHED: -1 becomes 4294967295U */ }"
  },
  {
    question: "What is the difference between uint_least32_t and uint32_t?",
    shortAnswer: "uint32_t must be exactly 32 bits (and is omitted if the architecture lacks native 32-bit support); uint_least32_t is guaranteed to exist with at least 32 bits.",
    explanation: "On rare DSP chips with only 48-bit words, uint32_t is not available, but uint_least32_t will map to the 48-bit word.",
    hint: "Exact-width vs minimum guaranteed width.",
    level: "advanced"
  },
  {
    question: "What is the macro INT32_C and UINT64_C in <stdint.h>?",
    shortAnswer: "Literal constant constructor macros that append the correct compiler suffix to integer constants.",
    explanation: "Writing `INT32_C(100)` or `UINT64_C(5000000000)` ensures literal constants have the exact type required by the architecture.",
    hint: "Portable literal creation macros.",
    level: "advanced"
  },
  {
    question: "Why should loop counters with descending conditions avoid unsigned types?",
    shortAnswer: "An unsigned integer never becomes negative, so `for (unsigned int i = 5; i >= 0; i--)` results in an infinite loop.",
    explanation: "When i reaches 0, `i--` wraps around to UINT_MAX (4,294,967,295), which is still >= 0, causing the loop to never terminate.",
    hint: "Unsigned integers can never be < 0.",
    level: "intermediate",
    codeExample: "// BUG:\n// for (unsigned int i = 5; i >= 0; i--) { ... }\n// FIX:\nfor (int i = 5; i >= 0; i--) { ... }"
  },
  {
    question: "What is the maximum value macro for size_t?",
    shortAnswer: "SIZE_MAX, defined in <stdint.h>.",
    explanation: "SIZE_MAX represents the maximum addressable memory allocation size in bytes on the current platform.",
    hint: "Upper bound for malloc allocations.",
    level: "intermediate"
  },
  {
    question: "How do type modifiers impact structure alignment and memory padding in C?",
    shortAnswer: "Fields with larger type modifiers (like uint64_t) require wider memory alignment boundaries, causing the compiler to insert padding bytes.",
    explanation: "Placing a uint8_t followed by a uint64_t in a struct introduces 7 bytes of padding on a 64-bit CPU to align the uint64_t to an 8-byte boundary.",
    hint: "Padding bytes ensure natural alignment.",
    level: "advanced"
  }
];

export default questions;
