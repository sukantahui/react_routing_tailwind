// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "What is the return value of `f.read()` when the file pointer is at EOF?",
    "options": [
      "None",
      "'' (empty string)",
      "False",
      "Raises EOFError"
    ],
    "correctAnswer": 1,
    "explanation": "In Python text file operations, reading past EOF returns an empty string `''`.",
    "hint": "Empty string."
  },
  {
    "id": 2,
    "question": "Which file access mode empties the file completely the instant `open()` is called?",
    "options": [
      "'r+'",
      "'w'",
      "'a'",
      "'r'"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'w'` immediately truncates the file to 0 bytes upon opening.",
    "hint": "Truncates to zero bytes."
  },
  {
    "id": 3,
    "question": "What happens if `f.seek(5, 1)` is called on a text file opened in mode 'r' in Python 3?",
    "options": [
      "Advances 5 bytes",
      "Raises io.UnsupportedOperation: can't do nonzero cur-relative seeks",
      "Rewinds to 5",
      "Returns None"
    ],
    "correctAnswer": 1,
    "explanation": "Python 3 text mode disallows non-zero seeks from current position (`whence=1`).",
    "hint": "Unsupported operation in text mode."
  },
  {
    "id": 4,
    "question": "Which method tells you the current byte position of the file cursor?",
    "options": [
      "f.seek()",
      "f.tell()",
      "f.pos()",
      "f.cursor()"
    ],
    "correctAnswer": 1,
    "explanation": "`f.tell()` queries and returns the current integer byte offset.",
    "hint": "tell method."
  },
  {
    "id": 5,
    "question": "Does `f.writelines(['Cat', 'Dog'])` place a newline between 'Cat' and 'Dog' on disk?",
    "options": [
      "Yes, automatically",
      "No, it writes 'CatDog' concatenated",
      "Only if opened in write mode",
      "Only on Windows"
    ],
    "correctAnswer": 1,
    "explanation": "`writelines()` never inserts delimiters; elements must already contain `'\\n'`.",
    "hint": "No automatic delimiters."
  },
  {
    "id": 6,
    "question": "Which keyword guarantees automatic file closure even if an exception crashes the program?",
    "options": [
      "try",
      "with",
      "finally",
      "except"
    ],
    "correctAnswer": 1,
    "explanation": "The `with` statement utilizes the Context Manager Protocol to guarantee file closure.",
    "hint": "with statement."
  },
  {
    "id": 7,
    "question": "What exception is raised if `open('missing.txt', 'r')` is called for a non-existent file?",
    "options": [
      "FileNotFoundError",
      "FileExistsError",
      "IOError",
      "ModeError"
    ],
    "correctAnswer": 0,
    "explanation": "Opening a missing file in `'r'` mode raises `FileNotFoundError`.",
    "hint": "File is not found."
  },
  {
    "id": 8,
    "question": "What does `len(f.readlines())` measure for an open file?",
    "options": [
      "Total words",
      "Total lines",
      "Total characters",
      "Total bytes"
    ],
    "correctAnswer": 1,
    "explanation": "`readlines()` returns a list of line strings; `len()` gives the count of lines.",
    "hint": "Number of lines."
  },
  {
    "id": 9,
    "question": "What does `len(f.read())` measure for an open file?",
    "options": [
      "Total lines",
      "Total words",
      "Total characters (including spaces and newlines)",
      "File descriptor integer"
    ],
    "correctAnswer": 2,
    "explanation": "`read()` returns the full string; `len()` gives the total character count.",
    "hint": "Total characters."
  },
  {
    "id": 10,
    "question": "In `f.seek(offset, whence)`, what does `whence = 2` specify?",
    "options": [
      "Offset relative to beginning",
      "Offset relative to current position",
      "Offset relative to the end of the file",
      "Offset relative to line 2"
    ],
    "correctAnswer": 2,
    "explanation": "`whence = 2` measures distance relative to the terminal byte (EOF).",
    "hint": "End of file."
  },
  {
    "id": 11,
    "question": "What is the result of `f.closed` inside an active `with open('a.txt') as f:` block?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Inside the active block, the file handle is currently open, so `f.closed` is `False`.",
    "hint": "False while open."
  },
  {
    "id": 12,
    "question": "What is the result of `f.closed` immediately after exiting the `with` block?",
    "options": [
      "True",
      "False",
      "None",
      "Raises ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "Upon exiting the block, the context manager automatically closes the file, making `f.closed` True.",
    "hint": "True after block exit."
  },
  {
    "id": 13,
    "question": "Which mode should you use to append a new log entry to `system.log` without erasing prior entries?",
    "options": [
      "'w'",
      "'r+'",
      "'a'",
      "'w+'"
    ],
    "correctAnswer": 2,
    "explanation": "Append mode `'a'` preserves all previous records and places new writes at the end.",
    "hint": "'a' for append."
  },
  {
    "id": 14,
    "question": "How do you count words in a text file accurately in CBSE board questions?",
    "options": [
      "f.read().count(' ')",
      "len(f.read().split())",
      "len(f.readlines())",
      "f.readline().count()"
    ],
    "correctAnswer": 1,
    "explanation": "`len(f.read().split())` tokenizes whitespace correctly, counting total words.",
    "hint": "len of read().split()."
  },
  {
    "id": 15,
    "question": "What is printed by:\n```python\nf = open('test.txt', 'w')\nf.write('Hello\\nWorld')\nf.close()\nf = open('test.txt', 'r')\nprint(f.readline())\n```",
    "options": [
      "'Hello'",
      "'Hello\\n'",
      "'World'",
      "['Hello']"
    ],
    "correctAnswer": 1,
    "explanation": "`readline()` preserves the trailing newline character, printing `'Hello\\n'`.",
    "hint": "Preserves trailing newline."
  },
  {
    "id": 16,
    "question": "What error occurs if you try `f.write(500)` on a text file?",
    "options": [
      "TypeError",
      "ValueError",
      "AttributeError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Text streams require string arguments; passing an int raises `TypeError`.",
    "hint": "TypeError."
  },
  {
    "id": 17,
    "question": "What does `ch.lower() in 'aeiou'` check?",
    "options": [
      "If character is a consonant",
      "If character is an alphabetic vowel (A, E, I, O, U)",
      "If character is a digit",
      "If character is punctuation"
    ],
    "correctAnswer": 1,
    "explanation": "Converting to lowercase and testing membership in `'aeiou'` checks for vowels.",
    "hint": "Vowel test."
  },
  {
    "id": 18,
    "question": "What does `os.remove('doc.txt')` do?",
    "options": [
      "Clears the text inside doc.txt",
      "Permanently deletes doc.txt from the filesystem",
      "Renames doc.txt",
      "Closes doc.txt"
    ],
    "correctAnswer": 1,
    "explanation": "`os.remove()` deletes the physical file from secondary storage.",
    "hint": "Deletes file from disk."
  },
  {
    "id": 19,
    "question": "What does `line.rstrip('\\n')` do?",
    "options": [
      "Removes all spaces from line",
      "Removes trailing newline '\\n' character from the right end of the string",
      "Splits line into a list",
      "Reverses the line"
    ],
    "correctAnswer": 1,
    "explanation": "`rstrip('\\n')` strips trailing newline characters cleanly.",
    "hint": "Strips newline from right."
  },
  {
    "id": 20,
    "question": "Consider: `f = open('data.txt', 'r+')`. Initial content is `'ABCDEF'`. After `f.write('99')`, what is in `data.txt`?",
    "options": [
      "'99ABCDEF'",
      "'99CDEF'",
      "'ABCDEF99'",
      "'99'"
    ],
    "correctAnswer": 1,
    "explanation": "'r+' starts at byte 0 and overwrites in-place: 'AB' becomes '99', leaving '99CDEF'.",
    "hint": "In-place overwrite at start."
  },
  {
    "id": 21,
    "question": "Which mode creates the file if it does not exist, AND truncates it if it does?",
    "options": [
      "'r+'",
      "'w+'",
      "'a+'",
      "'r'"
    ],
    "correctAnswer": 1,
    "explanation": "'w+' creates if missing and truncates existing content to 0 bytes upon opening.",
    "hint": "w+ creates and truncates."
  },
  {
    "id": 22,
    "question": "What does `f.readable()` return for `f = open('scores.txt', 'w')`?",
    "options": [
      "True",
      "False",
      "None",
      "Raises ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "Write mode is not readable, so `f.readable()` evaluates to `False`.",
    "hint": "False for write mode."
  },
  {
    "id": 23,
    "question": "How can you check if `line` starts with 'T' safely without risking IndexError on empty lines?",
    "options": [
      "line[0] == 'T'",
      "line.startswith('T')",
      "line.find('T') == 0",
      "Both Option 2 and Option 3"
    ],
    "correctAnswer": 3,
    "explanation": "`line.startswith('T')` safely returns False on empty strings without throwing an exception.",
    "hint": "startswith handles empty strings."
  },
  {
    "id": 24,
    "question": "In Python file handling, what is an atomic file rename?",
    "options": [
      "A rename that cannot be interrupted halfway, replacing target in one step (e.g. os.replace)",
      "Splitting atoms in CPU",
      "Writing to a nuclear database",
      "Creating an empty folder"
    ],
    "correctAnswer": 0,
    "explanation": "Atomic operations complete fully or not at all, preventing half-written file states.",
    "hint": "All-or-nothing file rename."
  },
  {
    "id": 25,
    "question": "What score percentage indicates solid mastery of CBSE Class 12 Text File Handling?",
    "options": [
      "50%",
      "75%",
      "90% or higher",
      "100% only"
    ],
    "correctAnswer": 2,
    "explanation": "Achieving 90%+ demonstrates thorough readiness for CBSE Class 12 CS Unit I theory and practical examinations.",
    "hint": "Aim for 90% or higher."
  }
];

export default questions;
