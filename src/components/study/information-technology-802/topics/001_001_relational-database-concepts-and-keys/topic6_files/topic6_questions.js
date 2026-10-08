export default [
  {
    "id": "t6_q1",
    "question": "What is a 'Foreign Key' in a relational database?",
    "options": [
      "An attribute (or set of attributes) in a child table whose values must match the Primary Key of a referenced parent table (or be NULL)",
      "A key imported from an external international database",
      "A password used by foreign visitors",
      "A primary key that has text data"
    ],
    "answer": "An attribute (or set of attributes) in a child table whose values must match the Primary Key of a referenced parent table (or be NULL)",
    "explanation": "Foreign keys establish cross-table links and enforce referential integrity between parent (referenced) and child (referencing) tables.",
    "explanationBn": "Foreign Key হলো চাইল্ড টেবিলের এমন একটি কলাম যার মান প্যারেন্ট টেবিলের Primary Key-এর সাথে হুবহু মিলতে হবে অথবা NULL হতে পারবে।"
  },
  {
    "id": "t6_q2",
    "question": "What is 'Referential Integrity' in RDBMS?",
    "options": [
      "A constraint ensuring that relationships between tables remain consistent, preventing orphan child records from referencing non-existent parent rows",
      "Checking that all computers are connected to the internet",
      "Ensuring that student names are spelled correctly",
      "Making sure database files are backed up daily"
    ],
    "answer": "A constraint ensuring that relationships between tables remain consistent, preventing orphan child records from referencing non-existent parent rows",
    "explanation": "Referential integrity guarantees that foreign key values in dependent tables correspond to valid, existing primary key values in parent tables.",
    "explanationBn": "Referential Integrity নিশ্চিত করে যে চাইল্ড টেবিলে এমন কোনো Foreign Key থাকতে পারবে না যার অস্তিত্ব প্যারেন্ট টেবিলে নেই।"
  },
  {
    "id": "t6_q3",
    "question": "In a school database with `PARENTS(ParentID, ParentName)` and `STUDENT(StudentID, StuName, ParentID)`, which table is the Parent Table and which is the Child Table?",
    "options": [
      "`PARENTS` is the Parent (Referenced) Table; `STUDENT` is the Child (Referencing/Dependent) Table",
      "`STUDENT` is the Parent Table; `PARENTS` is the Child Table",
      "Both are parent tables",
      "Both are child tables"
    ],
    "answer": "`PARENTS` is the Parent (Referenced) Table; `STUDENT` is the Child (Referencing/Dependent) Table",
    "explanation": "`PARENTS` defines the primary key `ParentID` (Referenced Table), while `STUDENT` holds the foreign key `ParentID` (Referencing Table).",
    "explanationBn": "`PARENTS` হলো প্যারেন্ট (মাস্টার) টেবিল এবং `STUDENT` হলো ডিপেন্ডেন্ট চাইল্ড টেবিল।"
  },
  {
    "id": "t6_q4",
    "question": "What is the correct sequence when inserting data into parent and child tables?",
    "options": [
      "Insert the row into the Parent table FIRST, then insert into the Child table",
      "Insert into the Child table first, then Parent table",
      "Insert into both simultaneously without sequence",
      "Insertion sequence does not matter"
    ],
    "answer": "Insert the row into the Parent table FIRST, then insert into the Child table",
    "explanation": "Referential integrity requires the referenced primary key to exist before a child foreign key can point to it.",
    "explanationBn": "প্রথমে প্যারেন্ট টেবিলে মাস্টার ডেটা ইনসার্ট করতে হবে, তারপর চাইল্ড টেবিলে ইনসার্ট করতে হবে।"
  },
  {
    "id": "t6_q5",
    "question": "What does the action `ON DELETE CASCADE` do in a Foreign Key definition?",
    "options": [
      "When a row in the parent table is deleted, all corresponding child rows referencing that parent key are automatically deleted",
      "Prevents the parent row from ever being deleted",
      "Sets the child foreign key column to NULL",
      "Deletes the entire database"
    ],
    "answer": "When a row in the parent table is deleted, all corresponding child rows referencing that parent key are automatically deleted",
    "explanation": "`ON DELETE CASCADE` propagates deletions from the parent to child records, preventing orphan records.",
    "explanationBn": "`ON DELETE CASCADE` প্যারেন্ট টেবিল থেকে কোনো রেকর্ড ডিলিট হলে চাইল্ড টেবিলের সংশ্লিষ্ট সমস্ত রেকর্ডও স্বয়ংক্রিয়ভাবে মুছে ফেলে।"
  },
  {
    "id": "t6_q6",
    "question": "What does the action `ON DELETE SET NULL` do in a Foreign Key definition?",
    "options": [
      "When the parent record is deleted, all matching child foreign key values are automatically updated to NULL",
      "Deletes the child table schema",
      "Sets student marks to 0",
      "Throws an error"
    ],
    "answer": "When the parent record is deleted, all matching child foreign key values are automatically updated to NULL",
    "explanation": "`ON DELETE SET NULL` keeps child records intact while decoupling them from the deleted parent by setting the foreign key to NULL.",
    "explanationBn": "`ON DELETE SET NULL` প্যারেন্ট রেকর্ড মুছে গেলে চাইল্ড রেকর্ডের Foreign Key কলামটিকে NULL করে দেয়।"
  },
  {
    "id": "t6_q7",
    "question": "What does `ON DELETE RESTRICT` (or `NO ACTION`) do in MySQL?",
    "options": [
      "Rejects and aborts the DELETE command if any child record currently references the parent key",
      "Deletes the child rows silently",
      "Renames the table",
      "Converts foreign keys to primary keys"
    ],
    "answer": "Rejects and aborts the DELETE command if any child record currently references the parent key",
    "explanation": "RESTRICT stops the administrator from deleting a parent record as long as dependent child rows exist.",
    "explanationBn": "`ON DELETE RESTRICT` চাইল্ড রেকর্ড বিদ্যমান থাকা অবস্থায় প্যারেন্ট রেকর্ড ডিলিট করতে বাধা দেয়।"
  },
  {
    "id": "t6_q8",
    "question": "Can a Foreign Key column in a child table contain duplicate values?",
    "options": [
      "Yes, foreign keys allow duplicates (e.g. multiple students sharing the same `ParentID`)",
      "No, foreign keys must always be unique",
      "Only if the column is named 'Duplicate'",
      "Never"
    ],
    "answer": "Yes, foreign keys allow duplicates (e.g. multiple students sharing the same `ParentID`)",
    "explanation": "A Foreign Key represents a 1-to-Many relationship, so the same parent key value can appear multiple times in the child table.",
    "explanationBn": "Foreign Key কলামে ডুপ্লিকেট মান থাকতে পারে—যেমন একই অভিভাবকের একাধিক সন্তান (1-to-Many সম্পর্ক)।"
  },
  {
    "id": "t6_q9",
    "question": "Can a Foreign Key column contain NULL values?",
    "options": [
      "Yes, a foreign key can contain NULL (unless explicitly restricted with `NOT NULL`)",
      "No, foreign keys reject all NULLs",
      "Only on Sundays",
      "Only in temporary tables"
    ],
    "answer": "Yes, a foreign key can contain NULL (unless explicitly restricted with `NOT NULL`)",
    "explanation": "A NULL in a foreign key indicates that the relationship is optional or unassigned.",
    "explanationBn": "Foreign Key কলামে NULL মান গ্রহণযোগ্য (যদি না NOT NULL নির্দিষ্ট করা থাকে)।"
  },
  {
    "id": "t6_q10",
    "question": "In Coder & AccoTax Barrackpore, Sukanta Hui creates `Course` (Parent) and `Enrollment` (Child). What happens if student Mamata enrolls in `CourseID = 'C999'`, which does not exist in `Course`?",
    "options": [
      "MySQL throws `ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails`",
      "MySQL automatically creates course 'C999'",
      "MySQL shuts down the school server",
      "The query executes successfully without error"
    ],
    "answer": "MySQL throws `ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails`",
    "explanation": "Referential integrity blocks the insertion of invalid foreign keys pointing to non-existent parent rows.",
    "explanationBn": "প্যারেন্ট টেবিলে অস্তিত্বহীন কোনো কোর্সে ভর্তি হতে গেলে Foreign Key Constraint ভঙ্গের এরর আসবে।"
  },
  {
    "id": "t6_q11",
    "question": "What is an 'Orphan Record'?",
    "options": [
      "A row in a child table whose foreign key value references a non-existent or deleted parent primary key",
      "A table without any columns",
      "A database without a DBA",
      "A deleted file in the recycle bin"
    ],
    "answer": "A row in a child table whose foreign key value references a non-existent or deleted parent primary key",
    "explanation": "Orphan records occur when referential integrity is violated or not enforced in flat files.",
    "explanationBn": "Orphan Record হলো এমন চাইল্ড রেকর্ড যার রেফারেন্স করা মূল প্যারেন্ট রেকর্ডটি ডিলিট হয়ে গেছে।"
  },
  {
    "id": "t6_q12",
    "question": "Which clause in SQL `CREATE TABLE` defines a foreign key?",
    "options": [
      "`FOREIGN KEY (col) REFERENCES ParentTable(pk_col)`",
      "`LINK TO ParentTable(pk_col)`",
      "`JOIN ParentTable(pk_col)`",
      "`CONNECT ParentTable`"
    ],
    "answer": "`FOREIGN KEY (col) REFERENCES ParentTable(pk_col)`",
    "explanation": "`FOREIGN KEY (...) REFERENCES ...` is standard ANSI SQL DDL syntax.",
    "explanationBn": "Foreign Key তৈরি করতে `FOREIGN KEY (কলাম) REFERENCES প্যারেন্ট_টেবিল(PK_কলাম)` লিখতে হয়।"
  },
  {
    "id": "t6_q13",
    "question": "What does `ON UPDATE CASCADE` do in a Foreign Key definition?",
    "options": [
      "If the primary key value in the parent table is updated, all matching foreign key values in child rows are updated automatically",
      "Updates the current date and time",
      "Deletes the child table",
      "Sends an email alert"
    ],
    "answer": "If the primary key value in the parent table is updated, all matching foreign key values in child rows are updated automatically",
    "explanation": "`ON UPDATE CASCADE` keeps foreign key links in sync when parent primary keys are modified.",
    "explanationBn": "প্যারেন্ট টেবিলে Primary Key আপডেট হলে চাইল্ড টেবিলে থাকা Foreign Key-ও স্বয়ংক্রিয়ভাবে আপডেট হয়ে যায়।"
  },
  {
    "id": "t6_q14",
    "question": "Can a child table have more than one Foreign Key column referencing different parent tables?",
    "options": [
      "Yes, a table can have multiple foreign keys referencing multiple distinct parent tables (e.g. `Enrollment` referencing `Student` and `Course`)",
      "No, only one foreign key is allowed per table",
      "Only in Oracle, not in MySQL",
      "Maximum 2 foreign keys"
    ],
    "answer": "Yes, a table can have multiple foreign keys referencing multiple distinct parent tables (e.g. `Enrollment` referencing `Student` and `Course`)",
    "explanation": "A junction or transaction table typically references multiple master parent tables.",
    "explanationBn": "একটি চাইল্ড টেবিলে একাধিক প্যারেন্ট টেবিলের Foreign Key থাকতে পারে (যেমন Enrollment টেবিলে StudentID ও CourseID)।"
  },
  {
    "id": "t6_q15",
    "question": "What is the correct sequence when dropping parent and child tables using `DROP TABLE`?",
    "options": [
      "Drop the Child table FIRST, then drop the Parent table",
      "Drop the Parent table first, then Child table",
      "Drop both tables in a single command without sequence",
      "Sequence does not matter"
    ],
    "answer": "Drop the Child table FIRST, then drop the Parent table",
    "explanation": "A parent table cannot be dropped while child tables are actively referencing it.",
    "explanationBn": "প্রথমে চাইল্ড টেবিল ড্রপ করতে হবে, তারপর প্যারেন্ট টেবিল ড্রপ করতে হবে।"
  },
  {
    "id": "t6_q16",
    "question": "What data type must the Foreign Key column have compared to the referenced Primary Key column?",
    "options": [
      "The exact same (or compatible) data type and precision (e.g. both `VARCHAR(10)` or both `INT`)",
      "Foreign key must always be INT",
      "Foreign key must be text while Primary key is number",
      "Data types do not need to match"
    ],
    "answer": "The exact same (or compatible) data type and precision (e.g. both `VARCHAR(10)` or both `INT`)",
    "explanation": "Referential integrity requires identical data types and signs (e.g. `INT UNSIGNED`) on both sides of the relationship.",
    "explanationBn": "Foreign Key এবং Primary Key উভয়ের ডেটা টাইপ এবং আকার একই হতে হবে।"
  },
  {
    "id": "t6_q17",
    "question": "In the 2026 CBSE board sample paper, a question asks: 'Which key is used to represent relationships between two tables in a relational model?' What is the answer?",
    "options": [
      "Foreign Key",
      "Primary Key",
      "Candidate Key",
      "Alternate Key"
    ],
    "answer": "Foreign Key",
    "explanation": "A Foreign Key is the relational construct that establishes cross-table links.",
    "explanationBn": "দুটি টেবিলের মধ্যে সম্পর্ক তৈরি করতে Foreign Key ব্যবহৃত হয়।"
  },
  {
    "id": "t6_q18",
    "question": "What is a 'Composite Foreign Key'?",
    "options": [
      "A foreign key consisting of two or more columns that references a composite primary key in the parent table",
      "A foreign key with numbers and letters",
      "A foreign key referencing two different databases",
      "A foreign key created in 2026"
    ],
    "answer": "A foreign key consisting of two or more columns that references a composite primary key in the parent table",
    "explanation": "If the parent table has a composite PK `(Class, Section, RollNo)`, the child foreign key must also comprise `(Class, Section, RollNo)`.",
    "explanationBn": "প্যারেন্ট টেবিলের Composite Primary Key-কে নির্দেশ করার জন্য চাইল্ড টেবিলে Composite Foreign Key ব্যবহার করা হয়।"
  },
  {
    "id": "t6_q19",
    "question": "In a 1-to-Many relationship between `DEPARTMENT` and `EMPLOYEE`, on which table does the Foreign Key reside?",
    "options": [
      "`EMPLOYEE` (the Many side)",
      "`DEPARTMENT` (the One side)",
      "A separate third table",
      "Neither table"
    ],
    "answer": "`EMPLOYEE` (the Many side)",
    "explanation": "In a 1:M relationship, the foreign key always resides in the table on the 'Many' side referencing the 'One' side.",
    "explanationBn": "1-to-Many সম্পর্কের ক্ষেত্রে Foreign Key সবসময় 'Many' পক্ষের টেবিলে (Employee) থাকে।"
  },
  {
    "id": "t6_q20",
    "question": "What happens if a DBA attempts `DROP TABLE PARENTS;` while `STUDENT` still references it in MySQL?",
    "options": [
      "MySQL rejects the command with `Cannot drop table 'PARENTS' referenced by a FOREIGN KEY constraint`",
      "MySQL deletes both tables",
      "MySQL crashes",
      "MySQL ignores the foreign key"
    ],
    "answer": "MySQL rejects the command with `Cannot drop table 'PARENTS' referenced by a FOREIGN KEY constraint`",
    "explanation": "MySQL protects schema referential integrity by prohibiting the destruction of referenced parent tables.",
    "explanationBn": "চাইল্ড টেবিল রেফারেন্স করে থাকলে MySQL প্যারেন্ট টেবিল ড্রপ করতে দেবে না।"
  },
  {
    "id": "t6_q21",
    "question": "Can a foreign key reference a column that is defined as `UNIQUE` instead of `PRIMARY KEY` in the parent table?",
    "options": [
      "Yes, standard SQL allows foreign keys to reference any candidate key or column with a `UNIQUE` constraint",
      "No, only PRIMARY KEY can ever be referenced",
      "Only if the column name is identical",
      "Only in temporary tables"
    ],
    "answer": "Yes, standard SQL allows foreign keys to reference any candidate key or column with a `UNIQUE` constraint",
    "explanation": "A foreign key can reference either a Primary Key or a column with a UNIQUE constraint.",
    "explanationBn": "Foreign Key কেবল Primary Key নয়, UNIQUE কলামকেও রেফারেন্স করতে পারে।"
  },
  {
    "id": "t6_q22",
    "question": "What is the primary benefit of `ON DELETE CASCADE` in school fee management systems?",
    "options": [
      "Ensures student fee receipts and exam marks are automatically cleaned up when a student's master registration is deleted",
      "Gives fee discounts to students",
      "Increases school internet speed",
      "Prints receipts on gold paper"
    ],
    "answer": "Ensures student fee receipts and exam marks are automatically cleaned up when a student's master registration is deleted",
    "explanation": "Cascade deletes prevent orphan transactions from cluttering database storage.",
    "explanationBn": "ছাত্রের মূল রেজিস্ট্রেশন মুছে গেলে সংশ্লিষ্ট বকেয়া ও নম্বরের রেকর্ড স্বয়ংক্রিয়ভাবে ক্লিন হয়ে যায়।"
  },
  {
    "id": "t6_q23",
    "question": "How does a foreign key maintain Referential Integrity during an `UPDATE` on a child table?",
    "options": [
      "By verifying that the new foreign key value being saved already exists in the parent table's primary key list",
      "By updating the operating system time",
      "By sending a message to the user",
      "By deleting the row"
    ],
    "answer": "By verifying that the new foreign key value being saved already exists in the parent table's primary key list",
    "explanation": "Any UPDATE to a foreign key column is checked against parent keys before committing.",
    "explanationBn": "চাইল্ড টেবিলে আপডেট করার সময় নতুন মানটি প্যারেন্ট টেবিলে আছে কিনা তা যাচাই করা হয়।"
  },
  {
    "id": "t6_q24",
    "question": "In the relationship `PARENTS` (Parent) and `STUDENT` (Child), can parent Suman Singh have 2 children in the `STUDENT` table?",
    "options": [
      "Yes, multiple rows in `STUDENT` can contain `ParentID = 'P001'`",
      "No, only 1 child allowed per parent in SQL",
      "Only if they have the same name",
      "Never"
    ],
    "answer": "Yes, multiple rows in `STUDENT` can contain `ParentID = 'P001'`",
    "explanation": "Foreign keys facilitate 1:N cardinality, allowing multiple child records to share the same parent key.",
    "explanationBn": "Foreign Key কলামে একই ParentID একাধিক ছাত্রের রো-তে থাকতে পারে (1:N সম্পর্ক)।"
  },
  {
    "id": "t6_q25",
    "question": "Which summary rule encapsulates the core principle of Foreign Keys?",
    "options": [
      "Every Foreign Key value in a child table must either match a valid Primary Key in the parent table or be NULL",
      "Foreign keys must always be unique in every table",
      "Foreign keys cannot reference the same database",
      "Foreign keys are only used for security passwords"
    ],
    "answer": "Every Foreign Key value in a child table must either match a valid Primary Key in the parent table or be NULL",
    "explanation": "This is the fundamental definition of the Referential Integrity Rule in the Relational Model.",
    "explanationBn": "চাইল্ড টেবিলের প্রতিটি Foreign Key মান প্যারেন্ট টেবিলের Primary Key-এর সাথে মিলতে হবে অথবা NULL হতে হবে।"
  }
];
