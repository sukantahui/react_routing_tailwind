// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "What are the two standard approaches to store multiple student records in a binary file using `pickle`?",
    "options": [
      "Approach 1: Dump individual dictionaries sequentially; Approach 2: Store all dictionaries inside a single list and dump the list once",
      "Approach 1: Convert to text; Approach 2: Convert to CSV",
      "Approach 1: Use zip; Approach 2: Use tar",
      "Approach 1: Use SQL; Approach 2: Use HTML"
    ],
    "correctAnswer": 0,
    "explanation": "Records can either be dumped one-by-one (requires loop + EOFError to read) or packed into a list of dictionaries dumped in a single call.",
    "hint": "Sequential individual dumps vs single list dump."
  },
  {
    "id": 2,
    "question": "If 10 student dictionaries are stored inside a single list `students = [{...}, ...]`, how many times must `pickle.dump()` be called to write them all?",
    "options": [
      "10 times",
      "Exactly 1 time: pickle.dump(students, f)",
      "100 times",
      "2 times"
    ],
    "correctAnswer": 1,
    "explanation": "Pickle serializes the entire list object and all its contained dictionaries in a single operation.",
    "hint": "Single dump of container list."
  },
  {
    "id": 3,
    "question": "If 10 student dictionaries were pickled inside a single list `pickle.dump(students, f)`, how many times must `pickle.load(f)` be called to retrieve all 10 records?",
    "options": [
      "10 times inside a loop",
      "Exactly 1 time: students = pickle.load(f)",
      "Depends on EOFError",
      "0 times"
    ],
    "correctAnswer": 1,
    "explanation": "A single `pickle.load(f)` call restores the entire container list with all 10 records intact.",
    "hint": "Single load restores full list."
  },
  {
    "id": 4,
    "question": "Consider a nested dictionary: `student = {'roll': 1, 'info': {'name': 'Mamata', 'marks': [95, 98, 92]}}`. Can `pickle.dump()` serialize this structure?",
    "options": [
      "No, nested dictionaries are not supported",
      "Yes, pickle handles arbitrary levels of object nesting seamlessly",
      "Only if marks is converted to a string",
      "Only with json module"
    ],
    "correctAnswer": 1,
    "explanation": "Pickle seamlessly handles arbitrary levels of nested lists, dictionaries, tuples, and sets.",
    "hint": "Arbitrary nesting supported."
  },
  {
    "id": 5,
    "question": "What is an advantage of dumping records individually (Approach 1) over dumping a single list (Approach 2)?",
    "options": [
      "New records can be appended easily in 'ab' mode without reading all existing records into memory first",
      "It uses more disk space",
      "It requires no EOFError",
      "It is slower"
    ],
    "correctAnswer": 0,
    "explanation": "With individual dumps, new records can simply be appended to the end of the file via `'ab'` mode without loading the whole file.",
    "hint": "Append without full file load."
  },
  {
    "id": 6,
    "question": "What is an advantage of dumping a single list of dictionaries (Approach 2)?",
    "options": [
      "A single pickle.load() retrieves the whole database without needing an EOFError while loop",
      "It allows appending in 'ab' mode easily",
      "It works in Notepad",
      "It requires no import pickle"
    ],
    "correctAnswer": 0,
    "explanation": "Reading a single list avoids EOFError loops and allows direct list operations like `.sort()` and `.filter()`.",
    "hint": "Single load without EOFError loop."
  },
  {
    "id": 7,
    "question": "Consider the record: `rec = {'roll': 101, 'name': 'Mahima', 'marks': [90, 85, 95]}`. How do you compute the percentage?",
    "options": [
      "sum(rec['marks']) / len(rec['marks'])",
      "rec['marks'] * 100",
      "avg(rec['marks'])",
      "rec['marks'].sum()"
    ],
    "correctAnswer": 0,
    "explanation": "`sum(rec['marks']) / len(rec['marks'])` calculates the average of the marks list.",
    "hint": "sum() / len()."
  },
  {
    "id": 8,
    "question": "Assertion (A): Pickling complex records preserves the data types of dictionary values (integers remain int, floats remain float).\nReason (R): Serialization stores type identifiers alongside raw binary data values.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Pickle encodes schema metadata so types are faithfully restored without manual casting.",
    "hint": "Preserves native types."
  },
  {
    "id": 9,
    "question": "How can you sort a list of student dictionaries by marks in descending order after loading from a binary file?",
    "options": [
      "students.sort(key=lambda x: x['marks'], reverse=True)",
      "sort(students)",
      "students.sort('marks')",
      "pickle.sort(students)"
    ],
    "correctAnswer": 0,
    "explanation": "Using `key=lambda x: x['marks'], reverse=True` sorts dictionaries by marks in descending order.",
    "hint": "sort with lambda key."
  },
  {
    "id": 10,
    "question": "What error occurs if you try to append a single dictionary to a binary file where data was originally stored as a single list?",
    "options": [
      "File corruption or mismatched unpickling schema when reading subsequent records",
      "SyntaxError",
      "TypeError: cannot append to list",
      "No error, Python merges them automatically"
    ],
    "correctAnswer": 0,
    "explanation": "Mixing storage schemas (dumping a list, then dumping a single dict) causes deserialization confusion.",
    "hint": "Mismatched storage schema."
  },
  {
    "id": 11,
    "question": "In a CBSE 3-mark practical question: 'Store employee records [EmpID, Name, Salary, Department] in emp.dat'. Which data structure is best to represent each employee?",
    "options": [
      "Dictionary (e.g. {'empid': id, 'name': n, 'salary': s, 'dept': d})",
      "Single integer",
      "Float number",
      "String with semicolons"
    ],
    "correctAnswer": 0,
    "explanation": "A dictionary with descriptive keys is the canonical CBSE best-practice structure.",
    "hint": "Dictionary with descriptive keys."
  },
  {
    "id": 12,
    "question": "Consider: `emp = {'id': 101, 'name': 'Debangshu', 'allowances': {'da': 5000, 'hra': 8000}}`. What is `emp['allowances']['hra']`?",
    "options": [
      "5000",
      "8000",
      "13000",
      "Raises KeyError"
    ],
    "correctAnswer": 1,
    "explanation": "Accessing nested dictionary keys retrieves the inner value: 8000.",
    "hint": "Nested dictionary lookup."
  },
  {
    "id": 13,
    "question": "What happens if you pickle a student object containing circular references (e.g. `a['friend'] = b; b['friend'] = a`)?",
    "options": [
      "Infinite recursion crash",
      "Pickle handles circular references safely by tracking object IDs with memo tables",
      "Deletes both objects",
      "Raises RecursionError always"
    ],
    "correctAnswer": 1,
    "explanation": "Python's `pickle` engine maintains an internal memo table to handle circular references safely.",
    "hint": "Internal memo table handles cycles."
  },
  {
    "id": 14,
    "question": "Consider the code:\n```python\nwith open('students.dat', 'wb') as f:\n    pickle.dump([{'id': 1}, {'id': 2}], f)\n```\nWhat is the type of the unpickled object?",
    "options": [
      "dict",
      "list of dicts",
      "tuple",
      "generator"
    ],
    "correctAnswer": 1,
    "explanation": "The outer container was a `list`, so unpickling yields `<class 'list'>` containing the dictionaries.",
    "hint": "list of dicts."
  },
  {
    "id": 15,
    "question": "When storing 1,000 student records, which approach is more RAM-efficient when reading records one-by-one to search for a single Roll number?",
    "options": [
      "Sequential individual dumps: only one record is in RAM at a time during the loop",
      "Single list dump: all 1,000 records must be loaded into memory simultaneously",
      "Both use identical RAM",
      "Neither uses RAM"
    ],
    "correctAnswer": 0,
    "explanation": "Sequential dumps stream one dictionary into RAM at a time, maintaining constant O(1) memory usage.",
    "hint": "Constant O(1) memory per record."
  },
  {
    "id": 16,
    "question": "How do you access the name of the second student in a loaded list `students`?",
    "options": [
      "students[1]['name']",
      "students[2]['name']",
      "students['name'][1]",
      "students.get(1)"
    ],
    "correctAnswer": 0,
    "explanation": "Python uses 0-based indexing; `students[1]` represents the second student dictionary.",
    "hint": "Index 1 is the second element."
  },
  {
    "id": 17,
    "question": "Assertion (A): Pickling a list of dictionaries is the easiest way to perform binary updates.\nReason (R): The list can be modified in RAM using standard list methods and rewritten to disk in one dump call.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Loading the full list, updating the dictionary in-memory, and dumping back in `'wb'` mode is simple and effective.",
    "hint": "In-memory update and dump."
  },
  {
    "id": 18,
    "question": "What function calculates the highest marks from a list of records `recs`?",
    "options": [
      "max(r['marks'] for r in recs)",
      "recs.max('marks')",
      "max(recs)",
      "recs['marks'].highest()"
    ],
    "correctAnswer": 0,
    "explanation": "`max(r['marks'] for r in recs)` computes the maximum marks using a generator expression.",
    "hint": "max with generator."
  },
  {
    "id": 19,
    "question": "What happens if a field like `'bonus'` is added to some employee dictionaries but not others?",
    "options": [
      "Pickle fails with SchemaError",
      "Pickle saves heterogeneous dictionaries without error; missing keys must be checked with 'in' or .get()",
      "Fills with None automatically",
      "Raises KeyError during dump"
    ],
    "correctAnswer": 1,
    "explanation": "Python dictionaries are dynamically typed; pickle stores whatever keys exist in each individual dictionary.",
    "hint": "Dynamic heterogeneous dictionaries."
  },
  {
    "id": 20,
    "question": "How do you safely query an optional key like `'bonus'` without risking `KeyError`?",
    "options": [
      "rec.get('bonus', 0)",
      "rec['bonus']",
      "rec.bonus()",
      "rec.find('bonus')"
    ],
    "correctAnswer": 0,
    "explanation": "`dict.get('bonus', 0)` returns the value if present, or `0` if the key is missing.",
    "hint": "dict.get with default."
  },
  {
    "id": 21,
    "question": "Consider: `rec = {'roll': 1, 'grades': ('A', 'B', 'A')}`. What type is `rec['grades']`?",
    "options": [
      "list",
      "tuple",
      "str",
      "set"
    ],
    "correctAnswer": 1,
    "explanation": "The parentheses define an immutable `tuple`.",
    "hint": "tuple type."
  },
  {
    "id": 22,
    "question": "In CBSE board examination practical files, what is Program #4 typically titled?",
    "options": [
      "'Create a binary file with name and roll number. Search for a given roll number and display name, if not found display appropriate message'",
      "'Create a web server in Python'",
      "'Write an operating system kernel'",
      "'Compile C++ code in Python'"
    ],
    "correctAnswer": 0,
    "explanation": "Program #4 in official CBSE practical syllabus specifies creating and searching binary student records.",
    "hint": "Official CBSE Program #4."
  },
  {
    "id": 23,
    "question": "Can a set like `{'Physics', 'Chemistry'}` be stored as a dictionary value in pickled records?",
    "options": [
      "Yes, sets are picklable",
      "No, sets are forbidden in pickle",
      "Only frozen sets",
      "Only on Linux"
    ],
    "correctAnswer": 0,
    "explanation": "Python sets are fully picklable and restored intact upon unpickling.",
    "hint": "Sets are picklable."
  },
  {
    "id": 24,
    "question": "What is the result of `len(rec)` for `rec = {'roll': 101, 'name': 'Mamata', 'marks': 96}`?",
    "options": [
      "3",
      "1",
      "6",
      "Depends on string length"
    ],
    "correctAnswer": 0,
    "explanation": "The dictionary contains 3 distinct key-value pairs, so `len(rec)` is 3.",
    "hint": "Number of keys."
  },
  {
    "id": 25,
    "question": "In a CBSE 3-mark question: 'Write a program to display all student records where stream is 'SCIENCE''. Which condition is correct inside the unpickling loop?",
    "options": [
      "if rec.get('stream', '').upper() == 'SCIENCE': print(rec)",
      "if 'SCIENCE' in rec: print(rec)",
      "if rec['stream'] = 'SCIENCE': print(rec)",
      "if stream == 'SCIENCE': print(rec)"
    ],
    "correctAnswer": 0,
    "explanation": "`rec.get('stream', '').upper() == 'SCIENCE'` safely checks the stream field case-insensitively.",
    "hint": "get with upper case comparison."
  }
];

export default questions;
