// topic2_questions.js - 25 FAQs for Text File Operations

const questions = [
  {
    question: "What is the function prototype of fgetc() in <stdio.h>?",
    answer: "The prototype is: 'int fgetc(FILE *stream);'. It reads the next single unsigned character from the stream, advances the file position indicator, and returns it cast to an 'int', or returns EOF on end-of-file or error."
  },
  {
    question: "Why does fgetc() return an 'int' instead of a 'char'?",
    answer: "Because 'fgetc()' must be able to return all possible 256 valid byte values (0 to 255) plus the distinct special sentinel value 'EOF' (which is typically -1). A standard char cannot distinguish between EOF and byte value 0xFF (255)."
  },
  {
    question: "What is the function prototype of fputc() in <stdio.h>?",
    answer: "The prototype is: 'int fputc(int ch, FILE *stream);'. It writes the character 'ch' (converted to an unsigned char) to the specified stream, returning the character written on success or EOF on error."
  },
  {
    question: "What is the function prototype of fgets() in <stdio.h>?",
    answer: "The prototype is: 'char *fgets(char *str, int num, FILE *stream);'. It reads at most 'num - 1' characters from the stream until a newline ('\\n') or EOF is encountered, appends a null terminator ('\\0'), and returns 'str', or NULL on EOF/error."
  },
  {
    question: "Why is fgets() considered completely safe compared to the deprecated gets() function?",
    answer: "Because 'fgets()' requires specifying the maximum buffer size limit ('num'), strictly preventing buffer overflow vulnerabilities. 'gets()' lacked any length parameter and could write unbounded input into memory."
  },
  {
    question: "Does fgets() retain the newline character ('\\n') in the buffer?",
    answer: "Yes! If a newline is encountered before 'num - 1' characters are read, 'fgets()' stores the '\\n' in the destination buffer immediately before the trailing '\\0'."
  },
  {
    question: "How do you strip the trailing newline ('\\n') from an fgets() buffer?",
    answer: "Using: 'str[strcspn(str, \"\\r\\n\")] = '\\0';' or 'size_t len = strlen(str); if (len > 0 && str[len-1] == '\\n') str[len-1] = '\\0';'."
  },
  {
    question: "What does fputs() do and does it append a newline automatically?",
    answer: "'int fputs(const char *str, FILE *stream);' writes the null-terminated string 'str' to the stream. Unlike 'puts()', 'fputs()' does NOT append a newline ('\\n') automatically."
  },
  {
    question: "What is the function prototype of fprintf() in <stdio.h>?",
    answer: "'int fprintf(FILE *stream, const char *format, ...);' writes formatted text to the specified stream, returning the total number of characters printed or a negative value on error."
  },
  {
    question: "What is the function prototype of fscanf() in <stdio.h>?",
    answer: "'int fscanf(FILE *stream, const char *format, ...);' parses formatted input from the stream according to format specifiers, returning the number of input items successfully matched and assigned, or EOF."
  },
  {
    question: "Why should you always check the return value of fscanf()?",
    answer: "Checking 'if (fscanf(fp, \"%d %s\", &id, name) == 2)' verifies that both fields were matched successfully, preventing processing uninitialized variables if formatting errors occur in the file."
  },
  {
    question: "Why should you specify field widths in fscanf string parsing (e.g. `%49s`)?",
    answer: "Specifying '%49s' ensures that fscanf will never read more than 49 characters into a 50-byte buffer, eliminating buffer overflow vulnerabilities from malicious long strings in files."
  },
  {
    question: "What does `rewind(FILE *stream)` do?",
    answer: "'rewind(stream)' resets the file position indicator back to the very beginning of the file and clears the stream's error and EOF indicators (equivalent to '(void)fseek(stream, 0L, SEEK_SET); clearerr(stream);')."
  },
  {
    question: "How do you copy one text file to another character by character using fgetc and fputc?",
    answer: "int ch; while ((ch = fgetc(src)) != EOF) { fputc(ch, dest); }"
  },
  {
    question: "How do you count the total number of lines in a text file?",
    answer: "int ch, lines = 0; while ((ch = fgetc(fp)) != EOF) { if (ch == '\\n') lines++; }"
  },
  {
    question: "What is `getchar()` and `putchar()` in relation to fgetc and fputc?",
    answer: "'getchar()' is equivalent to 'fgetc(stdin)', and 'putchar(ch)' is equivalent to 'fputc(ch, stdout)'."
  },
  {
    question: "What happens if fgets() encounters EOF before reading any characters?",
    answer: "fgets() leaves the contents of the buffer untouched and returns NULL."
  },
  {
    question: "What is the behavior of fscanf() with whitespace characters?",
    answer: "Most format specifiers (like %d, %f, %s) automatically skip leading whitespace (spaces, tabs, newlines) before parsing the data. The '%c' specifier does NOT skip whitespace unless preceded by a space (' %c')."
  },
  {
    question: "How do you read a full line with spaces using fscanf()?",
    answer: "Using a scanset format specifier: 'fscanf(fp, \" %255[^\\n]\", buffer);' reads up to 255 characters until a newline is reached."
  },
  {
    question: "What is the difference between `printf(...)` and `fprintf(stdout, ...)`?",
    answer: "They are completely identical in functionality. 'printf(...)' is defined as a direct wrapper around 'fprintf(stdout, ...)'."
  },
  {
    question: "How does local classroom debugging at Coder & AccoTax demonstrate text parsing?",
    answer: "In Sukanta Hui's class, students build student marksheet generators that read CSV files line-by-line using 'fgets' and parse fields using 'sscanf' or 'strtok', reinforcing data validation."
  },
  {
    question: "What happens if a text file does not end with a newline character ('\\n')?",
    answer: "fgets() still reads the final line and appends '\\0' when EOF is reached; the buffer simply won't contain a '\\n' character."
  },
  {
    question: "Why is line-by-line reading with `fgets()` preferred over `fscanf()` for unstructured user data?",
    answer: "Because 'fgets()' always consumes exactly one full line regardless of corrupted contents, preventing infinite loops caused by mismatched 'fscanf()' specifiers."
  },
  {
    question: "What is `snprintf` vs `fprintf`?",
    answer: "'fprintf' formats text and writes to a file stream; 'snprintf' formats text and writes into a memory character array with explicit maximum length boundary protection."
  },
  {
    question: "What is the golden rule when reading text files with fscanf?",
    answer: "Always verify the return value matches the expected item count: `if (fscanf(fp, \"%d %s\", &a, b) == 2) { /* valid */ }` to prevent reading garbage on malformed file rows!"
  }
];

export default questions;
