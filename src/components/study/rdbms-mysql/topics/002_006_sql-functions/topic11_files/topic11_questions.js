// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the primary function of the `GROUP BY` clause in SQL?",
    shortAnswer: "It partitions rows sharing identical values in specified columns into summary groups, allowing aggregate functions to calculate summaries per group.",
    explanation: "Core purpose of GROUP BY.",
    hint: "Partitions rows sharing identical column values into summary groups.",
    level: "basic"
  },
  {
    question: "What is the logical execution order of the `GROUP BY` clause relative to `WHERE` and `HAVING`?",
    shortAnswer: "`WHERE` executes first (row-level filtering), then `GROUP BY` (creates groups), then `HAVING` (filters aggregated groups).",
    explanation: "Execution lifecycle order: WHERE -> GROUP BY -> HAVING.",
    hint: "WHERE -> GROUP BY -> HAVING.",
    level: "basic"
  },
  {
    question: "What is the golden rule of column selection in the `SELECT` list when using `GROUP BY`?",
    shortAnswer: "Every column in the `SELECT` list must either be present in the `GROUP BY` clause or be enclosed inside an aggregate function (unless functionally dependent on a primary key in GROUP BY).",
    explanation: "Standard column selection rule in GROUP BY.",
    hint: "Must be in GROUP BY or wrapped in an aggregate function.",
    level: "basic"
  },
  {
    question: "What error is triggered in MySQL 8.0 if you select a non-aggregated column that is not in the `GROUP BY` clause?",
    shortAnswer: "**Error 1055 (42000): Expression isn't in GROUP BY clause and contains nonaggregated column which is not functionally dependent on columns in GROUP BY**.",
    explanation: "Error 1055 under ONLY_FULL_GROUP_BY.",
    hint: "Error 1055 under ONLY_FULL_GROUP_BY SQL mode.",
    level: "moderate"
  },
  {
    question: "Why was the `ONLY_FULL_GROUP_BY` SQL mode introduced and made default in MySQL 5.7+ and 8.0+?",
    shortAnswer: "To prevent non-deterministic and ambiguous query results where MySQL arbitrarily picked one row's value for unaggregated columns from a multi-row group.",
    explanation: "Rationale for ONLY_FULL_GROUP_BY enforcement.",
    hint: "Prevents arbitrary, non-deterministic values from being picked.",
    level: "moderate"
  },
  {
    question: "What is the 'Functional Dependency' exception in MySQL's `ONLY_FULL_GROUP_BY` mode?",
    shortAnswer: "If you group by a table's `PRIMARY KEY` (e.g. `GROUP BY student_id`), MySQL allows selecting other columns of that table without aggregate functions because their values are uniquely determined by the primary key.",
    explanation: "Functional dependency on primary key.",
    hint: "Grouping by PRIMARY KEY permits selecting other columns because they are uniquely dependent.",
    level: "expert"
  },
  {
    question: "How does the `GROUP BY` clause handle rows where the grouping column has `NULL` values?",
    shortAnswer: "All rows with `NULL` in the grouping column are treated as identical and grouped together into a single summary group row.",
    explanation: "NULL grouping behavior in GROUP BY.",
    hint: "All NULL values are collapsed into a single group row.",
    level: "basic"
  },
  {
    question: "Can you group by a calculated expression such as `YEAR(admission_date)` in MySQL?",
    shortAnswer: "YES (e.g. `SELECT YEAR(admission_date), COUNT(*) FROM students GROUP BY YEAR(admission_date);`).",
    explanation: "Grouping by date expression.",
    hint: "Yes, grouping by scalar expressions is fully supported.",
    level: "basic"
  },
  {
    question: "Can you use a column alias defined in `SELECT` inside the `GROUP BY` clause in MySQL?",
    shortAnswer: "YES. MySQL extends standard SQL by allowing column aliases in `GROUP BY` (e.g. `SELECT YEAR(adm_date) AS adm_yr, COUNT(*) FROM students GROUP BY adm_yr;`).",
    explanation: "Alias usage in MySQL GROUP BY.",
    hint: "Yes, MySQL allows aliases in GROUP BY.",
    level: "moderate"
  },
  {
    question: "Can you group by multiple columns (e.g. `GROUP BY centre_city, course_stream`)?",
    shortAnswer: "YES. MySQL creates a distinct group for every unique combination of `(centre_city, course_stream)`.",
    explanation: "Multi-column grouping combinations.",
    hint: "Yes; creates groups for each unique combination of the specified columns.",
    level: "basic"
  },
  {
    question: "In academy batch analytics, count total enrolled students and total revenue collected in Indian Rupee (₹) per center city.",
    shortAnswer: "`SELECT centre_city, COUNT(*) AS total_students, SUM(fee_amount_inr) AS total_revenue_inr FROM student_admissions GROUP BY centre_city;`",
    explanation: "City-wise student count and fee sum aggregation.",
    hint: "GROUP BY centre_city with COUNT(*) and SUM(fee_amount_inr).",
    level: "basic"
  },
  {
    question: "How do you check if `ONLY_FULL_GROUP_BY` is enabled in your active MySQL session?",
    shortAnswer: "`SELECT @@sql_mode;` or `SHOW VARIABLES LIKE 'sql_mode';`",
    explanation: "Checking current SQL mode configuration.",
    hint: "SELECT @@sql_mode;",
    level: "basic"
  },
  {
    question: "Why is disabling `ONLY_FULL_GROUP_BY` considered bad engineering practice in production?",
    shortAnswer: "Because it masks logical query design flaws and produces unpredictable results that vary across server restarts, storage engines, and MySQL versions.",
    explanation: "Risk of disabling ONLY_FULL_GROUP_BY in production.",
    hint: "Masks bugs and leads to non-deterministic, corrupted report data.",
    level: "moderate"
  },
  {
    question: "What is the difference between `WHERE status = 'PAID'` and `HAVING status = 'PAID'` when used with `GROUP BY`?",
    shortAnswer: "`WHERE` filters individual rows before grouping (reducing rows to group and boosting performance), while `HAVING` filters after grouping and should be reserved for aggregate conditions.",
    explanation: "WHERE vs HAVING placement with GROUP BY.",
    hint: "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
    level: "basic"
  },
  {
    question: "How do you group students by performance tier ('Distinction', 'First Class', 'Pass', 'Fail') using CASE in GROUP BY?",
    shortAnswer: "`SELECT CASE WHEN marks >= 75 THEN 'Distinction' WHEN marks >= 60 THEN 'First Class' WHEN marks >= 40 THEN 'Pass' ELSE 'Fail' END AS tier, COUNT(*) FROM student_scores GROUP BY tier;`",
    explanation: "Grouping on conditional CASE expressions.",
    hint: "GROUP BY tier (or the entire CASE expression).",
    level: "moderate"
  },
  {
    question: "What is a 'Loose Index Scan' (`Using index for group-by`) in MySQL query execution plans?",
    shortAnswer: "An optimization where MySQL uses a B-Tree index to jump directly from group key to group key without reading all intermediate index rows, making GROUP BY extremely fast.",
    explanation: "Loose Index Scan optimization for GROUP BY.",
    hint: "Jumps between distinct group keys using a B-Tree index without scanning all rows.",
    level: "expert"
  },
  {
    question: "What composite index would optimize `SELECT department_id, AVG(salary) FROM employees WHERE status = 'ACTIVE' GROUP BY department_id;`?",
    shortAnswer: "A composite B-Tree index on `(status, department_id, salary)`.",
    explanation: "Covering index design for filtered GROUP BY queries.",
    hint: "Composite index on (status, department_id, salary).",
    level: "expert"
  },
  {
    question: "Can an aggregate function be placed inside the `GROUP BY` clause (e.g. `GROUP BY COUNT(*)` )?",
    shortAnswer: "NO. Aggregate functions cannot be placed inside `GROUP BY` because grouping must occur before aggregations can be computed.",
    explanation: "Prohibition of aggregates inside GROUP BY.",
    hint: "No; grouping must happen before aggregations exist.",
    level: "basic"
  },
  {
    question: "In e-commerce analytics, calculate total sales revenue and average order amount per payment mode (UPI, NetBanking, Card, Cash).",
    shortAnswer: "`SELECT payment_mode, COUNT(*) AS orders_count, SUM(order_amount_inr) AS total_revenue_inr, ROUND(AVG(order_amount_inr), 2) AS aov_inr FROM orders GROUP BY payment_mode;`",
    explanation: "Payment mode group breakdown.",
    hint: "GROUP BY payment_mode with SUM and AVG.",
    level: "basic"
  },
  {
    question: "How does `GROUP BY` interact with `ORDER BY` in standard MySQL?",
    shortAnswer: "`GROUP BY` creates the grouped rows, and `ORDER BY` sorts the final grouped rows (by group keys or aggregate metrics like `ORDER BY total_revenue DESC`).",
    explanation: "Interaction between GROUP BY and ORDER BY.",
    hint: "GROUP BY creates groups; ORDER BY sorts the resulting grouped rows.",
    level: "basic"
  },
  {
    question: "In older MySQL versions (prior to 8.0), did `GROUP BY` sort the output automatically?",
    shortAnswer: "Yes, older MySQL versions sorted by grouping columns implicitly; however, MySQL 8.0 removed implicit sorting, requiring an explicit `ORDER BY` for sorted output.",
    explanation: "Deprecation of implicit sorting in MySQL 8.0.",
    hint: "MySQL 8.0 removed implicit sorting; use explicit ORDER BY.",
    level: "moderate"
  },
  {
    question: "How do you count the number of students enrolled per admission year and month?",
    shortAnswer: "`SELECT YEAR(admission_date) AS adm_year, MONTHNAME(admission_date) AS adm_month, COUNT(*) AS total_students FROM admissions GROUP BY YEAR(admission_date), MONTH(admission_date), MONTHNAME(admission_date) ORDER BY adm_year DESC, MONTH(admission_date) DESC;`",
    explanation: "Year and month multi-expression grouping.",
    hint: "GROUP BY YEAR(admission_date), MONTH(admission_date).",
    level: "moderate"
  },
  {
    question: "What happens when you run `SELECT COUNT(*) FROM students;` without a `GROUP BY` clause?",
    shortAnswer: "MySQL treats the entire table as a single implicit global group and returns exactly 1 summary row.",
    explanation: "Implicit single-group aggregation.",
    hint: "Treats the entire table as one single group, returning 1 row.",
    level: "basic"
  },
  {
    question: "How do you resolve Error 1055 if you need a non-grouped column value (e.g. `student_name`) alongside a group minimum score?",
    shortAnswer: "Use a window function (`ROW_NUMBER() OVER (PARTITION BY ...)`), a subquery join, or `GROUP_CONCAT(student_name)` instead of selecting the bare column.",
    explanation: "Resolving non-grouped column requirements.",
    hint: "Use window functions, subquery joins, or aggregate functions like GROUP_CONCAT.",
    level: "expert"
  },
  {
    question: "Can `GROUP BY` be used in `UPDATE` or `DELETE` statements directly in MySQL?",
    shortAnswer: "NO. Direct `GROUP BY` is invalid in standard `UPDATE`/`DELETE` syntax; you must join against a subquery containing the `GROUP BY`.",
    explanation: "GROUP BY in DML statements.",
    hint: "No; must join against a subquery derived table.",
    level: "moderate"
  },
  {
    question: "In warehouse inventory, calculate total stock quantity and total valuation in Indian Rupee (₹) grouped by category.",
    shortAnswer: "`SELECT category_name, COUNT(*) AS items_count, SUM(stock_qty) AS total_units, SUM(unit_price_inr * stock_qty) AS category_valuation_inr FROM inventory GROUP BY category_name;`",
    explanation: "Category-level inventory grouping with row arithmetic.",
    hint: "GROUP BY category_name with SUM(unit_price_inr * stock_qty).",
    level: "basic"
  },
  {
    question: "Why should you avoid `GROUP BY col_name DESC` in modern MySQL?",
    shortAnswer: "Specifying `DESC` directly in the `GROUP BY` clause was a legacy MySQL extension deprecated in MySQL 8.0. You must use `ORDER BY col_name DESC` instead.",
    explanation: "Deprecation of DESC in GROUP BY.",
    hint: "Deprecated; use explicit ORDER BY col_name DESC.",
    level: "moderate"
  },
  {
    question: "What is the result of `GROUP BY 1, 2` in MySQL?",
    shortAnswer: "It groups by the 1st and 2nd columns listed in the `SELECT` clause (ordinal column positioning).",
    explanation: "Positional grouping by column index.",
    hint: "Groups by the 1st and 2nd columns in the SELECT list.",
    level: "moderate"
  },
  {
    question: "Why is positional grouping (`GROUP BY 1, 2`) discouraged in production code?",
    shortAnswer: "Because if someone alters the order of columns in the `SELECT` clause during maintenance, the grouping logic silently changes, causing subtle bugs.",
    explanation: "Maintainability hazard of ordinal grouping.",
    hint: "Fragile; reordering columns in SELECT silently alters grouping logic.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding the `GROUP BY` clause?",
    shortAnswer: "The `GROUP BY` clause is the structural backbone of SQL analytical queries; enforce `ONLY_FULL_GROUP_BY`, filter early with `WHERE`, group by primary keys when possible, and index grouping columns for optimal speed.",
    explanation: "Final summary takeaway for Topic 11 in Module 6.",
    hint: "Enforce ONLY_FULL_GROUP_BY, filter early with WHERE, and leverage composite B-Tree indexes.",
    level: "basic"
  }
];

export default questions;
