const questions = [
  {
    question: "What is a string in C and how does it differ from a generic character array?",
    shortAnswer: "A C string is a character array terminated by a special null character ('\\0', ASCII value 0).",
    explanation: "A generic character array can store arbitrary bytes without '\\0'. Standard C string library functions rely strictly on '\\0' to know where text ends.",
    hint: "Null-terminated character sequence.",
    level: "basic"
  },
  {
    question: "What is the ASCII integer value and byte size of the null terminator '\\0'?",
    shortAnswer: "ASCII integer value is 0; it occupies exactly 1 byte of memory.",
    explanation: "'\\0' is an escape sequence for the null byte (binary 00000000). Do not confuse it with character '0' which has ASCII value 48.",
    hint: "ASCII 0 vs ASCII 48 for digit '0'.",
    level: "basic"
  },
  {
    question: "How much memory does the string literal \"Hello\" occupy in C?",
    shortAnswer: "6 bytes (5 visible letters + 1 null terminator '\\0').",
    explanation: "The compiler automatically appends a hidden '\\0' byte to every double-quoted string literal.",
    hint: "Count characters + 1 for '\\0'.",
    level: "basic"
  },
  {
    question: "What is the difference between char str[] = \"Code\"; and char *str = \"Code\";?",
    shortAnswer: "char str[] creates a mutable array on the stack; char *str points to read-only memory in the .rodata segment.",
    explanation: "Attempting to modify str[0] = 'M' on char *str causes a runtime Segmentation Fault because string literals reside in write-protected memory.",
    hint: "Stack mutable array vs Read-only string literal pointer.",
    level: "intermediate",
    codeExample: "char a[] = \"Hello\"; a[0] = 'M'; // OK\nchar *b = \"Hello\"; b[0] = 'M'; // SEGFAULT!"
  },
  {
    question: "What happens if you print a character array that lacks a '\\0' terminator using printf(\"%s\", arr)?",
    shortAnswer: "Undefined Behavior (UB). printf continues reading past the array until it encounters a 0 byte in memory.",
    explanation: "printf will output garbage characters from adjacent stack memory and may crash if it reaches protected memory.",
    hint: "%s searches indefinitely until a 0 byte is found.",
    level: "intermediate"
  },
  {
    question: "What is the output of sizeof(\"C\") vs sizeof('C') in standard C?",
    shortAnswer: "sizeof(\"C\") is 2 bytes; sizeof('C') is 4 bytes (sizeof(int)) in C.",
    explanation: "String literal \"C\" is a 2-byte char array ('C', '\\0'). Character constant 'C' has type int in C (4 bytes).",
    hint: "Character literals have type int in C.",
    level: "advanced"
  },
  {
    question: "How do you declare an empty string in C?",
    shortAnswer: "char str[1] = \"\"; or char str[1] = {'\\0'};",
    explanation: "An empty string contains only the null terminator at index 0 (length = 0, size = 1 byte).",
    hint: "String containing only '\\0'.",
    level: "basic"
  },
  {
    question: "What is the difference between the null character '\\0', NULL, and 0 in C?",
    shortAnswer: "'\\0' is char constant with value 0; NULL is a null pointer constant ((void*)0); 0 is integer zero.",
    explanation: "Numerically all represent zero, but their semantic types differ: char, pointer, and int.",
    hint: "Char 0 vs Pointer 0 vs Integer 0.",
    level: "intermediate"
  },
  {
    question: "What is the memory segment where string literals like \"Sukanta Hui\" are stored by modern operating systems?",
    shortAnswer: "The .rodata (Read-Only Data) / Text Segment.",
    explanation: "String literals are baked into the executable's binary image and mapped into read-only virtual memory pages.",
    hint: ".rodata segment in binary.",
    level: "intermediate"
  },
  {
    question: "What happens if an array is declared as char str[5] = \"Hello\";?",
    options: [
      "Compile error in C99/C11",
      "Valid in C, but str is NOT null-terminated because 5 bytes hold 'H','e','l','l','o' with no space for '\\0'",
      "str expands to 6 bytes",
      "Last letter 'o' is truncated"
    ],
    correctAnswer: 1,
    explanation: "In C, assigning a 5-letter literal to a 5-element char array drops the null terminator. Using it with %s causes UB!",
    hint: "No room left for '\\0'.",
    level: "advanced"
  },
  {
    question: "How do you determine the length of a string without using <string.h>?",
    shortAnswer: "Iterate a pointer or index until arr[i] == '\\0' and count the steps.",
    explanation: "Loop while (*str != '\\0') { count++; str++; } in O(n) time.",
    hint: "Count characters until '\\0'.",
    level: "basic",
    codeExample: "int len = 0;\nwhile (str[len] != '\\0') len++;"
  },
  {
    question: "Can two identical string literals share the exact same memory address in C?",
    shortAnswer: "Yes, modern compilers perform 'String Pooling' (string literal deduplication).",
    explanation: "Compilers merge identical string literals into a single instance in .rodata to conserve binary size.",
    hint: "String pooling optimization in GCC/Clang.",
    level: "advanced"
  },
  {
    question: "What is the difference between \"A\" and 'A'?",
    shortAnswer: "\"A\" is a string literal (2 bytes: 'A', '\\0'); 'A' is an integer character literal (1 char / int).",
    explanation: "Double quotes represent null-terminated string pointers; single quotes represent single character codes.",
    hint: "Double quotes vs Single quotes.",
    level: "basic"
  },
  {
    question: "How do you copy a string literal into a mutable character array?",
    shortAnswer: "Using strcpy(dest, \"text\") or strcpy_s / strncpy.",
    explanation: "Direct assignment dest = \"text\" is illegal because array names are non-modifiable lvalues.",
    hint: "Use strcpy() to copy characters.",
    level: "basic"
  },
  {
    question: "What is the format specifier for printing a string in printf?",
    shortAnswer: "%s.",
    explanation: "%s expects a pointer to the first character (char*) and prints until it hits '\\0'.",
    hint: "%s format specifier.",
    level: "basic"
  },
  {
    question: "What is the format specifier for printing a single character in printf?",
    shortAnswer: "%c.",
    explanation: "%c prints a single character corresponding to its ASCII integer code.",
    hint: "%c format specifier.",
    level: "basic"
  },
  {
    question: "What is the result of checking if (str == \"hello\") in C?",
    shortAnswer: "It compares memory pointer addresses, NOT string contents! Use strcmp() instead.",
    explanation: "Operator == checks whether str holds the same memory address as the literal, which is usually false.",
    hint: "== compares addresses; use strcmp() for text equality.",
    level: "basic"
  },
  {
    question: "What is the ASCII value range for uppercase English letters ('A' to 'Z')?",
    shortAnswer: "65 ('A') to 90 ('Z').",
    explanation: "'A' = 65, 'B' = 66 ... 'Z' = 90. Adding 32 converts uppercase to lowercase ('a' = 97).",
    hint: "65 to 90.",
    level: "basic"
  },
  {
    question: "What is the ASCII value range for lowercase English letters ('a' to 'z')?",
    shortAnswer: "97 ('a') to 122 ('z').",
    explanation: "'a' = 97, 'b' = 98 ... 'z' = 122. Subtracting 32 converts lowercase to uppercase.",
    hint: "97 to 122.",
    level: "basic"
  },
  {
    question: "What is the ASCII value range for decimal digits ('0' to '9')?",
    shortAnswer: "48 ('0') to 57 ('9').",
    explanation: "Subtracting '0' (48) from a digit character yields its integer numeric value (e.g. '7' - '0' = 7).",
    hint: "48 to 57.",
    level: "basic"
  },
  {
    question: "What is the size of an array of characters declared as char msg[100] = \"Hello\";?",
    shortAnswer: "sizeof(msg) is 100 bytes; strlen(msg) is 5.",
    explanation: "sizeof returns allocated capacity (100 bytes); strlen counts characters up to '\\0' (5).",
    hint: "sizeof = 100, strlen = 5.",
    level: "basic"
  },
  {
    question: "How do you convert an uppercase character c to lowercase without ctype.h?",
    shortAnswer: "c = c + 32; or c = c + ('a' - 'A');",
    explanation: "In ASCII, lowercase characters are offset by +32 from uppercase equivalents.",
    hint: "Add 32 or ('a' - 'A').",
    level: "basic"
  },
  {
    question: "Can a string in C contain multiple null characters '\\0' inside its allocated buffer?",
    shortAnswer: "Yes, but standard string functions will treat the first '\\0' as the end of the string.",
    explanation: "Data beyond the first '\\0' remains in memory but is ignored by %s, strlen, and strcpy.",
    hint: "First '\\0' terminates logical string view.",
    level: "intermediate"
  },
  {
    question: "What is the escape sequence for printing double quotes inside a string literal?",
    shortAnswer: "\\\".",
    explanation: "printf(\"Hello \\\"World\\\"\"); prints Hello \"World\".",
    hint: "Backslash escape \\\"",
    level: "basic"
  },
  {
    question: "Why does assigning char str[10]; str = \"test\"; cause a compilation error?",
    shortAnswer: "Because array names are non-modifiable lvalues and cannot be targets of an assignment operator.",
    explanation: "Use strcpy(str, \"test\"); to copy characters into array memory.",
    hint: "Array names cannot be reassigned.",
    level: "basic"
  }
];

export default questions;
