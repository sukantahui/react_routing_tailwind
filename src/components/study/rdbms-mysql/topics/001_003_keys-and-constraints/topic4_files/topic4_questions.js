// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is a UNIQUE constraint in MySQL?",
    shortAnswer: "A constraint ensuring that all values in a column or combination of columns are strictly distinct across the table.",
    explanation: "UNIQUE constraints prevent duplicate non-null entries and are implemented as secondary B-Tree indexes.",
    hint: "Ensures distinct column values.",
    level: "basic",
    codeExample: "CONSTRAINT uq_student_email UNIQUE (email)"
  },
  {
    question: "What is the key difference between a PRIMARY KEY and a UNIQUE constraint?",
    shortAnswer: "A table has only ONE Primary Key (which disallows NULLs); a table can have MULTIPLE Unique constraints (which allow NULLs).",
    explanation: "Primary keys define the clustered index; Unique constraints create secondary indexes.",
    hint: "One PK vs multiple UNIQUE keys; NULL tolerance.",
    level: "basic"
  },
  {
    question: "How does MySQL handle `NULL` values in a `UNIQUE` column?",
    shortAnswer: "In standard SQL and MySQL InnoDB, multiple `NULL` values are permitted in a unique column because `NULL != NULL`.",
    explanation: "To forbid both duplicates and NULLs, combine `UNIQUE NOT NULL`.",
    hint: "Multiple NULLs are permitted in UNIQUE columns.",
    level: "moderate"
  },
  {
    question: "What error occurs if an `INSERT` statement violates a `UNIQUE` constraint in MySQL?",
    shortAnswer: "Error 1062 (23000): 'Duplicate entry ... for key ...'.",
    explanation: "InnoDB secondary index rejects duplicate key insertions.",
    hint: "Error 1062 duplicate key.",
    level: "basic"
  },
  {
    question: "What is a Composite UNIQUE Constraint?",
    shortAnswer: "A unique constraint defined across two or more columns, ensuring that the combination of values is distinct across all rows.",
    explanation: "In `UNIQUE (student_id, phone_type)`, the same student can have different phone types, but not two of the same type.",
    hint: "Multi-column distinctness.",
    level: "moderate",
    codeExample: "CREATE TABLE student_phones (\n    student_id INT NOT NULL,\n    phone_type VARCHAR(20) NOT NULL,\n    phone_number VARCHAR(15) NOT NULL,\n    CONSTRAINT uq_student_type UNIQUE (student_id, phone_type)\n);"
  },
  {
    question: "How do you drop a UNIQUE constraint in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP INDEX constraint_name;`.",
    explanation: "In MySQL, unique constraints are implemented as unique indexes, so `DROP INDEX` or `DROP KEY` is used.",
    hint: "ALTER TABLE DROP INDEX constraint_name.",
    level: "moderate",
    codeExample: "ALTER TABLE students DROP INDEX uq_student_email;"
  },
  {
    question: "How do you add a UNIQUE constraint to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT uq_name UNIQUE (column_name);`.",
    explanation: "Requires that the column currently contains no duplicate non-null entries.",
    hint: "ALTER TABLE ADD CONSTRAINT UNIQUE.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD CONSTRAINT uq_student_roll UNIQUE (roll_no);"
  },
  {
    question: "How does `INSERT IGNORE` behave when encountering a UNIQUE constraint collision?",
    shortAnswer: "It silently skips inserting the conflicting row without throwing Error 1062 and returns a non-fatal warning.",
    explanation: "Allows batch loading without aborting the entire transaction.",
    hint: "Silently skips conflicting unique rows.",
    level: "moderate"
  },
  {
    question: "How does `ON DUPLICATE KEY UPDATE` interact with UNIQUE constraints?",
    shortAnswer: "If a collision occurs on ANY unique key (or Primary Key), MySQL executes an `UPDATE` on the conflicting row instead of failing.",
    explanation: "Enables atomic upsert functionality.",
    hint: "Atomic upsert on unique collision.",
    level: "moderate",
    codeExample: "INSERT INTO user_logins (email, login_count)\nVALUES ('mamata@gmail.com', 1)\nON DUPLICATE KEY UPDATE login_count = login_count + 1;"
  },
  {
    question: "Can a Foreign Key reference a column that has a `UNIQUE` constraint instead of a `PRIMARY KEY`?",
    shortAnswer: "Yes, MySQL allows foreign keys to reference any parent column that has an explicit `UNIQUE` constraint or unique index.",
    explanation: "Referential integrity only requires that the parent record is unambiguously unique.",
    hint: "Foreign keys can reference UNIQUE columns.",
    level: "expert"
  },
  {
    question: "Does defining a `UNIQUE` constraint create an index automatically?",
    shortAnswer: "Yes, MySQL InnoDB automatically creates a secondary B-Tree unique index for every `UNIQUE` constraint.",
    explanation: "Provides O(log N) lookup speeds for point queries.",
    hint: "Automatic unique B-Tree secondary index creation.",
    level: "basic"
  },
  {
    question: "What is the difference between `UNIQUE` and `UNIQUE INDEX` in MySQL DDL?",
    shortAnswer: "They are completely synonymous; `UNIQUE (col)` and `UNIQUE INDEX (col)` create identical unique secondary indexes.",
    explanation: "Standard ANSI SQL uses `UNIQUE`, while MySQL dialect also supports `UNIQUE INDEX`.",
    hint: "Syntactically synonymous.",
    level: "basic"
  },
  {
    question: "What happens if you define a Composite Unique constraint on `(col_a, col_b)` and insert `(1, NULL)` twice?",
    shortAnswer: "Both rows are permitted because in SQL, `NULL != NULL`, so `(1, NULL)` is not considered duplicate to another `(1, NULL)`.",
    explanation: "Composite keys containing NULL bypass uniqueness checks in InnoDB.",
    hint: "Composite NULL uniqueness exception.",
    level: "expert"
  },
  {
    question: "How can you prevent multiple NULL values in a column while enforcing uniqueness?",
    shortAnswer: "Declare the column with both `UNIQUE` and `NOT NULL` constraints.",
    explanation: "`email VARCHAR(100) NOT NULL UNIQUE` forbids duplicate strings AND forbids NULLs.",
    hint: "Combine UNIQUE with NOT NULL.",
    level: "basic",
    codeExample: "email VARCHAR(100) NOT NULL UNIQUE"
  },
  {
    question: "What is a Functional Unique Index (Expression Unique Index) in MySQL 8.0?",
    shortAnswer: "A unique index created on the result of an expression or function, such as `UNIQUE ((LOWER(email)))` to enforce case-insensitive uniqueness.",
    explanation: "Prevents inserting both 'user@test.com' and 'USER@TEST.COM'.",
    hint: "Expression-based unique index in MySQL 8.0.",
    level: "expert",
    codeExample: "CREATE TABLE users (\n    user_id INT AUTO_INCREMENT PRIMARY KEY,\n    email VARCHAR(100) NOT NULL,\n    UNIQUE ((LOWER(email)))\n);"
  },
  {
    question: "How do you inspect all Unique constraints defined on a table in MySQL?",
    shortAnswer: "Execute `SHOW INDEX FROM table_name WHERE Non_unique = 0;`.",
    explanation: "Lists all unique indexes including PRIMARY and secondary UNIQUE keys.",
    hint: "SHOW INDEX WHERE Non_unique = 0.",
    level: "moderate",
    codeExample: "SHOW INDEX FROM students WHERE Non_unique = 0;"
  },
  {
    question: "Can a `TEXT` or `BLOB` column have a `UNIQUE` constraint in MySQL?",
    shortAnswer: "Yes, but you MUST specify an explicit prefix length (e.g. `UNIQUE (description(255))`).",
    explanation: "InnoDB cannot index variable-length BLOBs without prefix limits.",
    hint: "Prefix length requirement on TEXT/BLOB.",
    level: "expert",
    codeExample: "CREATE TABLE articles (\n    id INT PRIMARY KEY,\n    content TEXT,\n    UNIQUE (content(100))\n);"
  },
  {
    question: "What is the performance overhead of adding multiple UNIQUE constraints to a table?",
    shortAnswer: "Every UNIQUE constraint adds a secondary B-Tree index that must be updated and checked for collisions on every `INSERT` and `UPDATE`, slightly slowing write throughput.",
    explanation: "The data integrity guarantee far outweighs the negligible microsecond write overhead.",
    hint: "Secondary index write overhead vs data integrity.",
    level: "expert"
  },
  {
    question: "What is the recommended naming convention for UNIQUE constraints in enterprise schemas?",
    shortAnswer: "`uq_tablename_columnname` (or `uq_tablename_col1_col2` for composite keys).",
    explanation: "Explicit naming prevents auto-generated ambiguous symbols and simplifies migration management.",
    hint: "uq_ prefix naming convention.",
    level: "basic",
    codeExample: "CONSTRAINT uq_students_roll_no UNIQUE (roll_no)"
  },
  {
    question: "What is a 'Partial Unique Index' and does MySQL 8.0 support it natively?",
    shortAnswer: "A unique index with a `WHERE` clause (e.g. `UNIQUE WHERE is_active = 1`). MySQL does NOT support partial indexes directly, but can simulate them using generated virtual columns.",
    explanation: "Simulated using `IF(is_active = 1, email, NULL)` virtual columns with a UNIQUE index.",
    hint: "Simulated via generated virtual columns in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "How does `REPLACE INTO` behave on tables with UNIQUE constraints?",
    shortAnswer: "If a collision occurs on a PRIMARY KEY or UNIQUE constraint, `REPLACE` deletes the conflicting old row and inserts the new row.",
    explanation: "Differs from `ON DUPLICATE KEY UPDATE` which modifies columns in-place without deleting.",
    hint: "Delete-and-reinsert behavior of REPLACE INTO.",
    level: "moderate",
    codeExample: "REPLACE INTO student_phones (student_id, phone_type, phone_number)\nVALUES (101, 'Primary', '9876543210');"
  },
  {
    question: "What happens when you update a row to a value that collides with another row's UNIQUE column?",
    shortAnswer: "MySQL aborts the update with Error 1062 (23000) and rolls back the transaction.",
    explanation: "Unique constraints are enforced during both INSERT and UPDATE operations.",
    hint: "Error 1062 during UPDATE.",
    level: "basic"
  },
  {
    question: "Can a single column participate in both a `PRIMARY KEY` and a `UNIQUE` constraint?",
    shortAnswer: "Technically yes, but redundant because a `PRIMARY KEY` already enforces strict uniqueness.",
    explanation: "Adding a UNIQUE constraint to a Primary Key column wastes secondary index RAM.",
    hint: "Redundant secondary index on primary key.",
    level: "moderate"
  },
  {
    question: "How does collation affect `UNIQUE` string column comparisons in MySQL?",
    shortAnswer: "Under case-insensitive collations (e.g. `utf8mb4_0900_ai_ci`), 'Kolkata' and 'kolkata' are treated as identical duplicates, throwing Error 1062.",
    explanation: "Use binary collations (`_bin`) if case-sensitive distinctness is required.",
    hint: "Case-insensitive collations treat different casing as duplicates.",
    level: "expert"
  },
  {
    question: "What is the maximum key prefix length for a UNIQUE index in InnoDB?",
    shortAnswer: "3072 bytes (for `DYNAMIC` or `COMPACT` row formats in InnoDB).",
    explanation: "Wide UTF8MB4 columns (4 bytes per char) can reach this limit if exceeding ~768 characters.",
    hint: "3072-byte InnoDB index prefix limit.",
    level: "expert"
  },
  {
    question: "How does `SELECT ... FOR UPDATE` interact with UNIQUE secondary index lookups?",
    shortAnswer: "InnoDB locks the matched index record and places gap locks around it, preventing other transactions from inserting duplicate values in that range.",
    explanation: "Prevents phantom insertions during serializable workflows.",
    hint: "Gap locking on unique index range.",
    level: "expert"
  },
  {
    question: "What is the difference between a natural alternate candidate key and a surrogate primary key?",
    shortAnswer: "The surrogate key is the artificial integer `PRIMARY KEY`; the natural candidate key (e.g. Email or Passport Number) is protected via a `UNIQUE` constraint.",
    explanation: "Combines fast integer primary key performance with real-world business entity uniqueness.",
    hint: "Surrogate PK + Natural Unique Key architecture.",
    level: "moderate"
  },
  {
    question: "Can a `UNIQUE` constraint be created on multiple columns where one column is `NULL` and the other is `NOT NULL`?",
    shortAnswer: "Yes, composite unique constraints permit mixed nullability.",
    explanation: "Standard multi-column constraint definition.",
    hint: "Mixed nullability in composite unique keys.",
    level: "basic"
  },
  {
    question: "What happens if you attempt to add a `UNIQUE` constraint to a column that already contains duplicate data?",
    shortAnswer: "MySQL rejects the `ALTER TABLE` command with Error 1062, requiring duplicates to be removed before the constraint can be applied.",
    explanation: "Schema modifications validate all existing data before committing index creation.",
    hint: "Pre-existing duplicates block UNIQUE constraint addition.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist for designing UNIQUE constraints in production MySQL tables?",
    shortAnswer: "1) Apply `UNIQUE NOT NULL` to natural business identifiers (Email, PAN, Roll No). 2) Use Composite Unique constraints to enforce business pairing rules. 3) Name constraints explicitly (`uq_table_col`). 4) Use `ON DUPLICATE KEY UPDATE` for idempotent upserts. 5) Use functional unique indexes for case-insensitivity.",
    explanation: "Following these 5 rules guarantees zero duplicate data corruption and seamless application integration.",
    hint: "Unique NOT NULL, Composite pairings, Explicit naming, Idempotent upserts, Case-insensitive indexes.",
    level: "basic"
  }
];

export default questions;
