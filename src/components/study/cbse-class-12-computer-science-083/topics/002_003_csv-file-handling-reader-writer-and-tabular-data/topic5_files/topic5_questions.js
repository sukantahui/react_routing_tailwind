// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "What does the csv.reader(f) function return?",
    "options": [
      "A single string of the entire file",
      "An iterable reader object yielding rows as lists of strings",
      "A dictionary of column arrays",
      "A tuple of binary bytes"
    ],
    "correctAnswer": 1,
    "explanation": "csv.reader returns an iterable reader object where each iteration provides a list of string fields.",
    "hint": "An iterable reader object yielding lists of strings."
  },
  {
    "id": 2,
    "question": "When iterating through csv.reader with 'for row in reader:', what is the datatype of 'row'?",
    "options": [
      "str",
      "list",
      "dict",
      "tuple"
    ],
    "correctAnswer": 1,
    "explanation": "Each row returned by the reader is represented as a Python list.",
    "hint": "list."
  },
  {
    "id": 3,
    "question": "What is the datatype of the individual elements inside the 'row' list returned by csv.reader?",
    "options": [
      "int",
      "float",
      "str",
      "bool"
    ],
    "correctAnswer": 2,
    "explanation": "All fields parsed from a CSV file are strings by default.",
    "hint": "str."
  },
  {
    "id": 4,
    "question": "Which built-in Python function is commonly used to advance the reader past the header row before entering a loop?",
    "options": [
      "reader.skip()",
      "next(reader)",
      "reader.pop()",
      "reader.jump()"
    ],
    "correctAnswer": 1,
    "explanation": "next(reader) retrieves the first item (the header row), advancing the internal pointer to the data rows.",
    "hint": "next(reader)."
  },
  {
    "id": 5,
    "question": "What happens if next(reader) is called on an empty CSV file?",
    "options": [
      "Returns None",
      "Raises StopIteration exception",
      "Returns an empty string",
      "Creates a header"
    ],
    "correctAnswer": 1,
    "explanation": "Calling next() on any exhausted or empty iterator raises the StopIteration exception.",
    "hint": "Raises StopIteration."
  },
  {
    "id": 6,
    "question": "How do you access the third column of the current record during a loop 'for row in reader:'?",
    "options": [
      "row(3)",
      "row[2]",
      "row[3]",
      "row.col3"
    ],
    "correctAnswer": 1,
    "explanation": "Python uses 0-based indexing, so the third column is at index 2 (row[2]).",
    "hint": "row[2]."
  },
  {
    "id": 7,
    "question": "What does csv.reader yield when encountering a completely blank line?",
    "options": [
      "None",
      "An empty string ''",
      "An empty list []",
      "Raises ValueError"
    ],
    "correctAnswer": 2,
    "explanation": "A blank line in the file is parsed by csv.reader as an empty list [].",
    "hint": "An empty list []."
  },
  {
    "id": 8,
    "question": "Why is the check 'if not row: continue' recommended inside a CSV reading loop?",
    "options": [
      "To prevent division by zero",
      "To skip empty rows and avoid IndexError when accessing row[0]",
      "To speed up disk read",
      "To decrypt row data"
    ],
    "correctAnswer": 1,
    "explanation": "If a line is blank, accessing row[0] on [] causes IndexError; checking 'if not row: continue' safely bypasses it.",
    "hint": "Prevents IndexError on empty rows."
  },
  {
    "id": 9,
    "question": "Consider: with open('scores.csv', 'r') as f: data = list(csv.reader(f)). What does data contain?",
    "options": [
      "A list of individual characters",
      "A list of strings",
      "A 2D nested list (list of lists) representing all rows and columns",
      "A dictionary"
    ],
    "correctAnswer": 2,
    "explanation": "Casting the reader to list() loads all rows into memory as a list of lists.",
    "hint": "2D nested list of all rows."
  },
  {
    "id": 10,
    "question": "What is the potential downside of using list(csv.reader(f)) on a 10 GB CSV file?",
    "options": [
      "Python deletes the file",
      "It loads the entire file into RAM at once, potentially causing MemoryError",
      "It reverses the rows",
      "It alters numeric data"
    ],
    "correctAnswer": 1,
    "explanation": "Converting the reader directly to a list consumes memory proportional to the full file size, risking out-of-memory errors on large datasets.",
    "hint": "Consumes excessive RAM."
  },
  {
    "id": 11,
    "question": "Which of the following iterates through a CSV file and prints only the student names (assume name is column 1)?",
    "options": [
      "for row in reader: print(row[0])",
      "for row in reader: print(row[1])",
      "for row in reader: print(row.name)",
      "for row in reader: print(row[2])"
    ],
    "correctAnswer": 1,
    "explanation": "Column 1 is at index 1: row[1].",
    "hint": "row[1]."
  },
  {
    "id": 12,
    "question": "What exception is raised if you try to open a non-existent CSV file in 'r' mode?",
    "options": [
      "FileExistsError",
      "FileNotFoundError",
      "EOFError",
      "csv.Error"
    ],
    "correctAnswer": 1,
    "explanation": "Attempting to open a missing file in read mode raises FileNotFoundError.",
    "hint": "FileNotFoundError."
  },
  {
    "id": 13,
    "question": "Consider: row = ['101', 'Aarav', '95.5']. How do you convert the marks to a numeric float?",
    "options": [
      "int(row[2])",
      "float(row[2])",
      "str(row[2])",
      "double(row[2])"
    ],
    "correctAnswer": 1,
    "explanation": "float(row[2]) converts the decimal mark string into a floating-point number.",
    "hint": "float(row[2])."
  },
  {
    "id": 14,
    "question": "What is the value of reader.line_num after iterating over 5 rows?",
    "options": [
      "0",
      "4",
      "5",
      "1"
    ],
    "correctAnswer": 2,
    "explanation": "The reader.line_num attribute tracks the number of lines read from the source file so far (5 in this case).",
    "hint": "5."
  },
  {
    "id": 15,
    "question": "Can csv.reader read a CSV file opened in 'rb' (binary read) mode in Python 3?",
    "options": [
      "Yes, without issues",
      "No, in Python 3 csv.reader requires a text file iterator that yields str, not bytes",
      "Only on Windows",
      "Only if decoded manually"
    ],
    "correctAnswer": 1,
    "explanation": "In Python 3, csv.reader expects an iterable yielding strings (text mode), raising an error on byte streams.",
    "hint": "Requires text mode yielding strings."
  },
  {
    "id": 16,
    "question": "What happens if a field in the CSV file contains embedded newlines inside double quotes?",
    "options": [
      "csv.reader crashes",
      "csv.reader correctly parses it as a single field spanning multiple physical lines",
      "It splits into 2 separate rows",
      "It deletes the newline"
    ],
    "correctAnswer": 1,
    "explanation": "If opened with newline='', csv.reader correctly handles multi-line quoted fields without breaking them into separate rows.",
    "hint": "Parses correctly as a single multi-line field."
  },
  {
    "id": 17,
    "question": "How can you count the total number of records in a CSV file excluding the header?",
    "options": [
      "len(csv.reader(f))",
      "next(reader); count = sum(1 for row in reader)",
      "reader.count()",
      "f.record_count()"
    ],
    "correctAnswer": 1,
    "explanation": "Iterators do not have a len(); skipping the header and counting remaining items via a generator sum(1 for row in reader) gives the exact count efficiently.",
    "hint": "next(reader); sum(1 for row in reader)."
  },
  {
    "id": 18,
    "question": "If a CSV file has 4 columns, what is the valid index range to access row elements?",
    "options": [
      "0 to 4",
      "0 to 3",
      "1 to 4",
      "-4 to 4"
    ],
    "correctAnswer": 1,
    "explanation": "For 4 columns, valid non-negative indices are 0, 1, 2, and 3.",
    "hint": "0 to 3."
  },
  {
    "id": 19,
    "question": "What happens if you loop through a csv.reader object a second time in the same block without re-opening or seeking?",
    "options": [
      "It reads from the start again",
      "The loop terminates immediately because the file iterator is already exhausted at EOF",
      "It raises EOFError",
      "It loops backwards"
    ],
    "correctAnswer": 1,
    "explanation": "An iterator is consumed once; a second loop on an exhausted iterator yields no items unless the file is rewound with f.seek(0).",
    "hint": "Iterator is already exhausted."
  },
  {
    "id": 20,
    "question": "How do you rewind a file handle 'f' back to the beginning to re-read it with csv.reader?",
    "options": [
      "f.rewind()",
      "f.seek(0)",
      "f.reset()",
      "reader.reset()"
    ],
    "correctAnswer": 1,
    "explanation": "f.seek(0) resets the file pointer to byte offset 0.",
    "hint": "f.seek(0)."
  },
  {
    "id": 21,
    "question": "Consider: header = next(reader). What does header contain?",
    "options": [
      "A list of column names from the first line of the file",
      "A string of the first line",
      "A dictionary of types",
      "True or False"
    ],
    "correctAnswer": 0,
    "explanation": "header contains a list of column names parsed from the first line.",
    "hint": "List of column names."
  },
  {
    "id": 22,
    "question": "In CBSE exam coding questions, what is the standard function signature for displaying all records of a CSV file?",
    "options": [
      "def DisplayRecords():",
      "def ShowCSV():",
      "Both are standard names",
      "def Reader():"
    ],
    "correctAnswer": 2,
    "explanation": "Functions like DisplayRecords() or ShowAll() are typical names used in CBSE board question papers.",
    "hint": "Standard descriptive user function name."
  },
  {
    "id": 23,
    "question": "What does the expression [row[1] for row in reader] evaluate to?",
    "options": [
      "A list of all values in column 1 (e.g. all student names)",
      "A single student name",
      "A list of booleans",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "A list comprehension extracting index 1 from every row produces a list of all column 1 values.",
    "hint": "List of all values in column 1."
  },
  {
    "id": 24,
    "question": "Can csv.reader parse a file where some records have 3 fields and others have 5 fields?",
    "options": [
      "No, it strictly enforces equal column counts",
      "Yes, csv.reader parses whatever fields are delimited on each line, resulting in varying list lengths",
      "Only if padded with zeroes",
      "Only if strict=True"
    ],
    "correctAnswer": 1,
    "explanation": "csv.reader does not require uniform column counts; each row list simply has the length of fields found on that line.",
    "hint": "Yes, yields varying list lengths."
  },
  {
    "id": 25,
    "question": "Why should you never use line.split(',') instead of csv.reader in Class 12 board examinations?",
    "options": [
      "Because line.split() is deprecated in Python 3",
      "Because line.split(',') fails completely when fields contain commas inside quotes or escaped delimiters",
      "Because line.split() is slower by 1000x",
      "Because split only works on numbers"
    ],
    "correctAnswer": 1,
    "explanation": "Naive split(',') breaks quoted fields with commas into bogus extra columns, violating RFC 4180.",
    "hint": "Fails on commas inside quotes."
  }
];

export default questions;
