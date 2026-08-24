// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the `AUTO_INCREMENT` attribute in MySQL?",
    shortAnswer: "A column modifier that automatically generates a unique, sequential integer identifier for every newly inserted record.",
    explanation: "Simplifies surrogate primary key generation without requiring manual ID coordination.",
    hint: "Automatic sequential integer generation.",
    level: "basic",
    codeExample: "student_id INT AUTO_INCREMENT PRIMARY KEY"
  },
  {
    question: "How many `AUTO_INCREMENT` columns can exist in a single MySQL table?",
    shortAnswer: "Exactly ONE `AUTO_INCREMENT` column per table.",
    explanation: "MySQL restricts auto-increment sequence engines to a single column per table.",
    hint: "Maximum one AUTO_INCREMENT column per table.",
    level: "basic"
  },
  {
    question: "What index requirement must be satisfied by an `AUTO_INCREMENT` column?",
    shortAnswer: "It must be indexed (defined as `PRIMARY KEY` or have a `UNIQUE`/`INDEX` defined on it).",
    explanation: "InnoDB requires fast sequence lookup on the auto-increment column.",
    hint: "Must be an indexed key.",
    level: "basic"
  },
  {
    question: "How does passing `NULL` or `0` into an `AUTO_INCREMENT` column behave in MySQL?",
    shortAnswer: "MySQL intercepts the `NULL` or `0` and generates the next sequential integer in the sequence.",
    explanation: "Standard idiom for triggering automatic key generation.",
    hint: "NULL or 0 triggers sequence generation.",
    level: "basic",
    codeExample: "INSERT INTO students (student_id, first_name) VALUES (NULL, 'Mamata');"
  },
  {
    question: "What is `LAST_INSERT_ID()` and why is it thread-safe?",
    shortAnswer: "A MySQL function that returns the first automatically generated ID from the most recent INSERT in the CURRENT connection session.",
    explanation: "It is maintained in per-connection memory, making it completely immune to concurrent inserts by other clients.",
    hint: "Connection-scoped thread-safe ID retrieval.",
    level: "moderate",
    codeExample: "SELECT LAST_INSERT_ID();"
  },
  {
    question: "Why is executing `SELECT MAX(id) FROM table` dangerous in multi-user applications?",
    shortAnswer: "It creates a race condition: another concurrent transaction could insert a row between your insert and your MAX query, returning the wrong ID.",
    explanation: "Always use `LAST_INSERT_ID()` instead of MAX(id).",
    hint: "Race condition in concurrent transactions.",
    level: "moderate"
  },
  {
    question: "What value does `LAST_INSERT_ID()` return after a multi-row batch insert (e.g. inserting 3 rows that get IDs 101, 102, 103)?",
    shortAnswer: "It returns `101` (the ID generated for the FIRST row in the batch).",
    explanation: "Designed by SQL standards to allow client applications to calculate the remaining sequential IDs.",
    hint: "First generated ID in the batch.",
    level: "expert"
  },
  {
    question: "What happens if a transaction inserts an `AUTO_INCREMENT` row and is subsequently rolled back?",
    shortAnswer: "The generated sequence number is NOT reclaimed; the sequence counter remains advanced, leaving a gap in the ID numbering.",
    explanation: "InnoDB does not roll back auto-increment counters to prevent locking contention and maintain high concurrency.",
    hint: "Rollbacks do not reclaim sequence IDs, creating gaps.",
    level: "moderate"
  },
  {
    question: "What happens when an `AUTO_INCREMENT` column reaches the maximum limit of its data type (e.g. 127 in signed TINYINT)?",
    shortAnswer: "The sequence counter saturates; all future inserts attempting to generate a higher ID fail with Error 1062 (Duplicate entry).",
    explanation: "Always choose appropriate integer sizing (`BIGINT UNSIGNED` for high-throughput tables).",
    hint: "Sequence exhaustion throws Error 1062.",
    level: "expert"
  },
  {
    question: "What integer data type is recommended for high-volume enterprise surrogate primary keys?",
    shortAnswer: "`BIGINT UNSIGNED AUTO_INCREMENT` (supports up to 18.4 quintillion rows).",
    explanation: "Prevents integer sequence overflow under large data ingest rates.",
    hint: "BIGINT UNSIGNED supports up to 18.4 quintillion values.",
    level: "basic",
    codeExample: "transaction_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY"
  },
  {
    question: "What happens if you insert an explicit value into an `AUTO_INCREMENT` column that is GREATER than the current counter (e.g. inserting 500 when counter is 10)?",
    shortAnswer: "The row is inserted with ID 500, and the internal auto-increment counter jumps immediately to 501 for all subsequent inserts.",
    explanation: "The counter automatically resets to max(id) + 1.",
    hint: "Counter jumps to explicit ID + 1.",
    level: "moderate"
  },
  {
    question: "What happens if you insert an explicit value that is LESS than the current counter (e.g. inserting 5 when counter is 100)?",
    shortAnswer: "The row is inserted with ID 5 (if no duplicate collision occurs), and the current counter remains at 100.",
    explanation: "Lower explicit inserts do not alter the forward-moving sequence counter.",
    hint: "Counter remains unchanged for lower IDs.",
    level: "moderate"
  },
  {
    question: "How does the `innodb_autoinc_lock_mode` configuration variable affect concurrency in MySQL?",
    shortAnswer: "It controls the locking algorithm used for auto-increment allocation; mode 2 ('interleaved', default in MySQL 8.0) uses lightweight mutexes for maximum parallel write scalability.",
    explanation: "Mode 2 eliminates table-level auto-inc locks.",
    hint: "innodb_autoinc_lock_mode=2 interleaved allocation.",
    level: "expert"
  },
  {
    question: "How do you configure the starting value of an `AUTO_INCREMENT` sequence during table creation?",
    shortAnswer: "Using the `AUTO_INCREMENT = starting_value` table option: `CREATE TABLE tbl (...) AUTO_INCREMENT = 1000;`.",
    explanation: "Sets the initial sequence seed.",
    hint: "AUTO_INCREMENT = starting_value table option.",
    level: "basic",
    codeExample: "CREATE TABLE students (...) AUTO_INCREMENT = 1001 ENGINE=InnoDB;"
  },
  {
    question: "How do you reset the `AUTO_INCREMENT` starting value on an existing table?",
    shortAnswer: "`ALTER TABLE table_name AUTO_INCREMENT = new_value;`.",
    explanation: "The new value must be greater than the current maximum ID present in the table.",
    hint: "ALTER TABLE tbl AUTO_INCREMENT = val.",
    level: "basic",
    codeExample: "ALTER TABLE students AUTO_INCREMENT = 5000;"
  },
  {
    question: "How does `TRUNCATE TABLE` interact with the `AUTO_INCREMENT` counter?",
    shortAnswer: "`TRUNCATE TABLE` completely resets the `AUTO_INCREMENT` counter back to 1 (or the initial schema seed).",
    explanation: "Differs from `DELETE FROM`, which retains the existing counter value.",
    hint: "TRUNCATE resets counter to 1.",
    level: "basic"
  },
  {
    question: "How does `DELETE FROM table_name;` without WHERE interact with the `AUTO_INCREMENT` counter in MySQL 8.0 InnoDB?",
    shortAnswer: "`DELETE FROM` deletes all rows but RETAINS the current auto-increment counter; the next inserted row continues from the previous maximum ID + 1.",
    explanation: "Preserves sequence progression unless TRUNCATE is used.",
    hint: "DELETE retains current counter position.",
    level: "moderate"
  },
  {
    question: "How does MySQL 8.0 persist the `AUTO_INCREMENT` counter across server restarts?",
    shortAnswer: "MySQL 8.0 writes the current auto-increment counter to the InnoDB redo log on every change and stores it in the data dictionary.",
    explanation: "Fixed the legacy MySQL 5.7 bug where server restart reset the counter to `MAX(id) + 1` from disk.",
    hint: "Persisted in redo log and data dictionary in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be created with a floating-point data type (`FLOAT` or `DOUBLE`) in MySQL 8.0?",
    shortAnswer: "No, MySQL 8.0 deprecated and removed auto-increment support on floating-point columns; auto-increment is strictly restricted to integer data types.",
    explanation: "Prevents precision truncation errors.",
    hint: "Integers only.",
    level: "expert"
  },
  {
    question: "What is the `auto_increment_increment` and `auto_increment_offset` system variables used for?",
    shortAnswer: "They configure sequence step sizes and offsets for Multi-Master (Master-Master) replication to prevent primary key collisions across servers.",
    explanation: "Server A generates odd IDs (1, 3, 5) while Server B generates even IDs (2, 4, 6).",
    hint: "Multi-Master replication ID collision prevention.",
    level: "expert",
    codeExample: "SET @@auto_increment_increment = 2;\nSET @@auto_increment_offset = 1;"
  },
  {
    question: "How do you retrieve the auto-generated ID in Node.js / Python database drivers without running an extra query?",
    shortAnswer: "Database drivers return `result.insertId` (Node.js mysql2) or `cursor.lastrowid` (Python) directly from the MySQL network protocol packet.",
    explanation: "Zero network latency overhead.",
    hint: "insertId in driver execution response.",
    level: "moderate"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be modified to remove the auto-increment attribute?",
    shortAnswer: "Yes: `ALTER TABLE table_name MODIFY column_name INT NOT NULL;` (omitting the `AUTO_INCREMENT` keyword).",
    explanation: "Retains existing column data while disabling automatic sequence generation.",
    hint: "MODIFY col type NOT NULL (omitting AUTO_INCREMENT).",
    level: "moderate",
    codeExample: "ALTER TABLE students MODIFY student_id INT NOT NULL;"
  },
  {
    question: "Can an existing integer column be modified to become `AUTO_INCREMENT`?",
    shortAnswer: "Yes: `ALTER TABLE table_name MODIFY column_name INT AUTO_INCREMENT;` (requires the column to be indexed).",
    explanation: "Enables sequence generation on existing primary keys.",
    hint: "MODIFY col type AUTO_INCREMENT.",
    level: "moderate",
    codeExample: "ALTER TABLE students MODIFY student_id INT AUTO_INCREMENT;"
  },
  {
    question: "What happens if you execute `INSERT INTO tbl (id) VALUES (0)` when `NO_AUTO_VALUE_ON_ZERO` SQL mode is enabled?",
    shortAnswer: "MySQL stores the literal integer `0` instead of generating the next auto-increment sequence number.",
    explanation: "`NO_AUTO_VALUE_ON_ZERO` allows literal 0 IDs for legacy database migrations.",
    hint: "NO_AUTO_VALUE_ON_ZERO preserves literal 0.",
    level: "expert"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be part of a Composite Primary Key in InnoDB?",
    shortAnswer: "Yes, but in InnoDB, the `AUTO_INCREMENT` column MUST be the FIRST column in the key (or have a separate standalone index).",
    explanation: "InnoDB requires sequence access without parsing secondary composite components.",
    hint: "Must be the leading column in composite index.",
    level: "expert",
    codeExample: "CREATE TABLE log_entries (\n    entry_id INT AUTO_INCREMENT,\n    app_id INT,\n    PRIMARY KEY (entry_id, app_id)\n);"
  },
  {
    question: "Why are sequential `AUTO_INCREMENT` IDs dangerous when exposed directly in public web URLs (e.g. `/user/101`)?",
    shortAnswer: "They allow attackers to enumerate all records sequentially (Insecure Direct Object Reference - IDOR) and calculate total business volume.",
    explanation: "Use UUIDs, hashed IDs (Sqids/Hashids), or random public slugs in client-facing APIs.",
    hint: "IDOR vulnerability and business metric enumeration.",
    level: "moderate"
  },
  {
    question: "How do you find the current next `AUTO_INCREMENT` value of a table?",
    shortAnswer: "Query `information_schema.TABLES` where `TABLE_NAME = 'students'` (inspect `AUTO_INCREMENT` column).",
    explanation: "Shows the next integer that will be generated.",
    hint: "information_schema.TABLES AUTO_INCREMENT column.",
    level: "basic",
    codeExample: "SELECT AUTO_INCREMENT FROM information_schema.TABLES\nWHERE TABLE_SCHEMA = 'college_db' AND TABLE_NAME = 'students';"
  },
  {
    question: "What happens if an `UPDATE` query changes an `AUTO_INCREMENT` column to a value higher than the current counter?",
    shortAnswer: "The update succeeds, and the internal counter updates to the new value + 1.",
    explanation: "Keeps the sequence counter strictly above all existing row keys.",
    hint: "Counter automatically advances to max ID + 1.",
    level: "moderate"
  },
  {
    question: "Can `LAST_INSERT_ID(expr)` be used to simulate atomic sequence generation for custom counters?",
    shortAnswer: "Yes: `UPDATE counters SET value = LAST_INSERT_ID(value + 1) WHERE name = 'invoice_seq';`.",
    explanation: "Atomically increments and captures the counter in a single statement without table locks.",
    hint: "Atomic sequence generator pattern.",
    level: "expert",
    codeExample: "UPDATE invoice_counters SET val = LAST_INSERT_ID(val + 1);\nSELECT LAST_INSERT_ID();"
  },
  {
    question: "What is the recommended checklist for implementing AUTO_INCREMENT in production MySQL databases?",
    shortAnswer: "1) Use `BIGINT UNSIGNED` for high-throughput tables. 2) Always retrieve generated keys using `LAST_INSERT_ID()`. 3) Expect and tolerate gaps caused by rollbacks. 4) Use `TRUNCATE` when resetting test tables. 5) Obfuscate public URLs to prevent enumeration attacks.",
    explanation: "Following these 5 rules ensures high-performance surrogate key generation without security vulnerabilities or overflow crashes.",
    hint: "BIGINT UNSIGNED, LAST_INSERT_ID, Expect gaps, Reset via TRUNCATE, Obfuscate public URLs.",
    level: "basic"
  }
];

export default questions;
