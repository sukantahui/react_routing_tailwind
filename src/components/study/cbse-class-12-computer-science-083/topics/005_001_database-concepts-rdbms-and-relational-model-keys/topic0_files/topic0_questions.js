export default [
  {
    "id": 1,
    "question": "What is data redundancy in the context of traditional file processing systems?",
    "options": [
      "Duplication of the same data across multiple independent departmental files",
      "Loss of data during hardware failure",
      "Unauthorized modification of sensitive files",
      "Slow processing speed of floppy disks"
    ],
    "correctAnswer": 0,
    "explanation": "Data redundancy refers to unnecessary duplication where the same customer or student information is independently stored in multiple departmental files (e.g., Accounts and Library), leading to wasted storage and synchronization issues.",
    "hint": "Think about multiple copies of identical data scattered across different files."
  },
  {
    "id": 2,
    "question": "When identical student addresses are updated in the Library file but left unchanged in the Accounts file, which major limitation of file processing occurs?",
    "options": [
      "Data Inconsistency",
      "Data Atomicity",
      "Data Isolation",
      "Data Encryption"
    ],
    "correctAnswer": 0,
    "explanation": "Data Inconsistency occurs when different copies of the same logical data item present conflicting values because updates were applied to one file but not to the other.",
    "hint": "Different files holding conflicting, mismatched values for the same real-world entity."
  },
  {
    "id": 3,
    "question": "In traditional file systems, if an application requires data stored in two separate files with different record formats, writing a specialized custom program is difficult due to:",
    "options": [
      "Data Isolation and format incompatibility",
      "Overly strong data security",
      "Automatic ACID compliance",
      "Too much centralized control"
    ],
    "correctAnswer": 0,
    "explanation": "Data Isolation arises because data is scattered across files with different proprietary formats, making it exceedingly difficult to write ad-hoc cross-departmental queries.",
    "hint": "Data scattered across disparate files and formats cannot be easily combined."
  },
  {
    "id": 4,
    "question": "What does 'Data Dependence' mean in traditional file management systems?",
    "options": [
      "Application programs are tightly coupled with the physical structure and storage layout of the data files",
      "Data relies entirely on internet connections to function",
      "Users depend on programmers for computer repairs",
      "Hardware relies on backup tapes"
    ],
    "correctAnswer": 0,
    "explanation": "Data dependence means that if the physical file structure changes (e.g., changing field length from 30 to 50 characters), all application programs reading that file must also be rewritten and recompiled.",
    "hint": "Application code depends strictly on the exact physical byte layout of records."
  },
  {
    "id": 5,
    "question": "Which limitation describes the inability to easily retrieve ad-hoc, unexpected information from a file processing system without writing a new computer program?",
    "options": [
      "Difficulty in Accessing Data",
      "Data Redundancy",
      "Data Concurrency",
      "Data Serialization"
    ],
    "correctAnswer": 0,
    "explanation": "Traditional file systems lack a declarative query language like SQL; any new or customized query requires writing and compiling a dedicated program (e.g., in C or COBOL).",
    "hint": "Every new reporting request requires writing a brand new program."
  },
  {
    "id": 6,
    "question": "In banking, if money is debited from Account A but a power failure occurs before it is credited to Account B, the traditional file system fails to guarantee:",
    "options": [
      "Atomicity (all-or-nothing execution)",
      "Bandwidth preservation",
      "File compression",
      "Keyboard responsiveness"
    ],
    "correctAnswer": 0,
    "explanation": "Atomicity ensures that a transaction completes entirely or leaves the system untouched (all-or-nothing). Without transaction logs, file systems leave data in half-completed corrupt states.",
    "hint": "The property where a financial transaction must either execute completely or abort."
  },
  {
    "id": 7,
    "question": "When multiple users simultaneously attempt to update the same record in a flat file without coordination, what problem arises?",
    "options": [
      "Concurrent Access Anomalies (Lost Updates)",
      "Automatic Table Partitioning",
      "Data Deduplication",
      "Enhanced Data Security"
    ],
    "correctAnswer": 0,
    "explanation": "Concurrent access anomalies occur when simultaneous updates overwrite each other (lost updates) because traditional operating systems lack granular row-level locking.",
    "hint": "Two users overwriting each other's changes simultaneously."
  },
  {
    "id": 8,
    "question": "Why are integrity constraints (such as 'Marks must be between 0 and 100') difficult to enforce in a file processing system?",
    "options": [
      "Constraints must be manually hardcoded into every application program that writes to the file, and new programs might bypass them",
      "File systems physically reject numeric values",
      "Operating systems only support text files",
      "Disk sectors cannot store mathematical numbers"
    ],
    "correctAnswer": 0,
    "explanation": "In file systems, validation logic resides inside application programs; if someone writes a new script or edits the file directly, corrupt data can easily enter the system.",
    "hint": "Integrity checks are not enforced centrally by the storage layer."
  },
  {
    "id": 9,
    "question": "In terms of security, what is a primary weakness of traditional operating system file permissions compared to a DBMS?",
    "options": [
      "OS permissions apply to entire files or directories rather than specific records, columns, or views",
      "File systems allow any hacker to guess passwords instantly",
      "Operating systems cannot store text files securely",
      "Only web browsers can lock files"
    ],
    "correctAnswer": 0,
    "explanation": "OS security is coarse-grained (read/write access to the entire file); a DBMS provides fine-grained role-based security down to individual tables, columns, or views.",
    "hint": "File systems cannot restrict a clerk to see only specific columns of a table."
  },
  {
    "id": 10,
    "question": "Which of the following is NOT a drawback of the traditional file processing system?",
    "options": [
      "Automatic declarative query optimization via SQL",
      "Data Redundancy",
      "Data Inconsistency",
      "Integrity Problems"
    ],
    "correctAnswer": 0,
    "explanation": "Automatic declarative query optimization via SQL is a key strength of modern Relational Database Management Systems, not a drawback of file systems.",
    "hint": "Which option is actually a feature of a modern RDBMS?"
  },
  {
    "id": 11,
    "question": "When data is duplicated across 5 different departmental files, what is the impact on secondary storage and backup operations?",
    "options": [
      "Storage space is wasted and backup operations take significantly longer with redundant data",
      "Storage space is automatically halved",
      "Backup files become self-repairing",
      "Computer CPU speed triples"
    ],
    "correctAnswer": 0,
    "explanation": "Storing multiple duplicate copies across departments consumes excess hard disk capacity and bloats tape/cloud backup routines unnecessarily.",
    "hint": "Multiple copies consume unnecessary disk space."
  },
  {
    "id": 12,
    "question": "What term describes the condition where changing the storage device from HDD to SSD or changing indexing methods requires rewriting application programs?",
    "options": [
      "Lack of Physical Data Independence",
      "High Data Integrity",
      "Atomicity violation",
      "Data Duplication"
    ],
    "correctAnswer": 0,
    "explanation": "Physical data independence allows physical storage or indexing changes without altering application logic; traditional file systems lack this independence.",
    "hint": "Programs depend directly on physical storage structures."
  },
  {
    "id": 13,
    "question": "In a CBSE 2-mark question: 'State any two limitations of file systems that led to the development of DBMS.' Which pair is completely correct?",
    "options": [
      "Data Redundancy and Data Inconsistency",
      "Color graphics limitation and mouse incompatibility",
      "Lack of keyboard shortcuts and monitor refresh delay",
      "High internet speed and too many web browsers"
    ],
    "correctAnswer": 0,
    "explanation": "Data redundancy (duplication) and data inconsistency (conflicting values across files) are the classic foundational reasons for adopting DBMS.",
    "hint": "The two classic 'Data' issues that start with R and I."
  },
  {
    "id": 14,
    "question": "Why is recovery after a sudden system crash or power outage extremely difficult in a flat file processing system?",
    "options": [
      "File systems do not maintain automated Write-Ahead Transaction Logs (WAL) or checkpoints to rollback incomplete writes",
      "Files are automatically erased by Windows upon shutdown",
      "Hard drives physically demagnetize during power cuts",
      "Only magnetic tapes can recover files"
    ],
    "correctAnswer": 0,
    "explanation": "Without specialized transaction logs and checkpointing mechanisms, interrupted disk writes leave files in partially written, truncated, or corrupted states.",
    "hint": "Absence of automated transaction logging and rollback mechanisms."
  },
  {
    "id": 15,
    "question": "Which of the following scenarios best demonstrates 'Data Inconsistency'?",
    "options": [
      "Roll number 105 has name 'Rohan Verma' in Fee file but 'Rohan Sharma' in Exam file",
      "Roll number 105 has same name and address in all files",
      "Student roll numbers are sequentially numbered from 1 to 50",
      "The file is encrypted with AES-256"
    ],
    "correctAnswer": 0,
    "explanation": "Conflicting values for the same student entity across two files represents the exact textbook definition of data inconsistency.",
    "hint": "Conflicting names for the same student roll number."
  },
  {
    "id": 16,
    "question": "If an organization uses CSV and text files to store employee records, what happens if two managers open and edit the same file simultaneously in basic text editors?",
    "options": [
      "The manager who saves last overwrites and wipes out the edits made by the first manager (lost update)",
      "The text editor automatically merges the changes intelligently",
      "The operating system automatically rolls back the second user",
      "The file splits into two separate tables"
    ],
    "correctAnswer": 0,
    "explanation": "Basic text editors and file systems lack concurrency control; the last writer blindly overwrites the file, causing lost updates.",
    "hint": "Last save wins, obliterating prior changes."
  },
  {
    "id": 17,
    "question": "What is an 'Orphan Record' problem commonly encountered in flat file systems without foreign keys?",
    "options": [
      "A child record exists referencing a parent entity that has already been deleted (e.g. an order for a deleted customer)",
      "A record with no primary key",
      "A file that has no file extension",
      "A computer with no keyboard"
    ],
    "correctAnswer": 0,
    "explanation": "Without relational foreign key constraints, deleting a customer record leaves invoice records orphaned, pointing to non-existent customer IDs.",
    "hint": "Child records left referencing non-existent parent records."
  },
  {
    "id": 18,
    "question": "Why do file processing systems lead to high software maintenance costs over time?",
    "options": [
      "Any change in business rules or data formats requires locating, modifying, and testing dozens of separate standalone source code files",
      "File systems require gold-plated cables",
      "Operating systems charge hourly fees for reading text files",
      "Every file requires a new monitor"
    ],
    "correctAnswer": 0,
    "explanation": "Because business validation and formatting are dispersed across application programs, even minor schema modifications require mass code refactoring.",
    "hint": "Scattered logic across dozens of custom applications requires constant maintenance."
  },
  {
    "id": 19,
    "question": "What does 'Data Isolation' mean from an end-user reporting perspective?",
    "options": [
      "Files are kept in distinct silos and proprietary formats, making it impossible to produce a single integrated report without manual consolidation",
      "Files are stored in cold storage rooms",
      "Data is transmitted through isolated radio waves",
      "Files cannot be printed on paper"
    ],
    "correctAnswer": 0,
    "explanation": "Data isolation prevents integrated enterprise reporting because each department uses proprietary file structures and independent software silos.",
    "hint": "Data locked in isolated departmental silos."
  },
  {
    "id": 20,
    "question": "In the 1960s and 1970s, which technological evolution directly addressed the critical flaws of file processing systems?",
    "options": [
      "The invention of Database Management Systems (DBMS) and Relational Database models by E.F. Codd",
      "The invention of 3.5 inch floppy disks",
      "The development of dot matrix printers",
      "The release of Microsoft Paint"
    ],
    "correctAnswer": 0,
    "explanation": "Dr. Edgar F. Codd published his seminal paper in 1970 introducing the Relational Database model to eliminate the severe drawbacks of file processing.",
    "hint": "E.F. Codd's relational database model."
  },
  {
    "id": 21,
    "question": "Which of the following is an example of an integrity constraint violation that a file system fails to catch automatically?",
    "options": [
      "A user enters -50 in the 'Age' column or text in a phone number field",
      "A user writes a correct SQL statement",
      "A user backs up their files",
      "A user logs into the system with valid credentials"
    ],
    "correctAnswer": 0,
    "explanation": "A plain text or CSV file cannot enforce domain integrity; it blindly accepts negative ages, invalid dates, or alphabets in numeric fields.",
    "hint": "Invalid domain values like negative age."
  },
  {
    "id": 22,
    "question": "In CBSE board questions, what is the single most important definition of a 'Database'?",
    "options": [
      "An organized, centralized collection of interrelated data stored with minimum redundancy to serve multiple applications",
      "A collection of random text files on a desktop",
      "A software program that plays videos",
      "The physical hard disk inside a server"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE official definition: A database is an organized collection of logically related data, stored together without harmful duplication, accessible to multiple users.",
    "hint": "Organized collection of logically related data with minimal redundancy."
  },
  {
    "id": 23,
    "question": "How does a DBMS resolve the problem of 'Difficulty in Accessing Data' present in file systems?",
    "options": [
      "By providing a standard, declarative, high-level query language (SQL) allowing immediate ad-hoc data retrieval",
      "By deleting all files from the disk",
      "By forcing users to memorize binary machine code",
      "By restricting data access to one person per year"
    ],
    "correctAnswer": 0,
    "explanation": "SQL allows non-programmers and analysts to retrieve complex data with simple declarative queries like 'SELECT * FROM Student WHERE Marks > 90' in milliseconds.",
    "hint": "Structured Query Language (SQL)."
  },
  {
    "id": 24,
    "question": "Which component of an operating system manages raw files on a storage disk, but lacks database awareness?",
    "options": [
      "File Management System / File System (e.g. NTFS, FAT32, ext4)",
      "Database Engine",
      "Query Optimizer",
      "Transaction Coordinator"
    ],
    "correctAnswer": 0,
    "explanation": "OS file systems (NTFS, FAT32) organize bytes into files and directories, but have zero semantic understanding of relations, records, or integrity rules.",
    "hint": "Underlying OS storage manager like NTFS or ext4."
  },
  {
    "id": 25,
    "question": "In summary, what are the three classic 'R-I-I' problems of traditional file processing systems?",
    "options": [
      "Redundancy, Inconsistency, and Isolation",
      "Recovery, Indexing, and Integration",
      "Routing, IP addressing, and Internet",
      "Registers, Interrupts, and Instructions"
    ],
    "correctAnswer": 0,
    "explanation": "The three classic fundamental deficiencies emphasized in CBSE textbooks are Data Redundancy, Data Inconsistency, and Data Isolation.",
    "hint": "Redundancy, Inconsistency, Isolation."
  }
];
