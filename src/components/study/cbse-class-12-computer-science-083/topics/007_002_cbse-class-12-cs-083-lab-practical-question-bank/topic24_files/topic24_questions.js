export const questions = [
  {
    "id": 1,
    "question": "What is the total mark allocation for the CBSE Class 12 Computer Science practical examination?",
    "options": [
      "20 Marks",
      "30 Marks",
      "40 Marks",
      "50 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The practical examination carries 30 marks towards the 100-mark subject aggregate."
  },
  {
    "id": 2,
    "question": "How are the 12 marks of the lab test divided in the practical exam?",
    "options": [
      "Python program (8 Marks) + SQL queries (4 Marks)",
      "Python program (6 Marks) + SQL queries (6 Marks)",
      "Viva (6 Marks) + Python (6 Marks)",
      "HTML (6 Marks) + SQL (6 Marks)"
    ],
    "correctAnswer": 0,
    "explanation": "Lab test = 8 Marks for Python program + 4 Marks for SQL queries = 12 Marks."
  },
  {
    "id": 3,
    "question": "How many marks are assigned to the Practical Report File (Lab Notebook)?",
    "options": [
      "3 Marks",
      "7 Marks",
      "8 Marks",
      "10 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The Practical Report File carries 7 marks."
  },
  {
    "id": 4,
    "question": "How many marks are assigned to the Capstone Project work?",
    "options": [
      "5 Marks",
      "8 Marks",
      "10 Marks",
      "12 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The Capstone Project carries 8 marks in the practical evaluation rubric."
  },
  {
    "id": 5,
    "question": "How many marks are allocated to the Viva Voce examination?",
    "options": [
      "2 Marks",
      "3 Marks",
      "5 Marks",
      "7 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "Viva Voce is assessed for 3 marks by the external examiner."
  },
  {
    "id": 6,
    "question": "What is the minimum number of Python programs required in the practical report file?",
    "options": [
      "5",
      "10",
      "15",
      "20"
    ],
    "correctAnswer": 2,
    "explanation": "CBSE mandates a minimum of 15 Python programs covering files and stacks."
  },
  {
    "id": 7,
    "question": "What is the minimum number of SQL query sets required in the practical report file?",
    "options": [
      "2",
      "5",
      "10",
      "15"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE mandates a minimum of 5 SQL query sets based on related tables."
  },
  {
    "id": 8,
    "question": "Which Python module is used for object serialization into binary files?",
    "options": [
      "json",
      "csv",
      "pickle",
      "os"
    ],
    "correctAnswer": 2,
    "explanation": "The pickle module serializes and deserializes Python object hierarchies."
  },
  {
    "id": 9,
    "question": "What exception is raised when reading past the end of a binary file using pickle.load()?",
    "options": [
      "EOFError",
      "FileNotFoundError",
      "IndexError",
      "ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "EOFError is raised when trying to read beyond the end of a binary file."
  },
  {
    "id": 10,
    "question": "Why should CSV files be opened with newline='' on Windows?",
    "options": [
      "To prevent extra blank lines from being written between records",
      "To speed up disk write operations",
      "To encrypt data",
      "It is not required"
    ],
    "correctAnswer": 0,
    "explanation": "newline='' prevents duplicate carriage return translation on Windows."
  },
  {
    "id": 11,
    "question": "Which method reposition the file pointer to a specific byte offset?",
    "options": [
      "f.seek()",
      "f.tell()",
      "f.move()",
      "f.goto()"
    ],
    "correctAnswer": 0,
    "explanation": "f.seek(offset) repositions the file pointer."
  },
  {
    "id": 12,
    "question": "Which method returns the current byte position of the file pointer?",
    "options": [
      "f.tell()",
      "f.seek()",
      "f.pos()",
      "f.loc()"
    ],
    "correctAnswer": 0,
    "explanation": "f.tell() returns the current file pointer offset as an integer."
  },
  {
    "id": 13,
    "question": "In Python stack implementation using a list, which end serves as the TOP?",
    "options": [
      "The end of the list (append and pop)",
      "The beginning of the list (index 0)",
      "The middle",
      "Arbitrary"
    ],
    "correctAnswer": 0,
    "explanation": "Using append() and pop() on the end of the list ensures O(1) time complexity."
  },
  {
    "id": 14,
    "question": "What condition indicates Stack Underflow in Python?",
    "options": [
      "len(stk) == 0",
      "len(stk) > 100",
      "stk is None",
      "stk.pop() == 0"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to pop when len(stk) == 0 causes Underflow."
  },
  {
    "id": 15,
    "question": "Why must con.commit() be called after executing an INSERT statement in mysql.connector?",
    "options": [
      "To permanently write transactional modifications to disk",
      "To close the cursor",
      "To clear buffer memory",
      "To display output"
    ],
    "correctAnswer": 0,
    "explanation": "mysql.connector does not autocommit; con.commit() saves DML changes to disk."
  },
  {
    "id": 16,
    "question": "What placeholder is universally used for parameterized queries in mysql.connector?",
    "options": [
      "'?'",
      "'%s'",
      "':val'",
      "'$'"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector universally uses '%s' as the parameter placeholder."
  },
  {
    "id": 17,
    "question": "What does cursor.fetchone() return when no more records remain to fetch?",
    "options": [
      "None",
      "Empty list []",
      "Empty tuple ()",
      "StopIteration"
    ],
    "correctAnswer": 0,
    "explanation": "fetchone() returns None when the result set is exhausted."
  },
  {
    "id": 18,
    "question": "What does cursor.fetchall() return if zero records match the query?",
    "options": [
      "Empty list []",
      "None",
      "Empty tuple ()",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "fetchall() returns an empty list [] when no rows match."
  },
  {
    "id": 19,
    "question": "Which SQL clause eliminates duplicate tuples from query output?",
    "options": [
      "DISTINCT",
      "UNIQUE",
      "PRIMARY",
      "DIFFERENT"
    ],
    "correctAnswer": 0,
    "explanation": "DISTINCT collapses duplicate rows in projected output."
  },
  {
    "id": 20,
    "question": "Which clause filters summary groups AFTER GROUP BY in SQL?",
    "options": [
      "HAVING",
      "WHERE",
      "ORDER BY",
      "FILTER"
    ],
    "correctAnswer": 0,
    "explanation": "HAVING filters groups created by GROUP BY."
  },
  {
    "id": 21,
    "question": "If Table A has 4 rows and Table B has 5 rows, what is the cardinality of A × B?",
    "options": [
      "9",
      "20",
      "1",
      "12"
    ],
    "correctAnswer": 1,
    "explanation": "Cardinality = 4 * 5 = 20 rows."
  },
  {
    "id": 22,
    "question": "If Table A has 3 columns and Table B has 4 columns, what is the degree of A × B?",
    "options": [
      "12",
      "7",
      "1",
      "4"
    ],
    "correctAnswer": 1,
    "explanation": "Degree = 3 + 4 = 7 columns."
  },
  {
    "id": 23,
    "question": "How many join conditions are required to join 3 tables in an equi-join?",
    "options": [
      "1",
      "2",
      "3",
      "4"
    ],
    "correctAnswer": 1,
    "explanation": "Joining N tables requires at least (N - 1) join conditions. 3 - 1 = 2."
  },
  {
    "id": 24,
    "question": "What is the primary role of the external examiner in the practical exam?",
    "options": [
      "To supervise the lab test, evaluate notebooks and projects, and conduct viva voce",
      "To write the programs",
      "To grade only theory papers",
      "To install MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "The external examiner assesses the lab programs, notebooks, projects, and viva voce."
  },
  {
    "id": 25,
    "question": "Why should students solve all 10 sets of this Practical Lab Sample Question Paper?",
    "options": [
      "To build speed and muscle memory for writing working Python scripts and SQL queries under lab test pressure",
      "To memorize code line numbers",
      "To skip the practical exam",
      "Because CBSE repeats the exact same questions"
    ],
    "correctAnswer": 0,
    "explanation": "Timed practice ensures students write clean, error-free code and answer viva voce questions with confidence."
  }
];
export default questions;
