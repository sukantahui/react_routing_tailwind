// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is a Record Lock (`LOCK_REC_NOT_GAP`) in MySQL InnoDB?",
    shortAnswer: "A lock on a specific individual index record in the B+Tree, locking only that exact record without locking the preceding or succeeding gaps.",
    explanation: "Core definition of Record Locks.",
    hint: "Locks only the specific index record, not the gaps.",
    level: "basic"
  },
  {
    question: "What is a Gap Lock (`LOCK_GAP`) in MySQL InnoDB?",
    shortAnswer: "A lock on the empty space or gap between two index records (or before the first record, or after the supremum record), whose sole purpose is to prevent other transactions from inserting into that gap.",
    explanation: "Core definition of Gap Locks.",
    hint: "Locks the space between index records to prevent concurrent insertions.",
    level: "basic"
  },
  {
    question: "What is a Next-Key Lock (`LOCK_ORDINARY`) in MySQL InnoDB?",
    shortAnswer: "A hybrid lock consisting of a Record Lock on the index record combined with a Gap Lock on the gap immediately preceding that record: represented as `(previous_val, current_val]`.",
    explanation: "Core definition of Next-Key Locks.",
    hint: "Combination of a Record Lock + Gap Lock on preceding gap: (prev, current].",
    level: "basic"
  },
  {
    question: "How do student records for IDs 10, 20, and 30 illustrate Record Locks vs Gap Locks vs Next-Key Locks?",
    shortAnswer: "Record Lock on 20 locks only ID 20; Gap Lock on (10, 20) blocks inserting Mamata (ID 15); Next-Key Lock on 20 locks both the gap (10, 20) and the record [20].",
    explanation: "Concrete index range demonstration.",
    hint: "Record Lock = [20]; Gap Lock = (10, 20); Next-Key Lock = (10, 20].",
    level: "basic"
  },
  {
    question: "When does InnoDB optimize a query to use ONLY a Record Lock (`LOCK_REC_NOT_GAP`) instead of a Next-Key Lock?",
    shortAnswer: "When querying an exact unique match on a **Primary Key or UNIQUE Index** with all index columns specified (e.g. `WHERE student_id = 101`).",
    explanation: "Unique index record lock optimization.",
    hint: "On exact match lookups over Unique or Primary Key indexes.",
    level: "expert"
  },
  {
    question: "Why is gap locking unnecessary for exact matches on Unique / Primary Key indexes?",
    shortAnswer: "Because a unique index strictly guarantees that at most ONE record can match, so no other transaction could ever insert a duplicate matching phantom row.",
    explanation: "Mathematical guarantee of uniqueness eliminating phantom risk.",
    hint: "Unique constraints guarantee at most one matching row, eliminating phantom risk.",
    level: "expert"
  },
  {
    question: "What is the 'Supremum Pseudo-Record' in InnoDB?",
    shortAnswer: "A fictitious boundary record stored on each index page representing an imaginary value greater than any possible real index key ($+\\infty$).",
    explanation: "Supremum pseudo-record definition.",
    hint: "A fictitious boundary record representing positive infinity (+inf).",
    level: "expert"
  },
  {
    question: "How does InnoDB lock the gap after the highest existing index record up to positive infinity?",
    shortAnswer: "By placing a Next-Key lock on the **Supremum pseudo-record**, locking the interval `(max_existing_key, +infinity)`.",
    explanation: "Locking the supremum interval.",
    hint: "Locks the Next-Key interval (max_key, +inf) on the Supremum record.",
    level: "expert"
  },
  {
    question: "What is the 'Infimum Pseudo-Record' in InnoDB?",
    shortAnswer: "A fictitious boundary record on each index page representing a value lower than any possible real index key ($-\\infty$).",
    explanation: "Infimum pseudo-record definition.",
    hint: "A fictitious boundary record representing negative infinity (-inf).",
    level: "expert"
  },
  {
    question: "Do Shared Gap Locks and Exclusive Gap Locks conflict with each other?",
    shortAnswer: "NO; in InnoDB, Shared Gap Locks and Exclusive Gap Locks are **compatible**; both can be held by different transactions simultaneously on the same gap because both only intend to prevent inserts.",
    explanation: "Coexistence of conflicting gap lock modes.",
    hint: "No, gap locks do not conflict with each other; both coexist to block inserts.",
    level: "expert"
  },
  {
    question: "What is an 'Insert Intention Lock' (`LOCK_INSERT_INTENTION`) in InnoDB?",
    shortAnswer: "A special gap lock acquired prior to inserting a row; multiple transactions inserting into different positions in the same gap do NOT block each other.",
    explanation: "Insert intention lock definition.",
    hint: "Special gap lock set before INSERT allowing parallel non-colliding inserts.",
    level: "expert"
  },
  {
    question: "What causes a conflict between an Insert Intention Lock and a Gap Lock?",
    shortAnswer: "An `INSERT` requesting an Insert Intention Lock will be **BLOCKED** if another transaction is actively holding a Gap Lock or Next-Key Lock covering that gap.",
    explanation: "Insert intention vs gap lock conflict.",
    hint: "INSERT is blocked if another transaction holds a Gap Lock on that space.",
    level: "basic"
  },
  {
    question: "How does `READ COMMITTED` isolation level affect Gap Locks in InnoDB?",
    shortAnswer: "In `READ COMMITTED`, InnoDB **disables Gap Locks** for search and index scans (except foreign key checks and duplicate key checks), using only Record Locks.",
    explanation: "Disabling gap locks in READ COMMITTED.",
    hint: "Disables Gap Locks for regular queries, using only Record Locks.",
    level: "basic"
  },
  {
    question: "How do you inspect the exact lock mode (`LOCK_REC_NOT_GAP`, `LOCK_GAP`, `LOCK_ORDINARY`) in MySQL 8.0?",
    shortAnswer: "Query `performance_schema.data_locks` and inspect the `LOCK_MODE` column.",
    explanation: "Inspecting lock modes in performance_schema.",
    hint: "Inspect LOCK_MODE in performance_schema.data_locks.",
    level: "basic"
  },
  {
    question: "What value does `performance_schema.data_locks` show in `LOCK_MODE` for a Next-Key Lock?",
    shortAnswer: "`X` or `S` (without `REC_NOT_GAP` or `GAP`, meaning ordinary next-key lock).",
    explanation: "Next-key lock representation in data_locks.",
    hint: "Shows 'X' or 'S' (without REC_NOT_GAP or GAP).",
    level: "expert"
  },
  {
    question: "What value does `performance_schema.data_locks` show for a pure Record Lock?",
    shortAnswer: "`X,REC_NOT_GAP` or `S,REC_NOT_GAP`.",
    explanation: "Record lock representation in data_locks.",
    hint: "Shows 'X,REC_NOT_GAP' or 'S,REC_NOT_GAP'.",
    level: "expert"
  },
  {
    question: "What value does `performance_schema.data_locks` show for a pure Gap Lock?",
    shortAnswer: "`X,GAP` or `S,GAP`.",
    explanation: "Gap lock representation in data_locks.",
    hint: "Shows 'X,GAP' or 'S,GAP'.",
    level: "expert"
  },
  {
    question: "What value does `performance_schema.data_locks` show for an Insert Intention Lock?",
    shortAnswer: "`X,GAP,INSERT_INTENTION`.",
    explanation: "Insert intention lock representation in data_locks.",
    hint: "Shows 'X,GAP,INSERT_INTENTION'.",
    level: "expert"
  },
  {
    question: "What happens if you execute `SELECT * FROM students WHERE id = 15 FOR UPDATE` when record 15 DOES NOT EXIST (and records 10 and 20 exist)?",
    shortAnswer: "InnoDB places a **Gap Lock on the interval `(10, 20)`**, blocking any transaction from inserting student ID 15 (or any ID between 11 and 19).",
    explanation: "Gap lock placement on non-existent unique key lookup.",
    hint: "Places a Gap Lock on (10, 20), blocking all inserts in that gap.",
    level: "expert"
  },
  {
    question: "Why does searching for a non-existent row acquire a Gap Lock?",
    shortAnswer: "To guarantee repeatable reads and prevent phantom insertions: if you search for 15 and find nothing, another transaction cannot insert 15 until your transaction completes.",
    explanation: "Phantom prevention for non-existent row reads.",
    hint: "Prevents other transactions from inserting that row and creating a phantom.",
    level: "expert"
  },
  {
    question: "What happens when an `UPDATE` scans a non-unique secondary index (e.g. `WHERE age = 20`)?",
    shortAnswer: "InnoDB places Next-Key locks on all matched secondary index records, Next-Key locks on the gap after the last match, AND Record Locks on the clustered primary key records.",
    explanation: "Locking behavior on non-unique index scans.",
    hint: "Places Next-Key locks on secondary index and Record Locks on primary key.",
    level: "expert"
  },
  {
    question: "Can two concurrent transactions both hold Gap Locks on `(10, 20)` and both try to `INSERT` into `(10, 20)`?",
    shortAnswer: "YES, and when both try to `INSERT`, each requests an Insert Intention Lock blocked by the other's Gap Lock, triggering a **DEADLOCK**!",
    explanation: "Classic gap lock insertion deadlock.",
    hint: "Yes, both gap locks coexist, but both inserts block on each other, causing a Deadlock.",
    level: "expert"
  },
  {
    question: "How does setting `transaction-isolation = READ-COMMITTED` eliminate gap lock insertion deadlocks?",
    shortAnswer: "By eliminating Gap Locks, concurrent transactions do not lock the space between rows, allowing non-colliding inserts to execute in parallel without deadlocking.",
    explanation: "Deadlock reduction via READ COMMITTED.",
    hint: "Eliminating gap locks prevents insert blocking and mutual deadlocks.",
    level: "basic"
  },
  {
    question: "What is the interval notation for a Next-Key Lock on index record 30 when the preceding record is 20?",
    shortAnswer: "`(20, 30]` (exclusive of 20, inclusive of 30).",
    explanation: "Interval mathematical notation of Next-Key locks.",
    hint: "(20, 30] — half-open interval.",
    level: "basic"
  },
  {
    question: "Can a Record Lock prevent another transaction from reading the row using a plain `SELECT` under `REPEATABLE READ`?",
    shortAnswer: "NO; plain `SELECT` uses MVCC consistent snapshot reads reconstructed from Undo Logs, bypassing all row and gap locks completely.",
    explanation: "MVCC read immunity to record locks.",
    hint: "No, plain SELECT queries are lock-free under MVCC.",
    level: "basic"
  },
  {
    question: "What lock is acquired when executing `DELETE FROM students WHERE id BETWEEN 10 AND 20` under `REPEATABLE READ`?",
    shortAnswer: "Next-Key locks on all index records in the range `[10, 20]` plus a gap lock extending to the first index record beyond 20.",
    explanation: "Range delete locking mechanics.",
    hint: "Next-Key locks across the entire range plus a gap lock on the succeeding gap.",
    level: "expert"
  },
  {
    question: "Does InnoDB acquire gap locks when executing `INSERT INTO table VALUES (...)` on a table with a Primary Key auto-increment?",
    shortAnswer: "It acquires an Insert Intention Lock on the target gap and an Exclusive Record Lock on the newly inserted record.",
    explanation: "Insert intention and record lock acquisition on INSERT.",
    hint: "Insert Intention Lock on gap + Exclusive Record Lock on new record.",
    level: "expert"
  },
  {
    question: "What happens if a query uses a secondary index covering only half of a composite key?",
    shortAnswer: "InnoDB treats it as a non-unique prefix scan, applying Next-Key locks across the scanned index range.",
    explanation: "Prefix index scan locking.",
    hint: "Applies Next-Key locks across the scanned prefix index range.",
    level: "expert"
  },
  {
    question: "How does `innodb_locks_unsafe_for_binlog` relate to gap locking in legacy MySQL versions?",
    shortAnswer: "It was a deprecated variable in MySQL 5.6/5.7 used to disable gap locking for non-foreign-key queries; replaced in MySQL 8.0 by configuring `READ COMMITTED` isolation.",
    explanation: "Legacy innodb_locks_unsafe_for_binlog variable.",
    hint: "Deprecated variable to disable gap locks; replaced by READ COMMITTED.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Record Locks, Gap Locks, and Next-Key Locks?",
    shortAnswer: "Understand that InnoDB uses **Record Locks** (`LOCK_REC_NOT_GAP`) for unique primary key lookups, **Gap Locks** (`LOCK_GAP`) to prevent insertions into empty spaces, and **Next-Key Locks** (`(prev, current]`) to eliminate phantom reads in `REPEATABLE READ`; and switch to `READ COMMITTED` with `binlog_format = ROW` if gap lock insertion contention causes deadlocks in high-throughput OLTP systems.",
    explanation: "Authoritative architectural summary of InnoDB lock types.",
    hint: "Record Locks for unique matches + Next-Key for ranges + switch to READ COMMITTED to eliminate gap deadlocks.",
    level: "expert"
  }
];

export default questions;
