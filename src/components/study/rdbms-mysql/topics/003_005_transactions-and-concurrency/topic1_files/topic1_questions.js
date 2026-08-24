// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What does the ACID acronym stand for in relational database management systems?",
    shortAnswer: "Atomicity, Consistency, Isolation, and Durability.",
    explanation: "The 4 foundational pillars of transactional reliability.",
    hint: "Atomicity, Consistency, Isolation, Durability.",
    level: "basic"
  },
  {
    question: "What does 'Atomicity' guarantee in a database transaction?",
    shortAnswer: "That all statements within the transaction execute completely as a single indivisible unit, or all changes are completely rolled back ('All-or-Nothing').",
    explanation: "Core definition of Atomicity.",
    hint: "All statements succeed together or all are undone completely.",
    level: "basic"
  },
  {
    question: "Which internal InnoDB mechanism guarantees Atomicity in MySQL?",
    shortAnswer: "The **Undo Log** (which records prior row states to reverse modifications during `ROLLBACK` or crash recovery).",
    explanation: "InnoDB Undo Log role in Atomicity.",
    hint: "InnoDB Undo Logs.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate Atomicity?",
    shortAnswer: "If Mamata's tuition is deducted, Susmita's ledger credited, Abhronila's seat reserved, and Debangshu's batch updated, if Debangshu's update fails, all 4 operations roll back atomically.",
    explanation: "Multi-student transaction atomicity trace.",
    hint: "If the 4th operation fails, all previous 3 operations roll back completely.",
    level: "basic"
  },
  {
    question: "What does 'Consistency' guarantee in a database transaction?",
    shortAnswer: "That a transaction transitions the database from one valid state to another valid state, preserving all schema integrity constraints (`PRIMARY KEY`, `FOREIGN KEY`, `CHECK`) and business invariants.",
    explanation: "Core definition of Consistency.",
    hint: "Database transitions between valid states, preserving all integrity constraints.",
    level: "basic"
  },
  {
    question: "What is an example of an application-level Consistency invariant in financial systems?",
    shortAnswer: "The invariant that the total sum of money across all student accounts before a transfer MUST equal the total sum of money after the transfer.",
    explanation: "Business invariant consistency.",
    hint: "Total system balance remains constant before and after inter-account transfers.",
    level: "basic"
  },
  {
    question: "What does 'Isolation' guarantee in a database transaction?",
    shortAnswer: "That concurrently executing transactions operate independently and do not observe or interfere with each other's intermediate, uncommitted state.",
    explanation: "Core definition of Isolation.",
    hint: "Concurrent transactions execute independently without observing uncommitted state.",
    level: "basic"
  },
  {
    question: "Which internal InnoDB mechanisms guarantee Isolation in MySQL?",
    shortAnswer: "**Multi-Version Concurrency Control (MVCC)** snapshot read views combined with InnoDB row-level locking (Record, Gap, and Next-Key locks).",
    explanation: "InnoDB MVCC and locking role in Isolation.",
    hint: "MVCC snapshot read views and row-level locks.",
    level: "expert"
  },
  {
    question: "What does 'Durability' guarantee in a database transaction?",
    shortAnswer: "That once a transaction is successfully committed (`COMMIT`), its modifications are permanently recorded in non-volatile storage and will survive power outages and system crashes.",
    explanation: "Core definition of Durability.",
    hint: "Committed changes are permanently preserved even during power outages.",
    level: "basic"
  },
  {
    question: "Which internal InnoDB mechanism guarantees Durability in MySQL?",
    shortAnswer: "The **Redo Log** (Write-Ahead Logging / WAL) combined with the **Doublewrite Buffer**.",
    explanation: "InnoDB Redo Log role in Durability.",
    hint: "InnoDB Redo Logs (WAL) and Doublewrite Buffer.",
    level: "basic"
  },
  {
    question: "What is the Write-Ahead Logging (WAL) protocol in database engineering?",
    shortAnswer: "The fundamental principle that changes MUST be written and flushed to the sequential append-only Redo Log on disk BEFORE the actual data pages in tablespace files are modified.",
    explanation: "Write-Ahead Logging protocol mechanics.",
    hint: "Redo logs must be flushed to disk before tablespace data pages are written.",
    level: "expert"
  },
  {
    question: "What is the purpose of the InnoDB Doublewrite Buffer?",
    shortAnswer: "To prevent data corruption caused by partial page writes (torn pages) if a power failure occurs while writing a 16KB InnoDB data page to disk.",
    explanation: "Doublewrite buffer torn page protection.",
    hint: "Protects against partial page writes (torn pages) during power loss.",
    level: "expert"
  },
  {
    question: "How does the MySQL configuration parameter `innodb_flush_log_at_trx_commit = 1` enforce strict Durability?",
    shortAnswer: "It forces the InnoDB redo log buffer to be written and flushed (fsynced) to physical disk on EVERY transaction `COMMIT`.",
    explanation: "Strict ACID durability setting in MySQL.",
    hint: "Forces a physical disk fsync on every single transaction COMMIT.",
    level: "expert"
  },
  {
    question: "What happens to performance and durability if `innodb_flush_log_at_trx_commit` is set to `2`?",
    shortAnswer: "Logs are written to the OS page cache on commit but flushed to disk only once per second; transactions commit faster, but up to 1 second of transactions can be lost during an OS crash.",
    explanation: "Relaxed durability trade-offs.",
    hint: "Faster writes, but risks losing up to 1 second of transactions during power loss.",
    level: "expert"
  },
  {
    question: "What is Multi-Version Concurrency Control (MVCC) in InnoDB?",
    shortAnswer: "A concurrency mechanism where readers do not lock writers and writers do not lock readers; each query reads a point-in-time snapshot reconstructed from undo logs.",
    explanation: "Core definition of MVCC.",
    hint: "Readers don't block writers; readers access point-in-time undo log snapshots.",
    level: "expert"
  },
  {
    question: "What hidden system columns does InnoDB add to every table row to support MVCC and Atomicity?",
    shortAnswer: "`DB_TRX_ID` (ID of last modifying transaction), `DB_ROLL_PTR` (pointer to undo log record), and `DB_ROW_ID` (internal row ID).",
    explanation: "Hidden InnoDB row metadata columns.",
    hint: "DB_TRX_ID, DB_ROLL_PTR, and DB_ROW_ID.",
    level: "expert"
  },
  {
    question: "How does InnoDB use `DB_ROLL_PTR` during a `ROLLBACK` statement?",
    shortAnswer: "It follows the `DB_ROLL_PTR` pointer to locate the previous version of the row in the Undo Log and restores the original column values.",
    explanation: "Rollback execution using rollback pointers.",
    hint: "Follows pointer to undo log and restores prior column values.",
    level: "expert"
  },
  {
    question: "What is a 'Dirty Read' and which ACID property does it violate?",
    shortAnswer: "When Transaction B reads uncommitted modifications made by Transaction A (which might later be rolled back); it violates **Isolation**.",
    explanation: "Dirty read anomaly and Isolation.",
    hint: "Reading uncommitted data; violates Isolation.",
    level: "basic"
  },
  {
    question: "What is a 'Lost Update' and which ACID property does it violate?",
    shortAnswer: "When two concurrent transactions overwrite the same data record without observing each other's changes, erasing one transaction's update; it violates **Isolation**.",
    explanation: "Lost update anomaly and Isolation.",
    hint: "Concurrent updates overwriting each other; violates Isolation.",
    level: "basic"
  },
  {
    question: "How does a database `CHECK (balance >= 0)` constraint enforce Consistency?",
    shortAnswer: "It prevents transactions from leaving an account in an illegal negative balance state by throwing an error and rolling back the violating statement.",
    explanation: "CHECK constraint role in Consistency.",
    hint: "Rejects any transaction that attempts to set balance below zero.",
    level: "basic"
  },
  {
    question: "What happens during InnoDB Crash Recovery when the MySQL server restarts after a power failure?",
    shortAnswer: "1. Redo Phase: Replays committed redo log transactions to roll forward changes; 2. Undo Phase: Rolls back all uncommitted transactions active at crash time.",
    explanation: "InnoDB 2-phase crash recovery process.",
    hint: "Replays committed redo logs (roll forward) and undoes uncommitted changes (roll back).",
    level: "expert"
  },
  {
    question: "Can an application achieve full ACID guarantees when using non-transactional database engines like MyISAM?",
    shortAnswer: "NO; MyISAM lacks undo logs, redo logs, and row locking, making Atomicity, Isolation, and crash-safe Durability impossible.",
    explanation: "Non-ACID engine limitations.",
    hint: "No, MyISAM cannot provide ACID guarantees.",
    level: "basic"
  },
  {
    question: "What is the difference between Atomicity and Durability?",
    shortAnswer: "Atomicity ensures all statements succeed or none do ('All-or-Nothing'); Durability ensures committed changes survive hardware failures and crashes permanently.",
    explanation: "Atomicity vs Durability distinction.",
    hint: "Atomicity = All-or-Nothing; Durability = Permanent crash survival.",
    level: "basic"
  },
  {
    question: "What is the difference between Consistency and Isolation?",
    shortAnswer: "Consistency ensures the database adheres to all rules and invariants; Isolation ensures concurrent operations execute as if they were running serially without interference.",
    explanation: "Consistency vs Isolation distinction.",
    hint: "Consistency = Invariants valid; Isolation = Zero concurrent interference.",
    level: "basic"
  },
  {
    question: "Can a transaction have high Isolation without impacting performance?",
    shortAnswer: "Higher isolation levels (e.g. `SERIALIZABLE`) increase locking and decrease concurrent transaction throughput; systems balance consistency vs performance.",
    explanation: "Isolation vs throughput trade-off.",
    hint: "Higher isolation increases locks and lowers concurrent throughput.",
    level: "moderate"
  },
  {
    question: "How does InnoDB garbage-collect old Undo Log pages that are no longer needed by any active transaction?",
    shortAnswer: "Through the background **InnoDB Purge Threads**, which free undo log pages once all older read views have finished.",
    explanation: "InnoDB purge thread operation.",
    hint: "Background Purge Threads deallocate obsolete undo log pages.",
    level: "expert"
  },
  {
    question: "What happens if a long-running transaction remains open for hours in MySQL?",
    shortAnswer: "InnoDB cannot purge undo log pages created since that transaction started, causing massive undo tablespace bloat and slowing down query performance.",
    explanation: "Long-running transaction undo bloat hazard.",
    hint: "Blocks undo log purge, causing undo tablespace bloat and slow queries.",
    level: "expert"
  },
  {
    question: "Does `START TRANSACTION WITH CONSISTENT SNAPSHOT;` affect the Isolation property?",
    shortAnswer: "YES; it immediately creates an MVCC read view at statement start rather than waiting for the first `SELECT` statement.",
    explanation: "Consistent snapshot initiation.",
    hint: "Locks in an immediate point-in-time MVCC read view.",
    level: "expert"
  },
  {
    question: "Why is ACID compliance critical in banking and educational fee administration systems?",
    shortAnswer: "To prevent financial discrepancies, phantom double-charges, lost fee payments, and corrupted student ledgers during high-traffic registration periods.",
    explanation: "Business criticality of ACID.",
    hint: "Prevents financial losses, phantom charges, and corrupted ledgers.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for the ACID Properties?",
    shortAnswer: "Master the 4 architectural pillars: rely on **Undo Logs for Atomicity**, enforce schema constraints for **Consistency**, leverage **MVCC and row locks for Isolation**, and configure `innodb_flush_log_at_trx_commit = 1` with **Redo Logs for Durability** to guarantee zero data loss in production.",
    explanation: "Authoritative architectural summary of the ACID properties.",
    hint: "Undo Logs (Atomicity), Constraints (Consistency), MVCC/Locks (Isolation), Redo Logs (Durability).",
    level: "expert"
  }
];

export default questions;
