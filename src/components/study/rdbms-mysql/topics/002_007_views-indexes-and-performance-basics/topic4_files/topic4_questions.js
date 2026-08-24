// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What defines a 'Complex View' in SQL?",
    shortAnswer: "A complex view is a virtual relation that incorporates multi-table `JOIN` operations, aggregate functions (`SUM`, `AVG`), `GROUP BY` clauses, or computed expressions.",
    explanation: "Unlike simple single-table views, complex views assemble data from multiple relational entities.",
    hint: "A view with multi-table joins, GROUP BY, aggregations, and calculated columns.",
    level: "basic"
  },
  {
    question: "Are complex views that include `GROUP BY` and aggregate functions updatable in MySQL?",
    shortAnswer: "NO. Views containing `GROUP BY` or aggregations are strictly read-only (`IS_UPDATABLE = 'NO'`).",
    explanation: "Aggregated rows combine multiple underlying physical tuples, making deterministic reverse-mapping impossible.",
    hint: "No; GROUP BY and aggregations make views strictly read-only.",
    level: "basic"
  },
  {
    question: "Why should you use `COALESCE(SUM(payments.amount), 0.00)` in a multi-table view with `LEFT JOIN`?",
    shortAnswer: "Because students or entities with zero payments produce `NULL` via `LEFT JOIN`; `COALESCE` guarantees a clean numeric `0.00` instead of `NULL`.",
    explanation: "Prevents arithmetic failures and NULL propagation in downstream reporting calculations.",
    hint: "Replaces NULL with 0.00 for entities that have no matching joined records.",
    level: "basic"
  },
  {
    question: "How do you prevent Division by Zero errors in derived percentage columns inside a view?",
    shortAnswer: "Use `NULLIF(denominator, 0)` (e.g. `(paid / NULLIF(total_fee, 0)) * 100`).",
    explanation: "NULLIF returns NULL when the denominator is zero, preventing SQL Error 1365 (Division by zero) in strict mode.",
    hint: "Wrap the denominator in NULLIF(denominator, 0).",
    level: "moderate"
  },
  {
    question: "Can a `CASE` expression be used to create categorical derived columns inside a view?",
    shortAnswer: "YES. Views frequently use `CASE ... WHEN ... THEN ... END` to compute dynamic status labels (e.g. 'CLEARED', 'DUE').",
    explanation: "CASE expressions are evaluated dynamically on each row projected by the view.",
    hint: "Yes; CASE statements can project computed categorical columns.",
    level: "basic"
  },
  {
    question: "What MySQL algorithm is automatically used when evaluating a view containing `GROUP BY` and aggregations?",
    shortAnswer: "`ALGORITHM = TEMPTABLE`",
    explanation: "MySQL creates an internal temporary table in memory to hold the grouped and aggregated rows.",
    hint: "ALGORITHM = TEMPTABLE",
    level: "moderate"
  },
  {
    question: "Can a view definition contain a Common Table Expression (CTE) using the `WITH` clause in MySQL 8.0+?",
    shortAnswer: "YES. MySQL 8.0+ supports CTEs directly within `CREATE VIEW` statements for modular analytical pipelines.",
    explanation: "WITH clauses allow structuring multi-step aggregations cleanly before the final view SELECT.",
    hint: "Yes; MySQL 8.0 supports WITH clause CTEs inside CREATE VIEW.",
    level: "moderate"
  },
  {
    question: "What is the requirement of the `ONLY_FULL_GROUP_BY` SQL mode when defining a grouped view?",
    shortAnswer: "Every non-aggregated column listed in the `SELECT` list must be explicitly included in the `GROUP BY` clause (unless functionally dependent on a primary key).",
    explanation: "Prevents non-deterministic values from being chosen arbitrarily by the database engine.",
    hint: "All non-aggregated SELECT columns must appear in the GROUP BY clause.",
    level: "expert"
  },
  {
    question: "Can a complex view join tables across different schemas on the same MySQL server?",
    shortAnswer: "YES: `SELECT * FROM academy_db.students s JOIN finance_db.invoices i ON s.id = i.student_id;`",
    explanation: "Cross-schema qualified naming is fully supported in view definitions.",
    hint: "Yes; use schema_name.table_name syntax inside the view.",
    level: "moderate"
  },
  {
    question: "How does querying a complex view affect memory consumption on high-traffic database servers?",
    shortAnswer: "Because `TEMPTABLE` views materialize rows in RAM (using the TempTable or Memory storage engine), concurrent queries on heavy views increase server memory usage.",
    explanation: "Excessive temporary table materialization can spill to disk (`tmpdir`) if memory limits are exceeded.",
    hint: "Materializes temporary tables in RAM, increasing server memory overhead.",
    level: "expert"
  },
  {
    question: "Can you use window functions (like `ROW_NUMBER()`, `RANK()`, `LAG()`) inside a `CREATE VIEW` statement in MySQL 8.0+?",
    shortAnswer: "YES. Window functions can be embedded inside views to pre-package ranking and time-series calculations.",
    explanation: "Views support all standard ANSI SQL analytical functions in MySQL 8.0+.",
    hint: "Yes; window functions like ROW_NUMBER and LAG work inside views.",
    level: "moderate"
  },
  {
    question: "What happens if a complex view joins 5 tables, but an outer query only requests columns from Table 1 and Table 2?",
    shortAnswer: "If the joins are `INNER JOIN` or affect row multiplicity, MySQL must evaluate all 5 tables unless Table Elimination can prove non-referenced tables do not alter results.",
    explanation: "Unreferenced joins can cause unnecessary I/O overhead unless eliminated by the optimizer.",
    hint: "MySQL may still execute all 5 joins unless the optimizer can safely eliminate them.",
    level: "expert"
  },
  {
    question: "What is the difference between a simple view and a complex view regarding data modifications?",
    shortAnswer: "Simple views allow direct DML (`INSERT`/`UPDATE`/`DELETE`) to the base table, whereas complex views (with joins/aggregations) are generally read-only.",
    explanation: "Complex views lack a 1-to-1 deterministic row mapping to a single underlying base table.",
    hint: "Simple views allow DML writes; complex views are read-only.",
    level: "basic"
  },
  {
    question: "How do you calculate a student's outstanding fee balance inside a complex view?",
    shortAnswer: "`(enrollments.course_fee_inr - COALESCE(SUM(fee_payments.amount_inr), 0.00)) AS outstanding_balance_inr`",
    explanation: "Subtracts the aggregated sum of payments from the fixed course fee.",
    hint: "course_fee - COALESCE(SUM(payment_amount), 0)",
    level: "basic"
  },
  {
    question: "Can you create a view that calculates running totals using window functions?",
    shortAnswer: "YES: `CREATE VIEW v AS SELECT date, amount, SUM(amount) OVER (ORDER BY date) AS running_total FROM txns;`",
    explanation: "The OVER clause evaluates cumulative sums dynamically across the ordered stream.",
    hint: "Yes; use SUM(amount) OVER (ORDER BY date).",
    level: "moderate"
  },
  {
    question: "What happens if an underlying column data type is changed from `INT` to `BIGINT` in a table referenced by a complex view?",
    shortAnswer: "The view definition remains valid, but depending on MySQL version, it may need to be recompiled (`CREATE OR REPLACE VIEW`) to reflect the updated metadata.",
    explanation: "DDL changes in base tables can cause metadata discrepancies if views are not re-evaluated.",
    hint: "The view should be re-created with CREATE OR REPLACE VIEW to update metadata.",
    level: "expert"
  },
  {
    question: "Why should you avoid creating a complex view that nests 5 other complex views in production?",
    shortAnswer: "Deep view nesting ('view stacking') prevents the query optimizer from finding efficient index access paths, creates nested temporary tables, and kills query performance.",
    explanation: "Deep nesting creates opaque query trees that degrade database throughput.",
    hint: "Causes nested temporary tables, opaque execution plans, and severe slowdowns.",
    level: "expert"
  },
  {
    question: "How can you format timestamps into human-readable strings inside a complex view?",
    shortAnswer: "Use `DATE_FORMAT(timestamp_col, '%d-%b-%Y %h:%i %p') AS formatted_date`.",
    explanation: "DATE_FORMAT transforms raw datetime values into localized presentation strings.",
    hint: "Use DATE_FORMAT(col, format_string).",
    level: "basic"
  },
  {
    question: "Can a complex view use `GROUP_CONCAT()` to list all enrolled course names in a single comma-separated column?",
    shortAnswer: "YES: `GROUP_CONCAT(c.course_title ORDER BY c.course_title SEPARATOR ', ') AS courses_enrolled`",
    explanation: "GROUP_CONCAT aggregates multiple row values into a single string per group.",
    hint: "Yes; use GROUP_CONCAT(col SEPARATOR ', ').",
    level: "basic"
  },
  {
    question: "What is the maximum string length produced by `GROUP_CONCAT()` in a complex view by default?",
    shortAnswer: "1024 bytes (controlled by the `group_concat_max_len` system variable).",
    explanation: "Longer concatenated strings are truncated unless `group_concat_max_len` is increased.",
    hint: "Default limit is 1024 bytes.",
    level: "moderate"
  },
  {
    question: "Can you filter grouped data inside a complex view definition using the `HAVING` clause?",
    shortAnswer: "YES: `HAVING COUNT(en.student_id) >= 5` to filter only high-volume batches.",
    explanation: "HAVING filters aggregate group results after the GROUP BY evaluation.",
    hint: "Yes; use HAVING to filter aggregated groups in view definitions.",
    level: "basic"
  },
  {
    question: "How do you calculate a rolling average inside a complex view?",
    shortAnswer: "`AVG(daily_sales) OVER (ORDER BY sales_date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7day_avg`",
    explanation: "Window framing calculates moving statistical aggregations across sliding intervals.",
    hint: "Use AVG(...) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW).",
    level: "expert"
  },
  {
    question: "Can a complex view include subqueries in the `WHERE` clause?",
    shortAnswer: "YES. For example: `WHERE s.student_id IN (SELECT student_id FROM scholarship_awards)`.",
    explanation: "Subqueries in WHERE clauses are fully supported inside view definitions.",
    hint: "Yes; WHERE clause subqueries are permitted in views.",
    level: "basic"
  },
  {
    question: "What is the primary benefit of encapsulating complex multi-table analytical joins into a single view for BI dashboards?",
    shortAnswer: "It creates a single, clean semantic layer; business analysts query the view without needing to understand table foreign keys, complex join logic, or null handling.",
    explanation: "Abstracts relational complexity into intuitive business metrics.",
    hint: "Provides a simplified semantic layer for business analysts and reporting tools.",
    level: "basic"
  },
  {
    question: "Why should you always test complex views with `EXPLAIN` before deploying them to production?",
    shortAnswer: "To inspect the query execution plan, check join order, identify temporary table usage (`Using temporary; Using filesort`), and verify that base table indexes are utilized.",
    explanation: "EXPLAIN identifies expensive query bottlenecks before they affect production users.",
    hint: "To verify index usage and identify temporary table or filesort bottlenecks.",
    level: "expert"
  },
  {
    question: "Can a complex view use `DISTINCT` across multiple columns?",
    shortAnswer: "YES: `SELECT DISTINCT s.centre_city, c.course_title FROM students s ...`",
    explanation: "DISTINCT eliminates duplicate rows from the view's projected output.",
    hint: "Yes; DISTINCT can be used on multiple projected columns.",
    level: "basic"
  },
  {
    question: "What happens if a complex view references a column that is later renamed in one of the 4 joined base tables?",
    shortAnswer: "The view becomes invalid and any query against the view fails with Error 1054 (`Unknown column in field list`).",
    explanation: "Views are not automatically updated when underlying table columns change.",
    hint: "The view breaks and throws Error 1054 until updated.",
    level: "moderate"
  },
  {
    question: "How do you calculate student pass/fail percentages dynamically inside a course performance view?",
    shortAnswer: "`ROUND((SUM(CASE WHEN marks >= 50 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0)) * 100, 2) AS pass_rate_pct`",
    explanation: "Conditional summation with CASE combined with NULLIF division protection.",
    hint: "Use SUM(CASE WHEN marks >= 50 THEN 1 ELSE 0 END) / COUNT(*).",
    level: "expert"
  },
  {
    question: "Can a complex view be queried by another database stored procedure or function?",
    shortAnswer: "YES. Stored routines (procedures, functions, triggers) can query complex views just like standard tables.",
    explanation: "Views are fully accessible to all server-side procedural SQL routines.",
    hint: "Yes; stored procedures and functions can query views seamlessly.",
    level: "basic"
  },
  {
    question: "What is the senior developer's golden rule for complex view architecture?",
    shortAnswer: "Keep joins lean and purposeful, guard all nullable sums and divisions, enforce ONLY_FULL_GROUP_BY compliance, and avoid deep view-on-view nesting.",
    explanation: "Ensures reliable, high-performance, and maintainable enterprise reporting schemas.",
    hint: "Lean joins, safe division/null handling, and flat view structures.",
    level: "expert"
  }
];

export default questions;
