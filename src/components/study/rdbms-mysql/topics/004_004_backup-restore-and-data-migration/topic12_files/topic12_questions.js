// topic12_files/topic12_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 12: Hands-on Disaster Recovery Simulation: Recovering from an Accidental DROP DATABASE

const questions = [
  {
    question: "What is the very first emergency operational command a DBA should execute upon discovering an accidental `DROP DATABASE` on a production server?",
    shortAnswer: "Execute `FLUSH BINARY LOGS;` (or `mysqladmin flush-binary-logs`).",
    explanation: "Rotating the binary log immediately closes the active file containing the `DROP DATABASE` statement, preserving it from being overwritten or corrupted while recovery operations begin.",
    hint: "Flush and rotate binary logs to close and preserve the active log file.",
    level: "basic",
    codeExample: `mysqladmin -u root -p flush-binary-logs`
  },
  {
    question: "Why should Point-in-Time Recovery NEVER be attempted directly in-place on the live production server host while applications are attempting to connect?",
    shortAnswer: "Because lingering application connections, cron jobs, and background workers will attempt to write new partial rows, causing primary key collisions, lock contention, and irreversible data corruption.",
    explanation: "Best practice is to spin up an isolated staging/recovery instance to perform the restore and roll-forward before switching application traffic over.",
    hint: "Perform recovery on an isolated staging instance to avoid write conflicts.",
    level: "basic",
    codeExample: `# Provision clean isolated staging host:
# 192.168.1.150 (Staging DB)`
  },
  {
    question: "What are the 6 chronological steps in the definitive Disaster Recovery Runbook for recovering from an accidental `DROP DATABASE`?",
    shortAnswer: "1. Incident Triage & Log Rotation (`FLUSH BINARY LOGS`); 2. Retrieve Base Backup & Binlog Archives; 3. Provision Staging Host & Restore Base; 4. Pinpoint Pre-Disaster Coordinate; 5. Replay Binary Logs to Safe Position; 6. Verify Parity & Cutover DNS.",
    explanation: "This systematic runbook guarantees predictable, stress-free recovery under intense production outage pressure.",
    hint: "1. Triage -> 2. Retrieve -> 3. Restore Base -> 4. Pinpoint Pos -> 5. Replay -> 6. Cutover.",
    level: "basic",
    codeExample: `# 1. FLUSH BINARY LOGS -> 2. Download Base -> 3. xtrabackup --copy-back -> 4. grep DROP -> 5. mysqlbinlog -> 6. Route53 switch`
  },
  {
    question: "How do you find the exact byte position where the `DROP DATABASE` command started inside `binlog.000105`?",
    shortAnswer: "Run `mysqlbinlog --base64-output=DECODE-ROWS -v binlog.000105 | grep -n -C 5 -i 'DROP DATABASE'` and inspect the preceding `# at <pos>` header.",
    explanation: "The `# at <pos>` immediately above the `DROP DATABASE` statement is the exact byte offset to supply as `--stop-position`.",
    hint: "Grep for DROP DATABASE and note the starting '# at <pos>' header.",
    level: "intermediate",
    codeExample: `mysqlbinlog --base64-output=DECODE-ROWS -v binlog.000105 | grep -C 5 "DROP DATABASE"
# Result: # at 849201 -> DROP DATABASE \`kolkata_retail\``
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a deployment script dropped `barrackpore_store` at 15:45:00 on Tuesday. How did Mamata achieve a 20-minute RTO with 0 seconds RPO?",
    shortAnswer: "She restored Sunday's XtraBackup base snapshot onto a staging server in 8 minutes, replayed binary logs `000100` through `000105` stopping at byte `849201` in 9 minutes, verified row counts, and repointed the local store proxy in 3 minutes.",
    explanation: "Total recovery time was 20 minutes with zero lost customer transactions across ₹1.2 Crores in daily retail sales.",
    hint: "Restored Sunday base + replayed logs to pre-drop position in 20 minutes.",
    level: "moderate",
    codeExample: `# Barrackpore Full Replay:
mysqlbinlog --start-position=1582 --disable-log-bin \\
  binlog.000100 binlog.000101 binlog.000102 binlog.000103 binlog.000104 \\
  --stop-position=849201 binlog.000105 | mysql -u root -p`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an accidental `DROP DATABASE kolkata_bank;` occurred on the primary node. Why did the standby read replica drop the database as well?",
    shortAnswer: "Because standard asynchronous/semi-synchronous MySQL replication faithfully replicated the `DROP DATABASE` statement from the master's binary log and executed it on the replica within milliseconds.",
    explanation: "Replicas mirror all DDL operations executed on the master; replication is a high-availability mechanism, NOT a substitute for Point-in-Time Recovery backups.",
    hint: "Replication faithfully mirrors all DDL operations including DROP statements.",
    level: "expert",
    codeExample: `-- Replication does NOT protect against human error or accidental DROPs!`
  },
  {
    question: "What is Delayed Replication (`CHANGE REPLICATION SOURCE TO SOURCE_DELAY = N;`), and how does it prevent catastrophic DDL disasters?",
    shortAnswer: "It configures a dedicated replica to intentionally lag behind the primary by N seconds (e.g. `SOURCE_DELAY = 14400` for 4 hours); if `DROP DATABASE` is executed on the master, DBAs have 4 hours to stop the delayed replica before it executes the DROP.",
    explanation: "A delayed replica provides an instant disaster recovery baseline without waiting hours to unpack full physical backup archives.",
    hint: "Intentionally delays replication by hours to give DBAs time to stop before disaster queries execute.",
    level: "expert",
    codeExample: `CHANGE REPLICATION SOURCE TO SOURCE_DELAY = 14400; -- 4 Hours Delay
START REPLICA;`
  },
  {
    question: "What query firewall rule in ProxySQL can be deployed to permanently block `DROP DATABASE` commands in production?",
    shortAnswer: "Create a rule matching `^DROP\\s+DATABASE` with `action = 'ERROR'` and `error_msg = 'DROP DATABASE is forbidden in production!'`.",
    explanation: "ProxySQL intercepts and rejects the destructive query at the proxy layer before it ever reaches the MySQL database engine.",
    hint: "Configure ProxySQL regex query rule to intercept and block DROP DATABASE.",
    level: "intermediate",
    codeExample: `INSERT INTO mysql_query_rules (rule_id, active, match_pattern, error_msg, apply)
VALUES (10, 1, '^DROP\\s+DATABASE', 'DROP DATABASE is strictly forbidden!', 1);
LOAD MYSQL QUERY RULES TO RUNTIME; SAVE MYSQL QUERY RULES TO DISK;`
  },
  {
    question: "Why is the `--disable-log-bin` (`-D`) flag mandatory when replaying binary logs into the recovery staging database?",
    shortAnswer: "To prevent the recovery instance from recording the replayed transactions into its own binary log, avoiding unnecessary disk I/O, storage bloat, and replication loops.",
    explanation: "Speeds up replay throughput and preserves clean disk space on the staging host.",
    hint: "Disables binary log generation during replay to save I/O and disk space.",
    level: "intermediate",
    codeExample: `mysqlbinlog --disable-log-bin --start-position=1582 binlog.000100 | mysql -u root -p`
  },
  {
    question: "What verification checks must be performed on the recovered database before reopening traffic to production applications?",
    shortAnswer: "1. Table count comparison against schema catalog; 2. Row count validation on core transactional tables; 3. Verification of maximum `id` and `created_at` timestamps; 4. Foreign key constraint integrity validation.",
    explanation: "Sanity checking ensures that all tables and rows are intact and that the database is fully consistent before public cutover.",
    hint: "Check table counts, row counts, max timestamps, and foreign key integrity.",
    level: "basic",
    codeExample: `SELECT 'orders', COUNT(*), MAX(order_date) FROM kolkata_retail.orders
UNION ALL
SELECT 'customers', COUNT(*), MAX(created_at) FROM kolkata_retail.customers;`
  },
  {
    question: "What is the Recovery Time Objective (RTO) and Recovery Point Objective (RPO) achieved in the 26-minute disaster simulation?",
    shortAnswer: "RTO: 26 minutes (total elapsed outage time from disaster to production cutover); RPO: 0 seconds (zero committed transactions lost).",
    explanation: "Because binary logs were replayed up to the exact byte offset immediately preceding the DROP, 100% of committed transactions were recovered.",
    hint: "RTO = 26 minutes, RPO = 0 seconds (zero data loss).",
    level: "basic",
    codeExample: `-- RTO = 26 Mins, RPO = 0 Seconds (Zero Data Loss! ✅)`
  },
  {
    question: "How do you revoke the global `DROP` privilege from standard application database users in MySQL 8.0?",
    shortAnswer: "Execute `REVOKE DROP ON *.* FROM 'app_user'@'%';` and grant `DROP` only on specific temporary or development schemas if required.",
    explanation: "Enforcing the Principle of Least Privilege prevents application connection strings from ever executing destructive schema drops.",
    hint: "Revoke DROP privilege from application accounts.",
    level: "basic",
    codeExample: `REVOKE DROP ON *.* FROM 'app_user'@'%';
REVOKE DROP ON kolkata_retail.* FROM 'app_user'@'%';`
  },
  {
    question: "How can you speed up the preparation of physical base backups during an emergency disaster recovery operation?",
    shortAnswer: "Supply the `--use-memory=8G` (or 16G) option to `xtrabackup --prepare` on a host with sufficient RAM.",
    explanation: "Allocating 8GB-16GB of RAM allows InnoDB crash recovery to cache redo log blocks and index structures in memory, cutting prepare time from 15 minutes to 2 minutes.",
    hint: "Allocate 8GB-16GB RAM via --use-memory to accelerate xtrabackup --prepare.",
    level: "intermediate",
    codeExample: `xtrabackup --prepare --use-memory=16G --target-dir=/backups/restore_stage/`
  },
  {
    question: "What role does DNS or database proxy routing (e.g. ProxySQL / Route53) play in rapid disaster recovery cutover?",
    shortAnswer: "It allows DBAs to redirect all application traffic to the restored staging primary host instantly by modifying a single CNAME record or proxy upstream target without redeploying application code.",
    explanation: "Decouples application connection strings from physical server IP addresses.",
    hint: "Enables instant traffic redirection to the new primary without code deployments.",
    level: "basic",
    codeExample: `# Route53 CNAME switch:
# db.kolkata.internal -> staging-primary.internal`
  },
  {
    question: "What happens if you accidentally specify a `--stop-position` that is AFTER the `DROP DATABASE` statement in `mysqlbinlog`?",
    shortAnswer: "The replay will execute all valid transactions and then execute `DROP DATABASE`, re-deleting the entire database on the staging host!",
    explanation: "Always double-check that `--stop-position` matches the `# at <pos>` header immediately BEFORE the `DROP DATABASE` statement.",
    hint: "Replays and executes the DROP DATABASE, deleting the restored database again!",
    level: "basic",
    codeExample: `-- CRITICAL: Stop position must precede the starting byte of the DROP query.`
  },
  {
    question: "How do you verify that binary logs are stored safely and independently of the MySQL data directory?",
    shortAnswer: "Configure `log_bin` to point to a dedicated, independent NVMe/SAN mount (e.g. `/mnt/binlogs/mysql-bin`) and stream logs offsite in real time.",
    explanation: "Ensures binary logs survive even if the primary database storage volume is completely destroyed.",
    hint: "Mount binary logs on an independent partition or stream to offsite storage.",
    level: "intermediate",
    codeExample: `[mysqld]
log_bin = /mnt/dedicated_nvme_binlogs/mysql-bin`
  },
  {
    question: "What is an `ANALYZE TABLE` command and why should it be run after completing Point-in-Time Recovery?",
    shortAnswer: "It recalculates index cardinality statistics in the data dictionary, ensuring that the optimizer generates fast index lookup query plans when user queries resume.",
    explanation: "Rebuilding index statistics prevents initial query slowness following disaster recovery.",
    hint: "Updates optimizer index statistics for optimal query execution plans.",
    level: "basic",
    codeExample: `mysqlcheck -u root -p --analyze kolkata_retail`
  },
  {
    question: "How does `pt-table-checksum` validate table consistency between the restored primary and newly attached replicas?",
    shortAnswer: "It computes cryptographic checksums across row chunks on the primary and compares them with replica checksums, flagging any missing or inconsistent rows.",
    explanation: "Guarantees that downstream replicas are 100% in sync with the promoted primary.",
    hint: "Computes and compares cryptographic chunk checksums across primary and replicas.",
    level: "intermediate",
    codeExample: `pt-table-checksum --host=127.0.0.1 -u root -p --replicate=percona.checksums`
  },
  {
    question: "What is the recommended frequency for conducting Disaster Recovery Fire Drills in production database environments?",
    shortAnswer: "At least once per quarter (every 3 months).",
    explanation: "Regular simulations ensure backup archives are valid, scripts function smoothly, and engineering teams can execute the runbook calmly under pressure.",
    hint: "Conduct quarterly disaster recovery simulations to test runbooks and backups.",
    level: "basic",
    codeExample: `-- Schedule quarterly disaster recovery simulations on staging environments.`
  },
  {
    question: "How do you configure MySQL to automatically expire old binary logs after 7 days in MySQL 8.0?",
    shortAnswer: "`SET PERSIST binlog_expire_logs_seconds = 604800;` (604800 seconds = 7 days).",
    explanation: "Maintains a rolling 7-day window of binary logs for Point-in-Time Recovery while preventing unbounded disk consumption.",
    hint: "Set binlog_expire_logs_seconds to 604800 (7 days).",
    level: "basic",
    codeExample: `SET PERSIST binlog_expire_logs_seconds = 604800;`
  },
  {
    question: "What is the purpose of the `RESET REPLICA ALL;` statement when promoting a recovered staging server to primary master?",
    shortAnswer: "It clears all historical replication connection metadata, master coordinates, and relay log files, permanently promoting the instance to an independent primary node.",
    explanation: "Prevents the newly promoted primary from trying to connect to the dead master on reboot.",
    hint: "Clears replication coordinates and establishes instance as independent primary.",
    level: "intermediate",
    codeExample: `STOP REPLICA;
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;`
  },
  {
    question: "How do you handle character set integrity when replaying 50GB of binary logs during a disaster recovery simulation?",
    shortAnswer: "`mysqlbinlog` automatically outputs `SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT` and sets original connection charset variables for each transaction, preserving exact UTF-8 / Bengali character encodings.",
    explanation: "Ensures multilingual text is restored without corruption.",
    hint: "mysqlbinlog embeds original session character sets in the output stream.",
    level: "basic",
    codeExample: `/*!40101 SET NAMES utf8mb4 */;`
  },
  {
    question: "What is the role of `innodb_flush_log_at_trx_commit = 2` during emergency binary log replay?",
    shortAnswer: "It relaxes redo log disk flushing from every commit to once per second, speeding up transaction roll-forward by up to 4x during emergency recovery.",
    explanation: "Drastically shortens RTO; remember to restore `innodb_flush_log_at_trx_commit = 1` before opening the database to production traffic.",
    hint: "Temporarily speeds up replay by 4x; restore to 1 before opening production traffic.",
    level: "expert",
    codeExample: `SET GLOBAL innodb_flush_log_at_trx_commit = 2;
-- Replay binary logs
SET GLOBAL innodb_flush_log_at_trx_commit = 1;`
  },
  {
    question: "Why should `sql_safe_updates = 1` be configured in client connections to prevent accidental bulk data corruption?",
    shortAnswer: "It prevents `UPDATE` and `DELETE` statements from executing if they lack a `WHERE` clause referencing a primary or indexed key, blocking catastrophic unqualified updates.",
    explanation: "Catches junior developer accidents before they can corrupt production tables.",
    hint: "Rejects UPDATE and DELETE queries that lack key-based WHERE clauses.",
    level: "basic",
    codeExample: `SET sql_safe_updates = 1;
-- UPDATE orders SET status = 'CANCELLED'; -> ERROR: You are using safe update mode!`
  },
  {
    question: "How do you archive all restored binary log replay commands to a forensic audit log?",
    shortAnswer: "Use `tee` in the Linux terminal: `mysqlbinlog ... | tee -a /var/log/dr_replay_audit.sql | mysql -u root -p`.",
    explanation: "Creates an immutable text record of all replayed transactions for post-mortem analysis.",
    hint: "Use tee to save replayed SQL statements to an audit log file.",
    level: "intermediate",
    codeExample: `mysqlbinlog --disable-log-bin binlog.000100 | tee /backups/dr_replay.sql | mysql -u root -p`
  },
  {
    question: "What is the impact of missing a binary log file in the sequence (e.g. having `binlog.000100`, `binlog.000101`, and `binlog.000103` but missing `000102`) during disaster recovery?",
    shortAnswer: "The replay will fail or produce inconsistent data because transactions in missing `000102` will be lost, causing subsequent `UPDATE` and `DELETE` events in `000103` to fail with missing row errors.",
    explanation: "Binary log chains must be strictly continuous and unbroken for successful PITR.",
    hint: "Missing binary logs break transaction continuity and cause replay failures.",
    level: "expert",
    codeExample: `-- Binary log sequence MUST be strictly continuous: 100 -> 101 -> 102 -> 103.`
  },
  {
    question: "How do you confirm that all database users and permissions are restored on the new primary instance?",
    shortAnswer: "Query `SELECT user, host, plugin FROM mysql.user;` and verify application service accounts can authenticate successfully.",
    explanation: "Ensures microservices and application servers can connect immediately upon DNS cutover.",
    hint: "Verify accounts in mysql.user and test application authentication.",
    level: "basic",
    codeExample: `SELECT user, host, plugin FROM mysql.user WHERE user NOT LIKE 'mysql.%';`
  },
  {
    question: "What is the primary operational takeaway of Topic 12 in Module 004_004?",
    shortAnswer: "Disaster Recovery requires a disciplined, rehearsed 6-step runbook: immediately isolate the incident and rotate logs (`FLUSH BINARY LOGS`), restore the base backup onto an isolated staging host, pinpoint the pre-disaster byte coordinate (`# at <pos>`), replay continuous binary logs with `--disable-log-bin`, verify row count and data parity, and execute rapid DNS cutover to achieve near-zero RTO and zero RPO.",
    explanation: "Mastering the end-to-end disaster recovery simulation gives database administrators the confidence and technical precision to rescue multi-crore enterprise databases from catastrophic human errors and hardware destruction.",
    hint: "Summarize the 6-step disaster runbook, FLUSH BINARY LOGS, position precision, and zero RPO.",
    level: "basic",
    codeExample: `-- Master Production Disaster Recovery Pipeline:
# 1. Triage & Rotate Log:
mysqladmin -u root -p flush-binary-logs
# 2. Restore Base Backup on Staging:
xtrabackup --copy-back --target-dir=/backups/base_prepared/
chown -R mysql:mysql /var/lib/mysql && systemctl start mysqld
# 3. Replay to Pre-DROP Position:
mysqlbinlog --start-position=1582 --disable-log-bin \\
  binlog.000100 binlog.000101 --stop-position=849201 binlog.000102 | mysql -u root -p
# 4. Verify & Cutover:
SELECT COUNT(*) FROM kolkata_retail.orders;
# Repoint Route53 / ProxySQL to new primary!`
  }
];

export default questions;
