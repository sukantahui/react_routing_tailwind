// topic5_files/topic5_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 5: Analyzing Slow Queries using the mysqldumpslow Utility

const questions = [
  {
    question: "What is the primary function of the `mysqldumpslow` command-line utility?",
    shortAnswer: "To parse raw MySQL slow query log files, abstract concrete literal numbers (`N`) and quoted strings (`'S'`) into normalized query digests, and aggregate thousands of queries into statistical summaries sorted by execution time, lock wait, or call frequency.",
    explanation: "Transforming raw unindexed log lines into aggregated query templates allows DBAs to quickly identify which query patterns consume the most cumulative server resources.",
    hint: "Parses, normalizes, abstracts literals to N/'S', and aggregates slow query logs.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -t 10 /var/log/mysql/slow_query.log`
  },
  {
    question: "How does `mysqldumpslow` normalize queries with different literal parameter values?",
    shortAnswer: "It replaces all integer/floating-point values with `N` and all quoted string literals with `'S'`, grouping hundreds of identical query templates with different IDs or names into a single digest entry.",
    explanation: "For example, `WHERE id = 101` and `WHERE id = 502` are both grouped under `WHERE id = N`.",
    hint: "Replaces numbers with N and quoted strings with 'S'.",
    level: "basic",
    codeExample: `# Raw Queries:
SELECT * FROM orders WHERE customer_id = 45 AND status = 'PAID';
SELECT * FROM orders WHERE customer_id = 92 AND status = 'PENDING';

# Abstracted Digest in mysqldumpslow:
SELECT * FROM orders WHERE customer_id = N AND status = 'S';`
  },
  {
    question: "What does the `-s t` sort option signify in `mysqldumpslow`, and why is it recommended as the primary triage metric?",
    shortAnswer: "It sorts query digests by TOTAL cumulative execution time across the entire log file, highlighting queries that consume the greatest aggregate CPU and I/O time on the database server.",
    explanation: "A query that runs in 0.5s but executes 50,000 times (totaling 25,000 seconds of CPU time) harms server capacity far more than a 10s query that runs once.",
    hint: "Sorts by total cumulative time; highlights queries causing the highest overall server load.",
    level: "intermediate",
    codeExample: `mysqldumpslow -s t -t 5 /var/log/mysql/slow_query.log`
  },
  {
    question: "What is the difference between `-s t` and `-s at` in `mysqldumpslow`?",
    shortAnswer: "`-s t` sorts by Total Cumulative Time (all runs combined); `-s at` sorts by Average Time per single query execution.",
    explanation: "Use `-s at` to find the single slowest individual queries (e.g. 60-second runaway analytics reports), and `-s t` to find high-frequency bottlenecks.",
    hint: "-s t is Total Time; -s at is Average Time per execution.",
    level: "basic",
    codeExample: `# Find top 10 single slowest queries by average execution time:
mysqldumpslow -s at -t 10 /var/log/mysql/slow_query.log`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a product inventory lookup was run 8,000 times a day with an average latency of 0.6s. How did `mysqldumpslow` expose this as the #1 server bottleneck?",
    shortAnswer: "Running `mysqldumpslow -s t -t 5` placed this query at the top with `Count: 8000 Time=0.60s (4800s)`, proving it consumed 4,800 seconds (80 minutes) of server CPU time daily.",
    explanation: "Adding a covering index dropped query latency from 0.6s to 0.001s, freeing 79 minutes of server capacity across ₹1.2 Crores in daily checkout volume.",
    hint: "High call frequency (8,000) resulted in 4,800 cumulative seconds of CPU time.",
    level: "moderate",
    codeExample: `# Barrackpore mysqldumpslow Output:
# Count: 8000  Time=0.60s (4800s)  Lock=0.00s (0s)  Rows=1.0 (8000), app[app]@localhost
SELECT price, stock FROM products WHERE barcode = 'S';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an unindexed report query was causing lock contention on a ₹500 Crore transaction table. How did Debangshu identify it using `mysqldumpslow`?",
    shortAnswer: "He ran `mysqldumpslow -s l -t 5 /var/log/mysql/slow.log`, which sorted digests by total Lock Wait Time, identifying a batch reconciliation query that held table locks for 3,200 cumulative seconds.",
    explanation: "Refactoring the report to run on a dedicated read replica eliminated lock contention on the primary OLTP master.",
    hint: "Used -s l to sort by total lock wait time.",
    level: "expert",
    codeExample: `mysqldumpslow -s l -t 5 /var/log/mysql/slow.log`
  },
  {
    question: "How do you limit `mysqldumpslow` output to only display the top 10 query digests?",
    shortAnswer: "Pass the `-t 10` flag.",
    explanation: "Suppresses long lists of minor queries and focuses analysis on the 10 most impactful query patterns.",
    hint: "Use -t 10.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -t 10 /var/log/mysql/slow.log`
  },
  {
    question: "How do you filter `mysqldumpslow` output to analyze only slow queries that touch the `orders` table?",
    shortAnswer: "Use the regular expression filter flag `-g 'orders'` (e.g. `mysqldumpslow -s t -t 10 -g 'orders' /var/log/mysql/slow.log`).",
    explanation: "Filters the parsed stream to include only query strings matching the provided regex pattern.",
    hint: "Use -g 'regex_pattern'.",
    level: "intermediate",
    codeExample: `mysqldumpslow -s t -t 10 -g 'orders' /var/log/mysql/slow.log`
  },
  {
    question: "What does the `-a` flag do in `mysqldumpslow`?",
    shortAnswer: "It disables the abstraction of literal numbers and strings, outputting queries with their actual raw parameter values instead of `N` and `'S'`.",
    explanation: "Useful when you need to see concrete test IDs and string values for direct debugging with `EXPLAIN`.",
    hint: "Disables abstraction; preserves concrete numbers and string literals.",
    level: "intermediate",
    codeExample: `mysqldumpslow -a -s at -t 5 /var/log/mysql/slow.log`
  },
  {
    question: "What is the meaning of `Time=2.50s (3850s)` in a `mysqldumpslow` report entry?",
    shortAnswer: "The first value (`2.50s`) is the average execution time per query run; the value in parentheses (`3850s`) is the total cumulative time spent executing all instances of this query in the log file.",
    explanation: "`3850s` = 1540 executions * 2.50s average time.",
    hint: "Average execution time followed by total cumulative time in parentheses.",
    level: "basic",
    codeExample: `# Count: 1540  Time=2.50s (3850s) ...`
  },
  {
    question: "What does `Rows=12.0 (18480)` signify in a `mysqldumpslow` report entry?",
    shortAnswer: "The query returned an average of 12.0 rows per execution, and returned a total of 18,480 rows across all recorded executions.",
    explanation: "Provides insight into query result set sizes and pagination efficiency.",
    hint: "Average rows returned followed by total cumulative rows sent in parentheses.",
    level: "basic",
    codeExample: `# Rows=12.0 (18480)`
  },
  {
    question: "What does the `-s c` sort option do in `mysqldumpslow`?",
    shortAnswer: "It sorts query digests by execution Count (frequency), listing the most frequently executed slow queries first.",
    explanation: "Useful for catching high-frequency queries that exceed the slow threshold by only a small margin.",
    hint: "Sorts by execution count / frequency.",
    level: "basic",
    codeExample: `mysqldumpslow -s c -t 10 /var/log/mysql/slow.log`
  },
  {
    question: "What does the `-s r` sort option do in `mysqldumpslow`?",
    shortAnswer: "It sorts query digests by total Rows sent / examined across all executions.",
    explanation: "Highlights queries that transfer massive datasets over the network or scan massive row counts.",
    hint: "Sorts by total row volume sent/examined.",
    level: "intermediate",
    codeExample: `mysqldumpslow -s r -t 10 /var/log/mysql/slow.log`
  },
  {
    question: "What does the `-r` flag do in `mysqldumpslow`?",
    shortAnswer: "It reverses the sort order (sorting from lowest to highest instead of default highest to lowest).",
    explanation: "Useful for finding the fastest queries that just barely crossed the `long_query_time` threshold.",
    hint: "Reverses sort order to ascending.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -r -t 10 /var/log/mysql/slow.log`
  },
  {
    question: "How do you schedule an automated daily slow query summary report using Linux `cron`?",
    shortAnswer: "Add a crontab entry running `mysqldumpslow -s t -t 10 /var/log/mysql/slow.log | mail -s 'Daily Slow Query Digest' dba@company.com` every morning at midnight.",
    explanation: "Ensures engineering teams receive proactive daily visibility into newly introduced slow query patterns.",
    hint: "Run mysqldumpslow in daily cron and email output to DBAs.",
    level: "intermediate",
    codeExample: `0 0 * * * /usr/bin/mysqldumpslow -s t -t 10 /var/log/mysql/slow.log > /var/reports/slow_daily.txt`
  },
  {
    question: "Why is `mysqldumpslow` bundled directly with all official MySQL distributions?",
    shortAnswer: "Because it is written in standard Perl with zero external CPAN dependencies, allowing it to run out-of-the-box on any Linux, macOS, or Unix server with MySQL installed.",
    explanation: "Provides immediate analysis capability without needing to install third-party packages.",
    hint: "Written in portable Perl with zero external dependencies; works out-of-the-box.",
    level: "basic",
    codeExample: `which mysqldumpslow # /usr/bin/mysqldumpslow`
  },
  {
    question: "How do you pass multiple log files into `mysqldumpslow` simultaneously?",
    shortAnswer: "List multiple file paths or use wildcard globs: `mysqldumpslow -s t -t 10 /var/log/mysql/slow_query.log*`.",
    explanation: "Aggregates slow query records across active logs and rotated uncompressed historical logs.",
    hint: "Use wildcard file globs or list multiple paths.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -t 10 /var/log/mysql/slow.log /var/log/mysql/slow.log.1`
  },
  {
    question: "What is the difference between `mysqldumpslow` and Percona Toolkit's `pt-query-digest`?",
    shortAnswer: "`mysqldumpslow` is lightweight, built-in, and provides simple text digest summaries; `pt-query-digest` is a more advanced third-party tool that calculates percentiles (95th percentile latency), query response time distributions, and parses Performance Schema tables.",
    explanation: "`mysqldumpslow` is ideal for rapid everyday triage; `pt-query-digest` is used for deep statistical forensic audits.",
    hint: "mysqldumpslow is lightweight and built-in; pt-query-digest offers percentiles and deep statistical charts.",
    level: "intermediate",
    codeExample: `# mysqldumpslow: built-in, fast
# pt-query-digest: detailed percentiles, variance`
  },
  {
    question: "How do you combine `mysqldumpslow` with `EXPLAIN ANALYZE` in MySQL 8.0 to optimize a discovered slow query?",
    shortAnswer: "1. Run `mysqldumpslow -s t -t 1` to get the top query digest; 2. Replace `N` and `'S'` with realistic production parameters; 3. Run `EXPLAIN ANALYZE <query>` in MySQL to view the actual query execution tree, row counts, and iterator times.",
    explanation: "`EXPLAIN ANALYZE` measures actual execution times for each join step, pinpointing where indexes are missing.",
    hint: "Extract query from mysqldumpslow, plug in parameters, and run EXPLAIN ANALYZE.",
    level: "intermediate",
    codeExample: `EXPLAIN ANALYZE 
SELECT * FROM kolkata_retail.orders 
WHERE status = 'PENDING' AND total_amount > 5000 
ORDER BY order_date DESC LIMIT 10;`
  },
  {
    question: "What does `mysqldumpslow -h` do?",
    shortAnswer: "It displays the command-line help screen listing all available flags, sort options, and usage examples.",
    explanation: "Provides quick in-terminal reference for all utility parameters.",
    hint: "Displays command usage and help documentation.",
    level: "basic",
    codeExample: `mysqldumpslow -h`
  },
  {
    question: "How does `mysqldumpslow` handle multi-line SQL formatting with comments and whitespace?",
    shortAnswer: "It collapses multi-line formatting and extra whitespace into clean single-line or standardized multi-line strings, ensuring queries with slightly different indentation are grouped into the same digest.",
    explanation: "Whitespace normalization prevents duplicate digests for cosmetically different queries.",
    hint: "Normalizes whitespace and formatting to unify identical query structures.",
    level: "basic",
    codeExample: `-- Normalized into standard single-structure template.`
  },
  {
    question: "What does the `-s al` sort flag do in `mysqldumpslow`?",
    shortAnswer: "It sorts query digests by Average Lock Time per execution.",
    explanation: "Pinpoints queries that suffer from severe lock waiting delays on each invocation.",
    hint: "Sorts by average lock wait time.",
    level: "intermediate",
    codeExample: `mysqldumpslow -s al -t 5 /var/log/mysql/slow.log`
  },
  {
    question: "What does the `-s ar` sort flag do in `mysqldumpslow`?",
    shortAnswer: "It sorts query digests by Average Rows sent / examined per execution.",
    explanation: "Finds single queries that return or scan massive row sets per execution.",
    hint: "Sorts by average row count per run.",
    level: "intermediate",
    codeExample: `mysqldumpslow -s ar -t 5 /var/log/mysql/slow.log`
  },
  {
    question: "How do you extract slow queries executed by a specific database user using `mysqldumpslow`?",
    shortAnswer: "Combine `-g` with the username: `mysqldumpslow -s t -t 10 -g 'app_billing' /var/log/mysql/slow.log`.",
    explanation: "Filters digests to only show statements executed by the specified application user.",
    hint: "Use -g with the username pattern.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -t 5 -g 'app_billing' /var/log/mysql/slow.log`
  },
  {
    question: "Can `mysqldumpslow` parse gzipped historical slow log files (e.g. `slow.log.2.gz`) directly?",
    shortAnswer: "No, `mysqldumpslow` cannot read gzipped files directly; pipe through `zcat` or `gunzip -c`: `zcat /var/log/mysql/slow.log.2.gz | mysqldumpslow -s t -t 10 -`.",
    explanation: "Passing `-` as the filename directs `mysqldumpslow` to read from standard input (`stdin`).",
    hint: "Pipe through zcat and pass '-' as the filename.",
    level: "intermediate",
    codeExample: `zcat /var/log/mysql/slow_query.log.2.gz | mysqldumpslow -s t -t 10 -`
  },
  {
    question: "What is the impact of character set encoding when running `mysqldumpslow` on logs containing Bengali or Indian Unicode text?",
    shortAnswer: "Because `mysqldumpslow` abstracts string literals to `'S'`, Bengali text inside quotes is safely abstracted into `'S'`, while Unicode table/column identifiers are preserved accurately in UTF-8 terminals.",
    explanation: "String literal abstraction prevents encoding corruption during digest generation.",
    hint: "String literals are abstracted to 'S', and identifiers remain in UTF-8.",
    level: "basic",
    codeExample: `# Raw: WHERE name = 'সুস্মিতা' → Abstracted: WHERE name = 'S'`
  },
  {
    question: "How do you verify if `mysqldumpslow` is installed and accessible in the system PATH on Linux?",
    shortAnswer: "Run `which mysqldumpslow` or `mysqldumpslow --version` in the terminal.",
    explanation: "Confirms the utility binary is available in `/usr/bin/` or `/usr/local/mysql/bin/`.",
    hint: "Run which mysqldumpslow.",
    level: "basic",
    codeExample: `which mysqldumpslow`
  },
  {
    question: "Why should developers and DBAs prioritize queries by Total Time (`-s t`) rather than Average Time (`-s at`) when optimizing database servers?",
    shortAnswer: "Because Total Time represents the true cumulative drain on database CPU, RAM, and disk I/O capacity; optimizing high-frequency queries yields massive compound performance gains across thousands of transactions per minute.",
    explanation: "Eliminating 500ms from a query called 10,000 times/day saves 5,000 seconds of server processing, while optimizing a 5-second query run once a month saves only 5 seconds.",
    hint: "Total time captures cumulative server capacity drain; high-frequency optimization yields compound gains.",
    level: "basic",
    codeExample: `-- Optimizing 10,000x queries produces the greatest compound speedup.`
  },
  {
    question: "How do you save `mysqldumpslow` analysis results to a text file for code review and sprint planning?",
    shortAnswer: "Redirect standard output to a file: `mysqldumpslow -s t -t 10 /var/log/mysql/slow.log > slow_summary_report.txt`.",
    explanation: "Creates a shareable text report for developers and engineering sprint planning.",
    hint: "Redirect output with > report.txt.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -t 10 /var/log/mysql/slow.log > /tmp/slow_report_$(date +%F).txt`
  },
  {
    question: "What is the primary operational takeaway of Topic 5 in Module 004_005?",
    shortAnswer: "`mysqldumpslow` is the definitive command-line query aggregator for MySQL: use `-s t -t 10` as your primary triage recipe to target queries with the highest cumulative server impact, use `-s at` to catch extreme single-query outliers, filter by table or user with `-g`, and feed discovered digests into `EXPLAIN ANALYZE` to design high-performance indexing solutions.",
    explanation: "Mastering `mysqldumpslow` transforms noisy multi-gigabyte log files into actionable, prioritized optimization targets in seconds.",
    hint: "Summarize -s t for total time, -s at for average time, -t 10, -g regex filtering, and EXPLAIN ANALYZE workflow.",
    level: "basic",
    codeExample: `# Master mysqldumpslow Workflow:
# 1. Triage Top 10 Cumulative Bottlenecks:
mysqldumpslow -s t -t 10 /var/log/mysql/slow_query.log

# 2. Extract Top 5 Slowest Analytics Outliers:
mysqldumpslow -s at -t 5 /var/log/mysql/slow_query.log

# 3. Analyze Target Query with EXPLAIN ANALYZE:
mysql -u root -p -e "EXPLAIN ANALYZE SELECT * FROM orders WHERE ...;"`
  }
];

export default questions;
