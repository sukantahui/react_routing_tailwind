// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is a Database Trigger in MySQL?",
    shortAnswer: "A named server-side procedural program attached to a specific table that activates automatically when an `INSERT`, `UPDATE`, or `DELETE` DML event occurs on that table.",
    explanation: "Event-driven automated procedural program in MySQL.",
    hint: "Server-side program that fires automatically on table DML events.",
    level: "basic"
  },
  {
    question: "What are the two execution timing options for triggers in MySQL?",
    shortAnswer: "`BEFORE` (fires *prior* to writing the row into table storage) and `AFTER` (fires *subsequent* to committing the row into table storage).",
    explanation: "The two canonical trigger timing keywords.",
    hint: "BEFORE and AFTER.",
    level: "basic"
  },
  {
    question: "Can a `BEFORE` trigger modify incoming column values before they are written to disk?",
    shortAnswer: "YES; writing `SET NEW.column_name = value;` inside a `BEFORE INSERT` or `BEFORE UPDATE` trigger alters the data that will be stored in the table.",
    explanation: "Data modification capability in BEFORE triggers.",
    hint: "Yes, SET NEW.col = val can mutate incoming values in BEFORE triggers.",
    level: "basic"
  },
  {
    question: "Can an `AFTER` trigger modify incoming `NEW.column` values?",
    shortAnswer: "NO; in an `AFTER` trigger, the row is already written to storage and `NEW` is strictly read-only; attempting `SET NEW.col = val` throws a syntax error.",
    explanation: "Read-only constraint on AFTER triggers.",
    hint: "No, NEW is strictly read-only in AFTER triggers.",
    level: "basic"
  },
  {
    question: "How do student registration events for Mamata, Susmita, Abhronila, and Debangshu illustrate `BEFORE` vs `AFTER` triggers?",
    shortAnswer: "A `BEFORE INSERT` trigger sanitizes email addresses (`SET NEW.email = LOWER(TRIM(NEW.email))`); an `AFTER INSERT` trigger inserts an audit log row into `student_admission_audit_log` with the generated primary key.",
    explanation: "Sanitization in BEFORE vs audit logging in AFTER.",
    hint: "BEFORE for email lowercase sanitization + AFTER for audit logging.",
    level: "basic"
  },
  {
    question: "What trigger granularity clause is supported in MySQL 8.0?",
    shortAnswer: "`FOR EACH ROW` (MySQL strictly supports row-level triggers that execute once for every affected row).",
    explanation: "Row-level trigger granularity in MySQL.",
    hint: "FOR EACH ROW (row-level triggers).",
    level: "basic"
  },
  {
    question: "What happens if a trigger throws an exception via `SIGNAL SQLSTATE '45000'`?",
    shortAnswer: "The trigger execution aborts, and the entire outer DML statement (`INSERT`, `UPDATE`, or `DELETE`) is immediately cancelled and rolled back atomically.",
    explanation: "Transactional atomicity and error propagation in triggers.",
    hint: "The entire DML statement is aborted and rolled back.",
    level: "expert"
  },
  {
    question: "Can a trigger be created on a MySQL View?",
    shortAnswer: "NO; MySQL triggers can ONLY be created on permanent base tables, NOT on views or temporary tables.",
    explanation: "Table type restriction for database triggers.",
    hint: "No, triggers are only supported on permanent base tables.",
    level: "moderate"
  },
  {
    question: "Can a trigger be created on a Temporary Table (`CREATE TEMPORARY TABLE`)?",
    shortAnswer: "NO; MySQL strictly forbids creating triggers on temporary tables.",
    explanation: "Temporary table trigger restriction.",
    hint: "No, temporary tables cannot have triggers.",
    level: "moderate"
  },
  {
    question: "How many total trigger events and timings exist per table?",
    shortAnswer: "6 distinct trigger combinations: `BEFORE INSERT`, `AFTER INSERT`, `BEFORE UPDATE`, `AFTER UPDATE`, `BEFORE DELETE`, `AFTER DELETE`.",
    explanation: "The complete 2x3 trigger matrix.",
    hint: "6 combinations: BEFORE/AFTER x INSERT/UPDATE/DELETE.",
    level: "basic"
  },
  {
    question: "Can multiple triggers with the SAME timing and event exist on the same table in MySQL 8.0?",
    shortAnswer: "YES; MySQL 8.0 allows multiple triggers with the same timing/event on a table, using `PRECEDES` or `FOLLOWS` clauses to control execution order.",
    explanation: "Multiple trigger ordering in MySQL 8.0.",
    hint: "Yes, using PRECEDES or FOLLOWS to specify execution order.",
    level: "expert"
  },
  {
    question: "What is the primary use case for a `BEFORE INSERT` trigger?",
    shortAnswer: "Data sanitization (trimming whitespace, converting casing), setting default computed values, and validating business rules before storage.",
    explanation: "Core BEFORE INSERT architectural patterns.",
    hint: "Data sanitization, default formatting, and validation.",
    level: "basic"
  },
  {
    question: "What is the primary use case for an `AFTER INSERT` trigger?",
    shortAnswer: "Writing audit trail history records to a separate audit table, updating summary aggregate counters, and queueing notification messages.",
    explanation: "Core AFTER INSERT architectural patterns.",
    hint: "Audit trail logging, aggregate counters, and event notifications.",
    level: "basic"
  },
  {
    question: "Can a trigger execute explicit transaction statements like `START TRANSACTION`, `COMMIT`, or `ROLLBACK`?",
    shortAnswer: "NO; triggers cannot manage explicit transactions (Error 1422); they automatically inherit and execute within the outer statement's transaction.",
    explanation: "Transaction boundary inheritance in triggers.",
    hint: "No, triggers inherit the outer transaction and cannot call COMMIT/ROLLBACK.",
    level: "expert"
  },
  {
    question: "How do you abort an invalid student payment with a negative amount inside a `BEFORE INSERT` trigger?",
    shortAnswer: "`IF NEW.amount_paid_inr <= 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid payment amount'; END IF;`",
    explanation: "Defensive business rule enforcement with SIGNAL.",
    hint: "Use IF NEW.amount <= 0 THEN SIGNAL SQLSTATE '45000' ... END IF;",
    level: "basic"
  },
  {
    question: "What privilege is required to create a trigger on a table in MySQL?",
    shortAnswer: "The `TRIGGER` privilege on that table or database.",
    explanation: "Trigger administrative privilege.",
    hint: "The TRIGGER privilege.",
    level: "basic"
  },
  {
    question: "How do you view all triggers defined on tables in the current database?",
    shortAnswer: "`SHOW TRIGGERS;` (or query `information_schema.TRIGGERS`).",
    explanation: "Trigger metadata inspection command.",
    hint: "SHOW TRIGGERS; or query information_schema.TRIGGERS.",
    level: "basic"
  },
  {
    question: "How do you view the full DDL creation statement of a specific trigger named `trg_audit_fees`?",
    shortAnswer: "`SHOW CREATE TRIGGER trg_audit_fees;`.",
    explanation: "DDL inspection for database triggers.",
    hint: "SHOW CREATE TRIGGER trg_audit_fees;",
    level: "basic"
  },
  {
    question: "How do you drop an existing trigger in MySQL?",
    shortAnswer: "`DROP TRIGGER IF EXISTS trigger_name;`.",
    explanation: "Idempotent trigger dropping syntax.",
    hint: "DROP TRIGGER IF EXISTS trigger_name;",
    level: "basic"
  },
  {
    question: "What happens to triggers when the underlying table is dropped (`DROP TABLE students;`)?",
    shortAnswer: "All triggers associated with that table are automatically dropped and removed from the data dictionary.",
    explanation: "Cascading trigger removal upon table destruction.",
    hint: "All associated triggers are automatically deleted with the table.",
    level: "basic"
  },
  {
    question: "Can a trigger on Table A execute an `UPDATE` on Table B?",
    shortAnswer: "YES; triggers frequently update related tables (e.g. updating department student counts when a new student is inserted).",
    explanation: "Cross-table DML inside triggers.",
    hint: "Yes, triggers can modify other tables in the database.",
    level: "basic"
  },
  {
    question: "Can a trigger on Table A execute an `UPDATE` on Table A itself (the same table)?",
    shortAnswer: "NO; in an `AFTER` trigger, updating the same table throws Error 1442 (table lock recursion). In a `BEFORE` trigger, use `SET NEW.col = val` instead of an `UPDATE` query!",
    explanation: "Table mutating recursion error prevention.",
    hint: "No, throws Error 1442; in BEFORE triggers use SET NEW.col = val instead.",
    level: "expert"
  },
  {
    question: "Can a trigger invoke a Stored Procedure using `CALL`?",
    shortAnswer: "YES; triggers can execute `CALL procedure_name(args)`, provided the procedure does not execute `COMMIT` or `ROLLBACK` statements.",
    explanation: "Procedure invocation from database triggers.",
    hint: "Yes, provided the procedure does not contain transaction controls.",
    level: "moderate"
  },
  {
    question: "What is Trigger Cascading (Recursive Triggers)?",
    shortAnswer: "When Trigger A on Table 1 modifies Table 2, which fires Trigger B on Table 2, which in turn modifies Table 3. MySQL enforces a maximum recursion depth of 32 cascading levels.",
    explanation: "Trigger cascading depth limits.",
    hint: "Chain reaction of triggers firing each other up to max 32 depth levels.",
    level: "expert"
  },
  {
    question: "What is the performance overhead of having multiple row-level triggers on a high-throughput OLTP table?",
    shortAnswer: "Each trigger executes for every single row modified, adding CPU latency to every `INSERT`, `UPDATE`, or `DELETE` statement. Triggers should be kept lightweight.",
    explanation: "OLTP write amplification and latency.",
    hint: "Adds CPU overhead per row; keep trigger logic fast and lightweight.",
    level: "expert"
  },
  {
    question: "How do you capture the database user and timestamp who triggered the DML event inside an audit trigger?",
    shortAnswer: "Using built-in functions: `USER()` (or `CURRENT_USER()`) and `NOW()` inside the `INSERT INTO audit_log` statement.",
    explanation: "Audit metadata capture in triggers.",
    hint: "Use USER() and NOW() in the audit insert.",
    level: "basic"
  },
  {
    question: "Can a `BEFORE DELETE` trigger inspect the deleted row's data?",
    shortAnswer: "YES; using the `OLD.column_name` pseudo-record to access pre-deletion values.",
    explanation: "OLD record access in delete triggers.",
    hint: "Yes, access deleted column values using OLD.column_name.",
    level: "basic"
  },
  {
    question: "Why should developers avoid putting external HTTP calls or heavy loops inside database triggers?",
    shortAnswer: "Because triggers execute synchronously within the database transaction; slow operations hold table/row locks, stalling all concurrent database transactions.",
    explanation: "Transaction concurrency and lock contention risks.",
    hint: "Holds row locks synchronously, blocking concurrent users.",
    level: "expert"
  },
  {
    question: "How does `DELIMITER //` interact with trigger creation scripts?",
    shortAnswer: "Because trigger bodies (`BEGIN ... END`) contain multiple internal semicolons, `DELIMITER //` is required to wrap the DDL script and prevent premature parsing.",
    explanation: "Delimiter lifecycle in trigger definitions.",
    hint: "Required to buffer internal semicolons within the trigger BEGIN ... END block.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Database Triggers and Execution Timing?",
    shortAnswer: "Use `BEFORE` triggers for data sanitization (`SET NEW.col`) and defensive constraint validation (`SIGNAL`), use `AFTER` triggers for non-blocking audit logging and replica counter updates, keep trigger logic ultra-lightweight, and remember that triggers execute atomically within the outer DML transaction.",
    explanation: "Authoritative architectural best practices for database triggers.",
    hint: "BEFORE for sanitization/validation + AFTER for audit logs + lightweight logic + atomic transaction.",
    level: "expert"
  }
];

export default questions;
