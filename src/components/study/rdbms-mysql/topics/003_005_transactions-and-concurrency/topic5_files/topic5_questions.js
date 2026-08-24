// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is a 'Concurrency Anomaly' in database management systems?",
    shortAnswer: "A data inconsistency or read defect that occurs when multiple transactions execute concurrently without adequate transactional isolation.",
    explanation: "Core definition of concurrency anomalies.",
    hint: "Data inconsistency caused by un-isolated concurrent transactions.",
    level: "basic"
  },
  {
    question: "What is a 'Dirty Read' anomaly?",
    shortAnswer: "When Transaction B reads uncommitted data modified by Transaction A, and Transaction A subsequently rolls back, causing Transaction B to act on non-existent phantom data.",
    explanation: "Dirty read anomaly mechanics.",
    hint: "Reading uncommitted data that is later rolled back.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata and Susmita illustrate a Dirty Read?",
    shortAnswer: "Mamata's scholarship is updated from ₹0 to ₹50,000 uncommitted; Susmita's query reads ₹50,000 and approves a grant; Mamata's transaction aborts and rolls back to ₹0, leaving Susmita's decision invalid.",
    explanation: "Real-world dirty read student grant scenario.",
    hint: "Acting on an uncommitted ₹50,000 scholarship update before it rolls back to ₹0.",
    level: "basic"
  },
  {
    question: "Which isolation levels prevent Dirty Reads in MySQL?",
    shortAnswer: "`READ COMMITTED`, `REPEATABLE READ`, and `SERIALIZABLE` (only `READ UNCOMMITTED` permits dirty reads).",
    explanation: "Dirty read prevention across isolation levels.",
    hint: "READ COMMITTED, REPEATABLE READ, and SERIALIZABLE.",
    level: "basic"
  },
  {
    question: "What is a 'Non-Repeatable Read' (Fuzzy Read) anomaly?",
    shortAnswer: "When Transaction A reads a row, Transaction B updates or deletes that same row and commits, and Transaction A re-reads the row, finding different column values.",
    explanation: "Non-repeatable read anomaly mechanics.",
    hint: "Re-reading the same row returns different modified values.",
    level: "basic"
  },
  {
    question: "What is a 'Phantom Read' anomaly?",
    shortAnswer: "When Transaction A executes a range query (e.g. `WHERE fee > 20000`), Transaction B inserts a new matching row and commits, and Transaction A re-executes the range query, seeing a new 'phantom' row.",
    explanation: "Phantom read anomaly mechanics.",
    hint: "Re-executing a range query returns newly inserted rows.",
    level: "basic"
  },
  {
    question: "What is the key difference between a Non-Repeatable Read and a Phantom Read?",
    shortAnswer: "Non-Repeatable Reads involve *modifications or deletions of existing rows*; Phantom Reads involve *insertions of brand-new matching rows* into a range.",
    explanation: "Non-Repeatable Read vs Phantom Read distinction.",
    hint: "Non-repeatable read = modified existing rows; Phantom read = newly inserted rows.",
    level: "basic"
  },
  {
    question: "What is a 'Lost Update' anomaly?",
    shortAnswer: "When two transactions read the same initial record value simultaneously, both compute new values based on that read, and the second transaction overwrites the first transaction's update without incorporating it.",
    explanation: "Lost update anomaly mechanics.",
    hint: "Concurrent updates overwrite each other, losing one transaction's changes.",
    level: "basic"
  },
  {
    question: "How do student payments for Mamata illustrate a Lost Update?",
    shortAnswer: "Mamata has ₹20,000 balance; Session 1 adds ₹5,000 (writes ₹25,000); Session 2 concurrently adds ₹3,000 based on initial ₹20,000 (writes ₹23,000); Session 1's ₹5,000 is overwritten and lost!",
    explanation: "Real-world lost update on account balance.",
    hint: "Simultaneous deposits overwrite each other, losing ₹5,000.",
    level: "basic"
  },
  {
    question: "How do you prevent Lost Updates in MySQL using Pessimistic Locking?",
    shortAnswer: "Use `SELECT ... FOR UPDATE` when reading the row, which acquires an exclusive row lock and forces subsequent transactions to wait until the first transaction commits.",
    explanation: "Pessimistic locking prevention of lost updates.",
    hint: "Use SELECT ... FOR UPDATE to lock the row during read.",
    level: "expert"
  },
  {
    question: "How do you prevent Lost Updates in MySQL using Optimistic Concurrency Control?",
    shortAnswer: "Include a `version` column in the table and update with `WHERE id = ? AND version = current_version`, checking if `ROW_COUNT() = 1`.",
    explanation: "Optimistic versioning prevention of lost updates.",
    hint: "Use a version/timestamp column in the UPDATE WHERE clause.",
    level: "expert"
  },
  {
    question: "Does MySQL's default isolation level (`REPEATABLE READ`) prevent Phantom Reads?",
    shortAnswer: "YES; in MySQL InnoDB, `REPEATABLE READ` prevents phantom reads for consistent reads via **MVCC snapshots** and for locking reads via **Next-Key Locks**.",
    explanation: "InnoDB Next-Key Lock phantom read protection.",
    hint: "Yes, via MVCC snapshots and Next-Key gap locking.",
    level: "expert"
  },
  {
    question: "What is a 'Read Skew' anomaly?",
    shortAnswer: "When Transaction A reads Account 1 ($500), Transaction B transfers $100 from Account 2 to Account 1 and commits, and Transaction A reads Account 2 ($400), seeing an inconsistent total ($900 instead of $1,000).",
    explanation: "Read skew anomaly mechanics.",
    hint: "Reading related rows across different time snapshots.",
    level: "expert"
  },
  {
    question: "What is a 'Write Skew' anomaly?",
    shortAnswer: "When two concurrent transactions read overlapping data, verify a global invariant (e.g. at least one doctor on call), and write to disjoint rows, violating the invariant concurrently.",
    explanation: "Write skew anomaly mechanics.",
    hint: "Concurrent transactions satisfy invariants individually but violate them jointly.",
    level: "expert"
  },
  {
    question: "Which isolation level is required to strictly eliminate Write Skew?",
    shortAnswer: "`SERIALIZABLE` (or using explicit `SELECT ... FOR UPDATE` locking).",
    explanation: "Write skew resolution.",
    hint: "SERIALIZABLE isolation or explicit locking.",
    level: "expert"
  },
  {
    question: "Why is `READ UNCOMMITTED` rarely used in production banking systems?",
    shortAnswer: "Because it permits Dirty Reads, allowing financial calculations and decisions to be made on uncommitted, temporary, or rolled-back data.",
    explanation: "Danger of READ UNCOMMITTED in finance.",
    hint: "Permits Dirty Reads, leading to corrupted financial decisions.",
    level: "basic"
  },
  {
    question: "How does InnoDB's Multi-Version Concurrency Control (MVCC) eliminate Non-Repeatable Reads in `REPEATABLE READ`?",
    shortAnswer: "By establishing a point-in-time snapshot read view upon the first `SELECT` statement; subsequent `SELECT`s within that transaction always read from that exact same snapshot.",
    explanation: "MVCC point-in-time read view mechanics.",
    hint: "All queries in the transaction read from the same initial snapshot.",
    level: "expert"
  },
  {
    question: "What happens if you execute `UPDATE` on a row that was modified by another transaction while under `REPEATABLE READ`?",
    shortAnswer: "The `UPDATE` statement operates on **current physical disk data** (locking read), causing the transaction to suddenly see the other transaction's committed changes.",
    explanation: "Current read behavior during DML in REPEATABLE READ.",
    hint: "DML statements read current physical data, not MVCC snapshots.",
    level: "expert"
  },
  {
    question: "Can an atomic `UPDATE table SET balance = balance + 500 WHERE id = 1` prevent a lost update without `SELECT FOR UPDATE`?",
    shortAnswer: "YES; in-place arithmetic updates (`balance = balance + ?`) execute atomically within the storage engine, preventing lost updates for simple additive operations.",
    explanation: "In-place atomic arithmetic.",
    hint: "Yes, in-place arithmetic updates execute atomically inside the engine.",
    level: "expert"
  },
  {
    question: "What concurrency anomaly can occur when two web users simultaneously try to book the LAST remaining seat on a flight?",
    shortAnswer: "Lost Update / Race Condition: both see 1 available seat, both proceed to checkout, and both decrement the seat, causing overbooking.",
    explanation: "The classic airline overbooking race condition.",
    hint: "Race condition / lost update leading to overbooking.",
    level: "basic"
  },
  {
    question: "How does `SELECT ... FOR UPDATE` solve the seat overbooking race condition?",
    shortAnswer: "User 1 locks the seat row exclusively; User 2's `SELECT ... FOR UPDATE` is blocked until User 1 commits; User 2 then unblocks, sees 0 seats available, and is rejected gracefully.",
    explanation: "Pessimistic serialization of inventory checks.",
    hint: "Locks the seat row so User 2 must wait and see 0 seats available.",
    level: "basic"
  },
  {
    question: "What is an 'Unrepeatable Read' vs a 'Dirty Read' in terms of transaction commit state?",
    shortAnswer: "A Dirty Read reads *uncommitted* data; an Unrepeatable Read reads data that *was committed* by another transaction.",
    explanation: "Commit state distinction between Dirty and Unrepeatable reads.",
    hint: "Dirty read = uncommitted data; Unrepeatable read = committed data.",
    level: "basic"
  },
  {
    question: "Can a transaction experience a Phantom Read if it queries using a unique primary key lookup (`WHERE id = 101`)?",
    shortAnswer: "NO; primary key lookups can return at most one row; phantom reads only apply to **range queries** (e.g. `WHERE age > 20`).",
    explanation: "Range query requirement for phantom reads.",
    hint: "No, phantom reads only occur on range queries, not unique key lookups.",
    level: "expert"
  },
  {
    question: "What tool in MySQL can be used to inspect active row lock contention causing delays between concurrent transactions?",
    shortAnswer: "`performance_schema.data_locks` and `performance_schema.data_lock_waits` (or `SHOW ENGINE INNODB STATUS`).",
    explanation: "Inspecting lock contention in MySQL 8.0.",
    hint: "performance_schema.data_locks and data_lock_waits.",
    level: "basic"
  },
  {
    question: "How does `innodb_lock_wait_timeout` protect against indefinite blocking during concurrency anomalies?",
    shortAnswer: "It automatically aborts a waiting query if another transaction holds the required row lock for longer than the timeout period (default 50 seconds), throwing Error 1205.",
    explanation: "Lock wait timeout protection.",
    hint: "Aborts queries waiting longer than the timeout (default 50s) with Error 1205.",
    level: "expert"
  },
  {
    question: "What is the ANSI SQL Isolation Level matrix for the 3 ANSI anomalies?",
    shortAnswer: "1. READ UNCOMMITTED: Dirty Reads (Yes), Non-Repeatable (Yes), Phantoms (Yes); 2. READ COMMITTED: Dirty (No), Non-Repeatable (Yes), Phantoms (Yes); 3. REPEATABLE READ: Dirty (No), Non-Repeatable (No), Phantoms (No in InnoDB); 4. SERIALIZABLE: All (No).",
    explanation: "Authoritative ANSI SQL anomaly vs isolation level matrix.",
    hint: "ANSI matrix: READ UNCOMMITTED allows all 3; SERIALIZABLE prevents all 3.",
    level: "expert"
  },
  {
    question: "Why did MySQL engineers choose `REPEATABLE READ` as the default isolation level instead of `READ COMMITTED`?",
    shortAnswer: "Historically, statement-based binary replication required `REPEATABLE READ` to guarantee identical execution order and state on replica servers.",
    explanation: "Historical binary replication reason for default REPEATABLE READ.",
    hint: "To ensure consistent statement-based binary replication on replicas.",
    level: "expert"
  },
  {
    question: "Can an application catch Error 1205 (Lock Wait Timeout) and retry the transaction?",
    shortAnswer: "YES; applications should catch Lock Wait Timeouts and transient Deadlocks (Error 1213) in retry loops with exponential backoff.",
    explanation: "Application-level retry on concurrency conflicts.",
    hint: "Yes, catch Error 1205/1213 and retry with exponential backoff.",
    level: "basic"
  },
  {
    question: "What happens if two concurrent transactions attempt to insert the same primary key value simultaneously?",
    shortAnswer: "The first transaction acquires the insert lock; the second transaction blocks until the first commits, at which point the second fails with Error 1062 (Duplicate Key).",
    explanation: "Primary key insertion race condition.",
    hint: "First succeeds, second waits and fails with Duplicate Key Error 1062.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Concurrency Anomalies?",
    shortAnswer: "Understand the 4 anomalies: eliminate **Dirty Reads** with `READ COMMITTED` or higher; eliminate **Non-Repeatable Reads and Phantoms** with InnoDB's default `REPEATABLE READ` (MVCC + Next-Key locks); and prevent **Lost Updates** using explicit pessimistic locking (`SELECT ... FOR UPDATE`) or atomic in-place arithmetic.",
    explanation: "Authoritative architectural best practices for concurrency anomaly prevention.",
    hint: "READ COMMITTED for dirty reads; REPEATABLE READ for non-repeatable/phantoms; SELECT FOR UPDATE for lost updates.",
    level: "expert"
  }
];

export default questions;
