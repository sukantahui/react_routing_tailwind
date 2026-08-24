// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is 'Pivoting' (Crosstab) in relational database queries?",
    shortAnswer: "Transforming row-level records into column-oriented summary matrices by rotating unique categorical row values into dedicated columns.",
    explanation: "Standard matrix reporting format.",
    hint: "Rotating row values into dedicated columns.",
    level: "basic"
  },
  {
    question: "Does MySQL have a native `PIVOT` keyword like SQL Server or Oracle?",
    shortAnswer: "NO; in MySQL, pivoting is performed using Conditional Aggregation (`SUM(CASE WHEN ...)` or `MAX(CASE WHEN ...)` with `GROUP BY`).",
    explanation: "Conditional aggregation provides universal ANSI SQL pivoting in MySQL.",
    hint: "No, MySQL uses SUM/MAX with CASE inside GROUP BY.",
    level: "basic"
  },
  {
    question: "Why is `MAX(CASE WHEN ...)` commonly used instead of `SUM()` when pivoting text or single numeric values?",
    shortAnswer: "Because `MAX()` ignores `NULL`s and extracts the single non-NULL value for that specific category in the grouped row.",
    explanation: "Picks the matching value while ignoring NULLs from other categories.",
    hint: "MAX() ignores NULLs and extracts the matching category value.",
    level: "basic"
  },
  {
    question: "How do student marks for Mamata, Susmita, Abhronila, and Debangshu illustrate Pivoting?",
    shortAnswer: "Row-level records `(Mamata, CS, 94.50)` and `(Mamata, IT, 90.00)` are pivoted into a single row `(Mamata | CS: 94.50 | IT: 90.00 | Total: 184.50)`.",
    explanation: "Demonstrates row-to-column matrix rotation.",
    hint: "Consolidates multiple subject rows into a single report card row with subject columns.",
    level: "basic"
  },
  {
    question: "How do you count student attendance statuses (Present, Absent, Late) in separate columns?",
    shortAnswer: "`SELECT student_id, SUM(CASE WHEN status='Present' THEN 1 ELSE 0 END) AS present_days, SUM(CASE WHEN status='Absent' THEN 1 ELSE 0 END) AS absent_days FROM attendance GROUP BY student_id;`",
    explanation: "Conditional COUNT simulation using SUM of 1/0 flags.",
    hint: "SUM(CASE WHEN status='Present' THEN 1 ELSE 0 END)",
    level: "basic"
  },
  {
    question: "What is 'Unpivoting' in SQL?",
    shortAnswer: "The reverse of pivoting: converting a wide table with multiple columns into normalized rows with fewer columns (Attribute-Value pairs).",
    explanation: "Normalizes wide matrix data back into relational rows.",
    hint: "Converting wide columns back into normalized rows.",
    level: "basic"
  },
  {
    question: "How do you unpivot columns in MySQL 8.0?",
    shortAnswer: "Using `UNION ALL` across separate SELECT statements that project each column into a standardized row attribute.",
    explanation: "The standard ANSI SQL unpivoting design pattern.",
    hint: "Use UNION ALL to stack columns into rows.",
    level: "moderate"
  },
  {
    question: "How do you pivot monthly fee collections for 12 months (Jan to Dec) across campus branches?",
    shortAnswer: "`SELECT branch_city, SUM(CASE WHEN MONTH(date)=1 THEN amount ELSE 0 END) AS jan_rev, SUM(CASE WHEN MONTH(date)=2 THEN amount ELSE 0 END) AS feb_rev ... FROM payments GROUP BY branch_city;`",
    explanation: "Classic 12-month financial crosstab query.",
    hint: "SUM(CASE WHEN MONTH(date)=X THEN amount ELSE 0 END) for each month.",
    level: "moderate"
  },
  {
    question: "What happens if an `ELSE` clause is omitted in `MAX(CASE WHEN ... END)` during pivoting?",
    shortAnswer: "The `CASE` expression defaults to returning `NULL` for non-matching categories, which `MAX()` safely ignores.",
    explanation: "Default CASE behavior returns NULL.",
    hint: "Defaults to NULL, which MAX() ignores.",
    level: "moderate"
  },
  {
    question: "How do you calculate row-level grand totals across pivoted columns?",
    shortAnswer: "In the same `GROUP BY` statement, include `SUM(amount)` or `AVG(score)` without a `CASE` condition to sum all categories for that entity.",
    explanation: "Row-level summary metric alongside pivoted columns.",
    hint: "Include unconditional SUM(amount) or AVG(score) in the SELECT list.",
    level: "basic"
  },
  {
    question: "Can Dynamic Pivoting (where column names are created automatically from database rows) be done in static SQL?",
    shortAnswer: "NO; standard SQL requires column names and counts to be known at parse time; dynamic pivoting requires building a SQL string in a Stored Procedure with `PREPARE` and `EXECUTE`.",
    explanation: "Relational parse-time column definition rule.",
    hint: "Static SQL requires fixed columns; dynamic pivoting requires Prepared Statements.",
    level: "expert"
  },
  {
    question: "How do you build a Dynamic Pivot query in a MySQL Stored Procedure?",
    shortAnswer: "Use `GROUP_CONCAT()` to generate the dynamic `MAX(CASE WHEN ...)` column list from distinct category rows into a variable `@sql`, then execute via `PREPARE stmt FROM @sql; EXECUTE stmt;`.",
    explanation: "The standard dynamic pivoting stored procedure pattern.",
    hint: "Use GROUP_CONCAT to construct the SQL string and execute with PREPARE/EXECUTE.",
    level: "expert"
  },
  {
    question: "What is the performance advantage of Conditional Aggregation over multiple self-joins for pivoting?",
    shortAnswer: "Conditional aggregation scans the base table ONCE with `GROUP BY`, whereas joining $N$ subqueries scans the table $N$ times.",
    explanation: "Single-pass vs N-table scan.",
    hint: "Single table scan vs N separate table joins.",
    level: "expert"
  },
  {
    question: "How do you pivot student performance tiers (Gold, Silver, Bronze counts) per department?",
    shortAnswer: "`SELECT dept_id, COUNT(CASE WHEN tier='Gold' THEN 1 END) AS gold_count, COUNT(CASE WHEN tier='Silver' THEN 1 END) AS silver_count FROM honors GROUP BY dept_id;`",
    explanation: "Tier distribution matrix.",
    hint: "COUNT(CASE WHEN tier='Gold' THEN 1 END)",
    level: "basic"
  },
  {
    question: "Why should developers use `COUNT(CASE WHEN condition THEN 1 END)` instead of `COUNT(CASE WHEN condition THEN 1 ELSE 0 END)`?",
    shortAnswer: "Because `COUNT()` counts non-NULL values; if you write `ELSE 0`, `COUNT()` will count the `0`s as valid records, corrupting the total (use `SUM` with `ELSE 0` or `COUNT` with `NULL`).",
    explanation: "One of the most frequent conditional aggregation pitfalls.",
    hint: "COUNT counts non-NULLs (including 0); use SUM with 1/0 or COUNT with 1/NULL.",
    level: "expert"
  },
  {
    question: "How do you format NULL cells in a pivoted table as `0.00` or `'-'`?",
    shortAnswer: "Wrap the conditional aggregation in `COALESCE(MAX(CASE ...), 0.00)`.",
    explanation: "Replaces empty matrix cells with friendly zeros.",
    hint: "Use COALESCE(MAX(CASE ...), 0.00).",
    level: "basic"
  },
  {
    question: "Can Window Functions be combined with pivoted conditional aggregations?",
    shortAnswer: "YES; window functions evaluate after `GROUP BY`, allowing you to rank or compute running sums on the pivoted output stream.",
    explanation: "Nested analytical operations over pivoted results.",
    hint: "Yes, Window Functions evaluate after GROUP BY on pivoted summary rows.",
    level: "expert"
  },
  {
    question: "What index optimizes conditional aggregation pivoting on `exam_marks (student_id, subject_id, exam_score_pct)`?",
    shortAnswer: "A composite B-Tree index on `(student_id, subject_id, exam_score_pct)`.",
    explanation: "Provides covering index access for the entire pivot query.",
    hint: "Composite index on (student_id, subject_id, exam_score_pct).",
    level: "expert"
  },
  {
    question: "How do you pivot customer payment methods (Cash, UPI, Card totals) per branch?",
    shortAnswer: "`SELECT branch_name, SUM(CASE WHEN method='UPI' THEN amount ELSE 0 END) AS upi_total, SUM(CASE WHEN method='Cash' THEN amount ELSE 0 END) AS cash_total FROM payments GROUP BY branch_name;`",
    explanation: "Payment gateway distribution matrix.",
    hint: "SUM(CASE WHEN method='UPI' THEN amount ELSE 0 END)",
    level: "basic"
  },
  {
    question: "What is the memory impact of pivoting 10 columns across 50,000 entities in MySQL 8.0?",
    shortAnswer: "Negligible; evaluated in-memory within standard `sort_buffer_size` and `tmp_table_size` parameters.",
    explanation: "High-speed in-memory hash aggregation.",
    hint: "Lightweight; executes in memory within tmp_table_size limits.",
    level: "basic"
  },
  {
    question: "Can `AVG()` be used inside `CASE` for pivoting (e.g. average quiz marks per subject)?",
    shortAnswer: "YES; `AVG(CASE WHEN subject_code='CS101' THEN score END)` calculates the average score for that specific subject.",
    explanation: "Supports any aggregate function inside CASE.",
    hint: "Yes, AVG(CASE WHEN ... END) is fully valid.",
    level: "basic"
  },
  {
    question: "How do you pivot course completion rates (Completed vs Incomplete) per teacher?",
    shortAnswer: "`SELECT teacher_name, ROUND(SUM(CASE WHEN is_completed=1 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS completion_pct FROM course_enrollments GROUP BY teacher_name;`",
    explanation: "Percentage ratio calculation via conditional sum.",
    hint: "SUM(completed) / COUNT(*) * 100.0",
    level: "moderate"
  },
  {
    question: "How do you pivot exam scores and display both Score and Pass/Fail status in two columns per subject?",
    shortAnswer: "Project two separate `MAX(CASE ...)` expressions per subject: one for the numeric score and one for the text status `'PASS'/'FAIL'`.",
    explanation: "Multi-attribute pivoting per categorical dimension.",
    hint: "Project two MAX(CASE) expressions per subject for score and status.",
    level: "moderate"
  },
  {
    question: "Can pivoted queries be encapsulated in Views?",
    shortAnswer: "YES; `CREATE VIEW v_student_grade_matrix AS SELECT ...` provides a clean tabular view for reporting dashboards.",
    explanation: "Encapsulates pivot queries in views.",
    hint: "Yes, Views can encapsulate conditional aggregation pivot queries.",
    level: "basic"
  },
  {
    question: "What error occurs if you group by the wrong column in a pivot query?",
    shortAnswer: "If `ONLY_FULL_GROUP_BY` is enabled, MySQL throws `Error 1055` if non-aggregated, non-grouped columns appear in the SELECT list.",
    explanation: "Enforces strict relational SQL grouping correctness.",
    hint: "Error 1055 under ONLY_FULL_GROUP_BY if grouping is mismatched.",
    level: "moderate"
  },
  {
    question: "How do you calculate column-level grand totals at the bottom of a pivoted matrix?",
    shortAnswer: "Add `WITH ROLLUP` to the `GROUP BY` clause.",
    explanation: "Generates super-aggregate grand total row at the matrix bottom.",
    hint: "Add WITH ROLLUP to the GROUP BY clause.",
    level: "expert"
  },
  {
    question: "How do you format the `ROLLUP` super-aggregate row label as `'ALL BRANCHES TOTAL'`?",
    shortAnswer: "Use `COALESCE(branch_name, '🌟 ALL BRANCHES TOTAL')` in the SELECT list.",
    explanation: "Labels the rollup NULL row.",
    hint: "COALESCE(branch_name, '🌟 ALL BRANCHES TOTAL')",
    level: "moderate"
  },
  {
    question: "What is the maximum number of columns that can be created in a pivoted MySQL query?",
    shortAnswer: "Bounded by MySQL's maximum column limit per table/query (4,096 columns in InnoDB).",
    explanation: "Engine-level column limit.",
    hint: "Limited by MySQL's 4,096 column limit.",
    level: "expert"
  },
  {
    question: "Why is pivoting in SQL often preferred over pivoting in Python / Pandas on large datasets?",
    shortAnswer: "Because MySQL computes the aggregations directly inside the database engine using indexing and multi-threading, streaming only the condensed matrix over the network.",
    explanation: "Massive network bandwidth and memory reduction.",
    hint: "Reduces network bandwidth and computes aggregation directly on the server.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Conditional Aggregations and Pivoting Data?",
    shortAnswer: "Use `SUM(CASE WHEN ...)` / `MAX(CASE WHEN ...)` with `GROUP BY` for single-pass matrix generation, use `COUNT(CASE WHEN ... THEN 1 END)` (without `ELSE 0`) to avoid counting non-matching rows, use `UNION ALL` for unpivoting, and add `WITH ROLLUP` to generate bottom grand total summary rows.",
    explanation: "Authoritative architectural best practices for SQL pivoting and crosstab design.",
    hint: "MAX/SUM with CASE for pivoting + avoid ELSE 0 in COUNT + UNION ALL for unpivoting + WITH ROLLUP for totals.",
    level: "expert"
  }
];

export default questions;
