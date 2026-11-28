export const questions = [
  {
    "id": 1,
    "question": "Which module must be imported in Python for connecting to MySQL in the CBSE Class 12 curriculum?",
    "options": [
      "sqlite3",
      "mysql.connector",
      "psycopg2",
      "pyodbc"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector is the official pure-Python driver specified in CBSE CS Code 083."
  },
  {
    "id": 2,
    "question": "What is the return type of mysql.connector.connect()?",
    "options": [
      "Cursor object",
      "Connection object",
      "RecordSet",
      "Boolean"
    ],
    "correctAnswer": 1,
    "explanation": "connect() returns an active Connection object representing the socket channel."
  },
  {
    "id": 3,
    "question": "What does cursor.fetchone() return when no more rows remain?",
    "options": [
      "Empty list []",
      "None",
      "False",
      "Empty tuple ()"
    ],
    "correctAnswer": 1,
    "explanation": "fetchone() returns None when result set is exhausted."
  },
  {
    "id": 4,
    "question": "What does cursor.fetchall() return if a query produces no matching rows?",
    "options": [
      "None",
      "Empty list []",
      "Empty tuple ()",
      "StopIteration"
    ],
    "correctAnswer": 1,
    "explanation": "fetchall() returns an empty list [] when no rows match."
  },
  {
    "id": 5,
    "question": "Why must connection.commit() be called after executing an INSERT or UPDATE statement?",
    "options": [
      "To close the cursor",
      "To permanently save pending transactional modifications to the database disk",
      "To display the rowcount",
      "To prevent syntax errors"
    ],
    "correctAnswer": 1,
    "explanation": "Without commit(), transactions remain uncommitted and are lost upon disconnection."
  },
  {
    "id": 6,
    "question": "Which symbol is used as the parameter placeholder in mysql.connector queries?",
    "options": [
      "'?'",
      "'%s'",
      "':param'",
      "'$'"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector uses '%s' universally for all data types."
  },
  {
    "id": 7,
    "question": "How should arguments be passed to cursor.execute() when using placeholders?",
    "options": [
      "As a Python tuple or list",
      "As a single comma-separated string",
      "As an integer",
      "Directly inside the query string"
    ],
    "correctAnswer": 0,
    "explanation": "Parameters are passed as a tuple or list matching '%s' placeholders."
  },
  {
    "id": 8,
    "question": "What is the default TCP/IP port used by MySQL server?",
    "options": [
      "8080",
      "1521",
      "3306",
      "5432"
    ],
    "correctAnswer": 2,
    "explanation": "Port 3306 is the standard default port for MySQL."
  },
  {
    "id": 9,
    "question": "What is the data structure of an individual row fetched by fetchone()?",
    "options": [
      "Dictionary",
      "Tuple",
      "List",
      "Set"
    ],
    "correctAnswer": 1,
    "explanation": "By default, rows are returned as Python tuples."
  },
  {
    "id": 10,
    "question": "Which method is used to undo uncommitted changes in a database transaction?",
    "options": [
      "rollback()",
      "undo()",
      "revert()",
      "discard()"
    ],
    "correctAnswer": 0,
    "explanation": "con.rollback() rolls back all pending uncommitted changes in the transaction."
  },
  {
    "id": 11,
    "question": "What does cursor.rowcount represent after executing an UPDATE query?",
    "options": [
      "Total rows in the table",
      "Number of rows affected/modified by the query",
      "Always 0",
      "Number of columns"
    ],
    "correctAnswer": 1,
    "explanation": "For DML statements, rowcount contains the number of rows modified."
  },
  {
    "id": 12,
    "question": "Which exception class in mysql.connector catches database operational errors?",
    "options": [
      "mysql.connector.Error",
      "SQLError",
      "DBException",
      "OperationalError"
    ],
    "correctAnswer": 0,
    "explanation": "mysql.connector.Error is the base exception class for MySQL errors."
  },
  {
    "id": 13,
    "question": "How can you iterate directly through query results without storing all rows in a list?",
    "options": [
      "for row in cur:",
      "while cur.has_next():",
      "for row in con:",
      "for i in cur.size:"
    ],
    "correctAnswer": 0,
    "explanation": "The cursor object supports direct iteration: 'for row in cur:'."
  },
  {
    "id": 14,
    "question": "Why should '%s' placeholders NOT be enclosed in quotes like '\"%s\"' in the SQL string?",
    "options": [
      "Because the driver automatically quotes strings; extra quotes cause MySQL to treat '%s' as literal text",
      "Because quotes cause Python syntax errors",
      "Because quotes are reserved for numbers",
      "Because quotes disable the network connection"
    ],
    "correctAnswer": 0,
    "explanation": "The connector automatically quotes and escapes parameters; manual quotes break parameter binding."
  },
  {
    "id": 15,
    "question": "What does connection.is_connected() return?",
    "options": [
      "Boolean True or False",
      "String",
      "Integer 1 or 0",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "is_connected() returns True if the connection is active, otherwise False."
  },
  {
    "id": 16,
    "question": "If a query needs a single parameter 'roll', how should the tuple be constructed?",
    "options": [
      "(roll)",
      "(roll, )",
      "[roll]",
      "{roll}"
    ],
    "correctAnswer": 1,
    "explanation": "In Python, a single-element tuple requires a trailing comma: `(roll, )`."
  },
  {
    "id": 17,
    "question": "Which block in a try-except structure is guaranteed to run for resource cleanup?",
    "options": [
      "finally",
      "else",
      "except",
      "catch"
    ],
    "correctAnswer": 0,
    "explanation": "The finally block always runs, ensuring cursors and connections are closed."
  },
  {
    "id": 18,
    "question": "Can cursor.execute() execute DDL commands like 'DROP TABLE'?",
    "options": [
      "Yes, cursor.execute() can execute any valid SQL DDL statement",
      "No, only DML commands",
      "Only if table has 0 rows",
      "Only in Python 3.12+"
    ],
    "correctAnswer": 0,
    "explanation": "cursor.execute() executes all valid SQL statements including DDL, DML, and DQL."
  },
  {
    "id": 19,
    "question": "What does cur.fetchmany(3) return if only 2 rows are left?",
    "options": [
      "A list of 2 row tuples",
      "Throws an error",
      "None",
      "A list of 3 rows with 1 NULL"
    ],
    "correctAnswer": 0,
    "explanation": "fetchmany(size) returns up to 'size' rows; if fewer remain, it returns all remaining rows."
  },
  {
    "id": 20,
    "question": "In CBSE board exam Python-MySQL questions, what is the usual mark allocation for Section C?",
    "options": [
      "3 marks for writing a complete Python function with connectivity",
      "10 marks",
      "1 mark",
      "0.5 marks"
    ],
    "correctAnswer": 0,
    "explanation": "Section C typically awards 3 marks for complete Python connectivity functions."
  },
  {
    "id": 21,
    "question": "What is SQL Injection?",
    "options": [
      "A technique where malicious SQL commands are inserted into user input fields to manipulate backend queries",
      "A Python module to speed up MySQL",
      "A tool for creating database diagrams",
      "A method to repair corrupted tables"
    ],
    "correctAnswer": 0,
    "explanation": "SQL injection occurs when unsanitized user inputs alter the intended SQL query logic."
  },
  {
    "id": 22,
    "question": "Which cursor method returns the AUTO_INCREMENT value of the last inserted record?",
    "options": [
      "cur.lastrowid",
      "cur.last_id()",
      "cur.auto_id",
      "cur.next_id()"
    ],
    "correctAnswer": 0,
    "explanation": "cur.lastrowid provides the generated AUTO_INCREMENT key."
  },
  {
    "id": 23,
    "question": "What is the primary benefit of closing database connections with con.close()?",
    "options": [
      "Frees operating system network sockets and server connection slots",
      "Deletes temporary tables",
      "Encrypts the database",
      "Powers off the MySQL server"
    ],
    "correctAnswer": 0,
    "explanation": "Closing connections prevents resource leaks and connection exhaustion on the MySQL server."
  },
  {
    "id": 24,
    "question": "If 'row = cur.fetchone()' returns '(105, 'Ankit', 'Science', 91.5)', what is 'row[2]'?",
    "options": [
      "105",
      "'Ankit'",
      "'Science'",
      "91.5"
    ],
    "correctAnswer": 2,
    "explanation": "Indexing is zero-based: row[0]=105, row[1]='Ankit', row[2]='Science'."
  },
  {
    "id": 25,
    "question": "Why is practicing all 10 sample question paper sets essential for mastering Python-MySQL connectivity?",
    "options": [
      "To develop speed and muscle memory for writing complete functions with connect, execute, commit, and error handling",
      "Because questions are identical every year",
      "To avoid learning SQL",
      "To pass without writing code"
    ],
    "correctAnswer": 0,
    "explanation": "Timed practice ensures students avoid common pitfalls like missing commit() and write clean, structured code."
  }
];
export default questions;
