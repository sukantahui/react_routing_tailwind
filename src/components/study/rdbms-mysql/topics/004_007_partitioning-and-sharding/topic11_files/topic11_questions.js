// topic11_files/topic11_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 11: Sharding Challenges: Distributed Transactions (2PC, Saga), Cross-Shard Joins, and Global Unique IDs

const questions = [
  {
    question: "Why does single-node ACID atomicity fail when executing transactions across multiple sharded MySQL nodes?",
    shortAnswer: "Because each MySQL shard node runs an **independent storage engine with its own isolated undo and redo logs**; a standard `COMMIT` on Shard 0 cannot guarantee that a corresponding write on Shard 1 will not crash, fail network delivery, or violate a constraint, resulting in partial commits (data inconsistency).",
    explanation: "Shared-nothing architectures require distributed coordination protocols to maintain multi-node consistency.",
    hint: "Each shard has independent undo/redo logs; a commit on one node cannot guarantee commit on another.",
    level: "basic",
    codeExample: `// Risk: Shard 0 commits withdrawal, but Shard 1 crashes before deposit completes!`
  },
  {
    question: "How does Distributed Two-Phase Commit (2PC / XA Transactions) operate in MySQL?",
    shortAnswer: "1. **Prepare Phase**: The transaction coordinator issues `XA PREPARE xid` to all participating shard nodes; each node flushes undo/redo logs and locks rows, voting YES; 2. **Commit Phase**: If all vote YES, coordinator sends `XA COMMIT xid`; if any node fails or votes NO, coordinator sends `XA ROLLBACK xid` to all nodes.",
    explanation: "Provides strict multi-node ACID consistency at the expense of multi-round-trip network latency.",
    hint: "Prepare phase (flush logs and vote) followed by Commit phase across all participating nodes.",
    level: "intermediate",
    codeExample: `-- MySQL Native XA Syntax:
XA START 'txn_1001';
UPDATE accounts SET balance = balance - 1000 WHERE id = 101; -- On Shard 0
XA END 'txn_1001';
XA PREPARE 'txn_1001';
-- Coordinator issues:
XA COMMIT 'txn_1001';`
  },
  {
    question: "Why is Distributed 2PC (XA) rarely used in high-throughput modern cloud architectures?",
    shortAnswer: "Because 2PC **holds row locks across multiple network round trips** during the prepare and commit phases; if any shard node or network link experiences latency, all locked rows remain inaccessible, causing thread pool exhaustion and reducing throughput from 50,000 txns/sec down to ~200 txns/sec.",
    explanation: "Synchronous lock holding severely limits horizontal write scalability.",
    hint: "Holds locks across network hops, causing severe lock contention and reducing throughput.",
    level: "expert",
    codeExample: `-- Lock Duration in 2PC = Network Latency(Prepare) + Network Latency(Commit) + Disk I/O`
  },
  {
    question: "What is the Saga Pattern and how does it achieve consistency across sharded databases without distributed locks?",
    shortAnswer: "A Saga breaks a distributed business transaction into a **series of local ACID transactions on each shard**; if a step fails later in the chain, the Saga executes **Compensating Transactions** (e.g. issuing a refund credit) to semantically undo previous successful steps, achieving **Eventual Consistency** without cross-node row locks.",
    explanation: "The industry standard for high-throughput distributed microservice transactions.",
    hint: "Executes local transactions on each shard, using compensating transactions to undo failures.",
    level: "intermediate",
    codeExample: `// Saga Flow: 
// 1. Shard 0: Withdraw ₹5,000 (Committed locally!)
// 2. Shard 1: Deposit ₹5,000 → FAILS (Account frozen)!
// 3. Compensation on Shard 0: Refund ₹5,000 (Restores balance)!`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, customer wallet transfers scaled across ₹1.2 Crores in sales transactions. How did Susmita replace 2PC with the Transactional Outbox Pattern to synchronize Shard 0 and Shard 1 reliably?",
    shortAnswer: "When deducting ₹5,000 on Shard 0, Susmita inserted a `WalletDeducted` event into a local `outbox_events` table on Shard 0 in the **exact same local ACID transaction**; a Debezium CDC worker polled the binlog and published the event to Kafka, which deposited the funds onto Shard 1 with automated retries and idempotent keys.",
    explanation: "The Transactional Outbox pattern guarantees at-least-once event delivery with zero distributed locks.",
    hint: "Wrote business update and outbox event in same local transaction; streamed via CDC to other shard.",
    level: "moderate",
    codeExample: `# Barrackpore Transactional Outbox:
START TRANSACTION;
UPDATE wallet SET balance = balance - 5000 WHERE user_id = 101;
INSERT INTO outbox_events (event_type, payload) VALUES ('WALLET_DEDUCTED', '{"amount":5000}');
COMMIT;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, corporate ledgers handled 1,000,000,000 records across ₹500 Crores in volume. Why did Debangshu replace random UUIDv4 with Twitter Snowflake IDs for Primary Keys?",
    shortAnswer: "Because random UUIDv4 strings scatter inserts randomly across clustered B-Tree leaf pages, causing massive **B-Tree Page Splits, 50%+ index fragmentation, and severe buffer pool cache page thrashing**; Twitter Snowflake IDs are **chronologically strictly sortable 64-bit integers**, enabling append-only B-Tree insertions and keeping index pages packed at 99% efficiency.",
    explanation: "Chronological sortability maintains dense clustered B-Tree storage on high-volume inserts.",
    hint: "Snowflake IDs are chronologically sortable integers, eliminating UUID B-Tree page split fragmentation.",
    level: "expert",
    codeExample: `-- Snowflake ID (64-bit Integer): 18446744073709551615 (Compact, Sortable, Fits in BIGINT)`
  },
  {
    question: "What is the complete 64-bit binary bit structure of a Twitter Snowflake ID?",
    shortAnswer: "1. **1 Sign Bit (0)**; 2. **41 Bits Timestamp** (Milliseconds since custom epoch, providing 69 years of range); 3. **10 Bits Worker/Shard Node ID** (Supports up to 1,024 independent server nodes); 4. **12 Bits Sequence Number** (Generates up to 4,096 unique IDs per millisecond per node, or 4.09M IDs/sec/node).",
    explanation: "Enables globally unique, decentralized, chronological ID generation without database coordination.",
    hint: "1 bit sign + 41 bits timestamp + 10 bits worker node + 12 bits sequence number = 64 bits.",
    level: "expert",
    codeExample: `+-------+-----------------------------+--------------+------------------+
| 1 bit | 41 bits (Epoch Milliseconds)| 10 bits Node | 12 bits Sequence |
+-------+-----------------------------+--------------+------------------+`
  },
  {
    question: "What is UUIDv7 (RFC 9562) and why is it superior to legacy UUIDv4 for sharded database Primary Keys?",
    shortAnswer: "UUIDv7 is a **128-bit timestamp-ordered UUID** whose first 48 bits encode Unix epoch milliseconds; unlike random UUIDv4, UUIDv7 provides natural chronological sorting while retaining the global uniqueness of 128-bit strings, preventing B-Tree page split fragmentation in InnoDB.",
    explanation: "Combines the convenience of UUID strings with the storage efficiency of chronological indexes.",
    hint: "First 48 bits contain Unix timestamp, making UUIDv7 chronologically sortable in InnoDB B-Trees.",
    level: "intermediate",
    codeExample: `// UUIDv7: 018d3b2a-7e11-7a1b-8b9a-123456789abc (Sortable, 128-bit)`
  },
  {
    question: "Why do SQL `JOIN` statements fail when joining tables located on different physical shard nodes?",
    shortAnswer: "Because MySQL's SQL parser and join execution engine operate **exclusively within the boundaries of a single local server process**; MySQL cannot reach over the network to perform nested loop joins, hash joins, or index lookups against a remote server node.",
    explanation: "Shared-nothing nodes do not have direct memory or disk access to other nodes.",
    hint: "MySQL join engine only runs locally; it cannot perform network joins across remote servers.",
    level: "basic",
    codeExample: `-- ❌ Cannot join Shard 0 (users) with Shard 1 (orders) in standard MySQL SQL!`
  },
  {
    question: "What is 'ER Table Group Co-Sharding' and how does it solve the cross-shard join problem?",
    shortAnswer: "Parent and child tables (e.g. `customers`, `orders`, `order_items`) are configured to **share the exact same Shard Key (`customer_id`)**; this guarantees that a customer and all their associated orders and items reside on the **exact same physical shard node**, allowing 100% of parent-child joins to execute locally at line speed.",
    explanation: "Eliminates cross-shard joins by design for hierarchical domain models.",
    hint: "Forces parent and child tables to use the same shard key, co-locating related rows on one node.",
    level: "intermediate",
    codeExample: `CREATE TABLE orders (order_id BIGINT, customer_id INT, PRIMARY KEY(order_id, customer_id));
CREATE TABLE order_items (item_id BIGINT, customer_id INT, PRIMARY KEY(item_id, customer_id));
-- Both sharded by customer_id → Local Joins!`
  },
  {
    question: "What is a 'Global Table' (Broadcast Table) and what type of data belongs in one?",
    shortAnswer: "A Global Table is a small, read-heavy reference table (e.g. `currencies`, `countries`, `product_categories`, `tax_rates`) that is **replicated 100% identically across every single shard node in the cluster**, allowing any sharded table to join with it locally without cross-node network traffic.",
    explanation: "Enables local joins on every shard for static reference data.",
    hint: "Small reference table replicated on all shard nodes to enable local joins.",
    level: "basic",
    codeExample: `-- Replicate 'tax_slabs' on Shard 0, Shard 1, Shard 2, Shard 3!`
  },
  {
    question: "What is 'Application-Level Multi-Get Stitching' for cross-shard data retrieval?",
    shortAnswer: "The application backend queries Shard 0 to fetch a list of parent IDs (e.g. `order_ids`), extracts the foreign keys, and executes a second batch query on Shard 1 using **`WHERE id IN (id1, id2, id3)`**, 'stitching' the two result sets together in application memory.",
    explanation: "Replaces distributed SQL joins with high-speed parallel point lookups.",
    hint: "App queries Shard A for parent IDs, then queries Shard B using WHERE id IN (...) and joins in memory.",
    level: "intermediate",
    codeExample: `const orders = await shardA.query("SELECT * FROM orders WHERE user_id = 101");
const productIds = orders.map(o => o.product_id);
const products = await shardB.query("SELECT * FROM products WHERE id IN (?)", [productIds]);`
  },
  {
    question: "What is Data Denormalization in sharded architectures and what is its primary trade-off?",
    shortAnswer: "Copying essential foreign attributes directly into the child table (e.g. storing `customer_name` directly in `orders`); **Advantage**: Eliminates the need for joins entirely; **Trade-off**: Requires updating multiple records when the customer name changes and increases storage consumption.",
    explanation: "Trades disk storage and update complexity for sub-millisecond read latency.",
    hint: "Stores copy of parent data in child table to eliminate joins; requires sync on updates.",
    level: "basic",
    codeExample: `-- Denormalized: orders table stores customer_name and store_name directly.`
  },
  {
    question: "How does the 'Auto-Increment Stride' method generate unique primary keys across multiple MySQL shards without central coordination?",
    shortAnswer: "By configuring `auto_increment_increment = N` (total shard count) and `auto_increment_offset = K` (shard index 1 to $N$) in `my.cnf` on each node; Shard 1 generates IDs `1, 5, 9, 13...`, Shard 2 generates `2, 6, 10, 14...`, Shard 3 generates `3, 7, 11, 15...`, guaranteeing zero ID collisions.",
    explanation: "Simple, lightweight native MySQL mechanism for fixed-size static shard clusters.",
    hint: "Configure auto_increment_increment = N and auto_increment_offset = ShardID on each node.",
    level: "intermediate",
    codeExample: `# Shard 1 my.cnf:
auto_increment_increment = 4
auto_increment_offset = 1

# Shard 2 my.cnf:
auto_increment_increment = 4
auto_increment_offset = 2`
  },
  {
    question: "What is the primary operational drawback of the Auto-Increment Stride method?",
    shortAnswer: "When expanding the cluster (e.g. scaling from 4 to 8 shards), the `auto_increment_increment` value must be changed across all nodes, creating a high risk of ID collisions with existing numbers and requiring complex ID re-spacing.",
    explanation: "Snowflake IDs or UUIDv7 are vastly superior for elastic cloud environments.",
    hint: "Hard to resize cluster: changing stride count from 4 to 8 can cause key collisions.",
    level: "expert",
    codeExample: `-- Resizing strides is highly prone to collision bugs.`
  },
  {
    question: "What is a 'Centralized Ticket Server' (Flickr Ticket Server pattern) for distributed ID generation?",
    shortAnswer: "A dedicated pair of lightweight MySQL instances whose sole purpose is generating unique sequential 64-bit IDs using `REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID();`.",
    explanation: "Historically popular pattern before decentralized Snowflake algorithms emerged.",
    hint: "Dedicated lightweight MySQL servers generating sequential IDs via REPLACE INTO.",
    level: "intermediate",
    codeExample: `REPLACE INTO Tickets64 (stub) VALUES ('a');
SELECT LAST_INSERT_ID();`
  },
  {
    question: "What is an 'Orchestrated Saga' vs a 'Choreographed Saga'?",
    shortAnswer: "**Orchestrated Saga**: A centralized Saga Orchestrator service manages the state machine, invoking each shard service sequentially and issuing compensations on failure; **Choreographed Saga**: Shard services emit and listen to domain events (e.g. via Kafka) without a central coordinator, reacting autonomously.",
    explanation: "Orchestration is easier to monitor; choreography provides looser coupling.",
    hint: "Orchestrated uses a central coordinator service; Choreographed uses decentralized pub/sub events.",
    level: "expert",
    codeExample: `// Orchestrated: SagaCoordinator → Calls Shard 0 → Calls Shard 1 → Calls Shard 2`
  },
  {
    question: "What is a 'Compensating Transaction' in a Saga workflow?",
    shortAnswer: "An explicit, idempotent business operation designed to **semantically reverse the side effects of a previously committed local transaction** (e.g. if Step 1 reserved ₹1,000 and Step 2 failed, the compensating transaction executes `UPDATE wallet SET balance = balance + 1000`).",
    explanation: "Guarantees business consistency without database rollback locks.",
    hint: "An explicit operation that semantically reverses a previously committed local transaction.",
    level: "basic",
    codeExample: `// Compensation: Unreserve inventory or refund wallet balance.`
  },
  {
    question: "Why must Compensating Transactions in a Saga be strictly IDEMPOTENT?",
    shortAnswer: "Because network retries, message broker redeliveries, and crash-recovery loops can cause the compensating transaction to be **executed more than once**; idempotency ensures that executing a refund 3 times yields the identical balance as executing it once.",
    explanation: "Prevents double-refunds and data corruption during network failure recovery.",
    hint: "Network retries can execute compensations multiple times; idempotency prevents double refunds.",
    level: "expert",
    codeExample: `// Idempotent Refund: Check if refund_id already processed before crediting balance.`
  },
  {
    question: "What is the 'Two-Phase Commit Coordinator Failure' vulnerability?",
    shortAnswer: "If the 2PC Coordinator crashes after nodes enter the `PREPARED` state but before issuing `COMMIT`, all participating shard nodes **remain blocked holding exclusive row locks indefinitely**, unable to commit or abort until the coordinator recovers or an operator intervenes.",
    explanation: "The infamous blocking flaw inherent in classical 2PC protocols.",
    hint: "If coordinator crashes during prepare phase, shard nodes hold row locks indefinitely.",
    level: "expert",
    codeExample: `-- Shard node blocked in PREPARED state holding row lock on active customer account.`
  },
  {
    question: "How does the Transactional Outbox Pattern prevent the 'Dual-Write Problem' between MySQL and Kafka?",
    shortAnswer: "Writing to MySQL and publishing to Kafka in application code can fail mid-way (e.g. DB commits, but app crashes before Kafka publish). The Outbox pattern writes the event into the **local MySQL database in the same ACID transaction as the business data**, guaranteeing that if the transaction commits, the event is guaranteed to exist on disk for CDC capture.",
    explanation: "Eliminates dual-write inconsistency between relational databases and message brokers.",
    hint: "Writes business data and outbox event in 1 local transaction, guaranteeing CDC capture.",
    level: "expert",
    codeExample: `// Atomic Local Commit:
START TRANSACTION;
INSERT INTO orders VALUES (...);
INSERT INTO outbox_table VALUES ('ORDER_CREATED', ...);
COMMIT;`
  },
  {
    question: "What is the role of Debezium in the Transactional Outbox Pattern?",
    shortAnswer: "Debezium is a distributed **Change Data Capture (CDC) platform** that tails MySQL's binary logs (`binlogs`) in real time, extracts rows inserted into `outbox_table`, and streams them to Apache Kafka with guaranteed at-least-once delivery and sub-100ms latency.",
    explanation: "Decouples transaction execution from message publishing.",
    hint: "Tails MySQL binary logs and streams outbox table inserts to Kafka in real time.",
    level: "intermediate",
    codeExample: `// MySQL Binlog → Debezium CDC Connector → Apache Kafka Topic`
  },
  {
    question: "Why should `BIGINT UNSIGNED` always be used for Snowflake IDs in MySQL schemas?",
    shortAnswer: "Because a 64-bit Snowflake ID requires the full 64-bit integer range; using signed `BIGINT` can result in negative numbers if the leading sign bit is set, while `BIGINT UNSIGNED` provides values from $0$ up to $18,446,744,073,709,551,615$.",
    explanation: "Ensures full 64-bit precision and avoids integer overflow errors.",
    hint: "BIGINT UNSIGNED provides the full 64-bit range required for Snowflake IDs.",
    level: "basic",
    codeExample: `CREATE TABLE orders (
  order_id BIGINT UNSIGNED NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (order_id)
);`
  },
  {
    question: "What happens if a Twitter Snowflake generator's system clock drifts backwards (NTP Clock Skew)?",
    shortAnswer: "Generating IDs with a backwards timestamp can create **duplicate ID collisions**; robust Snowflake generators detect clock drift and either pause generation until the clock catches up or throw an exception to protect key uniqueness.",
    explanation: "Handling NTP clock skew is a mandatory implementation requirement for Snowflake generators.",
    hint: "Backwards clock drift can generate duplicate IDs; generator must pause until clock catches up.",
    level: "expert",
    codeExample: `if (currentTimestamp < lastTimestamp) {
  throw new ClockMovedBackwardsException();
}`
  },
  {
    question: "How do you perform distributed sorting and aggregation on cross-shard queries in Middleware Proxies (ShardingSphere / Vitess)?",
    shortAnswer: "The proxy parses the SQL `ORDER BY` or `GROUP BY` clause, injects sorting into each remote query, streams candidate rows from all shards, and runs an in-memory **Multi-Way Merge Stream** to return sorted records without loading all rows into RAM.",
    explanation: "Streaming merge sorts minimize proxy memory footprints during cross-shard queries.",
    hint: "Proxy pushes sorting down to each shard and performs an in-memory streaming multi-way merge.",
    level: "intermediate",
    codeExample: `-- Proxy executes local ORDER BY on Shard 0 and Shard 1, then merge-sorts streams.`
  },
  {
    question: "What is 'Distributed Deadlock' in multi-shard transactions?",
    shortAnswer: "When Transaction A locks a row on Shard 0 and waits for a row on Shard 1, while Transaction B locks that row on Shard 1 and waits for the row on Shard 0; neither MySQL instance can detect the cycle locally, requiring a distributed deadlock detector or transaction lock timeout.",
    explanation: "Highlights why distributed locking is avoided in modern high-throughput architectures.",
    hint: "Circular lock dependency across multiple server nodes that local MySQL deadlock detectors cannot see.",
    level: "expert",
    codeExample: `-- Txn A: Shard 0 (Held) → Shard 1 (Waiting)
-- Txn B: Shard 1 (Held) → Shard 0 (Waiting) → Distributed Deadlock!`
  },
  {
    question: "Why should analytical aggregations (`COUNT(*)`, `SUM()`) across an entire sharded cluster be offloaded to OLAP databases?",
    shortAnswer: "Because computing global aggregations requires scatter-gather queries across all 100+ shards, consuming CPU/memory across the entire cluster; streaming shard binlogs via CDC to an OLAP columnar engine (e.g. **ClickHouse**, **Snowflake**, **StarRocks**) allows real-time aggregations in sub-50ms without touching the OLTP cluster.",
    explanation: "Protects transactional database nodes from analytical query exhaustion.",
    hint: "Scatter-gather aggregations overload all shards; stream binlogs to ClickHouse/Snowflake for OLAP.",
    level: "basic",
    codeExample: `// OLTP Shards → Debezium CDC → ClickHouse (Real-time analytics in 20ms)`
  },
  {
    question: "What is the 'Idempotency Key' pattern in distributed payment transactions?",
    shortAnswer: "Every client request includes a unique `idempotency_key` (UUID); the database stores this key with a UNIQUE constraint in the target shard, ensuring that if a network timeout causes the client to retry the payment, the transaction is processed **exactly once**.",
    explanation: "Prevents double-charging and duplicate order generation during network disconnects.",
    hint: "Unique client token stored with a unique constraint to ensure retries execute exactly once.",
    level: "intermediate",
    codeExample: `INSERT INTO payments (idempotency_key, amount) VALUES ('req_12345', 5000);
-- Duplicate retry fails cleanly on unique key constraint!`
  },
  {
    question: "What is the primary operational takeaway of Topic 11 in Module 004_007?",
    shortAnswer: "Horizontal Sharding introduces three major engineering challenges: 1. Replace slow, blocking **Distributed 2PC** with the **Saga Pattern** and the **Transactional Outbox Pattern** for eventual consistency; 2. Eliminate **Cross-Shard Joins** using **ER Table Group Co-Sharding** and **Global Broadcast Tables**; 3. Eliminate Primary Key collisions by standardizing on **Twitter Snowflake (64-bit)** or **UUIDv7 (128-bit)** chronologically sortable identifiers.",
    explanation: "Mastering distributed transactions, join elimination, and global ID generation empowers database engineers to build fault-tolerant, planetary-scale sharded architectures.",
    hint: "Summarize Sagas vs 2PC, Transactional Outbox CDC, Global tables and ER co-sharding, and Snowflake/UUIDv7 ID generation.",
    level: "basic",
    codeExample: `-- Master Sharding Strategy Blueprint:
# 1. Primary Keys: 64-bit Twitter Snowflake (BIGINT UNSIGNED)
# 2. Joins: Co-Sharded ER Groups on customer_id + Replicated Global Tables
# 3. Distributed Writes: Transactional Outbox + Debezium CDC + Kafka Sagas
# 4. Secondary Lookups: Redis GSI cache (email → customer_id)`
  },
  {
    question: "How does ULID compare to UUIDv7 for distributed database identifiers?",
    shortAnswer: "Both are 128-bit timestamp-ordered identifiers (48-bit timestamp + 80-bit randomness); **ULID** uses Crockford's Base32 encoding (26 characters, case-insensitive, URL-safe), while **UUIDv7** uses standard RFC 9562 hex hyphenated format (36 characters). Both maintain dense clustered B-Tree insertion performance in MySQL.",
    explanation: "Both formats eliminate random UUID page split penalties.",
    hint: "Both are 128-bit timestamp-ordered IDs; ULID is Base32 encoded (26 chars), UUIDv7 is RFC hex formatted.",
    level: "intermediate",
    codeExample: `// ULID: 01ARZ3NDEKTSV4RRFFQ69G5FAV (26 chars, Base32, Sortable)`
  }
];

export default questions;
