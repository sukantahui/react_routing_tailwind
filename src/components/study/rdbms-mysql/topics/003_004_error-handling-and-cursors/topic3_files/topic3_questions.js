// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What does the `SQLEXCEPTION` condition keyword catch in MySQL stored routines?",
    shortAnswer: "Any fatal SQL error condition where SQLSTATE does NOT begin with '00' (success), '01' (warning), or '02' (not found).",
    explanation: "Standard catch-all for database errors.",
    hint: "All fatal SQL errors (non-success, non-warning, non-not-found).",
    level: "basic"
  },
  {
    question: "What does the `SQLWARNING` condition keyword catch in MySQL stored routines?",
    shortAnswer: "Any warning condition where SQLSTATE begins with `'01'` (e.g. string data right truncation, NULL eliminated in aggregate).",
    explanation: "Standard catch-all for database warnings.",
    hint: "All warning conditions (SQLSTATE Class '01').",
    level: "basic"
  },
  {
    question: "What does the `NOT FOUND` condition keyword catch in MySQL stored routines?",
    shortAnswer: "Any condition where SQLSTATE begins with `'02'` (e.g. cursor FETCH when no more rows exist, or SELECT INTO finding 0 rows).",
    explanation: "Standard catch-all for data absence.",
    hint: "No data / cursor end-of-data (SQLSTATE Class '02').",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `SQLEXCEPTION`, `SQLWARNING`, and `NOT FOUND`?",
    shortAnswer: "When inserting duplicate Mamata (ID 101), `SQLEXCEPTION` triggers; when inserting an oversized address for Susmita, `SQLWARNING` triggers; when fetching past Debangshu's last record in a cursor, `NOT FOUND` triggers.",
    explanation: "Practical application across the three condition categories.",
    hint: "SQLEXCEPTION for duplicate Mamata; SQLWARNING for oversized Susmita address; NOT FOUND for cursor end.",
    level: "basic"
  },
  {
    question: "What is the handler resolution precedence when both `1062` and `SQLEXCEPTION` handlers are declared?",
    shortAnswer: "The specific `1062` handler executes for duplicate key errors; other fatal errors fall back to the generic `SQLEXCEPTION` handler.",
    explanation: "Handler resolution precedence hierarchy.",
    hint: "Specific error number handler runs first; SQLEXCEPTION is the fallback.",
    level: "expert"
  },
  {
    question: "Does `NOT FOUND` trigger when a standard `SELECT * FROM students WHERE dept_id = 999;` returns 0 rows?",
    shortAnswer: "NO; a regular `SELECT` query returning an empty result set produces 0 rows without triggering `NOT FOUND`; `NOT FOUND` triggers on `SELECT ... INTO` or cursor `FETCH`.",
    explanation: "SELECT vs SELECT INTO and cursor behavior.",
    hint: "No, regular SELECT returns an empty set; SELECT INTO or FETCH triggers NOT FOUND.",
    level: "expert"
  },
  {
    question: "What error does `SELECT ... INTO` raise if the query matches 0 rows in strict mode?",
    shortAnswer: "MySQL raises Error `1329` (SQLSTATE `'02000'`: No data to FETCH / SELECT), which is caught by a `NOT FOUND` handler.",
    explanation: "SELECT INTO zero rows behavior.",
    hint: "Raises Error 1329 / SQLSTATE '02000', caught by NOT FOUND.",
    level: "basic"
  },
  {
    question: "What error does `SELECT ... INTO` raise if the query matches MORE THAN ONE row?",
    shortAnswer: "MySQL raises Error `1172` (SQLSTATE `'42000'`: Result consisted of more than one row), which is caught by `SQLEXCEPTION` (NOT `NOT FOUND`).",
    explanation: "SELECT INTO multiple rows behavior.",
    hint: "Raises Error 1172, which is caught by SQLEXCEPTION.",
    level: "expert"
  },
  {
    question: "Can you declare separate handlers for all three condition types in the same stored procedure?",
    shortAnswer: "YES; you can declare a `CONTINUE` handler for `NOT FOUND`, a `CONTINUE` handler for `SQLWARNING`, and an `EXIT` handler for `SQLEXCEPTION`.",
    explanation: "Standard tri-condition handler pattern.",
    hint: "Yes, standard pattern: CONTINUE for NOT FOUND/SQLWARNING + EXIT for SQLEXCEPTION.",
    level: "basic"
  },
  {
    question: "How do you declare a handler that logs warning counts without aborting execution?",
    shortAnswer: "`DECLARE CONTINUE HANDLER FOR SQLWARNING SET v_warn_count = v_warn_count + 1;`.",
    explanation: "Warning counter pattern.",
    hint: "DECLARE CONTINUE HANDLER FOR SQLWARNING SET v_warn_count = v_warn_count + 1;",
    level: "basic"
  },
  {
    question: "Does `SQLWARNING` catch fatal constraint violations like Duplicate Key `1062`?",
    shortAnswer: "NO; `1062` is a fatal error (SQLSTATE `'23000'`), which is trapped by `SQLEXCEPTION`, not `SQLWARNING`.",
    explanation: "Error vs warning condition distinction.",
    hint: "No, 1062 is a fatal error caught by SQLEXCEPTION.",
    level: "basic"
  },
  {
    question: "Can a `NOT FOUND` handler execute a compound statement with `SET` and `INSERT`?",
    shortAnswer: "YES; `DECLARE CONTINUE HANDLER FOR NOT FOUND BEGIN SET v_done = TRUE; INSERT INTO audit_log VALUES ('End of batch'); END;`.",
    explanation: "Compound body in NOT FOUND handler.",
    hint: "Yes, wrap compound statements in BEGIN ... END.",
    level: "basic"
  },
  {
    question: "What happens if a procedure does NOT declare a handler for `NOT FOUND` and a cursor reaches the end?",
    shortAnswer: "MySQL raises unhandled condition `1329` (SQLSTATE `'02000'`) and terminates the procedure with an error.",
    explanation: "Unhandled NOT FOUND cursor crash.",
    hint: "The procedure crashes with unhandled Error 1329.",
    level: "basic"
  },
  {
    question: "What happens if a procedure does NOT declare a handler for `SQLWARNING` and a warning occurs?",
    shortAnswer: "The procedure continues executing normally without crashing; warnings are pushed to the diagnostics area and can be viewed via `SHOW WARNINGS`.",
    explanation: "Default unhandled warning behavior.",
    hint: "Execution continues normally without crashing.",
    level: "moderate"
  },
  {
    question: "Can a `SQLEXCEPTION` handler inspect the exact error number using `GET DIAGNOSTICS`?",
    shortAnswer: "YES; `GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO;` extracts the specific error number from the caught `SQLEXCEPTION`.",
    explanation: "Diagnostics extraction from SQLEXCEPTION.",
    hint: "Yes, use GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO.",
    level: "expert"
  },
  {
    question: "What condition is triggered when an `INSERT IGNORE` encounters a duplicate key?",
    shortAnswer: "`INSERT IGNORE` converts the fatal error into a warning (SQLSTATE Class `'01'`), which triggers `SQLWARNING` instead of `SQLEXCEPTION`.",
    explanation: "INSERT IGNORE condition transformation.",
    hint: "Converts error into a warning, triggering SQLWARNING.",
    level: "expert"
  },
  {
    question: "Does `TRUNCATE TABLE` trigger `SQLEXCEPTION` if executed on a table with active foreign keys?",
    shortAnswer: "YES; `TRUNCATE` fails with Error `1701` (Cannot truncate a table referenced in a foreign key constraint), triggering `SQLEXCEPTION`.",
    explanation: "TRUNCATE foreign key constraint failure.",
    hint: "Yes, Error 1701 triggers SQLEXCEPTION.",
    level: "basic"
  },
  {
    question: "Can `NOT FOUND` be used to detect when a `UPDATE` statement modified 0 rows?",
    shortAnswer: "NO; an `UPDATE` that matches 0 rows succeeds with 0 affected rows (SQLSTATE `'00000'`); it does NOT trigger `NOT FOUND`.",
    explanation: "UPDATE affected rows vs NOT FOUND.",
    hint: "No, UPDATE matching 0 rows succeeds with SQLSTATE '00000'.",
    level: "expert"
  },
  {
    question: "How do you detect if an `UPDATE` modified 0 rows inside a stored procedure?",
    shortAnswer: "By checking `ROW_COUNT()` immediately following the `UPDATE` statement (`IF ROW_COUNT() = 0 THEN ... END IF;`).",
    explanation: "Inspecting ROW_COUNT() for UPDATE matching.",
    hint: "Check IF ROW_COUNT() = 0 THEN ...",
    level: "expert"
  },
  {
    question: "Can you combine `SQLEXCEPTION` and `SQLWARNING` in a single handler?",
    shortAnswer: "YES; `DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING BEGIN ... END;`.",
    explanation: "Multi-condition stacking with SQLEXCEPTION and SQLWARNING.",
    hint: "Yes, comma-separate: FOR SQLEXCEPTION, SQLWARNING.",
    level: "basic"
  },
  {
    question: "What is the difference between `SQLEXCEPTION` and `SQLSTATE '42000'`?",
    shortAnswer: "`SQLEXCEPTION` catches ALL error classes (23, 40, 42, 45, etc.); `SQLSTATE '42000'` catches ONLY syntax and access rule violations.",
    explanation: "Broad keyword vs specific class code.",
    hint: "SQLEXCEPTION catches all fatal errors; SQLSTATE '42000' catches syntax only.",
    level: "basic"
  },
  {
    question: "Why should `DECLARE CONTINUE HANDLER FOR NOT FOUND` be scoped carefully in nested cursor loops?",
    shortAnswer: "Because an un-scoped outer `NOT FOUND` handler will be triggered by inner cursor exhaustion, prematurely terminating the outer loop unless each loop has its own inner block handler.",
    explanation: "Nested cursor NOT FOUND handler collision.",
    hint: "Inner cursor NOT FOUND triggers outer handler unless scoped in separate blocks.",
    level: "expert"
  },
  {
    question: "What is the return value of `ROW_COUNT()` after a handler executes?",
    shortAnswer: "It reflects the rows affected by the statements executed inside the handler itself, which can overwrite the original statement's `ROW_COUNT()`.",
    explanation: "ROW_COUNT() lifecycle during handler execution.",
    hint: "Handler statements overwrite ROW_COUNT().",
    level: "expert"
  },
  {
    question: "Can an application query the diagnostics area after an `EXIT HANDLER FOR SQLEXCEPTION` executes?",
    shortAnswer: "YES; if the handler does not execute subsequent non-diagnostic SQL statements, or if the handler saves the diagnostics into variables.",
    explanation: "Preserving diagnostics across handlers.",
    hint: "Yes, by capturing diagnostics into variables inside the handler.",
    level: "basic"
  },
  {
    question: "Does `SIGNAL SQLSTATE '45000'` trigger `SQLEXCEPTION`?",
    shortAnswer: "YES; custom user exceptions raised via `SIGNAL` have a non-warning/non-not-found SQLSTATE ('45000'), so they are trapped by `SQLEXCEPTION` handlers.",
    explanation: "SIGNAL interaction with SQLEXCEPTION.",
    hint: "Yes, SIGNAL raises an exception trapped by SQLEXCEPTION.",
    level: "basic"
  },
  {
    question: "Can a `CONTINUE HANDLER FOR NOT FOUND` reset its boolean flag inside the handler body?",
    shortAnswer: "No, the handler body sets `v_done = TRUE;`; resetting `v_done = FALSE;` must be done explicitly before opening the next cursor.",
    explanation: "Flag management in cursor loops.",
    hint: "The handler sets it to TRUE; reset it to FALSE before opening next cursor.",
    level: "basic"
  },
  {
    question: "What happens if a division by zero occurs under strict SQL mode (`STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO`)?",
    shortAnswer: "Under strict mode, division by zero raises a fatal error (Error `1365`), triggering `SQLEXCEPTION` instead of `SQLWARNING`.",
    explanation: "SQL mode impact on division by zero condition classification.",
    hint: "Under strict mode, division by zero triggers SQLEXCEPTION.",
    level: "expert"
  },
  {
    question: "Can a stored procedure declare multiple `SQLEXCEPTION` handlers in the same block?",
    shortAnswer: "NO; MySQL throws a duplicate handler declaration error (Error `1302`).",
    explanation: "Handler uniqueness rule.",
    hint: "No, only one handler for SQLEXCEPTION per block.",
    level: "basic"
  },
  {
    question: "How do you re-raise a trapped `SQLEXCEPTION` after logging?",
    shortAnswer: "Execute `RESIGNAL;` at the end of the `SQLEXCEPTION` handler block.",
    explanation: "Re-throwing exceptions with RESIGNAL.",
    hint: "Use RESIGNAL; at the end of the handler.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for SQLEXCEPTION, SQLWARNING, and NOT FOUND?",
    shortAnswer: "Structure every production stored routine with standard condition handling: use `EXIT HANDLER FOR SQLEXCEPTION` with explicit `ROLLBACK` for fatal error safety; use `CONTINUE HANDLER FOR NOT FOUND` for cursor loop iteration; and use `CONTINUE HANDLER FOR SQLWARNING` when tracking data quality telemetry in batch pipelines.",
    explanation: "Authoritative architectural best practices for standard condition keywords.",
    hint: "EXIT for SQLEXCEPTION (rollback) + CONTINUE for NOT FOUND (cursors) + CONTINUE for SQLWARNING (telemetry).",
    level: "expert"
  }
];

export default questions;
