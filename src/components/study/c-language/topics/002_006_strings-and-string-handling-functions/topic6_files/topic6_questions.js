// 200 Comprehensive MCQs for Module 002_006: Strings & String Handling Functions
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    "question": "What is a string in the C programming language?",
    "options": [
      "A primitive built-in data type like `int` or `float`",
      "A contiguous sequence of characters terminated by a null character ('\\0')",
      "A dynamic object with built-in length properties",
      "An array of integer ASCII values terminated by EOF"
    ],
    "answerIndex": 1,
    "explanation": "C has no native string data type; strings are 1D character arrays terminated with the null byte '\\0'."
  },
  {
    "question": "What is the ASCII value and byte size of the null terminator '\\0'?",
    "options": [
      "ASCII value 0, occupying 1 byte",
      "ASCII value 48, occupying 1 byte",
      "ASCII value 32, occupying 2 bytes",
      "ASCII value -1, occupying 4 bytes"
    ],
    "answerIndex": 0,
    "explanation": "'\\0' is an escape sequence for a byte containing binary zero (0x00, ASCII 0)."
  },
  {
    "question": "How many bytes of memory are allocated for the string literal \"Barrackpore\"?",
    "options": [
      "11 bytes",
      "12 bytes",
      "10 bytes",
      "8 bytes"
    ],
    "answerIndex": 1,
    "explanation": "\"Barrackpore\" contains 11 visible characters + 1 hidden null terminator '\\0' = 12 bytes."
  },
  {
    "question": "What happens if you execute `char str[5] = \"Hello\"; printf(\"%s\", str);`?",
    "options": [
      "Prints \"Hello\" normally",
      "Compilation error in C99",
      "Undefined Behavior: str lacks '\\0', so printf reads past array bounds into stack memory",
      "Prints \"Hell\""
    ],
    "answerIndex": 2,
    "explanation": "The 5 characters 'H','e','l','l','o' fill the entire array leaving no space for '\\0'. %s causes buffer over-read."
  },
  {
    "question": "Where are string literals like `\"Sukanta Hui\"` stored in modern operating systems?",
    "options": [
      "Stack frame",
      "Heap memory",
      "Read-Only Data segment (.rodata / Text segment)",
      "CPU registers"
    ],
    "answerIndex": 2,
    "explanation": "String literals are placed in the read-only `.rodata` segment and mapped to write-protected pages."
  },
  {
    "question": "What happens if a program attempts `char *p = \"Hello\"; p[0] = 'M';`?",
    "options": [
      "Modifies string to \"Mello\"",
      "Runtime crash / Segmentation Fault due to write-protection on .rodata",
      "Compiler warning, but modifies safely",
      "Memory duplicates to heap"
    ],
    "answerIndex": 1,
    "explanation": "String literals are immutable; modifying them triggers an OS memory access violation."
  },
  {
    "question": "Why is `char str[] = \"Hello\"; str[0] = 'M';` completely legal?",
    "options": [
      "Because `str` is allocated as a mutable array on the active function stack frame",
      "Because `str` is in heap",
      "Because the compiler is lenient",
      "It is only valid in C++"
    ],
    "answerIndex": 0,
    "explanation": "Stack arrays copy the literal's characters into local mutable stack memory upon initialization."
  },
  {
    "question": "What will `sizeof(\"A\")` and `sizeof('A')` evaluate to in C?",
    "options": [
      "2 bytes and 4 bytes (sizeof int)",
      "1 byte and 1 byte",
      "2 bytes and 1 byte",
      "1 byte and 4 bytes"
    ],
    "answerIndex": 0,
    "explanation": "String literal \"A\" is char[2] ('A', '\\0'); character constant 'A' has type int (4 bytes in C)."
  },
  {
    "question": "How is an empty string represented in C memory?",
    "options": [
      "A null pointer `NULL`",
      "A character array where the very first element is `'\\0'` (1 byte)",
      "A 0-byte memory block",
      "An uninitialized buffer"
    ],
    "answerIndex": 1,
    "explanation": "An empty string `\"\"` occupies 1 byte containing only the null terminator `{'\\0'}`."
  },
  {
    "question": "What does `str1 == str2` compare when `str1` and `str2` are C strings?",
    "options": [
      "The alphabetical contents of the strings",
      "The memory pointer addresses of the strings",
      "The string lengths",
      "The ASCII hash values"
    ],
    "answerIndex": 1,
    "explanation": "Equality operator `==` compares raw pointer addresses, NOT the string text. Use `strcmp()`."
  },
  {
    "question": "What is the ASCII value of character '0' (digit zero)?",
    "options": [
      "0",
      "48",
      "32",
      "65"
    ],
    "answerIndex": 1,
    "explanation": "Digit '0' has ASCII value 48. Null character '\\0' has ASCII value 0."
  },
  {
    "question": "What is the ASCII value of uppercase letter 'A' and lowercase 'a'?",
    "options": [
      "65 and 97",
      "97 and 65",
      "48 and 65",
      "1 and 26"
    ],
    "answerIndex": 0,
    "explanation": "'A' = 65, 'a' = 97. The difference is 32."
  },
  {
    "question": "What is the mathematical relation between uppercase and lowercase ASCII characters?",
    "options": [
      "`lowercase = uppercase + 32`",
      "`lowercase = uppercase - 32`",
      "`lowercase = uppercase * 2`",
      "`lowercase = uppercase + 26`"
    ],
    "answerIndex": 0,
    "explanation": "Adding 32 (or setting the 6th bit) converts uppercase to lowercase in ASCII."
  },
  {
    "question": "What is the output of `char s[] = \"Code\\0Tax\"; printf(\"%s\", s);`?",
    "options": [
      "CodeTax",
      "Code",
      "Tax",
      "Code 0 Tax"
    ],
    "answerIndex": 1,
    "explanation": "`%s` stops reading immediately upon encountering the first `\\0` byte after \"Code\"."
  },
  {
    "question": "What is the size of the array `char s[] = \"Code\\0Tax\";`?",
    "options": [
      "4 bytes",
      "5 bytes",
      "9 bytes",
      "8 bytes"
    ],
    "answerIndex": 2,
    "explanation": "The array stores: 'C','o','d','e','\\0','T','a','x','\\0' = 9 bytes total."
  },
  {
    "question": "Can an array name be reassigned with a new string like `char s[20]; s = \"NewText\";`?",
    "options": [
      "Yes, in C99",
      "No, array names are non-modifiable lvalues; use `strcpy()`",
      "Yes, if the length is smaller",
      "Yes, using typecast"
    ],
    "answerIndex": 1,
    "explanation": "Array identifiers cannot be assigned to; their memory location is fixed."
  },
  {
    "question": "What is String Literal Pooling (Deduplication)?",
    "options": [
      "An optimization where identical string literals share the exact same memory address in .rodata",
      "A memory leak",
      "Dynamic allocation of strings",
      "Garbage collection in C"
    ],
    "answerIndex": 0,
    "explanation": "Compilers merge identical string literals into a single instance in `.rodata` to save binary space."
  },
  {
    "question": "What is the escape sequence for printing a literal percent sign `%` in `printf`?",
    "options": [
      "\\%",
      "%%",
      "/%",
      "%p"
    ],
    "answerIndex": 1,
    "explanation": "`%%` is the format specifier to output a single `%` character."
  },
  {
    "question": "What does `const char *str` declare?",
    "options": [
      "A constant pointer to mutable characters",
      "A pointer to constant (read-only) character data",
      "A constant array of strings",
      "An immutable pointer in ROM"
    ],
    "answerIndex": 1,
    "explanation": "The character data cannot be modified through this pointer."
  },
  {
    "question": "What does `char * const str` declare?",
    "options": [
      "A constant pointer whose address cannot be reassigned",
      "A pointer to read-only characters",
      "A string literal",
      "A double pointer"
    ],
    "answerIndex": 0,
    "explanation": "The pointer variable itself is constant and cannot point to another memory address."
  },
  {
    "question": "What is the format specifier for printing a pointer address in `printf`?",
    "options": [
      "%d",
      "%s",
      "%p",
      "%x"
    ],
    "answerIndex": 2,
    "explanation": "`%p` formats pointer values, conventionally cast as `(void*)ptr`."
  },
  {
    "question": "What does `sizeof(str)` return for `char *str = \"Barrackpore\";` on a 64-bit system?",
    "options": [
      "12 bytes",
      "8 bytes (pointer size)",
      "11 bytes",
      "4 bytes"
    ],
    "answerIndex": 1,
    "explanation": "`sizeof` on a pointer variable returns the pointer byte size (8 bytes on 64-bit), NOT string length."
  },
  {
    "question": "What does `sizeof(str)` return for `char str[] = \"Barrackpore\";`?",
    "options": [
      "8 bytes",
      "11 bytes",
      "12 bytes",
      "16 bytes"
    ],
    "answerIndex": 2,
    "explanation": "For an array, `sizeof` returns total allocated bytes: 11 characters + 1 null terminator = 12 bytes."
  },
  {
    "question": "How do you check if a character variable `c` is an uppercase letter without `<ctype.h>`?",
    "options": [
      "`c >= 'A' && c <= 'Z'`",
      "`c >= 65 && c <= 90`",
      "Both of the above",
      "`c.isUpper()`"
    ],
    "answerIndex": 2,
    "explanation": "Both ASCII character literals and integer bounds accurately test for uppercase letters."
  },
  {
    "question": "How do you check if a character variable `c` is a decimal digit without `<ctype.h>`?",
    "options": [
      "`c >= '0' && c <= '9'`",
      "`c >= 0 && c <= 9`",
      "`c.isDigit()`",
      "`typeof(c) == int`"
    ],
    "answerIndex": 0,
    "explanation": "Comparing with character literals `'0'` (48) and `'9'` (57) validates digit characters."
  },
  {
    "question": "Why was the standard library function `gets()` removed from the ISO C11 standard?",
    "options": [
      "It was too slow",
      "It lacks a buffer size limit parameter, creating severe buffer overflow vulnerabilities (CWE-120)",
      "It does not work on 64-bit systems",
      "It was renamed to scanf"
    ],
    "answerIndex": 1,
    "explanation": "`gets()` cannot prevent buffer overflows because it has no boundary check."
  },
  {
    "question": "What is the standard, secure C replacement for `gets()`?",
    "options": [
      "`fgets(buffer, sizeof(buffer), stdin);`",
      "`scanf(\"%s\", buffer);`",
      "`read(buffer);`",
      "`get_string(buffer);`"
    ],
    "answerIndex": 0,
    "explanation": "`fgets()` requires the buffer capacity, preventing stack buffer overflows."
  },
  {
    "question": "What character does `fgets()` retain at the end of the input string if buffer space permits?",
    "options": [
      "Space character ' '",
      "Newline character '\\n'",
      "Carriage return '\\r' only",
      "EOF"
    ],
    "answerIndex": 1,
    "explanation": "`fgets()` includes the newline (`'\\n'`) generated when the user presses Enter."
  },
  {
    "question": "How do you sanitize and remove the trailing newline character from `fgets()` output?",
    "options": [
      "`str[strcspn(str, \"\\n\")] = '\\0';`",
      "`delete '\\n';`",
      "`str.strip('\\n');`",
      "`free(str[\\n]);`"
    ],
    "answerIndex": 0,
    "explanation": "Finding the index of `'\\n'` with `strcspn()` and setting it to `'\\0'` strips the newline."
  },
  {
    "question": "What happens when using `scanf(\"%s\", buffer);` on the input \"Sukanta Hui\"?",
    "options": [
      "The entire line \"Sukanta Hui\" is stored",
      "Only \"Sukanta\" is stored; reading halts at the space character",
      "Compilation error",
      "A null character is placed at the start"
    ],
    "answerIndex": 1,
    "explanation": "`%s` stops scanning at the first whitespace character (space, tab, or newline)."
  },
  {
    "question": "How do you prevent buffer overflow when using `scanf(\"%s\")` on a 50-byte array?",
    "options": [
      "Use `scanf(\"%49s\", buffer);`",
      "Use `scanf(\"%50s\", buffer);`",
      "Use `scanf(\"%s&50\", buffer);`",
      "It is impossible"
    ],
    "answerIndex": 0,
    "explanation": "Specifying `%49s` limits input to 49 characters, reserving 1 byte for the null terminator."
  },
  {
    "question": "What is the scanset format to read a full line with spaces using `scanf`?",
    "options": [
      "`scanf(\" %49[^\n]\", buffer);`",
      "`scanf(\"%all\", buffer);`",
      "`scanf(\"%s*\", buffer);`",
      "`scanf(\"%line\", buffer);`"
    ],
    "answerIndex": 0,
    "explanation": "`%[^\n]` reads all characters until a newline is encountered."
  },
  {
    "question": "What does `puts(str)` do that `printf(\"%s\", str)` does NOT do?",
    "options": [
      "Automatically appends a newline character (`'\\n'`) to the output",
      "Flushes the GPU buffer",
      "Converts lowercase to uppercase",
      "Prints the memory address"
    ],
    "answerIndex": 0,
    "explanation": "`puts()` outputs the string and automatically writes a terminating newline to stdout."
  },
  {
    "question": "Why does `scanf(\"%d\", &num);` followed by `fgets(str, 50, stdin);` cause `fgets` to appear skipped?",
    "options": [
      "CPU timing bug",
      "The trailing newline `'\\n'` left in the stdin buffer by `scanf` is immediately consumed by `fgets` as an empty line",
      "`fgets` does not work after integer inputs",
      "`num` overwrites `str`"
    ],
    "answerIndex": 1,
    "explanation": "Pressing Enter leaves `'\\n'` in the stdin stream. Consume it first with `getchar()`."
  },
  {
    "question": "Why should `fflush(stdin)` NEVER be used in standard C?",
    "options": [
      "It is too slow",
      "The C standard specifies `fflush()` behavior strictly for output streams; calling it on `stdin` is Undefined Behavior",
      "It deletes files on disk",
      "It is deprecated in C++ only"
    ],
    "answerIndex": 1,
    "explanation": "ISO C defines `fflush` solely for output streams. Its behavior on input streams is undefined."
  },
  {
    "question": "What is the standard compliant method to clear leftover characters from the `stdin` buffer?",
    "options": [
      "`int c; while ((c = getchar()) != '\\n' && c != EOF);`",
      "`clear(stdin);`",
      "`stdin = NULL;`",
      "`reset_stream(stdin);`"
    ],
    "answerIndex": 0,
    "explanation": "A while loop reading characters with `getchar()` until `'\\n'` or `EOF` safely drains `stdin`."
  },
  {
    "question": "What does `getchar()` return when reading input?",
    "options": [
      "A `char` value",
      "An `int` value (to represent all char values plus `EOF` / -1)",
      "A pointer `char*`",
      "A string"
    ],
    "answerIndex": 1,
    "explanation": "`getchar()` returns `int` so it can return `EOF` (-1) without collision with character 255."
  },
  {
    "question": "What does `snprintf(buf, size, format, ...)` guarantee?",
    "options": [
      "It writes at most `size` bytes (including terminating `'\\0'`), preventing buffer overflow",
      "It encrypts the output",
      "It allocates heap memory dynamically",
      "It prints directly to the printer"
    ],
    "answerIndex": 0,
    "explanation": "`snprintf()` enforces an upper bound on output size, guaranteeing null termination."
  },
  {
    "question": "What does `sscanf(str, format, ...)` do?",
    "options": [
      "Reads formatted data from standard console input",
      "Reads and parses formatted data from an existing in-memory string buffer",
      "Scans strings for viruses",
      "Prints strings to a file"
    ],
    "answerIndex": 1,
    "explanation": "`sscanf()` parses variables directly from a string buffer."
  },
  {
    "question": "What is a Format String Attack?",
    "options": [
      "Passing user-controlled input directly as format string `printf(user_input)` allowing memory inspection or overwrites",
      "Typing incorrect format specifiers",
      "Running out of disk space",
      "A CSS styling issue"
    ],
    "answerIndex": 0,
    "explanation": "Attackers pass `%x` or `%n` in user input to read/write stack memory. Always use `printf(\"%s\", input)`."
  },
  {
    "question": "What does `strlen(str)` return?",
    "options": [
      "Total allocated buffer size in bytes",
      "Number of characters before the null terminator `'\\0'` (type `size_t`)",
      "Number of characters including '\\0'",
      "Memory address of the string"
    ],
    "answerIndex": 1,
    "explanation": "`strlen()` counts characters up to, but not including, the terminating `\\0`."
  },
  {
    "question": "What happens if `NULL` is passed to `strlen(NULL)`?",
    "options": [
      "Returns 0",
      "Returns -1",
      "Segmentation Fault / Undefined Behavior",
      "Returns `SIZE_MAX`"
    ],
    "answerIndex": 2,
    "explanation": "Standard `<string.h>` routines do not check for NULL pointers; dereferencing NULL causes a crash."
  },
  {
    "question": "What is the return type of `strlen()`?",
    "options": [
      "int",
      "long",
      "size_t",
      "unsigned short"
    ],
    "answerIndex": 2,
    "explanation": "`size_t` is the standard unsigned integer type defined for object byte sizes."
  },
  {
    "question": "How does `strcpy(dest, src)` work?",
    "options": [
      "Copies characters from `src` to `dest` up to and including `'\\0'`",
      "Appends `src` to the end of `dest`",
      "Compares `src` and `dest`",
      "Swaps pointer addresses"
    ],
    "answerIndex": 0,
    "explanation": "`strcpy()` copies all characters from `src` into `dest` including the terminating `\\0`."
  },
  {
    "question": "What is the critical caveat when using `strncpy(dest, src, n)`?",
    "options": [
      "It runs slower than strcpy",
      "If `strlen(src) >= n`, it does NOT append a null terminator to `dest`",
      "It only works with numbers",
      "It frees the source string"
    ],
    "answerIndex": 1,
    "explanation": "If `src` fills or exceeds `n` bytes, `strncpy` omits `\\0`. Always write `dest[n-1] = '\\0'` manually."
  },
  {
    "question": "What does `strcat(dest, src)` do?",
    "options": [
      "Finds the null terminator in `dest`, appends `src` starting there, and adds a new `'\\0'`",
      "Copies `src` over `dest`",
      "Splits `dest` into two",
      "Calculates string difference"
    ],
    "answerIndex": 0,
    "explanation": "`strcat` concatenates `src` onto the end of `dest`."
  },
  {
    "question": "What does `strncat(dest, src, n)` guarantee regarding the null terminator?",
    "options": [
      "It never appends '\\0'",
      "It appends at most `n` characters AND always appends a terminating `'\\0'`",
      "It appends '\\0' only if space permits",
      "It overwrites all memory with 0"
    ],
    "answerIndex": 1,
    "explanation": "Unlike `strncpy`, `strncat` always ensures the result is null-terminated (writing up to `n + 1` bytes)."
  },
  {
    "question": "What does `strcmp(s1, s2)` return when `s1` is identical to `s2`?",
    "options": [
      "1 (true)",
      "0",
      "-1",
      "Length of string"
    ],
    "answerIndex": 1,
    "explanation": "`strcmp` returns 0 when strings match exactly."
  },
  {
    "question": "What does `strcmp(\"Apple\", \"Banana\")` return?",
    "options": [
      "A negative integer (< 0) because 'A' (65) < 'B' (66)",
      "A positive integer (> 0)",
      "0",
      "1"
    ],
    "answerIndex": 0,
    "explanation": "'Apple' comes before 'Banana' alphabetically, so the difference is negative."
  },
  {
    "question": "What does `strncmp(s1, s2, n)` do?",
    "options": [
      "Compares at most the first `n` characters of `s1` and `s2`",
      "Compares string lengths only",
      "Compares `n` strings simultaneously",
      "Performs case-insensitive comparison"
    ],
    "answerIndex": 0,
    "explanation": "`strncmp` limits comparison to the first `n` characters."
  },
  {
    "question": "What does `strchr(str, ch)` return?",
    "options": [
      "The integer index of `ch`",
      "A pointer to the FIRST occurrence of character `ch` in `str`, or `NULL` if not found",
      "The total count of character `ch`",
      "Boolean 1 or 0"
    ],
    "answerIndex": 1,
    "explanation": "`strchr` returns a `char*` pointing to the first occurrence of `ch`, or `NULL`."
  },
  {
    "question": "What does `strrchr(str, ch)` return?",
    "options": [
      "Pointer to the LAST (rightmost) occurrence of character `ch` in `str`, or `NULL`",
      "Pointer to first character",
      "Reversed string",
      "Random character"
    ],
    "answerIndex": 0,
    "explanation": "`strrchr` (string reverse character) finds the rightmost occurrence of a character."
  },
  {
    "question": "What does `strstr(haystack, needle)` return?",
    "options": [
      "Pointer to the first occurrence of substring `needle` in `haystack`, or `NULL`",
      "Integer count of occurrences",
      "Boolean true/false",
      "Length of substring"
    ],
    "answerIndex": 0,
    "explanation": "`strstr()` locates the first appearance of substring `needle` in `haystack`."
  },
  {
    "question": "How does `strtok(str, delim)` tokenize a string?",
    "options": [
      "It creates new heap copies of each token",
      "It modifies the original string by replacing delimiter characters with `'\\0'` in-place",
      "It returns a 2D array",
      "It uses regex"
    ],
    "answerIndex": 1,
    "explanation": "`strtok()` writes `\\0` into delimiter positions and remembers state across calls."
  },
  {
    "question": "Why is `strtok()` not thread-safe?",
    "options": [
      "It uses an internal static pointer to track state across successive calls",
      "It locks CPU registers",
      "It allocates infinite memory",
      "It cannot parse commas"
    ],
    "answerIndex": 0,
    "explanation": "Internal static state makes `strtok()` vulnerable to race conditions in multi-threaded programs. Use `strtok_r()`."
  },
  {
    "question": "What does `memset(ptr, 0, n)` do?",
    "options": [
      "Fills `n` bytes of memory starting at `ptr` with byte value 0",
      "Frees `n` bytes of memory",
      "Calculates memory size",
      "Initializes pointers to NULL"
    ],
    "answerIndex": 0,
    "explanation": "`memset` sets a contiguous block of bytes to a specified value."
  },
  {
    "question": "What is the key difference between `strcpy()` and `memcpy()`?",
    "options": [
      "`strcpy` stops at `'\\0'`; `memcpy` copies exact `n` bytes regardless of null bytes",
      "`memcpy` is slower",
      "`strcpy` works on binary structs",
      "`memcpy` only works on numbers"
    ],
    "answerIndex": 0,
    "explanation": "`memcpy` is a raw binary memory copier that does not inspect bytes for `\\0`."
  },
  {
    "question": "What is the difference between `memcpy()` and `memmove()`?",
    "options": [
      "`memmove()` safely handles overlapping source and destination memory regions; `memcpy()` causes UB on overlap",
      "`memcpy` handles overlaps safely",
      "`memmove` only works on strings",
      "`memmove` moves files on disk"
    ],
    "answerIndex": 0,
    "explanation": "If `src` and `dest` overlap, `memmove()` buffers data safely to prevent overwrite corruption."
  },
  {
    "question": "What does `memcmp(p1, p2, n)` do?",
    "options": [
      "Compares the first `n` raw bytes of memory between `p1` and `p2`",
      "Compares string lengths",
      "Compares file sizes",
      "Tests if pointers point to same address"
    ],
    "answerIndex": 0,
    "explanation": "`memcmp` performs raw byte-by-byte unsigned comparison."
  },
  {
    "question": "What does `strdup(s)` do in POSIX / C23?",
    "options": [
      "Duplicates string `s` into dynamically allocated heap memory via `malloc()`",
      "Reverses string",
      "Deletes duplicate characters",
      "Copies string to stack"
    ],
    "answerIndex": 0,
    "explanation": "`strdup()` allocates heap memory and duplicates the string. The caller must `free()` the pointer."
  },
  {
    "question": "How do you calculate string length using a single pointer in a while loop?",
    "options": [
      "`int len = 0; while (*s++) len++; return len;`",
      "`return sizeof(s);`",
      "`return s.length;`",
      "`while (s != NULL) len++;`"
    ],
    "answerIndex": 0,
    "explanation": "Incrementing pointer until dereferenced value is `\\0` counts length in O(n) time."
  },
  {
    "question": "What does the concise K&R loop `while ((*dest++ = *src++));` accomplish?",
    "options": [
      "Copies all characters of `src` into `dest` including terminating `'\\0'`",
      "Compares two strings",
      "Reverses two strings",
      "Causes an infinite loop"
    ],
    "answerIndex": 0,
    "explanation": "Assigns character, evaluates truth value, and stops when `\\0` (0) is copied."
  },
  {
    "question": "How do you reverse a string in-place with O(1) auxiliary space?",
    "options": [
      "Swap characters from ends `i = 0, j = len - 1` moving inwards while `i < j`",
      "Allocate a second array and copy backwards",
      "Use recursion without base case",
      "Call `printf(\"%r\", s)`"
    ],
    "answerIndex": 0,
    "explanation": "Two-pointer in-place swapping achieves O(n) time and O(1) space."
  },
  {
    "question": "What is the time complexity of checking if a string of length N is a Palindrome?",
    "options": [
      "O(N)",
      "O(N^2)",
      "O(1)",
      "O(log N)"
    ],
    "answerIndex": 0,
    "explanation": "Comparing characters from both ends takes at most N/2 comparisons = O(N) linear time."
  },
  {
    "question": "How do you toggle the case of an alphabetic ASCII character `c` using bitwise operators?",
    "options": [
      "`c ^ 32` (or `c ^ 0x20`)",
      "`c & 32`",
      "`c | 32`",
      "`~c`"
    ],
    "answerIndex": 0,
    "explanation": "Bit 5 (value 32) differentiates uppercase and lowercase in ASCII. XOR toggles this bit."
  },
  {
    "question": "How do you convert string \"1234\" to integer 1234 without `atoi()`?",
    "options": [
      "Iterate digits: `num = num * 10 + (str[i] - '0');`",
      "`num = (int)str;`",
      "`num = str[0] + str[1];`",
      "`num = str * 10;`"
    ],
    "answerIndex": 0,
    "explanation": "Subtracting `'0'` converts ASCII digit char to numeric int; multiplying by 10 shifts decimal places."
  },
  {
    "question": "How do you verify if two strings are Anagrams?",
    "options": [
      "Check if both have matching character frequency counts across all 26 alphabet letters",
      "Check if their lengths are equal",
      "Check if their first and last characters match",
      "Compare them with `strcmp`"
    ],
    "answerIndex": 0,
    "explanation": "Anagrams contain the exact same character frequencies rearranged in different order."
  },
  {
    "question": "What is the memory difference between `char a[5][20]` and `const char *b[5]`?",
    "options": [
      "`a` allocates 100 contiguous bytes; `b` allocates 5 pointers (40 bytes on 64-bit) pointing to external strings",
      "`a` uses less memory",
      "`b` allocates 100 bytes",
      "They are completely identical in memory"
    ],
    "answerIndex": 0,
    "explanation": "`a` is a 2D matrix; `b` is an array of memory addresses."
  },
  {
    "question": "Why is sorting an array of string pointers `char *names[1000]` faster than sorting `char names[1000][50]`?",
    "options": [
      "Swapping pointers copies only 8 bytes; swapping 2D array rows copies 50 bytes using strcpy",
      "Pointer sorting uses GPU",
      "2D array cannot be sorted",
      "Pointers bypass strcmp"
    ],
    "answerIndex": 0,
    "explanation": "Swapping 8-byte addresses is O(1) instantaneous CPU work compared to bulk memory moves."
  },
  {
    "question": "What does `char *argv[]` in `main(int argc, char *argv[])` represent?",
    "options": [
      "An array of string pointers containing command line arguments",
      "A 2D array of 50x50 chars",
      "The return code of the program",
      "A function pointer"
    ],
    "answerIndex": 0,
    "explanation": "`argv` is an array of pointers to argument strings passed from the shell."
  },
  {
    "question": "What is guaranteed about `argv[argc]` in the C standard?",
    "options": [
      "It is always a `NULL` pointer sentinel",
      "It contains the program name",
      "It is undefined",
      "It contains \"END\""
    ],
    "answerIndex": 0,
    "explanation": "The ISO C standard guarantees that `argv[argc]` is `NULL`."
  },
  {
    "question": "What is the correct comparator signature to sort `char *arr[]` using `qsort()`?",
    "options": [
      "`int cmp(const void *a, const void *b) { return strcmp(*(const char**)a, *(const char**)b); }`",
      "`int cmp(char *a, char *b) { return strcmp(a, b); }`",
      "`int cmp(void *a, void *b) { return *a - *b; }`",
      "`int cmp(const char *a, const char *b)`"
    ],
    "answerIndex": 0,
    "explanation": "`qsort` passes pointers to elements; since elements are `char*`, the comparator receives `char**`."
  },
  {
    "question": "What is a string in C language?",
    "options": [
      "A built-in primitive data type keyword",
      "A contiguous array of characters terminated by a null byte ('\\0')",
      "An object with a length property and dynamic methods",
      "A dynamic vector allocated on the heap by default"
    ],
    "answerIndex": 1,
    "explanation": "In C, strings are not a primitive type; they are contiguous single-byte character sequences terminated by a null byte '\\0' (ASCII 0)."
  },
  {
    "question": "What is the ASCII value and byte representation of the null character '\\0'?",
    "options": [
      "ASCII 32 (space)",
      "ASCII 48 ('0')",
      "ASCII 0 (all 8 bits zero: 0x00)",
      "ASCII -1"
    ],
    "answerIndex": 2,
    "explanation": "The null character '\\0' has an integer ASCII value of 0, represented as byte `0x00` in memory."
  },
  {
    "question": "What is the difference between `'A'` and `\"A\"` in C?",
    "options": [
      "They are completely identical in memory",
      "`'A'` is a character constant (represented as an int), whereas `\"A\"` is a string literal containing 2 bytes (`'A'` and `'\\0'`)",
      "`'A'` is 2 bytes; `\"A\"` is 1 byte",
      "`\"A\"` is a macro constant"
    ],
    "answerIndex": 1,
    "explanation": "`'A'` is a character constant (4 bytes `int` in C), while `\"A\"` is an array of 2 `char` elements: `'A'` and `'\\0'`."
  },
  {
    "question": "Where are string literals like `\"Barrackpore\"` stored in the process memory space?",
    "options": [
      "Stack memory frame",
      "Read-Only Data Segment (.rodata / text section)",
      "BSS uninitialized segment",
      "Heap dynamic memory"
    ],
    "answerIndex": 1,
    "explanation": "String literals are stored in the read-only data (.rodata) section of the program binary."
  },
  {
    "question": "What happens if you attempt to modify a string literal via a pointer (e.g., `char *s = \"Hello\"; s[0] = 'h';`)?",
    "options": [
      "The string is safely modified in place",
      "Segmentation Fault / Bus Error (Undefined Behavior due to writing to read-only memory)",
      "The compiler creates a dynamic copy automatically",
      "A warning is logged and execution continues"
    ],
    "answerIndex": 1,
    "explanation": "Modifying string literals writes into protected read-only memory pages, triggering a hardware MMU fault / Segmentation Fault."
  },
  {
    "question": "What is the difference between `char s[] = \"Hello\";` and `char *s = \"Hello\";`?",
    "options": [
      "`char s[]` allocates a mutable character array on the stack initialized with a copy of \"Hello\", while `char *s` points directly to immutable .rodata memory",
      "They have the exact same memory mutability",
      "`char s[]` is slower to access than `char *s`",
      "`char *s` can only hold 5 characters"
    ],
    "answerIndex": 0,
    "explanation": "`char s[]` creates a modifiable local array on the stack, whereas `char *s` points to read-only string literal storage."
  },
  {
    "question": "What does `strlen(s)` return for a string `\"Coder\"`?",
    "options": [
      "6 (including null terminator)",
      "5 (the number of characters before the terminating null byte)",
      "sizeof(char*) (8 bytes)",
      "4 bytes"
    ],
    "answerIndex": 1,
    "explanation": "`strlen()` counts characters up to, but NOT including, the terminating `'\\0'`."
  },
  {
    "question": "What is the time complexity of `strlen(s)`?",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n^2)"
    ],
    "answerIndex": 2,
    "explanation": "`strlen()` performs a linear scan through memory until it encounters `0x00`, taking O(n) time."
  },
  {
    "question": "Why should `strlen(s)` NEVER be placed in the loop condition `for (int i = 0; i < strlen(s); i++)`?",
    "options": [
      "It causes a compiler warning",
      "It makes the loop run in O(n^2) quadratic time instead of O(n) linear time",
      "It modifies the string `s` on each iteration",
      "It resets index `i` to 0"
    ],
    "answerIndex": 1,
    "explanation": "If not optimized by the compiler, `strlen()` runs on every single iteration, transforming an O(n) loop into an O(n^2) performance bottleneck."
  },
  {
    "question": "What is the security hazard of `strcpy(dest, src)`?",
    "options": [
      "It leaks memory on the heap",
      "It does not verify destination buffer size, causing Buffer Overflow if `src` is larger than `dest`",
      "It leaves `dest` unterminated",
      "It is slower than a while loop"
    ],
    "answerIndex": 1,
    "explanation": "`strcpy()` blindly copies bytes until `'\\0'`, easily causing stack buffer overflows if destination buffer is insufficient."
  },
  {
    "question": "What is the safer bounded alternative to `strcpy()` in standard C?",
    "options": [
      "`strncpy()`",
      "`snprintf()`",
      "`memcpy_str()`",
      "`strsafe()`"
    ],
    "answerIndex": 1,
    "explanation": "`snprintf(dest, sizeof(dest), \"%s\", src)` guarantees bounded copy and always null-terminates the destination buffer."
  },
  {
    "question": "What is a major gotcha of `strncpy(dest, src, n)`?",
    "options": [
      "It crashes on empty strings",
      "If `src` length is >= `n`, `dest` is NOT null-terminated",
      "It always copies 0 bytes",
      "It only works on ASCII characters"
    ],
    "answerIndex": 1,
    "explanation": "If `src` has `n` or more characters, `strncpy()` fills all `n` bytes without writing a terminating `'\\0'`, leaving an invalid string."
  },
  {
    "question": "What does `strcmp(str1, str2)` return when `str1` is lexicographically less than `str2`?",
    "options": [
      "0",
      "A negative integer (`< 0`)",
      "A positive integer (`> 0`)",
      "NULL"
    ],
    "answerIndex": 1,
    "explanation": "`strcmp` returns `< 0` if `str1 < str2`, `0` if `str1 == str2`, and `> 0` if `str1 > str2` based on unsigned ASCII byte comparisons."
  },
  {
    "question": "What does `strcat(dest, src)` do?",
    "options": [
      "Splits `dest` at the first space",
      "Appends the string `src` to the end of `dest`, overwriting `dest`'s null terminator and adding a new null terminator",
      "Reverses both strings and merges them",
      "Allocates a new string containing both"
    ],
    "answerIndex": 1,
    "explanation": "`strcat()` finds the end of `dest` and copies `src` from that point, including terminating `'\\0'`."
  },
  {
    "question": "What does `strchr(s, c)` return?",
    "options": [
      "The integer index of character `c` in string `s`",
      "A pointer to the first occurrence of character `c` in string `s`, or `NULL` if not found",
      "True or False boolean",
      "The count of character `c` in `s`"
    ],
    "answerIndex": 1,
    "explanation": "`strchr()` searches for character `c` (converted to char) and returns a pointer to its first occurrence in `s`."
  },
  {
    "question": "What does `strrchr(s, c)` return?",
    "options": [
      "A pointer to the LAST (rightmost) occurrence of character `c` in string `s`, or `NULL`",
      "The reverse of string `s`",
      "A pointer to the first occurrence in reverse",
      "The count of occurrences from right"
    ],
    "answerIndex": 0,
    "explanation": "`strrchr()` locates the last (rightmost) occurrence of character `c` in `s`."
  },
  {
    "question": "What does `strstr(haystack, needle)` return?",
    "options": [
      "The integer count of substrings found",
      "A pointer to the first occurrence of substring `needle` in string `haystack`, or `NULL` if not found",
      "The index difference between both strings",
      "A boolean true/false"
    ],
    "answerIndex": 1,
    "explanation": "`strstr()` locates the first occurrence of the substring `needle` in `haystack`."
  },
  {
    "question": "How does `strtok(str, delim)` tokenize a string on subsequent calls?",
    "options": [
      "By passing the original string pointer every time",
      "By passing `NULL` as the first argument to resume tokenizing the previous string from its internal static state pointer",
      "By passing an index counter",
      "By reallocating the delimiter array"
    ],
    "answerIndex": 1,
    "explanation": "`strtok()` uses internal static storage to remember its position; subsequent calls must pass `NULL` as the first argument."
  },
  {
    "question": "Why is `strtok()` NOT thread-safe?",
    "options": [
      "It uses CPU mutexes",
      "It maintains internal static state across calls, causing race conditions in multi-threaded programs (use `strtok_r` instead)",
      "It writes to read-only memory",
      "It allocates memory without free"
    ],
    "answerIndex": 1,
    "explanation": "Because `strtok()` stores the parsing state in a global static variable, concurrent calls from multiple threads corrupt each other. `strtok_r` (or `strtok_s`) is thread-safe."
  },
  {
    "question": "Does `strtok()` modify the original string being tokenized?",
    "options": [
      "No, it creates copies of tokens",
      "Yes, it writes null characters ('\\0') over each matching delimiter in the source string",
      "Only if the string is in dynamic memory",
      "No, it works in read-only mode"
    ],
    "answerIndex": 1,
    "explanation": "`strtok()` in-place modifies the original string by replacing delimiter characters with `'\\0'`."
  },
  {
    "question": "What function from `<stdlib.h>` converts a numeric string to an integer (`int`)?",
    "options": [
      "`itoa()`",
      "`atoi()`",
      "`strtoint()`",
      "`val()`"
    ],
    "answerIndex": 1,
    "explanation": "`atoi()` converts an ASCII string to an integer, though `strtol()` is preferred for robust error handling."
  },
  {
    "question": "Why is `strtol(str, &endptr, base)` superior to `atoi(str)`?",
    "options": [
      "It is faster",
      "It detects overflow/underflow via `errno`, supports arbitrary bases (2..36), and reports unparsed trailing characters via `endptr`",
      "It works without including headers",
      "It allocates memory automatically"
    ],
    "answerIndex": 1,
    "explanation": "`strtol()` provides full error detection, sets `errno` to `ERANGE` on overflow, and returns a pointer to the first invalid character."
  },
  {
    "question": "What does `sprintf(buffer, format, ...)` do?",
    "options": [
      "Prints formatted text directly to stdout",
      "Writes formatted output into a character array `buffer` in memory",
      "Reads formatted data from a string",
      "Prints text to a file stream"
    ],
    "answerIndex": 1,
    "explanation": "`sprintf()` formats and stores a series of characters and values in the memory pointed to by `buffer`."
  },
  {
    "question": "What is the difference between `sprintf()` and `snprintf()`?",
    "options": [
      "`snprintf()` accepts a buffer size parameter `n` and guarantees not to write more than `n` bytes, preventing buffer overflows",
      "`sprintf()` is faster on 64-bit systems",
      "`snprintf()` only accepts numbers",
      "`sprintf()` adds two null terminators"
    ],
    "answerIndex": 0,
    "explanation": "`snprintf(buf, size, ...)` takes the destination buffer size, truncating safely if necessary, and always null-terminates."
  },
  {
    "question": "What does `sscanf(str, format, ...)` do?",
    "options": [
      "Reads formatted input from stdin",
      "Parses formatted data from the null-terminated string `str` into specified variable addresses",
      "Scans the hard drive for string files",
      "Counts characters in `str`"
    ],
    "answerIndex": 1,
    "explanation": "`sscanf()` reads formatted data from a string buffer instead of standard input."
  },
  {
    "question": "What function from `<ctype.h>` checks if a character is an alphanumeric letter or digit?",
    "options": [
      "`isalpha()`",
      "`isalnum()`",
      "`isdigit()`",
      "`isgraph()`"
    ],
    "answerIndex": 1,
    "explanation": "`isalnum(c)` returns non-zero if character `c` is an alphabetic letter (A-Z, a-z) or digit (0-9)."
  },
  {
    "question": "What function from `<ctype.h>` converts an uppercase character to lowercase?",
    "options": [
      "`lower()`",
      "`tolower()`",
      "`to_lower_case()`",
      "`strlower()`"
    ],
    "answerIndex": 1,
    "explanation": "`tolower(c)` returns the lowercase equivalent of character `c` if `c` is uppercase; otherwise returns `c` unchanged."
  },
  {
    "question": "How do you declare an array of 5 strings, each with maximum length 20 (including null terminator)?",
    "options": [
      "`char str[5][20];`",
      "`char str[20][5];`",
      "`string str[5];`",
      "`char *str[5][20];`"
    ],
    "answerIndex": 0,
    "explanation": "`char str[5][20];` declares a 2D array of 5 rows, each holding up to 20 contiguous character bytes."
  },
  {
    "question": "How do you declare an array of pointers to string literals (ragged string array)?",
    "options": [
      "`char *names[] = {\"Swadeep\", \"Tuhina\", \"Abhronila\", \"Debangshu\"};`",
      "`char names[4] = {\"Swadeep\", \"Tuhina\", \"Abhronila\", \"Debangshu\"};`",
      "`string names[] = {\"Swadeep\"};`",
      "`char **names = \"Swadeep\";`"
    ],
    "answerIndex": 0,
    "explanation": "`char *names[]` creates an array of character pointers, each pointing to a string literal in `.rodata`."
  },
  {
    "question": "What is the memory advantage of `char *names[]` over a 2D array `char names[100][50]` when string lengths vary significantly?",
    "options": [
      "`char *names[]` eliminates wasted padding bytes for shorter strings by storing only exact string lengths in `.rodata` plus pointer addresses",
      "`char *names[]` uses zero RAM",
      "`char names[100][50]` cannot be modified",
      "`char *names[]` is automatically sorted"
    ],
    "answerIndex": 0,
    "explanation": "An array of pointers allocates only the required bytes for each string, avoiding the fixed-size row padding of 2D arrays."
  },
  {
    "question": "String Processing Assessment Item #103: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #104: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #105: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #106: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #107: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #108: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #109: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #110: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #111: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #112: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #113: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #114: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #115: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #116: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #117: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #118: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #119: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #120: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #121: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #122: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #123: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #124: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #125: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #126: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #127: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #128: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #129: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #130: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #131: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #132: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #133: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #134: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #135: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #136: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #137: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #138: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #139: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #140: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #141: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #142: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #143: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #144: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #145: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #146: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #147: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #148: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #149: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #150: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #151: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #152: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #153: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #154: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #155: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #156: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #157: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #158: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #159: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #160: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #161: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #162: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #163: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #164: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #165: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #166: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #167: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #168: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #169: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #170: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #171: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #172: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #173: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #174: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #175: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #176: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #177: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #178: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #179: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #180: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #181: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #182: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #183: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #184: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #185: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #186: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #187: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #188: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #189: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #190: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #191: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #192: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #193: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #194: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #195: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #196: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #197: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #198: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #199: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  },
  {
    "question": "String Processing Assessment Item #200: In high-performance C string tokenization, why is pointer-based in-place scanning superior to allocating new token buffers?",
    "options": [
      "It operates in O(1) auxiliary space, prevents heap fragmentation, and maximizes CPU L1 cache throughput",
      "It bypasses operating system user-mode privileges",
      "It automatically converts ASCII strings to UTF-32",
      "It compresses the strings in hardware registers"
    ],
    "answerIndex": 0,
    "explanation": "In-place string parsing avoids heap allocator locks, prevents memory leaks, and delivers peak memory throughput."
  }
];

export default questions;
export { questions };
