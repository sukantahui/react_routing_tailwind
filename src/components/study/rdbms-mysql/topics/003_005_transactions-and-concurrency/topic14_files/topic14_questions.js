// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What is a 'Deadlock' in database management systems?",
    shortAnswer: "A situation where two or more transactions hold locks that the other transactions need, forming a circular wait dependency graph where neither can proceed without external intervention.",
    explanation: "Core definition of a database deadlock.",
    hint: "Circular lock wait dependency where transactions block each other indefinitely.",
    level: "basic"
  },
  {
    question: "How does InnoDB detect deadlocks automatically?",
    shortAnswer: "InnoDB maintains an internal **Wait-For Graph**; when `innodb_deadlock_detect = ON`, it traverses the graph in real-time, instantly detecting cycles.",
    explanation: "InnoDB deadlock detector wait-for graph algorithm.",
    hint: "Traverses internal Wait-For Graphs in real-time to detect cycles.",
    level: "expert"
  },
  {
    question: "How do student transactions for Mamata and Susmita illustrate a classic Deadlock?",
    shortAnswer: "Session 1 locks Mamata (Row A) and requests Susmita (Row B); Session 2 locks Susmita (Row B) and requests Mamata (Row A); both block on each other until InnoDB intervenes.",
    explanation: "Classic cross-table circular wait scenario.",
    hint: "Session 1 holds A, waits for B; Session 2 holds B, waits for A.",
    level: "basic"
  },
  {
    question: "How does InnoDB select which transaction to terminate as the 'Deadlock Victim'?",
    shortAnswer: "InnoDB chooses the **smallest transaction**—the one that has inserted, updated, or deleted the fewest rows (generating the smallest volume of undo log to roll back).",
    explanation: "InnoDB victim selection heuristic.",
    hint: "Rolls back the smallest transaction that modified the fewest rows.",
    level: "expert"
  },
  {
    question: "What MySQL error code is returned to the deadlock victim transaction?",
    shortAnswer: "Error `1213 (40001)`: `Deadlock found when trying to get lock; try restarting transaction`.",
    explanation: "Deadlock error code.",
    hint: "Error 1213 (SQLSTATE 40001).",
    level: "basic"
  },
  {
    question: "What SQL command outputs the detailed analysis of the most recent deadlock?",
    shortAnswer: "`SHOW ENGINE INNODB STATUS;` (under the `LATEST DETECTED DEADLOCK` section).",
    explanation: "Inspecting recent deadlocks in InnoDB status.",
    hint: "SHOW ENGINE INNODB STATUS;",
    level: "basic"
  },
  {
    question: "What system variable enables printing all deadlock occurrences to the MySQL server error log?",
    shortAnswer: "`SET GLOBAL innodb_print_all_deadlocks = ON;`.",
    explanation: "Logging all deadlocks to error log.",
    hint: "innodb_print_all_deadlocks = ON.",
    level: "basic"
  },
  {
    question: "How does 'Consistent Lock Ordering' prevent deadlocks?",
    shortAnswer: "If all transactions always lock rows in the exact same deterministic order (e.g. sorted by Primary Key ascending `ORDER BY id ASC`), circular wait cycles become mathematically impossible.",
    explanation: "Deadlock prevention via consistent ordering.",
    hint: "Sorting lock acquisition by ascending primary key prevents circular cycles.",
    level: "expert"
  },
  {
    question: "What is a 'Lock Upgrade Deadlock'?",
    shortAnswer: "When two transactions both hold Shared Locks (S-Locks) on the same row and both attempt to upgrade to an Exclusive Lock (X-Lock), each waits for the other to release its S-Lock.",
    explanation: "Lock upgrade deadlock mechanics.",
    hint: "Both hold S-Locks and wait for each other before upgrading to X-Locks.",
    level: "expert"
  },
  {
    question: "What is a 'Gap Lock Insertion Deadlock'?",
    shortAnswer: "When two transactions hold overlapping Gap Locks on the same range (e.g. `(10, 20)`) and both attempt to `INSERT` into that gap, both Insert Intention Locks block on each other.",
    explanation: "Gap lock insertion deadlock mechanics.",
    hint: "Both hold gap locks on (10, 20) and both try to insert, blocking each other.",
    level: "expert"
  },
  {
    question: "How does switching to `READ COMMITTED` isolation level help reduce deadlocks?",
    shortAnswer: "It disables Gap Locks for regular queries, completely eliminating all Gap Lock insertion deadlocks.",
    explanation: "Eliminating gap lock deadlocks via READ COMMITTED.",
    hint: "Disables gap locks, eliminating gap insertion deadlocks.",
    level: "basic"
  },
  {
    question: "What should an application do when it catches Error 1213 (Deadlock)?",
    shortAnswer: "Catch Error 1213 in an exception handler and automatically **retry the transaction** with exponential backoff and randomized jitter.",
    explanation: "Application retry handling on Error 1213.",
    hint: "Catch Error 1213 and retry the transaction with exponential backoff.",
    level: "basic"
  },
  {
    question: "Why is 'Randomized Jitter' recommended during deadlock retry backoffs?",
    shortAnswer: "To prevent 'Thundering Herd' retry storms: if both colliding transactions retry at the exact same millisecond interval, they will collide and deadlock repeatedly.",
    explanation: "Randomized jitter for avoiding synchronous retry collisions.",
    hint: "Prevents colliding transactions from retrying at the exact same instant.",
    level: "expert"
  },
  {
    question: "Can deadlocks occur in a single-table transaction?",
    shortAnswer: "YES; if Transaction 1 updates Row 1 then Row 2, while Transaction 2 updates Row 2 then Row 1 in the same table, a deadlock occurs.",
    explanation: "Single-table multi-row deadlocks.",
    hint: "Yes, updating different rows in inverse order inside the same table deadlocks.",
    level: "basic"
  },
  {
    question: "Can deadlocks occur when only `INSERT` statements are executing?",
    shortAnswer: "YES; concurrent inserts encountering duplicate key checks or gap locks can form circular lock dependencies.",
    explanation: "Insert-only deadlocks.",
    hint: "Yes, duplicate key checks and gap locks during inserts can cause deadlocks.",
    level: "expert"
  },
  {
    question: "What is the difference between a 'Lock Wait Timeout' (Error 1205) and a 'Deadlock' (Error 1213)?",
    shortAnswer: "A Lock Wait Timeout occurs when a transaction waits too long on a non-circular lock; a Deadlock is an immediate circular dependency detected and broken by InnoDB within milliseconds.",
    explanation: "Lock wait timeout vs deadlock distinction.",
    hint: "Lock timeout = waited too long on 1 lock; Deadlock = circular mutual lock dependency.",
    level: "basic"
  },
  {
    question: "Can deadlocks be completely eliminated in high-concurrency systems?",
    shortAnswer: "Rarely 100%; deadlocks are a normal by-product of concurrent pessimistic locking, and applications must be engineered to expect, catch, and retry them gracefully.",
    explanation: "Deadlocks as a natural concurrency phenomenon.",
    hint: "No, deadlocks are normal in concurrent systems; applications must catch and retry.",
    level: "expert"
  },
  {
    question: "What is the role of `innodb_deadlock_detect` in extreme high-throughput workloads (>100,000 TPS)?",
    shortAnswer: "In extreme high-concurrency scenarios with thousands of threads, deadlock detection graph traversal can consume high CPU; some systems disable it (`innodb_deadlock_detect = OFF`) and rely on low `innodb_lock_wait_timeout`.",
    explanation: "Disabling deadlock detector at ultra-high TPS.",
    hint: "Disabling can save CPU at extreme scale, relying on low lock timeouts instead.",
    level: "expert"
  },
  {
    question: "How does keeping transactions short minimize deadlock probability?",
    shortAnswer: "Shorter transactions hold locks for fewer milliseconds, drastically shrinking the time window during which another transaction can request overlapping locks.",
    explanation: "Transaction duration reduction.",
    hint: "Shrinks the time window during which overlapping locks can conflict.",
    level: "basic"
  },
  {
    question: "What information is displayed under `LATEST DETECTED DEADLOCK` in `SHOW ENGINE INNODB STATUS`?",
    shortAnswer: "The exact SQL queries of both transactions, the thread IDs, the locks held, the locks requested, the waiting lock structures, and which transaction was selected as victim.",
    explanation: "Deadlock forensic details in InnoDB status.",
    hint: "SQL queries, thread IDs, held locks, requested locks, and victim selection.",
    level: "expert"
  },
  {
    question: "How do Foreign Key constraints increase deadlock risks?",
    shortAnswer: "Foreign key checks automatically place hidden S-Locks on parent tables, creating multi-table lock dependencies that developers often overlook.",
    explanation: "Hidden foreign key locking dependencies.",
    hint: "Automatically acquires hidden S-Locks on parent tables.",
    level: "expert"
  },
  {
    question: "How does Spring `@Retryable` handle database deadlocks?",
    shortAnswer: "`@Retryable(retryFor = {CannotAcquireLockException.class}, maxAttempts = 3, backoff = @Backoff(delay = 100, multiplier = 2.0))`.",
    explanation: "Spring @Retryable deadlock annotation.",
    hint: "Annotate service methods with @Retryable for lock acquisition exceptions.",
    level: "expert"
  },
  {
    question: "Can an application experience a deadlock between an `ALTER TABLE` and a `SELECT`?",
    shortAnswer: "Yes; through Metadata Lock (MDL) queuing dependencies across multiple connections.",
    explanation: "Metadata lock deadlocks.",
    hint: "Yes, via Metadata Lock (MDL) queuing dependencies.",
    level: "expert"
  },
  {
    question: "What happens to the winning transaction when InnoDB aborts the deadlock victim?",
    shortAnswer: "The winning transaction immediately receives its requested lock and proceeds to execute to completion without interruption.",
    explanation: "Winner transaction unblocking.",
    hint: "The winner receives its lock immediately and proceeds to completion.",
    level: "basic"
  },
  {
    question: "Does executing `ROLLBACK` on a deadlock victim release all of its acquired locks?",
    shortAnswer: "YES; rolling back the victim transaction immediately releases all row locks, gap locks, and intention locks it held.",
    explanation: "Complete lock release upon victim rollback.",
    hint: "Yes, releases all locks held by the victim instantly.",
    level: "basic"
  },
  {
    question: "How do Secondary Index updates increase deadlock frequency?",
    shortAnswer: "An update on an indexed column must lock both the secondary index B+Tree entry AND the clustered primary key entry, doubling the number of locks acquired per row.",
    explanation: "Secondary index dual-locking deadlock impact.",
    hint: "Locks both secondary index and clustered primary key records.",
    level: "expert"
  },
  {
    question: "Why should batch updates always sort input IDs before executing queries?",
    shortAnswer: "To enforce deterministic lock ordering: updating IDs in order `[101, 102, 103]` across all workers prevents any two workers from acquiring locks in reverse order.",
    explanation: "Sorting batch input IDs for deadlock prevention.",
    hint: "Guarantees deterministic ascending lock order across all batch workers.",
    level: "expert"
  },
  {
    question: "What is a 'Distributed Deadlock'?",
    shortAnswer: "A deadlock spanning multiple independent databases or microservices (e.g. in 2-Phase Commit / XA transactions), requiring a distributed transaction coordinator to resolve.",
    explanation: "Distributed deadlock definition.",
    hint: "A deadlock spanning multiple independent database nodes.",
    level: "expert"
  },
  {
    question: "Can index creation (`CREATE INDEX`) cause deadlocks?",
    shortAnswer: "In MySQL 8.0, Online DDL permits concurrent DML during index builds, but acquiring the initial and final Metadata Locks can deadlock with active transactions.",
    explanation: "Online DDL metadata lock deadlocks.",
    hint: "Yes, initial and final metadata lock phases can deadlock with active transactions.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Deadlocks?",
    shortAnswer: "Treat deadlocks as an expected reality of concurrent pessimistic systems; eliminate architectural causes by enforcing **strict ascending primary key lock ordering**, keeping transactions minimal, and switching to **`READ COMMITTED`** to disable gap locks; and always build **automated application retry handlers with exponential backoff and jitter** to catch Error 1213 seamlessly.",
    explanation: "Authoritative architectural best practices for deadlock prevention and resolution.",
    hint: "Consistent ascending lock ordering + short transactions + READ COMMITTED + automated retry with exponential backoff.",
    level: "expert"
  }
];

export default questions;
