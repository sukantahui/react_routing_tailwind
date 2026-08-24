// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What does the `DESCRIBE` statement do in MySQL?",
    shortAnswer: "It displays a formatted summary table of a table's columns, data types, nullability, indexing keys, defaults, and extra attributes.",
    explanation: "Executing `DESCRIBE table_name;` (or `DESC table_name;`) retrieves metadata about each column from the data dictionary, presenting `Field`, `Type`, `Null`, `Key`, `Default`, and `Extra`.",
    hint: "Table column metadata inspector.",
    level: "basic",
    codeExample: "DESCRIBE students;\n-- or shorthand:\nDESC students;"
  },
  {
    question: "What is the difference between `DESCRIBE table_name` and `SHOW CREATE TABLE table_name`?",
    shortAnswer: "`DESCRIBE` shows a summary table of column attributes; `SHOW CREATE TABLE` outputs the exact, complete, copy-pasteable SQL `CREATE TABLE` DDL statement.",
    explanation: "While `DESCRIBE` is great for quick column lookups, it omits foreign key constraint definitions, cascade rules, index names, and storage engine options. `SHOW CREATE TABLE` provides the complete verbatim DDL statement.",
    hint: "Column summary grid vs full DDL script output.",
    level: "basic",
    codeExample: "SHOW CREATE TABLE students;"
  },
  {
    question: "What do the values `PRI`, `UNI`, and `MUL` represent in the `Key` column of `DESCRIBE` output?",
    shortAnswer: "`PRI` = Primary Key; `UNI` = Unique index; `MUL` = Multiple (non-unique index or first column of a compound index).",
    explanation: "If a column is part of the primary key, `Key` displays `PRI`. If it has a unique constraint, it shows `UNI`. If it has a standard non-unique secondary B-Tree index, it displays `MUL`.",
    hint: "Primary, Unique, and Multiple index markers.",
    level: "basic"
  },
  {
    question: "Why might a UNIQUE column with `Null = YES` display `UNI` in `DESCRIBE` but permit multiple rows with NULL?",
    shortAnswer: "In standard SQL and MySQL InnoDB, multiple NULL values do not violate a UNIQUE constraint because `NULL != NULL`.",
    explanation: "A unique column allows multiple NULL entries because NULL represents the absence of a value, not a distinct duplicate entity.",
    hint: "NULL comparison logic in UNIQUE indexes.",
    level: "moderate"
  },
  {
    question: "How do you view column comments and collations that are not shown in standard `DESCRIBE`?",
    shortAnswer: "By using `SHOW FULL COLUMNS FROM table_name;`.",
    explanation: "`SHOW FULL COLUMNS` expands the output to include `Collation`, `Privileges`, and `Comment` columns for every attribute in the table.",
    hint: "SHOW FULL COLUMNS syntax.",
    level: "basic",
    codeExample: "SHOW FULL COLUMNS FROM customer_orders;"
  },
  {
    question: "How can you query table column metadata programmatically using standard ANSI SQL?",
    shortAnswer: "By querying the `INFORMATION_SCHEMA.COLUMNS` system catalog view.",
    explanation: "`SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_schema = 'college_db' AND table_name = 'students';` returns structured metadata for programmatic processing in ORMs and tools.",
    hint: "INFORMATION_SCHEMA.COLUMNS metadata view.",
    level: "moderate",
    codeExample: "SELECT column_name, data_type, is_nullable, column_default\nFROM information_schema.columns\nWHERE table_schema = DATABASE() AND table_name = 'students';"
  },
  {
    question: "What does the `SHOW INDEX FROM table_name;` command display?",
    shortAnswer: "It displays detailed information about all indexes on the table, including index names, column sequences, uniqueness, cardinality, and collation.",
    explanation: "`SHOW INDEX FROM table_name;` allows DBAs to inspect secondary B-Tree indexes, composite index column order, and index selectivity (`Cardinality`).",
    hint: "Detailed index structure inspector.",
    level: "moderate",
    codeExample: "SHOW INDEX FROM customer_orders;"
  },
  {
    question: "Why does `SHOW TABLE STATUS` report an estimated row count for InnoDB tables rather than an exact count?",
    shortAnswer: "InnoDB uses Multi-Version Concurrency Control (MVCC), where exact row counts require scanning active transaction snapshots.",
    explanation: "Because multiple transactions may be inserting or deleting concurrently, InnoDB maintains an internal statistical approximation for `SHOW TABLE STATUS` to avoid slow full-table scans. For exact counts, `SELECT COUNT(*)` must be run.",
    hint: "MVCC transaction snapshot isolation.",
    level: "expert"
  },
  {
    question: "What does `EXPLAIN table_name;` do in MySQL, and how does it relate to `DESCRIBE table_name`?",
    shortAnswer: "In MySQL, `EXPLAIN table_name;` is an exact synonym for `DESCRIBE table_name;`.",
    explanation: "When given only a table name, `EXPLAIN` returns column metadata identical to `DESCRIBE`. When followed by a query (`EXPLAIN SELECT ...`), it returns the query execution optimizer plan.",
    hint: "Dual role of EXPLAIN keyword in MySQL.",
    level: "basic",
    codeExample: "EXPLAIN students; -- Identical to DESCRIBE students;"
  },
  {
    question: "How do you inspect the structure of a table in another database without switching using `USE`?",
    shortAnswer: "By passing the qualified table name: `DESCRIBE database_name.table_name;` or `SHOW CREATE TABLE database_name.table_name;`.",
    explanation: "You can inspect any accessible table on the server instance directly by specifying its schema prefix.",
    hint: "Qualified identifier syntax with DESCRIBE.",
    level: "basic",
    codeExample: "DESCRIBE barrackpore_college_db.professors;\nSHOW CREATE TABLE kolkata_fintech_ledger.accounts;"
  },
  {
    question: "What information in `SHOW CREATE TABLE` is critical when debugging Foreign Key errors (Error 1215/1824)?",
    shortAnswer: "The referenced parent table's exact column data type (including UNSIGNED), character set, and index matching.",
    explanation: "Foreign key constraints fail if the child column and parent column differ in type (e.g. `INT SIGNED` referencing `INT UNSIGNED`) or collation. Comparing `SHOW CREATE TABLE` on both tables reveals the exact mismatch.",
    hint: "Data type and unsigned attribute alignment.",
    level: "expert"
  },
  {
    question: "How can you view the next auto-increment value that will be assigned to a table?",
    shortAnswer: "By checking the `AUTO_INCREMENT` table option in `SHOW CREATE TABLE` or the `Auto_increment` column in `SHOW TABLE STATUS`.",
    explanation: "MySQL displays `AUTO_INCREMENT = 105` at the end of the `SHOW CREATE TABLE` DDL statement, indicating the next inserted row without an explicit ID will receive 105.",
    hint: "AUTO_INCREMENT counter in SHOW CREATE TABLE.",
    level: "moderate",
    codeExample: "SHOW TABLE STATUS LIKE 'students';"
  },
  {
    question: "What does `DEFAULT_GENERATED` in the `Extra` column of `DESCRIBE` mean?",
    shortAnswer: "It indicates that the column has an expression-based default value (such as `DEFAULT (CURRENT_TIMESTAMP)` or a custom calculation).",
    explanation: "In MySQL 8.0.13+, default values can be arbitrary deterministic expressions; such columns are flagged as `DEFAULT_GENERATED` in `DESCRIBE`.",
    hint: "Expression default value indicator in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "What does `STORED GENERATED` vs `VIRTUAL GENERATED` in the `Extra` column of `DESCRIBE` signify?",
    shortAnswer: "It indicates whether a generated computed column is persisted to disk (`STORED`) or evaluated dynamically on query (`VIRTUAL`).",
    explanation: "`Extra` displays `STORED GENERATED` or `VIRTUAL GENERATED` to indicate physical disk persistence and indexing capabilities.",
    hint: "Generated column storage flag.",
    level: "moderate"
  },
  {
    question: "How can you format MySQL CLI output vertically like a record list instead of a wide table?",
    shortAnswer: "By terminating the query with `\\G` instead of a semicolon `;`.",
    explanation: "Running `SHOW CREATE TABLE students\\G` formats the output into clean vertical lines, making long DDL statements readable without wrapping.",
    hint: "Backslash G vertical line terminator in MySQL CLI.",
    level: "basic",
    codeExample: "SHOW CREATE TABLE students\\G"
  },
  {
    question: "What privilege is required to execute `SHOW CREATE TABLE` on a table?",
    shortAnswer: "Any privilege on that table (e.g. `SELECT`, `INSERT`, `UPDATE`, `DELETE`, etc.).",
    explanation: "As long as a user holds at least one grant on the table, MySQL permits them to view the `SHOW CREATE TABLE` statement.",
    hint: "Any table-level grant permits SHOW CREATE TABLE.",
    level: "moderate"
  },
  {
    question: "How do you view check constraints defined on a table using `INFORMATION_SCHEMA`?",
    shortAnswer: "By querying `INFORMATION_SCHEMA.CHECK_CONSTRAINTS` joined with `TABLE_CONSTRAINTS`.",
    explanation: "In MySQL 8.0.16+, `CHECK_CONSTRAINTS` lists the check constraint name and the underlying SQL check clause expression.",
    hint: "CHECK_CONSTRAINTS catalog view.",
    level: "expert",
    codeExample: "SELECT constraint_name, check_clause\nFROM information_schema.check_constraints;"
  },
  {
    question: "Why should software development teams store `SHOW CREATE TABLE` definitions in Git version control?",
    shortAnswer: "To maintain an immutable history of schema evolution, facilitate database migrations, and ensure parity across dev, staging, and production environments.",
    explanation: "Treating DDL as code (`schema.sql`) allows teams to track changes, review pull requests, and spin up reproducible environments.",
    hint: "Schema-as-Code best practice.",
    level: "basic"
  },
  {
    question: "What does the `on update CURRENT_TIMESTAMP` entry in `DESCRIBE` `Extra` mean?",
    shortAnswer: "It indicates that the column automatically updates to the current time whenever any other column in that row is modified via UPDATE.",
    explanation: "This enables automated audit timestamps without requiring manual triggers or application-level datetime setting.",
    hint: "Automatic modification timestamp.",
    level: "basic"
  },
  {
    question: "How do you list all Foreign Key constraints referencing a particular table?",
    shortAnswer: "By querying `INFORMATION_SCHEMA.KEY_COLUMN_USAGE` where `REFERENCED_TABLE_NAME = 'target_table'`.",
    explanation: "`KEY_COLUMN_USAGE` maps foreign key names, child tables, child columns, and the corresponding parent referenced columns.",
    hint: "KEY_COLUMN_USAGE metadata view.",
    level: "expert",
    codeExample: "SELECT table_name, column_name, constraint_name, referenced_table_name, referenced_column_name\nFROM information_schema.key_column_usage\nWHERE referenced_table_name = 'students';"
  },
  {
    question: "Can `DESCRIBE` be used on a MySQL View?",
    shortAnswer: "Yes, `DESCRIBE view_name;` outputs the columns and inferred data types produced by the view query.",
    explanation: "Views behave like virtual tables in SQL; `DESCRIBE` reveals the view's output schema.",
    hint: "Virtual table schema inspection.",
    level: "basic",
    codeExample: "DESCRIBE active_students_view;"
  },
  {
    question: "What does `SHOW CREATE VIEW view_name;` output?",
    shortAnswer: "It displays the underlying SELECT statement that defines the view, along with its algorithm, definer user, and security attributes.",
    explanation: "`SHOW CREATE VIEW` reveals the entire query logic and security context (`SQL SECURITY DEFINER` or `INVOKER`).",
    hint: "View definition query inspector.",
    level: "moderate",
    codeExample: "SHOW CREATE VIEW honor_roll_view\\G"
  },
  {
    question: "What is the difference between `Null = NO` without a default and `Null = NO` with a default in `DESCRIBE`?",
    shortAnswer: "Without a default, omitting the column during an INSERT in strict SQL mode causes a runtime error; with a default, the default value is inserted automatically.",
    explanation: "In `STRICT_TRANS_TABLES` mode, inserting into a `NOT NULL` column with no default raises Error 1364: 'Field doesn\'t have a default value'.",
    hint: "Strict SQL mode and mandatory insert fields.",
    level: "moderate"
  },
  {
    question: "How can you check the physical data size and index size of a specific table in Megabytes?",
    shortAnswer: "By querying `data_length / 1024 / 1024` and `index_length / 1024 / 1024` from `INFORMATION_SCHEMA.TABLES`.",
    explanation: "`SELECT table_name, ROUND(data_length/1024/1024, 2) AS data_mb, ROUND(index_length/1024/1024, 2) AS index_mb FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'students';`.",
    hint: "Data and index length in MB.",
    level: "moderate",
    codeExample: "SELECT table_name, ROUND(data_length/1024/1024, 2) AS data_mb\nFROM information_schema.tables\nWHERE table_name = 'students';"
  },
  {
    question: "What does `Avg_row_length` in `SHOW TABLE STATUS` represent?",
    shortAnswer: "The average number of storage bytes consumed by a single row in that table.",
    explanation: "This metric helps DBAs estimate disk growth rates and memory caching requirements in the InnoDB buffer pool.",
    hint: "Average row byte footprint.",
    level: "moderate"
  },
  {
    question: "How can you compare schemas between two different database environments to detect drift?",
    shortAnswer: "By exporting `SHOW CREATE TABLE` for all tables in both environments and running a text diff utility (e.g. `git diff` or `mysqldiff`).",
    explanation: "Comparing `SHOW CREATE TABLE` outputs reveals missing columns, mismatched types, differing indexes, and default collation differences.",
    hint: "Schema drift detection via DDL diffing.",
    level: "expert"
  },
  {
    question: "What does the `Data_free` metric in `SHOW TABLE STATUS` represent for InnoDB tables?",
    shortAnswer: "The total amount of unallocated disk space (fragmentation) inside the table's `.ibd` tablespace file.",
    explanation: "When many rows are deleted, InnoDB retains the free space inside `.ibd` for future inserts rather than shrinking the OS file immediately. Running `OPTIMIZE TABLE` reclaims this space.",
    hint: "Tablespace fragmentation and free extent metrics.",
    level: "expert"
  },
  {
    question: "Why should junior developers run `DESCRIBE table_name` before writing complex UPDATE or INSERT statements?",
    shortAnswer: "To verify column names, exact data types, mandatory non-null fields, and avoid runtime type casting bugs.",
    explanation: "Running `DESC` prevents inserting strings into integer columns, exceeding character limits, or omitting required fields.",
    hint: "Pre-query schema validation habit.",
    level: "basic"
  },
  {
    question: "What happens if you run `DESCRIBE non_existent_table;`?",
    shortAnswer: "MySQL returns Error 1146 (42S02): 'Table doesn\'t exist'.",
    explanation: "MySQL validates that the relation exists in the active database catalog before outputting column definitions.",
    hint: "Error 1146 for non-existent tables.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist when inspecting an unfamiliar database schema?",
    shortAnswer: "1) `SHOW TABLES;` (list relations). 2) `DESCRIBE main_table;` (check primary keys and types). 3) `SHOW CREATE TABLE main_table;` (inspect foreign keys and constraints). 4) `SHOW TABLE STATUS;` (evaluate volume).",
    explanation: "Following this 4-step discovery framework provides a complete architectural understanding of any relational schema.",
    hint: "Discover, Inspect columns, Verify constraints, Check scale.",
    level: "basic"
  }
];

export default questions;
