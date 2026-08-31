// topic6_files/topic6_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 6: Replication Topologies: Master-Slave, Multi-Source Replication, Master-Master (Dual-Master), Tree Replication

const questions = [
  {
    question: "What are the 4 primary replication topologies utilized in enterprise MySQL architectures?",
    shortAnswer: "1. **Standard Fan-Out** (1 Primary → $N$ Replicas), 2. **Cascading / Tree Replication** (Primary → Relay Replica → Edge Replicas), 3. **Multi-Source / Fan-In** ($N$ Sources → 1 Central Replica), and 4. **Dual-Master / Master-Master** (Two primaries replicating bidirectionally).",
    explanation: "Each topology addresses specific business requirements: read scaling, network bandwidth offloading, data warehouse consolidation, or rapid role switchover.",
    hint: "Fan-Out, Cascading Tree, Multi-Source Fan-In, and Dual-Master.",
    level: "basic",
    codeExample: `# Topologies:
# 1. Fan-Out: Master → 5 Replicas
# 2. Cascading: Master → Relay Replica → 20 Edge Replicas
# 3. Multi-Source: Mumbai + Kolkata + Delhi → Central DWH
# 4. Dual-Master: Master A <-> Master B`
  },
  {
    question: "What scalability bottleneck does Cascading (Tree) Replication solve?",
    shortAnswer: "It eliminates network bandwidth saturation and CPU context-switch exhaustion on the primary server; instead of the primary streaming binary logs to 30+ separate replicas simultaneously, it streams to a single intermediate **Relay Replica**, which then fans out to the 30 edge nodes.",
    explanation: "Protects primary database resources for high-throughput write transactions.",
    hint: "Protects primary network bandwidth by using an intermediate relay replica to fan out logs.",
    level: "intermediate",
    codeExample: `# Master (streams 1 copy) → Relay Replica → Streams 30 copies to Edge Replicas`
  },
  {
    question: "What setting is MANDATORY on the intermediate node in a Cascading Replication topology?",
    shortAnswer: "**`log_replica_updates = ON`** (or legacy `log_slave_updates = ON`).",
    explanation: "Forces the intermediate relay replica to write transactions executed by its SQL applier thread into its own local Binary Log so downstream edge replicas can read them.",
    hint: "log_replica_updates = ON is required on the intermediate relay node.",
    level: "intermediate",
    codeExample: `[mysqld]
# On Relay Replica:
log_bin = mysql-bin
log_replica_updates = ON`
  },
  {
    question: "What is Multi-Source Replication and how is it configured in MySQL 8.0?",
    shortAnswer: "Multi-Source replication allows a single replica to replicate simultaneously from multiple independent Source servers using **Named Replication Channels** (e.g. `FOR CHANNEL 'mumbai'` and `FOR CHANNEL 'kolkata'`).",
    explanation: "Enables consolidating disparate regional branch databases into a centralized analytics warehouse.",
    hint: "Replicates from multiple sources simultaneously using Named Channels (FOR CHANNEL).",
    level: "basic",
    codeExample: `CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '10.0.1.10', SOURCE_AUTO_POSITION = 1 
  FOR CHANNEL 'mumbai_source';

CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '10.0.2.10', SOURCE_AUTO_POSITION = 1 
  FOR CHANNEL 'kolkata_source';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail business, store databases across Barrackpore, Shyamnagar, and Naihati needed to consolidate ₹1.2 Crores in daily billing into a central Kolkata reporting server. How did Susmita configure this with Multi-Source replication?",
    shortAnswer: "She configured 3 named channels (`barrackpore_channel`, `shyamnagar_channel`, `naihati_channel`) on the central Kolkata replica, allowing transactions from all 3 regional stores to stream concurrently into distinct regional schemas.",
    explanation: "Created an automated, real-time analytics warehouse without writing complex ETL data export scripts.",
    hint: "Configured 3 named replication channels on the central warehouse replica.",
    level: "moderate",
    codeExample: `# Central Kolkata Warehouse Channels:
START REPLICA FOR CHANNEL 'barrackpore_channel';
START REPLICA FOR CHANNEL 'shyamnagar_channel';
START REPLICA FOR CHANNEL 'naihati_channel';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu prevent primary key collisions across a Dual-Master cluster managing ₹500 Crores in banking records?",
    shortAnswer: "He configured `auto_increment_increment = 2` on both nodes, with `auto_increment_offset = 1` on Node A (generating odd IDs: 1, 3, 5...) and `auto_increment_offset = 2` on Node B (generating even IDs: 2, 4, 6...).",
    explanation: "Eliminated duplicate auto-increment key collisions during concurrent writes.",
    hint: "Configured auto_increment_increment = 2 and auto_increment_offset = 1 (Node A) / 2 (Node B).",
    level: "expert",
    codeExample: `# Node A:
auto_increment_increment = 2
auto_increment_offset = 1

# Node B:
auto_increment_increment = 2
auto_increment_offset = 2`
  },
  {
    question: "What is the difference between Active-Passive Dual-Master and Active-Active Dual-Master?",
    shortAnswer: "In **Active-Passive**, Node A accepts all write transactions while Node B replicates in `super_read_only = ON` mode awaiting failover; in **Active-Active**, both nodes simultaneously accept write transactions from applications.",
    explanation: "Active-Passive is safe and enterprise-standard; Active-Active without conflict detection leads to silent data divergence.",
    hint: "Active-Passive has 1 writable node; Active-Active allows concurrent writes on both nodes.",
    level: "basic",
    codeExample: `# Active-Passive: Node A (RW) <-> Node B (RO / super_read_only = ON)`
  },
  {
    question: "Why is Active-Active Dual-Master considered HIGHLY DANGEROUS without distributed consensus (like Group Replication)?",
    shortAnswer: "Because standard MySQL asynchronous replication lacks write-conflict detection; if two clients update the same row simultaneously on Node A and Node B, each node overwrites the other with different values, causing permanent silent data divergence and un-resolvable constraint crashes.",
    explanation: "Concurrent updates to the same row in Active-Active topologies cannot be reconciled automatically by asynchronous replication.",
    hint: "Lacks conflict detection; concurrent updates to the same row cause silent data divergence.",
    level: "intermediate",
    codeExample: `-- Node A: UPDATE balance = 100 WHERE id=1
-- Node B: UPDATE balance = 500 WHERE id=1 → Collision & Data Divergence!`
  },
  {
    question: "How do you start, stop, or check status on a specific replication channel in Multi-Source replication?",
    shortAnswer: "Append `FOR CHANNEL 'channel_name'` to the command: `START REPLICA FOR CHANNEL 'ch1';`, `STOP REPLICA FOR CHANNEL 'ch1';`, and `SHOW REPLICA STATUS FOR CHANNEL 'ch1'\\G`.",
    explanation: "Allows granular per-channel lifecycle control without disrupting other active channels.",
    hint: "Append FOR CHANNEL 'channel_name' to replication commands.",
    level: "basic",
    codeExample: `STOP REPLICA IO_THREAD FOR CHANNEL 'mumbai_source';
SHOW REPLICA STATUS FOR CHANNEL 'kolkata_source'\\G`
  },
  {
    question: "How does Circular (Ring) Replication work, and what is its primary vulnerability?",
    shortAnswer: "Nodes replicate in a closed loop (Node 1 → Node 2 → Node 3 → Node 1); its primary vulnerability is that if any single node in the ring crashes, the entire ring breaks and replication halts for all downstream members.",
    explanation: "Ring topologies have high operational fragility and are rarely used in modern cloud deployments.",
    hint: "Closed loop replication; failure of any single node halts the entire ring.",
    level: "intermediate",
    codeExample: `# Ring Topology: A → B → C → A (Fragile SPOF chain)`
  },
  {
    question: "How does MySQL prevent infinite replication loops in Circular and Dual-Master topologies?",
    shortAnswer: "By inspecting the `server_id` in binary log event headers; when a node receives an event carrying its own `server_id`, it automatically discards the event without re-executing it (enforced by `replicate_same_server_id = 0`).",
    explanation: "Prevents a transaction originating on Node A from cycling through Node B and executing repeatedly on Node A.",
    hint: "Discards events carrying the server's own server_id.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'replicate_same_server_id'; -- Value: OFF`
  },
  {
    question: "What is the default channel name in MySQL Multi-Source replication when no channel is specified?",
    shortAnswer: "The empty string `''` (often referred to as the default channel).",
    explanation: "All standard single-source commands operate on the default empty channel implicitly.",
    hint: "The empty string '' (default channel).",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS FOR CHANNEL '';`
  },
  {
    question: "How does GTID replication simplify Multi-Source replication channels on a central warehouse?",
    shortAnswer: "Because each Source server has a globally unique `server_uuid`, transactions from all sources merge into the warehouse's `gtid_executed` set without coordinate overlaps or transaction ID conflicts.",
    explanation: "Eliminates binlog position collision across multiple distinct primary servers.",
    hint: "Globally unique server_uuid ensures clean merging into gtid_executed without collisions.",
    level: "intermediate",
    codeExample: `-- Central Warehouse gtid_executed merges: 'uuid_mumbai:1-50,uuid_kolkata:1-80'`
  },
  {
    question: "How many independent I/O and SQL threads run on a replica with 4 active Multi-Source channels?",
    shortAnswer: "**4 I/O Receiver Threads** (1 per channel) and **4 SQL Applier Threads** (1 per channel, or more if Multi-Threaded Slave worker pools are enabled).",
    explanation: "Each channel operates as an autonomous replication pipeline with dedicated threads and relay logs.",
    hint: "1 I/O thread and 1 SQL thread per channel (total 4 I/O and 4 SQL threads).",
    level: "intermediate",
    codeExample: `SHOW PROCESSLIST; -- Shows 4 distinct I/O receiver threads and 4 SQL applier threads.`
  },
  {
    question: "What is a Star Topology in MySQL replication?",
    shortAnswer: "A centralized hub-and-spoke topology where a single central primary replicates out to multiple regional branch servers (or multiple branches replicate in to a central primary).",
    explanation: "Common in distributed retail enterprises with central headquarters.",
    hint: "Hub-and-spoke architecture connecting central hub to distributed spokes.",
    level: "basic",
    codeExample: `# Central HQ (Hub) → Branch 1 (Spoke), Branch 2 (Spoke), Branch 3 (Spoke)`
  },
  {
    question: "What happens if two sources in Multi-Source replication both have a database named `users` with colliding tables?",
    shortAnswer: "Transactions from both sources will overwrite and collide in the replica's `users` database; DBAs must use `replicate_rewrite_db` per channel (e.g. `source_a.users → replica.users_a` and `source_b.users → replica.users_b`) to separate schemas.",
    explanation: "Per-channel database rewriting isolates colliding namespaces.",
    hint: "Must use per-channel replicate_rewrite_db to isolate colliding schemas.",
    level: "expert",
    codeExample: `CHANGE REPLICATION FILTER REPLICATE_REWRITE_DB = ((users, users_mumbai)) 
  FOR CHANNEL 'mumbai_source';`
  },
  {
    question: "What is the primary advantage of Active-Passive Dual-Master during scheduled operating system maintenance?",
    shortAnswer: "To perform maintenance on Master A, DBAs simply shift application traffic to Master B (disabling `super_read_only` on B); since Master A was already replicating from B, no replication re-pointing or coordinate recalculation is needed when A returns online.",
    explanation: "Enables seamless zero-downtime maintenance switchovers.",
    hint: "Allows instant traffic switchover without re-pointing replication channels.",
    level: "basic",
    codeExample: `-- 1. Shift writes to Master B → 2. Upgrade Master A → 3. Shift writes back to Master A.`
  },
  {
    question: "How do you delete a Multi-Source replication channel permanently on a replica?",
    shortAnswer: "Execute `STOP REPLICA FOR CHANNEL 'channel_name';` followed by `RESET REPLICA ALL FOR CHANNEL 'channel_name';`.",
    explanation: "Removes channel connection metadata and purges channel-specific relay logs.",
    hint: "STOP REPLICA followed by RESET REPLICA ALL FOR CHANNEL 'channel_name'.",
    level: "basic",
    codeExample: `STOP REPLICA FOR CHANNEL 'delhi_source';
RESET REPLICA ALL FOR CHANNEL 'delhi_source';`
  },
  {
    question: "What is `rpl_channel_name` in Performance Schema replication tables?",
    shortAnswer: "The column identifying which specific named replication channel that row of status, applier latency, or thread metric belongs to.",
    explanation: "Allows filtering monitoring metrics per channel in SQL.",
    hint: "Column identifying the specific named replication channel in Performance Schema.",
    level: "intermediate",
    codeExample: `SELECT CHANNEL_NAME, SERVICE_STATE 
FROM performance_schema.replication_connection_status;`
  },
  {
    question: "How do you configure channel-specific replication filters in MySQL 8.0?",
    shortAnswer: "Pass `FOR CHANNEL 'channel_name'` in `CHANGE REPLICATION FILTER`: `CHANGE REPLICATION FILTER REPLICATE_DO_DB = (sales) FOR CHANNEL 'mumbai_source';`.",
    explanation: "Applies filtering rules exclusively to that specific inbound channel.",
    hint: "Append FOR CHANNEL 'channel_name' to CHANGE REPLICATION FILTER.",
    level: "intermediate",
    codeExample: `CHANGE REPLICATION FILTER REPLICATE_DO_DB = (kolkata_sales) 
  FOR CHANNEL 'kolkata_channel';`
  },
  {
    question: "What is a 'Hierarchical Replication Tree' and in what environments is it deployed?",
    shortAnswer: "A multi-tier replication topology (Global Master → Regional Relay Masters → Local Read Replicas) deployed in multinational global enterprises to replicate data across continents while minimizing inter-continental WAN bandwidth costs.",
    explanation: "Only 1 binary log stream crosses the ocean to the continental relay node.",
    hint: "Multi-tier tree minimizing cross-continental WAN traffic via regional relay nodes.",
    level: "expert",
    codeExample: `# Global Primary (US) → Transatlantic WAN → Regional Relay (Europe) → 10 Local Replicas`
  },
  {
    question: "Why should `auto_increment_increment` be sized larger than the number of active master nodes?",
    shortAnswer: "To allow future expansion of the cluster without having to re-seed or re-align existing auto-increment ID sequences across all nodes.",
    explanation: "Setting `auto_increment_increment = 10` on a 2-node cluster easily accommodates adding 8 more nodes later.",
    hint: "Provides headroom for adding more master nodes in the future.",
    level: "intermediate",
    codeExample: `-- Node 1: offset 1, increment 10 (IDs: 1, 11, 21...)
-- Node 2: offset 2, increment 10 (IDs: 2, 12, 22...)`
  },
  {
    question: "What happens if a Multi-Source replica encounters an error on Channel A while Channel B is healthy?",
    shortAnswer: "Channel A's SQL applier thread halts and reports an error, while Channel B continues downloading and executing transactions completely unaffected.",
    explanation: "Replication channels operate as isolated, independent pipelines.",
    hint: "Channel A halts on error while Channel B continues replicating normally.",
    level: "basic",
    codeExample: `-- Channel A: SQL_Running = No; Channel B: SQL_Running = Yes`
  },
  {
    question: "What is `slave_parallel_workers` (or `replica_parallel_workers`) and how does it interact with Multi-Source replication?",
    shortAnswer: "Each Multi-Source channel can allocate its own pool of parallel worker threads, allowing concurrent execution of independent transactions within each individual channel.",
    explanation: "Multiplies execution throughput across all connected sources.",
    hint: "Allocates parallel worker pools per replication channel.",
    level: "expert",
    codeExample: `SET GLOBAL replica_parallel_workers = 8;`
  },
  {
    question: "How do you inspect the current lag across all channels in Multi-Source replication?",
    shortAnswer: "Query `performance_schema.replication_applier_status_by_coordinator`: `SELECT CHANNEL_NAME, LAST_SEEN_TRANSACTION, LAST_ERROR_NUMBER FROM performance_schema.replication_applier_status_by_coordinator;`.",
    explanation: "Displays per-channel coordinator status in a single relational view.",
    hint: "Query performance_schema.replication_applier_status_by_coordinator.",
    level: "expert",
    codeExample: `SELECT CHANNEL_NAME, SERVICE_STATE, LAST_ERROR_NUMBER 
FROM performance_schema.replication_applier_status_by_coordinator;`
  },
  {
    question: "What is the maximum number of replication channels supported on a single MySQL 8.0 replica?",
    shortAnswer: "Up to **256 distinct named replication channels**.",
    explanation: "Allows massive fan-in data consolidation across hundreds of microservices or branch offices.",
    hint: "Up to 256 named replication channels.",
    level: "basic",
    codeExample: `-- Supports up to 256 channels simultaneously.`
  },
  {
    question: "What is the recommended health check query to ensure all Multi-Source channels are running?",
    shortAnswer: "`SELECT COUNT(*) FROM performance_schema.replication_connection_status WHERE SERVICE_STATE != 'ON';` (should return `0`).",
    explanation: "Verifies that zero channels are disconnected or broken.",
    hint: "Check that SERVICE_STATE is ON for all channels in replication_connection_status.",
    level: "basic",
    codeExample: `SELECT CHANNEL_NAME, SERVICE_STATE 
FROM performance_schema.replication_connection_status 
WHERE SERVICE_STATE != 'ON';`
  },
  {
    question: "What is the primary risk of using Cascading Replication for high availability failover?",
    shortAnswer: "If the intermediate relay replica crashes, all downstream edge replicas lose their stream simultaneously, and if the primary crashes, edge replicas must wait for the relay replica to catch up before failover can proceed.",
    explanation: "Adds an extra hop in the failover dependency tree.",
    hint: "Relay replica failure disconnects all downstream edge replicas simultaneously.",
    level: "intermediate",
    codeExample: `-- Intermediate relay node represents a sub-tree failure point.`
  },
  {
    question: "How do you start all replication channels simultaneously on a Multi-Source replica?",
    shortAnswer: "Execute `START REPLICA;` (without specifying any `FOR CHANNEL` clause).",
    explanation: "Launches I/O and SQL threads for all configured channels in parallel.",
    hint: "START REPLICA launches all configured channels at once.",
    level: "basic",
    codeExample: `START REPLICA; -- Starts all channels`
  },
  {
    question: "What is the primary operational takeaway of Topic 6 in Module 004_006?",
    shortAnswer: "Replication topologies must be selected based on workload demands: use **Fan-Out** for horizontal read scaling, deploy **Cascading Relay Replicas** to protect primary bandwidth when serving &gt;10 edge nodes, leverage **Multi-Source Named Channels** (`FOR CHANNEL`) to consolidate branch data into central warehouses, and restrict **Dual-Master** architectures strictly to Active-Passive mode with auto-increment offsets to avoid catastrophic write-collision data divergence.",
    explanation: "Matching the correct replication topology to the business requirement ensures scalability, durability, and operational simplicity.",
    hint: "Summarize Fan-Out for read scaling, Cascading for bandwidth, Multi-Source channels for consolidation, and Active-Passive Dual-Master with auto-increment offsets.",
    level: "basic",
    codeExample: `-- Master Topology Selection Blueprint:
# 1. Read Scaling: Primary → ProxySQL → 5 Read Replicas
# 2. Large Cluster (>20 nodes): Primary → Relay Replica (log_replica_updates=ON) → 20 Edge Replicas
# 3. Data Warehouse: Mumbai + Kolkata + Delhi → Central Warehouse (FOR CHANNEL 'city')
# 4. Safe Dual-Master: Master A (RW) <-> Master B (RO / super_read_only=ON, offset=2)`
  }
];

export default questions;
