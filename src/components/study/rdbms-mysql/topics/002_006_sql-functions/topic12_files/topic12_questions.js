// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is the primary difference between the `WHERE` clause and the `HAVING` clause in SQL?",
    shortAnswer: "`WHERE` filters individual rows *before* grouping and aggregation occur, while `HAVING` filters grouped summary rows *after* aggregation calculations have been computed.",
    explanation: "Core conceptual difference between WHERE and HAVING.",
    hint: "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
    level: "basic"
  },
  {
    question: "Why does `SELECT centre_city, COUNT(*) FROM students WHERE COUNT(*) >= 10 GROUP BY centre_city;` cause an error?",
    shortAnswer: "It triggers **Error 1111: Invalid use of group function** because aggregate functions like `COUNT(*)` cannot be evaluated in the `WHERE` clause before groups are formed.",
    explanation: "Error 1111 cause in WHERE clause.",
    hint: "Error 1111; aggregate functions are illegal in WHERE.",
    level: "basic"
  },
  {
    question: "How do you correctly write a query to find centers that have at least 10 enrolled students?",
    shortAnswer: "`SELECT centre_city, COUNT(*) AS student_count FROM students GROUP BY centre_city HAVING COUNT(*) >= 10;`",
    explanation: "Correct use of HAVING for aggregate filtering.",
    hint: "GROUP BY centre_city HAVING COUNT(*) >= 10.",
    level: "basic"
  },
  {
    question: "In the SQL logical execution pipeline, when does `HAVING` execute relative to `WHERE`, `GROUP BY`, and `SELECT`?",
    shortAnswer: "Order: `FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT`.",
    explanation: "SQL execution lifecycle order.",
    hint: "WHERE runs 2nd, GROUP BY runs 3rd, HAVING runs 4th, SELECT runs 5th.",
    level: "basic"
  },
  {
    question: "Can both `WHERE` and `HAVING` clauses be used in the same SQL query?",
    shortAnswer: "YES. `WHERE` filters rows upfront (e.g. `WHERE status = 'ACTIVE'`), while `HAVING` filters aggregate metrics (e.g. `HAVING SUM(fee_inr) >= 50000`).",
    explanation: "Coexistence of WHERE and HAVING.",
    hint: "Yes; WHERE filters rows first, HAVING filters aggregate metrics later.",
    level: "basic"
  },
  {
    question: "Why is writing `HAVING centre_city = 'Kolkata'` instead of `WHERE centre_city = 'Kolkata'` bad for database performance?",
    shortAnswer: "Because `HAVING` forces MySQL to group all rows across all cities in memory first before discarding non-Kolkata groups, whereas `WHERE` uses B-Tree indexes to prune non-Kolkata rows immediately before grouping.",
    explanation: "Performance penalty of non-aggregate filtering in HAVING.",
    hint: "Prevents index usage and forces unnecessary grouping of all table rows in memory.",
    level: "moderate"
  },
  {
    question: "What happens when you use `HAVING` without a `GROUP BY` clause in MySQL?",
    shortAnswer: "MySQL treats the entire table as a single implicit global group; the query returns 1 row if the aggregate condition is met, or an empty result set (0 rows) if not.",
    explanation: "HAVING on whole-table implicit group.",
    hint: "Treats the entire table as one group, returning 1 row if true or 0 rows if false.",
    level: "moderate"
  },
  {
    question: "How do you find students whose score is greater than the overall class average score?",
    shortAnswer: "`SELECT student_name, marks FROM students WHERE marks > (SELECT AVG(marks) FROM students);`",
    explanation: "Scalar subquery in WHERE for row comparison against global average.",
    hint: "Use a subquery in WHERE: WHERE marks > (SELECT AVG(marks) FROM students).",
    level: "basic"
  },
  {
    question: "Can you filter on column aliases defined in `SELECT` inside the `HAVING` clause in MySQL?",
    shortAnswer: "YES. MySQL allows referencing `SELECT` column aliases in `HAVING` (e.g. `SELECT centre_city, SUM(fee) AS total_rev GROUP BY centre_city HAVING total_rev > 100000;`).",
    explanation: "Alias referencing in MySQL HAVING clause.",
    hint: "Yes, MySQL allows SELECT aliases in the HAVING clause.",
    level: "moderate"
  },
  {
    question: "Can you reference column aliases defined in `SELECT` inside the `WHERE` clause?",
    shortAnswer: "NO. Because `WHERE` executes before `SELECT`, column aliases do not exist yet when `WHERE` evaluates.",
    explanation: "Alias unavailability in WHERE clause.",
    hint: "No; WHERE executes before SELECT so aliases do not exist yet.",
    level: "basic"
  },
  {
    question: "In academy batch analytics, find courses where total collected tuition fee exceeds ₹2,00,000.",
    shortAnswer: "`SELECT course_name, SUM(fee_amount_inr) AS total_fee_inr FROM enrollments GROUP BY course_name HAVING SUM(fee_amount_inr) > 200000;`",
    explanation: "Financial aggregate threshold filtering with HAVING.",
    hint: "GROUP BY course_name HAVING SUM(fee_amount_inr) > 200000.",
    level: "basic"
  },
  {
    question: "Can multiple aggregate conditions connected with `AND` and `OR` be used in a `HAVING` clause?",
    shortAnswer: "YES (e.g. `HAVING COUNT(*) >= 15 AND AVG(marks) >= 75.00`).",
    explanation: "Compound boolean logic in HAVING.",
    hint: "Yes, arbitrary AND/OR logical combinations are supported in HAVING.",
    level: "basic"
  },
  {
    question: "How do you find batches that have at least 5 students AND where every student has paid their full fee?",
    shortAnswer: "`SELECT batch_id, COUNT(*) AS total_students FROM enrollments GROUP BY batch_id HAVING COUNT(*) >= 5 AND MIN(is_fee_paid) = 1;`",
    explanation: "Combining COUNT and MIN boolean aggregates in HAVING.",
    hint: "HAVING COUNT(*) >= 5 AND MIN(is_fee_paid) = 1.",
    level: "expert"
  },
  {
    question: "In e-commerce customer analytics, find customers who have placed more than 3 orders with an average spend greater than ₹5,000.",
    shortAnswer: "`SELECT customer_id, COUNT(order_id) AS orders_count, ROUND(AVG(order_total_inr), 2) AS avg_spend_inr FROM orders GROUP BY customer_id HAVING COUNT(order_id) > 3 AND AVG(order_total_inr) > 5000;`",
    explanation: "Customer tier filtering using HAVING.",
    hint: "HAVING COUNT(order_id) > 3 AND AVG(order_total_inr) > 5000.",
    level: "basic"
  },
  {
    question: "Can B-Tree indexes directly accelerate a `HAVING COUNT(*) > 10` condition?",
    shortAnswer: "No, because `COUNT(*)` must be computed across rows in each group before `HAVING` can evaluate it; however, indexes on `GROUP BY` columns accelerate group creation.",
    explanation: "Index behavior with HAVING clauses.",
    hint: "Indexes speed up grouping, but HAVING must evaluate aggregate values in memory.",
    level: "expert"
  },
  {
    question: "What is the difference between `WHERE fee > 5000` and `HAVING AVG(fee) > 5000`?",
    shortAnswer: "`WHERE fee > 5000` filters out individual student rows whose fee is &le; ₹5000 before grouping; `HAVING AVG(fee) > 5000` groups all students and keeps only groups whose average fee exceeds ₹5000.",
    explanation: "Row threshold vs group mean threshold.",
    hint: "WHERE filters individual fees; HAVING filters the group mean.",
    level: "basic"
  },
  {
    question: "In warehouse inventory, find product categories with fewer than 10 total units in stock.",
    shortAnswer: "`SELECT category_name, SUM(stock_quantity) AS total_units FROM inventory GROUP BY category_name HAVING SUM(stock_quantity) < 10;`",
    explanation: "Low stock alert grouping with HAVING.",
    hint: "GROUP BY category_name HAVING SUM(stock_quantity) < 10.",
    level: "basic"
  },
  {
    question: "How do you filter confirmed admissions in 2026 and display centers with over 50 students?",
    shortAnswer: "`SELECT centre_city, COUNT(*) AS students_count FROM admissions WHERE admission_status = 'CONFIRMED' AND YEAR(admission_date) = 2026 GROUP BY centre_city HAVING COUNT(*) > 50;`",
    explanation: "Combining WHERE filters with HAVING aggregate thresholds.",
    hint: "WHERE filters 2026 confirmed rows; HAVING filters COUNT(*) > 50.",
    level: "basic"
  },
  {
    question: "Why should `HAVING` NOT be used to filter rows when a `WHERE` clause can accomplish the same task?",
    shortAnswer: "Because `WHERE` leverages B-Tree indexes to prune rows early and saves memory/CPU during grouping, whereas `HAVING` processes all rows through grouping first.",
    explanation: "Best practice rule on filter placement.",
    hint: "WHERE is indexed and prunes rows early; HAVING filters late after grouping.",
    level: "moderate"
  },
  {
    question: "Can `HAVING` filter on columns that are NOT present in the `SELECT` list?",
    shortAnswer: "YES. Standard SQL and MySQL permit filtering on aggregate expressions in `HAVING` even if those expressions are not projected in `SELECT` (e.g. `SELECT city GROUP BY city HAVING COUNT(*) > 10`).",
    explanation: "Unprojected aggregate filtering in HAVING.",
    hint: "Yes; HAVING can filter on aggregates not listed in SELECT.",
    level: "moderate"
  },
  {
    question: "In technical support analytics, find agents who have resolved more than 20 tickets with an average resolution time under 2 hours.",
    shortAnswer: "`SELECT agent_id, COUNT(*) AS resolved_count, AVG(resolution_hours) AS avg_hours FROM support_tickets WHERE status = 'RESOLVED' GROUP BY agent_id HAVING COUNT(*) > 20 AND AVG(resolution_hours) < 2.0;`",
    explanation: "Support SLA performance analysis using WHERE and HAVING.",
    hint: "WHERE status = 'RESOLVED' GROUP BY agent_id HAVING COUNT(*) > 20 AND AVG(...) < 2.0.",
    level: "basic"
  },
  {
    question: "What is the equivalent of `SELECT dept, AVG(salary) FROM emp GROUP BY dept HAVING AVG(salary) > 50000;` using a subquery?",
    shortAnswer: "`SELECT * FROM (SELECT dept, AVG(salary) AS avg_sal FROM emp GROUP BY dept) AS d WHERE d.avg_sal > 50000;`",
    explanation: "Rewriting HAVING as a subquery with WHERE.",
    hint: "Wrap GROUP BY in a derived table and filter with WHERE on the outer query.",
    level: "moderate"
  },
  {
    question: "How does the MySQL optimizer handle non-aggregate conditions written in the `HAVING` clause?",
    shortAnswer: "In simple queries without GROUP BY, MySQL may push non-aggregate conditions from `HAVING` into `WHERE` (predicate pushdown); however, developers should write them in `WHERE` explicitly.",
    explanation: "Optimizer predicate pushdown from HAVING to WHERE.",
    hint: "Optimizer may push predicates down, but explicit WHERE placement is best practice.",
    level: "expert"
  },
  {
    question: "How do you find student batches where the top score is a perfect 100%?",
    shortAnswer: "`SELECT batch_name, MAX(marks_pct) AS top_score FROM exam_results GROUP BY batch_name HAVING MAX(marks_pct) = 100.00;`",
    explanation: "Extremes filtering with MAX in HAVING.",
    hint: "GROUP BY batch_name HAVING MAX(marks_pct) = 100.00.",
    level: "basic"
  },
  {
    question: "In regional marketing, find cities where at least 2 different courses have active student enrollments.",
    shortAnswer: "`SELECT centre_city, COUNT(DISTINCT course_id) AS distinct_courses FROM enrollments GROUP BY centre_city HAVING COUNT(DISTINCT course_id) >= 2;`",
    explanation: "Filtering on COUNT(DISTINCT) in HAVING.",
    hint: "HAVING COUNT(DISTINCT course_id) >= 2.",
    level: "moderate"
  },
  {
    question: "Why does `WHERE status = 'ACTIVE' GROUP BY city HAVING status = 'ACTIVE'` contain redundant code?",
    shortAnswer: "Because `WHERE` already filtered out all non-active rows, making the condition in `HAVING` completely redundant and wastefully re-evaluated.",
    explanation: "Eliminating redundant predicates between WHERE and HAVING.",
    hint: "Redundant; WHERE already pruned inactive rows before grouping.",
    level: "moderate"
  },
  {
    question: "Can window functions like `ROW_NUMBER()` or `RANK()` be used in the `HAVING` clause in MySQL 8.0?",
    shortAnswer: "NO. Window functions cannot be used in `WHERE` or `HAVING` clauses; they require a subquery or Common Table Expression (CTE) to be filtered.",
    explanation: "Window function clause restrictions.",
    hint: "No; window functions require a CTE or subquery to filter.",
    level: "expert"
  },
  {
    question: "In university course evaluations, find departments where average student rating is at least 4.5 out of 5 and review count >= 30.",
    shortAnswer: "`SELECT dept_name, ROUND(AVG(rating), 2) AS avg_rating, COUNT(*) AS review_count FROM course_reviews GROUP BY dept_name HAVING AVG(rating) >= 4.5 AND COUNT(*) >= 30;`",
    explanation: "Quality rating threshold with HAVING.",
    hint: "HAVING AVG(rating) >= 4.5 AND COUNT(*) >= 30.",
    level: "basic"
  },
  {
    question: "How do you sort the results of a query that uses `HAVING` by the aggregate metric in descending order?",
    shortAnswer: "Add `ORDER BY` after `HAVING`: `SELECT city, COUNT(*) AS c FROM students GROUP BY city HAVING COUNT(*) >= 5 ORDER BY c DESC;`",
    explanation: "Ordering filtered aggregated results.",
    hint: "Add ORDER BY at the end of the query.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding `WHERE` vs `HAVING`?",
    shortAnswer: "Use `WHERE` to filter individual rows before grouping (leveraging B-Tree indexes), and use `HAVING` strictly to filter calculated aggregate metrics after grouping.",
    explanation: "Final summary takeaway for Topic 12 in Module 6.",
    hint: "WHERE filters rows early via indexes; HAVING filters aggregate metrics late.",
    level: "basic"
  }
];

export default questions;
