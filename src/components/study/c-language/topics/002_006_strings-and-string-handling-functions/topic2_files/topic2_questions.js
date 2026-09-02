const questions = [
  {
    question: "What does `strlen(str)` return and does it count the null terminator `'\\0'`?",
    shortAnswer: "`strlen()` returns the number of visible characters (type `size_t`) excluding the null terminator.",
    explanation: "For example, `strlen(\"Hello\")` returns 5, even though the string occupies 6 bytes in memory.",
    hint: "Counts up to, but not including, '\\0'.",
    level: "basic"
  },
  {
    question: "What is the key danger of `strcpy(dest, src)`?",
    shortAnswer: "If `src` is longer than the allocated capacity of `dest`, it causes a buffer overflow.",
    explanation: "`strcpy()` does not check the destination buffer size and blindly copies characters until it finds `\\0`.",
    hint: "No bounds checking on destination buffer.",
    level: "basic"
  },
  {
    question: "How does `strncpy(dest, src, n)` behave if `src` is longer than or equal to `n`?",
    shortAnswer: "`strncpy()` does NOT append a null terminator `'\\0'` to `dest`!",
    explanation: "The programmer must explicitly ensure null-termination: `dest[n - 1] = '\\0';`.",
    hint: "Must manually set dest[n - 1] = '\\0'.",
    level: "intermediate",
    codeExample: "strncpy(dest, src, sizeof(dest) - 1);\ndest[sizeof(dest) - 1] = '\\0';"
  },
  {
    question: "What does `strcat(dest, src)` do and what must be guaranteed about `dest`?",
    shortAnswer: "Appends `src` to the end of `dest`. `dest` must have enough extra allocated memory to hold both strings.",
    explanation: "`strcat` overwrites the original null terminator of `dest` and appends `src` followed by a new `\\0`.",
    hint: "Concatenates src onto dest.",
    level: "basic"
  },
  {
    question: "What do the return values of `strcmp(s1, s2)` mean?",
    shortAnswer: "< 0 if s1 is lexicographically less; 0 if equal; > 0 if s1 is greater.",
    explanation: "Compares ASCII codes character-by-character: `strcmp(\"Apple\", \"Banana\")` returns negative (< 0).",
    hint: "0 means exact match.",
    level: "basic"
  },
  {
    question: "What is the difference between `strcmp()` and `strncmp()`?",
    shortAnswer: "`strncmp(s1, s2, n)` compares at most the first `n` characters.",
    explanation: "Useful for checking prefix matching, such as verifying if a command starts with \"QUIT\".",
    hint: "Bounded comparison up to n characters.",
    level: "basic"
  },
  {
    question: "What does `strchr(str, ch)` return if character `ch` is found vs not found?",
    shortAnswer: "Returns a pointer to the first occurrence of `ch` in `str`, or `NULL` if not found.",
    explanation: "Allows pointer arithmetic offset calculation: `index = strchr(str, ch) - str;`.",
    hint: "Pointer to first character occurrence or NULL.",
    level: "intermediate"
  },
  {
    question: "What does `strrchr(str, ch)` do differently from `strchr()`?",
    shortAnswer: "Locates the LAST (rightmost) occurrence of character `ch` in `str`.",
    explanation: "Useful for extracting file extensions by searching for the last '.' character.",
    hint: "Reverse/Rightmost character search.",
    level: "intermediate",
    codeExample: "char *ext = strrchr(filename, '.');"
  },
  {
    question: "What does `strstr(haystack, needle)` return?",
    shortAnswer: "Returns a pointer to the first occurrence of substring `needle` within `haystack`, or `NULL`.",
    explanation: "If `needle` is found, returns a pointer to the beginning of the substring within `haystack`.",
    hint: "Substring search pointer or NULL.",
    level: "intermediate"
  },
  {
    question: "What does `strtok(str, delim)` do and why is it not thread-safe?",
    shortAnswer: "Splits a string into tokens using delimiters; unsafe because it maintains internal static state across calls.",
    explanation: "Subsequent calls pass `NULL` as the first parameter: `strtok(NULL, \",\")`. It modifies the source string in-place by writing `\\0`.",
    hint: "String tokenizer using internal static pointer.",
    level: "advanced",
    codeExample: "char *token = strtok(str, \", \");\nwhile (token != NULL) {\n    printf(\"%s\\n\", token);\n    token = strtok(NULL, \", \");\n}"
  },
  {
    question: "What is the thread-safe POSIX replacement for `strtok()`?",
    shortAnswer: "`strtok_r()` (which uses a user-supplied context pointer `char **saveptr`).",
    explanation: "Avoids global static state, making it reentrant and safe for multi-threaded applications.",
    hint: "strtok_r with saveptr.",
    level: "advanced"
  },
  {
    question: "What is the difference between `memcpy()` and `strcpy()`?",
    shortAnswer: "`strcpy` stops at `\\0`; `memcpy` copies exact `n` bytes regardless of null characters.",
    explanation: "`memcpy(dest, src, n)` works on raw binary memory buffers, structs, and arrays of any type.",
    hint: "String-aware vs raw byte block copy.",
    level: "intermediate"
  },
  {
    question: "What is the difference between `memcpy()` and `memmove()`?",
    shortAnswer: "`memmove()` safely handles overlapping source and destination memory regions; `memcpy()` does not.",
    explanation: "If `src` and `dest` overlap, `memcpy` causes undefined behavior, whereas `memmove` copies via a temporary buffer.",
    hint: "memmove handles overlapping memory.",
    level: "advanced"
  },
  {
    question: "What does `memset(ptr, value, num)` do in C?",
    shortAnswer: "Fills the first `num` bytes of memory pointed by `ptr` with the specified byte `value`.",
    explanation: "Commonly used to zero-out buffers: `memset(buffer, 0, sizeof(buffer));`.",
    hint: "Fills memory with constant byte.",
    level: "basic",
    codeExample: "memset(buffer, 0, sizeof(buffer));"
  },
  {
    question: "What does `memcmp(p1, p2, n)` do?",
    shortAnswer: "Compares the first `n` raw bytes of two memory blocks.",
    explanation: "Returns 0 if all `n` bytes match, negative if p1 < p2, positive if p1 > p2.",
    hint: "Binary byte-by-byte comparison.",
    level: "intermediate"
  },
  {
    question: "What does `strspn(s1, s2)` return?",
    shortAnswer: "The length of the initial segment of `s1` consisting entirely of characters in `s2`.",
    explanation: "Used to count leading valid characters or skip whitespace.",
    hint: "Span of characters in accept set.",
    level: "advanced"
  },
  {
    question: "What does `strcspn(s1, s2)` return?",
    shortAnswer: "The length of the initial segment of `s1` consisting entirely of characters NOT in `s2`.",
    explanation: "Frequently used to find the index of the first delimiter: `idx = strcspn(str, \"\\n\\r\");`.",
    hint: "Complement span: index of first matching character.",
    level: "advanced"
  },
  {
    question: "What does `strdup(str)` do in POSIX / C23?",
    shortAnswer: "Allocates heap memory via `malloc()` and duplicates the string `str` into it.",
    explanation: "The returned pointer must eventually be deallocated by calling `free()`.",
    hint: "Heap string duplicate.",
    level: "intermediate",
    codeExample: "char *copy = strdup(original);\n// ...\nfree(copy);"
  },
  {
    question: "Why should `strcat()` in a loop to build a string be avoided for large texts?",
    shortAnswer: "Schlemiel the Painter's Algorithm: `strcat` scans the destination from start to find `\\0` on every call, leading to O(N^2) quadratic time.",
    explanation: "Keep a tail pointer to append in O(1) time instead.",
    hint: "Repeated scanning of destination causes O(N^2) slowdown.",
    level: "advanced"
  },
  {
    question: "What is the return type of `strlen()`?",
    shortAnswer: "`size_t` (an unsigned integer type capable of representing any object size).",
    explanation: "Defined in `<stddef.h>` and `<string.h>`.",
    hint: "size_t unsigned integer.",
    level: "basic"
  },
  {
    question: "What happens if you pass `NULL` as an argument to `strlen(NULL)`?",
    shortAnswer: "Segmentation Fault / Undefined Behavior.",
    explanation: "Standard library string functions do not check for NULL pointers.",
    hint: "Passing NULL to strlen crashes immediately.",
    level: "basic"
  },
  {
    question: "What does `strncat(dest, src, n)` do regarding the null terminator?",
    shortAnswer: "It appends at most `n` characters from `src` AND always appends a terminating `\\0`.",
    explanation: "Unlike `strncpy`, `strncat` guarantees null-termination, writing up to `n + 1` bytes into `dest`.",
    hint: "Always appends null terminator.",
    level: "intermediate"
  },
  {
    question: "What is the case-insensitive version of `strcmp()` in POSIX systems?",
    shortAnswer: "`strcasecmp(s1, s2)` or `_stricmp(s1, s2)` on Windows MSVC.",
    explanation: "Compares strings ignoring uppercase/lowercase differences.",
    hint: "strcasecmp / _stricmp.",
    level: "intermediate"
  },
  {
    question: "What does `strpbrk(s1, s2)` do?",
    shortAnswer: "Locates the first occurrence in `s1` of ANY character from string `s2`.",
    explanation: "Returns a pointer to that character in `s1`, or `NULL`.",
    hint: "Pointer to first matching character from set.",
    level: "advanced"
  },
  {
    question: "Why is `snprintf()` safer than `strcpy()` and `strcat()`?",
    shortAnswer: "It enforces explicit buffer size limits and handles multi-type formatting atomically with guaranteed null termination.",
    explanation: "`snprintf(buf, sizeof(buf), \"%s%s\", s1, s2)` prevents all buffer overflow vulnerabilities.",
    hint: "Bounded formatting engine.",
    level: "basic"
  }
];

export default questions;
