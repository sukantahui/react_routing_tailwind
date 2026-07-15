// topic3_questions.js
// 30 questions comparing text and binary files (moderate to expert)

const questions = [
  {
    question: "What is the essential difference between a text file and a binary file?",
    shortAnswer: "A text file's bytes are interpreted as characters via an encoding; a binary file's bytes are used as raw data.",
    explanation: "The same file can be opened either way; the difference is in how the application treats the bytes.",
    hint: "It's all about interpretation.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Can a binary file be opened as text without errors?",
    shortAnswer: "Sometimes, but often you'll get encoding errors or garbled output.",
    explanation: "If the bytes happen to be valid UTF‑8, it may work, but that's not guaranteed.",
    hint: "Many binary files contain non‑printable bytes.",
    level: "intermediate",
    codeExample: "open('image.jpg', 'r')  # may raise UnicodeDecodeError"
  },
  {
    question: "Why is UTF‑8 the most common encoding for text files?",
    shortAnswer: "It's backward‑compatible with ASCII and can encode all Unicode characters efficiently.",
    explanation: "UTF‑8 is the de facto standard for the web and modern computing.",
    hint: "It balances compactness and universality.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What happens if you open a binary file in text mode and write a string?",
    shortAnswer: "The string will be encoded using the default encoding, potentially corrupting binary data.",
    explanation: "You should never write strings to a binary file; use bytes instead.",
    hint: "You'll get TypeError if you try to write a string without encoding.",
    level: "intermediate",
    codeExample: "open('f.bin', 'w').write('hello')  # may fail or corrupt"
  },
  {
    question: "How do you read a binary file and get integers?",
    shortAnswer: "Use `struct.unpack` or `int.from_bytes` to interpret bytes as numbers.",
    explanation: "You need to know the byte order and size of each integer.",
    hint: "Specify endianness (little/big).",
    level: "advanced",
    codeExample: "struct.unpack('i', data[:4])"
  },
  {
    question: "Why are binary files generally smaller than text files for numeric data?",
    shortAnswer: "Numbers are stored in fixed‑width binary representation (e.g., 4 bytes) instead of variable‑length decimal strings.",
    explanation: "For example, 1234567890 takes 10 bytes as text but only 4 bytes as a 32‑bit integer.",
    hint: "Text wastes space for numbers.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is the performance overhead of text files?",
    shortAnswer: "Encoding/decoding and string manipulation add CPU time.",
    explanation: "Binary I/O is faster because it avoids these conversions.",
    hint: "Think about converting numbers to strings and back.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "When would you prefer a text file over a binary file?",
    shortAnswer: "When human readability, manual editing, or cross‑platform compatibility are important.",
    explanation: "Text formats like JSON, CSV, and XML are universally supported.",
    hint: "Logs and configuration files are good examples.",
    level: "basic",
    codeExample: null
  },
  {
    question: "When would you prefer a binary file over a text file?",
    shortAnswer: "When performance, compactness, or storing non‑textual data is required.",
    explanation: "Images, videos, executables, and large numeric arrays are best in binary.",
    hint: "Any time you don't need to read it with a text editor.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a 'newline' and how does it differ between OS?",
    shortAnswer: "It's a character (or sequence) marking the end of a line: \\n (Unix), \\r\\n (Windows), \\r (old Mac).",
    explanation: "Python translates newlines by default in text mode, but you can disable it.",
    hint: "This can cause cross‑platform issues if not handled.",
    level: "intermediate",
    codeExample: "open('f.txt', 'r', newline='')"
  },
  {
    question: "How does Python decide the default encoding for text files?",
    shortAnswer: "It uses `locale.getpreferredencoding()`, which is platform‑dependent.",
    explanation: "On modern systems, it's usually UTF‑8, but it's not guaranteed.",
    hint: "That's why you should always specify encoding explicitly.",
    level: "intermediate",
    codeExample: "import locale; locale.getpreferredencoding()"
  },
  {
    question: "What is the `errors` parameter in `open()` for text files?",
    shortAnswer: "It controls how encoding/decoding errors are handled (e.g., 'strict', 'ignore', 'replace').",
    explanation: "Use it to avoid crashing on unexpected bytes.",
    hint: "Try 'replace' to show � for invalid characters.",
    level: "intermediate",
    codeExample: "open('f.txt', 'r', errors='replace')"
  },
  {
    question: "Can you convert a binary file to text without losing data?",
    shortAnswer: "Only if the binary data consists of valid characters for the chosen encoding.",
    explanation: "Most binary files contain bytes that are not printable; converting would corrupt them.",
    hint: "You can use base64 encoding, but that expands the size.",
    level: "advanced",
    codeExample: "import base64; base64.b64encode(data)"
  },
  {
    question: "What is the `bytearray` type and when is it useful?",
    shortAnswer: "A mutable sequence of bytes; useful for modifying binary data in place.",
    explanation: "It's more memory‑efficient than a list of ints and faster for byte manipulation.",
    hint: "Like a list of integers 0‑255.",
    level: "advanced",
    codeExample: "ba = bytearray(b'hello'); ba[0]=72"
  },
  {
    question: "Why is JSON considered a text format?",
    shortAnswer: "It consists entirely of printable Unicode characters and is designed to be human‑readable.",
    explanation: "JSON is a text‑based data interchange format, not a binary one.",
    hint: "You can open a .json file in any text editor.",
    level: "basic",
    codeExample: "import json; json.dump(data, f)"
  },
  {
    question: "What is the `pickle` module in Python and how does it compare to JSON?",
    shortAnswer: "Pickle is a binary serialization format for Python objects; JSON is text‑based and language‑agnostic.",
    explanation: "Pickle can serialize any Python object but is not safe for untrusted data.",
    hint: "Pickle is faster but less portable.",
    level: "advanced",
    codeExample: "pickle.dump(obj, open('data.pkl', 'wb'))"
  },
  {
    question: "What are 'magic bytes' and how do they help identify file types?",
    shortAnswer: "Magic bytes are fixed byte sequences at the start of a file that indicate its format.",
    explanation: "For example, PDF files start with '%PDF', JPEG with 'FF D8'.",
    hint: "They are used by file command in Unix.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Can you open a binary file and read it as a string using `decode()`?",
    shortAnswer: "Yes, if you decode it with the correct encoding; otherwise, you'll get an error.",
    explanation: "You must know the encoding used to write the data.",
    hint: "If it's not text, `decode()` will likely fail.",
    level: "intermediate",
    codeExample: "data.decode('utf-8')"
  },
  {
    question: "What is the advantage of using `csv.DictReader` over manual splitting?",
    shortAnswer: "It handles quoting, escaping, and headers automatically.",
    explanation: "Manual splitting can break on commas inside quoted fields.",
    hint: "Always use the CSV module for CSV files.",
    level: "intermediate",
    codeExample: "import csv; reader = csv.DictReader(f)"
  },
  {
    question: "How does the `struct` module help with binary files?",
    shortAnswer: "It packs and unpacks C‑style structs to/from bytes, allowing reading/writing binary data layouts.",
    explanation: "It's essential for working with many file formats and network protocols.",
    hint: "Specify format strings like 'iif' for int, int, float.",
    level: "advanced",
    codeExample: "struct.unpack('i', data)"
  },
  {
    question: "What are the pitfalls of using `read()` without arguments on a large binary file?",
    shortAnswer: "It loads the entire file into memory, which can crash the program if the file is huge.",
    explanation: "Always use `read(size)` or iterate in chunks.",
    hint: "Memory is not infinite.",
    level: "intermediate",
    codeExample: "with open('big.bin', 'rb') as f: while chunk := f.read(1024*1024): process(chunk)"
  },
  {
    question: "Why might a text file be preferred for data exchange between different programming languages?",
    shortAnswer: "Because text formats are language‑agnostic and have standard parsers.",
    explanation: "Binary formats often have language‑specific serialization (like pickle).",
    hint: "JSON, XML, and CSV are universal.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What is `os.linesep` and how is it used?",
    shortAnswer: "It's the platform‑specific newline string ('\\n' or '\\r\\n').",
    explanation: "Use it when you need to write newlines manually in a cross‑platform way.",
    hint: "But usually let Python handle it.",
    level: "intermediate",
    codeExample: "import os; os.linesep"
  },
  {
    question: "How can you determine a file's encoding programmatically?",
    shortAnswer: "You can't with absolute certainty; you can use heuristic libraries like `chardet`.",
    explanation: "Most files don't store encoding metadata.",
    hint: "When in doubt, assume UTF‑8 and handle errors.",
    level: "advanced",
    codeExample: "import chardet; chardet.detect(open('f.txt', 'rb').read())"
  },
  {
    question: "What is the impact of using `io.TextIOWrapper`?",
    shortAnswer: "It wraps a binary stream and provides text I/O with encoding.",
    explanation: "It's used internally by `open()` in text mode.",
    hint: "You can use it to add encoding to an existing binary stream.",
    level: "advanced",
    codeExample: "import io; text_wrapper = io.TextIOWrapper(binary_stream, encoding='utf-8')"
  },
  {
    question: "Why is it dangerous to use `eval()` on data read from a text file?",
    shortAnswer: "It can execute arbitrary code if the file contains malicious Python expressions.",
    explanation: "Use `json.loads()` or `ast.literal_eval()` for safe evaluation.",
    hint: "Never trust external input.",
    level: "advanced",
    codeExample: "import ast; ast.literal_eval(data)"
  },
  {
    question: "How do you write a list of integers to a binary file efficiently?",
    shortAnswer: "Use `array.array('i', list).tofile(file)` or `struct.pack` with a format string.",
    explanation: "This writes the raw memory representation, which is fast and compact.",
    hint: "The `array` module is very efficient.",
    level: "advanced",
    codeExample: "from array import array; array('i', [1,2,3]).tofile(f)"
  },
  {
    question: "What is the difference between `bytes` and `bytearray` when reading binary files?",
    shortAnswer: "`read()` returns `bytes` (immutable); you can use `bytearray` for mutable data.",
    explanation: "If you need to modify the data, read into a `bytearray`.",
    hint: "`bytearray` is like a list that can be changed.",
    level: "advanced",
    codeExample: "data = bytearray(f.read())"
  },
  {
    question: "Why do some file formats have both text and binary variants?",
    shortAnswer: "To offer a trade‑off between human readability and efficiency.",
    explanation: "Examples: CSV (text) vs Excel binary (.xls), JSON vs MessagePack.",
    hint: "Choose based on your priorities.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you handle files that may contain a mix of text and binary data?",
    shortAnswer: "Open in binary mode and parse the structure yourself.",
    explanation: "Many formats (like PDF) have a mix; you need a custom parser.",
    hint: "You can't rely on simple text methods.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "What is the role of the `newline` parameter in `open()` for text files?",
    shortAnswer: "It controls how newlines are translated when reading and writing.",
    explanation: "Use `newline=''` to disable translation for exact control.",
    hint: "Important for cross‑platform compatibility.",
    level: "advanced",
    codeExample: "open('f.csv', 'r', newline='')"
  }
];

export default questions;