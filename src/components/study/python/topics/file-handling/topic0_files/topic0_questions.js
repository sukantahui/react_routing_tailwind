// topic0_questions.js
// 30 frequently asked questions about file handling (moderate to expert level)

const questions = [
  {
    question: "What is file handling in programming?",
    shortAnswer: "File handling is the process of storing, retrieving, and manipulating data on persistent storage via a program.",
    explanation: "It enables data to outlive the program's execution. Through file operations, applications can save user data, configuration, logs, and more.",
    hint: "Think about what happens when you save a document and reopen it later.",
    level: "basic",
    codeExample: "file = open('data.txt', 'r')"
  },
  {
    question: "Why is file handling important for real-world applications?",
    shortAnswer: "It allows data persistence, enabling applications to retain information across sessions.",
    explanation: "Without file handling, all data would be lost when the program ends. This is crucial for user accounts, settings, transaction records, etc.",
    hint: "Imagine an online store that forgets every order after a restart.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between memory (RAM) and persistent storage (disk)?",
    shortAnswer: "RAM is volatile and fast; disk storage is non-volatile and slower.",
    explanation: "Data in RAM is lost when power is off, whereas disk storage retains data permanently. File handling bridges the two.",
    hint: "Compare a whiteboard (RAM) with a notebook (disk).",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a file object in Python?",
    shortAnswer: "A file object is an interface that allows your program to read from or write to a file.",
    explanation: "When you call open(), Python returns a file object with methods like read(), write(), close(), etc.",
    hint: "It's like a remote control for interacting with a file.",
    level: "basic",
    codeExample: "f = open('file.txt', 'r')"
  },
  {
    question: "What are the most common file modes in Python?",
    shortAnswer: "r (read), w (write), a (append), and x (exclusive creation).",
    explanation: "Each mode determines how the file is opened and what operations are allowed. 'r' is default.",
    hint: "Which mode would you use to add data without erasing existing content?",
    level: "basic",
    codeExample: "open('file.txt', 'w')  # write (overwrites)"
  },
  {
    question: "What happens if you try to open a file in 'r' mode and it doesn't exist?",
    shortAnswer: "Python raises a FileNotFoundError.",
    explanation: "Reading a non‑existent file is a common error. Always check existence or handle the exception.",
    hint: "Always be prepared for missing files in production code.",
    level: "basic",
    codeExample: "try: open('missing.txt', 'r')\nexcept FileNotFoundError: ..."
  },
  {
    question: "Why is it important to close a file after using it?",
    shortAnswer: "To release system resources and ensure all data is flushed to disk.",
    explanation: "Files hold operating system resources; leaving them open can cause leaks and data loss.",
    hint: "Think of it like closing a book when you're done reading.",
    level: "basic",
    codeExample: "f.close()"
  },
  {
    question: "What is the advantage of using the 'with' statement for file handling?",
    shortAnswer: "It automatically closes the file, even if an exception occurs.",
    explanation: "The context manager guarantees proper cleanup, making code safer and cleaner.",
    hint: "No need to manually call close().",
    level: "intermediate",
    codeExample: "with open('file.txt', 'r') as f: data = f.read()"
  },
  {
    question: "What is a context manager in Python?",
    shortAnswer: "An object that manages resources via the __enter__ and __exit__ methods.",
    explanation: "The 'with' statement invokes these methods, allowing setup and teardown logic.",
    hint: "It's like a safety net for resources.",
    level: "intermediate",
    codeExample: "with open(...) as f:"
  },
  {
    question: "What is the difference between 'w' and 'a' modes?",
    shortAnswer: "'w' overwrites the file, 'a' appends to the end.",
    explanation: "Use 'w' when you want to start fresh; use 'a' when you want to add to an existing file.",
    hint: "'a' stands for append — think adding a note at the bottom.",
    level: "basic",
    codeExample: "open('log.txt', 'a')"
  },
  {
    question: "How do you read a file line by line in Python?",
    shortAnswer: "Use a for loop over the file object or call readline() repeatedly.",
    explanation: "Iterating yields one line at a time, which is memory‑efficient for large files.",
    hint: "for line in file: process(line)",
    level: "intermediate",
    codeExample: "for line in open('file.txt'): print(line)"
  },
  {
    question: "What is the readline() method used for?",
    shortAnswer: "It reads the next line from the file, including the newline character.",
    explanation: "Use it when you need to process a file one line at a time, but you want explicit control.",
    hint: "Returns an empty string when EOF is reached.",
    level: "basic",
    codeExample: "line = file.readline()"
  },
  {
    question: "What does the readlines() method return?",
    shortAnswer: "A list of all lines in the file.",
    explanation: "It reads the entire file into memory. Use for small files only.",
    hint: "List of strings, each representing a line.",
    level: "basic",
    codeExample: "lines = file.readlines()"
  },
  {
    question: "What is the default encoding used by open() in Python?",
    shortAnswer: "It depends on the platform; usually UTF‑8 on modern systems.",
    explanation: "Always specify encoding explicitly (e.g., encoding='utf-8') to avoid platform-dependent behavior.",
    hint: "Never assume — explicitly set it.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r', encoding='utf-8')"
  },
  {
    question: "What is the purpose of the 'x' mode in open()?",
    shortAnswer: "It creates a new file exclusively, failing if the file already exists.",
    explanation: "Useful when you want to avoid accidentally overwriting an existing file.",
    hint: "x = exclusive creation.",
    level: "intermediate",
    codeExample: "open('new.txt', 'x')"
  },
  {
    question: "How can you check if a file exists before opening it?",
    shortAnswer: "Use os.path.exists() or os.path.isfile() from the os module.",
    explanation: "This prevents FileNotFoundError. However, be aware of race conditions in multi-threaded environments.",
    hint: "import os; if os.path.exists('file.txt'): ...",
    level: "intermediate",
    codeExample: "import os; os.path.exists('file.txt')"
  },
  {
    question: "What is the difference between absolute and relative file paths?",
    shortAnswer: "Absolute path starts from the root directory; relative path starts from the current working directory.",
    explanation: "Absolute: '/home/user/data.txt' (Unix). Relative: 'data.txt' or './data.txt'.",
    hint: "Relative paths are shorter and more portable.",
    level: "intermediate",
    codeExample: "open('../data.txt')  # relative"
  },
  {
    question: "What is the current working directory in Python?",
    shortAnswer: "The directory from which your script is executed.",
    explanation: "You can get it with os.getcwd() and change it with os.chdir().",
    hint: "Relative paths are resolved relative to this.",
    level: "intermediate",
    codeExample: "import os; os.getcwd()"
  },
  {
    question: "Why should you handle FileNotFoundError in your code?",
    shortAnswer: "To prevent crashes and provide user‑friendly error messages.",
    explanation: "Graceful handling improves user experience and robustness.",
    hint: "Always anticipate that files may be missing.",
    level: "basic",
    codeExample: "try: ... except FileNotFoundError: ..."
  },
  {
    question: "What is a binary file?",
    shortAnswer: "A file that contains data in a non‑text format, such as images, executables, or custom binary data.",
    explanation: "Binary files require special handling; you open them with 'rb' or 'wb' modes.",
    hint: "Not human‑readable; it's meant for machine consumption.",
    level: "intermediate",
    codeExample: "open('image.png', 'rb')"
  },
  {
    question: "How do you write binary data to a file in Python?",
    shortAnswer: "Open the file in 'wb' mode and write bytes objects.",
    explanation: "Use write() with a bytes-like object. Example: f.write(b'\\x00\\x01')",
    hint: "Convert strings to bytes using encode() if needed.",
    level: "intermediate",
    codeExample: "with open('data.bin', 'wb') as f: f.write(bytes([0,1,2]))"
  },
  {
    question: "What is the purpose of the flush() method?",
    shortAnswer: "It forces the internal buffer to be written to disk immediately.",
    explanation: "Useful when you need to ensure data is saved before continuing.",
    hint: "Think of it as 'save now'.",
    level: "advanced",
    codeExample: "file.flush()"
  },
  {
    question: "What is the tell() method used for in file handling?",
    shortAnswer: "It returns the current position of the file pointer (in bytes).",
    explanation: "Useful for tracking where you are in the file, especially with binary files.",
    hint: "Like a bookmark.",
    level: "advanced",
    codeExample: "pos = file.tell()"
  },
  {
    question: "What does the seek() method do?",
    shortAnswer: "It moves the file pointer to a specified position.",
    explanation: "Allows random access to any part of the file.",
    hint: "Jump to a specific byte position.",
    level: "advanced",
    codeExample: "file.seek(0)  # go to beginning"
  },
  {
    question: "What is the difference between text and binary modes in Python?",
    shortAnswer: "Text mode handles encoding and newline translation; binary mode reads raw bytes.",
    explanation: "Text mode returns strings; binary mode returns bytes.",
    hint: "Use text for human‑readable data, binary for non‑text.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r')  # text; open('file.bin', 'rb') # binary"
  },
  {
    question: "How do you read a CSV file in Python?",
    shortAnswer: "Use the csv module's reader or DictReader.",
    explanation: "CSV is a common data exchange format; Python provides built‑in support.",
    hint: "import csv; with open('data.csv') as f: reader = csv.reader(f)",
    level: "intermediate",
    codeExample: "import csv; reader = csv.reader(open('data.csv'))"
  },
  {
    question: "What is the JSON format and why is it used?",
    shortAnswer: "JSON (JavaScript Object Notation) is a lightweight data interchange format.",
    explanation: "It's human‑readable and widely used for APIs and configuration.",
    hint: "It's like a dictionary written as a string.",
    level: "intermediate",
    codeExample: "import json; data = json.load(open('config.json'))"
  },
  {
    question: "How do you handle large files that don't fit into memory?",
    shortAnswer: "Read and process the file in chunks or line by line.",
    explanation: "Use iterators or read(block_size) to avoid memory exhaustion.",
    hint: "Think of streaming — process one piece at a time.",
    level: "advanced",
    codeExample: "with open('large.log') as f: for line in f: process(line)"
  },
  {
    question: "What is a file descriptor and how is it related to Python's file objects?",
    shortAnswer: "A file descriptor is an integer handle used by the OS to identify an open file. Python's file object wraps it.",
    explanation: "You can get the descriptor via file.fileno(). It's a low‑level concept.",
    hint: "It's the OS‑level reference.",
    level: "advanced",
    codeExample: "fd = file.fileno()"
  },
  {
    question: "How can you ensure a file is written to disk even if the program crashes?",
    shortAnswer: "Use flush() or os.fsync(fd) to force synchronization, but it's not guaranteed in all cases.",
    explanation: "For critical data, use transactional or logging mechanisms.",
    hint: "No absolute guarantee, but proper handling reduces risk.",
    level: "advanced",
    codeExample: "file.flush(); os.fsync(file.fileno())"
  },
  {
    question: "What are some common pitfalls when handling files in multi‑threaded environments?",
    shortAnswer: "Race conditions, deadlocks, and inconsistent reads/writes.",
    explanation: "Use file locks (fcntl or portalocker) or avoid sharing files across threads.",
    hint: "Thread‑safe design is crucial.",
    level: "advanced",
    codeExample: "import fcntl; fcntl.flock(file, fcntl.LOCK_EX)"
  }
];

export default questions;