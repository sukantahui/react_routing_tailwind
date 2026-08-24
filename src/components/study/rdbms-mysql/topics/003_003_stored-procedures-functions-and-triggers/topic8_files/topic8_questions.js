// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the primary architectural difference between Stored Procedures and Stored Functions in MySQL?",
    shortAnswer: "Stored Procedures are designed for multi-statement transactional business workflows invoked via `CALL` (supporting `IN/OUT/INOUT` and result sets); Stored Functions are designed for pure scalar calculations invoked directly inside SQL queries (`SELECT func()`).",
    explanation: "Fundamental architectural dichotomy in MySQL server-side routines.",
    hint: "Procedures execute workflows via CALL; functions compute scalar expressions in queries.",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure be used in the `WHERE` clause of a `SELECT` query (`WHERE sp_check() = 1`)?",
    shortAnswer: "NO; stored procedures cannot be used in SQL expressions, `SELECT` lists, or `WHERE` clauses.",
    explanation: "Expression context restriction on procedures.",
    hint: "No, stored procedures cannot be called inside SQL query expressions.",
    level: "basic"
  },
  {
    question: "Can a Stored Function be invoked in the `WHERE` clause of a `SELECT` query?",
    shortAnswer: "YES; stored functions evaluate to scalar values and are fully valid inside `WHERE` clauses (`WHERE fn_calculate_academic_gst(fee) > 2000`).",
    explanation: "Universal expression validity of stored functions.",
    hint: "Yes, functions can be used in WHERE, ORDER BY, and SELECT lists.",
    level: "basic"
  },
  {
    question: "How do student fee payment operations for Mamata, Susmita, Abhronila, and Debangshu illustrate the procedure vs function choice?",
    shortAnswer: "Use a Stored Procedure `sp_process_student_payment()` to validate balances, debit accounts, insert receipts, and commit transactions; use a Stored Function `fn_calculate_academic_gst()` to calculate 18% GST inline on reports.",
    explanation: "Real-world separation between transactional workflows and inline math.",
    hint: "Procedure for multi-table payment workflow + function for inline tax calculation.",
    level: "basic"
  },
  {
    question: "What parameter modes are supported in Stored Procedures vs Stored Functions?",
    shortAnswer: "Procedures support `IN`, `OUT`, and `INOUT` parameters; Functions support strictly `IN` parameters only.",
    explanation: "Parameter mode support matrix.",
    hint: "Procedures: IN, OUT, INOUT; Functions: Strictly IN only.",
    level: "basic"
  },
  {
    question: "What error occurs if you attempt to execute `COMMIT` or `ROLLBACK` inside a Stored Function?",
    shortAnswer: "`Error 1422 (HY000): Explicit or implicit commit is not allowed in stored function or trigger`.",
    explanation: "Transaction control restriction inside functions.",
    hint: "Error 1422: Explicit or implicit commit is not allowed in stored function.",
    level: "expert"
  },
  {
    question: "Can a Stored Procedure return multiple result sets to the calling client?",
    shortAnswer: "YES; executing multiple `SELECT` statements inside a procedure returns multiple tabular result sets sequentially.",
    explanation: "Multi-result set streaming from procedures.",
    hint: "Yes, procedures can return multiple tabular result sets.",
    level: "basic"
  },
  {
    question: "Can a Stored Function return multiple tabular result sets to the calling client?",
    shortAnswer: "NO; stored functions cannot return uncaptured result sets and must return strictly ONE scalar value via `RETURN`.",
    explanation: "Scalar return constraint on functions.",
    hint: "No, functions return strictly a single scalar value.",
    level: "basic"
  },
  {
    question: "How do you capture output values from a Stored Procedure vs a Stored Function?",
    shortAnswer: "From a procedure: pass session variables to `OUT` parameters (`CALL sp_calc(@res); SELECT @res;`); from a function: capture the return value directly (`SELECT fn_calc() INTO @res;`).",
    explanation: "Output capture mechanics.",
    hint: "Procedure uses OUT parameter session binding; function returns value directly.",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure call a Stored Function?",
    shortAnswer: "YES; stored procedures can call user-defined stored functions inside their expressions and SQL statements.",
    explanation: "Interoperability from procedures to functions.",
    hint: "Yes, procedures can call functions in SQL expressions.",
    level: "basic"
  },
  {
    question: "Can a Stored Function call a Stored Procedure using `CALL`?",
    shortAnswer: "NO; MySQL explicitly forbids executing `CALL procedure_name` statements inside stored functions.",
    explanation: "Prohibited call pathway.",
    hint: "No, functions cannot call procedures.",
    level: "expert"
  },
  {
    question: "Why are Stored Functions preferred for computed columns and functional indexes?",
    shortAnswer: "Because deterministic stored functions can evaluate row-by-row expressions dynamically and support MySQL 8.0 Functional Index creation.",
    explanation: "Functional indexing support.",
    hint: "Functions evaluate scalar values dynamically and support functional indexes.",
    level: "moderate"
  },
  {
    question: "Why are Stored Procedures preferred for batch data migration and ETL jobs?",
    shortAnswer: "Because procedures can manage their own transaction boundaries, commit in chunks, log progress to audit tables, and handle complex cursors without scalar return constraints.",
    explanation: "Batch processing and transaction control advantages of procedures.",
    hint: "Procedures manage transaction boundaries, batch commits, and multi-table DML.",
    level: "expert"
  },
  {
    question: "What is the DDL command to view metadata about all procedures vs all functions?",
    shortAnswer: "`SHOW PROCEDURE STATUS;` and `SHOW FUNCTION STATUS;`.",
    explanation: "Catalog status inspection commands.",
    hint: "SHOW PROCEDURE STATUS and SHOW FUNCTION STATUS.",
    level: "basic"
  },
  {
    question: "Where are procedure and function definitions stored in the MySQL Data Dictionary?",
    shortAnswer: "In `information_schema.ROUTINES` (differentiated by `ROUTINE_TYPE = 'PROCEDURE'` vs `ROUTINE_TYPE = 'FUNCTION'`).",
    explanation: "Data dictionary catalog queries.",
    hint: "information_schema.ROUTINES filtered by ROUTINE_TYPE.",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure be called without any arguments if it has no parameters?",
    shortAnswer: "YES; `CALL sp_clean_logs();` or `CALL sp_clean_logs;` (parentheses optional in CLI for zero-arg procedures).",
    explanation: "Zero-argument procedure invocation.",
    hint: "Yes, CALL proc_name() with empty parentheses.",
    level: "basic"
  },
  {
    question: "Can a Stored Function be called without any arguments if it has no parameters?",
    shortAnswer: "YES; but parentheses are mandatory: `SELECT fn_get_current_fiscal_year();`.",
    explanation: "Function invocation syntax requirements.",
    hint: "Yes, but parentheses () are mandatory for functions.",
    level: "basic"
  },
  {
    question: "How do security privileges differ between Procedures and Functions?",
    shortAnswer: "Both use `EXECUTE`, but permissions are granted specifically via `GRANT EXECUTE ON PROCEDURE` vs `GRANT EXECUTE ON FUNCTION`.",
    explanation: "Granular routine privileges.",
    hint: "GRANT EXECUTE ON PROCEDURE vs GRANT EXECUTE ON FUNCTION.",
    level: "basic"
  },
  {
    question: "What happens if a Stored Function attempts to modify a table that is already being read by the calling `SELECT` query?",
    shortAnswer: "MySQL locks or throws `Error 1442: Can't update table in stored function/trigger because it is already in use by statement which invoked this stored function/trigger`.",
    explanation: "Table lock collision in function DML.",
    hint: "Error 1442: Table is already in use by the invoking statement.",
    level: "expert"
  },
  {
    question: "Can a Stored Procedure create temporary tables?",
    shortAnswer: "YES; procedures can create, populate, and query session temporary tables (`CREATE TEMPORARY TABLE temp_x ...`).",
    explanation: "Temporary table creation in procedures.",
    hint: "Yes, procedures can create and query temporary tables.",
    level: "basic"
  },
  {
    question: "Can a Stored Function create temporary tables?",
    shortAnswer: "NO; MySQL forbids creating temporary tables inside stored functions because DDL statements perform an implicit commit.",
    explanation: "Implicit commit restriction inside functions.",
    hint: "No, DDL creates implicit commits which are forbidden in functions.",
    level: "expert"
  },
  {
    question: "How do you decide between a Procedure and a Function for generating invoice PDF receipt numbers?",
    shortAnswer: "If generating the receipt number requires inserting an audit record and committing an auto-increment sequence in a table, use a Procedure; if it merely formats an existing numeric ID into a string, use a Function.",
    explanation: "State mutation vs pure computation decision.",
    hint: "Use Procedure for DML/commit sequence; use Function for pure string formatting.",
    level: "expert"
  },
  {
    question: "Can a Stored Function return a `JSON` data type?",
    shortAnswer: "YES; `RETURNS JSON` allows functions to return multi-property JSON objects while adhering to the single scalar return constraint.",
    explanation: "Complex data return via JSON scalar type.",
    hint: "Yes, functions can return structured JSON objects.",
    level: "moderate"
  },
  {
    question: "How does binary logging and replication handle Procedures vs Functions?",
    shortAnswer: "Procedures are logged as the individual DML statements executed inside them; deterministic functions are logged by function invocation name.",
    explanation: "Replication execution models.",
    hint: "Functions log invocation; procedures log internal DML statements.",
    level: "expert"
  },
  {
    question: "Can dynamic SQL (`PREPARE`, `EXECUTE`, `DEALLOCATE PREPARE`) be used inside a Stored Function?",
    shortAnswer: "NO; dynamic SQL statements are forbidden inside stored functions (Error 1336).",
    explanation: "Dynamic SQL restrictions inside functions.",
    hint: "No, dynamic SQL is forbidden inside stored functions.",
    level: "expert"
  },
  {
    question: "Can dynamic SQL be used inside a Stored Procedure?",
    shortAnswer: "YES; stored procedures fully support `PREPARE`, `EXECUTE`, and `DEALLOCATE PREPARE` for dynamic query generation.",
    explanation: "Dynamic SQL support in procedures.",
    hint: "Yes, procedures fully support dynamic SQL.",
    level: "basic"
  },
  {
    question: "What is the CPU overhead comparison between calling a Procedure once vs calling a Function 10,000 times in a query?",
    shortAnswer: "A procedure executes once per `CALL`; a function invoked in a `SELECT` query executes $N$ times (once per row), so inefficient function logic multiplies CPU cost across all $N$ rows.",
    explanation: "Row-by-row execution amplification in functions.",
    hint: "Functions execute for every row in a query, amplifying CPU cost.",
    level: "expert"
  },
  {
    question: "How do you replace an existing Procedure vs Function in a migration script?",
    shortAnswer: "`DROP PROCEDURE IF EXISTS proc_name;` and `DROP FUNCTION IF EXISTS func_name;` before running the respective `CREATE` statement.",
    explanation: "Idempotent migration management.",
    hint: "DROP PROCEDURE IF EXISTS vs DROP FUNCTION IF EXISTS.",
    level: "basic"
  },
  {
    question: "What happens if you invoke a Stored Procedure with `SELECT sp_my_proc()`?",
    shortAnswer: "`Error 1305 (42000): FUNCTION sp_my_proc does not exist` (MySQL looks for a function when invoked in a `SELECT` list).",
    explanation: "Invocation context error.",
    hint: "Error 1305: MySQL searches for a function, not a procedure.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Stored Procedures vs Stored Functions?",
    shortAnswer: "Use Stored Procedures (`CALL`) for multi-statement business workflows, ACID transactions, batch ETL, and returning tabular result sets; use Stored Functions (`SELECT func()`) strictly for pure, side-effect-free scalar calculations, string formatting, and expressions in SQL queries.",
    explanation: "Authoritative architectural best practices for choosing between procedures and functions.",
    hint: "Procedures for transactions & workflows + Functions for pure scalar math & expressions.",
    level: "expert"
  }
];

export default questions;
