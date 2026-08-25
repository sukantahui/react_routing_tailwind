// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is the MySQL Slow Query Log?",
    shortAnswer: "The Slow Query Log is a built-in diagnostic logging facility in MySQL that records SQL statements whose execution duration exceeds `long_query_time` or that examine unindexed rows.",
    explanation: "It serves as the primary data source for database administrators to discover, analyze, and prioritize slow query optimizations.",
    hint: "Logs SQL statements exceeding long_query_time threshold or missing indexes.",
    level: "basic"
  },
  {
    question: "How do you dynamically enable the Slow Query Log without restarting the MySQL server?",
    shortAnswer: "Execute `SET GLOBAL slow_query_log = 'ON';` and configure `SET GLOBAL long_query_time = 0.5;`.",
    explanation: "Allows runtime activation during production incident investigations without downtime.",
    hint: "SET GLOBAL slow_query_log = 'ON';",
    level: "basic",
    codeExample: "SET GLOBAL slow_query_log = 'ON';\nSET GLOBAL long_query_time = 0.5;"
  },
  {
    question: "What is the unit and precision of `long_query_time` in modern MySQL?",
    shortAnswer: "It is specified in seconds with microsecond (sub-millisecond) precision (e.g. `0.1` for 100 ms, `0.05` for 50 ms, or `0` to log every query).",
    explanation: "Microsecond precision allows capturing fast OLTP queries that still exceed sub-millisecond budgets.",
    hint: "Seconds with microsecond floating-point precision (e.g. 0.1 = 100ms).",
    level: "basic"
  },
  {
    question: "What does `log_queries_not_using_indexes = 'ON'` do?",
    shortAnswer: "It forces MySQL to log any query that performs a Full Table Scan (`type = ALL`) or full index scan without key lookups, regardless of how fast it executes.",
    explanation: "Helps catch queries that currently run fast on small tables but will explode when the table grows.",
    hint: "Logs all full table scans even if execution time is under long_query_time.",
    level: "basic",
    codeExample: "SET GLOBAL log_queries_not_using_indexes = 'ON';"
  },
  {
    question: "Why should you configure `min_examined_row_limit` when enabling `log_queries_not_using_indexes`?",
    shortAnswer: "To prevent tiny lookup tables (e.g., 5-row status tables) from flooding the log with harmless table scans.",
    explanation: "Setting `min_examined_row_limit = 100` ignores scans on tables with fewer than 100 rows.",
    hint: "Filters out harmless table scans on tiny lookup tables.",
    level: "expert",
    codeExample: "SET GLOBAL min_examined_row_limit = 100;"
  },
  {
    question: "What is the `mysqldumpslow` utility?",
    shortAnswer: "A Perl command-line tool bundled with MySQL that parses the Slow Query Log, replaces numbers with `N` and strings with `'S'` to abstract query templates, and summarizes top heavy queries.",
    explanation: "Aggregates thousands of individual slow log lines into clean, prioritized query digests.",
    hint: "CLI tool that abstracts literals and aggregates slow log queries by impact.",
    level: "basic"
  },
  {
    question: "What does `mysqldumpslow -s t -t 10 /path/to/slow.log` command do?",
    shortAnswer: "It displays the top 10 slowest query templates sorted by **Total Execution Time** (`-s t`).",
    explanation: "Reveals the queries that consumed the absolute most cumulative CPU and disk time on the server.",
    hint: "Sorts by total cumulative execution time, showing top 10 query templates.",
    level: "basic",
    codeExample: "mysqldumpslow -s t -t 10 /var/log/mysql/mysql-slow.log"
  },
  {
    question: "What does `mysqldumpslow -s c -t 10` do and why is it critical?",
    shortAnswer: "It sorts queries by **Count / Execution Frequency** (`-s c`), identifying 'death by a thousand cuts' queries that run millions of times per hour.",
    explanation: "A query taking only 15ms that runs 50,000 times a minute degrades the database far more than a 2-second query running once a day.",
    hint: "Sorts by execution count to find high-frequency micro-bottlenecks.",
    level: "expert",
    codeExample: "mysqldumpslow -s c -t 10 /var/log/mysql/mysql-slow.log"
  },
  {
    question: "What does `mysqldumpslow -s ar` sort by?",
    shortAnswer: "It sorts by **Average Rows Examined** (`-s ar`), revealing the most inefficient queries that scan massive numbers of rows per execution.",
    explanation: "Identifies missing indexes where queries examine 500,000 rows to return only 10.",
    hint: "Sorts by average rows examined per execution.",
    level: "moderate"
  },
  {
    question: "What does `mysqldumpslow -s al` sort by?",
    shortAnswer: "It sorts by **Average Lock Time** (`-s al`), pinpointing queries that spent the most time waiting for table or row locks.",
    explanation: "Highlights transaction concurrency bottlenecks and lock contention.",
    hint: "Sorts by average lock wait time.",
    level: "moderate"
  },
  {
    question: "How do you filter `mysqldumpslow` output for a specific table name?",
    shortAnswer: "Use the `-g` (grep regex) flag: `mysqldumpslow -s t -g 'student_records' -t 5 /var/log/mysql/mysql-slow.log`.",
    explanation: "Filters the output to display only query templates containing the specified regex pattern.",
    hint: "Use -g 'pattern' to grep for specific table or column names.",
    level: "basic",
    codeExample: "mysqldumpslow -s t -g 'student_records' -t 5 /var/log/mysql/mysql-slow.log"
  },
  {
    question: "What is the significance of the `Rows_examined` vs `Rows_sent` ratio in a slow log entry?",
    shortAnswer: "A high ratio (e.g. `Rows_examined: 500000, Rows_sent: 1`) indicates extreme index inefficiency where the engine scanned half a million rows to return a single record.",
    explanation: "In an ideal indexed query, `Rows_examined` is roughly equal to `Rows_sent`.",
    hint: "High examined-to-sent ratio indicates missing or poorly selective indexes.",
    level: "basic"
  },
  {
    question: "What does `Lock_time` in a slow query log entry indicate?",
    shortAnswer: "The total duration in seconds the query spent waiting to acquire table or row metadata/data locks before execution began.",
    explanation: "High `Lock_time` with low `Query_time` points to transaction locking conflicts rather than slow SQL.",
    hint: "Time spent waiting to acquire locks before execution started.",
    level: "moderate"
  },
  {
    question: "What is the difference between `log_output = FILE` and `log_output = TABLE`?",
    shortAnswer: "`FILE` writes to the filesystem log file (parsed with `mysqldumpslow`); `TABLE` writes to the `mysql.slow_log` CSV/MyISAM table (queried directly via SQL).",
    explanation: "`FILE` is generally preferred in production because writing to CSV tables introduces higher database overhead.",
    hint: "FILE writes to OS disk log; TABLE writes to mysql.slow_log database table.",
    level: "expert",
    codeExample: "SET GLOBAL log_output = 'FILE';"
  },
  {
    question: "How do you safely rotate or truncate the MySQL Slow Query Log without restarting?",
    shortAnswer: "1) Rename the log file at the OS level (`mv mysql-slow.log mysql-slow.log.1`), 2) Run `FLUSH SLOW LOGS;` in MySQL to open a fresh log file.",
    explanation: "`FLUSH SLOW LOGS` instructs MySQL to release the old file descriptor and create a new log file.",
    hint: "Rename old file and execute FLUSH SLOW LOGS in MySQL.",
    level: "expert",
    codeExample: "FLUSH SLOW LOGS;"
  },
  {
    question: "What is `log_throttle_queries_not_using_indexes`?",
    shortAnswer: "A rate-limiting variable that caps the number of unindexed queries written to the slow log per minute (e.g. `60`), preventing slow log disk saturation.",
    explanation: "Prevents disk filling when an unindexed query runs thousands of times per second.",
    hint: "Limits how many unindexed queries can be written to the slow log per minute.",
    level: "expert",
    codeExample: "SET GLOBAL log_throttle_queries_not_using_indexes = 60;"
  },
  {
    question: "What is Percona `pt-query-digest` and how does it compare to `mysqldumpslow`?",
    shortAnswer: "`pt-query-digest` is an advanced open-source toolkit that provides percentile latency metrics (P95, P99), response-time histograms, and concurrency analysis beyond `mysqldumpslow`.",
    explanation: "Widely considered the industry-standard deep analysis tool for enterprise slow logs.",
    hint: "Advanced tool providing P95/P99 latency percentiles and statistical histograms.",
    level: "expert"
  },
  {
    question: "Why should `long_query_time` NOT be left at the historical default of `10.0` seconds in modern OLTP?",
    shortAnswer: "Because a 10-second threshold misses 99.9% of production bottlenecks. Modern web APIs require sub-50ms latencies; setting `long_query_time = 0.1` or `0.5` is standard.",
    explanation: "10 seconds was set decades ago for batch mainframes; modern web apps need fractional-second thresholds.",
    hint: "10 seconds is too high; modern OLTP requires 0.1s to 0.5s thresholds.",
    level: "basic"
  },
  {
    question: "What happens to prepared statements in the Slow Query Log?",
    shortAnswer: "When executed, the full expanded SQL statement with parameter values replaced is logged when execution duration exceeds `long_query_time`.",
    explanation: "Allows seeing the actual bound parameters that triggered the slow execution.",
    hint: "Logged with their actual bound parameter values.",
    level: "moderate"
  },
  {
    question: "How does setting `long_query_time = 0` help during load testing?",
    shortAnswer: "It logs **100% of all executed queries**, allowing complete query workload capture for profiling with `mysqldumpslow` or replaying with traffic simulators.",
    explanation: "Captures the complete database profile during controlled test runs.",
    hint: "Captures 100% of all queries for full workload capture and analysis.",
    level: "expert"
  },
  {
    question: "What is the security risk associated with the Slow Query Log?",
    shortAnswer: "Queries containing unencrypted passwords, API tokens, or PII (e.g. `INSERT INTO users (password) VALUES ('plain_pass')`) will be written in plain text to the log file.",
    explanation: "Restrict filesystem permissions on the log file (`chmod 600`) and ensure passwords are never passed in plain SQL text.",
    hint: "Plain text parameters may expose sensitive passwords or PII in log files.",
    level: "expert"
  },
  {
    question: "Can administrative commands (e.g. `ALTER TABLE`, `OPTIMIZE TABLE`) be logged in the slow log?",
    shortAnswer: "Yes! Controlled by the `log_slow_admin_statements = 'ON'` system variable.",
    explanation: "Helps track the duration of schema migrations and index builds.",
    hint: "Controlled by log_slow_admin_statements = 'ON'.",
    level: "moderate",
    codeExample: "SET GLOBAL log_slow_admin_statements = 'ON';"
  },
  {
    question: "What is `log_slow_extra = 'ON'` in MySQL 8.0?",
    shortAnswer: "An extended logging feature that writes additional performance metadata into the slow log, including thread ID, bytes sent, sort passes, and temp tables created.",
    explanation: "Provides richer diagnostic context without needing external profilers.",
    hint: "Writes extra metadata (sort passes, temp tables, bytes sent) to slow log entries.",
    level: "expert",
    codeExample: "SET GLOBAL log_slow_extra = 'ON';"
  },
  {
    question: "How do you distinguish between a hardware I/O bottleneck and a bad SQL query using the slow log?",
    shortAnswer: "If `Query_time` is high but `Rows_examined` is low and matches `Rows_sent`, the query was fast in logic but waited on disk I/O, lock contention, or CPU starvation.",
    explanation: "Helps isolate infrastructure resource exhaustion from query design flaws.",
    hint: "High query time with low rows examined indicates server/disk I/O wait rather than bad SQL.",
    level: "expert"
  },
  {
    question: "How do you automate slow query reporting in production Linux environments?",
    shortAnswer: "Schedule a daily cron job that runs `mysqldumpslow -s t -t 10` on yesterday's log file and emails the top 10 summary to the engineering team.",
    explanation: "Provides proactive visibility into emerging slow queries before they impact end users.",
    hint: "Automate daily cron jobs emailing top 10 mysqldumpslow summaries.",
    level: "basic"
  },
  {
    question: "What is the impact of keeping the Slow Query Log enabled permanently in production?",
    shortAnswer: "Negligible overhead (typically &lt; 1% CPU/disk impact) as long as `long_query_time` is set appropriately (e.g. 0.5s) and `log_throttle_queries_not_using_indexes` is active.",
    explanation: "The diagnostic value far outweighs the tiny logging cost.",
    hint: "Minimal overhead under proper threshold configuration.",
    level: "basic"
  },
  {
    question: "How do you query `mysql.slow_log` table using SQL?",
    shortAnswer: "`SELECT start_time, user_host, query_time, lock_time, rows_sent, rows_examined, sql_text FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;`",
    explanation: "Enables standard SQL filtering, grouping, and aggregations directly on slow query records.",
    hint: "Query mysql.slow_log table directly with SQL when log_output='TABLE'.",
    level: "basic",
    codeExample: "SELECT query_time, rows_examined, sql_text FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;"
  },
  {
    question: "Why does `mysqldumpslow` replace specific numbers with `N`?",
    shortAnswer: "To group parameterized queries (e.g. `WHERE id = 5` and `WHERE id = 200`) into a single canonical template: `WHERE id = N`.",
    explanation: "Enables calculating aggregate totals across all invocations of that query pattern.",
    hint: "Abstracts numbers into N to aggregate identical query templates together.",
    level: "basic"
  },
  {
    question: "How does `mysqldumpslow -s at` help prioritize query tuning?",
    shortAnswer: "It sorts by **Average Query Time** (`-s at`), identifying the single heaviest query executions on average (such as massive quarterly reporting scans).",
    explanation: "Highlights queries that consistently take multiple seconds per run.",
    hint: "Sorts by average query duration per execution.",
    level: "moderate"
  },
  {
    question: "What is the primary operational takeaway for database administrators regarding the Slow Query Log?",
    shortAnswer: "Never guess where database bottlenecks are. Always configure the Slow Query Log with microsecond thresholds, analyze it regularly with `mysqldumpslow`, and prioritize tuning queries with the highest total execution time and frequency.",
    explanation: "Data-driven query profiling eliminates guesswork and focuses engineering effort on high-impact optimizations.",
    hint: "Base performance tuning on slow log data rather than developer guesswork.",
    level: "basic"
  }
];

export default questions;
