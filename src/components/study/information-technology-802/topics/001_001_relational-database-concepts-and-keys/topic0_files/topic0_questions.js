export default [
  {
    "id": "t0_q1",
    "question": "What is the primary definition of a Database Management System (DBMS)?",
    "options": [
      "A hardware storage drive used to store operating system files",
      "A software system that enables users to define, create, maintain, and control access to a centralized database",
      "A programming language compiler for compiling SQL scripts",
      "A web browser extension for rendering HTML tables"
    ],
    "answer": "A software system that enables users to define, create, maintain, and control access to a centralized database",
    "explanation": "A DBMS is a collection of interrelated programs that manages a centralized repository of data, providing data abstraction, security, concurrency control, and crash recovery.",
    "explanationBn": "DBMS হলো এমন একটি সফটওয়্যার সিস্টেম যা ডেটাবেস তৈরি, ডেটা সংরক্ষণ, সংশোধন, নিয়ন্ত্রণ এবং সুরক্ষার জন্য ব্যবহৃত হয়।"
  },
  {
    "id": "t0_q2",
    "question": "Which of the following is a major disadvantage of traditional file processing systems?",
    "options": [
      "Strict data isolation and centralized security",
      "Data redundancy and data inconsistency across departmental files",
      "Automated transaction rollback on power failure",
      "Standardized multi-user concurrency control"
    ],
    "answer": "Data redundancy and data inconsistency across departmental files",
    "explanation": "In traditional file systems, data is duplicated across multiple independent files (Data Redundancy), leading to conflicting updates and inconsistencies when one file is modified and another is missed.",
    "explanationBn": "ট্রেডিশনাল ফাইল সিস্টেমে একই ডেটা একাধিক ফাইলে জমা থাকে (Data Redundancy), যার ফলে একটি ফাইল আপডেট হলে অন্য ফাইলে অমিল (Inconsistency) তৈরি হয়।"
  },
  {
    "id": "t0_q3",
    "question": "What does the 'A' in the ACID properties of DBMS transactions represent?",
    "options": [
      "Accessibility",
      "Atomicity",
      "Abstraction",
      "Authentication"
    ],
    "answer": "Atomicity",
    "explanation": "Atomicity means 'All or Nothing'—either all operations of a transaction execute successfully to completion, or none of them take effect in case of a crash or error.",
    "explanationBn": "Atomicity মানে হলো সম্পূর্ণ লেনদেনটি (Transaction) সফলভাবে সম্পন্ন হবে অথবা কোনো অংশই ডেটাবেসে স্থায়ী হবে না (All or Nothing)।"
  },
  {
    "id": "t0_q4",
    "question": "Which architectural level of DBMS describes HOW data is physically stored on storage blocks?",
    "options": [
      "Physical / Internal Level",
      "Logical / Conceptual Level",
      "View / External Level",
      "Application Level"
    ],
    "answer": "Physical / Internal Level",
    "explanation": "The Physical Level (lowest level of data abstraction) describes the physical storage structures, index B-trees, page allocation, and file blocks on disk.",
    "explanationBn": "Physical বা Internal লেভেলে ডেটা কীভাবে হার্ডডিস্ক বা স্টোরেজ ব্লকে সংরক্ষিত থাকে তা নির্দিষ্ট করা হয়।"
  },
  {
    "id": "t0_q5",
    "question": "Why does a banking system require DBMS concurrency control when two users withdraw funds simultaneously?",
    "options": [
      "To prevent double-spending and ensure lost updates do not corrupt the balance",
      "To speed up the internet bandwidth of the bank",
      "To automatically convert INR into foreign currency",
      "To avoid writing SQL queries"
    ],
    "answer": "To prevent double-spending and ensure lost updates do not corrupt the balance",
    "explanation": "Concurrency control mechanisms (like locking and isolation levels) ensure simultaneous transactions do not overwrite each other's intermediate uncommitted data.",
    "explanationBn": "একই সময়ে একাধিক ব্যবহারকারী লেনদেন করলে যাতে ব্যালেন্সের হিসাব ভুল বা বিকৃত না হয়, তার জন্য Concurrency Control প্রয়োজন।"
  },
  {
    "id": "t0_q6",
    "question": "What is 'Data Independence' in relational database architecture?",
    "options": [
      "The capacity to change schema at one level without altering the schema at the next higher level",
      "The ability of users to delete databases without passwords",
      "Running database servers without electricity",
      "Storing data without specifying any data types"
    ],
    "answer": "The capacity to change schema at one level without altering the schema at the next higher level",
    "explanation": "Data independence enables physical changes (e.g., adding indexes or moving disk volumes) or logical changes without breaking existing application programs.",
    "explanationBn": "অ্যাপ্লিকেশন প্রোগ্রাম পরিবর্তন না করেই ডেটাবেসের অভ্যন্তরীণ বা লজিক্যাল কাঠামো পরিবর্তন করার ক্ষমতাকে Data Independence বলে।"
  },
  {
    "id": "t0_q7",
    "question": "In Coder & AccoTax Barrackpore, Sukanta Hui manages student admissions, fee payments, and exam marks. How does a DBMS prevent data redundancy in this scenario?",
    "options": [
      "By storing student personal details once in a master table and linking fees and marks via StudentID",
      "By creating 10 copies of the same student details in every table",
      "By deleting old records every week",
      "By saving data in Microsoft Paint"
    ],
    "answer": "By storing student personal details once in a master table and linking fees and marks via StudentID",
    "explanation": "Normalization and relational foreign keys allow storing entity attributes once in a single master relation, referencing it using primary/foreign key relations.",
    "explanationBn": "মাস্টার টেবিলে শিক্ষার্থীর বিবরণ একবার সংরক্ষণ করে এবং অন্যান্য টেবিলে StudentID দিয়ে লিঙ্ক করে ডেটার পুনরাবৃত্তি রোধ করা হয়।"
  },
  {
    "id": "t0_q8",
    "question": "Which of the following describes 'Data Isolation' in traditional file systems?",
    "options": [
      "Data scattered in different files across different formats, making ad-hoc query programs hard to write",
      "Data stored inside an air-gapped safe",
      "Data encrypted with 256-bit keys",
      "Data only accessible by one person"
    ],
    "answer": "Data scattered in different files across different formats, making ad-hoc query programs hard to write",
    "explanation": "In file systems, data files were created in various proprietary formats by different software, making it extremely tedious to write new programs to retrieve combined reports.",
    "explanationBn": "ফাইল সিস্টেমে বিভিন্ন ফরম্যাটের ফাইলে ডেটা ছড়িয়ে থাকার কারণে নতুন কোনো রিপোর্ট বের করা খুব কঠিন হতো।"
  },
  {
    "id": "t0_q9",
    "question": "What guarantees that once a fee payment transaction is committed, power failure will not erase the payment record?",
    "options": [
      "Durability",
      "Isolation",
      "Consistency",
      "Polymorphism"
    ],
    "answer": "Durability",
    "explanation": "Durability ensures that committed transaction updates persist permanently in non-volatile storage and transaction write-ahead logs (WAL).",
    "explanationBn": "Durability নিশ্চিত করে যে একবার লেনদেন Commit হলে সার্ভার রিস্টার্ট বা পাওয়ার ফেইলিওরেও ডেটা মুছে যাবে না।"
  },
  {
    "id": "t0_q10",
    "question": "Which level of data abstraction is exposed to front-end users like students Mamata and Susmita when checking results?",
    "options": [
      "View Level (External Level)",
      "Physical Level",
      "Operating System Kernel Level",
      "Storage Sector Level"
    ],
    "answer": "View Level (External Level)",
    "explanation": "The View Level provides customized representations of data tailored to specific user roles, hiding underlying tables and internal storage structures.",
    "explanationBn": "সাধারণ ব্যবহারকারী বা শিক্ষার্থীরা শুধু তাদের প্রয়োজনীয় ফলাফল দেখার জন্য View বা External লেভেল ব্যবহার করে।"
  },
  {
    "id": "t0_q11",
    "question": "What is an 'Integrity Constraint' in a relational database?",
    "options": [
      "A condition or rule that all valid data instances must strictly satisfy (e.g. Marks between 0 and 100)",
      "A restriction on how fast the server CPU can run",
      "A requirement to install Linux operating system",
      "A rule that restricts table names to only 3 letters"
    ],
    "answer": "A condition or rule that all valid data instances must strictly satisfy (e.g. Marks between 0 and 100)",
    "explanation": "Integrity constraints enforce business rules, data validity, uniqueness, and referential sanity directly at the database engine level.",
    "explanationBn": "Integrity Constraint হলো ডেটাবেসের এমন নিয়ম বা শর্ত যা নিশ্চিত করে যে ভুল বা অবৈধ ডেটা প্রবেশ করানো যাবে না।"
  },
  {
    "id": "t0_q12",
    "question": "Which component of a DBMS is responsible for determining the most cost-effective execution plan for a SQL query?",
    "options": [
      "Query Optimizer",
      "Buffer Manager",
      "Transaction Log Manager",
      "Authentication Guard"
    ],
    "answer": "Query Optimizer",
    "explanation": "The Query Optimizer analyzes multiple algebraic query execution paths, index statistics, and disk I/O costs to choose the fastest execution strategy.",
    "explanationBn": "Query Optimizer একটি SQL কোয়েরি সবচেয়ে দ্রুত এবং কম খরচে কীভাবে এক্সিকিউট করা যায় তার পরিকল্পনা তৈরি করে।"
  },
  {
    "id": "t0_q13",
    "question": "How does a relational database handle crash recovery?",
    "options": [
      "Using Write-Ahead Logging (WAL) and redo/undo transaction logs",
      "By asking the user to re-type all commands",
      "By formatting the hard drive",
      "By converting all tables into text files"
    ],
    "answer": "Using Write-Ahead Logging (WAL) and redo/undo transaction logs",
    "explanation": "Recovery managers read the write-ahead transaction log upon restart to REDO all committed transactions and UNDO all uncommitted transactions.",
    "explanationBn": "ক্র্যাশ রিকভারির জন্য DBMS ট্রানজ্যাকশন লগ (Redo/Undo Log) ব্যবহার করে কমিট হওয়া ডেটা ফিরিয়ে আনে এবং অসমাপ্ত কাজ বাতিল করে।"
  },
  {
    "id": "t0_q14",
    "question": "What is the primary role of the Data Definition Language (DDL) compiler in a DBMS?",
    "options": [
      "To process schema definitions and store metadata in the Data Dictionary (Catalog)",
      "To display graphical UI themes",
      "To send emails to students",
      "To encrypt network packets"
    ],
    "answer": "To process schema definitions and store metadata in the Data Dictionary (Catalog)",
    "explanation": "DDL statements (CREATE, ALTER, DROP) are compiled into a set of tables stored in the system catalog (data dictionary) containing metadata.",
    "explanationBn": "DDL কম্পাইলার টেবিলের স্কিমা ও মেটাডেটা প্রসেস করে সিস্টেম ক্যাটালগ বা ডেটা ডিকশনারিতে সংরক্ষণ করে।"
  },
  {
    "id": "t0_q15",
    "question": "Which property ensures that a transaction takes the database from one valid consistent state to another?",
    "options": [
      "Consistency",
      "Atomicity",
      "Isolation",
      "Abstraction"
    ],
    "answer": "Consistency",
    "explanation": "Consistency ensures all schema constraints (primary keys, foreign keys, check constraints) remain valid before and after transaction execution.",
    "explanationBn": "Consistency নিশ্চিত করে যে ট্রানজ্যাকশনের আগে ও পরে ডেটাবেস সবসময় সঠিক এবং নিয়মানুযায়ী বৈধ অবস্থায় থাকবে।"
  },
  {
    "id": "t0_q16",
    "question": "Which of the following is an example of an open-source enterprise Relational DBMS?",
    "options": [
      "MySQL",
      "Notepad++",
      "Adobe Photoshop",
      "VLC Media Player"
    ],
    "answer": "MySQL",
    "explanation": "MySQL is an open-source, ACID-compliant relational database management system widely used in industry and taught in CBSE IT (802).",
    "explanationBn": "MySQL হলো একটি অত্যন্ত জনপ্রিয় ওপেন সোর্স রিলেশনাল ডেটাবেস ম্যানেজমেন্ট সিস্টেম।"
  },
  {
    "id": "t0_q17",
    "question": "What is 'Metadata' in database terminology?",
    "options": [
      "Data about data (schema descriptions, column types, constraints, index catalogs)",
      "Heavy metals used in server racks",
      "User password strings",
      "Deleted temporary files"
    ],
    "answer": "Data about data (schema descriptions, column types, constraints, index catalogs)",
    "explanation": "Metadata defines the structural definition, column data types, table relationships, and access permissions stored in the DBMS data catalog.",
    "explanationBn": "মেটাডেটা হলো ডেটা সম্পর্কিত ডেটা—যেমন টেবিলের নাম, কলামের ধরন এবং কনস্ট্রেইন্ট।"
  },
  {
    "id": "t0_q18",
    "question": "In a file system, if two office clerks edit the same student's record at 10:00 AM, what common anomaly occurs?",
    "options": [
      "Lost Update Anomaly (one clerk's edit overwrites the other)",
      "Automatic data backup",
      "Hardware acceleration",
      "Automatic primary key assignment"
    ],
    "answer": "Lost Update Anomaly (one clerk's edit overwrites the other)",
    "explanation": "Without concurrent locking protocols, the last write blindly overwrites the previous write without incorporating both changes.",
    "explanationBn": "লকিং ব্যবস্থা না থাকায় একজন কর্মীর পরিবর্তন অন্যজনের পরিবর্তনের ওপর ওভাররাইট হয়ে তথ্য হারিয়ে যায় (Lost Update)।"
  },
  {
    "id": "t0_q19",
    "question": "Which user is primarily responsible for database schema design, user permissions, performance tuning, and backup recovery?",
    "options": [
      "Database Administrator (DBA)",
      "Graphic Designer",
      "Hardware Technician",
      "Data Entry Operator"
    ],
    "answer": "Database Administrator (DBA)",
    "explanation": "A DBA holds supreme administrative authority over schema architecture, access authorization, query optimization, and disaster recovery.",
    "explanationBn": "Database Administrator (DBA) ডেটাবেসের স্কিমা ডিজাইন, নিরাপত্তা ও ব্যাকআপের সার্বিক দায়িত্বে থাকেন।"
  },
  {
    "id": "t0_q20",
    "question": "Why does SQL provide standardized Declarative querying compared to procedural file parsing?",
    "options": [
      "Users specify WHAT data is needed rather than HOW to navigate storage pointers",
      "Users have to write binary machine codes",
      "Users must write loops and pointer dereferences in C",
      "Users cannot filter records"
    ],
    "answer": "Users specify WHAT data is needed rather than HOW to navigate storage pointers",
    "explanation": "SQL is declarative: you state 'SELECT name FROM students WHERE marks > 90', leaving storage search algorithms to the DBMS optimizer.",
    "explanationBn": "SQL হলো Declarative ভাষা—এখানে ব্যবহারকারীকে বলতে হয় 'কী ডেটা চাই', কীভাবে খুঁজে আনতে হবে তা DBMS ঠিক করে।"
  },
  {
    "id": "t0_q21",
    "question": "What is the consequence of failing to enforce Referential Integrity in an educational database?",
    "options": [
      "Marks table may contain scores for Student IDs that do not exist in the Student master table (Orphan Records)",
      "The computer screen turns black",
      "The printer stops printing",
      "Student grades automatically increase to 100"
    ],
    "answer": "Marks table may contain scores for Student IDs that do not exist in the Student master table (Orphan Records)",
    "explanation": "Without referential integrity, child tables accumulate orphan records pointing to deleted or non-existent parent primary keys.",
    "explanationBn": "Referential Integrity না থাকলে Marks টেবিলে এমন ছাত্রের নম্বর থেকে যাবে যার কোনো অস্তিত্বই Student টেবিলে নেই (Orphan Records)।"
  },
  {
    "id": "t0_q22",
    "question": "Which of the following operations is handled by the DML (Data Manipulation Language) component of DBMS?",
    "options": [
      "INSERT, UPDATE, DELETE, and SELECT queries",
      "CREATE TABLE and ALTER TABLE",
      "GRANT and REVOKE permissions",
      "Formatting the hard disk"
    ],
    "answer": "INSERT, UPDATE, DELETE, and SELECT queries",
    "explanation": "DML commands manipulate actual data instances stored within tables without altering the underlying table structure.",
    "explanationBn": "DML কমান্ডের মাধ্যমে টেবিলের ভেতরের ডেটা যোগ, পরিমার্জন, মুছে ফেলা এবং পড়া হয়।"
  },
  {
    "id": "t0_q23",
    "question": "How does centralized DBMS architecture enhance organizational security compared to desktop spreadsheet files?",
    "options": [
      "Through Role-Based Access Control (RBAC), fine-grained view permissions, and centralized audit logging",
      "By locking the office door with physical keys",
      "By preventing students from learning SQL",
      "By storing data on floppy disks"
    ],
    "answer": "Through Role-Based Access Control (RBAC), fine-grained view permissions, and centralized audit logging",
    "explanation": "DBMS allows granting specific privileges (e.g., SELECT on specific columns, no DELETE) to individual user roles with complete audit trails.",
    "explanationBn": "DBMS ব্যবহারকারীদের নির্দিষ্ট ভূমিকা (Role) অনুযায়ী অনুমোদিত অ্যাক্সেস ও নিরাপত্তা নিয়ন্ত্রণ প্রদান করে।"
  },
  {
    "id": "t0_q24",
    "question": "What is Physical Data Independence?",
    "options": [
      "The ability to modify physical storage structures (e.g. SSD upgrades, B-tree indexes) without modifying conceptual schemas",
      "Running database servers on solar power",
      "Unplugging ethernet cables",
      "Converting tables into text files"
    ],
    "answer": "The ability to modify physical storage structures (e.g. SSD upgrades, B-tree indexes) without modifying conceptual schemas",
    "explanation": "Physical data independence allows DBAs to tune physical storage and file indexes for performance without changing table columns or queries.",
    "explanationBn": "কনসেপচুয়াল স্কিমা পরিবর্তন না করে হার্ডডিস্ক স্টোরেজ বা ইনডেক্সিং পরিবর্তন করার সুবিধাকে Physical Data Independence বলে।"
  },
  {
    "id": "t0_q25",
    "question": "Why is an ACID transaction considered 'Isolated' in MySQL?",
    "options": [
      "Intermediate transaction changes remain invisible to other concurrent transactions until committed",
      "The server runs without an internet connection",
      "Only one student can enroll per year",
      "All tables are stored in separate databases"
    ],
    "answer": "Intermediate transaction changes remain invisible to other concurrent transactions until committed",
    "explanation": "Transaction Isolation prevents dirty reads and uncommitted intermediate state interference during concurrent execution.",
    "explanationBn": "একটি ট্রানজ্যাকশন শেষ (Commit) না হওয়া পর্যন্ত অন্য কোনো ব্যবহারকারী তার মাঝের অসম্পূর্ণ পরিবর্তন দেখতে পায় না।"
  }
];
