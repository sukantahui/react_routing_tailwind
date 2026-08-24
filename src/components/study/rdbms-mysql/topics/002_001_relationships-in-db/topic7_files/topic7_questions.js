// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What does the `ON DELETE RESTRICT` referential action do in MySQL?",
    shortAnswer: "It prevents deleting a parent record by immediately aborting the operation with Error 1451 if any child record currently references that parent key.",
    explanation: "The default referential action in MySQL to prevent accidental data destruction.",
    hint: "Rejects parent deletion if child records exist.",
    level: "basic",
    codeExample: "CONSTRAINT fk_customer FOREIGN KEY (customer_id)\nREFERENCES customers(customer_id) ON DELETE RESTRICT"
  },
  {
    question: "What does the `ON DELETE SET NULL` referential action do in MySQL?",
    shortAnswer: "When a parent record is deleted, MySQL automatically sets the Foreign Key column in all matching child rows to `NULL`.",
    explanation: "Preserves the child rows while detaching them from the deleted parent.",
    hint: "Sets child foreign keys to NULL.",
    level: "basic",
    codeExample: "mentor_id INT NULL,\nCONSTRAINT fk_mentor FOREIGN KEY (mentor_id)\nREFERENCES instructors(instructor_id) ON DELETE SET NULL"
  },
  {
    question: "What is the mandatory prerequisite for defining `ON DELETE SET NULL` on a foreign key column?",
    shortAnswer: "The Foreign Key column in the child table MUST be defined as nullable (`INT NULL`), not `NOT NULL`.",
    explanation: "If the column is NOT NULL, setting it to NULL violates domain constraints, causing table creation or runtime errors.",
    hint: "Foreign key column must be nullable.",
    level: "basic"
  },
  {
    question: "What is the difference between `RESTRICT` and `NO ACTION` in MySQL InnoDB?",
    shortAnswer: "In MySQL InnoDB, `NO ACTION` is treated as EXACTLY IDENTICAL to `RESTRICT` (immediate rejection of parent delete/update if child rows exist).",
    explanation: "Standard SQL allows deferred checking with NO ACTION, but InnoDB executes both immediately.",
    hint: "Identical immediate enforcement in MySQL InnoDB.",
    level: "moderate"
  },
  {
    question: "What is the default referential action in MySQL if you omit both `ON DELETE` and `ON UPDATE` clauses?",
    shortAnswer: "`RESTRICT` (or `NO ACTION`).",
    explanation: "MySQL defaults to strict referential protection.",
    hint: "Defaults to RESTRICT.",
    level: "basic"
  },
  {
    question: "What error code is raised when a parent row deletion is blocked by `ON DELETE RESTRICT`?",
    shortAnswer: "Error 1451 (23000): 'Cannot delete or update a parent row: a foreign key constraint fails'.",
    explanation: "InnoDB prevents breaking referential integrity.",
    hint: "Error 1451.",
    level: "basic"
  },
  {
    question: "When is `ON DELETE SET NULL` appropriate to use in real-world software architecture?",
    shortAnswer: "When child entities have independent value and can exist without an assigned parent (e.g. an employee when their manager resigns, or a student when their mentor leaves).",
    explanation: "Preserves child entities while acknowledging unassigned state.",
    hint: "Independent child entities with optional parent assignment.",
    level: "basic"
  },
  {
    question: "Why should `RESTRICT` be used on e-commerce invoice and financial ledger tables?",
    shortAnswer: "To prevent legal compliance violations: deleting a customer profile must never silently erase historical tax invoices or ledger receipts.",
    explanation: "Financial systems require permanent audit trails.",
    hint: "Preserves historical accounting and audit compliance.",
    level: "basic"
  },
  {
    question: "Does MySQL InnoDB support the ANSI standard `SET DEFAULT` referential action?",
    shortAnswer: "No, MySQL's SQL parser recognizes `SET DEFAULT` syntactically, but the InnoDB storage engine rejects table creation with an error.",
    explanation: "InnoDB does not implement SET DEFAULT referential actions.",
    hint: "Not supported by InnoDB engine.",
    level: "expert"
  },
  {
    question: "How do you delete a parent record that is protected by `ON DELETE RESTRICT`?",
    shortAnswer: "You must first explicitly delete or reassign all child records referencing that parent key before running the parent `DELETE` statement.",
    explanation: "Explicit 2-step cleanup required.",
    hint: "Delete or reassign child records first.",
    level: "basic"
  },
  {
    question: "How does `ON UPDATE RESTRICT` behave when an application tries to update a parent's Primary Key?",
    shortAnswer: "It rejects the update with Error 1451 if any child rows currently reference the original Primary Key value.",
    explanation: "Blocks primary key renumbering if active links exist.",
    hint: "Blocks primary key updates if child rows exist.",
    level: "basic"
  },
  {
    question: "Why is combining `ON DELETE RESTRICT` with `ON UPDATE CASCADE` a popular enterprise pattern?",
    shortAnswer: "It blocks accidental parent deletion (`RESTRICT`) while allowing seamless synchronization if primary keys are ever renumbered or renamed (`CASCADE`).",
    explanation: "Maximum safety with operational flexibility.",
    hint: "Blocks deletes while synchronizing key updates.",
    level: "moderate",
    codeExample: "CONSTRAINT fk_orders FOREIGN KEY (customer_id)\nREFERENCES customers(customer_id)\nON DELETE RESTRICT ON UPDATE CASCADE"
  },
  {
    question: "How do you query all child records that have been unassigned (`SET NULL`) from their parents?",
    shortAnswer: "`SELECT * FROM child_table WHERE parent_id IS NULL;`.",
    explanation: "Filters to rows with null foreign keys.",
    hint: "WHERE foreign_key_col IS NULL.",
    level: "basic",
    codeExample: "SELECT student_name FROM students WHERE mentor_id IS NULL;"
  },
  {
    question: "What happens if a child table has `ON DELETE SET NULL`, and you delete a parent within a transaction that is rolled back?",
    shortAnswer: "The parent row is restored and all child foreign keys are restored from `NULL` back to their original parent ID.",
    explanation: "All referential mutations are fully transactional in InnoDB.",
    hint: "Restored upon rollback.",
    level: "basic"
  },
  {
    question: "Can an `ON DELETE SET NULL` rule cause a `UNIQUE` constraint violation on the child table?",
    shortAnswer: "In standard SQL and MySQL B-Tree indexes, multiple `NULL` values are permitted in a `UNIQUE` column (each NULL is considered distinct), so no violation occurs.",
    explanation: "NULL != NULL in SQL three-valued logic for UNIQUE constraints.",
    hint: "Multiple NULLs are permitted in UNIQUE indexes.",
    level: "expert"
  },
  {
    question: "How do you convert an existing `ON DELETE CASCADE` constraint into `ON DELETE SET NULL`?",
    shortAnswer: "1) Ensure child column is nullable (`MODIFY col INT NULL;`), 2) Drop existing FK (`DROP FOREIGN KEY fk_name;`), 3) Add new FK (`ADD CONSTRAINT fk_name ... ON DELETE SET NULL;`).",
    explanation: "3-step DDL migration process.",
    hint: "Modify column to nullable, drop old FK, add new FK with SET NULL.",
    level: "moderate"
  },
  {
    question: "How do you reassign all students of a departing mentor to a new mentor in SQL before deleting the old mentor?",
    shortAnswer: "`UPDATE students SET mentor_id = 2 WHERE mentor_id = 1;` (reassigns children before deleting mentor #1).",
    explanation: "Explicit re-parenting pattern under RESTRICT rules.",
    hint: "UPDATE child SET parent_id = new_id WHERE parent_id = old_id.",
    level: "basic",
    codeExample: "UPDATE students SET mentor_id = 2 WHERE mentor_id = 1;\nDELETE FROM instructors WHERE instructor_id = 1;"
  },
  {
    question: "What is the performance overhead of `ON DELETE RESTRICT` compared to `ON DELETE CASCADE`?",
    shortAnswer: "`RESTRICT` is significantly faster because it only needs to perform a single index probe to check if *at least one* child row exists; `CASCADE` must scan, lock, and delete all matching child rows.",
    explanation: "Early exit on first index match.",
    hint: "Faster single index probe vs locking and deleting all children.",
    level: "expert"
  },
  {
    question: "Can `ON DELETE SET NULL` be used in a Many-to-Many Junction Table?",
    shortAnswer: "No, because columns in a junction table's Composite Primary Key MUST be `NOT NULL`; setting one to NULL would violate Entity Integrity.",
    explanation: "Junction tables use CASCADE to remove association links.",
    hint: "Violates Composite Primary Key NOT NULL requirement.",
    level: "moderate"
  },
  {
    question: "How does `ON UPDATE SET NULL` behave when a parent's primary key is updated?",
    shortAnswer: "All child rows referencing the original parent key have their foreign key columns updated to `NULL`.",
    explanation: "Rarely used in practice (ON UPDATE CASCADE is preferred).",
    hint: "Sets child foreign keys to NULL on parent key update.",
    level: "moderate"
  },
  {
    question: "What is the effect of `SET FOREIGN_KEY_CHECKS = 0;` on `RESTRICT` constraints?",
    shortAnswer: "It temporarily disables referential checks, allowing parent rows to be deleted even if child rows exist (creating orphaned child records).",
    explanation: "Bypasses engine validation for administrative ETL.",
    hint: "Bypasses RESTRICT validation temporarily.",
    level: "moderate"
  },
  {
    question: "How do you inspect which tables have `RESTRICT` vs `SET NULL` vs `CASCADE` across your database?",
    shortAnswer: "Query `information_schema.REFERENTIAL_CONSTRAINTS` inspecting `DELETE_RULE` and `UPDATE_RULE`.",
    explanation: "Lists all referential actions in the schema.",
    hint: "information_schema.REFERENTIAL_CONSTRAINTS query.",
    level: "moderate",
    codeExample: "SELECT TABLE_NAME, CONSTRAINT_NAME, DELETE_RULE\nFROM information_schema.REFERENTIAL_CONSTRAINTS\nWHERE CONSTRAINT_SCHEMA = 'college_db';"
  },
  {
    question: "What happens if you attempt to add an `ON DELETE SET NULL` constraint on a column that contains `student_id INT NOT NULL`?",
    shortAnswer: "MySQL immediately rejects the `CREATE TABLE` or `ALTER TABLE` statement with an error.",
    explanation: "Incompatible schema definition.",
    hint: "Table creation rejected due to NOT NULL conflict.",
    level: "basic"
  },
  {
    question: "Why should `RESTRICT` be used on Master Product catalogs in e-commerce schemas?",
    shortAnswer: "To prevent deleting a product that has historical sales in order records, which would corrupt accounting reports.",
    explanation: "Products are disabled with a status flag (`is_active = 0`) instead of deleted.",
    hint: "Protects historical sales records from corruption.",
    level: "basic"
  },
  {
    question: "How do you find which child table is blocking a parent deletion when Error 1451 occurs?",
    shortAnswer: "Read the MySQL error message string: it explicitly specifies the database name, child table name, and constraint symbol that failed.",
    explanation: "Error 1451 includes child table and constraint details.",
    hint: "Error message text contains child table name.",
    level: "basic"
  },
  {
    question: "What is a 'Soft Delete' pattern as an alternative to hard DELETE with RESTRICT?",
    shortAnswer: "Adding a `deleted_at DATETIME NULL` or `is_deleted TINYINT(1) DEFAULT 0` column to the parent table, updating the flag instead of physically deleting rows.",
    explanation: "Retains physical rows while filtering in queries (`WHERE deleted_at IS NULL`).",
    hint: "deleted_at column flag instead of DELETE.",
    level: "moderate",
    codeExample: "UPDATE customers SET is_deleted = 1 WHERE customer_id = 101;"
  },
  {
    question: "Can an `ON DELETE SET NULL` action trigger a foreign key cascade downstream on another table?",
    shortAnswer: "No, setting a foreign key to NULL does not trigger deletions on other tables.",
    explanation: "Halts further cascading chains.",
    hint: "Setting to NULL does not trigger downstream deletions.",
    level: "expert"
  },
  {
    question: "How does `ON UPDATE RESTRICT` interact with auto-increment surrogate keys in daily operations?",
    shortAnswer: "Since surrogate keys (`id AUTO_INCREMENT`) are never updated in normal application queries, `ON UPDATE RESTRICT` has zero negative operational impact.",
    explanation: "Surrogate keys remain immutable throughout their lifecycle.",
    hint: "Zero impact because surrogate keys are immutable.",
    level: "moderate"
  },
  {
    question: "What is the difference between `ON DELETE NO ACTION` in PostgreSQL vs MySQL?",
    shortAnswer: "In PostgreSQL, `NO ACTION` supports `DEFERRABLE INITIALLY DEFERRED` checks at transaction commit; in MySQL InnoDB, `NO ACTION` is always checked immediately like `RESTRICT`.",
    explanation: "MySQL does not support deferred constraint checking.",
    hint: "PostgreSQL supports deferred checks; MySQL checks immediately.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for choosing between RESTRICT, SET NULL, and CASCADE?",
    shortAnswer: "1) Use `CASCADE` for existential master-detail records (Order Items). 2) Use `RESTRICT` for financial, tax, and legal audit records. 3) Use `SET NULL` for optional associations (mentors, managers). 4) Verify FK column is nullable (`INT NULL`) before using `SET NULL`. 5) Combine with `ON UPDATE CASCADE` for primary key stability.",
    explanation: "Following these 5 rules guarantees data safety and referential integrity across all business domains.",
    hint: "CASCADE for master-detail, RESTRICT for financial, SET NULL for optional, Nullable check, UPDATE CASCADE.",
    level: "basic"
  }
];

export default questions;
