// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What are the four most common real-world enterprise use cases for Database Triggers?",
    shortAnswer: "1. Automated immutable audit trail logging, 2. Complex cross-table constraint validation, 3. Real-time denormalized summary counter synchronization, and 4. In-flight data sanitization & soft-delete interception.",
    explanation: "The four classic trigger architectural patterns.",
    hint: "Audit logging, cross-table validation, summary counter sync, and data sanitization.",
    level: "basic"
  },
  {
    question: "Why are Database Triggers preferred over application-level code for financial audit logging?",
    shortAnswer: "Because triggers execute directly inside the database engine, guaranteeing that audit records are created even if changes are made via direct SQL scripts, CLI tools, migration scripts, or different microservices.",
    explanation: "Audit bypass prevention via database-level enforcement.",
    hint: "Guarantees audit logging regardless of which client, script, or service modifies the table.",
    level: "basic"
  },
  {
    question: "How do student operations for Mamata, Susmita, Abhronila, and Debangshu illustrate automated audit logging?",
    shortAnswer: "When Abhronila's scholarship discount is updated from ₹0 to ₹4,000, an `AFTER UPDATE` trigger automatically captures `OLD.discount = 0`, `NEW.discount = 4000`, `USER() = 'accounts_admin'`, and `NOW()` into `scholarship_audit_log`.",
    explanation: "Complete state diff auditing.",
    hint: "Captures OLD, NEW, USER(), and NOW() into an immutable audit table.",
    level: "basic"
  },
  {
    question: "How do you enforce maximum course seat capacity (e.g. max 30 students per lab) using a `BEFORE INSERT` trigger?",
    shortAnswer: "Query `SELECT COUNT(*) INTO v_count FROM enrollments WHERE course_id = NEW.course_id;` and if `v_count >= 30`, raise `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Course capacity exceeded';`.",
    explanation: "Cross-table business rule validation with SIGNAL.",
    hint: "Count existing enrollments and SIGNAL error if count >= capacity.",
    level: "basic"
  },
  {
    question: "What is the advantage of maintaining a denormalized `total_students` counter on the `departments` table using triggers?",
    shortAnswer: "It allows queries to fetch student counts instantly ($O(1)$) by reading the column directly, eliminating the need to run slow, expensive `COUNT(*)` aggregations across millions of rows ($O(N)$).",
    explanation: "Performance optimization via denormalized trigger counters.",
    hint: "Provides O(1) instant count reads, avoiding expensive COUNT(*) table scans.",
    level: "expert"
  },
  {
    question: "How do you implement a Soft-Delete pattern using a `BEFORE DELETE` trigger?",
    shortAnswer: "`BEFORE DELETE` triggers cannot convert a DELETE into an UPDATE directly; instead, set `SIGNAL` to block physical deletion, or use an `INSTEAD OF` view pattern (or application-level `UPDATE table SET is_deleted = TRUE`).",
    explanation: "Soft delete architecture and trigger constraints.",
    hint: "Block physical deletion via SIGNAL, directing users to set is_deleted = TRUE.",
    level: "expert"
  },
  {
    question: "Can an `AFTER INSERT` trigger on `fee_payments` automatically update the student's ledger `outstanding_balance`?",
    shortAnswer: "YES; `UPDATE student_ledger SET outstanding_balance = outstanding_balance - NEW.amount_paid_inr WHERE student_id = NEW.student_id;`.",
    explanation: "Real-time ledger balance synchronization.",
    hint: "UPDATE student_ledger SET balance = balance - NEW.amount WHERE student_id = NEW.student_id;",
    level: "basic"
  },
  {
    question: "Why should audit log tables NEVER have `UPDATE` or `DELETE` triggers attached to them?",
    shortAnswer: "To guarantee immutability; audit trail records should strictly be append-only with all modification permissions revoked from regular database users.",
    explanation: "Immutable audit trail security best practice.",
    hint: "Audit tables must be strictly append-only to preserve legal integrity.",
    level: "expert"
  },
  {
    question: "How do you validate that an Indian PAN number follows the standard regex pattern (`[A-Z]{5}[0-9]{4}[A-Z]{1}`) in a `BEFORE INSERT` trigger?",
    shortAnswer: "`IF NOT (NEW.pan_number REGEXP '^[A-Z]{5}[0-9]{4}[A-Z]{1}$') THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid PAN format'; END IF;`.",
    explanation: "Regex validation inside database triggers.",
    hint: "Use REGEXP matching in IF condition and SIGNAL on mismatch.",
    level: "moderate"
  },
  {
    question: "What information should an ideal enterprise audit trail table contain?",
    shortAnswer: "`audit_id`, `table_name`, `record_id`, `action_type` ('INSERT'/'UPDATE'/'DELETE'), `old_values_json`, `new_values_json`, `performed_by_user`, `client_ip`, and `logged_timestamp`.",
    explanation: "Standard enterprise audit table schema.",
    hint: "Table name, record ID, action type, old/new JSON, user, IP, and timestamp.",
    level: "basic"
  },
  {
    question: "How do you prevent a student's graduation date from being set in the past relative to their admission date?",
    shortAnswer: "In `BEFORE UPDATE`: `IF NEW.graduation_date < OLD.admission_date THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Graduation date cannot precede admission date'; END IF;`.",
    explanation: "Temporal coherence validation in triggers.",
    hint: "SIGNAL error if NEW.graduation_date < OLD.admission_date.",
    level: "basic"
  },
  {
    question: "Can triggers automatically dispatch email or SMS notifications directly from MySQL?",
    shortAnswer: "MySQL does not have built-in email functions; instead, triggers insert an event row into a `notification_queue` table which a background Node.js/Python daemon processes asynchronously.",
    explanation: "Asynchronous notification queue pattern.",
    hint: "Triggers insert into an event queue table processed by an async worker daemon.",
    level: "expert"
  },
  {
    question: "Why is inserting into an asynchronous queue table better than attempting external HTTP calls inside a trigger?",
    shortAnswer: "Because external HTTP calls introduce massive network latency, timeout risks, and lock contention that could stall active database transactions.",
    explanation: "Transaction isolation and latency minimization.",
    hint: "Avoids network latency and timeout crashes inside database transactions.",
    level: "expert"
  },
  {
    question: "How do you implement multi-table cascade balance checks in a `BEFORE DELETE` trigger on `students`?",
    shortAnswer: "Check `IF (SELECT balance FROM student_ledger WHERE student_id = OLD.student_id) > 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete student with unpaid balance'; END IF;`.",
    explanation: "Cross-table dependency verification before deletion.",
    hint: "Verify ledger balance is zero before allowing student deletion.",
    level: "basic"
  },
  {
    question: "How do you automatically assign consecutive, formatted registration codes (e.g. `BKP-2026-0001`) in a `BEFORE INSERT` trigger?",
    shortAnswer: "`SET NEW.reg_code = CONCAT('BKP-', YEAR(NOW()), '-', LPAD((SELECT IFNULL(MAX(id), 0) + 1 FROM students), 4, '0'));` (or use auto-increment ID in AFTER trigger).",
    explanation: "Formatted identifier generation in triggers.",
    hint: "Format custom code using YEAR() and padded counter sequence.",
    level: "moderate"
  },
  {
    question: "What happens if an audit log table runs out of disk space during an `AFTER INSERT` trigger execution?",
    shortAnswer: "The audit insert fails, causing the entire outer student registration `INSERT` to abort and rollback, preserving the invariant that untracked changes cannot occur.",
    explanation: "Transactional integrity under disk exhaustion.",
    hint: "The entire outer transaction rolls back to prevent untracked data changes.",
    level: "expert"
  },
  {
    question: "Can triggers be used to synchronize data across two different database schemas on the same MySQL instance?",
    shortAnswer: "YES; triggers can execute `INSERT INTO reporting_db.student_sync VALUES (NEW.id, ...)` across local databases.",
    explanation: "Cross-database trigger synchronization.",
    hint: "Yes, triggers can reference other databases using db_name.table_name.",
    level: "basic"
  },
  {
    question: "How do you detect and log when a student's mobile number changes in an `AFTER UPDATE` trigger?",
    shortAnswer: "`IF NOT (OLD.phone <=> NEW.phone) THEN INSERT INTO phone_history (student_id, old_phone, new_phone, changed_at) VALUES (NEW.student_id, OLD.phone, NEW.phone, NOW()); END IF;`.",
    explanation: "Specific field change tracking pattern.",
    hint: "Compare OLD.phone <=> NEW.phone and log changes to history table.",
    level: "basic"
  },
  {
    question: "What is the 'Shadow Table' pattern in database auditing?",
    shortAnswer: "Creating a mirror `students_shadow` table with identical columns plus audit metadata (`audit_id`, `audit_action`, `audit_timestamp`) where every trigger event copies the full row image.",
    explanation: "Shadow table auditing pattern.",
    hint: "A mirror table that copies full row images on every trigger event.",
    level: "expert"
  },
  {
    question: "How does a `BEFORE INSERT` trigger sanitize and format 10-digit Indian mobile numbers (+91)?",
    shortAnswer: "`SET NEW.phone = CONCAT('+91 ', RIGHT(REGEXP_REPLACE(NEW.phone, '[^0-9]', ''), 10));`.",
    explanation: "String sanitization with regex in triggers.",
    hint: "Strip non-digits and prepend +91 country code.",
    level: "moderate"
  },
  {
    question: "Can a trigger prevent administrative users (`root`) from modifying financial records on closed fiscal years?",
    shortAnswer: "YES; `IF (SELECT is_closed FROM fiscal_years WHERE year = YEAR(NEW.payment_date)) = TRUE THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Fiscal year is closed to all edits'; END IF;`.",
    explanation: "Fiscal compliance guardrails.",
    hint: "Check fiscal year status and raise SIGNAL if closed.",
    level: "expert"
  },
  {
    question: "How do you record the client IP address in an audit trigger?",
    shortAnswer: "MySQL does not have a native `CLIENT_IP()` function in standard SQL triggers, but you can capture connection ID (`CONNECTION_ID()`) or pass IP via session variables (`@client_ip`).",
    explanation: "Client IP capture in MySQL audit logs.",
    hint: "Use CONNECTION_ID() or session variable @client_ip.",
    level: "moderate"
  },
  {
    question: "What is the CPU impact of maintaining 5 denormalized summary counters across triggers on high-volume tables?",
    shortAnswer: "Every `INSERT` and `DELETE` executes 5 additional row updates and lock acquisitions, creating potential write lock contention on summary counter rows.",
    explanation: "Counter contention and write lock bottlenecks.",
    hint: "Adds write lock contention on summary counter rows; keep counter triggers focused.",
    level: "expert"
  },
  {
    question: "How do you avoid write lock contention on global summary counters in high-concurrency systems?",
    shortAnswer: "Use counter sharding, batch aggregate crons, or background event scheduler reconciliations rather than updating a single global counter row on every single transaction.",
    explanation: "High-concurrency counter design patterns.",
    hint: "Use batch reconciliations or sharded counters instead of hot single-row locks.",
    level: "expert"
  },
  {
    question: "Can triggers validate that an uploaded student profile picture filename ends with a valid image extension (`.jpg`, `.png`)?",
    shortAnswer: "YES; `IF NOT (LOWER(NEW.avatar_url) REGEXP '\\.(jpg|jpeg|png|webp)$') THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid avatar format'; END IF;`.",
    explanation: "File extension validation via regex in triggers.",
    hint: "Use REGEXP matching on filename extensions.",
    level: "basic"
  },
  {
    question: "How do you log bulk updates when an UPDATE modifies 100 rows?",
    shortAnswer: "Because MySQL triggers are `FOR EACH ROW`, the trigger executes 100 times, inserting 100 individual audit records into the audit table.",
    explanation: "Row-level iteration in bulk DML auditing.",
    hint: "Fires 100 times, creating 100 individual audit records.",
    level: "basic"
  },
  {
    question: "Why should developers avoid putting complex business logic in triggers if that logic is already in application domain services?",
    shortAnswer: "To prevent 'Hidden Magic' bugs where database triggers execute side-effects that developers cannot see in the application codebase, complicating debugging and testing.",
    explanation: "Architectural separation of concerns.",
    hint: "Avoid hidden database side-effects that confuse application developers.",
    level: "expert"
  },
  {
    question: "How do you write unit tests for MySQL triggers?",
    shortAnswer: "Using database testing frameworks (like `db-migrate`, `Flyway test`, or custom Jest/Pytest scripts) that execute DML statements and assert expected audit records and constraint signals.",
    explanation: "Automated trigger testing strategies.",
    hint: "Execute test DML statements and assert audit table records and SIGNAL exceptions.",
    level: "moderate"
  },
  {
    question: "What is the difference between Database Triggers and Application Middleware for audit logging?",
    shortAnswer: "Application middleware logs only HTTP requests passing through that specific web server; Database Triggers catch ALL modifications regardless of source (CLI, ETL scripts, direct SQL, different apps).",
    explanation: "Scope and reliability comparison between middleware and triggers.",
    hint: "Triggers catch all database changes regardless of entry point.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Real-World Trigger Use Cases?",
    shortAnswer: "Use triggers for essential data layer invariant defenses (immutable audit logging, cross-table constraint enforcement with `SIGNAL`, in-flight sanitization, and summary counter sync), keep trigger logic lightning-fast and non-blocking, and never perform external synchronous network calls inside database triggers.",
    explanation: "Authoritative architectural best practices for production trigger implementations.",
    hint: "Immutable audit logs + constraint enforcement via SIGNAL + sanitization + non-blocking logic.",
    level: "expert"
  }
];

export default questions;
