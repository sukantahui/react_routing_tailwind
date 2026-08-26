// topic7_files/topic7_questions.js

const questions = [
  {
    question: "Define the Entity Integrity Rule in relational database management.",
    shortAnswer: "The Entity Integrity Rule states that no primary key value (or any component of a composite primary key) can be `NULL`, guaranteeing that every record in a relation has a known, unique identifier.",
    explanation: "Fundamental requirement for relational row identity.",
    hint: "Mandates that Primary Keys cannot contain NULL values.",
    level: "basic"
  },
  {
    question: "Define the Referential Integrity Rule in relational databases.",
    shortAnswer: "The Referential Integrity Rule states that if a child table contains a foreign key, the foreign key value must either match an existing primary key value in the referenced parent table or be `NULL`.",
    explanation: "Prevents orphaned child records across relational tables.",
    hint: "Guarantees that Foreign Key values point to valid existing parent rows.",
    level: "basic"
  },
  {
    question: "What is the theoretical difference between a Superkey and a Candidate Key?",
    shortAnswer: "A Superkey is any set of attributes that uniquely identifies tuples in a table; a Candidate Key is a **minimal superkey** containing no extraneous or redundant attributes.",
    explanation: "Candidate keys are irreducible unique identifiers.",
    hint: "A Candidate Key is a minimal superkey with no redundant columns.",
    level: "basic"
  },
  {
    question: "What is an Alternate Key?",
    shortAnswer: "Any Candidate Key that was not chosen as the Primary Key for the relation (typically enforced using `UNIQUE NOT NULL`).",
    explanation: "Secondary unique identifier columns like email or national identity numbers.",
    hint: "Candidate key not selected as the primary key.",
    level: "basic"
  },
  {
    question: "Why does `TRUNCATE TABLE` execute faster than `DELETE FROM table_name`?",
    shortAnswer: "`TRUNCATE` is a DDL command that deallocates the underlying data pages and resets the high-water mark / auto-increment counter in one atomic operation, whereas `DELETE` logs and removes rows individually.",
    explanation: "Deallocates data pages directly rather than performing row-by-row undo/redo logging.",
    hint: "TRUNCATE deallocates pages directly; DELETE logs row-by-row deletions.",
    level: "basic"
  },
  {
    question: "What is the exact evaluation result of `SELECT 5 = NULL, 5 <> NULL, NULL = NULL, NULL IS NULL;` in MySQL?",
    shortAnswer: "`NULL, NULL, NULL, 1 (TRUE)` — All equality and inequality comparisons with `NULL` evaluate to `NULL` (UNKNOWN); only `IS NULL` evaluates to `1 (TRUE)`.",
    explanation: "Demonstrates standard SQL three-valued logic.",
    hint: "Comparisons with NULL yield NULL; IS NULL yields 1 (TRUE).",
    level: "expert",
    codeExample: "SELECT (5 = NULL) AS eq, (5 <> NULL) AS neq, (NULL = NULL) AS null_eq, (NULL IS NULL) AS is_null_check;"
  },
  {
    question: "What does `ON DELETE CASCADE` do on a Foreign Key relationship?",
    shortAnswer: "When a row in the parent table is deleted, all matching dependent rows in the child table are automatically deleted as well.",
    explanation: "Propagates deletions automatically down the parent-child hierarchy.",
    hint: "Automatically deletes child records when the referenced parent record is deleted.",
    level: "basic"
  },
  {
    question: "What does `ON DELETE RESTRICT` do on a Foreign Key relationship?",
    shortAnswer: "It prevents deletion of a parent record if there are any existing child records referencing it, throwing Error 1451.",
    explanation: "Protects parent rows from deletion while dependents exist.",
    hint: "Blocks deletion of parent records that have linked children.",
    level: "basic"
  },
  {
    question: "How do you add a new column with a `CHECK` constraint using `ALTER TABLE`?",
    shortAnswer: "`ALTER TABLE students ADD COLUMN gpa DECIMAL(3,2) CHECK (gpa BETWEEN 0.00 AND 10.00) DEFAULT 0.00;`",
    explanation: "Adds the decimal column with domain boundary validation.",
    hint: "ALTER TABLE tbl ADD COLUMN col datatype CHECK (...);",
    level: "basic"
  },
  {
    question: "What causes MySQL Error 1062 (23000)?",
    shortAnswer: "Attempting to insert or update a row with a value that already exists in a column defined with a `PRIMARY KEY` or `UNIQUE` constraint.",
    explanation: "Duplicate key violation on unique indexed columns.",
    hint: "Duplicate entry violation for a primary or unique key.",
    level: "basic"
  },
  {
    question: "What causes MySQL Error 1452 (23000)?",
    shortAnswer: "Attempting to insert or update a child row with a foreign key ID that does not exist in the referenced parent table.",
    explanation: "Referential integrity failure on child insertion.",
    hint: "Child foreign key points to a non-existent parent primary key.",
    level: "basic"
  },
  {
    question: "Why should monetary data always be stored in `DECIMAL(10,2)` rather than `FLOAT` or `DOUBLE`?",
    shortAnswer: "Because `DECIMAL` stores numbers in exact base-10 decimal format, eliminating binary floating-point rounding inaccuracies in financial balances.",
    explanation: "Guarantees exact cents and paise precision.",
    hint: "DECIMAL guarantees exact precision without floating point rounding errors.",
    level: "basic"
  },
  {
    question: "What is the difference between `LIKE 'Barrack%'` and `LIKE '%Barrack'` regarding database indexing?",
    shortAnswer: "`LIKE 'Barrack%'` has a leading static prefix, allowing the B-Tree index to perform an efficient range seek; `LIKE '%Barrack'` has a leading wildcard, forcing a full table scan.",
    explanation: "Sargable prefix pattern matching vs non-sargable full scans.",
    hint: "Trailing wildcard can use index range scan; leading wildcard forces full table scan.",
    level: "expert"
  },
  {
    question: "What does `LIMIT 10 OFFSET 30` accomplish in query pagination?",
    shortAnswer: "It skips the first 30 records and returns the next 10 records (representing Page 4 of a 10-items-per-page UI table).",
    explanation: "Client-side pagination slicing.",
    hint: "Skips 30 rows and returns the subsequent 10 rows.",
    level: "basic"
  },
  {
    question: "What happens when an `UPDATE` statement is executed without a `WHERE` clause?",
    shortAnswer: "It updates **every single row** in the entire table, causing widespread unintended data modification.",
    explanation: "Safe update mode (`SQL_SAFE_UPDATES`) is designed to block this mistake.",
    hint: "Modifies every row table-wide.",
    level: "basic"
  },
  {
    question: "What is a Composite Primary Key?",
    shortAnswer: "A primary key formed by combining two or more columns together to guarantee uniqueness when no single column is unique on its own.",
    explanation: "Frequently used in junction tables: `PRIMARY KEY (student_id, course_id)`.",
    hint: "A multi-column primary key ensuring unique combinations.",
    level: "basic"
  },
  {
    question: "Why should `SELECT *` be eliminated from production application code?",
    shortAnswer: "It transfers redundant data over the network, increases memory usage, breaks covering indexes, and risks breaking client applications if columns are added or reordered.",
    explanation: "Always project explicit, necessary column lists.",
    hint: "Wastes bandwidth, breaks covering indexes, and risks breaking apps on schema changes.",
    level: "basic"
  },
  {
    question: "How do you rename an existing column in MySQL 8.0?",
    shortAnswer: "`ALTER TABLE table_name RENAME COLUMN old_name TO new_name;`",
    explanation: "Clean declarative column renaming syntax in MySQL 8.0+.",
    hint: "ALTER TABLE tbl RENAME COLUMN old_name TO new_name;",
    level: "basic"
  },
  {
    question: "What is the purpose of `START TRANSACTION` and `COMMIT`?",
    shortAnswer: "To group multiple DML operations into an atomic transaction: either all changes are saved permanently (`COMMIT`), or all changes are reverted (`ROLLBACK`) on error.",
    explanation: "Enforces ACID Atomicity across multi-table operations.",
    hint: "Enforces atomic all-or-nothing execution across multiple statements.",
    level: "basic"
  },
  {
    question: "What does `LAST_INSERT_ID()` return in MySQL?",
    shortAnswer: "The first automatically generated `AUTO_INCREMENT` integer value set by the most recent `INSERT` statement on the active client connection.",
    explanation: "Thread-safe primary key retrieval for child insertions.",
    hint: "Returns the last generated auto-increment primary key ID on the connection.",
    level: "basic"
  },
  {
    question: "What does the `BETWEEN 100 AND 500` predicate evaluate in SQL?",
    shortAnswer: "It is an inclusive range check equivalent to `>= 100 AND <= 500`, including both 100 and 500 boundary values.",
    explanation: "Inclusive numerical or date range filtering.",
    hint: "Inclusive range filter equivalent to >= 100 AND <= 500.",
    level: "basic"
  },
  {
    question: "What does `IN ('Barrackpore', 'Kolkata', 'Ichapur')` do?",
    shortAnswer: "It checks whether a column value matches any element in the discrete set of values, functioning as a clean shorthand for multiple `OR` conditions.",
    explanation: "Set membership predicate.",
    hint: "Matches any value in the discrete list, replacing OR chains.",
    level: "basic"
  },
  {
    question: "What is the function of the `DEFAULT` attribute in column definitions?",
    shortAnswer: "It automatically supplies a fallback literal or expression value when an `INSERT` statement omits that column.",
    explanation: "Provides predictable baseline values without client application logic.",
    hint: "Supplies automatic fallback values when columns are omitted in INSERT.",
    level: "basic"
  },
  {
    question: "Why should `AUTO_INCREMENT` columns be defined as `UNSIGNED`?",
    shortAnswer: "Because primary key identifiers are never negative numbers; using `UNSIGNED` doubles positive capacity up to 4.29 billion IDs for `INT`.",
    explanation: "Maximizes integer storage capacity for primary keys.",
    hint: "Doubles positive ID capacity up to 4.29 billion records.",
    level: "expert"
  },
  {
    question: "What is the difference between single quotes `'...'` and backticks ``` `...` ``` in MySQL?",
    shortAnswer: "Single quotes `'...'` enclose string and date literals; backticks ``` `...` ``` enclose database, table, and column object identifiers.",
    explanation: "Critical syntax distinction to prevent Error 1064 and Error 1054.",
    hint: "Single quotes for text literals; Backticks for database/table/column names.",
    level: "basic"
  },
  {
    question: "How do you find students whose last name contains the substring 'Roy'?",
    shortAnswer: "`SELECT * FROM students WHERE last_name LIKE '%Roy%';`",
    explanation: "Uses `%` wildcards on both sides to match 'Roy' anywhere within the string.",
    hint: "WHERE last_name LIKE '%Roy%'",
    level: "basic"
  },
  {
    question: "What does `ORDER BY gpa DESC, full_name ASC` do?",
    shortAnswer: "Sorts records primarily by `gpa` in descending order (highest first); applies a secondary tie-breaker sort alphabetically by `full_name` in ascending order.",
    explanation: "Multi-level deterministic sorting.",
    hint: "Primary sort on GPA descending; secondary sort on full name ascending.",
    level: "basic"
  },
  {
    question: "What causes MySQL Error 1175 (Safe Update Mode)?",
    shortAnswer: "Attempting to execute an `UPDATE` or `DELETE` statement in MySQL Workbench without a `WHERE` clause that uses a Key column when `SQL_SAFE_UPDATES = 1`.",
    explanation: "Workbench safety feature protecting against unintended mass data overwrites.",
    hint: "Attempting UPDATE/DELETE without key column in WHERE under safe mode.",
    level: "basic"
  },
  {
    question: "Why must parent tables be created before child tables in DDL scripts?",
    shortAnswer: "Because child table foreign key constraints require the referenced parent table and its primary key index to already exist in MySQL catalog metadata.",
    explanation: "Maintains topological dependency order in database migrations.",
    hint: "Referenced parent tables must exist before child foreign keys can be wired.",
    level: "basic"
  },
  {
    question: "What is the overall milestone achieved by completing Segment 1 of the RDBMS MySQL roadmap?",
    shortAnswer: "Students possess an unbreakable foundation in relational modeling, Codd's principles, primary/foreign key wiring, data integrity constraints, DDL/DML execution, error debugging, and safe SQL querying—ready for advanced ER modeling, normalization, and relational algebra in Segment 2.",
    explanation: "Foundational mastery enabling seamless progression to intermediate and advanced database engineering.",
    hint: "Rock-solid mastery of relational fundamentals, DDL/DML, constraints, and querying.",
    level: "basic"
  }
];

export default questions;
