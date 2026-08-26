// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What causes MySQL Error 1064 (42000): 'You have an error in your SQL syntax'?",
    shortAnswer: "Common causes include: 1) Trailing commas before closing parentheses in `CREATE TABLE`, 2) Unquoted reserved keywords used as column names (e.g. `order`, `group`), 3) Mismatched quotes or parentheses, or 4) Misspelled SQL keywords.",
    explanation: "MySQL Parser fails to parse the token sequence into an Abstract Syntax Tree.",
    hint: "Syntax mistake such as trailing commas, unquoted reserved words, or unclosed parentheses.",
    level: "basic"
  },
  {
    question: "How do you safely use a reserved SQL keyword (like `order` or `group`) as a column name?",
    shortAnswer: "Wrap the identifier in backticks: `` `order` `` or `` `group` ``.",
    explanation: "Backticks tell the MySQL parser that the token is an identifier, not a language keyword.",
    hint: "Wrap reserved words in backticks `...`.",
    level: "basic",
    codeExample: "CREATE TABLE transactions (\n  transaction_id INT PRIMARY KEY,\n  `order` INT NOT NULL\n);"
  },
  {
    question: "What causes MySQL Error 1062 (23000): 'Duplicate entry ... for key ...'?",
    shortAnswer: "Attempting to insert or update a row with a value that already exists in a column with a `PRIMARY KEY` or `UNIQUE` constraint.",
    explanation: "Enforces unique entity and alternate key identity across the table.",
    hint: "Inserting a duplicate value into a Primary Key or UNIQUE column.",
    level: "basic"
  },
  {
    question: "What is the difference between MySQL Error 1452 and Error 1451?",
    shortAnswer: "Error 1452 occurs on the **child table** when inserting an invalid foreign key that does not exist in the parent table; Error 1451 occurs on the **parent table** when attempting to delete a row that is still referenced by children under `RESTRICT`.",
    explanation: "1452 blocks invalid child insertion; 1451 blocks orphaned parent deletion.",
    hint: "1452 = Child insertion failed (no parent); 1451 = Parent deletion failed (active children).",
    level: "expert"
  },
  {
    question: "Why does the query `SELECT * FROM students WHERE balance_fee = NULL;` execute without errors but return 0 rows?",
    shortAnswer: "Because in SQL three-valued logic, comparing anything to `NULL` using `= NULL` evaluates to `UNKNOWN` (falsy). To find NULL values, you must use `IS NULL`.",
    explanation: "This is a classic silent semantic bug that produces no syntax error.",
    hint: "Equality with NULL evaluates to UNKNOWN; always use IS NULL.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE balance_fee IS NULL;"
  },
  {
    question: "What causes MySQL Error 1054 (42S22): 'Unknown column ... in where clause'?",
    shortAnswer: "A typo in the column name, referencing a column from a table not included in the `FROM`/`JOIN` clause, or using double quotes around string literals in strict ANSI mode.",
    explanation: "Check the exact column spelling with `DESCRIBE table_name;`.",
    hint: "Typo in column name or referencing a column from an unjoined table.",
    level: "basic"
  },
  {
    question: "What causes MySQL Error 1146 (42S02): 'Table ... doesn't exist'?",
    shortAnswer: "Either: 1) A typo in the table name, 2) Forgetting to select the active database with `USE db_name;`, or 3) Case-sensitivity differences between operating systems (Linux table names are case-sensitive by default).",
    explanation: "Verify active database with `SELECT DATABASE();` and list tables with `SHOW TABLES;`.",
    hint: "Typo, missing USE database command, or Linux case-sensitivity differences.",
    level: "basic"
  },
  {
    question: "What causes MySQL Error 3819 (HY000): 'Check constraint ... is violated'?",
    shortAnswer: "An `INSERT` or `UPDATE` statement attempted to supply a value that evaluated to `FALSE` under an active `CHECK` constraint (e.g. `CHECK (age >= 18)`).",
    explanation: "MySQL 8.0 strictly validates data against CHECK constraints.",
    hint: "Inserted or updated data violated a custom CHECK constraint expression.",
    level: "basic"
  },
  {
    question: "What causes MySQL Error 1175 (HY000): 'You are using safe update mode...'?",
    shortAnswer: "Executing an `UPDATE` or `DELETE` statement in MySQL Workbench without a `WHERE` clause that specifies a Key (Primary or Unique Key) column when `SQL_SAFE_UPDATES = 1`.",
    explanation: "Safe update mode protects developers from accidental table-wide data wipes.",
    hint: "Attempting to UPDATE/DELETE without a primary key WHERE condition in safe mode.",
    level: "basic"
  },
  {
    question: "How do you disable Safe Update Mode for the current session if a batch update is legitimately needed?",
    shortAnswer: "`SET SQL_SAFE_UPDATES = 0;` (and re-enable it afterward with `SET SQL_SAFE_UPDATES = 1;`).",
    explanation: "Temporarily lifts the key-column requirement for maintenance scripts.",
    hint: "SET SQL_SAFE_UPDATES = 0;",
    level: "basic",
    codeExample: "SET SQL_SAFE_UPDATES = 0;\nUPDATE students SET city = 'Barrackpore' WHERE city IS NULL;\nSET SQL_SAFE_UPDATES = 1;"
  },
  {
    question: "What causes MySQL Error 1048 (23000): 'Column ... cannot be null'?",
    shortAnswer: "Attempting to insert an explicit `NULL` value (or omitting a column that has no `DEFAULT` value) into a column defined with `NOT NULL`.",
    explanation: "Enforces mandatory presence of values on critical attributes.",
    hint: "Inserting NULL into a column defined with NOT NULL constraint.",
    level: "basic"
  },
  {
    question: "What is the semantic difference between Single Quotes `'...'` and Backticks ``` `...` ``` in MySQL?",
    shortAnswer: "Single quotes `'...'` enclose string literals and date values (`'Kolkata'`, `'2026-08-25'`); Backticks ``` `...` ``` enclose table, database, and column identifiers (`` `students` ``, `` `first_name` ``).",
    explanation: "Confusing them causes syntax Error 1064 or unknown column Error 1054.",
    hint: "Single quotes for text literals; Backticks for database/table/column names.",
    level: "basic"
  },
  {
    question: "Why does `WHERE city = 'Kolkata' OR city = 'Barrackpore' AND age > 20` produce unexpected results?",
    shortAnswer: "Because `AND` has higher operator precedence than `OR`. The query is evaluated as `WHERE city = 'Kolkata' OR (city = 'Barrackpore' AND age > 20)`. Use parentheses to enforce desired grouping.",
    explanation: "Always use explicit parentheses around `OR` conditions.",
    hint: "AND evaluates before OR; wrap OR expressions in parentheses.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE (city = 'Kolkata' OR city = 'Barrackpore') AND age > 20;"
  },
  {
    question: "What happens if you execute `INSERT INTO tbl VALUES (...)` without specifying column names and the schema changes?",
    shortAnswer: "The query will fail with Error 1136 (Column count doesn't match value count) as soon as an `ALTER TABLE ADD COLUMN` is executed on the table.",
    explanation: "Always explicitly specify the target column list in production `INSERT` statements.",
    hint: "Fails when columns are added/removed; always specify explicit column lists.",
    level: "basic"
  },
  {
    question: "What causes Error 1215 (HY000): 'Cannot add foreign key constraint' during `CREATE TABLE`?",
    shortAnswer: "A data type or unsignedness mismatch between the child foreign key column and parent primary key column, or missing primary/unique index on the referenced parent column.",
    explanation: "Both columns must match data type, size, and signedness (`INT UNSIGNED` with `INT UNSIGNED`).",
    hint: "Data type, length, or unsignedness mismatch between child and parent key.",
    level: "expert"
  },
  {
    question: "What causes a silent Cartesian Product (Cartesian Explosion) in a query?",
    shortAnswer: "Performing a `JOIN` without specifying an `ON` condition (or joining with `CROSS JOIN` inadvertently), multiplying table rows ($N \\times M$).",
    explanation: "Produces massive unexpected row volumes and freezes query execution.",
    hint: "Missing ON join condition produces Cartesian product of all rows.",
    level: "basic"
  },
  {
    question: "Why does `BETWEEN '2026-08-01' AND '2026-08-31'` miss records with timestamp '2026-08-31 15:30:00' on a DATETIME column?",
    shortAnswer: "Because `'2026-08-31'` is interpreted as `'2026-08-31 00:00:00'`, excluding any transactions that occurred later that afternoon. Use `>= '2026-08-01' AND < '2026-09-01'` instead.",
    explanation: "Date literal boundaries on DATETIME columns exclude timestamps past midnight.",
    hint: "Literal date evaluates to midnight 00:00:00; use exclusive next-month bounds.",
    level: "expert"
  },
  {
    question: "What is the best diagnostic command to check the exact columns, nullability, and keys of a table?",
    shortAnswer: "`DESCRIBE table_name;` (or `SHOW COLUMNS FROM table_name;`).",
    explanation: "Instantly confirms column names, data types, nullability, and primary key status.",
    hint: "DESCRIBE table_name;",
    level: "basic"
  },
  {
    question: "What diagnostic command displays the exact DDL script and constraint names used by MySQL to build a table?",
    shortAnswer: "`SHOW CREATE TABLE table_name;`",
    explanation: "Displays all explicit and implicit constraints, indexes, foreign key names, and table options.",
    hint: "SHOW CREATE TABLE table_name;",
    level: "basic"
  },
  {
    question: "What causes Error 1075 (42000): 'Incorrect table definition; there can be only one auto column and it must be defined as a key'?",
    shortAnswer: "Attempting to define a column with `AUTO_INCREMENT` without also defining it as a `PRIMARY KEY` or `UNIQUE` key.",
    explanation: "`AUTO_INCREMENT` columns must be indexed in MySQL.",
    hint: "AUTO_INCREMENT requires the column to be a primary or unique key.",
    level: "basic"
  },
  {
    question: "How do you debug an `INSERT INTO ... SELECT` statement that fails with duplicate key error?",
    shortAnswer: "Run the `SELECT` query independently to inspect whether the source data contains duplicate values or already exists in the target table.",
    explanation: "Isolate and test the SELECT subquery independently before running the insert.",
    hint: "Isolate and test the SELECT portion independently to check for duplicate records.",
    level: "basic"
  },
  {
    question: "What causes Error 1264 (22003): 'Out of range value for column'?",
    shortAnswer: "Attempting to insert a number that exceeds the maximum/minimum limit of the column's data type (e.g. inserting 500 into `TINYINT UNSIGNED` which has a max of 255).",
    explanation: "Check the numerical bounds of `TINYINT`, `SMALLINT`, `INT`, `BIGINT`, or `DECIMAL`.",
    hint: "Inserted number exceeds the maximum range of the data type.",
    level: "basic"
  },
  {
    question: "Why should you check `SELECT @@sql_mode;` when debugging unexpected query behavior?",
    shortAnswer: "Because `sql_mode` dictates strictness rules such as `STRICT_TRANS_TABLES`, `NO_ZERO_DATE`, and `ONLY_FULL_GROUP_BY`.",
    explanation: "Different SQL modes can cause queries that work on one server to throw errors on another.",
    hint: "SQL modes determine strictness, zero-date handling, and group-by validation.",
    level: "expert"
  },
  {
    question: "What causes Error 1406 (22001): 'Data too long for column'?",
    shortAnswer: "Attempting to insert a string that contains more characters than the declared `VARCHAR(N)` or `CHAR(N)` column length under strict SQL mode.",
    explanation: "Increase column length with `ALTER TABLE tbl MODIFY col VARCHAR(NEW_SIZE)`.",
    hint: "String length exceeds declared column capacity.",
    level: "basic"
  },
  {
    question: "How do you identify which database you are currently connected to in MySQL CLI?",
    shortAnswer: "`SELECT DATABASE();`",
    explanation: "Returns the name of the active database schema or `NULL` if none is selected.",
    hint: "SELECT DATABASE();",
    level: "basic"
  },
  {
    question: "Why does `WHERE name LIKE '%Hui'` cause a full table scan while `WHERE name LIKE 'Hui%'` can use an index?",
    shortAnswer: "Leading wildcards (`%Hui`) prevent B-Tree index range seeks (non-sargable); trailing wildcards (`Hui%`) allow efficient index prefix range scans.",
    explanation: "B-Trees are sorted from left to right.",
    hint: "Leading wildcards prevent B-Tree prefix matching, forcing full table scans.",
    level: "expert"
  },
  {
    question: "What causes Error 1052 (23000): 'Column ... in field list is ambiguous'?",
    shortAnswer: "Selecting a column name that exists in multiple joined tables without prefixing it with its table alias (e.g. selecting `id` instead of `s.id` or `c.id`).",
    explanation: "Prefix shared column names with table aliases to resolve ambiguity.",
    hint: "Selecting a column that exists in multiple joined tables without table alias prefix.",
    level: "basic",
    codeExample: "SELECT s.student_id, s.name, c.course_name FROM students s JOIN courses c ON s.course_id = c.course_id;"
  },
  {
    question: "How do you view recent MySQL warnings after running a query?",
    shortAnswer: "`SHOW WARNINGS;`",
    explanation: "Displays non-fatal warning messages such as truncated strings, type conversions, or invalid dates.",
    hint: "SHOW WARNINGS;",
    level: "basic"
  },
  {
    question: "What is the recommended 3-step debugging protocol when encountering any MySQL error?",
    shortAnswer: "1) Read the exact Error Code and message, 2) Run `DESCRIBE table_name;` to verify schema, types, and constraints, 3) Isolate and execute small sub-clauses of the SQL statement independently.",
    explanation: "Systematic isolation saves hours compared to guessing code changes.",
    hint: "1) Read Error Code, 2) Inspect Schema with DESCRIBE, 3) Isolate and test query parts.",
    level: "basic"
  },
  {
    question: "What is the primary pedagogical goal of Topic 4 for beginner SQL developers?",
    shortAnswer: "To demystify error codes, transform cryptic error messages into actionable debugging steps, and build confidence in troubleshooting syntax, constraint, and semantic SQL issues.",
    explanation: "Debugging proficiency is what transforms a student into an independent, job-ready developer.",
    hint: "Mastering error interpretation, constraint debugging, and systematic query troubleshooting.",
    level: "basic"
  }
];

export default questions;
