export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Board Blueprint & Section-Wise Examination Mastery",
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
            "text": "In the CBSE Class 12 CS (083) theory paper, how many marks are allocated to Unit I: Computational Thinking and Programming - 2?",
            "solution": "40 Marks (out of 70 total theory marks).\n[Marking Scheme: 1 mark for 40 Marks.]"
          },
          {
            "qId": "1A2",
            "marks": 1,
            "text": "Identify the valid identifier in Python from the following: 2ndName, _score, for, pass$word",
            "solution": "_score (identifiers can begin with an underscore, cannot begin with a digit, and cannot be keywords or contain special symbols).\n[Marking Scheme: 1 mark for _score.]"
          },
          {
            "qId": "1A3",
            "marks": 1,
            "text": "Assertion (A): Dictionaries in Python are mutable.\nReason (R): Dictionary keys must be of immutable types.\nSelect the correct option:",
            "solution": "Both A and R are true, but R is NOT the correct explanation of A.\n[Marking Scheme: 1 mark for identifying both true, but R does not explain why the dictionary itself is mutable.]"
          },
          {
            "qId": "1A4",
            "marks": 1,
            "text": "Which Python module must be imported to serialize and deserialize objects into a binary file?",
            "solution": "pickle module.\n[Marking Scheme: 1 mark for pickle.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "1B1",
            "marks": 2,
            "text": "Rewrite the following Python code after removing all syntax errors. Underline each correction:\nDef Check(Num)\n    If Num % 2 = 0\n        Print(\"Even\")",
            "solution": "def Check(Num):               # Error 1: 'Def' -> 'def', missing colon (:)\n    if Num % 2 == 0:          # Error 2: 'If' -> 'if', '=' -> '==', missing colon (:)\n        print(\"Even\")         # Error 3: 'Print' -> 'print'\n[Marking Scheme: 0.5 mark for each corrected error, max 2 marks.]"
          },
          {
            "qId": "1B2",
            "marks": 2,
            "text": "Find and write the output of the following Python code:\ndef fun(s):\n    k = len(s)\n    m = \"\"\n    for i in range(0, k):\n        if s[i].isupper():\n            m = m + s[i].lower()\n        elif s[i].isalpha():\n            m = m + s[i].upper()\n        else:\n            m = m + \"#\"\n    print(m)\nfun(\"School@2026\")",
            "solution": "sCHOOL##2026\n[Marking Scheme: 2 marks for exact output. 1 mark if partial case conversion is correct.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1C1",
            "marks": 3,
            "text": "Write a function 'count_vowels_words()' in Python that reads a text file 'story.txt' and counts the number of words that start with a vowel (A, E, I, O, U, a, e, i, o, u).",
            "solution": "def count_vowels_words():\n    vowels = ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U')\n    count = 0\n    with open('story.txt', 'r') as f:\n        words = f.read().split()\n        for w in words:\n            if w[0] in vowels:\n                count += 1\n    print(\"Total words starting with vowel:\", count)\n[Marking Scheme: 1 mark for opening file & read, 1 mark for vowel check on w[0], 1 mark for count & print.]"
          },
          {
            "qId": "1C2",
            "marks": 3,
            "text": "Write functions in Python to implement a Stack containing Student Book details [BookNo, BookTitle]:\n(i) Push_Book(Stk, Book): to add a book list to the stack.\n(ii) Pop_Book(Stk): to remove and return a book from the stack, or display 'Underflow' if empty.",
            "solution": "def Push_Book(Stk, Book):\n    Stk.append(Book)\n\ndef Pop_Book(Stk):\n    if len(Stk) == 0:\n        print(\"Underflow\")\n        return None\n    else:\n        return Stk.pop()\n[Marking Scheme: 1.5 marks for Push_Book, 1.5 marks for Pop_Book with Underflow check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1D1",
            "marks": 6,
            "text": "A pharmaceutical company 'MediCorp' has 4 blocks on its campus: Admin Block (25m, 120 computers), Lab Block (40m, 40 computers), Accounts Block (90m, 25 computers), and Warehouse (150m, 15 computers).\nDistances: Admin-Lab = 40m, Admin-Accounts = 90m, Admin-Warehouse = 150m, Lab-Accounts = 60m, Lab-Warehouse = 110m, Accounts-Warehouse = 80m.\n(a) Suggest the most suitable block to install the server and give reason.\n(b) Suggest the best cable layout topology to connect all four blocks.\n(c) Name the transmission medium that provides the highest data transfer speed between blocks.\n(d) Where should repeaters and switches/hubs be installed?\n(e) Which network device should be installed to connect the campus LAN to the Internet?\n(f) What type of network is formed within this campus (LAN, MAN, WAN)?",
            "solution": "(a) Admin Block: It has the maximum number of computers (120), following the 80-20 rule to minimize network traffic.\n(b) Star Topology: Connect each other block directly to the central Admin Block.\n(c) Optical Fiber Cable (Fiber Optic).\n(d) Switches/Hubs: Inside EVERY block. Repeater: Between Admin and Warehouse (150m > 70m) and Admin and Accounts (90m > 70m).\n(e) Router (or Modem/Gateway).\n(f) LAN (Local Area Network).\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Pre-Board Simulation: Python Revision & SQL Relational Queries",
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
            "text": "What is the output of 'print([1, 2, 3] * 2)' in Python?",
            "solution": "[1, 2, 3, 1, 2, 3] (list repetition).\n[Marking Scheme: 1 mark for [1, 2, 3, 1, 2, 3].]"
          },
          {
            "qId": "2A2",
            "marks": 1,
            "text": "Which SQL clause is used to sort the result set in descending order?",
            "solution": "ORDER BY column_name DESC;\n[Marking Scheme: 1 mark for ORDER BY ... DESC.]"
          },
          {
            "qId": "2A3",
            "marks": 1,
            "text": "What does the csv.writer() method return in Python?",
            "solution": "A writer object responsible for converting user data into delimited strings on the given file.\n[Marking Scheme: 1 mark for writer object.]"
          },
          {
            "qId": "2A4",
            "marks": 1,
            "text": "What is the degree of a relation having 6 columns and 15 rows?",
            "solution": "Degree = 6 (Degree represents the number of attributes/columns).\n[Marking Scheme: 1 mark for 6.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "2B1",
            "marks": 2,
            "text": "Differentiate between actual parameters and formal parameters with a Python code example.",
            "solution": "1. Formal parameters: Variables defined in the function header (e.g. def add(a, b):)\n2. Actual parameters: Values or variables passed to the function in the call statement (e.g. add(10, 20))\n[Marking Scheme: 1 mark for definition/distinction, 1 mark for code example.]"
          },
          {
            "qId": "2B2",
            "marks": 2,
            "text": "Find the possible outputs of the following code from the given options:\nimport random\nColor = [\"RED\", \"GREEN\", \"BLUE\", \"YELLOW\"]\nBEGIN = random.randint(1, 2)\nEND = random.randint(BEGIN, 3)\nfor i in range(BEGIN, END + 1):\n    print(Color[i], end=\"*\")\nOptions: (i) GREEN*BLUE* (ii) RED*GREEN* (iii) GREEN*BLUE*YELLOW* (iv) BLUE*YELLOW*",
            "solution": "Options (i), (iii), and (iv) are possible.\nBEGIN can be 1 or 2. If BEGIN=1, END can be 1, 2, 3 (GREEN*, GREEN*BLUE*, GREEN*BLUE*YELLOW*). If BEGIN=2, END can be 2, 3 (BLUE*, BLUE*YELLOW*).\nOption (ii) is NOT possible because BEGIN starts at minimum 1 (GREEN), never 0 (RED).\n[Marking Scheme: 2 marks for correct identification of possible outputs.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2C1",
            "marks": 3,
            "text": "Write a function 'update_binary_marks(roll, new_marks)' in Python to update the Marks of a student in a binary file 'student.dat' containing records in format [RollNo, SName, Marks].",
            "solution": "import pickle\n\ndef update_binary_marks(roll, new_marks):\n    found = False\n    with open('student.dat', 'rb+') as f:\n        try:\n            while True:\n                pos = f.tell()\n                rec = pickle.load(f)\n                if rec[0] == roll:\n                    rec[2] = new_marks\n                    f.seek(pos)\n                    pickle.dump(rec, f)\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if found:\n        print(\"Record updated!\")\n    else:\n        print(\"Roll number not found!\")\n[Marking Scheme: 1 mark for file open & loop, 1 mark for f.tell() and f.seek(pos) update, 1 mark for found feedback.]"
          },
          {
            "qId": "2C2",
            "marks": 3,
            "text": "Write a function 'filter_csv_salary()' that reads 'employees.csv' and displays the Name and Salary of all employees whose Salary is greater than 60,000.",
            "solution": "import csv\n\ndef filter_csv_salary():\n    with open('employees.csv', 'r') as f:\n        reader = csv.reader(f)\n        header = next(reader)  # Skip header\n        for row in reader:\n            if float(row[2]) > 60000:\n                print(f\"{row[0]:<20}{row[2]}\")\n[Marking Scheme: 1 mark for open & csv.reader, 1 mark for condition float(row[2]) > 60000, 1 mark for output.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2D1",
            "marks": 6,
            "text": "Tables: HOSPITAL (PId INT, PName VARCHAR(30), Dept VARCHAR(20), DateOfAdm DATE, Charges DECIMAL(8,2))\nand DOCTOR (Dept VARCHAR(20), DocName VARCHAR(30), OPD_Days VARCHAR(20))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display PName and Charges of all patients in 'ENT' department.\n(b) Display all patients admitted after '2023-06-01' sorted by Charges descending.\n(c) Display Dept and average Charges in each department.\n(d) Display PName, Dept, and DocName using an equi-join.\n(e) Increase Charges by 10% for patients in 'ICU'.\n(f) What is the output of: SELECT Dept, COUNT(*) FROM HOSPITAL GROUP BY Dept HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT PName, Charges FROM HOSPITAL WHERE Dept = 'ENT';\n(b) SELECT * FROM HOSPITAL WHERE DateOfAdm > '2023-06-01' ORDER BY Charges DESC;\n(c) SELECT Dept, AVG(Charges) FROM HOSPITAL GROUP BY Dept;\n(d) SELECT H.PName, H.Dept, D.DocName FROM HOSPITAL H, DOCTOR D WHERE H.Dept = D.Dept;\n(e) UPDATE HOSPITAL SET Charges = Charges * 1.10 WHERE Dept = 'ICU';\n(f) Displays each Dept and number of patients in that department for departments with at least 2 admitted patients.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: HOTS Focus: Stack Applications & Network Security",
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
            "text": "What protocol is used to transfer web pages securely using encryption?",
            "solution": "HTTPS (HyperText Transfer Protocol Secure).\n[Marking Scheme: 1 mark for HTTPS.]"
          },
          {
            "qId": "3A2",
            "marks": 1,
            "text": "What is the output of: print('Hello'[-1:-4:-1])?",
            "solution": "oll (string slicing with negative step: index -1='o', -2='l', -3='l').\n[Marking Scheme: 1 mark for 'oll'.]"
          },
          {
            "qId": "3A3",
            "marks": 1,
            "text": "What does the expression 'COUNT(*)' return in SQL?",
            "solution": "Total number of rows in the table/result set including rows with NULL values.\n[Marking Scheme: 1 mark for total rows including NULL.]"
          },
          {
            "qId": "3A4",
            "marks": 1,
            "text": "Which Python function removes and returns the last element of a list?",
            "solution": "list.pop()\n[Marking Scheme: 1 mark for pop().]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "3B1",
            "marks": 2,
            "text": "Explain the difference between a Worm and a Trojan Horse in cyber security.",
            "solution": "1. Worm: A self-replicating malicious program that spreads across networks without needing a host program or human action.\n2. Trojan Horse: Disguises itself as legitimate/useful software but contains hidden malicious payloads; it does NOT self-replicate.\n[Marking Scheme: 1 mark for Worm, 1 mark for Trojan Horse.]"
          },
          {
            "qId": "3B2",
            "marks": 2,
            "text": "Find the output of the following Python code:\nd = {'A': 10, 'B': 20, 'C': 30}\nfor k in d:\n    d[k] = d[k] * 2\nprint(d.get('B', 0), d.get('D', 100))",
            "solution": "40 100\n[Marking Scheme: 1 mark for 40, 1 mark for 100.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3C1",
            "marks": 3,
            "text": "Write a function 'Push_Even(Stk, Nums)' in Python that takes a list of integers 'Nums' and pushes only even numbers onto the stack 'Stk'. Also write 'Pop_Even(Stk)'.",
            "solution": "def Push_Even(Stk, Nums):\n    for n in Nums:\n        if n % 2 == 0:\n            Stk.append(n)\n\ndef Pop_Even(Stk):\n    if not Stk:\n        print(\"Stack Empty\")\n    else:\n        return Stk.pop()\n[Marking Scheme: 1.5 marks for Push_Even, 1.5 marks for Pop_Even with empty check.]"
          },
          {
            "qId": "3C2",
            "marks": 3,
            "text": "Write a Python function 'copy_lines_without_hash()' that reads 'source.txt' and copies all lines that do NOT start with '#' into 'target.txt'.",
            "solution": "def copy_lines_without_hash():\n    with open('source.txt', 'r') as fin, open('target.txt', 'w') as fout:\n        for line in fin:\n            if not line.strip().startswith('#'):\n                fout.write(line)\n    print(\"Lines copied successfully!\")\n[Marking Scheme: 1 mark for opening both files, 1 mark for startswith('#') check, 1 mark for writing and closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3D1",
            "marks": 6,
            "text": "Tables: STORE (ItemCode INT, ItemName VARCHAR(30), Category VARCHAR(20), Price INT, SuppId INT)\nand SUPPLIER (SuppId INT, SuppName VARCHAR(30), City VARCHAR(20))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display ItemName and Price of items in Category 'Stationery' with Price < 100.\n(b) Display all items whose ItemName starts with 'P' and has at least 5 letters.\n(c) Display Category and total stock value (SUM(Price)) for each category.\n(d) Display ItemName, Price, and SuppName using an equi-join.\n(e) Delete items whose Price is NULL.\n(f) What is the output of: SELECT SuppName, COUNT(ItemCode) FROM STORE S, SUPPLIER P WHERE S.SuppId = P.SuppId GROUP BY P.SuppId, P.SuppName HAVING COUNT(ItemCode) > 1;",
            "solution": "(a) SELECT ItemName, Price FROM STORE WHERE Category = 'Stationery' AND Price < 100;\n(b) SELECT * FROM STORE WHERE ItemName LIKE 'P____%';\n(c) SELECT Category, SUM(Price) FROM STORE GROUP BY Category;\n(d) SELECT S.ItemName, S.Price, P.SuppName FROM STORE S, SUPPLIER P WHERE S.SuppId = P.SuppId;\n(e) DELETE FROM STORE WHERE Price IS NULL;\n(f) Displays each supplier name and the count of items supplied by them, only for suppliers supplying more than 1 item.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Full Syllabus Simulation: File Handling & Python-MySQL",
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
            "text": "What is the return type of cursor.fetchall() in mysql.connector?",
            "solution": "A list of tuples.\n[Marking Scheme: 1 mark for list of tuples.]"
          },
          {
            "qId": "4A2",
            "marks": 1,
            "text": "Which built-in Python function returns the length of a string, list, or dictionary?",
            "solution": "len()\n[Marking Scheme: 1 mark for len().]"
          },
          {
            "qId": "4A3",
            "marks": 1,
            "text": "In a binary file, what does f.seek(0, 2) do?",
            "solution": "Moves the file pointer to the very end of the file (0 bytes from end).\n[Marking Scheme: 1 mark for moving pointer to end of file.]"
          },
          {
            "qId": "4A4",
            "marks": 1,
            "text": "Which topology connects all nodes to a central device such as a hub or switch?",
            "solution": "Star Topology.\n[Marking Scheme: 1 mark for Star Topology.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "4B1",
            "marks": 2,
            "text": "What will be the output of the following code?\ndef change(lst):\n    for i in range(len(lst)):\n        if lst[i] % 5 == 0:\n            lst[i] //= 5\n        else:\n            lst[i] *= 2\nL = [10, 13, 25, 18]\nchange(L)\nprint(L)",
            "solution": "[2, 26, 5, 36]\n[Marking Scheme: 2 marks for exact list [2, 26, 5, 36].]"
          },
          {
            "qId": "4B2",
            "marks": 2,
            "text": "Differentiate between a Candidate Key and a Primary Key in DBMS.",
            "solution": "1. Candidate Key: Any attribute (or set of attributes) capable of uniquely identifying a tuple in a relation.\n2. Primary Key: The single candidate key chosen by the database designer to uniquely identify tuples in the table.\n[Marking Scheme: 1 mark for Candidate Key, 1 mark for Primary Key.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4C1",
            "marks": 3,
            "text": "Write a Python function 'insert_book(bid, title, price)' that connects to database 'LibraryDB' and inserts a new record into table 'Book' using parameterized '%s' placeholders and commits the transaction.",
            "solution": "import mysql.connector\n\ndef insert_book(bid, title, price):\n    con = mysql.connector.connect(host='localhost', user='root', password='tiger', database='LibraryDB')\n    cur = con.cursor()\n    query = \"INSERT INTO Book VALUES (%s, %s, %s);\"\n    cur.execute(query, (bid, title, price))\n    con.commit()\n    print(\"Book enrolled!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for execute with parameters & commit, 1 mark for closing.]"
          },
          {
            "qId": "4C2",
            "marks": 3,
            "text": "Write a function 'search_binary_emp(eid)' that searches for an employee in binary file 'emp.dat' containing [EmpId, EName, Salary] and prints their details if found.",
            "solution": "import pickle\n\ndef search_binary_emp(eid):\n    found = False\n    with open('emp.dat', 'rb') as f:\n        try:\n            while True:\n                rec = pickle.load(f)\n                if rec[0] == eid:\n                    print(f\"EmpId: {rec[0]}, Name: {rec[1]}, Salary: {rec[2]}\")\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print(\"Employee ID not found!\")\n[Marking Scheme: 1 mark for open & while loop with EOFError, 1 mark for search match and print, 1 mark for not found.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4D1",
            "marks": 6,
            "text": "Table: EMPLOYEE (EmpId INT, EName VARCHAR(30), Dept VARCHAR(20), Salary INT, Commission INT)\nand DEPARTMENT (Dept VARCHAR(20), Manager VARCHAR(30), Location VARCHAR(20))\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display EName and Salary of employees where Commission IS NOT NULL.\n(b) Display all employees whose name contains 'an' and Salary >= 50000.\n(c) Display Dept and highest Salary paid in each department.\n(d) Display EName, Dept, and Location using an equi-join.\n(e) Update Commission to 1500 for all employees in 'Sales' whose Commission is NULL.\n(f) What is the output of: SELECT Dept, AVG(Salary) FROM EMPLOYEE GROUP BY Dept HAVING AVG(Salary) > 55000;",
            "solution": "(a) SELECT EName, Salary FROM EMPLOYEE WHERE Commission IS NOT NULL;\n(b) SELECT * FROM EMPLOYEE WHERE EName LIKE '%an%' AND Salary >= 50000;\n(c) SELECT Dept, MAX(Salary) FROM EMPLOYEE GROUP BY Dept;\n(d) SELECT E.EName, E.Dept, D.Location FROM EMPLOYEE E, DEPARTMENT D WHERE E.Dept = D.Dept;\n(e) UPDATE EMPLOYEE SET Commission = 1500 WHERE Dept = 'Sales' AND Commission IS NULL;\n(f) Displays Dept and average salary only for departments where average salary exceeds 55000.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: KVS Pre-Board Replica: Functions, Stack & Cyber Safety",
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
            "text": "Which of the following is an immutable data type in Python? (a) list (b) dict (c) tuple (d) set",
            "solution": "(c) tuple.\n[Marking Scheme: 1 mark for tuple.]"
          },
          {
            "qId": "5A2",
            "marks": 1,
            "text": "Which protocol is used for sending emails over the Internet?",
            "solution": "SMTP (Simple Mail Transfer Protocol).\n[Marking Scheme: 1 mark for SMTP.]"
          },
          {
            "qId": "5A3",
            "marks": 1,
            "text": "What does the method cursor.execute() do in Python-MySQL connectivity?",
            "solution": "Compiles and executes the specified SQL statement on the database server.\n[Marking Scheme: 1 mark for executing SQL statement.]"
          },
          {
            "qId": "5A4",
            "marks": 1,
            "text": "What does HTML stand for?",
            "solution": "HyperText Markup Language.\n[Marking Scheme: 1 mark for HyperText Markup Language.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "5B1",
            "marks": 2,
            "text": "Differentiate between Phishing and Spoofing.",
            "solution": "1. Phishing: Fraudulent attempts to obtain sensitive information (passwords, credit card numbers) by disguising as a trustworthy entity via deceptive emails/links.\n2. Spoofing: An attack where an impersonator disguises identity (IP, email header, MAC address) to gain unauthorized access.\n[Marking Scheme: 1 mark for Phishing, 1 mark for Spoofing.]"
          },
          {
            "qId": "5B2",
            "marks": 2,
            "text": "Find the output of the following Python code:\ndef show(x, y=10):\n    x = x + y\n    y = x - y\n    print(x, y)\nshow(20)\nshow(15, 5)",
            "solution": "30 20\n20 15\n[Marking Scheme: 1 mark for each line of output.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5C1",
            "marks": 3,
            "text": "Write functions in Python to implement a stack of Customer dictionaries {'CustId': int, 'CustName': str}:\n(i) Push_Customer(Stk, Cust)\n(ii) Pop_Customer(Stk)",
            "solution": "def Push_Customer(Stk, Cust):\n    Stk.append(Cust)\n\ndef Pop_Customer(Stk):\n    if len(Stk) == 0:\n        print(\"Stack is Empty (Underflow)\")\n        return None\n    else:\n        return Stk.pop()\n[Marking Scheme: 1.5 marks for Push, 1.5 marks for Pop with underflow check.]"
          },
          {
            "qId": "5C2",
            "marks": 3,
            "text": "Write a function 'count_words_containing_ing()' in Python that reads 'notes.txt' and counts all words that end with 'ing' (case-insensitive).",
            "solution": "def count_words_containing_ing():\n    count = 0\n    with open('notes.txt', 'r') as f:\n        words = f.read().split()\n        for w in words:\n            if w.lower().endswith('ing'):\n                count += 1\n    print(\"Words ending with 'ing':\", count)\n[Marking Scheme: 1 mark for open & split, 1 mark for endswith('ing') check, 1 mark for count & print.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5D1",
            "marks": 6,
            "text": "A school campus consists of 4 blocks: Primary Block (80 computers), Middle Block (30 computers), Senior Block (110 computers), and Admin Office (15 computers).\nDistances: Senior-Primary = 50m, Senior-Middle = 75m, Senior-Admin = 120m, Primary-Middle = 40m, Primary-Admin = 95m, Middle-Admin = 60m.\n(a) Suggest the block where the server should be installed with reason.\n(b) Suggest the cable layout topology to connect all four blocks.\n(c) Name the device required inside each block to connect client computers together.\n(d) Where should repeaters be installed?\n(e) Which wired medium provides broadband connectivity to external branches across town?\n(f) What security hardware/software should be installed to protect the school network from unauthorized internet access?",
            "solution": "(a) Senior Block: Has maximum computers (110), minimizing cross-network traffic (80-20 rule).\n(b) Star Topology: Connect Primary, Middle, and Admin directly to Senior Block.\n(c) Switch (or Hub).\n(d) Repeaters: Between Senior and Admin (120m > 70m).\n(e) Optical Fiber Cable (or Leased Line).\n(f) Firewall (Hardware / Software firewall).\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: APS Pre-Board Replica: Output Analysis & Binary File CRUD",
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
            "text": "Which Python function from the pickle module serializes an object hierarchy to a file?",
            "solution": "pickle.dump(object, file)\n[Marking Scheme: 1 mark for pickle.dump().]"
          },
          {
            "qId": "6A2",
            "marks": 1,
            "text": "What is the result of evaluating 'bool(\"\")' in Python?",
            "solution": "False (empty string evaluates to False in boolean context).\n[Marking Scheme: 1 mark for False.]"
          },
          {
            "qId": "6A3",
            "marks": 1,
            "text": "In SQL, which keyword is used to eliminate duplicate rows from a query result?",
            "solution": "DISTINCT\n[Marking Scheme: 1 mark for DISTINCT.]"
          },
          {
            "qId": "6A4",
            "marks": 1,
            "text": "Which device modulates digital signals into analog signals for telephone line transmission?",
            "solution": "Modem (Modulator-Demodulator).\n[Marking Scheme: 1 mark for Modem.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "6B1",
            "marks": 2,
            "text": "Find the output of the following Python code:\ns = \"Exam@2026\"\nm = \"\"\nfor i in range(len(s)):\n    if s[i].isdigit():\n        m += str((int(s[i]) + 1) % 10)\n    elif s[i].isupper():\n        m += s[i].lower()\n    else:\n        m += \"*\"\nprint(m)",
            "solution": "e***3137\n[Marking Scheme: 2 marks for exact output.]"
          },
          {
            "qId": "6B2",
            "marks": 2,
            "text": "Differentiate between text file and binary file in Python.",
            "solution": "1. Text File: Stores data as plain characters/strings with end-of-line translations (e.g. \\n to \\r\\n). Open with 'r', 'w'.\n2. Binary File: Stores data in raw bytes exactly as represented in memory (no translations). Open with 'rb', 'wb'.\n[Marking Scheme: 1 mark for text file, 1 mark for binary file.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6C1",
            "marks": 3,
            "text": "Write a function 'search_binary_student(roll)' in Python to search for a student by RollNo in 'student.dat' and display Name and Marks. If not found, display 'Student Not Found'.",
            "solution": "import pickle\n\ndef search_binary_student(roll):\n    found = False\n    with open('student.dat', 'rb') as f:\n        try:\n            while True:\n                r = pickle.load(f)\n                if r[0] == roll:\n                    print(f\"Found: Name={r[1]}, Marks={r[2]}\")\n                    found = True\n                    break\n        except EOFError:\n            pass\n    if not found:\n        print(\"Student Not Found\")\n[Marking Scheme: 1 mark for open & while True with EOFError, 1 mark for roll matching & print, 1 mark for not found.]"
          },
          {
            "qId": "6C2",
            "marks": 3,
            "text": "Write a function 'count_upper_lines()' in Python to count and display the number of lines in a text file 'data.txt' that begin with an uppercase alphabet.",
            "solution": "def count_upper_lines():\n    count = 0\n    with open('data.txt', 'r') as f:\n        for line in f:\n            stripped = line.strip()\n            if stripped and stripped[0].isupper():\n                count += 1\n    print(\"Lines starting with uppercase:\", count)\n[Marking Scheme: 1 mark for open & line loop, 1 mark for stripped[0].isupper() check, 1 mark for count & print.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6D1",
            "marks": 6,
            "text": "Table: FLIGHT (FlightNo VARCHAR(10), Airline VARCHAR(20), Origin VARCHAR(20), Dest VARCHAR(20), Fare INT)\nand PILOT (FlightNo VARCHAR(10), PilotName VARCHAR(30), Experience INT)\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display FlightNo, Origin, and Dest for flights with Fare between 3000 and 7000.\n(b) Display all flights departing from 'Kolkata' operated by 'IndiGo'.\n(c) Display Airline and average Fare for each airline.\n(d) Display FlightNo, Airline, and PilotName using an equi-join.\n(e) Increase Fare by 500 for flights flying to 'Delhi'.\n(f) What is the output of: SELECT Origin, COUNT(*) FROM FLIGHT GROUP BY Origin HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT FlightNo, Origin, Dest FROM FLIGHT WHERE Fare BETWEEN 3000 AND 7000;\n(b) SELECT * FROM FLIGHT WHERE Origin = 'Kolkata' AND Airline = 'IndiGo';\n(c) SELECT Airline, AVG(Fare) FROM FLIGHT GROUP BY Airline;\n(d) SELECT F.FlightNo, F.Airline, P.PilotName FROM FLIGHT F, PILOT P WHERE F.FlightNo = P.FlightNo;\n(e) UPDATE FLIGHT SET Fare = Fare + 500 WHERE Dest = 'Delhi';\n(f) Displays each Origin and count of departing flights for origins with 2 or more departing flights.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: National Board Simulation: CSV Processing & SQL Joins",
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
            "text": "What does the 'with open(...) as f:' construct in Python guarantee?",
            "solution": "Automatic resource management (the file is guaranteed to be closed even if exceptions occur).\n[Marking Scheme: 1 mark for automatic file closing.]"
          },
          {
            "qId": "7A2",
            "marks": 1,
            "text": "What is the cardinality of a relation having 4 columns and 20 rows?",
            "solution": "Cardinality = 20 (Cardinality is the total number of tuples/rows).\n[Marking Scheme: 1 mark for 20.]"
          },
          {
            "qId": "7A3",
            "marks": 1,
            "text": "Which SQL operator checks for pattern matching using wildcard symbols % and _?",
            "solution": "The LIKE operator.\n[Marking Scheme: 1 mark for LIKE.]"
          },
          {
            "qId": "7A4",
            "marks": 1,
            "text": "Which transmission medium uses light pulses to transmit data through thin glass strands?",
            "solution": "Optical Fiber Cable.\n[Marking Scheme: 1 mark for Optical Fiber.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "7B1",
            "marks": 2,
            "text": "Explain the difference between write() and writelines() methods in Python file handling.",
            "solution": "1. write(string): Writes a single string to the file.\n2. writelines(list_of_strings): Writes a list/sequence of strings to the file without adding extra line breaks.\n[Marking Scheme: 1 mark for write, 1 mark for writelines.]"
          },
          {
            "qId": "7B2",
            "marks": 2,
            "text": "Find the output of the following Python code:\ndef calc(a, b=5):\n    return a * 2 + b\nprint(calc(10))\nprint(calc(4, 2))",
            "solution": "25\n10\n[Marking Scheme: 1 mark for 25, 1 mark for 10.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7C1",
            "marks": 3,
            "text": "Write a function 'add_member_csv(mid, name, plan)' that appends a new member record to a CSV file 'members.csv'. Ensure proper handling of newline.",
            "solution": "import csv\n\ndef add_member_csv(mid, name, plan):\n    with open('members.csv', 'a', newline='') as f:\n        writer = csv.writer(f)\n        writer.writerow([mid, name, plan])\n    print(\"Member record appended!\")\n[Marking Scheme: 1 mark for open with 'a' and newline='', 1 mark for csv.writer & writerow(), 1 mark for clean closing.]"
          },
          {
            "qId": "7C2",
            "marks": 3,
            "text": "Write a function 'Push_3Multiple(Stk, Arr)' that takes a list of integers 'Arr' and pushes all numbers that are divisible by 3 onto the stack 'Stk'. Also write 'Pop_Element(Stk)'.",
            "solution": "def Push_3Multiple(Stk, Arr):\n    for num in Arr:\n        if num % 3 == 0:\n            Stk.append(num)\n\ndef Pop_Element(Stk):\n    if not Stk:\n        print(\"Empty Stack\")\n    else:\n        return Stk.pop()\n[Marking Scheme: 1.5 marks for Push_3Multiple, 1.5 marks for Pop_Element with empty check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7D1",
            "marks": 6,
            "text": "Table: STUDENT (RollNo INT, Name VARCHAR(30), StreamId INT, Marks DECIMAL(5,2))\nand STREAM (StreamId INT, StreamName VARCHAR(20), TeacherIncharge VARCHAR(30))\nWrite SQL statements for (a) to (e) and explain output for (f):\n(a) Display Name and Marks of students in StreamId 101 with Marks >= 80.\n(b) Display all students whose Name ends with 'Roy'.\n(c) Display StreamName and count of students enrolled in each stream.\n(d) Display Name, StreamName, and TeacherIncharge using an equi-join.\n(e) Delete students whose Marks IS NULL.\n(f) What is the output of: SELECT StreamId, AVG(Marks) FROM STUDENT GROUP BY StreamId HAVING AVG(Marks) > 75;",
            "solution": "(a) SELECT Name, Marks FROM STUDENT WHERE StreamId = 101 AND Marks >= 80;\n(b) SELECT * FROM STUDENT WHERE Name LIKE '%Roy';\n(c) SELECT T.StreamName, COUNT(S.RollNo) FROM STUDENT S, STREAM T WHERE S.StreamId = T.StreamId GROUP BY T.StreamId, T.StreamName;\n(d) SELECT S.Name, T.StreamName, T.TeacherIncharge FROM STUDENT S, STREAM T WHERE S.StreamId = T.StreamId;\n(e) DELETE FROM STUDENT WHERE Marks IS NULL;\n(f) Displays StreamId and average marks for streams having an average score strictly above 75.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Full Board Mock: Recursion, Web Protocols & RDBMS Integrity",
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
            "text": "Which SQL constraint ensures that all values in a column are distinct and not empty?",
            "solution": "PRIMARY KEY (combines UNIQUE and NOT NULL).\n[Marking Scheme: 1 mark for PRIMARY KEY.]"
          },
          {
            "qId": "8A2",
            "marks": 1,
            "text": "What is the default mode when opening a file using Python open()?",
            "solution": "'r' (read mode in text format).\n[Marking Scheme: 1 mark for 'r'.]"
          },
          {
            "qId": "8A3",
            "marks": 1,
            "text": "Which network device amplifies and regenerates attenuated signals over long distances?",
            "solution": "Repeater.\n[Marking Scheme: 1 mark for Repeater.]"
          },
          {
            "qId": "8A4",
            "marks": 1,
            "text": "What data structure operates on the Last-In-First-Out (LIFO) principle?",
            "solution": "Stack.\n[Marking Scheme: 1 mark for Stack.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "8B1",
            "marks": 2,
            "text": "Explain the difference between local scope and global scope in Python with a small example.",
            "solution": "1. Local scope: Variables created inside a function; accessible only within that function.\n2. Global scope: Variables created in the main body of the script; accessible throughout the module.\n[Marking Scheme: 1 mark for definitions, 1 mark for example.]"
          },
          {
            "qId": "8B2",
            "marks": 2,
            "text": "Find the output of the following code:\ndef test(p, q=20):\n    p = p + q\n    q = p - q\n    return p * q\nprint(test(10))\nprint(test(5, 5))",
            "solution": "300\n50\n[Marking Scheme: 1 mark for 300, 1 mark for 50.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8C1",
            "marks": 3,
            "text": "Write a function 'count_digits_in_file()' in Python that reads 'report.txt' and counts the total number of digits (0-9) present in the file.",
            "solution": "def count_digits_in_file():\n    count = 0\n    with open('report.txt', 'r') as f:\n        content = f.read()\n        for ch in content:\n            if ch.isdigit():\n                count += 1\n    print(\"Total digits:\", count)\n[Marking Scheme: 1 mark for open & read, 1 mark for ch.isdigit() check, 1 mark for count & print.]"
          },
          {
            "qId": "8C2",
            "marks": 3,
            "text": "Write a function 'Push_Cities(Stk, Cities)' in Python that takes a list of city names 'Cities' and pushes only those cities having more than 5 characters onto the stack 'Stk'.",
            "solution": "def Push_Cities(Stk, Cities):\n    for city in Cities:\n        if len(city) > 5:\n            Stk.append(city)\n\ndef Pop_City(Stk):\n    if not Stk:\n        print(\"Stack Empty\")\n    else:\n        return Stk.pop()\n[Marking Scheme: 1.5 marks for Push_Cities with len > 5, 1.5 marks for Pop_City with underflow check.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8D1",
            "marks": 6,
            "text": "A business organization has 4 blocks: Main Block (90 computers), Tech Block (45 computers), Finance Block (25 computers), and HR Block (15 computers).\nDistances: Main-Tech = 60m, Main-Finance = 110m, Main-HR = 140m, Tech-Finance = 55m, Tech-HR = 85m, Finance-HR = 40m.\n(a) In which block should the server be placed and why?\n(b) Suggest the best topology for interconnecting all four blocks.\n(c) Name the device installed in each block to connect computers locally.\n(d) Where should repeaters be installed?\n(e) Suggest a communication medium for connecting remote branches across the state.\n(f) What service allows employees to access their desktop remotely over the network (e.g. Telnet/SSH)?",
            "solution": "(a) Main Block: It houses the maximum number of computers (90), reducing overall inter-block network traffic.\n(b) Star Topology: Connect Tech, Finance, and HR directly to Main Block.\n(c) Switch (or Hub).\n(d) Repeaters: Between Main and Finance (110m > 70m) and Main and HR (140m > 70m).\n(e) WAN communication medium: Satellite link or Leased Optical Fiber Line.\n(f) SSH (Secure Shell) or Telnet / Remote Desktop.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Pre-Board Countdown: Tracing Tables & Binary File Deletion",
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
            "text": "What does the expression '10 // 3' evaluate to in Python?",
            "solution": "3 (integer floor division).\n[Marking Scheme: 1 mark for 3.]"
          },
          {
            "qId": "9A2",
            "marks": 1,
            "text": "Which SQL command is used to permanently remove a table and its structure from a database?",
            "solution": "DROP TABLE table_name;\n[Marking Scheme: 1 mark for DROP TABLE.]"
          },
          {
            "qId": "9A3",
            "marks": 1,
            "text": "What exception is raised when trying to pop an item from an empty stack in standard terminology?",
            "solution": "Stack Underflow.\n[Marking Scheme: 1 mark for Underflow.]"
          },
          {
            "qId": "9A4",
            "marks": 1,
            "text": "Which protocol is responsible for resolving domain names into IP addresses?",
            "solution": "DNS (Domain Name System).\n[Marking Scheme: 1 mark for DNS.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "9B1",
            "marks": 2,
            "text": "What is the difference between TRUNCATE and DELETE in SQL?",
            "solution": "1. DELETE is a DML command that removes tuples row-by-row and can be filtered with a WHERE clause.\n2. TRUNCATE is a DDL command that rapidly deallocates all table data pages and cannot take a WHERE clause.\n[Marking Scheme: 1 mark for DELETE, 1 mark for TRUNCATE.]"
          },
          {
            "qId": "9B2",
            "marks": 2,
            "text": "Find the output of the following Python code:\ndef scramble(text):\n    out = \"\"\n    for i in range(len(text)):\n        if i % 2 == 0:\n            out += text[i].upper()\n        else:\n            out += text[i].lower()\n    print(out)\nscramble(\"python\")",
            "solution": "PyThOn\n[Marking Scheme: 2 marks for exact output.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9C1",
            "marks": 3,
            "text": "Write a function 'delete_binary_student(roll)' in Python to delete a student record from 'student.dat' using a temporary file strategy.",
            "solution": "import pickle, os\n\ndef delete_binary_student(roll):\n    found = False\n    with open('student.dat', 'rb') as fin, open('temp.dat', 'wb') as fout:\n        try:\n            while True:\n                rec = pickle.load(fin)\n                if rec[0] == roll:\n                    found = True\n                else:\n                    pickle.dump(rec, fout)\n        except EOFError:\n            pass\n    os.remove('student.dat')\n    os.rename('temp.dat', 'student.dat')\n    if found:\n        print(\"Record deleted!\")\n    else:\n        print(\"Roll not found!\")\n[Marking Scheme: 1 mark for open fin and fout, 1 mark for copying non-matching records, 1 mark for remove/rename and feedback.]"
          },
          {
            "qId": "9C2",
            "marks": 3,
            "text": "Write a function 'count_lines_with_this()' in Python that reads 'content.txt' and displays all lines that contain the word 'this' (case-insensitive) along with total count.",
            "solution": "def count_lines_with_this():\n    count = 0\n    with open('content.txt', 'r') as f:\n        for line in f:\n            if 'this' in line.lower():\n                print(line.strip())\n                count += 1\n    print(\"Total matching lines:\", count)\n[Marking Scheme: 1 mark for file open & line loop, 1 mark for 'this' in line.lower() check, 1 mark for count & print.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9D1",
            "marks": 6,
            "text": "Tables: PRODUCT (PCode INT, PName VARCHAR(30), Category VARCHAR(20), Price DECIMAL(8,2))\nand INVENTORY (PCode INT, Stock INT, ReorderLevel INT)\nWrite SQL queries for (a) to (e) and explain output for (f):\n(a) Display PName and Price of products with Price between 500 and 2000.\n(b) Display all products whose Category is either 'Cosmetics' or 'Perfumes'.\n(c) Display Category and average Price in each category.\n(d) Display PName, Category, and Stock using an equi-join.\n(e) Update Price by adding 50 for items with Stock < 10.\n(f) What is the output of: SELECT Category, COUNT(*) FROM PRODUCT GROUP BY Category HAVING COUNT(*) >= 2;",
            "solution": "(a) SELECT PName, Price FROM PRODUCT WHERE Price BETWEEN 500 AND 2000;\n(b) SELECT * FROM PRODUCT WHERE Category IN ('Cosmetics', 'Perfumes');\n(c) SELECT Category, AVG(Price) FROM PRODUCT GROUP BY Category;\n(d) SELECT P.PName, P.Category, I.Stock FROM PRODUCT P, INVENTORY I WHERE P.PCode = I.PCode;\n(e) UPDATE PRODUCT P, INVENTORY I SET P.Price = P.Price + 50 WHERE P.PCode = I.PCode AND I.Stock < 10;\n(f) Displays Category and count of products for categories that have at least 2 distinct products.\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Centum Master Mock: Complete 70-Mark Pre-Board Simulation",
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
            "text": "Which of the following creates an empty set in Python? (a) {} (b) set() (c) [] (d) ()",
            "solution": "(b) set() (empty {} creates an empty dictionary).\n[Marking Scheme: 1 mark for set().]"
          },
          {
            "qId": "10A2",
            "marks": 1,
            "text": "What does the SQL command 'ALTER TABLE' do?",
            "solution": "Modifies the structure/schema of an existing table (add column, drop column, modify data type).\n[Marking Scheme: 1 mark for altering table structure.]"
          },
          {
            "qId": "10A3",
            "marks": 1,
            "text": "In Python-MySQL connectivity, which method is used to retrieve the next single row from the cursor?",
            "solution": "cur.fetchone()\n[Marking Scheme: 1 mark for fetchone().]"
          },
          {
            "qId": "10A4",
            "marks": 1,
            "text": "What is the primary function of a Gateway in computer networking?",
            "solution": "Connects two completely different networks that use different communication protocols.\n[Marking Scheme: 1 mark for protocol conversion / connecting different networks.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "10B1",
            "marks": 2,
            "text": "Find the output of the following Python code:\ndef update_val(x):\n    x[0] = x[0] * 2\n    x.append(50)\nnum = [10, 20, 30]\nupdate_val(num)\nprint(num)",
            "solution": "[20, 20, 30, 50] (lists are mutable; modifications reflect in caller).\n[Marking Scheme: 2 marks for exact output.]"
          },
          {
            "qId": "10B2",
            "marks": 2,
            "text": "Differentiate between a Hub and a Switch in computer networking.",
            "solution": "1. Hub: Broadcasts incoming data packets to ALL connected ports indiscriminately (Layer 1 physical device, collision prone).\n2. Switch: Unicasts data packets specifically to the destination port using MAC address table (Layer 2 intelligent device).\n[Marking Scheme: 1 mark for Hub broadcast, 1 mark for Switch unicast.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10C1",
            "marks": 3,
            "text": "Write functions in Python to implement a stack of Employee IDs [EmpId]:\n(i) Push_Id(Stk, Eid): pushes Eid onto Stk.\n(ii) Pop_Id(Stk): pops and displays the topmost Eid, or displays 'Underflow' if empty.",
            "solution": "def Push_Id(Stk, Eid):\n    Stk.append(Eid)\n\ndef Pop_Id(Stk):\n    if len(Stk) == 0:\n        print(\"Underflow\")\n    else:\n        print(\"Popped ID:\", Stk.pop())\n[Marking Scheme: 1.5 marks for Push_Id, 1.5 marks for Pop_Id with underflow check.]"
          },
          {
            "qId": "10C2",
            "marks": 3,
            "text": "Write a function 'display_long_words()' in Python to read a text file 'essay.txt' and display all words that have more than 6 letters.",
            "solution": "def display_long_words():\n    with open('essay.txt', 'r') as f:\n        words = f.read().split()\n        for w in words:\n            if len(w) > 6:\n                print(w)\n[Marking Scheme: 1 mark for open & split, 1 mark for len(w) > 6 check, 1 mark for print.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10D1",
            "marks": 6,
            "text": "University Campus Layout Problem:\nFour Blocks: Science Block (140 computers), Arts Block (50 computers), Commerce Block (30 computers), and Admin Block (10 computers).\nDistances: Science-Arts = 45m, Science-Commerce = 85m, Science-Admin = 130m, Arts-Commerce = 50m, Arts-Admin = 95m, Commerce-Admin = 60m.\n(a) Where should the main campus server be installed and why?\n(b) Suggest the most suitable cable layout topology.\n(c) What transmission medium should be used to link the blocks for gigabit speeds?\n(d) Where should repeaters and switches be placed?\n(e) Name the network security measure to prevent unauthorized internet infiltration.\n(f) What type of network is created within this 500m campus?",
            "solution": "(a) Science Block: Has the maximum computers (140), minimizing cross-block network traffic (80-20 rule).\n(b) Star Topology: Connect Arts, Commerce, and Admin directly to Science Block.\n(c) Optical Fiber Cable (Fiber Optic).\n(d) Switches: In EVERY block. Repeaters: Between Science and Commerce (85m > 70m) and Science and Admin (130m > 70m).\n(e) Firewall (Hardware / Software firewall).\n(f) LAN (Local Area Network).\n[Marking Scheme: 1 mark for each sub-question (a) to (f). Total 6 marks.]"
          }
        ]
      }
    ]
  }
];
export default samplePaperSets;
