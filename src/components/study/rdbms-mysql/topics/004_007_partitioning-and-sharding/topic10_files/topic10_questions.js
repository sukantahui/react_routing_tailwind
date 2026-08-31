// topic10_files/topic10_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 10: Sharding Algorithms: Hash-Based, Range-Based, List-Based, and Consistent Hashing

const questions = [
  {
    question: "What is Modulo (Hash-Based) Sharding and what is its primary advantage and disadvantage?",
    shortAnswer: "Modulo Sharding computes the target node using **$\\text{Node ID} = \\text{hash}(\\text{shard\\_key}) \\pmod N$**. **Advantage**: Provides perfectly uniform pseudorandom row distribution across all $N$ nodes; **Disadvantage**: Adding or removing a node alters the modulo divisor for nearly all keys, forcing **~100% of the entire cluster's data to be migrated**.",
    explanation: "Excellent for static clusters; highly disruptive when resizing dynamic clusters.",
    hint: "Node = hash(key) % N; perfectly uniform but resizing moves ~100% of existing data.",
    level: "basic",
    codeExample: `// Modulo Sharding:
const shardId = CRC32(userUuid) % 8; // Routes to Node 0 through 7`
  },
  {
    question: "What is Consistent Hashing and how does it solve the massive data migration problem of Modulo Sharding?",
    shortAnswer: "Consistent Hashing maps both servers and data keys onto a **circular Hash Ring ($[0, 2^{32}-1]$)**; when a new server node is added, it only acquires keys from its immediate clockwise neighbor, migrating **only $1/N$ of the total cluster dataset** while leaving all other $N-1$ nodes 100% untouched.",
    explanation: "The foundational scaling algorithm for modern distributed cloud storage systems.",
    hint: "Maps nodes and keys onto a circular hash ring; adding a node moves only 1/N data.",
    level: "intermediate",
    codeExample: `// Consistent Hash Ring: Key hashes to position on [0, 2^32-1] → Assigned to first clockwise node`
  },
  {
    question: "What are 'Virtual Nodes' (VNodes) in Consistent Hashing and why are they essential in production?",
    shortAnswer: "Virtual Nodes map each physical server to **100 to 500 discrete points distributed randomly around the Hash Ring**; this prevents non-uniform clustering of keys on the ring and guarantees that when a node joins or leaves, data is distributed evenly across all remaining physical servers.",
    explanation: "Eliminates hot-spot data skew on consistent hash rings.",
    hint: "Assigns 100-500 virtual ring positions per physical node to ensure perfectly balanced data distribution.",
    level: "expert",
    codeExample: `// Physical Node A mapped to: NodeA#v1, NodeA#v2, NodeA#v3... up to NodeA#v256`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, customer accounts scaled across ₹1.2 Crores in sales transactions. Why did Susmita switch from Modulo Sharding to Consistent Hashing when expanding from 4 to 6 server nodes?",
    shortAnswer: "Because with Modulo Sharding (`hash % 4` to `hash % 6`), over 75% of customer accounts would have had to move between servers, requiring 12 hours of database downtime; with Consistent Hashing (256 virtual nodes per server), expanding to 6 nodes moved only 16.6% ($1/6$) of records online without taking the POS billing system offline.",
    explanation: "Consistent hashing minimized data migration churn during retail cluster expansion.",
    hint: "Consistent hashing moved only 1/6 of data instead of 75% under modulo sharding.",
    level: "moderate",
    codeExample: `# Barrackpore Hash Ring Router:
hashRing.addNode("shard-barrackpore-04", 256);
hashRing.addNode("shard-barrackpore-05", 256);`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, core ledgers managed 800,000,000 transactions across ₹500 Crores in volume. Why did Debangshu REJECT Range-Based Sharding on transaction IDs?",
    shortAnswer: "Because Range-Based Sharding (e.g. IDs 1–10M on Shard 0, 10M–20M on Shard 1) creates a severe **'Write Hot Spot'**: all active incoming banking transactions have current high auto-increment IDs and crowd into **only the single highest active shard node (100% write load)**, while older shard nodes sit completely idle.",
    explanation: "Range sharding concentrates append-only writes onto a single server.",
    hint: "All new sequential inserts hit only the newest active shard, creating a severe write bottleneck.",
    level: "expert",
    codeExample: `-- Hot Spot Trap: Shard 0 (idle), Shard 1 (idle), Shard 2 (100% CPU Saturation!)`
  },
  {
    question: "When IS Range-Based Sharding appropriately used in database architectures?",
    shortAnswer: "When datasets have **infrequent updates, uniform historical access distributions, and high volumes of range queries across the shard key** (e.g. geospatial coordinate tiles or historical financial audit data partitioned by fixed calendar eras).",
    explanation: "Enables multi-shard range pruning when data is naturally accessed in continuous intervals.",
    hint: "Ideal for read-heavy interval datasets where queries frequently scan contiguous ranges.",
    level: "intermediate",
    codeExample: `-- Shard 0: 2020-2022 Archive, Shard 1: 2023-2024 Archive`
  },
  {
    question: "What is List-Based (Categorical / Regional) Sharding and what is its primary use case?",
    shortAnswer: "List-Based Sharding routes records based on explicit discrete values (e.g. Shard 0: `Bengal`, Shard 1: `Delhi`, Shard 2: `Mumbai`); its primary use case is **Regulatory Data Residency and Sovereign Compliance (GDPR / RBI regulations)** requiring citizen data to be stored on physical hardware within specific legal territories.",
    explanation: "Guarantees physical storage localization per geopolitical jurisdiction.",
    hint: "Routes explicit categories like regions to specific nodes for legal data residency compliance.",
    level: "basic",
    codeExample: `// Regional Routing:
if (region === 'BENGAL') return shardKolkataNode;
if (region === 'MAHARASHTRA') return shardMumbaiNode;`
  },
  {
    question: "What is Directory-Based (Lookup) Sharding and how does it work?",
    shortAnswer: "A centralized lookup database or high-speed cache (e.g. **Redis**) maintains an explicit key-to-shard mapping table (`tenant_id → shard_node_ip`); the router queries the lookup directory first and then connects to the designated database node.",
    explanation: "Provides dynamic flexibility to move individual high-volume tenants between shards.",
    hint: "Central lookup service (Redis) stores explicit mappings from entity IDs to shard node addresses.",
    level: "intermediate",
    codeExample: `const targetNode = await redis.get(\`shard_map:\${tenantId}\`); // Returns "shard-03"`
  },
  {
    question: "What is the primary drawback of Directory-Based Sharding?",
    shortAnswer: "It introduces a **single point of failure and an extra network lookup hop latency (0.5–2ms)** on every query, requiring high-availability caching tiers (e.g. Redis Cluster) and local client memory caches.",
    explanation: "Requires maintaining a dedicated distributed lookup infrastructure.",
    hint: "Adds an extra network lookup hop and creates a critical dependency on the lookup cache.",
    level: "intermediate",
    codeExample: `-- Extra network hop: App → Redis Lookup → MySQL Shard Node`
  },
  {
    question: "What is 'Composite Sharding' (Two-Tier Sharding Algorithm)?",
    shortAnswer: "Combining two distinct sharding algorithms: for example, using **List-Based Sharding at Tier 1** to route by country/region, and **Consistent Hashing at Tier 2** to distribute user accounts across 8 MySQL nodes within that region.",
    explanation: "Combines data residency compliance with high-throughput hash scalability.",
    hint: "Combines two algorithms: e.g. List by region at Tier 1 + Consistent Hash across nodes at Tier 2.",
    level: "expert",
    codeExample: `Tier 1: List (Bengal Region) → Tier 2: Consistent Hash (8 MySQL Nodes in Kolkata DC)`
  },
  {
    question: "What is the 'Double-Write & CDC Catch-Up' zero-downtime resharding pattern?",
    shortAnswer: "1. Baseline bulk copy from old shards to new shards; 2. Application enables double-writes or uses CDC (Debezium/binlogs) to replicate delta changes in real time; 3. Run data checksum verification (`pt-table-checksum`); 4. Atomically switch router pointers to the new shards; 5. Decommission old shards.",
    explanation: "Enables multi-terabyte cluster resharding with zero application downtime.",
    hint: "Bulk copy baseline → Stream real-time binlogs → Verify checksums → Cut over traffic atomically.",
    level: "expert",
    codeExample: `// Zero-Downtime Migration: CDC binlog replication catch-up → Checksum verification → Cutover`
  },
  {
    question: "Why does MurmurHash3 or MD5 serve as a better hashing function for Consistent Hashing than simple integer modulo?",
    shortAnswer: "Because cryptographic or non-cryptographic high-entropy hash functions (like **MurmurHash3**, **CityHash**, or **MD5**) generate a uniform 32-bit or 128-bit integer distribution across the entire hash ring, eliminating input correlation and preventing data clustering.",
    explanation: "Provides maximum entropy across the full $[0, 2^{32}-1]$ integer range.",
    hint: "MurmurHash3 delivers high entropy and uniform dispersion across the entire 32-bit ring.",
    level: "intermediate",
    codeExample: `const ringPosition = murmurHash3(userUuid); // Uniform value between 0 and 2^32-1`
  },
  {
    question: "What happens in a Consistent Hash Ring when a physical node experiences a hardware crash?",
    shortAnswer: "Its virtual node positions disappear from the ring, and all traffic targeting its ranges is **automatically and instantly routed to the next clockwise neighboring nodes**, preventing cluster-wide query failures while failover occurs.",
    explanation: "Provides graceful degradation during node failure events.",
    hint: "Keys automatically route to the next clockwise nodes on the ring.",
    level: "basic",
    codeExample: `-- Node 2 fails: Ring automatically forwards Node 2's keys to Node 3.`
  },
  {
    question: "What is the recommended number of Virtual Nodes per physical server node in a Consistent Hash Ring?",
    shortAnswer: "Between **128 and 512 virtual nodes per physical server**.",
    explanation: "Sizing at 256 virtual nodes reduces data distribution variance across physical servers to under 3%.",
    hint: "Between 128 and 512 virtual nodes per physical server.",
    level: "intermediate",
    codeExample: `-- Sizing Rule: 256 Virtual Nodes per physical node keeps storage variance < 3%.`
  },
  {
    question: "How do you detect Data Skew across nodes in a sharded MySQL cluster?",
    shortAnswer: "Query each shard node's `information_schema.TABLES` to aggregate total `DATA_LENGTH` and `TABLE_ROWS`; if one shard holds >20% more data than average, the sharding key or virtual node distribution is skewed.",
    explanation: "Identifies unbalanced storage utilization across cluster instances.",
    hint: "Compare total TABLE_ROWS and DATA_LENGTH across all shard instances.",
    level: "basic",
    codeExample: `SELECT SUM(TABLE_ROWS), ROUND(SUM(DATA_LENGTH)/1024/1024/1024, 2) AS TOTAL_GB 
FROM information_schema.TABLES;`
  },
  {
    question: "What is 'Dynamic Shard Weighting' in Consistent Hashing?",
    shortAnswer: "Assigning more virtual nodes to high-capacity hardware (e.g. 512 VNodes for a 128-core 1TB RAM server, and 128 VNodes for a 32-core 256GB RAM server) so traffic and data are allocated proportionally to server capacity.",
    explanation: "Enables heterogeneous hardware utilization across a sharded cluster.",
    hint: "Assigns higher virtual node counts to more powerful servers to balance hardware capacity.",
    level: "expert",
    codeExample: `hashRing.addNode("server-heavy-01", 512); // Takes 2x data
hashRing.addNode("server-light-02", 256); // Takes 1x data`
  },
  {
    question: "What is the impact of selecting a low-cardinality Shard Key (e.g. `country_code` with 5 values) on a 16-node cluster?",
    shortAnswer: "Only 5 of the 16 shard nodes will receive any data at all, while the remaining 11 shard nodes sit completely empty (severe data skew); a Shard Key **MUST have high cardinality (millions of distinct values)**.",
    explanation: "High cardinality is mandatory for horizontal sharding load balancing.",
    hint: "Only 5 nodes receive data; 11 nodes remain empty. Shard key must have high cardinality.",
    level: "basic",
    codeExample: `-- ❌ Catastrophic Skew: Low-cardinality key only populates 5 nodes in a 16-node cluster!`
  },
  {
    question: "Can an application query multiple Shard Keys simultaneously (e.g. `WHERE customer_id = 105 OR customer_id = 208`)?",
    shortAnswer: "**Yes**, the router maps each ID to its respective shard node and dispatches **2 targeted point queries in parallel to only those 2 specific nodes**, merging the results without broadcasting to all nodes.",
    explanation: "Optimizes multi-key lookups by pruning to the minimal candidate node set.",
    hint: "Router dispatches targeted queries in parallel to only the matching shard nodes.",
    level: "intermediate",
    codeExample: `// Dispatches to Node 1 (for ID 105) and Node 3 (for ID 208) in parallel!`
  },
  {
    question: "How does Sharding handle foreign key constraints between tables residing on different shard nodes?",
    shortAnswer: "**MySQL does NOT support cross-node Foreign Keys**; foreign key integrity across shards must be enforced at the **Application / Service layer** or within transaction managers.",
    explanation: "Shared-nothing database architectures cannot enforce distributed cross-node constraints.",
    hint: "Cross-node foreign keys are unsupported in MySQL and must be enforced in application logic.",
    level: "basic",
    codeExample: `-- Foreign keys across different physical server nodes are illegal in MySQL.`
  },
  {
    question: "What is the 'Hot Tenant' (Celebrity Problem) in SaaS Multi-Tenant Sharding?",
    shortAnswer: "When one mega-tenant (e.g. a multinational enterprise) generates 1,000x more traffic than ordinary tenants, overwhelming its assigned shard node; solved by **Directory Sharding** to isolate that VIP tenant onto its own dedicated database node.",
    explanation: "Isolates outlier tenants to protect multi-tenant cluster stability.",
    hint: "When one mega-tenant saturates a shard; solved by isolating it to a dedicated node via Directory routing.",
    level: "intermediate",
    codeExample: `// Directory routing: VIP tenant mapped to dedicated high-IOPS database cluster.`
  },
  {
    question: "What is the role of Apache ZooKeeper, Consul, or etcd in Sharded MySQL Architectures?",
    shortAnswer: "They act as a **Distributed Configuration Store** that holds the active Shard Topology, Hash Ring node mappings, and master failover states, providing real-time configuration updates to all application routers via watch triggers.",
    explanation: "Maintains cluster-wide state synchronization across all application nodes.",
    hint: "Stores shard topology and hash ring state, notifying routers of node changes via watch triggers.",
    level: "expert",
    codeExample: `// Router watches etcd key: /database/shards/topology → Updates local hash ring on changes`
  },
  {
    question: "What is `pt-table-checksum`'s role during a live resharding migration?",
    shortAnswer: "It computes cryptographic checksums on chunked ranges across source and destination shards to mathematically prove that **zero rows were corrupted or lost during the online migration** before switching client traffic.",
    explanation: "Ensures 100% data integrity before final cutover.",
    hint: "Computes checksums to mathematically prove data parity between old and new shards.",
    level: "expert",
    codeExample: `pt-table-checksum --host=source-shard --replicate=test.checksums`
  },
  {
    question: "How does Range-Based Sharding handle auto-splitting when a shard fills up?",
    shortAnswer: "The system monitors shard size; when a shard exceeds a threshold (e.g. 500GB), it splits the range boundary in metadata (e.g. 1–500k and 500k–1M) and migrates the second half to a newly provisioned shard node.",
    explanation: "The standard auto-scaling pattern in NewSQL databases (like TiDB and CockroachDB).",
    hint: "Splits the range boundary in metadata and migrates half the data to a new node.",
    level: "expert",
    codeExample: `-- Split Range: [1 - 1,000,000] → [1 - 500,000] (Node 1) & [500,001 - 1,000,000] (Node 2)`
  },
  {
    question: "What happens if a query filters on an un-sharded secondary index (e.g. `WHERE email = 'mamata@bengal.in'`) when the shard key is `user_id`?",
    shortAnswer: "Because `email` is not the shard key, the router cannot determine which node holds the record, forcing a **full Scatter-Gather broadcast query across all shard nodes**.",
    explanation: "Demonstrates the secondary index lookup penalty in sharded databases.",
    hint: "Forces a scatter-gather scan across all nodes because email does not determine shard location.",
    level: "basic",
    codeExample: `-- Scatter-Gather: Queries all 8 shard nodes to locate email address!`
  },
  {
    question: "How do you eliminate the Scatter-Gather penalty for secondary index lookups in sharded systems?",
    shortAnswer: "By building a **Global Secondary Index (GSI) Lookup Table or Redis Cache** that maps `email → user_id`; the application looks up `user_id` in Redis in 0.5ms and then executes a Point Query directly to the correct shard node.",
    explanation: "Converts scatter-gather broadcast scans into deterministic point lookups.",
    hint: "Use a global lookup cache (Redis: email → user_id) to convert queries into point lookups.",
    level: "intermediate",
    codeExample: `const userId = await redis.get(\`email_idx:\${email}\`); // Returns 105
const user = await getShard(userId).query("SELECT * FROM users WHERE user_id = ?", [userId]);`
  },
  {
    question: "What is 'Geographic Sharding' and what are its latency benefits?",
    shortAnswer: "Deploying shard nodes in regional data centers (e.g. Kolkata DC for East India, Mumbai DC for West India) and routing users to their closest local database node to achieve **sub-5ms network latency** for regional users.",
    explanation: "Co-locates database compute with the end-user's geographic location.",
    hint: "Places shard nodes in regional data centers to minimize network round-trip latency.",
    level: "basic",
    codeExample: `// Kolkata users connect to Kolkata Shard (<3ms latency); Mumbai users connect to Mumbai Shard.`
  },
  {
    question: "Why should `ORDER BY` columns in sharded queries ideally match the Shard Key or be sorted locally?",
    shortAnswer: "Because sorting by a non-shard key across multiple nodes requires the proxy to fetch candidate rows from every node and perform an expensive in-memory **Merge Sort**, consuming CPU and memory on the proxy.",
    explanation: "Minimizes merge engine overhead on distributed queries.",
    hint: "Cross-shard sorting requires in-memory multi-way merge sort across all candidate streams.",
    level: "intermediate",
    codeExample: `-- Local sorting on single shard is instant; distributed sorting requires merge sort.`
  },
  {
    question: "What is the primary operational takeaway of Topic 10 in Module 004_007?",
    shortAnswer: "Selecting the right Sharding Algorithm governs cluster scalability: use **Consistent Hashing with Virtual Nodes (128–512 VNodes)** for dynamic clusters to restrict resharding migration to $1/N$ data, avoid naive **Range-Based Sharding** for append-only data to prevent Write Hot Spots, leverage **List/Directory Sharding** for data residency compliance and VIP tenant isolation, and use **Global Secondary Index (GSI) caches** to convert non-shard-key lookups into deterministic point queries.",
    explanation: "Mastering sharding algorithms allows architects to achieve balanced storage allocation, zero-downtime resharding, and predictable single-digit millisecond query performance across distributed database clusters.",
    hint: "Summarize Modulo vs Consistent Hashing, Virtual Nodes, Write Hot Spot avoidance in Range sharding, List/Directory residency, and GSI lookup caches.",
    level: "basic",
    codeExample: `-- Master Consistent Hashing Router Blueprint:
# 1. Algorithm: Consistent Hashing with 256 Virtual Nodes per Server
# 2. Key: MurmurHash3(account_uuid) → Position on [0, 2^32-1] Ring
# 3. Secondary Index: Redis GSI cache (email → account_uuid)
# 4. Resharding: CDC binlog catch-up + pt-table-checksum validation`
  },
  {
    question: "What is the difference between Virtual Nodes and Physical Nodes in a Hash Ring?",
    shortAnswer: "A **Physical Node** is the actual MySQL server hardware instance; **Virtual Nodes** are multiple mathematical tokens assigned to that single physical node and scattered across the ring to ensure smooth statistical distribution.",
    explanation: "Decouples physical server count from hash distribution granularity.",
    hint: "Physical node is the real server; Virtual nodes are multiple mathematical points on the ring.",
    level: "basic",
    codeExample: `-- 1 Physical Server (192.168.1.10) owns 256 Virtual Node tokens on the Hash Ring.`
  }
];

export default questions;
