export default [
  {
    "id": 1,
    "question": "Which of the following is a direct consequence of Data Redundancy in traditional file systems?",
    "options": [
      "Data Inconsistency when updates are not applied to all duplicate copies",
      "Automatic SQL query generation",
      "Enhanced data security",
      "Faster database backup"
    ],
    "correctAnswer": 0,
    "explanation": "Data redundancy leads to data inconsistency because updating one departmental file leaves uncoordinated duplicate copies holding stale data.",
    "hint": "Redundancy leads directly to inconsistency."
  },
  {
    "id": 2,
    "question": "What does the 'Degree' of a relation represent?",
    "options": [
      "The total number of attributes (columns) in the relation",
      "The total number of tuples (rows)",
      "The number of primary keys",
      "The temperature of the server"
    ],
    "correctAnswer": 0,
    "explanation": "Degree is the number of attributes (columns) defined in the table schema.",
    "hint": "Degree = Number of columns."
  },
  {
    "id": 3,
    "question": "What does the 'Cardinality' of a relation represent?",
    "options": [
      "The total number of tuples (rows) in the relation",
      "The total number of columns",
      "The size of the hard disk in gigabytes",
      "The number of indexes"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality is the count of tuples (rows/records) currently stored in the relation.",
    "hint": "Cardinality = Number of rows."
  },
  {
    "id": 4,
    "question": "A table has 6 columns and 45 rows. What is its Degree and Cardinality?",
    "options": [
      "Degree = 6, Cardinality = 45",
      "Degree = 45, Cardinality = 6",
      "Degree = 270, Cardinality = 1",
      "Degree = 1, Cardinality = 270"
    ],
    "correctAnswer": 0,
    "explanation": "Columns = 6 (Degree = 6); Rows = 45 (Cardinality = 45).",
    "hint": "Degree = 6, Cardinality = 45."
  },
  {
    "id": 5,
    "question": "Table A has Degree 4 and Cardinality 10. Table B has Degree 3 and Cardinality 5. What is the Degree and Cardinality of their Cartesian Product (A x B)?",
    "options": [
      "Degree = 7, Cardinality = 50",
      "Degree = 12, Cardinality = 15",
      "Degree = 50, Cardinality = 7",
      "Degree = 7, Cardinality = 15"
    ],
    "correctAnswer": 0,
    "explanation": "Degree = 4 + 3 = 7 (Degrees ADD). Cardinality = 10 * 5 = 50 (Cardinalities MULTIPLY).",
    "hint": "Degree = 4 + 3 = 7; Cardinality = 10 * 5 = 50."
  },
  {
    "id": 6,
    "question": "What two properties MUST every Primary Key attribute satisfy?",
    "options": [
      "UNIQUE and NOT NULL",
      "Text only and sorted alphabetically",
      "Encrypted and lowercase",
      "Foreign key and numeric"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity requires that primary keys must be strictly UNIQUE and CANNOT BE NULL.",
    "hint": "UNIQUE and NOT NULL."
  },
  {
    "id": 7,
    "question": "What is an 'Alternate Key'?",
    "options": [
      "Any candidate key that was NOT selected as the primary key",
      "A key on the keyboard",
      "A key that alternates between numbers and text",
      "A foreign key in a third table"
    ],
    "correctAnswer": 0,
    "explanation": "Alternate Keys = Candidate Keys - Primary Key. Any unselected candidate key is an alternate key.",
    "hint": "Candidate key not chosen as primary key."
  },
  {
    "id": 8,
    "question": "What does the 'Referential Integrity Rule' mandate regarding foreign keys?",
    "options": [
      "A foreign key value must either match an existing primary key value in the parent table, or be NULL",
      "All tables must have the same column names",
      "Child tables cannot be viewed by users",
      "Parent tables cannot be updated"
    ],
    "correctAnswer": 0,
    "explanation": "Referential integrity requires every foreign key value to point to an existing parent primary key, or be NULL.",
    "hint": "Must match an existing parent primary key or be NULL."
  },
  {
    "id": 9,
    "question": "In a relationship between DEPARTMENT (parent) and EMPLOYEE (child), where DeptId in EMPLOYEE references DeptId in DEPARTMENT, what is DeptId in EMPLOYEE called?",
    "options": [
      "Foreign Key",
      "Primary Key",
      "Alternate Key",
      "Candidate Key"
    ],
    "correctAnswer": 0,
    "explanation": "DeptId in the child table references the primary key of the parent table, making it a Foreign Key.",
    "hint": "Referencing attribute in the child table is the Foreign Key."
  },
  {
    "id": 10,
    "question": "What happens if an administrator tries to insert an employee with DeptId = 88 into EMPLOYEE when Department 88 does not exist in DEPARTMENT?",
    "options": [
      "The DBMS rejects the insertion with a foreign key constraint violation error",
      "Department 88 is created automatically",
      "The employee is inserted with salary 0",
      "The table converts to a text file"
    ],
    "correctAnswer": 0,
    "explanation": "Referential integrity prevents orphan records; inserting a non-existent parent reference is blocked.",
    "hint": "Rejected due to foreign key constraint violation."
  },
  {
    "id": 11,
    "question": "What does 'Atomicity' in ACID properties guarantee?",
    "options": [
      "Either all operations of a transaction succeed, or the entire transaction is rolled back leaving the database unchanged ('All or Nothing')",
      "Each cell holds radioactive elements",
      "Tables cannot be indexed",
      "Only one person can log in"
    ],
    "correctAnswer": 0,
    "explanation": "Atomicity is the 'all-or-nothing' principle of transaction execution.",
    "hint": "All-or-nothing execution."
  },
  {
    "id": 12,
    "question": "What is the formal relational term for a horizontal row in a table?",
    "options": [
      "Tuple",
      "Attribute",
      "Relation",
      "Domain"
    ],
    "correctAnswer": 0,
    "explanation": "A horizontal row in a relational table is formally designated as a Tuple.",
    "hint": "Formal term for a row/record."
  },
  {
    "id": 13,
    "question": "What is the formal relational term for a vertical column in a table?",
    "options": [
      "Attribute",
      "Tuple",
      "Relation",
      "Domain"
    ],
    "correctAnswer": 0,
    "explanation": "A named vertical column in a table is formally designated as an Attribute.",
    "hint": "Formal term for a column/field."
  },
  {
    "id": 14,
    "question": "What is the formal relational term for a two-dimensional table?",
    "options": [
      "Relation",
      "Tuple",
      "Attribute",
      "Domain"
    ],
    "correctAnswer": 0,
    "explanation": "A 2D table in relational database theory is formally designated as a Relation.",
    "hint": "Formal term for a table."
  },
  {
    "id": 15,
    "question": "What is the 'Domain' of an attribute?",
    "options": [
      "The set of all permissible, legal atomic values from which an attribute draws its values",
      "The website domain of the school",
      "The folder path on the server",
      "The name of the database file"
    ],
    "correctAnswer": 0,
    "explanation": "A Domain is the pool of valid atomic values defined for a specific attribute.",
    "hint": "Set of all permissible values for an attribute."
  },
  {
    "id": 16,
    "question": "Can an attribute participating in a relation have non-atomic values (like a list of 5 hobbies in one cell)?",
    "options": [
      "No, relational tables strictly require all attribute values to be atomic (First Normal Form 1NF)",
      "Yes, cells can store any list or array",
      "Yes, up to 10 items",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "First Normal Form (1NF) strictly requires all cell values to be atomic and indivisible.",
    "hint": "All cell values must be atomic."
  },
  {
    "id": 17,
    "question": "What distinguishes a Candidate Key from a Super Key?",
    "options": [
      "A Candidate Key is a MINIMAL Super Key containing no redundant attributes",
      "A Candidate Key has duplicates",
      "A Candidate Key cannot be numeric",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "A Candidate Key is a minimal super key; removing any attribute from it destroys uniqueness.",
    "hint": "A candidate key is a minimal super key."
  },
  {
    "id": 18,
    "question": "If a table has candidate keys: RollNo, AdmNo, and AadhaarNo. If AdmNo is selected as Primary Key, how many Alternate Keys exist?",
    "options": [
      "2 Alternate Keys (RollNo and AadhaarNo)",
      "1 Alternate Key",
      "3 Alternate Keys",
      "0 Alternate Keys"
    ],
    "correctAnswer": 0,
    "explanation": "Candidate keys minus primary key = 3 - 1 = 2 alternate keys (RollNo and AadhaarNo).",
    "hint": "3 - 1 = 2 alternate keys."
  },
  {
    "id": 19,
    "question": "If 10 rows are deleted from a table having Degree 5 and Cardinality 50, what are the new values?",
    "options": [
      "Degree = 5, Cardinality = 40",
      "Degree = 0, Cardinality = 40",
      "Degree = 4, Cardinality = 50",
      "Degree = 5, Cardinality = 50"
    ],
    "correctAnswer": 0,
    "explanation": "Deleting rows reduces Cardinality from 50 to 40. Degree (columns) is untouched (5).",
    "hint": "Columns remain 5; rows become 50 - 10 = 40."
  },
  {
    "id": 20,
    "question": "What clause in a foreign key definition causes child records to be automatically deleted when the parent row is deleted?",
    "options": [
      "ON DELETE CASCADE",
      "ON DELETE RESTRICT",
      "ON DELETE BLOCK",
      "ON DELETE SET DEFAULT"
    ],
    "correctAnswer": 0,
    "explanation": "ON DELETE CASCADE propagates deletions from parent to referencing child rows.",
    "hint": "ON DELETE CASCADE."
  },
  {
    "id": 21,
    "question": "Which schema level in the ANSI-SPARC architecture describes how data is physically laid out on disk blocks and indexed?",
    "options": [
      "Internal (Physical) Level",
      "External Level",
      "Conceptual Level",
      "Presentation Level"
    ],
    "correctAnswer": 0,
    "explanation": "The Internal Level defines low-level physical storage, file structures, and B-tree indexes.",
    "hint": "Internal / Physical Level."
  },
  {
    "id": 22,
    "question": "Which schema level in the ANSI-SPARC architecture defines user-specific views and subschemas?",
    "options": [
      "External (View) Level",
      "Internal Level",
      "Conceptual Level",
      "Physical Level"
    ],
    "correctAnswer": 0,
    "explanation": "The External Level provides tailored views to specific user roles, hiding the rest of the database.",
    "hint": "External / View Level."
  },
  {
    "id": 23,
    "question": "In what order must parent and child records be inserted during data entry?",
    "options": [
      "Parent record first, then referencing child records",
      "Child record first, then parent record",
      "Order is completely irrelevant",
      "Both in the same millisecond"
    ],
    "correctAnswer": 0,
    "explanation": "The parent primary key must exist in the database before a child row can reference it.",
    "hint": "Parent record first, then child records."
  },
  {
    "id": 24,
    "question": "Can a Foreign Key column contain duplicate values in the child table?",
    "options": [
      "Yes, multiple child records can point to the same parent record (one-to-many relationship)",
      "No, foreign keys must always be unique",
      "Only if the table is empty",
      "Never"
    ],
    "correctAnswer": 0,
    "explanation": "In a 1:M relationship (e.g. Many employees in 1 department), the foreign key DeptId repeats across many rows.",
    "hint": "Yes, multiple child rows can share the same parent key."
  },
  {
    "id": 25,
    "question": "What is the single most important rule to guarantee full marks in CBSE Unit III questions on Keys?",
    "options": [
      "Remember: Candidate Keys are minimal unique keys; exactly ONE is Primary Key; the rest are Alternate Keys; Foreign Keys link child to parent enforcing Referential Integrity",
      "Memorize SQL keywords without understanding concepts",
      "Skip table relationship questions",
      "Only write answers in binary"
    ],
    "correctAnswer": 0,
    "explanation": "Mastering the key hierarchy and relationships guarantees complete accuracy across all 1-mark, 2-mark, and 3-mark questions in Unit III.",
    "hint": "Candidate Keys -> Primary Key & Alternate Keys -> Foreign Key linking child to parent."
  }
];
