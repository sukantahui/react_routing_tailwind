const questions = [
  {
    question: "What is the difference between Implicit Type Conversion (Coercion) and Explicit Type Casting in C?",
    shortAnswer: "Implicit conversion is performed automatically by the compiler to prevent data loss or match operation rules; explicit casting is forced manually by the programmer using `(type)value` syntax.",
    explanation: "Implicit conversion happens automatically when adding an `int` and a `float` (the int is converted to float). Explicit casting is required when the programmer wants intentional truncation or conversion.",
    hint: "Automatic compiler coercion vs manual (type) syntax.",
    level: "basic",
    codeExample: "int i = 5;\nfloat f = i + 2.5f; // Implicit: i promoted to float\nint truncated = (int)3.99f; // Explicit: forced to 3"
  },
  {
    question: "What is Integer Promotion in C?",
    shortAnswer: "Small integer types (char, signed char, unsigned char, short, unsigned short) are automatically promoted to 'int' (or 'unsigned int') in all arithmetic expressions.",
    explanation: "Because CPU ALUs operate most efficiently on full machine word registers, C automatically promotes sub-word integer types before performing calculations.",
    hint: "Types smaller than int become int during operations.",
    level: "intermediate"
  },
  {
    question: "What are the Usual Arithmetic Conversions in C?",
    shortAnswer: "A set of hierarchy rules that promote operands of differing types to a common common type before evaluating a binary operator.",
    explanation: "Hierarchy: int -> unsigned int -> long -> unsigned long -> long long -> unsigned long long -> float -> double -> long double.",
    hint: "Smaller/narrower types are promoted upwards to match the wider operand.",
    level: "intermediate"
  },
  {
    question: "Why does `int a = -1; unsigned int b = 1; if (a < b)` evaluate to FALSE in C?",
    shortAnswer: "Under Usual Arithmetic Conversions, signed `int` is implicitly converted to `unsigned int`. -1 becomes 4,294,967,295U, which is greater than 1U.",
    explanation: "This is one of the most dangerous bugs in systems programming. When comparing mixed signed and unsigned values, the signed operand is converted to unsigned representation.",
    hint: "-1 becomes UINT_MAX (4.29 billion) during unsigned comparison.",
    level: "advanced",
    codeExample: "int a = -1;\nunsigned int b = 1;\n// a < b is FALSE because (unsigned int)-1 == 4294967295U"
  },
  {
    question: "Why does `float res = 7 / 2;` store 3.0 instead of 3.5 in C?",
    shortAnswer: "Both 7 and 2 are integer literals, so `7 / 2` performs integer division yielding 3. The value 3 is then promoted to 3.0f upon assignment.",
    explanation: "To obtain decimal precision, at least one operand must be a float or casted: `(float)7 / 2` or `7.0f / 2`.",
    hint: "Integer division truncates the fractional part before assignment happens.",
    level: "basic",
    codeExample: "float correct = (float)7 / 2; // 3.5f\nfloat wrong = 7 / 2;          // 3.0f"
  },
  {
    question: "What is truncation in explicit type casting?",
    shortAnswer: "The loss of fractional parts when casting from float/double to int, or the loss of upper bits when casting from a wider integer to a narrower integer.",
    explanation: "Casting `(int)3.999f` discards the decimal fraction entirely, leaving 3. Casting `(uint8_t)0x1234` discards `0x12`, keeping only `0x34`.",
    hint: "Discards decimal fractions or high-order bits.",
    level: "basic"
  },
  {
    question: "What is pointer typecasting in C?",
    shortAnswer: "Reinterpreting the memory address of one data type as pointing to another data type: `(target_type *)ptr`.",
    explanation: "Allows low-level memory inspection (e.g. casting `int *` to `uint8_t *` to inspect individual bytes of an integer in RAM).",
    hint: "Reinterprets raw memory bytes.",
    level: "intermediate",
    codeExample: "uint32_t val = 0x11223344;\nuint8_t *bytePtr = (uint8_t *)&val;\n// *bytePtr reads the first byte in memory"
  },
  {
    question: "What is strict aliasing rule in modern C compilers?",
    shortAnswer: "A compiler optimization rule stating that two pointers of different types cannot point to the same memory location (with char* being the sole exception).",
    explanation: "Violating strict aliasing by casting incompatible pointers (e.g. `float *fp = (float*)&int_var;`) causes GCC optimization passes (`-O2`/`-O3`) to produce unexpected output. Always use `char*` or a `union` for type punning.",
    hint: "char* and uint8_t* are universally allowed to alias any memory.",
    level: "advanced"
  },
  {
    question: "What is Little-Endian vs Big-Endian architecture?",
    shortAnswer: "Little-Endian stores the least significant byte (LSB) at the lowest memory address; Big-Endian stores the most significant byte (MSB) at lowest address.",
    explanation: "x86_64 and ARM processors are typically Little-Endian. For value 0x12345678, byte 0 in RAM contains 0x78 on Little-Endian systems.",
    hint: "x86_64 is Little-Endian: LSB first in memory.",
    level: "intermediate"
  },
  {
    question: "What is the format specifier to print a generic pointer address in printf?",
    shortAnswer: "%p, passing the pointer casted to (void *).",
    explanation: "The C standard mandates casting pointers to `(void *)` when passing them to `%p` in printf for portable address output.",
    hint: "%p with (void *)ptr.",
    level: "basic",
    codeExample: "int x = 10;\nprintf(\"Address: %p\\n\", (void *)&x);"
  },
  {
    question: "What happens when you cast a negative signed integer to an unsigned type of the same size?",
    shortAnswer: "The bit pattern remains identical, but the MSB is interpreted as positive binary weight instead of a sign bit.",
    explanation: "In 32-bit two's complement, -1 is `0xFFFFFFFF`. Casted to `unsigned int`, `0xFFFFFFFF` represents 4,294,967,295.",
    hint: "Bit pattern is preserved; interpretation changes.",
    level: "intermediate"
  },
  {
    question: "What is narrowing conversion (or downcasting) and what risk does it carry?",
    shortAnswer: "Converting a wider type to a narrower type (e.g. long to short), risking data loss if the value exceeds the target type's range.",
    explanation: "Casting 70,000 to `int16_t` (max 32,767) causes high-order bit truncation, producing an unexpected negative or wrapped value.",
    hint: "Truncation of significant high-order bits.",
    level: "intermediate"
  },
  {
    question: "What is widening conversion (or upcasting)?",
    shortAnswer: "Converting a narrower type to a wider type (e.g. int16_t to int32_t), which is always safe and lossless.",
    explanation: "For signed types, sign-extension replicates the sign bit into high-order bytes. For unsigned types, zero-extension fills high-order bytes with zeros.",
    hint: "Sign-extension or zero-extension without data loss.",
    level: "basic"
  },
  {
    question: "What is Sign Extension in signed type promotion?",
    shortAnswer: "When promoting a signed integer to a wider type, the sign bit (MSB) is replicated across all newly added upper bits.",
    explanation: "In 8-bit signed char, -5 is `0xFB` (11111011). When promoted to 32-bit int, sign extension produces `0xFFFFFFFB` to preserve value -5.",
    hint: "Replicates the 1 or 0 sign bit to maintain negative magnitude.",
    level: "intermediate"
  },
  {
    question: "What is Zero Extension in unsigned type promotion?",
    shortAnswer: "When promoting an unsigned integer to a wider type, all newly added upper bits are filled with zeros.",
    explanation: "In 8-bit unsigned char, 251 is `0xFB`. When promoted to 32-bit int, zero extension produces `0x000000FB` (+251).",
    hint: "Upper bits are padded with 0s.",
    level: "intermediate"
  },
  {
    question: "How does C handle type conversion in ternary expressions (condition ? a : b)?",
    shortAnswer: "The types of both branches `a` and `b` undergo usual arithmetic conversions to determine a unified common result type.",
    explanation: "In `(flag) ? 10 : 3.5f`, because 3.5f is float, integer 10 is implicitly converted to 10.0f, and the ternary expression always returns float.",
    hint: "Both branches are converted to a common type.",
    level: "intermediate"
  },
  {
    question: "What happens when casting a pointer to an integer of insufficient size (e.g. pointer to int on 64-bit)?",
    shortAnswer: "Upper address bits are truncated, corrupting the memory address and triggering compiler warnings.",
    explanation: "On 64-bit systems, pointers are 8 bytes while `int` is 4 bytes. Always use `uintptr_t` or `intptr_t` from `<stdint.h>` when converting pointers to integers.",
    hint: "Use uintptr_t to store pointers safely.",
    level: "advanced"
  },
  {
    question: "What is the difference between casting a variable vs casting a dereferenced pointer?",
    shortAnswer: "`(float)x` converts the numeric value; `*(float *)&x` reinterprets the raw memory bits as IEEE-754 floating point format.",
    explanation: "If x = 10, `(float)x` yields 10.0f. But `*(float*)&x` treats binary 0x0000000A as a float representation, yielding a subnormal near-zero float value!",
    hint: "Value conversion vs raw bit reinterpretation.",
    level: "advanced"
  },
  {
    question: "Why should we avoid casting the return value of malloc() in C?",
    shortAnswer: "In standard C, void* converts implicitly to any pointer type, and explicit casting can mask missing #include <stdlib.h> header bugs in C89.",
    explanation: "Writing `int *p = malloc(10 * sizeof(int));` is cleaner, safer, and standard in C.",
    hint: "void* converts implicitly in C without casting.",
    level: "intermediate"
  },
  {
    question: "What is type punning in C?",
    shortAnswer: "Accessing the same memory location through two different types to inspect or manipulate its binary representation.",
    explanation: "Commonly done using unions (e.g. union { float f; uint32_t u; } pun;) or `char*` pointer casts.",
    hint: "Union-based binary inspection.",
    level: "advanced"
  },
  {
    question: "What is integer promotion rules for bitwise shift operands?",
    shortAnswer: "Both left and right operands undergo integer promotion independently; the type of the result is that of the promoted left operand.",
    explanation: "In `uint8_t a = 1; auto res = a << 4;`, `a` is promoted to `int` before shifting, so `res` is of type `int`.",
    hint: "Left operand type after promotion determines result type.",
    level: "advanced"
  },
  {
    question: "Why does `char c = 250;` produce a negative number on x86 GCC?",
    shortAnswer: "Because plain `char` is signed by default on x86 (-128 to 127); 250 in 8-bit binary is 11111010, which represents -6 in two's complement.",
    explanation: "To store 250 safely in an 8-bit variable without sign conversion, declare it as `unsigned char` or `uint8_t`.",
    hint: "Values > 127 wrap to negative numbers in signed 8-bit char.",
    level: "basic"
  },
  {
    question: "Can an enum be explicitly cast to an integer in C?",
    shortAnswer: "Yes, though enum values are already integers under the hood, explicit casting like `(int)myEnum` is completely valid.",
    explanation: "Enums are integral types in C and can be freely converted to `int`, `unsigned int`, or other integer types.",
    hint: "Enums are integers in C.",
    level: "basic"
  },
  {
    question: "What is the difference between explicit casting and round() in floating to integer conversions?",
    shortAnswer: "Explicit casting `(int)f` truncates toward zero (3.9 -> 3); `round(f)` rounds to the nearest mathematical integer (3.9 -> 4.0).",
    explanation: "To round properly before casting, use `(int)round(f)` with `<math.h>`.",
    hint: "Casting truncates; round() finds the nearest whole number.",
    level: "basic"
  },
  {
    question: "What is default argument promotion in C variadic functions (like printf)?",
    shortAnswer: "float arguments are promoted to double; char and short are promoted to int when passed to variadic functions with '...'.",
    explanation: "This is why printf `%f` handles both float and double interchangeably, because float is always upgraded to double when passed to printf.",
    hint: "Variadic functions promote float to double and small integers to int.",
    level: "advanced"
  }
];

export default questions;
