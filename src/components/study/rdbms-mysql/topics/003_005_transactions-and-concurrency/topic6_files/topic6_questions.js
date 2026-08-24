// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is `READ UNCOMMITTED` in MySQL transaction isolation?",
    shortAnswer: "The lowest ANSI isolation level where queries read the current in-memory row values without checking commit state, allowing Dirty Reads.",
    explanation: "Core definition of READ UNCOMMITTED.",
    hint: "The lowest isolation level allowing Dirty Reads.",
    level: "basic"
  },
  {
    question: "What is `READ COMMITTED` in MySQL transaction isolation?",
    shortAnswer: "An isolation level where every individual `SELECT` statement creates a fresh point-in-time snapshot, seeing only data committed before that specific statement began.",
    explanation: "Core definition of READ COMMITTED.",
    hint: "Every SELECT sees the most recent committed state at statement start.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata and Susmita illustrate `READ UNCOMMITTED` vs `READ COMMITTED`?",
    shortAnswer: "If Mamata's balance is updated uncommitted to ₹50,000, `READ UNCOMMITTED` sees ₹50,000 immediately; `READ COMMITTED` sees only her previously committed ₹25,000 balance.",
    explanation: "Comparing uncommitted vs committed student balance reads.",
    hint: "READ UNCOMMITTED reads uncommitted ₹50K; READ COMMITTED reads committed ₹25K.",
    level: "basic"
  },
  {
    question: "How does `READ COMMITTED` differ from `REPEATABLE READ` in terms of MVCC snapshot creation?",
    shortAnswer: "In `READ COMMITTED`, every single `SELECT` generates a **fresh snapshot**; in `REPEATABLE READ`, the **first `SELECT` locks in a single snapshot** used for the entire transaction.",
    explanation: "Statement-level snapshot vs Transaction-level snapshot.",
    hint: "READ COMMITTED generates fresh snapshots per query; REPEATABLE READ keeps one snapshot for the whole transaction.",
    level: "expert"
  },
  {
    question: "What statement sets the transaction isolation level to `READ COMMITTED` for the current session?",
    shortAnswer: "`SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;` (or `SET TRANSACTION ISOLATION LEVEL READ COMMITTED;`).",
    explanation: "Setting session isolation level syntax.",
    hint: "SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;",
    level: "basic"
  },
  {
    question: "What statement sets the isolation level to `READ UNCOMMITTED`?",
    shortAnswer: "`SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;`.",
    explanation: "Setting READ UNCOMMITTED syntax.",
    hint: "SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;",
    level: "basic"
  },
  {
    question: "Does `READ COMMITTED` prevent Dirty Reads?",
    shortAnswer: "YES; `READ COMMITTED` guarantees that uncommitted data modifications are never visible to other transactions.",
    explanation: "Dirty read elimination in READ COMMITTED.",
    hint: "Yes, it completely prevents Dirty Reads.",
    level: "basic"
  },
  {
    question: "Does `READ COMMITTED` prevent Non-Repeatable Reads?",
    shortAnswer: "NO; because each query creates a fresh snapshot, if another transaction updates and commits a row in between, re-reading that row returns the updated values.",
    explanation: "Non-repeatable read vulnerability in READ COMMITTED.",
    hint: "No, Non-Repeatable Reads can occur because each query refreshes its snapshot.",
    level: "basic"
  },
  {
    question: "Does `READ COMMITTED` prevent Phantom Reads?",
    shortAnswer: "NO; if another transaction inserts and commits new rows matching a range, re-executing the range query returns the new phantom rows.",
    explanation: "Phantom read vulnerability in READ COMMITTED.",
    hint: "No, Phantom Reads can occur on subsequent range queries.",
    level: "basic"
  },
  {
    question: "How does `READ COMMITTED` affect InnoDB Gap Locking?",
    shortAnswer: "In `READ COMMITTED`, InnoDB **disables Gap Locks** for regular search and index scans (except for foreign key constraint checks and duplicate key checks), drastically reducing lock contention.",
    explanation: "Gap lock elimination in READ COMMITTED.",
    hint: "Disables Gap Locks, reducing deadlocks and lock contention.",
    level: "expert"
  },
  {
    question: "Why do many high-throughput e-commerce and OLTP systems switch MySQL from `REPEATABLE READ` to `READ COMMITTED`?",
    shortAnswer: "To eliminate Gap Lock contention and deadlocks on frequent concurrent inserts, and because seeing fresh committed data per query is often preferred in web applications.",
    explanation: "OLTP preference for READ COMMITTED.",
    hint: "Eliminates gap locks, reduces deadlocks, and provides fresh committed reads.",
    level: "expert"
  },
  {
    question: "What binary logging format is mandatory when running MySQL with `READ COMMITTED` or `READ UNCOMMITTED`?",
    shortAnswer: "**Row-Based Binary Logging** (`binlog_format = ROW` or `MIXED`); statement-based replication (`binlog_format = STATEMENT`) is prohibited because it can cause data divergence on replicas.",
    explanation: "Row-based replication requirement for READ COMMITTED.",
    hint: "Requires binlog_format = ROW to prevent replica data divergence.",
    level: "expert"
  },
  {
    question: "Can `READ UNCOMMITTED` ever be used legitimately in enterprise systems?",
    shortAnswer: "Only for approximate, non-critical telemetry metrics (e.g. estimating total active users or approximate video view counts) where speed is paramount and precision does not matter.",
    explanation: "Legitimate approximate telemetry use case for READ UNCOMMITTED.",
    hint: "Only for approximate metrics where accuracy is non-critical.",
    level: "moderate"
  },
  {
    question: "What happens if you execute `UPDATE` in `READ COMMITTED` vs `REPEATABLE READ`?",
    shortAnswer: "In both levels, `UPDATE` performs a 'current read' on physical rows; in `READ COMMITTED`, non-matching row locks are released immediately after evaluation (semi-consistent read).",
    explanation: "Semi-consistent read optimization in READ COMMITTED.",
    hint: "Non-matching row locks are released immediately after WHERE evaluation.",
    level: "expert"
  },
  {
    question: "What is an InnoDB 'Semi-Consistent Read'?",
    shortAnswer: "An optimization in `READ COMMITTED` where an `UPDATE` reading a locked row checks the latest committed version first before deciding whether to wait for the lock.",
    explanation: "Semi-consistent read mechanics.",
    hint: "Checks the latest committed row version to avoid unnecessary lock waits.",
    level: "expert"
  },
  {
    question: "How does `READ COMMITTED` handle index scans during an `UPDATE ... WHERE non_indexed_col = ?`?",
    shortAnswer: "InnoDB locks all scanned rows initially, but in `READ COMMITTED`, it immediately releases locks on rows that do not match the `WHERE` condition, avoiding whole-table lockouts.",
    explanation: "Early lock release on non-matching rows in READ COMMITTED.",
    hint: "Releases locks on non-matching rows immediately, avoiding table lockouts.",
    level: "expert"
  },
  {
    question: "Can two queries in the same `READ COMMITTED` transaction see different totals for `COUNT(*)` on the same table?",
    shortAnswer: "YES; if another transaction inserts or deletes rows and commits between the two queries, the second `COUNT(*)` reflects the new total.",
    explanation: "Changing counts in READ COMMITTED.",
    hint: "Yes, because the second query creates a fresh snapshot.",
    level: "basic"
  },
  {
    question: "How does `READ COMMITTED` reconstruct committed data when a row is currently being modified by another uncommitted transaction?",
    shortAnswer: "It traverses the row's `DB_ROLL_PTR` into the InnoDB Undo Log to find the most recent committed version of that row.",
    explanation: "Undo log traversal for committed snapshots.",
    hint: "Follows DB_ROLL_PTR to undo logs to find the last committed row version.",
    level: "expert"
  },
  {
    question: "Does `READ UNCOMMITTED` traverse the Undo Log for consistent reads?",
    shortAnswer: "NO; `READ UNCOMMITTED` reads directly from the current in-memory buffer pool page, ignoring the Undo Log.",
    explanation: "Bypassing undo logs in READ UNCOMMITTED.",
    hint: "No, reads current buffer pool page directly without using undo logs.",
    level: "expert"
  },
  {
    question: "Which major relational database engines use `READ COMMITTED` as their default isolation level?",
    shortAnswer: "PostgreSQL, Oracle Database, and Microsoft SQL Server (by default).",
    explanation: "Industry default isolation standards.",
    hint: "PostgreSQL, Oracle, and Microsoft SQL Server.",
    level: "basic"
  },
  {
    question: "Why did MySQL choose `REPEATABLE READ` as its default instead of `READ COMMITTED`?",
    shortAnswer: "Because MySQL's early replication engine relied on Statement-Based Replication (SBR), which required repeatable reads to guarantee identical execution order on replicas.",
    explanation: "Historical SBR replication rationale.",
    hint: "To support legacy statement-based binary replication consistently.",
    level: "expert"
  },
  {
    question: "Can an application set the isolation level for just a single upcoming transaction in MySQL?",
    shortAnswer: "`SET TRANSACTION ISOLATION LEVEL READ COMMITTED;` (without `SESSION` or `GLOBAL`) applies strictly to the next single transaction.",
    explanation: "Single transaction isolation setting syntax.",
    hint: "SET TRANSACTION ISOLATION LEVEL ... (applies to next transaction only).",
    level: "basic"
  },
  {
    question: "What is the performance overhead of creating fresh MVCC snapshots on every `SELECT` in `READ COMMITTED`?",
    shortAnswer: "Slightly higher CPU overhead from allocating and destroying read views per query, but compensated by lower lock contention and reduced memory holding.",
    explanation: "Read view allocation cost in READ COMMITTED.",
    hint: "Slightly more CPU for allocating read views, but much lower lock contention.",
    level: "expert"
  },
  {
    question: "Does `READ COMMITTED` eliminate Lost Updates?",
    shortAnswer: "NO; `READ COMMITTED` does NOT prevent lost updates in read-modify-write workflows; you must still use `SELECT ... FOR UPDATE` or optimistic versioning.",
    explanation: "Lost update vulnerability across lower isolation levels.",
    hint: "No, lost updates must still be prevented with SELECT FOR UPDATE or versioning.",
    level: "basic"
  },
  {
    question: "What happens if a transaction under `READ COMMITTED` deletes a row that was just deleted by another transaction?",
    shortAnswer: "The second delete simply finds 0 matching rows and affects 0 rows without throwing an error.",
    explanation: "Concurrent delete handling in READ COMMITTED.",
    hint: "Affects 0 rows without error.",
    level: "basic"
  },
  {
    question: "How do you verify the active isolation level in MySQL 8.0?",
    shortAnswer: "`SELECT @@transaction_isolation;` (or `SELECT @@GLOBAL.transaction_isolation;`).",
    explanation: "Querying active transaction_isolation variable.",
    hint: "SELECT @@transaction_isolation;",
    level: "basic"
  },
  {
    question: "What deprecated variable was used in MySQL 5.7 to check isolation levels?",
    shortAnswer: "`@@tx_isolation` (replaced by `@@transaction_isolation` in MySQL 8.0).",
    explanation: "Deprecated tx_isolation variable.",
    hint: "@@tx_isolation (replaced by @@transaction_isolation).",
    level: "moderate"
  },
  {
    question: "Can you switch isolation levels in the middle of an active transaction?",
    shortAnswer: "NO; attempting to change the isolation level while a transaction is active throws Error `1568` (`Transaction characteristics can't be changed while a transaction is in progress`).",
    explanation: "Prohibition of changing isolation mid-transaction.",
    hint: "Throws Error 1568 (cannot change characteristics mid-transaction).",
    level: "expert"
  },
  {
    question: "How does `READ COMMITTED` impact Undo Log Purge Threads compared to `REPEATABLE READ`?",
    shortAnswer: "In `READ COMMITTED`, read views are closed immediately after each query, allowing purge threads to deallocate old undo log pages much faster.",
    explanation: "Faster undo log purging in READ COMMITTED.",
    hint: "Allows purge threads to reclaim undo log space much faster.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for READ UNCOMMITTED and READ COMMITTED?",
    shortAnswer: "Never use `READ UNCOMMITTED` for transactional business data; choose `READ COMMITTED` paired with `binlog_format = ROW` for high-concurrency OLTP applications that require minimal gap lock contention and fast undo log reclamation.",
    explanation: "Authoritative architectural summary of lower isolation levels.",
    hint: "Avoid READ UNCOMMITTED in finance; use READ COMMITTED with row-based binlog for high-concurrency OLTP.",
    level: "expert"
  }
];

export default questions;
