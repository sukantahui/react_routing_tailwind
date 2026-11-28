// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "Why is the parameter newline='' used when opening a CSV file for writing in Python?",
    "options": [
      "To delete empty lines already present",
      "To prevent extra blank lines from being inserted between records on Windows",
      "To encrypt line endings",
      "To make the file read-only"
    ],
    "correctAnswer": 1,
    "explanation": "On Windows, newline='' suppresses universal newline translation, preventing unwanted blank lines (\\r\\r\\n) between rows.",
    "hint": "Prevents extra blank lines."
  },
  {
    "id": 2,
    "question": "What line terminator does the default 'excel' dialect in csv.writer produce?",
    "options": [
      "'\\n'",
      "'\\r\\n'",
      "'\\r'",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "The default 'excel' dialect uses '\\r\\n' as its line terminator.",
    "hint": "'\\r\\n'."
  },
  {
    "id": 3,
    "question": "What happens on Windows if open('test.csv', 'w') is used without newline=''?",
    "options": [
      "The file cannot be opened",
      "Python translates the '\\n' inside '\\r\\n' into '\\r\\n', producing '\\r\\r\\n' and causing blank lines",
      "File is opened in binary mode",
      "An error is raised immediately"
    ],
    "correctAnswer": 1,
    "explanation": "Text mode translates '\\n' to '\\r\\n', resulting in double carriage returns ('\\r\\r\\n') which show as blank rows in Excel and Notepad.",
    "hint": "Produces double carriage returns (\\r\\r\\n)."
  },
  {
    "id": 4,
    "question": "Which of the following is the correct syntax to open 'data.csv' for writing with csv.writer?",
    "options": [
      "open('data.csv', 'w')",
      "open('data.csv', 'w', newline='')",
      "open('data.csv', 'w', eol='')",
      "open('data.csv', 'wb', newline=False)"
    ],
    "correctAnswer": 1,
    "explanation": "The standard and recommended syntax is open('data.csv', 'w', newline='').",
    "hint": "open('data.csv', 'w', newline='')."
  },
  {
    "id": 5,
    "question": "Is newline='' also recommended when opening a CSV file for reading (mode='r')?",
    "options": [
      "No, it causes an IOError in read mode",
      "Yes, it ensures embedded newlines inside quoted fields are interpreted correctly",
      "Only in Python 2",
      "Only on Linux systems"
    ],
    "correctAnswer": 1,
    "explanation": "According to Python documentation, opening with newline='' in read mode ensures multi-line quoted fields are parsed correctly without premature row breaks.",
    "hint": "Recommended in read mode for quoted fields."
  },
  {
    "id": 6,
    "question": "What is universal newline translation in Python's standard text I/O?",
    "options": [
      "Automatic conversion of all foreign languages to English",
      "Automatic translation of platform-specific line endings (\\r\\n, \\r) to \\n when reading and back when writing",
      "Removing spaces from lines",
      "Translating ASCII to Unicode"
    ],
    "correctAnswer": 1,
    "explanation": "Universal newlines automatically translate \\r\\n, \\r, and \\n to \\n in memory and to system default upon output.",
    "hint": "Translating platform line endings."
  },
  {
    "id": 7,
    "question": "What is the consequence of having blank rows in a CSV file when reading it with a naive loop?",
    "options": [
      "Reader will return an empty list [] for the blank line, which might cause IndexError when accessing row[0]",
      "The file deletes itself",
      "All records become corrupted",
      "The script enters an infinite loop"
    ],
    "correctAnswer": 0,
    "explanation": "Blank lines yield empty lists ([]). Attempting to index row[0] on an empty list throws IndexError.",
    "hint": "Yields empty lists causing IndexError."
  },
  {
    "id": 8,
    "question": "On Linux and macOS, what is the default End-Of-Line (EOL) character sequence?",
    "options": [
      "'\\r\\n'",
      "'\\n'",
      "'\\r'",
      "'\\0'"
    ],
    "correctAnswer": 1,
    "explanation": "Unix-like systems (Linux and modern macOS) use a single newline character ('\\n').",
    "hint": "'\\n'."
  },
  {
    "id": 9,
    "question": "On legacy Classic Mac OS (prior to OS X), what was the standard line ending?",
    "options": [
      "'\\n'",
      "'\\r\\n'",
      "'\\r'",
      "';'"
    ],
    "correctAnswer": 2,
    "explanation": "Classic Mac OS used a single Carriage Return ('\\r').",
    "hint": "'\\r'."
  },
  {
    "id": 10,
    "question": "If newline is set to None (default in open()), what newline translation occurs?",
    "options": [
      "No translation at all",
      "Universal newlines enabled; on output, '\\n' characters written are converted to the system default line separator",
      "All lines are concatenated",
      "Newline characters are replaced with spaces"
    ],
    "correctAnswer": 1,
    "explanation": "When newline=None, standard platform translation occurs (on Windows, '\\n' becomes '\\r\\n').",
    "hint": "Platform line translation occurs."
  },
  {
    "id": 11,
    "question": "If newline is set to '' (empty string), what newline translation occurs on output?",
    "options": [
      "All '\\n' are converted to '\\r\\n'",
      "No translation occurs; characters written are passed through to the file unmodified",
      "All line breaks are removed",
      "Spaces are inserted at the end of every line"
    ],
    "correctAnswer": 1,
    "explanation": "With newline='', no translation takes place; characters written by csv.writer are passed directly to the file.",
    "hint": "No translation occurs."
  },
  {
    "id": 12,
    "question": "What happens if a student writes open('data.csv', 'wb') for CSV writer in Python 3?",
    "options": [
      "Works perfectly",
      "Raises TypeError because csv.writer expects a text file object, not bytes",
      "Generates an encrypted binary file",
      "Overwrites the hard drive"
    ],
    "correctAnswer": 1,
    "explanation": "In Python 3, csv.writer expects text mode streams (str), so binary mode 'wb' raises 'TypeError: a bytes-like object is required, not str'.",
    "hint": "Raises TypeError in Python 3."
  },
  {
    "id": 13,
    "question": "In Python 2, how was the blank line problem handled?",
    "options": [
      "By using newline=''",
      "By opening files in binary mode 'wb'",
      "By using pip install csv2",
      "By using Java"
    ],
    "correctAnswer": 1,
    "explanation": "In Python 2, CSV files were opened in binary mode 'wb'; Python 3 changed this to text mode with newline=''.",
    "hint": "Binary mode 'wb' was used in Python 2."
  },
  {
    "id": 14,
    "question": "Consider: with open('score.csv', 'a', newline='') as f:. What does 'a' mode represent?",
    "options": [
      "Read and write",
      "Append mode (adds new records at the end without truncating existing data)",
      "ASCII mode",
      "Asynchronous mode"
    ],
    "correctAnswer": 1,
    "explanation": "Mode 'a' opens the file for appending records at the end without deleting existing records.",
    "hint": "Append mode."
  },
  {
    "id": 15,
    "question": "Which of the following will open 'emp.csv' for appending records while preventing blank lines?",
    "options": [
      "open('emp.csv', 'w', newline='')",
      "open('emp.csv', 'a', newline='')",
      "open('emp.csv', 'r+', newline=None)",
      "open('emp.csv', 'append')"
    ],
    "correctAnswer": 1,
    "explanation": "open('emp.csv', 'a', newline='') correctly opens the file for appending while suppressing blank lines.",
    "hint": "open('emp.csv', 'a', newline='')."
  },
  {
    "id": 16,
    "question": "Which built-in module provides the open() function in Python?",
    "options": [
      "sys",
      "io (built-in builtins)",
      "csv",
      "os"
    ],
    "correctAnswer": 1,
    "explanation": "open() is a built-in function provided by the io module and available globally via builtins.",
    "hint": "io / builtins."
  },
  {
    "id": 17,
    "question": "What parameter in open() specifies the character set to ensure Hindi, Bengali, or accented characters are stored properly in CSV?",
    "options": [
      "charset='utf-8'",
      "encoding='utf-8'",
      "code='unicode'",
      "lang='all'"
    ],
    "correctAnswer": 1,
    "explanation": "The encoding parameter, e.g. encoding='utf-8', controls character set conversion.",
    "hint": "encoding='utf-8'."
  },
  {
    "id": 18,
    "question": "What is the recommended complete open() statement for creating a UTF-8 CSV file in Python 3?",
    "options": [
      "open('data.csv', 'w')",
      "open('data.csv', 'w', newline='', encoding='utf-8')",
      "open('data.csv', 'wb', encoding='utf-8')",
      "open('data.csv', 'w+', newline='\\n')"
    ],
    "correctAnswer": 1,
    "explanation": "open('data.csv', 'w', newline='', encoding='utf-8') prevents blank lines and supports international characters cleanly.",
    "hint": "open('data.csv', 'w', newline='', encoding='utf-8')."
  },
  {
    "id": 19,
    "question": "If a CSV file already has blank lines, how can a programmer filter them out during iteration in Python?",
    "options": [
      "if row:  # checks if the row list is non-empty",
      "if len(row) > 0:",
      "Both of the above",
      "None of the above"
    ],
    "correctAnswer": 2,
    "explanation": "Both 'if row:' and 'if len(row) > 0:' skip empty row lists produced by blank lines.",
    "hint": "Both check for non-empty row list."
  },
  {
    "id": 20,
    "question": "What does the 'with' statement ensure when opening a CSV file?",
    "options": [
      "The file is automatically closed even if an exception occurs",
      "The file is encrypted",
      "The file is opened in parallel cores",
      "The file is downloaded from the cloud"
    ],
    "correctAnswer": 0,
    "explanation": "The 'with' statement acts as a context manager that guarantees the file handle is closed on block exit.",
    "hint": "Automatically closes the file."
  },
  {
    "id": 21,
    "question": "Can newline be set to '\\r\\n' explicitly in open('data.csv', 'w', newline='\\r\\n')?",
    "options": [
      "No, syntax error",
      "Yes, but it forces Windows EOL even on Linux/macOS",
      "Only in binary mode",
      "Only for reading"
    ],
    "correctAnswer": 1,
    "explanation": "Explicitly setting newline='\\r\\n' forces carriage return + line feed regardless of the host OS.",
    "hint": "Forces \\r\\n line endings."
  },
  {
    "id": 22,
    "question": "What does ASCII code 13 (0x0D) represent?",
    "options": [
      "Line Feed (\\n)",
      "Carriage Return (\\r)",
      "Tab (\\t)",
      "Space"
    ],
    "correctAnswer": 1,
    "explanation": "ASCII 13 is Carriage Return (\\r).",
    "hint": "Carriage Return (\\r)."
  },
  {
    "id": 23,
    "question": "What does ASCII code 10 (0x0A) represent?",
    "options": [
      "Line Feed (\\n)",
      "Carriage Return (\\r)",
      "Null byte",
      "Escape"
    ],
    "correctAnswer": 0,
    "explanation": "ASCII 10 is Line Feed (\\n).",
    "hint": "Line Feed (\\n)."
  },
  {
    "id": 24,
    "question": "In the CBSE Class 12 board marking scheme, how many marks are typically deducted if newline='' is omitted when writing CSV files?",
    "options": [
      "None, it is optional",
      "Half (½) mark to 1 mark depending on rubric",
      "All 4 marks",
      "Zero marks if it runs on Linux"
    ],
    "correctAnswer": 1,
    "explanation": "In board exam rubrics, omitting newline='' when opening for writing often incurs a ½ mark deduction for incomplete file mode configuration.",
    "hint": "½ to 1 mark deduction."
  },
  {
    "id": 25,
    "question": "Which of the following is true regarding newline=''?",
    "options": [
      "It works only on text files and is invalid on binary files",
      "It works on both text and binary files",
      "It is only valid in Python 2.7",
      "It changes the delimiter from comma to pipe"
    ],
    "correctAnswer": 0,
    "explanation": "The newline parameter is only meaningful and allowed in text mode; binary mode open() rejects the newline argument.",
    "hint": "Only valid for text mode."
  }
];

export default questions;
