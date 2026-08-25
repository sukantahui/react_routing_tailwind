// topic3_files/topic3_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 3: The Binary Log (binlog): Formats (STATEMENT, ROW, MIXED), Purpose for Replication & Recovery, Purging Expired Binlogs

const questions = [
  {
    question: "What are the two core architectural purposes of the MySQL Binary Log (`log_bin`)?",
    shortAnswer: "1. Primary Replication Engine (streaming real-time data mutations from source master to replicas); 2. Point-in-Time Recovery (replaying transactional changes post-base-backup to recover to an exact microsecond).",
    explanation: "Without the binary log, read replicas cannot synchronize data, and database recovery is limited to the timestamp of the last full backup snapshot.",
    hint: "Replication streaming and Point-in-Time Recovery (PITR).",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'log_bin';`
  },
  {
    question: "What are the 3 formats supported by the MySQL Binary Log, and which is the default in MySQL 8.0?",
    shortAnswer: "1. `STATEMENT` (logs raw SQL text), 2. `ROW` (logs before-and-after row image deltas - Default & Mandated Standard), and 3. `MIXED` (switches between statement and row based on query determinism).",
    explanation: "MySQL 8.0 mandates `ROW` format because it is 100% deterministic and eliminates data drift between replication primary and replicas.",
    hint: "STATEMENT, ROW (default and mandated standard), and MIXED.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'binlog_format';
-- Value: ROW`
  },
  {
    question: "Why does `binlog_format = STATEMENT` cause dangerous data divergence (replica drift) on read replicas?",
    shortAnswer: "Because non-deterministic functions (e.g. `NOW()`, `UUID()`, `RAND()`, `CURRENT_TIMESTAMP`) or queries with `LIMIT` without `ORDER BY` evaluate differently on the replica compared to the master.",
    explanation: "Executing `UPDATE orders SET coupon = UUID() LIMIT 10` on the master modifies 10 random rows with random UUIDs; re-executing that raw SQL text on the replica updates 10 completely different rows with different UUIDs, causing silent data corruption.",
    hint: "Non-deterministic functions and unordered LIMITs produce different results on replicas.",
    level: "intermediate",
    codeExample: `-- Under STATEMENT format, this causes instant replica drift:
UPDATE kolkata_retail.discounts SET promo_code = UUID() LIMIT 5;`
  },
  {
    question: "How does `binlog_format = ROW` guarantee 100% data consistency across replicas?",
    shortAnswer: "It records the exact binary bytes of each modified row before and after the change (`Write_rows`, `Update_rows`, `Delete_rows`), ensuring that replicas apply the exact same row modifications regardless of local system time, functions, or execution order.",
    explanation: "Row-based replication copies actual data mutations rather than re-evaluating SQL expressions.",
    hint: "Copies physical row delta images directly rather than re-executing queries.",
    level: "basic",
    codeExample: `-- ROW format outputs Write_rows, Update_rows, Delete_rows events.`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a cashier ran `UPDATE products SET discount = RAND() WHERE category = 'Apparel' LIMIT 20;`. Why did `binlog_format = ROW` prevent data corruption on their standby store replica?",
    shortAnswer: "Because `ROW` logging captured the exact calculated discount values and specific product IDs modified on the master, updating the exact same 20 rows with identical discount values on the replica.",
    explanation: "Under legacy `STATEMENT` logging, the replica would have updated a different set of 20 products with different random numbers.",
    hint: "ROW format transmitted the exact calculated row values instead of re-evaluating RAND().",
    level: "moderate",
    codeExample: `# Barrackpore ROW Event Trace:
# Update_rows: table_id=105 (id=12: discount=0.15, id=45: discount=0.22, ...)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, high transaction volume was generating 500GB of binary logs daily. How did Debangshu reduce binary log disk size by 55% without sacrificing data consistency?",
    shortAnswer: "He configured `binlog_row_image = 'MINIMAL'`.",
    explanation: "Under `MINIMAL` row imaging, the before-image contains only the primary key, and the after-image contains only the modified columns (rather than all 80 table columns), cutting log size by over 50%.",
    hint: "Configured binlog_row_image = 'MINIMAL' to log only changed columns.",
    level: "expert",
    codeExample: `SET PERSIST binlog_row_image = 'MINIMAL';`
  },
  {
    question: "What are the 3 options for `binlog_row_image` in MySQL 8.0?",
    shortAnswer: "1. `FULL` (Default: logs all columns in before and after images); 2. `MINIMAL` (logs only primary keys in before-image and only changed columns in after-image); 3. `NOBLOB` (logs all columns except unchanged `BLOB` and `TEXT` fields).",
    explanation: "`MINIMAL` and `NOBLOB` optimize network replication bandwidth and disk consumption in high-volume environments.",
    hint: "FULL, MINIMAL, and NOBLOB.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'binlog_row_image';`
  },
  {
    question: "What does `sync_binlog = 1` do, and why is it mandatory for ACID transaction compliance?",
    shortAnswer: "It forces the operating system to flush every binary log write to physical disk before returning success on a transaction commit, ensuring that every committed transaction is durably recorded and recoverable post-crash.",
    explanation: "If `sync_binlog = 0`, committed transactions buffered in OS memory can be lost during an unexpected host power failure, creating a gap for Point-in-Time Recovery.",
    hint: "Flushes binary log to disk on every transaction commit for zero data loss.",
    level: "intermediate",
    codeExample: `SET PERSIST sync_binlog = 1;`
  },
  {
    question: "What system variable configures automated binary log expiration and cleanup in MySQL 8.0?",
    shortAnswer: "`binlog_expire_logs_seconds` (replaces deprecated `expire_logs_days`).",
    explanation: "Defines the retention window in seconds (e.g. `604800` for 7 days, `1209600` for 14 days). MySQL automatically purges logs older than this threshold on rotation and startup.",
    hint: "Use binlog_expire_logs_seconds.",
    level: "basic",
    codeExample: `SET PERSIST binlog_expire_logs_seconds = 604800; -- 7 Days`
  },
  {
    question: "Why should database administrators NEVER delete old binary log files manually with the operating system `rm` command?",
    shortAnswer: "Because manual deletion does not update MySQL's internal binary log index file (`binlog.index`), leading to internal file lookup errors, broken replication streams, and backup tool failures.",
    explanation: "Always use MySQL's `PURGE BINARY LOGS` SQL command to ensure files and the index file are updated atomically.",
    hint: "Manual rm desynchronizes binlog.index, breaking replication and backups.",
    level: "basic",
    codeExample: `-- DANGEROUS: rm /var/log/mysql/binlog.000045 ❌
-- SAFE: PURGE BINARY LOGS TO 'binlog.000046'; ✅`
  },
  {
    question: "How do you safely purge binary logs older than 7 days via SQL?",
    shortAnswer: "Execute `PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);`.",
    explanation: "Safely removes expired binary log files and updates `binlog.index` automatically.",
    hint: "Run PURGE BINARY LOGS BEFORE with DATE_SUB.",
    level: "basic",
    codeExample: `PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);`
  },
  {
    question: "How do you safely purge all binary log files up to a specific log file name?",
    shortAnswer: "Execute `PURGE BINARY LOGS TO 'binlog.000085';`.",
    explanation: "Deletes all binary log files in the sequence prior to `binlog.000085`, keeping `binlog.000085` and subsequent files.",
    hint: "Use PURGE BINARY LOGS TO 'filename'.",
    level: "basic",
    codeExample: `PURGE BINARY LOGS TO 'binlog.000085';`
  },
  {
    question: "What parameter controls the maximum file size of individual binary log files before automatic rotation occurs?",
    shortAnswer: "`max_binlog_size` (default: 1GB / `1073741824` bytes).",
    explanation: "When the active binary log reaches this size, MySQL closes it, increments the sequence counter (e.g. `binlog.000045` -> `binlog.000046`), and opens a new file.",
    hint: "Use max_binlog_size (default 1GB).",
    level: "intermediate",
    codeExample: `SET PERSIST max_binlog_size = 1073741824; -- 1GB`
  },
  {
    question: "What happens if a single massive transaction exceeds `max_binlog_size` during execution?",
    shortAnswer: "MySQL will write the entire transaction into the current binary log file without splitting it, causing that specific log file to exceed `max_binlog_size` before rotating upon transaction commit.",
    explanation: "MySQL guarantees that transactions are never split across binary log file boundaries.",
    hint: "Transactions are never split; the log file grows larger than max_binlog_size to complete the commit.",
    level: "expert",
    codeExample: `-- A 3GB transaction will produce a 3GB binary log file before rotating.`
  },
  {
    question: "What command forces MySQL to immediately close the current binary log and start a new one?",
    shortAnswer: "Execute `FLUSH BINARY LOGS;` (or `FLUSH LOGS;`).",
    explanation: "Useful before initiating full backups or during emergency disaster incident triage.",
    hint: "Run FLUSH BINARY LOGS.",
    level: "basic",
    codeExample: `FLUSH BINARY LOGS;`
  },
  {
    question: "What is `binlog_cache_size` and when should it be increased on high-throughput OLTP servers?",
    shortAnswer: "It allocates a per-connection memory buffer to hold uncommitted transactional binary log events; it should be increased when `Binlog_cache_disk_use` status counter is high, indicating large transactions are spilling to temporary disk files.",
    explanation: "Increasing `binlog_cache_size` prevents expensive temporary disk I/O during multi-row bulk updates.",
    hint: "Buffers uncommitted transactions in RAM; tune when Binlog_cache_disk_use is high.",
    level: "expert",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Binlog_cache%';
SET PERSIST binlog_cache_size = 2097152; -- 2MB per connection`
  },
  {
    question: "How do you view the list of all binary log files currently residing on the server along with their byte sizes?",
    shortAnswer: "Execute `SHOW BINARY LOGS;` (or `SHOW MASTER LOGS;`).",
    explanation: "Returns the complete active file inventory and individual file sizes.",
    hint: "Run SHOW BINARY LOGS.",
    level: "basic",
    codeExample: `SHOW BINARY LOGS;`
  },
  {
    question: "What is `binlog_checksum = CRC32` in MySQL 8.0?",
    shortAnswer: "An algorithmic integrity check that appends a 32-bit CRC checksum to every binary log event on disk, allowing MySQL replicas and `mysqlbinlog` to detect disk block corruption before processing events.",
    explanation: "Guarantees cryptographic verification of binary log records.",
    hint: "Appends CRC32 checksum to every event to validate data integrity.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'binlog_checksum';
-- Value: CRC32`
  },
  {
    question: "What is the purpose of the `sql_log_bin` session variable?",
    shortAnswer: "It allows administrative sessions to temporarily disable binary logging for their current connection (`SET sql_log_bin = 0;`), preventing specific maintenance commands or bulk loads from being written to the binary log.",
    explanation: "Used during disaster recovery replays or local schema seeding to avoid duplicate log generation and replication loops.",
    hint: "Disables binary logging for the current connection session.",
    level: "intermediate",
    codeExample: `SET sql_log_bin = 0;
-- Perform local maintenance queries without logging to binlog
SET sql_log_bin = 1;`
  },
  {
    question: "How does `binlog_encryption = ON` protect data in MySQL 8.0?",
    shortAnswer: "It encrypts all binary log files and relay log files at rest using AES-256 encryption via the MySQL Keyring, ensuring sensitive customer data cannot be read directly from raw log files on disk.",
    explanation: "Mandatory for enterprise financial and healthcare compliance (PCI-DSS / HIPAA).",
    hint: "Encrypts binary and relay logs at rest using AES-256 Keyring encryption.",
    level: "expert",
    codeExample: `SET PERSIST binlog_encryption = ON;`
  },
  {
    question: "What is the `binlog_do_db` and `binlog_ignore_db` configuration, and why are they considered dangerous in production?",
    shortAnswer: "They filter which databases are written to the binary log; they are dangerous under `STATEMENT` format because cross-database updates or default schema mismatches can lead to unintended omissions and broken replication.",
    explanation: "Best practice is to log all databases to the binary log and apply filtering on replicas using `replicate_do_db` instead.",
    hint: "Filters databases at the master layer; dangerous because schema context errors can omit valid updates.",
    level: "expert",
    codeExample: `-- Recommended: Leave binlog_do_db empty and log all schemas.`
  },
  {
    question: "How do you inspect the latest binary log position and active file name on a primary server in MySQL 8.0?",
    shortAnswer: "Execute `SHOW MASTER STATUS;` (or `SHOW BINARY LOG STATUS;` in MySQL 8.2+).",
    explanation: "Returns the active binary log file name, current byte offset position, and executed GTID set.",
    hint: "Run SHOW MASTER STATUS or SHOW BINARY LOG STATUS.",
    level: "basic",
    codeExample: `SHOW MASTER STATUS;
-- File: binlog.000045, Position: 928410`
  },
  {
    question: "What is the performance overhead of running the Binary Log with `sync_binlog = 1` on modern NVMe SSD storage?",
    shortAnswer: "Typically 2% to 4% CPU and I/O overhead.",
    explanation: "Because modern NVMe drives handle tens of thousands of write IOPS with sub-millisecond flush latencies, binary logging has minimal impact on OLTP throughput.",
    hint: "Typically 2% to 4% overhead on modern NVMe SSDs.",
    level: "basic",
    codeExample: `-- Binary log overhead is minimal on modern enterprise hardware.`
  },
  {
    question: "What happens if the disk partition containing binary logs runs out of free space?",
    shortAnswer: "MySQL immediately pauses all transaction commits and write queries (hanging user connections) until disk space is freed or logs are purged, preventing database corruption.",
    explanation: "Monitoring binary log disk partition utilization with alerts at 80% is critical.",
    hint: "Write transactions pause/hang until disk space is freed.",
    level: "basic",
    codeExample: `# Check log partition free space:
df -h /var/log/mysql/`
  },
  {
    question: "How does `mysqlbinlog` decode ROW-based binary log events into human-readable SQL format?",
    shortAnswer: "By running `mysqlbinlog --base64-output=DECODE-ROWS -v /path/to/binlog.000045`.",
    explanation: "The `-v` (or `-vv` for column data types) flag translates binary row images into pseudo-SQL comments for forensic analysis.",
    hint: "Use --base64-output=DECODE-ROWS -v with mysqlbinlog.",
    level: "basic",
    codeExample: `mysqlbinlog --base64-output=DECODE-ROWS -v /var/log/mysql/binlog.000045 | head -n 30`
  },
  {
    question: "What is the role of `binlog_transaction_dependency_tracking` in MySQL 8.0?",
    shortAnswer: "It determines how MySQL calculates transaction dependencies (`COMMIT_ORDER`, `WRITESET`, `WRITESET_SESSION`) to allow replicas to apply independent transactions in parallel across multiple worker threads.",
    explanation: "`WRITESET` tracking enables high-speed multi-threaded replication (MTS), drastically reducing replica lag.",
    hint: "Controls transaction dependency tracking for parallel multi-threaded replica execution.",
    level: "expert",
    codeExample: `SET PERSIST binlog_transaction_dependency_tracking = 'WRITESET';`
  },
  {
    question: "How do you verify if binary log events are being signed by GTID coordinates in MySQL 8.0?",
    shortAnswer: "Check `SHOW VARIABLES LIKE 'gtid_mode';` (should be `ON`) and inspect `SHOW MASTER STATUS;` for `Executed_Gtid_Set`.",
    explanation: "GTIDs uniquely identify every transaction across the cluster, replacing reliance on file and byte coordinates.",
    hint: "Check gtid_mode = ON and Executed_Gtid_Set in SHOW MASTER STATUS.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'gtid_mode';`
  },
  {
    question: "What is a `Format_description` event in a MySQL Binary Log file?",
    shortAnswer: "The very first event written at byte offset 4 of every binary log file, documenting the MySQL server version, binary log format version, timestamp, and checksum algorithm.",
    explanation: "Ensures that replication replicas and `mysqlbinlog` parse subsequent event structures correctly.",
    hint: "The initial event at offset 4 defining file format and server version.",
    level: "intermediate",
    codeExample: `# at 4
#260825 15:00:00 server id 1  end_log_pos 125 CRC32 0x4a9b1c20 Format_desc`
  },
  {
    question: "How do you archive binary logs to remote cloud storage (AWS S3) before purging them from local disk?",
    shortAnswer: "Schedule an automated script that syncs rotated logs to S3 (`aws s3 sync /var/log/mysql/ s3://bank-binlog-archive/ --exclude '*' --include 'binlog.*'`) before executing `PURGE BINARY LOGS`.",
    explanation: "Ensures offsite Point-in-Time Recovery durability while freeing local NVMe storage.",
    hint: "Sync rotated logs to S3 before executing PURGE BINARY LOGS.",
    level: "basic",
    codeExample: `# S3 Archive Script:
aws s3 cp /var/log/mysql/binlog.000045 s3://bank-binlog-archive/ && \\
  mysql -u root -p -e "PURGE BINARY LOGS TO 'binlog.000046';" `
  },
  {
    question: "What is the primary operational takeaway of Topic 3 in Module 004_005?",
    shortAnswer: "The Binary Log is the heartbeat of MySQL replication and Point-in-Time Recovery: mandate `binlog_format = ROW` to eliminate replica drift from non-deterministic queries, enforce `sync_binlog = 1` for 100% ACID durability, optimize high-volume storage with `binlog_row_image = 'MINIMAL'`, automate retention with `binlog_expire_logs_seconds`, and NEVER manually delete binary log files with OS `rm`.",
    explanation: "Mastering binary log formatting, durability tuning, and safe purging policies ensures zero data loss, rock-solid replication consistency, and fast disaster recovery.",
    hint: "Summarize ROW format mandate, sync_binlog=1, MINIMAL row images, and safe purging with binlog_expire_logs_seconds.",
    level: "basic",
    codeExample: `-- Master Production Binary Log Blueprint:
SET PERSIST binlog_format = 'ROW';
SET PERSIST binlog_row_image = 'FULL';
SET PERSIST sync_binlog = 1;
SET PERSIST binlog_expire_logs_seconds = 604800;
SET PERSIST binlog_checksum = 'CRC32';`
  }
];

export default questions;
