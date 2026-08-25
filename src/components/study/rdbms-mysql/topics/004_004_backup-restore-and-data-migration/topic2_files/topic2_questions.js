// topic2_files/topic2_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 2: mysqldump In-Depth: Dumping Entire Instances, Specific Databases, and Individual Tables

const questions = [
  {
    question: "What is the critical structural difference in the generated SQL file when dumping a database using `--databases db_name` versus using `mysqldump db_name`?",
    shortAnswer: "Using `--databases db_name` includes `CREATE DATABASE IF NOT EXISTS db_name` and `USE db_name;` statements; omitting `--databases` dumps only table DDL and DML without database creation or switching commands.",
    explanation: "When you run `mysqldump ecommerce > dump.sql`, restoring requires specifying the target database (`mysql new_db < dump.sql`). When you run `mysqldump --databases ecommerce > dump.sql`, running `mysql < dump.sql` automatically creates and selects `ecommerce`.",
    hint: "--databases includes CREATE DATABASE and USE statements in the dump file.",
    level: "basic",
    codeExample: `# Without --databases (Target DB must exist during restore):
mysqldump -u root -p ecommerce > ecommerce.sql
mysql -u root -p existing_db < ecommerce.sql

# With --databases (Automatically creates & switches database):
mysqldump -u root -p --databases ecommerce > ecommerce.sql
mysql -u root -p < ecommerce.sql`
  },
  {
    question: "How do you dump all databases across an entire MySQL server instance with consistent transactional snapshotting?",
    shortAnswer: "Execute `mysqldump -u root -p --all-databases --single-transaction --quick --routines --triggers --events --source-data=2 > all_dbs.sql`.",
    explanation: "The `--all-databases` (or `-A`) flag dumps every schema, including the `mysql` user authentication tables, while `--single-transaction` guarantees a consistent InnoDB snapshot without blocking active writes.",
    hint: "Use --all-databases with --single-transaction, --quick, and routine flags.",
    level: "basic",
    codeExample: `mysqldump -u root -p --all-databases --single-transaction --quick \\
  --routines --triggers --events --source-data=2 > full_instance.sql`
  },
  {
    question: "How do you dump only specific tables (e.g. `orders`, `order_items`, `customers`) from a database using `mysqldump`?",
    shortAnswer: "Specify the table names separated by spaces after the database name: `mysqldump -u root -p --single-transaction dbname table1 table2 table3 > tables.sql`.",
    explanation: "Listing table names after the database name instructs `mysqldump` to export only those tables and ignore all other tables in that schema.",
    hint: "List table names as arguments following the database name.",
    level: "basic",
    codeExample: `mysqldump -u root -p --single-transaction \\
  kolkata_ecommerce orders order_items customers > core_orders.sql`
  },
  {
    question: "How do you exclude large temporary cache or audit tables from a `mysqldump` backup using `--ignore-table`?",
    shortAnswer: "Supply `--ignore-table=dbname.tablename` for each table to be excluded (can be specified multiple times).",
    explanation: "Both the database name and table name must be supplied (`--ignore-table=ecommerce.sessions`). This keeps backup file sizes compact by skipping volatile session or clickstream tables.",
    hint: "Use --ignore-table=database.table for each excluded table.",
    level: "intermediate",
    codeExample: `mysqldump -u root -p --single-transaction kolkata_retail \\
  --ignore-table=kolkata_retail.web_sessions \\
  --ignore-table=kolkata_retail.raw_clickstream > retail_clean.sql`
  },
  {
    question: "How do you dump only the database schema (table definitions, views, procedures) WITHOUT any data rows?",
    shortAnswer: "Use the `--no-data` (or `-d`) flag: `mysqldump -u root -p --no-data --routines --triggers dbname > schema.sql`.",
    explanation: "Dumping structure only is useful for creating staging/development environments, exporting DDL for version control (Git), or inspecting table schemas.",
    hint: "Use --no-data (or -d).",
    level: "basic",
    codeExample: `mysqldump -u root -p --no-data --routines --triggers --events \\
  kolkata_finance > finance_schema_only.sql`
  },
  {
    question: "How do you dump only the data rows (`INSERT` statements) WITHOUT `DROP TABLE` or `CREATE TABLE` DDL?",
    shortAnswer: "Use the `--no-create-info` (or `-t`) flag: `mysqldump -u root -p --no-create-info dbname > data.sql`.",
    explanation: "Data-only dumps are ideal for repopulating existing schemas or importing test datasets into pre-created staging tables.",
    hint: "Use --no-create-info (or -t).",
    level: "basic",
    codeExample: `mysqldump -u root -p --no-create-info --single-transaction \\
  kolkata_finance > finance_data_only.sql`
  },
  {
    question: "How can you dump a subset of table rows matching a specific SQL condition using the `--where` flag?",
    shortAnswer: "Pass the SQL filter predicate inside the `--where` option: `mysqldump ... --where=\"created_at >= '2026-01-01'\" dbname tablename > subset.sql`.",
    explanation: "`mysqldump` appends the `WHERE` clause to its internal `SELECT` query, extracting only matching rows. This is useful for archiving historical quarters or exporting regional data.",
    hint: "Supply a SQL condition inside --where=\"...\".",
    level: "intermediate",
    codeExample: `mysqldump -u root -p --single-transaction kolkata_retail orders \\
  --where="order_date >= '2026-01-01 00:00:00' AND city = 'Barrackpore'" > barrackpore_2026.sql`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, the nightly backup file grew from 10GB to 85GB because of a transient `cache_search_index` table. How did Mamata optimize the backup command?",
    shortAnswer: "She added `--ignore-table=barrackpore_store.cache_search_index`, reducing backup size back to 10GB and backup execution time from 20 minutes to 2 minutes.",
    explanation: "Because cache tables can be rebuilt in memory from primary product data, backing them up wastes storage, bandwidth, and restore time.",
    hint: "Excluded the transient cache table using --ignore-table.",
    level: "moderate",
    codeExample: `# Optimized Barrackpore Backup:
mysqldump -u backup_admin -p --single-transaction --quick \\
  barrackpore_store --ignore-table=barrackpore_store.cache_search_index | gzip > store.sql.gz`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata bank, the compliance team requested a DDL-only audit dump of all 45 financial databases to verify constraint definitions. How did Debangshu generate this report in 10 seconds?",
    shortAnswer: "He executed `mysqldump -u root -p --all-databases --no-data --routines --triggers > bank_all_schemas.sql`.",
    explanation: "The `--no-data` flag skipped billions of ledger transaction rows across the 45 databases, extracting pure schema DDL in seconds.",
    hint: "Combined --all-databases with --no-data to extract all schemas without table data.",
    level: "intermediate",
    codeExample: `mysqldump -u root -p --all-databases --no-data --routines --triggers --events > bank_all_schemas.sql`
  },
  {
    question: "What does the `--compact` flag do in `mysqldump`, and why should it generally be avoided in production disaster recovery backups?",
    shortAnswer: "It removes comments, transaction wrappers, environment variable configurations, and table locking statements to produce minimal output; it should be avoided because it disables critical safety settings like `FOREIGN_KEY_CHECKS=0` and character set preservation.",
    explanation: "`--compact` is designed for quick command-line debugging. In disaster recovery, omitting standard header settings like `FOREIGN_KEY_CHECKS=0` or timezone settings can cause restore imports to fail.",
    hint: "Removes comments and environment headers; risky for disaster recovery restores.",
    level: "intermediate",
    codeExample: `# Debugging use only (Not for DR):
mysqldump --compact kolkata_retail customers`
  },
  {
    question: "How does `mysqldump` handle MySQL Views during logical backup export and import?",
    shortAnswer: "It first creates temporary dummy tables with the view's column definitions to satisfy view dependencies during initial table imports, then drops the dummy tables and creates the actual views at the end of the dump.",
    explanation: "If View A depends on View B, creating View A before View B would fail. Creating temporary placeholder tables resolves circular dependencies during bulk import.",
    hint: "Creates temporary dummy tables first, then replaces them with actual views at the end.",
    level: "expert",
    codeExample: `-- Temporary dummy table created first:
-- CREATE TABLE \`v_active_orders\` (\`order_id\` int, \`total\` decimal(10,2));
-- ... followed later by:
-- DROP TABLE \`v_active_orders\`;
-- CREATE ALGORITHM=UNDEFINED VIEW \`v_active_orders\` AS SELECT ...;`
  },
  {
    question: "What is the difference between `--extended-insert=TRUE` (default) and `--extended-insert=FALSE` (or `--skip-extended-insert`) in `mysqldump`?",
    shortAnswer: "`--extended-insert=TRUE` writes multi-row `INSERT` statements with thousands of rows per statement (`INSERT INTO tbl VALUES (...), (...), (...)`); `--skip-extended-insert` writes a separate `INSERT INTO` line for each individual row.",
    explanation: "Multi-row extended inserts are over 20x faster to restore because they minimize network round-trips, transaction overhead, and SQL parsing overhead.",
    hint: "Extended inserts group thousands of rows into a single multi-row INSERT statement.",
    level: "intermediate",
    codeExample: `-- Extended Insert (Fast Restore ✅):
INSERT INTO \`orders\` VALUES (1,'Mamata',500.00),(2,'Susmita',1200.00),(3,'Debangshu',850.00);

-- Skip Extended Insert (Slow Restore, but easier line-by-line diffing):
INSERT INTO \`orders\` VALUES (1,'Mamata',500.00);
INSERT INTO \`orders\` VALUES (2,'Susmita',1200.00);`
  },
  {
    question: "What is the `net_buffer_length` and `max_allowed_packet` consideration when executing large `mysqldump` extended inserts?",
    shortAnswer: "If a single multi-row `INSERT` statement exceeds `max_allowed_packet`, the import fails with `Packet too large`. `mysqldump` groups rows up to `net_buffer_length` bytes (up to `max_allowed_packet`).",
    explanation: "Ensuring `max_allowed_packet` is sufficiently large (e.g. 64MB or 128MB) on both the dumping client and receiving server prevents packet truncation errors.",
    hint: "Ensure max_allowed_packet is configured large enough to accept multi-row INSERTs.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --net-buffer-length=32768 --max-allowed-packet=67108864 ecommerce > dump.sql`
  },
  {
    question: "How do you dump multiple specific databases without dumping the entire server instance?",
    shortAnswer: "Supply the `--databases` (or `-B`) flag followed by the list of database names: `mysqldump -u root -p --databases db1 db2 db3 > multi_db.sql`.",
    explanation: "The `--databases` option indicates that all subsequent arguments are database names rather than table names.",
    hint: "Use --databases followed by the database names.",
    level: "basic",
    codeExample: `mysqldump -u root -p --single-transaction \\
  --databases kolkata_retail kolkata_billing kolkata_auth > bengal_services.sql`
  },
  {
    question: "What is the `--add-drop-table` option in `mysqldump`, and why is it included by default?",
    shortAnswer: "It writes `DROP TABLE IF EXISTS table_name;` immediately before each `CREATE TABLE` statement, ensuring clean re-creation if tables already exist in the target database.",
    explanation: "This prevents `Table already exists` errors when restoring backups over an existing database schema.",
    hint: "Writes DROP TABLE IF EXISTS before CREATE TABLE.",
    level: "basic",
    codeExample: `-- Included in dump:
DROP TABLE IF EXISTS \`customers\`;
CREATE TABLE \`customers\` (...);`
  },
  {
    question: "How does the `--hex-blob` option prevent character corruption when dumping binary columns (such as `BLOB`, `BINARY`, `VARBINARY`, or encrypted ciphertexts)?",
    shortAnswer: "It formats binary data as hexadecimal strings (e.g. `0xFFD8FFE0...`) instead of raw binary bytes, preventing character set translation errors and terminal corruption.",
    explanation: "Raw binary data can contain null bytes or control characters that break SQL parsers when transferred across different system character sets.",
    hint: "Encodes BLOB and binary columns as hexadecimal literals.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --hex-blob kolkata_security user_keys > keys_backup.sql`
  },
  {
    question: "What is the purpose of the `--order-by-primary` flag in `mysqldump`?",
    shortAnswer: "It forces `mysqldump` to dump table rows sorted by their primary key order (`ORDER BY primary_key`).",
    explanation: "Dumping rows in primary key order allows faster sequential page allocation and reduces index fragmentation when importing back into InnoDB tables.",
    hint: "Dumps rows sorted by Primary Key for sequential InnoDB insert speed.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --order-by-primary kolkata_retail orders > orders_pk_ordered.sql`
  },
  {
    question: "Why does `mysqldump` include `/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;` conditional comments in output files?",
    shortAnswer: "To preserve and restore the exact character set and collation environment settings across different MySQL client connections while maintaining backwards compatibility with older versions.",
    explanation: "MySQL conditional comments (`/*!... */`) are executed by MySQL parsers but ignored as comments by non-MySQL tools, ensuring portability.",
    hint: "Conditional comments preserve environment settings across client versions.",
    level: "basic",
    codeExample: `-- MySQL conditional comment syntax:
/*!40101 SET NAMES utf8mb4 */;`
  },
  {
    question: "How do you stream a `mysqldump` backup directly across the network to a remote server over SSH without storing intermediate files locally?",
    shortAnswer: "Pipe `mysqldump` stdout into `ssh remote_host 'mysql target_db'` (`mysqldump ... | ssh db_backup_node 'mysql -u root remote_db'`).",
    explanation: "Direct network piping enables server-to-server migration without consuming local disk space on the source host.",
    hint: "Pipe mysqldump output directly through SSH into remote mysql client.",
    level: "expert",
    codeExample: `mysqldump --single-transaction --quick kolkata_retail | \\
  ssh user@192.168.1.50 "mysql -u root -pSecurePass kolkata_retail_replica"`
  },
  {
    question: "What is the `--set-gtid-purged` flag in `mysqldump` when working with Global Transaction Identifiers (GTIDs)?",
    shortAnswer: "It controls whether `SET @@GLOBAL.gtid_purged` is included in the dump file: `AUTO` (default), `ON` (include GTID set), `OFF` (do not include GTID set), or `COMMENTED`.",
    explanation: "When restoring a single table or database onto an active production master with existing GTID transactions, setting `--set-gtid-purged=OFF` prevents overwriting the server's global GTID executed set.",
    hint: "Prevents overwriting GTID sets when importing into an active cluster.",
    level: "expert",
    codeExample: `mysqldump --single-transaction --set-gtid-purged=OFF kolkata_retail orders > orders_gtid_off.sql`
  },
  {
    question: "How do you dump only stored routines (procedures & functions) without any tables or views?",
    shortAnswer: "Combine `--routines --no-create-info --no-data --no-set-names`: `mysqldump -u root -p --routines --no-create-info --no-data dbname > procedures.sql`.",
    explanation: "Extracts stored procedures and functions cleanly for version control tracking.",
    hint: "Combine --routines with --no-create-info and --no-data.",
    level: "intermediate",
    codeExample: `mysqldump -u root -p --routines --no-create-info --no-data kolkata_finance > routines_only.sql`
  },
  {
    question: "What does the `--dump-date` flag control in `mysqldump`?",
    shortAnswer: "It appends a `Dump completed on YYYY-MM-DD HH:MM:SS` footer timestamp comment at the end of the dump file.",
    explanation: "Enabled by default, it documents the exact completion timestamp of the backup process.",
    hint: "Adds completion timestamp comment to the end of the SQL dump file.",
    level: "basic",
    codeExample: `-- Dump completed on 2026-08-25 14:30:15`
  },
  {
    question: "How do you dump database triggers without dumping stored procedures?",
    shortAnswer: "Use `--triggers --skip-routines`: `mysqldump --triggers --skip-routines dbname > triggers.sql`.",
    explanation: "Triggers are included by default (`--triggers=TRUE`), but procedures are excluded unless `--routines` is supplied.",
    hint: "Triggers are on by default; routines require --routines.",
    level: "basic",
    codeExample: `mysqldump --triggers --skip-routines kolkata_retail > triggers_only.sql`
  },
  {
    question: "What is the difference between `--single-transaction` and `--lock-tables` in `mysqldump`?",
    shortAnswer: "`--single-transaction` creates a non-blocking InnoDB MVCC transaction snapshot; `--lock-tables` locks all tables in each schema with `READ LOCAL` locks, blocking write queries.",
    explanation: "`--lock-tables` is on by default if `--single-transaction` is not specified, causing write downtime on production tables.",
    hint: "--single-transaction is non-blocking for InnoDB; --lock-tables acquires read locks.",
    level: "basic",
    codeExample: `-- Always override default locking with --single-transaction on production InnoDB tables.`
  },
  {
    question: "How can you estimate the progress of a running `mysqldump` import on a large SQL dump file?",
    shortAnswer: "Use the `pv` (Pipe Viewer) utility: `pv large_backup.sql | mysql -u root -p ecommerce`.",
    explanation: "`pv` displays a real-time progress bar, transfer rate (MB/s), and estimated time to completion (ETA) as the SQL file is streamed into the `mysql` client.",
    hint: "Pipe the SQL dump file through the pv (Pipe Viewer) utility.",
    level: "intermediate",
    codeExample: `pv /backups/kolkata_bank_backup.sql | mysql -u root -p kolkata_bank`
  },
  {
    question: "What is the `--flush-logs` option in `mysqldump`?",
    shortAnswer: "It forces the MySQL server to close the current active binary log file and start a new binary log file before starting the dump.",
    explanation: "Flushing logs aligns the backup start point with the beginning of a fresh binary log file, simplifying subsequent Point-in-Time Recovery (PITR) log parsing.",
    hint: "Closes current binary log and starts a new one before dumping.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --flush-logs --source-data=2 ecommerce > dump.sql`
  },
  {
    question: "Why should `mysqldump` avoid backing up the `information_schema` and `performance_schema` tables?",
    shortAnswer: "Because these are in-memory virtual system views and metadata directories, not physical tables on disk, and trying to recreate them with SQL DDL fails.",
    explanation: "`mysqldump` automatically skips `information_schema` and `performance_schema` even when running with `--all-databases`.",
    hint: "They are in-memory virtual schemas that cannot be created or restored via DDL.",
    level: "basic",
    codeExample: `-- mysqldump automatically ignores virtual system schemas.`
  },
  {
    question: "How do you dump a database using `mysqldump` from a specific character set (e.g. `latin1`) and convert it to `utf8mb4` during dump?",
    shortAnswer: "Specify `--default-character-set=utf8mb4` in `mysqldump`.",
    explanation: "`mysqldump` connects to the server and converts character encodings to `utf8mb4` during extraction, outputting a clean Unicode SQL file.",
    hint: "Use --default-character-set=utf8mb4.",
    level: "intermediate",
    codeExample: `mysqldump --default-character-set=utf8mb4 --single-transaction legacy_db > utf8mb4_dump.sql`
  },
  {
    question: "What happens if a DDL statement (`ALTER TABLE` or `DROP TABLE`) is executed while `mysqldump --single-transaction` is running?",
    shortAnswer: "The dump fails with `ERROR 1412 (HY000): Table definition has changed, please retry transaction`.",
    explanation: "InnoDB MVCC guarantees row consistency, but does not prevent metadata alterations. If table structure changes mid-dump, MySQL aborts the transaction to prevent corrupt output.",
    hint: "DDL changes during dump break metadata consistency, causing Error 1412.",
    level: "expert",
    codeExample: `-- Error in mysqldump:
-- mysqldump: Error 1412: Table definition has changed, please retry transaction when dumping table \`orders\` at row: 450000`
  },
  {
    question: "What is the primary operational takeaway of Topic 2 in Module 004_004?",
    shortAnswer: "Master `mysqldump` scoping and flags: use `--all-databases` for full instances, `--databases` for multi-schema dumps with automatic `CREATE/USE` headers, specify table names for targeted backups, exclude cache tables with `--ignore-table`, use `--no-data` for DDL-only extracts, and always enforce `--single-transaction --quick --routines --triggers`.",
    explanation: "Understanding `mysqldump` scopes and tuning parameters allows database administrators to capture granular, consistent, non-blocking logical backups tailored to exact disaster recovery, schema audit, and data migration requirements.",
    hint: "Summarize scoping options (--all-databases, --databases, tables), --ignore-table, and mandatory flags.",
    level: "basic",
    codeExample: `-- Master Production mysqldump Command:
mysqldump -u root -p \\
  --databases kolkata_retail kolkata_finance \\
  --single-transaction --quick \\
  --routines --triggers --events \\
  --hex-blob --source-data=2 \\
  --ignore-table=kolkata_retail.web_sessions | zstd -T4 -3 > backup_$(date +%F).sql.zst`
  }
];

export default questions;
