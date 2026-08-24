// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the primary purpose of the `RESIGNAL` statement in MySQL?",
    shortAnswer: "To re-throw, modify, or transform an existing caught exception from inside a handler, enabling error logging while still notifying the calling client or parent procedure.",
    explanation: "Core purpose of the RESIGNAL statement.",
    hint: "To re-throw or modify caught exceptions inside error handlers.",
    level: "basic"
  },
  {
    question: "Where is the `RESIGNAL` statement permitted to execute in MySQL stored routines?",
    shortAnswer: "ONLY inside an active handler execution body (`DECLARE ... HANDLER`). Executing it outside a handler causes Error 1645.",
    explanation: "Syntactic constraint of RESIGNAL.",
    hint: "Only inside declared handler bodies.",
    level: "basic"
  },
  {
    question: "What happens when a bare `RESIGNAL;` statement is executed without any arguments?",
    shortAnswer: "It re-throws the exact original exception (same SQLSTATE, Error Number, and Message Text) without modifying any attributes.",
    explanation: "Pass-through behavior of bare RESIGNAL.",
    hint: "Re-throws the original caught error completely untouched.",
    level: "basic"
  },
  {
    question: "How do student enrollment procedures for Mamata, Susmita, Abhronila, and Debangshu illustrate `RESIGNAL`?",
    shortAnswer: "When inserting Mamata's enrollment, if a duplicate key error (1062) occurs, the handler logs the failure into `procedure_error_audit_log` and then executes `RESIGNAL;` to reject the API request on the Node.js server.",
    explanation: "The Log-and-Rethrow pattern in student registration systems.",
    hint: "Logs error to database audit table and re-throws to notify the Node.js API server.",
    level: "basic"
  },
  {
    question: "What is the 'Log-and-Rethrow' design pattern in database architecture?",
    shortAnswer: "An exception handler catches an error, executes transaction rollback, writes rich telemetry to an audit table, and then re-throws the error via `RESIGNAL;` to alert the client.",
    explanation: "Standard enterprise observability pattern.",
    hint: "Catch -> Rollback -> Log Telemetry -> Re-throw via RESIGNAL.",
    level: "expert"
  },
  {
    question: "How do you modify the message text of an existing exception using `RESIGNAL`?",
    shortAnswer: "`RESIGNAL SET MESSAGE_TEXT = 'Prefixed context: ' || MESSAGE_TEXT;` (or `CONCAT(...)`).",
    explanation: "Decorating error messages with RESIGNAL.",
    hint: "Use RESIGNAL SET MESSAGE_TEXT = '...';",
    level: "basic"
  },
  {
    question: "How do you transform a low-level MySQL database error into a high-level domain error using `RESIGNAL`?",
    shortAnswer: "`RESIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Registration failed: Student already enrolled!', MYSQL_ERRNO = 50020;`.",
    explanation: "Exception transformation pattern.",
    hint: "Use RESIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '...';",
    level: "expert"
  },
  {
    question: "What error occurs if you execute `RESIGNAL` directly inside a stored procedure body outside of any handler?",
    shortAnswer: "MySQL throws Error `1645` (RESIGNAL when handler not active).",
    explanation: "Handler context requirement in MySQL.",
    hint: "Throws Error 1645 (handler not active).",
    level: "expert"
  },
  {
    question: "Can `RESIGNAL` change both the `SQLSTATE` and the `MYSQL_ERRNO` simultaneously?",
    shortAnswer: "YES; `RESIGNAL SQLSTATE '45000' SET MYSQL_ERRNO = 50050, MESSAGE_TEXT = '...';`.",
    explanation: "Simultaneous attribute transformation in RESIGNAL.",
    hint: "Yes, specify both SQLSTATE and SET items.",
    level: "basic"
  },
  {
    question: "What happens if Procedure A calls Procedure B, and Procedure B executes `RESIGNAL;`?",
    shortAnswer: "Procedure B terminates, and the re-thrown exception propagates up the call stack to Procedure A's active handlers (or to the client if Procedure A has no handlers).",
    explanation: "Call stack exception propagation with RESIGNAL.",
    hint: "Propagates up to Procedure A's handlers or out to the client.",
    level: "basic"
  },
  {
    question: "Does `RESIGNAL;` preserve the original `MYSQL_ERRNO` if only `MESSAGE_TEXT` is modified?",
    shortAnswer: "YES; any condition attributes not explicitly changed in the `SET` clause retain their original values from the caught condition.",
    explanation: "Attribute preservation in modifying RESIGNAL.",
    hint: "Yes, unchanged attributes retain their original caught values.",
    level: "expert"
  },
  {
    question: "Why is transforming internal database errors (like raw table names) to generic domain messages considered a security best practice?",
    shortAnswer: "It prevents leaking database schema structures, table names, and internal column details to malicious external users.",
    explanation: "Security sanitization with RESIGNAL.",
    hint: "Prevents leaking database schema details and internal table names to clients.",
    level: "expert"
  },
  {
    question: "Can an `EXIT HANDLER FOR SQLEXCEPTION` execute `ROLLBACK;` and then `RESIGNAL;`?",
    shortAnswer: "YES; this is the authoritative enterprise recovery idiom: `BEGIN ROLLBACK; INSERT INTO log ...; RESIGNAL; END;`.",
    explanation: "Standard rollback and re-throw idiom.",
    hint: "Yes: ROLLBACK -> Log -> RESIGNAL.",
    level: "basic"
  },
  {
    question: "What happens if `RESIGNAL` is executed inside a `CONTINUE HANDLER`?",
    shortAnswer: "The re-thrown exception immediately aborts the current statement and halts the block, effectively turning the `CONTINUE` handler into an `EXIT` escalation.",
    explanation: "RESIGNAL behavior inside CONTINUE handlers.",
    hint: "It aborts statement execution and propagates the error outward.",
    level: "expert"
  },
  {
    question: "Can `RESIGNAL` set the `SCHEMA_NAME` and `TABLE_NAME` attributes?",
    shortAnswer: "YES; `RESIGNAL SET SCHEMA_NAME = 'db', TABLE_NAME = 'tbl';`.",
    explanation: "Setting extended metadata in RESIGNAL.",
    hint: "Yes, in the SET clause.",
    level: "basic"
  },
  {
    question: "How does `RESIGNAL` differ from `SIGNAL`?",
    shortAnswer: "`SIGNAL` raises a brand-new error from anywhere in procedural code; `RESIGNAL` re-throws or modifies an existing caught error from inside an active handler.",
    explanation: "Key distinction between SIGNAL and RESIGNAL.",
    hint: "SIGNAL creates new errors; RESIGNAL modifies/re-throws caught errors.",
    level: "basic"
  },
  {
    question: "Can a `RESIGNAL` statement use a Named Condition?",
    shortAnswer: "YES; `RESIGNAL condition_name SET MESSAGE_TEXT = '...';`.",
    explanation: "Named condition support in RESIGNAL.",
    hint: "Yes, use RESIGNAL condition_name.",
    level: "moderate"
  },
  {
    question: "What happens if a procedure catches a warning with `DECLARE CONTINUE HANDLER FOR SQLWARNING` and executes `RESIGNAL SQLSTATE '45000'`?",
    shortAnswer: "It escalates the non-fatal warning into a fatal user-defined exception, aborting execution.",
    explanation: "Warning-to-exception escalation.",
    hint: "Escalates the warning into a fatal error, aborting execution.",
    level: "expert"
  },
  {
    question: "Can an application driver (Node.js/Spring Boot) catch an exception re-thrown by `RESIGNAL` in a try-catch block?",
    shortAnswer: "YES; the client driver's `try { ... } catch (err)` receives the re-thrown SQLSTATE and message as a standard database exception.",
    explanation: "Cross-tier exception integration.",
    hint: "Yes, client try-catch blocks receive the re-thrown database error.",
    level: "basic"
  },
  {
    question: "How do you preserve the original error message while prepending procedure metadata in MySQL 8.0?",
    shortAnswer: "`GET DIAGNOSTICS CONDITION 1 @msg = MESSAGE_TEXT; RESIGNAL SET MESSAGE_TEXT = CONCAT('[sp_billing] ', @msg);`.",
    explanation: "Message text prepending pattern.",
    hint: "Extract message via GET DIAGNOSTICS and prepend with CONCAT() in RESIGNAL.",
    level: "expert"
  },
  {
    question: "What is the maximum length of `MESSAGE_TEXT` when modified via `RESIGNAL` in MySQL 8.0?",
    shortAnswer: "1024 characters.",
    explanation: "MESSAGE_TEXT capacity in MySQL 8.0.",
    hint: "Up to 1024 characters.",
    level: "moderate"
  },
  {
    question: "Can `RESIGNAL` be executed inside an exception handler in a Database Trigger?",
    shortAnswer: "YES; handlers declared inside triggers can execute `RESIGNAL;` to re-throw trapped exceptions to the triggering DML statement.",
    explanation: "RESIGNAL in triggers.",
    hint: "Yes, triggers support RESIGNAL inside declared handlers.",
    level: "basic"
  },
  {
    question: "What happens if the `procedure_error_audit_log` insert fails before `RESIGNAL;` is reached?",
    shortAnswer: "The secondary insert error interrupts the handler and aborts execution before `RESIGNAL` runs, potentially masking the original root cause.",
    explanation: "Secondary error hazard in handlers.",
    hint: "The secondary error crashes the handler before RESIGNAL can execute.",
    level: "expert"
  },
  {
    question: "How do you guard against secondary logging errors before `RESIGNAL;`?",
    shortAnswer: "Wrap the audit log insert in an inner `BEGIN ... DECLARE CONTINUE HANDLER FOR SQLEXCEPTION BEGIN END;` block, then execute `RESIGNAL;` in the outer handler.",
    explanation: "Defensive logging wrapper for RESIGNAL.",
    hint: "Wrap the logging statement in an inner block with a CONTINUE handler.",
    level: "expert"
  },
  {
    question: "Does `RESIGNAL` clear the MySQL Diagnostics Area?",
    shortAnswer: "No, `RESIGNAL` pushes the new or modified condition information onto the Diagnostics Area, replacing or updating the top condition stack entry.",
    explanation: "Diagnostics area stack behavior on RESIGNAL.",
    hint: "Updates or pushes onto the Diagnostics Area stack.",
    level: "expert"
  },
  {
    question: "Can `RESIGNAL` downgrade a fatal `SQLEXCEPTION` into a `SQLWARNING`?",
    shortAnswer: "YES; by executing `RESIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'Downgraded error to warning';`.",
    explanation: "Exception downgrade via RESIGNAL.",
    hint: "Yes, by resignaling with SQLSTATE Class '01'.",
    level: "expert"
  },
  {
    question: "Can `RESIGNAL` downgrade a fatal exception into `NOT FOUND`?",
    shortAnswer: "YES; by executing `RESIGNAL SQLSTATE '02000' ...`.",
    explanation: "Signaling NOT FOUND via RESIGNAL.",
    hint: "Yes, using SQLSTATE Class '02'.",
    level: "expert"
  },
  {
    question: "Why should developers avoid silently discarding errors with empty handlers instead of using `RESIGNAL`?",
    shortAnswer: "Empty handlers hide bugs, whereas `RESIGNAL` logs the event internally while still communicating the failure cleanly to upstream callers.",
    explanation: "Defensive programming vs silent swallowing.",
    hint: "Empty handlers cause silent corruption; RESIGNAL preserves visibility and integrity.",
    level: "basic"
  },
  {
    question: "What built-in function can be used inside `MESSAGE_TEXT` with `RESIGNAL` to identify the server timestamp?",
    shortAnswer: "`NOW()` or `CURRENT_TIMESTAMP()` via `CONCAT('Failed at ', NOW(), ': ', @msg)`.",
    explanation: "Dynamic timestamping in error messages.",
    hint: "Use CONCAT() with NOW().",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Propagating and Modifying Exceptions with RESIGNAL?",
    shortAnswer: "Use `RESIGNAL` to implement clean multi-tier exception architectures: always catch fatal errors with `EXIT HANDLER FOR SQLEXCEPTION`; execute `ROLLBACK;` and write telemetry to your audit log first; and then execute `RESIGNAL;` (bare or sanitized via `SQLSTATE '45000'`) to ensure client applications never suffer from silent data corruption.",
    explanation: "Authoritative architectural best practices for RESIGNAL exception propagation.",
    hint: "Catch -> Rollback -> Telemetry Log -> RESIGNAL (bare or transformed to Class 45).",
    level: "expert"
  }
];

export default questions;
