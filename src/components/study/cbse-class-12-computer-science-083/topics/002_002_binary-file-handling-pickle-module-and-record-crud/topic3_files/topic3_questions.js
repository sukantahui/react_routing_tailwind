// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "What exception is raised by `pickle.load()` when it attempts to read beyond the End of File (EOF)?",
    "options": [
      "FileNotFoundError",
      "EOFError",
      "StopIteration",
      "ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle.load()` raises the built-in `EOFError` exception upon encountering the end of the binary file stream.",
    "hint": "End of File Error."
  },
  {
    "id": 2,
    "question": "How does Python detect EOF in text files vs binary pickled files?",
    "options": [
      "Text files return '' (empty string); pickle.load() raises EOFError",
      "Text files raise EOFError; pickle.load() returns None",
      "Both return ''",
      "Both raise StopIteration"
    ],
    "correctAnswer": 0,
    "explanation": "Text reading methods return an empty string `''` at EOF; `pickle.load()` explicitly raises `EOFError`.",
    "hint": "Empty string vs EOFError."
  },
  {
    "id": 3,
    "question": "What is the canonical loop structure used in CBSE Class 12 CS to read all records from a binary file?",
    "options": [
      "try: while True: rec = pickle.load(f); print(rec) except EOFError: pass",
      "for rec in pickle.load(f): print(rec)",
      "while not f.eof(): rec = pickle.load(f)",
      "for line in f: pickle.load(line)"
    ],
    "correctAnswer": 0,
    "explanation": "The standard pattern uses an infinite `while True` loop inside a `try ... except EOFError:` block.",
    "hint": "try-while-except EOFError."
  },
  {
    "id": 4,
    "question": "What is the return value of `pickle.load(f)`?",
    "options": [
      "A bytes object",
      "The exact deserialized Python object that was originally pickled",
      "A string representation",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle.load()` unpacks the byte stream and returns the original Python object (dictionary, list, tuple, etc.).",
    "hint": "Reconstructed Python object."
  },
  {
    "id": 5,
    "question": "What error occurs if you call `pickle.load(f)` on a file opened with mode `open('data.dat', 'wb')`?",
    "options": [
      "io.UnsupportedOperation: not readable",
      "EOFError",
      "TypeError",
      "ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "Opening in `'wb'` is write-only; attempting to read raises `io.UnsupportedOperation: not readable`.",
    "hint": "Stream is not readable."
  },
  {
    "id": 6,
    "question": "Consider a file containing 4 sequentially pickled student records. How many times will `pickle.load(f)` execute successfully before raising `EOFError`?",
    "options": [
      "1 time",
      "4 times",
      "5 times",
      "Infinite times"
    ],
    "correctAnswer": 1,
    "explanation": "It will successfully load the 4 records; the 5th attempt finds no data and raises `EOFError`.",
    "hint": "One call per dumped record."
  },
  {
    "id": 7,
    "question": "What happens if an unhandled `EOFError` is raised in a program?",
    "options": [
      "The program ignores it",
      "The program terminates abruptly with a traceback crash",
      "The file resets to byte 0",
      "Data is erased"
    ],
    "correctAnswer": 1,
    "explanation": "Unhandled exceptions cause process termination; enclosing in `try ... except EOFError:` prevents crashing.",
    "hint": "Unhandled exception crashes script."
  },
  {
    "id": 8,
    "question": "In the `try ... except EOFError:` pattern, why is `pass` commonly written inside the `except` block?",
    "options": [
      "To suppress the exception cleanly when all records have been processed",
      "To re-raise the error",
      "To delete the file",
      "To reset the pointer"
    ],
    "correctAnswer": 0,
    "explanation": "Reaching EOF is the expected normal exit condition for reading sequential binary records; `pass` handles it gracefully.",
    "hint": "Clean normal exit."
  },
  {
    "id": 9,
    "question": "Which file access mode must be used when opening a binary file to read records with `pickle.load()`?",
    "options": [
      "'r'",
      "'rb'",
      "'w'",
      "'rb+'"
    ],
    "correctAnswer": 1,
    "explanation": "Read binary mode `'rb'` is required to read pickled streams from disk.",
    "hint": "'rb' mode."
  },
  {
    "id": 10,
    "question": "Assertion (A): `pickle.load()` can read data from a file opened in text mode `'r'`.\nReason (R): Text streams automatically convert bytes to characters.",
    "options": [
      "Both A and R are true",
      "Both A and R are false",
      "A is false but R is true",
      "A is true but R is false"
    ],
    "correctAnswer": 1,
    "explanation": "Both are false: `pickle.load()` requires binary mode (`'rb'`). Passing a text stream raises `UnpicklingError` or `TypeError`.",
    "hint": "Binary mode is mandatory."
  },
  {
    "id": 11,
    "question": "Consider the code:\n```python\nimport pickle\nwith open('student.dat', 'rb') as f:\n    try:\n        while True:\n            rec = pickle.load(f)\n            if rec['marks'] > 90:\n                print(rec['name'])\n    except EOFError:\n        pass\n```\nWhat does this function display?",
    "options": [
      "All students",
      "Names of students whose marks exceed 90",
      "Total marks of all students",
      "Only the first student"
    ],
    "correctAnswer": 1,
    "explanation": "It traverses all records and filters students with `marks > 90`.",
    "hint": "Filters students with marks > 90."
  },
  {
    "id": 12,
    "question": "What happens if `pickle.load()` is executed on an empty (0-byte) file?",
    "options": [
      "Returns None",
      "Immediately raises EOFError",
      "Returns an empty dictionary {}",
      "Creates a dummy record"
    ],
    "correctAnswer": 1,
    "explanation": "Since there is zero data to read, `pickle.load()` immediately raises `EOFError`.",
    "hint": "EOFError on empty file."
  },
  {
    "id": 13,
    "question": "Can `pickle.load()` read objects pickled with different protocols in Python 3?",
    "options": [
      "No, protocol must match exactly",
      "Yes, pickle.load() automatically detects the protocol version used during pickling",
      "Only protocols 0 and 1",
      "Only on Linux"
    ],
    "correctAnswer": 1,
    "explanation": "The pickle format embeds protocol headers, enabling `pickle.load()` to parse protocols 0 through 5 automatically.",
    "hint": "Automatic protocol detection."
  },
  {
    "id": 14,
    "question": "Where is the file pointer positioned after `pickle.load(f)` reads one object?",
    "options": [
      "At byte 0",
      "Immediately after the end of the byte stream of that deserialized object",
      "At EOF",
      "Undefined"
    ],
    "correctAnswer": 1,
    "explanation": "The pointer advances past the consumed bytes, ready to read the subsequent pickled record.",
    "hint": "Advances past the loaded object."
  },
  {
    "id": 15,
    "question": "Consider: `f.seek(0)`. What effect does this have on subsequent `pickle.load(f)` calls?",
    "options": [
      "Causes EOFError",
      "Rewinds pointer to start, causing the next pickle.load(f) to re-read the first record",
      "Deletes the first record",
      "Has no effect on pickle"
    ],
    "correctAnswer": 1,
    "explanation": "Rewinding the file handle moves the read head back to byte 0, reloading from the initial record.",
    "hint": "Reloads from first record."
  },
  {
    "id": 16,
    "question": "What exception is raised if `student.dat` does not exist when opening with `open('student.dat', 'rb')`?",
    "options": [
      "EOFError",
      "FileNotFoundError",
      "IOError",
      "PicklingError"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'rb'` requires the file to exist; if missing, it raises `FileNotFoundError`.",
    "hint": "FileNotFoundError."
  },
  {
    "id": 17,
    "question": "In a CBSE board question: 'Write a function count_records(fname) that returns the total number of student records stored in fname'. What is the standard implementation?",
    "options": [
      "count = 0; with open(fname, 'rb') as f: try: while True: pickle.load(f); count += 1 except EOFError: return count",
      "return len(f.readlines())",
      "return os.path.getsize(fname)",
      "return pickle.count(fname)"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating with `pickle.load()` and incrementing `count` until `EOFError` accurately counts dumped objects.",
    "hint": "Increment count until EOFError."
  },
  {
    "id": 18,
    "question": "What occurs if `student.dat` was corrupted (e.g. truncated halfway through an object byte stream)?",
    "options": [
      "Returns partial object",
      "Raises pickle.UnpicklingError (or EOFError)",
      "Python repairs it",
      "Skips corrupted byte"
    ],
    "correctAnswer": 1,
    "explanation": "Malformed byte sequences cause `pickle.UnpicklingError` or premature `EOFError`.",
    "hint": "UnpicklingError."
  },
  {
    "id": 19,
    "question": "Is it possible to use `for rec in f:` directly on a binary file to iterate pickled objects?",
    "options": [
      "Yes, seamlessly",
      "No, iterating over f in binary mode yields raw byte lines (delimited by newline bytes), not deserialized objects!",
      "Only if opened in 'rb+'",
      "Only with lists"
    ],
    "correctAnswer": 1,
    "explanation": "`for line in f:` in binary mode reads raw chunks up to `b'\\n'`, not pickled objects. Must use `pickle.load(f)` in a loop.",
    "hint": "Iterating f yields raw bytes, not objects."
  },
  {
    "id": 20,
    "question": "Assertion (A): The `try ... except EOFError:` block should be placed outside the `while True` loop.\nReason (R): Placing it outside allows the loop to terminate cleanly when EOF is encountered.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Placing `try` outside `while True` cleanly catches `EOFError` and breaks loop execution.",
    "hint": "try wraps the while loop."
  },
  {
    "id": 21,
    "question": "What happens if `try ... except EOFError:` is placed INSIDE the `while True:` loop?",
    "options": [
      "The loop becomes infinite because except handles EOFError and the loop continues trying to load past EOF!",
      "The loop runs faster",
      "SyntaxError",
      "Automatic file close"
    ],
    "correctAnswer": 0,
    "explanation": "If `try/except` is inside the loop and doesn't break, the loop will continuously trigger `EOFError` forever!",
    "hint": "Infinite loop trap!"
  },
  {
    "id": 22,
    "question": "Consider:\n```python\nwith open('data.dat', 'rb') as f:\n    while True:\n        try:\n            rec = pickle.load(f)\n        except EOFError:\n            break\n```\nIs this alternative pattern valid?",
    "options": [
      "Yes, placing break in the except block safely exits the while loop",
      "No, break is forbidden in except",
      "Raises RuntimeError",
      "Only on Mac"
    ],
    "correctAnswer": 0,
    "explanation": "Putting `break` inside the `except EOFError` block is a valid alternative to terminate the loop.",
    "hint": "break in except terminates loop."
  },
  {
    "id": 23,
    "question": "What is printed if `f.tell()` is called immediately after `pickle.load(f)` raises `EOFError`?",
    "options": [
      "0",
      "The total byte size of the file (EOF)",
      "-1",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "The pointer is at the very end of the file, matching the total file size.",
    "hint": "Pointer at EOF."
  },
  {
    "id": 24,
    "question": "In a CBSE 3-mark question: 'Write a function display_all() to display all records from student.dat'. How many marks are typically deducted if EOFError handling is omitted?",
    "options": [
      "0 marks",
      "1 full mark",
      "Full 3 marks",
      "1/2 mark"
    ],
    "correctAnswer": 1,
    "explanation": "Omitting `try ... except EOFError` causes runtime crashes, typically resulting in a 1-mark deduction.",
    "hint": "1 mark deduction for missing EOFError."
  },
  {
    "id": 25,
    "question": "Why doesn't `pickle.load()` return `None` at EOF instead of raising an exception?",
    "options": [
      "Because None is a valid Python object that could have been pickled into the file!",
      "Because Python developers forgot to add it",
      "Because binary files have no end",
      "Because None is for strings only"
    ],
    "correctAnswer": 0,
    "explanation": "Since `pickle.dump(None, f)` is completely legal, returning `None` at EOF would be ambiguous. An exception guarantees clarity.",
    "hint": "None could be a pickled value."
  }
];

export default questions;
