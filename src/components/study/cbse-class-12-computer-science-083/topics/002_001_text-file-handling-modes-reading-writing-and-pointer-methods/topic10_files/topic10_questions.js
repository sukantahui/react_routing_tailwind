// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "Which statement best describes the purpose of a master reference Python laboratory script in CBSE Class 12 CS?",
    "options": [
      "It replaces reading textbooks entirely",
      "It consolidates all required syllabus operations (modes, reading, writing, seeking, algorithms) into an executable reference file",
      "It is only used during theoretical exams",
      "It converts Python 2 code to Python 3"
    ],
    "correctAnswer": 1,
    "explanation": "A master reference lab file brings together standard operations, demonstrating syntax and expected console outputs in one place.",
    "hint": "Consolidates all syllabus operations."
  },
  {
    "id": 2,
    "question": "When downloading a `.py` script for local execution, which Python version is recommended for CBSE Class 12 CS (083)?",
    "options": [
      "Python 2.7",
      "Python 3.8 to 3.12+",
      "Jython",
      "IronPython"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE Class 12 examinations test standard CPython 3.x syntax, built-ins, and standard libraries.",
    "hint": "Modern Python 3."
  },
  {
    "id": 3,
    "question": "Why is UTF-8 encoding explicitly specified when opening files in production Python scripts?",
    "options": [
      "It doubles the speed of disk drives",
      "It guarantees consistent cross-platform character encoding between Windows, macOS, and Linux",
      "It compresses text by 50%",
      "It protects files with passwords"
    ],
    "correctAnswer": 1,
    "explanation": "Specifying `encoding='utf-8'` prevents operating system default codec mismatches (e.g. cp1252 on Windows vs utf-8 on Linux).",
    "hint": "Cross-platform consistency."
  },
  {
    "id": 4,
    "question": "Which built-in file attribute provides the string filename or path passed to open()?",
    "options": [
      "f.path",
      "f.name",
      "f.location",
      "f.uri"
    ],
    "correctAnswer": 1,
    "explanation": "`f.name` returns the string filename or path associated with the open file handle.",
    "hint": "f.name attribute."
  },
  {
    "id": 5,
    "question": "Which method is the most memory-safe pattern when writing downloadable log exports?",
    "options": [
      "with open('log.txt', 'w') as f: f.write(data)",
      "f = open('log.txt', 'w'); f.write(data)",
      "f = open('log.txt', 'r+')",
      "os.write_file('log.txt')"
    ],
    "correctAnswer": 0,
    "explanation": "The `with` statement ensures the file is closed and buffers are flushed even if errors interrupt writing.",
    "hint": "with open() context manager."
  },
  {
    "id": 6,
    "question": "What is the expected file size of an empty text file created via `open('empty.txt', 'w').close()`?",
    "options": [
      "0 bytes",
      "1 byte",
      "128 bytes",
      "Depends on OS allocation block"
    ],
    "correctAnswer": 0,
    "explanation": "An empty file with no written characters has a logical length of 0 bytes.",
    "hint": "Zero bytes."
  },
  {
    "id": 7,
    "question": "Which standard Python module is used to check if a file exists on disk before opening?",
    "options": [
      "os.path (e.g. os.path.exists())",
      "sys.file",
      "math.check",
      "io.exists()"
    ],
    "correctAnswer": 0,
    "explanation": "`os.path.exists(path)` or `pathlib.Path(path).exists()` verifies file existence.",
    "hint": "os.path.exists."
  },
  {
    "id": 8,
    "question": "What is returned by `os.path.getsize('doc.txt')`?",
    "options": [
      "Number of lines",
      "Number of words",
      "Total file size in bytes",
      "File owner ID"
    ],
    "correctAnswer": 2,
    "explanation": "`os.path.getsize()` returns the size of a file in physical bytes.",
    "hint": "File size in bytes."
  },
  {
    "id": 9,
    "question": "Which mode must be used if you want to inspect a file's contents without modifying or truncating it?",
    "options": [
      "'w'",
      "'a'",
      "'r'",
      "'w+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'r'` is read-only and leaves file content completely unchanged.",
    "hint": "Read-only mode."
  },
  {
    "id": 10,
    "question": "Assertion (A): Downloadable revision text notes provide an offline-first reference for students.\nReason (R): Plain text files require no specialized word processor and render across all devices.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Plain text files (.txt) are universally portable, lightweight, and readable on any operating system without software dependencies.",
    "hint": "Universal plain text portability."
  },
  {
    "id": 11,
    "question": "What does `sys.getsizeof()` measure compared to `os.path.getsize()`?",
    "options": [
      "sys.getsizeof measures in-memory Python object size; os.path.getsize measures disk file size in bytes",
      "They are identical",
      "sys.getsizeof is for directories only",
      "os.path.getsize counts characters"
    ],
    "correctAnswer": 0,
    "explanation": "`sys.getsizeof()` inspects RAM memory consumed by a Python variable; `os.path.getsize()` measures physical disk bytes.",
    "hint": "RAM size vs disk file size."
  },
  {
    "id": 12,
    "question": "Which file extension is standard for Python source code documents?",
    "options": [
      ".txt",
      ".py",
      ".pyc",
      ".ipynb"
    ],
    "correctAnswer": 1,
    "explanation": "`.py` is the official standard extension for Python source files.",
    "hint": ".py extension."
  },
  {
    "id": 13,
    "question": "What character separates directories in file paths on Windows vs POSIX systems?",
    "options": [
      "Windows uses backslash (\\); POSIX uses forward slash (/)",
      "Both use forward slash only",
      "Both use colons",
      "Windows uses semicolon"
    ],
    "correctAnswer": 0,
    "explanation": "Windows natively uses `\\` (though Python accepts `/`), while Linux/macOS use `/`.",
    "hint": "Backslash vs forward slash."
  },
  {
    "id": 14,
    "question": "How does Python handle raw string paths like `r'C:\\data\\notes.txt'`?",
    "options": [
      "Ignores backslashes as escape characters",
      "Reverses the path string",
      "Converts backslashes to periods",
      "Raises SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Prefixing a string with `r` creates a raw string literal where backslashes are not treated as escape sequences.",
    "hint": "Raw string literal."
  },
  {
    "id": 15,
    "question": "Consider: `f = open('test.txt', 'w')`. What does `f.writable()` return?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "Since the file was opened in `'w'` mode, `f.writable()` evaluates to `True`.",
    "hint": "True for write mode."
  },
  {
    "id": 16,
    "question": "Why is it good practice to keep master reference scripts self-contained with a `__main__` entry point?",
    "options": [
      "It allows the file to be run directly as a script or imported as a module without side effects",
      "It speeds up compilation",
      "It is required for file I/O",
      "It prevents garbage collection"
    ],
    "correctAnswer": 0,
    "explanation": "`if __name__ == '__main__':` ensures demonstration code only executes when run as a standalone script.",
    "hint": "if __name__ == '__main__'."
  },
  {
    "id": 17,
    "question": "What happens if a text file contains non-ASCII characters like emojis and is read with `open('f.txt', encoding='ascii')`?",
    "options": [
      "Emojis are translated to text",
      "Raises UnicodeDecodeError",
      "Characters are skipped silently",
      "File is erased"
    ],
    "correctAnswer": 1,
    "explanation": "ASCII only defines codes 0-127; encountering multibyte characters under ASCII codec raises `UnicodeDecodeError`.",
    "hint": "UnicodeDecodeError."
  },
  {
    "id": 18,
    "question": "Which mode flag allows reading and writing simultaneously while starting at the end of the file?",
    "options": [
      "'r+'",
      "'w+'",
      "'a+'",
      "'x+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'a+'` opens for reading and appending; writes go to EOF and reads can reposition with `seek()`.",
    "hint": "'a+' mode."
  },
  {
    "id": 19,
    "question": "What does `f.fileno()` return for an open file object?",
    "options": [
      "The integer OS file descriptor",
      "The line count",
      "The file size",
      "The mode string"
    ],
    "correctAnswer": 0,
    "explanation": "`f.fileno()` returns the low-level integer file descriptor assigned by the operating system kernel.",
    "hint": "Low-level OS descriptor."
  },
  {
    "id": 20,
    "question": "How can you read a text file into a single string while ensuring proper closure in one line?",
    "options": [
      "data = open('f.txt').read()",
      "with open('f.txt') as f: data = f.read()",
      "data = f.read(open('f.txt'))",
      "read_file('f.txt')"
    ],
    "correctAnswer": 1,
    "explanation": "Using the `with` statement ensures the file descriptor is released immediately upon exiting the block.",
    "hint": "with statement is safest."
  },
  {
    "id": 21,
    "question": "In Python, which function from the `shutil` module copies a file from source to destination?",
    "options": [
      "shutil.copyfile(src, dst)",
      "shutil.move(src, dst)",
      "shutil.transfer(src, dst)",
      "shutil.clone(src, dst)"
    ],
    "correctAnswer": 0,
    "explanation": "`shutil.copyfile(src, dst)` copies file content directly between two paths.",
    "hint": "copyfile function."
  },
  {
    "id": 22,
    "question": "Assertion (A): Downloadable master scripts in educational platforms provide repeatable lab environments.\nReason (R): Students can execute, modify, and observe tracing output locally on their own IDLE or VS Code setups.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Local execution reinforces classroom theory with immediate hands-on validation in IDLE or terminal.",
    "hint": "Hands-on local experimentation."
  },
  {
    "id": 23,
    "question": "What does `f.isatty()` return for a standard disk file handle?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "`isatty()` returns True only for terminal/console streams; for disk files, it returns `False`.",
    "hint": "False for disk files."
  },
  {
    "id": 24,
    "question": "What is the recommended tool in CBSE schools for running standard Class 12 Python programs?",
    "options": [
      "Python IDLE",
      "Xcode",
      "Eclipse",
      "Android Studio"
    ],
    "correctAnswer": 0,
    "explanation": "Python IDLE is the standard, bundled development environment used in CBSE board practical examinations.",
    "hint": "Python IDLE."
  },
  {
    "id": 25,
    "question": "In CBSE board examination practical evaluations, how many marks are allocated to the Python file handling program?",
    "options": [
      "2 Marks",
      "8 Marks",
      "15 Marks",
      "20 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "In the 30-mark CBSE practical, the Python programming problem (typically File Handling or Stack) carries 8 Marks.",
    "hint": "8 Marks in practical exam."
  }
];

export default questions;
