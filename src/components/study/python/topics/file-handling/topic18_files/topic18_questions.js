// topic18_questions.js
// 30 questions about write() (moderate to expert)

const questions = [
  {
    question: "What does the write() method do?",
    shortAnswer: "Writes a string to a file at the current file position.",
    explanation: "It writes the string and returns the number of characters written.",
    hint: "It's the primary way to write text to files.",
    level: "basic",
    codeExample: "f.write('Hello, World!')"
  },
  {
    question: "Does write() automatically add a newline?",
    shortAnswer: "No, you must include '\\n' explicitly.",
    explanation: "write() writes exactly what you give it; no formatting is added.",
    hint: "Always include newlines manually.",
    level: "basic",
    codeExample: "f.write('Line 1\\nLine 2\\n')"
  },
  {
    question: "What does write() return?",
    shortAnswer: "The number of characters written.",
    explanation: "In text mode, it's characters; in binary mode, it's bytes.",
    hint: "It's an integer count.",
    level: "intermediate",
    codeExample: "chars_written = f.write('Hello')"
  },
  {
    question: "Can you write a number using write()?",
    shortAnswer: "No, write() expects a string. Convert numbers to strings first.",
    explanation: "Use `str(42)` or f-strings: `f.write(f'{42}')`.",
    hint: "Convert to string first.",
    level: "basic",
    codeExample: "f.write(str(42))"
  },
  {
    question: "What happens if you write to a file opened in 'r' mode?",
    shortAnswer: "It raises an error because 'r' is read-only.",
    explanation: "Use 'w', 'a', or 'r+' for writing.",
    hint: "Open in write mode.",
    level: "basic",
    codeExample: "f = open('f.txt', 'r'); f.write('text')  # OSError"
  },
  {
    question: "What is the difference between 'w' and 'a' modes for write()?",
    shortAnswer: "'w' truncates (overwrites); 'a' appends to the end.",
    explanation: "'w' destroys existing content; 'a' preserves it.",
    hint: "Write vs append.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Does write() immediately write to disk?",
    shortAnswer: "Not necessarily; data is buffered. It's written on flush() or close().",
    explanation: "Python buffers writes for performance.",
    hint: "Use flush() or close() to ensure writing.",
    level: "intermediate",
    codeExample: "f.flush()"
  },
  {
    question: "How do you ensure data is written to disk immediately?",
    shortAnswer: "Call `flush()` after writing or use `with` which flushes on close.",
    explanation: "`flush()` forces the buffer to be written.",
    hint: "Use flush() for immediate writes.",
    level: "intermediate",
    codeExample: "f.write('data'); f.flush()"
  },
  {
    question: "What is the return type of write()?",
    shortAnswer: "int (integer).",
    explanation: "It returns the number of characters (or bytes) written.",
    hint: "It's an integer.",
    level: "basic",
    codeExample: "type(f.write('abc'))  # int"
  },
  {
    question: "Can you use write() with a file opened in binary mode?",
    shortAnswer: "Yes, but you must write bytes, not strings.",
    explanation: "Use `f.write(b'bytes')` in binary mode.",
    hint: "Convert strings with .encode().",
    level: "intermediate",
    codeExample: "f.write(b'Hello')"
  },
  {
    question: "What happens if write() fails?",
    shortAnswer: "It raises an exception (OSError, PermissionError, etc.).",
    explanation: "Common errors include disk full, permission denied, or read-only file.",
    hint: "Handle exceptions.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you write multiple lines efficiently?",
    shortAnswer: "Use `write()` in a loop with `\\n`, or use `writelines()`.",
    explanation: "`writelines()` takes a list of strings and writes them.",
    hint: "Use writelines() for lists.",
    level: "intermediate",
    codeExample: "f.writelines(['line1\\n', 'line2\\n'])"
  },
  {
    question: "What is the difference between write() and print()?",
    shortAnswer: "write() writes to a file; print() writes to stdout (by default).",
    explanation: "`print()` adds a newline by default; `write()` does not.",
    hint: "print() is for console; write() is for files.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you use print() to write to a file?",
    shortAnswer: "Yes, with `print('text', file=f)`.",
    explanation: "`print()` can take a `file` parameter to write to any file-like object.",
    hint: "Use `file=` parameter.",
    level: "intermediate",
    codeExample: "print('Hello', file=f)"
  },
  {
    question: "What happens if you write a string with Unicode characters?",
    shortAnswer: "It's written using the specified encoding (e.g., UTF-8).",
    explanation: "Make sure the file is opened with the correct encoding.",
    hint: "Use encoding='utf-8'.",
    level: "intermediate",
    codeExample: "open('f.txt', 'w', encoding='utf-8')"
  },
  {
    question: "How do you write a variable's value to a file?",
    shortAnswer: "Convert it to a string and write it: `f.write(str(variable))`.",
    explanation: "Use f-strings or format() for more complex output.",
    hint: "Convert to string first.",
    level: "basic",
    codeExample: "f.write(f'Value: {var}\\n')"
  },
  {
    question: "What is the advantage of using f-strings with write()?",
    shortAnswer: "They make formatting easy and readable.",
    explanation: "`f.write(f'Name: {name}, Score: {score}\\n')` is clear.",
    hint: "Readable and efficient.",
    level: "intermediate",
    codeExample: "f.write(f'{name}: {score}\\n')"
  },
  {
    question: "Can you write None to a file?",
    shortAnswer: "No, `None` is not a string; convert with `str(None)`.",
    explanation: "`write()` only accepts strings.",
    hint: "Convert None to string.",
    level: "basic",
    codeExample: "f.write(str(None))"
  },
  {
    question: "What is the maximum size of data you can write with write()?",
    shortAnswer: "Limited by memory and disk space; no hard limit in Python.",
    explanation: "Very large writes may cause memory issues; use chunks.",
    hint: "Write in chunks for large data.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you write data to a temporary file?",
    shortAnswer: "Use the `tempfile` module, which provides temporary file objects.",
    explanation: "Temporary files are automatically cleaned up.",
    hint: "Use tempfile module.",
    level: "advanced",
    codeExample: "import tempfile; with tempfile.TemporaryFile('w') as f: f.write('data')"
  },
  {
    question: "What is the difference between write() and writelines()?",
    shortAnswer: "write() writes a single string; writelines() writes a list of strings.",
    explanation: "`writelines()` does NOT add newlines automatically.",
    hint: "One writes one string, the other writes a list.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you check if a write operation succeeded?",
    shortAnswer: "Check the return value (number of characters written).",
    explanation: "If it's less than expected, something went wrong.",
    hint: "Compare return value with string length.",
    level: "intermediate",
    codeExample: "if f.write(text) != len(text): print('Write error')"
  },
  {
    question: "Can write() be used with StringIO?",
    shortAnswer: "Yes, StringIO is a file-like object that supports write().",
    explanation: "Useful for building strings in memory.",
    hint: "StringIO works like a file.",
    level: "advanced",
    codeExample: "import io; f = io.StringIO(); f.write('text')"
  },
  {
    question: "What is the encoding parameter in open() for write()?",
    shortAnswer: "It specifies the character encoding used when writing.",
    explanation: "Always use `encoding='utf-8'` for modern applications.",
    hint: "Specify encoding to avoid platform issues.",
    level: "intermediate",
    codeExample: "open('f.txt', 'w', encoding='utf-8')"
  },
  {
    question: "What happens if you write to a file with insufficient disk space?",
    shortAnswer: "It raises an OSError (usually errno 28 'No space left on device').",
    explanation: "The write operation fails with an appropriate exception.",
    hint: "Catch OSError.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you append a newline to a string before writing?",
    shortAnswer: "Use `+ '\\n'` or `f'{line}\\n'`.",
    explanation: "`f.write(line + '\\n')` adds a newline.",
    hint: "Add newline explicitly.",
    level: "basic",
    codeExample: "f.write(line + '\\n')"
  },
  {
    question: "What is the difference between writing in text vs binary mode?",
    shortAnswer: "Text mode writes strings with encoding; binary mode writes bytes.",
    explanation: "In binary mode, you must write bytes objects.",
    hint: "Text = strings; binary = bytes.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you write a list of integers to a file?",
    shortAnswer: "Convert each integer to a string, join with newlines, and write.",
    explanation: "`f.write('\\n'.join(map(str, numbers)))`",
    hint: "Use map() or list comprehension.",
    level: "intermediate",
    codeExample: "f.write('\\n'.join(map(str, [1,2,3])))"
  },
  {
    question: "What is the purpose of the `errors` parameter in open() for writing?",
    shortAnswer: "It handles encoding errors when writing.",
    explanation: "Useful for handling characters that can't be encoded.",
    hint: "Use 'ignore' or 'replace' for error handling.",
    level: "advanced",
    codeExample: "open('f.txt', 'w', errors='replace')"
  },
  {
    question: "Can you write to a file that is open in another program?",
    shortAnswer: "It depends on the OS and the program. Windows often locks files.",
    explanation: "Use file sharing modes or ensure exclusive access.",
    hint: "Be careful with concurrent access.",
    level: "advanced",
    codeExample: null
  }
];

export default questions;