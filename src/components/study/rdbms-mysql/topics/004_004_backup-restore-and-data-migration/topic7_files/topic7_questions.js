// topic7_files/topic7_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 7: Point-in-Time Recovery (PITR): Restoring Full Backup + Replaying Binary Logs with mysqlbinlog

const questions = [
  {
    question: "What is Point-in-Time Recovery (PITR) in MySQL, and what problem does it solve?",
    shortAnswer: "The process of restoring a database to its exact state at a specific microsecond or transaction position just prior to an accidental disaster (such as a `DROP TABLE` or corrupted `UPDATE`).",
    explanation: "Standard daily backups restore data to the previous midnight, losing hours of subsequent transactions. PITR recovers all intervening transactions by replaying binary logs from the backup checkpoint up to the target timestamp.",
    hint: "Restores the database to a specific microsecond before failure by replaying binary logs.",
    level: "basic",
    codeExample: `# Point-in-Time Recovery Pipeline:
mysql < base_midnight_backup.sql
mysqlbinlog --stop-datetime="2026-08-25 14:14:59" binlog.000045 | mysql`
  },
  {
    question: "What are the two mandatory steps required to execute Point-in-Time Recovery?",
    shortAnswer: "Step 1: Restore the latest Full Base Backup taken prior to the incident. Step 2: Extract, filter, and replay subsequent transactions from the Binary Logs up to the recovery point using `mysqlbinlog`.",
    explanation: "The base backup restores table schemas and initial row state; replaying binary logs rolls forward all transactions committed between the backup time and the failure time.",
    hint: "1. Restore Base Backup -> 2. Replay Binary Logs with mysqlbinlog.",
    level: "basic",
    codeExample: `# Step 1: Base restore
mysql -u root -p < base_backup.sql
# Step 2: Binlog replay
mysqlbinlog --start-position=1582 --stop-position=928410 binlog.000012 | mysql -u root -p`
  },
  {
    question: "Why is Position-Based Recovery (`--start-position` / `--stop-position`) preferred over Timestamp-Based Recovery (`--start-datetime` / `--stop-datetime`) for critical enterprise systems?",
    shortAnswer: "Because multiple transactions can commit within the exact same second, creating timestamp ambiguity, whereas binary log positions (byte offsets) are strictly unique, sequential, and microsecond-precise.",
    explanation: "If an accidental `DROP TABLE` and 50 valid payments commit in the same second (`14:30:15`), timestamp filtering might either include the DROP or exclude the 50 valid payments. Position coordinates pinpoint the exact byte offset.",
    hint: "Byte positions are strictly unique and unambiguous, unlike timestamps.",
    level: "intermediate",
    codeExample: `mysqlbinlog --start-position=410291 --stop-position=892100 binlog.000045 | mysql -u root -p`
  },
  {
    question: "How do you locate the exact binary log file name and starting position from a `mysqldump` backup created with `--source-data=2`?",
    shortAnswer: "Inspect the top 30 lines of the `.sql` dump file for the commented line: `-- CHANGE REPLICATION SOURCE TO SOURCE_LOG_FILE='...', SOURCE_LOG_POS=...;`.",
    explanation: "This header documents the exact binary log coordinate at the moment the InnoDB MVCC consistent snapshot was established.",
    hint: "Search for CHANGE REPLICATION SOURCE in the header of the dump file.",
    level: "basic",
    codeExample: `head -n 30 /backups/kolkata_retail.sql | grep "CHANGE REPLICATION SOURCE"`
  },
  {
    question: "How do you locate the exact starting binary log coordinates from a Percona XtraBackup physical backup?",
    shortAnswer: "Read the `xtrabackup_binlog_info` text file inside the prepared backup directory.",
    explanation: "This file contains the binary log file name, byte position, and GTID coordinates corresponding to the prepared physical checkpoint.",
    hint: "Read the xtrabackup_binlog_info file inside the backup directory.",
    level: "basic",
    codeExample: `cat /backups/prepared_base/xtrabackup_binlog_info
# Output: binlog.000045   1582910   3e11fa47-71ca-11eb-9876-0242ac120002:1-49201`
  },
  {
    question: "Why is the `--disable-log-bin` (`-D`) flag critical when using `mysqlbinlog` to replay transactions into a MySQL recovery server?",
    shortAnswer: "It writes `SET @@session.sql_log_bin=0;` into the SQL stream, disabling binary logging for the restore session to prevent generating duplicate binary logs and avoiding replication loops.",
    explanation: "Without `-D`, replaying 50GB of historical transactions generates 50GB of new binary logs on the recovery server, wasting disk space and potentially triggering replication storms.",
    hint: "Disables binary log generation during replay to prevent disk bloat and replication loops.",
    level: "intermediate",
    codeExample: `mysqlbinlog --disable-log-bin --start-position=1582 binlog.000045 | mysql -u root -p`
  },
  {
    question: "How do you decode ROW-based binary log events into human-readable pseudo-SQL to inspect transactions before replaying?",
    shortAnswer: "Use `mysqlbinlog --base64-output=DECODE-ROWS -v` (or `-vv` for data types) on the binary log file.",
    explanation: "Row-based replication stores table mutations as binary delta streams. The `-v` flag decodes these into readable `### INSERT INTO`, `### UPDATE`, and `### DELETE` comments.",
    hint: "Use --base64-output=DECODE-ROWS -v to decode binary row events.",
    level: "intermediate",
    codeExample: `mysqlbinlog --base64-output=DECODE-ROWS -v /var/log/mysql/binlog.000045 | grep -A 10 -B 2 "DROP TABLE"`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a junior developer executed `UPDATE products SET price = 0;` at 11:42:15 AM without a WHERE clause. How did Mamata restore correct prices without losing afternoon sales?",
    shortAnswer: "She restored the midnight full backup on a temporary test instance, replayed binary logs up to position 419200 (1 millisecond before the bad UPDATE), and exported the clean `products` table back to production.",
    explanation: "Performing PITR on a sandbox instance allowed extracting only the affected table, restoring accurate product prices in 4 minutes with zero disruption to active customer billing.",
    hint: "Extracted the pre-corruption table state from a sandbox PITR instance.",
    level: "moderate",
    codeExample: `# Barrackpore Price Recovery:
mysqlbinlog --stop-datetime="2026-08-25 11:42:14" binlog.000022 | mysql -u root -p sandbox_db`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an unauthorized `DROP TABLE account_balances;` occurred at position 842100 in `binlog.000078`. How did Debangshu recover all transactions before AND after the DROP while skipping the DROP itself?",
    shortAnswer: "He replayed Segment 1 from base coordinate to position 842100, skipped the DROP event ending at 842350, and replayed Segment 2 from position 842350 to the end of the log.",
    explanation: "This surgical two-segment replay recovered 100% of valid transactions before and after the incident while completely omitting the destructive DROP statement.",
    hint: "Replayed Segment 1 (pre-drop) + skipped DROP + replayed Segment 2 (post-drop).",
    level: "expert",
    codeExample: `# Segment 1 (Pre-DROP):
mysqlbinlog --start-position=1582 --stop-position=842100 --disable-log-bin binlog.000078 | mysql -u root -p
# Segment 2 (Post-DROP):
mysqlbinlog --start-position=842350 --disable-log-bin binlog.000078 binlog.000079 | mysql -u root -p`
  },
  {
    question: "Why must multiple sequential binary log files be passed together in a SINGLE `mysqlbinlog` command instead of separate piped commands?",
    shortAnswer: "Because temporary tables, session variables, and multi-file transactions created across binary log boundaries are lost if separate `mysql` client sessions are spawned for each log file.",
    explanation: "Passing all files in one command (`mysqlbinlog binlog.1 binlog.2 | mysql`) processes them as a single continuous session, preserving session-level context and transaction integrity.",
    hint: "Pass all binlog files in one command to preserve session context and multi-file transactions.",
    level: "expert",
    codeExample: `# SAFE (Single Continuous Session):
mysqlbinlog binlog.000045 binlog.000046 binlog.000047 | mysql -u root -p

# DANGEROUS (Separate sessions lose temporary tables):
# mysqlbinlog binlog.000045 | mysql; mysqlbinlog binlog.000046 | mysql ❌`
  },
  {
    question: "How do you filter binary log replay to only apply changes to a specific database schema?",
    shortAnswer: "Use the `--database=dbname` (or `-d dbname`) option in `mysqlbinlog`.",
    explanation: "Extracts only transactions that modified the specified database, ignoring events affecting other schemas in a multi-tenant instance.",
    hint: "Use --database=dbname in mysqlbinlog.",
    level: "intermediate",
    codeExample: `mysqlbinlog --database=kolkata_finance --disable-log-bin binlog.000045 | mysql -u root -p`
  },
  {
    question: "What does the `mysqlbinlog --idempotent` flag do during disaster recovery replay?",
    shortAnswer: "It tells the MySQL client to suppress duplicate key errors (convert `INSERT` to replace/ignore) and missing row errors during `DELETE`, allowing replay to continue past non-fatal discrepancies.",
    explanation: "Useful when recovering from partial restores where some rows may already exist on the target server.",
    hint: "Suppresses duplicate key and missing row errors during replay.",
    level: "expert",
    codeExample: `mysqlbinlog --idempotent binlog.000045 | mysql -u root -p`
  },
  {
    question: "What is an `XID` event in the MySQL Binary Log?",
    shortAnswer: "A transaction commit event representing the successful commit of an InnoDB transaction and assigning its unique Transaction ID (`XID`).",
    explanation: "`XID` events mark the boundary of completed, durable transactions. When performing position-based recovery, you should always stop immediately after an `XID` event.",
    hint: "Represents an InnoDB transaction commit boundary in the binary log.",
    level: "intermediate",
    codeExample: `# #260825 14:30:00 server id 1  end_log_pos 928410 CRC32 0x8a91b2c4  Xid = 459102`
  },
  {
    question: "How can you view the active list of binary log files currently on the MySQL server?",
    shortAnswer: "Execute `SHOW BINARY LOGS;` (or `SHOW MASTER LOGS;`).",
    explanation: "Returns the complete list of binary log files on disk and their individual byte sizes.",
    hint: "Run SHOW BINARY LOGS.",
    level: "basic",
    codeExample: `SHOW BINARY LOGS;`
  },
  {
    question: "How do you purge old expired binary logs that are no longer needed for Point-in-Time Recovery?",
    shortAnswer: "Execute `PURGE BINARY LOGS BEFORE 'YYYY-MM-DD HH:MM:SS';` or `PURGE BINARY LOGS TO 'binlog.000050';`.",
    explanation: "Safely removes archived binary log files and updates the binary log index file (`binlog.index`) atomically.",
    hint: "Use PURGE BINARY LOGS BEFORE or PURGE BINARY LOGS TO.",
    level: "basic",
    codeExample: `PURGE BINARY LOGS BEFORE DATE_SUB(NOW(), INTERVAL 7 DAY);`
  },
  {
    question: "What system variable configures automatic retention and purging of binary logs in MySQL 8.0?",
    shortAnswer: "`binlog_expire_logs_seconds` (replaces legacy `expire_logs_days`).",
    explanation: "Specifies the retention period in seconds (e.g. `604800` for 7 days). MySQL automatically purges binary logs older than this threshold upon startup and log rotation.",
    hint: "Set binlog_expire_logs_seconds in MySQL 8.0.",
    level: "intermediate",
    codeExample: `SET PERSIST binlog_expire_logs_seconds = 604800; -- 7 Days`
  },
  {
    question: "What is the role of `mysqlbinlog --read-from-remote-server` (`-R`)?",
    shortAnswer: "It connects directly to a live remote MySQL server over TCP/IP and streams binary log events across the network without requiring SSH or local file access to the server's disk.",
    explanation: "Enables continuous offsite streaming of binary logs to a remote backup collector for disaster recovery archiving.",
    hint: "Streams binary logs directly over TCP from a remote MySQL server.",
    level: "expert",
    codeExample: `mysqlbinlog --read-from-remote-server --host=192.168.1.10 -u backup_user -p \\
  --raw --stop-never binlog.000045`
  },
  {
    question: "What does the `--stop-never` option do when combined with `--read-from-remote-server` in `mysqlbinlog`?",
    shortAnswer: "It keeps the connection open indefinitely, acting as a real-time binary log replication client and streaming newly committed transactions continuously to disk as they happen.",
    explanation: "Provides real-time continuous offsite binlog replication, ensuring near-zero RPO even if the primary database server suffers sudden total hardware destruction.",
    hint: "Continuously streams new binlog events in real-time like a replica.",
    level: "expert",
    codeExample: `mysqlbinlog --read-from-remote-server --raw --stop-never -h 10.0.1.5 -u backup -p binlog.000001`
  },
  {
    question: "How do you find the exact position of an accidental `DROP TABLE` inside a 5GB binary log file?",
    shortAnswer: "Use `mysqlbinlog` with grep searching for case-insensitive DDL keywords: `mysqlbinlog -v /var/log/mysql/binlog.000045 | grep -n -i -C 5 'DROP TABLE'`.",
    explanation: "Returns the matching line numbers and surrounding log position (`end_log_pos`) coordinates.",
    hint: "Pipe mysqlbinlog -v into grep searching for 'DROP TABLE'.",
    level: "intermediate",
    codeExample: `mysqlbinlog -v /var/log/mysql/binlog.000045 | grep -i -C 3 "DROP TABLE"`
  },
  {
    question: "What is the difference between GTID-based PITR and Position-based PITR in MySQL 8.0?",
    shortAnswer: "Position-based PITR uses physical byte offsets (`--start-position`); GTID-based PITR filters transactions by Global Transaction Identifiers using `--exclude-gtids` or skipping specific GTID numbers.",
    explanation: "GTID recovery eliminates the need to track byte offsets across multiple log files by uniquely identifying each transaction across the entire cluster.",
    hint: "GTID uses unique transaction UUID:Sequence identifiers instead of byte positions.",
    level: "expert",
    codeExample: `mysqlbinlog --exclude-gtids="3e11fa47-71ca-11eb-9876-0242ac120002:58204" binlog.000045 | mysql`
  },
  {
    question: "What happens if you replay binary logs into a database without restoring the corresponding full base backup first?",
    shortAnswer: "The replay will fail with `Table doesn't exist` or `Key not found` errors because `UPDATE` and `DELETE` events expect pre-existing baseline rows.",
    explanation: "Binary logs only contain incremental delta modifications, not the initial table baseline state.",
    hint: "Fails because delta operations require pre-existing baseline rows and schemas.",
    level: "basic",
    codeExample: `-- Replay requires the base backup as its prerequisite anchor.`
  },
  {
    question: "How does `sync_binlog = 1` guarantee that all committed transactions are recoverable in binary logs during a sudden power outage?",
    shortAnswer: "It forces the operating system to flush every binary log write to physical disk before returning success on transaction commit, preventing loss of binlog events from memory cache.",
    explanation: "If `sync_binlog = 0`, recent transactions buffered in OS cache could be lost during a sudden host crash, creating a gap for PITR.",
    hint: "Flushes binary log writes to physical disk on every transaction commit.",
    level: "intermediate",
    codeExample: `SET PERSIST sync_binlog = 1;`
  },
  {
    question: "How do you verify the integrity of a binary log file before attempting Point-in-Time Recovery?",
    shortAnswer: "Run `mysqlbinlog binlog.000045 > /dev/null` and inspect the exit code (`$? == 0`).",
    explanation: "If the binary log is corrupted or truncated midway, `mysqlbinlog` will output an error and exit with a non-zero status code.",
    hint: "Run mysqlbinlog to /dev/null and verify exit code 0.",
    level: "basic",
    codeExample: `mysqlbinlog /var/log/mysql/binlog.000045 > /dev/null
if [ $? -eq 0 ]; then echo "Binlog intact ✅"; fi`
  },
  {
    question: "What is the impact of character set settings when replaying binary logs?",
    shortAnswer: "`mysqlbinlog` automatically outputs `SET NAMES 'utf8mb4' COLLATE '...';` and character set environment variables matching the original connection that executed the transaction, preserving character integrity.",
    explanation: "Ensures that multilingual strings and binary literals are replayed identically without character set corruption.",
    hint: "mysqlbinlog embeds original character set variables in the output stream.",
    level: "basic",
    codeExample: `/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;`
  },
  {
    question: "How can you speed up the replay of large binary log archives during disaster recovery?",
    shortAnswer: "Set `SET foreign_key_checks = 0; SET unique_checks = 0;` and temporarily configure `innodb_flush_log_at_trx_commit = 2` on the recovery server during replay.",
    explanation: "Removes disk I/O flush bottlenecks, accelerating transaction roll-forward by up to 5x.",
    hint: "Disable constraint checks and relax redo log flushing on the recovery server.",
    level: "expert",
    codeExample: `SET GLOBAL innodb_flush_log_at_trx_commit = 2;
mysqlbinlog --disable-log-bin binlog.000045 | mysql -u root -p
SET GLOBAL innodb_flush_log_at_trx_commit = 1;`
  },
  {
    question: "What is the `--flashback` feature available in some MySQL forks (e.g. MariaDB / Alibaba AliSQL)?",
    shortAnswer: "A utility that automatically reverses ROW-based binary log events (converting `INSERT` to `DELETE`, and `DELETE` to `INSERT`) to roll back transactions backwards without requiring a full base restore.",
    explanation: "Flashback constructs inverse SQL statements to undo accidental data modifications directly on live databases.",
    hint: "Inverts binary log events to roll back transactions backwards.",
    level: "expert",
    codeExample: `# Flashback concept: Converts INSERT -> DELETE, and DELETE -> INSERT.`
  },
  {
    question: "Why should binary logs be stored on a separate physical disk partition or cloud storage volume from the primary data directory (`/var/lib/mysql`)?",
    shortAnswer: "To ensure that if the primary data drive suffers catastrophic hardware failure or total disk corruption, the binary logs remain intact and available to perform Point-in-Time Recovery.",
    explanation: "Separating data and transaction logs prevents single-point-of-failure storage destruction.",
    hint: "Separates transaction logs from data storage to survive drive crashes.",
    level: "intermediate",
    codeExample: `# Dedicated binary log mount:
# log_bin = /mnt/binlogs/mysql-bin`
  },
  {
    question: "How do you perform a dry-run test of a binary log replay before applying it to the database?",
    shortAnswer: "Dump the extracted SQL to a file and inspect it with a pager/editor: `mysqlbinlog --start-position=1582 --stop-position=928410 binlog.000045 > replay_preview.sql`.",
    explanation: "Allows engineers to visually review the exact SQL statements that will be executed, verifying that the destructive query is not present in the replay file.",
    hint: "Save output to a SQL file and review statements before piping into mysql.",
    level: "basic",
    codeExample: `mysqlbinlog --start-position=1582 --stop-position=928410 binlog.000045 > replay_preview.sql
grep -i "DROP TABLE" replay_preview.sql # Must return 0 matches! ✅`
  },
  {
    question: "What is the role of `mysqlbinlog --verbose --verbose` (`-vv`)?",
    shortAnswer: "It displays decoded row data values along with column comments and original data type definitions for maximum forensic visibility.",
    explanation: "Useful for tracking exact previous row values during investigations of data corruption or unauthorized updates.",
    hint: "Decodes row events with full column data types and comments.",
    level: "intermediate",
    codeExample: `mysqlbinlog --base64-output=DECODE-ROWS -vv binlog.000045`
  },
  {
    question: "What is the primary operational takeaway of Topic 7 in Module 004_004?",
    shortAnswer: "Point-in-Time Recovery (PITR) bridges the gap between full backups and zero data loss: master the two-step workflow (Base Restore + Binary Log Replay with `mysqlbinlog`), prefer position-based coordinates (`--start-position` / `--stop-position`) for microsecond precision, always include `--disable-log-bin`, and know how to surgically excise destructive transactions.",
    explanation: "PITR gives database engineers the power to travel back in time to the exact millisecond before a disaster, neutralizing human errors and hardware failures while preserving 100% of legitimate transactional history.",
    hint: "Summarize the 2-step PITR workflow, position precision, --disable-log-bin, and surgical transaction skipping.",
    level: "basic",
    codeExample: `-- Master Point-in-Time Recovery Pipeline:
# 1. Restore Base Backup:
mysql -u root -p < /backups/midnight_base.sql
# 2. Replay Binary Logs to Exact Pre-Crash Position:
mysqlbinlog --start-position=1582 --stop-position=928410 --disable-log-bin \\
  /var/log/mysql/binlog.000045 /var/log/mysql/binlog.000046 | mysql -u root -p`
  }
];

export default questions;
