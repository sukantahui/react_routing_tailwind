// topic2_questions.js
// 30 questions about types of files (moderate to expert)

const questions = [
  {
    question: "What are the two main types of files in Python?",
    shortAnswer: "Text files and binary files.",
    explanation: "Text files store characters (human-readable), while binary files store raw bytes (machine-readable).",
    hint: "One you can read in Notepad, the other you can't.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is a character encoding and why is it important for text files?",
    shortAnswer: "An encoding maps characters to numbers; it's required to interpret text files correctly.",
    explanation: "Without knowing the encoding, the same bytes could produce different characters. UTF-8 is the modern standard.",
    hint: "Different languages need different mappings.",
    level: "intermediate",
    codeExample: "open('file.txt', encoding='utf-8')"
  },
  {
    question: "Can a binary file contain text?",
    shortAnswer: "Yes, but it's not guaranteed; the bytes might represent a mix of data types.",
    explanation: "A binary file could have some ASCII characters embedded (e.g., a file header), but it's not purely text.",
    hint: "Think of a Word document: it contains text but also formatting metadata.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why do we use binary files for images?",
    shortAnswer: "Images require efficient storage of pixel data; text representation would be huge and slow.",
    explanation: "Binary formats store raw pixel values directly, while text would require converting numbers to strings, wasting space and speed.",
    hint: "Compare a .jpg size with a .txt description of an image.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the default mode when you open a file in Python?",
    shortAnswer: "Text mode ('r' for reading text).",
    explanation: "open(filename) is equivalent to open(filename, 'r', encoding=...).",
    hint: "You need to specify 'b' to get binary mode.",
    level: "basic",
    codeExample: "open('file.txt')  # text"
  },
  {
    question: "What is the difference between 'r' and 'rb' modes?",
    shortAnswer: "'r' reads as text (returns str), 'rb' reads as binary (returns bytes).",
    explanation: "Text mode applies encoding/decoding; binary mode does not.",
    hint: "One gives you strings, the other gives you bytes.",
    level: "basic",
    codeExample: "open('f.txt', 'r') vs open('f.bin', 'rb')"
  },
  {
    question: "How can you tell if a file is text or binary without opening it?",
    shortAnswer: "You often can't be 100% sure without reading it, but heuristics like checking for null bytes work.",
    explanation: "Many files have magic bytes (file signatures) that identify their type, but that's not always reliable.",
    hint: "Look for non-printable characters.",
    level: "advanced",
    codeExample: "with open(f, 'rb') as fd: if b'\\x00' in fd.read(1024): ..."
  },
  {
    question: "What is a 'file signature' (magic number)?",
    shortAnswer: "A sequence of bytes at the beginning of a file that identifies its format.",
    explanation: "For example, JPEG files start with FF D8, PDF with 25 50 44 46.",
    hint: "It's like a 'birth certificate' for files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "Why might a CSV file be considered a text file?",
    shortAnswer: "It contains only ASCII/Unicode characters and is human-readable.",
    explanation: "CSV uses commas and newlines to structure data, but all characters are printable.",
    hint: "You can open it in a spreadsheet, but also in a text editor.",
    level: "basic",
    codeExample: null
  },
  {
    question: "What is the role of newline characters in text files?",
    shortAnswer: "They mark the end of a line; different OS use different conventions (\\n vs \\r\\n).",
    explanation: "Python handles this automatically by default, but you can control it with the `newline` parameter.",
    hint: "Unix uses \\n, Windows uses \\r\\n.",
    level: "intermediate",
    codeExample: "open('f.txt', 'r', newline='')"
  },
  {
    question: "How do you write a string to a binary file?",
    shortAnswer: "You must encode it to bytes first using `.encode()` before writing.",
    explanation: "Binary files only accept bytes-like objects, not strings.",
    hint: "Use f.write(my_string.encode('utf-8')).",
    level: "intermediate",
    codeExample: "with open('f.bin', 'wb') as f: f.write('Hello'.encode())"
  },
  {
    question: "What is the `struct` module used for?",
    shortAnswer: "It packs and unpacks Python data to/from binary representations.",
    explanation: "It's essential for reading/writing binary files with custom layouts (e.g., C structures).",
    hint: "Convert Python ints/floats to bytes and vice versa.",
    level: "advanced",
    codeExample: "struct.pack('i', 42)"
  },
  {
    question: "Why is it bad to open a binary file in text mode?",
    shortAnswer: "You may get decoding errors or data corruption because the bytes may not be valid characters.",
    explanation: "Binary data can contain any byte value, including invalid UTF-8 sequences.",
    hint: "You'll likely see UnicodeDecodeError.",
    level: "intermediate",
    codeExample: "open('image.jpg', 'r')  # may raise error"
  },
  {
    question: "What is a `bytearray` and how is it different from `bytes`?",
    shortAnswer: "`bytearray` is mutable; `bytes` is immutable.",
    explanation: "Use `bytearray` when you need to modify binary data in place.",
    hint: "Like a list of bytes you can change.",
    level: "advanced",
    codeExample: "ba = bytearray(b'hello'); ba[0]=72"
  },
  {
    question: "Can text files contain non-ASCII characters?",
    shortAnswer: "Yes, if they are encoded in UTF-8 or other multi-byte encodings.",
    explanation: "UTF-8 supports all Unicode characters, so you can store emojis, accented letters, etc.",
    hint: "Not all text is plain ASCII.",
    level: "basic",
    codeExample: "open('f.txt', 'w', encoding='utf-8')"
  },
  {
    question: "What is the BOM (Byte Order Mark) in text files?",
    shortAnswer: "A special marker at the start of a file indicating byte order for UTF-16/UTF-32.",
    explanation: "UTF-8 with BOM is sometimes used, but generally discouraged in modern systems.",
    hint: "It's an extra byte sequence that can confuse readers.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "How do you read a large binary file efficiently?",
    shortAnswer: "Read it in chunks using a loop with `read(block_size)`.",
    explanation: "Avoid `read()` without arguments, which loads the entire file into memory.",
    hint: "Process 1MB at a time to stay memory-safe.",
    level: "intermediate",
    codeExample: "with open('big.bin', 'rb') as f: while chunk := f.read(1024*1024): process(chunk)"
  },
  {
    question: "What is the difference between text and binary modes regarding line endings?",
    shortAnswer: "Text mode translates newlines (`\\n` to `\\r\\n` on Windows), binary mode does no translation.",
    explanation: "This can be a source of bugs when moving files across platforms.",
    hint: "Binary mode keeps bytes exactly as they are.",
    level: "advanced",
    codeExample: null
  },
  {
    question: "Why is JSON considered a text format even though it's used for data interchange?",
    shortAnswer: "Because it consists entirely of printable characters and can be read by humans.",
    explanation: "JSON is a structured text format that is lightweight and widely supported.",
    hint: "It's like a dictionary written as a string.",
    level: "basic",
    codeExample: "import json; json.dump(data, f)"
  },
  {
    question: "What are some binary file formats that are also human-readable if you use a hex editor?",
    shortAnswer: "Most binary formats become readable in a hex editor as hexadecimal representation, but not as text.",
    explanation: "Hex editors show the raw bytes, which you can interpret if you know the format.",
    hint: "A hex editor is like a microscope for files.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How can you read a binary file and interpret it as integers?",
    shortAnswer: "Use `struct.unpack` or the `int.from_bytes` method.",
    explanation: "You need to know the byte order (endianness) and size.",
    hint: "Use `struct.unpack('i', bytes)` for a 4-byte integer.",
    level: "advanced",
    codeExample: "value = int.from_bytes(data, 'little')"
  },
  {
    question: "What is the purpose of the `array` module for binary data?",
    shortAnswer: "It provides an efficient way to store arrays of numeric types in a compact binary format.",
    explanation: "Useful for reading/writing large numerical datasets.",
    hint: "Like a binary list of numbers.",
    level: "advanced",
    codeExample: "from array import array; arr = array('i', [1,2,3]); arr.tofile('data.bin')"
  },
  {
    question: "Why might a text file be larger than an equivalent binary file?",
    shortAnswer: "Because numbers are stored as characters (multiple bytes) instead of fixed‑width binary integers.",
    explanation: "For example, the number 12345 takes 5 bytes as text but only 2 bytes as a 16-bit integer.",
    hint: "Text wastes space but gains readability.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "What are platform-specific text file issues?",
    shortAnswer: "Different OS use different newline conventions and default encodings.",
    explanation: "Windows uses `\\r\\n`, Unix uses `\\n`, and Mac OS classic used `\\r`.",
    hint: "Always specify newline and encoding for cross-platform code.",
    level: "intermediate",
    codeExample: "open('f.txt', 'r', newline='')"
  },
  {
    question: "How do you determine the encoding of a text file?",
    shortAnswer: "You can't determine it with 100% certainty; you must assume or use tools like `chardet`.",
    explanation: "Many files lack encoding metadata; you often need to rely on context.",
    hint: "If you don't know, try UTF-8 first.",
    level: "advanced",
    codeExample: "import chardet; chardet.detect(open('f.txt', 'rb').read())"
  },
  {
    question: "What is the difference between `.txt` and `.bin` extensions?",
    shortAnswer: "They are just conventions; the actual content matters more than the extension.",
    explanation: "You can name a binary file .txt, but it won't be readable as text.",
    hint: "Extensions are hints, not guarantees.",
    level: "basic",
    codeExample: null
  },
  {
    question: "Why might you use a binary format for a configuration file?",
    shortAnswer: "You wouldn't typically; configuration is usually text to allow manual editing.",
    explanation: "Binary configs are harder to edit and debug, so they are less common.",
    hint: "Think about what's easier for a sysadmin to change.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How does Python's `pickle` module relate to binary files?",
    shortAnswer: "Pickle serializes Python objects into a binary format that can be stored or transmitted.",
    explanation: "It's a Python‑specific binary serialization, not meant for cross‑language use.",
    hint: "It converts objects to bytes and back.",
    level: "advanced",
    codeExample: "import pickle; pickle.dump(obj, open('data.pkl', 'wb'))"
  },
  {
    question: "What is the advantage of using text-based data exchange formats like JSON over binary?",
    shortAnswer: "They are human‑readable, debug‑friendly, and language‑agnostic.",
    explanation: "Text formats are easier to inspect and parse in any language.",
    hint: "You can open a JSON file and understand it.",
    level: "intermediate",
    codeExample: null
  },
  {
    question: "How do you write an integer to a binary file without using `struct`?",
    shortAnswer: "Use `to_bytes()` method of integers.",
    explanation: "For example, `(42).to_bytes(4, 'little')` produces 4 bytes.",
    hint: "It's a built‑in method on int.",
    level: "advanced",
    codeExample: "f.write((42).to_bytes(4, 'little'))"
  }
];

export default questions;