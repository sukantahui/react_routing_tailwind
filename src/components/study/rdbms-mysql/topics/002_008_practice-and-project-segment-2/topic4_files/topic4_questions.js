// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is the primary difference between `RANK()` and `DENSE_RANK()` in MySQL window functions?",
    shortAnswer: "`RANK()` skips subsequent rank numbers when ties occur (e.g. 1, 2, 2, 4), whereas `DENSE_RANK()` leaves no gaps (e.g. 1, 2, 2, 3).",
    explanation: "DENSE_RANK ensures sequential contiguous ranking regardless of duplicate scores.",
    hint: "RANK skips ranks on ties (1, 2, 2, 4); DENSE_RANK does not skip (1, 2, 2, 3).",
    level: "basic"
  },
  {
    question: "What does `PARTITION BY` do inside a window function `OVER (...)` clause?",
    shortAnswer: "It divides the result set into distinct partitions/groups, applying the window calculation independently within each partition without collapsing rows.",
    explanation: "Unlike GROUP BY which aggregates rows, PARTITION BY preserves original row detail.",
    hint: "Divides calculation windows by group while preserving individual rows.",
    level: "basic"
  },
  {
    question: "How does `LAG(col, 1, 0)` work in financial SQL queries?",
    shortAnswer: "It accesses the value of `col` from the preceding row (1 row back) within the current partition, defaulting to 0 if no preceding row exists.",
    explanation: "Essential for calculating Month-over-Month or Year-over-Year growth.",
    hint: "Fetches column value from the previous row.",
    level: "basic"
  },
  {
    question: "What is the difference between `LAG()` and `LEAD()`?",
    shortAnswer: "`LAG()` looks backward at preceding rows, while `LEAD()` looks forward at following rows.",
    explanation: "Both functions allow relative row offset lookups without self-joins.",
    hint: "LAG looks backward; LEAD looks forward.",
    level: "basic"
  },
  {
    question: "What does the `WITH ROLLUP` modifier do when appended to a `GROUP BY` clause?",
    shortAnswer: "It automatically generates multi-level hierarchical subtotal rows and a final grand total row in the aggregate result set.",
    explanation: "Produces super-aggregate summary rows.",
    hint: "Generates hierarchical subtotals and grand totals.",
    level: "moderate"
  },
  {
    question: "Why do subtotal and grand total rows produced by `WITH ROLLUP` contain `NULL` for grouping columns?",
    shortAnswer: "Because those rows represent aggregates across all values of that column; `COALESCE()` is used to replace `NULL` with descriptive labels like 'Subtotal' or 'Grand Total'.",
    explanation: "COALESCE provides user-friendly labels for rollup NULL values.",
    hint: "Rollup uses NULL to denote super-aggregate rows; replace with COALESCE.",
    level: "moderate"
  },
  {
    question: "What is the purpose of `GROUP_CONCAT()` in MySQL?",
    shortAnswer: "It concatenates non-null string values from multiple grouped rows into a single delimited string (e.g. comma-separated list of courses or authors).",
    explanation: "Combines multi-row values into one consolidated cell.",
    hint: "Concatenates values from multiple grouped rows into a single string.",
    level: "basic"
  },
  {
    question: "How do you control the separator and order of items inside `GROUP_CONCAT()`?",
    shortAnswer: "`GROUP_CONCAT(course_name ORDER BY course_name ASC SEPARATOR ' | ')`",
    explanation: "Allows explicit ordering and custom delimiter definitions inside the function.",
    hint: "Use ORDER BY and SEPARATOR clauses inside GROUP_CONCAT.",
    level: "basic"
  },
  {
    question: "What is the difference between `WHERE` and `HAVING` in analytical queries?",
    shortAnswer: "`WHERE` filters individual rows BEFORE aggregation occurs; `HAVING` filters aggregated group summaries AFTER `GROUP BY` execution.",
    explanation: "HAVING can evaluate aggregate expressions like `AVG(score) >= 75`.",
    hint: "WHERE filters rows before aggregation; HAVING filters aggregated groups.",
    level: "basic"
  },
  {
    question: "How do you write a `CASE WHEN` statement to categorize student grades into tiers?",
    shortAnswer: "`CASE WHEN score >= 90 THEN 'A' WHEN score >= 80 THEN 'B' WHEN score >= 70 THEN 'C' ELSE 'F' END AS grade_tier`",
    explanation: "Provides conditional branching logic within SQL SELECT statements.",
    hint: "CASE WHEN score >= 90 THEN 'A' ... ELSE 'F' END",
    level: "basic"
  },
  {
    question: "How do you find the running cumulative sum of fee payments over time per student?",
    shortAnswer: "`SUM(amount_paid_inr) OVER (PARTITION BY student_id ORDER BY payment_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_paid`",
    explanation: "Computes running financial balances incrementally.",
    hint: "SUM(amount) OVER (PARTITION BY student_id ORDER BY payment_date ASC)",
    level: "expert"
  },
  {
    question: "What is a Common Table Expression (CTE) defined with `WITH`?",
    shortAnswer: "A temporary named result set defined at the start of a query that simplifies complex multi-step queries, improves readability, and avoids nested subqueries.",
    explanation: "CTEs make complex analytical queries modular and readable.",
    hint: "A temporary named result set created with the WITH keyword.",
    level: "moderate"
  },
  {
    question: "What is an Anti-Join pattern in SQL?",
    shortAnswer: "A query pattern that uses `LEFT JOIN ... WHERE right_table.id IS NULL` (or `NOT EXISTS`) to find records in the left table that have NO matching rows in the right table.",
    explanation: "Used to find students with zero enrollments or customers with zero orders.",
    hint: "LEFT JOIN with WHERE right_id IS NULL to find non-matching records.",
    level: "moderate"
  },
  {
    question: "How do you calculate Month-over-Month (MoM) revenue growth percentage using a CTE and `LAG()`?",
    shortAnswer: "Compute monthly totals in a CTE, then in the outer query calculate `ROUND(((current - LAG(current)) / LAG(current)) * 100.0, 2)`.",
    explanation: "Standard financial percentage change formula in SQL.",
    hint: "((current_revenue - previous_revenue) / previous_revenue) * 100",
    level: "expert"
  },
  {
    question: "What is the difference between `ROW_NUMBER()` and `DENSE_RANK()`?",
    shortAnswer: "`ROW_NUMBER()` always assigns unique, sequential integer numbers (1, 2, 3, 4) even if rows have identical values, whereas `DENSE_RANK()` assigns the same rank to identical values.",
    explanation: "ROW_NUMBER is deterministic per row ordering.",
    hint: "ROW_NUMBER guarantees unique numbers; DENSE_RANK assigns identical ranks on ties.",
    level: "moderate"
  },
  {
    question: "How do you find the top 2 highest-scoring students in each department?",
    shortAnswer: "Wrap `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY score DESC) AS rnk` inside a CTE or subquery, and filter `WHERE rnk <= 2` in the outer query.",
    explanation: "Window functions cannot be evaluated directly in the WHERE clause of the same query.",
    hint: "Calculate DENSE_RANK in a CTE and filter WHERE rnk <= 2 in outer query.",
    level: "expert"
  },
  {
    question: "Why can't you use window functions like `DENSE_RANK()` directly inside a `WHERE` clause?",
    shortAnswer: "Because the SQL execution order processes `WHERE` clauses BEFORE window functions are evaluated.",
    explanation: "Requires wrapping in a CTE, Subquery, or Derived Table.",
    hint: "WHERE runs before window functions in the SQL execution pipeline.",
    level: "expert"
  },
  {
    question: "What is the SQL logical execution order for a `SELECT` statement with `GROUP BY`, `HAVING`, and `ORDER BY`?",
    shortAnswer: "1. FROM/JOIN → 2. WHERE → 3. GROUP BY → 4. HAVING → 5. Window Functions → 6. SELECT → 7. DISTINCT → 8. ORDER BY → 9. LIMIT.",
    explanation: "Crucial for understanding why aliases cannot be used in WHERE clauses.",
    hint: "FROM → WHERE → GROUP BY → HAVING → WINDOW → SELECT → ORDER BY → LIMIT.",
    level: "expert"
  },
  {
    question: "How do you calculate student age in exact whole years from date of birth (`dob`)?",
    shortAnswer: "`TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)`",
    explanation: "Accurately calculates elapsed years taking leap years and exact birth months into account.",
    hint: "TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)",
    level: "basic"
  },
  {
    question: "What is the purpose of `COALESCE(val1, val2, ...)`?",
    shortAnswer: "It returns the first non-null expression in its argument list, providing fallback default values when NULLs are encountered.",
    explanation: "Prevents NULL values from breaking arithmetic or UI displays.",
    hint: "Returns the first non-null value in the argument list.",
    level: "basic"
  },
  {
    question: "How do you calculate the percentage contribution of each student's fee payment to the branch's total revenue?",
    shortAnswer: "`ROUND((p.amount_paid_inr / SUM(p.amount_paid_inr) OVER (PARTITION BY s.branch_id)) * 100.0, 2) AS contribution_pct`",
    explanation: "Uses an overall partition sum in the denominator without grouping.",
    hint: "amount / SUM(amount) OVER (PARTITION BY branch_id) * 100",
    level: "expert"
  },
  {
    question: "How do you find students who enrolled in BOTH 'React.js' AND 'Python' courses?",
    shortAnswer: "Filter `WHERE course_code IN ('REACT-01', 'PYTHON-03') GROUP BY student_id HAVING COUNT(DISTINCT course_code) = 2;` (or use `INTERSECT`).",
    explanation: "Classic relational division / multi-category matching pattern.",
    hint: "GROUP BY student_id HAVING COUNT(DISTINCT course_code) = 2.",
    level: "moderate"
  },
  {
    question: "How do you find students who enrolled in 'React.js' but NEVER enrolled in 'Java'?",
    shortAnswer: "Use `LEFT JOIN enrollments e2 ON e1.student_id = e2.student_id AND e2.course_code = 'JAVA-02' WHERE e1.course_code = 'REACT-01' AND e2.enrollment_id IS NULL;`",
    explanation: "Classic relational exclusion / anti-join query.",
    hint: "Filter for React enrollment with LEFT JOIN on Java WHERE second enrollment is NULL.",
    level: "moderate"
  },
  {
    question: "What is the difference between `COUNT(*)` and `COUNT(column_name)`?",
    shortAnswer: "`COUNT(*)` counts all rows in the group including rows with NULLs, whereas `COUNT(column_name)` counts only rows where `column_name IS NOT NULL`.",
    explanation: "COUNT(col) ignores NULL values.",
    hint: "COUNT(*) counts all rows; COUNT(col) ignores NULL values.",
    level: "basic"
  },
  {
    question: "How do you calculate moving 3-month average revenue using window frames?",
    shortAnswer: "`AVG(monthly_rev) OVER (ORDER BY payment_month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_3m_avg`",
    explanation: "Smooths seasonal revenue spikes using a sliding window frame.",
    hint: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
    level: "expert"
  },
  {
    question: "How do queries for Mamata, Susmita, Abhronila, and Debangshu illustrate analytical reporting?",
    shortAnswer: "By calculating department rankings, calculating dynamic scholarships based on exam score tiers, and computing fee payment clearance ratios in a single unified report.",
    explanation: "Demonstrates multi-table analytical synthesis across academic dimensions.",
    hint: "Combines rankings, fee settlements, and scholarship tiers across student cohorts.",
    level: "basic"
  },
  {
    question: "What is the performance implication of using `WITH ROLLUP` on large tables?",
    shortAnswer: "It requires generating multiple group aggregations in a single pass, which is significantly faster than executing multiple separate `UNION ALL` queries.",
    explanation: "Single table scan for hierarchical aggregation.",
    hint: "Computes subtotals in a single pass, much faster than multiple UNION queries.",
    level: "moderate"
  },
  {
    question: "What index optimizes queries filtering by `dept_id` and calculating `AVG(exam_score_pct)`?",
    shortAnswer: "A composite covering index on `students(dept_id, student_id)` and `enrollments(student_id, exam_score_pct)`.",
    explanation: "Enables index-only scans without accessing disk data pages.",
    hint: "Covering composite indexes on join and filter columns.",
    level: "expert"
  },
  {
    question: "What is the purpose of `NTILE(4) OVER (ORDER BY score DESC)`?",
    shortAnswer: "It divides the ranked rows into 4 equal-sized quartiles (e.g. Quartile 1 = Top 25%, Quartile 4 = Bottom 25%).",
    explanation: "Useful for percentile and cohort segmentations.",
    hint: "Divides ordered rows into equal-sized buckets (quartiles).",
    level: "expert"
  },
  {
    question: "What is the key takeaway from the Complex SQL Query Writing Challenges?",
    shortAnswer: "Mastering the interplay between multi-table JOINs, GROUP BY aggregations, CTEs, and window functions enables solving any enterprise analytical reporting challenge with concise, high-performance SQL.",
    explanation: "Synthesizes advanced SQL dialect tools into production-ready analytical pipelines.",
    hint: "Multi-table JOINs + GROUP BY + CTEs + Window functions = Enterprise SQL Mastery.",
    level: "expert"
  }
];

export default questions;
