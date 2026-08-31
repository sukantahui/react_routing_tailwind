// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is 'Pessimistic Locking' in database concurrency control?",
    shortAnswer: "A strategy that assumes conflicts between concurrent transactions are likely, explicitly acquiring row locks during the read phase to prevent others from modifying data until the transaction commits.",
    explanation: "Core definition of pessimistic locking.",
    hint: "Locks rows immediately upon reading to prevent concurrent modifications.",
    level: "basic"
  },
  {
    question: "What statement performs an Exclusive Pessimistic Lock on a row in MySQL 8.0?",
    shortAnswer: "`SELECT ... FOR UPDATE;`.",
    explanation: "Pessimistic exclusive locking syntax.",
    hint: "SELECT ... FOR UPDATE;",
    level: "basic"
  },
  {
    question: "What statement performs a Shared Pessimistic Lock on a row in MySQL 8.0?",
    shortAnswer: "`SELECT ... FOR SHARE;` (or the legacy `SELECT ... LOCK IN SHARE MODE;`).",
    explanation: "Pessimistic shared locking syntax.",
    hint: "SELECT ... FOR SHARE;",
    level: "basic"
  },
  {
    question: "How do student fee payments for Mamata illustrate Pessimistic Locking?",
    shortAnswer: "When deducting Mamata's fee, Session 1 executes `SELECT balance FROM student_ledgers WHERE student_id = 101 FOR UPDATE;` to lock Mamata's row exclusively, preventing concurrent deductions until committed.",
    explanation: "Real-world pessimistic balance lock scenario.",
    hint: "Locks Mamata's balance with FOR UPDATE to prevent double-spending.",
    level: "basic"
  },
  {
    question: "What is the function of the `NOWAIT` clause in MySQL 8.0?",
    shortAnswer: "It causes the locking query to fail immediately with Error `3572` if any requested row is currently locked by another transaction, rather than waiting for `innodb_lock_wait_timeout`.",
    explanation: "NOWAIT clause mechanics.",
    hint: "Fails instantly with Error 3572 instead of waiting in queue.",
    level: "basic"
  },
  {
    question: "What is the function of the `SKIP LOCKED` clause in MySQL 8.0?",
    shortAnswer: "It causes the query to bypass any rows currently locked by other transactions and return only the unlocked matching rows immediately without waiting.",
    explanation: "SKIP LOCKED clause mechanics.",
    hint: "Skips locked rows and returns available unlocked rows immediately.",
    level: "basic"
  },
  {
    question: "Why is `SELECT ... FOR UPDATE SKIP LOCKED` ideal for concurrent job queues?",
    shortAnswer: "Because multiple worker threads can query a single queue table concurrently, each claiming distinct pending tasks without blocking each other or deadlocking.",
    explanation: "High-speed job queue consumption using SKIP LOCKED.",
    hint: "Allows multiple worker threads to claim distinct tasks without lock waiting.",
    level: "expert"
  },
  {
    question: "What is the purpose of the `OF table_name` clause in locking read queries?",
    shortAnswer: "In multi-table `JOIN` queries, `OF table_name` restricts row locking exclusively to the specified table(s), leaving rows in the other joined tables unlocked.",
    explanation: "OF table clause in multi-table joins.",
    hint: "Restricts locking to specific tables in a JOIN.",
    level: "expert"
  },
  {
    question: "What happens if you execute `SELECT ... FOR UPDATE` on a multi-table `JOIN` without specifying the `OF` clause?",
    shortAnswer: "InnoDB acquires Exclusive Locks on matched rows across **ALL TABLES** included in the `JOIN` query.",
    explanation: "Default multi-table join locking behavior.",
    hint: "Locks matched rows across all tables in the query.",
    level: "expert"
  },
  {
    question: "Does `SELECT ... FOR UPDATE` block concurrent plain non-locking `SELECT` queries in `REPEATABLE READ`?",
    shortAnswer: "NO; plain `SELECT` queries use MVCC snapshot reads and are completely non-blocking, reading consistent snapshots without waiting for locks.",
    explanation: "MVCC read immunity to FOR UPDATE locks.",
    hint: "No, plain SELECT queries read MVCC snapshots without blocking.",
    level: "basic"
  },
  {
    question: "What queries ARE blocked by an active `SELECT ... FOR UPDATE` on a row?",
    shortAnswer: "Any concurrent `UPDATE`, `DELETE`, `SELECT ... FOR UPDATE`, or `SELECT ... FOR SHARE` targeting that same row.",
    explanation: "Queries blocked by Exclusive X-Locks.",
    hint: "UPDATE, DELETE, and locking SELECTs (FOR UPDATE / FOR SHARE).",
    level: "basic"
  },
  {
    question: "When should a developer use `SELECT ... FOR SHARE` instead of `SELECT ... FOR UPDATE`?",
    shortAnswer: "When verifying or validating a parent record (e.g. ensuring a department or student exists) to prevent others from deleting it, while allowing other concurrent readers to read it.",
    explanation: "Use case for Shared Pessimistic Locking.",
    hint: "To read and protect a parent record from deletion while allowing other readers.",
    level: "basic"
  },
  {
    question: "What happens if a transaction executes `SELECT ... FOR UPDATE` on a table with NO matching index?",
    shortAnswer: "InnoDB performs a full table scan and acquires Exclusive Locks on **EVERY RECORD IN THE TABLE**, severely bottlenecking concurrency.",
    explanation: "Full table lock hazard on un-indexed FOR UPDATE.",
    hint: "Locks every row in the entire table, causing system-wide lock contention.",
    level: "expert"
  },
  {
    question: "Can `SELECT ... FOR UPDATE` be used inside an aggregate query with `GROUP BY` or `DISTINCT`?",
    shortAnswer: "NO; MySQL prohibits locking read clauses (`FOR UPDATE`, `FOR SHARE`) on queries using temporary tables, `DISTINCT`, `GROUP BY`, or window functions, throwing Error `1221`.",
    explanation: "Prohibited query types for locking reads.",
    hint: "Prohibited on queries with GROUP BY, DISTINCT, or temporary tables.",
    level: "expert"
  },
  {
    question: "What is the return value when executing `SELECT ... FOR UPDATE NOWAIT` on a locked row?",
    shortAnswer: "Error `3572 (HY000)`: `Statement aborted because lock(s) could not be acquired immediately and NOWAIT was set`.",
    explanation: "NOWAIT error return code.",
    hint: "Throws Error 3572 instantly.",
    level: "expert"
  },
  {
    question: "How does Spring Data JPA implement pessimistic write locking?",
    shortAnswer: "Via the `@Lock(LockModeType.PESSIMISTIC_WRITE)` annotation, which translates into SQL `SELECT ... FOR UPDATE`.",
    explanation: "Spring Data JPA mapping for PESSIMISTIC_WRITE.",
    hint: "@Lock(LockModeType.PESSIMISTIC_WRITE) generates SELECT ... FOR UPDATE.",
    level: "expert"
  },
  {
    question: "How does Spring Data JPA implement pessimistic read locking?",
    shortAnswer: "Via the `@Lock(LockModeType.PESSIMISTIC_READ)` annotation, which translates into SQL `SELECT ... FOR SHARE`.",
    explanation: "Spring Data JPA mapping for PESSIMISTIC_READ.",
    hint: "@Lock(LockModeType.PESSIMISTIC_READ) generates SELECT ... FOR SHARE.",
    level: "expert"
  },
  {
    question: "Can an application combine `NOWAIT` and `SKIP LOCKED` in the same statement?",
    shortAnswer: "NO; `NOWAIT` and `SKIP LOCKED` are mutually exclusive options.",
    explanation: "Mutual exclusivity of NOWAIT and SKIP LOCKED.",
    hint: "No, they are mutually exclusive.",
    level: "basic"
  },
  {
    question: "What happens if a transaction executes `SELECT ... FOR UPDATE` outside of `START TRANSACTION` when `autocommit = 1`?",
    shortAnswer: "InnoDB acquires the exclusive lock, executes the query, and **immediately releases the lock upon statement completion** because autocommit commits instantly!",
    explanation: "Autocommit rendering locking reads useless.",
    hint: "Lock is released immediately upon query completion due to autocommit.",
    level: "expert"
  },
  {
    question: "Why MUST `SELECT ... FOR UPDATE` be enclosed in an explicit `START TRANSACTION ... COMMIT` block?",
    shortAnswer: "Because row locks are only held for the duration of the transaction; if autocommit is enabled, the lock is released instantly before the subsequent `UPDATE` can execute!",
    explanation: "Mandatory transaction boundary for pessimistic locking.",
    hint: "Locks are released instantly unless held inside an explicit transaction boundary.",
    level: "expert"
  },
  {
    question: "What is the risk of holding a pessimistic lock across an external third-party API call (e.g. Stripe payment gateway)?",
    shortAnswer: "Severe connection pool exhaustion: if the payment gateway takes 10 seconds or hangs, the database row lock is held for 10 seconds, blocking other transactions and exhausting threads.",
    explanation: "Anti-pattern of holding locks across network I/O.",
    hint: "Network delays hold database locks, causing connection pool exhaustion.",
    level: "expert"
  },
  {
    question: "How should an application handle external payment gateways without holding database locks during network calls?",
    shortAnswer: "1. Stage intent → 2. Commit → 3. Make HTTP call outside transaction → 4. Open new transaction to record result using `FOR UPDATE` or optimistic versioning.",
    explanation: "Decoupled transaction pattern for external API calls.",
    hint: "Make external API calls outside database transaction boundaries.",
    level: "expert"
  },
  {
    question: "Can `SELECT ... FOR UPDATE` lock multiple rows with a `LIMIT` clause?",
    shortAnswer: "YES; `SELECT * FROM table WHERE status = 'PENDING' LIMIT 10 FOR UPDATE` locks only the 10 returned rows (plus the scanned range).",
    explanation: "LIMIT clause integration with locking reads.",
    hint: "Yes, locks the matched rows up to the limit.",
    level: "basic"
  },
  {
    question: "How does `SELECT ... FOR UPDATE` handle secondary index lookups during DML execution?",
    shortAnswer: "It locks both the matched secondary index record AND the corresponding clustered primary key record.",
    explanation: "Clustered index lock acquisition during secondary index reads.",
    hint: "Locks both secondary index record and clustered primary key record.",
    level: "expert"
  },
  {
    question: "What happens if a transaction attempts to `SELECT ... FOR UPDATE` on a row that is currently deleted by an uncommitted transaction?",
    shortAnswer: "The query blocks until the deleting transaction commits (at which point 0 rows match) or rolls back (at which point the row is locked and returned).",
    explanation: "Lock waiting on uncommitted deleted rows.",
    hint: "Blocks until deleting transaction commits (0 rows) or rolls back (row locked).",
    level: "expert"
  },
  {
    question: "What is the difference between `LOCK IN SHARE MODE` and `FOR SHARE`?",
    shortAnswer: "`FOR SHARE` is the modern SQL:2011 compliant syntax introduced in MySQL 8.0 that supports `NOWAIT`, `SKIP LOCKED`, and `OF`; `LOCK IN SHARE MODE` is legacy MySQL syntax.",
    explanation: "Modern FOR SHARE vs legacy LOCK IN SHARE MODE.",
    hint: "FOR SHARE supports NOWAIT and SKIP LOCKED; LOCK IN SHARE MODE is legacy.",
    level: "basic"
  },
  {
    question: "How do you avoid deadlocks when acquiring pessimistic locks on multiple rows across transactions?",
    shortAnswer: "Always acquire pessimistic locks in a consistent, deterministic order (e.g. sorting row IDs in ascending order `WHERE id IN (101, 102) ORDER BY id ASC`).",
    explanation: "Deterministic lock ordering for deadlock prevention.",
    hint: "Always acquire locks in consistent ascending ID order.",
    level: "expert"
  },
  {
    question: "Can you use `SELECT ... FOR UPDATE` inside a subquery?",
    shortAnswer: "NO; MySQL does not support locking read clauses inside subqueries, throwing a syntax error.",
    explanation: "Subquery locking read limitation.",
    hint: "No, locking clauses are not supported inside subqueries.",
    level: "moderate"
  },
  {
    question: "What happens if a transaction in `READ COMMITTED` executes `SELECT ... FOR UPDATE` on a range of rows?",
    shortAnswer: "It acquires Record Locks on all matching rows and releases locks on non-matching scanned rows immediately, with zero gap locks.",
    explanation: "Locking read behavior under READ COMMITTED.",
    hint: "Acquires Record Locks on matches only; gap locks are disabled.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Pessimistic Locking?",
    shortAnswer: "Deploy **Pessimistic Locking (`SELECT ... FOR UPDATE`)** for high-contention financial and inventory mutations to eliminate race conditions; always enclose locking reads in explicit `START TRANSACTION ... COMMIT` blocks; utilize indexed lookups to avoid full-table lock degradation; use **`SKIP LOCKED`** for non-blocking task queues; and never hold database locks across external network or HTTP API calls.",
    explanation: "Authoritative architectural best practices for pessimistic locking.",
    hint: "Use FOR UPDATE for high contention + explicit transactions + indexed lookups + SKIP LOCKED for queues + no locks over HTTP.",
    level: "expert"
  }
];

export default questions;
