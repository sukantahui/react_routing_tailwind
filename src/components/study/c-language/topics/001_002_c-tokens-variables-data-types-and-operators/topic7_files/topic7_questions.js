// src/components/study/c-language/topics/001_002_c-tokens-variables-data-types-and-operators/topic7_files/topic7_questions.js

export const questions = [
  {
    "question": "What is defined as the smallest individual unit of a C program that the compiler recognizes?",
    "options": [
      "Statement",
      "Token",
      "Instruction",
      "Expression"
    ],
    "answerIndex": 1,
    "explanation": "A token is the smallest individual unit of a C program that cannot be broken down further by the lexical analyzer (lexer)."
  },
  {
    "question": "How many categories of tokens are recognized in standard C language?",
    "options": [
      "4",
      "5",
      "6",
      "8"
    ],
    "answerIndex": 2,
    "explanation": "C tokens are classified into 6 distinct categories: Keywords, Identifiers, Constants, Strings, Special Symbols, and Operators."
  },
  {
    "question": "How many standard reserved keywords were specified in original C89/C90 standard?",
    "options": [
      "24",
      "32",
      "48",
      "60"
    ],
    "answerIndex": 1,
    "explanation": "ANSI C89/C90 specified exactly 32 reserved keywords (such as int, return, if, else, struct, volatile, etc.)."
  },
  {
    "question": "Which of the following is a valid keyword introduced in C99 standard?",
    "options": [
      "_Bool",
      "boolean",
      "bool_t",
      "Boolean"
    ],
    "answerIndex": 0,
    "explanation": "C99 introduced _Bool as a primitive boolean keyword (along with inline, restrict, and _Complex). The header <stdbool.h> defines bool as a macro for _Bool."
  },
  {
    "question": "Which of the following is NOT a reserved keyword in C89?",
    "options": [
      "volatile",
      "register",
      "sizeof",
      "subroutine"
    ],
    "answerIndex": 3,
    "explanation": "'subroutine' is not a keyword in C. Keywords in C include volatile, register, and sizeof."
  },
  {
    "question": "Which character is NOT permitted inside a valid C identifier name?",
    "options": [
      "Underscore (_)",
      "Dollar sign ($)",
      "Uppercase letter (A-Z)",
      "Digit (0-9)"
    ],
    "answerIndex": 1,
    "explanation": "Standard C allows letters, digits, and underscores in identifiers. The dollar sign ($) is non-standard, though supported by some GCC extensions."
  },
  {
    "question": "What happens if an identifier in C starts with a numeric digit (e.g., 2num)?",
    "options": [
      "It is treated as a floating-point constant",
      "It causes a compiler syntax error",
      "It is automatically renamed by GCC",
      "It creates a runtime exception"
    ],
    "answerIndex": 1,
    "explanation": "C identifier naming rules strictly forbid identifiers from starting with a numeric digit. Starting with a digit causes a compiler error during lexical analysis."
  },
  {
    "question": "Is C language case-sensitive regarding identifiers and keywords?",
    "options": [
      "No, Total_Amount and total_amount are identical",
      "Yes, Total_Amount and total_amount represent two completely distinct identifiers",
      "Case sensitivity depends on operating system",
      "Only keywords are case-sensitive"
    ],
    "answerIndex": 1,
    "explanation": "C is strictly case-sensitive. Uppercase and lowercase letters are treated as completely distinct characters by the compiler."
  },
  {
    "question": "Which rule applies to identifiers beginning with a double underscore (e.g., __val) or an underscore followed by an uppercase letter (e.g., _Val)?",
    "options": [
      "They are standard user variables",
      "They are reserved for compiler implementations and system libraries",
      "They trigger compiler warnings automatically",
      "They are allocated on heap memory"
    ],
    "answerIndex": 1,
    "explanation": "ISO C reserves identifiers starting with two underscores or an underscore followed by an uppercase letter for compiler internals, implementation, and standard library headers."
  },
  {
    "question": "What is the Maximal Munch rule used by the C lexical analyzer?",
    "options": [
      "The lexer reads memory until stack memory is full",
      "The lexer always matches the longest possible sequence of characters that forms a valid token",
      "The lexer converts all tokens into uppercase",
      "The lexer discards all comments first"
    ],
    "answerIndex": 1,
    "explanation": "Maximal Munch (or longest match rule) specifies that the lexer processes characters left-to-right and constructs the longest token possible from the stream of input characters."
  },
  {
    "question": "How does the C compiler treat the expression 'a+++b' according to the Maximal Munch rule?",
    "options": [
      "(a) + (++b)",
      "(a++) + (b)",
      "(a) + (+) + (b)",
      "Syntax error"
    ],
    "answerIndex": 1,
    "explanation": "Due to Maximal Munch, the compiler picks '++' first as the longest valid token, parsing 'a+++b' as '(a++) + (b)'."
  },
  {
    "question": "Which of the following introduced the single-line comment format '//' into standard C?",
    "options": [
      "C89",
      "C99",
      "K&R C",
      "C17"
    ],
    "answerIndex": 1,
    "explanation": "Single-line comments starting with '//' were originally from C++, and were officially adopted into standard C starting with C99."
  },
  {
    "question": "Can multi-line comments '/* ... */' be nested in standard C?",
    "options": [
      "Yes, unconditionally",
      "No, the first closing '*/' terminates the comment block regardless of nesting",
      "Yes, if compiled with GCC -O3",
      "Only inside main() function"
    ],
    "answerIndex": 1,
    "explanation": "Standard C does not support nested block comments. The first '*/' encountered will close the entire block comment, leaving trailing text as invalid C syntax."
  },
  {
    "question": "Which of the following is a valid C identifier?",
    "options": [
      "default",
      "break",
      "_myVariable_1",
      "return-value"
    ],
    "answerIndex": 2,
    "explanation": "'_myVariable_1' is a valid identifier. 'default' and 'break' are reserved keywords, and 'return-value' contains a hyphen operator."
  },
  {
    "question": "Which C standard introduced the '_Static_assert' and '_Thread_local' keywords?",
    "options": [
      "C89",
      "C99",
      "C11",
      "C23"
    ],
    "answerIndex": 2,
    "explanation": "C11 introduced _Static_assert, _Thread_local, _Alignas, _Alignof, _Atomic, and _Generic keywords."
  },
  {
    "question": "What is a trigraph sequence in classic C standard?",
    "options": [
      "A sequence of 3 instructions",
      "A 3-character sequence starting with '??' used to represent missing punctuation characters on legacy keyboards",
      "A method for 3D graphic rendering",
      "A three-variable assignment"
    ],
    "answerIndex": 1,
    "explanation": "Trigraphs were 3-character sequences beginning with '??' (e.g. ??= for #, ??( for [) designed for legacy keyboards lacking certain ISO 646 symbols. They were deprecated in C11 and removed in C23."
  },
  {
    "question": "Which symbol is classified as a special symbol token in C rather than an operator?",
    "options": [
      "+",
      "==",
      ";",
      "*"
    ],
    "answerIndex": 2,
    "explanation": "The semicolon ';' is a special symbol (punctuator/delimiter) that marks statement termination. '+', '==', and '*' are operators."
  },
  {
    "question": "What happens to white space characters (spaces, tabs, newlines) outside string literals during C tokenization?",
    "options": [
      "They generate empty tokens",
      "They are used as token delimiters and otherwise ignored by the lexer",
      "They cause syntax errors",
      "They are converted into null bytes"
    ],
    "answerIndex": 1,
    "explanation": "White spaces serve as delimiters separating adjacent tokens (such as keywords and identifiers) and are otherwise discarded by the preprocessor/lexer."
  },
  {
    "question": "Which of the following is NOT a keyword in C23 standard?",
    "options": [
      "nullptr",
      "true",
      "false",
      "function"
    ],
    "answerIndex": 3,
    "explanation": "C23 added nullptr, true, false, static_assert, and bool as first-class keywords. 'function' is NOT a keyword in C."
  },
  {
    "question": "In C, what is the maximum recommended length of an identifier according to ANSI C89 for guaranteed internal compiler distinction?",
    "options": [
      "8 characters",
      "31 characters",
      "63 characters",
      "255 characters"
    ],
    "answerIndex": 1,
    "explanation": "C89 guaranteed that at least the first 31 characters of internal identifiers are significant and distinguished by compilers (C99 expanded this to 63)."
  },
  {
    "question": "Which of the following identifier names will result in a compiler error?",
    "options": [
      "int_val",
      "float_val",
      "double",
      "_100_percent"
    ],
    "answerIndex": 2,
    "explanation": "'double' is a reserved primitive data type keyword in C, so it cannot be reused as a variable identifier name."
  },
  {
    "question": "What category of token does the literal \"Coder & AccoTax\" belong to?",
    "options": [
      "Identifier",
      "Keyword",
      "String Literal Constant",
      "Special Symbol"
    ],
    "answerIndex": 2,
    "explanation": "Characters enclosed within double quotes represent a String Literal Constant token in C."
  },
  {
    "question": "Which of the following is considered an external identifier limit guarantee in C89 standard?",
    "options": [
      "6 characters (case-insensitive in legacy linkers)",
      "31 characters (case-sensitive)",
      "64 characters",
      "128 characters"
    ],
    "answerIndex": 0,
    "explanation": "C89 legacy rules guaranteed only 6 characters for external linkage identifiers (and potentially case-insensitive) due to hardware/linker restrictions of the era."
  },
  {
    "question": "What is the default return type of an undeclared identifier in pre-C99 legacy C (K&R style)?",
    "options": [
      "void",
      "int",
      "char",
      "float"
    ],
    "answerIndex": 1,
    "explanation": "In legacy K&R C, undeclared functions or variables defaulted implicitly to 'int'. C99 removed implicit int declaration."
  },
  {
    "question": "Which header file provides macro definitions for bool, true, and false in C99?",
    "options": [
      "<stdio.h>",
      "<stdlib.h>",
      "<stdbool.h>",
      "<stddef.h>"
    ],
    "answerIndex": 2,
    "explanation": "<stdbool.h> defines 'bool' to '_Bool', 'true' to 1, and 'false' to 0."
  },
  {
    "question": "Is 'main' a reserved keyword in C?",
    "options": [
      "Yes, it is a primary keyword",
      "No, main is an identifier (the standard entry point function name), not a C keyword",
      "Yes, but only in C99",
      "No, it is a preprocessor directive"
    ],
    "answerIndex": 1,
    "explanation": "'main' is an identifier representing the standard entry point function of a C program, NOT a reserved C keyword."
  },
  {
    "question": "Which of the following is a valid character constant token?",
    "options": [
      "'A'",
      "\"A\"",
      "A",
      "''"
    ],
    "answerIndex": 0,
    "explanation": "A character constant token is enclosed in single quotes, such as 'A'."
  },
  {
    "question": "What is the token type of the operator 'sizeof' in C?",
    "options": [
      "Function identifier",
      "Keyword and Unary Operator",
      "Macro replacement",
      "Special Symbol"
    ],
    "answerIndex": 1,
    "explanation": "'sizeof' is both a reserved keyword and a built-in unary operator in C."
  },
  {
    "question": "Which C standard introduced the '_Generic' keyword for type-generic macro selection?",
    "options": [
      "C89",
      "C99",
      "C11",
      "C23"
    ],
    "answerIndex": 2,
    "explanation": "_Generic was introduced in C11 to allow compile-time type-based dispatch in macros."
  },
  {
    "question": "Which of the following is NOT a valid C token category?",
    "options": [
      "Operator",
      "Comment",
      "Constant",
      "Identifier"
    ],
    "answerIndex": 1,
    "explanation": "Comments are stripped during preprocessing/lexing and do NOT form C tokens."
  },
  {
    "question": "Which of the following is classified as a primary (primitive) data type in C?",
    "options": [
      "Array",
      "Pointer",
      "int",
      "struct"
    ],
    "answerIndex": 2,
    "explanation": "int, float, double, char, and void are primary (primitive) data types. Arrays, pointers, and structs are derived/user-defined types."
  },
  {
    "question": "What is the exact definition of 1 byte in C language standard?",
    "options": [
      "Always 8 bits on every system",
      "The memory size required to hold a single character (CHAR_BIT bits)",
      "4 bits",
      "16 bits"
    ],
    "answerIndex": 1,
    "explanation": "In C standard, a byte is defined as the unit of data storage required to hold a single character (CHAR_BIT bits, defined in <limits.h>, typically 8)."
  },
  {
    "question": "What is the standard size of a 'char' data type in C on all compliant architectures?",
    "options": [
      "Always 1 byte (sizeof(char) == 1)",
      "2 bytes",
      "4 bytes",
      "Varies between 1 and 4 bytes"
    ],
    "answerIndex": 0,
    "explanation": "By C specification, sizeof(char) is defined to be EXACTLY 1 byte on all compliant C implementations."
  },
  {
    "question": "What is the typical size of an 'int' data type on modern 32-bit and 64-bit x86/x64 operating systems?",
    "options": [
      "1 byte",
      "2 bytes",
      "4 bytes (32 bits)",
      "8 bytes"
    ],
    "answerIndex": 2,
    "explanation": "On modern LP64 and LLP64 data models (Linux, Windows, macOS x64), 'int' is 4 bytes (32 bits)."
  },
  {
    "question": "What is the precision and memory size of a standard single-precision 'float' type (IEEE 754)?",
    "options": [
      "2 bytes, 3 decimal digits",
      "4 bytes (32 bits), ~6-7 decimal digits",
      "8 bytes, ~15 decimal digits",
      "16 bytes, 34 decimal digits"
    ],
    "answerIndex": 1,
    "explanation": "IEEE 754 single-precision float occupies 4 bytes (32 bits) and provides approximately 6-7 significant decimal digits of precision."
  },
  {
    "question": "What is the precision and memory size of a standard double-precision 'double' type (IEEE 754)?",
    "options": [
      "4 bytes, 7 decimal digits",
      "8 bytes (64 bits), ~15-17 decimal digits",
      "12 bytes, 25 decimal digits",
      "16 bytes, 40 decimal digits"
    ],
    "answerIndex": 1,
    "explanation": "IEEE 754 double-precision double occupies 8 bytes (64 bits) and provides ~15-17 significant decimal digits of precision."
  },
  {
    "question": "What does the 'void' data type signify when used as a function return type?",
    "options": [
      "The function returns an integer 0",
      "The function does not return any value to the caller",
      "The function returns a void pointer",
      "The function is undefined"
    ],
    "answerIndex": 1,
    "explanation": "When used as a return type (e.g. void func()), 'void' specifies that the function returns no value."
  },
  {
    "question": "Can a variable be declared directly with the complete type 'void' (e.g., void x;)?",
    "options": [
      "Yes, x will take 0 bytes",
      "No, void is an incomplete type that cannot be instantiated as a variable",
      "Yes, but only inside main()",
      "Yes, x will store a NULL pointer"
    ],
    "answerIndex": 1,
    "explanation": "'void' is an incomplete type representing an empty set of values. You cannot declare a variable of type 'void'."
  },
  {
    "question": "What is a void pointer (void *) in C?",
    "options": [
      "A pointer that points to nothing (NULL)",
      "A generic pointer that can hold the address of any data type",
      "A broken pointer causing segfault",
      "A pointer stored in void memory"
    ],
    "answerIndex": 1,
    "explanation": "A void pointer (void *) is a generic address pointer capable of holding the memory location of any data type."
  },
  {
    "question": "In two's complement binary representation, what is the range of a signed 8-bit integer (signed char)?",
    "options": [
      "0 to 255",
      "-128 to +127",
      "-127 to +128",
      "-256 to +255"
    ],
    "answerIndex": 1,
    "explanation": "An 8-bit signed integer using two's complement ranges from -2^(8-1) to 2^(8-1)-1, which is -128 to +127."
  },
  {
    "question": "What is the range of an unsigned 8-bit integer (unsigned char)?",
    "options": [
      "-128 to +127",
      "0 to 255",
      "0 to 65535",
      "-255 to +255"
    ],
    "answerIndex": 1,
    "explanation": "An 8-bit unsigned integer ranges from 0 to 2^8 - 1, which is 0 to 255."
  },
  {
    "question": "What happens when an unsigned integer exceeds its maximum representable value in C?",
    "options": [
      "It triggers a runtime crash",
      "It wraps around modulo 2^N (well-defined arithmetic overflow)",
      "It causes undefined behavior",
      "It is capped at UINT_MAX silently"
    ],
    "answerIndex": 1,
    "explanation": "In C, unsigned integer overflow is well-defined: it wraps around modulo 2^N (where N is the number of bits)."
  },
  {
    "question": "What happens when a signed integer overflows in standard C (e.g. INT_MAX + 1)?",
    "options": [
      "It wraps around to INT_MIN predictably",
      "It triggers Undefined Behavior (UB)",
      "It sets errno to ERANGE",
      "It converts automatically to long long"
    ],
    "answerIndex": 1,
    "explanation": "In standard C, signed integer overflow results in Undefined Behavior (UB). Compilers may optimize assuming signed overflow never occurs."
  },
  {
    "question": "Which format specifier is used in printf() to print a signed decimal integer (int)?",
    "options": [
      "%f",
      "%c",
      "%d (or %i)",
      "%u"
    ],
    "answerIndex": 2,
    "explanation": "%d or %i is used to format and output signed decimal integers in printf()."
  },
  {
    "question": "Which format specifier is used in printf() to print an unsigned decimal integer?",
    "options": [
      "%d",
      "%u",
      "%x",
      "%o"
    ],
    "answerIndex": 1,
    "explanation": "%u is used to format unsigned decimal integers."
  },
  {
    "question": "Which format specifier is used in printf() to print a single character ('char')?",
    "options": [
      "%s",
      "%c",
      "%d",
      "%f"
    ],
    "answerIndex": 1,
    "explanation": "%c is used to format single character values."
  },
  {
    "question": "Which format specifier is used in printf() to print a floating-point number (float or double)?",
    "options": [
      "%d",
      "%f",
      "%lf",
      "%g"
    ],
    "answerIndex": 1,
    "explanation": "In printf(), %f is used for both float and double (because float arguments are automatically promoted to double when passed to variadic functions)."
  },
  {
    "question": "Which format specifier is required in scanf() when reading input into a 'double' variable?",
    "options": [
      "%f",
      "%lf",
      "%d",
      "%s"
    ],
    "answerIndex": 1,
    "explanation": "In scanf(), %lf is strictly required to read into a double pointer, while %f reads into a float pointer."
  },
  {
    "question": "Which format specifier is used to display an integer in hexadecimal format (lowercase letters)?",
    "options": [
      "%o",
      "%x",
      "%X",
      "%h"
    ],
    "answerIndex": 1,
    "explanation": "%x prints an integer in hexadecimal format using lowercase hex letters (0-9, a-f)."
  },
  {
    "question": "Which format specifier is used to display an integer in octal format?",
    "options": [
      "%x",
      "%o",
      "%b",
      "%d"
    ],
    "answerIndex": 1,
    "explanation": "%o formats an integer in octal (base-8) representation."
  },
  {
    "question": "What does sizeof(char) evaluate to on any compliant C system?",
    "options": [
      "1",
      "2",
      "4",
      "Implementation-defined"
    ],
    "answerIndex": 0,
    "explanation": "sizeof(char) is defined by ISO C standard to always equal 1."
  },
  {
    "question": "Which C header file defines architectural limits for integer data types (e.g. INT_MAX, CHAR_MIN)?",
    "options": [
      "<float.h>",
      "<limits.h>",
      "<math.h>",
      "<stddef.h>"
    ],
    "answerIndex": 1,
    "explanation": "<limits.h> defines integer type boundary macros like INT_MAX, INT_MIN, CHAR_MAX, UINT_MAX, etc."
  },
  {
    "question": "Which C header file defines limits and properties for floating-point data types (e.g. FLT_MAX, DBL_DIG)?",
    "options": [
      "<limits.h>",
      "<float.h>",
      "<math.h>",
      "<stdbool.h>"
    ],
    "answerIndex": 1,
    "explanation": "<float.h> contains macros defining floating-point limits, machine epsilon, and precision digits."
  },
  {
    "question": "What is the difference between float and double in terms of RAM storage and precision?",
    "options": [
      "float uses 8 bytes; double uses 4 bytes",
      "float uses 4 bytes (single precision); double uses 8 bytes (double precision)",
      "They are identical in size and speed",
      "float holds integer data only"
    ],
    "answerIndex": 1,
    "explanation": "float is 32-bit (4 bytes) single precision, while double is 64-bit (8 bytes) double precision."
  },
  {
    "question": "What is the value of CHAR_BIT on almost all standard desktop and server computer systems?",
    "options": [
      "4",
      "8",
      "16",
      "32"
    ],
    "answerIndex": 1,
    "explanation": "CHAR_BIT defines the number of bits in a char byte, which is 8 on almost all standard hardware platforms."
  },
  {
    "question": "Which data type model does 64-bit Linux/UNIX use where long and pointers are 64-bit, but int is 32-bit?",
    "options": [
      "LP32",
      "ILP32",
      "LP64",
      "LLP64"
    ],
    "answerIndex": 2,
    "explanation": "64-bit Linux, macOS, and UNIX use the LP64 model (Long and Pointer are 64-bit, Integer is 32-bit)."
  },
  {
    "question": "Which data type model does 64-bit Microsoft Windows use where int and long are 32-bit, but long long and pointers are 64-bit?",
    "options": [
      "LP64",
      "LLP64",
      "ILP64",
      "ILP64LL"
    ],
    "answerIndex": 1,
    "explanation": "64-bit Windows uses the LLP64 model (Long Long and Pointer are 64-bit; int and long remain 32-bit)."
  },
  {
    "question": "What is guaranteed about the relative size relationship between short, int, long, and long long in C standard?",
    "options": [
      "sizeof(short) < sizeof(int) < sizeof(long) < sizeof(long long)",
      "sizeof(short) <= sizeof(int) <= sizeof(long) <= sizeof(long long)",
      "sizeof(int) must be 4 bytes",
      "sizeof(long) must be 8 bytes"
    ],
    "answerIndex": 1,
    "explanation": "The C standard guarantees that sizeof(short) <= sizeof(int) <= sizeof(long) <= sizeof(long long)."
  },
  {
    "question": "What is the minimum bit width guaranteed by standard C for a 'short' integer?",
    "options": [
      "8 bits",
      "16 bits",
      "32 bits",
      "64 bits"
    ],
    "answerIndex": 1,
    "explanation": "The C standard requires 'short' to be at least 16 bits wide."
  },
  {
    "question": "What is the minimum bit width guaranteed by standard C for a 'long long' integer (introduced in C99)?",
    "options": [
      "16 bits",
      "32 bits",
      "64 bits",
      "128 bits"
    ],
    "answerIndex": 2,
    "explanation": "Standard C (starting C99) requires 'long long' to be at least 64 bits wide."
  },
  {
    "question": "Which set of keywords are classified as sign modifiers in C?",
    "options": [
      "short, long",
      "signed, unsigned",
      "const, volatile",
      "auto, static"
    ],
    "answerIndex": 1,
    "explanation": "'signed' and 'unsigned' are sign modifiers that dictate whether integer variables can store negative values."
  },
  {
    "question": "What happens when you declare a variable as 'unsigned int'?",
    "options": [
      "It can store only negative numbers",
      "It stores only non-negative integers (0 and positive), doubling the positive dynamic range",
      "It doubles the memory size in RAM",
      "It turns into a floating-point number"
    ],
    "answerIndex": 1,
    "explanation": "An 'unsigned int' cannot hold negative numbers, freeing the sign bit to double the maximum positive integer range."
  },
  {
    "question": "By default, is an unmodified integer declaration 'int x;' signed or unsigned in standard C?",
    "options": [
      "Unsigned",
      "Signed",
      "Depends on RAM address",
      "Implementation-defined"
    ],
    "answerIndex": 1,
    "explanation": "In standard C, plain 'int' is implicitly 'signed int'."
  },
  {
    "question": "Is a plain 'char' variable (declared without signed or unsigned) guaranteed to be signed across all C compilers?",
    "options": [
      "Yes, always signed",
      "No, whether plain 'char' is signed or unsigned is implementation-defined",
      "Yes, always unsigned",
      "It is unsigned on x86, signed on ARM"
    ],
    "answerIndex": 1,
    "explanation": "Whether plain 'char' is signed or unsigned is implementation-defined by the compiler/target ABI (GCC on x86 defaults to signed char, but on ARM defaults to unsigned char)."
  },
  {
    "question": "Which modifier can be applied to 'double' to increase floating-point range and precision?",
    "options": [
      "short",
      "unsigned",
      "long",
      "signed"
    ],
    "answerIndex": 2,
    "explanation": "'long' can be applied to double (creating 'long double'). 'short', 'signed', and 'unsigned' cannot be applied to floating-point types."
  },
  {
    "question": "Which of the following declarations is INVALID syntax in C?",
    "options": [
      "unsigned float x;",
      "unsigned long int y;",
      "signed char z;",
      "long double w;"
    ],
    "answerIndex": 0,
    "explanation": "'unsigned float' is invalid C syntax. Sign modifiers (signed/unsigned) can only be applied to integer types (including char)."
  },
  {
    "question": "Which header file introduced in C99 provides exact-width integer types such as int32_t and uint8_t?",
    "options": [
      "<stdlib.h>",
      "<stdint.h>",
      "<stddef.h>",
      "<limits.h>"
    ],
    "answerIndex": 1,
    "explanation": "<stdint.h> provides platform-independent exact-width integer typedefs like int8_t, uint8_t, int32_t, uint64_t, etc."
  },
  {
    "question": "What is the exact bit size and signedness of 'uint16_t' defined in <stdint.h>?",
    "options": [
      "8-bit signed integer",
      "16-bit unsigned integer",
      "16-bit signed integer",
      "32-bit unsigned integer"
    ],
    "answerIndex": 1,
    "explanation": "'uint16_t' is guaranteed to be an EXACTLY 16-bit unsigned integer type."
  },
  {
    "question": "What is the exact bit size and signedness of 'int64_t' defined in <stdint.h>?",
    "options": [
      "64-bit signed integer",
      "64-bit unsigned integer",
      "32-bit signed integer",
      "128-bit signed integer"
    ],
    "answerIndex": 0,
    "explanation": "'int64_t' is guaranteed to be an EXACTLY 64-bit signed integer type."
  },
  {
    "question": "Which integer type defined in <stdint.h> is guaranteed to be large enough to safely hold a pointer address?",
    "options": [
      "intmax_t",
      "intptr_t (or uintptr_t)",
      "int_fast32_t",
      "size_t"
    ],
    "answerIndex": 1,
    "explanation": "intptr_t and uintptr_t are integer types guaranteed to be wide enough to store pointer addresses without loss of data."
  },
  {
    "question": "What type from <stdint.h> represents the fastest unsigned integer type that is at least 32 bits wide?",
    "options": [
      "uint32_t",
      "uint_fast32_t",
      "uint_least32_t",
      "uintmax_t"
    ],
    "answerIndex": 1,
    "explanation": "uint_fast32_t is defined as the fastest unsigned integer type with a minimum width of 32 bits on the target platform."
  },
  {
    "question": "What type from <stdint.h> represents the maximum-width signed integer supported by the compiler?",
    "options": [
      "int64_t",
      "intmax_t",
      "intptr_t",
      "size_t"
    ],
    "answerIndex": 1,
    "explanation": "intmax_t is defined as the largest signed integer type supported by the implementation."
  },
  {
    "question": "Which macro from <stdint.h> gives the maximum value of a uint32_t type?",
    "options": [
      "UINT32_MAX",
      "INT32_MAX",
      "MAX_UINT32",
      "UINT_MAX32"
    ],
    "answerIndex": 0,
    "explanation": "UINT32_MAX is the macro defining 2^32 - 1 (4294967295)."
  },
  {
    "question": "If 'short' is 2 bytes and 'int' is 4 bytes, what is sizeof(unsigned short)?",
    "options": [
      "1 byte",
      "2 bytes",
      "4 bytes",
      "8 bytes"
    ],
    "answerIndex": 1,
    "explanation": "Sign modifiers (signed/unsigned) do not alter the memory size of integer types. sizeof(unsigned short) remains 2 bytes."
  },
  {
    "question": "What is the result of assigning -1 to an 'unsigned char' variable?",
    "options": [
      "-1",
      "0",
      "255",
      "Compiler error"
    ],
    "answerIndex": 2,
    "explanation": "Assigning -1 to an 8-bit unsigned char wraps around modulo 256: (-1) + 256 = 255."
  },
  {
    "question": "Which specifier is used in printf() from <inttypes.h> to print an int64_t portably across platforms?",
    "options": [
      "%d",
      "%ld",
      "PRId64 macro (e.g. \" %\" PRId64 )",
      "%64d"
    ],
    "answerIndex": 2,
    "explanation": "<inttypes.h> provides format specifier macros like PRId64 and PRIu64 to format <stdint.h> types portably across 32-bit and 64-bit systems."
  },
  {
    "question": "Which of the following is equivalent to the declaration 'long int a;'?",
    "options": [
      "long a;",
      "int long a;",
      "both long a; and int long a;",
      "neither"
    ],
    "answerIndex": 2,
    "explanation": "In C, 'long int', 'long', and 'int long' are completely synonymous declarations."
  },
  {
    "question": "Can 'signed' and 'unsigned' modifiers be combined in the same declaration (e.g. signed unsigned int x;)?",
    "options": [
      "Yes, they cancel each other out",
      "No, combining contradictory sign modifiers causes a compiler error",
      "Yes, x defaults to signed",
      "Yes, x defaults to unsigned"
    ],
    "answerIndex": 1,
    "explanation": "Combining contradictory modifiers like 'signed' and 'unsigned' causes a compiler syntax error."
  },
  {
    "question": "What is the minimum bit width required for 'long' according to ISO C standard?",
    "options": [
      "16 bits",
      "32 bits",
      "64 bits",
      "128 bits"
    ],
    "answerIndex": 1,
    "explanation": "ISO C specifies that 'long' must be at least 32 bits wide."
  },
  {
    "question": "What is the size of 'long' on 64-bit Windows (LLP64) vs 64-bit Linux (LP64)?",
    "options": [
      "Windows: 4 bytes; Linux: 8 bytes",
      "Windows: 8 bytes; Linux: 4 bytes",
      "Windows: 8 bytes; Linux: 8 bytes",
      "Windows: 4 bytes; Linux: 4 bytes"
    ],
    "answerIndex": 0,
    "explanation": "On 64-bit Windows (LLP64), sizeof(long) is 4 bytes. On 64-bit Linux (LP64), sizeof(long) is 8 bytes."
  },
  {
    "question": "What is the size of 'long long' on both 64-bit Windows and 64-bit Linux?",
    "options": [
      "4 bytes",
      "8 bytes (64 bits)",
      "16 bytes",
      "Varies unpredictably"
    ],
    "answerIndex": 1,
    "explanation": "sizeof(long long) is 8 bytes (64 bits) on both 64-bit Windows and 64-bit Linux."
  },
  {
    "question": "What happens when you declare 'short long int x;' in C?",
    "options": [
      "It creates a 6-byte integer",
      "It causes a compiler syntax error",
      "It defaults to int",
      "It creates a 4-byte float"
    ],
    "answerIndex": 1,
    "explanation": "Combining conflicting size modifiers like 'short' and 'long' triggers a compiler syntax error."
  },
  {
    "question": "Which type modifier ensures a variable's value can be modified by hardware or external threads without compiler optimization caching?",
    "options": [
      "const",
      "volatile",
      "restrict",
      "static"
    ],
    "answerIndex": 1,
    "explanation": "The 'volatile' type qualifier tells the compiler that the variable may be modified externally, preventing optimizations that elide memory reads/writes."
  },
  {
    "question": "Which type qualifier introduced in C99 promises the compiler that a pointer is the sole initial access method for an object?",
    "options": [
      "volatile",
      "restrict",
      "inline",
      "const"
    ],
    "answerIndex": 1,
    "explanation": "'restrict' is a pointer qualifier introduced in C99 informing the compiler that no other pointer aliasing exists for that memory region, enabling aggressive optimization."
  },
  {
    "question": "Which type qualifier makes a variable read-only after initialization?",
    "options": [
      "static",
      "extern",
      "const",
      "volatile"
    ],
    "answerIndex": 2,
    "explanation": "'const' makes a variable read-only, preventing subsequent assignment modifications."
  },
  {
    "question": "What is a literal constant in C?",
    "options": [
      "A variable whose name is written in uppercase",
      "An explicit value hardcoded directly into the source code text",
      "A pointer address in RAM",
      "A compiler error message"
    ],
    "answerIndex": 1,
    "explanation": "A literal constant is an explicit, fixed value (like 42, 3.14, 'A', or \"Hello\") written directly into source code."
  },
  {
    "question": "What is the default data type of an integer literal without suffixes (e.g., 100)?",
    "options": [
      "short",
      "int (or smallest integer type that fits)",
      "long",
      "unsigned int"
    ],
    "answerIndex": 1,
    "explanation": "By default, an unadorned integer literal like 100 is typed as 'int' (or the smallest signed integer type capable of holding it)."
  },
  {
    "question": "What prefix is used to write an octal (base-8) integer literal in C?",
    "options": [
      "0x",
      "0b",
      "0 (leading zero)",
      "#"
    ],
    "answerIndex": 2,
    "explanation": "A leading zero '0' (e.g. 052) indicates an octal integer literal in C."
  },
  {
    "question": "What prefix is used to write a hexadecimal (base-16) integer literal in C?",
    "options": [
      "0o",
      "0x (or 0X)",
      "0b",
      "16#"
    ],
    "answerIndex": 1,
    "explanation": "A '0x' or '0X' prefix (e.g. 0x2A) denotes a hexadecimal integer literal."
  },
  {
    "question": "What prefix was standardized in C23 (and long supported in GCC) for binary integer literals?",
    "options": [
      "0b (or 0B)",
      "0x",
      "0b10",
      "bin#"
    ],
    "answerIndex": 0,
    "explanation": "The '0b' or '0B' prefix (e.g., 0b101010) denotes a binary integer literal in C23 / GCC."
  },
  {
    "question": "What is the octal literal 012 equal to in decimal?",
    "options": [
      "12",
      "10",
      "8",
      "14"
    ],
    "answerIndex": 1,
    "explanation": "012 in octal = (1 * 8^1) + (2 * 8^0) = 8 + 2 = 10 in decimal."
  },
  {
    "question": "What is the hexadecimal literal 0x1F equal to in decimal?",
    "options": [
      "15",
      "31",
      "16",
      "32"
    ],
    "answerIndex": 1,
    "explanation": "0x1F = (1 * 16^1) + (15 * 16^0) = 16 + 15 = 31 in decimal."
  },
  {
    "question": "Which suffix makes an integer literal explicitly 'unsigned long long'?",
    "options": [
      "ULL or ull",
      "UL",
      "LL",
      "F"
    ],
    "answerIndex": 0,
    "explanation": "The suffix 'ULL' or 'ull' (e.g. 10000000000ULL) makes an integer literal an unsigned long long."
  },
  {
    "question": "What is the default type of a floating-point literal containing a decimal point (e.g. 3.14) in C?",
    "options": [
      "float",
      "double",
      "long double",
      "decimal"
    ],
    "answerIndex": 1,
    "explanation": "Floating-point literals without suffixes (like 3.14) default to 'double' in C."
  },
  {
    "question": "Which suffix forces a floating-point literal to be of type 'float' (e.g., 3.14f)?",
    "options": [
      "f or F",
      "d or D",
      "l or L",
      "s"
    ],
    "answerIndex": 0,
    "explanation": "The suffix 'f' or 'F' (e.g., 3.14f) specifies that the literal is a 32-bit single-precision 'float'."
  },
  {
    "question": "Which suffix forces a floating-point literal to be of type 'long double' (e.g., 3.14L)?",
    "options": [
      "l or L",
      "f or F",
      "d or D",
      "LD"
    ],
    "answerIndex": 0,
    "explanation": "The suffix 'l' or 'L' attached to a floating-point literal specifies 'long double'."
  },
  {
    "question": "What is the literal 1.5e-3 equal to in standard decimal floating-point notation?",
    "options": [
      "1500.0",
      "0.0015",
      "0.015",
      "150.0"
    ],
    "answerIndex": 1,
    "explanation": "1.5e-3 = 1.5 * 10^(-3) = 0.0015."
  },
  {
    "question": "What is the type of a character literal in standard C (e.g., sizeof('A'))?",
    "options": [
      "char (1 byte)",
      "int (4 bytes on 32/64-bit systems)",
      "unsigned char",
      "float"
    ],
    "answerIndex": 1,
    "explanation": "In standard C, character literals like 'A' have type 'int'! (Therefore sizeof('A') == sizeof(int), usually 4 bytes). In C++, sizeof('a') is 1 (char)."
  },
  {
    "question": "What escape sequence represents the null character in C?",
    "options": [
      "\\n",
      "\\0",
      "\\t",
      "\\r"
    ],
    "answerIndex": 1,
    "explanation": "\\0 represents the null character (ASCII code 0)."
  },
  {
    "question": "What escape sequence represents a horizontal tab in C?",
    "options": [
      "\\t",
      "\\n",
      "\\v",
      "\\b"
    ],
    "answerIndex": 0,
    "explanation": "\\t represents a horizontal tab."
  },
  {
    "question": "What escape sequence represents an alert / bell sound in ASCII?",
    "options": [
      "\\a",
      "\\b",
      "\\e",
      "\\f"
    ],
    "answerIndex": 0,
    "explanation": "\\a represents the ASCII alert/bell character."
  },
  {
    "question": "How is a string literal stored in memory in C?",
    "options": [
      "As a linked list of characters",
      "As a null-terminated ('\\0') character array in read-only memory",
      "As a dynamic heap string",
      "As an integer array"
    ],
    "answerIndex": 1,
    "explanation": "A string literal like \"Hello\" is stored as a contiguous null-terminated character array (6 bytes total including '\\0') typically in read-only memory (.rodata)."
  },
  {
    "question": "What happens if a program attempts to modify a character in a string literal (e.g., char *p = \"Hello\"; p[0] = 'h';)?",
    "options": [
      "The string updates silently",
      "It causes Undefined Behavior (typically Segmentation Fault on modern OS)",
      "It converts p to a const pointer",
      "It triggers a compiler warning only"
    ],
    "answerIndex": 1,
    "explanation": "Modifying a string literal results in Undefined Behavior (usually resulting in a crash / Segmentation Fault due to write access violation in .rodata)."
  },
  {
    "question": "What is the sizeof(\"ABC\") in bytes?",
    "options": [
      "3 bytes",
      "4 bytes (includes implicit '\\0' null terminator)",
      "8 bytes",
      "2 bytes"
    ],
    "answerIndex": 1,
    "explanation": "\"ABC\" contains 3 explicit characters plus 1 implicit '\\0' null terminator, so sizeof(\"ABC\") is 4 bytes."
  },
  {
    "question": "What is the difference between '#define MAX 100' and 'const int MAX = 100;'?",
    "options": [
      "#define is processed by preprocessor text substitution without type checking; const is a scoped read-only variable evaluated by compiler with type checking",
      "const uses no memory; #define uses heap memory",
      "There is no difference",
      "#define cannot be used for numbers"
    ],
    "answerIndex": 0,
    "explanation": "#define MAX 100 is a preprocessor macro replacing text during preprocessing. const int MAX = 100 is a typed, scope-checked read-only variable."
  },
  {
    "question": "Can a 'const' variable in C be left uninitialized at declaration (e.g., const int x;)?",
    "options": [
      "Yes, it defaults to 0",
      "Technically syntax allowed in C89, but leaves x with garbage value that cannot be assigned later (compiler warning/error)",
      "Yes, it can be assigned inside main()",
      "No, it must be initialized in C++ only"
    ],
    "answerIndex": 1,
    "explanation": "In C, uninitialized const variables retain garbage values and cannot be modified later, making uninitialized const variables practically useless or error-prone."
  },
  {
    "question": "Which escape sequence allows inserting an arbitrary hexadecimal ASCII character code into a string literal?",
    "options": [
      "\\xHH (e.g. \\x41 for 'A')",
      "\\hHH",
      "\\0HH",
      "\\hexHH"
    ],
    "answerIndex": 0,
    "explanation": "\\x followed by hex digits (e.g., \\x41) represents a hexadecimal character escape sequence."
  },
  {
    "question": "Which escape sequence allows inserting an arbitrary octal ASCII character code into a string literal?",
    "options": [
      "\\OOO (up to 3 octal digits, e.g. \\101 for 'A')",
      "\\octOOO",
      "\\oOOO",
      "\\0xOOO"
    ],
    "answerIndex": 0,
    "explanation": "\\ followed by up to 3 octal digits (e.g., \\101) inserts an octal character escape sequence."
  },
  {
    "question": "What is the value of the integer constant 0x0A in decimal?",
    "options": [
      "10",
      "12",
      "16",
      "8"
    ],
    "answerIndex": 0,
    "explanation": "0x0A in hexadecimal equals 10 in decimal (newline ASCII)."
  },
  {
    "question": "What is the size of the empty string literal \"\" in C?",
    "options": [
      "0 bytes",
      "1 byte (contains only the '\\0' null terminator)",
      "2 bytes",
      "Depends on alignment"
    ],
    "answerIndex": 1,
    "explanation": "The empty string literal \"\" contains only the implicit '\\0' null terminator byte, so its sizeof is 1 byte."
  },
  {
    "question": "Which arithmetic operator calculates the remainder of integer division in C?",
    "options": [
      "/",
      "% (Modulus)",
      "div",
      "rem"
    ],
    "answerIndex": 1,
    "explanation": "The '%' (modulus) operator computes the remainder of integer division."
  },
  {
    "question": "Can the modulus operator (%) be applied to floating-point operands (e.g. 5.5 % 2.0) in C?",
    "options": [
      "Yes, directly",
      "No, using % on float/double causes a compiler error (use fmod() from <math.h> instead)",
      "Yes, but results are rounded to int",
      "Only if compiled with GCC"
    ],
    "answerIndex": 1,
    "explanation": "The % operator is strictly restricted to integer operands. For floating-point remainder, use fmod() from <math.h>."
  },
  {
    "question": "What is the result of integer division 7 / 2 in standard C (C99/C11)?",
    "options": [
      "3.5",
      "3 (truncated towards zero)",
      "4 (rounded up)",
      "3.0"
    ],
    "answerIndex": 1,
    "explanation": "In C, integer division truncates fractional parts towards zero, yielding 3."
  },
  {
    "question": "What is the result of integer division -7 / 2 in C99 standard?",
    "options": [
      "-3",
      "-4",
      "-3.5",
      "Undefined"
    ],
    "answerIndex": 0,
    "explanation": "C99 specifies truncation towards zero for integer division, so -7 / 2 evaluates to -3."
  },
  {
    "question": "What is the value of expression: 10 % 3?",
    "options": [
      "1",
      "3",
      "0",
      "3.33"
    ],
    "answerIndex": 0,
    "explanation": "10 divided by 3 is 3 with a remainder of 1."
  },
  {
    "question": "What is the value of expression: -10 % 3 in C99?",
    "options": [
      "-1",
      "1",
      "-3",
      "0"
    ],
    "answerIndex": 0,
    "explanation": "In C99, (a / b) * b + (a % b) == a must hold. -10 / 3 = -3. (-3 * 3) + (-10 % 3) = -10, so -10 % 3 = -1."
  },
  {
    "question": "What is the difference between prefix increment ++x and postfix increment x++?",
    "options": [
      "++x increments x after returning old value; x++ increments x before returning",
      "++x increments x before returning value; x++ returns old value first then increments x",
      "There is no difference",
      "x++ works on floats only"
    ],
    "answerIndex": 1,
    "explanation": "Prefix ++x increments x first and evaluates to the updated value. Postfix x++ evaluates to the current value of x first, then increments x."
  },
  {
    "question": "Given int x = 5; int y = ++x; what are the values of x and y?",
    "options": [
      "x = 6, y = 5",
      "x = 6, y = 6",
      "x = 5, y = 6",
      "x = 5, y = 5"
    ],
    "answerIndex": 1,
    "explanation": "Prefix ++x increments x to 6 first, then assigns 6 to y. Both x and y become 6."
  },
  {
    "question": "Given int x = 5; int y = x++; what are the values of x and y?",
    "options": [
      "x = 6, y = 5",
      "x = 6, y = 6",
      "x = 5, y = 6",
      "x = 5, y = 5"
    ],
    "answerIndex": 0,
    "explanation": "Postfix x++ assigns current value 5 to y first, then increments x to 6. So x = 6, y = 5."
  },
  {
    "question": "What occurs if a variable is modified more than once without an intervening sequence point (e.g. x = x++ + ++x;)?",
    "options": [
      "The program outputs 12 deterministically",
      "It produces Undefined Behavior (UB)",
      "The compiler fixes it automatically",
      "It evaluates left-to-right strictly"
    ],
    "answerIndex": 1,
    "explanation": "Modifying a variable multiple times without an intervening sequence point results in Undefined Behavior (UB)."
  },
  {
    "question": "Which operator is used for structural equality comparison in C?",
    "options": [
      "=",
      "==",
      "===",
      "eq"
    ],
    "answerIndex": 1,
    "explanation": "'==' is the relational equality operator. '=' is simple assignment."
  },
  {
    "question": "What is the result type and value of a true relational comparison (e.g. 5 > 3) in C?",
    "options": [
      "Boolean true",
      "int 1",
      "char 'T'",
      "float 1.0"
    ],
    "answerIndex": 1,
    "explanation": "In C, relational expressions return integer 1 for true and integer 0 for false."
  },
  {
    "question": "How is the chained comparison expression '1 < x < 5' evaluated in C when x = 0?",
    "options": [
      "Evaluates to false because 0 is not between 1 and 5",
      "Evaluates to 1 (true) because (1 < 0) gives 0, and 0 < 5 is true (1)",
      "Causes a compiler syntax error",
      "Evaluates to 0"
    ],
    "answerIndex": 1,
    "explanation": "In C, '1 < x < 5' evaluates left-to-right as '(1 < x) < 5'. If x = 0, (1 < 0) is 0. Then (0 < 5) is 1 (true)! To test range, use (1 < x && x < 5)."
  },
  {
    "question": "What is short-circuit evaluation in logical AND (&&) operator?",
    "options": [
      "If the left operand is false (0), the right operand is NOT evaluated at all",
      "If the left operand is true (1), the right operand is skipped",
      "Both operands are evaluated in parallel",
      "The right operand is evaluated first"
    ],
    "answerIndex": 0,
    "explanation": "In logical AND (&&), if the left operand evaluates to false (0), the overall expression must be false, so the right operand is skipped (short-circuited)."
  },
  {
    "question": "What is short-circuit evaluation in logical OR (||) operator?",
    "options": [
      "If the left operand is true (non-zero), the right operand is NOT evaluated",
      "If the left operand is false, the right operand is skipped",
      "It throws a short-circuit exception",
      "Both operands are skipped"
    ],
    "answerIndex": 0,
    "explanation": "In logical OR (||), if the left operand evaluates to true (non-zero), the overall expression is guaranteed true, so the right operand is skipped."
  },
  {
    "question": "Given int a = 0; int b = 5; if (a && ++b) { }, what is the value of b after execution?",
    "options": [
      "6",
      "5 (due to short-circuiting of && when a is 0)",
      "0",
      "Undefined"
    ],
    "answerIndex": 1,
    "explanation": "Because 'a' is 0 (false), the logical AND short-circuits. ++b is never executed, leaving b as 5."
  },
  {
    "question": "Given int a = 1; int b = 5; if (a || ++b) { }, what is the value of b after execution?",
    "options": [
      "6",
      "5 (due to short-circuiting of || when a is 1)",
      "1",
      "0"
    ],
    "answerIndex": 1,
    "explanation": "Because 'a' is 1 (true), the logical OR short-circuits. ++b is skipped, leaving b as 5."
  },
  {
    "question": "What does the logical NOT operator (!) do?",
    "options": [
      "Flips all bits of an integer",
      "Converts 0 to 1, and any non-zero value to 0",
      "Negates the sign of a number",
      "Swaps two variables"
    ],
    "answerIndex": 1,
    "explanation": "Logical NOT (!) returns 1 if operand is 0 (false), and returns 0 if operand is non-zero (true)."
  },
  {
    "question": "What is the result of !(-5) in C?",
    "options": [
      "1",
      "0",
      "5",
      "-5"
    ],
    "answerIndex": 1,
    "explanation": "Since -5 is non-zero (true), !(-5) evaluates to 0 (false)."
  },
  {
    "question": "What is the compound assignment operator x += 5 equivalent to?",
    "options": [
      "x = 5",
      "x = x + 5",
      "x + 5 = x",
      "x = x * 5"
    ],
    "answerIndex": 1,
    "explanation": "x += 5 is shorthand for x = x + 5 (evaluating x address once)."
  },
  {
    "question": "What is the value of expression (a = 5) in C?",
    "options": [
      "0",
      "5 (the value assigned to a)",
      "1",
      "void"
    ],
    "answerIndex": 1,
    "explanation": "An assignment expression yields the value assigned to the left operand (here, 5)."
  },
  {
    "question": "What is the associativity of assignment operators (=, +=, -=, etc.) in C?",
    "options": [
      "Left-to-right",
      "Right-to-left",
      "Non-associative",
      "Random"
    ],
    "answerIndex": 1,
    "explanation": "Assignment operators associate from Right-to-Left (e.g. a = b = c = 10 sets c=10, then b=10, then a=10)."
  },
  {
    "question": "Which operator is ternary (takes three operands) in C?",
    "options": [
      "Conditional operator (? :)",
      "Bitwise XOR (^)",
      "Logical AND (&&)",
      "Modulus (%)"
    ],
    "answerIndex": 0,
    "explanation": "The conditional operator (? :) is C's only ternary operator: condition ? expr1 : expr2."
  },
  {
    "question": "Given int max = (a > b) ? a : b;, what value does max receive if a = 10, b = 20?",
    "options": [
      "10",
      "20",
      "1",
      "0"
    ],
    "answerIndex": 1,
    "explanation": "Since (10 > 20) is false, the expression returns b (20)."
  },
  {
    "question": "Which operator has the lowest precedence in all of C language?",
    "options": [
      "Assignment (=)",
      "Comma operator (,)",
      "Logical OR (||)",
      "Ternary (? :)"
    ],
    "answerIndex": 1,
    "explanation": "The comma operator (,) has the lowest precedence of all C operators."
  },
  {
    "question": "What is the value of x after executing: int x = (1, 2, 3);?",
    "options": [
      "1",
      "2",
      "3",
      "6"
    ],
    "answerIndex": 2,
    "explanation": "The comma operator evaluates left-to-right and yields the rightmost expression value, so x becomes 3."
  },
  {
    "question": "Given int a = 5, b = 10; int x = a++, b++; what is the syntax/semantic outcome?",
    "options": [
      "x = 5, b = 11",
      "Compiler error (comma operator in variable declaration acts as variable separator, requiring type for b++)",
      "x = 6, b = 11",
      "x = 10, b = 10"
    ],
    "answerIndex": 1,
    "explanation": "In a declaration list, comma acts as a declarator separator. 'int x = a++, b++;' attempts to declare a new variable named 'b++', causing a compiler syntax error."
  },
  {
    "question": "What is the value of int x; x = 5 == 5;?",
    "options": [
      "5",
      "1 (true)",
      "0 (false)",
      "Compiler error"
    ],
    "answerIndex": 1,
    "explanation": "Equality operator '==' has higher precedence than assignment '='. '5 == 5' evaluates to 1, which is assigned to x."
  },
  {
    "question": "What is the value of int x = 5; int y = !x == 0;?",
    "options": [
      "0",
      "1",
      "5",
      "Undefined"
    ],
    "answerIndex": 1,
    "explanation": "!x evaluates to !5 = 0. Then 0 == 0 evaluates to 1. So y = 1."
  },
  {
    "question": "What is the danger of writing 'if (x = 5)' instead of 'if (x == 5)'?",
    "options": [
      "It assigns 5 to x and always evaluates condition as true (5 != 0)",
      "It causes a hard runtime crash",
      "It checks if x is equal to 5",
      "It assigns 0 to x"
    ],
    "answerIndex": 0,
    "explanation": "'x = 5' assigns 5 to x and returns 5 (non-zero/true), executing the if-block regardless of x's previous value."
  },
  {
    "question": "Which operands are valid for bitwise operators (&, |, ^, ~, <<, >>) in C?",
    "options": [
      "Floats and doubles",
      "Integers and character types only",
      "Pointers only",
      "Any data type"
    ],
    "answerIndex": 1,
    "explanation": "Bitwise operators work strictly on integer types (char, short, int, long, etc.). Using bitwise operators on float/double causes a compiler error."
  },
  {
    "question": "What is the result of bitwise AND: 5 & 3 (in 8-bit binary: 00000101 & 00000011)?",
    "options": [
      "1 (00000001)",
      "7 (00000111)",
      "6 (00000110)",
      "8 (00001000)"
    ],
    "answerIndex": 0,
    "explanation": "00000101 & 00000011 = 00000001 (1 in decimal)."
  },
  {
    "question": "What is the result of bitwise OR: 5 | 3 (00000101 | 00000011)?",
    "options": [
      "1",
      "7 (00000111)",
      "6",
      "15"
    ],
    "answerIndex": 1,
    "explanation": "00000101 | 00000011 = 00000111 (7 in decimal)."
  },
  {
    "question": "What is the result of bitwise XOR: 5 ^ 3 (00000101 ^ 00000011)?",
    "options": [
      "1",
      "7",
      "6 (00000110)",
      "2"
    ],
    "answerIndex": 2,
    "explanation": "00000101 ^ 00000011 = 00000110 (6 in decimal)."
  },
  {
    "question": "What does bitwise NOT operator (~) do to an integer?",
    "options": [
      "Inverts every single bit (0 becomes 1, 1 becomes 0)",
      "Flips only the sign bit",
      "Multiplies by -1",
      "Shifts bits to the left"
    ],
    "answerIndex": 0,
    "explanation": "Bitwise NOT (~) performs bitwise complement, inverting all 0 bits to 1 and all 1 bits to 0."
  },
  {
    "question": "In two's complement arithmetic, what is the value of ~x for any signed integer x?",
    "options": [
      "-x",
      "-(x + 1)",
      "-x + 1",
      "x + 1"
    ],
    "answerIndex": 1,
    "explanation": "In two's complement, bitwise NOT ~x is equal to -(x + 1). (e.g. ~0 = -1, ~5 = -6)."
  },
  {
    "question": "What is the value of ~0 for a 32-bit unsigned integer (uint32_t)?",
    "options": [
      "0",
      "4294967295 (0xFFFFFFFF)",
      "-1",
      "2147483647"
    ],
    "answerIndex": 1,
    "explanation": "~0 inverts all 32 zero bits to ones, producing 0xFFFFFFFF (4,294,967,295)."
  },
  {
    "question": "What bitwise operation is used to SET bit n of variable x to 1 without altering other bits?",
    "options": [
      "x &= ~(1 << n)",
      "x |= (1 << n)",
      "x ^= (1 << n)",
      "x >>= n"
    ],
    "answerIndex": 1,
    "explanation": "Bitwise OR with mask (1 << n) sets bit n to 1."
  },
  {
    "question": "What bitwise operation is used to CLEAR bit n of variable x to 0 without altering other bits?",
    "options": [
      "x &= ~(1 << n)",
      "x |= (1 << n)",
      "x ^= (1 << n)",
      "x &= (1 << n)"
    ],
    "answerIndex": 0,
    "explanation": "Bitwise AND with inverted mask ~(1 << n) clears bit n to 0."
  },
  {
    "question": "What bitwise operation is used to TOGGLE (FLIP) bit n of variable x?",
    "options": [
      "x |= (1 << n)",
      "x &= ~(1 << n)",
      "x ^= (1 << n)",
      "x = ~x"
    ],
    "answerIndex": 2,
    "explanation": "Bitwise XOR with mask (1 << n) flips bit n."
  },
  {
    "question": "What bitwise expression tests if bit n of variable x is set (is 1)?",
    "options": [
      "(x & (1 << n)) != 0",
      "(x | (1 << n)) == 0",
      "(x ^ (1 << n)) == 0",
      "(x >> n) & 0"
    ],
    "answerIndex": 0,
    "explanation": "Bitwise AND with mask (1 << n) isolates bit n; checking != 0 tests if bit n is 1."
  },
  {
    "question": "What is the result of left-shifting an unsigned integer 5 << 1 (00000101 << 1)?",
    "options": [
      "10 (00001010)",
      "2",
      "5",
      "20"
    ],
    "answerIndex": 0,
    "explanation": "Left shifting 5 by 1 bit moves bits left and fills with 0, yielding 10 (equivalent to multiplying by 2^1)."
  },
  {
    "question": "What is the result of left-shifting an unsigned integer 5 << 3?",
    "options": [
      "15",
      "40 (5 * 2^3)",
      "35",
      "80"
    ],
    "answerIndex": 1,
    "explanation": "Left shifting x << n for non-overflowing unsigned integers multiplies x by 2^n. 5 * 8 = 40."
  },
  {
    "question": "What is the result of right-shifting an unsigned integer 20 >> 2 (00010100 >> 2)?",
    "options": [
      "10",
      "5 (20 / 2^2)",
      "40",
      "80"
    ],
    "answerIndex": 1,
    "explanation": "Right shifting an unsigned integer 20 >> 2 shifts bits right by 2, yielding 5 (equivalent to integer division by 2^2)."
  },
  {
    "question": "What is the behavior of right-shifting a SIGNED negative integer (e.g. -8 >> 1) in standard C?",
    "options": [
      "Always fills left bits with 0 (logical shift)",
      "Implementation-defined (most compilers perform arithmetic right shift, preserving the sign bit)",
      "Always throws a runtime trap",
      "UB"
    ],
    "answerIndex": 1,
    "explanation": "Right-shifting signed negative integers is implementation-defined in C standard (GCC/MSVC perform arithmetic shift, extending sign bit 1s)."
  },
  {
    "question": "What occurs if you shift an integer by a negative number of bits or by >= the bit width of the type (e.g. int x = 1 << 32 on a 32-bit int)?",
    "options": [
      "It wraps around modulo 32",
      "It produces Undefined Behavior (UB)",
      "It shifts to 0",
      "It triggers a compiler warning only"
    ],
    "answerIndex": 1,
    "explanation": "Shifting by a negative shift count or >= the bit width of the operand type results in Undefined Behavior (UB) in C."
  },
  {
    "question": "What does Brian Kernighan's algorithm expression 'x & (x - 1)' accomplish?",
    "options": [
      "Sets the lowest bit of x",
      "Clears the lowest set bit (rightmost 1-bit) of x",
      "Doubles x",
      "Inverts x"
    ],
    "answerIndex": 1,
    "explanation": "x & (x - 1) clears the rightmost set bit of x. It is used to count set bits efficiently and test powers of two."
  },
  {
    "question": "How can you check if a positive integer x is a power of 2 using bitwise operators?",
    "options": [
      "(x > 0) && ((x & (x - 1)) == 0)",
      "(x & 2) == 0",
      "(x | (x - 1)) == 0",
      "(x ^ 2) == 0"
    ],
    "answerIndex": 0,
    "explanation": "A power of 2 has exactly one bit set. If x > 0 and x & (x - 1) == 0, x is a power of 2."
  },
  {
    "question": "What is the effect of the bitwise operation x ^ x for any integer x?",
    "options": [
      "x",
      "0",
      "1",
      "-1"
    ],
    "answerIndex": 1,
    "explanation": "XORing any value with itself results in 0 (x ^ x = 0)."
  },
  {
    "question": "What is the effect of the bitwise operation x ^ 0 for any integer x?",
    "options": [
      "0",
      "x",
      "1",
      "~x"
    ],
    "answerIndex": 1,
    "explanation": "XORing any value with 0 leaves the value unchanged (x ^ 0 = x)."
  },
  {
    "question": "What is the classic in-place XOR swap sequence to swap variables a and b without temporary variables?",
    "options": [
      "a ^= b; b ^= a; a ^= b;",
      "a &= b; b &= a; a &= b;",
      "a |= b; b |= a; a |= b;",
      "a = b; b = a;"
    ],
    "answerIndex": 0,
    "explanation": "a ^= b; b ^= a; a ^= b; swaps a and b in-place without needing extra memory (provided a and b are distinct memory locations)."
  },
  {
    "question": "What expression extracts the lowest set bit (isolated rightmost 1-bit) of a two's complement integer x?",
    "options": [
      "x & (-x)",
      "x | (-x)",
      "x ^ (-x)",
      "~x"
    ],
    "answerIndex": 0,
    "explanation": "In two's complement, -x = ~x + 1. Therefore, x & (-x) isolates the rightmost 1-bit of x."
  },
  {
    "question": "What is the result of 0x0F & 0x33?",
    "options": [
      "0x3F",
      "0x03",
      "0x30",
      "0x00"
    ],
    "answerIndex": 1,
    "explanation": "0x0F (00001111) & 0x33 (00110011) = 00000011 = 0x03."
  },
  {
    "question": "What is the result of 0x0F | 0x30?",
    "options": [
      "0x3F",
      "0x00",
      "0x0F",
      "0x30"
    ],
    "answerIndex": 0,
    "explanation": "0x0F (00001111) | 0x30 (00110000) = 00111111 = 0x3F."
  },
  {
    "question": "What is the result of 0x55 ^ 0xFF (where 0x55 is 01010101)?",
    "options": [
      "0xAA (10101010)",
      "0x55",
      "0x00",
      "0xFF"
    ],
    "answerIndex": 0,
    "explanation": "XORing any byte with 0xFF inverts all bits. 01010101 ^ 11111111 = 10101010 (0xAA)."
  },
  {
    "question": "In C, what is the precedence relationship between relational operators (like <) and bitwise operators (like &)?",
    "options": [
      "Bitwise operators have higher precedence than relational operators",
      "Relational operators (<, ==) have HIGHER precedence than bitwise operators (&, |, ^)",
      "They have identical precedence",
      "Bitwise operators associate Right-to-Left"
    ],
    "answerIndex": 1,
    "explanation": "Relational/Equality operators (<, ==) have HIGHER precedence than bitwise operators (&, |, ^). Therefore, x & 1 == 0 parses as x & (1 == 0)! Always use parentheses: (x & 1) == 0."
  },
  {
    "question": "What does the expression (x >> 31) & 1 extract for a 32-bit signed integer x?",
    "options": [
      "The sign bit (0 for positive/zero, 1 for negative)",
      "The lowest bit",
      "The middle bit",
      "The size of x"
    ],
    "answerIndex": 0,
    "explanation": "Shifting right by 31 places the sign bit at bit position 0. Masking with & 1 extracts the sign bit."
  },
  {
    "question": "Which operator is used to perform bitwise complement?",
    "options": [
      "!",
      "~",
      "^",
      "-"
    ],
    "answerIndex": 1,
    "explanation": "'~' is the bitwise complement (NOT) operator."
  },
  {
    "question": "What is the result of 1 << 0 in C?",
    "options": [
      "0",
      "1",
      "2",
      "Undefined"
    ],
    "answerIndex": 1,
    "explanation": "1 left shifted by 0 bits remains 1."
  },
  {
    "question": "What is the result of 1 << 4 in C?",
    "options": [
      "4",
      "8",
      "16",
      "32"
    ],
    "answerIndex": 2,
    "explanation": "1 << 4 = 1 * 2^4 = 16."
  },
  {
    "question": "What is operator precedence in C?",
    "options": [
      "The order in which memory is allocated",
      "The rule determining which operator is executed first in an expression containing multiple operators with different priorities",
      "The direction of evaluation (Left-to-Right)",
      "The speed of execution"
    ],
    "answerIndex": 1,
    "explanation": "Operator precedence determines the grouping of terms and order of execution when operators of different priorities appear in an expression."
  },
  {
    "question": "What is operator associativity in C?",
    "options": [
      "The rule determining evaluation order when two operators have EQUAL precedence level in an expression",
      "The link between variable names and addresses",
      "The automatic conversion of float to double",
      "The number of operands an operator takes"
    ],
    "answerIndex": 0,
    "explanation": "Operator associativity specifies the direction (Left-to-Right or Right-to-Left) of evaluation when multiple operators of the same precedence level appear."
  },
  {
    "question": "Which group of operators associates Right-to-Left in C?",
    "options": [
      "Arithmetic (+, -, *, /)",
      "Unary operators (!, ~, ++, --, sizeof, cast) and Assignment operators (=, +=, -=)",
      "Relational operators (<, >)",
      "Logical AND / OR (&&, ||)"
    ],
    "answerIndex": 1,
    "explanation": "Unary operators (!, ~, ++, --, unary +, unary -, indirection *, address &, sizeof, type casts), ternary (? :), and assignment operators associate Right-to-Left."
  },
  {
    "question": "What is the value of expression: 5 + 3 * 2?",
    "options": [
      "16",
      "11",
      "13",
      "10"
    ],
    "answerIndex": 1,
    "explanation": "Multiplication '*' has higher precedence than addition '+'. 3 * 2 = 6; 5 + 6 = 11."
  },
  {
    "question": "What is the value of expression: 10 - 4 - 2?",
    "options": [
      "8",
      "4",
      "6",
      "0"
    ],
    "answerIndex": 1,
    "explanation": "Subtraction '-' associates Left-to-Right. (10 - 4) - 2 = 6 - 2 = 4."
  },
  {
    "question": "What is the nature of the sizeof operator in C?",
    "options": [
      "A runtime library function",
      "A compile-time unary operator (except for C99 VLAs)",
      "A preprocessor macro",
      "A hardware assembly flag"
    ],
    "answerIndex": 1,
    "explanation": "sizeof is a built-in compile-time unary operator that calculates size in bytes at compilation time."
  },
  {
    "question": "What happens to expressions inside a sizeof operator (e.g. sizeof(i++))?",
    "options": [
      "i is incremented at runtime",
      "The expression inside sizeof is NOT evaluated at runtime (unevaluated operand context)",
      "It causes a compiler warning",
      "i is incremented twice"
    ],
    "answerIndex": 1,
    "explanation": "Operands of sizeof are unevaluated contexts (except C99 VLAs). Expressions inside sizeof (like i++) are never executed at runtime!"
  },
  {
    "question": "Given int i = 5; sizeof(i++); what is the value of i after this line executes?",
    "options": [
      "6",
      "5",
      "0",
      "Undefined"
    ],
    "answerIndex": 1,
    "explanation": "Because sizeof evaluates operand types at compile time without executing code at runtime, i++ is not executed. i remains 5."
  },
  {
    "question": "What type does the sizeof operator return in standard C?",
    "options": [
      "int",
      "unsigned int",
      "size_t (defined in <stddef.h>)",
      "long"
    ],
    "answerIndex": 2,
    "explanation": "sizeof returns a value of unsigned integer type 'size_t' (defined in <stddef.h> / <stdio.h>)."
  },
  {
    "question": "Which format specifier is standard in printf() for printing a size_t value?",
    "options": [
      "%d",
      "%u",
      "%zu",
      "%s"
    ],
    "answerIndex": 2,
    "explanation": "%zu is the standard ISO C format specifier for printing size_t values."
  },
  {
    "question": "What is Integer Promotion in C?",
    "options": [
      "Automatic conversion of int to float",
      "Automatic conversion of integer types smaller than int (char, short, bit-fields) to 'int' (or 'unsigned int') before arithmetic/bitwise operations",
      "Upgrading variables to global scope",
      "Converting signed to unsigned"
    ],
    "answerIndex": 1,
    "explanation": "Integer Promotion automatically promotes types smaller than int (char, signed char, unsigned char, short, unsigned short) to 'int' (or 'unsigned int') prior to evaluation."
  },
  {
    "question": "Given char a = 10, b = 20; what is the type of the expression (a + b)?",
    "options": [
      "char",
      "int (due to integer promotion)",
      "short",
      "unsigned char"
    ],
    "answerIndex": 1,
    "explanation": "During evaluation of (a + b), both char operands undergo integer promotion to 'int'. The result of the addition is of type 'int'."
  },
  {
    "question": "What is the hierarchy of Usual Arithmetic Conversions when mixing types in C?",
    "options": [
      "int < long < float < double < long double",
      "long double > double > float > unsigned long long > long long > unsigned long > long > unsigned int > int",
      "float > int > double",
      "char > int > float"
    ],
    "answerIndex": 1,
    "explanation": "Usual arithmetic conversions promote smaller/lower-rank types to match the highest-rank operand type present in the expression: long double > double > float > unsigned integer types > signed integer types."
  },
  {
    "question": "What is the value and outcome of the comparison expression: (-1 > 1U) on a system with 32-bit int?",
    "options": [
      "Evaluates to 0 (false) because -1 is less than 1",
      "Evaluates to 1 (true) because signed -1 is converted to unsigned int (4294967295), which is > 1!",
      "Triggers a compiler error",
      "Evaluates to -1"
    ],
    "answerIndex": 1,
    "explanation": "When comparing signed int (-1) and unsigned int (1U), usual arithmetic conversions promote -1 to unsigned int (UINT_MAX, 4294967295). Since 4294967295 > 1, the condition evaluates to 1 (TRUE)! This is a classic C gotcha."
  },
  {
    "question": "How do you perform explicit type casting in C?",
    "options": [
      "(type_name) expression",
      "convert<type_name>(expression)",
      "expression.toType()",
      "cast(type_name, expression)"
    ],
    "answerIndex": 0,
    "explanation": "Explicit type casting uses parentheses containing the desired target type name before the expression: (type_name) expression."
  },
  {
    "question": "What is the result of expression: (float) 7 / 2?",
    "options": [
      "3.0f",
      "3.5f",
      "3f",
      "4.0f"
    ],
    "answerIndex": 1,
    "explanation": "(float) 7 casts 7 to 7.0f. Then 7.0f / 2 triggers floating-point division, producing 3.5f."
  },
  {
    "question": "What is the result of expression: (float) (7 / 2)?",
    "options": [
      "3.5f",
      "3.0f (integer division 7/2 occurs first giving 3, then cast to 3.0f)",
      "3.75f",
      "4.0f"
    ],
    "answerIndex": 1,
    "explanation": "The parentheses (7 / 2) force integer division first, resulting in 3. Casting 3 to float yields 3.0f."
  },
  {
    "question": "Does explicit type casting alter the stored value or original type of the source variable?",
    "options": [
      "Yes, it permanently changes the variable's type in RAM",
      "No, it creates a temporary converted value for expression evaluation without modifying the source variable",
      "Yes, it frees the source memory",
      "It changes the variable name"
    ],
    "answerIndex": 1,
    "explanation": "Type casting only converts the evaluated value within the expression; it NEVER alters the original variable's underlying data type or memory representation."
  },
  {
    "question": "What is the value of int a = (int) 3.99;",
    "options": [
      "4",
      "3 (truncates decimal portion)",
      "3.99",
      "Undefined"
    ],
    "answerIndex": 1,
    "explanation": "Casting a floating-point number to an integer truncates (discards) the fractional part, resulting in 3."
  },
  {
    "question": "Which operator has higher precedence: unary bitwise NOT (~) or binary bitwise AND (&)?",
    "options": [
      "~ (Unary operators have higher precedence than binary operators)",
      "&",
      "Equal precedence",
      "Depends on parentheses"
    ],
    "answerIndex": 0,
    "explanation": "Unary operators (like ~) have higher precedence than binary bitwise operators (like &)."
  },
  {
    "question": "Which operator has higher precedence: Addition (+) or Shift (<<)?",
    "options": [
      "Shift (<<)",
      "Addition (+)",
      "Equal precedence",
      "Right shift has higher precedence"
    ],
    "answerIndex": 1,
    "explanation": "Additive operators (+, -) have HIGHER precedence than shift operators (<<, >>). Therefore, 1 << 2 + 1 evaluates as 1 << (2 + 1) = 1 << 3 = 8!"
  },
  {
    "question": "What is the value of expression: 1 << 2 + 1?",
    "options": [
      "5",
      "8",
      "4",
      "3"
    ],
    "answerIndex": 1,
    "explanation": "Addition '+' has higher precedence than '<<'. 2 + 1 = 3. Then 1 << 3 = 8."
  },
  {
    "question": "Which operator has higher precedence: Relational (<) or Equality (==)?",
    "options": [
      "Relational (<, <=, >, >=)",
      "Equality (==, !=)",
      "Equal precedence",
      "Equality has higher precedence"
    ],
    "answerIndex": 0,
    "explanation": "Relational operators (<, <=, >, >=) have HIGHER precedence than equality operators (==, !=)."
  },
  {
    "question": "Which operator has higher precedence: Logical AND (&&) or Logical OR (||)?",
    "options": [
      "Logical OR (||)",
      "Logical AND (&&)",
      "Equal precedence",
      "Associates Right-to-Left"
    ],
    "answerIndex": 1,
    "explanation": "Logical AND (&&) has HIGHER precedence than Logical OR (||)."
  },
  {
    "question": "What is the value of expression: 1 || 0 && 0?",
    "options": [
      "0",
      "1 (because && evaluates first: 0 && 0 = 0; then 1 || 0 = 1)",
      "Undefined",
      "Compiler error"
    ],
    "answerIndex": 1,
    "explanation": "&& has higher precedence than ||. (0 && 0) is 0. Then 1 || 0 is 1. (Also short-circuiting skips &&)."
  },
  {
    "question": "Given int a = 2, b = 3; int c = a === b; what happens?",
    "options": [
      "c = 0",
      "c = 1",
      "Compiler syntax error ('===' is JavaScript syntax, not valid C)",
      "c = 2"
    ],
    "answerIndex": 2,
    "explanation": "'===' is not a valid operator in C. It causes a compiler syntax error."
  },
  {
    "question": "What is the value of sizeof(double) / sizeof(float) on standard platforms?",
    "options": [
      "1",
      "2 (8 bytes / 4 bytes = 2)",
      "4",
      "0.5"
    ],
    "answerIndex": 1,
    "explanation": "sizeof(double) is 8 bytes; sizeof(float) is 4 bytes. 8 / 4 = 2."
  },
  {
    "question": "What is the evaluation order of function arguments in a C function call like foo(g(), h())?",
    "options": [
      "g() is always called first",
      "h() is always called first",
      "Unspecified / implementation-dependent (the compiler may evaluate arguments in any order)",
      "Both run concurrently"
    ],
    "answerIndex": 2,
    "explanation": "In C standard, the evaluation order of function arguments is UNSPECIFIED. Relying on argument evaluation order is a common bug."
  },
  {
    "question": "What is sequence point in C?",
    "options": [
      "A point in execution where all side effects of previous evaluations are guaranteed to be complete",
      "A line number in source code",
      "A memory address in RAM",
      "A loop termination condition"
    ],
    "answerIndex": 0,
    "explanation": "A sequence point defines a boundary in execution where all previous side effects (such as variable assignments/increments) are fully finalized before proceeding."
  },
  {
    "question": "Which of the following creates an explicit sequence point in C?",
    "options": [
      "The semicolon ';', logical AND '&&', logical OR '||', conditional operator '? :', and function call ','",
      "Arithmetic plus operator '+'",
      "Bitwise AND operator '&'",
      "Simple assignment '='"
    ],
    "answerIndex": 0,
    "explanation": "Sequence points occur at statement ends ';', logical AND '&&', logical OR '||', ternary '? :', comma operator ',', and function call entry points."
  }
];
