export default [
  {
    "id": 1,
    "question": "In relational database theory, what does the term 'Degree' of a relation signify?",
    "options": [
      "The total number of attributes (columns) present in the relation",
      "The total number of tuples (rows) in the relation",
      "The angle of rotation of the table",
      "The temperature of the server room"
    ],
    "correctAnswer": 0,
    "explanation": "Degree is the number of attributes (columns/fields) in a relation. For example, a table with 6 columns has Degree = 6.",
    "hint": "Total number of columns/attributes."
  },
  {
    "id": 2,
    "question": "In relational database theory, what does the term 'Cardinality' of a relation signify?",
    "options": [
      "The total number of tuples (rows/records) present in the relation",
      "The total number of attributes (columns)",
      "The number of primary keys in the database",
      "The number of users logged into the system"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality is the number of tuples (rows/records) in a relation. For example, a table with 25 rows has Cardinality = 25.",
    "hint": "Total number of rows/tuples."
  },
  {
    "id": 3,
    "question": "A table named HOSPITAL has 8 columns and 120 patient records. What is its Degree and Cardinality?",
    "options": [
      "Degree = 8, Cardinality = 120",
      "Degree = 120, Cardinality = 8",
      "Degree = 960, Cardinality = 1",
      "Degree = 1, Cardinality = 960"
    ],
    "correctAnswer": 0,
    "explanation": "Columns = 8 -> Degree = 8. Rows = 120 -> Cardinality = 120.",
    "hint": "Degree = Columns (8), Cardinality = Rows (120)."
  },
  {
    "id": 4,
    "question": "A table named FLIGHT has 4 columns and 50 rows. If 2 new columns are added using ALTER TABLE and 10 new rows are inserted, what is the new Degree and Cardinality?",
    "options": [
      "Degree = 6, Cardinality = 60",
      "Degree = 4, Cardinality = 50",
      "Degree = 14, Cardinality = 52",
      "Degree = 60, Cardinality = 6"
    ],
    "correctAnswer": 0,
    "explanation": "New Degree = 4 + 2 = 6 columns. New Cardinality = 50 + 10 = 60 rows.",
    "hint": "4 + 2 columns = 6; 50 + 10 rows = 60."
  },
  {
    "id": 5,
    "question": "Which of the two metrics—Degree or Cardinality—changes frequently during normal everyday database transactions (INSERT and DELETE)?",
    "options": [
      "Cardinality changes frequently as tuples are inserted or deleted, while Degree remains static",
      "Degree changes every second",
      "Both change whenever a SELECT query is run",
      "Neither ever changes"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality represents the number of records, changing with every INSERT/DELETE. Degree represents the column schema, changing only with ALTER TABLE commands.",
    "hint": "Rows change frequently with daily transactions."
  },
  {
    "id": 6,
    "question": "In a CBSE 1-mark question: 'A relation R has Degree 5 and Cardinality 0. What does this mean?'",
    "options": [
      "The relation has 5 columns defined in its schema, but contains zero rows (it is currently an empty table)",
      "The relation does not exist",
      "The relation has an error in SQL",
      "The relation has 5 databases"
    ],
    "correctAnswer": 0,
    "explanation": "Degree 5 means 5 attributes exist in the table definition. Cardinality 0 means no tuples have been inserted yet (or all rows were deleted).",
    "hint": "An empty table with 5 column definitions."
  },
  {
    "id": 7,
    "question": "What is the Degree of a newly created table right after executing: 'CREATE TABLE Item (Code INT, Name VARCHAR(20), Price FLOAT);'?",
    "options": [
      "Degree = 3 (since 3 attributes are defined)",
      "Degree = 0",
      "Degree = 1",
      "Degree = NULL"
    ],
    "correctAnswer": 0,
    "explanation": "The table has 3 attributes: Code, Name, Price. Therefore its Degree is 3.",
    "hint": "Count the number of columns in the CREATE TABLE command."
  },
  {
    "id": 8,
    "question": "What is the Cardinality of the Item table right after execution of the CREATE TABLE command, before any INSERT commands?",
    "options": [
      "Cardinality = 0",
      "Cardinality = 3",
      "Cardinality = 1",
      "Cardinality = -1"
    ],
    "correctAnswer": 0,
    "explanation": "Before any records are inserted, the table contains zero tuples. Therefore Cardinality is 0.",
    "hint": "An empty table has 0 rows."
  },
  {
    "id": 9,
    "question": "A relation STUDENT has attributes (RollNo, Name, Class, Marks, Stream) and 35 tuples. What is its Degree?",
    "options": [
      "5",
      "35",
      "40",
      "175"
    ],
    "correctAnswer": 0,
    "explanation": "Counting the attributes: RollNo (1), Name (2), Class (3), Marks (4), Stream (5). Total attributes = 5, so Degree = 5.",
    "hint": "Count the 5 attributes."
  },
  {
    "id": 10,
    "question": "In the same STUDENT table (5 attributes, 35 tuples), what is its Cardinality?",
    "options": [
      "35",
      "5",
      "175",
      "30"
    ],
    "correctAnswer": 0,
    "explanation": "The table contains 35 tuples (rows), so its Cardinality is 35.",
    "hint": "The number of tuples is 35."
  },
  {
    "id": 11,
    "question": "If 5 rows are deleted from the STUDENT table (originally having Degree 5 and Cardinality 35), what are the updated values?",
    "options": [
      "Degree = 5, Cardinality = 30",
      "Degree = 0, Cardinality = 30",
      "Degree = 5, Cardinality = 35",
      "Degree = 30, Cardinality = 5"
    ],
    "correctAnswer": 0,
    "explanation": "Deleting rows reduces Cardinality from 35 to 30. Degree (number of columns) is completely unaffected and remains 5.",
    "hint": "Columns remain 5; rows become 35 - 5 = 30."
  },
  {
    "id": 12,
    "question": "If 1 column is dropped using 'ALTER TABLE STUDENT DROP COLUMN Stream;', what happens to Degree and Cardinality?",
    "options": [
      "Degree becomes 4, Cardinality remains 35",
      "Degree becomes 35, Cardinality becomes 4",
      "Degree becomes 6, Cardinality becomes 36",
      "Both become 0"
    ],
    "correctAnswer": 0,
    "explanation": "Dropping an attribute reduces the number of columns from 5 to 4 (Degree = 4). The number of rows (35) is unchanged.",
    "hint": "Columns decrease by 1; rows remain unchanged."
  },
  {
    "id": 13,
    "question": "What is a mnemonic memory trick to never confuse Degree and Cardinality in board exams?",
    "options": [
      "'Degree' = Dimensions/Columns (Degrees of temperature rise vertically like columns); 'Cardinality' = Counting records (rows)",
      "Degree starts with D for Down (rows)",
      "There is no way to remember",
      "They both mean the same thing"
    ],
    "correctAnswer": 0,
    "explanation": "Degree = Number of columns/attributes; Cardinality = Counting number of rows/tuples.",
    "hint": "Degree = Columns; Cardinality = Counting Rows."
  },
  {
    "id": 14,
    "question": "A table has Degree 6 and Cardinality 10. How many individual cell values (data entries) are stored in this relation?",
    "options": [
      "60 data cells (Degree * Cardinality)",
      "16 data cells",
      "4 data cells",
      "600 data cells"
    ],
    "correctAnswer": 0,
    "explanation": "Total cells in a table grid = Number of columns * Number of rows = 6 * 10 = 60 values.",
    "hint": "Multiply columns by rows."
  },
  {
    "id": 15,
    "question": "What command in SQL can modify the Degree of an existing table?",
    "options": [
      "ALTER TABLE ... ADD / DROP COLUMN",
      "UPDATE table SET column = value",
      "INSERT INTO table VALUES",
      "SELECT * FROM table"
    ],
    "correctAnswer": 0,
    "explanation": "ALTER TABLE with ADD COLUMN or DROP COLUMN changes the column count, thus altering the Degree of the relation.",
    "hint": "ALTER TABLE modifies the table structure."
  },
  {
    "id": 16,
    "question": "What commands in SQL directly modify the Cardinality of an existing table?",
    "options": [
      "INSERT, DELETE, and TRUNCATE",
      "CREATE TABLE and DROP TABLE",
      "GRANT and REVOKE",
      "SELECT and ORDER BY"
    ],
    "correctAnswer": 0,
    "explanation": "INSERT adds rows (increasing cardinality); DELETE and TRUNCATE remove rows (decreasing cardinality).",
    "hint": "DML commands that add or remove rows."
  },
  {
    "id": 17,
    "question": "Does executing a 'SELECT * FROM Table;' query change the Degree or Cardinality of the underlying table?",
    "options": [
      "No, SELECT is a read-only query and leaves both Degree and Cardinality completely unchanged",
      "Yes, it doubles the cardinality",
      "Yes, it deletes all columns",
      "Yes, it sets cardinality to 0"
    ],
    "correctAnswer": 0,
    "explanation": "SELECT queries only read and project data onto the screen; they never modify the underlying stored relation.",
    "hint": "SELECT is read-only; no structural or data changes occur."
  },
  {
    "id": 18,
    "question": "If table T1 has 3 attributes and 4 rows, and table T2 has 2 attributes and 3 rows, what is the Degree of their Cartesian Product (T1 x T2)?",
    "options": [
      "Degree = 3 + 2 = 5",
      "Degree = 3 * 2 = 6",
      "Degree = 4 + 3 = 7",
      "Degree = 4 * 3 = 12"
    ],
    "correctAnswer": 0,
    "explanation": "In a Cartesian Product (Cross Join), Degree is additive: Degree(T1 x T2) = Degree(T1) + Degree(T2) = 3 + 2 = 5.",
    "hint": "Degrees add together in a Cartesian product."
  },
  {
    "id": 19,
    "question": "In the same scenario (T1: 3 attributes, 4 rows; T2: 2 attributes, 3 rows), what is the Cardinality of their Cartesian Product (T1 x T2)?",
    "options": [
      "Cardinality = 4 * 3 = 12",
      "Cardinality = 4 + 3 = 7",
      "Cardinality = 3 + 2 = 5",
      "Cardinality = 3 * 2 = 6"
    ],
    "correctAnswer": 0,
    "explanation": "In a Cartesian Product, Cardinality is multiplicative: Cardinality(T1 x T2) = Cardinality(T1) * Cardinality(T2) = 4 * 3 = 12.",
    "hint": "Cardinalities multiply in a Cartesian product."
  },
  {
    "id": 20,
    "question": "In a CBSE question: 'Table TEACHER has Degree 4 and Cardinality 15. If TRUNCATE TABLE TEACHER; is executed, what is the new Degree and Cardinality?'",
    "options": [
      "Degree = 4, Cardinality = 0",
      "Degree = 0, Cardinality = 0",
      "Degree = 0, Cardinality = 15",
      "Degree = 4, Cardinality = 15"
    ],
    "correctAnswer": 0,
    "explanation": "TRUNCATE empties all rows (Cardinality becomes 0) but retains the table structure and columns (Degree remains 4).",
    "hint": "TRUNCATE removes all rows but preserves columns."
  },
  {
    "id": 21,
    "question": "If an administrator executes 'DROP TABLE TEACHER;', what happens to Degree and Cardinality?",
    "options": [
      "The table ceases to exist entirely; both structure and data are removed from the database",
      "Degree becomes 4 and Cardinality becomes 0",
      "Degree becomes 0 and Cardinality becomes 4",
      "Only rows are deleted"
    ],
    "correctAnswer": 0,
    "explanation": "DROP TABLE deletes the entire relation schema and data from the data dictionary; the table no longer exists.",
    "hint": "DROP TABLE removes the entire table from existence."
  },
  {
    "id": 22,
    "question": "Can a valid relational table have Degree = 0?",
    "options": [
      "No, a relation must have at least one attribute defined in its schema",
      "Yes, all tables start with Degree 0",
      "Yes, if the table has no rows",
      "Only in SQLite"
    ],
    "correctAnswer": 0,
    "explanation": "In relational theory and SQL standards, a table cannot be created without defining at least one attribute column.",
    "hint": "A table must possess at least one column."
  },
  {
    "id": 23,
    "question": "Can a valid relational table have Cardinality = 0?",
    "options": [
      "Yes, an empty table with defined columns but zero rows has Cardinality = 0",
      "No, every table must contain at least one row",
      "Only if the table is corrupted",
      "Never in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "An empty table (e.g. right after CREATE TABLE or after TRUNCATE) has Cardinality 0.",
    "hint": "An empty table has Cardinality 0."
  },
  {
    "id": 24,
    "question": "In a CBSE 2-mark question: 'Distinguish between Degree and Cardinality with an example.' What is the model answer?",
    "options": [
      "Degree is the number of attributes/columns, while Cardinality is the number of tuples/rows in a relation. Example: Table STUDENT(RollNo, Name, Marks) with 40 students has Degree = 3 and Cardinality = 40.",
      "Degree is for numbers and Cardinality is for text",
      "Degree is the size of the hard disk and Cardinality is the RAM size",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "State the definitions clearly (Degree = columns, Cardinality = rows) and provide a clean illustrative example with numbers.",
    "hint": "Define Degree (columns) and Cardinality (rows) with a simple table example."
  },
  {
    "id": 25,
    "question": "In summary, what is the universal rule for Cartesian Product of two tables A and B?",
    "options": [
      "Degree(A x B) = Degree(A) + Degree(B), while Cardinality(A x B) = Cardinality(A) * Cardinality(B)",
      "Degree multiplies, Cardinality adds",
      "Both add together",
      "Both multiply together"
    ],
    "correctAnswer": 0,
    "explanation": "Universal Cartesian Product Rule: Degrees ADD (+) and Cardinalities MULTIPLY (*).",
    "hint": "Degrees add (+); Cardinalities multiply (*)."
  }
];
