// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "Why is a master reference laboratory script valuable for CBSE Class 12 Computer Science students?",
    "options": [
      "It consolidates all required binary file CRUD operations (dump, load, EOFError, search, update, delete) into an executable reference file",
      "It replaces Python IDLE",
      "It only works during board exams",
      "It converts Python to C++"
    ],
    "correctAnswer": 0,
    "explanation": "A master script brings together all syllabus operations, demonstrating exact syntax, exception handling, and expected outputs in one unified codebase.",
    "hint": "Consolidates all syllabus operations."
  },
  {
    "id": 2,
    "question": "Which file format is standard for CBSE Class 12 binary file storage?",
    "options": [
      ".dat",
      ".txt",
      ".csv",
      ".json"
    ],
    "correctAnswer": 0,
    "explanation": "`.dat` is the official standard extension for serialized binary files in CBSE board examinations.",
    "hint": ".dat extension."
  },
  {
    "id": 3,
    "question": "Which Python module is imported at the top of every binary file script in the CBSE curriculum?",
    "options": [
      "pickle",
      "csv",
      "os",
      "math"
    ],
    "correctAnswer": 0,
    "explanation": "The `pickle` module provides `dump()` and `load()` for binary serialization.",
    "hint": "pickle module."
  },
  {
    "id": 4,
    "question": "What is the standard binary access mode for appending new records without overwriting?",
    "options": [
      "'ab'",
      "'wb'",
      "'rb'",
      "'w+'"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'ab'` appends new pickled objects to the end of the existing file.",
    "hint": "'ab' mode."
  },
  {
    "id": 5,
    "question": "What is the standard binary access mode for reading records?",
    "options": [
      "'rb'",
      "'wb'",
      "'r'",
      "'ab'"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'rb'` opens the binary file in read-only mode.",
    "hint": "'rb' mode."
  },
  {
    "id": 6,
    "question": "Which exception must always be handled when reading sequential pickled objects to EOF?",
    "options": [
      "EOFError",
      "ValueError",
      "KeyError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.load()` raises `EOFError` when all records have been read.",
    "hint": "EOFError."
  },
  {
    "id": 7,
    "question": "What two functions from the `os` module are essential for the temporary file update/delete pattern?",
    "options": [
      "os.remove() and os.rename()",
      "os.copy() and os.paste()",
      "os.open() and os.close()",
      "os.read() and os.write()"
    ],
    "correctAnswer": 0,
    "explanation": "`os.remove(old)` purges the outdated file, and `os.rename(temp, old)` promotes the temporary file.",
    "hint": "remove and rename."
  },
  {
    "id": 8,
    "question": "Why must file handles be closed before executing `os.remove()` and `os.rename()` on Windows?",
    "options": [
      "Because Windows locks open files, raising PermissionError if accessed while handles exist",
      "Because files compress automatically",
      "Because Python deletes the script",
      "Files do not need to be closed"
    ],
    "correctAnswer": 0,
    "explanation": "Windows kernel locks prevent file deletion or renaming while an active handle holds the file descriptor.",
    "hint": "Prevents PermissionError."
  },
  {
    "id": 9,
    "question": "In a student management project, what data structure is best suited for each individual record?",
    "options": [
      "Dictionary (e.g. {'roll': r, 'name': n, 'marks': m})",
      "Single string",
      "Single integer",
      "Boolean"
    ],
    "correctAnswer": 0,
    "explanation": "A dictionary with descriptive keys allows straightforward attribute access (e.g. `rec['roll']`).",
    "hint": "Dictionary record."
  },
  {
    "id": 10,
    "question": "Assertion (A): Master laboratory scripts should be executed locally in Python IDLE.\nReason (R): Hands-on execution builds practical confidence for the 30-mark CBSE practical examination.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Local execution on Python IDLE directly prepares students for the CBSE practical exam setup.",
    "hint": "Hands-on IDLE practice."
  },
  {
    "id": 11,
    "question": "What does `os.path.getsize(filename)` return for a binary file?",
    "options": [
      "Physical file size in bytes",
      "Line count",
      "Record count",
      "Word count"
    ],
    "correctAnswer": 0,
    "explanation": "`os.path.getsize()` returns the size of the file on disk in bytes.",
    "hint": "Size in bytes."
  },
  {
    "id": 12,
    "question": "Can binary files be opened in a standard text editor like VS Code or Notepad?",
    "options": [
      "Yes, but they display unintelligible characters and glyphs because they are raw byte streams",
      "No, the OS refuses to open them",
      "Yes, they display as English text",
      "They open only in web browsers"
    ],
    "correctAnswer": 0,
    "explanation": "Binary byte streams do not follow character encoding tables, appearing as scrambled characters in text editors.",
    "hint": "Scrambled characters in text editors."
  },
  {
    "id": 13,
    "question": "What is the return type of `pickle.load()`?",
    "options": [
      "The original Python object that was pickled",
      "bytes",
      "str",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`pickle.load()` deserializes and returns the native Python object.",
    "hint": "Original Python object."
  },
  {
    "id": 14,
    "question": "How many marks are allocated to the Python programming problem in the CBSE Class 12 practical exam?",
    "options": [
      "8 Marks",
      "2 Marks",
      "15 Marks",
      "20 Marks"
    ],
    "correctAnswer": 0,
    "explanation": "The hands-on Python coding question carries 8 Marks in the practical exam.",
    "hint": "8 Marks."
  },
  {
    "id": 15,
    "question": "What is the effect of calling `f.seek(0)` on an open binary file?",
    "options": [
      "Rewinds the file pointer to the beginning of the file (byte 0)",
      "Deletes the file",
      "Moves pointer to EOF",
      "Raises SeekError"
    ],
    "correctAnswer": 0,
    "explanation": "`f.seek(0)` repositions the cursor at byte 0.",
    "hint": "Rewinds to start."
  },
  {
    "id": 16,
    "question": "What is the purpose of the `found = False` flag in a record search function?",
    "options": [
      "To track whether a matching record was found and display 'Not found' only after the entire file has been searched",
      "To terminate the script",
      "To count total lines",
      "To delete records"
    ],
    "correctAnswer": 0,
    "explanation": "The `found` flag ensures 'Not found' is printed only once after the entire file is checked.",
    "hint": "Tracks search match."
  },
  {
    "id": 17,
    "question": "Which statement cleanly exits a `while True` loop when the search key is unique and has been found?",
    "options": [
      "break",
      "continue",
      "pass",
      "return None"
    ],
    "correctAnswer": 0,
    "explanation": "`break` halts the loop immediately, skipping unnecessary reads.",
    "hint": "break statement."
  },
  {
    "id": 18,
    "question": "Consider: `pickle.dump(rec, fout)`. In an update function, which records must be dumped to `fout`?",
    "options": [
      "Both the updated record AND all unmodified records",
      "Only the updated record",
      "Only the unmodified records",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Every record must be preserved in the temporary file, with the target record modified before dumping.",
    "hint": "All records must be preserved."
  },
  {
    "id": 19,
    "question": "In a deletion function, what happens to the matching record?",
    "options": [
      "It is skipped (NOT dumped to the temporary file)",
      "It is replaced with spaces",
      "It is set to 0",
      "It is encrypted"
    ],
    "correctAnswer": 0,
    "explanation": "Skipping the matching record omits it from the new file, achieving permanent deletion.",
    "hint": "Skipped and not dumped."
  },
  {
    "id": 20,
    "question": "What does `input().strip()` do?",
    "options": [
      "Removes leading and trailing whitespace from user input",
      "Converts string to lowercase",
      "Splits string into words",
      "Deletes numbers"
    ],
    "correctAnswer": 0,
    "explanation": "`strip()` removes surrounding spaces, tabs, and newlines.",
    "hint": "Removes leading/trailing spaces."
  },
  {
    "id": 21,
    "question": "What function can be used to verify that a binary file exists before opening it in 'rb' mode?",
    "options": [
      "os.path.exists(filename)",
      "pickle.exists(filename)",
      "sys.has_file(filename)",
      "file.check(filename)"
    ],
    "correctAnswer": 0,
    "explanation": "`os.path.exists()` tests if a path points to an existing file.",
    "hint": "os.path.exists."
  },
  {
    "id": 22,
    "question": "What is the effect of calling `pickle.dump()` in `'wb'` mode on an existing file?",
    "options": [
      "Completely wipes all existing records (truncates to 0 bytes)",
      "Appends records",
      "Sorts records",
      "Creates backup"
    ],
    "correctAnswer": 0,
    "explanation": "Mode `'wb'` empties the file completely upon opening.",
    "hint": "Wipes existing records."
  },
  {
    "id": 23,
    "question": "Can a binary file contain a list of dictionaries as well as individual dictionaries?",
    "options": [
      "Yes, but mixing schemas in one file creates unpickling confusion and should be avoided",
      "No, Python crashes",
      "Only in Python 2",
      "Only with JSON"
    ],
    "correctAnswer": 0,
    "explanation": "Maintaining a consistent schema (either all individual records or one list) is best practice.",
    "hint": "Maintain consistent schema."
  },
  {
    "id": 24,
    "question": "In Python IDLE, which key runs the active editor script?",
    "options": [
      "F5",
      "F1",
      "F12",
      "Ctrl+Alt+Del"
    ],
    "correctAnswer": 0,
    "explanation": "Pressing `F5` runs the script in the Python Shell in IDLE.",
    "hint": "F5 key."
  },
  {
    "id": 25,
    "question": "What is the recommended passing mark percentage for CBSE Class 12 Computer Science practicals?",
    "options": [
      "33%",
      "50%",
      "75%",
      "90%+ for top engineering admissions"
    ],
    "correctAnswer": 3,
    "explanation": "Aiming for 90%+ in theory and practicals guarantees strong engineering college admissions.",
    "hint": "90%+ for top rank."
  }
];

export default questions;
