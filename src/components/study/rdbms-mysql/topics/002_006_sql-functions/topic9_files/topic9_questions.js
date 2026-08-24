// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the primary operational difference between scalar functions and aggregate functions in SQL?",
    shortAnswer: "Scalar functions operate on a single row and return a single value per row (1 &rarr; 1), whereas aggregate functions process multiple rows and compress them into a single summary scalar value (N &rarr; 1).",
    explanation: "Scalar vs aggregate cardinality transformation.",
    hint: "Scalar transforms 1-to-1; aggregate compresses N-to-1.",
    level: "basic"
  },
  {
    question: "What is the difference between `COUNT(*)` and `COUNT(column_name)`?",
    shortAnswer: "`COUNT(*)` counts all rows in the dataset regardless of NULL values, whereas `COUNT(column_name)` counts only rows where the specified column is `NOT NULL`.",
    explanation: "COUNT(*) vs COUNT(col) with respect to NULL values.",
    hint: "COUNT(*) counts all rows; COUNT(col) counts only non-null values.",
    level: "basic"
  },
  {
    question: "Given a column with values `[100, NULL, 200]`, what does `AVG(column)` return?",
    shortAnswer: "`150` (because `AVG()` calculates `(100 + 200) / 2 = 150`, completely ignoring the NULL row in both numerator and denominator).",
    explanation: "AVG calculation ignoring NULLs.",
    hint: "(100 + 200) / 2 = 150 (NULL row is excluded).",
    level: "basic"
  },
  {
    question: "How do you calculate the true class average where absent students (`marks IS NULL`) are counted as receiving 0 marks?",
    shortAnswer: "`SELECT AVG(COALESCE(marks, 0)) AS average_score FROM student_exam_records;`",
    explanation: "Treating NULL as 0 in AVG using COALESCE.",
    hint: "AVG(COALESCE(marks, 0)).",
    level: "basic"
  },
  {
    question: "What does `COUNT(DISTINCT city)` return if the table has rows with cities: `'Kolkata'`, `'Barrackpore'`, `'Kolkata'`, `NULL`?",
    shortAnswer: "`2` (returns the count of unique non-null values: 'Kolkata' and 'Barrackpore').",
    explanation: "COUNT(DISTINCT) unique calculation excluding NULL.",
    hint: "2 (unique non-null strings).",
    level: "basic"
  },
  {
    question: "Why does the query `SELECT student_name, marks FROM students WHERE marks > AVG(marks);` fail in MySQL?",
    shortAnswer: "It triggers **Error 1111: Invalid use of group function** because aggregate functions cannot be evaluated in the `WHERE` clause before grouping occurs.",
    explanation: "Prohibition of aggregate functions in WHERE clause.",
    hint: "Error 1111; WHERE runs before aggregation.",
    level: "moderate"
  },
  {
    question: "How do you rewrite the query to find students scoring above average marks correctly?",
    shortAnswer: "`SELECT student_name, marks FROM students WHERE marks > (SELECT AVG(marks) FROM students);`",
    explanation: "Using a scalar subquery in the WHERE clause.",
    hint: "WHERE marks > (SELECT AVG(marks) FROM students).",
    level: "basic"
  },
  {
    question: "What does `SUM(amount)` return when executed on a table with 0 matching rows?",
    shortAnswer: "`NULL` (in SQL, `SUM()` on an empty dataset evaluates to `NULL`, not `0`).",
    explanation: "SUM() behavior on empty result sets.",
    hint: "Returns NULL on empty matching sets.",
    level: "moderate"
  },
  {
    question: "How do you ensure a financial report displays `₹0.00` instead of `NULL` when summing revenue on empty filtered sets?",
    shortAnswer: "`SELECT COALESCE(SUM(fee_amount_inr), 0.00) AS total_revenue_inr FROM student_fees WHERE batch_year = 2030;`",
    explanation: "COALESCE wrapping on SUM.",
    hint: "COALESCE(SUM(fee_amount_inr), 0.00).",
    level: "basic"
  },
  {
    question: "Can `MIN()` and `MAX()` be used on non-numeric columns like `VARCHAR` strings and `DATE` timestamps?",
    shortAnswer: "YES. On strings, `MIN()`/`MAX()` return alphabetical (lexicographical) extremes; on dates, `MIN()` returns the earliest date and `MAX()` returns the latest date.",
    explanation: "MIN and MAX on strings and temporal columns.",
    hint: "Yes; earliest/latest for dates and alphabetical order for text.",
    level: "basic"
  },
  {
    question: "What does `MIN(student_name)` return for `['Mamata', 'Susmita', 'Abhronila', 'Debangshu']`?",
    shortAnswer: "`'Abhronila'` (first in alphabetical dictionary order).",
    explanation: "MIN on alphabetical text strings.",
    hint: "'Abhronila'",
    level: "basic"
  },
  {
    question: "What does `MAX(admission_date)` return for `['2026-01-15', '2026-08-24', '2025-12-01']`?",
    shortAnswer: "`'2026-08-24'` (the most recent / latest chronological date).",
    explanation: "MAX on chronological date values.",
    hint: "'2026-08-24'",
    level: "basic"
  },
  {
    question: "What is the difference between `SUM(col)` and `SUM(DISTINCT col)`?",
    shortAnswer: "`SUM(col)` sums all values across rows, while `SUM(DISTINCT col)` adds duplicate values only once.",
    explanation: "SUM with DISTINCT modifier.",
    hint: "SUM(col) adds all rows; SUM(DISTINCT col) adds unique values only once.",
    level: "basic"
  },
  {
    question: "What does `COUNT(1)` do in MySQL, and is it faster than `COUNT(*)`?",
    shortAnswer: "`COUNT(1)` and `COUNT(*)` are functionally and performance-wise identical in modern MySQL; the optimizer treats both as counting all matching rows.",
    explanation: "COUNT(*) vs COUNT(1) optimization equivalence.",
    hint: "Identical performance; both count all rows.",
    level: "moderate"
  },
  {
    question: "If a column contains only `NULL` values across 10 rows, what do `COUNT(*)`, `COUNT(col)`, `SUM(col)`, `AVG(col)`, `MIN(col)` return?",
    shortAnswer: "`COUNT(*) = 10`, `COUNT(col) = 0`, `SUM(col) = NULL`, `AVG(col) = NULL`, `MIN(col) = NULL`.",
    explanation: "Comprehensive all-null aggregation behavior.",
    hint: "COUNT(*)=10, COUNT(col)=0, all others return NULL.",
    level: "moderate"
  },
  {
    question: "How do you count total enrolled students and total scholarship holders in a single query?",
    shortAnswer: "`SELECT COUNT(*) AS total_students, COUNT(scholarship_amount) AS scholarship_holders FROM students;`",
    explanation: "Simultaneous counting of total and non-null rows.",
    hint: "COUNT(*) and COUNT(scholarship_amount).",
    level: "basic"
  },
  {
    question: "In academy batch analytics, how do you find the highest, lowest, and average score in a single query?",
    shortAnswer: "`SELECT MAX(marks) AS highest_score, MIN(marks) AS lowest_score, ROUND(AVG(marks), 2) AS average_score FROM exam_results;`",
    explanation: "Multi-metric scalar aggregation.",
    hint: "MAX(marks), MIN(marks), ROUND(AVG(marks), 2).",
    level: "basic"
  },
  {
    question: "Why does `SELECT centre_city, AVG(marks) FROM students;` fail or produce misleading results in standard SQL without `GROUP BY`?",
    shortAnswer: "Because `centre_city` is an unaggregated column with multiple distinct row values, while `AVG(marks)` is a single scalar summary value. SQL requires `GROUP BY centre_city` to define how rows are collapsed.",
    explanation: "Grouping requirement for mixed aggregated and unaggregated columns.",
    hint: "Mixed aggregate and unaggregated columns require a GROUP BY clause.",
    level: "moderate"
  },
  {
    question: "What SQL mode in MySQL prevents selecting non-aggregated columns in queries without GROUP BY?",
    shortAnswer: "`ONLY_FULL_GROUP_BY` (enabled by default in MySQL 5.7+ and MySQL 8.0+).",
    explanation: "ONLY_FULL_GROUP_BY SQL mode enforcement.",
    hint: "ONLY_FULL_GROUP_BY.",
    level: "moderate"
  },
  {
    question: "How do you calculate the total revenue collected in Indian Rupee (₹) from paid student fees?",
    shortAnswer: "`SELECT SUM(fee_amount_inr) AS total_collected_revenue_inr FROM fee_payments WHERE payment_status = 'PAID';`",
    explanation: "Filtered SUM aggregation for revenue tracking.",
    hint: "SUM(fee_amount_inr) WHERE payment_status = 'PAID'.",
    level: "basic"
  },
  {
    question: "Can aggregate functions be combined with scalar functions in the same expression (e.g. `ROUND(AVG(price), 2)`)?",
    shortAnswer: "YES. The aggregate function is evaluated across the rows first to produce a single scalar number, and then the outer scalar function (`ROUND`) formats the result.",
    explanation: "Nesting aggregate functions inside scalar functions.",
    hint: "Yes; the inner aggregate executes across rows, then the outer scalar executes on the result.",
    level: "basic"
  },
  {
    question: "Can an aggregate function be nested directly inside another aggregate function (e.g. `AVG(SUM(sales))` in standard SQL)?",
    shortAnswer: "NO. Direct nesting of aggregate functions (`AVG(SUM(sales))`) is invalid in SQL. A subquery or Common Table Expression (CTE) must be used instead.",
    explanation: "Prohibition of direct aggregate nesting.",
    hint: "No; direct nesting is invalid. Use a subquery or CTE.",
    level: "moderate"
  },
  {
    question: "How do you calculate the average of total sales per branch using a subquery?",
    shortAnswer: "`SELECT AVG(branch_total) AS avg_sales_per_branch FROM (SELECT branch_id, SUM(amount_inr) AS branch_total FROM sales GROUP BY branch_id) AS branch_summary;`",
    explanation: "Two-stage aggregation with subquery derived table.",
    hint: "SELECT AVG(branch_total) FROM (SELECT SUM(amount) AS branch_total ... GROUP BY branch) AS t.",
    level: "moderate"
  },
  {
    question: "How does the InnoDB storage engine optimize `COUNT(*)` without a WHERE clause compared to MyISAM?",
    shortAnswer: "InnoDB must perform a secondary index scan or table scan because MVCC transaction isolation means different transactions see different row counts, whereas MyISAM stored an exact table row count in header metadata.",
    explanation: "InnoDB MVCC vs MyISAM COUNT(*) architecture.",
    hint: "InnoDB scans a secondary index due to MVCC transaction visibility; MyISAM stored row count in metadata.",
    level: "expert"
  },
  {
    question: "What is the fastest secondary index for MySQL InnoDB to scan when evaluating `SELECT COUNT(*) FROM table_name;`?",
    shortAnswer: "InnoDB automatically picks the smallest available secondary index (in terms of page size/bytes per record) to minimize disk I/O.",
    explanation: "Index selection optimization for COUNT(*).",
    hint: "The narrowest/smallest secondary index on the table.",
    level: "expert"
  },
  {
    question: "How do you calculate the percentage of students who passed (`marks >= 40`) in a single query?",
    shortAnswer: "`SELECT ROUND((SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) AS pass_percentage FROM exam_results;`",
    explanation: "Pass percentage formula using conditional SUM and COUNT.",
    hint: "ROUND((SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2).",
    level: "moderate"
  },
  {
    question: "What is the difference between `COUNT(DISTINCT a, b)` in MySQL vs standard SQL?",
    shortAnswer: "MySQL allows multi-column `COUNT(DISTINCT a, b)` in a single call, counting rows where the combination of `(a, b)` is unique and neither `a` nor `b` is NULL.",
    explanation: "Multi-column COUNT DISTINCT in MySQL.",
    hint: "Counts unique combinations where neither column is NULL.",
    level: "expert"
  },
  {
    question: "In e-commerce inventory, calculate total inventory valuation in Indian Rupee (₹) across all stock items.",
    shortAnswer: "`SELECT SUM(unit_price_inr * stock_quantity) AS total_inventory_valuation_inr FROM product_inventory;`",
    explanation: "SUM over row-level expression multiplication.",
    hint: "SUM(unit_price_inr * stock_quantity).",
    level: "basic"
  },
  {
    question: "Why should `HAVING` be used instead of `WHERE` when filtering on aggregate values (e.g. `HAVING COUNT(*) > 5`)?",
    shortAnswer: "Because `WHERE` filters individual rows *before* grouping and aggregation occur, while `HAVING` filters grouped rows *after* the aggregate calculations have been computed.",
    explanation: "HAVING vs WHERE execution lifecycle.",
    hint: "WHERE filters rows before aggregation; HAVING filters groups after aggregation.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding SQL Aggregate Functions?",
    shortAnswer: "Aggregate functions compress multi-row datasets into scalar insights; master NULL exclusion mechanics, protect empty sums with `COALESCE`, and pair with `GROUP BY` and `HAVING` for enterprise analytics.",
    explanation: "Final summary takeaway for Topic 9 in Module 6.",
    hint: "Aggregate functions compress rows; be vigilant about NULL exclusion and clause execution order.",
    level: "basic"
  }
];

export default questions;
