// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the default parameter mode in MySQL Stored Procedures if none is explicitly specified?",
    shortAnswer: "`IN` (Input Parameter).",
    explanation: "If you omit IN, OUT, or INOUT, MySQL defaults to IN.",
    hint: "Defaults to IN.",
    level: "basic"
  },
  {
    question: "What is the behavior of an `IN` parameter in a Stored Procedure?",
    shortAnswer: "It passes a value into the procedure; it is passed by value, meaning modifications made to the parameter inside the procedure do not affect the caller's variable.",
    explanation: "Read-only input parameter protection.",
    hint: "Passes data in; modifications inside procedure do not affect caller.",
    level: "basic"
  },
  {
    question: "What is the initial value of an `OUT` parameter when the Stored Procedure begins execution?",
    shortAnswer: "`NULL` (regardless of any prior value held by the caller's session variable).",
    explanation: "OUT parameters always start as NULL inside the procedure.",
    hint: "Always initialized to NULL upon entry.",
    level: "basic"
  },
  {
    question: "How does an `INOUT` parameter differ from an `OUT` parameter?",
    shortAnswer: "An `INOUT` parameter retains its initial value passed by the caller, can be read and modified inside the procedure, and returns its final updated value back to the caller.",
    explanation: "Bidirectional parameter passing.",
    hint: "INOUT can be both read on entry and updated on exit.",
    level: "basic"
  },
  {
    question: "How do student enrollment procedures for Mamata, Susmita, Abhronila, and Debangshu illustrate `IN`, `OUT`, and `INOUT`?",
    shortAnswer: "Passing `IN p_name = 'Mamata Hui'`, `OUT p_student_id` (returns new ID #101), and `INOUT p_fee_balance` (passed as ₹25,000, returns discounted ₹20,000).",
    explanation: "Concrete demonstration of all 3 parameter modes in a single call.",
    hint: "Name is IN, new student ID is OUT, and fee balance is INOUT.",
    level: "basic"
  },
  {
    question: "Can literal constant values (like `100` or `'Barrackpore'`) be passed into an `OUT` or `INOUT` parameter?",
    shortAnswer: "NO; `OUT` and `INOUT` parameters strictly require a user session variable (e.g. `@my_var`) to capture the returned value; passing a constant literal throws Error 1414.",
    explanation: "Variables required for write-back.",
    hint: "No, OUT and INOUT require variables like @var, not constant literals.",
    level: "expert"
  },
  {
    question: "How do you capture an `OUT` parameter in a MySQL session?",
    shortAnswer: "`CALL sp_get_total_students(@out_count); SELECT @out_count;`.",
    explanation: "Standard session variable capture pattern.",
    hint: "Pass a session variable like @out_var and inspect with SELECT @out_var.",
    level: "basic"
  },
  {
    question: "What statement is used to assign a value to an `OUT` parameter inside a stored procedure?",
    shortAnswer: "`SET param_name = value;` or `SELECT column INTO param_name FROM table WHERE ...;`.",
    explanation: "Standard variable assignment methods in stored routines.",
    hint: "Use SET or SELECT ... INTO.",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure have zero parameters?",
    shortAnswer: "YES; procedures can be defined with empty parentheses: `CREATE PROCEDURE sp_clean_temp_logs() BEGIN ... END`.",
    explanation: "Parameterless procedures are fully valid.",
    hint: "Yes, empty parentheses () define a parameterless procedure.",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure have multiple `OUT` parameters?",
    shortAnswer: "YES; a procedure can have multiple `OUT` parameters (e.g. `OUT p_total INT, OUT p_avg DECIMAL, OUT p_status VARCHAR(50)`).",
    explanation: "Multiple scalar return values via OUT parameters.",
    hint: "Yes, procedures can define as many OUT parameters as needed.",
    level: "basic"
  },
  {
    question: "What characteristic indicates that a procedure does NOT read or write database tables?",
    shortAnswer: "`NO SQL` (or `DETERMINISTIC`).",
    explanation: "Routine SQL data access characteristic.",
    hint: "NO SQL indicates no database table access.",
    level: "moderate"
  },
  {
    question: "What characteristic indicates that a procedure performs `INSERT`, `UPDATE`, or `DELETE` operations?",
    shortAnswer: "`MODIFIES SQL DATA`.",
    explanation: "DML modification characteristic.",
    hint: "MODIFIES SQL DATA.",
    level: "moderate"
  },
  {
    question: "What is the difference between `SQL SECURITY DEFINER` and `SQL SECURITY INVOKER` on a procedure?",
    shortAnswer: "`DEFINER` executes with the privileges of the user who created the procedure; `INVOKER` executes with the privileges of the user currently calling the procedure.",
    explanation: "Security execution context in MySQL.",
    hint: "DEFINER uses creator's permissions; INVOKER uses caller's permissions.",
    level: "expert"
  },
  {
    question: "What is the naming convention recommended for parameters to avoid collisions with table column names?",
    shortAnswer: "Prefix parameter names with `p_` or `in_` / `out_` (e.g. `p_student_id` or `in_student_name`) so they do not collide with table columns like `student_id` in SQL statements.",
    explanation: "Best practice to eliminate identifier shadowing and ambiguity.",
    hint: "Prefix parameters with p_ or in_/out_ to avoid column name collisions.",
    level: "expert"
  },
  {
    question: "What happens if a parameter name is identical to a table column name inside a query (`WHERE student_id = student_id`)?",
    shortAnswer: "MySQL treats both sides as referring to the table column, making the predicate a tautology (`WHERE column = column`) and matching every row in the table!",
    explanation: "One of the most dangerous parameter shadowing bugs in SQL.",
    hint: "Treats both sides as table column, matching all rows in the table.",
    level: "expert"
  },
  {
    question: "How do you drop an existing stored procedure if it already exists before creating it?",
    shortAnswer: "`DROP PROCEDURE IF EXISTS procedure_name;`.",
    explanation: "Idempotent script preparation command.",
    hint: "DROP PROCEDURE IF EXISTS proc_name;",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure return both `OUT` parameters AND a `SELECT` result set simultaneously?",
    shortAnswer: "YES; a procedure can assign values to `OUT` parameters and also execute a `SELECT` query that streams rows to the client.",
    explanation: "Dual output channel support.",
    hint: "Yes, procedures can return both OUT variables and SELECT result streams.",
    level: "moderate"
  },
  {
    question: "How do you initialize a session variable before passing it into an `INOUT` parameter?",
    shortAnswer: "`SET @my_balance = 5000.00; CALL sp_deduct_fee(@my_balance);`.",
    explanation: "Session variable initialization before invocation.",
    hint: "SET @var = value before calling the procedure.",
    level: "basic"
  },
  {
    question: "What data types can be used for Stored Procedure parameters?",
    shortAnswer: "Any valid MySQL data type (`INT`, `BIGINT`, `VARCHAR`, `DECIMAL`, `DATE`, `DATETIME`, `BOOLEAN`, `JSON`, `TEXT`, `BLOB`, etc.).",
    explanation: "Full relational data type support.",
    hint: "All standard MySQL data types (INT, VARCHAR, DECIMAL, JSON, etc.).",
    level: "basic"
  },
  {
    question: "Can default values be defined for parameters in MySQL Stored Procedures (e.g. `IN p_status VARCHAR(20) = 'ACTIVE'`)?",
    shortAnswer: "NO; MySQL 8.0 does NOT support default parameter values in stored procedure signatures; all declared parameters must be explicitly passed in the `CALL` statement.",
    explanation: "MySQL specific procedural syntax constraint.",
    hint: "No, MySQL does not support default parameter values in signatures.",
    level: "expert"
  },
  {
    question: "What error occurs if you call a procedure with 3 parameters by passing only 2 arguments?",
    shortAnswer: "`Error 1318 (42000): Incorrect number of arguments for PROCEDURE proc_name; expected 3, got 2`.",
    explanation: "Strict parameter count verification.",
    hint: "Error 1318: Incorrect number of arguments.",
    level: "basic"
  },
  {
    question: "How do you view the parameter definitions of an existing stored procedure?",
    shortAnswer: "`SELECT PARAMETER_NAME, PARAMETER_MODE, DATA_TYPE FROM information_schema.PARAMETERS WHERE SPECIFIC_NAME = 'proc_name';`.",
    explanation: "Inspects procedure signature via data dictionary.",
    hint: "Query information_schema.PARAMETERS table.",
    level: "moderate"
  },
  {
    question: "Can an `IN` parameter be modified inside the procedure body using `SET`?",
    shortAnswer: "YES; inside the procedure body, an `IN` parameter acts as a local variable and can be modified, but its changes are discarded upon procedure termination and never visible to the caller.",
    explanation: "Pass-by-value local copy semantics.",
    hint: "Yes, it can be modified locally, but changes never affect the caller.",
    level: "expert"
  },
  {
    question: "How do you create an atomic student fee payment procedure that returns receipt ID and status code via `OUT` parameters?",
    shortAnswer: "`CREATE PROCEDURE sp_pay(IN p_id INT, IN p_amt DECIMAL, OUT p_receipt_id INT, OUT p_status VARCHAR(20)) BEGIN ... INSERT INTO receipts ...; SET p_receipt_id = LAST_INSERT_ID(); SET p_status = 'SUCCESS'; END`.",
    explanation: "Standard enterprise transactional procedure pattern.",
    hint: "Assign LAST_INSERT_ID() and status string to OUT parameters.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `COMMENT` clause in `CREATE PROCEDURE`?",
    shortAnswer: "To store human-readable documentation strings directly in the procedure metadata for team maintenance and schema inspection tools.",
    explanation: "Self-documenting routine metadata.",
    hint: "COMMENT 'documentation description'",
    level: "basic"
  },
  {
    question: "Can a Stored Procedure modify session variables directly without `OUT` parameters?",
    shortAnswer: "YES; procedures can assign to user session variables directly (`SET @global_flag = 1`), but using formal `OUT` parameters is strongly recommended for clean API encapsulation.",
    explanation: "Side-effects vs explicit parameter contracts.",
    hint: "Yes, but formal OUT parameters are cleaner and more modular.",
    level: "moderate"
  },
  {
    question: "How does `LAST_INSERT_ID()` interact with `OUT` parameters after an `INSERT` statement?",
    shortAnswer: "`SET p_new_id = LAST_INSERT_ID();` captures the newly generated auto-increment primary key and returns it to the caller.",
    explanation: "Standard primary key return pattern.",
    hint: "SET p_new_id = LAST_INSERT_ID();",
    level: "basic"
  },
  {
    question: "What happens if an `OUT` parameter is never assigned a value inside the procedure body?",
    shortAnswer: "It returns `NULL` to the caller's session variable.",
    explanation: "Default uninitialized OUT parameter behavior.",
    hint: "Returns NULL.",
    level: "basic"
  },
  {
    question: "Can user-defined types (like custom objects or arrays) be passed as parameters in MySQL 8.0?",
    shortAnswer: "MySQL does not have composite object types, but you can pass complex data as a native `JSON` parameter data type.",
    explanation: "JSON parameter passing for complex payloads.",
    hint: "Pass complex structured data using the JSON data type.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Creating Stored Procedures with IN, OUT, and INOUT Parameters?",
    shortAnswer: "Prefix all parameter names with `p_` to eliminate column shadowing bugs, use `IN` for input filters, `OUT` for generated IDs/statuses, and `INOUT` for in-place modifications; enforce strict `SQL SECURITY INVOKER` where appropriate, document with `COMMENT`, and always pass session variables to `OUT/INOUT` parameters.",
    explanation: "Authoritative architectural best practices for stored procedure design.",
    hint: "Prefix p_ + IN for inputs / OUT for IDs / INOUT for in-place math + session variables for write-back.",
    level: "expert"
  }
];

export default questions;
