// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the primary purpose of the `SIGNAL` statement in MySQL?",
    shortAnswer: "To explicitly raise a custom application-level error or exception, returning a custom error code and descriptive message to the caller and aborting execution if uncaught.",
    explanation: "Purpose of the SIGNAL statement in stored routines.",
    hint: "To raise a custom business exception (like throw new Error()).",
    level: "basic"
  },
  {
    question: "Which ANSI SQLSTATE class code is reserved exclusively for user-defined custom exceptions raised via `SIGNAL`?",
    shortAnswer: "Class `'45'` (specifically SQLSTATE `'45000'`).",
    explanation: "Standard user exception class code in SQL.",
    hint: "SQLSTATE '45000' (Class 45).",
    level: "basic"
  },
  {
    question: "What happens if you execute `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Capacity Full';` inside a `BEFORE INSERT` trigger?",
    shortAnswer: "The triggering `INSERT` statement is aborted immediately, no rows are inserted, and the transaction is rolled back with the specified error message.",
    explanation: "SIGNAL behavior inside database triggers.",
    hint: "The INSERT is aborted immediately and transaction is rolled back.",
    level: "basic"
  },
  {
    question: "How do student enrollment procedures for Mamata, Susmita, Abhronila, and Debangshu illustrate `SIGNAL` exceptions?",
    shortAnswer: "If Mamata attempts to enroll in a batch with 30 students (capacity 30), a `BEFORE INSERT` trigger raises `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Course batch capacity exceeded!'`, rejecting the enrollment cleanly.",
    explanation: "Real-world business rule enforcement with SIGNAL.",
    hint: "Raises SIGNAL to reject Mamata when course capacity exceeds 30 students.",
    level: "basic"
  },
  {
    question: "Can you assign a custom numeric error number using `SIGNAL`?",
    shortAnswer: "YES; by specifying `MYSQL_ERRNO = integer` (e.g. `MYSQL_ERRNO = 50001`) in the `SIGNAL` statement's `SET` clause.",
    explanation: "Custom error number assignment via SIGNAL.",
    hint: "Yes, use SET MYSQL_ERRNO = 50001.",
    level: "basic"
  },
  {
    question: "What is the maximum character length for `MESSAGE_TEXT` in MySQL 8.0?",
    shortAnswer: "1024 characters (previously 128 characters in MySQL 5.x).",
    explanation: "MESSAGE_TEXT length limit in MySQL 8.0.",
    hint: "Up to 1024 characters in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "Can you `SIGNAL` a named condition instead of a literal SQLSTATE string?",
    shortAnswer: "YES; `DECLARE cap_error CONDITION FOR SQLSTATE '45000'; SIGNAL cap_error SET MESSAGE_TEXT = '...';`.",
    explanation: "Named condition signaling.",
    hint: "Yes, declare a named condition and invoke SIGNAL condition_name.",
    level: "basic"
  },
  {
    question: "What error occurs if you attempt to execute `SIGNAL SQLSTATE '00000'`?",
    shortAnswer: "MySQL throws Error `1645` (SQLSTATE '00000' is invalid for SIGNAL, since Class 00 represents success).",
    explanation: "Invalid SQLSTATE class in SIGNAL.",
    hint: "Throws Error 1645 because Class 00 represents success.",
    level: "expert"
  },
  {
    question: "Can a `SIGNAL` statement set additional diagnostic items like `SCHEMA_NAME` and `TABLE_NAME`?",
    shortAnswer: "YES; `SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '...', SCHEMA_NAME = 'academy_db', TABLE_NAME = 'students', COLUMN_NAME = 'age';`.",
    explanation: "Setting extended diagnostic items in SIGNAL.",
    hint: "Yes, set SCHEMA_NAME, TABLE_NAME, COLUMN_NAME, etc.",
    level: "expert"
  },
  {
    question: "Can a `SIGNAL` statement raise a warning instead of a fatal exception?",
    shortAnswer: "YES; by signaling an SQLSTATE code that begins with Class `'01'` (e.g. `SIGNAL SQLSTATE '01000' SET MESSAGE_TEXT = 'Warning message';`).",
    explanation: "Signaling warnings with Class 01.",
    hint: "Yes, use SQLSTATE Class '01' to signal warnings.",
    level: "expert"
  },
  {
    question: "Can a `SIGNAL` statement raise a `NOT FOUND` condition?",
    shortAnswer: "YES; by signaling an SQLSTATE code that begins with Class `'02'` (e.g. `SIGNAL SQLSTATE '02000' SET MESSAGE_TEXT = 'Record not found';`).",
    explanation: "Signaling NOT FOUND conditions with Class 02.",
    hint: "Yes, use SQLSTATE Class '02'.",
    level: "expert"
  },
  {
    question: "What happens if a procedure raises a `SIGNAL` and has an active `EXIT HANDLER FOR SQLEXCEPTION` declared?",
    shortAnswer: "The procedure's own `EXIT HANDLER` catches the `SIGNAL` exception and executes its recovery/logging logic.",
    explanation: "Handler interception of SIGNAL exceptions.",
    hint: "The procedure handler intercepts the SIGNAL exception.",
    level: "basic"
  },
  {
    question: "Can you pass dynamic variable values inside the `MESSAGE_TEXT` of a `SIGNAL` statement?",
    shortAnswer: "In MySQL 8.0, `MESSAGE_TEXT` accepts expressions and variables (`SET MESSAGE_TEXT = CONCAT('Student ID ', v_id, ' is invalid!');`).",
    explanation: "Dynamic string expressions in MESSAGE_TEXT.",
    hint: "Yes, use CONCAT() with variables in MESSAGE_TEXT.",
    level: "basic"
  },
  {
    question: "Can a Stored Function execute a `SIGNAL` statement?",
    shortAnswer: "YES; User-Defined Stored Functions can execute `SIGNAL` statements to reject invalid mathematical or business inputs.",
    explanation: "SIGNAL support in stored functions.",
    hint: "Yes, functions can raise SIGNAL exceptions.",
    level: "basic"
  },
  {
    question: "How does `SIGNAL` replace legacy hacky workarounds (like intentional division by zero or calling non-existent tables)?",
    shortAnswer: "Prior to MySQL 5.5, developers caused intentional crashes to abort triggers; `SIGNAL` provides a clean, standardized, expressive ANSI SQL mechanism with custom error messages.",
    explanation: "Evolution of custom error raising in MySQL.",
    hint: "Replaces intentional crash hacks with clean, descriptive ANSI error throwing.",
    level: "expert"
  },
  {
    question: "Can a client application (Node.js/Java) read the `MESSAGE_TEXT` set by a `SIGNAL` statement?",
    shortAnswer: "YES; database drivers (JDBC, mysql2) receive the exact `MESSAGE_TEXT` in the caught `SQLException.getMessage()` / `error.message`.",
    explanation: "Client visibility of SIGNAL message text.",
    hint: "Yes, client drivers receive the exact MESSAGE_TEXT in error objects.",
    level: "basic"
  },
  {
    question: "How do you enforce that a student's graduation year must be >= admission year using `SIGNAL`?",
    shortAnswer: "`IF NEW.grad_year < NEW.admit_year THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Graduation year cannot precede admission year!'; END IF;`.",
    explanation: "Temporal constraint validation with SIGNAL.",
    hint: "Check condition in trigger/procedure and raise SIGNAL SQLSTATE '45000'.",
    level: "basic"
  },
  {
    question: "What is the difference between `CHECK` constraints and `SIGNAL` validation in triggers?",
    shortAnswer: "`CHECK` constraints evaluate single-row scalar predicates; `SIGNAL` in triggers can evaluate complex queries across multiple tables (e.g. counting total enrolled students).",
    explanation: "CHECK constraints vs trigger SIGNAL validation.",
    hint: "SIGNAL can evaluate multi-table aggregations and complex procedural logic.",
    level: "expert"
  },
  {
    question: "Can you execute multiple `SET` items in a single `SIGNAL` statement?",
    shortAnswer: "YES; comma-separate each item: `SET MESSAGE_TEXT = '...', MYSQL_ERRNO = 50001, TABLE_NAME = '...'`.",
    explanation: "Setting multiple diagnostic fields in SIGNAL.",
    hint: "Yes, comma-separate items in the SET clause.",
    level: "basic"
  },
  {
    question: "What happens if a transaction inserts 100 rows in bulk and the 50th row triggers a `SIGNAL` in a `BEFORE INSERT` trigger?",
    shortAnswer: "The entire bulk `INSERT` statement is aborted and all 50 in-flight row insertions are rolled back.",
    explanation: "Atomic statement rollback on trigger SIGNAL.",
    hint: "The entire bulk statement fails and all rows are rolled back.",
    level: "expert"
  },
  {
    question: "Can `SIGNAL` be used to implement custom security permission guards inside procedures?",
    shortAnswer: "YES; `IF CURRENT_USER() NOT LIKE 'admin_%' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Access Denied: Admin role required!'; END IF;`.",
    explanation: "Security authorization enforcement with SIGNAL.",
    hint: "Yes, verify user roles and raise SIGNAL on authorization failure.",
    level: "basic"
  },
  {
    question: "What condition information item specifies the constraint name that failed in `SIGNAL`?",
    shortAnswer: "`CONSTRAINT_NAME = 'chk_minimum_age'`.",
    explanation: "Diagnostic constraint name attribute.",
    hint: "CONSTRAINT_NAME = 'name'.",
    level: "moderate"
  },
  {
    question: "Can `SIGNAL` be executed without the `SET` clause?",
    shortAnswer: "YES; `SIGNAL SQLSTATE '45000';` is valid syntax, though it provides no custom message text (defaults to empty or generic message).",
    explanation: "Minimal SIGNAL syntax.",
    hint: "Yes, but providing MESSAGE_TEXT is recommended best practice.",
    level: "basic"
  },
  {
    question: "What happens if an invalid character encoding is used inside `MESSAGE_TEXT` in `SIGNAL`?",
    shortAnswer: "MySQL converts the string to UTF-8; if invalid byte sequences exist, replacement characters are inserted.",
    explanation: "UTF-8 encoding in diagnostic messages.",
    hint: "MySQL converts MESSAGE_TEXT to standard UTF-8.",
    level: "expert"
  },
  {
    question: "Can an `AFTER INSERT` trigger execute `SIGNAL`?",
    shortAnswer: "YES; if raised in an `AFTER INSERT` trigger, the newly inserted row and any subsequent triggers are aborted and rolled back.",
    explanation: "SIGNAL in AFTER triggers.",
    hint: "Yes, AFTER triggers can raise SIGNAL and trigger statement rollback.",
    level: "basic"
  },
  {
    question: "How do you define standardized custom error codes (e.g. 50001 to 50999) across a team?",
    shortAnswer: "Document an enterprise error code catalog mapping each number to a specific domain invariant (e.g. `50001 = CAPACITY_EXCEEDED`, `50002 = INSUFFICIENT_FUNDS`).",
    explanation: "Team error code governance.",
    hint: "Create a shared domain error catalog with reserved 50000+ error numbers.",
    level: "basic"
  },
  {
    question: "Can `SIGNAL` be used to prevent deletion of master records in `BEFORE DELETE` triggers?",
    shortAnswer: "YES; `IF (SELECT COUNT(*) FROM student_courses WHERE dept_id = OLD.dept_id) > 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete department with active students!'; END IF;`.",
    explanation: "Delete protection with SIGNAL in triggers.",
    hint: "Yes, verify dependent child records and raise SIGNAL to prevent deletion.",
    level: "basic"
  },
  {
    question: "What is the return status code for an uncaught `SIGNAL SQLSTATE '45000'` in MySQL command line?",
    shortAnswer: "`ERROR <MYSQL_ERRNO> (45000): <MESSAGE_TEXT>`.",
    explanation: "CLI error output format for custom signals.",
    hint: "Displays Error number, (45000), and custom message text.",
    level: "basic"
  },
  {
    question: "Can `SIGNAL` be used in combination with `RESIGNAL`?",
    shortAnswer: "YES; `SIGNAL` initiates a brand-new custom exception, while `RESIGNAL` modifies or re-throws an already caught exception inside a handler.",
    explanation: "SIGNAL vs RESIGNAL relationship.",
    hint: "SIGNAL raises new errors; RESIGNAL re-throws or modifies existing caught errors.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Raising Custom Exceptions with SIGNAL?",
    shortAnswer: "Use `SIGNAL SQLSTATE '45000'` to enforce complex cross-table business invariants in triggers and stored procedures; always provide descriptive, human-readable `MESSAGE_TEXT`; assign structured `MYSQL_ERRNO` codes (50000+); and never rely on hacky intentional crashes for application validation.",
    explanation: "Authoritative architectural best practices for custom exception generation.",
    hint: "SIGNAL SQLSTATE '45000' + rich MESSAGE_TEXT + structured MYSQL_ERRNO + cross-table validation.",
    level: "expert"
  }
];

export default questions;
