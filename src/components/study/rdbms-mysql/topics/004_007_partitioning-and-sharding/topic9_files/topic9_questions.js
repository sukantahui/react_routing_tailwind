// topic9_files/topic9_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 9: Horizontal Sharding Foundations: Application-Level vs Middleware-Level Sharding

const questions = [
  {
    question: "What is Horizontal Sharding and how does it fundamentally differ from Table Partitioning in MySQL?",
    shortAnswer: "Table Partitioning divides a table into multiple physical `.ibd` files on a **single MySQL Server instance** (sharing CPU, RAM, and disk controller); Horizontal Sharding splits a table across **multiple autonomous MySQL Server nodes** in a **Shared-Nothing architecture**, providing independent compute, memory, and I/O resources to scale out horizontally.",
    explanation: "Partitioning scales up on a single server; Sharding scales out across unlimited server nodes.",
    hint: "Partitioning runs on 1 server sharing CPU/RAM; Sharding runs across multiple independent server nodes.",
    level: "basic",
    codeExample: `// Sharding Architecture: Shard 0 (Node A: 192.168.1.10), Shard 1 (Node B: 192.168.1.11)`
  },
  {
    question: "What is Application-Level Sharding and what are its primary pros and cons?",
    shortAnswer: "The application code (or ORM/Data Access Layer) evaluates the shard key to select the target database connection pool directly. **Pros**: Zero proxy middleware network latency, total routing flexibility; **Cons**: Application code is tightly coupled to shard topologies, and cross-shard queries/aggregations must be hand-coded.",
    explanation: "Gives microservices direct control over database connections with zero proxy overhead.",
    hint: "App code selects the connection pool; zero proxy latency but cross-shard joins must be written manually.",
    level: "basic",
    codeExample: `// Java/Node.js App Routing:
function getDataSource(tenantId) {
  const shardId = hash(tenantId) % SHARD_COUNT;
  return connectionPools[shardId];
}`
  },
  {
    question: "What is Middleware-Level Sharding and how does it operate?",
    shortAnswer: "A specialized database proxy layer (e.g. **Apache ShardingSphere**, **Vitess**, or **ProxySQL**) sits between the application and database nodes; it intercepts standard SQL statements, rewrites queries for specific shard nodes, and merges distributed result streams transparently to the client application.",
    explanation: "Provides transparent MySQL compatibility without requiring application code changes.",
    hint: "Proxy layer (ShardingSphere, Vitess) intercepts SQL, routes to shards, and merges results transparently.",
    level: "intermediate",
    codeExample: `// App sends standard SQL -> ShardingSphere Proxy -> Dispatches to Shard 1 & Shard 2 -> Merges -> App`
  },
  {
    question: "What is a 'Shard Key' (Partitioning Key) and why is its selection the most critical architectural decision in a sharded database?",
    shortAnswer: "The Shard Key is the specific column (e.g. `tenant_id`, `customer_id`, `store_id`) used to determine which physical shard node holds a given record; selecting a shard key that aligns with 95%+ of transactional queries enables **Point Routing** directly to a single node, avoiding catastrophic cross-shard broadcast queries.",
    explanation: "A poorly chosen shard key triggers massive cross-shard scatter-gather query overhead.",
    hint: "The column that determines row-to-node routing; must align with common query filter patterns.",
    level: "basic",
    codeExample: `-- Shard Key: customer_id (Enables single-shard point routing for 99% of customer queries)`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, customer orders scaled to 100,000,000 records across ₹1.2 Crores in sales transactions. How did Susmita implement Application-Level Sharding across 4 MySQL server instances?",
    shortAnswer: "Susmita configured a routing data source in their Node.js backend using `store_id % 4` to dispatch cashier requests directly to Shard 0 (Barrackpore Main), Shard 1 (N.C.Pukur), Shard 2 (Titagarh), and Shard 3 (Kolkata Hub); cashiers experienced sub-5ms transaction response times with zero proxy network latency.",
    explanation: "Application-level routing delivered blazing-fast direct socket connections to dedicated shard nodes.",
    hint: "Routed store_id % 4 directly in backend connection pool to 4 dedicated MySQL servers.",
    level: "moderate",
    codeExample: `# Barrackpore Application Router:
const shards = [dbBarrackpore, dbNCPukur, dbTitagarh, dbKolkata];
const targetDb = shards[storeId % 4];
await targetDb.query("INSERT INTO pos_orders VALUES (...)");`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, digital transaction ledgers scaled to 1,000,000,000 records across ₹500 Crores in volume. Why did Debangshu deploy Middleware-Level Sharding via Apache ShardingSphere?",
    shortAnswer: "Because over 40 distinct microservices queried the core ledger; rewriting all 40 codebases for application-level routing would have required months of refactoring. Deploying ShardingSphere allowed all microservices to connect using standard MySQL JDBC drivers while ShardingSphere automatically routed queries and handled distributed cross-shard reports.",
    explanation: "Middleware sharding preserved standard SQL compatibility across legacy microservices.",
    hint: "Preserved standard MySQL JDBC interface across 40 microservices without rewriting application code.",
    level: "expert",
    codeExample: `// Microservice connects to ShardingSphere: jdbc:mysql://shard-proxy:3307/bank_ledger`
  },
  {
    question: "What is a 'Point Query' (Single-Shard Routing) in a sharded cluster?",
    shortAnswer: "A query whose `WHERE` clause specifies the **exact Shard Key** (e.g. `WHERE customer_id = 105`); the router computes the target shard node and dispatches the query to **only that single node**, executing in 1–5 milliseconds.",
    explanation: "The optimal query path in a horizontally sharded database architecture.",
    hint: "Query specifies the shard key and executes against only one single shard node.",
    level: "basic",
    codeExample: `SELECT * FROM accounts WHERE customer_id = 105; -- Routes ONLY to Shard 1`
  },
  {
    question: "What is a 'Scatter-Gather' (Broadcast) query in a sharded cluster?",
    shortAnswer: "A query that **omits the Shard Key** (e.g. `SELECT SUM(balance) FROM accounts WHERE account_type = 'SAVINGS'`); the router must broadcast the query to **every shard node in parallel**, wait for all nodes to respond, and merge/aggregate the results in memory before returning them to the client.",
    explanation: "Incurs network latency and is bound by the slowest responding shard node.",
    hint: "Query omits shard key, forcing router to send query to all shards and merge results.",
    level: "intermediate",
    codeExample: `SELECT SUM(balance) FROM accounts; -- Broadcasts to Shard 0, 1, 2, 3 and merges sums`
  },
  {
    question: "Why does the performance of a Scatter-Gather query degrade to match the slowest shard node in the cluster (the 'Tail Latency Problem')?",
    shortAnswer: "Because the sharding merge engine cannot finalize the aggregated result set until the **slowest, most heavily loaded shard node finishes executing and returns its packet** over the network.",
    explanation: "Scatter-gather query latency is governed by max(shard_latencies) + merge_time.",
    hint: "The router must wait for the slowest shard node to finish before merging results.",
    level: "expert",
    codeExample: `-- Overall Latency = MAX(Node0, Node1, Node2, Node3) + Merge Processing Time`
  },
  {
    question: "What is a Distributed Two-Phase Commit (2PC) transaction in sharded architectures?",
    shortAnswer: "An atomic consensus protocol used when a transaction writes across multiple shards: **Phase 1 (Prepare)**: Coordinator asks all participating shards to write to undo/redo logs and vote YES/NO; **Phase 2 (Commit)**: If all vote YES, coordinator sends COMMIT; if any fails, coordinator sends ROLLBACK.",
    explanation: "Guarantees cross-shard ACID atomicity, but increases commit latency due to multi-round network hops.",
    hint: "Prepare phase (vote) followed by Commit phase across all participating shard nodes.",
    level: "expert",
    codeExample: `// 2PC Coordinator: Prepare Shard 0 & Shard 1 -> Receive YES -> Commit Shard 0 & Shard 1`
  },
  {
    question: "Why do high-throughput modern distributed architectures avoid Distributed 2PC in favor of Saga patterns or Eventual Consistency?",
    shortAnswer: "Because 2PC holds row locks across multiple database nodes across multiple network round-trips, creating severe lock contention, susceptibility to coordinator crash blocking, and reduced transaction throughput (blocking OLTP at scale).",
    explanation: "Sagas use local ACID transactions on each shard coupled with compensating transactions.",
    hint: "2PC holds locks across network round-trips, reducing write throughput at scale.",
    level: "expert",
    codeExample: `// Saga Pattern: Local commit on Shard A -> Publish Event -> Local commit on Shard B`
  },
  {
    question: "What is a 'Global Table' (Broadcast Table) in sharded architectures?",
    shortAnswer: "A small, infrequently modified lookup table (e.g. `currency_rates`, `country_codes`, `zip_codes`) that is **replicated 100% identically across every single shard node**, allowing local joins on every shard without cross-node network traffic.",
    explanation: "Eliminates cross-shard joins for reference and configuration data.",
    hint: "Small reference table replicated across all shard nodes to allow local joins.",
    level: "intermediate",
    codeExample: `-- Global table 'branches' exists on Shard 0, Shard 1, Shard 2, and Shard 3!`
  },
  {
    question: "What is an 'ER Table Group' (Co-Sharding) in sharded databases?",
    shortAnswer: "Configuring related parent-child tables (e.g. `customers`, `orders`, `order_items`) to **share the exact same Shard Key (`customer_id`)**, ensuring that all orders and items for a customer reside on the **exact same physical shard node**, enabling high-speed local joins without cross-network traffic.",
    explanation: "Co-locates related business entities onto the same physical database node.",
    hint: "Parent and child tables share the same shard key, co-locating related rows on the same node.",
    level: "intermediate",
    codeExample: `-- All rows for customer 101 exist together on Shard 1:`
  },
  {
    question: "What happens if a query performs a `LIMIT 100, 20` pagination on a sharded cluster with 10 shards during a Scatter-Gather query?",
    shortAnswer: "The sharding proxy must request **`LIMIT 0, 120` from EVERY individual shard node (1,200 rows fetched over the network)**, merge and sort all 1,200 rows in proxy memory, and then discard the first 100 rows to return 20 rows to the client (the 'Deep Paging Penalty').",
    explanation: "Deep pagination across sharded clusters multiplies network data transfer and proxy memory consumption.",
    hint: "Proxy must fetch LIMIT 0, offset+limit from all nodes and merge in memory.",
    level: "expert",
    codeExample: `-- Deep Paging on 10 Shards: Requests 0 to 1020 from all 10 nodes (10,200 rows transferred)!`
  },
  {
    question: "How do you achieve High Availability (HA) for individual shard nodes in a sharded cluster?",
    shortAnswer: "Each logical shard is deployed as a **High-Availability Replica Cluster** (e.g. a 3-node **MySQL InnoDB Cluster** or Primary-Replica pair with Group Replication); if a Primary node fails on Shard 2, an automated failover promotes a secondary replica with **zero impact on other shards**.",
    explanation: "Guarantees fault tolerance and high availability per individual shard unit.",
    hint: "Each shard node is backed by an InnoDB Cluster or Primary-Replica failover group.",
    level: "basic",
    codeExample: `Shard 0: [Primary A0, Replica A1, Replica A2]
Shard 1: [Primary B0, Replica B1, Replica B2]`
  },
  {
    question: "What is the 'Shard Rebalancing' (Resharding) challenge when adding new shard nodes to an existing cluster?",
    shortAnswer: "When expanding from 4 to 8 shards, data must be migrated from old shards to new shards; this requires online live-migration tools (like Vitess vreplication or custom CDC pipelines) that copy baseline data and tail binary logs without taking the database offline.",
    explanation: "The most operationally complex phase of horizontal sharding lifecycle management.",
    hint: "Migrating data from existing shards to newly added shards online using CDC/binlog streaming.",
    level: "expert",
    codeExample: `-- Online CDC streaming from Shard 0/1 to newly provisioned Shard 2/3.`
  },
  {
    question: "What is Vitess and how does it manage horizontal sharding for MySQL?",
    shortAnswer: "Vitess is an open-source distributed database middleware (originally built by YouTube) that sits above massive fleets of MySQL instances, providing automated SQL parsing, distributed routing (VTGate), connection pooling (VTTablet), and seamless online live resharding.",
    explanation: "Powers planetary-scale MySQL deployments at Slack, GitHub, and YouTube.",
    hint: "Open-source distributed MySQL middleware providing VTGate routing and automated live resharding.",
    level: "intermediate",
    codeExample: `// Client -> VTGate (Distributed Query Router) -> VTTablet (MySQL Manager) -> mysqld`
  },
  {
    question: "What is Apache ShardingSphere and what are its two primary deployment modes?",
    shortAnswer: "Apache ShardingSphere is a distributed database ecosystem with two modes: **ShardingSphere-JDBC** (a lightweight Java library embedding routing directly inside the client application) and **ShardingSphere-Proxy** (a transparent standalone database proxy accepting standard MySQL client connections).",
    explanation: "Provides both application-level and middleware-level sharding options.",
    hint: "ShardingSphere-JDBC (embedded application library) and ShardingSphere-Proxy (standalone database proxy).",
    level: "intermediate",
    codeExample: `-- ShardingSphere-JDBC: Embedded in Java app (Zero network hop)
-- ShardingSphere-Proxy: Standalone Docker container (Any programming language)`
  },
  {
    question: "Why is an Auto-Increment column on a single MySQL node insufficient for generating unique Primary Keys across a sharded cluster?",
    shortAnswer: "Because each autonomous MySQL shard node manages its own independent auto-increment sequence starting from 1, leading to **identical duplicate IDs across different shards** (e.g. Shard 0 generates `id=101`, and Shard 1 also generates `id=101`).",
    explanation: "Sharded databases require globally unique ID generation mechanisms.",
    hint: "Each shard generates IDs starting from 1 independently, causing duplicate ID collisions.",
    level: "basic",
    codeExample: `-- Collision: Both Shard 0 and Shard 1 create order_id = 1001!`
  },
  {
    question: "What distributed ID generation strategies solve the multi-shard Primary Key collision problem?",
    shortAnswer: "1. **Twitter Snowflake / ULID** (64-bit timestamp + node ID + sequence); 2. **UUIDv7 / UUIDv4** (128-bit globally unique strings); 3. **Segment ID Allocation Services** (e.g. centralized Redis or MySQL ticket servers); 4. **Auto-Increment Offsets** (`auto_increment_increment` and `auto_increment_offset` configured per node).",
    explanation: "Guarantees globally unique, chronologically sortable primary keys across all shards.",
    hint: "Snowflake IDs, UUIDv7, segment ticket servers, or auto_increment_offset per node.",
    level: "intermediate",
    codeExample: `// Shard 0: auto_increment_offset = 1, increment = 4 (IDs: 1, 5, 9, 13...)
// Shard 1: auto_increment_offset = 2, increment = 4 (IDs: 2, 6, 10, 14...)`
  },
  {
    question: "What is the 'Cross-Shard Aggregation' penalty on queries with `ORDER BY col LIMIT 10`?",
    shortAnswer: "The proxy router must fetch the top 10 rows from **every individual shard node**, buffer all candidate rows in memory, and perform a multi-way **Merge Sort** before returning the top 10 rows to the client.",
    explanation: "Increases CPU and temporary memory consumption in proxy merge engines.",
    hint: "Proxy fetches top 10 from all nodes and performs an in-memory multi-way merge sort.",
    level: "intermediate",
    codeExample: `-- Reads top 10 from Shard 0, 1, 2, 3 -> Merges 40 rows -> Returns global top 10.`
  },
  {
    question: "How do you handle schema migrations (DDL) across a 100-node sharded MySQL cluster?",
    shortAnswer: "Using automated DDL orchestrators (like **Gh-ost**, **pt-online-schema-change**, or Vitess `ALTER TABLE` workflows) that execute online schema changes across all shards concurrently in batches with canary health validation.",
    explanation: "Ensures homogeneous schema evolution across all cluster nodes with zero downtime.",
    hint: "Automated rolling schema migration using gh-ost or Vitess DDL workflows across all nodes.",
    level: "expert",
    codeExample: `// Orchestrator executes gh-ost online DDL across Shard 0 through Shard 99.`
  },
  {
    question: "Can an individual MySQL shard node use Table Partitioning internally?",
    shortAnswer: "**Yes**, this is the **Partitioned Shard Architecture**: each autonomous shard node holds a horizontal slice of customers (via Sharding), and inside each node, customer orders are partitioned by `RANGE` on date (via Table Partitioning).",
    explanation: "Combines horizontal scale-out across nodes with localized sliding-window lifecycle archival on each node.",
    hint: "Yes, combining Sharding across nodes with Partitioning inside each node is standard enterprise practice.",
    level: "basic",
    codeExample: `// Cluster: 8 Shard Nodes (Sharded by tenant_id)
// Each Node: orders table PARTITION BY RANGE (YEAR(order_date))`
  },
  {
    question: "What is the blast radius difference during a storage drive failure in Table Partitioning vs Horizontal Sharding?",
    shortAnswer: "In Table Partitioning, a server crash or database drive failure affects the **entire table (100% of all users)**; in Horizontal Sharding, a hardware failure on Shard 2 affects **only 1/N of total users (e.g. 12.5% on an 8-shard cluster)** while all other shards continue operating normally.",
    explanation: "Shared-nothing sharding dramatically reduces the catastrophic blast radius of hardware outages.",
    hint: "Partitioning crash affects 100% of users; Sharding failure affects only users on that single shard node.",
    level: "basic",
    codeExample: `-- Node 2 offline -> Only 1/4 of users affected; Shard 0, 1, 3 remain online.`
  },
  {
    question: "What is 'Range-Based Sharding' vs 'Hash-Based Sharding'?",
    shortAnswer: "**Range-Based Sharding** maps contiguous ranges of the shard key to specific nodes (e.g. IDs 1–1M on Node 1, 1M–2M on Node 2); **Hash-Based Sharding** applies a hash function (`hash(id) % N`) to distribute records uniformly across all nodes.",
    explanation: "Hash-based sharding prevents write hot spots on sequential primary keys.",
    hint: "Range maps ID intervals to nodes; Hash applies modulo/hash algorithms for uniform distribution.",
    level: "basic",
    codeExample: `-- Hash Sharding: Shard = CRC32(user_uuid) % 8`
  },
  {
    question: "What is 'Directory-Based (Lookup) Sharding'?",
    shortAnswer: "A centralized lookup database or key-value cache (e.g. Redis) stores a mapping table associating each entity with its specific shard location (e.g. `tenant_reliance -> Shard_03`), enabling dynamic row relocation and custom tiering.",
    explanation: "Provides total routing flexibility at the cost of an initial lookup network hop.",
    hint: "Central lookup service (Redis/MySQL) maps entity IDs to specific shard database nodes.",
    level: "intermediate",
    codeExample: `// Lookup: Redis.get("tenant_tata") -> Returns "shard-04.fintech.internal"`
  },
  {
    question: "Why should analytical reporting queries (OLAP) be routed to dedicated Read Replicas or Data Warehouses rather than the Sharded OLTP Cluster?",
    shortAnswer: "Because heavy analytical queries require scatter-gather scans across all shards, consuming CPU/memory across every node and saturating network bandwidth, degrading transactional SLA response times for core online users.",
    explanation: "Separate OLTP transactional sharding from OLAP analytical data lakes via CDC pipelines.",
    hint: "Scatter-gather analytics consume resources across all nodes, degrading live transactional SLAs.",
    level: "basic",
    codeExample: `-- Replicate shard binlogs to ClickHouse/Snowflake for heavy cross-shard analytics.`
  },
  {
    question: "What is the recommended threshold when an engineering team should transition from a single partitioned MySQL instance to Horizontal Sharding?",
    shortAnswer: "When total dataset size exceeds **2TB to 5TB**, write IOPS exceed **20,000 to 50,000 writes/sec** (saturating top-tier NVMe hardware), or when single-node RAM can no longer hold active working sets, requiring horizontal compute/memory scale-out.",
    explanation: "Partitioning and vertical scaling should always be maximized before introducing sharding complexity.",
    hint: "When data exceeds 2TB-5TB or write IOPS saturate physical server hardware limits.",
    level: "intermediate",
    codeExample: `-- Transition when write IOPS > 50,000/s and single-server CPU/disk is saturated.`
  },
  {
    question: "What is the primary operational takeaway of Topic 9 in Module 004_007?",
    shortAnswer: "Horizontal Sharding scales MySQL across multiple autonomous server nodes in a **Shared-Nothing architecture**: choose **Application-Level Sharding** for zero-latency direct routing or **Middleware-Level Sharding** (ShardingSphere, Vitess) for transparent SQL compatibility; select a high-cardinality **Shard Key** aligned with 95%+ of queries to maximize **Point Routing**, avoid cross-shard broadcast penalties, use **distributed ID generators** (Snowflake/UUIDv7), and co-locate parent-child entities via **ER Table Groups**.",
    explanation: "Mastering horizontal sharding foundations enables architects to scale transactional database architectures to hundreds of millions of users and billions of records.",
    hint: "Summarize Shared-Nothing architecture, App vs Middleware sharding, Shard Key selection, Point vs Broadcast routing, and distributed ID generation.",
    level: "basic",
    codeExample: `-- Master Sharding Architecture Blueprint:
# 1. Shard Key: tenant_uuid
# 2. Routing: CRC32(tenant_uuid) % 16 -> 16 Independent MySQL Nodes
# 3. High Availability: 3-Node InnoDB Cluster per Shard
# 4. Global Tables: country_codes, currencies replicated on all shards
# 5. ID Generation: 64-bit Twitter Snowflake / UUIDv7`
  },
  {
    question: "How does ProxySQL support basic query-rule sharding for MySQL?",
    shortAnswer: "ProxySQL evaluates SQL regex match patterns on incoming queries and routes them to specific backend hostgroups representing different shard servers based on the SQL query text.",
    explanation: "Provides lightweight SQL routing without full distributed query rewriting.",
    hint: "Uses query rules and regex pattern matching to route queries to specific hostgroup backends.",
    level: "basic",
    codeExample: `INSERT INTO mysql_query_rules (rule_id, match_pattern, destination_hostgroup) 
VALUES (1, '^SELECT.*FROM accounts_shard0', 10);`
  }
];

export default questions;
