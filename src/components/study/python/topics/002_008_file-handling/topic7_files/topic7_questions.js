// topic7_questions.js
// 30 questions about file objects (moderate to expert)

const questions = [
  {
    question: "What is a file object in Python?",
    shortAnswer: "An object returned by open() that provides methods to read/write a file.",
    explanation: "It's a wrapper around a file descriptor that manages I/O operations.",
    hint: "Think of it as a remote control for a file.",
    level: "basic",
    codeExample: "f = open('file.txt'); type(f)"
  },
  {
    question: "What method reads the entire file content as a string?",
    shortAnswer: "read() without arguments.",
    explanation: "It reads from the current position to the end of the file.",
    hint: "Use for small files only.",
    level: "basic",
    codeExample: "content = f.read()"
  },
  {
    question: "What is the difference between read() and readlines()?",
    shortAnswer: "read() returns a single string; readlines() returns a list of strings (one per line).",
    explanation: "Both read the entire file; but readlines() splits lines for you.",
    hint: "One gives you a string, the other a list.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you read a file line by line without loading it all into memory?",
    shortAnswer: "Use a for loop: `for line in f:`.",
    explanation: "This uses the iterator protocol, reading lines lazily.",
    hint: "Most memory‑efficient way.",
    level: "intermediate",
    codeExample: "for line in open('file.txt'): print(line)"
  },
  {
    question: "What is the purpose of the close() method?",
    shortAnswer: "To release the file descriptor and flush any buffered writes.",
    explanation: "After closing, you cannot perform I/O on the file object.",
    hint: "Always close files or use `with`.",
    level: "basic",
    codeExample: "f.close()"
  },
  {
    question: "What is the `with` statement and why is it recommended?",
    shortAnswer: "It's a context manager that automatically calls close() when the block exits.",
    explanation: "It ensures the file is closed even if an exception occurs.",
    hint: "It's the safe and Pythonic way.",
    level: "intermediate",
    codeExample: "with open('file.txt') as f: data = f.read()"
  },
  {
    question: "What does the tell() method return?",
    shortAnswer: "The current position of the file pointer in bytes (or characters in text mode).",
    explanation: "Useful for tracking where you are in the file.",
    hint: "Returns an integer.",
    level: "intermediate",
    codeExample: "pos = f.tell()"
  },
  {
    question: "What does the seek() method do?",
    shortAnswer: "Moves the file pointer to a specified position.",
    explanation: "Allows random access to any part of the file.",
    hint: "Use with tell() to navigate.",
    level: "intermediate",
    codeExample: "f.seek(0)  # go to start"
  },
  {
    question: "What is the significance of the `closed` attribute?",
    shortAnswer: "It's a boolean indicating whether the file object has been closed.",
    explanation: "Check it before performing operations to avoid ValueError.",
    hint: "`if not f.closed: f.read()`",
    level: "intermediate",
    codeExample: "f.closed"
  },
  {
    question: "What is the `mode` attribute of a file object?",
    shortAnswer: "It returns the mode string used to open the file (e.g., 'r', 'w', 'rb').",
    explanation: "Useful for debugging or conditional logic.",
    hint: "`f.mode`",
    level: "intermediate",
    codeExample: "f.mode"
  },
  {
    question: "How can you check if a file is open before reading?",
    shortAnswer: "Check the `closed` attribute.",
    explanation: "If `f.closed` is True, you cannot read from it.",
    hint: "Always guard against using closed files.",
    level: "basic",
    codeExample: "if not f.closed: content = f.read()"
  },
  {
    question: "What is the `name` attribute of a file object?",
    shortAnswer: "Returns the filename or path used to open the file.",
    explanation: "Helpful for logging which file is being processed.",
    hint: "`f.name`",
    level: "basic",
    codeExample: "f.name"
  },
  {
    question: "What does the flush() method do?",
    shortAnswer: "Forces the internal buffer to be written to disk immediately.",
    explanation: "Normally, Python buffers writes for performance. flush() ensures data is on disk.",
    hint: "Use sparingly; it can hurt performance.",
    level: "advanced",
    codeExample: "f.flush()"
  },
  {
    question: "What is the difference between `readline()` and `readlines()`?",
    shortAnswer: "readline() reads one line; readlines() reads all lines into a list.",
    explanation: "readline() is memory‑efficient for large files.",
    hint: "One at a time vs all at once.",
    level: "intermediate",
    codeExample: "line = f.readline()"
  },
  {
    question: "Can you write strings to a file opened in binary mode?",
    shortAnswer: "No, you must write bytes (encode strings first).",
    explanation: "Binary mode expects bytes‑like objects.",
    hint: "Use `.encode()` to convert.",
    level: "intermediate",
    codeExample: "f.write('hello'.encode())"
  },
  {
    question: "What happens if you call `read()` on a closed file?",
    shortAnswer: "A ValueError is raised.",
    explanation: "The file object is no longer valid for I/O.",
    hint: "Always check `closed`.",
    level: "basic",
    codeExample: "f.close(); f.read()  # ValueError"
  },
  {
    question: "What is the `writelines()` method?",
    shortAnswer: "It writes a list of strings to the file.",
    explanation: "It does not add newlines automatically; you must include them.",
    hint: "Useful for writing multiple lines at once.",
    level: "intermediate",
    codeExample: "f.writelines(['line1\\n', 'line2\\n'])"
  },
  {
    question: "How does iteration over a file object work?",
    shortAnswer: "It calls `readline()` repeatedly until EOF, yielding each line.",
    explanation: "This is the most Pythonic way to read a file line by line.",
    hint: "`for line in f:`",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the `__next__()` method of a file object?",
    shortAnswer: "It returns the next line from the file, raising StopIteration at EOF.",
    explanation: "Used by the iterator protocol.",
    hint: "Called implicitly in `for` loops.",
    level: "advanced",
    codeExample: "next(f)"
  },
  {
    question: "How can you get the file descriptor of a file object?",
    shortAnswer: "Using the `fileno()` method.",
    explanation: "The file descriptor is an integer used by OS‑level operations.",
    hint: "Useful for advanced I/O.",
    level: "advanced",
    codeExample: "fd = f.fileno()"
  },
  {
    question: "What is the `truncate()` method?",
    shortAnswer: "It truncates the file to a specified size (or current position if no size given).",
    explanation: "Can be used to shrink or extend a file.",
    hint: "Be careful; data beyond the truncation point is lost.",
    level: "advanced",
    codeExample: "f.truncate(100)"
  },
  {
    question: "Why does `read()` on a text file return `str`, but on a binary file returns `bytes`?",
    shortAnswer: "Text mode applies encoding/decoding; binary mode returns raw bytes.",
    explanation: "That's the fundamental difference between text and binary modes.",
    hint: "Text = strings, Binary = bytes.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the `isatty()` method used for?",
    shortAnswer: "It checks if the file object is associated with a terminal device.",
    explanation: "Useful for interactive vs non‑interactive mode.",
    hint: "Rarely used.",
    level: "advanced",
    codeExample: "f.isatty()"
  },
  {
    question: "How do you read only the first 100 bytes of a file?",
    shortAnswer: "Use `f.read(100)`.",
    explanation: "You can specify the number of bytes/characters to read.",
    hint: "`read(size)`.",
    level: "basic",
    codeExample: "first_100 = f.read(100)"
  },
  {
    question: "What is the difference between `seek(0)` and `seek(0, 0)`?",
    shortAnswer: "They are the same; `seek(offset, whence)` with whence=0 means absolute from start.",
    explanation: "The default whence is 0.",
    hint: "`seek(0)` goes to the start.",
    level: "intermediate",
    codeExample: "f.seek(0)  # same as f.seek(0, 0)"
  },
  {
    question: "What are the possible values for `whence` in `seek()`?",
    shortAnswer: "0 = start, 1 = current, 2 = end (for binary files).",
    explanation: "In text mode, only 0 is supported (with exceptions).",
    hint: "Use 1 or 2 only in binary mode.",
    level: "advanced",
    codeExample: "f.seek(10, 1)  # move 10 bytes forward from current"
  },
  {
    question: "Why does `seek()` on a text file sometimes behave differently?",
    shortAnswer: "Because text files have variable‑length encodings; seeking to arbitrary byte positions may not align with character boundaries.",
    explanation: "It's safer to use `tell()` to store positions and seek to them.",
    hint: "Binary mode is simpler for seeking.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the `readable()` method?",
    shortAnswer: "It returns True if the file can be read from.",
    explanation: "Useful for checking before reading.",
    hint: "`f.readable()`",
    level: "intermediate",
    codeExample: "if f.readable(): f.read()"
  },
  {
    question: "What is the `writable()` method?",
    shortAnswer: "It returns True if the file can be written to.",
    explanation: "Check before writing.",
    hint: "`f.writable()`",
    level: "intermediate",
    codeExample: "if f.writable(): f.write('hello')"
  },
  {
    question: "What happens if you assign a file object to a variable and then close it?",
    shortAnswer: "The variable still references the object, but it's closed; any I/O operation will raise ValueError.",
    explanation: "The file object is closed, but the variable remains.",
    hint: "Check `closed` before using.",
    level: "intermediate",
    codeExample: "f = open('file.txt'); f.close(); f.read()  # ValueError"
  },
  {
    question: "How do you open a file and immediately get its content in a one-liner?",
    shortAnswer: "`with open('file.txt') as f: data = f.read()`",
    explanation: "This is the standard safe way.",
    hint: "Always use `with`.",
    level: "basic",
    codeExample: "with open('file.txt') as f: data = f.read()"
  }
];

export default questions;