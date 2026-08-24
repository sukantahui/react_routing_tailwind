// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is a Database Transaction in relational database management systems?",
    shortAnswer: "A logical unit of work (LUW) consisting of one or more SQL operations that must execute completely as an indivisible unit or be completely undone.",
    explanation: "Fundamental definition of a database transaction.",
    hint: "An indivisible unit of work executed as All-or-Nothing.",
    level: "basic"
  },
  {
    question: "What is the classic real-world banking example that demonstrates the necessity of transactions?",
    shortAnswer: "Transferring funds between two accounts (debiting Account A and crediting Account B); without transactions, a crash between the debit and credit causes money to disappear.",
    explanation: "The canonical banking transfer motivation.",
    hint: "Inter-account money transfer where debit and credit must be atomic.",
    level: "basic"
  },
  {
    question: "How do student accounts for Mamata and Susmita illustrate transactional integrity?",
    shortAnswer: "When Mamata transfers ₹5,000 to Susmita, if the server crashes after debiting Mamata's ledger, MySQL rolls back the deduction so Mamata's balance remains intact.",
    explanation: "Real-world student ledger transfer scenario.",
    hint: "Protects Mamata's ₹5,000 from disappearing if a crash occurs mid-transfer.",
    level: "basic"
  },
  {
    question: "What statement explicitly begins a multi-statement transaction in MySQL?",
    shortAnswer: "`START TRANSACTION;` (or `BEGIN;` / `BEGIN WORK;`).",
    explanation: "Transaction initiation syntax.",
    hint: "START TRANSACTION or BEGIN.",
    level: "basic"
  },
  {
    question: "What statement permanently saves all modifications made within the current transaction to disk?",
    shortAnswer: "`COMMIT;`.",
    explanation: "Transaction commit statement.",
    hint: "COMMIT.",
    level: "basic"
  },
  {
    question: "What statement cancels and undoes all modifications made during the current transaction?",
    shortAnswer: "`ROLLBACK;`.",
    explanation: "Transaction rollback statement.",
    hint: "ROLLBACK.",
    level: "basic"
  },
  {
    question: "What happens if a database connection abruptly crashes or disconnects while a transaction is still uncommitted?",
    shortAnswer: "InnoDB detects the broken connection and automatically executes an internal `ROLLBACK`, restoring all modified tables to their pre-transaction state.",
    explanation: "Automatic rollback on connection failure.",
    hint: "InnoDB automatically rolls back uncommitted changes upon client disconnect.",
    level: "basic"
  },
  {
    question: "Which MySQL storage engine supports full ACID transactions and crash recovery?",
    shortAnswer: "InnoDB (the default storage engine in MySQL since version 5.5).",
    explanation: "Transactional storage engine in MySQL.",
    hint: "InnoDB.",
    level: "basic"
  },
  {
    question: "Does the legacy MyISAM storage engine support transactions?",
    shortAnswer: "NO; MyISAM does not support transactions, `COMMIT`, `ROLLBACK`, or row-level locking.",
    explanation: "Non-transactional legacy engine limitation.",
    hint: "No, MyISAM is a non-transactional storage engine.",
    level: "basic"
  },
  {
    question: "What is the default transactional mode in MySQL for standalone DML statements?",
    shortAnswer: "`autocommit = 1` (ON), where every single standalone `INSERT`, `UPDATE`, or `DELETE` statement is committed automatically as its own single-statement transaction.",
    explanation: "Autocommit default behavior in MySQL.",
    hint: "Autocommit mode is ON by default in MySQL.",
    level: "basic"
  },
  {
    question: "How does executing `START TRANSACTION;` interact with `autocommit = 1`?",
    shortAnswer: "`START TRANSACTION;` temporarily suspends autocommit mode for the duration of the transaction until an explicit `COMMIT` or `ROLLBACK` is executed.",
    explanation: "Autocommit suspension during explicit transactions.",
    hint: "Temporarily suspends autocommit until COMMIT or ROLLBACK.",
    level: "expert"
  },
  {
    question: "What is an implicit commit in MySQL?",
    shortAnswer: "When certain statements (such as DDL commands `ALTER TABLE`, `CREATE TABLE`, `DROP TABLE`, or `TRUNCATE`) automatically force an immediate `COMMIT` of any currently open transaction.",
    explanation: "Implicit commit triggers in MySQL.",
    hint: "DDL commands force an automatic immediate commit of open transactions.",
    level: "expert"
  },
  {
    question: "Can you execute `ROLLBACK` after running an `ALTER TABLE` statement inside a transaction?",
    shortAnswer: "NO; DDL statements execute an implicit `COMMIT` immediately before and after execution, making rollback impossible.",
    explanation: "Non-rollbackable DDL operations.",
    hint: "No, DDL statements cause an implicit COMMIT.",
    level: "basic"
  },
  {
    question: "Why should transactions be kept as short in duration as possible?",
    shortAnswer: "To minimize lock hold times, prevent blocking concurrent user queries, reduce deadlock probabilities, and allow InnoDB to purge old undo log pages.",
    explanation: "Transaction brevity best practices.",
    hint: "Reduces lock contention, prevents deadlocks, and frees undo logs.",
    level: "expert"
  },
  {
    question: "What happens if a stored procedure initiates a transaction and fails to issue either `COMMIT` or `ROLLBACK` before terminating?",
    shortAnswer: "The transaction remains open on that client session, holding active locks and blocking other connections until the session terminates or explicitly commits/rolls back.",
    explanation: "Dangling uncommitted transaction hazard.",
    hint: "Remains open on the session, holding locks and blocking other queries.",
    level: "expert"
  },
  {
    question: "What is the role of the InnoDB Redo Log (`ib_logfile0` / `ib_logfile1`) in transactions?",
    shortAnswer: "It provides Durability (Write-Ahead Logging / WAL) by recording raw physical page modifications before data pages are flushed to tablespace disk files.",
    explanation: "Redo log mechanics and durability.",
    hint: "Write-Ahead Logging that guarantees durability across power crashes.",
    level: "expert"
  },
  {
    question: "What is the role of the InnoDB Undo Log in transactions?",
    shortAnswer: "It stores the previous version of modified data rows, enabling `ROLLBACK` operations and providing Multi-Version Concurrency Control (MVCC) for consistent reads.",
    explanation: "Undo log mechanics for rollback and MVCC.",
    hint: "Enables ROLLBACK and provides snapshot reads for MVCC.",
    level: "expert"
  },
  {
    question: "How does a multi-item e-commerce order checkout illustrate a transaction?",
    shortAnswer: "1. Create Order record, 2. Decrement Inventory for 3 items, 3. Deduct Customer Wallet, 4. Insert Payment record; all 4 steps must succeed atomically or none occur.",
    explanation: "Multi-table business workflow atomicity.",
    hint: "Order, Inventory, Wallet, and Payment updates succeed or fail together.",
    level: "basic"
  },
  {
    question: "Can a transaction contain both `SELECT` and `UPDATE` statements?",
    shortAnswer: "YES; transactions typically read current state with `SELECT` (or `SELECT ... FOR UPDATE`) and execute corresponding `UPDATE`/`INSERT` mutations.",
    explanation: "Read-write transactions.",
    hint: "Yes, transactions combine queries and modifications.",
    level: "basic"
  },
  {
    question: "What is a Read-Only transaction?",
    shortAnswer: "A transaction initiated with `START TRANSACTION READ ONLY;`, which tells the engine that no data modifications will occur, enabling internal memory optimizations.",
    explanation: "Read-only transaction optimization.",
    hint: "START TRANSACTION READ ONLY enables engine read optimizations.",
    level: "moderate"
  },
  {
    question: "What happens if you attempt to execute an `UPDATE` inside a `START TRANSACTION READ ONLY` block?",
    shortAnswer: "MySQL throws Error `1792` (`ER_CANT_EXECUTE_IN_READ_ONLY_TRANSACTION`).",
    explanation: "Read-only transaction mutation restriction.",
    hint: "Throws Error 1792 (cannot execute DML in read-only transaction).",
    level: "expert"
  },
  {
    question: "How does transaction management in stored procedures interact with application-level transactions (e.g. Spring / Hibernate `@Transactional`)?",
    shortAnswer: "Application drivers manage transactions at the connection level; nested `START TRANSACTION` inside a stored procedure will cause an implicit commit of the outer connection transaction.",
    explanation: "Cross-tier transaction boundary conflicts.",
    hint: "Stored routine START TRANSACTION can trigger implicit commits of driver transactions.",
    level: "expert"
  },
  {
    question: "Can a transaction span across multiple tables in different databases on the same MySQL server instance?",
    shortAnswer: "YES; InnoDB transactions can span across multiple databases (schemas) on the same MySQL instance seamlessly.",
    explanation: "Cross-schema transactions.",
    hint: "Yes, transactions span across multiple databases on the same instance.",
    level: "basic"
  },
  {
    question: "Can a standard MySQL transaction span across multiple separate physical MySQL server instances?",
    shortAnswer: "Not with standard `START TRANSACTION`; distributed transactions across multiple servers require XA Transactions (Two-Phase Commit / 2PC).",
    explanation: "Distributed transactions and XA.",
    hint: "Requires XA Transactions (2PC) for multi-server coordination.",
    level: "expert"
  },
  {
    question: "What happens if a power failure occurs precisely during the execution of a `COMMIT` statement?",
    shortAnswer: "During reboot, InnoDB crash recovery inspects the redo log: if the commit record was flushed, changes are applied; otherwise, incomplete changes are rolled back.",
    explanation: "InnoDB crash recovery protocol.",
    hint: "Crash recovery rolls back if commit record was unflushed, or reapplies if flushed.",
    level: "expert"
  },
  {
    question: "Why should developers NEVER perform external HTTP API calls inside an open database transaction?",
    shortAnswer: "Because network latency or remote service timeouts will keep database row locks held for seconds, paralyzing the database connection pool.",
    explanation: "Network I/O in database transactions anti-pattern.",
    hint: "External API delays hold database row locks, causing system-wide blocking.",
    level: "expert"
  },
  {
    question: "How do you check if the current MySQL session is currently inside an active transaction?",
    shortAnswer: "Query `information_schema.innodb_trx` or check `@@in_transaction` in MySQL 8.0.",
    explanation: "Inspecting active transaction state.",
    hint: "Query information_schema.innodb_trx or @@in_transaction.",
    level: "basic"
  },
  {
    question: "What is the difference between `BEGIN;` and `START TRANSACTION;` in MySQL?",
    shortAnswer: "They are functionally identical, but `START TRANSACTION` allows optional modifiers such as `READ ONLY` or `WITH CONSISTENT SNAPSHOT`.",
    explanation: "START TRANSACTION vs BEGIN comparison.",
    hint: "Functionally identical, but START TRANSACTION supports options like READ ONLY.",
    level: "basic"
  },
  {
    question: "Can a user roll back a transaction after the `COMMIT` statement has successfully completed?",
    shortAnswer: "NO; once `COMMIT` completes, changes are permanent and durable; they cannot be rolled back (requires manual compensating transactions).",
    explanation: "Irreversibility of committed transactions.",
    hint: "No, committed transactions are permanent and durable.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Understanding Database Transactions?",
    shortAnswer: "Always enclose multi-step business mutations (transfers, checkouts, registrations) in explicit `START TRANSACTION ... COMMIT` blocks; pair with `DECLARE EXIT HANDLER FOR SQLEXCEPTION` to guarantee automatic `ROLLBACK`; keep transaction duration minimal; and never perform external network I/O while holding database locks.",
    explanation: "Authoritative architectural best practices for database transactions.",
    hint: "Explicit boundaries + automated rollback + minimal duration + zero external I/O.",
    level: "expert"
  }
];

export default questions;
