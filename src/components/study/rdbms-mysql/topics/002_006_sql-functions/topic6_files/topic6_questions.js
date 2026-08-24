// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What does `DATE_FORMAT('2026-08-24 14:30:00', '%d-%b-%Y')` return?",
    shortAnswer: "`'24-Aug-2026'`.",
    explanation: "Standard Date formatting mask.",
    hint: "'24-Aug-2026'",
    level: "basic"
  },
  {
    question: "What is the difference between `%Y` and `%y` in `DATE_FORMAT()`?",
    shortAnswer: "`%Y` formats a 4-digit year (`2026`), while `%y` formats a 2-digit year (`26`).",
    explanation: "Year format specifiers.",
    hint: "%Y is 4 digits; %y is 2 digits.",
    level: "basic"
  },
  {
    question: "What is the difference between `%M` and `%b` in `DATE_FORMAT()`?",
    shortAnswer: "`%M` produces the full month name (`'August'`), while `%b` produces the 3-letter abbreviation (`'Aug'`).",
    explanation: "Month name format specifiers.",
    hint: "%M is full name; %b is 3-letter abbreviation.",
    level: "basic"
  },
  {
    question: "How do you parse a legacy text date in Indian format `'24/08/2026'` into a native MySQL `DATE`?",
    shortAnswer: "`STR_TO_DATE('24/08/2026', '%d/%m/%Y')`.",
    explanation: "STR_TO_DATE parsing.",
    hint: "STR_TO_DATE('24/08/2026', '%d/%m/%Y').",
    level: "basic"
  },
  {
    question: "What does `DATE_FORMAT(NOW(), '%D')` return on the 24th of August?",
    shortAnswer: "`'24th'` (day of month with English suffix).",
    explanation: "English suffix specifier %D.",
    hint: "'24th'",
    level: "basic"
  },
  {
    question: "What does `DAYNAME('2026-08-24')` return?",
    shortAnswer: "`'Monday'` (returns the full name of the day of the week).",
    explanation: "DAYNAME function.",
    hint: "'Monday'",
    level: "basic"
  },
  {
    question: "What does `MONTHNAME('2026-08-24')` return?",
    shortAnswer: "`'August'`.",
    explanation: "MONTHNAME function.",
    hint: "'August'",
    level: "basic"
  },
  {
    question: "What does `QUARTER('2026-08-24')` return?",
    shortAnswer: "`3` (August falls in the 3rd calendar quarter, July–September).",
    explanation: "QUARTER function evaluation.",
    hint: "3.",
    level: "basic"
  },
  {
    question: "What is the standard ANSI SQL syntax for extracting the year from a date?",
    shortAnswer: "`EXTRACT(YEAR FROM date_column)`.",
    explanation: "ANSI EXTRACT syntax.",
    hint: "EXTRACT(YEAR FROM col).",
    level: "moderate"
  },
  {
    question: "What does `DAYOFWEEK('2026-08-24')` return (where Sunday is 1)?",
    shortAnswer: "`2` (Monday is day 2 in standard ODBC/MySQL indexing: Sunday=1, Monday=2, ..., Saturday=7).",
    explanation: "DAYOFWEEK indexing.",
    hint: "2 (Sunday is 1, Monday is 2).",
    level: "moderate"
  },
  {
    question: "What does `WEEKDAY('2026-08-24')` return (where Monday is 0)?",
    shortAnswer: "`0` (Monday is day 0 in standard ISO/C weekday indexing: Monday=0, ..., Sunday=6).",
    explanation: "WEEKDAY indexing.",
    hint: "0 (Monday is 0).",
    level: "moderate"
  },
  {
    question: "What does `DAYOFYEAR('2026-08-24')` return?",
    shortAnswer: "`236` (the 236th day of the year).",
    explanation: "DAYOFYEAR calculation.",
    hint: "236.",
    level: "moderate"
  },
  {
    question: "What format specifiers produce a 12-hour time format with AM/PM (e.g. `'02:30 PM'`)?",
    shortAnswer: "`'%h:%i %p'` (or `'%I:%i %p'`).",
    explanation: "12-hour time format mask.",
    hint: "%h:%i %p.",
    level: "basic"
  },
  {
    question: "What does `EXTRACT(YEAR_MONTH FROM '2026-08-24')` return?",
    shortAnswer: "`202608` (composite year and month integer).",
    explanation: "Composite YEAR_MONTH extraction.",
    hint: "202608.",
    level: "moderate"
  },
  {
    question: "In academy batch grouping, how do you group students by their year and month of enrollment?",
    shortAnswer: "`SELECT DATE_FORMAT(admission_date, '%Y-%m') AS batch_month, COUNT(*) FROM students GROUP BY batch_month;`",
    explanation: "Grouping by year-month with DATE_FORMAT.",
    hint: "DATE_FORMAT(admission_date, '%Y-%m') with GROUP BY.",
    level: "basic"
  },
  {
    question: "What does `TIME_FORMAT('14:30:45', '%r')` return in MySQL?",
    shortAnswer: "`'02:30:45 PM'` (`%r` is 12-hour time format with seconds and AM/PM).",
    explanation: "%r format specifier in TIME_FORMAT.",
    hint: "'02:30:45 PM'",
    level: "moderate"
  },
  {
    question: "What does `TIME_FORMAT('14:30:45', '%T')` return?",
    shortAnswer: "`'14:30:45'` (`%T` is 24-hour time format `hh:mm:ss`).",
    explanation: "%T 24-hour time specifier.",
    hint: "'14:30:45'",
    level: "basic"
  },
  {
    question: "In CSV data import, how do you parse dates formatted as `'Aug 24, 2026'` into SQL `DATE`?",
    shortAnswer: "`STR_TO_DATE('Aug 24, 2026', '%b %d, %Y')`.",
    explanation: "Parsing abbreviated month strings.",
    hint: "STR_TO_DATE(col, '%b %d, %Y').",
    level: "basic"
  },
  {
    question: "What does `DATE_FORMAT(NOW(), '%W, %d %M %Y')` return on 24-Aug-2026?",
    shortAnswer: "`'Monday, 24 August 2026'`.",
    explanation: "Full date string formatting.",
    hint: "'Monday, 24 August 2026'",
    level: "basic"
  },
  {
    question: "What does `WEEK('2026-08-24')` return in MySQL?",
    shortAnswer: "The week number of the year (e.g. `34`).",
    explanation: "WEEK function.",
    hint: "Week number (34).",
    level: "basic"
  },
  {
    question: "What does `YEARWEEK('2026-08-24')` return?",
    shortAnswer: "`202634` (combines year and week number for sorting/grouping).",
    explanation: "YEARWEEK function for grouping.",
    hint: "202634.",
    level: "moderate"
  },
  {
    question: "In marketing analytics, how do you find all customer orders placed on WEEKENDS (Saturday or Sunday)?",
    shortAnswer: "`WHERE DAYNAME(order_date) IN ('Saturday', 'Sunday')` (or `WHERE DAYOFWEEK(order_date) IN (1, 7)`).",
    explanation: "Weekend filtering query.",
    hint: "DAYNAME(order_date) IN ('Saturday', 'Sunday').",
    level: "basic"
  },
  {
    question: "What does `GET_FORMAT(DATE, 'EUR')` return in MySQL?",
    shortAnswer: "`'%d.%m.%Y'` (standard European date format string).",
    explanation: "GET_FORMAT standard locale helper.",
    hint: "'%d.%m.%Y'",
    level: "expert"
  },
  {
    question: "What does `GET_FORMAT(DATE, 'USA')` return in MySQL?",
    shortAnswer: "`'%m.%d.%Y'`.",
    explanation: "GET_FORMAT USA date format string.",
    hint: "'%m.%d.%Y'",
    level: "expert"
  },
  {
    question: "What happens if `STR_TO_DATE()` cannot parse the string according to the provided format mask?",
    shortAnswer: "It returns `NULL` and generates a warning.",
    explanation: "Unparseable format handling in STR_TO_DATE.",
    hint: "Returns NULL and generates a warning.",
    level: "basic"
  },
  {
    question: "What does `HOUR('14:30:45')`, `MINUTE('14:30:45')`, and `SECOND('14:30:45')` return?",
    shortAnswer: "`14`, `30`, and `45`.",
    explanation: "Time component extractors.",
    hint: "14, 30, and 45.",
    level: "basic"
  },
  {
    question: "In payroll processing, how do you extract the number of days in the month for February 2026?",
    shortAnswer: "`SELECT DAY(LAST_DAY('2026-02-01'));` (returns `28`).",
    explanation: "Extracting total days in month.",
    hint: "DAY(LAST_DAY('2026-02-01')).",
    level: "moderate"
  },
  {
    question: "Why should `WHERE DATE_FORMAT(order_date, '%Y') = '2026'` be avoided in high-traffic queries?",
    shortAnswer: "Because `DATE_FORMAT()` wraps the column, making the predicate non-SARGable and preventing B-Tree index range scans.",
    explanation: "SARGability penalty of DATE_FORMAT.",
    hint: "Non-SARGable; rewrite as order_date >= '2026-01-01' AND order_date < '2027-01-01'.",
    level: "moderate"
  },
  {
    question: "What is `TO_DAYS('2026-08-24')` in MySQL?",
    shortAnswer: "Returns the number of days elapsed since Year 0 (`'0000-00-00'`).",
    explanation: "TO_DAYS function in MySQL.",
    hint: "Number of days since year 0.",
    level: "expert"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Date Extraction & Formatting?",
    shortAnswer: "Use `DATE_FORMAT` for rich executive reporting, `STR_TO_DATE` for legacy CSV imports, `YEAR`/`MONTH`/`DAYNAME` for analytics grouping, and keep search filters SARGable.",
    explanation: "Final summary conclusion for Topic 6 in Module 6.",
    hint: "Use DATE_FORMAT for display, STR_TO_DATE for parsing, and SARGable range filters for queries.",
    level: "basic"
  }
];

export default questions;
