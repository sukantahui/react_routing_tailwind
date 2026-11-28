export default [
  {
    "id": 1,
    "question": "What is a 'Primary Key' in a Relational Database Management System?",
    "options": [
      "The specific Candidate Key chosen by the database designer to uniquely identify tuples in a relation",
      "The first column in every table",
      "The password used to access the database",
      "The key used to encrypt the database"
    ],
    "correctAnswer": 0,
    "explanation": "A Primary Key is the designated candidate key selected by the designer to uniquely identify rows and enforce entity integrity.",
    "hint": "The chosen candidate key for unique row identification."
  },
  {
    "id": 2,
    "question": "What are the two mandatory properties that every Primary Key attribute MUST strictly satisfy?",
    "options": [
      "UNIQUE (no duplicate values) and NOT NULL (no missing values)",
      "Numeric and sorted in ascending order",
      "Capitalized and less than 10 characters",
      "Foreign key and encrypted"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity mandates that a Primary Key must be strictly UNIQUE (no two rows share the same key) and NOT NULL (no row can have an empty/missing key).",
    "hint": "UNIQUE and NOT NULL."
  },
  {
    "id": 3,
    "question": "How many Primary Keys can a single relation (table) have?",
    "options": [
      "Exactly ONE Primary Key per relation",
      "Up to five Primary Keys",
      "As many as the user wants",
      "Zero Primary Keys"
    ],
    "correctAnswer": 0,
    "explanation": "In the relational model, a table can have only ONE Primary Key (though it can be composed of multiple columns as a composite primary key).",
    "hint": "Only one Primary Key per table."
  },
  {
    "id": 4,
    "question": "What is a 'Composite Primary Key'?",
    "options": [
      "A primary key composed of two or more attributes combined together to guarantee unique identification",
      "A primary key made of numbers and letters",
      "A primary key that changes automatically",
      "A primary key with multiple duplicate rows"
    ],
    "correctAnswer": 0,
    "explanation": "A Composite Primary Key is formed by combining multiple columns (e.g. OrderId + ItemId) when no single column alone is unique.",
    "hint": "Primary key made of two or more combined columns."
  },
  {
    "id": 5,
    "question": "What happens if a user tries to execute an INSERT statement omitting the Primary Key or setting it to NULL?",
    "options": [
      "The DBMS rejects the insertion with a 'Column cannot be null' constraint violation error",
      "The DBMS assigns a random string automatically",
      "The row is saved in a secret temporary file",
      "The database shuts down"
    ],
    "correctAnswer": 0,
    "explanation": "Because primary keys enforce NOT NULL, omitting a value or passing NULL causes an immediate constraint violation error.",
    "hint": "DBMS rejects NULL with an error."
  },
  {
    "id": 6,
    "question": "What happens if a user tries to insert a record with a Primary Key value that already exists in the table?",
    "options": [
      "The DBMS rejects the insertion with a 'Duplicate entry for key PRIMARY' error",
      "The existing record is silently deleted",
      "The existing record is appended to the new record",
      "The table converts to a CSV file"
    ],
    "correctAnswer": 0,
    "explanation": "Primary keys strictly prohibit duplicate values; any duplicate insertion attempt is rejected to preserve uniqueness.",
    "hint": "Rejected with a duplicate entry error."
  },
  {
    "id": 7,
    "question": "In relation STUDENT(AdmNo, RollNo, Name, Email), both AdmNo and Email are Candidate Keys. Why is AdmNo generally preferred as the Primary Key over Email?",
    "options": [
      "AdmNo is compact, integer-based, immutable (never changes), whereas Email can change or be lengthy text",
      "Email is not allowed in databases",
      "AdmNo has fewer syllables",
      "Email cannot be indexed"
    ],
    "correctAnswer": 0,
    "explanation": "Integer-based immutable identifiers (like AdmNo) provide superior indexing performance and eliminate cascading updates when emails change.",
    "hint": "Compact, integer-based, and immutable."
  },
  {
    "id": 8,
    "question": "What is 'Entity Integrity' in the Relational Data Model?",
    "options": [
      "The rule stating that no primary key value can be NULL, ensuring that every tuple has a distinct, identifiable existence",
      "The rule that all students must pass exams",
      "The rule that passwords must contain symbols",
      "The rule that tables must be backed up daily"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity ensures that each entity record is distinctly identifiable by prohibiting NULLs in any primary key attribute.",
    "hint": "No primary key value can be NULL."
  },
  {
    "id": 9,
    "question": "In SQL DDL, how is a single-column Primary Key defined during table creation?",
    "options": [
      "CREATE TABLE Student (RollNo INT PRIMARY KEY, Name VARCHAR(30));",
      "CREATE TABLE Student (RollNo INT KEY, Name VARCHAR(30));",
      "CREATE TABLE Student (RollNo INT UNIQUE, Name VARCHAR(30));",
      "CREATE TABLE Student (RollNo INT MASTER, Name VARCHAR(30));"
    ],
    "correctAnswer": 0,
    "explanation": "The standard SQL column constraint syntax is '<column_name> <data_type> PRIMARY KEY'.",
    "hint": "PRIMARY KEY keyword after the data type."
  },
  {
    "id": 10,
    "question": "How is a Composite Primary Key declared in an SQL CREATE TABLE statement?",
    "options": [
      "At the table level: PRIMARY KEY (Column1, Column2)",
      "By writing PRIMARY KEY after each column name separately",
      "Using COMPOSITE KEY (Column1, Column2)",
      "Using DOUBLE KEY (Column1, Column2)"
    ],
    "correctAnswer": 0,
    "explanation": "Composite primary keys are declared at the table level using the syntax: PRIMARY KEY (col1, col2, ...).",
    "hint": "Table-level constraint: PRIMARY KEY (col1, col2)."
  },
  {
    "id": 11,
    "question": "Why should mutable attributes (attributes that change frequently, like PhoneNumber or HomeAddress) NEVER be chosen as a Primary Key?",
    "options": [
      "Modifying a primary key value requires cascading updates across all referencing foreign keys in related tables, causing performance and consistency overhead",
      "Because text attributes cannot be stored in databases",
      "Because phone numbers cause viruses",
      "Because addresses have too many vowels"
    ],
    "correctAnswer": 0,
    "explanation": "Changing a primary key value breaks referential integrity unless complex, costly cascading updates are performed across foreign key child tables.",
    "hint": "Changing a primary key requires cascading updates across foreign key child tables."
  },
  {
    "id": 12,
    "question": "In a CBSE 2-mark question: 'Can a table have two PRIMARY KEY constraints?'",
    "options": [
      "No, a relation can have only one Primary Key constraint (though it may contain multiple columns as a composite key)",
      "Yes, a table can have up to 10 primary keys",
      "Yes, one for numbers and one for text",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "SQL and relational theory permit exactly one Primary Key per relation. Other unique candidate keys are enforced with the UNIQUE constraint.",
    "hint": "Only one primary key constraint is permitted per table."
  },
  {
    "id": 13,
    "question": "What is the difference between a PRIMARY KEY constraint and a UNIQUE constraint in SQL?",
    "options": [
      "PRIMARY KEY strictly forbids NULL values and only one can exist per table; UNIQUE allows NULL values and multiple UNIQUE constraints can exist per table",
      "There is no difference",
      "UNIQUE is only for text and PRIMARY KEY is only for numbers",
      "PRIMARY KEY can have duplicates"
    ],
    "correctAnswer": 0,
    "explanation": "PRIMARY KEY rejects NULLs and is singular (1 per table); UNIQUE permits NULLs and multiple UNIQUE constraints can be defined on a single table.",
    "hint": "PRIMARY KEY = 1 per table and NOT NULL; UNIQUE = multiple permitted and allows NULL."
  },
  {
    "id": 14,
    "question": "In table FLIGHT_BOOKING(FlightNo, PassengerId, SeatNo, TravelDate), which attribute combination forms the Composite Primary Key?",
    "options": [
      "(FlightNo, TravelDate, SeatNo)",
      "PassengerId alone",
      "SeatNo alone",
      "FlightNo alone"
    ],
    "correctAnswer": 0,
    "explanation": "The same seat on a flight can be booked on different dates. The combination (FlightNo, TravelDate, SeatNo) guarantees a unique reservation record.",
    "hint": "FlightNo + TravelDate + SeatNo."
  },
  {
    "id": 15,
    "question": "Why is a surrogate key (an auto-incrementing synthetic integer like ID INT AUTO_INCREMENT) often used as a Primary Key?",
    "options": [
      "It provides a simple, compact, immutable, unique integer that maximizes index lookup performance and avoids real-world identity issues",
      "Because real-world data cannot be stored in computers",
      "Because letters take up too much memory",
      "Because surrogate keys are required by law"
    ],
    "correctAnswer": 0,
    "explanation": "Surrogate keys (auto-incrementing integers) guarantee uniqueness, immutability, compact 4-byte indexing, and zero dependency on changing real-world business attributes.",
    "hint": "Auto-incrementing integer provides immutable, fast indexing."
  },
  {
    "id": 16,
    "question": "In relation DOCTOR(DocId, DocName, Dept, RoomNo), if DocId is designated as the Primary Key, what does this guarantee?",
    "options": [
      "Every doctor record has a distinct, non-null DocId, and no two doctors can ever share the same DocId",
      "All doctors earn the same salary",
      "Doctor names are sorted alphabetically",
      "Only one doctor works in the hospital"
    ],
    "correctAnswer": 0,
    "explanation": "Making DocId the Primary Key guarantees that every doctor record is uniquely identifiable and no duplicates or NULLs are admitted.",
    "hint": "Unambiguous, unique, non-null identification for every doctor."
  },
  {
    "id": 17,
    "question": "Can an existing table have its Primary Key modified or dropped using SQL?",
    "options": [
      "Yes, using 'ALTER TABLE table_name DROP PRIMARY KEY;' and 'ALTER TABLE table_name ADD PRIMARY KEY (...);'",
      "No, once a primary key is created it can never be altered",
      "Only by deleting the entire computer operating system",
      "Only by purchasing a new license"
    ],
    "correctAnswer": 0,
    "explanation": "ALTER TABLE commands allow administrators to drop an existing primary key and define a new one if schema requirements evolve.",
    "hint": "ALTER TABLE DROP PRIMARY KEY / ADD PRIMARY KEY."
  },
  {
    "id": 18,
    "question": "What underlying data structure does an RDBMS engine automatically construct when a PRIMARY KEY is defined?",
    "options": [
      "A B-Tree (or B+ Tree) Index / Clustered Index",
      "A linked list",
      "A circular queue",
      "A stack"
    ],
    "correctAnswer": 0,
    "explanation": "RDBMS engines automatically generate a clustered B+ Tree index on the primary key to ensure O(log N) lookup speeds and instant uniqueness verification.",
    "hint": "Clustered B-Tree index."
  },
  {
    "id": 19,
    "question": "In relation STUDENT(RollNo, Name, Marks), if RollNo is the Primary Key, can two students named 'Aman Sharma' be enrolled?",
    "options": [
      "Yes, because their RollNo values will be distinct (e.g. 101 and 105), which satisfies primary key uniqueness",
      "No, duplicate names are illegal in RDBMS",
      "Only if one Aman changes his name",
      "Only if one is in a different school"
    ],
    "correctAnswer": 0,
    "explanation": "Primary key uniqueness applies strictly to the primary key attribute (RollNo); non-key attributes like Name can freely contain duplicate values.",
    "hint": "Uniqueness applies to the primary key (RollNo), not to non-key attributes."
  },
  {
    "id": 20,
    "question": "In a CBSE board exam: 'Identify the primary key of table VEHICLE having fields (RegNo, OwnerName, EngineNo, Model, Color).' Give justification.",
    "options": [
      "RegNo (Registration Number), because each vehicle is officially assigned a unique, immutable registration number",
      "Color, because cars have different colors",
      "Model, because cars have models",
      "OwnerName, because people own cars"
    ],
    "correctAnswer": 0,
    "explanation": "RegNo is uniquely issued to each vehicle by transport authorities, never repeated, and serves as the standard natural primary key.",
    "hint": "Registration number is unique and official."
  },
  {
    "id": 21,
    "question": "If a composite primary key is defined as (DeptNo, EmpNo), can a tuple have DeptNo = 10 and EmpNo = NULL?",
    "options": [
      "No, Entity Integrity strictly prohibits ANY component attribute of a primary key from being NULL",
      "Yes, provided DeptNo is not null",
      "Yes, NULL is allowed in composite keys",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity rule states: No component of a primary key can be NULL. Both DeptNo and EmpNo must have valid non-null values.",
    "hint": "No component of a primary key can be NULL."
  },
  {
    "id": 22,
    "question": "In a banking database, what happens if an ATM card transaction attempts to withdraw money using an AccountNumber that does not exist in the primary key index?",
    "options": [
      "The transaction is rejected immediately with 'Account Not Found' error",
      "A new account is created automatically with free money",
      "The ATM gives all its cash",
      "The database crashes"
    ],
    "correctAnswer": 0,
    "explanation": "The engine searches the primary key index; if no matching key is found, the transaction aborts with an invalid account error.",
    "hint": "Immediate lookup failure and transaction rejection."
  },
  {
    "id": 23,
    "question": "Which of the following is NOT a good practice when choosing a Primary Key?",
    "options": [
      "Choosing a long, descriptive text column that frequently changes (e.g. HomeAddress or CustomerRemarks)",
      "Choosing an auto-incrementing integer ID",
      "Choosing an immutable government ID (e.g. Aadhaar)",
      "Choosing a short fixed-length alphanumeric code (e.g. CourseCode)"
    ],
    "correctAnswer": 0,
    "explanation": "Long, mutable text fields make terrible primary keys because they degrade indexing performance and trigger cascading updates.",
    "hint": "Avoid mutable, long descriptive text fields."
  },
  {
    "id": 24,
    "question": "In CBSE board marking schemes, what are the three keywords evaluators look for when defining Primary Key?",
    "options": [
      "Candidate Key, Uniquely Identifies, NOT NULL",
      "Foreign Key, Float, Text",
      "Order By, Group By, Having",
      "Local Area Network, Star, Bus"
    ],
    "correctAnswer": 0,
    "explanation": "Standard grading rubric: 'A candidate key chosen to uniquely identify tuples in a relation; must be UNIQUE and NOT NULL.'",
    "hint": "Candidate Key, Unique, NOT NULL."
  },
  {
    "id": 25,
    "question": "In summary, what is the core difference between a Candidate Key and a Primary Key?",
    "options": [
      "Candidate keys are all eligible minimal unique keys; the Primary Key is the ONE chosen candidate key",
      "Candidate keys are for text and Primary Key is for numbers",
      "Candidate keys allow duplicates",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "All eligible unique minimal keys are candidate keys; the DBA chooses exactly ONE of them to serve as the official Primary Key.",
    "hint": "Candidate keys = all eligible options; Primary Key = the one chosen."
  }
];
