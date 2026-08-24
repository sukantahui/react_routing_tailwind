// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What is the primary objective of the Advanced Data Analytics Practical Query Workshop?",
    shortAnswer: "To synthesize all window functions, CTE pipelines, statistical distributions, rolling aggregations, pivoting, and gap-filling into production-grade multi-metric analytical solutions.",
    explanation: "Capstone synthesis of Module 003_002.",
    hint: "Synthesizes all window functions, CTEs, and analytics into production solutions.",
    level: "basic"
  },
  {
    question: "How do you project Department Rank and Academy Percentile on the same student row?",
    shortAnswer: "Declare two named windows: `WINDOW w_dept AS (PARTITION BY dept_id ORDER BY score DESC), w_global AS (ORDER BY score ASC)` and apply `DENSE_RANK() OVER w_dept` and `PERCENT_RANK() OVER w_global`.",
    explanation: "Multi-window projection in a single query.",
    hint: "Use named windows w_dept and w_global in the WINDOW clause.",
    level: "basic"
  },
  {
    question: "How do you calculate the exact score gap between every student and their department valedictorian?",
    shortAnswer: "`FIRST_VALUE(exam_score_pct) OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC) - exam_score_pct`.",
    explanation: "Boundary subtraction relative to department leader.",
    hint: "FIRST_VALUE(score) minus student score.",
    level: "basic"
  },
  {
    question: "How do you combine YTD Cumulative Revenue and Month-over-Month Growth % in one query?",
    shortAnswer: "In a 3-stage CTE, project `SUM(rev) OVER (PARTITION BY YEAR(date) ORDER BY date)` for YTD, and `((rev - LAG(rev)) / NULLIF(LAG(rev), 0)) * 100` for MoM.",
    explanation: "Combines cumulative running sums and offset growth rates.",
    hint: "SUM(rev) OVER (PARTITION BY YEAR) + LAG(rev) delta in CTE.",
    level: "expert"
  },
  {
    question: "How do student metrics for Mamata, Susmita, Abhronila, and Debangshu demonstrate the 360° Scorecard?",
    shortAnswer: "Mamata Hui gets CS Rank #1 (`DENSE_RANK=1`), 94.50% Score, 66.7th Academy Percentile, 0.00 Gap to Topper, and an 88.00% 3-quiz moving average.",
    explanation: "Full holistic analytical student telemetry.",
    hint: "Consolidates rank, percentile, gap to leader, and moving average into one report.",
    level: "basic"
  },
  {
    question: "How do you detect abnormal fee collection spikes using 30-Day Moving Mean $\\pm 2\\sigma$ bands?",
    shortAnswer: "Calculate `AVG(amount) OVER w` and `STDDEV_SAMP(amount) OVER w` in a CTE, and flag rows where `amount > (mean + 2 * stddev)`.",
    explanation: "Pure SQL Bollinger volatility anomaly detection.",
    hint: "Flag where amount > (moving_mean + 2 * moving_stddev).",
    level: "expert"
  },
  {
    question: "How do you award a 30-Day Consistency Badge using the Gaps & Islands Difference Method?",
    shortAnswer: "Group by `student_id, DATE_SUB(date, INTERVAL ROW_NUMBER() OVER (...) DAY)` and filter for groups where `COUNT(*) >= 30`.",
    explanation: "Automated habit persistence gamification.",
    hint: "Group by date - INTERVAL ROW_NUMBER() DAY and check COUNT(*) >= 30.",
    level: "moderate"
  },
  {
    question: "How do you pivot subject enrollments across 4 academic departments with super-aggregate grand totals?",
    shortAnswer: "Use `SUM(CASE WHEN sub = 'CS' THEN 1 ELSE 0 END)` for each subject column and append `WITH ROLLUP` to `GROUP BY dept_name`.",
    explanation: "Crosstab matrix with bottom grand total summary row.",
    hint: "Conditional SUM(CASE) per subject + WITH ROLLUP.",
    level: "moderate"
  },
  {
    question: "How do you ensure that 7-day moving averages do not miscalculate when certain dates have 0 sales?",
    shortAnswer: "Generate a dense Cartesian coordinate grid (`DateGrid CROSS JOIN stores LEFT JOIN sales`) zero-filling missing dates before calculating the 7-day moving average.",
    explanation: "Prevents sparse time-series window distortions.",
    hint: "Zero-fill missing dates via Cartesian grid before applying AVG() window.",
    level: "expert"
  },
  {
    question: "What is the execution order of Window Functions relative to `GROUP BY` and `HAVING`?",
    shortAnswer: "Window functions execute at Phase 5, strictly AFTER `FROM/JOIN` (1), `WHERE` (2), `GROUP BY` (3), and `HAVING` (4), and BEFORE `ORDER BY` (6) and `LIMIT` (7).",
    explanation: "Fundamental 9-phase SQL query lifecycle.",
    hint: "Phase 5: Executes after GROUP BY/HAVING and before ORDER BY/LIMIT.",
    level: "expert"
  },
  {
    question: "Can a Window Function be passed the result of an Aggregate Function?",
    shortAnswer: "YES; e.g. `RANK() OVER (ORDER BY SUM(amount_paid_inr) DESC)` ranks aggregated group totals directly.",
    explanation: "Nested aggregation inside window function specifications.",
    hint: "Yes, window functions can rank or sum aggregated metrics like SUM(col).",
    level: "moderate"
  },
  {
    question: "Why should developers use Named Windows (`WINDOW w AS (...)`) in multi-metric analytics?",
    shortAnswer: "To keep SQL queries DRY (Don't Repeat Yourself), improving readability and allowing the query optimizer to share partition sorts across multiple metrics.",
    explanation: "Architectural clean code and optimizer reuse.",
    hint: "Eliminates duplication and allows optimizer to share in-memory sorts.",
    level: "basic"
  },
  {
    question: "What composite index supports `PARTITION BY dept_id ORDER BY exam_score_pct DESC` with covering metrics?",
    shortAnswer: "A composite B-Tree index on `(dept_id, exam_score_pct DESC, student_id)`.",
    explanation: "Provides covering index stream with 0 filesort and 0 table lookups.",
    hint: "Composite index on (dept_id, exam_score_pct DESC, student_id).",
    level: "expert"
  },
  {
    question: "How do you find the 2nd highest fee paying customer per branch without correlated subqueries?",
    shortAnswer: "`WITH Ranked AS (SELECT *, DENSE_RANK() OVER (PARTITION BY branch_id ORDER BY total_fees DESC) AS rnk FROM branch_customers) SELECT * FROM Ranked WHERE rnk = 2;`",
    explanation: "N-th rank extraction per category.",
    hint: "DENSE_RANK() = 2 in outer query of CTE.",
    level: "basic"
  },
  {
    question: "How do you calculate Trailing Twelve Months (TTM) Revenue in a single query?",
    shortAnswer: "`SUM(monthly_revenue) OVER (ORDER BY month_date ASC ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)` on monthly aggregated data.",
    explanation: "Standard corporate financial reporting metric.",
    hint: "SUM(monthly_rev) OVER (ORDER BY month_date ROWS 11 PRECEDING).",
    level: "basic"
  },
  {
    question: "What happens if you omit `ROWS BETWEEN ...` when calculating cumulative running totals with `ORDER BY`?",
    shortAnswer: "MySQL defaults to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which clumps tied order values into lump sums instead of row-by-row progression.",
    explanation: "Default window frame behavior in ANSI SQL.",
    hint: "Defaults to RANGE, clumping tied values together.",
    level: "expert"
  },
  {
    question: "How do you unpivot a 4-quarter financial matrix back into normalized quarters?",
    shortAnswer: "Use `UNION ALL` across 4 SELECT statements projecting `(branch_name, 'Q1', q1_rev)` through `(branch_name, 'Q4', q4_rev)`.",
    explanation: "Standard unpivoting pattern.",
    hint: "UNION ALL stacking 4 quarter columns into normalized rows.",
    level: "basic"
  },
  {
    question: "How do you calculate the retention drop-off rate between Lesson 1 and Lesson 10?",
    shortAnswer: "Compute student counts at each lesson step using `COUNT(DISTINCT student_id)`, and project `LAG(1)` to compute step-by-step drop-off percentages.",
    explanation: "E-learning course completion funnel analytics.",
    hint: "COUNT(DISTINCT student_id) per lesson + LAG() drop-off delta.",
    level: "moderate"
  },
  {
    question: "How do you forward-fill missing temperature or sensor telemetry across hourly gaps in MySQL?",
    shortAnswer: "Create group partitions on `COUNT(sensor_val) OVER (ORDER BY log_time)` and project `MAX(sensor_val) OVER (PARTITION BY group_id)`.",
    explanation: "LOCF data imputation technique.",
    hint: "COUNT(val) grouping partitions with MAX(val) projection.",
    level: "expert"
  },
  {
    question: "Can multiple CTEs be chained together in a single analytical query in MySQL 8.0?",
    shortAnswer: "YES; `WITH CTE1 AS (...), CTE2 AS (...), CTE3 AS (...) SELECT * FROM CTE3;` forms a modular sequential data pipeline.",
    explanation: "Multi-stage modular ETL pipelines in SQL.",
    hint: "Yes, chain CTEs separated by commas in a single WITH statement.",
    level: "basic"
  },
  {
    question: "What is the memory and CPU benefit of ANSI Window Functions over self-joins on a 1-million row table?",
    shortAnswer: "Reduces execution time from minutes to milliseconds, reducing memory from gigabytes of nested loop buffers down to a single linear streaming scan.",
    explanation: "Massive exponential architectural upgrade.",
    hint: "Reduces execution from minutes to milliseconds with linear memory scaling.",
    level: "expert"
  },
  {
    question: "How do you display friendly strings like `'🏆 Gold Honors'` based on `PERCENT_RANK()`?",
    shortAnswer: "Wrap `PERCENT_RANK()` in a `CASE` statement: `CASE WHEN pr >= 0.95 THEN '🏆 Gold Honors' WHEN pr >= 0.80 THEN '🥈 Silver' ELSE 'Standard' END`.",
    explanation: "Formatting statistical percentiles for executive UI reporting.",
    hint: "Use CASE statement with PERCENT_RANK() cutoffs.",
    level: "basic"
  },
  {
    question: "How do you find the longest inactive absence gap for every student in the academy?",
    shortAnswer: "Calculate `(DATEDIFF(date, LAG(date)) - 1)` inside a CTE, rank descending per student with `ROW_NUMBER() = 1`, and extract the maximum gap interval.",
    explanation: "Absence gap auditing in time-series attendance.",
    hint: "Rank DATEDIFF(date, LAG(date)) - 1 DESC and take ROW_NUMBER() = 1.",
    level: "moderate"
  },
  {
    question: "Why should developers use `NULLIF(prior_rev, 0)` in all financial growth formulas?",
    shortAnswer: "To prevent fatal Division by Zero (`Error 1365`) crashes when prior period collections were zero.",
    explanation: "Essential defensive calculation practice.",
    hint: "Prevents division by zero crashes on zero-revenue baselines.",
    level: "expert"
  },
  {
    question: "Can the entire Capstone Analytical Workshop query be encapsulated inside a MySQL View?",
    shortAnswer: "YES; `CREATE OR REPLACE VIEW v_academy_360_telemetry AS WITH ... SELECT ...` provides an instant multi-metric dashboard view for BI tools.",
    explanation: "Virtual analytical data layer abstraction.",
    hint: "Yes, Views can encapsulate complex multi-stage analytical CTE queries.",
    level: "basic"
  },
  {
    question: "What is the difference between `NTILE(4)` and `CUME_DIST()` in student cohort segmentation?",
    shortAnswer: "`NTILE(4)` forces rows into 4 equally sized buckets (1 to 4), whereas `CUME_DIST()` calculates the exact mathematical cumulative fraction based on score values.",
    explanation: "Discrete bucket distribution vs continuous mathematical fraction.",
    hint: "NTILE divides into 4 equal counts; CUME_DIST calculates continuous value fractions.",
    level: "expert"
  },
  {
    question: "How do you calculate Year-over-Year growth on weekly data?",
    shortAnswer: "`LAG(weekly_revenue, 52) OVER (ORDER BY year_num, week_num)` (looking back 52 weeks = 1 full year).",
    explanation: "52-week annual seasonality matching.",
    hint: "LAG(weekly_rev, 52) compares against same week last year.",
    level: "moderate"
  },
  {
    question: "What query tool or command verifies if a window query is using filesort or streaming from an index?",
    shortAnswer: "`EXPLAIN` or `EXPLAIN ANALYZE` (look for `Using filesort` vs streaming index access in the execution plan).",
    explanation: "Query optimization inspection tool.",
    hint: "EXPLAIN or EXPLAIN ANALYZE in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "How do you calculate student quartile rank while also calculating class rank in the same query?",
    shortAnswer: "`DENSE_RANK() OVER (ORDER BY score DESC) AS class_rank, NTILE(4) OVER (ORDER BY score DESC) AS score_quartile`.",
    explanation: "Multi-function simultaneous ranking.",
    hint: "DENSE_RANK() and NTILE(4) projected in the same SELECT statement.",
    level: "basic"
  },
  {
    question: "What is the master architectural summary rule for Module 003_002: Advanced SQL Patterns & Analytics?",
    shortAnswer: "Master the 9-phase SQL query lifecycle, use ANSI Window Functions with explicit `ROWS BETWEEN` frames, structure complex analytics into modular multi-stage CTEs, defend arithmetic with `NULLIF(col, 0)`, guarantee matrix density via Cartesian coordinate grids, and support queries with composite covering B-Tree indexes for sub-millisecond production performance.",
    explanation: "The ultimate synthesis of modern relational analytics and query engineering.",
    hint: "Window Functions + Explicit Framing + Multi-Stage CTEs + NULLIF Defense + Cartesian Grids + Composite Covering Indexes.",
    level: "expert"
  }
];

export default questions;
