// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the primary purpose of the `LAG()` window function in MySQL 8.0?",
    shortAnswer: "To access column data from a PRECEDING row (by a specified offset) within the current partition without performing a self-join.",
    explanation: "Standard for time-series comparisons against prior periods.",
    hint: "Accesses data from a preceding row in the partition.",
    level: "basic"
  },
  {
    question: "What is the primary purpose of the `LEAD()` window function in MySQL 8.0?",
    shortAnswer: "To access column data from a SUCCEEDING (following) row (by a specified offset) within the current partition without performing a self-join.",
    explanation: "Standard for looking ahead to subsequent periods.",
    hint: "Accesses data from a succeeding/following row in the partition.",
    level: "basic"
  },
  {
    question: "What is the default offset step if the second argument of `LAG(col)` or `LEAD(col)` is omitted?",
    shortAnswer: "`1` (exactly 1 row backward for LAG, 1 row forward for LEAD).",
    explanation: "Default offset distance is always 1 row.",
    hint: "Default offset is 1 row.",
    level: "basic"
  },
  {
    question: "What value does `LAG(col, 1)` return for the FIRST row in a partition by default?",
    shortAnswer: "`NULL` (because no preceding row exists before row 1).",
    explanation: "Boundary out-of-bounds default is NULL.",
    hint: "Returns NULL by default on the first row.",
    level: "basic"
  },
  {
    question: "How do you specify a custom fallback value to replace `NULL` when `LAG()` reaches the boundary?",
    shortAnswer: "Pass the third argument: `LAG(column, offset, default_value)` (e.g. `LAG(amount, 1, 0.00)`).",
    explanation: "Replaces boundary NULL with a specified default literal or expression.",
    hint: "Provide the 3rd parameter: LAG(col, 1, 0.00).",
    level: "basic"
  },
  {
    question: "How do student exam scores for Mamata, Susmita, Abhronila, and Debangshu demonstrate `LAG()`?",
    shortAnswer: "By comparing each student's Semester 2 exam score against their Semester 1 score using `LAG(exam_score_pct, 1) OVER (PARTITION BY student_id ORDER BY semester_num)` to compute grade trajectory improvement.",
    explanation: "Tracks individual semester-over-semester score growth.",
    hint: "Compares Semester 2 score against Semester 1 score for each student.",
    level: "basic"
  },
  {
    question: "How do you calculate Month-over-Month (MoM) revenue percentage growth using `LAG()`?",
    shortAnswer: "`SELECT month_date, rev, ROUND(((rev - LAG(rev, 1) OVER (ORDER BY month_date)) / LAG(rev, 1) OVER (ORDER BY month_date)) * 100.0, 2) AS mom_growth_pct FROM monthly_revenue;`",
    explanation: "Standard period-over-period financial growth formula.",
    hint: "((curr_rev - LAG(curr_rev)) / LAG(curr_rev)) * 100.0",
    level: "moderate"
  },
  {
    question: "How do you calculate the number of inactive days between consecutive student exam submissions?",
    shortAnswer: "`SELECT student_id, exam_date, DATEDIFF(exam_date, LAG(exam_date, 1) OVER (PARTITION BY student_id ORDER BY exam_date)) AS days_since_last_exam FROM exam_submissions;`",
    explanation: "Calculates time interval gaps between consecutive events.",
    hint: "DATEDIFF(curr_date, LAG(curr_date))",
    level: "moderate"
  },
  {
    question: "Can `LAG()` look back 3 rows (e.g. comparing Quarter 4 of current year to Quarter 1 of same year)?",
    shortAnswer: "YES; specifying an offset of 3: `LAG(revenue, 3) OVER (ORDER BY quarter_id)`.",
    explanation: "Any positive integer offset is supported.",
    hint: "Yes, use LAG(revenue, 3) to look back 3 rows.",
    level: "basic"
  },
  {
    question: "Can `LEAD()` be used to calculate customer retention churn windows?",
    shortAnswer: "YES; by checking if `LEAD(purchase_date) IS NULL` or if `DATEDIFF(LEAD(purchase_date), purchase_date) > 90` days.",
    explanation: "Forward-looking churn analysis in customer CRM databases.",
    hint: "Yes, compares current purchase date against the next purchase date.",
    level: "expert"
  },
  {
    question: "What is the performance difference between `LAG()` and a Self-Join (`table t1 JOIN table t2 ON t1.id = t2.prev_id`)?",
    shortAnswer: "`LAG()` performs an in-memory pointer shift in a single pass ($O(N \\log N)$), whereas a Self-Join duplicates row buffers and performs quadratic scans ($O(N^2)$ without composite indexes).",
    explanation: "Eliminates expensive self-join operations.",
    hint: "Single-pass in-memory pointer shift vs expensive table self-join.",
    level: "expert"
  },
  {
    question: "What happens if `PARTITION BY` is used with `LAG()`?",
    shortAnswer: "`LAG()` operates strictly within each partition boundary; the first row of each new partition resets and evaluates to the default fallback value (or `NULL`).",
    explanation: "Partitions are completely isolated from each other.",
    hint: "Calculations reset per partition; row 1 of each partition has no previous row.",
    level: "basic"
  },
  {
    question: "Why is `ORDER BY` strictly required when using `LAG()` and `LEAD()`?",
    shortAnswer: "Because 'preceding' and 'following' rows have no mathematical meaning unless a deterministic sequence is established with `ORDER BY`.",
    explanation: "Unordered sets have no logical previous or next row.",
    hint: "ORDER BY is required to define which row comes before or after.",
    level: "basic"
  },
  {
    question: "How do you detect price changes / rate increases in a product price history table?",
    shortAnswer: "`WITH PriceDiff AS (SELECT product_id, effective_date, price, (price - LAG(price, 1) OVER (PARTITION BY product_id ORDER BY effective_date)) AS price_change FROM product_pricing) SELECT * FROM PriceDiff WHERE price_change <> 0;`",
    explanation: "Isolates records where prices changed from previous tier.",
    hint: "Filter where price - LAG(price) is not equal to zero.",
    level: "moderate"
  },
  {
    question: "What is the result of `LAG(col, 0)` in MySQL?",
    shortAnswer: "It returns the value of the CURRENT row (offset 0).",
    explanation: "Offset 0 refers to the current row itself.",
    hint: "Returns the current row's value.",
    level: "moderate"
  },
  {
    question: "Can the offset parameter in `LAG(col, offset)` be negative?",
    shortAnswer: "NO; MySQL requires offset to be a non-negative integer literal or expression; negative offsets throw an error.",
    explanation: "Use LEAD() instead of negative LAG() offsets.",
    hint: "No, offset must be non-negative; use LEAD() for forward lookups.",
    level: "moderate"
  },
  {
    question: "Can the default value in `LAG(col, offset, default)` be an expression referencing another column?",
    shortAnswer: "YES; for example, `LAG(bonus, 1, base_salary)` will return `base_salary` if no previous row exists.",
    explanation: "Expressions can be evaluated as dynamic fallbacks.",
    hint: "Yes, column names and expressions can serve as fallback values.",
    level: "expert"
  },
  {
    question: "How do you find consecutive login streaks for students using `LAG()` and date subtraction?",
    shortAnswer: "Calculate `DATEDIFF(login_date, LAG(login_date, 1) OVER (PARTITION BY student_id ORDER BY login_date))`; consecutive days have a diff of exactly `1`.",
    explanation: "The foundation of solving Gaps & Islands problems.",
    hint: "Check where DATEDIFF(curr_date, LAG(curr_date)) = 1.",
    level: "expert"
  },
  {
    question: "How do you detect fraudulent rapid-fire debit transactions occurring within 60 seconds of each other?",
    shortAnswer: "`WITH TxGaps AS (SELECT card_num, tx_time, amount, TIMESTAMPDIFF(SECOND, LAG(tx_time) OVER (PARTITION BY card_num ORDER BY tx_time), tx_time) AS sec_gap FROM transactions) SELECT * FROM TxGaps WHERE sec_gap <= 60;`",
    explanation: "Real-time fraud velocity detection in banking databases.",
    hint: "Filter where TIMESTAMPDIFF(SECOND, LAG(tx_time), tx_time) <= 60.",
    level: "expert"
  },
  {
    question: "Can `LAG()` and `LEAD()` be used in the same `SELECT` statement simultaneously?",
    shortAnswer: "YES; you can retrieve both previous value `LAG(val)` and next value `LEAD(val)` on the same row to display full chronological context.",
    explanation: "Provides 3-point context (Previous, Current, Next) simultaneously.",
    hint: "Yes, you can combine LAG() and LEAD() in the same query.",
    level: "basic"
  },
  {
    question: "What is the memory impact of executing `LAG()` on a 1-million row table?",
    shortAnswer: "Extremely low, because MySQL only needs to maintain a pointer to the previous row in the sorted partition stream rather than creating large temporary hash tables.",
    explanation: "Offset lookups are instantaneous pointer shifts.",
    hint: "Very low; requires only a single-row pointer shift during partition scan.",
    level: "expert"
  },
  {
    question: "How do you calculate Year-over-Year (YoY) quarterly revenue growth?",
    shortAnswer: "Use `LAG(revenue, 4) OVER (ORDER BY year_num, quarter_num)` (looking back 4 quarters = 1 full year).",
    explanation: "Offset of 4 quarters looks back exactly one year.",
    hint: "LAG(revenue, 4) compares current quarter with same quarter last year.",
    level: "moderate"
  },
  {
    question: "What happens if the column data type in `LAG()` does not match the default fallback value type?",
    shortAnswer: "MySQL performs implicit type coercion, converting the fallback value to match the projected column's data type.",
    explanation: "Standard MySQL type coercion rules apply.",
    hint: "Performs implicit type coercion to match the column type.",
    level: "moderate"
  },
  {
    question: "How do you calculate employee salary changes across career promotions using `LAG()`?",
    shortAnswer: "`SELECT emp_name, promotion_date, new_salary, (new_salary - LAG(new_salary, 1, new_salary) OVER (PARTITION BY emp_id ORDER BY promotion_date)) AS salary_increment FROM promotion_history;`",
    explanation: "Calculates salary increment from previous role.",
    hint: "new_salary - LAG(new_salary) per employee partition.",
    level: "basic"
  },
  {
    question: "Can `LAG()` and `LEAD()` be combined with named windows in the `WINDOW` clause?",
    shortAnswer: "`SELECT LAG(score) OVER w, LEAD(score) OVER w FROM exams WINDOW w AS (PARTITION BY student_id ORDER BY exam_date);`",
    explanation: "Clean and reusable named window syntax.",
    hint: "Yes, use OVER w with a declared WINDOW clause.",
    level: "basic"
  },
  {
    question: "What error is triggered if `LAG()` is called without parentheses or without `OVER()`?",
    shortAnswer: "`Error 1064 (42000): You have an error in your SQL syntax` because `LAG` is a reserved window function keyword.",
    explanation: "LAG strictly requires the OVER() clause.",
    hint: "Error 1064: LAG requires the OVER() clause.",
    level: "basic"
  },
  {
    question: "How do you calculate the cumulative growth multiplier across consecutive periods?",
    shortAnswer: "Calculate period growth with `(curr / LAG(curr)) - 1` and compute compound growth with logarithms or iterative CTEs.",
    explanation: "Financial growth metric compounding.",
    hint: "Compute period ratio with curr / LAG(curr).",
    level: "expert"
  },
  {
    question: "Can `LEAD()` look forward 10 rows into the future?",
    shortAnswer: "YES; `LEAD(val, 10)` looks forward 10 rows within the partition.",
    explanation: "Any positive integer offset is valid.",
    hint: "Yes, LEAD(val, 10) looks 10 rows forward.",
    level: "basic"
  },
  {
    question: "Why should developers use `COALESCE()` with `LAG()` when division by prior value is performed?",
    shortAnswer: "To prevent division by zero or `NULL` errors when the previous period has zero revenue or is the initial partition row.",
    explanation: "Defensive calculation against Division by Zero errors.",
    hint: "Prevents division by zero or NULL crashes on the first row.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for `LAG()` and `LEAD()`?",
    shortAnswer: "Use `LAG()` and `LEAD()` for all time-series comparisons, MoM/YoY growth rates, event gap tracking, and streak detection, always provide an explicit `ORDER BY`, supply a defensive fallback default value, and leverage partition indexing to eliminate filesort overhead.",
    explanation: "Authoritative architectural best practices for value offset window functions.",
    hint: "LAG/LEAD for time-series + explicit ORDER BY + defensive fallback + indexed partitions.",
    level: "expert"
  }
];

export default questions;
