// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "Which of the following functions in the csv module is used to write a single record to a CSV file?",
    "options": [
      "writer.writerow()",
      "writer.writerows()",
      "writer.writeline()",
      "writer.dump()"
    ],
    "correctAnswer": 0,
    "explanation": "writer.writerow() writes a single row from a 1D sequence.",
    "hint": "writer.writerow()."
  },
  {
    "id": 2,
    "question": "What is the consequence of not using newline='' when opening a CSV file for writing on a Windows system?",
    "options": [
      "File is corrupted and unreadable",
      "An extra blank line is inserted between consecutive records written",
      "SyntaxError is raised",
      "Permission denied error occurs"
    ],
    "correctAnswer": 1,
    "explanation": "On Windows, universal newline translation produces \\r\\r\\n, resulting in an empty row between records.",
    "hint": "Extra blank line between records."
  },
  {
    "id": 3,
    "question": "Which of the following creates a reader that parses Pipe-delimited records?",
    "options": [
      "csv.reader(f, sep='|')",
      "csv.reader(f, delimiter='|')",
      "csv.reader(f, split='|')",
      "csv.reader(f, pipe=True)"
    ],
    "correctAnswer": 1,
    "explanation": "The parameter name is 'delimiter', e.g. csv.reader(f, delimiter='|').",
    "hint": "delimiter='|'."
  },
  {
    "id": 4,
    "question": "What is the return type of csv.reader(f) in Python?",
    "options": [
      "A list of all strings",
      "An iterable reader stream object",
      "A dictionary",
      "A single string"
    ],
    "correctAnswer": 1,
    "explanation": "csv.reader returns an iterable reader stream object yielding rows on demand.",
    "hint": "An iterable reader object."
  },
  {
    "id": 5,
    "question": "What is the datatype of every field parsed from a CSV file by default?",
    "options": [
      "str",
      "int",
      "float",
      "auto-detected"
    ],
    "correctAnswer": 0,
    "explanation": "All fields parsed from CSV are initially strings (str).",
    "hint": "str."
  },
  {
    "id": 6,
    "question": "How do you advance the reader past the column header row?",
    "options": [
      "next(reader)",
      "reader.skip()",
      "reader.pop()",
      "reader.jump()"
    ],
    "correctAnswer": 0,
    "explanation": "next(reader) consumes and returns the first row, positioning the iterator at data rows.",
    "hint": "next(reader)."
  },
  {
    "id": 7,
    "question": "What method writes a sequence of multiple rows (list of lists) in a single call?",
    "options": [
      "writer.write()",
      "writer.writerows()",
      "writer.write_all()",
      "writer.writelines()"
    ],
    "correctAnswer": 1,
    "explanation": "writer.writerows(nested_list) writes multiple rows.",
    "hint": "writer.writerows()."
  },
  {
    "id": 8,
    "question": "What happens if a field in your data contains a comma, e.g. 'Barrackpore, Kolkata'?",
    "options": [
      "csv.writer automatically wraps the field in double quotes",
      "The comma is erased",
      "Python throws an error",
      "The string is truncated"
    ],
    "correctAnswer": 0,
    "explanation": "Under default QUOTE_MINIMAL, csv.writer encloses fields containing delimiters in quotes.",
    "hint": "Automatically wrapped in double quotes."
  },
  {
    "id": 9,
    "question": "Which mode should be used to append new student records without deleting existing data?",
    "options": [
      "'r'",
      "'w'",
      "'a'",
      "'r+'"
    ],
    "correctAnswer": 2,
    "explanation": "'a' (append) mode appends records to the end of the file.",
    "hint": "'a' (append mode)."
  },
  {
    "id": 10,
    "question": "What error is raised if you compare row[3] > 90 directly without casting to float?",
    "options": [
      "TypeError",
      "ValueError",
      "IndexError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Comparing 'str' and 'int' with '>' raises TypeError in Python 3.",
    "hint": "TypeError."
  },
  {
    "id": 11,
    "question": "What is the standard RFC document defining CSV format rules?",
    "options": [
      "RFC 822",
      "RFC 4180",
      "RFC 1918",
      "RFC 793"
    ],
    "correctAnswer": 1,
    "explanation": "RFC 4180 is the standard specification for CSV files.",
    "hint": "RFC 4180."
  },
  {
    "id": 12,
    "question": "What does the csv.Sniffer class do?",
    "options": [
      "Detects malware",
      "Deduces the delimiter and checks for headers in a CSV text sample",
      "Compresses CSV",
      "Encrypts records"
    ],
    "correctAnswer": 1,
    "explanation": "csv.Sniffer analyzes samples to detect delimiters and header rows.",
    "hint": "Deduces delimiter & detects headers."
  },
  {
    "id": 13,
    "question": "What line terminator does the built-in 'excel' dialect use?",
    "options": [
      "'\\n'",
      "'\\r\\n'",
      "'\\r'",
      "';'"
    ],
    "correctAnswer": 1,
    "explanation": "The default line terminator in 'excel' dialect is '\\r\\n'.",
    "hint": "'\\r\\n'."
  },
  {
    "id": 14,
    "question": "How can you check if an imported CSV row is completely empty to prevent IndexError?",
    "options": [
      "if not row: continue",
      "if len(row) == 0: continue",
      "Both A and B are valid",
      "Neither is valid"
    ],
    "correctAnswer": 2,
    "explanation": "Both 'if not row:' and 'if len(row) == 0:' safely identify and bypass empty lists.",
    "hint": "Both A and B."
  },
  {
    "id": 15,
    "question": "Which quoting constant quotes every field without exception?",
    "options": [
      "csv.QUOTE_MINIMAL",
      "csv.QUOTE_ALL",
      "csv.QUOTE_NONNUMERIC",
      "csv.QUOTE_NONE"
    ],
    "correctAnswer": 1,
    "explanation": "csv.QUOTE_ALL forces quotes around every single field.",
    "hint": "csv.QUOTE_ALL."
  },
  {
    "id": 16,
    "question": "What is the registered dialect name for tab-separated values in Python?",
    "options": [
      "'tab'",
      "'tsv'",
      "'excel-tab'",
      "'unix-tab'"
    ],
    "correctAnswer": 2,
    "explanation": "'excel-tab' is the built-in registered dialect for TSV.",
    "hint": "'excel-tab'."
  },
  {
    "id": 17,
    "question": "What is the maximum allowed length of the delimiter string in Python's standard csv module?",
    "options": [
      "1 character",
      "2 characters",
      "Unlimited",
      "4 characters"
    ],
    "correctAnswer": 0,
    "explanation": "Python standard csv module strictly requires a 1-character string as delimiter.",
    "hint": "1 character."
  },
  {
    "id": 18,
    "question": "How can you update a record in a CSV file?",
    "options": [
      "Read rows into memory, modify target row, rewrite whole file using 'w' mode with writerows()",
      "Use f.seek() in 'w' mode",
      "Call reader.update()",
      "Use pickle.dump()"
    ],
    "correctAnswer": 0,
    "explanation": "Loading records into a list, updating target row, and rewriting with 'w' mode is the standard approach.",
    "hint": "Load to list, modify, rewrite."
  },
  {
    "id": 19,
    "question": "How do you calculate the arithmetic average of marks from a CSV file?",
    "options": [
      "total_marks / count (where count > 0)",
      "max - min",
      "total_marks / 100",
      "reader.average()"
    ],
    "correctAnswer": 0,
    "explanation": "Average is total marks divided by count of valid records.",
    "hint": "total_marks / count."
  },
  {
    "id": 20,
    "question": "What exception occurs if count == 0 and you compute total / count?",
    "options": [
      "ZeroDivisionError",
      "ValueError",
      "IndexError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Dividing by zero raises ZeroDivisionError.",
    "hint": "ZeroDivisionError."
  },
  {
    "id": 21,
    "question": "What class in the csv module writes dictionary data structures into CSV format based on fieldnames?",
    "options": [
      "csv.DictWriter",
      "csv.MapWriter",
      "csv.RecordWriter",
      "csv.JsonWriter"
    ],
    "correctAnswer": 0,
    "explanation": "csv.DictWriter maps dictionaries to delimited CSV rows.",
    "hint": "csv.DictWriter."
  },
  {
    "id": 22,
    "question": "What method of csv.DictWriter writes the field names as the header line?",
    "options": [
      "writer.writeheader()",
      "writer.header()",
      "writer.writerow()",
      "writer.columns()"
    ],
    "correctAnswer": 0,
    "explanation": "writer.writeheader() outputs the fieldnames as the first row.",
    "hint": "writer.writeheader()."
  },
  {
    "id": 23,
    "question": "Why should you use os.path.exists() before opening a file in read mode?",
    "options": [
      "To avoid FileNotFoundError if the file is missing",
      "To check permissions",
      "To delete the file",
      "To speed up reading"
    ],
    "correctAnswer": 0,
    "explanation": "Checking file existence prevents unhandled FileNotFoundError exceptions.",
    "hint": "Prevents FileNotFoundError."
  },
  {
    "id": 24,
    "question": "Consider: target = '101'; for row in reader: if row[0] == target: print(row); found = True; break. Why call break?",
    "options": [
      "Stops loop immediately since primary key (Roll No) is unique, saving CPU cycles",
      "Closes the file",
      "Deletes target",
      "Required by syntax"
    ],
    "correctAnswer": 0,
    "explanation": "Since primary keys are unique, halting search upon first match optimizes performance.",
    "hint": "Halts loop once unique record is found."
  },
  {
    "id": 25,
    "question": "In CBSE board marking schemes, what is the weightage of the CSV file handling question in Unit I?",
    "options": [
      "1 mark",
      "2 to 4 marks",
      "10 marks",
      "15 marks"
    ],
    "correctAnswer": 1,
    "explanation": "CSV file handling programming questions typically carry 2 to 4 marks in the annual theory board exam.",
    "hint": "2 to 4 marks."
  }
];

export default questions;
