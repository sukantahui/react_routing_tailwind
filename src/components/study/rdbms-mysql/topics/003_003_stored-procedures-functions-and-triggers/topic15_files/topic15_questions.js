// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What is the MySQL Event Scheduler?",
    shortAnswer: "A built-in background daemon thread within MySQL that executes scheduled database tasks (events) at specified one-time or recurring intervals.",
    explanation: "Core definition of the database event scheduler.",
    hint: "Built-in database cron service for executing scheduled SQL tasks.",
    level: "basic"
  },
  {
    question: "How do you enable the Event Scheduler dynamically in MySQL?",
    shortAnswer: "`SET GLOBAL event_scheduler = ON;` (or `SET GLOBAL event_scheduler = 1;`).",
    explanation: "Dynamic activation command for event scheduler.",
    hint: "SET GLOBAL event_scheduler = ON;",
    level: "basic"
  },
  {
    question: "How do you verify if the Event Scheduler is currently running on the server?",
    shortAnswer: "`SHOW VARIABLES LIKE 'event_scheduler';` (or check `SHOW PROCESSLIST` for the `event_scheduler` background daemon thread).",
    explanation: "Event scheduler status verification.",
    hint: "SHOW VARIABLES LIKE 'event_scheduler';",
    level: "basic"
  },
  {
    question: "What are the two primary scheduling types supported for MySQL Events?",
    shortAnswer: "1. One-Time Events (`AT timestamp`) and 2. Recurring Events (`EVERY interval [STARTS ...] [ENDS ...]`).",
    explanation: "The two canonical event scheduling modes.",
    hint: "One-time (AT) and Recurring (EVERY).",
    level: "basic"
  },
  {
    question: "How do student operations for Mamata, Susmita, Abhronila, and Debangshu illustrate scheduled database events?",
    shortAnswer: "A nightly recurring event (`EVERY 1 DAY AT 03:00`) purges expired student login session tokens and reconciles ledger balances across Barrackpore Academy database clusters.",
    explanation: "Real-world database job demonstration.",
    hint: "Nightly purge of expired tokens and automated ledger reconciliation.",
    level: "basic"
  },
  {
    question: "What does the `ON COMPLETION PRESERVE` clause do in an event definition?",
    shortAnswer: "It prevents MySQL from automatically dropping the event after it completes its execution, keeping the event definition in the data dictionary.",
    explanation: "Event preservation after final execution.",
    hint: "Keeps the event definition in the database after it finishes running.",
    level: "basic"
  },
  {
    question: "What happens to a one-time event if `ON COMPLETION NOT PRESERVE` (the default) is used?",
    shortAnswer: "MySQL automatically drops and deletes the event definition immediately after its single execution completes.",
    explanation: "Default one-time event cleanup behavior.",
    hint: "The event is automatically deleted after executing.",
    level: "basic"
  },
  {
    question: "How do you pause/disable an active scheduled event named `evt_nightly_purge` without deleting it?",
    shortAnswer: "`ALTER EVENT evt_nightly_purge DISABLE;`.",
    explanation: "Pausing a scheduled event.",
    hint: "ALTER EVENT evt_name DISABLE;",
    level: "basic"
  },
  {
    question: "How do you re-enable a disabled event named `evt_nightly_purge`?",
    shortAnswer: "`ALTER EVENT evt_nightly_purge ENABLE;`.",
    explanation: "Resuming a scheduled event.",
    hint: "ALTER EVENT evt_name ENABLE;",
    level: "basic"
  },
  {
    question: "How do you permanently drop a scheduled event named `evt_temp_clean` only if it exists?",
    shortAnswer: "`DROP EVENT IF EXISTS evt_temp_clean;`.",
    explanation: "Idempotent event deletion syntax.",
    hint: "DROP EVENT IF EXISTS evt_name;",
    level: "basic"
  },
  {
    question: "How do you list all scheduled events defined in the current database?",
    shortAnswer: "`SHOW EVENTS;` (or query `information_schema.EVENTS`).",
    explanation: "Event metadata inspection command.",
    hint: "SHOW EVENTS; or query information_schema.EVENTS.",
    level: "basic"
  },
  {
    question: "How do you view the full DDL creation statement of a scheduled event named `evt_clean_tokens`?",
    shortAnswer: "`SHOW CREATE EVENT evt_clean_tokens;`.",
    explanation: "Viewing event DDL source code.",
    hint: "SHOW CREATE EVENT evt_clean_tokens;",
    level: "basic"
  },
  {
    question: "What privilege is required to create, alter, or drop scheduled events in MySQL?",
    shortAnswer: "The `EVENT` privilege on that database (`GRANT EVENT ON db_name.* TO 'admin'@'%';`).",
    explanation: "Event administrative privilege.",
    hint: "The EVENT privilege.",
    level: "basic"
  },
  {
    question: "Can a scheduled event invoke a Stored Procedure using `CALL`?",
    shortAnswer: "YES; `DO CALL sp_nightly_maintenance_reconcile();` is the standard enterprise design pattern for scheduled database jobs.",
    explanation: "Invoking procedures from scheduled events.",
    hint: "Yes, use DO CALL sp_name(); inside the event body.",
    level: "basic"
  },
  {
    question: "How do you configure the Event Scheduler to start automatically on server reboot in `my.cnf`?",
    shortAnswer: "Add `event_scheduler=ON` under the `[mysqld]` section in the `my.cnf` configuration file.",
    explanation: "Persistent configuration in MySQL config.",
    hint: "Set event_scheduler=ON under [mysqld] in my.cnf.",
    level: "basic"
  },
  {
    question: "Can an event contain multiple SQL statements inside a `BEGIN ... END` block?",
    shortAnswer: "YES; using `DELIMITER //` to wrap the `BEGIN ... END` block allows multiple SQL queries within a single event.",
    explanation: "Multi-statement event definitions.",
    hint: "Yes, wrap multi-statement blocks with DELIMITER //.",
    level: "basic"
  },
  {
    question: "What happens if an event is scheduled to run while the MySQL server is shut down?",
    shortAnswer: "The missed executions do NOT queue up; once the server restarts with the event scheduler ON, recurring events resume at their next scheduled interval.",
    explanation: "Server downtime event behavior.",
    hint: "Missed runs do not queue up; resumes at the next interval after restart.",
    level: "expert"
  },
  {
    question: "How do you schedule an event to run every 10 minutes starting immediately?",
    shortAnswer: "`CREATE EVENT evt_sync_cache ON SCHEDULE EVERY 10 MINUTE STARTS CURRENT_TIMESTAMP DO CALL sp_sync_cache();`.",
    explanation: "Minute-interval event schedule.",
    hint: "ON SCHEDULE EVERY 10 MINUTE STARTS CURRENT_TIMESTAMP.",
    level: "basic"
  },
  {
    question: "How do you schedule an event to run once a week for 6 months and then stop?",
    shortAnswer: "`CREATE EVENT evt_term_report ON SCHEDULE EVERY 1 WEEK STARTS NOW() ENDS NOW() + INTERVAL 6 MONTH ON COMPLETION PRESERVE DO ...`.",
    explanation: "Bounded recurring event schedule with STARTS and ENDS.",
    hint: "Use STARTS NOW() ENDS NOW() + INTERVAL 6 MONTH.",
    level: "moderate"
  },
  {
    question: "What security context does an Event run under?",
    shortAnswer: "By default, the event runs under the privileges of its `DEFINER` user account (`DEFINER = 'user'@'host'`).",
    explanation: "Definer execution model in scheduled events.",
    hint: "Runs with the privileges of its DEFINER account.",
    level: "moderate"
  },
  {
    question: "What error log records failures or errors raised during scheduled event execution?",
    shortAnswer: "The MySQL Server Error Log (`mysqld.err` / `hostname.err`).",
    explanation: "Event execution error logging.",
    hint: "Logged to the MySQL server error log.",
    level: "expert"
  },
  {
    question: "Why should long-running heavy analytical jobs scheduled via events be wrapped in transaction batches?",
    shortAnswer: "To prevent holding massive table locks for prolonged periods, which would block real-time OLTP web transactions.",
    explanation: "Batching maintenance transactions.",
    hint: "Wrap in chunked transaction batches to prevent long lock contention.",
    level: "expert"
  },
  {
    question: "How do you check when an event last ran and when it is scheduled to run next?",
    shortAnswer: "`SELECT EVENT_NAME, LAST_EXECUTED, STARTS, STATUS FROM information_schema.EVENTS WHERE EVENT_NAME = 'evt_name';`.",
    explanation: "Inspecting event execution timestamps.",
    hint: "Query LAST_EXECUTED and STARTS in information_schema.EVENTS.",
    level: "moderate"
  },
  {
    question: "Can an event alter another event using `ALTER EVENT`?",
    shortAnswer: "YES; an event can dynamically enable, disable, or modify other events if its definer has the `EVENT` privilege.",
    explanation: "Dynamic event management.",
    hint: "Yes, provided the definer has the EVENT privilege.",
    level: "expert"
  },
  {
    question: "What is the difference between an OS-level cron job (Linux crontab) and the MySQL Event Scheduler?",
    shortAnswer: "An OS cron spawns an external process that connects over the network to MySQL; the Event Scheduler runs internally in-memory within the database server daemon, with zero network connection latency.",
    explanation: "Internal database scheduler vs external OS cron.",
    hint: "Runs internally inside MySQL with zero network connection overhead.",
    level: "expert"
  },
  {
    question: "How do you schedule an event to run on the 1st of every month at midnight?",
    shortAnswer: "`CREATE EVENT evt_monthly_billing ON SCHEDULE EVERY 1 MONTH STARTS '2026-09-01 00:00:00' DO CALL sp_generate_monthly_invoices();`.",
    explanation: "Monthly schedule pattern.",
    hint: "EVERY 1 MONTH STARTS '2026-09-01 00:00:00'.",
    level: "basic"
  },
  {
    question: "What happens if an event's definer user account is deleted from MySQL?",
    shortAnswer: "Event executions fail, and the failure is logged to the MySQL server error log with 'Definer does not exist'.",
    explanation: "Orphaned definer in scheduled events.",
    hint: "Event fails to execute and logs an error in the server error log.",
    level: "expert"
  },
  {
    question: "Can an event be placed in a `DISABLE ON SLAVE` state in MySQL Replication?",
    shortAnswer: "YES; MySQL automatically sets replicated events to `DISABLE ON SLAVE` on replica nodes to prevent duplicate scheduled job executions across the cluster.",
    explanation: "Replication safety for scheduled events.",
    hint: "Yes, automatically disabled on read replicas to prevent duplicate executions.",
    level: "expert"
  },
  {
    question: "How do you rename an existing event using `ALTER EVENT`?",
    shortAnswer: "`ALTER EVENT old_evt_name RENAME TO new_evt_name;`.",
    explanation: "Renaming scheduled events.",
    hint: "ALTER EVENT old_name RENAME TO new_name;",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for the MySQL Event Scheduler?",
    shortAnswer: "Enable `event_scheduler = ON` in `my.cnf`; structure events to call stored procedures (`DO CALL sp_job()`) for clean versioning; use `ON COMPLETION PRESERVE` to retain event definitions; schedule non-blocking maintenance batches during off-peak hours; and verify `DISABLE ON SLAVE` state on replication clusters.",
    explanation: "Authoritative architectural best practices for database scheduled jobs.",
    hint: "Persistent config + encapsulate logic in procedures + off-peak batching + replication safety.",
    level: "expert"
  }
];

export default questions;
