// topic6_questions.js
// 30 questions about open() (moderate to expert)

const questions = [
  {
    question: "What is the default mode for open()?",
    shortAnswer: "'r' (read text).",
    explanation: "If you don't specify a mode, Python opens the file in read‑only text mode.",
    hint: "Default is read.",
    level: "basic",
    codeExample: "open('file.txt')  # equivalent to 'r'"
  },
  {
    question: "What does the 'w' mode do?",
    shortAnswer: "Opens for writing; creates a new file or truncates (overwrites) an existing one.",
    explanation: "Any existing content is lost.",
    hint: "Use with caution; it destroys previous data.",
    level: "basic",
    codeExample: "open('file.txt', 'w')"
  },
  {
    question: "What does the 'a' mode do?",
    shortAnswer: "Opens for appending; writes are added to the end of the file.",
    explanation: "If the file doesn't exist, it's created.",
    hint: "Think of adding a line to a log file.",
    level: "basic",
    codeExample: "open('log.txt', 'a')"
  },
  {
    question: "What does the 'x' mode do?",
    shortAnswer: "Exclusive creation; fails if the file already exists.",
    explanation: "Useful to avoid accidentally overwriting an existing file.",
    hint: "x = exclusive.",
    level: "intermediate",
    codeExample: "open('new.txt', 'x')"
  },
  {
    question: "What is the difference between 'r+' and 'w+' modes?",
    shortAnswer: "'r+' opens for reading and writing without truncating; 'w+' truncates the file.",
    explanation: "With 'r+', you can read and modify the existing content; 'w+' creates a new empty file.",
    hint: "'r+' preserves existing content, 'w+' destroys it.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why is it important to close a file after opening it?",
    shortAnswer: "To free system resources and ensure all data is flushed to disk.",
    explanation: "Unclosed files can cause resource leaks and data loss.",
    hint: "Use `with` to avoid this.",
    level: "basic",
    codeExample: "f.close()"
  },
  {
    question: "What is the `with` statement and why is it used with `open()`?",
    shortAnswer: "It's a context manager that automatically closes the file when the block exits.",
    explanation: "This is the safest and most Pythonic way to handle files.",
    hint: "No need to remember `close()`.",
    level: "intermediate",
    codeExample: "with open('file.txt', 'r') as f: data = f.read()"
  },
  {
    question: "What is the `encoding` parameter in open() used for?",
    shortAnswer: "It specifies the character encoding for reading/writing text files.",
    explanation: "Always set it to 'utf-8' for cross‑platform compatibility.",
    hint: "Without it, you may get UnicodeDecodeError.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r', encoding='utf-8')"
  },
  {
    question: "What happens if you don't specify `encoding` in open()?",
    shortAnswer: "Python uses the default encoding from `locale.getpreferredencoding()`.",
    explanation: "This is platform‑dependent and may lead to issues.",
    hint: "Best practice: always specify it.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What does `errors='replace'` do when reading a file?",
    shortAnswer: "It replaces invalid bytes with the replacement character '�'.",
    explanation: "Prevents the program from crashing on encoding errors.",
    hint: "Good for handling corrupted or non‑UTF‑8 data.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r', errors='replace')"
  },
  {
    question: "How do you open a binary file in Python?",
    shortAnswer: "Add 'b' to the mode, e.g., 'rb' for reading binary.",
    explanation: "Binary mode returns bytes instead of strings.",
    hint: "Use for images, executables, etc.",
    level: "basic",
    codeExample: "open('image.jpg', 'rb')"
  },
  {
    question: "What is the difference between text and binary mode?",
    shortAnswer: "Text mode applies encoding/decoding and newline translation; binary mode does not.",
    explanation: "Binary mode gives you raw bytes.",
    hint: "Text for human‑readable data, binary for everything else.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the `newline` parameter in open()?",
    shortAnswer: "It controls how newlines are translated when reading and writing.",
    explanation: "Use `newline=''` to disable translation, important for CSV files.",
    hint: "Cross‑platform newline handling.",
    level: "advanced",
    codeExample: "open('file.csv', 'r', newline='')"
  },
  {
    question: "What does `open()` return?",
    shortAnswer: "A file object (a file‑like object).",
    explanation: "This object provides methods like read, write, seek, etc.",
    hint: "It's a connection to the file.",
    level: "basic",
    codeExample: "f = open('file.txt'); type(f)  # _io.TextIOWrapper"
  },
  {
    question: "What is a file descriptor?",
    shortAnswer: "A low‑level integer handle used by the operating system to identify an open file.",
    explanation: "Python's file object wraps a file descriptor.",
    hint: "You can get it with `f.fileno()`.",
    level: "advanced",
    codeExample: "f.fileno()"
  },
  {
    question: "What is the `buffering` parameter in open()?",
    shortAnswer: "It sets the buffering policy: 0 = no buffer, 1 = line buffer, >1 = buffer size.",
    explanation: "Buffering improves performance by reducing system calls.",
    hint: "Leave at default unless you have specific needs.",
    level: "advanced",
    codeExample: "open('file.txt', 'r', buffering=1)"
  },
  {
    question: "How do you open a file for both reading and writing without truncating?",
    shortAnswer: "Use mode 'r+'.",
    explanation: "It opens the file for reading and writing; the file must exist.",
    hint: "You can modify in place.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r+')"
  },
  {
    question: "What is the `closefd` parameter in open()?",
    shortAnswer: "If False, the file descriptor is not closed when the file is closed.",
    explanation: "Used for advanced scenarios where you manage the descriptor manually.",
    hint: "Rarely needed.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How can you open a file with a custom opener?",
    shortAnswer: "Use the `opener` parameter to provide a custom callable that returns a file descriptor.",
    explanation: "Allows for advanced file opening behavior.",
    hint: "Not for beginners.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the difference between `open()` and `io.open()`?",
    shortAnswer: "In Python 3, `io.open()` is the same as built‑in `open()`.",
    explanation: "In Python 2, `io.open()` was different; in Python 3, they are aliases.",
    hint: "Use built‑in `open()`.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why do you get a `FileNotFoundError` when opening a file with 'r'?",
    shortAnswer: "Because the file does not exist in the specified path.",
    explanation: "The 'r' mode requires the file to exist.",
    hint: "Check the path or use 'w' to create it.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the purpose of `os.path.exists()` before `open()`?",
    shortAnswer: "To check if the file exists before attempting to open it, preventing FileNotFoundError.",
    explanation: "But be aware of race conditions; prefer try‑except.",
    hint: "Use try‑except for robustness.",
    level: "intermediate",
    codeExample: "if os.path.exists('file.txt'): open(...)"
  },
  {
    question: "Can you open a file in 'w' mode if it doesn't exist?",
    shortAnswer: "Yes, Python creates the file.",
    explanation: "'w' mode creates the file if it doesn't exist.",
    hint: "That's why it's used for writing.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the maximum number of files you can open simultaneously?",
    shortAnswer: "It's limited by the operating system (ulimit on Unix, handle limits on Windows).",
    explanation: "Always close files to avoid hitting limits.",
    hint: "Not a Python limitation.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you open a file with a path that contains spaces?",
    shortAnswer: "Pass the path as a string; Python handles spaces automatically.",
    explanation: "No need for escaping in Python strings.",
    hint: "Use raw strings or double backslashes on Windows.",
    level: "basic",
    codeExample: "open('My Documents/file.txt')"
  },
  {
    question: "What is the `os.O_*` flags used with `os.open()`?",
    shortAnswer: "They are low‑level flags for the `os.open()` system call, not the built‑in `open()`.",
    explanation: "Built‑in `open()` is higher‑level and easier.",
    hint: "Stick with built‑in `open()`.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you open a file in universal newline mode?",
    shortAnswer: "Use `open()` without the `newline` parameter (default) or `newline=None`.",
    explanation: "Python translates any newline to `\\n` by default.",
    hint: "Universal newline support is built in.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r')  # universal newlines"
  },
  {
    question: "What is the difference between `open()` and `codecs.open()`?",
    shortAnswer: "`codecs.open()` is deprecated; use built‑in `open()` with `encoding` parameter.",
    explanation: "Python 3's `open()` handles encoding just as well.",
    hint: "Use the built‑in.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you open a file in both read and write mode without truncating and without the file existing?",
    shortAnswer: "No, you need to use 'w+' or 'a+' to create, but they have different behaviors.",
    explanation: "'r+' requires the file to exist.",
    hint: "Use 'w+' if you want to create and overwrite, 'a+' for append.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the `Path.open()` method in `pathlib`?",
    shortAnswer: "It's a method on Path objects that works like the built‑in `open()` but with the path already set.",
    explanation: "Example: `Path('file.txt').open('r')`.",
    hint: "More convenient with `pathlib`.",
    level: "intermediate",
    codeExample: "from pathlib import Path; Path('file.txt').open('r')"
  }
];

export default questions;