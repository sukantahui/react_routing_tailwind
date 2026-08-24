// topic10_questions.js
// 30 questions about binary file modes (moderate to expert)

const questions = [
  {
    question: "What is the difference between 'r' and 'rb' modes?",
    shortAnswer: "'r' reads as text (strings), 'rb' reads as binary (bytes).",
    explanation: "Text mode applies encoding/decoding; binary mode returns raw bytes.",
    hint: "One gives strings, the other gives bytes.",
    level: "intermediate",
    codeExample: "open('file.txt', 'r') vs open('file.bin', 'rb')"
  },
  {
    question: "What does 'wb' mode do?",
    shortAnswer: "Opens a file for writing in binary mode; creates or overwrites.",
    explanation: "It writes bytes; the file is truncated if it exists.",
    hint: "Like 'w' but for bytes.",
    level: "intermediate",
    codeExample: "open('file.bin', 'wb')"
  },
  {
    question: "What does 'ab' mode do?",
    shortAnswer: "Opens a file for appending in binary mode; creates if missing.",
    explanation: "Writes are added to the end of the file.",
    hint: "Like 'a' but for bytes.",
    level: "intermediate",
    codeExample: "open('log.bin', 'ab')"
  },
  {
    question: "What is the data type returned by reading a binary file?",
    shortAnswer: "bytes.",
    explanation: "Binary mode returns bytes objects, not strings.",
    hint: "Use `type(f.read())` to check.",
    level: "basic",
    codeExample: "data = f.read(); type(data)  # bytes"
  },
  {
    question: "Can you write a string to a file opened in 'wb' mode?",
    shortAnswer: "No, you must write bytes. Convert strings with `.encode()`.",
    explanation: "Binary mode expects bytes-like objects.",
    hint: "Use `f.write('text'.encode())`.",
    level: "intermediate",
    codeExample: "f.write(b'bytes')  # OK; f.write('text')  # TypeError"
  },
  {
    question: "What is the purpose of 'rb+' mode?",
    shortAnswer: "Opens a binary file for reading and writing without truncation.",
    explanation: "The file must exist; you can read and write at any position.",
    hint: "Like 'r+' but for bytes.",
    level: "advanced",
    codeExample: "open('file.bin', 'rb+')"
  },
  {
    question: "What is the purpose of 'wb+' mode?",
    shortAnswer: "Opens a binary file for writing and reading; truncates.",
    explanation: "Creates a new file or overwrites; allows reading what was written.",
    hint: "Like 'w+' but for bytes.",
    level: "advanced",
    codeExample: "open('file.bin', 'wb+')"
  },
  {
    question: "What is the purpose of 'ab+' mode?",
    shortAnswer: "Opens a binary file for appending and reading.",
    explanation: "Writes are always at the end; reads start at the beginning.",
    hint: "Like 'a+' but for bytes.",
    level: "advanced",
    codeExample: "open('log.bin', 'ab+')"
  },
  {
    question: "Why do you get a TypeError when writing a string to a binary file?",
    shortAnswer: "Because binary mode expects bytes, not strings.",
    explanation: "You must encode strings to bytes before writing.",
    hint: "Use `.encode()`.",
    level: "basic",
    codeExample: "f.write('text')  # TypeError; f.write(b'text')  # OK"
  },
  {
    question: "What happens if you open a non-existent file with 'rb'?",
    shortAnswer: "FileNotFoundError is raised.",
    explanation: "Like 'r', 'rb' requires the file to exist.",
    hint: "Check existence before reading.",
    level: "intermediate",
    codeExample: "open('missing.bin', 'rb')  # FileNotFoundError"
  },
  {
    question: "What happens if you open a non-existent file with 'wb'?",
    shortAnswer: "A new empty file is created.",
    explanation: "Like 'w', 'wb' creates the file if it doesn't exist.",
    hint: "It's for writing.",
    level: "intermediate",
    codeExample: "open('new.bin', 'wb')  # creates"
  },
  {
    question: "What is the `struct` module used for in binary I/O?",
    shortAnswer: "To pack/unpack Python data to/from binary representations.",
    explanation: "It's essential for reading/writing structured binary formats.",
    hint: "Use for integers, floats, and custom binary layouts.",
    level: "advanced",
    codeExample: "struct.pack('i', 42)"
  },
  {
    question: "How do you convert bytes to a string in Python?",
    shortAnswer: "Use the `.decode()` method with the appropriate encoding.",
    explanation: "Example: `b'hello'.decode('utf-8')`.",
    hint: "The opposite of `.encode()`.",
    level: "basic",
    codeExample: "b'hello'.decode('utf-8')  # 'hello'"
  },
  {
    question: "How do you convert a string to bytes in Python?",
    shortAnswer: "Use the `.encode()` method with the appropriate encoding.",
    explanation: "Example: `'hello'.encode('utf-8')`.",
    hint: "The opposite of `.decode()`.",
    level: "basic",
    codeExample: "'hello'.encode('utf-8')  # b'hello'"
  },
  {
    question: "Why should you use binary mode for image files?",
    shortAnswer: "Images contain non‑text data that would be corrupted by text encoding.",
    explanation: "Opening an image in text mode would try to decode the bytes as characters, causing corruption.",
    hint: "Always use 'rb' for images.",
    level: "basic",
    codeExample: "open('image.jpg', 'rb')"
  },
  {
    question: "What is the default encoding for `bytes.decode()`?",
    shortAnswer: "UTF‑8.",
    explanation: "The default is UTF‑8, but you should specify it explicitly.",
    hint: "Always specify `encoding='utf-8'`.",
    level: "intermediate",
    codeExample: "b'hello'.decode('utf-8')"
  },
  {
    question: "Can you use `seek()` on a binary file?",
    shortAnswer: "Yes, `seek()` works in binary mode and is more predictable than in text mode.",
    explanation: "Binary mode works with byte offsets, which are easier to handle.",
    hint: "Use `seek(0)` to go to the start.",
    level: "intermediate",
    codeExample: "f.seek(10)  # move 10 bytes from start"
  },
  {
    question: "What is a `bytearray` and how is it different from `bytes`?",
    shortAnswer: "`bytearray` is mutable; `bytes` is immutable.",
    explanation: "Use `bytearray` when you need to modify binary data in place.",
    hint: "Like a list of bytes you can change.",
    level: "advanced",
    codeExample: "ba = bytearray(b'hello'); ba[0] = 72"
  },
  {
    question: "Why do binary files often have a smaller size than text files for the same data?",
    shortAnswer: "Binary files store data in compact raw bytes; text files add encoding overhead.",
    explanation: "Numbers are stored as binary integers (4 bytes) instead of decimal strings (up to 10 bytes).",
    hint: "Efficiency is the key.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the purpose of `memoryview` with binary files?",
    shortAnswer: "It provides a zero‑copy view of bytes, avoiding unnecessary copying.",
    explanation: "Useful for large binary data where performance matters.",
    hint: "It's like a pointer to the data.",
    level: "advanced",
    codeExample: "mv = memoryview(data)"
  },
  {
    question: "How do you read a binary file in chunks to avoid memory issues?",
    shortAnswer: "Use `f.read(chunk_size)` in a loop.",
    explanation: "Reading a large file all at once can exhaust memory.",
    hint: "Process 1MB at a time.",
    level: "intermediate",
    codeExample: "while chunk := f.read(1024*1024): process(chunk)"
  },
  {
    question: "Can you open a binary file in text mode and read it as characters?",
    shortAnswer: "It may work if the bytes are valid UTF‑8, but it's not recommended.",
    explanation: "Binary files often contain non‑UTF‑8 bytes, causing UnicodeDecodeError.",
    hint: "Always use binary mode for binary files.",
    level: "intermediate",
    codeExample: "open('image.jpg', 'r')  # bad practice"
  },
  {
    question: "What is the difference between 'ab' and 'ab+' modes?",
    shortAnswer: "'ab' is write‑only (append); 'ab+' allows reading as well.",
    explanation: "'ab+' adds read capability to appending.",
    hint: "'+' adds read.",
    level: "advanced",
    codeExample: "open('log.bin', 'ab') vs open('log.bin', 'ab+')"
  },
  {
    question: "How do you copy a binary file in Python?",
    shortAnswer: "Open source in 'rb', destination in 'wb', read and write chunks.",
    explanation: "Use `shutil.copyfile()` for simplicity, or manual chunk copying.",
    hint: "`shutil.copyfile(src, dst)` is the easiest.",
    level: "intermediate",
    codeExample: "shutil.copyfile('src.bin', 'dst.bin')"
  },
  {
    question: "What is the file signature (magic number) of a binary file?",
    shortAnswer: "A unique byte sequence at the start of a file that identifies its format.",
    explanation: "For example, JPEG starts with `FF D8`, PDF with `25 50 44 46`.",
    hint: "Used by `file` command on Unix.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How can you check if a file is binary or text programmatically?",
    shortAnswer: "Read a sample and look for null bytes or non‑printable characters.",
    explanation: "If it contains `\\x00`, it's likely binary.",
    hint: "Use a heuristic.",
    level: "advanced",
    codeExample: "if b'\\x00' in data: print('Binary')"
  },
  {
    question: "Why is `pickle` data stored as binary?",
    shortAnswer: "Pickle serializes Python objects to a compact binary format.",
    explanation: "Binary is more efficient and can represent complex structures.",
    hint: "It's Python‑specific binary serialization.",
    level: "intermediate",
    codeExample: "pickle.dump(obj, open('data.pkl', 'wb'))"
  },
  {
    question: "What is the `array` module used for with binary files?",
    shortAnswer: "To efficiently store arrays of numeric types in binary format.",
    explanation: "It writes the raw memory representation of numbers.",
    hint: "Use `array('i', [1,2,3]).tofile(f)`.",
    level: "advanced",
    codeExample: "from array import array; array('i', [1,2,3]).tofile(f)"
  },
  {
    question: "How do you read a binary file and interpret it as integers?",
    shortAnswer: "Use `struct.unpack` or `int.from_bytes`.",
    explanation: "You need to know the byte order and data size.",
    hint: "Use `struct.unpack('i', data)` for a 4‑byte integer.",
    level: "advanced",
    codeExample: "struct.unpack('i', data[:4])"
  },
  {
    question: "What is the maximum file size you can read with `f.read()`?",
    shortAnswer: "It's limited by available memory; `f.read()` loads the entire file into memory.",
    explanation: "For large files, use chunked reading.",
    hint: "Avoid for files larger than available RAM.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you append to a binary file opened in 'rb+' mode?",
    shortAnswer: "Yes, by seeking to the end with `f.seek(0, 2)`.",
    explanation: "You can seek to any position and write.",
    hint: "Use `f.seek(0, 2)` to go to the end.",
    level: "advanced",
    codeExample: "f.seek(0, 2); f.write(b'extra')"
  }
];

export default questions;