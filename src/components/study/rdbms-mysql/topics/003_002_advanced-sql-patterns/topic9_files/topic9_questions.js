// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the modern standard ANSI SQL design pattern to find the Top N records per category in MySQL 8.0?",
    shortAnswer: "Compute ranks inside a Common Table Expression (CTE) using `DENSE_RANK()` or `ROW_NUMBER()` with `PARTITION BY`, and filter `WHERE rank_col <= N` in the outer query.",
    explanation: "Eliminates slow quadratic correlated subqueries.",
    hint: "CTE with PARTITION BY and outer query filtering WHERE rank <= N.",
    level: "basic"
  },
  {
    question: "Why were legacy pre-MySQL 8.0 correlated subqueries for Top-N per category slow on large datasets?",
    shortAnswer: "Because they executed $N$ separate subquery invocations (evaluating `WHERE (SELECT COUNT(*) FROM t2 WHERE t2.dept = t1.dept AND t2.score > t1.score) < N`), resulting in quadratic $O(N^2)$ execution complexity.",
    explanation: "Nested loop scan across the entire dataset.",
    hint: "Quadratic O(N^2) complexity due to N separate subquery executions.",
    level: "expert"
  },
  {
    question: "Why were MySQL 5.7 session variables (`@rn := CASE ...`) deprecated for Top-N ranking in MySQL 8.0?",
    shortAnswer: "Because SQL statement evaluation order for user variables is non-deterministic and explicitly deprecated in MySQL 8.0, often producing incorrect ranks under modern query optimizer rewrites.",
    explanation: "Non-deterministic execution semantics.",
    hint: "Session variable assignment order is non-deterministic and deprecated in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "What is the difference between using `DENSE_RANK() <= 2` vs `ROW_NUMBER() <= 2` for Top-2 per category?",
    shortAnswer: "`DENSE_RANK()` returns Top 2 score tiers (which may return 3+ rows if students tie for 2nd place), whereas `ROW_NUMBER()` guarantees exactly 2 physical rows per category.",
    explanation: "Tier thresholds vs exact row counts.",
    hint: "DENSE_RANK includes tied students; ROW_NUMBER returns exactly 2 rows.",
    level: "basic"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu illustrate Top 1 per Department?",
    shortAnswer: "Partitioning by `dept_id` and filtering `WHERE dept_rank = 1` returns Mamata Hui (94.50%) for Computer Science and Abhronila Saha (96.20%) for Information Technology in a single sorted pass.",
    explanation: "Picks top student from each department partition.",
    hint: "Returns Mamata for CS (94.5%) and Abhronila for IT (96.2%).",
    level: "basic"
  },
  {
    question: "How do you ensure that `ROW_NUMBER()` produces deterministic results when ties exist in Top-N queries?",
    shortAnswer: "Add the primary key as a secondary tie-breaker in `ORDER BY`: `OVER (PARTITION BY dept_id ORDER BY score DESC, student_id ASC)`.",
    explanation: "Guarantees reproducible top-N row selection.",
    hint: "Add primary key as secondary tie-breaker in ORDER BY.",
    level: "moderate"
  },
  {
    question: "How do you find the 3 most recent fee payments for EVERY student in the academy?",
    shortAnswer: "`WITH RankedPayments AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY payment_date DESC) AS rn FROM fee_payments) SELECT * FROM RankedPayments WHERE rn <= 3;`",
    explanation: "Top-N recent transactions per entity.",
    hint: "Partition by student_id, order by payment_date DESC, filter rn <= 3 in CTE.",
    level: "basic"
  },
  {
    question: "What index optimizes `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC)`?",
    shortAnswer: "A composite B-Tree index on `(dept_id, exam_score_pct DESC)`.",
    explanation: "Allows streaming rows directly from index in sorted partition order with 0 filesort.",
    hint: "Composite index on (dept_id, exam_score_pct DESC).",
    level: "expert"
  },
  {
    question: "What happens if a department contains fewer than $N$ students (e.g. only 1 student in a Top-3 query)?",
    shortAnswer: "The query returns all available students in that department (1 student) without throwing an error.",
    explanation: "Window functions gracefully handle small partitions.",
    hint: "Returns all available students for that department.",
    level: "basic"
  },
  {
    question: "Can a Top-N per category query be written using a Derived Table instead of a CTE?",
    shortAnswer: "YES; `SELECT * FROM (SELECT *, DENSE_RANK() OVER (...) AS rnk FROM students) dt WHERE dt.rnk <= N;` is functionally identical.",
    explanation: "Derived table alternative to CTE.",
    hint: "Yes, derived tables in FROM clause are functionally equivalent.",
    level: "basic"
  },
  {
    question: "How do you find the Top 2 highest-priced courses in EACH academic category?",
    shortAnswer: "`WITH RankedCourses AS (SELECT *, DENSE_RANK() OVER (PARTITION BY category_id ORDER BY course_fee DESC) AS rnk FROM courses) SELECT * FROM RankedCourses WHERE rnk <= 2;`",
    explanation: "Top-N pricing tiers per category.",
    hint: "Partition by category_id, order by course_fee DESC, filter rnk <= 2.",
    level: "basic"
  },
  {
    question: "What is the time complexity of the Window CTE Top-N query compared to legacy subqueries?",
    shortAnswer: "Window CTE runs in $O(N \\log N)$ (or $O(N)$ with an index), whereas legacy subqueries run in $O(N^2)$ quadratic time.",
    explanation: "Exponential performance upgrade on large tables.",
    hint: "O(N log N) vs O(N^2) quadratic nested loops.",
    level: "expert"
  },
  {
    question: "Can multiple ranking metrics (Top 1 by Score AND Top 1 by Attendance) be filtered in the same query?",
    shortAnswer: "YES; compute `score_rank` and `attendance_rank` in the CTE and filter `WHERE score_rank = 1 OR attendance_rank = 1`.",
    explanation: "Multi-dimensional Top-N selection.",
    hint: "Yes, compute multiple rank columns in the CTE and filter in the outer WHERE clause.",
    level: "moderate"
  },
  {
    question: "Why can't you write `SELECT * FROM students WHERE DENSE_RANK() OVER (...) <= 2` directly?",
    shortAnswer: "Because `WHERE` executes at Phase 2 of query processing before window partitions are established and ranked at Phase 5 (Error 3593).",
    explanation: "Fundamental SQL clause execution order rule.",
    hint: "WHERE executes before window functions are calculated.",
    level: "basic"
  },
  {
    question: "How do you find the Top 1 most expensive invoice per customer including tied invoices?",
    shortAnswer: "`WITH RankedInvoices AS (SELECT *, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC) AS rnk FROM invoices) SELECT * FROM RankedInvoices WHERE rnk = 1;`",
    explanation: "DENSE_RANK preserves tied max invoices.",
    hint: "Use DENSE_RANK() = 1 partitioned by customer_id.",
    level: "basic"
  },
  {
    question: "How do you find exactly ONE latest login log per student (strictly 1 row per student)?",
    shortAnswer: "`WITH LatestLogins AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY login_time DESC, log_id DESC) AS rn FROM login_logs) SELECT * FROM LatestLogins WHERE rn = 1;`",
    explanation: "ROW_NUMBER guarantees exactly 1 row per partition.",
    hint: "Use ROW_NUMBER() = 1 with primary key tie-breaker.",
    level: "moderate"
  },
  {
    question: "How does `QUALIFY` compare in Snowflake/Databricks vs MySQL 8.0 support for Top-N filtering?",
    shortAnswer: "Some cloud warehouses support `QUALIFY ROW_NUMBER() OVER (...) <= 2` directly; MySQL 8.0 does not support `QUALIFY` and requires wrapping the window function in a CTE or derived table.",
    explanation: "Engine-specific syntax distinction.",
    hint: "MySQL 8.0 requires a CTE or derived table; QUALIFY is not supported.",
    level: "expert"
  },
  {
    question: "How do you find the Top 3 best-selling products by quantity in each store branch?",
    shortAnswer: "`WITH StoreSales AS (SELECT branch_id, product_id, SUM(qty) AS total_qty, DENSE_RANK() OVER (PARTITION BY branch_id ORDER BY SUM(qty) DESC) AS sales_rank FROM sales GROUP BY branch_id, product_id) SELECT * FROM StoreSales WHERE sales_rank <= 3;`",
    explanation: "Top-N over grouped aggregate sales streams.",
    hint: "GROUP BY store and product, then rank total quantity sold.",
    level: "expert"
  },
  {
    question: "Can a Top-N per category query be encapsulated inside a MySQL View?",
    shortAnswer: "YES; `CREATE VIEW v_top2_students_per_dept AS WITH Ranked AS (...) SELECT * FROM Ranked WHERE rnk <= 2;` is fully valid in MySQL 8.0.",
    explanation: "Views can encapsulate window CTEs.",
    hint: "Yes, Views can encapsulate window CTE queries.",
    level: "basic"
  },
  {
    question: "What happens if `RANK() <= 2` is used when 3 students are tied for 1st place?",
    shortAnswer: "All 3 tied students receive rank `1` (which is $\\le 2$) and are returned; however, rank `2` is skipped, so no 2nd place student is returned.",
    explanation: "Standard sports rank gap behavior.",
    hint: "All 3 tied students are returned because rank 1 <= 2.",
    level: "expert"
  },
  {
    question: "How do you find the bottom 2 lowest performing students in EACH department (Bottom N)?",
    shortAnswer: "Order by score ASCENDING: `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct ASC)` and filter `WHERE rnk <= 2`.",
    explanation: "Bottom-N query using ascending order.",
    hint: "Order by score ASC and filter rnk <= 2.",
    level: "basic"
  },
  {
    question: "How do you find the Top 2 departments with the highest total revenue in the entire company?",
    shortAnswer: "First group by department to sum revenue, then rank departments globally with `DENSE_RANK() OVER (ORDER BY SUM(revenue) DESC)` and filter `WHERE rnk <= 2`.",
    explanation: "Top-N categories overall.",
    hint: "GROUP BY dept, rank sum(revenue) DESC, filter rnk <= 2.",
    level: "moderate"
  },
  {
    question: "Can a Top-N query be combined with a `JOIN` to lookup department names?",
    shortAnswer: "YES; perform the `JOIN` either inside the CTE or in the outer query on the filtered Top-N result set.",
    explanation: "Standard relational join combination.",
    hint: "Yes, join to lookup tables inside the CTE or in the outer query.",
    level: "basic"
  },
  {
    question: "How do you optimize a Top-1 per category query on a billion-row table?",
    shortAnswer: "Ensure a composite index on `(category_id, date DESC)` exists, allowing MySQL to perform a loose index scan or rapid index seek per group.",
    explanation: "Index-only scan optimization.",
    hint: "Composite index on (category_id, sort_column DESC).",
    level: "expert"
  },
  {
    question: "How do you find the 2nd highest salary in EACH department without returning the 1st highest?",
    shortAnswer: "`WITH RankedSalaries AS (SELECT *, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk FROM employees) SELECT * FROM RankedSalaries WHERE rnk = 2;`",
    explanation: "Exact N-th rank per category.",
    hint: "Filter WHERE rnk = 2 in CTE.",
    level: "basic"
  },
  {
    question: "Can `NTILE()` be used for Top-N queries?",
    shortAnswer: "No, `NTILE()` divides data into percentage buckets (e.g. quartiles), not fixed Top-N counts.",
    explanation: "NTILE is for percentiles; DENSE_RANK/ROW_NUMBER is for Top-N.",
    hint: "No, use DENSE_RANK or ROW_NUMBER for Top-N queries.",
    level: "basic"
  },
  {
    question: "What is the memory benefit of the Window CTE Top-N approach over self-joins in MySQL?",
    shortAnswer: "It streams rows sequentially in partition order, requiring zero duplicate table scans and zero quadratic memory buffers.",
    explanation: "Linear memory footprint.",
    hint: "Zero duplicate table scans and linear memory footprint.",
    level: "expert"
  },
  {
    question: "How do you display the Top 3 students per department and also show the gap between each student and the department topper?",
    shortAnswer: "Compute `DENSE_RANK()` and `FIRST_VALUE(score) - score` in the same CTE, and filter `WHERE dept_rank <= 3`.",
    explanation: "Combines ranking and boundary window functions in one CTE.",
    hint: "Compute DENSE_RANK and FIRST_VALUE gap in the same CTE.",
    level: "moderate"
  },
  {
    question: "Can Top-N per category queries be used in `UPDATE` or `DELETE` statements?",
    shortAnswer: "YES; identify IDs of non-top records (`WHERE rn > N`) in a CTE and delete them via multi-table `DELETE`.",
    explanation: "Batch purge of non-top records.",
    hint: "Yes, use CTE with multi-table DELETE to purge records outside Top N.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Finding Top N Records Per Category?",
    shortAnswer: "Always use the ANSI SQL Window CTE pattern with `DENSE_RANK() <= N` (for distinct score/value tiers) or `ROW_NUMBER() <= N` (for exact physical row counts with a primary key tie-breaker), and support it with a composite index on `(category_col, sort_col DESC)` to eliminate filesort overhead.",
    explanation: "Authoritative architectural best practices for Top-N per category query design.",
    hint: "Window CTE + DENSE_RANK for tiers / ROW_NUMBER for exact counts + composite index on (category, sort DESC).",
    level: "expert"
  }
];

export default questions;
