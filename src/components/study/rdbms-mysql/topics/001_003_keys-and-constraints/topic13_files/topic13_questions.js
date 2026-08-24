// topic13_files/topic13_questions.js

const questions = [
  {
    question: "How do you drop a Foreign Key constraint in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP FOREIGN KEY constraint_name;`.",
    explanation: "Detaches the referential rule from the child table.",
    hint: "ALTER TABLE DROP FOREIGN KEY constraint_name.",
    level: "basic",
    codeExample: "ALTER TABLE student_payments DROP FOREIGN KEY fk_payments_students;"
  },
  {
    question: "How do you drop a UNIQUE constraint in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP INDEX constraint_name;` (or `DROP KEY constraint_name;`).",
    explanation: "Because UNIQUE constraints are implemented as secondary indexes in MySQL.",
    hint: "ALTER TABLE DROP INDEX constraint_name.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP INDEX uq_students_email;"
  },
  {
    question: "How do you drop a CHECK constraint in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name DROP CHECK constraint_name;` (or `DROP CONSTRAINT constraint_name;`).",
    explanation: "Removes the business validation expression from the table dictionary.",
    hint: "ALTER TABLE DROP CHECK constraint_name.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP CHECK chk_students_fee_floor;"
  },
  {
    question: "How do you drop the Primary Key of a table in MySQL?",
    shortAnswer: "`ALTER TABLE table_name DROP PRIMARY KEY;`.",
    explanation: "Removes the clustered primary key constraint.",
    hint: "ALTER TABLE DROP PRIMARY KEY.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP PRIMARY KEY;"
  },
  {
    question: "What error occurs if you attempt to drop a Primary Key that is an `AUTO_INCREMENT` column?",
    shortAnswer: "Error 1075 (42000): 'Incorrect table definition; there can be only one auto column and it must be defined as a key'.",
    explanation: "You must first remove the `AUTO_INCREMENT` attribute from the column using `MODIFY` before dropping the primary key.",
    hint: "Error 1075 AUTO_INCREMENT key requirement.",
    level: "moderate"
  },
  {
    question: "What is the 2-step procedure for dropping an `AUTO_INCREMENT` Primary Key?",
    shortAnswer: "1) `ALTER TABLE tbl MODIFY col INT NOT NULL;` (removes AUTO_INCREMENT), 2) `ALTER TABLE tbl DROP PRIMARY KEY;`.",
    explanation: "Disables sequence generation before removing the key index.",
    hint: "MODIFY to remove AUTO_INCREMENT, then DROP PRIMARY KEY.",
    level: "moderate",
    codeExample: "ALTER TABLE students MODIFY student_id INT NOT NULL;\nALTER TABLE students DROP PRIMARY KEY;"
  },
  {
    question: "What error occurs if you try to drop a parent table (`DROP TABLE parent;`) while a child table holds an active Foreign Key referencing it?",
    shortAnswer: "Error 3730 (HY000): 'Cannot drop table ... referenced by a foreign key constraint ...'.",
    explanation: "MySQL prevents creating orphaned child tables with dangling references.",
    hint: "Error 3730 table drop prohibition.",
    level: "basic"
  },
  {
    question: "What is the correct drop sequence for related tables in a relational database?",
    shortAnswer: "Drop child tables FIRST (or drop child foreign keys first), then drop the parent table.",
    explanation: "Respects the topological dependency order of the schema.",
    hint: "Drop children before parents.",
    level: "basic"
  },
  {
    question: "Does dropping a Foreign Key constraint automatically drop its supporting secondary index in MySQL?",
    shortAnswer: "No, dropping the foreign key removes the referential enforcement, but the underlying index remains in place.",
    explanation: "If the index is no longer needed, you must drop it explicitly with `DROP INDEX`.",
    hint: "Index remains in place after FK drop.",
    level: "moderate",
    codeExample: "ALTER TABLE student_payments DROP FOREIGN KEY fk_payments_students;\nALTER TABLE student_payments DROP INDEX fk_payments_students;"
  },
  {
    question: "How can you temporarily bypass foreign key checks to drop tables in arbitrary order during testing?",
    shortAnswer: "`SET FOREIGN_KEY_CHECKS = 0;` (execute drops) `SET FOREIGN_KEY_CHECKS = 1;`.",
    explanation: "Disables referential integrity validation for the current session.",
    hint: "SET FOREIGN_KEY_CHECKS = 0.",
    level: "moderate",
    codeExample: "SET FOREIGN_KEY_CHECKS = 0;\nDROP TABLE students;\nDROP TABLE student_payments;\nSET FOREIGN_KEY_CHECKS = 1;"
  },
  {
    question: "What is the risk of leaving `FOREIGN_KEY_CHECKS = 0` enabled in a production database session?",
    shortAnswer: "Subsequent `INSERT` or `UPDATE` statements will allow invalid foreign keys and orphaned records, causing silent data corruption.",
    explanation: "Always reset to 1 immediately.",
    hint: "Data corruption and orphaned record ingestion.",
    level: "moderate"
  },
  {
    question: "How do you relax a `NOT NULL` column to allow `NULL` values?",
    shortAnswer: "`ALTER TABLE table_name MODIFY column_name data_type NULL;`.",
    explanation: "Changes the column nullability attribute.",
    hint: "ALTER TABLE MODIFY col type NULL.",
    level: "basic",
    codeExample: "ALTER TABLE students MODIFY phone_no VARCHAR(15) NULL;"
  },
  {
    question: "How do you drop a `DEFAULT` constraint from a column in MySQL?",
    shortAnswer: "`ALTER TABLE table_name ALTER COLUMN column_name DROP DEFAULT;`.",
    explanation: "Removes automatic fallback value generation.",
    hint: "ALTER TABLE ALTER COLUMN DROP DEFAULT.",
    level: "basic",
    codeExample: "ALTER TABLE students ALTER COLUMN city DROP DEFAULT;"
  },
  {
    question: "Can an `ALTER TABLE` statement drop multiple constraints in a single command?",
    shortAnswer: "Yes, you can separate multiple `DROP` clauses with commas in a single `ALTER TABLE` statement.",
    explanation: "Performs atomic multi-constraint removal in one operation.",
    hint: "Multiple DROP clauses in one ALTER TABLE.",
    level: "moderate",
    codeExample: "ALTER TABLE students\n    DROP FOREIGN KEY fk_students_dept,\n    DROP CHECK chk_fee_floor,\n    DROP INDEX uq_students_email;"
  },
  {
    question: "How do you identify all child tables that reference a parent table before dropping constraints?",
    shortAnswer: "Query `information_schema.KEY_COLUMN_USAGE` where `REFERENCED_TABLE_NAME = 'parent_table_name'`.",
    explanation: "Lists all dependent child foreign keys and tables across the database.",
    hint: "information_schema.KEY_COLUMN_USAGE REFERENCED_TABLE_NAME.",
    level: "moderate",
    codeExample: "SELECT TABLE_NAME, CONSTRAINT_NAME\nFROM information_schema.KEY_COLUMN_USAGE\nWHERE REFERENCED_TABLE_NAME = 'students';"
  },
  {
    question: "What happens when you drop a Primary Key on an InnoDB table without defining a new one?",
    shortAnswer: "InnoDB selects the first non-null `UNIQUE` index as the new clustered index; if none exists, InnoDB generates a hidden 6-byte row ID (`GEN_CLUST_INDEX`).",
    explanation: "Every InnoDB table must have a clustered physical layout.",
    hint: "Hidden GEN_CLUST_INDEX fallback in InnoDB.",
    level: "expert"
  },
  {
    question: "Can you drop a column that is currently referenced by an active Foreign Key?",
    shortAnswer: "No, MySQL rejects the `DROP COLUMN` with Error 1828 / Error 1829 until the foreign key constraint is dropped first.",
    explanation: "Prevents breaking active referential relationships.",
    hint: "Referenced columns cannot be dropped directly.",
    level: "moderate"
  },
  {
    question: "Why is dropping a constraint with `ALGORITHM=INSTANT` faster in MySQL 8.0?",
    shortAnswer: "Because it only modifies metadata in the data dictionary without rebuilding or copying table data pages.",
    explanation: "Completes in sub-milliseconds regardless of table row count.",
    hint: "Metadata-only update with zero page copying.",
    level: "expert"
  },
  {
    question: "Can a `CHECK` constraint be dropped using `DROP CONSTRAINT` as well as `DROP CHECK`?",
    shortAnswer: "Yes, MySQL 8.0.19+ supports the ANSI standard `DROP CONSTRAINT constraint_name` syntax for both CHECK and UNIQUE constraints.",
    explanation: "ANSI standard compatibility enhancement in MySQL 8.0.",
    hint: "ANSI DROP CONSTRAINT support.",
    level: "basic",
    codeExample: "ALTER TABLE students DROP CONSTRAINT chk_students_fee_floor;"
  },
  {
    question: "What happens if you attempt to drop a constraint that does not exist in the table?",
    shortAnswer: "MySQL aborts with Error 1091 (42000): 'Can't DROP ...; check that column/key exists'.",
    explanation: "Requires verified constraint name existence.",
    hint: "Error 1091 key does not exist.",
    level: "basic"
  },
  {
    question: "How do you drop an anonymous Foreign Key whose name was generated automatically by MySQL?",
    shortAnswer: "Find the auto-generated symbol name from `SHOW CREATE TABLE tbl` or `information_schema`, then run `ALTER TABLE tbl DROP FOREIGN KEY auto_symbol_name;`.",
    explanation: "Auto-generated symbols (e.g. `students_ibfk_1`) must be inspected first.",
    hint: "Inspect SHOW CREATE TABLE to find auto-generated symbol.",
    level: "basic"
  },
  {
    question: "Why should `DROP TABLE IF EXISTS` be used carefully in scripts with foreign key dependencies?",
    shortAnswer: "If child tables exist with active FKs, `DROP TABLE IF EXISTS parent` still fails with Error 3730 despite the `IF EXISTS` clause.",
    explanation: "`IF EXISTS` only suppresses errors if the table does not exist, not foreign key dependency errors.",
    hint: "IF EXISTS does not bypass FK constraints.",
    level: "moderate"
  },
  {
    question: "How do you replace an old CHECK constraint with a relaxed version in a single atomic transaction?",
    shortAnswer: "`ALTER TABLE tbl DROP CHECK chk_name, ADD CONSTRAINT chk_name CHECK (new_expression);`.",
    explanation: "Atomic drop-and-recreate prevents intermediate unconstrained windows.",
    hint: "Atomic DROP and ADD in one ALTER TABLE.",
    level: "moderate",
    codeExample: "ALTER TABLE students\n    DROP CHECK chk_fee_floor,\n    ADD CONSTRAINT chk_fee_floor CHECK (admission_fee >= 8000.00);"
  },
  {
    question: "What is the impact of dropping a Foreign Key on query performance in MySQL?",
    shortAnswer: "It speeds up `INSERT`, `UPDATE`, and `DELETE` operations by removing referential lookup checks, but has zero direct effect on `SELECT` queries.",
    explanation: "Removes write-time parent key validation overhead.",
    hint: "Faster write operations with zero SELECT impact.",
    level: "moderate"
  },
  {
    question: "How does dropping a Unique index affect `SELECT` queries filtering by that column?",
    shortAnswer: "`SELECT` queries filtering by that column can no longer use index seeks and must perform slow full table scans.",
    explanation: "Removing the Unique constraint removes its underlying B-Tree index.",
    hint: "Forces full table scan for search queries.",
    level: "moderate"
  },
  {
    question: "Can you drop a constraint inside a database transaction and roll it back in MySQL 8.0?",
    shortAnswer: "In MySQL 8.0, DDL statements (`ALTER TABLE`) cause an implicit commit and CANNOT be rolled back manually with `ROLLBACK`.",
    explanation: "Transactional DML rollbacks do not apply to DDL schema alterations.",
    hint: "Implicit commit on DDL statements.",
    level: "expert"
  },
  {
    question: "What happens if you disable a CHECK constraint with `NOT ENFORCED` instead of dropping it?",
    shortAnswer: "The constraint definition is preserved in the schema metadata, but MySQL skips runtime validation during writes, allowing fast re-enabling later.",
    explanation: "Better alternative than dropping for temporary ETL operations.",
    hint: "Preserves definition while disabling runtime checks.",
    level: "expert"
  },
  {
    question: "How do database migration tools handle constraint drops during rollback migrations?",
    shortAnswer: "They maintain an explicit `down()` migration script that re-creates the dropped constraint with its original definition and symbol name.",
    explanation: "Guarantees bidirectional schema reproducibility.",
    hint: "Down migration re-creates constraint.",
    level: "basic"
  },
  {
    question: "How do you verify that a constraint was successfully dropped from a table?",
    shortAnswer: "Run `SHOW CREATE TABLE table_name;` or query `information_schema.TABLE_CONSTRAINTS` to confirm the constraint symbol is no longer listed.",
    explanation: "Metadata verification step.",
    hint: "Verify absence in SHOW CREATE TABLE.",
    level: "basic",
    codeExample: "SELECT * FROM information_schema.TABLE_CONSTRAINTS\nWHERE TABLE_NAME = 'students' AND CONSTRAINT_NAME = 'chk_students_fee_floor';"
  },
  {
    question: "What is the recommended checklist for safely dropping constraints and foreign key dependencies?",
    shortAnswer: "1) Map out the foreign key dependency graph using `information_schema`. 2) Remove `AUTO_INCREMENT` before dropping Primary Keys. 3) Drop child FKs before dropping parent master tables. 4) Drop redundant secondary indexes after FK drops. 5) Use atomic drop-and-add statements when refactoring rules.",
    explanation: "Following these 5 rules guarantees zero dependency crashes and clean schema refactoring.",
    hint: "Map dependencies, Remove AUTO_INCREMENT, Drop child FKs first, Clean indexes, Atomic refactoring.",
    level: "basic"
  }
];

export default questions;
