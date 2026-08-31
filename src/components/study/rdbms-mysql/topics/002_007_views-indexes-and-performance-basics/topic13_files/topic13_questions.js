// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is the standard SQL statement to inspect all indexes on a table named `students`?",
    shortAnswer: "`SHOW INDEX FROM students;` (or `SHOW KEYS FROM students;`).",
    explanation: "Displays all index definitions, columns, cardinality, and collation for the specified table.",
    hint: "SHOW INDEX FROM students;",
    level: "basic"
  },
  {
    question: "In `SHOW INDEX FROM table`, what does `Non_unique = 0` mean?",
    shortAnswer: "It indicates that the index enforces unique values and cannot contain duplicate rows (e.g. PRIMARY KEY or UNIQUE index).",
    explanation: "Non_unique = 1 means duplicates are permitted (standard secondary index).",
    hint: "0 means unique/primary; 1 means duplicates allowed.",
    level: "basic"
  },
  {
    question: "In `SHOW INDEX FROM table`, what does `Seq_in_index` represent?",
    shortAnswer: "The 1-based sequential position of the column within a composite index (1 for 1st column, 2 for 2nd column, etc.).",
    explanation: "Shows the leftmost-to-rightmost ordering of columns inside the index.",
    hint: "The sequential column position in a multi-column index.",
    level: "basic"
  },
  {
    question: "In `SHOW INDEX FROM table`, what does `Cardinality` represent?",
    shortAnswer: "An estimated count of the number of unique (distinct) values stored in the index.",
    explanation: "High cardinality indicates high selectivity, which helps the optimizer choose the index.",
    hint: "Estimated number of unique values in the index.",
    level: "basic"
  },
  {
    question: "Why might `Cardinality` in `SHOW INDEX` be inaccurate or outdated?",
    shortAnswer: "Because InnoDB uses statistical random page sampling rather than counting every row on every write; running `ANALYZE TABLE table_name;` refreshes the statistics.",
    explanation: "Periodic random sampling saves CPU during heavy write operations.",
    hint: "InnoDB uses random page sampling; refresh with ANALYZE TABLE.",
    level: "moderate"
  },
  {
    question: "What SQL command recalculates and updates outdated index cardinality statistics in MySQL?",
    shortAnswer: "`ANALYZE TABLE table_name;`",
    explanation: "Resamples index pages to update InnoDB catalog statistics for the query optimizer.",
    hint: "ANALYZE TABLE table_name;",
    level: "basic"
  },
  {
    question: "What does `Index_type` show in `SHOW INDEX FROM table` for standard InnoDB tables?",
    shortAnswer: "`BTREE` (or `FULLTEXT` for fulltext indexes).",
    explanation: "InnoDB uses B+Trees for all primary and secondary index structures.",
    hint: "BTREE (or FULLTEXT).",
    level: "basic"
  },
  {
    question: "What does `Collation = 'A'` indicate in `SHOW INDEX`?",
    shortAnswer: "It indicates that index keys are sorted in **Ascending** order in the B-Tree.",
    explanation: "'D' indicates Descending order in MySQL 8.0+; NULL indicates an unordered index (like FULLTEXT).",
    hint: "Ascending sort order.",
    level: "moderate"
  },
  {
    question: "What does `Sub_part` indicate in `SHOW INDEX` output?",
    shortAnswer: "The prefix character length indexed for long text columns (e.g. `20` if indexed as `address(20)`), or `NULL` if the entire column width is indexed.",
    explanation: "Indicates whether Prefix Indexing is applied to the column.",
    hint: "Prefix character length indexed on wide text columns.",
    level: "moderate"
  },
  {
    question: "What is a 'Prefix Index' in MySQL?",
    shortAnswer: "An index built on only the first N characters of a wide `VARCHAR` or `TEXT` column to reduce index memory and disk usage (e.g. `INDEX (address(30))`).",
    explanation: "Saves B-Tree space while providing high selectivity on prefixes.",
    hint: "An index covering only the first N characters of a wide string column.",
    level: "moderate"
  },
  {
    question: "What is an 'Invisible Index' in MySQL 8.0+?",
    shortAnswer: "An index that is maintained by the storage engine during DML operations but is ignored by the query optimizer during query execution.",
    explanation: "Allows testing the performance impact of removing an index before permanently dropping it.",
    hint: "An index maintained on writes but ignored by the optimizer for queries.",
    level: "expert"
  },
  {
    question: "What SQL command toggles an index to become invisible in MySQL 8.0+?",
    shortAnswer: "`ALTER TABLE table_name ALTER INDEX index_name INVISIBLE;`",
    explanation: "Hides the index from the query optimizer.",
    hint: "ALTER TABLE table_name ALTER INDEX index_name INVISIBLE;",
    level: "moderate"
  },
  {
    question: "What SQL command makes an invisible index visible again?",
    shortAnswer: "`ALTER TABLE table_name ALTER INDEX index_name VISIBLE;`",
    explanation: "Restores optimizer visibility instantly with zero rebuild time.",
    hint: "ALTER TABLE table_name ALTER INDEX index_name VISIBLE;",
    level: "basic"
  },
  {
    question: "Can a `PRIMARY KEY` index be made INVISIBLE in MySQL?",
    shortAnswer: "NO. The Primary Key is the Clustered Index and cannot be made invisible.",
    explanation: "InnoDB requires the clustered index to be visible at all times.",
    hint: "No; Primary Keys cannot be made invisible.",
    level: "basic"
  },
  {
    question: "What system table in `information_schema` contains metadata for all indexes across the database server?",
    shortAnswer: "`information_schema.STATISTICS`",
    explanation: "Enables querying and auditing all indexes across databases via standard SQL SELECT queries.",
    hint: "information_schema.STATISTICS",
    level: "moderate"
  },
  {
    question: "What is the command to create an index named `idx_city` on column `centre_city` of table `students`?",
    shortAnswer: "`CREATE INDEX idx_city ON students (centre_city);` (or `ALTER TABLE students ADD INDEX idx_city (centre_city);`).",
    explanation: "Standard DDL statement for index creation.",
    hint: "CREATE INDEX idx_city ON students (centre_city);",
    level: "basic"
  },
  {
    question: "What is the command to drop an index named `idx_city` on table `students`?",
    shortAnswer: "`DROP INDEX idx_city ON students;` (or `ALTER TABLE students DROP INDEX idx_city;`).",
    explanation: "Standard DDL statement for index removal.",
    hint: "DROP INDEX idx_city ON students;",
    level: "basic"
  },
  {
    question: "How do you drop the `PRIMARY KEY` constraint on a table?",
    shortAnswer: "`ALTER TABLE table_name DROP PRIMARY KEY;`",
    explanation: "Drops the primary key constraint.",
    hint: "ALTER TABLE table_name DROP PRIMARY KEY;",
    level: "basic"
  },
  {
    question: "What error occurs if you try to drop the PRIMARY KEY on a column with `AUTO_INCREMENT` enabled without removing AUTO_INCREMENT first?",
    shortAnswer: "`ERROR 1075 (42000): Incorrect table definition; there can be only one auto column and it must be defined as a key`",
    explanation: "AUTO_INCREMENT columns must always be indexed.",
    hint: "Error 1075: AUTO_INCREMENT columns must be indexed.",
    level: "expert"
  },
  {
    question: "What is a Functional (Expression) Index in MySQL 8.0+?",
    shortAnswer: "An index created directly on the result of a deterministic function or expression: `CREATE INDEX idx_lower ON table((LOWER(col)));`",
    explanation: "Enables index acceleration for queries filtering with that exact expression.",
    hint: "An index built on an expression or function output.",
    level: "moderate"
  },
  {
    question: "How do you specify double parentheses when creating a functional index?",
    shortAnswer: "The expression must be enclosed in double parentheses: `CREATE INDEX idx_name ON table (((expression)));`",
    explanation: "Differentiates expression syntax from column name lists in the SQL parser.",
    hint: "Must be enclosed in double parentheses.",
    level: "expert"
  },
  {
    question: "What does the `Null` column in `SHOW INDEX` indicate?",
    shortAnswer: "Displays `'YES'` if the indexed column allows `NULL` values, or empty string `''` if defined as `NOT NULL`.",
    explanation: "Shows nullability of the indexed column.",
    hint: "'YES' for nullable columns; empty for NOT NULL columns.",
    level: "basic"
  },
  {
    question: "What does `Packed = NULL` in `SHOW INDEX` mean for InnoDB?",
    shortAnswer: "InnoDB does not use key packing/compression for standard B-Trees, so `Packed` is always `NULL`.",
    explanation: "MyISAM used prefix compression (packing); InnoDB does not.",
    hint: "Always NULL for InnoDB B-Tree indexes.",
    level: "expert"
  },
  {
    question: "How do you rename an existing index in MySQL without dropping and recreating it?",
    shortAnswer: "`ALTER TABLE table_name RENAME INDEX old_idx TO new_idx;`",
    explanation: "Renames index metadata with zero table rebuild overhead.",
    hint: "ALTER TABLE table_name RENAME INDEX old_name TO new_name;",
    level: "moderate"
  },
  {
    question: "What happens to indexes when an `OPTIMIZE TABLE table_name;` command is executed?",
    shortAnswer: "InnoDB creates a fresh temporary table, rebuilds the clustered index and all secondary indexes sequentially to 93.75% page fill factor, eliminating fragmentation.",
    explanation: "Defragments table and index physical disk pages.",
    hint: "Rebuilds table and all secondary indexes cleanly, eliminating page fragmentation.",
    level: "moderate"
  },
  {
    question: "How can you identify unused or duplicate indexes using MySQL Performance Schema in MySQL 8.0+?",
    shortAnswer: "Query `sys.schema_unused_indexes` or `sys.schema_redundant_indexes` view.",
    explanation: "MySQL Sys schema provides built-in views to identify unused and redundant indexes.",
    hint: "Query sys.schema_unused_indexes or sys.schema_redundant_indexes.",
    level: "expert"
  },
  {
    question: "What is the recommended workflow before dropping an index in a production database?",
    shortAnswer: "1. Mark index `INVISIBLE` → 2. Monitor application performance for 24-48 hours → 3. If no regressions occur, run `DROP INDEX`.",
    explanation: "Invisible indexes allow risk-free testing of index decommissions.",
    hint: "Make INVISIBLE first, monitor for regressions, then permanently DROP.",
    level: "expert"
  },
  {
    question: "How does inspecting `SHOW INDEX FROM students` help Sukanta Hui audit index coverage for Mamata, Susmita, Abhronila, and Debangshu?",
    shortAnswer: "It displays index column sequence, cardinality statistics, unique constraints, and optimizer visibility across student records in Barrackpore and Kolkata.",
    explanation: "Provides complete visibility into physical index structures.",
    hint: "Shows complete index definitions, column orders, and cardinality estimates.",
    level: "basic"
  },
  {
    question: "Can an index be created on a generated (virtual or stored) column in MySQL?",
    shortAnswer: "YES. MySQL allows indexing both `VIRTUAL` and `STORED` generated columns.",
    explanation: "Indexing virtual columns enables fast search on calculated expressions.",
    hint: "Yes; indexes can be created on virtual and stored generated columns.",
    level: "moderate"
  },
  {
    question: "What is the senior database administrator's golden rule for index maintenance?",
    shortAnswer: "Regularly audit indexes using `SHOW INDEX` and `sys.schema_unused_indexes`, refresh statistics with `ANALYZE TABLE`, and always test index drops using `INVISIBLE` before executing `DROP INDEX`.",
    explanation: "Maintains optimal query speeds without accumulating write-taxing dead indexes.",
    hint: "Audit regularly, refresh stats with ANALYZE TABLE, and test removals with INVISIBLE.",
    level: "expert"
  }
];

export default questions;
