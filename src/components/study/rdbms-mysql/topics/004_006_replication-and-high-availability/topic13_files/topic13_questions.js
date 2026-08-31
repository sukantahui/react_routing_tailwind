// topic13_files/topic13_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 13: Automated Failover Strategies, Split-Brain Prevention, and Disaster Recovery Runbooks

const questions = [
  {
    question: "What is the difference between High Availability (HA) and Disaster Recovery (DR) in enterprise database engineering?",
    shortAnswer: "**High Availability (HA)** protects against local hardware or network failures within a single datacenter/region, delivering automated instant failover with **RTO &lt; 5s and RPO = 0**; **Disaster Recovery (DR)** protects against catastrophic multi-datacenter or geographic regional blackouts (e.g. Kolkata to Mumbai), delivering cross-region failover with **RTO &lt; 15m and RPO &lt; 5s**.",
    explanation: "HA provides real-time local redundancy; DR provides geographic resilience against regional disasters.",
    hint: "HA is local datacenter instant failover (RPO=0); DR is cross-region geographic disaster protection.",
    level: "basic",
    codeExample: `# HA: Local 3-Node InnoDB Cluster (RPO = 0, RTO < 5s)
# DR: Cross-Region InnoDB ClusterSet to Mumbai (RPO < 5s, RTO < 15m)`
  },
  {
    question: "What is 'Split-Brain' in a database cluster and what catastrophic data corruption does it cause?",
    shortAnswer: "Split-Brain occurs when a network partition isolates cluster nodes into two segments, causing **both segments to believe they are the active Primary and accept concurrent write transactions from clients**; this creates irreconcilable divergent data histories that cannot be automatically merged, resulting in catastrophic ledger corruption.",
    explanation: "The most dangerous failure mode in distributed database systems.",
    hint: "Two nodes simultaneously accepting writes due to a network partition, corrupting data integrity.",
    level: "basic",
    codeExample: `-- Catastrophic Split-Brain:
-- Node A writes: UPDATE accounts SET balance = 100 WHERE id = 1;
-- Node B writes: UPDATE accounts SET balance = 500 WHERE id = 1;`
  },
  {
    question: "How does Paxos majority quorum mathematically prevent Split-Brain in MySQL Group Replication and InnoDB Cluster?",
    shortAnswer: "Because a cluster requires a strict majority quorum (**&gt;50% of total nodes**) to certify and commit any write transaction; in an odd-numbered cluster (e.g. 3 nodes), a network partition creates a 2-node majority (which continues writing) and a 1-node minority (which fails quorum and **automatically locks into read-only mode**), making concurrent dual-master writes mathematically impossible.",
    explanation: "A minority partition cannot reach >50% consensus and blocks all write operations.",
    hint: "Strict majority (>50%) quorum ensures only the majority partition can write; minority locks in read-only.",
    level: "intermediate",
    codeExample: `# 3-Node Partition:
# Majority (2 Nodes > 50%) → Accepts Writes
# Minority (1 Node < 50%)  → Locked in super_read_only = ON`
  },
  {
    question: "What is 'STONITH' (Shoot The Other Node In The Head) and how is it used in enterprise database fencing?",
    shortAnswer: "STONITH is a hardware-level fencing technique where an automated clustering orchestrator uses Intelligent Platform Management Interface (IPMI) or networked Power Distribution Units (PDU) to **physically cut power to a unresponsive primary server**, guaranteeing it cannot wake up and write rogue data after a new primary has been promoted.",
    explanation: "Guarantees that a failed node is truly dead before promoting a replacement.",
    hint: "Hard power cutoff to an unresponsive node via IPMI/PDU to prevent rogue dual-master writes.",
    level: "expert",
    codeExample: `# IPMI Power Fencing:
ipmitool -H 192.168.1.100 -U admin -P Pass chassis power off`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail business, a catastrophic hardware power failure took down the Primary server across ₹1.2 Crores in store billing. How did Susmita execute the 6-step DR runbook to restore full operations in 90 seconds?",
    shortAnswer: "1. Confirmed Primary was down; 2. Checked `Executed_Gtid_Set` on remaining replicas; 3. Promoted the most advanced replica (Node 2) by disabling `super_read_only`; 4. Repointed Node 3 to Node 2 via GTID auto-positioning; 5. Swapped ProxySQL writer hostgroup to Node 2; 6. POS cashiers resumed billing with zero data loss.",
    explanation: "Demonstrated systematic manual and semi-automated disaster recovery execution.",
    hint: "Elected most advanced GTID node, disabled super_read_only, repointed replicas, and swapped ProxySQL hostgroup.",
    level: "moderate",
    codeExample: `# Barrackpore Emergency Failover Runbook:
-- On Standby Node 2:
STOP REPLICA;
SET GLOBAL super_read_only = OFF;
SET GLOBAL read_only = OFF;

-- On Standby Node 3:
STOP REPLICA;
CHANGE REPLICATION SOURCE TO SOURCE_HOST = '192.168.1.20', SOURCE_AUTO_POSITION = 1;
START REPLICA;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did deploying GitHub Orchestrator automate failover and VIP reassignment for ₹500 Crores in banking records without manual human intervention?",
    shortAnswer: "GitHub Orchestrator continuously monitored the replication topology; when the Kolkata Primary crashed, Orchestrator detected the dead master in 3 seconds, elected the most advanced standby replica, re-aligned downstream replicas via GTID, executed a post-failover hook script to shift the Keepalived Virtual IP (VIP) to the new primary, and notified on-call DBAs via PagerDuty.",
    explanation: "Achieved automated sub-10-second failover for asynchronous/semi-sync clusters.",
    hint: "Orchestrator detected dead master, elected advanced standby, shifted Virtual IP, and re-aligned replicas.",
    level: "expert",
    codeExample: `# Orchestrator automated recovery hook in orchestrator.conf.json:
"PostMasterFailoverProcesses": [
  "/usr/local/bin/failover-shift-vip.sh {failureCluster} {successorHost}"
]`
  },
  {
    question: "What is Recovery Point Objective (RPO) and Recovery Time Objective (RTO)?",
    shortAnswer: "**RPO** is the maximum acceptable amount of data loss measured in time (e.g. RPO = 0 means zero lost transactions); **RTO** is the maximum acceptable duration of database downtime before operations are restored (e.g. RTO &lt; 5 seconds).",
    explanation: "The two foundational Service Level Agreement (SLA) metrics for business continuity.",
    hint: "RPO measures data loss; RTO measures downtime duration.",
    level: "basic",
    codeExample: `# Target SLAs:
# High Availability: RPO = 0, RTO < 5s
# Disaster Recovery: RPO < 5s, RTO < 15m`
  },
  {
    question: "Why is GTID Auto-Positioning (`SOURCE_AUTO_POSITION = 1`) essential for disaster recovery and failover?",
    shortAnswer: "Because it completely eliminates manual binary log filename and byte coordinate calculations; when promoting a new primary, all other replicas simply point to the new host (`CHANGE REPLICATION SOURCE TO SOURCE_HOST = 'new_ip', SOURCE_AUTO_POSITION = 1;`), and MySQL automatically negotiates and exchanges missing GTID ranges seamlessly.",
    explanation: "Enables instant, error-free topology refactoring across dozens of replicas.",
    hint: "Allows replicas to automatically negotiate missing transactions with the new primary without coordinate math.",
    level: "basic",
    codeExample: `CHANGE REPLICATION SOURCE TO SOURCE_HOST = '192.168.1.20', SOURCE_AUTO_POSITION = 1;
START REPLICA;`
  },
  {
    question: "What is a Virtual IP (VIP) and Gratuitous ARP in database failover architectures?",
    shortAnswer: "A Virtual IP is a single floating IP address (e.g. `192.168.1.100`) assigned to the active Primary; during failover, Keepalived shifts the VIP to the newly promoted primary and broadcasts **Gratuitous ARP** packets to update network switches immediately, allowing applications to connect to the new primary without DNS cache delays.",
    explanation: "Enables sub-second network IP redirection across local subnets.",
    hint: "Floating IP shifted to new primary; Gratuitous ARP updates switch MAC tables instantly.",
    level: "intermediate",
    codeExample: `# Keepalived Virtual IP (VIP) configuration:
vrrp_instance VI_MYSQL {
  state MASTER
  interface eth0
  virtual_router_id 51
  virtual_ipaddress { 192.168.1.100/24 }
}`
  },
  {
    question: "Why can relying strictly on DNS CNAME records for database failover cause prolonged application downtime?",
    shortAnswer: "Because client operating systems, JVMs, Node.js connection pools, and intermediate DNS resolvers frequently **cache DNS responses ignoring low TTLs** (DNS caching / pinning), causing applications to continue sending write queries to the old dead primary IP for minutes after DNS was updated.",
    explanation: "Database Proxies (ProxySQL/Router) or Virtual IPs (VIP) are superior to DNS for local failovers.",
    hint: "Client-side and intermediate DNS caching delays application redirection even with low TTLs.",
    level: "intermediate",
    codeExample: `# DNS TTL set to 5s, but JVM caches IP address for 30 seconds by default!`
  },
  {
    question: "What is GitHub Orchestrator and what key capabilities make it superior to legacy MHA (Master High Availability)?",
    shortAnswer: "GitHub Orchestrator is a robust Go-based MySQL topology discovery and automated failover service; it provides a real-time web UI, supports GTID and Pseudo-GTID, automatically refactors broken replication trees (e.g. moving replicas from a dead master to a promoted master), and runs as a distributed multi-node consensus service (Raft) with zero single-point-of-failure.",
    explanation: "The industry standard topology manager for large-scale MySQL fleets.",
    hint: "Go-based topology manager with web UI, Raft consensus, GTID refactoring, and automated failover.",
    level: "expert",
    codeExample: `# Orchestrator CLI:
orchestrator -c discover -i 192.168.1.10:3306
orchestrator -c force-master-failover -i 192.168.1.10:3306`
  },
  {
    question: "What is `super_read_only = ON` and why must it be enforced on all standby replicas by default?",
    shortAnswer: "Unlike standard `read_only` (which allows users with `SUPER` privilege to write), `super_read_only = ON` blocks **ALL write transactions from all users, including root and superusers**, preventing accidental local writes, rogue maintenance scripts, and split-brain write divergence on standby replicas.",
    explanation: "Mandatory security baseline for all secondary/standby database nodes.",
    hint: "Blocks all writes including root/superusers to prevent accidental data modification on replicas.",
    level: "basic",
    codeExample: `[mysqld]
# On all Standby Replicas:
read_only = ON
super_read_only = ON`
  },
  {
    question: "What does `SELECT @@GLOBAL.gtid_executed;` reveal during disaster recovery election?",
    shortAnswer: "It displays the complete set of transaction UUIDs and sequence numbers committed on that node; comparing `gtid_executed` across all standby replicas allows the DBA or orchestrator to **identify the most advanced replica** (the one with the largest transaction set) for promotion, minimizing or eliminating data loss.",
    explanation: "Guarantees election of the most up-to-date candidate.",
    hint: "Displays all committed GTIDs to identify the most advanced replica for promotion.",
    level: "intermediate",
    codeExample: `SELECT @@GLOBAL.gtid_executed;
-- Node 2: 3E11FA47-...:1-500
-- Node 3: 3E11FA47-...:1-498 (Node 2 is 2 transactions ahead → Promote Node 2!)`
  },
  {
    question: "What is 'Errant GTID' (or Errant Transaction) and why is it fatal during failover?",
    shortAnswer: "An Errant GTID is a transaction executed directly on a replica that does **NOT exist on the primary or other replicas**; if that replica is promoted to primary, downstream replicas will fail replication with `Last_IO_Error: 1236` or duplicate key errors when attempting to sync with the new primary.",
    explanation: "Must be detected and resolved before promoting a replica.",
    hint: "A rogue transaction committed directly on a replica that does not exist on other cluster nodes.",
    level: "expert",
    codeExample: `SELECT GTID_SUBTRACT(@@GLOBAL.gtid_executed, 'primary_gtid_set'); -- Should be EMPTY!`
  },
  {
    question: "How do you detect and clean up Errant GTIDs before failover?",
    shortAnswer: "Use `GTID_SUBTRACT(replica_gtid_executed, primary_gtid_executed)` to detect errant transactions; to clean up, inject empty transactions on all other cluster nodes for that errant GTID range, or re-clone the replica using the MySQL Clone Plugin.",
    explanation: "Re-aligns GTID sets across all cluster nodes.",
    hint: "Detect via GTID_SUBTRACT and inject empty commits or re-clone the node.",
    level: "expert",
    codeExample: `SET GTID_NEXT = 'errant_uuid:1';
BEGIN; COMMIT;
SET GTID_NEXT = 'AUTOMATIC';`
  },
  {
    question: "How do you recover a former crashed Primary after a failover when it comes back online?",
    shortAnswer: "Because the old primary may contain un-replicated local transactions committed immediately before the crash, it must NEVER be allowed to accept writes; use the **MySQL Clone Plugin** (`CLONE INSTANCE FROM 'new_primary_user'@'new_primary_ip':3306;`) to re-image the old primary cleanly and rejoin it as a read-only secondary replica.",
    explanation: "Re-imaging eliminates errant transactions and aligns GTID history perfectly.",
    hint: "Re-image the former primary using MySQL Clone Plugin and rejoin as read-only replica.",
    level: "intermediate",
    codeExample: `CLONE INSTANCE FROM 'clone_user'@'192.168.1.20':3306 IDENTIFIED BY 'Pass#2026';`
  },
  {
    question: "What is MySQL InnoDB ClusterSet and how does it implement cross-region Disaster Recovery?",
    shortAnswer: "InnoDB ClusterSet links a **Primary InnoDB Cluster** in one region (e.g. Kolkata) to one or more **Replica InnoDB Clusters** in distant regions (e.g. Mumbai) via asynchronous GTID replication channels, providing automated local HA in each region and declarative cross-region disaster recovery switchovers via MySQL Shell AdminAPI.",
    explanation: "Combines local Paxos consensus with asynchronous inter-region replication.",
    hint: "Links multiple regional InnoDB Clusters via asynchronous GTID replication for disaster recovery.",
    level: "expert",
    codeExample: `// In MySQL Shell:
var clusterSet = dba.createClusterSet('kolkataMumbaiClusterSet');
clusterSet.status();`
  },
  {
    question: "What is `clusterSet.setPrimaryCluster('target_cluster_name')` in MySQL Shell?",
    shortAnswer: "Performs a planned, graceful cross-region disaster recovery switchover, demoting the current Primary Cluster to a Replica Cluster and promoting the designated Replica Cluster to the active Primary Cluster with zero data loss.",
    explanation: "Used for scheduled datacenter migrations and regional maintenance.",
    hint: "Performs a controlled cross-region cluster role switchover.",
    level: "expert",
    codeExample: `clusterSet.setPrimaryCluster('mumbaiCluster');`
  },
  {
    question: "What is `clusterSet.forcePrimaryCluster('target_cluster_name')` in MySQL Shell?",
    shortAnswer: "An emergency disaster recovery command used when the primary regional datacenter is completely destroyed/offline; it forces the secondary regional cluster to become the active Primary immediately without waiting for the dead cluster.",
    explanation: "The ultimate disaster recovery emergency button for catastrophic regional outages.",
    hint: "Forces a secondary regional cluster to become Primary during catastrophic datacenter destruction.",
    level: "expert",
    codeExample: `clusterSet.forcePrimaryCluster('mumbaiCluster');`
  },
  {
    question: "What is Chaos Engineering / Disaster Recovery GameDay in enterprise database management?",
    shortAnswer: "A scheduled, controlled operational exercise where engineering teams deliberately inject simulated production failures (e.g. killing primary database daemons, severing network links between datacenters, simulating disk corruption) to validate that automated failover mechanisms, monitoring alerts, and DR runbooks function perfectly under realistic stress.",
    explanation: "Validates that high availability systems work before real emergencies occur.",
    hint: "Controlled simulation of production failures to validate automated failover and runbooks.",
    level: "basic",
    codeExample: `# GameDay Drill: Simulate primary failure:
sudo systemctl stop mysql`
  },
  {
    question: "How does ProxySQL integrate with automated failover orchestrators during master promotion?",
    shortAnswer: "ProxySQL's `mysql_replication_hostgroups` monitors `read_only` on all nodes; when the orchestrator promotes a standby replica by setting `read_only = OFF`, ProxySQL automatically detects the change, moves the new primary to Writer Hostgroup 10, and redirects all write traffic in under 500ms.",
    explanation: "Enables sub-second client write redirection without modifying application connection strings.",
    hint: "ProxySQL detects read_only = OFF and automatically moves the promoted node to Writer Hostgroup 10.",
    level: "intermediate",
    codeExample: `INSERT INTO mysql_replication_hostgroups (writer_hostgroup, reader_hostgroup) VALUES (10, 20);`
  },
  {
    question: "What is `rpl_semi_sync_master_timeout` in Semi-Synchronous failover architectures?",
    shortAnswer: "The maximum time in milliseconds the Primary will wait for a replica ACK before falling back to asynchronous mode (e.g. 10,000ms); in high-availability financial setups, setting this timeout very high (or using Group Replication) ensures the primary never commits transactions without replica acknowledgement.",
    explanation: "Balances strict RPO = 0 durability against write availability during network disconnects.",
    hint: "Timeout before primary falls back to async mode if no replica ACK is received.",
    level: "intermediate",
    codeExample: `SET GLOBAL rpl_semi_sync_master_timeout = 10000; -- 10 seconds`
  },
  {
    question: "What role does Keepalived priority (`priority 101` vs `priority 100`) play in Virtual IP failovers?",
    shortAnswer: "Keepalived nodes with higher numerical priority win the VRRP master election and bind the Virtual IP; during failover, priority scores can be adjusted dynamically via health check scripts to ensure the VIP floats to the healthiest database node.",
    explanation: "Controls deterministic IP binding hierarchy.",
    hint: "Higher priority node binds the Virtual IP during VRRP election.",
    level: "basic",
    codeExample: `priority 101 # Primary Candidate
priority 100 # Secondary Standby`
  },
  {
    question: "Why should asynchronous read replicas be configured with `relay_log_purge = 1`?",
    shortAnswer: "It allows the replica to automatically delete relay log files after the SQL applier thread has executed all transactions within them, preventing relay logs from filling up the replica's disk storage.",
    explanation: "Enabled by default to maintain disk hygiene.",
    hint: "Automatically deletes relay logs after execution to prevent disk full outages.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'relay_log_purge'; -- Value: ON (1)`
  },
  {
    question: "What is `slave_exec_mode = STRICT` vs `IDEMPOTENT`?",
    shortAnswer: "`STRICT` (default) halts replication immediately upon any constraint error (e.g. duplicate key or missing row); `IDEMPOTENT` suppresses duplicate key and key not found errors, used primarily in N-way multi-master circular replication.",
    explanation: "`STRICT` is mandatory for enterprise consistency to prevent silent data corruption.",
    hint: "STRICT halts replication on constraint errors; IDEMPOTENT suppresses duplicate key errors.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'slave_exec_mode'; -- Value: STRICT`
  },
  {
    question: "What is 'Point-in-Time Recovery' (PITR) and how does it complement replication failover?",
    shortAnswer: "While replication failover recovers from server crashes, it cannot recover from logical human errors (such as an accidental `DROP TABLE` or `UPDATE without WHERE`), which instantly replicates to all standby nodes; PITR restores a physical backup and replays binary logs up to the exact microsecond before the destructive query.",
    explanation: "Essential defense against human error and malicious data deletion.",
    hint: "Restores backups and replays binlogs up to the exact transaction before a catastrophic human error.",
    level: "intermediate",
    codeExample: `mysqlbinlog --stop-datetime="2026-08-25 15:30:00" binlog.000004 | mysql -u root -p`
  },
  {
    question: "What is the recommended frequency for testing physical database backups and disaster recovery runbooks?",
    shortAnswer: "Automated daily test restores in an isolated sandbox environment, and quarterly cross-region disaster recovery failover drills (GameDays).",
    explanation: "An untested backup or unvalidated failover runbook cannot be trusted in a real production emergency.",
    hint: "Daily automated restore tests and quarterly cross-region failover drills.",
    level: "basic",
    codeExample: `-- Backup testing rule: If you haven't restored it, you don't have a backup!`
  },
  {
    question: "What is the role of `dba.rebootClusterFromCompleteOutage()` during total datacenter power recovery?",
    shortAnswer: "When all nodes in an InnoDB Cluster lose power simultaneously, the cluster cannot form a quorum automatically upon reboot; `dba.rebootClusterFromCompleteOutage()` queries all members, identifies the node with the highest GTID sequence, and re-bootstraps the cluster safely with zero data loss.",
    explanation: "Restores cluster operations after total datacenter blackouts.",
    hint: "Re-bootstraps an InnoDB cluster after total power outage using the node with the highest GTID set.",
    level: "expert",
    codeExample: `dba.rebootClusterFromCompleteOutage('kolkataBankCluster');`
  },
  {
    question: "What is the primary operational takeaway of Topic 13 in Module 004_006?",
    shortAnswer: "Automated failover and disaster recovery require comprehensive defense-in-depth: eliminate Split-Brain via **Paxos majority quorums ($>50\%$)** and **`super_read_only = ON`** on standbys, deploy **GTID auto-positioning** for seamless replica repointing, leverage **MySQL InnoDB Cluster / GitHub Orchestrator** for sub-10-second automated failover, shift client traffic via **Virtual IPs (VIP) or ProxySQL**, re-image former masters with the **MySQL Clone Plugin**, and validate resilience through **quarterly GameDay disaster drills**.",
    explanation: "Mastering failover strategies and disaster recovery runbooks guarantees enterprise business continuity, achieving high availability SLAs with zero data corruption.",
    hint: "Summarize split-brain prevention, GTID auto-positioning, automated orchestrators, Virtual IP/ProxySQL traffic shifting, and GameDay drills.",
    level: "basic",
    codeExample: `-- Master 6-Step Disaster Recovery Runbook Blueprint:
# 1. Confirm Master Failure & Quorum
# 2. Identify Most Advanced Standby via GTID:
SELECT @@GLOBAL.gtid_executed;

# 3. Promote Standby to Primary:
STOP REPLICA;
SET GLOBAL super_read_only = OFF;
SET GLOBAL read_only = OFF;

# 4. Repoint Remaining Replicas via GTID:
CHANGE REPLICATION SOURCE TO SOURCE_HOST = 'new_primary_ip', SOURCE_AUTO_POSITION = 1;
START REPLICA;

# 5. Shift Virtual IP / Update ProxySQL:
LOAD MYSQL SERVERS TO RUNTIME;

# 6. Re-Image Old Master via Clone Plugin & Rejoin as Read-Only Secondary.`
  }
];

export default questions;
