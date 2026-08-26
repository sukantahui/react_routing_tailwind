// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary difference between a flat-file system and a Relational Database Management System (RDBMS)?",
    shortAnswer: "Flat-file systems suffer from data redundancy, lack concurrency control, and have no built-in referential integrity; RDBMS organizes data into structured tables with strict integrity constraints, ACID transactions, and declarative SQL querying.",
    explanation: "RDBMS provides centralized control, eliminates anomalies, and enables secure multi-user concurrency.",
    hint: "RDBMS uses structured relations, enforces integrity constraints, and supports ACID transactions.",
    level: "basic"
  },
  {
    question: "Which of the following commands is a Data Definition Language (DDL) command in SQL?",
    shortAnswer: "`CREATE`, `ALTER`, `DROP`, `TRUNCATE`, and `RENAME` are DDL commands because they define or alter schema structures.",
    explanation: "DML commands manipulate rows (`INSERT`, `UPDATE`, `DELETE`), whereas DDL commands define table structures.",
    hint: "DDL defines schema structures (CREATE, ALTER, DROP, TRUNCATE).",
    level: "basic"
  },
  {
    question: "What is a Candidate Key in relational database theory?",
    shortAnswer: "A Candidate Key is a minimal superkey—a column or set of columns that can uniquely identify any row in a table without containing redundant attributes.",
    explanation: "One candidate key is selected as the Primary Key; the remaining candidate keys become Alternate Keys.",
    hint: "A minimal set of attributes that uniquely identifies a row in a table.",
    level: "basic"
  },
  {
    question: "Why can a Primary Key never contain `NULL` values?",
    shortAnswer: "Due to the **Entity Integrity Rule**, which mandates that every record in a relation must be uniquely identifiable. A `NULL` signifies missing or unknown data, which cannot serve as an identifier.",
    explanation: "Allowing NULL in a primary key breaks relational identity.",
    hint: "Entity Integrity requires every record to have a known, unique identifier.",
    level: "basic"
  },
  {
    question: "What is the difference between `DROP TABLE` and `TRUNCATE TABLE`?",
    shortAnswer: "`DROP TABLE` deletes the table data along with its schema definition from the database; `TRUNCATE TABLE` empties all rows and resets `AUTO_INCREMENT` counters while preserving table structure.",
    explanation: "`TRUNCATE` is a fast DDL command that deallocates data pages rather than logging row-by-row deletions.",
    hint: "DROP removes data and schema; TRUNCATE deletes all rows and resets sequence while keeping schema.",
    level: "basic"
  },
  {
    question: "What happens when you execute `WHERE balance = NULL` in SQL?",
    shortAnswer: "It returns an empty result set (0 rows) because comparing anything to `NULL` using `= NULL` evaluates to `UNKNOWN` (falsy) under SQL three-valued logic. You must use `IS NULL`.",
    explanation: "In SQL, NULL represents an unknown value, so equality comparisons always evaluate to UNKNOWN.",
    hint: "Equality comparisons with NULL return UNKNOWN; use IS NULL instead.",
    level: "basic",
    codeExample: "SELECT * FROM student_records WHERE balance_fee IS NULL;"
  },
  {
    question: "What is the function of a Foreign Key constraint in MySQL?",
    shortAnswer: "It enforces **Referential Integrity** between two tables, ensuring that a value in the child table column must match an existing primary/unique key value in the parent table.",
    explanation: "Prevents orphaned child records and invalid cross-table references.",
    hint: "Enforces referential integrity by linking child column values to parent primary keys.",
    level: "basic"
  },
  {
    question: "What does the `AUTO_INCREMENT` attribute do in MySQL?",
    shortAnswer: "It automatically generates a unique sequential integer for each new row inserted into a primary or unique key column.",
    explanation: "Simplifies surrogate primary key generation without needing manual sequence counters.",
    hint: "Generates sequential numbers automatically on new row inserts.",
    level: "basic"
  },
  {
    question: "How does the `LIKE 'B%'` pattern match differ from `LIKE '%B'`?",
    shortAnswer: "`LIKE 'B%'` matches any string that starts with the letter 'B'; `LIKE '%B'` matches any string that ends with the letter 'B'.",
    explanation: "The `%` wildcard matches zero or more characters; placing it at the end enables index range seeks.",
    hint: "'B%' starts with B (sargable); '%B' ends with B (requires full scan).",
    level: "basic"
  },
  {
    question: "What is the difference between `CHAR(20)` and `VARCHAR(20)` data types?",
    shortAnswer: "`CHAR(20)` is fixed-length, always consuming 20 characters and right-padding with spaces; `VARCHAR(20)` is variable-length, storing only the actual string length plus a 1-byte length prefix.",
    explanation: "`CHAR` is optimal for fixed-length codes (like 2-letter state codes); `VARCHAR` saves space for variable text.",
    hint: "CHAR is fixed-length with space padding; VARCHAR is variable-length based on actual characters.",
    level: "basic"
  },
  {
    question: "What does `ORDER BY gpa DESC, name ASC` accomplish?",
    shortAnswer: "It sorts the result set primarily by `gpa` in descending order (highest first); if two students have identical GPAs, it sorts them secondarily by `name` in alphabetical order.",
    explanation: "Multiple `ORDER BY` columns provide deterministic multi-level sorting.",
    hint: "Primary sort on GPA descending; tie-breaker sort on name ascending.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `LIMIT 10 OFFSET 20` clause in MySQL?",
    shortAnswer: "It skips the first 20 records and returns the next 10 records (useful for pagination, e.g. displaying Page 3 of 10 items per page).",
    explanation: "Can also be written using the shorthand `LIMIT 20, 10`.",
    hint: "Skips 20 rows and returns the next 10 rows for pagination.",
    level: "basic"
  },
  {
    question: "What is a Composite Primary Key?",
    shortAnswer: "A primary key composed of two or more columns that together uniquely identify a row in a table (e.g. in junction tables: `PRIMARY KEY (student_id, course_id)`).",
    explanation: "Used when no single column is uniquely selective on its own.",
    hint: "A primary key composed of multiple columns to ensure unique combination.",
    level: "basic"
  },
  {
    question: "What does the `CHECK` constraint enforce in MySQL 8.0?",
    shortAnswer: "It enforces a boolean condition that all inserted or updated values in a column must satisfy (e.g. `CHECK (age >= 18)` or `CHECK (fee_paid >= 0)`).",
    explanation: "MySQL 8.0 actively evaluates and enforces CHECK constraints, rejecting invalid rows with an error.",
    hint: "Enforces custom validation expressions on column values.",
    level: "basic",
    codeExample: "CREATE TABLE student_records (\n  age INT CHECK (age >= 18)\n);"
  },
  {
    question: "What is the difference between `UNIQUE` constraint and `PRIMARY KEY` constraint?",
    shortAnswer: "A table can have only **one** `PRIMARY KEY` (which forbids NULLs); a table can have **multiple** `UNIQUE` constraints (which allow NULL values unless defined with `NOT NULL`).",
    explanation: "Unique constraints guarantee distinctness for non-primary attributes like email or phone.",
    hint: "Only one Primary Key per table (no NULLs); multiple Unique constraints allowed (allows NULLs).",
    level: "basic"
  },
  {
    question: "What is the effect of the `DISTINCT` keyword in a `SELECT` statement?",
    shortAnswer: "It removes duplicate rows from the query output, returning only unique combinations of the projected columns.",
    explanation: "Evaluates uniqueness across all selected columns in the projection list.",
    hint: "Eliminates duplicate output rows across selected columns.",
    level: "basic"
  },
  {
    question: "How do you add a new column to an existing table using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE table_name ADD COLUMN column_name data_type [constraints];`",
    explanation: "Modifies table metadata to include the new column at the end of the table (or using `AFTER col`).",
    hint: "ALTER TABLE tbl ADD COLUMN col_name datatype;",
    level: "basic",
    codeExample: "ALTER TABLE student_records ADD COLUMN blood_group VARCHAR(5) DEFAULT 'O+';"
  },
  {
    question: "What is an Alternate Key?",
    shortAnswer: "Any Candidate Key that was NOT selected as the Primary Key for the table.",
    explanation: "Alternate keys are typically enforced using `UNIQUE NOT NULL` constraints.",
    hint: "A candidate key that was not chosen as the primary key.",
    level: "basic"
  },
  {
    question: "What does `BETWEEN 1000 AND 5000` evaluate in SQL?",
    shortAnswer: "It is an inclusive range check equivalent to `>= 1000 AND <= 5000`, matching all values between 1,000 and 5,000 inclusive.",
    explanation: "Includes both lower and upper boundary values in the search range.",
    hint: "Inclusive range filter equivalent to >= 1000 AND <= 5000.",
    level: "basic"
  },
  {
    question: "What does the `IN ('Kolkata', 'Barrackpore', 'Ichapur')` clause do?",
    shortAnswer: "It filters rows where the column value matches any element in the specified list of discrete values, replacing multiple `OR` conditions.",
    explanation: "Cleaner and more readable than writing `city = 'Kolkata' OR city = 'Barrackpore' OR ...`.",
    hint: "Matches against a discrete list of values, replacing OR chains.",
    level: "basic"
  },
  {
    question: "What is the underscore (`_`) wildcard in SQL `LIKE` operator?",
    shortAnswer: "It matches exactly **one** single character in any position (e.g. `LIKE 'K_lkata'` matches 'Kolkata' or 'Kalkata').",
    explanation: "Unlike `%` which matches zero or more characters, `_` matches strictly one character.",
    hint: "Matches exactly one single character in pattern matching.",
    level: "basic"
  },
  {
    question: "What is the function of the `DEFAULT` constraint in MySQL?",
    shortAnswer: "It automatically supplies a fallback literal value for a column when an `INSERT` statement omits that column.",
    explanation: "Ensures columns have predictable baseline values without requiring application logic.",
    hint: "Provides automatic fallback value when column is omitted in INSERT.",
    level: "basic"
  },
  {
    question: "How do you rename an existing table in MySQL?",
    shortAnswer: "`RENAME TABLE old_name TO new_name;` or `ALTER TABLE old_name RENAME TO new_name;`.",
    explanation: "Performs an atomic metadata rename without copying table data.",
    hint: "RENAME TABLE old_tbl TO new_tbl;",
    level: "basic",
    codeExample: "RENAME TABLE student_records TO candidate_ledgers;"
  },
  {
    question: "What happens when you execute an `UPDATE` statement without a `WHERE` clause?",
    shortAnswer: "It updates **every single row** in the entire table to the specified value, which can cause catastrophic unintended data loss.",
    explanation: "MySQL Workbench includes 'Safe Update Mode' (`SQL_SAFE_UPDATES = 1`) to block accidental table-wide updates.",
    hint: "Modifies every row in the table; always include a WHERE clause!",
    level: "basic"
  },
  {
    question: "What happens when you execute a `DELETE` statement without a `WHERE` clause?",
    shortAnswer: "It deletes all records from the table row-by-row while keeping the table structure intact (slower than `TRUNCATE`).",
    explanation: "Always specify a WHERE clause with Primary Key or selective criteria for safe deletions.",
    hint: "Deletes all rows individually in the table.",
    level: "basic"
  },
  {
    question: "What does `DESCRIBE table_name;` (or `DESC table_name;`) display?",
    shortAnswer: "It displays the schema definition: column names, data types, NULL allowance, Key status (PRI, UNI, MUL), default values, and extra attributes (`auto_increment`).",
    explanation: "Provides quick interactive structural inspection of table attributes.",
    hint: "Displays column definitions, data types, nullability, keys, and defaults.",
    level: "basic",
    codeExample: "DESCRIBE student_records;"
  },
  {
    question: "What is a Foreign Key 'orphan record'?",
    shortAnswer: "A child record whose foreign key value references a non-existent parent primary key (prevented when Foreign Key checks are active).",
    explanation: "Referential integrity guarantees orphan records cannot be created.",
    hint: "A child row referencing a parent ID that does not exist.",
    level: "basic"
  },
  {
    question: "What is the purpose of column aliasing using the `AS` keyword in `SELECT`?",
    shortAnswer: "To assign a temporary, descriptive display name to a column or calculated expression in query results without altering database schema.",
    explanation: "Improves result set readability for reporting and application consumption.",
    hint: "Assigns temporary display labels to columns in query outputs.",
    level: "basic",
    codeExample: "SELECT student_id AS ID, balance_fee * 1.18 AS Total_Fee_With_GST FROM student_records;"
  },
  {
    question: "Can a table have multiple Foreign Keys referencing different parent tables?",
    shortAnswer: "Yes! A child table can have multiple foreign key columns referencing multiple distinct parent tables (e.g. an `enrollments` table referencing both `students` and `courses`).",
    explanation: "Enables building multi-entity relational webs and junction tables.",
    hint: "Yes, child tables can link to multiple distinct parent tables.",
    level: "basic"
  },
  {
    question: "What is the primary pedagogical goal of Segment 1 in the RDBMS MySQL roadmap?",
    shortAnswer: "To build an unbreakable foundation in relational data modeling, schema creation (DDL), data manipulation (DML), integrity constraints, and precise SQL data querying.",
    explanation: "Mastering Segment 1 ensures smooth progression into complex normalization, multi-table joins, transactions, and performance tuning.",
    hint: "Mastering relational modeling, DDL/DML, constraints, and foundational SQL querying.",
    level: "basic"
  }
];

export default questions;
