// 200 Comprehensive MCQs for Module 002_006: Strings & Character Array Handling
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  // 1-35: String Fundamentals, Representation & Memory Layout
  {
    question: "What is a string in the C programming language?",
    options: [
      "A primitive built-in data type like `int` or `float`",
      "A contiguous sequence of characters terminated by a null character ('\\0')",
      "A dynamic object with built-in length properties",
      "An array of integer ASCII values terminated by EOF"
    ],
    correctAnswer: 1,
    explanation: "C has no native string data type; strings are 1D character arrays terminated with the null byte '\\0'."
  },
  {
    question: "What is the ASCII value and byte size of the null terminator '\\0'?",
    options: [
      "ASCII value 0, occupying 1 byte",
      "ASCII value 48, occupying 1 byte",
      "ASCII value 32, occupying 2 bytes",
      "ASCII value -1, occupying 4 bytes"
    ],
    correctAnswer: 0,
    explanation: "'\\0' is an escape sequence for a byte containing binary zero (0x00, ASCII 0)."
  },
  {
    question: "How many bytes of memory are allocated for the string literal \"Barrackpore\"?",
    options: ["11 bytes", "12 bytes", "10 bytes", "8 bytes"],
    correctAnswer: 1,
    explanation: "\"Barrackpore\" contains 11 visible characters + 1 hidden null terminator '\\0' = 12 bytes."
  },
  {
    question: "What happens if you execute `char str[5] = \"Hello\"; printf(\"%s\", str);`?",
    options: [
      "Prints \"Hello\" normally",
      "Compilation error in C99",
      "Undefined Behavior: str lacks '\\0', so printf reads past array bounds into stack memory",
      "Prints \"Hell\""
    ],
    correctAnswer: 2,
    explanation: "The 5 characters 'H','e','l','l','o' fill the entire array leaving no space for '\\0'. %s causes buffer over-read."
  },
  {
    question: "Where are string literals like `\"Sukanta Hui\"` stored in modern operating systems?",
    options: [
      "Stack frame",
      "Heap memory",
      "Read-Only Data segment (.rodata / Text segment)",
      "CPU registers"
    ],
    correctAnswer: 2,
    explanation: "String literals are placed in the read-only `.rodata` segment and mapped to write-protected pages."
  },
  {
    question: "What happens if a program attempts `char *p = \"Hello\"; p[0] = 'M';`?",
    options: [
      "Modifies string to \"Mello\"",
      "Runtime crash / Segmentation Fault due to write-protection on .rodata",
      "Compiler warning, but modifies safely",
      "Memory duplicates to heap"
    ],
    correctAnswer: 1,
    explanation: "String literals are immutable; modifying them triggers an OS memory access violation."
  },
  {
    question: "Why is `char str[] = \"Hello\"; str[0] = 'M';` completely legal?",
    options: [
      "Because `str` is allocated as a mutable array on the active function stack frame",
      "Because `str` is in heap",
      "Because the compiler is lenient",
      "It is only valid in C++"
    ],
    correctAnswer: 0,
    explanation: "Stack arrays copy the literal's characters into local mutable stack memory upon initialization."
  },
  {
    question: "What will `sizeof(\"A\")` and `sizeof('A')` evaluate to in C?",
    options: [
      "2 bytes and 4 bytes (sizeof int)",
      "1 byte and 1 byte",
      "2 bytes and 1 byte",
      "1 byte and 4 bytes"
    ],
    correctAnswer: 0,
    explanation: "String literal \"A\" is char[2] ('A', '\\0'); character constant 'A' has type int (4 bytes in C)."
  },
  {
    question: "How is an empty string represented in C memory?",
    options: [
      "A null pointer `NULL`",
      "A character array where the very first element is `'\\0'` (1 byte)",
      "A 0-byte memory block",
      "An uninitialized buffer"
    ],
    correctAnswer: 1,
    explanation: "An empty string `\"\"` occupies 1 byte containing only the null terminator `{'\\0'}`."
  },
  {
    question: "What does `str1 == str2` compare when `str1` and `str2` are C strings?",
    options: [
      "The alphabetical contents of the strings",
      "The memory pointer addresses of the strings",
      "The string lengths",
      "The ASCII hash values"
    ],
    correctAnswer: 1,
    explanation: "Equality operator `==` compares raw pointer addresses, NOT the string text. Use `strcmp()`."
  },
  {
    question: "What is the ASCII value of character '0' (digit zero)?",
    options: ["0", "48", "32", "65"],
    correctAnswer: 1,
    explanation: "Digit '0' has ASCII value 48. Null character '\\0' has ASCII value 0."
  },
  {
    question: "What is the ASCII value of uppercase letter 'A' and lowercase 'a'?",
    options: ["65 and 97", "97 and 65", "48 and 65", "1 and 26"],
    correctAnswer: 0,
    explanation: "'A' = 65, 'a' = 97. The difference is 32."
  },
  {
    question: "What is the mathematical relation between uppercase and lowercase ASCII characters?",
    options: [
      "`lowercase = uppercase + 32`",
      "`lowercase = uppercase - 32`",
      "`lowercase = uppercase * 2`",
      "`lowercase = uppercase + 26`"
    ],
    correctAnswer: 0,
    explanation: "Adding 32 (or setting the 6th bit) converts uppercase to lowercase in ASCII."
  },
  {
    question: "What is the output of `char s[] = \"Code\\0Tax\"; printf(\"%s\", s);`?",
    options: ["CodeTax", "Code", "Tax", "Code 0 Tax"],
    correctAnswer: 1,
    explanation: "`%s` stops reading immediately upon encountering the first `\\0` byte after \"Code\"."
  },
  {
    question: "What is the size of the array `char s[] = \"Code\\0Tax\";`?",
    options: ["4 bytes", "5 bytes", "9 bytes", "8 bytes"],
    correctAnswer: 2,
    explanation: "The array stores: 'C','o','d','e','\\0','T','a','x','\\0' = 9 bytes total."
  },
  {
    question: "Can an array name be reassigned with a new string like `char s[20]; s = \"NewText\";`?",
    options: [
      "Yes, in C99",
      "No, array names are non-modifiable lvalues; use `strcpy()`",
      "Yes, if the length is smaller",
      "Yes, using typecast"
    ],
    correctAnswer: 1,
    explanation: "Array identifiers cannot be assigned to; their memory location is fixed."
  },
  {
    question: "What is String Literal Pooling (Deduplication)?",
    options: [
      "An optimization where identical string literals share the exact same memory address in .rodata",
      "A memory leak",
      "Dynamic allocation of strings",
      "Garbage collection in C"
    ],
    correctAnswer: 0,
    explanation: "Compilers merge identical string literals into a single instance in `.rodata` to save binary space."
  },
  {
    question: "What is the escape sequence for printing a literal percent sign `%` in `printf`?",
    options: ["\\%", "%%", "/%", "%p"],
    correctAnswer: 1,
    explanation: "`%%` is the format specifier to output a single `%` character."
  },
  {
    question: "What does `const char *str` declare?",
    options: [
      "A constant pointer to mutable characters",
      "A pointer to constant (read-only) character data",
      "A constant array of strings",
      "An immutable pointer in ROM"
    ],
    correctAnswer: 1,
    explanation: "The character data cannot be modified through this pointer."
  },
  {
    question: "What does `char * const str` declare?",
    options: [
      "A constant pointer whose address cannot be reassigned",
      "A pointer to read-only characters",
      "A string literal",
      "A double pointer"
    ],
    correctAnswer: 0,
    explanation: "The pointer variable itself is constant and cannot point to another memory address."
  },
  {
    question: "What is the format specifier for printing a pointer address in `printf`?",
    options: ["%d", "%s", "%p", "%x"],
    correctAnswer: 2,
    explanation: "`%p` formats pointer values, conventionally cast as `(void*)ptr`."
  },
  {
    question: "What does `sizeof(str)` return for `char *str = \"Barrackpore\";` on a 64-bit system?",
    options: ["12 bytes", "8 bytes (pointer size)", "11 bytes", "4 bytes"],
    correctAnswer: 1,
    explanation: "`sizeof` on a pointer variable returns the pointer byte size (8 bytes on 64-bit), NOT string length."
  },
  {
    question: "What does `sizeof(str)` return for `char str[] = \"Barrackpore\";`?",
    options: ["8 bytes", "11 bytes", "12 bytes", "16 bytes"],
    correctAnswer: 2,
    explanation: "For an array, `sizeof` returns total allocated bytes: 11 characters + 1 null terminator = 12 bytes."
  },
  {
    question: "How do you check if a character variable `c` is an uppercase letter without `<ctype.h>`?",
    options: [
      "`c >= 'A' && c <= 'Z'`",
      "`c >= 65 && c <= 90`",
      "Both of the above",
      "`c.isUpper()`"
    ],
    correctAnswer: 2,
    explanation: "Both ASCII character literals and integer bounds accurately test for uppercase letters."
  },
  {
    question: "How do you check if a character variable `c` is a decimal digit without `<ctype.h>`?",
    options: [
      "`c >= '0' && c <= '9'`",
      "`c >= 0 && c <= 9`",
      "`c.isDigit()`",
      "`typeof(c) == int`"
    ],
    correctAnswer: 0,
    explanation: "Comparing with character literals `'0'` (48) and `'9'` (57) validates digit characters."
  },

  // 36-70: Safe String I/O: fgets, gets removal, scanf, puts
  {
    question: "Why was the standard library function `gets()` removed from the ISO C11 standard?",
    options: [
      "It was too slow",
      "It lacks a buffer size limit parameter, creating severe buffer overflow vulnerabilities (CWE-120)",
      "It does not work on 64-bit systems",
      "It was renamed to scanf"
    ],
    correctAnswer: 1,
    explanation: "`gets()` cannot prevent buffer overflows because it has no boundary check."
  },
  {
    question: "What is the standard, secure C replacement for `gets()`?",
    options: [
      "`fgets(buffer, sizeof(buffer), stdin);`",
      "`scanf(\"%s\", buffer);`",
      "`read(buffer);`",
      "`get_string(buffer);`"
    ],
    correctAnswer: 0,
    explanation: "`fgets()` requires the buffer capacity, preventing stack buffer overflows."
  },
  {
    question: "What character does `fgets()` retain at the end of the input string if buffer space permits?",
    options: [
      "Space character ' '",
      "Newline character '\\n'",
      "Carriage return '\\r' only",
      "EOF"
    ],
    correctAnswer: 1,
    explanation: "`fgets()` includes the newline (`'\\n'`) generated when the user presses Enter."
  },
  {
    question: "How do you sanitize and remove the trailing newline character from `fgets()` output?",
    options: [
      "`str[strcspn(str, \"\\n\")] = '\\0';`",
      "`delete '\\n';`",
      "`str.strip('\\n');`",
      "`free(str[\\n]);`"
    ],
    correctAnswer: 0,
    explanation: "Finding the index of `'\\n'` with `strcspn()` and setting it to `'\\0'` strips the newline."
  },
  {
    question: "What happens when using `scanf(\"%s\", buffer);` on the input \"Sukanta Hui\"?",
    options: [
      "The entire line \"Sukanta Hui\" is stored",
      "Only \"Sukanta\" is stored; reading halts at the space character",
      "Compilation error",
      "A null character is placed at the start"
    ],
    correctAnswer: 1,
    explanation: "`%s` stops scanning at the first whitespace character (space, tab, or newline)."
  },
  {
    question: "How do you prevent buffer overflow when using `scanf(\"%s\")` on a 50-byte array?",
    options: [
      "Use `scanf(\"%49s\", buffer);`",
      "Use `scanf(\"%50s\", buffer);`",
      "Use `scanf(\"%s&50\", buffer);`",
      "It is impossible"
    ],
    correctAnswer: 0,
    explanation: "Specifying `%49s` limits input to 49 characters, reserving 1 byte for the null terminator."
  },
  {
    question: "What is the scanset format to read a full line with spaces using `scanf`?",
    options: [
      "`scanf(\" %49[^\n]\", buffer);`",
      "`scanf(\"%all\", buffer);`",
      "`scanf(\"%s*\", buffer);`",
      "`scanf(\"%line\", buffer);`"
    ],
    correctAnswer: 0,
    explanation: "`%[^\n]` reads all characters until a newline is encountered."
  },
  {
    question: "What does `puts(str)` do that `printf(\"%s\", str)` does NOT do?",
    options: [
      "Automatically appends a newline character (`'\\n'`) to the output",
      "Flushes the GPU buffer",
      "Converts lowercase to uppercase",
      "Prints the memory address"
    ],
    correctAnswer: 0,
    explanation: "`puts()` outputs the string and automatically writes a terminating newline to stdout."
  },
  {
    question: "Why does `scanf(\"%d\", &num);` followed by `fgets(str, 50, stdin);` cause `fgets` to appear skipped?",
    options: [
      "CPU timing bug",
      "The trailing newline `'\\n'` left in the stdin buffer by `scanf` is immediately consumed by `fgets` as an empty line",
      "`fgets` does not work after integer inputs",
      "`num` overwrites `str`"
    ],
    correctAnswer: 1,
    explanation: "Pressing Enter leaves `'\\n'` in the stdin stream. Consume it first with `getchar()`."
  },
  {
    question: "Why should `fflush(stdin)` NEVER be used in standard C?",
    options: [
      "It is too slow",
      "The C standard specifies `fflush()` behavior strictly for output streams; calling it on `stdin` is Undefined Behavior",
      "It deletes files on disk",
      "It is deprecated in C++ only"
    ],
    correctAnswer: 1,
    explanation: "ISO C defines `fflush` solely for output streams. Its behavior on input streams is undefined."
  },
  {
    question: "What is the standard compliant method to clear leftover characters from the `stdin` buffer?",
    options: [
      "`int c; while ((c = getchar()) != '\\n' && c != EOF);`",
      "`clear(stdin);`",
      "`stdin = NULL;`",
      "`reset_stream(stdin);`"
    ],
    correctAnswer: 0,
    explanation: "A while loop reading characters with `getchar()` until `'\\n'` or `EOF` safely drains `stdin`."
  },
  {
    question: "What does `getchar()` return when reading input?",
    options: [
      "A `char` value",
      "An `int` value (to represent all char values plus `EOF` / -1)",
      "A pointer `char*`",
      "A string"
    ],
    correctAnswer: 1,
    explanation: "`getchar()` returns `int` so it can return `EOF` (-1) without collision with character 255."
  },
  {
    question: "What does `snprintf(buf, size, format, ...)` guarantee?",
    options: [
      "It writes at most `size` bytes (including terminating `'\\0'`), preventing buffer overflow",
      "It encrypts the output",
      "It allocates heap memory dynamically",
      "It prints directly to the printer"
    ],
    correctAnswer: 0,
    explanation: "`snprintf()` enforces an upper bound on output size, guaranteeing null termination."
  },
  {
    question: "What does `sscanf(str, format, ...)` do?",
    options: [
      "Reads formatted data from standard console input",
      "Reads and parses formatted data from an existing in-memory string buffer",
      "Scans strings for viruses",
      "Prints strings to a file"
    ],
    correctAnswer: 1,
    explanation: "`sscanf()` parses variables directly from a string buffer."
  },
  {
    question: "What is a Format String Attack?",
    options: [
      "Passing user-controlled input directly as format string `printf(user_input)` allowing memory inspection or overwrites",
      "Typing incorrect format specifiers",
      "Running out of disk space",
      "A CSS styling issue"
    ],
    correctAnswer: 0,
    explanation: "Attackers pass `%x` or `%n` in user input to read/write stack memory. Always use `printf(\"%s\", input)`."
  },

  // 71-110: Standard <string.h> Functions
  {
    question: "What does `strlen(str)` return?",
    options: [
      "Total allocated buffer size in bytes",
      "Number of characters before the null terminator `'\\0'` (type `size_t`)",
      "Number of characters including '\\0'",
      "Memory address of the string"
    ],
    correctAnswer: 1,
    explanation: "`strlen()` counts characters up to, but not including, the terminating `\\0`."
  },
  {
    question: "What happens if `NULL` is passed to `strlen(NULL)`?",
    options: [
      "Returns 0",
      "Returns -1",
      "Segmentation Fault / Undefined Behavior",
      "Returns `SIZE_MAX`"
    ],
    correctAnswer: 2,
    explanation: "Standard `<string.h>` routines do not check for NULL pointers; dereferencing NULL causes a crash."
  },
  {
    question: "What is the return type of `strlen()`?",
    options: ["int", "long", "size_t", "unsigned short"],
    correctAnswer: 2,
    explanation: "`size_t` is the standard unsigned integer type defined for object byte sizes."
  },
  {
    question: "How does `strcpy(dest, src)` work?",
    options: [
      "Copies characters from `src` to `dest` up to and including `'\\0'`",
      "Appends `src` to the end of `dest`",
      "Compares `src` and `dest`",
      "Swaps pointer addresses"
    ],
    correctAnswer: 0,
    explanation: "`strcpy()` copies all characters from `src` into `dest` including the terminating `\\0`."
  },
  {
    question: "What is the critical caveat when using `strncpy(dest, src, n)`?",
    options: [
      "It runs slower than strcpy",
      "If `strlen(src) >= n`, it does NOT append a null terminator to `dest`",
      "It only works with numbers",
      "It frees the source string"
    ],
    correctAnswer: 1,
    explanation: "If `src` fills or exceeds `n` bytes, `strncpy` omits `\\0`. Always write `dest[n-1] = '\\0'` manually."
  },
  {
    question: "What does `strcat(dest, src)` do?",
    options: [
      "Finds the null terminator in `dest`, appends `src` starting there, and adds a new `'\\0'`",
      "Copies `src` over `dest`",
      "Splits `dest` into two",
      "Calculates string difference"
    ],
    correctAnswer: 0,
    explanation: "`strcat` concatenates `src` onto the end of `dest`."
  },
  {
    question: "What does `strncat(dest, src, n)` guarantee regarding the null terminator?",
    options: [
      "It never appends '\\0'",
      "It appends at most `n` characters AND always appends a terminating `'\\0'`",
      "It appends '\\0' only if space permits",
      "It overwrites all memory with 0"
    ],
    correctAnswer: 1,
    explanation: "Unlike `strncpy`, `strncat` always ensures the result is null-terminated (writing up to `n + 1` bytes)."
  },
  {
    question: "What does `strcmp(s1, s2)` return when `s1` is identical to `s2`?",
    options: ["1 (true)", "0", "-1", "Length of string"],
    correctAnswer: 1,
    explanation: "`strcmp` returns 0 when strings match exactly."
  },
  {
    question: "What does `strcmp(\"Apple\", \"Banana\")` return?",
    options: [
      "A negative integer (< 0) because 'A' (65) < 'B' (66)",
      "A positive integer (> 0)",
      "0",
      "1"
    ],
    correctAnswer: 0,
    explanation: "'Apple' comes before 'Banana' alphabetically, so the difference is negative."
  },
  {
    question: "What does `strncmp(s1, s2, n)` do?",
    options: [
      "Compares at most the first `n` characters of `s1` and `s2`",
      "Compares string lengths only",
      "Compares `n` strings simultaneously",
      "Performs case-insensitive comparison"
    ],
    correctAnswer: 0,
    explanation: "`strncmp` limits comparison to the first `n` characters."
  },
  {
    question: "What does `strchr(str, ch)` return?",
    options: [
      "The integer index of `ch`",
      "A pointer to the FIRST occurrence of character `ch` in `str`, or `NULL` if not found",
      "The total count of character `ch`",
      "Boolean 1 or 0"
    ],
    correctAnswer: 1,
    explanation: "`strchr` returns a `char*` pointing to the first occurrence of `ch`, or `NULL`."
  },
  {
    question: "What does `strrchr(str, ch)` return?",
    options: [
      "Pointer to the LAST (rightmost) occurrence of character `ch` in `str`, or `NULL`",
      "Pointer to first character",
      "Reversed string",
      "Random character"
    ],
    correctAnswer: 0,
    explanation: "`strrchr` (string reverse character) finds the rightmost occurrence of a character."
  },
  {
    question: "What does `strstr(haystack, needle)` return?",
    options: [
      "Pointer to the first occurrence of substring `needle` in `haystack`, or `NULL`",
      "Integer count of occurrences",
      "Boolean true/false",
      "Length of substring"
    ],
    correctAnswer: 0,
    explanation: "`strstr()` locates the first appearance of substring `needle` in `haystack`."
  },
  {
    question: "How does `strtok(str, delim)` tokenize a string?",
    options: [
      "It creates new heap copies of each token",
      "It modifies the original string by replacing delimiter characters with `'\\0'` in-place",
      "It returns a 2D array",
      "It uses regex"
    ],
    correctAnswer: 1,
    explanation: "`strtok()` writes `\\0` into delimiter positions and remembers state across calls."
  },
  {
    question: "Why is `strtok()` not thread-safe?",
    options: [
      "It uses an internal static pointer to track state across successive calls",
      "It locks CPU registers",
      "It allocates infinite memory",
      "It cannot parse commas"
    ],
    correctAnswer: 0,
    explanation: "Internal static state makes `strtok()` vulnerable to race conditions in multi-threaded programs. Use `strtok_r()`."
  },

  // 111-140: Memory Byte Functions (<string.h>)
  {
    question: "What does `memset(ptr, 0, n)` do?",
    options: [
      "Fills `n` bytes of memory starting at `ptr` with byte value 0",
      "Frees `n` bytes of memory",
      "Calculates memory size",
      "Initializes pointers to NULL"
    ],
    correctAnswer: 0,
    explanation: "`memset` sets a contiguous block of bytes to a specified value."
  },
  {
    question: "What is the key difference between `strcpy()` and `memcpy()`?",
    options: [
      "`strcpy` stops at `'\\0'`; `memcpy` copies exact `n` bytes regardless of null bytes",
      "`memcpy` is slower",
      "`strcpy` works on binary structs",
      "`memcpy` only works on numbers"
    ],
    correctAnswer: 0,
    explanation: "`memcpy` is a raw binary memory copier that does not inspect bytes for `\\0`."
  },
  {
    question: "What is the difference between `memcpy()` and `memmove()`?",
    options: [
      "`memmove()` safely handles overlapping source and destination memory regions; `memcpy()` causes UB on overlap",
      "`memcpy` handles overlaps safely",
      "`memmove` only works on strings",
      "`memmove` moves files on disk"
    ],
    correctAnswer: 0,
    explanation: "If `src` and `dest` overlap, `memmove()` buffers data safely to prevent overwrite corruption."
  },
  {
    question: "What does `memcmp(p1, p2, n)` do?",
    options: [
      "Compares the first `n` raw bytes of memory between `p1` and `p2`",
      "Compares string lengths",
      "Compares file sizes",
      "Tests if pointers point to same address"
    ],
    correctAnswer: 0,
    explanation: "`memcmp` performs raw byte-by-byte unsigned comparison."
  },
  {
    question: "What does `strdup(s)` do in POSIX / C23?",
    options: [
      "Duplicates string `s` into dynamically allocated heap memory via `malloc()`",
      "Reverses string",
      "Deletes duplicate characters",
      "Copies string to stack"
    ],
    correctAnswer: 0,
    explanation: "`strdup()` allocates heap memory and duplicates the string. The caller must `free()` the pointer."
  },

  // 141-175: Custom String Algorithms
  {
    question: "How do you calculate string length using a single pointer in a while loop?",
    options: [
      "`int len = 0; while (*s++) len++; return len;`",
      "`return sizeof(s);`",
      "`return s.length;`",
      "`while (s != NULL) len++;`"
    ],
    correctAnswer: 0,
    explanation: "Incrementing pointer until dereferenced value is `\\0` counts length in O(n) time."
  },
  {
    question: "What does the concise K&R loop `while ((*dest++ = *src++));` accomplish?",
    options: [
      "Copies all characters of `src` into `dest` including terminating `'\\0'`",
      "Compares two strings",
      "Reverses two strings",
      "Causes an infinite loop"
    ],
    correctAnswer: 0,
    explanation: "Assigns character, evaluates truth value, and stops when `\\0` (0) is copied."
  },
  {
    question: "How do you reverse a string in-place with O(1) auxiliary space?",
    options: [
      "Swap characters from ends `i = 0, j = len - 1` moving inwards while `i < j`",
      "Allocate a second array and copy backwards",
      "Use recursion without base case",
      "Call `printf(\"%r\", s)`"
    ],
    correctAnswer: 0,
    explanation: "Two-pointer in-place swapping achieves O(n) time and O(1) space."
  },
  {
    question: "What is the time complexity of checking if a string of length N is a Palindrome?",
    options: ["O(N)", "O(N^2)", "O(1)", "O(log N)"],
    correctAnswer: 0,
    explanation: "Comparing characters from both ends takes at most N/2 comparisons = O(N) linear time."
  },
  {
    question: "How do you toggle the case of an alphabetic ASCII character `c` using bitwise operators?",
    options: ["`c ^ 32` (or `c ^ 0x20`)", "`c & 32`", "`c | 32`", "`~c`"],
    correctAnswer: 0,
    explanation: "Bit 5 (value 32) differentiates uppercase and lowercase in ASCII. XOR toggles this bit."
  },
  {
    question: "How do you convert string \"1234\" to integer 1234 without `atoi()`?",
    options: [
      "Iterate digits: `num = num * 10 + (str[i] - '0');`",
      "`num = (int)str;`",
      "`num = str[0] + str[1];`",
      "`num = str * 10;`"
    ],
    correctAnswer: 0,
    explanation: "Subtracting `'0'` converts ASCII digit char to numeric int; multiplying by 10 shifts decimal places."
  },
  {
    question: "How do you verify if two strings are Anagrams?",
    options: [
      "Check if both have matching character frequency counts across all 26 alphabet letters",
      "Check if their lengths are equal",
      "Check if their first and last characters match",
      "Compare them with `strcmp`"
    ],
    correctAnswer: 0,
    explanation: "Anagrams contain the exact same character frequencies rearranged in different order."
  },

  // 176-200: Array of Strings & Advanced Text Handling
  {
    question: "What is the memory difference between `char a[5][20]` and `const char *b[5]`?",
    options: [
      "`a` allocates 100 contiguous bytes; `b` allocates 5 pointers (40 bytes on 64-bit) pointing to external strings",
      "`a` uses less memory",
      "`b` allocates 100 bytes",
      "They are completely identical in memory"
    ],
    correctAnswer: 0,
    explanation: "`a` is a 2D matrix; `b` is an array of memory addresses."
  },
  {
    question: "Why is sorting an array of string pointers `char *names[1000]` faster than sorting `char names[1000][50]`?",
    options: [
      "Swapping pointers copies only 8 bytes; swapping 2D array rows copies 50 bytes using strcpy",
      "Pointer sorting uses GPU",
      "2D array cannot be sorted",
      "Pointers bypass strcmp"
    ],
    correctAnswer: 0,
    explanation: "Swapping 8-byte addresses is O(1) instantaneous CPU work compared to bulk memory moves."
  },
  {
    question: "What does `char *argv[]` in `main(int argc, char *argv[])` represent?",
    options: [
      "An array of string pointers containing command line arguments",
      "A 2D array of 50x50 chars",
      "The return code of the program",
      "A function pointer"
    ],
    correctAnswer: 0,
    explanation: "`argv` is an array of pointers to argument strings passed from the shell."
  },
  {
    question: "What is guaranteed about `argv[argc]` in the C standard?",
    options: [
      "It is always a `NULL` pointer sentinel",
      "It contains the program name",
      "It is undefined",
      "It contains \"END\""
    ],
    correctAnswer: 0,
    explanation: "The ISO C standard guarantees that `argv[argc]` is `NULL`."
  },
  {
    question: "What is the correct comparator signature to sort `char *arr[]` using `qsort()`?",
    options: [
      "`int cmp(const void *a, const void *b) { return strcmp(*(const char**)a, *(const char**)b); }`",
      "`int cmp(char *a, char *b) { return strcmp(a, b); }`",
      "`int cmp(void *a, void *b) { return *a - *b; }`",
      "`int cmp(const char *a, const char *b)`"
    ],
    correctAnswer: 0,
    explanation: "`qsort` passes pointers to elements; since elements are `char*`, the comparator receives `char**`."
  }
];

export default questions;
