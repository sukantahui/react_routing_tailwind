// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the definition of a `DETERMINISTIC` function in MySQL?",
    shortAnswer: "A function that always produces the exact same return value given the exact same input parameters.",
    explanation: "Mathematical determinism definition in relational databases.",
    hint: "Always returns identical output for identical inputs.",
    level: "basic"
  },
  {
    question: "What is the definition of a `NOT DETERMINISTIC` function in MySQL?",
    shortAnswer: "A function whose output can change across different invocations even when given identical input parameters (e.g. using `NOW()`, `RAND()`, or reading dynamic tables).",
    explanation: "Non-deterministic behavior definition.",
    hint: "Output can vary across invocations with same inputs (e.g. using NOW(), RAND()).",
    level: "basic"
  },
  {
    question: "What error occurs if you create a function with binary logging enabled without specifying determinism or data access characteristics?",
    shortAnswer: "`Error 1418 (HY000): This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled`.",
    explanation: "The standard replication safety guardrail in MySQL.",
    hint: "Error 1418 (Function lacks DETERMINISTIC, NO SQL, or READS SQL DATA).",
    level: "expert"
  },
  {
    question: "Why does MySQL Statement-Based Replication (SBR) require deterministic functions?",
    shortAnswer: "Because replica servers re-execute the function call from the binary log; if a function is non-deterministic, the replica will calculate a different value than the primary, causing data replication drift.",
    explanation: "Primary-replica consistency guarantee.",
    hint: "Prevents primary and replica servers from computing different values.",
    level: "expert"
  },
  {
    question: "What system variable allows non-deterministic function creation even with binary logging enabled?",
    shortAnswer: "`SET GLOBAL log_bin_trust_function_creators = 1;`.",
    explanation: "Administrative override for function creation.",
    hint: "log_bin_trust_function_creators = 1.",
    level: "expert"
  },
  {
    question: "How do student operations for Mamata, Susmita, Abhronila, and Debangshu illustrate `DETERMINISTIC` vs `NOT DETERMINISTIC`?",
    shortAnswer: "`fn_calc_gst(amount)` is `DETERMINISTIC` (₹10,000 always returns ₹1,800); `fn_calc_age(dob)` is `NOT DETERMINISTIC` (depends on `CURDATE()`, returning 21 years today and 22 next year).",
    explanation: "Concrete demonstration of determinism on student records.",
    hint: "Tax math is DETERMINISTIC; age calculation using CURDATE() is NOT DETERMINISTIC.",
    level: "basic"
  },
  {
    question: "What does the `NO SQL` characteristic declare?",
    shortAnswer: "The routine contains no SQL statements at all (it performs only pure in-memory mathematical calculations or string manipulation).",
    explanation: "Pure algorithmic routine characteristic.",
    hint: "Routine contains no SQL statements (pure in-memory logic).",
    level: "basic"
  },
  {
    question: "What does the `READS SQL DATA` characteristic declare?",
    shortAnswer: "The routine contains `SELECT` queries that read data from database tables, but does not execute any `INSERT`, `UPDATE`, or `DELETE` statements.",
    explanation: "Read-only data access characteristic.",
    hint: "Routine reads table data with SELECT, but modifies nothing.",
    level: "basic"
  },
  {
    question: "What does the `MODIFIES SQL DATA` characteristic declare?",
    shortAnswer: "The routine executes `INSERT`, `UPDATE`, or `DELETE` statements that alter database tables.",
    explanation: "DML modification characteristic.",
    hint: "Routine modifies table data with INSERT, UPDATE, or DELETE.",
    level: "basic"
  },
  {
    question: "What does the `CONTAINS SQL` characteristic declare?",
    shortAnswer: "The routine contains SQL statements (like variable assignments `SET @x = 1`), but neither reads nor writes table data (this is the default in MySQL).",
    explanation: "Default data access characteristic in MySQL.",
    hint: "Routine contains SQL statements that neither read nor write tables.",
    level: "moderate"
  },
  {
    question: "Why does MySQL 8.0 require a function to be `DETERMINISTIC` to create a Functional Index?",
    shortAnswer: "Because the index stores precomputed B-Tree values on disk; if the function output were to change unpredictably (non-deterministic), the stored index values would become invalid and corrupt search results.",
    explanation: "Functional index integrity constraint.",
    hint: "Index precomputes values; non-deterministic functions would corrupt the index.",
    level: "expert"
  },
  {
    question: "What happens if a developer falsely declares a function as `DETERMINISTIC` when it actually calls `NOW()`?",
    shortAnswer: "MySQL allows the creation, but the Query Optimizer and replication engine may cache or replicate wrong results, causing subtle data corruption or stale query outputs.",
    explanation: "False determinism hazard in database engines.",
    hint: "Query optimizer may cache stale results or replicate corrupted data.",
    level: "expert"
  },
  {
    question: "How does the MySQL Query Optimizer utilize the `DETERMINISTIC` characteristic during query execution?",
    shortAnswer: "For deterministic functions called with constant literal parameters, the optimizer can evaluate the function ONCE at plan compilation time (constant folding) rather than re-evaluating it for every row.",
    explanation: "Constant folding query optimization.",
    hint: "Evaluates the function once at plan time (constant folding).",
    level: "expert"
  },
  {
    question: "Can a function declared as `NO SQL` contain a `SELECT ... INTO` statement?",
    shortAnswer: "MySQL does not strictly enforce this at compile time, but doing so violates the metadata contract and can disrupt optimizer assumptions and replication logging.",
    explanation: "Characteristic adherence and contract integrity.",
    hint: "Violates the metadata contract and disrupts optimizer assumptions.",
    level: "moderate"
  },
  {
    question: "Is a function that reads a database table considered `DETERMINISTIC` or `NOT DETERMINISTIC`?",
    shortAnswer: "It should be declared `NOT DETERMINISTIC` (with `READS SQL DATA`) because the underlying table data can be modified between query executions.",
    explanation: "Table mutability impact on determinism.",
    hint: "NOT DETERMINISTIC, because underlying table data can change.",
    level: "expert"
  },
  {
    question: "How do you view the declared characteristics of an existing function?",
    shortAnswer: "`SELECT ROUTINE_NAME, IS_DETERMINISTIC, SQL_DATA_ACCESS FROM information_schema.ROUTINES WHERE ROUTINE_NAME = 'func_name';`.",
    explanation: "Data dictionary inspection of routine characteristics.",
    hint: "Query information_schema.ROUTINES for IS_DETERMINISTIC and SQL_DATA_ACCESS.",
    level: "moderate"
  },
  {
    question: "Can a Stored Procedure also declare `DETERMINISTIC` and `READS SQL DATA` characteristics?",
    shortAnswer: "YES; stored procedures accept the same characteristics, though they are primarily critical for functions regarding replication and functional indexing.",
    explanation: "Procedure characteristic support.",
    hint: "Yes, procedures support the same characteristic clauses.",
    level: "basic"
  },
  {
    question: "What is the default determinism characteristic in MySQL if omitted during function creation?",
    shortAnswer: "`NOT DETERMINISTIC`.",
    explanation: "Default determinism assumption in MySQL.",
    hint: "Defaults to NOT DETERMINISTIC.",
    level: "basic"
  },
  {
    question: "What is the default SQL data access characteristic if omitted?",
    shortAnswer: "`CONTAINS SQL`.",
    explanation: "Default data access assumption in MySQL.",
    hint: "Defaults to CONTAINS SQL.",
    level: "basic"
  },
  {
    question: "How do you create a deterministic string formatting function for student roll numbers?",
    shortAnswer: "`CREATE FUNCTION fn_format_roll(id INT) RETURNS VARCHAR(20) DETERMINISTIC NO SQL BEGIN RETURN CONCAT('BKP-2026-', LPAD(id, 4, '0')); END`.",
    explanation: "Pure deterministic formatting function.",
    hint: "DETERMINISTIC NO SQL returning formatted roll string.",
    level: "basic"
  },
  {
    question: "How do you create a function that reads department discount rates with `READS SQL DATA`?",
    shortAnswer: "`CREATE FUNCTION fn_dept_discount(d_id INT) RETURNS DECIMAL(5,2) NOT DETERMINISTIC READS SQL DATA BEGIN DECLARE v_d DECIMAL(5,2); SELECT discount INTO v_d FROM departments WHERE dept_id = d_id; RETURN v_d; END`.",
    explanation: "Function querying database tables with READS SQL DATA.",
    hint: "NOT DETERMINISTIC READS SQL DATA with SELECT ... INTO query.",
    level: "moderate"
  },
  {
    question: "Can Row-Based Replication (RBR) mitigate some non-deterministic function replication risks?",
    shortAnswer: "YES; in Row-Based Replication (`binlog_format = ROW`), MySQL logs the actual modified row images rather than the function statement, reducing non-deterministic replication drift.",
    explanation: "Row-based vs statement-based binary logging.",
    hint: "Yes, Row-Based Replication logs final row values rather than SQL statements.",
    level: "expert"
  },
  {
    question: "What happens if you alter the body of a deterministic function without dropping it?",
    shortAnswer: "MySQL does not support `ALTER FUNCTION` to change the function body; you must `DROP FUNCTION` and re-create it with `CREATE FUNCTION`.",
    explanation: "Routine alteration constraints in MySQL.",
    hint: "Must DROP FUNCTION and re-create with CREATE FUNCTION.",
    level: "basic"
  },
  {
    question: "Why is `RAND()` considered non-deterministic in SQL?",
    shortAnswer: "Because `RAND()` generates a pseudorandom number that changes on every single evaluation, returning different results for every row.",
    explanation: "Random number generator non-determinism.",
    hint: "Returns a different random number on every evaluation.",
    level: "basic"
  },
  {
    question: "Why is `UUID()` considered non-deterministic in SQL?",
    shortAnswer: "Because `UUID()` generates a globally unique identifier containing timestamp and hardware clock sequences that change every millisecond.",
    explanation: "UUID generator non-determinism.",
    hint: "Generates a unique identifier that changes every millisecond.",
    level: "basic"
  },
  {
    question: "Can a deterministic function call a non-deterministic built-in function like `NOW()`?",
    shortAnswer: "Syntactically MySQL allows it, but it constitutes a severe design defect that violates the determinism contract and breaks replication consistency.",
    explanation: "Contract violation hazard.",
    hint: "Never call non-deterministic functions (NOW, RAND) inside a DETERMINISTIC function.",
    level: "expert"
  },
  {
    question: "How do you check if binary logging is active on your MySQL server instance?",
    shortAnswer: "`SHOW VARIABLES LIKE 'log_bin';` (returns 'ON' or 'OFF').",
    explanation: "Server binary logging status inspection.",
    hint: "SHOW VARIABLES LIKE 'log_bin';",
    level: "basic"
  },
  {
    question: "What security role is required to set `log_bin_trust_function_creators = 1`?",
    shortAnswer: "`SYSTEM_VARIABLES_ADMIN` or `SUPER` administrative privilege.",
    explanation: "Global system variable privilege.",
    hint: "SUPER or SYSTEM_VARIABLES_ADMIN privilege.",
    level: "expert"
  },
  {
    question: "How does functional indexing improve `WHERE` clause performance on deterministic functions?",
    shortAnswer: "By indexing the function output B-Tree directly, allowing MySQL to perform fast index range scans ($O(\\log N)$) instead of scanning all table rows ($O(N)$).",
    explanation: "Query optimization with functional indexes.",
    hint: "Enables fast B-Tree index range scans instead of full table scans.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Deterministic Functions & Characteristics in MySQL?",
    shortAnswer: "Always declare accurate characteristics (`DETERMINISTIC` for pure math/formatting, `NOT DETERMINISTIC` for temporal/random/table queries); specify exact data access (`NO SQL`, `READS SQL DATA`), enforce `log_bin` replication safety, and leverage `DETERMINISTIC` functions to build high-speed Functional Indexes in MySQL 8.0.",
    explanation: "Authoritative architectural best practices for function characteristics.",
    hint: "Accurate determinism + precise SQL data access + log_bin safety + functional indexing.",
    level: "expert"
  }
];

export default questions;
