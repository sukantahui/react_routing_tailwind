// topic13_questions.js
// 30 questions about read() (moderate to expert)

const questions = [
  {
    question: "What does the read() method do?",
    shortAnswer: "Reads the contents of a file from the current position to EOF.",
    explanation: "It returns a string (text mode) or bytes (binary mode) containing the file data.",
    hint: "It's the simplest way to read a file.",
    level: "basic",
    codeExample: "content = f.read()"
  },
  {
    question: "What does read() return when it reaches EOF?",
    shortAnswer: "An empty string '' in text mode or empty bytes b'' in binary mode.",
    explanation: "This is how you detect the end of the file.",
    hint: "Use `if not data: break` to stop.",
    level: "basic",
    codeExample: "data = f.read(); if not data: # EOF"
  },
  {
    question: "What happens if you call read() on an empty file?",
    shortAnswer: "It returns an empty string or empty bytes.",
    explanation: "It's not an error; it's a valid read operation.",
    hint: "The result is falsy.",
    level: "basic",
    codeExample: "content = f.read(); # content is '' "
  },
  {
    question: "What is the purpose of the `size` parameter in read(size)?",
    shortAnswer: "It limits the number of characters/bytes to read.",
    explanation: "If `size` is negative or omitted, it reads the entire file.",
    hint: "Useful for reading in chunks.",
    level: "intermediate",
    codeExample: "chunk = f.read(1024)"
  },
  {
    question: "Is it safe to use read() without arguments on a large file?",
    shortAnswer: "No, it may cause memory issues.",
    explanation: "It loads the entire file into memory; use chunks for large files.",
    hint: "Only for small files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the return type of read() in text mode?",
    shortAnswer: "str (string).",
    explanation: "It returns a Unicode string after decoding.",
    hint: "Use `.decode()` if you need bytes.",
    level: "basic",
    codeExample: "type(f.read())  # str"
  },
  {
    question: "What is the return type of read() in binary mode?",
    shortAnswer: "bytes.",
    explanation: "It returns raw bytes without decoding.",
    hint: "Use `.decode()` to convert to string.",
    level: "basic",
    codeExample: "type(f.read())  # bytes"
  },
  {
    question: "Can you use read() on a file opened in 'w' mode?",
    shortAnswer: "No, it raises an error.",
    explanation: "'w' mode is write-only; use 'r' or 'r+' for reading.",
    hint: "Open in the right mode.",
    level: "basic",
    codeExample: "f = open('f.txt','w'); f.read()  # OSError"
  },
  {
    question: "How do you read a text file and preserve newlines?",
    shortAnswer: "read() preserves all characters, including newlines.",
    explanation: "Newlines are included in the returned string.",
    hint: "It's all in one string.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the difference between read() and readlines()?",
    shortAnswer: "read() returns a single string; readlines() returns a list of lines.",
    explanation: "read() gives all content in one object; readlines() splits by newline.",
    hint: "One returns a string, the other a list.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you read a file in chunks using read()?",
    shortAnswer: "Call read(size) repeatedly in a loop until it returns empty.",
    explanation: "This is the memory‑efficient way to handle large files.",
    hint: "`while True: chunk = f.read(4096); if not chunk: break`",
    level: "intermediate",
    codeExample: "while chunk := f.read(4096): process(chunk)"
  },
  {
    question: "What is a typical chunk size for reading files?",
    shortAnswer: "4KB, 8KB, or 16KB are common choices.",
    explanation: "Power‑of‑two sizes align with disk blocks and OS caches.",
    hint: "Experiment to find the best for your system.",
    level: "intermediate",
    codeExample: "chunk_size = 8192"
  },
  {
    question: "Does read() move the file pointer?",
    shortAnswer: "Yes, it advances the pointer by the number of bytes/characters read.",
    explanation: "The pointer moves to the new position after reading.",
    hint: "Use tell() to check.",
    level: "intermediate",
    codeExample: "pos = f.tell()"
  },
  {
    question: "What is the relationship between read() and the file pointer?",
    shortAnswer: "read() reads from the current pointer position and advances it.",
    explanation: "If you seek to a position, read() starts from there.",
    hint: "You can seek to re-read.",
    level: "intermediate",
    codeExample: "f.seek(0); data = f.read()"
  },
  {
    question: "How do you read a file in binary mode and interpret it as integers?",
    shortAnswer: "Read bytes and use `struct.unpack` or `int.from_bytes`.",
    explanation: "Binary data needs to be parsed according to its format.",
    hint: "Use `struct` module.",
    level: "advanced",
    codeExample: "data = f.read(4); value = int.from_bytes(data, 'little')"
  },
  {
    question: "Why does reading a text file with read() sometimes raise UnicodeDecodeError?",
    shortAnswer: "Because the file contains bytes that don't match the specified encoding.",
    explanation: "Always specify the correct encoding or open in binary mode.",
    hint: "Use `encoding='utf-8'` or open with 'rb'.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r', encoding='utf-8')"
  },
  {
    question: "Can read() be used on a file that was opened with 'a' mode?",
    shortAnswer: "No, 'a' is write‑only; use 'a+' for reading and appending.",
    explanation: "'a' mode does not allow reading.",
    hint: "Add '+' to enable reading.",
    level: "intermediate",
    codeExample: "open('f.txt', 'a+')"
  },
  {
    question: "What is the maximum size of data read() can handle?",
    shortAnswer: "It's limited by available memory; no hard limit.",
    explanation: "Reading a huge file can cause MemoryError.",
    hint: "Use chunks for large files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does read() handle Windows vs Unix newlines?",
    shortAnswer: "In text mode, Python translates newlines to '\\n' by default.",
    explanation: "In binary mode, newlines are preserved as raw bytes.",
    hint: "Text mode normalizes newlines.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the benefit of using read() over iteration?",
    shortAnswer: "read() gives you the entire content as a single object for easy processing.",
    explanation: "If you need the whole file as a string, read() is simpler.",
    hint: "For small files, read() is convenient.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you use read() with a file-like object from requests or StringIO?",
    shortAnswer: "Yes, any file-like object that supports read() works.",
    explanation: "Requests response objects and io.StringIO support read().",
    hint: "It's a generic interface.",
    level: "advanced",
    codeExample: "response.read()"
  },
  {
    question: "What is the difference between read() and readlines() in terms of memory?",
    shortAnswer: "read() loads the whole file as one string; readlines() loads as a list of strings.",
    explanation: "Both can use similar memory; readlines() adds list overhead.",
    hint: "For line‑wise processing, iteration is better.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you read a file partially from a specific position?",
    shortAnswer: "Use seek() to move the pointer, then read().",
    explanation: "Example: `f.seek(100); data = f.read(50)`.",
    hint: "Combine seek() and read(size).",
    level: "advanced",
    codeExample: "f.seek(100); f.read(50)"
  },
  {
    question: "What happens if you call read() on a file that was closed?",
    shortAnswer: "ValueError: I/O operation on closed file.",
    explanation: "A closed file object cannot be read from.",
    hint: "Always check or use `with`.",
    level: "basic",
    codeExample: "f.close(); f.read()  # ValueError"
  },
  {
    question: "Is there a way to read a file without loading it into memory?",
    shortAnswer: "Yes, by reading in chunks with read(size).",
    explanation: "This processes the file incrementally.",
    hint: "Use read(size) in a loop.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does read() handle large text files with encodings like UTF‑8?",
    shortAnswer: "It decodes the bytes using the specified encoding, which may take time.",
    explanation: "Binary mode is faster for large files if you don't need string processing.",
    hint: "Consider memory and speed trade‑offs.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the difference between `f.read()` and `f.read(-1)`?",
    shortAnswer: "They are equivalent; a negative size means read until EOF.",
    explanation: "Both read the entire file.",
    hint: "Use `f.read()` for clarity.",
    level: "basic",
    codeExample: null
  },
  {
    question: "How can you use read() to read a file and split it into lines?",
    shortAnswer: "Read the entire file, then split on newline: `content.splitlines()`.",
    explanation: "This gives a list of lines.",
    hint: "Works for small files.",
    level: "intermediate",
    codeExample: "lines = f.read().splitlines()"
  },
  {
    question: "What is the typical performance of read() compared to other methods?",
    shortAnswer: "read() is very fast for small files; for large files, chunked reading is comparable.",
    explanation: "The main bottleneck is I/O, not the method itself.",
    hint: "Choose based on memory, not speed.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Can you use read() to read a file and update it in-place?",
    shortAnswer: "No, read() only reads; you need 'r+' or separate write operations for in‑place updates.",
    explanation: "Use 'r+' to read and write.",
    hint: "Combine with seek() and write().",
    level: "advanced",
    codeExample: null
  }
];

export default questions;