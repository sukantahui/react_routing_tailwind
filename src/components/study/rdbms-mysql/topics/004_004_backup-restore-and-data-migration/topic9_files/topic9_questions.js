// topic9_files/topic9_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 9: High-Performance Bulk Data Import: LOAD DATA INFILE and mysqlimport

const questions = [
  {
    question: "Why is `LOAD DATA INFILE` dramatically faster than executing standard multi-row `INSERT` statements for bulk loading?",
    shortAnswer: "`LOAD DATA INFILE` directly parses raw text/CSV files and streams records into InnoDB buffer pages without the CPU overhead of SQL tokenizing, query parsing, and individual statement compilation, achieving up to 20x higher insert throughput.",
    explanation: "Standard `INSERT` statements require the MySQL query optimizer to compile each statement and manage per-query transaction state. `LOAD DATA INFILE` operates as a direct engine-level bulk loader.",
    hint: "Bypasses SQL tokenizer and query compilation overhead for direct engine loading.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/orders.csv'
INTO TABLE kolkata_retail.orders
FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\\n'
IGNORE 1 LINES;`
  },
  {
    question: "What is the fundamental difference between `LOAD DATA INFILE` and `LOAD DATA LOCAL INFILE`?",
    shortAnswer: "`LOAD DATA INFILE` reads a file residing on the MySQL server's local filesystem (governed by `secure_file_priv`); `LOAD DATA LOCAL INFILE` reads a file residing on the client machine and streams it over the network to the server.",
    explanation: "Server-side import requires administrative file access on the host; client-side `LOCAL` import allows developers to upload CSV files directly from their local laptop or container over TCP.",
    hint: "Without LOCAL reads from server disk; with LOCAL reads from client disk.",
    level: "basic",
    codeExample: `-- Server-side import:
LOAD DATA INFILE '/var/lib/mysql-files/data.csv' INTO TABLE tbl;

-- Client-side streaming import:
LOAD DATA LOCAL INFILE '/home/user/data.csv' INTO TABLE tbl;`
  },
  {
    question: "What does the `secure_file_priv` system variable control, and what are its 3 possible configuration states?",
    shortAnswer: "It restricts the server directories from which files can be read with `LOAD DATA INFILE` or written with `SELECT INTO OUTFILE`. States: 1. A directory path (e.g. `/var/lib/mysql-files/` - only this folder allowed); 2. Empty string `\"\"` (all directories allowed - insecure); 3. `NULL` (all file import/export operations disabled).",
    explanation: "`secure_file_priv` prevents attackers from using SQL injection to read arbitrary operating system files like `/etc/passwd`.",
    hint: "Directory path, empty string (unrestricted), or NULL (disabled).",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'secure_file_priv';
-- Value: /var/lib/mysql-files/`
  },
  {
    question: "Why must `local_infile` be enabled on BOTH the server and the client to execute `LOAD DATA LOCAL INFILE`?",
    shortAnswer: "For security: the server must permit client file streaming (`SET GLOBAL local_infile = ON;`), and the client connection must explicitly request it (`mysql --local-infile=1`).",
    explanation: "Requiring mutual agreement prevents rogue MySQL servers from exploiting unpatched client connections to request arbitrary local files from the client.",
    hint: "Must be enabled on server via system variable and client via connection flag.",
    level: "intermediate",
    codeExample: `-- On Server:
SET PERSIST local_infile = ON;

-- On Client:
mysql --local-infile=1 -u root -p kolkata_retail`
  },
  {
    question: "How do you skip header rows in a CSV file when using `LOAD DATA INFILE`?",
    shortAnswer: "Supply the `IGNORE N LINES` clause (e.g. `IGNORE 1 LINES` to skip column header titles).",
    explanation: "Prevents CSV header strings from being parsed as data rows and failing data type validations.",
    hint: "Use IGNORE 1 LINES.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/customers.csv'
INTO TABLE kolkata_retail.customers
FIELDS TERMINATED BY ',' 
IGNORE 1 LINES;`
  },
  {
    question: "How do you perform data type transformations and string cleanups (e.g. stripping currency symbols or parsing custom dates) during `LOAD DATA INFILE`?",
    shortAnswer: "Map the CSV column to a temporary user variable (e.g. `@raw_date`), and use the `SET` clause with MySQL functions (`SET order_date = STR_TO_DATE(@raw_date, '%d/%m/%Y'))`.",
    explanation: "The `SET` clause allows inline column transformations during bulk loading without requiring intermediate ETL scripts.",
    hint: "Assign CSV columns to @variables and transform them in the SET clause.",
    level: "intermediate",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/orders.csv'
INTO TABLE kolkata_retail.orders
FIELDS TERMINATED BY ','
IGNORE 1 LINES
(order_id, customer_name, @raw_price, @raw_date)
SET 
  price = CAST(REPLACE(@raw_price, '₹', '') AS DECIMAL(10,2)),
  order_date = STR_TO_DATE(@raw_date, '%d-%m-%Y %H:%i:%s');`
  },
  {
    question: "How do you discard an unwanted column in a CSV file that does not exist in the MySQL target table?",
    shortAnswer: "Map that column to a dummy user variable (e.g. `@dummy`) that is never assigned to any table column in the `SET` clause.",
    explanation: "Because `@dummy` is never referenced in a `SET` statement, MySQL reads and discards the CSV field on the fly.",
    hint: "Map the unwanted column to a throwaway @dummy variable.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/products.csv'
INTO TABLE kolkata_retail.products
FIELDS TERMINATED BY ','
(product_id, product_name, @dummy_temp_notes, price);`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a supplier provided a 10-million-row product catalog in CSV format with prices formatted as `'₹1,250.00'`. How did Mamata load this cleanly in 15 seconds?",
    shortAnswer: "She used `LOAD DATA LOCAL INFILE` with variable mapping: `(@raw_price) SET price = CAST(REPLACE(REPLACE(@raw_price, '₹', ''), ',', '') AS DECIMAL(10,2))`.",
    explanation: "Inline string replacement stripped the Rupee symbol and commas, converting text to pure `DECIMAL(10,2)` values during the bulk load.",
    hint: "Used REPLACE() and CAST() inside the SET clause during LOAD DATA.",
    level: "moderate",
    codeExample: `LOAD DATA LOCAL INFILE '/data/barrackpore_supplier.csv'
INTO TABLE barrackpore_store.products
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
IGNORE 1 LINES
(product_id, title, @raw_price, stock_qty)
SET price = CAST(REPLACE(REPLACE(@raw_price, '₹', ''), ',', '') AS DECIMAL(10,2));`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, importing a 50-million-row daily transaction CSV was taking 25 minutes. How did Debangshu reduce the import time to 2 minutes?",
    shortAnswer: "He disabled foreign key and unique checks (`SET foreign_key_checks = 0; SET unique_checks = 0;`), relaxed redo log flushing (`SET GLOBAL innodb_flush_log_at_trx_commit = 2;`), and pre-sorted the CSV by primary key.",
    explanation: "Pre-sorting by primary key enabled sequential B-tree page writes with zero random I/O, while relaxing constraint checks removed locking contention.",
    hint: "Pre-sorted CSV by primary key and disabled secondary constraint validations.",
    level: "expert",
    codeExample: `SET foreign_key_checks = 0;
SET unique_checks = 0;
SET sql_log_bin = 0;
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
LOAD DATA INFILE '/var/lib/mysql-files/sorted_ledger.csv' INTO TABLE kolkata_bank.ledger;
SET GLOBAL innodb_flush_log_at_trx_commit = 1;`
  },
  {
    question: "What is the `mysqlimport` command-line utility, and how does it determine which table to populate?",
    shortAnswer: "It is a command-line wrapper for `LOAD DATA INFILE` that automatically imports data into the table matching the base name of the input file (e.g. `/data/orders.csv` imports into table `orders`).",
    explanation: "`mysqlimport` strips the directory and file extension to identify the target table name.",
    hint: "Matches the filename (without extension) to the table name.",
    level: "basic",
    codeExample: `mysqlimport -u root -p --local \\
  --fields-terminated-by=',' \\
  --lines-terminated-by='\\n' \\
  --ignore-lines=1 \\
  kolkata_retail /data/imports/orders.csv`
  },
  {
    question: "How do you run parallel multi-threaded bulk imports using `mysqlimport` across multiple CSV files?",
    shortAnswer: "Supply the `--use-threads=N` option with multiple file paths: `mysqlimport -u root -p --use-threads=8 dbname file1.csv file2.csv file3.csv`.",
    explanation: "`mysqlimport` spawns N concurrent worker connections to import multiple table CSV files simultaneously.",
    hint: "Use --use-threads=N with mysqlimport.",
    level: "intermediate",
    codeExample: `mysqlimport -u root -p --local --use-threads=8 \\
  --fields-terminated-by=',' \\
  kolkata_retail /data/csv/orders.csv /data/csv/customers.csv /data/csv/payments.csv`
  },
  {
    question: "What is the difference between `REPLACE INTO TABLE` and `IGNORE INTO TABLE` in `LOAD DATA INFILE`?",
    shortAnswer: "`REPLACE` overwrites existing rows that share the same unique/primary key; `IGNORE` silently discards incoming CSV rows that conflict with existing unique keys.",
    explanation: "`REPLACE` executes delete-and-insert semantics for duplicates; `IGNORE` keeps the original database row intact.",
    hint: "REPLACE overwrites existing duplicate rows; IGNORE discards duplicate CSV rows.",
    level: "basic",
    codeExample: `-- Overwrite duplicates:
LOAD DATA INFILE '/var/lib/mysql-files/updates.csv' REPLACE INTO TABLE kolkata_retail.inventory;

-- Skip duplicates:
LOAD DATA INFILE '/var/lib/mysql-files/new_leads.csv' IGNORE INTO TABLE kolkata_retail.customers;`
  },
  {
    question: "How does `FIELDS OPTIONALLY ENCLOSED BY '\"'` behave compared to `FIELDS ENCLOSED BY '\"'`?",
    shortAnswer: "`OPTIONALLY ENCLOSED` treats double quotes as enclosures only around string fields, allowing numeric fields to remain unquoted; `ENCLOSED BY` mandates that ALL fields (including numbers) must be wrapped in quotes.",
    explanation: "`OPTIONALLY ENCLOSED BY` is standard for RFC 4180 CSV files where text strings are quoted but numbers are not.",
    hint: "OPTIONALLY ENCLOSED allows unquoted numbers while parsing quoted text.",
    level: "intermediate",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/orders.csv'
INTO TABLE kolkata_retail.orders
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"';`
  },
  {
    question: "What happens if a CSV file uses Windows line endings (`\r\n`) but `LINES TERMINATED BY '\n'` is specified in MySQL on Linux?",
    shortAnswer: "The carriage return character (`\r`) is retained as part of the final column's string value, causing invisible whitespace bugs, corrupted queries, and failed string matching.",
    explanation: "Always specify `LINES TERMINATED BY '\r\n'` when importing CSV files generated on Windows systems.",
    hint: "Retains invisible \\r carriage returns in the last column; use LINES TERMINATED BY '\\r\\n'.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/windows_data.csv'
INTO TABLE kolkata_retail.orders
FIELDS TERMINATED BY ',' LINES TERMINATED BY '\r\n';`
  },
  {
    question: "How do you handle `NULL` values in CSV files during `LOAD DATA INFILE`?",
    shortAnswer: "By default, the literal string `\N` represents SQL `NULL`; for empty strings `\"\"` or word `'NULL'`, use the `SET` clause with `NULLIF()` (e.g. `SET notes = NULLIF(@raw_notes, '')`).",
    explanation: "`NULLIF(@var, '')` converts empty CSV fields into true SQL `NULL` values instead of blank strings.",
    hint: "Use \\N default or convert with NULLIF(@var, '') in the SET clause.",
    level: "intermediate",
    codeExample: `(col1, col2, @var_notes)
SET notes = NULLIF(@var_notes, '');`
  },
  {
    question: "What is the security risk of enabling `local_infile = ON` on a shared multi-tenant database server?",
    shortAnswer: "A malicious MySQL server could exploit the MySQL client-server protocol (CVE-2019-12086) to instruct connected client applications to transmit arbitrary files from the client workstation back to the server.",
    explanation: "Best practice is to keep `local_infile = OFF` globally and enable it only within specific trusted ETL application sessions.",
    hint: "Malicious servers can request arbitrary local client files via client-side file streaming.",
    level: "expert",
    codeExample: `# Secure configuration in my.cnf:
[mysqld]
local_infile = 0`
  },
  {
    question: "What does `SHOW WARNINGS;` display after running `LOAD DATA INFILE`?",
    shortAnswer: "Detailed row-by-row notices about truncated strings, invalid date conversions, numeric overflow adjustments, and skipped duplicate rows.",
    explanation: "Reviewing warnings ensures that no silent data corruption or loss occurred during bulk loading.",
    hint: "Displays detailed data truncation and type conversion warnings.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/orders.csv' INTO TABLE orders;
SHOW WARNINGS;`
  },
  {
    question: "How does pre-sorting CSV data by Primary Key prior to `LOAD DATA INFILE` maximize InnoDB write performance?",
    shortAnswer: "Inserting rows in sequential primary key order allows InnoDB to append records directly to the end of existing clustered index pages (fill factor ~93%) with zero page splits and minimal redo log churn.",
    explanation: "Random primary key insertions (e.g. UUIDs) trigger expensive B-tree page splits and random disk I/O, slowing imports by over 70%.",
    hint: "Sequential PK insertion prevents random B-tree page splits and minimizes disk I/O.",
    level: "expert",
    codeExample: `# Linux sort by first column (ID) before loading:
sort -t',' -k1,1n unsorted_orders.csv > sorted_orders.csv`
  },
  {
    question: "What is the role of `ESCAPED BY '\\\\'` in `LOAD DATA INFILE`?",
    shortAnswer: "It defines the escape character used to indicate special literal characters within fields, such as escaped quotes (`\\\"`), newlines (`\\n`), and backslashes (`\\\\`).",
    explanation: "Prevents embedded commas or quotes inside text fields from breaking column parsing boundaries.",
    hint: "Defines the escape sequence character for embedded delimiters.",
    level: "basic",
    codeExample: `FIELDS TERMINATED BY ',' ENCLOSED BY '"' ESCAPED BY '\\\\'`
  },
  {
    question: "Why should `innodb_buffer_pool_size` be sized generously on the database host before executing massive `LOAD DATA INFILE` operations?",
    shortAnswer: "To hold newly created clustered and secondary index pages in RAM, preventing constant page flushing and dirty page eviction bottlenecks during multi-gigabyte inserts.",
    explanation: "A large buffer pool absorbs write bursts, allowing background flush threads to write pages sequentially to disk.",
    hint: "Buffers index pages in memory to absorb bulk insert write bursts.",
    level: "intermediate",
    codeExample: `# my.cnf recommendation:
innodb_buffer_pool_size = 32G`
  },
  {
    question: "How do you bulk load data into a table with an `AUTO_INCREMENT` primary key when the CSV does not contain ID numbers?",
    shortAnswer: "Omit the `id` column from the column list, or map a `NULL` literal in the `SET` clause (`SET id = NULL`).",
    explanation: "MySQL automatically generates sequential auto-increment values for each inserted row.",
    hint: "Omit the auto-increment column from the column list or set to NULL.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/new_products.csv'
INTO TABLE kolkata_retail.products
FIELDS TERMINATED BY ','
(product_name, category, price)
SET id = NULL;`
  },
  {
    question: "Can `LOAD DATA INFILE` populate Virtual Generated Columns directly from a CSV file?",
    shortAnswer: "No, Virtual Generated Columns cannot be directly populated because they are computed dynamically on query read; Stored Generated Columns are updated automatically from their base columns.",
    explanation: "Attempting to assign a CSV field directly to a generated column causes an error. Assign CSV fields to the base columns instead.",
    hint: "Generated columns compute automatically and cannot be targeted directly in imports.",
    level: "intermediate",
    codeExample: `-- Target base columns only; generated columns evaluate automatically.`
  },
  {
    question: "What is the difference between `mysqlimport` and MySQL Shell `util.importTable()`?",
    shortAnswer: "`mysqlimport` is a legacy single/multi-threaded wrapper for `LOAD DATA`; `util.importTable()` in MySQL Shell is a modern C++ parallel bulk loader that chunks files automatically and streams data across parallel worker connections with built-in compression and dialect parsing.",
    explanation: "`util.importTable()` delivers up to 3x higher throughput than legacy `mysqlimport` on modern multi-core NVMe hosts.",
    hint: "util.importTable() in MySQL Shell is modern, parallel, and features auto-chunking.",
    level: "expert",
    codeExample: `// In MySQL Shell:
util.importTable('/data/orders.csv', {
  schema: 'kolkata_retail',
  table: 'orders',
  threads: 8,
  bytesPerChunk: '64M'
});`
  },
  {
    question: "How does `LOAD DATA INFILE` handle character set conversion for files encoded in `latin1` imported into a `utf8mb4` table?",
    shortAnswer: "Specify `CHARACTER SET latin1` in the `LOAD DATA` statement (`LOAD DATA INFILE ... CHARACTER SET latin1 INTO TABLE ...`).",
    explanation: "MySQL reads the file using the specified character set and converts characters to the table's `utf8mb4` encoding transparently.",
    hint: "Use CHARACTER SET charset_name in the LOAD DATA statement.",
    level: "basic",
    codeExample: `LOAD DATA INFILE '/var/lib/mysql-files/legacy.csv'
INTO TABLE kolkata_retail.customers
CHARACTER SET latin1
FIELDS TERMINATED BY ',';`
  },
  {
    question: "What is the impact of running `LOAD DATA INFILE` within an explicit transaction (`START TRANSACTION ... COMMIT`)?",
    shortAnswer: "All inserted rows are held in transactional undo/redo logs until `COMMIT`; on massive multi-million-row files, this can cause excessive undo log growth and memory pressure.",
    explanation: "For multi-gigabyte loads, loading in batches or relying on default autocommit commits rows in natural chunks, preventing undo tablespace exhaustion.",
    hint: "Massive single transactions cause excessive undo log and memory bloat.",
    level: "intermediate",
    codeExample: `-- Prefer batch loading or autocommit chunks for multi-gigabyte datasets.`
  },
  {
    question: "How can you verify the exact number of records successfully loaded by `LOAD DATA INFILE`?",
    shortAnswer: "Check the client execution summary output (`Records: 1000000 Deleted: 0 Skipped: 0 Warnings: 0`) and query `SELECT COUNT(*) FROM table;`.",
    explanation: "Confirms that all expected records were loaded and highlights any skipped duplicate rows.",
    hint: "Review the 'Records: N Skipped: M' summary output.",
    level: "basic",
    codeExample: `-- Output:
-- Query OK, 1000000 rows affected (8.42 sec)
-- Records: 1000000  Deleted: 0  Skipped: 0  Warnings: 0`
  },
  {
    question: "What is the `LINES STARTING BY 'prefix'` clause used for in `LOAD DATA INFILE`?",
    shortAnswer: "It instructs MySQL to ignore all text on each line up to the specified prefix string, parsing only content that follows the prefix.",
    explanation: "Useful for parsing log files or structured outputs that prepend line numbers, timestamps, or severity labels before CSV data.",
    hint: "Ignores line prefixes and parses data starting after the specified string.",
    level: "intermediate",
    codeExample: `LINES STARTING BY 'DATA:' TERMINATED BY '\\n'`
  },
  {
    question: "Why should `ANALYZE TABLE` be executed immediately following a massive `LOAD DATA INFILE` import?",
    shortAnswer: "To refresh the InnoDB optimizer cardinality statistics, ensuring that the SQL query planner builds efficient index scan plans instead of falling back to slow full table scans.",
    explanation: "Bulk inserting millions of records invalidates old index statistics.",
    hint: "Updates optimizer index statistics for accurate query execution plans.",
    level: "basic",
    codeExample: `ANALYZE TABLE kolkata_retail.orders;`
  },
  {
    question: "How do you securely configure `secure_file_priv` in `my.cnf` for a dedicated bulk import staging area?",
    shortAnswer: "Set `secure_file_priv = /var/lib/mysql-files` in `my.cnf`, and ensure the directory is owned by the `mysql:mysql` system user with restrictive `0750` permissions.",
    explanation: "Restricting file operations to a dedicated secure directory prevents unauthorized file reads and writes across the rest of the host filesystem.",
    hint: "Set secure_file_priv in my.cnf and set ownership to mysql:mysql.",
    level: "basic",
    codeExample: `[mysqld]
secure_file_priv = /var/lib/mysql-files`
  },
  {
    question: "What is the primary operational takeaway of Topic 9 in Module 004_004?",
    shortAnswer: "`LOAD DATA INFILE` and `mysqlimport` provide the fastest bulk data loading mechanism in MySQL: master delimiter formatting, enforce `secure_file_priv` and `local_infile` security, leverage variable mapping (`@var`) for inline data transformation, and optimize engine throughput by pre-sorting data by primary key and temporarily disabling secondary constraint checks.",
    explanation: "By eliminating SQL parsing overhead and streaming records directly into InnoDB pages, database engineers load tens of millions of records in seconds, enabling high-performance ETL pipelines and rapid disaster recovery seeding.",
    hint: "Summarize 20x bulk speedup, secure_file_priv, variable transformations, and engine optimizations.",
    level: "basic",
    codeExample: `-- Master High-Speed Bulk Import Pipeline:
SET foreign_key_checks = 0;
SET unique_checks = 0;
SET sql_log_bin = 0;
LOAD DATA INFILE '/var/lib/mysql-files/orders_sorted.csv'
INTO TABLE kolkata_retail.orders
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
IGNORE 1 LINES
(order_id, customer_name, @raw_amount, @raw_date)
SET 
  amount = CAST(REPLACE(@raw_amount, '₹', '') AS DECIMAL(10,2)),
  order_date = STR_TO_DATE(@raw_date, '%d-%m-%Y');
SET foreign_key_checks = 1;
SET unique_checks = 1;
SET sql_log_bin = 1;
ANALYZE TABLE kolkata_retail.orders;`
  }
];

export default questions;
