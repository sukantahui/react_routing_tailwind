export const questions = [
  {
    "id": 1,
    "question": "[Topic 6 Q1] In the CBSE Class 12 Computer Science practical examination, what is the total maximum mark?",
    "options": [
      "20 Marks",
      "30 Marks",
      "40 Marks",
      "50 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The practical examination is worth 30 marks, and the theory paper is 70 marks (Total = 100)."
  },
  {
    "id": 2,
    "question": "[Topic 6 Q2] How many marks are allocated to the Python programming problem in the practical lab test?",
    "options": [
      "4 Marks",
      "8 Marks",
      "12 Marks",
      "7 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The hands-on Python program carries 8 marks, and the SQL queries carry 4 marks (Lab Test = 12M)."
  },
  {
    "id": 3,
    "question": "[Topic 6 Q3] How many marks are assigned to the Practical Report File (Lab Notebook)?",
    "options": [
      "3 Marks",
      "7 Marks",
      "8 Marks",
      "12 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "The practical report file carries 7 marks in the official CBSE evaluation rubric."
  },
  {
    "id": 4,
    "question": "[Topic 6 Q4] What is the minimum number of Python programs required in the practical report file according to CBSE?",
    "options": [
      "5 Programs",
      "10 Programs",
      "15 Programs",
      "25 Programs"
    ],
    "correctAnswer": 2,
    "explanation": "CBSE curriculum mandates a minimum of 15 Python programs covering files and stacks."
  },
  {
    "id": 5,
    "question": "[Topic 6 Q5] How many marks are allocated to the Capstone Project in the practical exam?",
    "options": [
      "5 Marks",
      "8 Marks",
      "10 Marks",
      "12 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "Project work (Python front-end with MySQL back-end) carries 8 marks."
  },
  {
    "id": 6,
    "question": "[Topic 6 Q6] How many marks are allocated to the Viva Voce examination?",
    "options": [
      "2 Marks",
      "3 Marks",
      "5 Marks",
      "7 Marks"
    ],
    "correctAnswer": 1,
    "explanation": "Viva Voce carries 3 marks in the CBSE practical examination."
  },
  {
    "id": 7,
    "question": "[Topic 6 Q7] Which mode should be used to open a binary file for appending new records without erasing existing data?",
    "options": [
      "'w'",
      "'wb'",
      "'ab'",
      "'rb+'"
    ],
    "correctAnswer": 2,
    "explanation": "'ab' opens a binary file in append mode, positioning the pointer at the end of existing data."
  },
  {
    "id": 8,
    "question": "[Topic 6 Q8] Which function in the pickle module is used to read serialized objects from a binary file?",
    "options": [
      "pickle.dump()",
      "pickle.load()",
      "pickle.read()",
      "pickle.get()"
    ],
    "correctAnswer": 1,
    "explanation": "pickle.load(file_object) deserializes and reads the next object from the binary file stream."
  },
  {
    "id": 9,
    "question": "[Topic 6 Q9] What exception is raised when pickle.load() reaches the end of a binary file?",
    "options": [
      "IndexError",
      "EOFError",
      "FileNotFoundError",
      "StopIteration"
    ],
    "correctAnswer": 1,
    "explanation": "EOFError is raised when trying to read beyond the end of a binary file."
  },
  {
    "id": 10,
    "question": "[Topic 6 Q10] Why is newline='' specified when opening a CSV file for writing in Python 3 on Windows?",
    "options": [
      "To prevent blank lines from being inserted between rows",
      "To speed up hard disk writing",
      "To encrypt the file",
      "It is not needed"
    ],
    "correctAnswer": 0,
    "explanation": "On Windows, omitting newline='' causes csv.writer to emit extra carriage returns, creating blank lines."
  },
  {
    "id": 11,
    "question": "[Topic 6 Q11] What method is used to reposition the file pointer to a specific byte location?",
    "options": [
      "f.tell()",
      "f.seek(offset)",
      "f.shift()",
      "f.move()"
    ],
    "correctAnswer": 1,
    "explanation": "f.seek(offset) repositions the file pointer to the specified byte offset."
  },
  {
    "id": 12,
    "question": "[Topic 6 Q12] What method returns the current byte position of the file pointer?",
    "options": [
      "f.tell()",
      "f.seek()",
      "f.pos()",
      "f.current()"
    ],
    "correctAnswer": 0,
    "explanation": "f.tell() returns an integer representing the current byte position of the file pointer."
  },
  {
    "id": 13,
    "question": "[Topic 6 Q13] In a Python stack implementation using a list, which method is used to implement the PUSH operation?",
    "options": [
      "list.insert(0, item)",
      "list.append(item)",
      "list.push(item)",
      "list.add(item)"
    ],
    "correctAnswer": 1,
    "explanation": "list.append(item) adds an element to the end of the list in O(1) time, serving as the TOP of the stack."
  },
  {
    "id": 14,
    "question": "[Topic 6 Q14] In a Python stack implementation, what condition defines Stack Underflow?",
    "options": [
      "len(stk) == 0",
      "len(stk) >= 100",
      "stk is None",
      "stk.pop() == 0"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to pop from an empty stack (len(stk) == 0) results in an Underflow error."
  },
  {
    "id": 15,
    "question": "[Topic 6 Q15] Why must connection.commit() be called after executing an INSERT or UPDATE in mysql.connector?",
    "options": [
      "To close the cursor",
      "To save transactional modifications permanently to the database disk",
      "To clear memory",
      "To return the rowcount"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector does not autocommit; con.commit() is mandatory to persist changes."
  },
  {
    "id": 16,
    "question": "[Topic 6 Q16] What universal placeholder is used for parameterized queries in mysql.connector?",
    "options": [
      "'?'",
      "'%s'",
      "':val'",
      "'$'"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector universally uses '%s' as the parameter placeholder for all column types."
  },
  {
    "id": 17,
    "question": "[Topic 6 Q17] What does cursor.fetchone() return when no more rows remain to be fetched?",
    "options": [
      "Empty list []",
      "None",
      "False",
      "Empty tuple ()"
    ],
    "correctAnswer": 1,
    "explanation": "fetchone() returns None when the result set is exhausted."
  },
  {
    "id": 18,
    "question": "[Topic 6 Q18] What does cursor.fetchall() return if a query produces zero matching records?",
    "options": [
      "None",
      "Empty list []",
      "Empty tuple ()",
      "StopIteration"
    ],
    "correctAnswer": 1,
    "explanation": "fetchall() returns an empty list [] when no rows match the query."
  },
  {
    "id": 19,
    "question": "[Topic 6 Q19] Which SQL clause is used to eliminate duplicate rows from query results?",
    "options": [
      "UNIQUE",
      "DISTINCT",
      "DIFFERENT",
      "PRIMARY"
    ],
    "correctAnswer": 1,
    "explanation": "The DISTINCT keyword collapses duplicate tuples in the projected query result set."
  },
  {
    "id": 20,
    "question": "[Topic 6 Q20] In SQL, which clause filters groups AFTER aggregation by GROUP BY?",
    "options": [
      "WHERE",
      "HAVING",
      "ORDER BY",
      "FILTER"
    ],
    "correctAnswer": 1,
    "explanation": "HAVING filters summary groups created by GROUP BY."
  },
  {
    "id": 21,
    "question": "[Topic 6 Q21] Table A has 4 rows and Table B has 5 rows. What is the cardinality of their Cartesian product?",
    "options": [
      "9",
      "20",
      "1",
      "Cannot be determined"
    ],
    "correctAnswer": 1,
    "explanation": "Cardinality = 4 * 5 = 20 rows."
  },
  {
    "id": 22,
    "question": "[Topic 6 Q22] Table A has 3 columns and Table B has 4 columns. What is the degree of their Cartesian product?",
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
    "question": "[Topic 6 Q23] In an equi-join linking 2 tables, how many join conditions are required in the WHERE clause?",
    "options": [
      "0",
      "1",
      "2",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Joining N tables requires at least (N - 1) join conditions. 2 - 1 = 1."
  },
  {
    "id": 24,
    "question": "[Topic 6 Q24] What is the primary role of the external examiner in the CBSE practical exam?",
    "options": [
      "To teach the practical syllabus",
      "To supervise the lab test, evaluate the practical notebook & project, and conduct viva voce",
      "To write code for students",
      "To grade only theory papers"
    ],
    "correctAnswer": 1,
    "explanation": "The external examiner assesses the lab program, checks the notebook and project, and conducts viva voce."
  },
  {
    "id": 25,
    "question": "[Topic 6 Q25] Why is practicing all practical programs on a real computer critical before the exam?",
    "options": [
      "To verify that file paths, pickle serialization, and MySQL connection credentials work without runtime errors",
      "Because CBSE bans writing code on paper",
      "To memorize line numbers",
      "To avoid learning theory"
    ],
    "correctAnswer": 0,
    "explanation": "Hands-on execution builds debugging muscle memory and ensures flawless execution during the live lab test."
  }
];
export default questions;
