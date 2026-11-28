// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "Which of the following is a key characteristic of Text Files in Python?",
    "options": [
      "Stored as unreadable encrypted binary streams",
      "Consists of human-readable characters structured into lines delimited by EOL",
      "Only stores numeric values",
      "Requires special binary de-serializers like pickle"
    ],
    "correctAnswer": 1,
    "explanation": "Text files store sequences of ASCII or Unicode characters organized into lines separated by End-of-Line (EOL) characters.",
    "hint": "Human readable text separated by newlines."
  },
  {
    "id": 2,
    "question": "What does 'EOL' stand for in text file terminology?",
    "options": [
      "End of Loop",
      "End of Line",
      "Execution of Link",
      "Element of List"
    ],
    "correctAnswer": 1,
    "explanation": "EOL denotes the End of Line delimiter character (e.g., '\\n' on Unix/Linux, '\\r\\n' on Windows).",
    "hint": "Line boundary delimiter."
  },
  {
    "id": 3,
    "question": "How does Python handle newline character translation by default when reading text files on Windows?",
    "options": [
      "Leaves \\r\\n untouched as two separate bytes",
      "Translates universal \\r\\n or \\r into standard \\n",
      "Throws an encoding error",
      "Deletes all line breaks entirely"
    ],
    "correctAnswer": 1,
    "explanation": "Python's universal newline mode automatically translates platform-specific EOL sequences into '\\n' upon reading.",
    "hint": "Universal newlines."
  },
  {
    "id": 4,
    "question": "Which of the following is a Binary File?",
    "options": [
      "student_notes.txt",
      "payroll_data.csv",
      "profile_picture.png",
      "main_code.py"
    ],
    "correctAnswer": 2,
    "explanation": "Image files (.png, .jpg), executable files (.exe), and pickled dat files (.dat) store raw binary bytes.",
    "hint": "Images and audio are binary."
  },
  {
    "id": 5,
    "question": "What occurs if you attempt to open a binary file in a standard text editor like Notepad?",
    "options": [
      "The file is executed by the OS",
      "It displays garbled gibberish characters or weird symbols",
      "It automatically translates into Python code",
      "Notepad crashes immediately"
    ],
    "correctAnswer": 1,
    "explanation": "Binary files lack line delimiters and ASCII/UTF-8 character conventions, appearing as unintelligible glyphs in text editors.",
    "hint": "Scrambled glyphs."
  },
  {
    "id": 6,
    "question": "What does 'CSV' stand for in data storage?",
    "options": [
      "Central System Variable",
      "Comma Separated Values",
      "Character Stream Vector",
      "Compiled Storage Vault"
    ],
    "correctAnswer": 1,
    "explanation": "CSV stands for Comma Separated Values, storing tabular data where columns are delimited by commas.",
    "hint": "Comma Separated Values."
  },
  {
    "id": 7,
    "question": "Which file type requires the `pickle` module in Python for object serialization and retrieval?",
    "options": [
      "Text File (.txt)",
      "CSV File (.csv)",
      "Binary File (.dat)",
      "HTML File (.html)"
    ],
    "correctAnswer": 2,
    "explanation": "The `pickle` module serializes Python objects (lists, dictionaries) directly into binary file byte streams.",
    "hint": "Used for .dat files."
  },
  {
    "id": 8,
    "question": "Assertion (A): Binary files provide faster read/write performance compared to text files.\nReason (R): Binary files store data in exact memory byte format without undergoing character encoding/decoding translations.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Because binary files bypass character translation and delimiter scanning, they execute significantly faster.",
    "hint": "No encoding translation in binary."
  },
  {
    "id": 9,
    "question": "What character separates fields in a standard CSV file by default?",
    "options": [
      "Semicolon (;)",
      "Tab (\\t)",
      "Comma (,)",
      "Pipe (|)"
    ],
    "correctAnswer": 2,
    "explanation": "By definition, standard CSV files use a comma (`,`) as their default field separator.",
    "hint": "The first word of CSV."
  },
  {
    "id": 10,
    "question": "Which file type is best suited for storing structured tabular data easily imported into Microsoft Excel?",
    "options": [
      "Binary file (.dat)",
      "CSV file (.csv)",
      "Compiled Python file (.pyc)",
      "System library (.dll)"
    ],
    "correctAnswer": 1,
    "explanation": "CSV files are universally recognized and rendered as tabular spreadsheets by spreadsheet software.",
    "hint": "Opens directly in Excel."
  },
  {
    "id": 11,
    "question": "Which access mode flag character signifies that a file operation must be performed in binary mode?",
    "options": [
      "'t'",
      "'b'",
      "'x'",
      "'d'"
    ],
    "correctAnswer": 1,
    "explanation": "The `'b'` character (e.g. `'rb'`, `'wb'`, `'ab'`) instructs Python to treat the stream as raw binary bytes.",
    "hint": "'b' for binary."
  },
  {
    "id": 12,
    "question": "What is the default mode of `open()` if the mode parameter is omitted?",
    "options": [
      "'rb'",
      "'w'",
      "'r' (text read mode)",
      "'a'"
    ],
    "correctAnswer": 2,
    "explanation": "Default mode is `'r'`, which opens the file in read-only text mode.",
    "hint": "Default is read text."
  },
  {
    "id": 13,
    "question": "Why does writing a Python integer like `450` to a text file require conversion using `str(450)`?",
    "options": [
      "Because text files only accept character sequences / strings",
      "Because integers corrupt disk sectors",
      "Because Python integers are 64-bit",
      "It is optional, f.write(450) works directly"
    ],
    "correctAnswer": 0,
    "explanation": "`f.write()` on text streams requires a string; passing an integer raises `TypeError: write() argument must be str, not int`.",
    "hint": "write() requires string."
  },
  {
    "id": 14,
    "question": "Which file format preserves the exact in-memory Python object hierarchy without manual string formatting?",
    "options": [
      "Text File (.txt)",
      "Binary file via pickle (.dat)",
      "Markdown (.md)",
      "Log file (.log)"
    ],
    "correctAnswer": 1,
    "explanation": "Pickling stores full Python objects (dictionaries, tuples, objects) in native binary representation.",
    "hint": "Pickle saves objects directly."
  },
  {
    "id": 15,
    "question": "Consider a file containing lines: `Hello\\nWorld\\n`. What is the length of `\\n` as a string in Python?",
    "options": [
      "0",
      "1",
      "2",
      "Depends on Windows vs Linux"
    ],
    "correctAnswer": 1,
    "explanation": "`\\n` is a single escape character with a length of 1.",
    "hint": "Escape sequence length."
  },
  {
    "id": 16,
    "question": "Can a CSV file use a delimiter other than a comma?",
    "options": [
      "No, CSV only supports commas",
      "Yes, custom delimiters such as tabs, pipes, or semicolons can be specified",
      "Only if renamed to .txt",
      "Only on Linux systems"
    ],
    "correctAnswer": 1,
    "explanation": "CSV parsers allow specifying arbitrary custom delimiters like `delimiter='\\t'` (TSV) or `delimiter='|'`.",
    "hint": "Delimiters can be customized."
  },
  {
    "id": 17,
    "question": "Which statement is true regarding line breaks in binary files?",
    "options": [
      "Lines are always separated by \\n",
      "Binary files have no concept of line breaks unless interpreted as such by an application",
      "Every 8 bytes an EOL is automatically placed",
      "Binary files use EOF instead of EOL"
    ],
    "correctAnswer": 1,
    "explanation": "Binary files are continuous sequences of bytes without standard EOL markers.",
    "hint": "Raw byte stream without lines."
  },
  {
    "id": 18,
    "question": "Which file extension is conventionally used for serialized binary data files in CBSE Class 12 CS practicals?",
    "options": [
      ".txt",
      ".dat",
      ".csv",
      ".json"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE Class 12 board curriculum uses `.dat` (e.g. `student.dat`, `employee.dat`) for binary pickle files.",
    "hint": ".dat for data."
  },
  {
    "id": 19,
    "question": "When reading a binary file in Python using `f.read(4)`, what data type is returned?",
    "options": [
      "str (String)",
      "bytes",
      "int",
      "list"
    ],
    "correctAnswer": 1,
    "explanation": "Binary stream reads return `bytes` objects (e.g. `b'\\x00\\x01'`).",
    "hint": "Bytes object."
  },
  {
    "id": 20,
    "question": "Assertion (A): Text files can be easily edited using Notepad, VS Code, or nano.\nReason (R): Text files adhere to standardized character encoding mappings like ASCII and UTF-8.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Text files map byte values to standard human glyphs according to encoding tables, making them universally editable.",
    "hint": "Standard character encodings."
  },
  {
    "id": 21,
    "question": "Which file type requires the `csv` module in Python standard library for robust row parsing?",
    "options": [
      ".bin",
      ".csv",
      ".dat",
      ".txt"
    ],
    "correctAnswer": 1,
    "explanation": "The `csv` module provides `csv.reader` and `csv.writer` specifically for CSV format handling.",
    "hint": "csv module handles CSVs."
  },
  {
    "id": 22,
    "question": "What is the primary security risk associated with unpickling untrusted binary files?",
    "options": [
      "Disk defragmentation",
      "Arbitrary malicious code execution via pickle payload",
      "Computer screen flickering",
      "Keyboard layout change"
    ],
    "correctAnswer": 1,
    "explanation": "Unpickling data from untrusted sources can execute arbitrary machine code during object deserialization.",
    "hint": "Arbitrary code execution."
  },
  {
    "id": 23,
    "question": "What character sequence is used on Windows as the physical line terminator on disk?",
    "options": [
      "\\r only (CR)",
      "\\n only (LF)",
      "\\r\\n (CRLF)",
      "\\0 (NULL)"
    ],
    "correctAnswer": 2,
    "explanation": "Windows physically terminates lines with Carriage Return + Line Feed (`\\r\\n`), whereas Unix uses LF (`\\n`).",
    "hint": "CRLF pair."
  },
  {
    "id": 24,
    "question": "How many bits are used by standard ASCII to represent each character?",
    "options": [
      "4 bits",
      "7 bits (stored in 8-bit byte)",
      "16 bits",
      "32 bits"
    ],
    "correctAnswer": 1,
    "explanation": "Standard ASCII uses 7 bits (values 0-127), fitting within a single 8-bit byte.",
    "hint": "7-bit encoding standard."
  },
  {
    "id": 25,
    "question": "Which of the following comparisons between Text and Binary files is INCORRECT?",
    "options": [
      "Text files undergo EOL translation; Binary files do not",
      "Text files store readable characters; Binary files store raw bytes",
      "Text files require pickle.dump(); Binary files use write() with strings",
      "Text files use mode 'r'; Binary files use mode 'rb'"
    ],
    "correctAnswer": 2,
    "explanation": "Option 2 is incorrect (inverted): Binary files use `pickle.dump()`, while text files use `write()` with strings.",
    "hint": "Notice which one uses pickle."
  }
];

export default questions;
