export const questions = [
  {
    "id": 1,
    "question": "[Topic 1 Q1] Which Python module is officially used in CBSE Class 12 Computer Science for MySQL database connectivity?",
    "options": [
      "sqlite3",
      "mysql.connector",
      "psycopg2",
      "cx_Oracle"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector is the standard driver specified in the CBSE Class 12 CS (083) curriculum."
  },
  {
    "id": 2,
    "question": "[Topic 1 Q2] Which method is used to establish a connection to a MySQL database in mysql.connector?",
    "options": [
      "mysql.connector.open()",
      "mysql.connector.connect()",
      "mysql.connector.start()",
      "mysql.connector.create_connection()"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector.connect(host, user, password, database) is the connection factory method."
  },
  {
    "id": 3,
    "question": "[Topic 1 Q3] What is the return type of the method connection.is_connected()?",
    "options": [
      "Integer (1 or 0)",
      "String ('connected')",
      "Boolean (True or False)",
      "None"
    ],
    "correctAnswer": 2,
    "explanation": "is_connected() returns True if the connection is active and healthy, otherwise False."
  },
  {
    "id": 4,
    "question": "[Topic 1 Q4] Which object is used to execute SQL queries and retrieve results in Python-MySQL connectivity?",
    "options": [
      "Connection object",
      "Cursor object",
      "Statement object",
      "RecordSet object"
    ],
    "correctAnswer": 1,
    "explanation": "The cursor object (created by con.cursor()) acts as the workhorse for query execution and result handling."
  },
  {
    "id": 5,
    "question": "[Topic 1 Q5] What does cursor.fetchone() return when there are no more rows left to fetch?",
    "options": [
      "Empty tuple ()",
      "Empty list []",
      "None",
      "Throws StopIteration error"
    ],
    "correctAnswer": 2,
    "explanation": "fetchone() returns None when the result set has been exhausted."
  },
  {
    "id": 6,
    "question": "[Topic 1 Q6] What does cursor.fetchall() return if the query produced zero matching rows?",
    "options": [
      "None",
      "Empty list []",
      "Empty tuple ()",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "fetchall() returns an empty list [] if no rows match the query."
  },
  {
    "id": 7,
    "question": "[Topic 1 Q7] Why must connection.commit() be called after executing an INSERT or UPDATE statement?",
    "options": [
      "To close the database connection",
      "To permanently save pending transactional changes to disk",
      "To clear the cursor memory buffer",
      "To encrypt the data"
    ],
    "correctAnswer": 1,
    "explanation": "By default, transactions are not autocommitted; con.commit() writes DML changes permanently."
  },
  {
    "id": 8,
    "question": "[Topic 1 Q8] Which placeholder symbol is used for parameterized queries in mysql.connector?",
    "options": [
      "'?'",
      "'%s'",
      "':val'",
      "'$'"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector strictly uses '%s' as the parameter placeholder for all data types."
  },
  {
    "id": 9,
    "question": "[Topic 1 Q9] How must parameter values be passed to cursor.execute() when using placeholders?",
    "options": [
      "As a dictionary only",
      "As a tuple or sequence of values",
      "As a comma-separated string",
      "As a single integer"
    ],
    "correctAnswer": 1,
    "explanation": "Parameters must be supplied as a tuple (or list) matching the '%s' placeholders in order."
  },
  {
    "id": 10,
    "question": "[Topic 1 Q10] What is the data structure of a single row returned by cursor.fetchone()?",
    "options": [
      "Dictionary",
      "Tuple",
      "List",
      "Set"
    ],
    "correctAnswer": 1,
    "explanation": "By default, mysql.connector returns each row as a Python tuple of attribute values."
  },
  {
    "id": 11,
    "question": "[Topic 1 Q11] Which method is used to undo uncommitted changes in a database transaction?",
    "options": [
      "con.undo()",
      "con.rollback()",
      "con.revert()",
      "con.abort()"
    ],
    "correctAnswer": 1,
    "explanation": "con.rollback() cancels all pending changes in the current transaction block."
  },
  {
    "id": 12,
    "question": "[Topic 1 Q12] What will happen if you execute an INSERT statement but forget to call con.commit()?",
    "options": [
      "Python throws an unhandled exception",
      "The record appears in MySQL temporarily for 1 hour",
      "The record is NOT saved to the database table permanently",
      "The table is automatically dropped"
    ],
    "correctAnswer": 2,
    "explanation": "Without commit(), the transaction is discarded when the connection terminates, leaving table unchanged."
  },
  {
    "id": 13,
    "question": "[Topic 1 Q13] What does the cursor.rowcount property contain after executing an UPDATE statement?",
    "options": [
      "Total number of rows in the table",
      "Number of rows affected/modified by the UPDATE statement",
      "Always returns 0",
      "Returns None"
    ],
    "correctAnswer": 1,
    "explanation": "For DML statements (INSERT, UPDATE, DELETE), rowcount returns the number of rows affected."
  },
  {
    "id": 14,
    "question": "[Topic 1 Q14] Which exception class in mysql.connector catches all database-related operational errors?",
    "options": [
      "DatabaseError",
      "mysql.connector.Error",
      "SQLError",
      "ConnectionError"
    ],
    "correctAnswer": 1,
    "explanation": "mysql.connector.Error is the base exception class for MySQL operational and client errors."
  },
  {
    "id": 15,
    "question": "[Topic 1 Q15] How can you iterate through records without calling fetchall() into a temporary list?",
    "options": [
      "for row in cur:",
      "while cur.has_next():",
      "for row in con:",
      "for i in range(cur.size):"
    ],
    "correctAnswer": 0,
    "explanation": "The cursor object supports direct iteration: 'for row in cur:' fetches tuples one by one."
  },
  {
    "id": 16,
    "question": "[Topic 1 Q16] Which parameter is NOT a valid argument to mysql.connector.connect()?",
    "options": [
      "host",
      "user",
      "password",
      "tablename"
    ],
    "correctAnswer": 3,
    "explanation": "'tablename' is not a connection parameter. Tables are queried in SQL statements, not at connection time."
  },
  {
    "id": 17,
    "question": "[Topic 1 Q17] What is the purpose of using parameterized queries with '%s' rather than string concatenation?",
    "options": [
      "To make Python code run 10x faster",
      "To prevent SQL Injection vulnerabilities and handle data escaping automatically",
      "To reduce RAM usage",
      "To avoid creating a cursor"
    ],
    "correctAnswer": 1,
    "explanation": "Parameterized queries separate SQL logic from user data, preventing SQL injection."
  },
  {
    "id": 18,
    "question": "[Topic 1 Q18] If you want to fetch the first 3 rows of a 100-row result set, which method call is most appropriate?",
    "options": [
      "cur.fetchone(3)",
      "cur.fetchmany(3)",
      "cur.fetchall()[:3]",
      "cur.get(3)"
    ],
    "correctAnswer": 1,
    "explanation": "cur.fetchmany(3) fetches up to 3 rows from the cursor."
  },
  {
    "id": 19,
    "question": "[Topic 1 Q19] What is the default TCP/IP port used by MySQL Server?",
    "options": [
      "8080",
      "1521",
      "3306",
      "5432"
    ],
    "correctAnswer": 2,
    "explanation": "MySQL listens on TCP port 3306 by default."
  },
  {
    "id": 20,
    "question": "[Topic 1 Q20] In CBSE board exam Python-MySQL scripts, what should always be closed before program termination?",
    "options": [
      "Only the operating system",
      "Both the cursor and connection objects (cur.close(), con.close())",
      "Only the Python interpreter",
      "Nothing needs to be closed"
    ],
    "correctAnswer": 1,
    "explanation": "Always close both the cursor and the connection to release server and client resources."
  },
  {
    "id": 21,
    "question": "[Topic 1 Q21] Given 'res = cur.fetchall()', if 'res' has 4 rows with 3 columns, what is 'len(res)'?",
    "options": [
      "12",
      "4",
      "3",
      "7"
    ],
    "correctAnswer": 1,
    "explanation": "res is a list of 4 row tuples, so len(res) is 4."
  },
  {
    "id": 22,
    "question": "[Topic 1 Q22] If 'row = cur.fetchone()' returns '(101, 'Sunil', 84.5)', what expression gives the student's name?",
    "options": [
      "row['Name']",
      "row[1]",
      "row(1)",
      "row.Name"
    ],
    "correctAnswer": 1,
    "explanation": "Rows are tuples, so the second column (Name) is accessed by index 1: 'row[1]'."
  },
  {
    "id": 23,
    "question": "[Topic 1 Q23] What happens if MySQL server is not running when 'mysql.connector.connect()' is called?",
    "options": [
      "Python hangs indefinitely",
      "mysql.connector.Error (Can't connect to MySQL server) is raised",
      "Python creates a temporary local database in RAM",
      "The function returns False"
    ],
    "correctAnswer": 1,
    "explanation": "A connection failure raises a mysql.connector.Error with the connection error code."
  },
  {
    "id": 24,
    "question": "[Topic 1 Q24] Which clause in a try-except structure is guaranteed to run for resource cleanup?",
    "options": [
      "else",
      "except",
      "finally",
      "catch"
    ],
    "correctAnswer": 2,
    "explanation": "The 'finally' block always executes, ensuring connections are closed even on errors."
  },
  {
    "id": 25,
    "question": "[Topic 1 Q25] Can DDL commands like 'CREATE TABLE' and 'DROP TABLE' be executed using cursor.execute()?",
    "options": [
      "Yes, cursor.execute() can execute any valid SQL DDL statement",
      "No, cursor only works with SELECT",
      "Only in MySQL 8.0+",
      "Only if written in lowercase"
    ],
    "correctAnswer": 0,
    "explanation": "cursor.execute() can execute all valid SQL statements including DDL, DML, DQL, and TCL."
  }
];
export default questions;
