// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What does `IF(5 > 3, 'Yes', 'No')` return in MySQL?",
    shortAnswer: "`'Yes'`.",
    explanation: "Basic ternary IF function evaluation.",
    hint: "'Yes'",
    level: "basic"
  },
  {
    question: "What is the difference between `IFNULL()` and `COALESCE()`?",
    shortAnswer: "`IFNULL()` accepts exactly 2 arguments (MySQL-specific), while `COALESCE()` accepts arbitrary (2 or more) arguments and is ANSI SQL compliant.",
    explanation: "IFNULL vs COALESCE comparison.",
    hint: "IFNULL takes 2 arguments; COALESCE takes arbitrary arguments and is ANSI compliant.",
    level: "basic"
  },
  {
    question: "What does `COALESCE(NULL, NULL, 'Kolkata', 'Barrackpore')` return?",
    shortAnswer: "`'Kolkata'` (the first non-null value in the argument list).",
    explanation: "COALESCE evaluation order.",
    hint: "'Kolkata'",
    level: "basic"
  },
  {
    question: "What does `NULLIF(50, 50)` return?",
    shortAnswer: "`NULL` (returns NULL if both arguments are equal).",
    explanation: "NULLIF equality condition.",
    hint: "NULL.",
    level: "basic"
  },
  {
    question: "What does `NULLIF(50, 100)` return?",
    shortAnswer: "`50` (returns the first argument if arguments are not equal).",
    explanation: "NULLIF inequality condition.",
    hint: "50.",
    level: "basic"
  },
  {
    question: "How does `NULLIF()` protect SQL queries against division by zero errors?",
    shortAnswer: "Writing `dividend / NULLIF(divisor, 0)` converts a zero divisor to `NULL`, causing the division to safely evaluate to `NULL` rather than erroring or dividing by zero.",
    explanation: "Division by zero defense using NULLIF.",
    hint: "Converts 0 divisor to NULL: dividend / NULLIF(divisor, 0).",
    level: "moderate"
  },
  {
    question: "In student attendance, calculate attendance percentage safely when `total_classes` can be 0.",
    shortAnswer: "`ROUND((attended_classes / NULLIF(total_classes, 0)) * 100, 2)`.",
    explanation: "Safe percentage formula with NULLIF.",
    hint: "(attended / NULLIF(total, 0)) * 100.",
    level: "basic"
  },
  {
    question: "What does `IFNULL(NULL, 0)` return?",
    shortAnswer: "`0`.",
    explanation: "IFNULL with NULL first argument.",
    hint: "0.",
    level: "basic"
  },
  {
    question: "What does `IFNULL('Mamata', 'Anonymous')` return?",
    shortAnswer: "`'Mamata'` (returns first argument when NOT NULL).",
    explanation: "IFNULL with non-null first argument.",
    hint: "'Mamata'",
    level: "basic"
  },
  {
    question: "What does `COALESCE(NULL, NULL, NULL)` return?",
    shortAnswer: "`NULL` (if all arguments are NULL, COALESCE returns NULL).",
    explanation: "All-NULL COALESCE evaluation.",
    hint: "NULL.",
    level: "basic"
  },
  {
    question: "In financial reporting, why should `COALESCE(SUM(amount), 0)` be used on empty filtered tables?",
    shortAnswer: "Because `SUM()` on 0 matching rows returns `NULL`; wrapping it in `COALESCE()` ensures the report displays numeric `₹0.00` instead of `NULL`.",
    explanation: "COALESCE on aggregate sums for clean reporting.",
    hint: "Ensures numeric 0.00 output instead of NULL on empty results.",
    level: "basic"
  },
  {
    question: "What does `IF(score >= 40, 'PASS', 'FAIL')` return for `score = NULL`?",
    shortAnswer: "`'FAIL'` (because `NULL >= 40` evaluates to UNKNOWN, which the `IF()` function treats as FALSE).",
    explanation: "Three-valued logic in IF function.",
    hint: "'FAIL' (NULL is treated as false).",
    level: "moderate"
  },
  {
    question: "Can `IF()` functions be nested inside other `IF()` functions in MySQL?",
    shortAnswer: "YES (e.g. `IF(score >= 80, 'A', IF(score >= 60, 'B', 'C'))`).",
    explanation: "Nested IF functions.",
    hint: "Yes, IF functions can be nested.",
    level: "basic"
  },
  {
    question: "In customer contact cascades, how do you pick the first available contact from `(mobile, whatsapp, landline, email)`?",
    shortAnswer: "`SELECT COALESCE(mobile, whatsapp, landline, email, 'No Contact') AS primary_contact FROM customers;`",
    explanation: "Contact waterfall cascade with COALESCE.",
    hint: "COALESCE(mobile, whatsapp, landline, email, 'No Contact').",
    level: "basic"
  },
  {
    question: "What is `NVL()` in Oracle, and what is its MySQL equivalent?",
    shortAnswer: "The MySQL equivalent of Oracle's `NVL()` is `IFNULL()` (or ANSI standard `COALESCE()`).",
    explanation: "Oracle NVL equivalence.",
    hint: "IFNULL() or COALESCE().",
    level: "moderate"
  },
  {
    question: "What is `NVL2(expr1, expr2, expr3)` in Oracle, and how is it written in MySQL?",
    shortAnswer: "In MySQL, it is written as `IF(expr1 IS NOT NULL, expr2, expr3)`.",
    explanation: "Oracle NVL2 equivalence in MySQL.",
    hint: "IF(expr1 IS NOT NULL, expr2, expr3).",
    level: "moderate"
  },
  {
    question: "In discount pricing, if `discount_pct` is NULL, default to 0% discount and calculate net price in Indian Rupee (₹).",
    shortAnswer: "`SELECT price * (1 - IFNULL(discount_pct, 0) / 100) AS net_price_inr FROM products;`",
    explanation: "Discount calculation with IFNULL.",
    hint: "price * (1 - IFNULL(discount_pct, 0) / 100).",
    level: "basic"
  },
  {
    question: "What does `IF(1, 'TrueBranch', 'FalseBranch')` return in MySQL?",
    shortAnswer: "`'TrueBranch'` (in MySQL, any non-zero numeric value is treated as TRUE).",
    explanation: "Numeric truthiness in IF.",
    hint: "'TrueBranch' (1 is truthy).",
    level: "basic"
  },
  {
    question: "What does `IF(0, 'TrueBranch', 'FalseBranch')` return in MySQL?",
    shortAnswer: "`'FalseBranch'` (0 is treated as FALSE).",
    explanation: "Zero falsiness in IF.",
    hint: "'FalseBranch' (0 is falsy).",
    level: "basic"
  },
  {
    question: "What is the return data type of `COALESCE('10', 20)`?",
    shortAnswer: "MySQL coerces arguments to a compatible type, returning a `VARCHAR` string (`'10'`).",
    explanation: "Type coercion in COALESCE.",
    hint: "VARCHAR string.",
    level: "moderate"
  },
  {
    question: "In academy batch registration, how do you format student status as 'Enrolled' if `fee_paid > 0` else 'Pending'?",
    shortAnswer: "`SELECT student_name, IF(fee_paid > 0, 'Enrolled', 'Pending') AS status FROM students;`",
    explanation: "Status derivation with IF.",
    hint: "IF(fee_paid > 0, 'Enrolled', 'Pending').",
    level: "basic"
  },
  {
    question: "What happens if both arguments to `NULLIF(NULL, NULL)` are NULL?",
    shortAnswer: "`NULL` (since `NULL = NULL` is UNKNOWN, they are not considered equal, but the first argument itself is NULL).",
    explanation: "NULLIF with NULL arguments.",
    hint: "NULL.",
    level: "moderate"
  },
  {
    question: "Why is `COALESCE()` preferred over `IFNULL()` in enterprise multi-database architectures?",
    shortAnswer: "Because `COALESCE()` is ANSI SQL standard and works identically on MySQL, PostgreSQL, Oracle, SQL Server, and SQLite.",
    explanation: "ANSI portability advantage.",
    hint: "ANSI standard across PostgreSQL, Oracle, SQL Server, and SQLite.",
    level: "basic"
  },
  {
    question: "In inventory restocking, how do you compute reorder quantity: if `stock < 10`, reorder `(50 - stock)`, else 0?",
    shortAnswer: "`SELECT product_name, IF(stock < 10, 50 - stock, 0) AS reorder_units FROM inventory;`",
    explanation: "Reorder logic using IF.",
    hint: "IF(stock < 10, 50 - stock, 0).",
    level: "basic"
  },
  {
    question: "What does `IFNULL(1 / 0, 'ZeroDivision')` return in MySQL?",
    shortAnswer: "`'ZeroDivision'` (because division by zero produces `NULL` in MySQL).",
    explanation: "Division by zero with IFNULL fallback.",
    hint: "'ZeroDivision'",
    level: "moderate"
  },
  {
    question: "How do you mask missing phone numbers with `'[NOT PROVIDED]'` in a single query?",
    shortAnswer: "`SELECT student_name, COALESCE(phone_number, '[NOT PROVIDED]') FROM students;`",
    explanation: "Masking missing values with COALESCE.",
    hint: "COALESCE(phone_number, '[NOT PROVIDED]').",
    level: "basic"
  },
  {
    question: "What does `IF(STRCMP('Kolkata', 'Kolkata') = 0, 'Match', 'Mismatch')` return?",
    shortAnswer: "`'Match'` (since `STRCMP()` returns 0 for equal strings).",
    explanation: "Combining STRCMP with IF.",
    hint: "'Match'",
    level: "moderate"
  },
  {
    question: "Can `COALESCE()` be used inside aggregate functions (e.g. `SUM(COALESCE(bonus, 0))` vs `COALESCE(SUM(bonus), 0)`)?",
    shortAnswer: "YES. `COALESCE(SUM(bonus), 0)` is more efficient because it coalesces the final single sum rather than evaluating per row.",
    explanation: "Performance placement of COALESCE with SUM.",
    hint: "Yes; COALESCE(SUM(col), 0) is faster than SUM(COALESCE(col, 0)).",
    level: "expert"
  },
  {
    question: "Why does `WHERE IF(status = 'ACTIVE', 1, 0) = 1` hurt query optimization?",
    shortAnswer: "Because wrapping `status` inside the `IF()` function disables B-Tree index lookups; it should be written directly as `WHERE status = 'ACTIVE'`.",
    explanation: "SARGability penalty of wrapping index columns in IF.",
    hint: "Non-SARGable; write directly as WHERE status = 'ACTIVE'.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Flow Control Functions?",
    shortAnswer: "Use `IF()` for binary ternary branches, `COALESCE()` for multi-tier NULL fallbacks and safe aggregate sums, and `NULLIF()` to prevent runtime division by zero.",
    explanation: "Final summary conclusion for Topic 7 in Module 6.",
    hint: "Use IF for ternary branches, COALESCE for fallbacks/sums, and NULLIF for zero-division safety.",
    level: "basic"
  }
];

export default questions;
