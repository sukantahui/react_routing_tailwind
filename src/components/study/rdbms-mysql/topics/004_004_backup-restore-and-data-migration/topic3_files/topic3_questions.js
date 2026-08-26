// topic3_files/topic3_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 3: mysqldump Flags for Consistent Backups: --single-transaction, --quick, --routines, --triggers, --events, --master-data

const questions = [
  {
    question: "What does the `--single-transaction` flag do in `mysqldump`, and why is it essential for production backups?",
    shortAnswer: "It starts an InnoDB transaction with `START TRANSACTION WITH CONSISTENT SNAPSHOT` under `REPEATABLE READ`, creating a consistent point-in-time snapshot without blocking concurrent read/write queries.",
    explanation: "Because InnoDB uses Multi-Version Concurrency Control (MVCC), `--single-transaction` reads historical row versions from undo logs without acquiring table locks, allowing online applications to continue normal operations.",
    hint: "Creates a consistent MVCC snapshot without locking InnoDB tables.",
    level: "basic",
    codeExample: `mysqldump -u root -p --single-transaction kolkata_retail > backup.sql`
  },
  {
    question: "How does the `--quick` (`-q`) flag operate at the C API client layer, and why does it prevent Out-Of-Memory (OOM) crashes?",
    shortAnswer: "It instructs the client to use `mysql_use_result()` (retrieving rows from the server one row at a time) instead of `mysql_store_result()` (buffering the entire table in client RAM before writing to disk).",
    explanation: "Without `--quick`, dumping a 50GB table forces the client process to allocate 50GB of RAM to buffer rows, causing the operating system OOM killer to terminate the backup process. With `--quick`, client memory consumption remains under 10MB.",
    hint: "Streams rows row-by-row using mysql_use_result() instead of buffering whole tables in RAM.",
    level: "intermediate",
    codeExample: `mysqldump -u root -p --single-transaction --quick kolkata_retail > backup.sql`
  },
  {
    question: "What is the difference between `--source-data=1` and `--source-data=2` (formerly `--master-data` in MySQL 5.7)?",
    shortAnswer: "`--source-data=1` writes an active, executable `CHANGE REPLICATION SOURCE TO ...;` statement in the dump; `--source-data=2` writes the coordinate as a commented-out SQL comment (`-- CHANGE REPLICATION SOURCE TO ...;`).",
    explanation: "`--source-data=2` is standard for general disaster recovery backups because it documents the exact binary log coordinates needed for PITR without automatically altering replication topology upon import.",
    hint: "=1 is executable; =2 is commented out for reference and PITR.",
    level: "intermediate",
    codeExample: `-- Output with --source-data=2:
-- CHANGE REPLICATION SOURCE TO SOURCE_LOG_FILE='binlog.000021', SOURCE_LOG_POS=4192;`
  },
  {
    question: "Why does combining `--single-transaction` with `--source-data=2` briefly acquire a global read lock at the beginning of the dump?",
    shortAnswer: "To atomically read and synchronize the exact binary log coordinates with the start of the InnoDB MVCC transaction snapshot, releasing the lock immediately once the snapshot is established.",
    explanation: "`mysqldump` executes `FLUSH TABLES WITH READ LOCK`, records the binlog coordinates from `SHOW MASTER STATUS`, executes `START TRANSACTION WITH CONSISTENT SNAPSHOT`, and immediately runs `UNLOCK TABLES`. The global lock lasts only a few milliseconds.",
    hint: "Briefly acquires a lock to atomically pair binlog coordinates with the transaction start.",
    level: "expert",
    codeExample: `-- Under the hood execution sequence:
-- 1. FLUSH TABLES WITH READ LOCK;
-- 2. SHOW MASTER STATUS; (records binlog coordinates)
-- 3. START TRANSACTION WITH CONSISTENT SNAPSHOT;
-- 4. UNLOCK TABLES; (Lock released in ~10ms!)`
  },
  {
    question: "Why are stored procedures, functions, and scheduled events missing from default `mysqldump` backups unless explicitly requested?",
    shortAnswer: "Because `mysqldump` does NOT include `--routines` (`-R`) or `--events` (`-E`) by default; triggers are included by default (`--triggers=TRUE`), but procedures and scheduled jobs must be explicitly enabled.",
    explanation: "Failing to specify `--routines` and `--events` in backup automation scripts results in incomplete backups where business logic stored in stored procedures or scheduled jobs is permanently lost.",
    hint: "Stored procedures and scheduled events are disabled by default in mysqldump.",
    level: "basic",
    codeExample: `mysqldump --single-transaction --routines --triggers --events kolkata_finance > full_backup.sql`
  },
  {
    question: "How does the `--hex-blob` flag protect binary data columns (`BLOB`, `BINARY`, `VARBINARY`, encrypted fields) from corruption?",
    shortAnswer: "It converts raw binary bytes into hexadecimal string literals (e.g. `0xFFD8FFE0...`), preventing null bytes, control characters, or charset conversions from corrupting data during dump and restore.",
    explanation: "When raw binary data is dumped as text, non-printable characters can be mangled by character set converters. Hexadecimal literals are 100% immune to character encoding issues.",
    hint: "Encodes binary data into safe hexadecimal notation (0x...).",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --hex-blob kolkata_security user_certificates > certs.sql`
  },
  {
    question: "What is the purpose of `--set-gtid-purged=OFF` when dumping data in a GTID-enabled MySQL replication environment?",
    shortAnswer: "It prevents `mysqldump` from writing `SET @@GLOBAL.gtid_purged = ...;` statements into the dump file, preventing GTID set overwrite errors when restoring a single table or database into an existing active cluster.",
    explanation: "If you import a dump containing `SET @@GLOBAL.gtid_purged` onto an active server with existing GTID transactions, MySQL will reject the query with `ERROR 3546: @@GLOBAL.GTID_PURGED cannot be changed`.",
    hint: "Prevents GTID overwrite conflicts when importing into an active server.",
    level: "expert",
    codeExample: `mysqldump --single-transaction --set-gtid-purged=OFF kolkata_retail orders > orders_gtid_off.sql`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, why did the retail billing system freeze for 40 minutes during the nightly backup run?",
    shortAnswer: "The backup cron job omitted `--single-transaction`, causing `mysqldump` to default to `--lock-tables`, which acquired read locks on all tables and blocked all terminal write transactions.",
    explanation: "Adding `--single-transaction` switched the backup to non-blocking InnoDB MVCC snapshots, allowing cashier billing to proceed simultaneously with zero downtime.",
    hint: "Omitting --single-transaction defaults to table locking.",
    level: "moderate",
    codeExample: `# Fixed Barrackpore Backup Command:
mysqldump --single-transaction --quick --routines --triggers barrackpore_store > store.sql`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an automated backup failed with `Out of memory` error on a 300GB transaction table. How did Debangshu fix the issue?",
    shortAnswer: "He added the `--quick` (`-q`) flag to `mysqldump`, forcing the client to stream rows one-by-one from the server rather than buffering all 300GB into client RAM.",
    explanation: "Adding `--quick` kept client memory usage under 8MB throughout the entire 300GB dump.",
    hint: "Added --quick to stream rows without buffering whole tables in memory.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --quick kolkata_bank transaction_ledger > ledger.sql`
  },
  {
    question: "What happens if a DDL statement (`ALTER TABLE` or `DROP TABLE`) runs while `mysqldump --single-transaction` is actively dumping a table?",
    shortAnswer: "The dump fails with `Error 1412: Table definition has changed, please retry transaction`.",
    explanation: "InnoDB MVCC guarantees row consistency under `REPEATABLE READ`, but cannot preserve consistent metadata if DDL alters the table schema mid-dump. Scheduled schema migrations must never run during backup windows.",
    hint: "DDL modifications mid-dump break metadata consistency, causing Error 1412.",
    level: "expert",
    codeExample: `-- Error output:
-- mysqldump: Error 1412: Table definition has changed, please retry transaction when dumping table \`orders\``
  },
  {
    question: "What does the `--flush-logs` (`-F`) flag accomplish when included in a `mysqldump` command?",
    shortAnswer: "It forces the MySQL server to close the current active binary log file and open a new one before beginning the backup dump.",
    explanation: "Starting a fresh binary log file aligns the backup timestamp cleanly with the beginning of the next binary log sequence, simplifying subsequent PITR log parsing.",
    hint: "Rotates binary logs before starting the dump.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --flush-logs --source-data=2 kolkata_retail > backup.sql`
  },
  {
    question: "Why should `--default-character-set=utf8mb4` be explicitly specified in `mysqldump` scripts?",
    shortAnswer: "To ensure that all full 4-byte Unicode characters (including emojis, multilingual symbols, and Indian language scripts like Bengali/Hindi) are preserved without truncation or mojibake corruption.",
    explanation: "Defaulting to older character sets like `latin1` or `utf8mb3` can truncate 4-byte UTF-8 data.",
    hint: "Preserves full 4-byte Unicode and multilingual characters.",
    level: "basic",
    codeExample: `mysqldump --default-character-set=utf8mb4 --single-transaction kolkata_retail > utf8_dump.sql`
  },
  {
    question: "What is the role of `--max-allowed-packet` when dumping and restoring large rows with extensive JSON or BLOB data?",
    shortAnswer: "It sets the maximum packet buffer size (e.g. 128MB or 256MB) used for communication between the client and server, preventing `Packet too large` errors when dumping or importing multi-megabyte rows.",
    explanation: "If a single row or multi-row `INSERT` statement exceeds `max_allowed_packet`, the connection is aborted with an error.",
    hint: "Controls maximum network packet size to accommodate large rows and BLOBs.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --max-allowed-packet=128M kolkata_retail > dump.sql`
  },
  {
    question: "What is the difference between `--triggers` (enabled by default) and `--skip-triggers` in `mysqldump`?",
    shortAnswer: "`--triggers` includes `CREATE TRIGGER` statements in the dump; `--skip-triggers` excludes all trigger definitions from the output SQL file.",
    explanation: "Skipping triggers is useful when migrating raw data to an analytics warehouse where transactional triggers should not fire during bulk data import.",
    hint: "--skip-triggers omits trigger definitions from the backup.",
    level: "basic",
    codeExample: `mysqldump --single-transaction --skip-triggers kolkata_retail > no_triggers.sql`
  },
  {
    question: "What does the `--opt` flag in `mysqldump` do, and why is it enabled by default?",
    shortAnswer: "It is a shorthand combination of optimal default flags: `--add-drop-table`, `--add-locks`, `--create-options`, `--quick`, `--extended-insert`, `--lock-tables`, `--set-charset`, and `--disable-keys`.",
    explanation: "`--opt` is enabled by default. However, on InnoDB systems, you should explicitly supply `--single-transaction` to override the `--lock-tables` portion of `--opt`.",
    hint: "Combines fast default options including --quick and --extended-insert.",
    level: "intermediate",
    codeExample: `-- --opt is on by default; always add --single-transaction for InnoDB.`
  },
  {
    question: "What is the effect of `--disable-keys` (included in `--opt`) during logical dump restoration?",
    shortAnswer: "It outputs `/*!40000 ALTER TABLE tbl DISABLE KEYS */;` and `ENABLE KEYS` around `INSERT` statements, deferring non-unique index updates until all rows are inserted for MyISAM tables.",
    explanation: "While primarily effective for MyISAM, in InnoDB bulk insert optimization is handled via primary key ordering and disabling foreign key checks.",
    hint: "Defers secondary index creation until all rows are inserted.",
    level: "intermediate",
    codeExample: `/*!40000 ALTER TABLE \`orders\` DISABLE KEYS */;
-- INSERT INTO orders VALUES ...
/*!40000 ALTER TABLE \`orders\` ENABLE KEYS */;`
  },
  {
    question: "How does the `--single-transaction` flag handle temporary tables?",
    shortAnswer: "`mysqldump` automatically ignores temporary tables (created via `CREATE TEMPORARY TABLE`) because temporary tables exist only within their creating session and cannot be locked or snapshotted across client connections.",
    explanation: "Temporary session tables are discarded automatically upon connection termination and are excluded from backups.",
    hint: "Temporary session tables are excluded from dumps.",
    level: "basic",
    codeExample: `-- Temporary tables are session-bound and skipped by mysqldump.`
  },
  {
    question: "What does the `--complete-insert` (`-c`) flag do in `mysqldump`, and what is its operational trade-off?",
    shortAnswer: "It includes explicit column names in every `INSERT` statement (`INSERT INTO tbl (col1, col2) VALUES (...)`); it makes dump files ~20-30% larger, but allows restoring data into tables whose column order has changed.",
    explanation: "Complete inserts provide maximum schema tolerance at the expense of slightly larger dump file sizes.",
    hint: "Includes column names in INSERT statements for column-order tolerance.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --complete-insert kolkata_retail customers > complete_insert.sql`
  },
  {
    question: "Why should `mysqldump` avoid using the `--skip-add-drop-table` option in automated disaster recovery scripts?",
    shortAnswer: "Because omitting `DROP TABLE IF EXISTS` causes restoration to fail with `Table already exists` errors if restoring over an existing or partially corrupted database.",
    explanation: "Having `DROP TABLE IF EXISTS` ensures clean re-creation during disaster recovery without requiring manual table dropping.",
    hint: "DROP TABLE IF EXISTS ensures clean replacement of existing tables.",
    level: "basic",
    codeExample: `-- Best practice: Keep default DROP TABLE IF EXISTS in DR dumps.`
  },
  {
    question: "What is the `--apply-slave-statements` (or `--apply-replica-statements` in MySQL 8.0+) flag used for in `mysqldump`?",
    shortAnswer: "When dumping from a replica server with `--source-data`, it appends `STOP REPLICA;` before and `START REPLICA;` after the coordinate statements to pause replication during backup capture.",
    explanation: "Helps ensure replication coordinates on a read replica remain locked and consistent during coordinate recording.",
    hint: "Controls STOP/START REPLICA commands around coordinate dumps.",
    level: "expert",
    codeExample: `mysqldump --single-transaction --source-data=2 --apply-replica-statements ecommerce > replica_dump.sql`
  },
  {
    question: "How can you parallelize the compression of `mysqldump` across all available CPU cores?",
    shortAnswer: "Pipe `mysqldump` stdout into multi-threaded compression utilities like `zstd -T0` (uses all cores) or `pigz -p N`.",
    explanation: "Standard single-threaded `gzip` becomes a CPU bottleneck when compressing gigabytes of SQL text. `zstd` and `pigz` utilize multi-core parallelism to match disk write speeds.",
    hint: "Use multi-threaded compressors like zstd or pigz.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --quick kolkata_retail | zstd -T0 -3 > backup.sql.zst`
  },
  {
    question: "What is the purpose of the `--column-statistics=0` flag when using MySQL 8.0 `mysqldump` against older MySQL 5.7 servers?",
    shortAnswer: "It disables querying the `information_schema.COLUMN_STATISTICS` histogram table, preventing `Unknown table 'COLUMN_STATISTICS'` errors when dumping older MySQL 5.7 servers.",
    explanation: "MySQL 8.0 client utilities enable histogram column statistics by default. Older 5.7 servers lack this table, requiring `--column-statistics=0` for backwards compatibility.",
    hint: "Disables histogram statistics queries when connecting to MySQL 5.7 servers.",
    level: "intermediate",
    codeExample: `mysqldump --column-statistics=0 -h legacy-mysql-57 -u root -p ecommerce > dump_57.sql`
  },
  {
    question: "What does the `--no-autocommit` flag do in `mysqldump`?",
    shortAnswer: "It encloses `INSERT` statements in `SET autocommit=0;` and explicit `COMMIT;` blocks around each table.",
    explanation: "This significantly speeds up restoration by committing rows in large batches rather than committing after each individual `INSERT` statement.",
    hint: "Wraps inserts in explicit COMMIT blocks for faster bulk restore.",
    level: "intermediate",
    codeExample: `SET autocommit=0;
INSERT INTO \`orders\` VALUES (...);
COMMIT;`
  },
  {
    question: "What is the `--tz-utc` flag in `mysqldump`, and why is it enabled by default?",
    shortAnswer: "It sets `TIME_ZONE='+00:00'` at the top of the dump file, ensuring that `TIMESTAMP` columns are dumped and restored in UTC regardless of the server's local timezone.",
    explanation: "Preserving timestamps in UTC prevents timezone offset shifts when moving data between servers configured in different regional timezones.",
    hint: "Standardizes TIMESTAMP values in UTC (+00:00) for cross-server consistency.",
    level: "basic",
    codeExample: `/*!40103 SET TIME_ZONE='+00:00' */;`
  },
  {
    question: "How do you dump only the table definition (DDL) of stored routines without dumping tables?",
    shortAnswer: "Combine `--routines --no-create-info --no-data --skip-triggers`: `mysqldump -u root -p --routines --no-create-info --no-data --skip-triggers dbname > procs.sql`.",
    explanation: "Extracts stored procedures and functions cleanly for code review and version control.",
    hint: "Combine --routines with --no-create-info and --no-data.",
    level: "intermediate",
    codeExample: `mysqldump -u root -p --routines --no-create-info --no-data --skip-triggers kolkata_finance > procs.sql`
  },
  {
    question: "What does `--lock-for-backup` (or Lock Instance for Backup) do in MySQL 8.0 enterprise backups?",
    shortAnswer: "It acquires a lightweight metadata lock that prevents DDL alterations (`ALTER TABLE`, `DROP TABLE`) while permitting concurrent DML write transactions (`INSERT`, `UPDATE`, `DELETE`) to proceed uninterrupted.",
    explanation: "Introduced in MySQL 8.0, `LOCK INSTANCE FOR BACKUP` eliminates the risk of Error 1412 (metadata changes during backup) without blocking application user transactions.",
    hint: "Blocks DDL schema alterations while allowing continuous DML writes.",
    level: "expert",
    codeExample: `LOCK INSTANCE FOR BACKUP;
-- Perform physical or logical backup safely...
UNLOCK INSTANCE;`
  },
  {
    question: "How can you verify that a generated `mysqldump` archive is not truncated or corrupted?",
    shortAnswer: "Inspect the final lines of the SQL file for the comment `-- Dump completed on YYYY-MM-DD HH:MM:SS` and verify the shell exit code (`$? == 0`).",
    explanation: "If `mysqldump` crashes midway due to network or disk errors, the footer comment will be missing. Checking both `$?` and the footer ensures complete archives.",
    hint: "Verify exit code $? and check for the '-- Dump completed on' footer comment.",
    level: "basic",
    codeExample: `tail -n 5 /backups/ecommerce.sql | grep "Dump completed on"`
  },
  {
    question: "What is the recommended set of flags for backing up a production MySQL 8.0 InnoDB database for disaster recovery?",
    shortAnswer: "`--single-transaction --quick --routines --triggers --events --source-data=2 --hex-blob --default-character-set=utf8mb4 --max-allowed-packet=128M`.",
    explanation: "This combination guarantees consistent non-blocking MVCC snapshots, low memory usage, complete business logic inclusion, hexadecimal binary safety, and precise PITR coordinates.",
    hint: "Recall the 8 core flags: single-transaction, quick, routines, triggers, events, source-data, hex-blob, utf8mb4.",
    level: "basic",
    codeExample: `mysqldump -u root -p \\
  --single-transaction --quick \\
  --routines --triggers --events \\
  --source-data=2 --hex-blob \\
  --default-character-set=utf8mb4 \\
  --databases kolkata_retail > gold_backup.sql`
  },
  {
    question: "What is the primary operational takeaway of Topic 3 in Module 004_004?",
    shortAnswer: "Enforcing the gold-standard combination of `mysqldump` flags guarantees 100% consistent, non-blocking, and complete logical backups: `--single-transaction` for MVCC consistency, `--quick` for OOM prevention, `--routines/--triggers/--events` for full business logic retention, and `--source-data=2` for Point-in-Time Recovery.",
    explanation: "Mastering these flags transforms `mysqldump` from a risky, locking command into a safe, production-grade disaster recovery asset capable of backing up mission-critical transactional systems without downtime.",
    hint: "Summarize the essential flag combinations for production-grade non-blocking backups.",
    level: "basic",
    codeExample: `-- Master Production Backup Script:
mysqldump -u backup_admin -p \\
  --single-transaction --quick \\
  --routines --triggers --events \\
  --source-data=2 --hex-blob \\
  --default-character-set=utf8mb4 \\
  --databases kolkata_ecommerce kolkata_finance | \\
  zstd -T4 -3 > /backups/prod_backup_$(date +%F).sql.zst`
  }
];

export default questions;
