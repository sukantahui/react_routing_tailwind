const questions = [
  {
    question: "Why was the standard library function `gets()` deprecated in C99 and permanently removed in C11?",
    shortAnswer: "Because `gets()` has no buffer length limit parameter, causing critical buffer overflow vulnerabilities (CWE-120).",
    explanation: "If a user inputs 100 characters into a 10-byte buffer, `gets()` blindly overwrites the function return address on the stack, enabling remote code execution exploits.",
    hint: "No bounds checking causes stack overflow exploits.",
    level: "basic"
  },
  {
    question: "What is the recommended modern standard C replacement for `gets()`?",
    shortAnswer: "`fgets(buffer, sizeof(buffer), stdin);`",
    explanation: "`fgets()` takes the maximum buffer capacity as its second argument, ensuring input never exceeds the allocated memory boundary.",
    hint: "fgets with buffer size parameter.",
    level: "basic",
    codeExample: "char name[50];\nfgets(name, sizeof(name), stdin);"
  },
  {
    question: "What is a major quirk of `fgets()` when reading user input from the console?",
    shortAnswer: "`fgets()` includes the newline character (`'\\n'`) entered by the user in the buffer if space allows.",
    explanation: "If a user enters 'John' followed by Enter, `fgets()` stores 'J','o','h','n','\\n','\\0'.",
    hint: "Stores the trailing '\\n'.",
    level: "basic"
  },
  {
    question: "How do you strip or sanitize the trailing newline `\\n` added by `fgets()` in C?",
    shortAnswer: "str[strcspn(str, \"\\n\")] = '\\0'; or check if str[len - 1] == '\\n' and set to '\\0'.",
    explanation: "Finding the newline character and replacing it with the null terminator cleanses the string.",
    hint: "Replace '\\n' with '\\0'.",
    level: "basic",
    codeExample: "str[strcspn(str, \"\\n\")] = '\\0';"
  },
  {
    question: "What is the limitation of `scanf(\"%s\", buffer);` when reading text?",
    shortAnswer: "`scanf(\"%s\")` stops reading at the first whitespace character (space, tab, or newline).",
    explanation: "If the user inputs 'Sukanta Hui', `scanf(\"%s\")` only reads 'Sukanta' and leaves ' Hui' in the input stream buffer.",
    hint: "Stops reading at whitespace.",
    level: "basic"
  },
  {
    question: "How can you prevent buffer overflows when using `scanf(\"%s\")` for single words?",
    shortAnswer: "By specifying a field width limit in the format specifier, e.g. `scanf(\"%49s\", buffer);` for a 50-byte buffer.",
    explanation: "%49s guarantees that at most 49 characters are read, leaving 1 byte for the null terminator.",
    hint: "Use %49s for 50-byte array.",
    level: "intermediate",
    codeExample: "char word[30];\nscanf(\"%29s\", word);"
  },
  {
    question: "What is the scanset format in `scanf` for reading multi-word lines until newline?",
    shortAnswer: "`scanf(\"%[^\n]%*c\", buffer);`",
    explanation: "`%[^\n]` reads all characters except newline; `%*c` reads and discards the trailing newline character from stdin.",
    hint: "Negated scanset %[^\n].",
    level: "intermediate",
    codeExample: "char line[100];\nscanf(\" %99[^\n]\", line);"
  },
  {
    question: "What is the difference between `printf(\"%s\\n\", str)` and `puts(str)`?",
    shortAnswer: "`puts()` automatically appends a newline character (`'\\n'`) to the output and is slightly faster.",
    explanation: "`puts(str)` outputs characters until `\\0` and automatically writes a newline to stdout.",
    hint: "puts() appends '\\n' automatically.",
    level: "basic"
  },
  {
    question: "Why does `scanf(\"%d\", &age);` followed immediately by `fgets(name, 50, stdin);` seem to skip string input?",
    shortAnswer: "Because `scanf` leaves the trailing newline (`'\\n'`) from pressing Enter in the stdin buffer, which `fgets` reads immediately as an empty line.",
    explanation: "To fix this, consume the leftover newline using `getchar()` or `scanf(\"%d \", &age);` before calling `fgets`.",
    hint: "Newline leftover in stdin buffer.",
    level: "intermediate",
    codeExample: "scanf(\"%d\", &age);\ngetchar(); // Clear trailing newline\nfgets(name, sizeof(name), stdin);"
  },
  {
    question: "Why should `fflush(stdin)` NEVER be used to clear the input stream in standard C?",
    shortAnswer: "Because `fflush()` is only defined for output streams in ISO C; calling it on `stdin` is Undefined Behavior.",
    explanation: "While some old MS-DOS / Turbo C compilers allowed it, GCC and POSIX standards consider `fflush(stdin)` undefined behavior.",
    hint: "fflush() is strictly for output streams.",
    level: "intermediate"
  },
  {
    question: "What is the standard idiomatic way to flush/clear the `stdin` stream in C?",
    shortAnswer: "`int c; while ((c = getchar()) != '\\n' && c != EOF);`",
    explanation: "Reads and discards characters one-by-one from the input buffer until newline or end-of-file.",
    hint: "Loop with getchar() until '\\n' or EOF.",
    level: "intermediate",
    codeExample: "int c;\nwhile ((c = getchar()) != '\\n' && c != EOF);"
  },
  {
    question: "What is a Buffer Overflow attack (Stack Smashing)?",
    shortAnswer: "Writing more data to a buffer than it can hold, overwriting adjacent stack memory and the function return address.",
    explanation: "Attackers supply payload bytes that overwrite the Instruction Pointer (EIP/RIP) to execute arbitrary malicious code.",
    hint: "Overwriting function return pointer on stack.",
    level: "advanced"
  },
  {
    question: "What is the C11 Annex K bounds-checking replacement for `gets`?",
    shortAnswer: "`gets_s(buffer, size);`",
    explanation: "Included in optional C11 Annex K safe library, terminating the program safely if input exceeds size.",
    hint: "gets_s in C11 Annex K.",
    level: "intermediate"
  },
  {
    question: "What does `putchar(c)` do in C?",
    shortAnswer: "Writes a single character `c` to standard output (stdout).",
    explanation: "Equivalent to `fputc(c, stdout)`.",
    hint: "Writes 1 character to stdout.",
    level: "basic"
  },
  {
    question: "What does `getchar()` return on reaching End-of-File or an input error?",
    shortAnswer: "`EOF` (a negative integer, typically -1).",
    explanation: "Hence, the return value of `getchar()` must always be stored in an `int` variable, not `char`.",
    hint: "Returns EOF (int).",
    level: "intermediate",
    codeExample: "int ch = getchar();\nif (ch == EOF) { /* Handle EOF */ }"
  },
  {
    question: "What happens if you pass an uninitialized pointer to `fgets(ptr, 100, stdin)`?",
    shortAnswer: "Segmentation fault / memory corruption crash.",
    explanation: "The pointer contains garbage and does not point to valid allocated memory.",
    hint: "Must point to allocated memory buffer.",
    level: "basic"
  },
  {
    question: "What does `sprintf()` do in C?",
    shortAnswer: "Formats and writes data into a character array buffer instead of console output.",
    explanation: "Like `printf`, but writes to a string buffer: `sprintf(buf, \"Score: %d\", score);`.",
    hint: "String print to buffer.",
    level: "intermediate"
  },
  {
    question: "Why is `snprintf()` preferred over `sprintf()`?",
    shortAnswer: "`snprintf()` takes the maximum buffer size as a parameter, preventing buffer overflows.",
    explanation: "`snprintf(buf, sizeof(buf), \"...\")` guarantees output will not exceed buffer capacity.",
    hint: "Bounded safe string formatting.",
    level: "intermediate",
    codeExample: "snprintf(buffer, sizeof(buffer), \"User: %s, ID: %d\", user, id);"
  },
  {
    question: "What does `sscanf()` do in C?",
    shortAnswer: "Reads and parses formatted data from a string buffer instead of standard input.",
    explanation: "Allows parsing numbers, words, and dates from existing in-memory text strings.",
    hint: "String scan from buffer.",
    level: "intermediate",
    codeExample: "int day, month, year;\nsscanf(\"2026-09-02\", \"%d-%d-%d\", &year, &month, &day);"
  },
  {
    question: "What is the return value of `fgets()` upon success and failure?",
    shortAnswer: "Returns the buffer pointer upon success, or `NULL` on EOF / read error.",
    explanation: "Allows writing loops like `while (fgets(line, sizeof(line), stdin) != NULL)`.",
    hint: "Returns buffer pointer or NULL.",
    level: "intermediate"
  },
  {
    question: "What happens if the input line is longer than the buffer provided to `fgets()`?",
    shortAnswer: "`fgets()` reads `size - 1` characters, appends `\\0`, and leaves remaining characters in the input stream.",
    explanation: "Subsequent read calls will fetch the leftover characters from the same line.",
    hint: "Reads size - 1 and leaves rest in stream.",
    level: "intermediate"
  },
  {
    question: "How do you detect if `fgets()` read a complete line or a partial line?",
    shortAnswer: "Check if the buffer contains a newline character (`'\\n'`) before the `\\0`.",
    explanation: "If no `'\\n'` is present and EOF is not reached, the input exceeded the buffer capacity.",
    hint: "Presence of '\\n' confirms complete line.",
    level: "advanced"
  },
  {
    question: "What compiler flag in GCC enables stack overflow / stack smashing protection?",
    shortAnswer: "`-fstack-protector` or `-fstack-protector-all`.",
    explanation: "Places a canary value on the stack before the return address and verifies it upon function exit.",
    hint: "Stack canary protector flag.",
    level: "advanced"
  },
  {
    question: "What is the effect of leading whitespace in `scanf(\" %c\", &ch);`?",
    shortAnswer: "The leading space skips all preceding whitespace characters (spaces, tabs, newlines) before reading the character.",
    explanation: "Without the space, `scanf(\"%c\")` reads the leftover newline from previous inputs.",
    hint: "Space skips leading whitespace.",
    level: "intermediate"
  },
  {
    question: "Why should you never write `printf(user_input);` without a format string?",
    shortAnswer: "Format String Vulnerability: If the user inputs `%x` or `%n`, it exposes or overwrites memory.",
    explanation: "Always write `printf(\"%s\", user_input);` or `fputs(user_input, stdout);`.",
    hint: "Format string exploit vulnerability.",
    level: "advanced"
  }
];

export default questions;
