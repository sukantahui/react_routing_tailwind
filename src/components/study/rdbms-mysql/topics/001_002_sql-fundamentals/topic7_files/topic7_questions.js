// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the standard syntax for inserting a single row into a MySQL table?",
    shortAnswer: "`INSERT INTO table_name (col1, col2, ...) VALUES (val1, val2, ...);`.",
    explanation: "Explicitly naming destination columns ensures code clarity and shields application queries from breaking if column order in the table schema is altered later.",
    hint: "Explicit column list syntax.",
    level: "basic",
    codeExample: "INSERT INTO students (first_name, last_name, email)\nVALUES ('Mamata', 'Hui', 'mamata@codernaccotax.in');"
  },
  {
    question: "Why are multi-row (bulk) inserts significantly faster than individual single-row inserts?",
    shortAnswer: "Multi-row inserts reduce network TCP round trips, transaction commit overhead, and InnoDB redo log flushes by batching thousands of records into a single query.",
    explanation: "Executing 1,000 separate `INSERT` statements requires 1,000 round-trips and 1,000 separate disk sync flushes. Combining them into one `INSERT INTO t VALUES (...), (...);` finishes in a fraction of a second.",
    hint: "Network round-trips and fsync log flush amortization.",
    level: "moderate",
    codeExample: "INSERT INTO students (first_name, email) VALUES\n('Abhronila', 'abhronila@gmail.com'),\n('Susmita', 'susmita@kolkata.org'),\n('Debangshu', 'debangshu@fintech.in');"
  },
  {
    question: "How do you retrieve the auto-generated Primary Key ID assigned to the most recently inserted row?",
    shortAnswer: "Using the built-in function `SELECT LAST_INSERT_ID();`.",
    explanation: "`LAST_INSERT_ID()` returns the first auto-increment value assigned in the current connection session, making it 100% thread-safe and isolated from other concurrent users.",
    hint: "Thread-safe LAST_INSERT_ID() function.",
    level: "basic",
    codeExample: "INSERT INTO students (first_name, email) VALUES ('Mahima', 'mahima@jadavpur.edu');\nSELECT LAST_INSERT_ID();"
  },
  {
    question: "What does the `INSERT IGNORE` statement do when encountering a duplicate PRIMARY KEY or UNIQUE constraint?",
    shortAnswer: "It converts duplicate key fatal errors (Error 1062) into non-fatal warnings, skips inserting the colliding row, and continues processing the rest of the batch.",
    explanation: "`INSERT IGNORE` allows bulk ETL loading pipelines to proceed without aborting when duplicate records are encountered.",
    hint: "Suppression of Error 1062 duplicate key exceptions.",
    level: "moderate",
    codeExample: "INSERT IGNORE INTO students (roll_no, first_name) VALUES ('REG-101', 'Mamata');"
  },
  {
    question: "What is an 'Upsert' in MySQL and how is it implemented using `ON DUPLICATE KEY UPDATE`?",
    shortAnswer: "An operation that inserts a row if its primary/unique key does not exist, or updates specified columns if a key collision occurs.",
    explanation: "In `INSERT INTO stock (item_id, qty) VALUES (101, 10) ON DUPLICATE KEY UPDATE qty = qty + 10;`, MySQL checks if `item_id=101` exists. If not, it inserts; if it exists, it increments `qty` atomically.",
    hint: "Atomic Insert-or-Update construct.",
    level: "moderate",
    codeExample: "INSERT INTO inventory (item_id, stock_count)\nVALUES (501, 20)\nON DUPLICATE KEY UPDATE stock_count = stock_count + VALUES(stock_count);"
  },
  {
    question: "How do you populate a table dynamically using the results of a SELECT query (`INSERT INTO ... SELECT`)?",
    shortAnswer: "`INSERT INTO target_table (col1, col2) SELECT colA, colB FROM source_table WHERE condition;`.",
    explanation: "This server-side ETL pattern streams data directly between tables within the database engine without routing millions of records through client application memory.",
    hint: "Server-side batch data transformation.",
    level: "moderate",
    codeExample: "INSERT INTO honor_students (student_id, full_name, gpa)\nSELECT student_id, CONCAT(first_name, ' ', last_name), gpa\nFROM students\nWHERE gpa >= 3.8;"
  },
  {
    question: "What happens if you omit a non-nullable column with no default value during an `INSERT` in strict SQL mode (`STRICT_TRANS_TABLES`)?",
    shortAnswer: "MySQL rejects the insert immediately with Error 1364 (HY000): 'Field doesn\'t have a default value'.",
    explanation: "Strict SQL mode enforces data integrity by blocking partial inserts that lack mandatory column data.",
    hint: "Error 1364 in strict SQL mode.",
    level: "basic"
  },
  {
    question: "Can you insert rows into a table without explicitly naming any columns in the `INSERT INTO` clause?",
    shortAnswer: "Yes, but you MUST provide values for EVERY column in the exact positional sequence defined in the table schema.",
    explanation: "While `INSERT INTO t VALUES (1, 'Mamata', 15000);` is valid, it is considered an anti-pattern because any subsequent `ALTER TABLE ADD COLUMN` will break the query.",
    hint: "Positional insert fragility anti-pattern.",
    level: "basic",
    codeExample: "-- Fragile positional insert:\nINSERT INTO students VALUES (DEFAULT, 'REG-101', 'Mamata', 'Hui', 'mamata@in.co', 15000.00, 1, NOW());"
  },
  {
    question: "What is the MySQL-specific `INSERT INTO ... SET` syntax?",
    shortAnswer: "`INSERT INTO table_name SET col1 = val1, col2 = val2;`.",
    explanation: "An alternative MySQL-specific syntax that mirrors UPDATE style assignment for single-row insertions.",
    hint: "SET assignment syntax for inserts.",
    level: "basic",
    codeExample: "INSERT INTO students\nSET first_name = 'Mamata',\n    email = 'mamata@codernaccotax.in',\n    admission_fee = 15000.00;"
  },
  {
    question: "What does `LAST_INSERT_ID()` return when executing a multi-row insert?",
    shortAnswer: "It returns the auto-increment ID of the FIRST row inserted in that batch.",
    explanation: "If you insert 3 rows that receive IDs 101, 102, and 103, `LAST_INSERT_ID()` returns `101` so your application can calculate consecutive IDs reliably.",
    hint: "First assigned ID in bulk batch.",
    level: "expert"
  },
  {
    question: "How do you insert the current system timestamp into a temporal column during `INSERT`?",
    shortAnswer: "Using built-in SQL functions `CURRENT_TIMESTAMP`, `NOW()`, or `CURRENT_DATE()`.",
    explanation: "Passing `NOW()` evaluates to the current server date and time in `YYYY-MM-DD HH:MM:SS` format.",
    hint: "NOW() and CURRENT_TIMESTAMP functions.",
    level: "basic",
    codeExample: "INSERT INTO orders (order_number, created_at)\nVALUES ('ORD-2026-001', NOW());"
  },
  {
    question: "What error occurs if you insert a duplicate value into a column marked as `UNIQUE`?",
    shortAnswer: "Error 1062 (23000): 'Duplicate entry ... for key ...'.",
    explanation: "Unique secondary B-Tree indexes reject duplicate non-null entries to preserve entity uniqueness.",
    hint: "Error 1062 unique key violation.",
    level: "basic"
  },
  {
    question: "What happens when inserting a NULL value into an `AUTO_INCREMENT` column?",
    shortAnswer: "MySQL automatically intercepts the NULL (or 0) and generates the next sequential integer ID.",
    explanation: "Explicitly passing `NULL` into an auto-increment column is standard practice to trigger sequence generation.",
    hint: "NULL triggers sequence generation on auto-increment columns.",
    level: "basic",
    codeExample: "INSERT INTO students (student_id, first_name) VALUES (NULL, 'Mamata');"
  },
  {
    question: "How do you insert an explicit specific ID into an `AUTO_INCREMENT` column?",
    shortAnswer: "Pass the explicit number in the `VALUES` list (e.g. `INSERT INTO t (id, name) VALUES (999, 'Debangshu');`).",
    explanation: "MySQL accepts the explicit ID (as long as it does not collide with an existing key) and automatically adjusts the internal counter if `999` is higher than the current max.",
    hint: "Explicit ID overrides auto counter and adjusts max seed.",
    level: "moderate",
    codeExample: "INSERT INTO students (student_id, first_name) VALUES (5000, 'Debangshu');"
  },
  {
    question: "What is the maximum recommended batch size for multi-row `INSERT` statements?",
    shortAnswer: "Typically 1,000 to 5,000 rows per batch (limited by `max_allowed_packet` and InnoDB redo log buffer).",
    explanation: "Batching 2,000 rows balances maximum network efficiency without risking packet size exhaustion or long transaction locks.",
    hint: "1000-5000 row batch sweet spot and max_allowed_packet.",
    level: "expert"
  },
  {
    question: "What is the `VALUES()` function (or row alias in MySQL 8.0.20+) in `ON DUPLICATE KEY UPDATE`?",
    shortAnswer: "It references the new incoming value that was proposed for insertion in the current row.",
    explanation: "In MySQL 8.0.20+, the new standard syntax is `INSERT INTO t (id, c1) VALUES (1, 10) AS new_row ON DUPLICATE KEY UPDATE c1 = new_row.c1;`.",
    hint: "Row alias in modern MySQL 8.0.20+ upserts.",
    level: "expert",
    codeExample: "INSERT INTO inventory (item_id, stock_count)\nVALUES (101, 5) AS new_data\nON DUPLICATE KEY UPDATE stock_count = stock_count + new_data.stock_count;"
  },
  {
    question: "What happens if you insert string data that exceeds column length in non-strict mode vs strict mode?",
    shortAnswer: "Strict mode aborts with Error 1406 ('Data too long'); non-strict mode truncates the string with a warning.",
    explanation: "`STRICT_TRANS_TABLES` (default in modern MySQL) ensures data is never silently corrupted or truncated.",
    hint: "Error 1406 data truncation protection.",
    level: "moderate"
  },
  {
    question: "How do you insert special characters, single quotes, or backslashes into a text column?",
    shortAnswer: "By escaping with a backslash (`\\'`) or doubling the single quote (`''`).",
    explanation: "Inserting `O'Connor` requires `'O\\'Connor'` or `'O''Connor'`. In application code, always use Parameterized Prepared Statements (`?`) to prevent SQL injection.",
    hint: "Quote escaping and parameterized queries.",
    level: "basic",
    codeExample: "INSERT INTO authors (name) VALUES ('Arthur Conan D\\'Hui');"
  },
  {
    question: "Can an `INSERT` statement populate a generated (computed) column directly?",
    shortAnswer: "No; attempting to insert into a VIRTUAL or STORED generated column throws Error 3105: 'The value specified for generated column is not allowed'.",
    explanation: "Generated columns derive their values automatically from their mathematical expressions; manual values are rejected.",
    hint: "Error 3105 on generated columns.",
    level: "moderate"
  },
  {
    question: "How does `INSERT` enforce Foreign Key referential integrity in InnoDB?",
    shortAnswer: "InnoDB checks the parent table's clustered/secondary index; if the foreign key value is not found, it throws Error 1452.",
    explanation: "Error 1452: 'Cannot add or update a child row: a foreign key constraint fails'.",
    hint: "Error 1452 foreign key integrity violation.",
    level: "basic"
  },
  {
    question: "What is a 'Delayed Insert' (`INSERT DELAYED`) and what is its status in MySQL 8.0?",
    shortAnswer: "`INSERT DELAYED` was an asynchronous MyISAM insert handler that was completely removed in MySQL 8.0.",
    explanation: "InnoDB handles high concurrency through buffer pools and redo logging, rendering delayed inserts obsolete.",
    hint: "Deprecated and removed MyISAM feature.",
    level: "expert"
  },
  {
    question: "How can you insert binary data (UUIDs, images) efficiently into a `BINARY(16)` column?",
    shortAnswer: "Using `UUID_TO_BIN(UUID())` in MySQL 8.0.",
    explanation: "`INSERT INTO users (user_uuid, name) VALUES (UUID_TO_BIN(UUID()), 'Susmita');` compresses a 36-char UUID into 16 compact bytes.",
    hint: "UUID_TO_BIN binary compression function.",
    level: "expert",
    codeExample: "INSERT INTO users (user_uuid, name) VALUES (UUID_TO_BIN(UUID()), 'Susmita');"
  },
  {
    question: "What lock does InnoDB acquire during an `INSERT` statement?",
    shortAnswer: "An exclusive row-level lock (X lock) on the inserted clustered index record, and insert intention gap locks if secondary unique indexes exist.",
    explanation: "Row-level locking enables thousands of concurrent client connections to insert rows into the same table simultaneously without blocking one another.",
    hint: "Exclusive row-level X lock and insert intention locks.",
    level: "expert"
  },
  {
    question: "How do you insert default values for all columns in a table without specifying values?",
    shortAnswer: "`INSERT INTO table_name () VALUES ();` or `INSERT INTO table_name DEFAULT VALUES;`.",
    explanation: "MySQL populates all columns with their schema defined `DEFAULT` or auto-increment values.",
    hint: "Empty parenthesis default insert syntax.",
    level: "moderate",
    codeExample: "INSERT INTO log_events () VALUES ();"
  },
  {
    question: "Why should applications always use Parameterized Prepared Statements (`INSERT INTO t VALUES (?, ?)`)?",
    shortAnswer: "To completely eliminate SQL Injection vulnerabilities, automate type escaping, and improve performance through query plan reuse.",
    explanation: "Prepared statements separate SQL syntax parsing from data parameters, ensuring malicious inputs cannot alter query logic.",
    hint: "SQL injection prevention and statement caching.",
    level: "basic"
  },
  {
    question: "What is the return value of an `INSERT` statement in MySQL CLI?",
    shortAnswer: "`Query OK, N row(s) affected` followed by execution time.",
    explanation: "In `ON DUPLICATE KEY UPDATE`, an insert returns `1 row affected`, an update returns `2 rows affected`, and an update to identical values returns `0 rows affected`.",
    hint: "Rows affected metric in upserts.",
    level: "moderate"
  },
  {
    question: "How do you insert JSON data into a MySQL `JSON` column?",
    shortAnswer: "Pass a valid JSON formatted string (e.g. `'{\"key\": \"val\"}'`) or use `JSON_OBJECT('key', 'val')`.",
    explanation: "MySQL validates JSON syntax on insert and converts it into a binary format for fast key extraction.",
    hint: "JSON validation and JSON_OBJECT function.",
    level: "moderate",
    codeExample: "INSERT INTO user_profiles (user_id, metadata)\nVALUES (101, JSON_OBJECT('theme', 'dark', 'city', 'Barrackpore'));"
  },
  {
    question: "What happens if a database transaction containing 10 `INSERT` statements fails on the 10th insert in strict mode?",
    shortAnswer: "If wrapped in `START TRANSACTION ... COMMIT;`, the entire transaction can be rolled back via `ROLLBACK`, restoring the table to its exact pre-transaction state.",
    explanation: "ACID atomicity guarantees that either all 10 inserts persist or none do.",
    hint: "Transactional atomicity rollback.",
    level: "basic",
    codeExample: "START TRANSACTION;\nINSERT INTO accounts VALUES (...);\nINSERT INTO ledger VALUES (...);\n-- On error:\nROLLBACK;"
  },
  {
    question: "What is `innodb_autoinc_lock_mode` and how does it affect bulk multi-row inserts?",
    shortAnswer: "It controls how InnoDB allocates auto-increment locks; setting `2` (interleaved mode, default in 8.0) maximizes concurrent bulk insert throughput.",
    explanation: "Interleaved lock mode avoids table-level auto-increment mutexes, generating sequence IDs concurrently with zero lock contention.",
    hint: "Auto-increment lock mode 2 (interleaved).",
    level: "expert"
  },
  {
    question: "What is the golden rule checklist before executing bulk `INSERT` scripts in production?",
    shortAnswer: "1) Explicitly specify column names. 2) Batch in chunks of 1,000-2,000 rows. 3) Wrap in an explicit transaction. 4) Use `DECIMAL` for currency (₹). 5) Use parameterized queries.",
    explanation: "Following these 5 rules ensures maximum throughput, data integrity, and security.",
    hint: "Column list, Batch chunks, Transactions, Parameterized queries.",
    level: "basic"
  }
];

export default questions;
