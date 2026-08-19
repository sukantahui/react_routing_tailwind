// topic15_questions.js
// 30 questions about readline() (moderate to expert)

const questions = [
  {
    question: "What does the readline() method do?",
    shortAnswer: "Reads a single line from a file, including the newline character.",
    explanation: "It reads from the current position until a newline or EOF.",
    hint: "It's line‑oriented.",
    level: "basic",
    codeExample: "line = f.readline()"
  },
  {
    question: "What does readline() return when it reaches EOF?",
    shortAnswer: "An empty string ''.",
    explanation: "This is how you detect the end of the file.",
    hint: "Use `if not line: break`.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What does readline() return for a blank line?",
    shortAnswer: "'\\n' (a string containing just a newline).",
    explanation: "This is different from EOF, which returns ''.",
    hint: "Empty line vs end of file.",
    level: "intermediate",
    codeExample: "line = f.readline()  # returns '\\n'"
  },
  {
    question: "Does readline() include the newline character?",
    shortAnswer: "Yes, it includes the newline at the end of the line.",
    explanation: "The only exception is the last line if it doesn't end with a newline.",
    hint: "Use `rstrip('\\n')` to remove it.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How do you remove the newline from a line read by readline()?",
    shortAnswer: "Use `line.rstrip('\\n')` or `line.strip()`.",
    explanation: "`rstrip('\\n')` removes only newline; `strip()` removes all whitespace.",
    hint: "Choose based on your needs.",
    level: "basic",
    codeExample: "line.rstrip('\\n')"
  },
  {
    question: "What is the purpose of the size parameter in readline(size)?",
    shortAnswer: "It limits the number of characters read from the line.",
    explanation: "If the line is longer, it returns only the first `size` characters.",
    hint: "Useful for reading partial lines.",
    level: "intermediate",
    codeExample: "f.readline(10)"
  },
  {
    question: "What happens if the line is longer than the size parameter?",
    shortAnswer: "It returns the first `size` characters; the next read continues the same line.",
    explanation: "The file pointer stays after the `size` characters, not at the newline.",
    hint: "It doesn't discard the rest of the line.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Is `for line in f` equivalent to using readline()?",
    shortAnswer: "Yes, internally the file object's iterator uses readline().",
    explanation: "It's a more Pythonic and concise way to read lines.",
    hint: "Use `for line in f` for simplicity.",
    level: "basic",
    codeExample: "for line in f: process(line)"
  },
  {
    question: "Which is better: readline() loop or for line in f?",
    shortAnswer: "`for line in f` is preferred for most cases.",
    explanation: "It's simpler, more readable, and handles EOF automatically.",
    hint: "Use `for` unless you need precise control.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you use readline() on a file opened in binary mode?",
    shortAnswer: "Yes, it reads up to the next newline byte (`\\n`).",
    explanation: "It returns bytes instead of a string.",
    hint: "Works with binary files containing newline delimiters.",
    level: "intermediate",
    codeExample: "line = f.readline()  # returns bytes"
  },
  {
    question: "What is the difference between readline() and readlines()?",
    shortAnswer: "readline() reads one line; readlines() reads all lines into a list.",
    explanation: "readlines() loads the entire file into memory.",
    hint: "One line vs all lines.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between readline() and read()?",
    shortAnswer: "readline() reads one line; read() reads the entire file or a chunk.",
    explanation: "readline() is line‑oriented; read() is not.",
    hint: "Use readline() for structured text.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you detect a blank line using readline()?",
    shortAnswer: "Check if the line is `'\\n'`.",
    explanation: "A blank line has only a newline character.",
    hint: "`if line == '\\n': # blank line`",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the file pointer after calling readline()?",
    shortAnswer: "It moves to the start of the next line.",
    explanation: "The pointer is after the newline character.",
    hint: "Use tell() to check.",
    level: "intermediate",
    codeExample: "f.tell()"
  },
  {
    question: "Can you use seek() with readline()?",
    shortAnswer: "Yes, you can seek to a position and then read the next line.",
    explanation: "Useful for random access in structured files.",
    hint: "Combine for powerful navigation.",
    level: "advanced",
    codeExample: "f.seek(100); line = f.readline()"
  },
  {
    question: "How do you read the first line of a file using readline()?",
    shortAnswer: "Open the file and call readline() once.",
    explanation: "The first readline() returns the first line.",
    hint: "Works for headers.",
    level: "basic",
    codeExample: "header = f.readline()"
  },
  {
    question: "How do you skip the first line and read the rest?",
    shortAnswer: "Call readline() once (discard), then loop for the rest.",
    explanation: "Common for CSV files with headers.",
    hint: "`header = f.readline(); for line in f: ...`",
    level: "intermediate",
    codeExample: "f.readline(); for line in f: process(line)"
  },
  {
    question: "What is the maximum line size readline() can handle?",
    shortAnswer: "It's limited by memory; it reads until newline or EOF.",
    explanation: "A very long line without newline could cause memory issues.",
    hint: "Use `size` to limit.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Does readline() work with files that use `\\r\\n` (Windows newlines)?",
    shortAnswer: "Yes, in text mode Python translates `\\r\\n` to `\\n`.",
    explanation: "In binary mode, it reads the raw bytes including `\\r\\n`.",
    hint: "Text mode normalizes newlines.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What happens if you call readline() on a file opened in 'w' mode?",
    shortAnswer: "It raises an error because 'w' mode is write‑only.",
    explanation: "Use 'r' or 'r+' for reading.",
    hint: "Open in the right mode.",
    level: "basic",
    codeExample: "f = open('f.txt', 'w'); f.readline()  # OSError"
  },
  {
    question: "How do you read a file in reverse order using readline()?",
    shortAnswer: "You can't directly; you'd need to read all lines and reverse.",
    explanation: "Use `readlines()` to get all lines, then reverse.",
    hint: "Not memory‑efficient for large files.",
    level: "advanced",
    codeExample: "lines = f.readlines(); for line in reversed(lines): ..."
  },
  {
    question: "Is readline() memory‑efficient for large files?",
    shortAnswer: "Yes, it reads one line at a time, keeping memory usage low.",
    explanation: "Unlike readlines(), it doesn't load the entire file.",
    hint: "Use it for large files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use readline() with a file object from sys.stdin?",
    shortAnswer: "Yes, sys.stdin is a file‑like object that supports readline().",
    explanation: "You can read input line by line from the console.",
    hint: "Works for interactive input.",
    level: "intermediate",
    codeExample: "import sys; line = sys.stdin.readline()"
  },
  {
    question: "What is the difference between `line = f.readline()` and `line = f.readline(10)`?",
    shortAnswer: "The first reads the entire line; the second reads at most 10 characters.",
    explanation: "The size parameter limits the read.",
    hint: "Use size for partial reads.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you handle a very long line without a newline?",
    shortAnswer: "Use `readline(size)` or `read(size)` to read it in chunks.",
    explanation: "Otherwise, readline() could read until EOF, using all memory.",
    hint: "Set a reasonable size limit.",
    level: "advanced",
    codeExample: "chunk = f.readline(4096)"
  },
  {
    question: "What is the return type of readline() in text mode?",
    shortAnswer: "str (string).",
    explanation: "It returns a decoded Unicode string.",
    hint: "Use binary mode for bytes.",
    level: "basic",
    codeExample: "type(f.readline())  # str"
  },
  {
    question: "What is the return type of readline() in binary mode?",
    shortAnswer: "bytes.",
    explanation: "It returns raw bytes including the newline byte.",
    hint: "Use `.decode()` to convert to string.",
    level: "basic",
    codeExample: "type(f.readline())  # bytes"
  },
  {
    question: "Can you use readline() to read from a network socket?",
    shortAnswer: "Yes, if the socket is wrapped in a file‑like object with readline().",
    explanation: "Make sure the socket sends newline‑terminated messages.",
    hint: "Use `socket.makefile()` for this.",
    level: "advanced",
    codeExample: "f = socket.makefile(); line = f.readline()"
  },
  {
    question: "What is the purpose of the `newline` parameter in open() with readline()?",
    shortAnswer: "It controls newline translation, affecting what readline() sees.",
    explanation: "Use `newline=''` to disable translation for exact control.",
    hint: "Important for cross‑platform compatibility.",
    level: "advanced",
    codeExample: "open('f.txt', 'r', newline='')"
  },
  {
    question: "How does readline() handle a file that doesn't end with a newline?",
    shortAnswer: "It returns the last line without a trailing newline.",
    explanation: "The last line may not have `\\n` at the end.",
    hint: "Last line is shorter.",
    level: "intermediate",
    codeExample: null
  }
];

export default questions;