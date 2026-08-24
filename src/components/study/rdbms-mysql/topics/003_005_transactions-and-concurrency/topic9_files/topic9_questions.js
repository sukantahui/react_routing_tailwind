// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is a Shared Lock (S-Lock) in MySQL InnoDB?",
    shortAnswer: "A read lock that permits multiple concurrent transactions to read the same row, while blocking any transaction attempting to acquire an Exclusive Lock (X-Lock) on that row.",
    explanation: "Core definition of Shared Locks.",
    hint: "Read lock allowing multiple concurrent readers, blocking writers.",
    level: "basic"
  },
  {
    question: "What is an Exclusive Lock (X-Lock) in MySQL InnoDB?",
    shortAnswer: "A write lock that grants exclusive mutation access to a single transaction, blocking all other transactions from acquiring either S-Locks or X-Locks on that row.",
    explanation: "Core definition of Exclusive Locks.",
    hint: "Write lock granting exclusive access, blocking all other readers and writers.",
    level: "basic"
  },
  {
    question: "How do student account operations for Mamata, Susmita, and Debangshu illustrate S-Locks vs X-Locks?",
    shortAnswer: "Susmita and Debangshu can both hold S-Locks to read Mamata's transcript simultaneously; if an admin acquires an X-Lock to update Mamata's tuition fee, both Susmita and Debangshu must wait.",
    explanation: "Real-world student record locking scenario.",
    hint: "Multiple students can read with S-Locks; an admin update requires an exclusive X-Lock.",
    level: "basic"
  },
  {
    question: "What is the Lock Compatibility Matrix for S and X locks?",
    shortAnswer: "S + S = Compatible; S + X = Incompatible (Wait); X + S = Incompatible (Wait); X + X = Incompatible (Wait).",
    explanation: "The fundamental 2x2 lock compatibility matrix.",
    hint: "Only S and S are compatible; all other combinations conflict.",
    level: "basic"
  },
  {
    question: "What SQL statement explicitly acquires a Shared Lock (S-Lock) on selected rows in MySQL 8.0?",
    shortAnswer: "`SELECT ... FOR SHARE;` (or the legacy `SELECT ... LOCK IN SHARE MODE;`).",
    explanation: "Explicit Shared Lock acquisition syntax.",
    hint: "SELECT ... FOR SHARE;",
    level: "basic"
  },
  {
    question: "What SQL statement explicitly acquires an Exclusive Lock (X-Lock) on selected rows?",
    shortAnswer: "`SELECT ... FOR UPDATE;`.",
    explanation: "Explicit Exclusive Lock acquisition syntax.",
    hint: "SELECT ... FOR UPDATE;",
    level: "basic"
  },
  {
    question: "Do plain non-locking `SELECT` statements acquire S-Locks in `REPEATABLE READ` or `READ COMMITTED`?",
    shortAnswer: "NO; plain `SELECT` statements use **lock-free MVCC consistent snapshot reads**, acquiring zero row locks.",
    explanation: "Lock-free MVCC reads in non-serializable modes.",
    hint: "No, plain SELECT queries are completely lock-free under MVCC.",
    level: "expert"
  },
  {
    question: "Under which isolation level does a plain `SELECT` implicitly acquire an S-Lock?",
    shortAnswer: "`SERIALIZABLE`.",
    explanation: "Implicit S-Lock acquisition in SERIALIZABLE.",
    hint: "SERIALIZABLE.",
    level: "basic"
  },
  {
    question: "What happens when Session 2 requests an X-Lock on a row currently held by Session 1 with an S-Lock?",
    shortAnswer: "Session 2 is suspended into a lock wait queue until Session 1 executes `COMMIT` or `ROLLBACK` (or until `innodb_lock_wait_timeout` expires).",
    explanation: "Lock conflict and wait queue behavior.",
    hint: "Session 2 waits until Session 1 commits or rolls back.",
    level: "basic"
  },
  {
    question: "What MySQL error code is thrown when a lock wait exceeds `innodb_lock_wait_timeout`?",
    shortAnswer: "Error `1205` (`Lock wait timeout exceeded; try restarting transaction`).",
    explanation: "Lock wait timeout error code.",
    hint: "Error 1205.",
    level: "basic"
  },
  {
    question: "What is a 'Lock Conversion' or 'Lock Upgrade'?",
    shortAnswer: "When a transaction holding an S-Lock attempts to upgrade to an X-Lock on the same row (e.g. by running an `UPDATE`).",
    explanation: "Lock upgrade mechanics.",
    hint: "Upgrading an existing S-Lock to an X-Lock.",
    level: "expert"
  },
  {
    question: "Why does concurrent lock conversion frequently cause Deadlocks?",
    shortAnswer: "If Session 1 and Session 2 both hold S-Locks on row 101 and both attempt to upgrade to X-Locks, each waits for the other to release its S-Lock, forming an immediate Deadlock!",
    explanation: "Deadlock from simultaneous lock upgrades.",
    hint: "Both hold S-Locks and wait for each other to release before upgrading to X-Lock.",
    level: "expert"
  },
  {
    question: "How do you inspect currently held and waiting locks in MySQL 8.0?",
    shortAnswer: "Query `performance_schema.data_locks` and `performance_schema.data_lock_waits`.",
    explanation: "Inspecting lock tables in performance_schema.",
    hint: "Inspect performance_schema.data_locks and data_lock_waits.",
    level: "basic"
  },
  {
    question: "What table in `information_schema` was used in MySQL 5.7 to check locks?",
    shortAnswer: "`information_schema.innodb_locks` and `innodb_lock_waits` (deprecated and replaced in 8.0 by `performance_schema`).",
    explanation: "Legacy MySQL 5.7 lock inspection tables.",
    hint: "innodb_locks and innodb_lock_waits in information_schema.",
    level: "moderate"
  },
  {
    question: "When are row locks released in MySQL InnoDB?",
    shortAnswer: "All row locks acquired during a transaction are held until the transaction explicitly ends with `COMMIT` or `ROLLBACK` (following Strict 2-Phase Locking).",
    explanation: "Lock duration under Strict 2PL.",
    hint: "Held until the transaction commits or rolls back.",
    level: "basic"
  },
  {
    question: "Can an application release a specific row lock *before* committing the transaction?",
    shortAnswer: "NO; under InnoDB's Strict 2-Phase Locking (2PL) architecture, individual row locks cannot be released selectively before transaction completion.",
    explanation: "Strict 2PL prohibition of early lock release.",
    hint: "No, all locks are held until transaction commit or rollback.",
    level: "expert"
  },
  {
    question: "What is an 'Intention Lock' (IS / IX)?",
    shortAnswer: "A table-level lock indicating that a transaction intends to acquire Shared (IS) or Exclusive (IX) row-level locks on individual rows in that table.",
    explanation: "Intention lock definition and purpose.",
    hint: "Table-level lock declaring intent to lock individual rows.",
    level: "expert"
  },
  {
    question: "Why does InnoDB use Intention Locks?",
    shortAnswer: "To allow table-level lock requests (like `LOCK TABLES ... WRITE` or `ALTER TABLE`) to quickly determine if any rows are locked without scanning millions of individual row locks.",
    explanation: "Efficiency of Intention Locks for table lock checks.",
    hint: "Allows rapid table-level lock checks without scanning all individual rows.",
    level: "expert"
  },
  {
    question: "Is an Intention Shared Lock (IS) compatible with another Intention Exclusive Lock (IX)?",
    shortAnswer: "YES; IS and IX locks are compatible with each other at the table level because they only declare intentions on individual rows.",
    explanation: "Intention lock compatibility.",
    hint: "Yes, IS and IX are compatible at the table level.",
    level: "expert"
  },
  {
    question: "What happens if a transaction attempts to acquire an X-Lock using `NOWAIT` in MySQL 8.0?",
    shortAnswer: "If the lock cannot be acquired immediately, the query fails instantly with Error `3572` (`Statement aborted because lock(s) could not be acquired immediately`) without waiting.",
    explanation: "NOWAIT clause in locking reads.",
    hint: "Fails immediately with Error 3572 if the lock is held.",
    level: "expert"
  },
  {
    question: "What happens if a transaction attempts to acquire an X-Lock using `SKIP LOCKED` in MySQL 8.0?",
    shortAnswer: "The query bypasses all locked rows and returns only the unlocked rows immediately without waiting.",
    explanation: "SKIP LOCKED clause in locking reads.",
    hint: "Skips locked rows and returns available unlocked rows immediately.",
    level: "expert"
  },
  {
    question: "Why is `SELECT ... FOR UPDATE SKIP LOCKED` popular in background queue processing systems?",
    shortAnswer: "Because multiple worker threads can pull unassigned jobs from a single job table simultaneously without blocking each other or encountering lock wait timeouts.",
    explanation: "High-speed job queue consumption using SKIP LOCKED.",
    hint: "Allows worker threads to claim available jobs without lock contention.",
    level: "expert"
  },
  {
    question: "Does an `INSERT` statement acquire an S-Lock or an X-Lock?",
    shortAnswer: "An `INSERT` statement acquires an **Exclusive Lock (X-Lock)** on the newly inserted index record (and an Insert Intention Lock on the gap).",
    explanation: "Lock type acquired by INSERT.",
    hint: "Acquires an Exclusive Lock (X-Lock).",
    level: "basic"
  },
  {
    question: "Does an `UPDATE` statement acquire an S-Lock or an X-Lock?",
    shortAnswer: "An `UPDATE` statement acquires an **Exclusive Lock (X-Lock)** on every record modified by the query.",
    explanation: "Lock type acquired by UPDATE.",
    hint: "Acquires an Exclusive Lock (X-Lock).",
    level: "basic"
  },
  {
    question: "Does a `DELETE` statement acquire an S-Lock or an X-Lock?",
    shortAnswer: "A `DELETE` statement acquires an **Exclusive Lock (X-Lock)** on every record removed by the query.",
    explanation: "Lock type acquired by DELETE.",
    hint: "Acquires an Exclusive Lock (X-Lock).",
    level: "basic"
  },
  {
    question: "Can an S-Lock prevent a row from being deleted by another transaction?",
    shortAnswer: "YES; because deleting a row requires an X-Lock, the `DELETE` statement is blocked until all active S-Locks on that row are released.",
    explanation: "S-Lock protecting rows from concurrent deletion.",
    hint: "Yes, blocks DELETE statements because DELETE requires an X-Lock.",
    level: "basic"
  },
  {
    question: "What happens if an un-indexed column is used in `SELECT ... FOR UPDATE`?",
    shortAnswer: "InnoDB performs a full table scan and acquires Exclusive Locks on **EVERY ROW IN THE ENTIRE TABLE**, effectively locking out all concurrent mutations!",
    explanation: "The full-table locking hazard of un-indexed locking reads.",
    hint: "Locks every row in the entire table, causing massive lock contention.",
    level: "expert"
  },
  {
    question: "How do Foreign Key constraint checks use Shared Locks (S-Locks)?",
    shortAnswer: "When inserting a child record, InnoDB automatically acquires an **S-Lock** on the referenced parent row to ensure the parent is not deleted before the child commits.",
    explanation: "Foreign key validation using S-Locks.",
    hint: "Acquires an S-Lock on the parent row during child insertion.",
    level: "expert"
  },
  {
    question: "What is the difference between `SELECT ... FOR SHARE` and `SELECT ... FOR UPDATE` in terms of intent?",
    shortAnswer: "`FOR SHARE` declares an intent to read and prevent modifications by others; `FOR UPDATE` declares an intent to modify the row exclusively.",
    explanation: "Intent distinction between FOR SHARE and FOR UPDATE.",
    hint: "FOR SHARE = read + protect; FOR UPDATE = modify exclusively.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for S-Locks and X-Locks?",
    shortAnswer: "Use lock-free MVCC reads whenever possible; deploy **Shared Locks (`FOR SHARE`)** strictly when referencing parent data to prevent concurrent deletion; use **Exclusive Locks (`FOR UPDATE`)** with indexed lookups to serialize read-modify-write sequences; leverage **`SKIP LOCKED`** for high-throughput background queues; and always keep transactions short to avoid lock wait timeouts.",
    explanation: "Authoritative architectural best practices for S-Locks and X-Locks.",
    hint: "Lock-free MVCC by default + FOR SHARE for parent protection + indexed FOR UPDATE for writes + SKIP LOCKED for queues.",
    level: "expert"
  }
];

export default questions;
