// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the primary difference in invocation between a Stored Procedure and a Stored Function?",
    shortAnswer: "A Stored Procedure is invoked using `CALL proc_name(args);`; a Stored Function evaluates to a scalar value and is invoked directly inside SQL expressions (`SELECT func(args)`).",
    explanation: "Core invocation distinction in MySQL.",
    hint: "Procedures use CALL; functions are called directly inside expressions (SELECT func()).",
    level: "basic"
  },
  {
    question: "What two clauses are mandatory in a Stored Function definition in MySQL?",
    shortAnswer: "The `RETURNS return_data_type` clause in the function signature header and at least one `RETURN expression;` statement in the function body.",
    explanation: "Mandatory function return syntax requirements.",
    hint: "RETURNS data_type in header and RETURN val; in body.",
    level: "basic"
  },
  {
    question: "What parameter modes (`IN`, `OUT`, `INOUT`) are permitted in Stored Functions in MySQL?",
    shortAnswer: "ONLY `IN` parameters are permitted; `OUT` and `INOUT` parameters are strictly forbidden in stored functions.",
    explanation: "Parameter mode restrictions on functions.",
    hint: "Only IN parameters are allowed; OUT and INOUT are prohibited.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `fn_get_letter_grade(score)`?",
    shortAnswer: "Executing `SELECT first_name, fn_get_letter_grade(exam_score_pct) AS grade FROM students;` computes 'A+' for Abhronila (96.2%) and Mamata (94.5%), and 'A' for Susmita (88.0%) and Debangshu (82.4%).",
    explanation: "Inline scalar function evaluation on student query results.",
    hint: "Computes letter grades inline for each student in the SELECT list.",
    level: "basic"
  },
  {
    question: "Can a Stored Function contain `START TRANSACTION`, `COMMIT`, or `ROLLBACK` statements?",
    shortAnswer: "NO; MySQL explicitly forbids transaction control statements inside stored functions (throws Error 1422).",
    explanation: "Side-effect free transactional constraints.",
    hint: "No, transaction statements are strictly forbidden inside functions.",
    level: "expert"
  },
  {
    question: "Can a Stored Function return a table or multi-row result set in MySQL 8.0?",
    shortAnswer: "NO; stored functions in MySQL must return exactly ONE scalar value via the `RETURN` statement.",
    explanation: "Scalar return constraint on MySQL stored functions.",
    hint: "No, functions return strictly a single scalar value.",
    level: "basic"
  },
  {
    question: "Where can a Stored Function be invoked in SQL queries?",
    shortAnswer: "In `SELECT` lists, `WHERE` predicates, `ORDER BY` clauses, `GROUP BY` expressions, `HAVING` filters, `JOIN ON` conditions, and `UPDATE SET` expressions.",
    explanation: "Universal expression composability.",
    hint: "Anywhere an expression or column value is valid in SQL.",
    level: "basic"
  },
  {
    question: "What characteristic indicates that a function always returns the exact same result for identical input parameters?",
    shortAnswer: "`DETERMINISTIC`.",
    explanation: "Function deterministic categorization.",
    hint: "DETERMINISTIC.",
    level: "basic"
  },
  {
    question: "What characteristic indicates that a function's output can vary even with identical inputs (e.g. using `NOW()` or `UUID()`)?",
    shortAnswer: "`NOT DETERMINISTIC`.",
    explanation: "Non-deterministic categorization.",
    hint: "NOT DETERMINISTIC.",
    level: "basic"
  },
  {
    question: "What is the role of `log_bin_trust_function_creators` in MySQL replication?",
    shortAnswer: "When binary logging is enabled, MySQL requires functions to be declared `DETERMINISTIC`, `NO SQL`, or `READS SQL DATA` (or `log_bin_trust_function_creators = 1`) to guarantee safe replication to replica nodes without data corruption.",
    explanation: "Replication safety constraint for stored functions.",
    hint: "Ensures function execution produces identical results across replica servers.",
    level: "expert"
  },
  {
    question: "Can a Stored Function read data from database tables using `SELECT ... INTO`?",
    shortAnswer: "YES; functions declared with `READS SQL DATA` can query tables using `SELECT ... INTO` to fetch data for calculations.",
    explanation: "Table reading inside stored functions.",
    hint: "Yes, using SELECT ... INTO with READS SQL DATA characteristic.",
    level: "moderate"
  },
  {
    question: "Can a Stored Function execute `INSERT`, `UPDATE`, or `DELETE` statements on tables?",
    shortAnswer: "Yes if declared with `MODIFIES SQL DATA`, but modifying tables inside functions invoked from `SELECT` queries is discouraged due to concurrency and locking side-effects.",
    explanation: "DML side-effects inside scalar functions.",
    hint: "Yes with MODIFIES SQL DATA, but generally discouraged to avoid side-effects.",
    level: "expert"
  },
  {
    question: "How do you define a function that formats raw numbers into Indian Rupee currency strings (e.g. `₹25,000.00`)?",
    shortAnswer: "`CREATE FUNCTION fn_format_inr(p_amt DECIMAL(10,2)) RETURNS VARCHAR(30) DETERMINISTIC NO SQL BEGIN RETURN CONCAT('₹', FORMAT(p_amt, 2, 'en_IN')); END`.",
    explanation: "Currency formatting scalar function.",
    hint: "Returns formatted INR string using CONCAT and FORMAT.",
    level: "basic"
  },
  {
    question: "What happens if a Stored Function body reaches the `END` token without executing a `RETURN` statement?",
    shortAnswer: "`Error 1321 (2F005): FUNCTION func_name ended without RETURN`.",
    explanation: "Mandatory return path validation.",
    hint: "Error 1321: Function ended without RETURN.",
    level: "expert"
  },
  {
    question: "Can a Stored Function have multiple `RETURN` statements in different `IF` branches?",
    shortAnswer: "YES; you can place `RETURN` statements inside `IF` and `CASE` branches, as long as every possible execution path encounters a `RETURN`.",
    explanation: "Multiple return points in procedural branching.",
    hint: "Yes, multiple RETURN statements can exist in conditional branches.",
    level: "basic"
  },
  {
    question: "How do you calculate student age from Date of Birth using a Stored Function?",
    shortAnswer: "`CREATE FUNCTION fn_student_age(p_dob DATE) RETURNS INT DETERMINISTIC NO SQL BEGIN RETURN TIMESTAMPDIFF(YEAR, p_dob, CURDATE()); END`.",
    explanation: "Date difference calculation in a function.",
    hint: "Use TIMESTAMPDIFF(YEAR, p_dob, CURDATE()).",
    level: "basic"
  },
  {
    question: "Can a Stored Function call another Stored Function?",
    shortAnswer: "YES; functions can call other user-defined functions or built-in functions seamlessly.",
    explanation: "Nested function composition.",
    hint: "Yes, functions can call other functions.",
    level: "basic"
  },
  {
    question: "Can a Stored Function call a Stored Procedure using `CALL`?",
    shortAnswer: "NO; stored functions cannot execute `CALL procedure_name` statements.",
    explanation: "Procedure invocation restriction inside functions.",
    hint: "No, stored functions cannot execute CALL procedure statements.",
    level: "expert"
  },
  {
    question: "How do you drop an existing Stored Function if it already exists?",
    shortAnswer: "`DROP FUNCTION IF EXISTS function_name;`.",
    explanation: "Idempotent function dropping DDL.",
    hint: "DROP FUNCTION IF EXISTS func_name;",
    level: "basic"
  },
  {
    question: "How do you view the full source code of a Stored Function?",
    shortAnswer: "`SHOW CREATE FUNCTION function_name;`.",
    explanation: "DDL inspection command.",
    hint: "SHOW CREATE FUNCTION func_name;",
    level: "basic"
  },
  {
    question: "How do you view a list of all stored functions in the `barrackpore_academy` database?",
    shortAnswer: "`SHOW FUNCTION STATUS WHERE Db = 'barrackpore_academy';`.",
    explanation: "Lists existing functions in a database.",
    hint: "SHOW FUNCTION STATUS WHERE Db = '...';",
    level: "basic"
  },
  {
    question: "What is the performance impact of calling a Stored Function in a `WHERE` clause on a 10-million row table?",
    shortAnswer: "It causes row-by-row function evaluation ($10^7$ function calls) and prevents index range scans on that column unless using functional indexes.",
    explanation: "Predicate indexing and query performance considerations.",
    hint: "Slows query performance because it disables standard B-Tree index range scans.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 support indexing the output of a Deterministic Stored Function?",
    shortAnswer: "By creating a Functional Index: `CREATE INDEX idx_student_grade ON students ((fn_get_letter_grade(exam_score_pct)));`.",
    explanation: "Functional indexing on deterministic functions in MySQL 8.0.",
    hint: "Create a Functional Index on the function expression.",
    level: "expert"
  },
  {
    question: "What is the return data type flexibility for Stored Functions?",
    shortAnswer: "Any valid MySQL data type (`INT`, `BIGINT`, `VARCHAR`, `DECIMAL`, `DATE`, `DATETIME`, `BOOLEAN`, `JSON`, etc.).",
    explanation: "Scalar return type support.",
    hint: "All scalar MySQL data types including JSON.",
    level: "basic"
  },
  {
    question: "Can a Stored Function return a `JSON` object containing structured calculation metrics?",
    shortAnswer: "YES; `RETURNS JSON` allows functions to return complex multi-field JSON payloads like `JSON_OBJECT('base', 20000, 'gst', 3600, 'total', 23600)`.",
    explanation: "Returning structured JSON from scalar functions.",
    hint: "Yes, RETURNS JSON allows returning structured objects.",
    level: "moderate"
  },
  {
    question: "Can a parameter in a Stored Function be modified inside the function body?",
    shortAnswer: "YES; function parameters act as local variables inside the function body and can be modified locally using `SET`.",
    explanation: "Pass-by-value local parameter semantics.",
    hint: "Yes, parameters act as local variables inside the function body.",
    level: "moderate"
  },
  {
    question: "What privilege is required to execute a Stored Function in MySQL?",
    shortAnswer: "`GRANT EXECUTE ON FUNCTION db_name.func_name TO 'user'@'host';`.",
    explanation: "Function execution privilege.",
    hint: "GRANT EXECUTE ON FUNCTION privilege.",
    level: "basic"
  },
  {
    question: "How do you calculate 18% GST with a 5% scholarship concession using a Stored Function?",
    shortAnswer: "`CREATE FUNCTION fn_gst(fee DECIMAL(10,2), is_schol BOOLEAN) RETURNS DECIMAL(10,2) DETERMINISTIC NO SQL BEGIN RETURN ROUND(fee * IF(is_schol, 0.05, 0.18), 2); END`.",
    explanation: "Conditional GST calculation inside a stored function.",
    hint: "Returns fee multiplied by 0.05 or 0.18 based on scholarship status.",
    level: "basic"
  },
  {
    question: "Why should developers avoid putting complex multi-table joins inside a function called on every row of a large query?",
    shortAnswer: "Because it creates an $N+1$ query pattern inside the database engine, executing an additional join query for every single row returned in the outer query.",
    explanation: "N+1 query anti-pattern inside database functions.",
    hint: "Triggers the N+1 query problem, executing repetitive joins for every row.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for User-Defined Stored Functions in MySQL?",
    shortAnswer: "Use Stored Functions strictly for reusable scalar calculations, data formatting, and business rules in SQL queries; always declare accurate characteristics (`DETERMINISTIC`, `NO SQL`), ensure all branches reach a `RETURN` statement, avoid transactional side-effects, and use functional indexes when filtering on deterministic function results.",
    explanation: "Authoritative architectural best practices for user-defined stored functions.",
    hint: "Scalar calculations + DETERMINISTIC characteristic + RETURN on all paths + functional indexes.",
    level: "expert"
  }
];

export default questions;
