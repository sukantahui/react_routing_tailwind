// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the difference between a Simple CASE expression and a Searched CASE expression?",
    shortAnswer: "A Simple CASE compares a single expression against literal values using '=' (`CASE col WHEN val THEN ...`), whereas a Searched CASE evaluates independent boolean expressions (`CASE WHEN col >= 50 THEN ...`).",
    explanation: "Simple CASE vs Searched CASE distinction.",
    hint: "Simple checks equality against a base expression; Searched evaluates arbitrary boolean conditions.",
    level: "basic"
  },
  {
    question: "Why can't you test for NULL in a Simple CASE using `WHEN NULL THEN ...`?",
    shortAnswer: "Because Simple CASE checks equality using the `=` operator, and in SQL `col = NULL` evaluates to `UNKNOWN` (falsy), never matching. Searched CASE with `WHEN col IS NULL` must be used instead.",
    explanation: "NULL comparison limitation in Simple CASE.",
    hint: "Simple CASE uses '=' which fails for NULL; use Searched CASE with IS NULL.",
    level: "moderate"
  },
  {
    question: "What happens if no WHEN condition matches and there is NO `ELSE` clause in a CASE expression?",
    shortAnswer: "The CASE expression evaluates to and returns `NULL`.",
    explanation: "Default fallback behavior of CASE without ELSE.",
    hint: "Returns NULL.",
    level: "basic"
  },
  {
    question: "Does SQL CASE evaluate all WHEN conditions or does it short-circuit?",
    shortAnswer: "SQL CASE short-circuits: it evaluates WHEN conditions sequentially from top to bottom and terminates evaluation immediately upon encountering the first TRUE condition.",
    explanation: "Short-circuit evaluation in SQL CASE.",
    hint: "Short-circuits on the first true condition.",
    level: "basic"
  },
  {
    question: "Why is the order of WHEN clauses critical in Searched CASE expressions?",
    shortAnswer: "Because MySQL stops evaluating after the first TRUE match. If a general condition (e.g. `marks >= 40`) is placed before a specific condition (e.g. `marks >= 80`), the specific condition will never be reached.",
    explanation: "Condition ordering importance from specific to general.",
    hint: "Place most specific conditions first because evaluation stops at the first TRUE match.",
    level: "basic"
  },
  {
    question: "How do you write a custom priority sort in `ORDER BY` using CASE for ('URGENT', 'HIGH', 'NORMAL', 'LOW')?",
    shortAnswer: "`ORDER BY CASE priority WHEN 'URGENT' THEN 1 WHEN 'HIGH' THEN 2 WHEN 'NORMAL' THEN 3 WHEN 'LOW' THEN 4 ELSE 5 END ASC;`",
    explanation: "Custom sorting hierarchy with CASE.",
    hint: "ORDER BY CASE priority WHEN 'URGENT' THEN 1 ... END ASC.",
    level: "basic"
  },
  {
    question: "What is conditional aggregation in SQL, and how is CASE utilized within it?",
    shortAnswer: "Conditional aggregation wraps CASE inside aggregate functions (e.g. `SUM(CASE WHEN status = 'PAID' THEN fee_inr ELSE 0 END)`) to calculate metric breakdowns or pivot data into columns in a single query.",
    explanation: "Pivoting rows into columns via conditional aggregation.",
    hint: "SUM(CASE WHEN condition THEN value ELSE 0 END).",
    level: "moderate"
  },
  {
    question: "In academy fee tracking, how do you calculate student fee status as 'Full Paid', 'Partial Paid', or 'Unpaid'?",
    shortAnswer: "`CASE WHEN paid_amount >= total_fee THEN 'Full Paid' WHEN paid_amount > 0 THEN 'Partial Paid' ELSE 'Unpaid' END AS payment_status`",
    explanation: "Fee status categorization using Searched CASE.",
    hint: "CASE WHEN paid >= total THEN 'Full Paid' WHEN paid > 0 THEN 'Partial' ELSE 'Unpaid' END.",
    level: "basic"
  },
  {
    question: "Can CASE expressions be used inside the `GROUP BY` clause in MySQL?",
    shortAnswer: "YES. You can group rows into custom dynamic buckets (e.g. `GROUP BY CASE WHEN age < 18 THEN 'Minor' ELSE 'Adult' END`).",
    explanation: "Bucketing rows in GROUP BY using CASE.",
    hint: "Yes, grouping by CASE expressions creates custom categorical buckets.",
    level: "moderate"
  },
  {
    question: "What is the return data type of a CASE expression when different THEN branches return different types?",
    shortAnswer: "MySQL resolves the return type to the highest compatible data type that encompasses all THEN and ELSE branch outputs (type coercion).",
    explanation: "Data type resolution in CASE branches.",
    hint: "Coerced to the highest compatible common data type.",
    level: "moderate"
  },
  {
    question: "How do you count the number of passed students (`marks >= 40`) and failed students in a single query?",
    shortAnswer: "`SELECT SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END) AS passed, SUM(CASE WHEN marks < 40 THEN 1 ELSE 0 END) AS failed FROM marks;`",
    explanation: "Counting conditional subsets with SUM(CASE ...).",
    hint: "SUM(CASE WHEN marks >= 40 THEN 1 ELSE 0 END).",
    level: "basic"
  },
  {
    question: "What does `SELECT CASE 1 WHEN 1 THEN 'One' WHEN 1 THEN 'First One' END;` return?",
    shortAnswer: "`'One'` (because short-circuit evaluation picks the first matching WHEN branch).",
    explanation: "Duplicate WHEN branch resolution.",
    hint: "'One'",
    level: "basic"
  },
  {
    question: "Is `CASE` an expression (returns a scalar value) or a procedural statement in standard SQL DQL?",
    shortAnswer: "`CASE` in `SELECT/WHERE/ORDER BY` is a scalar expression that returns a single value per row. (In stored procedures, `CASE ... END CASE;` exists as a control statement).",
    explanation: "Expression vs statement distinction.",
    hint: "It is an expression that yields a scalar value per row.",
    level: "moderate"
  },
  {
    question: "How do you map branch codes ('BKP', 'KOL', 'ICH', 'JAD') to full city names using Simple CASE?",
    shortAnswer: "`SELECT CASE branch_code WHEN 'BKP' THEN 'Barrackpore' WHEN 'KOL' THEN 'Kolkata' WHEN 'ICH' THEN 'Ichapur' WHEN 'JAD' THEN 'Jadavpur' ELSE 'Other' END AS branch_name FROM centers;`",
    explanation: "Branch code mapping with Simple CASE.",
    hint: "CASE branch_code WHEN 'BKP' THEN 'Barrackpore' ... END.",
    level: "basic"
  },
  {
    question: "How do you categorize student age groups: 'Under 18', '18-25', '26-35', '36+' using Searched CASE?",
    shortAnswer: "`CASE WHEN age < 18 THEN 'Under 18' WHEN age BETWEEN 18 AND 25 THEN '18-25' WHEN age BETWEEN 26 AND 35 THEN '26-35' ELSE '36+' END AS age_group`",
    explanation: "Age bracket categorization.",
    hint: "CASE WHEN age < 18 THEN 'Under 18' WHEN age <= 25 THEN '18-25' ... END.",
    level: "basic"
  },
  {
    question: "Why should you prefer `COUNT(CASE WHEN cond THEN 1 END)` over `COUNT(CASE WHEN cond THEN 1 ELSE 0 END)`?",
    shortAnswer: "Because `COUNT(col)` ignores `NULL` but counts `0`. If you use `ELSE 0`, COUNT will count all rows! In contrast, omitting `ELSE` defaults to `NULL`, which `COUNT()` safely skips.",
    explanation: "Critical COUNT(CASE ...) gotcha regarding ELSE 0 vs ELSE NULL.",
    hint: "COUNT() counts 0 as a valid row! Omit ELSE so it defaults to NULL, or use SUM(CASE WHEN cond THEN 1 ELSE 0 END).",
    level: "expert"
  },
  {
    question: "Can multiple boolean conditions connected with `AND` and `OR` be used in a single `WHEN` clause of a Searched CASE?",
    shortAnswer: "YES (e.g. `WHEN department = 'IT' AND salary_inr > 75000 THEN 'Senior Tech Staff'`).",
    explanation: "Complex boolean predicates in Searched CASE.",
    hint: "Yes, arbitrary compound logical expressions are supported in Searched CASE.",
    level: "basic"
  },
  {
    question: "In e-commerce discount calculation, apply 10% discount for orders >= ₹5000, 5% for orders >= ₹2000, else 0% in Indian Rupee (₹).",
    shortAnswer: "`SELECT order_id, order_total_inr * (1 - CASE WHEN order_total_inr >= 5000 THEN 0.10 WHEN order_total_inr >= 2000 THEN 0.05 ELSE 0.00 END) AS net_total_inr FROM orders;`",
    explanation: "Tiered discount multiplier with Searched CASE.",
    hint: "order_total_inr * (1 - CASE WHEN order_total >= 5000 THEN 0.10 ... END).",
    level: "basic"
  },
  {
    question: "What is the equivalent of `IF(condition, v1, v2)` using a CASE expression?",
    shortAnswer: "`CASE WHEN condition THEN v1 ELSE v2 END`.",
    explanation: "IF to CASE equivalence.",
    hint: "CASE WHEN condition THEN v1 ELSE v2 END.",
    level: "basic"
  },
  {
    question: "What is the ANSI standard compliance status of the SQL CASE expression?",
    shortAnswer: "The CASE expression is fully ANSI SQL-92 compliant and is universally supported across MySQL, PostgreSQL, Oracle, Microsoft SQL Server, and SQLite.",
    explanation: "ANSI portability of CASE.",
    hint: "Fully ANSI SQL compliant and universal across all major relational databases.",
    level: "basic"
  },
  {
    question: "How do you calculate salary hike percentages in a single query based on employee performance ratings (1 to 5)?",
    shortAnswer: "`SELECT emp_name, current_salary_inr * (1 + CASE rating WHEN 5 THEN 0.20 WHEN 4 THEN 0.15 WHEN 3 THEN 0.10 WHEN 2 THEN 0.05 ELSE 0.00 END) AS revised_salary_inr FROM employees;`",
    explanation: "Salary increment matrix using Simple CASE.",
    hint: "salary * (1 + CASE rating WHEN 5 THEN 0.20 ... END).",
    level: "basic"
  },
  {
    question: "Can a CASE expression be nested inside another CASE expression in MySQL?",
    shortAnswer: "YES, CASE expressions can be nested within THEN or ELSE clauses, though flat Searched CASE expressions are preferred for readability.",
    explanation: "Nested CASE expressions.",
    hint: "Yes, nesting is supported up to standard SQL expression depth limits.",
    level: "moderate"
  },
  {
    question: "How do you safely avoid division by zero when calculating student attendance rate using CASE?",
    shortAnswer: "`SELECT CASE WHEN total_classes = 0 THEN 0.00 ELSE ROUND((attended_classes / total_classes) * 100, 2) END AS attendance_pct FROM batches;`",
    explanation: "Zero-division safety branch using CASE.",
    hint: "CASE WHEN total_classes = 0 THEN 0 ELSE (attended / total) * 100 END.",
    level: "basic"
  },
  {
    question: "How does MySQL optimize CASE expressions in the `SELECT` clause?",
    shortAnswer: "MySQL compiles the CASE expression into bytecode during query optimization and evaluates branches linearly per row using CPU-level short-circuit jumping.",
    explanation: "Query engine execution optimization for CASE.",
    hint: "Compiled into linear bytecode branch checks with short-circuit termination.",
    level: "expert"
  },
  {
    question: "Why does writing `WHERE CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END = 1` degrade query performance?",
    shortAnswer: "It creates a non-SARGable predicate, forcing a full table scan because the MySQL query optimizer cannot utilize B-Tree indexes on the `status` column.",
    explanation: "SARGability penalty of CASE in WHERE clause.",
    hint: "Non-SARGable; write directly as WHERE status = 'ACTIVE'.",
    level: "expert"
  },
  {
    question: "How do you perform dynamic column updates using CASE in an `UPDATE` statement?",
    shortAnswer: "`UPDATE students SET grade = CASE WHEN marks >= 80 THEN 'A' WHEN marks >= 60 THEN 'B' ELSE 'C' END;`",
    explanation: "Batch updating with CASE expression.",
    hint: "UPDATE table SET col = CASE WHEN ... END.",
    level: "basic"
  },
  {
    question: "What is the output of `SELECT CASE WHEN NULL THEN 'True' ELSE 'False' END;`?",
    shortAnswer: "`'False'` (in SQL boolean logic, NULL evaluates to UNKNOWN, which triggers the ELSE branch).",
    explanation: "NULL boolean condition in WHEN clause.",
    hint: "'False' (NULL is not TRUE).",
    level: "moderate"
  },
  {
    question: "How do you convert boolean bit/flag values (1/0 or TRUE/FALSE) into human-readable strings ('Yes'/'No') using CASE?",
    shortAnswer: "`SELECT student_name, CASE is_fee_paid WHEN 1 THEN 'Yes' ELSE 'No' END AS fee_cleared FROM students;`",
    explanation: "Boolean flag label conversion.",
    hint: "CASE is_fee_paid WHEN 1 THEN 'Yes' ELSE 'No' END.",
    level: "basic"
  },
  {
    question: "Can a CASE expression be used inside an `ON` clause in SQL JOINs?",
    shortAnswer: "YES. You can conditionally join tables based on dynamic criteria (e.g. `ON customers.id = (CASE WHEN orders.type = 'DIRECT' THEN orders.cust_id ELSE orders.partner_id END)`).",
    explanation: "Dynamic conditional join using CASE in ON clause.",
    hint: "Yes, CASE is a valid scalar expression inside ON clauses.",
    level: "expert"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding SQL CASE expressions?",
    shortAnswer: "Use Simple CASE for discrete value mapping, Searched CASE for inequalities and complex conditions, and leverage conditional aggregation (`SUM(CASE ...)`) to build flexible reporting pivots directly inside SQL.",
    explanation: "Final summary takeaway for Topic 8.",
    hint: "Use Simple CASE for equality, Searched CASE for ranges/booleans, and conditional aggregation for report pivots.",
    level: "basic"
  }
];

export default questions;
