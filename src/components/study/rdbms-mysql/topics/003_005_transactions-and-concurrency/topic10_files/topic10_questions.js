// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is 'Lock Granularity' in database management systems?",
    shortAnswer: "The scope or size of the database resource being locked—ranging from coarse granularity (entire database or table) to fine granularity (page, row, or column).",
    explanation: "Core definition of lock granularity.",
    hint: "The scope of the locked resource (table vs page vs row).",
    level: "basic"
  },
  {
    question: "What is the primary advantage of Row-Level Locking over Table-Level Locking?",
    shortAnswer: "Significantly higher concurrency; multiple transactions can modify different rows within the same table simultaneously without blocking each other.",
    explanation: "Concurrency benefits of row-level locking.",
    hint: "Higher concurrency; multiple transactions modify different rows in parallel.",
    level: "basic"
  },
  {
    question: "How do student transactions for Mamata and Susmita illustrate Row-Level Locking?",
    shortAnswer: "Session 1 updates Mamata's balance (ID 101) while Session 2 simultaneously updates Susmita's balance (ID 102) with zero blocking, because InnoDB locks only their specific index rows.",
    explanation: "Row-level parallel mutations.",
    hint: "Session 1 locks Mamata's row; Session 2 locks Susmita's row in parallel.",
    level: "basic"
  },
  {
    question: "On what internal database structure does InnoDB implement Row-Level Locks?",
    shortAnswer: "InnoDB locks **Index Records** in the B+Tree (clustered or secondary index), NOT the physical table or heap rows directly.",
    explanation: "Index-based implementation of InnoDB row locks.",
    hint: "Implemented on Index Records in B+Trees.",
    level: "expert"
  },
  {
    question: "What happens if an `UPDATE` or `DELETE` statement executes without matching any index (full table scan)?",
    shortAnswer: "InnoDB must scan and lock **every single index record in the entire table**, effectively degrading row-level locking to a table-wide lock!",
    explanation: "Accidental table lock degradation via un-indexed scans.",
    hint: "Locks every record in the table, degrading to a full table lock.",
    level: "expert"
  },
  {
    question: "What SQL statement explicitly acquires a table-level read lock in MySQL?",
    shortAnswer: "`LOCK TABLES table_name READ;`.",
    explanation: "LOCK TABLES READ syntax.",
    hint: "LOCK TABLES table_name READ;",
    level: "basic"
  },
  {
    question: "What SQL statement explicitly acquires a table-level write lock in MySQL?",
    shortAnswer: "`LOCK TABLES table_name WRITE;`.",
    explanation: "LOCK TABLES WRITE syntax.",
    hint: "LOCK TABLES table_name WRITE;",
    level: "basic"
  },
  {
    question: "What statement releases all table locks acquired with `LOCK TABLES`?",
    shortAnswer: "`UNLOCK TABLES;` (or starting an explicit transaction with `START TRANSACTION;` which implicitly unlocks tables).",
    explanation: "UNLOCK TABLES syntax and implicit unlock behavior.",
    hint: "UNLOCK TABLES;",
    level: "basic"
  },
  {
    question: "Which MySQL storage engine famously supported ONLY Table-Level Locking?",
    shortAnswer: "**MyISAM** (and the `MEMORY` engine).",
    explanation: "MyISAM table-level locking limitation.",
    hint: "MyISAM and MEMORY engines.",
    level: "basic"
  },
  {
    question: "What are Intention Locks (IS / IX) in InnoDB?",
    shortAnswer: "Table-level locks that declare an upcoming transaction's intention to acquire Shared (IS) or Exclusive (IX) row-level locks on individual rows in that table.",
    explanation: "Intention lock definition.",
    hint: "Table-level locks declaring intent to acquire row locks.",
    level: "expert"
  },
  {
    question: "How do Intention Locks make table-level locking checks faster (O(1) time complexity)?",
    shortAnswer: "When `ALTER TABLE` or `LOCK TABLES WRITE` requests an exclusive table lock, it checks the table-level `IX`/`IS` flags instantly without having to scan millions of individual row locks in memory.",
    explanation: "O(1) table lock verification via intention locks.",
    hint: "Allows instant table-level check without scanning all individual row locks.",
    level: "expert"
  },
  {
    question: "What is a 'Metadata Lock' (MDL) in MySQL?",
    shortAnswer: "An internal server-level lock on table structure and schema definitions that prevents DDL (`ALTER TABLE`, `DROP TABLE`) from altering a table while queries are reading or writing data.",
    explanation: "Metadata lock definition and role.",
    hint: "Protects table schema definitions during active DML queries.",
    level: "expert"
  },
  {
    question: "What happens if a developer runs `ALTER TABLE` while an uncommitted transaction is holding a row lock on that table?",
    shortAnswer: "The `ALTER TABLE` is BLOCKED by a Metadata Lock (MDL), and all subsequent queries on that table queue behind the `ALTER TABLE`, causing system-wide connection pool exhaustion!",
    explanation: "Metadata lock blocking cascade.",
    hint: "ALTER TABLE blocks on MDL, and all subsequent queries queue behind it.",
    level: "expert"
  },
  {
    question: "What table in `performance_schema` allows you to inspect active Metadata Locks in MySQL 8.0?",
    shortAnswer: "`performance_schema.metadata_locks`.",
    explanation: "Inspecting metadata locks in MySQL 8.0.",
    hint: "performance_schema.metadata_locks.",
    level: "basic"
  },
  {
    question: "What is 'Lock Escalation' and does InnoDB support it?",
    shortAnswer: "Lock Escalation is the automatic conversion of many row locks into a single table lock to save memory (used in SQL Server); **InnoDB does NOT use Lock Escalation** (it uses efficient bit-vectors per page).",
    explanation: "Lack of lock escalation in InnoDB.",
    hint: "InnoDB does NOT escalate row locks to table locks.",
    level: "expert"
  },
  {
    question: "How does InnoDB store millions of row locks without running out of memory?",
    shortAnswer: "InnoDB represents row locks as compact bitmaps associated with each page in the buffer pool, requiring only ~16 bytes of memory per lock structure.",
    explanation: "Bitmap-based memory efficiency of InnoDB row locks.",
    hint: "Stores row locks as compact bitmaps per page structure.",
    level: "expert"
  },
  {
    question: "Can an application lock an entire table using `SELECT ... FOR UPDATE`?",
    shortAnswer: "No direct syntax exists for table-level X-locks via `SELECT`, but omitting the `WHERE` clause (`SELECT * FROM table FOR UPDATE`) locks every row record, effectively locking the entire table.",
    explanation: "Simulating table-wide locking with full scan FOR UPDATE.",
    hint: "Omitting the WHERE clause locks every index record in the table.",
    level: "basic"
  },
  {
    question: "What happens if you execute `LOCK TABLES student_ledgers READ` and then try to execute an `UPDATE` on Mamata's row in the same session?",
    shortAnswer: "MySQL throws Error `1099` (`Table was locked with a READ lock and can't be updated`).",
    explanation: "Read lock mutation restriction.",
    hint: "Throws Error 1099 (table locked with a READ lock).",
    level: "basic"
  },
  {
    question: "Does `LOCK TABLES` force an implicit commit of an active transaction?",
    shortAnswer: "YES; executing `LOCK TABLES` or `UNLOCK TABLES` implicitly commits any currently active transaction.",
    explanation: "Implicit commit on LOCK/UNLOCK TABLES.",
    hint: "Yes, LOCK TABLES forces an implicit COMMIT.",
    level: "expert"
  },
  {
    question: "Why should developers NEVER use `LOCK TABLES` with InnoDB in modern web applications?",
    shortAnswer: "Because `LOCK TABLES` disables InnoDB's fine-grained row-level concurrency, causes implicit commits, blocks all concurrent traffic, and severely degrades throughput.",
    explanation: "Anti-pattern of LOCK TABLES in InnoDB.",
    hint: "Destroys concurrency, forces implicit commits, and blocks all other connections.",
    level: "basic"
  },
  {
    question: "How does InnoDB handle secondary index row locks vs clustered index row locks?",
    shortAnswer: "InnoDB acquires an X-Lock on the matched secondary index record AND immediately acquires a corresponding X-Lock on the clustered primary key index record.",
    explanation: "Dual-index locking in InnoDB.",
    hint: "Locks the secondary index record and the corresponding clustered primary key record.",
    level: "expert"
  },
  {
    question: "What is an 'Auto-Increment Lock' (`AUTO_INC`) in InnoDB?",
    shortAnswer: "A special table-level lock acquired during bulk inserts to generate sequential auto-increment values (configured via `innodb_autoinc_lock_mode`).",
    explanation: "Auto-increment lock mechanics.",
    hint: "Special table-level lock for generating sequential auto-increment IDs.",
    level: "expert"
  },
  {
    question: "What is the recommended `innodb_autoinc_lock_mode` setting in MySQL 8.0?",
    shortAnswer: "`innodb_autoinc_lock_mode = 2` (Interleaved mode, the MySQL 8.0 default), which eliminates table-level auto-increment locking for bulk inserts.",
    explanation: "Interleaved auto-increment lock mode.",
    hint: "Mode 2 (Interleaved mode) eliminates table-level AUTO_INC locks.",
    level: "expert"
  },
  {
    question: "Can an application lock a specific partition in a partitioned table?",
    shortAnswer: "Yes; queries targeting a specific partition with partition pruning acquire locks restricted to that specific partition tablespace.",
    explanation: "Partition-level lock pruning.",
    hint: "Yes, partition pruning restricts locking to the targeted partition.",
    level: "moderate"
  },
  {
    question: "How do Page-Level Locks compare to Table-Level and Row-Level Locks?",
    shortAnswer: "Page locks lock a physical storage page (e.g. 16KB); they offer a middle ground between table and row locking (used in BDB storage engine, but NOT in InnoDB).",
    explanation: "Page-level locking comparison.",
    hint: "Locks physical 16KB pages; middle ground between table and row locking.",
    level: "moderate"
  },
  {
    question: "What is the memory overhead difference between locking 1,000 rows in InnoDB vs SQL Server?",
    shortAnswer: "In InnoDB, bitmap locks consume negligible memory (~few KB); in SQL Server, 1,000 separate lock objects can trigger lock escalation to a table lock unless configured otherwise.",
    explanation: "Lock memory comparison across engines.",
    hint: "InnoDB uses compact bitmap pages; SQL Server uses lock objects with escalation.",
    level: "expert"
  },
  {
    question: "How do you detect if an `UPDATE` query is causing accidental table-wide row locking in production?",
    shortAnswer: "Run `EXPLAIN` on the `UPDATE` query and verify that `type` is `ref` or `range` (using an index), NOT `ALL` (full table scan).",
    explanation: "EXPLAIN analysis for locking queries.",
    hint: "Run EXPLAIN to ensure the query uses an index (type != ALL).",
    level: "basic"
  },
  {
    question: "Can two transactions insert into the same table simultaneously with row-level locking?",
    shortAnswer: "YES; as long as they insert distinct primary key values and their gap locks do not conflict, concurrent inserts execute in parallel.",
    explanation: "Concurrent parallel insertions in InnoDB.",
    hint: "Yes, parallel inserts execute without conflict on distinct keys.",
    level: "basic"
  },
  {
    question: "What happens if a transaction drops an index while other transactions are reading rows?",
    shortAnswer: "`DROP INDEX` is a DDL operation that acquires an exclusive Metadata Lock (MDL), blocking until all active readers finish, and then modifying the schema.",
    explanation: "DDL metadata locking during index drops.",
    hint: "Acquires an exclusive MDL, waiting for active readers to finish.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Lock Granularity?",
    shortAnswer: "Always rely on **InnoDB Row-Level Locking** for multi-user transactional workloads; guarantee that all `UPDATE`, `DELETE`, and `SELECT ... FOR UPDATE` queries utilize selective B+Tree indexes to prevent accidental full-table record lock degradation; never use `LOCK TABLES`; and configure `innodb_autoinc_lock_mode = 2` for maximum concurrent insertion throughput.",
    explanation: "Authoritative architectural best practices for lock granularity.",
    hint: "Row-level locking + indexed queries to avoid full-table lock degradation + avoid LOCK TABLES.",
    level: "expert"
  }
];

export default questions;
