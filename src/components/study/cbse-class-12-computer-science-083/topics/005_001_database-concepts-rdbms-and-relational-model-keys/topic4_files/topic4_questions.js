export default [
  {
    "id": 1,
    "question": "What is the definition of the 'Domain' of an attribute in relational database theory?",
    "options": [
      "The pool or set of all permitted, legal atomic values from which an attribute can draw its actual value",
      "The website URL of the database server",
      "The physical hard disk sector address",
      "The password required to open a table"
    ],
    "correctAnswer": 0,
    "explanation": "A Domain is the collection of all valid, permissible atomic values defined for an attribute (e.g. Domain of Marital_Status = {'Single', 'Married', 'Divorced', 'Widowed'}).",
    "hint": "The pool of allowable values for a specific attribute."
  },
  {
    "id": 2,
    "question": "What does the concept of 'Atomic Values' mean in the Relational Data Model?",
    "options": [
      "Each cell in a table must contain exactly one single, indivisible data value that cannot be broken down further",
      "Values stored as subatomic particles",
      "Values that change every second automatically",
      "Values that only store positive numbers"
    ],
    "correctAnswer": 0,
    "explanation": "Atomic values are indivisible. In relational tables (First Normal Form), each attribute cell must hold a single scalar value, not a list, set, or composite record.",
    "hint": "Indivisible single value per cell."
  },
  {
    "id": 3,
    "question": "If an attribute 'PhoneNumber' contains '9876543210, 9123456780' in a single cell, which relational rule is violated?",
    "options": [
      "Atomicity of Attribute Values (violating First Normal Form 1NF)",
      "Primary Key constraint",
      "Security constraint",
      "Foreign Key constraint"
    ],
    "correctAnswer": 0,
    "explanation": "Storing multiple comma-separated values in a single cell violates the atomicity requirement of the Relational Model and 1NF.",
    "hint": "Multiple values stored in one cell violate atomicity."
  },
  {
    "id": 4,
    "question": "How should a multi-valued attribute like 'PhoneNumber' (where a person may have 3 numbers) be properly modeled in an RDBMS?",
    "options": [
      "By creating a separate child relation (e.g. StudentPhone) with StudentId and Phone as distinct rows",
      "By putting all 3 numbers separated by semicolons in one cell",
      "By ignoring additional phone numbers",
      "By converting the numbers to Roman numerals"
    ],
    "correctAnswer": 0,
    "explanation": "To preserve atomicity, multi-valued attributes are modeled in a separate table where each individual phone number occupies its own row linked by a foreign key.",
    "hint": "Separate relation with one phone number per row."
  },
  {
    "id": 5,
    "question": "What is a 'Composite Attribute' in database modeling?",
    "options": [
      "An attribute that can be divided into smaller sub-parts with independent meanings (e.g. Name divided into FirstName, MiddleName, LastName)",
      "An attribute that holds audio and video together",
      "An attribute that is calculated with a formula",
      "A column that cannot be deleted"
    ],
    "correctAnswer": 0,
    "explanation": "Composite attributes (like Full Name or Complete Address) can be broken down into constituent sub-components (FirstName, LastName or HouseNo, City, Pincode).",
    "hint": "An attribute made of smaller meaningful sub-parts."
  },
  {
    "id": 6,
    "question": "In relational table design, how are composite attributes like 'Address' best handled?",
    "options": [
      "By flattening and storing each atomic component as an independent column: HouseNo, Street, City, State, Pincode",
      "By storing the entire paragraph in an image file",
      "By combining it with the employee's date of birth",
      "By leaving the cell blank"
    ],
    "correctAnswer": 0,
    "explanation": "To maintain 1NF atomicity and enable precise queries (e.g. finding all students in 'Kolkata'), composite attributes are decomposed into distinct atomic columns.",
    "hint": "Decompose into separate atomic columns like City, State, Pincode."
  },
  {
    "id": 7,
    "question": "Which SQL mechanism enforces domain constraints on a column to restrict values within an allowable range?",
    "options": [
      "CHECK constraint (e.g. CHECK (Age >= 18 AND Age <= 60))",
      "GROUP BY clause",
      "ORDER BY clause",
      "DROP TABLE command"
    ],
    "correctAnswer": 0,
    "explanation": "The CHECK constraint validates that values entered into a column satisfy a specific boolean condition, directly enforcing domain integrity.",
    "hint": "CHECK constraint validates values against domain rules."
  },
  {
    "id": 8,
    "question": "What is the domain of an attribute defined with SQL data type 'DATE'?",
    "options": [
      "All valid calendar dates according to the Gregorian calendar (typically in 'YYYY-MM-DD' format)",
      "Any arbitrary sequence of alphabets",
      "Floating-point numbers with 2 decimals",
      "Binary image pixels"
    ],
    "correctAnswer": 0,
    "explanation": "The DATE data type restricts domain values strictly to valid calendar dates within the range recognized by SQL engines.",
    "hint": "Valid calendar dates in standard format."
  },
  {
    "id": 9,
    "question": "If the domain of attribute 'Gender' is defined as {'M', 'F', 'O'}, what happens if an application attempts to insert 'Male'?",
    "options": [
      "The DBMS rejects the insertion with a domain/check constraint violation error",
      "The DBMS truncates it to 'M' automatically without warning",
      "The entire database is deleted",
      "The value is converted into 0"
    ],
    "correctAnswer": 0,
    "explanation": "Because 'Male' is not an element of the specified domain {'M', 'F', 'O'}, the DBMS strictly rejects the row to preserve domain integrity.",
    "hint": "DBMS strictly rejects values outside the domain."
  },
  {
    "id": 10,
    "question": "What is the relationship between an SQL Data Type and an Attribute Domain?",
    "options": [
      "An SQL data type defines the broad physical storage domain, while constraints (CHECK, NOT NULL) further narrow it down to the business domain",
      "They are completely unrelated concepts",
      "Data type is for hardware and domain is for the internet",
      "A domain can have multiple data types"
    ],
    "correctAnswer": 0,
    "explanation": "An SQL data type (like INT) sets the technical domain; adding 'CHECK (Marks BETWEEN 0 AND 100)' restricts it to the specific business domain.",
    "hint": "Data type defines technical domain; constraints define business domain."
  },
  {
    "id": 11,
    "question": "In a CBSE 1-mark question: 'Can an attribute draw values from two completely different domains simultaneously (e.g. half numbers, half dates)?'",
    "options": [
      "No, all values in an attribute must be drawn from the single, homogeneous domain defined for that attribute",
      "Yes, any cell can store any data type in a relational table",
      "Yes, if the table has fewer than 10 rows",
      "Only in MySQL"
    ],
    "correctAnswer": 0,
    "explanation": "A fundamental property of the relational model is that each attribute is homogeneous: all values in that column must belong to the exact same domain.",
    "hint": "Attributes are homogeneous; all entries must belong to the same domain."
  },
  {
    "id": 12,
    "question": "Why is First Normal Form (1NF) considered the fundamental building block of the relational model?",
    "options": [
      "Because 1NF strictly mandates that all attribute values in a relation must be atomic",
      "Because 1NF requires all tables to be named in uppercase",
      "Because 1NF deletes duplicate tables",
      "Because 1NF converts tables to HTML"
    ],
    "correctAnswer": 0,
    "explanation": "By definition, a table is not even considered a valid relational table unless it satisfies First Normal Form (all domain values are atomic).",
    "hint": "1NF defines the atomicity requirement of tables."
  },
  {
    "id": 13,
    "question": "Which of the following values is NON-ATOMIC in a relational column?",
    "options": [
      "['Football', 'Cricket', 'Chess'] (a list of hobbies)",
      "95",
      "'2026-11-28'",
      "'Barrackpore'"
    ],
    "correctAnswer": 0,
    "explanation": "A list of multiple items inside a single cell is non-atomic and composite, violating the First Normal Form atomicity rule.",
    "hint": "A list of hobbies in one cell is non-atomic."
  },
  {
    "id": 14,
    "question": "If a column 'Grade' has domain {'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D', 'E'}, how many distinct valid values can exist in that domain?",
    "options": [
      "Exactly 8 distinct valid values",
      "Infinite values",
      "Only 2 values",
      "Zero values"
    ],
    "correctAnswer": 0,
    "explanation": "Counting the elements in the defined set: A1, A2, B1, B2, C1, C2, D, E = 8 valid domain values.",
    "hint": "Count the elements in the domain set."
  },
  {
    "id": 15,
    "question": "In relational theory, what is a 'Null Domain'?",
    "options": [
      "The inclusion of the special marker NULL to represent unknown or inapplicable values within an attribute's domain",
      "A domain that contains zero bytes",
      "A deleted table",
      "An empty database server"
    ],
    "correctAnswer": 0,
    "explanation": "Unless restricted by a NOT NULL constraint, the domain of an attribute implicitly includes NULL to handle missing or unassigned values.",
    "hint": "Permitting NULL as a valid absent-value state."
  },
  {
    "id": 16,
    "question": "What does the SQL constraint 'CHECK (Salary > 0)' enforce on the Salary attribute domain?",
    "options": [
      "It restricts the domain strictly to positive numeric values, rejecting zero or negative amounts",
      "It rounds salary to the nearest thousand",
      "It automatically pays salary on the 1st of every month",
      "It doubles the salary"
    ],
    "correctAnswer": 0,
    "explanation": "The CHECK constraint enforces that every inserted or updated Salary value must be strictly greater than zero.",
    "hint": "Only positive numbers are permitted."
  },
  {
    "id": 17,
    "question": "Why does storing non-atomic values make writing SQL queries difficult and inefficient?",
    "options": [
      "Standard SQL operations like WHERE, JOIN, and ORDER BY cannot efficiently index, search, or aggregate elements hidden inside complex text strings",
      "Because computers stop working when commas are typed",
      "Because non-atomic values consume all RAM",
      "Because SQL only works with 1-character words"
    ],
    "correctAnswer": 0,
    "explanation": "Searching inside comma-separated strings requires slow LIKE '%term%' pattern matching, completely bypassing indexes and degrading query speed.",
    "hint": "SQL cannot index or filter elements inside comma-separated text efficiently."
  },
  {
    "id": 18,
    "question": "What is an attribute's 'Data Type' in SQL terminology?",
    "options": [
      "A specification that defines the type of data (numeric, character, date/time) and operations that can be performed on the attribute",
      "A font style in Microsoft Word",
      "The brand name of the hard disk",
      "A programming language compiler"
    ],
    "correctAnswer": 0,
    "explanation": "An SQL data type defines the classification of data, acceptable formats, memory allocation, and valid operations for that column.",
    "hint": "Defines the type, format, and allowable operations on column values."
  },
  {
    "id": 19,
    "question": "In a CBSE question: 'A table STUDENT has an attribute DOB (Date of Birth). What is the appropriate data type and domain?'",
    "options": [
      "Data type: DATE; Domain: Valid calendar dates on or before the current date",
      "Data type: VARCHAR(100); Domain: Any random text",
      "Data type: INT; Domain: Any negative number",
      "Data type: FLOAT; Domain: Fractions"
    ],
    "correctAnswer": 0,
    "explanation": "Date of Birth represents a calendar date that must be in the past, making the DATE data type with a valid historical date domain appropriate.",
    "hint": "DATE data type representing valid past calendar dates."
  },
  {
    "id": 20,
    "question": "Can two different attributes in the same relation share the exact same domain?",
    "options": [
      "Yes, multiple attributes can draw values from the same domain (e.g. 'Marks_Maths' and 'Marks_Physics' both draw from domain 0 to 100)",
      "No, every column must have a unique domain",
      "Only if the columns have identical names",
      "Only on Sundays"
    ],
    "correctAnswer": 0,
    "explanation": "Different columns representing similar physical quantities (like marks in different subjects or HomePhone and WorkPhone) share the same underlying domain.",
    "hint": "Marks_Maths and Marks_Physics can share the same 0-100 score domain."
  },
  {
    "id": 21,
    "question": "What term describes an attribute that can be derived or calculated from other stored attributes (e.g. Age derived from DateOfBirth)?",
    "options": [
      "Derived Attribute",
      "Composite Attribute",
      "Atomic Attribute",
      "Foreign Attribute"
    ],
    "correctAnswer": 0,
    "explanation": "A Derived Attribute is not stored physically in the table; its value is dynamically calculated from stored base attributes (e.g. Age = CurrentDate - DOB).",
    "hint": "Calculated dynamically from another base attribute."
  },
  {
    "id": 22,
    "question": "In standard CBSE curriculum, what is the best practice for storing Derived Attributes?",
    "options": [
      "Avoid storing them physically to prevent redundancy and inconsistency; calculate them dynamically using SQL expressions in queries or views",
      "Store them in 5 separate backup files",
      "Write them on paper notes",
      "Convert them to Roman numerals"
    ],
    "correctAnswer": 0,
    "explanation": "Storing derived values (like Age or Total Marks) leads to update anomalies if the base values change; computing them dynamically via queries is best practice.",
    "hint": "Compute dynamically to prevent update anomalies."
  },
  {
    "id": 23,
    "question": "What does 'Domain Integrity' ensure across a relational database?",
    "options": [
      "All values present in an attribute strictly conform to the defined data type, length, nullability, and permissible value range",
      "The database domain name (.com) never expires",
      "All computer screens show identical colors",
      "Only one person can access the server"
    ],
    "correctAnswer": 0,
    "explanation": "Domain integrity guarantees that values in each column adhere strictly to valid format, range, and type definitions.",
    "hint": "Column values conform to valid types and range constraints."
  },
  {
    "id": 24,
    "question": "Which of the following represents an atomic value?",
    "options": [
      "Integer 42",
      "Set of numbers {1, 2, 3}",
      "Nested JSON object {'street': 'Main St', 'pin': 700120}",
      "Comma-separated list 'Red, Green, Blue'"
    ],
    "correctAnswer": 0,
    "explanation": "The integer 42 is a single scalar value that cannot be broken down further into constituent parts, making it completely atomic.",
    "hint": "A single scalar integer."
  },
  {
    "id": 25,
    "question": "In summary, what are the two golden rules regarding attributes in the Relational Data Model?",
    "options": [
      "Attributes must have a defined Domain, and all cell values must be strictly Atomic",
      "Attributes must be sorted alphabetically, and cells must hold arrays",
      "Attributes must have random names, and rows must hold images",
      "Attributes cannot have data types"
    ],
    "correctAnswer": 0,
    "explanation": "The two foundational principles: (1) Every attribute has a defined domain of legal values, and (2) All attribute values must be indivisible and atomic.",
    "hint": "Defined Domain and Atomic Values."
  }
];
