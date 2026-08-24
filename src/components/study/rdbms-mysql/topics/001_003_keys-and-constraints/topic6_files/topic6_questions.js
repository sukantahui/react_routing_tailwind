// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the purpose of the `DEFAULT` constraint in MySQL?",
    shortAnswer: "To provide an automatic fallback value for a column whenever an INSERT query omits the column or passes the `DEFAULT` keyword.",
    explanation: "Prevents missing values and simplifies client write operations.",
    hint: "Automatic fallback value substitution.",
    level: "basic",
    codeExample: "city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore'"
  },
  {
    question: "What happens when an `INSERT` statement passes an explicit `NULL` into a column defined as `NOT NULL DEFAULT 'active'`?",
    shortAnswer: "MySQL rejects the query with Error 1048. The `DEFAULT` value is only applied when the column is OMITTED, not when `NULL` is explicitly supplied.",
    explanation: "Explicit NULL overrides default value substitution in strict SQL mode.",
    hint: "Explicit NULL rejects insert even if DEFAULT is present.",
    level: "moderate"
  },
  {
    question: "How do you explicitly invoke the default value of a column in an `INSERT` statement?",
    shortAnswer: "By using the `DEFAULT` keyword in the `VALUES()` clause: `INSERT INTO tbl (status) VALUES (DEFAULT);`.",
    explanation: "Forces the engine to insert the column's default value.",
    hint: "DEFAULT keyword in VALUES clause.",
    level: "basic",
    codeExample: "INSERT INTO students (first_name, admission_fee) VALUES ('Mamata', DEFAULT);"
  },
  {
    question: "What are Dynamic Expression Defaults in MySQL 8.0?",
    shortAnswer: "The ability to define defaults using arbitrary SQL expressions wrapped in parentheses, such as `DEFAULT (UUID())` or `DEFAULT (CURRENT_DATE + INTERVAL 7 DAY)`.",
    explanation: "Introduced in MySQL 8.0.13, expression defaults allow calculated dynamic values.",
    hint: "Expressions wrapped in parentheses.",
    level: "expert",
    codeExample: "created_uuid VARCHAR(36) NOT NULL DEFAULT (UUID()),\nexpiry_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL 30 DAY)"
  },
  {
    question: "How do you set a column to automatically record row creation and update timestamps?",
    shortAnswer: "`created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`.",
    explanation: "Standard MySQL pattern for audit timestamp management.",
    hint: "DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP.",
    level: "basic",
    codeExample: "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\nupdated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
  },
  {
    question: "How do you change the `DEFAULT` value of an existing column using `ALTER TABLE` without rewriting the table?",
    shortAnswer: "`ALTER TABLE table_name ALTER COLUMN column_name SET DEFAULT new_value;`.",
    explanation: "A fast, metadata-only operation that does not copy table rows on disk.",
    hint: "ALTER COLUMN SET DEFAULT (metadata-only).",
    level: "expert",
    codeExample: "ALTER TABLE students ALTER COLUMN admission_fee SET DEFAULT 18500.00;"
  },
  {
    question: "How do you remove (drop) a `DEFAULT` constraint from a column?",
    shortAnswer: "`ALTER TABLE table_name ALTER COLUMN column_name DROP DEFAULT;`.",
    explanation: "Removes default fallback; future omitted inserts will require explicit values or evaluate to NULL if nullable.",
    hint: "ALTER COLUMN DROP DEFAULT.",
    level: "moderate",
    codeExample: "ALTER TABLE students ALTER COLUMN admission_fee DROP DEFAULT;"
  },
  {
    question: "Does changing a column's `DEFAULT` value alter existing data in the table?",
    shortAnswer: "No, modifying a default value affects only FUTURE inserts; existing rows retain their previously stored values.",
    explanation: "To update existing rows, an explicit `UPDATE` statement is required.",
    hint: "Affects future inserts only.",
    level: "basic"
  },
  {
    question: "Can `DEFAULT` values be used in `UPDATE` statements?",
    shortAnswer: "Yes, you can set a column back to its default value using `UPDATE tbl SET col = DEFAULT WHERE id = 1;`.",
    explanation: "Resets the column to its schema-defined default.",
    hint: "SET col = DEFAULT in UPDATE.",
    level: "basic",
    codeExample: "UPDATE students SET admission_fee = DEFAULT WHERE student_id = 101;"
  },
  {
    question: "Can a `BLOB` or `TEXT` column have a `DEFAULT` value in MySQL 8.0?",
    shortAnswer: "Yes, MySQL 8.0.13+ permits default values for `BLOB`, `TEXT`, `GEOMETRY`, and `JSON` data types (wrapped in parentheses for expressions).",
    explanation: "Older MySQL 5.7 versions forbade defaults on BLOB/TEXT.",
    hint: "MySQL 8.0 supports BLOB/TEXT defaults.",
    level: "expert",
    codeExample: "notes TEXT DEFAULT ('No notes provided'),\nmetadata JSON DEFAULT (JSON_OBJECT())"
  },
  {
    question: "Can an `AUTO_INCREMENT` column have a `DEFAULT` value defined in MySQL?",
    shortAnswer: "No, `AUTO_INCREMENT` columns generate values from an internal sequence; defining a static default throws a syntax error.",
    explanation: "The sequence manager provides the generated identifier.",
    hint: "AUTO_INCREMENT is mutually exclusive with static DEFAULT.",
    level: "moderate"
  },
  {
    question: "What is the default value of a column if neither `DEFAULT` nor `NOT NULL` is specified in MySQL?",
    shortAnswer: "`DEFAULT NULL`.",
    explanation: "Unspecified columns default to NULL if they are nullable.",
    hint: "Default NULL on nullable columns.",
    level: "basic"
  },
  {
    question: "What happens if a column is `NOT NULL` with NO default value and is omitted in an `INSERT` statement in strict mode?",
    shortAnswer: "MySQL aborts the insert with Error 1364: 'Field ... doesn't have a default value'.",
    explanation: "Strict SQL mode enforces that all mandatory columns without defaults must be explicitly supplied.",
    hint: "Error 1364 in strict SQL mode.",
    level: "moderate"
  },
  {
    question: "Can a `DEFAULT` expression reference other columns in the same table in MySQL 8.0?",
    shortAnswer: "No, `DEFAULT` expressions cannot reference other columns or auto-increment counters; use Generated (Computed) Columns for column references.",
    explanation: "`DEFAULT (col_a + col_b)` is invalid; use `GENERATED ALWAYS AS (col_a + col_b)` instead.",
    hint: "Default expressions cannot reference peer columns.",
    level: "expert"
  },
  {
    question: "How do you inspect the default value of all columns in a table?",
    shortAnswer: "Using `DESCRIBE table_name;` (inspect the `Default` column) or `SHOW COLUMNS FROM table_name;`.",
    explanation: "Lists default literal or expression strings.",
    hint: "Default column in DESCRIBE.",
    level: "basic",
    codeExample: "DESCRIBE students;"
  },
  {
    question: "What is the difference between `NOW()` and `CURRENT_TIMESTAMP` in `DEFAULT` clauses?",
    shortAnswer: "They are completely synonymous in MySQL and both return the current date and time.",
    explanation: "Both evaluate to the server's transactional current timestamp.",
    hint: "Synonymous timestamp functions.",
    level: "basic"
  },
  {
    question: "How does `DEFAULT (JSON_ARRAY())` work in MySQL 8.0?",
    shortAnswer: "It initializes the JSON column with an empty JSON array `[]` on newly inserted rows.",
    explanation: "Ensures the JSON column is always a valid parsed JSON structure.",
    hint: "Expression default for JSON arrays.",
    level: "expert",
    codeExample: "tags JSON NOT NULL DEFAULT (JSON_ARRAY())"
  },
  {
    question: "Can a `DEFAULT` expression call stored functions or stored procedures?",
    shortAnswer: "No, `DEFAULT` expressions can only call built-in deterministic functions, not user-defined functions (UDFs) or stored procedures.",
    explanation: "Prevents non-deterministic storage engine serialization issues.",
    hint: "Built-in deterministic functions only.",
    level: "expert"
  },
  {
    question: "What is the performance advantage of using `ALTER TABLE ... ALTER COLUMN ... SET DEFAULT` over `MODIFY COLUMN`?",
    shortAnswer: "`ALTER COLUMN SET DEFAULT` changes only table `.frm` / data dictionary metadata in sub-milliseconds without copying or rebuilding the table rows.",
    explanation: "`MODIFY COLUMN` forces a full table copy and metadata lock.",
    hint: "Instantaneous metadata-only alteration.",
    level: "expert"
  },
  {
    question: "How do you set a default boolean flag in MySQL?",
    shortAnswer: "`is_active BOOLEAN NOT NULL DEFAULT TRUE` (or `DEFAULT 1` using `TINYINT(1)`).",
    explanation: "In MySQL, `BOOLEAN` is an alias for `TINYINT(1)`.",
    hint: "BOOLEAN NOT NULL DEFAULT TRUE.",
    level: "basic",
    codeExample: "is_enrolled BOOLEAN NOT NULL DEFAULT TRUE"
  },
  {
    question: "What happens when an `INSERT INTO ... SELECT` query omits columns with defaults?",
    shortAnswer: "MySQL automatically fills the omitted target columns with their defined default values for all streamed rows.",
    explanation: "Consistent default behavior across all INSERT statement variants.",
    hint: "Defaults apply to INSERT ... SELECT.",
    level: "moderate"
  },
  {
    question: "Can a `DEFAULT` constraint be combined with a `CHECK` constraint?",
    shortAnswer: "Yes, but the default value itself MUST satisfy the CHECK constraint, otherwise MySQL rejects the table creation.",
    explanation: "A default of 5 on `CHECK (val > 10)` will fail DDL validation.",
    hint: "Default value must satisfy CHECK constraint.",
    level: "moderate"
  },
  {
    question: "What is the syntax for adding a default value during `ALTER TABLE ADD COLUMN`?",
    shortAnswer: "`ALTER TABLE table_name ADD COLUMN column_name data_type NOT NULL DEFAULT fallback_value;`.",
    explanation: "Automatically populates all existing table rows with the fallback value during table expansion.",
    hint: "ADD COLUMN with DEFAULT populates existing rows.",
    level: "basic",
    codeExample: "ALTER TABLE students ADD COLUMN city VARCHAR(50) NOT NULL DEFAULT 'Barrackpore';"
  },
  {
    question: "How does `ON UPDATE CURRENT_TIMESTAMP` interact with transactions where no column values actually changed?",
    shortAnswer: "If an `UPDATE` statement sets column values to the identical values they already hold, MySQL does NOT update `ON UPDATE CURRENT_TIMESTAMP`.",
    explanation: "Optimizes timestamp updates to only genuine data modifications.",
    hint: "No update if row values are unchanged.",
    level: "expert"
  },
  {
    question: "Can a `DEFAULT` value be a string containing SQL keywords like 'NULL' or 'DEFAULT'?",
    shortAnswer: "Yes, when enclosed in string quotes (e.g. `DEFAULT 'NULL'`), it is stored as a literal string, not the SQL null marker.",
    explanation: "Quote delimiters distinguish literal text from SQL tokens.",
    hint: "Quoted literal strings vs SQL keywords.",
    level: "basic"
  },
  {
    question: "What is the difference between a `DEFAULT` value and a `VIRTUAL` Generated Column?",
    shortAnswer: "A `DEFAULT` value is evaluated only at insertion time and can be overwritten by subsequent updates; a `VIRTUAL` generated column is always computed dynamically on read.",
    explanation: "Generated columns cannot be manually overridden by INSERT/UPDATE.",
    hint: "Insertion snapshot vs dynamic computed projection.",
    level: "expert"
  },
  {
    question: "Can `RAND()` or non-deterministic mathematical functions be used in `DEFAULT` expressions?",
    shortAnswer: "No, `RAND()` is prohibited in default expressions because default values must be deterministic and reproducible during replication.",
    explanation: "Non-deterministic defaults would break binlog replication across MySQL replicas.",
    hint: "Non-deterministic functions prohibited for replication safety.",
    level: "expert"
  },
  {
    question: "What is the maximum precision supported by `DEFAULT CURRENT_TIMESTAMP(N)` in MySQL 8.0?",
    shortAnswer: "Up to 6 fractional seconds digits (`CURRENT_TIMESTAMP(6)` for microsecond precision).",
    explanation: "Allows high-precision microsecond event logging.",
    hint: "Microsecond precision CURRENT_TIMESTAMP(6).",
    level: "moderate",
    codeExample: "event_time DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)"
  },
  {
    question: "Why should developers specify `DEFAULT` values when creating new columns on tables in 24/7 web applications?",
    shortAnswer: "It enables zero-downtime rolling deployments where existing backend code can continue running without knowing about the new column, while new backend code utilizes it.",
    explanation: "Core pattern for backward-compatible database schema migrations.",
    hint: "Backward compatibility in rolling deployments.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for implementing DEFAULT constraints in production MySQL tables?",
    shortAnswer: "1) Provide default values for all state flags, counters, and institutional standards. 2) Use `DEFAULT CURRENT_TIMESTAMP` for audit columns. 3) Pair with `NOT NULL` for complete data integrity. 4) Use `ALTER COLUMN SET DEFAULT` for instant metadata changes. 5) Use MySQL 8.0 expression defaults for dynamic values.",
    explanation: "Following these 5 rules guarantees seamless schema evolutions, automated audits, and clean database state machines.",
    hint: "Sensible defaults, Audit timestamps, Pair with NOT NULL, Fast metadata alters, Expression defaults.",
    level: "basic"
  }
];

export default questions;
