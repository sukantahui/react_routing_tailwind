// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What does the `ON DELETE CASCADE` referential action do in MySQL?",
    shortAnswer: "When a parent record is deleted, MySQL automatically and atomically deletes ALL child records in the referencing table that point to that parent.",
    explanation: "Eliminates orphaned child records for existential parent-child entities.",
    hint: "Automatically deletes child records upon parent deletion.",
    level: "basic",
    codeExample: "CONSTRAINT fk_payments FOREIGN KEY (student_id)\nREFERENCES students(student_id) ON DELETE CASCADE"
  },
  {
    question: "What does the `ON UPDATE CASCADE` referential action do in MySQL?",
    shortAnswer: "When a parent record's Primary Key is modified, MySQL automatically updates the Foreign Key values in all matching child records to reflect the new parent key.",
    explanation: "Maintains key synchronization across related tables without breaking links.",
    hint: "Automatically propagates primary key updates to child foreign keys.",
    level: "basic",
    codeExample: "CONSTRAINT fk_orders FOREIGN KEY (customer_id)\nREFERENCES customers(customer_id) ON UPDATE CASCADE"
  },
  {
    question: "When is `ON DELETE CASCADE` appropriate to use in real-world database design?",
    shortAnswer: "When child records cannot logically or meaningfully exist without the parent entity (e.g. `order_items` belonging to an `order`, or `student_documents` belonging to a `student`).",
    explanation: "Standard for master-detail and existential composition relationships.",
    hint: "Master-detail existential child records.",
    level: "basic"
  },
  {
    question: "When is `ON DELETE CASCADE` DANGEROUS or inappropriate in real-world systems?",
    shortAnswer: "When child records contain legal, financial, or audit retention requirements (e.g. customer invoices or financial tax payments should never be silently deleted when a customer profile is removed).",
    explanation: "Financial ledgers require `RESTRICT` or soft deletes (`is_deleted = 1`).",
    hint: "Financial, audit, and legal retention data.",
    level: "basic"
  },
  {
    question: "How does MySQL InnoDB ensure atomicity during an `ON DELETE CASCADE` operation?",
    shortAnswer: "The parent row deletion and all cascaded child row deletions occur within the EXACT same database transaction; if any child deletion fails, the entire operation is rolled back.",
    explanation: "Guarantees that the database is never left in a partially deleted, inconsistent state.",
    hint: "All deletions occur within a single atomic transaction.",
    level: "moderate"
  },
  {
    question: "What happens in a 3-tier cascading chain (e.g. `Department` → `Student` → `Payment`) when the Department is deleted?",
    shortAnswer: "The deletion cascades down the entire hierarchy: all students in that department are deleted, AND all payments belonging to those students are deleted.",
    explanation: "Multi-tier recursive cascading.",
    hint: "Cascades through all downstream dependent child tiers.",
    level: "moderate"
  },
  {
    question: "Do Foreign Key cascading actions trigger `AFTER DELETE` or `AFTER UPDATE` triggers on child tables in MySQL?",
    shortAnswer: "No, in MySQL, foreign key cascading actions are executed directly at the storage engine level and do NOT activate SQL triggers defined on child tables.",
    explanation: "A critical architectural difference between application-level deletes and engine cascades.",
    hint: "Engine cascades do NOT fire child SQL triggers.",
    level: "expert"
  },
  {
    question: "Why must foreign key columns in child tables be indexed when using `ON DELETE CASCADE`?",
    shortAnswer: "Without an index on the child's foreign key, deleting a single parent row forces a slow full table scan on the child table to find matching rows to cascade.",
    explanation: "Indexes enable instant B-Tree seeks during cascade lookups.",
    hint: "Prevents full table scans during cascade lookups.",
    level: "expert"
  },
  {
    question: "What performance risk arises when executing `DELETE FROM parent WHERE id = 1` on a parent with 1,000,000 child rows configured with `ON DELETE CASCADE`?",
    shortAnswer: "InnoDB must acquire row locks on all 1,000,000 child rows, generating massive redo/undo log entries, causing replication lag, and triggering lock wait timeouts for concurrent queries.",
    explanation: "Large volume cascades should be executed in smaller application batches.",
    hint: "Massive lock acquisitions and transaction timeouts.",
    level: "expert"
  },
  {
    question: "How do you add `ON DELETE CASCADE` to an existing Foreign Key constraint using `ALTER TABLE`?",
    shortAnswer: "Drop the existing foreign key constraint, then re-add it with the `ON DELETE CASCADE` clause.",
    explanation: "Foreign key referential actions cannot be altered in-place.",
    hint: "Drop FK and re-add with ON DELETE CASCADE.",
    level: "moderate",
    codeExample: "ALTER TABLE student_payments\n    DROP FOREIGN KEY fk_payments_student,\n    ADD CONSTRAINT fk_payments_student FOREIGN KEY (student_id)\n        REFERENCES students(student_id) ON DELETE CASCADE;"
  },
  {
    question: "What happens if a parent table uses `AUTO_INCREMENT` and an `UPDATE parent SET id = 500 WHERE id = 100;` is executed with `ON UPDATE CASCADE`?",
    shortAnswer: "The parent's ID changes to 500, all matching child foreign keys update to 500, and the parent's auto-increment counter jumps to 501.",
    explanation: "Synchronizes keys and advances sequence state.",
    hint: "Synchronizes keys and updates sequence counter.",
    level: "moderate"
  },
  {
    question: "Can `ON DELETE CASCADE` be combined with `ON UPDATE RESTRICT` on the same foreign key?",
    shortAnswer: "Yes, you can configure different referential actions for delete and update events on the same constraint.",
    explanation: "Enables granular event-specific business rule enforcement.",
    hint: "Independent delete and update actions per constraint.",
    level: "basic",
    codeExample: "CONSTRAINT fk_order FOREIGN KEY (order_id)\nREFERENCES orders(order_id) ON DELETE CASCADE ON UPDATE RESTRICT"
  },
  {
    question: "What is the difference between `ON DELETE CASCADE` vs `ON DELETE SET NULL`?",
    shortAnswer: "`ON DELETE CASCADE` deletes the child row entirely; `ON DELETE SET NULL` preserves the child row but sets its foreign key column to `NULL`.",
    explanation: "CASCADE eliminates child rows; SET NULL retains them unassigned.",
    hint: "Row deletion vs column nullification.",
    level: "basic"
  },
  {
    question: "Can a foreign key with `NOT NULL` on the child column use `ON DELETE CASCADE`?",
    shortAnswer: "Yes, `NOT NULL` columns work seamlessly with `CASCADE` because matching child rows are deleted entirely rather than set to NULL.",
    explanation: "`SET NULL` fails on NOT NULL columns, but `CASCADE` is 100% valid.",
    hint: "CASCADE works seamlessly with NOT NULL columns.",
    level: "basic"
  },
  {
    question: "What is a 'Cascading Loop / Circular Cascade' in database design?",
    shortAnswer: "A cyclic dependency graph where Table A cascades to Table B, and Table B cascades back to Table A.",
    explanation: "MySQL prevents circular cascade definitions that create infinite recursive deletion loops.",
    hint: "Circular cascade dependency graph.",
    level: "expert"
  },
  {
    question: "How do you check what referential action is configured on a Foreign Key in MySQL?",
    shortAnswer: "Query `DELETE_RULE` and `UPDATE_RULE` in `information_schema.REFERENTIAL_CONSTRAINTS`.",
    explanation: "Displays `CASCADE`, `SET NULL`, `RESTRICT`, or `NO ACTION`.",
    hint: "information_schema.REFERENTIAL_CONSTRAINTS.",
    level: "moderate",
    codeExample: "SELECT CONSTRAINT_NAME, DELETE_RULE, UPDATE_RULE\nFROM information_schema.REFERENTIAL_CONSTRAINTS\nWHERE CONSTRAINT_SCHEMA = 'college_db';"
  },
  {
    question: "How does `TRUNCATE TABLE parent_table;` interact with child tables that have `ON DELETE CASCADE` foreign keys?",
    shortAnswer: "`TRUNCATE TABLE` does NOT cascade; MySQL immediately rejects TRUNCATE on any table referenced by foreign keys with Error 1701.",
    explanation: "`TRUNCATE` is a DDL operation that bypasses row-level cascade triggers.",
    hint: "TRUNCATE does not cascade and fails with Error 1701.",
    level: "moderate"
  },
  {
    question: "How do you safely wipe data from related tables with CASCADE during local automated testing?",
    shortAnswer: "`DELETE FROM parent_table;` (which triggers row cascades), or temporarily `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE ...; SET FOREIGN_KEY_CHECKS = 1;`.",
    explanation: "Standard test fixture teardown strategies.",
    hint: "DELETE FROM or temporary FOREIGN_KEY_CHECKS = 0.",
    level: "basic"
  },
  {
    question: "What happens if a child table has an active foreign key with `ON DELETE CASCADE`, and you run `DELETE FROM parent WHERE id = 101` inside a transaction that is later rolled back?",
    shortAnswer: "Both the parent row and all cascaded child rows are fully restored to their original state upon `ROLLBACK`.",
    explanation: "Cascaded changes are fully transactional in InnoDB.",
    hint: "Transactional rollback restores both parent and child rows.",
    level: "basic"
  },
  {
    question: "Can an `ON DELETE CASCADE` action fail if a child table has a downstream foreign key with `ON DELETE RESTRICT`?",
    shortAnswer: "Yes, if deleting the child violates a downstream `RESTRICT` rule on a grandchild table, the entire cascade aborts with Error 1451 and rolls back.",
    explanation: "Downstream RESTRICT rules halt the cascade chain.",
    hint: "Downstream RESTRICT aborts the cascade chain.",
    level: "expert"
  },
  {
    question: "How does `ON DELETE CASCADE` behave on a Many-to-Many Junction Table?",
    shortAnswer: "Deleting either parent master record deletes all matching junction rows, cleanly unlinking the association without deleting the other parent master record.",
    explanation: "The standard architectural pattern for junction table lifecycle management.",
    hint: "Cleans up junction links without deleting opposite parent.",
    level: "moderate"
  },
  {
    question: "Why do enterprise banking and financial systems strictly prohibit `ON DELETE CASCADE` on transaction tables?",
    shortAnswer: "To prevent accidental destruction of permanent financial audit ledgers and maintain compliance with financial accounting standards.",
    explanation: "Financial systems use immutable append-only ledgers and `RESTRICT`.",
    hint: "Financial accounting compliance and immutable audit ledgers.",
    level: "basic"
  },
  {
    question: "How does `ON DELETE CASCADE` interact with MySQL binary logs (binlogs) during replication?",
    shortAnswer: "In row-based replication (`binlog_format=ROW`), the master logs all cascaded child row deletions directly into the binlog, ensuring identical replica state.",
    explanation: "Ensures replica data consistency.",
    hint: "Row-based replication logs all cascaded deletions.",
    level: "expert"
  },
  {
    question: "What is the difference between 'Soft Delete' (`is_deleted = 1`) vs `ON DELETE CASCADE` in modern web applications?",
    shortAnswer: "Soft deletes retain the physical rows in storage with a flag for recovery/auditing; `ON DELETE CASCADE` permanently removes physical bytes from the disk pages.",
    explanation: "Soft delete requires application-level query filtering (`WHERE is_deleted = 0`).",
    hint: "Flagging vs physical disk deletion.",
    level: "moderate"
  },
  {
    question: "Can `ON DELETE CASCADE` be used in a Self-Referencing table (e.g. Category tree)?",
    shortAnswer: "Yes, deleting a top category automatically deletes all nested subcategories and child subcategories recursively.",
    explanation: "Clean teardown for composite taxonomy trees.",
    hint: "Recursively deletes nested subcategory trees.",
    level: "moderate"
  },
  {
    question: "How do you count how many child rows will be deleted before executing an `ON DELETE CASCADE` query?",
    shortAnswer: "`SELECT COUNT(*) FROM child_table WHERE parent_id = 101;`.",
    explanation: "Pre-deletion audit query to preview impact.",
    hint: "SELECT COUNT(*) FROM child WHERE parent_id = X.",
    level: "basic"
  },
  {
    question: "What happens if you update a parent's primary key to an ID that already exists in the parent table with `ON UPDATE CASCADE`?",
    shortAnswer: "MySQL immediately aborts with Error 1062 (Duplicate entry for parent primary key); no parent or child rows are updated.",
    explanation: "Primary key uniqueness takes precedence.",
    hint: "Error 1062 on duplicate parent primary key.",
    level: "basic"
  },
  {
    question: "Why should `ON UPDATE CASCADE` be configured on tables that use Natural Primary Keys (like Course Codes or SKUs)?",
    shortAnswer: "Because natural keys may be renamed by business users (e.g. changing SKU 'CS-101' to 'CS-101A'); `CASCADE` guarantees all child records update automatically.",
    explanation: "Prevents orphaned records during business identifier updates.",
    hint: "Essential for natural keys that may be renamed.",
    level: "moderate"
  },
  {
    question: "How do you drop an `ON DELETE CASCADE` action and replace it with `ON DELETE RESTRICT` in MySQL?",
    shortAnswer: "Execute `ALTER TABLE child DROP FOREIGN KEY fk_name, ADD CONSTRAINT fk_name FOREIGN KEY (col) REFERENCES parent(id) ON DELETE RESTRICT;`.",
    explanation: "Atomic drop-and-add of the foreign key constraint.",
    hint: "Drop FK and re-add with ON DELETE RESTRICT.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist for using ON DELETE CASCADE and ON UPDATE CASCADE in production schemas?",
    shortAnswer: "1) Use `ON DELETE CASCADE` only for existential child entities (e.g. Order Items). 2) Always combine with `ON UPDATE CASCADE`. 3) Prohibit `CASCADE` on legal/financial tables (use `RESTRICT`). 4) Index all foreign key columns. 5) Batch delete in application code if parent has 100k+ children.",
    explanation: "Following these 5 rules guarantees automated parent-child synchronization without data loss or performance crashes.",
    hint: "Existential child entities, Combine with UPDATE CASCADE, Prohibit on financial tables, Index FKs, Batch large deletes.",
    level: "basic"
  }
];

export default questions;
