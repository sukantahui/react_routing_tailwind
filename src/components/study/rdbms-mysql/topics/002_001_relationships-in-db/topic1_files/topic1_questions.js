// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is a One-to-One (1:1) relationship in relational database design?",
    shortAnswer: "An association where exactly one row in Table A corresponds to at most one row in Table B, and vice-versa.",
    explanation: "Both sides of the relationship have an upper bound cardinality of 1.",
    hint: "Maximum 1-to-1 instance association.",
    level: "basic"
  },
  {
    question: "What are the three primary architectural reasons to split data into two 1:1 tables instead of one table?",
    shortAnswer: "1) Vertical partitioning for performance (separating heavy blobs/text from core data), 2) Security and access control (isolating salaries or Aadhaar numbers), 3) Avoiding NULL proliferation for sparsely populated optional attributes.",
    explanation: "Improves cache locality, security granularity, and table density.",
    hint: "Performance, Security isolation, Sparse attributes.",
    level: "basic"
  },
  {
    question: "How do you enforce a 1:1 relationship using the 'Foreign Key with UNIQUE' approach?",
    shortAnswer: "Define a Foreign Key column in the child table pointing to the parent table and attach a `UNIQUE` constraint to that Foreign Key.",
    explanation: "The UNIQUE constraint prevents multiple child records from referencing the same parent ID.",
    hint: "Foreign Key + UNIQUE constraint.",
    level: "basic",
    codeExample: "student_id INT NOT NULL UNIQUE,\nCONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES students(student_id)"
  },
  {
    question: "What is the 'Shared Primary Key' (Identifying 1:1) pattern?",
    shortAnswer: "A design where the child table's Primary Key is NOT an auto-increment integer, but IS the Foreign Key referencing the parent table's Primary Key.",
    explanation: "Eliminates surrogate ID duplication and strictly enforces 1:1 at the physical primary key level.",
    hint: "PK is also the FK.",
    level: "moderate",
    codeExample: "CREATE TABLE student_kyc (\n    student_id INT PRIMARY KEY,\n    aadhaar_no VARCHAR(12) NOT NULL UNIQUE,\n    FOREIGN KEY (student_id) REFERENCES students(student_id)\n);"
  },
  {
    question: "In an Optional-to-Mandatory 1:1 relationship (e.g. Student 1..1, Passport 0..1), in which table should the Foreign Key be placed?",
    shortAnswer: "In the OPTIONAL table (`student_passports`), pointing to the mandatory table (`students`).",
    explanation: "Placing it in the mandatory table would require storing NULLs for students who do not possess a passport.",
    hint: "Place in optional table to prevent NULLs in mandatory table.",
    level: "moderate"
  },
  {
    question: "What happens if a developer creates a 1:1 relationship but forgets to add `UNIQUE` to the Foreign Key column?",
    shortAnswer: "The database will treat the relationship as One-to-Many (1:N), allowing multiple child rows to attach to the same parent.",
    explanation: "A standard foreign key allows duplicates unless restricted by a UNIQUE constraint.",
    hint: "Degrades into 1:N relationship.",
    level: "basic"
  },
  {
    question: "What is 'Vertical Partitioning' in database optimization?",
    shortAnswer: "Splitting a single logical table's columns into multiple physical tables linked by a 1:1 relationship to optimize I/O and RAM buffer pool efficiency.",
    explanation: "High-frequency narrow queries don't have to load heavy unread columns from disk.",
    hint: "Splitting wide tables into narrow hot and cold tables.",
    level: "expert"
  },
  {
    question: "How does 1:1 vertical partitioning improve InnoDB buffer pool hit ratios?",
    shortAnswer: "Narrower row sizes allow more rows to fit inside each 16KB InnoDB page in RAM, dramatically increasing cache density and query throughput for frequent queries.",
    explanation: "More active rows per memory page reduces disk I/O.",
    hint: "More rows fit into 16KB InnoDB memory pages.",
    level: "expert"
  },
  {
    question: "How do you query a student along with their optional passport in a 1:1 relationship?",
    shortAnswer: "Using a `LEFT JOIN`: `SELECT s.first_name, p.passport_no FROM students s LEFT JOIN student_passports p ON s.student_id = p.student_id;`.",
    explanation: "Ensures students without passports are still returned with NULL passport fields.",
    hint: "LEFT JOIN preserves rows without matching child records.",
    level: "basic",
    codeExample: "SELECT s.student_id, s.first_name, p.passport_no\nFROM students s\nLEFT JOIN student_passports p ON s.student_id = p.student_id;"
  },
  {
    question: "When should `ON DELETE CASCADE` be used in a 1:1 relationship?",
    shortAnswer: "When the child record is an existential component of the parent (e.g. dropping a student should automatically drop their student profile or KYC record).",
    explanation: "Prevents orphaned child records when master entities are removed.",
    hint: "Existential dependent child entities.",
    level: "moderate",
    codeExample: "CONSTRAINT fk_kyc FOREIGN KEY (student_id)\nREFERENCES students(student_id) ON DELETE CASCADE"
  },
  {
    question: "Can a table have multiple independent 1:1 relationships with other tables?",
    shortAnswer: "Yes, a central `users` table can have independent 1:1 links to `user_profiles`, `user_settings`, and `user_kyc` tables.",
    explanation: "Enables modular micro-schema partitioning around a core identity entity.",
    hint: "Modular micro-schema partitioning.",
    level: "basic"
  },
  {
    question: "What is the performance drawback of over-partitioning into too many 1:1 tables?",
    shortAnswer: "Queries requiring full entity data must execute multiple expensive `JOIN` operations, increasing CPU query plan compilation and execution time.",
    explanation: "Balance vertical partitioning benefits against JOIN overhead.",
    hint: "Excessive JOIN overhead on comprehensive reads.",
    level: "moderate"
  },
  {
    question: "How do you enforce security isolation using 1:1 table relationships in MySQL?",
    shortAnswer: "Place sensitive columns (e.g. salary, Aadhaar hash) in a separate 1:1 table and grant MySQL `SELECT` privileges on that table ONLY to authorized database roles.",
    explanation: "Enforces table-level and column-level RBAC (Role-Based Access Control).",
    hint: "Granular table-level GRANT permissions.",
    level: "expert",
    codeExample: "GRANT SELECT ON college_db.student_kyc TO 'compliance_officer'@'%';"
  },
  {
    question: "What happens if you attempt to insert a duplicate `student_id` into a 1:1 `student_passports` table?",
    shortAnswer: "MySQL immediately aborts the insert with Error 1062: 'Duplicate entry ... for key ...'.",
    explanation: "The UNIQUE constraint on the foreign key enforces the 1:1 cardinality rule.",
    hint: "Error 1062 duplicate key.",
    level: "basic"
  },
  {
    question: "How does the Shared Primary Key pattern reduce index storage overhead compared to the Foreign Key with UNIQUE pattern?",
    shortAnswer: "Shared PK requires only ONE index (the clustered Primary Key), while FK with UNIQUE requires TWO indexes (the clustered PK index + secondary unique FK index).",
    explanation: "Saves disk and RAM by eliminating redundant secondary index trees.",
    hint: "Eliminates secondary unique index overhead.",
    level: "expert"
  },
  {
    question: "How do you insert records into a Shared Primary Key 1:1 relationship in SQL?",
    shortAnswer: "1) Insert the parent student row and retrieve `LAST_INSERT_ID()`, 2) Insert the child profile row using that exact ID as its primary key.",
    explanation: "Explicit ID assignment for identifying relationships.",
    hint: "Parent insert → LAST_INSERT_ID() → Child insert.",
    level: "basic",
    codeExample: "INSERT INTO students (first_name) VALUES ('Mamata');\nSET @id = LAST_INSERT_ID();\nINSERT INTO student_profiles (student_id, biography) VALUES (@id, 'RDBMS Developer');"
  },
  {
    question: "In Crow's Foot notation, how is a Mandatory 1:1 relationship depicted at both line endpoints?",
    shortAnswer: "With two vertical bars (`||`) on BOTH ends of the relationship connector line.",
    explanation: "Indicates exactly one instance on each side.",
    hint: "Double bars (||) on both ends.",
    level: "basic"
  },
  {
    question: "In Crow's Foot notation, how is an Optional 1:1 relationship depicted?",
    shortAnswer: "With a circle and a bar (`O|`) on the optional end, and two bars (`||`) on the mandatory end.",
    explanation: "Zero or one (0..1) on optional side; exactly one (1..1) on mandatory side.",
    hint: "O| on optional end, || on mandatory end.",
    level: "basic"
  },
  {
    question: "Can both ends of a 1:1 relationship be Optional (0..1 to 0..1)?",
    shortAnswer: "Yes (e.g. a Student may or may not have a locker, and a locker may or may not have an assigned student).",
    explanation: "Modeled with a nullable unique foreign key in either table.",
    hint: "Nullable unique foreign key modeling.",
    level: "moderate"
  },
  {
    question: "Why is an identifying 1:1 relationship represented by a solid line in ER diagrams while non-identifying is dashed?",
    shortAnswer: "Solid lines represent Identifying relationships (child PK contains parent PK); dashed lines represent Non-Identifying relationships (child has its own separate PK).",
    explanation: "Standard IDEF1X and MySQL Workbench notation rule.",
    hint: "Solid line = identifying; dashed line = non-identifying.",
    level: "expert"
  },
  {
    question: "What is the difference between a 1:1 relationship and merging all columns into a single table with 1NF?",
    shortAnswer: "A single table is structurally simpler for single-row reads, but violates security segregation and forces all columns into the same physical storage pages.",
    explanation: "1:1 provides architectural separation without violating relational theory.",
    hint: "Single table simplicity vs architectural partitioning.",
    level: "moderate"
  },
  {
    question: "How do you find all parent records that DO NOT have an associated child record in a 1:1 relationship?",
    shortAnswer: "Using an anti-join: `SELECT s.* FROM students s LEFT JOIN student_passports p ON s.student_id = p.student_id WHERE p.student_id IS NULL;`.",
    explanation: "Finds students without passport entries.",
    hint: "LEFT JOIN WHERE child.id IS NULL.",
    level: "basic",
    codeExample: "SELECT s.student_name\nFROM students s\nLEFT JOIN student_passports p ON s.student_id = p.student_id\nWHERE p.student_id IS NULL;"
  },
  {
    question: "Can a `CHECK` constraint be used across two tables in a 1:1 relationship in MySQL 8.0?",
    shortAnswer: "No, SQL CHECK constraints are strictly limited to columns within the same row of the same table. Cross-table rules require Triggers.",
    explanation: "Cross-table assertions are prohibited in MySQL CHECK constraints.",
    hint: "Triggers required for cross-table assertions.",
    level: "expert"
  },
  {
    question: "How does `ON UPDATE CASCADE` behave in a Shared Primary Key 1:1 relationship?",
    shortAnswer: "If the parent table's Primary Key is modified, the child table's Primary Key is automatically updated to the new value by the InnoDB engine.",
    explanation: "Preserves key synchronization across related rows.",
    hint: "Synchronizes primary key updates automatically.",
    level: "moderate"
  },
  {
    question: "Why should large `BLOB` or `LONGTEXT` columns (like profile photos) often be moved to a separate 1:1 table?",
    shortAnswer: "To keep the main table's rows compact so more rows fit per 16KB InnoDB memory page, preventing large blobs from spilling to off-page overflow storage on every standard query.",
    explanation: "Drastically boosts cache hit ratio for standard metadata queries.",
    hint: "Prevents off-page overflow storage and increases page density.",
    level: "expert"
  },
  {
    question: "What happens if you run `DELETE FROM students WHERE student_id = 101;` when the 1:1 foreign key is configured with `ON DELETE RESTRICT`?",
    shortAnswer: "MySQL rejects the delete with Error 1451 if a corresponding child passport record exists; the child record must be deleted first.",
    explanation: "RESTRICT protects dependent records from accidental cascading loss.",
    hint: "Error 1451 blocks parent deletion.",
    level: "basic"
  },
  {
    question: "Can a 1:1 relationship be created between two tables in different database schemas on the same MySQL server?",
    shortAnswer: "Yes, MySQL InnoDB supports cross-database Foreign Keys if both databases reside on the same MySQL instance.",
    explanation: "Syntax: `REFERENCES other_db.table_name(column)`.",
    hint: "Cross-schema foreign keys on same MySQL instance.",
    level: "expert",
    codeExample: "FOREIGN KEY (user_id) REFERENCES auth_db.users(user_id)"
  },
  {
    question: "How do you verify in `information_schema` that a foreign key is strictly enforcing 1:1 cardinality?",
    shortAnswer: "Check that the foreign key column is covered by a Unique index in `information_schema.STATISTICS` (`NON_UNIQUE = 0`).",
    explanation: "Confirms the uniqueness guarantee on the referential column.",
    hint: "NON_UNIQUE = 0 in information_schema.STATISTICS.",
    level: "expert"
  },
  {
    question: "What is an 'Identifying Relationship' in database modeling?",
    shortAnswer: "A relationship where the child entity cannot be uniquely identified without its parent entity, and the parent's primary key forms part of the child's primary key.",
    explanation: "Common in 1:1 extension tables and weak entity sets.",
    hint: "Parent PK is part of child PK.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for designing 1:1 relationships in production schemas?",
    shortAnswer: "1) Verify strong justification (vertical partitioning, security, or sparse attributes). 2) Choose between Foreign Key + UNIQUE vs Shared Primary Key. 3) Place FK in the optional table to prevent NULLs. 4) Use `ON DELETE CASCADE` for dependent entities. 5) Use `LEFT JOIN` for optional reads.",
    explanation: "Following these 5 rules ensures high-performance, cleanly isolated 1:1 relational models.",
    hint: "Justify need, Choose PK strategy, FK in optional table, Cascade deletes, LEFT JOIN.",
    level: "basic"
  }
];

export default questions;
