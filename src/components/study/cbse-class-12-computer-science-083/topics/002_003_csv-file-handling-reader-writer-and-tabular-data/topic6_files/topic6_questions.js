// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "In CBSE board exam questions asking to display students scoring > 90, what conversion must be applied to row[3] containing marks?",
    "options": [
      "str(row[3])",
      "float(row[3]) or int(row[3])",
      "bool(row[3])",
      "No conversion needed"
    ],
    "correctAnswer": 1,
    "explanation": "Because all CSV elements are read as strings, you must convert row[3] to float or int before numeric comparison (> 90).",
    "hint": "float(row[3]) or int(row[3])."
  },
  {
    "id": 2,
    "question": "What error occurs if you compare row[3] > 90 directly without casting?",
    "options": [
      "ValueError",
      "TypeError: '>' not supported between instances of 'str' and 'int'",
      "IndexError",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "In Python 3, comparing a string and an integer directly with '>' raises TypeError.",
    "hint": "TypeError (str and int comparison)."
  },
  {
    "id": 3,
    "question": "How do you perform a case-insensitive search for stream 'Science' in row[2]?",
    "options": [
      "if row[2] == 'Science':",
      "if row[2].lower() == 'science':",
      "if row[2].casefold() == 'science':",
      "Both B and C are correct"
    ],
    "correctAnswer": 3,
    "explanation": "Both lower() and casefold() convert strings to lowercase for case-insensitive comparison.",
    "hint": "Both lower() and casefold()."
  },
  {
    "id": 4,
    "question": "Consider: target = '105'. How should it be compared with row[0] storing roll numbers?",
    "options": [
      "if row[0] == target: (both strings)",
      "if int(row[0]) == int(target):",
      "Both A and B work",
      "Neither works"
    ],
    "correctAnswer": 2,
    "explanation": "Both comparing as strings ('105' == '105') or comparing as integers (105 == 105) work reliably.",
    "hint": "Both string and integer comparisons work."
  },
  {
    "id": 5,
    "question": "What is the purpose of a boolean flag variable 'found = False' in a CSV search function?",
    "options": [
      "To encrypt records",
      "To remember if a matching record was found so an appropriate message can be printed if not found",
      "To count total records",
      "To terminate Python"
    ],
    "correctAnswer": 1,
    "explanation": "The flag tracks whether any matching record was located; if found remains False after loop completion, a 'Not Found' message is displayed.",
    "hint": "Tracks if matching record was found."
  },
  {
    "id": 6,
    "question": "Consider: for row in reader: if row[1].startswith('A'): print(row[1]). What does this filter for?",
    "options": [
      "Students whose names start with the letter 'A'",
      "Students with grade A",
      "The first row only",
      "Students with age > 18"
    ],
    "correctAnswer": 0,
    "explanation": "row[1].startswith('A') checks if the name string begins with capital letter 'A'.",
    "hint": "Names starting with 'A'."
  },
  {
    "id": 7,
    "question": "What does the relational database term 'Projection' correspond to in CSV processing?",
    "options": [
      "Extracting only specific columns (e.g. only Name and Marks) from records",
      "Filtering rows by condition",
      "Sorting records",
      "Deleting files"
    ],
    "correctAnswer": 0,
    "explanation": "Projection in relational algebra means selecting specific columns / attributes from a dataset.",
    "hint": "Selecting specific columns."
  },
  {
    "id": 8,
    "question": "How do you project only columns 0 (RollNo) and 1 (Name) into a new list for each row?",
    "options": [
      "[row[0], row[1]]",
      "row[0:2]",
      "Both A and B",
      "row[0, 1]"
    ],
    "correctAnswer": 2,
    "explanation": "Both explicit indexing [row[0], row[1]] and slice row[0:2] return the first two columns.",
    "hint": "Both [row[0], row[1]] and row[0:2]."
  },
  {
    "id": 9,
    "question": "If a CSV file has 10 columns, but the question asks to display only EmpName (col 1) and NetSalary (col 8), what should be written?",
    "options": [
      "print(row)",
      "print(row[1], row[8])",
      "print(row[2], row[9])",
      "print(row['EmpName'])"
    ],
    "correctAnswer": 1,
    "explanation": "print(row[1], row[8]) prints only the required two columns using 0-based indexing.",
    "hint": "print(row[1], row[8])."
  },
  {
    "id": 10,
    "question": "Consider: with open('item.csv', 'r') as f: reader = csv.reader(f); for row in reader: if float(row[2]) > 500: count += 1. What does count represent?",
    "options": [
      "Total items in file",
      "Count of items with price greater than 500",
      "Maximum price",
      "Average price"
    ],
    "correctAnswer": 1,
    "explanation": "count is incremented only when price in column 2 exceeds 500.",
    "hint": "Count of items with price > 500."
  },
  {
    "id": 11,
    "question": "Why should you call 'break' after finding a unique record (such as Admission No)?",
    "options": [
      "It prevents Python from crashing",
      "It avoids unnecessary iterations over remaining rows once the unique record has been found",
      "It closes the file",
      "It is required by CSV syntax"
    ],
    "correctAnswer": 1,
    "explanation": "Since Admission No / Primary Key is unique, stopping traversal after finding it saves execution time.",
    "hint": "Avoids unnecessary iterations."
  },
  {
    "id": 12,
    "question": "What happens if you search for a non-existent roll number without a 'found' flag?",
    "options": [
      "Python raises an error",
      "The loop finishes silently and the user sees no output or error message indicating whether the record was found",
      "The file is deleted",
      "The search loops infinitely"
    ],
    "correctAnswer": 1,
    "explanation": "Without a flag, nothing is printed when no match occurs, leaving the user with confusing blank output.",
    "hint": "User sees no output indicating missing record."
  },
  {
    "id": 13,
    "question": "How can you filter records where City is either 'Kolkata' or 'Delhi'?",
    "options": [
      "if row[4] == 'Kolkata' or row[4] == 'Delhi':",
      "if row[4] in ['Kolkata', 'Delhi']:",
      "Both A and B are correct",
      "if row[4] == 'Kolkata' and 'Delhi':"
    ],
    "correctAnswer": 2,
    "explanation": "Both the boolean 'or' expression and the membership test 'in [...]' correctly filter for either city.",
    "hint": "Both A and B."
  },
  {
    "id": 14,
    "question": "Consider: if len(row[1]) > 10:. What does this filter for?",
    "options": [
      "Students with marks > 10",
      "Students whose name has more than 10 characters",
      "Students in row index 10",
      "Students with 10 subjects"
    ],
    "correctAnswer": 1,
    "explanation": "len(row[1]) calculates the character length of the student's name string.",
    "hint": "Name with more than 10 characters."
  },
  {
    "id": 15,
    "question": "What does row[3].strip() do?",
    "options": [
      "Deletes column 3",
      "Removes leading and trailing whitespaces from the string value in column 3",
      "Converts to float",
      "Capitalizes text"
    ],
    "correctAnswer": 1,
    "explanation": "strip() removes unwanted spaces or newline characters from the ends of the string.",
    "hint": "Removes leading and trailing spaces."
  },
  {
    "id": 16,
    "question": "How do you count how many students scored between 75 and 90 (inclusive)?",
    "options": [
      "if 75 <= float(row[3]) <= 90: count += 1",
      "if float(row[3]) >= 75 and float(row[3]) <= 90: count += 1",
      "Both A and B are valid in Python",
      "Neither is valid"
    ],
    "correctAnswer": 2,
    "explanation": "Python supports chained comparisons (75 <= x <= 90) as well as compound 'and' expressions.",
    "hint": "Both chained and compound 'and' are valid."
  },
  {
    "id": 17,
    "question": "Consider: for row in reader: if 'DELHI' in row[4].upper(): print(row). What does this do?",
    "options": [
      "Matches only if city is exactly 'DELHI'",
      "Matches if 'DELHI' appears anywhere in the city field (substring match)",
      "Raises an error",
      "Changes city to Delhi"
    ],
    "correctAnswer": 1,
    "explanation": "The 'in' operator checks for substring existence within row[4].upper().",
    "hint": "Substring match."
  },
  {
    "id": 18,
    "question": "Can multiple filter conditions be combined with 'and'?",
    "options": [
      "No, only one condition per line",
      "Yes, e.g. if row[2] == 'Science' and float(row[3]) > 90:",
      "Only with nested loops",
      "Only in SQL"
    ],
    "correctAnswer": 1,
    "explanation": "Standard logical operators 'and', 'or', 'not' combine multiple criteria seamlessly.",
    "hint": "Yes, using logical operators."
  },
  {
    "id": 19,
    "question": "What is written if we copy only filtered rows into a new CSV file 'high_scorers.csv'?",
    "options": [
      "with open('high_scorers.csv', 'w', newline='') as fout: w = csv.writer(fout); w.writerow(header); for row in reader: if float(row[3]) >= 90: w.writerow(row)",
      "fout.copy(reader)",
      "shutil.copy()",
      "None of these"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through the input file and conditionally writing matching rows to the output file filters and persists the dataset.",
    "hint": "Open output file and write matching rows."
  },
  {
    "id": 20,
    "question": "What exception should be handled if a CSV column contains non-numeric strings where numbers are expected?",
    "options": [
      "IndexError",
      "ValueError",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 1,
    "explanation": "Calling float() on a non-numeric string (e.g. float('N/A')) raises ValueError.",
    "hint": "ValueError."
  },
  {
    "id": 21,
    "question": "How do you safely convert a column to float with error handling?",
    "options": [
      "try: val = float(row[3]) except ValueError: val = 0.0",
      "val = safe_float(row[3])",
      "val = float?(row[3])",
      "val = row[3].to_float()"
    ],
    "correctAnswer": 0,
    "explanation": "Wrapping the cast in a try-except ValueError block gracefully handles invalid strings.",
    "hint": "try-except ValueError."
  },
  {
    "id": 22,
    "question": "What is the output of print(f\"{row[1]:<20} {row[3]:>6}\")?",
    "options": [
      "Left aligns name in 20 spaces and right aligns marks in 6 spaces",
      "Prints in binary",
      "Raises formatting error",
      "Prints reversed"
    ],
    "correctAnswer": 0,
    "explanation": "Format specifiers :<20 and :>6 format tabular columnar output neatly.",
    "hint": "Neatly formatted tabular alignment."
  },
  {
    "id": 23,
    "question": "If searching for a student and multiple students have the same name, should 'break' be used?",
    "options": [
      "Yes, always",
      "No, because 'break' would stop after the first match and miss other students with the same name",
      "Yes, to avoid duplicate printing",
      "It does not matter"
    ],
    "correctAnswer": 1,
    "explanation": "For non-unique fields (like Name), omit break to display all matching records.",
    "hint": "Omit break to display all matches."
  },
  {
    "id": 24,
    "question": "In a CBSE question: 'Write a function CountCategory(cat) to count items belonging to category cat', what should the function do?",
    "options": [
      "Delete the category",
      "Open CSV, loop through records, increment counter when row[col] matches cat, and print or return counter",
      "Create a new category",
      "Sort by category"
    ],
    "correctAnswer": 1,
    "explanation": "Traverse records, check category matching, increment count, and display/return total.",
    "hint": "Traverse and count matches."
  },
  {
    "id": 25,
    "question": "How many marks are typically allotted in CBSE Class 12 board examinations for a CSV search/filter function?",
    "options": [
      "1 mark",
      "2 to 3 marks",
      "10 marks",
      "15 marks"
    ],
    "correctAnswer": 1,
    "explanation": "CSV file handling questions with record searching or conditional extraction typically carry 2 or 3 marks.",
    "hint": "2 to 3 marks."
  }
];

export default questions;
