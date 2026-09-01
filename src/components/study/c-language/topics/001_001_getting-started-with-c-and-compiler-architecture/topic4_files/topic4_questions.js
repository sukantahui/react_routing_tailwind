const questions = [
  {
    question: "What is a Format Specifier in C?",
    shortAnswer: "A placeholder sequence beginning with '%' that instructs `printf` or `scanf` how to interpret and convert data types between memory bits and human-readable text.",
    explanation: "Without format specifiers, C functions cannot know whether a 4-byte memory slot represents a signed integer, an unsigned bitfield, a float, or four ASCII characters.",
    hint: "Placeholders like %d, %f, %c, %s.",
    level: "basic",
    codeExample: "printf(\"Integer: %d, Float: %.2f\\n\", 42, 3.14159);"
  },
  {
    question: "What is the general syntax anatomy of a printf format specifier?",
    shortAnswer: "`%[flags][width][.precision][length]specifier`",
    explanation: "Components: Flags (`-`, `+`, `0`, `#`, space), Width (min characters), Precision (`.N`), Length (`h`, `l`, `ll`, `z`), and Specifier type character (`d`, `f`, `s`, `x`, `p`).",
    hint: "%[flags][width][.precision][length]specifier",
    level: "intermediate"
  },
  {
    question: "What is the difference between `%d` and `%i`?",
    shortAnswer: "In `printf`, they behave identically (signed decimal integer); in `scanf`, `%d` always assumes decimal base-10, while `%i` auto-detects octal (`0...`) and hexadecimal (`0x...`) inputs.",
    explanation: "`scanf(\"%i\", &x)` converts `0x1F` to 31, whereas `scanf(\"%d\", &x)` stops parsing at 'x'.",
    hint: "Identical in printf; scanf auto-detects base for %i.",
    level: "intermediate"
  },
  {
    question: "What format specifier is required for `double` in `scanf` vs `printf`?",
    shortAnswer: "In `scanf`, you MUST use `%lf` for `double` and `%f` for `float`; in `printf`, both `%f` and `%lf` print doubles identically (due to default argument promotions).",
    explanation: "`scanf` writes directly to the memory address (`&var`). If you pass `%f` for a double, `scanf` only writes 4 bytes into an 8-byte variable, corrupting memory!",
    hint: "Always use %lf for double in scanf.",
    level: "basic"
  },
  {
    question: "Why is a leading space used in `scanf(\" %c\", &ch)`?",
    shortAnswer: "The leading space instructs `scanf` to skip and discard any leftover whitespace characters (including newlines '\\n' and spaces) lingering in the input buffer.",
    explanation: "Without the leading space, pressing Enter on a prior prompt leaves a '\\n' in the stdin buffer, which `%c` immediately consumes as valid character input, skipping user entry!",
    hint: "Consumes leftover newline in input buffer.",
    level: "basic",
    codeExample: "int id;\nchar grade;\nscanf(\"%d\", &id);\nscanf(\" %c\", &grade); // Space skips the trailing '\\n'!"
  },
  {
    question: "What do `%x` and `%X` do, and what does the `#` flag add?",
    shortAnswer: "`%x` prints unsigned hex in lowercase (e.g. `1a`); `%X` prints in uppercase (e.g. `1A`). The `#` flag (`%#x`, `%#X`) adds the `0x` or `0X` prefix automatically.",
    explanation: "Commonly used when inspecting memory bytes, hardware registers, and color codes.",
    hint: "Hexadecimal output with optional 0x prefix.",
    level: "basic",
    codeExample: "printf(\"%#X\\n\", 255); // Prints 0XFF"
  },
  {
    question: "What format specifier is used to print memory addresses and pointers?",
    shortAnswer: "`%p` (with argument cast to `(void*)`).",
    explanation: "Prints the memory address formatted in implementation-defined hexadecimal (e.g. `0x7ffeefbff568`).",
    hint: "Pointer address format %p.",
    level: "basic",
    codeExample: "int x = 10;\nprintf(\"Address of x: %p\\n\", (void*)&x);"
  },
  {
    question: "What is the difference between `%5d`, `%-5d`, and `%05d`?",
    shortAnswer: "- `%5d`: Right-aligned in a field of 5 characters.\n- `%-5d`: Left-aligned in a field of 5 characters.\n- `%05d`: Right-aligned with leading zeros padded (e.g. `00042`).",
    explanation: "Controls visual tabular alignment in reports and console dashboards.",
    hint: "Right-align, left-align (-), zero-pad (0).",
    level: "basic"
  },
  {
    question: "What does the `.precision` modifier do for integers vs floating-point vs strings?",
    shortAnswer: "- For Integers (`%.5d`): Minimum number of digits to print (pads leading zeros).\n- For Floats (`%.2f`): Number of digits after the decimal point.\n- For Strings (`%.5s`): Maximum number of characters to print from the string.",
    explanation: "Precision has distinct, powerful behaviors across different specifier families.",
    hint: "Min digits for int, decimals for float, max length for string.",
    level: "intermediate"
  },
  {
    question: "How do you pass dynamic width and precision as arguments in `printf`?",
    shortAnswer: "Use the asterisk `*` wildcard: `printf(\"%*.*f\", width, precision, val)`.",
    explanation: "Passes integer variables dynamically into `printf` without hardcoding format numbers in the format string.",
    hint: "%*.*f with runtime width/precision arguments.",
    level: "intermediate",
    codeExample: "int w = 8, p = 3;\nprintf(\"[%*.*f]\\n\", w, p, 3.14159); // Prints [   3.142]"
  },
  {
    question: "What format specifiers are used for 64-bit integer types in C99?",
    shortAnswer: "`%lld` (signed `long long int`) and `%llu` (unsigned `long long int`).",
    explanation: "In `<inttypes.h>`, portable macro constants like `PRId64` and `PRIu64` are also provided.",
    hint: "%lld and %llu.",
    level: "basic"
  },
  {
    question: "What does `%n` do in `printf`?",
    shortAnswer: "It does NOT print anything; instead, it stores the total count of characters written to the output stream so far into an integer pointer variable.",
    explanation: "Used to compute dynamic column offsets and text alignment.",
    hint: "Stores printed character count into int* pointer.",
    level: "advanced",
    codeExample: "int count;\nprintf(\"Hello %s%n\\n\", \"World\", &count);\nprintf(\"Characters written: %d\\n\", count); // count = 11"
  },
  {
    question: "What is a Scanset in `scanf` (e.g. `scanf(\"%[^\n]\", str)`)?",
    shortAnswer: "A pattern matching specifier enclosed in brackets `[...]` that reads characters until encountering characters not in the set (or negated with `^`).",
    explanation: "`%[^\n]` reads an entire line of text including spaces until the Enter key ('\\n') is pressed.",
    hint: "Reads strings with whitespace until delimiter.",
    level: "intermediate",
    codeExample: "char sentence[100];\nprintf(\"Enter sentence: \");\nscanf(\" %99[^\\n]\", sentence); // Reads line safely with spaces!"
  },
  {
    question: "Why should you specify field width when reading strings in `scanf(\"%49s\", buffer)`?",
    shortAnswer: "To prevent Buffer Overflow vulnerabilities when user input exceeds the allocated array capacity.",
    explanation: "Without a width limit (`%s`), entering 200 characters into a 50-byte array will corrupt the stack memory.",
    hint: "Prevents buffer overflow security holes.",
    level: "intermediate"
  },
  {
    question: "What do `%e` and `%E` format specifiers represent?",
    shortAnswer: "Scientific notation with exponential powers of 10 (e.g. `1.234500e+02` or `1.234500E+02`).",
    explanation: "Used in scientific calculations, astronomy, and physics for very large or microscopic numbers.",
    hint: "Exponential scientific notation.",
    level: "basic"
  },
  {
    question: "What do `%g` and `%G` format specifiers do?",
    shortAnswer: "They automatically choose the more compact representation between standard decimal (`%f`) and scientific exponential (`%e`), stripping trailing zeros.",
    explanation: "Ideal for printing values that could be either compact integers or large scientific numbers.",
    hint: "Shortest clean representation without trailing zeros.",
    level: "intermediate"
  },
  {
    question: "What format specifier is used for `size_t` (the return type of `sizeof`)?",
    shortAnswer: "`%zu`",
    explanation: "Introduced in C99 to print `size_t` portably across 32-bit (unsigned int) and 64-bit (unsigned long long) architectures.",
    hint: "%zu for size_t.",
    level: "basic",
    codeExample: "printf(\"Size of int: %zu bytes\\n\", sizeof(int));"
  },
  {
    question: "What format specifier is used for `ptrdiff_t` (pointer difference type)?",
    shortAnswer: "`%td`",
    explanation: "Portably prints the signed integer difference between two pointers.",
    hint: "%td for ptrdiff_t.",
    level: "advanced"
  },
  {
    question: "How do you print a literal percent sign '%' in `printf`?",
    shortAnswer: "Write two consecutive percent signs: `%%`.",
    explanation: "Since '%' is the specifier escape character, `%%` escapes it and prints a single '%'.",
    hint: "Use %% to print a % sign.",
    level: "basic",
    codeExample: "printf(\"Discount: %d%%\\n\", 20); // Prints: Discount: 20%"
  },
  {
    question: "What does the `+` flag do in numeric format specifiers (e.g. `%+d`)?",
    shortAnswer: "Forces `printf` to always print the sign (`+` for positive numbers, `-` for negative numbers).",
    explanation: "Normally, positive numbers print with no sign. `%+d` explicitly shows `+`.",
    hint: "Explicit plus/minus sign printing.",
    level: "basic"
  },
  {
    question: "What does the space `' '` flag do in format specifiers (e.g. `% d`)?",
    shortAnswer: "Prints a leading space for positive numbers so that positive and negative numbers align neatly in tabular columns.",
    explanation: "Leaves a space for positive numbers and prints `-` for negatives.",
    hint: "Space padding for positive numbers.",
    level: "intermediate"
  },
  {
    question: "What does the `h` length modifier represent (e.g. `%hd`, `%hhu`)?",
    shortAnswer: "`%hd` represents `short int`; `%hhd` represents `signed char`; `%hhu` represents `unsigned char`.",
    explanation: "Tells the function that the argument is a half-width or quarter-width integer type.",
    hint: "Short and char modifiers.",
    level: "intermediate"
  },
  {
    question: "What happens if the format specifier does not match the passed argument data type in `printf`?",
    shortAnswer: "It invokes Undefined Behavior (UB), printing garbage data, reading the wrong number of stack bytes, or crashing the program.",
    explanation: "C is not type-safe in variadic functions; `printf` trusts the format string completely.",
    hint: "Mismatched specifiers cause undefined behavior.",
    level: "intermediate"
  },
  {
    question: "What return value does `scanf` provide?",
    shortAnswer: "The total count of input items successfully matched and assigned, or `EOF` (-1) if an input failure occurs before matching.",
    explanation: "Checking `if (scanf(\"%d\", &x) == 1)` is essential for robust input validation.",
    hint: "Returns count of successfully assigned items.",
    level: "basic"
  },
  {
    question: "What return value does `printf` provide?",
    shortAnswer: "The total number of characters successfully written to the output stream, or a negative value if an output error occurred.",
    explanation: "Allows verifying successful terminal output.",
    hint: "Returns total characters printed.",
    level: "basic"
  }
];

export default questions;
