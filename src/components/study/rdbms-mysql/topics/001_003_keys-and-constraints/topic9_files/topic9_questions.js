// topic9_files/topic9_questions.js

const questions = [
  {
    question: "How do you define a custom starting seed for an `AUTO_INCREMENT` column during `CREATE TABLE`?",
    shortAnswer: "By adding the `AUTO_INCREMENT = starting_value` table option at the end of the `CREATE TABLE` statement.",
    explanation: "The first inserted row receives the specified starting integer.",
    hint: "AUTO_INCREMENT = starting_value table option.",
    level: "basic",
    codeExample: "CREATE TABLE students (\n    student_id INT AUTO_INCREMENT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL\n) ENGINE=InnoDB AUTO_INCREMENT = 1001;"
  },
  {
    question: "How do you reset or advance the `AUTO_INCREMENT` starting value on an existing table?",
    shortAnswer: "`ALTER TABLE table_name AUTO_INCREMENT = new_value;`.",
    explanation: "The new value must be greater than the maximum ID currently present in the table.",
    hint: "ALTER TABLE tbl AUTO_INCREMENT = new_value.",
    level: "basic",
    codeExample: "ALTER TABLE students AUTO_INCREMENT = 5000;"
  },
  {
    question: "What happens if you execute `ALTER TABLE tbl AUTO_INCREMENT = 50;` when the table already contains a row with `id = 100`?",
    shortAnswer: "InnoDB silently ignores the request; the counter remains at 101 because `AUTO_INCREMENT` can never be reset to a value less than or equal to `MAX(id)`.",
    explanation: "Protects table rows from key collisions and duplicate key errors.",
    hint: "Silently ignored if below MAX(id).",
    level: "moderate"
  },
  {
    question: "What is the difference between `DELETE FROM table;` and `TRUNCATE TABLE table;` regarding the `AUTO_INCREMENT` counter?",
    shortAnswer: "`TRUNCATE TABLE` wipes all data and resets the `AUTO_INCREMENT` counter back to 1 (or the initial schema seed); `DELETE FROM` leaves the counter at `MAX(id) + 1`.",
    explanation: "TRUNCATE re-creates the table physically on disk, resetting all counters.",
    hint: "TRUNCATE resets counter; DELETE retains counter.",
    level: "basic"
  },
  {
    question: "How can you reset the `AUTO_INCREMENT` counter back to 1 after running `DELETE FROM table;`?",
    shortAnswer: "Execute `ALTER TABLE table_name AUTO_INCREMENT = 1;` after deleting all rows.",
    explanation: "Since the table is now empty (MAX(id) is NULL), resetting to 1 succeeds.",
    hint: "DELETE all rows, then ALTER TABLE AUTO_INCREMENT = 1.",
    level: "basic",
    codeExample: "DELETE FROM students;\nALTER TABLE students AUTO_INCREMENT = 1;"
  },
  {
    question: "How do you inspect the current next `AUTO_INCREMENT` value of a table in MySQL?",
    shortAnswer: "Query `information_schema.TABLES` where `TABLE_NAME = 'tablename'`, or run `SHOW TABLE STATUS LIKE 'tablename';`.",
    explanation: "Returns the integer value that will be assigned to the next inserted tuple.",
    hint: "information_schema.TABLES or SHOW TABLE STATUS.",
    level: "basic",
    codeExample: "SELECT AUTO_INCREMENT FROM information_schema.TABLES\nWHERE TABLE_SCHEMA = 'college_db' AND TABLE_NAME = 'students';"
  },
  {
    question: "Why do companies start user/invoice IDs at custom numbers like 100,000 instead of 1?",
    shortAnswer: "To prevent customers or competitors from guessing total business volume and order counts from small sequential IDs.",
    explanation: "A customer receiving Invoice #3 knows they are only the third customer.",
    hint: "Business volume obfuscation.",
    level: "basic"
  },
  {
    question: "How does MySQL 8.0 persist the `AUTO_INCREMENT` counter across database restarts?",
    shortAnswer: "MySQL 8.0 writes the current counter to the InnoDB redo log on every change and persists it in the internal data dictionary.",
    explanation: "In MySQL 5.7, restarting the server recalculated the counter as `MAX(id) + 1`, which caused reused IDs if top rows were deleted.",
    hint: "Persisted in redo log and data dictionary in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "What happens if you insert a row with an explicit ID that is much larger than the current counter (e.g. inserting ID=9999 when counter is 100)?",
    shortAnswer: "The row is inserted with ID 9999, and the counter immediately jumps to 10000 for all subsequent inserts.",
    explanation: "The sequence counter automatically advances to `inserted_id + 1`.",
    hint: "Counter automatically advances to explicit ID + 1.",
    level: "moderate"
  },
  {
    question: "Can `AUTO_INCREMENT` be reset to 0 in MySQL?",
    shortAnswer: "No, `AUTO_INCREMENT` values in MySQL are 1-based positive integers; setting to 0 defaults to 1.",
    explanation: "Zero is reserved as an alias for NULL in auto-increment generation.",
    hint: "1-based positive integer minimum.",
    level: "basic"
  },
  {
    question: "How do you reset the `AUTO_INCREMENT` counter to `MAX(id) + 1` after deleting the highest ID rows in a table in MySQL 8.0?",
    shortAnswer: "In MySQL 8.0, execute `ALTER TABLE table_name AUTO_INCREMENT = 1;`. MySQL automatically clamps the counter to `MAX(id) + 1`.",
    explanation: "Shrinks the counter to the new maximum existing row + 1.",
    hint: "Clamps to current MAX(id) + 1.",
    level: "expert",
    codeExample: "DELETE FROM students WHERE student_id >= 500;\nALTER TABLE students AUTO_INCREMENT = 1; -- Clamps to MAX(id)+1"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be configured to decrement (count down) in MySQL?",
    shortAnswer: "No, MySQL's native `AUTO_INCREMENT` attribute only supports positive, monotonic increments.",
    explanation: "Downward sequences require custom trigger logic.",
    hint: "Monotonic increments only.",
    level: "moderate"
  },
  {
    question: "What is the effect of `SET @@auto_increment_increment = 5;` on sequence generation?",
    shortAnswer: "Each newly inserted row increments by 5 instead of 1 (e.g. 1001, 1006, 1011, 1016).",
    explanation: "Configures step size for multi-master replication clusters.",
    hint: "Configures sequence step increment.",
    level: "expert",
    codeExample: "SET @@SESSION.auto_increment_increment = 5;"
  },
  {
    question: "What is the effect of `SET @@auto_increment_offset = 2;` in MySQL?",
    shortAnswer: "It determines the starting offset of the auto-increment sequence (e.g. 2, 7, 12, 17 with increment 5).",
    explanation: "Used alongside increment to partition sequence ranges across different database master nodes.",
    hint: "Configures sequence starting modulo offset.",
    level: "expert"
  },
  {
    question: "What happens if a child table has a foreign key referencing an auto-increment parent, and you attempt to run `TRUNCATE TABLE parent_table;`?",
    shortAnswer: "MySQL rejects the truncate with Error 1701: 'Cannot truncate a table referenced in a foreign key constraint'.",
    explanation: "Foreign key checks prevent wiping referenced master tables.",
    hint: "Error 1701 TRUNCATE prohibition.",
    level: "moderate"
  },
  {
    question: "How can you safely reset an `AUTO_INCREMENT` parent table that has foreign key dependencies during local testing?",
    shortAnswer: "1) `SET foreign_key_checks = 0;`, 2) `TRUNCATE TABLE child_table;`, 3) `TRUNCATE TABLE parent_table;`, 4) `SET foreign_key_checks = 1;`.",
    explanation: "Administrative workflow for resetting local development sandboxes.",
    hint: "Temporarily disable foreign_key_checks during local test truncation.",
    level: "expert",
    codeExample: "SET foreign_key_checks = 0;\nTRUNCATE TABLE student_payments;\nTRUNCATE TABLE students;\nSET foreign_key_checks = 1;"
  },
  {
    question: "Can an `AUTO_INCREMENT` column be reset using a prepared statement with dynamic parameters (`ALTER TABLE tbl AUTO_INCREMENT = ?`)?",
    shortAnswer: "No, DDL statements like `ALTER TABLE` do not support parameter placeholders in prepared statements; the value must be concatenated in dynamic SQL.",
    explanation: "Prepared statements parameterize DML values, not DDL schema statements.",
    hint: "DDL statements cannot use parameter placeholders.",
    level: "expert"
  },
  {
    question: "What happens if you specify `AUTO_INCREMENT = 100` during `CREATE TABLE` and then insert a row with `student_id = 50` explicitly?",
    shortAnswer: "The row is inserted with `id = 50`, and the next auto-increment insert still generates `100` as configured.",
    explanation: "Explicit inserts lower than the seed do not alter the forward seed.",
    hint: "Seed remains active for future auto-generation.",
    level: "moderate"
  },
  {
    question: "How does `OPTIMIZE TABLE table_name;` interact with the `AUTO_INCREMENT` counter in MySQL 8.0 InnoDB?",
    shortAnswer: "`OPTIMIZE TABLE` rebuilds table storage pages to reclaim fragmented space but PRESERVES the current `AUTO_INCREMENT` counter.",
    explanation: "Does not reset or alter sequence positions.",
    hint: "Preserves current sequence counter.",
    level: "moderate"
  },
  {
    question: "Why should you use `BIGINT UNSIGNED` when configuring custom starting seeds in the millions (e.g. `AUTO_INCREMENT = 500000000`)?",
    shortAnswer: "Because signed 32-bit `INT` caps at 2.14 billion; starting at 500 million leaves only 1.64 billion available IDs before sequence exhaustion.",
    explanation: "`BIGINT UNSIGNED` provides up to 18.4 quintillion values, eliminating exhaustion risk.",
    hint: "Prevents sequence integer overflow when starting at high seeds.",
    level: "expert"
  },
  {
    question: "How do you check if a table is nearing its `AUTO_INCREMENT` maximum capacity in production monitoring?",
    shortAnswer: "By comparing `AUTO_INCREMENT` from `information_schema.TABLES` against the maximum ceiling of the column's data type in `information_schema.COLUMNS`.",
    explanation: "Standard database SRE health check metric.",
    hint: "Compare current counter against data type maximum.",
    level: "expert"
  },
  {
    question: "Can `AUTO_INCREMENT` starting values be configured per-partition in partitioned tables in MySQL?",
    shortAnswer: "No, the `AUTO_INCREMENT` counter is global across all partitions of the table.",
    explanation: "Partitions share the single table-level sequence generator.",
    hint: "Global counter across all partitions.",
    level: "expert"
  },
  {
    question: "What is the return value of `LAST_INSERT_ID()` immediately after running `TRUNCATE TABLE students;`?",
    shortAnswer: "`0` (or whatever ID was generated in the last previous INSERT during that connection).",
    explanation: "`TRUNCATE` does not update or clear connection session variables.",
    hint: "Unchanged session variable.",
    level: "moderate"
  },
  {
    question: "How does `ALTER TABLE table_name FORCE;` interact with `AUTO_INCREMENT`?",
    shortAnswer: "It rebuilds the table in-place to reclaim space and retains the current `AUTO_INCREMENT` counter value.",
    explanation: "Preserves sequence progression.",
    hint: "Preserves counter during table rebuild.",
    level: "moderate"
  },
  {
    question: "Can a user with only `INSERT` privileges alter the `AUTO_INCREMENT` counter?",
    shortAnswer: "No, altering the `AUTO_INCREMENT` counter requires `ALTER` privilege on the table.",
    explanation: "Modifying sequence seeds is a DDL operation.",
    hint: "Requires ALTER privilege.",
    level: "basic"
  },
  {
    question: "What happens if you insert an explicit value equal to the maximum `BIGINT UNSIGNED` value (18446744073709551615)?",
    shortAnswer: "The row is inserted successfully, but ALL future auto-increment inserts fail with Error 1062 (Duplicate entry / Sequence exhausted).",
    explanation: "The counter cannot advance past the 64-bit integer ceiling.",
    hint: "Maximum 64-bit integer saturation.",
    level: "expert"
  },
  {
    question: "How do you configure an `AUTO_INCREMENT` seed using MySQL Workbench GUI?",
    shortAnswer: "In the Table Editor, select the Table Options tab and enter the desired integer in the 'Auto Increment' input box.",
    explanation: "Generates the corresponding `AUTO_INCREMENT = seed` DDL.",
    hint: "Table Options tab in MySQL Workbench.",
    level: "basic"
  },
  {
    question: "What happens when you clone a table using `CREATE TABLE copy LIKE original;` regarding the starting seed?",
    shortAnswer: "`CREATE TABLE ... LIKE` copies table structure and indexes, and resets the `AUTO_INCREMENT` counter to 1 (or original schema seed) on the new empty table.",
    explanation: "New empty table starts fresh.",
    hint: "Starts fresh on cloned table.",
    level: "moderate"
  },
  {
    question: "How does `ALTER TABLE table_name AUTO_INCREMENT = val` behave in MySQL 8.0 Instant DDL?",
    shortAnswer: "In MySQL 8.0, modifying `AUTO_INCREMENT` is an INSTANT metadata operation (`ALGORITHM=INSTANT`), completing in sub-milliseconds without table locks or page copies.",
    explanation: "Instant DDL modifies only data dictionary metadata.",
    hint: "ALGORITHM=INSTANT metadata update.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist for configuring and resetting AUTO_INCREMENT starting values?",
    shortAnswer: "1) Use `AUTO_INCREMENT = seed` in DDL for standardized institutional numbering. 2) Use `TRUNCATE TABLE` to quickly wipe and reset test tables to 1. 3) Never try to reset below `MAX(id)` on populated tables. 4) Use `BIGINT UNSIGNED` when starting with high seeds. 5) Monitor sequence usage in `information_schema.TABLES`.",
    explanation: "Following these 5 rules guarantees smooth sequence management and zero integer overflow bugs.",
    hint: "Seed in DDL, TRUNCATE to reset, Respect MAX(id), BIGINT scale, Monitor usage.",
    level: "basic"
  }
];

export default questions;
