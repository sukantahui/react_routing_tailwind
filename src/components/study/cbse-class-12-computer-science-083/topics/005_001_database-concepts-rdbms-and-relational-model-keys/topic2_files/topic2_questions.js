export default [
  {
    "id": 1,
    "question": "Who is credited with inventing the Relational Data Model and laying the foundation for modern RDBMS in 1970?",
    "options": [
      "Dr. Edgar Frank Codd (E.F. Codd)",
      "Charles Babbage",
      "Tim Berners-Lee",
      "Alan Turing"
    ],
    "correctAnswer": 0,
    "explanation": "Dr. E.F. Codd introduced the relational model in his 1970 landmark paper 'A Relational Model of Data for Large Shared Data Banks' while working at IBM.",
    "hint": "The IBM mathematician who proposed using mathematical relations (tables)."
  },
  {
    "id": 2,
    "question": "What differentiates a Relational Database Management System (RDBMS) from a basic DBMS?",
    "options": [
      "In an RDBMS, data is strictly organized as two-dimensional tables (relations) with established relationships between them via common attributes (keys)",
      "An RDBMS only runs on quantum supercomputers",
      "An RDBMS cannot store text or dates",
      "An RDBMS requires no computer storage"
    ],
    "correctAnswer": 0,
    "explanation": "An RDBMS represents all data in mathematical relations (2D tables) and establishes links between tables using primary and foreign keys.",
    "hint": "Data organized as two-dimensional tables with relational links."
  },
  {
    "id": 3,
    "question": "In the ANSI-SPARC three-schema architecture, which level describes the logical structure of the entire database for the community of users?",
    "options": [
      "Conceptual (or Logical) Level",
      "External (View) Level",
      "Internal (Physical) Level",
      "Hardware Level"
    ],
    "correctAnswer": 0,
    "explanation": "The Conceptual Level represents the global logical design of the entire database, including entities, data types, relationships, constraints, and security rules.",
    "hint": "The middle level showing the complete logical view of data."
  },
  {
    "id": 4,
    "question": "Which schema level in the three-level architecture describes how data is physically stored on magnetic disks or SSDs?",
    "options": [
      "Internal (Physical) Level",
      "External Level",
      "Conceptual Level",
      "Presentation Level"
    ],
    "correctAnswer": 0,
    "explanation": "The Internal/Physical Level defines low-level storage details: data block allocation, record layout, B-tree indexes, compression, and encryption.",
    "hint": "The lowest level closest to physical storage devices."
  },
  {
    "id": 5,
    "question": "Which level in the ANSI-SPARC architecture caters directly to end-users by presenting customized, restricted views of the database?",
    "options": [
      "External (View) Level",
      "Physical Level",
      "Conceptual Level",
      "Assembly Level"
    ],
    "correctAnswer": 0,
    "explanation": "The External Level contains multiple individual external schemas (Views) tailored to specific user roles (e.g. Student View, Cashier View).",
    "hint": "The top level closest to end-users."
  },
  {
    "id": 6,
    "question": "What is the primary role of the Query Optimizer in an RDBMS?",
    "options": [
      "It analyzes multiple possible execution plans for a given SQL query and selects the most efficient plan with minimum I/O and CPU cost",
      "It automatically writes Python code for students",
      "It formats text with font styles",
      "It corrects typing errors in English words"
    ],
    "correctAnswer": 0,
    "explanation": "The Query Optimizer determines the most cost-effective way to execute an SQL statement by choosing optimal access paths and index scans.",
    "hint": "Selects the most efficient execution plan for SQL queries."
  },
  {
    "id": 7,
    "question": "What component of the DBMS processes data definition statements like CREATE, ALTER, and DROP?",
    "options": [
      "DDL Compiler / Interpreter",
      "DML Compiler",
      "Buffer Manager",
      "Spooler"
    ],
    "correctAnswer": 0,
    "explanation": "The DDL Compiler converts Data Definition Language commands (CREATE, ALTER, DROP) into internal metadata entries recorded in the Data Dictionary.",
    "hint": "Compiles Data Definition Language statements."
  },
  {
    "id": 8,
    "question": "Where does the DBMS store all schema definitions, table structures, column constraints, and security permissions?",
    "options": [
      "Data Dictionary / System Catalog",
      "Recycle Bin",
      "Windows Registry",
      "Browser Cookies"
    ],
    "correctAnswer": 0,
    "explanation": "The Data Dictionary (or System Catalog) holds metadata (data about data), detailing all relations, attributes, types, constraints, and user authorizations.",
    "hint": "Central repository containing metadata."
  },
  {
    "id": 9,
    "question": "What is the function of the Buffer Manager in an RDBMS engine?",
    "options": [
      "It manages memory caching between disk storage and main memory (RAM) to minimize slow physical disk I/O reads",
      "It plays audio files during queries",
      "It pauses queries to display advertisements",
      "It cleans dust from the server"
    ],
    "correctAnswer": 0,
    "explanation": "The Buffer Manager caches database pages in RAM so repeated accesses read from ultra-fast memory rather than slow mechanical or SSD disk sectors.",
    "hint": "Caches database pages in RAM to speed up data access."
  },
  {
    "id": 10,
    "question": "Which of the following is considered a widely used commercial enterprise RDBMS?",
    "options": [
      "Oracle Database (and Microsoft SQL Server)",
      "Notepad++",
      "VLC Media Player",
      "Google Chrome"
    ],
    "correctAnswer": 0,
    "explanation": "Oracle Database, Microsoft SQL Server, IBM Db2, and MySQL are standard enterprise-grade relational database management systems.",
    "hint": "Leading commercial SQL database system."
  },
  {
    "id": 11,
    "question": "What is 'Physical Data Independence' in the three-level architecture?",
    "options": [
      "The capacity to alter the internal physical storage structures (e.g. adding an index) without having to alter the conceptual schema or application code",
      "Moving a computer from one classroom to another",
      "Disconnecting the network cable",
      "Uninstalling the operating system"
    ],
    "correctAnswer": 0,
    "explanation": "Physical data independence isolates conceptual schemas and application programs from low-level physical disk reorganization and index creation.",
    "hint": "Changes to internal storage layout do not affect conceptual schemas."
  },
  {
    "id": 12,
    "question": "What is 'Logical Data Independence' in the three-level architecture?",
    "options": [
      "The capacity to alter the conceptual schema (e.g. adding a new attribute or table) without having to rewrite existing external views or applications",
      "Changing variable names in Python",
      "Converting decimal numbers to binary",
      "Upgrading monitor resolution"
    ],
    "correctAnswer": 0,
    "explanation": "Logical data independence ensures that adding new columns or expanding tables does not break existing application programs that do not use those columns.",
    "hint": "Conceptual schema expansion does not break existing external views."
  },
  {
    "id": 13,
    "question": "Which RDBMS subsystem is responsible for ensuring the ACID properties during multi-user operations?",
    "options": [
      "Transaction Manager and Concurrency Control Subsystem",
      "Display Driver",
      "Sound Card Manager",
      "Print Spooler"
    ],
    "correctAnswer": 0,
    "explanation": "The Transaction Manager coordinates locking, commit/rollback, and write-ahead logs to enforce ACID properties across concurrent users.",
    "hint": "Manages transactions, locking, and commit/rollback."
  },
  {
    "id": 14,
    "question": "What language is the universally accepted standard for querying and managing data in relational databases?",
    "options": [
      "SQL (Structured Query Language)",
      "HTML",
      "JSON",
      "XML"
    ],
    "correctAnswer": 0,
    "explanation": "SQL (Structured Query Language) is the ANSI/ISO standard declarative language supported by virtually all relational database systems.",
    "hint": "Structured Query Language."
  },
  {
    "id": 15,
    "question": "Why is SQL termed a 'declarative' (or non-procedural) language?",
    "options": [
      "Users specify WHAT data to retrieve rather than HOW to retrieve it step-by-step",
      "It only declares variable data types",
      "It runs exclusively on declarative compilers",
      "It requires writing assembly loops"
    ],
    "correctAnswer": 0,
    "explanation": "In SQL, you write 'SELECT name FROM Student WHERE marks > 90'; the engine's query optimizer handles the algorithms, index lookups, and iteration internally.",
    "hint": "Specifies WHAT data is desired, not procedural HOW steps."
  },
  {
    "id": 16,
    "question": "What is a 'Database Instance' (or State) in RDBMS terminology?",
    "options": [
      "The actual collection of data currently stored in the database at a specific moment in time",
      "The software installation CD",
      "The physical computer running the database",
      "The user's login password"
    ],
    "correctAnswer": 0,
    "explanation": "The database instance (or state/extension) changes continually as records are inserted, modified, or deleted, while the schema remains relatively static.",
    "hint": "Data stored in the database at a particular instant in time."
  },
  {
    "id": 17,
    "question": "What is a 'Database Schema' (or Intension)?",
    "options": [
      "The overall structural blueprint and design of the database (table definitions, columns, data types, constraints) which rarely changes",
      "A daily backup file",
      "The electricity bill of the server room",
      "A list of employee phone numbers"
    ],
    "correctAnswer": 0,
    "explanation": "The schema is the skeletal framework describing the logical design and structure of tables, relations, and constraints.",
    "hint": "The overall skeletal blueprint/design of the database."
  },
  {
    "id": 18,
    "question": "In client-server RDBMS architecture, what role does the database server play?",
    "options": [
      "It executes the DBMS engine, processes incoming SQL queries, enforces constraints, manages storage, and returns result sets to clients",
      "It only displays graphics on the client's screen",
      "It replaces the keyboard and mouse",
      "It formats printed paper"
    ],
    "correctAnswer": 0,
    "explanation": "The database server hosts the RDBMS engine, executing queries, enforcing transaction locks, managing disk storage, and serving clients across the network.",
    "hint": "Executes the engine, processes SQL queries, and serves clients."
  },
  {
    "id": 19,
    "question": "How does an RDBMS handle multi-user access when two users try to edit the same record simultaneously?",
    "options": [
      "By employing Locking Mechanisms (Shared Locks and Exclusive Locks) coordinated by the Concurrency Controller",
      "By shutting down the computer",
      "By deleting both users from the system",
      "By alternating characters between both users"
    ],
    "correctAnswer": 0,
    "explanation": "The concurrency controller applies exclusive locks on rows being updated, ensuring serializability and preventing lost updates.",
    "hint": "Locking mechanisms ensure safe multi-user editing."
  },
  {
    "id": 20,
    "question": "What is Write-Ahead Logging (WAL) in RDBMS architecture?",
    "options": [
      "A technique where transaction changes are recorded in a log on non-volatile storage BEFORE they are written to the actual database data pages on disk",
      "Writing notes in a diary before coding",
      "Printing log files on paper",
      "Sending emails before running queries"
    ],
    "correctAnswer": 0,
    "explanation": "WAL guarantees durability and recovery: if a crash occurs while updating tables, the engine reconstructs the transaction from the disk log.",
    "hint": "Changes are written to the log on disk before modifying database pages."
  },
  {
    "id": 21,
    "question": "Which component of an RDBMS parses the raw SQL string into an internal syntax tree?",
    "options": [
      "SQL Parser / Lexical Analyzer",
      "Disk Spindle",
      "Network Interface Card",
      "Power Supply Unit"
    ],
    "correctAnswer": 0,
    "explanation": "The SQL Parser verifies syntax and grammar, translating SQL statements into an abstract parse tree for validation against the system catalog.",
    "hint": "Checks SQL syntax and builds parse trees."
  },
  {
    "id": 22,
    "question": "In a CBSE 2-mark question: 'State the difference between Schema and Instance.' What is the key distinction?",
    "options": [
      "Schema is the structural design (blueprint) of the database, whereas Instance is the actual data populated in the database at a specific instant",
      "Schema is for numbers and Instance is for text",
      "Schema is written in C and Instance in Python",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Schema represents the unchanging structural definition; Instance represents the dynamic data content residing in tables at any given moment.",
    "hint": "Blueprint (Schema) vs Populated Data at a moment (Instance)."
  },
  {
    "id": 23,
    "question": "What does the Authorization / Security subsystem of an RDBMS check before executing any SQL statement?",
    "options": [
      "Whether the connected user has the necessary privileges (SELECT, INSERT, UPDATE, DELETE) on the target tables or views",
      "Whether the user has paid their broadband bill",
      "Whether the monitor is switched on",
      "Whether the keyboard is mechanical"
    ],
    "correctAnswer": 0,
    "explanation": "The security subsystem checks the system catalog to verify whether the requesting user has been granted appropriate permissions on the queried objects.",
    "hint": "Verifies user privileges on target database objects."
  },
  {
    "id": 24,
    "question": "Why do relational databases represent data in tables rather than hierarchical trees or network graphs?",
    "options": [
      "Tables are mathematically rigorous, easy to understand, flexible, and permit standardized set operations (relational algebra)",
      "Tables use fewer computer pixels",
      "Tables do not require computer memory",
      "Trees are illegal in software"
    ],
    "correctAnswer": 0,
    "explanation": "Tables offer intuitive two-dimensional representation backed by mathematical relation theory, allowing powerful set operations (union, intersection, join).",
    "hint": "Simple, mathematically rigorous two-dimensional tabular representation."
  },
  {
    "id": 25,
    "question": "In summary, what are the three distinct levels of the ANSI-SPARC architecture?",
    "options": [
      "External Level, Conceptual Level, and Internal (Physical) Level",
      "High Level, Medium Level, and Low Level",
      "Client Level, Wire Level, and Server Level",
      "Input Level, Processing Level, and Output Level"
    ],
    "correctAnswer": 0,
    "explanation": "The three standard levels are the External Level (user views), Conceptual Level (global logical design), and Internal Level (physical disk storage).",
    "hint": "External, Conceptual, Internal."
  }
];
