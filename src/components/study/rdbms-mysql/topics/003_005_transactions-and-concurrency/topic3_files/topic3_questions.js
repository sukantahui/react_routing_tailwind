// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is `autocommit` mode in MySQL?",
    shortAnswer: "A server setting where every standalone DML statement (`INSERT`, `UPDATE`, `DELETE`) is automatically committed to disk as an independent single-statement transaction.",
    explanation: "Core definition of autocommit mode.",
    hint: "Automatically commits each individual statement immediately.",
    level: "basic"
  },
  {
    question: "What is the default value of `autocommit` in MySQL 8.0?",
    shortAnswer: "`autocommit = 1` (ON / Enabled).",
    explanation: "Default autocommit setting in MySQL.",
    hint: "1 (ON).",
    level: "basic"
  },
  {
    question: "How do you check the current session's `autocommit` setting using SQL?",
    shortAnswer: "`SELECT @@autocommit;` (or `SHOW VARIABLES LIKE 'autocommit';`).",
    explanation: "Querying autocommit status.",
    hint: "SELECT @@autocommit;",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate autocommit behavior?",
    shortAnswer: "With autocommit ON, inserting Mamata commits immediately (1 disk fsync); inserting all 4 students in 4 separate statements executes 4 separate disk fsyncs.",
    explanation: "Autocommit per-statement disk writes.",
    hint: "Each student insert executes as its own immediate transaction with a disk write.",
    level: "basic"
  },
  {
    question: "How do you disable `autocommit` for the current session?",
    shortAnswer: "`SET autocommit = 0;` (or `SET autocommit = OFF;`).",
    explanation: "Disabling autocommit at session level.",
    hint: "SET autocommit = 0;",
    level: "basic"
  },
  {
    question: "How do you re-enable `autocommit` for the current session?",
    shortAnswer: "`SET autocommit = 1;` (or `SET autocommit = ON;`).",
    explanation: "Re-enabling autocommit at session level.",
    hint: "SET autocommit = 1;",
    level: "basic"
  },
  {
    question: "What happens when `autocommit = 0` and you execute an `INSERT` statement without calling `COMMIT;`?",
    shortAnswer: "The row is inserted into the active transaction's undo/redo logs and held in memory, but remains uncommitted and invisible to other sessions until `COMMIT;` is executed.",
    explanation: "Uncommitted state under autocommit = 0.",
    hint: "Remains staged and uncommitted until explicit COMMIT.",
    level: "basic"
  },
  {
    question: "What happens if a client disconnects when `autocommit = 0` and has pending uncommitted statements?",
    shortAnswer: "InnoDB automatically rolls back all uncommitted statements upon session disconnection, discarding all changes.",
    explanation: "Automatic rollback on disconnect with autocommit = 0.",
    hint: "All uncommitted changes are rolled back automatically on disconnect.",
    level: "basic"
  },
  {
    question: "Why is executing 1,000 single-statement `INSERT`s with `autocommit = 1` significantly slower than wrapping them in `START TRANSACTION ... COMMIT`?",
    shortAnswer: "Because each individual insert with `autocommit = 1` forces a synchronous physical disk write (fsync), resulting in 1,000 fsyncs instead of 1 single fsync.",
    explanation: "Disk fsync overhead of autocommit.",
    hint: "1,000 separate disk fsyncs vs 1 single batch fsync.",
    level: "expert"
  },
  {
    question: "What is the recommended enterprise architectural practice regarding `autocommit`?",
    shortAnswer: "Leave `autocommit = 1` globally for standard single-row reads and simple writes, and use explicit `START TRANSACTION ... COMMIT` blocks whenever multi-statement atomicity or bulk speed is needed.",
    explanation: "Industry best practice on autocommit.",
    hint: "Keep autocommit=1 globally, use explicit START TRANSACTION for multi-statement workflows.",
    level: "expert"
  },
  {
    question: "What is the danger of setting `autocommit = 0` globally across an entire production database?",
    shortAnswer: "Idle client connections (e.g. from connection pools or interactive tools) leave transactions open indefinitely, holding locks, blocking undo log purges, and causing tablespace bloat.",
    explanation: "Global autocommit = 0 hazard.",
    hint: "Idle connections leave transactions open, holding locks and causing undo log bloat.",
    level: "expert"
  },
  {
    question: "How does executing `START TRANSACTION;` affect a session where `autocommit = 1`?",
    shortAnswer: "It temporarily disables autocommit for that transaction until an explicit `COMMIT;` or `ROLLBACK;` is executed, after which autocommit mode returns to `1` automatically.",
    explanation: "Temporary autocommit suspension via START TRANSACTION.",
    hint: "Temporarily suspends autocommit until COMMIT or ROLLBACK.",
    level: "basic"
  },
  {
    question: "Does executing `SET autocommit = 0;` implicitly commit any currently active transaction?",
    shortAnswer: "YES; changing the `autocommit` variable executes an implicit `COMMIT` of any currently pending transaction.",
    explanation: "Implicit commit when changing autocommit setting.",
    hint: "Yes, toggling autocommit executes an implicit COMMIT.",
    level: "expert"
  },
  {
    question: "How do application connection pool libraries (e.g. HikariCP / Spring) manage `autocommit`?",
    shortAnswer: "They typically keep `autocommit = true` on pooled connections and explicitly invoke `connection.setAutoCommit(false)` at the start of a `@Transactional` block, restoring it to `true` upon release.",
    explanation: "Application connection pool autocommit management.",
    hint: "Toggle setAutoCommit(false) per transactional method and restore to true on completion.",
    level: "expert"
  },
  {
    question: "Can an `ALTER TABLE` statement be rolled back if `autocommit = 0`?",
    shortAnswer: "NO; DDL statements cause an automatic implicit `COMMIT` before and after execution, regardless of whether `autocommit` is 0 or 1.",
    explanation: "DDL implicit commit regardless of autocommit.",
    hint: "No, DDL statements always cause an implicit COMMIT.",
    level: "basic"
  },
  {
    question: "What happens if a developer forgets to issue `COMMIT;` after running updates in MySQL Workbench when `autocommit` is disabled in the UI?",
    shortAnswer: "The changes remain visible ONLY to that developer's tab; other users cannot see them, and rows remain locked until the tab is closed (which rolls them back!).",
    explanation: "Developer UI uncommitted transaction trap.",
    hint: "Changes are private to that tab, rows stay locked, and closing the tab rolls them back.",
    level: "basic"
  },
  {
    question: "How do you check if `autocommit` is enabled globally across all new incoming connections?",
    shortAnswer: "`SELECT @@GLOBAL.autocommit;`.",
    explanation: "Querying global autocommit setting.",
    hint: "SELECT @@GLOBAL.autocommit;",
    level: "basic"
  },
  {
    question: "How do you set `autocommit` globally in MySQL?",
    shortAnswer: "`SET GLOBAL autocommit = 1;` (requires `SYSTEM_VARIABLES_ADMIN` or `SUPER` privilege).",
    explanation: "Setting global autocommit.",
    hint: "SET GLOBAL autocommit = 1;",
    level: "basic"
  },
  {
    question: "What parameter in `my.cnf` / `my.ini` configures `autocommit` at server startup?",
    shortAnswer: "`autocommit = 1` under the `[mysqld]` section.",
    explanation: "Configuring autocommit in configuration files.",
    hint: "autocommit = 1 in my.cnf under [mysqld].",
    level: "moderate"
  },
  {
    question: "Does `autocommit` apply to `SELECT` queries?",
    shortAnswer: "Yes; with `autocommit = 1`, each standalone `SELECT` opens a brief read view and closes it immediately upon query completion.",
    explanation: "Autocommit on SELECT statements.",
    hint: "Yes, creates and closes a read view immediately for the query.",
    level: "moderate"
  },
  {
    question: "What is the speedup ratio of batching 10,000 inserts in one transaction vs 10,000 autocommitted inserts on SSD drives?",
    shortAnswer: "Typically 100x to 300x faster (e.g. 15 seconds reduced to 0.05 seconds).",
    explanation: "Empirical performance boost of transaction batching.",
    hint: "100x to 300x faster execution.",
    level: "basic"
  },
  {
    question: "How do you safely execute a bulk data load script in MySQL CLI?",
    shortAnswer: "Start with `SET autocommit = 0;`, execute the batch inserts, run `COMMIT;`, and restore `SET autocommit = 1;`.",
    explanation: "Bulk data load best practice.",
    hint: "Disable autocommit, load data, COMMIT, and re-enable autocommit.",
    level: "basic"
  },
  {
    question: "Does `ROLLBACK` work when `autocommit = 1` on standalone statements?",
    shortAnswer: "NO; by the time the standalone statement finishes, it has already been committed automatically, so there is nothing left to roll back.",
    explanation: "Irreversibility of autocommitted statements.",
    hint: "No, standalone statements are committed immediately upon execution.",
    level: "basic"
  },
  {
    question: "What happens if a stored procedure is called when `autocommit = 1`?",
    shortAnswer: "Each individual statement inside the stored procedure executes with autocommit unless the procedure explicitly issues `START TRANSACTION;`.",
    explanation: "Autocommit inheritance in stored procedures.",
    hint: "Statements inside procedures autocommit unless START TRANSACTION is issued.",
    level: "expert"
  },
  {
    question: "Can you check whether a specific transaction was committed automatically vs explicitly in the general query log?",
    shortAnswer: "Yes; explicit transactions show `START TRANSACTION` and `COMMIT` commands, whereas autocommitted statements appear as standalone DML queries.",
    explanation: "Query log inspection of transaction boundaries.",
    hint: "Explicit transactions log START TRANSACTION and COMMIT commands.",
    level: "moderate"
  },
  {
    question: "Why do Python DB-API drivers (like `mysql-connector-python` or `psycopg2`) disable autocommit by default?",
    shortAnswer: "Because Python PEP-249 specifies that connections must start transactions implicitly, requiring developers to call `connection.commit()` explicitly.",
    explanation: "PEP-249 DB-API autocommit convention.",
    hint: "Python PEP-249 requires explicit connection.commit() by default.",
    level: "expert"
  },
  {
    question: "Why do Node.js drivers (like `mysql2`) enable autocommit by default?",
    shortAnswer: "Because JavaScript drivers follow MySQL server defaults (`autocommit = 1`), requiring explicit `await connection.beginTransaction()` for transactions.",
    explanation: "Node.js mysql2 autocommit defaults.",
    hint: "Follows MySQL server default (autocommit = true).",
    level: "expert"
  },
  {
    question: "How do you prevent a background migration script from leaving uncommitted transactions when `autocommit = 0`?",
    shortAnswer: "Use `try ... finally` or procedural error handlers that guarantee `COMMIT` on success and `ROLLBACK` on any error.",
    explanation: "Defensive transaction handling in scripts.",
    hint: "Wrap in try-finally blocks that guarantee COMMIT or ROLLBACK.",
    level: "basic"
  },
  {
    question: "Does `CREATE TEMPORARY TABLE` force an implicit commit when `autocommit = 0`?",
    shortAnswer: "NO; `CREATE TEMPORARY TABLE` is a special exception in MySQL that does NOT cause an implicit commit of an active transaction.",
    explanation: "Temporary table implicit commit exception.",
    hint: "No, temporary tables do not trigger implicit commits.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Autocommit Mode?",
    shortAnswer: "Keep `autocommit = 1` enabled globally as the safe standard; open explicit `START TRANSACTION ... COMMIT` blocks whenever executing multi-statement operations or bulk batch inserts; and never permanently set `autocommit = 0` globally to prevent idle connection lock leaks and undo tablespace bloat.",
    explanation: "Authoritative architectural best practices for autocommit management.",
    hint: "Global autocommit=1 + explicit START TRANSACTION for multi-statement batches.",
    level: "expert"
  }
];

export default questions;
