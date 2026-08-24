// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the primary SQL syntax blueprint for calculating a running total of payments over time?",
    shortAnswer: "`SUM(amount) OVER (ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.",
    explanation: "The standard ANSI SQL running total formula.",
    hint: "SUM(amount) OVER (ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
    level: "basic"
  },
  {
    question: "How do you make a running total reset at the beginning of each calendar year (Year-to-Date YTD)?",
    shortAnswer: "Add `PARTITION BY YEAR(payment_date)` inside the `OVER()` clause.",
    explanation: "Resets accumulator whenever the calendar year changes.",
    hint: "Add PARTITION BY YEAR(payment_date) to reset annually.",
    level: "basic"
  },
  {
    question: "How do you calculate each student's remaining fee balance after each installment payment?",
    shortAnswer: "`total_course_fee - SUM(amount_paid) OVER (PARTITION BY student_id ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.",
    explanation: "Real-time ledger balance calculation.",
    hint: "total_fee - SUM(amount_paid) OVER (PARTITION BY student_id ORDER BY date)",
    level: "basic"
  },
  {
    question: "Why should you specify `ROWS` instead of default `RANGE` when calculating financial running balances on tied dates?",
    shortAnswer: "To prevent multiple transactions on the same day from collapsing into an identical lump sum, ensuring exact line-by-line financial audit progression.",
    explanation: "Crucial for financial auditing and ledger accuracy.",
    hint: "ROWS guarantees line-by-line accumulation even on identical payment dates.",
    level: "expert"
  },
  {
    question: "How do student fee payments for Mamata, Susmita, Abhronila, and Debangshu illustrate Running Totals?",
    shortAnswer: "As Mamata pays ₹10,000 (Sem 1) and ₹15,000 (Sem 2), her running total accumulates to ₹25,000, leaving ₹0.00 outstanding against her ₹25,000 course fee.",
    explanation: "Demonstrates individual student ledger balance resolution.",
    hint: "Mamata pays ₹10k then ₹15k, accumulating to ₹25k total with ₹0 balance.",
    level: "basic"
  },
  {
    question: "How do you calculate the cumulative percentage contribution of courses to identify the Pareto Top 80% of revenue?",
    shortAnswer: "`ROUND((SUM(course_rev) OVER (ORDER BY course_rev DESC) / SUM(course_rev) OVER ()) * 100.0, 2)`.",
    explanation: "Divides running sum of revenue by grand total revenue.",
    hint: "(Running Sum / Grand Total Sum) * 100.0",
    level: "moderate"
  },
  {
    question: "Can a running total be calculated on grouped aggregate data (e.g. daily totals)?",
    shortAnswer: "YES; `SUM(SUM(amount)) OVER (ORDER BY payment_date)` sums the grouped daily amounts in a single query.",
    explanation: "Nested window aggregation over GROUP BY streams.",
    hint: "Yes, SUM(SUM(amount)) OVER (ORDER BY date) calculates running sum of daily totals.",
    level: "expert"
  },
  {
    question: "How do you calculate running stock inventory from received and dispatched transactions?",
    shortAnswer: "`opening_stock + SUM(qty_in - qty_out) OVER (PARTITION BY item_id ORDER BY tx_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.",
    explanation: "Real-time inventory level tracking.",
    hint: "initial_stock + SUM(qty_in - qty_out) OVER (PARTITION BY item_id ORDER BY date)",
    level: "moderate"
  },
  {
    question: "What is the result of `SUM(amount) OVER (PARTITION BY dept_id)` without an `ORDER BY` clause?",
    shortAnswer: "It computes the static grand total for the department on every row, NOT a running total.",
    explanation: "Without ORDER BY, the frame spans the whole partition.",
    hint: "Computes the static total for the whole department, not a running total.",
    level: "basic"
  },
  {
    question: "How do you calculate running totals separately for each branch city (Barrackpore, Ichapur, Kolkata)?",
    shortAnswer: "`SUM(amount) OVER (PARTITION BY branch_city ORDER BY payment_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.",
    explanation: "Resets the cumulative accumulation per branch city.",
    hint: "PARTITION BY branch_city ORDER BY payment_date",
    level: "basic"
  },
  {
    question: "What index optimizes running total calculations on `fee_payments (student_id, payment_date)`?",
    shortAnswer: "A composite B-Tree index on `(student_id, payment_date, amount_paid_inr)`.",
    explanation: "Provides covering index stream with zero filesort overhead.",
    hint: "Composite index on (student_id, payment_date, amount_paid_inr).",
    level: "expert"
  },
  {
    question: "How do you find the exact date when an academy reached ₹10,00,000 in total revenue?",
    shortAnswer: "`WITH RunningRev AS (SELECT payment_date, SUM(amount) OVER (ORDER BY payment_date) AS total_rev FROM payments) SELECT MIN(payment_date) FROM RunningRev WHERE total_rev >= 1000000;`",
    explanation: "Milestone date pinpointing using CTE.",
    hint: "Wrap running total in a CTE and find MIN(payment_date) where total_rev >= 1,000,000.",
    level: "moderate"
  },
  {
    question: "Can `COUNT(*)` be used as a running counter across ordered rows?",
    shortAnswer: "YES; `COUNT(*) OVER (ORDER BY registration_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` creates a running cumulative count of total admissions.",
    explanation: "Cumulative student enrollment counter.",
    hint: "Yes, COUNT(*) with running frame counts cumulative rows over time.",
    level: "basic"
  },
  {
    question: "Can `MAX()` be used as a running maximum (e.g. all-time high score so far)?",
    shortAnswer: "YES; `MAX(score) OVER (ORDER BY exam_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` tracks the all-time high score up to each date.",
    explanation: "All-time high peak tracking in pure SQL.",
    hint: "Yes, MAX(score) with running frame tracks the all-time high benchmark.",
    level: "moderate"
  },
  {
    question: "What happens if an `amount` column contains `NULL` values when computing running sums?",
    shortAnswer: "`SUM()` ignores `NULL` values, continuing the accumulation with the previous running total unchanged.",
    explanation: "Standard relational NULL aggregation behavior.",
    hint: "NULL values are ignored; the running sum remains unchanged.",
    level: "moderate"
  },
  {
    question: "How do you calculate Month-to-Date (MTD) running revenue collections?",
    shortAnswer: "`SUM(amount) OVER (PARTITION BY YEAR(date), MONTH(date) ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.",
    explanation: "Resets on the 1st of every month.",
    hint: "PARTITION BY YEAR(date), MONTH(date) resets the sum each month.",
    level: "basic"
  },
  {
    question: "How do you calculate Quarter-to-Date (QTD) running totals?",
    shortAnswer: "`SUM(amount) OVER (PARTITION BY YEAR(date), QUARTER(date) ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`.",
    explanation: "Resets at the start of each fiscal quarter.",
    hint: "PARTITION BY YEAR(date), QUARTER(date)",
    level: "basic"
  },
  {
    question: "What is the memory complexity of calculating running totals in MySQL 8.0?",
    shortAnswer: "$O(1)$ constant memory accumulator during partition scanning.",
    explanation: "Accumulates running scalar state on-the-fly without buffering all preceding rows.",
    hint: "O(1) constant memory scalar accumulation.",
    level: "expert"
  },
  {
    question: "Can a running total be filtered to return only rows where the balance exceeds ₹5,000?",
    shortAnswer: "YES; compute the running balance in a CTE and filter `WHERE running_balance > 5000` in the outer query.",
    explanation: "Standard CTE filtering pattern.",
    hint: "Wrap running total in CTE and filter WHERE running_balance > 5000.",
    level: "basic"
  },
  {
    question: "How do you calculate running student attendance percentage across a semester?",
    shortAnswer: "`ROUND((SUM(is_present) OVER (PARTITION BY student_id ORDER BY class_date) / COUNT(*) OVER (PARTITION BY student_id ORDER BY class_date)) * 100.0, 2)`.",
    explanation: "Real-time cumulative attendance tracking.",
    hint: "Running present days / running total days * 100.0",
    level: "moderate"
  },
  {
    question: "How do you calculate running profit margin percentage over time?",
    shortAnswer: "`ROUND((SUM(revenue - cost) OVER (ORDER BY date) / SUM(revenue) OVER (ORDER BY date)) * 100.0, 2)`.",
    explanation: "Cumulative profit divided by cumulative revenue.",
    hint: "Running Net Profit / Running Revenue * 100.0",
    level: "moderate"
  },
  {
    question: "What happens if you use `MIN()` with a running frame on a stock price table?",
    shortAnswer: "It tracks the all-time lowest price (52-week low) achieved up to that date.",
    explanation: "Historical low benchmark tracking.",
    hint: "Tracks the running minimum value reached so far.",
    level: "basic"
  },
  {
    question: "Can multiple running metrics (Running Sum, Running Avg, Running Max) share a single named window?",
    shortAnswer: "YES; `SELECT SUM(x) OVER w, AVG(x) OVER w, MAX(x) OVER w FROM t WINDOW w AS (ORDER BY d ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW);`",
    explanation: "Clean and reusable named window syntax.",
    hint: "Yes, define a single running WINDOW w and reuse across functions.",
    level: "basic"
  },
  {
    question: "How do you calculate the bank account overdraft threshold in real-time?",
    shortAnswer: "`WITH AccountLedger AS (SELECT *, SUM(deposit - withdrawal) OVER (PARTITION BY account_id ORDER BY tx_time ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS current_balance FROM transactions) SELECT * FROM AccountLedger WHERE current_balance < 0;`",
    explanation: "Overdraft threshold detection.",
    hint: "Filter where running balance is less than zero.",
    level: "expert"
  },
  {
    question: "Why does `SUM(col) OVER (ORDER BY col DESC)` produce a running total in reverse order?",
    shortAnswer: "Because `ORDER BY DESC` reverses the evaluation sequence, accumulating from highest to lowest value.",
    explanation: "Order sequence dictates accumulation direction.",
    hint: "Accumulates from highest value to lowest value.",
    level: "basic"
  },
  {
    question: "How do you calculate the 80/20 threshold cutoff line for Pareto analysis in SQL?",
    shortAnswer: "Filter where `cumulative_rev_pct <= 80.00` in the outer query of a CTE.",
    explanation: "Identifies the core 80% revenue drivers.",
    hint: "Filter WHERE cumulative_rev_pct <= 80.00 in outer query.",
    level: "basic"
  },
  {
    question: "What error occurs if you try to use `SUM()` with `ORDER BY` inside an `UPDATE` statement?",
    shortAnswer: "`Error 3593 (HY000): You cannot use the window function in this context.` (Must wrap in a CTE before updating).",
    explanation: "Wrap running sum in a CTE and join to update.",
    hint: "Error 3593: Cannot use window function in UPDATE directly.",
    level: "moderate"
  },
  {
    question: "Can `SUM()` with running frames handle negative numbers (e.g. refunds and debit adjustments)?",
    shortAnswer: "YES; negative values are algebraically subtracted from the running total accumulator automatically.",
    explanation: "Supports bidirectional financial ledger balance math.",
    hint: "Yes, negative numbers reduce the running accumulator automatically.",
    level: "basic"
  },
  {
    question: "How does `SUM(fee) OVER (PARTITION BY student_id ORDER BY date)` prevent ledger race conditions?",
    shortAnswer: "By evaluating the immutable transaction event log dynamically in read queries, eliminating the need to maintain error-prone mutable balance columns.",
    explanation: "Event-sourcing architecture in relational SQL.",
    hint: "Calculates balance on-the-fly from immutable transaction history.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Calculating Running Totals and Cumulative Sums?",
    shortAnswer: "Always write `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` explicitly to prevent tied-timestamp clumping, partition by entity (`PARTITION BY student_id`) or reset periods (YTD `PARTITION BY YEAR(date)`), index `(partition_col, order_col)` for linear streaming, and calculate ledger balances dynamically from immutable transaction logs.",
    explanation: "Authoritative architectural best practices for cumulative running sums.",
    hint: "Explicit ROWS framing + PARTITION BY entity/year + composite indexing + dynamic ledger calculation.",
    level: "expert"
  }
];

export default questions;
