// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the return type of `DATEDIFF('2026-08-30', '2026-08-20')`?",
    shortAnswer: "An integer representing the number of DAYS (returns `10`).",
    explanation: "DATEDIFF returns integer days.",
    hint: "10 (integer days).",
    level: "basic"
  },
  {
    question: "What is the operand order difference between `DATEDIFF(d1, d2)` and `TIMESTAMPDIFF(unit, d1, d2)`?",
    shortAnswer: "`DATEDIFF(d1, d2)` calculates `d1 - d2` (first minus second), whereas `TIMESTAMPDIFF(unit, d1, d2)` calculates `d2 - d1` (second minus first).",
    explanation: "Crucial operand order difference.",
    hint: "DATEDIFF is d1 - d2; TIMESTAMPDIFF is d2 - d1.",
    level: "basic"
  },
  {
    question: "How do you calculate a student's exact completed age in years in MySQL?",
    shortAnswer: "`TIMESTAMPDIFF(YEAR, dob, CURDATE())`.",
    explanation: "Age calculation using TIMESTAMPDIFF.",
    hint: "TIMESTAMPDIFF(YEAR, dob, CURDATE()).",
    level: "basic"
  },
  {
    question: "Why should `YEAR(CURDATE()) - YEAR(dob)` NOT be used for exact age calculation?",
    shortAnswer: "Because it only subtracts the year integers without checking if the student's birthday has actually occurred yet this year (can be off by 1 year).",
    explanation: "Flawed age calculation pitfall.",
    hint: "Fails to check if the birthday has passed in the current year.",
    level: "moderate"
  },
  {
    question: "What does `DATE_ADD('2026-01-31', INTERVAL 1 MONTH)` return in MySQL?",
    shortAnswer: "`'2026-02-28'` (automatically adjusts for February's end of month).",
    explanation: "Month addition end-of-month handling.",
    hint: "'2026-02-28' (auto-adjusted for Feb).",
    level: "moderate"
  },
  {
    question: "What is the native SQL shorthand syntax for `DATE_ADD(CURDATE(), INTERVAL 7 DAY)`?",
    shortAnswer: "`CURDATE() + INTERVAL 7 DAY`.",
    explanation: "Native interval addition shorthand.",
    hint: "CURDATE() + INTERVAL 7 DAY.",
    level: "basic"
  },
  {
    question: "What does `DATEDIFF('2026-08-20', '2026-08-30')` return?",
    shortAnswer: "`-10` (since the first date is earlier than the second date).",
    explanation: "Negative DATEDIFF result.",
    hint: "-10.",
    level: "basic"
  },
  {
    question: "What is the maximum duration supported by `TIMEDIFF()` in MySQL?",
    shortAnswer: "`838:59:59` (~34.9 days) due to the range limit of the `TIME` data type.",
    explanation: "TIMEDIFF range limit.",
    hint: "838 hours (~34.9 days).",
    level: "moderate"
  },
  {
    question: "How do you calculate the difference between two timestamps in hours when the gap exceeds 35 days?",
    shortAnswer: "`TIMESTAMPDIFF(HOUR, start_time, end_time)`.",
    explanation: "Hour difference using TIMESTAMPDIFF.",
    hint: "TIMESTAMPDIFF(HOUR, start, end).",
    level: "basic"
  },
  {
    question: "In academy fee management, how do you find students whose payment is overdue by more than 15 days?",
    shortAnswer: "`WHERE DATEDIFF(CURDATE(), due_date) > 15` (or `WHERE due_date < CURDATE() - INTERVAL 15 DAY`).",
    explanation: "Overdue fee filter.",
    hint: "DATEDIFF(CURDATE(), due_date) > 15.",
    level: "basic"
  },
  {
    question: "What does `DATE_SUB(NOW(), INTERVAL 3 HOUR)` do?",
    shortAnswer: "Subtracts 3 hours from the current timestamp.",
    explanation: "DATE_SUB interval subtraction.",
    hint: "Subtracts 3 hours from NOW().",
    level: "basic"
  },
  {
    question: "What are the synonyms for `DATE_ADD()` and `DATE_SUB()` in MySQL?",
    shortAnswer: "`ADDDATE()` and `SUBDATE()`.",
    explanation: "Synonyms for date addition functions.",
    hint: "ADDDATE() and SUBDATE().",
    level: "basic"
  },
  {
    question: "What does `ADDTIME('14:30:00', '01:15:00')` return?",
    shortAnswer: "`'15:45:00'` (adds time expressions).",
    explanation: "ADDTIME function evaluation.",
    hint: "'15:45:00'",
    level: "basic"
  },
  {
    question: "What does `SUBTIME('14:30:00', '00:45:00')` return?",
    shortAnswer: "`'13:45:00'` (subtracts time expressions).",
    explanation: "SUBTIME function evaluation.",
    hint: "'13:45:00'",
    level: "basic"
  },
  {
    question: "In e-commerce, how do you calculate the delivery time in minutes between `dispatch_time` and `delivered_time`?",
    shortAnswer: "`TIMESTAMPDIFF(MINUTE, dispatch_time, delivered_time)`.",
    explanation: "Minute difference calculation.",
    hint: "TIMESTAMPDIFF(MINUTE, dispatch_time, delivered_time).",
    level: "basic"
  },
  {
    question: "What is `LAST_DAY('2026-02-10')` in MySQL?",
    shortAnswer: "`'2026-02-28'` (returns the last date of the given month).",
    explanation: "LAST_DAY function.",
    hint: "'2026-02-28' (last day of February).",
    level: "basic"
  },
  {
    question: "How do you find the first day of the current month in SQL?",
    shortAnswer: "`DATE_SUB(CURDATE(), INTERVAL DAY(CURDATE()) - 1 DAY)` or `DATE_FORMAT(CURDATE(), '%Y-%m-01')`.",
    explanation: "First day of month formula.",
    hint: "DATE_FORMAT(CURDATE(), '%Y-%m-01').",
    level: "moderate"
  },
  {
    question: "How do you calculate course expiration date exactly 6 months after enrollment date?",
    shortAnswer: "`DATE_ADD(enrollment_date, INTERVAL 6 MONTH)`.",
    explanation: "6-month expiration date calculation.",
    hint: "DATE_ADD(enrollment_date, INTERVAL 6 MONTH).",
    level: "basic"
  },
  {
    question: "What does `PERIOD_DIFF(202608, 202602)` return?",
    shortAnswer: "`6` (calculates the difference in months between two `YYYYMM` periods).",
    explanation: "PERIOD_DIFF function in MySQL.",
    hint: "6 (months difference).",
    level: "expert"
  },
  {
    question: "What does `PERIOD_ADD(202601, 5)` return?",
    shortAnswer: "`202606` (adds 5 months to period `202601`).",
    explanation: "PERIOD_ADD function.",
    hint: "202606.",
    level: "expert"
  },
  {
    question: "In library management, how do you calculate overdue book fines at ₹2 per day late?",
    shortAnswer: "`SELECT student_id, GREATEST(0, DATEDIFF(CURDATE(), return_due_date)) * 2 AS fine_inr FROM book_loans;`",
    explanation: "Fine calculation with DATEDIFF and GREATEST.",
    hint: "GREATEST(0, DATEDIFF(CURDATE(), return_due_date)) * 2.",
    level: "moderate"
  },
  {
    question: "What does `TIMESTAMPDIFF(DAY, '2026-08-20', '2026-08-30')` return?",
    shortAnswer: "`10`.",
    explanation: "Positive TIMESTAMPDIFF calculation.",
    hint: "10.",
    level: "basic"
  },
  {
    question: "What does `TIMESTAMPDIFF(DAY, '2026-08-30', '2026-08-20')` return?",
    shortAnswer: "`-10`.",
    explanation: "Negative TIMESTAMPDIFF calculation.",
    hint: "-10.",
    level: "basic"
  },
  {
    question: "Can `DATE_ADD()` accept negative interval numbers (e.g. `DATE_ADD(CURDATE(), INTERVAL -5 DAY)`)?",
    shortAnswer: "YES. It acts identically to `DATE_SUB()`.",
    explanation: "Negative intervals in DATE_ADD.",
    hint: "Yes, negative intervals subtract time.",
    level: "basic"
  },
  {
    question: "What does `TIMESTAMPDIFF(QUARTER, '2026-01-01', '2026-07-01')` return?",
    shortAnswer: "`2` (2 calendar quarters elapsed).",
    explanation: "Quarter difference calculation.",
    hint: "2.",
    level: "moderate"
  },
  {
    question: "In student attendance, how do you find records logged in the LAST 7 DAYS?",
    shortAnswer: "`WHERE log_date >= CURDATE() - INTERVAL 7 DAY`.",
    explanation: "SARGable last 7 days filter.",
    hint: "log_date >= CURDATE() - INTERVAL 7 DAY.",
    level: "basic"
  },
  {
    question: "What happens if an invalid date like `'2026-02-30'` is passed to `DATE_ADD()`?",
    shortAnswer: "MySQL returns `NULL` and issues a warning for invalid date format.",
    explanation: "Invalid date handling in temporal arithmetic.",
    hint: "Returns NULL and generates a warning.",
    level: "moderate"
  },
  {
    question: "What composite interval is used to add 1 day and 12 hours simultaneously?",
    shortAnswer: "`INTERVAL '1 12' DAY_HOUR`.",
    explanation: "Composite DAY_HOUR interval.",
    hint: "INTERVAL '1 12' DAY_HOUR.",
    level: "expert"
  },
  {
    question: "Why should `WHERE DATEDIFF(CURDATE(), created_at) < 30` be rewritten for high-traffic queries?",
    shortAnswer: "Because wrapping `created_at` in `DATEDIFF()` prevents index seeks; rewriting as `WHERE created_at >= CURDATE() - INTERVAL 30 DAY` makes it SARGable.",
    explanation: "SARGable index optimization for date filters.",
    hint: "Rewrite as created_at >= CURDATE() - INTERVAL 30 DAY to use index.",
    level: "moderate"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Date Calculations?",
    shortAnswer: "Use `DATE_ADD`/`DATE_SUB` for interval offsets, `TIMESTAMPDIFF` for exact ages and durations across all units, and write SARGable range predicates to keep queries blazing fast.",
    explanation: "Final summary conclusion for Topic 5 in Module 6.",
    hint: "Use TIMESTAMPDIFF for ages/durations, DATE_ADD for offsets, and SARGable range filters.",
    level: "basic"
  }
];

export default questions;
