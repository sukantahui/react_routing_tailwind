// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the fundamental difference between Declarative SQL and Procedural SQL?",
    shortAnswer: "Declarative SQL specifies *WHAT* data to retrieve or modify in a set-based manner; Procedural SQL specifies *HOW* step-by-step algorithms execute using variables, control flow (`IF/LOOP`), and server-side routines.",
    explanation: "Core distinction between standard DQL/DML and procedural programming in MySQL.",
    hint: "Declarative = WHAT data; Procedural = HOW to execute step-by-step logic.",
    level: "basic"
  },
  {
    question: "What is a major network latency advantage of using Stored Procedures?",
    shortAnswer: "Executing multiple dependent queries inside a single Stored Procedure requires only 1 network round-trip from the client/app server instead of $N$ individual network hops.",
    explanation: "Significantly reduces network transport overhead.",
    hint: "1 network round-trip instead of N separate client-database hops.",
    level: "basic"
  },
  {
    question: "How do Stored Procedures enhance database security and adhere to the Principle of Least Privilege?",
    shortAnswer: "Users can be granted `EXECUTE` privileges on a specific procedure without giving them direct `SELECT`, `UPDATE`, or `DELETE` access to the underlying sensitive tables.",
    explanation: "Restricts direct table access while allowing business workflows.",
    hint: "Grant EXECUTE on procedure without granting direct table access.",
    level: "basic"
  },
  {
    question: "How does the Barrackpore Academy ERP benefit from centralized stored procedures for student fee payments?",
    shortAnswer: "Payment validation, GST invoice generation, ledger balance updates, and receipt numbering are executed identically whether triggered from the React web portal, Android mobile app, or admin desktop terminal.",
    explanation: "Prevents business rule duplication and drift across multiple clients.",
    hint: "Centralizes validation and financial updates across Web, Mobile, and Admin apps.",
    level: "basic"
  },
  {
    question: "What are the four primary procedural components supported in MySQL 8.0?",
    shortAnswer: "Stored Procedures, User-Defined Stored Functions, Database Triggers, and the Event Scheduler.",
    explanation: "The complete MySQL server-side procedural ecosystem.",
    hint: "Procedures, Functions, Triggers, and Event Scheduler.",
    level: "basic"
  },
  {
    question: "How is a Stored Procedure invoked in MySQL?",
    shortAnswer: "Using the `CALL` statement: `CALL procedure_name(arg1, arg2, ...);`.",
    explanation: "Standard procedure execution command.",
    hint: "CALL procedure_name(arguments);",
    level: "basic"
  },
  {
    question: "How is a User-Defined Stored Function invoked in MySQL?",
    shortAnswer: "Directly inside SQL expressions or SELECT lists: `SELECT calculate_gst(amount_inr) FROM payments;`.",
    explanation: "Stored functions evaluate to a scalar value in expressions.",
    hint: "Inside SQL expressions, like built-in functions (e.g. SELECT func(val)).",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure return multiple result sets to the client?",
    shortAnswer: "YES; executing multiple `SELECT` statements inside a stored procedure sends multiple independent result sets back to the client.",
    explanation: "Stored procedures support multi-result set streaming.",
    hint: "Yes, procedures can return multiple SELECT result sets.",
    level: "moderate"
  },
  {
    question: "Can a User-Defined Stored Function return multiple result sets or tables in MySQL 8.0?",
    shortAnswer: "NO; stored functions in MySQL must return exactly ONE scalar value via the `RETURNS` clause and cannot return result sets.",
    explanation: "Functions are restricted to returning a single scalar value.",
    hint: "No, stored functions return strictly 1 scalar value.",
    level: "basic"
  },
  {
    question: "What is a Database Trigger in MySQL?",
    shortAnswer: "A named procedural program associated with a table that activates automatically when an `INSERT`, `UPDATE`, or `DELETE` event occurs on that table.",
    explanation: "Event-driven automated procedural logic.",
    hint: "Procedural code that runs automatically on INSERT/UPDATE/DELETE events.",
    level: "basic"
  },
  {
    question: "What is the MySQL Event Scheduler?",
    shortAnswer: "A built-in database background thread that executes scheduled SQL jobs at predefined times or recurring cron-like intervals.",
    explanation: "Native database cron engine.",
    hint: "Built-in database scheduler for recurring automated jobs.",
    level: "basic"
  },
  {
    question: "What happens when a Stored Procedure is executed for the first time in a MySQL session?",
    shortAnswer: "MySQL parses the procedure body, verifies syntax and object permissions, compiles it into internal bytecode, and caches the execution plan in the thread's Procedure Cache.",
    explanation: "Compilation and execution plan caching.",
    hint: "Parses, verifies, compiles to bytecode, and caches the execution plan.",
    level: "expert"
  },
  {
    question: "What are the three parameter modes available in MySQL Stored Procedures?",
    shortAnswer: "`IN` (input only, read-only inside procedure), `OUT` (output only, written by procedure), and `INOUT` (initialized by caller, modified by procedure).",
    explanation: "The three standard ANSI SQL parameter directions.",
    hint: "IN, OUT, and INOUT.",
    level: "basic"
  },
  {
    question: "Can Stored Procedures contain explicit transaction control statements like `START TRANSACTION`, `COMMIT`, and `ROLLBACK`?",
    shortAnswer: "YES; stored procedures fully support transaction management and ACID boundary controls.",
    explanation: "Procedures can manage multi-table atomic transactions.",
    hint: "Yes, procedures can manage START TRANSACTION, COMMIT, and ROLLBACK.",
    level: "basic"
  },
  {
    question: "Can Stored Functions contain `START TRANSACTION`, `COMMIT`, or `ROLLBACK` statements?",
    shortAnswer: "NO; MySQL explicitly forbids transaction control statements inside Stored Functions (Error 1422).",
    explanation: "Functions must be transactional side-effect free relative to outer transactions.",
    hint: "No, transaction control statements are prohibited in stored functions.",
    level: "expert"
  },
  {
    question: "What privilege is required to execute a Stored Procedure in MySQL?",
    shortAnswer: "`GRANT EXECUTE ON PROCEDURE db_name.proc_name TO 'user'@'host';`.",
    explanation: "Standard execution privilege.",
    hint: "The EXECUTE privilege on the specific routine.",
    level: "basic"
  },
  {
    question: "What privilege is required to create a new Stored Procedure or Function?",
    shortAnswer: "`CREATE ROUTINE` privilege on the target schema.",
    explanation: "Administrative schema modification privilege.",
    hint: "CREATE ROUTINE privilege.",
    level: "basic"
  },
  {
    question: "What privilege is required to modify or drop an existing Stored Procedure?",
    shortAnswer: "`ALTER ROUTINE` privilege on the routine.",
    explanation: "Routine management privilege.",
    hint: "ALTER ROUTINE privilege.",
    level: "basic"
  },
  {
    question: "How does server-side procedural programming reduce application memory consumption?",
    shortAnswer: "By filtering, aggregating, and joining massive intermediate datasets on the database server itself, transferring only the final condensed results to the application server.",
    explanation: "Prevents pulling millions of raw rows into app memory.",
    hint: "Processes data on the database server, sending only final results over the wire.",
    level: "moderate"
  },
  {
    question: "What is a potential downside or tradeoff of putting excessive business logic in Stored Procedures?",
    shortAnswer: "Increased CPU load on the database server (which is harder to scale horizontally than stateless web app servers), version control complexity, and reduced portability across different database vendors.",
    explanation: "The classic architectural debate between database vs application layer logic.",
    hint: "Database server CPU load, horizontal scaling limits, and vendor lock-in.",
    level: "expert"
  },
  {
    question: "Where are stored routine metadata and definitions stored in MySQL?",
    shortAnswer: "In the `information_schema.ROUTINES` and `mysql.routines` data dictionary tables.",
    explanation: "Data dictionary storage for procedures and functions.",
    hint: "information_schema.ROUTINES table.",
    level: "moderate"
  },
  {
    question: "How do you view the full SQL source code of a stored procedure named `sp_enroll_student`?",
    shortAnswer: "`SHOW CREATE PROCEDURE sp_enroll_student;`.",
    explanation: "Retrieves complete DDL creation script.",
    hint: "SHOW CREATE PROCEDURE sp_enroll_student;",
    level: "basic"
  },
  {
    question: "How do you view a list of all stored procedures in the `barrackpore_academy` database?",
    shortAnswer: "`SHOW PROCEDURE STATUS WHERE Db = 'barrackpore_academy';`.",
    explanation: "Lists existing stored procedures in a database.",
    hint: "SHOW PROCEDURE STATUS WHERE Db = '...';",
    level: "basic"
  },
  {
    question: "What is the `DEFINER` vs `SQL SECURITY INVOKER` security model in MySQL stored routines?",
    shortAnswer: "`DEFINER` executes the routine with the privileges of the user who created it; `INVOKER` executes with the privileges of the current user invoking the procedure.",
    explanation: "Critical security context configuration in MySQL.",
    hint: "DEFINER uses creator's permissions; INVOKER uses caller's permissions.",
    level: "expert"
  },
  {
    question: "Why should developers use `SQL SECURITY INVOKER` on non-administrative procedures?",
    shortAnswer: "To enforce that calling users cannot bypass table-level access controls unless they explicitly hold the required underlying permissions.",
    explanation: "Prevents privilege escalation vulnerabilities.",
    hint: "Prevents callers from bypassing security and escalating privileges.",
    level: "expert"
  },
  {
    question: "Can a Stored Procedure call another Stored Procedure (Nested Procedures)?",
    shortAnswer: "YES; procedures can call other procedures recursively or sequentially up to `max_sp_recursion_depth`.",
    explanation: "Modular procedural composition.",
    hint: "Yes, procedures can call other procedures (nested execution).",
    level: "basic"
  },
  {
    question: "What variable controls the maximum depth of recursive stored procedure calls in MySQL?",
    shortAnswer: "`max_sp_recursion_depth` (default is 0, which disables recursion until explicitly increased).",
    explanation: "Recursion depth safety threshold.",
    hint: "max_sp_recursion_depth (default 0).",
    level: "moderate"
  },
  {
    question: "Can temporary tables (`CREATE TEMPORARY TABLE`) be created and queried inside a stored procedure?",
    shortAnswer: "YES; temporary tables are isolated to the current connection and are frequently used for intermediate staging inside procedures.",
    explanation: "Session-isolated temporary table usage.",
    hint: "Yes, temporary tables can be created and queried inside procedures.",
    level: "basic"
  },
  {
    question: "How does procedural exception handling (`DECLARE ... HANDLER`) improve system reliability?",
    shortAnswer: "It allows procedures to trap runtime errors (like duplicate keys or foreign key violations), execute automatic rollback, log diagnostic error details to an audit table, and return friendly status codes.",
    explanation: "Robust server-side error recovery.",
    hint: "Traps runtime errors, triggers rollbacks, and logs diagnostic messages.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Introduction to Procedural SQL in MySQL?",
    shortAnswer: "Use Stored Procedures for multi-statement transactional workflows and reducing network round trips, use Stored Functions for pure scalar mathematical calculations in queries, configure `SQL SECURITY INVOKER` for least-privilege security, and balance database server CPU utilization against application server capabilities.",
    explanation: "Authoritative architectural best practices for procedural database programming.",
    hint: "Procedures for multi-query transactions + Functions for scalar math + INVOKER security + CPU balance.",
    level: "expert"
  }
];

export default questions;
