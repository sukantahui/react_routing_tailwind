// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the primary purpose of the `ALTER TABLE` statement in MySQL?",
    shortAnswer: "To modify the structural definition of an existing table (columns, indexes, constraints, engine options) without dropping or losing existing data.",
    explanation: "Executing `ALTER TABLE` performs Data Definition operations on existing relations, allowing schema evolution as application business requirements change.",
    hint: "Schema evolution and in-place table modification.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD phone_no CHAR(10);"
  },
  {
    question: "What is the difference between `MODIFY COLUMN` and `CHANGE COLUMN` in MySQL?",
    shortAnswer: "`MODIFY` changes a column's data type, constraints, or position without changing its name; `CHANGE` can rename the column AND change its type simultaneously.",
    explanation: "`ALTER TABLE t MODIFY col VARCHAR(100);` only alters type/constraints. `ALTER TABLE t CHANGE old_col new_col VARCHAR(100);` renames the column from `old_col` to `new_col` while also redefining its type.",
    hint: "Modify type only vs rename and redefine simultaneously.",
    level: "basic",
    codeExample: "ALTER TABLE students MODIFY email VARCHAR(150) NOT NULL;\nALTER TABLE students CHANGE roll_no reg_no VARCHAR(25) NOT NULL;"
  },
  {
    question: "How do you simply rename a column in MySQL 8.0 without having to restate its full data type?",
    shortAnswer: "Using the `RENAME COLUMN old_name TO new_name;` syntax.",
    explanation: "MySQL 8.0 introduced `RENAME COLUMN`, eliminating the tedious and error-prone requirement of retyping the complete data type definition needed by legacy `CHANGE COLUMN`.",
    hint: "MySQL 8.0+ clean column rename syntax.",
    level: "basic",
    codeExample: "ALTER TABLE students RENAME COLUMN roll_no TO registration_no;"
  },
  {
    question: "How do you control the position of a newly added column (e.g. placing it at the very beginning or after a specific column)?",
    shortAnswer: "By using the `FIRST` or `AFTER column_name` positioning clause.",
    explanation: "By default, MySQL appends new columns to the very end of the table. Adding `FIRST` places it at column position 1; adding `AFTER last_name` places it immediately following `last_name`.",
    hint: "FIRST and AFTER positioning keywords.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD middle_name VARCHAR(50) AFTER first_name;\nALTER TABLE students ADD student_uuid CHAR(36) FIRST;"
  },
  {
    question: "What happens to existing row data when a column is dropped using `ALTER TABLE ... DROP COLUMN`?",
    shortAnswer: "All data stored in that column across all records is permanently and irreversibly destroyed.",
    explanation: "Dropping a column removes its metadata from the data dictionary and reclaims space in subsequent table rebuilds. There is no undo or recovery without restoring from backups.",
    hint: "Permanent data destruction upon column drop.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP COLUMN legacy_notes;"
  },
  {
    question: "Why is batching multiple alterations into a single `ALTER TABLE` statement dramatically faster than executing multiple separate ALTER statements?",
    shortAnswer: "A single batched `ALTER TABLE` statement only reconstructs the table or index pages ONCE, whereas multiple separate statements trigger multiple expensive full table rewrites.",
    explanation: "Altering a table with 10 million rows involves disk I/O and page reallocations. Running 5 separate ALTER statements causes 5 table rewrites; batching them with commas does it in 1 pass.",
    hint: "Single table rebuild pass vs multiple disk rewrites.",
    level: "expert",
    codeExample: "ALTER TABLE customer_orders\n    ADD tracking_id VARCHAR(50),\n    MODIFY subtotal DECIMAL(12, 2),\n    DROP COLUMN temp_status;"
  },
  {
    question: "What is `ALGORITHM = INSTANT` in MySQL 8.0 Online DDL?",
    shortAnswer: "An instant metadata-only DDL operation that modifies table structure in less than a millisecond without copying or rebuilding table data.",
    explanation: "MySQL 8.0 introduced instant DDL for operations like adding a column at the end of a table (and in 8.0.29+, at any position). It updates the data dictionary instantaneously with zero table lock.",
    hint: "Sub-millisecond metadata-only schema evolution.",
    level: "expert",
    codeExample: "ALTER TABLE customer_orders ADD is_gift TINYINT(1) DEFAULT 0, ALGORITHM = INSTANT;"
  },
  {
    question: "What risk occurs when modifying a column from a larger data type to a smaller one (e.g. `VARCHAR(100)` to `VARCHAR(30)`) with existing records?",
    shortAnswer: "In strict SQL mode, MySQL aborts the ALTER with an error if any existing row exceeds 30 characters; in non-strict mode, data is permanently truncated.",
    explanation: "Data truncation can cause lost customer names or corrupted hashes. Always query `MAX(LENGTH(col))` before shrinking a column's width in production.",
    hint: "Data truncation risk on type narrowing.",
    level: "moderate",
    codeExample: "SELECT MAX(CHAR_LENGTH(email)) FROM students; -- Verify before narrowing"
  },
  {
    question: "How do you rename an entire table using SQL?",
    shortAnswer: "`ALTER TABLE old_name RENAME TO new_name;` or `RENAME TABLE old_name TO new_name;`.",
    explanation: "Both statements rename the relation in the data dictionary and rename the physical `.ibd` file on disk instantaneously.",
    hint: "RENAME TO or standalone RENAME TABLE.",
    level: "basic",
    codeExample: "ALTER TABLE students RENAME TO college_students;\nRENAME TABLE old_orders TO orders_archive;"
  },
  {
    question: "How can you atomically swap two table names using `RENAME TABLE`?",
    shortAnswer: "`RENAME TABLE current_tbl TO temp_tbl, new_tbl TO current_tbl, temp_tbl TO old_tbl;` in a single statement.",
    explanation: "MySQL executes multi-table `RENAME TABLE` operations atomically from left to right, allowing zero-downtime blue-green schema deployments.",
    hint: "Atomic zero-downtime table swap.",
    level: "expert",
    codeExample: "RENAME TABLE products TO products_old, products_staging TO products;"
  },
  {
    question: "How do you add a new `PRIMARY KEY` to a table that currently lacks one?",
    shortAnswer: "`ALTER TABLE table_name ADD PRIMARY KEY (column_name);`.",
    explanation: "Adding a primary key builds the InnoDB clustered B+ tree index and enforces that the target column contains NO duplicate values and NO nulls.",
    hint: "ADD PRIMARY KEY syntax.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD PRIMARY KEY (student_id);"
  },
  {
    question: "How do you drop an existing Primary Key from a table?",
    shortAnswer: "`ALTER TABLE table_name DROP PRIMARY KEY;`.",
    explanation: "Dropping a primary key is only permitted if the column does not have `AUTO_INCREMENT` enabled. If `AUTO_INCREMENT` is active, you must first modify the column to remove auto-increment before dropping the key.",
    hint: "DROP PRIMARY KEY clause.",
    level: "moderate",
    codeExample: "ALTER TABLE temp_tbl DROP PRIMARY KEY;"
  },
  {
    question: "How do you add a Foreign Key constraint to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE child_tbl ADD CONSTRAINT fk_name FOREIGN KEY (child_col) REFERENCES parent_tbl(parent_col) ON DELETE CASCADE;`.",
    explanation: "MySQL checks that all existing data in `child_col` currently exists in `parent_tbl`. If any orphaned records exist, the statement fails with Error 1452.",
    hint: "ADD CONSTRAINT FOREIGN KEY syntax.",
    level: "moderate",
    codeExample: "ALTER TABLE course_enrollments\nADD CONSTRAINT fk_enroll_student\nFOREIGN KEY (student_id) REFERENCES students(student_id)\nON DELETE CASCADE;"
  },
  {
    question: "How do you drop a Foreign Key constraint from a table in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP FOREIGN KEY foreign_key_name;`.",
    explanation: "Foreign keys MUST be dropped by their explicit constraint name, which can be retrieved via `SHOW CREATE TABLE table_name`.",
    hint: "DROP FOREIGN KEY followed by constraint identifier.",
    level: "moderate",
    codeExample: "ALTER TABLE course_enrollments DROP FOREIGN KEY fk_enroll_student;"
  },
  {
    question: "How do you add a `CHECK` constraint to an existing table in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT chk_name CHECK (boolean_expression);`.",
    explanation: "MySQL validates existing records against the condition. If all rows pass, the constraint is enabled for all future write operations.",
    hint: "ADD CONSTRAINT CHECK syntax.",
    level: "moderate",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_fee_positive CHECK (admission_fee >= 0.00);"
  },
  {
    question: "How do you add a new secondary index to a table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name ADD INDEX idx_name (column_name);` (or `ADD UNIQUE idx_name (column_name);`).",
    explanation: "Building an index via `ALTER TABLE` utilizes InnoDB Online DDL with `LOCK = NONE`, allowing concurrent reads and writes while the index builds.",
    hint: "ADD INDEX or ADD UNIQUE clause.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD INDEX idx_first_name (first_name);"
  },
  {
    question: "How do you drop a secondary index from a table?",
    shortAnswer: "`ALTER TABLE table_name DROP INDEX index_name;`.",
    explanation: "Dropping an index removes the secondary B-Tree pages and frees disk space immediately.",
    hint: "DROP INDEX syntax.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP INDEX idx_first_name;"
  },
  {
    question: "How do you change the default character set and collation of an entire table and convert all existing string columns?",
    shortAnswer: "`ALTER TABLE table_name CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`.",
    explanation: "Using `CONVERT TO CHARACTER SET` converts both the table's default metadata AND transcodes every existing CHAR, VARCHAR, and TEXT column to the new encoding.",
    hint: "CONVERT TO CHARACTER SET vs DEFAULT CHARACTER SET.",
    level: "expert",
    codeExample: "ALTER TABLE students CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;"
  },
  {
    question: "What is the difference between `DEFAULT CHARACTER SET utf8mb4` and `CONVERT TO CHARACTER SET utf8mb4`?",
    shortAnswer: "`DEFAULT CHARACTER SET` only changes default inheritance for FUTURE columns; `CONVERT TO CHARACTER SET` actively transcodes all EXISTING string columns.",
    explanation: "If you only want new columns to inherit utf8mb4 without modifying existing columns, use `DEFAULT CHARACTER SET`. To convert existing data, use `CONVERT TO`.",
    hint: "Future column defaults vs existing data transcoding.",
    level: "expert"
  },
  {
    question: "How can you reset or modify the `AUTO_INCREMENT` counter value on a table?",
    shortAnswer: "`ALTER TABLE table_name AUTO_INCREMENT = new_value;`.",
    explanation: "You can only increase the auto-increment value to a number higher than the current maximum ID. In InnoDB, setting it lower than the existing max value is ignored.",
    hint: "ALTER TABLE tbl AUTO_INCREMENT = value.",
    level: "moderate",
    codeExample: "ALTER TABLE students AUTO_INCREMENT = 10001;"
  },
  {
    question: "How do you add a default value to an existing column without rebuilding the table?",
    shortAnswer: "`ALTER TABLE table_name ALTER COLUMN col_name SET DEFAULT 'val';`.",
    explanation: "`ALTER COLUMN ... SET DEFAULT` is an instantaneous metadata-only operation that does not rewrite or lock the table.",
    hint: "ALTER COLUMN SET DEFAULT syntax.",
    level: "moderate",
    codeExample: "ALTER TABLE students ALTER COLUMN is_active SET DEFAULT 1;"
  },
  {
    question: "How do you drop the default value of a column?",
    shortAnswer: "`ALTER TABLE table_name ALTER COLUMN col_name DROP DEFAULT;`.",
    explanation: "Removes the fallback default so that subsequent INSERTs that omit this column must either supply a value or insert NULL (if nullable).",
    hint: "ALTER COLUMN DROP DEFAULT syntax.",
    level: "moderate",
    codeExample: "ALTER TABLE students ALTER COLUMN is_active DROP DEFAULT;"
  },
  {
    question: "What happens if an `ALTER TABLE` statement fails midway due to a disk space exhaustion error in MySQL 8.0?",
    shortAnswer: "Thanks to Atomic DDL, the entire alter operation rolls back cleanly without leaving corrupted intermediate tables or broken metadata.",
    explanation: "MySQL 8.0 transactional data dictionary guarantees atomicity for DDL operations.",
    hint: "Atomic DDL rollback protection.",
    level: "expert"
  },
  {
    question: "What is the purpose of `LOCK = NONE` and `LOCK = SHARED` in Online DDL?",
    shortAnswer: "They explicitly define the maximum acceptable lock level during the alter operation (`NONE` = full concurrent read/write; `SHARED` = read-only concurrent access).",
    explanation: "Specifying `LOCK = NONE` ensures that if MySQL cannot perform the alter without locking out writers, it immediately fails rather than blocking production traffic.",
    hint: "Online DDL lock enforcement clauses.",
    level: "expert",
    codeExample: "ALTER TABLE customer_orders ADD index idx_status (order_status), ALGORITHM=INPLACE, LOCK=NONE;"
  },
  {
    question: "How do you modify a column to become `AUTO_INCREMENT` on an existing table?",
    shortAnswer: "The column must already be indexed or defined as Primary Key, then modified with `MODIFY col INT UNSIGNED AUTO_INCREMENT;`.",
    explanation: "Auto-increment requires an underlying key index. If the column is not already a key, define the key first or combine both in the alter.",
    hint: "Column must be indexed before enabling auto-increment.",
    level: "moderate",
    codeExample: "ALTER TABLE students MODIFY student_id INT UNSIGNED AUTO_INCREMENT;"
  },
  {
    question: "Can you change a table's storage engine from MyISAM to InnoDB using `ALTER TABLE`?",
    shortAnswer: "Yes, using `ALTER TABLE table_name ENGINE = InnoDB;`.",
    explanation: "MySQL rebuilds the table from scratch, creating a clustered B+ Tree tablespace file and converting all tables to ACID transactions.",
    hint: "ALTER TABLE tbl ENGINE = InnoDB.",
    level: "moderate",
    codeExample: "ALTER TABLE legacy_orders ENGINE = InnoDB;"
  },
  {
    question: "What happens to foreign keys pointing to a column if that column is renamed using `RENAME COLUMN` in MySQL 8.0?",
    shortAnswer: "MySQL automatically updates all foreign key definitions referencing that column to point to the new name.",
    explanation: "The data dictionary maintains relational references internally via object IDs and automatically updates referencing constraints upon column renaming.",
    hint: "Automatic foreign key reference updating in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "How do you disable or enable a CHECK constraint without dropping it in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE tbl ALTER CONSTRAINT chk_name NOT ENFORCED;` (and `ENFORCED` to re-enable).",
    explanation: "MySQL 8.0.19+ supports disabling check constraints temporarily during bulk ETL data migrations.",
    hint: "ENFORCED and NOT ENFORCED constraint states.",
    level: "expert",
    codeExample: "ALTER TABLE students ALTER CONSTRAINT chk_fee_positive NOT ENFORCED;"
  },
  {
    question: "What tool is widely used in enterprise production environments for schema changes on multi-terabyte tables?",
    shortAnswer: "`gh-ost` (GitHub Online Schema Transformations) or `pt-online-schema-change` (Percona Toolkit).",
    explanation: "These tools create a shadow table, stream binary log changes via triggers or binlog parsing, copy chunks in the background, and perform an atomic cutover with zero application downtime.",
    hint: "Asynchronous shadow table migration tools.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist before executing any `ALTER TABLE` in a production database?",
    shortAnswer: "1) Check table size & row count. 2) Test execution time on staging. 3) Choose `ALGORITHM=INSTANT` or `INPLACE`. 4) Verify dependent views and foreign keys. 5) Run during a low-traffic maintenance window with backups ready.",
    explanation: "Following these steps prevents unexpected locks, replication lag, and production service interruptions.",
    hint: "Size check, Staging test, Instant/Inplace selection, Dependency review, Backup.",
    level: "basic"
  }
];

export default questions;
