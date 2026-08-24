// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the fundamental difference between `DROP TABLE` and `TRUNCATE TABLE` in MySQL?",
    shortAnswer: "`DROP TABLE` deletes both the table's data AND its schema definition from disk; `TRUNCATE TABLE` deletes all data rows and resets auto-increment while preserving the table structure.",
    explanation: "After running `DROP TABLE students;`, the table no longer exists. After running `TRUNCATE TABLE students;`, the table still exists as an empty relation ready for new inserts.",
    hint: "Complete structural removal vs bulk data wipe.",
    level: "basic",
    codeExample: "DROP TABLE students;      -- Schema deleted\nTRUNCATE TABLE students;  -- Schema preserved, rows wiped"
  },
  {
    question: "Why is `TRUNCATE TABLE` classified as a DDL command rather than a DML command?",
    shortAnswer: "Because it internally drops and recreates the tablespace data pages rather than deleting records row by row.",
    explanation: "TRUNCATE operates at the physical page allocation level. It deallocates InnoDB extents, resets sequence counters, and writes to data dictionary metadata, triggering an implicit transaction commit.",
    hint: "Physical page deallocation vs transactional row deletion.",
    level: "moderate"
  },
  {
    question: "What happens to the `AUTO_INCREMENT` sequence counter when a table is TRUNCATED vs when it is emptied using `DELETE FROM tbl;`?",
    shortAnswer: "`TRUNCATE` resets the `AUTO_INCREMENT` counter back to 1 (or initial starting seed); `DELETE` preserves the current counter value.",
    explanation: "If a table reaches `student_id = 500`, running `DELETE FROM students;` means the next inserted row will receive ID 501. Running `TRUNCATE TABLE students;` resets the next inserted row ID back to 1.",
    hint: "Auto-increment sequence reset behavior.",
    level: "basic",
    codeExample: "-- TRUNCATE resets auto-increment to 1\n-- DELETE FROM retains auto-increment counter at 501"
  },
  {
    question: "Why is `TRUNCATE TABLE` exponentially faster than `DELETE FROM table_name;` on tables with millions of rows?",
    shortAnswer: "`TRUNCATE` deallocates tablespace pages en masse without generating undo log records or rollback segments, whereas `DELETE` writes individual undo and redo log entries for every single row.",
    explanation: "Deleting 10,000,000 rows with `DELETE` writes gigabytes of undo log records to disk to allow rollback. `TRUNCATE` simply frees index pages in milliseconds.",
    hint: "Undo log generation overhead in row-level DML.",
    level: "expert"
  },
  {
    question: "Can a `TRUNCATE TABLE` statement be rolled back inside a database transaction (`ROLLBACK`)?",
    shortAnswer: "No; because TRUNCATE is DDL, it triggers an implicit commit before and after execution, making rollback impossible.",
    explanation: "Executing `START TRANSACTION; TRUNCATE TABLE tbl; ROLLBACK;` will NOT restore the data because the implicit commit permanently persists the truncate before `ROLLBACK` executes.",
    hint: "Implicit commit behavior of DDL statements.",
    level: "moderate"
  },
  {
    question: "Do `BEFORE DELETE` or `AFTER DELETE` triggers fire when executing `TRUNCATE TABLE`?",
    shortAnswer: "No; triggers only fire for row-level DML statements (`DELETE`), not for bulk DDL operations (`TRUNCATE`).",
    explanation: "If you rely on delete triggers to maintain audit logs or update counters, `TRUNCATE TABLE` will bypass those triggers completely.",
    hint: "Triggers do not fire on DDL.",
    level: "moderate"
  },
  {
    question: "What error occurs if you try to `TRUNCATE` a parent table referenced by an active Foreign Key constraint in another table?",
    shortAnswer: "Error 1701 (42000): 'Cannot truncate a table referenced in a foreign key constraint'.",
    explanation: "MySQL blocks TRUNCATE if any foreign key points to the table (even if the child table is empty) to prevent accidental orphaned references.",
    hint: "Error 1701 foreign key protection.",
    level: "moderate",
    codeExample: "-- ERROR 1701: Cannot truncate a table referenced in a foreign key constraint"
  },
  {
    question: "How can a DBA safely TRUNCATE parent tables in staging environments during bulk test resets?",
    shortAnswer: "By temporarily disabling foreign key checks: `SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE tbl; SET FOREIGN_KEY_CHECKS = 1;`.",
    explanation: "Temporarily turning off `FOREIGN_KEY_CHECKS` allows resetting test tables in automated CI/CD test pipelines.",
    hint: "SET FOREIGN_KEY_CHECKS toggle.",
    level: "expert",
    codeExample: "SET FOREIGN_KEY_CHECKS = 0;\nTRUNCATE TABLE students;\nSET FOREIGN_KEY_CHECKS = 1;"
  },
  {
    question: "Can you drop multiple tables in a single SQL statement?",
    shortAnswer: "Yes, `DROP TABLE [IF EXISTS] tbl1, tbl2, tbl3;` supports a comma-separated list of tables.",
    explanation: "Unlike `DROP DATABASE` which only accepts one database identifier, `DROP TABLE` can drop dozens of tables in a single DDL execution.",
    hint: "Comma-separated list in DROP TABLE.",
    level: "basic",
    codeExample: "DROP TABLE IF EXISTS staging_orders, staging_payments, staging_items;"
  },
  {
    question: "What does the `IF EXISTS` clause do in a `DROP TABLE` statement?",
    shortAnswer: "It prevents MySQL from throwing Error 1051 if the specified table does not exist, issuing a non-fatal warning instead.",
    explanation: "Essential for idempotent migration and cleanup scripts: `DROP TABLE IF EXISTS temp_scores;` ensures the script continues execution without crashing.",
    hint: "Error 1051 suppression for idempotent scripting.",
    level: "basic",
    codeExample: "DROP TABLE IF EXISTS temporary_imports;"
  },
  {
    question: "What is the difference between `DROP TABLE` and `DROP TEMPORARY TABLE`?",
    shortAnswer: "`DROP TEMPORARY TABLE` guarantees that only a session-scoped temporary table is dropped, preventing accidental deletion of a permanent base table of the same name.",
    explanation: "If a temporary table shares the name of a base table, adding the `TEMPORARY` keyword acts as a safety guard to ensure only the transient session table is affected.",
    hint: "TEMPORARY keyword safety qualifier.",
    level: "expert",
    codeExample: "DROP TEMPORARY TABLE IF EXISTS temp_student_ids;"
  },
  {
    question: "What happens to views that reference a table when that table is DROPPED?",
    shortAnswer: "The views remain in the data dictionary but become invalid; querying them will return Error 1356: 'View references invalid table(s)'.",
    explanation: "MySQL does not automatically drop dependent views when a base table is dropped. The views must be dropped or recreated manually.",
    hint: "Orphaned/invalid view state.",
    level: "expert"
  },
  {
    question: "What happens to secondary indexes when a table is TRUNCATED vs when it is DROPPED?",
    shortAnswer: "Under `TRUNCATE`, secondary index trees are cleared and preserved in the schema; under `DROP`, secondary index files and metadata are completely destroyed.",
    explanation: "Truncating reinitializes the B-Tree root pages for all indexes defined on the table, ready for new insertions.",
    hint: "Index tree reinitialization vs index removal.",
    level: "moderate"
  },
  {
    question: "What privilege is required to execute `TRUNCATE TABLE` in MySQL?",
    shortAnswer: "The `DROP` privilege on that table.",
    explanation: "Because TRUNCATE drops and recreates the underlying data files, MySQL requires the user to hold the `DROP` privilege rather than just `DELETE`.",
    hint: "TRUNCATE requires DROP privilege.",
    level: "moderate",
    codeExample: "GRANT DROP ON college_db.students TO 'app_tester'@'localhost';"
  },
  {
    question: "Can you specify a `WHERE` clause in a `TRUNCATE TABLE` statement?",
    shortAnswer: "No, `TRUNCATE TABLE` cannot take a `WHERE` clause; it always operates on the entire table unconditionally.",
    explanation: "For conditional deletions (e.g. deleting students who graduated before 2020), standard DML `DELETE FROM students WHERE graduation_year < 2020;` must be used.",
    hint: "TRUNCATE is strictly unconditional.",
    level: "basic"
  },
  {
    question: "How does `TRUNCATE TABLE` interact with MySQL binary logging (binlog)?",
    shortAnswer: "`TRUNCATE TABLE` is logged as a statement-level DDL event in the binary log and replicated to all read replicas.",
    explanation: "Replicas execute the truncate statement directly, instantly wiping the replica table without replicating individual row deletions.",
    hint: "Statement-level binlog replication.",
    level: "expert"
  },
  {
    question: "What happens to allocated disk space when a table is TRUNCATED in InnoDB?",
    shortAnswer: "The `.ibd` tablespace file is re-created with minimal initial size (typically 112KB), reclaiming disk space back to the operating system immediately.",
    explanation: "Unlike `DELETE` which leaves fragmentation free space inside `.ibd`, `TRUNCATE` shrinks the physical OS file back to its initial allocation.",
    hint: "Immediate disk space reclamation to OS.",
    level: "expert"
  },
  {
    question: "What is the recommended approach for purging 50 million old log records from a 100-million row table without locking production?",
    shortAnswer: "Partitioning by range/date and using `ALTER TABLE logs DROP PARTITION p_old;` or chunked batch deletes.",
    explanation: "Dropping a partition is an instantaneous DDL operation that reclaims space without the immense I/O and locking of large `DELETE` queries.",
    hint: "Partition pruning and drop partition.",
    level: "expert",
    codeExample: "ALTER TABLE event_logs DROP PARTITION p_2025_q1;"
  },
  {
    question: "Why should `DROP TABLE` commands in production migration scripts always use `IF EXISTS`?",
    shortAnswer: "To ensure script idempotency, avoiding failure when re-running migrations across different staging environments or fresh CI test databases.",
    explanation: "If a teardown script runs on an environment where the table was never created, `IF EXISTS` prevents fatal build aborts.",
    hint: "Idempotency in deployment automation.",
    level: "basic"
  },
  {
    question: "What is the result of running `TRUNCATE` on an `AUTO_INCREMENT` table that was created with `AUTO_INCREMENT = 5000`?",
    shortAnswer: "In MySQL 8.0, TRUNCATE resets the counter back to `1` unless the table is explicitly altered afterwards.",
    explanation: "To restore a custom starting seed after truncation, run `ALTER TABLE tbl AUTO_INCREMENT = 5000;` immediately following the truncate.",
    hint: "Reset to default seed 1.",
    level: "moderate",
    codeExample: "TRUNCATE TABLE invoices;\nALTER TABLE invoices AUTO_INCREMENT = 5000;"
  },
  {
    question: "What error occurs if you try to query a table that was dropped?",
    shortAnswer: "Error 1146 (42S02): 'Table doesn\'t exist'.",
    explanation: "Once dropped, MySQL has no record of the table name in the data dictionary.",
    hint: "Error 1146 indicates non-existent table.",
    level: "basic"
  },
  {
    question: "How can a DBA recover a table dropped accidentally by a human operator in production?",
    shortAnswer: "Restore the latest full snapshot backup (mysqldump / physical backup) and apply point-in-time binary log replay up to the timestamp immediately preceding the DROP command.",
    explanation: "Because `DROP TABLE` unlinks physical files, point-in-time recovery via binary logs is the only reliable disaster recovery mechanism.",
    hint: "Point-in-Time Recovery (PITR) using binary logs.",
    level: "expert",
    codeExample: "mysqlbinlog --stop-datetime=\"2026-08-24 10:00:00\" binlog.000001 | mysql -u root -p"
  },
  {
    question: "What happens if you run `DROP TABLE` on a table that is currently locked by another transaction running a long query?",
    shortAnswer: "The `DROP TABLE` statement waits for the Metadata Lock (MDL) until the active transaction commits, or times out with Error 1205.",
    explanation: "All DDL statements acquire an exclusive Metadata Lock on the table. If an active `SELECT` query is reading the table, the DDL waits behind it.",
    hint: "Metadata Lock (MDL) wait queue.",
    level: "expert"
  },
  {
    question: "Is `TRUNCATE TABLE` allowed on a table inside a read-only database (`READ ONLY = 1`) in MySQL 8.0?",
    shortAnswer: "No; MySQL blocks all DDL and DML write modifications on read-only databases.",
    explanation: "Setting a schema to `READ ONLY = 1` prevents all destructive operations, including `TRUNCATE` and `DROP TABLE`.",
    hint: "Read-only schema locks block DDL.",
    level: "moderate"
  },
  {
    question: "Why does `TRUNCATE TABLE` not return the count of deleted rows in its output message?",
    shortAnswer: "Because it deallocates storage pages directly without iterating or counting individual rows, returning '0 rows affected'.",
    explanation: "MySQL returns `Query OK, 0 rows affected` because it does not incur the CPU cost of counting records during truncation.",
    hint: "Zero rows affected output convention in DDL.",
    level: "basic"
  },
  {
    question: "What happens to foreign keys defined inside a child table when that child table is DROPPED?",
    shortAnswer: "The foreign key constraints defined in that child table are destroyed along with the table, leaving the parent table completely unaffected.",
    explanation: "Dropping a child table does not harm the parent; it simply removes the constraints and child rows.",
    hint: "Child table drop does not affect parent table.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist before executing `DROP TABLE` or `TRUNCATE TABLE` in any production database?",
    shortAnswer: "1) Double check server host and active database (`SELECT @@hostname, DATABASE();`). 2) Verify table name. 3) Check dependent foreign keys and views. 4) Confirm recent backup exists.",
    explanation: "Because both operations are irreversible and bypass undo logs, strict verification protocol is mandatory.",
    hint: "Host check, Database check, Dependency review, Backup.",
    level: "basic"
  },
  {
    question: "Can a database user with only `DELETE` privilege execute `TRUNCATE TABLE`?",
    shortAnswer: "No, `DELETE` privilege alone is insufficient; MySQL requires the `DROP` privilege to execute `TRUNCATE TABLE`.",
    explanation: "This privilege separation protects production tables from being wiped by accounts intended only for row-level DML.",
    hint: "TRUNCATE requires DROP grant, not DELETE.",
    level: "moderate"
  },
  {
    question: "How does `TRUNCATE TABLE` affect memory caches like the InnoDB Buffer Pool?",
    shortAnswer: "InnoDB invalidates cached pages for that table from the buffer pool to prevent stale reads.",
    explanation: "Pages belonging to the truncated table's space ID are evicted or marked invalid in the memory buffer pool.",
    hint: "Buffer pool page invalidation.",
    level: "expert"
  },
  {
    question: "What is the golden rule when writing automated database test fixture cleanup routines?",
    shortAnswer: "Use `TRUNCATE TABLE` to rapidly reset test data between test suites while preserving schema definitions and foreign key constraints.",
    explanation: "Truncating tables ensures each unit or integration test starts with clean, empty tables without having to re-run slow `CREATE TABLE` migrations.",
    hint: "Fast test fixture cleanup via TRUNCATE.",
    level: "basic"
  }
];

export default questions;
