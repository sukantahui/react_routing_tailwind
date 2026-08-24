// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What is the primary objective of this Capstone Lab for Module 003_001?",
    shortAnswer: "To synthesize all advanced subquery, correlated DML, non-recursive chained CTE, and recursive graph traversal techniques into enterprise production workflows.",
    explanation: "Consolidates all advanced query engineering patterns.",
    hint: "Synthesize subqueries, correlated queries, and recursive/non-recursive CTEs.",
    level: "basic"
  },
  {
    question: "How do you build a 4-stage chained CTE for an Executive Merit Scholarship pipeline?",
    shortAnswer: "Stage 1: Filter active students; Stage 2: Pre-aggregate department average scores; Stage 3: Apply `DENSE_RANK()` partitioned by department; Stage 4: Assign scholarship tiers in the main query.",
    explanation: "Demonstrates modular data processing pipelines.",
    hint: "ActiveStudents -> DeptBenchmarks -> RankedStudents with DENSE_RANK -> Final Scholarship Tiers.",
    level: "moderate"
  },
  {
    question: "Why does `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY score DESC)` inside a CTE outperform correlated subquery ranking?",
    shortAnswer: "Because `DENSE_RANK()` computes all ranks in a single sorted pass ($O(N \\log N)$), whereas a correlated `COUNT(*)` subquery triggers $N$ separate table scans ($O(N^2)$).",
    explanation: "Eliminates quadratic execution overhead.",
    hint: "Single sorted pass (O(N log N)) instead of N separate table scans (O(N^2)).",
    level: "expert"
  },
  {
    question: "How do you resolve multi-tier course prerequisite dependencies using a Recursive CTE?",
    shortAnswer: "The Anchor Member seeds the target course ID, and the Recursive Member climbs upward by joining `courses.prerequisite_id = CTE.course_id` until `prerequisite_id IS NULL`.",
    explanation: "Resolves arbitrary prerequisite chains in a single query.",
    hint: "Anchor starts at target course; recursive member joins prerequisite_id upward.",
    level: "moderate"
  },
  {
    question: "How do you detect all students who have NOT paid their tuition fees in the current semester?",
    shortAnswer: "Use `WHERE NOT EXISTS (SELECT 1 FROM fee_payments p WHERE p.student_id = s.student_id AND p.payment_date >= '2026-06-01')`.",
    explanation: "NULL-immune, high-performance anti-join.",
    hint: "Use WHERE NOT EXISTS on fee_payments within current semester date range.",
    level: "basic"
  },
  {
    question: "How do you zero-fill missing days in daily financial reports using a Recursive CTE?",
    shortAnswer: "Generate a continuous calendar date grid with `WITH RECURSIVE Dates AS (...)` and `LEFT JOIN` against transaction logs, wrapping sums in `COALESCE(sum, 0.00)`.",
    explanation: "Prevents missing days from disappearing from charts and reports.",
    hint: "Generate recursive date grid and LEFT JOIN with COALESCE(SUM(amount), 0.00).",
    level: "basic"
  },
  {
    question: "How do you safely update student standing to 'ACADEMIC_PROBATION' based on department score benchmarks?",
    shortAnswer: "`WITH DeptAvg AS (SELECT dept_id, AVG(exam_score_pct) AS avg_s FROM students GROUP BY dept_id) UPDATE students s JOIN DeptAvg da ON s.dept_id = da.dept_id SET s.academic_standing = 'PROBATION' WHERE s.exam_score_pct < (da.avg_s - 15.0);`",
    explanation: "Avoids Error 1093 by wrapping target table in a CTE.",
    hint: "Use CTE to calculate department averages and join directly in the UPDATE statement.",
    level: "expert"
  },
  {
    question: "Why should you avoid multi-table JOINs across multiple 1:N child tables in a single query?",
    shortAnswer: "Because joining multiple child tables directly causes Cartesian row multiplication (e.g. 3 enrollments $\\times$ 4 payments = 12 duplicate rows), inflating aggregate calculations.",
    explanation: "Pre-aggregate child tables in independent CTEs first.",
    hint: "Causes Cartesian row explosion and inflates financial and count aggregates.",
    level: "expert"
  },
  {
    question: "How do you test and debug intermediate stages of a 4-stage chained CTE?",
    shortAnswer: "Temporarily change the final query from `SELECT * FROM Stage4;` to `SELECT * FROM Stage1;` or `SELECT * FROM Stage2;` to inspect intermediate data sets.",
    explanation: "Allows rapid modular debugging of SQL pipelines.",
    hint: "Query intermediate CTE blocks directly to inspect their output.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu demonstrate the Capstone Lab?",
    shortAnswer: "By running them through the Dean's Scholarship pipeline, validating their prerequisite chains, and calculating their individualized fee collection amortization schedules.",
    explanation: "Demonstrates practical full-cycle student management.",
    hint: "Dean's scholarship ranking + prerequisite chains + fee amortization schedules.",
    level: "basic"
  },
  {
    question: "What is the recommended optimizer hint to control CTE materialization vs merging?",
    shortAnswer: "`/*+ MERGE(cte_name) */` to force inlining, and `/*+ NO_MERGE(cte_name) */` to force temporary table materialization.",
    explanation: "Tuning query execution plans at statement level.",
    hint: "/*+ MERGE(cte) */ or /*+ NO_MERGE(cte) */ hints.",
    level: "expert"
  },
  {
    question: "How do you purge orphan enrollment records using a correlated `NOT EXISTS` query?",
    shortAnswer: "`DELETE FROM enrollments e WHERE NOT EXISTS (SELECT 1 FROM students s WHERE s.student_id = e.student_id);`",
    explanation: "Safe, atomic orphan cleanup.",
    hint: "DELETE FROM enrollments WHERE NOT EXISTS (SELECT 1 FROM students ...)",
    level: "moderate"
  },
  {
    question: "Can a recursive CTE traverse both up and down a tree in the same statement?",
    shortAnswer: "YES; by defining two separate CTEs under `WITH RECURSIVE` (one top-down `Descendants`, one bottom-up `Ancestors`) and joining them in the main query.",
    explanation: "Combines multiple graph traversal directions seamlessly.",
    hint: "Yes, declare two separate recursive CTEs under WITH RECURSIVE.",
    level: "expert"
  },
  {
    question: "How do you calculate the percentage of total department revenue contributed by each student using a CTE?",
    shortAnswer: "`WITH DeptRev AS (SELECT dept_id, SUM(amount_paid_inr) AS total_rev FROM fee_payments p JOIN students s ON p.student_id = s.student_id GROUP BY dept_id) SELECT s.student_name, p.amount_paid_inr, (p.amount_paid_inr / dr.total_rev) * 100.0 AS rev_pct FROM students s JOIN fee_payments p ON s.student_id = p.student_id JOIN DeptRev dr ON s.dept_id = dr.dept_id;`",
    explanation: "Pre-aggregates denominator to compute contribution shares.",
    hint: "Pre-aggregate department revenue in CTE and join to compute percentage share.",
    level: "moderate"
  },
  {
    question: "Why is `CAST()` mandatory on expanding string columns in the Anchor Member of recursive CTEs?",
    shortAnswer: "Because the Anchor Member's column data type and string length fix the schema definition; omitting `CAST()` leads to silent string truncation as path strings grow.",
    explanation: "Allocates buffer capacity for path concatenation.",
    hint: "Omitting CAST fixes the column width to the seed string, causing truncation.",
    level: "expert"
  },
  {
    question: "What is the result of running `EXPLAIN ANALYZE` on a chained CTE in MySQL 8.0?",
    shortAnswer: "It displays the exact execution time, loop counts, and memory/disk materialization statistics for each individual CTE block and join operator.",
    explanation: "Comprehensive execution profiling.",
    hint: "Shows runtime duration, loop iterations, and row counts for each CTE block.",
    level: "expert"
  },
  {
    question: "How do you calculate moving 7-day rolling average revenue using a CTE?",
    shortAnswer: "CTE 1 aggregates daily revenue; CTE 2 uses `AVG(daily_rev) OVER (ORDER BY cal_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.",
    explanation: "Rolling window aggregations in financial time-series.",
    hint: "Aggregate daily revenue in CTE and apply rolling window frame AVG() OVER (...).",
    level: "expert"
  },
  {
    question: "How do you prevent infinite loops when traversing network graphs with cycles?",
    shortAnswer: "Accumulate visited node IDs in a path string (`'/1/4/7/'`) and add a termination guard: `WHERE visited_path NOT LIKE CONCAT('%/', next_node_id, '/%')`.",
    explanation: "Cycle detection predicate in recursive member.",
    hint: "Track visited node IDs in path string and check NOT LIKE before traversing.",
    level: "expert"
  },
  {
    question: "What is the maximum recursion depth allowed by MySQL 8.0?",
    shortAnswer: "`4,294,967,295` iterations (governed by `cte_max_recursion_depth`).",
    explanation: "32-bit unsigned integer maximum limit.",
    hint: "4,294,967,295 iterations.",
    level: "basic"
  },
  {
    question: "How do you tokenize comma-separated values into 1NF rows using a recursive CTE?",
    shortAnswer: "Anchor extracts first token with `SUBSTRING_INDEX(str, ',', 1)` and remainder; Recursive Member repeatedly processes remainder until empty.",
    explanation: "Deconstructs delimited values into atomic rows.",
    hint: "Use SUBSTRING_INDEX() to extract tokens iteratively until string is empty.",
    level: "moderate"
  },
  {
    question: "Can you combine Window Functions and `GROUP BY` inside the same CTE block?",
    shortAnswer: "YES; the Window Function evaluates *after* the `GROUP BY` aggregation, allowing you to rank aggregated department metrics directly.",
    explanation: "Evaluation order: WHERE -> GROUP BY -> HAVING -> WINDOW -> SELECT.",
    hint: "Yes, Window Functions evaluate after GROUP BY aggregations in the execution lifecycle.",
    level: "expert"
  },
  {
    question: "How do you update multiple columns in a table from a CTE calculation in MySQL 8.0?",
    shortAnswer: "`WITH Metrics AS (...) UPDATE students s JOIN Metrics m ON s.id = m.id SET s.total_credits = m.credits, s.gpa = m.calculated_gpa;`",
    explanation: "Multi-column updates using CTE join syntax.",
    hint: "Join CTE in UPDATE statement and assign multiple columns in SET clause.",
    level: "moderate"
  },
  {
    question: "What is the performance difference between a Hash Semi-Join and an Indexed Nested Loop Semi-Join?",
    shortAnswer: "Hash Semi-Join builds an in-memory hash table for non-indexed tables in $O(N + M)$ time; Indexed Semi-Join performs B-Tree lookups in $O(N \\log M)$ time.",
    explanation: "Optimizer chooses based on index availability and table size.",
    hint: "Hash join uses in-memory hash table for non-indexed joins; indexed uses B-Tree seeks.",
    level: "expert"
  },
  {
    question: "How do you write a query that finds all students enrolled in ALL core courses (Relational Division)?",
    shortAnswer: "Use double-nested `NOT EXISTS`: `SELECT s.* FROM students s WHERE NOT EXISTS (SELECT 1 FROM core_courses c WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.id AND e.course_id = c.id));`",
    explanation: "Relational division via universal quantification.",
    hint: "Double-nested NOT EXISTS: student for whom no core course exists that they did not take.",
    level: "expert"
  },
  {
    question: "Why should developers assign clear, domain-specific names to all CTE blocks?",
    shortAnswer: "Because descriptive names make complex multi-stage pipelines self-documenting, accelerating onboarding and reducing maintenance errors.",
    explanation: "Code readability and maintainability best practice.",
    hint: "Self-documenting code improves readability and maintenance velocity.",
    level: "basic"
  },
  {
    question: "How do you generate an Invoice Aging Schedule (Current, 30+, 60+, 90+ days) with a CTE?",
    shortAnswer: "CTE calculates invoice age with `DATEDIFF()`; main query groups by `CASE WHEN age <= 30 THEN 'Current' ... END` and sums balances.",
    explanation: "Accounts receivable aging summary.",
    hint: "Compute age with DATEDIFF() in CTE and aggregate by CASE aging buckets.",
    level: "moderate"
  },
  {
    question: "What happens if you omit the `WHERE` clause in the recursive member of a sequence generator?",
    shortAnswer: "The recursion runs infinitely until aborted by `cte_max_recursion_depth` with Error 3636.",
    explanation: "Runaway recursion loop.",
    hint: "Infinite recursion halted by cte_max_recursion_depth with Error 3636.",
    level: "basic"
  },
  {
    question: "How do you calculate Month-over-Month (MoM) student enrollment growth using chained CTEs?",
    shortAnswer: "CTE 1 aggregates monthly enrollments; CTE 2 uses `LAG()` to pull previous month counts; main query calculates growth percentage.",
    explanation: "Standard 3-stage business intelligence pipeline.",
    hint: "MonthlyCounts CTE -> LaggedCounts with LAG() -> Final Growth % calculation.",
    level: "moderate"
  },
  {
    question: "What is the key takeaway from Module 003_001?",
    shortAnswer: "Subqueries provide isolated filtering and pre-aggregations; CTEs provide linear modular readability; Recursive CTEs unlock dynamic graph traversal and sequence generation without permanent tables.",
    explanation: "The unified paradigm of advanced relational SQL.",
    hint: "Subqueries isolate + CTEs modularize + Recursive CTEs traverse graphs and generate sequences.",
    level: "basic"
  },
  {
    question: "What is the senior architect's final summary rule for Subqueries and CTEs?",
    shortAnswer: "Adopt CTEs for multi-stage queries, pre-aggregate child tables before joining to avoid Cartesian explosions, use Semi-Joins and Anti-Joins (`IN` / `NOT EXISTS`) for presence tests, enforce cycle guards on recursive graphs, and cast anchor columns explicitly.",
    explanation: "Authoritative architectural best practices for modern SQL engineering.",
    hint: "CTEs for pipelines + pre-aggregate child tables + semi/anti-joins + cycle guards + cast anchor columns.",
    level: "expert"
  }
];

export default questions;
