// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What is the fundamental unit of data storage in a Binary File?",
    "options": [
      "ASCII character string",
      "Raw byte sequence (0x00 to 0xFF)",
      "Word tokens",
      "HTML tags"
    ],
    "correctAnswer": 1,
    "explanation": "Binary files store raw byte streams without converting them to human-readable character encodings.",
    "hint": "Raw byte sequence."
  },
  {
    "id": 2,
    "question": "How does line termination differ between a text file and a binary file?",
    "options": [
      "Binary files use \\r\\n; text files use \\n",
      "Binary files have no concept of line delimiters or EOL translations",
      "Binary files use EOF at every line",
      "Text files have no line breaks"
    ],
    "correctAnswer": 1,
    "explanation": "Text files separate lines with EOL characters (\\n or \\r\\n) and translate them; binary files store exact bytes with zero translation.",
    "hint": "No EOL translation in binary."
  },
  {
    "id": 3,
    "question": "Why are binary files significantly faster to read and write than text files in Python?",
    "options": [
      "Because they use more CPU cores",
      "Because they bypass character encoding/decoding and delimiter translation overhead",
      "Because they compress data using ZIP",
      "Because they bypass disk controllers"
    ],
    "correctAnswer": 1,
    "explanation": "Binary files transfer memory representations directly to and from disk without string parsing or encoding conversions.",
    "hint": "No encoding/decoding overhead."
  },
  {
    "id": 4,
    "question": "What happens if a user opens a Python binary file (`.dat`) in Microsoft Notepad?",
    "options": [
      "Notepad automatically compiles it",
      "It displays garbled unintelligible symbols and unprintable glyphs",
      "It renders as a formatted table",
      "It prompts for a password"
    ],
    "correctAnswer": 1,
    "explanation": "Binary bytes do not correspond to continuous ASCII/UTF-8 character codes, appearing as scrambled gibberish in text editors.",
    "hint": "Garbled unreadable glyphs."
  },
  {
    "id": 5,
    "question": "Which file extension is standard for serialized binary data files in the CBSE Class 12 CS curriculum?",
    "options": [
      ".txt",
      ".dat",
      ".csv",
      ".json"
    ],
    "correctAnswer": 1,
    "explanation": "The official CBSE curriculum and practical exam blueprints specify `.dat` (e.g. `student.dat`, `employee.dat`) for binary files.",
    "hint": ".dat extension."
  },
  {
    "id": 6,
    "question": "Which access mode flag character must be appended when opening a binary file in Python?",
    "options": [
      "'x'",
      "'t'",
      "'b'",
      "'s'"
    ],
    "correctAnswer": 2,
    "explanation": "The `'b'` character (such as `'rb'`, `'wb'`, `'ab'`) instructs Python to handle the stream in binary mode.",
    "hint": "'b' for binary."
  },
  {
    "id": 7,
    "question": "What data type is returned when reading from a binary file using `f.read(4)`?",
    "options": [
      "str",
      "bytes",
      "int",
      "list"
    ],
    "correctAnswer": 1,
    "explanation": "Reading from a binary stream returns a `bytes` object (e.g. `b'\\x01\\x02'`), not a `str`.",
    "hint": "bytes object."
  },
  {
    "id": 8,
    "question": "Assertion (A): Binary files provide exact precision for floating-point numbers.\nReason (R): Text files may suffer minor rounding or truncation during float-to-string and string-to-float conversions.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Binary storage preserves the IEEE 754 in-memory bit pattern of floats, eliminating conversion inaccuracies.",
    "hint": "Exact bit representation."
  },
  {
    "id": 9,
    "question": "Which of the following is an example of a binary file format?",
    "options": [
      ".txt",
      ".py",
      ".png",
      ".csv"
    ],
    "correctAnswer": 2,
    "explanation": "Image files (.png, .jpg), compiled bytecodes (.pyc), and serialized data files (.dat) are binary formats.",
    "hint": "Image files are binary."
  },
  {
    "id": 10,
    "question": "What is the memory size of a single byte?",
    "options": [
      "4 bits",
      "8 bits",
      "16 bits",
      "32 bits"
    ],
    "correctAnswer": 1,
    "explanation": "A byte consists of exactly 8 bits, representing values from 0 to 255 (0x00 to 0xFF).",
    "hint": "8 bits in a byte."
  },
  {
    "id": 11,
    "question": "What error occurs if you try `f.write('Hello')` on a file opened with `open('file.dat', 'wb')`?",
    "options": [
      "ValueError",
      "TypeError: a bytes-like object is required, not 'str'",
      "FileNotFoundError",
      "ModeError"
    ],
    "correctAnswer": 1,
    "explanation": "Binary mode streams require bytes-like objects (`bytes` or `bytearray`), not strings.",
    "hint": "Bytes-like object required."
  },
  {
    "id": 12,
    "question": "How do you pass a literal ASCII string as bytes to a binary file `write()` method?",
    "options": [
      "b'Hello'",
      "str('Hello')",
      "bytes('Hello')",
      "Both Option 1 and Option 3"
    ],
    "correctAnswer": 3,
    "explanation": "Both the byte literal prefix `b'Hello'` and `bytes('Hello', 'utf-8')` construct valid `bytes` objects.",
    "hint": "Byte literal prefix b''."
  },
  {
    "id": 13,
    "question": "Which built-in Python module is used to serialize and deserialize complex Python objects into binary files?",
    "options": [
      "json",
      "csv",
      "pickle",
      "marshal"
    ],
    "correctAnswer": 2,
    "explanation": "The `pickle` module is the standard CBSE Class 12 tool for object serialization in binary files.",
    "hint": "pickle module."
  },
  {
    "id": 14,
    "question": "Can a binary file store mixed data types like integers, nested lists, and dictionaries in a single file?",
    "options": [
      "No, only integers",
      "Yes, Python objects can be serialized and preserved in their native hierarchy",
      "Only strings are permitted",
      "Only if converted to CSV"
    ],
    "correctAnswer": 1,
    "explanation": "Binary serialization preserves complex heterogeneous Python structures (dictionaries, tuples, lists) intact.",
    "hint": "Heterogeneous complex structures."
  },
  {
    "id": 15,
    "question": "What is the size on disk if you write 100 raw bytes to a binary file?",
    "options": [
      "Exactly 100 bytes",
      "100 characters plus newlines",
      "Depends on EOL translation",
      "200 bytes"
    ],
    "correctAnswer": 0,
    "explanation": "Binary mode involves zero encoding or EOL inflation; 100 bytes written equals exactly 100 bytes on disk.",
    "hint": "Exact byte-for-byte count."
  },
  {
    "id": 16,
    "question": "Assertion (A): Binary files are portable across all operating systems without any caveats.\nReason (R): Byte endianness and Python pickle protocols can occasionally vary between distinct architectures.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is false but R is true",
      "A is true but R is false"
    ],
    "correctAnswer": 2,
    "explanation": "A is false: architecture differences (big-endian vs little-endian) and pickle protocol versions can impact portability.",
    "hint": "Architecture endianness caveats."
  },
  {
    "id": 17,
    "question": "Which of the following operations is NOT performed during binary file I/O?",
    "options": [
      "Seeking byte offsets",
      "Reading raw bytes",
      "Automatic EOL character translation (\\r\\n -> \\n)",
      "Flushing memory buffers"
    ],
    "correctAnswer": 2,
    "explanation": "EOL normalization is exclusively performed on text streams; binary streams preserve bytes without alteration.",
    "hint": "No EOL normalization."
  },
  {
    "id": 18,
    "question": "What is the default pickle protocol in Python 3.8+?",
    "options": [
      "Protocol 0",
      "Protocol 2",
      "Protocol 4 (or 5)",
      "Protocol -1"
    ],
    "correctAnswer": 2,
    "explanation": "Python 3.8+ defaults to pickle Protocol 4, providing efficient binary serialization.",
    "hint": "Protocol 4."
  },
  {
    "id": 19,
    "question": "What does `b'\\x41'` represent in hexadecimal notation?",
    "options": [
      "The byte value 65 (ASCII 'A')",
      "The digit 41",
      "An error code",
      "Null byte"
    ],
    "correctAnswer": 0,
    "explanation": "Hexadecimal 0x41 corresponds to decimal 65, which is the ASCII code for capital 'A'.",
    "hint": "ASCII value 65."
  },
  {
    "id": 20,
    "question": "Why is a binary file more compact on disk for storing large integer arrays than a text file?",
    "options": [
      "Because integers in text files take one character per digit plus spaces, while binary stores them in fixed 4 or 8 bytes",
      "Because binary files delete numbers",
      "Because text files are encrypted",
      "Because binary files use base 64"
    ],
    "correctAnswer": 0,
    "explanation": "The number 1000000000 takes 10 ASCII bytes in a text file, but fits in just 4 or 8 bytes in binary format.",
    "hint": "Fixed width byte packing."
  },
  {
    "id": 21,
    "question": "Consider: `f = open('scores.dat', 'wb')`. What does `f.mode` evaluate to?",
    "options": [
      "'binary'",
      "'wb'",
      "'w'",
      "'bytes'"
    ],
    "correctAnswer": 1,
    "explanation": "`f.mode` returns the exact mode string passed to `open()`, which is `'wb'`.",
    "hint": "Mode string 'wb'."
  },
  {
    "id": 22,
    "question": "Can binary files be opened in append mode?",
    "options": [
      "No, append is only for text files",
      "Yes, using access mode 'ab'",
      "Only if converted to bytes first",
      "Only on Linux"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'ab'` opens binary files for appending raw bytes at the end.",
    "hint": "'ab' mode."
  },
  {
    "id": 23,
    "question": "In CBSE board examinations, when is a binary file preferred over a text file?",
    "options": [
      "When storing unstructured free-form poetry",
      "When storing structured records (such as student or employee dictionaries) that need to be searched and updated by ID",
      "When writing HTML web pages",
      "When creating CSV spreadsheets"
    ],
    "correctAnswer": 1,
    "explanation": "Structured student/employee records with multiple fields (Roll, Name, Marks) are canonically stored as dictionaries in binary `.dat` files.",
    "hint": "Structured records like Student/Employee."
  },
  {
    "id": 24,
    "question": "What character representation is displayed for byte value 0 (0x00) in Python bytes?",
    "options": [
      "b'0'",
      "b'\\x00'",
      "b'NULL'",
      "b''"
    ],
    "correctAnswer": 1,
    "explanation": "The null byte is represented as `b'\\x00'` in Python byte strings.",
    "hint": "b'\\x00'."
  },
  {
    "id": 25,
    "question": "In a CBSE 2-mark question: 'State two advantages of binary files over text files.' What are the two best points?",
    "options": [
      "1) Faster I/O speed due to no character conversion, 2) Direct storage of complex Python objects without string parsing",
      "1) Can be read in Notepad, 2) Smaller font size",
      "1) Easier to edit by hand, 2) Uses commas",
      "1) No memory needed, 2) Unlimited size"
    ],
    "correctAnswer": 0,
    "explanation": "The two canonical advantages are: 1) Performance efficiency (no translation overhead) and 2) Native serialization of complex data structures.",
    "hint": "Speed and native serialization."
  }
];

export default questions;
