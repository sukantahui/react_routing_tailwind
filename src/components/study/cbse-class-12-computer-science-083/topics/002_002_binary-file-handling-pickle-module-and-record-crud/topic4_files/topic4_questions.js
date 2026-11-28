// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "Which binary access mode is used for reading pickled records from an existing file?",
    "options": [
      "'r'",
      "'rb'",
      "'read_binary'",
      "'b'"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'rb'` opens an existing binary file for read-only operations.",
    "hint": "'rb' mode."
  },
  {
    "id": 2,
    "question": "What happens if a non-existent file is opened with access mode 'rb'?",
    "options": [
      "The file is created empty",
      "Raises FileNotFoundError",
      "Raises EOFError",
      "Creates temporary swap file"
    ],
    "correctAnswer": 1,
    "explanation": "Like `'r'`, mode `'rb'` requires the file to exist; otherwise it raises `FileNotFoundError`.",
    "hint": "FileNotFoundError if missing."
  },
  {
    "id": 3,
    "question": "What happens to existing records in a file if it is opened with mode 'wb'?",
    "options": [
      "New records are appended to the end",
      "Existing data is completely erased (truncated to 0 bytes)",
      "File remains locked",
      "Raises FileExistsError"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'wb'` truncates existing binary files to 0 bytes or creates the file if it does not exist.",
    "hint": "Wipes to zero bytes."
  },
  {
    "id": 4,
    "question": "Where is the file pointer placed upon opening an existing file in 'ab' mode?",
    "options": [
      "At byte 0 (beginning)",
      "In the middle",
      "At the very end of the file",
      "At byte index -1"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'ab'` positions the cursor at the end of the file, preserving all previously dumped records.",
    "hint": "End of file."
  },
  {
    "id": 5,
    "question": "What is the key difference between 'rb+' and 'wb+' binary access modes?",
    "options": [
      "'rb+' requires the file to exist and preserves existing bytes; 'wb+' truncates existing data to 0 bytes upon opening",
      "Both modes are identical",
      "'rb+' creates a file if missing; 'wb+' raises an error",
      "'rb+' only works on text files"
    ],
    "correctAnswer": 0,
    "explanation": "'rb+' allows read/write on an existing file without truncation; 'wb+' truncates any existing data to zero bytes immediately.",
    "hint": "rb+ preserves; wb+ truncates."
  },
  {
    "id": 6,
    "question": "Which binary access mode allows reading and writing, creates the file if missing, and always appends writes to the end?",
    "options": [
      "'rb+'",
      "'wb+'",
      "'ab+'",
      "'rw'"
    ],
    "correctAnswer": 2,
    "explanation": "'ab+' enables both reading and writing while ensuring writes always append to the end.",
    "hint": "'ab+' mode."
  },
  {
    "id": 7,
    "question": "Assertion (A): In binary mode 'rb+', calling `f.seek(0)` allows reading from the start after writing.\nReason (R): Binary mode handles arbitrary seek offsets without Python 3 text mode restrictions.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Binary mode allows full random access (seeking from 0, 1, or 2) with exact byte offsets.",
    "hint": "Full random access in binary."
  },
  {
    "id": 8,
    "question": "In Python, which of the following is NOT a valid binary access mode?",
    "options": [
      "'rb'",
      "'wb+'",
      "'br'",
      "'bw+' (all combinations of b and r/w/a/+ are valid)"
    ],
    "correctAnswer": 3,
    "explanation": "Python accepts both `'rb'` and `'br'`, `'wb'` and `'bw'`, etc. All are valid.",
    "hint": "Order of 'b' is flexible."
  },
  {
    "id": 9,
    "question": "Which mode must be chosen when writing an update function that rewrites a specific record in-place in a binary file?",
    "options": [
      "'wb'",
      "'ab'",
      "'rb+'",
      "'r'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'rb+'` allows reading records to locate the target, seeking back to its start, and overwriting the record in-place.",
    "hint": "'rb+' for in-place updates."
  },
  {
    "id": 10,
    "question": "What error occurs if you try `f.write(b'data')` on a file opened with `open('data.dat', 'rb')`?",
    "options": [
      "io.UnsupportedOperation: not writable",
      "ValueError",
      "TypeError",
      "EOFError"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'rb'` is read-only, so writing raises `io.UnsupportedOperation: not writable`.",
    "hint": "Not writable error."
  },
  {
    "id": 11,
    "question": "Consider: `f = open('test.dat', 'ab')`. After `f.seek(0)`, `pickle.dump({'x': 1}, f)` is executed. Where is the record written?",
    "options": [
      "At byte 0",
      "At the very end of the file regardless of seek(0)",
      "At byte 1",
      "Raises SeekError"
    ],
    "correctAnswer": 1,
    "explanation": "In append mode, OS kernel specifications mandate that all write operations append to the end of the file.",
    "hint": "Append writes always go to end."
  },
  {
    "id": 12,
    "question": "How many binary access modes exist in Python?",
    "options": [
      "3 ('rb', 'wb', 'ab')",
      "6 ('rb', 'wb', 'ab', 'rb+', 'wb+', 'ab+')",
      "2 ('r', 'w')",
      "8"
    ],
    "correctAnswer": 1,
    "explanation": "There are 6 standard binary access modes: `'rb'`, `'wb'`, `'ab'`, `'rb+''`, `'wb+'`, and `'ab+'`.",
    "hint": "6 binary modes."
  },
  {
    "id": 13,
    "question": "What does `f.readable()` return for `f = open('student.dat', 'ab')`?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'ab'` is append-only, so `f.readable()` returns `False`.",
    "hint": "False for append mode."
  },
  {
    "id": 14,
    "question": "What does `f.writable()` return for `f = open('student.dat', 'ab')`?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'ab'` allows writing/appending, so `f.writable()` evaluates to `True`.",
    "hint": "True for append mode."
  },
  {
    "id": 15,
    "question": "Consider: `f = open('data.dat', 'wb')`. Initial file size was 500 bytes. What is `os.path.getsize('data.dat')` immediately after open?",
    "options": [
      "500 bytes",
      "0 bytes",
      "250 bytes",
      "Raises FileNotFoundError"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'wb'` truncates the file immediately upon opening, resetting its size to 0 bytes.",
    "hint": "Reset to 0 bytes."
  },
  {
    "id": 16,
    "question": "Which mode creates a new binary file only if it does not already exist, raising FileExistsError if it does?",
    "options": [
      "'xb'",
      "'wb'",
      "'ab'",
      "'rb+'"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'xb'` is exclusive binary creation; it fails if the file already exists.",
    "hint": "'xb' for exclusive binary."
  },
  {
    "id": 17,
    "question": "Assertion (A): Opening a file in `'ab+'` mode places the initial read pointer at the end of the file.\nReason (R): In append modes, the file cursor starts at the end, requiring `f.seek(0)` before reading from the beginning.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "In `'ab+'`, the pointer starts at EOF; calling `seek(0)` is mandatory before reading prior records.",
    "hint": "Pointer starts at EOF in ab+."
  },
  {
    "id": 18,
    "question": "What is output by:\n```python\nf = open('temp.dat', 'wb+')\nf.write(b'PYTHON')\nprint(f.tell())\n```",
    "options": [
      "0",
      "6",
      "1",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Writing 6 raw bytes advances the file pointer by 6 bytes, so `tell()` returns 6.",
    "hint": "6 bytes written."
  },
  {
    "id": 19,
    "question": "In a CBSE exam question: 'Which mode should be used to display records from student.dat and also allow appending new records?'. What is the correct mode?",
    "options": [
      "'ab+'",
      "'rb'",
      "'wb'",
      "'w+'"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'ab+'` allows reading existing records (via `f.seek(0)`) and appending new records at the end.",
    "hint": "'ab+' enables both."
  },
  {
    "id": 20,
    "question": "What happens if `f.seek(-5, 2)` is called on a file opened in mode 'rb' with size 20 bytes?",
    "options": [
      "Moves pointer to byte 15 (5 bytes before EOF)",
      "Raises io.UnsupportedOperation",
      "Moves pointer to byte 5",
      "Deletes 5 bytes"
    ],
    "correctAnswer": 0,
    "explanation": "In binary mode, negative seeks relative to end (`whence=2`) are fully supported: 20 - 5 = 15.",
    "hint": "20 - 5 = 15."
  },
  {
    "id": 21,
    "question": "What error occurs if `open('new.dat', 'rb+')` is called when `new.dat` does not exist?",
    "options": [
      "FileNotFoundError",
      "FileExistsError",
      "EOFError",
      "ModeError"
    ],
    "correctAnswer": 0,
    "explanation": "'rb+' requires the file to exist beforehand; missing file triggers `FileNotFoundError`.",
    "hint": "rb+ requires file to exist."
  },
  {
    "id": 22,
    "question": "What does the 'b' in 'wb' signify to the operating system?",
    "options": [
      "Buffered mode",
      "Binary mode (bypass newline translation and raw byte transfer)",
      "Block mode",
      "Bytecode mode"
    ],
    "correctAnswer": 1,
    "explanation": "'b' specifies binary mode, preventing newline conversions and character decoding.",
    "hint": "Binary mode."
  },
  {
    "id": 23,
    "question": "Consider: `f = open('scores.dat', 'rb')`. What is `type(f.read(1))`?",
    "options": [
      "<class 'str'>",
      "<class 'bytes'>",
      "<class 'int'>",
      "<class 'bytearray'>"
    ],
    "correctAnswer": 1,
    "explanation": "Binary file reads always return objects of type `bytes`.",
    "hint": "bytes type."
  },
  {
    "id": 24,
    "question": "In a practical examination: 'Write a program to display the record of student with roll number 101'. Which mode is safest to prevent accidental modification?",
    "options": [
      "'wb'",
      "'ab'",
      "'rb'",
      "'rb+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'rb'` is read-only, preventing any accidental file modification or truncation.",
    "hint": "Read-only 'rb'."
  },
  {
    "id": 25,
    "question": "What is the consequence of opening `student.dat` in `'wb'` mode instead of `'ab'` in an insert function?",
    "options": [
      "All previously existing student records are destroyed and permanently lost!",
      "Records are sorted",
      "File is duplicated",
      "No consequence"
    ],
    "correctAnswer": 0,
    "explanation": "Using `'wb'` truncates the file, destroying all previously accumulated records.",
    "hint": "Catastrophic truncation."
  }
];

export default questions;
