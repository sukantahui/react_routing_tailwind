// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is the prerequisite for successfully adding a constraint to an existing table using `ALTER TABLE`?",
    shortAnswer: "ALL existing rows in the table must already satisfy the proposed constraint rule without any violations.",
    explanation: "If even a single row violates the rule, MySQL aborts the `ALTER TABLE` command and rolls back the change.",
    hint: "Existing data must be 100% compliant.",
    level: "basic"
  },
  {
    question: "What syntax is used to add a named Foreign Key to an existing child table?",
    shortAnswer: "`ALTER TABLE child_table ADD CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES parent_table(id);`.",
    explanation: "Requires that all existing child values exist in the parent table or are NULL.",
    hint: "ALTER TABLE ADD CONSTRAINT fk_name FOREIGN KEY.",
    level: "basic",
    codeExample: "ALTER TABLE student_payments\nADD CONSTRAINT fk_payments_students FOREIGN KEY (student_id)\nREFERENCES students(student_id);"
  },
  {
    question: "What syntax is used to add a named UNIQUE constraint to an existing table?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT uq_name UNIQUE (column_name);`.",
    explanation: "Fails with Error 1062 if duplicate non-null entries currently exist in that column.",
    hint: "ALTER TABLE ADD CONSTRAINT uq_name UNIQUE.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD CONSTRAINT uq_students_email UNIQUE (email);"
  },
  {
    question: "What syntax is used to add a named CHECK constraint to an existing table in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT chk_name CHECK (expression);`.",
    explanation: "Evaluates the Boolean expression against all existing rows before committing the constraint.",
    hint: "ALTER TABLE ADD CONSTRAINT chk_name CHECK.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_fee_floor CHECK (admission_fee >= 10000.00);"
  },
  {
    question: "How do you modify an existing nullable column to become `NOT NULL` using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name MODIFY column_name data_type NOT NULL;`.",
    explanation: "Requires updating all existing NULL rows with default fallback values prior to running the alter.",
    hint: "ALTER TABLE MODIFY col type NOT NULL.",
    level: "basic",
    codeExample: "ALTER TABLE students MODIFY first_name VARCHAR(50) NOT NULL;"
  },
  {
    question: "What error occurs if you try to add a UNIQUE constraint to a column containing duplicate data?",
    shortAnswer: "Error 1062 (23000): 'Duplicate entry ... for key ...'.",
    explanation: "MySQL aborts index creation until duplicate rows are cleaned up or deleted.",
    hint: "Error 1062 duplicate key.",
    level: "basic"
  },
  {
    question: "What error occurs if you try to add a Foreign Key constraint when child rows reference non-existent parent IDs?",
    shortAnswer: "Error 1452 (23000): 'Cannot add or update a child row: a foreign key constraint fails'.",
    explanation: "Orphaned child records must be deleted or updated before the foreign key can be attached.",
    hint: "Error 1452 foreign key failure.",
    level: "basic"
  },
  {
    question: "What is an 'Atomic Multi-Constraint ALTER TABLE'?",
    shortAnswer: "Combining multiple `ADD CONSTRAINT` and `MODIFY` clauses into a single `ALTER TABLE` statement separated by commas.",
    explanation: "Applies all schema modifications in a single table rebuild/lock pass rather than multiple sequential locks.",
    hint: "Multiple constraint clauses in one ALTER TABLE.",
    level: "moderate",
    codeExample: "ALTER TABLE students\n    ADD CONSTRAINT uq_roll UNIQUE (roll_no),\n    ADD CONSTRAINT chk_fee CHECK (admission_fee >= 10000.00),\n    MODIFY city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore';"
  },
  {
    question: "How do you find which rows in an existing table violate a proposed `CHECK (admission_fee >= 10000)` rule before adding the constraint?",
    shortAnswer: "Run an audit query: `SELECT * FROM students WHERE NOT (admission_fee >= 10000.00);`.",
    explanation: "Pre-flight audit queries identify dirty data before running migrations.",
    hint: "SELECT ... WHERE NOT (rule).",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE admission_fee < 10000.00 OR admission_fee IS NULL;"
  },
  {
    question: "How do you find duplicate rows in a column before adding a `UNIQUE` constraint?",
    shortAnswer: "`SELECT email, COUNT(*) FROM students GROUP BY email HAVING COUNT(*) > 1;`.",
    explanation: "Identifies all duplicate values that would block the UNIQUE index creation.",
    hint: "GROUP BY HAVING COUNT(*) > 1.",
    level: "moderate",
    codeExample: "SELECT email, COUNT(*) FROM students GROUP BY email HAVING COUNT(*) > 1;"
  },
  {
    question: "How do you identify orphaned child records before adding a `FOREIGN KEY` constraint?",
    shortAnswer: "Using an anti-join: `SELECT c.* FROM child c LEFT JOIN parent p ON c.parent_id = p.id WHERE p.id IS NULL;`.",
    explanation: "Finds all child rows whose parent IDs no longer exist in the master table.",
    hint: "LEFT JOIN WHERE parent.id IS NULL.",
    level: "moderate",
    codeExample: "SELECT p.*\nFROM student_payments p\nLEFT JOIN students s ON p.student_id = s.student_id\nWHERE s.student_id IS NULL;"
  },
  {
    question: "What is `ALGORITHM=INPLACE` in MySQL 8.0 `ALTER TABLE` operations?",
    shortAnswer: "An execution algorithm that modifies table structures in-place without creating a full table copy, allowing concurrent reads and writes.",
    explanation: "Drastically reduces maintenance window downtime on large production tables.",
    hint: "In-place table modification without full table copy.",
    level: "expert",
    codeExample: "ALTER TABLE students ADD CONSTRAINT uq_email UNIQUE (email), ALGORITHM=INPLACE, LOCK=NONE;"
  },
  {
    question: "What is `LOCK=NONE` in MySQL 8.0 `ALTER TABLE`?",
    shortAnswer: "A clause that ensures the `ALTER TABLE` executes only if it does not require exclusive read or write table locks.",
    explanation: "Guarantees zero downtime for concurrent application queries.",
    hint: "Ensures no read/write locking during DDL.",
    level: "expert"
  },
  {
    question: "Can an `ALTER TABLE` statement add a `PRIMARY KEY` to a table that already has an existing Primary Key?",
    shortAnswer: "No, a table can have only one Primary Key. You must drop the existing Primary Key first: `ALTER TABLE tbl DROP PRIMARY KEY, ADD PRIMARY KEY (new_col);`.",
    explanation: "Single atomic swap of Primary Keys.",
    hint: "Must drop existing PK before adding new PK.",
    level: "moderate",
    codeExample: "ALTER TABLE students DROP PRIMARY KEY, ADD CONSTRAINT pk_students PRIMARY KEY (uuid);"
  },
  {
    question: "How do you modify an existing CHECK constraint's expression in MySQL 8.0?",
    shortAnswer: "MySQL does not support direct modification of CHECK expressions; you must drop the old constraint and add the new one in an `ALTER TABLE` statement.",
    explanation: "`ALTER TABLE tbl DROP CHECK chk_old, ADD CONSTRAINT chk_new CHECK (...);`.",
    hint: "Drop and re-add in a single ALTER TABLE.",
    level: "expert",
    codeExample: "ALTER TABLE students\n    DROP CHECK chk_min_fee,\n    ADD CONSTRAINT chk_min_fee CHECK (admission_fee >= 12000.00);"
  },
  {
    question: "How do you add a `CHECK` constraint in an un-enforced state for later activation?",
    shortAnswer: "`ALTER TABLE table_name ADD CONSTRAINT chk_name CHECK (expression) NOT ENFORCED;`.",
    explanation: "Allows batch data loading without immediate validation overhead.",
    hint: "NOT ENFORCED attribute.",
    level: "expert",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_fee CHECK (admission_fee >= 10000) NOT ENFORCED;"
  },
  {
    question: "What happens when you enable an un-enforced CHECK constraint using `ALTER TABLE tbl ALTER CHECK chk_name ENFORCED;`?",
    shortAnswer: "MySQL immediately scans all existing rows in the table; if any row violates the expression, the command fails and the constraint remains un-enforced.",
    explanation: "Validates historical compliance before activating runtime checking.",
    hint: "Full table validation scan upon activation.",
    level: "expert"
  },
  {
    question: "How do you modify a Foreign Key's referential action (e.g. changing RESTRICT to CASCADE)?",
    shortAnswer: "Drop the existing foreign key constraint and add the new foreign key with the updated referential action.",
    explanation: "`ALTER TABLE child DROP FOREIGN KEY fk_name, ADD CONSTRAINT fk_name FOREIGN KEY ... ON DELETE CASCADE;`.",
    hint: "Drop and re-add with new referential action.",
    level: "moderate",
    codeExample: "ALTER TABLE student_payments\n    DROP FOREIGN KEY fk_payments_student,\n    ADD CONSTRAINT fk_payments_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE;"
  },
  {
    question: "Can an `ALTER TABLE` statement add a column and define a constraint on that new column in the same query?",
    shortAnswer: "Yes, you can add the column with inline constraints or table-level constraint clauses in the same statement.",
    explanation: "Atomic column expansion and constraint enforcement.",
    hint: "ADD COLUMN with inline or table-level constraint.",
    level: "basic",
    codeExample: "ALTER TABLE students\n    ADD COLUMN roll_no VARCHAR(20) NOT NULL,\n    ADD CONSTRAINT uq_roll UNIQUE (roll_no);"
  },
  {
    question: "How does `ALTER TABLE` handle `DEFAULT` values when adding a new `NOT NULL` column to a table with existing rows?",
    shortAnswer: "MySQL automatically populates the defined `DEFAULT` value into all existing table rows.",
    explanation: "If no DEFAULT is specified for a NOT NULL column in strict mode, table creation fails.",
    hint: "Populates all existing rows with DEFAULT value.",
    level: "basic"
  },
  {
    question: "What is the recommended 3-step migration pattern for applying a NOT NULL constraint to a legacy column?",
    shortAnswer: "1) Audit: `SELECT COUNT(*) FROM tbl WHERE col IS NULL;` 2) Backfill: `UPDATE tbl SET col = 'fallback' WHERE col IS NULL;` 3) Enforce: `ALTER TABLE tbl MODIFY col type NOT NULL;`.",
    explanation: "Guarantees zero migration downtime and 100% success rate.",
    hint: "Audit → Backfill → Enforce pattern.",
    level: "moderate"
  },
  {
    question: "Why should developers avoid running large `ALTER TABLE` modifications during peak traffic hours?",
    shortAnswer: "Metadata locks (MDL) acquired during ALTER TABLE can queue up behind slow queries, blocking all subsequent reads and writes on the table.",
    explanation: "Can cause cascading connection pool exhaustion in application servers.",
    hint: "Metadata lock queuing and connection pool exhaustion.",
    level: "expert"
  },
  {
    question: "What tool can be used to execute zero-downtime ALTER TABLE operations on multi-terabyte MySQL tables?",
    shortAnswer: "`gh-ost` (GitHub Online Schema Transformations) or `pt-online-schema-change` (Percona Toolkit).",
    explanation: "Creates a shadow table, streams binlog events, and swaps tables atomically with zero locking.",
    hint: "gh-ost or pt-online-schema-change.",
    level: "expert"
  },
  {
    question: "How do you rename an existing Unique index constraint using `ALTER TABLE` in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name RENAME INDEX old_index_name TO new_index_name;`.",
    explanation: "A fast, metadata-only operation in MySQL 8.0.",
    hint: "ALTER TABLE RENAME INDEX.",
    level: "basic",
    codeExample: "ALTER TABLE students RENAME INDEX uq_old_email TO uq_students_email;"
  },
  {
    question: "What happens if an `ALTER TABLE` command adding a constraint is killed or fails midway?",
    shortAnswer: "In MySQL 8.0 InnoDB (which supports Atomic DDL), the entire operation rolls back cleanly, leaving the table in its original unaltered state.",
    explanation: "Atomic DDL prevents half-completed schema modifications.",
    hint: "Atomic DDL rollback in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "How do you check if an `ALTER TABLE` operation can be executed with `ALGORITHM=INSTANT` in MySQL 8.0?",
    shortAnswer: "By appending `ALGORITHM=INSTANT` to the query; if MySQL cannot execute it instantly, it immediately returns an error rather than falling back to slow table copies.",
    explanation: "Guarantees instant sub-millisecond execution.",
    hint: "Explicit ALGORITHM=INSTANT clause.",
    level: "expert",
    codeExample: "ALTER TABLE students ALTER COLUMN city SET DEFAULT 'Barrackpore', ALGORITHM=INSTANT;"
  },
  {
    question: "Can an `ALTER TABLE` statement convert a single-column Primary Key into a Composite Primary Key?",
    shortAnswer: "Yes: `ALTER TABLE tbl DROP PRIMARY KEY, ADD CONSTRAINT pk_name PRIMARY KEY (col1, col2);`.",
    explanation: "Redefines the clustered index layout across multiple attributes.",
    hint: "DROP PRIMARY KEY, ADD PRIMARY KEY (col1, col2).",
    level: "moderate"
  },
  {
    question: "What happens if a column being altered to `NOT NULL` is currently part of an `ON DELETE SET NULL` foreign key?",
    shortAnswer: "MySQL rejects the alter because a `NOT NULL` column cannot accept NULL values during referential cascading.",
    explanation: "Contradictory schema definitions are prevented.",
    hint: "Blocks contradictory referential action.",
    level: "expert"
  },
  {
    question: "How do you verify that a newly added constraint is actively enforcing rules on the table?",
    shortAnswer: "Attempt a test `INSERT` with an intentionally invalid value within a rollback transaction: verify that MySQL raises the expected error code.",
    explanation: "Confirms active runtime enforcement.",
    hint: "Test violation inside a rollback transaction.",
    level: "basic",
    codeExample: "START TRANSACTION;\nINSERT INTO students (admission_fee) VALUES (5000.00); -- Must throw Error 3819\nROLLBACK;"
  },
  {
    question: "What is the recommended checklist for adding and modifying constraints on production tables?",
    shortAnswer: "1) Run pre-flight audit queries to detect violating rows. 2) Backfill and clean legacy data before altering. 3) Always provide explicit constraint names (`CONSTRAINT symbol_name`). 4) Combine multiple alterations into a single atomic statement. 5) Use `ALGORITHM=INPLACE` or online schema change tools for large tables.",
    explanation: "Following these 5 rules ensures 100% migration success with zero production downtime.",
    hint: "Pre-flight audit, Clean data, Explicit names, Atomic statement, Online schema tools.",
    level: "basic"
  }
];

export default questions;
