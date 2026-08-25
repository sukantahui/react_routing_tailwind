// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What are the four primary advantages of InnoDB over MyISAM?",
    shortAnswer: "1) **ACID Transactions** with commit/rollback, 2) **Row-Level Locking** with MVCC (non-blocking reads), 3) **Foreign Key Constraints** for referential integrity, and 4) **Automatic Crash Recovery** using Write-Ahead Redo logs.",
    explanation: "InnoDB is the enterprise-grade transactional engine for modern OLTP.",
    hint: "ACID transactions, row locking with MVCC, foreign keys, and crash recovery.",
    level: "basic"
  },
  {
    question: "What happens to data stored in a `MEMORY` storage engine table when the MySQL server restarts?",
    shortAnswer: "All table data is completely lost because the data resides entirely in volatile RAM; however, the table's schema definition remains intact in the data dictionary (table is empty upon startup).",
    explanation: "MEMORY tables are ephemeral in nature.",
    hint: "Data is lost from RAM upon restart, but table schema structure is preserved.",
    level: "basic"
  },
  {
    question: "What operations does the `ARCHIVE` storage engine support, and what operations are forbidden?",
    shortAnswer: "`ARCHIVE` supports `INSERT` and `SELECT` (with optional zlib compression); it **forbids `UPDATE`, `DELETE`, and `REPLACE`** operations.",
    explanation: "Designed exclusively for append-only historical audit and telemetry logging.",
    hint: "Supports INSERT and SELECT; forbids UPDATE, DELETE, and REPLACE.",
    level: "expert"
  },
  {
    question: "What is the purpose of the `BLACKHOLE` storage engine in enterprise MySQL architectures?",
    shortAnswer: "It discards all written row data immediately ('/dev/null'), but records the write events in the MySQL **Binary Log**, making it ideal for replication relay routers, statement filtering nodes, and audit hooks.",
    explanation: "Enables multi-tier replication topologies without consuming disk storage on relay nodes.",
    hint: "Discards data while recording events to the binary log for replication routing.",
    level: "expert"
  },
  {
    question: "How do you convert an existing table from MyISAM to InnoDB?",
    shortAnswer: "`ALTER TABLE table_name ENGINE = InnoDB;`",
    explanation: "Rebuilds the table into an InnoDB clustered index tablespace (`.ibd`).",
    hint: "ALTER TABLE tbl ENGINE = InnoDB;",
    level: "basic",
    codeExample: "ALTER TABLE legacy_customers ENGINE = InnoDB;"
  },
  {
    question: "Why is MyISAM prone to table lock contention under high-concurrency write workloads?",
    shortAnswer: "Because MyISAM uses **Table-Level Locking**—any `INSERT`, `UPDATE`, or `DELETE` locks the entire table, blocking all other read and write threads until the write completes.",
    explanation: "Table locking causes massive connection queues under concurrent traffic.",
    hint: "Uses table-level locks that block all concurrent readers and writers.",
    level: "basic"
  },
  {
    question: "What index types are supported by the `MEMORY` storage engine?",
    shortAnswer: "**HASH indexes** (default, $O(1)$ constant time exact match lookups) and **B-Tree indexes** (for range queries).",
    explanation: "Hash indexes are optimal for key-value equality lookups in memory.",
    hint: "Supports Hash indexes (O(1) exact lookups) and B-Tree indexes (range lookups).",
    level: "expert"
  },
  {
    question: "What is the primary use case for the `CSV` storage engine?",
    shortAnswer: "Storing data as standard comma-separated text files on disk, allowing direct file access, spreadsheet import/export, and simple ETL pipeline ingestion without database drivers.",
    explanation: "The `.csv` data files in the data directory can be opened directly in Excel or text editors.",
    hint: "Directly readable text CSV format for spreadsheet and ETL interoperability.",
    level: "basic"
  },
  {
    question: "Does the `CSV` storage engine support NULL values or indexes?",
    shortAnswer: "No! `CSV` tables require all columns to be defined as `NOT NULL` and do not support indexes, requiring full table scans for all queries.",
    explanation: "Simplicity comes at the cost of indexing and nullability features.",
    hint: "Requires all columns to be NOT NULL and does not support indexing.",
    level: "expert"
  },
  {
    question: "How does InnoDB handle crash recovery after an unexpected power outage?",
    shortAnswer: "During startup, InnoDB reads the **Redo Log (WAL)** to roll forward all committed changes that were not yet flushed to disk pages, and inspects the **Undo Log** to roll back uncommitted in-flight transactions.",
    explanation: "Guarantees complete ACID Durability and Atomicity without manual table repair.",
    hint: "Applies redo log to roll forward committed data and undo log to roll back uncommitted transactions.",
    level: "expert"
  },
  {
    question: "What must a DBA do if a MyISAM table gets corrupted during a server crash?",
    shortAnswer: "The DBA must manually run `REPAIR TABLE table_name;` or use the external `myisamchk` utility to rebuild the corrupted `.MYI` index file.",
    explanation: "MyISAM lacks transactional logging and cannot self-heal automatically.",
    hint: "Must manually execute REPAIR TABLE or run myisamchk utility.",
    level: "basic"
  },
  {
    question: "What limits the maximum size of a `MEMORY` storage engine table?",
    shortAnswer: "The `max_heap_table_size` system variable (and `tmp_table_size`), which restricts the maximum RAM allocated to a single memory table.",
    explanation: "If a memory table exceeds this threshold, MySQL throws an error: `The table is full`.",
    hint: "Restricted by max_heap_table_size and tmp_table_size variables.",
    level: "basic"
  },
  {
    question: "What is a Clustered Index in InnoDB versus MyISAM's Non-Clustered Storage?",
    shortAnswer: "In **InnoDB**, table data is physically organized inside the Primary Key B+ Tree (Clustered Index); in **MyISAM**, data is stored in a flat heap file (`.MYD`) and indexes (`.MYI`) merely store byte offset pointers to the data file.",
    explanation: "Clustered indexes eliminate secondary lookups when querying by Primary Key.",
    hint: "InnoDB stores data rows inside the Primary Key B+ Tree; MyISAM stores data in a separate flat file.",
    level: "expert"
  },
  {
    question: "Can an `ARCHIVE` storage engine table be indexed?",
    shortAnswer: "`ARCHIVE` only supports indexing on an `AUTO_INCREMENT` column; secondary indexes on non-auto-increment columns are not permitted.",
    explanation: "Designed for high-speed sequential scanning of compressed historical data.",
    hint: "Only supports indexing on an AUTO_INCREMENT column.",
    level: "expert"
  },
  {
    question: "What is the `FEDERATED` storage engine in MySQL?",
    shortAnswer: "It is an engine that allows creating local table pointers that query and update tables located on a **remote MySQL server** across the network without local data replication.",
    explanation: "Enables cross-server distributed table queries.",
    hint: "Connects local table schema to a remote MySQL database table across the network.",
    level: "expert"
  },
  {
    question: "Why should `ENGINE=InnoDB` be used for financial and e-commerce applications?",
    shortAnswer: "Because it provides ACID transactional guarantees (`COMMIT`/`ROLLBACK`), ensuring that balance deductions and payment records are atomic and consistent even during server failures.",
    explanation: "Non-transactional engines risk partial updates and financial discrepancies.",
    hint: "Guarantees ACID transactions, row-level locking, and crash safety for financial integrity.",
    level: "basic"
  },
  {
    question: "What file extensions were used by MyISAM on disk compared to InnoDB file-per-table?",
    shortAnswer: "MyISAM used `.sdi` (metadata), `.MYD` (data), and `.MYI` (indexes); InnoDB uses a single unified `.ibd` file per table (holding metadata, clustered data pages, and secondary indexes).",
    explanation: "Unified tablespaces simplify storage management.",
    hint: "MyISAM uses .MYD (data) and .MYI (indexes); InnoDB uses unified .ibd tablespaces.",
    level: "expert"
  },
  {
    question: "What is the `NDBCLUSTER` (MySQL Cluster) storage engine?",
    shortAnswer: "A distributed, in-memory, shared-nothing clustered storage engine designed for ultra-high availability (99.999% 'five nines') and auto-sharded multi-master scalability.",
    explanation: "Used in telecommunications and high-throughput real-time systems.",
    hint: "Distributed, in-memory, shared-nothing cluster engine for five-nines availability.",
    level: "expert"
  },
  {
    question: "What happens if a query against a `MEMORY` table uses `TEXT` or `BLOB` columns?",
    shortAnswer: "The `MEMORY` engine does not support `TEXT` or `BLOB` columns; attempting to create a memory table with them causes MySQL to automatically convert it to an on-disk InnoDB/TempTable format.",
    explanation: "MEMORY engine requires fixed-width rows in RAM.",
    hint: "MEMORY engine does not support BLOB/TEXT columns.",
    level: "expert"
  },
  {
    question: "How do you inspect the compression ratio achieved by an `ARCHIVE` table?",
    shortAnswer: "Compare the `data_length` in `information_schema.tables` against raw uncompressed text size (typically achieving 70% to 80% compression ratios using zlib).",
    explanation: "Significant disk space savings for historical log archives.",
    hint: "Check data_length in information_schema.tables to verify zlib compression savings.",
    level: "basic"
  },
  {
    question: "Why does InnoDB offer significantly higher write throughput than MyISAM under concurrent loads?",
    shortAnswer: "Because InnoDB uses **Row-Level Locking** (locking only the specific rows being modified) and **MVCC** (allowing readers to read consistent snapshots without waiting for write locks), whereas MyISAM locks the entire table.",
    explanation: "Row locking eliminates reader-writer concurrency bottlenecks.",
    hint: "Row-level locking and MVCC allow concurrent writes to different rows without blocking readers.",
    level: "basic"
  },
  {
    question: "What is the `EXAMPLE` storage engine?",
    shortAnswer: "A stub engine provided in MySQL source code that acts as a skeleton template for developers learning how to write custom pluggable storage engines.",
    explanation: "Educational template for storage engine developers.",
    hint: "Skeleton stub engine demonstrating how to build custom storage engines.",
    level: "basic"
  },
  {
    question: "How do you specify the storage engine when creating a new table?",
    shortAnswer: "`CREATE TABLE table_name (...) ENGINE = engine_name;` (e.g. `ENGINE=InnoDB` or `ENGINE=MEMORY`).",
    explanation: "Appends the engine clause to the table definition.",
    hint: "CREATE TABLE ... ENGINE = engine_name;",
    level: "basic",
    codeExample: "CREATE TABLE cache_lookups (\n  token_hash VARCHAR(64) PRIMARY KEY,\n  user_id INT\n) ENGINE = MEMORY;"
  },
  {
    question: "Can an administrator disable specific storage engines from running on the MySQL server?",
    shortAnswer: "Yes, by configuring `--disabled-storage-engines` in `my.cnf` (e.g. `disabled_storage_engines = 'MyISAM,MEMORY'`) to enforce enterprise compliance.",
    explanation: "Prevents developers from creating non-compliant tables.",
    hint: "Set disabled_storage_engines in my.cnf configuration.",
    level: "expert"
  },
  {
    question: "What storage engine is used by default for internal temporary tables created by complex queries in MySQL 8.0?",
    shortAnswer: "The **TempTable** engine (in-memory storage engine optimized for temporary query evaluation, overflowing to InnoDB on disk if memory exceeds `temptable_max_ram`).",
    explanation: "Replaced the legacy MEMORY/MyISAM temporary table mechanism.",
    hint: "TempTable engine (overflows to InnoDB on-disk when RAM limit exceeded).",
    level: "expert"
  },
  {
    question: "Why should web session tokens be stored in `MEMORY` or Redis rather than standard disk tables?",
    shortAnswer: "Because session reads and writes happen on every single HTTP request; in-memory storage provides microsecond latencies with zero disk I/O bottlenecks.",
    explanation: "RAM access is orders of magnitude faster than disk SSD I/O.",
    hint: "Provides microsecond access speeds with zero disk I/O overhead.",
    level: "basic"
  },
  {
    question: "What is the consequence of executing a `ROLLBACK` on a MyISAM table?",
    shortAnswer: "MySQL emits a warning: `Some non-transactional changed tables couldn't be rolled back`—all modifications remain permanently committed because MyISAM has no rollback capability.",
    explanation: "Non-transactional engines cannot undo executed DML statements.",
    hint: "Changes cannot be undone; MySQL emits a non-transactional rollback warning.",
    level: "basic"
  },
  {
    question: "How do you verify the storage engine used by every table in a database?",
    shortAnswer: "`SELECT table_name, engine FROM information_schema.tables WHERE table_schema = 'my_database';`",
    explanation: "Queries the information schema catalog for engine metadata.",
    hint: "SELECT table_name, engine FROM information_schema.tables WHERE table_schema = ?;",
    level: "basic"
  },
  {
    question: "What is the golden rule for storage engine selection in modern database design?",
    shortAnswer: "**Use InnoDB by default for 99% of tables**; only diverge to specialized engines (MEMORY, ARCHIVE, CSV, BLACKHOLE) when an explicit, measured architectural requirement justifies doing so.",
    explanation: "InnoDB's mature feature set satisfies almost all enterprise application needs.",
    hint: "Default to InnoDB for 99% of use cases; diverge only for specific specialized needs.",
    level: "basic"
  },
  {
    question: "What is the primary takeaway of Topic 1 in Module 004_001?",
    shortAnswer: "Understanding the operational trade-offs across storage engines enables database architects to select the right engine for the job: InnoDB for transactional OLTP, MEMORY for transient caching, ARCHIVE for compressed log ingestion, and CSV for external file sharing.",
    explanation: "Pluggable storage engine mastery allows optimizing storage and concurrency at the individual table level.",
    hint: "Matching workload characteristics to optimal storage engine architectures.",
    level: "basic"
  }
];

export default questions;
