// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "Why cannot a record in the middle of a CSV file be directly updated in-place like a fixed-length record?",
    "options": [
      "CSV files are locked by the OS",
      "CSV records have variable string lengths; replacing a line with longer or shorter text would corrupt subsequent line offsets",
      "CSV does not allow write mode",
      "Python forbids in-place modifications on files"
    ],
    "correctAnswer": 1,
    "explanation": "Because CSV rows have varying character lengths, writing in-place overwrites or misaligns subsequent records.",
    "hint": "Variable record lengths make in-place updates impractical."
  },
  {
    "id": 2,
    "question": "What is the standard memory-based approach to updating a CSV record in Python?",
    "options": [
      "Use SQL UPDATE query",
      "Read all rows into a list, modify the target row in memory, and rewrite the whole file using 'w' mode with writerows()",
      "Use f.seek() to update bytes",
      "Use pickle.load()"
    ],
    "correctAnswer": 1,
    "explanation": "Loading records into a list, updating the matched row, and rewriting with 'w' mode is clean, reliable, and standard in CBSE projects.",
    "hint": "Load to list, modify, rewrite with writerows()."
  },
  {
    "id": 3,
    "question": "What module from Python standard library is used along with os.remove() and os.rename() when doing file-based updates?",
    "options": [
      "sys",
      "os",
      "csv",
      "shutil"
    ],
    "correctAnswer": 1,
    "explanation": "The 'os' module provides os.remove() to delete files and os.rename() to rename files.",
    "hint": "os."
  },
  {
    "id": 4,
    "question": "When deleting a record using a temporary file 'temp.csv', which records are written to 'temp.csv'?",
    "options": [
      "Only the record being deleted",
      "All records EXCEPT the target record being deleted",
      "All records unchanged",
      "An empty header"
    ],
    "correctAnswer": 1,
    "explanation": "Writing all records except the target to temp.csv effectively deletes the target record.",
    "hint": "All records EXCEPT the target."
  },
  {
    "id": 5,
    "question": "What function call checks whether 'data.csv' exists on disk before attempting to open it?",
    "options": [
      "os.path.exists('data.csv')",
      "csv.exists('data.csv')",
      "sys.file_exists('data.csv')",
      "f.is_open()"
    ],
    "correctAnswer": 0,
    "explanation": "os.path.exists(path) returns True if the specified file or directory exists.",
    "hint": "os.path.exists()."
  },
  {
    "id": 6,
    "question": "In the function add_record(), which file mode should be used to avoid erasing existing data?",
    "options": [
      "'w'",
      "'r'",
      "'a'",
      "'r+'"
    ],
    "correctAnswer": 2,
    "explanation": "'a' (append) mode adds new rows to the end of the file preserving existing records.",
    "hint": "'a' (append mode)."
  },
  {
    "id": 7,
    "question": "What happens if os.rename('temp.csv', 'records.csv') is called on Windows when 'records.csv' is still open in another handle?",
    "options": [
      "Windows silently replaces it",
      "PermissionError: [WinError 32] The process cannot access the file because it is being used by another process",
      "File is erased",
      "Python hangs"
    ],
    "correctAnswer": 1,
    "explanation": "Windows locks open files, preventing renames or deletes until handles are closed.",
    "hint": "PermissionError."
  },
  {
    "id": 8,
    "question": "Why is with open(...) preferred over manually calling f.close() in menu-driven systems?",
    "options": [
      "It runs faster",
      "It guarantees the file handle is properly closed even if exceptions or user cancellations occur",
      "It encrypts the CSV",
      "It prints a menu"
    ],
    "correctAnswer": 1,
    "explanation": "Context managers guarantee automatic file cleanup upon exiting the block.",
    "hint": "Guarantees file handle cleanup."
  },
  {
    "id": 9,
    "question": "In a menu-driven program, what construct provides continuous interactive execution until the user selects 'Exit'?",
    "options": [
      "for i in range(100):",
      "while True:",
      "if choice == 6:",
      "try ... except:"
    ],
    "correctAnswer": 1,
    "explanation": "An infinite 'while True:' loop keeps the menu active until explicitly broken by a break statement.",
    "hint": "while True: loop."
  },
  {
    "id": 10,
    "question": "Consider: if row[0] == target_roll: row[3] = str(new_marks). Why convert new_marks to str?",
    "options": [
      "It is not strictly required by writerow, but maintains consistent string representation in list",
      "Because integers crash Python",
      "Because CSV cannot store floats",
      "To prevent rounding errors"
    ],
    "correctAnswer": 0,
    "explanation": "csv.writer converts numbers automatically, but converting to str keeps row items consistently typed.",
    "hint": "Maintains consistent string representation."
  },
  {
    "id": 11,
    "question": "How do you preserve the header row when rewriting a modified CSV file?",
    "options": [
      "writer.writerow(header) before writing records, or include header as records[0]",
      "The header is automatically restored by Python",
      "Headers cannot be rewritten",
      "Open in append mode"
    ],
    "correctAnswer": 0,
    "explanation": "You must include the header as the first item in writerows() or call writerow(header) explicitly.",
    "hint": "Include header as first record written."
  },
  {
    "id": 12,
    "question": "What is the role of strip() in target = input('Enter Roll: ').strip()?",
    "options": [
      "Removes accidental leading and trailing spaces from user input",
      "Converts string to uppercase",
      "Encrypts input",
      "Deletes target"
    ],
    "correctAnswer": 0,
    "explanation": "strip() cleans accidental whitespaces that would prevent exact string matches.",
    "hint": "Removes leading/trailing whitespace."
  },
  {
    "id": 13,
    "question": "Consider: while True: ... if choice == '6': break. What does 'break' do?",
    "options": [
      "Restarts computer",
      "Terminates the while loop and exits the menu",
      "Deletes the CSV",
      "Raises exception"
    ],
    "correctAnswer": 1,
    "explanation": "'break' exits the enclosing while loop immediately.",
    "hint": "Exits the while loop."
  },
  {
    "id": 14,
    "question": "What happens if a user inputs a non-numeric string when int(input()) is called in the menu?",
    "options": [
      "Menu defaults to 0",
      "ValueError is raised",
      "Menu exits cleanly",
      "Input is repeated"
    ],
    "correctAnswer": 1,
    "explanation": "int() on a non-numeric string throws ValueError.",
    "hint": "ValueError."
  },
  {
    "id": 15,
    "question": "How can input choice validation be made bulletproof without crashing on letters?",
    "options": [
      "choice = input('Enter choice (1-6): ').strip() and compare strings ('1', '2', ...)",
      "Wrap int(input()) in try-except ValueError",
      "Both A and B are robust techniques",
      "Neither technique works"
    ],
    "correctAnswer": 2,
    "explanation": "Comparing input as strings or using try-except ValueError prevents invalid input crashes.",
    "hint": "Both string checking and try-except."
  },
  {
    "id": 16,
    "question": "In CBSE Class 12 board practicals, how many marks is a full menu-driven file handling program typically worth?",
    "options": [
      "2 marks",
      "4 to 8 marks (in lab project / practical exam)",
      "20 marks",
      "30 marks"
    ],
    "correctAnswer": 1,
    "explanation": "A full menu-driven CRUD script forms a core component of the practical exam and student project (4 to 8 marks).",
    "hint": "4 to 8 marks."
  },
  {
    "id": 17,
    "question": "When writing records to a CSV file from user input, what datatype does input() return?",
    "options": [
      "str",
      "int",
      "float",
      "list"
    ],
    "correctAnswer": 0,
    "explanation": "The built-in input() function always returns a string (str).",
    "hint": "str."
  },
  {
    "id": 18,
    "question": "What exception occurs if next(reader) is called on an empty file?",
    "options": [
      "StopIteration",
      "IndexError",
      "EOFError",
      "FileNotFoundError"
    ],
    "correctAnswer": 0,
    "explanation": "Iterators raise StopIteration when exhausted.",
    "hint": "StopIteration."
  },
  {
    "id": 19,
    "question": "How can StopIteration on empty files be safely caught?",
    "options": [
      "try: header = next(reader) except StopIteration: return",
      "if reader.has_next():",
      "if len(reader) > 0:",
      "header = next?(reader)"
    ],
    "correctAnswer": 0,
    "explanation": "Wrapping next(reader) in try-except StopIteration safely handles empty files.",
    "hint": "try-except StopIteration."
  },
  {
    "id": 20,
    "question": "Why should you never write a header row when opening in 'a' (append) mode?",
    "options": [
      "It raises a syntax error",
      "It creates duplicate header rows in the middle of your dataset every time a record is added",
      "The file becomes read-only",
      "Excel deletes the file"
    ],
    "correctAnswer": 1,
    "explanation": "Writing headers in append mode inserts column titles repeatedly between data rows, corrupting tabular consistency.",
    "hint": "Creates duplicate headers between data rows."
  },
  {
    "id": 21,
    "question": "What does the function os.remove(filename) do?",
    "options": [
      "Clears the file contents but keeps file on disk",
      "Permanently deletes the file from disk",
      "Renames the file",
      "Moves file to trash"
    ],
    "correctAnswer": 1,
    "explanation": "os.remove() removes/deletes the file path from the file system.",
    "hint": "Permanently deletes file from disk."
  },
  {
    "id": 22,
    "question": "Consider: os.rename('temp.csv', 'students.csv'). What happens to the old 'students.csv'?",
    "options": [
      "It must be deleted or os.replace() used, otherwise Windows raises FileExistsError",
      "It is automatically backed up",
      "It merges with temp",
      "It is zipped"
    ],
    "correctAnswer": 0,
    "explanation": "On Windows, os.rename() will fail if the destination already exists (use os.remove() first or os.replace()).",
    "hint": "Must be removed first or use os.replace()."
  },
  {
    "id": 23,
    "question": "Which function in Python standard library replaces destination file atomically across platforms?",
    "options": [
      "os.replace(src, dst)",
      "os.overwrite(src, dst)",
      "csv.replace(src, dst)",
      "shutil.swap()"
    ],
    "correctAnswer": 0,
    "explanation": "os.replace(src, dst) atomically renames src to dst, silently replacing dst if it exists.",
    "hint": "os.replace()."
  },
  {
    "id": 24,
    "question": "In a product inventory system, how do you reduce the quantity in stock when an order is placed?",
    "options": [
      "row[3] = str(int(row[3]) - order_qty)",
      "row[3] -= order_qty directly",
      "update(row[3])",
      "delete(row[3])"
    ],
    "correctAnswer": 0,
    "explanation": "Convert the string stock count to int, subtract order quantity, and convert back to string.",
    "hint": "Convert to int, subtract, convert to str."
  },
  {
    "id": 25,
    "question": "What is the primary design benefit of structuring a CSV system into modular functions (Add, Display, Search, Update)?",
    "options": [
      "Increases execution speed by 10x",
      "Improves readability, testability, maintenance, and directly matches CBSE marking rubrics",
      "Decreases file size on disk",
      "Allows Python to run without an interpreter"
    ],
    "correctAnswer": 1,
    "explanation": "Modular functional programming is clean, easy to debug, and directly aligns with CBSE question requirements.",
    "hint": "Readability, maintenance & CBSE rubrics."
  }
];

export default questions;
