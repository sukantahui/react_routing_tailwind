// topic6_files/topic6_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 6: KEY Partitioning & LINEAR KEY: Hash Partitioning based on MySQL Internal Hash Functions

const questions = [
  {
    question: "What is KEY Partitioning in MySQL and how does it differ from HASH Partitioning?",
    shortAnswer: "KEY Partitioning is similar to HASH, but uses **MySQL's internal hashing function** (based on MD5 / password hashing) rather than a user-defined SQL expression; unlike HASH (which requires integers), KEY **natively supports non-integer data types** like `VARCHAR`, `UUID`, `VARBINARY`, and `DATETIME` without helper functions.",
    explanation: "Allows direct hash partitioning on string and binary columns.",
    hint: "Uses MySQL internal hash function and supports non-integer columns like VARCHAR and UUID directly.",
    level: "basic",
    codeExample: `CREATE TABLE user_tokens (
  token_uuid VARCHAR(36) NOT NULL,
  user_email VARCHAR(100),
  PRIMARY KEY (token_uuid)
) ENGINE = InnoDB
PARTITION BY KEY (token_uuid)
PARTITIONS 8;`
  },
  {
    question: "What happens if you define `PARTITION BY KEY()` without specifying any column names inside the parentheses?",
    shortAnswer: "MySQL automatically uses the **table's Primary Key column(s)** as the partitioning key; if no Primary Key exists, it uses the first non-null Unique Key.",
    explanation: "Provides zero-configuration hash distribution for keyed tables.",
    hint: "Automatically partitions on the table's Primary Key (or non-null Unique Key).",
    level: "basic",
    codeExample: `CREATE TABLE api_credentials (
  client_id VARCHAR(64) NOT NULL,
  api_secret VARCHAR(128),
  PRIMARY KEY (client_id)
) PARTITION BY KEY() PARTITIONS 4; -- Automatically hashes client_id!`
  },
  {
    question: "What is LINEAR KEY Partitioning in MySQL?",
    shortAnswer: "LINEAR KEY combines MySQL's internal hashing function with the **linear powers-of-two bitwise algorithm**, ensuring that when partitions are added or removed, rows from only a single partition ($1/N$) are moved rather than reorganizing the entire table.",
    explanation: "Enables fast, low-overhead partition resizing for tables partitioned on non-integer columns.",
    hint: "Uses internal hash with powers-of-two bitwise algorithm for fast partition resizing.",
    level: "intermediate",
    codeExample: `PARTITION BY LINEAR KEY (session_token) PARTITIONS 16`
  },
  {
    question: "What is the difference between `ALGORITHM = 1` and `ALGORITHM = 2` in KEY partitioning?",
    shortAnswer: "`ALGORITHM = 1` uses the **legacy MySQL 5.1 password hashing algorithm** (maintained for backward compatibility when importing older databases); `ALGORITHM = 2` (default in MySQL 8.0) uses the **modern MD5 hashing algorithm** with improved bit dispersion and CPU architecture endianness neutrality.",
    explanation: "Standardize on ALGORITHM = 2 for all modern MySQL 8.0 tables.",
    hint: "ALGORITHM = 1 is legacy MySQL 5.1 hash; ALGORITHM = 2 is modern MySQL 8.0 MD5 hash.",
    level: "expert",
    codeExample: `CREATE TABLE user_profiles (
  user_uuid VARCHAR(36) NOT NULL,
  PRIMARY KEY (user_uuid)
) PARTITION BY KEY ALGORITHM = 2 (user_uuid) PARTITIONS 8;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, customer UUID loyalty cards scaled across ₹1.2 Crores in sales transactions. How did Susmita use `PARTITION BY KEY()` to eliminate disk I/O bottlenecks across 4 server drives?",
    shortAnswer: "Susmita partitioned the `loyalty_cards` table by `KEY()` across 8 partitions; incoming random UUID inserts were hashed uniformly across all 8 physical `.ibd` files, distributing write operations evenly across NVMe drives and preventing single-file disk queue saturation during peak cashier hours.",
    explanation: "Eliminated disk write hot spots on high-concurrency UUID primary keys.",
    hint: "Partitioned by KEY() across 8 partitions to spread UUID inserts evenly across disk files.",
    level: "moderate",
    codeExample: `# Barrackpore UUID Partitioning:
CREATE TABLE loyalty_cards (
  card_uuid VARCHAR(36) NOT NULL,
  customer_name VARCHAR(100),
  points INT DEFAULT 0,
  PRIMARY KEY (card_uuid)
) ENGINE = InnoDB
PARTITION BY KEY()
PARTITIONS 8;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, digital payment tokens (SHA-256 strings) handled 300,000,000 records across ₹500 Crores in banking volume. Why did Debangshu use `LINEAR KEY` with 32 partitions?",
    shortAnswer: "Because `LINEAR KEY` allowed the bank to scale from 16 to 32 partitions dynamically before the fiscal year-end by moving only 1/16th of existing data during expansion, while the power-of-two partition count (32) ensured that SHA-256 tokens were distributed with less than 1% variance across all physical tablespace files.",
    explanation: "Achieved low-overhead online partition expansion and balanced storage allocation.",
    hint: "LINEAR KEY with power-of-two sizing allowed fast partition expansion with balanced data distribution.",
    level: "expert",
    codeExample: `CREATE TABLE payment_tokens (
  token_hash CHAR(64) NOT NULL,
  account_id BIGINT NOT NULL,
  expiry_date DATE,
  PRIMARY KEY (token_hash, account_id)
) ENGINE = InnoDB
PARTITION BY LINEAR KEY (token_hash)
PARTITIONS 32;`
  },
  {
    question: "What column data types are supported in `PARTITION BY KEY` in MySQL 8.0?",
    shortAnswer: "**All standard MySQL column types EXCEPT `GEOMETRY` and `JSON`**; supports `INT`, `BIGINT`, `VARCHAR`, `CHAR`, `VARBINARY`, `BINARY`, `DATE`, `DATETIME`, `TIMESTAMP`, `DECIMAL`, and `FLOAT`.",
    explanation: "Provides the widest data type support of any partitioning method in MySQL.",
    hint: "Supports all types except GEOMETRY and JSON, including VARCHAR, CHAR, and VARBINARY.",
    level: "intermediate",
    codeExample: `-- VARCHAR, VARBINARY, and UUIDs are fully supported.`
  },
  {
    question: "Can a `BLOB` or `TEXT` column be used in `PARTITION BY KEY`?",
    shortAnswer: "**Yes**, `TEXT` and `BLOB` columns can be used in `KEY` partitioning, but they must be explicitly prefixed (or included in a composite key) and are generally discouraged due to hash computation overhead on large LOB fields.",
    explanation: "Supported, but hashing large payloads adds CPU overhead.",
    hint: "Supported with prefix indexing, but discouraged due to LOB hash overhead.",
    level: "expert",
    codeExample: `CREATE TABLE document_store (
  doc_id VARCHAR(64) NOT NULL,
  doc_content TEXT,
  PRIMARY KEY (doc_id)
) PARTITION BY KEY (doc_id) PARTITIONS 4;`
  },
  {
    question: "How do you add 4 new partitions to a KEY partitioned table in MySQL?",
    shortAnswer: "Execute **`ALTER TABLE table_name ADD PARTITION PARTITIONS 4;`**; MySQL increases the partition count by 4 and redistributes rows across the expanded bucket set.",
    explanation: "Expands partition bucket counts online.",
    hint: "ALTER TABLE table ADD PARTITION PARTITIONS N.",
    level: "basic",
    codeExample: `ALTER TABLE user_tokens ADD PARTITION PARTITIONS 4;`
  },
  {
    question: "How do you reduce the partition count of a KEY partitioned table?",
    shortAnswer: "Execute **`ALTER TABLE table_name COALESCE PARTITION 4;`**; MySQL merges data from 4 partitions back into the remaining partitions safely without data loss.",
    explanation: "COALESCE is the standard method for reducing KEY partition counts.",
    hint: "ALTER TABLE table COALESCE PARTITION N.",
    level: "intermediate",
    codeExample: `ALTER TABLE user_tokens COALESCE PARTITION 4;`
  },
  {
    question: "How does Partition Pruning operate when a query filters on `WHERE token_uuid = 'abc-123'` on a KEY partitioned table?",
    shortAnswer: "The query optimizer applies MySQL's internal hash function to the string `'abc-123'`, calculates the target partition ID, prunes all other partitions, and **scans only the single matching `.ibd` file on disk**.",
    explanation: "Delivers single-partition line-rate lookup speed for string and UUID primary keys.",
    hint: "Applies internal hash to string literal and scans only the single matching partition file.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM user_tokens WHERE token_uuid = '3e11fa47-0b1a-4f5e-8b9a-123456789abc';
-- partitions: p3 (Reads only 1 partition!)`
  },
  {
    question: "What happens if a query filters on `WHERE user_email LIKE 'mamata%'` on a table partitioned by `KEY (user_email)`?",
    shortAnswer: "**Partition Pruning is completely DISABLED (Scans All Partitions)**; because cryptographic hashing transforms wildcard string prefixes into unpredictable hash values, the optimizer cannot prune and must execute a Scatter-Gather scan across all partitions.",
    explanation: "Hash partitioning does not support wildcard prefix or range pruning.",
    hint: "LIKE wildcard queries cannot prune KEY partitions, forcing a full scatter-gather scan.",
    level: "intermediate",
    codeExample: `-- Scans ALL partitions:
SELECT * FROM user_tokens WHERE user_email LIKE 'mamata%';`
  },
  {
    question: "Can multiple columns be specified in `PARTITION BY KEY (col1, col2)`?",
    shortAnswer: "**Yes**, MySQL computes a composite hash combining all listed columns, distributing rows based on the combined hash value.",
    explanation: "Allows composite key hashing across multi-column entities.",
    hint: "Yes, composite column hashing combines all listed columns into a single hash value.",
    level: "basic",
    codeExample: `PARTITION BY KEY (tenant_id, user_uuid) PARTITIONS 16`
  },
  {
    question: "What is the mandatory Primary Key requirement for KEY partitioned tables?",
    shortAnswer: "If explicit columns are specified in `KEY (col1, col2)`, **those columns MUST be present in every Primary Key and Unique Key on the table**.",
    explanation: "Guarantees local uniqueness enforcement without cross-partition locks.",
    hint: "Every unique key must include all columns listed in the KEY() definition.",
    level: "basic",
    codeExample: `-- Primary key must contain the hashed column (token_uuid).`
  },
  {
    question: "How does `PARTITION BY KEY` handle `NULL` values in the partitioning column?",
    shortAnswer: "`NULL` values are evaluated by the internal hash function to hash to **Partition 0 (`p0`)**.",
    explanation: "Ensures deterministic placement of NULL records without insert errors.",
    hint: "NULL values are hashed to Partition 0 (p0).",
    level: "basic",
    codeExample: `-- NULL string hashes deterministically to p0.`
  },
  {
    question: "Why should you NEVER use `PARTITION BY KEY` on a table with a natural chronological sequence if queries frequently query date ranges?",
    shortAnswer: "Because `KEY` partitioning will scatter consecutive dates randomly across all partitions, destroying the ability to prune date ranges (`WHERE date BETWEEN ...`); use **`RANGE` or `RANGE COLUMNS`** for time-series range queries.",
    explanation: "Choose partitioning methods that match your primary query filter patterns.",
    hint: "KEY scatters consecutive dates randomly, preventing date range pruning.",
    level: "intermediate",
    codeExample: `-- Use RANGE COLUMNS for dates, not KEY partitioning.`
  },
  {
    question: "What happens if an `UPDATE` changes the value of a column used in `PARTITION BY KEY`?",
    shortAnswer: "If the new string produces a different hash value, InnoDB deletes the row from the old partition `.ibd` file and inserts it into the new partition `.ibd` file atomically within the same transaction.",
    explanation: "Automatic cross-partition row transfer handled by storage engine.",
    hint: "Atomic delete from old partition and insert into new partition if hash value changes.",
    level: "intermediate",
    codeExample: `UPDATE user_tokens SET token_uuid = 'new-uuid-123' WHERE token_uuid = 'old-uuid-456';`
  },
  {
    question: "How do you inspect the physical file sizes and row counts of KEY partitions in MySQL 8.0?",
    shortAnswer: "Query `SELECT PARTITION_NAME, TABLE_ROWS, ROUND(DATA_LENGTH/1024/1024, 2) AS MB FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'user_tokens';`.",
    explanation: "Verifies whether data is distributed evenly across all hash buckets.",
    hint: "Query TABLE_ROWS and DATA_LENGTH in information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, TABLE_ROWS, ROUND(DATA_LENGTH/1024/1024, 2) AS DATA_MB 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'api_credentials';`
  },
  {
    question: "What is `ALTER TABLE ... TRUNCATE PARTITION p2` on a KEY partitioned table?",
    shortAnswer: "It deletes all rows that hash to partition `p2` instantly while retaining the partition definition and leaving all other partitions untouched.",
    explanation: "Empties a specific hash bucket quickly.",
    hint: "Empties all data inside the specified hash partition file.",
    level: "basic",
    codeExample: `ALTER TABLE api_credentials TRUNCATE PARTITION p2;`
  },
  {
    question: "Can `KEY` partitioning be used as a secondary subpartitioning strategy inside LIST partitions?",
    shortAnswer: "**Yes**, this is the **LIST-KEY Composite Partitioning** pattern: partitioning primarily by `LIST COLUMNS` on region (e.g. Bengal, Delhi) and subpartitioning each region by `KEY (user_uuid)` across 4 buckets.",
    explanation: "Combines regional routing with even UUID load balancing.",
    hint: "Yes, LIST-KEY composite partitioning is widely used in distributed SaaS applications.",
    level: "intermediate",
    codeExample: `PARTITION BY LIST COLUMNS (region)
SUBPARTITION BY KEY (user_uuid)
SUBPARTITIONS 4 (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore'),
  PARTITION p_delhi  VALUES IN ('Delhi', 'Noida')
);`
  },
  {
    question: "How does MySQL ensure that `KEY` partitioning hashes strings with different collations consistently?",
    shortAnswer: "The internal hashing algorithm normalizes strings according to the column's **Character Set and Collation** before hashing; for case-insensitive collations (e.g. `utf8mb4_0900_ai_ci`), `'MAMATA'` and `'mamata'` produce the identical hash value and route to the same partition.",
    explanation: "Guarantees collation-aware partition routing consistency.",
    hint: "Normalizes strings based on column collation: case-insensitive collations produce identical hashes.",
    level: "expert",
    codeExample: `-- 'MAMATA' and 'mamata' hash to the same partition in utf8mb4_0900_ai_ci.`
  },
  {
    question: "What is the maximum number of partitions allowed for a KEY partitioned table in MySQL 8.0?",
    shortAnswer: "Up to **8,192 partitions**.",
    explanation: "Best practice: Keep partition counts between 8 and 64 for optimal performance.",
    hint: "Up to 8,192 partitions maximum.",
    level: "basic",
    codeExample: `-- Maximum 8192 partitions in MySQL 8.0.`
  },
  {
    question: "What is `ALTER TABLE ... EXCHANGE PARTITION`'s behavior on a KEY partitioned table?",
    shortAnswer: "It swaps a single KEY partition's `.ibd` file with a standalone staging table in milliseconds, provided all rows in the staging table hash to that exact partition ID.",
    explanation: "Enables fast data interchange for individual hash buckets.",
    hint: "Swaps tablespace pointers with a staging table whose rows match the partition's hash ID.",
    level: "expert",
    codeExample: `ALTER TABLE user_tokens EXCHANGE PARTITION p0 WITH TABLE tokens_staging;`
  },
  {
    question: "Why does `PARTITION BY KEY()` provide a major performance benefit for tables with High-Concurrency Primary Key write workloads?",
    shortAnswer: "Because concurrent `INSERT` operations on auto-increment or UUID primary keys are distributed across multiple independent physical `.ibd` tablespaces, reducing page-level lock contention and spreading I/O flush checkpoints across multiple storage threads.",
    explanation: "Maximizes hardware parallelism on multi-core NVMe database servers.",
    hint: "Spreads concurrent inserts across multiple .ibd files, reducing page locks and storage contention.",
    level: "intermediate",
    codeExample: `-- Distributes concurrent writes across 16 independent physical files.`
  },
  {
    question: "How do you remove KEY partitioning from a table while keeping all rows intact?",
    shortAnswer: "Execute **`ALTER TABLE table_name REMOVE PARTITIONING;`**; MySQL merges all individual partition `.ibd` files into a single monolithic tablespace.",
    explanation: "Converts a partitioned table back into a standard non-partitioned table.",
    hint: "Execute ALTER TABLE table REMOVE PARTITIONING.",
    level: "basic",
    codeExample: `ALTER TABLE user_tokens REMOVE PARTITIONING;`
  },
  {
    question: "What happens if a query uses an `IN (...)` list containing multiple string keys (e.g. `WHERE token_uuid IN ('uuid1', 'uuid2', 'uuid3')`)?",
    shortAnswer: "The optimizer hashes each UUID, identifies the distinct set of matching partition IDs, and prunes the search to **scan only the union of matching partitions**.",
    explanation: "Prunes multi-key lookups to the minimal set of candidate partition files.",
    hint: "Hashes each string and accesses only the union of matching partition files.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM user_tokens WHERE token_uuid IN ('uuid-1', 'uuid-2');
-- partitions: p1, p3`
  },
  {
    question: "Can an `ALTER TABLE` statement convert an unpartitioned table with a UUID primary key into a KEY partitioned table?",
    shortAnswer: "**Yes**, by executing `ALTER TABLE existing_table PARTITION BY KEY() PARTITIONS 8;`; MySQL computes internal hashes for all existing rows and redistributes them into 8 physical `.ibd` partition files.",
    explanation: "Partitions existing tables online without losing data.",
    hint: "Yes, ALTER TABLE table PARTITION BY KEY() PARTITIONS N partitions existing tables.",
    level: "intermediate",
    codeExample: `ALTER TABLE customer_accounts PARTITION BY KEY() PARTITIONS 8;`
  },
  {
    question: "Why should `LINEAR KEY` be preferred over standard `KEY` when partition counts are expected to grow dynamically?",
    shortAnswer: "Because `LINEAR KEY` uses the powers-of-two bitwise algorithm, meaning partition additions (`ADD PARTITION`) only move $1/N$ of rows from the single split partition rather than redistributing ~100% of all rows across the entire table.",
    explanation: "Prevents full-table reorganization locks during capacity expansions.",
    hint: "LINEAR KEY moves only 1/N rows during partition expansion, avoiding full table reorganization.",
    level: "basic",
    codeExample: `PARTITION BY LINEAR KEY (user_uuid) PARTITIONS 16`
  },
  {
    question: "What is the recommended health check to verify that a KEY partitioned table has even data distribution?",
    shortAnswer: "Inspect `information_schema.PARTITIONS` to verify that `TABLE_ROWS` across all partitions are within $\\pm 5\%$ of the average row count per partition.",
    explanation: "Confirms that the internal MD5 hash function is distributing data uniformly.",
    hint: "Check that TABLE_ROWS across partitions in information_schema.PARTITIONS are roughly equal.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, TABLE_ROWS 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'payment_tokens';`
  },
  {
    question: "What is the primary operational takeaway of Topic 6 in Module 004_007?",
    shortAnswer: "KEY Partitioning is the premier hashing strategy for non-integer and primary-key-heavy tables: it uses **MySQL's internal MD5 hash** to support `VARCHAR`, `UUID`, `VARBINARY`, and `DATETIME` columns natively, defaults to the **Primary Key** if columns are omitted (`PARTITION BY KEY()`), uses **`ALGORITHM = 2`** for modern bit dispersion, supports **`LINEAR KEY`** with power-of-two sizing for fast low-overhead resizing, and delivers **line-rate point equality pruning** on string lookups.",
    explanation: "Mastering KEY and LINEAR KEY partitioning allows DBAs to achieve scalable write throughput and uniform storage distribution on UUID and hash-keyed datasets.",
    hint: "Summarize internal MD5 hashing, native VARCHAR/UUID support, default Primary Key hashing, ALGORITHM = 2, and LINEAR KEY resizing.",
    level: "basic",
    codeExample: `-- Master LINEAR KEY Blueprint:
CREATE TABLE enterprise_api_tokens (
  token_id VARCHAR(64) NOT NULL,
  tenant_code VARCHAR(30) NOT NULL,
  token_secret VARCHAR(128) NOT NULL,
  PRIMARY KEY (token_id, tenant_code)
) ENGINE = InnoDB
PARTITION BY LINEAR KEY ALGORITHM = 2 (token_id)
PARTITIONS 16;

-- Pruned Query:
SELECT * FROM enterprise_api_tokens WHERE token_id = 'tok_live_987654321';`
  }
];

export default questions;
