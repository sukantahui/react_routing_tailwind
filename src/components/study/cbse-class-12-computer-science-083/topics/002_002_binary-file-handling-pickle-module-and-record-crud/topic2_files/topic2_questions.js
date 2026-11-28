// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "What is the correct syntax for the `pickle.dump()` function?",
    "options": [
      "pickle.dump(file_handle, object)",
      "pickle.dump(object, file_handle, protocol=None)",
      "file_handle.dump(object)",
      "pickle.dump(filename, object)"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle.dump(obj, file, protocol=None)` takes the Python object as first parameter and the writable binary file handle as second.",
    "hint": "object first, file handle second."
  },
  {
    "id": 2,
    "question": "What error occurs if you pass parameters in reverse order: `pickle.dump(f, student_dict)`?",
    "options": [
      "SyntaxError",
      "TypeError / AttributeError",
      "Overwrites the file",
      "Creates an empty file"
    ],
    "correctAnswer": 1,
    "explanation": "Reversing arguments attempts to write into `student_dict` which lacks `.write()`, causing `TypeError` or `AttributeError`.",
    "hint": "file handle lacks object schema."
  },
  {
    "id": 3,
    "question": "Which file access mode must be used when creating a new binary file with `pickle.dump()`?",
    "options": [
      "'w'",
      "'wb'",
      "'r+'",
      "'b'"
    ],
    "correctAnswer": 1,
    "explanation": "Creating or overwriting a binary file requires write binary mode: `'wb'`.",
    "hint": "'wb' mode."
  },
  {
    "id": 4,
    "question": "Which file access mode must be used to add new records to an existing binary file without overwriting prior records?",
    "options": [
      "'w'",
      "'a'",
      "'ab'",
      "'wb+'"
    ],
    "correctAnswer": 2,
    "explanation": "Append binary mode `'ab'` preserves existing records and appends new pickled objects at the end.",
    "hint": "'ab' mode."
  },
  {
    "id": 5,
    "question": "Consider the code:\n```python\nimport pickle\nrec = {'roll': 1, 'name': 'Mamata', 'marks': 96}\nwith open('student.dat', 'wb') as f:\n    pickle.dump(rec, f)\n```\nWhat is stored in `student.dat`?",
    "options": [
      "A plain text string",
      "A pickled binary stream representing the student dictionary",
      "A CSV row",
      "A JSON object"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle.dump()` serializes `rec` and writes it as a binary byte stream into `student.dat`.",
    "hint": "Binary pickled record."
  },
  {
    "id": 6,
    "question": "What happens if `pickle.dump()` is invoked with a file opened in text mode `open('data.dat', 'w')`?",
    "options": [
      "Works normally",
      "Raises TypeError: write() argument must be str, not bytes",
      "Corrupts the file",
      "Converts text to binary"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle.dump` writes raw bytes; a text mode stream expects `str`, raising `TypeError`.",
    "hint": "TypeError on text stream."
  },
  {
    "id": 7,
    "question": "Can `pickle.dump()` be called multiple times inside a loop on the same file handle?",
    "options": [
      "No, raises FileExistsError",
      "Yes, consecutive dump calls append distinct serialized objects sequentially",
      "Only twice",
      "Only with lists"
    ],
    "correctAnswer": 1,
    "explanation": "Calling `pickle.dump()` repeatedly writes multiple sequential object records into the binary file.",
    "hint": "Multiple sequential records."
  },
  {
    "id": 8,
    "question": "What is the return value of `pickle.dump(obj, f)`?",
    "options": [
      "Boolean True",
      "Number of bytes written",
      "None",
      "The pickled string"
    ],
    "correctAnswer": 2,
    "explanation": "`pickle.dump()` performs an in-place write operation and returns `None`.",
    "hint": "Returns None."
  },
  {
    "id": 9,
    "question": "In a CBSE 3-mark question: 'Write a function add_student(roll, name, marks) to append a student record to student.dat'. Which mode must be opened?",
    "options": [
      "'w'",
      "'wb'",
      "'ab'",
      "'rb+'"
    ],
    "correctAnswer": 2,
    "explanation": "To append a new record without deleting existing student records, `'ab'` must be used.",
    "hint": "'ab' mode for appending records."
  },
  {
    "id": 10,
    "question": "Consider the code:\n```python\nimport pickle\nwith open('nums.dat', 'wb') as f:\n    for x in range(3):\n        pickle.dump(x * 10, f)\n```\nHow many separate pickled objects exist in `nums.dat`?",
    "options": [
      "1",
      "3",
      "0",
      "30"
    ],
    "correctAnswer": 1,
    "explanation": "The loop runs 3 times, writing 3 distinct pickled integer objects (0, 10, 20) sequentially.",
    "hint": "3 objects dumped."
  },
  {
    "id": 11,
    "question": "Assertion (A): `pickle.dump()` can serialize a list of multiple student dictionaries in a single operation.\nReason (R): Python lists are composite data structures capable of holding arbitrary objects.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Dumping an entire list of dictionaries in one `pickle.dump(students_list, f)` call is standard practice.",
    "hint": "Single dump of full list."
  },
  {
    "id": 12,
    "question": "What happens to prior data in `student.dat` if `open('student.dat', 'wb')` is executed?",
    "options": [
      "New data is appended",
      "Existing content is truncated to 0 bytes",
      "File remains unchanged",
      "Raises FileExistsError"
    ],
    "correctAnswer": 1,
    "explanation": "Mode `'wb'` truncates existing file data to zero bytes immediately upon opening.",
    "hint": "wb truncates to zero."
  },
  {
    "id": 13,
    "question": "Why is `with open('data.dat', 'wb') as f:` preferred over manual `open()` when pickling?",
    "options": [
      "It compresses the bytes",
      "It guarantees the file buffer is flushed and closed even if serialization fails",
      "It speeds up pickling by 50%",
      "It allows multi-threading"
    ],
    "correctAnswer": 1,
    "explanation": "The context manager guarantees complete buffer flushing and closure upon exit.",
    "hint": "Guarantees buffer flushing and closure."
  },
  {
    "id": 14,
    "question": "What is the effect of omitting `import pickle` in a script that calls `pickle.dump()`?",
    "options": [
      "Python imports it automatically",
      "Raises NameError: name 'pickle' is not defined",
      "Runs silently",
      "Creates an empty file"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle` is a standard library module and must be imported explicitly before use.",
    "hint": "NameError if not imported."
  },
  {
    "id": 15,
    "question": "Which of the following lines correctly pickles an employee dictionary `emp` into `emp.dat` in append mode?",
    "options": [
      "with open('emp.dat', 'ab') as f: pickle.dump(emp, f)",
      "with open('emp.dat', 'a') as f: pickle.dump(emp, f)",
      "with open('emp.dat', 'wb') as f: pickle.dump(f, emp)",
      "pickle.dump('emp.dat', emp)"
    ],
    "correctAnswer": 0,
    "explanation": "Option 1 uses mode `'ab'` and passes `emp` followed by file handle `f`.",
    "hint": "ab mode with (emp, f)."
  },
  {
    "id": 16,
    "question": "Can `pickle.dump()` write to a network socket or byte buffer if it provides a `.write()` method?",
    "options": [
      "No, disk files only",
      "Yes, any object implementing a binary write() method is valid",
      "Only on Linux",
      "Only with root privileges"
    ],
    "correctAnswer": 1,
    "explanation": "`pickle.dump` works with any file-like object exposing a binary `.write(bytes)` method.",
    "hint": "Any binary file-like object."
  },
  {
    "id": 17,
    "question": "Consider:\n```python\nimport pickle\nf = open('test.dat', 'wb')\npickle.dump([1, 2], f)\nf.close()\n```\nWhat is the value of `f.closed` after execution?",
    "options": [
      "False",
      "True",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "`f.close()` formally closes the file, making `f.closed` evaluate to `True`.",
    "hint": "True after close."
  },
  {
    "id": 18,
    "question": "What exception is raised if `pickle.dump()` fails due to an unpicklable object?",
    "options": [
      "pickle.PicklingError (or TypeError)",
      "ValueError",
      "IOError",
      "MemoryError"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to serialize an unsupported object raises `pickle.PicklingError` or `TypeError`.",
    "hint": "PicklingError or TypeError."
  },
  {
    "id": 19,
    "question": "In CBSE board marking schemes, what is the weightage of the `pickle.dump()` line in a 3-mark question?",
    "options": [
      "0 marks",
      "1/2 mark to 1 mark",
      "Full 3 marks",
      "Depends on variable names"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE step-by-step marking schemes award 1/2 to 1 mark for correct `pickle.dump(record, f)` syntax.",
    "hint": "Step marking awards dump."
  },
  {
    "id": 20,
    "question": "Assertion (A): Storing records as dictionaries in a binary file makes searching by key straightforward.\nReason (R): Each unpickled dictionary object allows direct key access like `record['roll']`.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Dictionaries preserve structured key-value mappings, allowing immediate attribute testing.",
    "hint": "Direct dictionary key access."
  },
  {
    "id": 21,
    "question": "What is written to disk if `pickle.dump({}, f)` is executed on an empty dictionary?",
    "options": [
      "0 bytes",
      "A short serialized byte sequence representing an empty Python dictionary",
      "None",
      "Raises ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "Pickle encodes the empty dictionary object type and structure in a few header bytes.",
    "hint": "Encodes empty dictionary structure."
  },
  {
    "id": 22,
    "question": "Which built-in Python function is commonly used to take user input before creating a dictionary to pass to `pickle.dump()`?",
    "options": [
      "input()",
      "read()",
      "scan()",
      "get()"
    ],
    "correctAnswer": 0,
    "explanation": "`input()` accepts user input from the console for fields like Roll number, Name, and Marks.",
    "hint": "input() function."
  },
  {
    "id": 23,
    "question": "When accepting student marks from user input, what conversion is required before pickling?",
    "options": [
      "No conversion",
      "Convert string to float or int using float(input()) or int(input())",
      "Convert to binary",
      "Convert to hex"
    ],
    "correctAnswer": 1,
    "explanation": "`input()` returns a string; converting with `int()` or `float()` ensures proper numeric typing in the pickled record.",
    "hint": "int() or float() conversion."
  },
  {
    "id": 24,
    "question": "Consider: `pickle.dump({'A': 1}, f)`. Can this be read back using `f.readline()`?",
    "options": [
      "Yes, seamlessly",
      "No, binary pickle files must be read using pickle.load()",
      "Only on Windows",
      "Only in Python 2"
    ],
    "correctAnswer": 1,
    "explanation": "`readline()` is for text files; binary serialized records must be deserialized with `pickle.load()`.",
    "hint": "Must use pickle.load()."
  },
  {
    "id": 25,
    "question": "A CBSE practical question asks: 'Write a program to enter records of students (Admission No, Name, Percentage) into a binary file until the user wishes to stop'. What loop structure is standard?",
    "options": [
      "A while True loop taking inputs, dumping dict, and asking 'Enter more (y/n)?' to break",
      "A for loop with range(100)",
      "A recursive function only",
      "A while False loop"
    ],
    "correctAnswer": 0,
    "explanation": "A `while True` loop with a user continuation prompt (`choice = input('More? ')`) is the canonical CBSE design pattern.",
    "hint": "while True loop with continuation prompt."
  }
];

export default questions;
