// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "What does 'CRUD' stand for in software systems and database engineering?",
    "options": [
      "Compile, Run, Update, Debug",
      "Create, Read (Retrieve), Update, Delete",
      "Copy, Rename, Unpickle, Dump",
      "Client, Router, User, Domain"
    ],
    "correctAnswer": 1,
    "explanation": "CRUD denotes the four fundamental persistent storage operations: Create, Read, Update, and Delete.",
    "hint": "Create, Read, Update, Delete."
  },
  {
    "id": 2,
    "question": "In a CBSE menu-driven program, what control structure is used to repeatedly present the menu until the user selects 'Exit'?",
    "options": [
      "An infinite `while True:` loop containing `if-elif-else` branches and a `break` on Exit",
      "A for loop with range(10)",
      "A single if-statement",
      "A try-except block without loop"
    ],
    "correctAnswer": 0,
    "explanation": "A `while True:` loop keeps the application active until the exit condition invokes `break` or `sys.exit()`.",
    "hint": "while True loop."
  },
  {
    "id": 3,
    "question": "Which function in the `sys` module terminates the program immediately?",
    "options": [
      "sys.exit()",
      "sys.stop()",
      "sys.terminate()",
      "sys.end()"
    ],
    "correctAnswer": 0,
    "explanation": "`sys.exit()` raises `SystemExit` to cleanly shut down the Python interpreter.",
    "hint": "sys.exit()."
  },
  {
    "id": 4,
    "question": "Why is a menu-driven application structured into modular functions (`add_record()`, `display_all()`, `search_record()`, `update_record()`, `delete_record()`)?",
    "options": [
      "To adhere to procedural abstraction and modular design principles, making code readable and maintainable",
      "Because Python forbids writing everything in one file",
      "To make execution slower",
      "To encrypt function names"
    ],
    "correctAnswer": 0,
    "explanation": "Modularizing operations into distinct functions promotes reusability, simplifies debugging, and earns full CBSE rubric marks.",
    "hint": "Modular design and reusability."
  },
  {
    "id": 5,
    "question": "Consider a menu offering choices 1 to 5. What should happen if the user inputs `9`?",
    "options": [
      "Crash the program",
      "The else branch displays 'Invalid Choice! Please enter a number between 1 and 5'",
      "Delete the database",
      "Assume choice 1"
    ],
    "correctAnswer": 1,
    "explanation": "The trailing `else:` clause provides input validation, guiding the user back to valid menu choices.",
    "hint": "Input validation in else branch."
  },
  {
    "id": 6,
    "question": "In a menu-driven binary system, which option should open the file in `'ab'` mode?",
    "options": [
      "Create / Append New Record",
      "Display All Records",
      "Search Record",
      "Exit"
    ],
    "correctAnswer": 0,
    "explanation": "Appending new records uses `'ab'` to add entries without deleting existing records.",
    "hint": "Append new record uses 'ab'."
  },
  {
    "id": 7,
    "question": "In a menu-driven binary system, which option should open the file in `'rb'` mode?",
    "options": [
      "Display All Records and Search Record",
      "Create Record",
      "Delete Record",
      "Exit"
    ],
    "correctAnswer": 0,
    "explanation": "Both Display and Search are read-only operations that use mode `'rb'`.",
    "hint": "Display and Search use 'rb'."
  },
  {
    "id": 8,
    "question": "Assertion (A): Menu-driven systems in CBSE practical examinations represent the Capstone standard for Class 12 CS.\nReason (R): They combine file modes, pickling, unpickling, exception handling, data structures, and conditional loops into one project.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "The menu-driven binary project assesses the student's mastery across the entire Python curriculum.",
    "hint": "Capstone project standard."
  },
  {
    "id": 9,
    "question": "How can you prevent a crash if a user enters letters like `'abc'` when the menu expects an integer choice `int(input())`?",
    "options": [
      "Wrap input in try ... except ValueError: print('Please enter an integer!')",
      "Use float()",
      "Restart computer",
      "Letters are automatically converted to numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Catching `ValueError` handles non-numeric inputs gracefully without crashing the menu loop.",
    "hint": "Catch ValueError."
  },
  {
    "id": 10,
    "question": "Consider: `choice = input('Enter choice (1-6): ').strip()`. Why is comparing strings (e.g. `if choice == '1':`) safer than `int(input())`?",
    "options": [
      "String input never raises ValueError if user accidentally types letters or symbols",
      "Strings are faster than numbers",
      "Python only supports string inputs",
      "It avoids memory usage"
    ],
    "correctAnswer": 0,
    "explanation": "Comparing strings directly avoids `int()` conversion errors entirely, making menu selection bulletproof.",
    "hint": "String comparison avoids ValueError."
  },
  {
    "id": 11,
    "question": "In a student management system, how can roll number uniqueness be enforced before inserting a new record?",
    "options": [
      "Search the binary file first; if roll already exists, display 'Roll Number already taken!' and reject entry",
      "Python checks uniqueness automatically",
      "Disk drives reject duplicates",
      "Uniqueness cannot be checked in Python"
    ],
    "correctAnswer": 0,
    "explanation": "A pre-check query reads the file to confirm the primary key is not duplicate before pickling.",
    "hint": "Pre-check query for uniqueness."
  },
  {
    "id": 12,
    "question": "What should be displayed if the user selects 'Display All' when `student.dat` has zero records?",
    "options": [
      "'Database is currently empty. No records to display.'",
      "Traceback crash",
      "None",
      "Infinite loop"
    ],
    "correctAnswer": 0,
    "explanation": "Friendly messages inform the user that the file contains no entries yet.",
    "hint": "Empty database message."
  },
  {
    "id": 13,
    "question": "Which file handling mode should NEVER be used inside the menu loop for routine additions?",
    "options": [
      "'ab'",
      "'rb'",
      "'wb' (destroys database!)",
      "'rb+'"
    ],
    "correctAnswer": 2,
    "explanation": "Calling `'wb'` wipes all prior data, destroying the cumulative database.",
    "hint": "wb destroys data."
  },
  {
    "id": 14,
    "question": "How can records be displayed in a neat columnar table on the console?",
    "options": [
      "Using f-strings with field width formatting, e.g. f\"{rec['roll']:<5} | {rec['name']:<15} | {rec['marks']:<6.2f}\"",
      "Using commas only",
      "Using print(rec)",
      "Using f.table()"
    ],
    "correctAnswer": 0,
    "explanation": "F-string width specifiers (`:<15`) format text into clean aligned columns.",
    "hint": "F-string width formatting."
  },
  {
    "id": 15,
    "question": "Consider: `os.system('cls' if os.name == 'nt' else 'clear')`. What does this line do?",
    "options": [
      "Clears the terminal console screen for a clean menu display",
      "Deletes files",
      "Clears RAM memory",
      "Closes Python"
    ],
    "correctAnswer": 0,
    "explanation": "It clears the terminal screen cross-platform (Windows `cls` vs Linux/Mac `clear`).",
    "hint": "Clears console screen."
  },
  {
    "id": 16,
    "question": "What is the recommended file naming convention for the primary database in CBSE Class 12 binary file programs?",
    "options": [
      "STUDENT.DAT or EMPLOYEE.DAT",
      "temp.txt",
      "data.json",
      "test.csv"
    ],
    "correctAnswer": 0,
    "explanation": "Official CBSE problem statements conventionally specify `STUDENT.DAT` or `EMPLOYEE.DAT`.",
    "hint": "STUDENT.DAT / EMPLOYEE.DAT."
  },
  {
    "id": 17,
    "question": "Can the menu-driven system calculate statistical summaries like class average and top scorer?",
    "options": [
      "Yes, by adding a menu option that traverses records, aggregates marks, and computes statistics",
      "No, binary files only support text",
      "Only with third-party libraries",
      "Only on 64-bit systems"
    ],
    "correctAnswer": 0,
    "explanation": "Traversing records allows calculating averages, pass percentages, and maximum marks.",
    "hint": "Aggregate statistics option."
  },
  {
    "id": 18,
    "question": "In a CBSE Class 12 practical exam, what total marks are awarded for a complete menu-driven project?",
    "options": [
      "8 Marks (Logic + Documentation + Output)",
      "1 Mark",
      "30 Marks",
      "2 Marks"
    ],
    "correctAnswer": 0,
    "explanation": "In the 30-mark practical, the Python program carries 8 Marks (with 7 marks for report file, 5 for project, 3 for viva, etc.).",
    "hint": "8 Marks in practical exam."
  },
  {
    "id": 19,
    "question": "What does the `break` statement do when user selects Option 6 (Exit)?",
    "options": [
      "Terminates the while True menu loop, allowing the program to exit cleanly",
      "Deletes the file",
      "Restarts the menu",
      "Closes the IDE"
    ],
    "correctAnswer": 0,
    "explanation": "`break` terminates the infinite `while True:` loop, ending execution gracefully.",
    "hint": "Terminates while loop."
  },
  {
    "id": 20,
    "question": "Why is exception handling for `FileNotFoundError` important in all menu options?",
    "options": [
      "Because if the user selects 'Display' or 'Search' before creating any records, the missing file raises FileNotFoundError",
      "Because Python requires it",
      "To speed up disk reads",
      "To compress bytes"
    ],
    "correctAnswer": 0,
    "explanation": "Catching `FileNotFoundError` prevents crashing if a user tries reading before creating records.",
    "hint": "Prevents crash on missing file."
  },
  {
    "id": 21,
    "question": "How can user input for gender be validated to only accept 'M', 'F', or 'O'?",
    "options": [
      "while gender not in ['M', 'F', 'O']: gender = input('Enter Gender (M/F/O): ').upper()",
      "gender = int(input())",
      "gender = bool(input())",
      "gender.validate()"
    ],
    "correctAnswer": 0,
    "explanation": "A validation `while` loop re-prompts until input matches valid choices.",
    "hint": "Validation while loop."
  },
  {
    "id": 22,
    "question": "Consider: `input('Press Enter to continue...')`. What purpose does this serve in a menu loop?",
    "options": [
      "Pauses output so the user can read results before the screen refreshes or menu reappears",
      "Saves data to disk",
      "Closes files",
      "Terminates execution"
    ],
    "correctAnswer": 0,
    "explanation": "Pausing allows users to view search or report outputs before returning to the main menu.",
    "hint": "Pauses output for user reading."
  },
  {
    "id": 23,
    "question": "Assertion (A): A well-written menu-driven program never crashes due to unexpected user input.\nReason (R): It combines `try-except` blocks, `strip()` input sanitization, and `while` validation loops.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is not the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correctAnswer": 0,
    "explanation": "Defensive programming guarantees robust, crash-free execution under all user inputs.",
    "hint": "Defensive programming."
  },
  {
    "id": 24,
    "question": "What is the return type of `os.path.exists('student.dat')`?",
    "options": [
      "bool",
      "int",
      "str",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`os.path.exists()` returns a boolean (`True` or `False`).",
    "hint": "bool type."
  },
  {
    "id": 25,
    "question": "Which of the following is the optimal structure for a complete CBSE binary file management project?",
    "options": [
      "A Python script with separate functions for Add, Display, Search, Update, Delete, and a main menu loop",
      "A 500-line single function with goto statements",
      "A script that deletes files on exit",
      "A script without functions"
    ],
    "correctAnswer": 0,
    "explanation": "Modular functional architecture with a clean menu dispatcher is the gold standard for CBSE Class 12 CS.",
    "hint": "Modular functional architecture."
  }
];

export default questions;
