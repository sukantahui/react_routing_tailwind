// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is an 'Island' in SQL time-series analytics?",
    shortAnswer: "A continuous, unbroken sequence of consecutive records or events (e.g. consecutive days of student attendance).",
    explanation: "Represents an uninterrupted active streak.",
    hint: "An uninterrupted streak of consecutive events.",
    level: "basic"
  },
  {
    question: "What is a 'Gap' in SQL time-series analytics?",
    shortAnswer: "A missing interval or discontinuity between consecutive records (e.g. absent days or inactive date gaps).",
    explanation: "Represents missing intervals between active streaks.",
    hint: "Missing intervals or absences between streaks.",
    level: "basic"
  },
  {
    question: "What is the mathematical principle behind the Date - RowNumber difference method for finding islands?",
    shortAnswer: "When dates and row numbers both increment by 1 on consecutive days, subtracting `ROW_NUMBER()` from the date produces a CONSTANT anchor date for all rows in the same unbroken streak.",
    explanation: "The classic mathematical foundation for solving islands.",
    hint: "Subtracting row number from consecutive dates yields a constant group key.",
    level: "expert"
  },
  {
    question: "How do you calculate the island grouping anchor date in MySQL 8.0?",
    shortAnswer: "`DATE_SUB(event_date, INTERVAL ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY event_date ASC) DAY)`.",
    explanation: "Generates the constant anchor date key.",
    hint: "DATE_SUB(date, INTERVAL ROW_NUMBER() OVER (...) DAY)",
    level: "expert"
  },
  {
    question: "How do student attendance records for Mamata, Susmita, Abhronila, and Debangshu illustrate Gaps and Islands?",
    shortAnswer: "Mamata attending June 01, 02, 03 forms an island of 3 consecutive days; an absence on June 04 creates a gap; her return on June 05, 06 forms a new 2-day island.",
    explanation: "Demonstrates streak formation, gap disruption, and new streak inception.",
    hint: "Consecutive attendance forms islands; absences create gaps.",
    level: "basic"
  },
  {
    question: "How do you find the longest attendance streak achieved by each student in the academy?",
    shortAnswer: "Group by student and island anchor date to compute `COUNT(*) AS streak_days`, then take `MAX(streak_days)` per student in an outer query.",
    explanation: "Finds max streak length per student.",
    hint: "GROUP BY student, island_anchor and find MAX(COUNT(*)).",
    level: "moderate"
  },
  {
    question: "What is the 'Running Flag Method' for solving Gaps and Islands?",
    shortAnswer: "Use `LAG()` to flag rows where the date difference exceeds 1 (`is_new_island = 1`), then compute a cumulative running sum of flags `SUM(is_new_island) OVER (...)` to assign unique Island IDs.",
    explanation: "Alternative design pattern using cumulative running sums.",
    hint: "Flag gaps with LAG, then create Island IDs with a cumulative running sum.",
    level: "expert"
  },
  {
    question: "How do you identify missing date intervals (Gaps) between consecutive student logins?",
    shortAnswer: "`SELECT student_id, LAG(login_date) OVER w AS gap_start, login_date AS gap_end, DATEDIFF(login_date, LAG(login_date) OVER w) AS gap_days FROM logins WINDOW w AS (PARTITION BY student_id ORDER BY login_date) WHERE DATEDIFF(...) > 1;`",
    explanation: "Isolates gap start, gap end, and gap duration in days.",
    hint: "Filter where DATEDIFF between current date and LAG(date) > 1.",
    level: "moderate"
  },
  {
    question: "Can the Difference Method work on consecutive integer IDs instead of dates?",
    shortAnswer: "YES; `id - ROW_NUMBER() OVER (ORDER BY id)` produces a constant integer grouping key for consecutive numeric sequences.",
    explanation: "Applies to any consecutive integer or sequence stream.",
    hint: "Yes, id - ROW_NUMBER() groups consecutive numbers into islands.",
    level: "basic"
  },
  {
    question: "How do you find missing invoice numbers in a sequential invoice sequence?",
    shortAnswer: "Use `LEAD(invoice_num)` or compare against a recursive CTE number series to identify missing gap numbers (`LEAD(invoice_num) - invoice_num > 1`).",
    explanation: "Invoice audit gap detection.",
    hint: "Filter where LEAD(invoice_num) - invoice_num > 1.",
    level: "moderate"
  },
  {
    question: "What is the time complexity of the Window Function Difference Method for Gaps and Islands?",
    shortAnswer: "$O(N \\log N)$ (or $O(N)$ with an index), evaluating in a single sorted pass.",
    explanation: "Sub-second execution even on millions of rows.",
    hint: "O(N log N) sorting or O(N) indexed single pass.",
    level: "expert"
  },
  {
    question: "What index optimizes Gaps and Islands queries on `student_daily_attendance`?",
    shortAnswer: "A composite B-Tree index on `(student_id, attendance_date, is_present)`.",
    explanation: "Provides covering index stream with zero filesort overhead.",
    hint: "Composite index on (student_id, attendance_date, is_present).",
    level: "expert"
  },
  {
    question: "How do you aggregate server uptime and downtime incident durations using Gaps & Islands?",
    shortAnswer: "Group consecutive 'UP' and 'DOWN' status logs into islands, then calculate `MIN(log_time)` (start), `MAX(log_time)` (end), and `TIMESTAMPDIFF(MINUTE, ...)` for each incident.",
    explanation: "DevOps uptime and outage incident clustering.",
    hint: "Group consecutive status rows into islands and compute duration.",
    level: "expert"
  },
  {
    question: "What happens if a student has duplicate attendance records on the same day in the raw data?",
    shortAnswer: "Duplicate dates break the consecutive 1-day step assumption; you must first deduplicate to 1 row per student per day using `DISTINCT` or `GROUP BY` before applying the difference method.",
    explanation: "Pre-cleaning step for Gaps and Islands.",
    hint: "Deduplicate to 1 record per day before calculating row numbers.",
    level: "expert"
  },
  {
    question: "How do you find all students currently on an active attendance streak of 5+ days?",
    shortAnswer: "Compute islands, filter for islands where `streak_end_date = CURRENT_DATE()` and `continuous_streak_days >= 5`.",
    explanation: "Real-time active streak leaderboard.",
    hint: "Filter where streak_end_date is today and streak length >= 5.",
    level: "moderate"
  },
  {
    question: "Why does `DATE_SUB(date, INTERVAL rn DAY)` produce the same date for consecutive rows?",
    shortAnswer: "Because both `date` and `rn` advance at the exact same rate (+1 day and +1 integer), their difference $(date + k) - (rn + k)$ cancels out the offset $k$, remaining constant.",
    explanation: "Mathematical proof of the difference method.",
    hint: "Both advance by 1 each step, so their mathematical difference is constant.",
    level: "expert"
  },
  {
    question: "Can Gaps and Islands be solved across multi-column statuses (e.g. employee job role transitions)?",
    shortAnswer: "YES; by detecting when job title changes using `LAG(job_title)` and accumulating group IDs with running sums.",
    explanation: "Career history role timeline aggregation.",
    hint: "Yes, use LAG() on job_title with running sum flag accumulation.",
    level: "moderate"
  },
  {
    question: "How do you calculate the total number of distinct attendance streak episodes a student had during a semester?",
    shortAnswer: "Count the number of distinct `island_anchor_date` groups for that student.",
    explanation: "Measures habit consistency and frequency of disruptions.",
    hint: "COUNT(DISTINCT island_anchor_date)",
    level: "basic"
  },
  {
    question: "How do you find the average streak length per student?",
    shortAnswer: "Calculate streak lengths in a CTE, then take `ROUND(AVG(continuous_streak_days), 1)` per student.",
    explanation: "Mean habit duration analytics.",
    hint: "AVG(continuous_streak_days) grouped by student_id.",
    level: "basic"
  },
  {
    question: "Can Gaps & Islands queries be encapsulated inside a MySQL View?",
    shortAnswer: "YES; creating `v_student_attendance_streaks` provides instant streak analytics for front-end dashboards.",
    explanation: "Encapsulates complex window logic in views.",
    hint: "Yes, Views can encapsulate Gaps and Islands CTEs.",
    level: "basic"
  },
  {
    question: "What is the difference between finding Gaps vs finding Islands?",
    shortAnswer: "Finding Islands groups consecutive active records to measure streak duration; finding Gaps identifies missing date intervals between consecutive events to detect inactivity.",
    explanation: "Two complementary sides of the same relational time-series coin.",
    hint: "Islands measure active streaks; Gaps measure inactive absences.",
    level: "basic"
  },
  {
    question: "How do you solve Gaps & Islands on timestamped data with 1-hour session inactivity timeouts?",
    shortAnswer: "Use `TIMESTAMPDIFF(MINUTE, LAG(log_time), log_time) > 60` to flag new sessions, then accumulate session IDs with `SUM() OVER ()`.",
    explanation: "Web user sessionization in clickstream databases.",
    hint: "Flag gaps where timestamp difference > 60 minutes.",
    level: "expert"
  },
  {
    question: "What error occurs if you forget `PARTITION BY student_id` in the `ROW_NUMBER()` calculation?",
    shortAnswer: "Row numbers increment globally across all students, causing attendance records from different students to merge into corrupt, meaningless islands.",
    explanation: "Partition isolation requirement.",
    hint: "Records from different students bleed together into corrupt islands.",
    level: "expert"
  },
  {
    question: "How do you find the date range of the longest gap (absence) for each student?",
    shortAnswer: "Calculate gap lengths with `DATEDIFF(date, LAG(date)) - 1`, order descending, and pick `ROW_NUMBER() = 1`.",
    explanation: "Isolates the single longest absence period per student.",
    hint: "Filter for max gap length per student.",
    level: "moderate"
  },
  {
    question: "Can the Difference Method handle weekly streaks (e.g. consecutive weekly submissions)?",
    shortAnswer: "YES; subtract `INTERVAL ROW_NUMBER() * 7 DAY` or compute row numbers over consecutive `YEARWEEK(date)` values.",
    explanation: "Extends to weekly and monthly temporal intervals.",
    hint: "Yes, scale interval to 7 days for weekly streaks.",
    level: "moderate"
  },
  {
    question: "How do you award a '30-Day Consistency Badge' automatically using Gaps and Islands?",
    shortAnswer: "Query islands where `continuous_streak_days >= 30` and insert badge achievements into the `student_badges` table.",
    explanation: "Gamification and loyalty reward automation.",
    hint: "Filter for islands where continuous_streak_days >= 30.",
    level: "basic"
  },
  {
    question: "Why is the Difference Method generally preferred over the Running Flag Method in MySQL 8.0?",
    shortAnswer: "Because the Difference Method requires only a single `ROW_NUMBER()` pass and a simple `GROUP BY`, whereas the Running Flag Method requires both `LAG()` and a secondary cumulative `SUM()` pass.",
    explanation: "Difference method requires fewer window evaluation passes.",
    hint: "Difference method requires 1 window pass; Running flag requires 2 passes.",
    level: "expert"
  },
  {
    question: "How do you calculate streak progress when weekends (Saturday/Sunday) are excluded from the academic calendar?",
    shortAnswer: "Number only active school days with a physical tally table or academic calendar CTE, and group by `academic_day_num - ROW_NUMBER()`.",
    explanation: "Non-contiguous working day calendar normalization.",
    hint: "Use academic school day sequential numbers instead of raw calendar dates.",
    level: "expert"
  },
  {
    question: "What is the memory footprint of evaluating Gaps & Islands on 100,000 attendance records?",
    shortAnswer: "Under 10 megabytes of RAM; executes in under 50 milliseconds when indexed by `(student_id, attendance_date)`.",
    explanation: "Highly optimized in MySQL 8.0.",
    hint: "Very lightweight; runs in under 50 milliseconds with composite index.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Solving Gaps and Islands Problems?",
    shortAnswer: "Pre-deduplicate raw event logs to 1 row per period, use the Mathematical Difference Method (`date - INTERVAL ROW_NUMBER() DAY`) for 1-pass island grouping, use `LAG()` with `DATEDIFF > 1` for gap interval isolation, and support the query with a composite index on `(entity_id, date, status)`.",
    explanation: "Authoritative architectural best practices for Gaps and Islands problem resolution.",
    hint: "Deduplicate first + Date-RowNumber difference method for islands + LAG for gaps + composite indexing.",
    level: "expert"
  }
];

export default questions;
