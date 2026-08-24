// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is a Tally Table (or Numbers Table) in legacy SQL databases?",
    shortAnswer: "A physical auxiliary database table pre-populated with sequential integers (e.g. 1 to 1,000,000) used to generate sequences before recursive CTEs were supported.",
    explanation: "Recursive CTEs completely eliminate the need for physical tally tables.",
    hint: "A permanent physical table storing numbers 1 to N.",
    level: "basic"
  },
  {
    question: "How do recursive CTEs solve the 'Missing Time-Series Gaps' problem in analytical reporting?",
    shortAnswer: "By generating a continuous sequence of all calendar dates and performing a `LEFT JOIN` against transaction tables, replacing missing days with 0 via `COALESCE()`.",
    explanation: "Prevents missing days from disappearing from charts and reports.",
    hint: "Generates complete date series and LEFT JOINs with COALESCE to fill missing days with 0.",
    level: "basic"
  },
  {
    question: "How do you generate a 30-day date series starting from '2026-09-01' using a recursive CTE?",
    shortAnswer: "`WITH RECURSIVE Dates AS (SELECT DATE('2026-09-01') AS dt UNION ALL SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM Dates WHERE dt < '2026-09-30') SELECT dt FROM Dates;`",
    explanation: "Uses date arithmetic in the recursive member.",
    hint: "Anchor: SELECT '2026-09-01'; Recursive: DATE_ADD(dt, INTERVAL 1 DAY) WHERE dt < '2026-09-30'.",
    level: "basic"
  },
  {
    question: "How do you generate hourly time buckets (e.g. 00:00 to 23:00) for a specific day?",
    shortAnswer: "`WITH RECURSIVE Hours AS (SELECT TIMESTAMP('2026-09-01 00:00:00') AS hr UNION ALL SELECT DATE_ADD(hr, INTERVAL 1 HOUR) FROM Hours WHERE hr < '2026-09-01 23:00:00') SELECT hr FROM Hours;`",
    explanation: "Increments timestamp by 1 HOUR on each iteration.",
    hint: "Anchor: 00:00:00; Recursive: DATE_ADD(hr, INTERVAL 1 HOUR) WHERE hr < 23:00:00.",
    level: "basic"
  },
  {
    question: "How does a recursive CTE perform String Tokenization (splitting CSV strings into rows)?",
    shortAnswer: "The Anchor extracts the first token using `SUBSTRING_INDEX(str, ',', 1)` and stores the remaining string; the Recursive Member repeatedly extracts subsequent tokens until the remaining string is empty.",
    explanation: "Deconstructs unnormalized delimited strings into clean 1NF rows.",
    hint: "Extracts first token and recursively processes remaining string until empty.",
    level: "expert"
  },
  {
    question: "Why is recursive string splitting useful when cleaning imported spreadsheets in 1NF normalization?",
    shortAnswer: "It allows multi-valued attributes stored in single spreadsheet cells (e.g. `'Cricket, Chess, Coding'`) to be normalized into individual atomic rows in pure SQL.",
    explanation: "Transforms non-atomic 1NF violations automatically.",
    hint: "Normalizes multi-valued cell values into atomic rows for 1NF compliance.",
    level: "expert"
  },
  {
    question: "How do you calculate a declining balance Loan Amortization Schedule using a recursive CTE?",
    shortAnswer: "Anchor seeds the initial principal balance; Recursive Member calculates monthly interest `(balance * rate/12)`, subtracts principal payment `(EMI - interest)`, and computes new ending balance month-by-month.",
    explanation: "Iterative financial engineering in pure SQL.",
    hint: "Calculates monthly interest, principal payment, and declining balance iteratively.",
    level: "expert"
  },
  {
    question: "How many iterations are required to generate daily calendar dates for a 5-year date range?",
    shortAnswer: "Approximately `1,826` iterations (365 days $\\times$ 5 + 1 leap day).",
    explanation: "Exceeds default `cte_max_recursion_depth` of 1000.",
    hint: "1,826 iterations (exceeds default limit of 1000).",
    level: "basic"
  },
  {
    question: "What must you do before running a recursive CTE that generates a 5-year date series?",
    shortAnswer: "Raise `cte_max_recursion_depth` above 1826 (e.g. `SET SESSION cte_max_recursion_depth = 5000;` or use an optimizer hint).",
    explanation: "Prevents Error 3636 abort.",
    hint: "Increase cte_max_recursion_depth to at least 5000.",
    level: "moderate"
  },
  {
    question: "How do student tuition records for Mamata, Susmita, Abhronila, and Debangshu illustrate date series generation?",
    shortAnswer: "By generating daily calendar dates across the academic term and performing a `LEFT JOIN` against student fee payments to calculate continuous cumulative revenue curves with zero gaps.",
    explanation: "Produces smooth financial time-series reporting.",
    hint: "Generates continuous calendar dates to produce daily revenue charts with zero gaps.",
    level: "basic"
  },
  {
    question: "How do you generate an arithmetic progression with a common difference of 5 (e.g. 5, 10, 15, 20...)?",
    shortAnswer: "`WITH RECURSIVE AP AS (SELECT 5 AS val UNION ALL SELECT val + 5 FROM AP WHERE val < 100) SELECT val FROM AP;`",
    explanation: "Increments value by 5 on each iteration.",
    hint: "Anchor: SELECT 5; Recursive: SELECT val + 5 WHERE val < 100.",
    level: "basic"
  },
  {
    question: "How do you generate the First Day of every month for the entire year 2026?",
    shortAnswer: "`WITH RECURSIVE Months AS (SELECT DATE('2026-01-01') AS mth UNION ALL SELECT DATE_ADD(mth, INTERVAL 1 MONTH) FROM Months WHERE mth < '2026-12-01') SELECT mth FROM Months;`",
    explanation: "Increments date by 1 MONTH on each iteration.",
    hint: "Anchor: '2026-01-01'; Recursive: DATE_ADD(mth, INTERVAL 1 MONTH) WHERE mth < '2026-12-01'.",
    level: "basic"
  },
  {
    question: "Can a recursive CTE generate random sample test data for performance benchmarking?",
    shortAnswer: "YES; for example, `WITH RECURSIVE DummyRows AS (SELECT 1 AS id, RAND() * 100 AS score UNION ALL SELECT id + 1, RAND() * 100 FROM DummyRows WHERE id < 1000) SELECT * FROM DummyRows;`",
    explanation: "Generates thousands of synthetic records on the fly.",
    hint: "Yes, combines sequence incrementing with RAND() to generate mock data.",
    level: "moderate"
  },
  {
    question: "What is the result of `DATE_ADD('2026-01-31', INTERVAL 1 MONTH)` in MySQL?",
    shortAnswer: "`2026-02-28` (MySQL automatically clamps to the last valid day of the target month).",
    explanation: "Standard month interval handling in MySQL.",
    hint: "Clamps to '2026-02-28' (last day of February).",
    level: "moderate"
  },
  {
    question: "How do you generate an Invoice Aging Schedule (30, 60, 90, 120+ days buckets) using a recursive CTE?",
    shortAnswer: "Generate aging tier boundaries (0, 30, 60, 90) and join against unpaid invoices using `DATEDIFF(CURRENT_DATE, invoice_date)` range conditions.",
    explanation: "Financial accounts receivable aging analysis.",
    hint: "Generates aging tier boundaries and joins against unpaid invoice age.",
    level: "expert"
  },
  {
    question: "What happens if you omit the `CAST()` on a date column in the Anchor Member when initializing with a string literal?",
    shortAnswer: "The column is typed as `VARCHAR(10)` rather than a native `DATE`, which can cause date functions (`DATE_ADD`) in the recursive member to fail or perform slow implicit conversions.",
    explanation: "Always use `CAST('2026-09-01' AS DATE)` in the Anchor Member.",
    hint: "Infers VARCHAR instead of DATE; use CAST to enforce native DATE type.",
    level: "moderate"
  },
  {
    question: "Can you generate a sequence in descending order (e.g. 10 down to 1)?",
    shortAnswer: "`WITH RECURSIVE Countdown AS (SELECT 10 AS n UNION ALL SELECT n - 1 FROM Countdown WHERE n > 1) SELECT n FROM Countdown;`",
    explanation: "Decrements state variable in the recursive member.",
    hint: "Anchor: SELECT 10; Recursive: SELECT n - 1 WHERE n > 1.",
    level: "basic"
  },
  {
    question: "How do you generate a multiplication table for the number 7 using a recursive CTE?",
    shortAnswer: "`WITH RECURSIVE Table7 AS (SELECT 1 AS multiplier, 7 AS result UNION ALL SELECT multiplier + 1, (multiplier + 1) * 7 FROM Table7 WHERE multiplier < 10) SELECT multiplier, result FROM Table7;`",
    explanation: "Multiplies on each iteration.",
    hint: "Anchor: 1, 7; Recursive: multiplier + 1, (multiplier + 1) * 7 WHERE multiplier < 10.",
    level: "basic"
  },
  {
    question: "What is the memory consumption of generating a 100,000-row integer sequence with a recursive CTE?",
    shortAnswer: "Very small (typically a few megabytes in RAM), because each integer row occupies only 4 bytes in the in-memory temporary accumulator table.",
    explanation: "Integer sequences are extremely lightweight.",
    hint: "A few megabytes in RAM; very lightweight.",
    level: "moderate"
  },
  {
    question: "How do you populate a permanent physical Calendar dimension table from a recursive CTE?",
    shortAnswer: "`INSERT INTO dim_calendar (calendar_date, year, month, day, day_name) WITH RECURSIVE Dates AS (...) SELECT dt, YEAR(dt), MONTH(dt), DAY(dt), DAYNAME(dt) FROM Dates;`",
    explanation: "Fast one-time ETL population of dimension tables.",
    hint: "INSERT INTO dim_calendar WITH RECURSIVE Dates AS (...) SELECT ...",
    level: "moderate"
  },
  {
    question: "Can a recursive CTE generate continuous 15-minute appointment time slots for hospital scheduling?",
    shortAnswer: "`WITH RECURSIVE Slots AS (SELECT TIMESTAMP('2026-09-01 08:00:00') AS slot_time UNION ALL SELECT DATE_ADD(slot_time, INTERVAL 15 MINUTE) FROM Slots WHERE slot_time < '2026-09-01 17:00:00') SELECT slot_time FROM Slots;`",
    explanation: "Interval arithmetic for healthcare schedule generation.",
    hint: "Increments timestamp by 15 MINUTE intervals.",
    level: "basic"
  },
  {
    question: "How do you find consecutive missing invoice sequence numbers using a recursive CTE?",
    shortAnswer: "Generate full expected integer sequence `MIN(invoice_num)` to `MAX(invoice_num)` and `LEFT JOIN` against `invoices` table `WHERE invoices.invoice_num IS NULL`.",
    explanation: "Forensic audit detection of skipped or deleted invoice numbers.",
    hint: "Generate full integer sequence and LEFT JOIN to find NULL invoice numbers.",
    level: "expert"
  },
  {
    question: "What is the performance advantage of generating date grids with recursive CTEs vs cross-joining large static tables?",
    shortAnswer: "Recursive CTEs generate exact bounding dates with zero I/O disk reads, whereas cross-joining large tables generates massive Cartesian products requiring memory filtering.",
    explanation: "Direct algorithmic sequence generation is faster than Cartesian filtering.",
    hint: "Zero disk reads and exact bounding without Cartesian table explosion.",
    level: "expert"
  },
  {
    question: "Can you generate prime numbers using a recursive CTE in MySQL?",
    shortAnswer: "YES; by generating an integer sequence in CTE 1 and filtering out numbers with factors in CTE 2.",
    explanation: "Mathematical sequence filtering in SQL.",
    hint: "Yes, generate integers and filter out composite numbers with subqueries.",
    level: "expert"
  },
  {
    question: "How do you generate business working days only (excluding Saturdays and Sundays) with a recursive CTE?",
    shortAnswer: "Generate full calendar series and filter in the main query: `WHERE DAYOFWEEK(cal_date) NOT IN (1, 7)` (1 = Sunday, 7 = Saturday).",
    explanation: "Filters weekend days from generated calendar.",
    hint: "Filter generated dates with WHERE DAYOFWEEK(cal_date) NOT IN (1, 7).",
    level: "basic"
  },
  {
    question: "What is the impact of using `UNION` instead of `UNION ALL` in a date range generator?",
    shortAnswer: "It slows down query execution by forcing MySQL to perform an unnecessary sort and duplicate check on every single generated date.",
    explanation: "Always use UNION ALL since generated dates are guaranteed unique.",
    hint: "Forces unnecessary per-iteration sorting and deduplication, slowing down the query.",
    level: "basic"
  },
  {
    question: "How do you tokenize multi-tag strings (e.g. `'#sql #react #database'`) into separate rows?",
    shortAnswer: "Using recursive string splitting with `LOCATE()` or `SUBSTRING_INDEX()` space delimiters.",
    explanation: "Tag extraction in social media and content databases.",
    hint: "Recursive string splitting on space delimiter using SUBSTRING_INDEX.",
    level: "moderate"
  },
  {
    question: "Can a recursive CTE generate binary numbers ($000, 001, 010...$)?",
    shortAnswer: "`WITH RECURSIVE BinNums AS (SELECT 0 AS n, BIN(0) AS bin_val UNION ALL SELECT n + 1, BIN(n + 1) FROM BinNums WHERE n < 7) SELECT bin_val FROM BinNums;`",
    explanation: "Binary string generation via `BIN()` function.",
    hint: "Uses BIN(n) function in the recursive member.",
    level: "basic"
  },
  {
    question: "What is the maximum date range that can be generated if `cte_max_recursion_depth = 1000`?",
    shortAnswer: "`1000 days` (approx. 2 years and 9 months).",
    explanation: "Each iteration produces 1 day.",
    hint: "1000 days (approx. 2.74 years).",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Generating Sequences and Dates with Recursive CTEs?",
    shortAnswer: "Use `WITH RECURSIVE` with `UNION ALL` to dynamically generate numbers, dates, and intervals, cast anchor columns explicitly, raise `cte_max_recursion_depth` for multi-year series, and `LEFT JOIN` against sparse datasets to eliminate reporting gaps.",
    explanation: "Authoritative architectural best practices for sequence generation in SQL.",
    hint: "UNION ALL + explicit CAST + raise recursion depth + LEFT JOIN to fill reporting gaps.",
    level: "expert"
  }
];

export default questions;
