// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is a 'Sparse Matrix' in relational database analytics?",
    shortAnswer: "A dataset with missing coordinate combinations (e.g. days with zero sales or students with missing exam submissions) where rows simply do not exist in the table.",
    explanation: "Standard time-series and multi-dimensional gap problem.",
    hint: "Missing rows for inactive periods or missing combinations.",
    level: "basic"
  },
  {
    question: "Why do sparse datasets cause bugs in moving average and period-over-period growth queries?",
    shortAnswer: "Because `LAG(1)` or `ROWS 6 PRECEDING` will accidentally pull records from weeks or months prior instead of consecutive chronological days.",
    explanation: "Breaks time-series step continuity assumptions.",
    hint: "Window functions pull from previous available rows instead of consecutive calendar days.",
    level: "expert"
  },
  {
    question: "What is the standard 3-step design pattern for filling sparse matrices in SQL?",
    shortAnswer: "1. Generate a continuous Date/Category Grid (via Recursive CTE), 2. `CROSS JOIN` with entities to create a Cartesian coordinate grid, and 3. `LEFT JOIN` the sparse transaction table with `COALESCE(val, 0)`.",
    explanation: "The standard Cartesian Grid Imputation pattern.",
    hint: "Recursive Date Grid + CROSS JOIN Entities + LEFT JOIN with COALESCE.",
    level: "expert"
  },
  {
    question: "How do you generate a continuous calendar date series from 2026-06-01 to 2026-06-30 in MySQL 8.0?",
    shortAnswer: "`WITH RECURSIVE Dates AS (SELECT DATE('2026-06-01') AS dt UNION ALL SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM Dates WHERE dt < '2026-06-30') SELECT * FROM Dates;`",
    explanation: "Standard recursive calendar generator CTE.",
    hint: "WITH RECURSIVE with DATE_ADD and termination WHERE clause.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate Sparse Matrix Filling?",
    shortAnswer: "If Mamata only paid fees on June 01 and June 05, the Cartesian grid creates placeholder rows for June 02, 03, and 04 filled with `₹0.00`.",
    explanation: "Fills in the inactive date gaps with clean zero values.",
    hint: "Generates explicit ₹0.00 rows for days where no payment occurred.",
    level: "basic"
  },
  {
    question: "What is 'Forward-Filling' (LOCF - Last Observation Carried Forward)?",
    shortAnswer: "Imputing missing values by propagating the most recent non-null value forward until a new recorded value appears.",
    explanation: "Standard time-series telemetry imputation method.",
    hint: "Carrying the last known non-null value forward into missing periods.",
    level: "moderate"
  },
  {
    question: "Does MySQL 8.0 support `IGNORE NULLS` in window functions like `LAST_VALUE()`?",
    shortAnswer: "No, MySQL 8.0 does not natively support `IGNORE NULLS`; forward-filling is simulated by creating grouping partitions on `COUNT(val)` or using subquery joins.",
    explanation: "MySQL specific feature constraint.",
    hint: "No, MySQL does not support IGNORE NULLS; requires COUNT(val) grouping workaround.",
    level: "expert"
  },
  {
    question: "How does the `COUNT(val)` grouping workaround simulate forward-filling in pure MySQL?",
    shortAnswer: "A cumulative `COUNT(val) OVER (ORDER BY date)` increments only when a non-null value appears, creating an identical group ID for that value and all subsequent NULL rows, which can then be filled with `MAX(val)`.",
    explanation: "Classic SQL hack for LOCF forward-filling without IGNORE NULLS.",
    hint: "COUNT(val) increments only on non-nulls, creating a group ID to fill with MAX(val).",
    level: "expert"
  },
  {
    question: "What function replaces `NULL` values with a default value like `0.00` in MySQL?",
    shortAnswer: "`COALESCE(column_name, 0.00)` or `IFNULL(column_name, 0.00)`.",
    explanation: "Standard null imputation functions.",
    hint: "Use COALESCE(col, 0) or IFNULL(col, 0).",
    level: "basic"
  },
  {
    question: "How do you create a complete 7-day attendance grid for all students even if no attendance was taken on Sunday?",
    shortAnswer: "`CROSS JOIN` the `students` table with a 7-day `DateGrid`, then `LEFT JOIN` the `attendance` table and use `COALESCE(is_present, 0)`.",
    explanation: "Full Cartesian grid attendance reporting.",
    hint: "CROSS JOIN students with DateGrid, then LEFT JOIN attendance.",
    level: "basic"
  },
  {
    question: "What is the Cartesian Product size when cross joining 500 students with 30 calendar days?",
    shortAnswer: "$500 \\times 30 = 15,000$ coordinate rows.",
    explanation: "Predictable, deterministic coordinate grid size.",
    hint: "500 * 30 = 15,000 rows.",
    level: "basic"
  },
  {
    question: "What system variable controls the maximum recursion depth for date generation in MySQL 8.0?",
    shortAnswer: "`cte_max_recursion_depth` (default is 1,000 iterations).",
    explanation: "Controls recursive CTE safety limits.",
    hint: "cte_max_recursion_depth (default 1000).",
    level: "moderate"
  },
  {
    question: "How do you set `cte_max_recursion_depth` to allow generating 5 years of daily calendar dates (1,825 days)?",
    shortAnswer: "`SET SESSION cte_max_recursion_depth = 2000;` before running the recursive CTE query.",
    explanation: "Increases recursion limit for multi-year grids.",
    hint: "SET SESSION cte_max_recursion_depth = 2000;",
    level: "moderate"
  },
  {
    question: "Why should developers build a physical permanent `dim_calendar` table in enterprise data warehouses?",
    shortAnswer: "To avoid generating recursive CTE dates on every query, pre-indexing fiscal quarters, holidays, and academic semesters for instant high-speed joins.",
    explanation: "Data warehouse dimensional modeling best practice.",
    hint: "Eliminates recursive CTE overhead and pre-indexes holidays and fiscal periods.",
    level: "expert"
  },
  {
    question: "How do you zero-fill missing subject marks for students who did not attend an examination?",
    shortAnswer: "`CROSS JOIN` `students` and `subjects`, then `LEFT JOIN` `exam_marks` and wrap in `COALESCE(exam_score_pct, 0.00)`.",
    explanation: "Complete student-subject evaluation grid.",
    hint: "CROSS JOIN students and subjects, then LEFT JOIN exam_marks with COALESCE.",
    level: "basic"
  },
  {
    question: "Can sparse matrix filling be combined with moving average queries?",
    shortAnswer: "YES; generating the dense zero-filled matrix first in a CTE ensures that `AVG(val) OVER (ORDER BY date ROWS 6 PRECEDING)` calculates true 7-calendar-day moving averages!",
    explanation: "Enables mathematically correct sliding time-series windows.",
    hint: "Yes, dense zero-filled grids ensure true chronological sliding windows.",
    level: "expert"
  },
  {
    question: "How do you distinguish between an actual recorded 0.00 payment and an imputed missing day?",
    shortAnswer: "Check if the joined primary key is NULL: `CASE WHEN p.payment_id IS NULL THEN 'Imputed Missing' ELSE 'Actual 0 Log' END`.",
    explanation: "Data provenance and lineage tracking.",
    hint: "Check if joined table primary key IS NULL.",
    level: "moderate"
  },
  {
    question: "What index optimizes the `LEFT JOIN` step between the Cartesian grid and sparse `fee_payments` table?",
    shortAnswer: "A composite unique index on `(student_id, payment_date)`.",
    explanation: "Enables instant index lookups for each coordinate pair.",
    hint: "Composite index on (student_id, payment_date).",
    level: "expert"
  },
  {
    question: "How do you fill missing categorical statuses using 'Backward-Filling' (Next Observation Carried Backward)?",
    shortAnswer: "Apply the reverse logic using `COUNT(val) OVER (ORDER BY date DESC)` and `MIN(val)`.",
    explanation: "Reverse temporal imputation.",
    hint: "Reverse ordering to carry future known observations backward.",
    level: "expert"
  },
  {
    question: "How do you generate a 24-hour hourly telemetry grid (00:00 to 23:00)?",
    shortAnswer: "`WITH RECURSIVE Hours AS (SELECT 0 AS hr UNION ALL SELECT hr + 1 FROM Hours WHERE hr < 23) SELECT * FROM Hours;`",
    explanation: "Hourly time-series density generator.",
    hint: "Recursive CTE incrementing from 0 to 23.",
    level: "basic"
  },
  {
    question: "Can sparse matrix filling be encapsulated inside a MySQL View?",
    shortAnswer: "YES; `CREATE VIEW v_dense_student_daily_revenue AS WITH DateGrid AS (...) SELECT ...` creates a dense virtual table.",
    explanation: "Virtual dense table abstraction.",
    hint: "Yes, Views can encapsulate recursive CTE matrix filling queries.",
    level: "basic"
  },
  {
    question: "What is Linear Interpolation in time-series data?",
    shortAnswer: "Estimating missing values between two known points by calculating the linear slope between them ($y = y_1 + \\frac{y_2 - y_1}{x_2 - x_1} \\cdot (x - x_1)$).",
    explanation: "Mathematical interpolation between boundary points.",
    hint: "Calculating intermediate values along a linear line between two known endpoints.",
    level: "expert"
  },
  {
    question: "Why should developers avoid performing `CROSS JOIN` across two tables with millions of rows without date filters?",
    shortAnswer: "Because a Cartesian product of 1M $\\times$ 1M produces 1 trillion rows ($10^{12}$), instantly exhausting memory and disk space.",
    explanation: "Cartesian product explosion risk.",
    hint: "Produces trillions of rows; always constrain date ranges with WHERE filters.",
    level: "expert"
  },
  {
    question: "How do you calculate the percentage of missing data points in a sparse dataset?",
    shortAnswer: "`ROUND((COUNT(CASE WHEN p.id IS NULL THEN 1 END) / COUNT(*)) * 100.0, 2) AS missing_data_pct` over the Cartesian grid.",
    explanation: "Sparsity coefficient measurement.",
    hint: "COUNT(imputed nulls) / COUNT(*) * 100.0",
    level: "moderate"
  },
  {
    question: "How do you fill missing store inventory balances with the last closing stock balance?",
    shortAnswer: "Generate continuous date grid per store, left join stock logs, and forward-fill the `closing_stock` value across empty dates.",
    explanation: "Inventory ledger continuous balance filling.",
    hint: "Left join stock logs and forward-fill closing stock.",
    level: "expert"
  },
  {
    question: "Can `ROW_NUMBER()` be used to limit date recursion without a `WHERE` condition?",
    shortAnswer: "No, a recursive CTE MUST include a termination condition in its `WHERE` clause to avoid infinite recursion.",
    explanation: "Mandatory recursive CTE safety rule.",
    hint: "No, a terminating WHERE condition is strictly required.",
    level: "basic"
  },
  {
    question: "How do you impute missing exam scores with the department average score?",
    shortAnswer: "`COALESCE(m.exam_score_pct, AVG(m.exam_score_pct) OVER (PARTITION BY s.dept_id))`.",
    explanation: "Mean value imputation across partition cohorts.",
    hint: "COALESCE with windowed AVG() over department partition.",
    level: "expert"
  },
  {
    question: "What is the memory impact of executing a 30-day sparse matrix query for 100 students in MySQL 8.0?",
    shortAnswer: "3,000 coordinate rows require under 500 kilobytes of RAM and evaluate in under 15 milliseconds.",
    explanation: "Lightweight in-memory hash join.",
    hint: "Under 500 KB RAM; runs in under 15 milliseconds.",
    level: "basic"
  },
  {
    question: "Why does Tableau, PowerBI, or Metabase benefit from receiving dense zero-filled datasets from SQL?",
    shortAnswer: "Because BI charting tools often fail to render continuous line charts or heatmaps when date coordinates are completely missing from the SQL result set.",
    explanation: "Ensures smooth unbroken visual line graphs in reporting dashboards.",
    hint: "Prevents broken line charts and empty missing heatmap cells in BI tools.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Handling Missing Data and Sparse Matrix Filling?",
    shortAnswer: "Generate continuous coordinate grids using Recursive CTEs (or a physical `dim_calendar` table), create Cartesian coordinates via `CROSS JOIN`, attach actual transactions with `LEFT JOIN`, zero-fill missing metrics using `COALESCE(val, 0)`, and forward-fill telemetry data using `COUNT(val)` grouping.",
    explanation: "Authoritative architectural best practices for sparse matrix handling and data imputation.",
    hint: "Recursive DateGrid + CROSS JOIN + LEFT JOIN with COALESCE + forward-fill with COUNT grouping.",
    level: "expert"
  }
];

export default questions;
