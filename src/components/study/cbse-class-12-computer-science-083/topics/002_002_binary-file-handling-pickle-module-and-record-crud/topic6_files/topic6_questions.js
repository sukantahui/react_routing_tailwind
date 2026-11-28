// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "In a CBSE binary file search question, what algorithm is utilized to search through sequentially pickled records?",
    "options": [
      "Binary Search",
      "Linear Search",
      "Bubble Sort",
      "Hash Indexing"
    ],
    "correctAnswer": 1,
    "explanation": "Because pickled records vary in byte length and lack random index tables, a linear search from byte 0 to EOF is required.",
    "hint": "Linear search traversal."
  },
  {
    "id": 2,
    "question": "What is the purpose of the boolean `found = False` flag in binary file search algorithms?",
    "options": [
      "To count total records",
      "To track whether a matching record was discovered and trigger an 'Item not found' message if False after EOF",
      "To stop the while loop immediately",
      "To delete unmatched records"
    ],
    "correctAnswer": 1,
    "explanation": "The `found` flag prevents false-positive 'Record not found' messages during iteration and reports missing records after EOF.",
    "hint": "Found confirmation flag."
  },
  {
    "id": 3,
    "question": "Consider the code:\n```python\nwith open('student.dat', 'rb') as f:\n    found = False\n    try:\n        while True:\n            rec = pickle.load(f)\n            if rec['roll'] == search_roll:\n                print(rec)\n                found = True\n                break\n    except EOFError:\n        if not found:\n            print('Record not found!')\n```\nWhy is `break` placed after finding the record?",
    "options": [
      "To avoid unnecessary reads once the unique Roll Number is located",
      "To prevent EOFError",
      "To close the file handle",
      "To delete the record"
    ],
    "correctAnswer": 0,
    "explanation": "Since Roll Numbers are unique primary keys, breaking early optimizes performance by skipping remaining records.",
    "hint": "Stops search once unique key found."
  },
  {
    "id": 4,
    "question": "If searching for records by non-unique fields (e.g. `rec['city'] == 'Barrackpore'`), should `break` be called upon the first match?",
    "options": [
      "Yes, always break",
      "No, the loop must continue to EOF to display all matching students from that city",
      "Only if city is capitalized",
      "Raises SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "Non-unique queries must examine every record to locate all occurrences, breaking only on EOF.",
    "hint": "Must find all matches."
  },
  {
    "id": 5,
    "question": "Which string method should be applied when searching for a student by name case-insensitively?",
    "options": [
      "name.strip()",
      "search_name.lower() in rec['name'].lower()",
      "name.split()",
      "name.capitalize()"
    ],
    "correctAnswer": 1,
    "explanation": "Lowercasing both search term and record field ensures case-insensitive matching.",
    "hint": "Lowercasing both operands."
  },
  {
    "id": 6,
    "question": "What happens if `found = False` is omitted and `else: print('Not found')` is attached to `if rec['roll'] == search_roll:`?",
    "options": [
      "Prints 'Not found' for EVERY non-matching record before reaching the target!",
      "Works perfectly",
      "Raises IndentationError",
      "Terminates loop"
    ],
    "correctAnswer": 0,
    "explanation": "Attaching `else` directly inside the loop erroneously prints 'Not found' for every single preceding record.",
    "hint": "Common student trap!"
  },
  {
    "id": 7,
    "question": "What file access mode should be used when implementing a search function?",
    "options": [
      "'wb'",
      "'ab'",
      "'rb'",
      "'rb+'"
    ],
    "correctAnswer": 2,
    "explanation": "Mode `'rb'` is read-only, preventing any accidental modification or truncation of existing records.",
    "hint": "Read-only 'rb'."
  },
  {
    "id": 8,
    "question": "Assertion (A): Searching a binary file by Roll number requires handling `EOFError`.\nReason (R): If the searched Roll number is absent, `pickle.load()` reads to the end of the file and raises `EOFError`.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Unsuccessful searches exhaust all records and hit EOF, raising `EOFError`.",
    "hint": "Missing record reaches EOF."
  },
  {
    "id": 9,
    "question": "Consider: `rec = {'roll': 101, 'name': 'Mamata', 'marks': 96}`. How do you test if `marks` are in the range 90 to 100 inclusive?",
    "options": [
      "if 90 <= rec['marks'] <= 100:",
      "if rec['marks'] between 90 and 100:",
      "if rec['marks'] in range(90, 100):",
      "if rec['marks'] >= 90 and <= 100:"
    ],
    "correctAnswer": 0,
    "explanation": "Python supports chained comparisons: `90 <= rec['marks'] <= 100`.",
    "hint": "Chained comparison."
  },
  {
    "id": 10,
    "question": "What should a search function display if `student.dat` is completely empty (0 bytes)?",
    "options": [
      "Crashes with ZeroDivisionError",
      "Immediately hits EOFError and cleanly displays 'Record not found!'",
      "Displays None",
      "Creates a dummy student"
    ],
    "correctAnswer": 1,
    "explanation": "The first `pickle.load()` raises `EOFError`; the `except` block catches it and reports not found.",
    "hint": "Clean error handling."
  },
  {
    "id": 11,
    "question": "A CBSE practical question asks: 'Search for all books with price > 500 in book.dat'. What should be printed for each match?",
    "options": [
      "Book title and price",
      "Only byte offset",
      "File name",
      "EOF status"
    ],
    "correctAnswer": 0,
    "explanation": "The question expects meaningful record details (Book title, code, price) to be formatted and printed.",
    "hint": "Display record attributes."
  },
  {
    "id": 12,
    "question": "How can you count how many records matched a search query?",
    "options": [
      "Initialize match_count = 0 and increment it inside if condition: match_count += 1",
      "Use f.count()",
      "Call len(f)",
      "Use pickle.match_count()"
    ],
    "correctAnswer": 0,
    "explanation": "Tracking an integer counter increments on each match and can be printed at the end.",
    "hint": "Increment match counter."
  },
  {
    "id": 13,
    "question": "Consider: `search_name = input('Enter name: ')`. How can we guard against accidental leading/trailing spaces?",
    "options": [
      "search_name.strip()",
      "search_name.split()",
      "search_name.rstrip('\\n')",
      "search_name.replace(' ', '')"
    ],
    "correctAnswer": 0,
    "explanation": "`search_name.strip()` strips accidental whitespace from user input.",
    "hint": "strip method."
  },
  {
    "id": 14,
    "question": "What error occurs if you search for key `rec['grade']` when some dictionaries lack the `'grade'` key?",
    "options": [
      "KeyError",
      "ValueError",
      "TypeError",
      "EOFError"
    ],
    "correctAnswer": 0,
    "explanation": "Accessing a non-existent dictionary key directly via `rec['grade']` raises `KeyError`.",
    "hint": "KeyError."
  },
  {
    "id": 15,
    "question": "How can you safely access a dictionary key without risking `KeyError` during a search?",
    "options": [
      "rec.get('grade', None)",
      "rec['grade']",
      "rec.find('grade')",
      "rec.grade"
    ],
    "correctAnswer": 0,
    "explanation": "`rec.get('grade')` returns `None` (or a default value) instead of raising `KeyError`.",
    "hint": "dict.get method."
  },
  {
    "id": 16,
    "question": "Assertion (A): Binary search (O(log n)) cannot be performed directly on standard sequentially pickled binary files.\nReason (R): Serialized records have variable byte lengths, preventing instant calculation of middle record byte offsets.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Because pickled object lengths vary, one cannot jump to record N/2 without scanning prior records.",
    "hint": "Variable length byte streams prevent binary search."
  },
  {
    "id": 17,
    "question": "In a CBSE 3-mark question: 'Write a function search_emp(empid) to search and display details of employee with empid in emp.dat'. Which exception must be handled?",
    "options": [
      "EOFError",
      "KeyError",
      "NameError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Handling `EOFError` is mandatory to safely terminate the linear search loop.",
    "hint": "EOFError is mandatory."
  },
  {
    "id": 18,
    "question": "What is output if 3 students match the search criteria in `student.dat`?",
    "options": [
      "All 3 student details are printed",
      "Only the first one",
      "Only the last one",
      "Raises Error"
    ],
    "correctAnswer": 0,
    "explanation": "If `break` is omitted for non-unique queries, all 3 matching student records are displayed.",
    "hint": "All matching records printed."
  },
  {
    "id": 19,
    "question": "What happens if `open('student.dat', 'rb')` fails because the file does not exist?",
    "options": [
      "Raises FileNotFoundError",
      "Raises EOFError",
      "Creates the file",
      "Returns False"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to read a missing file raises `FileNotFoundError`.",
    "hint": "FileNotFoundError on missing file."
  },
  {
    "id": 20,
    "question": "How can `FileNotFoundError` be handled gracefully in a search function?",
    "options": [
      "Wrap open() in try ... except FileNotFoundError: print('File does not exist yet!')",
      "Use mode 'wb'",
      "Delete the script",
      "Ignore it"
    ],
    "correctAnswer": 0,
    "explanation": "Wrapping in `try ... except FileNotFoundError:` informs the user politely if the file hasn't been created yet.",
    "hint": "Catch FileNotFoundError."
  },
  {
    "id": 21,
    "question": "Consider: `rec = {'roll': 102, 'name': 'Mahima'}`. What does `rec['name'].startswith('M')` evaluate to?",
    "options": [
      "True",
      "False",
      "None",
      "Raises AttributeError"
    ],
    "correctAnswer": 0,
    "explanation": "'Mahima' begins with 'M', so `startswith('M')` returns True.",
    "hint": "True for 'Mahima'."
  },
  {
    "id": 22,
    "question": "What is the return type of a search function designed to return a record dictionary?",
    "options": [
      "dict if found, None if not found",
      "list only",
      "str only",
      "bool only"
    ],
    "correctAnswer": 0,
    "explanation": "Returning the found `dict` (or `None` on failure) is standard Pythonic functional design.",
    "hint": "dict or None."
  },
  {
    "id": 23,
    "question": "Can multiple search criteria be combined using boolean operators (e.g. `marks > 90 and city == 'Barrackpore'`)?",
    "options": [
      "Yes, using standard 'and' / 'or' operators",
      "No, binary files allow single conditions only",
      "Only with SQL",
      "Only with lambda"
    ],
    "correctAnswer": 0,
    "explanation": "Standard Python compound boolean expressions work seamlessly on record dictionaries.",
    "hint": "Compound boolean expressions."
  },
  {
    "id": 24,
    "question": "In CBSE board marking schemes, what is awarded for checking `rec['roll'] == search_roll` inside the loop?",
    "options": [
      "1 mark",
      "0 marks",
      "Full 3 marks",
      "1/4 mark"
    ],
    "correctAnswer": 0,
    "explanation": "The conditional match statement carries 1 full mark in the official marking rubric.",
    "hint": "Match condition carries 1 mark."
  },
  {
    "id": 25,
    "question": "A practical exam question states: 'Display message RECORD FOUND when student is found, otherwise display RECORD NOT FOUND'. Where should the NOT FOUND check be placed?",
    "options": [
      "After the while loop inside/after the except EOFError block (tested via 'if not found:')",
      "Inside the while loop as an else branch",
      "At the start of the function",
      "Inside the open statement"
    ],
    "correctAnswer": 0,
    "explanation": "Testing `if not found:` after the loop has exhausted all records guarantees the message only displays when no match exists.",
    "hint": "After loop exhaustion."
  }
];

export default questions;
