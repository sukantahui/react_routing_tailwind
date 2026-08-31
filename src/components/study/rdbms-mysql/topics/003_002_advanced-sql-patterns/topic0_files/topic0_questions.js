// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the primary difference between a Group Aggregate function (`GROUP BY`) and a Window Function (`OVER()`)?",
    shortAnswer: "`GROUP BY` collapses $N$ input rows into 1 summary row per group (destroying row identity), whereas a Window Function preserves all $N$ original input rows while projecting aggregate calculations alongside each row.",
    explanation: "The defining paradigm shift of window functions.",
    hint: "GROUP BY collapses rows; Window functions preserve all original rows.",
    level: "basic"
  },
  {
    question: "In which version of MySQL were native Window Functions introduced?",
    shortAnswer: "MySQL 8.0.",
    explanation: "Introduced in MySQL 8.0 to comply with ANSI SQL:2003+ standards.",
    hint: "MySQL 8.0.",
    level: "basic"
  },
  {
    question: "Which SQL clause is required to transform a standard aggregate function into a Window Function?",
    shortAnswer: "The `OVER()` clause.",
    explanation: "The presence of OVER() signals the execution engine to treat the function as a window function.",
    hint: "The OVER() clause.",
    level: "basic"
  },
  {
    question: "At which phase of the SQL query execution lifecycle are Window Functions evaluated?",
    shortAnswer: "After `WHERE`, `GROUP BY`, and `HAVING`, but before `SELECT`, `DISTINCT`, `ORDER BY`, and `LIMIT`.",
    explanation: "Phase 5 of the 9-phase relational execution pipeline.",
    hint: "After WHERE, GROUP BY, and HAVING, but before DISTINCT and ORDER BY.",
    level: "expert"
  },
  {
    question: "Can a Window Function be placed directly in the `WHERE` clause of a query?",
    shortAnswer: "NO; because the `WHERE` clause filters individual rows before window partitions are established and evaluated.",
    explanation: "Causes Error 3593 (HY000): You cannot use the window function in this context.",
    hint: "No, WHERE executes before window functions are calculated.",
    level: "basic"
  },
  {
    question: "How do you filter records based on the result of a Window Function (e.g. `dept_rank <= 3`)?",
    shortAnswer: "Wrap the query containing the window function inside a Common Table Expression (CTE) or Derived Table, and apply the filter in the outer query's `WHERE` clause.",
    explanation: "The standard design pattern for analytical filtering.",
    hint: "Wrap the window function in a CTE and filter in the outer WHERE clause.",
    level: "basic"
  },
  {
    question: "What happens if an `OVER()` clause is written completely empty (i.e. `AVG(score) OVER ()`)?",
    shortAnswer: "The window encompasses the ENTIRE result set as a single partition, computing the global average across all rows.",
    explanation: "Computes a single global aggregate and projects it onto every row.",
    hint: "Computes the aggregate across the entire table without partitioning.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate Window vs Aggregate functions?",
    shortAnswer: "A `GROUP BY` returns only 2 rows (CS average and IT average), losing student names; a Window Function `AVG() OVER (PARTITION BY dept_id)` returns all 4 student rows showing both their individual score and department average.",
    explanation: "Demonstrates row preservation vs row collapse.",
    hint: "GROUP BY collapses to 2 department rows; Window function keeps all 4 student rows.",
    level: "basic"
  },
  {
    question: "What is the syntax to calculate each student's score variance from their department's average in a single SELECT statement?",
    shortAnswer: "`SELECT student_name, exam_score_pct, (exam_score_pct - AVG(exam_score_pct) OVER (PARTITION BY dept_id)) AS variance_from_dept FROM students;`",
    explanation: "Calculates individual vs group delta in one pass.",
    hint: "exam_score_pct - AVG(exam_score_pct) OVER (PARTITION BY dept_id)",
    level: "basic"
  },
  {
    question: "Can standard aggregate functions like `SUM()`, `AVG()`, `MIN()`, `MAX()`, and `COUNT()` be used as Window Functions?",
    shortAnswer: "YES; appending `OVER()` to any standard aggregate function converts it into an in-memory window aggregate.",
    explanation: "Any aggregate function becomes a window function with OVER().",
    hint: "Yes, any standard aggregate becomes a window function when followed by OVER().",
    level: "basic"
  },
  {
    question: "Can dedicated ranking functions like `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` be used WITHOUT the `OVER()` clause?",
    shortAnswer: "NO; non-aggregate window functions strictly require the `OVER()` clause, otherwise MySQL throws a syntax error.",
    explanation: "Ranking functions cannot function as grouped aggregates.",
    hint: "No, ranking functions require an OVER() clause.",
    level: "basic"
  },
  {
    question: "What is the performance advantage of Window Functions over self-joins or correlated subqueries?",
    shortAnswer: "Window functions compute partition metrics in a single pass ($O(N \\log N)$) using in-memory sorting, whereas correlated subqueries execute $N$ separate query iterations ($O(N^2)$).",
    explanation: "Massive CPU and I/O reduction.",
    hint: "Single-pass execution (O(N log N)) instead of N separate nested scans (O(N^2)).",
    level: "expert"
  },
  {
    question: "Can multiple Window Functions with different partitions be used in the same `SELECT` statement?",
    shortAnswer: "YES; for example, you can calculate `AVG(score) OVER (PARTITION BY dept_id)` and `SUM(fees) OVER (PARTITION BY branch_city)` in the same query.",
    explanation: "MySQL evaluates multiple window specifications in parallel.",
    hint: "Yes, you can mix different PARTITION BY clauses in the same SELECT.",
    level: "moderate"
  },
  {
    question: "What is a 'Named Window' defined with the `WINDOW` clause in MySQL 8.0?",
    shortAnswer: "A reusable window specification defined at the end of a query (`WINDOW w AS (PARTITION BY dept_id ORDER BY score DESC)`) and referenced in multiple `OVER w` clauses.",
    explanation: "Adheres to DRY (Don't Repeat Yourself) principle for multiple window functions.",
    hint: "A reusable window definition declared with the WINDOW keyword.",
    level: "expert"
  },
  {
    question: "How do you define a Named Window in a SQL statement?",
    shortAnswer: "`SELECT RANK() OVER w, DENSE_RANK() OVER w FROM students WINDOW w AS (PARTITION BY dept_id ORDER BY score DESC);`",
    explanation: "WINDOW clause precedes ORDER BY / LIMIT.",
    hint: "WINDOW window_name AS (PARTITION BY ... ORDER BY ...)",
    level: "expert"
  },
  {
    question: "What is the error code when attempting to use a window function in a `WHERE` clause in MySQL?",
    shortAnswer: "`Error 3593 (HY000): You cannot use the window function 'AVG' in this context.`",
    explanation: "Triggered by illegal clause placement.",
    hint: "Error 3593: Cannot use window function in this context.",
    level: "moderate"
  },
  {
    question: "Can a Window Function operate over a dataset produced by a `GROUP BY` aggregation?",
    shortAnswer: "YES; the Window Function evaluates *after* the `GROUP BY`, allowing you to rank or compute running sums on grouped aggregate totals (e.g. `SUM(SUM(amount)) OVER ()`).",
    explanation: "Nested analytical aggregation across grouped streams.",
    hint: "Yes, Window Functions evaluate after GROUP BY on aggregated output.",
    level: "expert"
  },
  {
    question: "Does the `OVER()` clause modify the physical ordering of the rows in the final result set?",
    shortAnswer: "NO; internal ordering in `OVER (ORDER BY ...)` affects only window calculations; the final output order is governed strictly by the outer query's `ORDER BY` clause.",
    explanation: "Window sorting is isolated to window computation.",
    hint: "No, final output ordering is controlled only by the outer ORDER BY clause.",
    level: "moderate"
  },
  {
    question: "What is the default window frame when `ORDER BY` is present inside `OVER()` without an explicit frame clause?",
    shortAnswer: "`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.",
    explanation: "Produces a cumulative running total rather than a whole-partition aggregate.",
    hint: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
    level: "expert"
  },
  {
    question: "What is the default window frame when `ORDER BY` is NOT present inside `OVER()`?",
    shortAnswer: "`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.",
    explanation: "Computes the aggregate across all rows in the partition.",
    hint: "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.",
    level: "expert"
  },
  {
    question: "Why does adding `ORDER BY` inside `SUM() OVER (...)` change a whole-partition sum into a running total?",
    shortAnswer: "Because `ORDER BY` triggers the default running frame (`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`), summing only up to the current row.",
    explanation: "The presence of ORDER BY activates window framing.",
    hint: "ORDER BY activates the running frame up to CURRENT ROW.",
    level: "expert"
  },
  {
    question: "How do you calculate the percentage of total company revenue contributed by each transaction using a window function?",
    shortAnswer: "`SELECT invoice_id, amount_paid_inr, (amount_paid_inr / SUM(amount_paid_inr) OVER ()) * 100.0 AS rev_percentage FROM fee_payments;`",
    explanation: "Divides row value by global window sum.",
    hint: "(amount / SUM(amount) OVER ()) * 100.0",
    level: "basic"
  },
  {
    question: "Can a Window Function reference columns that are not in the `SELECT` list?",
    shortAnswer: "YES; `PARTITION BY` and `ORDER BY` inside `OVER()` can reference any column present in the source tables or joined relations.",
    explanation: "Full access to source relation attributes.",
    hint: "Yes, can partition and order by any source column.",
    level: "basic"
  },
  {
    question: "How does `EXPLAIN` describe a query containing Window Functions in MySQL 8.0?",
    shortAnswer: "The execution plan displays window operator execution steps (e.g. `Window: <window_spec>` and `Using filesort` for partition/order sorting).",
    explanation: "Shows window evaluation operators.",
    hint: "Displays Window operator and temporary partition sorting steps in EXPLAIN.",
    level: "moderate"
  },
  {
    question: "What is the difference between `AVG(score) OVER (PARTITION BY dept_id)` and a Correlated Subquery `(SELECT AVG(score) FROM students WHERE dept_id = s.dept_id)`?",
    shortAnswer: "The Window Function sorts and computes department averages in a single memory pass; the Correlated Subquery triggers $N$ separate subquery invocations.",
    explanation: "Window functions are significantly more performant and maintainable.",
    hint: "Window function executes in a single pass; correlated subquery runs N times.",
    level: "moderate"
  },
  {
    question: "Can a Window Function be used inside an `UPDATE` statement in MySQL 8.0?",
    shortAnswer: "NOT directly in the `SET` clause; you must compute the window metric inside a CTE and join the CTE in the `UPDATE` statement.",
    explanation: "Wrap window functions in a CTE before updating.",
    hint: "Wrap window function in a CTE and join to the target table in UPDATE.",
    level: "expert"
  },
  {
    question: "What memory buffer is used by MySQL when sorting partitions for Window Functions?",
    shortAnswer: "The `sort_buffer_size` system variable.",
    explanation: "Sizing sort_buffer_size appropriately ensures in-memory window sorting.",
    hint: "Controlled by sort_buffer_size.",
    level: "expert"
  },
  {
    question: "Can Window Functions be combined with `DISTINCT` in the main query?",
    shortAnswer: "YES; `DISTINCT` is evaluated *after* Window Functions, deduplicating the final projected rows.",
    explanation: "Execution order: Window Functions → SELECT → DISTINCT.",
    hint: "Yes, DISTINCT evaluates after Window Functions.",
    level: "moderate"
  },
  {
    question: "How does `COUNT(*) OVER (PARTITION BY dept_id)` help determine department size on every student record?",
    shortAnswer: "It appends the total student count of their department to every individual student's row without collapsing the dataset.",
    explanation: "Provides instant context on group cardinality.",
    hint: "Appends total department headcount to every student record.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Window Functions vs Aggregate Functions?",
    shortAnswer: "Use `GROUP BY` when you need a collapsed summary report with one row per entity; use Window Functions (`OVER()`) when you need to compute analytical benchmarks, rankings, running totals, or percentiles while preserving granular row-level data.",
    explanation: "Authoritative architectural best practices for analytic SQL design.",
    hint: "GROUP BY to collapse rows into summaries; Window Functions to preserve rows while adding analytics.",
    level: "expert"
  }
];

export default questions;
