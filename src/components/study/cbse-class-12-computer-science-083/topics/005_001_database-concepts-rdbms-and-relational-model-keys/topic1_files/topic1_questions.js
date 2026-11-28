export default [
  {
    "id": 1,
    "question": "Which of the following is a major advantage of a Database Management System (DBMS) over traditional file systems?",
    "options": [
      "Controlled reduction of data redundancy",
      "Requires zero computer memory",
      "Operates without an operating system",
      "Only supports numeric data"
    ],
    "correctAnswer": 0,
    "explanation": "A DBMS integrates previously separate departmental files into a single logical structure, dramatically reducing duplicate data and eliminating redundant storage.",
    "hint": "Think about eliminating unnecessary duplicate records."
  },
  {
    "id": 2,
    "question": "What does 'Data Sharing' in a DBMS allow?",
    "options": [
      "Multiple users and applications can concurrently access and query the same centralized data",
      "Users must copy data to USB drives to share it",
      "Only one user can read the database per day",
      "Data is automatically published on public social media"
    ],
    "correctAnswer": 0,
    "explanation": "Data sharing means existing data can be shared among multiple authorized users concurrently, and new applications can be built without creating new private files.",
    "hint": "Simultaneous access to shared data by multiple users."
  },
  {
    "id": 3,
    "question": "What does 'Data Integrity' mean in a relational database?",
    "options": [
      "Data stored in the database is accurate, valid, and consistent according to predefined constraints",
      "Data is kept strictly secret from everyone",
      "Data is stored in integer format only",
      "Data is compressed to save disk space"
    ],
    "correctAnswer": 0,
    "explanation": "Data integrity ensures that data remains accurate and valid by enforcing rules such as NOT NULL, UNIQUE, CHECK (e.g. Marks between 0 and 100), and FOREIGN KEY constraints.",
    "hint": "Accuracy and validity enforced by database rules."
  },
  {
    "id": 4,
    "question": "Which acronym describes the four critical transactional properties guaranteed by an enterprise DBMS?",
    "options": [
      "ACID (Atomicity, Consistency, Isolation, Durability)",
      "REST (Representational State Transfer)",
      "CRUD (Create, Read, Update, Delete)",
      "HTML (HyperText Markup Language)"
    ],
    "correctAnswer": 0,
    "explanation": "ACID represents the fundamental transaction properties: Atomicity (all-or-nothing), Consistency (rules preserved), Isolation (independent concurrent execution), and Durability (permanent writes).",
    "hint": "Atomicity, Consistency, Isolation, Durability."
  },
  {
    "id": 5,
    "question": "In ACID properties, what does 'Durability' guarantee?",
    "options": [
      "Once a transaction is committed, its changes are permanently recorded and will survive any subsequent system crash or power failure",
      "The database hard drive is physically unbreakable",
      "The database software runs forever without updates",
      "Tables cannot be deleted by the admin"
    ],
    "correctAnswer": 0,
    "explanation": "Durability guarantees that committed data is written to non-volatile storage and transaction logs, surviving power outages or operating system crashes.",
    "hint": "Committed changes persist permanently even after a crash."
  },
  {
    "id": 6,
    "question": "What is 'Concurrency Control' in a DBMS?",
    "options": [
      "A mechanism allowing multiple transactions to execute simultaneously without interfering with each other or causing inconsistent data",
      "Running multiple antivirus scans at once",
      "Connecting two monitors to one CPU",
      "Using two keyboards at the same time"
    ],
    "correctAnswer": 0,
    "explanation": "Concurrency control (via locks or multi-version concurrency control) coordinates simultaneous access by thousands of users, preventing race conditions and lost updates.",
    "hint": "Managing simultaneous multi-user database transactions safely."
  },
  {
    "id": 7,
    "question": "What is 'Data Independence' in the context of DBMS architecture?",
    "options": [
      "The ability to modify the schema at one level without altering the schema at the next higher level",
      "The database does not require an operating system",
      "Data can be accessed without entering passwords",
      "Data works without electricity"
    ],
    "correctAnswer": 0,
    "explanation": "Data independence separates data representation from application programs, allowing physical or logical schema modifications without rewriting application code.",
    "hint": "Changing storage or structure without rewriting application code."
  },
  {
    "id": 8,
    "question": "What is 'Physical Data Independence'?",
    "options": [
      "The capacity to change the internal/physical storage structure (e.g. indexing, disk layout) without having to change the conceptual schema or application programs",
      "Moving the database server to a different room",
      "Replacing a desktop with a laptop",
      "Deleting tables from disk"
    ],
    "correctAnswer": 0,
    "explanation": "Physical data independence protects conceptual schemas and application code when DBAs optimize disk storage, block sizes, or index trees.",
    "hint": "Physical disk changes do not affect conceptual schemas or programs."
  },
  {
    "id": 9,
    "question": "What is 'Logical Data Independence'?",
    "options": [
      "The capacity to change the conceptual schema (e.g. adding a new column or table) without having to rewrite existing external views or applications",
      "Changing binary 1s to 0s",
      "Upgrading the CPU speed",
      "Renaming the computer"
    ],
    "correctAnswer": 0,
    "explanation": "Logical data independence allows adding new fields or expanding tables without breaking existing programs that don't need those new fields.",
    "hint": "Adding new attributes/tables without breaking existing applications."
  },
  {
    "id": 10,
    "question": "How does a DBMS enforce security and privacy compared to operating system file permissions?",
    "options": [
      "By granting granular role-based permissions (GRANT/REVOKE) on specific tables, views, or even individual columns",
      "By hiding the computer under a desk",
      "By encrypting only the computer monitor",
      "By turning off the internet permanently"
    ],
    "correctAnswer": 0,
    "explanation": "A DBMS provides fine-grained security: a receptionist can view patient names and appointments, but the medical diagnosis column can be restricted exclusively to doctors.",
    "hint": "Role-based authorization and permissions down to tables and columns."
  },
  {
    "id": 11,
    "question": "What role does the 'Database Administrator' (DBA) play in an enterprise DBMS?",
    "options": [
      "A person or team responsible for overall database design, user authorization, performance monitoring, backup, and security management",
      "A technician who repairs computer power cables",
      "A typist who enters student names",
      "A salesperson who sells computer hardware"
    ],
    "correctAnswer": 0,
    "explanation": "The DBA is the chief architect who oversees schema definitions, access privileges, performance tuning, and disaster recovery strategies.",
    "hint": "The central authority managing security, backup, and database schema."
  },
  {
    "id": 12,
    "question": "Which DBMS feature enables restoring a corrupted database to its last consistent state after an unexpected power failure or disk crash?",
    "options": [
      "Backup and Recovery management using Transaction Logs (WAL)",
      "Running disk defragmenter",
      "Reinstalling Windows OS",
      "Opening files in Notepad"
    ],
    "correctAnswer": 0,
    "explanation": "The DBMS recovery manager uses transaction logs (Write-Ahead Logging) to REDO committed transactions and UNDO incomplete active transactions during recovery.",
    "hint": "Automated recovery using transaction logs and checkpoints."
  },
  {
    "id": 13,
    "question": "In a CBSE 2-mark question: 'Explain how DBMS facilitates enforcement of standards.' What is the expected answer?",
    "options": [
      "Centralized control enables the DBA to define uniform naming conventions, data formats, display formats, and documentation standards across the entire organization",
      "By forcing everyone to buy the same brand of laptop",
      "By requiring all code to be written in assembly language",
      "By using one standard printer for all documents"
    ],
    "correctAnswer": 0,
    "explanation": "Centralized database management allows establishing enterprise-wide standards for data representation, attribute naming, and exchange formats.",
    "hint": "Centralized control enables uniform naming, formats, and rules."
  },
  {
    "id": 14,
    "question": "Which constraint in SQL ensures that no duplicate values are allowed in a column, while still permitting NULL values?",
    "options": [
      "UNIQUE",
      "NOT NULL",
      "CHECK",
      "FOREIGN KEY"
    ],
    "correctAnswer": 0,
    "explanation": "The UNIQUE constraint ensures distinct values across all non-null entries in a column (unlike PRIMARY KEY, which strictly forbids NULLs).",
    "hint": "Enforces unique entries but allows NULLs."
  },
  {
    "id": 15,
    "question": "What does the NOT NULL constraint enforce on an attribute?",
    "options": [
      "The attribute must always contain a valid value and cannot be left blank/empty during record insertion",
      "The attribute can only contain numbers",
      "The attribute must be a primary key",
      "The attribute is automatically encrypted"
    ],
    "correctAnswer": 0,
    "explanation": "NOT NULL prevents inserting or updating a record with an empty or undefined (NULL) value in that column.",
    "hint": "Field cannot be left empty."
  },
  {
    "id": 16,
    "question": "What is an SQL 'View' and how does it contribute to database security?",
    "options": [
      "A virtual table derived from an underlying query, presenting only restricted columns/rows to specific users without exposing raw tables",
      "A picture taken with a webcam",
      "A physical screenshot of the database",
      "A glass cover over the computer monitor"
    ],
    "correctAnswer": 0,
    "explanation": "A View is a virtual table that can conceal sensitive columns (like salary or password hashes), giving users access only to non-sensitive subsets of data.",
    "hint": "A virtual table displaying a restricted subset of columns/rows."
  },
  {
    "id": 17,
    "question": "What is the primary benefit of centralized data storage in a DBMS when business requirements change?",
    "options": [
      "Application development time is drastically reduced because data models and validation logic are already established and reusable",
      "Computer hardware lasts twice as long",
      "Internet bandwidth becomes free",
      "Software licenses expire"
    ],
    "correctAnswer": 0,
    "explanation": "New applications can leverage the existing centralized schema and pre-built integrity rules immediately, cutting development cycles.",
    "hint": "Rapid development using existing shared schema and data."
  },
  {
    "id": 18,
    "question": "What happens if a user tries to enter student marks as 150 when a 'CHECK (Marks <= 100)' constraint exists in the table?",
    "options": [
      "The DBMS immediately rejects the transaction and generates a constraint violation error, preventing corrupt data",
      "The marks are rounded down to 100 automatically",
      "The computer restarts",
      "The marks are converted into text"
    ],
    "correctAnswer": 0,
    "explanation": "The DBMS strictly enforces integrity constraints; any insertion violating a CHECK condition is rejected, preserving data validity.",
    "hint": "DBMS rejects invalid input and throws an error."
  },
  {
    "id": 19,
    "question": "What does 'Atomicity' in ACID properties mean?",
    "options": [
      "Either all operations of a transaction succeed, or if any step fails, the entire transaction is rolled back leaving the database unchanged",
      "Each record contains atomic chemical elements",
      "Data is stored on microscopic quantum disks",
      "Only one character can be typed at a time"
    ],
    "correctAnswer": 0,
    "explanation": "Atomicity is the 'all-or-nothing' principle: if a bank transfer successfully debits sender A but crashes before crediting receiver B, the debit is completely undone.",
    "hint": "All-or-nothing execution of transactions."
  },
  {
    "id": 20,
    "question": "What is the function of the DBMS Data Dictionary (or System Catalog)?",
    "options": [
      "A repository of 'metadata' (data about data) storing definitions of tables, columns, data types, constraints, and user authorizations",
      "A spelling checker for SQL queries",
      "A dictionary that translates English to Hindi",
      "A list of computer hardware prices"
    ],
    "correctAnswer": 0,
    "explanation": "The Data Dictionary or System Catalog contains metadata defining table schemas, constraints, indexes, user privileges, and storage allocations.",
    "hint": "Metadata repository containing definitions of tables and constraints."
  },
  {
    "id": 21,
    "question": "Which of the following is an example of an open-source enterprise Relational Database Management System?",
    "options": [
      "MySQL (and PostgreSQL)",
      "Microsoft Excel",
      "Adobe Photoshop",
      "Windows Notepad"
    ],
    "correctAnswer": 0,
    "explanation": "MySQL and PostgreSQL are world-renowned open-source relational database management systems widely used in enterprise and CBSE curriculum.",
    "hint": "Widely used open-source SQL database taught in CBSE."
  },
  {
    "id": 22,
    "question": "Why does a DBMS reduce software maintenance costs across an organization?",
    "options": [
      "Business rules and integrity checks are centralized in the database layer rather than scattered across dozens of individual programs",
      "It eliminates the need for computer monitors",
      "It makes programming languages obsolete",
      "It provides free internet access"
    ],
    "correctAnswer": 0,
    "explanation": "Because validation and data structures reside in the central DBMS, modifying a rule (like tax rate or grade scale) requires updating only the database.",
    "hint": "Centralizing business rules avoids updating multiple client applications."
  },
  {
    "id": 23,
    "question": "In transaction processing, what does 'Isolation' guarantee?",
    "options": [
      "Multiple transactions executing concurrently produce the same result as if they had executed sequentially one after another",
      "The server is unplugged from the internet",
      "Only one computer exists in the building",
      "Users cannot see the computer screen"
    ],
    "correctAnswer": 0,
    "explanation": "Isolation ensures that uncommitted intermediate states of a transaction are hidden from other concurrent transactions, preventing dirty reads.",
    "hint": "Concurrent transactions do not see each other's half-completed states."
  },
  {
    "id": 24,
    "question": "Which of the following operations is managed by the DBMS Transaction Manager?",
    "options": [
      "COMMIT and ROLLBACK operations",
      "Screen brightness adjustment",
      "Mouse pointer acceleration",
      "Audio volume control"
    ],
    "correctAnswer": 0,
    "explanation": "The Transaction Manager oversees transaction boundaries, coordinating COMMIT (making changes permanent) and ROLLBACK (undoing changes on error).",
    "hint": "COMMIT and ROLLBACK management."
  },
  {
    "id": 25,
    "question": "In summary, what are the five major advantages of a DBMS frequently asked in CBSE 3-mark theory questions?",
    "options": [
      "Reduction of Redundancy, Data Sharing, Data Integrity, Data Security, and Crash Recovery",
      "High electricity usage, expensive monitors, slow internet, manual backups, and single-user mode",
      "Color printing, wireless mouse, high baud rate, USB charging, and audio output",
      "Keyboard shortcuts, wallpapers, screen savers, fonts, and icons"
    ],
    "correctAnswer": 0,
    "explanation": "The core advantages recognized in CBSE marking schemes are: (1) Controlled redundancy, (2) Sharing of data, (3) Data integrity, (4) Security enforcement, and (5) Crash recovery.",
    "hint": "Redundancy control, sharing, integrity, security, recovery."
  }
];
