// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is Graceful Failure in database stored procedures?",
    shortAnswer: "The design pattern where runtime errors are caught, open transactions are cleanly rolled back, diagnostic logs are recorded, and structured error status codes are returned to the caller without crashing.",
    explanation: "Core concept of defensive database design.",
    hint: "Intercepting errors, rolling back transactions, logging details, and returning status codes.",
    level: "basic"
  },
  {
    question: "Why MUST `ROLLBACK;` be executed BEFORE inserting into the error log table inside an `EXIT HANDLER`?",
    shortAnswer: "If you insert into the error log table before `ROLLBACK;`, the subsequent rollback will erase the newly inserted error log record from the database!",
    explanation: "Critical execution sequence inside error handlers.",
    hint: "ROLLBACK first, otherwise the rollback will erase the error log entry itself.",
    level: "expert"
  },
  {
    question: "What statement extracts detailed error metadata inside an exception handler in MySQL 8.0?",
    shortAnswer: "`GET DIAGNOSTICS CONDITION 1 @state = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @msg = MESSAGE_TEXT;`.",
    explanation: "Standard diagnostics extraction syntax.",
    hint: "GET DIAGNOSTICS CONDITION 1 ...",
    level: "basic"
  },
  {
    question: "How do student enrollment procedures for Mamata, Susmita, Abhronila, and Debangshu illustrate graceful failure and rollback?",
    shortAnswer: "When deducting Mamata's tuition fee (₹25,000) and generating her receipt, if receipt generation fails, the procedure rolls back the ₹25,000 deduction, logs the failure, and returns status `'ERR_RECEIPT_FAILED'`.",
    explanation: "Concrete banking/tuition ledger consistency.",
    hint: "Rolls back fee deduction if receipt creation fails, keeping student ledger balanced.",
    level: "basic"
  },
  {
    question: "What essential columns should a production `procedure_error_audit_log` table contain?",
    shortAnswer: "`log_id`, `procedure_name`, `sqlstate_code`, `mysql_errno`, `error_message`, `context_params` (JSON), `executed_by`, `logged_at`.",
    explanation: "Industrial schema design for error telemetry tables.",
    hint: "Procedure name, SQLSTATE, error number, message, JSON context, user, timestamp.",
    level: "expert"
  },
  {
    question: "Can an `EXIT HANDLER` store the input parameter values in the error log table for debugging?",
    shortAnswer: "YES; by packaging input parameters into a JSON object using `JSON_OBJECT('student_id', p_id, 'amount', p_amt)` and inserting it into the log.",
    explanation: "Rich error context persistence with JSON.",
    hint: "Yes, use JSON_OBJECT() to capture input arguments into the log table.",
    level: "basic"
  },
  {
    question: "What happens if an unhandled error occurs during a multi-statement transaction in a procedure without handlers?",
    shortAnswer: "The transaction remains uncommitted and active, holding row and table locks indefinitely until the client connection disconnects or times out.",
    explanation: "The dangers of transaction leakage.",
    hint: "Transaction stays open, holding locks and causing database deadlocks.",
    level: "expert"
  },
  {
    question: "How do you return structured status codes from a stored procedure to Node.js/Java applications?",
    shortAnswer: "Via `OUT` parameters (e.g. `OUT p_status VARCHAR(20), OUT p_err_msg VARCHAR(255)`) or by executing a final `SELECT p_status AS status, ...;` statement.",
    explanation: "Application-to-database contract design.",
    hint: "Use OUT parameters or return a status result set via SELECT.",
    level: "basic"
  },
  {
    question: "What is an Autonomous Transaction, and how do developers emulate it for error logging in MySQL?",
    shortAnswer: "An autonomous transaction commits independently of the outer transaction; in MySQL, developers emulate it by executing `ROLLBACK;` first, then inserting the error log.",
    explanation: "Autonomous transaction emulation in MySQL.",
    hint: "Emulated by rolling back the business transaction before inserting the error log entry.",
    level: "expert"
  },
  {
    question: "Can `GET DIAGNOSTICS` be executed before `ROLLBACK;` inside the handler?",
    shortAnswer: "YES; extracting diagnostics into local variables before executing `ROLLBACK;` ensures error details are captured accurately before transaction cleanup.",
    explanation: "Diagnostics extraction lifecycle.",
    hint: "Yes, capture diagnostics into local variables first, then execute ROLLBACK.",
    level: "expert"
  },
  {
    question: "What is the danger of returning generic 'Error Occurred' strings without specific error codes?",
    shortAnswer: "Client applications cannot determine whether the failure was a transient deadlock (retryable) or a permanent duplicate key (validation error).",
    explanation: "Granular error communication across tiers.",
    hint: "Clients cannot distinguish retryable errors from permanent validation bugs.",
    level: "basic"
  },
  {
    question: "How do you implement a standardized HTTP-like response code pattern in stored procedures?",
    shortAnswer: "Return integer status codes like `200` (Success), `400` (Validation Error), `404` (Not Found), `409` (Conflict/Duplicate), `500` (Internal Database Error).",
    explanation: "REST-like status code conventions in database routines.",
    hint: "Use standard response codes: 200, 400, 404, 409, 500.",
    level: "moderate"
  },
  {
    question: "What happens if the `INSERT` statement into the `procedure_error_audit_log` itself fails?",
    shortAnswer: "MySQL raises a secondary exception; to guard against this, wrap the logging insert in an inner `BEGIN ... DECLARE CONTINUE HANDLER ... END` block.",
    explanation: "Defensive logging against secondary failures.",
    hint: "Wrap the logging statement in an inner block with a CONTINUE handler.",
    level: "expert"
  },
  {
    question: "Can an `EXIT HANDLER` re-raise the error after logging to notify the database driver?",
    shortAnswer: "YES; executing `RESIGNAL;` at the end of the handler logs the error to the database table AND throws the exception back to the client.",
    explanation: "Log-and-rethrow pattern with RESIGNAL.",
    hint: "Use RESIGNAL; at the end of the handler body.",
    level: "basic"
  },
  {
    question: "How do you verify whether a transaction committed or rolled back in MySQL Workbench?",
    shortAnswer: "Check the procedure's return status code, inspect the `procedure_error_audit_log` table, or query `information_schema.innodb_trx` during execution.",
    explanation: "Verification tools in MySQL Workbench.",
    hint: "Check return status, inspect the audit log table, or query innodb_trx.",
    level: "basic"
  },
  {
    question: "What is the recommended structure for an enterprise data mutation stored procedure?",
    shortAnswer: "1. Declarations (variables, handlers) -> 2. `START TRANSACTION;` -> 3. Validation & DML operations -> 4. `COMMIT;` -> 5. Set success status code.",
    explanation: "Standard enterprise stored procedure architecture.",
    hint: "Declarations -> START TRANSACTION -> DML -> COMMIT -> Return Success.",
    level: "basic"
  },
  {
    question: "Can an error handler send an email alert directly from MySQL?",
    shortAnswer: "MySQL does not have built-in SMTP email; the handler inserts a record into an `email_alert_queue` table, which a background daemon picks up.",
    explanation: "Asynchronous alerting queue pattern.",
    hint: "Insert an alert into a queue table for external worker processing.",
    level: "moderate"
  },
  {
    question: "Does `ROLLBACK;` release row locks acquired during the transaction?",
    shortAnswer: "YES; executing `ROLLBACK;` immediately releases all exclusive (X) and shared (S) row and table locks held by the transaction.",
    explanation: "Lock release mechanics on transaction rollback.",
    hint: "Yes, ROLLBACK releases all held locks immediately.",
    level: "basic"
  },
  {
    question: "How do you log the exact database user who executed the failing procedure?",
    shortAnswer: "Use the `USER()` or `CURRENT_USER()` built-in function in the log insert: `INSERT INTO log (user_name) VALUES (CURRENT_USER());`.",
    explanation: "Auditing user identity in error logs.",
    hint: "Use USER() or CURRENT_USER().",
    level: "basic"
  },
  {
    question: "What built-in function returns the connection thread ID for error tracing?",
    shortAnswer: "`CONNECTION_ID()`.",
    explanation: "Database thread auditing.",
    hint: "CONNECTION_ID().",
    level: "moderate"
  },
  {
    question: "Why should `START TRANSACTION;` be placed AFTER variable declarations, not before?",
    shortAnswer: "All `DECLARE` statements in MySQL MUST be the very first statements in a `BEGIN ... END` block; placing `START TRANSACTION` before `DECLARE` causes a syntax error.",
    explanation: "Grammar requirement in MySQL procedural blocks.",
    hint: "DECLARE statements must precede all executable statements including START TRANSACTION.",
    level: "basic"
  },
  {
    question: "Can a procedure have partial rollbacks using `SAVEPOINT`?",
    shortAnswer: "YES; you can set `SAVEPOINT sp1;` and execute `ROLLBACK TO SAVEPOINT sp1;` to undo only a specific sub-operation without cancelling the entire transaction.",
    explanation: "Partial rollback with SAVEPOINT.",
    hint: "Yes, use SAVEPOINT and ROLLBACK TO SAVEPOINT.",
    level: "expert"
  },
  {
    question: "How do you clean up temporary tables created during a procedure that encounters an `EXIT HANDLER`?",
    shortAnswer: "Include `DROP TEMPORARY TABLE IF EXISTS temp_table_name;` inside the `EXIT HANDLER` body alongside `ROLLBACK;`.",
    explanation: "Resource cleanup in exit handlers.",
    hint: "Place DROP TEMPORARY TABLE IF EXISTS inside the handler body.",
    level: "basic"
  },
  {
    question: "What happens if a client disconnects while a stored procedure is in the middle of executing a transaction?",
    shortAnswer: "MySQL automatically detects the closed socket connection and triggers an implicit `ROLLBACK` for any uncommitted transaction.",
    explanation: "Connection termination rollback safety.",
    hint: "MySQL automatically rolls back uncommitted transactions on disconnect.",
    level: "expert"
  },
  {
    question: "How do you prevent procedure error log tables from growing indefinitely?",
    shortAnswer: "Create a scheduled MySQL Event (`sp_purge_old_error_logs`) that deletes log entries older than 30 or 90 days on a nightly cron.",
    explanation: "Automated log table retention policies.",
    hint: "Use a scheduled MySQL Event to purge records older than 30/90 days.",
    level: "expert"
  },
  {
    question: "Can error logging be disabled in non-production development environments?",
    shortAnswer: "YES; by checking a global configuration flag or setting table before executing the insert (`IF v_logging_enabled THEN ... END IF;`).",
    explanation: "Configurable telemetry in stored routines.",
    hint: "Check a configuration flag before executing the log insert.",
    level: "basic"
  },
  {
    question: "What is the return status code for a deadlock serialization error in standard API design?",
    shortAnswer: "`409` (Conflict) or custom code `'ERR_DEADLOCK_40001'`, signalling that the client should retry the request.",
    explanation: "Deadlock API response design.",
    hint: "409 Conflict or custom deadlock code for client retry.",
    level: "moderate"
  },
  {
    question: "How does structured error logging assist Site Reliability Engineers (SREs)?",
    shortAnswer: "It allows SREs to monitor error frequency, track sudden spikes in specific error codes (e.g. 1062, 1213), and pinpoint database bottlenecks in real time.",
    explanation: "Observability and telemetry value in production.",
    hint: "Enables real-time error rate tracking and rapid bottleneck diagnosis.",
    level: "basic"
  },
  {
    question: "Can you log the execution duration of a failing procedure?",
    shortAnswer: "YES; capture `SET v_start = NOW(6);` at procedure entry and log `TIMESTAMPDIFF(MICROSECOND, v_start, NOW(6))` inside the handler.",
    explanation: "Microsecond execution duration logging.",
    hint: "Capture NOW(6) at start and compute TIMESTAMPDIFF inside handler.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Graceful Failure and Error Logging?",
    shortAnswer: "Never permit unprotected DML transactions; always enclose multi-statement mutations within `START TRANSACTION ... COMMIT;`; intercept all errors with `DECLARE EXIT HANDLER FOR SQLEXCEPTION`; execute `ROLLBACK;` unconditionally; capture diagnostics via `GET DIAGNOSTICS`; persist telemetry to a dedicated audit log; and return explicit, standardized response codes.",
    explanation: "Authoritative architectural best practices for enterprise transaction resilience.",
    hint: "START TRANSACTION + EXIT HANDLER + ROLLBACK + GET DIAGNOSTICS + Audit Log + Clean Response.",
    level: "expert"
  }
];

export default questions;
