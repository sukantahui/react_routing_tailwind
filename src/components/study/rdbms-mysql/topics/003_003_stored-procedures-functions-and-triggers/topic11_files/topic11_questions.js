// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What are the three distinct DML trigger event types in MySQL?",
    shortAnswer: "1. `INSERT` (new row added), 2. `UPDATE` (existing row modified), and 3. `DELETE` (existing row removed).",
    explanation: "The three standard ANSI SQL DML trigger events.",
    hint: "INSERT, UPDATE, and DELETE.",
    level: "basic"
  },
  {
    question: "Does the `TRUNCATE TABLE` statement fire `DELETE` triggers in MySQL?",
    shortAnswer: "NO; `TRUNCATE TABLE` is a DDL operation that drops and re-creates the table at the storage engine level, bypassing all `DELETE` triggers completely.",
    explanation: "DDL vs DML trigger activation mechanics.",
    hint: "No, TRUNCATE TABLE bypasses all DELETE triggers.",
    level: "expert"
  },
  {
    question: "What pseudo-record is available in an `INSERT` trigger?",
    shortAnswer: "ONLY the `NEW` pseudo-record (representing the incoming inserted row); `OLD` is undefined/NULL.",
    explanation: "Pseudo-record availability for INSERT events.",
    hint: "NEW is available; OLD is undefined.",
    level: "basic"
  },
  {
    question: "What pseudo-records are available in an `UPDATE` trigger?",
    shortAnswer: "BOTH `OLD` (pre-update column values) AND `NEW` (post-update column values).",
    explanation: "Pseudo-record availability for UPDATE events.",
    hint: "Both OLD and NEW are available.",
    level: "basic"
  },
  {
    question: "What pseudo-record is available in a `DELETE` trigger?",
    shortAnswer: "ONLY the `OLD` pseudo-record (representing the deleted row); `NEW` is undefined/NULL.",
    explanation: "Pseudo-record availability for DELETE events.",
    hint: "OLD is available; NEW is undefined.",
    level: "basic"
  },
  {
    question: "How do student events for Mamata, Susmita, Abhronila, and Debangshu illustrate the 3 trigger event types?",
    shortAnswer: "1. `INSERT`: Mamata enrolls → Increment department count; 2. `UPDATE`: Susmita's grade changes → Record old & new score in audit log; 3. `DELETE`: Debangshu withdraws → Archive record to `deleted_students_archive`.",
    explanation: "Real-world demonstrations of INSERT, UPDATE, and DELETE triggers.",
    hint: "INSERT increments count + UPDATE logs score revisions + DELETE archives history.",
    level: "basic"
  },
  {
    question: "How does a `REPLACE INTO` statement activate triggers in MySQL?",
    shortAnswer: "If a duplicate key conflict occurs, `REPLACE` fires the `DELETE` trigger (for the existing row) followed by the `INSERT` trigger (for the replacement row).",
    explanation: "REPLACE composite trigger firing behavior.",
    hint: "Fires DELETE trigger then INSERT trigger on duplicate key conflict.",
    level: "expert"
  },
  {
    question: "How does an `INSERT ... ON DUPLICATE KEY UPDATE` statement activate triggers?",
    shortAnswer: "If no duplicate exists, it fires `BEFORE INSERT` and `AFTER INSERT`; if a duplicate key conflict occurs, it fires `BEFORE UPDATE` and `AFTER UPDATE` instead.",
    explanation: "Conditional INSERT/UPDATE trigger activation.",
    hint: "Fires INSERT triggers on new row, or UPDATE triggers on duplicate conflict.",
    level: "expert"
  },
  {
    question: "How many times does an `UPDATE` trigger fire if an `UPDATE` statement modifies 50 rows?",
    shortAnswer: "Exactly 50 times (because MySQL strictly supports `FOR EACH ROW` triggers).",
    explanation: "Row-level iteration frequency.",
    hint: "Fires 50 times (once for every affected row).",
    level: "basic"
  },
  {
    question: "What happens if an `UPDATE` statement is executed with identical values (e.g. `UPDATE students SET score = 85 WHERE score = 85`)?",
    shortAnswer: "MySQL still fires both `BEFORE UPDATE` and `AFTER UPDATE` triggers for each matching row, even if column values remain unchanged.",
    explanation: "Trigger invocation on matching rows regardless of value changes.",
    hint: "Triggers fire for all matched rows regardless of whether values changed.",
    level: "expert"
  },
  {
    question: "How do you automatically increment a department's `total_students` count when a new student enrolls?",
    shortAnswer: "Using an `AFTER INSERT` trigger on `students`: `UPDATE departments SET total_students = total_students + 1 WHERE dept_id = NEW.dept_id;`.",
    explanation: "Automated counter synchronization with AFTER INSERT.",
    hint: "UPDATE departments SET total_students = total_students + 1 WHERE dept_id = NEW.dept_id;",
    level: "basic"
  },
  {
    question: "How do you automatically decrement a department's `total_students` count when a student is deleted?",
    shortAnswer: "Using an `AFTER DELETE` trigger on `students`: `UPDATE departments SET total_students = total_students - 1 WHERE dept_id = OLD.dept_id;`.",
    explanation: "Automated counter decrement with AFTER DELETE.",
    hint: "UPDATE departments SET total_students = total_students - 1 WHERE dept_id = OLD.dept_id;",
    level: "basic"
  },
  {
    question: "How do you handle department transfer updates in an `AFTER UPDATE` trigger?",
    shortAnswer: "`IF OLD.dept_id != NEW.dept_id THEN UPDATE departments SET count = count - 1 WHERE dept_id = OLD.dept_id; UPDATE departments SET count = count + 1 WHERE dept_id = NEW.dept_id; END IF;`",
    explanation: "Cross-department balance transfer in UPDATE trigger.",
    hint: "Decrement OLD.dept_id count and increment NEW.dept_id count.",
    level: "expert"
  },
  {
    question: "How do you archive deleted student rows to a historical table before deletion?",
    shortAnswer: "Using a `BEFORE DELETE` trigger on `students`: `INSERT INTO deleted_students_archive (student_id, student_name, deleted_at, deleted_by) VALUES (OLD.student_id, OLD.first_name, NOW(), USER());`.",
    explanation: "Historical archiving pattern with BEFORE DELETE.",
    hint: "Insert OLD values into archive table inside BEFORE DELETE trigger.",
    level: "basic"
  },
  {
    question: "Can a `BEFORE DELETE` trigger prevent deletion if a student has unpaid fee arrears?",
    shortAnswer: "YES; `IF OLD.outstanding_balance > 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete student with unpaid fees'; END IF;`.",
    explanation: "Defensive deletion prevention.",
    hint: "Check OLD.outstanding_balance > 0 and raise SIGNAL exception.",
    level: "basic"
  },
  {
    question: "Can an `UPDATE` trigger detect which specific column was modified?",
    shortAnswer: "YES; by comparing `IF OLD.column_name != NEW.column_name THEN ...` (or `IF NOT (OLD.col <=> NEW.col)` for NULL-safe comparisons).",
    explanation: "Column change detection in UPDATE triggers.",
    hint: "Compare OLD.column != NEW.column.",
    level: "basic"
  },
  {
    question: "What is the NULL-safe equality operator `<=>` used for in `UPDATE` triggers?",
    shortAnswer: "To safely compare `OLD.col` and `NEW.col` when either value may be `NULL`, preventing three-valued logic comparison issues (`IF NOT (OLD.email <=> NEW.email)`).",
    explanation: "NULL-safe equality comparison in change auditing.",
    hint: "NULL-safe comparison operator <=> for handling NULLs correctly.",
    level: "expert"
  },
  {
    question: "Does `LOAD DATA INFILE` fire `INSERT` triggers in MySQL?",
    shortAnswer: "YES; `LOAD DATA INFILE` activates all `BEFORE INSERT` and `AFTER INSERT` triggers for every row loaded.",
    explanation: "Bulk load trigger activation.",
    hint: "Yes, bulk loading with LOAD DATA INFILE fires INSERT triggers for every row.",
    level: "moderate"
  },
  {
    question: "Can you create a trigger that listens to multiple events simultaneously (e.g. `BEFORE INSERT OR UPDATE`) in MySQL 8.0?",
    shortAnswer: "NO; MySQL requires separate `CREATE TRIGGER` statements for each event type (`BEFORE INSERT` and `BEFORE UPDATE` must be declared separately).",
    explanation: "Single-event trigger syntax constraint in MySQL.",
    hint: "No, separate triggers must be created for each event.",
    level: "expert"
  },
  {
    question: "How do you track exam score revisions in an `AFTER UPDATE` trigger?",
    shortAnswer: "`IF OLD.exam_score_pct != NEW.exam_score_pct THEN INSERT INTO score_revisions (student_id, old_score, new_score, revised_at, revised_by) VALUES (NEW.student_id, OLD.exam_score_pct, NEW.exam_score_pct, NOW(), USER()); END IF;`.",
    explanation: "Score revision audit logging pattern.",
    hint: "Compare OLD and NEW score and log to audit table.",
    level: "basic"
  },
  {
    question: "Can a `BEFORE UPDATE` trigger automatically update a `last_modified_timestamp` column?",
    shortAnswer: "YES; `SET NEW.last_modified_at = NOW();` ensures the modification timestamp is updated on every `UPDATE` statement.",
    explanation: "Automated timestamping in BEFORE UPDATE.",
    hint: "SET NEW.last_modified_at = NOW();",
    level: "basic"
  },
  {
    question: "What happens if an `AFTER INSERT` trigger fails while inserting 10 rows in a batch?",
    shortAnswer: "The failure on row $K$ aborts the statement; all prior inserted rows within that batch are completely rolled back.",
    explanation: "Batch transactional atomicity in triggers.",
    hint: "All rows in the batch are rolled back if the trigger fails on any row.",
    level: "expert"
  },
  {
    question: "Can a `DELETE` trigger prevent cascading foreign key deletions?",
    shortAnswer: "Triggers on child tables fire during `ON DELETE CASCADE` actions in MySQL 8.0, and raising a `SIGNAL` exception inside the trigger will abort the cascade.",
    explanation: "Foreign key cascade interaction with triggers.",
    hint: "Yes, raising a SIGNAL exception in the child trigger will abort the cascade.",
    level: "expert"
  },
  {
    question: "How do you enforce that a student's `admission_number` cannot be changed once created?",
    shortAnswer: "In a `BEFORE UPDATE` trigger: `IF OLD.admission_number != NEW.admission_number THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Admission number is immutable'; END IF;`.",
    explanation: "Immutable column enforcement with BEFORE UPDATE.",
    hint: "Raise SIGNAL if OLD.admission_number != NEW.admission_number.",
    level: "basic"
  },
  {
    question: "Can a trigger on `students` check course capacity in `courses` before inserting an enrollment?",
    shortAnswer: "YES; inside a `BEFORE INSERT` trigger, query `SELECT enrolled_count, max_capacity INTO v_curr, v_max FROM courses WHERE course_id = NEW.course_id;` and `SIGNAL` if full.",
    explanation: "Cross-table capacity validation in triggers.",
    hint: "Query course capacity and SIGNAL if enrolled_count >= max_capacity.",
    level: "moderate"
  },
  {
    question: "Why should bulk data loading jobs sometimes temporarily disable triggers?",
    shortAnswer: "Because executing row-level triggers for millions of rows adds massive CPU and lock overhead. Bulk ETL jobs often drop triggers and rebuild summary counts post-load.",
    explanation: "High-volume data migration optimization.",
    hint: "Dropping triggers during bulk loading speeds up ingestion significantly.",
    level: "expert"
  },
  {
    question: "Can you disable a trigger in MySQL without dropping it?",
    shortAnswer: "MySQL 8.0 does not support `ALTER TRIGGER ... DISABLE`; you must `DROP TRIGGER` to remove it or use a session flag variable to bypass logic conditionally.",
    explanation: "Trigger management capabilities in MySQL.",
    hint: "No native DISABLE command; must DROP TRIGGER or use session flags.",
    level: "expert"
  },
  {
    question: "How do you create a bypass flag in a trigger for admin bulk imports?",
    shortAnswer: "`IF @disable_triggers IS NULL OR @disable_triggers = FALSE THEN ... (execute trigger logic) ... END IF;`.",
    explanation: "Session variable trigger bypass pattern.",
    hint: "Wrap trigger logic with IF @disable_triggers IS NULL THEN ... END IF;.",
    level: "expert"
  },
  {
    question: "How does `LAST_INSERT_ID()` behave inside an `AFTER INSERT` trigger?",
    shortAnswer: "In an `AFTER INSERT` trigger, `NEW.primary_key_id` directly contains the newly generated auto-increment ID for that row.",
    explanation: "Accessing generated primary keys in AFTER INSERT.",
    hint: "Access the generated ID directly via NEW.primary_key_id.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Trigger Event Types in MySQL?",
    shortAnswer: "Use `INSERT` triggers for default code generation and capacity checks (accessing `NEW`), `UPDATE` triggers for change detection and state transitions (accessing `OLD` and `NEW`), `DELETE` triggers for archiving and cascade guards (accessing `OLD`), and remember that `TRUNCATE TABLE` bypasses all triggers.",
    explanation: "Authoritative architectural best practices for trigger event handling.",
    hint: "INSERT (NEW) for setup + UPDATE (OLD/NEW) for change audits + DELETE (OLD) for archiving + TRUNCATE bypass.",
    level: "expert"
  }
];

export default questions;
