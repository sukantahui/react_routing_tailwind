// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the primary function of the `CREATE TABLE` statement in MySQL?",
    shortAnswer: "It defines the structural blueprint of a new table, including column names, data types, defaults, and constraints.",
    explanation: "Executing `CREATE TABLE` registers a new relation in the MySQL data dictionary, allocates an InnoDB `.ibd` tablespace file on disk, and creates the clustered index root page.",
    hint: "DDL blueprint for relational tables.",
    level: "basic",
    codeExample: "CREATE TABLE employees (\n    emp_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n    name VARCHAR(50) NOT NULL\n);"
  },
  {
    question: "Why must every InnoDB table have an explicit PRIMARY KEY?",
    shortAnswer: "InnoDB organizes physical table data in a Clustered B+ Tree Index ordered by the Primary Key.",
    explanation: "If you do not define a Primary Key, InnoDB searches for the first NOT NULL UNIQUE key to use as the clustered index. If none exists, it generates a hidden 6-byte auto-increment `GENCLUST_INDEX` row ID, which can cause internal lock contention across tables.",
    hint: "Clustered B+ Tree storage architecture.",
    level: "expert"
  },
  {
    question: "What are the rules and limitations surrounding `AUTO_INCREMENT` columns in MySQL?",
    shortAnswer: "A table can only have ONE `AUTO_INCREMENT` column, which must be indexed (usually the PRIMARY KEY) and have an integer or floating-point type.",
    explanation: "Attempting to create multiple auto-increment columns or defining auto-increment on an unindexed column results in Error 1075: 'Incorrect table definition; there can be only one auto column and it must be defined as a key'.",
    hint: "Single indexed sequence column limitation.",
    level: "basic",
    codeExample: "-- ERROR 1075: There can be only one auto column and it must be defined as a key"
  },
  {
    question: "What is the difference between `CREATE TABLE ... LIKE` and `CREATE TABLE ... AS SELECT` (CTAS)?",
    shortAnswer: "`LIKE` creates an exact empty clone including all indexes and column definitions; `AS SELECT` copies data and inferred types but omits indexes, auto-increment, and foreign keys.",
    explanation: "`CREATE TABLE t_clone LIKE t_orig;` produces an empty table with identical schema structure, primary keys, and secondary indexes. `CREATE TABLE t_copy AS SELECT * FROM t_orig;` copies the row data but strips primary key definitions, auto-increment attributes, and constraints.",
    hint: "Exact structural cloning vs data copy.",
    level: "moderate",
    codeExample: "CREATE TABLE students_archive LIKE students;\nCREATE TABLE students_backup AS SELECT * FROM students;"
  },
  {
    question: "What is the difference between `VIRTUAL` and `STORED` generated columns?",
    shortAnswer: "`VIRTUAL` columns are computed on the fly upon query and consume no disk space; `STORED` columns are evaluated during write operations and saved to disk.",
    explanation: "Generated columns calculate values from other columns automatically. `VIRTUAL` columns save disk space and I/O bandwidth. `STORED` columns occupy physical disk bytes but allow building direct secondary indexes without virtual column expression overhead in older engines.",
    hint: "Compute-on-read vs compute-on-write.",
    level: "expert",
    codeExample: "full_name VARCHAR(100) AS (CONCAT(first_name, ' ', last_name)) VIRTUAL,\ntotal_price DECIMAL(10, 2) AS (qty * unit_price) STORED"
  },
  {
    question: "How do you set a custom starting counter value for an `AUTO_INCREMENT` column during table creation?",
    shortAnswer: "By specifying the `AUTO_INCREMENT = number` table option at the end of the `CREATE TABLE` statement.",
    explanation: "Setting `AUTO_INCREMENT = 10001` ensures the first inserted record receives ID 10001 rather than starting at 1, useful for invoice numbers, customer IDs, and student roll sequences.",
    hint: "Table-level option AUTO_INCREMENT = n.",
    level: "basic",
    codeExample: "CREATE TABLE invoices (\n    invoice_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY\n) AUTO_INCREMENT = 50001;"
  },
  {
    question: "What does the `DEFAULT` attribute do in a column definition?",
    shortAnswer: "It supplies an automatic fallback value when an INSERT statement does not provide a value for that column.",
    explanation: "If a column is defined as `is_active TINYINT(1) NOT NULL DEFAULT 1`, inserting a row without specifying `is_active` automatically stores `1` without throwing an error.",
    hint: "Fallback value for omitted columns.",
    level: "basic",
    codeExample: "status VARCHAR(20) NOT NULL DEFAULT 'active'"
  },
  {
    question: "Can `CURRENT_TIMESTAMP` be used as a default value for both DATETIME and TIMESTAMP columns in MySQL 8.0?",
    shortAnswer: "Yes, MySQL 8.0 supports `DEFAULT CURRENT_TIMESTAMP` and `ON UPDATE CURRENT_TIMESTAMP` on both TIMESTAMP and DATETIME columns.",
    explanation: "Both types can automatically record row creation time (`DEFAULT CURRENT_TIMESTAMP`) and automatic last-updated timestamps (`ON UPDATE CURRENT_TIMESTAMP`).",
    hint: "Automatic audit date tracking.",
    level: "moderate",
    codeExample: "created_at DATETIME DEFAULT CURRENT_TIMESTAMP,\nupdated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },
  {
    question: "What is the purpose of the `CHECK` constraint in MySQL 8.0?",
    shortAnswer: "It validates that values inserted or updated in a column satisfy a boolean condition expression.",
    explanation: "In MySQL 8.0.16+, `CHECK` constraints are fully enforced. Attempting to insert a row violating the check expression (e.g. `age >= 18` or `price > 0`) throws Error 3819: 'Check constraint is violated'.",
    hint: "Domain rule validation at database engine level.",
    level: "moderate",
    codeExample: "age TINYINT UNSIGNED NOT NULL CHECK (age >= 18),\nfee DECIMAL(8, 2) NOT NULL CHECK (fee > 0.00)"
  },
  {
    question: "How do you define a Composite (Multi-Column) Primary Key in `CREATE TABLE`?",
    shortAnswer: "By defining `PRIMARY KEY (column_1, column_2)` as a table-level constraint at the bottom of the column definitions.",
    explanation: "Composite primary keys are common in bridge/junction tables for many-to-many relationships (e.g. `student_id` and `course_id` together form a unique composite primary key).",
    hint: "Table-level constraint syntax with multiple column names.",
    level: "moderate",
    codeExample: "CREATE TABLE student_courses (\n    student_id INT UNSIGNED NOT NULL,\n    course_id INT UNSIGNED NOT NULL,\n    PRIMARY KEY (student_id, course_id)\n);"
  },
  {
    question: "What is the maximum number of columns allowed in a single MySQL table?",
    shortAnswer: "4,096 columns (though InnoDB limits practical tables to 1,017 columns).",
    explanation: "MySQL server architecture supports up to 4,096 columns per table, but InnoDB storage engine imposes an internal limit of 1,017 columns. Designing tables with hundreds of columns is an anti-pattern (violates normalization).",
    hint: "Theoretical maximum vs practical InnoDB limits.",
    level: "expert"
  },
  {
    question: "What is a `TEMPORARY TABLE` in MySQL, and when does it get destroyed?",
    shortAnswer: "A session-scoped table created using `CREATE TEMPORARY TABLE` that is visible ONLY to the current connection and is automatically dropped when the session terminates.",
    explanation: "Temporary tables are private to the active database connection and do not conflict with permanent tables of the same name or other users' temporary tables. They are ideal for staging intermediate calculations.",
    hint: "Session-scoped transient storage.",
    level: "moderate",
    codeExample: "CREATE TEMPORARY TABLE temp_scores (\n    student_id INT,\n    score INT\n);"
  },
  {
    question: "How do you add comments to columns and tables for documentation during creation?",
    shortAnswer: "Using the `COMMENT 'description'` clause on column definitions and table options.",
    explanation: "Comments are stored in the data dictionary and can be viewed via `SHOW FULL COLUMNS FROM table_name;` or `INFORMATION_SCHEMA.COLUMNS`, providing self-documenting schemas.",
    hint: "COMMENT keyword on columns and table options.",
    level: "basic",
    codeExample: "salary DECIMAL(10, 2) COMMENT 'Monthly base salary in INR (₹)'"
  },
  {
    question: "What does the `ENGINE = InnoDB` clause specify in `CREATE TABLE`?",
    shortAnswer: "It instructs MySQL to use the InnoDB storage engine for ACID transaction support, row-level locking, and foreign keys.",
    explanation: "While InnoDB is the default engine in modern MySQL, explicitly writing `ENGINE = InnoDB` guarantees that the table is created with transactional durability regardless of server-level configuration overrides.",
    hint: "Pluggable storage engine selection.",
    level: "basic",
    codeExample: "CREATE TABLE accounts (...) ENGINE = InnoDB;"
  },
  {
    question: "Why should you avoid using `NOT NULL` without a default value on columns added to high-traffic tables later?",
    shortAnswer: "In older MySQL versions or non-strict modes, inserting without providing a value either fails or fills dummy defaults (0 or empty string).",
    explanation: "Explicit defaults ensure application inserts that omit the field do not fail abruptly when schema definitions change.",
    hint: "Schema evolution and backward compatibility.",
    level: "moderate"
  },
  {
    question: "What is the difference between a Column Constraint and a Table Constraint?",
    shortAnswer: "Column constraints are declared inline next to a single column; Table constraints are declared separately at the end and can span multiple columns.",
    explanation: "Single-column constraints (like inline `PRIMARY KEY` or `UNIQUE`) apply to that column only. Table constraints (like `PRIMARY KEY (a, b)` or `FOREIGN KEY`) can reference multiple composite columns.",
    hint: "Inline single-column vs multi-column block constraint.",
    level: "basic",
    codeExample: "-- Column constraint: id INT PRIMARY KEY\n-- Table constraint: CONSTRAINT pk_enrollment PRIMARY KEY (student_id, course_id)"
  },
  {
    question: "How do you create a table with a named constraint in MySQL?",
    shortAnswer: "By prefixing the constraint with `CONSTRAINT constraint_name`.",
    explanation: "Explicitly naming constraints makes error messages clearer and allows easily dropping or modifying constraints later via `ALTER TABLE tbl DROP CONSTRAINT constraint_name;`.",
    hint: "CONSTRAINT keyword followed by identifier name.",
    level: "moderate",
    codeExample: "CONSTRAINT chk_positive_salary CHECK (salary > 0.00)"
  },
  {
    question: "What happens if you execute `CREATE TABLE IF NOT EXISTS` with a different schema definition than the existing table?",
    shortAnswer: "MySQL does nothing; it issues a warning and leaves the existing table completely unmodified.",
    explanation: "`IF NOT EXISTS` only checks if the table name exists in the catalog; it does NOT compare column definitions, missing columns, or type discrepancies.",
    hint: "Name existence check only without structural diffing.",
    level: "moderate"
  },
  {
    question: "What is the maximum length of an index key prefix in MySQL InnoDB?",
    shortAnswer: "3,072 bytes (using `DYNAMIC` or `COMPRESSED` row formats).",
    explanation: "Under `utf8mb4` (4 bytes per char), indexing a `VARCHAR(1000)` column requires `1000 * 4 = 4000` bytes, which exceeds the 3,072-byte index key limit. In such cases, a prefix index like `INDEX (col(191))` must be used.",
    hint: "3072-byte InnoDB B-Tree index limit.",
    level: "expert",
    codeExample: "CREATE TABLE articles (\n    content TEXT,\n    INDEX idx_content (content(100)) -- 100 character prefix index\n);"
  },
  {
    question: "What is the `ROW_FORMAT` table option in InnoDB (e.g. `ROW_FORMAT = DYNAMIC`)?",
    shortAnswer: "It dictates how variable-length columns (VARCHAR, TEXT, BLOB) and overflow pages are laid out physically inside 16KB InnoDB pages.",
    explanation: "In `ROW_FORMAT = DYNAMIC` (default in modern MySQL), variable-length columns that exceed page thresholds store only a 20-byte pointer inline, placing the entire large value in off-page overflow extents for maximum performance.",
    hint: "Physical page layout strategy in InnoDB.",
    level: "expert",
    codeExample: "CREATE TABLE blogs (...) ROW_FORMAT = DYNAMIC;"
  },
  {
    question: "How do you define a Foreign Key constraint in `CREATE TABLE`?",
    shortAnswer: "Using `FOREIGN KEY (child_col) REFERENCES parent_table(parent_col) ON DELETE ... ON UPDATE ...`.",
    explanation: "Foreign key constraints maintain referential integrity between tables, ensuring orphaned child records cannot be created.",
    hint: "REFERENCES keyword linking to parent primary key.",
    level: "basic",
    codeExample: "FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE"
  },
  {
    question: "Why does MySQL require the referenced column in a Foreign Key to be indexed in the parent table?",
    shortAnswer: "To ensure that parent row lookups during child insertions and cascading updates execute in O(log N) B-Tree time rather than full table scans.",
    explanation: "When a child row is inserted, MySQL checks if the foreign key value exists in the parent table. Without an index, verifying parent existence would require scanning millions of parent rows.",
    hint: "Fast B-Tree lookup performance for referential integrity checks.",
    level: "expert"
  },
  {
    question: "What error occurs if you create a table referencing a non-existent parent table in a Foreign Key?",
    shortAnswer: "Error 1824 (HY000): 'Cannot add foreign key constraint'.",
    explanation: "MySQL verifies that the parent table exists and has a compatible indexed column. If missing, the DDL statement fails.",
    hint: "Parent table must exist before child table creation.",
    level: "basic"
  },
  {
    question: "Can you create a table inside another database without switching using `USE`?",
    shortAnswer: "Yes, by qualifying the table name with the database prefix: `CREATE TABLE database_name.table_name (...)`.",
    explanation: "You can create tables in any database where you hold `CREATE` privileges by writing `CREATE TABLE barrackpore_db.teachers (...);`.",
    hint: "Qualified identifier syntax: db.table.",
    level: "basic",
    codeExample: "CREATE TABLE ichapur_school_db.grades (\n    grade_id INT PRIMARY KEY\n);"
  },
  {
    question: "What does `ZEROFILL` do when specified on an integer column in `CREATE TABLE`?",
    shortAnswer: "It automatically implies `UNSIGNED` and pads displayed values with leading zeros up to the display width.",
    explanation: "For example, `INT(5) ZEROFILL` displays number `42` as `00042`. (Note: Display width and ZEROFILL are deprecated in MySQL 8.0.19+ in favor of LPAD formatting functions).",
    hint: "Leading zero padding display modifier.",
    level: "moderate",
    codeExample: "token_num INT(5) ZEROFILL -- 42 displays as '00042'"
  },
  {
    question: "How do you define an inline `UNIQUE` constraint on a column?",
    shortAnswer: "By adding the `UNIQUE` keyword next to the column definition.",
    explanation: "Defining `email VARCHAR(100) UNIQUE NOT NULL` instructs MySQL to automatically build a unique B-Tree secondary index that rejects duplicate email addresses.",
    hint: "UNIQUE keyword prevents duplicate values.",
    level: "basic",
    codeExample: "aadhaar_no CHAR(12) UNIQUE NOT NULL"
  },
  {
    question: "What happens if you define a column with a default value of a mismatched data type (e.g. `age INT DEFAULT 'abc'`)?",
    shortAnswer: "MySQL rejects table creation with Error 1067 (42000): 'Invalid default value for column'.",
    explanation: "MySQL strictly type-checks default values at DDL compile time to guarantee data integrity.",
    hint: "Type mismatch error during DDL parsing.",
    level: "basic"
  },
  {
    question: "How can you verify that a newly created table has the correct storage engine, row format, and character set?",
    shortAnswer: "Using `SHOW TABLE STATUS LIKE 'table_name';` or querying `INFORMATION_SCHEMA.TABLES`.",
    explanation: "`SHOW TABLE STATUS` displays the storage engine, row format, total rows, data length, index length, auto_increment counter, and collation.",
    hint: "SHOW TABLE STATUS diagnostic command.",
    level: "moderate",
    codeExample: "SHOW TABLE STATUS LIKE 'students';"
  },
  {
    question: "What is the difference between `BINARY` collation and standard `_ci` collation on a table's character columns?",
    shortAnswer: "`BINARY` collation enforces exact byte-level case-sensitive sorting; `_ci` collation treats 'A' and 'a' as equal.",
    explanation: "For username or password hash columns where case distinction is strictly required, binary collation (`utf8mb4_bin`) guarantees exact character casing matching.",
    hint: "Case-insensitive vs binary byte comparison.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist when designing and creating any new relational table?",
    shortAnswer: "1) Define an explicit Primary Key. 2) Set `NOT NULL` on mandatory columns. 3) Choose smallest adequate data types. 4) Use `DECIMAL` for currency (₹). 5) Add `IF NOT EXISTS`. 6) Set `ENGINE = InnoDB DEFAULT CHARSET = utf8mb4`.",
    explanation: "Following these 6 foundational rules ensures optimal storage density, indexing speed, calculation accuracy, and robust data integrity.",
    hint: "Primary Key, Smallest Types, NOT NULL, DECIMAL, InnoDB, utf8mb4.",
    level: "basic"
  }
];

export default questions;
