// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the primary difference between `ROWS` and `RANGE` in window frame specifications?",
    shortAnswer: "`ROWS` counts physical rows (independent of duplicate values), whereas `RANGE` operates on logical value intervals and groups rows with tied `ORDER BY` values as peers.",
    explanation: "The defining distinction between physical vs logical window framing.",
    hint: "ROWS counts physical rows; RANGE groups tied values together as logical peers.",
    level: "basic"
  },
  {
    question: "What is the default window frame when `ORDER BY` is specified inside `OVER()` without an explicit frame clause?",
    shortAnswer: "`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.",
    explanation: "The ANSI SQL standard default running total frame.",
    hint: "RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
    level: "basic"
  },
  {
    question: "What is the default window frame when `ORDER BY` is NOT specified inside `OVER()`?",
    shortAnswer: "`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` (or RANGE equivalent encompassing the whole partition).",
    explanation: "Evaluates across the entire partition.",
    hint: "Covers the entire partition from start to finish.",
    level: "basic"
  },
  {
    question: "How do you specify a sliding 3-row moving average (current row and 2 preceding rows) using `ROWS`?",
    shortAnswer: "`AVG(score) OVER (ORDER BY exam_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.",
    explanation: "Encompasses exactly 3 physical rows (current + 2 prior).",
    hint: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW",
    level: "basic"
  },
  {
    question: "How do you specify a centered 3-row smoothing window (1 preceding, current row, and 1 following)?",
    shortAnswer: "`AVG(score) OVER (ORDER BY exam_date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)`.",
    explanation: "Centered symmetric moving window.",
    hint: "ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING",
    level: "basic"
  },
  {
    question: "What happens when `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` is evaluated on Row 1 of a partition?",
    shortAnswer: "It calculates over Row 1 only, because no preceding rows exist (MySQL does not fail or error).",
    explanation: "Window frames adapt gracefully at partition boundaries.",
    hint: "Calculates on Row 1 only without error.",
    level: "moderate"
  },
  {
    question: "What happens when two rows have identical `ORDER BY` dates when calculating running sums with default `RANGE` framing?",
    shortAnswer: "Both rows receive the exact same accumulated sum reflecting both tied rows combined, rather than advancing step-by-step.",
    explanation: "RANGE includes all peer rows with identical sort keys.",
    hint: "Both tied rows receive the combined sum of both peers.",
    level: "expert"
  },
  {
    question: "How do you force strict step-by-step row-level accumulation even when dates/values are tied?",
    shortAnswer: "Use `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.",
    explanation: "`ROWS` forces row-by-row physical progression.",
    hint: "Use ROWS instead of RANGE.",
    level: "expert"
  },
  {
    question: "How do you specify a trailing 7-day calendar window in MySQL 8.0 using `RANGE`?",
    shortAnswer: "`SUM(amount) OVER (ORDER BY payment_date RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW)`.",
    explanation: "Date interval framing supported in MySQL 8.0.",
    hint: "RANGE BETWEEN INTERVAL 7 DAY PRECEDING AND CURRENT ROW",
    level: "expert"
  },
  {
    question: "Can a window frame start at `CURRENT ROW` and extend to `UNBOUNDED FOLLOWING`?",
    shortAnswer: "YES; `ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING` computes trailing sums or lookahead aggregates from current row to the end of the partition.",
    explanation: "Forward-looking partition aggregation.",
    hint: "Yes, ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING.",
    level: "moderate"
  },
  {
    question: "Is `ROWS 5 PRECEDING` a valid shorthand in MySQL 8.0?",
    shortAnswer: "YES; `ROWS 5 PRECEDING` is valid shorthand for `ROWS BETWEEN 5 PRECEDING AND CURRENT ROW`.",
    explanation: "ANSI SQL shorthand syntax.",
    hint: "Yes, shorthand for BETWEEN 5 PRECEDING AND CURRENT ROW.",
    level: "moderate"
  },
  {
    question: "Can a frame start at `2 PRECEDING` and end at `1 PRECEDING` (excluding the current row)?",
    shortAnswer: "YES; `ROWS BETWEEN 2 PRECEDING AND 1 PRECEDING` calculates exclusively over prior rows without including the current row.",
    explanation: "Valid frame excluding current row.",
    hint: "Yes, frames can exclude the current row entirely.",
    level: "expert"
  },
  {
    question: "Can a frame start at `1 FOLLOWING` and end at `3 FOLLOWING` (future lookahead window)?",
    shortAnswer: "YES; `ROWS BETWEEN 1 FOLLOWING AND 3 FOLLOWING` computes metrics over the next 3 future rows.",
    explanation: "Future-only sliding window.",
    hint: "Yes, lookahead windows using FOLLOWING boundaries are valid.",
    level: "expert"
  },
  {
    question: "What error is triggered if the frame starting boundary is positioned after the ending boundary (e.g. `BETWEEN 1 FOLLOWING AND 1 PRECEDING`)?",
    shortAnswer: "`Error 3587 (HY000): Window '<window_name>' frame start cannot be after frame end.`",
    explanation: "Frame start must strictly precede frame end chronologically.",
    hint: "Error 3587: Frame start cannot be after frame end.",
    level: "basic"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu illustrate `ROWS` vs `RANGE` on tied scores?",
    shortAnswer: "If Mamata and Susmita both score 94.50%, `RANGE` sums both of their scores at step 2, giving both the combined total ₹1,89,000, whereas `ROWS` adds them one by one.",
    explanation: "Demonstrates physical row stepping vs logical peer merging.",
    hint: "RANGE combines tied scores into one lump sum; ROWS adds them step-by-step.",
    level: "basic"
  },
  {
    question: "Which keyword combination expands the window frame across the ENTIRE partition?",
    shortAnswer: "`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`.",
    explanation: "Spans from the very first row to the very last row.",
    hint: "ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING.",
    level: "basic"
  },
  {
    question: "Why is `ROWS` framing generally faster in execution than `RANGE` framing?",
    shortAnswer: "Because `ROWS` uses simple integer pointer math to track row offsets, whereas `RANGE` must compare column values across rows to identify and group peers.",
    explanation: "Physical row offset tracking requires fewer CPU cycles.",
    hint: "ROWS uses simple row counting; RANGE performs value comparisons for peers.",
    level: "expert"
  },
  {
    question: "Can you use window frames with ranking functions like `ROW_NUMBER()`, `RANK()`, or `DENSE_RANK()`?",
    shortAnswer: "NO; ranking functions do NOT support explicit window frame clauses (`ROWS`/`RANGE`); attempting to add a frame throws Error 3580.",
    explanation: "Ranking functions operate strictly on partition order, not sliding frames.",
    hint: "No, ranking functions do not support window frame clauses.",
    level: "expert"
  },
  {
    question: "Can you use window frames with `FIRST_VALUE()` and `LAST_VALUE()`?",
    shortAnswer: "YES; boundary value functions evaluate within the window frame, which is why `LAST_VALUE()` requires frame expansion.",
    explanation: "Frame determines the boundary targets for FIRST_VALUE and LAST_VALUE.",
    hint: "Yes, boundary value functions operate directly on window frames.",
    level: "basic"
  },
  {
    question: "Can you use window frames with `LEAD()` and `LAG()`?",
    shortAnswer: "NO; `LEAD()` and `LAG()` take explicit offset parameters and do not accept window frame clauses.",
    explanation: "Offset functions are fixed-distance pointer shifts.",
    hint: "No, LAG and LEAD do not accept window frame clauses.",
    level: "basic"
  },
  {
    question: "How do you calculate a 30-day rolling sum of student fee collections?",
    shortAnswer: "`SUM(amount_paid_inr) OVER (ORDER BY payment_date RANGE BETWEEN INTERVAL 30 DAY PRECEDING AND CURRENT ROW)`.",
    explanation: "Time-based rolling accumulation.",
    hint: "RANGE BETWEEN INTERVAL 30 DAY PRECEDING AND CURRENT ROW",
    level: "moderate"
  },
  {
    question: "What happens if there are missing dates in a table when using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW` for weekly moving averages?",
    shortAnswer: "`ROWS` takes the previous 6 records regardless of date gaps (which could span months if records are sparse); use `RANGE` with `INTERVAL 6 DAY` to guarantee true calendar days.",
    explanation: "Calendar accuracy vs physical row count.",
    hint: "ROWS takes 6 records regardless of dates; RANGE with INTERVAL respects true calendar days.",
    level: "expert"
  },
  {
    question: "Can `RANGE` framing with date intervals be used when `ORDER BY` contains multiple columns?",
    shortAnswer: "NO; when using `RANGE` with numeric or temporal intervals (`INTERVAL N DAY`), the `ORDER BY` clause must contain EXACTLY ONE column.",
    explanation: "Intervals require a single unambiguous dimension.",
    hint: "No, date interval RANGE requires exactly one ORDER BY column.",
    level: "expert"
  },
  {
    question: "What is `GROUPS BETWEEN` in ANSI SQL and does MySQL 8.0 support it?",
    shortAnswer: "`GROUPS` operates on groups of tied rows (peer groups). MySQL 8.0 supports `ROWS` and `RANGE`, and introduced `GROUPS` support in modern 8.0.x builds.",
    explanation: "Peer-group based framing.",
    hint: "GROUPS operates on peer groups of tied rows.",
    level: "expert"
  },
  {
    question: "How do you compute the cumulative percentage of revenue achieved so far using window frames?",
    shortAnswer: "`ROUND((SUM(amount) OVER (ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) / SUM(amount) OVER ()) * 100.0, 2)`.",
    explanation: "Divides running sum by total global sum.",
    hint: "Running sum / global sum * 100.0",
    level: "moderate"
  },
  {
    question: "How do you calculate a 5-day centered moving average of temperature or student logins?",
    shortAnswer: "`AVG(metric) OVER (ORDER BY log_date ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)`.",
    explanation: "2 before + current + 2 after = 5 centered rows.",
    hint: "ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING",
    level: "basic"
  },
  {
    question: "What error occurs if you write `ROWS BETWEEN UNBOUNDED FOLLOWING AND CURRENT ROW`?",
    shortAnswer: "`Error 3587 (HY000): Window frame start cannot be UNBOUNDED FOLLOWING.`",
    explanation: "UNBOUNDED FOLLOWING can only be an ending frame boundary.",
    hint: "Error 3587: Frame start cannot be UNBOUNDED FOLLOWING.",
    level: "moderate"
  },
  {
    question: "Can a named window definition in the `WINDOW` clause include a frame specification?",
    shortAnswer: "YES; for example, `WINDOW w AS (PARTITION BY dept_id ORDER BY date ASC ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.",
    explanation: "Frame specifications can be fully encapsulated in named windows.",
    hint: "Yes, frame clauses can be declared inside named WINDOW definitions.",
    level: "basic"
  },
  {
    question: "Why should developers explicitly declare `ROWS` instead of relying on default `RANGE` for running totals?",
    shortAnswer: "To prevent unintentional peer lump-summing on duplicate timestamps and to gain CPU performance from integer row indexing.",
    explanation: "Best practice for deterministic running sums.",
    hint: "Ensures step-by-step row calculation on tied timestamps and faster CPU execution.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Window Frame Specification (`ROWS` vs `RANGE`)?",
    shortAnswer: "Use `ROWS` with physical offsets (`ROWS BETWEEN N PRECEDING AND CURRENT ROW`) for deterministic row-by-row moving totals and CPU efficiency, use `RANGE` with `INTERVAL N DAY` when true calendar time-series smoothing is required, and use `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` to expand frames for boundary functions.",
    explanation: "Authoritative architectural best practices for window frame specification.",
    hint: "ROWS for row-by-row counts + RANGE with INTERVAL for calendar days + UNBOUNDED FOLLOWING for boundary expansion.",
    level: "expert"
  }
];

export default questions;
