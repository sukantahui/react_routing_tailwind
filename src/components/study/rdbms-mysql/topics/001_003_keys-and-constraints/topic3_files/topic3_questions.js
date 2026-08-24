// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is Referential Integrity in relational database theory?",
    shortAnswer: "A property ensuring that all references from a child table to a parent table remain valid and point to existing entities.",
    explanation: "Referential integrity prevents the existence of orphaned child rows in the database.",
    hint: "Validity of foreign key references.",
    level: "basic"
  },
  {
    question: "What does the `foreign_key_checks` system variable control in MySQL?",
    shortAnswer: "It globally or session-wise enables (1) or disables (0) the enforcement of Foreign Key constraints by the InnoDB storage engine.",
    explanation: "Disabling it is useful during bulk migrations and table restoration.",
    hint: "foreign_key_checks toggle.",
    level: "basic",
    codeExample: "SET foreign_key_checks = 0;\n-- Bulk ETL operations\nSET foreign_key_checks = 1;"
  },
  {
    question: "What scope does `SET foreign_key_checks = 0;` have by default?",
    shortAnswer: "Session scope (affects only the current database connection/session).",
    explanation: "Other concurrent connections continue to enforce foreign key constraints unless `SET GLOBAL foreign_key_checks = 0;` is executed.",
    hint: "Session-level scope.",
    level: "moderate"
  },
  {
    question: "What are valid production use cases for temporarily disabling `foreign_key_checks`?",
    shortAnswer: "1) Restoring multi-table database backup dumps in arbitrary order, 2) Truncating parent tables with active FK references, 3) Creating circular relationship schemas.",
    explanation: "Allows batch administrative workflows without failing on dependency ordering.",
    hint: "Backup restoration and parent table truncation.",
    level: "moderate"
  },
  {
    question: "What is the primary danger of leaving `foreign_key_checks = 0` in production?",
    shortAnswer: "Applications can insert orphaned child records with non-existent parent IDs, silently corrupting relational data integrity.",
    explanation: "Must always be re-enabled immediately in the same administrative script.",
    hint: "Silent data corruption and orphaned records.",
    level: "basic"
  },
  {
    question: "What error occurs if you try to insert an invalid foreign key while `foreign_key_checks = 1`?",
    shortAnswer: "Error 1452 (23000): 'Cannot add or update a child row: a foreign key constraint fails'.",
    explanation: "InnoDB verifies parent presence and rejects the insert.",
    hint: "Error 1452.",
    level: "basic"
  },
  {
    question: "What error occurs if you try to delete a referenced parent row under `ON DELETE RESTRICT`?",
    shortAnswer: "Error 1451 (23000): 'Cannot delete or update a parent row: a foreign key constraint fails'.",
    explanation: "InnoDB prevents creating orphaned child records.",
    hint: "Error 1451.",
    level: "basic"
  },
  {
    question: "How does InnoDB verify foreign key integrity during an `INSERT` into a child table?",
    shortAnswer: "InnoDB performs a B-Tree index lookup on the parent table and acquires a shared lock (S lock) on the parent row to ensure it exists.",
    explanation: "Prevents concurrent transactions from deleting the parent while the child is being inserted.",
    hint: "Shared lock index lookup on parent.",
    level: "expert"
  },
  {
    question: "Can `TRUNCATE TABLE` be executed on a parent table when `foreign_key_checks = 1`?",
    shortAnswer: "No, MySQL rejects the truncate with Error 1701: 'Cannot truncate a table referenced in a foreign key constraint'.",
    explanation: "To truncate, you must either drop child constraints, truncate child tables first, or set `foreign_key_checks = 0`.",
    hint: "Error 1701 TRUNCATE prohibition.",
    level: "moderate"
  },
  {
    question: "What happens if you disable `foreign_key_checks`, insert invalid orphaned rows, and re-enable `foreign_key_checks = 1`?",
    shortAnswer: "Re-enabling `foreign_key_checks` does NOT validate existing corrupted rows; it only enforces constraints on future `INSERT`/`UPDATE` operations.",
    explanation: "Existing orphan records remain corrupted until manually cleaned up.",
    hint: "Re-enabling does not retroactively validate existing data.",
    level: "expert"
  },
  {
    question: "How can you detect orphaned child rows that were inserted while `foreign_key_checks = 0`?",
    shortAnswer: "Using an anti-join: `SELECT c.* FROM child_table c LEFT JOIN parent_table p ON c.parent_id = p.id WHERE p.id IS NULL;`.",
    explanation: "Identifies all child records whose parent references no longer exist.",
    hint: "LEFT JOIN WHERE parent.id IS NULL anti-join.",
    level: "expert",
    codeExample: "SELECT p.*\nFROM student_payments p\nLEFT JOIN students s ON p.student_id = s.student_id\nWHERE s.student_id IS NULL;"
  },
  {
    question: "What is the locking overhead of `ON DELETE CASCADE` on large tables?",
    shortAnswer: "Deleting a single parent can acquire thousands of row locks on child tables, causing lock contention, high transaction log write volume, and potential deadlocks.",
    explanation: "For multi-million row child tables, batch soft-deleting is preferred over massive cascades.",
    hint: "Massive row-level lock accumulation during cascading deletes.",
    level: "expert"
  },
  {
    question: "What is the difference between `CASCADE` and `SET NULL` on delete?",
    shortAnswer: "`CASCADE` physically removes the child rows; `SET NULL` preserves the child rows while disassociating their foreign key pointer.",
    explanation: "`SET NULL` is used when child entities have independent value (e.g. assigning orphaned blog posts to a default system author).",
    hint: "Deleting child rows vs nullifying foreign keys.",
    level: "basic"
  },
  {
    question: "Can a foreign key reference a composite key in the parent table?",
    shortAnswer: "Yes, the child table must define a matching composite foreign key with identical column order and data types.",
    explanation: "`FOREIGN KEY (col1, col2) REFERENCES parent(col1, col2)`.",
    hint: "Multi-column foreign key matching.",
    level: "moderate"
  },
  {
    question: "How do you check the current status of `foreign_key_checks` in MySQL?",
    shortAnswer: "`SELECT @@foreign_key_checks;` or `SHOW VARIABLES LIKE 'foreign_key_checks';`.",
    explanation: "Returns 1 (enabled) or 0 (disabled).",
    hint: "SELECT @@foreign_key_checks.",
    level: "basic",
    codeExample: "SELECT @@SESSION.foreign_key_checks, @@GLOBAL.foreign_key_checks;"
  },
  {
    question: "Can you create a foreign key on a view in MySQL?",
    shortAnswer: "No, Foreign Key constraints can only be defined on physical base tables, not views.",
    explanation: "Views are virtual query projections without independent clustered index storage.",
    hint: "Base tables only.",
    level: "basic"
  },
  {
    question: "What happens when you drop a parent table before dropping its child tables?",
    shortAnswer: "MySQL blocks the drop with Error 3730: 'Cannot drop table ... referenced by a foreign key constraint'.",
    explanation: "You must drop the child tables first or drop the foreign key constraint.",
    hint: "Error 3730 table drop failure.",
    level: "basic"
  },
  {
    question: "What is a Cascading Update (`ON UPDATE CASCADE`)?",
    shortAnswer: "When a parent row's Primary Key is modified, InnoDB automatically propagates the new key value to all matching child foreign keys.",
    explanation: "Maintains synchronization across related records.",
    hint: "Automatic parent-to-child key synchronization on update.",
    level: "basic",
    codeExample: "FOREIGN KEY (student_id) REFERENCES students(student_id) ON UPDATE CASCADE"
  },
  {
    question: "What is the difference between `RESTRICT` and `NO ACTION` in standard SQL vs MySQL?",
    shortAnswer: "In standard SQL, `NO ACTION` can defer checks to the end of a transaction, whereas `RESTRICT` checks immediately; in MySQL InnoDB, both check immediately and behave identically.",
    explanation: "MySQL does not support deferred foreign key constraint checks.",
    hint: "Immediate constraint evaluation in MySQL.",
    level: "expert"
  },
  {
    question: "Why does InnoDB require an index on child foreign key columns?",
    shortAnswer: "To ensure that parent deletion and update checks (`ON DELETE RESTRICT` / `CASCADE`) can locate matching child rows in O(log N) microseconds rather than performing a full table scan.",
    explanation: "Without an index, checking FK constraints on large tables would cause severe performance degradation.",
    hint: "Fast indexed child lookup during parent modifications.",
    level: "expert"
  },
  {
    question: "What happens if a child table has a foreign key referencing a parent table, and both tables are in different databases on the same MySQL server?",
    shortAnswer: "InnoDB fully supports cross-database foreign key constraints on the same server (e.g. `REFERENCES db2.customers(id)`).",
    explanation: "Both databases must reside on the same MySQL instance.",
    hint: "Cross-database foreign key support on the same MySQL instance.",
    level: "expert",
    codeExample: "CONSTRAINT fk_order_cust FOREIGN KEY (cust_id) REFERENCES master_db.customers(customer_id)"
  },
  {
    question: "What is the effect of `foreign_key_checks = 0` on `ALTER TABLE` operations?",
    shortAnswer: "It allows altering column types and dropping tables without triggering dependency validation errors during schema migrations.",
    explanation: "Useful for complex multi-step schema refactoring.",
    hint: "Bypassing dependency checks during schema refactoring.",
    level: "expert"
  },
  {
    question: "How do you inspect the full InnoDB Foreign Key error diagnostics after a failure?",
    shortAnswer: "Execute `SHOW ENGINE INNODB STATUS;` and inspect the `LATEST FOREIGN KEY ERROR` section.",
    explanation: "Provides exact details of column names, parent/child table names, and why the constraint failed.",
    hint: "SHOW ENGINE INNODB STATUS diagnostics.",
    level: "expert",
    codeExample: "SHOW ENGINE INNODB STATUS\\G"
  },
  {
    question: "Can a foreign key reference a parent column that is NOT indexed?",
    shortAnswer: "No, MySQL requires the referenced parent column to be a `PRIMARY KEY` or have a `UNIQUE` index.",
    explanation: "Referential integrity requires unambiguous uniqueness on the parent side.",
    hint: "Referenced parent column must have a unique index.",
    level: "basic"
  },
  {
    question: "What happens to foreign keys when a table is copied using `CREATE TABLE new_table LIKE old_table;`?",
    shortAnswer: "`CREATE TABLE ... LIKE` copies column definitions and indexes, but does NOT copy foreign key constraints.",
    explanation: "Foreign key constraints must be re-added explicitly on the new table.",
    hint: "Foreign keys are not copied with CREATE TABLE LIKE.",
    level: "expert"
  },
  {
    question: "What is the best practice for deleting millions of rows from a parent table with `ON DELETE CASCADE`?",
    shortAnswer: "Avoid single massive `DELETE` statements. Instead, batch the deletion in chunks (e.g. `LIMIT 5000`) or disable foreign keys and truncate staging tables.",
    explanation: "Prevents undo log exhaustion, memory thrashing, and high replication lag.",
    hint: "Batched deletions in chunks to avoid lock exhaustion.",
    level: "expert"
  },
  {
    question: "Can a child foreign key column reference a generated (stored) column in the parent table?",
    shortAnswer: "Yes, provided the stored generated column in the parent table has a `UNIQUE` constraint or index.",
    explanation: "Stored generated columns exist physically in B-Tree indexes.",
    hint: "Stored generated parent column support.",
    level: "expert"
  },
  {
    question: "What happens if you insert a row with `student_id = NULL` into a child table whose foreign key is nullable?",
    shortAnswer: "InnoDB permits the insert without checking the parent table, because NULL represents an unassigned, optional relationship.",
    explanation: "Foreign key checks are bypassed for NULL entries.",
    hint: "NULL values bypass foreign key validation.",
    level: "moderate"
  },
  {
    question: "How do you define a Self-Referencing Foreign Key for category hierarchies in MySQL?",
    shortAnswer: "`CONSTRAINT fk_cat_parent FOREIGN KEY (parent_category_id) REFERENCES categories(category_id) ON DELETE RESTRICT`.",
    explanation: "Top-level categories have `parent_category_id = NULL`.",
    hint: "Self-referencing recursive foreign key.",
    level: "moderate",
    codeExample: "CREATE TABLE categories (\n    category_id INT AUTO_INCREMENT PRIMARY KEY,\n    category_name VARCHAR(50) NOT NULL,\n    parent_category_id INT NULL,\n    CONSTRAINT fk_cat_parent FOREIGN KEY (parent_category_id)\n        REFERENCES categories(category_id)\n);"
  },
  {
    question: "What is the recommended checklist for managing Referential Integrity and Foreign Key Checks in production?",
    shortAnswer: "1) Always keep `foreign_key_checks = 1` active in applications. 2) Only disable checks inside migration scripts with immediate re-enabling. 3) Use anti-joins to audit orphaned records. 4) Use `RESTRICT` for financial and audit data. 5) Use `SHOW ENGINE INNODB STATUS` to diagnose constraint errors.",
    explanation: "Following these 5 rules guarantees zero data corruption, orphaned records, or lock contention spikes.",
    hint: "Enforce checks, Restrict financial data, Audit orphans, Safe migrations.",
    level: "basic"
  }
];

export default questions;
