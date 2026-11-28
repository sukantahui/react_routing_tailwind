export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Practical Lab Test: Text Files, Stack Operations & SQL DDL",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "1A1",
            "marks": 1,
            "text": "In the 30-mark CBSE practical examination, how many marks are allocated to the Python programming lab test problem?",
            "solution": "8 Marks.\n[Marking Scheme: 1 mark for 8 Marks.]"
          },
          {
            "qId": "1A2",
            "marks": 1,
            "text": "Which Python file handling method returns the current byte position of the file pointer?",
            "solution": "f.tell()\n[Marking Scheme: 1 mark for f.tell().]"
          },
          {
            "qId": "1A3",
            "marks": 1,
            "text": "What condition indicates 'Stack Underflow' in a Python list-based stack implementation?",
            "solution": "len(stk) == 0 (or not stk).\n[Marking Scheme: 1 mark for len(stk) == 0.]"
          },
          {
            "qId": "1A4",
            "marks": 1,
            "text": "Which SQL constraint establishes a relationship between a child table column and a parent table primary key?",
            "solution": "FOREIGN KEY (REFERENCES parent_table(key)).\n[Marking Scheme: 1 mark for FOREIGN KEY.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "1B1",
            "marks": 2,
            "text": "Viva Voce: Why is 'newline=\"\"' specified when opening a CSV file for writing with csv.writer in Python 3 on Windows?",
            "solution": "In Python 3 on Windows, open() in text mode translates '\\n' to '\\r\\n'. By default, csv.writer also terminates rows with '\\r\\n', producing redundant carriage returns that appear as empty lines. Passing newline='' disables this translation.\n[Marking Scheme: 2 marks for explaining \\r\\n translation and empty line prevention.]"
          },
          {
            "qId": "1B2",
            "marks": 2,
            "text": "Write a Python function to test whether an open MySQL connection 'con' is currently active and authenticated.",
            "solution": "if con.is_connected():\n    print(\"Connection active!\")\nelse:\n    print(\"Connection closed!\")\n[Marking Scheme: 2 marks for is_connected() check.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1C1",
            "marks": 3,
            "text": "Write a Python practical program 'analyze_vowels()' that reads 'passage.txt' and displays the frequency of each vowel (A, E, I, O, U) case-insensitively.",
            "solution": "def analyze_vowels():\n    vowels = {'a': 0, 'e': 0, 'i': 0, 'o': 0, 'u': 0}\n    with open('passage.txt', 'r') as f:\n        text = f.read().lower()\n        for ch in text:\n            if ch in vowels:\n                vowels[ch] += 1\n    for v, count in vowels.items():\n        print(f\"{v.upper()}: {count}\")\n[Marking Scheme: 1 mark for file open & read, 1 mark for vowel counting, 1 mark for output.]"
          },
          {
            "qId": "1C2",
            "marks": 3,
            "text": "Write a Python function 'Push_Even_Numbers(stk, num_list)' to push all even integers from 'num_list' onto the stack 'stk', and 'Pop_Number(stk)' to pop and display the topmost number.",
            "solution": "def Push_Even_Numbers(stk, num_list):\n    for num in num_list:\n        if num % 2 == 0:\n            stk.append(num)\n\ndef Pop_Number(stk):\n    if len(stk) == 0:\n        print(\"Stack Underflow\")\n    else:\n        print(\"Popped:\", stk.pop())\n[Marking Scheme: 1.5 marks for Push with even condition, 1.5 marks for Pop with underflow check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1D1",
            "marks": 6,
            "text": "Table: PRODUCT (PCode INT PRIMARY KEY, PName VARCHAR(30) NOT NULL, Category VARCHAR(20), Price DECIMAL(8,2), Stock INT)\n(a) Write SQL query to create the above table with primary key.\n(b) Insert a record: (101, 'Optical Mouse', 'Hardware', 450.00, 30).\n(c) Display PName and Price of products with Price between 200 and 1000.\n(d) Increase Price by 15% for all products in 'Hardware' category.\n(e) Display Category and total stock value (SUM(Price * Stock)) for each category.\n(f) What is the output of: SELECT Category, COUNT(*) FROM PRODUCT GROUP BY Category HAVING COUNT(*) >= 2;",
            "solution": "(a) CREATE TABLE PRODUCT (\n    PCode INT PRIMARY KEY,\n    PName VARCHAR(30) NOT NULL,\n    Category VARCHAR(20),\n    Price DECIMAL(8,2),\n    Stock INT\n);\n(b) INSERT INTO PRODUCT VALUES (101, 'Optical Mouse', 'Hardware', 450.00, 30);\n(c) SELECT PName, Price FROM PRODUCT WHERE Price BETWEEN 200 AND 1000;\n(d) UPDATE PRODUCT SET Price = Price * 1.15 WHERE Category = 'Hardware';\n(e) SELECT Category, SUM(Price * Stock) FROM PRODUCT GROUP BY Category;\n(f) Displays Category and count of products for categories containing at least 2 distinct products.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Practical Lab Test: Binary Files, CSV Processing & SQL Joins",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "2A1",
            "marks": 1,
            "text": "Which function in the pickle module serializes an object and writes it to an open binary file?",
            "solution": "pickle.dump(object, file_handle)\n[Marking Scheme: 1 mark for pickle.dump().]"
          },
          {
            "qId": "2A2",
            "marks": 1,
            "text": "What exception is raised when reading past the end of a binary file using pickle.load()?",
            "solution": "EOFError (End of File Error).\n[Marking Scheme: 1 mark for EOFError.]"
          },
          {
            "qId": "2A3",
            "marks": 1,
            "text": "How many marks are allocated to the Viva Voce section of the CBSE Class 12 CS practical exam?",
            "solution": "3 Marks.\n[Marking Scheme: 1 mark for 3 Marks.]"
          },
          {
            "qId": "2A4",
            "marks": 1,
            "text": "What does the cursor.rowcount property contain after executing an UPDATE statement?",
            "solution": "The number of rows modified by the UPDATE statement.\n[Marking Scheme: 1 mark for number of modified rows.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "2B1",
            "marks": 2,
            "text": "Viva Voce: Differentiate between f.seek() and f.tell() in Python file handling.",
            "solution": "1. f.tell(): Returns the current byte position of the file read/write pointer as an integer.\n2. f.seek(offset, whence): Repositions the file pointer to the specified byte offset from the reference point whence.\n[Marking Scheme: 1 mark for tell(), 1 mark for seek().]"
          },
          {
            "qId": "2B2",
            "marks": 2,
            "text": "Write a Python code snippet to iterate directly over a MySQL cursor without calling fetchall().",
            "solution": "cur.execute(\"SELECT * FROM Student;\")\nfor row in cur:\n    print(row)\n[Marking Scheme: 2 marks for direct cursor iteration.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2C1",
            "marks": 3,
            "text": "Write a Python function 'search_binary_student(roll)' that searches for a student in 'student.dat' containing [RollNo, SName, Marks] and displays their details, or 'Not Found'.",
            "solution": "import pickle\n\ndef search_binary_student(roll):\n    found = False\n    with open('student.dat', 'rb') as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[0] == roll:\n                    print(f\"Found: Name={rec[1]}, Marks={rec[2]}\")\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print(\"Student Not Found\")\n[Marking Scheme: 1 mark for file open & loop, 1 mark for roll matching & print, 1 mark for not found.]"
          },
          {
            "qId": "2C2",
            "marks": 3,
            "text": "Write a Python function 'filter_csv_stream(target_stream)' that reads 'students.csv' and prints RollNo and Name of students in target_stream.",
            "solution": "import csv\n\ndef filter_csv_stream(target_stream):\n    with open('students.csv', 'r') as f:\n        reader = csv.reader(f)\n        header = next(reader)\n        for r in reader:\n            if r[2].upper() == target_stream.upper():\n                print(f\"{r[0]:<10}{r[1]}\")\n[Marking Scheme: 1 mark for open & next(reader), 1 mark for stream matching, 1 mark for output.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2D1",
            "marks": 6,
            "text": "Tables: EMPLOYEE (EmpId INT PRIMARY KEY, EName VARCHAR(30), DeptId INT, Salary INT)\nand DEPARTMENT (DeptId INT PRIMARY KEY, DeptName VARCHAR(20), Location VARCHAR(20))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display EName and Salary of employees whose Salary > 50000.\n(b) Display all employees whose name starts with 'S'.\n(c) Display DeptId and average Salary in each department.\n(d) Display EName, DeptName, and Location using an equi-join.\n(e) Delete employees whose Salary IS NULL.\n(f) What is the output of: SELECT DeptName, COUNT(*) FROM EMPLOYEE E, DEPARTMENT D WHERE E.DeptId = D.DeptId GROUP BY D.DeptId, D.DeptName HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT EName, Salary FROM EMPLOYEE WHERE Salary > 50000;\n(b) SELECT * FROM EMPLOYEE WHERE EName LIKE 'S%';\n(c) SELECT DeptId, AVG(Salary) FROM EMPLOYEE GROUP BY DeptId;\n(d) SELECT E.EName, D.DeptName, D.Location FROM EMPLOYEE E, DEPARTMENT D WHERE E.DeptId = D.DeptId;\n(e) DELETE FROM EMPLOYEE WHERE Salary IS NULL;\n(f) Displays each DeptName and count of employees for departments with at least 2 staff members.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Practical Lab Test: In-Place Binary Update & Parameterized SQL",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "3A1",
            "marks": 1,
            "text": "In file handling, which mode opens a binary file for both reading and writing?",
            "solution": "'rb+' (or 'wb+', 'ab+').\n[Marking Scheme: 1 mark for 'rb+'.]"
          },
          {
            "qId": "3A2",
            "marks": 1,
            "text": "Which Python function in the os module is used to delete an existing file from disk?",
            "solution": "os.remove(path)\n[Marking Scheme: 1 mark for os.remove().]"
          },
          {
            "qId": "3A3",
            "marks": 1,
            "text": "Why must con.commit() be called after executing an INSERT query in Python-MySQL connectivity?",
            "solution": "To permanently write transactional modifications to disk (transactions are not autocommitted by default).\n[Marking Scheme: 1 mark for saving changes permanently.]"
          },
          {
            "qId": "3A4",
            "marks": 1,
            "text": "What is the degree of a relation having 5 columns and 12 rows?",
            "solution": "Degree = 5.\n[Marking Scheme: 1 mark for 5.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "3B1",
            "marks": 2,
            "text": "Viva Voce: Why is using '%s' placeholders in mysql.connector better than using Python f-strings?",
            "solution": "Parameterized queries with '%s' separate SQL instructions from user data, preventing SQL Injection attacks and ensuring automatic quoting and data escaping by the driver.\n[Marking Scheme: 2 marks for SQL injection prevention and auto-escaping.]"
          },
          {
            "qId": "3B2",
            "marks": 2,
            "text": "Write a Python snippet to demonstrate the PEEK operation on a stack 'stk'.",
            "solution": "def peek(stk):\n    if len(stk) == 0:\n        return None\n    return stk[-1]\n[Marking Scheme: 2 marks for stk[-1] with empty check.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3C1",
            "marks": 3,
            "text": "Write a Python function 'update_marks_binary(roll, new_marks)' to locate a student by RollNo in 'student.dat' and update their marks in-place using seek() and tell().",
            "solution": "import pickle\n\ndef update_marks_binary(roll, new_marks):\n    found = False\n    with open('student.dat', 'rb+') as f:\n        try:\n            while True:\n                pos = f.tell()\n                rec = pickle.load(f)\n                if rec[0] == roll:\n                    rec[2] = new_marks\n                    f.seek(pos)\n                    pickle.dump(rec, f)\n                    found = True\n                    print(\"Updated!\")\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print(\"Not found!\")\n[Marking Scheme: 1 mark for open & tell(), 1 mark for seek(pos) and pickle.dump, 1 mark for feedback.]"
          },
          {
            "qId": "3C2",
            "marks": 3,
            "text": "Write a Python function 'add_student_mysql(roll, name, marks)' that inserts a new student into MySQL table 'Student' using parameterized placeholders and commits the transaction.",
            "solution": "import mysql.connector\n\ndef add_student_mysql(roll, name, marks):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='SchoolDB')\n    cur = con.cursor()\n    query = \"INSERT INTO Student VALUES (%s, %s, %s);\"\n    cur.execute(query, (roll, name, marks))\n    con.commit()\n    print(f\"Enrolled! Rows affected: {cur.rowcount}\")\n    cur.close(); con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for execute with parameters & commit, 1 mark for closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3D1",
            "marks": 6,
            "text": "Table: BOOK (BookId INT PRIMARY KEY, Title VARCHAR(40), Author VARCHAR(30), Price DECIMAL(6,2), Status VARCHAR(15))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Create the table BOOK with BookId as PRIMARY KEY.\n(b) Display all books whose Price is between 300 and 800.\n(c) Display Title and Price of books whose Author's name contains 'Sharma'.\n(d) Update Status to 'Issued' for BookId 105.\n(e) Delete all books whose Status is 'Discarded'.\n(f) What is the output of: SELECT Status, COUNT(*) FROM BOOK GROUP BY Status;",
            "solution": "(a) CREATE TABLE BOOK (\n    BookId INT PRIMARY KEY,\n    Title VARCHAR(40),\n    Author VARCHAR(30),\n    Price DECIMAL(6,2),\n    Status VARCHAR(15)\n);\n(b) SELECT * FROM BOOK WHERE Price BETWEEN 300 AND 800;\n(c) SELECT Title, Price FROM BOOK WHERE Author LIKE '%Sharma%';\n(d) UPDATE BOOK SET Status = 'Issued' WHERE BookId = 105;\n(e) DELETE FROM BOOK WHERE Status = 'Discarded';\n(f) Displays each Status and count of books in that status category.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Practical Lab Test: Line Filter, Record Stack & SQL Aggregates",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "4A1",
            "marks": 1,
            "text": "What does the method cursor.fetchall() return if the query matched 0 rows?",
            "solution": "An empty list: []\n[Marking Scheme: 1 mark for empty list [].]"
          },
          {
            "qId": "4A2",
            "marks": 1,
            "text": "Which SQL clause is used to filter records prior to grouping?",
            "solution": "WHERE clause.\n[Marking Scheme: 1 mark for WHERE.]"
          },
          {
            "qId": "4A3",
            "marks": 1,
            "text": "How many marks are allocated to the Practical Report File (Notebook) in the CBSE CS practical exam?",
            "solution": "7 Marks.\n[Marking Scheme: 1 mark for 7 Marks.]"
          },
          {
            "qId": "4A4",
            "marks": 1,
            "text": "What is the return type of cursor.fetchone() when data is retrieved?",
            "solution": "A tuple (containing column values).\n[Marking Scheme: 1 mark for tuple.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "4B1",
            "marks": 2,
            "text": "Viva Voce: What is the difference between a Hub and a Switch in computer networking?",
            "solution": "1. Hub: Broadcasts data packets to all ports blindly (Layer 1 physical device, shares bandwidth).\n2. Switch: Unicasts data packets specifically to the destination port using hardware MAC addresses (Layer 2 intelligent device).\n[Marking Scheme: 1 mark for Hub, 1 mark for Switch.]"
          },
          {
            "qId": "4B2",
            "marks": 2,
            "text": "Write a Python function to check if a stack 'stk' is empty and return True or False.",
            "solution": "def is_empty(stk):\n    return len(stk) == 0\n[Marking Scheme: 2 marks for len(stk) == 0.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4C1",
            "marks": 3,
            "text": "Write a Python program 'copy_lines_starting_with_a()' that reads 'input.txt' and copies all lines starting with 'A' or 'a' into 'output.txt'.",
            "solution": "def copy_lines_starting_with_a():\n    count = 0\n    with open('input.txt', 'r') as fin, open('output.txt', 'w') as fout:\n        for line in fin:\n            if line.strip().lower().startswith('a'):\n                fout.write(line)\n                count += 1\n    print(f\"Copied {count} lines!\")\n[Marking Scheme: 1 mark for open fin/fout, 1 mark for startswith('a') check, 1 mark for write & print.]"
          },
          {
            "qId": "4C2",
            "marks": 3,
            "text": "Write functions in Python to implement a stack of Book records [BookNo, Title, Price]:\n(i) Push_Book(stk, book)\n(ii) Pop_Book(stk)",
            "solution": "def Push_Book(stk, book):\n    stk.append(book)\n\ndef Pop_Book(stk):\n    if len(stk) == 0:\n        print(\"Stack Underflow\")\n        return None\n    return stk.pop()\n[Marking Scheme: 1.5 marks for Push, 1.5 marks for Pop with underflow check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4D1",
            "marks": 6,
            "text": "Table: FLIGHT (FlightNo VARCHAR(10) PRIMARY KEY, Origin VARCHAR(20), Dest VARCHAR(20), Fare INT, Seats INT)\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display FlightNo and Fare for flights flying from 'Kolkata' to 'Bengaluru'.\n(b) Display all flights with Seats > 0 ordered by Fare ascending.\n(c) Display Origin and average Fare for each origin.\n(d) Increase Fare by 8% for flights departing from 'Mumbai'.\n(e) Delete flights where Seats = 0.\n(f) What is the output of: SELECT Dest, COUNT(*) FROM FLIGHT GROUP BY Dest HAVING COUNT(*) > 1;",
            "solution": "(a) SELECT FlightNo, Fare FROM FLIGHT WHERE Origin = 'Kolkata' AND Dest = 'Bengaluru';\n(b) SELECT * FROM FLIGHT WHERE Seats > 0 ORDER BY Fare ASC;\n(c) SELECT Origin, AVG(Fare) FROM FLIGHT GROUP BY Origin;\n(d) UPDATE FLIGHT SET Fare = Fare * 1.08 WHERE Origin = 'Mumbai';\n(e) DELETE FROM FLIGHT WHERE Seats = 0;\n(f) Displays Dest and count of arriving flights for destinations serviced by more than 1 flight.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Practical Lab Test: Word Counter, Temp Deletion & MySQL Display",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "5A1",
            "marks": 1,
            "text": "What does the expression 'text.split()' do in Python?",
            "solution": "Splits a string into a list of words using whitespace as delimiter.\n[Marking Scheme: 1 mark for splitting into list of words.]"
          },
          {
            "qId": "5A2",
            "marks": 1,
            "text": "Which SQL operator checks if an attribute value matches an item in a given list?",
            "solution": "The IN operator.\n[Marking Scheme: 1 mark for IN.]"
          },
          {
            "qId": "5A3",
            "marks": 1,
            "text": "How many marks are allocated to the Capstone Project in the CBSE practical exam?",
            "solution": "8 Marks.\n[Marking Scheme: 1 mark for 8 Marks.]"
          },
          {
            "qId": "5A4",
            "marks": 1,
            "text": "What does connection.rollback() do?",
            "solution": "Cancels all uncommitted changes in the current database transaction.\n[Marking Scheme: 1 mark for cancelling uncommitted changes.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "5B1",
            "marks": 2,
            "text": "Viva Voce: Explain the difference between mutable and immutable data types in Python with examples.",
            "solution": "1. Mutable: Value can be modified in-place without changing object identity (e.g. list, dict, set).\n2. Immutable: Value cannot be altered in-place; modifications create new objects (e.g. int, float, str, tuple).\n[Marking Scheme: 1 mark for mutable, 1 mark for immutable.]"
          },
          {
            "qId": "5B2",
            "marks": 2,
            "text": "Write a Python snippet to format and print table headers with width specification.",
            "solution": "print(f\"{'Roll':<10}{'Name':<25}{'Marks':>8}\")\nprint(\"-\" * 45)\n[Marking Scheme: 2 marks for formatted string with width specifiers.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5C1",
            "marks": 3,
            "text": "Write a Python function 'delete_student_binary(target_roll)' that removes a record from 'student.dat' using a temporary file strategy.",
            "solution": "import pickle, os\n\ndef delete_student_binary(target_roll):\n    found = False\n    with open('student.dat', 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                rec = pickle.load(fin)\n                if rec[0] == target_roll:\n                    found = True\n                else:\n                    pickle.dump(rec, fout)\n        except EOFError:\n            pass\n    os.remove('student.dat')\n    os.rename('temp.dat', 'student.dat')\n    print(\"Deleted!\" if found else \"Not found!\")\n[Marking Scheme: 1 mark for open fin/fout, 1 mark for copying non-target records, 1 mark for remove/rename.]"
          },
          {
            "qId": "5C2",
            "marks": 3,
            "text": "Write a Python function 'display_students_mysql()' that connects to 'SchoolDB' and prints all students in tabular form.",
            "solution": "import mysql.connector\n\ndef display_students_mysql():\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='SchoolDB')\n    cur = con.cursor()\n    cur.execute(\"SELECT RollNo, SName, Marks FROM Student;\")\n    for r in cur.fetchall():\n        print(f\"{r[0]:<10}{r[1]:<25}{r[2]:>8.2f}\")\n    cur.close(); con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for query & fetchall(), 1 mark for formatted print & close.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5D1",
            "marks": 6,
            "text": "Table: ACCOUNT (AccNo INT PRIMARY KEY, CustName VARCHAR(30), AccType VARCHAR(15), Balance DECIMAL(12,2))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display CustName and Balance of accounts where AccType is 'Savings'.\n(b) Display all accounts having Balance between 50000 and 200000.\n(c) Display AccType and total balance held in each account type.\n(d) Credit 5% interest to Balance for all 'Savings' accounts.\n(e) Delete accounts having Balance = 0.\n(f) What is the output of: SELECT AccType, AVG(Balance) FROM ACCOUNT GROUP BY AccType HAVING AVG(Balance) > 60000;",
            "solution": "(a) SELECT CustName, Balance FROM ACCOUNT WHERE AccType = 'Savings';\n(b) SELECT * FROM ACCOUNT WHERE Balance BETWEEN 50000 AND 200000;\n(c) SELECT AccType, SUM(Balance) FROM ACCOUNT GROUP BY AccType;\n(d) UPDATE ACCOUNT SET Balance = Balance * 1.05 WHERE AccType = 'Savings';\n(e) DELETE FROM ACCOUNT WHERE Balance = 0;\n(f) Displays AccType and average balance for account types where average balance exceeds 60000.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Practical Lab Test: CSV Aggregation, Custom Stack & Equi-Joins",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "6A1",
            "marks": 1,
            "text": "Which parameter in csv.writer determines the column separator character?",
            "solution": "delimiter (e.g. delimiter=';')\n[Marking Scheme: 1 mark for delimiter.]"
          },
          {
            "qId": "6A2",
            "marks": 1,
            "text": "What does the expression 'stk[-1]' evaluate to on a non-empty list stack?",
            "solution": "The topmost element of the stack (without removing it).\n[Marking Scheme: 1 mark for topmost element.]"
          },
          {
            "qId": "6A3",
            "marks": 1,
            "text": "Table A has Degree 4, Table B has Degree 3. What is the Degree of their Cartesian product?",
            "solution": "Degree = 4 + 3 = 7 columns.\n[Marking Scheme: 1 mark for 7.]"
          },
          {
            "qId": "6A4",
            "marks": 1,
            "text": "What does cur.lastrowid contain in mysql.connector?",
            "solution": "The AUTO_INCREMENT ID of the last inserted record.\n[Marking Scheme: 1 mark for last AUTO_INCREMENT ID.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "6B1",
            "marks": 2,
            "text": "Viva Voce: What is the difference between WHERE and HAVING in SQL?",
            "solution": "1. WHERE filters individual rows before grouping and cannot contain aggregate functions.\n2. HAVING filters groups after GROUP BY and can contain aggregate functions.\n[Marking Scheme: 1 mark for WHERE, 1 mark for HAVING.]"
          },
          {
            "qId": "6B2",
            "marks": 2,
            "text": "Write a Python snippet to skip the header line when reading a CSV file.",
            "solution": "reader = csv.reader(f)\nheader = next(reader)\n[Marking Scheme: 2 marks for next(reader).]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6C1",
            "marks": 3,
            "text": "Write a Python function 'aggregate_csv_department(dept_name)' that reads 'emp.csv' and computes the total salary of employees in dept_name.",
            "solution": "import csv\n\ndef aggregate_csv_department(dept_name):\n    total = 0.0\n    with open('emp.csv', 'r') as f:\n        reader = csv.reader(f)\n        header = next(reader)\n        for row in reader:\n            if row[2].upper() == dept_name.upper():\n                total += float(row[3])\n    print(f\"Total salary in {dept_name}: Rs. {total}\")\n[Marking Scheme: 1 mark for open & next(), 1 mark for float casting & sum, 1 mark for print.]"
          },
          {
            "qId": "6C2",
            "marks": 3,
            "text": "Write functions in Python to implement a stack of City names:\n(i) Push_City(stk, city): pushes city onto stack.\n(ii) Pop_City(stk): pops and displays city or 'Underflow'.",
            "solution": "def Push_City(stk, city):\n    stk.append(city)\n\ndef Pop_City(stk):\n    if not stk:\n        print(\"Underflow\")\n    else:\n        print(\"Popped:\", stk.pop())\n[Marking Scheme: 1.5 marks for Push, 1.5 marks for Pop with underflow check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6D1",
            "marks": 6,
            "text": "Tables: PATIENT (PId INT PRIMARY KEY, PName VARCHAR(30), DeptId INT, Bill DECIMAL(8,2))\nand WARD (DeptId INT PRIMARY KEY, DeptName VARCHAR(20), Floor INT)\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display PName and Bill of patients with Bill > 15000.\n(b) Display all patients admitted in DeptId 101 or 102.\n(c) Display DeptId and average Bill in each department.\n(d) Display PName, DeptName, and Floor using an equi-join.\n(e) Delete patients whose Bill IS NULL.\n(f) What is the output of: SELECT DeptName, COUNT(*) FROM PATIENT P, WARD W WHERE P.DeptId = W.DeptId GROUP BY W.DeptId, W.DeptName HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT PName, Bill FROM PATIENT WHERE Bill > 15000;\n(b) SELECT * FROM PATIENT WHERE DeptId IN (101, 102);\n(c) SELECT DeptId, AVG(Bill) FROM PATIENT GROUP BY DeptId;\n(d) SELECT P.PName, W.DeptName, W.Floor FROM PATIENT P, WARD W WHERE P.DeptId = W.DeptId;\n(e) DELETE FROM PATIENT WHERE Bill IS NULL;\n(f) Displays DeptName and count of patients for wards having at least 2 patients.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Practical Lab Test: Word Replacer, Binary Key Search & MySQL Parameterized",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "7A1",
            "marks": 1,
            "text": "Which placeholder character is used in mysql.connector for parameterized queries?",
            "solution": "'%s'\n[Marking Scheme: 1 mark for '%s'.]"
          },
          {
            "qId": "7A2",
            "marks": 1,
            "text": "What does the expression 'f.read()' return?",
            "solution": "The entire file contents as a single string.\n[Marking Scheme: 1 mark for single string of entire file contents.]"
          },
          {
            "qId": "7A3",
            "marks": 1,
            "text": "Which SQL clause sorts query results in ascending order by default?",
            "solution": "ORDER BY\n[Marking Scheme: 1 mark for ORDER BY.]"
          },
          {
            "qId": "7A4",
            "marks": 1,
            "text": "What exception is raised when popping from an empty Python list?",
            "solution": "IndexError (pop from empty list).\n[Marking Scheme: 1 mark for IndexError.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "7B1",
            "marks": 2,
            "text": "Viva Voce: What is the difference between a Candidate Key and a Primary Key?",
            "solution": "1. Candidate Key: Any attribute (or set of attributes) capable of uniquely identifying a record in a relation.\n2. Primary Key: The single chosen candidate key used by the database system as the primary unique identifier.\n[Marking Scheme: 1 mark for Candidate Key, 1 mark for Primary Key.]"
          },
          {
            "qId": "7B2",
            "marks": 2,
            "text": "Write a Python snippet to open a binary file 'data.dat' and serialize a dictionary {'id': 101, 'name': 'Raj'} into it.",
            "solution": "import pickle\nwith open('data.dat', 'wb') as f:\n    pickle.dump({'id': 101, 'name': 'Raj'}, f)\n[Marking Scheme: 2 marks for pickle.dump with 'wb'.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7C1",
            "marks": 3,
            "text": "Write a Python program 'replace_word_in_file(filename, old_w, new_w)' that replaces all occurrences of old_w with new_w and saves into 'updated_' + filename.",
            "solution": "def replace_word_in_file(filename, old_w, new_w):\n    with open(filename, 'r') as f:\n        content = f.read()\n    modified = content.replace(old_w, new_w)\n    with open('updated_' + filename, 'w') as f:\n        f.write(modified)\n    print(\"File updated!\")\n[Marking Scheme: 1 mark for read, 1 mark for replace, 1 mark for write.]"
          },
          {
            "qId": "7C2",
            "marks": 3,
            "text": "Write a Python function 'delete_member_mysql(mid)' that deletes a member record from table 'Member' in MySQL and confirms rowcount.",
            "solution": "import mysql.connector\n\ndef delete_member_mysql(mid):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='ClubDB')\n    cur = con.cursor()\n    cur.execute(\"DELETE FROM Member WHERE MemId = %s;\", (mid,))\n    con.commit()\n    print(f\"{cur.rowcount} member(s) removed!\")\n    cur.close(); con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for DELETE with parameter & commit, 1 mark for rowcount & close.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7D1",
            "marks": 6,
            "text": "Table: ITEM (ItemCode INT PRIMARY KEY, ItemName VARCHAR(30), Price DECIMAL(8,2), Stock INT)\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display ItemName and Price of items where Price > 500.\n(b) Display all items whose ItemName ends with 's'.\n(c) Display total inventory value: SUM(Price * Stock).\n(d) Increase Price by 10 for all items having Stock < 15.\n(e) Delete items where Stock = 0.\n(f) What is the output of: SELECT MIN(Price), MAX(Price) FROM ITEM;",
            "solution": "(a) SELECT ItemName, Price FROM ITEM WHERE Price > 500;\n(b) SELECT * FROM ITEM WHERE ItemName LIKE '%s';\n(c) SELECT SUM(Price * Stock) FROM ITEM;\n(d) UPDATE ITEM SET Price = Price + 10 WHERE Stock < 15;\n(e) DELETE FROM ITEM WHERE Stock = 0;\n(f) Displays the lowest price and highest price among all items.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Practical Lab Test: Vowel Lines, Binary Modification & Group Queries",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "8A1",
            "marks": 1,
            "text": "What does the method f.seek(0, 0) do?",
            "solution": "Rewinds the file pointer to the beginning of the file.\n[Marking Scheme: 1 mark for rewinding to beginning.]"
          },
          {
            "qId": "8A2",
            "marks": 1,
            "text": "What does COUNT(column_name) do when encountering NULL values?",
            "solution": "It ignores NULL values and counts only non-null entries.\n[Marking Scheme: 1 mark for ignoring NULL values.]"
          },
          {
            "qId": "8A3",
            "marks": 1,
            "text": "In Python, which function converts an object to a string representation?",
            "solution": "str()\n[Marking Scheme: 1 mark for str().]"
          },
          {
            "qId": "8A4",
            "marks": 1,
            "text": "What is the primary characteristic of a Stack data structure?",
            "solution": "Last-In-First-Out (LIFO).\n[Marking Scheme: 1 mark for LIFO.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "8B1",
            "marks": 2,
            "text": "Viva Voce: What is the difference between COUNT(*) and COUNT(DISTINCT column)?",
            "solution": "1. COUNT(*): Counts all rows in the table including duplicates and NULLs.\n2. COUNT(DISTINCT column): Counts only unique, non-duplicate, non-null values in that column.\n[Marking Scheme: 1 mark for COUNT(*), 1 mark for COUNT(DISTINCT).]"
          },
          {
            "qId": "8B2",
            "marks": 2,
            "text": "Write a Python snippet to catch a database exception in mysql.connector.",
            "solution": "try:\n    cur.execute(\"SELECT * FROM NonExistentTable;\")\nexcept mysql.connector.Error as err:\n    print(f\"Database Error [{err.errno}]: {err.msg}\")\n[Marking Scheme: 2 marks for try-except catching mysql.connector.Error.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8C1",
            "marks": 3,
            "text": "Write a Python function 'count_vowel_lines()' that reads 'lines.txt' and counts all lines starting with a vowel.",
            "solution": "def count_vowel_lines():\n    vowels = ('a', 'e', 'i', 'o', 'u')\n    count = 0\n    with open('lines.txt', 'r') as f:\n        for line in f:\n            stripped = line.strip()\n            if stripped and stripped[0].lower() in vowels:\n                count += 1\n    print(\"Lines starting with vowel:\", count)\n[Marking Scheme: 1 mark for open & loop, 1 mark for vowel check, 1 mark for count & print.]"
          },
          {
            "qId": "8C2",
            "marks": 3,
            "text": "Write a Python function 'Push_Multiples_Of_5(stk, nums)' to push all multiples of 5 onto stack 'stk', and 'Pop_Item(stk)' to pop with Underflow check.",
            "solution": "def Push_Multiples_Of_5(stk, nums):\n    for n in nums:\n        if n % 5 == 0:\n            stk.append(n)\n\ndef Pop_Item(stk):\n    if len(stk) == 0:\n        print(\"Stack Underflow\")\n    else:\n        return stk.pop()\n[Marking Scheme: 1.5 marks for Push, 1.5 marks for Pop with underflow check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8D1",
            "marks": 6,
            "text": "Table: FACULTY (FacId INT PRIMARY KEY, FName VARCHAR(30), Dept VARCHAR(20), Salary INT, Experience INT)\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display FName and Salary of faculty with Experience > 10.\n(b) Display all faculty in 'Computer Science' or 'Physics'.\n(c) Display Dept and average Experience of faculty in each department.\n(d) Increase Salary by 10% for faculty with Experience >= 15.\n(e) Delete faculty whose Salary IS NULL.\n(f) What is the output of: SELECT Dept, MAX(Salary) FROM FACULTY GROUP BY Dept HAVING MAX(Salary) > 70000;",
            "solution": "(a) SELECT FName, Salary FROM FACULTY WHERE Experience > 10;\n(b) SELECT * FROM FACULTY WHERE Dept IN ('Computer Science', 'Physics');\n(c) SELECT Dept, AVG(Experience) FROM FACULTY GROUP BY Dept;\n(d) UPDATE FACULTY SET Salary = Salary * 1.10 WHERE Experience >= 15;\n(e) DELETE FROM FACULTY WHERE Salary IS NULL;\n(f) Displays Dept and maximum salary for departments where maximum salary exceeds 70000.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Practical Lab Test: Character Filter, Binary Search & SQL Subqueries",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "9A1",
            "marks": 1,
            "text": "What does the expression 'f.readline()' return in Python?",
            "solution": "A single line from the file as a string, including the trailing newline character '\\n'.\n[Marking Scheme: 1 mark for single line as string.]"
          },
          {
            "qId": "9A2",
            "marks": 1,
            "text": "What does the method 'csv.reader()' return in Python?",
            "solution": "A reader object which iterates over lines in the given CSV file.\n[Marking Scheme: 1 mark for reader object.]"
          },
          {
            "qId": "9A3",
            "marks": 1,
            "text": "Table R has 5 rows and Table S has 3 rows. What is the Cardinality of R × S?",
            "solution": "Cardinality = 5 * 3 = 15 rows.\n[Marking Scheme: 1 mark for 15.]"
          },
          {
            "qId": "9A4",
            "marks": 1,
            "text": "What is the return type of connection.cursor() in mysql.connector?",
            "solution": "A Cursor object.\n[Marking Scheme: 1 mark for Cursor object.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "9B1",
            "marks": 2,
            "text": "Viva Voce: Why must both cursor and connection be closed in Python database scripts?",
            "solution": "Closing cursors and connections frees database server memory buffers, releases client operating system sockets, and prevents connection exhaustion on the MySQL server daemon.\n[Marking Scheme: 2 marks for resource release and connection pool explanation.]"
          },
          {
            "qId": "9B2",
            "marks": 2,
            "text": "Write a Python snippet to read and print all records from 'student.dat' using pickle.load().",
            "solution": "import pickle\nwith open('student.dat', 'rb') as f:\n    try:\n        while True:\n            print(pickle.load(f))\n    except EOFError:\n        pass\n[Marking Scheme: 2 marks for pickle.load with while True & EOFError.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9C1",
            "marks": 3,
            "text": "Write a Python function 'count_alphabets_digits()' that reads 'sample.txt' and displays total count of alphabets and total count of digits.",
            "solution": "def count_alphabets_digits():\n    alpha, digit = 0, 0\n    with open('sample.txt', 'r') as f:\n        content = f.read()\n        for ch in content:\n            if ch.isalpha(): alpha += 1\n            elif ch.isdigit(): digit += 1\n    print(f\"Alphabets: {alpha}, Digits: {digit}\")\n[Marking Scheme: 1 mark for open & read, 1 mark for isalpha/isdigit counters, 1 mark for print.]"
          },
          {
            "qId": "9C2",
            "marks": 3,
            "text": "Write a Python function 'update_salary_mysql(eid, hike_percent)' that updates employee salary in MySQL table 'Employee' and commits.",
            "solution": "import mysql.connector\n\ndef update_salary_mysql(eid, hike_percent):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='CompanyDB')\n    cur = con.cursor()\n    factor = 1 + (hike_percent / 100)\n    cur.execute(\"UPDATE Employee SET Salary = Salary * %s WHERE EmpId = %s;\", (factor, eid))\n    con.commit()\n    print(\"Salary updated!\")\n    cur.close(); con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for UPDATE with parameters & commit, 1 mark for close.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9D1",
            "marks": 6,
            "text": "Tables: ORDERS (OrderId INT PRIMARY KEY, CustId INT, Amount DECIMAL(10,2), OrderDate DATE)\nand CUSTOMER (CustId INT PRIMARY KEY, CustName VARCHAR(30), City VARCHAR(20))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display CustName, OrderId, and Amount using an equi-join.\n(b) Display all orders with Amount > 5000 placed in 2023.\n(c) Display City and count of customers residing in that city.\n(d) Display highest and lowest order Amount in ORDERS table.\n(e) Delete orders placed before '2022-01-01'.\n(f) What is the output of: SELECT CustId, SUM(Amount) FROM ORDERS GROUP BY CustId HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT C.CustName, O.OrderId, O.Amount FROM CUSTOMER C, ORDERS O WHERE C.CustId = O.CustId;\n(b) SELECT * FROM ORDERS WHERE Amount > 5000 AND OrderDate BETWEEN '2023-01-01' AND '2023-12-31';\n(c) SELECT City, COUNT(*) FROM CUSTOMER GROUP BY City;\n(d) SELECT MAX(Amount), MIN(Amount) FROM ORDERS;\n(e) DELETE FROM ORDERS WHERE OrderDate < '2022-01-01';\n(f) Displays CustId and total order spend for customers who placed 2 or more orders.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Grand Practical Lab & Capstone Viva Voce Simulation",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "10A1",
            "marks": 1,
            "text": "What does the expression 'pickle.load(f)' return when reading a serialized list?",
            "solution": "The deserialized Python list object.\n[Marking Scheme: 1 mark for deserialized Python list object.]"
          },
          {
            "qId": "10A2",
            "marks": 1,
            "text": "Which SQL command is used to add a new column to an existing database table?",
            "solution": "ALTER TABLE table_name ADD column_name data_type;\n[Marking Scheme: 1 mark for ALTER TABLE ... ADD.]"
          },
          {
            "qId": "10A3",
            "marks": 1,
            "text": "In Python-MySQL connectivity, what is the default host value for connecting to a local database server?",
            "solution": "'localhost' (or '127.0.0.1').\n[Marking Scheme: 1 mark for 'localhost'.]"
          },
          {
            "qId": "10A4",
            "marks": 1,
            "text": "What is the purpose of the Capstone Project in the CBSE Class 12 practical exam?",
            "solution": "To assess students' ability to design and build a complete real-world database-driven application.\n[Marking Scheme: 1 mark for real-world database-driven application development.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "10B1",
            "marks": 2,
            "text": "Viva Voce: Explain the difference between DDL and DML commands in SQL with 2 examples of each.",
            "solution": "1. DDL (Data Definition Language): Defines and modifies the database schema (e.g. CREATE TABLE, ALTER TABLE, DROP TABLE).\n2. DML (Data Manipulation Language): Modifies and manipulates records within the schema (e.g. INSERT, UPDATE, DELETE).\n[Marking Scheme: 1 mark for DDL with examples, 1 mark for DML with examples.]"
          },
          {
            "qId": "10B2",
            "marks": 2,
            "text": "Write a complete Python function to display the version of the connected MySQL server.",
            "solution": "def print_server_version(con):\n    print(\"MySQL Server Version:\", con.get_server_info())\n[Marking Scheme: 2 marks for con.get_server_info().]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10C1",
            "marks": 3,
            "text": "Write a complete Python script to implement a Linear Stack storing Employee IDs [EmpId] with functions: Push_Emp(stk, eid), Pop_Emp(stk), and Display_Emp(stk).",
            "solution": "def Push_Emp(stk, eid):\n    stk.append(eid)\n\ndef Pop_Emp(stk):\n    if len(stk) == 0:\n        print(\"Stack Underflow\")\n    else:\n        print(\"Popped ID:\", stk.pop())\n\ndef Display_Emp(stk):\n    if not stk:\n        print(\"Stack Empty\")\n    else:\n        for i in range(len(stk) - 1, -1, -1):\n            print(stk[i])\n[Marking Scheme: 1 mark for Push, 1 mark for Pop with underflow check, 1 mark for backwards Display.]"
          },
          {
            "qId": "10C2",
            "marks": 3,
            "text": "Write a Python function 'write_employee_csv()' that prompts user for EmpId, Name, Salary and writes to 'emp.csv' with newline=''.",
            "solution": "import csv\n\ndef write_employee_csv():\n    with open('emp.csv', 'w', newline='') as f:\n        writer = csv.writer(f)\n        writer.writerow(['EmpId', 'Name', 'Salary'])\n        while True:\n            eid = int(input(\"EmpId: \"))\n            name = input(\"Name: \")\n            sal = float(input(\"Salary: \"))\n            writer.writerow([eid, name, sal])\n            if input(\"More? (y/n): \").lower() != 'y':\n                break\n    print(\"Saved to emp.csv!\")\n[Marking Scheme: 1 mark for open with newline='', 1 mark for writerow header and loop, 1 mark for exit condition.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10D1",
            "marks": 6,
            "text": "Capstone Student Management System Project:\nWrite a complete menu-driven Python script that connects to 'SchoolDB' and implements:\n(a) Option 1: 'enroll_student()': accepts RollNo, Name, Stream, Marks and inserts with commit.\n(b) Option 2: 'display_toppers()': displays students with Marks >= 90.\n(c) Option 3: 'delete_student()': deletes student by RollNo.\n(d) Option 4: 'exit()': closes connections.\nInclude error handling with try-except catching mysql.connector.Error.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='SchoolDB')\n\ndef enroll_student():\n    try:\n        con = get_con(); cur = con.cursor()\n        r = int(input(\"Roll: \"))\n        n = input(\"Name: \")\n        s = input(\"Stream: \")\n        m = float(input(\"Marks: \"))\n        cur.execute(\"INSERT INTO Student VALUES (%s, %s, %s, %s);\", (r, n, s, m))\n        con.commit()\n        print(\"Enrolled!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef display_toppers():\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT RollNo, SName, Marks FROM Student WHERE Marks >= 90.0;\")\n        for r in cur.fetchall():\n            print(f\"{r[0]} | {r[1]} | {r[2]}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef delete_student():\n    try:\n        con = get_con(); cur = con.cursor()\n        r = int(input(\"Roll to delete: \"))\n        cur.execute(\"DELETE FROM Student WHERE RollNo = %s;\", (r,))\n        con.commit()\n        print(\"Deleted!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef main():\n    while True:\n        print(\"\\n1. Enroll  2. View Toppers  3. Delete  4. Exit\")\n        ch = input(\"Choice (1-4): \")\n        if ch == '1': enroll_student()\n        elif ch == '2': display_toppers()\n        elif ch == '3': delete_student()\n        elif ch == '4': break\n        else: print(\"Invalid!\")\n[Marking Scheme: 1.5 marks for enroll with commit, 1.5 marks for display_toppers, 1.5 marks for delete, 1.5 marks for menu loop.]"
          }
        ]
      }
    ]
  }
];
export default samplePaperSets;
