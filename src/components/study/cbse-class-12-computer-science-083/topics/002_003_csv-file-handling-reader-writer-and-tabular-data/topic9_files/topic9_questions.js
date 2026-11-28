// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "Which Python module is imported for working with CSV files?",
    "options": [
      "pandas",
      "csv",
      "sys",
      "os"
    ],
    "correctAnswer": 1,
    "explanation": "The built-in 'csv' module provides all standard CSV functionality.",
    "hint": "csv."
  },
  {
    "id": 2,
    "question": "What parameter must always be specified when opening a file for writing with csv.writer on Windows?",
    "options": [
      "newline=''",
      "mode='binary'",
      "encoding='ascii'",
      "flush=True"
    ],
    "correctAnswer": 0,
    "explanation": "newline='' prevents Windows from translating \\n to \\r\\n which causes unwanted blank lines.",
    "hint": "newline=''."
  },
  {
    "id": 3,
    "question": "What method of csv.writer writes a single row from a 1D list?",
    "options": [
      "writer.writerow()",
      "writer.writerows()",
      "writer.writeline()",
      "writer.write()"
    ],
    "correctAnswer": 0,
    "explanation": "writer.writerow() takes a sequence and writes one delimited row.",
    "hint": "writer.writerow()."
  },
  {
    "id": 4,
    "question": "What method of csv.writer writes a list of lists (multiple rows) at once?",
    "options": [
      "writer.write_all()",
      "writer.writerows()",
      "writer.writelines()",
      "writer.dump()"
    ],
    "correctAnswer": 1,
    "explanation": "writer.writerows() writes a 2D matrix/sequence of sequences.",
    "hint": "writer.writerows()."
  },
  {
    "id": 5,
    "question": "What is the return type of csv.reader(f)?",
    "options": [
      "A list of lines",
      "An iterable _csv.reader object",
      "A dictionary",
      "A single string"
    ],
    "correctAnswer": 1,
    "explanation": "csv.reader returns an iterable reader stream object.",
    "hint": "An iterable reader object."
  },
  {
    "id": 6,
    "question": "When looping 'for row in reader:', what is the datatype of each 'row'?",
    "options": [
      "str",
      "list",
      "dict",
      "tuple"
    ],
    "correctAnswer": 1,
    "explanation": "Each row is returned as a list of strings.",
    "hint": "list."
  },
  {
    "id": 7,
    "question": "What is the default delimiter in Python's csv module?",
    "options": [
      "Tab ('\\t')",
      "Semicolon (';')",
      "Comma (',')",
      "Pipe ('|')"
    ],
    "correctAnswer": 2,
    "explanation": "The default delimiter is a comma (',').",
    "hint": "Comma (',')."
  },
  {
    "id": 8,
    "question": "How do you specify a tab delimiter for reading a TSV file?",
    "options": [
      "csv.reader(f, delimiter='\\t')",
      "csv.reader(f, sep='tab')",
      "csv.reader(f, tab=True)",
      "csv.reader(f, split='\\t')"
    ],
    "correctAnswer": 0,
    "explanation": "csv.reader(f, delimiter='\\t') sets the tab character as the delimiter.",
    "hint": "delimiter='\\t'."
  },
  {
    "id": 9,
    "question": "Which function skips the header row of a CSV file before iterating through records?",
    "options": [
      "next(reader)",
      "reader.skip()",
      "reader.pop()",
      "reader.next_line()"
    ],
    "correctAnswer": 0,
    "explanation": "next(reader) consumes and returns the first row, advancing the reader.",
    "hint": "next(reader)."
  },
  {
    "id": 10,
    "question": "Why must numeric CSV fields be explicitly cast with float() or int()?",
    "options": [
      "Because CSV parser yields all fields as string (str) datatypes",
      "To compress data",
      "Because numbers are encrypted",
      "To avoid EOFError"
    ],
    "correctAnswer": 0,
    "explanation": "Text files contain only characters; everything parsed is of type str.",
    "hint": "All fields are parsed as strings."
  },
  {
    "id": 11,
    "question": "What error occurs if you call float('Salary') on the header row?",
    "options": [
      "IndexError",
      "ValueError: could not convert string to float",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 1,
    "explanation": "Attempting to cast non-numeric header text raises ValueError.",
    "hint": "ValueError."
  },
  {
    "id": 12,
    "question": "What line terminator does the default 'excel' dialect produce?",
    "options": [
      "'\\n'",
      "'\\r\\n'",
      "'\\r'",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "'\\r\\n' is the default line terminator in Python's excel dialect.",
    "hint": "'\\r\\n'."
  },
  {
    "id": 13,
    "question": "What does the quoting constant csv.QUOTE_ALL do?",
    "options": [
      "Quotes all fields regardless of their content or datatype",
      "Quotes only commas",
      "Quotes only numbers",
      "Never quotes"
    ],
    "correctAnswer": 0,
    "explanation": "csv.QUOTE_ALL encloses every field in quotes.",
    "hint": "Quotes all fields."
  },
  {
    "id": 14,
    "question": "What does the quoting constant csv.QUOTE_MINIMAL do?",
    "options": [
      "Quotes only fields containing special characters like delimiter or quotechar (Default)",
      "Quotes nothing",
      "Quotes first column only",
      "Quotes numbers only"
    ],
    "correctAnswer": 0,
    "explanation": "QUOTE_MINIMAL quotes only when strictly necessary to preserve structure.",
    "hint": "Quotes only fields containing special characters."
  },
  {
    "id": 15,
    "question": "Which mode should be used to append records to an existing CSV file?",
    "options": [
      "'r'",
      "'w'",
      "'a'",
      "'r+'"
    ],
    "correctAnswer": 2,
    "explanation": "'a' (append) mode adds records to the end of the file.",
    "hint": "'a' (append mode)."
  },
  {
    "id": 16,
    "question": "What happens if an existing CSV file is opened in 'w' mode?",
    "options": [
      "All previous content is truncated/erased",
      "New content is appended",
      "Opened read-only",
      "Raises FileExistsError"
    ],
    "correctAnswer": 0,
    "explanation": "'w' mode creates a new file or erases existing content.",
    "hint": "Erases existing content."
  },
  {
    "id": 17,
    "question": "How do you guard against ZeroDivisionError when calculating average?",
    "options": [
      "Check if count > 0 before dividing total by count",
      "Use round()",
      "Use abs()",
      "Cast count to float"
    ],
    "correctAnswer": 0,
    "explanation": "Validating that count > 0 prevents division by zero.",
    "hint": "Check if count > 0."
  },
  {
    "id": 18,
    "question": "What does row[0] represent in row = ['101', 'Aarav', '95']?",
    "options": [
      "First field ('101')",
      "Second field ('Aarav')",
      "Whole row",
      "Line number"
    ],
    "correctAnswer": 0,
    "explanation": "Zero-based indexing accesses the first column at index 0.",
    "hint": "First field at index 0."
  },
  {
    "id": 19,
    "question": "How do you remove a record from a CSV file?",
    "options": [
      "Read rows, filter out target record, rewrite file using writerows()",
      "Call file.delete_row()",
      "Use del reader[0]",
      "Use SQL DROP"
    ],
    "correctAnswer": 0,
    "explanation": "Filter out target row from the list of records and rewrite the file.",
    "hint": "Filter out and rewrite."
  },
  {
    "id": 20,
    "question": "What is the standard RFC standard defining the CSV format?",
    "options": [
      "RFC 822",
      "RFC 4180",
      "RFC 2616",
      "RFC 1918"
    ],
    "correctAnswer": 1,
    "explanation": "RFC 4180 defines the standard CSV format specification.",
    "hint": "RFC 4180."
  },
  {
    "id": 21,
    "question": "Which of the following creates a reader that ignores spaces following delimiters?",
    "options": [
      "csv.reader(f, skipinitialspace=True)",
      "csv.reader(f, nospace=True)",
      "csv.reader(f, trim=True)",
      "csv.reader(f, strip=True)"
    ],
    "correctAnswer": 0,
    "explanation": "skipinitialspace=True trims whitespace immediately after delimiters.",
    "hint": "skipinitialspace=True."
  },
  {
    "id": 22,
    "question": "What happens if a field contains a comma in default CSV writing?",
    "options": [
      "It is automatically wrapped in double quotes",
      "The comma is deleted",
      "An error is raised",
      "The field is truncated"
    ],
    "correctAnswer": 0,
    "explanation": "csv.writer automatically encloses fields containing delimiters in quotes.",
    "hint": "Wrapped in double quotes."
  },
  {
    "id": 23,
    "question": "What is the result of casting a blank row [] to boolean 'bool([])' in Python?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Empty lists evaluate to False in boolean context ('if not row: continue').",
    "hint": "False."
  },
  {
    "id": 24,
    "question": "In Python, which class allows reading CSV rows as dictionaries indexed by column headers?",
    "options": [
      "csv.DictReader",
      "csv.MapReader",
      "csv.JsonReader",
      "csv.TableReader"
    ],
    "correctAnswer": 0,
    "explanation": "csv.DictReader maps row values to dictionary keys derived from the header row.",
    "hint": "csv.DictReader."
  },
  {
    "id": 25,
    "question": "How many marks does Unit I (Computational Thinking & Programming - 2) carry in CBSE Class 12 CS Board Exam?",
    "options": [
      "20 Marks",
      "30 Marks",
      "40 Marks",
      "50 Marks"
    ],
    "correctAnswer": 2,
    "explanation": "Unit I carries 40 marks out of the 70-mark theory paper.",
    "hint": "40 Marks."
  }
];

export default questions;
