// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is Multi-Version Concurrency Control (MVCC) in InnoDB?",
    shortAnswer: "A database concurrency mechanism that allows transactions to read historical snapshot versions of rows without acquiring shared locks, ensuring that **readers never block writers, and writers never block readers**.",
    explanation: "Achieves massive read-write concurrency in enterprise OLTP workloads.",
    hint: "Enables non-blocking reads where readers never block writers.",
    level: "basic"
  },
  {
    question: "What are the three hidden system columns added to every clustered index row by InnoDB?",
    shortAnswer: "1) `DB_TRX_ID` (6 bytes, last modifying transaction ID), 2) `DB_ROLL_PTR` (7 bytes, roll pointer to undo log version), and 3) `DB_ROW_ID` (6 bytes, surrogate key if no primary key exists).",
    explanation: "These internal columns form the backbone of MVCC row versioning.",
    hint: "DB_TRX_ID, DB_ROLL_PTR, and DB_ROW_ID.",
    level: "expert"
  },
  {
    question: "What is the 'Undo Version Chain' in InnoDB?",
    shortAnswer: "A linked list of previous row versions stored in the Undo Log, connected by `DB_ROLL_PTR` pointers starting from the current row in the clustered index back through older historical versions.",
    explanation: "Allows query threads to traverse backwards in time to locate the version visible to their Read View.",
    hint: "A linked list of historical row versions in the undo log connected by DB_ROLL_PTR.",
    level: "expert"
  },
  {
    question: "What is a 'Read View' in InnoDB MVCC?",
    shortAnswer: "An internal snapshot structure created when a transaction executes a consistent read (`SELECT`), recording: 1) `m_ids` (active uncommitted transaction IDs), 2) `min_trx_id`, and 3) `max_trx_id` (next transaction ID).",
    explanation: "Defines the boundary of which row versions are visible to the transaction.",
    hint: "Internal snapshot structure recording active uncommitted transaction IDs.",
    level: "expert"
  },
  {
    question: "How does Read View creation differ between `READ COMMITTED` and `REPEATABLE READ` isolation levels?",
    shortAnswer: "- **READ COMMITTED**: Generates a **brand new Read View on EVERY `SELECT` statement**, allowing the query to see changes committed by other transactions between statements.\n- **REPEATABLE READ (Default)**: Creates a single Read View on the **FIRST `SELECT` statement** and reuses it throughout the entire transaction, ensuring consistent point-in-time reads.",
    explanation: "Explains why REPEATABLE READ prevents non-repeatable reads while READ COMMITTED allows them.",
    hint: "READ COMMITTED creates a new view per query; REPEATABLE READ reuses one view for the transaction.",
    level: "expert"
  },
  {
    question: "What is the difference between an 'Insert Undo Log' and an 'Update Undo Log'?",
    shortAnswer: "- **Insert Undo Log**: Needed only for rolling back the active inserting transaction; discarded immediately upon `COMMIT`.\n- **Update/Delete Undo Log**: Retained after `COMMIT` to satisfy historical MVCC snapshot queries until older Read Views finish.",
    explanation: "Update undo logs require asynchronous background purging.",
    hint: "Insert undo is discarded on commit; Update undo is retained for MVCC snapshot reads.",
    level: "expert"
  },
  {
    question: "What is the role of the InnoDB Purge Thread in MVCC architecture?",
    shortAnswer: "It traverses the Undo Tablespaces and physically deletes old, obsolete undo log records that are no longer needed by any active transaction Read View.",
    explanation: "Reclaims undo disk space and frees memory in the Buffer Pool.",
    hint: "Deletes old undo log records no longer visible to any active Read View.",
    level: "basic"
  },
  {
    question: "What is the 'History List Length' (HLL) in `SHOW ENGINE INNODB STATUS`?",
    shortAnswer: "The total count of unpurged undo log pages waiting in the undo rollback segments to be cleaned up by the Purge Thread.",
    explanation: "A high History List Length (e.g. > 1,000,000) indicates severe undo log bloat.",
    hint: "The count of unpurged undo log pages waiting for purge thread cleanup.",
    level: "expert",
    codeExample: "SHOW ENGINE INNODB STATUS\\G\n-- Look at TRANSACTIONS section: 'History list length <N>'"
  },
  {
    question: "What causes the History List Length (HLL) to balloon to millions of pages?",
    shortAnswer: "A **long-running open transaction** (e.g. a forgotten `BEGIN` session or long batch report) holding open an old Read View, which prevents Purge Threads from cleaning up any undo records modified after that transaction started.",
    explanation: "Blocks purge across the entire MySQL instance.",
    hint: "A long-running open transaction preventing the purge thread from reclaiming undo logs.",
    level: "expert"
  },
  {
    question: "What are the performance consequences of severe Undo Log bloat (high HLL)?",
    shortAnswer: "1) Rapid expansion of Undo Tablespaces on disk, 2) Massive Buffer Pool memory consumption by undo pages, and 3) Slow query performance because `SELECT` statements must traverse long version chains to find visible rows.",
    explanation: "Severely degrades overall database throughput.",
    hint: "Inflates disk usage, pollutes buffer pool memory, and slows queries traversing long version chains.",
    level: "basic"
  },
  {
    question: "How does InnoDB decide whether a row version with transaction ID `TRX_ID` is visible to a Read View?",
    shortAnswer: "1) If `TRX_ID < min_trx_id`: **Visible** (committed before Read View).\n2) If `TRX_ID >= max_trx_id`: **Not Visible** (started after Read View).\n3) If `TRX_ID` is in `m_ids`: **Not Visible** (was active/uncommitted when View started).\n4) If `TRX_ID` is NOT in `m_ids`: **Visible** (committed before View started).",
    explanation: "The core mathematical visibility algorithm of MVCC.",
    hint: "Compares TRX_ID against min_trx_id, max_trx_id, and active m_ids list.",
    level: "expert"
  },
  {
    question: "Does `SELECT ... FOR UPDATE` use standard MVCC snapshot reads?",
    shortAnswer: "No! `SELECT ... FOR UPDATE` performs a **Locking Current Read** (reading the latest committed on-disk version) and acquires exclusive (`X`) row locks, bypassing the MVCC historical snapshot.",
    explanation: "Used when an application needs to lock rows for subsequent modification.",
    hint: "No, it performs a Locking Current Read, acquiring exclusive row locks.",
    level: "basic"
  },
  {
    question: "How does a `DELETE` statement operate under MVCC in InnoDB?",
    shortAnswer: "It performs a **'Delete-Mark'** (setting a bit in the row header to mark it deleted) and writes the original row to the Undo Log. The physical deletion and B+ tree space reclamation happen later when the Purge Thread executes.",
    explanation: "Two-stage deletion avoids immediate index restructuring during active transactions.",
    hint: "Marks the row as deleted (delete-mark); physical removal is deferred to the Purge Thread.",
    level: "expert"
  },
  {
    question: "How do you identify transactions that are holding open old Read Views and causing undo bloat?",
    shortAnswer: "Query `information_schema.innodb_trx` ordered by `trx_started ASC` to find transactions with the oldest start time: `SELECT trx_id, trx_state, trx_started, TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS duration_sec, trx_query FROM information_schema.innodb_trx ORDER BY trx_started ASC;`",
    explanation: "Instantly pinpoints abandoned sessions causing undo backlog.",
    hint: "Query information_schema.innodb_trx ordered by trx_started ASC.",
    level: "basic",
    codeExample: "SELECT trx_id, trx_state, trx_started, TIMESTAMPDIFF(SECOND, trx_started, NOW()) AS duration_sec, trx_query\nFROM information_schema.innodb_trx\nORDER BY trx_started ASC\nLIMIT 5;"
  },
  {
    question: "Why does the `SERIALIZABLE` isolation level disable non-blocking MVCC reads?",
    shortAnswer: "Because `SERIALIZABLE` implicitly converts all plain `SELECT` queries into `SELECT ... FOR SHARE` (locking reads with shared `S` locks), forcing readers to wait for concurrent writers.",
    explanation: "Eliminates all concurrency anomalies at the cost of severe lock contention.",
    hint: "Converts all plain SELECT queries into locking reads with shared locks.",
    level: "expert"
  },
  {
    question: "How many Purge Threads does MySQL 8.0 run by default, and how can they be tuned?",
    shortAnswer: "Default is **4 Purge Threads** (controlled by `innodb_purge_threads`), configurable up to 32 on multi-core servers to accelerate undo log cleanup under heavy write loads.",
    explanation: "Multi-threaded purge prevents History List backlog.",
    hint: "Default is 4 purge threads (innodb_purge_threads); configurable up to 32.",
    level: "basic"
  },
  {
    question: "What happens if a query traverses the entire Undo Version Chain and cannot find a visible version?",
    shortAnswer: "The row is treated as non-existent (invisible) for that transaction's snapshot view, and the query simply excludes that row from its result set.",
    explanation: "Reflects that the row was created after the transaction's Read View boundary.",
    hint: "The row is considered invisible and excluded from the query results.",
    level: "expert"
  },
  {
    question: "Why does `COUNT(*)` without a WHERE clause require a full scan in InnoDB compared to MyISAM?",
    shortAnswer: "Because InnoDB uses MVCC: different concurrent transactions may see different numbers of rows based on their Read Views, so InnoDB cannot store a single static table row count like MyISAM.",
    explanation: "Every transaction must evaluate row visibility independently.",
    hint: "Because MVCC means different transactions see different row snapshots.",
    level: "basic"
  },
  {
    question: "What is the purpose of `innodb_max_purge_lag`?",
    shortAnswer: "A throttling threshold (in History List Length) that delays `INSERT`, `UPDATE`, and `DELETE` operations with microsecond sleep pauses if the Purge Thread falls too far behind, giving it time to catch up.",
    explanation: "Prevents runaway undo log backlog on write-saturated servers.",
    hint: "Throttles DML statements to allow the purge thread to catch up on undo backlog.",
    level: "expert"
  },
  {
    question: "How does MVCC eliminate the need for read locks during online table backups with `mysqldump --single-transaction`?",
    shortAnswer: "It starts a transaction in `REPEATABLE READ` mode and reads from a consistent MVCC snapshot, allowing live application `INSERT` and `UPDATE` traffic to continue uninterrupted while the backup runs.",
    explanation: "Enables non-blocking online logical database backups.",
    hint: "Uses a REPEATABLE READ snapshot so backup queries never block live write traffic.",
    level: "basic"
  },
  {
    question: "What happens if a transaction updates the SAME row multiple times within its own session?",
    shortAnswer: "Only the latest update remains in the clustered index; intermediate updates within the same transaction overwrite the previous undo record, preventing unnecessary undo chain bloat.",
    explanation: "Optimizes undo logging for intra-transaction updates.",
    hint: "Overwrites the intra-transaction undo record, avoiding redundant version chains.",
    level: "expert"
  },
  {
    question: "What is the size of the `DB_ROLL_PTR` field, and what does it encode?",
    shortAnswer: "**7 Bytes (56 bits)**: It encodes a 1-bit insert/update flag, a 7-bit Rollback Segment ID, a 32-bit Undo Page Number, and a 16-bit Byte Offset within the undo page.",
    explanation: "Provides the exact physical address of the undo record.",
    hint: "7 bytes encoding Rollback Segment ID, Undo Page Number, and byte offset.",
    level: "expert"
  },
  {
    question: "Why should developers avoid leaving database transactions open during user think time in web apps?",
    shortAnswer: "Because open transactions hold active Read Views, blocking the Purge Thread, inflating the Undo Tablespace, and slowing down all queries across the entire database.",
    explanation: "Golden rule of application transaction management.",
    hint: "Blocks the purge thread, causing undo tablespace bloat and system-wide slowdowns.",
    level: "basic"
  },
  {
    question: "How do you check whether Undo Tablespace truncation is actively functioning in MySQL 8.0?",
    shortAnswer: "`SHOW GLOBAL STATUS LIKE 'Innodb_undo_truncate%';`",
    explanation: "Displays `Innodb_undo_truncations` counter showing how many times undo files were shrunk.",
    hint: "SHOW GLOBAL STATUS LIKE 'Innodb_undo_truncate%';",
    level: "basic"
  },
  {
    question: "Can an undo record be stored across multiple 16KB undo pages?",
    shortAnswer: "Yes, if an updated row contains large `VARCHAR`, `BLOB`, or `TEXT` fields, the undo record can span across multiple chained undo pages within the undo tablespace.",
    explanation: "Handles wide table schemas gracefully.",
    hint: "Yes, wide undo records can span multiple chained undo pages.",
    level: "expert"
  },
  {
    question: "What is the difference between a 'Consistent Read' and a 'Current Read' in MySQL?",
    shortAnswer: "- **Consistent Read** (`SELECT`): Reads an MVCC snapshot version via the Undo Log without locks.\n- **Current Read** (`UPDATE`, `DELETE`, `SELECT ... FOR UPDATE`): Reads the latest committed version and places locks on it.",
    explanation: "Fundamental distinction between querying historical snapshots and mutating current state.",
    hint: "Consistent read uses MVCC snapshot; Current read fetches latest committed row with locks.",
    level: "basic"
  },
  {
    question: "What is a 'Phantom Read' and how does InnoDB's `REPEATABLE READ` prevent it?",
    shortAnswer: "A phantom read occurs when a transaction queries a range of rows twice and discovers new rows inserted by another committed transaction; InnoDB prevents it in consistent reads via MVCC Read Views and in current reads via **Next-Key Locking**.",
    explanation: "Provides higher isolation consistency than standard ANSI SQL REPEATABLE READ.",
    hint: "Prevented via MVCC Read Views for plain SELECT and Next-Key Locks for locking reads.",
    level: "expert"
  },
  {
    question: "What system variable controls the maximum duration a transaction can wait for a row lock before timing out?",
    shortAnswer: "`innodb_lock_wait_timeout` (default: 50 seconds), which aborts waiting current reads with Error 1205: `Lock wait timeout exceeded`.",
    explanation: "Protects against permanent transaction deadlocks.",
    hint: "innodb_lock_wait_timeout (default: 50 seconds).",
    level: "basic"
  },
  {
    question: "How does the `creator_trx_id` attribute in a Read View ensure that a transaction can see its OWN uncommitted changes?",
    shortAnswer: "If a row's `DB_TRX_ID` matches `creator_trx_id`, InnoDB knows that the active transaction made the modification itself, making the row immediately visible without traversing the undo chain.",
    explanation: "Allows transactions to read their own in-flight writes naturally.",
    hint: "Matches row TRX_ID with creator_trx_id, making its own modifications visible.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 6 in Module 004_001?",
    shortAnswer: "InnoDB's Undo Log and MVCC architecture decouple reading from writing by maintaining an in-memory and on-disk Version Chain via `DB_TRX_ID` and `DB_ROLL_PTR`, providing non-blocking consistent reads across isolation levels while background Purge Threads automatically reclaim obsolete undo space.",
    explanation: "Mastery of MVCC is the key to designing high-concurrency, deadlock-free database applications.",
    hint: "MVCC enables non-blocking snapshot concurrency via undo version chains and background purge.",
    level: "basic"
  }
];

export default questions;
