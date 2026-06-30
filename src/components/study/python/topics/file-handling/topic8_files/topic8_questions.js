// topic8_questions.js
// 30 questions about file modes (moderate to expert)

const questions = [
  {
    question: "What does the 'r' mode do in open()?",
    shortAnswer: "Opens a file for reading; the file must exist.",
    explanation: "It's the default mode; raises FileNotFoundError if the file doesn't exist.",
    hint: "Use it when you only need to read.",
    level: "basic",
    codeExample: "open('file.txt', 'r')"
  },
  {
    question: "What does the 'w' mode do in open()?",
    shortAnswer: "Opens a file for writing; creates or overwrites the file.",
    explanation: "If the file exists, it's truncated (emptied); if not, it's created.",
    hint: "Be careful; it destroys existing data.",
    level: "basic",
    codeExample: "open('file.txt', 'w')"
  },
  {
    question: "What does the 'a' mode do in open()?",
    shortAnswer: "Opens a file for appending; writes are added to the end.",
    explanation: "If the file doesn't exist, it's created. Existing data is preserved.",
    hint: "Ideal for logs and audit trails.",
    level: "basic",
    codeExample: "open('file.txt', 'a')"
  },
  {
    question: "What does the 'x' mode do in open()?",
    shortAnswer: "Exclusive creation; creates a new file, fails if it already exists.",
    explanation: "Raises FileExistsError if the file exists.",
    hint: "Use it to avoid accidental overwrites.",
    level: "intermediate",
    codeExample: "open('new.txt', 'x')"
  },
  {
    question: "What happens if you open a non-existent file with 'r'?",
    shortAnswer: "FileNotFoundError is raised.",
    explanation: "'r' mode requires the file to exist.",
    hint: "Always check existence or use try-except.",
    level: "basic",
    codeExample: "open('missing.txt', 'r')  # raises FileNotFoundError"
  },
  {
    question: "What happens if you open a non-existent file with 'w'?",
    shortAnswer: "A new empty file is created.",
    explanation: "'w' mode creates the file if it doesn't exist.",
    hint: "That's why it's used for writing.",
    level: "basic",
    codeExample: "open('new.txt', 'w')  # creates the file"
  },
  {
    question: "What happens if you open an existing file with 'w'?",
    shortAnswer: "The file is truncated (emptied) before writing.",
    explanation: "All previous content is lost.",
    hint: "Only use 'w' if you want to start fresh.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can you read from a file opened with 'w' mode?",
    shortAnswer: "No, it's write-only; reading raises an error.",
    explanation: "'w' mode does not allow reading.",
    hint: "Use 'r+' or 'w+' if you need both.",
    level: "intermediate",
    codeExample: "f = open('file.txt', 'w'); f.read()  # raises OSError"
  },
  {
    question: "What is the difference between 'w' and 'a' modes?",
    shortAnswer: "'w' overwrites the file; 'a' appends to the end.",
    explanation: "'w' truncates existing content; 'a' preserves it and writes at the end.",
    hint: "One destroys, the other adds.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between 'w' and 'x' modes?",
    shortAnswer: "'w' creates/overwrites; 'x' creates only if it doesn't exist.",
    explanation: "'x' is safer for preventing overwrites.",
    hint: "'x' = exclusive.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why might you choose 'x' over 'w'?",
    shortAnswer: "To avoid accidentally overwriting an existing file.",
    explanation: "'x' fails if the file exists, providing a safety check.",
    hint: "Useful for generating unique files.",
    level: "intermediate",
    codeExample: "open('unique.txt', 'x')"
  },
  {
    question: "What is the initial file pointer position for 'r' mode?",
    shortAnswer: "At the beginning of the file (position 0).",
    explanation: "You start reading from the start.",
    hint: "Use `tell()` to verify.",
    level: "basic",
    codeExample: "f.tell()  # returns 0"
  },
  {
    question: "What is the initial file pointer position for 'a' mode?",
    shortAnswer: "At the end of the file for each write, but for reading (if using 'a+'), it's at the start.",
    explanation: "'a' mode writes at the end; the pointer is at the end for writes.",
    hint: "Appends happen at the end.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you read from a file opened with 'a'?",
    shortAnswer: "No, 'a' is write-only by default.",
    explanation: "Use 'a+' if you need to read and append.",
    hint: "Add '+' for read+append.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the default mode if you don't specify one?",
    shortAnswer: "'r' (read text).",
    explanation: "It assumes you want to read a text file.",
    hint: "So `open('file.txt')` is equivalent to `open('file.txt', 'r')`.",
    level: "basic",
    codeExample: "open('file.txt')  # same as 'r'"
  },
  {
    question: "How do you open a file for both reading and writing without truncating?",
    shortAnswer: "Use mode 'r+'.",
    explanation: "It opens for read and write, preserving existing content.",
    hint: "The file must exist.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r+')"
  },
  {
    question: "How do you open a file for both reading and writing with truncation?",
    shortAnswer: "Use mode 'w+'.",
    explanation: "It truncates the file and allows reading and writing.",
    hint: "Like 'w' but with read capability.",
    level: "intermediate",
    codeExample: "open('file.txt', 'w+')"
  },
  {
    question: "What happens if you open a file in 'x' mode and the file exists?",
    shortAnswer: "FileExistsError is raised.",
    explanation: "That's the intended behavior: fail if the file already exists.",
    hint: "Handle the exception to avoid crashes.",
    level: "intermediate",
    codeExample: "try: open('file.txt', 'x'); except FileExistsError: ..."
  },
  {
    question: "Can you write to a file opened in 'r' mode?",
    shortAnswer: "No, it's read-only; writing raises an error.",
    explanation: "'r' mode does not allow writing.",
    hint: "Use 'r+' or 'w' for writing.",
    level: "basic",
    codeExample: "f = open('file.txt', 'r'); f.write('text')  # raises OSError"
  },
  {
    question: "Why does 'a' mode not allow reading?",
    shortAnswer: "It's designed for appending only; you can add '+' to enable reading.",
    explanation: "'a' is append-only by design.",
    hint: "Use 'a+' for read+append.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the difference between 'a' and 'a+' modes?",
    shortAnswer: "'a' is write-only; 'a+' allows both reading and appending.",
    explanation: "'a+' opens for reading and appending; the file pointer is at the end for writes.",
    hint: "'+' adds read capability.",
    level: "intermediate",
    codeExample: "open('file.txt', 'a+')"
  },
  {
    question: "Can you use 'x' with binary mode?",
    shortAnswer: "Yes, combine with 'b': 'xb'.",
    explanation: "Works for binary exclusive creation.",
    hint: "Example: `open('image.bin', 'xb')`.",
    level: "intermediate",
    codeExample: "open('binary.bin', 'xb')"
  },
  {
    question: "What happens if you try to open a file with 'x' in a directory that doesn't exist?",
    shortAnswer: "FileNotFoundError is raised because the directory doesn't exist.",
    explanation: "'x' only creates the file, not the directory.",
    hint: "Ensure the directory exists first.",
    level: "advanced",
    codeExample: "open('nonexistent_dir/file.txt', 'x')  # FileNotFoundError"
  },
  {
    question: "How do you check if a file exists before opening with 'r'?",
    shortAnswer: "Use `os.path.exists(filename)` or `os.path.isfile(filename)`.",
    explanation: "Avoid FileNotFoundError by checking beforehand.",
    hint: "But beware of race conditions; try-except is safer.",
    level: "intermediate",
    codeExample: "import os; if os.path.exists('file.txt'): open('file.txt', 'r')"
  },
  {
    question: "Why might you use 'w' instead of 'a' for a log file?",
    shortAnswer: "You wouldn't; 'a' is better for logs to preserve history.",
    explanation: "'w' would erase previous logs, which is usually undesirable.",
    hint: "Always choose 'a' for logs.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the purpose of the 'x' mode in automated scripts?",
    shortAnswer: "To prevent overwriting files that may have been created by a previous run.",
    explanation: "It's a safety mechanism to avoid data loss.",
    hint: "Useful for batch processing.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can 'x' mode be used to create a file in a shared network drive?",
    shortAnswer: "Yes, but the same file‑existence check applies; it works over network file systems.",
    explanation: "FileExistsError is still raised if the file exists on the network.",
    hint: "Network latency may affect the check.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the difference between 'r+' and 'w+' modes regarding existing content?",
    shortAnswer: "'r+' preserves existing content; 'w+' truncates it.",
    explanation: "Choose 'r+' if you want to modify in place, 'w+' if you want to start fresh.",
    hint: "One keeps, the other erases.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you open a file for appending and reading in binary mode?",
    shortAnswer: "Use mode 'ab+'.",
    explanation: "Combines binary, append, and read.",
    hint: "Example: `open('data.bin', 'ab+')`.",
    level: "advanced",
    codeExample: "open('data.bin', 'ab+')"
  },
  {
    question: "What is the best mode for a configuration file that should only be read?",
    shortAnswer: "'r' (read).",
    explanation: "Config files are typically read-only; use 'r' to prevent accidental writes.",
    hint: "Protect config from being modified by the program.",
    level: "basic",
    codeExample: "open('config.ini', 'r')"
  }
];

export default questions;