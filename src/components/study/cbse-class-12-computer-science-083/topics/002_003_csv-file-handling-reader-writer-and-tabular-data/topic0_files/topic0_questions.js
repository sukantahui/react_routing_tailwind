// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What does the acronym CSV stand for in Computer Science?",
    "options": [
      "Character Stored Values",
      "Comma Separated Values",
      "Computerized Sequential Values",
      "Column Separated Variables"
    ],
    "correctAnswer": 1,
    "explanation": "CSV stands for Comma Separated Values, a standard plain text format for tabular datasets.",
    "hint": "Comma Separated Values."
  },
  {
    "id": 2,
    "question": "Which of the following describes the fundamental nature of a CSV file?",
    "options": [
      "Compiled binary byte stream",
      "Plain text file storing tabular data",
      "Compressed archive",
      "Encrypted relational database"
    ],
    "correctAnswer": 1,
    "explanation": "A CSV file is a plain text file where lines represent rows and commas delimit column attributes.",
    "hint": "Plain text file."
  },
  {
    "id": 3,
    "question": "What is the default field delimiter in a standard CSV file?",
    "options": [
      "Semicolon (;)",
      "Tab (\\t)",
      "Comma (,)",
      "Pipe (|)"
    ],
    "correctAnswer": 2,
    "explanation": "By definition, the standard delimiter for CSV is the comma (',').",
    "hint": "Comma."
  },
  {
    "id": 4,
    "question": "How does each row or record terminate in a CSV file?",
    "options": [
      "With an EOF token",
      "With a newline character (\\n or \\r\\n)",
      "With a semicolon",
      "With a null byte \\x00"
    ],
    "correctAnswer": 1,
    "explanation": "Each line/record in a CSV text file terminates with an End-of-Line character sequence (\\n or \\r\\n).",
    "hint": "Newline character."
  },
  {
    "id": 5,
    "question": "Why is CSV preferred over Python's binary pickle files for public data exchange?",
    "options": [
      "Pickle files are larger",
      "CSV files are cross-platform and readable by spreadsheets & non-Python software",
      "Pickle cannot store strings",
      "CSV is faster than binary"
    ],
    "correctAnswer": 1,
    "explanation": "CSV is platform-independent, human-readable, and supported by spreadsheets like Excel and database software across languages.",
    "hint": "Platform-independent & interoperable."
  },
  {
    "id": 6,
    "question": "If a data field inside a CSV record itself contains a comma (e.g. 'Kolkata, West Bengal'), how is it represented according to RFC 4180?",
    "options": [
      "By escaping with a backslash",
      "By enclosing the field in quotation marks",
      "By replacing the comma with a dot",
      "It cannot be stored in CSV"
    ],
    "correctAnswer": 1,
    "explanation": "Under RFC 4180 standard, fields containing delimiters, quotes, or line breaks must be enclosed in double quotes.",
    "hint": "Enclosed in quotation marks."
  },
  {
    "id": 7,
    "question": "Which of the following software applications can natively open and display a CSV file?",
    "options": [
      "Microsoft Excel",
      "Google Sheets",
      "Notepad text editor",
      "All of the mentioned"
    ],
    "correctAnswer": 3,
    "explanation": "CSV files can be opened in simple text editors as well as full-fledged spreadsheet applications.",
    "hint": "All of the mentioned."
  },
  {
    "id": 8,
    "question": "What is the typical standard file extension for a CSV file?",
    "options": [
      ".txt",
      ".dat",
      ".csv",
      ".tsv"
    ],
    "correctAnswer": 2,
    "explanation": "The standard file extension is .csv.",
    "hint": ".csv."
  },
  {
    "id": 9,
    "question": "What is the purpose of the first line (header) in many CSV files?",
    "options": [
      "Stores the compiler version",
      "Defines the column names / attribute schema",
      "Contains file encryption keys",
      "Sets the font size"
    ],
    "correctAnswer": 1,
    "explanation": "The first line often serves as the header row specifying column names (attributes) for the dataset.",
    "hint": "Defines column names."
  },
  {
    "id": 10,
    "question": "Can a CSV file contain numeric values directly as binary numbers?",
    "options": [
      "Yes, numbers are stored as 4-byte integers",
      "No, all characters including digits are stored as plain text characters",
      "Yes, floating points are stored in IEEE 754 format",
      "Only when compressed"
    ],
    "correctAnswer": 1,
    "explanation": "As a text file, all values in CSV are stored as ASCII/Unicode characters; numbers are represented as string digits.",
    "hint": "Stored as plain text characters."
  },
  {
    "id": 11,
    "question": "What happens when a CSV file is opened in Microsoft Excel?",
    "options": [
      "Excel converts it into an executable",
      "Excel renders the comma-delimited fields into separate columns and rows",
      "Excel throws a corruption error",
      "Excel deletes the header row"
    ],
    "correctAnswer": 1,
    "explanation": "Excel interprets the commas as column separators and places each value into its respective grid cell.",
    "hint": "Renders into rows and columns."
  },
  {
    "id": 12,
    "question": "Which MIME type is officially registered for CSV files?",
    "options": [
      "application/csv",
      "text/csv",
      "application/excel",
      "text/plain-csv"
    ],
    "correctAnswer": 1,
    "explanation": "The official MIME type defined by RFC 4180 is text/csv.",
    "hint": "text/csv."
  },
  {
    "id": 13,
    "question": "Consider: '101,Aarav,95'. How many fields are present in this CSV record?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 2,
    "explanation": "The record has 3 fields separated by 2 commas: '101', 'Aarav', and '95'.",
    "hint": "Three fields."
  },
  {
    "id": 14,
    "question": "Consider: '102,\"Roy, Joy\",88'. How many fields are present in this record?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 1,
    "explanation": "Because \"Roy, Joy\" is quoted, the comma inside is treated as data, resulting in exactly 3 fields: 102, Roy, Joy, and 88.",
    "hint": "Quoted comma is not a delimiter."
  },
  {
    "id": 15,
    "question": "What is the primary advantage of CSV files over full database systems like MySQL for simple school projects?",
    "options": [
      "CSV supports multi-user transaction ACID locks",
      "CSV does not require a database server setup and is stored as a simple local file",
      "CSV is faster for 10 million rows",
      "CSV supports SQL joins natively"
    ],
    "correctAnswer": 1,
    "explanation": "CSV files require no server software or client-server authentication, making them lightweight and simple.",
    "hint": "No database server needed."
  },
  {
    "id": 16,
    "question": "Which of the following is NOT a characteristic of a CSV file?",
    "options": [
      "Text-based format",
      "Supports tabular datasets",
      "Stores cell background colors and formulas",
      "Can be edited with any plain text editor"
    ],
    "correctAnswer": 2,
    "explanation": "CSV files store only raw data; they cannot store formatting, formulas, cell colors, or charts.",
    "hint": "Cannot store formatting or formulas."
  },
  {
    "id": 17,
    "question": "When importing CSV data into Python programs, what datatype are the extracted fields by default?",
    "options": [
      "Integer",
      "Float",
      "String",
      "Boolean"
    ],
    "correctAnswer": 2,
    "explanation": "Since CSV is a text format, all extracted fields are initially parsed as string datatypes in Python.",
    "hint": "String."
  },
  {
    "id": 18,
    "question": "In Python, which built-in module provides comprehensive tools to work with CSV files?",
    "options": [
      "os",
      "sys",
      "csv",
      "pickle"
    ],
    "correctAnswer": 2,
    "explanation": "The 'csv' module in Python's standard library provides reader, writer, and dialect tools.",
    "hint": "csv."
  },
  {
    "id": 19,
    "question": "Does the standard 'csv' module require pip installation in Python 3?",
    "options": [
      "Yes, install via 'pip install csv'",
      "No, it is part of the Python Standard Library",
      "Yes, only available in Anaconda",
      "No, but requires PyPI registration"
    ],
    "correctAnswer": 1,
    "explanation": "The csv module is a built-in module included with Python standard distribution.",
    "hint": "Built-in standard library."
  },
  {
    "id": 20,
    "question": "What happens if a CSV file has inconsistent numbers of commas across different lines?",
    "options": [
      "Python crashes instantly",
      "Rows will have varying lengths, which may cause IndexError in index-based lookups",
      "The file automatically deletes itself",
      "Commas are replaced with zeroes"
    ],
    "correctAnswer": 1,
    "explanation": "Varying comma counts create rows with differing column counts, leading to potential IndexErrors if assuming uniform columns.",
    "hint": "Rows will have varying lengths."
  },
  {
    "id": 21,
    "question": "Which of the following character encodings is most commonly used for CSV files in modern Python?",
    "options": [
      "ASCII only",
      "UTF-8",
      "EBCDIC",
      "UTF-32LE"
    ],
    "correctAnswer": 1,
    "explanation": "UTF-8 is the standard cross-platform encoding for modern text and CSV files.",
    "hint": "UTF-8."
  },
  {
    "id": 22,
    "question": "In comparison with JSON files, CSV files are generally:",
    "options": [
      "More verbose due to repeated keys",
      "More compact for tabular datasets as column keys are specified once in the header",
      "Unable to be opened on Linux",
      "Binary formatted"
    ],
    "correctAnswer": 1,
    "explanation": "CSV files are compact because column names appear only once in the header, unlike JSON which repeats keys on every row.",
    "hint": "More compact for tabular data."
  },
  {
    "id": 23,
    "question": "Which specification standardizes CSV file formats across the software industry?",
    "options": [
      "IEEE 802.11",
      "RFC 4180",
      "W3C HTML5",
      "ISO 9001"
    ],
    "correctAnswer": 1,
    "explanation": "RFC 4180 is the Internet RFC document defining the CSV format and rules.",
    "hint": "RFC 4180."
  },
  {
    "id": 24,
    "question": "Can comments starting with '#' be included in standard CSV files by default?",
    "options": [
      "Yes, '#' is ignored by all CSV readers",
      "No, RFC 4180 CSV has no native comment character unless custom dialect rules are configured",
      "Yes, lines starting with // are ignored",
      "Yes, any text in brackets is ignored"
    ],
    "correctAnswer": 1,
    "explanation": "Standard CSV does not define comments; any '#' character is treated as regular literal text unless configured in dialects.",
    "hint": "No native comment character in RFC 4180."
  },
  {
    "id": 25,
    "question": "Why does CBSE Class 12 Computer Science include CSV file handling in Unit I?",
    "options": [
      "Because it introduces students to tabular data processing and real-world database import/export workflows",
      "To replace SQL completely",
      "Because binary files are deprecated",
      "Because Python cannot handle text files"
    ],
    "correctAnswer": 0,
    "explanation": "CSV introduces students to tabular record management, real-world data science prep, and spreadsheet interoperability.",
    "hint": "Tabular data processing & spreadsheet export."
  }
];

export default questions;
