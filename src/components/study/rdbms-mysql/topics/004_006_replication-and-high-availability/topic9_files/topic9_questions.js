// topic9_files/topic9_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 9: Multi-Threaded Slave (MTS / Parallel Replication) Configuration

const questions = [
  {
    question: "What is Multi-Threaded Slave (MTS / Parallel Replication) in MySQL and what fundamental bottleneck does it resolve?",
    shortAnswer: "MTS enables a MySQL replica to execute multiple independent replication transactions concurrently across a pool of **Worker Threads**, eliminating the legacy single-threaded SQL applier bottleneck and matching the multi-core write throughput of the Primary.",
    explanation: "Allows replicas to keep pace with high-concurrency primary workloads without accumulating replication lag.",
    hint: "Executes replication transactions concurrently across multiple worker threads.",
    level: "basic",
    codeExample: `SET GLOBAL replica_parallel_workers = 8;
SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';`
  },
  {
    question: "What are the two values for `replica_parallel_type` (or `slave_parallel_type`) in MySQL, and which is recommended in MySQL 8.0?",
    shortAnswer: "1. **`DATABASE`** (Legacy MySQL 5.6 per-schema parallelism), and 2. **`LOGICAL_CLOCK`** (Recommended default in MySQL 8.0 group-commit parallelism).",
    explanation: "`DATABASE` mode only parallelizes transactions touching different schemas, making it useless for single-database architectures; `LOGICAL_CLOCK` parallelizes transactions across any tables based on group commit concurrency.",
    hint: "DATABASE (legacy per-schema) and LOGICAL_CLOCK (group-commit / writeset based).",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'replica_parallel_type'; -- Value: LOGICAL_CLOCK`
  },
  {
    question: "How does `LOGICAL_CLOCK` determine that two transactions can be safely executed in parallel on a replica?",
    shortAnswer: "By inspecting the `last_committed` and `sequence_number` tags in the Binary Log event headers; transactions that share the same `last_committed` value executed concurrently on the primary without lock conflicts, proving they can be safely replayed in parallel on the replica.",
    explanation: "Binary Log Group Commit (BLGC) tags concurrent transaction windows directly in binlog headers.",
    hint: "Transactions with identical last_committed values committed in the same window without conflicts.",
    level: "intermediate",
    codeExample: `# mysqlbinlog output:
# # at 450
# #250825 15:30:00 server id 1  end_log_pos 515  GTID last_committed=10 sequence_number=11
# #250825 15:30:00 server id 1  end_log_pos 580  GTID last_committed=10 sequence_number=12`
  },
  {
    question: "What is `binlog_transaction_dependency_tracking = WRITESET` on the Source, and why is it superior to standard `COMMIT_ORDER`?",
    shortAnswer: "Instead of only grouping transactions that committed in the exact same microsecond commit window (`COMMIT_ORDER`), `WRITESET` calculates 64-bit MurmurHash values for every modified row primary key; any transactions that do not touch the same rows can be executed in parallel on replicas, yielding **up to 10x higher replication concurrency**.",
    explanation: "Enables parallel replay even for transactions committed across different points in time if they touch different rows.",
    hint: "Calculates row-level write hashes to allow non-conflicting transactions to execute in parallel.",
    level: "expert",
    codeExample: `[mysqld]
# On Primary:
binlog_transaction_dependency_tracking = WRITESET
binlog_transaction_dependency_history_size = 25000`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS transactions peaked at 4,000 sales/sec during Durga Puja. How did enabling MTS with 8 workers eliminate 15 minutes of replication lag across ₹1.2 Crores in billing?",
    shortAnswer: "Susmita configured `replica_parallel_workers = 8` and `replica_parallel_type = 'LOGICAL_CLOCK'`, allowing the replica to execute up to 8 independent cashier invoices concurrently across 8 CPU cores, keeping lag at 0 seconds during peak rush hours.",
    explanation: "Multiplied replica SQL execution throughput by 8x.",
    hint: "Configured 8 parallel workers with LOGICAL_CLOCK to process concurrent sales invoices.",
    level: "moderate",
    codeExample: `# Barrackpore Peak Concurrency Configuration:
STOP REPLICA;
SET GLOBAL replica_parallel_workers = 8;
SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';
SET GLOBAL replica_preserve_commit_order = ON;
START REPLICA;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, why was enabling `replica_preserve_commit_order = ON` MANDATORY across ₹500 Crores in banking ledgers?",
    shortAnswer: "Without `replica_preserve_commit_order = ON`, parallel worker threads could commit transactions out of order (e.g. Worker 2 commits a debit before Worker 1 commits the preceding credit deposit), causing temporary negative balance reads and sequence gaps in banking ledgers.",
    explanation: "Guarantees that transactions commit on the replica in the exact order they committed on the primary.",
    hint: "Guarantees transactions commit to storage engine in identical primary order, preventing out-of-order gap reads.",
    level: "expert",
    codeExample: `SET GLOBAL replica_preserve_commit_order = ON;`
  },
  {
    question: "What two types of replication threads exist on a Multi-Threaded Slave replica?",
    shortAnswer: "1. The **Coordinator Thread** (reads relay logs, analyzes transaction dependencies, and dispatches events to workers), and 2. Multiple **Worker Threads** (execute transactions concurrently in InnoDB tables).",
    explanation: "The single coordinator handles dispatching; the worker pool executes data mutations.",
    hint: "One Coordinator thread dispatching events to multiple Worker threads.",
    level: "basic",
    codeExample: `SHOW PROCESSLIST;
-- Coordinator: 'Replica has read all relay log; waiting for more updates'
-- Worker 1..8: 'Waiting for an event from Coordinator'`
  },
  {
    question: "What is the recommended sizing rule for `replica_parallel_workers` in production?",
    shortAnswer: "Set to **1x to 2x the number of available CPU cores** on the replica server (typically between `4` and `16` workers).",
    explanation: "Setting it higher than 2x CPU cores (e.g. 64 workers on an 8-core CPU) causes excessive thread context switching and lock contention without additional throughput gains.",
    hint: "1x to 2x CPU cores (typically 4 to 16 workers).",
    level: "basic",
    codeExample: `# For an 8-core CPU server:
replica_parallel_workers = 8`
  },
  {
    question: "How do you inspect the real-time activity and workload distribution of individual MTS worker threads?",
    shortAnswer: "Query `performance_schema.replication_applier_status_by_worker`.",
    explanation: "Displays each worker thread ID, its current executing transaction, and last error number.",
    hint: "Query performance_schema.replication_applier_status_by_worker.",
    level: "intermediate",
    codeExample: `SELECT THREAD_ID, SERVICE_STATE, LAST_SEEN_TRANSACTION, LAST_ERROR_NUMBER 
FROM performance_schema.replication_applier_status_by_worker;`
  },
  {
    question: "What is `binlog_transaction_dependency_history_size` and what is its recommended value in MySQL 8.0?",
    shortAnswer: "The number of row hashes retained in memory on the Primary to track write-set conflicts across recent transactions (default and recommended: `25000`).",
    explanation: "A larger history size allows finding parallel execution candidates across a wider window of recent transactions.",
    hint: "Memory buffer size of row hashes for tracking write-set conflicts (25,000).",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'binlog_transaction_dependency_history_size'; -- 25000`
  },
  {
    question: "What are the 3 possible values for `binlog_transaction_dependency_tracking` on the Source?",
    shortAnswer: "1. `COMMIT_ORDER` (Parallelism based strictly on group commit windows), 2. `WRITESET` (Parallelism based on row-level primary/unique key hashes), and 3. `WRITESET_SESSION` (WRITESET parallelism constrained to not reorder transactions within the same client session).",
    explanation: "`WRITESET` delivers the highest parallel replication throughput.",
    hint: "COMMIT_ORDER, WRITESET, and WRITESET_SESSION.",
    level: "expert",
    codeExample: `SET GLOBAL binlog_transaction_dependency_tracking = 'WRITESET';`
  },
  {
    question: "What prerequisite is MANDATORY on the Source for `binlog_transaction_dependency_tracking = WRITESET` to work?",
    shortAnswer: "**`transaction_write_set_extraction = XXHASH64`** (or `MURMUR32`) and `binlog_format = ROW`.",
    explanation: "The Source must extract cryptographic 64-bit row hashes during transaction preparation to populate the write set.",
    hint: "transaction_write_set_extraction = XXHASH64 and ROW binlog format.",
    level: "expert",
    codeExample: `[mysqld]
# On Primary:
transaction_write_set_extraction = XXHASH64
binlog_transaction_dependency_tracking = WRITESET`
  },
  {
    question: "What is `replica_checkpoint_group` and `replica_checkpoint_period` in MySQL MTS?",
    shortAnswer: "`replica_checkpoint_group` is the maximum number of transactions executed by workers before the coordinator flushes the checkpoint position (default `512`); `replica_checkpoint_period` is the maximum time in milliseconds between checkpoints (default `300ms`).",
    explanation: "Controls how frequently replication metadata tables (`mysql.slave_relay_log_info`) are updated on disk.",
    hint: "Controls frequency and batch size of replica checkpoint flushes to disk.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'replica_checkpoint_%';`
  },
  {
    question: "Can DDL statements (e.g. `ALTER TABLE`) execute in parallel with DML statements in MTS?",
    shortAnswer: "No, because DDL statements acquire exclusive Metadata Locks (`MDL`), the Coordinator thread pauses all worker threads, waits for in-flight transactions to commit, executes the DDL exclusively, and then resumes parallel worker execution.",
    explanation: "DDL statements act as full synchronization barriers in parallel replication.",
    hint: "DDL acts as a barrier: coordinator waits for all workers to finish before executing DDL.",
    level: "intermediate",
    codeExample: `-- DDL creates a parallel execution barrier.`
  },
  {
    question: "What happens if a worker thread encounters a deadlock or lock wait timeout with another worker thread?",
    shortAnswer: "The failing worker thread automatically retries the transaction up to `replica_transaction_retries` times (default 10) before reporting an error and halting replication.",
    explanation: "Automatic retries resolve transient row-lock contention between parallel workers.",
    hint: "Worker automatically retries up to replica_transaction_retries times.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'replica_transaction_retries'; -- Default: 10`
  },
  {
    question: "What happens if you set `replica_parallel_workers = 0` on a replica?",
    shortAnswer: "Parallel replication is completely disabled; the replica operates in legacy single-threaded mode with only 1 SQL applier thread executing all transactions sequentially.",
    explanation: "`0` reverts to legacy single-threaded execution.",
    hint: "Setting workers to 0 disables parallel execution (single-threaded mode).",
    level: "basic",
    codeExample: `SET GLOBAL replica_parallel_workers = 0; -- Disables MTS`
  },
  {
    question: "Why does `replica_parallel_type = 'DATABASE'` fail to eliminate replication lag in modern microservices or single-schema databases?",
    shortAnswer: "Because all tables reside in a single database schema (e.g. `kolkata_bank`); under `DATABASE` mode, all transactions target the same schema name, so the coordinator assigns ALL transactions to Worker 1, effectively reducing parallelism to a single thread.",
    explanation: "Always use `LOGICAL_CLOCK` instead of `DATABASE`.",
    hint: "All queries target the same database schema, forcing all work onto a single worker thread.",
    level: "intermediate",
    codeExample: `-- Single database = 0 parallelism under DATABASE mode!`
  },
  {
    question: "How do you verify whether MTS is actively distributing transactions across workers rather than overloading a single worker?",
    shortAnswer: "Query `performance_schema.events_transactions_summary_by_thread_by_event_name` to inspect `COUNT_STAR` (transaction count) per worker thread ID.",
    explanation: "A balanced count confirms even parallel workload distribution across all worker threads.",
    hint: "Inspect transaction counts per thread in performance_schema transaction summary tables.",
    level: "expert",
    codeExample: `SELECT THREAD_ID, COUNT_STAR 
FROM performance_schema.events_transactions_summary_by_thread_by_event_name 
WHERE THREAD_ID IN (SELECT THREAD_ID FROM performance_schema.replication_applier_status_by_worker);`
  },
  {
    question: "What is the memory footprint of enabling 16 parallel workers in MySQL 8.0?",
    shortAnswer: "Negligible (typically **20MB to 50MB of RAM total**), consisting of thread stack allocations and small in-memory event queues managed by the coordinator.",
    explanation: "MTS is extremely lightweight and should be enabled on all modern multi-core replica servers.",
    hint: "Very low memory overhead (20MB to 50MB total).",
    level: "basic",
    codeExample: `-- 16 workers require ~30MB RAM overhead.`
  },
  {
    question: "Can Multi-Threaded Slave parallel replication be enabled dynamically without restarting the MySQL server?",
    shortAnswer: "Yes, by executing `STOP REPLICA;`, modifying global variables (`SET GLOBAL replica_parallel_workers = 8; SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';`), and executing `START REPLICA;`.",
    explanation: "Takes under 2 seconds to apply online in production.",
    hint: "Stop replica, set global variables, and restart replica.",
    level: "basic",
    codeExample: `STOP REPLICA;
SET GLOBAL replica_parallel_workers = 8;
SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';
SET GLOBAL replica_preserve_commit_order = ON;
START REPLICA;`
  },
  {
    question: "What is `binlog_group_commit_sync_delay` and `binlog_group_commit_sync_no_delay_count` on the Source?",
    shortAnswer: "Tuning parameters on the Primary that artificially delay binlog `fsync()` by micro-seconds to allow more concurrent transactions to join the same group commit window, maximizing `LOGICAL_CLOCK` parallelism for downstream replicas.",
    explanation: "Trades a fraction of a millisecond in primary latency for massive replica parallelism gains.",
    hint: "Delays primary fsync by microseconds to coalesce larger group commit batches for replicas.",
    level: "expert",
    codeExample: `SET GLOBAL binlog_group_commit_sync_delay = 1000; -- 1 millisecond delay
SET GLOBAL binlog_group_commit_sync_no_delay_count = 10;`
  },
  {
    question: "What error occurs if a worker thread fails an integrity constraint (e.g. `ERROR 1062 Duplicate entry`)?",
    shortAnswer: "The failing worker reports the error, the Coordinator halts all other workers, and `SHOW REPLICA STATUS` shows `Replica_SQL_Running: No` with `Last_SQL_Error` detailing the exact table and failing constraint.",
    explanation: "A single worker failure safely halts the entire applier to preserve database integrity.",
    hint: "Coordinator halts all workers and reports the error in Last_SQL_Error.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G -- Last_SQL_Errno: 1062`
  },
  {
    question: "Why does `replica_preserve_commit_order = ON` require `log_bin` and `log_replica_updates` enabled in some MySQL versions?",
    shortAnswer: "Because commit order preservation tracks the sequence of binary log positions and GTIDs to enforce deterministic serialization across storage engines.",
    explanation: "Standard enterprise configuration always enables binary logging on replicas.",
    hint: "Tracks binary log positions and GTIDs to enforce deterministic serialization.",
    level: "intermediate",
    codeExample: `[mysqld]
log_bin = mysql-bin
log_replica_updates = ON`
  },
  {
    question: "How does MTS interact with Multi-Source replication (`FOR CHANNEL`)?",
    shortAnswer: "Each configured replication channel runs its own independent Coordinator thread and allocates from the parallel worker pool, enabling simultaneous parallel execution across multiple distinct source streams.",
    explanation: "Multiplies data ingestion throughput across multi-tenant warehouses.",
    hint: "Each channel runs its own coordinator and leverages parallel workers.",
    level: "expert",
    codeExample: `-- Channel A (8 workers) + Channel B (8 workers) process concurrently.`
  },
  {
    question: "What is `slave_pending_jobs_size_max` (or `replica_pending_jobs_size_max`) in MySQL?",
    shortAnswer: "The maximum total memory (in bytes) that un-applied transactions queued in worker queues can consume (default `128MB` or `1GB` in MySQL 8.0); if exceeded, the Coordinator pauses reading from relay logs until workers catch up.",
    explanation: "Protects the replica from running out of RAM during massive write bursts.",
    hint: "Memory limit for queued events waiting for worker execution to prevent OOM crashes.",
    level: "expert",
    codeExample: `SET GLOBAL replica_pending_jobs_size_max = 1073741824; -- 1GB Limit`
  },
  {
    question: "How do you permanently configure MTS in `/etc/mysql/my.cnf`?",
    shortAnswer: "Add `replica_parallel_workers = 8`, `replica_parallel_type = LOGICAL_CLOCK`, and `replica_preserve_commit_order = ON` under `[mysqld]`.",
    explanation: "Ensures parallel replication initializes automatically on every server boot.",
    hint: "Add replica_parallel_workers, replica_parallel_type, and replica_preserve_commit_order in my.cnf.",
    level: "basic",
    codeExample: `[mysqld]
replica_parallel_workers = 8
replica_parallel_type = LOGICAL_CLOCK
replica_preserve_commit_order = ON`
  },
  {
    question: "What is the difference between Parallel Replication in MySQL vs PostgreSQL?",
    shortAnswer: "MySQL parallel replication uses group commit and write-set row hashes (`LOGICAL_CLOCK` / `WRITESET`) to execute independent transactions concurrently; PostgreSQL standard streaming replication applies WAL records sequentially on a single startup process (logical replication supports multiple subscription workers).",
    explanation: "MySQL's WRITESET engine is among the most advanced parallel replication implementations in open-source RDBMS.",
    hint: "MySQL uses group-commit and WRITESET row hashes; PostgreSQL physical replication uses a single startup process.",
    level: "intermediate",
    codeExample: `-- MySQL WRITESET parallel engine vs single WAL replay.`
  },
  {
    question: "What is the recommended health check query to ensure all MTS worker threads are active?",
    shortAnswer: "`SELECT COUNT(*) FROM performance_schema.replication_applier_status_by_worker WHERE SERVICE_STATE = 'ON';` (should match `replica_parallel_workers`).",
    explanation: "Confirms that all configured worker threads are active and running.",
    hint: "Check that COUNT(*) of active workers in performance_schema matches replica_parallel_workers.",
    level: "basic",
    codeExample: `SELECT COUNT(*) FROM performance_schema.replication_applier_status_by_worker 
WHERE SERVICE_STATE = 'ON';`
  },
  {
    question: "Can a transaction containing 10,000 row modifications be split across multiple workers?",
    shortAnswer: "No, an individual transaction is **atomic** and is assigned to **exactly one worker thread**; MTS parallelizes *across different transactions*, not within a single transaction.",
    explanation: "Preserves ACID atomicity for every transaction.",
    hint: "Transactions are atomic; parallelism occurs across different transactions, not within one.",
    level: "basic",
    codeExample: `-- 1 transaction = 1 worker. 100 transactions = distributed across 8 workers.`
  },
  {
    question: "What is the primary operational takeaway of Topic 9 in Module 004_006?",
    shortAnswer: "Multi-Threaded Slave (MTS) parallel replication is the definitive cure for MySQL replication lag: by configuring **`replica_parallel_type = 'LOGICAL_CLOCK'`** and **`binlog_transaction_dependency_tracking = WRITESET`**, replicas extract row-level write hashes to replay non-conflicting transactions concurrently across 4–16 CPU cores, while **`replica_preserve_commit_order = ON`** guarantees strict transactional commit consistency.",
    explanation: "Deploying MTS with LOGICAL_CLOCK and WRITESET unlocks multi-core replay performance, keeping read replicas 100% in sync even during high-throughput transaction bursts.",
    hint: "Summarize LOGICAL_CLOCK, WRITESET dependency tracking, worker sizing (4-16), and replica_preserve_commit_order = ON.",
    level: "basic",
    codeExample: `-- Master MTS Parallel Replication Blueprint:
# 1. On Primary (Source):
[mysqld]
transaction_write_set_extraction = XXHASH64
binlog_transaction_dependency_tracking = WRITESET
binlog_transaction_dependency_history_size = 25000

# 2. On Replica (Standby):
[mysqld]
replica_parallel_workers = 8
replica_parallel_type = LOGICAL_CLOCK
replica_preserve_commit_order = ON`
  }
];

export default questions;
