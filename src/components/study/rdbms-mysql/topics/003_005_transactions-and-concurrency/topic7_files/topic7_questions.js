// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the default transaction isolation level in MySQL InnoDB?",
    shortAnswer: "`REPEATABLE READ`.",
    explanation: "Default isolation level in MySQL.",
    hint: "REPEATABLE READ.",
    level: "basic"
  },
  {
    question: "How does `REPEATABLE READ` ensure that query results are repeatable throughout a transaction?",
    shortAnswer: "The first `SELECT` statement locks in a point-in-time MVCC read view snapshot; all subsequent `SELECT` statements in that transaction read exclusively from that same snapshot.",
    explanation: "Transaction-level MVCC snapshot mechanics.",
    hint: "First SELECT creates a snapshot that is reused for all subsequent queries.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata and Susmita illustrate `REPEATABLE READ`?",
    shortAnswer: "Session 1 reads Mamata's balance as ₹25,000; Session 2 updates it to ₹50,000 and commits; Session 1 re-reads Mamata's balance and still sees ₹25,000.",
    explanation: "Repeatable read snapshot demonstration.",
    hint: "Session 1 continues to see the initial ₹25,000 snapshot despite Session 2's commit.",
    level: "basic"
  },
  {
    question: "How does InnoDB eliminate Phantom Reads in `REPEATABLE READ` for plain `SELECT` queries?",
    shortAnswer: "By reconstructing rows from the **Undo Log** according to the initial transaction snapshot timestamp, ignoring rows inserted after that timestamp.",
    explanation: "MVCC snapshot phantom prevention.",
    hint: "Reconstructs snapshot view from Undo Logs, ignoring newer inserts.",
    level: "expert"
  },
  {
    question: "How does InnoDB eliminate Phantom Reads in `REPEATABLE READ` for locking reads (`SELECT ... FOR UPDATE`)?",
    shortAnswer: "By acquiring **Next-Key Locks** (combination of a Record Lock on the index record and a Gap Lock on the space before it) that block other sessions from inserting into the range.",
    explanation: "Next-Key lock phantom prevention.",
    hint: "Uses Next-Key locks (Record Lock + Gap Lock) to block insertions into the range.",
    level: "expert"
  },
  {
    question: "What is `SERIALIZABLE` isolation level in MySQL?",
    shortAnswer: "The highest ANSI isolation level, where all plain `SELECT` statements are implicitly converted to `SELECT ... FOR SHARE`, enforcing strict sequential serial execution.",
    explanation: "Core definition of SERIALIZABLE isolation.",
    hint: "Implicitly converts all SELECT queries into locking SELECT ... FOR SHARE reads.",
    level: "basic"
  },
  {
    question: "What statement sets the isolation level to `REPEATABLE READ` for the session?",
    shortAnswer: "`SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;`.",
    explanation: "Setting session REPEATABLE READ syntax.",
    hint: "SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;",
    level: "basic"
  },
  {
    question: "What statement sets the isolation level to `SERIALIZABLE`?",
    shortAnswer: "`SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;`.",
    explanation: "Setting session SERIALIZABLE syntax.",
    hint: "SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;",
    level: "basic"
  },
  {
    question: "What is a 'Current Read' in MySQL `REPEATABLE READ`?",
    shortAnswer: "When executing DML (`UPDATE`, `DELETE`) or locking reads (`SELECT FOR UPDATE`), InnoDB bypasses the MVCC snapshot and reads the **current committed physical disk state**.",
    explanation: "Current read vs Consistent read distinction.",
    hint: "DML and locking reads bypass snapshots to read current physical data.",
    level: "expert"
  },
  {
    question: "What happens if a transaction under `REPEATABLE READ` executes `UPDATE` on a row that was just inserted by another transaction?",
    shortAnswer: "The `UPDATE` (a current read) modifies the newly inserted row, which suddenly causes that row to become visible in subsequent snapshot `SELECT`s within the transaction!",
    explanation: "The phantom update phenomenon in REPEATABLE READ.",
    hint: "Modifying the new row makes it visible to subsequent snapshot queries in the same transaction.",
    level: "expert"
  },
  {
    question: "What are the performance disadvantages of running under `SERIALIZABLE`?",
    shortAnswer: "Massive lock contention, high latency, threads blocking waiting for shared locks, and frequent deadlock aborts.",
    explanation: "Performance drawbacks of SERIALIZABLE.",
    hint: "Heavy lock contention, high latency, thread blocking, and frequent deadlocks.",
    level: "basic"
  },
  {
    question: "Does `SERIALIZABLE` eliminate Write Skew anomalies?",
    shortAnswer: "YES; `SERIALIZABLE` guarantees complete sequential execution order, preventing Write Skew anomalies.",
    explanation: "Write skew prevention in SERIALIZABLE.",
    hint: "Yes, completely prevents Write Skew.",
    level: "expert"
  },
  {
    question: "Can two concurrent `SELECT` queries execute simultaneously under `SERIALIZABLE`?",
    shortAnswer: "YES; because plain `SELECT` acquires Shared Locks (S-Locks), multiple concurrent readers can hold S-Locks on the same row without blocking each other.",
    explanation: "Concurrent S-Locks under SERIALIZABLE.",
    hint: "Yes, Shared Locks (S-Locks) are compatible with other Shared Locks.",
    level: "expert"
  },
  {
    question: "What happens if a `SELECT` runs under `SERIALIZABLE` while an `UPDATE` is actively holding an Exclusive Lock (X-Lock)?",
    shortAnswer: "The `SELECT` query is BLOCKED and waits until the updating transaction executes `COMMIT` or `ROLLBACK` (or until `innodb_lock_wait_timeout` expires).",
    explanation: "Reader blocked by writer under SERIALIZABLE.",
    hint: "The SELECT is blocked and waits for the writer to commit.",
    level: "basic"
  },
  {
    question: "How does `START TRANSACTION WITH CONSISTENT SNAPSHOT` interact with `REPEATABLE READ`?",
    shortAnswer: "It establishes the transaction's MVCC point-in-time snapshot immediately at the moment `START TRANSACTION` is called, rather than waiting for the first `SELECT` statement.",
    explanation: "Immediate snapshot creation in REPEATABLE READ.",
    hint: "Creates the snapshot immediately at START TRANSACTION time.",
    level: "expert"
  },
  {
    question: "Does `START TRANSACTION WITH CONSISTENT SNAPSHOT` work in `READ COMMITTED`?",
    shortAnswer: "No; MySQL ignores the `WITH CONSISTENT SNAPSHOT` clause in `READ COMMITTED` because snapshots in `READ COMMITTED` are always created per-statement.",
    explanation: "Ignoring consistent snapshot modifier in READ COMMITTED.",
    hint: "No, ignored in READ COMMITTED (only works in REPEATABLE READ).",
    level: "expert"
  },
  {
    question: "Why does `REPEATABLE READ` cause longer Undo Log retention than `READ COMMITTED`?",
    shortAnswer: "Because InnoDB must retain all Undo Log versions created after the start of any active `REPEATABLE READ` transaction until that transaction terminates.",
    explanation: "Undo log retention under REPEATABLE READ.",
    hint: "Must keep all undo logs created since transaction start until it commits.",
    level: "expert"
  },
  {
    question: "What is a 'Next-Key Lock' in InnoDB?",
    shortAnswer: "A combination of an index record lock and a gap lock on the gap immediately preceding the index record.",
    explanation: "Next-Key Lock anatomy.",
    hint: "Record Lock + Gap Lock on preceding gap.",
    level: "expert"
  },
  {
    question: "What happens if a transaction in `REPEATABLE READ` selects a row with `SELECT ... FOR SHARE`?",
    shortAnswer: "It performs a locking read, acquiring a Shared Lock (S-Lock) on the latest committed row version and blocking concurrent exclusive writes.",
    explanation: "Explicit FOR SHARE locking in REPEATABLE READ.",
    hint: "Acquires a Shared Lock (S-Lock) on the current physical row.",
    level: "moderate"
  },
  {
    question: "Can an application experience Deadlocks in `REPEATABLE READ`?",
    shortAnswer: "YES; concurrent transactions acquiring overlapping Gap Locks and Record Locks can form cyclic lock wait dependencies, triggering Deadlocks.",
    explanation: "Deadlock occurrence in REPEATABLE READ.",
    hint: "Yes, cyclic Gap Lock and Record Lock dependencies can trigger deadlocks.",
    level: "basic"
  },
  {
    question: "How does `autocommit = 1` behave under `SERIALIZABLE`?",
    shortAnswer: "Each standalone `SELECT` acquires an S-Lock, reads the row, and immediately releases the S-Lock upon statement completion.",
    explanation: "Autocommit behavior under SERIALIZABLE.",
    hint: "Acquires and releases an S-Lock immediately for that single statement.",
    level: "moderate"
  },
  {
    question: "Why is `REPEATABLE READ` suitable for generating comprehensive accounting balance sheets?",
    shortAnswer: "Because all audit queries in the transaction read from the exact same time snapshot, ensuring that totals across different ledger tables balance perfectly.",
    explanation: "Point-in-time consistency for financial audits.",
    hint: "All queries see the same point-in-time snapshot, ensuring cross-table balance integrity.",
    level: "basic"
  },
  {
    question: "What occurs if you execute `ALTER TABLE` while an active `REPEATABLE READ` transaction is open in another session?",
    shortAnswer: "The `ALTER TABLE` is blocked waiting for a Metadata Lock (MDL), and all subsequent queries on that table will queue behind it until the transaction commits.",
    explanation: "Metadata lock blocking during open transactions.",
    hint: "ALTER TABLE is blocked by Metadata Locks until the transaction commits.",
    level: "expert"
  },
  {
    question: "How do you inspect active Next-Key locks held by a transaction in MySQL 8.0?",
    shortAnswer: "Query `performance_schema.data_locks` and look for `LOCK_MODE = 'X'` or `'S'` with `LOCK_TYPE = 'RECORD'` and `LOCK_DATA` showing range bounds.",
    explanation: "Inspecting Next-Key locks in performance_schema.",
    hint: "Inspect performance_schema.data_locks for LOCK_MODE and LOCK_DATA.",
    level: "expert"
  },
  {
    question: "Does `SERIALIZABLE` use MVCC snapshot reads?",
    shortAnswer: "NO; `SERIALIZABLE` replaces lock-free MVCC snapshot reads with 2-Phase Locking (2PL), forcing all reads to acquire Shared Locks.",
    explanation: "Replacement of MVCC with 2PL in SERIALIZABLE.",
    hint: "No, replaces MVCC with 2-Phase Shared Locking.",
    level: "expert"
  },
  {
    question: "What is the default lock wait timeout (`innodb_lock_wait_timeout`) in MySQL?",
    shortAnswer: "50 seconds.",
    explanation: "Default innodb_lock_wait_timeout value.",
    hint: "50 seconds.",
    level: "basic"
  },
  {
    question: "Why does MySQL not use `SERIALIZABLE` as its default isolation level?",
    shortAnswer: "Because it would severely bottleneck multi-threaded concurrency throughput, causing massive query queuing and frequent lock timeouts in web applications.",
    explanation: "Throughput cost of SERIALIZABLE.",
    hint: "Drastically reduces throughput and causes severe lock queuing in multi-threaded apps.",
    level: "basic"
  },
  {
    question: "Can an application dynamically mix isolation levels across different connections in the same database pool?",
    shortAnswer: "YES; analytical audit connections can use `REPEATABLE READ` or `SERIALIZABLE` while fast OLTP checkout connections use `READ COMMITTED`.",
    explanation: "Connection-specific isolation tuning.",
    hint: "Yes, configure different isolation levels per connection type.",
    level: "expert"
  },
  {
    question: "How does `REPEATABLE READ` handle index scans on non-unique indexes?",
    shortAnswer: "InnoDB places Next-Key locks on all matched index records AND on the gaps between them, plus an insert intention lock on the gap after the last match.",
    explanation: "Non-unique index locking in REPEATABLE READ.",
    hint: "Places Next-Key locks on matched records and gaps between them.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for REPEATABLE READ and SERIALIZABLE?",
    shortAnswer: "Rely on **REPEATABLE READ** as the premier default for consistent snapshot audits and financial ledgers (leveraging MVCC snapshots and Next-Key locking to eliminate dirty reads, non-repeatable reads, and phantoms); and reserve **SERIALIZABLE** strictly for mission-critical operations where absolute strict serial execution is required and lock wait latency is acceptable.",
    explanation: "Authoritative architectural best practices for upper isolation levels.",
    hint: "REPEATABLE READ for point-in-time consistency + SERIALIZABLE only when strict locking serialization is required.",
    level: "expert"
  }
];

export default questions;
