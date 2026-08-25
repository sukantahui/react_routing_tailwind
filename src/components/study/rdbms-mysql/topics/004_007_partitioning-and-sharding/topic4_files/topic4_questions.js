// topic4_files/topic4_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 4: LIST Partitioning: Partitioning by Discrete Categories, Regions, and Status Codes

const questions = [
  {
    question: "What is LIST Partitioning in MySQL and how does it determine row placement?",
    shortAnswer: "LIST Partitioning assigns rows to physical partitions based on whether a column's value matches one of a **discrete set of explicit values** defined in a `VALUES IN (value_1, value_2, ...)` list.",
    explanation: "Unlike RANGE which matches intervals, LIST matches explicit enumerated categorical values.",
    hint: "Assigns rows based on explicit enumerated values defined in VALUES IN lists.",
    level: "basic",
    codeExample: `CREATE TABLE client_branches (
  branch_id INT NOT NULL,
  region_id INT NOT NULL,
  branch_name VARCHAR(50),
  PRIMARY KEY (branch_id, region_id)
) ENGINE = InnoDB
PARTITION BY LIST (region_id) (
  PARTITION p_bengal VALUES IN (10, 11, 12),
  PARTITION p_delhi  VALUES IN (20, 21, 22),
  PARTITION p_mumbai VALUES IN (30, 31, 32)
);`
  },
  {
    question: "What is the difference between `PARTITION BY LIST (expr)` and `PARTITION BY LIST COLUMNS (col1, ...)`?",
    shortAnswer: "`LIST (expr)` requires the expression to **return an integer value**; `LIST COLUMNS` allows direct partitioning on **`VARCHAR`**, **`CHAR`**, **`DATE`**, or **`DATETIME`** columns directly without needing integer foreign key mappings.",
    explanation: "`LIST COLUMNS` is the modern standard for categorical string partitioning in MySQL 8.0.",
    hint: "LIST requires integer expressions; LIST COLUMNS allows direct string (VARCHAR) partitioning.",
    level: "basic",
    codeExample: `-- Direct string category partitioning:
PARTITION BY LIST COLUMNS (city_name) (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore', 'Howrah'),
  PARTITION p_delhi  VALUES IN ('New Delhi', 'Noida', 'Gurgaon')
);`
  },
  {
    question: "Can the same value appear in more than one partition's `VALUES IN` list?",
    shortAnswer: "**No**, all values across all partition lists must be **strictly disjoint (mutually exclusive)**; if a value is duplicated across two partitions, MySQL rejects table creation with `ERROR 1495 (HY000): Multiple definition of same constant in list partitioning`.",
    explanation: "Guarantees unambiguous row routing to exactly one physical partition.",
    hint: "Values must be strictly unique across all partition definitions (no duplicates).",
    level: "basic",
    codeExample: `-- Error 1495 if 'Kolkata' is listed in both p_bengal and p_east.`
  },
  {
    question: "What happens when an `INSERT` provides a row with a value that does NOT match any defined `VALUES IN` list?",
    shortAnswer: "The insert operation **fails immediately with `ERROR 1526 (HY000): Table has no partition for value ...`**, and the transaction is aborted.",
    explanation: "Incoming categorical values must map to an existing defined partition list.",
    hint: "Fails with Error 1526 because the unmapped value has no destination partition.",
    level: "basic",
    codeExample: `-- Inserting city 'Bangalore' into a table with only Bengal/Delhi/Mumbai fails with Error 1526!`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, regional branch sales were tracked across ₹1.2 Crores in inventory. How did Susmita use `LIST COLUMNS` to isolate Barrackpore and Kolkata store records into separate physical NVMe files?",
    shortAnswer: "She defined `PARTITION BY LIST COLUMNS (store_location)` with `PARTITION p_barrackpore VALUES IN ('Barrackpore', 'N.C.Pukur')` and `PARTITION p_kolkata VALUES IN ('Kolkata', 'Salt Lake')`; when local Barrackpore store queries ran, MySQL pruned searches to the single Barrackpore file, speeding up POS lookups by 8x.",
    explanation: "Localized storage partitions improved buffer pool hit ratios and query speed.",
    hint: "Partitioned by store_location using LIST COLUMNS for localized partition pruning.",
    level: "moderate",
    codeExample: `# Barrackpore Store Partitioning:
CREATE TABLE store_invoices (
  invoice_id BIGINT NOT NULL,
  store_location VARCHAR(30) NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (invoice_id, store_location)
) PARTITION BY LIST COLUMNS (store_location) (
  PARTITION p_barrackpore VALUES IN ('Barrackpore', 'N.C.Pukur'),
  PARTITION p_kolkata     VALUES IN ('Kolkata', 'Salt Lake')
);`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, corporate client ledgers supported multi-tenant banking across ₹500 Crores in volume. How did Debangshu use `LIST (tenant_id)` partitioning to provide physical data isolation between enterprise clients?",
    shortAnswer: "He assigned tier-1 enterprise clients their own dedicated high-volume physical partitions (e.g. `PARTITION p_client_reliance VALUES IN (1001)`), while grouping small-business tenants into a shared partition (`PARTITION p_smb VALUES IN (2001, 2002, 2003)`), ensuring VIP client queries never contended for disk pages with other tenants.",
    explanation: "Multi-tenant physical tiering delivered predictable latency SLAs for enterprise clients.",
    hint: "Assigned high-volume tenants to dedicated partitions and pooled smaller tenants together.",
    level: "expert",
    codeExample: `PARTITION BY LIST (tenant_id) (
  PARTITION p_enterprise_1001 VALUES IN (1001),
  PARTITION p_enterprise_1002 VALUES IN (1002),
  PARTITION p_smb_pool        VALUES IN (2001, 2002, 2003, 2004)
);`
  },
  {
    question: "How are `NULL` values handled in LIST partitioned tables?",
    shortAnswer: "A row with a `NULL` partition key is **rejected with `ERROR 1526` unless a partition explicitly includes `NULL` in its list** (e.g. `PARTITION p_null VALUES IN (NULL)` or `VALUES IN (10, 11, NULL)`).",
    explanation: "Unlike RANGE (which automatically stores NULL in the lowest partition), LIST requires explicit declaration.",
    hint: "Rejected unless a partition explicitly declares VALUES IN (NULL).",
    level: "intermediate",
    codeExample: `PARTITION BY LIST (status_code) (
  PARTITION p_active   VALUES IN (1, 2),
  PARTITION p_inactive VALUES IN (0),
  PARTITION p_unknown  VALUES IN (NULL)
);`
  },
  {
    question: "How do you add a new categorical value (e.g. adding 'Hyderabad') to a LIST partitioned table online?",
    shortAnswer: "Either: 1. Add a new partition using `ALTER TABLE table_name ADD PARTITION (PARTITION p_south VALUES IN ('Hyderabad', 'Chennai'));`, or 2. Reorganize an existing partition to include the new city: `ALTER TABLE table_name REORGANIZE PARTITION p_south INTO (PARTITION p_south VALUES IN ('Bangalore', 'Hyderabad'));`.",
    explanation: "Expands partition definitions online without locking other partitions.",
    hint: "Use ALTER TABLE ADD PARTITION or REORGANIZE PARTITION to include new category values.",
    level: "intermediate",
    codeExample: `ALTER TABLE store_invoices ADD PARTITION (
  PARTITION p_south VALUES IN ('Hyderabad', 'Chennai', 'Bangalore')
);`
  },
  {
    question: "How does Partition Pruning operate when a query filters on `WHERE region_name = 'Kolkata'` on a LIST partitioned table?",
    shortAnswer: "The optimizer maps `'Kolkata'` to its enclosing partition (`p_bengal`), prunes all other regional partitions, and opens **only `regional_accounts#p#p_bengal.ibd`** on disk.",
    explanation: "Eliminates all cross-region partition scans instantly.",
    hint: "Prunes all other partitions and opens only the specific matching region partition file.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM regional_accounts WHERE region_name = 'Kolkata';
-- partitions: p_bengal`
  },
  {
    question: "What happens if a query uses an `IN (...)` list containing values belonging to multiple LIST partitions (e.g. `WHERE region_name IN ('Kolkata', 'New Delhi')`)?",
    shortAnswer: "The optimizer identifies the matching partitions (`p_bengal` and `p_delhi`) and prunes all others, scanning **only those two specific physical partitions** and skipping `p_mumbai` and `p_south`.",
    explanation: "Prunes multi-value queries to the minimal set of candidate partitions.",
    hint: "Prunes to scan only the union of partitions containing the queried values.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM regional_accounts WHERE region_name IN ('Kolkata', 'New Delhi');
-- partitions: p_bengal, p_delhi`
  },
  {
    question: "Can an `ENUM` column be used in `PARTITION BY LIST COLUMNS`?",
    shortAnswer: "**Yes**, an `ENUM` column can be used directly in `LIST COLUMNS (enum_col)`, matching its string representations (e.g. `VALUES IN ('ACTIVE', 'PENDING')`).",
    explanation: "Allows intuitive status and workflow partitioning.",
    hint: "Yes, ENUM columns can be used directly in LIST COLUMNS.",
    level: "intermediate",
    codeExample: `CREATE TABLE orders (
  order_id INT NOT NULL,
  status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED') NOT NULL,
  PRIMARY KEY (order_id, status)
) PARTITION BY LIST COLUMNS (status) (
  PARTITION p_open   VALUES IN ('PENDING', 'PROCESSING'),
  PARTITION p_closed VALUES IN ('COMPLETED', 'CANCELLED')
);`
  },
  {
    question: "What happens when an `UPDATE` changes a row's category from `'PENDING'` to `'COMPLETED'` on a LIST partitioned table?",
    shortAnswer: "InnoDB performs an **atomic cross-partition row transfer**: deletes the row from `p_open.ibd` and inserts it into `p_closed.ibd` within the same transaction.",
    explanation: "Row movement is completely transparent to client applications.",
    hint: "Atomically deletes row from p_open and inserts into p_closed within the transaction.",
    level: "intermediate",
    codeExample: `UPDATE orders SET status = 'COMPLETED' WHERE order_id = 101;`
  },
  {
    question: "Why should highly volatile workflow status columns (e.g. transitioning every 5 seconds) be partitioned with caution?",
    shortAnswer: "Because frequent status updates trigger constant cross-partition row deletions and insertions, increasing undo log generation, row lock duration, and B-Tree fragmentation across multiple `.ibd` files.",
    explanation: "Partitioning is best suited for stable categories or final state archiving.",
    hint: "Frequent status updates trigger heavy cross-partition delete/insert overhead.",
    level: "expert",
    codeExample: `-- Caution: Rapid status changes cause heavy cross-partition movement overhead.`
  },
  {
    question: "What is `ALTER TABLE ... DROP PARTITION`'s effect on a LIST partitioned table?",
    shortAnswer: "It deletes the specified partition `.ibd` file and **all rows belonging to its categorical values permanently in milliseconds**, and removes those values from the table schema (subsequent inserts with those values will now fail with Error 1526).",
    explanation: "Instantly purges an entire geographic or tenant partition.",
    hint: "Deletes partition file and data permanently; values are removed from table schema.",
    level: "basic",
    codeExample: `ALTER TABLE regional_accounts DROP PARTITION p_mumbai;`
  },
  {
    question: "How do you split a single consolidated partition (e.g. `p_north` holding Delhi, Noida, and Punjab) into two distinct partitions?",
    shortAnswer: "Use `ALTER TABLE table_name REORGANIZE PARTITION p_north INTO (PARTITION p_delhi_ncr VALUES IN ('New Delhi', 'Noida'), PARTITION p_punjab VALUES IN ('Punjab', 'Chandigarh'));`.",
    explanation: "Reorganizes categorical values into separate physical files with zero data loss.",
    hint: "Use REORGANIZE PARTITION to redistribute values into smaller partitions without data loss.",
    level: "intermediate",
    codeExample: `ALTER TABLE regional_accounts REORGANIZE PARTITION p_north INTO (
  PARTITION p_delhi_ncr VALUES IN ('New Delhi', 'Noida'),
  PARTITION p_punjab    VALUES IN ('Punjab', 'Chandigarh')
);`
  },
  {
    question: "How does `WHERE region_name <> 'Kolkata'` prune on a LIST partitioned table with 10 regions across 5 partitions?",
    shortAnswer: "If `p_bengal` contains ONLY `'Kolkata'`, the optimizer prunes `p_bengal` and scans the remaining 4 partitions; if `p_bengal` contains `'Kolkata'` and `'Barrackpore'`, `p_bengal` must still be scanned for Barrackpore rows.",
    explanation: "Demonstrates inequality pruning behavior on discrete categorical lists.",
    hint: "Prunes partition only if all values in that partition are excluded by the inequality.",
    level: "expert",
    codeExample: `-- Inequality pruning requires partition values to be completely excluded.`
  },
  {
    question: "What is Multi-Column LIST Partitioning (`PARTITION BY LIST COLUMNS (col1, col2)`) in MySQL 8.0?",
    shortAnswer: "Allows defining partition lists based on **tuples of values** across multiple columns (e.g. `VALUES IN (('IN', 'WB'), ('IN', 'DL'))`), enabling composite categorical routing.",
    explanation: "Enables multi-dimensional categorical partitioning across country and state codes.",
    hint: "Defines partition lists based on tuples of values across multiple columns.",
    level: "expert",
    codeExample: `PARTITION BY LIST COLUMNS (country_code, state_code) (
  PARTITION p_india_bengal VALUES IN (('IN', 'WB')),
  PARTITION p_india_delhi  VALUES IN (('IN', 'DL'))
);`
  },
  {
    question: "Can an `ALTER TABLE` statement convert a non-partitioned table into a LIST partitioned table?",
    shortAnswer: "**Yes**, provided all existing rows in the table match at least one of the defined `VALUES IN` lists (and the primary key contains the partition column); MySQL redistributes all rows into physical `.ibd` partition files.",
    explanation: "Converts legacy tables to partitioned storage online.",
    hint: "Yes, provided all existing rows match defined VALUES IN lists and PK includes partition column.",
    level: "intermediate",
    codeExample: `ALTER TABLE customers PARTITION BY LIST COLUMNS (region) (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore'),
  PARTITION p_others VALUES IN ('Delhi', 'Mumbai')
);`
  },
  {
    question: "How do you inspect which partition holds a specific category value in `information_schema.PARTITIONS`?",
    shortAnswer: "`SELECT PARTITION_NAME, PARTITION_DESCRIPTION, TABLE_ROWS FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'regional_accounts';` (where `PARTITION_DESCRIPTION` lists the `VALUES IN` items).",
    explanation: "Displays partition mapping rules programmatically.",
    hint: "Query PARTITION_DESCRIPTION in information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, PARTITION_DESCRIPTION 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'regional_accounts';`
  },
  {
    question: "What is the primary operational advantage of LIST partitioning for regulatory data residency compliance (e.g. GDPR / RBI data localization)?",
    shortAnswer: "By defining `DATA DIRECTORY` on specific LIST partitions (e.g. storing `p_india` on local domestic NVMe disks and `p_eu` on Frankfurt storage), enterprise databases can physically isolate data by legal jurisdiction within a single logical database schema.",
    explanation: "Enforces physical storage compliance per geographic territory.",
    hint: "Allows placing individual regional partitions on distinct physical storage tiers via DATA DIRECTORY.",
    level: "expert",
    codeExample: `PARTITION p_india VALUES IN ('IN') DATA DIRECTORY = '/mnt/india_nvme',
PARTITION p_eu    VALUES IN ('EU') DATA DIRECTORY = '/mnt/eu_nvme'`
  },
  {
    question: "What is `ALTER TABLE ... TRUNCATE PARTITION p_bengal` used for on a LIST partitioned table?",
    shortAnswer: "It deletes all rows belonging to the Bengal partition instantly while **retaining the partition definition and its `VALUES IN` category mappings** in the table schema.",
    explanation: "Empties a category partition for fresh data loading without altering DDL definitions.",
    hint: "Empties partition data but keeps category mappings intact.",
    level: "basic",
    codeExample: `ALTER TABLE regional_accounts TRUNCATE PARTITION p_bengal;`
  },
  {
    question: "What happens if you attempt to create a LIST partitioned table without specifying any `VALUES IN` clauses?",
    shortAnswer: "MySQL rejects the DDL with a syntax error; every partition in a LIST partitioned table must contain an explicit `VALUES IN (...)` clause with at least one value.",
    explanation: "Mandatory syntax requirement for LIST partitioning.",
    hint: "Syntax error; every LIST partition must define an explicit VALUES IN list.",
    level: "basic",
    codeExample: `-- Every partition requires VALUES IN (...).`
  },
  {
    question: "How does `EXCHANGE PARTITION` work with LIST partitioned tables?",
    shortAnswer: "It swaps the physical `.ibd` file of a specific category partition (e.g. `p_bengal`) with a standalone non-partitioned staging table in **under 10 milliseconds**, provided all rows in the staging table match the `VALUES IN` list for `p_bengal`.",
    explanation: "Accelerates regional batch ingestion and staging table swaps.",
    hint: "Swaps tablespace file pointers with a standalone table matching the partition's category values.",
    level: "intermediate",
    codeExample: `ALTER TABLE regional_accounts EXCHANGE PARTITION p_bengal WITH TABLE bengal_staging;`
  },
  {
    question: "What happens if a standalone table passed to `EXCHANGE PARTITION` contains a row with `region_name = 'Mumbai'` when swapping with `p_bengal`?",
    shortAnswer: "MySQL rejects the exchange with `ERROR 1736 (HY000): Found row that does not match the partition rule`, preventing invalid data from entering the partition.",
    explanation: "Enforces partition rule validation before completing the tablespace swap.",
    hint: "Rejects exchange with Error 1736 if any row violates the partition's VALUES IN rule.",
    level: "expert",
    codeExample: `-- Error 1736: Staging rows must strictly match p_bengal values.`
  },
  {
    question: "Can LIST partitioning be combined with HASH or KEY subpartitioning (Composite Partitioning)?",
    shortAnswer: "**Yes**, you can partition by `LIST` on regional categories (e.g. Bengal, Delhi) and subpartition each region by `HASH` or `KEY` on `customer_id` into 4 buckets, achieving two-tier physical distribution.",
    explanation: "Combines categorical routing with hash load balancing.",
    hint: "Yes, LIST-HASH and LIST-KEY composite partitioning is fully supported.",
    level: "intermediate",
    codeExample: `PARTITION BY LIST COLUMNS (region)
SUBPARTITION BY KEY (customer_id)
SUBPARTITIONS 4 (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore'),
  PARTITION p_delhi  VALUES IN ('Delhi', 'Noida')
);`
  },
  {
    question: "What is the maximum number of values that can be defined inside a single `VALUES IN (...)` list?",
    shortAnswer: "MySQL supports thousands of values in a `VALUES IN` list, limited only by maximum query packet and metadata buffer sizes; in production, lists typically range from 1 to 50 values per partition.",
    explanation: "Allows grouping dozens of cities or tenant IDs into a single regional partition.",
    hint: "Supports thousands of values; practically sized to 1-50 values per partition.",
    level: "basic",
    codeExample: `PARTITION p_metro VALUES IN ('Kolkata', 'Mumbai', 'Delhi', 'Chennai', 'Bengaluru', 'Hyderabad')`
  },
  {
    question: "How do you merge two separate LIST partitions (e.g. `p_howrah` and `p_kolkata`) into a single combined partition (`p_bengal`)?",
    shortAnswer: "Execute `ALTER TABLE table_name REORGANIZE PARTITION p_howrah, p_kolkata INTO (PARTITION p_bengal VALUES IN ('Kolkata', 'Howrah', 'Barrackpore'));`.",
    explanation: "Merges categorical partitions online with zero data loss.",
    hint: "Use REORGANIZE PARTITION to combine discrete partitions into a consolidated partition.",
    level: "intermediate",
    codeExample: `ALTER TABLE store_invoices REORGANIZE PARTITION p_howrah, p_kolkata INTO (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Howrah', 'Barrackpore')
);`
  },
  {
    question: "Why should `LIST COLUMNS` be preferred over `LIST (region_id)` when building multi-tenant SaaS databases?",
    shortAnswer: "Because `LIST COLUMNS (tenant_slug)` allows storing human-readable tenant identifiers (e.g. `'tata'`, `'reliance'`) directly in DDL without maintaining internal surrogate integer ID mapping tables, simplifying application queries and database maintenance.",
    explanation: "Eliminates integer lookup joins and makes partition metadata self-documenting.",
    hint: "Allows using human-readable tenant strings directly without integer translation tables.",
    level: "basic",
    codeExample: `PARTITION BY LIST COLUMNS (tenant_slug) (
  PARTITION p_tata     VALUES IN ('tata_motors', 'tcs'),
  PARTITION p_reliance VALUES IN ('jio', 'retail')
);`
  },
  {
    question: "What is the recommended health check query to detect data skew across LIST partitioned tables?",
    shortAnswer: "`SELECT PARTITION_NAME, TABLE_ROWS, ROUND(DATA_LENGTH/1024/1024, 2) AS MB FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'regional_accounts';`.",
    explanation: "Identifies whether one regional partition is growing disproportionately larger than others.",
    hint: "Query TABLE_ROWS and DATA_LENGTH across partitions in information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, TABLE_ROWS, ROUND(DATA_LENGTH/1024/1024, 2) AS MB 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'regional_accounts';`
  },
  {
    question: "What is the primary operational takeaway of Topic 4 in Module 004_007?",
    shortAnswer: "LIST Partitioning is the premier strategy for discrete categorical, regional, and multi-tenant datasets: standardize on **`PARTITION BY LIST COLUMNS (varchar_col)`** for direct string mapping, ensure all `VALUES IN` sets are **strictly disjoint**, handle `NULL` explicitly with **`VALUES IN (NULL)`**, leverage **`ALTER TABLE ADD/REORGANIZE PARTITION`** to expand categories online, and enforce **data residency tiering via `DATA DIRECTORY`** on specific regional partitions.",
    explanation: "Mastering LIST partitioning enables building high-performance multi-tenant and multi-region database architectures with complete physical data isolation.",
    hint: "Summarize LIST vs LIST COLUMNS, disjoint set rules, explicit NULL handling, dynamic partition additions, and data residency tiering.",
    level: "basic",
    codeExample: `-- Master LIST COLUMNS Blueprint:
CREATE TABLE enterprise_tenants (
  tenant_code VARCHAR(30) NOT NULL,
  account_id BIGINT NOT NULL,
  balance DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (account_id, tenant_code)
) ENGINE = InnoDB
PARTITION BY LIST COLUMNS (tenant_code) (
  PARTITION p_bengal_hub VALUES IN ('Kolkata', 'Barrackpore', 'Howrah'),
  PARTITION p_delhi_hub  VALUES IN ('New Delhi', 'Noida', 'Gurgaon'),
  PARTITION p_mumbai_hub VALUES IN ('Mumbai', 'Pune', 'Thane'),
  PARTITION p_unassigned VALUES IN (NULL)
);

-- Pruned Query:
SELECT * FROM enterprise_tenants WHERE tenant_code = 'Kolkata';`
  }
];

export default questions;
