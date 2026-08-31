// topic8_files/topic8_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 8: Replication Lag: Root Causes (Single-Threaded Applier, Long-Running Queries, Disk I/O) and Mitigation

const questions = [
  {
    question: "What is Replication Lag in MySQL, and how is it fundamentally measured?",
    shortAnswer: "Replication lag is the elapsed time between when a transaction is committed on the Primary (Source) and when it is executed and committed on a Replica; standard measurement is reported as **`Seconds_Behind_Source`** (or `Seconds_Behind_Master`) in `SHOW REPLICA STATUS`.",
    explanation: "High lag causes read replicas to serve stale data to client applications.",
    hint: "Time difference between primary commit and replica application, measured as Seconds_Behind_Source.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G -- Seconds_Behind_Source: 0`
  },
  {
    question: "How does MySQL internally compute the value of `Seconds_Behind_Source`?",
    shortAnswer: "It calculates the difference between the **current system clock time on the replica** and the **timestamp embedded in the binary log event** currently being executed by the replica's SQL applier thread.",
    explanation: "If the SQL thread is actively executing a transaction committed on the primary 30 seconds ago, lag is reported as 30.",
    hint: "Difference between current replica clock and timestamp of transaction currently being applied.",
    level: "intermediate",
    codeExample: `-- Formula: Seconds_Behind_Source = Replica_Clock - Binlog_Event_Timestamp`
  },
  {
    question: "Why can NTP clock drift between Source and Replica cause inaccurate or even negative `Seconds_Behind_Source` values?",
    shortAnswer: "Because `Seconds_Behind_Source` compares the Source's transaction timestamp with the Replica's local system clock; if the Replica's system clock is 20 seconds behind the Source, lag calculations will be skewed by 20 seconds.",
    explanation: "All database cluster nodes must synchronize to a single authoritative NTP time server.",
    hint: "Clock skew between servers directly corrupts timestamp-based lag math.",
    level: "intermediate",
    codeExample: `# NTP synchronization command:
sudo systemctl restart systemd-timesyncd`
  },
  {
    question: "What is the primary architectural cause of replication lag on traditional single-threaded MySQL replicas?",
    shortAnswer: "**Concurrency Mismatch**: The Source executes write transactions across dozens of CPU cores simultaneously (e.g. 64 concurrent client threads), while a legacy replica executes transactions serially using a **single-threaded SQL applier thread**.",
    explanation: "A single thread cannot keep pace with 64 parallel threads writing to disk.",
    hint: "Primary writes across dozens of parallel threads while replica executes sequentially on 1 thread.",
    level: "basic",
    codeExample: `-- Source: 64 concurrent writers
-- Legacy Replica: 1 single-threaded SQL Applier`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a midnight maintenance script executed `DELETE FROM pos_audit_logs WHERE log_date < '2025-01-01';` deleting 2,000,000 rows. Why did this cause 45 minutes of replication lag across ₹1.2 Crores in store inventory?",
    shortAnswer: "Because the massive `DELETE` executed as a single monolithic transaction taking 45 minutes on the primary; upon replicating, the replica's SQL thread spent 45 minutes executing this single transaction, blocking all subsequent sales invoices for 45 minutes.",
    explanation: "Large transactions must always be broken into micro-batches with `LIMIT`.",
    hint: "Monolithic 2-million row DELETE blocked the SQL thread for 45 minutes.",
    level: "moderate",
    codeExample: `# Flawed Monolithic Query:
DELETE FROM pos_audit_logs WHERE log_date < '2025-01-01';`
  },
  {
    question: "How did Susmita refactor the Barrackpore cleanup script into micro-batches to eliminate replication lag completely?",
    shortAnswer: "She refactored the query to delete in batches of 2,000 rows inside a loop with a 50ms sleep (`DELETE FROM pos_audit_logs WHERE log_date < '2025-01-01' LIMIT 2000;`), allowing the replica SQL thread to interleave sales transactions with zero lag.",
    explanation: "Micro-batching prevents starving normal application transactions.",
    hint: "Deleted in chunks of 2,000 with LIMIT and brief sleep intervals.",
    level: "moderate",
    codeExample: `WHILE (affected_rows > 0) DO
  DELETE FROM pos_audit_logs WHERE log_date < '2025-01-01' LIMIT 2000;
  SELECT SLEEP(0.05);
END WHILE;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did missing a secondary index on a ledger table cause massive replication lag during row-based replication across ₹500 Crores in banking records?",
    shortAnswer: "Under `binlog_format = ROW`, updating a row requires the replica to locate that exact row before modifying it; without an index, the replica's SQL thread performed a **full table scan of 10,000,000 rows for every single updated row event**, causing exponential lag.",
    explanation: "Tables in Row-Based Replication must always have primary keys or unique secondary indexes.",
    hint: "Row-based updates perform full table scans per row event if indexing is missing.",
    level: "expert",
    codeExample: `-- Missing Index: Full table scan executed 5,000 times for a 5,000-row batch!
ALTER TABLE ledger_transactions ADD INDEX idx_account_id (account_id);`
  },
  {
    question: "What hardware asymmetry commonly causes replication lag in cloud database deployments?",
    shortAnswer: "Running the Primary on high-performance compute with provisioned NVMe IOPS (e.g. 20,000 IOPS) while provisioning Read Replicas on cheaper instances with low memory or throttled burstable disk storage (e.g. 3,000 IOPS).",
    explanation: "Replicas executing write streams will quickly saturate their lower disk I/O bandwidth.",
    hint: "Under-provisioned replica CPU, RAM (InnoDB buffer pool), or disk IOPS compared to primary.",
    level: "basic",
    codeExample: `-- Primary: 64GB RAM, 20k IOPS
-- Replica: 8GB RAM, 3k IOPS → Rapid Disk I/O Throttling & Lag!`
  },
  {
    question: "Why do long-running `ALTER TABLE` statements cause extreme replication lag on standard MySQL replicas?",
    shortAnswer: "Because DDL statements acquire exclusive metadata locks (`MDL`), halting the replica's SQL applier thread for the entire duration of the table rebuild (which can take hours on large tables), blocking all subsequent DML transactions.",
    explanation: "Online schema change tools must be used to perform zero-lock DDL.",
    hint: "DDL acquires exclusive metadata locks, freezing the SQL thread until table rebuild finishes.",
    level: "intermediate",
    codeExample: `-- Blocking DDL freezes replication:
ALTER TABLE customers ADD COLUMN kyc_status VARCHAR(20);`
  },
  {
    question: "What open-source tools allow performing zero-lock, zero-lag DDL schema changes in production?",
    shortAnswer: "**`gh-ost`** (GitHub Online Schema Transformations) and **`pt-online-schema-change`** (Percona Toolkit).",
    explanation: "These tools create a shadow table, stream row modifications via binlogs/triggers in small batches, and swap tables atomically with zero replication lag.",
    hint: "gh-ost and pt-online-schema-change.",
    level: "intermediate",
    codeExample: `gh-ost --user=root --password=Pass --host=127.0.0.1 \
  --database=kolkata_bank --table=ledger \
  --alter="ADD COLUMN kyc_verified TINYINT DEFAULT 1" --execute`
  },
  {
    question: "What is `pt-heartbeat` and why is it superior to `Seconds_Behind_Source` for monitoring replication lag?",
    shortAnswer: "`pt-heartbeat` injects a dedicated heartbeat table with microsecond timestamps on the Primary and measures the exact time delta when read on the Replica, providing true sub-millisecond precision lag metrics immune to NTP clock skew and multi-tier cascading topology lag.",
    explanation: "Industry standard tool for high-precision replication lag telemetry.",
    hint: "Microsecond timestamp table written on primary and read on replica for exact lag telemetry.",
    level: "expert",
    codeExample: `pt-heartbeat --database=percona --update -h primary_ip -u root -p
pt-heartbeat --database=percona --monitor -h replica_ip -u root -p`
  },
  {
    question: "What does `Seconds_Behind_Source: NULL` indicate?",
    shortAnswer: "Replication is completely broken or stopped; either `Replica_IO_Running: No` or `Replica_SQL_Running: No`.",
    explanation: "Lag cannot be calculated because replication threads are not actively streaming or applying events.",
    hint: "Replication is stopped or failed.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G -- Seconds_Behind_Source: NULL`
  },
  {
    question: "What is `innodb_flush_log_at_trx_commit = 2` on read replicas and how does it reduce replication lag?",
    shortAnswer: "It flushes the InnoDB redo log to the OS cache on every commit but writes to physical disk once per second, drastically reducing disk `fsync()` wait times on the replica's SQL applier thread.",
    explanation: "Safely applied to read replicas since data can be re-fetched from the primary if the replica crashes.",
    hint: "Flushes redo log to disk once per second instead of every commit, cutting fsync overhead on replicas.",
    level: "intermediate",
    codeExample: `[mysqld]
# On Read Replicas ONLY:
innodb_flush_log_at_trx_commit = 2
sync_binlog = 0`
  },
  {
    question: "What is `sync_binlog = 0` on read replicas?",
    shortAnswer: "It allows the operating system to flush binary logs to disk periodically rather than after every transaction, boosting disk write throughput on replicas that have `log_replica_updates = ON`.",
    explanation: "Eliminates binlog fsync bottlenecks on high-write replica workloads.",
    hint: "Disables per-transaction disk fsync for binlogs on replicas.",
    level: "intermediate",
    codeExample: `SET GLOBAL sync_binlog = 0;`
  },
  {
    question: "How can network bandwidth throttling between datacenters cause replication lag?",
    shortAnswer: "If the Source generates 50MB/sec of binary log data but the WAN network link between primary and replica is capped at 10MB/sec, the replica's I/O receiver thread cannot download binlogs in real time, causing `Read_Master_Log_Pos` to fall behind.",
    explanation: "Diagnosed by inspecting `Retrieved_Gtid_Set` vs `Master_Log_Pos`.",
    hint: "I/O thread cannot download events fast enough over saturated WAN links.",
    level: "intermediate",
    codeExample: `-- Saturated WAN link: I/O Receiver thread falls behind Master binlog position.`
  },
  {
    question: "What is `slave_net_timeout` in MySQL and what is its default value?",
    shortAnswer: "The number of seconds the replica waits for data or a heartbeat packet from the Source before aborting the broken connection and reconnecting (default 60 seconds).",
    explanation: "Detects silent TCP connection drops between replication nodes.",
    hint: "Timeout in seconds before replica drops and reconnects a silent TCP socket (60s).",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'slave_net_timeout';`
  },
  {
    question: "What is the risk of having severe replication lag in a high-availability failover topology?",
    shortAnswer: "If the primary crashes while the standby replica has 60 seconds of lag, promoting the replica will result in either: 1. A prolonged outage while the replica applies 60 seconds of relay logs (High RTO), or 2. Significant data loss if un-applied relay logs cannot be recovered (High RPO).",
    explanation: "Replication lag directly undermines cluster high availability SLAs.",
    hint: "Increases RTO (recovery time) and risks severe data loss during emergency failovers.",
    level: "intermediate",
    codeExample: `-- 60s Lag = 60s Recovery Delay (RTO) or 60s Lost Transactions (RPO).`
  },
  {
    question: "How do you determine whether replication lag is caused by the I/O Receiver thread or the SQL Applier thread?",
    shortAnswer: "Compare `Read_Master_Log_Pos` (I/O position) with `Exec_Master_Log_Pos` (SQL position) in `SHOW REPLICA STATUS`; if `Read_Master_Log_Pos` matches the Source's current position but `Exec_Master_Log_Pos` is far behind, the **SQL applier thread** is the bottleneck. If `Read_Master_Log_Pos` is behind the Source, the **network / I/O thread** is the bottleneck.",
    explanation: "Crucial diagnostic step to isolate network transfer issues from disk execution stalls.",
    hint: "Compare Read_Master_Log_Pos with Exec_Master_Log_Pos to isolate I/O vs SQL thread stalls.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G
-- Master_Log_File: binlog.000004 | Read_Master_Log_Pos: 980000 (I/O Caught Up)
-- Relay_Master_Log_File: binlog.000004 | Exec_Master_Log_Pos: 120000 (SQL Applier Stalled!)`
  },
  {
    question: "What is `binlog_row_image` and how can setting it to `MINIMAL` reduce replication lag?",
    shortAnswer: "`binlog_row_image = MINIMAL` records only the primary key and the specific columns that changed in the binary log (rather than full row before-and-after images), shrinking binary log size by up to 70% and drastically reducing network transfer and disk I/O overhead on replicas.",
    explanation: "Greatly benefits write-heavy workloads with wide tables.",
    hint: "Logs only changed columns and primary key, shrinking binlog size and network bandwidth.",
    level: "expert",
    codeExample: `SET GLOBAL binlog_row_image = 'MINIMAL';`
  },
  {
    question: "What is `replica_rows_search_algorithms` (or `slave_rows_search_algorithms`) in MySQL 8.0?",
    shortAnswer: "A parameter that determines how the replica searches for matching rows in tables lacking primary keys during Row-Based replication; default `INDEX_SCAN,HASH_SCAN` uses an in-memory hash table to prevent $O(N^2)$ full table scans on unindexed tables.",
    explanation: "Prevents catastrophic lag spikes when modifying tables lacking primary keys.",
    hint: "Uses hash scans to prevent exponential table scan lag on unindexed tables.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'replica_rows_search_algorithms'; -- Value: INDEX_SCAN,HASH_SCAN`
  },
  {
    question: "How does ProxySQL help mitigate user-facing issues caused by replication lag?",
    shortAnswer: "ProxySQL monitors `max_replication_lag`; when a replica lags beyond this threshold, ProxySQL automatically shunts read traffic away from that lagging replica to healthy nodes or the primary, ensuring users do not read stale data.",
    explanation: "Shields web applications from replication lag spikes.",
    hint: "Automatically shunts lagging replicas to prevent users from reading stale data.",
    level: "basic",
    codeExample: `UPDATE mysql_servers SET max_replication_lag = 5 WHERE hostgroup_id = 20;`
  },
  {
    question: "What is `rpl_semi_sync_master_wait_point = AFTER_SYNC`'s impact on replication lag?",
    shortAnswer: "Semi-sync guarantees the transaction is in the replica's **Relay Log** (0s I/O lag), but does NOT guarantee the replica's **SQL thread** has applied it; the SQL applier may still experience lag if blocked by heavy queries.",
    explanation: "Semi-sync guarantees RPO = 0 durability, not instantaneous read consistency.",
    hint: "Guarantees data is in relay log, but does not prevent SQL applier execution lag.",
    level: "intermediate",
    codeExample: `-- Transaction is durable in Relay Log, but SQL execution lag can still occur.`
  },
  {
    question: "What is the recommended Prometheus alert rule for replication lag?",
    shortAnswer: "Alert if `mysql_slave_status_seconds_behind_master > 10` for more than 2 minutes (warning), and if `> 60` for more than 1 minute (critical).",
    explanation: "Provides timely notification before lag impacts user-facing application consistency.",
    hint: "Alert on Seconds_Behind_Source > 10s (warning) and > 60s (critical).",
    level: "basic",
    codeExample: `alert: MySQLReplicationLagHigh
expr: mysql_slave_status_seconds_behind_master > 10
for: 2m
labels:
  severity: warning`
  },
  {
    question: "Why should `innodb_buffer_pool_size` on read replicas NEVER be smaller than on the primary?",
    shortAnswer: "If the buffer pool is smaller, the replica must frequently read pages from slow disk storage instead of RAM, causing the SQL applier thread to stall on disk I/O while trying to keep up with the primary's memory-buffered writes.",
    explanation: "Identical RAM sizing ensures the replica's working set stays cached in memory.",
    hint: "Smaller buffer pool causes excessive disk reads, stalling the SQL applier thread.",
    level: "intermediate",
    codeExample: `[mysqld]
# Allocate 75% of physical RAM on both Primary and Replicas:
innodb_buffer_pool_size = 48G`
  },
  {
    question: "What is `innodb_thread_concurrency` and how can setting it too low on a replica exacerbate lag?",
    shortAnswer: "It limits how many InnoDB threads can execute inside the storage engine simultaneously; setting it too low throttles parallel replication worker threads, causing workers to queue up and increasing lag.",
    explanation: "Set `innodb_thread_concurrency = 0` (unlimited) on modern multi-core NVMe servers.",
    hint: "Setting thread concurrency too low throttles parallel replication workers.",
    level: "expert",
    codeExample: `SET GLOBAL innodb_thread_concurrency = 0;`
  },
  {
    question: "What happens if a backup process (e.g. `mysqldump` with table locks) runs on a read replica?",
    shortAnswer: "Table locks acquire metadata locks that completely freeze the replica's SQL applier thread for the entire duration of the dump, causing replication lag to climb steadily until the backup finishes.",
    explanation: "Always use `--single-transaction` with `mysqldump` or take non-locking physical snapshots (MySQL Shell Dump / Percona XtraBackup).",
    hint: "Table locks freeze the SQL applier thread, causing lag to climb for the duration of the dump.",
    level: "basic",
    codeExample: `-- Use non-locking MVCC dump:
mysqldump --single-transaction --all-databases > backup.sql`
  },
  {
    question: "How do you inspect which exact SQL statement or transaction is currently blocking the replica SQL thread?",
    shortAnswer: "Query `performance_schema.threads` joined with `performance_schema.events_statements_current` for `thread_name LIKE '%slave_sql%'` or inspect `SHOW PROCESSLIST` on the replica.",
    explanation: "Pinpoints the specific blocking query or table lock immediately.",
    hint: "Inspect events_statements_current for the replication SQL thread in performance_schema.",
    level: "expert",
    codeExample: `SELECT THREAD_ID, PROCESSLIST_COMMAND, PROCESSLIST_STATE, PROCESSLIST_INFO 
FROM performance_schema.threads 
WHERE NAME LIKE '%applier%' OR NAME LIKE '%slave_sql%';`
  },
  {
    question: "What is `max_binlog_size` and what impact does log rotation have on replica I/O lag?",
    shortAnswer: "It defines the maximum size of a binary log file before rotating (default 1GB); rotating too frequently (e.g. every 50MB under high writes) adds filesystem rename and metadata sync overhead to both dump and receiver threads.",
    explanation: "Keep `max_binlog_size = 1G` on high-throughput database clusters.",
    hint: "Maximum size before log rotation; keep at 1GB to prevent excessive rotation overhead.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'max_binlog_size'; -- Default: 1073741824 (1GB)`
  },
  {
    question: "What is the single most effective configuration change to eliminate replication lag in MySQL 8.0?",
    shortAnswer: "Enabling **Multi-Threaded Slave (MTS)** parallel replication by setting `replica_parallel_workers = <num_cores>` and `replica_parallel_type = 'LOGICAL_CLOCK'`.",
    explanation: "Allows the replica to apply dozens of independent transactions concurrently, mirroring the primary's multi-core throughput.",
    hint: "Enable Multi-Threaded Slave (replica_parallel_workers > 0 and LOGICAL_CLOCK).",
    level: "basic",
    codeExample: `SET GLOBAL replica_parallel_workers = 8;
SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';`
  },
  {
    question: "What is the primary operational takeaway of Topic 8 in Module 004_006?",
    shortAnswer: "Replication lag is the delay in applying transactions on replicas (`Seconds_Behind_Source`); its primary root causes are **single-threaded applier bottlenecks, monolithic batch transactions, missing table indexes under Row-Based logging, asymmetric hardware, and blocking DDL migrations**. Mitigating lag requires enabling Multi-Threaded Parallel Replication (`LOGICAL_CLOCK`), chunking batch writes with `LIMIT`, enforcing identical hardware and buffer pool sizing, executing online DDL via `gh-ost`, and monitoring true lag with `pt-heartbeat`.",
    explanation: "Diagnosing and preventing replication lag is vital for maintaining read-replica consistency and achieving low RTO/RPO high availability SLAs.",
    hint: "Summarize lag calculation, the 5 root causes, MTS parallel replication, batch chunking, index enforcement, and pt-heartbeat monitoring.",
    level: "basic",
    codeExample: `-- Master Lag Prevention Checklist:
# 1. Enable MTS:
SET GLOBAL replica_parallel_workers = 8;
SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';

# 2. Relax Replica fsync:
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL sync_binlog = 0;

# 3. Always chunk batch writes:
DELETE FROM logs WHERE created_at < '2025' LIMIT 2000;`
  }
];

export default questions;
