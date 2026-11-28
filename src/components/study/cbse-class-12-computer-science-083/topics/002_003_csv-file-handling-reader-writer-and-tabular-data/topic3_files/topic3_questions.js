// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "Which method of csv.writer writes a single row to a CSV file from a list or tuple?",
    "options": [
      "writer.write()",
      "writer.writerow()",
      "writer.writeline()",
      "writer.append()"
    ],
    "correctAnswer": 1,
    "explanation": "writer.writerow(sequence) writes a single row to the CSV file.",
    "hint": "writer.writerow()."
  },
  {
    "id": 2,
    "question": "Which method of csv.writer is used to write a collection of multiple rows at once?",
    "options": [
      "writer.write_all()",
      "writer.writerows()",
      "writer.writelines()",
      "writer.dump_records()"
    ],
    "correctAnswer": 1,
    "explanation": "writer.writerows(nested_list) writes multiple rows in a single call.",
    "hint": "writer.writerows()."
  },
  {
    "id": 3,
    "question": "What type of argument does writerow() expect?",
    "options": [
      "A single integer",
      "An iterable sequence (such as a list or tuple of values)",
      "A dictionary only",
      "A file handle"
    ],
    "correctAnswer": 1,
    "explanation": "writerow() expects an iterable containing the field values for that row (e.g., [101, 'Amit', 95]).",
    "hint": "An iterable sequence (list/tuple)."
  },
  {
    "id": 4,
    "question": "What type of argument does writerows() expect?",
    "options": [
      "A single string",
      "An iterable of iterables (e.g., a list of lists or list of tuples)",
      "A single integer",
      "A boolean"
    ],
    "correctAnswer": 1,
    "explanation": "writerows() expects a sequence of sequences where each inner sequence represents one row.",
    "hint": "An iterable of iterables (list of lists)."
  },
  {
    "id": 5,
    "question": "What happens if you pass a 1D list ['101', 'Joy', 90] into writerows() instead of writerow()?",
    "options": [
      "Syntax error occurs",
      "It iterates over each element ('101', 'Joy', 90) and treats them as separate rows, splitting characters across columns",
      "It automatically corrects it to writerow()",
      "It deletes the file"
    ],
    "correctAnswer": 1,
    "explanation": "writerows treats each item of the outer sequence as a row. For string '101', it writes '1','0','1' as row 1!",
    "hint": "Treats each element as an individual row."
  },
  {
    "id": 6,
    "question": "Consider: writer.writerow(['Roll', 'Name', 'Score']). How many commas will be written between these fields?",
    "options": [
      "1",
      "2",
      "3",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "For three fields, exactly 2 delimiters (commas) separate them.",
    "hint": "Two commas."
  },
  {
    "id": 7,
    "question": "Can integer and float values be passed directly into the list given to writerow()?",
    "options": [
      "No, they must be manually converted to strings first",
      "Yes, csv.writer automatically handles conversion of numbers into text format",
      "Only integers are allowed",
      "Only floats are allowed"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer automatically converts numeric values (int, float) into text representations.",
    "hint": "Automatically converts numbers to text."
  },
  {
    "id": 8,
    "question": "What file access mode should be used if you want to add new rows to an existing CSV file without overwriting old data?",
    "options": [
      "'r'",
      "'w'",
      "'a'",
      "'x'"
    ],
    "correctAnswer": 2,
    "explanation": "'a' (append) mode appends records to the end of the file preserving existing content.",
    "hint": "'a' (append mode)."
  },
  {
    "id": 9,
    "question": "What happens if you open an existing CSV file in 'w' mode?",
    "options": [
      "New records are added at the end",
      "The file is truncated to zero length and all existing data is erased",
      "File is opened read-only",
      "Permission error is raised"
    ],
    "correctAnswer": 1,
    "explanation": "'w' mode creates a new file or overwrites/truncates an existing file completely.",
    "hint": "Erases existing content."
  },
  {
    "id": 10,
    "question": "Which of the following writes a header row to a CSV file?",
    "options": [
      "writer.writerow(['AdmNo', 'Name', 'Marks'])",
      "writer.writeheader(['AdmNo', 'Name', 'Marks'])",
      "writer.head(['AdmNo', 'Name', 'Marks'])",
      "writer.add_columns('AdmNo', 'Name', 'Marks')"
    ],
    "correctAnswer": 0,
    "explanation": "For standard csv.writer, writerow() is used to write any row, including the header row.",
    "hint": "writer.writerow()."
  },
  {
    "id": 11,
    "question": "Consider: records = [[1, 'A'], [2, 'B']]. Which command writes all these records in one line of code?",
    "options": [
      "writer.write(records)",
      "writer.writerows(records)",
      "writer.writerow(records)",
      "writer.dump(records)"
    ],
    "correctAnswer": 1,
    "explanation": "writer.writerows(records) writes all sub-lists as separate rows.",
    "hint": "writer.writerows(records)."
  },
  {
    "id": 12,
    "question": "What is written to disk if a value inside a list contains a comma, like ['Kolkata, WB', 700001]?",
    "options": [
      "Kolkata, WB, 700001",
      "\"Kolkata, WB\",700001",
      "Kolkata WB, 700001",
      "Error is raised"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer automatically wraps fields containing the delimiter in double quotes: \"Kolkata, WB\",700001.",
    "hint": "Encloses in double quotes."
  },
  {
    "id": 13,
    "question": "In Python, which function returns a writer object?",
    "options": [
      "csv.write()",
      "csv.writer()",
      "csv.create_writer()",
      "csv.new_writer()"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer(file_handle) returns the writer object.",
    "hint": "csv.writer()."
  },
  {
    "id": 14,
    "question": "Can a tuple be passed to writerow() instead of a list?",
    "options": [
      "No, lists only",
      "Yes, any sequence/iterable is accepted",
      "Only namedtuples are allowed",
      "Only if cast to string"
    ],
    "correctAnswer": 1,
    "explanation": "writerow accepts any iterable sequence, including lists and tuples.",
    "hint": "Yes, tuples are accepted."
  },
  {
    "id": 15,
    "question": "What is the return value of writerow() in Python 3?",
    "options": [
      "The number of characters written",
      "The row index",
      "None (or return value of underlying write)",
      "True"
    ],
    "correctAnswer": 2,
    "explanation": "writerow() returns None or the return value of the call to the write method of the underlying file object.",
    "hint": "None or character write return."
  },
  {
    "id": 16,
    "question": "What happens if you open a file with with open('data.csv', 'w', newline='') as f: writer = csv.writer(f) and write no records?",
    "options": [
      "An empty file (0 bytes) is created",
      "Error is raised",
      "Default dummy header is added",
      "File is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "An empty file of 0 bytes is created on disk.",
    "hint": "Empty 0-byte file created."
  },
  {
    "id": 17,
    "question": "Consider: row = [101, 'Pranav', [80, 90, 85]]. What does writerow(row) write for the inner list?",
    "options": [
      "Raises TypeError",
      "Converts the inner list to its string representation '[80, 90, 85]' enclosed in quotes",
      "Writes it across 3 columns",
      "Ignores the inner list"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer converts objects to strings via str(); since the list string contains commas, it is quoted: \"[80, 90, 85]\".",
    "hint": "Converts to string representation with quotes."
  },
  {
    "id": 18,
    "question": "How do you append a single user-entered record [rno, name, fees] into 'school.csv'?",
    "options": [
      "with open('school.csv', 'w', newline='') as f: csv.writer(f).writerow([rno, name, fees])",
      "with open('school.csv', 'a', newline='') as f: csv.writer(f).writerow([rno, name, fees])",
      "with open('school.csv', 'r+', newline='') as f: csv.writer(f).write([rno, name, fees])",
      "csv.append('school.csv', [rno, name, fees])"
    ],
    "correctAnswer": 1,
    "explanation": "Opening in 'a' mode with newline='' and calling writerow() appends the record without overwriting.",
    "hint": "Mode 'a' with newline='' and writerow()."
  },
  {
    "id": 19,
    "question": "What is the role of the quotechar parameter in csv.writer(f, quotechar=\"'\")?",
    "options": [
      "Specifies a one-character string used to quote fields containing special characters",
      "Changes the delimiter to quotes",
      "Encrypts strings",
      "Disables quotes"
    ],
    "correctAnswer": 0,
    "explanation": "quotechar specifies the character used to quote fields containing delimiters or quotes (default is \").",
    "hint": "Character used to quote fields."
  },
  {
    "id": 20,
    "question": "If writerows() receives an empty list [], what is written to the file?",
    "options": [
      "One blank line",
      "Nothing is written",
      "An EOF marker",
      "Raises IndexError"
    ],
    "correctAnswer": 1,
    "explanation": "If the list is empty, writerows iterates 0 times, writing nothing to the file.",
    "hint": "Nothing is written."
  },
  {
    "id": 21,
    "question": "Which of the following accurately creates a writer with semicolon ';' delimiter?",
    "options": [
      "csv.writer(f, sep=';')",
      "csv.writer(f, delimiter=';')",
      "csv.writer(f, split=';')",
      "csv.writer(f, char=';')"
    ],
    "correctAnswer": 1,
    "explanation": "The parameter name is 'delimiter', e.g. csv.writer(f, delimiter=';').",
    "hint": "delimiter=';'."
  },
  {
    "id": 22,
    "question": "Can boolean values (True / False) be written directly via writerow()?",
    "options": [
      "No, booleans cause TypeError",
      "Yes, they are written as string 'True' or 'False'",
      "They are written as 1 or 0 binary bytes",
      "They are skipped"
    ],
    "correctAnswer": 1,
    "explanation": "Booleans are converted to their string representations 'True' and 'False'.",
    "hint": "Written as 'True' or 'False'."
  },
  {
    "id": 23,
    "question": "In CBSE board exam questions asking to write a function 'AddRecord()', what is the typical structure?",
    "options": [
      "Open in 'a' with newline='', input fields from user, create csv.writer, call writerow(), close file",
      "Open in 'r', input fields, use pickle.dump()",
      "Open in 'w', call writerows() on empty list",
      "Use SQL INSERT statement"
    ],
    "correctAnswer": 0,
    "explanation": "Standard pattern: open in 'a' mode, get user input into a list, create csv.writer, and call writerow().",
    "hint": "Open in 'a', take input, call writerow()."
  },
  {
    "id": 24,
    "question": "What exception is raised if writerow() is called on a file opened in read-only mode ('r')?",
    "options": [
      "io.UnsupportedOperation (not writable)",
      "csv.Error",
      "ValueError",
      "FileNotFoundError"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to write to a read-only stream raises io.UnsupportedOperation: not writable.",
    "hint": "io.UnsupportedOperation: not writable."
  },
  {
    "id": 25,
    "question": "What is the primary difference between writerow() and file.write()?",
    "options": [
      "file.write() accepts any list while writerow() takes only strings",
      "file.write() requires a single formatted string while writerow() accepts a sequence of individual fields and formats delimiters & quotes automatically",
      "file.write() adds commas automatically",
      "There is no difference"
    ],
    "correctAnswer": 1,
    "explanation": "file.write() requires manual string concatenation, newline and comma formatting, whereas writerow() automatically formats delimiters, quotes, and newlines.",
    "hint": "writerow() formats delimiters and quotes automatically."
  }
];

export default questions;
