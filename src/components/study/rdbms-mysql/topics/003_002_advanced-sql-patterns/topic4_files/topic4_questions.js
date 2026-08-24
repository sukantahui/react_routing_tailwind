// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What is the purpose of the `FIRST_VALUE()` window function in MySQL 8.0?",
    shortAnswer: "It returns the value of the specified column or expression evaluated at the FIRST row of the current window frame.",
    explanation: "Standard for comparing records against the leading partition benchmark.",
    hint: "Returns the value from the first row of the window frame.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `LAST_VALUE()` window function in MySQL 8.0?",
    shortAnswer: "It returns the value of the specified column or expression evaluated at the LAST row of the current window frame.",
    explanation: "Pulls the trailing boundary value.",
    hint: "Returns the value from the last row of the window frame.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `NTH_VALUE(expr, N)` window function in MySQL 8.0?",
    shortAnswer: "It returns the value of the specified column or expression evaluated at the $N$-th row of the current window frame (or `NULL` if fewer than $N$ rows exist).",
    explanation: "Extracts specific positional milestones (e.g. 2nd highest, 3rd lowest).",
    hint: "Returns the value from the N-th row of the window frame.",
    level: "basic"
  },
  {
    question: "What is the infamous 'Default Frame Trap' when using `LAST_VALUE()` with `ORDER BY`?",
    shortAnswer: "With `ORDER BY`, the default frame is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, which makes the 'last row' the current row itself; thus, `LAST_VALUE()` simply echoes the current row's value!",
    explanation: "One of the most famous pitfalls in SQL window analytics.",
    hint: "The default frame stops at CURRENT ROW, making LAST_VALUE return the current row.",
    level: "expert"
  },
  {
    question: "How do you fix `LAST_VALUE()` so that it returns the TRUE last row of the entire partition?",
    shortAnswer: "Explicitly specify the expanded frame: `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.",
    explanation: "Expands the window frame across the entire partition.",
    hint: "Add ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.",
    level: "expert"
  },
  {
    question: "How does `FIRST_VALUE()` help calculate the score gap between every student and the department topper (Valedictorian)?",
    shortAnswer: "By subtracting the student's score from `FIRST_VALUE(exam_score_pct) OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC)`.",
    explanation: "Attaches the highest score to every row for immediate gap computation.",
    hint: "FIRST_VALUE(score) OVER (PARTITION BY dept_id ORDER BY score DESC) - score",
    level: "basic"
  },
  {
    question: "What value does `NTH_VALUE(score, 3)` return for rows 1 and 2 in a partition?",
    shortAnswer: "`NULL` (because the 3rd row has not been reached yet or does not exist in the frame).",
    explanation: "Returns NULL until the N-th row is encompassed.",
    hint: "Returns NULL for rows prior to the N-th position.",
    level: "moderate"
  },
  {
    question: "Why should you also use `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` with `NTH_VALUE()`?",
    shortAnswer: "To ensure that the $N$-th row's value is available and broadcast to ALL rows in the partition, including rows 1 through $N-1$.",
    explanation: "Broadcasts the N-th value to all partition members.",
    hint: "Allows rows 1 through N-1 to also receive the N-th value instead of NULL.",
    level: "expert"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `FIRST_VALUE()`?",
    shortAnswer: "In the IT department, Abhronila's top score of 96.20% is attached to Debangshu's row via `FIRST_VALUE()`, showing Debangshu's 13.80% gap from the topper on the same row.",
    explanation: "Demonstrates relative distance from top performer.",
    hint: "Attaches Abhronila's top score (96.2%) to Debangshu's record.",
    level: "basic"
  },
  {
    question: "Can `FIRST_VALUE()` return string columns (e.g. the topper's name) as well as numeric columns?",
    shortAnswer: "YES; `FIRST_VALUE(student_name)` will return the name of the top-ranking student alongside every row.",
    explanation: "Works on any projected data type.",
    hint: "Yes, returns string attributes of the leading row.",
    level: "basic"
  },
  {
    question: "What is the difference between `FIRST_VALUE(score)` and `MAX(score) OVER ()`?",
    shortAnswer: "`MAX()` computes the mathematical maximum regardless of sort order; `FIRST_VALUE()` evaluates strictly whatever value appears in the first row dictated by the `ORDER BY` clause.",
    explanation: "FIRST_VALUE is order-dependent; MAX is order-independent.",
    hint: "FIRST_VALUE depends on the ORDER BY sequence; MAX is mathematically order-independent.",
    level: "expert"
  },
  {
    question: "How do you find the earliest enrolled student in each department using `FIRST_VALUE()`?",
    shortAnswer: "`FIRST_VALUE(student_name) OVER (PARTITION BY dept_id ORDER BY enrollment_date ASC)`.",
    explanation: "Orders by date ascending to pinpoint earliest member.",
    hint: "FIRST_VALUE(name) OVER (PARTITION BY dept_id ORDER BY enrollment_date ASC)",
    level: "basic"
  },
  {
    question: "What error occurs if the second parameter $N$ in `NTH_VALUE(expr, N)` is less than or equal to 0?",
    shortAnswer: "`Error 3584 (HY000): Argument 2 of nth_value must be greater than zero.`",
    explanation: "$N$ must be a strictly positive integer $\\ge 1$.",
    hint: "Error 3584: Argument 2 must be greater than zero.",
    level: "moderate"
  },
  {
    question: "Can `NTH_VALUE()` be used to find the median value in a partition of known size?",
    shortAnswer: "YES; for example, on a 5-row partition, `NTH_VALUE(score, 3)` extracts the exact median 3rd value.",
    explanation: "Positional median retrieval on fixed cardinality sets.",
    hint: "Yes, extracts the middle row in an odd-numbered partition.",
    level: "moderate"
  },
  {
    question: "How do you calculate each product's price difference from the cheapest product in its category?",
    shortAnswer: "`SELECT product_name, price, (price - FIRST_VALUE(price) OVER (PARTITION BY category_id ORDER BY price ASC)) AS diff_from_cheapest FROM products;`",
    explanation: "Price benchmark comparison against baseline.",
    hint: "price - FIRST_VALUE(price) OVER (PARTITION BY category_id ORDER BY price ASC)",
    level: "basic"
  },
  {
    question: "What is the result of `FIRST_VALUE(col)` if the first row in the partition contains `NULL`?",
    shortAnswer: "It returns `NULL`.",
    explanation: "Returns whatever value exists at row 1.",
    hint: "Returns NULL if the first row is NULL.",
    level: "moderate"
  },
  {
    question: "How does `IGNORE NULLS` compare in standard SQL vs MySQL 8.0 support?",
    shortAnswer: "ANSI SQL supports `FIRST_VALUE(col IGNORE NULLS)`; however, MySQL 8.0 does not yet support the `IGNORE NULLS` clause (evaluating nulls as standard values).",
    explanation: "Engine-specific syntax constraint in MySQL.",
    hint: "MySQL 8.0 does not support the IGNORE NULLS clause for window functions.",
    level: "expert"
  },
  {
    question: "Can `FIRST_VALUE()` and `LAST_VALUE()` share the same named window specification?",
    shortAnswer: "YES; if the named window includes `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.",
    explanation: "Reusable named window sharing.",
    hint: "Yes, when the window frame is expanded to UNBOUNDED FOLLOWING.",
    level: "basic"
  },
  {
    question: "How do you track the initial opening fee vs the latest payment in a student payment history table?",
    shortAnswer: "`SELECT FIRST_VALUE(amount) OVER w AS initial_installment, LAST_VALUE(amount) OVER w AS latest_installment FROM fee_payments WINDOW w AS (PARTITION BY student_id ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING);`",
    explanation: "Initial vs latest transaction tracking in pure SQL.",
    hint: "FIRST_VALUE for initial, LAST_VALUE with expanded frame for latest.",
    level: "moderate"
  },
  {
    question: "Why is `NTH_VALUE(col, 2)` often used instead of self-joins for 2nd place runner-up bonuses?",
    shortAnswer: "Because it computes the 2nd place value in a single in-memory pass ($O(N \\log N)$) without duplicating rows or creating intermediate cartesian tables.",
    explanation: "Sub-millisecond analytical milestone extraction.",
    hint: "Single-pass in-memory extraction without row duplication.",
    level: "expert"
  },
  {
    question: "What is the output of `LAST_VALUE(col)` if `ORDER BY` is completely omitted from the `OVER()` clause?",
    shortAnswer: "Without `ORDER BY`, the default frame is the whole partition, so it returns the true last row (in physical storage order).",
    explanation: "Default frame without ORDER BY covers the whole partition.",
    hint: "Returns the last row because default frame covers the whole partition without ORDER BY.",
    level: "expert"
  },
  {
    question: "How do you find the highest and lowest scores in a department on every student record in a single query?",
    shortAnswer: "`SELECT student_name, FIRST_VALUE(score) OVER w AS top_score, LAST_VALUE(score) OVER w AS min_score FROM students WINDOW w AS (PARTITION BY dept_id ORDER BY score DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING);`",
    explanation: "Dual boundary extraction in one statement.",
    hint: "FIRST_VALUE for max score, LAST_VALUE for min score with expanded frame.",
    level: "basic"
  },
  {
    question: "Can `FIRST_VALUE()` be used inside a Common Table Expression (CTE)?",
    shortAnswer: "YES; computing boundary benchmarks inside a CTE allows outer queries to filter based on percentage of the top performer.",
    explanation: "Standard multi-stage analytics pipeline pattern.",
    hint: "Yes, computing FIRST_VALUE in a CTE allows clean outer filtering.",
    level: "basic"
  },
  {
    question: "How do you calculate the ratio of each student's score relative to the department valedictorian?",
    shortAnswer: "`ROUND((exam_score_pct / FIRST_VALUE(exam_score_pct) OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC)) * 100.0, 2)`.",
    explanation: "Computes performance index percentage.",
    hint: "(score / FIRST_VALUE(score)) * 100.0",
    level: "basic"
  },
  {
    question: "What index optimizes `FIRST_VALUE() OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC)`?",
    shortAnswer: "A composite B-Tree index on `(dept_id, exam_score_pct DESC)`.",
    explanation: "Allows streaming directly in partition and sort order with zero filesort overhead.",
    hint: "Composite index on (dept_id, exam_score_pct DESC).",
    level: "expert"
  },
  {
    question: "Can `NTH_VALUE()` extract the 10th highest value in a leaderboard?",
    shortAnswer: "YES; `NTH_VALUE(score, 10)` with an expanded window frame.",
    explanation: "Positional milestone extraction for top-10 cutoffs.",
    hint: "Yes, NTH_VALUE(score, 10) extracts the 10th row.",
    level: "basic"
  },
  {
    question: "What happens if a partition has only 3 rows and `NTH_VALUE(score, 5)` is requested?",
    shortAnswer: "`NULL` is returned for all rows in that partition.",
    explanation: "Offset exceeds available partition cardinality.",
    hint: "Returns NULL because the partition contains fewer than 5 rows.",
    level: "basic"
  },
  {
    question: "Why should `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` be used instead of `RANGE` for `LAST_VALUE()`?",
    shortAnswer: "Because `ROWS` operates on physical row offsets and is significantly faster and more predictable than `RANGE` value-based interval evaluation.",
    explanation: "Physical row framing is faster and deterministic.",
    hint: "ROWS framing is faster and physically deterministic compared to RANGE.",
    level: "expert"
  },
  {
    question: "Can multiple `NTH_VALUE()` calls for 1st, 2nd, and 3rd place be combined in one query?",
    shortAnswer: "YES; extracting Gold, Silver, and Bronze benchmarks on every row simultaneously using `NTH_VALUE(score, 1)`, `NTH_VALUE(score, 2)`, and `NTH_VALUE(score, 3)`.",
    explanation: "Multi-podium milestone attachment in analytical SQL.",
    hint: "Yes, you can project multiple NTH_VALUE milestones in the same query.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Boundary Value Functions (`FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE`)?",
    shortAnswer: "Use `FIRST_VALUE()` for comparing against the top performer, always expand the window frame to `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` when using `LAST_VALUE()` or `NTH_VALUE()` to avoid the default current-row trap, and use named windows for DRY query architecture.",
    explanation: "Authoritative architectural best practices for boundary window functions.",
    hint: "FIRST_VALUE for toppers + expand frame to UNBOUNDED FOLLOWING for LAST_VALUE/NTH_VALUE + named windows for DRY.",
    level: "expert"
  }
];

export default questions;
