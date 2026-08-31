// topic2_files/topic2_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 2: Asynchronous Replication vs Semi-Synchronous Replication (Lossless Semi-Sync)

const questions = [
  {
    question: "What is the primary difference between Asynchronous Replication and Semi-Synchronous Replication in MySQL?",
    shortAnswer: "In **Asynchronous Replication**, the Source commits locally and immediately returns success to the client without waiting for replicas; in **Semi-Synchronous Replication**, the Source pauses the client's `COMMIT` until at least one replica acknowledges receiving the transaction into its local Relay Log.",
    explanation: "Asynchronous replication risks data loss (RPO > 0) if the Source crashes before binlogs are transmitted; Semi-Synchronous replication guarantees RPO = 0.",
    hint: "Async does not wait for replica acknowledgment; Semi-sync waits for >= 1 replica to receive the transaction.",
    level: "basic",
    codeExample: `# Asynchronous: Commit → Return → Stream in background
# Semi-Synchronous: Write Binlog → Stream → Wait for Replica ACK → Commit → Return`
  },
  {
    question: "What are the two wait-point modes for Semi-Synchronous Replication in MySQL, and which is the default in MySQL 8.0?",
    shortAnswer: "1. **`AFTER_SYNC`** (Lossless Semi-Sync - **Default in MySQL 8.0**), and 2. **`AFTER_COMMIT`** (Legacy Semi-Sync).",
    explanation: "`AFTER_SYNC` waits for replica acknowledgment *before* committing the transaction to the InnoDB engine, eliminating phantom reads.",
    hint: "AFTER_SYNC (Lossless default) and AFTER_COMMIT (legacy).",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'rpl_semi_sync_master_wait_point'; -- Value: AFTER_SYNC`
  },
  {
    question: "What is the critical architectural flaw of legacy `AFTER_COMMIT` semi-synchronous replication?",
    shortAnswer: "In `AFTER_COMMIT`, the transaction is committed in the Source's storage engine *before* waiting for the replica ACK; if the Source crashes while waiting, other concurrent sessions have already seen data that was never replicated, causing **Phantom Reads** and data loss upon failover.",
    explanation: "`AFTER_SYNC` solves this by withholding local InnoDB commit until the replica confirms receipt.",
    hint: "Committing locally before ACK allows concurrent clients to read un-replicated data that vanishes on failover.",
    level: "intermediate",
    codeExample: `-- AFTER_COMMIT Flaw:
-- Thread 1: Inserts & Commits locally → Thread 2 reads new balance → Source crashes → Standby promoted WITHOUT transaction!`
  },
  {
    question: "How does `AFTER_SYNC` (Lossless Semi-Sync) guarantee zero data loss (RPO = 0)?",
    shortAnswer: "Because the Source flushes the transaction to its binary log, sends it to the replica, and pauses until the replica writes it to its Relay Log *before* the transaction is committed in InnoDB or returned to the client.",
    explanation: "If the Source crashes during the wait, the transaction is already safe in the replica's relay log for failover.",
    hint: "Transaction is guaranteed to reside in the replica's relay log before the client receives success.",
    level: "intermediate",
    codeExample: `# Transaction Flow:
# 1. InnoDB Prepare → 2. Binlog Flush → 3. Send to Replica → 4. Replica Writes Relay Log & ACKs → 5. InnoDB Commit → 6. Client OK`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS billing server crashed during a lightning surge. How did Lossless Semi-Sync prevent losing ₹45,000 in customer invoice data?",
    shortAnswer: "Because `rpl_semi_sync_master_wait_point = 'AFTER_SYNC'` was enabled, the last batch of 12 invoice transactions had been acknowledged and saved into the standby replica's relay log before the crash, ensuring zero lost sales across ₹1.2 Crores in inventory.",
    explanation: "Promoting the standby replica restored all ₹45,000 in invoices with exact transactional consistency.",
    hint: "Invoices were safely buffered in the standby relay log before the crash occurred.",
    level: "moderate",
    codeExample: `# Barrackpore Semi-Sync Verification:
SHOW STATUS LIKE 'Rpl_semi_sync_master_yes_tx';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did configuring `rpl_semi_sync_master_wait_for_num_slaves = 2` protect ₹500 Crores in daily banking ledgers against dual-node failures?",
    shortAnswer: "It required transactions to be acknowledged by **two independent standby replicas** before committing on the primary, ensuring data survived even if the primary and one replica simultaneously suffered power loss.",
    explanation: "Guarantees multi-replica redundancy for tier-1 financial regulatory compliance.",
    hint: "Requires 2 replicas to acknowledge receipt before commit completes on Source.",
    level: "expert",
    codeExample: `SET GLOBAL rpl_semi_sync_master_wait_for_num_slaves = 2;`
  },
  {
    question: "What happens if a semi-synchronous replica fails or the network connection drops?",
    shortAnswer: "The Source pauses write commits for up to `rpl_semi_sync_master_timeout` milliseconds (e.g. 10,000ms); if no ACK is received, the Source automatically **falls back to Asynchronous mode** to prevent freezing write transactions permanently.",
    explanation: "Ensures database availability is preserved if all replicas go offline.",
    hint: "Waits up to timeout, then automatically degrades to Asynchronous replication.",
    level: "intermediate",
    codeExample: `SET GLOBAL rpl_semi_sync_master_timeout = 10000; -- 10 Seconds Timeout`
  },
  {
    question: "What happens when a disconnected semi-synchronous replica reconnects and catches up with the Source?",
    shortAnswer: "The Source automatically **re-enables Semi-Synchronous replication** mode without requiring any manual DBA commands or server restarts.",
    explanation: "MySQL dynamically toggles semi-sync status based on live replica acknowledgments.",
    hint: "Source automatically restores semi-synchronous mode once the replica reconnects.",
    level: "basic",
    codeExample: `-- Automatic recovery: Rpl_semi_sync_master_status transitions back to ON.`
  },
  {
    question: "What plugin library file must be loaded on the Source server to enable Semi-Synchronous replication in MySQL 8.0?",
    shortAnswer: "`semisync_master.so` (or `semisync_source.so` / `semisync_master.dll` on Windows).",
    explanation: "Installed via `INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';`.",
    hint: "semisync_master.so (or semisync_source.so).",
    level: "basic",
    codeExample: `INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';`
  },
  {
    question: "What plugin library file must be loaded on the Replica server to enable Semi-Synchronous replication?",
    shortAnswer: "`semisync_slave.so` (or `semisync_replica.so` / `semisync_slave.dll` on Windows).",
    explanation: "Installed via `INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';`.",
    hint: "semisync_slave.so (or semisync_replica.so).",
    level: "basic",
    codeExample: `INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';`
  },
  {
    question: "What does `Rpl_semi_sync_master_status` indicate in `SHOW GLOBAL STATUS` on the Source?",
    shortAnswer: "A binary flag (`ON` / `OFF` or `1` / `0`) indicating whether the Source is currently operating in semi-synchronous mode or has degraded to asynchronous mode due to timeout.",
    explanation: "The primary health metric for monitoring semi-sync replication status.",
    hint: "Indicates whether semi-sync replication is currently active (ON) or degraded to async (OFF).",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Rpl_semi_sync_master_status'; -- Value: ON`
  },
  {
    question: "What is `Rpl_semi_sync_master_yes_tx` vs `Rpl_semi_sync_master_no_tx` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "`yes_tx` counts the number of write transactions successfully acknowledged by a semi-sync replica; `no_tx` counts transactions committed in asynchronous fallback mode after timeout.",
    explanation: "A rising `no_tx` counter indicates network issues or offline replicas.",
    hint: "yes_tx is acknowledged transactions; no_tx is unacknowledged async fallback transactions.",
    level: "intermediate",
    codeExample: `SELECT VARIABLE_NAME, VARIABLE_VALUE 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Rpl_semi_sync_master_yes_tx', 'Rpl_semi_sync_master_no_tx');`
  },
  {
    question: "What is `Rpl_semi_sync_master_clients` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The total number of currently connected replicas that have semi-synchronous replication enabled and are sending acknowledgments to the Source.",
    explanation: "Verifies how many active semi-sync replicas are currently paired with the Source.",
    hint: "Count of connected replicas sending semi-sync acknowledgments.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Rpl_semi_sync_master_clients'; -- Value: 1 or 2`
  },
  {
    question: "What client latency overhead is introduced by Semi-Synchronous replication?",
    shortAnswer: "The network Round-Trip Time (RTT) between the Source and the acknowledging replica (typically **0.5ms to 1.5ms in a LAN / same datacenter**; 20ms to 50ms across WAN/regions).",
    explanation: "Semi-sync should ideally be configured between servers located in the same low-latency datacenter or cloud Availability Zone.",
    hint: "Adds network Round-Trip Time (RTT) per write transaction commit (~1ms in LAN).",
    level: "intermediate",
    codeExample: `-- LAN latency impact: ~1ms per commit. Read queries experience 0ms latency.`
  },
  {
    question: "Does Semi-Synchronous replication add any latency to read-only `SELECT` queries?",
    shortAnswer: "No, read-only `SELECT` queries do not write to the binary log and commit without waiting for replica acknowledgments, experiencing **0ms latency overhead**.",
    explanation: "Only write transactions (`INSERT`, `UPDATE`, `DELETE`, `DDL`) require replica acknowledgment.",
    hint: "No latency added to SELECT queries; only write transactions wait.",
    level: "basic",
    codeExample: `-- SELECT queries execute with 0ms replication overhead.`
  },
  {
    question: "What is the recommended value for `rpl_semi_sync_master_timeout` in an enterprise production cluster?",
    shortAnswer: "Between **5,000ms (5s) and 10,000ms (10s)**.",
    explanation: "Setting it too low (e.g. 100ms) causes frequent false fallback to asynchronous mode during minor network jitter; setting it too high (e.g. 60s) freezes client writes for too long during an outage.",
    hint: "5,000ms to 10,000ms (5 to 10 seconds).",
    level: "intermediate",
    codeExample: `SET GLOBAL rpl_semi_sync_master_timeout = 10000;`
  },
  {
    question: "How do you enable semi-synchronous replication dynamically without restarting the MySQL server?",
    shortAnswer: "Install the plugins and set `rpl_semi_sync_master_enabled = 1` on Source, set `rpl_semi_sync_slave_enabled = 1` on Replica, and restart the replica I/O thread (`STOP REPLICA IO_THREAD; START REPLICA IO_THREAD;`).",
    explanation: "Restarting the I/O thread forces the connection handshake to negotiate semi-sync capabilities.",
    hint: "Enable variables dynamically and restart the replica I/O thread.",
    level: "basic",
    codeExample: `# On Replica:
SET GLOBAL rpl_semi_sync_slave_enabled = 1;
STOP REPLICA IO_THREAD;
START REPLICA IO_THREAD;`
  },
  {
    question: "What is `Rpl_semi_sync_master_wait_sessions` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The number of client sessions currently paused and waiting for replica acknowledgments at that exact instant.",
    explanation: "A high number indicates the replica or network is bottlenecking transaction commits.",
    hint: "Count of client sessions currently blocked waiting for replica ACK.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Rpl_semi_sync_master_wait_sessions';`
  },
  {
    question: "What is `Rpl_semi_sync_master_time_avg` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The average time in microseconds spent waiting for replica acknowledgments per transaction.",
    explanation: "Measures the network latency and replica relay log write performance.",
    hint: "Average time in microseconds spent waiting for replica ACK.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Rpl_semi_sync_master_time_avg';`
  },
  {
    question: "Why should `rpl_semi_sync_master_wait_point` NEVER be set to `AFTER_COMMIT` in modern MySQL environments?",
    shortAnswer: "Because `AFTER_COMMIT` suffers from the phantom read anomaly where uncommitted data is visible to other sessions before replica acknowledgment, violating strict ACID transactional durability.",
    explanation: "`AFTER_SYNC` is strictly superior in data consistency guarantees with identical latency performance.",
    hint: "AFTER_COMMIT causes phantom reads on primary crash; always use AFTER_SYNC.",
    level: "intermediate",
    codeExample: `-- Always enforce AFTER_SYNC:
SET GLOBAL rpl_semi_sync_master_wait_point = 'AFTER_SYNC';`
  },
  {
    question: "What happens if a client executes `ROLLBACK` on a transaction under semi-synchronous replication?",
    shortAnswer: "Rolled-back transactions do not write changes to the Binary Log, so no events are sent to the replica and no semi-synchronous acknowledgment wait occurs.",
    explanation: "Only committed transactions generate binary log events and trigger semi-sync waits.",
    hint: "Rollbacks do not write to binlog and do not trigger semi-sync waits.",
    level: "basic",
    codeExample: `-- ROLLBACK returns immediately with 0ms replication wait.`
  },
  {
    question: "Can an asynchronous read replica and a semi-synchronous standby replica connect to the same Source simultaneously?",
    shortAnswer: "Yes, MySQL supports mixed topologies where the Source replicates to 1 semi-sync standby for HA failover and 5 async read replicas for query offloading.",
    explanation: "The Source only waits for the semi-sync replica to acknowledge before committing.",
    hint: "Yes, MySQL supports mixing semi-sync and async replicas on the same Source.",
    level: "basic",
    codeExample: `# Mixed Topology:
# Source → Replica 1 (Semi-Sync Standby for HA)
#        → Replica 2 (Async Read Replica)
#        → Replica 3 (Async Read Replica)`
  },
  {
    question: "What is the role of `rpl_semi_sync_master_wait_no_slave` in MySQL?",
    shortAnswer: "When set to `ON` (default), the Source will wait for timeout even if zero semi-sync replicas are currently connected; when `OFF`, the Source degrades to async immediately if no replicas are registered.",
    explanation: "Controls fallback behavior when all replicas disconnect.",
    hint: "Controls whether Source waits for timeout when zero replicas are connected.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'rpl_semi_sync_master_wait_no_slave';`
  },
  {
    question: "How do you permanently configure semi-synchronous replication in `my.cnf` so it survives server reboots?",
    shortAnswer: "Add `plugin-load = 'rpl_semi_sync_master=semisync_master.so;rpl_semi_sync_slave=semisync_slave.so'` and set `rpl_semi_sync_master_enabled = 1` and `rpl_semi_sync_master_wait_point = AFTER_SYNC` under `[mysqld]`.",
    explanation: "Ensures the plugins load automatically during server initialization.",
    hint: "Configure plugin-load and enabled flags in my.cnf under [mysqld].",
    level: "intermediate",
    codeExample: `[mysqld]
plugin-load-add = semisync_master.so
plugin-load-add = semisync_slave.so
rpl_semi_sync_master_enabled = 1
rpl_semi_sync_master_timeout = 10000
rpl_semi_sync_master_wait_point = AFTER_SYNC
rpl_semi_sync_slave_enabled = 1`
  },
  {
    question: "What is the difference between MySQL Semi-Synchronous Replication and MySQL Group Replication?",
    shortAnswer: "Semi-Sync is a primary-standby topology where the Source waits for 1 replica ACK into relay log; Group Replication is a fully distributed Paxos-based consensus cluster where a majority quorum must agree on transaction global certification before commit.",
    explanation: "Group Replication provides automated conflict detection and built-in cluster membership.",
    hint: "Semi-sync is primary-replica ACK; Group Replication is Paxos-based majority consensus.",
    level: "intermediate",
    codeExample: `-- Semi-Sync: 1 ACK required
-- Group Replication: Paxos majority consensus (e.g. 2 of 3 nodes)`
  },
  {
    question: "What is `Rpl_semi_sync_slave_status` in `SHOW GLOBAL STATUS` on the replica?",
    shortAnswer: "A binary flag (`ON` / `OFF`) indicating whether the replica is actively functioning as a semi-synchronous replica and sending acknowledgments back to the Source.",
    explanation: "Verifies that the replica has registered as a semi-sync receiver.",
    hint: "Indicates whether the replica is actively sending semi-sync acknowledgments.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Rpl_semi_sync_slave_status'; -- Value: ON`
  },
  {
    question: "How does Semi-Synchronous replication behave during bulk data imports (e.g. `LOAD DATA INFILE`)?",
    shortAnswer: "Because `LOAD DATA INFILE` executes as a single large transaction, the Source sends the entire bulk binlog event to the replica upon completion and waits for 1 ACK, adding only one network round-trip overhead for the entire bulk batch.",
    explanation: "Large transactions amortize the network RTT across millions of rows.",
    hint: "Adds only 1 network RTT for the entire batch upon transaction commit.",
    level: "intermediate",
    codeExample: `-- Bulk import generates 1 semi-sync ACK wait at COMMIT.`
  },
  {
    question: "What is the recommended monitoring alert for Semi-Synchronous replication in Prometheus?",
    shortAnswer: "Trigger a critical alert when `mysql_global_status_rpl_semi_sync_master_status == 0` while the master should be in semi-sync mode, and alert if `rate(mysql_global_status_rpl_semi_sync_master_no_tx[1m]) > 0`.",
    explanation: "Alerts the on-call team immediately when the cluster loses its RPO = 0 guarantee.",
    hint: "Alert on master status == 0 or no_tx counter incrementing.",
    level: "basic",
    codeExample: `alert: MySQLSemiSyncDegradedToAsync
expr: mysql_global_status_rpl_semi_sync_master_status == 0
for: 1m
labels:
  severity: critical`
  },
  {
    question: "Why does Semi-Synchronous replication NOT guarantee that the replica's database tables are immediately updated when the client receives `COMMIT`?",
    shortAnswer: "Because Semi-Sync only waits for the replica's **I/O thread** to write events to the **Relay Log**; the replica's **SQL thread** may still take a few milliseconds or seconds to apply the transaction to InnoDB tables.",
    explanation: "The data is durable on disk in the relay log (RPO = 0), but reading immediately from the replica may still experience brief replication lag.",
    hint: "ACK guarantees data is in the replica's Relay Log, not necessarily applied in InnoDB yet.",
    level: "expert",
    codeExample: `-- Data is durable in Relay Log (RPO = 0), but SQL thread applier may have minor lag.`
  },
  {
    question: "What is the primary operational takeaway of Topic 2 in Module 004_006?",
    shortAnswer: "Lossless Semi-Synchronous Replication (`rpl_semi_sync_master_wait_point = AFTER_SYNC`) bridges the gap between performance and durability: it guarantees **RPO = 0** by ensuring transactions reside in the standby replica's relay log before client commits complete, adds negligible sub-millisecond LAN latency, eliminates phantom reads on Source crashes, and automatically falls back to Asynchronous mode upon timeout to preserve database availability.",
    explanation: "Enabling Lossless Semi-Sync is the single most effective way to eliminate data loss on MySQL primary-replica topologies.",
    hint: "Summarize AFTER_SYNC for RPO = 0, zero phantom reads, sub-ms LAN latency, and automated async fallback on timeout.",
    level: "basic",
    codeExample: `-- Master Lossless Semi-Sync Recipe:
# 1. Source:
INSTALL PLUGIN rpl_semi_sync_master SONAME 'semisync_master.so';
SET GLOBAL rpl_semi_sync_master_enabled = 1;
SET GLOBAL rpl_semi_sync_master_wait_point = 'AFTER_SYNC';
SET GLOBAL rpl_semi_sync_master_timeout = 10000;

# 2. Replica:
INSTALL PLUGIN rpl_semi_sync_slave SONAME 'semisync_slave.so';
SET GLOBAL rpl_semi_sync_slave_enabled = 1;
STOP REPLICA IO_THREAD; START REPLICA IO_THREAD;`
  }
];

export default questions;
