// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "What happens if a non-existent file is opened with access mode 'r'?",
    "options": [
      "The file is automatically created empty",
      "Raises FileNotFoundError",
      "Creates a temporary swap file",
      "Opens in read-write mode"
    ],
    "correctAnswer": 1,
    "explanation": "Mode 'r' requires the target file to exist; if it does not, Python raises `FileNotFoundError`.",
    "hint": "Read mode demands existence."
  },
  {
    "id": 2,
    "question": "What happens to the existing data in a file when it is opened with access mode 'w'?",
    "options": [
      "New data is appended to the end",
      "Existing data is preserved and pointer set to start",
      "Existing content is completely erased (truncated to 0 bytes)",
      "Raises FileExistsError"
    ],
    "correctAnswer": 2,
    "explanation": "Mode 'w' truncates (overwrites) the file to zero bytes if it already exists, or creates it if it does not.",
    "hint": "w truncates everything."
  },
  {
    "id": 3,
    "question": "Where is the file pointer placed immediately upon opening an existing file in 'a' (append) mode?",
    "options": [
      "At the beginning (byte 0)",
      "In the exact middle of the file",
      "At the end of the file",
      "At byte index 1"
    ],
    "correctAnswer": 2,
    "explanation": "In append mode ('a'), the file pointer is placed at the end of the file so new writes preserve existing text.",
    "hint": "Append means add to the end."
  },
  {
    "id": 4,
    "question": "If a file does not exist, which of the following access modes will create a brand new file?",
    "options": [
      "'r'",
      "'r+'",
      "'w' and 'a'",
      "None of the above"
    ],
    "correctAnswer": 2,
    "explanation": "Both `'w'` (write) and `'a'` (append) automatically create the file if it does not already exist.",
    "hint": "Write and append create."
  },
  {
    "id": 5,
    "question": "What is the difference between 'r+' and 'w+' access modes?",
    "options": [
      "Both modes behave identically",
      "'r+' requires the file to exist and preserves existing data; 'w+' truncates existing data to 0 bytes",
      "'r+' creates a file if missing; 'w+' raises an error",
      "'r+' is only for binary files"
    ],
    "correctAnswer": 1,
    "explanation": "'r+' opens for reading and writing without truncation (error if missing); 'w+' truncates existing file to 0 bytes or creates it.",
    "hint": "w+ truncates existing data."
  },
  {
    "id": 6,
    "question": "Which mode allows both reading and writing, positions the file pointer at the end, and preserves existing content?",
    "options": [
      "'r+'",
      "'w+'",
      "'a+'",
      "'rw'"
    ],
    "correctAnswer": 2,
    "explanation": "'a+' opens for reading and appending; writes always append to the end, and seeks allow reading previous data.",
    "hint": "'a+' is append plus read."
  },
  {
    "id": 7,
    "question": "Assertion (A): Opening a file with mode 'w+' preserves existing content.\nReason (R): The '+' modifier always prevents data deletion.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 1,
    "explanation": "Both statements are false: 'w+' immediately truncates any existing file to 0 bytes upon opening.",
    "hint": "w+ truncates existing content."
  },
  {
    "id": 8,
    "question": "Consider: `f = open('data.txt', 'r+')`. The initial file content is `ABCDEF`. Executing `f.write('12')` and closing results in what file content?",
    "options": [
      "12ABCDEF",
      "12CDEF",
      "ABCDEF12",
      "12"
    ],
    "correctAnswer": 1,
    "explanation": "'r+' places pointer at byte 0; writing 2 characters overwrites 'AB' in place, leaving '12CDEF'.",
    "hint": "In-place overwrite at start."
  },
  {
    "id": 9,
    "question": "Which access mode is best suited for an application logging real-time server errors?",
    "options": [
      "'w'",
      "'r'",
      "'a'",
      "'r+'"
    ],
    "correctAnswer": 2,
    "explanation": "Append mode ('a') retains all historical error logs and adds new entries to the end of the file.",
    "hint": "Append retains history."
  },
  {
    "id": 10,
    "question": "In Python, which of the following is NOT a valid text file access mode?",
    "options": [
      "'r'",
      "'a+'",
      "'rw'",
      "'w+'"
    ],
    "correctAnswer": 2,
    "explanation": "'rw' is invalid in Python; use `'r+'` or `'w+'` instead.",
    "hint": "Python doesn't have 'rw'."
  },
  {
    "id": 11,
    "question": "What error occurs if you execute `f.write('Hello')` on a file opened with `f = open('doc.txt', 'r')`?",
    "options": [
      "ValueError",
      "io.UnsupportedOperation: not writable",
      "TypeError",
      "AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Writing to a read-only stream raises `io.UnsupportedOperation: not writable`.",
    "hint": "Not writable error."
  },
  {
    "id": 12,
    "question": "What error occurs if you execute `f.read()` on a file opened with `f = open('doc.txt', 'w')`?",
    "options": [
      "ValueError",
      "io.UnsupportedOperation: not readable",
      "FileNotFoundError",
      "EOFError"
    ],
    "correctAnswer": 1,
    "explanation": "Reading from a write-only stream raises `io.UnsupportedOperation: not readable`.",
    "hint": "Not readable error."
  },
  {
    "id": 13,
    "question": "What is the initial position of the file pointer in mode 'a+'?",
    "options": [
      "At the beginning (0)",
      "At the end of existing file",
      "At byte index -1",
      "Undefined"
    ],
    "correctAnswer": 1,
    "explanation": "In 'a+', the initial position is at the end of the file; calling `f.seek(0)` is necessary before reading from start.",
    "hint": "Append starts at end."
  },
  {
    "id": 14,
    "question": "If `data.txt` contains 100 bytes, what will `len(open('data.txt', 'w').read())` do?",
    "options": [
      "Return 100",
      "Return 0",
      "Raise io.UnsupportedOperation: not readable",
      "Raise FileNotFoundError"
    ],
    "correctAnswer": 2,
    "explanation": "Mode 'w' is write-only, so attempting to call `.read()` raises an unsupported operation exception.",
    "hint": "Cannot read in 'w' mode."
  },
  {
    "id": 15,
    "question": "What does the '+' symbol in file access modes indicate?",
    "options": [
      "The file is encrypted",
      "Both read and write operations are enabled on the stream",
      "The file is opened in binary mode",
      "The file size is incremented automatically"
    ],
    "correctAnswer": 1,
    "explanation": "The '+' flag enables simultaneous read and write capabilities.",
    "hint": "Plus means read + write."
  },
  {
    "id": 16,
    "question": "Which mode should be chosen to update an existing student record inside a text file without deleting other records?",
    "options": [
      "'w'",
      "'r+'",
      "'w+'",
      "'create'"
    ],
    "correctAnswer": 1,
    "explanation": "'r+' allows reading existing records and overwriting targeted bytes in place without initial truncation.",
    "hint": "Read-write without truncation."
  },
  {
    "id": 17,
    "question": "Consider: `f = open('story.txt', 'w')`. Then `f.write('Hello')`. Then `f.close()`. Later: `f = open('story.txt', 'w')`. `f.close()`. What does `story.txt` contain now?",
    "options": [
      "'Hello'",
      "Empty file (0 bytes)",
      "Raises FileExistsError",
      "'HelloHello'"
    ],
    "correctAnswer": 1,
    "explanation": "Re-opening in 'w' mode immediately truncates the file to 0 bytes.",
    "hint": "Re-opening in 'w' truncates."
  },
  {
    "id": 18,
    "question": "Which mode creates a new file if it doesn't exist AND raises an error if the file already exists?",
    "options": [
      "'a'",
      "'w'",
      "'x' (exclusive creation)",
      "'r+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode 'x' is exclusive creation; it fails with `FileExistsError` if the target file already exists.",
    "hint": "'x' for exclusive."
  },
  {
    "id": 19,
    "question": "In 'a' mode, if `f.seek(0)` is called followed by `f.write('X')`, where does 'X' get written on disk?",
    "options": [
      "At byte index 0",
      "At the very end of the file regardless of seek(0)",
      "At byte index 1",
      "Causes an OS crash"
    ],
    "correctAnswer": 1,
    "explanation": "In standard append mode, all write operations are forced by the OS to append to the end of the file.",
    "hint": "Writes in append mode always append."
  },
  {
    "id": 20,
    "question": "Assertion (A): 'r+' mode will create the file if it does not exist.\nReason (R): 'r+' includes write capabilities indicated by '+'.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is false but R is true",
      "A is true but R is false"
    ],
    "correctAnswer": 2,
    "explanation": "A is false: 'r+' does NOT create a file if missing (raises `FileNotFoundError`). R is true: '+' denotes read-write capability.",
    "hint": "r+ requires existing file."
  },
  {
    "id": 21,
    "question": "Which access mode requires the file to exist beforehand?",
    "options": [
      "'w'",
      "'a'",
      "'r'",
      "'w+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'r'` (and `'r+'`) requires the file to exist; all others create the file if missing.",
    "hint": "Read mode requires file."
  },
  {
    "id": 22,
    "question": "What is the return value of `f.mode` for `f = open('log.txt', 'a+')`?",
    "options": [
      "'append_read'",
      "'a+'",
      "'+a'",
      "True"
    ],
    "correctAnswer": 1,
    "explanation": "`f.mode` returns the string passed as the mode argument, `'a+'`.",
    "hint": "Exact string 'a+'."
  },
  {
    "id": 23,
    "question": "What does 'truncation' mean in file handling?",
    "options": [
      "Splitting a file into 2 pieces",
      "Reducing file size to zero bytes by discarding all existing data",
      "Converting text to binary",
      "Encrypting file bytes"
    ],
    "correctAnswer": 1,
    "explanation": "Truncation empties the file completely, resetting its length to 0 bytes.",
    "hint": "Wiping to zero bytes."
  },
  {
    "id": 24,
    "question": "Which of the following is the default mode when opening a file in Python?",
    "options": [
      "'w'",
      "'r'",
      "'a'",
      "'r+'"
    ],
    "correctAnswer": 1,
    "explanation": "The default mode is `'r'` (read text).",
    "hint": "Read mode."
  },
  {
    "id": 25,
    "question": "In a CBSE exam question: 'Write a Python program to add a new record to an existing employee file without losing previous data'. Which mode must be used?",
    "options": [
      "'r'",
      "'w'",
      "'a'",
      "'w+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'a'` appends new data to the end of the existing file without erasing prior records.",
    "hint": "'a' for appending records."
  }
];

export default questions;
