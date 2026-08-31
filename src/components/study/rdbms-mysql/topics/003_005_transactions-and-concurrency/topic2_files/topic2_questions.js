// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What are the three core Transaction Control Language (TCL) commands in MySQL?",
    shortAnswer: "`START TRANSACTION` (or `BEGIN`), `COMMIT`, and `ROLLBACK`.",
    explanation: "Core TCL commands in MySQL.",
    hint: "START TRANSACTION, COMMIT, ROLLBACK.",
    level: "basic"
  },
  {
    question: "What does the `COMMIT;` statement do to modified table data?",
    shortAnswer: "It makes all database modifications within the current transaction permanent on disk and visible to other transactions, releasing all acquired row locks.",
    explanation: "Mechanics of the COMMIT statement.",
    hint: "Persists changes permanently, makes them visible, and releases locks.",
    level: "basic"
  },
  {
    question: "What does the `ROLLBACK;` statement do?",
    shortAnswer: "It undoes all data modifications made during the current transaction, restoring data to the state it was in before `START TRANSACTION` began, and releases all row locks.",
    explanation: "Mechanics of the ROLLBACK statement.",
    hint: "Undoes all changes and restores pre-transaction state.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `COMMIT` vs `ROLLBACK`?",
    shortAnswer: "If Mamata transfers ₹5,000 to Susmita successfully, `COMMIT;` seals the transfer; if Abhronila attempts to transfer ₹50,000 with only ₹20,000 balance, `ROLLBACK;` cancels the overdraft.",
    explanation: "Commit vs Rollback in student accounts.",
    hint: "COMMIT seals valid transfers; ROLLBACK cancels invalid overdrafts.",
    level: "basic"
  },
  {
    question: "What is the function of the `COMMIT AND CHAIN;` clause?",
    shortAnswer: "It commits the current transaction and immediately opens a brand-new transaction with the exact same isolation and read/write characteristics without needing a separate `START TRANSACTION`.",
    explanation: "COMMIT AND CHAIN mechanics.",
    hint: "Commits current transaction and starts a new one immediately.",
    level: "expert"
  },
  {
    question: "What is the function of the `COMMIT RELEASE;` clause?",
    shortAnswer: "It commits the current transaction and immediately closes the client connection session.",
    explanation: "COMMIT RELEASE mechanics.",
    hint: "Commits changes and disconnects the client connection.",
    level: "expert"
  },
  {
    question: "What does `START TRANSACTION WITH CONSISTENT SNAPSHOT;` do?",
    shortAnswer: "It initiates a transaction and immediately locks in an MVCC point-in-time snapshot of the database at that exact moment (only valid in `REPEATABLE READ` isolation).",
    explanation: "Consistent snapshot transaction initiation.",
    hint: "Creates an immediate point-in-time MVCC read view at statement start.",
    level: "expert"
  },
  {
    question: "What is the difference between `START TRANSACTION READ ONLY;` and `START TRANSACTION READ WRITE;`?",
    shortAnswer: "`READ ONLY` prohibits DML mutations and optimizes internal engine memory structures; `READ WRITE` (the default) allows full `INSERT`, `UPDATE`, and `DELETE` operations.",
    explanation: "READ ONLY vs READ WRITE transaction modes.",
    hint: "READ ONLY blocks mutations for performance; READ WRITE allows DML.",
    level: "basic"
  },
  {
    question: "Can `ROLLBACK` undo a `DROP TABLE` or `TRUNCATE TABLE` statement in MySQL?",
    shortAnswer: "NO; DDL statements execute an implicit `COMMIT` before and after execution, so they cannot be rolled back.",
    explanation: "Non-rollbackable DDL operations.",
    hint: "No, DDL statements cause an automatic implicit COMMIT.",
    level: "basic"
  },
  {
    question: "What happens if a user issues `START TRANSACTION;` while another transaction is ALREADY active in the same session?",
    shortAnswer: "MySQL executes an implicit `COMMIT` of the currently open transaction before starting the new transaction.",
    explanation: "Nested START TRANSACTION implicit commit behavior.",
    hint: "MySQL implicitly commits the active transaction before opening the new one.",
    level: "expert"
  },
  {
    question: "Can an `EXIT HANDLER FOR SQLEXCEPTION` execute `ROLLBACK;` automatically inside a stored procedure?",
    shortAnswer: "YES; `DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN ROLLBACK; RESIGNAL; END;` is the authoritative enterprise pattern for automatic failure recovery.",
    explanation: "Automated procedure rollback handlers.",
    hint: "Yes, declare an EXIT HANDLER that executes ROLLBACK.",
    level: "basic"
  },
  {
    question: "What is the transaction state lifecycle from start to finish?",
    shortAnswer: "1. Active → 2. Partially Committed (after last statement) → 3. Committed (after redo flush), OR 1. Active → 2. Failed → 3. Aborted (after rollback).",
    explanation: "Standard database transaction state machine.",
    hint: "Active → Partially Committed → Committed OR Active → Failed → Aborted.",
    level: "expert"
  },
  {
    question: "Does `ROLLBACK` release table locks acquired with `LOCK TABLES`?",
    shortAnswer: "No, `UNLOCK TABLES` must be explicitly called to release table locks acquired via `LOCK TABLES`.",
    explanation: "Table lock deallocation vs transaction rollback.",
    hint: "No, LOCK TABLES locks require an explicit UNLOCK TABLES.",
    level: "moderate"
  },
  {
    question: "Can you execute `ROLLBACK AND CHAIN;`?",
    shortAnswer: "YES; it rolls back all uncommitted changes of the current transaction and immediately starts a new transaction with identical parameters.",
    explanation: "ROLLBACK AND CHAIN clause.",
    hint: "Yes, rolls back and starts a new transaction immediately.",
    level: "expert"
  },
  {
    question: "What happens if a client application sends `ROLLBACK` when NO transaction is currently open?",
    shortAnswer: "MySQL accepts the command with no effect (it is a harmless no-op).",
    explanation: "No-op rollback outside transactions.",
    hint: "Harmless no-op; nothing happens.",
    level: "basic"
  },
  {
    question: "How do you conditionally execute `ROLLBACK` in procedural SQL based on a variable check?",
    shortAnswer: "`IF v_balance < 0 THEN ROLLBACK; SELECT 'Overdraft rejected' AS status; ELSE COMMIT; END IF;`.",
    explanation: "Conditional transaction completion in procedures.",
    hint: "Use IF condition THEN ROLLBACK; ELSE COMMIT; END IF;.",
    level: "basic"
  },
  {
    question: "Does `COMMIT` reset local stored procedure variables back to their initial values?",
    shortAnswer: "NO; `COMMIT` and `ROLLBACK` only affect table rows in the database; procedural variables retain their in-memory values.",
    explanation: "Variable scope independent of TCL commands.",
    hint: "No, local variables in memory are unaffected by COMMIT or ROLLBACK.",
    level: "expert"
  },
  {
    question: "What is the return value of `ROW_COUNT()` after a `COMMIT` statement?",
    shortAnswer: "-1 (since `COMMIT` is an administrative control statement that does not modify rows directly).",
    explanation: "ROW_COUNT() value on TCL statements.",
    hint: "Returns -1.",
    level: "moderate"
  },
  {
    question: "Can you name transactions in MySQL (e.g. `START TRANSACTION 'my_tx'`)?",
    shortAnswer: "No, standard MySQL does not support naming transactions (unlike Oracle or SQL Server); transactions are identified by internal session transaction IDs.",
    explanation: "Unnamed transaction syntax in MySQL.",
    hint: "No, MySQL transactions do not take user-defined names.",
    level: "basic"
  },
  {
    question: "What happens to temporary tables created with `CREATE TEMPORARY TABLE` when a transaction is rolled back?",
    shortAnswer: "Creating a temporary table is a DDL operation that does NOT cause an implicit commit, but the table creation itself is NOT undone by `ROLLBACK`.",
    explanation: "Temporary table rollback behavior.",
    hint: "Temporary table creation remains even if the DML inside the transaction is rolled back.",
    level: "expert"
  },
  {
    question: "How does `COMMIT` interact with the InnoDB Redo Log buffer?",
    shortAnswer: "When `innodb_flush_log_at_trx_commit = 1`, `COMMIT` triggers a synchronous flush (fsync) of the redo log buffer to physical disk.",
    explanation: "Redo log flushing on commit.",
    hint: "Triggers a physical disk fsync of the redo log buffer.",
    level: "expert"
  },
  {
    question: "Can you commit a transaction from a different session than the one that opened it?",
    shortAnswer: "NO; transactions are strictly bound to the specific client session/connection that initiated them.",
    explanation: "Session affinity of database transactions.",
    hint: "No, transactions are strictly bound to their specific client connection.",
    level: "basic"
  },
  {
    question: "What is a 'Compensating Transaction'?",
    shortAnswer: "A subsequent, independent transaction executed to logically reverse the business effects of an already-committed previous transaction that cannot be rolled back with `ROLLBACK`.",
    explanation: "Compensating transactions in distributed workflows.",
    hint: "A new transaction that reverses the business effect of an already-committed transaction.",
    level: "expert"
  },
  {
    question: "What happens if an unhandled `SIGNAL` statement is raised inside an open transaction?",
    shortAnswer: "The exception aborts the procedure; if no handler catches it, MySQL aborts execution and the client connection typically rolls back the uncommitted transaction.",
    explanation: "Unhandled exceptions in open transactions.",
    hint: "Aborts execution and causes uncommitted changes to roll back upon session exit.",
    level: "basic"
  },
  {
    question: "Can a transaction contain multiple `SAVEPOINT` statements before `COMMIT`?",
    shortAnswer: "YES; you can establish multiple savepoints within a transaction and roll back to specific savepoints partially without aborting the entire transaction.",
    explanation: "Savepoint integration with transactions.",
    hint: "Yes, transactions support multiple savepoints.",
    level: "basic"
  },
  {
    question: "How do you verify if the current transaction is in `READ ONLY` mode in MySQL 8.0?",
    shortAnswer: "Check `SELECT @@transaction_read_only;` or inspect `information_schema.innodb_trx`.",
    explanation: "Inspecting transaction read-only mode.",
    hint: "Query @@transaction_read_only.",
    level: "basic"
  },
  {
    question: "What is the impact of executing `COMMIT` in a tight loop of 100,000 single-row inserts?",
    shortAnswer: "Severe I/O bottlenecking because each `COMMIT` forces a physical disk fsync; grouping 10,000 inserts into a single transaction runs 100x faster.",
    explanation: "Transaction batching vs per-row commits.",
    hint: "100,000 disk fsyncs cause extreme slowdown; batching into fewer transactions is 100x faster.",
    level: "expert"
  },
  {
    question: "Can `BEGIN WORK;` be used interchangeably with `START TRANSACTION;`?",
    shortAnswer: "YES; `BEGIN`, `BEGIN WORK`, and `START TRANSACTION` are all valid aliases in MySQL.",
    explanation: "TCL command aliases.",
    hint: "Yes, BEGIN, BEGIN WORK, and START TRANSACTION are interchangeable aliases.",
    level: "basic"
  },
  {
    question: "What happens if a stored procedure initiates `START TRANSACTION;` and calls another procedure that also issues `START TRANSACTION;`?",
    shortAnswer: "The second `START TRANSACTION` causes an implicit `COMMIT` of the first procedure's uncommitted work, breaking the outer transaction boundary!",
    explanation: "The nested procedure transaction hazard.",
    hint: "Causes an implicit COMMIT of the outer transaction, breaking atomic boundaries.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Transaction Control Commands?",
    shortAnswer: "Always manage transaction boundaries with explicit `START TRANSACTION ... COMMIT` blocks; never nest `START TRANSACTION` calls across procedures (to prevent accidental implicit commits); handle all errors with automated `ROLLBACK` handlers; and use `COMMIT AND CHAIN` for high-throughput batch chunking.",
    explanation: "Authoritative architectural best practices for TCL commands.",
    hint: "Explicit boundaries + automated rollback + avoid nested START TRANSACTION + use COMMIT AND CHAIN.",
    level: "expert"
  }
];

export default questions;
