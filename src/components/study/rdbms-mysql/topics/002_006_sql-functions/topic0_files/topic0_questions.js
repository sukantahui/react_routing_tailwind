// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the fundamental difference in cardinality between a Scalar Function and an Aggregate Function?",
    shortAnswer: "A Scalar Function operates on individual rows and returns 1 value for every 1 input row ($1 \\to 1$), whereas an Aggregate Function operates on multiple rows and returns 1 summary value for a set of rows ($N \\to 1$).",
    explanation: "Core definition and cardinality difference.",
    hint: "Scalar is 1-to-1 per row; Aggregate is N-to-1 across multiple rows.",
    level: "basic"
  },
  {
    question: "List the Big 5 standard ANSI SQL Aggregate Functions.",
    shortAnswer: "`COUNT()`, `SUM()`, `AVG()`, `MIN()`, and `MAX()`.",
    explanation: "The 5 primary aggregate functions in SQL.",
    hint: "COUNT, SUM, AVG, MIN, MAX.",
    level: "basic"
  },
  {
    question: "Why is it illegal to use an aggregate function directly in a `WHERE` clause (e.g. `WHERE AVG(score) > 80`)?",
    shortAnswer: "Because the `WHERE` clause filters individual rows BEFORE grouping and aggregation take place. Aggregate filters must be placed in the `HAVING` clause.",
    explanation: "SQL execution order of operations.",
    hint: "WHERE filters rows before grouping; use HAVING for aggregate filters.",
    level: "basic"
  },
  {
    question: "Can a Scalar Function be used in a `WHERE` clause?",
    shortAnswer: "YES. For example: `WHERE LENGTH(student_name) > 10` or `WHERE UPPER(city) = 'BARRACKPORE'`.",
    explanation: "Scalar functions in WHERE clauses.",
    hint: "Yes, scalar functions can be evaluated per row in WHERE.",
    level: "basic"
  },
  {
    question: "How do aggregate functions handle `NULL` values during calculation?",
    shortAnswer: "Aggregate functions (SUM, AVG, MIN, MAX, COUNT(column)) completely ignore `NULL` values, excluding them from calculations. The only exception is `COUNT(*)`, which counts all rows including NULLs.",
    explanation: "NULL elimination in aggregate functions.",
    hint: "They ignore NULLs, except COUNT(*) which counts all rows.",
    level: "basic"
  },
  {
    question: "If a column contains values `(10, 20, NULL)`, what does `AVG(column)` return?",
    shortAnswer: "`15` (calculated as $\\frac{10 + 20}{2} = 15$, dividing by the count of non-null rows, NOT 3).",
    explanation: "AVG calculation ignoring NULLs.",
    hint: "(10 + 20) / 2 = 15.",
    level: "basic"
  },
  {
    question: "What error is triggered in MySQL 8.0 if you write `SELECT city, AVG(score) FROM students;` without a `GROUP BY` clause?",
    shortAnswer: "ERROR 1055 (42000): Expression of SELECT list is not in GROUP BY clause and contains nonaggregated column (under `ONLY_FULL_GROUP_BY`).",
    explanation: "ONLY_FULL_GROUP_BY enforcement in MySQL.",
    hint: "Error 1055: ONLY_FULL_GROUP_BY violation.",
    level: "moderate"
  },
  {
    question: "Can you nest an Aggregate Function inside a Scalar Function?",
    shortAnswer: "YES. For example: `ROUND(AVG(course_fee), 2)` or `CONCAT('₹', FORMAT(SUM(amount), 2))`.",
    explanation: "Nesting aggregate functions inside scalar functions.",
    hint: "Yes, wrapping aggregates in formatting scalar functions is standard practice.",
    level: "basic"
  },
  {
    question: "Can you nest an Aggregate Function inside another Aggregate Function in standard MySQL (e.g. `AVG(SUM(sales))` without a subquery)?",
    shortAnswer: "NO. MySQL throws an error; double aggregation requires a subquery or Common Table Expression (CTE).",
    explanation: "Prohibition of nested aggregate functions.",
    hint: "No, nested aggregates require subqueries or CTEs.",
    level: "moderate"
  },
  {
    question: "What is a 'Deterministic Function' in MySQL?",
    shortAnswer: "A function that always returns the exact same result given the same input parameters (e.g. `UPPER('barrackpore')` always returns `'BARRACKPORE'`).",
    explanation: "Definition of deterministic function.",
    hint: "Always returns the same output for identical inputs.",
    level: "moderate"
  },
  {
    question: "Give an example of a Non-Deterministic Scalar Function.",
    shortAnswer: "`NOW()`, `RAND()`, `UUID()`, or `CURTIME()` (their return values change on each execution).",
    explanation: "Examples of non-deterministic functions.",
    hint: "NOW(), RAND(), UUID().",
    level: "basic"
  },
  {
    question: "What does `COUNT(*)` count versus `COUNT(column_name)`?",
    shortAnswer: "`COUNT(*)` counts the total number of rows regardless of NULLs; `COUNT(column_name)` counts only rows where `column_name` is NOT NULL.",
    explanation: "Difference between COUNT(*) and COUNT(col).",
    hint: "COUNT(*) counts all rows; COUNT(col) counts non-null values.",
    level: "basic"
  },
  {
    question: "In academy management, write a scalar query to format student names to uppercase and calculate age from `dob`.",
    shortAnswer: "`SELECT UPPER(student_name), TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age FROM students;`",
    explanation: "Scalar transformations on strings and dates.",
    hint: "UPPER() and TIMESTAMPDIFF().",
    level: "basic"
  },
  {
    question: "If a table contains 0 rows, what do `COUNT(*)`, `SUM(fee)`, and `AVG(fee)` return?",
    shortAnswer: "`COUNT(*)` returns `0`; `SUM(fee)` and `AVG(fee)` return `NULL`.",
    explanation: "Aggregate behavior on empty tables.",
    hint: "COUNT returns 0; SUM and AVG return NULL.",
    level: "moderate"
  },
  {
    question: "How do you prevent `SUM()` on an empty table from returning NULL in financial reports?",
    shortAnswer: "Wrap the sum in `COALESCE()`: `COALESCE(SUM(fee), 0)`.",
    explanation: "COALESCE on aggregate sums.",
    hint: "Use COALESCE(SUM(fee), 0).",
    level: "basic"
  },
  {
    question: "Can `MIN()` and `MAX()` be used on String and Date columns?",
    shortAnswer: "YES. On strings, they return alphabetical extremes (A–Z); on dates, `MIN()` returns the earliest date and `MAX()` returns the most recent date.",
    explanation: "MIN/MAX on non-numeric types.",
    hint: "Yes, works on alphabetical strings and chronological dates.",
    level: "basic"
  },
  {
    question: "What is a 'Window Function' in MySQL 8.0 compared to an Aggregate Function?",
    shortAnswer: "A Window Function performs aggregate-like calculations across a set of rows but retains the individual row identities, returning a value for every row ($N \\to N$).",
    explanation: "Window functions vs aggregate functions.",
    hint: "Calculates aggregates without collapsing rows (N to N).",
    level: "moderate"
  },
  {
    question: "What keyword is used inside aggregate functions to compute distinct summaries (e.g. counting unique cities)?",
    shortAnswer: "`DISTINCT` (e.g. `COUNT(DISTINCT city)`).",
    explanation: "DISTINCT modifier in aggregates.",
    hint: "DISTINCT keyword inside parentheses.",
    level: "basic"
  },
  {
    question: "In retail analytics, how do you find the total distinct products sold across all orders?",
    shortAnswer: "`SELECT COUNT(DISTINCT product_id) FROM order_items;`",
    explanation: "Distinct product counting.",
    hint: "COUNT(DISTINCT product_id).",
    level: "basic"
  },
  {
    question: "Why should applying scalar functions to indexed columns in `WHERE` clauses be avoided (e.g. `WHERE YEAR(order_date) = 2026`)?",
    shortAnswer: "Because wrapping indexed columns in scalar functions prevents the B-Tree index from performing direct seek lookups, forcing full table/index scans.",
    explanation: "SARGable predicates and index disabling scalar functions.",
    hint: "Disables B-Tree index seek lookups (non-SARGable).",
    level: "moderate"
  },
  {
    question: "How do you rewrite `WHERE YEAR(order_date) = 2026` to make it SARGable (index-friendly)?",
    shortAnswer: "`WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01'`.",
    explanation: "SARGable range rewrite.",
    hint: "Use date range: >= '2026-01-01' AND < '2027-01-01'.",
    level: "moderate"
  },
  {
    question: "What does `GROUP_CONCAT()` do in MySQL?",
    shortAnswer: "It is an aggregate function that concatenates non-null string values from multiple rows in a group into a single comma-separated string.",
    explanation: "GROUP_CONCAT aggregate function.",
    hint: "Concatenates multiple row strings into a single comma-separated string.",
    level: "basic"
  },
  {
    question: "What is the return type of `COUNT(*)` in MySQL?",
    shortAnswer: "`BIGINT`.",
    explanation: "Data type of COUNT.",
    hint: "BIGINT.",
    level: "moderate"
  },
  {
    question: "Can scalar functions accept multiple arguments?",
    shortAnswer: "YES (e.g. `CONCAT_WS(', ', city, state, country)` or `ROUND(amount, 2)`).",
    explanation: "Multi-argument scalar functions.",
    hint: "Yes, many scalar functions take multiple arguments.",
    level: "basic"
  },
  {
    question: "In e-commerce, calculate the average discount amount applied per completed order using an aggregate function.",
    shortAnswer: "`SELECT CONCAT('₹', FORMAT(AVG(discount_amount), 2)) FROM orders WHERE status = 'COMPLETED';`",
    explanation: "Average discount calculation.",
    hint: "AVG(discount_amount) with FORMAT.",
    level: "basic"
  },
  {
    question: "What happens if a scalar function encounters a division by zero in MySQL?",
    shortAnswer: "It returns `NULL` and issues a warning (by default in standard SQL modes).",
    explanation: "Division by zero in scalar math.",
    hint: "Returns NULL and generates a warning.",
    level: "basic"
  },
  {
    question: "Can an aggregate query contain multiple aggregate functions in the same `SELECT` statement?",
    shortAnswer: "YES. For example: `SELECT COUNT(*), SUM(fee), AVG(fee), MIN(fee), MAX(fee) FROM courses;`.",
    explanation: "Multiple aggregates in single query.",
    hint: "Yes, multiple aggregate functions can be queried together.",
    level: "basic"
  },
  {
    question: "What is the default string delimiter used by `GROUP_CONCAT()`?",
    shortAnswer: "A comma (`,`).",
    explanation: "GROUP_CONCAT default delimiter.",
    hint: "Comma (,).",
    level: "basic"
  },
  {
    question: "How does `BIT_AND()` and `BIT_OR()` function in MySQL?",
    shortAnswer: "They are bitwise aggregate functions that perform bitwise AND / OR operations across all rows in a group.",
    explanation: "Bitwise aggregate functions in MySQL.",
    hint: "Bitwise aggregates across grouped rows.",
    level: "expert"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Scalar vs Aggregate Functions?",
    shortAnswer: "Scalar functions transform rows 1-to-1 and can be used anywhere; Aggregate functions compress rows N-to-1 to produce group summaries and must be filtered using `HAVING` rather than `WHERE`.",
    explanation: "Final summary conclusion for Topic 0 in Module 6.",
    hint: "Scalar transforms 1-to-1; Aggregate summarizes N-to-1 and filters via HAVING.",
    level: "basic"
  }
];

export default questions;
