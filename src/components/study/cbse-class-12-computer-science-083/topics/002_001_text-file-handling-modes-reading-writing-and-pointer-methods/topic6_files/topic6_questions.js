// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "What is a 'File Pointer' in Python file input/output mechanics?",
    "options": [
      "A GUI mouse cursor on screen",
      "An internal integer cursor tracking the current byte position in the file",
      "A memory address in CPython heap",
      "A variable holding the file name"
    ],
    "correctAnswer": 1,
    "explanation": "The file pointer represents the current byte offset where the next read or write operation will take place.",
    "hint": "Byte offset cursor."
  },
  {
    "id": 2,
    "question": "Which method is used to determine the current byte location of the file pointer?",
    "options": [
      "f.position()",
      "f.tell()",
      "f.get_ptr()",
      "f.location()"
    ],
    "correctAnswer": 1,
    "explanation": "`f.tell()` returns an integer specifying the current byte position of the file pointer.",
    "hint": "tell tells the position."
  },
  {
    "id": 3,
    "question": "Which method is used to reposition the file pointer to a specific byte location?",
    "options": [
      "f.move()",
      "f.locate()",
      "f.seek()",
      "f.jump()"
    ],
    "correctAnswer": 2,
    "explanation": "`f.seek(offset, whence)` adjusts the file pointer to a new position.",
    "hint": "seek repositions."
  },
  {
    "id": 4,
    "question": "In `f.seek(offset, whence)`, what does `whence = 0` signify?",
    "options": [
      "Reference from current pointer position",
      "Reference from the end of the file",
      "Reference from the beginning of the file (absolute positioning)",
      "Reset pointer to -1"
    ],
    "correctAnswer": 2,
    "explanation": "`whence = 0` (or `os.SEEK_SET`) calculates position relative to the beginning of the file.",
    "hint": "0 is from beginning."
  },
  {
    "id": 5,
    "question": "What is the default value of the `whence` parameter in `f.seek(offset)` if omitted?",
    "options": [
      "0 (Beginning of file)",
      "1 (Current position)",
      "2 (End of file)",
      "-1"
    ],
    "correctAnswer": 0,
    "explanation": "If `whence` is omitted, it defaults to `0`, meaning offset from start of file.",
    "hint": "Default is 0."
  },
  {
    "id": 6,
    "question": "In `f.seek(offset, whence)`, what does `whence = 1` signify?",
    "options": [
      "From beginning of file",
      "From current file pointer position",
      "From end of file",
      "From beginning of line"
    ],
    "correctAnswer": 1,
    "explanation": "`whence = 1` (or `os.SEEK_CUR`) calculates position relative to current pointer location.",
    "hint": "1 is current position."
  },
  {
    "id": 7,
    "question": "In `f.seek(offset, whence)`, what does `whence = 2` signify?",
    "options": [
      "From beginning of file",
      "From current pointer",
      "From the end of the file",
      "From middle of file"
    ],
    "correctAnswer": 2,
    "explanation": "`whence = 2` (or `os.SEEK_END`) measures offset relative to the end of the file.",
    "hint": "2 is end of file."
  },
  {
    "id": 8,
    "question": "How do you reposition the file pointer to the very beginning of the file?",
    "options": [
      "f.tell(0)",
      "f.seek(0)",
      "f.rewind()",
      "f.reset()"
    ],
    "correctAnswer": 1,
    "explanation": "`f.seek(0)` (or `f.seek(0, 0)`) moves the file pointer directly to the beginning (byte 0).",
    "hint": "seek(0) rewinds to start."
  },
  {
    "id": 9,
    "question": "How do you reposition the file pointer to the very end of the file?",
    "options": [
      "f.seek(0, 2)",
      "f.seek(-1, 0)",
      "f.tell(EOF)",
      "f.seek(end)"
    ],
    "correctAnswer": 0,
    "explanation": "`f.seek(0, 2)` offsets 0 bytes from the end of the file, placing pointer at EOF.",
    "hint": "0 bytes from whence 2."
  },
  {
    "id": 10,
    "question": "In Python 3 text mode, what restriction applies to `f.seek()` with `whence = 1` or `2`?",
    "options": [
      "Any integer offset is allowed",
      "Non-zero offsets from current or end are disallowed and raise io.UnsupportedOperation",
      "It only works on Linux",
      "It corrupts the file"
    ],
    "correctAnswer": 1,
    "explanation": "In text mode on Python 3, non-zero offsets from current or end raise `io.UnsupportedOperation: can't do nonzero cur-relative seeks`.",
    "hint": "Only zero offset or byte mode allows it."
  },
  {
    "id": 11,
    "question": "Consider: `f = open('data.txt', 'w')`. `f.write('ABCDE')`. What will `f.tell()` return immediately after?",
    "options": [
      "0",
      "5",
      "4",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Writing 5 characters moves the file pointer forward by 5 bytes, so `tell()` returns 5.",
    "hint": "Length of 'ABCDE'."
  },
  {
    "id": 12,
    "question": "Consider a file containing `HELLO WORLD`. What is printed by:\n```python\nf = open('sample.txt', 'r')\nf.seek(6)\nprint(f.read(5))\n```",
    "options": [
      "'HELLO'",
      "'WORLD'",
      "'O WOR'",
      "' WORL'"
    ],
    "correctAnswer": 1,
    "explanation": "Offset 6 skips 'HELLO ' (bytes 0 to 5), landing on 'W'. `read(5)` returns 'WORLD'.",
    "hint": "Skips first 6 chars."
  },
  {
    "id": 13,
    "question": "What does `f.tell()` return when a file is newly opened in access mode 'r'?",
    "options": [
      "0",
      "Length of file",
      "-1",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "In read mode ('r'), the initial pointer starts at byte 0.",
    "hint": "Byte 0."
  },
  {
    "id": 14,
    "question": "What does `f.tell()` return when an existing file of 100 bytes is newly opened in access mode 'a'?",
    "options": [
      "0",
      "100",
      "50",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "In append mode ('a'), the initial pointer is placed at the end of the file (byte 100).",
    "hint": "Starts at end in append mode."
  },
  {
    "id": 15,
    "question": "Assertion (A): `f.tell()` takes no arguments.\nReason (R): `f.tell()` queries the current position, whereas `f.seek()` sets the position.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "`f.tell()` takes zero arguments and returns current integer position; `seek()` takes offset arguments.",
    "hint": "tell takes no arguments."
  },
  {
    "id": 16,
    "question": "Consider the code:\n```python\nf = open('data.txt', 'r+')\nf.seek(0, 2)\nsize = f.tell()\n```\nWhat does `size` represent?",
    "options": [
      "Total words in data.txt",
      "Total lines in data.txt",
      "Total byte size of data.txt",
      "Current memory address"
    ],
    "correctAnswer": 2,
    "explanation": "Moving to the end (`seek(0, 2)`) and querying `tell()` measures total physical bytes of the file.",
    "hint": "Total bytes."
  },
  {
    "id": 17,
    "question": "What is output by:\n```python\nf = open('test.txt', 'w+')\nf.write('Python')\nf.seek(0)\nprint(f.read(2))\n```",
    "options": [
      "'Py'",
      "'Python'",
      "''",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "After writing 'Python', `seek(0)` rewinds to byte 0; `read(2)` reads the first 2 characters ('Py').",
    "hint": "First two characters."
  },
  {
    "id": 18,
    "question": "What happens if you execute `f.read()` without calling `f.seek(0)` after writing to a file in 'w+' mode?",
    "options": [
      "Reads the file from start",
      "Returns '' (empty string) because pointer is already at the end",
      "Raises IOError",
      "Clears the file"
    ],
    "correctAnswer": 1,
    "explanation": "Writing advances the pointer to the end of the newly written text; reading without rewinding returns `''`.",
    "hint": "Pointer is at end."
  },
  {
    "id": 19,
    "question": "Which module provides constants `SEEK_SET`, `SEEK_CUR`, and `SEEK_END`?",
    "options": [
      "sys",
      "os",
      "io",
      "math"
    ],
    "correctAnswer": 1,
    "explanation": "The `os` module (as well as `io`) defines `os.SEEK_SET` (0), `os.SEEK_CUR` (1), and `os.SEEK_END` (2).",
    "hint": "os module."
  },
  {
    "id": 20,
    "question": "Consider: `f = open('doc.txt', 'rb')`. Executing `f.seek(-5, 2)` does what?",
    "options": [
      "Places pointer 5 bytes from the start",
      "Places pointer 5 bytes before the end of the file",
      "Raises ValueError",
      "Deletes 5 bytes"
    ],
    "correctAnswer": 1,
    "explanation": "In binary mode, negative offsets relative to end (`whence = 2`) move backwards from EOF.",
    "hint": "5 bytes before end."
  },
  {
    "id": 21,
    "question": "What is the return value of `f.seek(10)`?",
    "options": [
      "None",
      "The new absolute byte position (10)",
      "Boolean True",
      "String at byte 10"
    ],
    "correctAnswer": 1,
    "explanation": "`f.seek()` returns the new absolute byte position as an integer.",
    "hint": "Returns new position."
  },
  {
    "id": 22,
    "question": "Can `f.seek()` move the pointer past the end of a file?",
    "options": [
      "No, raises IndexError",
      "Yes, in many systems it creates a sparse file filled with null bytes upon subsequent write",
      "Only in read mode",
      "Only on optical discs"
    ],
    "correctAnswer": 1,
    "explanation": "Seeking past EOF is permitted in file systems; subsequent writes create sparse gaps containing null bytes.",
    "hint": "Sparse files allowed."
  },
  {
    "id": 23,
    "question": "Assertion (A): `f.seek(5)` is equivalent to `f.seek(5, 0)`.\nReason (R): The `whence` parameter defaults to `0` (beginning of the file).",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Because `whence` defaults to `0`, omitting it measures offset directly from the start.",
    "hint": "Default whence is 0."
  },
  {
    "id": 24,
    "question": "What error is raised if `f.tell()` is called on a closed file?",
    "options": [
      "ValueError: I/O operation on closed file",
      "FileNotFoundError",
      "PointerError",
      "AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "Calling methods on a closed file handle raises `ValueError: I/O operation on closed file`.",
    "hint": "I/O on closed file error."
  },
  {
    "id": 25,
    "question": "In a CBSE Class 12 board examination question: 'Differentiate between seek() and tell() methods.' Which summary is 100% accurate?",
    "options": [
      "tell() moves pointer; seek() reports position",
      "seek() repositions file pointer; tell() returns current byte position",
      "Both do the exact same thing",
      "seek() is only for binary; tell() is only for text"
    ],
    "correctAnswer": 1,
    "explanation": "`seek()` changes pointer location; `tell()` queries current pointer location.",
    "hint": "seek sets, tell gets."
  }
];

export default questions;
