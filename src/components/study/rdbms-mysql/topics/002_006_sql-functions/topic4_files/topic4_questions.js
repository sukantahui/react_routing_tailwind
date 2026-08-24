// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What does `NOW()` return in MySQL?",
    shortAnswer: "The current date and time as a `'YYYY-MM-DD HH:MM:SS'` string or numeric timestamp in the server session's configured time zone.",
    explanation: "Standard definition of NOW().",
    hint: "Current date and time (YYYY-MM-DD HH:MM:SS).",
    level: "basic"
  },
  {
    question: "What are the standard ANSI SQL synonyms for `NOW()` in MySQL?",
    shortAnswer: "`CURRENT_TIMESTAMP()`, `CURRENT_TIMESTAMP`, and `LOCALTIME()`.",
    explanation: "Synonyms for NOW().",
    hint: "CURRENT_TIMESTAMP and LOCALTIME.",
    level: "basic"
  },
  {
    question: "What is the difference between `NOW()` and `SYSDATE()`?",
    shortAnswer: "`NOW()` returns a constant timestamp recorded at the start of statement execution, whereas `SYSDATE()` returns the exact clock time at the moment the individual row is processed.",
    explanation: "NOW vs SYSDATE determinism difference.",
    hint: "NOW evaluates once at query start; SYSDATE evaluates per row.",
    level: "moderate"
  },
  {
    question: "Why is `NOW()` preferred over `SYSDATE()` for database replication and binary logging?",
    shortAnswer: "Because `NOW()` is deterministic within a statement, guaranteeing that replica databases generate identical timestamps to the primary server.",
    explanation: "Deterministic replication safety with NOW.",
    hint: "Guarantees identical timestamps on primary and replica servers.",
    level: "moderate"
  },
  {
    question: "What does `CURDATE()` return in MySQL?",
    shortAnswer: "The current date in `'YYYY-MM-DD'` format.",
    explanation: "CURDATE function return value.",
    hint: "Current date (YYYY-MM-DD).",
    level: "basic"
  },
  {
    question: "What does `CURTIME()` return in MySQL?",
    shortAnswer: "The current time in `'HH:MM:SS'` format.",
    explanation: "CURTIME function return value.",
    hint: "Current time (HH:MM:SS).",
    level: "basic"
  },
  {
    question: "What does `UTC_TIMESTAMP()` return?",
    shortAnswer: "The current date and time in Coordinated Universal Time (UTC / GMT+0) regardless of the local server session time zone.",
    explanation: "UTC_TIMESTAMP definition.",
    hint: "Current date and time in UTC (GMT+0).",
    level: "basic"
  },
  {
    question: "If a server in Barrackpore is set to Indian Standard Time (UTC+05:30) and local time is `14:30:00`, what does `UTC_TIMESTAMP()` return?",
    shortAnswer: "`09:00:00` (14:30 minus 5 hours and 30 minutes).",
    explanation: "IST to UTC time calculation.",
    hint: "09:00:00 (5:30 hours behind IST).",
    level: "basic"
  },
  {
    question: "How do you retrieve the current timestamp with millisecond precision (3 decimal places)?",
    shortAnswer: "`NOW(3)` (e.g. `'2026-08-24 14:30:00.125'`).",
    explanation: "Fractional seconds precision in NOW().",
    hint: "NOW(3).",
    level: "basic"
  },
  {
    question: "What is the maximum fractional second precision supported by `NOW()` in MySQL?",
    shortAnswer: "6 digits (microseconds, e.g. `NOW(6)`).",
    explanation: "Maximum fractional seconds precision.",
    hint: "6 digits (NOW(6) for microseconds).",
    level: "basic"
  },
  {
    question: "In table DDL design, how do you configure a column to automatically record the insert timestamp?",
    shortAnswer: "`created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`.",
    explanation: "Automatic creation timestamp configuration.",
    hint: "DEFAULT CURRENT_TIMESTAMP.",
    level: "basic"
  },
  {
    question: "How do you configure a timestamp column to automatically update on every `UPDATE` statement?",
    shortAnswer: "`updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`.",
    explanation: "ON UPDATE CURRENT_TIMESTAMP clause.",
    hint: "ON UPDATE CURRENT_TIMESTAMP.",
    level: "basic"
  },
  {
    question: "What does `UNIX_TIMESTAMP()` without arguments return?",
    shortAnswer: "The current Unix epoch timestamp (number of seconds elapsed since `'1970-01-01 00:00:00' UTC`).",
    explanation: "Unix epoch timestamp generation.",
    hint: "Number of seconds since Jan 1, 1970 UTC.",
    level: "basic"
  },
  {
    question: "How do you convert a Unix epoch timestamp back to a readable date in MySQL?",
    shortAnswer: "`FROM_UNIXTIME(unix_timestamp)`.",
    explanation: "FROM_UNIXTIME conversion function.",
    hint: "FROM_UNIXTIME().",
    level: "basic"
  },
  {
    question: "What is `UTC_DATE()` and `UTC_TIME()`?",
    shortAnswer: "`UTC_DATE()` returns current date in UTC; `UTC_TIME()` returns current time in UTC.",
    explanation: "UTC date and time helpers.",
    hint: "Current date and time in UTC.",
    level: "basic"
  },
  {
    question: "What happens if you evaluate `NOW() + 0` (numeric context)?",
    shortAnswer: "MySQL returns the timestamp as a number: `YYYYMMDDhhmmss` (e.g. `20260824143000`).",
    explanation: "Numeric context conversion of NOW().",
    hint: "Returns timestamp as an integer YYYYMMDDhhmmss.",
    level: "moderate"
  },
  {
    question: "In user activity tracking, how do you find all logins that occurred TODAY?",
    shortAnswer: "`WHERE login_time >= CURDATE() AND login_time < CURDATE() + INTERVAL 1 DAY`.",
    explanation: "SARGable today filter.",
    hint: "login_time >= CURDATE() AND login_time < CURDATE() + INTERVAL 1 DAY.",
    level: "basic"
  },
  {
    question: "Why should `WHERE DATE(login_time) = CURDATE()` be avoided on indexed columns?",
    shortAnswer: "Because wrapping `login_time` in `DATE()` disables B-Tree index range scans, forcing a full table scan.",
    explanation: "SARGable date comparison best practice.",
    hint: "DATE() wraps the column and disables index seek lookups.",
    level: "moderate"
  },
  {
    question: "What system variable in MySQL sets the session time zone?",
    shortAnswer: "`SET time_zone = '+05:30';` (or `SET time_zone = 'Asia/Kolkata';`).",
    explanation: "Setting session time zone in MySQL.",
    hint: "SET time_zone = '+05:30';",
    level: "moderate"
  },
  {
    question: "How do you inspect the current global and session time zone in MySQL?",
    shortAnswer: "`SELECT @@global.time_zone, @@session.time_zone;`",
    explanation: "Inspecting system time zone variables.",
    hint: "SELECT @@global.time_zone, @@session.time_zone;",
    level: "basic"
  },
  {
    question: "What is the difference in storage behavior between `DATETIME` and `TIMESTAMP` data types in MySQL?",
    shortAnswer: "`TIMESTAMP` is automatically converted from local session time zone to UTC for storage and back on retrieval; `DATETIME` stores the exact literal date/time with zero time zone conversion.",
    explanation: "TIMESTAMP vs DATETIME time zone mechanics.",
    hint: "TIMESTAMP auto-converts to/from UTC; DATETIME stores exact literal values.",
    level: "moderate"
  },
  {
    question: "What is the year range limit for the `TIMESTAMP` data type in MySQL?",
    shortAnswer: "`'1970-01-01 00:00:01' UTC` to `'2038-01-19 03:14:07' UTC` (Year 2038 Problem).",
    explanation: "Year 2038 limit of 32-bit TIMESTAMP.",
    hint: "1970 to 2038 (Year 2038 Problem).",
    level: "moderate"
  },
  {
    question: "What is the year range supported by the `DATETIME` data type?",
    shortAnswer: "`'1000-01-01 00:00:00'` to `'9999-12-31 23:59:59'`.",
    explanation: "DATETIME year range.",
    hint: "Year 1000 to 9999.",
    level: "basic"
  },
  {
    question: "How do you convert a timestamp from UTC to Indian Standard Time (IST)?",
    shortAnswer: "`CONVERT_TZ(utc_col, '+00:00', '+05:30')`.",
    explanation: "CONVERT_TZ time zone conversion.",
    hint: "CONVERT_TZ(col, '+00:00', '+05:30').",
    level: "basic"
  },
  {
    question: "In academy batch scheduling, how do you check if a class session is currently in progress right NOW?",
    shortAnswer: "`WHERE NOW() BETWEEN session_start_time AND session_end_time`.",
    explanation: "Checking current in-progress events with NOW().",
    hint: "WHERE NOW() BETWEEN start AND end.",
    level: "basic"
  },
  {
    question: "What does `MAKEDATE(2026, 60)` return in MySQL?",
    shortAnswer: "`'2026-03-01'` (returns the date corresponding to the 60th day of year 2026).",
    explanation: "MAKEDATE function in MySQL.",
    hint: "Generates date from year and day of year ('2026-03-01').",
    level: "expert"
  },
  {
    question: "What does `MAKETIME(14, 30, 45)` return?",
    shortAnswer: "`'14:30:45'` (creates time from hour, minute, second integers).",
    explanation: "MAKETIME function in MySQL.",
    hint: "'14:30:45'",
    level: "basic"
  },
  {
    question: "What does `SLEEP(2)` do when executed alongside `NOW()` vs `SYSDATE()`?",
    shortAnswer: "`SELECT NOW(), SLEEP(2), NOW();` returns identical timestamps, while `SELECT SYSDATE(), SLEEP(2), SYSDATE();` returns timestamps differing by 2 seconds.",
    explanation: "Proving NOW vs SYSDATE evaluation timing with SLEEP.",
    hint: "NOW returns identical times; SYSDATE times differ by 2 seconds.",
    level: "expert"
  },
  {
    question: "Why do multi-region cloud applications store all database timestamps in UTC?",
    shortAnswer: "To prevent ambiguity across international branches and eliminate daylight saving time (DST) synchronization issues.",
    explanation: "Universal UTC storage best practice.",
    hint: "Eliminates time zone ambiguity and daylight saving issues.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Date & Time Retrieval?",
    shortAnswer: "Use `NOW()` for deterministic local timestamps, `UTC_TIMESTAMP()` for global multi-region data, `TIMESTAMP DEFAULT CURRENT_TIMESTAMP` for audit columns, and SARGable range predicates for queries.",
    explanation: "Final summary conclusion for Topic 4 in Module 6.",
    hint: "Use NOW() for local timestamps, UTC_TIMESTAMP() for global data, and SARGable ranges in WHERE.",
    level: "basic"
  }
];

export default questions;
