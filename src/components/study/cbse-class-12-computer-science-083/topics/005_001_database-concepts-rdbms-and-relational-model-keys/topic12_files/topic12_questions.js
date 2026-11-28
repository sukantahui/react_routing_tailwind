export default [
  {
    "id": 1,
    "question": "Why is having a comprehensive Python relational simulation script beneficial for CBSE Class 12 Computer Science students?",
    "options": [
      "It lets students experimentally verify Candidate Key extraction, Degree/Cardinality calculations, and Referential Integrity before board exams",
      "It eliminates the need to study textbooks",
      "It replaces the MySQL server software entirely",
      "It writes board examination papers automatically"
    ],
    "correctAnswer": 0,
    "explanation": "Executing a programmatic simulator reinforces theoretical concepts like minimality, Cartesian products, and foreign key cascades through tangible code outputs.",
    "hint": "Experimental verification of theoretical relational rules."
  },
  {
    "id": 2,
    "question": "In the master Python relational engine, how is the Degree of a relation computed?",
    "options": [
      "len(relation.attributes) (the length of the attribute/column list)",
      "len(relation.rows)",
      "relation.rows * relation.attributes",
      "sum(relation.values)"
    ],
    "correctAnswer": 0,
    "explanation": "Degree is the count of attributes (columns); in Python, it is simply the length of the attribute list: len(attributes).",
    "hint": "Length of the column list."
  },
  {
    "id": 3,
    "question": "In the master Python relational engine, how is Cardinality computed?",
    "options": [
      "len(relation.tuples) (the total count of horizontal records)",
      "len(relation.columns)",
      "relation.columns ** 2",
      "max(relation.keys)"
    ],
    "correctAnswer": 0,
    "explanation": "Cardinality is the count of tuples (rows); in Python, it is the length of the rows list: len(tuples).",
    "hint": "Length of the rows list."
  },
  {
    "id": 4,
    "question": "What standard file format is used for the downloadable quick revision handbook?",
    "options": [
      ".txt (Universal Plain Text format)",
      ".exe (Binary executable)",
      ".dll (Dynamic Link Library)",
      ".docx (Word format)"
    ],
    "correctAnswer": 0,
    "explanation": "Plain text (.txt) files provide instant, universal readability across all operating systems, phones, and command lines without requiring proprietary software.",
    "hint": "Universal plain text format."
  },
  {
    "id": 5,
    "question": "In the master package, how does the script verify Entity Integrity when inserting a new tuple?",
    "options": [
      "It checks that pk_value is not None and not in existing_pk_set",
      "It checks if the name contains vowels",
      "It verifies that the user is logged into Windows",
      "It measures the length of the table name"
    ],
    "correctAnswer": 0,
    "explanation": "Entity Integrity mandates that primary key values must be NOT NULL (not None) and strictly UNIQUE (not in existing set).",
    "hint": "Checking not None and not already existing."
  },
  {
    "id": 6,
    "question": "In the master package, how is Referential Integrity validated when a child record is inserted?",
    "options": [
      "It verifies that child_fk_value is either None OR exists in the parent table's Primary Key set",
      "It verifies that both tables have the same number of rows",
      "It deletes all parent records",
      "It checks if the student passed"
    ],
    "correctAnswer": 0,
    "explanation": "The referential integrity check confirms that the foreign key value is either NULL (None) or present in the parent primary key set.",
    "hint": "Foreign key must be None or present in the parent table."
  },
  {
    "id": 7,
    "question": "What Python data structure cleanly simulates a relational tuple?",
    "options": [
      "A dictionary {attribute: value} or a namedtuple / tuple",
      "A single floating-point number",
      "A boolean flag",
      "A random string"
    ],
    "correctAnswer": 0,
    "explanation": "A Python dictionary mapping column names to values or a namedtuple perfectly represents a single relational tuple.",
    "hint": "Dictionary mapping column names to values."
  },
  {
    "id": 8,
    "question": "What algorithm is used in the downloadable simulator to discover all Candidate Keys?",
    "options": [
      "Combinatorial search testing attribute subsets for uniqueness and verifying that no proper subset is already unique (minimality check)",
      "Bubble sort on column lengths",
      "Binary search on row numbers",
      "Dijkstra's shortest path"
    ],
    "correctAnswer": 0,
    "explanation": "The script iterates over attribute combinations of increasing size, checks uniqueness, and discards any superset of an existing candidate key.",
    "hint": "Combinatorial uniqueness and minimality subset checks."
  },
  {
    "id": 9,
    "question": "In CBSE board questions, what is the weightage of Unit III (Database Management)?",
    "options": [
      "20 Marks out of the 70-mark theory paper",
      "5 Marks",
      "35 Marks",
      "70 Marks"
    ],
    "correctAnswer": 0,
    "explanation": "Unit III (Database Management & SQL) carries a major 20 marks in the CBSE Class 12 Computer Science (083) theory examination.",
    "hint": "20 marks out of 70."
  },
  {
    "id": 10,
    "question": "What function in modern web browsers enables the one-click download of the Python script directly from the interactive topic page?",
    "options": [
      "URL.createObjectURL() with a client-side Blob object",
      "window.close()",
      "document.clear()",
      "history.back()"
    ],
    "correctAnswer": 0,
    "explanation": "A client-side Blob paired with URL.createObjectURL creates a temporary download link, enabling instant offline saving.",
    "hint": "Blob object with URL.createObjectURL."
  },
  {
    "id": 11,
    "question": "In the downloadable revision handbook, what is emphasized as the core distinction between Schema and Instance?",
    "options": [
      "Schema is the structural blueprint (intension); Instance is the actual data at a specific moment (extension)",
      "Schema is for text and Instance is for numbers",
      "Schema changes every minute",
      "They are identical terms"
    ],
    "correctAnswer": 0,
    "explanation": "Schema represents the unchanging design; Instance represents the dynamic data content populated in the tables.",
    "hint": "Blueprint (Schema) vs Data at a moment (Instance)."
  },
  {
    "id": 12,
    "question": "Why should students practice writing SQL CREATE TABLE statements with constraints by hand?",
    "options": [
      "Board exam theory papers require writing exact SQL syntax with PRIMARY KEY and FOREIGN KEY ... REFERENCES constraints on paper",
      "Because computers are banned from schools",
      "Because SQL only works on paper",
      "Because keyboards damage databases"
    ],
    "correctAnswer": 0,
    "explanation": "The CBSE board theory exam is a pen-and-paper examination where precise SQL syntax and constraint declarations earn full marks.",
    "hint": "Board exam is a pen-and-paper exam requiring accurate SQL syntax."
  },
  {
    "id": 13,
    "question": "What formula in the downloadable handbook calculates the Cardinality of a Cartesian Product (A x B)?",
    "options": [
      "Cardinality(A x B) = Cardinality(A) * Cardinality(B)",
      "Cardinality(A x B) = Cardinality(A) + Cardinality(B)",
      "Cardinality(A x B) = Cardinality(A) - Cardinality(B)",
      "Cardinality(A x B) = Cardinality(A) / Cardinality(B)"
    ],
    "correctAnswer": 0,
    "explanation": "The universal Cartesian Product rule: Cardinalities multiply (C1 * C2) while Degrees add (D1 + D2).",
    "hint": "Cardinalities multiply."
  },
  {
    "id": 14,
    "question": "What does the simulator do when ON DELETE CASCADE is triggered on a parent table?",
    "options": [
      "It automatically removes all referencing child rows from the child table's row list",
      "It throws an error and cancels",
      "It shuts down the computer",
      "It renames the parent table"
    ],
    "correctAnswer": 0,
    "explanation": "CASCADE automatically deletes all child rows that reference the deleted parent primary key.",
    "hint": "Deletes all referencing child rows."
  },
  {
    "id": 15,
    "question": "How does the Python simulator demonstrate that an alternate key is simply: Alternate Keys = Candidate Keys - Primary Key?",
    "options": [
      "By computing the set difference: set(candidate_keys) - {primary_key}",
      "By adding all keys together",
      "By deleting the candidate keys",
      "By sorting the keys alphabetically"
    ],
    "correctAnswer": 0,
    "explanation": "Set difference mathematically excludes the selected primary key from the candidate key set, producing the alternate keys.",
    "hint": "Set difference: candidate keys minus primary key."
  },
  {
    "id": 16,
    "question": "What is an 'All-Key Relation' as demonstrated in the downloadable package?",
    "options": [
      "A relation where no subset of attributes is unique, so the entire set of all attributes together forms the only candidate key",
      "A table with no primary key",
      "A table with 100 foreign keys",
      "A database with one table"
    ],
    "correctAnswer": 0,
    "explanation": "In an all-key relation, all attributes combined form the minimal candidate key.",
    "hint": "All attributes together form the candidate key."
  },
  {
    "id": 17,
    "question": "Which Python module from the standard library helps generate attribute combinations for key discovery?",
    "options": [
      "itertools (specifically itertools.combinations)",
      "math",
      "random",
      "turtle"
    ],
    "correctAnswer": 0,
    "explanation": "The itertools.combinations function generates all possible k-length subsets of attributes to test for uniqueness.",
    "hint": "itertools.combinations."
  },
  {
    "id": 18,
    "question": "Why are monospaced ASCII tables used in the downloadable revision notes?",
    "options": [
      "Fixed-width characters ensure columns, borders, and rows remain perfectly aligned across any text viewer or terminal",
      "Because color fonts are illegal",
      "Because plain text uses too much battery",
      "Because monitors cannot render tables"
    ],
    "correctAnswer": 0,
    "explanation": "Monospaced formatting ensures that vertical column pipes and characters line up cleanly without requiring word processors.",
    "hint": "Fixed-width characters keep columns aligned."
  },
  {
    "id": 19,
    "question": "What does the master simulator output when a duplicate value is inserted into an Alternate Key column with a UNIQUE constraint?",
    "options": [
      "A UNIQUE constraint violation error rejecting the row",
      "The table converts to a list",
      "The row is saved in lowercase",
      "The database restarts"
    ],
    "correctAnswer": 0,
    "explanation": "The engine enforces uniqueness on alternate keys, rejecting any duplicate non-null entries.",
    "hint": "UNIQUE constraint error."
  },
  {
    "id": 20,
    "question": "What does the downloadable cheat sheet list as the primary justification for avoiding mutable primary keys (like phone numbers)?",
    "options": [
      "Phone numbers change or get reassigned, which would require cascading updates across all foreign key tables",
      "Phone numbers contain digits",
      "Phone numbers are too short",
      "Phone numbers cannot be dialed"
    ],
    "correctAnswer": 0,
    "explanation": "Mutable keys trigger costly cascading updates across child tables when changed; immutable keys avoid this completely.",
    "hint": "Avoids costly cascading updates when values change."
  },
  {
    "id": 21,
    "question": "In the master laboratory package, how is First Normal Form (1NF) validated on a table?",
    "options": [
      "By asserting that every cell contains a scalar atomic value (not a list, set, or composite structure)",
      "By checking that all numbers are positive",
      "By checking that the table has at least 10 rows",
      "By checking that column names are short"
    ],
    "correctAnswer": 0,
    "explanation": "1NF requires atomicity: each cell must hold a single scalar value.",
    "hint": "Ensuring each cell holds a single scalar atomic value."
  },
  {
    "id": 22,
    "question": "What IDE or interpreter is recommended for students running the downloadable Python master package?",
    "options": [
      "Python 3.x IDLE, VS Code, or PyCharm",
      "Adobe Photoshop",
      "Microsoft Word",
      "Google Chrome"
    ],
    "correctAnswer": 0,
    "explanation": "Any standard Python 3.x environment (IDLE, VS Code, PyCharm) executes the script and displays formatted table outputs.",
    "hint": "Standard Python 3 environment."
  },
  {
    "id": 23,
    "question": "In the revision notes, what are the three keywords defining ACID properties?",
    "options": [
      "Atomicity, Consistency, Isolation, Durability",
      "Action, Code, Index, Data",
      "Access, Control, Interface, Design",
      "All, Clear, Inside, Out"
    ],
    "correctAnswer": 0,
    "explanation": "ACID: Atomicity (all-or-nothing), Consistency (rules preserved), Isolation (independent), Durability (permanent writes).",
    "hint": "Atomicity, Consistency, Isolation, Durability."
  },
  {
    "id": 24,
    "question": "What is the recommended student workflow after downloading the laboratory package?",
    "options": [
      "Execute the script, inspect the outputs, modify the sample tables with textbook problems, and practice drawing layout diagrams",
      "Delete the script immediately",
      "Print the code on 200 pages",
      "Sell the code online"
    ],
    "correctAnswer": 0,
    "explanation": "Hands-on execution followed by testing textbook problems solidifies theoretical intuition and guarantees full marks.",
    "hint": "Run code and test with textbook problems."
  },
  {
    "id": 25,
    "question": "In summary, what is the single most valuable feature of the master laboratory package for board preparation?",
    "options": [
      "It unifies all theoretical concepts (Keys, Integrity, Degree/Cardinality, ACID) into one interactive, executable learning suite",
      "It formats the hard drive",
      "It requires no computer",
      "It deletes all homework"
    ],
    "correctAnswer": 0,
    "explanation": "The package bridges theory and practical application, providing an executable playground for all Unit III foundational rules.",
    "hint": "Unifies theoretical concepts into an executable laboratory playground."
  }
];
