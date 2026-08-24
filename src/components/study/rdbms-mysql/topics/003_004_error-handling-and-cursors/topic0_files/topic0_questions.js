// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What happens if a runtime SQL error occurs inside a Stored Procedure that has NO handlers declared?",
    shortAnswer: "The procedure execution halts immediately at the failing statement, exits with an uncaught exception, and leaves any open uncommitted transaction state unresolved.",
    explanation: "Default unhandled error behavior in MySQL.",
    hint: "The procedure crashes mid-execution and aborts immediately.",
    level: "basic"
  },
  {
    question: "What is the primary role of Exception Handlers in MySQL stored routines?",
    shortAnswer: "To intercept runtime errors, prevent unexpected procedure crashes, execute rollback recovery logic, log diagnostic details, and return clean status codes.",
    explanation: "Defensive programming in database procedures.",
    hint: "To intercept errors and ensure graceful failure and recovery.",
    level: "basic"
  },
  {
    question: "What is the strict declaration order required inside a `BEGIN ... END` block in MySQL?",
    shortAnswer: "1. Local Variables -> 2. Named Conditions -> 3. Cursors -> 4. Handlers -> 5. Executable procedural statements.",
    explanation: "MySQL declaration ordering grammar rules.",
    hint: "Variables -> Conditions -> Cursors -> Handlers -> Statements.",
    level: "basic"
  },
  {
    question: "What are the two primary handler action types in MySQL?",
    shortAnswer: "`CONTINUE` (executes handler and continues to the next statement) and `EXIT` (executes handler and terminates the current block).",
    explanation: "The two canonical handler actions.",
    hint: "CONTINUE and EXIT.",
    level: "basic"
  },
  {
    question: "How do student enrollment procedures for Mamata, Susmita, Abhronila, and Debangshu illustrate exception handling?",
    shortAnswer: "When inserting Mamata's enrollment, if a duplicate key error (1062) occurs, an `EXIT HANDLER` catches the error, rolls back the fee charge, logs the failure, and returns status code `'ERR_DUPLICATE'`.",
    explanation: "Real-world defensive procedure execution.",
    hint: "Catches duplicate key errors, rolls back, and returns clean status codes.",
    level: "basic"
  },
  {
    question: "What is the MySQL Diagnostics Area?",
    shortAnswer: "A dedicated memory structure where MySQL stores detailed metadata about the most recently executed statement and any generated errors, warnings, or conditions.",
    explanation: "Diagnostics area architecture in MySQL 8.0.",
    hint: "Internal memory buffer storing error and warning metadata.",
    level: "expert"
  },
  {
    question: "How do you inspect the Diagnostics Area inside a stored procedure?",
    shortAnswer: "Using the `GET DIAGNOSTICS` statement: `GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @msg = MESSAGE_TEXT, @state = RETURNED_SQLSTATE;`.",
    explanation: "Querying the diagnostics area in SQL.",
    hint: "Use GET DIAGNOSTICS CONDITION 1 ...",
    level: "expert"
  },
  {
    question: "What is the difference between a MySQL Error Number and an ANSI SQLSTATE code?",
    shortAnswer: "MySQL Error Number (e.g. `1062`) is a 4-digit vendor-specific integer; SQLSTATE (e.g. `'23000'`) is a 5-character alphanumeric ANSI standard error code portable across database engines.",
    explanation: "Vendor-specific vs ANSI standard error classification.",
    hint: "Error number is MySQL-specific (1062); SQLSTATE is ANSI standard ('23000').",
    level: "basic"
  },
  {
    question: "What generic condition value traps all standard SQL error exceptions in MySQL?",
    shortAnswer: "`SQLEXCEPTION` (matches any SQLSTATE that does not begin with '00', '01', or '02').",
    explanation: "Standard exception catch-all.",
    hint: "SQLEXCEPTION.",
    level: "basic"
  },
  {
    question: "What condition value traps warning conditions?",
    shortAnswer: "`SQLWARNING` (matches any SQLSTATE that begins with '01').",
    explanation: "Warning catch-all.",
    hint: "SQLWARNING.",
    level: "basic"
  },
  {
    question: "What condition value traps end-of-cursor or missing data conditions?",
    shortAnswer: "`NOT FOUND` (matches any SQLSTATE that begins with '02', such as when a cursor reaches the end of rows).",
    explanation: "Not found condition classifier.",
    hint: "NOT FOUND.",
    level: "basic"
  },
  {
    question: "What happens if an `EXIT HANDLER` is declared in an inner nested `BEGIN ... END` block?",
    shortAnswer: "When an error occurs in the inner block, the handler executes and terminates ONLY the inner block; execution resumes in the outer parent block.",
    explanation: "Nested block handler scope.",
    hint: "Terminates only the inner block, allowing the outer block to continue.",
    level: "expert"
  },
  {
    question: "Can a procedure have multiple handlers declared for different conditions?",
    shortAnswer: "YES; for example, one handler for `1062` (Duplicate Key), another for `1452` (Foreign Key), and a generic fallback for `SQLEXCEPTION`.",
    explanation: "Granular exception handler stacking.",
    hint: "Yes, specific handlers can be stacked with a generic fallback.",
    level: "basic"
  },
  {
    question: "Which handler takes precedence if both a specific error number handler (e.g., 1062) and a generic `SQLEXCEPTION` handler are declared?",
    shortAnswer: "MySQL executes the most specific handler matching the condition (the 1062 handler takes precedence over `SQLEXCEPTION`).",
    explanation: "Handler resolution precedence rules.",
    hint: "The most specific handler takes priority over generic handlers.",
    level: "expert"
  },
  {
    question: "How do you declare a handler that sets a flag variable and continues execution?",
    shortAnswer: "`DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET v_error_flag = TRUE;`.",
    explanation: "Standard CONTINUE flag handler pattern.",
    hint: "DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET v_flag = TRUE;",
    level: "basic"
  },
  {
    question: "How do you declare an `EXIT HANDLER` that performs a transaction rollback?",
    shortAnswer: "`DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; SET p_status = 'ERROR'; END;`.",
    explanation: "Atomic rollback in EXIT handler.",
    hint: "DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; ... END;",
    level: "basic"
  },
  {
    question: "What happens if an error occurs INSIDE the handler body itself?",
    shortAnswer: "MySQL searches for a handler in the enclosing outer block; if none exists, execution aborts with an unhandled exception.",
    explanation: "Exception during handler execution.",
    hint: "Escalates to the enclosing outer block, or crashes if unhandled.",
    level: "expert"
  },
  {
    question: "Can an exception handler log the exact error message text into an `error_log` table?",
    shortAnswer: "YES; by using `GET DIAGNOSTICS` inside the handler body to extract `MESSAGE_TEXT` and inserting it into an error logging table.",
    explanation: "Dynamic error logging via GET DIAGNOSTICS.",
    hint: "Yes, extract MESSAGE_TEXT via GET DIAGNOSTICS and insert into a log table.",
    level: "basic"
  },
  {
    question: "Why should handlers be declared AFTER cursors?",
    shortAnswer: "MySQL syntax parser strictly enforces the order: Variables -> Conditions -> Cursors -> Handlers. Violating this order throws a syntax error.",
    explanation: "Grammar requirement in MySQL procedural SQL.",
    hint: "MySQL parser grammar requires cursors before handlers.",
    level: "basic"
  },
  {
    question: "What is the difference between client-side error handling (Node.js/Java try-catch) and server-side SQL handlers?",
    shortAnswer: "Server-side SQL handlers can roll back atomic transactions and clean up database locks immediately before returning control across the network, reducing lock hold times.",
    explanation: "Database-tier vs application-tier exception recovery.",
    hint: "Database handlers execute immediately without network roundtrip delay.",
    level: "expert"
  },
  {
    question: "What is a Named Condition in MySQL?",
    shortAnswer: "A symbolic alias for a specific MySQL error number or SQLSTATE code (e.g. `DECLARE duplicate_key CONDITION FOR 1062;`), improving code readability.",
    explanation: "Named condition abstraction.",
    hint: "A symbolic name for an error code (DECLARE name CONDITION FOR ...).",
    level: "moderate"
  },
  {
    question: "How do you associate a handler with a Named Condition?",
    shortAnswer: "`DECLARE EXIT HANDLER FOR duplicate_key BEGIN ... END;`.",
    explanation: "Binding handlers to named conditions.",
    hint: "DECLARE EXIT HANDLER FOR condition_name ...",
    level: "basic"
  },
  {
    question: "Can `GET DIAGNOSTICS` capture multiple error conditions if a statement generated multiple warnings?",
    shortAnswer: "YES; `GET DIAGNOSTICS @count = NUMBER;` returns total conditions, and you can loop through `CONDITION 1`, `CONDITION 2`, etc.",
    explanation: "Multiple condition iteration in diagnostics stack.",
    hint: "Yes, inspect NUMBER of conditions and iterate through each condition index.",
    level: "expert"
  },
  {
    question: "Does a `CONTINUE HANDLER` clear the Diagnostics Area after executing?",
    shortAnswer: "No, but the next successful non-diagnostic SQL statement executed will reset/clear the Diagnostics Area.",
    explanation: "Diagnostics area reset lifecycle.",
    hint: "The next non-diagnostic SQL statement resets the diagnostics area.",
    level: "expert"
  },
  {
    question: "How do you prevent division-by-zero errors from crashing a procedure?",
    shortAnswer: "Declare a handler for `1365` (Division by 0) or `SQLEXCEPTION`, or check for zero using `NULLIF(denominator, 0)` defensively.",
    explanation: "Mathematical error trapping.",
    hint: "Trap error 1365 with a handler or use NULLIF defensively.",
    level: "basic"
  },
  {
    question: "Can an exception handler re-raise the trapped error to the calling client?",
    shortAnswer: "YES; using the `RESIGNAL` statement inside the handler body.",
    explanation: "Exception propagation via RESIGNAL.",
    hint: "Use RESIGNAL to re-throw the error.",
    level: "basic"
  },
  {
    question: "What is an Anonymous Handler in MySQL?",
    shortAnswer: "A handler that catches a raw numeric error code (e.g. `FOR 1062`) directly without declaring a named condition alias.",
    explanation: "Direct error number handler.",
    hint: "A handler referencing a raw error number directly.",
    level: "basic"
  },
  {
    question: "Can a Stored Function contain `DECLARE ... HANDLER` statements?",
    shortAnswer: "YES; stored functions support `CONTINUE` and `EXIT` handlers, though functions cannot perform transaction controls (`ROLLBACK`).",
    explanation: "Handler support in user-defined functions.",
    hint: "Yes, functions support handlers for in-memory recovery.",
    level: "moderate"
  },
  {
    question: "What happens if a procedure terminates via an `EXIT HANDLER` without setting `OUT` parameters?",
    shortAnswer: "The `OUT` parameters retain whatever values were assigned prior to the error (or `NULL` if unassigned).",
    explanation: "OUT parameter state upon handler exit.",
    hint: "OUT parameters retain their last assigned value or remain NULL.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Exception Handling Architecture in MySQL?",
    shortAnswer: "Always structure stored procedures with defensive handlers (`DECLARE EXIT HANDLER FOR SQLEXCEPTION`); enforce transaction rollback before exiting; inspect the Diagnostics Area (`GET DIAGNOSTICS`) to log rich error telemetry; and return unambiguous status codes to the calling application.",
    explanation: "Authoritative architectural best practices for database error handling.",
    hint: "Structured handlers + atomic rollback + diagnostics logging + clear return status codes.",
    level: "expert"
  }
];

export default questions;
