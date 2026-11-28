// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "Which statement correctly imports Python's standard CSV handling module?",
    "options": [
      "include csv",
      "import csv",
      "using csv",
      "from csv import * as csv"
    ],
    "correctAnswer": 1,
    "explanation": "In Python, modules from the standard library are imported using the 'import' keyword, e.g. 'import csv'.",
    "hint": "import csv."
  },
  {
    "id": 2,
    "question": "Do you need to install any external package from PyPI to use the 'csv' module in Python 3?",
    "options": [
      "Yes, install using 'pip install python-csv'",
      "No, it is built into the Python standard library",
      "Yes, only available in Anaconda Python",
      "No, but it requires pandas"
    ],
    "correctAnswer": 1,
    "explanation": "The 'csv' module is part of Python's standard library and is bundled with all standard Python installations.",
    "hint": "Built into Python standard library."
  },
  {
    "id": 3,
    "question": "Which function in the csv module returns an object that allows writing tabular records to a file?",
    "options": [
      "csv.write()",
      "csv.writer()",
      "csv.output()",
      "csv.dump()"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer(file_object) creates and returns a writer object.",
    "hint": "csv.writer()."
  },
  {
    "id": 4,
    "question": "Which function in the csv module returns an iterable object used to read records from a CSV file?",
    "options": [
      "csv.read()",
      "csv.reader()",
      "csv.load()",
      "csv.scanner()"
    ],
    "correctAnswer": 1,
    "explanation": "csv.reader(file_object) returns an iterable reader object for line-by-line reading.",
    "hint": "csv.reader()."
  },
  {
    "id": 5,
    "question": "What is the return type of the csv.reader(file_handle) function?",
    "options": [
      "A list of strings",
      "A dictionary of records",
      "An iterable _csv.reader object",
      "A file pointer integer"
    ],
    "correctAnswer": 2,
    "explanation": "csv.reader returns an iterable reader object that yields rows as lists of strings when iterated.",
    "hint": "An iterable reader object."
  },
  {
    "id": 6,
    "question": "What is the default dialect used by Python's csv module?",
    "options": [
      "'unix'",
      "'excel'",
      "'tsv'",
      "'rfc4180'"
    ],
    "correctAnswer": 1,
    "explanation": "The default dialect registered in Python's csv module is 'excel'.",
    "hint": "'excel'."
  },
  {
    "id": 7,
    "question": "Which function lists all dialects currently registered in the Python environment?",
    "options": [
      "csv.show_dialects()",
      "csv.list_dialects()",
      "csv.dialects()",
      "csv.all_dialects()"
    ],
    "correctAnswer": 1,
    "explanation": "csv.list_dialects() returns a list of names of all registered dialects (e.g. ['excel', 'excel-tab', 'unix']).",
    "hint": "csv.list_dialects()."
  },
  {
    "id": 8,
    "question": "What is the default quoting style constant used by csv.writer if not specified?",
    "options": [
      "csv.QUOTE_ALL",
      "csv.QUOTE_MINIMAL",
      "csv.QUOTE_NONE",
      "csv.QUOTE_NONNUMERIC"
    ],
    "correctAnswer": 1,
    "explanation": "csv.QUOTE_MINIMAL is the default quoting behavior (quotes only when fields contain delimiters or quote characters).",
    "hint": "csv.QUOTE_MINIMAL."
  },
  {
    "id": 9,
    "question": "Which quoting constant instructs the csv.writer to put quotes around every single field written?",
    "options": [
      "csv.QUOTE_MINIMAL",
      "csv.QUOTE_NONNUMERIC",
      "csv.QUOTE_ALL",
      "csv.QUOTE_EVERY"
    ],
    "correctAnswer": 2,
    "explanation": "csv.QUOTE_ALL forces quotation marks around all fields regardless of data type.",
    "hint": "csv.QUOTE_ALL."
  },
  {
    "id": 10,
    "question": "Which quoting constant instructs the writer to quote only non-numeric strings while leaving numbers bare?",
    "options": [
      "csv.QUOTE_TEXT",
      "csv.QUOTE_NONNUMERIC",
      "csv.QUOTE_STRINGS",
      "csv.QUOTE_AUTO"
    ],
    "correctAnswer": 1,
    "explanation": "csv.QUOTE_NONNUMERIC instructs the writer to quote all non-numeric fields and converts unquoted fields to floats on reading.",
    "hint": "csv.QUOTE_NONNUMERIC."
  },
  {
    "id": 11,
    "question": "Which class in the csv module allows reading records directly as dictionaries mapped by column header names?",
    "options": [
      "csv.DictReader",
      "csv.MapReader",
      "csv.JsonReader",
      "csv.RecordReader"
    ],
    "correctAnswer": 0,
    "explanation": "csv.DictReader reads rows into dictionary mapping column headers to cell values.",
    "hint": "csv.DictReader."
  },
  {
    "id": 12,
    "question": "Which class in the csv module writes dictionary data structures into CSV format based on given fieldnames?",
    "options": [
      "csv.DictWriter",
      "csv.MapWriter",
      "csv.TableWriter",
      "csv.RecordWriter"
    ],
    "correctAnswer": 0,
    "explanation": "csv.DictWriter creates an object to write dictionaries out to a CSV file.",
    "hint": "csv.DictWriter."
  },
  {
    "id": 13,
    "question": "What error is raised if csv.QUOTE_NONE is used and a field contains the delimiter without an escape character configured?",
    "options": [
      "csv.Error",
      "ValueError",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "When csv.QUOTE_NONE is set and delimiter appears in unescaped data, Python raises csv.Error.",
    "hint": "csv.Error."
  },
  {
    "id": 14,
    "question": "Which method of csv.DictWriter must be called to write the field names as the first line of the CSV file?",
    "options": [
      "writer.write_columns()",
      "writer.writeheader()",
      "writer.header()",
      "writer.create_schema()"
    ],
    "correctAnswer": 1,
    "explanation": "writer.writeheader() writes a row with the field names specified during DictWriter initialization.",
    "hint": "writer.writeheader()."
  },
  {
    "id": 15,
    "question": "What is the default line terminator in Python's 'excel' dialect?",
    "options": [
      "'\\n'",
      "'\\r\\n'",
      "'\\r'",
      "';'"
    ],
    "correctAnswer": 1,
    "explanation": "The default line terminator in the 'excel' dialect is '\\r\\n' (Carriage Return + Line Feed).",
    "hint": "'\\r\\n'."
  },
  {
    "id": 16,
    "question": "What is the default quote character used by the csv module?",
    "options": [
      "Single quote (')",
      "Double quote (\")",
      "Backtick (`)",
      "Tilde (~)"
    ],
    "correctAnswer": 1,
    "explanation": "The default quotechar is the double quote (\").",
    "hint": "Double quote (\")."
  },
  {
    "id": 17,
    "question": "What is a 'Dialect' in the context of Python's csv module?",
    "options": [
      "A human spoken language for error messages",
      "A helper class that bundles all formatting parameters like delimiter, quotechar, and lineterminator",
      "A compiled C extension",
      "A type of SQL database connection"
    ],
    "correctAnswer": 1,
    "explanation": "A dialect groups together formatting parameters (delimiter, quotechar, escapechar, etc.) for convenience.",
    "hint": "Groups formatting parameters."
  },
  {
    "id": 18,
    "question": "How do you register a custom dialect named 'my_pipe' in Python?",
    "options": [
      "csv.register_dialect('my_pipe', delimiter='|')",
      "csv.add_dialect('my_pipe', delimiter='|')",
      "csv.set_dialect('my_pipe', delimiter='|')",
      "csv.create_dialect('my_pipe', delimiter='|')"
    ],
    "correctAnswer": 0,
    "explanation": "csv.register_dialect(name, **kwargs) is used to register custom formatting rules.",
    "hint": "csv.register_dialect()."
  },
  {
    "id": 19,
    "question": "Which exception class is specifically raised by the csv module for formatting and parsing errors?",
    "options": [
      "csv.CSVException",
      "csv.Error",
      "csv.ParsingError",
      "csv.FileFormatError"
    ],
    "correctAnswer": 1,
    "explanation": "csv.Error is the standard exception class raised by functions and classes in the csv module.",
    "hint": "csv.Error."
  },
  {
    "id": 20,
    "question": "Can csv.reader accept a list of strings instead of an actual file object?",
    "options": [
      "No, it requires an OS file descriptor",
      "Yes, it accepts any iterable that yields strings line-by-line",
      "Only if opened in binary mode",
      "Only in Python 2"
    ],
    "correctAnswer": 1,
    "explanation": "csv.reader accepts any object which supports the iterator protocol and returns a string each time its __next__() method is called.",
    "hint": "Accepts any iterable yielding strings."
  },
  {
    "id": 21,
    "question": "What happens if you pass an unquoted string containing commas to csv.writer when using default settings?",
    "options": [
      "The writer crashes",
      "The writer automatically encloses the field in double quotes",
      "The commas are removed",
      "The string is truncated"
    ],
    "correctAnswer": 1,
    "explanation": "Under default QUOTE_MINIMAL, csv.writer automatically wraps the field in double quotes so that the internal comma isn't misinterpreted as a delimiter.",
    "hint": "Automatically encloses in quotes."
  },
  {
    "id": 22,
    "question": "What does the csv.field_size_limit() function do?",
    "options": [
      "Limits the maximum number of rows in a file",
      "Sets/returns the maximum allowed field size (character count) for CSV parsing",
      "Controls disk sector size",
      "Sets maximum file size in megabytes"
    ],
    "correctAnswer": 1,
    "explanation": "csv.field_size_limit([new_limit]) returns or modifies the maximum field size allowed by the parser.",
    "hint": "Maximum field size for parser."
  },
  {
    "id": 23,
    "question": "Which function in the csv module inspects a sample of a CSV file and automatically deduces its delimiter and dialect?",
    "options": [
      "csv.Detector()",
      "csv.Sniffer()",
      "csv.Inspector()",
      "csv.Analyzer()"
    ],
    "correctAnswer": 1,
    "explanation": "csv.Sniffer() is a class that deduces the format of a CSV file (sniff) and detects whether a header row is present (has_header).",
    "hint": "csv.Sniffer()."
  },
  {
    "id": 24,
    "question": "What does sniffer.has_header(sample_text) return?",
    "options": [
      "A list of column names",
      "True if the sample appears to have a header row, False otherwise",
      "The line count of the header",
      "The character count"
    ],
    "correctAnswer": 1,
    "explanation": "has_header() analyzes the sample text and returns True if the first row appears to be column names rather than data records.",
    "hint": "Boolean True or False."
  },
  {
    "id": 25,
    "question": "In the CBSE Class 12 Computer Science practical syllabus, which two objects of the csv module are compulsory to master?",
    "options": [
      "csv.Sniffer and csv.Dialect",
      "csv.reader and csv.writer",
      "csv.DictReader and csv.DictWriter only",
      "csv.field_size_limit and csv.QUOTE_ALL"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE Syllabus Unit I specifically tests reading and writing tabular records using csv.reader and csv.writer.",
    "hint": "csv.reader and csv.writer."
  }
];

export default questions;
