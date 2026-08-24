// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is the standard mathematical formula for Month-over-Month (MoM) revenue growth percentage?",
    shortAnswer: "$\\frac{\\text{Current Month Revenue} - \\text{Prior Month Revenue}}{\\text{Prior Month Revenue}} \\times 100.0\\%$.",
    explanation: "Standard period-over-period financial formula.",
    hint: "((Current - Previous) / Previous) * 100.0",
    level: "basic"
  },
  {
    question: "Which window function is used to pull the prior month's revenue for MoM calculations?",
    shortAnswer: "`LAG(monthly_rev, 1) OVER (ORDER BY period_month ASC)`.",
    explanation: "Offset 1 looks back exactly 1 row in chronological order.",
    hint: "LAG(monthly_rev, 1) OVER (ORDER BY period_month)",
    level: "basic"
  },
  {
    question: "How do you calculate Year-over-Year (YoY) growth on quarterly financial records?",
    shortAnswer: "`LAG(quarterly_rev, 4) OVER (ORDER BY year_num, quarter_num)` (looking back 4 quarters = 1 full year).",
    explanation: "Offset of 4 quarters looks back exactly one year.",
    hint: "LAG(quarterly_rev, 4) compares against the same quarter last year.",
    level: "basic"
  },
  {
    question: "How do you calculate Year-over-Year (YoY) growth on monthly financial records?",
    shortAnswer: "`LAG(monthly_rev, 12) OVER (ORDER BY period_month ASC)` (looking back 12 months = 1 full year).",
    explanation: "Offset of 12 months compares against the same month last year.",
    hint: "LAG(monthly_rev, 12) compares against the same month 1 year ago.",
    level: "basic"
  },
  {
    question: "Why should developers use `NULLIF(prior_rev, 0)` in period-over-period growth formulas?",
    shortAnswer: "To prevent fatal Division by Zero errors (`Error 1365`) or `NULL` crashes when the previous period had zero revenue.",
    explanation: "Defensive calculation practice in enterprise SQL.",
    hint: "Prevents division by zero crashes when prior revenue is 0.",
    level: "expert"
  },
  {
    question: "How do student fee revenues for Mamata, Susmita, Abhronila, and Debangshu illustrate MoM growth?",
    shortAnswer: "If June collections are ₹45,000 and July collections are ₹65,000, `LAG()` pulls ₹45k into July's row, yielding `+44.44%` MoM expansion.",
    explanation: "Demonstrates positive growth acceleration.",
    hint: "((65k - 45k) / 45k) * 100 = +44.44% growth.",
    level: "basic"
  },
  {
    question: "Why is a 3-stage CTE pipeline recommended for Period-over-Period analytics?",
    shortAnswer: "Stage 1 groups raw transactions into monthly totals, Stage 2 projects window offsets (`LAG`), and Stage 3 calculates clean percentage deltas with zero code duplication.",
    explanation: "Clean modular ETL pipeline pattern in relational SQL.",
    hint: "Stage 1 groups data + Stage 2 projects offsets + Stage 3 calculates percentages.",
    level: "expert"
  },
  {
    question: "How do you calculate MoM growth separately for each branch city (Barrackpore, Ichapur, Kolkata)?",
    shortAnswer: "Add `PARTITION BY branch_city` inside `LAG()`: `LAG(monthly_rev, 1) OVER (PARTITION BY branch_city ORDER BY period_month)`.",
    explanation: "Resets the monthly offset calculation per branch.",
    hint: "PARTITION BY branch_city inside the LAG() OVER clause.",
    level: "basic"
  },
  {
    question: "What value does `LAG(monthly_rev, 1)` return for the very first month in the dataset?",
    shortAnswer: "`NULL` (because no preceding historical data exists prior to Month 1).",
    explanation: "Boundary out-of-bounds default.",
    hint: "Returns NULL for the first month.",
    level: "basic"
  },
  {
    question: "How do you display a friendly string like `'Baseline Month'` instead of `NULL` on Month 1?",
    shortAnswer: "Use `COALESCE(CONCAT(growth_pct, '%'), 'Baseline Month')` in the final SELECT projection.",
    explanation: "Formats boundary NULLs for presentation.",
    hint: "Use COALESCE(growth_pct, 'Baseline Month').",
    level: "basic"
  },
  {
    question: "How do you calculate absolute revenue change in rupees alongside percentage growth?",
    shortAnswer: "`monthly_rev - LAG(monthly_rev, 1) OVER (ORDER BY period_month)`.",
    explanation: "Calculates raw currency monetary delta.",
    hint: "Current revenue minus LAG(revenue).",
    level: "basic"
  },
  {
    question: "What happens if a calendar month has zero transactions and is missing from the `fee_payments` table?",
    shortAnswer: "`LAG(monthly_rev, 1)` will accidentally pull from 2 months prior; to fix this, perform a `LEFT JOIN` against a continuous calendar date grid (via recursive CTE) to zero-fill missing months before calculating `LAG()`.",
    explanation: "Critical time-series gap resolution pattern.",
    hint: "Use a recursive CTE calendar grid with LEFT JOIN to fill missing months with 0.",
    level: "expert"
  },
  {
    question: "Can `LEAD()` be used to calculate Period-over-Period growth in reverse?",
    shortAnswer: "Technically yes, but using `LAG()` is the universal standard for historical growth because business trajectory is evaluated looking backward at past baselines.",
    explanation: "LAG adheres to standard retrospective accounting conventions.",
    hint: "LAG is standard because growth is evaluated against past baselines.",
    level: "moderate"
  },
  {
    question: "How do you calculate Quarter-over-Quarter (QoQ) student enrollment growth?",
    shortAnswer: "`ROUND(((current_enrollments - LAG(current_enrollments, 1) OVER w) / LAG(current_enrollments, 1) OVER w) * 100.0, 2)` where `w` is ordered by fiscal quarter.",
    explanation: "Enrollment velocity tracking across academic terms.",
    hint: "((curr_enrollment - LAG(curr_enrollment)) / LAG(curr_enrollment)) * 100.",
    level: "basic"
  },
  {
    question: "How do you identify months where revenue dropped by more than 20% compared to the prior month?",
    shortAnswer: "Filter `WHERE mom_growth_pct < -20.00` in the outer query of the CTE pipeline.",
    explanation: "Isolates severe financial contraction periods.",
    hint: "Filter WHERE mom_growth_pct < -20.00 in outer query.",
    level: "basic"
  },
  {
    question: "What index optimizes the initial grouping step for monthly revenue queries on `fee_payments`?",
    shortAnswer: "A composite B-Tree index on `(payment_date, amount_paid_inr)`.",
    explanation: "Enables index-only sequential scanning for monthly aggregations.",
    hint: "Composite index on (payment_date, amount_paid_inr).",
    level: "expert"
  },
  {
    question: "Can both MoM and YoY growth rates be projected on the exact same row?",
    shortAnswer: "YES; project `LAG(rev, 1)` for MoM and `LAG(rev, 12)` for YoY simultaneously in the second CTE stage.",
    explanation: "Provides dual short-term and seasonal long-term context.",
    hint: "Yes, project LAG(rev, 1) and LAG(rev, 12) in the same query.",
    level: "basic"
  },
  {
    question: "How do you calculate the 3-month rolling average of Month-over-Month growth rates?",
    shortAnswer: "Calculate MoM growth in a CTE, then apply `AVG(mom_growth_pct) OVER (ORDER BY period_month ROWS 2 PRECEDING)` in the outer query.",
    explanation: "Layered analytical window functions over CTEs.",
    hint: "AVG(mom_growth_pct) OVER (ORDER BY period_month ROWS 2 PRECEDING).",
    level: "expert"
  },
  {
    question: "What is Compound Monthly Growth Rate (CMGR) and how does it relate to MoM?",
    shortAnswer: "MoM measures individual month-to-month variance, whereas CMGR measures the annualized geometric mean growth rate over $N$ months ($(\\text{End}/\\text{Start})^{1/N} - 1$).",
    explanation: "Geometric vs arithmetic growth metrics.",
    hint: "MoM is single-month growth; CMGR is the multi-month geometric compound rate.",
    level: "expert"
  },
  {
    question: "How do you format positive growth rates with a leading '+' sign in SQL?",
    shortAnswer: "`CASE WHEN growth_pct > 0 THEN CONCAT('+', growth_pct, '%') ELSE CONCAT(growth_pct, '%') END`.",
    explanation: "Visual formatting for executive dashboards.",
    hint: "Use CASE to prepend '+' on positive percentages.",
    level: "basic"
  },
  {
    question: "What happens if both current month and prior month revenue are 0?",
    shortAnswer: "With `NULLIF(prior_rev, 0)`, the result is `NULL` (or 0.00% with `COALESCE`), avoiding crash errors.",
    explanation: "Safe zero-handling arithmetic.",
    hint: "Returns NULL or 0.00% without crashing.",
    level: "moderate"
  },
  {
    question: "Can Period-over-Period growth be calculated on daily transaction counts (Day-over-Day DoD)?",
    shortAnswer: "YES; use `LAG(daily_count, 1) OVER (ORDER BY log_date)` for Day-over-Day traffic/admission volume.",
    explanation: "Daily frequency PoP tracking.",
    hint: "Yes, LAG(daily_count, 1) calculates Day-over-Day growth.",
    level: "basic"
  },
  {
    question: "How do you calculate Year-over-Year growth for a specific holiday week (Week-over-Week YoY)?",
    shortAnswer: "`LAG(weekly_rev, 52) OVER (ORDER BY year_num, week_num)` (looking back 52 weeks = 1 full year).",
    explanation: "52-week annual seasonality matching.",
    hint: "LAG(weekly_rev, 52) compares against the same week last year.",
    level: "moderate"
  },
  {
    question: "How do you calculate individual student course payment acceleration?",
    shortAnswer: "`SELECT student_id, payment_date, amount, ROUND(((amount - LAG(amount) OVER w) / LAG(amount) OVER w) * 100, 2) FROM payments WINDOW w AS (PARTITION BY student_id ORDER BY payment_date);`",
    explanation: "Individual customer installment velocity.",
    hint: "Partition by student_id and order by payment_date.",
    level: "moderate"
  },
  {
    question: "Can PoP growth queries be encapsulated in a materialized view or standard View?",
    shortAnswer: "YES; standard Views in MySQL 8.0 can encapsulate the full 3-stage CTE pipeline for downstream BI consumption.",
    explanation: "Clean abstraction layer for business reporting.",
    hint: "Yes, Views can encapsulate multi-stage CTE growth queries.",
    level: "basic"
  },
  {
    question: "How do you filter for consecutive months of negative revenue growth (Recession detection)?",
    shortAnswer: "`WITH Growth AS (...) SELECT * FROM Growth WHERE mom_growth_pct < 0 AND LAG(mom_growth_pct, 1) OVER (ORDER BY period_month) < 0;`",
    explanation: "Detects 2 consecutive quarters/months of contraction.",
    hint: "Check where current growth < 0 and LAG(growth) < 0.",
    level: "expert"
  },
  {
    question: "Why should developers use `DATE_FORMAT(date, '%Y-%m-01')` instead of `MONTH(date)` for grouping?",
    shortAnswer: "Because `DATE_FORMAT('%Y-%m-01')` retains the distinct year and month as a valid chronological date, preventing January 2025 and January 2026 from collapsing together.",
    explanation: "Preserves multi-year chronological uniqueness.",
    hint: "Prevents same months from different years from colliding together.",
    level: "expert"
  },
  {
    question: "How do you calculate MoM market share growth for different courses?",
    shortAnswer: "Compute each course's monthly share percentage `(course_rev / SUM(course_rev) OVER (PARTITION BY month)) * 100`, then apply `LAG()` to track share changes.",
    explanation: "Market share trajectory tracking.",
    hint: "Compute monthly share percentage first, then calculate LAG delta.",
    level: "expert"
  },
  {
    question: "What is the memory impact of executing a 10-year MoM growth query?",
    shortAnswer: "120 monthly rows require less than 50 kilobytes of RAM and evaluate in sub-millisecond time.",
    explanation: "Pre-aggregated monthly sets are lightweight.",
    hint: "Negligible memory footprint; runs in under 1 millisecond.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Calculating Period-over-Period Growth?",
    shortAnswer: "Use a modular 3-stage CTE pipeline (Group $\\to$ Project Offsets $\\to$ Calculate Deltas), defend against division by zero using `NULLIF(prior_rev, 0)`, zero-fill calendar gaps with a recursive date grid, and project both short-term (MoM offset 1) and seasonal (YoY offset 12) growth on the same row.",
    explanation: "Authoritative architectural best practices for Period-over-Period financial analytics.",
    hint: "3-stage CTE + NULLIF zero defense + calendar grid gap filling + dual MoM/YoY projections.",
    level: "expert"
  }
];

export default questions;
