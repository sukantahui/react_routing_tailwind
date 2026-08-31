// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What does the `BETWEEN ... AND` operator do in MySQL?",
    shortAnswer: "It tests whether a value falls within an inclusive specified range (`>= min AND <= max`).",
    explanation: "Syntactically cleaner shorthand for compound `>=` and `<=` conditions across numbers, dates, and strings.",
    hint: "Inclusive range filter.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE admission_fee BETWEEN 15000.00 AND 20000.00;"
  },
  {
    question: "Is the `BETWEEN` operator inclusive or exclusive of its boundary values?",
    shortAnswer: "It is strictly **INCLUSIVE** of both the minimum and maximum boundaries.",
    explanation: "If `fee` is exactly 15000.00 or exactly 20000.00, `fee BETWEEN 15000 AND 20000` evaluates to TRUE.",
    hint: "Both endpoint boundaries are included.",
    level: "basic"
  },
  {
    question: "What happens if the lower and upper bounds are reversed (e.g. `WHERE fee BETWEEN 20000 AND 15000`)?",
    shortAnswer: "The query returns 0 rows (empty result set) because no number can be simultaneously `>= 20000` AND `<= 15000`.",
    explanation: "MySQL does not auto-swap inverted boundaries. The first argument MUST be less than or equal to the second argument.",
    hint: "Reversed boundaries yield empty results.",
    level: "basic"
  },
  {
    question: "What is the 'DATETIME Trap' when using `BETWEEN` with date literals?",
    shortAnswer: "`WHERE datetime_col BETWEEN '2026-08-01' AND '2026-08-31'` implicitly pads the end date to `'2026-08-31 00:00:00'`, silently omitting all events that occurred later in the day on August 31st.",
    explanation: "Any timestamp at 09:30:00 on August 31st is greater than 00:00:00 and is excluded. The correct sargable pattern is `>= '2026-08-01' AND < '2026-09-01'`.",
    hint: "00:00:00 midnight end boundary truncation.",
    level: "expert",
    codeExample: "-- Dangerous: WHERE order_date BETWEEN '2026-08-01' AND '2026-08-31'\n-- Safe: WHERE order_date >= '2026-08-01 00:00:00' AND order_date < '2026-09-01 00:00:00'"
  },
  {
    question: "How does `NOT BETWEEN ... AND` evaluate in SQL?",
    shortAnswer: "It tests whether a value lies outside the specified range (`< min OR > max`).",
    explanation: "`WHERE score NOT BETWEEN 50 AND 80` selects scores strictly below 50 or strictly above 80.",
    hint: "Exclusive boundary outlier filter.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE admission_fee NOT BETWEEN 15000.00 AND 20000.00;"
  },
  {
    question: "How does `BETWEEN` work on string/alphabetical columns?",
    shortAnswer: "It compares strings lexicographically based on active collation weights.",
    explanation: "`WHERE name BETWEEN 'A' AND 'M'` includes names starting with A through L and literal 'M', but excludes 'Mamata' because 'Mamata' > 'M'.",
    hint: "Lexicographical alphabetical boundaries.",
    level: "moderate"
  },
  {
    question: "How does `BETWEEN` interact with B-Tree indexes in InnoDB?",
    shortAnswer: "MySQL utilizes an indexed range scan (type: `range` in EXPLAIN) to navigate directly to the start boundary in O(log N) and scan sequentially until the end boundary.",
    explanation: "Range scans are extremely efficient when the filtered column is indexed.",
    hint: "B-Tree range scan access method.",
    level: "expert"
  },
  {
    question: "How does `BETWEEN` handle `NULL` values when the test column is NULL?",
    shortAnswer: "`NULL BETWEEN min AND max` evaluates to `UNKNOWN` (treated as FALSE and rejected by WHERE).",
    explanation: "In Three-Valued Logic, comparing NULL against a range yields UNKNOWN.",
    hint: "NULL yields UNKNOWN in BETWEEN.",
    level: "moderate"
  },
  {
    question: "What happens if one of the boundary expressions in `BETWEEN` evaluates to `NULL`?",
    shortAnswer: "The entire `BETWEEN` condition evaluates to `UNKNOWN`, returning 0 rows.",
    explanation: "`val BETWEEN 100 AND NULL` evaluates to `val >= 100 AND val <= NULL` → `TRUE AND UNKNOWN` = `UNKNOWN`.",
    hint: "NULL boundary renders expression UNKNOWN.",
    level: "moderate"
  },
  {
    question: "Can dynamic subqueries or expressions be used as boundary arguments in `BETWEEN`?",
    shortAnswer: "Yes, boundary values can be subqueries, arithmetic calculations, or functions.",
    explanation: "`WHERE salary BETWEEN (SELECT min_sal FROM dept) AND (SELECT max_sal FROM dept)`.",
    hint: "Dynamic scalar expressions as boundaries.",
    level: "moderate",
    codeExample: "SELECT * FROM students\nWHERE admission_fee BETWEEN (avg_fee - 2000) AND (avg_fee + 2000);"
  },
  {
    question: "What is the difference between `WHERE age BETWEEN 20 AND 30` and `WHERE age >= 20 AND age <= 30`?",
    shortAnswer: "There is zero functional or performance difference; the MySQL query optimizer rewrites `BETWEEN` to `>= AND <=` internally.",
    explanation: "Both produce identical execution plans; `BETWEEN` is syntactic sugar for readability.",
    hint: "Exact internal query rewrite equivalence.",
    level: "basic"
  },
  {
    question: "How do you filter records for a specific calendar year using `BETWEEN` sargably on a `DATE` column?",
    shortAnswer: "`WHERE date_col BETWEEN '2026-01-01' AND '2026-12-31'`.",
    explanation: "On pure `DATE` types (no time component), this captures the entire calendar year cleanly while utilizing indexes.",
    hint: "Full calendar year boundary on DATE type.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE date_of_birth BETWEEN '2005-01-01' AND '2005-12-31';"
  },
  {
    question: "Can `BETWEEN` be used on composite (row constructor) tuples in MySQL?",
    shortAnswer: "Yes, `WHERE (col1, col2) BETWEEN (min1, min2) AND (max1, max2)` is supported in MySQL 8.0.",
    explanation: "Useful for multi-column range bounding.",
    hint: "Row constructor range comparison.",
    level: "expert",
    codeExample: "SELECT * FROM points WHERE (x, y) BETWEEN (0, 0) AND (10, 10);"
  },
  {
    question: "Why does `WHERE created_at BETWEEN NOW() - INTERVAL 7 DAY AND NOW()` work safely for timestamps?",
    shortAnswer: "Because `NOW()` includes exact hours, minutes, and seconds, capturing the precise 7-day rolling window.",
    explanation: "Rolling temporal windows with `INTERVAL` dynamically compute both boundaries.",
    hint: "Dynamic INTERVAL arithmetic with NOW().",
    level: "moderate",
    codeExample: "SELECT * FROM user_activity\nWHERE last_login BETWEEN NOW() - INTERVAL 7 DAY AND NOW();"
  },
  {
    question: "How do you test if a numeric score is within 5% of a baseline using `BETWEEN`?",
    shortAnswer: "`WHERE actual_score BETWEEN (baseline * 0.95) AND (baseline * 1.05)`.",
    explanation: "Calculates mathematical tolerance bands around a baseline.",
    hint: "Percentage tolerance bands.",
    level: "basic"
  },
  {
    question: "What is the result of `SELECT 15 BETWEEN 10 AND 20` in MySQL?",
    shortAnswer: "`1` (representing boolean TRUE).",
    explanation: "15 is within the range [10, 20].",
    hint: "Boolean 1 outcome.",
    level: "basic"
  },
  {
    question: "What is the result of `SELECT 20 BETWEEN 10 AND 20`?",
    shortAnswer: "`1` (TRUE) because BETWEEN is inclusive of the endpoint.",
    explanation: "Endpoint matching confirms inclusivity.",
    hint: "Endpoint inclusivity verification.",
    level: "basic"
  },
  {
    question: "What is the result of `SELECT 21 BETWEEN 10 AND 20`?",
    shortAnswer: "`0` (representing boolean FALSE).",
    explanation: "21 exceeds the maximum boundary 20.",
    hint: "Boolean 0 for out-of-bounds.",
    level: "basic"
  },
  {
    question: "How do you combine `BETWEEN` with other logical operators (`AND`, `OR`)?",
    shortAnswer: "Just like any other comparison expression; wrap complex conditions in parentheses if combining with `OR`.",
    explanation: "`WHERE city = 'Barrackpore' AND (fee BETWEEN 15000 AND 20000 OR is_scholarship = 1)`.",
    hint: "Standard boolean combination.",
    level: "moderate"
  },
  {
    question: "Can `BETWEEN` be used in a `CASE WHEN` expression?",
    shortAnswer: "Yes, `CASE WHEN fee BETWEEN 0 AND 10000 THEN 'Tier 1' WHEN fee BETWEEN 10001 AND 20000 THEN 'Tier 2' ELSE 'Tier 3' END`.",
    explanation: "Extremely common in business reporting to categorize numeric metrics into discrete bands.",
    hint: "Bucket categorizations in CASE expressions.",
    level: "moderate",
    codeExample: "SELECT first_name,\n       CASE WHEN admission_fee BETWEEN 0 AND 15000 THEN 'Standard'\n            WHEN admission_fee BETWEEN 15001 AND 25000 THEN 'Premium'\n            ELSE 'Executive' END AS fee_category\nFROM students;"
  },
  {
    question: "How does `BETWEEN` behave with `TIME` data types (e.g. `shift_time BETWEEN '08:00:00' AND '17:00:00'`)?",
    shortAnswer: "It tests chronological duration intervals between 8 AM and 5 PM inclusively.",
    explanation: "MySQL compares TIME strings as chronological duration seconds.",
    hint: "TIME interval range checks.",
    level: "basic",
    codeExample: "SELECT * FROM class_schedules WHERE start_time BETWEEN '09:00:00' AND '13:00:00';"
  },
  {
    question: "Why should you avoid using `BETWEEN` on alphanumeric strings when filtering by letter prefixes (e.g. `BETWEEN 'A' AND 'C'`)?",
    shortAnswer: "Because `'C'` matches only the single letter 'C'; any word starting with 'C' followed by other letters (like 'Computer') is greater than 'C' and is excluded.",
    explanation: "To include words starting with 'C', the upper bound must be `'D'` or use regex/LIKE.",
    hint: "Alphanumeric string prefix truncation bug.",
    level: "expert"
  },
  {
    question: "What is an 'Index Range Scan' in MySQL `EXPLAIN` when using `BETWEEN`?",
    shortAnswer: "The optimizer accesses index leaf pages within a specific range without scanning the entire index tree.",
    explanation: "Identified in `EXPLAIN` output as `type: range`.",
    hint: "type: range in EXPLAIN plans.",
    level: "moderate"
  },
  {
    question: "How do you check if a transaction amount is within a normal standard deviation using `BETWEEN`?",
    shortAnswer: "`WHERE amount BETWEEN (mean - 2 * stddev) AND (mean + 2 * stddev)`.",
    explanation: "Standard statistical outlier detection in SQL financial ledgers.",
    hint: "Statistical tolerance range filtering.",
    level: "expert"
  },
  {
    question: "What happens if both operands in `BETWEEN` are identical (e.g. `WHERE fee BETWEEN 15000 AND 15000`)?",
    shortAnswer: "It evaluates identically to `WHERE fee = 15000`.",
    explanation: "Since boundaries are inclusive, identical min and max collapse to an exact equality check.",
    hint: "Single-point interval collapse.",
    level: "basic"
  },
  {
    question: "Can `BETWEEN` be used with `ENUM` columns in MySQL?",
    shortAnswer: "Yes, but it evaluates based on the internal integer indexes of the ENUM elements as defined in the schema.",
    explanation: "Because ENUMs have underlying integer positions, range comparisons follow their definition sequence.",
    hint: "ENUM integer sequence ordering.",
    level: "expert"
  },
  {
    question: "How do you write a check constraint using `BETWEEN` in MySQL 8.0?",
    shortAnswer: "`CHECK (admission_fee BETWEEN 10000.00 AND 50000.00)`.",
    explanation: "Enforces that inserted fees remain within valid institutional bounds.",
    hint: "CHECK constraint range validation.",
    level: "moderate",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_fee_range CHECK (admission_fee BETWEEN 10000.00 AND 50000.00);"
  },
  {
    question: "What is the performance difference between `BETWEEN` and `IN (val1, val2, ...)` when checking discrete integers?",
    shortAnswer: "`BETWEEN` checks a continuous range with 2 boundary seeks; `IN` checks a discrete list of specific values.",
    explanation: "If you want all integers from 1 to 100, `BETWEEN 1 AND 100` is vastly more efficient than listing 100 comma-separated numbers in `IN`.",
    hint: "Continuous range vs discrete set lookups.",
    level: "basic"
  },
  {
    question: "How does `BETWEEN` behave on columns with NULLs when using `NOT BETWEEN`?",
    shortAnswer: "Rows with NULL values in the test column are excluded by `NOT BETWEEN` because `NULL NOT BETWEEN min AND max` yields UNKNOWN.",
    explanation: "Negating does NOT capture NULL rows.",
    hint: "NOT BETWEEN excludes NULLs.",
    level: "moderate"
  },
  {
    question: "What is the recommended checklist when using `BETWEEN` in SQL queries?",
    shortAnswer: "1) Ensure `min_val <= max_val`. 2) For `DATETIME`, use open intervals (`>=` and `<`) instead of `BETWEEN`. 3) Ensure filtered columns are indexed. 4) Use single quotes on date/time literals. 5) Use `NOT BETWEEN` for outlier detection.",
    explanation: "Following these 5 rules eliminates datetime boundary bugs and maximizes B-Tree range scan performance.",
    hint: "Min/Max order, DATETIME open intervals, Index support, Quoted literals, Outlier detection.",
    level: "basic"
  }
];

export default questions;
