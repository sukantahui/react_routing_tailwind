// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What are the three scopes for setting the transaction isolation level in MySQL?",
    shortAnswer: "1. `GLOBAL`, 2. `SESSION`, and 3. `NEXT-TRANSACTION` (omitting the scope keyword).",
    explanation: "The three configuration scopes for isolation levels.",
    hint: "GLOBAL, SESSION, and NEXT-TRANSACTION.",
    level: "basic"
  },
  {
    question: "What statement changes the isolation level for ONLY the single next transaction in the current session?",
    shortAnswer: "`SET TRANSACTION ISOLATION LEVEL <level>;` (without `SESSION` or `GLOBAL`).",
    explanation: "Single next-transaction isolation syntax.",
    hint: "SET TRANSACTION ISOLATION LEVEL ... (omitting GLOBAL and SESSION).",
    level: "basic"
  },
  {
    question: "What statement changes the isolation level for ALL subsequent transactions in the current connection?",
    shortAnswer: "`SET SESSION TRANSACTION ISOLATION LEVEL <level>;`.",
    explanation: "Session-level isolation syntax.",
    hint: "SET SESSION TRANSACTION ISOLATION LEVEL ...;",
    level: "basic"
  },
  {
    question: "How do student audit sessions for Mamata and Susmita illustrate next-transaction scoping?",
    shortAnswer: "Set `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;` for Mamata's audit; once Mamata's transaction commits, the session automatically reverts back to `REPEATABLE READ` for Susmita's query.",
    explanation: "Next-transaction auto-reversion demonstration.",
    hint: "Applies to Mamata's audit only and automatically reverts for Susmita's query.",
    level: "basic"
  },
  {
    question: "What statement sets the default isolation level globally for all NEW incoming connections?",
    shortAnswer: "`SET GLOBAL TRANSACTION ISOLATION LEVEL <level>;`.",
    explanation: "Global isolation level syntax.",
    hint: "SET GLOBAL TRANSACTION ISOLATION LEVEL ...;",
    level: "basic"
  },
  {
    question: "How do you query the current session's active transaction isolation level in MySQL 8.0?",
    shortAnswer: "`SELECT @@transaction_isolation;` (or `SELECT @@SESSION.transaction_isolation;`).",
    explanation: "Querying session isolation level.",
    hint: "SELECT @@transaction_isolation;",
    level: "basic"
  },
  {
    question: "How do you query the global server default isolation level in MySQL 8.0?",
    shortAnswer: "`SELECT @@GLOBAL.transaction_isolation;`.",
    explanation: "Querying global isolation level.",
    hint: "SELECT @@GLOBAL.transaction_isolation;",
    level: "basic"
  },
  {
    question: "What was the deprecated variable name used in MySQL 5.7 to check isolation levels?",
    shortAnswer: "`@@tx_isolation` (replaced by `@@transaction_isolation` in MySQL 8.0).",
    explanation: "Deprecated MySQL 5.7 variable name.",
    hint: "@@tx_isolation (replaced by @@transaction_isolation).",
    level: "moderate"
  },
  {
    question: "What parameter in `my.cnf` / `my.ini` configures the server-wide default isolation level at boot?",
    shortAnswer: "`transaction-isolation = READ-COMMITTED` under the `[mysqld]` section.",
    explanation: "my.cnf isolation configuration.",
    hint: "transaction-isolation = READ-COMMITTED under [mysqld].",
    level: "moderate"
  },
  {
    question: "What happens if you execute `SET TRANSACTION ISOLATION LEVEL` while a transaction is ACTIVELY in progress?",
    shortAnswer: "MySQL throws Error `1568` (`Transaction characteristics can't be changed while a transaction is in progress`).",
    explanation: "Error 1568 mid-transaction characteristic mutation.",
    hint: "Throws Error 1568 (cannot change characteristics mid-transaction).",
    level: "expert"
  },
  {
    question: "Does executing `SET GLOBAL TRANSACTION ISOLATION LEVEL` change the isolation level of ALREADY CONNECTED sessions?",
    shortAnswer: "NO; `SET GLOBAL` only affects new client connections created after the command executes.",
    explanation: "Global variable scope limitation on existing connections.",
    hint: "No, only affects newly created future connections.",
    level: "expert"
  },
  {
    question: "What administrative privilege is required to execute `SET GLOBAL TRANSACTION ISOLATION LEVEL`?",
    shortAnswer: "`SYSTEM_VARIABLES_ADMIN` or `SUPER` privilege.",
    explanation: "Privilege requirement for global variable modification.",
    hint: "SYSTEM_VARIABLES_ADMIN or SUPER.",
    level: "basic"
  },
  {
    question: "How do Java Spring Boot / JDBC applications set the isolation level programmatically?",
    shortAnswer: "Via `@Transactional(isolation = Isolation.READ_COMMITTED)` or `connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED)`.",
    explanation: "JDBC and Spring isolation configuration.",
    hint: "Via @Transactional(isolation = ...) or connection.setTransactionIsolation().",
    level: "expert"
  },
  {
    question: "How do Node.js `mysql2` applications set transaction isolation?",
    shortAnswer: "By executing `await connection.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED')` before `await connection.beginTransaction()`.",
    explanation: "Node.js mysql2 isolation syntax.",
    hint: "Execute SET TRANSACTION ISOLATION LEVEL ... prior to beginTransaction().",
    level: "expert"
  },
  {
    question: "How do Python SQLAlchemy applications set isolation levels on the engine?",
    shortAnswer: "`create_engine('mysql+pymysql://...', isolation_level='READ COMMITTED')` or `engine.execution_options(isolation_level='SERIALIZABLE')`.",
    explanation: "SQLAlchemy isolation engine configuration.",
    hint: "Set isolation_level in create_engine or execution_options.",
    level: "expert"
  },
  {
    question: "Can an application configure different isolation levels for read-only vs read-write connection pools?",
    shortAnswer: "YES; high-throughput architectures often configure the write pool to `READ COMMITTED` and the analytical reporting pool to `REPEATABLE READ`.",
    explanation: "Dual-pool isolation architecture.",
    hint: "Yes, tune isolation per connection pool purpose.",
    level: "expert"
  },
  {
    question: "What is the return type of `SELECT @@transaction_isolation;`?",
    shortAnswer: "A string: `'READ-UNCOMMITTED'`, `'READ-COMMITTED'`, `'REPEATABLE-READ'`, or `'SERIALIZABLE'` (with hyphens).",
    explanation: "String formatting of transaction_isolation output.",
    hint: "Hyphenated string name of the isolation level.",
    level: "basic"
  },
  {
    question: "Can you assign the isolation level directly using variable assignment syntax (`SET @@transaction_isolation = 'READ-COMMITTED'`)?",
    shortAnswer: "YES; `SET @@session.transaction_isolation = 'READ-COMMITTED';` is valid syntax in MySQL 8.0.",
    explanation: "Variable assignment syntax for isolation levels.",
    hint: "Yes, SET @@session.transaction_isolation = '...';",
    level: "moderate"
  },
  {
    question: "What happens if you omit the scope keyword when setting the transaction access mode (`SET TRANSACTION READ ONLY;`)?",
    shortAnswer: "It applies strictly to the single next transaction in that session, just like isolation levels.",
    explanation: "Next-transaction scoping for access modes.",
    hint: "Applies strictly to the single next transaction.",
    level: "basic"
  },
  {
    question: "What happens if you execute `START TRANSACTION` before `SET TRANSACTION ISOLATION LEVEL`?",
    shortAnswer: "Because `START TRANSACTION` opens the transaction first, executing `SET TRANSACTION` afterward will fail with Error 1568!",
    explanation: "Command ordering requirement for next-transaction isolation.",
    hint: "Must execute SET TRANSACTION BEFORE START TRANSACTION.",
    level: "expert"
  },
  {
    question: "Can you verify the isolation level of ANOTHER connected session in MySQL?",
    shortAnswer: "Yes; inspect `performance_schema.threads` joined with session variable tables, or check `information_schema.innodb_trx`.",
    explanation: "Cross-session isolation inspection.",
    hint: "Inspect performance_schema or information_schema.innodb_trx.",
    level: "expert"
  },
  {
    question: "What binary logging mode must be set when changing `transaction_isolation` to `READ COMMITTED` in MySQL 8.0?",
    shortAnswer: "`binlog_format = ROW`.",
    explanation: "Row-based replication requirement.",
    hint: "binlog_format = ROW.",
    level: "basic"
  },
  {
    question: "What command displays all global and session isolation variables simultaneously?",
    shortAnswer: "`SHOW VARIABLES LIKE '%isolation%';`.",
    explanation: "SHOW VARIABLES isolation wildcard search.",
    hint: "SHOW VARIABLES LIKE '%isolation%';",
    level: "basic"
  },
  {
    question: "Does `SET PERSIST` work for `transaction_isolation` in MySQL 8.0?",
    shortAnswer: "YES; `SET PERSIST transaction_isolation = 'READ-COMMITTED';` updates the running server and writes to `mysqld-auto.cnf` across restarts.",
    explanation: "Dynamic persistence of system variables in MySQL 8.0.",
    hint: "Yes, SET PERSIST writes to mysqld-auto.cnf across server restarts.",
    level: "expert"
  },
  {
    question: "Can an `AFTER INSERT` trigger change the transaction isolation level?",
    shortAnswer: "NO; triggers execute within the context of the calling statement's transaction and cannot alter transaction characteristics.",
    explanation: "Trigger restrictions on transaction characteristics.",
    hint: "No, triggers cannot execute TCL or alter isolation levels.",
    level: "basic"
  },
  {
    question: "How does changing isolation levels impact existing locks held by other sessions?",
    shortAnswer: "It has zero impact on other sessions' existing locks; it only governs how the current session acquires locks and generates read views for subsequent queries.",
    explanation: "Isolation change isolation from other sessions.",
    hint: "Zero impact on existing locks; only affects future queries in the target scope.",
    level: "basic"
  },
  {
    question: "What happens if a stored procedure issues `SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;` inside its body before `START TRANSACTION;`?",
    shortAnswer: "It succeeds and sets the isolation level for the upcoming `START TRANSACTION` block inside the procedure.",
    explanation: "Procedural setting of transaction isolation.",
    hint: "Succeeds if executed before START TRANSACTION.",
    level: "moderate"
  },
  {
    question: "Is `SET TRANSACTION ISOLATION LEVEL` permitted inside a stored function?",
    shortAnswer: "NO; stored functions are prohibited from modifying transaction characteristics or executing explicit transaction control commands.",
    explanation: "Stored function transaction control restriction.",
    hint: "No, prohibited inside stored functions.",
    level: "basic"
  },
  {
    question: "What is the difference between `transaction_isolation` and `transaction_read_only`?",
    shortAnswer: "`transaction_isolation` controls concurrency anomaly protection levels; `transaction_read_only` controls whether DML mutations are permitted.",
    explanation: "Isolation vs Read-Only characteristic distinction.",
    hint: "Isolation controls concurrency levels; read-only controls DML permission.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Setting and Verifying Isolation Levels?",
    shortAnswer: "Configure the server default globally via `transaction-isolation = READ-COMMITTED` in `my.cnf` with `binlog_format = ROW` for scalable OLTP systems; use session scoping in connection pools for workload-specific tuning; and use single next-transaction scoping (`SET TRANSACTION ISOLATION LEVEL ...`) executed strictly *before* `START TRANSACTION` for point-in-time financial audit jobs.",
    explanation: "Authoritative architectural best practices for setting and verifying isolation levels.",
    hint: "my.cnf global default + session pool tuning + next-transaction scope before START TRANSACTION for audits.",
    level: "expert"
  }
];

export default questions;
