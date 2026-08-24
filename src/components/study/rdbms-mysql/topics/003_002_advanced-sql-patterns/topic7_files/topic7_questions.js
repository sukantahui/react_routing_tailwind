// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the primary analytical purpose of calculating a Moving Average in SQL?",
    shortAnswer: "To smooth out high-frequency fluctuations, seasonal volatility, and random noise in time-series data to isolate underlying macro trends.",
    explanation: "Standard statistical time-series smoothing technique.",
    hint: "Smooths short-term fluctuations to reveal underlying trends.",
    level: "basic"
  },
  {
    question: "What is the syntax for a trailing 7-day moving average using physical rows in MySQL 8.0?",
    shortAnswer: "`AVG(revenue) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.",
    explanation: "Includes current row + 6 prior rows = 7 rows total.",
    hint: "ROWS BETWEEN 6 PRECEDING AND CURRENT ROW",
    level: "basic"
  },
  {
    question: "What is the difference between a Trailing Moving Average and a Centered Moving Average?",
    shortAnswer: "A Trailing Moving Average uses prior rows up to the current row (`ROWS BETWEEN N PRECEDING AND CURRENT ROW`), whereas a Centered Moving Average balances preceding and following rows symmetrically (`ROWS BETWEEN N PRECEDING AND N FOLLOWING`).",
    explanation: "Trailing for real-time tracking; Centered for retrospective smoothing.",
    hint: "Trailing looks backward; Centered looks equally backward and forward.",
    level: "basic"
  },
  {
    question: "How does MySQL calculate `AVG()` when the moving window reaches edge boundaries (e.g. Row 2 in a 7-day window)?",
    shortAnswer: "It calculates the average using whatever rows are available in the frame (e.g. at Row 2, it sums Rows 1 and 2 and divides by 2).",
    explanation: "Frames adapt gracefully without error at partition edges.",
    hint: "Calculates the average across available rows (divides by actual count).",
    level: "moderate"
  },
  {
    question: "How do you detect when a moving average has reached full window capacity (e.g. exactly 7 rows)?",
    shortAnswer: "Use `COUNT(*) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` and verify if count equals 7.",
    explanation: "Guarantees complete statistical sample sizes.",
    hint: "Check if COUNT(*) OVER window >= 7.",
    level: "moderate"
  },
  {
    question: "How do student exam scores for Mamata, Susmita, Abhronila, and Debangshu illustrate Moving Averages?",
    shortAnswer: "A 3-exam moving average smooths sudden single-quiz anomalies (e.g. a bad headache causing 65%), showing the true underlying academic performance trajectory.",
    explanation: "Demonstrates noise filtering in grade tracking.",
    hint: "Filters out isolated bad test scores to show overall student mastery.",
    level: "basic"
  },
  {
    question: "How do you calculate a rolling 30-day Standard Deviation (`STDDEV_SAMP`) to measure revenue volatility?",
    shortAnswer: "`STDDEV_SAMP(amount) OVER (ORDER BY payment_date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)`.",
    explanation: "Standard statistical dispersion measure over a sliding frame.",
    hint: "STDDEV_SAMP(amount) OVER (ORDER BY date ROWS BETWEEN 29 PRECEDING AND CURRENT ROW)",
    level: "expert"
  },
  {
    question: "How do you build statistical volatility bands (Bollinger-style Upper Band) in pure SQL?",
    shortAnswer: "`ROUND(AVG(amount) OVER w + (2 * STDDEV_SAMP(amount) OVER w), 2) AS upper_band WINDOW w AS (ORDER BY date ROWS 29 PRECEDING)`.",
    explanation: "Calculates Mean + 2 Sigma in one pass.",
    hint: "Mean + (2 * Standard Deviation) over a 30-row sliding window.",
    level: "expert"
  },
  {
    question: "Can `MIN()` and `MAX()` be used as rolling aggregations (e.g. 14-day rolling low and rolling high)?",
    shortAnswer: "YES; `MIN(price) OVER (ORDER BY date ROWS 13 PRECEDING)` tracks the lowest value in the last 14 days.",
    explanation: "Sliding minimum/maximum channels in financial analytics.",
    hint: "Yes, MIN() and MAX() support rolling frame clauses.",
    level: "basic"
  },
  {
    question: "How do you calculate rolling moving averages separately for each department?",
    shortAnswer: "Add `PARTITION BY dept_id` inside the `OVER()` clause.",
    explanation: "Isolates the sliding window calculations per department.",
    hint: "PARTITION BY dept_id ORDER BY exam_date ROWS ...",
    level: "basic"
  },
  {
    question: "What happens if a date has missing records when using `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`?",
    shortAnswer: "`ROWS` takes the previous 6 physical records regardless of calendar gaps; to enforce true 7 calendar days, use `RANGE BETWEEN INTERVAL 6 DAY PRECEDING`.",
    explanation: "Physical row count vs true calendar duration.",
    hint: "ROWS takes physical records; RANGE with INTERVAL enforces calendar days.",
    level: "expert"
  },
  {
    question: "Can multiple rolling functions (Rolling Avg, Rolling Min, Rolling Max, Rolling StdDev) share a single named `WINDOW`?",
    shortAnswer: "YES; defining `WINDOW w AS (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)` allows all rolling metrics to reuse specification `w`.",
    explanation: "Clean and reusable named window architecture.",
    hint: "Yes, declare a named window and reuse across all rolling functions.",
    level: "basic"
  },
  {
    question: "How do you smooth noisy student daily attendance percentages across a 5-day school week?",
    shortAnswer: "`ROUND(AVG(daily_attendance_pct) OVER (ORDER BY class_date ROWS BETWEEN 4 PRECEDING AND CURRENT ROW), 2)`.",
    explanation: "Weekly trailing smoothing window.",
    hint: "AVG(attendance) OVER (ORDER BY class_date ROWS BETWEEN 4 PRECEDING AND CURRENT ROW)",
    level: "basic"
  },
  {
    question: "What is an Exponential Moving Average (EMA) and can standard window functions calculate it directly?",
    shortAnswer: "EMA applies exponentially decreasing weights to older data; standard SQL window functions calculate Simple Moving Averages (SMA), whereas EMA requires recursive CTEs or user-defined functions.",
    explanation: "SMA is natively supported; EMA requires iterative CTE calculation.",
    hint: "Window functions calculate Simple Moving Averages; EMA requires recursive CTEs.",
    level: "expert"
  },
  {
    question: "How do you detect anomalous payment spikes exceeding 3 standard deviations from the 30-day moving average?",
    shortAnswer: "`WITH Stats AS (SELECT *, AVG(amount) OVER w AS m, STDDEV_SAMP(amount) OVER w AS s FROM payments WINDOW w AS (ORDER BY date ROWS 29 PRECEDING)) SELECT * FROM Stats WHERE amount > (m + 3 * s);`",
    explanation: "Statistical $3\\sigma$ anomaly detection pipeline.",
    hint: "Filter where amount > (moving_mean + 3 * moving_stddev).",
    level: "expert"
  },
  {
    question: "What is the output of `AVG(score) OVER (ORDER BY date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)` on the very first row?",
    shortAnswer: "The average of Row 1 and Row 2 (sum divided by 2), because no preceding row exists.",
    explanation: "Window automatically contracts to available edge rows.",
    hint: "Computes the average of Row 1 and Row 2.",
    level: "moderate"
  },
  {
    question: "What is the output of `AVG(score) OVER (ORDER BY date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING)` on the very last row?",
    shortAnswer: "The average of the penultimate row and the last row (sum divided by 2), because no following row exists.",
    explanation: "Window automatically contracts at the ending boundary.",
    hint: "Computes the average of the last two rows.",
    level: "moderate"
  },
  {
    question: "Why does `AVG(score)` ignore `NULL` values when calculating moving averages?",
    shortAnswer: "`AVG()` ignores `NULL`s in both the numerator sum and the denominator count (e.g. if values are `10, NULL, 20`, the average is $(10+20)/2 = 15$).",
    explanation: "Standard relational NULL aggregation arithmetic.",
    hint: "NULL values are excluded from both the sum and the divisor count.",
    level: "moderate"
  },
  {
    question: "How do you calculate a 3-month moving average of monthly fee collections?",
    shortAnswer: "`AVG(monthly_rev) OVER (ORDER BY month_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.",
    explanation: "Quarterly macro trend smoothing.",
    hint: "ROWS BETWEEN 2 PRECEDING AND CURRENT ROW on monthly aggregated data.",
    level: "basic"
  },
  {
    question: "What index optimizes moving average queries on `student_scores (student_id, exam_date, score)`?",
    shortAnswer: "A composite B-Tree index on `(student_id, exam_date, score)`.",
    explanation: "Provides covering index stream with zero filesort overhead.",
    hint: "Composite index on (student_id, exam_date, score).",
    level: "expert"
  },
  {
    question: "Can rolling aggregations be calculated on pre-aggregated data produced by `GROUP BY`?",
    shortAnswer: "YES; `AVG(SUM(amount)) OVER (ORDER BY date ROWS 6 PRECEDING)` computes a 7-day moving average of daily totals.",
    explanation: "Nested window aggregation over grouped streams.",
    hint: "Yes, AVG(SUM(amount)) calculates moving average of grouped totals.",
    level: "expert"
  },
  {
    question: "How do you calculate the percentage difference between the current day's revenue and the 7-day moving average?",
    shortAnswer: "`ROUND(((rev - AVG(rev) OVER w) / AVG(rev) OVER w) * 100.0, 2) WINDOW w AS (ORDER BY date ROWS 6 PRECEDING)`.",
    explanation: "Measures current deviation from recent trend line.",
    hint: "((current - moving_avg) / moving_avg) * 100.0",
    level: "moderate"
  },
  {
    question: "What happens if a moving window contains only 1 non-NULL value and `STDDEV_SAMP()` is evaluated?",
    shortAnswer: "`NULL` is returned, because sample standard deviation requires at least 2 distinct observations ($N \\ge 2$).",
    explanation: "Degrees of freedom rule ($N-1=0$ causes division by zero).",
    hint: "Returns NULL because sample standard deviation requires at least 2 rows.",
    level: "expert"
  },
  {
    question: "How do you calculate a 2-period moving range (Moving Difference)?",
    shortAnswer: "`ABS(val - LAG(val, 1) OVER (ORDER BY date))`.",
    explanation: "Statistical process control (SPC) moving range.",
    hint: "ABS(current - LAG(current)).",
    level: "moderate"
  },
  {
    question: "Can `VARIANCE()` / `VAR_SAMP()` be used as a rolling aggregation?",
    shortAnswer: "YES; `VAR_SAMP(metric) OVER (ORDER BY date ROWS 29 PRECEDING)` calculates rolling sample variance.",
    explanation: "Measures squared dispersion over a moving window.",
    hint: "Yes, VAR_SAMP() is a valid window aggregation function.",
    level: "moderate"
  },
  {
    question: "How do you smooth server CPU utilization spikes across 10-minute rolling windows?",
    shortAnswer: "`AVG(cpu_pct) OVER (ORDER BY log_time RANGE BETWEEN INTERVAL 10 MINUTE PRECEDING AND CURRENT ROW)`.",
    explanation: "Time-based infrastructure metrics smoothing.",
    hint: "RANGE BETWEEN INTERVAL 10 MINUTE PRECEDING AND CURRENT ROW",
    level: "moderate"
  },
  {
    question: "Why should developers avoid very large moving windows (e.g. `ROWS 10000 PRECEDING`) on high-traffic queries?",
    shortAnswer: "Because maintaining large sliding frame buffers increases CPU memory footprint during window evaluation.",
    explanation: "Frame sizing affects execution memory and CPU cache.",
    hint: "Large frames increase memory footprint and buffer tracking overhead.",
    level: "expert"
  },
  {
    question: "How do you calculate a 12-month trailing revenue sum (Trailing Twelve Months - TTM)?",
    shortAnswer: "`SUM(monthly_rev) OVER (ORDER BY month_date ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)`.",
    explanation: "Standard corporate finance TTM revenue metric.",
    hint: "SUM(monthly_rev) OVER (ORDER BY month_date ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)",
    level: "basic"
  },
  {
    question: "Can rolling aggregations be computed inside a database View?",
    shortAnswer: "YES; creating views containing moving averages provides clean API endpoints for analytics dashboards.",
    explanation: "Encapsulates moving average calculations in views.",
    hint: "Yes, Views can encapsulate moving average window functions.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Calculating Moving Averages and Rolling Aggregations?",
    shortAnswer: "Use trailing frames (`ROWS BETWEEN N PRECEDING AND CURRENT ROW`) for operational monitoring and real-time alerts, use centered frames (`ROWS BETWEEN N PRECEDING AND N FOLLOWING`) for retrospective historical smoothing, use `RANGE BETWEEN INTERVAL` when calendar continuity is mandatory, and combine Mean with Standard Deviation to construct statistical anomaly detection bands.",
    explanation: "Authoritative architectural best practices for moving averages and rolling analytics.",
    hint: "Trailing for real-time + Centered for history + RANGE with INTERVAL for calendar + Mean +/- 2 StdDev for anomaly bands.",
    level: "expert"
  }
];

export default questions;
