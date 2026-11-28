export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Student Information System & Academic Records",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "1A1",
            "marks": 1,
            "text": "Which method of the connection object is used to create a cursor object in mysql.connector?",
            "solution": "con.cursor() (e.g. cur = con.cursor())\n[Marking Scheme: 1 mark for cursor().]"
          },
          {
            "qId": "1A2",
            "marks": 1,
            "text": "What does cursor.fetchone() return when no more records are available to fetch?",
            "solution": "None.\n[Marking Scheme: 1 mark for None.]"
          },
          {
            "qId": "1A3",
            "marks": 1,
            "text": "Why does an INSERT statement executed via cursor.execute() not reflect in the MySQL table if con.commit() is omitted?",
            "solution": "Because mysql.connector does not autocommit transactions by default; changes remain in uncommitted memory until explicitly committed to disk via con.commit().\n[Marking Scheme: 1 mark for explaining non-autocommit / uncommitted transaction.]"
          },
          {
            "qId": "1A4",
            "marks": 1,
            "text": "Which placeholder character is universally used for parameterized queries in mysql.connector?",
            "solution": "'%s' (percent followed by s).\n[Marking Scheme: 1 mark for '%s'.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "1B1",
            "marks": 2,
            "text": "Differentiate between fetchone() and fetchall() methods of the cursor object.",
            "solution": "1. fetchone(): Returns the next single row as a Python tuple, or None if no rows remain.\n2. fetchall(): Returns all remaining rows as a list of Python tuples, or an empty list [] if no rows remain.\n[Marking Scheme: 1 mark for fetchone, 1 mark for fetchall.]"
          },
          {
            "qId": "1B2",
            "marks": 2,
            "text": "Write a Python code snippet to check whether a database connection named 'mycon' was established successfully, and print an appropriate message.",
            "solution": "if mycon.is_connected():\n    print(\"Database Connection Established Successfully!\")\nelse:\n    print(\"Connection Failed!\")\n[Marking Scheme: 1 mark for is_connected() check, 1 mark for proper if-else logic.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1C1",
            "marks": 3,
            "text": "Write a Python function 'insert_student(roll, name, marks)' that connects to database 'SchoolDB' on localhost as user 'root' with password 'pass123', and inserts a new student record into table 'Student(RollNo, SName, Marks)' using a parameterized query.",
            "solution": "import mysql.connector\n\ndef insert_student(roll, name, marks):\n    con = mysql.connector.connect(host='localhost', user='root', password='pass123', database='SchoolDB')\n    cur = con.cursor()\n    query = \"INSERT INTO Student VALUES (%s, %s, %s);\"\n    cur.execute(query, (roll, name, marks))\n    con.commit()\n    print(\"Student record added successfully!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect(), 1 mark for parameterized execute() and commit(), 1 mark for proper resource closing.]"
          },
          {
            "qId": "1C2",
            "marks": 3,
            "text": "Write a Python function 'display_toppers()' that connects to 'SchoolDB' and displays the RollNo and Name of all students who scored Marks >= 90.0 in a clean tabular format.",
            "solution": "import mysql.connector\n\ndef display_toppers():\n    con = mysql.connector.connect(host='localhost', user='root', password='pass123', database='SchoolDB')\n    cur = con.cursor()\n    cur.execute(\"SELECT RollNo, SName FROM Student WHERE Marks >= 90.0;\")\n    for roll, name in cur.fetchall():\n        print(f\"{roll:<10}{name}\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect & query, 1 mark for fetchall() loop, 1 mark for printing and closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "1D1",
            "marks": 6,
            "text": "Consider a MySQL table 'Student (RollNo INT PRIMARY KEY, SName VARCHAR(30), Stream VARCHAR(15), Marks DECIMAL(5,2))'.\nWrite a complete menu-driven Python program that provides the following operations:\n1. Insert a new student\n2. Display all students belonging to a user-specified Stream\n3. Update Marks of a student given their RollNo\n4. Delete a student record given their RollNo\n5. Exit\nEnsure proper transaction commit, exception handling with mysql.connector.Error, and resource closing.",
            "solution": "import mysql.connector\n\ndef get_connection():\n    return mysql.connector.connect(host='localhost', user='root', password='pass123', database='SchoolDB')\n\ndef insert_student():\n    try:\n        con = get_connection()\n        cur = con.cursor()\n        r = int(input(\"Enter Roll No: \"))\n        n = input(\"Enter Name: \")\n        s = input(\"Enter Stream: \")\n        m = float(input(\"Enter Marks: \"))\n        cur.execute(\"INSERT INTO Student VALUES (%s, %s, %s, %s);\", (r, n, s, m))\n        con.commit()\n        print(\"Record added!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef display_by_stream():\n    con = get_connection()\n    cur = con.cursor()\n    s = input(\"Enter Stream to filter: \")\n    cur.execute(\"SELECT * FROM Student WHERE Stream = %s;\", (s,))\n    rows = cur.fetchall()\n    for row in rows:\n        print(row)\n    cur.close(); con.close()\n\ndef update_marks():\n    con = get_connection()\n    cur = con.cursor()\n    r = int(input(\"Enter Roll No to update: \"))\n    m = float(input(\"Enter New Marks: \"))\n    cur.execute(\"UPDATE Student SET Marks = %s WHERE RollNo = %s;\", (m, r))\n    con.commit()\n    print(\"Marks updated!\")\n    cur.close(); con.close()\n\ndef delete_student():\n    con = get_connection()\n    cur = con.cursor()\n    r = int(input(\"Enter Roll No to delete: \"))\n    cur.execute(\"DELETE FROM Student WHERE RollNo = %s;\", (r,))\n    con.commit()\n    print(\"Record deleted!\")\n    cur.close(); con.close()\n\n# Menu Loop\nwhile True:\n    print(\"\\n1. Insert  2. View by Stream  3. Update Marks  4. Delete  5. Exit\")\n    ch = input(\"Enter choice (1-5): \")\n    if ch == '1': insert_student()\n    elif ch == '2': display_by_stream()\n    elif ch == '3': update_marks()\n    elif ch == '4': delete_student()\n    elif ch == '5': break\n    else: print(\"Invalid choice!\")\n[Marking Scheme: 1 mark for connection helper, 1 mark for insert with commit, 1 mark for query with stream filter, 1 mark for update with commit, 1 mark for delete with commit, 1 mark for menu structure.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: Employee Payroll & HR Management",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "2A1",
            "marks": 1,
            "text": "What is the default TCP port number used by MySQL connector to connect to MySQL Server?",
            "solution": "3306.\n[Marking Scheme: 1 mark for 3306.]"
          },
          {
            "qId": "2A2",
            "marks": 1,
            "text": "What does cursor.rowcount represent after executing an UPDATE query?",
            "solution": "The number of rows that were updated/affected by the UPDATE statement.\n[Marking Scheme: 1 mark for number of affected rows.]"
          },
          {
            "qId": "2A3",
            "marks": 1,
            "text": "Which method is used to undo uncommitted database operations in a transaction?",
            "solution": "con.rollback()\n[Marking Scheme: 1 mark for rollback().]"
          },
          {
            "qId": "2A4",
            "marks": 1,
            "text": "What type of object is returned by cursor.fetchall()?",
            "solution": "A list of tuples.\n[Marking Scheme: 1 mark for list of tuples.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "2B1",
            "marks": 2,
            "text": "Why should SQL queries with user input use parameterized '%s' placeholders rather than Python f-strings or string concatenation?",
            "solution": "To prevent SQL Injection vulnerabilities and ensure that special characters and data types are automatically quoted and escaped by the driver.\n[Marking Scheme: 1 mark for SQL injection prevention, 1 mark for proper escaping/quoting.]"
          },
          {
            "qId": "2B2",
            "marks": 2,
            "text": "What will be the output of the following code if table Employee contains 3 records?\ncur.execute(\"SELECT * FROM Employee;\")\nprint(cur.fetchone())\nprint(len(cur.fetchall()))",
            "solution": "Line 2 prints the first employee tuple: (EmpId, Name, ...)\nLine 3 prints: 2 (because fetchone() already consumed 1 row, leaving 3 - 1 = 2 rows for fetchall()).\n[Marking Scheme: 1 mark for first tuple, 1 mark for 2.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2C1",
            "marks": 3,
            "text": "Write a Python function 'hike_salary(dept, percentage)' that connects to database 'CompanyDB' and increases the salary of all employees in the given department by the specified percentage.",
            "solution": "import mysql.connector\n\ndef hike_salary(dept, percentage):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='CompanyDB')\n    cur = con.cursor()\n    factor = 1 + (percentage / 100)\n    query = \"UPDATE Employee SET Salary = Salary * %s WHERE Dept = %s;\"\n    cur.execute(query, (factor, dept))\n    con.commit()\n    print(f\"{cur.rowcount} employees updated!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for parameterized query with factor, 1 mark for commit and close.]"
          },
          {
            "qId": "2C2",
            "marks": 3,
            "text": "Write a Python function 'count_by_dept()' that displays each department name and the total number of employees working in that department using a GROUP BY query.",
            "solution": "import mysql.connector\n\ndef count_by_dept():\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='CompanyDB')\n    cur = con.cursor()\n    cur.execute(\"SELECT Dept, COUNT(*) FROM Employee GROUP BY Dept;\")\n    for dept, count in cur.fetchall():\n        print(f\"{dept:<15}: {count} employees\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for GROUP BY query execution, 1 mark for iterating and displaying.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "2D1",
            "marks": 6,
            "text": "Write a complete Python script to manage table 'Employee (EmpId INT PRIMARY KEY, EName VARCHAR(30), Dept VARCHAR(20), Salary INT, DOJ DATE)'.\nThe program should:\n(a) Prompt user for EmpId, EName, Dept, Salary, and DOJ, and insert the record.\n(b) Display all employees earning more than 50,000.\n(c) Handle mysql.connector.Error using a try-except block.\n(d) Ensure con.commit() and close both cursor and connection in a finally block.",
            "solution": "import mysql.connector\n\ncon = None\ncur = None\ntry:\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='CompanyDB')\n    cur = con.cursor()\n    \n    # (a) Insert employee\n    eid = int(input(\"Enter EmpId: \"))\n    name = input(\"Enter Name: \")\n    dept = input(\"Enter Dept: \")\n    sal = int(input(\"Enter Salary: \"))\n    doj = input(\"Enter DOJ (YYYY-MM-DD): \")\n    \n    insert_sql = \"INSERT INTO Employee VALUES (%s, %s, %s, %s, %s);\"\n    cur.execute(insert_sql, (eid, name, dept, sal, doj))\n    con.commit()\n    print(\"Employee enrolled successfully!\")\n    \n    # (b) Display employees earning > 50000\n    print(\"\\n--- High Earners (Salary > 50,000) ---\")\n    cur.execute(\"SELECT EmpId, EName, Dept, Salary FROM Employee WHERE Salary > 50000;\")\n    for row in cur.fetchall():\n        print(f\"{row[0]} | {row[1]} | {row[2]} | Rs. {row[3]}\")\n\nexcept mysql.connector.Error as err:\n    print(\"Database Exception Encountered:\", err)\n    if con: con.rollback()\nfinally:\n    if cur: cur.close()\n    if con and con.is_connected(): con.close(); print(\"Connection closed safely.\")\n[Marking Scheme: 2 marks for insert with tuple parameters and commit, 2 marks for query and loop, 1 mark for try-except with rollback, 1 mark for finally resource cleanup.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Retail Supermarket & Inventory Control",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "3A1",
            "marks": 1,
            "text": "Which parameter in mysql.connector.connect() specifies the name of the database to use?",
            "solution": "database (e.g. database='SupermarketDB')\n[Marking Scheme: 1 mark for database.]"
          },
          {
            "qId": "3A2",
            "marks": 1,
            "text": "What does cur.fetchmany(5) return if there are only 3 rows remaining in the cursor?",
            "solution": "A list containing the 3 remaining rows as tuples.\n[Marking Scheme: 1 mark for 3 rows as list of tuples.]"
          },
          {
            "qId": "3A3",
            "marks": 1,
            "text": "True or False: A cursor must be recreated after every single execute() call on the same connection.",
            "solution": "False. The same cursor can be reused to execute multiple sequential queries.\n[Marking Scheme: 1 mark for False.]"
          },
          {
            "qId": "3A4",
            "marks": 1,
            "text": "What exception is raised when database authentication fails due to an incorrect password in mysql.connector?",
            "solution": "mysql.connector.Error (Access denied for user).\n[Marking Scheme: 1 mark for mysql.connector.Error.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "3B1",
            "marks": 2,
            "text": "Explain the difference between executing 'cur.execute(\"SELECT * FROM Item;\")' and executing 'cur.execute(\"DELETE FROM Item WHERE Qty = 0;\")' regarding transaction commit.",
            "solution": "1. The SELECT statement is a read-only query (DQL) and does NOT require con.commit().\n2. The DELETE statement is a data modification command (DML) and MUST be followed by con.commit() to make the deletion permanent.\n[Marking Scheme: 1 mark for SELECT no commit, 1 mark for DELETE requires commit.]"
          },
          {
            "qId": "3B2",
            "marks": 2,
            "text": "Write a Python snippet to iterate directly over a cursor without calling fetchall().",
            "solution": "cur.execute(\"SELECT ItemCode, ItemName, Price FROM Item;\")\nfor row in cur:\n    print(row[0], row[1], row[2])\n[Marking Scheme: 2 marks for 'for row in cur:' loop.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3C1",
            "marks": 3,
            "text": "Write a Python function 'add_stock(icode, added_qty)' that updates the Stock of a product in table 'Item(ItemCode, ItemName, Price, Stock)' by adding the given quantity.",
            "solution": "import mysql.connector\n\ndef add_stock(icode, added_qty):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='StoreDB')\n    cur = con.cursor()\n    query = \"UPDATE Item SET Stock = Stock + %s WHERE ItemCode = %s;\"\n    cur.execute(query, (added_qty, icode))\n    con.commit()\n    print(f\"Stock updated! Rows affected: {cur.rowcount}\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for parameterized UPDATE with commit, 1 mark for closing.]"
          },
          {
            "qId": "3C2",
            "marks": 3,
            "text": "Write a Python function 'display_low_stock(threshold)' that displays the ItemCode, ItemName, and Stock of all items having Stock below the given threshold.",
            "solution": "import mysql.connector\n\ndef display_low_stock(threshold):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='StoreDB')\n    cur = con.cursor()\n    query = \"SELECT ItemCode, ItemName, Stock FROM Item WHERE Stock < %s ORDER BY Stock ASC;\"\n    cur.execute(query, (threshold,))\n    for code, name, qty in cur.fetchall():\n        print(f\"{code:<10}{name:<25}{qty:>5}\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for single-element tuple parameter `(threshold,)`, 1 mark for display loop.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "3D1",
            "marks": 6,
            "text": "Table: ITEM (ItemCode INT PRIMARY KEY, ItemName VARCHAR(30), Category VARCHAR(20), Price DECIMAL(8,2), Stock INT)\nWrite a complete Python script with two functions:\n(a) 'search_item(category)': accepts category name, queries database 'StoreDB', and displays all items in that category.\n(b) 'bulk_discount(category, disc_percent)': applies a discount percentage to the Price of all items in that category, commits transaction, and prints the number of discounted items.\nInclude proper error handling with try-except in both functions.",
            "solution": "import mysql.connector\n\ndef search_item(category):\n    try:\n        con = mysql.connector.connect(host='localhost', user='root', password='password', database='StoreDB')\n        cur = con.cursor()\n        cur.execute(\"SELECT ItemCode, ItemName, Price, Stock FROM ITEM WHERE Category = %s;\", (category,))\n        rows = cur.fetchall()\n        if not rows:\n            print(\"No items found in category:\", category)\n        else:\n            for r in rows:\n                print(f\"Code: {r[0]} | Name: {r[1]} | Price: Rs.{r[2]} | Stock: {r[3]}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Database error:\", err)\n\ndef bulk_discount(category, disc_percent):\n    try:\n        con = mysql.connector.connect(host='localhost', user='root', password='password', database='StoreDB')\n        cur = con.cursor()\n        factor = 1 - (disc_percent / 100)\n        query = \"UPDATE ITEM SET Price = Price * %s WHERE Category = %s;\"\n        cur.execute(query, (factor, category))\n        con.commit()\n        print(f\"Success! {cur.rowcount} items discounted by {disc_percent}%.\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Database error:\", err)\n[Marking Scheme: 3 marks for search_item with error handling and parameterization, 3 marks for bulk_discount with factor calculation, commit, and rowcount.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Airline Flight Schedules & Passenger Bookings",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "4A1",
            "marks": 1,
            "text": "How do you pass a single parameter to a parameterized query in mysql.connector?",
            "solution": "As a single-element tuple with a trailing comma: (value, )\n[Marking Scheme: 1 mark for single-element tuple (val, ).]"
          },
          {
            "qId": "4A2",
            "marks": 1,
            "text": "What is returned by cursor.fetchall() if a query returns 0 rows?",
            "solution": "An empty list: []\n[Marking Scheme: 1 mark for empty list [].]"
          },
          {
            "qId": "4A3",
            "marks": 1,
            "text": "Which method must be called on a connection object to close the socket channel?",
            "solution": "con.close()\n[Marking Scheme: 1 mark for close().]"
          },
          {
            "qId": "4A4",
            "marks": 1,
            "text": "Can cursor.execute() execute a CREATE TABLE statement?",
            "solution": "Yes, cursor.execute() can execute any valid SQL DDL statement.\n[Marking Scheme: 1 mark for Yes.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "4B1",
            "marks": 2,
            "text": "Explain the purpose of the 'finally' block in a database connectivity script.",
            "solution": "The 'finally' block is guaranteed to execute whether an exception occurred or not. It is primarily used to close open cursors and database connections to prevent memory and connection leaks.\n[Marking Scheme: 2 marks for guaranteed execution & resource cleanup explanation.]"
          },
          {
            "qId": "4B2",
            "marks": 2,
            "text": "Write a Python statement to connect to a MySQL server running on port 3307 on the local machine.",
            "solution": "con = mysql.connector.connect(host='localhost', port=3307, user='root', password='tiger', database='AirlinesDB')\n[Marking Scheme: 2 marks for correct port=3307 parameter.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4C1",
            "marks": 3,
            "text": "Write a Python function 'book_ticket(pname, flight_no, fare)' that inserts a new booking record into table 'Booking(PName, FlightNo, Fare)' and displays the generated Ticket ID.",
            "solution": "import mysql.connector\n\ndef book_ticket(pname, flight_no, fare):\n    con = mysql.connector.connect(host='localhost', user='root', password='tiger', database='AirlinesDB')\n    cur = con.cursor()\n    query = \"INSERT INTO Booking (PName, FlightNo, Fare) VALUES (%s, %s, %s);\"\n    cur.execute(query, (pname, flight_no, fare))\n    con.commit()\n    print(\"Ticket booked successfully! Booking ID:\", cur.lastrowid)\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for execute with parameters & commit, 1 mark for closing.]"
          },
          {
            "qId": "4C2",
            "marks": 3,
            "text": "Write a Python function 'search_flights(origin, dest)' that queries table 'Flight' and displays all flights operating between the given origin and destination.",
            "solution": "import mysql.connector\n\ndef search_flights(origin, dest):\n    con = mysql.connector.connect(host='localhost', user='root', password='tiger', database='AirlinesDB')\n    cur = con.cursor()\n    query = \"SELECT FlightNo, Airline, Fare FROM Flight WHERE Origin = %s AND Dest = %s;\"\n    cur.execute(query, (origin, dest))\n    for fno, airline, fare in cur.fetchall():\n        print(f\"{fno} | {airline} | Rs. {fare}\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for parameterized query with tuple (origin, dest), 1 mark for iteration.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "4D1",
            "marks": 6,
            "text": "Table: FLIGHT (FlightNo VARCHAR(10) PRIMARY KEY, Airline VARCHAR(20), Origin VARCHAR(20), Dest VARCHAR(20), Fare INT, Seats INT)\nWrite a complete Python script that:\n(a) Connects to 'AirlinesDB'.\n(b) Defines 'cancel_flight(fno)': deletes the flight and commits.\n(c) Defines 'update_fare(fno, new_fare)': updates the fare and commits.\n(d) Defines 'display_flights_by_airline(airline)': shows all flights for that airline.\n(e) Includes exception handling for database errors.",
            "solution": "import mysql.connector\n\ndef get_connection():\n    return mysql.connector.connect(host='localhost', user='root', password='tiger', database='AirlinesDB')\n\ndef cancel_flight(fno):\n    try:\n        con = get_connection()\n        cur = con.cursor()\n        cur.execute(\"DELETE FROM FLIGHT WHERE FlightNo = %s;\", (fno,))\n        con.commit()\n        print(f\"Flight {fno} cancelled! ({cur.rowcount} row affected)\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef update_fare(fno, new_fare):\n    try:\n        con = get_connection()\n        cur = con.cursor()\n        cur.execute(\"UPDATE FLIGHT SET Fare = %s WHERE FlightNo = %s;\", (new_fare, fno))\n        con.commit()\n        print(\"Fare updated successfully!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef display_flights_by_airline(airline):\n    try:\n        con = get_connection()\n        cur = con.cursor()\n        cur.execute(\"SELECT FlightNo, Origin, Dest, Fare FROM FLIGHT WHERE Airline = %s;\", (airline,))\n        for r in cur.fetchall():\n            print(f\"{r[0]} | {r[1]} -> {r[2]} | Rs. {r[3]}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n[Marking Scheme: 2 marks for cancel_flight with commit, 2 marks for update_fare with commit, 2 marks for display function with tuple parameter.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Banking Operations & Account Management",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "5A1",
            "marks": 1,
            "text": "Which Python statement imports the mysql connector module under the alias 'mycon'?",
            "solution": "import mysql.connector as mycon\n[Marking Scheme: 1 mark for correct import statement.]"
          },
          {
            "qId": "5A2",
            "marks": 1,
            "text": "What is the result of 'cur.execute(\"SELECT * FROM Account;\")' followed by 'row = cur.fetchone()' on row attribute access?",
            "solution": "The returned 'row' is a tuple; attributes are accessed by numerical zero-based index: row[0], row[1], etc.\n[Marking Scheme: 1 mark for tuple and indexing.]"
          },
          {
            "qId": "5A3",
            "marks": 1,
            "text": "Why should you call cur.close() and con.close() after finishing database operations?",
            "solution": "To release server resources, network sockets, and prevent connection pool exhaustion.\n[Marking Scheme: 1 mark for resource release.]"
          },
          {
            "qId": "5A4",
            "marks": 1,
            "text": "What will happen if you attempt to insert a duplicate primary key into a MySQL table using Python?",
            "solution": "mysql.connector raises a mysql.connector.Error with errno 1062 (Duplicate entry).\n[Marking Scheme: 1 mark for raising mysql.connector.Error / Duplicate entry.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "5B1",
            "marks": 2,
            "text": "Explain how transaction rollback works in mysql.connector using try-except.",
            "solution": "When an exception occurs inside the try block during multiple DML operations, calling 'con.rollback()' in the except block reverts all uncommitted modifications, maintaining database integrity (atomicity).\n[Marking Scheme: 2 marks for atomicity and reverting uncommitted changes explanation.]"
          },
          {
            "qId": "5B2",
            "marks": 2,
            "text": "Write a Python snippet to accept account balance from user and find accounts with Balance > user_balance using a parameterized query.",
            "solution": "bal = float(input(\"Enter minimum balance: \"))\ncur.execute(\"SELECT * FROM Account WHERE Balance > %s;\", (bal,))\nfor row in cur.fetchall():\n    print(row)\n[Marking Scheme: 2 marks for `(bal,)` tuple and loop.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5C1",
            "marks": 3,
            "text": "Write a Python function 'deposit(acc_no, amount)' that increases the Balance of the given account in table 'Account(AccNo, CustName, Balance)' and commits the transaction.",
            "solution": "import mysql.connector\n\ndef deposit(acc_no, amount):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='BankDB')\n    cur = con.cursor()\n    cur.execute(\"UPDATE Account SET Balance = Balance + %s WHERE AccNo = %s;\", (amount, acc_no))\n    con.commit()\n    print(f\"Successfully deposited Rs. {amount} to Account {acc_no}!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for UPDATE with tuple (amount, acc_no) & commit, 1 mark for closing.]"
          },
          {
            "qId": "5C2",
            "marks": 3,
            "text": "Write a Python function 'transfer(from_acc, to_acc, amount)' that deducts amount from 'from_acc' and adds it to 'to_acc' inside a single transaction, rolling back if an error occurs.",
            "solution": "import mysql.connector\n\ndef transfer(from_acc, to_acc, amount):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='BankDB')\n    cur = con.cursor()\n    try:\n        cur.execute(\"UPDATE Account SET Balance = Balance - %s WHERE AccNo = %s;\", (amount, from_acc))\n        cur.execute(\"UPDATE Account SET Balance = Balance + %s WHERE AccNo = %s;\", (amount, to_acc))\n        con.commit()\n        print(\"Transfer successful!\")\n    except mysql.connector.Error as err:\n        con.rollback()\n        print(\"Transfer failed, transaction rolled back:\", err)\n    finally:\n        cur.close(); con.close()\n[Marking Scheme: 1 mark for two updates, 1 mark for commit and rollback on error, 1 mark for finally closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "5D1",
            "marks": 6,
            "text": "Table: ACCOUNT (AccNo INT PRIMARY KEY, CustName VARCHAR(30), AccType VARCHAR(15), Balance DECIMAL(12,2))\nWrite a complete menu-driven Python program with functions:\n1. 'open_account()': inserts a new account with validation.\n2. 'check_balance(acc_no)': displays customer name and balance.\n3. 'close_account(acc_no)': deletes account if balance is 0.\n4. 'display_high_value_accounts()': lists accounts with balance >= 100000.\nInclude error handling with mysql.connector.Error.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='BankDB')\n\ndef open_account():\n    try:\n        con = get_con(); cur = con.cursor()\n        ano = int(input(\"Enter AccNo: \"))\n        cname = input(\"Enter CustName: \")\n        atype = input(\"Enter AccType (Savings/Current): \")\n        bal = float(input(\"Enter Initial Balance: \"))\n        cur.execute(\"INSERT INTO ACCOUNT VALUES (%s, %s, %s, %s);\", (ano, cname, atype, bal))\n        con.commit()\n        print(\"Account opened successfully!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Database error:\", err)\n\ndef check_balance(ano):\n    con = get_con(); cur = con.cursor()\n    cur.execute(\"SELECT CustName, Balance FROM ACCOUNT WHERE AccNo = %s;\", (ano,))\n    row = cur.fetchone()\n    if row:\n        print(f\"Customer: {row[0]} | Balance: Rs. {row[1]}\")\n    else:\n        print(\"Account not found!\")\n    cur.close(); con.close()\n\ndef close_account(ano):\n    con = get_con(); cur = con.cursor()\n    cur.execute(\"SELECT Balance FROM ACCOUNT WHERE AccNo = %s;\", (ano,))\n    row = cur.fetchone()\n    if row and row[0] == 0:\n        cur.execute(\"DELETE FROM ACCOUNT WHERE AccNo = %s;\", (ano,))\n        con.commit()\n        print(\"Account closed successfully!\")\n    elif row:\n        print(f\"Cannot close account! Balance is Rs. {row[0]}. Please withdraw funds first.\")\n    else:\n        print(\"Account not found!\")\n    cur.close(); con.close()\n\ndef display_high_value_accounts():\n    con = get_con(); cur = con.cursor()\n    cur.execute(\"SELECT AccNo, CustName, Balance FROM ACCOUNT WHERE Balance >= 100000 ORDER BY Balance DESC;\")\n    for r in cur.fetchall():\n        print(f\"{r[0]} | {r[1]} | Rs. {r[2]}\")\n    cur.close(); con.close()\n[Marking Scheme: 1.5 marks for open_account with commit, 1.5 marks for check_balance with fetchone, 1.5 marks for close_account with balance verification, 1.5 marks for display_high_value_accounts.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Cinema Multiplex & Online Ticket Reservation",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "6A1",
            "marks": 1,
            "text": "What does the cursor.get_server_info() method return?",
            "solution": "A string containing the MySQL server version.\n[Marking Scheme: 1 mark for server version.]"
          },
          {
            "qId": "6A2",
            "marks": 1,
            "text": "Which method is used to fetch the next 10 rows from a cursor?",
            "solution": "cur.fetchmany(10)\n[Marking Scheme: 1 mark for fetchmany(10).]"
          },
          {
            "qId": "6A3",
            "marks": 1,
            "text": "What type of error is caught by 'except mysql.connector.Error:'?",
            "solution": "Any MySQL database server error or connector client error.\n[Marking Scheme: 1 mark for MySQL database/client error.]"
          },
          {
            "qId": "6A4",
            "marks": 1,
            "text": "What is the effect of writing 'con.autocommit = True' in mysql.connector?",
            "solution": "Every DML statement (INSERT, UPDATE, DELETE) is automatically committed to disk without needing con.commit().\n[Marking Scheme: 1 mark for automatic commit of DML statements.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "6B1",
            "marks": 2,
            "text": "Write a Python function to test if a table named 'Movie' exists in database 'MultiplexDB'.",
            "solution": "con = mysql.connector.connect(host='localhost', user='root', password='password', database='MultiplexDB')\ncur = con.cursor()\ncur.execute(\"SHOW TABLES LIKE 'Movie';\")\nif cur.fetchone():\n    print(\"Table Movie exists!\")\nelse:\n    print(\"Table does not exist!\")\ncur.close(); con.close()\n[Marking Scheme: 2 marks for SHOW TABLES LIKE query and fetchone() check.]"
          },
          {
            "qId": "6B2",
            "marks": 2,
            "text": "Explain the difference between fetchone() returning None vs fetchall() returning [].",
            "solution": "1. fetchone() returns None when it tries to retrieve a single row but none are left.\n2. fetchall() returns an empty list [] because it returns all rows as a list collection.\n[Marking Scheme: 1 mark for None, 1 mark for empty list [].]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6C1",
            "marks": 3,
            "text": "Write a Python function 'add_movie(title, genre, price)' that inserts a new movie into table 'Movie(Title, Genre, TicketPrice)' and commits the record.",
            "solution": "import mysql.connector\n\ndef add_movie(title, genre, price):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='MultiplexDB')\n    cur = con.cursor()\n    cur.execute(\"INSERT INTO Movie (Title, Genre, TicketPrice) VALUES (%s, %s, %s);\", (title, genre, price))\n    con.commit()\n    print(f\"Movie '{title}' added successfully!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for execute with parameters & commit, 1 mark for close.]"
          },
          {
            "qId": "6C2",
            "marks": 3,
            "text": "Write a Python function 'display_by_genre(genre_name)' that displays Title and TicketPrice of all movies in that genre.",
            "solution": "import mysql.connector\n\ndef display_by_genre(genre_name):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='MultiplexDB')\n    cur = con.cursor()\n    cur.execute(\"SELECT Title, TicketPrice FROM Movie WHERE Genre = %s;\", (genre_name,))\n    for title, price in cur.fetchall():\n        print(f\"{title:<30} Rs. {price}\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for parameterized query with single-element tuple, 1 mark for display.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "6D1",
            "marks": 6,
            "text": "Table: SHOWS (ShowId INT PRIMARY KEY, MovieName VARCHAR(30), AudiNo INT, SeatsAvailable INT, Price DECIMAL(6,2))\nWrite a complete Python script that:\n(a) Prompts user for a movie name and displays all shows running for that movie.\n(b) Defines 'book_seats(show_id, num_seats)': checks if SeatsAvailable >= num_seats; if yes, deducts SeatsAvailable, calculates total price, commits transaction, and prints confirmation; if not, prints 'Not enough seats'.\nInclude proper error handling.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='MultiplexDB')\n\ndef search_shows(mname):\n    con = get_con(); cur = con.cursor()\n    cur.execute(\"SELECT ShowId, AudiNo, SeatsAvailable, Price FROM SHOWS WHERE MovieName = %s;\", (mname,))\n    rows = cur.fetchall()\n    if not rows:\n        print(\"No shows found for\", mname)\n    else:\n        for r in rows:\n            print(f\"Show #{r[0]} | Audi {r[1]} | Seats Left: {r[2]} | Price: Rs.{r[3]}\")\n    cur.close(); con.close()\n\ndef book_seats(show_id, num_seats):\n    con = get_con(); cur = con.cursor()\n    try:\n        cur.execute(\"SELECT SeatsAvailable, Price FROM SHOWS WHERE ShowId = %s;\", (show_id,))\n        row = cur.fetchone()\n        if not row:\n            print(\"Show ID not found!\")\n            return\n        available, price = row[0], row[1]\n        if available >= num_seats:\n            cur.execute(\"UPDATE SHOWS SET SeatsAvailable = SeatsAvailable - %s WHERE ShowId = %s;\", (num_seats, show_id))\n            con.commit()\n            total = num_seats * price\n            print(f\"Booking Confirmed! {num_seats} seats booked. Total Bill: Rs. {total}\")\n        else:\n            print(f\"Booking Failed! Only {available} seats available.\")\n    except mysql.connector.Error as err:\n        con.rollback()\n        print(\"Error:\", err)\n    finally:\n        cur.close(); con.close()\n[Marking Scheme: 2.5 marks for search_shows with parameterization, 3.5 marks for book_seats with seat availability check, deduction, commit, and rollback on error.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Hospital Patient Management & Ward Allocations",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "7A1",
            "marks": 1,
            "text": "What does cur.lastrowid contain in mysql.connector?",
            "solution": "The AUTO_INCREMENT ID generated for the last inserted row on that connection.\n[Marking Scheme: 1 mark for last AUTO_INCREMENT ID.]"
          },
          {
            "qId": "7A2",
            "marks": 1,
            "text": "True or False: SQL queries passed to cur.execute() must end with a semicolon.",
            "solution": "False. In mysql.connector, the trailing semicolon is optional.\n[Marking Scheme: 1 mark for False.]"
          },
          {
            "qId": "7A3",
            "marks": 1,
            "text": "Which parameter in mysql.connector.connect() specifies the server hostname?",
            "solution": "host (e.g. host='localhost')\n[Marking Scheme: 1 mark for host.]"
          },
          {
            "qId": "7A4",
            "marks": 1,
            "text": "What does cur.execute(\"SELECT * FROM Patient;\") do behind the scenes?",
            "solution": "It sends the SQL string to the MySQL server, compiles the statement, and prepares the result buffer.\n[Marking Scheme: 1 mark for sending and preparing result set.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "7B1",
            "marks": 2,
            "text": "What is the difference between connecting to 'localhost' vs connecting to an IP address like '192.168.1.50'?",
            "solution": "1. 'localhost' connects to the MySQL server running on the same local machine.\n2. An IP address connects across the network to a remote MySQL server host via TCP/IP.\n[Marking Scheme: 1 mark for local, 1 mark for remote network connection.]"
          },
          {
            "qId": "7B2",
            "marks": 2,
            "text": "Write a Python snippet to handle a database connection failure gracefully.",
            "solution": "try:\n    con = mysql.connector.connect(host='localhost', user='root', password='wrong', database='HospitalDB')\nexcept mysql.connector.Error as err:\n    print(f\"Database connection failed: {err}\")\n[Marking Scheme: 2 marks for try-except catching mysql.connector.Error.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7C1",
            "marks": 3,
            "text": "Write a Python function 'admit_patient(pid, name, dept, charges)' that inserts a new patient record into table 'Patient' and commits the transaction.",
            "solution": "import mysql.connector\n\ndef admit_patient(pid, name, dept, charges):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='HospitalDB')\n    cur = con.cursor()\n    cur.execute(\"INSERT INTO Patient VALUES (%s, %s, %s, %s);\", (pid, name, dept, charges))\n    con.commit()\n    print(f\"Patient {name} admitted successfully!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for execute with parameters & commit, 1 mark for close.]"
          },
          {
            "qId": "7C2",
            "marks": 3,
            "text": "Write a Python function 'discharge_patient(pid)' that deletes the patient record from table 'Patient' and prints a discharge confirmation message.",
            "solution": "import mysql.connector\n\ndef discharge_patient(pid):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='HospitalDB')\n    cur = con.cursor()\n    cur.execute(\"DELETE FROM Patient WHERE PId = %s;\", (pid,))\n    con.commit()\n    if cur.rowcount > 0:\n        print(f\"Patient {pid} discharged successfully!\")\n    else:\n        print(f\"Patient {pid} not found!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for DELETE with commit, 1 mark for checking rowcount and closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "7D1",
            "marks": 6,
            "text": "Table: PATIENT (PId INT PRIMARY KEY, PName VARCHAR(30), Dept VARCHAR(20), DateOfAdm DATE, Charges DECIMAL(8,2))\nWrite a complete Python script that:\n(a) Connects to 'HospitalDB'.\n(b) Defines 'search_by_dept(dept)': displays all patients admitted in that department.\n(c) Defines 'update_charges(pid, extra_charge)': adds extra_charge to existing Charges and commits.\n(d) Defines 'display_total_revenue()': computes and prints SUM(Charges) across all patients.\nInclude proper exception handling.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='HospitalDB')\n\ndef search_by_dept(dept):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT PId, PName, Charges FROM PATIENT WHERE Dept = %s;\", (dept,))\n        for r in cur.fetchall():\n            print(f\"ID: {r[0]} | Name: {r[1]} | Charges: Rs.{r[2]}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef update_charges(pid, extra_charge):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"UPDATE PATIENT SET Charges = Charges + %s WHERE PId = %s;\", (extra_charge, pid))\n        con.commit()\n        print(\"Charges updated successfully!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef display_total_revenue():\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT SUM(Charges) FROM PATIENT;\")\n        total = cur.fetchone()[0]\n        print(f\"Total Hospital Revenue: Rs. {total}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n[Marking Scheme: 2 marks for search_by_dept, 2 marks for update_charges with commit, 2 marks for display_total_revenue with aggregate query.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Hotel Booking & Room Reservation System",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "8A1",
            "marks": 1,
            "text": "What will happen if you iterate over an empty cursor result set using a for loop?",
            "solution": "The loop does not execute any iterations and terminates immediately without raising an error.\n[Marking Scheme: 1 mark for terminates without executing.]"
          },
          {
            "qId": "8A2",
            "marks": 1,
            "text": "Can a Python script connect to multiple MySQL databases at the same time?",
            "solution": "Yes, by creating separate connection objects using mysql.connector.connect().\n[Marking Scheme: 1 mark for Yes.]"
          },
          {
            "qId": "8A3",
            "marks": 1,
            "text": "What does cur.rowcount return for a SELECT query right after cur.execute() before any fetch call?",
            "solution": "-1 (in unbuffered cursors) or total rows in buffered cursors.\n[Marking Scheme: 1 mark for -1 or total rows.]"
          },
          {
            "qId": "8A4",
            "marks": 1,
            "text": "Write the method used to verify whether a connection is still open.",
            "solution": "connection.is_connected()\n[Marking Scheme: 1 mark for is_connected().]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "8B1",
            "marks": 2,
            "text": "Why should we avoid writing queries like 'cur.execute(f\"SELECT * FROM Guest WHERE Name = '{name}'\")'?",
            "solution": "Because formatting raw variables into SQL strings allows SQL injection attacks if the variable contains malicious SQL characters (like quotes or semicolons).\n[Marking Scheme: 2 marks for explaining SQL injection vulnerability.]"
          },
          {
            "qId": "8B2",
            "marks": 2,
            "text": "Write a Python snippet to fetch and print the first 3 available rooms from table Room.",
            "solution": "cur.execute(\"SELECT RoomNo, RoomType, Rent FROM Room WHERE Status = 'Available';\")\nfor room in cur.fetchmany(3):\n    print(room)\n[Marking Scheme: 2 marks for fetchmany(3) with loop.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8C1",
            "marks": 3,
            "text": "Write a Python function 'check_in(guest_name, room_no, days, bill)' that inserts a booking record into 'Guest' and updates the Room status to 'Occupied' inside table 'Room'.",
            "solution": "import mysql.connector\n\ndef check_in(guest_name, room_no, days, bill):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='HotelDB')\n    cur = con.cursor()\n    cur.execute(\"INSERT INTO Guest VALUES (%s, %s, %s, %s);\", (guest_name, room_no, days, bill))\n    cur.execute(\"UPDATE Room SET Status = 'Occupied' WHERE RoomNo = %s;\", (room_no,))\n    con.commit()\n    print(f\"Guest {guest_name} checked in Room {room_no}!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for two queries with commit, 1 mark for closing.]"
          },
          {
            "qId": "8C2",
            "marks": 3,
            "text": "Write a Python function 'check_out(room_no)' that updates table 'Room' setting Status = 'Available' and deletes the guest record for that room.",
            "solution": "import mysql.connector\n\ndef check_out(room_no):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='HotelDB')\n    cur = con.cursor()\n    cur.execute(\"UPDATE Room SET Status = 'Available' WHERE RoomNo = %s;\", (room_no,))\n    cur.execute(\"DELETE FROM Guest WHERE RoomNo = %s;\", (room_no,))\n    con.commit()\n    print(f\"Room {room_no} is now available!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for UPDATE and DELETE with commit, 1 mark for closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "8D1",
            "marks": 6,
            "text": "Table: ROOM (RoomNo INT PRIMARY KEY, RoomType VARCHAR(20), Rent DECIMAL(7,2), Status VARCHAR(15))\nWrite a complete Python script that:\n(a) Connects to 'HotelDB'.\n(b) Defines 'display_available_rooms(type)': displays available rooms for a given type.\n(c) Defines 'update_rent(type, percent)': increases rent of all rooms of that type by percent and commits.\n(d) Defines 'count_rooms_by_status()': groups by Status and prints room count for each status.\nInclude error handling.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='HotelDB')\n\ndef display_available_rooms(rtype):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT RoomNo, Rent FROM ROOM WHERE RoomType = %s AND Status = 'Available';\", (rtype,))\n        for r in cur.fetchall():\n            print(f\"Room {r[0]} | Rent: Rs.{r[1]}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef update_rent(rtype, percent):\n    try:\n        con = get_con(); cur = con.cursor()\n        factor = 1 + (percent / 100)\n        cur.execute(\"UPDATE ROOM SET Rent = Rent * %s WHERE RoomType = %s;\", (factor, rtype))\n        con.commit()\n        print(f\"Rent updated for {cur.rowcount} rooms!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef count_rooms_by_status():\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT Status, COUNT(*) FROM ROOM GROUP BY Status;\")\n        for status, count in cur.fetchall():\n            print(f\"{status}: {count} rooms\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n[Marking Scheme: 2 marks for display_available_rooms, 2 marks for update_rent with factor and commit, 2 marks for count_rooms_by_status with GROUP BY.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Library Catalog & Book Lending System",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "9A1",
            "marks": 1,
            "text": "What does cursor.fetchall() do to the internal cursor position?",
            "solution": "It consumes all remaining records in the result buffer, leaving the cursor at the end (further fetchone() calls return None).\n[Marking Scheme: 1 mark for consuming all records / positioning at end.]"
          },
          {
            "qId": "9A2",
            "marks": 1,
            "text": "Which parameter is used to pass credentials securely to mysql.connector.connect()?",
            "solution": "user and password (e.g. user='root', password='tiger')\n[Marking Scheme: 1 mark for user and password.]"
          },
          {
            "qId": "9A3",
            "marks": 1,
            "text": "Can a Python script create a new database in MySQL using cur.execute()?",
            "solution": "Yes (e.g. cur.execute(\"CREATE DATABASE IF NOT EXISTS LibraryDB;\")).\n[Marking Scheme: 1 mark for Yes with valid SQL.]"
          },
          {
            "qId": "9A4",
            "marks": 1,
            "text": "What happens if a parameterized query tuple has fewer elements than '%s' placeholders?",
            "solution": "Python raises an exception: Not all parameters were used / not enough arguments for format string.\n[Marking Scheme: 1 mark for raising format/parameter error.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "9B1",
            "marks": 2,
            "text": "Explain how to safely unpack row tuples inside a loop when fetching records.",
            "solution": "Instead of indexing (e.g. row[0], row[1]), unpack them directly in the for loop header:\n'for book_id, title, author in cur.fetchall():'\nThis improves readability and reduces indexing bugs.\n[Marking Scheme: 2 marks for tuple unpacking explanation and syntax.]"
          },
          {
            "qId": "9B2",
            "marks": 2,
            "text": "Write a Python snippet to display all books authored by 'Sumita Arora' using a parameterized query.",
            "solution": "cur.execute(\"SELECT BookId, Title, Price FROM Book WHERE Author = %s;\", ('Sumita Arora',))\nfor b in cur.fetchall():\n    print(b)\n[Marking Scheme: 2 marks for ('Sumita Arora',) single-element tuple and display.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9C1",
            "marks": 3,
            "text": "Write a Python function 'add_book(bid, title, author, price)' that inserts a new book into table 'Book' and commits the transaction.",
            "solution": "import mysql.connector\n\ndef add_book(bid, title, author, price):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='LibraryDB')\n    cur = con.cursor()\n    cur.execute(\"INSERT INTO Book VALUES (%s, %s, %s, %s);\", (bid, title, author, price))\n    con.commit()\n    print(f\"Book '{title}' added successfully!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for execute with parameters & commit, 1 mark for closing.]"
          },
          {
            "qId": "9C2",
            "marks": 3,
            "text": "Write a Python function 'remove_book(bid)' that deletes the book with the given BookId from table 'Book' and displays the number of rows deleted.",
            "solution": "import mysql.connector\n\ndef remove_book(bid):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='LibraryDB')\n    cur = con.cursor()\n    cur.execute(\"DELETE FROM Book WHERE BookId = %s;\", (bid,))\n    con.commit()\n    print(f\"{cur.rowcount} book(s) removed!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connection, 1 mark for execute & commit, 1 mark for reporting rowcount.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "9D1",
            "marks": 6,
            "text": "Table: BOOK (BookId INT PRIMARY KEY, Title VARCHAR(40), Author VARCHAR(30), Price DECIMAL(6,2), Issued CHAR(1))\nWrite a complete Python script that:\n(a) Connects to 'LibraryDB'.\n(b) Defines 'issue_book(bid)': checks if Issued == 'N'; if yes, sets Issued = 'Y' and commits; if no, prints 'Book already issued!'.\n(c) Defines 'return_book(bid)': sets Issued = 'N' and commits.\n(d) Defines 'display_available_books()': lists all books where Issued == 'N'.\nInclude error handling.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='LibraryDB')\n\ndef issue_book(bid):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT Title, Issued FROM BOOK WHERE BookId = %s;\", (bid,))\n        row = cur.fetchone()\n        if not row:\n            print(\"Book not found!\")\n            return\n        title, issued = row[0], row[1]\n        if issued == 'Y':\n            print(f\"Book '{title}' is already issued!\")\n        else:\n            cur.execute(\"UPDATE BOOK SET Issued = 'Y' WHERE BookId = %s;\", (bid,))\n            con.commit()\n            print(f\"Book '{title}' issued successfully!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef return_book(bid):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"UPDATE BOOK SET Issued = 'N' WHERE BookId = %s;\", (bid,))\n        con.commit()\n        print(\"Book returned successfully!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef display_available_books():\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT BookId, Title, Author, Price FROM BOOK WHERE Issued = 'N';\")\n        for r in cur.fetchall():\n            print(f\"[{r[0]}] {r[1]} by {r[2]} (Rs.{r[3]})\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n[Marking Scheme: 2.5 marks for issue_book with status verification and commit, 1.5 marks for return_book with commit, 2 marks for display_available_books.]"
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Fitness Center Memberships & Personal Training",
    "timeLimit": 45,
    "maxMarks": 20,
    "instructions": "All questions are compulsory. Use standard Python 3 and mysql.connector syntax. Section A: 4x1M=4M, Section B: 2x2M=4M, Section C: 2x3M=6M, Section D: 1x6M=6M.",
    "sections": [
      {
        "sectionName": "Section A (4 Questions × 1 Mark = 4 Marks)",
        "questions": [
          {
            "qId": "10A1",
            "marks": 1,
            "text": "Which Python function from mysql.connector is used to catch the numerical error code of a MySQL exception?",
            "solution": "err.errno (on mysql.connector.Error instance)\n[Marking Scheme: 1 mark for err.errno.]"
          },
          {
            "qId": "10A2",
            "marks": 1,
            "text": "What does 'con.rollback()' do when called after a failed INSERT query?",
            "solution": "It cancels all uncommitted changes made during the current transaction, returning the database to its previous consistent state.\n[Marking Scheme: 1 mark for cancelling uncommitted changes.]"
          },
          {
            "qId": "10A3",
            "marks": 1,
            "text": "What is the return type of cursor.fetchmany(0)?",
            "solution": "An empty list: []\n[Marking Scheme: 1 mark for empty list [].]"
          },
          {
            "qId": "10A4",
            "marks": 1,
            "text": "True or False: In mysql.connector, parameter placeholders '%s' must be enclosed in quotes in the SQL query string.",
            "solution": "False. The placeholder '%s' must NOT be enclosed in quotes (e.g. 'WHERE Name = %s', NOT 'WHERE Name = \"%s\"'). The connector automatically quotes strings.\n[Marking Scheme: 1 mark for False.]"
          }
        ]
      },
      {
        "sectionName": "Section B (2 Questions × 2 Marks = 4 Marks)",
        "questions": [
          {
            "qId": "10B1",
            "marks": 2,
            "text": "Explain what happens if you enclose a '%s' placeholder in quotes, such as: \"SELECT * FROM Member WHERE Plan = '%s'\".",
            "solution": "Enclosing '%s' in quotes causes MySQL to treat '%s' as a literal two-character string rather than a prepared parameter placeholder, resulting in zero matches or a parameter binding error.\n[Marking Scheme: 2 marks for explaining literal string interpretation error.]"
          },
          {
            "qId": "10B2",
            "marks": 2,
            "text": "Write a Python snippet to connect to database 'GymDB' using connection parameters stored in a dictionary.",
            "solution": "db_config = {'host': 'localhost', 'user': 'root', 'password': 'password', 'database': 'GymDB'}\ncon = mysql.connector.connect(**db_config)\n[Marking Scheme: 2 marks for dictionary unpacking with `**db_config`.]"
          }
        ]
      },
      {
        "sectionName": "Section C (2 Questions × 3 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10C1",
            "marks": 3,
            "text": "Write a Python function 'register_member(mid, mname, plan, fee)' that inserts a new gym member record and prints the total number of members currently registered in that plan.",
            "solution": "import mysql.connector\n\ndef register_member(mid, mname, plan, fee):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='GymDB')\n    cur = con.cursor()\n    cur.execute(\"INSERT INTO Member VALUES (%s, %s, %s, %s);\", (mid, mname, plan, fee))\n    con.commit()\n    cur.execute(\"SELECT COUNT(*) FROM Member WHERE Plan = %s;\", (plan,))\n    total = cur.fetchone()[0]\n    print(f\"Member registered! Total in {plan} plan: {total}\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for INSERT with commit, 1 mark for COUNT query and closing.]"
          },
          {
            "qId": "10C2",
            "marks": 3,
            "text": "Write a Python function 'upgrade_plan(mid, new_plan, new_fee)' that updates the Plan and Fee of the given member ID and commits the transaction.",
            "solution": "import mysql.connector\n\ndef upgrade_plan(mid, new_plan, new_fee):\n    con = mysql.connector.connect(host='localhost', user='root', password='password', database='GymDB')\n    cur = con.cursor()\n    cur.execute(\"UPDATE Member SET Plan = %s, Fee = %s WHERE MemId = %s;\", (new_plan, new_fee, mid))\n    con.commit()\n    print(f\"Member {mid} updated to {new_plan}!\")\n    cur.close()\n    con.close()\n[Marking Scheme: 1 mark for connect, 1 mark for UPDATE with parameters & commit, 1 mark for closing.]"
          }
        ]
      },
      {
        "sectionName": "Section D (1 Comprehensive Case Study × 6 Marks = 6 Marks)",
        "questions": [
          {
            "qId": "10D1",
            "marks": 6,
            "text": "Table: MEMBER (MemId INT PRIMARY KEY, MName VARCHAR(30), Plan VARCHAR(15), Fee DECIMAL(8,2), JoinDate DATE)\nWrite a complete Python script that:\n(a) Connects to 'GymDB'.\n(b) Defines 'display_plan_summary()': displays each Plan, count of members in that plan, and total fee collected (SUM(Fee)) using GROUP BY.\n(c) Defines 'renew_membership(mid, fee_paid)': confirms renewal and updates Fee.\n(d) Defines 'cancel_membership(mid)': deletes the member record.\nInclude error handling with try-except and rollback.",
            "solution": "import mysql.connector\n\ndef get_con():\n    return mysql.connector.connect(host='localhost', user='root', password='password', database='GymDB')\n\ndef display_plan_summary():\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"SELECT Plan, COUNT(*), SUM(Fee) FROM MEMBER GROUP BY Plan;\")\n        for plan, count, total in cur.fetchall():\n            print(f\"Plan: {plan:<12} | Members: {count:<4} | Total Fees: Rs.{total}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        print(\"Error:\", err)\n\ndef renew_membership(mid, fee_paid):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"UPDATE MEMBER SET Fee = Fee + %s WHERE MemId = %s;\", (fee_paid, mid))\n        con.commit()\n        print(f\"Membership for ID {mid} renewed! Added Rs. {fee_paid}\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        con.rollback()\n        print(\"Error:\", err)\n\ndef cancel_membership(mid):\n    try:\n        con = get_con(); cur = con.cursor()\n        cur.execute(\"DELETE FROM MEMBER WHERE MemId = %s;\", (mid,))\n        con.commit()\n        if cur.rowcount > 0:\n            print(f\"Membership for ID {mid} cancelled successfully!\")\n        else:\n            print(\"Member ID not found!\")\n        cur.close(); con.close()\n    except mysql.connector.Error as err:\n        con.rollback()\n        print(\"Error:\", err)\n[Marking Scheme: 2 marks for display_plan_summary with GROUP BY, 2 marks for renew_membership with commit, 2 marks for cancel_membership with rowcount check.]"
          }
        ]
      }
    ]
  }
];
export default samplePaperSets;
