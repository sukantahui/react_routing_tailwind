// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What are `NEW` and `OLD` in MySQL Database Triggers?",
    shortAnswer: "Virtual transition pseudo-records that represent the state of the affected row before (`OLD`) and during/after (`NEW`) the DML operation.",
    explanation: "Core pseudo-records for row transition state.",
    hint: "Virtual row images before (OLD) and after (NEW) DML.",
    level: "basic"
  },
  {
    question: "In which trigger events is `NEW` available?",
    shortAnswer: "`INSERT` and `UPDATE` triggers.",
    explanation: "Availability of NEW pseudo-record.",
    hint: "INSERT and UPDATE.",
    level: "basic"
  },
  {
    question: "In which trigger events is `OLD` available?",
    shortAnswer: "`UPDATE` and `DELETE` triggers.",
    explanation: "Availability of OLD pseudo-record.",
    hint: "UPDATE and DELETE.",
    level: "basic"
  },
  {
    question: "Can `OLD.column_name` be modified using `SET` in ANY trigger?",
    shortAnswer: "NO; `OLD` is strictly READ-ONLY across all events. Attempting `SET OLD.col = val` throws a syntax error.",
    explanation: "Immutability of the OLD pseudo-record.",
    hint: "No, OLD is strictly read-only in all triggers.",
    level: "basic"
  },
  {
    question: "In which specific trigger timings can `NEW.column_name` be modified using `SET`?",
    shortAnswer: "ONLY in `BEFORE INSERT` and `BEFORE UPDATE` triggers (`SET NEW.col = val;`).",
    explanation: "Writeable NEW record timings.",
    hint: "ONLY in BEFORE INSERT and BEFORE UPDATE triggers.",
    level: "basic"
  },
  {
    question: "How do student grade revisions for Mamata, Susmita, Abhronila, and Debangshu illustrate `OLD` vs `NEW`?",
    shortAnswer: "When Susmita's score updates from 82.0% to 88.0%, `OLD.exam_score_pct` holds 82.0% and `NEW.exam_score_pct` holds 88.0%, computing a delta of `+6.0%`.",
    explanation: "Delta score computation using OLD and NEW.",
    hint: "OLD has 82.0%, NEW has 88.0%, computing a +6.0% delta.",
    level: "basic"
  },
  {
    question: "What error occurs if you attempt to reference `OLD.column` inside an `INSERT` trigger?",
    shortAnswer: "`Error 1193 (HY000): Unknown system variable 'OLD'` or syntax error, because `OLD` does not exist on new row insertion.",
    explanation: "Invalid pseudo-record reference on INSERT.",
    hint: "Throws an error because OLD is undefined for INSERT events.",
    level: "basic"
  },
  {
    question: "What error occurs if you attempt to reference `NEW.column` inside a `DELETE` trigger?",
    shortAnswer: "`Error 1193 (HY000): Unknown system variable 'NEW'` or syntax error, because `NEW` does not exist on row deletion.",
    explanation: "Invalid pseudo-record reference on DELETE.",
    hint: "Throws an error because NEW is undefined for DELETE events.",
    level: "basic"
  },
  {
    question: "How do you calculate salary increase differentials inside an `AFTER UPDATE` trigger?",
    shortAnswer: "`SET v_increase = NEW.salary_inr - OLD.salary_inr;`.",
    explanation: "Mathematical delta calculation.",
    hint: "NEW.salary_inr - OLD.salary_inr.",
    level: "basic"
  },
  {
    question: "How do you construct a JSON audit snapshot containing before and after states using `NEW` and `OLD`?",
    shortAnswer: "`JSON_OBJECT('old_score', OLD.score, 'new_score', NEW.score, 'delta', (NEW.score - OLD.score))`.",
    explanation: "JSON delta audit snapshot.",
    hint: "Use JSON_OBJECT with OLD and NEW column values.",
    level: "moderate"
  },
  {
    question: "How do you enforce that a student's `created_at` timestamp cannot be altered in an `UPDATE` trigger?",
    shortAnswer: "`IF OLD.created_at != NEW.created_at THEN SET NEW.created_at = OLD.created_at; END IF;` (or raise `SIGNAL` error).",
    explanation: "Immutable column protection in BEFORE UPDATE.",
    hint: "Restore NEW.created_at = OLD.created_at in a BEFORE UPDATE trigger.",
    level: "basic"
  },
  {
    question: "What is the benefit of using `<=>` (NULL-safe equal) when comparing `OLD.col` and `NEW.col`?",
    shortAnswer: "If either `OLD.col` or `NEW.col` is `NULL`, standard `!=` evaluates to `NULL` (failing the `IF` test); `<=>` correctly detects changes to or from `NULL`.",
    explanation: "Three-valued logic defense in trigger change detection.",
    hint: "Properly detects transitions to or from NULL without failing on three-valued logic.",
    level: "expert"
  },
  {
    question: "Can `NEW` and `OLD` access generated columns (virtual or stored) in a trigger?",
    shortAnswer: "YES; `NEW.gen_col` and `OLD.gen_col` can be read, though virtual generated columns cannot be modified with `SET NEW.gen_col = val`.",
    explanation: "Generated column interaction with triggers.",
    hint: "Yes, generated columns can be read via NEW and OLD.",
    level: "moderate"
  },
  {
    question: "Can a `BEFORE UPDATE` trigger overwrite `NEW.email` with a sanitized lowercase string?",
    shortAnswer: "YES; `SET NEW.email = LOWER(TRIM(NEW.email));` sanitizes the email value before saving to disk.",
    explanation: "In-flight value transformation in BEFORE UPDATE.",
    hint: "Yes, SET NEW.email = LOWER(TRIM(NEW.email)) sanitizes the value.",
    level: "basic"
  },
  {
    question: "How do you prevent a student's `primary_key_id` from ever being updated?",
    shortAnswer: "In `BEFORE UPDATE`: `IF OLD.student_id != NEW.student_id THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Primary Key cannot be updated'; END IF;`.",
    explanation: "Primary key immutability guard.",
    hint: "Raise SIGNAL if OLD.student_id != NEW.student_id.",
    level: "basic"
  },
  {
    question: "Can `NEW` and `OLD` reference columns that were NOT included in the `UPDATE` statement's `SET` clause?",
    shortAnswer: "YES; `NEW` and `OLD` contain all table columns for that row, with unmodified columns retaining their original values in `NEW`.",
    explanation: "Complete row image availability in triggers.",
    hint: "Yes, all columns in the table are accessible via NEW and OLD.",
    level: "moderate"
  },
  {
    question: "What happens if you assign `SET NEW.score = 105.00` in a trigger when column constraint is `CHECK (score <= 100)`?",
    shortAnswer: "The subsequent check constraint validation or storage engine write fails, aborting the trigger and rolling back the statement.",
    explanation: "Constraint validation post-trigger mutation.",
    hint: "Constraint validation fails and rolls back the statement.",
    level: "expert"
  },
  {
    question: "How do you detect student status changes from 'ENROLLED' to 'ALUMNI' using `OLD` and `NEW`?",
    shortAnswer: "`IF OLD.status = 'ENROLLED' AND NEW.status = 'ALUMNI' THEN INSERT INTO alumni_registry (student_id) VALUES (NEW.student_id); END IF;`.",
    explanation: "State transition workflow trigger.",
    hint: "Check OLD.status = 'ENROLLED' AND NEW.status = 'ALUMNI'.",
    level: "basic"
  },
  {
    question: "Can `OLD` values be used to rollback foreign key dependencies before deletion?",
    shortAnswer: "YES; `BEFORE DELETE` triggers can inspect `OLD.student_id` to clean up child logs or verify zero outstanding debts.",
    explanation: "Pre-deletion dependency verification.",
    hint: "Yes, use OLD.student_id to inspect dependencies before deletion.",
    level: "basic"
  },
  {
    question: "What is the scope and lifetime of `NEW` and `OLD` pseudo-records?",
    shortAnswer: "Strictly limited to the single row iteration during the execution of that specific trigger; destroyed immediately when the trigger completes for that row.",
    explanation: "Row-level ephemeral lifecycle.",
    hint: "Scoped strictly to the current row execution cycle.",
    level: "basic"
  },
  {
    question: "How do you prevent decreasing an employee's salary in a `BEFORE UPDATE` trigger?",
    shortAnswer: "`IF NEW.salary_inr < OLD.salary_inr THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Salary reduction forbidden'; END IF;`.",
    explanation: "Unidirectional value enforcement.",
    hint: "Raise SIGNAL if NEW.salary < OLD.salary.",
    level: "basic"
  },
  {
    question: "Can `NEW.password_hash` be automatically hashed in a `BEFORE INSERT` trigger?",
    shortAnswer: "YES; `SET NEW.password_hash = SHA2(NEW.password_hash, 256);` hashes raw passwords before storage (though hashing in application layer is usually preferred).",
    explanation: "Data transformation and cryptographic hashing in triggers.",
    hint: "Yes, hash in BEFORE INSERT with SHA2(NEW.pass, 256).",
    level: "moderate"
  },
  {
    question: "How do you archive all original columns during an `AFTER DELETE` trigger?",
    shortAnswer: "`INSERT INTO student_archive SELECT OLD.id, OLD.name, OLD.dept, OLD.fee, NOW();`.",
    explanation: "Full row archiving from OLD.",
    hint: "Pass all OLD.column values to the archive table insert.",
    level: "basic"
  },
  {
    question: "Can `NEW` or `OLD` be passed as arguments to stored procedures called from inside a trigger?",
    shortAnswer: "YES; `CALL sp_log_change(OLD.student_id, OLD.score, NEW.score);` passes pseudo-record column values into procedures seamlessly.",
    explanation: "Passing pseudo-records to stored procedures.",
    hint: "Yes, pass OLD.col and NEW.col as parameters to procedures.",
    level: "basic"
  },
  {
    question: "What happens if a `BEFORE INSERT` trigger sets `SET NEW.auto_inc_id = 5000` on an auto-increment column?",
    shortAnswer: "MySQL accepts the explicit ID value, assigns 5000 to that row, and updates the table's auto-increment counter sequence to 5001.",
    explanation: "Explicit auto-increment override in BEFORE INSERT.",
    hint: "Explicitly sets the ID and advances the auto-increment sequence.",
    level: "expert"
  },
  {
    question: "Why is `OLD.column` read-only in `BEFORE DELETE` triggers?",
    shortAnswer: "Because the row is about to be deleted from disk; modifying pre-deletion values serves no physical storage purpose.",
    explanation: "Physical deletion semantics.",
    hint: "The row is being deleted, so modifying it in storage is meaningless.",
    level: "basic"
  },
  {
    question: "How do you record who modified a row by updating `NEW.modified_by_user`?",
    shortAnswer: "In a `BEFORE UPDATE` trigger: `SET NEW.modified_by_user = USER();`.",
    explanation: "Automatic user auditing on update.",
    hint: "SET NEW.modified_by_user = USER();",
    level: "basic"
  },
  {
    question: "Can `NEW` values be inspected in an `AFTER UPDATE` trigger to dispatch notification alerts?",
    shortAnswer: "YES; `IF NEW.fee_balance > 50000 THEN INSERT INTO fee_alert_queue (student_id) VALUES (NEW.student_id); END IF;`.",
    explanation: "Post-commit event queueing in AFTER triggers.",
    hint: "Yes, inspect NEW.fee_balance and enqueue notification alert.",
    level: "basic"
  },
  {
    question: "What is the performance overhead of referencing 20 columns on `OLD` and `NEW`?",
    shortAnswer: "Negligible; `OLD` and `NEW` pointers access in-memory row buffers inside the database engine without additional I/O disk queries.",
    explanation: "In-memory transition buffer performance.",
    hint: "Negligible overhead since NEW and OLD point to in-memory buffers.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Referencing Modified Data with NEW and OLD?",
    shortAnswer: "Use `NEW` in `BEFORE INSERT`/`UPDATE` to sanitize data and enforce constraints, use `OLD` and `NEW` in `UPDATE` triggers to detect state changes using `<=>`, use `OLD` in `DELETE` triggers for immutable historical archiving, and remember that `OLD` is always read-only while `NEW` is writeable only in `BEFORE` triggers.",
    explanation: "Authoritative architectural best practices for NEW and OLD pseudo-record usage.",
    hint: "NEW in BEFORE for sanitization + OLD/NEW in UPDATE for delta audit + OLD in DELETE for archive.",
    level: "expert"
  }
];

export default questions;
