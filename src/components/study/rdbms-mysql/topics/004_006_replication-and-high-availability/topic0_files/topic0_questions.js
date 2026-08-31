// topic0_files/topic0_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 0: High Availability (HA) and Horizontal Scalability Concepts in Database Engineering

const questions = [
  {
    question: "What is High Availability (HA) in database engineering, and how does it differ from simple backups?",
    shortAnswer: "High Availability (HA) is an architectural system design that ensures continuous operational uptime and automatic failover during component failures; backups are static point-in-time snapshots that require manual restoration with substantial downtime.",
    explanation: "HA provides redundancy and automated recovery with minimal RTO (seconds), whereas restoring backups requires hours of downtime.",
    hint: "HA is continuous uptime with automated failover; backups are offline data recovery copies.",
    level: "basic",
    codeExample: `# HA Design: Primary (Write) → Synchronous Standby (Auto-Failover) + Read Replicas`
  },
  {
    question: "What does 'Five Nines' (99.999%) availability represent in terms of allowed annual downtime?",
    shortAnswer: "Exactly **5.26 minutes** of unplanned downtime per calendar year (or ~25.9 seconds per month).",
    explanation: "Achieving 99.999% availability requires fully automated sub-minute failover, redundant network paths, and multi-data center replication.",
    hint: "5.26 minutes per year.",
    level: "basic",
    codeExample: `-- Downtime Table:
-- 99.0%   : 3.65 days / year
-- 99.9%   : 8.76 hours / year
-- 99.99%  : 52.56 minutes / year
-- 99.999% : 5.26 minutes / year`
  },
  {
    question: "What is the difference between Recovery Point Objective (RPO) and Recovery Time Objective (RTO)?",
    shortAnswer: "**RPO** is the maximum tolerable duration of data loss measured in time (e.g. RPO = 0 means zero data loss); **RTO** is the maximum tolerable duration of downtime allowed to restore service availability.",
    explanation: "RPO dictates replication synchronicity (Async vs Semi-Sync); RTO dictates automated failover tooling speed.",
    hint: "RPO measures data loss; RTO measures downtime duration.",
    level: "basic",
    codeExample: `# RPO = 0 (Requires Lossless Semi-Sync or Group Replication)
# RTO < 30s (Requires MySQL Router + InnoDB Cluster Auto-Failover)`
  },
  {
    question: "What is a Single Point of Failure (SPOF) in database architecture?",
    shortAnswer: "Any single hardware or software component (e.g. a standalone MySQL server, a single top-of-rack network switch, or a single DNS server) whose failure halts the entire database system.",
    explanation: "HA engineering systematically eliminates SPOFs by introducing redundant, independent standby components at every layer.",
    hint: "A single component whose failure takes down the entire system.",
    level: "basic",
    codeExample: `-- Standalone primary with no standby replica = Single Point of Failure (SPOF)!`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a hardware power supply failure on the standalone primary database halted cashier billing for 4 hours on Diwali. How did designing a High Availability architecture solve this?",
    shortAnswer: "Susmita deployed a hot standby replica with automated health checking and ProxySQL routing, reducing the RTO from 4 hours down to 12 seconds with RPO = 0 across ₹1.2 Crores in festival sales.",
    explanation: "Automated failover shifted application traffic to the standby instance immediately without human intervention.",
    hint: "Added hot standby replica with automated proxy routing to achieve 12-second RTO.",
    level: "moderate",
    codeExample: `# Barrackpore HA Architecture:
# Primary (Node 1) → Semi-Sync Standby (Node 2) → ProxySQL (Auto Failover in 12s)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, core banking transactions require an strict RPO = 0 across ₹500 Crores in daily transaction ledgers. What replication architecture is required?",
    shortAnswer: "A synchronous consensus topology such as **MySQL Group Replication (InnoDB Cluster)** or **Lossless Semi-Synchronous Replication** where transactions are guaranteed to be acknowledged by at least one replica before committing on the primary.",
    explanation: "Asynchronous replication allows transactions to commit locally before replication, creating an RPO > 0 vulnerability during primary crashes.",
    hint: "Requires Lossless Semi-Synchronous Replication or MySQL Group Replication for RPO = 0.",
    level: "expert",
    codeExample: `# MySQL 8.0 Lossless Semi-Sync Configuration:
SET GLOBAL rpl_semi_sync_master_enabled = 1;
SET GLOBAL rpl_semi_sync_master_wait_point = 'AFTER_SYNC';`
  },
  {
    question: "What is the difference between Scale-Up (Vertical Scaling) and Scale-Out (Horizontal Scaling)?",
    shortAnswer: "**Scale-Up** adds more CPU cores, RAM, and faster NVMe storage to a single server node; **Scale-Out** adds additional database nodes (read replicas, shard nodes, or cluster members) to distribute the workload across multiple physical machines.",
    explanation: "Scale-up hits physical hardware limits and remains a SPOF; scale-out provides virtually unlimited scaling and built-in fault tolerance.",
    hint: "Scale-up upgrades one machine; scale-out adds more machines.",
    level: "basic",
    codeExample: `-- Scale-Up: 16 Core / 64GB → 128 Core / 1TB RAM (Single Node)
-- Scale-Out: 1 Primary (Writes) + 5 Read Replicas (Reads)`
  },
  {
    question: "How does the CAP Theorem apply to MySQL distributed replication topologies during network partitions?",
    shortAnswer: "During a network partition (P), a database system must choose between **Consistency (C)** (rejecting writes that cannot be synchronized to prevent split-brain) or **Availability (A)** (allowing nodes to accept writes independently at the cost of data divergence).",
    explanation: "MySQL Group Replication chooses Consistency (C + P), while Asynchronous Replication favors Availability (A + P).",
    hint: "Group Replication chooses Consistency; Async replication chooses Availability.",
    level: "intermediate",
    codeExample: `-- Group Replication: Quorum-based Paxos consensus enforces Consistency.`
  },
  {
    question: "What is a 'Split-Brain' scenario in a High Availability database cluster, and why is it catastrophic?",
    shortAnswer: "A split-brain occurs when a network partition separates cluster nodes, causing two independent nodes to both believe they are the active primary, resulting in conflicting, un-mergeable writes on both sides and total data corruption.",
    explanation: "Prevented by strict majority quorum algorithms (requiring $>50\\%$ of cluster votes) and automated node fencing (STONITH).",
    hint: "Two nodes simultaneously act as primary, corrupting transactional data.",
    level: "intermediate",
    codeExample: `-- Quorum rule: Cluster of N nodes requires (N/2 + 1) votes to elect or maintain a primary.`
  },
  {
    question: "How does Read Scaling differ from Write Scaling in MySQL?",
    shortAnswer: "**Read Scaling** is achieved by adding asynchronous or semi-synchronous read replicas behind a load balancer (ProxySQL / MySQL Router); **Write Scaling** requires database sharding (e.g. Vitess, Citus) or application-level partitioning because all writes in standard topologies must serialize through the primary.",
    explanation: "Read scaling handles 90% of typical application demand effortlessly by distributing `SELECT` queries across replicas.",
    hint: "Read scaling uses read replicas; write scaling requires sharding or partitioning.",
    level: "intermediate",
    codeExample: `# Read Scaling Topology:
# App → ProxySQL → Primary (INSERT/UPDATE/DELETE)
#                 → Replica 1 (SELECT)
#                 → Replica 2 (SELECT)`
  },
  {
    question: "What is the Quorum requirement to prevent split-brain in a MySQL Group Replication cluster of 3 nodes?",
    shortAnswer: "At least **2 nodes** (majority: $\\lfloor 3/2 \\rfloor + 1 = 2$). If 2 nodes lose contact with the 3rd, the 2-node majority continues operating while the isolated 1-node partition automatically transitions to read-only or shuts down.",
    explanation: "Quorum guarantees that only one partition in a network split can ever hold a majority vote.",
    hint: "Majority of 3 is 2 nodes.",
    level: "intermediate",
    codeExample: `-- Quorum calculation: (3 / 2) + 1 = 2 nodes required for write consensus.`
  },
  {
    question: "What is STONITH / Node Fencing in High Availability clustering?",
    shortAnswer: "**STONITH** ('Shoot The Other Node In The Head') is a fencing technique that forcefully isolates, revokes network access, or powers off a malfunctioning or unresponsive primary node before promoting a standby replica to primary.",
    explanation: "Guarantees that an old primary cannot wake up and accept writes after a new primary has taken over.",
    hint: "Forcefully isolating or shutting down the old primary to prevent duplicate writes.",
    level: "expert",
    codeExample: `# Fencing prevents zombie primaries from writing stale data.`
  },
  {
    question: "What is the role of a Database Proxy (e.g. ProxySQL or MySQL Router) in High Availability architecture?",
    shortAnswer: "It serves as an intelligent intermediate layer between client applications and database nodes, automatically routing read queries to healthy replicas, write queries to the primary, and instantly redirecting traffic during failover without requiring application restarts.",
    explanation: "Decouples application connection strings from physical database IP addresses.",
    hint: "Intelligently routes reads and writes and performs instant failover traffic redirection.",
    level: "basic",
    codeExample: `# ProxySQL: Port 6033 routes writes to hostgroup 10 (Primary) and reads to hostgroup 20 (Replicas).`
  },
  {
    question: "What is Eventual Consistency in MySQL asynchronous replication topologies?",
    shortAnswer: "A consistency model where read replicas may temporarily lag behind the primary, but are guaranteed to eventually reflect all primary updates if no new updates are made.",
    explanation: "Users reading from a lagging replica might temporarily see data from a few milliseconds or seconds in the past.",
    hint: "Replicas lag slightly but will eventually catch up with the primary.",
    level: "basic",
    codeExample: `-- Client writes profile photo to Primary → Reads immediately from Replica → Photo not visible for 200ms.`
  },
  {
    question: "What is 'Read-Your-Own-Writes' consistency, and how is it implemented in read/write splitting architectures?",
    shortAnswer: "A guarantee that an end user immediately sees their own recent updates (e.g. updated user profile or submitted order) even if read replicas are lagging, typically achieved by routing all queries for that user to the primary for a few seconds following any write transaction.",
    explanation: "ProxySQL implements this using query rules that stick a session to the primary hostgroup for $N$ seconds after an `INSERT` or `UPDATE`.",
    hint: "Routing a user's reads to the primary for a brief period immediately following a write.",
    level: "intermediate",
    codeExample: `# ProxySQL Rule: If session wrote data within last 5 seconds → route reads to Primary.`
  },
  {
    question: "What does 'Active-Passive' vs 'Active-Active' mean in database high availability?",
    shortAnswer: "**Active-Passive** has one node serving writes/reads while a standby node remains idle or read-only awaiting failover; **Active-Active** has two or more nodes simultaneously accepting concurrent write transactions across the cluster.",
    explanation: "Active-Active MySQL requires distributed conflict resolution (e.g. Group Replication Multi-Primary mode or Galera Cluster).",
    hint: "Active-Passive has one write node; Active-Active allows concurrent writes across multiple nodes.",
    level: "basic",
    codeExample: `-- Active-Passive: 1 Primary (RW) + 1 Standby (RO)
-- Active-Active: Node 1 (RW) + Node 2 (RW) with Paxos conflict detection`
  },
  {
    question: "Why is manual failover dangerous in high-stress production outages compared to automated orchestrators?",
    shortAnswer: "Manual failover introduces human error (promoting the wrong replica, forgetting to fence the crashed primary, misconfiguring GTID purge coordinates) and elongates downtime (RTO) from seconds to tens of minutes.",
    explanation: "Automated tooling (e.g. Orchestrator, MySQL InnoDB Cluster) executes verified, deterministic failover runbooks in under 15 seconds.",
    hint: "Manual failover causes human errors and high downtime; automated orchestrators failover in seconds.",
    level: "basic",
    codeExample: `-- Automated failover ensures deterministic promotion and routing updates.`
  },
  {
    question: "What is Chaos Engineering in the context of database High Availability testing?",
    shortAnswer: "The practice of intentionally injecting controlled hardware, network, and process failures (e.g. killing primary MySQL daemon, dropping network packets, simulating disk full) in staging/production to verify that automated failover and HA mechanisms execute successfully.",
    explanation: "Validates that HA runbooks work before a real disaster strikes.",
    hint: "Intentionally injecting failures to test and prove automated failover resilience.",
    level: "intermediate",
    codeExample: `# Simulating primary crash:
# sudo kill -9 $(pgrep mysqld)`
  },
  {
    question: "What is Replication Lag, and why does it impact High Availability failover?",
    shortAnswer: "Replication lag is the delay between a transaction committing on the primary and that same transaction being applied on the replica; promoting a lagging replica during failover causes data loss (violating RPO) or transaction rollbacks.",
    explanation: "Automated orchestrators choose the replica with the least replication lag (closest GTID set) when electing a new primary.",
    hint: "Delay in replica applying transactions; promoting lagging replicas causes data loss.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G -- Check Seconds_Behind_Source`
  },
  {
    question: "How does Geographic (Multi-Region / Cross-Data-Center) replication enhance Disaster Recovery (DR)?",
    shortAnswer: "It replicates data asynchronously across geographically distant data centers (e.g. Mumbai and Kolkata), protecting the business against regional catastrophes (earthquakes, power grid collapses, major telecom fiber cuts).",
    explanation: "Local HA protects against hardware node failures; cross-region DR protects against entire datacenter destruction.",
    hint: "Replicates across distant regions to survive complete datacenter destruction.",
    level: "intermediate",
    codeExample: `# Primary DC (Mumbai) → Local Replicas (HA) + WAN Async Replication → DR DC (Kolkata)`
  },
  {
    question: "What is the PACELC Theorem, and how does it extend the CAP Theorem?",
    shortAnswer: "PACELC states that **if there is a Partition (P)**, a system must trade off **Availability (A)** vs **Consistency (C)**; **Else (E)**, when running normally without partitions, the system must trade off **Latency (L)** vs **Consistency (C)**.",
    explanation: "Synchronous replication guarantees strict consistency at the cost of higher query commit latency.",
    hint: "If Partition: trade Availability vs Consistency; Else: trade Latency vs Consistency.",
    level: "expert",
    codeExample: `-- Semi-Sync trade-off: Higher Consistency (C) requires network round-trip Latency (L).`
  },
  {
    question: "What is the recommended minimum number of nodes for a fault-tolerant MySQL Group Replication cluster, and why?",
    shortAnswer: "**3 nodes**, because a 3-node cluster can tolerate the failure of 1 node while retaining a majority quorum ($2/3$ votes) to continue operating.",
    explanation: "A 2-node cluster cannot tolerate any node failure because losing 1 node leaves only 1 node ($50\\%$), which is not a majority.",
    hint: "3 nodes minimum to survive 1 node failure with majority quorum.",
    level: "basic",
    codeExample: `-- 3-Node Cluster: Tolerates 1 failure.
-- 5-Node Cluster: Tolerates 2 failures.`
  },
  {
    question: "What is a 'Cascading Replica' or 'Relay Replica' architecture, and what scalability problem does it solve?",
    shortAnswer: "A topology where the primary replicates to a single intermediate relay replica, which then fans out replication to 20+ edge read replicas, reducing network bandwidth and binary log dump thread overhead on the primary.",
    explanation: "Prevents primary server network saturation when supporting massive read replica farms.",
    hint: "Intermediate replica fans out binlogs to multiple replicas to protect primary network bandwidth.",
    level: "expert",
    codeExample: `# Primary → Intermediate Relay Replica → 20 Edge Read Replicas`
  },
  {
    question: "How do Health Probes (Heartbeats) detect a failed database node?",
    shortAnswer: "By continuously sending lightweight TCP probes or SQL queries (`SELECT 1;`) at high frequency (e.g. every 1 second); if a node fails to respond for $N$ consecutive attempts (e.g. 3 failures in 3 seconds), it is marked dead and failover triggers.",
    explanation: "Ensures rapid failure detection without false positives caused by transient network blips.",
    hint: "Periodic lightweight TCP/SQL probes with consecutive failure thresholds.",
    level: "basic",
    codeExample: `# ProxySQL health check: select 1 on port 3306 every 1000ms.`
  },
  {
    question: "What is the difference between Synchronous and Asynchronous replication latency impact?",
    shortAnswer: "Asynchronous replication adds **0ms** commit latency to the client query because the primary commits locally immediately; Synchronous replication adds network round-trip time (RTT) to every `COMMIT` statement to wait for replica acknowledgment.",
    explanation: "In LAN environments, semi-sync latency overhead is sub-millisecond; across WAN, it can add 20-50ms per transaction.",
    hint: "Async has 0ms commit latency; Sync adds network round-trip time before commit returns.",
    level: "intermediate",
    codeExample: `-- Semi-sync latency = Local Disk Flush + Network RTT to Replica`
  },
  {
    question: "What is a 'Graceful Switchover' (Planned Maintenance Failover) vs an 'Unplanned Failover'?",
    shortAnswer: "A **Graceful Switchover** is an intentional, planned role reversal where the primary is placed in read-only mode, all replica lag is fully applied (0 data loss guaranteed), and the standby is promoted cleanly; an **Unplanned Failover** occurs after an unexpected hardware crash where emergency promotion must occur immediately.",
    explanation: "Switchovers are used for OS upgrades, MySQL version upgrades, and hardware maintenance.",
    hint: "Switchover is planned zero-loss maintenance; failover is emergency disaster recovery.",
    level: "basic",
    codeExample: `# Orchestrator CLI:
# orchestrator -c graceful-master-takeover -alias kolkata-cluster`
  },
  {
    question: "What is Sharding in database write scalability?",
    shortAnswer: "A database architecture that partitions data horizontally across multiple independent MySQL primary databases based on a shard key (e.g. `customer_id % 4`), allowing write throughput to scale linearly across multiple physical servers.",
    explanation: "Enables massive write scalability beyond the capacity of any single physical server.",
    hint: "Partitioning data horizontally across multiple primary database nodes by shard key.",
    level: "intermediate",
    codeExample: `# Shard 0: Customers 0-999,999
# Shard 1: Customers 1,000,000-1,999,999`
  },
  {
    question: "What is the primary trade-off of Database Sharding compared to a single primary database?",
    shortAnswer: "Cross-shard joins, distributed multi-shard transactions (requiring Two-Phase Commit - 2PC), and schema migrations become exponentially complex and slow.",
    explanation: "Sharding should only be adopted when write throughput exhausts the largest available scale-up hardware.",
    hint: "Cross-shard joins and distributed transactions become highly complex.",
    level: "expert",
    codeExample: `-- Cross-shard joins require application-level stitching or distributed query routers.`
  },
  {
    question: "What is the difference between High Availability (HA) and Disaster Recovery (DR)?",
    shortAnswer: "**HA** focuses on local component redundancy within the same datacenter to provide continuous uptime during routine hardware/software faults; **DR** focuses on surviving catastrophic regional datacenter outages by maintaining remote replicas and backup runbooks.",
    explanation: "HA provides high availability; DR provides business continuity after catastrophe.",
    hint: "HA handles local component failures; DR handles catastrophic regional datacenter loss.",
    level: "basic",
    codeExample: `# Local HA (Same DC): RTO < 30s, RPO = 0
# Regional DR (Remote DC): RTO < 15m, RPO < 5s`
  },
  {
    question: "What is the primary operational takeaway of Topic 0 in Module 004_006?",
    shortAnswer: "High Availability and Scalability are the twin pillars of enterprise database reliability: eliminate Single Points of Failure (SPOFs) by pairing primaries with hot standbys, enforce **RPO = 0 and RTO < 30s** SLAs using automated orchestrators and intelligent proxies (ProxySQL/MySQL Router), scale reads horizontally with read replicas, and use quorum-based consensus (Group Replication) to prevent split-brain data corruption.",
    explanation: "Mastering HA and scalability architecture provides the theoretical and engineering foundation for all MySQL replication topologies.",
    hint: "Summarize HA vs backups, RPO/RTO SLAs, eliminating SPOFs, read-scaling with proxies, and split-brain prevention via quorum.",
    level: "basic",
    codeExample: `-- Master HA Architecture Blueprint:
# 1. Traffic Layer: ProxySQL / MySQL Router (Auto-Routing & Failover)
# 2. Compute Layer: Primary (Read/Write) + Standby Replicas (Read-Only)
# 3. Consensus Layer: MySQL Group Replication (Paxos Majority Quorum)
# 4. Disaster Recovery: Asynchronous Cross-Region Replica (Remote DR DC)`
  }
];

export default questions;
