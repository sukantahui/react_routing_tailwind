// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What are the five core temporal data types in MySQL?",
    shortAnswer: "1) `YEAR`,\n2) `DATE`,\n3) `TIME`,\n4) `DATETIME`,\n5) `TIMESTAMP`.",
    explanation: "Standard SQL temporal data types for managing dates, times, and audit intervals.",
    hint: "YEAR, DATE, TIME, DATETIME, and TIMESTAMP.",
    level: "basic"
  },
  {
    question: "What is the primary difference between `DATETIME` and `TIMESTAMP` regarding timezones?",
    shortAnswer: "- `DATETIME`: Stores the **literal date and time** exactly as inserted; completely unaffected by session or server timezone changes.\n- `TIMESTAMP`: Automatically converts the input datetime from the **current session timezone to UTC for storage**, and converts back from UTC to the active session timezone upon retrieval.",
    explanation: "TIMESTAMP is timezone-aware; DATETIME is timezone-agnostic.",
    hint: "DATETIME is literal and ignores timezones; TIMESTAMP converts to/from UTC automatically.",
    level: "basic"
  },
  {
    question: "What is the Year 2038 Problem (Y2038) in MySQL `TIMESTAMP` columns?",
    shortAnswer: "`TIMESTAMP` is internally stored as a signed 32-bit integer measuring seconds since the Unix Epoch (`1970-01-01 00:00:00 UTC`). On **January 19, 2038 at 03:14:07 UTC**, the 32-bit counter reaches its maximum limit (2,147,483,647 seconds) and overflows, causing timestamp insertions beyond that moment to fail.",
    explanation: "Affects all 32-bit Unix timestamps globally.",
    hint: "32-bit integer overflows on Jan 19, 2038 at 03:14:07 UTC.",
    level: "expert"
  },
  {
    question: "Why should customer birthdates and 30-year bank home loan maturity dates NEVER be stored in `TIMESTAMP` columns?",
    shortAnswer: "Because `TIMESTAMP` cannot store dates prior to `1970` (preventing birthdates of older customers) nor dates beyond `2038` (preventing long-term loans maturing in 2040+); you must use **`DATE` or `DATETIME`** instead.",
    explanation: "DATETIME spans from year 1000 to 9999, safely accommodating all historical and future dates.",
    hint: "TIMESTAMP fails before 1970 and after 2038; use DATE/DATETIME instead.",
    level: "basic"
  },
  {
    question: "What is the storage size of `DATETIME` vs `TIMESTAMP` in MySQL 8.0?",
    shortAnswer: "- `DATETIME`: **5 Bytes** base (plus 0-3 bytes for fractional seconds);\n- `TIMESTAMP`: **4 Bytes** base (plus 0-3 bytes for fractional seconds).",
    explanation: "Optimized in MySQL 5.6+ from the older 8-byte DATETIME format.",
    hint: "DATETIME is 5 bytes base; TIMESTAMP is 4 bytes base.",
    level: "expert"
  },
  {
    question: "What is Fractional Seconds Precision (`FSP`) in temporal types (e.g. `DATETIME(6)`)?",
    shortAnswer: "It specifies the number of fractional sub-second digits stored ($0$ to $6$ decimal places, where $6$ represents **microsecond precision**).",
    explanation: "Permits high-resolution microsecond auditing.",
    hint: "Specifies microsecond precision from 0 to 6 decimal places.",
    level: "basic",
    codeExample: "CREATE TABLE audit_logs (\n  log_id BIGINT PRIMARY KEY AUTO_INCREMENT,\n  event_time DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6)\n);"
  },
  {
    question: "How many additional bytes does Fractional Seconds Precision (`FSP`) consume on disk?",
    shortAnswer: "- `FSP (0)`: **0 Extra Bytes**\n- `FSP (1 - 2)`: **1 Extra Byte**\n- `FSP (3 - 4)`: **2 Extra Bytes**\n- `FSP (5 - 6)`: **3 Extra Bytes** (Total 8 bytes for `DATETIME(6)`).",
    explanation: "Calculated based on fractional seconds packing algorithm.",
    hint: "0 bytes for (0), 1 byte for (1-2), 2 bytes for (3-4), 3 bytes for (5-6).",
    level: "expert"
  },
  {
    question: "How do you configure a column to automatically record row creation and update times?",
    shortAnswer: "`created_at DATETIME DEFAULT CURRENT_TIMESTAMP,`\n`updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`",
    explanation: "Universal audit timestamp pattern in relational databases.",
    hint: "DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP.",
    level: "basic",
    codeExample: "CREATE TABLE students (\n  id INT PRIMARY KEY AUTO_INCREMENT,\n  student_name VARCHAR(100) NOT NULL,\n  created_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6),\n  updated_at DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)\n);"
  },
  {
    question: "How do you change the active session timezone to Indian Standard Time (IST)?",
    shortAnswer: "`SET time_zone = '+05:30';`",
    explanation: "Instantly recalibrates TIMESTAMP display values for the session.",
    hint: "SET time_zone = '+05:30';",
    level: "basic",
    codeExample: "SET time_zone = '+05:30';\nSELECT NOW(), UTC_TIMESTAMP();"
  },
  {
    question: "Why can the `TIME` data type store values up to `838:59:59` (over 800 hours)?",
    shortAnswer: "Because `TIME` is designed not only to represent times of day (e.g. `14:30:00`), but also **elapsed intervals and durations** between events (e.g. total machine operating hours).",
    explanation: "Range spans -838:59:59 to +838:59:59 (approx. 34 days).",
    hint: "Because TIME represents elapsed durations as well as time-of-day.",
    level: "expert"
  },
  {
    question: "What is the date format and range for `DATE` columns?",
    shortAnswer: "Format: **`YYYY-MM-DD`**; Range: **`1000-01-01` to `9999-12-31`**; Storage: **3 Bytes**.",
    explanation: "Optimized for calendar dates without time components.",
    hint: "YYYY-MM-DD spanning from year 1000 to 9999 in 3 bytes.",
    level: "basic"
  },
  {
    question: "What happens if an application inserts an invalid zero date like `'0000-00-00'` under strict SQL mode?",
    shortAnswer: "The transaction fails with **MySQL Error 1067: Invalid default value** or **Error 1292: Incorrect date value** (enforced by `NO_ZERO_DATE` and `NO_ZERO_IN_DATE` modes).",
    explanation: "Zero dates are banned in modern strict SQL mode.",
    hint: "Throws Error 1292 Incorrect date value (aborts transaction).",
    level: "basic"
  },
  {
    question: "What is the difference between `NOW()`, `CURRENT_TIMESTAMP()`, and `SYSDATE()`?",
    shortAnswer: "- `NOW()` & `CURRENT_TIMESTAMP()`: Return the time at which the **statement began execution** (constant throughout a multi-row query).\n- `SYSDATE()`: Returns the exact time at which the **function is evaluated** dynamically (non-deterministic).",
    explanation: "NOW() is deterministic and replication-safe; SYSDATE() is not.",
    hint: "NOW() is constant for the statement; SYSDATE() evaluates in real-time per row.",
    level: "expert"
  },
  {
    question: "What is `UTC_TIMESTAMP()` in MySQL?",
    shortAnswer: "It returns the current date and time expressed in **Coordinated Universal Time (UTC)** regardless of the current session or server timezone.",
    explanation: "Essential for timezone-neutral backend logging.",
    hint: "Returns the current UTC date and time.",
    level: "basic",
    codeExample: "SELECT UTC_TIMESTAMP(), NOW();"
  },
  {
    question: "How do you calculate the difference in days between two dates?",
    shortAnswer: "`DATEDIFF(end_date, start_date)`: `SELECT DATEDIFF('2026-12-31', '2026-01-01');` (Returns 364).",
    explanation: "Returns integer count of days between two dates.",
    hint: "DATEDIFF(date1, date2).",
    level: "basic"
  },
  {
    question: "How do you add 30 days or 3 months to an existing date in SQL?",
    shortAnswer: "`DATE_ADD(col, INTERVAL 30 DAY)` or `DATE_ADD(col, INTERVAL 3 MONTH)`",
    explanation: "Standard temporal interval addition operator.",
    hint: "DATE_ADD(date, INTERVAL expr unit).",
    level: "basic",
    codeExample: "SELECT DATE_ADD(CURRENT_DATE(), INTERVAL 30 DAY) AS due_date;"
  },
  {
    question: "What is the `YEAR` data type range and storage size?",
    shortAnswer: "Storage: **1 Byte**; Range: **`1901` to `2155`** (and `0000`).",
    explanation: "Ultra-compact single-byte representation of 4-digit calendar years.",
    hint: "1 Byte storing years from 1901 to 2155.",
    level: "basic"
  },
  {
    question: "Why is storing Unix epoch timestamps as plain `BIGINT` or `INT` columns discouraged compared to `DATETIME`?",
    shortAnswer: "Because raw integers lack human readability in SQL queries, prevent database temporal functions (`DATE_ADD`, `YEAR()`, `DATEDIFF`) from working directly, and disable timezone auto-formatting.",
    explanation: "Native temporal types provide built-in validation and temporal math.",
    hint: "Raw integers prevent built-in date functions and make queries unreadable.",
    level: "expert"
  },
  {
    question: "How do you format a `DATETIME` value into an Indian date string format (e.g. `'25/08/2026'`)?",
    shortAnswer: "`DATE_FORMAT(date_col, '%d/%m/%Y')`",
    explanation: "Standard format specifiers for custom date representations.",
    hint: "DATE_FORMAT(col, '%d/%m/%Y').",
    level: "basic",
    codeExample: "SELECT DATE_FORMAT(NOW(), '%d/%m/%Y %h:%i %p') AS formatted_date;"
  },
  {
    question: "What is the primary architectural takeaway of Topic 6 in Module 004_002?",
    shortAnswer: "Mastering temporal types prevents critical bugs: use `DATETIME(6)` for future-proof, timezone-agnostic business data and historical birthdates to avoid the Year 2038 overflow, use `TIMESTAMP` only for automated session-relative audit logs, and leverage `FSP` for microsecond audit tracking.",
    explanation: "Fundamental knowledge for building robust, scalable temporal models.",
    hint: "DATETIME for future-proof business data; TIMESTAMP for timezone-aware session audits.",
    level: "basic"
  }
];

export default questions;
