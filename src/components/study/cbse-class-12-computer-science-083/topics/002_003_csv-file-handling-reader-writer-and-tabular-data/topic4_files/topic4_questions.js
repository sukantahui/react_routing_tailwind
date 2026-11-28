// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "What parameter in csv.reader() and csv.writer() is used to change the field separator?",
    "options": [
      "sep",
      "separator",
      "delimiter",
      "split_char"
    ],
    "correctAnswer": 2,
    "explanation": "The parameter name in Python's csv module is 'delimiter'.",
    "hint": "delimiter."
  },
  {
    "id": 2,
    "question": "What is the default value of the delimiter parameter in Python's csv module?",
    "options": [
      "Tab ('\\t')",
      "Semicolon (';')",
      "Comma (',')",
      "Space (' ')"
    ],
    "correctAnswer": 2,
    "explanation": "The default delimiter is a comma (',').",
    "hint": "Comma (',')."
  },
  {
    "id": 3,
    "question": "Which delimiter character is used in Tab Separated Values (TSV) files?",
    "options": [
      "'\\n'",
      "'\\t'",
      "'\\r'",
      "'\\s'"
    ],
    "correctAnswer": 1,
    "explanation": "Tab separated values use the horizontal tab character ('\\t').",
    "hint": "'\\t'."
  },
  {
    "id": 4,
    "question": "In Python standard csv module, how many characters long can a delimiter be?",
    "options": [
      "Exactly 1 character",
      "Up to 5 characters",
      "Any length string",
      "Exactly 2 characters"
    ],
    "correctAnswer": 0,
    "explanation": "Python's csv module requires the delimiter to be a 1-character string (TypeError is raised otherwise).",
    "hint": "Exactly 1 character."
  },
  {
    "id": 5,
    "question": "What happens if a file written with delimiter='|' is read with default csv.reader(f)?",
    "options": [
      "Python throws a syntax error",
      "Each line is read as a single-element list containing the unparsed line with pipes",
      "Pipes are deleted automatically",
      "The reader automatically detects pipes"
    ],
    "correctAnswer": 1,
    "explanation": "Because commas are not present, the reader cannot split the fields and returns the entire line as a single string inside a list: ['P101|Mouse|Peripherals|1499'].",
    "hint": "Returned as a single unparsed element."
  },
  {
    "id": 6,
    "question": "Why do European systems frequently use semicolon (';') instead of comma (',') as the CSV delimiter?",
    "options": [
      "Printers cannot print commas in Europe",
      "In Europe, commas are used as decimal separators in numbers (e.g. 14,50 euros)",
      "European keyboards lack comma keys",
      "To make files compatible with C++"
    ],
    "correctAnswer": 1,
    "explanation": "In many European countries, the comma represents the decimal point, so semicolon is standard for separating CSV columns.",
    "hint": "Comma is used as decimal separator."
  },
  {
    "id": 7,
    "question": "Which of the following creates a writer that writes Pipe Separated records?",
    "options": [
      "csv.writer(f, sep='|')",
      "csv.writer(f, delimiter='|')",
      "csv.writer(f, char='|')",
      "csv.writer(f, pipe=True)"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer(f, delimiter='|') sets pipe as the field delimiter.",
    "hint": "csv.writer(f, delimiter='|')."
  },
  {
    "id": 8,
    "question": "What does the parameter skipinitialspace=True do in csv.reader?",
    "options": [
      "Skips the first line of the file",
      "Ignores any whitespace immediately following the delimiter character",
      "Removes trailing spaces",
      "Compresses multiple spaces"
    ],
    "correctAnswer": 1,
    "explanation": "skipinitialspace=True causes the reader to ignore spaces directly following delimiters.",
    "hint": "Ignores spaces immediately after delimiters."
  },
  {
    "id": 9,
    "question": "Consider: reader = csv.reader(f, delimiter='\\t'). What file type is being parsed?",
    "options": [
      "JSON",
      "TSV (Tab Separated Values)",
      "Binary file",
      "XML"
    ],
    "correctAnswer": 1,
    "explanation": "Tab-delimited text files are known as TSV (Tab Separated Values).",
    "hint": "TSV."
  },
  {
    "id": 10,
    "question": "What error is raised if you pass delimiter=':::' to csv.writer?",
    "options": [
      "TypeError: \"delimiter\" must be a 1-character string",
      "ValueError: too many delimiters",
      "csv.Error: delimiter invalid",
      "No error"
    ],
    "correctAnswer": 0,
    "explanation": "Python raises TypeError: \"delimiter\" must be a 1-character string.",
    "hint": "TypeError (1-character string)."
  },
  {
    "id": 11,
    "question": "Can space (' ') be used as a custom delimiter in csv.reader(f, delimiter=' ')?",
    "options": [
      "No, spaces are forbidden",
      "Yes, space is a valid 1-character string",
      "Only if quoted",
      "Only in Linux"
    ],
    "correctAnswer": 1,
    "explanation": "Space is a valid single-character string and can serve as a delimiter.",
    "hint": "Yes, space is valid."
  },
  {
    "id": 12,
    "question": "Which parameter in csv.writer defines the character sequence used to terminate rows?",
    "options": [
      "eol",
      "lineterminator",
      "row_end",
      "terminator"
    ],
    "correctAnswer": 1,
    "explanation": "lineterminator defines the row end character sequence (default '\\r\\n').",
    "hint": "lineterminator."
  },
  {
    "id": 13,
    "question": "Consider: with open('data.txt', 'r') as f: r = csv.reader(f, delimiter='-'). What will '12-05-2026' be parsed into?",
    "options": [
      "['12-05-2026']",
      "['12', '05', '2026']",
      "'12052026'",
      "12"
    ],
    "correctAnswer": 1,
    "explanation": "Delimiter '-' splits the date string into three elements: ['12', '05', '2026'].",
    "hint": "['12', '05', '2026']."
  },
  {
    "id": 14,
    "question": "Can colon (':') be used as a delimiter when parsing /etc/passwd files?",
    "options": [
      "No, colon is reserved by Python syntax",
      "Yes, csv.reader(f, delimiter=':') parses colon-separated Unix config files easily",
      "Only in binary mode",
      "Requires third-party library"
    ],
    "correctAnswer": 1,
    "explanation": "colon is a standard 1-character delimiter and parses /etc/passwd files seamlessly.",
    "hint": "Yes, delimiter=':'."
  },
  {
    "id": 15,
    "question": "What is written to disk if a field contains the custom delimiter, e.g. delimiter='|' and field is 'A|B'?",
    "options": [
      "It crashes",
      "The field is wrapped in quotes: \"A|B\"",
      "The pipe is replaced with a space",
      "The pipe is deleted"
    ],
    "correctAnswer": 1,
    "explanation": "csv.writer automatically quotes any field that contains the specified delimiter.",
    "hint": "Field is wrapped in quotes."
  },
  {
    "id": 16,
    "question": "What is the escapechar parameter used for in csv.writer?",
    "options": [
      "Specifies a character (like '\\\\') to escape the delimiter if quoting is set to QUOTE_NONE",
      "Escapes HTML tags",
      "Ignores blank lines",
      "Clears the screen"
    ],
    "correctAnswer": 0,
    "explanation": "escapechar defines the character used to escape delimiters when quoting is disabled (QUOTE_NONE).",
    "hint": "Escapes delimiter when quoting is disabled."
  },
  {
    "id": 17,
    "question": "Which of the following is NOT a common delimiter in delimited text files?",
    "options": [
      "Comma (,)",
      "Tab (\\t)",
      "Semicolon (;)",
      "Carriage Return (\\r)"
    ],
    "correctAnswer": 3,
    "explanation": "Carriage Return (\\r) is a line terminator, not an in-row field delimiter.",
    "hint": "Carriage Return is a line terminator."
  },
  {
    "id": 18,
    "question": "In Python's csv module, what is the registered dialect name for tab-separated files?",
    "options": [
      "'tab'",
      "'tsv'",
      "'excel-tab'",
      "'unix-tab'"
    ],
    "correctAnswer": 2,
    "explanation": "The built-in registered dialect for tab-separated files is 'excel-tab'.",
    "hint": "'excel-tab'."
  },
  {
    "id": 19,
    "question": "How can you read a TSV file using dialect instead of specifying delimiter='\\t'?",
    "options": [
      "csv.reader(f, dialect='excel-tab')",
      "csv.reader(f, type='tsv')",
      "csv.reader(f, mode='tab')",
      "csv.reader(f, format='tab')"
    ],
    "correctAnswer": 0,
    "explanation": "csv.reader(f, dialect='excel-tab') automatically sets delimiter='\\t'.",
    "hint": "dialect='excel-tab'."
  },
  {
    "id": 20,
    "question": "If a line in 'file.csv' is 'Item 1 | 450 | Electronics', and we open with csv.reader(f, delimiter='|', skipinitialspace=True), what is row[1]?",
    "options": [
      "' 450 '",
      "'450 '",
      "'450'",
      "450"
    ],
    "correctAnswer": 1,
    "explanation": "skipinitialspace removes leading spaces after '|', leaving '450 ' (trailing spaces remain unless rstripped).",
    "hint": "'450 '."
  },
  {
    "id": 21,
    "question": "Can delimiter be set to None?",
    "options": [
      "Yes, it defaults to comma",
      "No, delimiter must be a 1-character string",
      "Yes, it disables splitting",
      "Yes, it splits on all whitespace"
    ],
    "correctAnswer": 1,
    "explanation": "Passing delimiter=None raises TypeError because it must be a 1-character string.",
    "hint": "Must be a 1-character string."
  },
  {
    "id": 22,
    "question": "Consider: csv.writer(f, delimiter=';'). What character separates columns in the output?",
    "options": [
      "Comma",
      "Semicolon",
      "Colon",
      "Period"
    ],
    "correctAnswer": 1,
    "explanation": "Columns will be separated by semicolons (;).",
    "hint": "Semicolon."
  },
  {
    "id": 23,
    "question": "What tool in Python can deduce the delimiter of an unknown delimited text file automatically?",
    "options": [
      "csv.Sniffer().sniff(sample).delimiter",
      "csv.detect_delimiter(file)",
      "sys.get_delimiter()",
      "os.path.delimiter"
    ],
    "correctAnswer": 0,
    "explanation": "csv.Sniffer().sniff(sample).delimiter analyzes a text sample and deduces the delimiter character.",
    "hint": "csv.Sniffer()."
  },
  {
    "id": 24,
    "question": "What is the output of len(row) if line is 'A;B;C;D' and reader is opened with delimiter=';'?",
    "options": [
      "1",
      "3",
      "4",
      "7"
    ],
    "correctAnswer": 2,
    "explanation": "The line contains 4 fields: 'A', 'B', 'C', 'D', so len(row) is 4.",
    "hint": "4."
  },
  {
    "id": 25,
    "question": "Why does CBSE include custom delimiter questions in Class 12 exams?",
    "options": [
      "To test student awareness that CSV handling extends beyond commas to pipe, tab, and semicolon delimited data",
      "Because commas are being deprecated",
      "Because tabs are faster to process",
      "To test binary bit shifting"
    ],
    "correctAnswer": 0,
    "explanation": "It tests understanding of parameterized parsing and general delimited file formats used in real-world systems.",
    "hint": "Parameterized parsing & real-world file formats."
  }
];

export default questions;
